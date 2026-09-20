import React from 'react';
import { AlertTriangle, Lightbulb, Bookmark, ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

// Helper to render inline markdown: **bold**, *italic*, `code`, [link](url)
export function renderInline(text: string): React.ReactNode[] {
  if (!text) return [];

  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    const key = `inline-${match.index}`;

    if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      parts.push(
        <strong key={key} className="font-bold text-white tracking-wide bg-slate-800/60 px-1 py-0.5 rounded">
          {renderInline(inner)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const inner = token.slice(1, -1);
      parts.push(
        <em key={key} className="italic text-slate-300">
          {inner}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const code = token.slice(1, -1);
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-900 border border-slate-700/80 font-mono text-[11px] text-cyan-300 font-semibold shadow-xs"
        >
          {code}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const labelMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (labelMatch) {
        parts.push(
          <a
            key={key}
            href={labelMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center space-x-1 mx-0.5"
          >
            <span>{labelMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline ml-0.5" />
          </a>
        );
      } else {
        parts.push(token);
      }
    } else {
      parts.push(token);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'table'; headers: string[]; rows: string[][]; alignments: string[] }
  | { type: 'callout'; variant: 'trap' | 'tip' | 'info'; title?: string; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'hr' }
  | { type: 'paragraph'; text: string };

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim()
      });
      i++;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const quoteText = quoteLines.join(' ');
      
      let variant: 'trap' | 'tip' | 'info' = 'info';
      let title = '';

      if (/trap|exam trap|🚨|warning|danger|caution/i.test(quoteText)) {
        variant = 'trap';
        title = 'EXAM TRAP / CRITICAL CAUTION';
      } else if (/tip|note|💡|hint|best practice/i.test(quoteText)) {
        variant = 'tip';
        title = 'EXAM TIP / KEY INSIGHT';
      } else {
        variant = 'info';
        title = 'NOTE';
      }

      const cleanedText = quoteText
        .replace(/^(🚨|⚠️|💡|ℹ️)?\s*\*\*(Exam Trap|Warning|Caution|Tip|Note|Key Insight):\*\*\s*/i, '')
        .trim();

      blocks.push({
        type: 'callout',
        variant,
        title,
        text: cleanedText || quoteText
      });
      continue;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (r: string) =>
          r
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim());

        const rawHeaders = parseRow(tableLines[0]);
        const hasDelimiter = tableLines.length > 1 && /^\|[\s-:]+\|/.test(tableLines[1]);
        const alignments = hasDelimiter
          ? parseRow(tableLines[1]).map((cell) => {
              if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
              if (cell.endsWith(':')) return 'right';
              return 'left';
            })
          : rawHeaders.map(() => 'left');

        const bodyLines = hasDelimiter ? tableLines.slice(2) : tableLines.slice(1);
        const rows = bodyLines.map(parseRow);

        blocks.push({
          type: 'table',
          headers: rawHeaders,
          alignments,
          rows
        });
        continue;
      }
    }

    const bulletMatch = trimmed.match(/^([-*]|\d+\.)\s+(.*)$/);
    if (bulletMatch) {
      const isOrdered = /^\d+\./.test(trimmed);
      const listItems: string[] = [];

      while (i < lines.length) {
        const itemLine = lines[i].trim();
        const currentMatch = itemLine.match(/^([-*]|\d+\.)\s+(.*)$/);
        if (currentMatch) {
          listItems.push(currentMatch[2]);
          i++;
        } else if (itemLine && !itemLine.startsWith('#') && !itemLine.startsWith('|') && !itemLine.startsWith('>')) {
          if (listItems.length > 0) {
            listItems[listItems.length - 1] += ' ' + itemLine;
          }
          i++;
        } else {
          break;
        }
      }

      blocks.push({
        type: 'list',
        ordered: isOrdered,
        items: listItems
      });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) &&
      !lines[i].trim().match(/^([-*]|\d+\.)\s+/) &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: paraLines.join(' ')
      });
    }
  }

  return (
    <div className="space-y-3.5 text-slate-200 text-xs sm:text-sm leading-relaxed">
      {blocks.map((b, idx) => {
        switch (b.type) {
          case 'heading': {
            const cleanHeadingText = b.text.replace(/^\*\*(.*?)\*\*$/, '$1');

            if (b.level === 1) {
              return (
                <div key={idx} className="mt-5 mb-2 pb-2 border-b border-indigo-500/30 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    {renderInline(cleanHeadingText)}
                  </h1>
                </div>
              );
            }
            if (b.level === 2) {
              return (
                <div key={idx} className="mt-4 mb-2 pb-1.5 border-b border-slate-800 flex items-center space-x-2">
                  <Bookmark className="w-4 h-4 text-purple-400 shrink-0" />
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {renderInline(cleanHeadingText)}
                  </h2>
                </div>
              );
            }
            if (b.level === 3) {
              return (
                <div key={idx} className="mt-3 mb-1.5 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-sm bg-cyan-400 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-indigo-300">
                    {renderInline(cleanHeadingText)}
                  </h3>
                </div>
              );
            }
            return (
              <h4 key={idx} className="mt-2 mb-1 text-xs font-semibold text-cyan-300">
                {renderInline(cleanHeadingText)}
              </h4>
            );
          }

          case 'table': {
            return (
              <div key={idx} className="my-3.5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 shadow-lg">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-200 font-semibold">
                      {b.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-3.5 py-2.5 uppercase tracking-wider text-[11px] font-bold text-slate-300"
                          style={{ textAlign: (b.alignments[hIdx] as any) || 'left' }}
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {b.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-900/60 transition odd:bg-slate-950/30 even:bg-slate-900/20"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-3.5 py-2.5 text-slate-300 leading-relaxed font-normal"
                            style={{ textAlign: (b.alignments[cIdx] as any) || 'left' }}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'callout': {
            const isTrap = b.variant === 'trap';
            return (
              <div
                key={idx}
                className={`my-3 p-3.5 rounded-xl border transition shadow-sm ${
                  isTrap
                    ? 'bg-gradient-to-r from-amber-950/40 via-slate-900/50 to-slate-900/40 border-amber-500/40 text-amber-200 border-l-4 border-l-amber-500'
                    : 'bg-gradient-to-r from-blue-950/40 via-slate-900/50 to-slate-900/40 border-blue-500/40 text-blue-200 border-l-4 border-l-blue-500'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  {isTrap ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 flex-1">
                    {b.title && (
                      <div className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-90">
                        {b.title}
                      </div>
                    )}
                    <div className="text-xs leading-relaxed text-slate-200">
                      {renderInline(b.text)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          case 'list': {
            return (
              <div key={idx} className="my-2 space-y-1.5 pl-1">
                {b.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start space-x-2.5">
                    {b.ordered ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-bold shrink-0 mt-0.5 border border-slate-700/50">
                        {itemIdx + 1}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-xs shadow-cyan-400/50" />
                    )}
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed flex-1">
                      {renderInline(item)}
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          case 'hr': {
            return (
              <div key={idx} className="my-4 flex items-center space-x-3 text-slate-700">
                <div className="flex-1 border-t border-slate-800" />
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">✦ ✦ ✦</span>
                <div className="flex-1 border-t border-slate-800" />
              </div>
            );
          }

          case 'paragraph': {
            return (
              <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {renderInline(b.text)}
              </p>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      provider = "ollama",
      messages,
      model,
      endpoint = "http://127.0.0.1:11434",
      temperature = 0.3,
      systemPrompt,
      apiKey
    } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------
    // PROVIDER: GOOGLE GEMINI (Cloud API)
    // -------------------------------------------------------------
    if (provider === "gemini") {
      const resolvedApiKey = apiKey || process.env.GEMINI_API_KEY;
      if (!resolvedApiKey || !resolvedApiKey.trim()) {
        return NextResponse.json(
          {
            error:
              "GEMINI_API_KEY is not set in .env.local. Please open d:\\AI_Review_Exam\\exam-review-app\\.env.local and add your key: GEMINI_API_KEY=your_key_here"
          },
          { status: 401 }
        );
      }

      const geminiModel = model || "gemini-2.0-flash";
      const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        geminiModel
      )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(resolvedApiKey)}`;

      // Format messages for Gemini API
      // Gemini expects: { role: "user" | "model", parts: [{ text: string }] }
      const contents = messages
        .filter((m: any) => m.role === "user" || m.role === "assistant")
        .map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content || "" }]
        }));

      const geminiPayload: any = {
        contents,
        generationConfig: {
          temperature: typeof temperature === "number" ? temperature : 0.3
        }
      };

      if (systemPrompt) {
        geminiPayload.system_instruction = {
          parts: [{ text: systemPrompt }]
        };
      }

      let geminiResponse: globalThis.Response;
      try {
        geminiResponse = await fetch(targetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload)
        });
      } catch (err: any) {
        return NextResponse.json(
          { error: `Failed to connect to Google Gemini API: ${err?.message}` },
          { status: 503 }
        );
      }

      if (!geminiResponse.ok) {
        const errText = await geminiResponse.text();
        return NextResponse.json(
          { error: `Gemini API returned HTTP ${geminiResponse.status}: ${errText}` },
          { status: geminiResponse.status }
        );
      }

      if (!geminiResponse.body) {
        return NextResponse.json(
          { error: "No response stream received from Google Gemini" },
          { status: 502 }
        );
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      const geminiReader = geminiResponse.body.getReader();

      const stream = new ReadableStream({
        async start(controller) {
          let buffer = "";

          try {
            while (true) {
              const { done, value } = await geminiReader.read();
              if (done) {
                controller.close();
                break;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data:")) continue;
                const jsonStr = trimmed.replace(/^data:\s*/, "").trim();
                if (!jsonStr) continue;

                try {
                  const parsed = JSON.parse(jsonStr);
                  const candidate = parsed.candidates?.[0];
                  const text = candidate?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Ignore parse error on partial chunks
                }
              }
            }
          } catch (err: any) {
            controller.error(err);
          }
        }
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Transfer-Encoding": "chunked"
        }
      });
    }

    // -------------------------------------------------------------
    // PROVIDER: LOCAL OLLAMA (Default)
    // -------------------------------------------------------------
    const ollamaModel = model || "qwen3.6-35b-opt:latest";
    const formattedMessages = [...messages];
    if (systemPrompt && formattedMessages[0]?.role !== "system") {
      formattedMessages.unshift({
        role: "system",
        content: systemPrompt
      });
    }

    const payload = {
      model: ollamaModel,
      messages: formattedMessages,
      stream: true,
      options: {
        temperature: typeof temperature === "number" ? temperature : 0.3
      }
    };

    const targetUrl = `${endpoint.replace(/\/+$/, "")}/api/chat`;

    let ollamaResponse: globalThis.Response;
    try {
      ollamaResponse = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (networkErr: any) {
      return NextResponse.json(
        {
          error: `Could not connect to Ollama at ${targetUrl}. Please ensure Ollama is running ('ollama serve'). Details: ${networkErr?.message}`
        },
        { status: 503 }
      );
    }

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text();
      return NextResponse.json(
        { error: `Ollama returned HTTP ${ollamaResponse.status}: ${errText}` },
        { status: ollamaResponse.status }
      );
    }

    if (!ollamaResponse.body) {
      return NextResponse.json(
        { error: "No response body received from Ollama stream" },
        { status: 502 }
      );
    }

    // Stream transformation: parse Ollama NDJSON chunks and yield SSE / text
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const ollamaReader = ollamaResponse.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await ollamaReader.read();
            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              try {
                const parsed = JSON.parse(trimmed);
                if (parsed.message?.content) {
                  controller.enqueue(encoder.encode(parsed.message.content));
                }
                if (parsed.done) {
                  controller.close();
                  return;
                }
              } catch {
                // Ignore parse errors on partial chunks
              }
            }
          }
        } catch (err: any) {
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

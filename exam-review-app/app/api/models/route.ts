import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "http://127.0.0.1:11434";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${endpoint}/api/tags`, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    });
    clearTimeout(timeout);

    const hasServerGeminiKey = Boolean(
      process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0
    );

    if (!res.ok) {
      return NextResponse.json({
        connected: false,
        error: `Ollama returned HTTP ${res.status}`,
        models: ["qwen3.6-35b-opt:latest", "qwen2.5:3b", "llama3.2:latest"],
        hasServerGeminiKey,
        endpoint
      });
    }

    const data = await res.json();
    const models = Array.isArray(data.models)
      ? data.models.map((m: any) => m.name)
      : ["qwen3.6-35b-opt:latest"];

    return NextResponse.json({
      connected: true,
      models,
      hasServerGeminiKey,
      endpoint
    });
  } catch (err: any) {
    const hasServerGeminiKey = Boolean(
      process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0
    );
    return NextResponse.json({
      connected: false,
      error: err?.name === "AbortError" ? "Connection timed out" : (err?.message || "Ollama unreachable"),
      models: ["qwen3.6-35b-opt:latest", "qwen2.5:3b", "llama3.2:latest"],
      hasServerGeminiKey,
      endpoint
    });
  }
}

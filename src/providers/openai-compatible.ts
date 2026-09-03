/**
 * Base class for OpenAI-compatible providers.
 *
 * Shared by OpenAI, GitHub Copilot, and OpenRouter providers.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types.ts";

const DEFAULT_LLM_REQUEST_TIMEOUT_MS = 60_000;

export abstract class OpenAICompatibleProvider implements LlmProvider {
  abstract readonly name: string;
  protected readonly client: OpenAI;
  protected readonly model: string;

  constructor(opts: { apiKey?: string; baseURL?: string; model: string }) {
    this.model = opts.model;
    this.client = new OpenAI({
      apiKey: opts.apiKey,
      baseURL: opts.baseURL,
    });
  }

  async call(prompt: string, maxTokens: number): Promise<string> {
    const timeout = Number(process.env["LLM_REQUEST_TIMEOUT_MS"] ?? DEFAULT_LLM_REQUEST_TIMEOUT_MS);
    const response = await this.client.chat.completions.create(
      {
        model: this.model,
        max_completion_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      },
      { timeout },
    );
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return text;
  }
}

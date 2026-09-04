import { describe, expect, it } from "vitest";
import {
  isAiRepo,
  rankDaily,
  renderPicks,
  validateAdvice,
  type PicksReport,
  type RepoEvidence,
} from "../ai-repo-picks.ts";

const repo = (fullName: string, todayStars: number, totalStars = 1000): RepoEvidence => ({
  fullName,
  todayStars,
  totalStars,
  description: "AI coding assistant",
  language: "TypeScript",
  forks: 10,
  url: `https://github.com/${fullName}`,
  topics: ["ai"],
  pushedAt: "2026-09-05T00:00:00Z",
  archived: false,
  license: "MIT",
  readme: "Install with npm",
  readmeUrl: `https://github.com/${fullName}#readme`,
});
const advice = (fullName: string) => ({
  fullName,
  summary: "代码辅助",
  verdict: "可观望" as const,
  reason: "与 Codex 有重叠",
  requirements: "Windows 支持未确认",
  overlap: "先比较工作流",
});

describe("daily AI repository picks", () => {
  it("ranks daily growth instead of total stars and deduplicates across languages", () => {
    expect(
      rankDaily([
        repo("a/tool", 10, 100000),
        repo("b/tool", 100, 100),
        repo("B/tool", 90),
        repo("c/tool", 0),
      ]).map((r) => r.fullName),
    ).toEqual(["b/tool", "a/tool"]);
  });
  it("requires explicit AI relevance rather than a generic agent name", () => {
    expect(isAiRepo({ fullName: "a/agent", description: "Monitoring daemon", topics: ["monitoring"] })).toBe(
      false,
    );
    expect(isAiRepo({ fullName: "a/tool", description: "Knowledge retrieval", topics: ["rag"] })).toBe(true);
  });
  it("rejects missing, duplicate and invented recommendations", () => {
    const repos = [repo("a/tool", 20), repo("b/tool", 10)];
    expect(() => validateAdvice([advice("a/tool")], repos)).toThrow();
    expect(() => validateAdvice([advice("a/tool"), advice("a/tool")], repos)).toThrow();
    expect(() => validateAdvice([advice("a/tool"), advice("fake/tool")], repos)).toThrow();
    expect(validateAdvice([advice("b/tool"), advice("a/tool")], repos).map((r) => r.fullName)).toEqual([
      "a/tool",
      "b/tool",
    ]);
  });
  it("renders all ten verified links and preserves daily counts and freshness", () => {
    const report: PicksReport = {
      schemaVersion: 1,
      date: "2026-09-05",
      generatedAt: "2026-09-05T00:00:00Z",
      scope: "sample",
      sources: [],
      failedSources: [],
      repos: Array.from({ length: 10 }, (_, i) => ({
        ...repo(`org/tool${i}`, 100 - i),
        ...advice(`org/tool${i}`),
      })),
    };
    const text = renderPicks(report);
    expect(text.match(/^\| \d+ \|/gm)).toHaveLength(10);
    expect(text).toContain("[org/tool0](https://github.com/org/tool0) | 100 | 1000");
    expect(text).toContain(report.generatedAt);
  });
});

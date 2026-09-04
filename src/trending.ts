/**
 * GitHub trending and AI topic search data fetching.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  todayStars: number;
  totalStars: number;
  forks: number;
  url: string;
}

export interface SearchRepo {
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  pushedAt: string;
  url: string;
  searchQuery: string;
}

export interface ConfigRepo {
  todayStars?: number;
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  pushedAt: string;
  url: string;
  searchQuery: string;
}

export interface TrendingData {
  trendingRepos: TrendingRepo[];
  searchRepos: SearchRepo[];
  configRepos: ConfigRepo[];
  trendingFetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FETCH_TIMEOUT_MS = 20_000;

function fetchWithTimeout(input: string, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

const SEARCH_QUERIES = [
  { q: "topic:llm", label: "llm" },
  { q: "topic:ai-agent", label: "ai-agent" },
  { q: "topic:rag", label: "rag" },
  { q: "topic:vector-database", label: "vector-db" },
  { q: "topic:large-language-model", label: "llm-model" },
  { q: "topic:machine-learning", label: "ml" },
];

const CONFIG_SEARCH_QUERIES = [
  { q: "topic:ai-agent stars:>500 pushed:>__SINCE__", label: "ai-agent" },
  { q: "topic:mcp stars:>200 pushed:>__SINCE__", label: "mcp" },
  { q: "topic:llm stars:>1000 pushed:>__SINCE__", label: "llm" },
  { q: "topic:rag stars:>500 pushed:>__SINCE__", label: "rag" },
  { q: "topic:ai-cli stars:>100 pushed:>__SINCE__", label: "ai-cli" },
  { q: "claude code stars:>100 pushed:>__SINCE__", label: "claude-code" },
  { q: "codex ai stars:>100 pushed:>__SINCE__", label: "codex" },
  { q: "cursor ai stars:>100 pushed:>__SINCE__", label: "cursor" },
  { q: "cline ai stars:>100 pushed:>__SINCE__", label: "cline" },
  { q: "awesome llm stars:>100 pushed:>__SINCE__", label: "awesome-llm" },
  { q: "ai agent template stars:>100 pushed:>__SINCE__", label: "agent-template" },
];

// ---------------------------------------------------------------------------
// GitHub Trending HTML fetch
// ---------------------------------------------------------------------------

export async function fetchGitHubTrending(
  language = "",
): Promise<{ repos: TrendingRepo[]; success: boolean }> {
  try {
    const resp = await fetchWithTimeout(`https://github.com/trending/${language}?since=daily`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0)",
        Accept: "text/html",
      },
    });
    if (!resp.ok) {
      console.error(`  [trending] HTTP ${resp.status} fetching github.com/trending`);
      return { repos: [], success: false };
    }

    const html = await resp.text();
    const repos: TrendingRepo[] = [];

    const articlePattern =
      /<article[^>]*class="[^"]*Box-row[^"]*"[\s\S]*?(?=<article[^>]*class="[^"]*Box-row[^"]*"|$)/g;
    const blocks = html.match(articlePattern) ?? [];

    for (const block of blocks) {
      try {
        const nameMatch = block.match(/<h2[^>]*>[\s\S]*?<a[^>]+href="\/([^/"]+\/[^/"]+)"/);
        if (!nameMatch?.[1]) continue;
        const fullName = nameMatch[1].trim();

        const descMatch = block.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
        const description = descMatch?.[1] ? descMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        const langMatch = block.match(/<span[^>]+itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/);
        const language = langMatch?.[1] ? langMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        const todayMatch = block.match(/([\d,]+)\s+stars?\s+today/i);
        const todayStars = todayMatch?.[1] ? parseInt(todayMatch[1].replace(/,/g, ""), 10) : 0;

        const totalMatch = block.match(/href="\/[^"]+\/stargazers"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const totalStars = totalMatch?.[1] ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

        const forkMatch = block.match(/href="\/[^"]+\/forks"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const forks = forkMatch?.[1] ? parseInt(forkMatch[1].replace(/,/g, ""), 10) : 0;

        repos.push({
          fullName,
          description,
          language,
          todayStars,
          totalStars,
          forks,
          url: `https://github.com/${fullName}`,
        });
      } catch {
        // single block parse failure is non-fatal
      }
    }

    if (repos.length === 0) {
      console.error("  [trending] Parsed 0 repos — HTML structure may have changed");
      return { repos: [], success: false };
    }

    console.log(`  [trending] Parsed ${repos.length} trending repos from HTML`);
    return { repos, success: true };
  } catch (err) {
    console.error(`  [trending] Fetch failed: ${err}`);
    return { repos: [], success: false };
  }
}

// ---------------------------------------------------------------------------
// GitHub Search API
// ---------------------------------------------------------------------------

interface SearchApiItem {
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count?: number;
  pushed_at: string;
  html_url: string;
}

interface SearchApiResponse {
  items: SearchApiItem[];
}

async function searchAiRepos(sevenDaysAgo: string): Promise<SearchRepo[]> {
  const token = process.env["GITHUB_TOKEN"] ?? "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const seen = new Set<string>();
  const all: SearchRepo[] = [];

  await Promise.all(
    SEARCH_QUERIES.map(async ({ q, label }) => {
      try {
        const query = `${q}+pushed:>${sevenDaysAgo}&sort=stars&order=desc`;
        const url = `https://api.github.com/search/repositories?q=${query}&per_page=15`;
        const resp = await fetchWithTimeout(url, { headers });
        if (!resp.ok) {
          console.error(`  [trending/search] "${label}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as SearchApiResponse;
        let added = 0;
        for (const item of data.items ?? []) {
          if (!seen.has(item.full_name)) {
            seen.add(item.full_name);
            all.push({
              fullName: item.full_name,
              description: item.description,
              language: item.language,
              stargazersCount: item.stargazers_count,
              pushedAt: item.pushed_at,
              url: item.html_url,
              searchQuery: label,
            });
            added++;
          }
        }
        console.log(`  [trending/search] "${label}": ${added} new repos`);
      } catch (err) {
        console.error(`  [trending/search] "${label}": ${err}`);
      }
    }),
  );

  return all;
}

async function _searchConfigRepos(sevenDaysAgo: string): Promise<ConfigRepo[]> {
  const token = process.env["GITHUB_TOKEN"] ?? "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const seen = new Map<string, ConfigRepo>();

  await Promise.all(
    CONFIG_SEARCH_QUERIES.map(async ({ q, label }) => {
      try {
        const query = q.replace("__SINCE__", sevenDaysAgo);
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query,
        )}&sort=stars&order=desc&per_page=10`;
        const resp = await fetchWithTimeout(url, { headers });
        if (!resp.ok) {
          console.error(`  [trending/config] "${label}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as SearchApiResponse;
        let added = 0;
        for (const item of data.items ?? []) {
          if (!seen.has(item.full_name)) {
            seen.set(item.full_name, {
              fullName: item.full_name,
              description: item.description,
              language: item.language,
              stargazersCount: item.stargazers_count,
              forksCount: item.forks_count ?? 0,
              pushedAt: item.pushed_at,
              url: item.html_url,
              searchQuery: label,
            });
            added++;
          }
        }
        console.log(`  [trending/config] "${label}": ${added} new repos`);
      } catch (err) {
        console.error(`  [trending/config] "${label}": ${err}`);
      }
    }),
  );

  return [...seen.values()].sort((a, b) => b.stargazersCount - a.stargazersCount).slice(0, 10);
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export async function fetchTrendingData(): Promise<TrendingData> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [{ repos: trendingRepos, success }, searchRepos] = await Promise.all([
    fetchGitHubTrending(),
    searchAiRepos(sevenDaysAgo),
  ]);

  const { readFile } = await import("node:fs/promises");
  const { toCstDateStr } = await import("./date.ts");
  let configRepos: ConfigRepo[] = [];
  try {
    const report = JSON.parse(await readFile("digests/ai-repo-picks-latest.json", "utf8"));
    if (report.date === toCstDateStr(new Date())) {
      configRepos = report.repos.map((r: import("./ai-repo-picks.ts").PicksReport["repos"][number]) => ({
        fullName: r.fullName,
        description: `${r.summary} ${r.verdict}: ${r.reason} ${r.requirements} ${r.overlap}`,
        language: r.language,
        stargazersCount: r.totalStars,
        todayStars: r.todayStars,
        forksCount: r.forks,
        pushedAt: r.pushedAt,
        url: r.url,
        searchQuery: "daily-trending",
      }));
    }
  } catch {
    console.error(
      "[trending/config] No current verified daily picks; do not substitute total-star rankings.",
    );
  }

  return { trendingRepos, searchRepos, configRepos, trendingFetchSuccess: success };
}

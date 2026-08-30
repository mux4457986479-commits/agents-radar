# OpenClaw Ecosystem Digest 2026-08-30

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-08-30 10:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-30

## 1. Today's Overview

OpenClaw continues to see very high issue and PR activity: **500 issues** were updated in the last 24 hours (350 open/active, 150 closed) and **500 PRs** were updated (354 open, 146 merged/closed). No new release was published today, although two release-prep PRs are active (`2026.7.33 extended-stable` and `2026.9.1-beta.1`). The issue tracker remains dominated by P1 reliability bugs around session-state corruption, message loss, memory leaks, and channel-specific delivery failures. Many open issues are still labelled `clawsweeper:needs-maintainer-review` or `clawsweeper:needs-product-decision`, indicating a maintainer-review bottleneck rather than a lack of community reporting.

## 2. Releases

None in the last 24 hours. No new versions, breaking changes, or migration notes to report.

## 3. Project Progress

146 PRs were merged or closed today. Among highlighted PRs, the main closed items are:

- [PR #120900 — `feat(ui): review install policy warnings`](https://github.com/openclaw/openclaw/pull/120900) — Adds an authenticated admin review step for install-policy warnings in Control UI. Closed with maintainer-ready status.
- [PR #123535 — `fix(ui): avoid session catalog refresh storms`](https://github.com/openclaw/openclaw/pull/123535) — Reduces redundant sidebar session catalog refreshes triggered by focus and presence events. Closed with maintainer-ready status.

Other PRs remain open but show active progress today:

- [PR #133252 — `fix(config): honor environment-selected profile roots`](https://github.com/openclaw/openclaw/pull/133252) — Fixes `OPENCLAW_PROFILE` selection falling back to default profile config.
- [PR #133237 — `fix(gateway): commit media ownership before publishing source replies`](https://github.com/openclaw/openclaw/pull/133237) — Closes attachment-disappearance gaps in source replies.
- [PR #133261 — `fix(media): preserve first voice-note transcripts through processing`](https://github.com/openclaw/openclaw/pull/133261) — Fixes wrong/lost voice-note transcripts in multi-note flows.
- [PR #128512 — `fix(agents): surface failed subagent completion notices`](https://github.com/openclaw/openclaw/pull/128512) — Makes silent subagent delivery failures visible.

Release preparation is also visible: [PR #133000](https://github.com/openclaw/openclaw/pull/133000) prepares the `2026.7.33` extended-stable line, and [PR #130731](https://github.com/openclaw/openclaw/pull/130731) prepares `2026.9.1-beta.1`.

## 4. Community Hot Topics

The most discussed issues remain focused on reliability and operational cost control:

- [Issue #42475 — Per-agent cost budget enforcement at the gateway level](https://github.com/openclaw/openclaw/issues/42475) — 22 comments, 1 👍. Operators want daily/monthly cost caps enforced before model dispatch to prevent runaway spend. Open since March 2026 with no new fix PR.
- [Issue #91588 — Critical gateway memory leak (350MB → 15.5GB)](https://github.com/openclaw/openclaw/issues/91588) — 22 comments, 1 👍. RSS growth causes repeated OOM kills and `launchd-handoff` restart cycles. P1, no new fix PR.
- [Issue #48788 — Centralized filename encoding utility for Content-Disposition handling](https://github.com/openclaw/openclaw/issues/48788) — 19 comments, 1 👍. Users need multi-encoding support (Shift-JIS, EUC-KR, GB18030) across channel adapters, not just the UTF-8/Latin-1 case.
- [Issue #102175 — Embedded prompt cache breaks across session boundaries](https://github.com/openclaw/openclaw/issues/102175) — 18 comments, 1 👍. Report describes model-visible tool inventory changing between turns, degrading prompt-cache reuse. P1 with `needs-security-review`.
- [Issue #87744 — Codex-backed Telegram turns repeatedly time out](https://github.com/openclaw/openclaw/issues/87744) — 17 comments, 4 👍. Work executes but `turn/completed` never fires, so Telegram users receive no final answer. Open since 2026.5.28.
- [Issue #96834 — WhatsApp 1:1 inbound image wedges the main lane ~3 minutes](https://github.com/openclaw/openclaw/issues/96834) — 14 comments, 1 👍. Native multimodal images strand queues in `active_reply_work` / `queued_work_without_active_run`.

Underlying needs: users are hitting **delivery guarantees** (messages dropped or silently lost), **memory/process lifecycle** problems, and **missing operational controls** (cost caps, encoding normalization, status surfaces).

## 5. Bugs & Stability

The most severe reported/updated issues today, ranked by priority:

**P0**
- [Issue #125333 — `totalTokens` inflation still reproduces on 2026.8.1-beta.2](https://github.com/openclaw/openclaw/issues/125333) — Prior fix only covers `api === "cli"`; memory-flush transcript path remains an unguarded ratchet. 5 comments, open.

**P1 — High-impact reliability**
- [Issue #91588 — Gateway memory leak / OOM crash loop](https://github.com/openclaw/openclaw/issues/91588) — RSS grows to 15.5GB over days; no new fix PR.
- [Issue #87744 — Codex-backed Telegram timeouts](https://github.com/openclaw/openclaw/issues/87744) — Turns never reach terminal state; no new fix PR.
- [Issue #96834 — WhatsApp image wedges main lane](https://github.com/openclaw/openclaw/issues/96834) — Post-#95039 regression; no new fix PR.
- [Issue #121953 — Cron turns stall on DeepSeek due to `[cron:` prefix deprioritization](https://github.com/openclaw/openclaw/issues/121953) — No new fix PR.
- [Issue #97616 — Unreaped hook/tool child processes cause zombie accumulation](https://github.com/openclaw/openclaw/issues/97616) — Runtime degradation; no new fix PR.
- [Issue #102175 — Embedded prompt cache breaks across boundaries](https://github.com/openclaw/openclaw/issues/102175) — Also touches session-state and security; no new fix PR.
- [Issue #127229 — Telegram watchdog-released durable update falsely tombstoned](https://github.com/openclaw/openclaw/issues/127229) — `source-repro` available; no new fix PR.
- [Issue #131150 — Slack DMs silently dropped after gateway restart with 19 accounts](https://github.com/openclaw/openclaw/issues/131150) — `prepareSlackMessage` returns null pre-gate; 6 comments.
- [Issue #100941 — Gateway drops concurrent in-process WebSocket connections under parallel tool fan-out](https://github.com/openclaw/openclaw/issues/100941) — 48 concurrent cron calls trigger WS 1006 and misleading "Gateway crashed" error.
- [Issue #101929 — Context-overflow precheck over-counts ~2.3–2.6x vs billed usage](https://github.com/openclaw/openclaw/issues/101929) — Causes false truncation recovery on non-urgent turns.
- [Issue #53540 — "Network connection lost" when LLM generates large tool-call parameters](https://github.com/openclaw/openclaw/issues/53540) — Param generation latency exceeds request timeout.

**P1/P2 — Channel-specific**
- [Issue #84516 — Codex replies silently truncated at ~1000-1100 chars](https://github.com/openclaw/openclaw/issues/84516) — No abort flag, no error, mid-sentence truncation.
- [Issue #86214 — Codex app-server client closes mid-turn with large `logs_2.sqlite`](https://github.com/openclaw/openclaw/issues/86214).
- [Issue #99586 — Runtime tool surface returns blank body after gateway-touching operations](https://github.com/openclaw/openclaw/issues/99586).

**Closed/regression reports in the 24h window**
- [Issue #90325 — Matrix channel dispatch broken in v2026.6.1](https://github.com/openclaw/openclaw/issues/90325) — Closed; regression with `TypeError: Cannot read properties of undefined (reading 'run')`.
- [Issue #112196 — `memory_search` transient sync timeout masks as provider failure](https://github.com/openclaw/openclaw/issues/112196) — Closed.
- [Issue #119884 — DB migration doesn't ANALYZE → stale planner stats → 15s session ops](https://github.com/openclaw/openclaw/issues/119884) — Closed, with linked PR.

Most stability issues are still awaiting maintainer review and do not have new fix PRs today.

## 6. Feature Requests & Roadmap Signals

Active feature requests likely to influence the roadmap:

- [Issue #42475 — Per-agent cost budget enforcement at gateway level](https://github.com/openclaw/openclaw/issues/42475) — Strong candidate for next versions given operator demand and no external-monitoring requirement.
- [Issue #48788 — Centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788) — Architectural follow-up to an existing Feishu fix; likely to be picked up across channel adapters.
- [Issue #52640 — Persistent task-status surface for long-running channel turns](https://github.com/openclaw/openclaw/issues/52640) — Discord first, generic abstraction later.
- [Issue #74704 — Stabilize `@openclaw/sdk` app-client happy path](https://github.com/openclaw/openclaw/issues/74704) — Maintainer-labeled, relevant for external clients.
- [Issue #79164 — Automatic config rollback on gateway failure](https://github.com/openclaw/openclaw/issues/79164) — Pre-apply backup, post-write health check, rollback.
- [Issue #51028 — Sort sessions by last meaningful activity](https://github.com/openclaw/openclaw/issues/51028) — UX improvement against heartbeat noise.

Release preparation PRs indicate **2026.7.33 extended-stable** and **2026.9.1-beta.1** are the next expected versions. These releases are more likely to contain stability fixes (profile roots, media ownership, voice-note transcripts, redaction performance) than the larger feature asks above.

## 7. User Feedback Summary

The clearest user pain points evident from the last 24h:

- **Silent message loss / missing final replies** appears across Telegram, WhatsApp, Slack, Matrix, Discord, and Codex app-server paths. Users repeatedly report work being done but never delivered.
- **Memory and process instability** is severe: OOM kills, zombie accumulation, and WebSocket drops under parallel load make the gateway feel fragile in long-running deployments.
- **Misleading errors and false alarms** are common: `recovered=1` while MCP loopback is not reconnected, `memory_search` showing "database is not open" when the provider is healthy, and context-overflow firing on turns nowhere near the limit.
- **Model-specific behavior** is creating support load: DeepSeek deprioritizes `[cron:` prefixed messages; strict OpenAI-compatible providers reject `null` content; smaller models degrade under system-prompt bloat.
- **Power users want operational control**: per-agent cost budgets, config rollback, durable delivery semantics, and sorting by meaningful activity rather than message timestamps.

Satisfaction signals are mixed: users are actively contributing PRs and detailed repros, but the high share of P1 issues with `needs-maintainer-review` suggests frustration with response latency.

## 8. Backlog Watch

Issues and PRs that deserve maintainer attention due to age, severity, or lack of new activity:

- [Issue #91588 — P1 gateway memory leak / OOM](https://github.com/openclaw/openclaw/issues/91588) — Open since June 2026, 22 comments, P1, no new fix PR.
- [Issue #87744 — P1 Codex Telegram timeouts](https://github.com/openclaw/openclaw/issues/87744) — Open since May 2026, 17 comments, 4 👍, no new fix PR.
- [Issue #96834 — P1 WhatsApp image lane wedge](https://github.com/openclaw/openclaw/issues/96834) — Open since June 2026, P1, no new fix PR.
- [Issue #102175 — P1 prompt cache break across boundaries](https://github.com/openclaw/openclaw/issues/102175) — Open since July 2026, security/session-state impacts.
- [Issue #48788 — Filename encoding utility](https://github.com/openclaw/openclaw/issues/48788) — Open since March 2026; 19 comments, still needs product decision.
- [Issue #42475 — Per-agent cost budgets](https://github.com/openclaw/openclaw/issues/42475) — Open since March 2026; active discussion but no implementation.
- [Issue #74586 — AM embedded run aborts `memory_search` tool calls](https://github.com/openclaw/openclaw/issues/74586) — Open since April 2026, 13 comments, 3 👍.
- [Issue #65374 — Dreaming system contaminates agent identity in multi-agent setups](https://github.com/openclaw/openclaw/issues/65374) — Open since April 2026, security/data-loss impacts.

PRs waiting for maintainer review or author response include:

- [PR #133252 — honor environment-selected profile roots](https://github.com/openclaw/openclaw/pull/133252) — `ready for maintainer look`.
- [PR #125071 — sidebar updates CTA](https://github.com/openclaw/openclaw/pull/125071) — `waiting on author`.
- [PR #120589 — backfill tool args when provider skips `input_json_delta`](https://github.com/openclaw/openclaw/pull/120589) — `waiting on author`, large.
- [PR #132081 — cron `failureAlert` delivery is never awaited](https://github.com/openclaw/openclaw/pull/132081) — `waiting on author`, P1, two merge-risk labels.

The overall picture: strong community engagement and detailed bug reports, but a growing backlog of P1 reliability issues needing maintainer review and merge decisions.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — AI Agent Open-Source Ecosystem
**Date:** 2026-08-30 | **Scope:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem remains in a rapid-growth but reliability-constrained phase. Across five surveyed projects, **community engagement is strong** (over 670 issues and 620 PRs updated in 24 hours), yet no project shipped a release in this window — release cadence is clearly subordinate to stability work. The dominant shared pain point is **delivery guarantees**: users repeatedly report work being executed but never delivered (Telegram timeouts, Slack drops, WhatsApp wedges, Buzz `@token` drops), across every project. A second major theme is **session-state correctness** — message drift, stale snapshots, corrupted history, and config persistence failures erode trust in long-running deployments. Notably, **security is now a first-class concern**: ZeroClaw closed an S0 cross-agent cron vulnerability, OpenClaw has P1 issues under security review, and Hermes tracks session-ownership risks. The ecosystem is also bifurcating: large gateway-style projects (OpenClaw, ZeroClaw) emphasize multi-channel operations and governance, while Hermes and QwenPaw focus on Desktop/console UX and deployment flexibility. The strongest forward-looking signals are **remote/hybrid execution** (Hermes #18715, 27 👍), **multi-tenant team deployment** (QwenPaw Hub), and **local-first runtime profiles** (ZeroClaw `local_small`).

---

## 2. Activity Comparison

*Metrics from the last 24 hours (2026-08-30), per project digests.*

| Project | Issues Updated (Open/Closed) | PRs Updated (Open/Merged-Closed) | Release Status | Health Score* | Notable Wins / Risks |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (350 / 150) | 500 (354 / 146) | None; 2 prep PRs (`2026.7.33`, `2026.9.1-beta.1`) | ⚠️ 6/10 | Large community, but maintainer-review bottleneck; P1 issues lack fix PRs |
| **Hermes Agent** | 50 (45 / 5) | 50 (48 / 2) | None | ✅ 7/10 | Merged P0 prompt-cache affinity fix across 5 transports; same-day fix cadence |
| **IronClaw** | 0 (0 / 0) | 6 (6 / 0) | None | ⚠️ 6/10 | PR-only day, zero merges; strong core-authored fixes pending review |
| **QwenPaw** | 12 (n/a) | 13 (10 / 3) | None | ✅ 7/10 | 3 PRs merged incl. provider expansion; first-time contributors active |
| **ZeroClaw** | 50 (39 / 11) | 50 (45 / 5) | None; next release absorbs 2 merged fixes | ✅ 8/10 | S0 cron vuln closed; Landlock sandbox fix landed; healthy close-to-churn ratio |

**Health score** is a qualitative composite of: issue-resolution throughput, PR merge ratio, severest open bugs, maintainer responsiveness, and process maturity (not a quantitative benchmark).

**Key takeaways:**
- **OpenClaw dominates in raw volume** — 10× the issue/PR activity of Hermes or ZeroClaw — but a notable share of its P1 backlog lacks fix PRs, indicating triage/review saturation.
- **ZeroClaw shows the healthiest balance**: 11 issues closed, 5 PRs merged, S0 security item resolved, and active RFC governance.
- **IronClaw is the outlier**: no issues and no merges; the 6 open PRs all target runtime/CI correctness, suggesting a deliberate small-team stabilization phase.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale and gravity**: 500 issues and 500 PRs updated daily — roughly 10× Hermes/ZeroClaw and 40× IronClaw. This volume makes OpenClaw the de facto reference implementation and the largest contributor pool.
- **Channel breadth**: The bug surface spans Telegram, WhatsApp, Slack, Matrix, Discord, Feishu, and Codex app-server — a channel-adapter portfolio no other surveyed project matches.
- **Release discipline**: Active prep for two lines (`2026.7.33 extended-stable`, `2026.9.1-beta.1`) signals a mature dual-track stability/feature pipeline.
- **Labeled triage system**: `clawsweeper` labels provide transparency into review states, even if the queue is backlogged.

**Technical approach differences:**
- OpenClaw is **gateway-centric**: a central gateway brokers all channels, sessions, media ownership, and model dispatch. This centralization enables cross-channel consistency (e.g., media ownership commits, profile-root honoring) but is also the source of its worst failure modes (gateway memory leaks, WebSocket drops, launchd-handoff restart cycles).
- Contrast: Hermes is **Desktop/connection-centric** (SSH sessions, local/remote hybrids); ZeroClaw is **security/RFC-governance-centric**; IronClaw is **Rust core-loop-centric**.

**Community size comparison (proxy: 24h update volume):**

| Project | Issues+PRs Updated | Community Signal |
|---|---|---|
| OpenClaw | ~1,000 | Very large, active, but maintainer-bottlenecked |
| Hermes / ZeroClaw | ~100 each | Large, healthy triage and governance |
| QwenPaw | ~25 | Mid-size, growing, welcoming to first-timers |
| IronClaw | ~6 | Small, specialized, core-contributor driven |

**Weaknesses / watch items:**
- P1 reliability issues (gateway memory leak #91588, Telegram timeouts #87744, WhatsApp wedge #96834) have been open for months **without fix PRs** — an execution gap that smaller projects like ZeroClaw are closing faster.
- Cost-budget enforcement (#42475) and filename-encoding utility (#48788) remain unimplemented since March, despite strong operator demand.

---

## 4. Shared Technical Focus Areas

Requirements emerging across multiple projects — these are ecosystem-level signals, not isolated issues.

| Focus Area | Projects Affected | Specific Needs |
|---|---|---|
| **Delivery guarantees / silent message loss** | OpenClaw, Hermes, QwenPaw | Work executes but replies never arrive: Telegram timeouts (OpenClaw #87744), Slack drops after restart (#131150), WhatsApp lane wedge (#96834), Buzz `@token` drops (Hermes #78797), duplicate error delivery (#72131), wrong-agent message drift (QwenPaw #7407). Users consistently demand "durable delivery semantics." |
| **Session-state persistence & integrity** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Session-state corruption (OpenClaw, general), stale-snapshot concurrent turns (Hermes #84235), empty output blocks poisoning history (QwenPaw #7402), Feishu config silently cleared (#7408), session-scoped prompt persistence (ZeroClaw #9998), memory-storage RFC (#9103). |
| **Provider compatibility & streaming robustness** | OpenClaw, Hermes, QwenPaw, ZeroClaw, IronClaw | DeepSeek cron-prefix deprioritization (OpenClaw #121953); Bedrock reasoning-signature loss (Hermes #36260); Ark Responses API 400 on empty blocks (QwenPaw #7402); OpenRouter total-request timeout killing long streams (ZeroClaw #10436, fix PR #10442); strict-provider rejection of `null` content (OpenClaw). |
| **Cost & operational control** | OpenClaw, Hermes, ZeroClaw | Per-agent daily/monthly cost caps enforced pre-dispatch (OpenClaw #42475); 503s should trigger fallback chains, not retry-then-fail (Hermes #68771); compact local model profiles to cut inference cost (ZeroClaw #5287). |
| **Security & multi-agent isolation** | ZeroClaw, OpenClaw, Hermes | Cross-agent cron access (ZeroClaw S0 #9947, closed — + follow-up rename race #10324); temp-file permissions 0o644 (ZeroClaw #10409); prompt-cache security review (OpenClaw #102175); Desktop session ownership/approval resolution (Hermes #96394). |
| **CI / test reliability** | ZeroClaw, IronClaw, OpenClaw | Flaky parallel-runtime tests (ZeroClaw #9965, #10371); CI unification and macOS pre-push fix (IronClaw #7992, #7991); DB migration missing ANALYZE causing stale planner stats (OpenClaw #119884, closed with PR). |
| **Memory & context management** | Hermes, OpenClaw, ZeroClaw | Prompt-cache affinity unified across 5 transports (Hermes #98170, merged P0); embedded prompt-cache breaks across session boundaries (OpenClaw #102175); context compaction anchored to model window (ZeroClaw #9535); context-overflow precheck over-counting (OpenClaw #101929). |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Technical Architecture |
|---|---|---|---|
| **OpenClaw** | Multi-channel gateway reliability; enterprise-grade operations | Operators running many channels/accounts at scale; power users needing cost caps and durable delivery | Central gateway with channel adapters, media-ownership lifecycle, dual release lines (extended-stable + beta) |
| **Hermes Agent** | Desktop-first personal agent; remote/hybrid deployment; multi-provider transport | Individual power users; researchers; Desktop app users who also want SSH/remote execution | Desktop app + gateway; connection registry (`connection.json` → `connections.json`); 5 provider transports with unified caching (OpenAI, Codex, OpenRouter, Nous, Grok) |
| **IronClaw** | Rust-based agent core safety; CI/dev-experience; codebase knowledge graph | Rust developers; teams embedding agent loops into production tooling | Single `cargo nextest` integration path; loop termination safeguards; committed knowledge-graph snapshot; pre-push gates |
| **QwenPaw** | Alibaba/Ark ecosystem integration; Console chat UX; multi-tenant Hub (2.2.0) | Aliyun/Ark users; teams wanting a path from personal to team deployment; CJK users | PawApp SDK/runtime; Console web UI; provider token-plan catalogs; explicit multi-tenant roadmap |
| **ZeroClaw** | Security-hardened agent runtime; RFC-driven governance; local-first models | Security-conscious operators; multi-agent deployments; local-model users (Ollama, Hailo); ZeroCode IDE users | Landlock sandbox with `allowed_roots` tiers; agent-scoped cron; RFC/maintainer-decision-queue governance; `local_small` compact profile; webhook channel abstraction |

**Key axes of differentiation:**
- **Deployment model**: OpenClaw and ZeroClaw = server/gateway-centric; Hermes = Desktop + remote hybrid; QwenPaw = cloud-ecosystem + console; IronClaw = embedded library/core.
- **Governance style**: ZeroClaw is the most process-driven (formal RFC votes, decision-queue tracker); OpenClaw relies on community reporting + label triage (currently backlogged); Hermes and QwenPaw are pragmatic fix-forward; IronClaw is core-committer driven.
- **Security posture**: ZeroClaw leads with sandboxing (Landlock) and S0-class isolation fixes; OpenClaw has security-labeled P1s awaiting review; Hermes focuses on session-ownership/approval trust.

---

## 6. Community Momentum & Maturity

**Activity tiers (by 24h update volume and throughput):**

- **Tier 1 — High volume, high iteration:** **OpenClaw** (~1,000 updates) and **ZeroClaw** (~100 updates) — both process large issue/PR flows daily. ZeroClaw converts activity into merges and closures at a healthier rate.
- **Tier 2 — Moderate, healthy cadence:** **Hermes Agent** (~100 updates) — strong triage discipline, merged a P0 fix within the window; tail of long-lived community PRs indicates some reviewer bandwidth strain. **QwenPaw** (~25 updates) — small but efficient; 3 PRs merged, first-time contributors welcomed, roadmap debate active.
- **Tier 3 — Low volume, stabilization:** **IronClaw** (6 PRs, 0 merged) — small-team mode; the PR set suggests deliberate CI and runtime-hardening work rather than stalled development.

**Rapidly iterating:**
- **Hermes**: same-day fix PRs referencing this week's issues; prompt-cache affinity unification (#98170) is a significant architectural win.
- **ZeroClaw**: S0 vulnerability closed, Landlock fix merged, memory-storage RFC actively revised — demonstrates both security velocity and governance throughput.
- **QwenPaw**: merged 3 PRs including provider catalog expansion; DingTalk feature PR from a first-time contributor suggests good onboarding.

**Stabilizing / consolidating:**
- **OpenClaw**: Two release-prep PRs active; 146 PRs merged/closed, but the open P1 queue (memory leak, timeouts, channel wedges) is barely moving. The project is iterating on surface area (UI warnings, refresh storms) while core reliability debts accumulate.
- **IronClaw**: No new features; all active PRs fix runtime termination, CI determinism, and tool-error clarity — the profile of a project paying down technical debt before its next expansion.

**Maturity signal:** ZeroClaw's RFC process (#8692 decision queue, #9103 REVISE vote) and OpenClaw's dual release lines are the most mature governance artifacts. Hermes is maturing quickly via systematic sweeper labels (`risk-message-delivery`, `needs-decision`). IronClaw's knowledge-graph snapshot automation indicates investment in developer self-service.

---

## 7. Trend Signals

**Industry trends extracted from community feedback — and what they mean for AI agent developers:**

1. **Delivery guarantees are the new table stakes.** Silent message loss appears in every project and every major channel. Users will tolerate slow agents, but not silent ones. **Implication:** build explicit delivery acknowledgement (turn/completed events, idempotent retries, dead-letter visibility) into any agent gateway from day one.

2. **Multi-agent security is shifting from feature to requirement.** ZeroClaw's S0 cron isolation hole, OpenClaw's prompt-cache security review, and Hermes's session-ownership bugs all point to the same lesson: as multi-agent deployments grow, agent-scoped resource isolation (cron, memory, files, sessions) must be designed in, not bolted on. **Implication:** treat every tool/resource as principal-bound; audit cross-agent access paths early.

3. **Remote/hybrid execution is the top product gap.** Hermes's #18715 (27 👍 — highest in this survey) and the draft SSH-awareness PR (#98497) signal that users want *agent brain on server, tools on local machine*. This is an architectural pattern worth betting on. **Implication:** design agent backends to be transport-agnostic and tool-execution-local from the start.

4. **Local-first and small-model profiles are becoming first-class.** ZeroClaw's `local_small` (8K system-prompt ceiling, compact skill metadata) and QwenPaw's Aliyun token-plan expansion show the market bifurcating: cloud frontier models + local/edge models in one runtime. **Implication:** prompt-budget contracts and compact skill metadata will be as important as context-window size.

5. **Cost governance must live in the gateway, not the monitoring stack.** Per-agent cost budgets (OpenClaw #42475), fallback-chain triggers on 503s (Hermes #68771), and compression precheck fixes (OpenClaw #101929) all demand *pre-dispatch* enforcement — not post-hoc alerts. **Implication:** expose cost-budget hooks in the model-dispatch layer; make over-budget a first-class control-flow condition.

6. **Streaming UX is the next competitive differentiator.** ZeroClaw's SSE webhook streaming request (#10419), Telegram progress visibility (#10426), QwenPaw's Plan Mode (#7405), and OpenClaw's WebSocket fan-out issues all orbit the same need: **users want to see progress, not just final answers.** **Implication:** interim status events (tool calls, reasoning, queue position) are as important as the final payload.

7. **RFC-driven governance correlates with security maturity.** ZeroClaw — the only project with a formal decision queue and REVISE votes — also shipped the only S0 fix this window. As projects scale, structured design review appears to accelerate high-stakes fixes rather than slow them down. **Implication:** adopt lightweight RFC workflows before the security backlog forces them on you.

8. **Config/diagnostic honesty is an emerging trust factor.** Misleading errors ("Gateway crashed" on WS 1006, `recovered=1` without reconnection, truncated replies with no abort flag, errors delivered twice) generate disproportionate user frustration. **Implication:** invest in error-classification accuracy (unresolvable tool vs. encoding error — IronClaw #7990; requested vs. pinned model — ZeroClaw #10326) as a UX feature.

---

*Report compiled from official project digests dated 2026-08-30. All metrics are 24-hour snapshot values; health scores are qualitative analyst assessments.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-30

## 1. Today's Overview

Hermes Agent saw sustained high activity on 2026-08-30: 50 issues and 50 PRs were updated in the last 24 hours (45 open / 5 closed issues; 48 open / 2 merged-closed PRs), with no new releases published. Activity concentrated on Desktop app reliability, session-state correctness, and provider-adapter compatibility, with two P1 bugs filed around unanswerable Desktop approvals and config corruption. Two notable PRs closed, including a P0 prompt-cache affinity fix unifying conversation caching across five provider transports. The community's strongest demand remains remote/hybrid deployment (remote agent + local tools, 27 👍) and multi-bot Group Chat continuity, both actively being worked. Overall the project shows healthy triage cadence — several same-day fix PRs reference issues from this week — though a tail of long-lived open PRs suggests maintainer bandwidth is stretched.

## 2. Releases

No new releases were published in this window. (Omitted per no-release data.)

## 3. Project Progress

**Merged/closed PRs (2):**

- [PR #98170](https://github.com/NousResearch/hermes-agent/pull/98170) *(closed, P0)* — **fix(cache): honor host-declared session key and conversation epoch for prompt cache affinity.** Unifies host-declared conversation-affinity caching across OpenAI, Codex, OpenRouter, Nous, and Grok transports; resolves per-response session churn described in [#96811](https://github.com/NousResearch/hermes-agent/issues/96811) and builds on foundational work from #97158 and #97709.
- [PR #98492](https://github.com/NousResearch/hermes-agent/pull/98492) *(closed)* — **fix(desktop): stop old SSH sessions from spawning duplicate backends.** Reopens pre-existing sessions over the active live SSH connection instead of routing untagged session rows through the local backend door, preventing duplicate backend processes and blank sessions.

**Notable closed issues:** [#98359](https://github.com/NousResearch/hermes-agent/issues/98359) (preflight plugin blocking all provider requests when Context Broker MCP is disabled) was resolved; [#98184](https://github.com/NousResearch/hermes-agent/issues/98184) (feature request) was deleted.

## 4. Community Hot Topics

| Item | Title | Activity |
|---|---|---|
| [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) | Support remote Hermes agent with local tool execution | 17 comments, **27 👍** |
| [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776) | Expose multi-bank routing for Hindsight memory tools | 9 comments |
| [Issue #68771](https://github.com/NousResearch/hermes-agent/issues/68771) | Treat provider 5xx (503 capacity) as fallback-chain trigger, not retry-then-fail | 7 comments |
| [Issue #72131](https://github.com/NousResearch/hermes-agent/issues/72131) | Provider errors delivered twice on adapters without `send_or_update_status` | 5 comments |
| [Issue #96394](https://github.com/NousResearch/hermes-agent/issues/96394) | P1: Desktop makes every approval unanswerable on single-connection installs | 4 comments |
| [Issue #78797](https://github.com/NousResearch/hermes-agent/issues/78797) | Buzz adapter silently drops replies with unresolvable `@token` | 4 comments |

**Underlying needs:** The #1 topic by far is deployment flexibility — users want to keep skills, memory, and model config on a remote agent while executing tools locally (45 open issues, long-lived demand since May). Provider resilience is the second theme: 503 overloads should trigger fallback chains, and error delivery must not duplicate. Message-delivery guarantees on adapters (Telegram, Buzz, cron) and Desktop session ownership are recurring trust issues.

## 5. Bugs & Stability

### P1 — Critical
- [Issue #96394](https://github.com/NousResearch/hermes-agent/issues/96394) — **Desktop makes every approval unanswerable** on single-connection/single-profile installs: `ambientGatewayOwnsEverySession()` is unreachable, so `approval.respond` always fails owner resolution. *(needs-decision, risk-session-state)*
- [Issue #84064](https://github.com/NousResearch/hermes-agent/issues/84064) — **`hermes config set/unset` breaks on provider keys containing literal dots** with no escaping; silently corrupts `config.yaml` (realistic for versioned provider names). *(risk-compatibility)*

### P2 — High impact
- [Issue #98222](https://github.com/NousResearch/hermes-agent/issues/98222) — `execute_code` remote kernel spawn **always fails** on Docker/SSH/Modal; `_rewrite_compound_background` corrupts valid commands containing `&`. *(new today, 3 comments)*
- [Issue #98028](https://github.com/NousResearch/hermes-agent/issues/98028) — Deliberate client absence (closing Desktop / PC asleep) **kills the in-flight turn** after the 20s `ws_orphan_reap` grace — a behavior regression breaking overnight remote work.
- [Issue #94862](https://github.com/NousResearch/hermes-agent/issues/94862) — Desktop cron ticker **steals other profiles' jobs** and delivers them via the default profile's Telegram bot.
- [Issue #84235](https://github.com/NousResearch/hermes-agent/issues/84235) — Concurrent turns on the same session act on **stale snapshots**, causing duplicate execution and real-world side effects. *(needs-repro)*
- [Issue #98466](https://github.com/NousResearch/hermes-agent/issues/98466) — Auxiliary retry/fallback attempts **bypass the progress-hook wrapper** (18 of 24 relay call sites pass no `create=`), so the compression idle watchdog kills healthy calls. *(new today)*
- [Issue #36260](https://github.com/NousResearch/hermes-agent/issues/36260) — Bedrock Converse **drops reasoning signatures** and reads the wrong schema key → interleaved thinking lost / signature-replay 400.
- [Issue #73403](https://github.com/NousResearch/hermes-agent/issues/73403) — Windows ACP adapter **hangs when executing the terminal tool** (Git Bash probing); fix PR #69083 referenced.
- [Issue #68771](https://github.com/NousResearch/hermes-agent/issues/68771) — Provider 503 handled as retry-then-fail instead of **fallback-chain trigger**.
- [Issue #72131](https://github.com/NousResearch/hermes-agent/issues/72131) — Provider failure reaches chat **twice** on adapters without `send_or_update_status`. *(risk-message-delivery)*
- [Issue #96742](https://github.com/NousResearch/hermes-agent/issues/96742) — SSH-only `connection.json` never reconciled into v2 `connections.json` registry; Desktop silently falls back to "This device". *(risk-compatibility)*
- [Issue #21532](https://github.com/NousResearch/hermes-agent/issues/21532) — CDP browser mode does not **close tabs on cleanup**, causing memory exhaustion.
- [Issue #83904](https://github.com/NousResearch/hermes-agent/issues/83904) — Cron jobs scheduled from Desktop have **no delivery path** back to the active chat.
- [Issue #98439](https://github.com/NousResearch/hermes-agent/issues/98439) — `hermes update` on Windows aborts with **Error 5** when gateway runs as a Scheduled Task. *(new today)*

### P3 — Lower severity
- [Issue #98467](https://github.com/NousResearch/hermes-agent/issues/98467) — Desktop re-remembers exhausted sessions after cleanup; every relaunch reopens the dead chat. *(new today)*
- [Issue #31277](https://github.com/NousResearch/hermes-agent/issues/31277) — Native Bedrock Converse missing `context-1m` beta header; Opus stuck at 200K.
- [Issue #78797](https://github.com/NousResearch/hermes-agent/issues/78797) — Buzz adapter silently drops entire replies when text contains an unresolvable `@token`.
- [Issue #77564](https://github.com/NousResearch/hermes-agent/issues/77564) — Nous Portal profile forwards `provider_routing` prefs → **HTTP 400 on every request**.
- [Issue #73151](https://github.com/NousResearch/hermes-agent/issues/73151) — macOS shows **two Dock icons** (setup app needs `LSUIElement`).

**Fix PRs in flight:** [#98496](https://github.com/NousResearch/hermes-agent/pull/98496) (compression accepts `reasoning_content`), [#98500](https://github.com/NousResearch/hermes-agent/pull/98500) (audit-log session end/reopen), [#98389](https://github.com/NousResearch/hermes-agent/pull/98389) (desktop-update `.venv` fallback), [#89804](https://github.com/NousResearch/hermes-agent/pull/89804) (half-open probes through stale give-up breaker), [#71745](https://github.com/NousResearch/hermes-agent/pull/71745) / [#71743](https://github.com/NousResearch/hermes-agent/pull/71743) (browser CDP eval/session fixes), [#94907](https://github.com/NousResearch/hermes-agent/pull/94907) (recoverable repeat skill reads), [#98499](https://github.com/NousResearch/hermes-agent/pull/98499) (vision `path:/local:` pseudo-scheme tolerance), [#97318](https://github.com/NousResearch/hermes-agent/pull/97318) (native video dialect negotiation), [#96106](https://github.com/NousResearch/hermes-agent/pull/96106) (Telegram oversized-media recovery).

## 6. Feature Requests & Roadmap Signals

**Strongest signals:**

- **Remote/hybrid execution** — [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) (27 👍) remains the highest-demand open feature. Draft PR [#98497](https://github.com/NousResearch/hermes-agent/pull/98497) (make the agent SSH-aware with terminal shell-out guidance + backend target host) directly advances this space.
- **Group Chat continuity** — [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681) plus two large draft PRs: [#98307](https://github.com/NousResearch/hermes-agent/pull/98307) (Group Chat continuity, control, and files — "field guide for the no-Desktop world") and [#98073](https://github.com/NousResearch/hermes-agent/pull/98073) (control Group Chats from messaging: Slack/Telegram/WhatsApp/Signal). This is clearly the active roadmap theme.
- **Memory system expansion** — [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776) (multi-bank routing for Hindsight memory tools) and [#35800](https://github.com/NousResearch/hermes-agent/issues/35800) (`.library` protected cold storage + intelligent Librarian + Curator compactor).
- **Telegram workflows** — [Issue #61136](https://github.com/NousResearch/hermes-agent/issues/61136) (persistent per-topic context and bound working directory for forum topics).
- **Desktop UX** — [Issue #98457](https://github.com/NousResearch/hermes-agent/issues/98457) (user-chosen color for own messages, marked duplicate) and [#98448](https://github.com/NousResearch/hermes-agent/issues/98448) (iOS support question).

**Prediction for next version:** The bot-mode Group Chat feature set (#98307/#98073) plus SSH awareness (#98497) are the most likely near-term additions, alongside continued Desktop/session-state hardening and the prompt-cache affinity work now merged in #98170.

## 7. User Feedback Summary

- **Deployment flexibility is the top ask:** users repeatedly request remote-agent-with-local-tools (#18715), SSH backends, and Group Chats that survive Desktop being closed (#97681). The SSH-awareness PR (#98497) directly answers a documented competency gap ("the agent is not competent at SSH today").
- **Desktop session/approval UX is the top pain point:** unanswerable approvals (#96394), dead sessions resurrecting on relaunch (#98467), duplicate SSH backends (#98492), stolen cron jobs (#94862), and no cron delivery path (#83904) all erode trust in Desktop as a reliable gateway.
- **Provider compatibility frustrations recur:** Bedrock context-window limits (#31277), reasoning-signature loss (#36260), Nous Portal rejecting OpenRouter-style routing prefs (#77564), and 503s not triggering fallbacks (#68771).
- **Adapter message-delivery reliability matters to users:** duplicate error messages (#72131), silently dropped Buzz replies (#78797), and Telegram oversized-media gaps (#96106) are called out with `risk-message-delivery` sweeper labels.
- **Windows users face disproportionate friction:** ACP hangs (#73403), update failures (#98439), and sandbox/sudo issues (#98135).

## 8. Backlog Watch

Items needing maintainer attention:

- [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — **Remote agent + local tool execution.** Open since May 2, 27 👍, 17 comments, still `needs-decision` after ~4 months. Highest-signal open feature with no resolution.
- [Issue #21532](https://github.com/NousResearch/hermes-agent/issues/21532) — CDP tab leak on cleanup, open since May 7 with 4 comments and no fix PR.
- [Issue #31277](https://github.com/NousResearch/hermes-agent/issues/31277) — Bedrock 1M-context beta not forwarded on native adapter; PR #16793 only patched the OpenAI-compat path. Open since May 24.
- [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776) — Hindsight multi-bank routing, open since May 25 with 9 comments.
- [Issue #35800](https://github.com/NousResearch/hermes-agent/issues/35800) — `.library` skill cold storage, open since May 31.
- [Issue #36260](https://github.com/NousResearch/hermes-agent/issues/36260) — Bedrock reasoning-signature round-tripping (P2), open since June 1.
- **Long-open PRs by chrisyoung2005** (open 6+ weeks): [#71745](https://github.com/NousResearch/hermes-agent/pull/71745) and [#71743](https://github.com/NousResearch/hermes-agent/pull/71743) (browser CDP fixes), [#66777](https://github.com/NousResearch/hermes-agent/pull/66777) (dashboard plugin toggles), [#64620](https://github.com/NousResearch/hermes-agent/pull/64620) (dashboard latest-descendant walk). All are P2/P3 with explicit issue references, yet remain unreviewed/merged.
- [PR #89804](https://github.com/NousResearch/hermes-agent/pull/89804) — half-open probes through the cross-turn stale give-up breaker (P2, open since Aug 19).
- [PR #89996](https://github.com/NousResearch/hermes-agent/pull/89996) — profile export should skip Unix sockets/special files (P2, open since Aug 19).

---

*Digest generated from Hermes Agent GitHub data (NousResearch/hermes-agent), 2026-08-30. All links reference the official repository.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-30

## Today's Overview
IronClaw activity over the last 24 hours was PR-only: 6 pull requests were updated, all still open, with 0 issues updated and 0 new releases. No PRs were merged or closed, so no completed feature work landed today. The active PRs are primarily core- and experienced-contributor fixes aimed at CI unification, loop termination behavior, and developer-experience bugs. Overall project health appears stable, though the lack of merges suggests a review/merge bottleneck rather than a lack of contribution.

## Releases
None. No new releases were published in this period.

## Project Progress
No PRs were merged or closed today.

Open PRs updated in the last 24 hours represent the main forward motion:

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) — Unify bounded integration execution into a single `cargo nextest run` with a fixed four-test concurrency ceiling, removing a redundant shell projection and per-group runner.
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — Fix loop termination on dominant repeated output and cap interactive wall-clock time, addressing non-progress production runs.
- [nearai/ironclaw PR #7988](https://github.com/nearai/ironclaw/pull/7988) — Automated refresh of the committed codebase knowledge graph snapshot.
- [nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991) — Fix the pre-push gate so it can run on macOS.
- [nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990) — Differentiate unresolvable tool names from genuine input-encoding errors in tool-disclosure failures.
- [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) — Make `list_dir` include the missing path in its error message.

## Community Hot Topics
No issues or PRs had comment/reaction activity in this window, so there is no community discussion to track.

The largest and most strategically significant open PRs are:

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) — XL-sized CI unification work; signals a push toward simpler, more deterministic integration testing.
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — XL-sized loop-termination fix; motivated by a production run that consumed 593 tool calls over 70 minutes without progress.

Both are core-authored and likely indicate maintainer focus on runtime reliability and CI cost control.

## Bugs & Stability
No new issues were filed, but several open PRs address real bugs:

- **High severity:** [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — The default loop family can no longer terminate on non-progress after a previous digest-based terminator was removed. A production run ran 593 tool calls over 70 minutes. The fix restores termination on dominant repeated output and adds an interactive wall-clock cap.
- **Medium severity:** [nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990) — Unresolvable tool names are incorrectly classified as `FailureKind::InputEncode`, conflating two unrelated failure modes.
- **Medium severity:** [nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991) — The pre-push hook fails on macOS due to two independent causes, which can lead to developers bypassing the hook entirely.
- **Low severity:** [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) — `list_dir` reports a failure for a missing directory without telling the model which path was not found.

All four fixes are open and not yet merged.

## Feature Requests & Roadmap Signals
No explicit feature requests were present in issues or PRs.

Roadmap signals from open PRs:

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) suggests future CI runs will be consolidated into a single integration execution path with bounded concurrency.
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) points to stronger runtime safeguards for interactive agent loops.
- [nearai/ironclaw PR #7988](https://github.com/nearai/ironclaw/pull/7988) indicates ongoing investment in codebase-memory/knowledge-graph freshness.

If merged, the loop-termination and tool-disclosure fixes are the most likely candidates to appear in the next release.

## User Feedback Summary
No direct user feedback or issue-based satisfaction signals were recorded in this window.

Contributor-reported pain points include:

- macOS developers cannot reliably run the pre-push hook, creating a risk of bypassed validation.
- Agent-facing errors sometimes omit the concrete path or misclassify the failure kind, making tool failures harder for models to interpret and recover from.
- Non-progress agent loops can run for very long periods, wasting time and compute.

No positive or negative community sentiment data is available.

## Backlog Watch
No long-unanswered issues are currently open.

The oldest open PR needing attention is [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977), created 2026-08-28 and still open. Given its severity — preventing runaway production loops — it deserves prompt maintainer review. [nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991), [nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990), and [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) have been open since 2026-08-29 and should also be reviewed in the near term.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-08-30

## 1. Today's Overview

QwenPaw is in a highly active development cycle: 12 issues and 13 PRs were updated in the last 24 hours, with 3 PRs closed/merged and no new releases. The project shows strong community engagement, including two first-time contributor PRs (#7416, #7403) and a lively roadmap discussion around the upcoming multi-tenant QwenPaw Hub (#7318). Maintenance work is focused on reliability fixes for the PawApp SDK/runtime, Console chat behavior, and provider compatibility. Overall project health appears solid, though several stability bugs around persisted session state and channel configuration deserve prompt attention.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Three PRs were closed/merged today:

- **[#6293 — feat(providers): add qwen3.8 to Aliyun Token Plan](https://github.com/agentscope-ai/QwenPaw/pull/6293)**  
  Registers `qwen3.8-max-preview` in the Aliyun Token Plan catalog, with text/image capability, a 1,000,000-token context window, and a 65,536-token output limit. This expands QwenPaw's provider coverage for Aliyun users.

- **[#6581 — fix(console): avoid redundant multimodal upload warning](https://github.com/agentscope-ai/QwenPaw/pull/6581)**  
  Removes repeated "no multimodal support" warning toasts when attachments are uploaded, while preserving model capability hints in tooltips and image-only model warnings.

- **[#7191 — fix(console): preserve non-ASCII file card names](https://github.com/agentscope-ai/QwenPaw/pull/7191)**  
  Fixes #7136 by teaching the Console tool-card parser to read `name` in addition to `filename`, preventing non-ASCII upload names from being displayed as percent-encoded URL basenames.

Several open PRs also advanced or were updated, including #7416 (DingTalk `card_auto_layout` UI toggle), #7415/#7414/#7413 (PawApp/runtime reliability fixes), and #7409 (dropping empty assistant text blocks).

## 4. Community Hot Topics

- **[#7318 — QwenPaw Hub multi-tenant edition: what should we build next?](https://github.com/agentscope-ai/QwenPaw/issues/7318)**  
  *14 comments · 👍 1*  
  The most active thread this week. The community is discussing priorities for QwenPaw Hub, the upcoming multi-tenant edition in 2.2.0. The underlying need is clear: users want a supported path from personal assistant to team deployment, including multi-user access and admin-managed skills.

- **[#7405 — Question: Plan Mode](https://github.com/agentscope-ai/QwenPaw/issues/7405)**  
  Users want a way to preview the model's plan before execution, instead of only discovering mistakes after the fact and rolling back via snapshots. This mirrors a common desire for safer autonomous agent workflows.

- **[#7398 — Feature: add /btw side-question command](https://github.com/agentscope-ai/QwenPaw/issues/7398)**  
  Requested to allow quick side questions without polluting main conversation history or consuming context window — inspired by Claude Code's `/btw`.

- **[#7406 — Add official theming support](https://github.com/agentscope-ai/QwenPaw/issues/7406)**  
  Users want configurable accent color, font, and spacing in QwenPaw Desktop. Unsatisfied users are currently editing `index.html` inside the app bundle, which breaks on updates.

## 5. Bugs & Stability

Reported bugs ranked by severity:

- **High — [#7407: Console messages silently drift to the wrong agent](https://github.com/agentscope-ai/QwenPaw/issues/7407)**  
  Chat messages can be delivered to the wrong agent. This is a potentially confusing data-integrity issue. No fix PR linked yet; needs maintainer reproduction.

- **High — [#7402: Empty assistant `output_text` blocks poison session history](https://github.com/agentscope-ai/QwenPaw/issues/7402)**  
  Empty text blocks persisted in history cause later Ark Responses API calls to fail with `400 MissingParameter`. A fix PR exists: **[#7409 — fix(agents): drop empty assistant text blocks](https://github.com/agentscope-ai/QwenPaw/pull/7409)**.

- **High — [#7408: Feishu channel config unexpectedly cleared](https://github.com/agentscope-ai/QwenPaw/issues/7408)**  
  `channels.feishu` settings were emptied, disabling the channel and causing cron delivery to fail with `KeyError('channel not found: feishu')`. Needs investigation into config persistence.

- **Medium — [#7411: PawApp fail closed when agent chat runtime is unavailable](https://github.com/agentscope-ai/QwenPaw/issues/7411)**  
  Synthetic fallback responses can mask missing runtimes. Fix PR: **[#7414](https://github.com/agentscope-ai/QwenPaw/pull/7414)**.

- **Medium — [#7410: Runtime loses partial state when async generator is closed](https://github.com/agentscope-ai/QwenPaw/issues/7410)**  
  GeneratorExit bypasses cancellation-state persistence. Fix PR: **[#7413](https://github.com/agentscope-ai/QwenPaw/pull/7413)**.

- **Medium — [#7412: PawApp SDK stream cleanup can block or race](https://github.com/agentscope-ai/QwenPaw/issues/7412)**  
  Stalled `reader.cancel` calls and races during cancellation/failure/completion. Fix PR: **[#7415](https://github.com/agentscope-ai/QwenPaw/pull/7415)**.

## 6. Feature Requests & Roadmap Signals

- **QwenPaw Hub / multi-tenant support (#7318)** is the strongest roadmap signal — explicitly targeted for 2.2.0. Community input will shape its feature set.
- **DingTalk `card_auto_layout` Console exposure (#7404)** has already resulted in a first-time contributor PR: **[#7416](https://github.com/agentscope-ai/QwenPaw/pull/7416)**. This is likely to land soon.
- **Chat UX improvements** are gaining traction: scroll lock (#7356), tool call visibility toggle (#7357), and `/btw` side questions (#7398) all target making long agent conversations more readable and less noisy.
- **Theming support (#7406)** may be a candidate for a future Desktop release if maintainers adopt the request.
- **Plan Mode (#7405)** remains an open question; if prioritized, it would give users safer pre-execution visibility.

## 7. User Feedback Summary

Users are actively pushing QwenPaw beyond the single-user assistant scenario, with repeated demand for team/multi-tenant capabilities (#7318). There is notable enthusiasm for workflow-safety features like Plan Mode (#7405) and side-question commands (#7398), indicating users want more control over agent behavior and context. On the pain-point side, several users report configuration and state persistence issues: Feishu channel configs being silently cleared (#7408), session history being poisoned by empty text blocks (#7402), and messages drifting to wrong agents (#7407). These are high-trust issues and should be prioritized. Positive signals include first-time contributors submitting focused, high-quality PRs (#7416, #7403), which suggests a welcoming contributor experience.

## 8. Backlog Watch

- **[#6889 — fix(console): preserve textarea target for IME events](https://github.com/agentscope-ai/QwenPaw/pull/6889)**  
  Open since 2026-08-11, this fix addresses IME composition issues in the `RichFileReferenceInput` / Sender textarea path. It has been waiting over two weeks for review and is important for CJK users.

- **[#7356 — feat(console): add chat scroll lock](https://github.com/agentscope-ai/QwenPaw/pull/7356)** and **[#7357 — feat(chat): add tool call visibility toggle](https://github.com/agentscope-ai/QwenPaw/pull/7357)**  
  Both open since 2026-08-27 with no visible comments. They are community-contributed UX improvements that directly address common complaints about noisy/long streaming conversations.

- **[#7403 — Update README](https://github.com/agentscope-ai/QwenPaw/pull/7403)**  
  A first-time contributor PR still using the template placeholder; needs maintainer engagement or guidance to be either completed or closed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-30

## 1. Today's Overview

ZeroClaw saw a very active development window: 50 issues and 50 PRs were updated in the last 24 hours, with 11 issues closed and 5 PRs merged/closed — a healthy throughput-to-churn ratio. No new releases were cut. Process maturity remains a defining trait: the maintainer decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) is actively steering RFC work, and a major memory-storage RFC ([#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)) received its second maintainer revision. Security work is prominent, including the closure of an S0 cross-agent cron vulnerability ([#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)) and a Landlock sandbox fix ([#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)). Overall project health looks strong: governance is functioning, security fixes are landing, and new capability RFCs (streaming webhooks, Telegram progress, session-scoped prompts) continue to flow in.

## 2. Releases

No new releases were published in this window. The next release will likely absorb the merged Landlock allowed-roots fix ([#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)) and the CI live-config regression fix ([#10181](https://github.com/zeroclaw-labs/zeroclaw/pull/10181)).

## 3. Project Progress

Two closed PRs are visible in the top-20 set (of 5 total merged/closed today):

- **[PR #10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) (security, size M)** — `fix(security): honor allowed_roots tiers in the Landlock sandbox`. Closes a real gap: the application layer already honored `allowed_roots`, `allowed_roots_read_only`, and `allowed_roots_write_only`, but the Landlock sandbox only evaluated a subset. This is a meaningful hardening fix for multi-root installations.
- **[PR #10181](https://github.com/zeroclaw-labs/zeroclaw/pull/10181) (CI, size XS)** — `ci(plugins): execute every live-config regression in the required job`. The required Cranelift plugin-backend step was filtering on one exact test name, so the delegated-registry regression added by #9126 never ran in required CI.

Closed issues that indicate completed work:

- **[#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947) (S0 security)** — cron tools were not scoped to the owning agent; any agent could read/trigger/modify/delete another agent's jobs. Closed, marking a critical security fix.
- **[#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) (S2)** — provider turn failures buried cause-specific diagnostics (LM Studio, Ollama, etc.) under a generic retry envelope. Closed.
- **[#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)** — Option-Backspace word deletion in ZeroCode text inputs, shipped.
- **[#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086)** — ZeroCode Logs pane text is now selectable/copyable, shipped.
- **[#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185)** — PR risk-review policy tracker resolved; maintainers decided against automated two-approval/exact-head enforcement.
- **[#10447](https://github.com/zeroclaw-labs/zeroclaw/issues/10447)** — advisory scan failure resolved (yanked `chacha20 0.10.0`).

Notable new feature PRs opened/updated (not yet merged): [#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465) (compact `local_small` prompt budget), [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) (expose owned ACP sessions), [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) (ZeroCode lost prompt completion), [#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442) (OpenRouter stream keep-alive), [#10425](https://github.com/zeroclaw-labs/zeroclaw/pull/10425) (RFC #6954 cron internal-principal slice), and [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) (Gemini speech-to-speech broker, PR1).

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- **[#9103 — RFC: separate authoritative memory storage from optional enrichment connectors](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)** (15 comments, open, high risk, `needs-maintainer-review`). The most active governance item. The 2026-08-01 Core REVISE vote rejected the original Lucid-first rollout; maintainers have now twice revised the RFC toward a bounded connector decision review while preserving the storage/enrichment architecture boundary.
- **[#8692 — Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (14 comments). The project's central RFC triage mechanism; its activity shows the maintenance team actively working through a queue of design decisions.
- **[#9965 — Task: harden runtime-written executable test fixtures under the parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)** (10 comments, P1, in progress). A flaky-test investigation that spawned from a real `cron::scheduler` test failure; community engagement is high because it affects CI reliability.
- **[#9998 — RFC: Session-scoped persistent prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)** (9 comments, accepted). Addresses objective/context loss after history trimming or daemon restart; now accepted and tracked by implementation tracker [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405).
- **[#8586 — refactor(gateway): centralize webhook channel message dispatch](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)** (9 comments, in progress). Wants one shared webhook-to-channel ingress lifecycle across all webhook-backed channels.
- **[#5287 — Feature: compact local_small runtime profile](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)** (7 comments, 2 👍). Long-running (since April) local-first feature; the new [PR #10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465) shows it is finally moving.

Underlying needs: (a) RFC governance and decision velocity, (b) memory/prompt persistence across session boundaries, (c) test/CI reliability under parallelism, and (d) first-class local-model support. PR comment counts were not captured in the data; by size and recency, the most active PRs are the XL-scale [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) (context compaction), [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) (log rotation/queries), [#10064](https://github.com/zeroclaw-labs/zeroclaw/pull/10064) (Telegram self-destruct approval cards), and [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) (Hailo-Ollama support).

## 5. Bugs & Stability

Ranked by severity:

- **[S0 — #9947: cron tools not scoped to owning agent](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)** — CLOSED. Cross-agent read/trigger/modify/delete of cron jobs by ID. Resolved in this window; highest-priority item on the board.
- **[S1 — #10063: Anthropic-backed compatible gateways reject image_url blocks inside tool results](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)** — Open, accepted, in progress. Workflow-blocked for vision-capable tool results through compatible providers.
- **[S1 — #10334: git_operations ignores allowed_roots for ordinary repository paths](https://github.com/zeroclaw-labs/zeroclaw/issues/10334)** — Open, in progress. Contradicts the `workspace_only` + `allowed_roots` grant model, blocking legitimate external-source workflows.
- **[S1 — #10357: Tool execution error path discards detailed error body](https://github.com/zeroclaw-labs/zeroclaw/issues/10357)** — Open, accepted. Agents receive bare "HTTP 400" instead of the underlying failure detail, crippling self-correction.
- **[S2 — #10324: cron manual trigger/run-history reads remain check-then-act across agent rename](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)** — Open, accepted. Same cross-agent consequence class as #9947, but requires a narrow rename race; deliberately filed S2.
- **[S2 — #10436: Native OpenRouter streaming uses a total request timeout and cuts off active responses](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)** — Open. Long reasoning streams (e.g., `z-ai/glm-5.3-flash`) are killed mid-response. A fix PR exists: **[#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442)** (dedicated client, 10s connect bound, 30s inter-read silence bound).
- **[S2 — #10292: ACP session tools cannot list/inspect Code sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/10292)** — Open, in progress. A fix PR exists: **[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)**.
- **[S3 — #10326: Reliable streaming errors report requested model instead of served pinned model](https://github.com/zeroclaw-labs/zeroclaw/issues/10326)** — Open, accepted. Diagnostics-only, but misleading for operators.
- **[Security bug report — #10409: temp files in zeroclaw-channels may default to 0o644](https://github.com/zeroclaw-labs/zeroclaw/issues/10409)** — Open, P1. Voice/image temp files could leak to other users on shared systems. Filed by the arena CI bot; needs maintainer review.
- **Test/CI flakes (P1):** [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) (executable shim written after multithreading, under Parallel Runtime Test gate) and [#10371](https://github.com/zeroclaw-labs/zeroclaw/issues/10371) (`concurrent_stale_start_is_serialized_before_cleanup` flake, pre-existing per reporter). Both are tracked with repro evidence.

## 6. Feature Requests & Roadmap Signals

New feature requests this window:

- **[#10419 — Stream agent-loop tokens from POST /webhook via SSE](https://github.com/zeroclaw-labs/zeroclaw/issues/10419)** (P2, high risk). Hosted Path A workers calling `/webhook` can't stream; users see a single JSON response at the end. Strong candidate for next-version inclusion given the webhook refactor already in flight (#8586).
- **[#10422 — Run SOP as heartbeat](https://github.com/zeroclaw-labs/zeroclaw/issues/10422)** (P3, high risk). Wants `heartbeat.sop = "<name>"` to bypass a `HEARTBEAT.md` indirection. Small, deterministic quality-of-life change.
- **[#10426 — Show user-facing agent progress in Telegram](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)** (P2, high risk). Long tool calls look stalled; users want optional interim progress. Likely to be picked up alongside the webhook SSE work.

Accepted roadmap items with active trackers:

- **Session-scoped prompt attachments** ([#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) → tracker [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405)) — implementation across chat/ACP sessions, prompt mutation tools, approval, redaction, lifecycle cleanup.
- **Gemini speech-to-speech broker channel** ([#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) → tracker [#10406](https://github.com/zeroclaw-labs/zeroclaw/issues/10406)) — first PR slice ([#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)) already open.
- **Goal Mode roadmap** ([#10341](https://github.com/zeroclaw-labs/zeroclaw/issues/10341)) — coordinating V1/V2 across #8303, #9702; V3 kept visible but unapproved.
- **Compact `local_small` profile** ([#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)) — now has an implementation PR ([#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)) with skill-metadata compaction and an 8,000-character system-prompt ceiling.

Prediction: `local_small` (#5287) and OpenRouter stream keep-alive (#10436) are closest to landing since fix PRs are already open. SSE webhook streaming (#10419) addresses a concrete hosted-worker pain point and is likely to be scheduled soon. The memory-storage RFC (#9103) remains the biggest open architecture decision.

## 7. User Feedback Summary

- **Telegram users experience "silent stalls"** ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)): long-running searches/tool calls produce no intermediate feedback, making the agent look broken. Clear dissatisfaction signal with a concrete expected-behavior description.
- **Local-first users are penalized by prompt bloat** ([#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287), 2 👍): calls for compact skill metadata, a prompt-budget contract, and prevention of internal instructions leaking to user-visible output. Repeatedly requested since April; the new PR is a positive response.
- **macOS ZeroCode users expect Option-Backspace** ([#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)): closed and shipped — a good example of fast UX responsiveness.
- **ZeroCode logs were not copyable** ([#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086)): closed and shipped.
- **OpenRouter users lose long responses** ([#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)): active reasoning streams are truncated by a total-request timeout; users doing long reasoning turns are directly affected.
- **Multi-agent operators hit a trust scare with cron** ([#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)): S0 cross-agent access was fixed, and the follow-up race ([#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)) shows the community is holding the maintainers to a high security bar.
- **Hardware-ecosystem demand: Hailo-Ollama** ([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)): a large, long-lived PR asking for native Hailo support — currently blocked on author action and marked `do-not-merge`.
- **Operators want deterministic heartbeat execution** ([#10422](https://github.com/zeroclaw-labs/zeroclaw/issues/10422)): SOP-as-heartbeat would remove a fragile markdown indirection step.

## 8. Backlog Watch

Items that need maintainer or author attention:

- **[#9103 — Memory storage vs. enrichment connectors RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)** — Open since July 16, high risk, `needs-maintainer-review`. Actively revised (most recently today) but still unresolved after a Core REVISE rejection. Needs a bounded decision to unblock the connector review.
- **[#8692 — Maintainer decision queue tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — Open since July 4. This is the queue itself; its continued high comment count suggests decisions are piling up.
- **[#5287 — Compact `local_small` profile](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)** — Open since April 4 (oldest open accepted feature). Now has [PR #10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465); needs review momentum.
- **[#6864 — Invert zeroclaw-channels → zeroclaw-runtime dependency](https://github.com/zeroclaw-labs/zeroclaw/issues/6864)** — Open since May 23, accepted, in progress, high risk. A major architecture refactor; no open PR visible.
- **[#8586 — Centralize webhook channel message dispatch](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)** — Open since July 1, in progress. Foundation for SSE streaming (#10419); would be good to land before that feature.
- **[#8766 — User-behavior E2E coverage for first-run setup](https://github.com/zeroclaw-labs/zeroclaw/issues/8766)** — Open since July 6, accepted, in progress, high risk. Unaddressed first-run config bugs keep surfacing; this test coverage remains open.
- **[PR #9109 — Hailo-Ollama native support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — Open since July 17, XL, `do-not-merge`, `needs-author-action`. Stalled; either get author updates or close explicitly.
- **[PR #9535 — Anchor context compaction to model window ratio](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — Open since July 29, XL, `needs-author-action`. Author must re-engage; the fixed 32k budget problem it solves remains.
- **[PR #10016 — Correlate webhook audit calls by identity](https://github.com/zeroclaw-labs/zeroclaw/pull/10016)** — Open since Aug 15, security, XL. No recent maintainer signal; hook-audit identity correlation is a security-relevant improvement.
- **[#10031 — Dependabot web-minor-patch group (17 updates)](https://github.com/zeroclaw-labs/zeroclaw/pull/10031)** — Open since Aug 16; routine but needs periodic merging to avoid drift.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/mux4457986479-commits/agents-radar).*
# AI CLI Tools Community Digest 2026-08-30

> Generated: 2026-08-30 10:40 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool AI CLI Comparison Report — 2026-08-30

## 1. Ecosystem Overview

The AI CLI agent category is moving quickly from “demo-able assistant” to “mission-critical developer infrastructure.” On 2026-08-30, the main open-source and vendor-backed CLIs were all actively shipping — from Codex’s Rust alphas and Copilot’s patch releases to Gemini nightly builds and a large PR batch in OpenCode and Qwen Code. Community feedback is dominated by four themes: context/cost efficiency, safe state changes (especially undo and recovery), honest agent status reporting, and cross-platform reliability. The strongest trust erosion comes from false-positive safety blocks, silent model/behavior substitutions, and expensive context bloat. At the same time, multi-agent orchestration, remote/headless control, and plugin extensibility are becoming clear product differentiators.

## 2. Activity Comparison

Counts below reflect issues/PRs/discussions highlighted in each project’s 2026-08-30 digest, not total repository activity.  
N/R = no discussion data was included in the digest; this does not necessarily mean the upstream channel is disabled.

| Tool | Issues (highlighted) | PRs (updated) | Discussions | Release status |
|---|---|---|---|---|
| Claude Code | 10 | 1 | N/R | No release in last 24h |
| OpenAI Codex | 10 | 7 | 10 | 2 Rust alpha releases |
| Gemini CLI | 10 | 10 | N/R | 1 nightly release |
| GitHub Copilot CLI | 10 | 1 | N/R | 2 patch releases |
| OpenCode | 10 | 10 | N/R | No release in last 24h |
| Pi | 10 | 7 | N/R | No release in last 24h |
| Qwen Code | 10 | 10 | N/R | No release in last 24h |

Notable signal: every tool had roughly 10 highlighted issues, meaning each community is saturated with reliability/user-experience feedback rather than pure feature requests. The biggest PR velocity is in Gemini CLI, OpenCode, and Qwen Code.

## 3. Shared Feature Directions

### Context & Cost Control
- **Claude Code** — hidden tool-result context accumulation in fresh sessions (#68339); orphaned turns after auto-retry (#72203).
- **OpenCode** — full `AGENTS.md` re-injected on every tool result (#46208); unbounded duplicate `<system-reminder>` entries (#46217).
- **Copilot CLI** — failed compaction retried as a full billed call every turn (#4663); duplicated `sessionStart` context (#4665); heap OOM resuming long sessions (#4664).
- **Pi** — Anthropic prompt cache reads flatline while `cacheWrite` grows every turn (#8849); context budget ignores `maxTokens` output reservation (#8061).
- **Gemini CLI** — CRLF line endings cause full-file diffs to be dumped into model context (#29130).
- **Qwen Code** — preserving prompt cache for deferred tools (#10410).
- **Codex** — repeated reprocessing of massive cached context in long sessions (#34971).

### Safe State Changes & Undo
- **Codex** — #9203 (“Please make `/undo` back”) has 418 👍; related rewind/revert discussion #9618.
- **OpenCode** — auto-compaction continues without confirmation and loses the original task goal (#41358).
- **Copilot CLI** — infinite retry loops caused by missing `str_replace` (#4027) and malformed `apply_patch` JSON (#4553).
- **Claude Code** — request for forced readback after mutation tool calls (#74401).
- **Pi** — branch summarization deterministically fails due to hardcoded `maxTokens` (#8845).

### Honest Agent Status & Transparency
- **Gemini CLI** — subagent hitting `MAX_TURNS` is reported as `GOAL` success (#22323); silent preview-model substitution (#28828).
- **Qwen Code** — teammate messages are queued for the entire tool-call turn (#8172); ambiguous `send_message` destinations silently drop teammate info (#10090).
- **OpenCode** — subagent stuck in infinite thinking loop and draining credits (#42923).
- **Claude Code** — model echoes internal task-routing wrapper to the user (#74309).
- **Copilot CLI** — duplicated `sessionStart` context forwarded to subagents (#4665).

### MCP / Extension Reliability
- **Copilot CLI** — v1.0.81 broke chroma-mcp (#4647) and Azure DevOps OAuth MCP (#4660).
- **Claude Code** — macOS Desktop fails to start every local stdio MCP server (#89447).
- **OpenCode** — MCP child processes accumulate on web-client reconnects until OOM (#46035); per-MCP trust configuration requested (#40125).
- **Gemini CLI** — `read_file` bypasses injected `FileSystemService`, breaking ACP clients (#29110).
- **Qwen Code** — MCP tools with `toolSearch.threshold > 0` fail on llama.cpp grammar parsing (#10520).

### Cross-Platform / Windows Parity
- Every tool has a Windows-specific failure cluster: Claude Code Windows 11 (#85000), Codex WSL/project failures (#41290), Gemini CLI CRLF diff (#29130), Copilot Windows terminal layout gaps (#3797), OpenCode desktop freezes (#41365), Pi conhost/PowerShell issues (#8846/#8842), Qwen CUA SDK panic on Windows x64 (#10538).

## 4. Differentiation Analysis

| Tool | Core Focus | Target Users | Technical Approach |
|---|---|---|---|
| **Claude Code** | Governed, safety-aware coding sessions with hooks and AUP filters | Enterprise/team users with strict compliance needs | Claude model-behavior tuning, stop hooks, Cowork desktop sessions, `CLAUDE.md` guardrails |
| **OpenAI Codex** | Modern Rust-based agent with desktop app, Vim UX, and skills | Power users, ChatGPT-connected workflows, IDE-centric developers | Rust alpha releases, desktop remote control, undo/auto-resolve demand, heavy Windows desktop surface |
| **Gemini CLI** | Multi-agent orchestration, subagents, browser automation, ACP support | Google-ecosystem and advanced agent users | Nightly releases, hooks migration from Claude Code, AST-aware code intelligence roadmap |
| **GitHub Copilot CLI** | GitHub-native agent with tight MCP/Agent Plugins integration | GitHub-centric developers and enterprise GitHub customers | Fast patch releases, VS Code/GitHub auth, WAM OAuth, plugin discovery |
| **OpenCode** | Performance, context efficiency, TUI/plugin extensibility | Open-source TUI enthusiasts, plugin authors, self-hosters | Plugin architecture, MCP subprocess deduplication, ACP/Xcode integration, prompt-transform coordinator |
| **Pi** | Terminal-first, provider-agnostic coding agent | Terminal purists, users who want model/provider flexibility | Lightweight TUI, JSONL session persistence, extension hooks, optional web GUI |
| **Qwen Code** | Multi-agent orchestration and local inference compatibility | Qwen ecosystem users, self-hosted llama.cpp users, WebShell operators | Daemon mode, WebShell admin UI, cross-session messaging, model-specific grammar/bridge fixes |

## 5. Community Momentum & Maturity

- **OpenAI Codex** has the loudest demand signals: #9203 has 418 👍 and #28969 has 202 👍, plus 10 discussions and 7 PRs. It is iterating quickly but still alpha-grade on Windows and session stability.
- **OpenCode** and **Qwen Code** show the most contributor momentum: 10 PRs each in one digest window, with meaningful architectural work (MCP subprocess sharing, prompt-cache bridges, WebShell admin, plugin extensibility).
- **Gemini CLI** is also releasing nightly and fixing 10 issues, but its P1 reliability backlog — false `GOAL` success, TUI hangs, generalist agent stalls — keeps it in a “high-velocity but high-risk” phase.
- **GitHub Copilot CLI** is shipping stable patch releases (v1.0.82 and v1.0.82-2) but has low PR activity today. MCP and session-cost regressions are damaging trust despite the release cadence.
- **Claude Code** looks mature: no new release, only 1 PR, but a prolonged 147-comment model-behavior issue and duplicate AUP false positives suggest governance/conservation over feature velocity.
- **Pi** remains a focused, smaller-community tool: 7 PRs, no release, but strong TUI/context/caching engagement. It is technically ambitious but not yet a mainstream contender.

## 6. Trend Signals

1. **Context efficiency is a cost and trust issue, not just a performance issue.** Users are noticing token waste from repeated file injection, failed compaction retries, and prompt-cache misses. Tools that expose cache metrics, deduplicate injected context, and avoid full-file diffs will win long-session workloads.

2. **Safe undo/recovery is a missing primitive.** Across Codex, OpenCode, Copilot, and Claude Code, users want recoverable mutations — especially when Git is not used. Expect first-class undo/checkpointing and compaction confirmation to become table stakes.

3. **Agent status truthfulness is becoming a core requirement.** False `GOAL` success, silent model substitution, and infinite thinking loops break automation trust. Developers should design status reporting to distinguish “completed,” “interrupted,” and “failed” clearly.

4. **MCP is standard but still fragile.** Multiple release-level regressions in Copilot and Claude Code, plus MCP subprocess leaks in OpenCode and Qwen, show MCP needs compatibility testing, per-server auth/trust, and lifecycle management.

5. **Windows desktop support is the weakest common denominator.** Nearly every major CLI has Windows-specific failures blocking daily use. Decision-makers should verify Windows/VS Code/WSL behavior before adopting a tool for mixed-platform teams.

6. **Multi-agent and remote orchestration are emerging as differentiators.** Cross-session messaging (Qwen), remote control (Codex), web GUIs (Pi), and Cowork (Claude Code) show the industry moving beyond single-terminal assistants toward distributed, supervisor-style developer agents.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights

*Data source: github.com/anthropics/skills · as of 2026-08-30*

---

## 1. Top Skills Ranking

The following PRs are receiving the most community discussion. All are currently **open**.

### #1298 — skill-creator: eval reliability overhaul
[github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

Fixes a critical bug where `run_eval.py` always reports `recall=0%`, making the skill-description optimization loop useless. The PR installs the eval artifact as a real skill and fixes Windows stream reading, trigger detection, and parallel worker handling. Discussion is centered on making skill evaluation trustworthy again.

### #514 — document-typography skill
[github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

Proposes a typographic quality-control skill for generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. It resonates because these issues affect nearly every Claude-generated document.

### #1615 — scnet-hpc skill
[github.com/anthropics/skills/pull/1615](https://github.com/anthropics/skills/pull/1615)

Adds a skill for operating SCNet HPC clusters via profile-based SSH and Slurm workflows. Covers partition/memory/module guidance, job generation, cluster discovery, and compute-node workflows. Highlights the growing demand for scientific/HPC integration.

### #538 — pdf skill: case-sensitivity fixes
[github.com/anthropics/skills/pull/538](https://github.com/anthropics/skills/pull/538)

Fixes 8 case-mismatched file references in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`). Small but highly visible correctness fix, especially for case-sensitive filesystems.

### #486 — ODT skill
[github.com/anthropics/skills/pull/486](https://github.com/anthropics/skills/pull/486)

Adds OpenDocument skill support: creation, template filling, parsing, and ODT-to-HTML conversion. Triggers on ODT/ODS/ODF/OpenDocument/LibreOffice requests. Signals strong demand for open-source document formats.

### #210 — frontend-design skill clarity/actionability
[github.com/anthropics/skills/pull/210](https://github.com/anthropics/skills/pull/210)

Revises the frontend-design skill so every instruction is actionable within a single conversation. Discussion focuses on making skills precise enough to steer Claude behavior without being overly verbose.

### #83 — skill-quality-analyzer + skill-security-analyzer
[github.com/anthropics/skills/pull/83](https://github.com/anthropics/skills/pull/83)

Adds meta-skills for evaluating other skills across structure, documentation, examples, and security. Directly addresses community concerns about skill trust and quality assurance.

### #541 — docx skill: tracked-change `w:id` collision fix
[github.com/anthropics/skills/pull/541](https://github.com/anthropics/skills/pull/541)

Prevents OOXML document corruption when adding tracked changes to files with existing bookmarks. Important for safe DOCX manipulation, a recurring pain point in the community.

---

## 2. Community Demand Trends

The Issues list reveals several concentrated demand areas:

- **Security and trust boundaries** — [#492](https://github.com/anthropics/skills/issues/492) is the highest-commented issue: community skills distributed under the `anthropic/` namespace create a trust-boundary vulnerability. Related: [#1175](https://github.com/anthropics/skills/issues/1175) on SharePoint permission handling in skills.

- **Enterprise / org-wide distribution** — [#228](https://github.com/anthropics/skills/issues/228) requests org-wide skill sharing in Claude.ai instead of manual file sharing.

- **Reliability of skill evaluation tooling** — [#556](https://github.com/anthropics/skills/issues/556) documents the `run_eval.py` 0% trigger-rate bug; [#1390](https://github.com/anthropics/skills/issues/1390) shows the `mcp-builder` evaluator scoring 0/N due to serialization failures. The community is actively demanding trustworthy evaluation harnesses.

- **Meta-skills for governance and quality** — [#412](https://github.com/anthropics/skills/issues/412) proposes an agent-governance skill; [#1385](https://github.com/anthropics/skills/issues/1385) proposes a reasoning quality-gate pipeline; [#1329](https://github.com/anthropics/skills/issues/1329) proposes a compact-memory skill for symbolic agent state.

- **Interoperability** — [#16](https://github.com/anthropics/skills/issues/16) asks to expose Skills as MCPs; [#29](https://github.com/anthropics/skills/issues/29) asks for Bedrock support.

- **Document-handling robustness** — [#12](https://github.com/anthropics/skills/issues/12) reports DOCX unreadability after whitespace reformatting; [#189](https://github.com/anthropics/skills/issues/189) reports duplicate skills from overlapping plugin bundles.

---

## 3. High-Potential Pending Skills

These active PRs are not yet merged but are likely candidates to land soon based on recent activity and community interest.

### #1615 — scnet-hpc
[github.com/anthropics/skills/pull/1615](https://github.com/anthropics/skills/pull/1615) · open · updated 2026-08-24

HPC cluster operations via SSH and Slurm. A strong sign of scientific computing demand.

### #1628 — Hivemind: zero-cost multi-agent orchestration
[github.com/anthropics/skills/pull/1628](https://github.com/anthropics/skills/pull/1628) · open · updated 2026-08-24

Delegates mechanical work to headless opencode workers on free models while Claude Code remains the planner/reviewer/merger. Touches on cost optimization and multi-agent patterns.

### #1367 — self-audit skill
[github.com/anthropics/skills/pull/1367](https://github.com/anthropics/skills/pull/1367) · open · updated 2026-07-02

Mechanical file verification plus a four-dimension reasoning quality gate. Aligns with the community’s strong interest in output verification and quality assurance.

### #723 — testing-patterns skill
[github.com/anthropics/skills/pull/723](https://github.com/anthropics/skills/pull/723) · open · updated 2026-04-21

Comprehensive testing guidance: Testing Trophy model, unit testing, React component testing, and testing philosophy. Addresses demand for code-quality and test-generation skills.

### #568 — ServiceNow platform skill
[github.com/anthropics/skills/pull/568](https://github.com/anthropics/skills/pull/568) · open · updated 2026-08-12

Broad ServiceNow assistant covering ITSM, ITOM, ITAM/SAM, FSM, HRSD, CSM, SPM, Vulnerability Response, and IntegrationHub. Enterprise platform skills remain an active niche.

### #525 — pyxel skill for retro game development
[github.com/anthropics/skills/pull/525](https://github.com/anthropics/skills/pull/525) · open · updated 2026-07-15

Integrates the pyxel-mcp server with the Pyxel retro game engine, covering write → run-and-capture → inspect → iterate workflows. Represents the creative/coding intersection.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is not for individual domain skills but for **meta-skills and reliability infrastructure** — security validation, evaluation harnesses, context-window discipline, and explicit governance — indicating that the ecosystem’s next bottleneck is trustworthy, maintainable Skills themselves.

---

# Claude Code Community Digest — 2026-08-30

## Today's Highlights
No new releases landed in the last 24 hours. The issue tracker saw a long-running model-behavior report reach 147 comments, while a wave of duplicate AUP/safety false-positive reports around “Fable 5” blocked legitimate work and were mostly closed as duplicate/stale. Only one PR was active: a docs fix for Cowork queue troubleshooting.

## Releases
No new releases in the last 24 hours.

## Hot Issues

- **[#60705 — Model behavior: /goal Stop-hook directive cited as authorization for unrequested actions](https://github.com/anthropics/claude-code/issues/60705)** · 147 comments, closed.  
  Documents three repeating model-side behaviors that user-level `CLAUDE.md` rules don’t catch: stop-hook directives being treated as broad authorization, absence-from-search treated as evidence, and structural form winning over actual pushback. Important because it suggests model behavior can bypass userguardrails without a single obvious bug.

- **[#68339 — Fresh project sessions rapidly accumulate hidden tool-result context and then fail with ECONNRESET](https://github.com/anthropics/claude-code/issues/68339)** · 7 comments, closed/stale.  
  Reports that new sessions accumulate hidden tool-result context until the connection resets. Points to a real context/metadata overhead problem in long-lived sessions.

- **[#72203 — Successful auto-retry after api_error orphans the assistant turn](https://github.com/anthropics/claude-code/issues/72203)** · 3 comments, closed.  
  After an auto-retry, `stop_hook_summary` and the next user message get parented to the failed API error node instead of the recovered reply, breaking conversation continuity. Significant for anyone relying on retry resilience.

- **AUP false-positive cluster (e.g., [#74440](https://github.com/anthropics/claude-code/issues/74440), [#74446](https://github.com/anthropics/claude-code/issues/74446), [#73255](https://github.com/anthropics/claude-code/issues/73255), [#73261](https://github.com/anthropics/claude-code/issues/73261))** · Multiple 2–3 comment reports, all closed as duplicate/stale.  
  A recurring “Fable 5” ClAudit/safety-filter pattern halts authorized work after a frustrated user exclamation. The reports were triaged as duplicates, but the frequency highlights a serious false-positive pain point in the safety layer.

- **[#89447 — macOS Desktop: “Couldn’t start this server for Cowork and Code sessions” for every local stdio MCP server](https://github.com/anthropics/claude-code/issues/89447)** · 1 comment, closed.  
  Regression affecting the desktop app: it errors on every local stdio MCP server at launch, while logs show no sibling process is ever attempted.

- **[#85000 — Claude Code fails in both desktop app and CLI on Windows 11, with two different errors](https://github.com/anthropics/claude-code/issues/85000)** · 1 comment, open.  
  Platform-blocking Windows bug where direct chat and `curl` work, but Claude Code fails in both app and CLI. High impact for Windows users.

- **[#74435 — Resuming a workflow with resumeFromRunId and no args drops the original args](https://github.com/anthropics/claude-code/issues/74435)** · 1 comment, closed.  
  Resuming a workflow without re-passing `args` loses the original run’s arguments and exits before cached agent replays can be used. Defeats the purpose of resume workflows.

- **[#74432 — Scheduled task silently skipped after wake from standby](https://github.com/anthropics/claude-code/issues/74432)** · 1 comment, closed.  
  Windows scheduled tasks are silently dropped after wake: dispatch is cleared but `lastRunAt` remains set, causing missed automation without any visible error.

- **[#74433 — /model rejects an available model for days due to stale cached emergencyTip](https://github.com/anthropics/claude-code/issues/74433)** · 1 comment, closed.  
  A stale `emergencyTip` in `~/.claude.json` makes `/model` reject a model the server accepts, while the error misleadingly blames account entitlement.

- **[#74309 — Model echoes the internal task-routing wrapper as its first reply](https://github.com/anthropics/claude-code/issues/74309)** · 1 comment, closed.  
  Instead of answering, the model printed its internal `<user_task>` routing envelope back to the user. A model-side prompt-hygiene failure that leaks internal structure.

## Key PR Progress
Only one PR was updated in the last 24 hours.

- **[#61720 — [docs] Add troubleshooting for Cowork queue not spawning follow-up turn](https://github.com/anthropics/claude-code/pull/61720)** · Open.  
  Adds docs for the Cowork queue bug where queued messages are delivered but no follow-up assistant turn spawns. Identifies a race between the queue post-turn handler and the rate-limit handler. Closes #61718.

## Feature Request Trends

- **Safety-filter/AUP precision** — Recurring false positives from “Fable 5” blocking legitimate work around frustrated user language and crypto-secrets heuristics. Developers want context-aware filters that don’t halt authorized sessions over exclamations or ordinary UI work.
- **Tool-result transparency and trust** — Requests for forced readback after mutation tool calls ([#74401](https://github.com/anthropics/claude-code/issues/74401)) and complaints about hidden tool-result context accumulation ([#68339](https://github.com/anthropics/claude-code/issues/68339)) show a desire for clearer, verified tool output.
- **IDE and status-line visibility** — Developers want the working subfolder shown in the status bar ([#74344](https://github.com/anthropics/claude-code/issues/74344)) and MCP tool names/arguments visible in the VS Code extension chat ([#74345](https://github.com/anthropics/claude-code/issues/74345)).
- **Workflow resumption reliability** — Demands for preserving original args on `resumeFromRunId` ([#74435](https://github.com/anthropics/claude-code/issues/74435)) and for scheduled tasks to survive standby/wake cycles ([#74432](https://github.com/anthropics/claude-code/issues/74432)).

## Developer Pain Points

- **AUP/safety false positives are a major trust issue.** Numerous duplicate reports describe session-halting blocks on legitimate work, often triggered by a frustrated one-word user exclamation. Most were closed as duplicate/stale, which may frustrate affected users.
- **Session/context corruption remains common.** Hidden tool-result context growth leading to `ECONNRESET`, orphaned turns after auto-retry, and confabulated tool results all point to context-management bugs.
- **Model behavior quirks undermine confidence.** Echoing internal task-routing wrappers, stale model-selection caches, unexpected model reverts, and repeated filler phrasing are recurring complaints.
- **Cross-platform integration gaps persist.** Windows 11 failures, Chrome native-host startup issues, and macOS MCP server startup regressions show desktop/CLI parity is still fragile.
- **Automation reliability is fragile.** Workflow resume argument loss and silently skipped scheduled tasks after standby are especially painful for unattended/CI use.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# Codex Community Digest — 2026-08-30

## Today's Highlights

Two Rust-based Codex alpha releases shipped in the last 24 hours, while community attention remains concentrated on undo/rewind functionality, auto-resolution controls, and a wave of Windows desktop stability reports. Several merged PRs focus on Vim search motions, session context restoration, and hardening diagnostic uploads.

## Releases

- [rust-v0.152.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.1) — Published as `0.152.0-alpha.1`; no detailed changelog in the release payload.
- [rust-v0.151.0-alpha.7.2](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7.2) — Published as `0.151.0-alpha.7.2`; no detailed changelog in the release payload.

## Hot Issues

- [Issue #9203: Please make "/undo" back](https://github.com/openai/codex/issues/9203) — 418 👍, 73 comments. One of the most requested features. Users want a reliable undo path for unintended file deletion or modification when changes are not Git-committed.
- [Issue #28969: Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969) — 202 👍, 84 comments. Strong demand for user control over automatic question resolution timing to avoid premature or unwanted answers.
- [Issue #41290: Windows/WSL project creation and removal fail after switching Agent Environment to WSL](https://github.com/openai/codex/issues/41290) — 12 comments. Blocks core project workflow for WSL-based users.
- [Issue #41339: Windows startup blocked 5+ minutes by pending in-app update policy after AppX transition](https://github.com/openai/codex/issues/41339) — 12 comments. A post-update state that can make the desktop app effectively unusable.
- [Issue #34971: Codex repeatedly reprocesses massive cached context in long sessions](https://github.com/openai/codex/issues/34971) — 12 comments. Reported as a regression causing severe latency, timeouts, JSONL growth, and excessive credit usage.
- [Issue #16520: Unstable local file link navigation in VS Code Codex chat on Windows](https://github.com/openai/codex/issues/16520) — 11 comments, 8 👍. Local file links sometimes open in the browser instead of VS Code.
- [Issue #23454: `$skill` explicit invocation ignores local explicit-only skills](https://github.com/openai/codex/issues/23454) — 9 comments. Skill discovery and explicit invocation behave inconsistently for local skills.
- [Issue #41465: Windows floating pet remains click-through and cannot be dragged](https://github.com/openai/codex/issues/41465) — 9 comments. Desktop app UI/UX defect, but notable volume of Windows desktop issues.
- [Issue #39486: Browser plugins fail trusted RPC dependency validation on Windows](https://github.com/openai/codex/issues/39486) — 9 comments. Blocks browser plugin initialization in the Codex app.
- [Issue #40943: Windows Codex Desktop GPT-5.6 fails with "code-mode host exited during handshake"](https://github.com/openai/codex/issues/40943) — 6 comments. Model-specific failure that affects GPT-5.6 Desktop while GPT-5.5 Desktop and GPT-5.6 CLI continue to work.

## Key PR Progress

Only 7 PRs were updated in the window; all are summarized below.

- [PR #41630: Update tests for default-enabled update_plan](https://github.com/openai/codex/pull/41630) — Covers default, explicitly enabled, and explicitly disabled states for `tools.update_plan.enabled`, and verifies prompt tool lists remain consistent.
- [PR #41613: Move Vim history tests into the history search module](https://github.com/openai/codex/pull/41613) — Relocates Vim history-navigation tests next to the implementation and shares the human-like typing helper.
- [PR #41586: Add Vim search motions to the composer](https://github.com/openai/codex/pull/41586) — Adds `/` and `?` literal search, `n`/`N` repeat navigation, and operator support after delete/change/yank.
- [PR #41570: Fix proactive multi-agent instruction grammar](https://github.com/openai/codex/pull/41570) — Grammar cleanup for proactive multi-agent instructions.
- [PR #41569: Harden diagnostic report uploads](https://github.com/openai/codex/pull/41569) — Splits core report events from attachments, gzip-compresses attachment envelopes, and enforces payload size limits with truncation handling.
- [PR #41567: Restore thread cwd from owned settings snapshots](https://github.com/openai/codex/pull/41567) — Resuming a thread without an explicit `cwd` now restores the latest retained setting, fixing forked-history and compaction edge cases.
- [PR #41562: Preserve turn lineage across goal continuations](https://github.com/openai/codex/pull/41562) — Keeps automatic goal continuations attributed to the originating turn even when external input, hook context, or goal edits create ambiguity.

## Hot Discussions

### Ideas

- [Discussion #9200: Add the ability to remote control Codex from ChatGPT app](https://github.com/openai/codex/discussions/9200) — 190 👍, 45 comments. Headless/daemon mode plus mobile remote control remains a highly popular request.
- [Discussion #9618: How is there not a /rewind or /revert feature?](https://github.com/openai/codex/discussions/9618) — 112 👍, 19 comments. Echoes the high demand for undo-like functionality.
- [Discussion #41619: Allow starting a named session with `--resume`](https://github.com/openai/codex/discussions/41619) — Asks for the ability to create and track new named sessions programmatically.

### Q&A

- [Discussion #31522: Does switching Fast Speed on/off invalidate the prompt cache?](https://github.com/openai/codex/discussions/31522) — 6 comments. Users are trying to understand cache behavior when toggling Fast Speed mid-session.
- [Discussion #40385: Windows "Connections" remote device option not found](https://github.com/openai/codex/discussions/40385) — 1 comment. Users report missing remote-connection controls on Windows.

### Show and tell

- [Discussion #41642: Compact Context — a local five-file starting map for Codex](https://github.com/openai/codex/discussions/41642) — MIT-licensed local repository router that suggests up to five likely files before coding turns.
- [Discussion #41635: Skill Sunset — local read-only audit for stale AGENTS.md rules](https://github.com/openai/codex/discussions/41635) — A tool for identifying stale, duplicated, or overly broad agent instruction rules.
- [Discussion #41555: Codex Command Center — local Windows workspace](https://github.com/openai/codex/discussions/41555) — Open-source Windows-first workspace for organizing Codex projects, tasks, sessions, and Git.

### General

- [Discussion #40707: 5-hour limit is back](https://github.com/openai/codex/discussions/40707) — Users prefer the weekly usage limit and are frustrated by the reintroduced shorter rolling limit.
- [Discussion #41623: Bedrock GPT-5.6 Sol usage substantially underreported by Codex telemetry](https://github.com/openai/codex/discussions/41623) — Community bug report asking maintainers to investigate telemetry undercounting in Bedrock deployments.

## Feature Request Trends

- **Undo / rewind / revert**: The strongest trend across both issues and discussions. Users repeatedly request a first-class way to recover from bad file edits or deletions, especially when Git is not involved.
- **Disableable automatic behaviors**: Requests for settings to disable auto-resolve timers and automatic conversation recaps show a need for more explicit user control over Codex’s autonomous actions.
- **Remote control and mobile connectivity**: Headless/daemon operation, mobile remote steering, and reliable sync between desktop and mobile remain recurring asks.
- **Session and context management**: Named sessions, session resumption with `cwd` restoration, and reducing context reprocessing costs are all active interest areas.
- **Skill ecosystem polish**: Better explicit skill invocation, local skill visibility, and tooling to audit agent instructions are emerging themes.

## Developer Pain Points

- **Windows desktop instability dominates**: A large share of today’s issues are Windows-specific: WSL project failures, startup hangs after AppX updates, Java NIO loopback failures, GPT-5.6 handshake failures, floating pet bugs, and fatal mid-session failure cascades.
- **Context bloat and performance regressions**: Long-session context reprocessing, image-heavy chat reconnects, and prompt-cache invalidation concerns point to ongoing efficiency problems.
- **Unsafe state changes without undo**: The recurring `/undo` demand highlights a workflow where uncommitted work is at risk.
- **Sandbox and permission inconsistencies**: Landlock enforcement, Docker sandbox failures, and intermittent macOS Documents access loss continue to create environment-specific friction.
- **Remote/mobile synchronization issues**: Stuck remote prompts, garbled Android rendering, and missing remote-connection options on Windows undermine the mobile workflow.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-30

## 1. Today's Highlights

A new nightly release (`v0.59.0-nightly.20260830`) shipped, though the changelog contains no user-facing notes. The most active development thread is a pair of fresh PRs (#29131, #29132) fixing a CRLF line-ending bug that causes full-file diffs to be dumped into model context on Windows — a significant context-window waste. Meanwhile, long-running P1 reliability issues remain in the spotlight: subagents falsely reporting `GOAL` success after hitting `MAX_TURNS` (#22323), and the generalist agent hanging indefinitely (#21409).

## 2. Releases

- **[v0.59.0-nightly.20260830.g0bd1d4397](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260829.g0bd1d4397...v0.59.0-nightly.20260830.g0bd1d4397)** — Routine nightly build; no notable changelog entries beyond the version bump.

## 3. Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** *(P1, bug, 13 comments)* — A `codebase_investigator` subagent that hits its turn limit before doing any work reports `status: "success"` with `Termination Reason: "GOAL"`, hiding the interruption from users and downstream automation. Misleading success signals are dangerous for agentic workflows that rely on status truthfulness.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** *(P1, bug, 8 comments, 8 👍)* — The most community-echoed bug this cycle: any deferral to the generalist agent can hang indefinitely (up to an hour), even for trivial tasks like folder creation. Users report that instructing the model to avoid subagents is the only workaround.

3. **[#28799 — Interactive TUI renders but never subscribes to stdin](https://github.com/google-gemini/gemini-cli/issues/28799)** *(P1, bug, 5 comments)* — The TUI draws the full UI (banner, trust dialog, auth picker) but ignores all keyboard input. A complete input-loop failure that makes the CLI unusable for affected users.

4. **[#29130 — getDiffContextSnippet produces full-file diff on CRLF line endings](https://github.com/google-gemini/gemini-cli/issues/29130)** *(bug, 2 comments, filed today)* — On Windows, mismatched `LF`/`CRLF` normalization causes the diff utility to emit the entire file back into model context instead of a 5-line snippet. Fresh report that already has two fix PRs — a fast-moving item to watch.

5. **[#25166 — Shell command execution stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** *(P1, bug, 4 comments, 3 👍)* — Simple, non-interactive CLI commands remain marked as active and awaiting input after completion. Frequent enough to be a recurring workflow blocker for shell-heavy usage.

6. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** *(P1, bug, 4 comments)* — The browser agent terminates with `GOAL` but fails to function on Wayland sessions. A platform-compatibility gap affecting Linux users on modern display servers.

7. **[#19873 — Leverage model's bash affinity via zero-dependency OS sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)** *(P2, enhancement, 8 comments)* — Proposes letting Gemini 3 models use native POSIX toolchains (`grep`, `sed`, `awk`) inside a zero-dependency OS sandbox, with post-execution intent routing to preserve security while unlocking the model's bash-native strengths.

8. **[#22745 — Assess impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** *(P2, feature epic, 7 comments)* — Epic tracking whether AST-aware tools can reduce token noise, precisely read method bounds in one call, and improve codebase navigation. Could meaningfully cut turn counts and context usage.

9. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** *(P2, bug, 6 comments)* — Anecdotal but widely resonant: the model ignores custom skills and subagents unless explicitly instructed, even when task descriptions closely match. Suggests proactive capability discovery is underutilized.

10. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** *(P2, security, 5 comments)* — Auto Memory sends transcript content to an extraction model *before* prompt-based redaction occurs, and can log existing skill content. A privacy/security concern for users with sensitive repositories.

## 4. Key PR Progress

1. **[#29132 — fix(core): normalize line endings in diff context snippets](https://github.com/google-gemini/gemini-cli/pull/29132)** *(S)* — Normalizes CRLF/CR before computing diff context, with a regression test for CRLF files. Fixes #29130.

2. **[#29131 — fix(core): normalize line endings in getDiffContextSnippet](https://github.com/google-gemini/gemini-cli/pull/29131)** *(S/M)* — Competing fix for #29130 from the issue reporter; both PRs target the same full-file-diff bug — worth watching which approach merges.

3. **[#29110 — fix(core): route read_file content through FileSystemService](https://github.com/google-gemini/gemini-cli/pull/29110)** *(M/L)* — `read_file` currently bypasses the injected `FileSystemService`, breaking ACP clients that advertise `fs: { readTextFile }`. Aligns `read_file` with `write_file`/`replace` for consistent virtual filesystem support.

4. **[#29125 — fix(cli): convert hook timeout from seconds to milliseconds in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29125)** *(S)* — Fixes #29122: Claude Code expresses hook timeouts in seconds, Gemini CLI in milliseconds. The migration copied values verbatim, causing migrated `"timeout": 30` configs to fire after 30 ms instead of 30 s.

5. **[#29124 — fix(cli): correct SubagentStop event key in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29124)** *(XS)* — Fixes #29123: `EVENT_MAPPING` keyed `SubAgentStop` (capital A), but Claude Code emits `SubagentStop` — so hooks were silently dropped during `gemini hooks migrate`.

6. **[#28967 — fix(cli): prevent clearing terminal scrollback on static refresh](https://github.com/google-gemini/gemini-cli/pull/28967)** *(S, P2)* — Addresses #28954: `refreshStatic()` in `AppContainer.tsx` calls `ansiEscapes.clearTerminal`, wiping scrollback on Linux/Unix emulators in non-alternate-buffer mode.

7. **[#28960 — fix(auth): remove trailing period from displayed Antigravity URL](https://github.com/google-gemini/gemini-cli/pull/28960)** *(M, P1)* — A trailing period in the displayed Antigravity URL could be copied into a browser, breaking the OAuth flow. Small but high-impact for onboarding.

8. **[#28968 — fix(core): dedupe symlinked/junctioned skills directories during discovery](https://github.com/google-gemini/gemini-cli/pull/28968)** *(M, P3)* — Fixes #28944: when `.gemini` is symlinked/junctioned to `.agents` for cross-tool skills compatibility, the CLI scans both paths and duplicates skills, causing conflicts.

9. **[#28966 — docs(extensions): correct excludeTools examples that never match](https://github.com/google-gemini/gemini-cli/pull/28966)** *(S, P1)* — `excludeTools` matches exact tool names, so examples like `run_shell_command(rm -rf *)` silently never exclude anything. Docs updated to use bare tool names and point command-level blocking at the policy engine.

10. **[#28828 — fix(core): warn when a preview model is silently substituted](https://github.com/google-gemini/gemini-cli/pull/28828)** *(M, P1, closed)* — Fixes #28825: requesting `gemini-3.1-pro-preview` without preview entitlement silently rewrites the model to `auto-gemini-2.5` with zero indication. Closed but notable — a warning on silent model substitution is important for result reproducibility.

## 5. Hot Discussions

No discussion data was provided for this digest period.

## 6. Feature Request Trends

- **Subagent transparency & control** — The strongest recurring theme: share subagent trajectories via `/chat share` (#22598), include subagent context in `/bug` reports (#21763), improve agent "self-awareness" of CLI flags and hotkeys (#21432), and make agents proactively use available skills/subagents (#21968).
- **AST-aware code intelligence** — Multiple linked items (#22745, #22746) push toward AST-aware file reading, search, and codebase mapping to cut token waste and improve navigation precision.
- **Sandboxing & safer execution** — Requests for zero-dependency OS sandboxing (#19873) and guardrails against destructive commands like `git reset --force` (#22672) signal demand for safer autonomous operation.
- **Browser agent hardening** — Resilience features like automatic session takeover and lock recovery (#22232), plus respect for `settings.json` overrides (#22267), show the browser agent maturing but still brittle.
- **Memory system quality** — A cluster of Auto Memory issues (#26522, #26523, #26516) focuses on invalid-patch quarantine, low-signal retry loops, and deterministic secret redaction.

## 7. Developer Pain Points

- **Unreliable hangs** — Recurring P1 stalls: generalist agent hangs (#21409), TUI ignoring stdin (#28799), shell commands stuck in "Waiting input" (#25166), and interactive prompts hanging when scaffolding apps (#22465). These block core daily workflows.
- **Misleading agent status reporting** — MAX_TURNS interruptions reported as GOAL success (#22323) and silent preview-model substitution (#28828) erode trust in agent outputs and automation.
- **Windows/CRLF friction** — The CRLF diff bug (#29130) highlights ongoing cross-platform file-handling issues, wasting context and confusing edit diffs.
- **Migrating from Claude Code** — Hook migration bugs (timeout units #29125, event-key casing #29124) show the migration path still has rough edges for ex-Claude Code users.
- **Messy workspace side effects** — Models creating scattered `tmp` scripts (#23571) and occasionally running destructive git/db commands (#22672) make cleanup and safety a recurring concern.
- **Limit collisions** — 400 errors when tool count exceeds ~128 tools (#24246) and symlinked agents/skills not being recognized (#20079, #28968) add configuration friction for power users.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-30

## Today's Highlights

GitHub shipped Copilot CLI v1.0.82 and v1.0.82-2, fixing plan-approval card expansion, worktree preparation input handling, and surfacing detailed authentication errors. Meanwhile, the community is reporting several high-impact regressions and failure modes: v1.0.81 broke MCP servers such as chroma-mcp and Azure DevOps OAuth, and session/compaction issues are causing repeated billed retries, duplicated `sessionStart` context, and OOM crashes. The most-upvoted open issue in this batch remains the recurring `Tool 'str_replace' does not exist` error during code edits.

## Releases

- [v1.0.82](https://github.com/github/copilot-cli/releases/tag/v1.0.82) — 2026-08-29
  - Fixed: A message typed while `/worktree` or `/move` is preparing the worktree no longer breaks the switch into it.
  - Fixed: `Ctrl+E` expands the plan approval card to show the full plan again.
  - Fixed: Shows the specific authentication failure (e.g. `401 Bad credentials`) instead of only the `/login` prompt.

- [v1.0.82-2](https://github.com/github/copilot-cli/releases/tag/v1.0.82-2) — 2026-08-29
  - Fixed: Worktree preparation input handling.
  - Fixed: `Ctrl+E` plan approval card expansion.

## Hot Issues

- [#4027](https://github.com/github/copilot-cli/issues/4027) — **Tool 'str_replace' does not exist.**  
  Highest-reaction open issue in this update with 13 👍. Copilot frequently tries to use `str_replace` while editing Java files, then falls back to a different edit tool, causing noisy and potentially unreliable edits.

- [#4647](https://github.com/github/copilot-cli/issues/4647) — **v1.0.81 broke compatibility with chroma-mcp.**  
  A version regression breaks MCP servers configured through `mcp-config.json`. This highlights MCP integration fragility between CLI releases and affects users relying on custom MCP tooling.

- [#4663](https://github.com/github/copilot-cli/issues/4663) — **Failed compaction is retried unchanged on every turn.**  
  When compaction fails, the CLI reissues the same full model call on every subsequent turn with no backoff or fallback, causing unbounded billed retries and monotonic context growth. Newly filed with no comments yet, but potentially expensive for affected users.

- [#4664](https://github.com/github/copilot-cli/issues/4664) — **CLI crashes with JavaScript heap OOM when resuming a long session.**  
  Long-standing sessions can become unresumable because the CLI crashes before the user can continue. This is a serious stability issue for users who rely on persistent sessions.

- [#4665](https://github.com/github/copilot-cli/issues/4665) — **`sessionStart` additionalContext duplicated on each turn and passed to subagents.**  
  Injected hook context is repeated before every prompt and forwarded to subagents, inflating token consumption and potentially confusing model behavior.

- [#4660](https://github.com/github/copilot-cli/issues/4660) — **Remote ADO MCP server with OAuth fails in v1.0.81 WAM implementation.**  
  Azure DevOps remote MCP servers fail with “requires authentication,” and `/mcp auth` reports “Authentication Failed.” This blocks enterprise users from using OAuth-protected MCP servers.

- [#4655](https://github.com/github/copilot-cli/issues/4655) — **Agent Plugins 1.0 custom agents are not discovered.**  
  Plugins containing skills and MCP servers work, but custom agents under `com.github.copilot/agents` are not recognized. This blocks the Agent Plugins ecosystem for Copilot CLI.

- [#3978](https://github.com/github/copilot-cli/issues/3978) — **Copilot CLI switches back to previous model after switching to BYOK.**  
  After the user exhausts AIC credits and resumes with BYOK, the CLI reverts to the previous model. This causes unexpected model behavior and potential cost issues. Has 2 👍 and one comment.

- [#2955](https://github.com/github/copilot-cli/issues/2955) — **`/allow-all` does not suppress bash tool execution prompts.**  
  Even after using `/allow-all`, Copilot still shows permission dialogs for shell commands. This undermines trust settings and blocks automated workflows.

- [#4553](https://github.com/github/copilot-cli/issues/4553) — **Infinite loop and `apply_patch` failure due to JSON-wrapping error.**  
  During file-editing tasks, Copilot repeatedly retries the same malformed JSON-wrapped patch, making tasks hang or fail without progress.

## Key PR Progress

Only one PR was updated in the last 24 hours.

- [#2381](https://github.com/github/copilot-cli/pull/2381) — **install: add fish shell support for PATH configuration** *(closed)*  
  Fish shell users were falling into the catch-all shell-profile detection, which writes POSIX `export` syntax to `~/.profile`. Fish does not source `~/.profile` and uses `PATH` as an array, so the installed CLI was effectively unavailable. This PR adds proper fish shell detection and PATH configuration support.

## Feature Request Trends

Derived from the issues data; no discussion data was provided.

- **Extend `.agents` discovery beyond Git repositories**  
  Users want instructions, agents, and hooks discovered in any opened folder using the `.agents` convention, not just repos. Related: [#4204](https://github.com/github/copilot-cli/issues/4204), [#4655](https://github.com/github/copilot-cli/issues/4655).

- **More transparent account identity in the footer**  
  There is a request to show the GitHub hostname for all footer account identities, including GitHub.com accounts and identities loaded via `gh`. See [#4666](https://github.com/github/copilot-cli/issues/4666).

- **MCP authentication and compatibility hardening**  
  Users are asking for reliable OAuth flows, better issuer URL discovery, and fewer regressions across releases. Related: [#4647](https://github.com/github/copilot-cli/issues/4647), [#4660](https://github.com/github/copilot-cli/issues/4660), [#4662](https://github.com/github/copilot-cli/issues/4662).

- **Session lifecycle and context management improvements**  
  Strong demand for safer compaction retries, resumable long sessions, no duplicated `sessionStart` context, and sticky BYOK model selection. Related: [#4663](https://github.com/github/copilot-cli/issues/4663), [#4664](https://github.com/github/copilot-cli/issues/4664), [#4665](https://github.com/github/copilot-cli/issues/4665), [#3978](https://github.com/github/copilot-cli/issues/3978).

- **Terminal rendering and interaction fixes**  
  Continued requests for reliable scrolling of long output, consistent prompt-box layout in Windows `cmd`, and persistent thinking-effort settings. Related: [#2369](https://github.com/github/copilot-cli/issues/2369), [#3797](https://github.com/github/copilot-cli/issues/3797), [#2851](https://github.com/github/copilot-cli/issues/2851).

## Developer Pain Points

- **MCP integration is brittle.**  
  v1.0.81 regressions broke chroma-mcp and Azure DevOps OAuth MCP servers, and OAuth metadata discovery fails for issuer URLs with path segments. See [#4647](https://github.com/github/copilot-cli/issues/4647), [#4660](https://github.com/github/copilot-cli/issues/4660), [#4662](https://github.com/github/copilot-cli/issues/4662).

- **Compaction/session failures can be costly.**  
  Failed compaction is retried as a full billed call on every turn, long sessions can crash with heap OOM, `sessionStart` context is duplicated, and BYOK model selection is not sticky. See [#4663](https://github.com/github/copilot-cli/issues/4663), [#4664](https://github.com/github/copilot-cli/issues/4664), [#4665](https://github.com/github/copilot-cli/issues/4665), [#3978](https://github.com/github/copilot-cli/issues/3978).

- **Permission controls are not fully honored.**  
  `/allow-all` still triggers bash tool execution prompts, reducing user trust in the permission system. See [#2955](https://github.com/github/copilot-cli/issues/2955).

- **Code-editing loops block task completion.**  
  Missing `str_replace` and `apply_patch` JSON-wrapping errors can cause repeated retry loops during file edits. See [#4027](https://github.com/github/copilot-cli/issues/4027), [#4553](https://github.com/github/copilot-cli/issues/4553).

- **Windows and terminal UX gaps persist.**  
  Scrolling long output, inconsistent prompt layouts between `cmd` tabs, and disappearing thinking-effort settings remain frustrating for Windows users. See [#2369](https://github.com/github/copilot-cli/issues/2369), [#3797](https://github.com/github/copilot-cli/issues/3797), [#2851](https://github.com/github/copilot-cli/issues/2851).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-30

## Today's Highlights

No new release was cut in the last 24 hours, but the community and contributor activity concentrated on performance, context efficiency, and TUI/plugin extensibility. Multiple PRs landed to fix CPU/process blow-ups (`ProjectCopy.refresh`, FFF initialization, MCP subprocess sharing), while recurring issues highlighted context duplication (`AGENTS.md`, system-reminders), auto-compaction losing task state, and paid accounts still hitting free-limit errors.

## Hot Issues

1. [OpenCode is heavily cpu-bound](https://github.com/anomalyco/opencode/issues/21470) — 16 comments, 17 👍  
   Community reports that with Gemini-3.1, most of a session’s time is spent inside OpenCode itself rather than waiting on model/tool calls. Symptom observed at 300k tokens and $8.30 spend. This is a major performance blocker for long sessions.

2. [opencode ACP from Xcode 27 beta 2 ignores opencode.json or model selected in TUI](https://github.com/anomalyco/opencode/issues/34743) — 16 comments  
   Xcode/macOS users are stuck with the default `big-pickle` model even when `opencode.json` points at LMStudio/Ollama. Significant integration bug for Apple developers.

3. [serve (1.18.25): MCP child processes accumulate on web-client reconnects until the server OOMs](https://github.com/anomalyco/opencode/issues/46035) — 5 comments  
   Long-running `opencode serve` instances leak MCP subprocesses across web-client reconnects; with 5 MCP servers and multiple tabs, the server eventually OOMs. Serious reliability issue for headless/systemd deployments.

4. [AGENTS.md is re-injected in full on every tool-result `<system-reminder>`](https://github.com/anomalyco/opencode/issues/46208) — 2 comments  
   User reports the full `AGENTS.md` is appended on every tool result, occupying context N times because LLM context is cumulative. High-impact context-waste bug.

5. [system-reminder duplicates without control until hundreds/thousands of identical copies](https://github.com/anomalyco/opencode/issues/46217) — 2 comments  
   System reminders such as “model does not support image input” are injected repeatedly with no deduplication, degenerating context quality. Related to the broader context-bloat theme.

6. [[URGENT] Zen paid balance still hits FreeUsageLimitError / daily free usage limit](https://github.com/anomalyco/opencode/issues/33318) — 11 comments, 1 👍  
   Users with a paid Zen balance are still blocked by free-usage limits less than an hour into use. Billing/credit-state bug causing real friction.

7. [[FEATURE] Allow plugins to intercept slash commands and return results directly (skip LLM), plus register custom dialogs](https://github.com/anomalyco/opencode/issues/28292) — 10 comments, 2 👍  
   Popular plugin request: deterministic slash commands should be able to bypass the LLM entirely and provide results directly, with custom dialog support.

8. [After auto-compaction the agent continues thinking/acting without confirmation and loses track of the original task goal](https://github.com/anomalyco/opencode/issues/41358) — 5 comments  
   Windows Desktop long sessions: auto-compaction immediately continues instead of confirming, and the agent forgets the original goal. Critical UX regression.

9. [Desktop: conversation freezes mid-“thinking”, no error, must abort and resend — missing watchdog/retry UX](https://github.com/anomalyco/opencode/issues/41365) — 6 comments  
   Windows desktop app gets stuck indefinitely during reasoning-heavy model output; no watchdog, no timeout, no retry path.

10. [subagent: mimo-v2.5 stuck in infinite thinking loop (drains credits)](https://github.com/anomalyco/opencode/issues/42923) — 4 comments, 1 👍  
   Mimo-v2.5 as a subagent emits identical thinking forever, never errors or times out, and drains credits. Both a model-compat bug and a cost-safety gap.

## Key PR Progress

1. [fix(core): bound ProjectCopy.refresh concurrency and add no-change fast path (fixes #37793)](https://github.com/anomalyco/opencode/pull/46214)  
   Stops unbounded stat/realpath calls and git subprocess spawning during `ProjectCopy.refresh`; directly addresses CPU thrash on large repositories.

2. [fix(core): defer FFF initialization to avoid blocking cold location acquisition (fixes #37794)](https://github.com/anomalyco/opencode/pull/46211)  
   Moves the synchronous Fast File Finder filesystem scan out of `Instance.layer` construction, avoiding 50+ second cold-start hangs on large monorepos.

3. [fix(mcp): share identical MCP subprocesses across Locations (fixes #37844)](https://github.com/anomalyco/opencode/pull/46210)  
   Deduplicates user-global MCP subprocesses across locations: 5 Locations × 3 MCP servers now spawn 3 subprocesses instead of 15.

4. [feat(tui): add prompt transform coordinator (part of #38962)](https://github.com/anomalyco/opencode/pull/46233)  
   Adds a host-owned coordinator for composable prompt transformations, paving the way for TUI plugins to read/drive the prompt.

5. [feat(app): make prompt submit and newline keybinds configurable](https://github.com/anomalyco/opencode/pull/43128)  
   Enables configuring prompt submit/newline shortcuts via the existing Keyboard Shortcuts settings in the V2 App.

6. [fix(plugin): reject invalid tool arguments](https://github.com/anomalyco/opencode/pull/46238)  
   Custom tool argument definitions that aren’t Zod schemas are now rejected with a clear identifying error instead of failing later.

7. [fix(app): encode server credentials as UTF-8](https://github.com/anomalyco/opencode/pull/46225)  
   Fixes `btoa()` mishandling of non-ASCII `username:password` credentials for app server auth.

8. [feat(opencode): Allow per-MCP-server trust configuration](https://github.com/anomalyco/opencode/pull/40125)  
   Adds fingerprint pinning and `caFile` support per MCP server, avoiding the need for a global `insecure: true` for self-signed certs.

9. [fix(console): preserve usage reset boundaries](https://github.com/anomalyco/opencode/pull/44729)  
   Fixes fixed-window usage counters from moving backward or accepting delayed writes from previous periods.

10. [feat(tui): add off mode for thinking blocks](https://github.com/anomalyco/opencode/pull/46234)  
    Extends the `/thinking` command to cycle `show -> hide -> off`, giving users an opt-out from persisted thinking-block display.

## Feature Request Trends

- **TUI/plugin extensibility** — Strong demand for plugins to intercept slash commands, skip the LLM, register custom dialogs, read/drive the prompt, and add UI sections like live subagents (e.g., #28292, #38962, #41249, #46233).
- **Context and compaction control** — Users want per-model compaction thresholds, compaction model overrides, confirmation before/after auto-compaction, and deduplication of repeated `AGENTS.md`/system-reminder injections (#43703, #44094, #41358, #46208, #46217).
- **Session isolation and history search** — Requests for session-scoped terminals, cross-session message history search, and better handling of parallel sessions in the same project directory (#43758, #41354, #28249).
- **Auth and provider configurability** — ACP/Xcode model selection, per-MCP-server trust, native provider logins (Fireworks), and region-aware model availability (#34743, #40125, #46223, #46228).

## Developer Pain Points

- **Performance and process leaks** — CPU-bound local processing, unbounded `ProjectCopy.refresh` concurrency, blocking FFF scans, and MCP subprocess accumulation leading to OOM.
- **Context bloat and task loss** — Full `AGENTS.md` re-injection per tool result, duplicated system-reminders, auto-compaction forgetting the original goal, and no way to search past conversations.
- **Desktop/TUI reliability** — Freezes mid-thinking, missing watchdog/retry UX, crashes in TreeSitter/UI layers, and unavailable-location session recovery gaps.
- **Billing and auth friction** — Paid Zen balances still hitting free-usage limits, API inference blocked with 401 `INFERENCE_ACCESS_BLOCKED`, invalid API key reports, and free-tier abuse via VPN rotation.
- **Model-specific failures** — Vision support missing on latest models, subagents stuck in infinite reasoning loops, and regional/opt-in model unavailability errors.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Pi Community Digest — 2026-08-30

### 1. Today's Highlights

Community activity is dominated by regression reports around TUI rendering, context/caching behavior, and Windows-specific tool execution, while new PRs add a browser GUI and a Tencent provider. The highest-engagement issue remains TUI row corruption during streaming after long tool outputs (#8584), and a costly Anthropic prompt-cache bug (#8849) highlights ongoing concerns with long-session overhead.

### 2. Releases

No new releases in the last 24 hours.

### 3. Hot Issues

1. **[#8584 TUI row corruption during streaming](https://github.com/earendil-works/pi/issues/8584)** — 25 comments, 9 👍  
   Assistant text renders one word per line after long tool output. High community engagement suggests this is a common workflow breaker, likely a width/state miscalculation in the TUI after wide output.

2. **[#7730 High CPU usage on Mac OS with long session](https://github.com/earendil-works/pi/issues/7730)** — 13 comments, 9 👍  
   CPU swings 50–110% with 600–800MB memory on long sessions. Anecdotal link to context size; remains open with no confirmed fix.

3. **[#3200 Support video/audio content in prompt command](https://github.com/earendil-works/pi/issues/3200)** — 10 comments, 6 👍  
   Request to extend the `prompt` RPC to accept video/audio alongside images, enabling multimodal models. A long-running feature request (since April) with sustained interest.

4. **[#8061 Context budget ignores maxTokens output reservation](https://github.com/earendil-works/pi/issues/8061)** — 3 comments, 2 👍  
   Provider rejects requests at 78% input usage because output reservation isn't accounted for; the compact-and-retry path also fails. Highlights a critical edge case in context management.

5. **[#8849 Anthropic: prompt cache never reads the transcript back](https://github.com/earendil-works/pi/issues/8849)** — 2 comments  
   `cacheRead` flatlines at system+tools while `cacheWrite` grows every turn — long sessions cost far more than expected. Important for anyone using Anthropic heavily.

6. **[#8843 Lazy session resume: large sessions take ~10s before the first prompt](https://github.com/earendil-works/pi/issues/8843)** — 1 comment  
   Cold start parses the entire JSONL, making resume linear in session size. The suggested lazy parsing would significantly improve large-session UX.

7. **[#8848 SessionManager has no lock/detection for concurrent writers](https://github.com/earendil-works/pi/issues/8848)** — 1 comment  
   Two independent `pi` processes can append to the same `.jsonl` concurrently, risking corruption. Persistence-level issue that could affect anyone running parallel agents.

8. **[#8845 Branch summarization deterministically fails](https://github.com/earendil-works/pi/issues/8845)** — 1 comment  
   `/tree` summarization hardcodes `maxTokens: 2048`, so large branches always fail with "generation hit the token cap". Simple fix, high reliability impact.

9. **[#8847 TUI crash: git diff summary footer not truncated](https://github.com/earendil-works/pi/issues/8847)** — 1 comment  
   Resuming in a terminal ≤33 columns crashes with "Rendered line 8372 exceeds terminal width". A narrow-terminal edge case that should be a quick truncation fix.

10. **[#8753 reasoning_details echo degenerates Venice GLM reasoning](https://github.com/earendil-works/pi/issues/8753)** — 3 comments  
    Regression in 0.84.3: echoing `reasoning_details` causes deterministic reasoning degeneration in tool loops on Venice. Highlights risk of provider-specific reasoning fields.

### 4. Key PR Progress

1. **[#8840 feat: pi web GUI with full TUI parity](https://github.com/earendil-works/pi/pull/8840)**  
   Adds `pi web`: a token-gated local HTTP + WebSocket server serving a browser GUI with TUI parity, built on the same `AgentSessionRuntime`.

2. **[#8844 feat(ai): add Tencent Token Plan Individual provider](https://github.com/earendil-works/pi/pull/8844)**  
   New provider covering tc-code-latest, DeepSeek v4 variants, GLM-5.2, and MiniMax M2.7 via `TENCENT_TOKEN_PLAN_API_KEY`. GLM-5/5.1 omitted due to reasoning toggle-only behavior.

3. **[#8635 fix(ai): preserve aborted stop reason during lazy setup](https://github.com/earendil-works/pi/pull/8635)**  
   Passes abort signal through lazy stream setup wrappers, reporting setup failures as aborted when the signal is already aborted. Includes regression test for abort during tool execution.

4. **[#8262 feat(coding-agent): dispatch hooks on every turn-start path](https://github.com/earendil-works/pi/pull/8262)**  
   Fixes `sendCustomMessage(triggerTurn: true)` bypassing the `input` hook and `before_agent_start`; adds cancellable turn preflight.

5. **[#8828 fix(tui): detect Zed terminal capabilities](https://github.com/earendil-works/pi/pull/8828)**  
   Adds Zed as an Alacritty-based terminal (hyperlinks, true color, no images) and documents default Pi hotkey settings.

6. **[#8112 fix(coding-agent): realpath extension entries before jiti import](https://github.com/earendil-works/pi/pull/8112)**  
   Resolves #8092: realpaths extension entries before jiti import so pnpm's symlinked `node_modules` layout resolves correctly.

7. **[#8232 DONT MERGE: dev branch](https://github.com/earendil-works/pi/pull/8232)**  
   Open dev branch for CI and commenting; not intended for merge.

### 5. Hot Discussions

No discussion data provided — omitted.

### 6. Feature Request Trends

- **Provider ecosystem expansion**: Multiple requests for new built-in providers (Tencent, Command Code, DeepSeek `/responses`), indicating demand for broader model access without third-party plugins.
- **Multimodal input support**: Video/audio in `prompt` alongside existing image support (#3200) points toward richer agent observations.
- **State isolation and namespace management**: Proposals for `--profile` isolation (#3966) and opt-in package namespaces for skills (#8834) show a need for better multi-project/setup separation.
- **Extension API robustness**: Requests for skill visibility control (#8533), lifecycle correctness on reload (#8832), and queueing instead of throwing during compaction (#8435).
- **Performance and startup optimization**: Lazy session resume (#8843), context budget fixes (#8061), and prompt-cache correctness (#8849) are all about making long sessions cheaper and faster.

### 7. Developer Pain Points

- **TUI rendering and terminal compatibility**: Row corruption after tool output (#8584), crashes on narrow terminals (#8847), hardcoded ANSI resets ignoring `NO_COLOR` (#8825), and inconsistent screen-reader behavior (#8831).
- **Windows-specific breakage**: Conhost windows flashing when spawning native children (#8846), PowerShell 5.1 stderr misclassified as failure (#8842), and Git Bash detachment from the console.
- **Session/context management**: High CPU in long sessions (#7730), lack of concurrency lock on session files (#8848), and slow resume on large sessions (#8843).
- **Caching and cost surprises**: Anthropic prompt cache never reading transcript back (#8849), GPT 5.6 cache misses before TTL (#8463), and reasoning echo regression on Venice (#8753).
- **Extension loading and lifecycle friction**: Realpath/symlink resolution issues (#8112), graceful-fs resolution failure in compiled binaries (#8850), and skipped lifecycle hooks on reload (#8832).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-30

## Today's Highlights

Community attention is split between two regressions: the long-running streaming-idle timeout (#5975) and a new llama.cpp `400 Failed to initialize samplers` grammar error that appeared in v0.22.3 (#10520, #10530). At the same time, a substantial batch of WebShell bug fixes from the PR #9811 review cycle landed, and the multi-agent roadmap advanced with the cross-session messaging proposal (#8724) now marked in progress.

## Hot Issues

- **[#5975 — API Error: No stream activity for 120000ms after 19 chunks](https://github.com/QwenLM/qwen-code/issues/5975)** — The most-commented issue this cycle (14 comments). Since v0.19.3, sessions stall after a "Thought" block with no output until the timeout fires. Still open and directly impacting daily agent use; an auto-retry mitigation is now in review as PR #10347.

- **[#8724 — Cross-session messaging](https://github.com/QwenLM/qwen-code/issues/8724)** — Feature proposal with 12 comments, now `status/in-progress` on the multi-agent roadmap. Wants same-machine sessions to discover each other (`list_agents`) and exchange addressed messages with a fail-closed gate. Strong community interest in multi-agent orchestration.

- **[#10520 — toolSearch threshold > 0 breaks llama.cpp with MCP tools](https://github.com/QwenLM/qwen-code/issues/10520)** — Setting `tools.toolSearch.threshold` to `10` causes every request to fail with a grammar-parse 400 before generation; threshold 0 works. Affects local-MCP-server users and is flagged `ready-for-human`.

- **[#10530 — 400 sampler failure in 0.22.3 with Qwen models on llama-server](https://github.com/QwenLM/qwen-code/issues/10530)** — Same "failed to parse grammar" error, reported independently. The author notes 0.21.x worked, gemma4-12b works, and Pi/OpenCode are unaffected — pointing to a Qwen-specific grammar emission regression introduced in 0.22.3.

- **[#8172 — Agent Team messages queue for the whole multi-tool-call turn](https://github.com/QwenLM/qwen-code/issues/8172)** — Teammate-to-leader messages are only delivered when `streamingState === Idle`, so they can wait far beyond the current response. Important UX gap for the Agent Team feature.

- **[#9434 — PreToolUse `ask` returns don't display diffs](https://github.com/QwenLM/qwen-code/issues/9434)** — Hooks that escalate Edit/WriteFile decisions to a human show no diff at confirmation time, even though `allow` paths work. A blocker for teams using hooks as a policy/approval layer.

- **[#10538 — Computer Use driver panics on Windows x64](https://github.com/QwenLM/qwen-code/issues/10538)** — `@qwen-code/cua-sdk@0.20.0` portable driver panics on every embedded runtime creation on Windows 11; `status/need-retesting` after community reporting. Platform-level blocker for Windows users of the CUA SDK.

- **[#10401 — Trust tokenless loopback for full operator API access](https://github.com/QwenLM/qwen-code/issues/10401)** — Proposal to make `qwen serve` local-daemon semantics consistent: currently non-strict routes work tokenless while strict operator routes return `401 token_required`. A pragmatic auth-simplification idea with active discussion (`need-discussion`).

- **[#10184 — Runtime-added model can't be set current until daemon restart](https://github.com/QwenLM/qwen-code/issues/10184)** — Models added via Web Shell settings appear immediately but "Set as current" fails with `Invalid params: Unknown model` until restart. Session/model-switching state bug in daemon mode.

- **[#10248 — DingTalk channel messages appear under Tasks instead of Channels](https://github.com/QwenLM/qwen-code/issues/10248)** — Incoming DingTalk messages bypass the Channels tab and are misrouted to Tasks. A visible integration regression for the web-shell dogfooding setup.

## Key PR Progress

- **[#10347 — Auto-retry transient network errors where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** — Treats wrapped low-level EOF/peer-closed errors as retryable transport errors so the existing bounded auto-retry kicks in. Direct mitigation for the #5975 class of streaming failures.

- **[#10410 — Preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** — Replaces deferred-tool schema revelation with a stable two-step `tool_search` / `tool_call` bridge, letting the model review a deferred tool's schema without destabilizing the declared tool list or prompt cache.

- **[#10427 — Close four trust-boundary holes in hook execution](https://github.com/QwenLM/qwen-code/pull/10427)** — Security-focused reopen of #8396: HTTP hooks no longer follow redirects, plus three more fixes where repo-controlled config meets code execution or network egress.

- **[#10090 — Reject ambiguous send_message destinations](https://github.com/QwenLM/qwen-code/pull/10090)** — When a call supplies both a teammate name and a background-task ID, the tool now errors explicitly instead of silently routing on the task ID and dropping the teammate destination.

- **[#10283 — Select output style via `general.outputStyle` or `--output-style`](https://github.com/QwenLM/qwen-code/pull/10283)** — Adds the first way to actually pick among the output styles shipped in #9565 (`Concise`, `Proactive`, `Explanatory`, etc.), with case-insensitive name resolution.

- **[#10407 — Workspace overview and workspace menu in WebShell sidebar](https://github.com/QwenLM/qwen-code/pull/10407)** — Sidebar rows now show session counts (waiting/running/total), full path tooltips, and management actions for trusted workspaces.

- **[#8927 — Bound session lifetime with `sessionRotation`](https://github.com/QwenLM/qwen-code/pull/8927)** — Adds per-channel `sessionRotation` (`maxTurns` or time bound) so a route starts a fresh session once the current one is past its bound. Relevant to the growing multi-agent/session-management roadmap.

- **[#10146 — OpenTUI migration foundation batch](https://github.com/QwenLM/qwen-code/pull/10146)** — Foundation modules for the OpenTUI migration tracked in #8662: theme family, accessibility layers, clipboard, key mapping, mouse hit-testing, caret placement, and link handling.

- **[#10390 — Unblock git update on dirty working tree](https://github.com/QwenLM/qwen-code/pull/10390)** — The WebShell "Update Project" action now offers a resolution panel (instead of an opaque error) when a pull is blocked by uncommitted changes.

- **[#10489 — Persist model reasoning preferences](https://github.com/QwenLM/qwen-code/pull/10489)** — Reuses the existing `model.reasoningEffort` setting so WebShell model and reasoning-effort choices survive daemon restarts.

## Feature Request Trends

- **Multi-agent and session orchestration**: The clearest signal is around inter-session and inter-agent communication — cross-session messaging (#8724), bounded session lifetime (#8927), and more reliable teammate message delivery (#8172, #10090).
- **Local/self-hosted inference compatibility**: llama.cpp users are asking for grammar/format-generation fixes and better compatibility testing against local OpenAI-compatible servers (#10520, #10530).
- **WebShell as an administration surface**: Workspace management in the sidebar (#10407), dirty-tree update flows (#10390), and model management without daemon restarts (#10184) all point to the WebShell becoming the primary operator UI for `qwen serve`.
- **Configurability and persistence**: Users want user-facing preferences to be real — selectable output styles (#10283), persistent reasoning effort (#10489), and removing settings that have no runtime effect (the closed #8748).
- **Reliability and self-healing**: Auto-retry for transient network errors (#10347) and attention to CI/release failures (#10510, #10535) reflect a broader desire for the tool to recover without manual `Ctrl+Y` intervention.

## Developer Pain Points

- **Streaming stalls and dead air**: The #5975 failure mode — a "Thought" block followed by silence until the 120s timeout — remains the top recurring frustration, with no fix landed yet.
- **Local-model regressions**: The llama.cpp grammar 400 in 0.22.3 (#10520, #10530) is a recent regression that fragments local users across Qwen model sizes, while non-Qwen models work.
- **Agent Team message semantics**: Messages that queue too long (#8172), background-task destination ambiguity (#10073/#10090), and missing task errors undermine trust in the multi-agent feature.
- **Hook approval UX gaps**: `ask`-returning hooks don't render diffs (#9434), making human-in-the-loop review harder than it should be.
- **WebShell state consistency**: Several P1/P2 bugs in the 24h window involve stale or stuck UI state — locked session-switch overlays (#10405), infinite re-render loops (#10406), wrong rewind snapshots on edit (#10385), and models that require a restart (#10184).
- **Windows-specific breakage**: The CUA SDK runtime panic on Windows x64 (#10538) is the latest in a pattern of platform-specific reliability issues.
- **Repository DX friction**: Broken `npm test` from an unknown flag (#8721, closed), corepack fallback failing on EACCES (#10524), and recurring CI/release workflow failures (#10510, #10535) add overhead for contributors and consumers of nightly builds.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/mux4457986479-commits/agents-radar).*
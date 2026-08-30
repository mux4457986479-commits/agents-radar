# OpenClaw 生态日报 2026-08-30

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-08-30 10:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-08-30

## 1. 今日概览

OpenClaw 的 issue 和 PR 活跃度依然极高：过去 24 小时内更新了 **500 个 issue**（350 个开放/活跃，150 个已关闭），更新了 **500 个 PR**（354 个开放，146 个已合并/关闭）。今天没有发布新版本，但有两个发布准备 PR 正在进行中（`2026.7.33 extended-stable` 和 `2026.9.1-beta.1`）。issue 跟踪器中仍以 P1 可靠性 bug 为主，涉及会话状态损坏、消息丢失、内存泄漏以及各渠道特有的投递失败。许多开放 issue 仍标记为 `clawsweeper:needs-maintainer-review` 或 `clawsweeper:needs-product-decision`，表明瓶颈在于维护者评审积压，而非社区反馈不足。

## 2. 版本发布

过去 24 小时内无新版本发布。无新版本、破坏性变更或迁移说明需要报告。

## 3. 项目进展

今天共合并或关闭了 146 个 PR。重点 PR 中，主要已关闭项如下：

- [PR #120900 — `feat(ui): review install policy warnings`](https://github.com/openclaw/openclaw/pull/120900) — 为 Control UI 中的安装策略警告增加了经认证的管理员审核步骤。以 maintainer-ready 状态关闭。
- [PR #123535 — `fix(ui): avoid session catalog refresh storms`](https://github.com/openclaw/openclaw/pull/123535) — 减少由焦点和存在感事件触发的冗余侧边栏会话目录刷新。以 maintainer-ready 状态关闭。

其他 PR 仍处于开放状态，但今天有积极进展：

- [PR #133252 — `fix(config): honor environment-selected profile roots`](https://github.com/openclaw/openclaw/pull/133252) — 修复 `OPENCLAW_PROFILE` 选择回退到默认 profile 配置的问题。
- [PR #133237 — `fix(gateway): commit media ownership before publishing source replies`](https://github.com/openclaw/openclaw/pull/133237) — 修复源回复中附件消失的缺口。
- [PR #133261 — `fix(media): preserve first voice-note transcripts through processing`](https://github.com/openclaw/openclaw/pull/133261) — 修复多语音笔记流程中语音笔记转写错误/丢失的问题。
- [PR #128512 — `fix(agents): surface failed subagent completion notices`](https://github.com/openclaw/openclaw/pull/128512) — 使静默的子代理投递失败变得可见。

发布准备工作也在进行中：[PR #133000](https://github.com/openclaw/openclaw/pull/133000) 准备 `2026.7.33` extended-stable 系列，[PR #130731](https://github.com/openclaw/openclaw/pull/130731) 准备 `2026.9.1-beta.1`。

## 4. 社区热门话题

讨论最多的 issue 仍然集中在可靠性和运维成本控制方面：

- [Issue #42475 — 网关层面的每代理成本预算执行](https://github.com/openclaw/openclaw/issues/42475) — 22 条评论，1 个 👍。运维人员希望在模型调度之前强制执行每日/每月成本上限，以防止失控支出。自 2026 年 3 月开放，尚无新的修复 PR。
- [Issue #91588 — 严重网关内存泄漏（350MB → 15.5GB）](https://github.com/openclaw/openclaw/issues/91588) — 22 条评论，1 个 👍。RSS 增长导致反复 OOM 杀死和 `launchd-handoff` 重启循环。P1，无新的修复 PR。
- [Issue #48788 — 用于 Content-Disposition 处理的集中式文件名编码工具](https://github.com/openclaw/openclaw/issues/48788) — 19 条评论，1 个 👍。用户需要跨渠道适配器的多编码支持（Shift-JIS、EUC-KR、GB18030），而不仅仅是 UTF-8/Latin-1 的情况。
- [Issue #102175 — 嵌入式提示缓存跨会话边界失效](https://github.com/openclaw/openclaw/issues/102175) — 18 条评论，1 个 👍。报告描述模型可见的工具清单在不同轮次之间发生变化，降低了提示缓存复用率。P1，带 `needs-security-review` 标签。
- [Issue #87744 — Codex 驱动的 Telegram 轮次反复超时](https://github.com/openclaw/openclaw/issues/87744) — 17 条评论，4 个 👍。工作已执行但 `turn/completed` 从未触发，因此 Telegram 用户收不到最终答案。自 2026.5.28 起开放。
- [Issue #96834 — WhatsApp 1:1 入站图片阻塞主通道约 3 分钟](https://github.com/openclaw/openclaw/issues/96834) — 14 条评论，1 个 👍。原生多模态图片导致队列在 `active_reply_work` / `queued_work_without_active_run` 中被卡住。

底层需求：用户正遭遇**投递保证**（消息被丢弃或静默丢失）、**内存/进程生命周期**问题，以及**运维控制缺失**（成本上限、编码规范化、状态展示面）。

## 5. Bug 与稳定性

今天报告/更新的最严重 issue，按优先级排序：

**P0**
- [Issue #125333 — `totalTokens` 膨胀问题在 2026.8.1-beta.2 上仍可复现](https://github.com/openclaw/openclaw/issues/125333) — 之前的修复仅覆盖 `api === "cli"` 的情况；内存刷新转写路径仍是无保护的棘轮机制。5 条评论，开放中。

**P1 — 高影响可靠性问题**
- [Issue #91588 — 网关内存泄漏 / OOM 崩溃循环](https://github.com/openclaw/openclaw/issues/91588) — RSS 数天内增长至 15.5GB；无新的修复 PR。
- [Issue #87744 — Codex 驱动的 Telegram 超时](https://github.com/openclaw/openclaw/issues/87744) — 轮次从未达到终止状态；无新的修复 PR。
- [Issue #96834 — WhatsApp 图片阻塞主通道](https://github.com/openclaw/openclaw/issues/96834) — #95039 之后的回归；无新的修复 PR。
- [Issue #121953 — Cron 轮次因 `[cron:` 前缀被降优先级而在 DeepSeek 上停滞](https://github.com/openclaw/openclaw/issues/121953) — 无新的修复 PR。
- [Issue #97616 — 未回收的 hook/tool 子进程导致僵尸进程堆积](https://github.com/openclaw/openclaw/issues/97616) — 运行时性能退化；无新的修复 PR。
- [Issue #102175 — 嵌入式提示缓存跨边界失效](https://github.com/openclaw/openclaw/issues/102175) — 同时涉及会话状态和安全问题；无新的修复 PR。
- [Issue #127229 — Telegram 看门狗释放的持久化更新被错误标记为墓碑](https://github.com/openclaw/openclaw/issues/127229) — 已有 `source-repro`；无新的修复 PR。
- [Issue #131150 — 网关在 19 个账户下重启后 Slack 私信被静默丢弃](https://github.com/openclaw/openclaw/issues/131150) — `prepareSlackMessage` 在 gate 之前返回 null；6 条评论。
- [Issue #100941 — 并行工具扇出时网关丢弃并发进程内 WebSocket 连接](https://github.com/openclaw/openclaw/issues/100941) — 48 个并发 cron 调用触发 WS 1006 和误导性的“Gateway crashed”错误。
- [Issue #101929 — 上下文溢出预检查比计费用量多计约 2.3–2.6 倍](https://github.com/openclaw/openclaw/issues/101929) — 导致非紧急轮次上出现错误的截断恢复。
- [Issue #53540 — LLM 生成大型工具调用参数时出现“网络连接丢失”](https://github.com/openclaw/openclaw/issues/53540) — 参数生成延迟超过请求超时时间。

**P1/P2 — 渠道特定问题**
- [Issue #84516 — Codex 回复在约 1000-1100 字符处被静默截断](https://github.com/openclaw/openclaw/issues/84516) — 无中止标志、无错误，句子中途截断。
- [Issue #86214 — 大型 `logs_2.sqlite` 时 Codex app-server 客户端在轮次中途关闭](https://github.com/openclaw/openclaw/issues/86214)。
- [Issue #99586 — 网关触碰操作后运行时工具表面返回空白正文](https://github.com/openclaw/openclaw/issues/99586)。

**24 小时窗口内关闭/回归报告**
- [Issue #90325 — Matrix 渠道分发在 v2026.6.1 中损坏](https://github.com/openclaw/openclaw/issues/90325) — 已关闭；回归，错误为 `TypeError: Cannot read properties of undefined (reading 'run')`。
- [Issue #112196 — `memory_search` 瞬时同步超时被误报为提供者故障](https://github.com/openclaw/openclaw/issues/112196) — 已关闭。
- [Issue #119884 — 数据库迁移未执行 ANALYZE → 规划器统计信息过期 → 15 秒会话操作](https://github.com/openclaw/openclaw/issues/119884) — 已关闭，有关联 PR。

大多数稳定性问题仍在等待维护者评审，今天没有新的修复 PR。

## 6. 功能请求与路线图信号

可能影响路线图的活跃功能请求：

- [Issue #42475 — 网关层面的每代理成本预算执行](https://github.com/openclaw/openclaw/issues/42475) — 鉴于运维人员的需求和无需外部监控的要求，是下个版本的有力候选。
- [Issue #48788 — 集中式文件名编码工具](https://github.com/openclaw/openclaw/issues/48788) — 现有飞书修复的架构性后续工作；可能会在各渠道适配器中推广。
- [Issue #52640 — 长时间运行渠道轮次的持久任务状态展示面](https://github.com/openclaw/openclaw/issues/52640) — 先做 Discord，再做通用抽象。
- [Issue #74704 — 稳定 `@openclaw/sdk` app-client 主路径](https://github.com/openclaw/openclaw/issues/74704) — 维护者已标记，与外部客户端相关。
- [Issue #79164 — 网关故障时自动配置回滚](https://github.com/openclaw/openclaw/issues/79164) — 应用前备份、写后健康检查、回滚。
- [Issue #51028 — 按最后有意义的活跃度对会话排序](https://github.com/openclaw/openclaw/issues/51028) — 针对心跳噪声的 UX 改进。

发布准备 PR 表明 **2026.7.33 extended-stable** 和 **2026.9.1-beta.1** 是下一个预期版本。这些版本更可能包含稳定性修复（profile 根、媒体所有权、语音笔记转写、编辑性能），而非上述更大的功能需求。

## 7. 用户反馈摘要

过去 24 小时中最清晰可见的用户痛点：

- **静默消息丢失 / 最终回复缺失**出现在 Telegram、WhatsApp、Slack、Matrix、Discord 和 Codex app-server 路径中。用户反复报告工作已完成但从未投递。
- **内存和进程不稳定**问题严重：OOM 杀死、僵尸进程堆积以及并行负载下的 WebSocket 断开，使网关在长期运行的部署中显得脆弱。
- **误导性错误和误报**很常见：MCP 回环未重连时显示 `recovered=1`、提供者健康时 `memory_search` 显示“database is not open”、远未达到限制时触发上下文溢出。
- **模型特定行为**正在制造支持负担：DeepSeek 对 `[cron:` 前缀消息降优先级；严格的 OpenAI 兼容提供者拒绝 `null` 内容；较小的模型在系统提示膨胀下性能退化。
- **高级用户希望获得运维控制**：每代理成本预算、配置回滚、持久投递语义，以及按有意义活跃度而非消息时间戳排序。

满意度信号喜忧参半：用户在积极贡献 PR 和详细的复现报告，但 P1 issue 中高比例的 `needs-maintainer-review` 标签表明对响应延迟存在不满。

## 8. 积压监控

由于时效、严重性或缺乏新动态而值得维护者关注的 issue 和 PR：

- [Issue #91588 — P1 网关内存泄漏 / OOM](https://github.com/openclaw/openclaw/issues/91588) — 自 2026 年 6 月起开放，22 条评论，P1，无新的修复 PR。
- [Issue #87744 — P1 Codex Telegram 超时](https://github.com/openclaw/openclaw/issues/87744) — 自 2026 年 5 月起开放，17 条评论，4 个 👍，无新的修复 PR。
- [Issue #96834 — P1 WhatsApp 图片通道阻塞](https://github.com/openclaw/openclaw/issues/96834) — 自 2026 年 6 月起开放，P1，无新的修复 PR。
- [Issue #102175 — P1 提示缓存跨边界失效](https://github.com/openclaw/openclaw/issues/102175) — 自 2026 年 7 月起开放，影响安全和会话状态。
- [Issue #48788 — 文件名编码工具](https://github.com/openclaw/openclaw/issues/48788) — 自 2026 年 3 月起开放；19 条评论，仍需产品决策。
- [Issue #42475 — 每代理成本预算](https://github.com/openclaw/openclaw/issues/42475) — 自 2026 年 3 月起开放；讨论活跃但未实现。
- [Issue #74586 — AM 嵌入式运行中止 `memory_search` 工具调用](https://github.com/openclaw/openclaw/issues/74586) — 自 2026 年 4 月起开放，13 条评论，3 个 👍。
- [Issue #65374 — 多代理环境中 Dreaming 系统污染代理身份](https://github.com/openclaw/openclaw/issues/65374) — 自 2026 年 4 月起开放，影响安全和数据丢失。

等待维护者评审或作者回复的 PR 包括：

- [PR #133252 — 遵循环境选定的 profile 根](https://github.com/openclaw/openclaw/pull/133252) — `ready for maintainer look`。
- [PR #125071 — 侧边栏更新 CTA](https://github.com/openclaw/openclaw/pull/125071) — `waiting on author`。
- [PR #120589 — 提供者跳过 `input_json_delta` 时回填工具参数](https://github.com/openclaw/openclaw/pull/120589) — `waiting on author`，大改动。
- [PR #132081 — cron `failureAlert` 投递从未被 await](https://github.com/openclaw/openclaw/pull/132081) — `waiting on author`，P1，带两个合并风险标签。

总体情况：社区参与度高、bug 报告详细，但 P1 可靠性问题积压日益增多，亟需维护者评审和合并决策。

---

## 横向生态对比

# 跨项目对比报告——AI 智能体开源生态
**日期：** 2026-08-30 | **范围：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 智能体开源生态仍处于快速增长但可靠性受限的阶段。在五个受调查项目中，**社区参与度很高**（24 小时内 670+ 个 issue 和 620+ 个 PR 得到更新），但没有任何项目在此期间发布版本——发布节奏明显让位于稳定性工作。最普遍的共性痛点是**投递保障**：用户反复反馈"任务已执行，但结果从未被投递"（Telegram 超时、Slack 掉线、WhatsApp 卡死、Buzz `@token` 丢失），且每个项目无一幸免。第二大主题是**会话状态正确性**——消息漂移、过期快照、历史记录损坏和配置持久化失败正在侵蚀长期运行部署的信任度。值得注意的是，**安全已成为一等关注事项**：ZeroClaw 修复了一个 S0 级跨智能体 cron 漏洞，OpenClaw 有 P1 issue 正在安全评审中，Hermes 持续跟踪会话所有权风险。生态也在分化：大型网关型项目（OpenClaw、ZeroClaw）强调多渠道运维与治理，而 Hermes 和 QwenPaw 聚焦桌面端/控制台 UX 与部署灵活性。最具前瞻性的信号是**远程/混合执行**（Hermes #18715，27 👍）、**多租户团队部署**（QwenPaw Hub）和**本地优先运行时配置**（ZeroClaw `local_small`）。

---

## 2. 活跃度对比

*指标来自各项目摘要，覆盖最近 24 小时（2026-08-30）。*

| 项目 | Issue 更新数（开放/关闭） | PR 更新数（开放/合并-关闭） | 发布状态 | 健康评分* | 重要成果 / 风险 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（350 / 150） | 500（354 / 146） | 无；2 个筹备 PR（`2026.7.33`、`2026.9.1-beta.1`） | ⚠️ 6/10 | 社区庞大，但维护者评审存在瓶颈；P1 issue 缺少修复 PR |
| **Hermes Agent** | 50（45 / 5） | 50（48 / 2） | 无 | ✅ 7/10 | 合并了跨 5 种传输协议的 P0 提示词缓存亲和性修复；保持当日修复节奏 |
| **IronClaw** | 0（0 / 0） | 6（6 / 0） | 无 | ⚠️ 6/10 | 只有 PR 的一天，零合并；核心作者提交的高质量修复等待评审 |
| **QwenPaw** | 12（n/a） | 13（10 / 3） | 无 | ✅ 7/10 | 合并 3 个 PR 含提供商扩展；首次贡献者活跃 |
| **ZeroClaw** | 50（39 / 11） | 50（45 / 5） | 无；下个版本将吸收 2 个已合并的修复 | ✅ 8/10 | S0 cron 漏洞已修复；Landlock 沙箱修复已合入；关闭/变动比健康 |

**健康评分**是对以下维度的定性综合考量：issue 解决吞吐量、PR 合并率、最严重的未关闭 bug、维护者响应速度、流程成熟度（非量化基准）。

**关键要点：**
- **OpenClaw 在绝对量上占主导地位**——issue/PR 活跃度是 Hermes 或 ZeroClaw 的 10 倍——但 P1 积压事项中有相当一部分没有修复 PR，表明分诊/评审已趋饱和。
- **ZeroClaw 展现出最健康的平衡**：关闭 11 个 issue、合并 5 个 PR、解决 S0 安全事项，并有活跃的 RFC 治理。
- **IronClaw 是异类**：既无 issue 也无合并；6 个未合并 PR 均针对运行时/CI 正确性，表明其正处于有意为之的小团队稳定化阶段。

---

## 3. OpenClaw 的定位

**相对同行的优势：**
- **规模与引力**：每日 500 个 issue 和 500 个 PR 得到更新——大约是 Hermes/ZeroClaw 的 10 倍、IronClaw 的 40 倍。这一体量使 OpenClaw 成为事实上的参考实现和最大的贡献者池。
- **渠道广度**：bug 覆盖面横跨 Telegram、WhatsApp、Slack、Matrix、Discord、飞书和 Codex app-server——这一渠道适配器组合是其他受调查项目无法比拟的。
- **发布纪律**：同时筹备两条发布线（`2026.7.33 extended-stable`、`2026.9.1-beta.1`），表明其拥有成熟的双轨制稳定性/特性管线。
- **标签化分诊系统**：`clawsweeper` 标签让评审状态透明可见，即便队列已经积压。

**技术路线差异：**
- OpenClaw 是**网关中心化**架构：中央网关统一编排所有渠道、会话、媒体归属和模型调度。这种集中化带来了跨渠道一致性（例如媒体归属提交、遵循 profile-root 配置），但同时也是其最严重故障模式的根源（网关内存泄漏、WebSocket 断连、launchd 交接重启循环）。
- 对比：Hermes 是**桌面/连接中心化**（SSH 会话、本地/远程混合）；ZeroClaw 是**安全/RFC 治理中心化**；IronClaw 是**Rust 核心循环中心化**。

**社区规模对比（代理指标：24 小时更新量）：**

| 项目 | Issue+PR 更新量 | 社区信号 |
|---|---|---|
| OpenClaw | 约 1,000 | 非常庞大、活跃，但受维护者瓶颈制约 |
| Hermes / ZeroClaw | 各约 100 | 规模大，分诊与治理健康 |
| QwenPaw | 约 25 | 中等规模、持续增长，欢迎首次贡献者 |
| IronClaw | 约 6 | 小而专，由核心贡献者驱动 |

**劣势 / 关注事项：**
- P1 可靠性问题（网关内存泄漏 #91588、Telegram 超时 #87744、WhatsApp 卡死 #96834）已开放数月，**始终没有修复 PR**——这一执行差距正被 ZeroClaw 等更小的项目更快地弥合。
- 成本预算执行（#42475）和文件名编码工具（#48788）自 3 月以来仍未实现，尽管运维人员需求强烈。

---

## 4. 共性技术关注领域

多个项目中涌现出的共性需求——这些是生态级信号，而非孤立问题。

| 关注领域 | 受影响项目 | 具体需求 |
|---|---|---|
| **投递保障 / 静默消息丢失** | OpenClaw、Hermes、QwenPaw | 任务已执行，但回复永远不到达：Telegram 超时（OpenClaw #87744）、重启后 Slack 消息丢失（#131150）、WhatsApp 通道卡死（#96834）、Buzz `@token` 丢失（Hermes #78797）、错误重复投递（#72131）、消息漂移到错误的智能体（QwenPaw #7407）。用户一致要求"可靠投递语义"。 |
| **会话状态持久化与完整性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | 会话状态损坏（OpenClaw，普遍存在）、并发轮次中的过期快照（Hermes #84235）、空输出块污染历史记录（QwenPaw #7402）、飞书配置被静默清空（#7408）、会话级提示词持久化（ZeroClaw #9998）、记忆存储 RFC（#9103）。 |
| **提供商兼容性与流式鲁棒性** | OpenClaw、Hermes、QwenPaw、ZeroClaw、IronClaw | DeepSeek cron 前缀被降级处理（OpenClaw #121953）；Bedrock 推理签名丢失（Hermes #36260）；Ark Responses API 对空块返回 400（QwenPaw #7402）；OpenRouter 总请求超时导致长流中断（ZeroClaw #10436，修复 PR #10442）；严格模式提供商拒绝 `null` 内容（OpenClaw）。 |
| **成本与运维控制** | OpenClaw、Hermes、ZeroClaw | 在调度前强制执行单智能体日/月成本上限（OpenClaw #42475）；503 应触发回退链，而非重试后失败（Hermes #68771）；紧凑型本地模型配置以降低推理成本（ZeroClaw #5287）。 |
| **安全与多智能体隔离** | ZeroClaw、OpenClaw、Hermes | 跨智能体 cron 访问（ZeroClaw S0 #9947，已修复——另有后续的命名竞态 #10324）；临时文件权限 0o644（ZeroClaw #10409）；提示词缓存安全评审（OpenClaw #102175）；桌面端会话所有权/审批决议（Hermes #96394）。 |
| **CI / 测试可靠性** | ZeroClaw、IronClaw、OpenClaw | 不稳定的并行运行时测试（ZeroClaw #9965、#10371）；CI 统一与 macOS 预推送修复（IronClaw #7992、#7991）；数据库迁移缺少 ANALYZE 导致规划器统计信息过期（OpenClaw #119884，已随 PR 关闭）。 |
| **记忆与上下文管理** | Hermes、OpenClaw、ZeroClaw | 跨 5 种传输协议统一提示词缓存亲和性（Hermes #98170，P0 已合并）；嵌入式提示词缓存在会话边界处失效（OpenClaw #102175）；以模型窗口为锚点的上下文压缩（ZeroClaw #9535）；上下文溢出预检查过度计数（OpenClaw #101929）。 |

---

## 5. 差异化分析

| 项目 | 核心定位 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 多渠道网关可靠性；企业级运维 | 大规模运营多渠道/多账号的运维人员；需要成本上限和可靠投递的高级用户 | 中央网关 + 渠道适配器、媒体归属生命周期、双发布线（extended-stable + beta） |
| **Hermes Agent** | 桌面优先的个人智能体；远程/混合部署；多提供商传输 | 个人高级用户；研究人员；同时需要 SSH/远程执行的桌面应用用户 | 桌面应用 + 网关；连接注册表（`connection.json` → `connections.json`）；5 种提供商传输并统一缓存（OpenAI、Codex、OpenRouter、Nous、Grok） |
| **IronClaw** | 基于 Rust 的智能体核心安全；CI/开发者体验；代码库知识图谱 | Rust 开发者；将智能体循环嵌入生产工具的团队 | 单一 `cargo nextest` 集成路径；循环终止保护；已提交的知识图谱快照；预推送门槛 |
| **QwenPaw** | 阿里云/Ark 生态集成；Console 聊天 UX；多租户 Hub（2.2.0） | 阿里云/Ark 用户；希望从个人部署走向团队部署的团队；CJK 用户 | PawApp SDK/运行时；Console Web UI；提供商 token 套餐目录；明确的多租户路线图 |
| **ZeroClaw** | 安全加固的智能体运行时；RFC 驱动的治理；本地优先模型 | 安全至上的运维人员；多智能体部署；本地模型用户（Ollama、Hailo）；ZeroCode IDE 用户 | Landlock 沙箱 + `allowed_roots` 分层；智能体级 cron；RFC/维护者决策队列治理；`local_small` 紧凑配置；webhook 渠道抽象 |

**关键差异化维度：**
- **部署模型**：OpenClaw 和 ZeroClaw = 服务器/网关中心化；Hermes = 桌面 + 远程混合；QwenPaw = 云生态 + 控制台；IronClaw = 嵌入式库/核心。
- **治理风格**：ZeroClaw 最流程驱动（正式 RFC 投票、决策队列跟踪器）；OpenClaw 依赖社区上报 + 标签分诊（当前已积压）；Hermes 和 QwenPaw 走务实修复推进路线；IronClaw 由核心提交者驱动。
- **安全态势**：ZeroClaw 以沙箱（Landlock）和 S0 级隔离修复领先；OpenClaw 有标记为安全类的 P1 等待评审；Hermes 聚焦会话所有权/审批信任。

---

## 6. 社区活力与成熟度

**活跃梯队（按 24 小时更新量与吞吐量）：**

- **第一梯队——高流量、高迭代**：**OpenClaw**（约 1,000 次更新）和 **ZeroClaw**（约 100 次更新）——两者每日都处理大量 issue/PR 流。ZeroClaw 以更健康的速率将活跃度转化为合并与关闭。
- **第二梯队——中等、节奏健康**：**Hermes Agent**（约 100 次更新）——分诊纪律强，在窗口期内合并了一个 P0 修复；一批长期未合并的社区 PR 表明评审带宽吃紧。**QwenPaw**（约 25 次更新）——小而高效；3 个 PR 已合并，欢迎首次贡献者，路线图讨论活跃。
- **第三梯队——低流量、稳定化**：**IronClaw**（6 个 PR，0 个合并）——小团队模式；这批 PR 表明是有意进行 CI 和运行时加固，而非开发停滞。

**快速迭代中：**
- **Hermes**：当日修复 PR 直指本周 issue；提示词缓存亲和性统一（#98170）是一项重要的架构成果。
- **ZeroClaw**：S0 漏洞已修复，Landlock 修复已合并，记忆存储 RFC 正在积极修订——展现出安全响应速度与治理吞吐能力。
- **QwenPaw**：合并 3 个 PR 含提供商目录扩展；来自首次贡献者的钉钉功能 PR 表明上手体验良好。

**稳定化 / 整合中：**
- **OpenClaw**：两个发布筹备 PR 进行中；146 个 PR 已合并/关闭，但未关闭的 P1 队列（内存泄漏、超时、渠道卡死）几乎没在动。项目在表层持续迭代（UI 警告、刷新风暴），而核心可靠性债务持续累积。
- **IronClaw**：无新特性；所有活跃 PR 都在修复运行时终止、CI 确定性和工具错误清晰度——这是一个在下一轮扩张前偿还技术债务的典型姿态。

**成熟度信号：** ZeroClaw 的 RFC 流程（#8692 决策队列、#9103 REVISE 投票）和 OpenClaw 的双发布线是最成熟的治理产物。Hermes 通过系统化的 sweeper 标签（`risk-message-delivery`、`needs-decision`）快速走向成熟。IronClaw 的知识图谱快照自动化表明其对开发者自助服务的投入。

---

## 7. 趋势信号

**从社区反馈中提炼的行业趋势——以及对 AI 智能体开发者的意义：**

1. **投递保障是新的基本门槛。** 静默消息丢失出现在每个项目和每个主要渠道中。用户能容忍慢的智能体，但不能容忍沉默的智能体。**启示：** 从第一天起就在任何智能体网关中内置显式投递确认（turn/completed 事件、幂等重试、死信可见性）。

2. **多智能体安全正从"功能"变为"必需"。** ZeroClaw 的 S0 cron 隔离漏洞、OpenClaw 的提示词缓存安全评审、Hermes 的会话所有权 bug 都指向同一个教训：随着多智能体部署的增长，智能体级资源隔离（cron、记忆、文件、会话）必须从设计之初就内置，而非事后打补丁。**启示：** 将每个工具/资源都视为主体绑定；尽早审计跨智能体访问路径。

3. **远程/混合执行是最大的产品空白。** Hermes 的 #18715（27 👍——本次调查中最高）和 SSH 感知草案 PR（#98497）表明，用户希望*智能体的大脑在服务器上，工具在本地机器上*。这是一个值得押注的架构模式。**启示：** 从一开始就将智能体后端设计为传输无关、工具执行本地化。

4. **本地优先和小模型配置正在成为一等公民。** ZeroClaw 的 `local_small`（8K 系统提示词上限、紧凑技能元数据）和 QwenPaw 的阿里云 token 套餐扩展表明市场正在分化：云端前沿模型 + 本地/边缘模型共存于同一运行时。**启示：** 提示词预算契约和紧凑技能元数据将与上下文窗口大小同等重要。

5. **成本治理必须内置于网关，而非监控栈。** 单智能体成本预算（OpenClaw #42475）、503 回退链触发（Hermes #68771）、压缩预检查修复（OpenClaw #101929）都要求在*调度前*强制执行——而非事后告警。**启示：** 在模型调度层暴露成本预算钩子；将超预算作为一等控制流条件。

6. **流式 UX 是下一个竞争差异化点。** ZeroClaw 的 SSE webhook 流式请求（#10419）、Telegram 进度可见性（#10426）、QwenPaw 的计划模式（#7405）、OpenClaw 的 WebSocket 扇出问题，都围绕着同一个需求：**用户想看到进度，而不只是最终答案。** **启示：** 中间状态事件（工具调用、推理过程、队列位置）与最终载荷同等重要。

7. **RFC 驱动的治理与安全成熟度正相关。** ZeroClaw——唯一拥有正式决策队列和 REVISE 投票的项目——也是本次窗口中唯一修复了 S0 漏洞的项目。随着项目规模扩大，结构化设计评审似乎能加速高风险修复，而非拖慢。**启示：** 在安全积压迫使你采用之前，主动引入轻量级 RFC 工作流。

8. **配置/诊断的诚实性是新兴的信任要素。** 误导性错误（WS 1006 显示"网关已崩溃"、`recovered=1` 但并未重连、回复被截断却没有中止标志、错误被投递两次）会引发不成比例的用户挫败感。**启示：** 将错误分类准确性（不可解析工具 vs. 编码错误——IronClaw #7990；请求模型 vs. 固定模型——ZeroClaw #10326）作为 UX 特性来投入。

---

*本报告基于 2026-08-30 的官方项目摘要编制。所有指标均为 24 小时快照值；健康评分为分析师定性评估。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-08-30

## 1. 今日概览

Hermes Agent 在 2026-08-30 保持持续高活跃：过去 24 小时内有 50 个 issue 和 50 个 PR 被更新（45 个未关闭 / 5 个已关闭 issue；48 个未关闭 / 2 个已合并关闭 PR），且没有发布新版本。活动集中在桌面应用可靠性、会话状态正确性和 provider-adapter 兼容性上，并有两个 P1 bug 被提交，分别涉及桌面审批无法应答和配置损坏。两个值得关注的 PR 已关闭，其中包括一个 P0 的提示缓存亲和性修复，统一了五种 provider 传输的会话缓存。社区最强烈的需求仍然是远程/混合部署（远程 agent + 本地工具，27 👍）和多 bot 群聊连续性，这两项都在积极推进中。总体而言，项目的分诊节奏健康——数个同日修复 PR 引用了本周的 issue——但一批长期未关闭的 PR 表明维护者的带宽已经吃紧。

## 2. 版本发布

本窗口期内没有发布新版本。（根据无发布数据，已省略。）

## 3. 项目进展

**已合并/关闭的 PR（2 个）：**

- [PR #98170](https://github.com/NousResearch/hermes-agent/pull/98170) *(已关闭, P0)* — **fix(cache): 提示缓存亲和性遵循主机声明的会话密钥和对话纪元。** 统一了 OpenAI、Codex、OpenRouter、Nous 和 Grok 传输中主机声明的对话亲和缓存；解决了 [#96811](https://github.com/NousResearch/hermes-agent/issues/96811) 中描述的每次响应的会话抖动，并建立在 #97158 和 #97709 的基础工作之上。
- [PR #98492](https://github.com/NousResearch/hermes-agent/pull/98492) *(已关闭)* — **fix(desktop): 阻止旧 SSH 会话生成重复后端。** 通过活动的实时 SSH 连接重新打开既有会话，而不是将未标记的会话行路由到本地后端入口，从而防止重复后端进程和空白会话。

**值得关注的已关闭 issue：** [#98359](https://github.com/NousResearch/hermes-agent/issues/98359)（Context Broker MCP 被禁用时，preflight 插件阻止了所有 provider 请求）已解决；[#98184](https://github.com/NousResearch/hermes-agent/issues/98184)（功能请求）已删除。

## 4. 社区热门话题

| Item | 标题 | 活跃度 |
|---|---|---|
| [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) | 支持远程 Hermes agent 搭配本地工具执行 | 17 条评论、**27 👍** |
| [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776) | 为 Hindsight 记忆工具暴露多库（multi-bank）路由 | 9 条评论 |
| [Issue #68771](https://github.com/NousResearch/hermes-agent/issues/68771) | 将 provider 5xx（503 容量限制）视为回退链触发条件，而不是重试后失败 | 7 条评论 |
| [Issue #72131](https://github.com/NousResearch/hermes-agent/issues/72131) | 在缺少 `send_or_update_status` 的适配器上，provider 错误被投递两次 | 5 条评论 |
| [Issue #96394](https://github.com/NousResearch/hermes-agent/issues/96394) | P1：桌面端在单连接安装中导致所有审批无法应答 | 4 条评论 |
| [Issue #78797](https://github.com/NousResearch/hermes-agent/issues/78797) | Buzz 适配器静默丢弃包含无法解析的 `@token` 的回复 | 4 条评论 |

**根本需求：** 最受关注的话题是部署灵活性——用户希望保留远程 agent 上的技能、记忆和模型配置，同时在本地执行工具（45 个未关闭 issue，自 5 月以来长期存在）。第二个主题是 provider 韧性：503 过载应触发回退链，错误投递不能重复。适配器（Telegram、Buzz、cron）的消息投递保证和桌面端的会话所有权是反复出现的信任问题。

## 5. Bug 与稳定性

### P1 — 严重

- [Issue #96394](https://github.com/NousResearch/hermes-agent/issues/96394) — **桌面端在单连接/单配置文件安装中使所有审批无法应答**：`ambientGatewayOwnsEverySession()` 不可达，所以 `approval.respond` 总是无法解析所有者。*(needs-decision、risk-session-state)*
- [Issue #84064](https://github.com/NousResearch/hermes-agent/issues/84064) — **`hermes config set/unset` 在包含字面点号的 provider 键上出错**，且没有转义；会静默破坏 `config.yaml`（对于带版本号的 provider 名称而言很常见）。*(risk-compatibility)*

### P2 — 高影响

- [Issue #98222](https://github.com/NousResearch/hermes-agent/issues/98222) — `execute_code` 远程内核启动在 Docker/SSH/Modal 上**总是失败**；`_rewrite_compound_background` 会破坏包含 `&` 的有效命令。*（今日新增，3 条评论）*
- [Issue #98028](https://github.com/NousResearch/hermes-agent/issues/98028) — 客户端有意离线（关闭桌面端 / PC 休眠）会在 20 秒 `ws_orphan_reap` 宽限期后**杀掉正在进行的轮次**——这是一个行为回归，破坏了隔夜远程工作。
- [Issue #94862](https://github.com/NousResearch/hermes-agent/issues/94862) — 桌面端 cron ticker **会窃取其他配置文件的定时任务**，并通过默认配置文件的 Telegram 机器人投递。
- [Issue #84235](https://github.com/NousResearch/hermes-agent/issues/84235) — 同一会话上的并发轮次基于**过期快照**执行，导致重复执行和真实世界副作用。*(needs-repro)*
- [Issue #98466](https://github.com/NousResearch/hermes-agent/issues/98466) — 辅助重试/回退尝试**绕过 progress-hook 包装器**（24 个 relay 调用点中有 18 个未传入 `create=`），导致压缩空闲看门狗杀掉健康调用。*（今日新增）*
- [Issue #36260](https://github.com/NousResearch/hermes-agent/issues/36260) — Bedrock Converse **丢失推理签名**并读取错误的 schema 键 → 交错思考丢失 / 签名重放 400。
- [Issue #73403](https://github.com/NousResearch/hermes-agent/issues/73403) — Windows ACP 适配器**在执行终端工具时挂起**（Git Bash 探测）；已引用修复 PR #69083。
- [Issue #68771](https://github.com/NousResearch/hermes-agent/issues/68771) — Provider 503 被当作重试后失败处理，而不是**回退链触发**。
- [Issue #72131](https://github.com/NousResearch/hermes-agent/issues/72131) — 在缺少 `send_or_update_status` 的适配器上，provider 错误会**两次**到达聊天。*(risk-message-delivery)*
- [Issue #96742](https://github.com/NousResearch/hermes-agent/issues/96742) — 仅 SSH 的 `connection.json` 从未被整合到 v2 `connections.json` 注册表；桌面端静默回退到“此设备”。*(risk-compatibility)*
- [Issue #21532](https://github.com/NousResearch/hermes-agent/issues/21532) — CDP 浏览器模式在清理时**不关闭标签页**，导致内存耗尽。
- [Issue #83904](https://github.com/NousResearch/hermes-agent/issues/83904) — 从桌面端调度的 Cron 任务**没有投递路径**将结果送回活跃聊天。
- [Issue #98439](https://github.com/NousResearch/hermes-agent/issues/98439) — 当 gateway 作为计划任务运行时，Windows 上的 `hermes update` 会以 **Error 5** 中止。*（今日新增）*

### P3 — 较低严重性

- [Issue #98467](https://github.com/NousResearch/hermes-agent/issues/98467) — 桌面端在清理后会重新记住已耗尽的会话；每次重新启动都会重开死聊天。*（今日新增）*
- [Issue #31277](https://github.com/NousResearch/hermes-agent/issues/31277) — 原生 Bedrock Converse 缺少 `context-1m` beta 头；Opus 被限制在 200K。
- [Issue #78797](https://github.com/NousResearch/hermes-agent/issues/78797) — 当文本包含无法解析的 `@token` 时，Buzz 适配器会静默丢弃整个回复。
- [Issue #77564](https://github.com/NousResearch/hermes-agent/issues/77564) — Nous Portal 配置文件转发 `provider_routing` 偏好 → **每次请求都会收到 HTTP 400**。
- [Issue #73151](https://github.com/NousResearch/hermes-agent/issues/73151) — macOS 显示**两个 Dock 图标**（设置应用需要 `LSUIElement`）。

**进行中的修复 PR：** [#98496](https://github.com/NousResearch/hermes-agent/pull/98496)（压缩接受 `reasoning_content`）、[#98500](https://github.com/NousResearch/hermes-agent/pull/98500)（审计日志会话结束/重开）、[#98389](https://github.com/NousResearch/hermes-agent/pull/98389)（桌面更新 `.venv` 回退）、[#89804](https://github.com/NousResearch/hermes-agent/pull/89804)（通过过期的 give-up breaker 发送半开探测）、[#71745](https://github.com/NousResearch/hermes-agent/pull/71745) / [#71743](https://github.com/NousResearch/hermes-agent/pull/71743)（浏览器 CDP eval/会话修复）、[#94907](https://github.com/NousResearch/hermes-agent/pull/94907)（可恢复的重复技能读取）、[#98499](https://github.com/NousResearch/hermes-agent/pull/98499)（视觉 `path:/local:` 伪协议容忍）、[#97318](https://github.com/NousResearch/hermes-agent/pull/97318)（原生视频方言协商）、[#96106](https://github.com/NousResearch/hermes-agent/pull/96106)（Telegram 超大媒体恢复）。

## 6. 功能请求与路线图信号

**最强烈的信号：**

- **远程/混合执行** — [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715)（27 👍）仍然是需求最高的未关闭功能。草稿 PR [#98497](https://github.com/NousResearch/hermes-agent/pull/98497)（让 agent 具备 SSH 感知能力，包含终端 shell-out 指导 + 后端目标主机）直接推进了这一领域。
- **群聊连续性** — [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681) 加上两个大型草稿 PR：[#98307](https://github.com/NousResearch/hermes-agent/pull/98307)（群聊连续性、控制和文件——“无桌面世界的使用指南”）和 [#98073](https://github.com/NousResearch/hermes-agent/pull/98073)（从消息应用控制群聊：Slack/Telegram/WhatsApp/Signal）。这显然是当前路线图主题。
- **记忆系统扩展** — [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776)（Hindsight 记忆工具的多库路由）和 [#35800](https://github.com/NousResearch/hermes-agent/issues/35800)（`.library` 受保护冷存储 + 智能 Librarian + Curator 压缩器）。
- **Telegram 工作流** — [Issue #61136](https://github.com/NousResearch/hermes-agent/issues/61136)（论坛话题的持久化每话题上下文和绑定工作目录）。
- **桌面端 UX** — [Issue #98457](https://github.com/NousResearch/hermes-agent/issues/98457)（用户可自定义自己消息的颜色，已标记为重复）和 [#98448](https://github.com/NousResearch/hermes-agent/issues/98448)（iOS 支持问题）。

**下一版本预测：** 机器人模式群聊功能集（#98307/#98073）加 SSH 感知（#98497）是最有可能的近期新增功能，与此同时还将继续加固桌面端/会话状态，并集成已合并到 #98170 的提示缓存亲和性工作。

## 7. 用户反馈摘要

- **部署灵活性是头号诉求：** 用户反复要求远程 agent + 本地工具（#18715）、SSH 后端，以及关闭桌面端后仍可存活的群聊（#97681）。SSH 感知 PR（#98497）直接回应了一个已记录的能力差距（“agent 目前并不擅长 SSH”）。
- **桌面端会话/审批 UX 是最大痛点：** 无法应答的审批（#96394）、死会话在重启后复活（#98467）、重复 SSH 后端（#98492）、cron 任务被窃取（#94862）以及 cron 投递路径缺失（#83904）都在削弱用户对桌面端作为可靠网关的信任。
- **Provider 兼容性问题反复出现：** Bedrock 上下文窗口限制（#31277）、推理签名丢失（#36260）、Nous Portal 拒绝 OpenRouter 风格的路由偏好（#77564），以及 503 不触发回退（#68771）。
- **适配器消息投递可靠性对用户很重要：** 重复的错误消息（#72131）、Buzz 回复被静默丢弃（#78797）和 Telegram 超大媒体缺失（#96106）都被标记了 `risk-message-delivery` sweeper 标签。
- **Windows 用户面临格外多的摩擦：** ACP 挂起（#73403）、更新失败（#98439）和沙箱/sudo 问题（#98135）。

## 8. 积压监控

需要维护者关注的项目：

- [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — **远程 agent + 本地工具执行。** 自 5 月 2 日开放，27 👍，17 条评论，约 4 个月后仍处于 `needs-decision`。这是信号最强但没有解决方案的未关闭功能。
- [Issue #21532](https://github.com/NousResearch/hermes-agent/issues/21532) — 清理时 CDP 标签页泄漏，自 5 月 7 日开放，4 条评论，没有修复 PR。
- [Issue #31277](https://github.com/NousResearch/hermes-agent/issues/31277) — Bedrock 1M 上下文 beta 未在原生适配器上转发；PR #16793 只修补了 OpenAI 兼容路径。自 5 月 24 日开放。
- [Issue #31776](https://github.com/NousResearch/hermes-agent/issues/31776) — Hindsight 多库路由，自 5 月 25 日开放，9 条评论。
- [Issue #35800](https://github.com/NousResearch/hermes-agent/issues/35800) — `.library` 技能冷存储，自 5 月 31 日开放。
- [Issue #36260](https://github.com/NousResearch/hermes-agent/issues/36260) — Bedrock 推理签名往返（P2），自 6 月 1 日开放。
- **chrisyoung2005 的长期未合并 PR**（开放超过 6 周）：[#71745](https://github.com/NousResearch/hermes-agent/pull/71745) 和 [#71743](https://github.com/NousResearch/hermes-agent/pull/71743)（浏览器 CDP 修复）、[#66777](https://github.com/NousResearch/hermes-agent/pull/66777)（dashboard 插件开关）、[#64620](https://github.com/NousResearch/hermes-agent/pull/64620)（dashboard 最新后代遍历）。这些都是 P2/P3 并显式引用了 issue，但仍未被审查/合并。
- [PR #89804](https://github.com/NousResearch/hermes-agent/pull/89804) — 通过跨轮次的过期 give-up breaker 发送半开探测（P2，自 8 月 19 日开放）。
- [PR #89996](https://github.com/NousResearch/hermes-agent/pull/89996) — 配置文件导出应跳过 Unix 套接字/特殊文件（P2，自 8 月 19 日开放）。

---

*本摘要由 Hermes Agent GitHub 数据（NousResearch/hermes-agent）生成，2026-08-30。所有链接均指向官方仓库。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-08-30

## 今日概览
IronClaw 过去 24 小时的活动仅限 PR：6 个拉取请求有更新，均仍处于打开状态，0 个 issue 更新，0 个新版本发布。没有 PR 被合并或关闭，因此今天没有已完成的功能工作落地。活跃 PR 主要是核心及资深贡献者提交的修复，涉及 CI 统一、循环终止行为，以及开发者体验相关的缺陷。整体项目状态看似稳定，但合并数量不足说明瓶颈在于审查/合并流程，而非缺乏贡献。

## 版本发布
无。此期间没有发布新版本。

## 项目进展
今日没有 PR 被合并或关闭。

过去 24 小时内更新的开放 PR 代表了主要的前进方向：

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) — 将有边界的集成执行统一到单次 `cargo nextest run` 中，并固定四个测试并发上限，同时移除了冗余的 shell 投影层和按组运行的 runner。
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — 修复重复输出占主导时循环无法终止的问题，并为交互式运行设置墙钟时间上限，解决生产环境中无进展运行的问题。
- [nearai/ironclaw PR #7988](https://github.com/nearai/ironclaw/pull/7988) — 自动刷新已提交的代码库知识图谱快照。
- [nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991) — 修复 pre-push 门禁，使其可在 macOS 上运行。
- [nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990) — 在工具披露（tool-disclosure）失败中，区分无法解析的工具名与真正的输入编码错误。
- [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) — 让 `list_dir` 在错误消息中包含缺失的路径。

## 社区热门话题
在此期间，没有 issue 或 PR 产生评论/回应活动，因此没有社区讨论需要跟踪。

规模最大且最具战略意义的开放 PR 如下：

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) — XL 级 CI 统一工作；表明正在推动更简单、更确定的集成测试。
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — XL 级循环终止修复；起因是一次生产运行在 70 分钟内消耗了 593 次工具调用却毫无进展。

二者均来自核心维护者，可能表明维护者正专注于运行时可靠性和 CI 成本控制。

## 缺陷与稳定性
没有新 issue 提交，但多个开放 PR 正在修复实际问题：

- **高严重性：** [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) — 默认循环族在之前的基于摘要的终止器被移除后，无法在无进展时终止。一次生产运行在 70 分钟内执行了 593 次工具调用。该修复恢复了对重复主导输出的终止，并增加了交互式墙钟时间上限。
- **中严重性：** [nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990) — 无法解析的工具名被错误归类为 `FailureKind::InputEncode`，将两个无关的失败模式混为一谈。
- **中严重性：** [nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991) — pre-push 钩子因两个独立原因在 macOS 上失败，可能导致开发人员完全绕过该钩子。
- **低严重性：** [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) — `list_dir` 在目录缺失时报告失败，但不会告知模型未找到哪个路径。

这四个修复均处于开放状态，尚未合并。

## 功能请求与路线图信号
issue 或 PR 中没有明确的功能请求。

开放 PR 中体现的路线图信号：

- [nearai/ironclaw PR #7992](https://github.com/nearai/ironclaw/pull/7992) 表明未来的 CI 运行将整合到单条集成执行路径中，并限制并发数。
- [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977) 指向为交互式代理循环提供更强的运行时保护。
- [nearai/ironclaw PR #7988](https://github.com/nearai/ironclaw/pull/7988) 表明持续投入于代码库记忆/知识图谱的新鲜度。

如果合并，循环终止和工具披露相关的修复最有可能出现在下一个版本中。

## 用户反馈摘要
此窗口期内没有记录到直接的用户反馈或基于 issue 的满意度信号。

贡献者反馈的痛点包括：

- macOS 开发人员无法可靠运行 pre-push 钩子，存在绕过验证的风险。
- 面向代理的错误有时会省略具体路径或错误分类失败类型，使模型更难理解和恢复工具失败。
- 无进展的代理循环可能运行很长时间，浪费时间和计算资源。

没有可用的正面或负面社区情绪数据。

## 积压事项观察
目前没有长期未回复的 issue 处于开放状态。

最老的、需要关注的开放 PR 是 [nearai/ironclaw PR #7977](https://github.com/nearai/ironclaw/pull/7977)，创建于 2026-08-28，目前仍处于开放状态。鉴于其严重性——防止生产环境出现失控循环——应尽快安排维护者审查。[nearai/ironclaw PR #7991](https://github.com/nearai/ironclaw/pull/7991)、[nearai/ironclaw PR #7990](https://github.com/nearai/ironclaw/pull/7990) 和 [nearai/ironclaw PR #7989](https://github.com/nearai/ironclaw/pull/7989) 自 2026-08-29 起一直处于开放状态，也应在近期进行审查。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-08-30

## 1. 今日概览

QwenPaw 正处于高度活跃的开发周期：过去 24 小时内有 12 个 issue 和 13 个 PR 被更新，其中 3 个 PR 已关闭/合并，没有新版本发布。项目展现出很强的社区参与度：有 2 个首次贡献者提交的 PR（#7416、#7403），还有围绕即将到来的多租户 QwenPaw Hub（#7318）展开的热烈路线图讨论。维护工作主要集中在 PawApp SDK/运行时、Console 聊天行为以及模型提供商兼容性的可靠性修复上。整体项目健康状况良好，但若干涉及持久化会话状态和渠道配置的稳定性 bug 需要尽快处理。

## 2. 版本发布

过去 24 小时内没有发布新版本。

## 3. 项目进展

今天有 3 个 PR 被关闭/合并：

- **[#6293 — feat(providers): add qwen3.8 to Aliyun Token Plan](https://github.com/agentscope-ai/QwenPaw/pull/6293)**  
  在阿里云 Token 计划目录中注册了 `qwen3.8-max-preview`，支持文本/图像能力，上下文窗口为 1,000,000 token，输出上限为 65,536 token。这扩大了 QwenPaw 对阿里云用户的提供商覆盖范围。

- **[#6581 — fix(console): avoid redundant multimodal upload warning](https://github.com/agentscope-ai/QwenPaw/pull/6581)**  
  移除了上传附件时重复出现的“不支持多模态”警告提示，同时保留工具提示中的模型能力说明和仅支持图片的模型警告。

- **[#7191 — fix(console): preserve non-ASCII file card names](https://github.com/agentscope-ai/QwenPaw/pull/7191)**  
  修复 #7136：让 Console 工具卡片解析器除了读取 `filename` 之外也读取 `name`，避免非 ASCII 上传文件名被显示为百分号编码的 URL 基本名称。

多个未合并 PR 也有推进或更新，包括 #7416（钉钉 `card_auto_layout` UI 开关）、#7415/#7414/#7413（PawApp/运行时可靠性修复）以及 #7409（丢弃空的助手文本块）。

## 4. 社区热门话题

- **[#7318 — QwenPaw Hub multi-tenant edition: what should we build next?](https://github.com/agentscope-ai/QwenPaw/issues/7318)**  
  *14 comments · 👍 1*  
  本周最活跃的讨论串。社区正在讨论 QwenPaw Hub（即将在 2.2.0 中发布的多租户版本）的功能优先级。背后的需求很明确：用户希望有一条受支持的路径，从个人助手走向团队部署，包括多用户访问和管理员管理的技能。

- **[#7405 — Question: Plan Mode](https://github.com/agentscope-ai/QwenPaw/issues/7405)**  
  用户希望在执行前预览模型的计划，而不是事后才发现错误再通过快照回滚。这反映了人们对更安全的自主 Agent 工作流的普遍期望。

- **[#7398 — Feature: add /btw side-question command](https://github.com/agentscope-ai/QwenPaw/issues/7398)**  
  请求增加该命令，以便在不污染主对话历史、不占用上下文窗口的情况下快速提出旁路问题——灵感来自 Claude Code 的 `/btw`。

- **[#7406 — Add official theming support](https://github.com/agentscope-ai/QwenPaw/issues/7406)**  
  用户希望 QwenPaw Desktop 支持可配置的强调色、字体和间距。目前不满意的用户会直接编辑应用包内的 `index.html`，但这种方式会在更新后失效。

## 5. Bug 与稳定性

以下 bug 按严重程度排序：

- **High — [#7407: Console messages silently drift to the wrong agent](https://github.com/agentscope-ai/QwenPaw/issues/7407)**  
  聊天消息可能被发送到错误的 Agent。这是一个可能造成混淆的数据完整性问题。目前还没有关联的修复 PR，需要维护者复现。

- **High — [#7402: Empty assistant `output_text` blocks poison session history](https://github.com/agentscope-ai/QwenPaw/issues/7402)**  
  持久化到历史记录中的空文本块会导致后续 Ark Responses API 调用失败并返回 `400 MissingParameter`。已有修复 PR：**[#7409 — fix(agents): drop empty assistant text blocks](https://github.com/agentscope-ai/QwenPaw/pull/7409)**。

- **High — [#7408: Feishu channel config unexpectedly cleared](https://github.com/agentscope-ai/QwenPaw/issues/7408)**  
  `channels.feishu` 配置被清空，导致渠道被禁用，定时投递因此失败并报 `KeyError('channel not found: feishu')`。需要调查配置持久化问题。

- **Medium — [#7411: PawApp fail closed when agent chat runtime is unavailable](https://github.com/agentscope-ai/QwenPaw/issues/7411)**  
  PawApp 在 Agent 聊天运行时不可用时会故障关闭；合成回退响应可能掩盖运行时缺失。修复 PR：**[#7414](https://github.com/agentscope-ai/QwenPaw/pull/7414)**。

- **Medium — [#7410: Runtime loses partial state when async generator is closed](https://github.com/agentscope-ai/QwenPaw/issues/7410)**  
  `GeneratorExit` 会绕过取消状态的持久化，导致运行时丢失部分状态。修复 PR：**[#7413](https://github.com/agentscope-ai/QwenPaw/pull/7413)**。

- **Medium — [#7412: PawApp SDK stream cleanup can block or race](https://github.com/agentscope-ai/QwenPaw/issues/7412)**  
  `reader.cancel` 调用可能停滞，并且在取消/失败/完成期间存在竞态条件。修复 PR：**[#7415](https://github.com/agentscope-ai/QwenPaw/pull/7415)**。

## 6. 功能请求与路线图信号

- **QwenPaw Hub / 多租户支持（#7318）** 是最强烈的路线图信号——明确针对 2.2.0。社区意见将决定其功能集。
- **钉钉 `card_auto_layout` 的 Console 暴露（#7404）** 已经催生了一个首次贡献者 PR：**[#7416](https://github.com/agentscope-ai/QwenPaw/pull/7416)**。该 PR 很可能会很快合入。
- **Chat 用户体验改进** 正在获得关注：滚动锁定（#7356）、工具调用可见性开关（#7357）和 `/btw` 旁路提问（#7398）都旨在让较长的 Agent 对话更易读、更不嘈杂。
- **主题支持（#7406）** 如果维护者采纳该请求，可能会成为未来 Desktop 版本的候选功能。
- **Plan 模式（#7405）** 仍是一个开放问题；如果优先处理，它将让用户在执行前获得更安全的可见性。

## 7. 用户反馈摘要

用户正在积极推动 QwenPaw 超越单用户助手场景，反复提出对团队/多租户能力的需求（#7318）。大家对 Plan 模式（#7405）和旁路提问命令（#7398）等工作流安全功能表现出明显热情，说明用户希望对 Agent 行为和上下文有更多控制。在痛点方面，多位用户报告了配置和状态持久化问题：飞书渠道配置被静默清空（#7408）、会话历史被空文本块污染（#7402）、消息被发送到错误的 Agent（#7407）。这些是高信任度问题，应优先处理。积极信号包括首次贡献者提交了聚焦、高质量的 PR（#7416、#7403），这说明贡献者体验是有吸引力的。

## 8. 积压任务观察

- **[#6889 — fix(console): preserve textarea target for IME events](https://github.com/agentscope-ai/QwenPaw/pull/6889)**  
  该修复自 2026-08-11 起一直处于打开状态，解决 `RichFileReferenceInput` / Sender textarea 路径中的 IME 组词问题。它已经等待评审超过两周，对 CJK 用户很重要。

- **[#7356 — feat(console): add chat scroll lock](https://github.com/agentscope-ai/QwenPaw/pull/7356)** 和 **[#7357 — feat(chat): add tool call visibility toggle](https://github.com/agentscope-ai/QwenPaw/pull/7357)**  
  这两个 PR 都自 2026-08-27 起打开，目前没有可见评论。它们是社区贡献的 UX 改进，直接回应了用户对嘈杂/长流式对话的常见抱怨。

- **[#7403 — Update README](https://github.com/agentscope-ai/QwenPaw/pull/7403)**  
  这是一个首次贡献者 PR，仍在使用模板占位符；需要维护者参与或指导，以决定是完成还是关闭。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-08-30

## 1. 今日概览

ZeroClaw 在最近 24 小时内经历了一个非常活跃的开发窗口：50 个 issue 和 50 个 PR 获得了更新，其中 11 个 issue 被关闭，5 个 PR 被合并/关闭——吞吐量与变更量的比例相当健康。没有发布新版本。流程成熟度仍然是项目的标志性特征：维护者决策队列（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）正在积极引导 RFC 工作，一个重要的记忆存储 RFC（[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)）完成了第二轮维护者修订。安全工作也表现突出，包括关闭了一个 S0 级跨代理 cron 漏洞（[#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)）和一项 Landlock 沙箱修复（[#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)）。项目整体健康状况良好：治理机制正常运转，安全修复持续落地，新的能力 RFC（流式 webhook、Telegram 进度通知、会话级提示）也在不断提交进来。

## 2. 发布

本窗口期内没有发布新版本。下一个版本很可能会纳入已合并的 Landlock allowed-roots 修复（[#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)）和 CI 实时配置回归修复（[#10181](https://github.com/zeroclaw-labs/zeroclaw/pull/10181)）。

## 3. 项目进展

前 20 项中可以看到两个已关闭的 PR（今天共合并/关闭了 5 个）：

- **[PR #10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)（安全，规模 M）** — `fix(security): honor allowed_roots tiers in the Landlock sandbox`。修复了一个实际存在的缺口：应用层已经支持 `allowed_roots`、`allowed_roots_read_only` 和 `allowed_roots_write_only`，但 Landlock 沙箱只评估了其中一部分。对于多 root 安装来说，这是一次有意义的安全加固修复。
- **[PR #10181](https://github.com/zeroclaw-labs/zeroclaw/pull/10181)（CI，规模 XS）** — `ci(plugins): execute every live-config regression in the required job`。必需的 Cranelift 插件后端步骤之前只按一个精确的测试名称进行过滤，因此 #9126 添加的委托注册表回归测试从未在必需的 CI 中运行过。

以下已关闭的 issue 标志着相关工作已完成：

- **[#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)（S0 安全）** — cron 工具未限定在所属代理的范围内；任何代理都可以读取/触发/修改/删除其他代理的任务。已关闭，标志着一个关键安全修复的完成。
- **[#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001)（S2）** — 提供商轮次失败将特定原因的诊断信息（LM Studio、Ollama 等）埋在了通用的重试封装之下。已关闭。
- **[#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)** — ZeroCode 文本输入中的 Option-Backspace 按词删除功能，已发布。
- **[#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086)** — ZeroCode 日志面板文本现在可以选中/复制，已发布。
- **[#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185)** — PR 风险评估策略跟踪问题已解决；维护者决定不采用自动双审批/精确 head 强制机制。
- **[#10447](https://github.com/zeroclaw-labs/zeroclaw/issues/10447)** — 安全公告扫描失败已解决（yanked `chacha20 0.10.0`）。

值得关注的新功能 PR（已打开/更新，尚未合并）：[#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)（紧凑的 `local_small` 提示预算）、[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)（暴露所属 ACP 会话）、[#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466)（ZeroCode 丢失提示补全）、[#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442)（OpenRouter 流 keep-alive）、[#10425](https://github.com/zeroclaw-labs/zeroclaw/pull/10425)（RFC #6954 cron 内部主体切片）以及 [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)（Gemini 语音到语音 broker 通道，PR1）。

## 4. 社区热门话题

最近 24 小时内评论最多的 issue：

- **[#9103 — RFC：将权威记忆存储与可选增强连接器分离](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)**（15 条评论，开放，高风险，`needs-maintainer-review`）。最活跃的治理项。2026-08-01 的 Core REVISE 投票否决了最初的 Lucid 优先部署方案；维护者现已两次修订 RFC，在保留存储/增强架构边界的同时，向有界的连接器决策评审方向推进。
- **[#8692 — 追踪器：RFC 和设计问题的维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（14 条评论）。项目的中央 RFC 分流机制；其活跃度表明维护团队正在积极处理一系列设计决策。
- **[#9965 — 任务：在并行运行时网关下加固运行时写入的可执行测试夹具](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**（10 条评论，P1，进行中）。一次由真实的 `cron::scheduler` 测试失败引发的不稳定测试调查；由于影响 CI 可靠性，社区参与度很高。
- **[#9998 — RFC：会话级持久提示附件](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)**（9 条评论，已接受）。解决了历史裁剪或守护进程重启后的目标/上下文丢失问题；现已接受，由实现追踪器 [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405) 跟进。
- **[#8586 — refactor(gateway)：集中化 webhook 频道消息分发](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)**（9 条评论，进行中）。希望在所有基于 webhook 的频道上实现统一的 webhook 到频道入口生命周期。
- **[#5287 — 功能：紧凑的 local_small 运行时配置](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)**（7 条评论，2 👍）。一个长期存在（自四月起）的本地优先功能；新的 [PR #10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465) 显示它终于有了进展。

潜在需求：(a) RFC 治理与决策速度，(b) 跨会话边界的记忆/提示持久性，(c) 并行环境下的测试/CI 可靠性，(d) 对本地模型的一流支持。数据中未包含 PR 评论数；按规模和时效性来看，最活跃的 PR 是 XL 规模的 [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（上下文压缩）、[#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)（日志轮转/查询）、[#10064](https://github.com/zeroclaw-labs/zeroclaw/pull/10064)（Telegram 自毁审批卡片）和 [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（Hailo-Ollama 支持）。

## 5. Bug 与稳定性

按严重程度排序：

- **[S0 — #9947：cron 工具未限定在所属代理范围内](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)** — 已关闭。跨代理按 ID 读取/触发/修改/删除 cron 任务。本窗口期内已解决；这是看板上优先级最高的项。
- **[S1 — #10063：基于 Anthropic 的兼容网关拒绝工具结果中的 image_url 块](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)** — 开放，已接受，进行中。通过兼容提供商传递视觉能力工具结果的工作流会被阻塞。
- **[S1 — #10334：git_operations 对普通仓库路径忽略 allowed_roots](https://github.com/zeroclaw-labs/zeroclaw/issues/10334)** — 开放，进行中。与 `workspace_only` + `allowed_roots` 授权模型相矛盾，阻塞了合法的外部源工作流。
- **[S1 — #10357：工具执行错误路径丢弃详细错误主体](https://github.com/zeroclaw-labs/zeroclaw/issues/10357)** — 开放，已接受。代理只收到一个赤裸的 "HTTP 400" 而不是底层失败详情，严重削弱了自我纠错能力。
- **[S2 — #10324：cron 手动触发/运行历史读取在代理重命名场景下仍存在先检查后执行问题](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)** — 开放，已接受。与 #9947 属于同一类跨代理后果，但需要利用一个很窄的重命名竞态窗口；因此有意定为 S2。
- **[S2 — #10436：原生 OpenRouter 流式传输使用总请求超时，会切断活动中的响应](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)** — 开放。长时间推理流（例如 `z-ai/glm-5.3-flash`）在响应中途被终止。已有一个修复 PR：**[#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442)**（专用客户端，10 秒连接上限，30 秒读取间隔静默上限）。
- **[S2 — #10292：ACP 会话工具无法列出/检查 Code 会话](https://github.com/zeroclaw-labs/zeroclaw/issues/10292)** — 开放，进行中。已有一个修复 PR：**[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)**。
- **[S3 — #10326：可靠流式错误报告的是请求的模型而非实际服务的固定模型](https://github.com/zeroclaw-labs/zeroclaw/issues/10326)** — 开放，已接受。仅影响诊断，但会对运维人员造成误导。
- **[安全 bug 报告 — #10409：zeroclaw-channels 中的临时文件可能默认为 0o644](https://github.com/zeroclaw-labs/zeroclaw/issues/10409)** — 开放，P1。语音/图片临时文件可能泄露给共享系统上的其他用户。由 arena CI 机器人提交；需要维护者审查。
- **测试/CI 不稳定项（P1）：** [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)（在并行运行时测试网关下，可执行 shim 的写入发生在多线程之后）和 [#10371](https://github.com/zeroclaw-labs/zeroclaw/issues/10371)（`concurrent_stale_start_is_serialized_before_cleanup` 不稳定，据报告者称此前已存在）。两者都附有可复现证据并被持续跟踪。

## 6. 功能请求与路线图信号

本窗口期内的新功能请求：

- **[#10419 — 通过 SSE 从 POST /webhook 流式传输代理循环 token](https://github.com/zeroclaw-labs/zeroclaw/issues/10419)**（P2，高风险）。调用 `/webhook` 的托管 Path A worker 无法进行流式传输；用户只能在最后看到一个 JSON 响应。鉴于 webhook 重构（#8586）已在推进中，这是下个版本纳入的有力候选。
- **[#10422 — 将 SOP 作为心跳运行](https://github.com/zeroclaw-labs/zeroclaw/issues/10422)**（P3，高风险）。希望 `heartbeat.sop = "<name>"` 能绕过 `HEARTBEAT.md` 的间接层。一个小而确定的体验改进。
- **[#10426 — 在 Telegram 中显示面向用户的代理进度](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)**（P2，高风险）。长时间的工具调用看起来像卡住了；用户希望有可选的中间进度。很可能会与 webhook SSE 工作一起推进。

已接受且带有活跃追踪器的路线图项：

- **会话级提示附件**（[#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) → 追踪器 [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405)）— 在聊天/ACP 会话、提示修改工具、审批、编辑、生命周期清理中的实现。
- **Gemini 语音到语音 broker 通道**（[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) → 追踪器 [#10406](https://github.com/zeroclaw-labs/zeroclaw/issues/10406)）— 第一个 PR 切片（[#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)）已经打开。
- **Goal Mode 路线图**（[#10341](https://github.com/zeroclaw-labs/zeroclaw/issues/10341)）— 协调 #8303、#9702 中的 V1/V2；V3 保持可见但未获批准。
- **紧凑的 `local_small` 配置**（[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)）— 现在已有实现 PR（[#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)），包含技能元数据压缩和 8,000 字符的系统提示上限。

预测：`local_small`（#5287）和 OpenRouter 流 keep-alive（#10436）最接近落地，因为修复 PR 已经打开。SSE webhook 流式传输（#10419）解决了一个具体的托管 worker 痛点，很可能很快被排期。记忆存储 RFC（#9103）仍然是最重要的未决架构决策。

## 7. 用户反馈摘要

- **Telegram 用户遭遇"静默卡顿"**（[#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)）：长时间运行的搜索/工具调用不产生任何中间反馈，让代理看起来像坏了。这是明确的不满信号，并附有具体的预期行为描述。
- **本地优先用户因提示膨胀而受损**（[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)，2 👍）：要求紧凑的技能元数据、提示预算契约，以及防止内部指令泄露到用户可见的输出中。自四月以来被反复要求；新的 PR 是一个积极的回应。
- **macOS ZeroCode 用户期望 Option-Backspace 行为**（[#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)）：已关闭并发布——快速 UX 响应的一个好例子。
- **ZeroCode 日志之前无法复制**（[#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086)）：已关闭并发布。
- **OpenRouter 用户丢失长响应**（[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)）：正在进行的推理流会被总请求超时截断；进行长时间推理轮次的用户会直接受到影响。
- **多代理运维人员遭遇 cron 信任危机**（[#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)）：S0 级跨代理访问已修复，后续的竞态问题（[#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)）表明社区对维护者的安全标准要求很高。
- **硬件生态需求：Hailo-Ollama**（[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)）：一个大型、长期存在的 PR，要求原生 Hailo 支持——目前因等待作者行动而阻塞，并被标记为 `do-not-merge`。
- **运维人员希望确定性的心跳执行**（[#10422](https://github.com/zeroclaw-labs/zeroclaw/issues/10422)）：将 SOP 作为心跳可以消除一个脆弱的 markdown 间接层步骤。

## 8. 待办关注

需要维护者或作者关注的项目：

- **[#9103 — 记忆存储与增强连接器 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)** — 自 7 月 16 日起开放，高风险，`needs-maintainer-review`。正在积极修订（最近一次就是今天），但在 Core REVISE 否决后仍未解决。需要做出一个有明确范围限制的决策，以解除连接器评审的阻塞。
- **[#8692 — 维护者决策队列追踪器](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 自 7 月 4 日起开放。这就是队列本身的追踪器；其持续的高评论数表明决策正在不断堆积。
- **[#5287 — 紧凑的 `local_small` 配置](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)** — 自 4 月 4 日起开放（最古老的已接受功能）。现在已有 [PR #10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)；需要评审动力。
- **[#6864 — 反转 zeroclaw-channels → zeroclaw-runtime 依赖](https://github.com/zeroclaw-labs/zeroclaw/issues/6864)** — 自 5 月 23 日起开放，已接受，进行中，高风险。一次重大架构重构；目前没有可见的开放 PR。
- **[#8586 — 集中化 webhook 频道消息分发](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)** — 自 7 月 1 日起开放，进行中。是 SSE 流式传输（#10419）的基础；最好在该功能之前落地。
- **[#8766 — 首次运行设置的用户行为 E2E 测试覆盖](https://github.com/zeroclaw-labs/zeroclaw/issues/8766)** — 自 7 月 6 日起开放，已接受，进行中，高风险。未解决的首次运行配置 bug 不断浮出水面；这项测试覆盖仍然空缺。
- **[PR #9109 — Hailo-Ollama 原生支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — 自 7 月 17 日起开放，XL，`do-not-merge`，`needs-author-action`。已停滞；要么等待作者更新，要么明确关闭。
- **[PR #9535 — 将上下文压缩锚定到模型窗口比率](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — 自 7 月 29 日起开放，XL，`needs-author-action`。作者必须重新参与进来；它所解决的固定 32k 预算问题仍然存在。
- **[PR #10016 — 按身份关联 webhook 审计调用](https://github.com/zeroclaw-labs/zeroclaw/pull/10016)** — 自 8 月 15 日起开放，安全，XL。近期没有维护者的反馈信号；hook 审计身份关联是一项与安全相关的改进。
- **[#10031 — Dependabot web-minor-patch 分组（17 个更新）](https://github.com/zeroclaw-labs/zeroclaw/pull/10031)** — 自 8 月 16 日起开放；常规更新，但需要定期合并以避免漂移。

</details>

---
*本日报由 [agents-radar](https://github.com/mux4457986479-commits/agents-radar) 自动生成。*
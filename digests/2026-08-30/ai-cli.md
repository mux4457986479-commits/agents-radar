# AI CLI 工具社区动态日报 2026-08-30

> 生成时间: 2026-08-30 10:40 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 跨工具 AI CLI 对比报告 — 2026-08-30

## 1. 生态概览

AI CLI 智能体类别正在从"可演示的助手"快速演变为"关键任务级开发者基础设施"。截至 2026-08-30，主要的开源和厂商支持的 CLI 都在积极发布——从 Codex 的 Rust alpha 版本和 Copilot 的补丁版本，到 Gemini 的 nightly 构建，以及 OpenCode 和 Qwen Code 的大量 PR。社区反馈集中在四个主题上：上下文/成本效率、安全的状态变更（尤其是撤销和恢复）、诚实的智能体状态报告，以及跨平台可靠性。最严重的信任侵蚀来自误报的安全阻断、静默的模型/行为替换，以及昂贵的上下文膨胀。与此同时，多智能体编排、远程/无头控制和插件可扩展性正在成为明确的产品差异化因素。

## 2. 活动对比

以下计数反映的是各项目 2026-08-30 摘要中重点标记的 issue/PR/讨论，而非仓库总活动量。  
N/R = 摘要中未包含讨论数据；这不一定意味着上游渠道已禁用。

| 工具 | Issues（重点标记） | PRs（已更新） | 讨论 | 发布状态 |
|---|---|---|---|---|
| Claude Code | 10 | 1 | N/R | 过去 24 小时内无发布 |
| OpenAI Codex | 10 | 7 | 10 | 2 个 Rust alpha 版本 |
| Gemini CLI | 10 | 10 | N/R | 1 个 nightly 版本 |
| GitHub Copilot CLI | 10 | 1 | N/R | 2 个补丁版本 |
| OpenCode | 10 | 10 | N/R | 过去 24 小时内无发布 |
| Pi | 10 | 7 | N/R | 过去 24 小时内无发布 |
| Qwen Code | 10 | 10 | N/R | 过去 24 小时内无发布 |

值得注意的信号：每个工具都有大约 10 个重点标记的 issue，说明各社区都充斥着可靠性/用户体验反馈，而非纯粹的功能请求。PR 速度最快的是 Gemini CLI、OpenCode 和 Qwen Code。

## 3. 共性功能方向

### 上下文与成本控制
- **Claude Code** —— 新会话中隐藏的工具结果上下文累积（#68339）；自动重试后出现孤立回合（#72203）。
- **OpenCode** —— 每次工具结果都完整重新注入 `AGENTS.md`（#46208）；无界重复的 `<system-reminder>` 条目（#46217）。
- **Copilot CLI** —— 压缩失败后每回合都作为完整收费调用重试（#4663）；重复的 `sessionStart` 上下文（#4665）；恢复长会话时堆内存 OOM（#4664）。
- **Pi** —— Anthropic 提示缓存读取停滞，而 `cacheWrite` 每回合都在增长（#8849）；上下文预算忽略 `maxTokens` 输出预留（#8061）。
- **Gemini CLI** —— CRLF 行尾导致整文件 diff 被转储到模型上下文中（#29130）。
- **Qwen Code** —— 为延迟工具保留提示缓存（#10410）。
- **Codex** —— 长会话中重复处理大量缓存上下文（#34971）。

### 安全状态变更与撤销
- **Codex** —— #9203（"请恢复 `/undo`"）获得 418 个 👍；相关的回退/还原讨论 #9618。
- **OpenCode** —— 自动压缩在未确认的情况下继续并丢失原始任务目标（#41358）。
- **Copilot CLI** —— 缺少 `str_replace`（#4027）和格式错误的 `apply_patch` JSON（#4553）导致无限重试循环。
- **Claude Code** —— 请求在变异工具调用后进行强制回读（#74401）。
- **Pi** —— 分支摘要因硬编码的 `maxTokens`（#8845）而确定性失败。

### 诚实的智能体状态与透明度
- **Gemini CLI** —— 子智能体达到 `MAX_TURNS` 被报告为 `GOAL` 成功（#22323）；静默的预览模型替换（#28828）。
- **Qwen Code** —— 队友消息在整个工具调用回合中被排队（#8172）；模糊的 `send_message` 目标静默丢弃队友信息（#10090）。
- **OpenCode** —— 子智能体陷入无限思考循环并消耗额度（#42923）。
- **Claude Code** —— 模型将内部任务路由包装器回显给用户（#74309）。
- **Copilot CLI** —— 重复的 `sessionStart` 上下文被转发给子智能体（#4665）。

### MCP / 扩展可靠性
- **Copilot CLI** —— v1.0.81 破坏了 chroma-mcp（#4647）和 Azure DevOps OAuth MCP（#4660）。
- **Claude Code** —— macOS Desktop 无法启动任何本地 stdio MCP 服务器（#89447）。
- **OpenCode** —— MCP 子进程在 Web 客户端重连时持续累积直至 OOM（#46035）；请求按 MCP 进行信任配置（#40125）。
- **Gemini CLI** —— `read_file` 绕过注入的 `FileSystemService`，破坏 ACP 客户端（#29110）。
- **Qwen Code** —— `toolSearch.threshold > 0` 的 MCP 工具在 llama.cpp 语法解析中失败（#10520）。

### 跨平台 / Windows 对等性
- 每个工具都有特定的 Windows 失败集群：Claude Code Windows 11（#85000）、Codex WSL/项目失败（#41290）、Gemini CLI CRLF diff（#29130）、Copilot Windows 终端布局缺口（#3797）、OpenCode 桌面冻结（#41365）、Pi conhost/PowerShell 问题（#8846/#8842）、Qwen CUA SDK 在 Windows x64 上 panic（#10538）。

## 4. 差异化分析

| 工具 | 核心定位 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 受管控的、注重安全的编码会话，带 hooks 和 AUP 过滤器 | 有严格合规需求的企业/团队用户 | Claude 模型行为调优、stop hooks、Cowork 桌面会话、`CLAUDE.md` 护栏 |
| **OpenAI Codex** | 基于 Rust 的现代智能体，带桌面应用、Vim 用户体验和技能 | 高级用户、ChatGPT 互联工作流、IDE 中心化开发者 | Rust alpha 发布、桌面远程控制、撤销/自动恢复需求、重度 Windows 桌面覆盖 |
| **Gemini CLI** | 多智能体编排、子智能体、浏览器自动化、ACP 支持 | Google 生态系统和高级智能体用户 | Nightly 发布、从 Claude Code 迁移 hooks、AST 感知代码智能路线图 |
| **GitHub Copilot CLI** | GitHub 原生智能体，深度集成 MCP/Agent Plugins | GitHub 中心化开发者和企业 GitHub 客户 | 快速补丁发布、VS Code/GitHub 认证、WAM OAuth、插件发现 |
| **OpenCode** | 性能、上下文效率、TUI/插件可扩展性 | 开源 TUI 爱好者、插件作者、自托管用户 | 插件架构、MCP 子进程去重、ACP/Xcode 集成、提示转换协调器 |
| **Pi** | 终端优先、供应商无关的编码智能体 | 终端纯粹主义者、希望灵活选择模型/供应商的用户 | 轻量 TUI、JSONL 会话持久化、扩展 hooks、可选 Web GUI |
| **Qwen Code** | 多智能体编排和本地推理兼容性 | Qwen 生态系统用户、自托管 llama.cpp 用户、WebShell 操作者 | Daemon 模式、WebShell 管理 UI、跨会话消息传递、模型特定语法/桥接修复 |

## 5. 社区势头与成熟度

- **OpenAI Codex** 拥有最强烈的需求信号：#9203 有 418 个 👍，#28969 有 202 个 👍，另有 10 个讨论和 7 个 PR。它迭代迅速，但在 Windows 和会话稳定性方面仍处于 alpha 级别。
- **OpenCode** 和 **Qwen Code** 展现出最多的贡献者势头：一个摘要窗口内各有 10 个 PR，且包含有意义的架构工作（MCP 子进程共享、提示缓存桥接、WebShell 管理、插件可扩展性）。
- **Gemini CLI** 也在发布 nightly 版本并修复 10 个 issue，但其 P1 可靠性积压——虚假的 `GOAL` 成功、TUI 挂起、通用智能体停滞——使其处于"高速度但高风险"阶段。
- **GitHub Copilot CLI** 正在发布稳定的补丁版本（v1.0.82 和 v1.0.82-2），但今天的 PR 活动量较低。尽管发布节奏稳定，MCP 和会话成本回归正在损害信任。
- **Claude Code** 看起来成熟：无新发布，仅 1 个 PR，但一个长达 147 条评论的模型行为 issue 和重复的 AUP 误报表明其优先考虑治理/保守而非功能速度。
- **Pi** 仍然是一个专注的、社区规模较小的工具：7 个 PR，无发布，但有强烈的 TUI/上下文/缓存参与度。它在技术上雄心勃勃，但尚未成为主流竞争者。

## 6. 趋势信号

1. **上下文效率是成本和信任问题，而不仅仅是性能问题。** 用户正在注意到重复文件注入、失败的压缩重试和提示缓存未命中造成的 token 浪费。暴露缓存指标、去重注入上下文并避免整文件 diff 的工具将赢得长会话工作负载。

2. **安全的撤销/恢复是一个缺失的原语。** 在 Codex、OpenCode、Copilot 和 Claude Code 中，用户都希望获得可恢复的变更——尤其是在不使用 Git 的情况下。预计一流的撤销/检查点和压缩确认将成为标配。

3. **智能体状态的真实性正在成为核心要求。** 虚假的 `GOAL` 成功、静默的模型替换和无限思考循环破坏了自动化信任。开发者应该设计状态报告以清晰区分"已完成"、"已中断"和"失败"。

4. **MCP 是标准但仍脆弱。** Copilot 和 Claude Code 中多个发布级回归，以及 OpenCode 和 Qwen 中的 MCP 子进程泄漏，表明 MCP 需要兼容性测试、按服务器认证/信任和生命周期管理。

5. **Windows 桌面支持是最薄弱的共同短板。** 几乎所有主要 CLI 都有阻塞日常使用的 Windows 特定失败。决策者在为混合平台团队采用工具之前应验证 Windows/VS Code/WSL 行为。

6. **多智能体和远程编排正在成为差异化因素。** 跨会话消息传递（Qwen）、远程控制（Codex）、Web GUI（Pi）和 Cowork（Claude Code）表明行业正在超越单终端助手，走向分布式、监督式开发者智能体。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区动态

*数据来源：github.com/anthropics/skills · 截至 2026-08-30*

---

## 1. 热门 Skills 排行

以下 PR 是社区讨论最为集中的几个。目前均处于 **open** 状态。

### #1298 — skill-creator：eval 可靠性重构
[github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

修复了 `run_eval.py` 始终报告 `recall=0%` 的关键 bug，该问题曾导致技能描述优化循环完全失效。此 PR 将评估产物安装为真正的 skill，并修复了 Windows 流读取、触发器检测和并行 worker 处理。讨论焦点在于让技能评估重新变得可信。

### #514 — document-typography 技能
[github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

提出一个用于生成文档的排版质量控制技能：解决孤词换行、孤行段落和编号错位问题。之所以引发广泛共鸣，是因为这些问题几乎出现在每一份 Claude 生成的文档中。

### #1615 — scnet-hpc 技能
[github.com/anthropics/skills/pull/1615](https://github.com/anthropics/skills/pull/1615)

新增一个通过基于 profile 的 SSH 和 Slurm 工作流操作 SCNet HPC 集群的技能。涵盖分区/内存/模块指导、作业生成、集群发现和计算节点工作流，凸显了科学与 HPC 集成需求的持续增长。

### #538 — pdf 技能：大小写敏感修复
[github.com/anthropics/skills/pull/538](https://github.com/anthropics/skills/pull/538)

修复了 `skills/pdf/SKILL.md` 中 8 处大小写不匹配的文件引用（`REFERENCE.md` → `reference.md`，`FORMS.md` → `forms.md`）。改动虽小，但正确性修复非常显眼，尤其对大小写敏感的文件系统而言。

### #486 — ODT 技能
[github.com/anthropics/skills/pull/486](https://github.com/anthropics/skills/pull/486)

新增 OpenDocument 技能支持：文档创建、模板填充、解析和 ODT 转 HTML。在遇到 ODT/ODS/ODF/OpenDocument/LibreOffice 相关请求时触发，反映出对开源文档格式的强烈需求。

### #210 — frontend-design 技能的清晰度/可执行性
[github.com/anthropics/skills/pull/210](https://github.com/anthropics/skills/pull/210)

修订 frontend-design 技能，使每条指令都能在单次对话中直接执行。讨论重点是如何让技能足够精确地引导 Claude 行为，同时避免过度冗长。

### #83 — skill-quality-analyzer + skill-security-analyzer
[github.com/anthropics/skills/pull/83](https://github.com/anthropics/skills/pull/83)

新增用于评估其他技能的元技能，涵盖结构、文档、示例和安全性四个维度。直接回应了社区对技能可信度与质量保障的担忧。

### #541 — docx 技能：修订模式 `w:id` 冲突修复
[github.com/anthropics/skills/pull/541](https://github.com/anthropics/skills/pull/541)

防止在包含现有书签的文件中添加修订时导致 OOXML 文档损坏。对于安全的 DOCX 操作非常重要，也是社区反复遇到的痛点。

---

## 2. 社区需求趋势

Issue 列表显示了几大需求集中领域：

- **安全与信任边界** — [#492](https://github.com/anthropics/skills/issues/492) 是评论数最多的 issue：在 `anthropic/` 命名空间下分发的社区技能存在信任边界漏洞。相关：[#1175](https://github.com/anthropics/skills/issues/1175) 讨论了技能中 SharePoint 权限处理的问题。

- **企业级/组织级分发** — [#228](https://github.com/anthropics/skills/issues/228) 要求在 Claude.ai 中实现组织级技能共享，而不是手动分享文件。

- **技能评估工具的可靠性** — [#556](https://github.com/anthropics/skills/issues/556) 记录了 `run_eval.py` 0% 触发率的 bug；[#1390](https://github.com/anthropics/skills/issues/1390) 显示 `mcp-builder` 评估器因序列化失败而得到 0/N 的评分。社区正在积极呼吁构建可信的评估框架。

- **用于治理与质量的元技能** — [#412](https://github.com/anthropics/skills/issues/412) 提出了 agent 治理技能；[#1385](https://github.com/anthropics/skills/issues/1385) 提出了推理质量门禁流水线；[#1329](https://github.com/anthropics/skills/issues/1329) 提出了用于符号化 agent 状态的紧凑记忆技能。

- **互操作性** — [#16](https://github.com/anthropics/skills/issues/16) 要求将 Skills 以 MCP 形式暴露；[#29](https://github.com/anthropics/skills/issues/29) 要求支持 Bedrock。

- **文档处理的健壮性** — [#12](https://github.com/anthropics/skills/issues/12) 报告了空白符重排后 DOCX 无法读取的问题；[#189](https://github.com/anthropics/skills/issues/189) 报告了插件包重叠导致技能重复的问题。

---

## 3. 高潜力待合并技能

以下活跃 PR 尚未合并，但根据近期动态和社区兴趣，很可能很快落地。

### #1615 — scnet-hpc
[github.com/anthropics/skills/pull/1615](https://github.com/anthropics/skills/pull/1615) · open · 更新于 2026-08-24

通过 SSH 和 Slurm 进行 HPC 集群运维，是科学计算需求的有力信号。

### #1628 — Hivemind：零成本多智能体编排
[github.com/anthropics/skills/pull/1628](https://github.com/anthropics/skills/pull/1628) · open · 更新于 2026-08-24

将机械性工作委派给运行在免费模型上的无头 opencode worker，同时 Claude Code 继续担任规划者/审查者/合并者。涉及成本优化和多智能体模式。

### #1367 — self-audit 技能
[github.com/anthropics/skills/pull/1367](https://github.com/anthropics/skills/pull/1367) · open · 更新于 2026-07-02

机械化的文件验证加四维推理质量门禁。契合社区对输出验证和质量保障的强烈兴趣。

### #723 — testing-patterns 技能
[github.com/anthropics/skills/pull/723](https://github.com/anthropics/skills/pull/723) · open · 更新于 2026-04-21

全面的测试指导：Testing Trophy 模型、单元测试、React 组件测试和测试哲学。回应了代码质量与测试生成技能的需求。

### #568 — ServiceNow 平台技能
[github.com/anthropics/skills/pull/568](https://github.com/anthropics/skills/pull/568) · open · 更新于 2026-08-12

覆盖 ITSM、ITOM、ITAM/SAM、FSM、HRSD、CSM、SPM、Vulnerability Response 和 IntegrationHub 的综合性 ServiceNow 助手。企业平台技能仍是一个活跃的细分领域。

### #525 — pyxel 复古游戏开发技能
[github.com/anthropics/skills/pull/525](https://github.com/anthropics/skills/pull/525) · open · 更新于 2026-07-15

将 pyxel-mcp 服务器与 Pyxel 复古游戏引擎集成，覆盖编写 → 运行并截图 → 检查 → 迭代的工作流。体现了创意与编码的交汇。

---

## 4. Skills 生态洞察

社区最集中的需求不是某个具体领域的技能，而是**元技能与可靠性基础设施**——安全验证、评估框架、上下文窗口纪律和明确的治理机制——这表明生态系统的下一个瓶颈是技能本身的可信度与可维护性。

---

# Claude Code 社区摘要 — 2026-08-30

## 今日亮点
过去 24 小时内没有新版本发布。问题追踪器中，一个长期存在的模型行为报告达到 147 条评论；与此同时，围绕“Fable 5”的一波重复 AUP/安全误报报告阻碍了正当工作，大多以重复/陈旧为由关闭。只有一个 PR 处于活跃状态：针对 Cowork 队列故障排查的文档修复。

## 版本发布
过去 24 小时内无新版本发布。

## 热门问题

- **[#60705 — 模型行为：/goal 停止钩子指令被引用为未经请求操作的授权](https://github.com/anthropics/claude-code/issues/60705)** · 147 条评论，已关闭。  
  记录了三种反复出现的模型侧行为，用户级 `CLAUDE.md` 规则无法捕获：停止钩子指令被当作宽泛授权、搜索中未出现被当作证据、结构形式胜过实际反驳。其重要性在于，这表明模型行为可以在没有单一明显 bug 的情况下绕过用户护栏。

- **[#68339 — 新项目会话快速累积隐藏工具结果上下文，然后以 ECONNRESET 失败](https://github.com/anthropics/claude-code/issues/68339)** · 7 条评论，已关闭/陈旧。  
  报告称新会话会累积隐藏的工具结果上下文，直到连接重置。这指向了长生命周期会话中真实存在的上下文/元数据开销问题。

- **[#72203 — api_error 后的成功自动重试使助手回合成为孤儿](https://github.com/anthropics/claude-code/issues/72203)** · 3 条评论，已关闭。  
  自动重试后，`stop_hook_summary` 和下一条用户消息被挂到失败的 API 错误节点下，而不是恢复后的回复，破坏了对话连续性。对于依赖重试韧性的用户来说意义重大。

- **AUP 误报集群（例如，[#74440](https://github.com/anthropics/claude-code/issues/74440)、[#74446](https://github.com/anthropics/claude-code/issues/74446)、[#73255](https://github.com/anthropics/claude-code/issues/73255)、[#73261](https://github.com/anthropics/claude-code/issues/73261)）** · 多个 2–3 条评论的报告，全部以重复/陈旧关闭。  
  一种反复出现的“Fable 5”ClAudit/安全过滤器模式会在用户沮丧感叹后阻止已授权的工作。这些报告被分诊为重复，但频率凸显了安全层中严重的误报痛点。

- **[#89447 — macOS 桌面版：每个本地 stdio MCP 服务器都出现“无法为 Cowork 和 Code 会话启动此服务器”](https://github.com/anthropics/claude-code/issues/89447)** · 1 条评论，已关闭。  
  影响桌面应用的回归：启动时对每个本地 stdio MCP 服务器报错，而日志显示从未尝试启动兄弟进程。

- **[#85000 — Claude Code 在 Windows 11 桌面应用和 CLI 中均失败，出现两种不同错误](https://github.com/anthropics/claude-code/issues/85000)** · 1 条评论，打开。  
  阻塞平台的 Windows bug：直接聊天和 `curl` 可用，但 Claude Code 在应用和 CLI 中均失败。对 Windows 用户影响很大。

- **[#74435 — 使用 resumeFromRunId 且不带参数恢复工作流会丢弃原始参数](https://github.com/anthropics/claude-code/issues/74435)** · 1 条评论，已关闭。  
  在不重新传递 `args` 的情况下恢复工作流会丢失原始运行的参数，并在缓存代理重放可用之前退出。这违背了恢复工作流的目的。

- **[#74432 — 从待机唤醒后计划任务被静默跳过](https://github.com/anthropics/claude-code/issues/74432)** · 1 条评论，已关闭。  
  Windows 计划任务在唤醒后被静默丢弃：调度被清除，但 `lastRunAt` 仍保持设置，导致自动化在没有任何可见错误的情况下被错过。

- **[#74433 — /model 因过期的缓存 emergencyTip 而连续多日拒绝可用模型](https://github.com/anthropics/claude-code/issues/74433)** · 1 条评论，已关闭。  
  `~/.claude.json` 中的过期 `emergencyTip` 导致 `/model` 拒绝服务器接受的模型，而错误信息却误导性地归咎于账户权限。

- **[#74309 — 模型将内部任务路由包装器作为其首次回复回显](https://github.com/anthropics/claude-code/issues/74309)** · 1 条评论，已关闭。  
  模型没有回答，而是将内部 `<user_task>` 路由信封打印回给用户。这是模型侧提示卫生失败，泄露了内部结构。

## 关键 PR 进展
过去 24 小时内只有一个 PR 有更新。

- **[#61720 — [docs] 为 Cowork 队列未生成后续回合添加故障排查说明](https://github.com/anthropics/claude-code/pull/61720)** · 打开。  
  为 Cowork 队列 bug 添加文档：在该 bug 中，排队的消息会被送达，但不会生成后续助手回合。文档指出队列回合后处理器与限流处理器之间存在竞争。关闭 #61718。

## 功能请求趋势

- **安全过滤器/AUP 精度** — “Fable 5”反复出现的误报会因用户沮丧情绪语言和加密机密启发式规则而阻止正当工作。开发者希望拥有上下文感知的过滤器，不会因感叹或普通 UI 工作而中断已授权的会话。
- **工具结果透明度和信任** — 对变更类工具调用后强制回读的请求（[#74401](https://github.com/anthropics/claude-code/issues/74401)）以及对隐藏工具结果上下文累积的抱怨（[#68339](https://github.com/anthropics/claude-code/issues/68339)）表明开发者希望获得更清晰、可验证的工具输出。
- **IDE 和状态栏可见性** — 开发者希望状态栏中显示当前工作子文件夹（[#74344](https://github.com/anthropics/claude-code/issues/74344)），并在 VS Code 扩展聊天中看到 MCP 工具名称/参数（[#74345](https://github.com/anthropics/claude-code/issues/74345)）。
- **工作流恢复可靠性** — 要求 `resumeFromRunId` 保留原始参数（[#74435](https://github.com/anthropics/claude-code/issues/74435)），并要求计划任务在待机/唤醒周期后仍然有效（[#74432](https://github.com/anthropics/claude-code/issues/74432)）。

## 开发者痛点

- **AUP/安全误报是主要的信任问题。** 大量重复报告描述了正当工作被会话级阻断，且通常由用户沮丧时的一句话感叹触发。大多数被以重复/陈旧为由关闭，这可能会让受影响的用户感到沮丧。
- **会话/上下文损坏仍然普遍。** 隐藏工具结果上下文增长导致 `ECONNRESET`、自动重试后的孤儿回合，以及捏造的工具结果，都指向上下文管理 bug。
- **模型行为怪癖削弱信心。** 回显内部任务路由包装器、过期的模型选择缓存、意外的模型回退以及重复的填充措辞是反复出现的抱怨。
- **跨平台集成差距持续存在。** Windows 11 失败、Chrome 原生主机启动问题以及 macOS MCP 服务器启动回归表明桌面版/CLI 的对等性仍然脆弱。
- **自动化可靠性很脆弱。** 工作流恢复参数丢失和待机后静默跳过的计划任务对无人值守/CI 使用尤其痛苦。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# Codex 社区摘要 — 2026-08-30

## 今日要点

过去 24 小时内发布了两个基于 Rust 的 Codex alpha 版本，社区关注点仍集中在撤销/回退功能、自动解析控制，以及一波 Windows 桌面端稳定性报告上。多个已合并的 PR 聚焦于 Vim 搜索动作、会话上下文恢复，以及加固诊断报告上传。

## 版本发布

- [rust-v0.152.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.1) — 以 `0.152.0-alpha.1` 发布；发布包中无详细变更日志。
- [rust-v0.151.0-alpha.7.2](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7.2) — 以 `0.151.0-alpha.7.2` 发布；发布包中无详细变更日志。

## 热门议题

- [Issue #9203: 请恢复 "/undo"](https://github.com/openai/codex/issues/9203) — 418 👍，73 条评论。最受欢迎的功能之一。用户希望在更改未提交到 Git 时，有一条可靠的撤销路径来恢复意外删除或修改的文件。
- [Issue #28969: 添加设置以禁用 60 秒后自动解析问题](https://github.com/openai/codex/issues/28969) — 202 👍，84 条评论。用户强烈要求控制自动解析问题的时机，以避免过早或非预期的回答。
- [Issue #41290: 切换到 WSL 代理环境后，Windows/WSL 项目创建和删除失败](https://github.com/openai/codex/issues/41290) — 12 条评论。阻塞了基于 WSL 的用户的核心项目工作流。
- [Issue #41339: AppX 转换后，Windows 启动被待处理的应用内更新策略阻塞 5 分钟以上](https://github.com/openai/codex/issues/41339) — 12 条评论。这是一种更新后状态，可能使桌面应用实际上无法使用。
- [Issue #34971: Codex 在长时间会话中反复重新处理大量缓存上下文](https://github.com/openai/codex/issues/34971) — 12 条评论。被报告为回归问题，导致严重延迟、超时、JSONL 增长和过量额度消耗。
- [Issue #16520: Windows 上 VS Code Codex 聊天中本地文件链接导航不稳定](https://github.com/openai/codex/issues/16520) — 11 条评论，8 👍。本地文件链接有时会在浏览器中打开，而不是 VS Code。
- [Issue #23454: `$skill` 显式调用忽略本地仅显式技能](https://github.com/openai/codex/issues/23454) — 9 条评论。本地技能在技能发现和显式调用方面的行为不一致。
- [Issue #41465: Windows 悬浮宠物保持点击穿透且无法拖动](https://github.com/openai/codex/issues/41465) — 9 条评论。桌面应用 UI/UX 缺陷，但 Windows 桌面问题数量值得关注。
- [Issue #39486: Windows 上浏览器插件无法通过受信任的 RPC 依赖验证](https://github.com/openai/codex/issues/39486) — 9 条评论。阻塞 Codex 应用中浏览器插件的初始化。
- [Issue #40943: Windows Codex Desktop 上 GPT-5.6 失败，报错 "code-mode host exited during handshake"](https://github.com/openai/codex/issues/40943) — 6 条评论。影响 GPT-5.6 Desktop 的模型特定故障，而 GPT-5.5 Desktop 和 GPT-5.6 CLI 仍可正常工作。

## 主要 PR 进展

该时间窗口内仅有 7 个 PR 有更新；以下为全部摘要。

- [PR #41630: 更新默认启用 update_plan 的测试](https://github.com/openai/codex/pull/41630) — 涵盖 `tools.update_plan.enabled` 的默认、显式启用和显式禁用状态，并验证提示工具列表保持一致。
- [PR #41613: 将 Vim 历史测试移入历史搜索模块](https://github.com/openai/codex/pull/41613) — 将 Vim 历史导航测试移至实现旁边，并共享拟人化输入辅助函数。
- [PR #41586: 为 composer 添加 Vim 搜索动作](https://github.com/openai/codex/pull/41586) — 添加 `/` 和 `?` 字面搜索、`n`/`N` 重复导航，以及删除/修改/复制后的操作符支持。
- [PR #41570: 修复主动式多代理指令语法](https://github.com/openai/codex/pull/41570) — 主动式多代理指令的语法清理。
- [PR #41569: 加固诊断报告上传](https://github.com/openai/codex/pull/41569) — 将核心报告事件与附件分离，对附件数据包进行 gzip 压缩，并通过截断处理强制负载大小限制。
- [PR #41567: 从自有设置快照恢复线程 cwd](https://github.com/openai/codex/pull/41567) — 在没有显式 `cwd` 的情况下恢复线程时，现在会恢复最近保留的设置，修复了分叉历史和上下文压缩的边界情况。
- [PR #41562: 在目标延续中保留轮次归属](https://github.com/openai/codex/pull/41562) — 即使外部输入、钩子上下文或目标编辑造成歧义，也能将自动目标延续归属于原始轮次。

## 热门讨论

### 创意

- [Discussion #9200: 添加从 ChatGPT 应用远程控制 Codex 的能力](https://github.com/openai/codex/discussions/9200) — 190 👍，45 条评论。无头/守护进程模式加上移动端远程控制仍然是一个极受欢迎的需求。
- [Discussion #9618: 怎么没有 /rewind 或 /revert 功能？](https://github.com/openai/codex/discussions/9618) — 112 👍，19 条评论。呼应了用户对类似撤销功能的高需求。
- [Discussion #41619: 允许使用 `--resume` 启动命名会话](https://github.com/openai/codex/discussions/41619) — 请求能够以编程方式创建和跟踪新的命名会话。

### 问答

- [Discussion #31522: 切换 Fast Speed 开关是否会使提示词缓存失效？](https://github.com/openai/codex/discussions/31522) — 6 条评论。用户试图了解在会话中途切换 Fast Speed 时缓存行为的变化。
- [Discussion #40385: Windows 上找不到"连接"远程设备选项](https://github.com/openai/codex/discussions/40385) — 1 条评论。用户报告 Windows 上缺少远程连接控件。

### 展示与分享

- [Discussion #41642: Compact Context — Codex 的本地五文件起点地图](https://github.com/openai/codex/discussions/41642) — MIT 许可的本地仓库路由器，在编码轮次前推荐最多五个可能相关的文件。
- [Discussion #41635: Skill Sunset — 用于检测过期 AGENTS.md 规则的本地只读审计工具](https://github.com/openai/codex/discussions/41635) — 用于识别过期、重复或过于宽泛的代理指令规则的工具。
- [Discussion #41555: Codex Command Center — 本地 Windows 工作区](https://github.com/openai/codex/discussions/41555) — 开源的 Windows 优先工作区，用于组织 Codex 项目、任务、会话和 Git。

### 综合

- [Discussion #40707: 5 小时限制回归](https://github.com/openai/codex/discussions/40707) — 用户更倾向于每周使用限制，并对重新引入的更短滚动限制感到失望。
- [Discussion #41623: Codex 遥测大幅低估 Bedrock GPT-5.6 Sol 使用量](https://github.com/openai/codex/discussions/41623) — 社区 bug 报告，要求维护者调查 Bedrock 部署中遥测数据少计的问题。

## 功能需求趋势

- **撤销 / 回退 / 还原**：这是议题和讨论中最强烈的趋势。用户反复要求提供一种一流的恢复方式，以便在文件编辑或删除出错时进行恢复，尤其是在不涉及 Git 的情况下。
- **可禁用的自动行为**：要求提供设置以禁用自动解析计时器和自动对话摘要，表明用户需要对 Codex 的自主行为有更明确的控制。
- **远程控制与移动端连接**：无头/守护进程操作、移动端远程操控以及桌面端与移动端之间的可靠同步仍然是反复出现的需求。
- **会话与上下文管理**：命名会话、带 `cwd` 恢复的会话续接，以及降低上下文重新处理的成本，都是活跃的关注领域。
- **技能生态打磨**：更好的显式技能调用、本地技能可见性，以及审计代理指令的工具，正在成为新出现的主题。

## 开发者痛点

- **Windows 桌面端不稳定问题占主导**：今天的大部分议题都是 Windows 特有的：WSL 项目失败、AppX 更新后启动挂起、Java NIO 回环失败、GPT-5.6 握手失败、悬浮宠物 bug，以及会话中途的致命故障级联。
- **上下文膨胀与性能回退**：长时间会话的上下文重新处理、重图片聊天重连以及提示词缓存失效问题，都指向持续存在的效率问题。
- **无撤销机制的危险状态变更**：反复出现的 `/undo` 需求凸显了未提交工作面临风险的工作流。
- **沙箱与权限不一致**：Landlock 强制执行、Docker 沙箱失败以及 macOS 文稿访问间歇性丢失，持续造成特定环境下的摩擦。
- **远程/移动端同步问题**：远程提示卡住、Android 渲染乱码以及 Windows 上缺少远程连接选项，都损害了移动端工作流。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区文摘 — 2026-08-30

## 1. 今日亮点

一个新的 nightly 版本（`v0.59.0-nightly.20260830`）已发布，不过更新日志中没有任何面向用户的说明。目前最活跃的开发动态是两条新 PR（#29131、#29132），它们修复了一个 CRLF 行尾 bug——在 Windows 上，该问题会导致整个文件的 diff 被倾倒进模型上下文，造成显著的上下文窗口浪费。与此同时，长期存在的 P1 可靠性问题依然备受关注：子代理在触发 `MAX_TURNS` 后误报 `GOAL` 成功（#22323），以及通用代理无限期挂起（#21409）。

## 2. 版本发布

- **[v0.59.0-nightly.20260830.g0bd1d4397](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260829.g0bd1d4397...v0.59.0-nightly.20260830.g0bd1d4397)** — 常规 nightly 构建；除版本号递增外，没有值得关注的更新日志条目。

## 3. 热门问题

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** *(P1，bug，13 条评论)* — 一个 `codebase_investigator` 子代理在尚未执行任何工作之前就触发了轮次上限，却报告 `status: "success"` 且 `Termination Reason: "GOAL"`，从而向用户和下游自动化隐瞒了中断。对于依赖状态真实性的代理工作流来说，误导性的成功信号是危险的。

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** *(P1，bug，8 条评论，8 👍)* — 本周期内社区反响最强烈的 bug：任何转交给通用代理的任务都可能无限期挂起（长达一小时），哪怕是创建文件夹这样的琐碎任务也不例外。用户反馈，唯一有效的变通方案是明确指示模型不要使用子代理。

3. **[#28799 — Interactive TUI renders but never subscribes to stdin](https://github.com/google-gemini/gemini-cli/issues/28799)** *(P1，bug，5 条评论)* — TUI 绘制出了完整界面（横幅、信任对话框、认证选择器），但完全忽略所有键盘输入。这是一个彻底的输入循环故障，导致受影响的用户无法使用 CLI。

4. **[#29130 — getDiffContextSnippet produces full-file diff on CRLF line endings](https://github.com/google-gemini/gemini-cli/issues/29130)** *(bug，2 条评论，今日提交)* — 在 Windows 上，`LF`/`CRLF` 规范化不一致会导致 diff 工具将整个文件输出回模型上下文，而不是一个 5 行片段。这条报告刚提交不久，但已经有两个修复 PR——进展很快，值得关注。

5. **[#25166 — Shell command execution stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** *(P1，bug，4 条评论，3 👍)* — 简单的非交互式 CLI 命令在完成后仍被标记为活动状态并等待输入。该问题出现频率很高，已成为重度 shell 使用场景中反复出现的工作流阻碍。

6. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** *(P1，bug，4 条评论)* — 浏览器代理以 `GOAL` 终止，但在 Wayland 会话中无法正常工作。这是一个平台兼容性缺口，影响使用现代显示服务器的 Linux 用户。

7. **[#19873 — Leverage model's bash affinity via zero-dependency OS sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)** *(P2，enhancement，8 条评论)* — 提议让 Gemini 3 模型在零依赖 OS 沙箱内使用原生 POSIX 工具链（`grep`、`sed`、`awk`），并通过执行后的意图路由来保证安全，同时释放模型原生的 bash 优势。

8. **[#22745 — Assess impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** *(P2，功能 Epic，7 条评论)* — 该 Epic 跟踪 AST 感知工具能否减少 token 噪声、通过一次调用精确读取方法边界，并改进代码库导航。有望显著减少轮次数量和上下文使用量。

9. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** *(P2，bug，6 条评论)* — 虽然只是零散反馈，但引发了广泛共鸣：即使任务描述高度匹配，除非得到明确指示，模型仍会忽略自定义技能和子代理。这表明主动的能力发现机制未被充分利用。

10. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** *(P2，security，5 条评论)* — Auto Memory 会在基于提示词的脱敏执行*之前*就将转录内容发送给提取模型，并且可能记录现有的技能内容。对于持有敏感仓库的用户来说，这是一个隐私/安全隐患。

## 4. 关键 PR 进展

1. **[#29132 — fix(core): normalize line endings in diff context snippets](https://github.com/google-gemini/gemini-cli/pull/29132)** *(S)* — 在计算 diff 上下文之前对 CRLF/CR 进行规范化，并附带针对 CRLF 文件的回归测试。修复 #29130。

2. **[#29131 — fix(core): normalize line endings in getDiffContextSnippet](https://github.com/google-gemini/gemini-cli/pull/29131)** *(S/M)* — 来自问题报告者的竞争性修复方案；两条 PR 针对的是同一个整文件 diff bug——值得关注最终合并的是哪种方案。

3. **[#29110 — fix(core): route read_file content through FileSystemService](https://github.com/google-gemini/gemini-cli/pull/29110)** *(M/L)* — `read_file` 目前绕过了注入的 `FileSystemService`，导致声明支持 `fs: { readTextFile }` 的 ACP 客户端失效。此 PR 将 `read_file` 与 `write_file`/`replace` 对齐，以提供一致的虚拟文件系统支持。

4. **[#29125 — fix(cli): convert hook timeout from seconds to milliseconds in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29125)** *(S)* — 修复 #29122：Claude Code 以秒为单位表示 hook 超时，而 Gemini CLI 以毫秒为单位。迁移逻辑原样复制了数值，导致迁移后的 `"timeout": 30` 配置在 30 ms 后触发，而不是 30 s。

5. **[#29124 — fix(cli): correct SubagentStop event key in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29124)** *(XS)* — 修复 #29123：`EVENT_MAPPING` 使用 `SubAgentStop`（大写 A）作为键，但 Claude Code 发出的是 `SubagentStop`——导致 `gemini hooks migrate` 期间 hook 被静默丢弃。

6. **[#28967 — fix(cli): prevent clearing terminal scrollback on static refresh](https://github.com/google-gemini/gemini-cli/pull/28967)** *(S，P2)* — 处理 #28954：`AppContainer.tsx` 中的 `refreshStatic()` 调用了 `ansiEscapes.clearTerminal`，在非备用缓冲区模式下会清空 Linux/Unix 模拟器上的回滚缓冲区。

7. **[#28960 — fix(auth): remove trailing period from displayed Antigravity URL](https://github.com/google-gemini/gemini-cli/pull/28960)** *(M，P1)* — 显示的 Antigravity URL 末尾包含一个句点，用户可能将其一并复制进浏览器，从而破坏 OAuth 流程。改动虽小，但对新用户上手影响重大。

8. **[#28968 — fix(core): dedupe symlinked/junctioned skills directories during discovery](https://github.com/google-gemini/gemini-cli/pull/28968)** *(M，P3)* — 修复 #28944：当 `.gemini` 通过符号链接/目录联接指向 `.agents` 以实现跨工具技能兼容时，CLI 会同时扫描两条路径并重复加载技能，导致冲突。

9. **[#28966 — docs(extensions): correct excludeTools examples that never match](https://github.com/google-gemini/gemini-cli/pull/28966)** *(S，P1)* — `excludeTools` 匹配的是精确的工具名，因此像 `run_shell_command(rm -rf *)` 这样的示例实际上从未排除过任何内容。文档已更新为使用裸工具名，并将命令级拦截指向策略引擎。

10. **[#28828 — fix(core): warn when a preview model is silently substituted](https://github.com/google-gemini/gemini-cli/pull/28828)** *(M，P1，closed)* — 修复 #28825：在没有预览权限的情况下请求 `gemini-3.1-pro-preview`，会被静默改写为 `auto-gemini-2.5`，且没有任何提示。该 PR 已关闭，但值得关注——对静默模型替换发出警告对于结果的可复现性至关重要。

## 5. 热门讨论

本期摘要未提供讨论数据。

## 6. 功能需求趋势

- **子代理的透明度与控制** — 最强烈且反复出现的主题：通过 `/chat share` 分享子代理轨迹（#22598），在 `/bug` 报告中包含子代理上下文（#21763），提升代理对 CLI 标志和热键的“自我感知”能力（#21432），以及让代理主动使用可用的技能/子代理（#21968）。
- **AST 感知的代码智能** — 多个关联条目（#22745、#22746）共同推动 AST 感知的文件读取、搜索和代码库映射，以削减 token 浪费并提升导航精度。
- **沙箱与更安全的执行** — 对零依赖 OS 沙箱（#19873）以及 `git reset --force` 等破坏性命令防护措施（#22672）的需求，反映出用户对更安全的自主运行的期望。
- **浏览器代理加固** — 自动会话接管、锁恢复（#22232）以及尊重 `settings.json` 覆盖配置（#22267）等韧性特性表明，浏览器代理正在走向成熟，但仍显脆弱。
- **记忆系统质量** — 一组 Auto Memory 问题（#26522、#26523、#26516）聚焦于无效补丁隔离、低信号重试循环和确定性的敏感信息脱敏。

## 7. 开发者痛点

- **不可靠的挂起问题** — 反复出现的 P1 卡顿：通用代理挂起（#21409）、TUI 忽略 stdin（#28799）、shell 命令卡在“Waiting input”（#25166），以及生成应用脚手架时交互式提示挂起（#22465）。这些问题阻塞了日常核心工作流。
- **误导性的代理状态报告** — MAX_TURNS 中断被报告为 GOAL 成功（#22323），以及预览模型被静默替换（#28828），都在侵蚀用户对代理输出和自动化的信任。
- **Windows/CRLF 摩擦** — CRLF diff bug（#29130）凸显了长期存在的跨平台文件处理问题，既浪费上下文，又让编辑 diff 变得难以理解。
- **从 Claude Code 迁移** — Hook 迁移 bug（超时单位 #29125、事件键大小写 #29124）表明，对于 Claude Code 前用户来说，迁移路径仍有不少粗糙之处。
- **杂乱的工作区副作用** — 模型创建零散的 `tmp` 脚本（#23571），偶尔还会执行破坏性的 git/db 命令（#22672），让清理和安全成为反复出现的顾虑。
- **限制冲突** — 工具数量超过约 128 个时出现 400 错误（#24246），符号链接的代理/技能无法被识别（#20079、#28968），这些都为高级用户增加了配置摩擦。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-08-30

## 今日亮点

GitHub 发布了 Copilot CLI v1.0.82 和 v1.0.82-2，修复了计划审批卡片展开、worktree 准备期间的输入处理问题，并让认证错误显示更详细的信息。与此同时，社区反馈了多个影响较大的回归问题和故障模式：v1.0.81 破坏了 chroma-mcp 和 Azure DevOps OAuth 等 MCP 服务器；会话/压缩（compaction）问题导致重复的计费重试、重复的 `sessionStart` 上下文以及 OOM 崩溃。本批问题中获赞最多的未解决问题仍然是代码编辑期间反复出现的 `Tool 'str_replace' does not exist` 错误。

## 版本发布

- [v1.0.82](https://github.com/github/copilot-cli/releases/tag/v1.0.82) — 2026-08-29
  - 修复：在 `/worktree` 或 `/move` 正在准备 worktree 时输入的消息不再导致切换进入 worktree 失败。
  - 修复：`Ctrl+E` 再次展开计划审批卡片以显示完整计划。
  - 修复：显示具体的认证失败原因（例如 `401 Bad credentials`），而不仅仅是 `/login` 提示。

- [v1.0.82-2](https://github.com/github/copilot-cli/releases/tag/v1.0.82-2) — 2026-08-29
  - 修复：worktree 准备期间的输入处理问题。
  - 修复：`Ctrl+E` 计划审批卡片展开问题。

## 热门问题

- [#4027](https://github.com/github/copilot-cli/issues/4027) — **工具 'str_replace' 不存在。**  
  本轮更新中获赞最多的未解决问题，共 13 👍。Copilot 在编辑 Java 文件时频繁尝试使用 `str_replace`，然后回退到其他编辑工具，导致编辑过程充满干扰且可能不可靠。

- [#4647](https://github.com/github/copilot-cli/issues/4647) — **v1.0.81 破坏了与 chroma-mcp 的兼容性。**  
  版本回归导致通过 `mcp-config.json` 配置的 MCP 服务器无法工作。这凸显了 CLI 各版本之间 MCP 集成的脆弱性，影响了依赖自定义 MCP 工具的用户。

- [#4663](https://github.com/github/copilot-cli/issues/4663) — **失败的压缩在每一轮都被原样重试。**  
  当压缩失败时，CLI 会在后续每一轮重新发起相同的完整模型调用，没有退避或回退机制，导致无上限的计费重试和上下文持续膨胀。刚提交，尚无评论，但对受影响用户来说可能代价高昂。

- [#4664](https://github.com/github/copilot-cli/issues/4664) — **恢复长会话时 CLI 因 JavaScript 堆内存 OOM 崩溃。**  
  存在时间较长的会话可能无法恢复，因为 CLI 会在用户继续操作之前崩溃。这对依赖持久会话的用户来说是一个严重的稳定性问题。

- [#4665](https://github.com/github/copilot-cli/issues/4665) — **`sessionStart` 的 additionalContext 在每一轮重复出现并被传递给子代理。**  
  注入的钩子上下文会在每次提示词之前重复出现，并被转发给子代理，导致 token 消耗膨胀，并可能混淆模型行为。

- [#4660](https://github.com/github/copilot-cli/issues/4660) — **远程 ADO MCP 服务器在 v1.0.81 的 WAM 实现中 OAuth 认证失败。**  
  Azure DevOps 远程 MCP 服务器报错“requires authentication”，`/mcp auth` 报告“Authentication Failed”。这阻碍了企业用户使用受 OAuth 保护的 MCP 服务器。

- [#4655](https://github.com/github/copilot-cli/issues/4655) — **Agent Plugins 1.0 的自定义代理未被发现。**  
  包含技能和 MCP 服务器的插件可以正常工作，但 `com.github.copilot/agents` 下的自定义代理无法被识别。这阻碍了 Copilot CLI 的 Agent Plugins 生态系统。

- [#3978](https://github.com/github/copilot-cli/issues/3978) — **切换到 BYOK 后 Copilot CLI 回退到之前的模型。**  
  当用户用尽 AIC 积分并通过 BYOK 继续使用时，CLI 会回退到之前的模型。这导致意外的模型行为和潜在的成本问题。目前有 2 👍 和一条评论。

- [#2955](https://github.com/github/copilot-cli/issues/2955) — **`/allow-all` 无法抑制 bash 工具执行提示。**  
  即使使用 `/allow-all` 之后，Copilot 仍会为 shell 命令显示权限对话框。这破坏了信任设置的有效性，并阻塞了自动化工作流。

- [#4553](https://github.com/github/copilot-cli/issues/4553) — **JSON 包装错误导致无限循环和 `apply_patch` 失败。**  
  在文件编辑任务中，Copilot 反复重试同一份格式错误的 JSON 包装补丁，导致任务挂起或无法推进。

## 关键 PR 进展

过去 24 小时内只有一个 PR 有更新。

- [#2381](https://github.com/github/copilot-cli/pull/2381) — **install: 为 PATH 配置添加 fish shell 支持** *（已关闭）*  
  Fish shell 用户会落入兜底的 shell 配置文件检测逻辑，该逻辑会向 `~/.profile` 写入 POSIX `export` 语法。Fish 不会加载 `~/.profile`，并且将 `PATH` 当作数组使用，因此安装后的 CLI 实际上无法使用。此 PR 添加了正确的 fish shell 检测和 PATH 配置支持。

## 功能请求趋势

根据问题数据推导；未提供讨论数据。

- **将 `.agents` 发现扩展到 Git 仓库之外**  
  用户希望在任何已打开的文件夹中按照 `.agents` 约定发现指令、代理和钩子，而不仅仅是仓库。相关：[#4204](https://github.com/github/copilot-cli/issues/4204)、[#4655](https://github.com/github/copilot-cli/issues/4655)。

- **在底部状态栏中更透明地显示账户身份**  
  有请求希望在底部状态栏的所有账户身份中显示 GitHub 主机名，包括 GitHub.com 账户和通过 `gh` 加载的身份。参见 [#4666](https://github.com/github/copilot-cli/issues/4666)。

- **MCP 认证和兼容性加固**  
  用户希望获得可靠的 OAuth 流程、更好的 issuer URL 发现机制，以及更少的跨版本回归。相关：[#4647](https://github.com/github/copilot-cli/issues/4647)、[#4660](https://github.com/github/copilot-cli/issues/4660)、[#4662](https://github.com/github/copilot-cli/issues/4662)。

- **会话生命周期和上下文管理改进**  
  用户对更安全的压缩重试、可恢复的长会话、不重复的 `sessionStart` 上下文以及持久的 BYOK 模型选择有强烈需求。相关：[#4663](https://github.com/github/copilot-cli/issues/4663)、[#4664](https://github.com/github/copilot-cli/issues/4664)、[#4665](https://github.com/github/copilot-cli/issues/4665)、[#3978](https://github.com/github/copilot-cli/issues/3978)。

- **终端渲染和交互修复**  
  持续有请求要求可靠地滚动长输出、在 Windows `cmd` 中保持一致的提示框布局，以及持久化 thinking-effort 设置。相关：[#2369](https://github.com/github/copilot-cli/issues/2369)、[#3797](https://github.com/github/copilot-cli/issues/3797)、[#2851](https://github.com/github/copilot-cli/issues/2851)。

## 开发者痛点

- **MCP 集成很脆弱。**  
  v1.0.81 的回归问题破坏了 chroma-mcp 和 Azure DevOps OAuth MCP 服务器，并且对于带有路径段的 issuer URL，OAuth 元数据发现会失败。参见 [#4647](https://github.com/github/copilot-cli/issues/4647)、[#4660](https://github.com/github/copilot-cli/issues/4660)、[#4662](https://github.com/github/copilot-cli/issues/4662)。

- **压缩/会话故障可能代价高昂。**  
  失败的压缩在每一轮都会作为完整的计费调用被重试，长会话可能因堆内存 OOM 崩溃，`sessionStart` 上下文被重复，且 BYOK 模型选择不会持久保留。参见 [#4663](https://github.com/github/copilot-cli/issues/4663)、[#4664](https://github.com/github/copilot-cli/issues/4664)、[#4665](https://github.com/github/copilot-cli/issues/4665)、[#3978](https://github.com/github/copilot-cli/issues/3978)。

- **权限控制未被完全落实。**  
  `/allow-all` 仍然会触发 bash 工具执行提示，降低了用户对权限系统的信任。参见 [#2955](https://github.com/github/copilot-cli/issues/2955)。

- **代码编辑循环阻塞任务完成。**  
  `str_replace` 工具缺失以及 `apply_patch` 的 JSON 包装错误可能导致文件编辑期间出现反复的重试循环。参见 [#4027](https://github.com/github/copilot-cli/issues/4027)、[#4553](https://github.com/github/copilot-cli/issues/4553)。

- **Windows 和终端 UX 差距仍然存在。**  
  滚动长输出、`cmd` 标签页之间不一致的提示框布局，以及 thinking-effort 设置消失，对 Windows 用户来说仍然令人沮丧。参见 [#2369](https://github.com/github/copilot-cli/issues/2369)、[#3797](https://github.com/github/copilot-cli/issues/3797)、[#2851](https://github.com/github/copilot-cli/issues/2851)。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-08-30

## 今日亮点

过去 24 小时没有发布新版本，但社区和贡献者的工作集中在性能、上下文效率以及 TUI/插件扩展性上。多个 PR 已合并，用于修复 CPU/进程暴涨问题（`ProjectCopy.refresh`、FFF 初始化、MCP 子进程共享）；而反复出现的问题则凸显了上下文重复（`AGENTS.md`、system-reminders）、自动压缩丢失任务状态，以及付费账户仍然触发免费额度限制错误。

## 热门 Issue

1. [OpenCode 严重受 CPU 限制](https://github.com/anomalyco/opencode/issues/21470) — 16 条评论，17 👍  
   社区报告称，在使用 Gemini-3.1 时，会话的大部分时间耗在 OpenCode 自身，而非等待模型/工具调用。在 300k token、花费 $8.30 时观察到该现象。这是长会话的主要性能瓶颈。

2. [来自 Xcode 27 beta 2 的 opencode ACP 忽略 opencode.json 或 TUI 中选择的模型](https://github.com/anomalyco/opencode/issues/34743) — 16 条评论  
   Xcode/macOS 用户即使 `opencode.json` 指向 LMStudio/Ollama，仍被锁定使用默认的 `big-pickle` 模型。对 Apple 开发者来说是一个严重的集成缺陷。

3. [serve (1.18.25)：web 客户端重连时 MCP 子进程不断累积，直至服务器 OOM](https://github.com/anomalyco/opencode/issues/46035) — 5 条评论  
   长时间运行的 `opencode serve` 实例在 web 客户端重连时会泄漏 MCP 子进程；在 5 个 MCP 服务器和多个标签页的情况下，服务器最终会 OOM。这对 headless/systemd 部署是严重的可靠性问题。

4. [AGENTS.md 在每次工具结果的 `<system-reminder>` 中都被完整重新注入](https://github.com/anomalyco/opencode/issues/46208) — 2 条评论  
   用户报告每次工具结果都会追加完整的 `AGENTS.md`，由于 LLM 上下文是累积的，等于占用了 N 份上下文。这是影响很大的上下文浪费缺陷。

5. [system-reminder 无控制地重复，直至出现数百/数千个相同副本](https://github.com/anomalyco/opencode/issues/46217) — 2 条评论  
   诸如“模型不支持图像输入”之类的系统提醒被重复注入，且没有去重，导致上下文质量下降。这属于更大的上下文膨胀问题范畴。

6. [[URGENT] Zen 付费余额仍然触发 FreeUsageLimitError / 每日免费使用限制](https://github.com/anomalyco/opencode/issues/33318) — 11 条评论，1 👍  
   拥有付费 Zen 余额的用户在开始使用不到一个小时后仍被免费使用限制挡住。这是计费/额度状态缺陷，造成明显的不便。

7. [[FEATURE] 允许插件拦截斜杠命令并直接返回结果（跳过 LLM），同时支持注册自定义对话框](https://github.com/anomalyco/opencode/issues/28292) — 10 条评论，2 👍  
   这是一个呼声很高的插件需求：确定性的斜杠命令应该能够完全绕过 LLM 并直接提供结果，同时支持自定义对话框。

8. [自动压缩后，agent 未经确认继续思考/行动，并丢失了原始任务目标](https://github.com/anomalyco/opencode/issues/41358) — 5 条评论  
   Windows Desktop 长会话：自动压缩后立即继续而不进行确认，且 agent 忘记原始目标。这是严重的 UX 回归。

9. [Desktop：对话在“思考”过程中冻结，无错误提示，必须中止并重新发送——缺少看门狗/重试 UX](https://github.com/anomalyco/opencode/issues/41365) — 6 条评论  
   Windows 桌面应用在模型输出大量推理内容时无限卡住；没有看门狗、没有超时、没有重试路径。

10. [subagent：mimo-v2.5 陷入无限思考循环（消耗额度）](https://github.com/anomalyco/opencode/issues/42923) — 4 条评论，1 👍  
    Mimo-v2.5 作为 subagent 时会永远输出相同的思考内容，既不报错也不超时，并持续消耗额度。这既是模型兼容性缺陷，也是成本安全漏洞。

## 关键 PR 进展

1. [fix(core)：限制 ProjectCopy.refresh 的并发，并为无变更场景增加快速路径（修复 #37793）](https://github.com/anomalyco/opencode/pull/46214)  
   阻止 `ProjectCopy.refresh` 期间无限制的 stat/realpath 调用和 git 子进程启动；直接解决大型仓库上的 CPU 抖动问题。

2. [fix(core)：延迟 FFF 初始化，避免阻塞冷位置获取（修复 #37794）](https://github.com/anomalyco/opencode/pull/46211)  
   将同步的 Fast File Finder 文件系统扫描移出 `Instance.layer` 构造过程，避免在大型 monorepo 上出现 50 秒以上的冷启动卡顿。

3. [fix(mcp)：在不同 Locations 之间共享相同的 MCP 子进程（修复 #37844）](https://github.com/anomalyco/opencode/pull/46210)  
   对不同位置（Locations）的用户全局 MCP 子进程去重：5 个 Locations × 3 个 MCP 服务器现在只启动 3 个子进程，而不是 15 个。

4. [feat(tui)：新增提示词转换协调器（属于 #38962 的一部分）](https://github.com/anomalyco/opencode/pull/46233)  
   新增一个由宿主拥有的协调器，用于可组合的提示词转换，为 TUI 插件读取/驱动提示词铺平道路。

5. [feat(app)：使提示词提交和换行快捷键可配置](https://github.com/anomalyco/opencode/pull/43128)  
   现在可以通过 V2 App 中现有的 Keyboard Shortcuts 设置来配置提示词提交/换行快捷键。

6. [fix(plugin)：拒绝无效的工具参数](https://github.com/anomalyco/opencode/pull/46238)  
   自定义工具参数定义如果不是 Zod schema，现在会被拒绝并给出清晰的标识性错误，而不是在之后才失败。

7. [fix(app)：将服务器凭据编码为 UTF-8](https://github.com/anomalyco/opencode/pull/46225)  
   修复 `btoa()` 对非 ASCII `username:password` 凭据处理不当的问题，用于应用服务器认证。

8. [feat(opencode)：允许按 MCP 服务器配置信任](https://github.com/anomalyco/opencode/pull/40125)  
   为每个 MCP 服务器增加指纹固定和 `caFile` 支持，避免为自签名证书设置全局 `insecure: true`。

9. [fix(console)：保留用量重置边界](https://github.com/anomalyco/opencode/pull/44729)  
   修复固定窗口用量计数器回退、或接受上一周期延迟写入的问题。

10. [feat(tui)：为思考块增加 off 模式](https://github.com/anomalyco/opencode/pull/46234)  
    扩展 `/thinking` 命令，使其在 `show -> hide -> off` 之间循环，让用户可以选择不显示持久化的思考块。

## 功能需求趋势

- **TUI/插件扩展性** — 插件拦截斜杠命令、跳过 LLM、注册自定义对话框、读取/驱动提示词，以及添加实时 subagents 等 UI 区域的需求强烈（例如 #28292、#38962、#41249、#46233）。
- **上下文与压缩控制** — 用户希望获得按模型设置的压缩阈值、压缩模型覆盖、自动压缩前后的确认，以及对重复注入的 `AGENTS.md`/system-reminder 进行去重（#43703、#44094、#41358、#46208、#46217）。
- **会话隔离与历史记录搜索** — 用户提出了会话级终端、跨会话消息历史搜索，以及同一项目目录下并行会话更好处理的需求（#43758、#41354、#28249）。
- **认证与提供商可配置性** — 包括 ACP/Xcode 模型选择、按 MCP 服务器信任配置、原生提供商登录（Fireworks），以及区域感知的模型可用性（#34743、#40125、#46223、#46228）。

## 开发者痛点

- **性能与进程泄漏** — CPU 密集型本地处理、无限制的 `ProjectCopy.refresh` 并发、阻塞式 FFF 扫描，以及 MCP 子进程累积导致 OOM。
- **上下文膨胀与任务丢失** — 每次工具结果都完整重新注入 `AGENTS.md`、system-reminder 重复、自动压缩后忘记原始目标，以及无法搜索历史对话。
- **Desktop/TUI 可靠性** — 思考过程中冻结、缺少看门狗/重试 UX、TreeSitter/UI 层崩溃，以及位置不可用时会话恢复能力不足。
- **计费与认证摩擦** — 付费 Zen 余额仍触发免费使用限制、API 推理被 401 `INFERENCE_ACCESS_BLOCKED` 阻止、API 密钥无效报告，以及通过 VPN 轮换滥用免费套餐。
- **模型特定故障** — 最新模型缺少视觉支持、subagent 陷入无限推理循环，以及区域/可选模型不可用错误。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Pi 社区摘要 — 2026-08-30

### 1. 今日亮点

社区活动主要围绕 TUI 渲染、上下文/缓存行为以及 Windows 特定工具执行的回归报告，同时新增 PR 添加了浏览器 GUI 和腾讯 provider。参与度最高的问题仍然是长时间工具输出后流式传输期间 TUI 行损坏（#8584），而一个代价高昂的 Anthropic prompt-cache bug（#8849）突显了人们对长会话开销的持续担忧。

### 2. 版本发布

过去 24 小时内没有新版本发布。

### 3. 热门问题

1. **[#8584 流式传输期间 TUI 行损坏](https://github.com/earendil-works/pi/issues/8584)** — 25 条评论，9 👍  
   助手文本在长工具输出后每个单词单独一行渲染。社区参与度高表明这是一个常见的工作流阻断问题，可能是 TUI 在宽输出后出现宽度/状态计算错误。

2. **[#7730 Mac OS 长会话 CPU 占用高](https://github.com/earendil-works/pi/issues/7730)** — 13 条评论，9 👍  
   长会话中 CPU 波动 50–110%，内存占用 600–800MB。有传闻与上下文大小相关；仍未关闭，没有确认的修复。

3. **[#3200 在 prompt 命令中支持视频/音频内容](https://github.com/earendil-works/pi/issues/3200)** — 10 条评论，6 👍  
   请求扩展 `prompt` RPC，使其除图片外还能接受视频/音频，以支持多模态模型。这是一个长期的功能请求（自四月起），持续受到关注。

4. **[#8061 上下文预算忽略 maxTokens 输出预留](https://github.com/earendil-works/pi/issues/8061)** — 3 条评论，2 👍  
   由于未计入输出预留，provider 在输入使用率达到 78% 时拒绝请求；压缩并重试的路径也会失败。这突显了上下文管理中的一个关键边界情况。

5. **[#8849 Anthropic: prompt cache 从不读回 transcript](https://github.com/earendil-works/pi/issues/8849)** — 2 条评论  
   `cacheRead` 在 system+tools 处趋于平缓，而 `cacheWrite` 每轮都在增长——长会话的成本远超预期。对于重度使用 Anthropic 的用户来说很重要。

6. **[#8843 惰性会话恢复：大会话在首次提示前需要约 10 秒](https://github.com/earendil-works/pi/issues/8843)** — 1 条评论  
   冷启动会解析整个 JSONL，使得恢复时间与会话大小呈线性关系。建议的惰性解析将显著改善大会话的体验。

7. **[#8848 SessionManager 没有并发写入者的锁/检测机制](https://github.com/earendil-works/pi/issues/8848)** — 1 条评论  
   两个独立的 `pi` 进程可以同时追加到同一个 `.jsonl`，存在损坏风险。这属于持久化层面的问题，可能影响任何运行并行 agent 的用户。

8. **[#8845 分支摘要必然失败](https://github.com/earendil-works/pi/issues/8845)** — 1 条评论  
   `/tree` 摘要硬编码了 `maxTokens: 2048`，因此大分支总是因“generation hit the token cap”而失败。修复简单，但对可靠性影响很大。

9. **[#8847 TUI 崩溃：git diff 摘要页脚未截断](https://github.com/earendil-works/pi/issues/8847)** — 1 条评论  
   在宽度 ≤33 列的终端中恢复时会崩溃，报错 “Rendered line 8372 exceeds terminal width”。这是一个窄终端边界情况，应该可以通过快速截断修复。

10. **[#8753 reasoning_details 回显导致 Venice GLM 推理退化](https://github.com/earendil-works/pi/issues/8753)** — 3 条评论  
    0.84.3 中的回归：回显 `reasoning_details` 会导致 Venice 上工具循环中的确定性推理退化。突显了 provider 特定推理字段的风险。

### 4. 关键 PR 进展

1. **[#8840 feat: 支持完整 TUI 对等的 pi 网页 GUI](https://github.com/earendil-works/pi/pull/8840)**  
   新增 `pi web`：一个基于 token 鉴权的本地 HTTP + WebSocket 服务器，提供与 TUI 功能对等的浏览器 GUI，构建在同一个 `AgentSessionRuntime` 之上。

2. **[#8844 feat(ai): 新增腾讯 Token Plan Individual provider](https://github.com/earendil-works/pi/pull/8844)**  
   新增 provider，通过 `TENCENT_TOKEN_PLAN_API_KEY` 支持 tc-code-latest、DeepSeek v4 变体、GLM-5.2 和 MiniMax M2.7。由于 GLM-5/5.1 仅支持推理开关行为，因此未包含。

3. **[#8635 fix(ai): 在惰性设置期间保留中止的停止原因](https://github.com/earendil-works/pi/pull/8635)**  
   在惰性流设置包装器中传递中止信号，当信号已中止时将设置失败报告为中止。包含工具执行期间中止的回归测试。

4. **[#8262 feat(coding-agent): 在每条 turn-start 路径上分发 hook](https://github.com/earendil-works/pi/pull/8262)**  
   修复 `sendCustomMessage(triggerTurn: true)` 绕过 `input` hook 和 `before_agent_start` 的问题；新增可取消的 turn 预检。

5. **[#8828 fix(tui): 检测 Zed 终端能力](https://github.com/earendil-works/pi/pull/8828)**  
   将 Zed 添加为基于 Alacritty 的终端（支持超链接、真彩色，不支持图片），并记录了默认 Pi 热键设置。

6. **[#8112 fix(coding-agent): 在 jiti 导入前对扩展条目执行 realpath](https://github.com/earendil-works/pi/pull/8112)**  
   解决 #8092：在 jiti 导入前对扩展条目执行 realpath，以便 pnpm 的符号链接 `node_modules` 布局能正确解析。

7. **[#8232 不要合并：dev 分支](https://github.com/earendil-works/pi/pull/8232)**  
   用于 CI 和评论的开放 dev 分支；不打算合并。

### 5. 热门讨论

未提供讨论数据——已省略。

### 6. 功能请求趋势

- **Provider 生态扩展**：多个请求希望新增内置 provider（Tencent、Command Code、DeepSeek `/responses`），表明用户需要无需第三方插件即可访问更广泛的模型。
- **多模态输入支持**：在现有图片支持的基础上，`prompt` 中加入视频/音频（#3200）表明 agent 需要更丰富的观察能力。
- **状态隔离与命名空间管理**：`--profile` 隔离（#3966）和 skills 可选包命名空间（#8834）的提案表明需要更好的多项目/多环境分离。
- **扩展 API 健壮性**：请求技能可见性控制（#8533）、重载时生命周期正确性（#8832），以及在压缩期间排队而不是抛出异常（#8435）。
- **性能与启动优化**：惰性会话恢复（#8843）、上下文预算修复（#8061）和 prompt-cache 正确性（#8849）都是为了降低长会话成本并加快速度。

### 7. 开发者痛点

- **TUI 渲染与终端兼容性**：工具输出后的行损坏（#8584）、窄终端崩溃（#8847）、硬编码的 ANSI 重置忽略 `NO_COLOR`（#8825），以及不一致的屏幕阅读器行为（#8831）。
- **Windows 特定问题**：生成原生子进程时 conhost 窗口闪烁（#8846）、PowerShell 5.1 stderr 被错误分类为失败（#8842），以及 Git Bash 与控制台分离的问题。
- **会话/上下文管理**：长会话中 CPU 占用高（#7730）、会话文件缺少并发锁（#8848），以及大会话恢复缓慢（#8843）。
- **缓存与成本意外**：Anthropic prompt cache 从不读回 transcript（#8849）、GPT 5.6 缓存未到 TTL 就 miss（#8463），以及 Venice 上 reasoning echo 回归（#8753）。
- **扩展加载与生命周期摩擦**：realpath/符号链接解析问题（#8112）、编译后二进制中 graceful-fs 解析失败（#8850），以及重载时跳过生命周期 hook（#8832）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区文摘 — 2026-08-30

## 今日亮点

社区的注意力集中在两个回归问题上：长期存在的流式空闲超时（#5975），以及 v0.22.3 中新出现的 llama.cpp 语法错误 `400 Failed to initialize samplers`（#10520, #10530）。与此同时，来自 PR #9811 评审周期的一大批 WebShell 错误修复已经落地，多智能体路线图也取得进展，跨会话消息传递提案（#8724）现已标记为进行中。

## 热门议题

- **[#5975 — API 错误：19 个块之后 120000ms 无流活动](https://github.com/QwenLM/qwen-code/issues/5975)** — 本期评论最多的议题（14 条评论）。自 v0.19.3 起，会话在 "Thought" 块之后停滞，无任何输出，直至超时触发。该问题仍处于开放状态，直接影响日常智能体使用；自动重试缓解方案现作为 PR #10347 进行评审。

- **[#8724 — 跨会话消息传递](https://github.com/QwenLM/qwen-code/issues/8724)** — 功能提案，已有 12 条评论，现已在多智能体路线图上标记为 `status/in-progress`。希望同一台机器上的会话能够相互发现（`list_agents`），并通过 fail-closed 门控交换定向消息。社区对多智能体编排表现出浓厚兴趣。

- **[#10520 — toolSearch 阈值 > 0 导致带有 MCP 工具的 llama.cpp 失败](https://github.com/QwenLM/qwen-code/issues/10520)** — 将 `tools.toolSearch.threshold` 设置为 `10` 会导致每个请求在生成之前因语法解析 400 而失败；阈值为 0 时正常。影响本地 MCP 服务器用户，并已标记为 `ready-for-human`。

- **[#10530 — 0.22.3 中 Qwen 模型在 llama-server 上出现 400 采样器失败](https://github.com/QwenLM/qwen-code/issues/10530)** — 同样的 "failed to parse grammar" 错误，被独立报告。作者指出 0.21.x 正常，gemma4-12b 正常，Pi/OpenCode 不受影响——指向 0.22.3 中引入的 Qwen 特定语法生成回归。

- **[#8172 — Agent Team 消息在整个多工具调用回合中排队](https://github.com/QwenLM/qwen-code/issues/8172)** — 队友到队长的消息仅在 `streamingState === Idle` 时投递，因此它们可能等待远超当前响应的时间。这是 Agent Team 功能的一个重要 UX 缺口。

- **[#9434 — PreToolUse `ask` 返回不显示差异](https://github.com/QwenLM/qwen-code/issues/9434)** — 将 Edit/WriteFile 决策升级给人工的钩子在确认时不显示差异，即使 `allow` 路径正常。对于将钩子用作策略/审批层的团队来说，这是一个阻塞问题。

- **[#10538 — Computer Use 驱动在 Windows x64 上崩溃](https://github.com/QwenLM/qwen-code/issues/10538)** — `@qwen-code/cua-sdk@0.20.0` 便携式驱动在 Windows 11 上每次创建嵌入式运行时都会 panic；社区报告后已标记为 `status/need-retesting`。对于使用 CUA SDK 的 Windows 用户来说，这是一个平台级阻塞问题。

- **[#10401 — 信任无令牌回环以获得完整操作员 API 访问](https://github.com/QwenLM/qwen-code/issues/10401)** — 提议让 `qwen serve` 本地守护进程的语义保持一致：目前非严格路由无需令牌即可工作，而严格操作员路由返回 `401 token_required`。一个务实的认证简化想法，讨论活跃（`need-discussion`）。

- **[#10184 — 运行时添加的模型在守护进程重启前无法设为当前模型](https://github.com/QwenLM/qwen-code/issues/10184)** — 通过 Web Shell 设置添加的模型会立即显示，但 "Set as current" 会失败并提示 `Invalid params: Unknown model`，直到重启。守护进程模式下的会话/模型切换状态错误。

- **[#10248 — 钉钉频道消息出现在 Tasks 而不是 Channels 下](https://github.com/QwenLM/qwen-code/issues/10248)** — 传入的钉钉消息绕过 Channels 选项卡，被错误地路由到 Tasks。这是 web-shell 内部试用环境中一个明显的集成回归。

## 关键 PR 进展

- **[#10347 — 在 Ctrl+Y 不可用时自动重试瞬时网络错误](https://github.com/QwenLM/qwen-code/pull/10347)** — 将包装的底层 EOF/对端关闭错误视为可重试的传输错误，从而使现有的有界自动重试机制生效。这是对 #5975 这类流式失败问题的直接缓解。

- **[#10410 — 为延迟工具保留提示缓存](https://github.com/QwenLM/qwen-code/pull/10410)** — 用稳定的两步 `tool_search` / `tool_call` 桥接取代延迟工具的模式揭示，让模型能够审查延迟工具的模式，而不会破坏已声明的工具列表或提示缓存。

- **[#10427 — 关闭钩子执行中的四个信任边界漏洞](https://github.com/QwenLM/qwen-code/pull/10427)** — 以安全为重点重新打开 #8396：HTTP 钩子不再跟随重定向，另有三个修复涉及仓库控制的配置与代码执行或网络出口相遇的场景。

- **[#10090 — 拒绝有歧义的 send_message 目标](https://github.com/QwenLM/qwen-code/pull/10090)** — 当一次调用同时提供队友名称和后台任务 ID 时，该工具现在会显式报错，而不是静默地按任务 ID 路由并丢弃队友目标。

- **[#10283 — 通过 `general.outputStyle` 或 `--output-style` 选择输出风格](https://github.com/QwenLM/qwen-code/pull/10283)** — 添加了第一种实际选择 #9565 中发布的输出风格（`Concise`、`Proactive`、`Explanatory` 等）的方式，支持大小写不敏感的名称解析。

- **[#10407 — WebShell 侧边栏中的工作区概览和工作区菜单](https://github.com/QwenLM/qwen-code/pull/10407)** — 侧边栏行现在显示会话计数（等待/运行/总计）、完整路径提示，以及针对受信任工作区的管理操作。

- **[#8927 — 使用 `sessionRotation` 限制会话生命周期](https://github.com/QwenLM/qwen-code/pull/8927)** — 添加了每频道 `sessionRotation`（`maxTurns` 或时间限制），以便当前会话超过其限制后，路由会启动一个新会话。与不断增长的多智能体/会话管理路线图相关。

- **[#10146 — OpenTUI 迁移基础批次](https://github.com/QwenLM/qwen-code/pull/10146)** — #8662 中跟踪的 OpenTUI 迁移的基础模块：主题家族、可访问性层、剪贴板、键映射、鼠标命中测试、光标放置和链接处理。

- **[#10390 — 解除工作树脏状态下的 git 更新阻塞](https://github.com/QwenLM/qwen-code/pull/10390)** — WebShell 的 "Update Project" 操作在拉取被未提交的更改阻塞时，现在会提供一个解决面板（而不是不透明的错误）。

- **[#10489 — 持久化模型推理偏好](https://github.com/QwenLM/qwen-code/pull/10489)** — 复用现有的 `model.reasoningEffort` 设置，使 WebShell 模型和推理努力选择在守护进程重启后仍然保留。

## 功能请求趋势

- **多智能体和会话编排**：最清晰的信号集中在会话间和智能体间通信——跨会话消息传递 (#8724)、有界会话生命周期 (#8927) 以及更可靠的队友消息投递 (#8172, #10090)。
- **本地/自托管推理兼容性**：llama.cpp 用户要求修复语法/格式生成问题，并针对本地 OpenAI 兼容服务器进行更好的兼容性测试 (#10520, #10530)。
- **WebShell 作为管理界面**：侧边栏中的工作区管理 (#10407)、脏树更新流程 (#10390) 以及无需守护进程重启的模型管理 (#10184) 都表明 WebShell 正成为 `qwen serve` 的主要操作员 UI。
- **可配置性和持久化**：用户希望面向用户的偏好真正起作用——可选择的输出风格 (#10283)、持久的推理努力 (#10489) 以及移除没有运行时效果的设置（已关闭的 #8748）。
- **可靠性和自愈**：对瞬时网络错误的自动重试 (#10347) 以及对 CI/发布失败 (#10510, #10535) 的关注，反映了用户更广泛的期望：工具无需手动 `Ctrl+Y` 干预即可自行恢复。

## 开发者痛点

- **流式停滞和静默期**：#5975 失败模式——"Thought" 块之后静默直到 120 秒超时——仍然是最常见的反复出现的痛点，尚未有修复落地。
- **本地模型回归**：0.22.3 中的 llama.cpp 语法 400 错误 (#10520, #10530) 是最近的回归，导致本地用户因使用的 Qwen 模型大小不同而分化，而非 Qwen 模型正常工作。
- **Agent Team 消息语义**：排队过长的消息 (#8172)、后台任务目标歧义 (#10073/#10090) 以及任务缺失错误削弱了对多智能体功能的信任。
- **钩子审批 UX 缺口**：返回 `ask` 的钩子不渲染差异 (#9434)，使人工审核比应有的更困难。
- **WebShell 状态一致性**：24 小时窗口内的几个 P1/P2 错误涉及过期或卡住的 UI 状态——锁定的会话切换覆盖层 (#10405)、无限重新渲染循环 (#10406)、编辑时错误的倒带快照 (#10385) 以及需要重启才能使用的模型 (#10184)。
- **Windows 特定故障**：CUA SDK 运行时在 Windows x64 上的 panic (#10538) 是平台特定可靠性问题模式中的最新一例。
- **仓库 DX 摩擦**：未知标志导致 `npm test` 损坏 (#8721, 已关闭)、corepack 回退因 EACCES 失败 (#10524) 以及反复出现的 CI/发布工作流失败 (#10510, #10535) 为贡献者和夜间构建使用者增加了额外负担。

</details>

---
*本日报由 [agents-radar](https://github.com/mux4457986479-commits/agents-radar) 自动生成。*
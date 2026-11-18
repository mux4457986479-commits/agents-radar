# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-18

采集时间：2026-11-18T03:43:14.544Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [obra/superpowers](https://github.com/obra/superpowers) | 1917 | 319435 | 为编码代理提供需求澄清、计划、子代理开发与审查的技能框架。 | 值得配置：与现有 Codex、Claude Code、Pi 工作流直接衔接，可规范需求拆解、计划和工程审查；建议先小范围验证自动触发效果。 | 依赖各代理的插件或包安装机制；Windows 原生兼容性未确认，可能需要 Git/Shell；模型或 API 费用未确认。 | 与 Codex、Claude Code、Pi 的内置代理能力互补；需核对已有技能和插件配置。 |
| 2 | [dream-num/univer](https://github.com/dream-num/univer) | 1774 | 28981 | 可嵌入产品的表格与文档编辑 SDK，含公式、协同和文件处理能力。 | 可观望：面向开发者的 Office SDK，不是开箱即用的文档助手；除非要自建表格或文档编辑集成，否则短期收益有限。 | 本地开发需 Node.js 22.18 及以上与 pnpm；Windows 兼容性未确认；Server SDK 和 AI SDK 商业授权及费用未确认。 | 与办公文档处理需求相关但偏应用开发；需核对现有文档自动化与知识库方案。 |
| 3 | [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | 1445 | 20076 | 为自建智能体前端提供双向事件流协议与多语言 SDK | 可观望：你的主线是办公文档、工程审查、知识库与自动化，AG-UI 主要解决自建 Agent 与前端应用的交互，缺少直接落地场景；除非计划做内部 Agent 界面，否则先观望。 | 需 Node.js 20+、Python 3.9+ 或 .NET SDK；模板示例需 OpenAI API Key，协议示例无需密钥；Windows 兼容性与硬件未确认。 | 与现有 Codex、Claude Code 不直接重叠；可作为 Agent 前端交互层的补充，是否接入 Pi Agent 需核对。 |
| 4 | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 1292 | 7793 | 让编码代理本地调用 FFmpeg 完成剪切、字幕、转码与校验 | 可观望：它能给 Claude Code、Codex 增加本地视频自动化，但你的核心是文档、审查与知识库；有培训视频、工程影像或素材批处理需求时再配置更合适。 | 需本机 FFmpeg 与 Python，npm/npx 安装；可选本地语音模型可能下载权重；无云服务和 API Key；Windows 需注意 python3 命令名，硬件未确认。 | 与 Claude Code、Codex 的技能/MCP 体系互补，增加视频处理自动化；与办公文档、知识库工具重叠少，需核对现有技能配置。 |
| 5 | [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) | 1072 | 3197 | 多智能体自动生成AI研究论文与LaTeX稿件 | 不建议配置：面向AI论文写作，需论文素材与LaTeX模板，并依赖多家模型API；与办公文档、工程审查和知识库流程不直接契合。 | Python 3.11/Conda；需OpenAI或Gemini及Semantic Scholar等API密钥，可能产生费用；数据集未随仓库提供；Windows兼容性未确认。 | 与Claude Code/Codex的写作辅助局部重叠；文献综述或可补充知识库，但需核对现有流程。 |
| 6 | [stablyai/orca](https://github.com/stablyai/orca) | 1066 | 127996 | 并行编排Codex、Claude Code等编码代理的桌面工作台 | 值得配置：贴合多代理自动化与工程审查，支持Windows、工作树隔离和差异批注；但引入新编排层，需先核对现有代理配置与权限边界。 | Windows可使用桌面exe；通常需已有Codex/Claude Code等订阅或CLI；远程、移动端可选；额外费用、硬件要求未确认。 | 直接编排Codex、Claude Code，可能与Pi Agent及现有终端流程重叠；需核对已有配置。 |
| 7 | [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 1005 | 9568 | 面向授权漏洞挖掘与外网红队的 Claude Code 技能包。 | 不建议配置：主要服务漏洞挖掘和红队，与办公文档、工程审查、知识库及常规自动化不匹配，还会引入攻击性技能与额外维护成本。 | Windows 原生可用 PowerShell 安装；需 Claude Code 或 Codex 技能目录；cbh CLI 需 Python/pipx，Burp MCP 可选；外部侦察工具与 API 费用未确认。 | 与 Claude Code/Codex 技能机制重叠；面向安全测试，非办公文档、工程审查或知识库。 |
| 8 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 883 | 305629 | 面向多编码代理的技能、记忆、安全与流程编排系统。 | 可观望：统一规划、记忆和审查可贴合现有 Claude Code/Codex 自动化，但安装与钩子生命周期较重，建议先在非关键项目小范围验证。 | Node.js 18+、Git、Claude Code 2.1+；Windows 可用 npx；Codex 等适配路径不同；Pro 私有仓库收费，API 与硬件费用未确认。 | 与现有 Claude Code/Codex 工作流和技能配置重叠，补充记忆与审查编排；需核对已有配置。 |
| 9 | [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | 869 | 3373 | 评估 AI 代理技能与插件的质量、安全、兼容性和实际效果。 | 可观望：若需维护 Codex/Claude Code 技能库，可用于上线前质检与兼容性检查；完整实测配置较重，暂不必优先。 | Python 3.12–3.14；基础静态检查无需 GPU/Docker；完整评估需 NVIDIA Build 密钥、Docker 和扫描器，可能计费；Windows 原生支持未确认。 | 与 Codex/Claude Code 的技能配置流程相关，可补充质检；需核对已有评测与安全扫描配置。 |
| 10 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 862 | 193240 | 用提示词让编码代理精简代码，并提供代码审查和仓库审计命令。 | 可观望：偏代码生成与审查，对办公文档和知识库帮助有限；若已有代码规范，需先验证其审查建议是否冲突。 | 经 npm 或插件安装；支持 Claude Code、Codex，其他代理可复制 AGENTS.md；额外 API 与 Windows 兼容性未说明。 | 与 Codex、Claude Code 的编码和审查流程重叠，可能补充精简与审计；需核对现有规范。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-03T23:24:58Z；许可证 MIT
- [dream-num/univer README](https://github.com/dream-num/univer#readme)；最近推送 2026-11-18T02:49:40Z；许可证 Apache-2.0
- [ag-ui-protocol/ag-ui README](https://github.com/ag-ui-protocol/ag-ui#readme)；最近推送 2026-11-17T21:27:09Z；许可证 MIT
- [kajisho5/ffmpeg-skill README](https://github.com/kajisho5/ffmpeg-skill#readme)；最近推送 2026-11-18T03:32:52Z；许可证 MIT
- [google-research/paper-orchestra README](https://github.com/google-research/paper-orchestra#readme)；最近推送 2026-11-15T18:08:08Z；许可证 Apache-2.0
- [stablyai/orca README](https://github.com/stablyai/orca#readme)；最近推送 2026-11-18T03:41:24Z；许可证 MIT
- [elementalsouls/Claude-BugHunter README](https://github.com/elementalsouls/Claude-BugHunter#readme)；最近推送 2026-11-17T13:33:22Z；许可证 MIT
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-17T06:41:46Z；许可证 MIT
- [NVIDIA/SkillEvaluator README](https://github.com/NVIDIA/SkillEvaluator#readme)；最近推送 2026-11-18T03:05:57Z；许可证 Apache-2.0
- [DietrichGebert/ponytail README](https://github.com/DietrichGebert/ponytail#readme)；最近推送 2026-10-29T11:59:31Z；许可证 MIT
- [Trending 来源](https://github.com/trending/?since=daily)
- [Trending 来源](https://github.com/trending/python?since=daily)
- [Trending 来源](https://github.com/trending/typescript?since=daily)
- [Trending 来源](https://github.com/trending/javascript?since=daily)
- [Trending 来源](https://github.com/trending/jupyter-notebook?since=daily)
- [Trending 来源](https://github.com/trending/go?since=daily)
- [Trending 来源](https://github.com/trending/rust?since=daily)
- [Trending 来源](https://github.com/trending/shell?since=daily)
- [Trending 来源](https://github.com/trending/c++?since=daily)
- [Trending 来源](https://github.com/trending/java?since=daily)

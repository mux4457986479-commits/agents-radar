# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-14

采集时间：2026-11-14T02:24:53.984Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 795 | 115076 | 为编程代理提供公司网站与落地页的视觉设计、浏览器校验技能 | 可观望：主打公司网站与落地页视觉生成，和办公文档、工程审查、知识库、自动化关联较弱；仅在做网页或界面原型时补充，需核对已有设计技能。 | 需 Node 22+ 与 Chrome/Edge/Chromium，可选 ffmpeg；无需 API 密钥；Windows 下链接安装细节未完全确认。 | 与 Codex、Claude Code 的代理技能机制叠加，偏前端设计；需核对已有设计类技能。 |
| 2 | [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | 787 | 69899 | 本地代理将多种编程代理接入多家模型提供商并做路由回退 | 可观望：可统一 Claude Code、Codex、Pi、DeepSeek 等模型路由与回退，但引入第三方本地代理、密钥托管和各提供商条款风险；免费额度与收费未确认，宜隔离试用。 | Windows 有 PowerShell 安装脚本；需 Python 3.14、uv；需提供商 API Key 或 OAuth，可能产生费用；免费额度与 ToS 合规未确认。 | 与现有 Claude Code、Codex、Pi、DeepSeek 的模型配置重叠，补充多提供商路由、故障回退和统一管理。 |
| 3 | [openai/codex-security](https://github.com/openai/codex-security) | 751 | 13165 | 面向代码仓库的 AI 安全扫描 CLI/SDK，支持验证与修复建议。 | 值得配置：与 Codex 工作流直接衔接，适合工程安全审查和 CI 自动化；需评估扫描成本与误报。 | Node 22.x/24/26、Python 3.10+、npm；需登录或 API key，扫描按量计费；Windows 原生支持未明示，Docker 可选。 | 补充 Codex 的代码审查；与现有安全扫描/SARIF 工具可能重叠，需核对配置。 |
| 4 | [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | 674 | 12127 | 可自托管的 AI 协作工作区，代理可操作浏览器、文件和工具。 | 可观望：覆盖浏览器/文件代理与知识库，但需 Docker、Bun、Intelligence 许可和模型密钥，部署较重；宜先小规模验证。 | Windows 有安装包；源码需 Docker、Bun 1.4+、WSL2；需 Intelligence 许可和模型 key，费用/硬件未确认。 | 与现有编码代理和知识库工具存在编排重叠；可作为带审批的代理工作区补充，需核对配置。 |
| 5 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 600 | 190399 | 让 AI 编码代理以极简方式写码并审查、审计代码 | 可观望：与工程审查和自动化有相关性，Claude Code、Codex 可装；但收益多为自报基准，且本质是提示技能，宜先在非关键仓库试用。 | 需 Node/npm 或代理插件机制；Claude Code 2.1.290+ 才显示状态栏；Windows 原生兼容未确认；模型 API 费用随宿主工具。 | 与 Claude Code、Codex 自带审查及 agent-skills 的 review 重叠，需核对现有配置。 |
| 6 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 591 | 117172 | 为编码代理提供规格、计划、测试、审查、发布等工作流技能 | 值得配置：与用户的工程审查和自动化高度契合，MIT 且可直接装进 Claude Code、Codex；建议按需选装审查、测试、规格技能，避免全量提示膨胀。 | Node/npx 或 Claude Code、Codex 插件；Codex CLI v0.122+；Windows 下 SSH 克隆可能需改用 HTTPS；无 GPU 要求，模型费用随宿主。 | 与 Ponytail、Claude Code、Codex 内置命令在审查和测试上有重叠，需按现有配置选装。 |
| 7 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 559 | 302492 | 面向编码代理的技能、记忆、审查与自动化工作流框架。 | 可观望：支持Claude Code与Codex，能补工程审查和流程自动化；但安装层较重且与Superpowers功能重叠，建议先核对现有配置并小范围试用。 | Windows可用PowerShell经npx安装；需Node.js 18+、Git，Claude Code插件需2.1+。WSL/Docker未确认；核心MIT，Pro托管服务收费。 | 与Superpowers在技能、审查和工作流上重叠；需核对Codex/Claude Code现有插件。 |
| 8 | [obra/superpowers](https://github.com/obra/superpowers) | 530 | 317257 | 为编码代理提供需求澄清、计划、TDD与子代理审查的技能框架。 | 值得配置：覆盖Claude Code、Codex和Pi，子代理审查与TDD流程契合工程审查；但偏软件开发，办公文档与知识库需另配技能。 | 按各代理插件方式安装，支持Pi包；Windows原生细节未确认；未确认额外API收费，模型调用费用随现有代理。 | 与ECC的技能/审查流程重叠，与Claude Code/Codex内建工作流可能重叠；需核对已有插件。 |
| 9 | [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | 494 | 134889 | 本地运行和量化 LLM/VLM，并提供兼容 OpenAI 的推理服务。 | 值得配置：适合在 Windows 上做本地模型推理，为知识库、文档处理和自动化提供私有后端；是否投入取决于硬件与模型需求。 | Windows 可用预编译包或安装脚本，也支持 Docker；需按模型准备内存和显存，GPU 可选；软件 MIT，模型许可和 API 费用另计。 | 可作为本地推理后端，补充 Codex、Claude Code、DeepSeek、Pi Agent；与已有本地推理工具是否重复需核对。 |
| 10 | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 462 | 30121 | 终端 AI 编程代理，支持多模型、IDE/桌面和脚本调用。 | 可观望：与 Codex、Claude Code 高度重叠；只有在需要 Qwen 模型、多协议切换或 headless SDK 时才有明显补充价值。 | Windows 有安装脚本；NPM 需 Node.js 22+；需订阅或 API Key，亦可接本地模型；硬件未确认。 | 与 Codex、Claude Code 同为编码代理，重叠高；可作为 Qwen/多模型备选，需核对已有配置。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [Leonxlnx/taste-skill README](https://github.com/Leonxlnx/taste-skill#readme)；最近推送 2026-11-08T21:51:50Z；许可证 MIT
- [Alishahryar1/free-claude-code README](https://github.com/Alishahryar1/free-claude-code#readme)；最近推送 2026-11-13T19:37:18Z；许可证 NOASSERTION
- [openai/codex-security README](https://github.com/openai/codex-security#readme)；最近推送 2026-11-13T22:45:43Z；许可证 Apache-2.0
- [CopilotKit/OpenBot README](https://github.com/CopilotKit/OpenBot#readme)；最近推送 2026-11-14T01:19:14Z；许可证 MIT
- [DietrichGebert/ponytail README](https://github.com/DietrichGebert/ponytail#readme)；最近推送 2026-10-29T11:59:31Z；许可证 MIT
- [addyosmani/agent-skills README](https://github.com/addyosmani/agent-skills#readme)；最近推送 2026-11-01T19:24:49Z；许可证 MIT
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-09T04:56:24Z；许可证 MIT
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-03T23:24:58Z；许可证 MIT
- [ggml-org/llama.cpp README](https://github.com/ggml-org/llama.cpp#readme)；最近推送 2026-11-13T23:50:18Z；许可证 MIT
- [QwenLM/qwen-code README](https://github.com/QwenLM/qwen-code#readme)；最近推送 2026-11-14T02:22:33Z；许可证 Apache-2.0
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

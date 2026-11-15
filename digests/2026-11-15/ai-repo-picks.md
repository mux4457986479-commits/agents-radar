# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-15

采集时间：2026-11-15T01:53:06.366Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | 893 | 51460 | 基于 Git diff 的 AI 代码审查 CLI，支持行级评论与规则集。 | 值得配置：贴合工程审查；可由 Codex/Claude Code 委托模型，减少重复提示与定位漂移；需接受审查召回取舍和 API 成本。 | README 标 Windows 支持；需 Node/npm、Git≥2.41，外部 LLM 可能产生 API 费用；硬件未确认。 | 与 Codex/Claude Code 自带审查重叠；补充确定性子流程、行级定位和 CI 集成，需核对已有配置。 |
| 2 | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 664 | 56328 | 让编码代理通过 MCP/CLI 控制并调试 Chrome 浏览器。 | 可观望：适合网页自动化、性能与前端调试；与办公文档和知识库流程关联有限，且浏览器内容暴露给 MCP 客户端，需评估敏感数据。 | 需 Node.js LTS、npm 和较新 Chrome；Windows 可用性未单独确认；默认收集使用统计，性能查询可能外发 CrUX，硬件未确认。 | 补充 Codex/Claude Code 的浏览器操作能力；与现有自动化工具可能重叠，需核对 MCP 与脚本配置。 |
| 3 | [openai/codex-security](https://github.com/openai/codex-security) | 595 | 13549 | Codex安全审查CLI/SDK，支持漏洞扫描、验证、补丁与报告。 | 可观望：与Codex集成且面向工程安全审查，但需API登录与扫描成本，常规代码审查未必需要专用安全流程。 | Node.js 22.13+/24/26、Python 3.10+；需登录或API Key；CI示例有每扫描约5美元估算；Windows原生兼容未明确。 | 与Codex代码审查重叠，补充安全漏洞验证、补丁和SARIF/CI；需核对已有安全扫描配置。 |
| 4 | [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 553 | 4850 | 面向股票投资与交易的Claude技能集，含市场分析、筛选和交易流程。 | 不建议配置：领域为股票交易，与办公文档、工程审查、知识库和自动化关注点弱相关；投资决策风险也不适合默认引入。 | Claude Skills/Claude Code；Python 3.11-3.13，README称支持Windows；部分功能需FMP、FINVIZ Elite或Alpaca，基础路径需公开CSV或本地文件。 | 复用Claude Code技能机制但领域不同；与现有办公/工程/知识库工具无明显补充，需核对。 |
| 5 | [dream-num/univer](https://github.com/dream-num/univer) | 495 | 24521 | 开源Office SDK，可嵌入表格与文档编辑、计算和协作能力。 | 可观望：它是面向开发者的嵌入式Office SDK，而非开箱即用文档工具；开源核心可做表格/文档编辑，但协作、导入导出与AI扩展需商业授权，先评估集成成本。 | 本地开发需Node.js>=22.18与pnpm；Windows原生兼容未确认；商业Server/AI SDK需单独授权，费用未确认；硬件未确认。 | 补充办公文档/表格自动化能力；需核对已有Office、知识库和Agent集成，避免重复建设。 |
| 6 | [obra/superpowers](https://github.com/obra/superpowers) | 428 | 317666 | 为编码代理提供需求澄清、TDD与子代理开发流程。 | 值得配置：明确支持Codex、Claude Code和Pi，可补充工程审查与自动化流程；但会改变代理默认行为，建议先在非关键仓库试点并核对现有技能配置。 | Shell；通过各代理插件/包安装；Windows原生兼容未确认；依赖现有代理模型API，费用随代理计，硬件未确认。 | 与现有Codex/Claude Code/Pi的技能和工作流配置重叠，需核对避免重复触发。 |
| 7 | [Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo) | 420 | 2298 | 实时 GPU 视频超分、降噪、补帧与采集播放工具。 | 不建议配置：主要面向游戏、采集卡和视频画质增强，与办公文档、工程审查、知识库及自动化关联弱，除非另有视频处理需求。 | Windows 11 x64、DirectX 12、NVIDIA/AMD GPU；高分辨率与补帧更耗显存；API 收费未确认；GPL-3.0。 | 与现有编码代理工具无直接重叠，属视频娱乐/采集类；需核对已有播放与采集工具。 |
| 8 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 411 | 117596 | 为 AI 编码代理提供工程流程技能与斜杠命令。 | 值得配置：直接适配 Codex、Claude Code，含审查、测试、规格等流程，契合工程审查与自动化；建议按需选装避免冗余。 | 需 Node/npx 或对应代理插件机制；技能为 Markdown，Windows 兼容细节未明确；模型 API 费用取决于所用代理，未确认免费额度。 | 与 Codex/Claude Code 内置工作流及已有技能可能重叠，需核对；补充评审、测试与规格化流程。 |
| 9 | [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | 408 | 11156 | 本地浏览器评审代理计划、文档与代码差异并回传反馈 | 值得配置：直接覆盖文档审阅与工程审查，支持 Claude Code、Codex、DeepSeek 和 Pi；Windows 可安装，但 Codex 原生钩子仍需手动配置，宜先核对现有评审流程。 | Windows 原生可用（PowerShell 安装；Codex 钩子在原生 Windows 属实验，需手动设置），需配置宿主插件/钩子；无明确硬件要求；自身收费未确认，模型调用费用随原代理。 | 补充现有代理的计划与代码评审入口；需核对已有插件及 Obsidian/Notion 工作流，避免重复配置。 |
| 10 | [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | 366 | 70261 | 把多种编码代理路由到多模型服务商的本地代理 | 可观望：可让 Codex、Claude Code、DeepSeek、Pi 切换低成本模型，但“免费”依赖第三方额度与条款，本地代理会接触密钥和代码，需先审查安全与合规。 | Windows 有 PowerShell 安装器和桌面启动器，需 Python/uv 及第三方 Provider 密钥或 OAuth；免费额度、收费、限流、数据安全与硬件要求均未确认。 | 与各代理自带模型/Provider 配置重叠，可作统一路由；需核对已有 API 密钥、代理和计费设置。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [alibaba/open-code-review README](https://github.com/alibaba/open-code-review#readme)；最近推送 2026-11-14T16:50:04Z；许可证 Apache-2.0
- [ChromeDevTools/chrome-devtools-mcp README](https://github.com/ChromeDevTools/chrome-devtools-mcp#readme)；最近推送 2026-11-15T01:05:52Z；许可证 Apache-2.0
- [openai/codex-security README](https://github.com/openai/codex-security#readme)；最近推送 2026-11-14T17:14:45Z；许可证 Apache-2.0
- [tradermonty/claude-trading-skills README](https://github.com/tradermonty/claude-trading-skills#readme)；最近推送 2026-11-15T01:32:38Z；许可证 MIT
- [dream-num/univer README](https://github.com/dream-num/univer#readme)；最近推送 2026-11-14T17:23:40Z；许可证 Apache-2.0
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-03T23:24:58Z；许可证 MIT
- [Likely7/Veyra-NRVideo README](https://github.com/Likely7/Veyra-NRVideo#readme)；最近推送 2026-11-14T05:53:56Z；许可证 GPL-3.0
- [addyosmani/agent-skills README](https://github.com/addyosmani/agent-skills#readme)；最近推送 2026-11-14T04:33:56Z；许可证 MIT
- [backnotprop/plannotator README](https://github.com/backnotprop/plannotator#readme)；最近推送 2026-11-15T01:34:42Z；许可证 Apache-2.0
- [Alishahryar1/free-claude-code README](https://github.com/Alishahryar1/free-claude-code#readme)；最近推送 2026-11-15T01:41:50Z；许可证 NOASSERTION
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

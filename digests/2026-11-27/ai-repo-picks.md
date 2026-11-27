# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-27

采集时间：2026-11-27T04:14:43.049Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 1597 | 24825 | 面向漏洞赏金与外部红队测试的 Claude Code 技能包 | 不建议配置：用户重点是办公文档、工程审查、知识库与自动化，该包偏授权渗透与漏洞挖掘；除非确有安全测试需求，否则用途偏离且增加维护面。 | Windows 有 PowerShell 安装脚本；需 Claude Code；技能层可复制到 Codex；斜杠命令与 hunt 引擎仅 Claude Code；Burp/HackerOne 可选；外部扫描依赖未确认 | 与现有 Claude Code/Codex 技能体系可能重叠；偏攻击面测试，对办公文档、工程审查、知识库无直接补充 |
| 2 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 1046 | 211074 | 抓取网页并转为 Markdown，支持爬取、搜索和 MCP 接入 | 值得配置：适合将网页、PDF 和 Office 文档汇入知识库，并让 Codex、Claude Code 等代理检索；本地可跑但需核对部署成本。 | Windows 可用本地二进制但需 Rust/C 编译器；MCP 需 Node.js 22+；云 API 价格未确认；AGPL-3.0 商用合规需自行核对 | 与现有知识库采集、网页抓取或自动化脚本可能重叠；可作为代理联网检索与内容清洗的补充，需核对已有配置 |
| 3 | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | 955 | 73975 | 为编码智能体生成自包含 HTML/SVG 的多种类型图表技能。 | 值得配置：与办公文档配图、工程架构审查和知识库可视化直接相关；明确支持 Codex、Claude Code 和 Pi，Windows 下无符号链接时可回退复制。 | 需 Node/npx 或宿主插件市场；Windows 原生可装，无开发者模式时复制；硬件未确认；模型/API 费用随宿主；网络行为未核实。 | 补充现有 Codex、Claude Code、Pi 的图表产出；需核对已装技能与导出流程。 |
| 4 | [obra/superpowers](https://github.com/obra/superpowers) | 854 | 327602 | 面向编码智能体的技能框架，覆盖需求梳理、TDD 与子代理开发流程。 | 可观望：支持 Codex、Claude Code 和 Pi，但核心是软件开发方法论，与办公文档和知识库场景仅部分相关；流程较重，宜先小范围验证。 | 按宿主分别安装插件；README 以 Shell/插件命令为主，Windows 原生兼容性未确认；硬件未确认；模型/API 费用随宿主。 | 与现有代理技能和工作流可能重叠；需核对已装插件，避免重复约束与额外流程。 |
| 5 | [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | 774 | 17083 | 本地长视频自动切片、字幕封面与多平台短视频导出工具 | 可观望：核心场景是播客、访谈、直播转短视频，与办公文档、工程审查和知识库主线关联弱；如有课程视频复用需求再评估。 | Windows 10/11 x64安装包，内置Python/FFmpeg；需自备云API或本地Ollama/LM Studio+Whisper/SenseVoice；硬件要求未确认；未签名安装包需绕过SmartScreen。 | 与现有Agent无直接重叠，可作MCP视频处理补充；需核对已有媒体工具与自动化流程。 |
| 6 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 759 | 75877 | 跨Reddit、X、YouTube等平台检索近30天信息并生成摘要的Agent技能 | 可观望：可为知识库补充近期社区与市场信号，但依赖多平台密钥或登录态，抓取稳定性和隐私成本需先验证，适合按需试用。 | Claude Code插件或Codex等npx skills安装；Claude Desktop MCP需Python 3.12+；X、YouTube、ScrapeCreators、Brave等需密钥或浏览器登录，部分收费；Windows细节未确认。 | 与知识库检索和DeepSeek调研互补，需核对已有搜索/爬取配置；不替代工程审查。 |
| 7 | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 702 | 71789 | 从零训练 64M 小语言模型的教学型全流程项目。 | 不建议配置：偏向 LLM 原理教学与训练复现，不直接服务办公文档、工程审查或知识库；需 GPU 和训练环境，收益与现有工具不匹配。 | Python≥3.10、PyTorch/CUDA；README 实测单卡 RTX 3090 24GB；Windows 原生兼容未确认，WSL 未确认；算力自备。 | 可作为本地小模型实验，但与 Codex/Claude Code/DeepSeek 的文档与审查用途重叠有限；需核对是否有训练研究需求。 |
| 8 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 687 | 199442 | 面向 AI 编程代理的极简开发与代码审查技能插件。 | 值得配置：与 Codex、Claude Code 直接集成，提供 review/audit 命令，契合工程审查；但需先审查 hooks 与插件权限，效果依赖所用代理。 | Claude Code/Codex 插件安装并信任 hooks；部分界面需 Claude Code 2.1.290+；其他代理需复制 AGENTS.md；Windows 原生兼容未确认；无独立 API 收费证据。 | 与 Codex/Claude Code 的代码生成和审查能力互补；需核对已有规则、插件及 hooks，避免重复。 |
| 9 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 602 | 311380 | 面向 Claude Code、Codex 等代理的技能、记忆与审查优化框架 | 可观望：与现有代理工作流契合，可补工程审查和自动化；但会写入钩子/技能，需先小范围验证稳定性与安全。 | Node.js 18+、Git；Claude Code 插件需 2.1+；Windows 有 PowerShell 说明；Codex 钩子信任需确认；Pro 私有仓库收费。 | 与 Claude Code/Codex 的 skills、hooks、记忆机制重叠；需核对现有配置后再决定是否叠加。 |
| 10 | [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | 562 | 7104 | iOS/Android 上架拒审规则与提交前检查工具 | 可观望：仅覆盖移动应用商店合规，与办公文档、通用工程审查和知识库的日常关联较弱；有移动发布需求再评估。 | 需 git 与 bash；非 Claude Code 工具还需 python3；Windows 原生兼容未确认；不保证上架通过。 | 可补充编码代理的提交前检查，但仅限移动应用上架；需核对是否已有同类合规流程。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [elementalsouls/Claude-BugHunter README](https://github.com/elementalsouls/Claude-BugHunter#readme)；最近推送 2026-11-27T02:38:29Z；许可证 MIT
- [firecrawl/firecrawl README](https://github.com/firecrawl/firecrawl#readme)；最近推送 2026-11-27T00:15:09Z；许可证 AGPL-3.0
- [cathrynlavery/diagram-design README](https://github.com/cathrynlavery/diagram-design#readme)；最近推送 2026-11-26T19:48:58Z；许可证 MIT
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-26T11:33:33Z；许可证 MIT
- [zhouxiaoka/autoclip README](https://github.com/zhouxiaoka/autoclip#readme)；最近推送 2026-11-27T04:06:30Z；许可证 MIT
- [mvanhorn/last30days-skill README](https://github.com/mvanhorn/last30days-skill#readme)；最近推送 2026-11-27T04:06:55Z；许可证 MIT
- [jingyaogong/minimind README](https://github.com/jingyaogong/minimind#readme)；最近推送 2026-11-26T08:55:11Z；许可证 Apache-2.0
- [DietrichGebert/ponytail README](https://github.com/DietrichGebert/ponytail#readme)；最近推送 2026-11-22T02:31:58Z；许可证 MIT
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-23T04:55:48Z；许可证 MIT
- [mjmirza/app-store-compliance README](https://github.com/mjmirza/app-store-compliance#readme)；最近推送 2026-11-26T23:21:53Z；许可证 NOASSERTION
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

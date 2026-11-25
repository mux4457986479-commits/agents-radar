# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-25

采集时间：2026-11-25T04:54:02.262Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 1826 | 21715 | 面向漏洞赏金和外部红队的 Claude Code 攻击技能包 | 不建议配置：集中在渗透测试、漏洞挖掘与攻击面侦察，与办公文档、工程审查和知识库主线不匹配；高权限攻击流程还增加合规与误用风险。 | Windows 可用 PowerShell 安装；需 Claude Code 或兼容技能目录，Burp/HackerOne MCP 可选；API 费用与硬件未确认。 | 与现有 Codex/Claude Code 技能机制可并存，但主要补充安全测试；需核对已有安全工具与授权流程。 |
| 2 | [obra/superpowers](https://github.com/obra/superpowers) | 1003 | 325949 | 为编码代理提供需求澄清、计划、TDD 和子代理开发的技能框架 | 值得配置：直接支持 Claude Code、Codex 与 Pi，可把工程审查和自动化任务纳入规格、计划、测试流程；但偏软件开发，办公文档与知识库收益有限。 | 通过各代理插件市场或命令行安装；Windows 原生兼容性未明确说明；需现有模型 API，费用随代理与模型而定，硬件未确认。 | 与 Claude Code/Codex/Pi 的技能和子代理能力重叠，补充结构化开发流程；需核对已有技能配置，避免重复。 |
| 3 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 991 | 209108 | 抓取和爬取网站并转为 Markdown，供智能体与知识库使用。 | 值得配置：可为 Codex、Claude Code 等提供网页抓取、站点爬取和 MCP 接入，贴合知识库采集与自动化；先核对 Windows 本地构建及现有网页工具。 | 本地版需 Rust、C 编译器和 Chrome/Chromium；MCP 需 Node.js 22+；云端搜索/高级功能需账号或额度，收费未确认；Windows 兼容未确认。 | 与现有智能体的网页搜索/抓取可能重叠；补充批量站点转 Markdown 和 MCP 接入，需核对已有配置。 |
| 4 | [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | 980 | 15557 | 将长视频自动剪成短视频，生成字幕、封面和发布文案。 | 不建议配置：与办公文档、工程审查、知识库和自动化主线关联弱，当前需求未体现视频剪辑，投入产出比低。 | Windows 10/11 x64 可用安装包；剪辑渲染本地运行，云分析/转写需自备 API，Ollama/Whisper 可离线；GPU 要求未确认。 | 与现有文档、审查、知识库工具基本无重叠；仅在视频内容再加工时补充，需核对已有配置。 |
| 5 | [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | 928 | 5964 | 面向 iOS/Android 提交前合规扫描与拒审案例库。 | 可观望：与工程审查有潜在关联，但当前关注点未显示移动应用发布需求；需 git/bash，Windows 原生支持未确认。 | 需 git 和 bash；部分 AI 代理集成需 python3；Windows 原生兼容性未确认，可能需 WSL 或 Git Bash；API 收费未确认。 | 与 Codex/Claude Code 的钩子和技能机制重叠；对移动合规审查是补充，需核对已有配置。 |
| 6 | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | 802 | 72238 | 为 AI 代理生成自包含 HTML/SVG 专业图表。 | 值得配置：可将架构、流程和汇报内容转为图表，补充办公文档与工程审查；原生支持 Codex、Claude Code 与 Pi。 | 通过 npx skills 或各代理插件市场安装；Windows 无开发者模式时符号链接会退回复制；硬件与 API 收费未确认。 | 与现有 Codex、Claude Code、Pi 的技能/插件机制重叠；在文档配图和知识库可视化上补充。 |
| 7 | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 727 | 70419 | 从零训练约 64M 参数小模型的完整 PyTorch 教程与代码 | 不建议配置：偏教学与研究复现，不能直接服务办公文档、工程审查或知识库自动化；训练需 NVIDIA GPU 与 Linux/CUDA 环境，投入产出对当前用途偏低。 | 实测环境为 Ubuntu 20.04、CUDA 12.2、RTX 3090 24GB，Windows 原生训练未确认；推理可接 ollama/llama.cpp。Apache-2.0 免费，算力自备。 | 与现有 Agent 工具无功能重叠，仅可作模型原理学习；需核对是否已有本地推理环境。 |
| 8 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 703 | 74399 | 跨 Reddit、X、YouTube 等检索近 30 天信息并生成调研摘要的 Agent 技能 | 可观望：可把技术、人物、竞品调研自动化并沉淀进知识库，但侧重社媒舆情，与办公文档和工程审查主线关联弱；多源需自备 key，Windows 支持未确认。 | npx 安装，Claude Code 可走插件市场；桌面 MCP 需 Python 3.12+。Reddit/HN 等免费，X、TikTok、Perplexity 需自备 key 或付费；Claude Desktop 的 Windows 支持延后。 | 补充 Codex、Claude Code 的联网调研能力，与知识库自动化可能重叠，需核对已有检索配置。 |
| 9 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 675 | 310281 | 为 Claude Code、Codex 等代理加入规划、记忆、技能与审查流程的编排系统。 | 可观望：直接支持 Codex 和 Claude Code，可能强化工程审查；但会改动代理钩子与记忆，需先在小项目验证稳定性和收益。 | Windows 原生有安装步骤；需 Node 18+、Git；Claude 插件需 Claude Code 2.1+；私有仓 Pro 收费；API 费用未确认。 | 与现有 Codex/Claude Code 配置、技能和审查流程可能重叠，需核对已有配置。 |
| 10 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 586 | 198159 | 用代理技能约束编码代理少写代码，并提供代码审查与仓库审计命令。 | 可观望：可辅助工程审查和减少冗余代码，但偏编码场景，对文档、知识库和自动化帮助有限，基准数据需自行验证。 | Claude Code/Codex 插件安装；Codex 需信任钩子；状态栏需 Claude Code 2.1.290+；Windows 兼容与 API 费用未确认。 | 与现有编码代理规则和代码审查流程可能重叠，需核对；对办公文档和知识库补充少。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [elementalsouls/Claude-BugHunter README](https://github.com/elementalsouls/Claude-BugHunter#readme)；最近推送 2026-11-25T04:26:49Z；许可证 MIT
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-24T23:59:04Z；许可证 MIT
- [firecrawl/firecrawl README](https://github.com/firecrawl/firecrawl#readme)；最近推送 2026-11-25T04:38:45Z；许可证 AGPL-3.0
- [zhouxiaoka/autoclip README](https://github.com/zhouxiaoka/autoclip#readme)；最近推送 2026-11-25T03:16:49Z；许可证 MIT
- [mjmirza/app-store-compliance README](https://github.com/mjmirza/app-store-compliance#readme)；最近推送 2026-11-25T04:48:48Z；许可证 NOASSERTION
- [cathrynlavery/diagram-design README](https://github.com/cathrynlavery/diagram-design#readme)；最近推送 2026-11-25T04:53:00Z；许可证 MIT
- [jingyaogong/minimind README](https://github.com/jingyaogong/minimind#readme)；最近推送 2026-11-23T04:01:07Z；许可证 Apache-2.0
- [mvanhorn/last30days-skill README](https://github.com/mvanhorn/last30days-skill#readme)；最近推送 2026-11-24T19:38:02Z；许可证 MIT
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-23T04:55:48Z；许可证 MIT
- [DietrichGebert/ponytail README](https://github.com/DietrichGebert/ponytail#readme)；最近推送 2026-11-22T02:31:58Z；许可证 MIT
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

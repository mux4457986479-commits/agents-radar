# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-26

采集时间：2026-11-26T04:08:54.781Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | 1652 | 23218 | Claude Code 漏洞赏金与外部红队技能包，含85项技能和命令。 | 不建议配置：面向授权渗透测试和漏洞赏金，与办公文档、工程审查、知识库和自动化主线关联弱，且引入攻击性工具面，需专门安全流程。 | 提供 Windows PowerShell 安装；可选 HackerOne API 与 Burp MCP；模型与 API 费用未确认。 | 与 Claude Code、Codex 的技能机制重叠；安全测试用途与现有办公/工程审查场景不重合。 |
| 2 | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | 1141 | 73182 | 为代理生成自包含 HTML+SVG 的编辑型图表，支持52种图表。 | 值得配置：可直接服务办公文档、工程审查和知识库中的架构图、流程图，且已支持 Codex、Claude Code 与 Pi，契合现有工具链。 | Windows 可用 npx 或宿主插件安装，需 Node/npm；模型费用随宿主，未确认额外收费；硬件未确认。 | 与 Claude Code、Codex、Pi 技能生态衔接，补充文档和审查中的图表输出；需核对已有绘图技能。 |
| 3 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 1135 | 210183 | 将网页、PDF 和 Office 文档抓取为 Markdown，供 Agent 与知识库使用。 | 值得配置：适合把网页和文档转为可检索 Markdown，接入现有 Agent；但本地构建有前置依赖，云回退涉及费用与数据外发，需先小规模验证。 | 本地版需 Rust、C 编译器和 Node.js 22；Windows 原生兼容未确认，可用 WSL/Docker 需自行验证；云服务 API 收费或有额度。 | 补充 Codex/Claude Code 的网页抓取与知识库导入；与已有爬虫、检索配置需核对。 |
| 4 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 945 | 75214 | 跨 Reddit、X、YouTube 等平台检索话题并生成近期摘要的 Agent 技能。 | 可观望：偏舆情与人物调研，对办公审查和工程知识库增益有限；多源依赖密钥或登录态，Windows 支持未完全确认，配置与合规成本较高。 | 需 Python 3.12+、Node/npx；X、ScrapeCreators、Brave、Perplexity 等密钥或浏览器登录态，部分收费；Claude Desktop Windows 支持递延，其他宿主未确认。 | 补充 Codex/Claude Code 的社交舆情检索；与现有搜索、知识库和自动化需核对，非工程审查核心。 |
| 5 | [obra/superpowers](https://github.com/obra/superpowers) | 903 | 326739 | 面向编码代理的技能与方法论框架，覆盖需求澄清、计划、TDD 和子代理开发。 | 值得配置：直接适配 Codex、Claude Code 和 Pi，可强化工程审查与分阶段自动化；但偏软件开发流程，需核对现有技能或插件避免重叠。 | 依赖宿主编码代理，按 Codex、Claude Code、Pi 分别安装；Windows 原生兼容性未明确，可能需 WSL；无独立硬件或 API 费用证据。 | 与现有 Codex、Claude Code、Pi 的代理技能或插件可能重叠；补充结构化开发方法论与子代理流程，需核对已装配置。 |
| 6 | [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | 880 | 16313 | 本地 AI 长视频自动剪辑，生成短视频、字幕、封面和发布文案。 | 不建议配置：用户重点是办公文档、工程审查和知识库，视频剪辑非核心流程；除非有播客或课程转短视频需求，否则配置成本不划算。 | Windows 10/11 x64 桌面安装包；CLI 需 Python 3.10+ 与 FFmpeg；Docker 可自托管；硬件和 GPU 未确认；云端模型或 ASR 按 API 另计费，可本地模型。 | 与现有文档、知识库、审查工具无明显重叠；MCP 或 CLI 可与 Codex、Pi 自动化衔接，需核对现有配置。 |
| 7 | [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | 858 | 6572 | iOS/Android 应用商店上架合规检查与提交流程手册。 | 可观望：用户关注办公文档、工程审查与知识库，未体现移动应用上架需求；若做 App 可再评估其钩子与检查清单。 | 需 git 与 bash；Codex 等工具还需 python3。Windows 原生兼容未确认，可能需 WSL/Git Bash；无硬件及 API 收费证据。 | 可与 Claude Code/Codex 钩子结合，但需核对现有配置；与办公文档和知识库流程无直接重叠。 |
| 8 | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 826 | 71123 | 从零训练 64M 级超小语言模型的全流程教学项目。 | 不建议配置：面向模型训练教学与实验，不解决办公文档、工程审查或知识库自动化；无 GPU 时门槛高，产出模型能力也有限。 | Python>=3.10、PyTorch/CUDA、NVIDIA GPU；README 示例为 RTX 3090 24GB，2 小时指单卡 SFT；Windows 支持未确认，通常需 WSL/Linux。 | 与现有 DeepSeek 等推理使用不直接重叠，偏训练学习；需核对本地 GPU 与实验环境。 |
| 9 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 672 | 198809 | 面向编程代理的精简编码与代码审查技能插件。 | 可观望：适合 Codex/Claude Code 的精简编码与审查，但效果依赖提示词和模型，自评基准未经独立验证；对办公文档、知识库帮助有限。 | 需 Claude Code、Codex 或兼容 Agent；插件/npm 或复制 SKILL.md 安装；模型 API 费用另计；Pi Agent 与 Windows 原生兼容性未确认。 | 与现有 Claude Code/Codex 的编码和审查流程重叠，需核对已装技能；对文档与知识库补充有限。 |
| 10 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 573 | 310792 | 多编程代理的技能、记忆、安全与流程增强套件。 | 可观望：可统一多代理的规划、审查、记忆与技能流程，但安装层次多、钩子和全局配置侵入较强，且与现有工具链的冲突需先验证。 | 需 Node.js 18+、Git；Claude Code 插件需 2.1+；模型 API 费另计；ECC Pro 私有仓库 19 美元/席/月；Windows 有说明但兼容性未全面确认。 | 与 Claude Code/Codex 的技能、记忆和审查配置重叠，需核对避免重复安装；补充多代理统一流程。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [elementalsouls/Claude-BugHunter README](https://github.com/elementalsouls/Claude-BugHunter#readme)；最近推送 2026-11-25T23:28:39Z；许可证 MIT
- [cathrynlavery/diagram-design README](https://github.com/cathrynlavery/diagram-design#readme)；最近推送 2026-11-25T04:53:00Z；许可证 MIT
- [firecrawl/firecrawl README](https://github.com/firecrawl/firecrawl#readme)；最近推送 2026-11-26T03:59:40Z；许可证 AGPL-3.0
- [mvanhorn/last30days-skill README](https://github.com/mvanhorn/last30days-skill#readme)；最近推送 2026-11-25T17:59:27Z；许可证 MIT
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-24T23:59:04Z；许可证 MIT
- [zhouxiaoka/autoclip README](https://github.com/zhouxiaoka/autoclip#readme)；最近推送 2026-11-26T03:01:29Z；许可证 MIT
- [mjmirza/app-store-compliance README](https://github.com/mjmirza/app-store-compliance#readme)；最近推送 2026-11-26T03:40:58Z；许可证 NOASSERTION
- [jingyaogong/minimind README](https://github.com/jingyaogong/minimind#readme)；最近推送 2026-11-23T04:01:07Z；许可证 Apache-2.0
- [DietrichGebert/ponytail README](https://github.com/DietrichGebert/ponytail#readme)；最近推送 2026-11-22T02:31:58Z；许可证 MIT
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-23T04:55:48Z；许可证 MIT
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

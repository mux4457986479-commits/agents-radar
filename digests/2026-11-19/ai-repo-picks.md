# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-19

采集时间：2026-11-19T03:22:18.500Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) | 1524 | 4388 | 多智能体自动生成AI论文与LaTeX稿件，含文献检索和图表。 | 不建议配置：面向学术论文写作，与办公文档、工程审查和知识库场景偏离；数据集未随仓库提供，且依赖多家模型API。 | 需Python 3.11与Conda；配置OpenAI/Gemini/Semantic Scholar等API密钥；数据集未包含；Windows原生与WSL/Docker支持未确认；硬件未确认。 | 与现有编码代理重叠有限，仅多智能体编排和文献整理可参考；需核对知识库流程。 |
| 2 | [pingdotgg/t3code](https://github.com/pingdotgg/t3code) | 1220 | 65365 | 统一控制Claude Code、Codex等编码代理，支持桌面与手机远程操作。 | 值得配置：直接覆盖你已用的Codex、Claude Code和Pi，可在Windows统一管理线程、审批命令并远程接管，提升多代理自动化效率。 | Windows有桌面安装包及winget/PowerShell安装方式；需至少一个已登录的编码代理；远程连接可用局域网/Tailscale；不转售token，模型费用随原代理；硬件未确认。 | 与现有Codex、Claude Code、Pi使用强重叠，主要补充统一界面、移动审批和Git工作树管理；需核对已有配置。 |
| 3 | [dream-num/univer](https://github.com/dream-num/univer) | 1152 | 29909 | 可嵌入产品的 Office 表格与文档编辑 SDK | 可观望：适合自建办公文档编辑或让代理操作表格、文档；但需开发集成，不能直接替代现有办公与审查流程。 | 需 Node.js ≥22.18 与 pnpm；Windows 原生兼容未确认；Server/AI SDK 为商业授权；硬件与 API 收费未确认。 | 补充办公文档编辑与计算 SDK；需核对现有文档和知识库自动化流程，非即用型代理。 |
| 4 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 1108 | 306622 | 面向多种编程代理的技能、记忆与审查编排系统 | 可观望：与现有 Claude Code、Codex 的工程审查和自动化场景贴近，但会写入插件与 hooks，需先审查安全、冲突和回滚。 | 需 Node.js 18+、Git；Claude Code 插件需 2.1+；Windows 有 PowerShell 安装说明；DeepSeek、Pi 兼容与 API 费用未确认。 | 与 Claude Code、Codex 的编排、记忆和审查重叠；需核对已有插件与 hooks，避免重复配置。 |
| 5 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 1059 | 70121 | 跨 Reddit、X、YouTube 等平台检索近 30 天信息并生成摘要的代理技能 | 可观望：可用于知识库外部调研，但主要面向社交舆情与热点，和办公文档、工程审查直接关联弱，且多源需额外密钥。 | 需 Node/npx 或 Python 3.12+；多源需 X、ScrapeCreators、Brave 等密钥，部分付费；Windows 原生兼容未完全确认。 | 与 Codex/Claude Code 的联网检索可能重叠；补充社交平台近 30 天信号，需核对已有搜索技能。 |
| 6 | [obra/superpowers](https://github.com/obra/superpowers) | 822 | 321395 | 为编码代理提供头脑风暴、计划、TDD 和子代理开发流程的技能框架 | 值得配置：支持 Codex、Claude Code 和 Pi，可规范工程实现与审查流程；但偏软件开发，对办公文档和知识库增益有限。 | 依赖现有编码代理和插件/脚本；Shell 安装的 Windows 原生兼容未确认，可能需 WSL/Git Bash；无额外硬件或 API 收费证据。 | 与 Codex/Claude Code/Pi 现有技能和工作流可能重叠，需核对已装插件；补充规划、TDD 和子代理流程。 |
| 7 | [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | 821 | 3851 | 用 Docker 沙箱编排 Codex、Claude Code 等编码代理，并加入人工审批的软件交付工作流。 | 可观望：与工程审查和自动化契合，但需自托管 Docker 且 Windows 安装未确认，建议先小范围验证再定。 | Docker/Compose、Python 3、Git、网络；模型 API 另付费；PR 需 GitHub 等；README 未列 Windows 原生安装，硬件未确认。 | 与 Codex/Claude Code 互补，增加多代理编排、审批门和运行记录；需核对现有自动化配置。 |
| 8 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 737 | 118501 | 面向编码代理的前端设计技能，提供版式、素材和浏览器检查，减少通用 AI 页面。 | 不建议配置：主要改善公司网站和落地页视觉，与办公文档、工程审查、知识库和自动化主线关联弱，除非有网页交付。 | Node 22+、Chrome/Edge/Chromium；可选 ffmpeg；无需 API Key；Windows 需 Git Bash 安装，兼容性未完全确认。 | 与 Codex/Claude Code 技能机制重叠，补充网页视觉规范；对现有文档与审查流程帮助有限。 |
| 9 | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 687 | 66514 | 从零训练64M小语言模型的教学型全流程代码 | 可观望：偏LLM原理学习与训练实验，未体现办公文档、工程审查、知识库或自动化工作流能力；训练调参成本高，不建议作为生产工具直接配置。 | 需Python/PyTorch与NVIDIA GPU训练；README示例为RTX 3090 24GB，Windows原生支持未确认，建议核对Linux/WSL环境；推理依赖需另配，API收费未确认。 | 与Codex、Claude Code、DeepSeek、Pi Agent不直接替代，偏模型训练教学；是否与现有本地推理或训练环境重叠需核对。 |
| 10 | [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | 622 | 54203 | 基于Git差异的AI代码审查CLI，支持行级评论与规则集 | 值得配置：贴合工程审查与自动化，且明确支持Windows、Codex、Claude Code集成；建议先在非关键仓库试用并评估模型API成本与规则误报。 | 需Git≥2.41，npm安装ocr；需配置LLM提供商API密钥，或使用委托模式由宿主代理调用模型；Windows支持已标注，API费用与Docker需求未确认。 | 可作为Codex/Claude Code审查能力的专用补充，形成更稳定的审查流水线；需核对现有审查插件、API配置与CI集成。 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [google-research/paper-orchestra README](https://github.com/google-research/paper-orchestra#readme)；最近推送 2026-11-15T18:08:08Z；许可证 Apache-2.0
- [pingdotgg/t3code README](https://github.com/pingdotgg/t3code#readme)；最近推送 2026-11-19T03:20:50Z；许可证 MIT
- [dream-num/univer README](https://github.com/dream-num/univer#readme)；最近推送 2026-11-19T03:13:11Z；许可证 Apache-2.0
- [affaan-m/ECC README](https://github.com/affaan-m/ECC#readme)；最近推送 2026-11-17T06:41:46Z；许可证 MIT
- [mvanhorn/last30days-skill README](https://github.com/mvanhorn/last30days-skill#readme)；最近推送 2026-11-17T22:37:11Z；许可证 MIT
- [obra/superpowers README](https://github.com/obra/superpowers#readme)；最近推送 2026-11-03T23:24:58Z；许可证 MIT
- [Tencent/LoopForge README](https://github.com/Tencent/LoopForge#readme)；最近推送 2026-11-19T03:08:04Z；许可证 NOASSERTION
- [Leonxlnx/taste-skill README](https://github.com/Leonxlnx/taste-skill#readme)；最近推送 2026-11-08T21:51:50Z；许可证 MIT
- [jingyaogong/minimind README](https://github.com/jingyaogong/minimind#readme)；最近推送 2026-11-18T15:09:40Z；许可证 Apache-2.0
- [alibaba/open-code-review README](https://github.com/alibaba/open-code-review#readme)；最近推送 2026-11-19T02:57:37Z；许可证 Apache-2.0
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

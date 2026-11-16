# 值得配置吗？AI 仓库每日 Top 10 · 2026-11-16

采集时间：2026-11-16T02:01:12.225Z。每日综合榜及 9 个语言榜采样，AI 相关性依据仓库介绍及 topics；去重后按今日新增 Stars 降序取前十。
排序依据为 GitHub Trending 报告的今日新增 Stars；不是总 Stars，也不是全 GitHub 的穷尽排名。建议是基于 README 的初评，未经本机安装验证。

| 排名 | 仓库 | 今日新增 Stars | 总 Stars | 功能简介 | 是否值得配置 | Windows / 成本与前置条件 | 与现有工具的关系 |
| ---: | :--- | ---: | ---: | :--- | :--- | :--- | :--- |
| 1 | [dream-num/univer](https://github.com/dream-num/univer) | 988 | 26050 | 可嵌入的 Office 编辑与表格计算 SDK，含开源 Sheets/Docs 核心。 | 可观望：适合自建办公应用或嵌入编辑、计算的开发场景；普通文档自动化并非开箱即用，商业服务需另授权，投入需评估。 | 本地开发需 Node.js >=22.18 与 pnpm；Web SDK 在浏览器运行。Windows 原生支持未明确，商业 Server/AI SDK 收费未确认。 | 与现有办公文档处理可能重叠；需核对已有文档工具，可作为嵌入式表格/文档引擎补充。 |
| 2 | [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | 866 | 11886 | 本地浏览器审查面，给编码代理的计划、文档和代码差异做标注并回传反馈。 | 值得配置：直接支持 Codex、Claude Code、DeepSeek、Pi，覆盖计划评审、文档标注和代码审查，契合工程审查与知识库流程。 | Windows 可用 PowerShell 安装；Codex 原生 Windows 的 Stop hook 仍属实验性，需手动配置。本地浏览器运行，README 称不收集遥测；硬件与收费未确认。 | 与 Codex、Claude Code、Pi 的审查流程互补，非替代；需核对已有 hooks、插件与评审配置。 |
| 3 | [Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo) | 736 | 2821 | Windows 实时视频超分、降噪、HDR、插帧与采集增强工具。 | 不建议配置：面向游戏、采集卡和视频增强，与办公文档、工程审查、知识库及自动化流程关联弱；热门不构成安装理由，需有视频处理需求再评估。 | Windows 11 x64、DirectX 12、NVIDIA 或 AMD GPU；高分辨率、多图层降噪和插帧会增加显存负载；便携包运行，采集驱动另装；API 收费未确认。 | 与现有办公、编码代理和知识库工具无明显重叠；若已用 OBS、播放器或视频增强工具，需核对功能。 |
| 4 | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 717 | 57003 | 让编码代理通过 MCP 或 CLI 控制并检查 Chrome 的调试与性能工具。 | 值得配置：可补充 Claude Code、Codex 等代理的网页调试、网络检查、截图和性能分析，服务工程审查与自动化；建议先核对现有 MCP 配置。 | 需 Node.js LTS、Chrome 稳定版和 npm；Windows 原生限制未明确说明；需 MCP 客户端或 CLI；默认收集使用统计，CrUX 可关闭；API 收费未确认。 | 补充现有编码代理的浏览器操作；可能与已有 Playwright、Puppeteer 或浏览器 MCP 重叠，需核对配置。 |
| 5 | [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 706 | 5609 | 面向个人投资者的Claude Skills交易复盘与风控工作流 | 不建议配置：与办公文档、工程审查、知识库主线关联弱，且需交易数据与Claude Skills环境；除已有个人投资流程外收益有限。 | Windows原生支持Python 3.11-3.13；基础路径需公开CSV、图表截图或本地文件，部分流程需FMP/FINVIZ/Alpaca；Claude账户要求未完全确认。 | 与现有Claude Code技能生态有补充，但与工程审查、知识库自动化重叠低；需核对个人投资需求。 |
| 6 | [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | 691 | 52152 | 基于确定性流水线与LLM的代码审查CLI及代理插件 | 值得配置：贴合工程审查与自动化，可在Windows用CLI或Claude Code、Codex插件，补足行级定位和多语言规则；需先核对现有审查流程与模型成本。 | Windows原生支持；需Git≥2.41，npm安装需Node（版本未确认）；需配置LLM API或委托宿主代理，费用取决于提供商，硬件未确认。 | 与Codex、Claude Code自带审查重叠，可补确定性规则和行级评论；需核对已有配置。 |
| 7 | [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | 579 | 52928 | 聚合多家免费LLM到OpenAI兼容端点，支持路由与故障转移 | 可观望：适合实验多模型路由，但免费层额度与稳定性有限，README称个人实验用途；处理办公文档与工程审查需评估数据隐私。 | Windows有桌面安装程序，也可用Docker；需自行添加各提供商API key；免费层有配额，实时目录需付费；硬件未确认。 | 与现有Codex、Claude Code、DeepSeek等API接入有重叠，可作统一网关补充；需核对已有密钥与路由配置。 |
| 8 | [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | 423 | 1566 | 自托管编排编码代理，用SOP与人工审批门交付软件 | 值得配置：Local模式可编排Codex、Claude Code等，加入审批与SOP，贴合工程审查自动化；平台模式需Docker，建议先试Local。 | 平台需Docker、Python3；Local需Node.js20+、Python3.8+及编码助手；模型API key自带；Windows原生支持未确认。 | 与已有Codex、Claude Code、Pi等CLI重叠，但提供编排、沙箱与审批补充；需核对现有工作流。 |
| 9 | [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | 355 | 17932 | 标准化智能体与前端应用交互的事件协议及工具链 | 不建议配置：除非计划自建智能体前端，否则不解决办公文档、工程审查、知识库或自动化；会引入前端开发与维护成本 | Node.js/npm 与前端应用；需接入代理后端事件；Windows 可开发但兼容性未确认，硬件与 API 收费未确认 | 与 Codex、Claude Code 等 CLI 不直接重叠；仅补充自建 Agent 前端，需核对现有应用栈 |
| 10 | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 331 | 5984 | 本地 FFmpeg 视频编辑技能，含 MCP 与 42 个工具 | 可观望：与办公文档、工程审查、知识库主线弱相关；只有确有视频转码、字幕或剪辑自动化时才值得接入 | Windows 需 FFmpeg 与 Python；MCP 注意 python3/python 路径差异；可选本地语音模型；无云 API 费用，硬件未确认 | 通过技能/MCP 接入 Codex、Claude Code，非模型替代；需核对已有媒体处理链 |

在 Codex 里问：今天有哪些值得配置的 AI 仓库？或：评估第 3 个仓库是否适合我的电脑。由你决定哪些要配置。

## 证据与采集范围
- [dream-num/univer README](https://github.com/dream-num/univer#readme)；最近推送 2026-11-15T17:20:06Z；许可证 Apache-2.0
- [backnotprop/plannotator README](https://github.com/backnotprop/plannotator#readme)；最近推送 2026-11-16T01:58:55Z；许可证 Apache-2.0
- [Likely7/Veyra-NRVideo README](https://github.com/Likely7/Veyra-NRVideo#readme)；最近推送 2026-11-15T17:14:34Z；许可证 GPL-3.0
- [ChromeDevTools/chrome-devtools-mcp README](https://github.com/ChromeDevTools/chrome-devtools-mcp#readme)；最近推送 2026-11-15T03:06:25Z；许可证 Apache-2.0
- [tradermonty/claude-trading-skills README](https://github.com/tradermonty/claude-trading-skills#readme)；最近推送 2026-11-16T01:52:21Z；许可证 MIT
- [alibaba/open-code-review README](https://github.com/alibaba/open-code-review#readme)；最近推送 2026-11-15T02:41:14Z；许可证 Apache-2.0
- [tashfeenahmed/freellmapi README](https://github.com/tashfeenahmed/freellmapi#readme)；最近推送 2026-11-15T16:25:41Z；许可证 MIT
- [Tencent/LoopForge README](https://github.com/Tencent/LoopForge#readme)；最近推送 2026-11-15T11:05:37Z；许可证 NOASSERTION
- [ag-ui-protocol/ag-ui README](https://github.com/ag-ui-protocol/ag-ui#readme)；最近推送 2026-11-15T02:26:33Z；许可证 MIT
- [kajisho5/ffmpeg-skill README](https://github.com/kajisho5/ffmpeg-skill#readme)；最近推送 2026-11-16T01:08:43Z；许可证 MIT
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

# AI 基础设施日报 2026-08-30

> 生成时间: 2026-08-30 10:40 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施跨项目对比报告 — 2026-08-30

## 1. 生态概览

推理技术栈正处于模型适配（bring-up）阶段：GLM-5.3-Flash、DeepSeek-V4-Flash 和 Qwen 混合架构模型消耗了各 serving 引擎的大部分工程周期；当前最活跃的讨论线程中占主导地位的并非原始吞吐，而是正确性回归。本地/边缘后端（Metal、Vulkan、OpenCL、SYCL）正获得 llama.cpp 异常高强度的调优投入，这表明硬件多样性已成为头等部署关注点。与此同时，Agentic 工作负载暴露出整个生态的共同短板：内存生命周期管理与请求取消（Ollama 中 MLX RSS 增长、SGLang 中僵尸流、LiteLLM 中 MCP 工具劫持）。网关层安全也在加固，cosign 签名镜像和 LiteLLM 中关于 PII 泄露的激烈讨论即为例证。

## 2. 活跃度对比

以下数量反映的是**今日摘要中提到的值得关注的问题/PR**，并非仓库完整总量。

| 项目 | 值得关注的问题 | 值得关注的 PR | 发布状态（24h） |
|---|---|---|---|
| vLLM | 12（含 1 个严重问题，93 条评论） | 11 | 无新版本 |
| SGLang | 24（很多因不活跃被自动关闭） | 18 | 无新版本 |
| llama.cpp | 7 | 23 | **10 个版本**（b10681–b10690） |
| Ollama | 16 | 6 | 无新版本 |
| LiteLLM | 23（2 个安全相关） | 14 | 2 个 RC（v1.100.0-rc.1、v1.99.0-rc.2） |
| Unsloth | 15 | 15 | 无新版本 |

llama.cpp 以约 1 个版本/小时的工程节奏发布；vLLM 和 SGLang 的 PR 动作频繁，但暂未发版。LiteLLM 是唯一有 RC 活动的项目，重点在镜像签名基础设施而非新功能。

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **GLM-5.3-Flash** | ✅ 已支持（#53906），需要 FlashInfer 0.6.18 + 专用镜像；已知在 Ada/sm_89 上有缺口（#54059） | ⚠️ 不支持 FP8 KV（#36830），PP 启动崩溃（#36906）；DP-attn 预热挂起已修复 | 🔶 为 DSV4/GLM 类提出 Sparse-FA 方案（#27970） | 🔶 仅社区需求（#17741） | — |
| **DeepSeek-V4-Flash** | 🔧 启动回归修复（#54400） | — | 🔶 SWIGLU_CLAMP 融合（4×4090 上生成约 2%，PP 1–2%） | — | — |
| **Kimi-K3 / K2.6** | ✅ 已启用 ROCm DCP（#51705）；⚠️ K2.6 推理输出损坏仍未关闭（#42426） | ⚠️ K3 在 NIXL Direct-PD 下输出损坏（#52627） | — | — | — |
| **Qwen 3.5/3.8 混合架构** | — | — | ✅ Qwen3.8-Flash-Next 修复（#27941） | 🔶 云端模型需求（#18128） | ⚠️ GatedDeltaNet + bnb-4bit 崩溃（#9867） |
| **MiMo-V2.5-Pro** | — | 🔧 Ascend 950DT 开发中，MXFP4 experts（#36508） | — | — | — |

**结论：** vLLM 在数据中心 GPU 上服务 GLM-5.3-Flash 这一波模型处于领先，但仅限 Blackwell + 特定 FlashInfer 构建。llama.cpp 在覆盖面广度上领先——没有哪个星期能发出 10 个版本而不触及每个后端。SGLang 是 NPU/AMD（gfx1250、Ascend MXFP4）和扩散图像 serving 的先行者。Unsloth 在新混合架构上落后，崩溃问题阻碍了 AMD 上的 Qwen3.5 QLoRA。

## 4. 性能前沿

优化工作集中在四个领域：

- **KV 缓存与 offload** — SGLang 修复了 HiCache L3 key 冲突（#37058），并正在统一内存读取路径（#34602→#34613）；vLLM 正在增加缓存遥测/所有权（#52067、#53902）；Ollama 的 MLX 8 GiB prefix-cache 预算正在导致 32 GB Mac 上出现 swap（#18131）。
- **Kernel** — llama.cpp 占据主导：Metal FA-vec 按 GPU 调优（M1 Max/M2/M4 Pro）、CPU tiled k-quant + VNNI（**3–7×**）、gfx1201 上的 HIP Q2_0 点积（**33–35%** token 生成）。vLLM 正在攻克融合 temperature softmax（#54417）和 W4A8 INT4→INT8 PTX 加载（#49529）。SGLang 通过偏置吸收（bias absorption）在 Qwen-Image 去噪中削减了 **673 次 BF16 add-kernel 启动中的 224 次**（#37116）。
- **调度与批处理** — vLLM 的 adaptive prefill token 预算 RFC（#52906）和 spec-decode 的 CUDA graph 内存修复（#54418）；SGLang 的投机解码路线图（#23705）；llama.cpp 的 speculative prefill（#27692）。
- **分布式 serving** — vLLM 的可选 `execute_model` RPC 快速路径（#54406）和多进程 TP；SGLang 通过 `CustomAllReduceV2`（#36680）实现 diffusion TP 集合通信。LiteLLM 位于集群（fleet）层面，修复了独立的 RPM/TPM 限流窗口（#38523），以及一个在负载下导致 seq-scan 的 Postgres spend-log 索引（#35766）。

## 5. 层级定位

| 层级 | 项目 | 定位 |
|---|---|---|
| **Serving 引擎** | vLLM, SGLang | 数据中心级 GPU 推理；vLLM 注重与 CUDA/FlashInfer 的紧密集成，SGLang 则以 prefix-cache/radix + diffusion + NPU/AMD 广度为特色。两者都在投入 PD 分离和 KV offload。 |
| **本地 / 边缘运行时** | llama.cpp | 可移植性基线——后端矩阵最广（CPU、Metal、Vulkan、OpenCL、SYCL、HIP）。它不是 serving 平台，但越来越可嵌入并具备投机解码能力。 |
| **本地部署 UX** | Ollama | 直接构建在 llama.cpp + MLX 之上；竞争点在于开箱即用体验、桌面/CLI/API 兼容性和模型可发现性，而非 kernel 工作。 |
| **网关 / 控制面** | LiteLLM | 与供应商无关的路由、成本追踪、认证/SSO、限流。完全不涉及 GPU 工作——其前沿是多租户安全、路由正确性和供应商归一化。 |
| **训练 / 微调** | Unsloth | QLoRA 微调 + Studio 桌面端；日益横跨推理领域（serving、`/v1/models`、GGUF 导出），但其核心价值仍是消费级/AMD 硬件上的内存高效训练。 |

## 6. 趋势信号

1. **混合架构模型（GatedDeltaNet、sparse-MLA、DSpark）成为新的压力测试。** GLM-5.3-Flash 在 vLLM 中需要特定 FlashInfer 版本 + 专用 Docker 镜像，SGLang 中 FP8 KV 故障，Unsloth 在 bnb-4bit 下崩溃。在这些模型达到生产安全之前，预计还需要数周的稳定化收尾时间。
2. **正确性已取代速度成为主导关注点。** Kimi-K2.6 的 `!!!!!!!!!!` 推理输出损坏问题（#42426）已有 93 条评论且未修复；SGLang 的 `fast_topk_v2` 可能静默返回错误结果（#36807）；llama.cpp 为未量化 K-cache 的 context shift 发布了崩溃修复（b10690）。采用新模型版本时请验证输出。
3. **Agentic 工作负载正暴露出内存生命周期方面的技术债。** Ollama 的 MLX runner 每个请求增长约 0.15 GiB，且不释放 KV；SGLang 在客户端断开后仍让僵尸请求继续解码到 `max_tokens`；LiteLLM 的 MCP 自动执行会劫持 Claude Code 工具调用。Agent 开发者应将内存边界、断连处理和工具调用路由视为部署风险，而非边缘情况。
4. **边缘硬件多样性正在加速。** llama.cpp 的按 GPU Metal 调优、Adreno/OpenCL matmul 工作、SGLang 中的 gfx1250 适配，以及 Ascend MXFP4 支持，都指向一个“GPU”意味着许多不同事物的世界。多后端可移植性正在成为竞争护城河。
5. **网关安全态势正在上升。** LiteLLM 现在对所有 Docker 镜像进行 cosign 签名，但仍有一个未认证的 `/metrics` 端点会暴露多租户提示词（#24530），以及一份未回应的公开漏洞报告（#38889）。任何运行多租户代理的人都应立即设置 `require_auth_for_metrics_endpoint: true`。
6. **未来 30 天的关注事项：** vLLM 中对 FlashInfer 0.6.18 的耦合（自定义构建的升级风险）、Rust 前端 parity 路线图（#44280）、SGLang 的 HiCache 分离一致性闭环（#22607），以及 llama.cpp 的 CPU k-quant tiled mul_mat（3–7× 的说法——如果合并顺利，将重塑纯 CPU 推理的经济性）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-08-30

## 今日要点

今日的主要动态是模型接入和回归修复：**GLM-5.3-Flash** 支持 PR (#53906) 与 **FlashInfer 0.6.18** 升级 (#54313) 正在同步推进，同时两个独立修复分别处理推测解码的 CUDA 图内存回归 (#54418) 和 DeepSeek-V4-Flash 的启动回归 (#54400)。稳定性方面，长期存在的 **Kimi-K2.6 推理输出损坏** 问题 (#42426) 仍是最活跃的线程，已有 93 条评论；调度器卡死 bug (#53130) 以及 EngineCore 退出码掩盖问题 (#48966) 是值得关注的可用性风险。Rust 前端对齐路线图 (#44280) 也有更新，使实验性的 `VLLM_USE_RUST_FRONTEND=1` 路径继续受到关注。

## 版本发布与破坏性变更

过去 24 小时内没有新的 vLLM 版本发布。今天也没有合并任何破坏性 API/配置变更。对于自定义镜像构建，FlashInfer 0.6.18 依赖升级 (#54313) 值得跟踪。

## 新模型与硬件支持

- **GLM-5.3-Flash 支持** — [PR #53906](https://github.com/vllm-project/vllm/pull/53906) 增加了对 `zai-org/GLM-5.3-Flash` 的支持；需要 FlashInfer v0.6.18 以及专门的 `glm53-flash` Docker 镜像。
- **FlashInfer 0.6.18 升级** — [PR #54313](https://github.com/vllm-project/vllm/pull/54313) 升级了 FlashInfer，这是 GLM-5.3-Flash 路径所必需的。
- **ROCm：Kimi-K3 DSpark 解码上下文并行** — [PR #51705](https://github.com/vllm-project/vllm/pull/51705) 在 ROCm 上为 Kimi-K3 + DSpark 启用了 DCP。
- **ROCm：共享专家多流重叠** — [PR #51117](https://github.com/vllm-project/vllm/pull/51117) 将 `MULTI_STREAM_OVERLAPPED` MoE 路径扩展到 ROCm。
- **视频嵌入前端支持** — [PR #54242](https://github.com/vllm-project/vllm/pull/54242) 为 Python 前端添加了视频嵌入输入支持，使 EPD 工作流可以使用视频输入。
- **已知缺口：** GLM-5.3-Flash 目前缺少在 Ada/sm_89 上的稀疏 MLA 注意力路径 — [Issue #54059](https://github.com/vllm-project/vllm/issues/54059)。

## 性能与优化

- **针对推测解码的 CUDA 图内存安全** — [PR #54418](https://github.com/vllm-project/vllm/pull/54418) 修复了 #50488 引入的内存回归，将默认 CUDA 图捕获大小保持在既定上限内（H200 上为 512，数据中心 Blackwell 上为 1024），同时保留了推测解码的大小调整工作。
- **采样器 softmax 中的融合温度缩放** — [PR #54417](https://github.com/vllm-project/vllm/pull/54417) 在仅设置 `top_k` 或 `top_p` 时将温度合并到 FlashInfer softmax 中，避免了对 `[num_tokens, vocab_size]` 的完整读-改-写遍历。
- **多进程 TP 的更快 `execute_model` RPC** — [PR #54406](https://github.com/vllm-project/vllm/pull/54406) 将调度器广播打包为带有 `array('i)` 列表的固定元组结构，通过 `VLLM_TP_EXECUTE_MODEL_FAST_PATH` 选择启用。
- **W4A8 INT4→INT8 内核加载** — [Issue #49529](https://github.com/vllm-project/vllm/issues/49529) 提议采用 PTX 9.4 `ldmatrix.s8.s4` 在 W4A8 路径中实现硬件加速的 INT4 到 INT8 扩展。
- **自适应 prefill token 预算** — [RFC #52906](https://github.com/vllm-project/vllm/issues/52906) 提议让 `max_num_batched_tokens` 根据调度压力自适应调整。
- **FA3 的级联注意力启发式规则** — [Issue #15647](https://github.com/vllm-project/vllm/issues/15647) 仍然开放，用于更新性能启发式规则。

## 稳定性与回归

按严重程度排序；如有修复则会注明。

- **严重 — Kimi-K2.6 推理内容损坏** — [Issue #42426](https://github.com/vllm-project/vllm/issues/42426)：推理字段中偶发地只输出 `!!!!!!!!!!`，且 `content null`；已有 93 条评论，尚未关联修复 PR。
- **高 — 调度器永久卡死** — [Issue #53130](https://github.com/vllm-project/vllm/issues/53130)：当 running + skipped_waiting/deferred 达到 `max_num_seqs` 后，调度器停止接受请求，而引擎仍报告健康状态；只有重启才能恢复。
- **高 — EngineCore 崩溃以状态码 0 退出** — [Issue #48966](https://github.com/vllm-project/vllm/issues/48966)：意外的 EngineCore 退出可能使服务进程以正常方式退出，使 `Restart=on-failure` 守护配置失效。
- **高 — GB10 上 CPU 卸载死锁** — [Issue #53960](https://github.com/vllm-project/vllm/issues/53960)：在单 GPU sm_121 上，`VLLM_PLE_CPU_OFFLOAD=1` 在内核预热阶段卡住。
- **中 — DFlash2 + YaRN 前缀缓存未命中** — [Issue #54094](https://github.com/vllm-project/vllm/issues/54094)：完全相同的 1.04M-token prompt 没有获得任何前缀缓存复用，而仅 target 模式下复用了约 1.039M token。
- **中 — PD 分离部署中 Kimi-K3 输出损坏** — [Issue #52627](https://github.com/vllm-project/vllm/issues/52627)：使用 NIXL Direct-PD + MooncakeStoreConnector 时出现偶发乱码输出。
- **中 — GLM-5.3-Flash 非法内存访问** — [Issue #54317](https://github.com/vllm-project/vllm/issues/54317)：在 4×B200 上，三个无关内核反复出现 CUDA 非法内存访问。
- **正在推进的修复：**
  - [PR #54400](https://github.com/vllm-project/vllm/pull/54400)（已关闭）通过移除 `SparseAttnIndexer` 中的全局配置查找，修复了 DeepSeek-V4-Flash 的启动回归。
  - [PR #54416](https://github.com/vllm-project/vllm/pull/54416) 避免了 pipeline-parallel 草稿模型中的 `fastsafetensors` 死锁。
  - [PR #54386](https://github.com/vllm-project/vllm/pull/54386)（已关闭）撤销了对 MLA 模型的 Nixl PD DCP 支持，转而采用更窄的修复。

## 对应用开发者的意义

- 如果你在服务 **Kimi-K2.6**，请针对 `!!!!!!!!!!` 损坏 bug（#42426）验证推理字段；该问题仍然存在，且尚未有公开修复。
- **GLM-5.3-Flash** 正在逐步可用，但与特定的 FlashInfer 版本和 Docker 镜像紧密耦合（#53906、#54313）；在非 Blackwell 硬件上预计会遇到不完善之处（#54059、#54317）。
- **H200/Blackwell 上的推测解码用户**如果因默认图捕获大小扩大而遇到 CUDA OOM，应合入 PR #54418。
- **生产环境运维人员**应针对 EngineCore exit-0 问题（#48966）审查守护进程配置，并为调度器卡死场景（#53130）添加看门狗/健康指标。
- **KV 卸载用户**将获得更好的可观测性：KV 缓存事件所有权（#52067）、元数据保留（#52068）、CPU 层容量指标（#53902）以及 KVCR 二级层适配器（#53624）都正在推进中。
- **Rust 前端**持续向 Python API 对齐（#44280）；它仍处于实验阶段，由 `VLLM_USE_RUST_FRONTEND=1` 控制，但值得关注，因为它可以降低服务开销。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 文摘 — 2026-08-30

## 今日亮点

HiCache 正确性成为今日主线：[#37058](https://github.com/sgl-project/sglang/pull/37058) 将 L3 存储键限定到请求缓存命名空间内，以防止跨请求冲突；[#37095](https://github.com/sgl-project/sglang/pull/37095) 移除了冗余的并行 KV-event 哈希链；针对分离式预填充的高优先级 HiCache 一致性计划（[#22607](https://github.com/sgl-project/sglang/issues/22607)）现已关闭。在 kernel 层面，Qwen-Image 扩散相关工作持续合入：通过吸收输出投影偏置，在 GB300 上每个 denoiser 步骤减少了 673 次 BF16 add-kernel 启动中的 224 次（[#37116](https://github.com/sgl-project/sglang/pull/37116)）。GB10 与 GLM-5.3-Flash 上的稳定性问题依然存在——长 prefill 可能在没有 traceback 的情况下静默杀死 worker rank（[#36941](https://github.com/sgl-project/sglang/issues/36941)），且 GLM-5.3-Flash 的 FP8 KV-cache / PP 路径仍然不可用（[#36830](https://github.com/sgl-project/sglang/issues/36830)、[#36906](https://github.com/sgl-project/sglang/issues/36906)）。

## 版本发布与破坏性变更

过去 24 小时内没有新版本发布。

## 新模型与硬件支持

- **Ascend 950DT 上的 MiMo-V2.5-Pro（进行中）**：[#36508](https://github.com/sgl-project/sglang/pull/36508) 为 NPU 添加了 MXFP4 专家检测（`store_dtype == "mxfp4"`）以及逐专家 `weight_scale` → `weight_scale_inv` 映射。
- **ROCm 10 上的 AMD gfx1250**：在 [#36871](https://github.com/sgl-project/sglang/pull/36871) 中开展高优先级 bring-up。
- **ROCm/HIP DSA head-gate 辅助函数**：[#37118](https://github.com/sgl-project/sglang/pull/37118) 在 HIP 上定义了 `logits_head_gate_graph` / `scale_head_gate_graph`，此前它们未被绑定，会在调用点崩溃。
- **OpenPangu 2.0 Flash 支持** 曾有人请求（[#29746](https://github.com/sgl-project/sglang/issues/29746)），但因不活跃被自动关闭。

## 性能与优化

- **Qwen-Image 偏置吸收**：[#37116](https://github.com/sgl-project/sglang/pull/37116) 将四个逐块输出投影偏置折叠进残差路径，在 GB300 上，每个经过性能剖析的 denoiser 步骤减少了 673 次 BF16 add-kernel 启动中的 224 次（约 33%）。
- **Qwen-Image TP 集合通信**：[#36680](https://github.com/sgl-project/sglang/pull/36680) 将 diffusion 的 TP 集合通信路由到 SRT 自定义 all-reduce 调度器（允许 24 MiB 行并行输出进入 `CustomAllReduceV2`），并融合了三个小型 attention kernel。
- **Diffusion VAE 流式加载**：[#37004](https://github.com/sgl-project/sglang/pull/37004) 在 meta 设备上构建原生 VAE / `video_vae`，并将 safetensors 直接分配到常驻 GPU，避免了完整的主机暂存。
- **统一内存读路径**：由 [#34602](https://github.com/sgl-project/sglang/pull/34602)（面向 uniform-row MHA/SWA 的密集 KV 视图）→ [#35245](https://github.com/sgl-project/sglang/pull/35245)（在 `ForwardBatch` 构造时一次性转换 KV 写入位置）→ [#35247](https://github.com/sgl-project/sglang/pull/35247)（读路径上的单一 ID 转换器）→ [#34613](https://github.com/sgl-project/sglang/pull/34613)（为 FA3/FlashInfer/TRTLLM-MHA/FlashMLA 启用后端）组成的系列改动正在进行中。
- **HiCache MLA FP8 在 ROCm 上**：[#37117](https://github.com/sgl-project/sglang/pull/37117) 修复了 read-JIT 对 576 B MLA FP8 行被静默禁用的问题（`element_size % 128 == 0` 检查会拒绝这些行），并重新调整了 block quota。
- **AMD DSV4 统一 KV 大小计算**：[#30315](https://github.com/sgl-project/sglang/pull/30315) 修复了统一 KV 池大小计算和 SWA 每请求 ring 记账，解决了 MI35x 上并发 prefill 期间的 GPU 内存访问故障。
- **投机解码路线图**：面向混合智能体工作负载的自适应投机（[#23705](https://github.com/sgl-project/sglang/issues/23705)）以及进一步基于 Ngram 字典树的支持（[#21052](https://github.com/sgl-project/sglang/issues/21052)）仍然开放。
- **MXFP8 比 BF16 更慢**：在 B200/GB200 上 Qwen3-30B-A3B 的 MXFP8 比 BF16 慢（[#29002](https://github.com/sgl-project/sglang/issues/29002)），该问题因不活跃被关闭。

## 稳定性与回归问题

按严重程度排序：

- **GB10 长 prefill 上的 worker 静默死亡**：[#36941](https://github.com/sgl-project/sglang/issues/36941) — 在 2× DGX Spark 上，GLM-5.3-Flash 的 prefill 超过约 40k token 时会耗尽统一内存；worker rank 在 54k–62k token 之间死亡，没有 traceback、CUDA 错误或 OOM 记录。开放。
- **静默错误的 top-k**：[#36807](https://github.com/sgl-project/sglang/issues/36807) — 当 radix 阈值桶溢出其 4096 项候选缓冲区时（k=2048、长行），`fast_topk_v2` 可能返回不正确的 top-k 集合。开放。
- **僵尸流式请求**：[#36333](https://github.com/sgl-project/sglang/issues/36333) — 断开的客户端会让请求继续解码到 `max_tokens`，刷屏“state was deleted in TokenizerManager”；这是回滚 #34160 导致的回归。开放。
- **多节点 TP rank 分歧死锁**：[#33289](https://github.com/sgl-project/sglang/issues/33289) — 在 2× DGX Spark 上的 DeepSeek-V4 + DSpark：一个 rank 卡在 NCCL proxy append（logits all-gather）中，而另一个 rank 在 request broadcast 处空转。已关闭。
- **GLM-5.3-Flash 问题**：FP8 KV 缓存不受支持（`index_kpool: 4` 排除了 `flashmla_kv`；没有 CUDA DSA 后端处理 bf16-query × fp8-KV）（[#36830](https://github.com/sgl-project/sglang/issues/36830)）；PP 启动崩溃，报错 `KeyError: 'residual'`（[#36906](https://github.com/sgl-project/sglang/issues/36906)）；`--enable-dp-attention` 下的 warmup 挂起已修复/关闭（[#36802](https://github.com/sgl-project/sglang/issues/36802)）。
- **Mamba 驱逐时调度器挂起**：[#30314](https://github.com/sgl-project/sglang/issues/30314) — 在大上下文请求下，事件循环在驱逐期间阻塞，导致服务器挂起和进程被杀。开放。
- **ROCm DSA 冷 prefill 中止**：[#36960](https://github.com/sgl-project/sglang/pull/36960) 将 DSA MQA-logits 预算上限设为 AITER 的 `buffer_store` 限制，修复了 Triton 编译器断言在长冷 prefill 时中止所有 TP rank 的问题。
- **HiCache / PD 正确性**：L3 存储键现在按请求缓存进行命名空间隔离（[#37058](https://github.com/sgl-project/sglang/pull/37058)）；移除了并行 KV-event 哈希链（[#37095](https://github.com/sgl-project/sglang/pull/37095)）；由暂时性 KV 传输错误导致的 `failed_sessions` 残留并持续返回 500 的问题已关闭（[#13054](https://github.com/sgl-project/sglang/issues/13054)）。
- **快速修复 / 小项**：在 `expert_pack` 中延迟导入 `sgl_kernel.quantization`，以支持 XPU/ROCm/NPU（[#37115](https://github.com/sgl-project/sglang/issues/37115)，已关闭）；当 `SGLANG_ENABLE_JIT_DEEPGEMM=0` 时出现 `NameError: deep_gemm`（[#29738](https://github.com/sgl-project/sglang/issues/29738)，开放）；aiter gluon kernel 的 Triton 版本不匹配警告（[#35785](https://github.com/sgl-project/sglang/issues/35785)，开放）。
- **CI 健康状态**：由 [#17050](https://github.com/sgl-project/sglang/issues/17050) 跟踪 — 2 个损坏，5 个不稳定，879 个近期已修复。单元测试覆盖率扩展由 [#20865](https://github.com/sgl-project/sglang/issues/20865) 跟踪。
- 若干较旧的 AMD/NPU/PD bug（[#29347](https://github.com/sgl-project/sglang/issues/29347)、[#29785](https://github.com/sgl-project/sglang/issues/29785)、[#29725](https://github.com/sgl-project/sglang/issues/29725)、[#29695](https://github.com/sgl-project/sglang/issues/29695)、[#29748](https://github.com/sgl-project/sglang/issues/29748)、[#25587](https://github.com/sgl-project/sglang/issues/25587)）因不活跃被自动关闭。

## 对应用开发者的意义

- **对 GB10 级别硬件上的长 prefill 保持谨慎**：约 54k token 以上出现的 worker 静默死亡（[#36941](https://github.com/sgl-project/sglang/issues/36941)）意味着统一内存压力可能在没有可捕获错误的情况下杀死 rank。请自行监控主机/统一内存，并在修复落地前将 prefill 分块保持在约 40k token 以下。
- **流式取消的卫生习惯**：客户端断开目前会让僵尸请求继续运行到 `max_tokens`（[#36333](https://github.com/sgl-project/sglang/issues/36333)）。应强制客户端超时，并在回归修复前将“state was deleted in TokenizerManager”日志视为预期的噪音信息。
- **GLM-5.3-Flash 采用**：FP8 KV 缓存不可用（如果必须使用 FP8，请停留在 GLM-5.2 或 BF16 KV），并且 PP 部署在启动时崩溃；DP-attention warmup 挂起已修复，但在部署前请对照最新镜像进行验证（[#36830](https://github.com/sgl-project/sglang/issues/36830)、[#36906](https://github.com/sgl-project/sglang/issues/36906)）。
- **HiCache 多租户部署**：L3 键命名空间修复（[#37058](https://github.com/sgl-project/sglang/pull/37058)）堵住了一类真实的跨命名空间缓存冲突问题——值得升级任何共享 KV offload 基础设施。
- **Diffusion / Qwen-Image 服务**：TP 集合通信和偏置折叠工作预计会带来可观的延迟改善，此外还有新的 `--component-precisions.<component>` 覆盖项和 fail-closed 组件执行（[#36991](https://github.com/sgl-project/sglang/pull/36991)、[#37049](https://github.com/sgl-project/sglang/pull/37049)）——这是验证 nightly 镜像的好时机。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 文摘 — 2026-08-30

## 今日亮点

llama.cpp 发布了一批密集的后端调优版本（b10681–b10690），主要是针对 M1 Max/M2/M4 Pro 的 Metal FA-vec 调优以及 OpenCL Adreno matmul 改进。最重要的正确性修复在 b10690 中落地，防止了未量化 K-cache 在上下文移位期间崩溃。值得关注的进行中工作包括 `SWIGLU_CLAMP` 内核融合、3–7x CPU 分块 k-quant mul_mat 路径，以及投机式预填充。

## 版本发布与破坏性变更

- **b10690** — 通过仅在分配了缓冲区时才将 Hadamard 矩阵复制到 `k_rot`，修复了一个崩溃，特别保护了未量化 K-cache 的上下文移位。 [#27967](https://github.com/ggml-org/llama.cpp/pull/27967)
- **b10689** — `ggml_graph_optimize` 现在接受分配器依赖项，从而能更好地处理分配依赖关系。 [#27301](https://github.com/ggml-org/llama.cpp/pull/27301)
- **b10688 / b10685 / b10682** — 分别为 M2、M4 Pro 和 M1 Max 的 Metal FA-vec 调优。 [#27940](https://github.com/ggml-org/llama.cpp/pull/27940) [#27915](https://github.com/ggml-org/llama.cpp/pull/27915) [#27932](https://github.com/ggml-org/llama.cpp/pull/27932)
- **b10687** — OpenCL：在两代 Adreno GPU 上提供更好的 matmul 路径；默认在 X2E 上启用 Adreno xmem F16×F32 GEMM。 [#27640](https://github.com/ggml-org/llama.cpp/pull/27640)
- **b10686** — Metal：添加了共享内存填充断言，以便尽早捕获无效内核配置。 [#27951](https://github.com/ggml-org/llama.cpp/pull/27951)
- **b10684** — SYCL `--fit` 现在会考虑给定上下文大小下所需的峰值 VRAM，从而准确遵循 `--fit-target`。 [#27629](https://github.com/ggml-org/llama.cpp/pull/27629)
- **b10683** — Vulkan：合并了重复的 `fastdiv` 辅助函数。 [#27526](https://github.com/ggml-org/llama.cpp/pull/27526)
- **b10681** — Vulkan `mul_mat_id` 现在对 K 而不是 N 进行填充，避免间接行查找中 K 越界。 [#27925](https://github.com/ggml-org/llama.cpp/pull/27925)

这批版本没有宣布任何面向用户的 API 或配置迁移。

## 新模型与硬件支持

- Metal FA-vec 调优已落地，覆盖 M1 Max、M2、M4 Pro 和 M2 Max（后者在开放 PR 中）。 [#28015](https://github.com/ggml-org/llama.cpp/pull/28015)
- Vulkan TQ1_0 支持（1.6875 bpw 三值类型）正在进行中，覆盖 mm、mat-vec、mat-vec-id、dequant 和 get_rows。 [#27765](https://github.com/ggml-org/llama.cpp/pull/27765)
- 针对 DSV4/GLM 的 Sparse-FA 已提出，利用每个 token 最大活跃 KV 条目数的提示。 [#27970](https://github.com/ggml-org/llama.cpp/pull/27970)
- 针对嵌入大小 384、640、768 和 1280 的 SYCL FWHT Kronecker 积支持正在审查中。 [#28016](https://github.com/ggml-org/llama.cpp/pull/28016)
- Qwen3.8-Flash-Next 的后续修复解决了序列索引器丢失及其他正确性问题。 [#27941](https://github.com/ggml-org/llama.cpp/pull/27941)

## 性能与优化

- 用于 DSV4/GLM 模型的 SWIGLU_CLAMP 融合：在 4×4090 上，token 生成提升约 2%，提示处理提升约 1–2%。 [#27930](https://github.com/ggml-org/llama.cpp/pull/27930)
- 使用 VNNI 的 k-quants CPU 分块 mul_mat 报告 CPU mul_mat 速度提升 3–7x。 [#27851](https://github.com/ggml-org/llama.cpp/pull/27851)
- 在 gfx1201 上使用原生 AMD 字节置换的 HIP Q2_0 点积，使 token 生成提升约 33–35%。 [#26753](https://github.com/ggml-org/llama.cpp/pull/26753)
- RDNA3/RDNA4 MMQ 配置调优和 RDNA3 路由 MoE N-tile 尺寸调整均在进行中。 [#26284](https://github.com/ggml-org/llama.cpp/pull/26284) [#24546](https://github.com/ggml-org/llama.cpp/pull/24546)
- 用于行元素数 >1024 的 ROCm radix TOP_K 已可合并。 [#27466](https://github.com/ggml-org/llama.cpp/pull/27466)
- KV 单元序列扫描提前退出可减少随上下文增长而出现的生成变慢，已拆分为独立 PR。 [#28011](https://github.com/ggml-org/llama.cpp/pull/28011)
- 基于 ICML 2025 工作的投机式预填充实现，旨在降低 TTFT。 [#27692](https://github.com/ggml-org/llama.cpp/pull/27692)

## 稳定性与回归问题

- Vulkan GATED_DELTA_NET 流水线在 gfx1103（RADV 780M）上编译挂起，导致 llama-server 无法进入监听状态。 [#27998](https://github.com/ggml-org/llama.cpp/issues/27998)
- Linux 上报告：运行 Qwen3.8-27B Q6_K 时出现 RTX 5090 显示丢失 / NVIDIA GSP 重置。 [#27910](https://github.com/ggml-org/llama.cpp/issues/27910)
- CUDA graphs 仍会导致 RTX 5090 Laptop（sm_120）挂起；`GGML_CUDA_DISABLE_GRAPHS=1` 仍是完整的规避方案。 [#27330](https://github.com/ggml-org/llama.cpp/issues/27330)
- SYCL 多 GPU 在 Intel Arc Pro B50 + Arc A770 上崩溃。 [#27888](https://github.com/ggml-org/llama.cpp/issues/27888)
- MTP 请求间状态泄漏导致 Qwen3.6-35B-A3B-MTP 产生非确定性输出。 [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- AMD RADV/gfx1151 上预填充期间的 draft-mtp DeviceLost 问题仍未解决。 [#27306](https://github.com/ggml-org/llama.cpp/issues/27306)
- 已在 b10690 中修复：由无条件 Hadamard 复制导致的未量化 K-cache 上下文移位崩溃。 [#27967](https://github.com/ggml-org/llama.cpp/pull/27967)
- llama-ui：b10687 中桌面端的推理级别选择菜单损坏。 [#27981](https://github.com/ggml-org/llama.cpp/issues/27981)

## 这对应用开发者意味着什么

- 如果你服务未量化 K-cache 模型并使用上下文移位，请升级到 b10690；该崩溃修复风险很低。
- 使用 M 系列硬件的 Metal 用户无需更改应用即可获得更好的 FA-vec 行为；M2 Max 调优合并后也会跟进。
- SYCL 用户应在 b10684 之后于多 GPU 和 Intel 环境中重新测试 `--fit`——适配决策现在能更准确地反映真实上下文大小对应的 VRAM。
- 如果你在 RTX 5090 级硬件上使用 CUDA graphs，请在 graph/挂起问题仍未解决期间保留 `GGML_CUDA_DISABLE_GRAPHS=1` 作为缓解手段。
- AMD RADV 上的 MTP / draft-speculative 解码仍然脆弱；在该技术栈上使用 `--spec-type draft-mtp` 的应用应提供禁用 MTP 的回退路径。
- CPU k-quant 分块 mul_mat 与 SWIGLU_CLAMP 这两个 PR 值得关注：合并后它们将带来显著的 CPU 与 dense-MoE 吞吐量提升。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-30

## 今日亮点

过去 24 小时内没有 release 被打上标签。最值得关注的信号是一批 Apple Silicon 上 MLX 运行器的内存问题：每次请求的常驻内存增长，加上固定 8 GiB 的前缀缓存预算，导致 agent 工作负载期间出现数 GB 的 RSS 增长和 swap。修复方面，针对集成 Vulkan/Virtio-GPU 模型加载回归的 PR 已经提交，面向嵌套 `required` 工具属性的 API schema 校验工作也正在进行中。

## 发布与破坏性变更

过去 24 小时内无。

## 新模型与硬件支持

- 没有新的模型/后端 release 被打上标签。
- 社区对 GLM-5.3 支持 ([#17741](https://github.com/ollama/ollama/issues/17741)) 以及将 `qwen-3.8 Flash` 加入云模型 ([#18128](https://github.com/ollama/ollama/issues/18128)) 的需求仍在持续。
- 硬件方面：PR [#18124](https://github.com/ollama/ollama/pull/18124) 将集成 Vulkan GPU 切换到直接 I/O，以匹配 CUDA/ROCm 行为。该 PR 针对 Virtio-GPU/Venus 虚拟机环境，0.32.10+ 在这些环境中破坏了模型加载。

## 性能与优化

- 缓存提示词指标：PR [#16916](https://github.com/ollama/ollama/pull/16916) 在 `/api/generate`、`/api/chat`、OpenAI 兼容接口和 Anthropic `/v1/messages` 的响应中新增了 `cache_n` / 缓存 token 计数。可用于衡量前缀缓存命中率。
- MLX 内存效率仍是首要性能问题：
  - [#17924](https://github.com/ollama/ollama/issues/17924)：固定上下文下，每次请求常驻内存增长约 0.147 GiB，在约 28.5 GiB 处趋于平稳 (macOS, M4 Pro)。
  - [#16698](https://github.com/ollama/ollama/issues/16698)：MLX KV 缓存在请求之间未释放；内存从约 24 GB 增长到 75 GB，并导致 32 GB swap。
  - [#18131](https://github.com/ollama/ollama/issues/18131)：硬编码的 8 GiB MLX 前缀缓存，在 `qwen3.8:27b-mlx` agent 工作负载下，导致 32 GB Apple Silicon Mac 出现严重 swap。
- iGPU 内存缩减：[#14953](https://github.com/ollama/ollama/issues/14953) 提议降低固定 457 MiB 的 `MinimumMemory` 预留、增加内存压力保护，并限制共享内存 iGPU 上的并发模型数。
- GGUF 解析器修复：[#18130](https://github.com/ollama/ollama/pull/18130) 将 `general.alignment` 正确读取为 uint32，而不是静默回退到 32 字节对齐。
- 终端进度渲染：[#17864](https://github.com/ollama/ollama/pull/17864) 只追踪可见的已渲染行，避免长时间操作期间擦除终端历史记录。

## 稳定性与回归问题

按严重程度排序：

1. **MLX 内存增长 / swap 风险** — 多个 issue 报告了 KV 缓存未释放和前缀缓存增长。[#16698](https://github.com/ollama/ollama/issues/16698)、[#17875](https://github.com/ollama/ollama/issues/17875) 和 [#17924](https://github.com/ollama/ollama/issues/17924) 已关闭，但 [#18131](https://github.com/ollama/ollama/issues/18131) 仍处于打开状态，并指出固定 8 GiB 前缀缓存仍会导致 32 GB 机器出现严重 swap。目前还看不到上游修复 PR。
2. **集成 Vulkan / Virtio-GPU 模型加载回归** — [#18123](https://github.com/ollama/ollama/issues/18123)：0.32.10+ 在 Virtio-GPU DRM 上下文下等待 `llama-server` 启动时超时；0.32.9 正常。修复 PR：[#18124](https://github.com/ollama/ollama/pull/18124)。
3. **调度器以默认上下文重启 llama-server** — [#18129](https://github.com/ollama/ollama/issues/18129)：成功加载后，调度器立即以 4096 上下文重启服务器，导致下一次请求时出现冗余重载 (Windows、AMD RX 9070 XT、`qwen3:8b`)。
4. **大提示词时 Vulkan 缓冲区分配失败** — [#18117](https://github.com/ollama/ollama/issues/18117)：尽管可用显存 >14 GB，通过 API 分配约 900 MB–1 GB 仍失败；同一模型/GPU 上 `ollama run` 却成功。
5. **macOS 上 agent 集成与本地 Qwen 配合时挂起** — [#17839](https://github.com/ollama/ollama/issues/17839)：直接调用 Ollama 和 OpenAI 兼容接口均正常，但 agent 工具调用/流式路径会挂起。
6. **结构化输出截断** — [#18094](https://github.com/ollama/ollama/issues/18094)：`gemma3:12b` 使用 `format` 时，如果源文本包含需要转义的双引号词项，输出会被截断。
7. **工具 schema 的 `required` 对象解析** — [#18051](https://github.com/ollama/ollama/issues/18051)：OpenAI 兼容的 `/v1/chat/completions` 拒绝嵌套的 `required` 对象。修复 PR：[#18140](https://github.com/ollama/ollama/pull/18140)。
8. **UI 草稿丢失** — [#18138](https://github.com/ollama/ollama/issues/18138)：切换聊天时，输入框中未发送的文本会丢失。修复 PR：[#18139](https://github.com/ollama/ollama/pull/18139)。
9. **社区关注度较高的现有/持续问题** — Windows 上 gemma4 的图像处理 ([#16532](https://github.com/ollama/ollama/issues/16532))、Mac 上“Restart to update”需要管理员权限 ([#11972](https://github.com/ollama/ollama/issues/11972))、Markdown/LaTeX 原始源码渲染 ([#15310](https://github.com/ollama/ollama/issues/15310))。

## 对应用开发者的意义

- 如果你在 Apple Silicon 上使用 MLX 模型运行 agent 类工作负载，请密切关注 RSS。当前 8 GiB 前缀缓存预算可能导致 32 GB Mac 出现 swap，而 MLX 每次请求的内存增长问题仍未解决 ([#17924](https://github.com/ollama/ollama/issues/17924)、[#18131](https://github.com/ollama/ollama/issues/18131))。
- OpenAI 兼容工具 schema 中的嵌套 `required` 对象在 [#18140](https://github.com/ollama/ollama/pull/18140) 合入之前会失败；在此期间，可以考虑将条件式的 `required` schema 展平。
- 在集成 Vulkan GPU / 虚拟机环境中，可能需要将 Ollama 锁定在 0.32.9，直到 [#18124](https://github.com/ollama/ollama/pull/18124) 合入。
- 一旦合入，[#16916](https://github.com/ollama/ollama/pull/16916) 将提供缓存命中 token 计数；这是衡量前缀缓存是否有助于降低 agent 循环延迟的正确信号。
- 对于 Gemma 模型的结构化输出/JSON schema 工作流，请验证 `done_reason` 和 `eval_count`；截断看起来可能与正常停止无异 ([#18094](https://github.com/ollama/ollama/issues/18094))。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-30

## 1. 今日亮点

两个发布候选版本 — [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) 和 [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2) — 已发布，重点是 cosign 验证的 Docker 镜像签名。工程方面，正在积极处理 websearch 拦截正确性（重复 kwargs 崩溃、`web_search` 函数名检测）、自动路由器/节省基线计算错误，以及独立的 RPM/TPM 速率限制窗口。两个安全事项值得注意：未认证的 `/metrics` 端点暴露多租户 PII（[#24530](https://github.com/BerriAI/litellm/issues/24530)），以及一个悬而未决的漏洞报告公开跟进（[#38889](https://github.com/BerriAI/litellm/issues/38889)）。此外，v1.98.0 在 Python 3.10 上会破坏 `import litellm`（[#38892](https://github.com/BerriAI/litellm/issues/38892)）。

## 2. 发布与破坏性变更

- [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) 和 [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2)：均为 RC 版本，没有新增功能说明。所有 Docker 镜像均使用 cosign 签名；验证使用与 [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的相同密钥。未宣布迁移或破坏性配置变更。
- [PR #38525（已合并）](https://github.com/BerriAI/litellm/pull/38525)：SSO 设置编辑不再用掩码占位符覆盖 `client_secret`。对于通过 Admin UI 编辑 OIDC 配置的用户，这是一个行为变更。

## 3. 新模型与硬件支持

- [PR #38890](https://github.com/BerriAI/litellm/pull/38890)：JetInfer 作为通过 JSON 配置的 OpenAI 兼容提供商加入 — `jetinfer/*` 路由、成本跟踪和上下文限制。
- [PR #38860](https://github.com/BerriAI/litellm/pull/38860)：为模型成本映射添加了 `elevenlabs/scribe_v2` 音频转录定价（修复 [#33519](https://github.com/BerriAI/litellm/issues/33519)）。
- #33199（已关闭）：`veo-3.1-lite-generate-001` 已添加到 `model_prices_and_context_window.json`。
- [PR #38509](https://github.com/BerriAI/litellm/pull/38509)：新增 `pointfive` 日志回调（批量、gzip 压缩），用于将代理请求日志发送到 PointFive 进行成本分析。
- 没有涉及 CUDA/ROCm/Metal/CPU 或量化格式的工作报告。

## 4. 性能与优化

- [PR #38523](https://github.com/BerriAI/litellm/pull/38523)：RPM 和 TPM 速率限制器现在使用独立的窗口键，消除了窗口边界处的误报 429，并停止了过去在重置后持续数分钟的过期 429。
- [PR #38522](https://github.com/BerriAI/litellm/pull/38522)：`custom_httpx` 现在解析有效超时，而不是传递 `timeout=None`，后者会静默禁用为没有显式超时的处理程序构建的请求超时。
- [#35766（已关闭）](https://github.com/BerriAI/litellm/issues/35766)：`LiteLLM_SpendLogs` 上缺少 `(api_key, startTime)` 索引导致预算窗口支出重新排序时进行 seq-scan 并使 Postgres 饱和（负载下 Prisma P2028）。已关闭 — 修复已落地。
- [PR #38891](https://github.com/BerriAI/litellm/pull/38891)：通过隔离全局 MCP 注册表并将节省测试固定到捆绑成本映射而非网络获取的成本映射，修复了 CI 不稳定问题。

## 5. 稳定性与回归

按严重程度排序：

- **[安全 / 高]** [#24530](https://github.com/BerriAI/litellm/issues/24530)（开放）：`/metrics` 默认未认证，暴露多租户 PII（提示数据）。存在可选开启的 `require_auth_for_metrics_endpoint: true`；尚无修复 PR。
- **[安全 / 高]** [#38889](https://github.com/BerriAI/litellm/issues/38889)（开放）：一位安全研究人员公开报告了一个高影响漏洞，但一个月没有回应。维护者应进行分级处理。
- **[正确性 / 高]** [#38813](https://github.com/BerriAI/litellm/issues/38813)（开放）：派生的自动路由器基线将缺失缓存价格视为免费，导致缓存密集型池定价偏低。修复中：[PR #38875](https://github.com/BerriAI/litellm/pull/38875)。
- **[报告 / 高]** [#38814](https://github.com/BerriAI/litellm/issues/38814)（开放）：独立的自适应路由器和质量路由器省略了节省基线和首轮元数据，导致成本优化报告不完整。UI 修复在 [PR #38888](https://github.com/BerriAI/litellm/pull/38888)。
- **[Python 3.10 阻塞]** [#38892](https://github.com/BerriAI/litellm/issues/38892)（开放）：v1.98.0 从 `typing`（3.11+）导入 `NotRequired`，但发布了 `cp310-abi3` wheel — `import litellm` 在 Python 3.10 上失败。尚无修复 PR。
- **[崩溃]** [#38828](https://github.com/BerriAI/litellm/issues/38828)（开放）：websearch 拦截的 agentic 后续调用因 `acompletion() got multiple values for 'aws_region_name'` 崩溃。修复：[PR #38886](https://github.com/BerriAI/litellm/pull/38886)。
- **[正确性]** [#38831](https://github.com/BerriAI/litellm/issues/38831)（开放）：`is_web_search_tool` 无法识别传统的 `{"type":"function","function":{"name":"web_search"}}` 信封结构。修复：[PR #38864](https://github.com/BerriAI/litellm/pull/38864)。
- **[Agentic 工具]** [#37031](https://github.com/BerriAI/litellm/issues/37031)（开放）：MCP auto-execute 配合 `require_approval: "never"` 会劫持 Claude Code 客户端的 `tool_use`，导致所有非 MCP 工具报 `Error executing tool`。
- **[成本正确性]** [#38823](https://github.com/BerriAI/litellm/issues/38823)（开放）：`vertex_ai` Gemini 嵌入在使用列表输入时只返回一个向量，却对所有输入计费 — 静默 N-1 数据丢失和过度计费。
- **[成本正确性]** [#36168](https://github.com/BerriAI/litellm/issues/36168)（开放）：流式传输在最后一个块包含非空 `choices` 数组时丢弃上游 `usage`；`cached_tokens` 丢失，输入按全价计费。
- **[路由器]** [#38882](https://github.com/BerriAI/litellm/pull/38882)（开放）：fallback 现在根据预路由 hook 选择的层级进行解析，修复了 complexity/auto-router 层级 fallback 链从未运行的问题。
- **[兼容性]** [#29382](https://github.com/BerriAI/litellm/issues/29382)（开放）：`v1.83.14-stable` `linux/arm64` 镜像标签错误 — 包含 amd64 二进制，却在 OCI 配置中声明为 arm64。
- **[兼容性]** [#38339](https://github.com/BerriAI/litellm/issues/38339)（开放）：`/responses` 没有规范化来自 Azure AI/Foundry GPT 模型的 `multi_tool_use.parallel`。
- **[配置]** [#38663](https://github.com/BerriAI/litellm/issues/38663)（开放）：Gemini 3 路由在省略 `temperature` 时被注入 `temperature=1.0`，与 Google 的默认行为冲突。
- **[SSO]** [#38177](https://github.com/BerriAI/litellm/issues/38177)：部分 SSO 编辑时 `client_secret` 被回填 — 已通过合并的 [PR #38525](https://github.com/BerriAI/litellm/pull/38525) 修复。
- **另外已关闭/修复：** Azure Responses API `stream_options.include_usage` 被拒绝（[#28553](https://github.com/BerriAI/litellm/issues/28553)）；Batch API 成本跟踪回归（[#30635](https://github.com/BerriAI/litellm/issues/30635)）；Bedrock `cohere.embed-english-v3` 参数分发（[#38659](https://github.com/BerriAI/litellm/issues/38659)）；AssemblyAI EU 透传（[#28747](https://github.com/BerriAI/litellm/issues/28747)）；`/model/new` 持久化后 500（[#38556](https://github.com/BerriAI/litellm/issues/38556)）；`use_chat_completions_url_for_anthropic_messages` YAML 加载（[#28756](https://github.com/BerriAI/litellm/issues/28756)）。

## 6. 这对应用开发者意味着什么

- **注意你的 Python 版本。** 在 Python 3.10 上，v1.98.0 会在导入时失败（[#38892](https://github.com/BerriAI/litellm/issues/38892)）。除非 LiteLLM 提高 `requires-python`，否则请固定到 1.97.x 或等待修复。
- **在暴露代理之前锁定 `/metrics`。** 默认未认证的端点在多租户部署中是活跃的 PII 泄露（[#24530](https://github.com/BerriAI/litellm/issues/24530)）。设置 `require_auth_for_metrics_endpoint: true`。
- **测试 agentic websearch 路径。** 重复的提供商 kwargs 和无法识别的 `web_search` 函数结构都已由待合并 PR 处理（[#38886](https://github.com/BerriAI/litellm/pull/38886)、[#38864](https://github.com/BerriAI/litellm/pull/38864)）；如果你使用 `websearch_interception`，这些修复对你的后续调用很重要。
- **暂时不要完全相信自动路由器的节省数字。** 缓存密集型池的基线排序定价错误（[#38813](https://github.com/BerriAI/litellm/issues/38813)），自适应/质量路由器缺少节省元数据（[#38814](https://github.com/BerriAI/litellm/issues/38814)）。在 [PR #38875](https://github.com/BerriAI/litellm/pull/38875) 合并前请重新计算预期节省。
- **在 Vertex Gemini 路由上避免使用列表输入嵌入**，直到 [#38823](https://github.com/BerriAI/litellm/issues/38823) 修复 — 你会为 N 个输入付费，但只收到一个向量。
- **MCP + Claude Code 用户：** DCR 桥接信封修复（[#38524](https://github.com/BerriAI/litellm/pull/38524)、[#38326](https://github.com/BerriAI/litellm/pull/38326)）改善了工具列表，但在 agentic 客户端后面使用 `require_approval: "never"` 时，auto-execute 劫持（[#37031](https://github.com/BerriAI/litellm/issues/37031)）仍然是风险。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 文摘 — 2026-08-30

## 1. 今日亮点

过去 24h 没有新版本发布；开发活动集中在 Unsloth Studio 的 bug 修复、CI 加固和多 GPU 正确性方面。一个阻塞多 GPU 训练的设备分片 `index_select` 失败问题已有开放的修复（[#9995](https://github.com/unslothai/unsloth/pull/9995)），同时 Studio 聊天重新生成功能正在加入防护，避免重复用户轮次和附件（[#10000](https://github.com/unslothai/unsloth/pull/10000)）。性能方面，`/v1/models` 新增了 30 秒可服务性缓存，将单次请求开销从约 316–621ms 降至接近 13–34ms 的内部基线（[#9998](https://github.com/unslothai/unsloth/pull/9998)）。

## 2. 发布与破坏性变更

过去 24h 内没有新版本发布。部署相关更新：

- **AppImage CI 夹具已修复**：自 2026-08-19 起，夜间构建的干净机器流水线一直在静默失败，因为夹具声明了一个已发布应用会拒绝的后端版本（[#10001](https://github.com/unslothai/unsloth/pull/10001)，已关闭）。
- **桌面后端生命周期**：应用拥有的已失效后端不再阻塞启动——它们会被清除并重新拉起（[#9969](https://github.com/unslothai/unsloth/pull/9969)，已关闭）；Windows 卸载现在会以进程树方式终止仍然存活的 `llama-server`（[#9967](https://github.com/unslothai/unsloth/pull/9967)，已关闭）。
- **Homebrew Cask 提交**（Unsloth Studio 桌面版）仍在跟踪中（[#5156](https://github.com/unslothai/unsloth/issues/5156)，22 👍）。

## 3. 新模型与硬件支持

- **Qwen3.5 混合注意力（GatedDeltaNet）配合 bnb-4bit 在首次前向传播时崩溃**——打包后的 4-bit 权重未经反量化就被传给 `F.linear`；正在调查中（[#9867](https://github.com/unslothai/unsloth/issues/9867)）。
- **AMD**：有请求希望将 ROCmFPX 作为默认的 AMD 量化后端（[#9989](https://github.com/unslothai/unsloth/issues/9989)）；另有独立的通用 ROCm 支持请求（[#10005](https://github.com/unslothai/unsloth/issues/10005)）。
- **AMD 安装程序修复正在审查中**：从包含针对用户特定 AMD GPU 内核的索引拉取 torch，而不是使用首次操作即出错的通用 ROCm wheel（[#9829](https://github.com/unslothai/unsloth/pull/9829)）。
- **Qwen3.8-27B V3 GGUF 在 AMD 上 prefill 后崩溃**；V2 修订版是可用的回退方案（[#9792](https://github.com/unslothai/unsloth/issues/9792)）。
- **Qwen3.5/3.6 混合模型的 GGUF 导出**会截断末尾的 `ssm_conv1d.weight` 张量（[#6071](https://github.com/unslothai/unsloth/issues/6071)）。

## 4. 性能与优化

- **`/v1/models` 延迟**：可服务性扫描会缓存 30 秒，缩小外部 316–621ms 与内部路由 13–34ms 之间的差距（[#9998](https://github.com/unslothai/unsloth/pull/9998)）。
- **停滞的聊天生成**：停止取得进展的持久化聊天运行会被回收，解决了此前无错误显示且全部 HTTP 200 的 UI 卡顿和局域网断连问题（[#9997](https://github.com/unslothai/unsloth/pull/9997)）。
- **SQLite 写入竞争**：在 Colab 上，一个慢写入者在 4 分钟内产生了 54 个 `409 ChatMessageProt...` 错误和 4 个类似挂起的请求；修复已合并（[#9996](https://github.com/unslothai/unsloth/pull/9996)，已关闭）。
- **上下文管理**：有请求希望将工具结果和重复附件主动写入磁盘，而不是保留在活动上下文中（[#9985](https://github.com/unslothai/unsloth/issues/9985)）；实时 TPS/上下文大小小部件请求已关闭（[#9933](https://github.com/unslothai/unsloth/issues/9933)）。

## 5. 稳定性与回归

按严重程度排序——存在修复的已注明：

1. **LTX-2-GGUF 视频模型在 Windows 上导致 Unsloth Desktop 崩溃**——视频流水线加载期间出现访问冲突 `0xc0000005`；尚无修复 PR（[#9977](https://github.com/unslothai/unsloth/issues/9977)）。
2. **Qwen3.5 + bnb-4bit 在 ROCm gfx1201 上崩溃**——打包后的 4-bit 权重未经反量化即被传给 `F.linear`；尚无修复 PR（[#9867](https://github.com/unslothai/unsloth/issues/9867)）。
3. **Qwen3.8-27B V3 GGUF 在 AMD 上崩溃**——在 gfx1151 上跨 20 个单元格未能复现；证据指向 llama.cpp 的上下文检查点（[#9792](https://github.com/unslothai/unsloth/issues/9792)）。
4. **多 GPU 训练因设备不匹配失败**——当规划器跨卡拆分时，`index_select` 在 cuda:0 上执行，而张量在 cuda:1 上；修复 PR 已开启（[#9995](https://github.com/unslothai/unsloth/pull/9995)）。
5. **Studio 重新生成会重复用户消息和附件**（#9984）——修复 PR 会在保存前合并相同轮次（[#10000](https://github.com/unslothai/unsloth/pull/10000)）。
6. **本地 safetensors 加载完整 BF16/FP16，而不是 4-bit QLoRA**——约 15.7GB 显存，训练时 OOM；通过 GGUF ID 加载则正常（[#5344](https://github.com/unslothai/unsloth/issues/5344)）。
7. **Ollama 集成存在三处故障**——`source` 错误、schema 崩溃、模型未在清单中显示（[#9986](https://github.com/unslothai/unsloth/issues/9986)）。
8. **Windows GPU 可见性**——桌面端报告“No visible GPU”，而 `nvidia-smi` 列出了显卡；已有 PR 用于操作系统级 GPU 报告（[#9858](https://github.com/unslothai/unsloth/pull/9858)）以及防止 Windows 更新后 torch 退化为仅 CPU 版本（[#9857](https://github.com/unslothai/unsloth/pull/9857)）。
9. **缓存的 HF 模型未出现在聊天选择器中**——修复 PR 已开启（[#7680](https://github.com/unslothai/unsloth/pull/7680)）。
10. **MLX 测试套件在 Apple Silicon 上隔离性不佳**——根据调用顺序不同，有 24–34 个失败（[#8138](https://github.com/unslothai/unsloth/issues/8138)）。
11. **CI/安全加固已落地**：dyld 分类器按 CPU 时间计算预算（[#10003](https://github.com/unslothai/unsloth/pull/10003)，已关闭）；exec/eval/compile 对来源不明的值快速失败（[#9999](https://github.com/unslothai/unsloth/pull/9999)，已关闭）；模型下载 E2E 夹具版本共享（[#10002](https://github.com/unslothai/unsloth/pull/10002)）。
12. **已关闭**：通过 `unsloth codex .` 启动 Codex 时缺少 `apply_patch`（[#9114](https://github.com/unslothai/unsloth/issues/9114)）；model1/model2 配对时比较窗格为空（[#9823](https://github.com/unslothai/unsloth/issues/9823)）。

## 6. 对应用开发者意味着什么

- **多 GPU 训练目前会被设备分片 `index_select` bug 阻塞**，当层被放置到多张卡上时；在依赖规划器分片训练之前，请跟踪 [#9995](https://github.com/unslothai/unsloth/pull/9995)。
- **Studio 上的聊天应用应关注 #9984**——重新生成的回复会复制用户消息和附件，导致上下文/Token 计数膨胀；已合并的防护只会合并今后出现的相同轮次。
- **`/v1/models` 正被视为一级延迟关注面**：30 秒缓存落地后，目录扫描预计接近即时。如果你为 Studio 做代理，`x-api-key` 认证支持（[#7656](https://github.com/unslothai/unsloth/pull/7656)）和预注册的 MCP OAuth 客户端（[#7665](https://github.com/unslothai/unsloth/pull/7665)）都值得关注。
- **Windows 上的 AMD 仍是风险最高的平台**：gfx1201 训练崩溃、GPU 检测失败和 AMD 特有的 GGUF 崩溃都缺少已确认的修复。对于 Qwen3.8-27B，V2 GGUF 修订版是安全的回退方案。

</details>

---
*本日报由 [agents-radar](https://github.com/mux4457986479-commits/agents-radar) 自动生成。*
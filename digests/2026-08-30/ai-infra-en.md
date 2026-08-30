# AI Infrastructure Digest 2026-08-30

> Generated: 2026-08-30 10:40 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# AI Infrastructure Cross-Project Comparison Report — 2026-08-30

## 1. Ecosystem Overview

The inference stack is in a model-bring-up phase: GLM-5.3-Flash, DeepSeek-V4-Flash, and Qwen hybrid-architecture models are consuming most engineering cycles across serving engines, while correctness regressions — not raw throughput — dominate the most active threads. Local/edge backends (Metal, Vulkan, OpenCL, SYCL) are receiving unusually heavy tuning attention from llama.cpp, signaling that hardware diversity is now a first-class deployment concern. Meanwhile, agentic workloads are exposing a common weakness across the ecosystem: memory lifecycle management and request cancellation (MLX RSS growth in Ollama, zombie streaming in SGLang, MCP tool hijacking in LiteLLM). Gateway-layer security is also hardening, with cosign-signed images and an active PII-exposure debate in LiteLLM.

## 2. Activity Comparison

Counts below reflect **notable issues/PRs cited in today's digests**, not full repository totals.

| Project | Notable Issues | Notable PRs | Release Status (24h) |
|---|---|---|---|
| vLLM | 12 (incl. 1 critical w/ 93 comments) | 11 | No new release |
| SGLang | 24 (many auto-closed as inactive) | 18 | No new release |
| llama.cpp | 7 | 23 | **10 releases** (b10681–b10690) |
| Ollama | 16 | 6 | No new release |
| LiteLLM | 23 (2 security) | 14 | 2 RCs (v1.100.0-rc.1, v1.99.0-rc.2) |
| Unsloth | 15 | 15 | No new release |

llama.cpp is shipping at a cadence of ~1 release/hour of engineering effort; vLLM and SGLang are in heavy PR motion but holding releases. LiteLLM is the only project with release-candidate activity, focused on image-signing infrastructure rather than features.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **GLM-5.3-Flash** | ✅ Added (#53906), requires FlashInfer 0.6.18 + dedicated image; known gap on Ada/sm_89 (#54059) | ⚠️ FP8 KV unsupported (#36830), PP startup crash (#36906); DP-attn warmup hang fixed | 🔶 Sparse-FA proposal for DSV4/GLM class (#27970) | 🔶 Community demand only (#17741) | — |
| **DeepSeek-V4-Flash** | 🔧 Startup regression fix (#54400) | — | 🔶 SWIGLU_CLAMP fusion (~2% gen, 1–2% PP on 4×4090) | — | — |
| **Kimi-K3 / K2.6** | ✅ ROCm DCP enabled (#51705); ⚠️ K2.6 reasoning corruption still open (#42426) | ⚠️ K3 output corruption with NIXL Direct-PD (#52627) | — | — | — |
| **Qwen 3.5/3.8 hybrids** | — | — | ✅ Qwen3.8-Flash-Next fixes (#27941) | 🔶 Cloud-model demand (#18128) | ⚠️ GatedDeltaNet + bnb-4bit crash (#9867) |
| **MiMo-V2.5-Pro** | — | 🔧 Ascend 950DT WIP, MXFP4 experts (#36508) | — | — | — |

**Verdict:** vLLM leads for datacenter GPU serving of the GLM-5.3-Flash wave, but only on Blackwell + specific FlashInfer builds. llama.cpp leads in breadth — no single week sees 10 releases without touching every backend. SGLang is the early mover on NPU/AMD (gfx1250, Ascend MXFP4) and diffusion-image serving. Unsloth trails on the new hybrid architectures, with crashes blocking Qwen3.5 QLoRA on AMD.

## 4. Performance Frontier

Optimization effort is concentrated in four areas:

- **KV cache & offload** — SGLang fixed HiCache L3 key collisions (#37058) and is unifying the memory read path (#34602→#34613); vLLM is adding cache telemetry/ownership (#52067, #53902); Ollama's MLX 8 GiB prefix-cache budget is actively causing swap on 32 GB Macs (#18131).
- **Kernels** — llama.cpp dominates: Metal FA-vec per-GPU tunings (M1 Max/M2/M4 Pro), CPU tiled k-quant with VNNI (**3–7×**), HIP Q2_0 dot-product on gfx1201 (**33–35%** token-gen). vLLM is targeting fused temperature softmax (#54417) and W4A8 INT4→INT8 PTX loads (#49529). SGLang cut **224 of 673** BF16 add-kernel launches in Qwen-Image denoising via bias absorption (#37116).
- **Scheduling & batching** — vLLM's adaptive prefill token budget RFC (#52906) and spec-decode CUDA-graph memory fixes (#54418); SGLang's speculative-decoding roadmap (#23705); llama.cpp's speculative prefill (#27692).
- **Distributed serving** — vLLM's opt-in `execute_model` RPC fast path (#54406) and multiproc TP; SGLang's diffusion TP collectives through `CustomAllReduceV2` (#36680). LiteLLM sits at the fleet level, fixing independent RPM/TPM rate-limit windows (#38523) and a Postgres spend-log index that caused seq-scans under load (#35766).

## 5. Layer Positioning

| Layer | Projects | Positioning |
|---|---|---|
| **Serving engines** | vLLM, SGLang | Datacenter-scale GPU inference; tight CUDA/FlashInfer integration (vLLM) vs. prefix-cache/radix + diffusion + NPU/AMD breadth (SGLang). Both investing in PD disaggregation and KV offload. |
| **Local / edge runtime** | llama.cpp | The portability baseline — widest backend matrix (CPU, Metal, Vulkan, OpenCL, SYCL, HIP). Not a serving platform, but increasingly embeddable and speculative-decode capable. |
| **Local deployment UX** | Ollama | Sits directly above llama.cpp + MLX; competes on turnkey experience, desktop/CLI/API compatibility, and model discoverability, not kernel work. |
| **Gateway / control plane** | LiteLLM | Provider-agnostic routing, cost tracking, auth/SSO, rate limiting. No GPU work at all — its frontier is multi-tenant security, router correctness, and provider normalization. |
| **Training / fine-tuning** | Unsloth | QLoRA fine-tuning plus Studio desktop; increasingly straddling inference (serving, `/v1/models`, GGUF export) but its core value remains memory-efficient training on consumer/AMD hardware. |

## 6. Trend Signals

1. **Hybrid-architecture models (GatedDeltaNet, sparse-MLA, DSpark) are the new stress test.** GLM-5.3-Flash requires a specific FlashInfer version + dedicated Docker image in vLLM, FP8 KV is broken in SGLang, and Unsloth crashes with bnb-4bit. Expect a multi-week stabilization tail before these models are production-safe.
2. **Correctness has overtaken speed as the dominant concern.** Kimi-K2.6's `!!!!!!!!!!` reasoning corruption (#42426) has 93 comments and no fix; SGLang's `fast_topk_v2` can silently return wrong results (#36807); llama.cpp shipped a crash fix for unquantized K-cache context shift (b10690). Validate outputs when adopting new model versions.
3. **Agentic workloads are exposing memory-lifecycle debt.** Ollama's MLX runner grows ~0.15 GiB per request with no KV release; SGLang leaves zombie requests decoding to `max_tokens` after client disconnect; LiteLLM's MCP auto-execute hijacks Claude Code tool calls. Agent developers should treat memory bounds, disconnect handling, and tool-call routing as deployment risks, not edge cases.
4. **Edge hardware diversity is accelerating.** llama.cpp's per-GPU Metal tuning, Adreno/OpenCL matmul work, gfx1250 bring-up in SGLang, and Ascend MXFP4 support all point to a world where "GPU" means many things. Multi-backend portability is becoming a competitive moat.
5. **Gateway security posture is rising.** LiteLLM now cosign-signs all Docker images, but also has an unauthenticated `/metrics` endpoint exposing multi-tenant prompts (#24530) and an unanswered public vulnerability report (#38889). Anyone running a multi-tenant proxy should set `require_auth_for_metrics_endpoint: true` immediately.
6. **Watch items for the next 30 days:** the FlashInfer 0.6.18 coupling in vLLM (upgrade risk for custom builds), the Rust frontend parity roadmap (#44280), SGLang's HiCache disaggregation consistency closure (#22607), and llama.cpp's CPU k-quant tiled mul_mat (3–7× claim — if it merges cleanly, it reshapes CPU-only inference economics).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-30

## Today's Highlights

The main story today is model bring-up plus regression fixes: the **GLM-5.3-Flash** support PR (#53906) is moving alongside the **FlashInfer 0.6.18** upgrade (#54313), while separate bugfixes address a speculative-decode CUDA-graph memory regression (#54418) and a DeepSeek-V4-Flash startup regression (#54400). On the stability side, the long-running **Kimi-K2.6 reasoning-output corruption** issue (#42426) remains the most active thread with 93 comments, and a scheduler wedging bug (#53130) plus EngineCore exit-code masking (#48966) are notable availability risks. The Rust frontend parity roadmap (#44280) also saw updates, keeping the experimental `VLLM_USE_RUST_FRONTEND=1` path on the radar.

## Releases & Breaking Changes

No new vLLM releases in the last 24 hours. No breaking API/config changes were merged today. The FlashInfer 0.6.18 dependency upgrade (#54313) is worth tracking for custom image builds.

## New Model & Hardware Support

- **GLM-5.3-Flash support** — [PR #53906](https://github.com/vllm-project/vllm/pull/53906) adds support for `zai-org/GLM-5.3-Flash`; requires FlashInfer v0.6.18 and the dedicated `glm53-flash` Docker image.
- **FlashInfer 0.6.18 upgrade** — [PR #54313](https://github.com/vllm-project/vllm/pull/54313) bumps FlashInfer, needed for the GLM-5.3-Flash path.
- **ROCm: Kimi-K3 DSpark decode context parallelism** — [PR #51705](https://github.com/vllm-project/vllm/pull/51705) enables DCP for Kimi-K3 + DSpark on ROCm.
- **ROCm: shared-expert multi-stream overlap** — [PR #51117](https://github.com/vllm-project/vllm/pull/51117) extends the `MULTI_STREAM_OVERLAPPED` MoE path to ROCm.
- **Video embeds frontend support** — [PR #54242](https://github.com/vllm-project/vllm/pull/54242) adds video embeds input support to the Python frontend, enabling EPD workflows with video inputs.
- **Known gap:** GLM-5.3-Flash currently lacks a sparse-MLA attention path on Ada/sm_89 — [Issue #54059](https://github.com/vllm-project/vllm/issues/54059).

## Performance & Optimization

- **CUDA graph memory safety for spec decode** — [PR #54418](https://github.com/vllm-project/vllm/pull/54418) fixes a memory regression from #50488 by keeping default CUDA-graph capture sizes within established ceilings (512 on H200, 1024 on datacenter Blackwell) while preserving the speculative-decode sizing work.
- **Fused temperature scaling in sampler softmax** — [PR #54417](https://github.com/vllm-project/vllm/pull/54417) folds temperature into the FlashInfer softmax when only `top_k` or `top_p` is set, avoiding a full read-modify-write pass over `[num_tokens, vocab_size]`.
- **Faster `execute_model` RPC for multiproc TP** — [PR #54406](https://github.com/vllm-project/vllm/pull/54406) packs scheduler broadcasts into a fixed tuple schema with `array('i)` lists, opt-in via `VLLM_TP_EXECUTE_MODEL_FAST_PATH`.
- **W4A8 INT4→INT8 kernel loads** — [Issue #49529](https://github.com/vllm-project/vllm/issues/49529) proposes adopting PTX 9.4 `ldmatrix.s8.s4` for hardware-accelerated INT4-to-INT8 expansion in W4A8 paths.
- **Adaptive prefill token budget** — [RFC #52906](https://github.com/vllm-project/vllm/issues/52906) proposes making `max_num_batched_tokens` adaptive based on scheduling pressure.
- **Cascade attention heuristics for FA3** — [Issue #15647](https://github.com/vllm-project/vllm/issues/15647) remains open for updating performance heuristics.

## Stability & Regressions

Ranked by severity; fixes noted where present.

- **Critical — Kimi-K2.6 reasoning corruption** — [Issue #42426](https://github.com/vllm-project/vllm/issues/42426): intermittently outputs only `!!!!!!!!!!` in the reasoning field with `content null`; 93 comments, no fix PR linked yet.
- **High — Scheduler permanently wedged** — [Issue #53130](https://github.com/vllm-project/vllm/issues/53130): once running + skipped_waiting/deferred reaches `max_num_seqs`, the scheduler stops admitting requests while the engine reports healthy; only restart recovers.
- **High — EngineCore crash exits with status 0** — [Issue #48966](https://github.com/vllm-project/vllm/issues/48966): unexpected EngineCore death can make the serving process exit cleanly, defeating `Restart=on-failure` supervisors.
- **High — CPU-offload deadlock on GB10** — [Issue #53960](https://github.com/vllm-project/vllm/issues/53960): `VLLM_PLE_CPU_OFFLOAD=1` hangs at kernel warmup on single-GPU sm_121.
- **Medium — DFlash2 + YaRN prefix-cache miss** — [Issue #54094](https://github.com/vllm-project/vllm/issues/54094): identical 1.04M-token prompt gets zero prefix-cache reuse, while target-only reuses ~1.039M tokens.
- **Medium — Kimi-K3 output corruption in PD disaggregation** — [Issue #52627](https://github.com/vllm-project/vllm/issues/52627): intermittent garbled output with NIXL Direct-PD + MooncakeStoreConnector.
- **Medium — GLM-5.3-Flash illegal memory access** — [Issue #54317](https://github.com/vllm-project/vllm/issues/54317): recurring CUDA illegal memory access on 4×B200 across three unrelated kernels.
- **Fixes in motion:**
  - [PR #54400](https://github.com/vllm-project/vllm/pull/54400) (closed) fixes a DeepSeek-V4-Flash startup regression by removing a global config lookup in `SparseAttnIndexer`.
  - [PR #54416](https://github.com/vllm-project/vllm/pull/54416) avoids a `fastsafetensors` deadlock for pipeline-parallel draft models.
  - [PR #54386](https://github.com/vllm-project/vllm/pull/54386) (closed) reverted Nixl PD DCP support for MLA models in favor of a narrower fix.

## What This Means for Application Developers

- If you serve **Kimi-K2.6**, validate the reasoning field against the `!!!!!!!!!!` corruption bug (#42426); this is still active and not tied to a public fix.
- **GLM-5.3-Flash** is becoming available but is tightly coupled to a specific FlashInfer version and Docker image (#53906, #54313); expect rough edges on non-Blackwell hardware (#54059, #54317).
- **Speculative decoding users on H200/Blackwell** should pick up PR #54418 if they hit CUDA OOM from enlarged default graph captures.
- **Production operators** should review supervisor configuration given the EngineCore exit-0 issue (#48966), and add watchdog/health metrics for the scheduler wedging scenario (#53130).
- **KV-offload adopters** are getting better observability: KV cache event ownership (#52067), metadata preservation (#52068), CPU tier capacity metrics (#53902), and a KVCR secondary-tier adapter (#53624) are all in progress.
- The **Rust frontend** continues toward Python API parity (#44280); it remains experimental behind `VLLM_USE_RUST_FRONTEND=1` but is worth tracking for lower-overhead serving.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-30

## Today's Highlights

HiCache correctness dominated the day: [#37058](https://github.com/sgl-project/sglang/pull/37058) scopes L3 storage keys to the request cache namespace to prevent cross-request collisions, [#37095](https://github.com/sgl-project/sglang/pull/37095) drops the redundant parallel KV-event hash chain, and the high-priority HiCache consistency plan for disaggregated prefill ([#22607](https://github.com/sgl-project/sglang/issues/22607)) is now closed. On the kernel side, Qwen-Image diffusion work keeps landing: absorbing output-projection biases removes 224 of 673 BF16 add-kernel launches per denoiser step on GB300 ([#37116](https://github.com/sgl-project/sglang/pull/37116)). Stability concerns persist on GB10 and GLM-5.3-Flash — long prefills can silently kill a worker rank with no traceback ([#36941](https://github.com/sgl-project/sglang/issues/36941)), and FP8 KV-cache / PP paths remain broken for GLM-5.3-Flash ([#36830](https://github.com/sgl-project/sglang/issues/36830), [#36906](https://github.com/sgl-project/sglang/issues/36906)).

## Releases & Breaking Changes

No new releases in the last 24 hours.

## New Model & Hardware Support

- **MiMo-V2.5-Pro on Ascend 950DT (WIP)**: [#36508](https://github.com/sgl-project/sglang/pull/36508) adds MXFP4 expert detection (`store_dtype == "mxfp4"`) and per-expert `weight_scale` → `weight_scale_inv` mapping for NPU.
- **AMD gfx1250 on ROCm 10**: high-priority bring-up in [#36871](https://github.com/sgl-project/sglang/pull/36871).
- **ROCm/HIP DSA head-gate helpers**: [#37118](https://github.com/sgl-project/sglang/pull/37118) defines `logits_head_gate_graph` / `scale_head_gate_graph` on HIP, where they were previously unbound and would crash at their call sites.
- **OpenPangu 2.0 Flash support** was requested ([#29746](https://github.com/sgl-project/sglang/issues/29746)) but auto-closed as inactive.

## Performance & Optimization

- **Qwen-Image bias absorption**: [#37116](https://github.com/sgl-project/sglang/pull/37116) folds four per-block output-projection biases into the residual path, eliminating 224 of 673 BF16 add-kernel launches per profiled denoiser step on GB300 (~33%).
- **Qwen-Image TP collectives**: [#36680](https://github.com/sgl-project/sglang/pull/36680) routes diffusion TP collectives through the SRT custom-all-reduce dispatcher (admitting 24 MiB row-parallel outputs to `CustomAllReduceV2`) and fuses three small attention kernels.
- **Diffusion VAE streaming load**: [#37004](https://github.com/sgl-project/sglang/pull/37004) constructs native VAE / `video_vae` on meta device and assigns safetensors directly to the resident GPU, avoiding full host staging.
- **Unified-memory read path**: the stack [#34602](https://github.com/sgl-project/sglang/pull/34602) (dense KV views for uniform-row MHA/SWA) → [#35245](https://github.com/sgl-project/sglang/pull/35245) (KV write-location translated once at `ForwardBatch` construction) → [#35247](https://github.com/sgl-project/sglang/pull/35247) (single ID translator on the read path) → [#34613](https://github.com/sgl-project/sglang/pull/34613) (backend enablement for FA3/FlashInfer/TRTLLM-MHA/FlashMLA) is in flight.
- **HiCache MLA FP8 on ROCm**: [#37117](https://github.com/sgl-project/sglang/pull/37117) fixes the read-JIT being silently disabled for 576 B MLA FP8 rows (the `element_size % 128 == 0` check rejected them) and retunes the block quota.
- **AMD DSV4 unified-KV sizing**: [#30315](https://github.com/sgl-project/sglang/pull/30315) fixes unified-KV pool sizing and SWA per-request ring accounting, addressing GPU memory access faults on MI35x during concurrent prefill.
- **Speculative decoding roadmap**: adaptive speculation for mixed agentic workloads ([#23705](https://github.com/sgl-project/sglang/issues/23705)) and further Ngram trie-based support ([#21052](https://github.com/sgl-project/sglang/issues/21052)) remain open.
- **MXFP8 slower than BF16** on B200/GB200 for Qwen3-30B-A3B ([#29002](https://github.com/sgl-project/sglang/issues/29002)) was closed as inactive.

## Stability & Regressions

Ranked by severity:

- **Silent worker death on GB10 long prefill**: [#36941](https://github.com/sgl-project/sglang/issues/36941) — GLM-5.3-Flash prefills above ~40k tokens exhaust unified memory on 2× DGX Spark; the worker rank dies between 54k–62k tokens with no traceback, CUDA error, or OOM record. Open.
- **Silent wrong top-k**: [#36807](https://github.com/sgl-project/sglang/issues/36807) — `fast_topk_v2` can return incorrect top-k sets when a radix threshold bucket overflows its 4096-entry candidate buffer (k=2048, long rows). Open.
- **Zombie streaming requests**: [#36333](https://github.com/sgl-project/sglang/issues/36333) — a disconnected client leaves a request decoding to `max_tokens`, flooding "state was deleted in TokenizerManager"; regression from a revert of #34160. Open.
- **Multi-node TP rank-divergence deadlock**: [#33289](https://github.com/sgl-project/sglang/issues/33289) — DeepSeek-V4 + DSpark on 2× DGX Spark: one rank wedges in NCCL proxy append (logits all-gather) while the peer idles at request broadcast. Closed.
- **GLM-5.3-Flash issues**: FP8 KV cache unsupported (`index_kpool: 4` excludes `flashmla_kv`; no CUDA DSA backend handles bf16-query × fp8-KV) ([#36830](https://github.com/sgl-project/sglang/issues/36830)); PP startup crash `KeyError: 'residual'` ([#36906](https://github.com/sgl-project/sglang/issues/36906)); warmup hang with `--enable-dp-attention` is fixed/closed ([#36802](https://github.com/sgl-project/sglang/issues/36802)).
- **Scheduler hang on Mamba eviction**: [#30314](https://github.com/sgl-project/sglang/issues/30314) — the event loop blocks during eviction under large-context requests, causing server hang and process kill. Open.
- **ROCm DSA cold-prefill abort**: [#36960](https://github.com/sgl-project/sglang/pull/36960) caps the DSA MQA-logits budget at AITER's `buffer_store` limit, fixing a Triton compiler assertion that aborts every TP rank on long cold prefills.
- **HiCache / PD correctness**: L3 storage keys now namespaced per request cache ([#37058](https://github.com/sgl-project/sglang/pull/37058)); parallel KV-event hash chain removed ([#37095](https://github.com/sgl-project/sglang/pull/37095)); sticky `failed_sessions` causing persistent 500s after transient KV-transfer errors is closed ([#13054](https://github.com/sgl-project/sglang/issues/13054)).
- **Quick fixes / smaller items**: deferred `sgl_kernel.quantization` import in `expert_pack` for XPU/ROCm/NPU ([#37115](https://github.com/sgl-project/sglang/issues/37115), closed); `NameError: deep_gemm` when `SGLANG_ENABLE_JIT_DEEPGEMM=0` ([#29738](https://github.com/sgl-project/sglang/issues/29738), open); Triton version mismatch warning for aiter gluon kernels ([#35785](https://github.com/sgl-project/sglang/issues/35785), open).
- **CI health**: tracked in [#17050](https://github.com/sgl-project/sglang/issues/17050) — 2 broken, 5 flaky, 879 recently fixed. Unit-test coverage expansion is tracked in [#20865](https://github.com/sgl-project/sglang/issues/20865).
- Several older AMD/NPU/PD bugs ([#29347](https://github.com/sgl-project/sglang/issues/29347), [#29785](https://github.com/sgl-project/sglang/issues/29785), [#29725](https://github.com/sgl-project/sglang/issues/29725), [#29695](https://github.com/sgl-project/sglang/issues/29695), [#29748](https://github.com/sgl-project/sglang/issues/29748), [#25587](https://github.com/sgl-project/sglang/issues/25587)) were auto-closed as inactive.

## What This Means for Application Developers

- **Be cautious with long prefills on GB10-class hardware**: the silent worker death above ~54k tokens ([#36941](https://github.com/sgl-project/sglang/issues/36941)) means unified-memory pressure can kill a rank with no catchable error. Monitor host/unified memory yourself and keep prefill chunks below ~40k tokens until a fix lands.
- **Streaming cancellation hygiene**: client disconnects currently leave zombie requests running to `max_tokens` ([#36333](https://github.com/sgl-project/sglang/issues/36333)). Enforce client-side timeouts and treat "state was deleted in TokenizerManager" logs as expected noise until the regression is fixed.
- **GLM-5.3-Flash adoption**: FP8 KV cache is not usable (stay on GLM-5.2 or BF16 KV if FP8 is required), and PP deployments crash at startup; the DP-attention warmup hang is fixed, but verify against the latest image before rolling out ([#36830](https://github.com/sgl-project/sglang/issues/36830), [#36906](https://github.com/sgl-project/sglang/issues/36906)).
- **HiCache multi-tenant deployments**: the L3 key namespace fix ([#37058](https://github.com/sgl-project/sglang/pull/37058)) closes a real cross-namespace cache-collision class — worth upgrading any shared KV-offload infrastructure.
- **Diffusion / Qwen-Image serving**: expect meaningful latency wins from the TP-collective and bias-folding work, plus new `--component-precisions.<component>` overrides and fail-closed component execution ([#36991](https://github.com/sgl-project/sglang/pull/36991), [#37049](https://github.com/sgl-project/sglang/pull/37049)) — a good moment to validate nightly images.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-30

## Today’s Highlights

llama.cpp shipped a dense batch of backend tuning releases (b10681–b10690), dominated by Metal FA-vec tunings for M1 Max/M2/M4 Pro and OpenCL Adreno matmul improvements. The most important correctness fix landed in b10690, preventing a crash during context shift of unquantized K-cache. Notable in-flight work includes a `SWIGLU_CLAMP` kernel fusion, a 3–7x CPU tiled k-quant mul_mat path, and speculative prefill.

## Releases & Breaking Changes

- **b10690** — Fixes a crash by copying Hadamard matrix to `k_rot` only when a buffer is assigned, specifically protecting context shift of unquantized K cache. [#27967](https://github.com/ggml-org/llama.cpp/pull/27967)
- **b10689** — `ggml_graph_optimize` now accepts allocator dependencies, enabling better allocation dependency handling. [#27301](https://github.com/ggml-org/llama.cpp/pull/27301)
- **b10688 / b10685 / b10682** — Metal FA-vec tunings for M2, M4 Pro, and M1 Max respectively. [#27940](https://github.com/ggml-org/llama.cpp/pull/27940) [#27915](https://github.com/ggml-org/llama.cpp/pull/27915) [#27932](https://github.com/ggml-org/llama.cpp/pull/27932)
- **b10687** — OpenCL: better matmul path on two Adreno GPU generations; defaults the Adreno xmem F16×F32 GEMM on for X2E. [#27640](https://github.com/ggml-org/llama.cpp/pull/27640)
- **b10686** — Metal: added shared memory padding assertions to catch invalid kernel configs early. [#27951](https://github.com/ggml-org/llama.cpp/pull/27951)
- **b10684** — SYCL `--fit` now respects `--fit-target` accurately by accounting for peak VRAM required at a given context size. [#27629](https://github.com/ggml-org/llama.cpp/pull/27629)
- **b10683** — Vulkan: consolidated duplicated `fastdiv` helpers. [#27526](https://github.com/ggml-org/llama.cpp/pull/27526)
- **b10681** — Vulkan `mul_mat_id` now pads K instead of N, avoiding out-of-bounds on K in indirect row lookup. [#27925](https://github.com/ggml-org/llama.cpp/pull/27925)

No user-facing API or config migration was announced in this batch.

## New Model & Hardware Support

- **Metal FA-vec tunings** landed for M1 Max, M2, M4 Pro, and M2 Max (the latter in open PR). [#28015](https://github.com/ggml-org/llama.cpp/pull/28015)
- **Vulkan TQ1_0 support** (1.6875 bpw ternary type) is in progress, covering mm, mat-vec, mat-vec-id, dequant, and get_rows. [#27765](https://github.com/ggml-org/llama.cpp/pull/27765)
- **Sparse-FA for DSV4/GLM** is proposed, leveraging a hint for max live KV entries per token. [#27970](https://github.com/ggml-org/llama.cpp/pull/27970)
- **SYCL FWHT Kronecker-product support** for embedding sizes 384, 640, 768, and 1280 is in review. [#28016](https://github.com/ggml-org/llama.cpp/pull/28016)
- **Qwen3.8-Flash-Next follow-up fixes** address sequence indexer loss and other correctness issues. [#27941](https://github.com/ggml-org/llama.cpp/pull/27941)

## Performance & Optimization

- **SWIGLU_CLAMP fusion** for DSV4/GLM models: ~2% token generation and ~1–2% prompt processing improvement on 4×4090s. [#27930](https://github.com/ggml-org/llama.cpp/pull/27930)
- **CPU tiled mul_mat for k-quants** using VNNI reports **3–7x faster CPU mul_mat**. [#27851](https://github.com/ggml-org/llama.cpp/pull/27851)
- **HIP Q2_0 dot-product on gfx1201** using native AMD byte permutation improves token generation by **~33–35%**. [#26753](https://github.com/ggml-org/llama.cpp/pull/26753)
- **RDNA3/RDNA4 MMQ config tuning** and **RDNA3 routed-MoE N-tile sizing** are both in flight. [#26284](https://github.com/ggml-org/llama.cpp/pull/26284) [#24546](https://github.com/ggml-org/llama.cpp/pull/24546)
- **ROCm radix TOP_K** for rows >1024 elements is ready for merge. [#27466](https://github.com/ggml-org/llama.cpp/pull/27466)
- **KV-cell sequence scan early exit** reduces generation slowdown as context grows, split out as a standalone PR. [#28011](https://github.com/ggml-org/llama.cpp/pull/28011)
- **Speculative prefill** implementation based on ICML 2025 work aims to reduce TTFT. [#27692](https://github.com/ggml-org/llama.cpp/pull/27692)

## Stability & Regressions

- **Vulkan GATED_DELTA_NET pipeline compile hang** on gfx1103 (RADV 780M) prevents llama-server from reaching listening state. [#27998](https://github.com/ggml-org/llama.cpp/issues/27998)
- **RTX 5090 display loss / NVIDIA GSP reset** on Qwen3.8-27B Q6_K, reported on Linux. [#27910](https://github.com/ggml-org/llama.cpp/issues/27910)
- **CUDA graphs still hang RTX 5090 Laptop (sm_120)**; `GGML_CUDA_DISABLE_GRAPHS=1` remains a complete workaround. [#27330](https://github.com/ggml-org/llama.cpp/issues/27330)
- **SYCL multi-GPU crash** with Intel Arc Pro B50 + Arc A770. [#27888](https://github.com/ggml-org/llama.cpp/issues/27888)
- **MTP inter-request state leakage** causes non-deterministic output on Qwen3.6-35B-A3B-MTP. [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- **draft-mtp DeviceLost during prefill** on AMD RADV/gfx1151 remains open. [#27306](https://github.com/ggml-org/llama.cpp/issues/27306)
- **Fixed in b10690**: crash during context shift of unquantized K cache caused by unconditional Hadamard copy. [#27967](https://github.com/ggml-org/llama.cpp/pull/27967)
- **llama-ui**: reasoning level selection menu is broken on desktop in b10687. [#27981](https://github.com/ggml-org/llama.cpp/issues/27981)

## What This Means for Application Developers

- Upgrade to **b10690** if you serve unquantized K-cache models that use context shifting; the crash fix is low-risk.
- Metal users with M-series hardware should see better FA-vec behavior without application changes; M2 Max tuning will follow once merged.
- SYCL users should re-test `--fit` on multi-GPU and Intel setups after b10684 — fitting decisions now reflect real context-size VRAM more accurately.
- If you run CUDA graphs on RTX 5090-class hardware, keep `GGML_CUDA_DISABLE_GRAPHS=1` available as a mitigation while the graph/hang issues remain open.
- MTP / draft-speculative decoding on AMD RADV is still fragile; applications using `--spec-type draft-mtp` on that stack should have a fallback path with MTP disabled.
- The CPU k-quant tiled mul_mat and SWIGLU_CLAMP PRs are worth tracking: they offer significant CPU and dense-MoE throughput gains once merged.



</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-30

## Today's Highlights

No release was tagged in the last 24 hours. The most notable signal is a cluster of MLX runner memory issues on Apple Silicon: per-request resident growth and a fixed 8 GiB prefix-cache budget are causing multi-GB RSS increases and swap during agent workloads. On the fix side, a PR is open for the integrated-Vulkan/Virtio-GPU model-load regression, and API schema-validation work is in flight for nested `required` tool properties.

## Releases & Breaking Changes

None in the last 24h.

## New Model & Hardware Support

- No new model/backend releases were tagged.
- Community demand continues for GLM-5.3 support ([#17741](https://github.com/ollama/ollama/issues/17741)) and for adding `qwen-3.8 Flash` to cloud models ([#18128](https://github.com/ollama/ollama/issues/18128)).
- Hardware work: PR [#18124](https://github.com/ollama/ollama/pull/18124) switches integrated Vulkan GPUs to direct I/O, matching CUDA/ROCm behavior. It targets Virtio-GPU/Venus VM environments where 0.32.10+ broke model loads.

## Performance & Optimization

- Cached-prompt metrics: PR [#16916](https://github.com/ollama/ollama/pull/16916) adds `cache_n` / cached token counts to `/api/generate`, `/api/chat`, OpenAI-compatible, and Anthropic `/v1/messages` responses. Useful for measuring prefix-cache hit rates.
- MLX memory efficiency remains the top performance concern:
  - [#17924](https://github.com/ollama/ollama/issues/17924): ~0.147 GiB resident growth per request at fixed context, plateauing around 28.5 GiB (macOS, M4 Pro).
  - [#16698](https://github.com/ollama/ollama/issues/16698): MLX KV cache not released between requests; memory grew from ~24 GB to 75 GB and caused 32 GB swap.
  - [#18131](https://github.com/ollama/ollama/issues/18131): the hard-coded 8 GiB MLX prefix cache pushed a 32 GB Apple Silicon Mac into heavy swap under `qwen3.8:27b-mlx` agent workloads.
- iGPU memory reduction: [#14953](https://github.com/ollama/ollama/issues/14953) proposes lowering the fixed 457 MiB `MinimumMemory` reservation, adding RAM-pressure guards, and capping concurrent models on shared-memory iGPUs.
- GGUF parser fix: [#18130](https://github.com/ollama/ollama/pull/18130) correctly reads `general.alignment` as uint32 instead of silently falling back to 32-byte alignment.
- Terminal progress rendering: [#17864](https://github.com/ollama/ollama/pull/17864) tracks only visible rendered lines to avoid erasing terminal history during long operations.

## Stability & Regressions

Ranked by severity:

1. **MLX memory growth / swap risk** — Multiple issues report unreleased KV cache and prefix-cache growth. [#16698](https://github.com/ollama/ollama/issues/16698), [#17875](https://github.com/ollama/ollama/issues/17875), and [#17924](https://github.com/ollama/ollama/issues/17924) are closed, but [#18131](https://github.com/ollama/ollama/issues/18131) remains open and states the fixed 8 GiB prefix cache is still causing heavy swap on 32 GB machines. No upstream fix PR is visible yet.
2. **Integrated Vulkan / Virtio-GPU model-load regression** — [#18123](https://github.com/ollama/ollama/issues/18123): 0.32.10+ times out waiting for `llama-server` to start on Virtio-GPU DRM contexts; 0.32.9 works. Fix PR: [#18124](https://github.com/ollama/ollama/pull/18124).
3. **Scheduler restarts llama-server with default context** — [#18129](https://github.com/ollama/ollama/issues/18129): after a successful load, the scheduler immediately restarts the server with 4096 context, causing a redundant reload on the next request (Windows, AMD RX 9070 XT, `qwen3:8b`).
4. **Vulkan buffer allocation failure with large prompts** — [#18117](https://github.com/ollama/ollama/issues/18117): ~900 MB–1 GB allocation fails through the API despite >14 GB free VRAM; `ollama run` succeeds on the same model/GPU.
5. **Agent integrations hang with local Qwen on macOS** — [#17839](https://github.com/ollama/ollama/issues/17839): direct Ollama and OpenAI-compatible calls work, but agent tool-calling/streaming paths hang.
6. **Structured output truncation** — [#18094](https://github.com/ollama/ollama/issues/18094): `gemma3:12b` with `format` truncates when the source contains double-quoted terms requiring escaping.
7. **Tool schema `required` object parsing** — [#18051](https://github.com/ollama/ollama/issues/18051): OpenAI-compatible `/v1/chat/completions` rejects nested `required` objects. Fix PR: [#18140](https://github.com/ollama/ollama/pull/18140).
8. **UI draft loss** — [#18138](https://github.com/ollama/ollama/issues/18138): unsent composer text is lost when switching chats. Fix PR: [#18139](https://github.com/ollama/ollama/pull/18139).
9. **Existing/ongoing issues with community traction** — gemma4 image handling on Windows ([#16532](https://github.com/ollama/ollama/issues/16532)), Mac "Restart to update" needing admin ([#11972](https://github.com/ollama/ollama/issues/11972)), and Markdown/LaTeX raw-source rendering ([#15310](https://github.com/ollama/ollama/issues/15310)).

## What This Means for Application Developers

- If you run agentic workloads on Apple Silicon with MLX models, monitor RSS carefully. The current 8 GiB prefix-cache budget can cause swap on 32 GB Macs, and per-request MLX memory growth remains unresolved ([#17924](https://github.com/ollama/ollama/issues/17924), [#18131](https://github.com/ollama/ollama/issues/18131)).
- OpenAI-compatible tool schemas with nested `required` objects will fail until [#18140](https://github.com/ollama/ollama/pull/18140) merges; consider flattening conditional `required` schemas in the meantime.
- On integrated Vulkan GPUs / VM environments, pinning Ollama to 0.32.9 may be necessary until [#18124](https://github.com/ollama/ollama/pull/18124) lands.
- Once merged, [#16916](https://github.com/ollama/ollama/pull/16916) will expose cache-hit token counts; that is the right signal for measuring whether prefix caching is helping agent-loop latency.
- For structured-output/JSON-schema workflows with Gemma models, validate `done_reason` and `eval_count`; truncation can look like a normal stop ([#18094](https://github.com/ollama/ollama/issues/18094)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-30

## 1. Today's Highlights

Two release candidates — [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) and [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2) — shipped, focused on cosign-verified Docker image signatures. On the engineering side, there's active PR work on websearch-interception correctness (duplicate-kwarg crash, `web_search` function-name detection), auto-router/savings baseline miscalculations, and independent RPM/TPM rate-limit windows. Two security items are notable: an unauthenticated `/metrics` endpoint exposing multi-tenant PII ([#24530](https://github.com/BerriAI/litellm/issues/24530)) and a public follow-up on an unanswered vulnerability report ([#38889](https://github.com/BerriAI/litellm/issues/38889)). Additionally, v1.98.0 breaks `import litellm` on Python 3.10 ([#38892](https://github.com/BerriAI/litellm/issues/38892)).

## 2. Releases & Breaking Changes

- [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) and [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2): both RC releases, no new feature notes. All Docker images are signed with cosign; the same key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) is used for verification. No migration or breaking config changes announced.
- [PR #38525 (merged)](https://github.com/BerriAI/litellm/pull/38525): SSO settings edits no longer overwrite `client_secret` with the masked placeholder. Behavioral change for anyone editing OIDC config via the Admin UI.

## 3. New Model & Hardware Support

- [PR #38890](https://github.com/BerriAI/litellm/pull/38890): JetInfer added as a JSON-configured OpenAI-compatible provider — `jetinfer/*` routing, cost tracking, and context limits.
- [PR #38860](https://github.com/BerriAI/litellm/pull/38860): adds `elevenlabs/scribe_v2` audio-transcription pricing to the model cost map (fixes [#33519](https://github.com/BerriAI/litellm/issues/33519)).
- #33199 (closed): `veo-3.1-lite-generate-001` added to `model_prices_and_context_window.json`.
- [PR #38509](https://github.com/BerriAI/litellm/pull/38509): new `pointfive` logging callback (batched, gzipped) for sending proxy request logs to PointFive for cost analysis.
- No CUDA/ROCm/Metal/CPU or quantization-format work reported.

## 4. Performance & Optimization

- [PR #38523](https://github.com/BerriAI/litellm/pull/38523): RPM and TPM rate limiters now use independent window keys, eliminating false 429s at window boundaries and stopping stale 429s that previously fired for minutes after reset.
- [PR #38522](https://github.com/BerriAI/litellm/pull/38522): `custom_httpx` now resolves the effective timeout instead of passing `timeout=None`, which was silently disabling request timeouts for handlers built without an explicit timeout.
- [#35766 (closed)](https://github.com/BerriAI/litellm/issues/35766): missing `(api_key, startTime)` index on `LiteLLM_SpendLogs` was causing budget-window spend resequencing to seq-scan and saturate Postgres (Prisma P2028 under load). Closed — fix landed.
- [PR #38891](https://github.com/BerriAI/litellm/pull/38891): CI flakiness fixed by isolating the global MCP registry and pinning savings tests to the bundled cost map instead of the network-fetched one.

## 5. Stability & Regressions

Ranked by severity:

- **[Security / High]** [#24530](https://github.com/BerriAI/litellm/issues/24530) (open): `/metrics` is unauthenticated by default and exposes multi-tenant PII (prompt data). Opt-in `require_auth_for_metrics_endpoint: true` exists; no fix PR yet.
- **[Security / High]** [#38889](https://github.com/BerriAI/litellm/issues/38889) (open): a security researcher publicly reports a high-impact vulnerability with no response for a month. Maintainers should triage.
- **[Correctness / High]** [#38813](https://github.com/BerriAI/litellm/issues/38813) (open): derived auto-router baseline treats missing cache prices as free, underpricing cache-heavy pools. Fix in review: [PR #38875](https://github.com/BerriAI/litellm/pull/38875).
- **[Reporting / High]** [#38814](https://github.com/BerriAI/litellm/issues/38814) (open): standalone adaptive and quality routers omit savings baseline and first-turn metadata, making cost-optimization reports incomplete. UI fix in [PR #38888](https://github.com/BerriAI/litellm/pull/38888).
- **[Blocker for Py 3.10]** [#38892](https://github.com/BerriAI/litellm/issues/38892) (open): v1.98.0 imports `NotRequired` from `typing` (3.11+) but ships a `cp310-abi3` wheel — `import litellm` fails on Python 3.10. No fix PR yet.
- **[Crash]** [#38828](https://github.com/BerriAI/litellm/issues/38828) (open): websearch-interception agentic follow-up crashes with `acompletion() got multiple values for 'aws_region_name'`. Fix: [PR #38886](https://github.com/BerriAI/litellm/pull/38886).
- **[Correctness]** [#38831](https://github.com/BerriAI/litellm/issues/38831) (open): `is_web_search_tool` misses the conventional `{"type":"function","function":{"name":"web_search"}}` envelope. Fix: [PR #38864](https://github.com/BerriAI/litellm/pull/38864).
- **[Agentic tooling]** [#37031](https://github.com/BerriAI/litellm/issues/37031) (open): MCP auto-execute with `require_approval: "never"` hijacks client-side `tool_use` from Claude Code, breaking all non-MCP tools with "Error executing tool".
- **[Cost correctness]** [#38823](https://github.com/BerriAI/litellm/issues/38823) (open): `vertex_ai` Gemini embeddings with list input return one vector while billing all inputs — silent N-1 data loss and overbilling.
- **[Cost correctness]** [#36168](https://github.com/BerriAI/litellm/issues/36168) (open): streaming drops upstream `usage` when the final chunk has a non-empty `choices` array; `cached_tokens` lost, input billed at full rate.
- **[Router]** [#38882](https://github.com/BerriAI/litellm/pull/38882) (open): fallbacks now resolve against the tier a pre-routing hook selected, fixing a gap where complexity/auto-router tier fallback chains never ran.
- **[Compat]** [#29382](https://github.com/BerriAI/litellm/issues/29382) (open): `v1.83.14-stable` `linux/arm64` image mislabeled — contains amd64 binaries despite declaring arm64 in OCI config.
- **[Compat]** [#38339](https://github.com/BerriAI/litellm/issues/38339) (open): `/responses` does not normalize `multi_tool_use.parallel` from Azure AI/Foundry GPT models.
- **[Config]** [#38663](https://github.com/BerriAI/litellm/issues/38663) (open): Gemini 3 routes get `temperature=1.0` injected when omitted, conflicting with Google's fallback behavior.
- **[SSO]** [#38177](https://github.com/BerriAI/litellm/issues/38177): client_secret backfilled on partial SSO edits — fixed via merged [PR #38525](https://github.com/BerriAI/litellm/pull/38525).
- **Also closed/fixed:** Azure Responses API `stream_options.include_usage` rejection ([#28553](https://github.com/BerriAI/litellm/issues/28553)); Batch API cost tracking regression ([#30635](https://github.com/BerriAI/litellm/issues/30635)); Bedrock `cohere.embed-english-v3` param dispatch ([#38659](https://github.com/BerriAI/litellm/issues/38659)); AssemblyAI EU passthrough ([#28747](https://github.com/BerriAI/litellm/issues/28747)); `/model/new` 500-after-persist ([#38556](https://github.com/BerriAI/litellm/issues/38556)); `use_chat_completions_url_for_anthropic_messages` YAML loading ([#28756](https://github.com/BerriAI/litellm/issues/28756)).

## 6. What This Means for Application Developers

- **Watch your Python version.** On Python 3.10, v1.98.0 fails at import ([#38892](https://github.com/BerriAI/litellm/issues/38892)). Pin to 1.97.x or wait for a fix unless LiteLLM raises `requires-python`.
- **Lock down `/metrics` before exposing the proxy.** The default-unauthenticated endpoint is an active PII leak in multi-tenant deployments ([#24530](https://github.com/BerriAI/litellm/issues/24530)). Set `require_auth_for_metrics_endpoint: true`.
- **Test agentic websearch paths.** Duplicate provider kwargs and unrecognized `web_search` function shapes are both addressed by open PRs ([#38886](https://github.com/BerriAI/litellm/pull/38886), [#38864](https://github.com/BerriAI/litellm/pull/38864)); if you use `websearch_interception`, these fixes matter for your follow-up calls.
- **Don't fully trust auto-router savings figures yet.** Baseline ranking for cache-heavy pools is mispriced ([#38813](https://github.com/BerriAI/litellm/issues/38813)) and adaptive/quality routers are missing savings metadata ([#38814](https://github.com/BerriAI/litellm/issues/38814)). Recompute expected savings until [PR #38875](https://github.com/BerriAI/litellm/pull/38875) lands.
- **Avoid list-input embeddings on Vertex Gemini routes** until [#38823](https://github.com/BerriAI/litellm/issues/38823) is fixed — you'll be charged for N inputs but receive one vector.
- **MCP + Claude Code users:** the DCR-bridge envelope fixes ([#38524](https://github.com/BerriAI/litellm/pull/38524), [#38326](https://github.com/BerriAI/litellm/pull/38326)) improve tool listing, but the auto-execute hijack ([#37031](https://github.com/BerriAI/litellm/issues/37031)) remains a risk when using `require_approval: "never"` behind agentic clients.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-30

## 1. Today's Highlights

No new releases landed in the last 24h; activity is concentrated in Unsloth Studio bugfixes, CI hardening, and multi-GPU correctness. A device-split `index_select` failure that blocks multi-GPU training has an open fix ([#9995](https://github.com/unslothai/unsloth/pull/9995)), while Studio chat regeneration is being guarded against duplicating user turns and attachments ([#10000](https://github.com/unslothai/unsloth/pull/10000)). On performance, `/v1/models` gains a 30s servability cache, cutting per-request cost from ~316–621ms toward the 13–34ms internal baseline ([#9998](https://github.com/unslothai/unsloth/pull/9998)).

## 2. Releases & Breaking Changes

No new releases in the last 24h. Deployment-relevant updates:

- **AppImage CI fixture fixed**: nightly clean-machine lanes have been failing silently since 2026-08-19 because the fixture advertised a backend version the released app rejects ([#10001](https://github.com/unslothai/unsloth/pull/10001), closed).
- **Desktop backend lifecycle**: dead owned backends no longer block launch — they are cleared and respawned ([#9969](https://github.com/unslothai/unsloth/pull/9969), closed); Windows unload now tree-kills a surviving `llama-server` ([#9967](https://github.com/unslothai/unsloth/pull/9967), closed).
- **Homebrew Cask submission** for Unsloth Studio desktop is still being tracked ([#5156](https://github.com/unslothai/unsloth/issues/5156), 22 👍).

## 3. New Model & Hardware Support

- **Qwen3.5 hybrid-attention (GatedDeltaNet) with bnb-4bit** crashes on first forward pass — packed 4-bit weight passed undequantized to `F.linear`; under investigation ([#9867](https://github.com/unslothai/unsloth/issues/9867)).
- **AMD**: ROCmFPX requested as a default AMD quantization backend ([#9989](https://github.com/unslothai/unsloth/issues/9989)); separate generic ROCm support request ([#10005](https://github.com/unslothai/unsloth/issues/10005)).
- **AMD installer fix in review**: pull torch from an index with kernels for the user's specific AMD GPU instead of generic ROCm wheels that fault on first op ([#9829](https://github.com/unslothai/unsloth/pull/9829)).
- **Qwen3.8-27B V3 GGUF crashes on AMD** after prefill; V2 revision is a working fallback ([#9792](https://github.com/unslothai/unsloth/issues/9792)).
- **GGUF export for Qwen3.5/3.6 hybrid models** truncates trailing `ssm_conv1d.weight` tensors ([#6071](https://github.com/unslothai/unsloth/issues/6071)).

## 4. Performance & Optimization

- **`/v1/models` latency**: servability scan is cached for 30s, closing the gap between 316–621ms external and 13–34ms internal route ([#9998](https://github.com/unslothai/unsloth/pull/9998)).
- **Stalled chat generations**: durable chat runs that stop making progress are reaped, addressing UI freezes and LAN disconnects that previously showed no errors and all HTTP 200s ([#9997](https://github.com/unslothai/unsloth/pull/9997)).
- **SQLite writer contention**: one slow writer produced 54 `409 ChatMessageProt...` errors and 4 hang-like requests in 4 minutes on Colab; fix merged ([#9996](https://github.com/unslothai/unsloth/pull/9996), closed).
- **Context management**: request to proactively write tool results and duplicate attachments to disk instead of holding them in live context ([#9985](https://github.com/unslothai/unsloth/issues/9985)); live TPS/context-size widget request closed ([#9933](https://github.com/unslothai/unsloth/issues/9933)).

## 5. Stability & Regressions

Ranked by severity — fixes noted where they exist:

1. **LTX-2-GGUF video model crashes Unsloth Desktop on Windows** — access violation `0xc0000005` during video pipeline load; no fix PR yet ([#9977](https://github.com/unslothai/unsloth/issues/9977)).
2. **Qwen3.5 + bnb-4bit crash on ROCm gfx1201** — packed 4-bit weight passed undequantized to `F.linear`; no fix PR yet ([#9867](https://github.com/unslothai/unsloth/issues/9867)).
3. **Qwen3.8-27B V3 GGUF crash on AMD** — not reproduced on gfx1151 across 20 cells; evidence points at llama.cpp context checkpoints ([#9792](https://github.com/unslothai/unsloth/issues/9792)).
4. **Multi-GPU training fails with device mismatch** — `index_select` on cuda:0 vs tensors on cuda:1 when the planner splits across cards; fix PR open ([#9995](https://github.com/unslothai/unsloth/pull/9995)).
5. **Studio regeneration duplicates user message + attachments** (#9984) — fix PR collapses identical turns before saving ([#10000](https://github.com/unslothai/unsloth/pull/10000)).
6. **Local safetensors loads full BF16/FP16 instead of 4-bit QLoRA** — ~15.7GB VRAM, OOM during training; GGUF ID loading works ([#5344](https://github.com/unslothai/unsloth/issues/5344)).
7. **Ollama integration broken three ways** — wrong `source`, schema crash, models withheld from inventory ([#9986](https://github.com/unslothai/unsloth/issues/9986)).
8. **Windows GPU visibility** — desktop reports "No visible GPU" while `nvidia-smi` lists cards; PRs open for OS-level GPU reporting ([#9858](https://github.com/unslothai/unsloth/pull/9858)) and guarding against CPU-only torch after a Windows update ([#9857](https://github.com/unslothai/unsloth/pull/9857)).
9. **Cached HF models missing from chat picker** — fix PR open ([#7680](https://github.com/unslothai/unsloth/pull/7680)).
10. **MLX test suite not isolation-clean on Apple Silicon** — 24–34 failures depending on invocation order ([#8138](https://github.com/unslothai/unsloth/issues/8138)).
11. **CI/security hardening landed**: dyld classifier budgeted in CPU time ([#10003](https://github.com/unslothai/unsloth/pull/10003), closed), exec/eval/compile fail-fast for unsourced values ([#9999](https://github.com/unslothai/unsloth/pull/9999), closed), model-download E2E fixture version sharing ([#10002](https://github.com/unslothai/unsloth/pull/10002)).
12. **Closed**: `apply_patch` missing when Codex is launched via `unsloth codex .` ([#9114](https://github.com/unslothai/unsloth/issues/9114)); empty compare panes for model1/model2 pairs ([#9823](https://github.com/unslothai/unsloth/issues/9823)).

## 6. What This Means for Application Developers

- **Multi-GPU training is currently blocked** by the device-split `index_select` bug when layers are placed across cards; track [#9995](https://github.com/unslothai/unsloth/pull/9995) before relying on planner-split training.
- **Chat apps on Studio should watch #9984** — regenerated responses inflate context/token counts by duplicating user messages and attachments; the merged guard only collapses future identical turns.
- **`/v1/models` is being treated as a first-class latency surface**: expect near-instant catalog scans after the 30s cache lands. If you proxy Studio, the `x-api-key` auth support ([#7656](https://github.com/unslothai/unsloth/pull/7656)) and pre-registered MCP OAuth clients ([#7665](https://github.com/unslothai/unsloth/pull/7665)) are both worth tracking.
- **AMD on Windows remains the highest-risk platform**: gfx1201 training crashes, GPU detection failures, and AMD-specific GGUF crashes all lack confirmed fixes. V2 GGUF revisions are the safe fallback for Qwen3.8-27B.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/mux4457986479-commits/agents-radar).*
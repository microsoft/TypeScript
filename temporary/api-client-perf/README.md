# Temporary API client performance handoff

Start here in the Codespace. This directory contains the investigation, reproducible workload, load-only experiments, and raw evidence. **No production performance fixes have been applied.** Delete this temporary directory before a production PR unless its contents are deliberately promoted.

## Scope and priorities

Investigate client-side JavaScript in `packages/typescript` using the native typescript-eslint **recommendedTypeChecked**, 1,024-file, even-layout benchmark with automatic single-run inference disabled. The user wants cheaper object facades, actionable V8 deopts, large profile opportunities, and transport designs that reduce client serialization/allocation.

**Do not pursue request batching, server computation optimizations, or typescript-eslint adapter optimizations.** Protocol experiments may require matching codec changes on both endpoints, but must preserve requests and server computations. The bundled adapter is an immutable workload fixture, not an implementation target.

| Lead | Evidence | Recommended disposition |
| --- | --- | --- |
| Scanner lifetime | Sampled `createScanner` allocations fell from **870.4 MiB to 4.2 MiB** with per-source-file, reentrant pooling | First production-sized experiment; strongest allocation result |
| Facade layout | 53,833 TypeObjects; one recorded layout has **51 in-object fields / 432 bytes**; ~121,606 lazy sync/generator method-pair installations | Explore thin, stable headers and lazy metadata rather than simply rebinding methods |
| Handle representation | 140,112 NodeHandles parsed, but only 20,656 unique textual handles / 1,054 paths | Investigate owner-scoped interning or lazy decoding; the global cache prototype is unsafe to ship |
| Decode before interning | 251,791 TypeResponse interning attempts produce 53,833 new facades | Avoid allocating full transient definitions for objects already in the scoped registry |
| Protocol redundancy | Offline numeric project/file/handle substitution reduces JSON request text **83.6 → 18.3 MiB**, response text **~84 → 58.9 MiB** | Large size opportunity; not an implemented codec or measured speedup |
| V8 | 13 client deopt sites; 1,760 IC sites with state changes; 109 reach megamorphic | Prioritize hot shape instability; no evidence of a runaway deopt loop |

Final **frozen-workload** medians: baseline **6.537 s**, scanner pool **6.423 s**, bound methods **6.699 s**, combined **6.621 s**. Scanner pooling's end-to-end improvement is about **1.7%**, not the allocation reduction percentage. Peak RSS did not clearly improve. Bound-method, sidecar, pooled-buffer, global-handle-cache, and decoded-string experiments did not establish standalone timing wins.

The clean CPU profile attributes 36.5% of sampled wall time to transport including blocking I/O, 36.2% to typescript-eslint, 11.7% to the client, and 5.4% to main-thread GC. **32.7% of all samples are `read()`**: transport's total is not a client JS CPU budget. Instrumented native JSON totals were roughly 85–111 ms stringify and 216–233 ms parse.

## Codespace setup

Use Node **24.18 or newer** (prefer the same Node/V8 version for comparisons), the repository's required Go toolchain, npm, `tar`, and optionally `xz` for the original map trace. Use an adequately sized Codespace; the lint process alone peaks around 1.3 GiB. No sibling checkout, pnpm monorepo build, Rust SDK, or prebuilt macOS native executable is required.

From the repository root:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npx hereby build build:api
node temporary/api-client-perf/scripts/setup-benchmark.mjs
node temporary/api-client-perf/scripts/prepare-experiments.mjs

# One warmup per variant, then five interleaved measurements by default.
node temporary/api-client-perf/scripts/measure-experiments.mjs \
  baseline scanner-pool bound-methods scanner-pool,bound-methods

# Optional isolated deoptigate install, only needed for V8 analysis.
npm ci --prefix temporary/api-client-perf/tooling --ignore-scripts --no-audit --no-fund
```

`setup-benchmark.mjs` verifies the archive checksum, extracts to ignored `runtime/`, and installs the fixture's locked dependencies. It refuses to overwrite an existing runtime. For an already extracted fixture, use `npm ci --prefix temporary/api-client-perf/runtime --ignore-scripts --no-audit --no-fund`.

The loader redirects `@typescript/native/unstable/*` to **this worktree's built client** and explicitly supplies `built/local/tsc`. **Do not set `TYPESCRIPT_ESLINT_NATIVE_BINARY`**: this adapter chooses `@maschwenk/tsrs` when that variable is set. The runners clear it, `TSRS_NAPI`, and `TSRS_BINARY`; direct loader use rejects nonempty values.

Useful environment variables:

| Variable | Meaning |
| --- | --- |
| `API_RUNS=7` | Measured repetitions after warmup; positive integer |
| `API_RESULTS_NAME=linux-first-pass` | Result JSON basename under output directory |
| `API_OUTPUT_DIR=/absolute/path` | Isolate one experiment's outputs; default `runs/` |
| `API_BINARY=/absolute/path/to/tsc` | Explicit matching binary override |
| `API_BENCHMARK_ROOT=/absolute/path` | Alternative runtime using the same `packages/` and `cases/` layout |
| `API_BENCHMARK_CASE=...` | Alternative case basename; current assertions intentionally require the same 1,024-file/one-error workload |

The prototype generator uses the built JS and fails when expected transform shapes change. If changing `API_OUTPUT_DIR`, use the same value for generation and measurement. Rebuild `build:api` after source edits, then regenerate candidates. With a production change applied, the `baseline` label means the current built client, not a magically restored original revision; compare saved measurements or separate worktrees. An already-implemented scanner pool will no longer match the scanner transform.

All outputs, generated candidate JS, dependency directories, and extracted third-party runtime are ignored. Timing runs reject profiling/instrumentation flags. Do not run concurrent benchmark processes or compare measurements across Node versions, compiler revisions, fixture changes, or machines.

## Capture and inspect profiles

```sh
node temporary/api-client-perf/scripts/capture.mjs cpu
node temporary/api-client-perf/scripts/capture.mjs allocations
node temporary/api-client-perf/scripts/capture.mjs allocations scanner-pool,bound-methods
node temporary/api-client-perf/scripts/capture.mjs wire
node temporary/api-client-perf/scripts/capture.mjs counters
node temporary/api-client-perf/scripts/capture.mjs deopts

node temporary/api-client-perf/scripts/summarize-profile.mjs \
  temporary/api-client-perf/runs/cpu-baseline.cpuprofile
node temporary/api-client-perf/scripts/summarize-heap.mjs \
  temporary/api-client-perf/runs/allocations-baseline.heapprofile
node temporary/api-client-perf/scripts/analyze-deopts.mjs \
  temporary/api-client-perf/runs/deopts-baseline-v8.log

# Analyze preserved compressed evidence directly.
node temporary/api-client-perf/scripts/analyze-deopts.mjs \
  temporary/api-client-perf/profiles/frozen-ic-v8.log.gz
node temporary/api-client-perf/scripts/analyze-deopts.mjs \
  temporary/api-client-perf/profiles/baseline-v8.log.xz

# Unpack a profile into ignored output for Chrome DevTools.
gzip -dc temporary/api-client-perf/profiles/clean-baseline.cpuprofile.gz \
  > temporary/api-client-perf/runs/historical-clean.cpuprofile
```

`capture.mjs maps` also records maps, but the original uncompressed map log was 619 MiB. Use only when needed. Original logs are preserved without lossy filtering; the original map log was re-encoded from gzip to xz to keep the repository archive small.

CPU mode is uninstrumented. Allocation mode instruments object/method/JSON counts and uses inspector sampling at 32 KiB **including objects collected by both minor and major GC**. Default `--heap-prof` is not a reliable allocation-throughput measurement. Compare equivalent instrumentation and API-specific stacks, not whole-process sampled totals. Wire mode also records timing, payload examples, and a deliberately incomplete compact-text estimate. These are diagnostic runs, not timing evidence.

ESLint **exit 1 is expected**, but accepted only after verifying exactly 1,024 files, no fatal errors, and the single intentional `@typescript-eslint/no-floating-promises` error. Timing groups also check exact normalized diagnostic equality and unchanged loaded-source fingerprints across variants. Hashes cover original modules before prototype substitution; they are a drift guard, not proof that substituted code is identical. Each profile capture prints its hashes for comparison.

The deoptigate 0.7.1 core parser needs the included Node 24 compatibility adapter: `JS` code creation, IC timestamp columns, file URLs, getter/setter names, eager/lazy names, and baseline/Maglev tier markers. Tier normalization is deliberately coarse. Inspect raw logs/traces for exact tier behavior and positions. Megamorphism alone is not an optimization verdict.

## Recommended agent plan

1. **Establish a fresh Linux baseline.** Read `investigation.txt`, `evidence/frozen-results.json`, the clean CPU summary, allocation summaries, and final wire metrics. Record compiler SHA, Node/V8/Go versions, fixture provenance, source/diagnostic digests, and machine size. Run at least five interleaved measurements on an otherwise quiet Codespace; retain all raw samples, use medians and parent CPU, and report spread. Capture clean CPU and collected-object allocations separately. The historical 168.899-second baseline outlier consumed only ~9.221 seconds parent CPU; do not use its ~39-second arithmetic mean as the baseline or quietly delete it.

2. **Implement scanner reuse in source first.** Start in `packages/typescript/src/ast/astnav.ts:createChildren`. The prototype uses a per-source-file WeakMap of available scanners, checkout/pop, and `try/finally` return. It never shares an in-use scanner across nested traversal. Before implementation, add targeted tests for repeated/cached children, nested/reentrant child creation, exceptions, trivia/JSDoc, JSX/language variants, token boundaries, scanner state reuse, and independent source files. Confirm scanner allocation stacks actually disappear without increasing retained memory. Re-run real-workload diagnostics and clean timing; a huge allocation win can still yield a modest latency improvement. Prefer source-file ownership/lifetime patterns already present in the API.

3. **Design a genuinely smaller facade.** Inspect TypeObject/Symbol/Signature constructors and generated sync getters. Separate the minimal stable identity/flags header from bulky relationship metadata and caches; preserve cache rules in the `api-client` skill. Investigate avoiding access-order-dependent own-method installations and unused field slots. Repeated metadata for existing registry entries is a separate problem from facade construction. Measure per-instance layout, allocation throughput, retained memory, GC, and real-workload time, not just field counts. Keep optional large caches lazy without replacing one hot shape problem with many small sidecar allocations.

4. **Preserve the callable contract deliberately.** Sync methods support detached invocation and owner-bound `.gen`. Shared ordinary prototype methods are not a drop-in replacement. The included hoist/bind prototype retains `const owner = this`, preserves generator bodies, rewrites owner references in default parameters, and leaves nine named-function method pairs unchanged. It reduced getter-site allocation estimates from 35.5 to 21.1 MiB without a reliable speedup. Either preserve the existing contract in a better representation or explicitly evaluate a separate generator surface/API migration; do not silently break `.gen`, detached calls, sync/async parity, or disposal.

5. **Investigate owner-scoped handle reuse.** Inspect `api/node/node.ts`, generated node accessors, source-file caches, and snapshot ownership. Equal handle strings are insufficient across source-file incarnations. Choose an existing owning registry/source file for interning or retain a compact lazy handle until resolution. Add tests for concurrent snapshots/projects, same paths across file versions, ownership/disposal, cache clearing, resolution, and source-file replacement. Respect the documented absence of identity guarantees after owner disposal/cache clearing. The global `Map` prototype intentionally ignores lifecycle and must not be promoted as-is.

6. **Use V8 evidence to choose, not manufacture, shape fixes.** Prioritize hot megamorphic reads of `flags`, `objectFlags`, registry state, and AST `view`/`_byteIndex`/`_sourceFile`. Determine which instability comes from mutable facade shapes versus naturally heterogeneous JSON response records. Correlate ICs/deopts with self CPU/allocation before changing representation. Verify any claimed fix with fresh raw logs and workload time; avoid spending effort on one-time warmup bailouts. Profile again after scanner/facade changes because bottlenecks can move.

7. **Prototype a schema-aware protocol, not a generic codec swap.** The outer frame already uses MessagePack; checker payloads are JSON strings. Start with redundant project/file identities and typed node references, then distinguish definitions from references for types/symbols/signatures. Consider versioned records, compact numeric method/project/file IDs, source-file incarnation IDs, and direct decoding into scoped registries before allocating full response metadata. Specify framing, compatibility/version negotiation, ownership, disposal, truncation/error behavior, and server/client synchronization. Preserve exactly the request pattern and checker computations. Count definition-table and invalidation overhead; the text substitution estimate excludes both. Benchmark UTF-8/string allocation, decode/intern allocations, bytes, GC, and clean wall/CPU. A handwritten JS MessagePack decoder may lose to V8 JSON; redundancy elimination and direct materialization are the stronger hypotheses. Do not claim an offline size estimate is an end-to-end performance result.

8. **Commit independently validated changes.** Keep each lead in a reviewable implementation/test commit; avoid a giant facade/protocol rewrite. Search existing ownership/cache/helpers before adding mechanisms. Sync API files are generated from async source; do not hand-edit generated sync implementations as the production fix. Read applicable skills/instructions, add minimal tests before fixes, and run `npx hereby validate --api` for API changes, or `npx hereby validate --all` if tools/benchmarks also change. Record negative results rather than reviving prototypes without a new hypothesis. Keep fixture modifications and adapter optimizations out of production patches. Do not open PRs.

## Evidence inventory and provenance

| Path | Contents / interpretation |
| --- | --- |
| `investigation.txt` | Historical full report; its final repository-status/reproduction paragraphs describe the original session, not this handoff |
| `evidence/frozen-results.json`, `frozen-output.txt` | Authoritative final timing samples, including shared-host outliers |
| `evidence/measure-*`, `followup-*`, `facade-*` | Earlier/non-frozen comparisons; do not mix their arithmetic summaries or changing adapter builds into final medians |
| `evidence/frozen-*-allocations.txt`, `frozen-*-metrics.json` | Matched final allocation evidence: baseline vs scanner pool + bound methods |
| `evidence/clean-cpu-summary.txt`, `clean-baseline-metrics.json` | Final uninstrumented CPU evidence |
| `evidence/final-wire-metrics.json`, `timing.json` | Final request/payload mix, construction/interning counts, serde, compact estimate, timing decomposition |
| `evidence/frozen-ic-summary.json`, `frozen-deopts.txt` | Final deopts/ICs |
| `evidence/deoptigate-summary.json`, `baseline-deopts.txt` | Original map layout examples and earlier V8 context |
| `profiles/clean-baseline.cpuprofile.gz` | Best historical clean CPU profile |
| `profiles/frozen-{baseline,candidate}.{cpuprofile,heapprofile}.gz` | Matched instrumented baseline/candidate; not clean timing data |
| `profiles/all-allocations.heapprofile.gz`, `reuse-allocations.heapprofile.gz`, `baseline.cpuprofile.gz` | Earlier allocation/CPU context; prefer final matched profiles |
| `profiles/frozen-ic-v8.log.gz`, `baseline-v8.log.xz` | Full original raw V8 evidence; embedded historical local paths are intentional |
| `evidence/reference-lint.json.gz` | Representative original final diagnostics |
| `evidence/original-validation.log.gz` | Original successful `npx hereby validate --api` log |
| `evidence/handoff-*`, `source-parity.json` | Packaged-harness smoke runs and source/diagnostic fidelity check; not a new statistical timing claim |
| `benchmark-runtime.tar.gz`, `benchmark-runtime.sha256` | Licensed compiled workspace runtime, generated benchmark source, normalized npm manifests, lockfile, and provenance; no dependency directories or native binary |
| `scripts/` | Portable load hooks, validated runners, load-only prototypes, analysis, setup, and optional snapshot recapture tool |
| `tooling/` | Isolated locked deoptigate dependency; no root dependency changes |

Original compiler/client revision: `6ad8c56f9b5a9bb910046c56059296311adc24ba`; Node `v24.18.0`; Go `go1.27.1`; macOS arm64. Adapter checkout revision: `1f1dbaf023b3629b59337ac6a47d95781dc1c676`. Performance checkout revision: `c6f70316049aaefb9d5cee2cacc4b6bbe0bd302d`.

The adapter was rebuilt during profiling. Final runs froze its compiled typescript-estree output, including someone else's local changes. **A clean clone/build at the adapter SHA will not necessarily reproduce this fixture.** The archive preserves that frozen dist and the rest of the 11-package runtime dependency graph, with MIT license notices from both repositories. Manifests report 8.71.0 and are intentionally normalized for npm; some historical compiled/version context was 8.70.0. Development-only catalog/workspace build dependencies and the sibling Rust dependency are omitted; runtime dependencies are pinned and the extracted fixture has its own lockfile. No external checkout was modified.

All 623 originally recorded non-manifest module hashes match the packaged runtime/client. Three package manifests were intentionally normalized; npm places one third-party `ignore` module under a workspace package, so the portable loader additionally fingerprints it. Absolute historical source and diagnostic digests consequently differ from portable ones. The original final source digest was `602fafa18e1525e2b6a9ee8e86ee8bac5febf6c597efee5389ce2ca30c5dff0a`; the portable smoke digest is `8699a630c97c3b9d5dfd1f6d8e2b8846b570b8b08c110e6c8ec0787a59d7cdd7`. Relative-path-normalized diagnostics match the original reference; portable digest: `3ea3297381a0204a6c9ef1372882074d1c86ed29c4487c0d4401360b9c93fdd5`. Establish a fresh baseline if code, Node, or installation layout changes.

The packaged wire run also exactly matches the historical counts for TypeObjects, Symbols, Signatures, NodeHandles, handle parses, TypeResponse interning attempts, unique handles/paths, and **125,761 requests**. Request/response byte totals can change with checkout path lengths.

Handoff verification on the original macOS host passed: clean archive extraction plus locked install; baseline and all seven alternative combinations (including the combined scanner/bound variant); all six capture modes and both allocation variants; gzip/xz integrity and raw V8 reanalysis; original diagnostic/source parity; and `npx hereby validate --all` (including 954 API tests, ancillary tests, lint, and formatting). The full validation log is `evidence/handoff-validation.log.gz`. The one-measured-run smoke samples establish harness correctness only, not statistical speedups. Linux performance measurements remain the next agent's work.

To deliberately recapture an updated fixture from installed/built external checkouts, use `snapshot-benchmark.mjs <adapter-checkout> <case-directory> [frozen-estree-dist]` with a new `API_BENCHMARK_ROOT` destination, install its dependencies to create a lockfile, and archive only source/dist/manifests/licenses. This is not necessary for the initial Codespace run. Do not overwrite or silently refresh the historical fixture.

Redundant lint reports, dependency trees, native binaries, startup failures, and recreatable generated prototypes were intentionally omitted. Useful compressed profiles, raw timing arrays, summaries, and the complete original map log were retained.

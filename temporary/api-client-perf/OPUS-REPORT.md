# API client performance: results of the autonomous follow-up investigation

This report covers the Linux follow-up to the handoff in [README.md](README.md). Every experiment I ran is listed here, including the ones I discarded. It ends with a recommended series of six commits.

## Summary

| Configuration (vs. unmodified base, paired and interleaved) | Wall | Client (parent) user CPU | Server CPU |
| --- | --- | --- | --- |
| Commits 1–5 (client/protocol changes; polling disabled) | **−4.3%** (faster 9/9) | **−3.5%** (lower 9/9) | −0.4 s (−4%) |
| Commits 1–6 with defaults (client polls 100 µs) | **−11.1%** (9/9) | +4.5% | −1.0 s (−11%) |
| Commits 1–6 + opt-in server polling (50 µs) | **−17.4%** (9/9) | +1.5% | +2.5 s (+28%) |

Source: `evidence/opus/compare/series-summary.json`, 9 measured runs per variant after one warmup each, all built from the final commit series. Total CPU (client user + sys + server) was 32.2 s for base, 31.3 s for commits 1–5, 32.7 s for the default configuration (+1.6%), and 35.1 s with server polling (+8.9%). The default configuration therefore buys an 11% wall-time reduction for under 2% more total CPU. A separate run of the pre-series snapshot (`final-summary.json`) agrees: −4.5%, −13.4% and −18.0%.

The largest finding: **most of the API's transport time is process wake-up latency, not serialization.** On this VM a bare pipe ping-pong between two processes costs ~23 µs. The API's `echo` costs ~25 µs, and the workload makes 125,761 round trips. Polling briefly before blocking removes most of that latency. Shrinking the JSON payloads helped more modestly, mostly through less request encoding and decoding work. A large reduction in response bytes did not help.

## Environment and method

* Machine: Codespace VM (Microsoft hypervisor), 16 vCPU AMD EPYC 9V74, 62 GiB RAM. Node **v24.21.0** (V8 13.6.233.17). The README asked for 24.18 or newer; all comparisons use this one Node. Go 1.27.1, linux/amd64.
* Base revision: `93c7fcbcd3` (handoff commit `ced3277e6c` plus README clarification; compiler at `6ad8c56f9b`).
* Workload: the README's frozen 1,024-file recommendedTypeChecked fixture. ESLint verified 1,024 files and the single intentional `no-floating-promises` error on every run. The normalized diagnostic digest was identical across all variants in every comparison, and fixture-source digests were unchanged.
* **Harness additions** (in `scripts/`):
  * `snapshot-build.mjs <name>` copies the built client (`packages/typescript/{dist,lib,package.json}`) and `built/local` into `runs/builds/<name>`.
  * `compare-builds.mjs <reference> <candidates…>` runs saved builds in interleaved, rotating order through the existing loader. It reports medians with min–max and **paired per-round deltas** ("faster in k/n"). Optional `builds/<name>/env.json` sets per-build environment.
  * `API_CLIENT_ROOT` (in `config.mjs`/`profile-loader.mjs`) redirects all `@typescript/native/unstable/*` and client `dist` imports to a saved build. `telemetry.mjs` adds a `fixtureDigest` that excludes client modules, so builds with different client code can be compared.
  * `profile-api.mjs` records the **server process's CPU** from `/proc/<pid>/stat` at exit, which the original harness could not see. It also accepts `API_CLIENT_POLL_US`/`API_SERVER_POLL_US`, and `API_GAPS=1` writes a histogram of the client's time between requests.
  * `telemetry.mjs` gained `API_RESPONSE_BREAKDOWN=1`, which tallies the characters spent on project IDs, handle paths, file descriptors and type objects in responses.
  * `scripts/microbench/`: `echo.mjs` (API echo latency), `pingpong.mjs` and `goecho.go` (raw pipe floor, optionally polling).
* Noise: an A/A run (base vs. an identical copy, 7 runs) differed by −0.5% wall (faster in 4/7) and +1.1% user. Machine speed drifted during the day: base medians ranged from 19.8 s to 23.9 s between sessions. I therefore rely on **paired deltas within a session** and never compare medians across sessions. I count a result as a gain only if it is consistent, roughly ≥6/7 or 9/9 in the expected direction.
* Commands are listed in [Reproduction](#reproduction).

### Fresh Linux baseline (base, uninstrumented CPU profile)

`evidence/opus/cpu-base-summary.txt`: 21.0 s sampled.

| Category | Share |
| --- | --- |
| Transport incl. blocking I/O | 35.5% (`read` alone 30.2%, `writeBuffer` 4.7%) |
| typescript-eslint | 25.5% |
| API client | 12.3% |
| Other | 11.5% |
| ESLint | 6.0% |
| GC | 5.5% |

The top client self time is `apiRequest` (841 ms), which contains V8's inlined `JSON.parse`/`stringify`. Next come `createScanner`, `parseNodeHandleFromCompiler` and `cacheGeneratorMethod`. Wire capture (`evidence/opus/wire-base-*`): 125,761 requests, 87.7 MB of requests, 99.4 MB of responses. Client-measured round trips total 8.9 s, of which only 2.85 s is server-measured handler time: about **48 µs of overhead per request**.

## Experiments

Each gain is relative to the previous kept state, measured with paired interleaved runs. "Kept" changes are in the recommended series. "Discarded" changes are saved under `opus-patches/discarded-*.patch` for reference; they are relative to intermediate states and need not apply cleanly.

### 1. Transport latency (kept: commit 6)

**Diagnosis.** On this VM the raw floor (`scripts/microbench/pingpong.mjs`) is about 23 µs per round trip, whether the other side is `cat` or a minimal Go echo. The API `echo` costs ~25 µs, so request handling is cheap and the wake-up of a blocked reader dominates. Polling a non-blocking pipe in the microbenchmark:

| Configuration | µs per round trip |
| --- | --- |
| Neither side polls | 22.8 |
| Go side polls | 14.1 |
| Node side polls | 19.2 |
| Both poll | 11.0 |

The workload's histogram of client time between requests (`evidence/opus/request-gap-histogram.json`) shows 54% of requests sent within 20 µs of the previous response, 79% within 50 µs and 92% within 100 µs.

Note: libuv creates Node's stdio "pipes" as **Unix socketpairs**, so the server check has to accept sockets as well as FIFOs.

**Server-side polling** (Go reader polls stdin for a window, then `poll(2)`s):

| Window | Wall | Server CPU | Runs |
| --- | --- | --- | --- |
| 25 µs | −1.4% | — | 6/7 |
| 50 µs | −4.2% / −3.3% | +3.8 s | 6/7, 5/5 |
| 100 µs | −5.3% / −5.0% | +4.9 s | 7/7, 5/5 |
| 200 µs | −6.2% / −6.1% | +5.5 s | 7/7, 5/5 |
| 500 µs | −6.9% | +6.2 s | 5/5 |
| 1000 µs (1 run) | — | +6.9 s | — |

The server polls while the client is busy between requests, so its CPU cost is high: +50% server CPU at 50 µs, against a base of 7.75 s.

**Client-side polling** (on top of commits 1–5; Node switches its stdout pipe to non-blocking and calls `readSync` until data or timeout, then switches back to blocking):

| Window | Wall | Client user CPU | Runs |
| --- | --- | --- | --- |
| 15 µs | −3.6% | +5.8% | 6/6 |
| 30 µs | −6.5% / −5.0% | +7.2% / +7.8% | 6/6, 7/7 |
| 60 µs | −7.1% | +7.3% | 6/6 |
| 120 µs | −8.9% | +7.7% | 6/6 |

Server CPU fell slightly (~−0.3 s): the server no longer pays to wake a sleeping reader. Client polling is much cheaper in CPU than server polling because the client only polls while the server is computing.

**Both sides** (server 50 µs, client 30 µs): −9.0% wall (7/7), +1.3 s client user, +3.3 s server CPU.

**Shipped design (commit 6):**
* `SyncRpcChannel` takes a poll window. `ClientSpawnOptions.responsePollMicroseconds` sets it; it defaults to **100** and `0` disables polling.
* While polling it sets `Error.stackTraceLimit = 0`, because each empty `readSync` throws `EAGAIN`.
* It switches back to blocking mode before direct large reads and after a timeout.
* It is not used on Windows (no `setBlocking`).
* Server polling is opt-in: `serverRequestPollMicroseconds` passes `--requestPollMicroseconds`, which sets `StdioServerOptions.RequestPollWindow`, which enables `ipc.NewPollingReader`. The reader gets the fd through `syscall.Conn` (no `os.File`, satisfying forbidigo) and only polls pipes and sockets.
* Tests: Go `TestPollingReader` (data during and after the window, EOF, disabled) and `test/sync/polling.test.ts`. The latter covers all four client/server combinations, including echo payloads of 1 B, 1 KB and 200 KB, and fs callbacks that delay responses past the window.

The default of 100 µs client / 0 server is a judgment call. It gives most of the client-polling benefit for a small total-CPU increase (+1.6% total in the series run), while CPU-bound parallel lint setups can still disable it.

### 2. Scanner reuse (kept: commit 1)

Implemented by a subagent in a separate worktree from README step 2. A `WeakMap<SourceFile, Scanner[]>` holds idle scanners. A scanner is checked out (`setText` and `setLanguageVariant` on reuse) and returned in `finally`, after `clearCommentDirectives` and `resetTokenState(0)`. Nested traversal gets a different scanner. The same pool serves `getTokenAtPosition` and related lookups. Six new tests cover:
* caching and reuse
* nested traversal
* exceptions
* trivia, directives and JSDoc
* token boundaries
* `.ts`/`.tsx`/`.jsx` files interleaved

The subagent confirmed that the exception and directive tests fail when the corresponding protection is removed.

* Allocation evidence: before the change, `createScanner` was the largest allocation site at 864.7 MiB, **13.75% of all sampled bytes** (`evidence/opus/allocations-lazy-summary.txt`).
* Alone on base: −0.5% wall (5/7), within noise.
* On top of the protocol and lazy-handle changes, re-measured with 9 runs: **−1.4% wall (9/9), −1.0% client user (9/9)**. Kept.

### 3. Wire protocol: requests (kept: commits 2–4)

| Step | Change | Wall | Client user | Runs |
| --- | --- | --- | --- | --- |
| P1 (commit 2) | `omitzero` for `TypeResponse.objectFlags/isTupleType/value/isThisType`, `SymbolResponse.checkFlags`, `SignatureResponse.flags`. Go's json v2 `omitempty` does not omit `false`/`0`, so every type response carried `"objectFlags":0,"isTupleType":false,"value":null,"isThisType":false`. The client defaults the fields. | −1.7% | −1.8% | 7/7 |
| + P2 (commit 3) | Project handles. Requests repeated the ~140-character project ID. `ProjectResponse.handle` (`"#N"`, from a process-wide intern table; project IDs are rooted paths and never start with `#`) is sent instead. A json v2 `UnmarshalFromFunc` hook on `project.ID`, applied in `unmarshallerFor`, decodes handles back to IDs. Full IDs are still accepted. | cumulative −2.3% | −1.9% | 6/7 |
| + P3 (commit 4) | Request node handles use `index.kind.#<sourceFileNodeID>` instead of `index.kind.<path>`, for nodes decoded from server-encoded files. The ID is already in the encoded file header. The server resolves it through a lazily built per-program `nodeID→SourceFile` index. IDs of files encoded for a client but missing from the requested program fall back to path lookup, which preserves the "createSourceFile can be used with a compatible program" behaviour. Public `getNodeId` and compiler-produced handles keep the path form. | cumulative **−4.0%** | −3.9% | 7/7 |

* Request bytes: 87.7 → 22.7 MB. Response bytes: 99.4 → 88.2 MB. Request count unchanged at 125,761, as is the request pattern.
* Server CPU fell as well (base 9.15 s → 8.58 s in that session).
* The first attempt at P3 broke the client's own local parse of `getNodeId()` (`API.getSymbol`) and cross-AST resolution. Both were fixed by the design above; all 954 API tests then passed.
* New Go test: `TestProjectHandles`.

### 4. Lazy declaration handles (kept: commit 5)

Symbols and signatures eagerly built a `NodeHandle` for every declaration: 140,112 handle parses for 20,656 unique handles. The adapter only reads `declarations`, `valueDeclaration` and `declaration` on demand. The wire strings are now kept and materialized on first access. This addresses the README's handle-representation lead without a global cache.

* Result vs. P1–P3: −0.8% wall (5/7), **−2.1% client user (6/7)**.
* `parseNodeHandleFromCompiler` self time fell from 107 ms to 45 ms.

Kept on the strength of the consistent CPU reduction.

### 5. Discarded experiments

* **Decode string responses in place** (`discarded-direct-decode.patch`). Decode responses directly from the read-ahead buffer instead of `allocUnsafeSlow` + copy + `toString`. Result: −0.5% wall (4/7), −0.2% user (5/7), within A/A noise.
* **Response compaction** (`discarded-response-compaction.patch`; also needs a `handleIDFor` helper in `projecthandle.go`). Changes:
  * project handles in snapshot-owned `SymbolReference`s
  * path-less `index.kind` declaration handles for file-owned symbols, expanded on the client from the owner's descriptor
  * `SourceFileDescriptor.fileName` omitted when equal to `path`, via custom `MarshalJSONTo`/`UnmarshalJSONFrom`

  Response JSON shrank from 71.4 to 53.7 MB (`evidence/opus/response-breakdown.json`), but wall was +0.7% (faster in 3/7) and user +0.7% (lower in 2/7). Server CPU −3% and RSS −22 MiB were consistent but don't meet the bar. Conclusion: V8 `JSON.parse` cost is driven by object count, not string bytes. Shrinking *request* bytes helped mainly through Go-side decoding and handle-path lookups.

### 6. Leads examined but not pursued, with reasons

* **Facade layout and bound methods.**
  * With `target: es2022`, every declared `TypeObject` field is emitted as a class field, so instances share one 51-field layout. Shape divergence comes only from lazy own-method installs.
  * 53,833 types × 432 B ≈ 23 MB, against ~6.6 GB of sampled allocations.
  * The handoff's bound-method and sidecar experiments found no win.
  * The adapter uses owner-bound `.gen` (`signature.getParameters.gen()`, `checker.X.gen(...)`), so the method contract must stay.

  Expected gain too small to justify the risk.
* **Eliding repeated `TypeResponse`s.** 79% of type responses (251,791 attempts → 53,833 facades) are already in the client registry. The server cannot know what a particular client holds: LSP-mode snapshots can be shared by several clients, and several client `Snapshot` objects can share one ID. A safe design would need server-allocated, per-client registry tokens with release semantics. Estimated benefit ~0.5–1% (≈200k small objects parsed). Not pursued; a candidate for a future protocol revision.
* **Memoizing `snapshotRefKey` in `SourceFileCache`.** About 50 ms of self time (`retainRecordForSnapshot` and related), which is below what I can measure. Not pursued.
* **Batching and server computation.** Out of scope per the README.

## Final profile (commits 1–5 + scanner, before polling)

From `evidence/opus/cpu-lazy-summary.txt` and `allocations-lazy-summary.txt`:
* Client self time fell from ~2.70 s to ~2.41 s, and `apiRequest` from 841 ms to 693 ms.
* With scanner reuse applied, the 865 MiB `createScanner` allocation site disappears.
* The remaining client costs are JSON parse/stringify of object-heavy responses, `cacheGeneratorMethod` (~100 ms), `TypeObject` construction (~74 ms) and AST navigation.
* With polling enabled, the remaining transport cost is mostly real server work plus latency for gaps longer than the poll window.

## Recommended commits

Base: `93c7fcbcd3`. Branch `opus-api-perf` in this repository; also exported as `opus-patches/0001…0006-*.patch` and `opus-patches/opus-api-perf.bundle`.

| # | Commit | Kind |
| --- | --- | --- |
| 1 | Reuse scanners across astnav child and token materialization | client only |
| 2 | Omit zero-valued fields from type, symbol, and signature responses | protocol (both ends) |
| 3 | Accept compact project handles in API requests | protocol (both ends) |
| 4 | Identify source files by node ID in request node handles | protocol (both ends) |
| 5 | Materialize declaration node handles on first access | client only |
| 6 | Poll for sync API messages briefly before blocking | transport (both ends), new options |

Commits 2–4 change the wire format, so client and server must come from the same tree, which the sync channel already requires. Breaking or behavioural changes:
* `Project` gains an internal `handle`.
* Request handles for decoded nodes are no longer path-based. A node used against a program that doesn't contain its exact AST resolves by path only if the server encoded that file for a client.
* `checkFlags`, `flags`, `objectFlags`, `isThisType` and `value` may be absent on the wire.
* New client options: `responsePollMicroseconds` (default 100) and `serverRequestPollMicroseconds` (default 0).
* New server flag: `--requestPollMicroseconds`.

**Validation:** in the worktree with the final series, `npx hereby validate --api` passed:
* Go tests, including the new `TestPollingReader` and `TestProjectHandles`
* 964/964 API tests, including the new scanner and polling tests
* lint: 0 issues
* formatting: clean

Applying the patches with `git am --keep-cr` (the TypeScript sources are CRLF) reproduces the branch's tree exactly; I verified this on a fresh worktree.

```sh
git checkout 93c7fcbcd3
git am --keep-cr temporary/api-client-perf/opus-patches/000*.patch
# or: git fetch temporary/api-client-perf/opus-patches/opus-api-perf.bundle opus-api-perf && git checkout FETCH_HEAD
```

## Reproduction

```sh
export API_OUTPUT_DIR=$PWD/temporary/api-client-perf/runs/opus
npx hereby build build:api
node temporary/api-client-perf/scripts/snapshot-build.mjs base         # on the base revision
# ...check out / apply the series, rebuild...
node temporary/api-client-perf/scripts/snapshot-build.mjs series
mkdir -p $API_OUTPUT_DIR/builds/seriesNoPoll && (cd $API_OUTPUT_DIR/builds/seriesNoPoll && for e in dist lib package.json vendor built; do ln -s ../series/$e $e; done && echo '{"API_CLIENT_POLL_US":"0"}' > env.json)
API_RUNS=9 node temporary/api-client-perf/scripts/compare-builds.mjs base seriesNoPoll series
# Profiles of a saved build:
API_CLIENT_ROOT=$API_OUTPUT_DIR/builds/series API_BINARY=$API_OUTPUT_DIR/builds/series/built/tsc \
  node temporary/api-client-perf/scripts/capture.mjs cpu
# Latency microbenchmarks:
node temporary/api-client-perf/scripts/microbench/echo.mjs
```

All timing summaries, including every per-run sample (`compare/<name>.json`), are in `evidence/opus/compare/`:

| Summary | Contents |
| --- | --- |
| `round1` | Server polling windows, direct decode, scanner on base |
| `spin-sweep` | Server polling windows with server CPU |
| `proto1` | P1–P3 |
| `lazy` | Lazy declaration handles |
| `resp` | Response compaction |
| `lazyscan` | Scanner reuse on top of P1–P3 and lazy handles |
| `clientspin` | Client/server polling matrix |
| `clientsweep` | Client polling windows |
| `final` | Pre-series snapshot |
| `series` | Exported commits |
| `compare-base-vs-base2` | A/A |

The variants labelled `spin*`, `lsS`, `lsC*` and `lsSC` were measured with earlier, environment-variable-controlled builds of the same polling logic (`TSGO_API_SPIN_US`, `TSGO_API_CLIENT_SPIN_US`). The shipped commit replaces those variables with options.

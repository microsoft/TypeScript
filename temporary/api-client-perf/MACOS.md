# Running the API performance comparison on macOS

This reproduces the [OPUS-REPORT.md](OPUS-REPORT.md) measurements on a Mac. One script builds the unmodified base revision and this branch, runs latency microbenchmarks, and then runs interleaved end-to-end comparisons on the 1,024-file typescript-eslint fixture. The main question is how much of the Linux gain from wake-up latency polling carries over to macOS (see "Transport latency" in the report).

## Prerequisites

- **Node 24.18 or newer** (`node --version`). Use the same Node for every comparison.
- **Go 1.27** (`go version`), the version `tsc/go.mod` requires.
- Xcode Command Line Tools (`git`, `tar`).
- About 3 GB of free disk space. The `runs/` directory is git-ignored.

## Steps

```sh
git clone --branch api-client-perf-opus https://github.com/microsoft/TypeScript.git ts-api-perf
cd ts-api-perf
npm ci --ignore-scripts --no-audit --no-fund

# Do not set these: the fixture would switch to a different backend.
unset TYPESCRIPT_ESLINT_NATIVE_BINARY TSRS_NAPI TSRS_BINARY

node temporary/api-client-perf/scripts/platform-comparison.mjs
```

The script does all of the following:

1. Extracts and installs the benchmark fixture (`runtime/`) if it isn't already present.
2. Builds this checkout (`npx hereby build build:api`) and saves it as `runs/builds/series`.
3. Builds the base revision `93c7fcbcd3` in a temporary git worktree, saves it as `runs/builds/base`, and removes the worktree.
4. Runs the microbenchmarks:
   - `echo.mjs`: API echo latency for base, and for series with every combination of client/server polling.
   - `pingpong.mjs` with `goecho.go`: the raw pipe round-trip floor, with and without polling on either side.
5. Runs the end-to-end comparisons, with a warmup run and 7 measured runs per variant, interleaved:
   - **main**: `base`, `seriesNoPoll` (commits 1–5 only), `series` (defaults: client polls 100 µs), `seriesS50` (also server polls 50 µs).
   - **client-sweep**: client poll windows of 0, 25, 50, 100, 200 and 400 µs.

Expect roughly 45–90 minutes in total, depending on the machine. The builds take a few minutes; each lint run takes about 6–10 s on Apple Silicon.

Options:

| Option | Effect |
| --- | --- |
| `--runs N` | Measured runs per variant (default 7) |
| `--skip-build` | Reuse the saved builds |
| `--no-sweep` | Skip the client poll-window sweep |
| `--no-micro` | Skip the microbenchmarks |

For a quick smoke test, use `--runs 1 --no-sweep` with `ECHO_ITERATIONS=20000`.

## Getting reliable numbers

- Plug in to power and turn **Low Power Mode off**. The script records the power source and Low Power Mode, and warns if either looks wrong.
- Quit other heavy apps, including Docker, browsers with many tabs, Spotlight indexing and Time Machine. Don't use the machine during the runs.
- Don't run two benchmarks at once. Don't compare numbers across machines, Node versions or separate sessions; only the paired deltas within one run are meaningful.
- A laptop can throttle on heat. If the base medians drift a lot between runs (see `*-samples.json`), rerun with the machine on a hard surface or in a cooler room.

## Results

Everything is written to `temporary/api-client-perf/runs/platform-darwin-<timestamp>/`:

| File | Contents |
| --- | --- |
| `log.txt` | Every command plus a one-line summary per variant |
| `system.json` | Mac model, P-/E-core counts, Node/V8/Go versions, power state |
| `echo.json`, `pingpong.json` | Microbenchmarks (µs per round trip) |
| `main-summary.json`, `main-samples.json` | Medians, min–max and paired deltas; every raw sample |
| `client-sweep-summary.json`, `client-sweep-samples.json` | The same for the poll-window sweep |

Zip and share that directory.

## What to look for

- **Pipe floor** (`pingpong.json`, no polling) compared with Linux's ~23 µs. A much lower floor on bare-metal macOS means less wake-up latency to recover.
- **Echo latency**: how much lower `series` 100/0 and 100/50 are than 0/0.
- **main**: whether `seriesNoPoll` reproduces about −4% wall time against `base`. That gain comes from protocol and allocation work and should not depend on the platform. Then compare `series` and `seriesS50` against it. Linux showed −11% and −17%.
- **CPU cost**: client user CPU and `serverCpuMs` for each variant.
  - On macOS, server CPU is sampled with `ps` just before the server exits and is reported as a single total, not split into user and system. This path wasn't run on Linux.
  - If `serverCpuMs` is 0, the sample failed. Wall time and client CPU are still valid.
- **client-sweep**: where the wall-time gain flattens out. The Linux default of 100 µs may not be the right default for macOS.
- **Efficiency cores**: if results are noisy or poll windows help less than expected, it may be because the polling thread is being scheduled onto efficiency cores. Note the P/E core counts in `system.json`.

## Without this branch

The six recommended product commits can also be applied to any checkout of `93c7fcbcd3`:

```sh
git am --keep-cr temporary/api-client-perf/opus-patches/000*.patch
```

However, `platform-comparison.mjs` and the harness changes it depends on exist only on this branch, so cloning the branch is simpler.

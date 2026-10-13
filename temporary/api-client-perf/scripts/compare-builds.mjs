// Interleaved clean timing across saved builds (see snapshot-build.mjs).
// Usage: node compare-builds.mjs <reference-build> <candidate-build>...
// Env: API_RUNS (default 7), API_RESULTS_NAME (default compare-<names>).
import { spawnSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    unlinkSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
    caseRoot as cwd,
    eslintCLI,
    outputRoot,
} from "./config.mjs";
import { verifyReport } from "./verify-report.mjs";

const directory = fileURLToPath(new URL(".", import.meta.url));
const builds = process.argv.slice(2);
if (builds.length < 1) throw new Error("Usage: node compare-builds.mjs <reference> <candidate>...");
for (const build of builds) {
    if (!existsSync(join(outputRoot, "builds", build, "dist"))) throw new Error(`Missing build ${build}`);
}
const runs = Number(process.env.API_RUNS ?? 7);
for (const flag of ["API_INSTRUMENT", "API_WIRE", "API_ALLOCATIONS", "API_TIMING", "API_VARIANT"]) {
    if (process.env[flag] && process.env[flag] !== "0") throw new Error(`Unset ${flag} for clean timing`);
}
const resultsName = process.env.API_RESULTS_NAME ?? `compare-${builds.join("-vs-")}`;
mkdirSync(join(outputRoot, "compare"), { recursive: true });
let expected;
let expectedFixture;
const results = [];
function run(build, index) {
    const prefix = join(outputRoot, "compare", `${resultsName}-${build}-${index}`);
    for (const path of [`${prefix}-lint.json`, `${prefix}.json`]) {
        if (existsSync(path)) unlinkSync(path);
    }
    const root = join(outputRoot, "builds", build);
    const extraEnv = existsSync(join(root, "env.json")) ? JSON.parse(readFileSync(join(root, "env.json"), "utf8")) : {};
    const started = performance.now();
    const result = spawnSync(process.execPath, ["--import", `${directory}profile-loader.mjs`, eslintCLI(), "src", "-f", "json", "-o", `${prefix}-lint.json`], {
        cwd,
        env: {
            ...process.env,
            TYPESCRIPT_ESLINT_NATIVE_BINARY: "",
            TSRS_NAPI: "",
            TSRS_BINARY: "",
            API_VARIANT: "",
            API_CLIENT_ROOT: root,
            API_BINARY: join(root, "built", "tsc"),
            API_METRICS_OUTPUT: `${prefix}.json`,
            ...extraEnv,
        },
        encoding: "utf8",
    });
    const wallMs = performance.now() - started;
    if (result.error) throw result.error;
    if (result.status !== 1) throw new Error(`${build} exited ${result.status}: ${result.stderr}`);
    const digest = verifyReport(`${prefix}-lint.json`);
    expected ??= digest;
    if (digest !== expected) throw new Error(`${build}: diagnostic mismatch`);
    const metrics = JSON.parse(readFileSync(`${prefix}.json`, "utf8"));
    expectedFixture ??= metrics.fixtureDigest;
    if (metrics.fixtureDigest !== expectedFixture) throw new Error(`${build}: fixture sources changed`);
    const row = {
        build,
        index,
        wallMs,
        userMs: metrics.cpu.user / 1000,
        systemMs: metrics.cpu.system / 1000,
        maxRSSMiB: metrics.resourceUsage.maxRSS / 1024,
        heapUsedMiB: metrics.memory.heapUsed / 1048576,
        serverCpuMs: (metrics.servers ?? []).reduce((sum, server) => sum + server.userMs + server.systemMs, 0),
        digest,
        fixtureDigest: metrics.fixtureDigest,
    };
    results.push(row);
    writeFileSync(join(outputRoot, "compare", `${resultsName}.json`), JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ build, index, wallMs: Math.round(wallMs), userMs: Math.round(row.userMs), serverCpuMs: row.serverCpuMs, rss: Math.round(row.maxRSSMiB) }));
}
for (const build of builds) run(build, "warmup");
for (let i = 0; i < runs; i++) {
    const order = i % 2 ? [...builds].reverse() : [...builds.slice(i % builds.length), ...builds.slice(0, i % builds.length)];
    for (const build of order) run(build, i);
}
const median = values => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const rowsFor = build => results.filter(row => row.build === build && row.index !== "warmup");
const summary = [];
for (const build of builds) {
    const rows = rowsFor(build);
    const entry = { build };
    for (const key of ["wallMs", "userMs", "systemMs", "serverCpuMs", "maxRSSMiB"]) {
        const values = rows.map(row => row[key]);
        entry[key] = { median: median(values), min: Math.min(...values), max: Math.max(...values) };
    }
    if (build !== builds[0]) {
        const reference = rowsFor(builds[0]);
        for (const key of ["wallMs", "userMs"]) {
            const deltas = rows.map(row => row[key] - reference.find(other => other.index === row.index)[key]);
            entry[`${key}PairedDelta`] = { median: median(deltas), min: Math.min(...deltas), max: Math.max(...deltas), negative: deltas.filter(delta => delta < 0).length, n: deltas.length };
        }
    }
    summary.push(entry);
    const fmt = s => `${s.median.toFixed(0)} [${s.min.toFixed(0)}–${s.max.toFixed(0)}]`;
    let line = `${build}: wall ${fmt(entry.wallMs)} ms, user ${fmt(entry.userMs)} ms, sys ${fmt(entry.systemMs)} ms, server CPU ${fmt(entry.serverCpuMs)} ms, RSS ${fmt(entry.maxRSSMiB)} MiB`;
    if (entry.wallMsPairedDelta) {
        const w = entry.wallMsPairedDelta, u = entry.userMsPairedDelta;
        line += `\n    vs ${builds[0]}: wall Δ median ${w.median.toFixed(0)} ms (${(100 * w.median / summary[0].wallMs.median).toFixed(1)}%, faster in ${w.negative}/${w.n}), user Δ median ${u.median.toFixed(0)} ms (${(100 * u.median / summary[0].userMs.median).toFixed(1)}%, lower in ${u.negative}/${u.n})`;
    }
    console.log(line);
}
writeFileSync(join(outputRoot, "compare", `${resultsName}-summary.json`), JSON.stringify(summary, null, 2));

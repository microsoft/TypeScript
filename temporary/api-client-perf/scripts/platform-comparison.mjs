// One-shot cross-platform reproduction of the OPUS-REPORT.md comparisons.
//
// Builds the unmodified base revision (in a temporary worktree) and the current checkout,
// then runs latency microbenchmarks and interleaved end-to-end comparisons, writing
// everything to runs/platform-<platform>-<timestamp>/.
//
// Usage: node temporary/api-client-perf/scripts/platform-comparison.mjs [options]
//   --runs N        measured runs per variant per comparison (default 7)
//   --skip-build    reuse runs/builds/{base,series} from a previous invocation
//   --no-sweep      skip the client poll-window sweep
//   --no-micro      skip the microbenchmarks
//   --base REV      base revision (default 93c7fcbcd3)
import {
    execFileSync,
    spawnSync,
} from "node:child_process";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import os from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
    artifactRoot,
    repoRoot,
    runtimeRoot,
} from "./config.mjs";

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const option = (name, fallback) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : fallback;
};
const runs = option("--runs", "7");
const baseRevision = option("--base", "93c7fcbcd3");
const scripts = fileURLToPath(new URL(".", import.meta.url));
const runsRoot = join(artifactRoot, "runs");
const builds = join(runsRoot, "builds");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = join(runsRoot, `platform-${process.platform}-${stamp}`);
mkdirSync(outputDir, { recursive: true });
process.env.API_OUTPUT_DIR = runsRoot;
const log = [];
function note(line) {
    console.log(line);
    log.push(line);
    writeFileSync(join(outputDir, "log.txt"), log.join("\n") + "\n");
}
function run(command, commandArgs, options = {}) {
    note(`$ ${command} ${commandArgs.join(" ")}${options.cwd ? `   (in ${options.cwd})` : ""}`);
    const result = spawnSync(command, commandArgs, { stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit", encoding: "utf8", shell: process.platform === "win32", ...options });
    if (result.status !== 0) throw new Error(`${command} exited ${result.status}`);
    return result.stdout ?? "";
}
const tryRun = (command, commandArgs) => {
    try {
        return execFileSync(command, commandArgs, { encoding: "utf8" }).trim();
    }
    catch {
        return undefined;
    }
};

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 24 || major === 24 && minor < 18) throw new Error(`Node 24.18 or newer is required (found ${process.version})`);
for (const name of ["TYPESCRIPT_ESLINT_NATIVE_BINARY", "TSRS_NAPI", "TSRS_BINARY"]) {
    if (process.env[name]) throw new Error(`Unset ${name}`);
}

const system = {
    platform: process.platform,
    arch: process.arch,
    release: os.release(),
    cpus: os.cpus().length,
    cpuModel: os.cpus()[0]?.model,
    memoryGiB: Math.round(os.totalmem() / 2 ** 30),
    node: process.version,
    v8: process.versions.v8,
    go: tryRun("go", ["version"]),
    head: tryRun("git", ["-C", repoRoot, "rev-parse", "HEAD"]),
    base: tryRun("git", ["-C", repoRoot, "rev-parse", baseRevision]),
    macModel: process.platform === "darwin" ? tryRun("sysctl", ["-n", "hw.model"]) : undefined,
    macPerfLevels: process.platform === "darwin" ? tryRun("sysctl", ["-n", "hw.perflevel0.physicalcpu", "hw.perflevel1.physicalcpu"])?.split("\n") : undefined,
    lowPowerMode: process.platform === "darwin" ? tryRun("pmset", ["-g"])?.match(/lowpowermode\s+(\d)/)?.[1] : undefined,
    powerSource: process.platform === "darwin" ? tryRun("pmset", ["-g", "batt"])?.split("\n")[0] : undefined,
};
writeFileSync(join(outputDir, "system.json"), JSON.stringify(system, null, 2));
note(`System: ${JSON.stringify(system)}`);
if (system.lowPowerMode === "1") note("WARNING: Low Power Mode is on; results will not be representative.");
if (system.powerSource && !system.powerSource.includes("AC Power")) note("WARNING: running on battery; plug in for stable results.");

// Fixture
if (!existsSync(join(runtimeRoot, "node_modules"))) {
    if (existsSync(runtimeRoot)) run("npm", ["ci", "--prefix", runtimeRoot, "--ignore-scripts", "--no-audit", "--no-fund"]);
    else run(process.execPath, [join(scripts, "setup-benchmark.mjs")]);
}

// Builds
if (!flag("--skip-build")) {
    run("npx", ["hereby", "build", "build:api"], { cwd: repoRoot });
    run(process.execPath, [join(scripts, "snapshot-build.mjs"), "series"]);

    const baseCheckout = join(runsRoot, "base-checkout");
    if (existsSync(baseCheckout)) {
        run("git", ["-C", repoRoot, "worktree", "remove", "--force", baseCheckout]);
        rmSync(baseCheckout, { recursive: true, force: true });
    }
    run("git", ["-C", repoRoot, "worktree", "add", "--detach", baseCheckout, baseRevision]);
    try {
        symlinkSync(join(repoRoot, "node_modules"), join(baseCheckout, "node_modules"), "junction");
        run("npx", ["hereby", "build", "build:api"], { cwd: baseCheckout });
        run(process.execPath, [join(scripts, "snapshot-build.mjs"), "base", baseCheckout]);
    }
    finally {
        run("git", ["-C", repoRoot, "worktree", "remove", "--force", baseCheckout]);
    }
}
for (const name of ["base", "series"]) {
    if (!existsSync(join(builds, name, "dist"))) throw new Error(`Missing build ${name}; run without --skip-build`);
}

// Variants of the series build differing only in poll options.
function variant(name, env) {
    const directory = join(builds, name);
    rmSync(directory, { recursive: true, force: true });
    mkdirSync(directory);
    for (const entry of ["dist", "lib", "package.json", "vendor", "built", "provenance.json"]) {
        symlinkSync(join(builds, "series", entry), join(directory, entry), process.platform === "win32" ? "junction" : undefined);
    }
    writeFileSync(join(directory, "env.json"), JSON.stringify(env));
}
variant("seriesNoPoll", { API_CLIENT_POLL_US: "0" });
variant("seriesS50", { API_SERVER_POLL_US: "50" });
for (const us of [25, 50, 200, 400]) variant(`seriesC${us}`, { API_CLIENT_POLL_US: String(us) });

// Microbenchmarks
const binary = build => join(builds, build, "built", process.platform === "win32" ? "tsc.exe" : "tsc");
if (!flag("--no-micro")) {
    const echo = [];
    for (const [build, client, server] of [["base", 0, 0], ["series", 0, 0], ["series", 0, 50], ["series", 100, 0], ["series", 100, 50]]) {
        const output = run(process.execPath, [join(scripts, "microbench", "echo.mjs"), join(builds, build), binary(build), String(client), String(server)], { capture: true });
        const result = { build, ...JSON.parse(output.trim().split("\n").at(-1)) };
        echo.push(result);
        note(`echo ${JSON.stringify(result)}`);
    }
    writeFileSync(join(outputDir, "echo.json"), JSON.stringify(echo, null, 2));

    if (system.go) {
        const goecho = join(outputDir, "goecho");
        run("go", ["build", "-o", goecho, join(scripts, "microbench", "goecho.go")], { cwd: os.tmpdir(), env: { ...process.env, GOWORK: "off", GOFLAGS: "" } });
        const pingpong = [];
        for (const spinClient of ["0", "1"]) {
            for (const childArgs of [[], ["spin"]]) {
                const output = run(process.execPath, [join(scripts, "microbench", "pingpong.mjs"), goecho, ...childArgs], { capture: true, env: { ...process.env, SPIN: spinClient } });
                const line = output.trim().split("\n").at(-1);
                pingpong.push({ clientPolls: spinClient === "1", serverPolls: childArgs.length > 0, line });
                note(`pingpong client-polls=${spinClient === "1"} server-polls=${childArgs.length > 0}: ${line}`);
            }
        }
        writeFileSync(join(outputDir, "pingpong.json"), JSON.stringify(pingpong, null, 2));
    }
}

// End-to-end comparisons
function compare(name, variants) {
    run(process.execPath, [join(scripts, "compare-builds.mjs"), ...variants], {
        env: { ...process.env, API_OUTPUT_DIR: runsRoot, API_RUNS: runs, API_RESULTS_NAME: `${name}-${stamp}` },
    });
    const summary = JSON.parse(readFileSync(join(runsRoot, "compare", `${name}-${stamp}-summary.json`), "utf8"));
    const samples = JSON.parse(readFileSync(join(runsRoot, "compare", `${name}-${stamp}.json`), "utf8"));
    writeFileSync(join(outputDir, `${name}-summary.json`), JSON.stringify(summary, null, 2));
    writeFileSync(join(outputDir, `${name}-samples.json`), JSON.stringify(samples, null, 2));
    for (const entry of summary) {
        const delta = entry.wallMsPairedDelta;
        note(`${name}: ${entry.build.padEnd(13)} wall ${entry.wallMs.median.toFixed(0)} ms, client user ${entry.userMs.median.toFixed(0)} ms, server CPU ${entry.serverCpuMs.median.toFixed(0)} ms` + (delta ? `, wall Δ ${(100 * delta.median / summary[0].wallMs.median).toFixed(1)}% (faster ${delta.negative}/${delta.n})` : ""));
    }
}
compare("main", ["base", "seriesNoPoll", "series", "seriesS50"]);
if (!flag("--no-sweep")) compare("client-sweep", ["seriesNoPoll", "seriesC25", "seriesC50", "series", "seriesC200", "seriesC400"]);
note(`Done. Results: ${outputDir}`);

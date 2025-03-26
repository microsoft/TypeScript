// @ts-check

import chokidar from "chokidar";
import { $ as _$ } from "execa";
import { glob } from "glob";
import { task } from "hereby";
import assert from "node:assert";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { parseArgs } from "node:util";
import pc from "picocolors";
import which from "which";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const isCI = !!process.env.CI;

const $pipe = _$({ verbose: "short" });
const $ = _$({ verbose: "short", stdio: "inherit" });

const { values: options } = parseArgs({
    args: process.argv.slice(2),
    options: {
        race: { type: "boolean" },
        tests: { type: "string", short: "t" },
        fix: { type: "boolean" },
        noembed: { type: "boolean" },
        debug: { type: "boolean" },
        concurrentTestPrograms: { type: "boolean" },
    },
    strict: false,
    allowPositionals: true,
    allowNegative: true,
    noembed: false,
    debug: false,
    concurrentTestPrograms: false,
});

const defaultGoBuildTags = [
    ...(options.noembed ? ["noembed"] : []),
];

/**
 * @param  {...string} extra
 * @returns {string[]}
 */
function goBuildTags(...extra) {
    const tags = new Set(defaultGoBuildTags.concat(extra));
    return tags.size ? [`-tags=${[...tags].join(",")}`] : [];
}

const goBuildFlags = [
    ...(options.race ? ["-race"] : []),
    // https://github.com/go-delve/delve/blob/62cd2d423c6a85991e49d6a70cc5cb3e97d6ceef/Documentation/usage/dlv_exec.md?plain=1#L12
    ...(options.debug ? ["-gcflags=all=-N -l"] : []),
];

/**
 * @type {<T>(fn: () => T) => (() => T)}
 */
function memoize(fn) {
    let value;
    return () => {
        if (fn !== undefined) {
            value = fn();
            fn = /** @type {any} */ (undefined);
        }
        return value;
    };
}

const typeScriptSubmodulePath = path.join(__dirname, "_submodules", "TypeScript");

const isTypeScriptSubmoduleCloned = memoize(() => {
    try {
        const stat = fs.statSync(path.join(typeScriptSubmodulePath, "package.json"));
        if (stat.isFile()) {
            return true;
        }
    }
    catch {}

    return false;
});

const warnIfTypeScriptSubmoduleNotCloned = memoize(() => {
    if (!isTypeScriptSubmoduleCloned()) {
        console.warn(pc.yellow("Warning: TypeScript submodule is not cloned; some tests may be skipped."));
    }
});

function assertTypeScriptCloned() {
    if (!isTypeScriptSubmoduleCloned()) {
        throw new Error("_submodules/TypeScript does not exist; try running `git submodule update --init --recursive`");
    }
}

const tools = new Map([
    ["gotest.tools/gotestsum", "latest"],
    ["mvdan.cc/gofumpt", "v0.7.0"],
]);

/**
 * @param {string} tool
 */
function isInstalled(tool) {
    return !!which.sync(tool, { nothrow: true });
}

const libsDir = "./internal/bundled/libs";
const libsRegexp = /(?:^|[\\/])internal[\\/]bundled[\\/]libs[\\/]/;

async function generateLibs() {
    await fs.promises.mkdir("./built/local", { recursive: true });

    const libs = await fs.promises.readdir(libsDir);

    await Promise.all(libs.map(async lib => {
        fs.promises.copyFile(`${libsDir}/${lib}`, `./built/local/${lib}`);
    }));
}

export const lib = task({
    name: "lib",
    run: generateLibs,
});

/**
 * @param {string} packagePath
 * @param {AbortSignal} [abortSignal]
 */
function buildExecutableToBuilt(packagePath, abortSignal) {
    return $({ cancelSignal: abortSignal })`go build ${goBuildFlags} ${goBuildTags("noembed")} -o ./built/local/ ${packagePath}`;
}

export const tsgoBuild = task({
    name: "tsgo:build",
    run: async () => {
        await buildExecutableToBuilt("./cmd/tsgo");
    },
});

export const tsgo = task({
    name: "tsgo",
    dependencies: [lib, tsgoBuild],
});

export const local = task({
    name: "local",
    dependencies: [tsgo],
});

export const build = task({
    name: "build",
    dependencies: [local],
});

export const buildWatch = task({
    name: "build:watch",
    run: async () => {
        await watchDebounced("build:watch", async (paths, abortSignal) => {
            let libsChanged = false;
            let goChanged = false;

            if (paths) {
                for (const p of paths) {
                    if (libsRegexp.test(p)) {
                        libsChanged = true;
                    }
                    else if (p.endsWith(".go")) {
                        goChanged = true;
                    }
                    if (libsChanged && goChanged) {
                        break;
                    }
                }
            }
            else {
                libsChanged = true;
                goChanged = true;
            }

            if (libsChanged) {
                console.log("Generating libs...");
                await generateLibs();
            }

            if (goChanged) {
                console.log("Building tsgo...");
                await buildExecutableToBuilt("./cmd/tsgo", abortSignal);
            }
        }, {
            paths: ["cmd", "internal"],
            ignored: path => /[\\/]testdata[\\/]/.test(path),
        });
    },
});

export const cleanBuilt = task({
    name: "clean:built",
    hiddenFromTaskList: true,
    run: () => fs.promises.rm("built", { recursive: true, force: true }),
});

export const generate = task({
    name: "generate",
    run: async () => {
        assertTypeScriptCloned();
        await $`go generate ./...`;
    },
});

const goTestFlags = [
    ...goBuildFlags,
    ...goBuildTags(),
    ...(options.tests ? [`-run=${options.tests}`] : []),
];

const goTestEnv = {
    ...(options.concurrentTestPrograms ? { TS_TEST_PROGRAM_SINGLE_THREADED: "false" } : {}),
    // Go test caching takes a long time on Windows.
    // https://github.com/golang/go/issues/72992
    ...(process.platform === "win32" ? { GOFLAGS: "-count=1" } : {}),
};

const goTestSumFlags = [
    "--format-hide-empty-pkg",
    ...(!isCI ? ["--hide-summary", "skipped"] : []),
];

const $test = $({ env: goTestEnv });

const gotestsum = memoize(() => {
    const args = isInstalled("gotestsum") ? ["gotestsum", ...goTestSumFlags, "--"] : ["go", "test"];
    return args.concat(goTestFlags);
});

const goTest = memoize(() => {
    return ["go", "test"].concat(goTestFlags);
});

async function runTests() {
    warnIfTypeScriptSubmoduleNotCloned();
    await $test`${gotestsum()} ./... ${isCI ? ["--timeout=45m"] : []}`;
}

export const test = task({
    name: "test",
    run: runTests,
});

async function runTestBenchmarks() {
    warnIfTypeScriptSubmoduleNotCloned();
    // Run the benchmarks once to ensure they compile and run without errors.
    await $test`${goTest()} -run=- -bench=. -benchtime=1x ./...`;
}

export const testBenchmarks = task({
    name: "test:benchmarks",
    run: runTestBenchmarks,
});

async function runTestTools() {
    await $test({ cwd: path.join(__dirname, "_tools") })`${gotestsum()} ./...`;
}

export const testTools = task({
    name: "test:tools",
    run: runTestTools,
});

export const testAll = task({
    name: "test:all",
    run: async () => {
        // Prevent interleaving by running these directly instead of in parallel.
        await runTests();
        await runTestBenchmarks();
        await runTestTools();
    },
});

const customLinterPath = "./_tools/custom-gcl";
const customLinterHashPath = customLinterPath + ".hash";

const golangciLintPackage = memoize(() => {
    const golangciLintYml = fs.readFileSync(".custom-gcl.yml", "utf8");
    const pattern = /^version:\s*(v\d+\.\d+\.\d+).*$/m;
    const match = pattern.exec(golangciLintYml);
    if (!match) {
        throw new Error("Expected version in .custom-gcl.yml");
    }
    const version = match[1];
    const major = version.split(".")[0];
    const versionSuffix = ["v0", "v1"].includes(major) ? "" : "/" + major;

    return `github.com/golangci/golangci-lint${versionSuffix}/cmd/golangci-lint@${version}`;
});

const customlintHash = memoize(() => {
    const files = glob.sync([
        "./_tools/go.mod",
        "./_tools/customlint/**/*",
        "./.custom-gcl.yml",
    ], {
        ignore: "**/testdata/**",
        nodir: true,
        absolute: true,
    });
    files.sort();

    const hash = crypto.createHash("sha256");

    for (const file of files) {
        hash.update(file);
        hash.update(fs.readFileSync(file));
    }

    return hash.digest("hex") + "\n";
});

const buildCustomLinter = memoize(async () => {
    const hash = customlintHash();
    if (
        isInstalled(customLinterPath)
        && fs.existsSync(customLinterHashPath)
        && fs.readFileSync(customLinterHashPath, "utf8") === hash
    ) {
        return;
    }

    await $`go run ${golangciLintPackage()} custom`;
    await $`${customLinterPath} cache clean`;

    fs.writeFileSync(customLinterHashPath, hash);
});

export const lint = task({
    name: "lint",
    run: async () => {
        await buildCustomLinter();

        const lintArgs = ["run"];
        if (defaultGoBuildTags.length) {
            lintArgs.push("--build-tags", defaultGoBuildTags.join(","));
        }
        if (options.fix) {
            lintArgs.push("--fix");
        }

        const resolvedCustomLinterPath = path.resolve(customLinterPath);
        await $`${resolvedCustomLinterPath} ${lintArgs}`;
        console.log("Linting _tools");
        await $({ cwd: "./_tools" })`${resolvedCustomLinterPath} ${lintArgs}`;
    },
});

export const installTools = task({
    name: "install-tools",
    run: async () => {
        await Promise.all([
            ...[...tools].map(([tool, version]) => $`go install ${tool}${version ? `@${version}` : ""}`),
            buildCustomLinter(),
        ]);
    },
});

export const format = task({
    name: "format",
    run: async () => {
        await $`dprint fmt`;
    },
});

export const checkFormat = task({
    name: "check:format",
    run: async () => {
        await $`dprint check`;
    },
});

export const postinstall = task({
    name: "postinstall",
    hiddenFromTaskList: true,
    run: () => {
        // Ensure the go command doesn't waste time looking into node_modules.
        // Remove once https://github.com/golang/go/issues/42965 is fixed.
        fs.writeFileSync(path.join(__dirname, "node_modules", "go.mod"), `module example.org/ignoreme\n`);
    },
});

/**
 * @param {string} localBaseline Path to the local copy of the baselines
 * @param {string} refBaseline Path to the reference copy of the baselines
 */
function baselineAcceptTask(localBaseline, refBaseline) {
    /**
     * @param {string} p
     */
    function localPathToRefPath(p) {
        const relative = path.relative(localBaseline, p);
        return path.join(refBaseline, relative);
    }

    return async () => {
        const toCopy = await glob(`${localBaseline}/**`, { nodir: true, ignore: `${localBaseline}/**/*.delete` });
        for (const p of toCopy) {
            const out = localPathToRefPath(p);
            await fs.promises.mkdir(path.dirname(out), { recursive: true });
            await fs.promises.copyFile(p, out);
        }
        const toDelete = await glob(`${localBaseline}/**/*.delete`, { nodir: true });
        for (const p of toDelete) {
            const out = localPathToRefPath(p).replace(/\.delete$/, "");
            await rimraf(out);
            await rimraf(p); // also delete the .delete file so that it no longer shows up in a diff tool.
        }
    };
}

export const baselineAccept = task({
    name: "baseline-accept",
    description: "Makes the most recent test results the new baseline, overwriting the old baseline",
    run: baselineAcceptTask("testdata/baselines/local/", "testdata/baselines/reference/"),
});

/**
 * @param {fs.PathLike} p
 */
function rimraf(p) {
    // The rimraf package uses maxRetries=10 on Windows, but Node's fs.rm does not have that special case.
    return fs.promises.rm(p, { recursive: true, force: true, maxRetries: process.platform === "win32" ? 10 : 0 });
}

/** @typedef {{
 * name: string;
 * paths: string | string[];
 * ignored?: (path: string) => boolean;
 * run: (paths: Set<string>, abortSignal: AbortSignal) => void | Promise<unknown>;
 * }} WatchTask */
void 0;

/**
 * @param {string} name
 * @param {(paths: Set<string> | undefined, abortSignal: AbortSignal) => void | Promise<unknown>} run
 * @param {object} options
 * @param {string | string[]} options.paths
 * @param {(path: string) => boolean} [options.ignored]
 * @param {string} [options.name]
 */
async function watchDebounced(name, run, options) {
    let watching = true;
    let running = true;
    let lastChangeTimeMs = Date.now();
    let changedDeferred = /** @type {Deferred<void>} */ (new Deferred());
    let abortController = new AbortController();

    const debouncer = new Debouncer(1_000, endRun);
    const watcher = chokidar.watch(options.paths, {
        ignored: options.ignored,
        ignorePermissionErrors: true,
        alwaysStat: true,
    });
    // The paths that have changed since the last run.
    /** @type {Set<string> | undefined} */
    let paths;

    process.on("SIGINT", endWatchMode);
    process.on("beforeExit", endWatchMode);
    watcher.on("all", onChange);

    while (watching) {
        const promise = changedDeferred.promise;
        const token = abortController.signal;
        if (!token.aborted) {
            running = true;
            try {
                const thePaths = paths;
                paths = new Set();
                await run(thePaths, token);
            }
            catch {
                // ignore
            }
            running = false;
        }
        if (watching) {
            console.log(pc.yellowBright(`[${name}] run complete, waiting for changes...`));
            await promise;
        }
    }

    console.log("end");

    /**
     * @param {'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir' | 'all' | 'ready' | 'raw' | 'error'} eventName
     * @param {string} path
     * @param {fs.Stats | undefined} stats
     */
    function onChange(eventName, path, stats) {
        switch (eventName) {
            case "change":
            case "unlink":
            case "unlinkDir":
                break;
            case "add":
            case "addDir":
                // skip files that are detected as 'add' but haven't actually changed since the last time we ran.
                if (stats && stats.mtimeMs <= lastChangeTimeMs) {
                    return;
                }
                break;
        }
        beginRun(path);
    }

    /**
     * @param {string} path
     */
    function beginRun(path) {
        if (debouncer.empty) {
            console.log(pc.yellowBright(`[${name}] changed due to '${path}', restarting...`));
            if (running) {
                console.log(pc.yellowBright(`[${name}] aborting in-progress run...`));
            }
            abortController.abort();
            abortController = new AbortController();
        }

        debouncer.enqueue();
        paths ??= new Set();
        paths.add(path);
    }

    function endRun() {
        lastChangeTimeMs = Date.now();
        changedDeferred.resolve();
        changedDeferred = /** @type {Deferred<void>} */ (new Deferred());
    }

    function endWatchMode() {
        if (watching) {
            watching = false;
            console.log(pc.yellowBright(`[${name}] exiting watch mode...`));
            abortController.abort();
            watcher.close();
        }
    }
}

/**
 * @template T
 */
export class Deferred {
    constructor() {
        /** @type {Promise<T>} */
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export class Debouncer {
    /**
     * @param {number} timeout
     * @param {() => Promise<any> | void} action
     */
    constructor(timeout, action) {
        this._timeout = timeout;
        this._action = action;
    }

    get empty() {
        return !this._deferred;
    }

    enqueue() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }

        if (!this._deferred) {
            this._deferred = new Deferred();
        }

        this._timer = setTimeout(() => this.run(), 100);
        return this._deferred.promise;
    }

    run() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }

        const deferred = this._deferred;
        assert(deferred);
        this._deferred = undefined;
        try {
            deferred.resolve(this._action());
        }
        catch (e) {
            deferred.reject(e);
        }
    }
}

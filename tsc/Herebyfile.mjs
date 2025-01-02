// @ts-check

import { $ as _$ } from "execa";
import { glob } from "glob";
import { task } from "hereby";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { parseArgs } from "node:util";
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
        fix: { type: "boolean" },
        noembed: { type: "boolean" },
    },
    strict: false,
    allowPositionals: true,
    allowNegative: true,
    noembed: false,
});

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

function assertTypeScriptCloned() {
    try {
        const stat = fs.statSync(path.join(typeScriptSubmodulePath, "package.json"));
        if (stat.isFile()) {
            return;
        }
    }
    catch {}

    throw new Error("_submodules/TypeScript does not exist; try running `git submodule update --init --recursive`");
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

export const generateLibs = task({
    name: "lib",
    run: async () => {
        await fs.promises.mkdir("./built/local", { recursive: true });

        const libsDir = "./internal/bundled/libs";
        const libs = await fs.promises.readdir(libsDir);

        await Promise.all(libs.map(async lib => {
            fs.promises.copyFile(`${libsDir}/${lib}`, `./built/local/${lib}`);
        }));
    },
});

function buildExecutableToBuilt(packagePath) {
    return $`go build ${options.race ? ["-race"] : []} -tags=noembed -o ./built/local/ ${packagePath}`;
}

export const tsgoBuild = task({
    name: "tsgo:build",
    run: async () => {
        await buildExecutableToBuilt("./cmd/tsgo");
    },
});

export const tsgo = task({
    name: "tsgo",
    dependencies: [generateLibs, tsgoBuild],
});

export const local = task({
    name: "local",
    dependencies: [tsgo],
});

export const build = task({
    name: "build",
    dependencies: [local],
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
    ...(options.race ? ["-race"] : []),
    ...(options.noembed ? ["-tags=noembed"] : []),
];

const gotestsum = memoize(() => {
    const args = isInstalled("gotestsum") ? ["gotestsum", "--format-hide-empty-pkg", "--"] : ["go", "test"];
    return args.concat(goTestFlags);
});

const goTest = memoize(() => {
    return ["go", "test"].concat(goTestFlags);
});

async function runTests() {
    await $`${gotestsum()} ./...`;
}

export const test = task({
    name: "test",
    run: runTests,
});

async function runTestBenchmarks() {
    // Run the benchmarks once to ensure they compile and run without errors.
    await $`${goTest()} -run=- -bench=. -benchtime=1x ./...`;
}

export const testBenchmarks = task({
    name: "test:benchmarks",
    run: runTestBenchmarks,
});

async function runTestTools() {
    await $({ cwd: path.join(__dirname, "_tools") })`${gotestsum()} ./...`;
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

const golangciLintVersion = memoize(() => {
    const golangciLintYml = fs.readFileSync(".custom-gcl.yml", "utf8");
    const pattern = /^version:\s*(v\d+\.\d+\.\d+).*$/m;
    const match = pattern.exec(golangciLintYml);
    if (!match) {
        throw new Error("Expected version in .custom-gcl.yml");
    }
    return match[1];
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

    await $`go run github.com/golangci/golangci-lint/cmd/golangci-lint@${golangciLintVersion()} custom`;
    await $`${customLinterPath} cache clean`;

    fs.writeFileSync(customLinterHashPath, hash);
});

export const lint = task({
    name: "lint",
    run: async () => {
        await buildCustomLinter();
        await $`${customLinterPath} run ${options.fix ? ["--fix"] : []} ${isCI ? ["--timeout=5m"] : []}`;
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

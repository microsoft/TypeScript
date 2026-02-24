// @ts-check

import AdmZip from "adm-zip";
import chokidar from "chokidar";
import { $ as _$ } from "execa";
import { glob } from "glob";
import { task } from "hereby";
import assert from "node:assert";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import url from "node:url";
import { parseArgs } from "node:util";
import pLimit from "p-limit";
import pc from "picocolors";
import tmp from "tmp";
import which from "which";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const isCI = !!process.env.CI || !!process.env.TF_BUILD;

const $pipe = _$({ verbose: "short" });
const $ = _$({ verbose: "short", stdio: "inherit" });

/**
 * @param {string} name
 * @param {boolean} defaultValue
 * @returns {boolean}
 */
function parseEnvBoolean(name, defaultValue = false) {
    name = "TSGO_HEREBY_" + name.toUpperCase();

    const value = process.env[name];
    if (!value) {
        return defaultValue;
    }
    switch (value.toUpperCase()) {
        case "1":
        case "TRUE":
        case "YES":
        case "ON":
            return true;
        case "0":
        case "FALSE":
        case "NO":
        case "OFF":
            return false;
    }
    throw new Error(`Invalid value for ${name}: ${value}`);
}

const { values: rawOptions } = parseArgs({
    args: process.argv.slice(2),
    options: {
        tests: { type: "string", short: "t" },
        fix: { type: "boolean" },
        debug: { type: "boolean" },
        dirty: { type: "boolean" },
        release: { type: "boolean" },

        setPrerelease: { type: "string" },
        forRelease: { type: "boolean" },

        race: { type: "boolean", default: parseEnvBoolean("RACE") },
        noembed: { type: "boolean", default: parseEnvBoolean("NOEMBED") },
        concurrentTestPrograms: { type: "boolean", default: parseEnvBoolean("CONCURRENT_TEST_PROGRAMS") },
        coverage: { type: "boolean", default: parseEnvBoolean("COVERAGE") },
    },
    strict: false,
    allowPositionals: true,
    allowNegative: true,
});

// We can't use parseArgs' strict mode as it errors on hereby's --tasks flag.
/**
 * @typedef {{ [K in keyof typeof rawOptions as {} extends Record<K, 1> ? never : K]: typeof rawOptions[K] }} Options
 */
const options = /** @type {Options} */ (rawOptions);

if (options.forRelease && !options.setPrerelease) {
    throw new Error("forRelease requires setPrerelease");
}

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

const goBuildEnv = {
    ...(options.race ? {} : { CGO_ENABLED: "0" }),
};

/**
 * @template T
 * @param {() => T} fn
 * @returns {() => T}
 */
function memoize(fn) {
    /** @type {T} */
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
]);

/**
 * @param {string} tool
 */
function isInstalled(tool) {
    return !!which.sync(tool, { nothrow: true });
}

const builtLocal = "./built/local";

const libsDir = "./internal/bundled/libs";
const libsRegexp = /(?:^|[\\/])internal[\\/]bundled[\\/]libs[\\/]/;

/**
 * @param {string} out
 */
async function generateLibs(out) {
    await fs.promises.mkdir(out, { recursive: true });

    const libs = await fs.promises.readdir(libsDir);

    await Promise.all(libs.map(async lib => {
        fs.promises.copyFile(path.join(libsDir, lib), path.join(out, lib));
    }));
}

export const lib = task({
    name: "lib",
    description: "Copies the libs to built/local.",
    run: () => generateLibs(builtLocal),
});

/**
 * Gets the release build flags for stripping debug info.
 * @param {string} [versionOverride] Optional version to embed in the binary.
 * @returns {string[]}
 */
function getReleaseBuildFlags(versionOverride) {
    let ldflags = "-ldflags=-s -w";
    if (versionOverride) {
        ldflags += ` -X github.com/microsoft/typescript-go/internal/core.version=${versionOverride}`;
    }
    return ["-trimpath", ldflags];
}

/**
 * @param {object} [opts]
 * @param {string} [opts.out]
 * @param {AbortSignal} [opts.abortSignal]
 * @param {Record<string, string | undefined>} [opts.env]
 * @param {string[]} [opts.extraFlags]
 */
function buildTsgo(opts) {
    opts ||= {};
    const out = opts.out ?? "./built/local/";
    const env = { ...goBuildEnv, ...opts.env };
    return $({ cancelSignal: opts.abortSignal, env })`go build ${goBuildFlags} ${opts.extraFlags ?? []} ${options.debug ? goBuildTags("noembed") : goBuildTags("noembed", "noassert")} -o ${out} ./cmd/tsgo`;
}

export const tsgoBuild = task({
    name: "tsgo:build",
    description: "Builds the tsgo binary.",
    run: async () => {
        await buildTsgo({ extraFlags: options.release ? getReleaseBuildFlags() : [] });
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
    description: "Builds the tsgo binary and watches for changes.",
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
                await generateLibs(builtLocal);
            }

            if (goChanged) {
                console.log("Building tsgo...");
                await buildTsgo({ abortSignal });
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
    run: () => rimraf("built"),
});

export const generate = task({
    name: "generate",
    description: "Runs go generate on the project.",
    run: async () => {
        assertTypeScriptCloned();
        await $`go generate -v ./...`;
    },
});

// ── Enum generation from Go source ──────────────────────────────

/**
 * @typedef {{
 *   name: string;
 *   goPrefix: string;
 *   goFile: string;
 *   outDir: string;
 *   constEnum?: boolean;
 * }} EnumDef
 */

/** @type {EnumDef[]} */
const enumDefs = [
    // @typescript/api enums
    { name: "SymbolFlags", goPrefix: "SymbolFlags", goFile: "internal/ast/symbolflags.go", outDir: "_packages/api/src/enums" },
    { name: "TypeFlags", goPrefix: "TypeFlags", goFile: "internal/checker/types.go", outDir: "_packages/api/src/enums" },
    { name: "ObjectFlags", goPrefix: "ObjectFlags", goFile: "internal/checker/types.go", outDir: "_packages/api/src/enums" },
    { name: "SignatureFlags", goPrefix: "SignatureFlags", goFile: "internal/checker/types.go", outDir: "_packages/api/src/enums" },
    { name: "SignatureKind", goPrefix: "SignatureKind", goFile: "internal/checker/types.go", outDir: "_packages/api/src/enums" },
    { name: "ElementFlags", goPrefix: "ElementFlags", goFile: "internal/checker/types.go", outDir: "_packages/api/src/enums" },
    // @typescript/ast enums
    { name: "SyntaxKind", goPrefix: "Kind", goFile: "internal/ast/kind.go", outDir: "_packages/ast/src/enums" },
    { name: "NodeFlags", goPrefix: "NodeFlags", goFile: "internal/ast/nodeflags.go", outDir: "_packages/ast/src/enums" },
    { name: "TokenFlags", goPrefix: "TokenFlags", goFile: "internal/ast/tokenflags.go", outDir: "_packages/ast/src/enums", constEnum: true },
];

/**
 * @param {string} block
 * @param {string} prefix
 * @returns {{ name: string, value: string }[]}
 */
function parseGoConstBlock(block, prefix) {
    const members = [];
    let iotaCounter = 0;
    let hasIota = false;

    for (const rawLine of block.split("\n")) {
        const line = rawLine.replace(/\/\/.*$/, "").trim();
        if (!line) continue;

        // Match: PrefixName Type = value  or  PrefixName = value
        const fullMatch = line.match(new RegExp(`^(${prefix}\\w+)\\s+(?:\\S+\\s*)?=\\s*(.+)$`));
        // Match bare iota continuation: just PrefixName
        const bareMatch = !fullMatch && hasIota
            ? line.match(new RegExp(`^(${prefix}\\w+)$`))
            : null;

        if (!fullMatch && !bareMatch) continue;

        const goName = fullMatch ? fullMatch[1] : /** @type {RegExpMatchArray} */ (bareMatch)[1];
        const goValue = fullMatch ? fullMatch[2].trim() : "";
        const memberName = goName.slice(prefix.length);

        let tsValue;
        if (goValue === "iota") {
            tsValue = String(iotaCounter);
            hasIota = true;
        }
        else if (hasIota && goValue === "") {
            tsValue = String(iotaCounter);
        }
        else {
            // Replace Go bitwise NOT (^) with TypeScript (~)
            tsValue = goValue.replace(/\^/g, "~");
            // Strip enum prefix from member references
            tsValue = tsValue.replace(new RegExp(`${prefix}(\\w+)`, "g"), "$1");
        }

        members.push({ name: memberName, value: tsValue });
        iotaCounter++;
    }

    return members;
}

/**
 * @param {EnumDef} def
 * @returns {{ name: string, value: string }[]}
 */
function parseGoEnum(def) {
    const source = fs.readFileSync(def.goFile, "utf-8");
    const constBlockRegex = /const\s*\(([\s\S]*?)\n\)/g;

    for (const match of source.matchAll(constBlockRegex)) {
        const members = parseGoConstBlock(match[1], def.goPrefix);
        if (members.length > 0) return topoSortMembers(members);
    }

    throw new Error(`No members found for enum ${def.name} in ${def.goFile}`);
}

/**
 * Topologically sort enum members so composite members appear after
 * all members they reference (Go allows forward references, TS does not).
 * @param {{ name: string, value: string }[]} members
 * @returns {{ name: string, value: string }[]}
 */
function topoSortMembers(members) {
    const nameSet = new Set(members.map(m => m.name));
    /** @type {Map<string, Set<string>>} */
    const deps = new Map();
    for (const m of members) {
        /** @type {Set<string>} */
        const refs = new Set();
        // Find all identifier references in the value that are other member names
        for (const [ref] of m.value.matchAll(/\b([A-Za-z_]\w*)\b/g)) {
            if (ref !== m.name && nameSet.has(ref)) refs.add(ref);
        }
        deps.set(m.name, refs);
    }

    const sorted = /** @type {{ name: string, value: string }[]} */ ([]);
    const visited = new Set();
    const visiting = new Set();

    /** @param {string} name */
    function visit(name) {
        if (visited.has(name)) return;
        if (visiting.has(name)) return; // cycle — keep original order
        visiting.add(name);
        for (const dep of deps.get(name) ?? []) {
            visit(dep);
        }
        visiting.delete(name);
        visited.add(name);
        sorted.push(/** @type {{ name: string, value: string }} */ (members.find(m => m.name === name)));
    }

    for (const m of members) {
        visit(m.name);
    }
    return sorted;
}

/**
 * @param {EnumDef} def
 * @param {{ name: string, value: string }[]} members
 * @returns {string}
 */
function renderEnumTS(def, members) {
    const header = [
        "//",
        "// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        "// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!",
        "// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        "//",
        `// Source: ${def.goFile}`,
        "// Regenerate: npx hereby generate:enums",
        "//",
        "",
    ].join("\n");

    const constKeyword = def.constEnum ? "const " : "";
    const lines = members.map(m => `    ${m.name} = ${m.value},`);
    return `${header}export ${constKeyword}enum ${def.name} {\n${lines.join("\n")}\n}\n`;
}

async function runGenerateEnums() {
    const ts = /** @type {typeof import("typescript")} */ (await import("typescript"));

    /**
     * @param {string} enumSource
     * @param {string} enumName
     * @returns {string}
     */
    function transpile(enumSource, enumName) {
        const result = ts.transpileModule(enumSource, {
            compilerOptions: {
                module: ts.ModuleKind.ESNext,
                target: ts.ScriptTarget.ESNext,
            },
        });
        return result.outputText.replace(
            `export var ${enumName};`,
            `export var ${enumName}: any;`,
        );
    }

    console.log("Generating enums from Go source...");
    /** @type {string[]} */
    const generatedFiles = [];

    for (const def of enumDefs) {
        const members = parseGoEnum(def);
        const camelName = def.name.charAt(0).toLowerCase() + def.name.slice(1);

        fs.mkdirSync(def.outDir, { recursive: true });

        // Generate .enum.ts (TypeScript enum — used for types)
        const enumTS = renderEnumTS(def, members);
        const enumPath = path.join(def.outDir, `${camelName}.enum.ts`);
        fs.writeFileSync(enumPath, enumTS);
        generatedFiles.push(enumPath);

        // Generate .ts (IIFE — used at runtime)
        const iifeSource = transpile(enumTS, def.name);
        const iifePath = path.join(def.outDir, `${camelName}.ts`);
        fs.writeFileSync(iifePath, iifeSource);
        generatedFiles.push(iifePath);

        console.log(`  ${def.name}: ${members.length} members → ${camelName}.enum.ts, ${camelName}.ts`);
    }

    await $`dprint fmt ${generatedFiles}`;
    console.log("Done.");
}

export const generateEnums = task({
    name: "generate:enums",
    description: "Generates TypeScript enum files from Go source.",
    run: runGenerateEnums,
});

const coverageDir = path.join(__dirname, "coverage");

const ensureCoverageDirExists = memoize(() => {
    if (options.coverage) {
        fs.mkdirSync(coverageDir, { recursive: true });
    }
});

/**
 * @param {string} taskName
 */
function goTestFlags(taskName) {
    ensureCoverageDirExists();
    return [
        ...goBuildFlags,
        ...goBuildTags(),
        ...(options.tests ? [`-run=${options.tests}`] : []),
        ...(options.coverage ? [`-coverprofile=${path.join(coverageDir, "coverage." + taskName + ".out")}`, "-coverpkg=./..."] : []),
    ];
}

const goTestEnv = {
    ...(options.concurrentTestPrograms ? { TS_TEST_PROGRAM_SINGLE_THREADED: "false" } : {}),
    // Go test caching takes a long time on Windows.
    // https://github.com/golang/go/issues/72992
    ...(process.platform === "win32" ? { GOFLAGS: "-count=1" } : {}),
};

const baselineTrackingEnabled = isTypeScriptSubmoduleCloned() && ![
    options.tests,
    options.noembed,
    options.concurrentTestPrograms,
    options.race,
    options.dirty,
].some(Boolean);

const goTestSumFlags = [
    "--format-hide-empty-pkg",
    ...(!isCI ? ["--hide-summary", "skipped"] : []),
];

/**
 * Collects all baseline files that were used during the test run.
 * @param {string} trackingDir
 * @returns {Promise<Set<string>>}
 */
async function collectUsedBaselines(trackingDir) {
    /** @type {Set<string>} */
    const usedBaselines = new Set();
    if (!fs.existsSync(trackingDir)) {
        return usedBaselines;
    }

    const trackingFiles = await fs.promises.readdir(trackingDir);
    for (const file of trackingFiles) {
        const content = await fs.promises.readFile(path.join(trackingDir, file), "utf-8");
        for (const line of content.split("\n")) {
            const trimmed = line.trim();
            if (trimmed) {
                usedBaselines.add(trimmed);
            }
        }
    }
    return usedBaselines;
}

/**
 * Checks for unused baseline files and reports them.
 * @param {string} trackingDir
 * @returns {Promise<string[]>} List of unused baseline file paths.
 */
async function checkUnusedBaselines(trackingDir) {
    const usedBaselines = await collectUsedBaselines(trackingDir);
    if (usedBaselines.size === 0) {
        // No baselines recorded - either no tests ran or tracking wasn't set up properly
        return [];
    }

    const allBaselines = await glob(`${refBaseline}/**`, { nodir: true });
    const unusedBaselines = allBaselines
        .map(p => path.relative(refBaseline, p))
        .filter(p => !usedBaselines.has(p));

    return unusedBaselines;
}

const $test = $({ env: goTestEnv });

/**
 * @param {string} taskName
 */
function gotestsum(taskName) {
    const args = isInstalled("gotestsum") ? ["gotestsum", ...goTestSumFlags, "--"] : ["go", "test"];
    return args.concat(goTestFlags(taskName));
}

/**
 * @param {string} taskName
 */
function goTest(taskName) {
    return ["go", "test"].concat(goTestFlags(taskName));
}

async function runTests() {
    warnIfTypeScriptSubmoduleNotCloned();

    if (!options.dirty) {
        await rimraf(localBaseline);
        await fs.promises.mkdir(localBaseline, { recursive: true });
    }

    // Create a tmp directory for baseline tracking if enabled
    /** @type {string | undefined} */
    let trackingDir;
    /** @type {(() => void) | undefined} */
    let cleanupTracking;

    if (baselineTrackingEnabled) {
        const tmpDir = tmp.dirSync({ prefix: "tsgo-baseline-tracking-", unsafeCleanup: true });
        trackingDir = tmpDir.name;
        cleanupTracking = tmpDir.removeCallback;
    }

    try {
        const testEnv = {
            ...goTestEnv,
            ...(trackingDir ? { TSGO_BASELINE_TRACKING_DIR: trackingDir } : {}),
        };
        const $testWithTracking = $({ env: testEnv });
        await $testWithTracking`${gotestsum("tests")} ./... ${isCI ? ["--timeout=45m"] : []}`;

        // Check for unused baselines after tests complete
        if (trackingDir) {
            const unusedBaselines = await checkUnusedBaselines(trackingDir);
            if (unusedBaselines.length > 0) {
                console.error(pc.red(`\nFound ${unusedBaselines.length} unused baseline file(s):`));
                for (const baseline of unusedBaselines.slice(0, 20)) {
                    console.error(pc.red(`  ${baseline}`));
                }
                if (unusedBaselines.length > 20) {
                    console.error(pc.red(`  ... and ${unusedBaselines.length - 20} more`));
                }

                // Create .delete files for each unused baseline so baseline-accept can remove them
                for (const baseline of unusedBaselines) {
                    const deleteFilePath = path.join(localBaseline, baseline + ".delete");
                    await fs.promises.mkdir(path.dirname(deleteFilePath), { recursive: true });
                    await fs.promises.writeFile(deleteFilePath, "");
                }
                console.error(pc.red(`\nRun 'hereby baseline-accept' to delete them.`));

                throw new Error(`Found ${unusedBaselines.length} unused baseline file(s). Run 'hereby baseline-accept' to delete them.`);
            }
        }
    }
    finally {
        if (cleanupTracking) {
            cleanupTracking();
        }
    }
}

export const test = task({
    name: "test",
    description: "Runs all tests. This is the most typical test task to need.",
    run: runTests,
});

async function runTestBenchmarks() {
    warnIfTypeScriptSubmoduleNotCloned();
    // Run the benchmarks once to ensure they compile and run without errors.
    await $test`${goTest("benchmarks")} -run=- -bench=. -benchtime=1x ./...`;
}

export const testBenchmarks = task({
    name: "test:benchmarks",
    description: "Runs all benchmarks.",
    run: runTestBenchmarks,
});

async function runTestTools() {
    await $test({ cwd: path.join(__dirname, "_tools") })`${gotestsum("tools")} ./...`;
}

async function runTestAPI() {
    await $`npm run -w @typescript/api test`;
}

export const testTools = task({
    name: "test:tools",
    description: "Runs all tests in the _tools module.",
    run: runTestTools,
});

export const buildAPI = task({
    name: "build:api",
    description: "Builds @typescript/api and @typescript/ast.",
    run: async () => {
        await $`npm run -w @typescript/api build`;
    },
});

export const buildAPITests = task({
    name: "build:api:test",
    description: "Builds the @typescript/api tests.",
    run: async () => {
        await $`npm run -w @typescript/api build:test`;
    },
});

export const testAPI = task({
    name: "test:api",
    description: "Runs the @typescript/api tests.",
    dependencies: [tsgo, buildAPITests],
    run: runTestAPI,
});

export const testAll = task({
    name: "test:all",
    description: "Runs ALL tests in the repo, including benchmarks, _tools, and the API tests.",
    dependencies: [tsgo, buildAPITests],
    run: async () => {
        // Prevent interleaving by running these directly instead of in parallel.
        await runTests();
        await runTestBenchmarks();
        await runTestTools();
        await runTestAPI();
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
    description: "Runs golangci-lint.",
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
    description: "Installs optional tools for developing within the repo.",
    run: async () => {
        await Promise.all([
            ...[...tools].map(([tool, version]) => $`go install ${tool}${version ? `@${version}` : ""}`),
            buildCustomLinter(),
        ]);
    },
});

export const format = task({
    name: "format",
    description: "Formats the repo.",
    run: async () => {
        await $`dprint fmt`;
    },
});

export const checkFormat = task({
    name: "check:format",
    description: "Checks that the repo is formatted.",
    run: async () => {
        await $`dprint check`;
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

const localBaseline = "testdata/baselines/local/";
const refBaseline = "testdata/baselines/reference/";

export const baselineAccept = task({
    name: "baseline-accept",
    description: "Makes the most recent test results the new baseline, overwriting the old baseline.",
    run: baselineAcceptTask(localBaseline, refBaseline),
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

const getVersion = memoize(() => {
    const f = fs.readFileSync("./internal/core/version.go", "utf8");

    const match = f.match(/var version\s*=\s*"(\d+\.\d+\.\d+)(-[^"]+)?"/);
    if (!match) {
        throw new Error("Failed to extract version from version.go");
    }

    let version = match[1];
    if (options.setPrerelease) {
        version += `-${options.setPrerelease}`;
    }
    else if (match[2]) {
        version += match[2];
    }

    return version;
});

const extensionDir = path.resolve("./_extension");
const builtNpm = path.resolve("./built/npm");
const builtVsix = path.resolve("./built/vsix");
const builtSignTmp = path.resolve("./built/sign-tmp");

const getSignTempDir = memoize(async () => {
    const dir = path.resolve(builtSignTmp);
    await rimraf(dir);
    await fs.promises.mkdir(dir, { recursive: true });
    return dir;
});

const cleanSignTempDirectory = task({
    name: "clean:sign-tmp",
    hiddenFromTaskList: true,
    run: runCleanSignTempDirectory,
});

function runCleanSignTempDirectory() {
    return rimraf(builtSignTmp);
}

let signCount = 0;

/**
 * @typedef {{
 *   SignFileRecordList: {
 *     SignFileList: { SrcPath: string; DstPath: string | null }[];
 *     Certs: Cert;
 *     MacAppName: string | undefined
 *   }[]
 * }} DDSignFileList
 *
 * @param {DDSignFileList} filelist
 */
async function sign(filelist, unchangedOutputOkay = false) {
    let data = JSON.stringify(filelist, undefined, 4);
    console.log("filelist:", data);

    if (!process.env.MBSIGN_APPFOLDER) {
        console.log(pc.yellow("Faking signing because MBSIGN_APPFOLDER is not set."));

        // Fake signing for testing.

        for (const record of filelist.SignFileRecordList) {
            for (const file of record.SignFileList) {
                const src = file.SrcPath;
                const dst = file.DstPath ?? src;

                if (!fs.existsSync(src)) {
                    throw new Error(`Source file does not exist: ${src}`);
                }

                const dstDir = path.dirname(dst);
                if (!fs.existsSync(dstDir)) {
                    throw new Error(`Destination directory does not exist: ${dstDir}`);
                }

                if (dst.endsWith(".sig")) {
                    console.log(`Faking signature for ${src} -> ${dst}`);
                    // No great way to fake a signature.
                    await fs.promises.writeFile(dst, "fake signature");
                }
                else {
                    if (src === dst) {
                        console.log(`Faking signing ${src}`);
                    }
                    else {
                        console.log(`Faking signing ${src} -> ${dst}`);
                    }
                    const contents = await fs.promises.readFile(src);
                    await fs.promises.writeFile(dst, contents);
                }
            }
        }

        return;
    }

    const signingWorkaround = true;

    /** @type {{ source: string; target: string }[]} */
    const signingWorkaroundFiles = [];

    if (signingWorkaround) {
        // DstPath is currently broken in the signing tool.
        // Copy all of the files to a new tempdir and then leave DstPath unset
        // so that it's overwritten, then move the file to the destination.
        console.log("Working around DstPath bug");

        /** @type {DDSignFileList} */
        const newFileList = {
            SignFileRecordList: filelist.SignFileRecordList.map(list => {
                return {
                    Certs: list.Certs,
                    SignFileList: list.SignFileList.map(file => {
                        const dstPath = file.DstPath;
                        if (dstPath === null) {
                            return file;
                        }

                        const src = file.SrcPath;
                        // File extensions must be preserved; use a prefix.
                        const dstPathTemp = `${path.dirname(src)}/signing-temp-${path.basename(src)}`;

                        console.log(`Copying: ${src} -> ${dstPathTemp}`);
                        fs.cpSync(src, dstPathTemp);

                        signingWorkaroundFiles.push({ source: dstPathTemp, target: dstPath });

                        return {
                            SrcPath: dstPathTemp,
                            DstPath: null,
                        };
                    }),
                    MacAppName: list.MacAppName,
                };
            }),
        };

        data = JSON.stringify(newFileList, undefined, 4);
        console.log("new filelist:", data);
    }

    /** @type {Map<string, string>} */
    const srcHashes = new Map();

    for (const record of filelist.SignFileRecordList) {
        for (const file of record.SignFileList) {
            const src = file.SrcPath;
            const dst = file.DstPath ?? src;

            if (!fs.existsSync(src)) {
                throw new Error(`Source file does not exist: ${src}`);
            }

            const hash = crypto.createHash("sha256").update(fs.readFileSync(src)).digest("hex");
            srcHashes.set(src, hash);

            console.log(`Will sign ${src} -> ${dst}`);
            console.log(`  sha256: ${hash}`);
        }
    }

    const tmp = await getSignTempDir();
    const filelistPath = path.resolve(tmp, `signing-filelist-${signCount++}.json`);
    await fs.promises.writeFile(filelistPath, data);

    try {
        const dll = path.join(process.env.MBSIGN_APPFOLDER, "DDSignFiles.dll");
        const filelistFlag = `/filelist:${filelistPath}`;
        await $`dotnet ${dll} -- ${filelistFlag}`;
    }
    finally {
        await fs.promises.unlink(filelistPath);
    }

    if (signingWorkaround) {
        // Now, copy the files back.
        for (const { source, target } of signingWorkaroundFiles) {
            console.log(`Moving signed file: ${source} -> ${target}`);
            await fs.promises.rename(source, target);
        }
    }

    /** @type {string[]} */
    let failures = [];

    for (const record of filelist.SignFileRecordList) {
        for (const file of record.SignFileList) {
            const src = file.SrcPath;
            const dst = file.DstPath ?? src;

            if (!fs.existsSync(dst)) {
                failures.push(`Signed file does not exist: ${dst}`);
                const newSrcHash = crypto.createHash("sha256").update(fs.readFileSync(src)).digest("hex");
                const oldSrcHash = srcHashes.get(src);
                assert(oldSrcHash);
                if (oldSrcHash !== newSrcHash) {
                    failures.push(`  Source file changed during signing: ${src}\n    before: ${oldSrcHash}\n    after:  ${newSrcHash}`);
                }
                continue;
            }

            const srcHash = srcHashes.get(src);
            assert(srcHash);
            const dstHash = crypto.createHash("sha256").update(fs.readFileSync(dst)).digest("hex");
            if (srcHash === dstHash) {
                const message = `Signed file is identical to source file (not signed?): ${src} -> ${dst}\n  sha256: ${dstHash}`;
                if (unchangedOutputOkay) {
                    console.log(message);
                }
                else {
                    failures.push(message);
                    continue;
                }
            }

            if (src === dst) {
                console.log(`Signed ${src}`);
            }
            else {
                console.log(`Signed ${src} -> ${dst}`);
            }
            console.log(`  sha256: ${dstHash}`);
        }
    }

    if (failures.length) {
        throw new Error("Some files failed to sign:\n" + failures.map(f => " - " + f).join("\n"));
    }
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {(p: string) => boolean} [filter]
 */
function cpRecursive(src, dest, filter) {
    return fs.promises.cp(src, dest, {
        recursive: true,
        filter: filter ? src => filter(src.replace(/\\/g, "/")) : undefined,
    });
}

/**
 * @param {string} src
 * @param {string} dest
 */
function cpWithoutNodeModulesOrTsconfig(src, dest) {
    return cpRecursive(src, dest, p => !p.endsWith("/node_modules") && !p.endsWith("/tsconfig.json"));
}

const mainNativePreviewPackage = {
    npmPackageName: "@typescript/native-preview",
    npmDir: path.join(builtNpm, "native-preview"),
    npmTarball: path.join(builtNpm, "native-preview.tgz"),
};

/**
 * @typedef {"win32" | "linux" | "darwin"} OS
 * @typedef {"x64" | "arm" | "arm64"} Arch
 * @typedef {"Microsoft400" | "LinuxSign" | "MacDeveloperHarden" | "8020" | "VSCodePublisher"} Cert
 * @typedef {`${OS | "alpine"}-${Exclude<Arch, "arm"> | "armhf"}`} VSCodeTarget
 */
void 0;

const nativePreviewPlatforms = memoize(() => {
    /** @type {[os: OS, arch: Arch, cert: Cert, alpine?: boolean][]} */
    let supportedPlatforms = [
        ["win32", "x64", "Microsoft400"],
        ["win32", "arm64", "Microsoft400"],
        ["linux", "x64", "LinuxSign", true],
        ["linux", "arm", "LinuxSign"],
        ["linux", "arm64", "LinuxSign", true],
        ["darwin", "x64", "MacDeveloperHarden"],
        ["darwin", "arm64", "MacDeveloperHarden"],
        // Wasm?
    ];

    if (!options.forRelease) {
        supportedPlatforms = supportedPlatforms.filter(([os, arch]) => os === process.platform && arch === process.arch);
        assert.equal(supportedPlatforms.length, 1, "No supported platforms found");
    }

    return supportedPlatforms.map(([os, arch, cert, alpine]) => {
        const npmDirName = `native-preview-${os}-${arch}`;
        const npmDir = path.join(builtNpm, npmDirName);
        const npmTarball = `${npmDir}.tgz`;
        const npmPackageName = `@typescript/${npmDirName}`;

        /** @type {VSCodeTarget[]} */
        const vscodeTargets = [`${os}-${arch === "arm" ? "armhf" : arch}`];
        if (alpine) {
            vscodeTargets.push(`alpine-${arch === "arm" ? "armhf" : arch}`);
        }

        const extensions = vscodeTargets.map(vscodeTarget => {
            const extensionDir = path.join(builtVsix, `typescript-native-preview-${vscodeTarget}`);
            const vsixPath = extensionDir + ".vsix";
            const vsixManifestPath = extensionDir + ".manifest";
            const vsixSignaturePath = extensionDir + ".signature.p7s";
            return {
                vscodeTarget,
                extensionDir,
                vsixPath,
                vsixManifestPath,
                vsixSignaturePath,
            };
        });

        return {
            nodeOs: os,
            nodeArch: arch,
            goos: nodeToGOOS(os),
            goarch: nodeToGOARCH(arch),
            npmPackageName,
            npmDirName,
            npmDir,
            npmTarball,
            extensions,
            cert,
        };
    });

    /**
     * @param {string} os
     * @returns {"darwin" | "linux" | "windows"}
     */
    function nodeToGOOS(os) {
        switch (os) {
            case "darwin":
                return "darwin";
            case "linux":
                return "linux";
            case "win32":
                return "windows";
            default:
                throw new Error(`Unsupported OS: ${os}`);
        }
    }

    /**
     * @param {string} arch
     * @returns {"amd64" | "arm" | "arm64"}
     */
    function nodeToGOARCH(arch) {
        switch (arch) {
            case "x64":
                return "amd64";
            case "arm":
                return "arm";
            case "arm64":
                return "arm64";
            default:
                throw new Error(`Unsupported ARCH: ${arch}`);
        }
    }
});

export const buildNativePreviewPackages = task({
    name: "native-preview:build-packages",
    hiddenFromTaskList: true,
    run: runBuildNativePreviewPackages,
});

async function runBuildNativePreviewPackages() {
    await rimraf(builtNpm);

    const platforms = nativePreviewPlatforms();

    const inputDir = "./_packages/native-preview";

    const inputPackageJson = JSON.parse(fs.readFileSync(path.join(inputDir, "package.json"), "utf8"));
    inputPackageJson.version = getVersion();
    delete inputPackageJson.private;
    delete inputPackageJson.engines;

    const { stdout: gitHead } = await $pipe`git rev-parse HEAD`;
    inputPackageJson.gitHead = gitHead;

    const mainPackage = {
        ...inputPackageJson,
        optionalDependencies: Object.fromEntries(platforms.map(p => [p.npmPackageName, getVersion()])),
    };

    const mainPackageDir = mainNativePreviewPackage.npmDir;

    await fs.promises.mkdir(mainPackageDir, { recursive: true });

    await cpWithoutNodeModulesOrTsconfig(inputDir, mainPackageDir);

    await fs.promises.writeFile(path.join(mainPackageDir, "package.json"), JSON.stringify(mainPackage, undefined, 4));
    await fs.promises.copyFile("LICENSE", path.join(mainPackageDir, "LICENSE"));
    // No NOTICE.txt here; does not ship the binary or libs. If this changes, we should add it.

    const extraFlags = getReleaseBuildFlags(options.setPrerelease ? getVersion() : undefined);

    const platformBuilders = platforms.map(({ npmDir, npmPackageName, nodeOs, nodeArch, goos, goarch }) => async () => {
        const packageJson = {
            ...inputPackageJson,
            bin: undefined,
            imports: undefined,
            name: npmPackageName,
            os: [nodeOs],
            cpu: [nodeArch],
            exports: {
                "./package.json": "./package.json",
            },
        };

        const out = path.join(npmDir, "lib");
        await fs.promises.mkdir(out, { recursive: true });
        await fs.promises.writeFile(path.join(npmDir, "package.json"), JSON.stringify(packageJson, undefined, 4));
        await fs.promises.copyFile("LICENSE", path.join(npmDir, "LICENSE"));
        await fs.promises.copyFile("NOTICE.txt", path.join(npmDir, "NOTICE.txt"));

        const readme = [
            `# \`${npmPackageName}\``,
            "",
            `This package provides ${nodeOs}-${nodeArch} support for [${mainNativePreviewPackage.npmPackageName}](https://www.npmjs.com/package/${mainNativePreviewPackage.npmPackageName}).`,
        ];

        await fs.promises.writeFile(path.join(npmDir, "README.md"), readme.join("\n") + "\n");

        await generateLibs(out);

        await buildTsgo({
            out,
            env: { GOOS: goos, GOARCH: goarch, GOARM: "6", CGO_ENABLED: "0" },
            extraFlags,
        });
    });

    if (isCI) {
        for (const build of platformBuilders) {
            await build();
            // Build machines have too little space.
            // Clear the Go build cache between platforms.
            await $`go clean -cache`;
        }
    }
    else {
        const buildLimit = pLimit(os.availableParallelism());
        await Promise.all(platformBuilders.map(f => buildLimit(f)));
    }
}

export const signNativePreviewPackages = task({
    name: "native-preview:sign-packages",
    hiddenFromTaskList: true,
    run: runSignNativePreviewPackages,
});

async function runSignNativePreviewPackages() {
    if (!options.forRelease) {
        throw new Error("This task should not be run in non-release builds.");
    }

    const platforms = nativePreviewPlatforms();

    /** @type {Map<Cert, { tmpName: string; path: string }[]>} */
    const filelistByCert = new Map();
    for (const { npmDir, nodeOs, cert, npmDirName } of platforms) {
        let certFilelist = filelistByCert.get(cert);
        if (!certFilelist) {
            filelistByCert.set(cert, certFilelist = []);
        }
        certFilelist.push({
            tmpName: npmDirName,
            path: path.join(npmDir, "lib", nodeOs === "win32" ? "tsgo.exe" : "tsgo"),
        });
    }

    const tmp = await getSignTempDir();

    /** @type {DDSignFileList} */
    const filelist = {
        SignFileRecordList: [],
    };

    /** @type {{ path: string; unsignedZipPath: string; signedZipPath: string; notarizedZipPath: string; }[]} */
    const macZips = [];

    // First, sign the files.

    for (const [cert, filelistPaths] of filelistByCert) {
        switch (cert) {
            case "Microsoft400":
                filelist.SignFileRecordList.push({
                    SignFileList: filelistPaths.map(p => ({ SrcPath: p.path, DstPath: null })),
                    Certs: cert,
                    MacAppName: undefined,
                });
                break;
            case "LinuxSign":
                filelist.SignFileRecordList.push({
                    SignFileList: filelistPaths.map(p => ({ SrcPath: p.path, DstPath: p.path + ".sig" })),
                    Certs: cert,
                    MacAppName: undefined,
                });
                break;
            case "MacDeveloperHarden":
                // Mac signing requires putting files into zips and then signing those,
                // along with a notarization step.
                for (const p of filelistPaths) {
                    const unsignedZipPath = path.join(tmp, `${p.tmpName}.unsigned.zip`);
                    const signedZipPath = path.join(tmp, `${p.tmpName}.signed.zip`);
                    const notarizedZipPath = path.join(tmp, `${p.tmpName}.notarized.zip`);

                    const zip = new AdmZip();
                    zip.addLocalFile(p.path);
                    zip.writeZip(unsignedZipPath);

                    macZips.push({
                        path: p.path,
                        unsignedZipPath,
                        signedZipPath,
                        notarizedZipPath,
                    });
                }
                filelist.SignFileRecordList.push({
                    SignFileList: macZips.map(p => ({ SrcPath: p.unsignedZipPath, DstPath: p.signedZipPath })),
                    Certs: cert,
                    MacAppName: undefined, // MacAppName is only for notarization
                });
                break;
            default:
                throw new Error(`Unknown cert: ${cert}`);
        }
    }

    await sign(filelist);

    // All of the files have been signed in place / had signatures added.

    if (macZips.length) {
        // Now, notarize the Mac files.

        /** @type {DDSignFileList} */
        const notarizeFilelist = {
            SignFileRecordList: [
                {
                    SignFileList: macZips.map(p => ({ SrcPath: p.signedZipPath, DstPath: p.notarizedZipPath })),
                    Certs: "8020", // "MacNotarize" (friendly name not supported by the tooling)
                    MacAppName: "MicrosoftTypeScript",
                },
            ],
        };

        // Notarizing does not change the file, it just sends it to Apple, so ignore the case
        // where the input files are the same as the output files.
        await sign(notarizeFilelist, /*unchangedOutputOkay*/ true);

        // Finally, unzip the notarized files and move them back to their original locations.

        for (const p of macZips) {
            const zip = new AdmZip(p.notarizedZipPath);
            zip.extractEntryTo(path.basename(p.path), path.dirname(p.path), false, true);
        }

        // chmod +x the unzipped files.

        for (const p of macZips) {
            await fs.promises.chmod(p.path, 0o755);
        }
    }
}

export const packNativePreviewPackages = task({
    name: "native-preview:pack-packages",
    hiddenFromTaskList: true,
    dependencies: options.forRelease ? undefined : [buildNativePreviewPackages, cleanSignTempDirectory],
    run: runPackNativePreviewPackages,
});

async function runPackNativePreviewPackages() {
    const platforms = nativePreviewPlatforms();
    await Promise.all([mainNativePreviewPackage, ...platforms].map(async ({ npmDir, npmTarball }) => {
        const { stdout } = await $pipe`npm pack --json ${npmDir}`;
        const filename = JSON.parse(stdout)[0].filename.replace("@", "").replace("/", "-");
        await fs.promises.rename(filename, npmTarball);
    }));

    // npm packages need to be published in reverse dep order, e.g. such that no package
    // is published before its dependencies.
    const publishOrder = [
        ...platforms.map(p => p.npmTarball),
        mainNativePreviewPackage.npmTarball,
    ].map(p => path.basename(p));

    const publishOrderPath = path.join(builtNpm, "publish-order.txt");
    await fs.promises.writeFile(publishOrderPath, publishOrder.join("\n") + "\n");
}

export const packNativePreviewExtensions = task({
    name: "native-preview:pack-extensions",
    hiddenFromTaskList: true,
    dependencies: options.forRelease ? undefined : [buildNativePreviewPackages, cleanSignTempDirectory],
    run: runPackNativePreviewExtensions,
});

async function runPackNativePreviewExtensions() {
    await rimraf(builtVsix);
    await fs.promises.mkdir(builtVsix, { recursive: true });

    // We don't use vscode:prepublish, as that would run the build for each package below.
    await $({ cwd: extensionDir })`npm run bundle:release`;

    let version = "0.0.0";
    if (options.forRelease) {
        // No real semver prerelease versioning.
        // https://code.visualstudio.com/api/working-with-extensions/publishing-extension#prerelease-extensions
        assert(options.setPrerelease, "forRelease is true but setPrerelease is not set");
        const prerelease = options.setPrerelease;
        assert(typeof prerelease === "string", "setPrerelease is not a string");
        // parse `dev.<number>.<number>`.
        const match = prerelease.match(/dev\.(\d+)\.(\d+)/);
        if (!match) {
            throw new Error(`Prerelease version should be in the form of dev.<number>.<number>, but got ${prerelease}`);
        }
        // Set version to `0.<number>.<number>`.
        version = `0.${match[1]}.${match[2]}`;
    }

    console.log("Version:", version);

    const platforms = nativePreviewPlatforms();
    const extensions = platforms.flatMap(({ npmDir, extensions }) => extensions.map(e => ({ npmDir, ...e })));

    await Promise.all(extensions.map(async ({ npmDir, vscodeTarget, extensionDir: thisExtensionDir, vsixPath, vsixManifestPath, vsixSignaturePath }) => {
        const npmLibDir = path.join(npmDir, "lib");
        const extensionLibDir = path.join(thisExtensionDir, "lib");
        await fs.promises.mkdir(extensionLibDir, { recursive: true });

        await cpWithoutNodeModulesOrTsconfig(extensionDir, thisExtensionDir);
        await cpWithoutNodeModulesOrTsconfig(npmLibDir, extensionLibDir);

        const packageJsonPath = path.join(thisExtensionDir, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        packageJson.version = version;
        packageJson.main = "dist/extension.bundle.js";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 4));

        await fs.promises.copyFile("NOTICE.txt", path.join(thisExtensionDir, "NOTICE.txt"));

        await $({ cwd: thisExtensionDir })`vsce package ${version} --no-update-package-json --no-dependencies --out ${vsixPath} --target ${vscodeTarget}`;

        if (options.forRelease) {
            await $({ cwd: thisExtensionDir })`vsce generate-manifest --packagePath ${vsixPath} --out ${vsixManifestPath}`;
            await fs.promises.cp(vsixManifestPath, vsixSignaturePath);
        }
    }));
}

export const signNativePreviewExtensions = task({
    name: "native-preview:sign-extensions",
    hiddenFromTaskList: true,
    run: runSignNativePreviewExtensions,
});

async function runSignNativePreviewExtensions() {
    if (!options.forRelease) {
        throw new Error("This task should not be run in non-release builds.");
    }

    const platforms = nativePreviewPlatforms();
    const extensions = platforms.flatMap(({ npmDir, extensions }) => extensions.map(e => ({ npmDir, ...e })));

    await sign({
        SignFileRecordList: [
            {
                SignFileList: extensions.map(({ vsixSignaturePath }) => ({ SrcPath: vsixSignaturePath, DstPath: null })),
                Certs: "VSCodePublisher",
                MacAppName: undefined,
            },
        ],
    });
}

export const nativePreviewRelease = task({
    name: "native-preview:release",
    hiddenFromTaskList: true,
    run: async () => {
        if (!options.forRelease || !options.setPrerelease) {
            throw new Error("native-preview:release requires --forRelease and --setPrerelease flags. Example: npx hereby native-preview:release --forRelease --setPrerelease=dev.1.0");
        }
        await runBuildNativePreviewPackages();
        await runSignNativePreviewPackages();
        await runPackNativePreviewPackages();
        await runPackNativePreviewExtensions();
        await runSignNativePreviewExtensions();
        await runCleanSignTempDirectory();
    },
});

export const nativePreview = task({
    name: "native-preview",
    hiddenFromTaskList: true,
    dependencies: options.forRelease ? undefined : [packNativePreviewPackages, packNativePreviewExtensions],
    run: options.forRelease ? async () => {
        throw new Error("This task should not be run in release builds.");
    } : undefined,
});

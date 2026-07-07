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

if (process.platform === "win32") {
    process.chdir(fs.realpathSync.native(process.cwd()));
}

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

// Native release branches can edit these constants to publish a different
// package flavor. Main's defaults publish @typescript/native-preview.
const nativePreviewReleaseProfile = /** @type {"native-preview" | "typescript"} */ ("native-preview");
const nativePreviewReleaseVersion = /** @type {string | undefined} */ (undefined);
const produceNativePreviewVsix = /** @type {boolean} */ (true);
const produceTypeScriptNightlyVsix = /** @type {boolean} */ (false);
const produceAnyVsix = produceNativePreviewVsix || produceTypeScriptNightlyVsix;
const publishAsTypescript = nativePreviewReleaseProfile === "typescript";

if (publishAsTypescript && !nativePreviewReleaseVersion) {
    throw new Error("Publishing as 'typescript' requires hardcoding nativePreviewReleaseVersion.");
}

if (options.forRelease && !options.setPrerelease && (!nativePreviewReleaseVersion || produceAnyVsix)) {
    throw new Error("forRelease requires setPrerelease unless nativePreviewReleaseVersion is hardcoded and VSIX production is disabled");
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
    return $({ cancelSignal: opts.abortSignal, env })`go build ${goBuildFlags} ${opts.extraFlags ?? []} ${goBuildTags("noembed")} -o ${out} ./cmd/tsgo`;
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

export const generateExtension = task({
    name: "generate:extension",
    description: "Generates files in the extension",
    run: async () => {
        await $`npm run -w _extension generateLocBundle`;
    },
});

// ── Enum generation from Go source ──────────────────────────────

/**
 * @typedef {{
 *   name: string;
 *   goPrefix: string;
 *   goFile: string;
 *   outDir: string;
 *   stringEnum?: boolean;
 *   valueReplacements?: Record<string, string>;
 * }} EnumDef
 */

/** @type {EnumDef[]} */
const enumDefs = [
    { name: "SymbolFlags", goPrefix: "SymbolFlags", goFile: "internal/ast/symbolflags.go", outDir: "_packages/native-preview/src/enums" },
    { name: "TypeFlags", goPrefix: "TypeFlags", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ObjectFlags", goPrefix: "ObjectFlags", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "SignatureFlags", goPrefix: "SignatureFlags", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "SignatureKind", goPrefix: "SignatureKind", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ElementFlags", goPrefix: "ElementFlags", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "TypePredicateKind", goPrefix: "TypePredicateKind", goFile: "internal/checker/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "DiagnosticCategory", goPrefix: "Category", goFile: "internal/diagnostics/diagnostics.go", outDir: "_packages/native-preview/src/enums" },
    { name: "SyntaxKind", goPrefix: "Kind", goFile: "internal/ast/kind_generated.go", outDir: "_packages/native-preview/src/enums" },
    { name: "NodeFlags", goPrefix: "NodeFlags", goFile: "internal/ast/nodeflags.go", outDir: "_packages/native-preview/src/enums" },
    { name: "OuterExpressionKinds", goPrefix: "OEK", goFile: "internal/ast/utilities.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ModifierFlags", goPrefix: "ModifierFlags", goFile: "internal/ast/modifierflags.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ModuleKind", goPrefix: "ModuleKind", goFile: "internal/core/compileroptions.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ModuleResolutionKind", goPrefix: "ModuleResolutionKind", goFile: "internal/core/compileroptions.go", outDir: "_packages/native-preview/src/enums" },
    { name: "ModuleDetectionKind", goPrefix: "ModuleDetectionKind", goFile: "internal/core/compileroptions.go", outDir: "_packages/native-preview/src/enums" },
    { name: "NewLineKind", goPrefix: "NewLineKind", goFile: "internal/core/compileroptions.go", outDir: "_packages/native-preview/src/enums" },
    { name: "JsxEmit", goPrefix: "JsxEmit", goFile: "internal/core/compileroptions.go", outDir: "_packages/native-preview/src/enums" },
    { name: "TokenFlags", goPrefix: "TokenFlags", goFile: "internal/ast/tokenflags.go", outDir: "_packages/native-preview/src/enums" },
    { name: "NodeBuilderFlags", goPrefix: "Flags", goFile: "internal/nodebuilder/types.go", outDir: "_packages/native-preview/src/enums" },
    { name: "CompletionItemKind", goPrefix: "CompletionItemKind", goFile: "internal/lsp/lsproto/lsp_generated.go", outDir: "_packages/native-preview/src/enums" },
    // String enum: Go stores internal names with a "\xFE" sentinel prefix, but the escaped
    // form sent over the wire uses "__" (see EscapeSymbolName), so map the sentinel accordingly.
    { name: "InternalSymbolName", goPrefix: "InternalSymbolName", goFile: "internal/ast/symbol.go", outDir: "_packages/native-preview/src/enums", stringEnum: true, valueReplacements: { InternalSymbolNamePrefix: "__" } },
];

/**
 * @param {string} block
 * @param {EnumDef} def
 * @returns {{ name: string, value: string }[]}
 */
function parseGoConstBlock(block, def) {
    const prefix = def.goPrefix;
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
        if (def.stringEnum) {
            tsValue = parseGoStringValue(goValue, def.valueReplacements ?? {});
        }
        else if (goValue === "iota") {
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
 * Resolve a Go string-constant expression (e.g. `Prefix + "call"` or `"export="`)
 * into a quoted, JS-escaped TypeScript string literal. `replacements` maps bare
 * Go identifiers (such as a sentinel-prefix constant) to their literal value.
 * @param {string} goValue
 * @param {Record<string, string>} replacements
 * @returns {string}
 */
function parseGoStringValue(goValue, replacements) {
    let result = "";
    for (const part of goValue.split("+").map(p => p.trim())) {
        if (Object.prototype.hasOwnProperty.call(replacements, part)) {
            result += replacements[part];
            continue;
        }
        const stringMatch = part.match(/^"((?:[^"\\]|\\.)*)"$/);
        if (stringMatch === null) {
            throw new Error(`Cannot parse string enum value: ${goValue}`);
        }
        // Interpret Go escape sequences via JSON, then re-stringify below.
        result += JSON.parse(`"${stringMatch[1]}"`);
    }
    return JSON.stringify(result);
}

/**
 * @param {EnumDef} def
 * @returns {{ name: string, value: string }[]}
 */
function parseGoEnum(def) {
    const source = fs.readFileSync(def.goFile, "utf-8");
    const constBlockRegex = /const\s*\(([\s\S]*?)\n\)/g;

    for (const match of source.matchAll(constBlockRegex)) {
        const members = parseGoConstBlock(match[1], def);
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
    const header = `// Code generated by Herebyfile.mjs generate:enums from ${def.goFile}. DO NOT EDIT.\n\n`;

    const lines = members.map(m => `    ${m.name} = ${m.value},`);
    return `${header}export enum ${def.name} {\n${lines.join("\n")}\n}\n`;
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

export const generateAST = task({
    name: "generate:ast",
    description: "Generates AST and encoder files from ast.json.",
    run: () => $`node --experimental-strip-types --no-warnings ./_scripts/generate.ts`,
});

// ── Vendored npm dependencies ───────────────────────────────────

const vendorJsonrpcDir = "_packages/native-preview/vendor/vscode-jsonrpc";
const vendorJsonrpcSrc = "node_modules/vscode-jsonrpc";
// Files copied verbatim from the installed vscode-jsonrpc package into the
// vendored copy. Only the runtime files needed by the `#vscode-jsonrpc/node`
// import (lib + typings + package.json) plus license/readme are vendored.
const vendorJsonrpcFiles = ["package.json", "README.md", "License.txt", "lib", "typings"];

async function runGenerateVendor() {
    const src = path.join(__dirname, vendorJsonrpcSrc);
    const dest = path.join(__dirname, vendorJsonrpcDir);
    if (!fs.existsSync(src)) {
        throw new Error(`${vendorJsonrpcSrc} is not installed; run \`npm ci\` first.`);
    }
    await rimraf(dest);
    await fs.promises.mkdir(dest, { recursive: true });
    for (const file of vendorJsonrpcFiles) {
        await cpRecursive(path.join(src, file), path.join(dest, file));
    }
}

export const generateVendor = task({
    name: "generate:vendor",
    description: "Updates the vendored copy of vscode-jsonrpc from node_modules.",
    run: runGenerateVendor,
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

function getGODEBUG() {
    const key = "tracebackancestors";
    const setting = `${key}=10`;
    const existing = process.env.GODEBUG ?? "";
    if (!existing) return setting;
    if (existing.includes(`${key}=`)) return existing;
    return `${existing},${setting}`;
}

const goTestEnv = {
    GODEBUG: getGODEBUG(),
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
    "--hide-summary",
    "skipped",
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
    await $`npm run -w @typescript/native-preview test:only`;
}

export const testTools = task({
    name: "test:tools",
    description: "Runs all tests in the _tools module.",
    run: runTestTools,
});

export const buildAPI = task({
    name: "build:api",
    description: "Builds @typescript/native-preview JS API.",
    run: async () => {
        await $`npm run -w @typescript/native-preview build`;
    },
});

export const buildAPITests = task({
    name: "build:api:test",
    description: "Builds the @typescript/native-preview JS API tests.",
    run: async () => {
        await $`npm run -w @typescript/native-preview build:test`;
    },
});

export const testAPI = task({
    name: "test:api",
    description: "Runs the @typescript/native-preview JS API tests.",
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
    run: runLint,
});

async function runLint() {
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
}

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
    run: runFormat,
});

async function runFormat() {
    await $`dprint fmt`;
}

export const checkFormat = task({
    name: "check:format",
    description: "Checks that the repo is formatted.",
    run: async () => {
        await $`dprint check`;
    },
});

const scriptTsconfigs = [
    "./_scripts/tsconfig.json",
    "./internal/fourslash/_scripts/tsconfig.json",
    "./internal/lsp/lsproto/_generate/tsconfig.json",
];

export const checkScripts = task({
    name: "check:scripts",
    description: "Type-checks TypeScript scripts.",
    run: async () => {
        for (const tsconfig of scriptTsconfigs) {
            console.log(`Type-checking ${tsconfig}`);
            await $`tsc -p ${tsconfig}`;
        }
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

function getDiffTool() {
    const program = process.env.DIFF;
    if (!program) {
        console.warn("Add the 'DIFF' environment variable to the path of the program you want to use.");
        process.exit(1);
    }
    return program;
}

export const diff = task({
    name: "diff",
    description: "Diffs baselines using the diff tool specified by the 'DIFF' environment variable",
    run: () => $`${getDiffTool()} ${refBaseline} ${localBaseline}`,
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
        /** @type {ReturnType<typeof setTimeout> | undefined} */
        this._timer = undefined;
        /** @type {Deferred<any> | undefined} */
        this._deferred = undefined;
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
    if (nativePreviewReleaseVersion) {
        return nativePreviewReleaseVersion;
    }

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

function getPublishTag() {
    if (publishAsTypescript) {
        const version = getVersion();
        if (!version) {
            throw new Error("Publishing as 'typescript' requires a version before selecting an npm tag.");
        }
        const match = version.match(/-(dev|beta|rc)(?:[.-]|$)/);
        if (match?.[1]) return match[1] === "dev" ? "next" : match[1];
        if (version === nativePreviewReleaseVersion) return "latest";
        throw new Error(`Refusing to publish 'typescript' with the latest tag from non-release version ${version}.`);
    }
    return "latest";
}

const extensionDir = path.resolve("./_extension");
const nightlyExtensionDir = path.resolve("./_extension-nightly");
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
    npmPackageName: publishAsTypescript ? "typescript" : "@typescript/native-preview",
    npmDir: path.join(builtNpm, publishAsTypescript ? "typescript" : "native-preview"),
    npmTarball: path.join(builtNpm, publishAsTypescript ? "typescript.tgz" : "native-preview.tgz"),
};

/**
 * @typedef {"win32" | "linux" | "darwin" | "aix" | "android" | "freebsd" | "netbsd" | "openbsd" | "sunos"} OS
 * @typedef {"x64" | "arm" | "arm64" | "ia32" | "ppc64" | "loong64" | "mips64el" | "riscv64" | "s390x"} Arch
 * @typedef {"Microsoft400" | "LinuxSign" | "MacDeveloperHarden" | "8020" | "VSCodePublisher"} Cert
 * @typedef {`${OS | "alpine"}-${Exclude<Arch, "arm"> | "armhf"}`} VSCodeTarget
 * @typedef {{ name: string; sourceDir: string }} VsixExtensionPackage
 * @typedef {{ vscodeTarget: string; sourceDir: string; extensionDir: string; vsixPath: string; vsixManifestPath: string; vsixSignaturePath: string }} VsixExtension
 * @typedef {{ GOOS: string; GOARCH: string }} GoDistTarget
 * @typedef {{ os: OS; arch: Arch; cert?: Cert; vsix?: boolean; alpine?: boolean }} Platform
 */
void 0;

/** @type {VsixExtensionPackage[]} */
const vsixExtensionPackages = [
    ...(produceNativePreviewVsix ? [{ name: "native-preview", sourceDir: extensionDir }] : []),
    ...(produceTypeScriptNightlyVsix ? [{ name: "vscode-typescript-nightly", sourceDir: nightlyExtensionDir }] : []),
];

/**
 * npm package platforms supported by the native release.
 * The native-preview package publishes only the entries with vsix: true;
 * the typescript package publishes the full list.
 * BSD targets that are not in Node's supported-platforms table are best-effort
 * and limited to mainstream 64-bit x64/arm64 architectures.
 * alpine is set only for the subset that also produces Alpine VSIXes.
 * cert defaults to LinuxSign.
 * @type {Platform[]}
 */
const platforms = [
    { os: "win32", arch: "x64", vsix: true, cert: "Microsoft400" },
    { os: "win32", arch: "arm64", vsix: true, cert: "Microsoft400" },
    { os: "linux", arch: "x64", vsix: true, alpine: true },
    { os: "linux", arch: "arm", vsix: true },
    { os: "linux", arch: "arm64", vsix: true, alpine: true },
    { os: "darwin", arch: "x64", vsix: true, cert: "MacDeveloperHarden" },
    { os: "darwin", arch: "arm64", vsix: true, cert: "MacDeveloperHarden" },
    { os: "aix", arch: "ppc64" },
    { os: "freebsd", arch: "arm64" },
    { os: "freebsd", arch: "x64" },
    { os: "linux", arch: "loong64" },
    { os: "linux", arch: "mips64el" },
    { os: "linux", arch: "ppc64" },
    { os: "linux", arch: "riscv64" },
    { os: "linux", arch: "s390x" },
    { os: "netbsd", arch: "arm64" },
    { os: "netbsd", arch: "x64" },
    { os: "openbsd", arch: "arm64" },
    { os: "openbsd", arch: "x64" },
    { os: "sunos", arch: "x64" },
    // Wasm?
];

const ignoredGoTargets = new Map([
    ["android/386", "Android is not a Node runtime target TypeScript supports"],
    ["android/amd64", "Android is not a Node runtime target TypeScript supports"],
    ["android/arm", "Android is not a Node runtime target TypeScript supports"],
    ["android/arm64", "Android is not a Node runtime target TypeScript supports"],
    ["freebsd/386", "FreeBSD is experimental in Node and limited here to mainstream 64-bit x64/arm64"],
    ["freebsd/arm", "FreeBSD is experimental in Node and limited here to mainstream 64-bit x64/arm64"],
    ["linux/386", "ia32 means 32-bit x86, which TypeScript does not support for native packages"],
    ["linux/ppc64", "Node supports Linux ppc64le; npm's ppc64 CPU name cannot select big-endian ppc64 separately"],
    ["netbsd/386", "NetBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["netbsd/arm", "NetBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["openbsd/386", "OpenBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["openbsd/arm", "OpenBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["openbsd/ppc64", "OpenBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["openbsd/riscv64", "OpenBSD is not in Node's supported-platforms table and is limited here to mainstream 64-bit x64/arm64"],
    ["solaris/amd64", "Node documents SmartOS/sunos rather than Oracle Solaris; sunos-x64 publishes illumos/amd64 for that runtime family"],
    ["windows/386", "ia32 means 32-bit x86, which TypeScript does not support for native packages"],
]);

/**
 * @param {string} os
 * @returns {"windows" | "illumos" | "darwin" | "linux" | "aix" | "android" | "freebsd" | "netbsd" | "openbsd"}
 */
function nodeToGOOS(os) {
    switch (os) {
        case "win32":
            return "windows";
        case "sunos":
            return "illumos";
        case "darwin":
        case "linux":
        case "aix":
        case "android":
        case "freebsd":
        case "netbsd":
        case "openbsd":
            return os;
        default:
            throw new Error(`Unsupported OS: ${os}`);
    }
}

/**
 * @param {string} arch
 * @param {string} os
 * @returns {"amd64" | "386" | "mips64le" | "ppc64" | "ppc64le" | "arm" | "arm64" | "loong64" | "riscv64" | "s390x"}
 */
function nodeToGOARCH(arch, os) {
    switch (arch) {
        case "x64":
            return "amd64";
        case "ia32":
            return "386";
        case "mips64el":
            return "mips64le";
        case "ppc64":
            return os === "aix" ? "ppc64" : "ppc64le";
        case "arm":
        case "arm64":
        case "loong64":
        case "riscv64":
        case "s390x":
            return arch;
        default:
            throw new Error(`Unsupported ARCH: ${arch}`);
    }
}

const getPlatforms = memoize(() => {
    let supportedPlatforms = publishAsTypescript
        ? platforms
        : platforms.filter(({ vsix }) => vsix);

    if (!options.forRelease) {
        supportedPlatforms = supportedPlatforms.filter(({ os, arch }) => os === process.platform && arch === process.arch);
        assert.equal(supportedPlatforms.length, 1, "No supported platforms found");
    }

    return supportedPlatforms.map(({ os, arch, cert = "LinuxSign", vsix, alpine }) => {
        const packageBaseName = publishAsTypescript ? "typescript" : "native-preview";
        const npmDirName = `${packageBaseName}-${os}-${arch}`;
        const npmDir = path.join(builtNpm, npmDirName);
        const npmTarball = `${npmDir}.tgz`;
        const npmPackageName = `@typescript/${npmDirName}`;

        /** @type {VsixExtension[]} */
        let extensions = [];
        if (produceAnyVsix && vsix) {
            /** @type {string[]} */
            const vscodeTargets = [`${os}-${arch === "arm" ? "armhf" : arch}`];
            if (alpine) {
                vscodeTargets.push(`alpine-${arch === "arm" ? "armhf" : arch}`);
            }

            extensions = vscodeTargets.flatMap(vscodeTarget =>
                vsixExtensionPackages.map(({ name: packageName, sourceDir }) => {
                    const extensionDir = path.join(builtVsix, `${packageName}-${vscodeTarget}`);
                    const vsixPath = extensionDir + ".vsix";
                    const vsixManifestPath = extensionDir + ".manifest";
                    const vsixSignaturePath = extensionDir + ".signature.p7s";
                    return {
                        vscodeTarget,
                        sourceDir,
                        extensionDir,
                        vsixPath,
                        vsixManifestPath,
                        vsixSignaturePath,
                    };
                })
            );
        }

        return {
            nodeOs: os,
            nodeArch: arch,
            goos: nodeToGOOS(os),
            goarch: nodeToGOARCH(arch, os),
            npmPackageName,
            npmDirName,
            npmDir,
            npmTarball,
            extensions,
            cert,
        };
    });
});

export const checkPlatforms = task({
    name: "native-preview:check-platforms",
    hiddenFromTaskList: true,
    run: runCheckPlatforms,
});

/**
 * @param {GoDistTarget} target
 */
function goDistTargetToPlatform(target) {
    const goTarget = `${target.GOOS}/${target.GOARCH}`;
    if (ignoredGoTargets.has(goTarget)) {
        return undefined;
    }

    /** @type {OS | undefined} */
    let nodeOs;
    switch (target.GOOS) {
        case "windows":
            nodeOs = "win32";
            break;
        case "illumos":
            nodeOs = "sunos";
            break;
        case "aix":
        case "android":
        case "darwin":
        case "freebsd":
        case "linux":
        case "netbsd":
        case "openbsd":
            nodeOs = target.GOOS;
            break;
        default:
            return undefined;
    }

    /** @type {Arch | undefined} */
    let nodeArch;
    switch (target.GOARCH) {
        case "386":
            nodeArch = "ia32";
            break;
        case "amd64":
            nodeArch = "x64";
            break;
        case "mips64le":
            nodeArch = "mips64el";
            break;
        case "ppc64":
            nodeArch = "ppc64";
            break;
        case "ppc64le":
            nodeArch = "ppc64";
            break;
        case "arm":
        case "arm64":
        case "loong64":
        case "riscv64":
        case "s390x":
            nodeArch = target.GOARCH;
            break;
        default:
            return undefined;
    }

    return `${nodeOs}-${nodeArch}`;
}

async function runCheckPlatforms() {
    const { stdout } = await $pipe`go tool dist list -json`;
    /** @type {GoDistTarget[]} */
    const goTargets = JSON.parse(stdout);
    const goTargetSet = new Set(goTargets.map(({ GOOS, GOARCH }) => `${GOOS}/${GOARCH}`));

    /** @type {[os: OS, arch: Arch][]} */
    const packagePlatforms = platforms.map(({ os, arch }) => /** @type {[OS, Arch]} */ ([os, arch]));
    const actual = new Set(packagePlatforms.map(([os, arch]) => `${os}-${arch}`));
    const expected = new Set(goTargets.map(goDistTargetToPlatform).filter(platform => platform !== undefined));

    const errors = [];
    for (const [os, arch] of packagePlatforms) {
        const goTarget = `${nodeToGOOS(os)}/${nodeToGOARCH(arch, os)}`;
        if (!goTargetSet.has(goTarget)) {
            errors.push(`Configured package platform ${os}-${arch} maps to unsupported Go target ${goTarget}.`);
        }
    }

    const missing = [...expected].filter(platform => !actual.has(platform));
    if (missing.length) {
        errors.push(`Missing package platform(s) for the current Go toolchain: ${missing.join(", ")}.`);
    }

    const extra = [...actual].filter(platform => !expected.has(platform));
    if (extra.length) {
        errors.push(`Unexpected package platform(s), or missing exclusion policy: ${extra.join(", ")}.`);
    }

    if (errors.length) {
        throw new Error(`native-preview platform list is out of sync with 'go tool dist list':\n${errors.map(e => `  - ${e}`).join("\n")}`);
    }
}

/**
 * Recursively strips `@typescript/source` export conditions from a package.json object.
 * Processes `exports` and `imports` fields, skipping past subpath keys (starting with "."
 * or "#") and recursing into condition objects. After removal, simplifies objects that have
 * only a single `default` key down to their bare value.
 * @param {Record<string, any>} packageJson
 */
function stripSourceConditions(packageJson) {
    for (const field of ["exports", "imports"]) {
        if (packageJson[field] != null && typeof packageJson[field] === "object") {
            packageJson[field] = stripConditionsFromValue(packageJson[field]);
        }
    }
}

/**
 * @param {any} value
 * @returns {any}
 */
function stripConditionsFromValue(value) {
    if (value == null || typeof value !== "object") {
        return value;
    }
    delete value["@typescript/source"];
    for (const key of Object.keys(value)) {
        value[key] = stripConditionsFromValue(value[key]);
    }
    // Simplify: if only "default" remains, collapse to its value.
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "default") {
        return value["default"];
    }
    return value;
}

export const buildNativePreviewPackages = task({
    name: "native-preview:build-packages",
    hiddenFromTaskList: true,
    run: runBuildNativePreviewPackages,
});

async function runBuildNativePreviewPackages() {
    await rimraf(builtNpm);

    const platforms = getPlatforms();

    const inputDir = "./_packages/native-preview";

    const inputPackageJson = JSON.parse(fs.readFileSync(path.join(inputDir, "package.json"), "utf8"));
    inputPackageJson.version = getVersion();
    delete inputPackageJson.private;
    inputPackageJson.files = [...new Set([...(inputPackageJson.files ?? []), "NOTICE.txt"])];
    if (publishAsTypescript) {
        inputPackageJson.bin = {
            tsc: "./bin/tsc",
        };
        inputPackageJson.description = "TypeScript is a language for application scale JavaScript development";
        inputPackageJson.homepage = "https://www.typescriptlang.org/";
        inputPackageJson.keywords = [
            "TypeScript",
            "Microsoft",
            "compiler",
            "language",
            "javascript",
        ];
        inputPackageJson.bugs = {
            url: "https://github.com/microsoft/TypeScript/issues",
        };
        inputPackageJson.repository = {
            type: "git",
            url: "https://github.com/microsoft/TypeScript.git",
        };
        delete inputPackageJson.scripts;
        delete inputPackageJson.devDependencies;
    }
    stripSourceConditions(inputPackageJson);

    const { stdout: gitHead } = await $pipe`git rev-parse HEAD`;
    inputPackageJson.gitHead = gitHead;
    inputPackageJson.publishConfig = {
        access: "public",
        tag: getPublishTag(),
    };

    const mainPackage = {
        ...inputPackageJson,
        name: mainNativePreviewPackage.npmPackageName,
        optionalDependencies: Object.fromEntries(platforms.map(p => [p.npmPackageName, getVersion()])),
    };

    const mainPackageDir = mainNativePreviewPackage.npmDir;

    await fs.promises.mkdir(mainPackageDir, { recursive: true });

    // Copy package contents excluding node_modules and dist (dist is copied separately after build).
    // The package.json "files" field controls what npm pack actually includes.
    await cpRecursive(inputDir, mainPackageDir, p => !p.endsWith("/node_modules") && !p.includes("/dist"));
    if (publishAsTypescript) {
        await fs.promises.rename(path.join(mainPackageDir, "bin", "tsgo"), path.join(mainPackageDir, "bin", "tsc"));
        await fs.promises.rename(path.join(mainPackageDir, "lib", "tsgo.js"), path.join(mainPackageDir, "lib", "tsc.js"));
        await fs.promises.writeFile(path.join(mainPackageDir, "bin", "tsc"), '#!/usr/bin/env node\nimport "../lib/tsc.js";\n');
        await fs.promises.chmod(path.join(mainPackageDir, "bin", "tsc"), 0o755);
        await fs.promises.copyFile(path.join(inputDir, "typescript-package-readme.md"), path.join(mainPackageDir, "README.md"));
    }

    await fs.promises.writeFile(path.join(mainPackageDir, "package.json"), JSON.stringify(mainPackage, undefined, 4));
    await fs.promises.copyFile("LICENSE", path.join(mainPackageDir, "LICENSE"));
    await fs.promises.copyFile("NOTICE.txt", path.join(mainPackageDir, "NOTICE.txt"));

    // Build JS API and copy dist into the package.
    await $`npm run -w @typescript/native-preview build`;
    await cpRecursive(path.join(inputDir, "dist"), path.join(mainPackageDir, "dist"));

    // Validate that .d.ts files contain no external imports (all imports must start with "." or "#").
    const dtsFiles = await glob(`${mainPackageDir}/dist/**/*.d.ts`);
    const importErrors = [];
    for (const dtsFile of dtsFiles) {
        const content = await fs.promises.readFile(dtsFile, "utf-8");
        const relPath = path.relative(mainPackageDir, dtsFile);
        for (const [i, line] of content.split("\n").entries()) {
            // Match: import ... from "specifier" / export ... from "specifier"
            const fromMatch = line.match(/(?:import|export)\s.*?\sfrom\s+["']([^"']+)["']/);
            if (fromMatch && !fromMatch[1].startsWith(".") && !fromMatch[1].startsWith("#")) {
                importErrors.push(`${relPath}:${i + 1}: external import declaration "${fromMatch[1]}"`);
            }
            // Match: import("specifier")
            for (const m of line.matchAll(/import\(["']([^"']+)["']\)/g)) {
                if (!m[1].startsWith(".") && !m[1].startsWith("#")) {
                    importErrors.push(`${relPath}:${i + 1}: external dynamic import "${m[1]}"`);
                }
            }
        }
    }
    if (importErrors.length) {
        throw new Error(`Found external imports in .d.ts files:\n${importErrors.map(e => "  " + e).join("\n")}`);
    }

    const extraFlags = getReleaseBuildFlags(options.setPrerelease || nativePreviewReleaseVersion ? getVersion() : undefined);

    const platformBuilders = platforms.map(({ npmDir, npmPackageName, nodeOs, nodeArch, goos, goarch }) => async () => {
        const packageJson = {
            ...inputPackageJson,
            bin: undefined,
            files: ["lib", "NOTICE.txt"],
            imports: undefined,
            dependencies: undefined,
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

        const exeName = nativePreviewExeName(nodeOs);
        await buildTsgo({
            out: publishAsTypescript ? path.join(out, exeName) : out,
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

/**
 * @param {string} nodeOs
 */
function nativePreviewExeName(nodeOs) {
    const baseName = publishAsTypescript ? "tsc" : "tsgo";
    return nodeOs === "win32" ? `${baseName}.exe` : baseName;
}

async function runSignNativePreviewPackages() {
    if (!options.forRelease) {
        throw new Error("This task should not be run in non-release builds.");
    }

    const platforms = getPlatforms();

    /** @type {Map<Cert, { tmpName: string; path: string }[]>} */
    const filelistByCert = new Map();
    for (const { npmDir, nodeOs, cert, npmDirName } of platforms) {
        let certFilelist = filelistByCert.get(cert);
        if (!certFilelist) {
            filelistByCert.set(cert, certFilelist = []);
        }
        certFilelist.push({
            tmpName: npmDirName,
            path: path.join(npmDir, "lib", nativePreviewExeName(nodeOs)),
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
    const platforms = getPlatforms();
    await Promise.all([mainNativePreviewPackage, ...platforms].map(async ({ npmDir, npmTarball }) => {
        const { stdout } = await $pipe`npm pack --json ${npmDir}`;
        const filename = JSON.parse(stdout)[0].filename.replace("@", "").replace("/", "-");
        await fs.promises.rename(filename, npmTarball);
    }));

    // npm packages need to be published in dependency order: platform packages
    // first, then the main package that references them as optionalDependencies.
    const publishManifest = {
        stages: [
            platforms.map(p => ({
                filename: path.basename(p.npmTarball),
            })),
            [
                {
                    filename: path.basename(mainNativePreviewPackage.npmTarball),
                },
            ],
        ],
    };

    const publishManifestPath = path.join(builtNpm, "publish-manifest.json");
    await fs.promises.writeFile(publishManifestPath, JSON.stringify(publishManifest, undefined, 4) + "\n");
}

export const packVsixExtensions = task({
    name: "native-preview:pack-extensions",
    hiddenFromTaskList: true,
    dependencies: options.forRelease ? undefined : [buildNativePreviewPackages, cleanSignTempDirectory],
    run: runPackVsixExtensions,
});

async function runPackVsixExtensions() {
    await rimraf(builtVsix);
    await fs.promises.mkdir(builtVsix, { recursive: true });

    const platforms = getPlatforms();
    const extensions = platforms.flatMap(({ npmDir, extensions }) => extensions.map(e => ({ npmDir, ...e })));
    if (!extensions.length) {
        console.log("No VSIX targets configured; skipping extension packaging.");
        return;
    }

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

    await Promise.all(extensions.map(async ({ npmDir, vscodeTarget, sourceDir, extensionDir: thisExtensionDir, vsixPath, vsixManifestPath, vsixSignaturePath }) => {
        const npmLibDir = path.join(npmDir, "lib");
        const extensionLibDir = path.join(thisExtensionDir, "lib");
        await fs.promises.mkdir(extensionLibDir, { recursive: true });

        await cpWithoutNodeModulesOrTsconfig(sourceDir, thisExtensionDir);
        await cpWithoutNodeModulesOrTsconfig(npmLibDir, extensionLibDir);

        const packageJsonPath = path.join(thisExtensionDir, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        packageJson.version = version;
        packageJson.bundledTypeScriptVersion = getVersion();
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 4));

        await fs.promises.copyFile("NOTICE.txt", path.join(thisExtensionDir, "NOTICE.txt"));

        await $({ cwd: thisExtensionDir })`vsce package ${version} --no-update-package-json --no-dependencies --out ${vsixPath} --target ${vscodeTarget}`;

        if (options.forRelease) {
            await $({ cwd: thisExtensionDir })`vsce generate-manifest --packagePath ${vsixPath} --out ${vsixManifestPath}`;
            await fs.promises.cp(vsixManifestPath, vsixSignaturePath);
        }
    }));
}

export const signVsixExtensions = task({
    name: "native-preview:sign-extensions",
    hiddenFromTaskList: true,
    run: runSignVsixExtensions,
});

async function runSignVsixExtensions() {
    if (!options.forRelease) {
        throw new Error("This task should not be run in non-release builds.");
    }

    const platforms = getPlatforms();
    const extensions = platforms.flatMap(({ npmDir, extensions }) => extensions.map(e => ({ npmDir, ...e })));
    if (!extensions.length) {
        console.log("No VSIX targets configured; skipping extension signing.");
        return;
    }

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
        if (!options.forRelease || !options.setPrerelease && (!nativePreviewReleaseVersion || produceAnyVsix)) {
            throw new Error("native-preview:release requires --forRelease and --setPrerelease flags, unless nativePreviewReleaseVersion is hardcoded and VSIX production is disabled. Example: npx hereby native-preview:release --forRelease --setPrerelease=dev.1.0");
        }
        await runBuildNativePreviewPackages();
        await runSignNativePreviewPackages();
        await runPackNativePreviewPackages();
        await runPackVsixExtensions();
        await runSignVsixExtensions();
        await runCleanSignTempDirectory();
    },
});

export const nativePreview = task({
    name: "native-preview",
    hiddenFromTaskList: true,
    dependencies: options.forRelease ? undefined : [packNativePreviewPackages, packVsixExtensions],
    run: options.forRelease ? async () => {
        throw new Error("This task should not be run in release builds.");
    } : undefined,
});

export const allChecks = task({
    name: "all-checks",
    description: "Runs all checks for the Go code (fourslash, lint, tests, etc.)",
    run: async () => {
        await $`npm run convertfourslash`;
        await runTests();
        await $`npm run updatefailing`;
        await runFormat();
        await runLint();
        await runTests();
    },
});

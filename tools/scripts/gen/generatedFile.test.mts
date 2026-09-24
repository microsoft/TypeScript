import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { stripVTControlCharacters } from "node:util";
import { runInNewContext } from "node:vm";
import { x } from "tinyexec";
import ts from "typescript";
import cache from "./cache.mts";
import {
    defaultCacheDirectory,
    GeneratedFile,
} from "./generatedFile.mts";
import {
    enableFileFingerprintCache,
    getFileFingerprint,
    repoRoot,
    run,
} from "./utils.mts";

test("validate generates before building and selects the generation scope", async () => {
    const fileName = path.resolve(import.meta.dirname, "../../../Herebyfile.mjs");
    const source = ts.createSourceFile(fileName, fs.readFileSync(fileName, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const declaration = source.statements.filter(ts.isVariableStatement)
        .flatMap(statement => statement.declarationList.declarations)
        .find(declaration => declaration.name.getText(source) === "validate");
    assert.ok(declaration?.initializer);
    for (const options of [{}, { api: true }, { all: true }]) {
        const calls: string[] = [];
        const action = (name: string) => async () => {
            calls.push(name);
        };
        const generate = { run: action("generate") };
        const generateGo = { run: action("generate:go") };
        const build = { run: action("build") };
        const validation = runInNewContext(declaration.initializer.getText(source), {
            task: (spec: unknown) => spec,
            options,
            generate,
            generateGo,
            build,
            builtLocal: "./built/local",
            generateLibs: action("lib"),
            buildTsc: action("build"),
            getReleaseBuildFlags: () => [],
            runGenerateGo: action("generate:go"),
            runGenerateEnums: action("generate:enums"),
            runGenerateAPI: action("generate:api"),
            runGenerateExtension: action("generate:extension"),
            runGenerateVendor: action("generate:vendor"),
            runBuildAPITests: async (generate = true) => {
                if (generate) calls.push("generate:sync");
                calls.push("build:api:test");
            },
            runTests: action("test:tsc"),
            runTestExtension: action("test:extension"),
            runTestAPI: action("test:api"),
            runTestBenchmarks: action("test:benchmarks"),
            runTestTools: action("test:tools"),
            runSmokeTest: action("test:smoke"),
            runLint: action("lint"),
            runFormat: action("format"),
        }) as { dependencies: { run: () => Promise<void>; }[]; run: () => Promise<void>; };
        await Promise.all(validation.dependencies.map(dependency => dependency.run()));
        await validation.run();
        assert.equal(calls[0], "all" in options ? "generate" : "generate:go");
        assert.ok(calls.indexOf("build") > 0);
        assert.ok(calls.indexOf("build") < calls.indexOf("test:tsc"));
        assert.equal(calls.includes("test:api"), "api" in options || "all" in options);
        assert.equal(calls.includes("test:tools"), "all" in options);
        if ("all" in options) {
            assert.deepEqual(calls.filter(name => name.startsWith("generate")), ["generate"]);
        }
    }
});

test("generator options preserve repeated inputs and force overrides", async () => {
    const { parseGeneratorArgs, resolveForce } = await import("./utils.mts");
    const options = { type: { type: "string" }, input: { type: "string", multiple: true } } as const;
    const args = ["--type", "Kind", "--input=kind.go", "--input", "extra.go", "--force"];
    const parsed = parseGeneratorArgs(options, args);
    assert.equal(parsed.values.type, "Kind");
    assert.deepEqual(parsed.values.input, ["kind.go", "extra.go"]);
    assert.equal(parsed.force, true);
    assert.equal(resolveForce(undefined, "ON"), true);
    assert.equal(resolveForce(undefined, "0"), false);
    assert.equal(resolveForce(false, "1"), false);
    assert.equal(parseGeneratorArgs({}, ["--no-force"]).force, false);
});

test("generated files are current only while their inputs and formatted output match", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.ts");
    const output = path.join(directory, "output.ts");
    const cache = path.join(directory, "cache");
    fs.writeFileSync(input, "input");
    const generated = () => new GeneratedFile(output, [input], cache);
    let file = generated();
    assert.equal(file.isCurrent(), false);
    file.write("unformatted");
    fs.writeFileSync(output, "formatted");
    file.markCurrent();
    assert.equal(generated().isCurrent(), true);
    assert.equal(generated().isCurrent(true), false);
    file.invalidate();
    assert.equal(generated().isCurrent(), false);
    file.write("formatted");
    file.markCurrent();
    assert.equal(generated().isCurrent(), true);
    fs.utimesSync(input, new Date(), new Date());
    assert.equal(generated().isCurrent(), true);
    fs.writeFileSync(input, "changed");
    assert.equal(generated().isCurrent(), false);
    fs.writeFileSync(input, "input");
    assert.equal(generated().isCurrent(), true);
    fs.writeFileSync(output, "edited");
    assert.equal(generated().isCurrent(), false);
    file = generated();
    file.write("formatted");
    assert.equal(generated().isCurrent(), false);
    file.markCurrent();
    assert.equal(generated().isCurrent(), true);
    const dependency = path.join(directory, "generator.ts");
    fs.writeFileSync(dependency, "generator");
    assert.equal(new GeneratedFile(output, [input, dependency], cache).isCurrent(), false);
    fs.rmSync(dependency);
    assert.throws(() => new GeneratedFile(output, [input, dependency], cache), { code: "ENOENT" });
    fs.rmSync(output);
    assert.equal(generated().isCurrent(), false);
});

test("generated files share input fingerprints and refresh changed inputs", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-fingerprint-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.ts");
    const output = path.join(directory, "output.ts");
    const cache = path.join(directory, "cache");
    fs.writeFileSync(input, "first");
    const reads = context.mock.method(fs, "readFileSync");
    syncBuiltinESMExports();
    context.after(() => {
        reads.mock.restore();
        syncBuiltinESMExports();
    });
    const inputReads = () => reads.mock.calls.filter(call => call.arguments[0] === input).length;
    const first = new GeneratedFile(output, [input], cache);
    new GeneratedFile(path.join(directory, "other.ts"), [input], cache);
    assert.equal(inputReads(), 1);
    first.write("generated");
    first.markCurrent();
    const timestamp = fs.statSync(input);
    fs.writeFileSync(input, "other");
    fs.utimesSync(input, timestamp.atime, timestamp.mtime);
    assert.equal(new GeneratedFile(output, [input], cache).isCurrent(), false);
    fs.rmSync(input);
    assert.throws(() => new GeneratedFile(output, [input], cache), { code: "ENOENT" });
    fs.writeFileSync(input, "first");
    assert.equal(new GeneratedFile(output, [input], cache).isCurrent(), true);
});

test("invocation fingerprints reuse metadata and invalidate writes and commands", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-fingerprint-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    context.after(enableFileFingerprintCache());
    const input = path.join(directory, "input.ts");
    const output = path.join(directory, "output.ts");
    const metadata = path.join(directory, "cache");
    const inputFile = new GeneratedFile(input, [], metadata);
    inputFile.write("first");
    inputFile.markCurrent();
    const reads = context.mock.method(fs, "readFileSync");
    const stats = context.mock.method(fs, "statSync");
    syncBuiltinESMExports();
    context.after(() => {
        reads.mock.restore();
        stats.mock.restore();
        syncBuiltinESMExports();
    });
    const generated = new GeneratedFile(output, [input], metadata);
    new GeneratedFile(path.join(directory, "other.ts"), [input], metadata);
    getFileFingerprint(path.relative(process.cwd(), input));
    assert.equal(reads.mock.calls.filter(call => call.arguments[0] === input).length, 1);
    assert.equal(stats.mock.calls.filter(call => call.arguments[0] === input).length, 1);
    generated.write("generated");
    generated.markCurrent();
    const firstHash = getFileFingerprint(input);
    inputFile.write("other");
    assert.notEqual(getFileFingerprint(input), firstHash);
    assert.equal(new GeneratedFile(output, [input], metadata).isCurrent(), false);
    const stale = new GeneratedFile(output, [input], metadata);
    fs.writeFileSync(input, "third");
    stale.write("stale");
    stale.markCurrent();
    assert.equal(new GeneratedFile(output, [input], metadata).isCurrent(), false);
    for (const failure of [false, true]) {
        const before = getFileFingerprint(input);
        const content = failure ? "failed command" : "successful command";
        const command = run(process.execPath, ["-e", `require('node:fs').writeFileSync(process.argv[1], ${JSON.stringify(content)}); process.exit(${failure ? 1 : 0});`, input]);
        if (failure) await assert.rejects(command);
        else await command;
        assert.notEqual(getFileFingerprint(input), before);
        assert.equal(getFileFingerprint(input), createHash("sha256").update(content).digest("hex"));
    }
    const running = run(process.execPath, ["-e", "process.exit(0)"]);
    try {
        const before = getFileFingerprint(input);
        fs.writeFileSync(input, "changed while a command is running");
        assert.notEqual(getFileFingerprint(input), before);
    }
    finally {
        await running;
    }
});

test("fingerprint cache scopes can overlap", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-fingerprint-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.ts");
    fs.writeFileSync(input, "input");
    const stats = context.mock.method(fs, "statSync");
    syncBuiltinESMExports();
    context.after(() => {
        stats.mock.restore();
        syncBuiltinESMExports();
    });
    const disableFirst = enableFileFingerprintCache();
    const disableSecond = enableFileFingerprintCache();
    try {
        getFileFingerprint(input);
        getFileFingerprint(input);
        assert.equal(stats.mock.callCount(), 1);
        disableFirst();
        getFileFingerprint(input);
        getFileFingerprint(input);
        assert.equal(stats.mock.callCount(), 2);
        disableSecond();
        getFileFingerprint(input);
        getFileFingerprint(input);
        assert.equal(stats.mock.callCount(), 4);
    }
    finally {
        disableSecond();
        disableFirst();
    }
});

test("command cache snapshots and generated files share invocation fingerprints", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-fingerprint-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.txt");
    fs.writeFileSync(input, "input");
    const options = {
        cwd: directory,
        inputs: ["input.txt"],
        outputs: ["output.txt"],
        commands: [[process.execPath, "-e", "require('node:fs').writeFileSync('output.txt', 'generated')"]],
    };
    assert.equal(await cache(options), false);
    context.after(enableFileFingerprintCache());
    const reads = context.mock.method(fs, "readFileSync");
    syncBuiltinESMExports();
    context.after(() => {
        reads.mock.restore();
        syncBuiltinESMExports();
    });
    assert.equal(await cache(options), true);
    assert.equal(await cache(options), true);
    new GeneratedFile(path.join(directory, "other.txt"), [input]);
    assert.equal(reads.mock.calls.filter(call => call.arguments[0] === input).length, 1);
});

test("changing inputs during generation does not mark stale output current", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.ts");
    const output = path.join(directory, "output.ts");
    const cache = path.join(directory, "cache");
    fs.writeFileSync(input, "before");
    const file = new GeneratedFile(output, [input], cache);
    file.write("generated");
    fs.writeFileSync(input, "after");
    file.markCurrent();
    assert.equal(new GeneratedFile(output, [input], cache).isCurrent(), false);
});

test("default metadata is isolated by repository worktree", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const output = path.join(directory, "output.ts");
    assert.equal(path.basename(defaultCacheDirectory), createHash("sha256").update(repoRoot).digest("hex"));
    const cacheFile = path.join(defaultCacheDirectory, createHash("sha256").update(output).digest("hex") + ".json");
    context.after(() => fs.rmSync(cacheFile, { force: true }));
    const file = new GeneratedFile(output, []);
    file.write("generated");
    file.markCurrent();
    assert.equal(fs.existsSync(cacheFile), true);
    assert.equal(new GeneratedFile(output, []).isCurrent(), true);
    fs.rmSync(cacheFile);
    assert.equal(new GeneratedFile(output, []).isCurrent(), false);
    file.markCurrent();
    assert.equal(new GeneratedFile(output, []).isCurrent(), true);
});

test("metadata directories can disappear during generation", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const output = path.join(directory, "output.ts");
    const cache = path.join(directory, "cache");
    const file = new GeneratedFile(output, [], cache);
    file.write("generated");
    file.markCurrent();
    fs.rmSync(cache, { recursive: true });
    assert.equal(file.isCurrent(), false);
    file.write("regenerated");
    file.markCurrent();
    assert.equal(new GeneratedFile(output, [], cache).isCurrent(), true);
});

test("generated files track each output independently", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const files = ["output.go", "locale.gz"].map(file => new GeneratedFile(path.join(directory, file), [], path.join(directory, "cache")));
    for (const file of files) {
        file.write("generated");
        file.markCurrent();
    }
    assert.equal(files.every(file => file.isCurrent()), true);
    fs.writeFileSync(files[1].fileName, "modified");
    assert.equal(files[0].isCurrent(), true);
    assert.equal(files[1].isCurrent(), false);
    fs.writeFileSync(files[1].fileName, "generated");
    assert.equal(files.every(file => file.isCurrent()), true);
    fs.rmSync(files[1].fileName);
    assert.equal(files[0].isCurrent(), true);
    assert.equal(files[1].isCurrent(), false);
    files[1].write("generated");
    files[1].markCurrent();
    files[1].invalidate();
    assert.equal(files[0].isCurrent(), true);
    assert.equal(files[1].isCurrent(), false);
});

test("generate:go runs Go generators directly and shares caches with Go fallback", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = () => x("npx", ["hereby", "generate:go"], { throwOnError: true, nodeOptions: { cwd: root } });
    const first = await generate();
    assert.doesNotMatch(first.stdout, /\$ go generate|npm run --silent cache|\$ node .*generate-unicode-data/);
    const files = fs.globSync(["tsc/internal/**/*generated.go", "packages/typescript/src/api/proto.generated.ts"], { cwd: root });
    const timestamps = files.map(file => fs.statSync(path.join(root, file)).mtimeMs);
    const current = await generate();
    assert.doesNotMatch(current.stdout, /Generated codegen outputs|Generated Unicode tables/);
    assert.match(current.stdout, /Unicode tables are up to date/);
    assert.deepEqual(files.map(file => fs.statSync(path.join(root, file)).mtimeMs), timestamps);
    const fallback = await x("go", ["-C", "./tsc", "generate", "./internal/diagnostics"], { throwOnError: true, nodeOptions: { cwd: root } });
    assert.equal(fallback.stdout.match(/codegen outputs are already up to date/g)?.length, 2);
    const nested = await x("npx", ["hereby", "generate:compileroptions"], { throwOnError: true, nodeOptions: { cwd: path.join(root, "tsc/internal/core") } });
    assert.equal(nested.stdout.match(/codegen outputs are already up to date/g)?.length, 2);
});

test("generate includes standalone generators without Go traversal", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const { stdout } = await x("npx", ["hereby", "generate"], { throwOnError: true, nodeOptions: { cwd: root } });
    const log = stripVTControlCharacters(stdout);
    const eventIndex = (event: string) => {
        const index = log.indexOf(event);
        assert.ok(index >= 0, `Missing task event: ${event}`);
        return index;
    };
    const compilerStart = eventIndex("Starting generate:compiler");
    assert.ok(eventIndex("Finished generate:ast ") < compilerStart);
    assert.ok(eventIndex("Finished generate:lsp ") < compilerStart);
    assert.ok(eventIndex("Starting generate:sync") < compilerStart);
    assert.ok(eventIndex("Starting generate:vendor") < compilerStart);
    assert.ok(eventIndex("Finished generate:extension ") < eventIndex("Starting generate:extension-test"));
    assert.doesNotMatch(stdout, /\$ go generate|npm run --silent cache/);
    assert.match(stdout, /Unicode tables/);
    assert.match(stdout, /Enums are up to date|All generated values match Go/);
    assert.match(stdout, /Sync API is up to date|Formatting\.\.\./);
    assert.match(stdout, /LSP bindings are up to date|Successfully generated .*lsp_generated\.go/);
    assert.match(stdout, /generateLocBundle/);
    assert.match(stdout, /generateLocTest/);
    assert.deepEqual(
        fs.readFileSync(path.join(root, "packages/typescript/vendor/vscode-jsonrpc/package.json")),
        fs.readFileSync(path.join(root, "node_modules/vscode-jsonrpc/package.json")),
    );
    const lspOutput = path.join(root, "tsc/internal/lsp/lsproto/lsp_generated.go");
    const timestamp = fs.statSync(lspOutput).mtimeMs;
    const current = await x("npx", ["hereby", "generate:lsp"], { throwOnError: true, nodeOptions: { cwd: root } });
    assert.match(current.stdout, /LSP bindings are up to date/);
    assert.doesNotMatch(current.stdout, /Using vscode-languageclient/);
    assert.equal(fs.statSync(lspOutput).mtimeMs, timestamp);
});

test("localization and vendoring preserve current outputs", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = (force = false) => x("npx", ["hereby", "generate:extension-test", "generate:vendor", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const outputs = fs.globSync([
        "packages/vscode-typescript/l10n/*.json",
        "packages/vscode-typescript/package.nls.qps-ploc.json",
        "packages/typescript/vendor/vscode-jsonrpc/**/*",
    ], { cwd: root }).map(file => path.join(root, file)).filter(file => fs.statSync(file).isFile());
    const contents = outputs.map(file => fs.readFileSync(file));
    context.after(() => {
        for (const [index, file] of outputs.entries()) fs.writeFileSync(file, contents[index]);
    });
    const oldTime = new Date("2000-01-01T00:00:00Z");
    for (const file of outputs) fs.utimesSync(file, oldTime, oldTime);
    const timestamps = outputs.map(file => fs.statSync(file).mtimeMs);
    await generate();
    assert.deepEqual(outputs.map(file => fs.statSync(file).mtimeMs), timestamps);
    await generate(true);
    for (const file of outputs) assert.notEqual(fs.statSync(file).mtimeMs, oldTime.getTime());
    for (const [index, file] of outputs.entries()) {
        if (index % 2) fs.rmSync(file);
        else fs.writeFileSync(file, "modified");
    }
    await generate();
    assert.deepEqual(outputs.map(file => fs.readFileSync(file)), contents);
});

test("localization tracks source membership and package strings", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const extension = path.join(root, "packages/vscode-typescript");
    const source = path.join(extension, "src/cache-probe.ts");
    const packageStrings = path.join(extension, "package.nls.json");
    const bundle = path.join(extension, "l10n/bundle.l10n.json");
    const pseudoBundle = path.join(extension, "l10n/bundle.l10n.qps-ploc.json");
    const pseudoPackage = path.join(extension, "package.nls.qps-ploc.json");
    const originals = [packageStrings, bundle, pseudoBundle, pseudoPackage].map(file => [file, fs.readFileSync(file)] as const);
    assert.equal(fs.existsSync(source), false);
    context.after(() => {
        fs.rmSync(source, { force: true });
        for (const [file, content] of originals) fs.writeFileSync(file, content);
    });
    const generate = () => x("npx", ["hereby", "generate:extension-test"], { throwOnError: true, nodeOptions: { cwd: root } });
    for (const message of ["Codegen cache probe", "Updated codegen cache probe"]) {
        fs.writeFileSync(source, `import * as vscode from "vscode";\nexport const message = vscode.l10n.t(${JSON.stringify(message)});\n`);
        await generate();
        assert.ok(Object.hasOwn(JSON.parse(fs.readFileSync(bundle, "utf8")), message));
        assert.ok(Object.hasOwn(JSON.parse(fs.readFileSync(pseudoBundle, "utf8")), message));
    }
    fs.rmSync(source);
    await generate();
    assert.deepEqual(fs.readFileSync(bundle), originals[1][1]);
    assert.deepEqual(fs.readFileSync(pseudoBundle), originals[2][1]);
    const strings = JSON.parse(fs.readFileSync(packageStrings, "utf8"));
    strings["cache.probe"] = "Package cache probe";
    fs.writeFileSync(packageStrings, JSON.stringify(strings));
    await generate();
    assert.ok(Object.hasOwn(JSON.parse(fs.readFileSync(pseudoPackage, "utf8")), "cache.probe"));
});

test("vendoring tracks package versions and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const source = path.join(root, "node_modules/vscode-jsonrpc/lib/cache-probe.txt");
    const destination = path.join(root, "packages/typescript/vendor/vscode-jsonrpc/lib/cache-probe.txt");
    const sourceManifest = path.join(root, "node_modules/vscode-jsonrpc/package.json");
    const destinationManifest = path.join(root, "packages/typescript/vendor/vscode-jsonrpc/package.json");
    const originalSourceManifest = fs.readFileSync(sourceManifest);
    const originalDestinationManifest = fs.readFileSync(destinationManifest);
    assert.equal(fs.existsSync(source), false);
    assert.equal(fs.existsSync(destination), false);
    context.after(() => {
        fs.rmSync(source, { force: true });
        fs.rmSync(destination, { force: true });
        fs.writeFileSync(sourceManifest, originalSourceManifest);
        fs.writeFileSync(destinationManifest, originalDestinationManifest);
    });
    const generate = (force = false) => x("npx", ["hereby", "generate:vendor", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    fs.writeFileSync(source, "first");
    await generate();
    assert.equal(fs.existsSync(destination), false);
    const manifest = JSON.parse(originalSourceManifest.toString());
    manifest.version += "-cache-probe";
    fs.writeFileSync(sourceManifest, JSON.stringify(manifest));
    await generate();
    assert.equal(fs.readFileSync(destination, "utf8"), "first");
    assert.equal(JSON.parse(fs.readFileSync(destinationManifest, "utf8")).version, manifest.version);
    fs.writeFileSync(source, "changed");
    await generate();
    assert.equal(fs.readFileSync(destination, "utf8"), "first");
    await generate(true);
    assert.equal(fs.readFileSync(destination, "utf8"), "changed");
    fs.rmSync(source);
    await generate();
    assert.equal(fs.readFileSync(destination, "utf8"), "changed");
    fs.rmSync(destinationManifest);
    await generate();
    assert.equal(fs.existsSync(destination), false);
    assert.equal(JSON.parse(fs.readFileSync(destinationManifest, "utf8")).version, manifest.version);
});

test("bundled generation skips unchanged library outputs", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = () => x("go", ["-C", "./tsc", "generate", "./internal/bundled"], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = ["libs_generated.go", "embed_generated.go"].map(file => path.join(root, "tsc/internal/bundled", file));
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    assert.match((await generate()).stdout, /codegen outputs are already up to date/);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
});

test("bundled generation tracks libraries, validates inputs, and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_bundled-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    const notice = path.join(directory, "CopyrightNotice.txt");
    const libs = path.join(directory, "libs");
    fs.mkdirSync(libs);
    fs.writeFileSync(notice, "Fixture notice\n\n");
    const library = path.join(libs, "lib.first.d.ts");
    const content = "Fixture notice\n\n\ndeclare const first: string;\n";
    fs.writeFileSync(library, content);
    const options = {
        cwd: directory,
        inputs: [path.join(root, "tsc/internal/bundled/generate.go"), "CopyrightNotice.txt", "libs/*"],
        outputs: ["libs_generated.go", "embed_generated.go"],
        commands: [["go", "run", path.join(root, "tsc/internal/bundled/generate.go")]],
    };
    const generate = (force = false) => cache({ ...options, force });
    await generate();
    const files = ["libs_generated.go", "embed_generated.go"].map(file => path.join(directory, file));
    const originals = files.map(file => fs.readFileSync(file));
    assert.equal(await generate(), true);
    const added = path.join(libs, "lib.second.d.ts");
    fs.writeFileSync(added, content);
    assert.equal(await generate(), false);
    for (const file of files) assert.match(fs.readFileSync(file, "utf8"), /lib\.second\.d\.ts/);
    fs.rmSync(added);
    assert.equal(await generate(), false);
    for (const [index, file] of files.entries()) {
        assert.deepEqual(fs.readFileSync(file), originals[index]);
        fs.writeFileSync(file, "modified");
        assert.equal(await generate(), false);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
        fs.rmSync(file, { recursive: true, maxRetries: 10 });
        assert.equal(await generate(), false);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
    }
    fs.writeFileSync(library, content.replace("string", "number"));
    assert.equal(await generate(), false);
    fs.writeFileSync(library, content.replaceAll("\n", "\r\n"));
    await assert.rejects(generate());
    fs.writeFileSync(library, content);
    assert.equal(await generate(), false);
    fs.mkdirSync(path.join(libs, "unexpected"));
    await assert.rejects(generate());
    fs.rmdirSync(path.join(libs, "unexpected"));
    assert.equal(await generate(), false);
    fs.writeFileSync(notice, "Changed fixture notice\n\n");
    await assert.rejects(generate());
    fs.writeFileSync(notice, "Fixture notice\n\n");
    assert.equal(await generate(), false);
    assert.equal(await generate(true), false);
    assert.equal(await generate(), true);
});

test("stringer generation tracks declared inputs, options, output, and force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_stringer-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const source = path.join(directory, "kind.go");
    const extra = path.join(directory, "extra.go");
    const output = path.join(directory, "kind_stringer_generated.go");
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    const generate = (trimPrefix = false, force = false) =>
        cache({
            cwd: directory,
            inputs: ["kind.go"],
            outputs: ["kind_stringer_generated.go"],
            env: { GOFILE: "kind.go" },
            force,
            commands: [
                ["go", "tool", "golang.org/x/tools/cmd/stringer", "-type=Kind", "-output=kind_stringer_generated.go", ...(trimPrefix ? ["-trimprefix=Kind"] : [])],
                ["dprint", "fmt", "kind_stringer_generated.go"],
            ],
        });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal(await generate(), true);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(extra, "package probe\n\nconst Unrelated = 1\n");
    assert.equal(await generate(), true);
    fs.appendFileSync(source, "\nconst KindSecond Kind = 1\n");
    assert.equal(await generate(), false);
    assert.match(fs.readFileSync(output, "utf8"), /KindSecond/);
    fs.rmSync(extra);
    assert.equal(await generate(), true);
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    assert.equal(await generate(), false);
    assert.doesNotMatch(fs.readFileSync(output, "utf8"), /KindSecond/);
    assert.equal(await generate(true), false);
    assert.match(fs.readFileSync(output, "utf8"), /_Kind_name = "First"/);
    assert.equal(await generate(true), true);
    fs.appendFileSync(output, "\n");
    assert.equal(await generate(true), false);
    fs.rmSync(output);
    assert.equal(await generate(true), false);
    assert.equal(await generate(true, true), false);
    assert.equal(await generate(true), true);
    fs.appendFileSync(source, "\nconst KindInvalid Kind = missing\n");
    await assert.rejects(generate(true));
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    assert.equal(await generate(true), false);
    assert.equal(await generate(true), true);
});

test("moq generation tracks interface inputs, output, and force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_moq-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const source = path.join(directory, "client.go");
    const base = path.join(directory, "base.go");
    fs.mkdirSync(path.join(directory, "mock"));
    const output = path.join(directory, "mock/mock_generated.go");
    fs.writeFileSync(base, "package probe\n\ntype Base interface { Read() string }\n");
    fs.writeFileSync(source, "package probe\n\ntype Client interface { Base }\n");
    const options = {
        cwd: directory,
        inputs: ["client.go", "base.go"],
        outputs: ["mock/mock_generated.go"],
        commands: [
            ["go", "tool", "github.com/matryer/moq", "-stub", "-fmt=goimports", "-pkg=mock", "-out=mock/mock_generated.go", ".", "Client"],
            ["dprint", "fmt", "mock/mock_generated.go"],
        ],
    };
    const generate = (force = false) => cache({ ...options, force });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal(await generate(), true);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(base, "package probe\n\ntype Base interface { Read() string; Close() error }\n");
    assert.equal(await generate(), false);
    assert.match(fs.readFileSync(output, "utf8"), /CloseFunc/);
    fs.rmSync(output);
    assert.equal(await generate(), false);
    assert.equal(await generate(true), false);
    assert.equal(await generate(), true);
});

test("diagnostic generation tracks Go and locale outputs and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_diagnostics-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const output = path.join(directory, "diagnostics_generated.go");
    const source = path.join(directory, "diagnosticMessages.generated.json");
    const localized = path.join(directory, "loc_generated.go");
    const locDirectory = path.join(directory, "loc");
    fs.mkdirSync(locDirectory);
    const handbacks = fs.globSync("loc/*.generated.json", { cwd: path.join(root, "tsc/internal/diagnostics") });
    for (const handback of handbacks) {
        fs.copyFileSync(path.join(root, "tsc/internal/diagnostics", handback), path.join(locDirectory, path.basename(handback)));
    }
    const project = path.join(directory, "tools/LocProject.json");
    fs.mkdirSync(path.dirname(project));
    const projectData = JSON.parse(fs.readFileSync(path.join(root, "tools/LocProject.json"), "utf8"));
    projectData.Projects[0].LocItems = [projectData.Projects[0].LocItems[0]];
    projectData.Projects[0].LocItems[0].SourceFile = "diagnosticMessages.generated.json";
    fs.writeFileSync(project, JSON.stringify(projectData));
    const options = {
        cwd: path.join(root, "tsc/internal/diagnostics"),
        inputs: ["generate.go", "diagnosticMessages.json", project, "../{collections,json}/*.go", path.join(locDirectory, "*.generated.json")],
        exclude: ["**/*_test.go"],
        outputs: [output, source, localized, path.join(locDirectory, "*.json.gz")],
        commands: [
            ["go", "run", "generate.go", "-diagnostics", output, "-loc", localized, "-locdir", locDirectory, "-locproject", project, "-locsource", source],
            ["dprint", "fmt", output, localized],
        ],
    };
    const generate = (force = false) => cache({ ...options, force });
    await generate();
    const locales = fs.globSync("loc/*.json.gz", { cwd: directory }).map(file => path.join(directory, file));
    assert.ok(locales.length > 0);
    const files = [output, source, localized, ...locales];
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    assert.equal(await generate(), true);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
    fs.appendFileSync(project, "\n");
    assert.equal(await generate(), false);
    fs.appendFileSync(path.join(locDirectory, path.basename(handbacks[0])), "\n");
    assert.equal(await generate(), false);
    const archive = fs.readFileSync(locales[0]);
    fs.rmSync(locales[0]);
    assert.equal(await generate(), false);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    fs.writeFileSync(locales[0], "modified");
    assert.equal(await generate(), false);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    const unexpected = path.join(directory, "loc/unexpected.json.gz");
    fs.writeFileSync(unexpected, "unexpected");
    assert.equal(await generate(), false);
    assert.equal(fs.existsSync(unexpected), false);
    for (const locale of locales) fs.rmSync(locale);
    assert.equal(await generate(), false);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    fs.rmSync(localized);
    assert.equal(await generate(), false);
    assert.equal(await generate(true), false);
    assert.equal(await generate(), true);
});

test("Unicode generation skips unchanged tables and formatting", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = () => x("go", ["-C", "./tsc", "generate", "./internal/stringutil"], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = ["js_case_generated.go", "identifier_parts_generated.go"].map(file => path.join(root, "tsc/internal/stringutil", file));
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    const current = await generate();
    assert.match(current.stdout, /Unicode tables are up to date\./);
    assert.doesNotMatch(current.stdout, /Formatted/);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
});

test("Unicode generation repairs outputs and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_unicode-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const command = [path.join(root, "tsc/internal/stringutil/_scripts/generate-unicode-data.mts"), "--outDir", directory];
    const generate = (...args: string[]) => x(process.execPath, [...command, ...args], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = ["js_case_generated.go", "identifier_parts_generated.go"].map(file => path.join(directory, file));
    const originals = files.map(file => fs.readFileSync(file));
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    assert.match((await generate()).stdout, /Unicode tables are up to date\./);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
    for (const [index, file] of files.entries()) {
        assert.deepEqual(originals[index], fs.readFileSync(path.join(root, "tsc/internal/stringutil", path.basename(file))));
        fs.writeFileSync(file, "modified");
        assert.match((await generate()).stdout, /Generated Unicode tables\./);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
        fs.rmSync(file);
        assert.match((await generate()).stdout, /Generated Unicode tables\./);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
    }
    const cacheFile = path.join(defaultCacheDirectory, createHash("sha256").update(files[0]).digest("hex") + ".json");
    context.after(() => fs.rmSync(cacheFile, { force: true }));
    fs.rmSync(cacheFile);
    assert.match((await generate()).stdout, /Generated Unicode tables\./);
    assert.match((await generate("--force")).stdout, /Generated Unicode tables\./);
    assert.match((await generate()).stdout, /Unicode tables are up to date\./);
    const forced = await x(process.execPath, command, {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(forced.stdout, /Generated Unicode tables\./);
    const overridden = await x(process.execPath, [...command, "--no-force"], {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(overridden.stdout, /Unicode tables are up to date\./);
});

test("enum generation skips unchanged outputs and Go verification", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = (force = false) => x("npx", ["hereby", "generate:enums", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = [
        ...fs.globSync("packages/typescript/src/enums/*.ts", { cwd: root }),
        "tsc/internal/api/enum_values_generated.go",
    ].map(file => path.join(root, file));
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    const { stdout } = await generate();
    assert.match(stdout, /Enums are up to date\./);
    assert.doesNotMatch(stdout, /Getting values from go/);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
    const forced = await generate(true);
    assert.match(forced.stdout, /All generated values match Go\./);
    assert.match((await generate()).stdout, /Enums are up to date\./);
    const verifier = path.join(root, "tsc/internal/api/enum_values_generated.go");
    const cacheFile = path.join(defaultCacheDirectory, createHash("sha256").update(verifier).digest("hex") + ".json");
    fs.rmSync(cacheFile);
    const regenerated = await generate();
    assert.match(regenerated.stdout, /All generated values match Go\./);
    assert.match((await generate()).stdout, /Enums are up to date\./);
});

test("AST generation forwards force to schema generators and the kind stringer", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = (force = false) => x("npx", ["hereby", "generate:ast", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const output = path.join(root, "tsc/internal/ast/kind_stringer_generated.go");
    const oldTime = new Date("2000-01-01T00:00:00Z");
    fs.utimesSync(output, oldTime, oldTime);
    const forced = await generate(true);
    assert.match(forced.stdout, /Wrote .*encoder_generated\.go/);
    assert.match(forced.stdout, /Wrote .*ast_generated\.go/);
    assert.match(forced.stdout, /Generated .*ast\.generated\.ts/);
    assert.notEqual(fs.statSync(output).mtimeMs, oldTime.getTime());
    const timestamp = fs.statSync(output).mtimeMs;
    assert.doesNotMatch(forced.stdout, /\$ node .*tools\/scripts\/tsc\/generate\.ts/);
    const current = await generate();
    assert.doesNotMatch(current.stdout, /(?:Wrote|Generated) /);
    assert.match(current.stdout, /codegen outputs are already up to date/);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
});

test("package generation forwards force to AST, encoder, and sync generators", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const generate = (force = false) => x("npm", ["run", "-w", "@typescript/typescript", "generate", ...(force ? ["--", "--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const forced = await generate(true);
    assert.match(forced.stdout, /Generated .*ast\.generated\.ts/);
    assert.match(forced.stdout, /Wrote .*encoder_generated\.go/);
    assert.match(forced.stdout, /Formatting\.\.\./);
    const current = await generate();
    assert.doesNotMatch(current.stdout, /(?:Wrote|Generated) |Formatting\.\.\./);
    assert.match(current.stdout, /Sync API is up to date\./);
});

test("API protocol generation caches formatted output and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const output = path.join(root, "packages/typescript/src/api/proto.generated.ts");
    const generate = (force = false) => x("npx", ["hereby", "generate:api", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    const current = await generate();
    assert.match(current.stdout, /codegen outputs are already up to date/);
    assert.doesNotMatch(current.stdout, /\$ node .*cache\.mts/);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    const unrelated = path.join(root, "tsc/internal/parser/codegen_cache_probe.go");
    assert.equal(fs.existsSync(unrelated), false);
    context.after(() => fs.rmSync(unrelated, { force: true }));
    fs.writeFileSync(unrelated, "package parser\n");
    assert.match((await generate()).stdout, /codegen outputs are already up to date/);
    fs.rmSync(unrelated);
    const schema = path.join(root, "tsc/internal/api/requestfilesystem/codegen_cache_probe.go");
    assert.equal(fs.existsSync(schema), false);
    const original = fs.readFileSync(output, "utf8");
    context.after(async () => {
        if (fs.existsSync(schema)) {
            fs.rmSync(schema);
            await generate(true);
        }
    });
    fs.writeFileSync(schema, 'package requestfilesystem\n\nconst KindCodegenCacheProbe Kind = "codegen-cache-probe"\n');
    await generate();
    assert.match(fs.readFileSync(output, "utf8"), /"codegen-cache-probe"/);
    fs.rmSync(schema);
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), original);
    const oldTime = new Date("2000-01-01T00:00:00Z");
    fs.utimesSync(output, oldTime, oldTime);
    await generate(true);
    assert.notEqual(fs.statSync(output).mtimeMs, oldTime.getTime());
    assert.match((await generate()).stdout, /codegen outputs are already up to date/);
    fs.utimesSync(output, oldTime, oldTime);
    const nested = await x("go", ["-C", "./tsc", "generate", "./internal/api"], {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.notEqual(fs.statSync(output).mtimeMs, oldTime.getTime());
    assert.match((await generate()).stdout, /codegen outputs are already up to date/);
});

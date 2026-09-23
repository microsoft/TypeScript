import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
    defaultCacheDirectory,
    GeneratedFile,
} from "./generatedFile.mts";
import {
    enableFileFingerprintCache,
    getFileFingerprint,
    repoRoot,
    withFileFingerprintWrites,
} from "./utils.mts";

test("Go AST generator validates bases after schema reloads", async context => {
    const { default: generateGoAST } = await import("../tsc/generate-go-ast.ts");
    const schema = await import("../tsc/schema.ts");
    context.mock.method(GeneratedFile.prototype, "isCurrent", () => true);
    context.after(() => schema.reloadSchema());
    generateGoAST();

    for (
        const { name, extendsKeys, error } of [
            { name: "duplicate bases", extendsKeys: ["NodeBase", "NodeBase"], error: /declares duplicate embedded bases/ },
            { name: "missing NodeBase", extendsKeys: [], error: /does not embed NodeBase at offset zero/ },
        ]
    ) {
        await context.test(name, context => {
            schema.reloadSchema();
            const node = [...schema.api.nodes()][0];
            assert.ok(node);
            context.mock.getter(node, "extendsKeys", () => extendsKeys);
            assert.throws(() => generateGoAST(), error);
        });
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

test("invocation fingerprints reuse metadata and invalidate writes", async context => {
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
        const content = failure ? "failed write" : "successful write";
        const writing = withFileFingerprintWrites(() => {
            fs.writeFileSync(input, content);
            if (failure) throw new Error("Write failed");
        });
        if (failure) await assert.rejects(writing, /Write failed/);
        else await writing;
        assert.notEqual(getFileFingerprint(input), before);
        assert.equal(getFileFingerprint(input), createHash("sha256").update(content).digest("hex"));
    }
    const finished = Promise.withResolvers<void>();
    const writing = withFileFingerprintWrites(() => finished.promise);
    try {
        const before = getFileFingerprint(input);
        fs.writeFileSync(input, "changed while a writer is active");
        assert.notEqual(getFileFingerprint(input), before);
    }
    finally {
        finished.resolve();
        await writing;
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

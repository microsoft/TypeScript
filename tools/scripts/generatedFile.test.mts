import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import * as fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { x } from "tinyexec";
import { GeneratedFile } from "./generatedFile.mts";

test("generator options preserve tool arguments and force overrides", async () => {
    const { parseGeneratorArgs, resolveForce } = await import("./gen/utils.mts");
    const options = { type: { type: "string" }, input: { type: "string", multiple: true } } as const;
    const args = ["-type", "Kind", "--input=kind.go", "--input", "extra.go", "--force", ".", "Kind:Mock"];
    const parsed = parseGeneratorArgs(options, args, true);
    assert.equal(parsed.values.type, "Kind");
    assert.deepEqual(parsed.values.input, ["kind.go", "extra.go"]);
    assert.deepEqual(parsed.positionals, [".", "Kind:Mock"]);
    assert.deepEqual(parsed.toolArgs, ["-type", "Kind", ".", "Kind:Mock"]);
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

test("default metadata has a stable path in the OS temporary directory", context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-codegen-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const output = path.join(directory, "output.ts");
    const cacheFile = path.join(os.tmpdir(), "typescript-codegen", createHash("sha256").update(output).digest("hex") + ".json");
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

test("bundled generation skips unchanged library outputs", async () => {
    const root = path.resolve(import.meta.dirname, "../..");
    const generate = () => x("go", ["-C", "./tsc", "generate", "./internal/bundled"], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = ["libs_generated.go", "embed_generated.go"].map(file => path.join(root, "tsc/internal/bundled", file));
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    assert.match((await generate()).stdout, /Bundled libraries are up to date\./);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
});

test("bundled generation tracks libraries, validates inputs, and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_bundled-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    const notice = path.join(directory, "CopyrightNotice.txt");
    const libs = path.join(directory, "libs");
    fs.mkdirSync(libs);
    fs.writeFileSync(notice, "Fixture notice\n\n");
    const library = path.join(libs, "lib.first.d.ts");
    const content = "Fixture notice\n\n\ndeclare const first: string;\n";
    fs.writeFileSync(library, content);
    const command = [path.join(root, "tools/scripts/generateBundled.mts"), "--directory", directory];
    const generate = (...args: string[]) => x(process.execPath, [...command, ...args], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const files = ["libs_generated.go", "embed_generated.go"].map(file => path.join(directory, file));
    const originals = files.map(file => fs.readFileSync(file));
    assert.match((await generate()).stdout, /Bundled libraries are up to date\./);
    const added = path.join(libs, "lib.second.d.ts");
    fs.writeFileSync(added, content);
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    for (const file of files) assert.match(fs.readFileSync(file, "utf8"), /lib\.second\.d\.ts/);
    fs.rmSync(added);
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    for (const [index, file] of files.entries()) {
        assert.deepEqual(fs.readFileSync(file), originals[index]);
        fs.writeFileSync(file, "modified");
        assert.match((await generate()).stdout, /Generated bundled libraries\./);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
        fs.rmSync(file, { recursive: true, maxRetries: 10 });
        assert.match((await generate()).stdout, /Generated bundled libraries\./);
        assert.deepEqual(fs.readFileSync(file), originals[index]);
    }
    fs.writeFileSync(library, content.replace("string", "number"));
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    fs.writeFileSync(library, content.replaceAll("\n", "\r\n"));
    await assert.rejects(async () => await generate(), error => {
        assert.match((error as { output: { stderr: string; }; }).output.stderr, /must use LF line endings/);
        return true;
    });
    fs.writeFileSync(library, content);
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    fs.mkdirSync(path.join(libs, "unexpected"));
    await assert.rejects(async () => await generate(), error => {
        assert.match((error as { output: { stderr: string; }; }).output.stderr, /unexpected entry/);
        return true;
    });
    fs.rmdirSync(path.join(libs, "unexpected"));
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    fs.writeFileSync(notice, "Changed fixture notice\n\n");
    await assert.rejects(async () => await generate(), error => {
        assert.match((error as { output: { stderr: string; }; }).output.stderr, /must start with/);
        return true;
    });
    fs.writeFileSync(notice, "Fixture notice\n\n");
    assert.match((await generate()).stdout, /Generated bundled libraries\./);
    assert.match((await generate("--force")).stdout, /Generated bundled libraries\./);
    assert.match((await generate()).stdout, /Bundled libraries are up to date\./);
    const forced = await x(process.execPath, command, {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(forced.stdout, /Generated bundled libraries\./);
    assert.match((await generate()).stdout, /Bundled libraries are up to date\./);
});

test("stringer generation tracks GOFILE, options, output, and force", async context => {
    const root = path.resolve(import.meta.dirname, "../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_stringer-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const source = path.join(directory, "kind.go");
    const extra = path.join(directory, "extra.go");
    const output = path.join(directory, "kind_stringer_generated.go");
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    const generate = (...args: string[]) =>
        x(process.execPath, [path.join(root, "tools/scripts/generateStringer.mts"), "-type=Kind", "-output=kind_stringer_generated.go", ...args], {
            throwOnError: true,
            nodeOptions: { cwd: directory, env: { ...process.env, GOFILE: "kind.go" } },
        });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    assert.match((await generate()).stdout, /Stringer output is up to date\./);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(extra, "package probe\n\nconst Unrelated = 1\n");
    assert.match((await generate()).stdout, /Stringer output is up to date\./);
    fs.appendFileSync(source, "\nconst KindSecond Kind = 1\n");
    assert.match((await generate()).stdout, /Generated stringer output\./);
    assert.match(fs.readFileSync(output, "utf8"), /KindSecond/);
    fs.rmSync(extra);
    assert.match((await generate()).stdout, /Stringer output is up to date\./);
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    assert.match((await generate()).stdout, /Generated stringer output\./);
    assert.doesNotMatch(fs.readFileSync(output, "utf8"), /KindSecond/);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Generated stringer output\./);
    assert.match(fs.readFileSync(output, "utf8"), /_Kind_name = "First"/);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Stringer output is up to date\./);
    fs.appendFileSync(output, "\n");
    assert.match((await generate("-trimprefix=Kind")).stdout, /Generated stringer output\./);
    fs.rmSync(output);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Generated stringer output\./);
    assert.match((await generate("-trimprefix=Kind", "--force")).stdout, /Generated stringer output\./);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Stringer output is up to date\./);
    const command = [path.join(root, "tools/scripts/generateStringer.mts"), "-type=Kind", "-output=kind_stringer_generated.go", "-trimprefix=Kind"];
    const explicit = await x(process.execPath, [...command, "--input", "kind.go"], {
        throwOnError: true,
        nodeOptions: { cwd: directory, env: { ...process.env, GOFILE: "" } },
    });
    assert.match(explicit.stdout, /Stringer output is up to date\./);
    const forced = await x(process.execPath, command, {
        throwOnError: true,
        nodeOptions: { cwd: directory, env: { ...process.env, GOFILE: "kind.go", TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(forced.stdout, /Generated stringer output\./);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Stringer output is up to date\./);
    fs.appendFileSync(source, "\nconst KindInvalid Kind = missing\n");
    await assert.rejects(async () => await generate("-trimprefix=Kind"));
    fs.writeFileSync(source, "package probe\n\ntype Kind int\n\nconst KindFirst Kind = 0\n");
    assert.match((await generate("-trimprefix=Kind")).stdout, /Generated stringer output\./);
    assert.match((await generate("-trimprefix=Kind")).stdout, /Stringer output is up to date\./);
});

test("moq generation tracks interface inputs, output, and force", async context => {
    const root = path.resolve(import.meta.dirname, "../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_moq-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const source = path.join(directory, "client.go");
    const base = path.join(directory, "base.go");
    fs.mkdirSync(path.join(directory, "mock"));
    const output = path.join(directory, "mock/mock_generated.go");
    fs.writeFileSync(base, "package probe\n\ntype Base interface { Read() string }\n");
    fs.writeFileSync(source, "package probe\n\ntype Client interface { Base }\n");
    const command = [path.join(root, "tools/scripts/generateMoq.mts"), "--input=client.go", "--input=base.go", "-stub", "-fmt=goimports", "-pkg=mock", "-out=mock/mock_generated.go"];
    const generate = (...args: string[]) =>
        x(process.execPath, [...command, ...args, ".", "Client"], {
            throwOnError: true,
            nodeOptions: { cwd: directory },
        });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    assert.match((await generate()).stdout, /Moq output is up to date\./);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(base, "package probe\n\ntype Base interface { Read() string; Close() error }\n");
    assert.match((await generate()).stdout, /Generated moq output\./);
    assert.match(fs.readFileSync(output, "utf8"), /CloseFunc/);
    fs.rmSync(output);
    assert.match((await generate()).stdout, /Generated moq output\./);
    assert.match((await generate("--force")).stdout, /Generated moq output\./);
    assert.match((await generate()).stdout, /Moq output is up to date\./);
    const forced = await x(process.execPath, [...command, ".", "Client"], {
        throwOnError: true,
        nodeOptions: { cwd: directory, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(forced.stdout, /Generated moq output\./);
    assert.match((await generate()).stdout, /Moq output is up to date\./);
});

test("diagnostic generation tracks Go and locale outputs and supports force", async context => {
    const root = path.resolve(import.meta.dirname, "../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_diagnostics-probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const generate = (...args: string[]) =>
        x(process.execPath, [path.join(root, "tools/scripts/generateDiagnostics.mts"), "--outDir", directory, ...args], {
            throwOnError: true,
            nodeOptions: { cwd: root },
        });
    await generate();
    const output = path.join(directory, "diagnostics_generated.go");
    const localized = path.join(directory, "loc_generated.go");
    const locales = fs.globSync("loc/*.json.gz", { cwd: directory }).map(file => path.join(directory, file));
    assert.ok(locales.length > 0);
    const files = [output, localized, ...locales];
    const timestamps = files.map(file => fs.statSync(file).mtimeMs);
    assert.match((await generate()).stdout, /Diagnostics are up to date\./);
    assert.deepEqual(files.map(file => fs.statSync(file).mtimeMs), timestamps);
    const archive = fs.readFileSync(locales[0]);
    fs.rmSync(locales[0]);
    assert.match((await generate()).stdout, /Generated diagnostics\./);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    fs.writeFileSync(locales[0], "modified");
    assert.match((await generate()).stdout, /Generated diagnostics\./);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    const unexpected = path.join(directory, "loc/unexpected.json.gz");
    fs.writeFileSync(unexpected, "unexpected");
    assert.match((await generate()).stdout, /Generated diagnostics\./);
    assert.equal(fs.existsSync(unexpected), false);
    fs.rmSync(path.join(directory, "loc"), { recursive: true });
    assert.match((await generate()).stdout, /Generated diagnostics\./);
    assert.deepEqual(fs.readFileSync(locales[0]), archive);
    fs.rmSync(localized);
    assert.match((await generate()).stdout, /Generated diagnostics\./);
    assert.match((await generate("--force")).stdout, /Generated diagnostics\./);
    assert.match((await generate()).stdout, /Diagnostics are up to date\./);
    const forced = await x(process.execPath, [path.join(root, "tools/scripts/generateDiagnostics.mts"), "--outDir", directory], {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(forced.stdout, /Generated diagnostics\./);
    assert.match((await generate()).stdout, /Diagnostics are up to date\./);
});

test("Unicode generation skips unchanged tables and formatting", async () => {
    const root = path.resolve(import.meta.dirname, "../..");
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
    const root = path.resolve(import.meta.dirname, "../..");
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
    const cacheFile = path.join(os.tmpdir(), "typescript-codegen", createHash("sha256").update(files[0]).digest("hex") + ".json");
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
    const root = path.resolve(import.meta.dirname, "../..");
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
    const cacheFile = path.join(os.tmpdir(), "typescript-codegen", createHash("sha256").update(verifier).digest("hex") + ".json");
    fs.rmSync(cacheFile);
    const regenerated = await generate();
    assert.match(regenerated.stdout, /All generated values match Go\./);
    assert.match((await generate()).stdout, /Enums are up to date\./);
});

test("AST generation forwards force to all schema generators", async () => {
    const root = path.resolve(import.meta.dirname, "../..");
    const generate = (force = false) => x("npx", ["hereby", "generate:ast", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const forced = await generate(true);
    assert.match(forced.stdout, /Wrote .*encoder_generated\.go/);
    assert.match(forced.stdout, /Wrote .*ast_generated\.go/);
    assert.match(forced.stdout, /Generated .*ast\.generated\.ts/);
    assert.doesNotMatch(forced.stdout, /\$ node .*tools\/scripts\/tsc\/generate\.ts/);
    assert.doesNotMatch((await generate()).stdout, /(?:Wrote|Generated) /);
});

test("package generation forwards force to AST, encoder, and sync generators", async () => {
    const root = path.resolve(import.meta.dirname, "../..");
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
    const root = path.resolve(import.meta.dirname, "../..");
    const output = path.join(root, "packages/typescript/src/api/proto.generated.ts");
    const generate = (force = false) => x("npx", ["hereby", "generate:api", ...(force ? ["--force"] : [])], { throwOnError: true, nodeOptions: { cwd: root } });
    await generate();
    const timestamp = fs.statSync(output).mtimeMs;
    const current = await generate();
    assert.match(current.stdout, /API protocol is up to date\./);
    assert.doesNotMatch(current.stdout, /\$ node .*generateAPI\.mts/);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    const unrelated = path.join(root, "tsc/internal/parser/codegen_cache_probe.go");
    assert.equal(fs.existsSync(unrelated), false);
    context.after(() => fs.rmSync(unrelated, { force: true }));
    fs.writeFileSync(unrelated, "package parser\n");
    assert.match((await generate()).stdout, /API protocol is up to date\./);
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
    assert.match((await generate()).stdout, /Generated API protocol\./);
    assert.match(fs.readFileSync(output, "utf8"), /"codegen-cache-probe"/);
    fs.rmSync(schema);
    assert.match((await generate()).stdout, /Generated API protocol\./);
    assert.equal(fs.readFileSync(output, "utf8"), original);
    assert.match((await generate(true)).stdout, /Generated API protocol\./);
    assert.match((await generate()).stdout, /API protocol is up to date\./);
    const direct = await x("node", ["./tools/scripts/generateAPI.mts"], { throwOnError: true, nodeOptions: { cwd: root } });
    assert.match(direct.stdout, /API protocol is up to date\./);
    const nested = await x("go", ["-C", "./tsc", "generate", "./internal/api"], {
        throwOnError: true,
        nodeOptions: { cwd: root, env: { ...process.env, TSGO_HEREBY_FORCE: "1" } },
    });
    assert.match(nested.stdout, /Generated API protocol\./);
    assert.match((await generate()).stdout, /API protocol is up to date\./);
});

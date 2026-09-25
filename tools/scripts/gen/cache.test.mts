import assert from "node:assert/strict";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import cache, { type CacheHost } from "./cache.mts";
import { GeneratedFile } from "./generatedFile.mts";
import { enableFileFingerprintCache } from "./utils.mts";

test("command cache snapshots and generated files share invocation fingerprints", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-fingerprint-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const input = path.join(directory, "input.txt");
    fs.writeFileSync(input, "input");
    const host: CacheHost = {
        async run() {
            fs.writeFileSync(path.join(directory, "output.txt"), "generated");
        },
    };
    const options = {
        cwd: directory,
        inputs: ["input.txt"],
        outputs: ["output.txt"],
        commands: [["generate"]],
    };
    assert.equal(await cache(options, host), false);
    context.after(enableFileFingerprintCache());
    const reads = context.mock.method(fs, "readFileSync");
    syncBuiltinESMExports();
    context.after(() => {
        reads.mock.restore();
        syncBuiltinESMExports();
    });
    assert.equal(await cache(options, host), true);
    assert.equal(await cache(options, host), true);
    new GeneratedFile(path.join(directory, "other.txt"), [input]);
    assert.equal(reads.mock.calls.filter(call => call.arguments[0] === input).length, 1);
});

test("cache commands use and track an explicit environment without changing the parent", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-env-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const parentValue = process.env.GOFILE;
    let calls = 0;
    const host: CacheHost = {
        async run(command, args, { cwd, env }) {
            calls++;
            assert.equal(command, "generate");
            assert.deepEqual(args, []);
            fs.writeFileSync(path.join(cwd, "output.json"), JSON.stringify({ file: env.GOFILE, pkg: env.GOPACKAGE, cwd }));
        },
    };
    const options = {
        cwd: directory,
        inputs: [],
        outputs: ["output.json"],
        envInputs: ["GOFILE", "GOPACKAGE"],
        env: { GOFILE: "source.go", GOPACKAGE: "example" },
        commands: [["generate"]],
    };
    assert.equal(await cache(options, host), false);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory, "output.json"), "utf8")), {
        file: "source.go",
        pkg: "example",
        cwd: directory,
    });
    assert.equal(await cache(options, host), true);
    assert.equal(calls, 1);
    assert.equal(await cache({ ...options, env: { ...options.env, GOFILE: "other.go" } }, host), false);
    assert.equal(calls, 2);
    assert.equal(process.env.GOFILE, parentValue);
});

test("cache commands preserve the working directory and arguments", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    fs.writeFileSync(path.join(directory, "input.txt"), "input");
    const calls: string[] = [];
    const host: CacheHost = {
        async run(command, args, { cwd }) {
            calls.push(command);
            assert.equal(cwd, directory);
            if (command === "generate") {
                assert.deepEqual(args, ["--help", "--force", "space value"]);
                fs.writeFileSync(path.join(cwd, "output.txt"), fs.readFileSync(path.join(cwd, "input.txt")) + JSON.stringify(args));
            }
            else {
                assert.deepEqual(args, []);
                if (command === "fail") throw new Error("Command failed");
                fs.appendFileSync(path.join(cwd, "output.txt"), " finished");
            }
        },
    };
    const generate = (force = false, failure = false) =>
        cache({
            cwd: directory,
            inputs: ["input.txt"],
            outputs: ["output.txt"],
            commands: [
                ["generate", "--help", "--force", "space value"],
                [failure ? "fail" : "finish"],
                ["last"],
            ],
            force,
        }, host);
    const output = path.join(directory, "output.txt");
    assert.equal(await generate(), false);
    assert.equal(fs.readFileSync(output, "utf8"), 'input["--help","--force","space value"] finished finished');
    assert.deepEqual(calls, ["generate", "finish", "last"]);
    calls.length = 0;
    assert.equal(await generate(), true);
    assert.deepEqual(calls, []);
    assert.equal(await generate(true), false);
    assert.deepEqual(calls, ["generate", "finish", "last"]);
    calls.length = 0;
    await assert.rejects(generate(false, true), /Command failed/);
    assert.deepEqual(calls, ["generate", "fail"]);
    assert.equal(await generate(), false);
    assert.equal(await generate(), true);
});

test("cache commands track inputs, outputs, arguments, and failures", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    const input = path.join(directory, "input.txt");
    const output = path.join(directory, "output.txt");
    fs.writeFileSync(input, "first");
    const host: CacheHost = {
        async run(command, args, { cwd }) {
            if (command === "generate") fs.writeFileSync(output, fs.readFileSync(input));
            else if (command === "fail") throw new Error("Command failed");
            else {
                fs.appendFileSync(output, args[0]);
                fs.writeFileSync(path.join(cwd, "extra.txt"), "extra");
            }
        },
    };
    const generate = (suffix = " done", force = false, failure = false, env: NodeJS.ProcessEnv = {}) =>
        cache({
            cwd: directory,
            inputs: ["input*.txt"],
            exclude: ["input-ignored.txt"],
            outputs: ["output.txt", "extra*.txt"],
            envInputs: ["TSGO_CACHE_PROBE"],
            env,
            commands: [
                ["generate"],
                [failure ? "fail" : "finish", suffix],
            ],
            force,
        }, host);
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), "first done");
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal(await generate(), true);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(path.join(directory, "input-ignored.txt"), "ignored");
    fs.writeFileSync(path.join(directory, "unrelated.txt"), "unrelated");
    assert.equal(await generate(), true);
    fs.writeFileSync(input, "second");
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), "second done");
    const addedInput = path.join(directory, "input-added.txt");
    fs.writeFileSync(addedInput, "added");
    assert.equal(await generate(), false);
    fs.rmSync(addedInput);
    assert.equal(await generate(), false);
    fs.rmSync(path.join(directory, "extra.txt"));
    assert.equal(await generate(), false);
    fs.writeFileSync(path.join(directory, "extra-added.txt"), "extra");
    assert.equal(await generate(), false);
    fs.writeFileSync(output, "edited");
    assert.equal(await generate(), false);
    assert.equal(await generate(" changed"), false);
    assert.equal(fs.readFileSync(output, "utf8"), "second changed");
    assert.equal(await generate(" changed"), true);
    assert.equal(await generate(" changed", true), false);
    await assert.rejects(generate(" changed", true, true));
    assert.equal(await generate(" changed"), false);
    assert.equal(await generate(" changed"), true);
    const environment = { TSGO_CACHE_PROBE: "changed" };
    assert.equal(await generate(" changed", false, false, environment), false);
    assert.equal(await generate(" changed", false, false, environment), true);
    assert.equal(await generate("--force"), false);
    assert.equal(fs.readFileSync(output, "utf8"), "second--force");
    assert.equal(await generate("--force"), true);
});

test("failed commands invalidate metadata even when outputs are unchanged", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    let fail = false;
    let calls = 0;
    const host: CacheHost = {
        async run() {
            calls++;
            fs.writeFileSync(path.join(directory, "output.txt"), "generated");
            if (fail) throw new Error("Command failed");
        },
    };
    const options = { cwd: directory, inputs: [], outputs: ["output.txt"], commands: [["generate"]] };
    assert.equal(await cache(options, host), false);
    fail = true;
    await assert.rejects(cache({ ...options, force: true }, host), /Command failed/);
    fail = false;
    assert.equal(await cache(options, host), false);
    assert.equal(await cache(options, host), true);
    assert.equal(calls, 3);
});

test("cache commands reject missing inputs, outputs, and empty commands", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    let calls = 0;
    const host: CacheHost = {
        async run() {
            calls++;
            fs.writeFileSync(path.join(directory, "output.txt"), "generated");
        },
    };
    const options = {
        cwd: directory,
        inputs: ["input.txt"],
        outputs: ["output.txt"],
        commands: [["generate"]],
    };
    await assert.rejects(cache(options, host), /No inputs matched/);
    assert.equal(fs.existsSync(path.join(directory, "output.txt")), false);
    fs.writeFileSync(path.join(directory, "input.txt"), "input");
    await assert.rejects(cache({ ...options, inputs: ["missing*.txt"] }, host), /No inputs matched/);
    await assert.rejects(cache({ ...options, commands: [] }, host), /nonempty commands/);
    await assert.rejects(cache({ ...options, commands: [[]] }, host), /nonempty commands/);
    await assert.rejects(cache({ ...options, outputs: [] }, host), /requires outputs/);
    assert.equal(calls, 0);
    await assert.rejects(cache({ ...options, outputs: ["output.txt", "missing.txt"] }, host), /did not produce all declared outputs/);
    assert.equal(calls, 1);
    assert.equal(await cache(options, host), false);
    assert.equal(await cache(options, host), true);
});

test("cache commands do not cache inputs changed during execution", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    for (const changedFile of ["input.txt", "input-added.txt"]) {
        fs.writeFileSync(path.join(directory, "input.txt"), "initial");
        const host: CacheHost = {
            async run() {
                fs.writeFileSync(path.join(directory, "output.txt"), "generated");
                fs.writeFileSync(path.join(directory, changedFile), "changed");
            },
        };
        const options = {
            cwd: directory,
            inputs: ["input*.txt"],
            outputs: ["output.txt"],
            commands: [["generate"]],
        };
        assert.equal(await cache(options, host), false);
        assert.equal(await cache(options, host), false);
        assert.equal(await cache(options, host), true);
    }
});

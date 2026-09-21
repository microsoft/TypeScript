import assert from "node:assert/strict";
import * as fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import cache from "./cache.mts";

test("cache commands use and track an explicit environment without changing the parent", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-env-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const parentValue = process.env.GOFILE;
    const options = {
        cwd: directory,
        inputs: [],
        outputs: ["output.json"],
        envInputs: ["GOFILE", "GOPACKAGE"],
        env: { GOFILE: "source.go", GOPACKAGE: "example" },
        commands: [[process.execPath, "-e", "require('node:fs').writeFileSync('output.json', JSON.stringify({ file: process.env.GOFILE, pkg: process.env.GOPACKAGE, cwd: process.cwd() }))"]],
    };
    assert.equal(await cache(options), false);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory, "output.json"), "utf8")), {
        file: "source.go",
        pkg: "example",
        cwd: directory,
    });
    assert.equal(await cache(options), true);
    assert.equal(await cache({ ...options, env: { ...options.env, GOFILE: "other.go" } }), false);
    assert.equal(process.env.GOFILE, parentValue);
});

test("cache commands preserve the working directory and arguments", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_cache probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    fs.writeFileSync(path.join(directory, "input.txt"), "input");
    fs.writeFileSync(path.join(directory, "generate.cjs"), "const fs = require('node:fs'); fs.writeFileSync('output.txt', fs.readFileSync('input.txt') + JSON.stringify(process.argv.slice(2)));\n");
    fs.writeFileSync(path.join(directory, "finish.cjs"), "require('node:fs').appendFileSync('output.txt', ' finished');\n");
    const generate = (force = false, failure = false) =>
        cache({
            cwd: directory,
            inputs: ["input.txt", "*.cjs"],
            outputs: ["output.txt"],
            commands: [
                [process.execPath, "generate.cjs", "--help", "--force", "space value"],
                [process.execPath, failure ? "missing.cjs" : "finish.cjs"],
            ],
            force,
        });
    const output = path.join(directory, "output.txt");
    assert.equal(await generate(), false);
    assert.equal(fs.readFileSync(output, "utf8"), 'input["--help","--force","space value"] finished');
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal(await generate(), true);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    assert.equal(await generate(true), false);
    await assert.rejects(generate(false, true));
    assert.equal(await generate(), false);
    assert.equal(await generate(), true);
});

test("cache commands track inputs, outputs, arguments, and failures", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    const input = path.join(directory, "input.txt");
    const output = path.join(directory, "output.txt");
    fs.writeFileSync(input, "first");
    fs.writeFileSync(path.join(directory, "generate.cjs"), "const fs = require('node:fs'); fs.writeFileSync('output.txt', fs.readFileSync('input.txt'));\n");
    fs.writeFileSync(path.join(directory, "finish.cjs"), "const fs = require('node:fs'); fs.appendFileSync('output.txt', process.argv[2]); fs.writeFileSync('extra.txt', 'extra');\n");
    const generate = (suffix = " done", force = false, failure = false, env: NodeJS.ProcessEnv = {}) =>
        cache({
            cwd: directory,
            inputs: ["input*.txt", "*.cjs"],
            outputs: ["output.txt", "extra*.txt"],
            envInputs: ["TSGO_CACHE_PROBE"],
            env,
            commands: [
                [process.execPath, "generate.cjs"],
                [process.execPath, failure ? "missing.cjs" : "finish.cjs", suffix],
            ],
            force,
        });
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), "first done");
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal(await generate(), true);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
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

test("cache commands reject missing inputs, outputs, and empty commands", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const options = {
        cwd: directory,
        inputs: ["input.txt"],
        outputs: ["output.txt"],
        commands: [[process.execPath, "-e", "require('node:fs').writeFileSync('output.txt', 'generated')"]],
    };
    await assert.rejects(cache(options), /No inputs matched/);
    assert.equal(fs.existsSync(path.join(directory, "output.txt")), false);
    fs.writeFileSync(path.join(directory, "input.txt"), "input");
    await assert.rejects(cache({ ...options, inputs: ["missing*.txt"] }), /No inputs matched/);
    await assert.rejects(cache({ ...options, commands: [] }), /nonempty commands/);
    await assert.rejects(cache({ ...options, commands: [[]] }), /nonempty commands/);
    await assert.rejects(cache({ ...options, outputs: [] }), /requires outputs/);
    await assert.rejects(cache({ ...options, outputs: ["output.txt", "missing.txt"] }), /did not produce all declared outputs/);
    assert.equal(await cache(options), false);
    assert.equal(await cache(options), true);
});

test("cache commands do not cache inputs changed during execution", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    for (const change of ["fs.writeFileSync('input.txt', 'changed')", "fs.writeFileSync('input-added.txt', 'added')"]) {
        fs.writeFileSync(path.join(directory, "input.txt"), "initial");
        const options = {
            cwd: directory,
            inputs: ["input*.txt"],
            outputs: ["output.txt"],
            commands: [[process.execPath, "-e", `const fs = require('node:fs'); fs.writeFileSync('output.txt', 'generated'); ${change};`]],
        };
        assert.equal(await cache(options), false);
        assert.equal(await cache(options), false);
        assert.equal(await cache(options), true);
    }
});

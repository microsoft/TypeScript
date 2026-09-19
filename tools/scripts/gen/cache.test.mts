import assert from "node:assert/strict";
import * as fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { x } from "tinyexec";
import cache from "./cache.mts";

test("npm cache preserves the caller directory and command arguments without task logging", async context => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const directory = fs.mkdtempSync(path.join(root, "tsc/internal/_cache probe-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    fs.writeFileSync(path.join(directory, "input.txt"), "input");
    fs.writeFileSync(path.join(directory, "generate.cjs"), "const fs = require('node:fs'); fs.writeFileSync('output.txt', fs.readFileSync('input.txt') + JSON.stringify(process.argv.slice(2)));\n");
    fs.writeFileSync(path.join(directory, "finish.cjs"), "require('node:fs').appendFileSync('output.txt', ' finished');\n");
    const generate = (flags: string[] = [], env = process.env, failure = false) =>
        x("npm", [
            "run",
            "--silent",
            "cache",
            "--",
            "--input",
            "input.txt",
            "--input",
            "*.cjs",
            "--output",
            "output.txt",
            ...flags,
            "--command",
            process.execPath,
            "generate.cjs",
            "--help",
            "--force",
            "space value",
            "--command",
            process.execPath,
            failure ? "missing.cjs" : "finish.cjs",
        ], { throwOnError: true, nodeOptions: { cwd: directory, env: { ...env, INIT_CWD: root } } });
    const output = path.join(directory, "output.txt");
    assert.equal((await generate()).stdout.trim(), "Generated codegen outputs.");
    assert.equal(fs.readFileSync(output, "utf8"), 'input["--help","--force","space value"] finished');
    const timestamp = fs.statSync(output).mtimeMs;
    assert.equal((await generate()).stdout.trim(), "Codegen outputs are up to date.");
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    assert.doesNotMatch((await generate(["--force"])).stdout, /up to date/);
    const forced = { ...process.env, TSGO_HEREBY_FORCE: "1" };
    assert.match((await generate(["--no-force"], forced)).stdout, /up to date/);
    assert.doesNotMatch((await generate([], forced)).stdout, /up to date/);
    await assert.rejects(async () => await generate([], process.env, true));
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    assert.match((await generate()).stdout, /up to date/);
});

test("cache commands track inputs, outputs, arguments, and failures", async context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tsgo-cache-"));
    context.after(() => fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 }));
    const input = path.join(directory, "input.txt");
    const output = path.join(directory, "output.txt");
    fs.writeFileSync(input, "first");
    fs.writeFileSync(path.join(directory, "generate.cjs"), "const fs = require('node:fs'); fs.writeFileSync('output.txt', fs.readFileSync('input.txt'));\n");
    fs.writeFileSync(path.join(directory, "finish.cjs"), "const fs = require('node:fs'); fs.appendFileSync('output.txt', process.argv[2]); fs.writeFileSync('extra.txt', 'extra');\n");
    const generate = (suffix = " done", flags: string[] = [], failure = false, env = process.env) =>
        x(process.execPath, [
            path.join(import.meta.dirname, "cache.mts"),
            "--env",
            "TSGO_CACHE_PROBE",
            "--input",
            "input*.txt",
            "--input",
            "*.cjs",
            "--output",
            "output.txt",
            "--output",
            "extra*.txt",
            ...flags,
            "--command",
            process.execPath,
            "generate.cjs",
            "--command",
            process.execPath,
            failure ? "missing.cjs" : "finish.cjs",
            suffix,
        ], { throwOnError: true, nodeOptions: { cwd: directory, env } });
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), "first done");
    const timestamp = fs.statSync(output).mtimeMs;
    assert.match((await generate()).stdout, /up to date/);
    assert.equal(fs.statSync(output).mtimeMs, timestamp);
    fs.writeFileSync(input, "second");
    await generate();
    assert.equal(fs.readFileSync(output, "utf8"), "second done");
    const addedInput = path.join(directory, "input-added.txt");
    fs.writeFileSync(addedInput, "added");
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    fs.rmSync(addedInput);
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    fs.rmSync(path.join(directory, "extra.txt"));
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    fs.writeFileSync(path.join(directory, "extra-added.txt"), "extra");
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    fs.writeFileSync(output, "edited");
    assert.doesNotMatch((await generate()).stdout, /up to date/);
    assert.doesNotMatch((await generate(" changed")).stdout, /up to date/);
    assert.equal(fs.readFileSync(output, "utf8"), "second changed");
    assert.match((await generate(" changed")).stdout, /up to date/);
    assert.doesNotMatch((await generate(" changed", ["--force"])).stdout, /up to date/);
    await assert.rejects(async () => await generate(" changed", ["--force"], true));
    assert.doesNotMatch((await generate(" changed")).stdout, /up to date/);
    assert.match((await generate(" changed")).stdout, /up to date/);
    const forced = { ...process.env, TSGO_HEREBY_FORCE: "1" };
    assert.match((await generate(" changed", ["--no-force"], false, forced)).stdout, /up to date/);
    assert.doesNotMatch((await generate(" changed", [], false, forced)).stdout, /up to date/);
    assert.match((await generate(" changed")).stdout, /up to date/);
    const environment = { ...process.env, TSGO_CACHE_PROBE: "changed" };
    assert.doesNotMatch((await generate(" changed", [], false, environment)).stdout, /up to date/);
    assert.match((await generate(" changed", [], false, environment)).stdout, /up to date/);
    assert.doesNotMatch((await generate("--force")).stdout, /up to date/);
    assert.equal(fs.readFileSync(output, "utf8"), "second--force");
    assert.match((await generate("--force")).stdout, /up to date/);
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

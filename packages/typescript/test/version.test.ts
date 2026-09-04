import getExePath from "#getExePath";
import { versionMajorMinor } from "@typescript/typescript";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
    cp,
    mkdir,
    mkdtemp,
    rm,
    symlink,
    writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

test("versionMajorMinor runtime and declaration match the compiler version", () => {
    const compilerVersion = execFileSync(getExePath(), ["--version"], { encoding: "utf8" })
        .trim()
        .replace(/^Version /, "");
    const majorMinor = compilerVersion.split(".", 2).join(".");
    const declaration = readFileSync(new URL("../lib/version.d.cts", import.meta.url), "utf8");
    const declarationMatch = declaration.match(/versionMajorMinor = "([^"]+)"/);

    assert.strictEqual(versionMajorMinor, majorMinor);
    assert.ok(declarationMatch, "versionMajorMinor declaration not found");
    assert.strictEqual(declarationMatch[1], majorMinor);
});

test("the CLI falls back to the WASI package", {
    skip: Number(process.versions.node.split(".")[0]) < 23 ? "Node.js 23 or newer is required" : undefined,
}, async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "typescript-wasi-fallback-"));
    try {
        const packageDirectory = path.join(directory, "node_modules", "typescript");
        const libraryDirectory = path.join(packageDirectory, "lib");
        await mkdir(libraryDirectory, { recursive: true });
        await Promise.all([
            cp(new URL("../lib/tsc.js", import.meta.url), path.join(libraryDirectory, "tsc.js")),
            cp(new URL("../lib/getExePath.js", import.meta.url), path.join(libraryDirectory, "getExePath.js")),
            writeFile(
                path.join(packageDirectory, "package.json"),
                JSON.stringify({
                    name: "typescript",
                    type: "module",
                    imports: { "#getExePath": "./lib/getExePath.js" },
                }),
            ),
        ]);

        const scopeDirectory = path.join(directory, "node_modules", "@typescript");
        await mkdir(scopeDirectory, { recursive: true });
        await symlink(
            new URL("../../typescript-wasip1-wasm", import.meta.url),
            path.join(scopeDirectory, "typescript-wasip1-wasm"),
            process.platform === "win32" ? "junction" : "dir",
        );

        const output = execFileSync(process.execPath, [path.join(libraryDirectory, "tsc.js"), "--version"], {
            cwd: directory,
            encoding: "utf8",
        });
        assert.match(output, /^Version \d+\.\d+\.\d+/);
    }
    finally {
        await rm(directory, { recursive: true });
    }
});

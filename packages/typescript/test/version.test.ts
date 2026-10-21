import { versionMajorMinor } from "@typescript/typescript";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs, { readFileSync } from "node:fs";
import module from "node:module";
import path from "node:path";
import { test } from "node:test";
import url from "node:url";
import getExePath from "../lib/getExePath.js";

test("versionMajorMinor runtime and declaration match the compiler version", () => {
    const compilerVersion = execFileSync(getExePath({ fs, module, path, url }), ["--version"], { encoding: "utf8" })
        .trim()
        .replace(/^Version /, "");
    const majorMinor = compilerVersion.split(".", 2).join(".");
    const declaration = readFileSync(new URL("../lib/version.d.cts", import.meta.url), "utf8");
    const declarationMatch = declaration.match(/versionMajorMinor = "([^"]+)"/);

    assert.strictEqual(versionMajorMinor, majorMinor);
    assert.ok(declarationMatch, "versionMajorMinor declaration not found");
    assert.strictEqual(declarationMatch[1], majorMinor);
});

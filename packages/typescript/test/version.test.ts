import getExePath from "#getExePath";
import { versionMajorMinor } from "@typescript/typescript";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
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

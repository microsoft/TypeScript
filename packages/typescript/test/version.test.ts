import getExePath from "#getExePath";
import { versionMajorMinor } from "@typescript/typescript";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { test } from "node:test";

test("versionMajorMinor matches the compiler version", () => {
    const compilerVersion = execFileSync(getExePath(), ["--version"], { encoding: "utf8" })
        .trim()
        .replace(/^Version /, "");
    const majorMinor = compilerVersion.split(".", 2).join(".");

    assert.strictEqual(versionMajorMinor, majorMinor);
});

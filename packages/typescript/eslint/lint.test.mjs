import { API } from "@typescript/native/sync";
import { ESLint } from "eslint";
import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import getExePath from "../lib/getExePath.js";

test("lint uses the local native API for typed custom rules", async () => {
    const root = path.resolve(import.meta.dirname, "../../..");
    const executable = getExePath({
        fs: process.getBuiltinModule("node:fs"),
        module: process.getBuiltinModule("node:module"),
        path: process.getBuiltinModule("node:path"),
        url: process.getBuiltinModule("node:url"),
    });
    assert.equal(executable, path.join(root, "built/local", process.platform === "win32" ? "tsc.exe" : "tsc"));

    const descriptor = Object.getOwnPropertyDescriptor(API.prototype, "createSnapshot");
    assert.ok(descriptor?.get);
    let snapshots = 0;
    Object.defineProperty(API.prototype, "createSnapshot", {
        ...descriptor,
        get() {
            snapshots++;
            return descriptor.get.call(this);
        },
    });
    try {
        const eslint = new ESLint({ cwd: root });
        const filePath = "packages/typescript/src/internal/lint-probe.ts";
        const [result] = await eslint.lintText(
            "function check(flag: boolean) { return flag; }\ncheck(true);\nconst xs: number[] = [1];\nconst ys = xs.sort();\n",
            { filePath },
        );
        assert.ok(snapshots > 0, "lint must create a native snapshot");
        const argument = result.messages.find(message => message.ruleId === "local/argument-trivia");
        assert.equal(argument?.fix?.text, "/*flag*/ ");
        assert.ok(result.messages.some(message => message.ruleId === "local/no-array-mutating-method-expressions"));

        const [imports] = await eslint.lintText(
            'import "./missing";\nimport "./present.ts";\nimport "./present.js";\nimport "./present.json";\n',
            { filePath },
        );
        assert.equal(imports.messages.filter(message => message.ruleId === "local/js-extensions").length, 1);
    }
    finally {
        Object.defineProperty(API.prototype, "createSnapshot", descriptor);
    }
});

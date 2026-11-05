import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { test } from "node:test";

test("tsc passes the environment explicitly to execve", { skip: process.platform === "win32" }, () => {
    const stdout = execFileSync(process.execPath, [
        "--input-type=module",
        "--eval",
        `
            process.execve = (exe, args, env) => {
                process.stdout.write(String(env === process.env));
                process.exit(0);
            };
            await import(${JSON.stringify(new URL("../lib/tsc.js", import.meta.url).href)});
        `,
    ], { encoding: "utf8" });
    assert.strictEqual(stdout, "true");
});

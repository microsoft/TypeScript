import assert from "node:assert";
import { spawn } from "node:child_process";
import { test } from "node:test";

test("close shuts down the API process cleanly", async () => {
    const script = `
        import { API } from "@typescript/typescript/unstable/sync";
        const api = new API({ cwd: process.cwd() });
        api.parseCommandLine([]);
        api.close();
    `;

    const results = await Promise.all(Array.from({ length: 20 }, () => runNode(script)));
    for (const result of results) {
        assert.equal(result.status, 0);
        assert.equal(result.stderr, "");
    }
});

function runNode(script: string): Promise<{ status: number | null; stderr: string; }> {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [
            "--conditions",
            "@typescript/source",
            "--experimental-strip-types",
            "--input-type=module",
            "--eval",
            script,
        ]);
        let stderr = "";
        child.stderr.setEncoding("utf8");
        child.stderr.on("data", chunk => stderr += chunk);
        child.on("error", reject);
        child.on("close", status => resolve({ status, stderr }));
    });
}

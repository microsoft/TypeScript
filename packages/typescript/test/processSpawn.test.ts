import { API as AsyncAPI } from "@typescript/typescript/async";
import { API as SyncAPI } from "@typescript/typescript/sync";
import assert from "node:assert/strict";
import childProcess from "node:child_process";
import { test } from "node:test";

for (const [mode, API] of [["async", AsyncAPI], ["sync", SyncAPI]] as const) {
    test(`${mode}: API subprocess hides its console window`, async t => {
        const spawn = t.mock.method(childProcess, "spawn");
        const api = new API();
        try {
            await api.parseCommandLine([]);
        }
        finally {
            await api.close();
        }

        assert.equal(spawn.mock.callCount(), 1);
        assert.equal(spawn.mock.calls[0]!.arguments[2]?.windowsHide, true);
    });
}

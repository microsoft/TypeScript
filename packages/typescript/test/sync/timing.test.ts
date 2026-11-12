import { API } from "@typescript/typescript/sync";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { createVirtualFileSystem } from "../testUtils.ts";

describe("sync IPC timing", () => {
    test("records the outer request size after a nested request", () => {
        const fs = createVirtualFileSystem({ "/tsconfig.json": "{}", "/a.ts": "" });
        const nestedArgument = "x".repeat(10_000);
        let nested = false;
        let api: API | undefined;
        using instance = new API({
            cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
            collectTiming: true,
            fs: {
                ...fs,
                readFile: path => {
                    if (!nested) {
                        nested = true;
                        if (!api) throw new Error("API is not initialized");
                        api.parseCommandLine([nestedArgument]);
                    }
                    return fs.readFile!(path);
                },
            },
        });
        api = instance;

        instance.createSnapshot({ openProjects: ["/tsconfig.json"] });

        assert.ok(nested);
        const { recentRequests } = instance.getTimingInfo();
        const nestedIndex = recentRequests.findIndex(request => request.method === "parseCommandLine");
        assert.ok(nestedIndex >= 0);
        assert.ok(recentRequests[nestedIndex].bytesSent > nestedArgument.length);
        const outer = recentRequests[nestedIndex + 1];
        assert.equal(outer.method, "createSnapshot");
        assert.ok(outer.bytesSent < nestedArgument.length, `${outer.method} recorded ${outer.bytesSent} bytes sent`);
    });
});

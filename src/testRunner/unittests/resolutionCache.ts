import * as ts from "../_namespaces/ts.js";

describe("unittests:: resolution cache ", () => {
    it("perceivedOsRootLengthForWatching", () => {
        const toPathComp = (path: string) => ts.getPathComponents(ts.toPath(path, undefined, (f: string) => f));
        const osRootBase = (path: string) => {
            let pathComp = toPathComp(path);
            let idx = ts.perceivedOsRootLengthForWatching(pathComp, pathComp.length);
            return pathComp[idx];
        };
        assert.strictEqual(osRootBase("/Users/username"), undefined);
        assert.strictEqual(osRootBase("/Users/username/Library"), undefined);
        assert.strictEqual(osRootBase("/Users/username/Library/Caches"), undefined);
        assert.strictEqual(osRootBase("/Users/username/Library/Caches/typescript/5.5/package.json"), "typescript");
    });
});

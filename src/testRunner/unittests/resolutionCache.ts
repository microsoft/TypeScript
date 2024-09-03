import * as ts from "../_namespaces/ts.js";

describe("unittests:: resolution cache ", () => {
    it("perceivedOsRootLengthForWatching", () => {
        const osRootBase = (path: string) => {
            const pathComp = ts.getPathComponents(ts.toPath(path, /*basePath*/ undefined, (f: string) => f));
            const idx = ts.perceivedOsRootLengthForWatching(pathComp, pathComp.length);
            return pathComp[idx];
        };
        assert.isUndefined(osRootBase("/Users/username"));
        assert.isUndefined(osRootBase("/Users/username/Library"));
        assert.isUndefined(osRootBase("/Users/username/Library/Caches"));
        assert.strictEqual(osRootBase("/Users/username/Library/Caches/typescript/5.5/package.json"), "typescript");
    });
});

import * as ts from "../_namespaces/ts";

describe("performance:: tryGetNativePerformanceHooks", () => {
    it("should not return undefined", () => {
        const hooks = ts.tryGetNativePerformanceHooks();
        assert.isDefined(hooks);
    });
});

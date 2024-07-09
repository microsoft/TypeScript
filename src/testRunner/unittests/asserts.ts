import * as ts from "../_namespaces/ts.js";

describe("unittests:: assert", () => {
    it("deepEqual", () => {
        assert.throws(() => assert.deepEqual(ts.factory.createNodeArray([ts.factory.createIdentifier("A")]), ts.factory.createNodeArray([ts.factory.createIdentifier("B")])));
        assert.throws(() => assert.deepEqual(ts.factory.createNodeArray([], /*hasTrailingComma*/ true), ts.factory.createNodeArray([], /*hasTrailingComma*/ false)));
        assert.deepEqual(ts.factory.createNodeArray([ts.factory.createIdentifier("A")], /*hasTrailingComma*/ true), ts.factory.createNodeArray([ts.factory.createIdentifier("A")], /*hasTrailingComma*/ true));
    });
    it("assertNever on string has correct error", () => {
        assert.throws(() => ts.Debug.assertNever("hi" as never), 'Debug Failure. Illegal value: "hi"');
    });
});

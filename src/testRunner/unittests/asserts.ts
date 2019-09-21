namespace ts {
    describe("unittests:: assert", () => {
        it("deepEqual", () => {
            assert.throws(() => assert.deepEqual(factory.createNodeArray([createIdentifier("A")]), factory.createNodeArray([createIdentifier("B")])));
            assert.throws(() => assert.deepEqual(factory.createNodeArray([], /*hasTrailingComma*/ true), factory.createNodeArray([], /*hasTrailingComma*/ false)));
            assert.deepEqual(factory.createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true), factory.createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true));
        });
        it("assertNever on string has correct error", () => {
            assert.throws(() => Debug.assertNever("hi" as never), "Debug Failure. Illegal value: \"hi\"");
        });
    });
}

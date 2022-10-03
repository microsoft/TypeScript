namespace ts {
    describe("unittests:: assert", () => {
        it("deepEqual", () => {
            assert.throws(() => assert.deepEqual(factory.createNodeArray([factory.createIdentifier("A")]), factory.createNodeArray([factory.createIdentifier("B")])));
            assert.throws(() => assert.deepEqual(factory.createNodeArray([], /*hasTrailingComma*/ true), factory.createNodeArray([], /*hasTrailingComma*/ false)));
            assert.deepEqual(factory.createNodeArray([factory.createIdentifier("A")], /*hasTrailingComma*/ true), factory.createNodeArray([factory.createIdentifier("A")], /*hasTrailingComma*/ true));
        });
        it("assertNever on string has correct error", () => {
            assert.throws(() => Debug.assertNever("hi" as never), "Debug Failure. Illegal value: \"hi\"");
        });
    });
}

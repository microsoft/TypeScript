namespace ts {
    describe("unittests:: assert", () => {
        it("deepEqual", () => {
            assert.throws(() => assert.deepEqual(createNodeArray([createIdentifier("A")]), createNodeArray([createIdentifier("B")])));
            assert.throws(() => assert.deepEqual(createNodeArray([], /*hasTrailingComma*/ true), createNodeArray([], /*hasTrailingComma*/ false)));
            assert.deepEqual(createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true), createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true));
        });
        it("assertNever on string has correct error", () => {
            assert.throws(() => Debug.assertNever("hi" as never), "Debug Failure. Illegal value: \"hi\"");
        });
    });
}

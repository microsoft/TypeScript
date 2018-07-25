namespace ts {
    describe("assert", () => {
        it("deepEqual", () => {
            assert.throws(() => assert.deepEqual(createNodeArray([createIdentifier("A")]), createNodeArray([createIdentifier("B")])));
            assert.throws(() => assert.deepEqual(createNodeArray([], /*hasTrailingComma*/ true), createNodeArray([], /*hasTrailingComma*/ false)));
            assert.deepEqual(createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true), createNodeArray([createIdentifier("A")], /*hasTrailingComma*/ true));
        });
    });
}

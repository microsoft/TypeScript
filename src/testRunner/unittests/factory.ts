namespace ts {
    describe("FactoryAPI", () => {
        describe("createArrowFunction", () => {
            it("parenthesizes concise body if necessary", () => {
                function checkBody(body: ConciseBody) {
                    const node = createArrowFunction(
                        /*modifiers*/ undefined,
                        /*typeParameters*/ undefined,
                        [],
                        /*type*/ undefined,
                        /*equalsGreaterThanToken*/ undefined,
                        body,
                    );
                    assert.strictEqual(node.body.kind, SyntaxKind.ParenthesizedExpression);
                }

                checkBody(createObjectLiteral());
                checkBody(createPropertyAccess(createObjectLiteral(), "prop"));
                checkBody(createAsExpression(createPropertyAccess(createObjectLiteral(), "prop"), createTypeReferenceNode("T", /*typeArguments*/ undefined)));
                checkBody(createNonNullExpression(createPropertyAccess(createObjectLiteral(), "prop")));
            });
        });
    });
}

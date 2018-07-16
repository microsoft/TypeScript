namespace ts {
    describe("FactoryAPI", () => {
        describe("createExportAssignment", () => {
            it("parenthesizes default export if necessary", () => {
                function checkExpression(expression: Expression) {
                    const node = createExportAssignment(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        expression,
                    );
                    assert.strictEqual(node.expression.kind, SyntaxKind.ParenthesizedExpression);
                }

                const clazz = createClassExpression(/*modifiers*/ undefined, "C", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                    createProperty(/*decorators*/ undefined, [createToken(SyntaxKind.StaticKeyword)], "prop", /*questionOrExclamationToken*/ undefined, /*type*/ undefined, createLiteral("1")),
                ]);
                checkExpression(clazz);
                checkExpression(createPropertyAccess(clazz, "prop"));

                const func = createFunctionExpression(/*modifiers*/ undefined, /*asteriskToken*/ undefined, "fn", /*typeParameters*/ undefined, /*parameters*/ undefined, /*type*/ undefined, createBlock([]));
                checkExpression(func);
                checkExpression(createCall(func, /*typeArguments*/ undefined, /*argumentsArray*/ undefined));
                checkExpression(createTaggedTemplate(func, createNoSubstitutionTemplateLiteral("")));

                checkExpression(createBinary(createLiteral("a"), SyntaxKind.CommaToken, createLiteral("b")));
                checkExpression(createCommaList([createLiteral("a"), createLiteral("b")]));
            });
        });

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
                checkBody(createCommaList([createLiteral("a"), createLiteral("b")]));
                checkBody(createBinary(createLiteral("a"), SyntaxKind.CommaToken, createLiteral("b")));
            });
        });
    });
}

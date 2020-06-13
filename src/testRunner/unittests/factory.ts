namespace ts {
    describe("unittests:: FactoryAPI", () => {
        function assertSyntaxKind(node: Node, expected: SyntaxKind) {
            assert.strictEqual(node.kind, expected, `Actual: ${Debug.formatSyntaxKind(node.kind)} Expected: ${Debug.formatSyntaxKind(expected)}`);
        }
        describe("createExportAssignment", () => {
            it("parenthesizes default export if necessary", () => {
                function checkExpression(expression: Expression) {
                    const node = createExportAssignment(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        expression,
                    );
                    assertSyntaxKind(node.expression, SyntaxKind.ParenthesizedExpression);
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
                    assertSyntaxKind(node.body, SyntaxKind.ParenthesizedExpression);
                }

                checkBody(createObjectLiteral());
                checkBody(createPropertyAccess(createObjectLiteral(), "prop"));
                checkBody(createAsExpression(createPropertyAccess(createObjectLiteral(), "prop"), createTypeReferenceNode("T", /*typeArguments*/ undefined)));
                checkBody(createNonNullExpression(createPropertyAccess(createObjectLiteral(), "prop")));
                checkBody(createCommaList([createLiteral("a"), createLiteral("b")]));
                checkBody(createBinary(createLiteral("a"), SyntaxKind.CommaToken, createLiteral("b")));
            });
        });

        describe("createBinaryExpression", () => {
            it("parenthesizes arrow function in RHS if necessary", () => {
                const lhs = createIdentifier("foo");
                const rhs = createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    [],
                    /*type*/ undefined,
                    /*equalsGreaterThanToken*/ undefined,
                    createBlock([]),
                );
                function checkRhs(operator: BinaryOperator, expectParens: boolean) {
                    const node = createBinary(lhs, operator, rhs);
                    assertSyntaxKind(node.right, expectParens ? SyntaxKind.ParenthesizedExpression : SyntaxKind.ArrowFunction);
                }

                checkRhs(SyntaxKind.CommaToken, /*expectParens*/ false);
                checkRhs(SyntaxKind.EqualsToken, /*expectParens*/ false);
                checkRhs(SyntaxKind.PlusEqualsToken, /*expectParens*/ false);
                checkRhs(SyntaxKind.BarBarToken, /*expectParens*/ true);
                checkRhs(SyntaxKind.AmpersandAmpersandToken, /*expectParens*/ true);
                checkRhs(SyntaxKind.QuestionQuestionToken, /*expectParens*/ true);
                checkRhs(SyntaxKind.EqualsEqualsToken, /*expectParens*/ true);
                checkRhs(SyntaxKind.BarBarEqualsToken, /*expectParens*/ false);
                checkRhs(SyntaxKind.AmpersandAmpersandEqualsToken, /*expectParens*/ false);
                checkRhs(SyntaxKind.QuestionQuestionEqualsToken, /*expectParens*/ false);
            });
        });
    });
}

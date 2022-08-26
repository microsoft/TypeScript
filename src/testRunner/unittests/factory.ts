namespace ts {
    describe("unittests:: FactoryAPI", () => {
        function assertSyntaxKind(node: Node, expected: SyntaxKind) {
            assert.strictEqual(node.kind, expected, `Actual: ${Debug.formatSyntaxKind(node.kind)} Expected: ${Debug.formatSyntaxKind(expected)}`);
        }
        describe("factory.createExportAssignment", () => {
            it("parenthesizes default export if necessary", () => {
                function checkExpression(expression: Expression) {
                    const node = factory.createExportAssignment(
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        expression,
                    );
                    assertSyntaxKind(node.expression, SyntaxKind.ParenthesizedExpression);
                }

                const clazz = factory.createClassExpression(/*modifiers*/ undefined, "C", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                    factory.createPropertyDeclaration([factory.createToken(SyntaxKind.StaticKeyword)], "prop", /*questionOrExclamationToken*/ undefined, /*type*/ undefined, factory.createStringLiteral("1")),
                ]);
                checkExpression(clazz);
                checkExpression(factory.createPropertyAccessExpression(clazz, "prop"));

                const func = factory.createFunctionExpression(/*modifiers*/ undefined, /*asteriskToken*/ undefined, "fn", /*typeParameters*/ undefined, /*parameters*/ undefined, /*type*/ undefined, factory.createBlock([]));
                checkExpression(func);
                checkExpression(factory.createCallExpression(func, /*typeArguments*/ undefined, /*argumentsArray*/ undefined));
                checkExpression(factory.createTaggedTemplateExpression(func, /*typeArguments*/ undefined, factory.createNoSubstitutionTemplateLiteral("")));

                checkExpression(factory.createBinaryExpression(factory.createStringLiteral("a"), SyntaxKind.CommaToken, factory.createStringLiteral("b")));
                checkExpression(factory.createCommaListExpression([factory.createStringLiteral("a"), factory.createStringLiteral("b")]));
            });
        });

        describe("factory.createArrowFunction", () => {
            it("parenthesizes concise body if necessary", () => {
                function checkBody(body: ConciseBody) {
                    const node = factory.createArrowFunction(
                        /*modifiers*/ undefined,
                        /*typeParameters*/ undefined,
                        [],
                        /*type*/ undefined,
                        /*equalsGreaterThanToken*/ undefined,
                        body,
                    );
                    assertSyntaxKind(node.body, SyntaxKind.ParenthesizedExpression);
                }

                checkBody(factory.createObjectLiteralExpression());
                checkBody(factory.createPropertyAccessExpression(factory.createObjectLiteralExpression(), "prop"));
                checkBody(factory.createAsExpression(factory.createPropertyAccessExpression(factory.createObjectLiteralExpression(), "prop"), factory.createTypeReferenceNode("T", /*typeArguments*/ undefined)));
                checkBody(factory.createNonNullExpression(factory.createPropertyAccessExpression(factory.createObjectLiteralExpression(), "prop")));
                checkBody(factory.createCommaListExpression([factory.createStringLiteral("a"), factory.createStringLiteral("b")]));
                checkBody(factory.createBinaryExpression(factory.createStringLiteral("a"), SyntaxKind.CommaToken, factory.createStringLiteral("b")));
            });
        });

        describe("createBinaryExpression", () => {
            it("parenthesizes arrow function in RHS if necessary", () => {
                const lhs = factory.createIdentifier("foo");
                const rhs = factory.createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    [],
                    /*type*/ undefined,
                    /*equalsGreaterThanToken*/ undefined,
                    factory.createBlock([]),
                );
                function checkRhs(operator: BinaryOperator, expectParens: boolean) {
                    const node = factory.createBinaryExpression(lhs, operator, rhs);
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

        describe("deprecations", () => {
            beforeEach(() => {
                Debug.enableDeprecationWarnings = false;
            });

            afterEach(() => {
                Debug.enableDeprecationWarnings = true;
            });

            // https://github.com/microsoft/TypeScript/issues/50259
            it("deprecated createConstructorDeclaration overload does not throw", () => {
                const body = factory.createBlock([]);
                assert.doesNotThrow(() => factory.createConstructorDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*parameters*/ [],
                    body,
                ));
            });

            // https://github.com/microsoft/TypeScript/issues/50259
            it("deprecated updateConstructorDeclaration overload does not throw", () => {
                const body = factory.createBlock([]);
                const ctor = factory.createConstructorDeclaration(/*modifiers*/ undefined, [], body);
                assert.doesNotThrow(() => factory.updateConstructorDeclaration(
                    ctor,
                    ctor.decorators,
                    ctor.modifiers,
                    ctor.parameters,
                    ctor.body,
                ));
            });
        });

    });
}

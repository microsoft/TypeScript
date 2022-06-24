namespace ts {
    describe("unittests:: PrinterAPI", () => {
        function makePrintsCorrectly(prefix: string) {
            return function printsCorrectly(name: string, options: PrinterOptions, printCallback: (printer: Printer) => string) {
                it(name, () => {
                    Harness.Baseline.runBaseline(`printerApi/${prefix}.${name}.js`,
                        printCallback(createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed, ...options })));
                });
            };
        }

        describe("printFile", () => {
            const printsCorrectly = makePrintsCorrectly("printsFileCorrectly");
            describe("comment handling", () => {
                // Avoid eagerly creating the sourceFile so that `createSourceFile` doesn't run unless one of these tests is run.
                let sourceFile: SourceFile;
                before(() => {
                    sourceFile = createSourceFile("source.ts", `
                        interface A<T> {
                            // comment1
                            readonly prop?: T;

                            // comment2
                            method(): void;

                            // comment3
                            new <T>(): A<T>;

                            // comment4
                            <T>(): A<T>;
                        }

                        // comment5
                        type B = number | string | object;
                        type C = A<number> & { x: string; }; // comment6

                        // comment7
                        enum E1 {
                            // comment8
                            first
                        }

                        const enum E2 {
                            second
                        }

                        // comment9
                        console.log(1 + 2);

                        // comment10
                        function functionWithDefaultArgValue(argument: string = "defaultValue"): void { }
                    `, ScriptTarget.ES2015);
                });
                printsCorrectly("default", {}, printer => printer.printFile(sourceFile));
                printsCorrectly("removeComments", { removeComments: true }, printer => printer.printFile(sourceFile));
            });

            // https://github.com/microsoft/TypeScript/issues/14948
            // eslint-disable-next-line no-template-curly-in-string
            printsCorrectly("templateLiteral", {}, printer => printer.printFile(createSourceFile("source.ts", "let greeting = `Hi ${name}, how are you?`;", ScriptTarget.ES2017)));

            // https://github.com/microsoft/TypeScript/issues/18071
            printsCorrectly("regularExpressionLiteral", {}, printer => printer.printFile(createSourceFile("source.ts", "let regex = /abc/;", ScriptTarget.ES2017)));

            // https://github.com/microsoft/TypeScript/issues/22239
            printsCorrectly("importStatementRemoveComments", { removeComments: true }, printer => printer.printFile(createSourceFile("source.ts", "import {foo} from 'foo';", ScriptTarget.ESNext)));
            printsCorrectly("classHeritageClauses", {}, printer => printer.printFile(createSourceFile(
                "source.ts",
                `class A extends B implements C implements D {}`,
                ScriptTarget.ES2017
            )));

            // https://github.com/microsoft/TypeScript/issues/35093
            printsCorrectly("definiteAssignmentAssertions", {}, printer => printer.printFile(createSourceFile(
                "source.ts",
                `class A {
                    prop!: string;
                }

                let x!: string;`,
                ScriptTarget.ES2017
            )));

            // https://github.com/microsoft/TypeScript/issues/35054
            printsCorrectly("jsx attribute escaping", {}, printer => {
                return printer.printFile(createSourceFile(
                    "source.ts",
                    String.raw`<a x='\\"'/>`,
                    ScriptTarget.ESNext,
                    /*setParentNodes*/ undefined,
                    ScriptKind.TSX
                ));
            });
        });

        describe("No duplicate ref directives when emiting .d.ts->.d.ts", () => {
            it("without statements", () => {
                const host = new fakes.CompilerHost(new vfs.FileSystem(true, {
                    files: {
                        "/test.d.ts": `/// <reference types="node" />\n/// <reference path="./src/test.d.ts />\n`
                    }
                }));
                const program = createProgram(["/test.d.ts"], { }, host);
                const file = program.getSourceFile("/test.d.ts")!;
                const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed });
                const output = printer.printFile(file);
                assert.equal(output.split(/\r?\n/g).length, 3);
            });
            it("with statements", () => {
                const host = new fakes.CompilerHost(new vfs.FileSystem(true, {
                    files: {
                        "/test.d.ts": `/// <reference types="node" />\n/// <reference path="./src/test.d.ts />\nvar a: number;\n`
                    }
                }));
                const program = createProgram(["/test.d.ts"], { }, host);
                const file = program.getSourceFile("/test.d.ts")!;
                const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed });
                const output = printer.printFile(file);
                assert.equal(output.split(/\r?\n/g).length, 4);
            });
        });

        describe("printBundle", () => {
            const printsCorrectly = makePrintsCorrectly("printsBundleCorrectly");
            let bundle: Bundle;
            before(() => {
                bundle = factory.createBundle([
                    createSourceFile("a.ts", `
                        /*! [a.ts] */

                        // comment0
                        const a = 1;
                    `, ScriptTarget.ES2015),
                    createSourceFile("b.ts", `
                        /*! [b.ts] */

                        // comment1
                        const b = 2;
                    `, ScriptTarget.ES2015)
                ]);
            });
            printsCorrectly("default", {}, printer => printer.printBundle(bundle));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printBundle(bundle));
        });

        describe("printNode", () => {
            const printsCorrectly = makePrintsCorrectly("printsNodeCorrectly");
            printsCorrectly("class", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createClassDeclaration(
                    /*modifiers*/ undefined,
                    /*name*/ factory.createIdentifier("C"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [factory.createPropertyDeclaration(
                        factory.createNodeArray([factory.createToken(SyntaxKind.PublicKeyword)]),
                        factory.createIdentifier("prop"),
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined
                    )]
                ),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            printsCorrectly("namespaceExportDeclaration", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createNamespaceExportDeclaration("B"),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            printsCorrectly("newExpressionWithPropertyAccessOnCallExpression", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createNewExpression(
                    factory.createPropertyAccessExpression(
                        factory.createCallExpression(factory.createIdentifier("f"), /*typeArguments*/ undefined, /*argumentsArray*/ undefined),
                        "x"),
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ undefined
                ),
                createSourceFile("source.ts", "", ScriptTarget.ESNext))
            );

            printsCorrectly("newExpressionOnConditionalExpression", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createNewExpression(
                    factory.createConditionalExpression(
                        factory.createIdentifier("x"), factory.createToken(SyntaxKind.QuestionToken),
                        factory.createIdentifier("y"), factory.createToken(SyntaxKind.ColonToken),
                        factory.createIdentifier("z")),
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ undefined
                ),
                createSourceFile("source.ts", "", ScriptTarget.ESNext))
            );

            printsCorrectly("emptyGlobalAugmentation", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createModuleDeclaration(
                    /*modifiers*/ [factory.createToken(SyntaxKind.DeclareKeyword)],
                    factory.createIdentifier("global"),
                    factory.createModuleBlock(emptyArray),
                    NodeFlags.GlobalAugmentation),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            printsCorrectly("emptyGlobalAugmentationWithNoDeclareKeyword", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createModuleDeclaration(
                    /*modifiers*/ undefined,
                    factory.createIdentifier("global"),
                    factory.createModuleBlock(emptyArray),
                    NodeFlags.GlobalAugmentation),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            // https://github.com/Microsoft/TypeScript/issues/15971
            printsCorrectly("classWithOptionalMethodAndProperty", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                factory.createClassDeclaration(
                    /*modifiers*/ [factory.createToken(SyntaxKind.DeclareKeyword)],
                    /*name*/ factory.createIdentifier("X"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [
                        factory.createMethodDeclaration(
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            /*name*/ factory.createIdentifier("method"),
                            /*questionToken*/ factory.createToken(SyntaxKind.QuestionToken),
                            /*typeParameters*/ undefined,
                            [],
                            /*type*/ factory.createKeywordTypeNode(SyntaxKind.VoidKeyword),
                            /*body*/ undefined
                        ),
                        factory.createPropertyDeclaration(
                            /*modifiers*/ undefined,
                            /*name*/ factory.createIdentifier("property"),
                            /*questionToken*/ factory.createToken(SyntaxKind.QuestionToken),
                            /*type*/ factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
                            /*initializer*/ undefined
                        ),
                    ]
                ),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            // https://github.com/Microsoft/TypeScript/issues/15651
            printsCorrectly("functionTypes", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                setEmitFlags(factory.createTupleTypeNode([
                    factory.createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            factory.createIdentifier("args")
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    factory.createFunctionTypeNode(
                        [factory.createTypeParameterDeclaration(/*modifiers*/ undefined, "T")],
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            factory.createIdentifier("args")
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    factory.createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            factory.createToken(SyntaxKind.DotDotDotToken),
                            factory.createIdentifier("args")
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    factory.createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            factory.createIdentifier("args"),
                            factory.createToken(SyntaxKind.QuestionToken)
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    factory.createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            factory.createIdentifier("args"),
                            /*questionToken*/ undefined,
                            factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    factory.createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [factory.createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            factory.createObjectBindingPattern([])
                        )],
                        factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                ]), EmitFlags.SingleLine),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));
        });
    });
}

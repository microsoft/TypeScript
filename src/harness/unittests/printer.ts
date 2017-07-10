/// <reference path="..\..\compiler\emitter.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("PrinterAPI", () => {
        function makePrintsCorrectly(prefix: string) {
            return function printsCorrectly(name: string, options: PrinterOptions, printCallback: (printer: Printer) => string) {
                it(name, () => {
                    Harness.Baseline.runBaseline(`printerApi/${prefix}.${name}.js`, () =>
                        printCallback(createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed, ...options })));
                });
            };
        }

        describe("printFile", () => {
            const printsCorrectly = makePrintsCorrectly("printsFileCorrectly");
            // Avoid eagerly creating the sourceFile so that `createSourceFile` doesn't run unless one of these tests is run.
            let sourceFile: SourceFile;
            before(() => sourceFile = createSourceFile("source.ts", `
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
            `, ScriptTarget.ES2015));
            printsCorrectly("default", {}, printer => printer.printFile(sourceFile));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printFile(sourceFile));

            // github #14948
            printsCorrectly("templateLiteral", {}, printer => printer.printFile(createSourceFile("source.ts", "let greeting = `Hi ${name}, how are you?`;", ScriptTarget.ES2017)));
        });

        describe("printBundle", () => {
            const printsCorrectly = makePrintsCorrectly("printsBundleCorrectly");
            let bundle: Bundle;
            before(() => bundle = createBundle([
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
            ]));
            printsCorrectly("default", {}, printer => printer.printBundle(bundle));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printBundle(bundle));
        });

        describe("printNode", () => {
            const printsCorrectly = makePrintsCorrectly("printsNodeCorrectly");
            printsCorrectly("class", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                createClassDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*name*/ createIdentifier("C"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [createProperty(
                        /*decorators*/ undefined,
                        createNodeArray([createToken(SyntaxKind.PublicKeyword)]),
                        createIdentifier("prop"),
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined
                    )]
                ),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            printsCorrectly("namespaceExportDeclaration", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                createNamespaceExportDeclaration("B"),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            // https://github.com/Microsoft/TypeScript/issues/15971
            printsCorrectly("classWithOptionalMethodAndProperty", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                createClassDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ [createToken(SyntaxKind.DeclareKeyword)],
                    /*name*/ createIdentifier("X"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [
                        createMethod(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            /*name*/ createIdentifier("method"),
                            /*questionToken*/ createToken(SyntaxKind.QuestionToken),
                            /*typeParameters*/ undefined,
                            [],
                            /*type*/ createKeywordTypeNode(SyntaxKind.VoidKeyword),
                            /*body*/ undefined
                        ),
                        createProperty(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*name*/ createIdentifier("property"),
                            /*questionToken*/ createToken(SyntaxKind.QuestionToken),
                            /*type*/ createKeywordTypeNode(SyntaxKind.StringKeyword),
                            /*initializer*/ undefined
                        ),
                    ]
                ),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));

            // https://github.com/Microsoft/TypeScript/issues/15651
            printsCorrectly("functionTypes", {}, printer => printer.printNode(
                EmitHint.Unspecified,
                createTupleTypeNode([
                    createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            createIdentifier("args")
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    createFunctionTypeNode(
                        [createTypeParameterDeclaration("T")],
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            createIdentifier("args")
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            createToken(SyntaxKind.DotDotDotToken),
                            createIdentifier("args")
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            createIdentifier("args"),
                            createToken(SyntaxKind.QuestionToken)
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            createIdentifier("args"),
                            /*questionToken*/ undefined,
                            createKeywordTypeNode(SyntaxKind.AnyKeyword)
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                    createFunctionTypeNode(
                        /*typeArguments*/ undefined,
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            createObjectBindingPattern([])
                        )],
                        createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ),
                ]),
                createSourceFile("source.ts", "", ScriptTarget.ES2015)
            ));
        });
    });
}

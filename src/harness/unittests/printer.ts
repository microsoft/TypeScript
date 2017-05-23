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
            const sourceFile = createSourceFile("source.ts", `
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

            printsCorrectly("default", {}, printer => printer.printFile(sourceFile));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printFile(sourceFile));

            // github #14948
            printsCorrectly("templateLiteral", {}, printer => printer.printFile(createSourceFile("source.ts", "let greeting = `Hi ${name}, how are you?`;", ScriptTarget.ES2017)));
        });

        describe("printBundle", () => {
            const printsCorrectly = makePrintsCorrectly("printsBundleCorrectly");
            const bundle = createBundle([
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
            printsCorrectly("default", {}, printer => printer.printBundle(bundle));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printBundle(bundle));
        });

        describe("printNode", () => {
            const printsCorrectly = makePrintsCorrectly("printsNodeCorrectly");
            const sourceFile = createSourceFile("source.ts", "", ScriptTarget.ES2015);
            // tslint:disable boolean-trivia
            const syntheticNode = createClassDeclaration(
                undefined,
                undefined,
                /*name*/ createIdentifier("C"),
                undefined,
                undefined,
                createNodeArray([
                    createProperty(
                        undefined,
                        createNodeArray([createToken(SyntaxKind.PublicKeyword)]),
                        createIdentifier("prop"),
                        undefined,
                        undefined,
                        undefined
                    )
                ])
            );

            // https://github.com/Microsoft/TypeScript/issues/15971
            const classWithOptionalMethodAndProperty = createClassDeclaration(
                undefined,
                /* modifiers */ createNodeArray([createToken(SyntaxKind.DeclareKeyword)]),
                /* name      */ createIdentifier("X"),
                undefined,
                undefined,
                createNodeArray([
                    createMethod(
                        undefined,
                        undefined,
                        undefined,
                        /* name          */ createIdentifier("method"),
                        /* questionToken */ createToken(SyntaxKind.QuestionToken),
                        undefined,
                        undefined,
                        /* type          */ createKeywordTypeNode(SyntaxKind.VoidKeyword),
                        undefined
                    ),
                    createProperty(
                        undefined,
                        undefined,
                        /* name          */ createIdentifier("property"),
                        /* questionToken */ createToken(SyntaxKind.QuestionToken),
                        /* type          */ createKeywordTypeNode(SyntaxKind.StringKeyword),
                        undefined
                    ),
                ])
            );

            // tslint:enable boolean-trivia
            printsCorrectly("class", {}, printer => printer.printNode(EmitHint.Unspecified, syntheticNode, sourceFile));

            printsCorrectly("namespaceExportDeclaration", {}, printer => printer.printNode(EmitHint.Unspecified, createNamespaceExportDeclaration("B"), sourceFile));

            printsCorrectly("classWithOptionalMethodAndProperty", {}, printer => printer.printNode(EmitHint.Unspecified, classWithOptionalMethodAndProperty, sourceFile));
        });
    });
}

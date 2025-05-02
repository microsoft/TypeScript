import * as fakes from "../_namespaces/fakes.js";
import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import * as vfs from "../_namespaces/vfs.js";

describe("unittests:: PrinterAPI", () => {
    function makePrintsCorrectly(prefix: string) {
        return function printsCorrectly(name: string, options: ts.PrinterOptions, printCallback: (printer: ts.Printer) => string) {
            it(name, () => {
                Harness.Baseline.runBaseline(`printerApi/${prefix}.${name}.js`, printCallback(ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed, ...options })));
            });
        };
    }

    describe("printFile", () => {
        const printsCorrectly = makePrintsCorrectly("printsFileCorrectly");
        describe("comment handling", () => {
            // Avoid eagerly creating the sourceFile so that `createSourceFile` doesn't run unless one of these tests is run.
            let sourceFile: ts.SourceFile;
            before(() => {
                sourceFile = ts.createSourceFile(
                    "source.ts",
                    `
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
                    `,
                    ts.ScriptTarget.ES2015,
                );
            });
            printsCorrectly("default", {}, printer => printer.printFile(sourceFile));
            printsCorrectly("removeComments", { removeComments: true }, printer => printer.printFile(sourceFile));
        });

        // https://github.com/microsoft/TypeScript/issues/14948
        // eslint-disable-next-line no-template-curly-in-string
        printsCorrectly("templateLiteral", {}, printer => printer.printFile(ts.createSourceFile("source.ts", "let greeting = `Hi ${name}, how are you?`;", ts.ScriptTarget.ES2017)));

        // https://github.com/microsoft/TypeScript/issues/18071
        printsCorrectly("regularExpressionLiteral", {}, printer => printer.printFile(ts.createSourceFile("source.ts", "let regex = /abc/;", ts.ScriptTarget.ES2017)));

        // https://github.com/microsoft/TypeScript/issues/22239
        printsCorrectly("importStatementRemoveComments", { removeComments: true }, printer => printer.printFile(ts.createSourceFile("source.ts", "import {foo} from 'foo';", ts.ScriptTarget.ESNext)));
        printsCorrectly("classHeritageClauses", {}, printer =>
            printer.printFile(ts.createSourceFile(
                "source.ts",
                `class A extends B implements C implements D {}`,
                ts.ScriptTarget.ES2017,
            )));

        // https://github.com/microsoft/TypeScript/issues/35093
        printsCorrectly("definiteAssignmentAssertions", {}, printer =>
            printer.printFile(ts.createSourceFile(
                "source.ts",
                `class A {
                    prop!: string;
                }

                let x!: string;`,
                ts.ScriptTarget.ES2017,
            )));

        // https://github.com/microsoft/TypeScript/issues/35054
        printsCorrectly("jsx attribute escaping", {}, printer => {
            return printer.printFile(ts.createSourceFile(
                "source.ts",
                String.raw`<a x='\\"'/>`,
                ts.ScriptTarget.ESNext,
                /*setParentNodes*/ undefined,
                ts.ScriptKind.TSX,
            ));
        });

        // https://github.com/microsoft/TypeScript/issues/59587
        printsCorrectly("lambda type parameter lists in tsx", {}, printer => {
            return printer.printFile(ts.createSourceFile(
                "source.tsx",
                String.raw`export const id = <T,>(id: T): T => id`,
                ts.ScriptTarget.ESNext,
                /*setParentNodes*/ undefined,
                ts.ScriptKind.TSX,
            ));
        });
    });

    describe("No duplicate ref directives when emiting .d.ts->.d.ts", () => {
        it("without statements", () => {
            const host = new fakes.CompilerHost(
                new vfs.FileSystem(/*ignoreCase*/ true, {
                    files: {
                        "/test.d.ts": `/// <reference types="node" />\n/// <reference path="./src/test.d.ts />\n`,
                    },
                }),
            );
            const program = ts.createProgram(["/test.d.ts"], {}, host);
            const file = program.getSourceFile("/test.d.ts")!;
            const printer = ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed });
            const output = printer.printFile(file);
            assert.equal(output.split(/\r?\n/).length, 3);
        });
        it("with statements", () => {
            const host = new fakes.CompilerHost(
                new vfs.FileSystem(/*ignoreCase*/ true, {
                    files: {
                        "/test.d.ts": `/// <reference types="node" />\n/// <reference path="./src/test.d.ts />\nvar a: number;\n`,
                    },
                }),
            );
            const program = ts.createProgram(["/test.d.ts"], {}, host);
            const file = program.getSourceFile("/test.d.ts")!;
            const printer = ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed });
            const output = printer.printFile(file);
            assert.equal(output.split(/\r?\n/).length, 4);
        });
    });

    describe("printBundle", () => {
        const printsCorrectly = makePrintsCorrectly("printsBundleCorrectly");
        let bundle: ts.Bundle;
        before(() => {
            bundle = ts.factory.createBundle([
                ts.createSourceFile(
                    "a.ts",
                    `
                        /*! [a.ts] */

                        // comment0
                        const a = 1;
                    `,
                    ts.ScriptTarget.ES2015,
                ),
                ts.createSourceFile(
                    "b.ts",
                    `
                        /*! [b.ts] */

                        // comment1
                        const b = 2;
                    `,
                    ts.ScriptTarget.ES2015,
                ),
            ]);
        });
        printsCorrectly("default", {}, printer => printer.printBundle(bundle));
        printsCorrectly("removeComments", { removeComments: true }, printer => printer.printBundle(bundle));
    });

    describe("printNode", () => {
        const printsCorrectly = makePrintsCorrectly("printsNodeCorrectly");
        printsCorrectly("class", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createClassDeclaration(
                    /*modifiers*/ undefined,
                    /*name*/ ts.factory.createIdentifier("C"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [ts.factory.createPropertyDeclaration(
                        ts.factory.createNodeArray([ts.factory.createToken(ts.SyntaxKind.PublicKeyword)]),
                        ts.factory.createIdentifier("prop"),
                        /*questionOrExclamationToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined,
                    )],
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        printsCorrectly("namespaceExportDeclaration", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createNamespaceExportDeclaration("B"),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        printsCorrectly("newExpressionWithPropertyAccessOnCallExpression", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createNewExpression(
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createCallExpression(ts.factory.createIdentifier("f"), /*typeArguments*/ undefined, /*argumentsArray*/ undefined),
                        "x",
                    ),
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ undefined,
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext),
            ));

        printsCorrectly("newExpressionOnConditionalExpression", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createNewExpression(
                    ts.factory.createConditionalExpression(
                        ts.factory.createIdentifier("x"),
                        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                        ts.factory.createIdentifier("y"),
                        ts.factory.createToken(ts.SyntaxKind.ColonToken),
                        ts.factory.createIdentifier("z"),
                    ),
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ undefined,
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext),
            ));

        printsCorrectly("emptyGlobalAugmentation", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createModuleDeclaration(
                    /*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
                    ts.factory.createIdentifier("global"),
                    ts.factory.createModuleBlock(ts.emptyArray),
                    ts.NodeFlags.GlobalAugmentation,
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        printsCorrectly("emptyGlobalAugmentationWithNoDeclareKeyword", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createModuleDeclaration(
                    /*modifiers*/ undefined,
                    ts.factory.createIdentifier("global"),
                    ts.factory.createModuleBlock(ts.emptyArray),
                    ts.NodeFlags.GlobalAugmentation,
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        // https://github.com/Microsoft/TypeScript/issues/15971
        printsCorrectly("classWithOptionalMethodAndProperty", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createClassDeclaration(
                    /*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
                    /*name*/ ts.factory.createIdentifier("X"),
                    /*typeParameters*/ undefined,
                    /*heritageClauses*/ undefined,
                    [
                        ts.factory.createMethodDeclaration(
                            /*modifiers*/ undefined,
                            /*asteriskToken*/ undefined,
                            /*name*/ ts.factory.createIdentifier("method"),
                            /*questionToken*/ ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                            /*typeParameters*/ undefined,
                            [],
                            /*type*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
                            /*body*/ undefined,
                        ),
                        ts.factory.createPropertyDeclaration(
                            /*modifiers*/ undefined,
                            /*name*/ ts.factory.createIdentifier("property"),
                            /*questionToken*/ ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                            /*type*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                            /*initializer*/ undefined,
                        ),
                    ],
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        // https://github.com/Microsoft/TypeScript/issues/15651
        printsCorrectly("functionTypes", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.setEmitFlags(
                    ts.factory.createTupleTypeNode([
                        ts.factory.createFunctionTypeNode(
                            /*typeParameters*/ undefined,
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                ts.factory.createIdentifier("args"),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                        ts.factory.createFunctionTypeNode(
                            [ts.factory.createTypeParameterDeclaration(/*modifiers*/ undefined, "T")],
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                ts.factory.createIdentifier("args"),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                        ts.factory.createFunctionTypeNode(
                            /*typeParameters*/ undefined,
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
                                ts.factory.createIdentifier("args"),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                        ts.factory.createFunctionTypeNode(
                            /*typeParameters*/ undefined,
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                ts.factory.createIdentifier("args"),
                                ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                        ts.factory.createFunctionTypeNode(
                            /*typeParameters*/ undefined,
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                ts.factory.createIdentifier("args"),
                                /*questionToken*/ undefined,
                                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                        ts.factory.createFunctionTypeNode(
                            /*typeParameters*/ undefined,
                            [ts.factory.createParameterDeclaration(
                                /*modifiers*/ undefined,
                                /*dotDotDotToken*/ undefined,
                                ts.factory.createObjectBindingPattern([]),
                            )],
                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        ),
                    ]),
                    ts.EmitFlags.SingleLine,
                ),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ES2015),
            ));

        // https://github.com/microsoft/TypeScript/issues/59150
        printsCorrectly("template string", {}, printer =>
            printer.printNode(
                ts.EmitHint.Unspecified,
                ts.factory.createNoSubstitutionTemplateLiteral("\n"),
                ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext),
            ));
    });
});

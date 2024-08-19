import * as documents from "../_namespaces/documents.js";
import * as evaluator from "../_namespaces/evaluator.js";
import * as fakes from "../_namespaces/fakes.js";
import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import {
    NewLineKind,
    ScriptTarget,
    transpileModule,
} from "../_namespaces/ts.js";
import * as vfs from "../_namespaces/vfs.js";

describe("unittests:: TransformAPI", () => {
    function replaceUndefinedWithVoid0(context: ts.TransformationContext) {
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.enableSubstitution(ts.SyntaxKind.Identifier);
        context.onSubstituteNode = (hint, node) => {
            node = previousOnSubstituteNode(hint, node);
            if (hint === ts.EmitHint.Expression && ts.isIdentifier(node) && node.escapedText === "undefined") {
                node = ts.factory.createPartiallyEmittedExpression(
                    ts.addSyntheticTrailingComment(
                        ts.setTextRange(
                            ts.factory.createVoidZero(),
                            node,
                        ),
                        ts.SyntaxKind.MultiLineCommentTrivia,
                        "undefined",
                    ),
                );
            }
            return node;
        };
        return (file: ts.SourceFile) => file;
    }
    function replaceNumberWith2(context: ts.TransformationContext) {
        function visitor(node: ts.Node): ts.Node {
            if (ts.isNumericLiteral(node)) {
                return ts.factory.createNumericLiteral("2");
            }
            return ts.visitEachChild(node, visitor, context);
        }
        return (file: ts.SourceFile) => ts.visitNode(file, visitor, ts.isSourceFile);
    }

    function replaceIdentifiersNamedOldNameWithNewName<T extends ts.SourceFile | ts.Bundle>(context: ts.TransformationContext) {
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.enableSubstitution(ts.SyntaxKind.Identifier);
        context.onSubstituteNode = (hint, node) => {
            node = previousOnSubstituteNode(hint, node);
            if (ts.isIdentifier(node) && node.escapedText === "oldName") {
                node = ts.setTextRange(ts.factory.createIdentifier("newName"), node);
            }
            return node;
        };
        return (file: T) => file;
    }

    function replaceIdentifiersNamedOldNameWithNewName2(context: ts.TransformationContext) {
        const visitor = (node: ts.Node): ts.Node => {
            if (ts.isIdentifier(node) && node.text === "oldName") {
                return ts.factory.createIdentifier("newName");
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return (node: ts.SourceFile) => ts.visitNode(node, visitor, ts.isSourceFile);
    }

    function createTaggedTemplateLiteral(): ts.Transformer<ts.SourceFile> {
        return sourceFile =>
            ts.factory.updateSourceFile(sourceFile, [
                ts.factory.createExpressionStatement(
                    ts.factory.createTaggedTemplateExpression(
                        ts.factory.createIdentifier("$tpl"),
                        /*typeArguments*/ undefined,
                        ts.factory.createNoSubstitutionTemplateLiteral("foo", "foo"),
                    ),
                ),
            ]);
    }

    function transformSourceFile(sourceText: string, transformers: ts.TransformerFactory<ts.SourceFile>[]) {
        const transformed = ts.transform(ts.createSourceFile("source.ts", sourceText, ts.ScriptTarget.ES2015), transformers);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed }, {
            onEmitNode: transformed.emitNodeWithNotification,
            substituteNode: transformed.substituteNode,
        });
        const result = printer.printBundle(ts.factory.createBundle(transformed.transformed));
        transformed.dispose();
        return result;
    }

    function testBaseline(testName: string, test: () => string) {
        it(testName, () => {
            Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, test());
        });
    }

    function testBaselineAndEvaluate(testName: string, test: () => string, onEvaluate: (exports: any) => void) {
        describe(testName, () => {
            let sourceText!: string;
            before(() => {
                sourceText = test();
            });
            after(() => {
                sourceText = undefined!;
            });
            it("compare baselines", () => {
                Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, sourceText);
            });
            it("evaluate", () => {
                onEvaluate(evaluator.evaluateJavaScript(sourceText));
            });
        });
    }

    testBaseline("substitution", () => {
        return transformSourceFile(`var a = undefined;`, [replaceUndefinedWithVoid0]);
    });

    testBaseline("types", () => {
        return transformSourceFile(`let a: () => void`, [
            context => file =>
                ts.visitNode(file, function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
                    return ts.visitEachChild(node, visitor, context);
                }, ts.isSourceFile),
        ]);
    });

    testBaseline("transformDefiniteAssignmentAssertions", () => {
        return transformSourceFile(`let a!: () => void`, [
            context => file =>
                ts.visitNode(file, function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
                    if (node.kind === ts.SyntaxKind.VoidKeyword) {
                        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
                    }
                    return ts.visitEachChild(node, visitor, context);
                }, ts.isSourceFile),
        ]);
    });

    testBaseline("fromTranspileModule", () => {
        return ts.transpileModule(`var oldName = undefined;`, {
            transformers: {
                before: [replaceUndefinedWithVoid0],
                after: [replaceIdentifiersNamedOldNameWithNewName],
            },
            compilerOptions: {
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;
    });

    testBaseline("transformTaggedTemplateLiteral", () => {
        return ts.transpileModule("", {
            transformers: {
                before: [createTaggedTemplateLiteral],
            },
            compilerOptions: {
                target: ts.ScriptTarget.ES5,
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;
    });

    testBaseline("issue27854", () => {
        return ts.transpileModule(`oldName<{ a: string; }>\` ... \`;`, {
            transformers: {
                before: [replaceIdentifiersNamedOldNameWithNewName2],
            },
            compilerOptions: {
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
                target: ts.ScriptTarget.Latest,
            },
        }).outputText;
    });

    testBaseline("issue44068", () => {
        return transformSourceFile(
            `
                const FirstVar = null;
                const SecondVar = null;
            `,
            [
                context => file => {
                    const firstVarName = (file.statements[0] as ts.VariableStatement)
                        .declarationList.declarations[0].name as ts.Identifier;
                    const secondVarName = (file.statements[0] as ts.VariableStatement)
                        .declarationList.declarations[0].name as ts.Identifier;

                    return context.factory.updateSourceFile(
                        file,
                        file.statements.concat([
                            context.factory.createExpressionStatement(
                                context.factory.createArrayLiteralExpression([firstVarName, secondVarName]),
                            ),
                        ]),
                    );
                },
            ],
        );
    });

    testBaseline("rewrittenNamespace", () => {
        return ts.transpileModule(`namespace Reflect { const x = 1; }`, {
            transformers: {
                before: [forceNamespaceRewrite],
            },
            compilerOptions: {
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;
    });

    testBaseline("rewrittenNamespaceFollowingClass", () => {
        return ts.transpileModule(
            `
            class C { foo = 10; static bar = 20 }
            namespace C { export let x = 10; }
            `,
            {
                transformers: {
                    before: [forceNamespaceRewrite],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ESNext,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                    useDefineForClassFields: false,
                },
            },
        ).outputText;
    });

    testBaseline("transformTypesInExportDefault", () => {
        return ts.transpileModule(
            `
            export default (foo: string) => { return 1; }
            `,
            {
                transformers: {
                    before: [replaceNumberWith2],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ESNext,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    testBaseline("synthesizedClassAndNamespaceCombination", () => {
        return ts.transpileModule("", {
            transformers: {
                before: [replaceWithClassAndNamespace],
            },
            compilerOptions: {
                target: ts.ScriptTarget.ESNext,
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;

        function replaceWithClassAndNamespace() {
            return (sourceFile: ts.SourceFile) => {
                // TODO(rbuckton): Does this need to be parented?
                const result = ts.factory.updateSourceFile(
                    sourceFile,
                    ts.factory.createNodeArray([
                        ts.factory.createClassDeclaration(/*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, /*members*/ undefined!), // TODO: GH#18217
                        ts.factory.createModuleDeclaration(/*modifiers*/ undefined, ts.factory.createIdentifier("Foo"), ts.factory.createModuleBlock([ts.factory.createEmptyStatement()])),
                    ]),
                );
                return result;
            };
        }
    });

    function forceNamespaceRewrite(context: ts.TransformationContext) {
        return (sourceFile: ts.SourceFile): ts.SourceFile => {
            return visitNode(sourceFile);

            function visitNode<T extends ts.Node>(node: T): T {
                if (node.kind === ts.SyntaxKind.ModuleBlock) {
                    const block = node as T & ts.ModuleBlock;
                    const statements = ts.factory.createNodeArray([...block.statements]);
                    return ts.factory.updateModuleBlock(block, statements) as typeof block;
                }
                return ts.visitEachChild(node, visitNode, context);
            }
        };
    }

    testBaseline("transformAwayExportStar", () => {
        return ts.transpileModule("export * from './helper';", {
            transformers: {
                before: [expandExportStar],
            },
            compilerOptions: {
                target: ts.ScriptTarget.ESNext,
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;

        function expandExportStar(context: ts.TransformationContext) {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return visitNode(sourceFile);

                function visitNode<T extends ts.Node>(node: T): T {
                    if (node.kind === ts.SyntaxKind.ExportDeclaration) {
                        const ed = node as ts.Node as ts.ExportDeclaration;
                        const exports = [{ name: "x" }];
                        const exportSpecifiers = exports.map(e => ts.factory.createExportSpecifier(/*isTypeOnly*/ false, e.name, e.name));
                        const exportClause = ts.factory.createNamedExports(exportSpecifiers);
                        const newEd = ts.factory.updateExportDeclaration(ed, ed.modifiers, ed.isTypeOnly, exportClause, ed.moduleSpecifier, ed.attributes);

                        return newEd as ts.Node as T;
                    }
                    return ts.visitEachChild(node, visitNode, context);
                }
            };
        }
    });

    // https://github.com/Microsoft/TypeScript/issues/19618
    testBaseline("transformAddImportStar", () => {
        return ts.transpileModule("", {
            transformers: {
                before: [transformAddImportStar],
            },
            compilerOptions: {
                target: ts.ScriptTarget.ES5,
                module: ts.ModuleKind.System,
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
                moduleDetection: ts.ModuleDetectionKind.Force,
            },
        }).outputText;

        function transformAddImportStar(_context: ts.TransformationContext) {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return visitNode(sourceFile);
            };
            function visitNode(sf: ts.SourceFile) {
                // produce `import * as i0 from './comp';
                const importStar = ts.factory.createImportDeclaration(
                    /*modifiers*/ undefined,
                    /*importClause*/ ts.factory.createImportClause(
                        /*isTypeOnly*/ false,
                        /*name*/ undefined,
                        ts.factory.createNamespaceImport(ts.factory.createIdentifier("i0")),
                    ),
                    /*moduleSpecifier*/ ts.factory.createStringLiteral("./comp1"),
                    /*attributes*/ undefined,
                );
                return ts.factory.updateSourceFile(sf, [importStar]);
            }
        }
    });

    // https://github.com/Microsoft/TypeScript/issues/17384
    testBaseline("transformAddDecoratedNode", () => {
        return transpileModule("", {
            transformers: {
                before: [transformAddDecoratedNode],
            },
            compilerOptions: {
                target: ScriptTarget.ES5,
                experimentalDecorators: true,
                newLine: NewLineKind.CarriageReturnLineFeed,
            },
        }).outputText;

        function transformAddDecoratedNode(_context: ts.TransformationContext) {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return visitNode(sourceFile);
            };
            function visitNode(sf: ts.SourceFile) {
                // produce `class Foo { @Bar baz() {} }`;
                const classDecl = ts.factory.createClassDeclaration(/*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                    ts.factory.createMethodDeclaration([ts.factory.createDecorator(ts.factory.createIdentifier("Bar"))], /*asteriskToken*/ undefined, "baz", /*questionToken*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, ts.factory.createBlock([])),
                ]);
                return ts.factory.updateSourceFile(sf, [classDecl]);
            }
        }
    });

    testBaseline("transformDeclarationFile", () => {
        return baselineDeclarationTransform(`var oldName = undefined;`, {
            transformers: {
                afterDeclarations: [replaceIdentifiersNamedOldNameWithNewName],
            },
            compilerOptions: {
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
                declaration: true,
            },
        });
    });

    // https://github.com/microsoft/TypeScript/issues/33295
    testBaseline("transformParameterProperty", () => {
        return transpileModule("", {
            transformers: {
                before: [transformAddParameterProperty],
            },
            compilerOptions: {
                target: ScriptTarget.ES5,
                newLine: NewLineKind.CarriageReturnLineFeed,
                experimentalDecorators: true,
            },
        }).outputText;

        function transformAddParameterProperty(_context: ts.TransformationContext) {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return visitNode(sourceFile);
            };
            function visitNode(sf: ts.SourceFile) {
                // produce `class Foo { constructor(@Dec private x) {} }`;
                // The decorator is required to trigger ts.ts transformations.
                const classDecl = ts.factory.createClassDeclaration([], "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                    ts.factory.createConstructorDeclaration(/*modifiers*/ undefined, [
                        ts.factory.createParameterDeclaration([ts.factory.createDecorator(ts.factory.createIdentifier("Dec")), ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword)], /*dotDotDotToken*/ undefined, "x"),
                    ], ts.factory.createBlock([])),
                ]);
                return ts.factory.updateSourceFile(sf, [classDecl]);
            }
        }
    });

    function baselineDeclarationTransform(text: string, opts: ts.TranspileOptions) {
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ true, { documents: [new documents.TextDocument("/.src/index.ts", text)] });
        const host = new fakes.CompilerHost(fs, opts.compilerOptions);
        const program = ts.createProgram(["/.src/index.ts"], opts.compilerOptions!, host);
        program.emit(program.getSourceFile("/.src/index.ts"), (p, s, bom) => host.writeFile(p, s, bom), /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true, opts.transformers);
        return fs.readFileSync("/.src/index.d.ts").toString();
    }

    function addSyntheticComment(nodeFilter: (node: ts.Node) => boolean) {
        return (context: ts.TransformationContext) => {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return ts.visitNode(sourceFile, rootTransform, ts.isSourceFile);
            };
            function rootTransform<T extends ts.Node>(node: T): ts.VisitResult<T> {
                if (nodeFilter(node)) {
                    ts.setEmitFlags(node, ts.EmitFlags.NoLeadingComments);
                    ts.setSyntheticLeadingComments(node, [{ kind: ts.SyntaxKind.MultiLineCommentTrivia, text: "comment", pos: -1, end: -1, hasTrailingNewLine: true }]);
                }
                return ts.visitEachChild(node, rootTransform, context);
            }
        };
    }

    // https://github.com/Microsoft/TypeScript/issues/24096
    testBaseline("transformAddCommentToArrowReturnValue", () => {
        return ts.transpileModule(
            `const foo = () =>
    void 0
`,
            {
                transformers: {
                    before: [addSyntheticComment(ts.isVoidExpression)],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    // https://github.com/Microsoft/TypeScript/issues/17594
    testBaseline("transformAddCommentToExportedVar", () => {
        return ts.transpileModule(
            `export const exportedDirectly = 1;
const exportedSeparately = 2;
export {exportedSeparately};
`,
            {
                transformers: {
                    before: [addSyntheticComment(ts.isVariableStatement)],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    // https://github.com/Microsoft/TypeScript/issues/17594
    testBaseline("transformAddCommentToImport", () => {
        return ts.transpileModule(
            `
// Previous comment on import.
import {Value} from 'somewhere';
import * as X from 'somewhere';
// Previous comment on export.
export { /* specifier comment */ X, Y} from 'somewhere';
export * from 'somewhere';
export {Value};
`,
            {
                transformers: {
                    before: [addSyntheticComment(n => ts.isImportDeclaration(n) || ts.isExportDeclaration(n) || ts.isImportSpecifier(n) || ts.isExportSpecifier(n))],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    // https://github.com/Microsoft/TypeScript/issues/17594
    testBaseline("transformAddCommentToProperties", () => {
        return ts.transpileModule(
            `
// class comment.
class Clazz {
    // original comment 1.
    static staticProp: number = 1;
    // original comment 2.
    instanceProp: number = 2;
    // original comment 3.
    constructor(readonly field = 1) {}
}
`,
            {
                transformers: {
                    before: [addSyntheticComment(n => ts.isPropertyDeclaration(n) || ts.isParameterPropertyDeclaration(n, n.parent) || ts.isClassDeclaration(n) || ts.isConstructorDeclaration(n))],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES2015,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    testBaseline("transformAddCommentToNamespace", () => {
        return ts.transpileModule(
            `
// namespace comment.
namespace Foo {
    export const x = 1;
}
// another comment.
namespace Foo {
    export const y = 1;
}
`,
            {
                transformers: {
                    before: [addSyntheticComment(n => ts.isModuleDeclaration(n))],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES2015,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    testBaseline("transformUpdateModuleMember", () => {
        return ts.transpileModule(
            `
module MyModule {
    const myVariable = 1;
    function foo(param: string) {}
}
`,
            {
                transformers: {
                    before: [renameVariable],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ES2015,
                    newLine: ts.NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;

        function renameVariable(context: ts.TransformationContext) {
            return (sourceFile: ts.SourceFile): ts.SourceFile => {
                return ts.visitNode(sourceFile, rootTransform, ts.isSourceFile);
            };
            function rootTransform<T extends ts.Node>(node: T): ts.Node {
                if (ts.isVariableDeclaration(node)) {
                    return ts.factory.updateVariableDeclaration(node, ts.factory.createIdentifier("newName"), /*exclamationToken*/ undefined, /*type*/ undefined, node.initializer);
                }
                return ts.visitEachChild(node, rootTransform, context);
            }
        }
    });

    // https://github.com/Microsoft/TypeScript/issues/24709
    testBaseline("issue24709", () => {
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ true);
        const transformed = ts.transform(ts.createSourceFile("source.ts", "class X { echo(x: string) { return x; } }", ts.ScriptTarget.ES5), [transformSourceFile]);
        const transformedSourceFile = transformed.transformed[0];
        transformed.dispose();
        const host = new fakes.CompilerHost(fs);
        host.getSourceFile = () => transformedSourceFile;
        const program = ts.createProgram(["source.ts"], {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.None,
            noLib: true,
        }, host);
        program.emit(transformedSourceFile, (_p, s, b) => host.writeFile("source.js", s, b));
        return host.readFile("source.js")!.toString();

        function transformSourceFile(context: ts.TransformationContext) {
            const visitor = (node: ts.Node): ts.Node => {
                if (ts.isMethodDeclaration(node)) {
                    return ts.factory.updateMethodDeclaration(
                        node,
                        node.modifiers,
                        node.asteriskToken,
                        ts.factory.createIdentifier("foobar"),
                        node.questionToken,
                        node.typeParameters,
                        node.parameters,
                        node.type,
                        node.body,
                    );
                }
                return ts.visitEachChild(node, visitor, context);
            };
            return (node: ts.SourceFile) => ts.visitNode(node, visitor, ts.isSourceFile);
        }
    });

    testBaselineAndEvaluate("templateSpans", () => {
        return ts.transpileModule("const x = String.raw`\n\nhello`; exports.stringLength = x.trim().length;", {
            compilerOptions: {
                target: ts.ScriptTarget.ESNext,
                newLine: ts.NewLineKind.CarriageReturnLineFeed,
            },
            transformers: {
                before: [transformSourceFile],
            },
        }).outputText;

        function transformSourceFile(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
            function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
                if (ts.isNoSubstitutionTemplateLiteral(node)) {
                    return ts.factory.createNoSubstitutionTemplateLiteral(node.text, node.rawText);
                }
                else {
                    return ts.visitEachChild(node, visitor, context);
                }
            }
            return sourceFile => ts.visitNode(sourceFile, visitor, ts.isSourceFile);
        }
    }, exports => {
        assert.equal(exports.stringLength, 5);
    });

    function addStaticFieldWithComment(context: ts.TransformationContext) {
        return (sourceFile: ts.SourceFile): ts.SourceFile => {
            return ts.visitNode(sourceFile, rootTransform, ts.isSourceFile);
        };
        function rootTransform<T extends ts.Node>(node: T): ts.Node {
            if (ts.isClassLike(node)) {
                const newMembers = [ts.factory.createPropertyDeclaration([ts.factory.createModifier(ts.SyntaxKind.StaticKeyword)], "newField", /*questionOrExclamationToken*/ undefined, /*type*/ undefined, ts.factory.createStringLiteral("x"))];
                ts.setSyntheticLeadingComments(newMembers[0], [{ kind: ts.SyntaxKind.MultiLineCommentTrivia, text: "comment", pos: -1, end: -1, hasTrailingNewLine: true }]);
                return ts.isClassDeclaration(node) ?
                    ts.factory.updateClassDeclaration(
                        node,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        newMembers,
                    ) :
                    ts.factory.updateClassExpression(
                        node,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        newMembers,
                    );
            }
            return ts.visitEachChild(node, rootTransform, context);
        }
    }

    testBaseline("transformSyntheticCommentOnStaticFieldInClassDeclaration", () => {
        return ts.transpileModule(
            `
declare const Decorator: any;
@Decorator
class MyClass {
}
`,
            {
                transformers: {
                    before: [addStaticFieldWithComment],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    experimentalDecorators: true,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    testBaseline("transformSyntheticCommentOnStaticFieldInClassExpression", () => {
        return ts.transpileModule(
            `
const MyClass = class {
};
`,
            {
                transformers: {
                    before: [addStaticFieldWithComment],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    experimentalDecorators: true,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });

    testBaseline("jsxExpression", () => {
        function doNothing(context: ts.TransformationContext) {
            const visitor = (node: ts.Node): ts.Node => {
                return ts.visitEachChild(node, visitor, context);
            };
            return (node: ts.SourceFile) => ts.visitNode(node, visitor, ts.isSourceFile);
        }

        return ts.transpileModule(
            `
function test () {
    return <>
        {/* This comment breaks the transformer */}
    </>
}
`,
            {
                transformers: {
                    before: [doNothing],
                },
                compilerOptions: {
                    jsx: ts.JsxEmit.React,
                    target: ScriptTarget.ES2015,
                    experimentalDecorators: true,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                },
            },
        ).outputText;
    });
});

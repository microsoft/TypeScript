/// <reference path="..\..\services\transform.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("TransformAPI", () => {
        function replaceUndefinedWithVoid0(context: ts.TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (hint === EmitHint.Expression && isIdentifier(node) && node.escapedText === "undefined") {
                    node = createPartiallyEmittedExpression(
                        addSyntheticTrailingComment(
                            setTextRange(
                                createVoidZero(),
                                node),
                            SyntaxKind.MultiLineCommentTrivia, "undefined"));
                }
                return node;
            };
            return (file: ts.SourceFile) => file;
        }

        function replaceIdentifiersNamedOldNameWithNewName(context: ts.TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (isIdentifier(node) && node.escapedText === "oldName") {
                    node = setTextRange(createIdentifier("newName"), node);
                }
                return node;
            };
            return (file: ts.SourceFile) => file;
        }

        function transformSourceFile(sourceText: string, transformers: TransformerFactory<SourceFile>[]) {
            const transformed = transform(createSourceFile("source.ts", sourceText, ScriptTarget.ES2015), transformers);
            const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed }, {
                onEmitNode: transformed.emitNodeWithNotification,
                substituteNode: transformed.substituteNode
            });
            const result = printer.printBundle(createBundle(transformed.transformed));
            transformed.dispose();
            return result;
        }

        function testBaseline(testName: string, test: () => string) {
            it(testName, () => {
                Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, test);
            });
        }

        testBaseline("substitution", () => {
            return transformSourceFile(`var a = undefined;`, [replaceUndefinedWithVoid0]);
        });

        testBaseline("types", () => {
            return transformSourceFile(`let a: () => void`, [
                context => file => visitNode(file, function visitor(node: Node): VisitResult<Node> {
                    return visitEachChild(node, visitor, context);
                })
            ]);
        });

        testBaseline("fromTranspileModule", () => {
            return ts.transpileModule(`var oldName = undefined;`, {
                transformers: {
                    before: [replaceUndefinedWithVoid0],
                    after: [replaceIdentifiersNamedOldNameWithNewName]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed
                }
            }).outputText;
        });

        testBaseline("rewrittenNamespace", () => {
            return ts.transpileModule(`namespace Reflect { const x = 1; }`, {
                transformers: {
                    before: [forceNamespaceRewrite],
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("rewrittenNamespaceFollowingClass", () => {
            return ts.transpileModule(`
            class C { foo = 10; static bar = 20 }
            namespace C { export let x = 10; }
            `, {
                    transformers: {
                        before: [forceNamespaceRewrite],
                    },
                    compilerOptions: {
                        target: ts.ScriptTarget.ESNext,
                        newLine: NewLineKind.CarriageReturnLineFeed,
                    }
                }).outputText;
        });

        testBaseline("synthesizedClassAndNamespaceCombination", () => {
            return ts.transpileModule("", {
                transformers: {
                    before: [replaceWithClassAndNamespace],
                },
                compilerOptions: {
                    target: ts.ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function replaceWithClassAndNamespace() {
                return (sourceFile: ts.SourceFile) => {
                    const result = getMutableClone(sourceFile);
                    result.statements = ts.createNodeArray([
                        ts.createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, /*members*/ undefined),
                        ts.createModuleDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createIdentifier("Foo"), createModuleBlock([createEmptyStatement()]))
                    ]);
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
                        const statements = ts.createNodeArray([...block.statements]);
                        return ts.updateModuleBlock(block, statements) as typeof block;
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
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function expandExportStar(context: ts.TransformationContext) {
                return (sourceFile: ts.SourceFile): ts.SourceFile => {
                    return visitNode(sourceFile);

                    function visitNode<T extends ts.Node>(node: T): T {
                        if (node.kind === ts.SyntaxKind.ExportDeclaration) {
                            const ed = node as ts.Node as ts.ExportDeclaration;
                            const exports = [{ name: "x" }];
                            const exportSpecifiers = exports.map(e => ts.createExportSpecifier(e.name, e.name));
                            const exportClause = ts.createNamedExports(exportSpecifiers);
                            const newEd = ts.updateExportDeclaration(ed, ed.decorators, ed.modifiers, exportClause, ed.moduleSpecifier);

                            return newEd as ts.Node as T;
                        }
                        return ts.visitEachChild(node, visitNode, context);
                    }
                };
            }
        });
    });
}


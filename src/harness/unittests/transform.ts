/// <reference path="..\..\services\transform.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("TransformAPI", () => {
        function replaceUndefinedWithVoid0(context: ts.TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (hint === EmitHint.Expression && node.kind === SyntaxKind.Identifier && (<Identifier>node).text === "undefined") {
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
                if (node.kind === SyntaxKind.Identifier && (<Identifier>node).text === "oldName") {
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
    });
}


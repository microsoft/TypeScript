/// <reference path="..\..\services\transform.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("TransformAPI", () => {
        function transformsCorrectly(name: string, source: string, transformers: TransformerFactory<SourceFile>[]) {
            it(name, () => {
                Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${name}.js`, () => {
                    const transformed = transform(createSourceFile("source.ts", source, ScriptTarget.ES2015), transformers);
                    const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed }, {
                        onEmitNode: transformed.emitNodeWithNotification,
                        substituteNode: transformed.substituteNode
                    });
                    const result = printer.printBundle(createBundle(transformed.transformed));
                    transformed.dispose();
                    return result;
                });
            });
        }

        transformsCorrectly("substitution", `
            var a = undefined;
        `, [
            context => {
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
                return file => file;
            }
        ]);
    });
}

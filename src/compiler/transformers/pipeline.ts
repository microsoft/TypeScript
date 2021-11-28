/*@internal*/
namespace ts {
    export const transformPipeline: TransformerFactory<SourceFile> =
        (context: TransformationContext) => {
            const {
                factory,
            } = context;
            return sourceFile => {
                const createPipelineVisitor = (currentTokenIdentifier?: Identifier) =>
                    (node: Node): Node => {

                    if (node.transformFlags & TransformFlags.ContainsPipeline) {
                        if (isPipelineHackExpression(node)) {
                            const placeholderTemp = factory.createUniqueName("pipelineHackPlaceholder");
                            context.hoistVariableDeclaration(placeholderTemp);

                            return factory.createParenthesizedExpression(
                                factory.createCommaListExpression([
                                    factory.createAssignment(
                                        placeholderTemp,
                                        visitNode(
                                            node.argument,
                                            createPipelineVisitor(currentTokenIdentifier),
                                            isExpression
                                        )
                                    ),
                                    visitNode(
                                        node.expression,
                                        createPipelineVisitor(placeholderTemp),
                                        isExpression
                                    )
                                ])
                            );
                        }

                        if (isPipelineApplicationExpression(node)) {
                            const call = factory.createCallExpression(
                                visitNode(node.expression, createPipelineVisitor(currentTokenIdentifier)),
                                /*typeArguments*/ undefined,
                                [visitNode(node.argument, createPipelineVisitor(currentTokenIdentifier))]
                            );
                            setSourceMapRange(call, node);
                            setCommentRange(call, node);
                            return call;
                        }

                        return visitEachChild(node, createPipelineVisitor(currentTokenIdentifier), context);
                    };

                    if (currentTokenIdentifier) {
                        if (node.kind === SyntaxKind.Identifier && (node as Identifier).escapedText === "#") {
                            return currentTokenIdentifier as Node;
                        }
                        return visitEachChild(node, createPipelineVisitor(currentTokenIdentifier), context);
                    }
                    return node;
                };
                return visitNode(sourceFile, createPipelineVisitor());
            };
        };
}

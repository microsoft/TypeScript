/*@internal*/
namespace ts {
    export const transformPipeline: TransformerFactory<SourceFile> =
        (context: TransformationContext) => {
            const {
                factory,
            } = context;
            return sourceFile => {
                const findPipelineVisitor = (node: Node): Node => {
                    if (node.transformFlags & TransformFlags.ContainsPipeline) {
                        if (isPipelineHackExpression(node)) {
                            const placeholderTemp = factory.createUniqueName("pipelineHackPlaceholder");
                            const findPlaceholderVisitor = (node2: Node): Node => {
                                if (isPipelineHackExpression(node2)) {
                                    return visitNode(
                                        node2,
                                        findPipelineVisitor
                                    );
                                }

                                if (node2.kind === SyntaxKind.Identifier && (node2 as Identifier).escapedText === "#") {
                                    return placeholderTemp;
                                }

                                return visitEachChild(node2, findPlaceholderVisitor, context);
                            };

                            context.hoistVariableDeclaration(placeholderTemp);
                            return factory.createParenthesizedExpression(
                                factory.createCommaListExpression([
                                    factory.createAssignment(
                                        placeholderTemp,
                                        visitNode(
                                            node.argument,
                                            findPipelineVisitor,
                                            isExpression
                                        )
                                    ),
                                    visitNode(
                                        node.expression,
                                        findPlaceholderVisitor,
                                        isExpression
                                    )
                                ])
                            );
                        }
                        return visitEachChild(node, findPipelineVisitor, context);
                    };
                    return node;
                };
                return visitNode(sourceFile, findPipelineVisitor);
            };
        };
}

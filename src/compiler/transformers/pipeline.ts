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
                        if (isPipelineApplicationExpression(node)) {
                            const call = factory.createCallExpression(
                                visitNode(node.expression, findPipelineVisitor),
                                /*typeArguments*/ undefined,
                                [visitNode(node.argument, findPipelineVisitor)]
                            );
                            setSourceMapRange(call, node);
                            setCommentRange(call, node);
                            return call;
                        }
                        return visitEachChild(node, findPipelineVisitor, context);
                    };
                    return node;
                };
                return visitNode(sourceFile, findPipelineVisitor);
            };
        };
}

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
                        return visitEachChild(node, findPipelineVisitor, context);
                    };
                    return node;
                };
                return visitNode(sourceFile, findPipelineVisitor);
            };
        };
}

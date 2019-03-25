/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }
            switch (node.kind) {
                default:
                    return visitEachChild(node, visitor, context);
            }
        }
    }
}

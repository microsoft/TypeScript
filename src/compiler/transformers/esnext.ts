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
                case SyntaxKind.CatchClause:
                    return visitCatchClause(node as CatchClause);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            if (!node.variableDeclaration) {
                return updateCatchClause(
                    node,
                    createVariableDeclaration(createTempVariable(/*recordTempVariable*/ undefined)),
                    visitNode(node.block, visitor, isBlock)
                );
            }
            return visitEachChild(node, visitor, context);
        }
    }
}

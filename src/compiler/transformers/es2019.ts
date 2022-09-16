/*@internal*/
namespace ts {
export function transformES2019(context: ts.TransformationContext) {
    const factory = context.factory;
    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if ((node.transformFlags & ts.TransformFlags.ContainsES2019) === 0) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.CatchClause:
                return visitCatchClause(node as ts.CatchClause);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitCatchClause(node: ts.CatchClause): ts.CatchClause {
        if (!node.variableDeclaration) {
            return factory.updateCatchClause(
                node,
                factory.createVariableDeclaration(factory.createTempVariable(/*recordTempVariable*/ undefined)),
                ts.visitNode(node.block, visitor, ts.isBlock)
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }
}
}

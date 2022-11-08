import {
    AwaitExpression,
    Bundle,
    chainBundle, Expression, factory, Node, SourceFile, SyntaxKind, TransformationContext, TransformFlags, visitEachChild, VisitResult,
} from "../_namespaces/ts";

/** @internal */
export function transformESNext(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
  return chainBundle(context, transformSourceFile);

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
        case SyntaxKind.AwaitExpression:
            if ((node as AwaitExpression).operation) {
                return transformAwaitOperations(node as AwaitExpression);
            }
            // falls through
          default:
              return visitEachChild(node, visitor, context);
      }
    }

    function transformAwaitOperations(node: AwaitExpression): VisitResult<Node> {
        const { operation, expression } = node;
        if (!operation) return;
        let expr = visitor(expression);
        if (!expr) return undefined;
        // TODO: is this cast from Node[] to Expression[] safe?
        if (Array.isArray(expr)) expr = factory.createCommaListExpression(expr as Expression[]);
        const call = factory.createCallExpression(
            factory.createPropertyAccessExpression(factory.createIdentifier("Promise"), operation),
            /*typeArguments*/ undefined,
            // TODO: is this cast from Node to Expression safe?
            [expr as Expression]
        );
        return factory.createAwaitExpression(/*operation*/ undefined, call);
    }
}

/*@internal*/
namespace ts {
export function transformESNext(context: ts.TransformationContext) {
  return ts.chainBundle(context, transformSourceFile);

  function transformSourceFile(node: ts.SourceFile) {
      if (node.isDeclarationFile) {
          return node;
      }

      return ts.visitEachChild(node, visitor, context);
  }

  function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
      if ((node.transformFlags & ts.TransformFlags.ContainsESNext) === 0) {
          return node;
      }
      switch (node.kind) {
          default:
              return ts.visitEachChild(node, visitor, context);
      }
  }
}
}

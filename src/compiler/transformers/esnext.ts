import {
    Bundle,
    chainBundle,
    Node,
    SourceFile,
    TransformationContext,
    TransformFlags,
    visitEachChild,
    VisitResult,
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
          default:
              return visitEachChild(node, visitor, context);
      }
  }
}

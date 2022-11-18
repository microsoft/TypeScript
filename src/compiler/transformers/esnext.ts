import {
    Bundle,
    Node,
    SourceFile,
    TransformationContext,
    TransformFlags,
    VisitResult,
} from "../types";
import { visitEachChild } from "../visitorPublic";
import { chainBundle } from "./utilities";

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

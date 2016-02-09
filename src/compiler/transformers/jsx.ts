/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): JSX->React transformer
    export function transformJsx(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): Node {
            if (node.transformFlags & TransformFlags.Jsx) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsJsx) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node): Node {
            return node;
        }
    }
}
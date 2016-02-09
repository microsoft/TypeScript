/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): ES6->ES5 transformer
    export function transformES6(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): Node {
            if (node.transformFlags & TransformFlags.ES6) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES6) {
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
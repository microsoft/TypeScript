/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): ES7->ES6 transformer
    export function transformES7(context: TransformationContext) {
        const { hoistVariableDeclaration } = context;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): Node {
            if (node.transformFlags & TransformFlags.ES7) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES7) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node) {
            return node;
        }
    }
}
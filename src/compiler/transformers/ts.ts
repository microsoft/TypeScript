/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): TS->ES7 transformer
    export function transformTypeScript(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node) {
            if (node.transformFlags & TransformFlags.TypeScript) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
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
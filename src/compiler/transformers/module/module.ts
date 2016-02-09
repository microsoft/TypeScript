/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    // TODO(rbuckton): CommonJS/AMD/UMD transformer
    export function transformModule(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): Node {
            return node;
        }
    }
}
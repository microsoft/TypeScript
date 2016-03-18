/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES6Module(context: TransformationContext) {
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            return node;
        }
    }
}
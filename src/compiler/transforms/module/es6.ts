/// <reference path="./module.ts" />
/*@internal*/
namespace ts {
    export function createES6ModuleTransformation(transformer: Transformer): Transformation {
        return transformES6Module;

        function transformES6Module(node: SourceFile) {
            return node;
        }
    }
}
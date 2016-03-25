/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES6Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();

        let currentSourceFile: SourceFile;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                currentSourceFile = node;
                return visitEachChild(node, visitor, context);
            }
            return node;
        }

        function visitor(node: Node) {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node);
            }

            return node;
        }

        function visitImportDeclaration(node: ImportDeclaration) {
            if (node.importClause && !resolver.isReferencedAliasDeclaration(node.importClause, /*checkChildren*/ true)) {
                return undefined;
            }

            return node;
        }
    }
}
/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES6Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                return visitEachChild(node, visitor, context);
            }

            return node;
        }

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
            }

            return node;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<ImportEqualsDeclaration> {
            // Elide `import=` as it is not legal with --module ES6
            return undefined;
        }

        function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment> {
            // Elide `export=` as it is not legal with --module ES6
            return node.isExportEquals ? undefined : node;
        }
    }
}
/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES2015Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                const externalHelpersModuleName = getExternalHelpersModuleName(node);
                if (externalHelpersModuleName) {
                    const statements: Statement[] = [];
                    const statementOffset = addPrologueDirectives(statements, node.statements);
                    append(statements,
                        createImportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            createImportClause(/*name*/ undefined, createNamespaceImport(externalHelpersModuleName)),
                            createLiteral(externalHelpersModuleNameText)
                        )
                    );

                    addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
                    return updateSourceFileNode(
                        node,
                        createNodeArray(statements, node.statements));
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }

            return node;
        }

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    // Elide `import=` as it is not legal with --module ES6
                    return undefined;
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
            }

            return node;
        }

        function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment> {
            // Elide `export=` as it is not legal with --module ES6
            return node.isExportEquals ? undefined : node;
        }
    }
}

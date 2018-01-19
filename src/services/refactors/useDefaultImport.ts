/* @internal */
namespace ts.refactor.installTypesForPackage {
    const actionName = "Convert to default import";
    const description = getLocaleSpecificMessage(Diagnostics.Convert_to_default_import);
    registerRefactor(actionName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition, program } = context;

        if (!program.getCompilerOptions().allowSyntheticDefaultImports) {
            return undefined;
        }

        const importInfo = getConvertibleImportAtPosition(file, startPosition);
        if (!importInfo) {
            return undefined;
        }

        const module = getResolvedModule(file, importInfo.moduleSpecifier.text);
        const resolvedFile = program.getSourceFile(module.resolvedFileName);
        if (!(resolvedFile.externalModuleIndicator && isExportAssignment(resolvedFile.externalModuleIndicator) && resolvedFile.externalModuleIndicator.isExportEquals)) {
            return undefined;
        }

        return [
            {
                name: actionName,
                description,
                actions: [
                    {
                        description,
                        name: actionName,
                    },
                ],
            },
        ];
    }

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        Debug.assertEqual(actionName, _actionName);
        const importInfo = getConvertibleImportAtPosition(file, startPosition);
        if (!importInfo) {
            return undefined;
        }
        const { importStatement, name, moduleSpecifier } = importInfo;
        const newImportClause = createImportClause(name, /*namedBindings*/ undefined);
        const newImportStatement = createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, newImportClause, moduleSpecifier);
        return {
            edits: textChanges.ChangeTracker.with(context, t => t.replaceNode(file, importStatement, newImportStatement)),
            renameFilename: undefined,
            renameLocation: undefined,
        };
    }

    function getConvertibleImportAtPosition(
        file: SourceFile,
        startPosition: number,
    ): { importStatement: AnyImportSyntax, name: Identifier, moduleSpecifier: StringLiteral } | undefined {
        let node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        while (true) {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    const eq = node as ImportEqualsDeclaration;
                    const { moduleReference } = eq;
                    return moduleReference.kind === SyntaxKind.ExternalModuleReference && isStringLiteral(moduleReference.expression)
                        ? { importStatement: eq, name: eq.name, moduleSpecifier: moduleReference.expression }
                        : undefined;
                case SyntaxKind.ImportDeclaration:
                    const d = node as ImportDeclaration;
                    const { importClause } = d;
                    return !importClause.name && importClause.namedBindings.kind === SyntaxKind.NamespaceImport && isStringLiteral(d.moduleSpecifier)
                        ? { importStatement: d, name: importClause.namedBindings.name, moduleSpecifier: d.moduleSpecifier }
                        : undefined;
                // For known child node kinds of convertible imports, try again with parent node.
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.ExternalModuleReference:
                case SyntaxKind.ImportKeyword:
                case SyntaxKind.Identifier:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.AsteriskToken:
                    break;
                default:
                    return undefined;
            }
            node = node.parent;
        }
    }
}

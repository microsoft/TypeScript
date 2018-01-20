/* @internal */
namespace ts.refactor.installTypesForPackage {
    const refactorName = "Install missing types package";
    const actionName = "install";
    const description = "Install missing types package";
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (getStrictOptionValue(context.program.getCompilerOptions(), "noImplicitAny")) {
            // Then it will be available via `fixCannotFindModule`.
            return undefined;
        }

        const action = getAction(context);
        return action && [
            {
                name: refactorName,
                description,
                actions: [
                    {
                        description: action.description,
                        name: actionName,
                    },
                ],
            },
        ];
    }

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        Debug.assertEqual(actionName, _actionName);
        const action = getAction(context)!; // Should be defined if we said there was an action available.
        return {
            edits: [],
            renameFilename: undefined,
            renameLocation: undefined,
            commands: action.commands,
        };
    }

    function getAction(context: RefactorContext): CodeAction | undefined {
        const { file, startPosition } = context;
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        if (!isStringLiteral(node) || !isModuleIdentifier(node)) {
            return undefined;
        }

        const resolvedTo = getResolvedModule(file, node.text);
        // Still offer to install types if it resolved to e.g. a ".js" file.
        // `tryGetCodeActionForInstallPackageTypes` will verify that we're looking for a valid package name,
        // so the fix won't trigger for imports of ".js" files that couldn't be better replaced by typings.
        if (resolvedTo && extensionIsTypeScript(resolvedTo.extension)) {
            return undefined;
        }

        return codefix.tryGetCodeActionForInstallPackageTypes(context.host, file.fileName, node.text);
    }

    function isModuleIdentifier(node: StringLiteral): boolean {
        switch (node.parent.kind) {
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExternalModuleReference:
                return true;
            default:
                return false;
        }
    }
}

/* @internal */
namespace ts.refactor.installTypesForPackage {
    const actionName = "install";

    const installTypesForPackage: Refactor = {
        name: "Install missing types package",
        description: "Install missing types package",
        getEditsForAction,
        getAvailableActions,
    };

    registerRefactor(installTypesForPackage);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (getStrictOptionValue(context.program.getCompilerOptions(), "noImplicitAny")) {
            // Then it will be available via `fixCannotFindModule`.
            return undefined;
        }

        const action = getAction(context);
        return action && [
            {
                name: installTypesForPackage.name,
                description: installTypesForPackage.description,
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
        if (isStringLiteral(node) && isModuleIdentifier(node) && getResolvedModule(file, node.text) === undefined) {
            return codefix.tryGetCodeActionForInstallPackageTypes(context.host, file.fileName, node.text);
        }
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

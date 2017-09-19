/* @internal */
namespace ts.refactor.convertJSDocToTypes {
    const actionName = "convert";

    const convertJSDocToTypes: Refactor = {
        name: "Convert to Typescript type",
        description: Diagnostics.Convert_to_Typescript_type.message,
        getEditsForAction,
        getAvailableActions
    };

    registerRefactor(convertJSDocToTypes);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (isInJavaScriptFile(context.file)) {
            return undefined;
        }

        const node = getTokenAtPosition(context.file, context.startPosition, /*includeJsDocComment*/ false);
        // NB getJSDocType might not be cheap enough to call on everything here
        // TODO: Should be able to getJSDocType(node), not have to call on parent.
        //   or maybe I should just walk up until I hit something that has a .type and can have getJSDocType called on it
        const decl = findAncestor(node, isVariableLike);
        if (getJSDocType(decl) && !decl.type) { // && isKindThatIKnowHowToConvert(node)
            return [
                {
                    name: convertJSDocToTypes.name,
                    description: convertJSDocToTypes.description,
                    actions: [
                        {
                            description: convertJSDocToTypes.description,
                            name: actionName
                        }
                    ]
                }
            ];
        }
    }

    function getEditsForAction(context: RefactorContext, action: string): RefactorEditInfo | undefined {
        // Somehow wrong action got invoked?
        if (actionName !== action) {
            Debug.fail(`actionName !== action: ${actionName} !== ${action}`);
            return undefined;
        }

        const start = context.startPosition;
        const sourceFile = context.file;
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        const decl = findAncestor(token, isVariableLike);
        decl.kind
        const jsdocType = getJSDocType(decl);
        if (!jsdocType || decl.type) {
            Debug.fail(`!jsdocType || decl.type: !${jsdocType} || ${decl.type}`);
            return undefined;
        }

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        changeTracker.replaceNode(sourceFile, decl, createVariableDeclaration(decl.name as string | BindingName, jsdocType, decl.initializer));
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }
}

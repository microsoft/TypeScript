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
        const decl = findAncestor(node, isVariableLike);
        if (decl && getJSDocType(decl) && !decl.type) { // && isKindThatIKnowHowToConvert(node)
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
        const jsdocType = getJSDocType(decl);
        if (!decl || !jsdocType || decl.type) {
            Debug.fail(`!decl || !jsdocType || decl.type: !${decl} || !${jsdocType} || ${decl.type}`);
            return undefined;
        }

    // SyntaxKind.VariableDeclaration
    // SyntaxKind.Parameter
    // SyntaxKind.BindingElement
    // SyntaxKind.Property
    // SyntaxKind.PropertyAssignment
    // SyntaxKind.JsxAttribute
    // SyntaxKind.ShorthandPropertyAssignment
    // SyntaxKind.EnumMember
    // SyntaxKind.JSDocPropertyTag
    // SyntaxKind.JSDocParameterTag
        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        switch (decl.kind) {
            case SyntaxKind.VariableDeclaration:
                changeTracker.replaceNode(sourceFile, decl, createVariableDeclaration(decl.name as string | BindingName, jsdocType, decl.initializer));
                break;
            case SyntaxKind.Parameter:
                changeTracker.replaceNode(sourceFile, decl, createParameter(decl.decorators, decl.modifiers, decl.dotDotDotToken, decl.name as string | BindingName, decl.questionToken, jsdocType, decl.initializer));
                break;
            default:
                Debug.fail(`Unexpected SyntaxKind: ${decl.kind}`);
                return undefined;
        }
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }
}

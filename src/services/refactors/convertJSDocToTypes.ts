/* @internal */
namespace ts.refactor.convertJSDocToTypes {
    const actionName = "convert";

    const convertJSDocToTypes: Refactor = {
        name: "Convert to Typescript type",
        description: Diagnostics.Convert_to_Typescript_type.message,
        getEditsForAction,
        getAvailableActions
    };

    type Typed = FunctionLikeDeclaration | VariableDeclaration | ParameterDeclaration | PropertySignature | PropertyDeclaration;

    registerRefactor(convertJSDocToTypes);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (isInJavaScriptFile(context.file)) {
            return undefined;
        }

        const node = getTokenAtPosition(context.file, context.startPosition, /*includeJsDocComment*/ false);
        // NB getJSDocType might not be cheap enough to call on everything here
        const decl = findAncestor(node, isTypedNode);
        if (decl && getJSDocType(decl) && !decl.type) {
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

    function isTypedNode(node: Node): node is Typed {
        return isFunctionLikeDeclaration(node) ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.PropertySignature ||
            node.kind === SyntaxKind.PropertyDeclaration;
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
        // TODO: Cover @return for function declarations too (and arrows and function expressions and methods and get/set accessors)
        const decl = findAncestor(token, isTypedNode);
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
        changeTracker.replaceNode(sourceFile, decl, updateDeclaration(decl, jsdocType));
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }

    function updateDeclaration(decl: Typed, jsdocType: ts.TypeNode) {
        switch (decl.kind) {
            case SyntaxKind.VariableDeclaration:
                return createVariableDeclaration(decl.name, jsdocType, decl.initializer);
            case SyntaxKind.Parameter:
                return createParameter(decl.decorators, decl.modifiers, decl.dotDotDotToken, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.PropertySignature:
                return createPropertySignature(decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.PropertyDeclaration:
                return createProperty(decl.decorators, decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            default:
                Debug.fail(`Unexpected SyntaxKind: ${decl.kind}`);
                return undefined;
        }
    }
}

/* @internal */
namespace ts.refactor.convertJSDocToTypes {
    const actionName = "convert";

    const convertJSDocToTypes: Refactor = {
        name: "Convert to Typescript type",
        description: Diagnostics.Convert_to_Typescript_type.message,
        getEditsForAction,
        getAvailableActions
    };

    type Typed =
        | FunctionLikeDeclaration
        | VariableDeclaration
        | ParameterDeclaration
        | PropertySignature
        | PropertyDeclaration;

    registerRefactor(convertJSDocToTypes);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (isInJavaScriptFile(context.file)) {
            return undefined;
        }

        const node = getTokenAtPosition(context.file, context.startPosition, /*includeJsDocComment*/ false);
        // NB getJSDocType might not be cheap enough to call on everything here
        const decl = findAncestor(node, isTypedNode);
        if (decl && (getJSDocType(decl) || getJSDocReturnType(decl)) && !decl.type) {
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
        const decl = findAncestor(token, isTypedNode);
        const jsdocType = getJSDocType(decl);
        const jsdocReturn = getJSDocReturnType(decl);
        if (!decl || !jsdocType && !jsdocReturn || decl.type) {
            Debug.fail(`!decl || !jsdocType && !jsdocReturn || decl.type: !${decl} || !${jsdocType} && !{jsdocReturn} || ${decl.type}`);
            return undefined;
        }

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        changeTracker.replaceRange(sourceFile, { pos: decl.getStart(), end: decl.end }, replaceType(decl, jsdocType, jsdocReturn));
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }

    function isTypedNode(node: Node): node is Typed {
        return isFunctionLikeDeclaration(node) ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.PropertySignature ||
            node.kind === SyntaxKind.PropertyDeclaration;
    }

        //| FunctionDeclaration
        //| MethodDeclaration
        //| ConstructorDeclaration
        //| GetAccessorDeclaration
        //| SetAccessorDeclaration
        //| FunctionExpression
        //| ArrowFunction;
    function replaceType(decl: Typed, jsdocType: TypeNode, jsdocReturn: TypeNode) {
        switch (decl.kind) {
            case SyntaxKind.VariableDeclaration:
                return createVariableDeclaration(decl.name, jsdocType, decl.initializer);
            case SyntaxKind.Parameter:
                return createParameter(decl.decorators, decl.modifiers, decl.dotDotDotToken, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.PropertySignature:
                return createPropertySignature(decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.PropertyDeclaration:
                return createProperty(decl.decorators, decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.FunctionDeclaration:
                return createFunctionDeclaration(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, jsdocReturn, decl.body);
            case SyntaxKind.FunctionExpression:
                return createFunctionExpression(decl.modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, jsdocReturn, decl.body);
            default:
                Debug.fail(`Unexpected SyntaxKind: ${decl.kind}`);
                return undefined;
        }
    }
}

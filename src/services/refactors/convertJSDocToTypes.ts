/* @internal */
namespace ts.refactor.convertJSDocToTypes {
    const actionName = "annotate";

    const annotateTypeFromJSDoc: Refactor = {
        name: "Annotate with type from JSDoc",
        description: Diagnostics.Annotate_with_type_from_JSDoc.message,
        getEditsForAction,
        getAvailableActions
    };
    const annotateReturnTypeFromJSDoc: Refactor = {
        name: "Annotate with return type from JSDoc",
        description: Diagnostics.Annotate_with_return_type_from_JSDoc.message,
        getEditsForAction,
        getAvailableActions
    };

    type DeclarationWithType =
        | FunctionLikeDeclaration
        | VariableDeclaration
        | ParameterDeclaration
        | PropertySignature
        | PropertyDeclaration;

    registerRefactor(annotateTypeFromJSDoc);
    registerRefactor(annotateReturnTypeFromJSDoc);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (isInJavaScriptFile(context.file)) {
            return undefined;
        }

        const node = getTokenAtPosition(context.file, context.startPosition, /*includeJsDocComment*/ false);
        const decl = findAncestor(node, isTypedNode);
        if (decl && !decl.type) {
            const annotate = getJSDocType(decl) ? annotateTypeFromJSDoc :
                getJSDocReturnType(decl) ? annotateReturnTypeFromJSDoc :
                undefined;
            if (annotate) {
                return [{
                    name: annotate.name,
                    description: annotate.description,
                    actions: [
                        {
                        description: annotate.description,
                        name: actionName
                    }
                    ]
                }];
            }
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
        if (isParameterOfSimpleArrowFunction(decl)) {
            // `x => x` becomes `(x: number) => x`, but in order to make the changeTracker generate the parentheses,
            // we have to replace the entire function; it doesn't check that the node it's replacing might require
            // other syntax changes
            const arrow = decl.parent as ArrowFunction;
            const param = decl as ParameterDeclaration;
            const replacementParam = createParameter(param.decorators, param.modifiers, param.dotDotDotToken, param.name, param.questionToken, jsdocType, param.initializer);
            const replacement = createArrowFunction(arrow.modifiers, arrow.typeParameters, [replacementParam], arrow.type, arrow.equalsGreaterThanToken, arrow.body);
            changeTracker.replaceRange(sourceFile, { pos: arrow.getStart(), end: arrow.end }, replacement);
        }
        else {
            changeTracker.replaceRange(sourceFile, { pos: decl.getStart(), end: decl.end }, replaceType(decl, jsdocType, jsdocReturn));
        }
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }

    function isTypedNode(node: Node): node is DeclarationWithType {
        return isFunctionLikeDeclaration(node) ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.PropertySignature ||
            node.kind === SyntaxKind.PropertyDeclaration;
    }

    function replaceType(decl: DeclarationWithType, jsdocType: TypeNode, jsdocReturn: TypeNode) {
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
            case SyntaxKind.ArrowFunction:
                return createArrowFunction(decl.modifiers, decl.typeParameters, decl.parameters, jsdocReturn, decl.equalsGreaterThanToken, decl.body);
            case SyntaxKind.MethodDeclaration:
                return createMethod(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, decl.questionToken, decl.typeParameters, decl.parameters, jsdocReturn, decl.body);
            case SyntaxKind.GetAccessor:
                return createGetAccessor(decl.decorators, decl.modifiers, decl.name, decl.parameters, jsdocReturn, decl.body);
            default:
                Debug.fail(`Unexpected SyntaxKind: ${decl.kind}`);
                return undefined;
        }
    }

    function isParameterOfSimpleArrowFunction(decl: DeclarationWithType) {
        return decl.kind === SyntaxKind.Parameter && decl.parent.kind === SyntaxKind.ArrowFunction && isSimpleArrowFunction(decl.parent);
    }

    function isSimpleArrowFunction(parentNode: FunctionTypeNode | ArrowFunction | JSDocFunctionType) {
        const parameter = singleOrUndefined(parentNode.parameters);
        return parameter
            && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
            && !(isArrowFunction(parentNode) && parentNode.type) // arrow function may not have return type annotation
            && !some(parentNode.decorators)     // parent may not have decorators
            && !some(parentNode.modifiers)      // parent may not have modifiers
            && !some(parentNode.typeParameters) // parent may not have type parameters
            && !some(parameter.decorators)      // parameter may not have decorators
            && !some(parameter.modifiers)       // parameter may not have modifiers
            && !parameter.dotDotDotToken        // parameter may not be rest
            && !parameter.questionToken         // parameter may not be optional
            && !parameter.type                  // parameter may not have a type annotation
            && !parameter.initializer           // parameter may not have an initializer
            && isIdentifier(parameter.name);    // parameter name must be identifier
    }
}

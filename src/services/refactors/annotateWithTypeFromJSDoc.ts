/* @internal */
namespace ts.refactor.annotateWithTypeFromJSDoc {
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
        const jsdocType = getJSDocReturnType(decl) || getJSDocType(decl);
        if (!decl || !jsdocType || decl.type) {
            Debug.fail(`!decl || !jsdocType || decl.type: !${decl} || !${jsdocType} || ${decl.type}`);
            return undefined;
        }

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        if (isParameterOfSimpleArrowFunction(decl)) {
            // `x => x` becomes `(x: number) => x`, but in order to make the changeTracker generate the parentheses,
            // we have to replace the entire function; it doesn't check that the node it's replacing might require
            // other syntax changes
            const arrow = decl.parent as ArrowFunction;
            const param = decl as ParameterDeclaration;
            const replacementParam = createParameter(param.decorators, param.modifiers, param.dotDotDotToken, param.name, param.questionToken, transformJSDocType(jsdocType) as TypeNode, param.initializer);
            const replacement = createArrowFunction(arrow.modifiers, arrow.typeParameters, [replacementParam], arrow.type, arrow.equalsGreaterThanToken, arrow.body);
            changeTracker.replaceRange(sourceFile, { pos: arrow.getStart(), end: arrow.end }, replacement);
        }
        else {
            changeTracker.replaceRange(sourceFile, { pos: decl.getStart(), end: decl.end }, replaceType(decl, transformJSDocType(jsdocType) as TypeNode));
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

    function replaceType(decl: DeclarationWithType, jsdocType: TypeNode) {
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
                return createFunctionDeclaration(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, jsdocType, decl.body);
            case SyntaxKind.FunctionExpression:
                return createFunctionExpression(decl.modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, jsdocType, decl.body);
            case SyntaxKind.ArrowFunction:
                return createArrowFunction(decl.modifiers, decl.typeParameters, decl.parameters, jsdocType, decl.equalsGreaterThanToken, decl.body);
            case SyntaxKind.MethodDeclaration:
                return createMethod(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, decl.questionToken, decl.typeParameters, decl.parameters, jsdocType, decl.body);
            case SyntaxKind.GetAccessor:
                return createGetAccessor(decl.decorators, decl.modifiers, decl.name, decl.parameters, jsdocType, decl.body);
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

    function transformJSDocType(node: Node): Node | undefined {
        if (node === undefined) {
            return undefined;
        }
        switch (node.kind) {
            case SyntaxKind.JSDocAllType:
            case SyntaxKind.JSDocUnknownType:
                return createTypeReferenceNode("any", emptyArray);
            case SyntaxKind.JSDocOptionalType:
                return visitJSDocOptionalType(node as JSDocOptionalType);
            case SyntaxKind.JSDocNonNullableType:
                return transformJSDocType((node as JSDocNonNullableType).type);
            case SyntaxKind.JSDocNullableType:
                return visitJSDocNullableType(node as JSDocNullableType);
            case SyntaxKind.JSDocVariadicType:
                return visitJSDocVariadicType(node as JSDocVariadicType);
            case SyntaxKind.JSDocFunctionType:
                return visitJSDocFunctionType(node as JSDocFunctionType);
            case SyntaxKind.Parameter:
                return visitJSDocParameter(node as ParameterDeclaration);
            case SyntaxKind.TypeReference:
                return visitJSDocTypeReference(node as TypeReferenceNode);
            default:
                return visitEachChild(node, transformJSDocType, /*context*/ undefined) as TypeNode;
        }
    }

    function visitJSDocOptionalType(node: JSDocOptionalType) {
        return createUnionTypeNode([visitNode(node.type, transformJSDocType), createTypeReferenceNode("undefined", emptyArray)]);
    }

    function visitJSDocNullableType(node: JSDocNullableType) {
        return createUnionTypeNode([visitNode(node.type, transformJSDocType), createTypeReferenceNode("null", emptyArray)]);
    }

    function visitJSDocVariadicType(node: JSDocVariadicType) {
        return createArrayTypeNode(visitNode(node.type, transformJSDocType));
    }

    function visitJSDocFunctionType(node: JSDocFunctionType) {
        const parameters = node.parameters && node.parameters.map(transformJSDocType);
        return createFunctionTypeNode(emptyArray, parameters as ParameterDeclaration[], node.type);
    }

    function visitJSDocParameter(node: ParameterDeclaration) {
        const index = node.parent.parameters.indexOf(node);
        const isRest = node.type.kind === SyntaxKind.JSDocVariadicType && index === node.parent.parameters.length - 1;
        const name = node.name || (isRest ? "rest" : "arg" + index);
        const dotdotdot = isRest ? createToken(SyntaxKind.DotDotDotToken) : node.dotDotDotToken;
        return createParameter(node.decorators, node.modifiers, dotdotdot, name, node.questionToken, visitNode(node.type, transformJSDocType), node.initializer);
    }

    function visitJSDocTypeReference(node: TypeReferenceNode) {
        let name = node.typeName;
        let args = node.typeArguments;
        if (isIdentifier(node.typeName)) {
            let text = node.typeName.text;
            switch (node.typeName.text) {
                case "String":
                case "Boolean":
                case "Object":
                case "Number":
                    text = text.toLowerCase();
                    break;
                case "array":
                case "date":
                case "promise":
                    text = text[0].toUpperCase() + text.slice(1);
                    break;
            }
            name = createIdentifier(text);
            if ((text === "Array" || text === "Promise") && !node.typeArguments) {
                args = createNodeArray([createTypeReferenceNode("any", emptyArray)]);
            }
            else {
                args = visitNodes(node.typeArguments, transformJSDocType);
            }
        }
        return createTypeReferenceNode(name, args);
    }
}

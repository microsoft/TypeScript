/* @internal */
namespace ts.refactor.annotateWithTypeFromJSDoc {
    const actionName = "annotate";

    const annotateTypeFromJSDoc: Refactor = {
        name: "Annotate with type from JSDoc",
        description: Diagnostics.Annotate_with_type_from_JSDoc.message,
        getEditsForAction: getEditsForAnnotation,
        getAvailableActions
    };
    const annotateFunctionFromJSDoc: Refactor = {
        name: "Annotate with types from JSDoc",
        description: Diagnostics.Annotate_with_types_from_JSDoc.message,
        getEditsForAction: getEditsForFunctionAnnotation,
        getAvailableActions
    };

    type DeclarationWithType =
        | FunctionLikeDeclaration
        | VariableDeclaration
        | ParameterDeclaration
        | PropertySignature
        | PropertyDeclaration;

    registerRefactor(annotateTypeFromJSDoc);
    registerRefactor(annotateFunctionFromJSDoc);

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        if (isInJavaScriptFile(context.file)) {
            return undefined;
        }

        const node = getTokenAtPosition(context.file, context.startPosition, /*includeJsDocComment*/ false);
        const decl = findAncestor(node, isDeclarationWithType);
        if (!decl || decl.type) {
            return undefined;
        }
        const jsdocType = getJSDocType(decl);
        const isFunctionWithJSDoc = isFunctionLikeDeclaration(decl) && (getJSDocReturnType(decl) || decl.parameters.some(p => !!getJSDocType(p)));
        const refactor = (isFunctionWithJSDoc || jsdocType && decl.kind === SyntaxKind.Parameter) ? annotateFunctionFromJSDoc :
            jsdocType ? annotateTypeFromJSDoc :
            undefined;
        if (refactor) {
            return [{
                name: refactor.name,
                description: refactor.description,
                actions: [
                    {
                    description: refactor.description,
                    name: actionName
                }
                ]
            }];
        }
    }

    function getEditsForAnnotation(context: RefactorContext, action: string): RefactorEditInfo | undefined {
        if (actionName !== action) {
            return Debug.fail(`actionName !== action: ${actionName} !== ${action}`);
        }

        const sourceFile = context.file;
        const token = getTokenAtPosition(sourceFile, context.startPosition, /*includeJsDocComment*/ false);
        const decl = findAncestor(token, isDeclarationWithType);
        const jsdocType = getJSDocType(decl);
        if (!decl || !jsdocType || decl.type) {
            return Debug.fail(`!decl || !jsdocType || decl.type: !${decl} || !${jsdocType} || ${decl.type}`);
        }

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const declarationWithType = addType(decl, transformJSDocType(jsdocType) as TypeNode);
        suppressLeadingAndTrailingTrivia(declarationWithType);
        changeTracker.replaceRange(sourceFile, { pos: decl.getStart(), end: decl.end }, declarationWithType);
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }

    function getEditsForFunctionAnnotation(context: RefactorContext, action: string): RefactorEditInfo | undefined {
        if (actionName !== action) {
            return Debug.fail(`actionName !== action: ${actionName} !== ${action}`);
        }

        const sourceFile = context.file;
        const token = getTokenAtPosition(sourceFile, context.startPosition, /*includeJsDocComment*/ false);
        const decl = findAncestor(token, isFunctionLikeDeclaration);
        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        const functionWithType = addTypesToFunctionLike(decl);
        suppressLeadingAndTrailingTrivia(functionWithType);
        changeTracker.replaceRange(sourceFile, { pos: decl.getStart(), end: decl.end }, functionWithType);
        return {
            edits: changeTracker.getChanges(),
            renameFilename: undefined,
            renameLocation: undefined
        };
    }

    function isDeclarationWithType(node: Node): node is DeclarationWithType {
        return isFunctionLikeDeclaration(node) ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.PropertySignature ||
            node.kind === SyntaxKind.PropertyDeclaration;
    }

    function addTypesToFunctionLike(decl: FunctionLikeDeclaration) {
        const typeParameters = getEffectiveTypeParameterDeclarations(decl, /*checkJSDoc*/ true);
        const parameters = decl.parameters.map(
            p => createParameter(p.decorators, p.modifiers, p.dotDotDotToken, p.name, p.questionToken, transformJSDocType(getEffectiveTypeAnnotationNode(p, /*checkJSDoc*/ true)) as TypeNode, p.initializer));
        const returnType = transformJSDocType(getEffectiveReturnTypeNode(decl, /*checkJSDoc*/ true)) as TypeNode;
        switch (decl.kind) {
            case SyntaxKind.FunctionDeclaration:
                return createFunctionDeclaration(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, typeParameters, parameters, returnType, decl.body);
            case SyntaxKind.Constructor:
                return createConstructor(decl.decorators, decl.modifiers, parameters, decl.body);
            case SyntaxKind.FunctionExpression:
                return createFunctionExpression(decl.modifiers, decl.asteriskToken, (decl as FunctionExpression).name, typeParameters, parameters, returnType, decl.body);
            case SyntaxKind.ArrowFunction:
                return createArrowFunction(decl.modifiers, typeParameters, parameters, returnType, decl.equalsGreaterThanToken, decl.body);
            case SyntaxKind.MethodDeclaration:
                return createMethod(decl.decorators, decl.modifiers, decl.asteriskToken, decl.name, decl.questionToken, typeParameters, parameters, returnType, decl.body);
            case SyntaxKind.GetAccessor:
                return createGetAccessor(decl.decorators, decl.modifiers, decl.name, decl.parameters, returnType, decl.body);
            case SyntaxKind.SetAccessor:
                return createSetAccessor(decl.decorators, decl.modifiers, decl.name, parameters, decl.body);
            default:
                return Debug.assertNever(decl, `Unexpected SyntaxKind: ${(decl as any).kind}`);
        }
    }

    function addType(decl: DeclarationWithType, jsdocType: TypeNode) {
        switch (decl.kind) {
            case SyntaxKind.VariableDeclaration:
                return createVariableDeclaration(decl.name, jsdocType, decl.initializer);
            case SyntaxKind.PropertySignature:
                return createPropertySignature(decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            case SyntaxKind.PropertyDeclaration:
                return createProperty(decl.decorators, decl.modifiers, decl.name, decl.questionToken, jsdocType, decl.initializer);
            default:
                return Debug.fail(`Unexpected SyntaxKind: ${decl.kind}`);
        }
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
                return transformJSDocOptionalType(node as JSDocOptionalType);
            case SyntaxKind.JSDocNonNullableType:
                return transformJSDocType((node as JSDocNonNullableType).type);
            case SyntaxKind.JSDocNullableType:
                return transformJSDocNullableType(node as JSDocNullableType);
            case SyntaxKind.JSDocVariadicType:
                return transformJSDocVariadicType(node as JSDocVariadicType);
            case SyntaxKind.JSDocFunctionType:
                return transformJSDocFunctionType(node as JSDocFunctionType);
            case SyntaxKind.Parameter:
                return transformJSDocParameter(node as ParameterDeclaration);
            case SyntaxKind.TypeReference:
                return transformJSDocTypeReference(node as TypeReferenceNode);
            default:
                return visitEachChild(node, transformJSDocType, /*context*/ undefined) as TypeNode;
        }
    }

    function transformJSDocOptionalType(node: JSDocOptionalType) {
        return createUnionTypeNode([visitNode(node.type, transformJSDocType), createTypeReferenceNode("undefined", emptyArray)]);
    }

    function transformJSDocNullableType(node: JSDocNullableType) {
        return createUnionTypeNode([visitNode(node.type, transformJSDocType), createTypeReferenceNode("null", emptyArray)]);
    }

    function transformJSDocVariadicType(node: JSDocVariadicType) {
        return createArrayTypeNode(visitNode(node.type, transformJSDocType));
    }

    function transformJSDocFunctionType(node: JSDocFunctionType) {
        const parameters = node.parameters && node.parameters.map(transformJSDocType);
        return createFunctionTypeNode(emptyArray, parameters as ParameterDeclaration[], node.type);
    }

    function transformJSDocParameter(node: ParameterDeclaration) {
        const index = node.parent.parameters.indexOf(node);
        const isRest = node.type.kind === SyntaxKind.JSDocVariadicType && index === node.parent.parameters.length - 1;
        const name = node.name || (isRest ? "rest" : "arg" + index);
        const dotdotdot = isRest ? createToken(SyntaxKind.DotDotDotToken) : node.dotDotDotToken;
        return createParameter(node.decorators, node.modifiers, dotdotdot, name, node.questionToken, visitNode(node.type, transformJSDocType), node.initializer);
    }

    function transformJSDocTypeReference(node: TypeReferenceNode) {
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

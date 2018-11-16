/* @internal */
namespace ts.codefix {
    const fixId = "annotateWithTypeFromJSDoc";
    const errorCodes = [Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const decl = getDeclaration(context.sourceFile, context.span.start);
            if (!decl) return;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, decl));
            return [createCodeFixAction(fixId, changes, Diagnostics.Annotate_with_type_from_JSDoc, fixId, Diagnostics.Annotate_everything_with_types_from_JSDoc)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const decl = getDeclaration(diag.file, diag.start);
            if (decl) doChange(changes, diag.file, decl);
        }),
    });

    function getDeclaration(file: SourceFile, pos: number): DeclarationWithType | undefined {
        const name = getTokenAtPosition(file, pos);
        // For an arrow function with no name, 'name' lands on the first parameter.
        return tryCast(isParameter(name.parent) ? name.parent.parent : name.parent, parameterShouldGetTypeFromJSDoc);
    }

    type DeclarationWithType =
        | FunctionLikeDeclaration
        | VariableDeclaration
        | PropertySignature
        | PropertyDeclaration;

    export function parameterShouldGetTypeFromJSDoc(node: Node): node is DeclarationWithType {
        return isDeclarationWithType(node) && hasUsableJSDoc(node);
    }

    function hasUsableJSDoc(decl: DeclarationWithType | ParameterDeclaration): boolean {
        return isFunctionLikeDeclaration(decl)
            ? decl.parameters.some(hasUsableJSDoc) || (!decl.type && !!getJSDocReturnType(decl))
            : !decl.type && !!getJSDocType(decl);
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, decl: DeclarationWithType): void {
        if (isFunctionLikeDeclaration(decl) && (getJSDocReturnType(decl) || decl.parameters.some(p => !!getJSDocType(p)))) {
            if (!decl.typeParameters) {
                const typeParameters = getJSDocTypeParameterDeclarations(decl);
                if (typeParameters.length) changes.insertTypeParameters(sourceFile, decl, typeParameters);
            }
            const needParens = isArrowFunction(decl) && !findChildOfKind(decl, SyntaxKind.OpenParenToken, sourceFile);
            if (needParens) changes.insertNodeBefore(sourceFile, first(decl.parameters), createToken(SyntaxKind.OpenParenToken));
            for (const param of decl.parameters) {
                if (!param.type) {
                    const paramType = getJSDocType(param);
                    if (paramType) changes.tryInsertTypeAnnotation(sourceFile, param, transformJSDocType(paramType));
                }
            }
            if (needParens) changes.insertNodeAfter(sourceFile, last(decl.parameters), createToken(SyntaxKind.CloseParenToken));
            if (!decl.type) {
                const returnType = getJSDocReturnType(decl);
                if (returnType) changes.tryInsertTypeAnnotation(sourceFile, decl, transformJSDocType(returnType));
            }
        }
        else {
            const jsdocType = Debug.assertDefined(getJSDocType(decl)); // If not defined, shouldn't have been an error to fix
            Debug.assert(!decl.type); // If defined, shouldn't have been an error to fix.
            changes.tryInsertTypeAnnotation(sourceFile, decl, transformJSDocType(jsdocType));
        }
    }

    function isDeclarationWithType(node: Node): node is DeclarationWithType {
        return isFunctionLikeDeclaration(node) ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.PropertySignature ||
            node.kind === SyntaxKind.PropertyDeclaration;
    }

    function transformJSDocType(node: TypeNode): TypeNode {
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
            case SyntaxKind.TypeReference:
                return transformJSDocTypeReference(node as TypeReferenceNode);
            default:
                const visited = visitEachChild(node, transformJSDocType, /*context*/ undefined!); // TODO: GH#18217
                setEmitFlags(visited, EmitFlags.SingleLine);
                return visited;
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
        return createFunctionTypeNode(emptyArray, node.parameters.map(transformJSDocParameter), node.type);
    }

    function transformJSDocParameter(node: ParameterDeclaration) {
        const index = node.parent.parameters.indexOf(node);
        const isRest = node.type!.kind === SyntaxKind.JSDocVariadicType && index === node.parent.parameters.length - 1; // TODO: GH#18217
        const name = node.name || (isRest ? "rest" : "arg" + index);
        const dotdotdot = isRest ? createToken(SyntaxKind.DotDotDotToken) : node.dotDotDotToken;
        return createParameter(node.decorators, node.modifiers, dotdotdot, name, node.questionToken, visitNode(node.type, transformJSDocType), node.initializer);
    }

    function transformJSDocTypeReference(node: TypeReferenceNode) {
        let name = node.typeName;
        let args = node.typeArguments;
        if (isIdentifier(node.typeName)) {
            if (isJSDocIndexSignature(node)) {
                return transformJSDocIndexSignature(node);
            }
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

    function transformJSDocIndexSignature(node: TypeReferenceNode) {
        const index = createParameter(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            node.typeArguments![0].kind === SyntaxKind.NumberKeyword ? "n" : "s",
            /*questionToken*/ undefined,
            createTypeReferenceNode(node.typeArguments![0].kind === SyntaxKind.NumberKeyword ? "number" : "string", []),
            /*initializer*/ undefined);
        const indexSignature = createTypeLiteralNode([createIndexSignature(/*decorators*/ undefined, /*modifiers*/ undefined, [index], node.typeArguments![1])]);
        setEmitFlags(indexSignature, EmitFlags.SingleLine);
        return indexSignature;
    }
}

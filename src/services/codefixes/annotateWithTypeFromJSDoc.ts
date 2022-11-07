/* @internal */
namespace ts.codefix {
const fixId = "annotateWithTypeFromJSDoc";
const errorCodes = [ts.Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const decl = getDeclaration(context.sourceFile, context.span.start);
        if (!decl) return;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, decl));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Annotate_with_type_from_JSDoc, fixId, ts.Diagnostics.Annotate_everything_with_types_from_JSDoc)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const decl = getDeclaration(diag.file, diag.start);
        if (decl) doChange(changes, diag.file, decl);
    }),
});

function getDeclaration(file: ts.SourceFile, pos: number): DeclarationWithType | undefined {
    const name = ts.getTokenAtPosition(file, pos);
    // For an arrow function with no name, 'name' lands on the first parameter.
    return ts.tryCast(ts.isParameter(name.parent) ? name.parent.parent : name.parent, parameterShouldGetTypeFromJSDoc);
}

type DeclarationWithType =
    | ts.FunctionLikeDeclaration
    | ts.VariableDeclaration
    | ts.PropertySignature
    | ts.PropertyDeclaration;

export function parameterShouldGetTypeFromJSDoc(node: ts.Node): node is DeclarationWithType {
    return isDeclarationWithType(node) && hasUsableJSDoc(node);
}

function hasUsableJSDoc(decl: DeclarationWithType | ts.ParameterDeclaration): boolean {
    return ts.isFunctionLikeDeclaration(decl)
        ? decl.parameters.some(hasUsableJSDoc) || (!decl.type && !!ts.getJSDocReturnType(decl))
        : !decl.type && !!ts.getJSDocType(decl);
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, decl: DeclarationWithType): void {
    if (ts.isFunctionLikeDeclaration(decl) && (ts.getJSDocReturnType(decl) || decl.parameters.some(p => !!ts.getJSDocType(p)))) {
        if (!decl.typeParameters) {
            const typeParameters = ts.getJSDocTypeParameterDeclarations(decl);
            if (typeParameters.length) changes.insertTypeParameters(sourceFile, decl, typeParameters);
        }
        const needParens = ts.isArrowFunction(decl) && !ts.findChildOfKind(decl, ts.SyntaxKind.OpenParenToken, sourceFile);
        if (needParens) changes.insertNodeBefore(sourceFile, ts.first(decl.parameters), ts.factory.createToken(ts.SyntaxKind.OpenParenToken));
        for (const param of decl.parameters) {
            if (!param.type) {
                const paramType = ts.getJSDocType(param);
                if (paramType) changes.tryInsertTypeAnnotation(sourceFile, param, transformJSDocType(paramType));
            }
        }
        if (needParens) changes.insertNodeAfter(sourceFile, ts.last(decl.parameters), ts.factory.createToken(ts.SyntaxKind.CloseParenToken));
        if (!decl.type) {
            const returnType = ts.getJSDocReturnType(decl);
            if (returnType) changes.tryInsertTypeAnnotation(sourceFile, decl, transformJSDocType(returnType));
        }
    }
    else {
        const jsdocType = ts.Debug.checkDefined(ts.getJSDocType(decl), "A JSDocType for this declaration should exist"); // If not defined, shouldn't have been an error to fix
        ts.Debug.assert(!decl.type, "The JSDocType decl should have a type"); // If defined, shouldn't have been an error to fix.
        changes.tryInsertTypeAnnotation(sourceFile, decl, transformJSDocType(jsdocType));
    }
}

function isDeclarationWithType(node: ts.Node): node is DeclarationWithType {
    return ts.isFunctionLikeDeclaration(node) ||
        node.kind === ts.SyntaxKind.VariableDeclaration ||
        node.kind === ts.SyntaxKind.PropertySignature ||
        node.kind === ts.SyntaxKind.PropertyDeclaration;
}

function transformJSDocType(node: ts.TypeNode): ts.TypeNode {
    switch (node.kind) {
        case ts.SyntaxKind.JSDocAllType:
        case ts.SyntaxKind.JSDocUnknownType:
            return ts.factory.createTypeReferenceNode("any", ts.emptyArray);
        case ts.SyntaxKind.JSDocOptionalType:
            return transformJSDocOptionalType(node as ts.JSDocOptionalType);
        case ts.SyntaxKind.JSDocNonNullableType:
            return transformJSDocType((node as ts.JSDocNonNullableType).type);
        case ts.SyntaxKind.JSDocNullableType:
            return transformJSDocNullableType(node as ts.JSDocNullableType);
        case ts.SyntaxKind.JSDocVariadicType:
            return transformJSDocVariadicType(node as ts.JSDocVariadicType);
        case ts.SyntaxKind.JSDocFunctionType:
            return transformJSDocFunctionType(node as ts.JSDocFunctionType);
        case ts.SyntaxKind.TypeReference:
            return transformJSDocTypeReference(node as ts.TypeReferenceNode);
        case ts.SyntaxKind.JSDocTypeLiteral:
            return transformJSDocTypeLiteral(node as ts.JSDocTypeLiteral);
        default:
            const visited = ts.visitEachChild(node, transformJSDocType, ts.nullTransformationContext);
            ts.setEmitFlags(visited, ts.EmitFlags.SingleLine);
            return visited;
    }
}

function transformJSDocTypeLiteral(node: ts.JSDocTypeLiteral) {
    const typeNode = ts.factory.createTypeLiteralNode(ts.map(node.jsDocPropertyTags, tag =>
        ts.factory.createPropertySignature(
            /*modifiers*/ undefined,
            ts.isIdentifier(tag.name) ? tag.name : tag.name.right,
            ts.isOptionalJSDocPropertyLikeTag(tag) ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
            tag.typeExpression && ts.visitNode(tag.typeExpression.type, transformJSDocType) || ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword))));
    ts.setEmitFlags(typeNode, ts.EmitFlags.SingleLine);
    return typeNode;
}

function transformJSDocOptionalType(node: ts.JSDocOptionalType) {
    return ts.factory.createUnionTypeNode([ts.visitNode(node.type, transformJSDocType), ts.factory.createTypeReferenceNode("undefined", ts.emptyArray)]);
}

function transformJSDocNullableType(node: ts.JSDocNullableType) {
    return ts.factory.createUnionTypeNode([ts.visitNode(node.type, transformJSDocType), ts.factory.createTypeReferenceNode("null", ts.emptyArray)]);
}

function transformJSDocVariadicType(node: ts.JSDocVariadicType) {
    return ts.factory.createArrayTypeNode(ts.visitNode(node.type, transformJSDocType));
}

function transformJSDocFunctionType(node: ts.JSDocFunctionType) {
    // TODO: This does not properly handle `function(new:C, string)` per https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#the-javascript-type-language
    //       however we do handle it correctly in `serializeTypeForDeclaration` in checker.ts
    return ts.factory.createFunctionTypeNode(ts.emptyArray, node.parameters.map(transformJSDocParameter), node.type ?? ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword));
}

function transformJSDocParameter(node: ts.ParameterDeclaration) {
    const index = node.parent.parameters.indexOf(node);
    const isRest = node.type!.kind === ts.SyntaxKind.JSDocVariadicType && index === node.parent.parameters.length - 1; // TODO: GH#18217
    const name = node.name || (isRest ? "rest" : "arg" + index);
    const dotdotdot = isRest ? ts.factory.createToken(ts.SyntaxKind.DotDotDotToken) : node.dotDotDotToken;
    return ts.factory.createParameterDeclaration(node.modifiers, dotdotdot, name, node.questionToken, ts.visitNode(node.type, transformJSDocType), node.initializer);
}

function transformJSDocTypeReference(node: ts.TypeReferenceNode) {
    let name = node.typeName;
    let args = node.typeArguments;
    if (ts.isIdentifier(node.typeName)) {
        if (ts.isJSDocIndexSignature(node)) {
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
        name = ts.factory.createIdentifier(text);
        if ((text === "Array" || text === "Promise") && !node.typeArguments) {
            args = ts.factory.createNodeArray([ts.factory.createTypeReferenceNode("any", ts.emptyArray)]);
        }
        else {
            args = ts.visitNodes(node.typeArguments, transformJSDocType);
        }
    }
    return ts.factory.createTypeReferenceNode(name, args);
}

function transformJSDocIndexSignature(node: ts.TypeReferenceNode) {
    const index = ts.factory.createParameterDeclaration(
        /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined,
        node.typeArguments![0].kind === ts.SyntaxKind.NumberKeyword ? "n" : "s",
        /*questionToken*/ undefined,
        ts.factory.createTypeReferenceNode(node.typeArguments![0].kind === ts.SyntaxKind.NumberKeyword ? "number" : "string", []),
        /*initializer*/ undefined);
    const indexSignature = ts.factory.createTypeLiteralNode([ts.factory.createIndexSignature(/*modifiers*/ undefined, [index], node.typeArguments![1])]);
    ts.setEmitFlags(indexSignature, ts.EmitFlags.SingleLine);
    return indexSignature;
}
}

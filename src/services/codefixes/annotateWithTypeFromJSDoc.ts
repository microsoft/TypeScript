import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Debug,
    Diagnostics,
    EmitFlags,
    emptyArray,
    factory,
    findChildOfKind,
    first,
    FunctionLikeDeclaration,
    getJSDocReturnType,
    getJSDocType,
    getJSDocTypeParameterDeclarations,
    getTokenAtPosition,
    isArrowFunction,
    isFunctionLikeDeclaration,
    isIdentifier,
    isJSDocIndexSignature,
    isOptionalJSDocPropertyLikeTag,
    isParameter,
    isTypeNode,
    JSDocFunctionType,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocTypeLiteral,
    JSDocVariadicType,
    last,
    map,
    Node,
    ParameterDeclaration,
    PropertyDeclaration,
    PropertySignature,
    setEmitFlags,
    SourceFile,
    SyntaxKind,
    textChanges,
    tryCast,
    TypeReferenceNode,
    VariableDeclaration,
    visitEachChild,
    visitNode,
    visitNodes,
} from "../_namespaces/ts.js";

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
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const decl = getDeclaration(diag.file, diag.start);
            if (decl) doChange(changes, diag.file, decl);
        }),
});

function getDeclaration(file: SourceFile, pos: number): DeclarationWithType | undefined {
    const name = getTokenAtPosition(file, pos);
    // For an arrow function with no name, 'name' lands on the first parameter.
    return tryCast(isParameter(name.parent) ? name.parent.parent : name.parent, parameterShouldGetTypeFromJSDoc);
}

/** @internal */
export type DeclarationWithType =
    | FunctionLikeDeclaration
    | VariableDeclaration
    | PropertySignature
    | PropertyDeclaration;

/** @internal */
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
        if (needParens) changes.insertNodeBefore(sourceFile, first(decl.parameters), factory.createToken(SyntaxKind.OpenParenToken));
        for (const param of decl.parameters) {
            if (!param.type) {
                const paramType = getJSDocType(param);
                if (paramType) changes.tryInsertTypeAnnotation(sourceFile, param, visitNode(paramType, transformJSDocType, isTypeNode));
            }
        }
        if (needParens) changes.insertNodeAfter(sourceFile, last(decl.parameters), factory.createToken(SyntaxKind.CloseParenToken));
        if (!decl.type) {
            const returnType = getJSDocReturnType(decl);
            if (returnType) changes.tryInsertTypeAnnotation(sourceFile, decl, visitNode(returnType, transformJSDocType, isTypeNode));
        }
    }
    else {
        const jsdocType = Debug.checkDefined(getJSDocType(decl), "A JSDocType for this declaration should exist"); // If not defined, shouldn't have been an error to fix
        Debug.assert(!decl.type, "The JSDocType decl should have a type"); // If defined, shouldn't have been an error to fix.
        changes.tryInsertTypeAnnotation(sourceFile, decl, visitNode(jsdocType, transformJSDocType, isTypeNode));
    }
}

function isDeclarationWithType(node: Node): node is DeclarationWithType {
    return isFunctionLikeDeclaration(node) ||
        node.kind === SyntaxKind.VariableDeclaration ||
        node.kind === SyntaxKind.PropertySignature ||
        node.kind === SyntaxKind.PropertyDeclaration;
}

function transformJSDocType(node: Node): Node {
    switch (node.kind) {
        case SyntaxKind.JSDocAllType:
        case SyntaxKind.JSDocUnknownType:
            return factory.createTypeReferenceNode("any", emptyArray);
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
        case SyntaxKind.JSDocTypeLiteral:
            return transformJSDocTypeLiteral(node as JSDocTypeLiteral);
        default:
            const visited = visitEachChild(node, transformJSDocType, /*context*/ undefined);
            setEmitFlags(visited, EmitFlags.SingleLine);
            return visited;
    }
}

function transformJSDocTypeLiteral(node: JSDocTypeLiteral) {
    const typeNode = factory.createTypeLiteralNode(map(node.jsDocPropertyTags, tag =>
        factory.createPropertySignature(
            /*modifiers*/ undefined,
            isIdentifier(tag.name) ? tag.name : tag.name.right,
            isOptionalJSDocPropertyLikeTag(tag) ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
            tag.typeExpression && visitNode(tag.typeExpression.type, transformJSDocType, isTypeNode) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
        )));
    setEmitFlags(typeNode, EmitFlags.SingleLine);
    return typeNode;
}

function transformJSDocOptionalType(node: JSDocOptionalType) {
    return factory.createUnionTypeNode([visitNode(node.type, transformJSDocType, isTypeNode), factory.createTypeReferenceNode("undefined", emptyArray)]);
}

function transformJSDocNullableType(node: JSDocNullableType) {
    return factory.createUnionTypeNode([visitNode(node.type, transformJSDocType, isTypeNode), factory.createTypeReferenceNode("null", emptyArray)]);
}

function transformJSDocVariadicType(node: JSDocVariadicType) {
    return factory.createArrayTypeNode(visitNode(node.type, transformJSDocType, isTypeNode));
}

function transformJSDocFunctionType(node: JSDocFunctionType) {
    // TODO: This does not properly handle `function(new:C, string)` per https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#the-javascript-type-language
    //       however we do handle it correctly in `serializeTypeForDeclaration` in checker.ts
    return factory.createFunctionTypeNode(emptyArray, node.parameters.map(transformJSDocParameter), node.type ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
}

function transformJSDocParameter(node: ParameterDeclaration) {
    const index = node.parent.parameters.indexOf(node);
    const isRest = node.type!.kind === SyntaxKind.JSDocVariadicType && index === node.parent.parameters.length - 1; // TODO: GH#18217
    const name = node.name || (isRest ? "rest" : "arg" + index);
    const dotdotdot = isRest ? factory.createToken(SyntaxKind.DotDotDotToken) : node.dotDotDotToken;
    return factory.createParameterDeclaration(node.modifiers, dotdotdot, name, node.questionToken, visitNode(node.type, transformJSDocType, isTypeNode), node.initializer);
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
        name = factory.createIdentifier(text);
        if ((text === "Array" || text === "Promise") && !node.typeArguments) {
            args = factory.createNodeArray([factory.createTypeReferenceNode("any", emptyArray)]);
        }
        else {
            args = visitNodes(node.typeArguments, transformJSDocType, isTypeNode);
        }
    }
    return factory.createTypeReferenceNode(name, args);
}

function transformJSDocIndexSignature(node: TypeReferenceNode) {
    const index = factory.createParameterDeclaration(
        /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined,
        node.typeArguments![0].kind === SyntaxKind.NumberKeyword ? "n" : "s",
        /*questionToken*/ undefined,
        factory.createTypeReferenceNode(node.typeArguments![0].kind === SyntaxKind.NumberKeyword ? "number" : "string", []),
        /*initializer*/ undefined,
    );
    const indexSignature = factory.createTypeLiteralNode([factory.createIndexSignature(/*modifiers*/ undefined, [index], node.typeArguments![1])]);
    setEmitFlags(indexSignature, EmitFlags.SingleLine);
    return indexSignature;
}

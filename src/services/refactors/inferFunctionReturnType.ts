import { Diagnostics, RefactorContext, RefactorEditInfo, ApplicableRefactorInfo, emptyArray, FunctionDeclaration, FunctionExpression, ArrowFunction, MethodDeclaration, TypeNode, SourceFile, findChildOfKind, SyntaxKind, isArrowFunction, first, factory, isInJSFile, getTokenAtPosition, findAncestor, isBlock, getLocaleSpecificMessage, NodeBuilderFlags, Node, TypeChecker, Type, mapDefined } from "../ts";
import { registerRefactor, isRefactorErrorInfo, RefactorErrorInfo, refactorKindBeginsWith } from "../ts.refactor";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const refactorName = "Infer function return type";
/* @internal */
const refactorDescription = Diagnostics.Infer_function_return_type.message;

/* @internal */
const inferReturnTypeAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.rewrite.function.returnType"
};
/* @internal */
registerRefactor(refactorName, {
    kinds: [inferReturnTypeAction.kind],
    getEditsForAction,
    getAvailableActions
});

/* @internal */
function getEditsForAction(context: RefactorContext): RefactorEditInfo | undefined {
    const info = getInfo(context);
    if (info && !isRefactorErrorInfo(info)) {
        const edits = ChangeTracker.with(context, t => doChange(context.file, t, info.declaration, info.returnTypeNode));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }
    return undefined;
}

/* @internal */
function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
    const info = getInfo(context);
    if (!info)
        return emptyArray;
    if (!isRefactorErrorInfo(info)) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [inferReturnTypeAction]
        }];
    }
    if (context.preferences.provideRefactorNotApplicableReason) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [{ ...inferReturnTypeAction, notApplicableReason: info.error }]
        }];
    }
    return emptyArray;
}

/* @internal */
type ConvertibleDeclaration = FunctionDeclaration | FunctionExpression | ArrowFunction | MethodDeclaration;
/* @internal */

interface FunctionInfo {
    declaration: ConvertibleDeclaration;
    returnTypeNode: TypeNode;
}

/* @internal */
function doChange(sourceFile: SourceFile, changes: ChangeTracker, declaration: ConvertibleDeclaration, typeNode: TypeNode) {
    const closeParen = findChildOfKind(declaration, SyntaxKind.CloseParenToken, sourceFile);
    const needParens = isArrowFunction(declaration) && closeParen === undefined;
    const endNode = needParens ? first(declaration.parameters) : closeParen;
    if (endNode) {
        if (needParens) {
            changes.insertNodeBefore(sourceFile, endNode, factory.createToken(SyntaxKind.OpenParenToken));
            changes.insertNodeAfter(sourceFile, endNode, factory.createToken(SyntaxKind.CloseParenToken));
        }
        changes.insertNodeAt(sourceFile, endNode.end, typeNode, { prefix: ": " });
    }
}

/* @internal */
function getInfo(context: RefactorContext): FunctionInfo | RefactorErrorInfo | undefined {
    if (isInJSFile(context.file) || !refactorKindBeginsWith(inferReturnTypeAction.kind, context.kind))
        return;

    const token = getTokenAtPosition(context.file, context.startPosition);
    const declaration = findAncestor(token, n => isBlock(n) || n.parent && isArrowFunction(n.parent) && (n.kind === SyntaxKind.EqualsGreaterThanToken || n.parent.body === n) ? "quit" :
            isConvertibleDeclaration(n)) as ConvertibleDeclaration | undefined;
    if (!declaration || !declaration.body || declaration.type) {
        return { error: getLocaleSpecificMessage(Diagnostics.Return_type_must_be_inferred_from_a_function) };
    }

    const typeChecker = context.program.getTypeChecker();
    const returnType = tryGetReturnType(typeChecker, declaration);
    if (!returnType) {
        return { error: getLocaleSpecificMessage(Diagnostics.Could_not_determine_function_return_type) };
    }

    const returnTypeNode = typeChecker.typeToTypeNode(returnType, declaration, NodeBuilderFlags.NoTruncation);
    if (returnTypeNode) {
        return { declaration, returnTypeNode };
    }
}

/* @internal */
function isConvertibleDeclaration(node: Node): node is ConvertibleDeclaration {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
            return true;
        default:
            return false;
    }
}

/* @internal */
function tryGetReturnType(typeChecker: TypeChecker, node: ConvertibleDeclaration): Type | undefined {
    if (typeChecker.isImplementationOfOverload(node)) {
        const signatures = typeChecker.getTypeAtLocation(node).getCallSignatures();
        if (signatures.length > 1) {
            return typeChecker.getUnionType(mapDefined(signatures, s => s.getReturnType()));
        }
    }
    const signature = typeChecker.getSignatureFromDeclaration(node);
    if (signature) {
        return typeChecker.getReturnTypeOfSignature(signature);
    }
}

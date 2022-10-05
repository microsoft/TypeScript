/* @internal */
namespace ts.refactor.inferFunctionReturnType {
const refactorName = "Infer function return type";
const refactorDescription = ts.Diagnostics.Infer_function_return_type.message;

const inferReturnTypeAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.rewrite.function.returnType"
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [inferReturnTypeAction.kind],
    getEditsForAction: getRefactorEditsToInferReturnType,
    getAvailableActions: getRefactorActionsToInferReturnType
});

function getRefactorEditsToInferReturnType(context: ts.RefactorContext): ts.RefactorEditInfo | undefined {
    const info = getInfo(context);
    if (info && !ts.refactor.isRefactorErrorInfo(info)) {
        const edits = ts.textChanges.ChangeTracker.with(context, t => doChange(context.file, t, info.declaration, info.returnTypeNode));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }
    return undefined;
}

function getRefactorActionsToInferReturnType(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const info = getInfo(context);
    if (!info) return ts.emptyArray;
    if (!ts.refactor.isRefactorErrorInfo(info)) {
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
    return ts.emptyArray;
}

type ConvertibleDeclaration =
    | ts.FunctionDeclaration
    | ts.FunctionExpression
    | ts.ArrowFunction
    | ts.MethodDeclaration;

interface FunctionInfo {
    declaration: ConvertibleDeclaration;
    returnTypeNode: ts.TypeNode;
}

function doChange(sourceFile: ts.SourceFile, changes: ts.textChanges.ChangeTracker, declaration: ConvertibleDeclaration, typeNode: ts.TypeNode) {
    const closeParen = ts.findChildOfKind(declaration, ts.SyntaxKind.CloseParenToken, sourceFile);
    const needParens = ts.isArrowFunction(declaration) && closeParen === undefined;
    const endNode = needParens ? ts.first(declaration.parameters) : closeParen;
    if (endNode) {
        if (needParens) {
            changes.insertNodeBefore(sourceFile, endNode, ts.factory.createToken(ts.SyntaxKind.OpenParenToken));
            changes.insertNodeAfter(sourceFile, endNode, ts.factory.createToken(ts.SyntaxKind.CloseParenToken));
        }
        changes.insertNodeAt(sourceFile, endNode.end, typeNode, { prefix: ": " });
    }
}

function getInfo(context: ts.RefactorContext): FunctionInfo | ts.refactor.RefactorErrorInfo | undefined {
    if (ts.isInJSFile(context.file) || !ts.refactor.refactorKindBeginsWith(inferReturnTypeAction.kind, context.kind)) return;

    const token = ts.getTokenAtPosition(context.file, context.startPosition);
    const declaration = ts.findAncestor(token, n =>
        ts.isBlock(n) || n.parent && ts.isArrowFunction(n.parent) && (n.kind === ts.SyntaxKind.EqualsGreaterThanToken || n.parent.body === n) ? "quit" :
            isConvertibleDeclaration(n)) as ConvertibleDeclaration | undefined;
    if (!declaration || !declaration.body || declaration.type) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Return_type_must_be_inferred_from_a_function) };
    }

    const typeChecker = context.program.getTypeChecker();
    const returnType = tryGetReturnType(typeChecker, declaration);
    if (!returnType) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_determine_function_return_type) };
    }

    const returnTypeNode = typeChecker.typeToTypeNode(returnType, declaration, ts.NodeBuilderFlags.NoTruncation);
    if (returnTypeNode) {
        return { declaration, returnTypeNode };
    }
}

function isConvertibleDeclaration(node: ts.Node): node is ConvertibleDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.MethodDeclaration:
            return true;
        default:
            return false;
    }
}

function tryGetReturnType(typeChecker: ts.TypeChecker, node: ConvertibleDeclaration): ts.Type | undefined {
    if (typeChecker.isImplementationOfOverload(node)) {
        const signatures = typeChecker.getTypeAtLocation(node).getCallSignatures();
        if (signatures.length > 1) {
            return typeChecker.getUnionType(ts.mapDefined(signatures, s => s.getReturnType()));
        }
    }
    const signature = typeChecker.getSignatureFromDeclaration(node);
    if (signature) {
        return typeChecker.getReturnTypeOfSignature(signature);
    }
}
}

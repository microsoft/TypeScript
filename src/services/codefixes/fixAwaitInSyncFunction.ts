/* @internal */
namespace ts.codefix {
    const fixId = "fixAwaitInSyncFunction";
    const errorCodes = [
        Diagnostics.await_expression_is_only_allowed_within_an_async_function.code,
        Diagnostics.A_for_await_of_statement_is_only_allowed_within_an_async_function_or_async_generator.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const token = getTokenAtPosition(sourceFile, span.start, /*includeJsDocComment*/ false);
            const containingFunction = getContainingFunction(token);
            const insertBefore = getNodeToInsertBefore(sourceFile, containingFunction);
            const returnType = getReturnTypeNode(containingFunction);
            if (!insertBefore) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, insertBefore, returnType));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Convert_to_async), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const token = getTokenAtPosition(diag.file, diag.start!, /*includeJsDocComment*/ false);
            const containingFunction = getContainingFunction(token);
            const insertBefore = getNodeToInsertBefore(diag.file, containingFunction);
            const returnType = getReturnTypeNode(containingFunction);
            if (insertBefore) {
                doChange(changes, context.sourceFile, insertBefore, returnType);
            }
        }),
    });

    function getReturnTypeNode(containingFunction: FunctionLike): TypeNode | undefined {
        switch (containingFunction.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.FunctionDeclaration:
                return containingFunction.type;
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                if (isVariableDeclaration(containingFunction.parent) &&
                    containingFunction.parent.type &&
                    isFunctionTypeNode(containingFunction.parent.type)) {
                    return containingFunction.parent.type.type;
                }
        }
    }

    function getNodeToInsertBefore(sourceFile: SourceFile, containingFunction: FunctionLike): Node | undefined {
        switch (containingFunction.kind) {
            case SyntaxKind.MethodDeclaration:
                return containingFunction.name;
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
                return findChildOfKind(containingFunction, SyntaxKind.FunctionKeyword, sourceFile);
            case SyntaxKind.ArrowFunction:
                return findChildOfKind(containingFunction, SyntaxKind.OpenParenToken, sourceFile) || first(containingFunction.parameters);
            default:
                return undefined;
        }
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, insertBefore: Node, returnType: TypeNode | undefined): void {
        if (returnType) {
            const entityName = getEntityNameFromTypeNode(returnType);
            if (!entityName || entityName.getText() !== "Promise") {
                changes.replaceNode(sourceFile, returnType, createTypeReferenceNode("Promise", createNodeArray([returnType])));
            }
        }
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, insertBefore);
    }
}

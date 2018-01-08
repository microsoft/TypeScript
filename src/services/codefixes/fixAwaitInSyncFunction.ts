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
            const node = getNodeToInsertBefore(sourceFile, span.start);
            if (!node) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Convert_to_async), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            doChange(changes, context.sourceFile, getNodeToInsertBefore(diag.file, diag.start!))),
    });

    function getNodeToInsertBefore(sourceFile: SourceFile, pos: number): Node | undefined {//name
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        const containingFunction = getContainingFunction(token);
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

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, insertBefore: Node): void {
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, insertBefore);
    }
}

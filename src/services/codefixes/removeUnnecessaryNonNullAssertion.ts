/* @internal */
namespace ts.codefix {
    const fixId = "removeUnnecessaryNonNullAssertion";
    const errorCodes = [Diagnostics.This_non_null_assertion_operator_is_unnecessary_for_type_1.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const qualifiedName = getNonNullAssertion(context.sourceFile, context.span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, qualifiedName));
            return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unnecessary_non_null_assertion_operator, fixId, Diagnostics.Remove_all_unnecessary_non_null_assertion_operators)];
        },
        fixIds: [fixId],
        getAllCodeActions: (context) => codeFixAll(context, errorCodes, (changes, diag) => {
            const q = getNonNullAssertion(diag.file, diag.start);
            if (q) {
                doChange(changes, diag.file, q);
            }
        }),
    });

    function getNonNullAssertion(sourceFile: SourceFile, pos: number): NonNullExpression {
        const qualifiedName = findAncestor(getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ true), isNonNullExpression)!;
        Debug.assert(!!qualifiedName, "Expected position to be owned by a non-null expression.");
        return qualifiedName;
    }

    function doChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, nonNullExpression: NonNullExpression): void {
        const expr = nonNullExpression.expression;
        changeTracker.replaceNode(sourceFile, nonNullExpression, expr);
    }
}

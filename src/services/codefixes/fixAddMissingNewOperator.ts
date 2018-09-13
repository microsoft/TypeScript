/* @internal */
namespace ts.codefix {
    const fixId = "addMissingNewOperator";
    const errorCodes = [Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const changes = textChanges.ChangeTracker.with(context, t => addMissingNewOperator(t, sourceFile, span));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_new_operator_to_call, fixId, Diagnostics.Add_missing_new_operator_to_all_calls)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            addMissingNewOperator(changes, context.sourceFile, diag)),
    });

    function addMissingNewOperator(changes: textChanges.ChangeTracker, sourceFile: SourceFile, span: TextSpan): void {
        const call = cast(findAncestorMatchingSpan(sourceFile, span), isCallExpression);
        changes.insertNodeAt(sourceFile, span.start, createToken(SyntaxKind.NewKeyword), { suffix: " " });
        if (isCallExpression(call.expression)) {
            changes.insertNodeAt(sourceFile, call.expression.getStart(sourceFile), createToken(SyntaxKind.OpenParenToken));
            changes.insertNodeAt(sourceFile, call.expression.end, createToken(SyntaxKind.CloseParenToken));
        }
    }

    function findAncestorMatchingSpan(sourceFile: SourceFile, span: TextSpan): Node {
        let token = getTokenAtPosition(sourceFile, span.start);
        const end = textSpanEnd(span);
        while (token.end < end) {
            token = token.parent;
        }
        return token;
    }
}

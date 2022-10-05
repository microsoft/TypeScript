/* @internal */
namespace ts.codefix {
const fixId = "addMissingNewOperator";
const errorCodes = [ts.Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const changes = ts.textChanges.ChangeTracker.with(context, t => addMissingNewOperator(t, sourceFile, span));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_missing_new_operator_to_call, fixId, ts.Diagnostics.Add_missing_new_operator_to_all_calls)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) =>
        addMissingNewOperator(changes, context.sourceFile, diag)),
});

function addMissingNewOperator(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, span: ts.TextSpan): void {
    const call = ts.cast(findAncestorMatchingSpan(sourceFile, span), ts.isCallExpression);
    const newExpression = ts.factory.createNewExpression(call.expression, call.typeArguments, call.arguments);

    changes.replaceNode(sourceFile, call, newExpression);
}

function findAncestorMatchingSpan(sourceFile: ts.SourceFile, span: ts.TextSpan): ts.Node {
    let token = ts.getTokenAtPosition(sourceFile, span.start);
    const end = ts.textSpanEnd(span);
    while (token.end < end) {
        token = token.parent;
    }
    return token;
}
}

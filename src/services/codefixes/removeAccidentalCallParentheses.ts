import * as ts from "../_namespaces/ts";

const fixId = "removeAccidentalCallParentheses";
const errorCodes = [
    ts.Diagnostics.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without.code,
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const callExpression = ts.findAncestor(ts.getTokenAtPosition(context.sourceFile, context.span.start), ts.isCallExpression);
        if (!callExpression) {
            return undefined;
        }
        const changes = ts.textChanges.ChangeTracker.with(context, t => {
            t.deleteRange(context.sourceFile, { pos: callExpression.expression.end, end: callExpression.end });
        });
        return [ts.codefix.createCodeFixActionWithoutFixAll(fixId, changes, ts.Diagnostics.Remove_parentheses)];
    },
    fixIds: [fixId],
});

import { Diagnostics, findAncestor, getTokenAtPosition, isCallExpression } from "../ts";
import { registerCodeFix, createCodeFixActionWithoutFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "removeAccidentalCallParentheses";
/* @internal */
const errorCodes = [
    Diagnostics.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without.code,
];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const callExpression = findAncestor(getTokenAtPosition(context.sourceFile, context.span.start), isCallExpression);
        if (!callExpression) {
            return undefined;
        }
        const changes = ChangeTracker.with(context, t => {
            t.deleteRange(context.sourceFile, { pos: callExpression.expression.end, end: callExpression.end });
        });
        return [createCodeFixActionWithoutFixAll(fixId, changes, Diagnostics.Remove_parentheses)];
    },
    fixIds: [fixId],
});

/* @internal */

import { registerCodeFix, createCodeFixActionWithoutFixAll } from "../codeFixProvider";
import { findAncestor } from "../../compiler/utilities";
import { getTokenAtPosition } from "../utilities";
import { isCallExpression } from "../../../built/local/compiler";

    const fixId = "removeAccidentalCallParentheses";
    const errorCodes = [
        Diagnostics.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const callExpression = findAncestor(getTokenAtPosition(context.sourceFile, context.span.start), isCallExpression);
            if (!callExpression) {
                return undefined;
            }
            const changes = textChanges.ChangeTracker.with(context, t => {
                t.deleteRange(context.sourceFile, { pos: callExpression.expression.end, end: callExpression.end });
            });
            return [createCodeFixActionWithoutFixAll(fixId, changes, Diagnostics.Remove_parentheses)];
        },
        fixIds: [fixId],
    });


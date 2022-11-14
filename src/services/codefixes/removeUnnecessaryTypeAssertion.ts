import {
    Diagnostics, findAncestor, isAssertionExpression, isInJSDoc, Node,
    isParenthesizedExpression, ParenthesizedExpression, SourceFile, textChanges, TextSpan, tryCast, HasJSDoc, first, last, needsParentheses, isNonNullExpression, AssertionExpression, NonNullExpression,
} from "../_namespaces/ts";
import { codeFixAll, createCodeFixAction, findAncestorMatchingSpan, registerCodeFix } from "../_namespaces/ts.codefix";

const fixId = "removeUnnecessaryTypeAssertion";
const errorCodes = [
    Diagnostics.Type_assertion_has_no_effect_on_the_type_of_this_expression.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToRemoveUnnecessaryTypeAssertion(context) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unnecessary_type_assertion, fixId, Diagnostics.Remove_all_unnecessary_type_assertions)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, span: TextSpan) {
    let node: Node | undefined = findAncestorMatchingSpan(sourceFile, span);
    if (node && isInJSDoc(node)) {
        node = findAncestor(node, isParenthesizedExpression);
        if (node) {
            changeTracker.deleteNodeRange(sourceFile, first((node as HasJSDoc).jsDoc!), last((node as HasJSDoc).jsDoc!));
            if (!needsParentheses((node as ParenthesizedExpression).expression)) {
                changeTracker.replaceNode(sourceFile, node, (node as ParenthesizedExpression).expression);
            }
        }
        return;
    }
    const castExpr = tryCast(node, (n): n is AssertionExpression | NonNullExpression => isAssertionExpression(n) || isNonNullExpression(n));
    if (!castExpr) {
        return;
    }

    changeTracker.replaceNode(sourceFile, castExpr, castExpr.expression);
}

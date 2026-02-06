import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    AwaitKeyword,
    Diagnostics,
    findPrecedingToken,
    getLeftmostExpression,
    getTokenAtPosition,
    isAwaitExpression,
    isIdentifier,
    isParenthesizedExpression,
    Node,
    SourceFile,
    SyntaxKind,
    textChanges,
    TextSpan,
    tryCast,
} from "../_namespaces/ts.js";

const fixId = "removeUnnecessaryAwait";
const errorCodes = [
    Diagnostics.await_has_no_effect_on_the_type_of_this_expression.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToRemoveUnnecessaryAwait(context) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unnecessary_await, fixId, Diagnostics.Remove_all_unnecessary_uses_of_await)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, span: TextSpan) {
    const awaitKeyword = tryCast(getTokenAtPosition(sourceFile, span.start), (node): node is AwaitKeyword => node.kind === SyntaxKind.AwaitKeyword);
    const awaitExpression = awaitKeyword && tryCast(awaitKeyword.parent, isAwaitExpression);
    if (!awaitExpression) {
        return;
    }

    let expressionToReplace: Node = awaitExpression;
    const hasSurroundingParens = isParenthesizedExpression(awaitExpression.parent);
    if (hasSurroundingParens) {
        const leftMostExpression = getLeftmostExpression(awaitExpression.expression, /*stopAtCallExpressions*/ false);
        if (isIdentifier(leftMostExpression)) {
            const precedingToken = findPrecedingToken(awaitExpression.parent.pos, sourceFile);
            if (precedingToken && precedingToken.kind !== SyntaxKind.NewKeyword) {
                expressionToReplace = awaitExpression.parent;
            }
        }
    }

    changeTracker.replaceNode(sourceFile, expressionToReplace, awaitExpression.expression);
}

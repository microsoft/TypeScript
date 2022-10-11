/* @internal */
namespace ts.codefix {
const fixId = "removeUnnecessaryAwait";
const errorCodes = [
    ts.Diagnostics.await_has_no_effect_on_the_type_of_this_expression.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToRemoveUnnecessaryAwait(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Remove_unnecessary_await, fixId, ts.Diagnostics.Remove_all_unnecessary_uses_of_await)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, span: ts.TextSpan) {
    const awaitKeyword = ts.tryCast(ts.getTokenAtPosition(sourceFile, span.start), (node): node is ts.AwaitKeywordToken => node.kind === ts.SyntaxKind.AwaitKeyword);
    const awaitExpression = awaitKeyword && ts.tryCast(awaitKeyword.parent, ts.isAwaitExpression);
    if (!awaitExpression) {
        return;
    }

    let expressionToReplace: ts.Node = awaitExpression;
    const hasSurroundingParens = ts.isParenthesizedExpression(awaitExpression.parent);
    if (hasSurroundingParens) {
        const leftMostExpression = ts.getLeftmostExpression(awaitExpression.expression, /*stopAtCallExpressions*/ false);
        if (ts.isIdentifier(leftMostExpression)) {
            const precedingToken = ts.findPrecedingToken(awaitExpression.parent.pos, sourceFile);
            if (precedingToken && precedingToken.kind !== ts.SyntaxKind.NewKeyword) {
                expressionToReplace = awaitExpression.parent;
            }
        }
    }

    changeTracker.replaceNode(sourceFile, expressionToReplace, awaitExpression.expression);
}
}

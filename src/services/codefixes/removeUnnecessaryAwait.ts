/* @internal */
namespace ts.codefix {
    const fixId = "removeUnnecessaryAwait";
    const errorCodes = [
        Diagnostics.await_has_no_effect_on_the_type_of_this_expression.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
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
        const awaitKeyword = tryCast(getTokenAtPosition(sourceFile, span.start), (node): node is AwaitKeywordToken => node.kind === SyntaxKind.AwaitKeyword);
        const awaitExpression = awaitKeyword && tryCast(awaitKeyword.parent, isAwaitExpression);
        if (!awaitExpression) {
            return;
        }

        const parenthesizedExpression = tryCast(awaitExpression.parent, isParenthesizedExpression);
        // (await 0).toFixed() should keep its parens (or add an extra dot for 0..toFixed())
        if (parenthesizedExpression && isPropertyAccessExpression(parenthesizedExpression.parent) && isDecimalIntegerLiteral(awaitExpression.expression)) {
            changeTracker.replaceNode(sourceFile, awaitExpression, awaitExpression.expression);
        }
        else {
            changeTracker.replaceNode(sourceFile, parenthesizedExpression || awaitExpression, awaitExpression.expression);
        }
    }
}

import * as ts from "../_namespaces/ts";

const fixId = "useBigintLiteral";
const errorCodes = [
    ts.Diagnostics.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToUseBigintLiteral(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_to_a_bigint_numeric_literal, fixId, ts.Diagnostics.Convert_all_to_bigint_numeric_literals)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, span: ts.TextSpan) {
    const numericLiteral = ts.tryCast(ts.getTokenAtPosition(sourceFile, span.start), ts.isNumericLiteral);
    if (!numericLiteral) {
        return;
    }

    // We use .getText to overcome parser inaccuracies: https://github.com/microsoft/TypeScript/issues/33298
    const newText = numericLiteral.getText(sourceFile) + "n";

    changeTracker.replaceNode(sourceFile, numericLiteral, ts.factory.createBigIntLiteral(newText));
}

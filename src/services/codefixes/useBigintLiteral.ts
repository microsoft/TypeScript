import { Diagnostics, SourceFile, TextSpan, tryCast, getTokenAtPosition, isNumericLiteral, createBigIntLiteral } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "useBigintLiteral";
/* @internal */
const errorCodes = [
    Diagnostics.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers.code,
];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const changes = ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_a_bigint_numeric_literal, fixId, Diagnostics.Convert_all_to_bigint_numeric_literals)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});
/* @internal */
function makeChange(changeTracker: ChangeTracker, sourceFile: SourceFile, span: TextSpan) {
    const numericLiteral = tryCast(getTokenAtPosition(sourceFile, span.start), isNumericLiteral);
    if (!numericLiteral) {
        return;
    }
    // We use .getText to overcome parser inaccuracies: https://github.com/microsoft/TypeScript/issues/33298
    const newText = numericLiteral.getText(sourceFile) + "n";
    changeTracker.replaceNode(sourceFile, numericLiteral, createBigIntLiteral(newText));
}

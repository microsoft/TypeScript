import { tryCast } from "../../compiler/core";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { isNumericLiteral } from "../../compiler/factory/nodeTests";
import {
    SourceFile,
    TextSpan,
} from "../../compiler/types";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import { getTokenAtPosition } from "../utilities";

const fixId = "useBigintLiteral";
const errorCodes = [
    Diagnostics.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToUseBigintLiteral(context) {
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

function makeChange(changeTracker: ChangeTracker, sourceFile: SourceFile, span: TextSpan) {
    const numericLiteral = tryCast(getTokenAtPosition(sourceFile, span.start), isNumericLiteral);
    if (!numericLiteral) {
        return;
    }

    // We use .getText to overcome parser inaccuracies: https://github.com/microsoft/TypeScript/issues/33298
    const newText = numericLiteral.getText(sourceFile) + "n";
    changeTracker.replaceNode(sourceFile, numericLiteral, factory.createBigIntLiteral(newText));
}

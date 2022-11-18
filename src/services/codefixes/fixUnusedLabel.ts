import { cast } from "../../compiler/core";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { isLabeledStatement } from "../../compiler/factory/nodeTests";
import { skipTrivia } from "../../compiler/scanner";
import {
    SourceFile,
    SyntaxKind,
} from "../../compiler/types";
import { positionsAreOnSameLine } from "../../compiler/utilities";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import {
    findChildOfKind,
    getTokenAtPosition,
} from "../utilities";

const fixId = "fixUnusedLabel";
const errorCodes = [Diagnostics.Unused_label.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unused_label, fixId, Diagnostics.Remove_all_unused_labels)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start)),
});

function doChange(changes: ChangeTracker, sourceFile: SourceFile, start: number): void {
    const token = getTokenAtPosition(sourceFile, start);
    const labeledStatement = cast(token.parent, isLabeledStatement);
    const pos = token.getStart(sourceFile);
    const statementPos = labeledStatement.statement.getStart(sourceFile);
    // If label is on a separate line, just delete the rest of that line, but not the indentation of the labeled statement.
    const end = positionsAreOnSameLine(pos, statementPos, sourceFile) ? statementPos
        : skipTrivia(sourceFile.text, findChildOfKind(labeledStatement, SyntaxKind.ColonToken, sourceFile)!.end, /*stopAfterLineBreak*/ true);
    changes.deleteRange(sourceFile, { pos, end });
}

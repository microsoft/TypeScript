import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    cast,
    Diagnostics,
    findChildOfKind,
    getTokenAtPosition,
    isLabeledStatement,
    positionsAreOnSameLine,
    skipTrivia,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "fixUnusedLabel";
const errorCodes = [Diagnostics.Unused_label.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unused_label, fixId, Diagnostics.Remove_all_unused_labels)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start)),
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, start: number): void {
    const token = getTokenAtPosition(sourceFile, start);
    const labeledStatement = cast(token.parent, isLabeledStatement);
    const pos = token.getStart(sourceFile);
    const statementPos = labeledStatement.statement.getStart(sourceFile);
    // If label is on a separate line, just delete the rest of that line, but not the indentation of the labeled statement.
    const end = positionsAreOnSameLine(pos, statementPos, sourceFile) ? statementPos
        : skipTrivia(sourceFile.text, findChildOfKind(labeledStatement, SyntaxKind.ColonToken, sourceFile)!.end, /*stopAfterLineBreak*/ true);
    changes.deleteRange(sourceFile, { pos, end });
}

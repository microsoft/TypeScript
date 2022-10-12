import * as ts from "../_namespaces/ts";

const fixId = "fixUnusedLabel";
const errorCodes = [ts.Diagnostics.Unused_label.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Remove_unused_label, fixId, ts.Diagnostics.Remove_all_unused_labels)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start)),
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, start: number): void {
    const token = ts.getTokenAtPosition(sourceFile, start);
    const labeledStatement = ts.cast(token.parent, ts.isLabeledStatement);
    const pos = token.getStart(sourceFile);
    const statementPos = labeledStatement.statement.getStart(sourceFile);
    // If label is on a separate line, just delete the rest of that line, but not the indentation of the labeled statement.
    const end = ts.positionsAreOnSameLine(pos, statementPos, sourceFile) ? statementPos
        : ts.skipTrivia(sourceFile.text, ts.findChildOfKind(labeledStatement, ts.SyntaxKind.ColonToken, sourceFile)!.end, /*stopAfterLineBreak*/ true);
    changes.deleteRange(sourceFile, { pos, end });
}

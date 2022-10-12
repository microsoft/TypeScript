import * as ts from "../_namespaces/ts";

const fixName = "disableJsDiagnostics";
const fixId = "disableJsDiagnostics";
const errorCodes = ts.mapDefined(Object.keys(ts.Diagnostics) as readonly (keyof typeof ts.Diagnostics)[], key => {
    const diag = ts.Diagnostics[key];
    return diag.category === ts.DiagnosticCategory.Error ? diag.code : undefined;
});

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToDisableJsDiagnostics(context) {
        const { sourceFile, program, span, host, formatContext } = context;

        if (!ts.isInJSFile(sourceFile) || !ts.isCheckJsEnabledForFile(sourceFile, program.getCompilerOptions())) {
            return undefined;
        }

        const newLineCharacter = sourceFile.checkJsDirective ? "" : ts.getNewLineOrDefaultFromHost(host, formatContext.options);
        const fixes: ts.CodeFixAction[] = [
            // fixId unnecessary because adding `// @ts-nocheck` even once will ignore every error in the file.
            ts.codefix.createCodeFixActionWithoutFixAll(
                fixName,
                [ts.codefix.createFileTextChanges(sourceFile.fileName, [
                    ts.createTextChange(sourceFile.checkJsDirective
                        ? ts.createTextSpanFromBounds(sourceFile.checkJsDirective.pos, sourceFile.checkJsDirective.end)
                        : ts.createTextSpan(0, 0), `// @ts-nocheck${newLineCharacter}`),
                ])],
                ts.Diagnostics.Disable_checking_for_this_file),
        ];

        if (ts.textChanges.isValidLocationToAddComment(sourceFile, span.start)) {
            fixes.unshift(ts.codefix.createCodeFixAction(fixName, ts.textChanges.ChangeTracker.with(context, t => makeChange(t, sourceFile, span.start)), ts.Diagnostics.Ignore_this_error_message, fixId, ts.Diagnostics.Add_ts_ignore_to_all_error_messages));
        }

        return fixes;
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const seenLines = new ts.Set<number>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            if (ts.textChanges.isValidLocationToAddComment(diag.file, diag.start)) {
                makeChange(changes, diag.file, diag.start, seenLines);
            }
        });
    },
});

function makeChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, position: number, seenLines?: ts.Set<number>) {
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(sourceFile, position);
    // Only need to add `// @ts-ignore` for a line once.
    if (!seenLines || ts.tryAddToSet(seenLines, lineNumber)) {
        changes.insertCommentBeforeLine(sourceFile, lineNumber, position, " @ts-ignore");
    }
}

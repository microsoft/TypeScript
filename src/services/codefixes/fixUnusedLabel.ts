/* @internal */
namespace ts.codefix {
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
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        const statement = cast(token.parent, isLabeledStatement).statement;
        changes.deleteRange(sourceFile, { pos: token.getStart(sourceFile), end: statement.getStart(sourceFile) });
    }
}

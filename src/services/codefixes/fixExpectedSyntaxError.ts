/* @internal */
namespace ts.codefix {
    const fixId = "fixExpectedSyntaxError";
    const errorCodes = [Diagnostics._0_expected.code];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const info = getInfo(sourceFile, context.span.start, context.errorCode);
            if (!info) {
                return undefined;
            }
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
            return [createCodeFixAction(fixId, changes, [Diagnostics._0_expected, info.className], fixId, Diagnostics._0_expected)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start, diag.code);
            if (info) doChange(changes, context.sourceFile, info);
        }),
    });

    // TODO: Implment dochange and getInfo

    // interface Info { readonly node: Identifier; readonly className: string | undefined; }
    // function getInfo(sourceFile: SourceFile, pos: number, diagCode: number): Info | undefined {
    // }

    // function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { node, className }: Info): void {
    // }
}
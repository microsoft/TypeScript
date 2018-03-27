/* @internal */
namespace ts.codefix {
    const fixId = "forgottenThisPropertyAccess";
    const errorCodes = [Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const token = getNode(sourceFile, context.span.start);
            if (!token) {
                return undefined;
            }
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, token));
            return [createCodeFixAction(changes, Diagnostics.Add_this_to_unresolved_variable, fixId, Diagnostics.Add_this_to_all_unresolved_variables_matching_a_member_name)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            doChange(changes, context.sourceFile, getNode(diag.file, diag.start!));
        }),
    });

    function getNode(sourceFile: SourceFile, pos: number): Identifier | undefined {
        const node = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        return isIdentifier(node) ? node : undefined;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Identifier | undefined): void {
        if (!token) {
            return;
        }
        // TODO (https://github.com/Microsoft/TypeScript/issues/21246): use shared helper
        suppressLeadingAndTrailingTrivia(token);
        changes.replaceNode(sourceFile, token, createPropertyAccess(createThis(), token));
    }
}

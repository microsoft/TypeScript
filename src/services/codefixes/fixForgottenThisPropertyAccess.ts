/* @internal */
namespace ts.codefix {
    const fixId = "forgottenThisPropertyAccess";
    const errorCodes = [Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const token = getNode(sourceFile, context.span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, token));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Add_this_to_unresolved_variable), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            doChange(changes, context.sourceFile, getNode(diag.file, diag.start!));
        }),
    });

    function getNode(sourceFile: SourceFile, pos: number): Identifier {
        return cast(getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false), isIdentifier);
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Identifier): void {
        // TODO (https://github.com/Microsoft/TypeScript/issues/21246): use shared helper
        suppressLeadingAndTrailingTrivia(token);
        changes.replaceRange(sourceFile, { pos: token.getStart(), end: token.end }, createPropertyAccess(createThis(), token));
    }
}
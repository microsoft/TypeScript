/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.Re_exporting_a_type_when_the_isolatedModules_flag_is_provided_requires_using_an_explicit_type_only_export.code];
    const fixId = "convertToTypeOnlyExport";
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const changes = textChanges.ChangeTracker.with(context, t => fixSingleExport(t, context));
            if (changes.length) {
                return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_export, fixId, Diagnostics.Convert_all_re_exported_types_to_type_only_exports)];
            }
        },
        fixIds: [fixId],
        // getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
        //     // TODO
        // })
    });

    function fixSingleExport(changes: textChanges.ChangeTracker, { sourceFile, span }: CodeFixContext) {
        const exportSpecifier = tryCast(getTokenAtPosition(sourceFile, span.start).parent, isExportSpecifier);
        const exportDeclaration = exportSpecifier?.parent.parent;
        if (exportDeclaration?.exportClause?.elements.length === 1) {
            changes.replaceNode(
                sourceFile,
                exportDeclaration!,
                updateExportDeclaration(
                    exportDeclaration!,
                    exportDeclaration!.decorators,
                    exportDeclaration!.modifiers,
                    exportDeclaration!.exportClause,
                    exportDeclaration!.moduleSpecifier,
                    /*isTypeOnly*/ true));
        }
        else {
            // TODO: update individual export specifier
        }
    }
}

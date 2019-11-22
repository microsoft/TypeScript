/* @internal */
namespace ts.codefix {
    const errorCode = Diagnostics.Re_exporting_a_type_when_the_isolatedModules_flag_is_provided_requires_using_an_explicit_type_only_export.code;
    const fixId = "convertToTypeOnlyExport";
    registerCodeFix({
        errorCodes: [errorCode],
        getCodeActions: context => {
            const changes = textChanges.ChangeTracker.with(context, t => fixSingleExportDeclaration(t, context));
            if (changes.length) {
                return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_export, fixId, Diagnostics.Convert_all_re_exported_types_to_type_only_exports)];
            }
        },
        fixIds: [fixId],
        // getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
        //     // TODO
        // })
    });

    function fixSingleExportDeclaration(changes: textChanges.ChangeTracker, context: CodeFixContext) {
        const { sourceFile, span } = context;
        const exportSpecifier = tryCast(getTokenAtPosition(sourceFile, span.start).parent, isExportSpecifier);
        if (!exportSpecifier) {
            return;
        }

        if (everyExportSpecifierIsType(exportSpecifier, context)) {
            const exportDeclaration = exportSpecifier.parent.parent;
            changes.replaceNode(
                sourceFile,
                exportDeclaration,
                updateExportDeclaration(
                    exportDeclaration,
                    exportDeclaration.decorators,
                    exportDeclaration.modifiers,
                    exportDeclaration.exportClause,
                    exportDeclaration.moduleSpecifier,
                    /*isTypeOnly*/ true));
        }
        else {
            // TODO: split export declaration
        }
    }

    function everyExportSpecifierIsType(targetExportSpecifier: ExportSpecifier, context: CodeFixContext) {
        const exportClause = targetExportSpecifier.parent;
        if (exportClause.elements.length === 1) {
            return true;
        }
        const diagnostics = getDiagnosticsWithinSpan(
            createTextSpanFromNode(exportClause),
            context.program.getSemanticDiagnostics(context.sourceFile, context.cancellationToken));

        return every(
            exportClause.elements,
            element => findDiagnosticForNode(element, diagnostics)?.code === errorCode);
    }
}

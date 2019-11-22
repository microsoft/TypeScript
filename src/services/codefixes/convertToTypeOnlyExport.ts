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

        const exportClause = exportSpecifier.parent;
        const exportDeclaration = exportClause.parent;
        const typeExportSpecifiers = getTypeExportSpecifiers(exportSpecifier, context);
        if (typeExportSpecifiers.length === exportClause.elements.length) {
            changes.replaceNode(
                sourceFile,
                exportDeclaration,
                updateExportDeclaration(
                    exportDeclaration,
                    exportDeclaration.decorators,
                    exportDeclaration.modifiers,
                    exportClause,
                    exportDeclaration.moduleSpecifier,
                    /*isTypeOnly*/ true));
        }
        else {
            const valueExportDeclaration = updateExportDeclaration(
                exportDeclaration,
                exportDeclaration.decorators,
                exportDeclaration.modifiers,
                updateNamedExports(exportClause, filter(exportClause.elements, e => !contains(typeExportSpecifiers, e))),
                exportDeclaration.moduleSpecifier,
                /*isTypeOnly*/ false);
            const typeExportDeclaration = createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createNamedExports(typeExportSpecifiers),
                exportDeclaration.moduleSpecifier,
                /*isTypeOnly*/ true);

            changes.replaceNode(sourceFile, exportDeclaration, valueExportDeclaration);
            changes.insertNodeAfter(sourceFile, exportDeclaration, typeExportDeclaration);
        }
    }

    function getTypeExportSpecifiers(originExportSpecifier: ExportSpecifier, context: CodeFixContext): readonly ExportSpecifier[] {
        const exportClause = originExportSpecifier.parent;
        if (exportClause.elements.length === 1) {
            return exportClause.elements;
        }

        const diagnostics = getDiagnosticsWithinSpan(
            createTextSpanFromNode(exportClause),
            context.program.getSemanticDiagnostics(context.sourceFile, context.cancellationToken));

        return filter(exportClause.elements, element => {
            return element === originExportSpecifier || findDiagnosticForNode(element, diagnostics)?.code === errorCode;
        });
    }
}

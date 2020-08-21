/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.Re_exporting_a_type_when_the_isolatedModules_flag_is_provided_requires_using_export_type.code];
    const fixId = "convertToTypeOnlyExport";
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const changes = textChanges.ChangeTracker.with(context, t => fixSingleExportDeclaration(t, getExportSpecifierForDiagnosticSpan(context.span, context.sourceFile), context));
            if (changes.length) {
                return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_export, fixId, Diagnostics.Convert_all_re_exported_types_to_type_only_exports)];
            }
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const fixedExportDeclarations = new Map<string, true>();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const exportSpecifier = getExportSpecifierForDiagnosticSpan(diag, context.sourceFile);
                if (exportSpecifier && !addToSeen(fixedExportDeclarations, getNodeId(exportSpecifier.parent.parent))) {
                    fixSingleExportDeclaration(changes, exportSpecifier, context);
                }
            });
        }
    });

    function getExportSpecifierForDiagnosticSpan(span: TextSpan, sourceFile: SourceFile) {
        return tryCast(getTokenAtPosition(sourceFile, span.start).parent, isExportSpecifier);
    }

    function fixSingleExportDeclaration(changes: textChanges.ChangeTracker, exportSpecifier: ExportSpecifier | undefined, context: CodeFixContextBase) {
        if (!exportSpecifier) {
            return;
        }

        const exportClause = exportSpecifier.parent;
        const exportDeclaration = exportClause.parent;
        const typeExportSpecifiers = getTypeExportSpecifiers(exportSpecifier, context);
        if (typeExportSpecifiers.length === exportClause.elements.length) {
            changes.replaceNode(
                context.sourceFile,
                exportDeclaration,
                factory.updateExportDeclaration(
                    exportDeclaration,
                    exportDeclaration.decorators,
                    exportDeclaration.modifiers,
                    /*isTypeOnly*/ true,
                    exportClause,
                    exportDeclaration.moduleSpecifier));
        }
        else {
            const valueExportDeclaration = factory.updateExportDeclaration(
                exportDeclaration,
                exportDeclaration.decorators,
                exportDeclaration.modifiers,
                /*isTypeOnly*/ false,
                factory.updateNamedExports(exportClause, filter(exportClause.elements, e => !contains(typeExportSpecifiers, e))),
                exportDeclaration.moduleSpecifier);
            const typeExportDeclaration = factory.createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isTypeOnly*/ true,
                factory.createNamedExports(typeExportSpecifiers),
                exportDeclaration.moduleSpecifier);

            changes.replaceNode(context.sourceFile, exportDeclaration, valueExportDeclaration);
            changes.insertNodeAfter(context.sourceFile, exportDeclaration, typeExportDeclaration);
        }
    }

    function getTypeExportSpecifiers(originExportSpecifier: ExportSpecifier, context: CodeFixContextBase): readonly ExportSpecifier[] {
        const exportClause = originExportSpecifier.parent;
        if (exportClause.elements.length === 1) {
            return exportClause.elements;
        }

        const diagnostics = getDiagnosticsWithinSpan(
            createTextSpanFromNode(exportClause),
            context.program.getSemanticDiagnostics(context.sourceFile, context.cancellationToken));

        return filter(exportClause.elements, element => {
            return element === originExportSpecifier || findDiagnosticForNode(element, diagnostics)?.code === errorCodes[0];
        });
    }
}

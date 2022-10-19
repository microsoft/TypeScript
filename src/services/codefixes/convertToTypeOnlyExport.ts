import * as ts from "../_namespaces/ts";

const errorCodes = [ts.Diagnostics.Re_exporting_a_type_when_the_isolatedModules_flag_is_provided_requires_using_export_type.code];
const fixId = "convertToTypeOnlyExport";
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToTypeOnlyExport(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => fixSingleExportDeclaration(t, getExportSpecifierForDiagnosticSpan(context.span, context.sourceFile), context));
        if (changes.length) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_to_type_only_export, fixId, ts.Diagnostics.Convert_all_re_exported_types_to_type_only_exports)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToConvertToTypeOnlyExport(context) {
        const fixedExportDeclarations = new ts.Map<number, true>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const exportSpecifier = getExportSpecifierForDiagnosticSpan(diag, context.sourceFile);
            if (exportSpecifier && ts.addToSeen(fixedExportDeclarations, ts.getNodeId(exportSpecifier.parent.parent))) {
                fixSingleExportDeclaration(changes, exportSpecifier, context);
            }
        });
    }
});

function getExportSpecifierForDiagnosticSpan(span: ts.TextSpan, sourceFile: ts.SourceFile) {
    return ts.tryCast(ts.getTokenAtPosition(sourceFile, span.start).parent, ts.isExportSpecifier);
}

function fixSingleExportDeclaration(changes: ts.textChanges.ChangeTracker, exportSpecifier: ts.ExportSpecifier | undefined, context: ts.CodeFixContextBase) {
    if (!exportSpecifier) {
        return;
    }

    const exportClause = exportSpecifier.parent;
    const exportDeclaration = exportClause.parent;
    const typeExportSpecifiers = getTypeExportSpecifiers(exportSpecifier, context);
    if (typeExportSpecifiers.length === exportClause.elements.length) {
        changes.insertModifierBefore(context.sourceFile, ts.SyntaxKind.TypeKeyword, exportClause);
    }
    else {
        const valueExportDeclaration = ts.factory.updateExportDeclaration(
            exportDeclaration,
            exportDeclaration.modifiers,
            /*isTypeOnly*/ false,
            ts.factory.updateNamedExports(exportClause, ts.filter(exportClause.elements, e => !ts.contains(typeExportSpecifiers, e))),
            exportDeclaration.moduleSpecifier,
            /*assertClause*/ undefined
        );
        const typeExportDeclaration = ts.factory.createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ true,
            ts.factory.createNamedExports(typeExportSpecifiers),
            exportDeclaration.moduleSpecifier,
            /*assertClause*/ undefined
        );

        changes.replaceNode(context.sourceFile, exportDeclaration, valueExportDeclaration, {
            leadingTriviaOption: ts.textChanges.LeadingTriviaOption.IncludeAll,
            trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude
        });
        changes.insertNodeAfter(context.sourceFile, exportDeclaration, typeExportDeclaration);
    }
}

function getTypeExportSpecifiers(originExportSpecifier: ts.ExportSpecifier, context: ts.CodeFixContextBase): readonly ts.ExportSpecifier[] {
    const exportClause = originExportSpecifier.parent;
    if (exportClause.elements.length === 1) {
        return exportClause.elements;
    }

    const diagnostics = ts.getDiagnosticsWithinSpan(
        ts.createTextSpanFromNode(exportClause),
        context.program.getSemanticDiagnostics(context.sourceFile, context.cancellationToken));

    return ts.filter(exportClause.elements, element => {
        return element === originExportSpecifier || ts.findDiagnosticForNode(element, diagnostics)?.code === errorCodes[0];
    });
}

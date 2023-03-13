import {
    contains,
    filter,
    tryCast,
} from "../../compiler/core";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { isExportSpecifier } from "../../compiler/factory/nodeTests";
import {
    ExportSpecifier,
    SourceFile,
    SyntaxKind,
    TextSpan,
} from "../../compiler/types";
import { addToSeen, getNodeId } from "../../compiler/utilities";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import {
    ChangeTracker,
    LeadingTriviaOption,
    TrailingTriviaOption,
} from "../textChanges";
import { CodeFixContextBase } from "../types";
import {
    createTextSpanFromNode,
    findDiagnosticForNode,
    getDiagnosticsWithinSpan,
    getTokenAtPosition,
} from "../utilities";

const errorCodes = [Diagnostics.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type.code];
const fixId = "convertToTypeOnlyExport";
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToTypeOnlyExport(context) {
        const changes = ChangeTracker.with(context, t => fixSingleExportDeclaration(t, getExportSpecifierForDiagnosticSpan(context.span, context.sourceFile), context));
        if (changes.length) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_export, fixId, Diagnostics.Convert_all_re_exported_types_to_type_only_exports)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToConvertToTypeOnlyExport(context) {
        const fixedExportDeclarations = new Map<number, true>();
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const exportSpecifier = getExportSpecifierForDiagnosticSpan(diag, context.sourceFile);
            if (exportSpecifier && addToSeen(fixedExportDeclarations, getNodeId(exportSpecifier.parent.parent))) {
                fixSingleExportDeclaration(changes, exportSpecifier, context);
            }
        });
    }
});

function getExportSpecifierForDiagnosticSpan(span: TextSpan, sourceFile: SourceFile) {
    return tryCast(getTokenAtPosition(sourceFile, span.start).parent, isExportSpecifier);
}

function fixSingleExportDeclaration(changes: ChangeTracker, exportSpecifier: ExportSpecifier | undefined, context: CodeFixContextBase) {
    if (!exportSpecifier) {
        return;
    }

    const exportClause = exportSpecifier.parent;
    const exportDeclaration = exportClause.parent;
    const typeExportSpecifiers = getTypeExportSpecifiers(exportSpecifier, context);
    if (typeExportSpecifiers.length === exportClause.elements.length) {
        changes.insertModifierBefore(context.sourceFile, SyntaxKind.TypeKeyword, exportClause);
    }
    else {
        const valueExportDeclaration = factory.updateExportDeclaration(
            exportDeclaration,
            exportDeclaration.modifiers,
            /*isTypeOnly*/ false,
            factory.updateNamedExports(exportClause, filter(exportClause.elements, e => !contains(typeExportSpecifiers, e))),
            exportDeclaration.moduleSpecifier,
            /*assertClause*/ undefined
        );
        const typeExportDeclaration = factory.createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ true,
            factory.createNamedExports(typeExportSpecifiers),
            exportDeclaration.moduleSpecifier,
            /*assertClause*/ undefined
        );

        changes.replaceNode(context.sourceFile, exportDeclaration, valueExportDeclaration, {
            leadingTriviaOption: LeadingTriviaOption.IncludeAll,
            trailingTriviaOption: TrailingTriviaOption.Exclude,
        });
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

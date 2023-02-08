import {
    Diagnostics,
    factory,
    getSynthesizedDeepClone,
    getSynthesizedDeepClones,
    getTokenAtPosition,
    ImportClause,
    ImportDeclaration,
    ImportSpecifier,
    isImportDeclaration,
    isImportSpecifier,
    SourceFile,
    textChanges,
} from "../_namespaces/ts";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix";

const errorCodes = [
    Diagnostics.This_import_is_never_used_as_a_value_and_must_use_import_type_because_importsNotUsedAsValues_is_set_to_error.code,
    Diagnostics._0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled.code,
];
const fixId = "convertToTypeOnlyImport";

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToTypeOnlyImport(context) {
        const declaration = getDeclaration(context.sourceFile, context.span.start);
        if (declaration) {
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, declaration));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_import, fixId, Diagnostics.Convert_all_imports_not_used_as_a_value_to_type_only_imports)];
        }
        return undefined;
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToConvertToTypeOnlyImport(context) {
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const declaration = getDeclaration(diag.file, diag.start);
            if (declaration) {
                doChange(changes, diag.file, declaration);
            }
        });
    }
});

function getDeclaration(sourceFile: SourceFile, pos: number) {
    const { parent } = getTokenAtPosition(sourceFile, pos);
    return isImportSpecifier(parent) || isImportDeclaration(parent) && parent.importClause ? parent : undefined;
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ImportDeclaration | ImportSpecifier) {
    if (isImportSpecifier(declaration)) {
        changes.replaceNode(sourceFile, declaration, factory.updateImportSpecifier(declaration, /*isTypeOnly*/ true, declaration.propertyName, declaration.name));
    }
    else {
        const importClause = declaration.importClause as ImportClause;
        if (importClause.name && importClause.namedBindings) {
            changes.replaceNodeWithNodes(sourceFile, declaration, [
                factory.createImportDeclaration(
                    getSynthesizedDeepClones(declaration.modifiers, /*includeTrivia*/ true),
                    factory.createImportClause(/*isTypeOnly*/ true, getSynthesizedDeepClone(importClause.name, /*includeTrivia*/ true), /*namedBindings*/ undefined),
                    getSynthesizedDeepClone(declaration.moduleSpecifier, /*includeTrivia*/ true),
                    getSynthesizedDeepClone(declaration.assertClause, /*includeTrivia*/ true),
                ),
                factory.createImportDeclaration(
                    getSynthesizedDeepClones(declaration.modifiers, /*includeTrivia*/ true),
                    factory.createImportClause(/*isTypeOnly*/ true, /*name*/ undefined, getSynthesizedDeepClone(importClause.namedBindings, /*includeTrivia*/ true)),
                    getSynthesizedDeepClone(declaration.moduleSpecifier, /*includeTrivia*/ true),
                    getSynthesizedDeepClone(declaration.assertClause, /*includeTrivia*/ true),
                ),
            ]);
        }
        else {
            const importDeclaration = factory.updateImportDeclaration(declaration, declaration.modifiers,
                factory.updateImportClause(importClause, /*isTypeOnly*/ true, importClause.name, importClause.namedBindings), declaration.moduleSpecifier, declaration.assertClause);
            changes.replaceNode(sourceFile, declaration, importDeclaration);
        }
    }
}

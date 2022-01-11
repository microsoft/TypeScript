import { Diagnostics, TextSpan, SourceFile, tryCast, getTokenAtPosition, isImportDeclaration, ImportDeclaration, CodeFixContextBase, factory } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const errorCodes = [Diagnostics.This_import_is_never_used_as_a_value_and_must_use_import_type_because_importsNotUsedAsValues_is_set_to_error.code];
/* @internal */
const fixId = "convertToTypeOnlyImport";
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToTypeOnlyImport(context) {
        const changes = ChangeTracker.with(context, t => {
            const importDeclaration = getImportDeclarationForDiagnosticSpan(context.span, context.sourceFile);
            fixSingleImportDeclaration(t, importDeclaration, context);
        });
        if (changes.length) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_import, fixId, Diagnostics.Convert_all_imports_not_used_as_a_value_to_type_only_imports)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToConvertToTypeOnlyImport(context) {
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const importDeclaration = getImportDeclarationForDiagnosticSpan(diag, context.sourceFile);
            fixSingleImportDeclaration(changes, importDeclaration, context);
        });
    }
});

/* @internal */
function getImportDeclarationForDiagnosticSpan(span: TextSpan, sourceFile: SourceFile) {
    return tryCast(getTokenAtPosition(sourceFile, span.start).parent, isImportDeclaration);
}

/* @internal */
function fixSingleImportDeclaration(changes: ChangeTracker, importDeclaration: ImportDeclaration | undefined, context: CodeFixContextBase) {
    if (!importDeclaration?.importClause) {
        return;
    }

    const { importClause } = importDeclaration;
    // `changes.insertModifierBefore` produces a range that might overlap further changes
    changes.insertText(context.sourceFile, importDeclaration.getStart() + "import".length, " type");

    // `import type foo, { Bar }` is not allowed, so move `foo` to new declaration
    if (importClause.name && importClause.namedBindings) {
        changes.deleteNodeRangeExcludingEnd(context.sourceFile, importClause.name, importDeclaration.importClause.namedBindings);
        changes.insertNodeBefore(context.sourceFile, importDeclaration, factory.updateImportDeclaration(importDeclaration, 
            /*decorators*/ undefined,
        /*modifiers*/ undefined, factory.createImportClause(
        /*isTypeOnly*/ true, importClause.name, 
        /*namedBindings*/ undefined), importDeclaration.moduleSpecifier, 
            /*assertClause*/ undefined));
    }
}

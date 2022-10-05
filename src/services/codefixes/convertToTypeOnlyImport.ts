/* @internal */
namespace ts.codefix {
const errorCodes = [ts.Diagnostics.This_import_is_never_used_as_a_value_and_must_use_import_type_because_importsNotUsedAsValues_is_set_to_error.code];
const fixId = "convertToTypeOnlyImport";
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToTypeOnlyImport(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => {
            const importDeclaration = getImportDeclarationForDiagnosticSpan(context.span, context.sourceFile);
            fixSingleImportDeclaration(t, importDeclaration, context);
        });
        if (changes.length) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_to_type_only_import, fixId, ts.Diagnostics.Convert_all_imports_not_used_as_a_value_to_type_only_imports)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToConvertToTypeOnlyImport(context) {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const importDeclaration = getImportDeclarationForDiagnosticSpan(diag, context.sourceFile);
            fixSingleImportDeclaration(changes, importDeclaration, context);
        });
    }
});

function getImportDeclarationForDiagnosticSpan(span: ts.TextSpan, sourceFile: ts.SourceFile) {
    return ts.tryCast(ts.getTokenAtPosition(sourceFile, span.start).parent, ts.isImportDeclaration);
}

function fixSingleImportDeclaration(changes: ts.textChanges.ChangeTracker, importDeclaration: ts.ImportDeclaration | undefined, context: ts.CodeFixContextBase) {
    if (!importDeclaration?.importClause) {
        return;
    }

    const { importClause } = importDeclaration;
    // `changes.insertModifierBefore` produces a range that might overlap further changes
    changes.insertText(context.sourceFile, importDeclaration.getStart() + "import".length, " type");

    // `import type foo, { Bar }` is not allowed, so move `foo` to new declaration
    if (importClause.name && importClause.namedBindings) {
        changes.deleteNodeRangeExcludingEnd(context.sourceFile, importClause.name, importDeclaration.importClause.namedBindings);
        changes.insertNodeBefore(context.sourceFile, importDeclaration, ts.factory.updateImportDeclaration(
            importDeclaration,
            /*modifiers*/ undefined,
            ts.factory.createImportClause(
                /*isTypeOnly*/ true,
                importClause.name,
                /*namedBindings*/ undefined),
            importDeclaration.moduleSpecifier,
            /*assertClause*/ undefined));
    }
}
}

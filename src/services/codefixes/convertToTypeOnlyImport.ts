/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.This_import_is_never_used_as_a_value_and_must_use_import_type_because_the_importsNotUsedAsValues_is_set_to_error.code];
    const fixId = "convertToTypeOnlyImport";
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const changes = textChanges.ChangeTracker.with(context, t => {
                const importDeclaration = getImportDeclarationForDiagnosticSpan(context.span, context.sourceFile);
                fixSingleImportDeclaration(t, importDeclaration, context);
            });
            if (changes.length) {
                return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_type_only_import, fixId, Diagnostics.Convert_all_imports_not_used_as_a_value_to_type_only_imports)];
            }
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const importDeclaration = getImportDeclarationForDiagnosticSpan(diag, context.sourceFile);
                fixSingleImportDeclaration(changes, importDeclaration, context);
            });
        }
    });

    function getImportDeclarationForDiagnosticSpan(span: TextSpan, sourceFile: SourceFile) {
        return tryCast(getTokenAtPosition(sourceFile, span.start).parent, isImportDeclaration);
    }

    function fixSingleImportDeclaration(changes: textChanges.ChangeTracker, importDeclaration: ImportDeclaration | undefined, context: CodeFixContextBase) {
        if (!importDeclaration?.importClause) {
            return;
        }

        const { importClause } = importDeclaration;
        // `changes.insertModifierBefore` produces a range that might overlap further changes
        changes.insertText(context.sourceFile, importDeclaration.getStart() + "import".length, " type");

        // `import type foo, { Bar }` is not allowed, so move `foo` to new declaration
        if (importClause.name && importClause.namedBindings) {
            changes.deleteNodeRangeExcludingEnd(context.sourceFile, importClause.name, importDeclaration.importClause.namedBindings);
            changes.insertNodeBefore(context.sourceFile, importDeclaration, updateImportDeclaration(
                importDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createImportClause(
                    importClause.name,
                    /*namedBindings*/ undefined,
                    /*isTypeOnly*/ true),
                importDeclaration.moduleSpecifier));
        }
    }
}

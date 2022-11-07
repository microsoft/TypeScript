/* @internal */
namespace ts.codefix {
const errorCodes = [ts.Diagnostics.A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both.code];
const fixId = "splitTypeOnlyImport";
ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions: function getCodeActionsToSplitTypeOnlyImport(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => {
            return splitTypeOnlyImport(t, getImportDeclaration(context.sourceFile, context.span), context);
        });
        if (changes.length) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Split_into_two_separate_import_declarations, fixId, ts.Diagnostics.Split_all_invalid_type_only_imports)];
        }
    },
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, error) => {
        splitTypeOnlyImport(changes, getImportDeclaration(context.sourceFile, error), context);
    }),
});

function getImportDeclaration(sourceFile: ts.SourceFile, span: ts.TextSpan) {
    return ts.findAncestor(ts.getTokenAtPosition(sourceFile, span.start), ts.isImportDeclaration);
}

function splitTypeOnlyImport(changes: ts.textChanges.ChangeTracker, importDeclaration: ts.ImportDeclaration | undefined, context: ts.CodeFixContextBase) {
    if (!importDeclaration) {
        return;
    }
    const importClause = ts.Debug.checkDefined(importDeclaration.importClause);
    changes.replaceNode(context.sourceFile, importDeclaration, ts.factory.updateImportDeclaration(
        importDeclaration,
        importDeclaration.modifiers,
        ts.factory.updateImportClause(importClause, importClause.isTypeOnly, importClause.name, /*namedBindings*/ undefined),
        importDeclaration.moduleSpecifier,
        importDeclaration.assertClause));

    changes.insertNodeAfter(context.sourceFile, importDeclaration, ts.factory.createImportDeclaration(
        /*modifiers*/ undefined,
        ts.factory.updateImportClause(importClause, importClause.isTypeOnly, /*name*/ undefined, importClause.namedBindings),
        importDeclaration.moduleSpecifier,
        importDeclaration.assertClause));
}
}

/* @internal */
namespace ts.codefix {
const fixId = "useDefaultImport";
const errorCodes = [ts.Diagnostics.Import_may_be_converted_to_a_default_import.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span: { start } } = context;
        const info = getInfo(sourceFile, start);
        if (!info) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info, context.preferences));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_to_default_import, fixId, ts.Diagnostics.Convert_all_to_default_imports)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start);
        if (info) doChange(changes, diag.file, info, context.preferences);
    }),
});

interface Info {
    readonly importNode: ts.AnyImportSyntax;
    readonly name: ts.Identifier;
    readonly moduleSpecifier: ts.Expression;
}
function getInfo(sourceFile: ts.SourceFile, pos: number): Info | undefined {
    const name = ts.getTokenAtPosition(sourceFile, pos);
    if (!ts.isIdentifier(name)) return undefined; // bad input
    const { parent } = name;
    if (ts.isImportEqualsDeclaration(parent) && ts.isExternalModuleReference(parent.moduleReference)) {
        return { importNode: parent, name, moduleSpecifier: parent.moduleReference.expression };
    }
    else if (ts.isNamespaceImport(parent)) {
        const importNode = parent.parent.parent;
        return { importNode, name, moduleSpecifier: importNode.moduleSpecifier };
    }
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, info: Info, preferences: ts.UserPreferences): void {
    changes.replaceNode(sourceFile, info.importNode, ts.makeImport(info.name, /*namedImports*/ undefined, info.moduleSpecifier, ts.getQuotePreference(sourceFile, preferences)));
}
}

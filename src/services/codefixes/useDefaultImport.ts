/* @internal */
namespace ts.codefix {
    const fixId = "useDefaultImport";
    const errorCodes = [Diagnostics.Import_may_be_converted_to_a_default_import.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span: { start } } = context;
            const info = getInfo(sourceFile, start);
            if (!info) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_default_import, fixId, Diagnostics.Convert_all_to_default_imports)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file!, diag.start!);
            if (info) doChange(changes, diag.file!, info);
        }),
    });

    interface Info {
        readonly importNode: AnyImportSyntax;
        readonly name: Identifier;
        readonly moduleSpecifier: Expression;
    }
    function getInfo(sourceFile: SourceFile, pos: number): Info | undefined {
        const name = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (!isIdentifier(name)) return undefined; // bad input
        const { parent } = name;
        if (isImportEqualsDeclaration(parent) && isExternalModuleReference(parent.moduleReference)) {
            return { importNode: parent, name, moduleSpecifier: parent.moduleReference.expression };
        }
        else if (isNamespaceImport(parent)) {
            const importNode = parent.parent.parent;
            return { importNode, name, moduleSpecifier: importNode.moduleSpecifier };
        }
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info): void {
        changes.replaceNode(sourceFile, info.importNode, makeImport(info.name, /*namedImports*/ undefined, info.moduleSpecifier));
    }
}

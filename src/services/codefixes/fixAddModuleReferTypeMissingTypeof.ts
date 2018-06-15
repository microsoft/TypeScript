/* @internal */
namespace ts.codefix {
    const fixIdAddMissingTypeof = "fixAddModuleReferTypeMissingTypeof";
    const fixId = fixIdAddMissingTypeof;
    const errorCodes = [Diagnostics.Did_you_mean_typeof_import_0.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const importType = getImportTypeNode(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, importType));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_typeof, fixId, Diagnostics.Add_missing_typeof)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            doChange(changes, context.sourceFile, getImportTypeNode(diag.file, diag.start))),
    });

    function getImportTypeNode(sourceFile: SourceFile, pos: number): ImportTypeNode {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        Debug.assert(token.kind === SyntaxKind.ImportKeyword);
        Debug.assert(token.parent.kind === SyntaxKind.ImportType);
        return <ImportTypeNode>token.parent;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, importType: ImportTypeNode) {
        const newTypeNode = updateImportTypeNode(importType, importType.argument, importType.qualifier, importType.typeArguments, /* isTypeOf */ true);
        changes.replaceNode(sourceFile, importType, newTypeNode);
    }
}

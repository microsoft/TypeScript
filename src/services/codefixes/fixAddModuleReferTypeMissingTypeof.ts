import { Diagnostics, SourceFile, ImportTypeNode, getTokenAtPosition, Debug, SyntaxKind, updateImportTypeNode } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixIdAddMissingTypeof = "fixAddModuleReferTypeMissingTypeof";
/* @internal */
const fixId = fixIdAddMissingTypeof;
/* @internal */
const errorCodes = [Diagnostics.Module_0_does_not_refer_to_a_type_but_is_used_as_a_type_here_Did_you_mean_typeof_import_0.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const { sourceFile, span } = context;
        const importType = getImportTypeNode(sourceFile, span.start);
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, importType));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_typeof, fixId, Diagnostics.Add_missing_typeof)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, context.sourceFile, getImportTypeNode(diag.file, diag.start))),
});
/* @internal */
function getImportTypeNode(sourceFile: SourceFile, pos: number): ImportTypeNode {
    const token = getTokenAtPosition(sourceFile, pos);
    Debug.assert(token.kind === SyntaxKind.ImportKeyword, "This token should be an ImportKeyword");
    Debug.assert(token.parent.kind === SyntaxKind.ImportType, "Token parent should be an ImportType");
    return <ImportTypeNode>token.parent;
}
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, importType: ImportTypeNode) {
    const newTypeNode = updateImportTypeNode(importType, importType.argument, importType.qualifier, importType.typeArguments, /* isTypeOf */ true);
    changes.replaceNode(sourceFile, importType, newTypeNode);
}

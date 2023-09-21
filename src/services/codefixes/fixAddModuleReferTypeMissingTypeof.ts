import {
    Debug,
    Diagnostics,
    factory,
    getTokenAtPosition,
    ImportTypeNode,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix";

const fixIdAddMissingTypeof = "fixAddModuleReferTypeMissingTypeof";
const fixId = fixIdAddMissingTypeof;
const errorCodes = [Diagnostics.Module_0_does_not_refer_to_a_type_but_is_used_as_a_type_here_Did_you_mean_typeof_import_0.code];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingTypeof(context) {
        const { sourceFile, span } = context;
        const importType = getImportTypeNode(sourceFile, span.start);
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, importType));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_typeof, fixId, Diagnostics.Add_missing_typeof)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, context.sourceFile, getImportTypeNode(diag.file, diag.start))),
});

function getImportTypeNode(sourceFile: SourceFile, pos: number): ImportTypeNode {
    const token = getTokenAtPosition(sourceFile, pos);
    Debug.assert(token.kind === SyntaxKind.ImportKeyword, "This token should be an ImportKeyword");
    Debug.assert(token.parent.kind === SyntaxKind.ImportType, "Token parent should be an ImportType");
    return token.parent as ImportTypeNode;
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, importType: ImportTypeNode) {
    const newTypeNode = factory.updateImportTypeNode(importType, importType.argument, importType.attributes, importType.qualifier, importType.typeArguments, /*isTypeOf*/ true);
    changes.replaceNode(sourceFile, importType, newTypeNode);
}

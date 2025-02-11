import {
    createCodeFixAction,
    codeFixAll,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    factory,
    Diagnostics,
    getTokenAtPosition,
    isImportSpecifier,
    textChanges,
    tryCast,
    SourceFile,
    TextSpan,
} from "../_namespaces/ts.js";

const fixId = "removeUnnecessaryNamedImport";
const errorCodes = [
    Diagnostics.Redundant_named_import_0.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToRemoveUnnecessaryNamedImport(context) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        if (changes.length > 0) {
            return [createCodeFixAction(fixId, changes, Diagnostics.Redundant_named_import_0, fixId, Diagnostics.Redundant_named_import_0)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag));
    },
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, span: TextSpan) {
    const token = getTokenAtPosition(sourceFile, span.start);
    const importSpecifier = tryCast(token.parent, isImportSpecifier);
    if (!importSpecifier) {
        return;
    }

    if (importSpecifier.propertyName && importSpecifier.propertyName.text === importSpecifier.name.text) {
        changeTracker.replaceNode(sourceFile, importSpecifier, factory.updateImportSpecifier(importSpecifier, importSpecifier.isTypeOnly, /*propertyName*/ undefined, importSpecifier.name));
    }
}
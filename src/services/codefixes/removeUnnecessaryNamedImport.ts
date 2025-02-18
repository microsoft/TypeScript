import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    getTokenAtPosition,
    isImportSpecifier,
    SourceFile,
    textChanges,
    TextSpan,
    tryCast,
} from "../_namespaces/ts.js";

const fixId = "removeUnnecessaryNamedImport";
const errorCodes = [
    Diagnostics.Redundant_named_import_0.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToRemoveUnnecessaryNamedImport(context) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span));
        const token = getTokenAtPosition(context.sourceFile, context.span.start);
        const importSpecifier = tryCast(token.parent, isImportSpecifier);

        if (!importSpecifier) {
            return;
        }

        if (changes.length > 0) {
            return [createCodeFixAction(fixId, changes, [Diagnostics.Simplify_redundant_import_0, importSpecifier.name.text], fixId, Diagnostics.Simplify_all_redundant_imports)];
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

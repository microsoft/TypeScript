import {
    addRange,
} from "../compiler/core";
import {
    CancellationToken,
    SourceFile,
    Statement,
    SymbolFlags,
    TextRange,
    UserPreferences,
} from "../compiler/types";
import {
    getLineOfLocalPosition,
} from "../compiler/utilities";
import {
    codefix,
    fileShouldUseJavaScriptRequire,
    forEachChild,
    formatting,
    getQuotePreference,
    getTargetFileImportsAndAddExportInOldFile,
    insertImports,
    isIdentifier,
    textChanges,
} from "./_namespaces/ts";
import {
    getExistingLocals,
    getUsageInfo,
} from "./refactors/moveToFile";
import {
    CodeFixContextBase,
    FileTextChanges,
    LanguageServiceHost,
    PostPasteImportFixes,
} from "./types";

/** @internal */
export function postPasteImportFixesProvider(
    targetFile: SourceFile,
    copies: { text: string; copyRange?: { file: SourceFile; range: TextRange;} }[],
    pastes: TextRange[],
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
): PostPasteImportFixes {
    const changes: FileTextChanges[] = textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => postPasteFixes(targetFile, copies, pastes, host, preferences, formatContext, cancellationToken, changeTracker));
    return { edits: changes };
}

function postPasteFixes(
    targetFile: SourceFile,
    copies: { text: string; copyRange?: { file: SourceFile; range: TextRange;} }[],
    pastes: TextRange[],
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    changes: textChanges.ChangeTracker,
) {
    const copy = copies[0];
    const statements: Statement[] = [];
    
    host.runWithTemporaryFileUpdate?.(targetFile.fileName, targetFile.getText().slice(0, pastes[0].pos) + copy.text + targetFile.getText().slice(pastes[0].end), (updatedProgram, originalProgram, updatedFile) => {
        if (copy.copyRange) {
            addRange(statements, copy.copyRange.file.statements, getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.pos), getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.end) + 1);
            const usage = getUsageInfo(copy.copyRange.file, statements, originalProgram!.getTypeChecker(), getExistingLocals(updatedFile, statements, originalProgram!.getTypeChecker()));
            const importAdder = codefix.createImportAdder(updatedFile, updatedProgram!, preferences, host);
    
            const imports = getTargetFileImportsAndAddExportInOldFile(copy.copyRange.file, targetFile.fileName, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes,
                 originalProgram!.getTypeChecker(), updatedProgram!, host, !fileShouldUseJavaScriptRequire(targetFile.fileName, updatedProgram!, host, !!copy.copyRange.file.commonJsModuleIndicator), getQuotePreference(targetFile, preferences), importAdder);
            if (imports.length > 0) {
                insertImports(changes, targetFile, imports, /*blankLineBetween*/ true, preferences);
            }
            importAdder.writeFixes(changes, getQuotePreference(copy.copyRange.file, preferences));
        }
        else {
            const context: CodeFixContextBase = {
                sourceFile: updatedFile,
                program: originalProgram!,
                cancellationToken,
                host,
                preferences,
                formatContext,
            };
            const importAdder = codefix.createImportAdder(updatedFile, updatedProgram!, preferences, host);
            forEachChild(updatedFile, function cb(node) {
                if (isIdentifier(node)) {
                    if (!originalProgram?.getTypeChecker().resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ false)) {
                        // generate imports
                        importAdder.addImportForUnresolvedIdentifier(context, node, /*useAutoImportProvider*/ true);
                    }
                }
                else {
                    node.forEachChild(cb);
                }
            });
            importAdder.writeFixes(changes, getQuotePreference(targetFile, preferences));
        }
      });
    pastes.forEach((paste) => {
        changes.replaceRangeWithText(targetFile, { pos: paste.pos, end: paste.end }, copy.text);
    });
}
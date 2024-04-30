import { addRange } from "../compiler/core";
import {
    CancellationToken,
    SourceFile,
    Statement,
    SymbolFlags,
    TextRange,
    UserPreferences,
} from "../compiler/types";
import { getLineOfLocalPosition } from "../compiler/utilities";
import {
    codefix,
    Debug,
    fileShouldUseJavaScriptRequire,
    forEachChild,
    formatting,
    getQuotePreference,
    isIdentifier,
    textChanges,
} from "./_namespaces/ts";
import { addTargetFileImports } from "./refactors/helpers";
import {
    addExportsInOldFile,
    getExistingLocals,
    getUsageInfo,
} from "./refactors/moveToFile";
import {
    CodeFixContextBase,
    FileTextChanges,
    LanguageServiceHost,
    PasteEdits,
} from "./types";

const fixId = "providePostPasteEdits";
/** @internal */
export function pasteEditsProvider(
    targetFile: SourceFile,
    pastedText: string[],
    pasteLocations: TextRange[],
    copiedFrom: { file: SourceFile; range: TextRange[]; } | undefined,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
): PasteEdits {
    const changes: FileTextChanges[] = textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => pasteEdits(targetFile, pastedText, pasteLocations, copiedFrom, host, preferences, formatContext, cancellationToken, changeTracker));
    return { edits: changes, fixId };
}

function pasteEdits(
    targetFile: SourceFile,
    pastedText: string[],
    pasteLocations: TextRange[],
    copiedFrom: { file: SourceFile; range: TextRange[]; } | undefined,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    changes: textChanges.ChangeTracker,
) {
    if (pastedText.length !== 1) {
        Debug.assert(pastedText.length === pasteLocations.length);
    }
    pasteLocations.forEach((paste, i) => {
        changes.replaceRangeWithText(
            targetFile,
            { pos: paste.pos, end: paste.end },
            pastedText.length === 1 ?
                pastedText[0] : pastedText[i],
        );
    });

    const statements: Statement[] = [];

    let i = pasteLocations.length - 1;
    let end = targetFile.text.length - 1;
    let newText = "";
    pasteLocations.reverse().forEach(location => {
        newText = pastedText[i] + targetFile.text.slice(location.end, end) + newText;
        end = location.pos;
        i--;
    });
    newText = targetFile.text.slice(0, end) + newText;

    host.runWithTemporaryFileUpdate?.(targetFile.fileName, newText, (updatedProgram, originalProgram, updatedFile) => {
        const importAdder = codefix.createImportAdder(updatedFile, updatedProgram, preferences, host);
        if (copiedFrom?.range) {
            Debug.assert(copiedFrom.range.length === pastedText.length);
            copiedFrom.range.forEach(copy => {
                addRange(statements, copiedFrom.file.statements, getLineOfLocalPosition(copiedFrom.file, copy.pos), getLineOfLocalPosition(copiedFrom.file, copy.end) + 1);
            });
            const usage = getUsageInfo(copiedFrom.file, statements, originalProgram!.getTypeChecker(), getExistingLocals(updatedFile, statements, originalProgram!.getTypeChecker()));
            Debug.assertIsDefined(originalProgram);
            const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(targetFile.fileName, originalProgram, host, !!copiedFrom.file.commonJsModuleIndicator);
            addExportsInOldFile(copiedFrom.file, usage.targetFileImportsFromOldFile, changes, useEsModuleSyntax);
            addTargetFileImports(copiedFrom.file, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, originalProgram.getTypeChecker(), updatedProgram, importAdder);
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
            forEachChild(updatedFile, function cb(node) {
                if (isIdentifier(node) && !originalProgram?.getTypeChecker().resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ false)) {
                    // generate imports
                    importAdder.addImportForUnresolvedIdentifier(context, node, /*useAutoImportProvider*/ true);
                }
                node.forEachChild(cb);
            });
        }
        importAdder.writeFixes(changes, getQuotePreference(copiedFrom ? copiedFrom.file : targetFile, preferences));
    });
}

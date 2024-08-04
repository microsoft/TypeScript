import { findIndex } from "../compiler/core.js";
import {
    CancellationToken,
    Program,
    SourceFile,
    Statement,
    SymbolFlags,
    TextRange,
    UserPreferences,
} from "../compiler/types.js";
import {
    codefix,
    Debug,
    fileShouldUseJavaScriptRequire,
    forEachChild,
    formatting,
    getQuotePreference,
    isIdentifier,
    textChanges,
} from "./_namespaces/ts.js";
import { addTargetFileImports } from "./refactors/helpers.js";
import {
    addExportsInOldFile,
    getExistingLocals,
    getUsageInfo,
} from "./refactors/moveToFile.js";
import {
    CodeFixContextBase,
    FileTextChanges,
    LanguageServiceHost,
    PasteEdits,
} from "./types.js";

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
    let actualPastedText: string[] | undefined;
    if (pastedText.length !== pasteLocations.length) {
        actualPastedText = pastedText.length === 1 ? pastedText : [pastedText.join("\n")];
    }

    const statements: Statement[] = [];

    let newText = targetFile.text;
    for (let i = pasteLocations.length - 1; i >= 0; i--) {
        const { pos, end } = pasteLocations[i];
        newText = actualPastedText ? newText.slice(0, pos) + actualPastedText[0] + newText.slice(end) : newText.slice(0, pos) + pastedText[i] + newText.slice(end);
    }

    let importAdder: codefix.ImportAdder;
    Debug.checkDefined(host.runWithTemporaryFileUpdate).call(host, targetFile.fileName, newText, (updatedProgram: Program, originalProgram: Program | undefined, updatedFile: SourceFile) => {
        importAdder = codefix.createImportAdder(updatedFile, updatedProgram, preferences, host);
        if (copiedFrom?.range) {
            Debug.assert(copiedFrom.range.length === pastedText.length);
            copiedFrom.range.forEach(copy => {
                const statementsInSourceFile = copiedFrom.file.statements;
                const startNodeIndex = findIndex(statementsInSourceFile, s => s.end > copy.pos);
                if (startNodeIndex === -1) return undefined;
                let endNodeIndex = findIndex(statementsInSourceFile, s => s.end >= copy.end, startNodeIndex);
                /**
                 * [|console.log(a);
                 * |]
                 * console.log(b);
                 */
                if (endNodeIndex !== -1 && copy.end <= statementsInSourceFile[endNodeIndex].getStart()) {
                    endNodeIndex--;
                }
                statements.push(...statementsInSourceFile.slice(startNodeIndex, endNodeIndex === -1 ? statementsInSourceFile.length : endNodeIndex + 1));
            });
            const usage = getUsageInfo(copiedFrom.file, statements, originalProgram!.getTypeChecker(), getExistingLocals(updatedFile, statements, originalProgram!.getTypeChecker()), { pos: copiedFrom.range[0].pos, end: copiedFrom.range[copiedFrom.range.length - 1].end });
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

    /**
     * If there are no import fixes, getPasteEdits should return without making any changes to the file.
     */
    if (!importAdder!.hasFixes()) {
        return;
    }
    pasteLocations.forEach((paste, i) => {
        changes.replaceRangeWithText(
            targetFile,
            { pos: paste.pos, end: paste.end },
            actualPastedText ?
                actualPastedText[0] : pastedText[i],
        );
    });
}

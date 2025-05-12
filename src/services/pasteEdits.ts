import {
    CancellationToken,
    codefix,
    Debug,
    fileShouldUseJavaScriptRequire,
    findAncestor,
    findIndex,
    findTokenOnLeftOfPosition,
    forEachChild,
    formatting,
    getNewLineOrDefaultFromHost,
    getQuotePreference,
    getTokenAtPosition,
    isIdentifier,
    Program,
    rangeContainsPosition,
    rangeContainsRange,
    SourceFile,
    Statement,
    SymbolFlags,
    textChanges,
    TextRange,
    UserPreferences,
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

interface CopiedFromInfo {
    file: SourceFile;
    range: TextRange[];
}

function pasteEdits(
    targetFile: SourceFile,
    pastedText: string[],
    pasteLocations: TextRange[],
    copiedFrom: CopiedFromInfo | undefined,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    changes: textChanges.ChangeTracker,
) {
    let actualPastedText: string | undefined;
    if (pastedText.length !== pasteLocations.length) {
        actualPastedText = pastedText.length === 1 ? pastedText[0] : pastedText.join(getNewLineOrDefaultFromHost(formatContext.host, formatContext.options));
    }

    const statements: Statement[] = [];
    let newText = targetFile.text;
    for (let i = pasteLocations.length - 1; i >= 0; i--) {
        const { pos, end } = pasteLocations[i];
        newText = actualPastedText ? newText.slice(0, pos) + actualPastedText + newText.slice(end) : newText.slice(0, pos) + pastedText[i] + newText.slice(end);
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
            Debug.assertIsDefined(originalProgram, "no original program found");
            const originalProgramTypeChecker = originalProgram.getTypeChecker();
            const usageInfoRange = getUsageInfoRangeForPasteEdits(copiedFrom);
            const usage = getUsageInfo(copiedFrom.file, statements, originalProgramTypeChecker, getExistingLocals(updatedFile, statements, originalProgramTypeChecker), usageInfoRange);
            const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(targetFile.fileName, originalProgram, host, !!copiedFrom.file.commonJsModuleIndicator);
            addExportsInOldFile(copiedFrom.file, usage.targetFileImportsFromOldFile, changes, useEsModuleSyntax);
            addTargetFileImports(copiedFrom.file, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, originalProgramTypeChecker, updatedProgram, importAdder);
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

            // `updatedRanges` represent the new ranges that account for the offset changes caused by pasting new text and
            // `offset` represents by how much the starting position of `pasteLocations` needs to be changed.
            //
            // We iterate over each updated range to get the node that wholly encloses the updated range.
            // For each child of that node, we checked for unresolved identifiers
            // within the updated range and try importing it.
            let offset = 0;
            pasteLocations.forEach((location, i) => {
                const oldTextLength = location.end - location.pos;
                const textToBePasted = actualPastedText ?? pastedText[i];
                const startPos = location.pos + offset;
                const endPos = startPos + textToBePasted.length;
                const range: TextRange = { pos: startPos, end: endPos };
                offset += textToBePasted.length - oldTextLength;

                const enclosingNode = findAncestor(
                    getTokenAtPosition(context.sourceFile, range.pos),
                    ancestorNode => rangeContainsRange(ancestorNode, range),
                );
                if (!enclosingNode) return;

                forEachChild(enclosingNode, function importUnresolvedIdentifiers(node) {
                    const isImportCandidate = isIdentifier(node) &&
                        rangeContainsPosition(range, node.getStart(updatedFile)) &&
                        !updatedProgram?.getTypeChecker().resolveName(
                            node.text,
                            node,
                            SymbolFlags.All,
                            /*excludeGlobals*/ false,
                        );
                    if (isImportCandidate) {
                        return importAdder.addImportForUnresolvedIdentifier(
                            context,
                            node,
                            /*useAutoImportProvider*/ true,
                        );
                    }
                    node.forEachChild(importUnresolvedIdentifiers);
                });
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
            actualPastedText ?? pastedText[i],
        );
    });
}

/**
 * Adjusts the range for `getUsageInfo` to correctly include identifiers at the edges of the copied text.
 */
function getUsageInfoRangeForPasteEdits({ file: sourceFile, range }: CopiedFromInfo) {
    const pos = range[0].pos;
    const end = range[range.length - 1].end;
    const startToken = getTokenAtPosition(sourceFile, pos);
    const endToken = findTokenOnLeftOfPosition(sourceFile, pos) ?? getTokenAtPosition(sourceFile, end);
    // Since the range is only used to check identifiers, we do not need to adjust range when the tokens at the edges are not identifiers.
    return {
        pos: isIdentifier(startToken) && pos <= startToken.getStart(sourceFile) ? startToken.getFullStart() : pos,
        end: isIdentifier(endToken) && end === endToken.getEnd() ? textChanges.getAdjustedEndPosition(sourceFile, endToken, {}) : end,
    };
}

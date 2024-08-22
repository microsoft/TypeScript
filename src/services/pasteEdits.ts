import {
    CancellationToken,
    codefix,
    Debug,
    findAncestor,
    findIndex,
    forEachChild,
    formatting,
    getNewLineOrDefaultFromHost,
    getQuotePreference,
    getTokenAtPosition,
    Identifier,
    isIdentifier,
    Program,
    rangeContainsPosition,
    rangeContainsRange,
    skipAlias,
    SourceFile,
    Statement,
    Symbol,
    SymbolFlags,
    textChanges,
    TextRange,
    UserPreferences,
} from "./_namespaces/ts.js";
import { ImportAdder } from "./codefixes/importFixes.js";
import {
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
    let actualPastedText: string | undefined;
    if (pastedText.length !== pasteLocations.length) {
        actualPastedText = pastedText.length === 1 ? pastedText[0] : pastedText.join(getNewLineOrDefaultFromHost(formatContext.host, formatContext.options));
    }
    
    let newText = targetFile.text;
    for (let i = pasteLocations.length - 1; i >= 0; i--) {
        const { pos, end } = pasteLocations[i];
        newText = actualPastedText ? newText.slice(0, pos) + actualPastedText + newText.slice(end) : newText.slice(0, pos) + pastedText[i] + newText.slice(end);
    }

    let importAdder: codefix.ImportAdder;
    const symbolsUsageCopiedFrom = new Map<string, [Symbol, boolean, codefix.ImportOrRequireAliasDeclaration | undefined]>();
    Debug.checkDefined(host.runWithTemporaryFileUpdate).call(host, targetFile.fileName, newText, (updatedProgram: Program, originalProgram: Program | undefined, updatedFile: SourceFile) => {
        importAdder = codefix.createImportAdder(updatedFile, updatedProgram, preferences, host);
        if (copiedFrom) {
            Debug.assert(copiedFrom.range.length === pastedText.length);
            const statements: Statement[] = [];
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
            // Map created with `symbol.name` as the key to retrieve symbols declared in the old file that need to be resolved in the target file (only the one's that were exported).
            for (const [symbol, [isValidTypeOnlyUseSite, declaration]] of usage.oldImportsNeededByTargetFile) {
                symbolsUsageCopiedFrom.set(symbol.name, [symbol, isValidTypeOnlyUseSite, declaration]);
            }
            for (const [symbol, isValidTypeOnlyUseSite] of usage.targetFileImportsFromOldFile) {
                if (symbol.parent) {
                    symbolsUsageCopiedFrom.set(symbol.name, [symbol, isValidTypeOnlyUseSite, undefined]);
                }
            }
        }

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
                getTokenAtPosition(updatedFile, range.pos),
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
                    Debug.assertIsDefined(originalProgram);
                    return addImportsForUnresolvedIdentifiers(node, updatedFile, originalProgram, updatedProgram, importAdder, host, preferences, formatContext, cancellationToken, copiedFrom, symbolsUsageCopiedFrom);
                }
                node.forEachChild(importUnresolvedIdentifiers);
            });
        });
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

function addImportsForUnresolvedIdentifiers(
    node: Identifier,
    updatedFile: SourceFile,
    originalProgram: Program,
    updatedProgram: Program,
    importAdder: ImportAdder,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    copiedFrom?: { file: SourceFile; range: TextRange[]; } | undefined,
    symbolsUsageCopiedFrom?: Map<string, [Symbol, boolean, codefix.ImportOrRequireAliasDeclaration | undefined]>,
) {
    if (copiedFrom) {
        const usageValues = symbolsUsageCopiedFrom!.get(node.text);
        if (!usageValues) return;
        const [symbol, isValidTypeOnlyUseSite, referenceImport] = usageValues;
        return importAdder.addImportFromExportedSymbol(
            skipAlias(symbol, updatedProgram.getTypeChecker()),
            isValidTypeOnlyUseSite,
            referenceImport,
        );
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
        return importAdder.addImportForUnresolvedIdentifier(
            context,
            node,
            /*useAutoImportProvider*/ true,
        );
    }
}

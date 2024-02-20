import {
    addRange,
    append,
} from "../compiler/core";
import {
    AnyImportOrRequireStatement,
    CancellationToken,
    Identifier,
    ModifierFlags,
    Program,
    SourceFile,
    Statement,
    SymbolFlags,
    TextRange,
    TypeChecker,
    UserPreferences,
} from "../compiler/types";
import {
    getLineOfLocalPosition,
    hasSyntacticModifier,
    skipAlias,
} from "../compiler/utilities";
import {
    codefix,
    Debug,
    factory,
    fileShouldUseJavaScriptRequire,
    forEachChild,
    formatting,
    getQuotePreference,
    insertImports,
    isIdentifier,
    nodeSeenTracker,
    Symbol,
    textChanges,
} from "./_namespaces/ts";
import {
    addExportToChanges,
    filterImport,
    forEachImportInStatement,
    getExistingLocals,
    getTopLevelDeclarationStatement,
    getUsageInfo,
    isTopLevelDeclaration,
    makeImportOrRequire,
    moduleSpecifierFromImport,
    nameOfTopLevelDeclaration,
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
    //pastes: { text: string; range: TextRange; }[],
    copies: { text: string; copyRange?: { file: SourceFile; range: TextRange;} }[],
    pastes: TextRange[],
    host: LanguageServiceHost,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    //originalFile?: SourceFile,
    //copyLocation?: { file: string; range: TextRange; },
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
    const updatedTargetFile = host.runWithTemporaryFileUpdate?.(targetFile.fileName, targetFile.getText().slice(0, pastes[0].pos) + copy.text + targetFile.getText().slice(pastes[0].end));
    const statements: Statement[] = [];
    Debug.assert(updatedTargetFile && updatedTargetFile.updatedFile && updatedTargetFile.originalProgram && updatedTargetFile.updatedProgram);

    if (copy.copyRange) {
        const _start = getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.pos);
        const _end = getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.end);
        addRange(statements, copy.copyRange.file.statements, getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.pos), getLineOfLocalPosition(copy.copyRange.file, copy.copyRange.range.end) + 1);
        const usage = getUsageInfo(copy.copyRange.file, statements, updatedTargetFile.originalProgram.getTypeChecker(), getExistingLocals(updatedTargetFile.updatedFile, statements, updatedTargetFile.originalProgram.getTypeChecker()));
        const importAdder = codefix.createImportAdder(updatedTargetFile.updatedFile, updatedTargetFile.updatedProgram, preferences, host);

        const imports = getImportsFromKnownOriginalFile(copy.copyRange.file, targetFile, updatedTargetFile.updatedProgram, importAdder, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes, preferences, host, updatedTargetFile.originalProgram.getTypeChecker());
        if (imports.length > 0) {
            insertImports(changes, targetFile, imports, /*blankLineBetween*/ true, preferences);
        }
        importAdder.writeFixes(changes, getQuotePreference(copy.copyRange.file, preferences));
        host.revertUpdatedFile?.(targetFile.fileName, updatedTargetFile.updatedFile.text, targetFile.text);
    }
    else {
        const context: CodeFixContextBase = {
            sourceFile: updatedTargetFile.updatedFile,
            program: updatedTargetFile.originalProgram,
            cancellationToken,
            host,
            preferences,
            formatContext,
        };
        const importAdder = codefix.createImportAdder(updatedTargetFile.updatedFile, updatedTargetFile.updatedProgram, preferences, host);
        forEachChild(updatedTargetFile.updatedFile, function cb(node) {
            if (isIdentifier(node)) {
                if (!updatedTargetFile.originalProgram?.getTypeChecker().resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ false)) {
                    // generate imports
                    importAdder.addImportForUnresolvedIdentifier(context, node, /*useAutoImportProvider*/ true);
                }
            }
            else {
                node.forEachChild(cb);
            }
        });
        importAdder.writeFixes(changes, getQuotePreference(targetFile, preferences));
        host.revertUpdatedFile?.(targetFile.fileName, updatedTargetFile.updatedFile.text, targetFile.text);
    }
    pastes.forEach((paste) => {
        changes.replaceRangeWithText(targetFile, { pos: paste.pos, end: paste.end }, copy.text);
        //range.pos === range.end ? changes.replaceRangeWithText(targetFile, { pos: range.pos, end: range.end }, text) : changes.replaceRangeWithText(targetFile, { pos: range.pos, end: range.end }, text);
    });
}

function getImportsFromKnownOriginalFile(
    originalFile: SourceFile,
    targetFile: SourceFile,
    program: Program,
    importAdder: codefix.ImportAdder,
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    preferences: UserPreferences,
    host: LanguageServiceHost,
    checker: TypeChecker,
) {
    const copiedOldImports: AnyImportOrRequireStatement[] = [];
    importsToCopy.forEach((isValidTypeOnlyUseSite, symbol) => {
        try {
            importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker), isValidTypeOnlyUseSite);
        }
        catch {
            for (const oldStatement of originalFile.statements) {
                forEachImportInStatement(oldStatement, i => {
                    append(copiedOldImports, filterImport(i, factory.createStringLiteral(moduleSpecifierFromImport(i).text), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
                });
            }
        }
    });

    const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(targetFile.fileName, program, host, !!originalFile.commonJsModuleIndicator);
    const quotePreference = getQuotePreference(targetFile, preferences);
    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    let oldFileDefault: Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    targetFileImportsFromOldFile.forEach(symbol => {
        if (!symbol.declarations) {
            return;
        }
        for (const decl of symbol.declarations) {
            if (!isTopLevelDeclaration(decl)) continue;
            const name = nameOfTopLevelDeclaration(decl);
            if (!name) continue;

            const top = getTopLevelDeclarationStatement(decl);
            if (markSeenTop(top)) {
                addExportToChanges(originalFile, top, name, changes, useEsModuleSyntax);
            }
            if (importAdder && checker.isUnknownSymbol(symbol)) {
                importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker));
            }
            else {
                if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        }
    });

    return append(copiedOldImports, makeImportOrRequire(targetFile, oldFileDefault, oldFileNamedImports, originalFile.fileName, program, host, useEsModuleSyntax, quotePreference));
}

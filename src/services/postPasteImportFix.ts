import { addRange, append } from "../compiler/core";
import { SourceFile, Statement, UserPreferences, TypeChecker, AnyImportOrRequireStatement, Identifier, ModifierFlags, Program, TextRange, CancellationToken, ImportClause, ObjectBindingPattern, TypeOnlyAliasDeclaration, SymbolFlags } from "../compiler/types";
import { hasSyntacticModifier, skipAlias } from "../compiler/utilities";
import { codefix, Debug, factory, fileShouldUseJavaScriptRequire, forEachChild, formatting, getQuotePreference, ImportKind, insertImports, nodeSeenTracker, Symbol, SymbolExportInfo, textChanges, isIdentifier } from "./_namespaces/ts";
import { addExportToChanges, filterImport, forEachImportInStatement, getTopLevelDeclarationStatement, getUsageInfo, isTopLevelDeclaration, makeImportOrRequire, moduleSpecifierFromImport, nameOfTopLevelDeclaration } from "./refactors/moveToFile";
import { CodeFixContextBase, CopyRange, FileTextChanges, LanguageServiceHost, PostPasteImportFixes } from "./types";

/** @internal */
export function postPastImportFixProvider(
    targetFile: SourceFile, 
    host: LanguageServiceHost,
    pastes: Array<{text: string; range: TextRange}>,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    originalFile?: SourceFile,
    copyLocation?: CopyRange): PostPasteImportFixes {

    let changes: FileTextChanges[] = [];
    changes = textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => postPasteFixes(targetFile, host, pastes, preferences, formatContext, cancellationToken, changeTracker, originalFile, copyLocation));

    return { edits: changes }; 
}

function postPasteFixes (
    targetFile: SourceFile, 
    host: LanguageServiceHost,
    pastes: Array<{text: string; range: TextRange}>,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    cancellationToken: CancellationToken,
    changes: textChanges.ChangeTracker,
    originalFile?: SourceFile,
    copyLocation?: CopyRange) {

    const updatedTargetFile = host.updateTargetFile?.(targetFile.fileName, targetFile.getText(), targetFile.getText().slice(0, pastes[0].range.pos) + pastes[0].text + targetFile.getText().slice(0, pastes[0].range.end));
    let statements: Statement[] = [];
    Debug.assert(updatedTargetFile && updatedTargetFile.updatedFile && updatedTargetFile.originalProgram && updatedTargetFile.updatedProgram);
    
    if (originalFile) {
        addRange(statements, originalFile.statements, copyLocation?.start.line, copyLocation ? copyLocation.end.line + 1 : undefined); 
        const usage = getUsageInfo(originalFile, statements, updatedTargetFile.originalProgram.getTypeChecker()); 
        const importAdder = codefix.createImportAdder(updatedTargetFile.updatedFile, updatedTargetFile.updatedProgram, preferences, host);

        const imports = getImportsFromKnownOriginalFile(originalFile, targetFile, updatedTargetFile.updatedProgram, importAdder, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes, preferences, host, updatedTargetFile.originalProgram.getTypeChecker());
        if (imports.length > 0) {
            insertImports(changes, targetFile, imports, /*blankLineBetween*/ true, preferences);
        }
        importAdder.writeFixes(changes, getQuotePreference(originalFile, preferences));
        //changes.replaceRangeWithText(targetFile, pastedRange, pastedText);
        host.revertUpdatedFile?.(targetFile.fileName, updatedTargetFile.updatedFile.text, targetFile.text); 
    }
    else {
        const context: CodeFixContextBase = {
            sourceFile: updatedTargetFile.updatedFile,
            program: updatedTargetFile.originalProgram,
            cancellationToken: cancellationToken,
            host: host,
            preferences: preferences, 
            formatContext: formatContext
        }
        const importAdder = codefix.createImportAdder(updatedTargetFile.updatedFile, updatedTargetFile.updatedProgram, preferences, host);
        forEachChild(updatedTargetFile.updatedFile, function cb(node) {
            if (isIdentifier(node)) {
                if (!updatedTargetFile.updatedProgram?.getTypeChecker().resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ true) &&
                    !updatedTargetFile.originalProgram?.getTypeChecker().resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ false)) {
                    //generate imports
                    importAdder.addImportsForUnknownSymbols(context, node, /*useAutoImportProvider*/ true);
                }
            }
            else {
                node.forEachChild(cb);
            }
        });
        //changes.replaceRangeWithText(targetFile, pastedRange, pastedText);
        importAdder.writeFixes(changes, getQuotePreference(targetFile, preferences));
        host.revertUpdatedFile?.(targetFile.fileName, updatedTargetFile.updatedFile.text, targetFile.text);
    }
    pastes.forEach(({ text, range}) => {
        changes.replaceRangeWithText(targetFile, range, text);
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
    checker: TypeChecker) {
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

    return append(copiedOldImports, makeImportOrRequire(targetFile, oldFileDefault, oldFileNamedImports, originalFile.fileName, program, host, useEsModuleSyntax, quotePreference))
}
import { addRange, append } from "../compiler/core";
import { SourceFile, Statement, UserPreferences, TypeChecker, AnyImportOrRequireStatement, Identifier, ModifierFlags, Program, TextRange } from "../compiler/types";
import { hasSyntacticModifier, skipAlias } from "../compiler/utilities";
import { codefix, factory, fileShouldUseJavaScriptRequire, formatting, getLineInfo, getQuotePreference, insertImports, nodeSeenTracker, Symbol, textChanges } from "./_namespaces/ts";
import { addExportToChanges, filterImport, forEachImportInStatement, getTopLevelDeclarationStatement, getUsageInfo, isTopLevelDeclaration, makeImportOrRequire, moduleSpecifierFromImport, nameOfTopLevelDeclaration } from "./refactors/moveToFile";
import { CopyRange, FileTextChanges, LanguageServiceHost } from "./types";

/** @internal */
export function postPastImportFixProvider(
    targetFile: SourceFile, 
    host: LanguageServiceHost,
    pastes: Array<{text: string; range: TextRange}>,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    originalFile?: SourceFile,
    copyLocation?: CopyRange): FileTextChanges[] {

    /**
     * When the source file exists
     * 1.Need to turn pasted text, in pastes.text into statements
     * 2.use getUsageInfo() to the symbols that need to be imported
     * 3.use the if and the third part of getTargetFileImportsAndAddExportInOldFile
     *  */ 
    const { updatedFile, updatedProgram, originalProgram } = host.updatedTargetFile(targetFile.fileName, targetFile.text, pastes[0].text);
    let statements: Statement[] = [];

    if (originalFile && originalProgram && updatedFile && updatedProgram) {
        //addRange(statements, updatedFile?.statements, updatedFile?.statements.length - (targetFileStatements ? targetFileStatements.length : 0) - 1);
        //addRange(statements, originalFile?.statements, 2);
        //const start = originalFile.statements[0].getStart(originalFile);//addRange(statements, originalFile.statements, updatedFile.statements[updatedFile.statements.length - targetFileStatements.length].getStart(originalFile))
        
        //addRange(statements, updatedFile.statements, a.getStart(originalFile), b.getStart(originalFile));
        // const a = updatedFile.statements[updatedFile.getLineAndCharacterOfPosition(pastes[0].range.pos).line] //21
        // const b = updatedFile.statements[updatedFile.getLineAndCharacterOfPosition(pastes[0].range.end).line] //pastes[0].range.end + pastes[0].range.length - 1
        addRange(statements, originalFile.statements, copyLocation?.start.line, copyLocation?.end.line); 
        const usage = getUsageInfo(originalFile, statements, originalProgram.getTypeChecker()); 
        const importAdder = codefix.createImportAdder(updatedFile, updatedProgram, preferences, host);

        return textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => getImports(originalFile, updatedFile, statements, updatedProgram, importAdder, usage.oldImportsNeededByTargetFile,
            usage.targetFileImportsFromOldFile, changeTracker, preferences, host, updatedProgram.getTypeChecker()));  
    }
    else {
        return [];
    }
    

    //const unknownSymbols = host.getFakeSourceFile(targetFile,pastes[0].text,targetFile, targetFileText);
}

function getImports(
    originalFile: SourceFile,
    targetFile: SourceFile,
    statements: Statement[],
    program: Program,
    importAdder: codefix.ImportAdder,
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    preferences: UserPreferences,
    host: LanguageServiceHost,
    checker: TypeChecker) {

    const imports = getTargetFileImportsForKnownOriginalFile(originalFile, targetFile, program, importAdder, importsToCopy, targetFileImportsFromOldFile, changes, preferences, host, checker);
    if (imports.length > 0) {
        insertImports(changes, targetFile, imports, /*blankLineBetween*/ true, preferences);
    }
    importAdder.writeFixes(changes, getQuotePreference(originalFile, preferences));
    changes.insertNodesAtEndOfFile(targetFile, statements, true); //NEEDS TO BE FIXED!!!!!!!!!!!!
}

function getTargetFileImportsForKnownOriginalFile(
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
            for (const oldStatement of originalFile.statements) { //might be changed to just statements, meaning that the updated statements in the target file
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

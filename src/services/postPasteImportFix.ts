import { addRange, append, arrayFrom, flatMap, flatMapIterator } from "../compiler/core";
import { SourceFile, Statement, UserPreferences, TypeChecker, AnyImportOrRequireStatement, Identifier, ModifierFlags, Program, TextRange, CancellationToken, InternalSymbolName, ImportClause, ObjectBindingPattern, TypeOnlyAliasDeclaration } from "../compiler/types";
import { hasSyntacticModifier, isJSXTagName, isValidTypeOnlyAliasUseSite, skipAlias } from "../compiler/utilities";
import { codefix, Debug, DiagnosticOrDiagnosticAndArguments, factory, fileShouldUseJavaScriptRequire, formatting, getMeaningFromLocation, getQuotePreference, ImportKind, insertImports, nodeSeenTracker, Symbol, SymbolExportInfo, textChanges } from "./_namespaces/ts";
import { getSymbolNamesToImport, shouldUseRequire, getExportInfos, getImportFixes, codeActionForFixWorker } from "./codefixes/importFixes";
import { addExportToChanges, filterImport, forEachImportInStatement, getTopLevelDeclarationStatement, getUsageInfo, isTopLevelDeclaration, makeImportOrRequire, moduleSpecifierFromImport, nameOfTopLevelDeclaration } from "./refactors/moveToFile";
import { CopyRange, FileTextChanges, LanguageServiceHost, PostPasteImportFixes } from "./types";

/** @internal */
export function postPastImportFixProvider(
    targetFile: SourceFile, 
    host: LanguageServiceHost,
    pastes: Array<{text: string; range: TextRange}>,
    preferences: UserPreferences,
    formatContext: formatting.FormatContext,
    originalFile?: SourceFile,
    copyLocation?: CopyRange): PostPasteImportFixes[] {

    /**
     * When the source file exists
     * 1.Need to turn pasted text, in pastes.text into statements
     * 2.use getUsageInfo() to the symbols that need to be imported
     * 3.use the if and the third part of getTargetFileImportsAndAddExportInOldFile
     *  */ 
    //const originalText = targetFile.text;
    const { updatedFile, updatedProgram, originalProgram } = host.updateTargetFile(targetFile.fileName, targetFile.text, pastes[0].text);
    let statements: Statement[] = [];

    if (originalFile && originalProgram && updatedFile && updatedProgram) {
        addRange(statements, originalFile.statements, copyLocation?.start.line, copyLocation ? copyLocation.end.line + 1 : undefined); 
        const usage = getUsageInfo(originalFile, statements, originalProgram.getTypeChecker()); 
        const importAdder = codefix.createImportAdder(updatedFile, updatedProgram, preferences, host);

        const changes = textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => getImports(originalFile, updatedFile, statements, updatedProgram, importAdder, usage.oldImportsNeededByTargetFile,
            usage.targetFileImportsFromOldFile, changeTracker, preferences, host, originalProgram.getTypeChecker()));
        host.revertUpdatedFile(targetFile.fileName, updatedFile.text, targetFile.text);
        return [{changes}];
    }
    else {
        Debug.assert(updatedFile !== undefined && originalProgram !== undefined);
        Debug.assert(updatedProgram !== undefined);
        const fixInfo = host.getFakeSourceFile(targetFile.fileName, formatContext, updatedFile, updatedProgram, originalProgram);
        const fixes = fixInfo.map(({fix, symbolName}) => getImportsForUnknownSourceFile(
            { host, formatContext, preferences },
                updatedFile,
                symbolName,
                fix,
                true,
                updatedProgram,
                preferences,
        ));
        host.revertUpdatedFile(targetFile.fileName, updatedFile.text, targetFile.text);
        return fixes;
    }
    

    //const unknownSymbols = host.getFakeSourceFile(targetFile,pastes[0].text,targetFile, targetFileText);
}

function getImportsForUnknownSourceFile(
    context: textChanges.TextChangesContext,
    sourceFile: SourceFile,
    symbolName: string,
    fix: codefix.FixInfo["fix"],
    includeSymbolNameInDescription: boolean,
    program: Program,
    preferences: UserPreferences,
): PostPasteImportFixes {
    let diag!: DiagnosticOrDiagnosticAndArguments;
    const changes = textChanges.ChangeTracker.with(context, tracker => {
        diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, includeSymbolNameInDescription, program, preferences);
    });
    return {changes};
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
// interface FixInfo {
//     readonly fix: ImportFix;
//     readonly symbolName: string;
//     readonly errorIdentifierText: string | undefined;
//     readonly isJsxNamespaceFix?: boolean;
// }
// export function tempFunction(updatedFile: SourceFile, originalProgram: Program, node: Identifier, languageServiceHost: LanguageServiceHost, cancellationToken: CancellationToken, preferences: UserPreferences) {
//     return flatMap(getSymbolNamesToImport(updatedFile, originalProgram.getTypeChecker(), node, originalProgram.getCompilerOptions()), symbolName => {
//         // "default" is a keyword and not a legal identifier for the import, but appears as an identifier.
//         if (symbolName === InternalSymbolName.Default) {
//             return undefined;
//         }
//         const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(node);
//         const useRequire = shouldUseRequire(updatedFile, originalProgram);
//         const exportInfo = getExportInfos(symbolName, isJSXTagName(node), getMeaningFromLocation(node), cancellationToken, updatedFile, originalProgram, true, languageServiceHost, preferences);
//         //const t1 = exportInfo.values();
//         //const fix = ts.flatMapIterator(exportInfo.values(), exportInfos => getImportFixes(exportInfos, node.getStart(updatedFile), isValidTypeOnlyUseSite, useRequire, originalProgram, updatedFile, languageServiceHost, preferences).fixes);
//        return arrayFrom(
//             flatMapIterator(exportInfo.values(), exportInfos => getImportFixes(exportInfos, node.getStart(updatedFile), isValidTypeOnlyUseSite, useRequire, originalProgram, updatedFile, languageServiceHost, preferences).fixes),
//             fix => ({ fix, symbolName, errorIdentifierText: node.text, isJsxNamespaceFix: symbolName !== node.text }),
//         );
//     });

// }

// type ImportFix = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport | FixPromoteTypeOnlyImport;
// type ImportFixWithModuleSpecifier = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport;

const enum ImportFixKind {
    UseNamespace,
    JsdocTypeImport,
    AddToExisting,
    AddNew,
    PromoteTypeOnly,
}
interface ImportFixBase {
    readonly isReExport?: boolean;
    readonly exportInfo?: SymbolExportInfo;
    readonly moduleSpecifier: string;
}
const enum AddAsTypeOnly {
    Allowed = 1 << 0,
    Required = 1 << 1,
    NotAllowed = 1 << 2,
}
interface FixPromoteTypeOnlyImport {
    readonly kind: ImportFixKind.PromoteTypeOnly;
    readonly typeOnlyAliasDeclaration: TypeOnlyAliasDeclaration;
}
interface Qualification {
    readonly usagePosition: number;
    readonly namespacePrefix: string;
}
interface FixUseNamespaceImport extends ImportFixBase, Qualification {
    readonly kind: ImportFixKind.UseNamespace;
}
// interface FixAddJsdocTypeImport extends ImportFixBase {
//     readonly kind: ImportFixKind.JsdocTypeImport;
//     readonly usagePosition: number;
//     readonly isReExport: boolean;
//     readonly exportInfo: SymbolExportInfo;
// }
interface FixAddToExistingImport extends ImportFixBase {
    readonly kind: ImportFixKind.AddToExisting;
    readonly importClauseOrBindingPattern: ImportClause | ObjectBindingPattern;
    readonly importKind: ImportKind.Default | ImportKind.Named;
    readonly addAsTypeOnly: AddAsTypeOnly;
}
interface FixAddNewImport extends ImportFixBase {
    readonly kind: ImportFixKind.AddNew;
    readonly importKind: ImportKind;
    readonly addAsTypeOnly: AddAsTypeOnly;
    readonly useRequire: boolean;
    readonly qualification?: Qualification;
}
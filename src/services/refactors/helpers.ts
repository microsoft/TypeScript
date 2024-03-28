import {
    AnyImportOrRequireStatement,
    append,
    codefix,
    factory,
    hasSyntacticModifier,
    Identifier,
    ModifierFlags,
    Program,
    skipAlias,
    SourceFile,
    Symbol,
    textChanges,
    TypeChecker,
} from "../_namespaces/ts";
import {
    LanguageServiceHost,
} from "../types";
import {
    nodeSeenTracker,
    QuotePreference,
} from "../utilities";
import {
    addExportToChanges,
    filterImport,
    forEachImportInStatement,
    getTopLevelDeclarationStatement,
    isTopLevelDeclaration,
    makeImportOrRequire,
    moduleSpecifierFromImport,
    nameOfTopLevelDeclaration,
} from "./moveToFile";

/**
 * Returned by refactor functions when some error message needs to be surfaced to users.
 *
 * @internal
 */
export interface RefactorErrorInfo {
    error: string;
}

/**
 * Checks if some refactor info has refactor error info.
 *
 * @internal
 */
export function isRefactorErrorInfo(info: unknown): info is RefactorErrorInfo {
    return (info as RefactorErrorInfo).error !== undefined;
}

/**
 * Checks if string "known" begins with string "requested".
 * Used to match requested kinds with a known kind.
 *
 * @internal
 */
export function refactorKindBeginsWith(known: string, requested: string | undefined): boolean {
    if (!requested) return true;
    return known.substr(0, requested.length) === requested;
}

/** @internal */
export function getTargetFileImportsAndAddExportInOldFile(
    oldFile: SourceFile,
    targetFile: string,
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    host: LanguageServiceHost,
    useEsModuleSyntax: boolean,
    quotePreference: QuotePreference,
    importAdder?: codefix.ImportAdder,
) {
    const copiedOldImports: AnyImportOrRequireStatement[] = [];
    /**
     * Recomputing the imports is preferred with importAdder because it manages multiple import additions for a file and writes then to a ChangeTracker,
     * but sometimes it fails because of unresolved imports from files, or when a source file is not available for the target file (in this case when creating a new file).
     * So in that case, fall back to copying the import verbatim.
     */
    if (importAdder) {
        importsToCopy.forEach((isValidTypeOnlyUseSite, symbol) => {
            try {
                importAdder.addImportFromSymbol(skipAlias(symbol, checker), isValidTypeOnlyUseSite);
            }
            catch {
                for (const oldStatement of oldFile.statements) {
                    forEachImportInStatement(oldStatement, i => {
                        append(copiedOldImports, filterImport(i, factory.createStringLiteral(moduleSpecifierFromImport(i).text), name => checker.getSymbolAtLocation(name) === symbol));
                    });
                }
            }
        });
    }
    else {
        // When target file does not exist
        for (const oldStatement of oldFile.statements) {
            forEachImportInStatement(oldStatement, i => {
                append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
            });
        }
    }

    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    const targetFileSourceFile = program.getSourceFile(targetFile);
    let oldFileDefault: Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const oldFileSymbols: Symbol[] = [];
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
                addExportToChanges(oldFile, top, name, changes, useEsModuleSyntax);
                oldFileSymbols.push(symbol);
            }
            if (!importAdder) {
                if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        }
    });

    targetFileSourceFile ? makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference, oldFileSymbols, importAdder, targetFileSourceFile) :
        append(copiedOldImports, makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference));
    return copiedOldImports;
}

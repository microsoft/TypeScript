import {
    codefix,
    Debug,
    findAncestor,
    isAnyImportOrRequireStatement,
    Program,
    skipAlias,
    SourceFile,
    Symbol,
    TypeChecker,
} from "../_namespaces/ts";
import { addImportsForMovedSymbols } from "./moveToFile";
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
export function addTargetFileImports(
    oldFile: SourceFile,
    importsToCopy: Map<Symbol, [boolean, codefix.ImportOrRequireAliasDeclaration | undefined]>,
    targetFileImportsFromOldFile: Map<Symbol, boolean>,
    checker: TypeChecker,
    program: Program,
    importAdder: codefix.ImportAdder,
) {
    /**
     * Recomputing the imports is preferred with importAdder because it manages multiple import additions for a file and writes then to a ChangeTracker,
     * but sometimes it fails because of unresolved imports from files, or when a source file is not available for the target file (in this case when creating a new file).
     * So in that case, fall back to copying the import verbatim.
     */
    importsToCopy.forEach(([isValidTypeOnlyUseSite, declaration], symbol) => {
        const targetSymbol = skipAlias(symbol, checker);
        if (checker.isUnknownSymbol(targetSymbol)) {
            importAdder.addVerbatimImport(Debug.checkDefined(declaration ?? findAncestor(symbol.declarations?.[0], isAnyImportOrRequireStatement)));
        }
        else {
            importAdder.addImportFromExportedSymbol(targetSymbol, isValidTypeOnlyUseSite, declaration);
        }
    });

    addImportsForMovedSymbols(targetFileImportsFromOldFile, oldFile.fileName, importAdder, program);
}

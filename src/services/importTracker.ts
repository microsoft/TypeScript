import * as ts from "./_namespaces/ts";

/* Code for finding imports of an exported symbol. Used only by FindAllReferences. */

/** @internal */
export interface ImportsResult {
    /** For every import of the symbol, the location and local symbol for the import. */
    importSearches: readonly [ts.Identifier, ts.Symbol][];
    /** For rename imports/exports `{ foo as bar }`, `foo` is not a local, so it may be added as a reference immediately without further searching. */
    singleReferences: readonly (ts.Identifier | ts.StringLiteral)[];
    /** List of source files that may (or may not) use the symbol via a namespace. (For UMD modules this is every file.) */
    indirectUsers: readonly ts.SourceFile[];
}
/** @internal */
export type ImportTracker = (exportSymbol: ts.Symbol, exportInfo: ExportInfo, isForRename: boolean) => ImportsResult;

/** @internal */
/** Creates the imports map and returns an ImportTracker that uses it. Call this lazily to avoid calling `getDirectImportsMap` unnecessarily.  */
export function createImportTracker(sourceFiles: readonly ts.SourceFile[], sourceFilesSet: ts.ReadonlySet<string>, checker: ts.TypeChecker, cancellationToken: ts.CancellationToken | undefined): ImportTracker {
    const allDirectImports = getDirectImportsMap(sourceFiles, checker, cancellationToken);
    return (exportSymbol, exportInfo, isForRename) => {
        const { directImports, indirectUsers } = getImportersForExport(sourceFiles, sourceFilesSet, allDirectImports, exportInfo, checker, cancellationToken);
        return { indirectUsers, ...getSearchesFromDirectImports(directImports, exportSymbol, exportInfo.exportKind, checker, isForRename) };
    };
}

/** @internal */
/** Info about an exported symbol to perform recursive search on. */
export interface ExportInfo {
    exportingModuleSymbol: ts.Symbol;
    exportKind: ExportKind;
}

/** @internal */
export const enum ExportKind { Named, Default, ExportEquals }

/** @internal */
export const enum ImportExport { Import, Export }

interface AmbientModuleDeclaration extends ts.ModuleDeclaration { body?: ts.ModuleBlock; }
type SourceFileLike = ts.SourceFile | AmbientModuleDeclaration;
// Identifier for the case of `const x = require("y")`.
type Importer = ts.AnyImportOrReExport | ts.ValidImportTypeNode | ts.Identifier;
type ImporterOrCallExpression = Importer | ts.CallExpression;

/** Returns import statements that directly reference the exporting module, and a list of files that may access the module through a namespace. */
function getImportersForExport(
    sourceFiles: readonly ts.SourceFile[],
    sourceFilesSet: ts.ReadonlySet<string>,
    allDirectImports: ts.ESMap<string, ImporterOrCallExpression[]>,
    { exportingModuleSymbol, exportKind }: ExportInfo,
    checker: ts.TypeChecker,
    cancellationToken: ts.CancellationToken | undefined,
): { directImports: Importer[], indirectUsers: readonly ts.SourceFile[] } {
    const markSeenDirectImport = ts.nodeSeenTracker<ImporterOrCallExpression>();
    const markSeenIndirectUser = ts.nodeSeenTracker<SourceFileLike>();
    const directImports: Importer[] = [];
    const isAvailableThroughGlobal = !!exportingModuleSymbol.globalExports;
    const indirectUserDeclarations: SourceFileLike[] | undefined = isAvailableThroughGlobal ? undefined : [];

    handleDirectImports(exportingModuleSymbol);

    return { directImports, indirectUsers: getIndirectUsers() };

    function getIndirectUsers(): readonly ts.SourceFile[] {
        if (isAvailableThroughGlobal) {
            // It has `export as namespace`, so anything could potentially use it.
            return sourceFiles;
        }

        // Module augmentations may use this module's exports without importing it.
        if (exportingModuleSymbol.declarations) {
            for (const decl of exportingModuleSymbol.declarations) {
                if (ts.isExternalModuleAugmentation(decl) && sourceFilesSet.has(decl.getSourceFile().fileName)) {
                    addIndirectUser(decl);
                }
            }
        }

        // This may return duplicates (if there are multiple module declarations in a single source file, all importing the same thing as a namespace), but `State.markSearchedSymbol` will handle that.
        return indirectUserDeclarations!.map<ts.SourceFile>(ts.getSourceFileOfNode);
    }

    function handleDirectImports(exportingModuleSymbol: ts.Symbol): void {
        const theseDirectImports = getDirectImports(exportingModuleSymbol);
        if (theseDirectImports) {
            for (const direct of theseDirectImports) {
                if (!markSeenDirectImport(direct)) {
                    continue;
                }

                if (cancellationToken) cancellationToken.throwIfCancellationRequested();

                switch (direct.kind) {
                    case ts.SyntaxKind.CallExpression:
                        if (ts.isImportCall(direct)) {
                            handleImportCall(direct);
                            break;
                        }
                        if (!isAvailableThroughGlobal) {
                            const parent = direct.parent;
                            if (exportKind === ExportKind.ExportEquals && parent.kind === ts.SyntaxKind.VariableDeclaration) {
                                const { name } = parent as ts.VariableDeclaration;
                                if (name.kind === ts.SyntaxKind.Identifier) {
                                    directImports.push(name);
                                    break;
                                }
                            }
                        }
                        break;

                    case ts.SyntaxKind.Identifier: // for 'const x = require("y");
                        break; // TODO: GH#23879

                    case ts.SyntaxKind.ImportEqualsDeclaration:
                        handleNamespaceImport(direct, direct.name, ts.hasSyntacticModifier(direct, ts.ModifierFlags.Export), /*alreadyAddedDirect*/ false);
                        break;

                    case ts.SyntaxKind.ImportDeclaration:
                        directImports.push(direct);
                        const namedBindings = direct.importClause && direct.importClause.namedBindings;
                        if (namedBindings && namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
                            handleNamespaceImport(direct, namedBindings.name, /*isReExport*/ false, /*alreadyAddedDirect*/ true);
                        }
                        else if (!isAvailableThroughGlobal && ts.isDefaultImport(direct)) {
                            addIndirectUser(getSourceFileLikeForImportDeclaration(direct)); // Add a check for indirect uses to handle synthetic default imports
                        }
                        break;

                    case ts.SyntaxKind.ExportDeclaration:
                        if (!direct.exportClause) {
                            // This is `export * from "foo"`, so imports of this module may import the export too.
                            handleDirectImports(getContainingModuleSymbol(direct, checker));
                        }
                        else if (direct.exportClause.kind === ts.SyntaxKind.NamespaceExport) {
                            // `export * as foo from "foo"` add to indirect uses
                            addIndirectUser(getSourceFileLikeForImportDeclaration(direct), /** addTransitiveDependencies */ true);
                        }
                        else {
                            // This is `export { foo } from "foo"` and creates an alias symbol, so recursive search will get handle re-exports.
                            directImports.push(direct);
                        }
                        break;

                    case ts.SyntaxKind.ImportType:
                        // Only check for typeof import('xyz')
                        if (!isAvailableThroughGlobal && direct.isTypeOf && !direct.qualifier && isExported(direct)) {
                            addIndirectUser(direct.getSourceFile(), /** addTransitiveDependencies */ true);
                        }
                        directImports.push(direct);
                        break;

                    default:
                        ts.Debug.failBadSyntaxKind(direct, "Unexpected import kind.");
                }
            }
        }
    }

    function handleImportCall(importCall: ts.ImportCall) {
        const top = ts.findAncestor(importCall, isAmbientModuleDeclaration) || importCall.getSourceFile();
        addIndirectUser(top, /** addTransitiveDependencies */ !!isExported(importCall, /** stopAtAmbientModule */ true));
    }

    function isExported(node: ts.Node, stopAtAmbientModule = false) {
        return ts.findAncestor(node, node => {
            if (stopAtAmbientModule && isAmbientModuleDeclaration(node)) return "quit";
            return ts.canHaveModifiers(node) && ts.some(node.modifiers, ts.isExportModifier);
        });
    }

    function handleNamespaceImport(importDeclaration: ts.ImportEqualsDeclaration | ts.ImportDeclaration, name: ts.Identifier, isReExport: boolean, alreadyAddedDirect: boolean): void {
        if (exportKind === ExportKind.ExportEquals) {
            // This is a direct import, not import-as-namespace.
            if (!alreadyAddedDirect) directImports.push(importDeclaration);
        }
        else if (!isAvailableThroughGlobal) {
            const sourceFileLike = getSourceFileLikeForImportDeclaration(importDeclaration);
            ts.Debug.assert(sourceFileLike.kind === ts.SyntaxKind.SourceFile || sourceFileLike.kind === ts.SyntaxKind.ModuleDeclaration);
            if (isReExport || findNamespaceReExports(sourceFileLike, name, checker)) {
                addIndirectUser(sourceFileLike, /** addTransitiveDependencies */ true);
            }
            else {
                addIndirectUser(sourceFileLike);
            }
        }
    }

    /** Adds a module and all of its transitive dependencies as possible indirect users. */
    function addIndirectUser(sourceFileLike: SourceFileLike, addTransitiveDependencies = false): void {
        ts.Debug.assert(!isAvailableThroughGlobal);
        const isNew = markSeenIndirectUser(sourceFileLike);
        if (!isNew) return;
        indirectUserDeclarations!.push(sourceFileLike); // TODO: GH#18217

        if (!addTransitiveDependencies) return;
        const moduleSymbol = checker.getMergedSymbol(sourceFileLike.symbol);
        if (!moduleSymbol) return;
        ts.Debug.assert(!!(moduleSymbol.flags & ts.SymbolFlags.Module));
        const directImports = getDirectImports(moduleSymbol);
        if (directImports) {
            for (const directImport of directImports) {
                if (!ts.isImportTypeNode(directImport)) {
                    addIndirectUser(getSourceFileLikeForImportDeclaration(directImport), /** addTransitiveDependencies */ true);
                }
            }
        }
    }

    function getDirectImports(moduleSymbol: ts.Symbol): ImporterOrCallExpression[] | undefined {
        return allDirectImports.get(ts.getSymbolId(moduleSymbol).toString());
    }
}

/**
 * Given the set of direct imports of a module, we need to find which ones import the particular exported symbol.
 * The returned `importSearches` will result in the entire source file being searched.
 * But re-exports will be placed in 'singleReferences' since they cannot be locally referenced.
 */
function getSearchesFromDirectImports(directImports: Importer[], exportSymbol: ts.Symbol, exportKind: ExportKind, checker: ts.TypeChecker, isForRename: boolean): Pick<ImportsResult, "importSearches" | "singleReferences"> {
    const importSearches: [ts.Identifier, ts.Symbol][] = [];
    const singleReferences: (ts.Identifier | ts.StringLiteral)[] = [];
    function addSearch(location: ts.Identifier, symbol: ts.Symbol): void {
        importSearches.push([location, symbol]);
    }

    if (directImports) {
        for (const decl of directImports) {
            handleImport(decl);
        }
    }

    return { importSearches, singleReferences };

    function handleImport(decl: Importer): void {
        if (decl.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            if (isExternalModuleImportEquals(decl)) {
                handleNamespaceImportLike(decl.name);
            }
            return;
        }

        if (decl.kind === ts.SyntaxKind.Identifier) {
            handleNamespaceImportLike(decl);
            return;
        }

        if (decl.kind === ts.SyntaxKind.ImportType) {
            if (decl.qualifier) {
                const firstIdentifier = ts.getFirstIdentifier(decl.qualifier);
                if (firstIdentifier.escapedText === ts.symbolName(exportSymbol)) {
                    singleReferences.push(firstIdentifier);
                }
            }
            else if (exportKind === ExportKind.ExportEquals) {
                singleReferences.push(decl.argument.literal);
            }
            return;
        }

        // Ignore if there's a grammar error
        if (decl.moduleSpecifier!.kind !== ts.SyntaxKind.StringLiteral) {
            return;
        }

        if (decl.kind === ts.SyntaxKind.ExportDeclaration) {
            if (decl.exportClause && ts.isNamedExports(decl.exportClause)) {
                searchForNamedImport(decl.exportClause);
            }
            return;
        }

        const { name, namedBindings } = decl.importClause || { name: undefined, namedBindings: undefined };

        if (namedBindings) {
            switch (namedBindings.kind) {
                case ts.SyntaxKind.NamespaceImport:
                    handleNamespaceImportLike(namedBindings.name);
                    break;
                case ts.SyntaxKind.NamedImports:
                    // 'default' might be accessed as a named import `{ default as foo }`.
                    if (exportKind === ExportKind.Named || exportKind === ExportKind.Default) {
                        searchForNamedImport(namedBindings);
                    }
                    break;
                default:
                    ts.Debug.assertNever(namedBindings);
            }
        }

        // `export =` might be imported by a default import if `--allowSyntheticDefaultImports` is on, so this handles both ExportKind.Default and ExportKind.ExportEquals.
        // If a default import has the same name as the default export, allow to rename it.
        // Given `import f` and `export default function f`, we will rename both, but for `import g` we will rename just that.
        if (name && (exportKind === ExportKind.Default || exportKind === ExportKind.ExportEquals) && (!isForRename || name.escapedText === ts.symbolEscapedNameNoDefault(exportSymbol))) {
            const defaultImportAlias = checker.getSymbolAtLocation(name)!;
            addSearch(name, defaultImportAlias);
        }
    }

    /**
     * `import x = require("./x")` or `import * as x from "./x"`.
     * An `export =` may be imported by this syntax, so it may be a direct import.
     * If it's not a direct import, it will be in `indirectUsers`, so we don't have to do anything here.
     */
    function handleNamespaceImportLike(importName: ts.Identifier): void {
        // Don't rename an import that already has a different name than the export.
        if (exportKind === ExportKind.ExportEquals && (!isForRename || isNameMatch(importName.escapedText))) {
            addSearch(importName, checker.getSymbolAtLocation(importName)!);
        }
    }

    function searchForNamedImport(namedBindings: ts.NamedImportsOrExports | undefined): void {
        if (!namedBindings) {
            return;
        }

        for (const element of namedBindings.elements) {
            const { name, propertyName } = element;
            if (!isNameMatch((propertyName || name).escapedText)) {
                continue;
            }

            if (propertyName) {
                // This is `import { foo as bar } from "./a"` or `export { foo as bar } from "./a"`. `foo` isn't a local in the file, so just add it as a single reference.
                singleReferences.push(propertyName);
                // If renaming `{ foo as bar }`, don't touch `bar`, just `foo`.
                // But do rename `foo` in ` { default as foo }` if that's the original export name.
                if (!isForRename || name.escapedText === exportSymbol.escapedName) {
                    // Search locally for `bar`.
                    addSearch(name, checker.getSymbolAtLocation(name)!);
                }
            }
            else {
                const localSymbol = element.kind === ts.SyntaxKind.ExportSpecifier && element.propertyName
                    ? checker.getExportSpecifierLocalTargetSymbol(element)! // For re-exporting under a different name, we want to get the re-exported symbol.
                    : checker.getSymbolAtLocation(name)!;
                addSearch(name, localSymbol);
            }
        }
    }

    function isNameMatch(name: ts.__String): boolean {
        // Use name of "default" even in `export =` case because we may have allowSyntheticDefaultImports
        return name === exportSymbol.escapedName || exportKind !== ExportKind.Named && name === ts.InternalSymbolName.Default;
    }
}

/** Returns 'true' is the namespace 'name' is re-exported from this module, and 'false' if it is only used locally. */
function findNamespaceReExports(sourceFileLike: SourceFileLike, name: ts.Identifier, checker: ts.TypeChecker): boolean {
    const namespaceImportSymbol = checker.getSymbolAtLocation(name);

    return !!forEachPossibleImportOrExportStatement(sourceFileLike, statement => {
        if (!ts.isExportDeclaration(statement)) return;
        const { exportClause, moduleSpecifier } = statement;
        return !moduleSpecifier && exportClause && ts.isNamedExports(exportClause) &&
            exportClause.elements.some(element => checker.getExportSpecifierLocalTargetSymbol(element) === namespaceImportSymbol);
    });
}

/** @internal */
export type ModuleReference =
    /** "import" also includes require() calls. */
    | { kind: "import", literal: ts.StringLiteralLike }
    /** <reference path> or <reference types> */
    | { kind: "reference", referencingFile: ts.SourceFile, ref: ts.FileReference };
/** @internal */
export function findModuleReferences(program: ts.Program, sourceFiles: readonly ts.SourceFile[], searchModuleSymbol: ts.Symbol): ModuleReference[] {
    const refs: ModuleReference[] = [];
    const checker = program.getTypeChecker();
    for (const referencingFile of sourceFiles) {
        const searchSourceFile = searchModuleSymbol.valueDeclaration;
        if (searchSourceFile?.kind === ts.SyntaxKind.SourceFile) {
            for (const ref of referencingFile.referencedFiles) {
                if (program.getSourceFileFromReference(referencingFile, ref) === searchSourceFile) {
                    refs.push({ kind: "reference", referencingFile, ref });
                }
            }
            for (const ref of referencingFile.typeReferenceDirectives) {
                const referenced = program.getResolvedTypeReferenceDirectives().get(ref.fileName, ref.resolutionMode || referencingFile.impliedNodeFormat);
                if (referenced !== undefined && referenced.resolvedFileName === (searchSourceFile as ts.SourceFile).fileName) {
                    refs.push({ kind: "reference", referencingFile, ref });
                }
            }
        }

        forEachImport(referencingFile, (_importDecl, moduleSpecifier) => {
            const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
            if (moduleSymbol === searchModuleSymbol) {
                refs.push({ kind: "import", literal: moduleSpecifier });
            }
        });
    }
    return refs;
}

/** Returns a map from a module symbol Id to all import statements that directly reference the module. */
function getDirectImportsMap(sourceFiles: readonly ts.SourceFile[], checker: ts.TypeChecker, cancellationToken: ts.CancellationToken | undefined): ts.ESMap<string, ImporterOrCallExpression[]> {
    const map = new ts.Map<string, ImporterOrCallExpression[]>();

    for (const sourceFile of sourceFiles) {
        if (cancellationToken) cancellationToken.throwIfCancellationRequested();
        forEachImport(sourceFile, (importDecl, moduleSpecifier) => {
            const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
            if (moduleSymbol) {
                const id = ts.getSymbolId(moduleSymbol).toString();
                let imports = map.get(id);
                if (!imports) {
                    map.set(id, imports = []);
                }
                imports.push(importDecl);
            }
        });
    }

    return map;
}

/** Iterates over all statements at the top level or in module declarations. Returns the first truthy result. */
function forEachPossibleImportOrExportStatement<T>(sourceFileLike: SourceFileLike, action: (statement: ts.Statement) => T) {
    return ts.forEach(sourceFileLike.kind === ts.SyntaxKind.SourceFile ? sourceFileLike.statements : sourceFileLike.body!.statements, statement => // TODO: GH#18217
        action(statement) || (isAmbientModuleDeclaration(statement) && ts.forEach(statement.body && statement.body.statements, action)));
}

/** Calls `action` for each import, re-export, or require() in a file. */
function forEachImport(sourceFile: ts.SourceFile, action: (importStatement: ImporterOrCallExpression, imported: ts.StringLiteralLike) => void): void {
    if (sourceFile.externalModuleIndicator || sourceFile.imports !== undefined) {
        for (const i of sourceFile.imports) {
            action(ts.importFromModuleSpecifier(i), i);
        }
    }
    else {
        forEachPossibleImportOrExportStatement(sourceFile, statement => {
            switch (statement.kind) {
                case ts.SyntaxKind.ExportDeclaration:
                case ts.SyntaxKind.ImportDeclaration: {
                    const decl = statement as ts.ImportDeclaration | ts.ExportDeclaration;
                    if (decl.moduleSpecifier && ts.isStringLiteral(decl.moduleSpecifier)) {
                        action(decl, decl.moduleSpecifier);
                    }
                    break;
                }

                case ts.SyntaxKind.ImportEqualsDeclaration: {
                    const decl = statement as ts.ImportEqualsDeclaration;
                    if (isExternalModuleImportEquals(decl)) {
                        action(decl, decl.moduleReference.expression);
                    }
                    break;
                }
            }
        });
    }
}

/** @internal */
export interface ImportedSymbol {
    kind: ImportExport.Import;
    symbol: ts.Symbol;
}
/** @internal */
export interface ExportedSymbol {
    kind: ImportExport.Export;
    symbol: ts.Symbol;
    exportInfo: ExportInfo;
}

/** @internal */
/**
 * Given a local reference, we might notice that it's an import/export and recursively search for references of that.
 * If at an import, look locally for the symbol it imports.
 * If at an export, look for all imports of it.
 * This doesn't handle export specifiers; that is done in `getReferencesAtExportSpecifier`.
 * @param comingFromExport If we are doing a search for all exports, don't bother looking backwards for the imported symbol, since that's the reason we're here.
 */
export function getImportOrExportSymbol(node: ts.Node, symbol: ts.Symbol, checker: ts.TypeChecker, comingFromExport: boolean): ImportedSymbol | ExportedSymbol | undefined {
    return comingFromExport ? getExport() : getExport() || getImport();

    function getExport(): ExportedSymbol | ImportedSymbol | undefined {
        const { parent } = node;
        const grandparent = parent.parent;
        if (symbol.exportSymbol) {
            if (parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
                // When accessing an export of a JS module, there's no alias. The symbol will still be flagged as an export even though we're at the use.
                // So check that we are at the declaration.
                return symbol.declarations?.some(d => d === parent) && ts.isBinaryExpression(grandparent)
                    ? getSpecialPropertyExport(grandparent, /*useLhsSymbol*/ false)
                    : undefined;
            }
            else {
                return exportInfo(symbol.exportSymbol, getExportKindForDeclaration(parent));
            }
        }
        else {
            const exportNode = getExportNode(parent, node);
            if (exportNode && ts.hasSyntacticModifier(exportNode, ts.ModifierFlags.Export)) {
                if (ts.isImportEqualsDeclaration(exportNode) && exportNode.moduleReference === node) {
                    // We're at `Y` in `export import X = Y`. This is not the exported symbol, the left-hand-side is. So treat this as an import statement.
                    if (comingFromExport) {
                        return undefined;
                    }

                    const lhsSymbol = checker.getSymbolAtLocation(exportNode.name)!;
                    return { kind: ImportExport.Import, symbol: lhsSymbol };
                }
                else {
                    return exportInfo(symbol, getExportKindForDeclaration(exportNode));
                }
            }
            else if (ts.isNamespaceExport(parent)) {
                return exportInfo(symbol, ExportKind.Named);
            }
            // If we are in `export = a;` or `export default a;`, `parent` is the export assignment.
            else if (ts.isExportAssignment(parent)) {
                return getExportAssignmentExport(parent);
            }
            // If we are in `export = class A {};` (or `export = class A {};`) at `A`, `parent.parent` is the export assignment.
            else if (ts.isExportAssignment(grandparent)) {
                return getExportAssignmentExport(grandparent);
            }
            // Similar for `module.exports =` and `exports.A =`.
            else if (ts.isBinaryExpression(parent)) {
                return getSpecialPropertyExport(parent, /*useLhsSymbol*/ true);
            }
            else if (ts.isBinaryExpression(grandparent)) {
                return getSpecialPropertyExport(grandparent, /*useLhsSymbol*/ true);
            }
            else if (ts.isJSDocTypedefTag(parent)) {
                return exportInfo(symbol, ExportKind.Named);
            }
        }

        function getExportAssignmentExport(ex: ts.ExportAssignment): ExportedSymbol | undefined {
            // Get the symbol for the `export =` node; its parent is the module it's the export of.
            if (!ex.symbol.parent) return undefined;
            const exportKind = ex.isExportEquals ? ExportKind.ExportEquals : ExportKind.Default;
            return { kind: ImportExport.Export, symbol, exportInfo: { exportingModuleSymbol: ex.symbol.parent, exportKind } };
        }

        function getSpecialPropertyExport(node: ts.BinaryExpression, useLhsSymbol: boolean): ExportedSymbol | undefined {
            let kind: ExportKind;
            switch (ts.getAssignmentDeclarationKind(node)) {
                case ts.AssignmentDeclarationKind.ExportsProperty:
                    kind = ExportKind.Named;
                    break;
                case ts.AssignmentDeclarationKind.ModuleExports:
                    kind = ExportKind.ExportEquals;
                    break;
                default:
                    return undefined;
            }

            const sym = useLhsSymbol ? checker.getSymbolAtLocation(ts.getNameOfAccessExpression(ts.cast(node.left, ts.isAccessExpression))) : symbol;
            return sym && exportInfo(sym, kind);
        }
    }

    function getImport(): ImportedSymbol | undefined {
        const isImport = isNodeImport(node);
        if (!isImport) return undefined;

        // A symbol being imported is always an alias. So get what that aliases to find the local symbol.
        let importedSymbol = checker.getImmediateAliasedSymbol(symbol);
        if (!importedSymbol) return undefined;

        // Search on the local symbol in the exporting module, not the exported symbol.
        importedSymbol = skipExportSpecifierSymbol(importedSymbol, checker);
        // Similarly, skip past the symbol for 'export ='
        if (importedSymbol.escapedName === "export=") {
            importedSymbol = getExportEqualsLocalSymbol(importedSymbol, checker);
            if (importedSymbol === undefined) return undefined;
        }

        // If the import has a different name than the export, do not continue searching.
        // If `importedName` is undefined, do continue searching as the export is anonymous.
        // (All imports returned from this function will be ignored anyway if we are in rename and this is a not a named export.)
        const importedName = ts.symbolEscapedNameNoDefault(importedSymbol);
        if (importedName === undefined || importedName === ts.InternalSymbolName.Default || importedName === symbol.escapedName) {
            return { kind: ImportExport.Import, symbol: importedSymbol };
        }
    }

    function exportInfo(symbol: ts.Symbol, kind: ExportKind): ExportedSymbol | undefined {
        const exportInfo = getExportInfo(symbol, kind, checker);
        return exportInfo && { kind: ImportExport.Export, symbol, exportInfo };
    }

    // Not meant for use with export specifiers or export assignment.
    function getExportKindForDeclaration(node: ts.Node): ExportKind {
        return ts.hasSyntacticModifier(node, ts.ModifierFlags.Default) ? ExportKind.Default : ExportKind.Named;
    }
}

function getExportEqualsLocalSymbol(importedSymbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol | undefined {
    if (importedSymbol.flags & ts.SymbolFlags.Alias) {
        return checker.getImmediateAliasedSymbol(importedSymbol);
    }

    const decl = ts.Debug.checkDefined(importedSymbol.valueDeclaration);
    if (ts.isExportAssignment(decl)) { // `export = class {}`
        return decl.expression.symbol;
    }
    else if (ts.isBinaryExpression(decl)) { // `module.exports = class {}`
        return decl.right.symbol;
    }
    else if (ts.isSourceFile(decl)) { // json module
        return decl.symbol;
    }
    return undefined;
}

// If a reference is a class expression, the exported node would be its parent.
// If a reference is a variable declaration, the exported node would be the variable statement.
function getExportNode(parent: ts.Node, node: ts.Node): ts.Node | undefined {
    const declaration = ts.isVariableDeclaration(parent) ? parent : ts.isBindingElement(parent) ? ts.walkUpBindingElementsAndPatterns(parent) : undefined;
    if (declaration) {
        return (parent as ts.VariableDeclaration | ts.BindingElement).name !== node ? undefined :
            ts.isCatchClause(declaration.parent) ? undefined : ts.isVariableStatement(declaration.parent.parent) ? declaration.parent.parent : undefined;
    }
    else {
        return parent;
    }
}

function isNodeImport(node: ts.Node): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return (parent as ts.ImportEqualsDeclaration).name === node && isExternalModuleImportEquals(parent as ts.ImportEqualsDeclaration);
        case ts.SyntaxKind.ImportSpecifier:
            // For a rename import `{ foo as bar }`, don't search for the imported symbol. Just find local uses of `bar`.
            return !(parent as ts.ImportSpecifier).propertyName;
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.NamespaceImport:
            ts.Debug.assert((parent as ts.ImportClause | ts.NamespaceImport).name === node);
            return true;
        case ts.SyntaxKind.BindingElement:
            return ts.isInJSFile(node) && ts.isVariableDeclarationInitializedToBareOrAccessedRequire(parent.parent.parent);
        default:
            return false;
    }
}

/** @internal */
export function getExportInfo(exportSymbol: ts.Symbol, exportKind: ExportKind, checker: ts.TypeChecker): ExportInfo | undefined {
    const moduleSymbol = exportSymbol.parent;
    if (!moduleSymbol) return undefined; // This can happen if an `export` is not at the top-level (which is a compile error).
    const exportingModuleSymbol = checker.getMergedSymbol(moduleSymbol); // Need to get merged symbol in case there's an augmentation.
    // `export` may appear in a namespace. In that case, just rely on global search.
    return ts.isExternalModuleSymbol(exportingModuleSymbol) ? { exportingModuleSymbol, exportKind } : undefined;
}

/** If at an export specifier, go to the symbol it refers to. */
function skipExportSpecifierSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
    // For `export { foo } from './bar", there's nothing to skip, because it does not create a new alias. But `export { foo } does.
    if (symbol.declarations) {
        for (const declaration of symbol.declarations) {
            if (ts.isExportSpecifier(declaration) && !declaration.propertyName && !declaration.parent.parent.moduleSpecifier) {
                return checker.getExportSpecifierLocalTargetSymbol(declaration)!;
            }
            else if (ts.isPropertyAccessExpression(declaration) && ts.isModuleExportsAccessExpression(declaration.expression) && !ts.isPrivateIdentifier(declaration.name)) {
                // Export of form 'module.exports.propName = expr';
                return checker.getSymbolAtLocation(declaration)!;
            }
            else if (ts.isShorthandPropertyAssignment(declaration)
                && ts.isBinaryExpression(declaration.parent.parent)
                && ts.getAssignmentDeclarationKind(declaration.parent.parent) === ts.AssignmentDeclarationKind.ModuleExports) {
                return checker.getExportSpecifierLocalTargetSymbol(declaration.name)!;
            }
        }
    }
    return symbol;
}

function getContainingModuleSymbol(importer: Importer, checker: ts.TypeChecker): ts.Symbol {
    return checker.getMergedSymbol(getSourceFileLikeForImportDeclaration(importer).symbol);
}

function getSourceFileLikeForImportDeclaration(node: ImporterOrCallExpression): SourceFileLike {
    if (node.kind === ts.SyntaxKind.CallExpression) {
        return node.getSourceFile();
    }

    const { parent } = node;
    if (parent.kind === ts.SyntaxKind.SourceFile) {
        return parent as ts.SourceFile;
    }
    ts.Debug.assert(parent.kind === ts.SyntaxKind.ModuleBlock);
    return ts.cast(parent.parent, isAmbientModuleDeclaration);
}

function isAmbientModuleDeclaration(node: ts.Node): node is AmbientModuleDeclaration {
    return node.kind === ts.SyntaxKind.ModuleDeclaration && (node as ts.ModuleDeclaration).name.kind === ts.SyntaxKind.StringLiteral;
}

function isExternalModuleImportEquals(eq: ts.ImportEqualsDeclaration): eq is ts.ImportEqualsDeclaration & { moduleReference: { expression: ts.StringLiteral } } {
    return eq.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference && eq.moduleReference.expression.kind === ts.SyntaxKind.StringLiteral;
}

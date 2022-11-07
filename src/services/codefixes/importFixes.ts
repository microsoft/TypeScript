/* @internal */
namespace ts.codefix {
export const importFixName = "import";
const importFixId = "fixMissingImport";
const errorCodes: readonly number[] = [
    ts.Diagnostics.Cannot_find_name_0.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
    ts.Diagnostics.Cannot_find_namespace_0.code,
    ts.Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code,
    ts.Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here.code,
    ts.Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.code,
    ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { errorCode, preferences, sourceFile, span, program } = context;
        const info = getFixInfos(context, errorCode, span.start, /*useAutoImportProvider*/ true);
        if (!info) return undefined;
        const quotePreference = ts.getQuotePreference(sourceFile, preferences);
        return info.map(({ fix, symbolName, errorIdentifierText }) => codeActionForFix(
            context,
            sourceFile,
            symbolName,
            fix,
            /*includeSymbolNameInDescription*/ symbolName !== errorIdentifierText,
            quotePreference,
            program.getCompilerOptions()));
    },
    fixIds: [importFixId],
    getAllCodeActions: context => {
        const { sourceFile, program, preferences, host, cancellationToken } = context;
        const importAdder = createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ true, preferences, host, cancellationToken);
        ts.codefix.eachDiagnostic(context, errorCodes, diag => importAdder.addImportFromDiagnostic(diag, context));
        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, importAdder.writeFixes));
    },
});

/**
 * Computes multiple import additions to a file and writes them to a ChangeTracker.
 */
export interface ImportAdder {
    hasFixes(): boolean;
    addImportFromDiagnostic: (diagnostic: ts.DiagnosticWithLocation, context: ts.CodeFixContextBase) => void;
    addImportFromExportedSymbol: (exportedSymbol: ts.Symbol, isValidTypeOnlyUseSite?: boolean) => void;
    writeFixes: (changeTracker: ts.textChanges.ChangeTracker) => void;
}

export function createImportAdder(sourceFile: ts.SourceFile, program: ts.Program, preferences: ts.UserPreferences, host: ts.LanguageServiceHost, cancellationToken?: ts.CancellationToken): ImportAdder {
    return createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ false, preferences, host, cancellationToken);
}

interface AddToExistingState {
    readonly importClauseOrBindingPattern: ts.ImportClause | ts.ObjectBindingPattern;
    defaultImport: Import | undefined;
    readonly namedImports: ts.ESMap<string, AddAsTypeOnly>;
}

function createImportAdderWorker(sourceFile: ts.SourceFile, program: ts.Program, useAutoImportProvider: boolean, preferences: ts.UserPreferences, host: ts.LanguageServiceHost, cancellationToken: ts.CancellationToken | undefined): ImportAdder {
    const compilerOptions = program.getCompilerOptions();
    // Namespace fixes don't conflict, so just build a list.
    const addToNamespace: FixUseNamespaceImport[] = [];
    const importType: FixAddJsdocTypeImport[] = [];
    /** Keys are import clause node IDs. */
    const addToExisting = new ts.Map<string, AddToExistingState>();

    type NewImportsKey = `${0 | 1}|${string}`;
    /** Use `getNewImportEntry` for access */
    const newImports = new ts.Map<NewImportsKey, ts.Mutable<ImportsCollection & { useRequire: boolean }>>();
    return { addImportFromDiagnostic, addImportFromExportedSymbol, writeFixes, hasFixes };

    function addImportFromDiagnostic(diagnostic: ts.DiagnosticWithLocation, context: ts.CodeFixContextBase) {
        const info = getFixInfos(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
        if (!info || !info.length) return;
        addImport(ts.first(info));
    }

    function addImportFromExportedSymbol(exportedSymbol: ts.Symbol, isValidTypeOnlyUseSite?: boolean) {
        const moduleSymbol = ts.Debug.checkDefined(exportedSymbol.parent);
        const symbolName = ts.getNameForExportedSymbol(exportedSymbol, ts.getEmitScriptTarget(compilerOptions));
        const checker = program.getTypeChecker();
        const symbol = checker.getMergedSymbol(ts.skipAlias(exportedSymbol, checker));
        const exportInfo = getAllExportInfoForSymbol(sourceFile, symbol, symbolName, /*isJsxTagName*/ false, program, host, preferences, cancellationToken);
        const useRequire = shouldUseRequire(sourceFile, program);
        const fix = getImportFixForSymbol(sourceFile, ts.Debug.checkDefined(exportInfo), moduleSymbol, program, /*useNamespaceInfo*/ undefined, !!isValidTypeOnlyUseSite, useRequire, host, preferences);
        if (fix) {
            addImport({ fix, symbolName, errorIdentifierText: undefined });
        }
    }

    function addImport(info: FixInfo) {
        const { fix, symbolName } = info;
        switch (fix.kind) {
            case ImportFixKind.UseNamespace:
                addToNamespace.push(fix);
                break;
            case ImportFixKind.JsdocTypeImport:
                importType.push(fix);
                break;
            case ImportFixKind.AddToExisting: {
                const { importClauseOrBindingPattern, importKind, addAsTypeOnly } = fix;
                const key = String(ts.getNodeId(importClauseOrBindingPattern));
                let entry = addToExisting.get(key);
                if (!entry) {
                    addToExisting.set(key, entry = { importClauseOrBindingPattern, defaultImport: undefined, namedImports: new ts.Map() });
                }
                if (importKind === ts.ImportKind.Named) {
                    const prevValue = entry?.namedImports.get(symbolName);
                    entry.namedImports.set(symbolName, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                }
                else {
                    ts.Debug.assert(entry.defaultImport === undefined || entry.defaultImport.name === symbolName, "(Add to Existing) Default import should be missing or match symbolName");
                    entry.defaultImport = {
                        name: symbolName,
                        addAsTypeOnly: reduceAddAsTypeOnlyValues(entry.defaultImport?.addAsTypeOnly, addAsTypeOnly),
                    };
                }
                break;
            }
            case ImportFixKind.AddNew: {
                const { moduleSpecifier, importKind, useRequire, addAsTypeOnly } = fix;
                const entry = getNewImportEntry(moduleSpecifier, importKind, useRequire, addAsTypeOnly);
                ts.Debug.assert(entry.useRequire === useRequire, "(Add new) Tried to add an `import` and a `require` for the same module");

                switch (importKind) {
                    case ts.ImportKind.Default:
                        ts.Debug.assert(entry.defaultImport === undefined || entry.defaultImport.name === symbolName, "(Add new) Default import should be missing or match symbolName");
                        entry.defaultImport = { name: symbolName, addAsTypeOnly: reduceAddAsTypeOnlyValues(entry.defaultImport?.addAsTypeOnly, addAsTypeOnly) };
                        break;
                    case ts.ImportKind.Named:
                        const prevValue = (entry.namedImports ||= new ts.Map()).get(symbolName);
                        entry.namedImports.set(symbolName, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                        break;
                    case ts.ImportKind.CommonJS:
                    case ts.ImportKind.Namespace:
                        ts.Debug.assert(entry.namespaceLikeImport === undefined || entry.namespaceLikeImport.name === symbolName, "Namespacelike import shoudl be missing or match symbolName");
                        entry.namespaceLikeImport = { importKind, name: symbolName, addAsTypeOnly };
                        break;
                }
                break;
            }
            case ImportFixKind.PromoteTypeOnly:
                // Excluding from fix-all
                break;
            default:
                ts.Debug.assertNever(fix, `fix wasn't never - got kind ${(fix as ImportFix).kind}`);
        }

        function reduceAddAsTypeOnlyValues(prevValue: AddAsTypeOnly | undefined, newValue: AddAsTypeOnly): AddAsTypeOnly {
            // `NotAllowed` overrides `Required` because one addition of a new import might be required to be type-only
            // because of `--importsNotUsedAsValues=error`, but if a second addition of the same import is `NotAllowed`
            // to be type-only, the reason the first one was `Required` - the unused runtime dependency - is now moot.
            // Alternatively, if one addition is `Required` because it has no value meaning under `--preserveValueImports`
            // and `--isolatedModules`, it should be impossible for another addition to be `NotAllowed` since that would
            // mean a type is being referenced in a value location.
            return Math.max(prevValue ?? 0, newValue);
        }

        function getNewImportEntry(moduleSpecifier: string, importKind: ts.ImportKind, useRequire: boolean, addAsTypeOnly: AddAsTypeOnly): ts.Mutable<ImportsCollection & { useRequire: boolean }> {
            // A default import that requires type-only makes the whole import type-only.
            // (We could add `default` as a named import, but that style seems undesirable.)
            // Under `--preserveValueImports` and `--importsNotUsedAsValues=error`, if a
            // module default-exports a type but named-exports some values (weird), you would
            // have to use a type-only default import and non-type-only named imports. These
            // require two separate import declarations, so we build this into the map key.
            const typeOnlyKey = newImportsKey(moduleSpecifier, /*topLevelTypeOnly*/ true);
            const nonTypeOnlyKey = newImportsKey(moduleSpecifier, /*topLevelTypeOnly*/ false);
            const typeOnlyEntry = newImports.get(typeOnlyKey);
            const nonTypeOnlyEntry = newImports.get(nonTypeOnlyKey);
            const newEntry: ImportsCollection & { useRequire: boolean } = {
                defaultImport: undefined,
                namedImports: undefined,
                namespaceLikeImport: undefined,
                useRequire
            };
            if (importKind === ts.ImportKind.Default && addAsTypeOnly === AddAsTypeOnly.Required) {
                if (typeOnlyEntry) return typeOnlyEntry;
                newImports.set(typeOnlyKey, newEntry);
                return newEntry;
            }
            if (addAsTypeOnly === AddAsTypeOnly.Allowed && (typeOnlyEntry || nonTypeOnlyEntry)) {
                return (typeOnlyEntry || nonTypeOnlyEntry)!;
            }
            if (nonTypeOnlyEntry) {
                return nonTypeOnlyEntry;
            }
            newImports.set(nonTypeOnlyKey, newEntry);
            return newEntry;
        }

        function newImportsKey(moduleSpecifier: string, topLevelTypeOnly: boolean): NewImportsKey {
            return `${topLevelTypeOnly ? 1 : 0}|${moduleSpecifier}`;
        }
    }

    function writeFixes(changeTracker: ts.textChanges.ChangeTracker) {
        const quotePreference = ts.getQuotePreference(sourceFile, preferences);
        for (const fix of addToNamespace) {
            addNamespaceQualifier(changeTracker, sourceFile, fix);
        }
        for (const fix of importType) {
            addImportType(changeTracker, sourceFile, fix, quotePreference);
        }
        addToExisting.forEach(({ importClauseOrBindingPattern, defaultImport, namedImports }) => {
            doAddExistingFix(
                changeTracker,
                sourceFile,
                importClauseOrBindingPattern,
                defaultImport,
                ts.arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })),
                compilerOptions);
        });

        let newDeclarations: ts.AnyImportOrRequireStatement | readonly ts.AnyImportOrRequireStatement[] | undefined;
        newImports.forEach(({ useRequire, defaultImport, namedImports, namespaceLikeImport }, key) => {
            const moduleSpecifier = key.slice(2); // From `${0 | 1}|${moduleSpecifier}` format
            const getDeclarations = useRequire ? getNewRequires : getNewImports;
            const declarations = getDeclarations(
                moduleSpecifier,
                quotePreference,
                defaultImport,
                namedImports && ts.arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })),
                namespaceLikeImport);
            newDeclarations = ts.combine(newDeclarations, declarations);
        });
        if (newDeclarations) {
            ts.insertImports(changeTracker, sourceFile, newDeclarations, /*blankLineBetween*/ true);
        }
    }

    function hasFixes() {
        return addToNamespace.length > 0 || importType.length > 0 || addToExisting.size > 0 || newImports.size > 0;
    }
}

/**
 * Computes module specifiers for multiple import additions to a file.
 */
 export interface ImportSpecifierResolver {
    getModuleSpecifierForBestExportInfo(
        exportInfo: readonly ts.SymbolExportInfo[],
        symbolName: string,
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean
    ): { exportInfo?: ts.SymbolExportInfo, moduleSpecifier: string, computedWithoutCacheCount: number } | undefined;
}

export function createImportSpecifierResolver(importingFile: ts.SourceFile, program: ts.Program, host: ts.LanguageServiceHost, preferences: ts.UserPreferences): ImportSpecifierResolver {
    const packageJsonImportFilter = ts.createPackageJsonImportFilter(importingFile, preferences, host);
    const importMap = createExistingImportMap(program.getTypeChecker(), importingFile, program.getCompilerOptions());
    return { getModuleSpecifierForBestExportInfo };

    function getModuleSpecifierForBestExportInfo(
        exportInfo: readonly ts.SymbolExportInfo[],
        symbolName: string,
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: ts.SymbolExportInfo, moduleSpecifier: string, computedWithoutCacheCount: number } | undefined {
        const { fixes, computedWithoutCacheCount } = getImportFixes(
            exportInfo,
            { symbolName, position },
            isValidTypeOnlyUseSite,
            /*useRequire*/ false,
            program,
            importingFile,
            host,
            preferences,
            importMap,
            fromCacheOnly);
        const result = getBestFix(fixes, importingFile, program, packageJsonImportFilter, host);
        return result && { ...result, computedWithoutCacheCount };
    }
}

// Sorted with the preferred fix coming first.
const enum ImportFixKind { UseNamespace, JsdocTypeImport, AddToExisting, AddNew, PromoteTypeOnly }
// These should not be combined as bitflags, but are given powers of 2 values to
// easily detect conflicts between `NotAllowed` and `Required` by giving them a unique sum.
// They're also ordered in terms of increasing priority for a fix-all scenario (see
// `reduceAddAsTypeOnlyValues`).
const enum AddAsTypeOnly {
    Allowed    = 1 << 0,
    Required   = 1 << 1,
    NotAllowed = 1 << 2,
}
type ImportFix = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport | FixPromoteTypeOnlyImport;
type ImportFixWithModuleSpecifier = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport;

// Properties are be undefined if fix is derived from an existing import
interface ImportFixBase {
    readonly isReExport?: boolean;
    readonly exportInfo?: ts.SymbolExportInfo;
    readonly moduleSpecifier: string;
}
interface FixUseNamespaceImport extends ImportFixBase {
    readonly kind: ImportFixKind.UseNamespace;
    readonly namespacePrefix: string;
    readonly position: number;
}
interface FixAddJsdocTypeImport extends ImportFixBase {
    readonly kind: ImportFixKind.JsdocTypeImport;
    readonly position: number;
    readonly isReExport: boolean;
    readonly exportInfo: ts.SymbolExportInfo;
}
interface FixAddToExistingImport extends ImportFixBase {
    readonly kind: ImportFixKind.AddToExisting;
    readonly importClauseOrBindingPattern: ts.ImportClause | ts.ObjectBindingPattern;
    readonly importKind: ts.ImportKind.Default | ts.ImportKind.Named;
    readonly addAsTypeOnly: AddAsTypeOnly;
}
interface FixAddNewImport extends ImportFixBase {
    readonly kind: ImportFixKind.AddNew;
    readonly importKind: ts.ImportKind;
    readonly addAsTypeOnly: AddAsTypeOnly;
    readonly useRequire: boolean;
}
interface FixPromoteTypeOnlyImport {
    readonly kind: ImportFixKind.PromoteTypeOnly;
    readonly typeOnlyAliasDeclaration: ts.TypeOnlyAliasDeclaration;
}


/** Information needed to augment an existing import declaration. */
interface FixAddToExistingImportInfo {
    readonly declaration: ts.AnyImportOrRequire;
    readonly importKind: ts.ImportKind;
    readonly targetFlags: ts.SymbolFlags;
    readonly symbol: ts.Symbol;
}

export function getImportCompletionAction(
    targetSymbol: ts.Symbol,
    moduleSymbol: ts.Symbol,
    sourceFile: ts.SourceFile,
    symbolName: string,
    isJsxTagName: boolean,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    formatContext: ts.formatting.FormatContext,
    position: number,
    preferences: ts.UserPreferences,
    cancellationToken: ts.CancellationToken,
): { readonly moduleSpecifier: string, readonly codeAction: ts.CodeAction } {
    const compilerOptions = program.getCompilerOptions();

    const exportInfos = ts.pathIsBareSpecifier(ts.stripQuotes(moduleSymbol.name))
        ? [getSingleExportInfoForSymbol(targetSymbol, moduleSymbol, program, host)]
        : getAllExportInfoForSymbol(sourceFile, targetSymbol, symbolName, isJsxTagName, program, host, preferences, cancellationToken);

    ts.Debug.assertIsDefined(exportInfos);
    const useRequire = shouldUseRequire(sourceFile, program);
    const isValidTypeOnlyUseSite = ts.isValidTypeOnlyAliasUseSite(ts.getTokenAtPosition(sourceFile, position));
    const fix = ts.Debug.checkDefined(getImportFixForSymbol(sourceFile, exportInfos, moduleSymbol, program, { symbolName, position }, isValidTypeOnlyUseSite, useRequire, host, preferences));
    return {
        moduleSpecifier: fix.moduleSpecifier,
        codeAction: codeFixActionToCodeAction(codeActionForFix(
            { host, formatContext, preferences },
            sourceFile,
            symbolName,
            fix,
            /*includeSymbolNameInDescription*/ false,
            ts.getQuotePreference(sourceFile, preferences), compilerOptions))
    };
}

export function getPromoteTypeOnlyCompletionAction(sourceFile: ts.SourceFile, symbolToken: ts.Identifier, program: ts.Program, host: ts.LanguageServiceHost, formatContext: ts.formatting.FormatContext, preferences: ts.UserPreferences) {
    const compilerOptions = program.getCompilerOptions();
    const symbolName = ts.single(getSymbolNamesToImport(sourceFile, program.getTypeChecker(), symbolToken, compilerOptions));
    const fix = getTypeOnlyPromotionFix(sourceFile, symbolToken, symbolName, program);
    const includeSymbolNameInDescription = symbolName !== symbolToken.text;
    return fix && codeFixActionToCodeAction(codeActionForFix({ host, formatContext, preferences }, sourceFile, symbolName, fix, includeSymbolNameInDescription, ts.QuotePreference.Double, compilerOptions));
}

function getImportFixForSymbol(sourceFile: ts.SourceFile, exportInfos: readonly ts.SymbolExportInfo[], moduleSymbol: ts.Symbol, program: ts.Program, useNamespaceInfo: { position: number, symbolName: string } | undefined, isValidTypeOnlyUseSite: boolean, useRequire: boolean, host: ts.LanguageServiceHost, preferences: ts.UserPreferences) {
    ts.Debug.assert(exportInfos.some(info => info.moduleSymbol === moduleSymbol || info.symbol.parent === moduleSymbol), "Some exportInfo should match the specified moduleSymbol");
    const packageJsonImportFilter = ts.createPackageJsonImportFilter(sourceFile, preferences, host);
    return getBestFix(getImportFixes(exportInfos, useNamespaceInfo, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes, sourceFile, program, packageJsonImportFilter, host);
}

function codeFixActionToCodeAction({ description, changes, commands }: ts.CodeFixAction): ts.CodeAction {
    return { description, changes, commands };
}

function getAllExportInfoForSymbol(importingFile: ts.SourceFile, symbol: ts.Symbol, symbolName: string, preferCapitalized: boolean, program: ts.Program, host: ts.LanguageServiceHost, preferences: ts.UserPreferences, cancellationToken: ts.CancellationToken | undefined): readonly ts.SymbolExportInfo[] | undefined {
    const getChecker = createGetChecker(program, host);
    return ts.getExportInfoMap(importingFile, host, program, preferences, cancellationToken)
        .search(importingFile.path, preferCapitalized, name => name === symbolName, info => {
            if (ts.skipAlias(info[0].symbol, getChecker(info[0].isFromPackageJson)) === symbol) {
                return info;
            }
        });
}

function getSingleExportInfoForSymbol(symbol: ts.Symbol, moduleSymbol: ts.Symbol, program: ts.Program, host: ts.LanguageServiceHost): ts.SymbolExportInfo {
    const compilerOptions = program.getCompilerOptions();
    const mainProgramInfo = getInfoWithChecker(program.getTypeChecker(), /*isFromPackageJson*/ false);
    if (mainProgramInfo) {
        return mainProgramInfo;
    }
    const autoImportProvider = host.getPackageJsonAutoImportProvider?.()?.getTypeChecker();
    return ts.Debug.checkDefined(autoImportProvider && getInfoWithChecker(autoImportProvider, /*isFromPackageJson*/ true), `Could not find symbol in specified module for code actions`);

    function getInfoWithChecker(checker: ts.TypeChecker, isFromPackageJson: boolean): ts.SymbolExportInfo | undefined {
        const defaultInfo = ts.getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
        if (defaultInfo && ts.skipAlias(defaultInfo.symbol, checker) === symbol) {
            return { symbol: defaultInfo.symbol, moduleSymbol, moduleFileName: undefined, exportKind: defaultInfo.exportKind, targetFlags: ts.skipAlias(symbol, checker).flags, isFromPackageJson };
        }
        const named = checker.tryGetMemberInModuleExportsAndProperties(symbol.name, moduleSymbol);
        if (named && ts.skipAlias(named, checker) === symbol) {
            return { symbol: named, moduleSymbol, moduleFileName: undefined, exportKind: ts.ExportKind.Named, targetFlags: ts.skipAlias(symbol, checker).flags, isFromPackageJson };
        }
    }
}

function getImportFixes(
    exportInfos: readonly ts.SymbolExportInfo[],
    useNamespaceInfo: {
        symbolName: string,
        position: number,
    } | undefined,
    /** undefined only for missing JSX namespace */
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    program: ts.Program,
    sourceFile: ts.SourceFile,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
    importMap = createExistingImportMap(program.getTypeChecker(), sourceFile, program.getCompilerOptions()),
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number, fixes: readonly ImportFixWithModuleSpecifier[] } {
    const checker = program.getTypeChecker();
    const existingImports = ts.flatMap(exportInfos, importMap.getImportsForExportInfo);
    const useNamespace = useNamespaceInfo && tryUseExistingNamespaceImport(existingImports, useNamespaceInfo.symbolName, useNamespaceInfo.position, checker);
    const addToExisting = tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, checker, program.getCompilerOptions());
    if (addToExisting) {
        // Don't bother providing an action to add a new import if we can add to an existing one.
        return {
            computedWithoutCacheCount: 0,
            fixes: [...(useNamespace ? [useNamespace] : ts.emptyArray), addToExisting],
        };
    }

    const { fixes, computedWithoutCacheCount = 0 } = getFixesForAddImport(
        exportInfos,
        existingImports,
        program,
        sourceFile,
        useNamespaceInfo?.position,
        isValidTypeOnlyUseSite,
        useRequire,
        host,
        preferences,
        fromCacheOnly);
    return {
        computedWithoutCacheCount,
        fixes: [...(useNamespace ? [useNamespace] : ts.emptyArray), ...fixes],
    };
}

function tryUseExistingNamespaceImport(existingImports: readonly FixAddToExistingImportInfo[], symbolName: string, position: number, checker: ts.TypeChecker): FixUseNamespaceImport | undefined {
    // It is possible that multiple import statements with the same specifier exist in the file.
    // e.g.
    //
    //     import * as ns from "foo";
    //     import { member1, member2 } from "foo";
    //
    //     member3/**/ <-- cusor here
    //
    // in this case we should provie 2 actions:
    //     1. change "member3" to "ns.member3"
    //     2. add "member3" to the second import statement's import list
    // and it is up to the user to decide which one fits best.
    return ts.firstDefined(existingImports, ({ declaration }): FixUseNamespaceImport | undefined => {
        const namespacePrefix = getNamespaceLikeImportText(declaration);
        const moduleSpecifier = ts.tryGetModuleSpecifierFromDeclaration(declaration)?.text;
        if (namespacePrefix && moduleSpecifier) {
            const moduleSymbol = getTargetModuleFromNamespaceLikeImport(declaration, checker);
            if (moduleSymbol && moduleSymbol.exports!.has(ts.escapeLeadingUnderscores(symbolName))) {
                return { kind: ImportFixKind.UseNamespace, namespacePrefix, position, moduleSpecifier };
            }
        }
    });
}

function getTargetModuleFromNamespaceLikeImport(declaration: ts.AnyImportOrRequire, checker: ts.TypeChecker) {
    switch (declaration.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return checker.resolveExternalModuleName(declaration.initializer.arguments[0]);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return checker.getAliasedSymbol(declaration.symbol);
        case ts.SyntaxKind.ImportDeclaration:
            const namespaceImport = ts.tryCast(declaration.importClause?.namedBindings, ts.isNamespaceImport);
            return namespaceImport && checker.getAliasedSymbol(namespaceImport.symbol);
        default:
            return ts.Debug.assertNever(declaration);
    }
}

function getNamespaceLikeImportText(declaration: ts.AnyImportOrRequire) {
    switch (declaration.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return ts.tryCast(declaration.name, ts.isIdentifier)?.text;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return declaration.name.text;
        case ts.SyntaxKind.ImportDeclaration:
            return ts.tryCast(declaration.importClause?.namedBindings, ts.isNamespaceImport)?.name.text;
        default:
            return ts.Debug.assertNever(declaration);
    }
}

function getAddAsTypeOnly(
    isValidTypeOnlyUseSite: boolean,
    isForNewImportDeclaration: boolean,
    symbol: ts.Symbol,
    targetFlags: ts.SymbolFlags,
    checker: ts.TypeChecker,
    compilerOptions: ts.CompilerOptions
) {
    if (!isValidTypeOnlyUseSite) {
        // Can't use a type-only import if the usage is an emitting position
        return AddAsTypeOnly.NotAllowed;
    }
    if (isForNewImportDeclaration && compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Error) {
        // Not writing a (top-level) type-only import here would create an error because the runtime dependency is unnecessary
        return AddAsTypeOnly.Required;
    }
    if (compilerOptions.isolatedModules && compilerOptions.preserveValueImports &&
        (!(targetFlags & ts.SymbolFlags.Value) || !!checker.getTypeOnlyAliasDeclaration(symbol))
    ) {
        // A type-only import is required for this symbol if under these settings if the symbol will
        // be erased, which will happen if the target symbol is purely a type or if it was exported/imported
        // as type-only already somewhere between this import and the target.
        return AddAsTypeOnly.Required;
    }
    return AddAsTypeOnly.Allowed;
}

function tryAddToExistingImport(existingImports: readonly FixAddToExistingImportInfo[], isValidTypeOnlyUseSite: boolean, checker: ts.TypeChecker, compilerOptions: ts.CompilerOptions): FixAddToExistingImport | undefined {
    return ts.firstDefined(existingImports, ({ declaration, importKind, symbol, targetFlags }): FixAddToExistingImport | undefined => {
        if (importKind === ts.ImportKind.CommonJS || importKind === ts.ImportKind.Namespace || declaration.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            // These kinds of imports are not combinable with anything
            return undefined;
        }

        if (declaration.kind === ts.SyntaxKind.VariableDeclaration) {
            return (importKind === ts.ImportKind.Named || importKind === ts.ImportKind.Default) && declaration.name.kind === ts.SyntaxKind.ObjectBindingPattern
                ? { kind: ImportFixKind.AddToExisting, importClauseOrBindingPattern: declaration.name, importKind, moduleSpecifier: declaration.initializer.arguments[0].text, addAsTypeOnly: AddAsTypeOnly.NotAllowed }
                : undefined;
        }

        const { importClause } = declaration;
        if (!importClause || !ts.isStringLiteralLike(declaration.moduleSpecifier)) return undefined;
        const { name, namedBindings } = importClause;
        // A type-only import may not have both a default and named imports, so the only way a name can
        // be added to an existing type-only import is adding a named import to existing named bindings.
        if (importClause.isTypeOnly && !(importKind === ts.ImportKind.Named && namedBindings)) return undefined;

        // N.B. we don't have to figure out whether to use the main program checker
        // or the AutoImportProvider checker because we're adding to an existing import; the existence of
        // the import guarantees the symbol came from the main program.
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ false, symbol, targetFlags, checker, compilerOptions);

        if (importKind === ts.ImportKind.Default && (
            name ||                                                   // Cannot add a default import to a declaration that already has one
            addAsTypeOnly === AddAsTypeOnly.Required && namedBindings // Cannot add a default import as type-only if the import already has named bindings
        )) return undefined;
        if (
            importKind === ts.ImportKind.Named &&
            namedBindings?.kind === ts.SyntaxKind.NamespaceImport        // Cannot add a named import to a declaration that has a namespace import
        ) return undefined;

        return {
            kind: ImportFixKind.AddToExisting,
            importClauseOrBindingPattern: importClause,
            importKind,
            moduleSpecifier: declaration.moduleSpecifier.text,
            addAsTypeOnly,
        };
    });
}

function createExistingImportMap(checker: ts.TypeChecker, importingFile: ts.SourceFile, compilerOptions: ts.CompilerOptions) {
    let importMap: ts.MultiMap<ts.SymbolId, ts.AnyImportOrRequire> | undefined;
    for (const moduleSpecifier of importingFile.imports) {
        const i = ts.importFromModuleSpecifier(moduleSpecifier);
        if (ts.isVariableDeclarationInitializedToRequire(i.parent)) {
            const moduleSymbol = checker.resolveExternalModuleName(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= ts.createMultiMap()).add(ts.getSymbolId(moduleSymbol), i.parent);
            }
        }
        else if (i.kind === ts.SyntaxKind.ImportDeclaration || i.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= ts.createMultiMap()).add(ts.getSymbolId(moduleSymbol), i);
            }
        }
    }

    return {
        getImportsForExportInfo: ({ moduleSymbol, exportKind, targetFlags, symbol }: ts.SymbolExportInfo): readonly FixAddToExistingImportInfo[] => {
            // Can't use an es6 import for a type in JS.
            if (!(targetFlags & ts.SymbolFlags.Value) && ts.isSourceFileJS(importingFile)) return ts.emptyArray;
            const matchingDeclarations = importMap?.get(ts.getSymbolId(moduleSymbol));
            if (!matchingDeclarations) return ts.emptyArray;
            const importKind = getImportKind(importingFile, exportKind, compilerOptions);
            return matchingDeclarations.map(declaration => ({ declaration, importKind, symbol, targetFlags }));
        }
    };
}

function shouldUseRequire(sourceFile: ts.SourceFile, program: ts.Program): boolean {
    // 1. TypeScript files don't use require variable declarations
    if (!ts.isSourceFileJS(sourceFile)) {
        return false;
    }

    // 2. If the current source file is unambiguously CJS or ESM, go with that
    if (sourceFile.commonJsModuleIndicator && !sourceFile.externalModuleIndicator) return true;
    if (sourceFile.externalModuleIndicator && !sourceFile.commonJsModuleIndicator) return false;

    // 3. If there's a tsconfig/jsconfig, use its module setting
    const compilerOptions = program.getCompilerOptions();
    if (compilerOptions.configFile) {
        return ts.getEmitModuleKind(compilerOptions) < ts.ModuleKind.ES2015;
    }

    // 4. Match the first other JS file in the program that's unambiguously CJS or ESM
    for (const otherFile of program.getSourceFiles()) {
        if (otherFile === sourceFile || !ts.isSourceFileJS(otherFile) || program.isSourceFileFromExternalLibrary(otherFile)) continue;
        if (otherFile.commonJsModuleIndicator && !otherFile.externalModuleIndicator) return true;
        if (otherFile.externalModuleIndicator && !otherFile.commonJsModuleIndicator) return false;
    }

    // 5. Literally nothing to go on
    return true;
}

function createGetChecker(program: ts.Program, host: ts.LanguageServiceHost) {
    return ts.memoizeOne((isFromPackageJson: boolean) => isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker());
}

function getNewImportFixes(
    program: ts.Program,
    sourceFile: ts.SourceFile,
    position: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    exportInfo: readonly ts.SymbolExportInfo[],
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number, fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[] } {
    const isJs = ts.isSourceFileJS(sourceFile);
    const compilerOptions = program.getCompilerOptions();
    const moduleSpecifierResolutionHost = ts.createModuleSpecifierResolutionHost(program, host);
    const getChecker = createGetChecker(program, host);
    const rejectNodeModulesRelativePaths = ts.moduleResolutionUsesNodeModules(ts.getEmitModuleResolutionKind(compilerOptions));
    const getModuleSpecifiers = fromCacheOnly
        ? (moduleSymbol: ts.Symbol) => ({ moduleSpecifiers: ts.moduleSpecifiers.tryGetModuleSpecifiersFromCache(moduleSymbol, sourceFile, moduleSpecifierResolutionHost, preferences), computedWithoutCache: false })
        : (moduleSymbol: ts.Symbol, checker: ts.TypeChecker) => ts.moduleSpecifiers.getModuleSpecifiersWithCacheInfo(moduleSymbol, checker, compilerOptions, sourceFile, moduleSpecifierResolutionHost, preferences);

    let computedWithoutCacheCount = 0;
    const fixes = ts.flatMap(exportInfo, (exportInfo, i) => {
        const checker = getChecker(exportInfo.isFromPackageJson);
        const { computedWithoutCache, moduleSpecifiers } = getModuleSpecifiers(exportInfo.moduleSymbol, checker);
        const importedSymbolHasValueMeaning = !!(exportInfo.targetFlags & ts.SymbolFlags.Value);
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ true, exportInfo.symbol, exportInfo.targetFlags, checker, compilerOptions);
        computedWithoutCacheCount += computedWithoutCache ? 1 : 0;
        return ts.mapDefined(moduleSpecifiers, (moduleSpecifier): FixAddNewImport | FixAddJsdocTypeImport | undefined =>
            rejectNodeModulesRelativePaths && ts.pathContainsNodeModules(moduleSpecifier) ? undefined :
            // `position` should only be undefined at a missing jsx namespace, in which case we shouldn't be looking for pure types.
            !importedSymbolHasValueMeaning && isJs && position !== undefined ? { kind: ImportFixKind.JsdocTypeImport, moduleSpecifier, position, exportInfo, isReExport: i > 0 } :
            {
                kind: ImportFixKind.AddNew,
                moduleSpecifier,
                importKind: getImportKind(sourceFile, exportInfo.exportKind, compilerOptions),
                useRequire,
                addAsTypeOnly,
                exportInfo,
                isReExport: i > 0,
            }
        );
    });

    return { computedWithoutCacheCount, fixes };
}

function getFixesForAddImport(
    exportInfos: readonly ts.SymbolExportInfo[],
    existingImports: readonly FixAddToExistingImportInfo[],
    program: ts.Program,
    sourceFile: ts.SourceFile,
    position: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount?: number, fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[] } {
    const existingDeclaration = ts.firstDefined(existingImports, info => newImportInfoFromExistingSpecifier(info, isValidTypeOnlyUseSite, useRequire, program.getTypeChecker(), program.getCompilerOptions()));
    return existingDeclaration ? { fixes: [existingDeclaration] } : getNewImportFixes(program, sourceFile, position, isValidTypeOnlyUseSite, useRequire, exportInfos, host, preferences, fromCacheOnly);
}

function newImportInfoFromExistingSpecifier(
    { declaration, importKind, symbol, targetFlags }: FixAddToExistingImportInfo,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    checker: ts.TypeChecker,
    compilerOptions: ts.CompilerOptions
): FixAddNewImport | undefined {
    const moduleSpecifier = ts.tryGetModuleSpecifierFromDeclaration(declaration)?.text;
    if (moduleSpecifier) {
        const addAsTypeOnly = useRequire
            ? AddAsTypeOnly.NotAllowed
            : getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ true, symbol, targetFlags, checker, compilerOptions);
        return { kind: ImportFixKind.AddNew, moduleSpecifier, importKind, addAsTypeOnly, useRequire };
    }
}

interface FixInfo {
    readonly fix: ImportFix;
    readonly symbolName: string;
    readonly errorIdentifierText: string | undefined;
    readonly isJsxNamespaceFix?: boolean;
}
function getFixInfos(context: ts.CodeFixContextBase, errorCode: number, pos: number, useAutoImportProvider: boolean): readonly FixInfo[] | undefined {
    const symbolToken = ts.getTokenAtPosition(context.sourceFile, pos);
    let info;
    if (errorCode === ts.Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code) {
        info = getFixesInfoForUMDImport(context, symbolToken);
    }
    else if (!ts.isIdentifier(symbolToken)) {
        return undefined;
    }
    else if (errorCode === ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code) {
        const symbolName = ts.single(getSymbolNamesToImport(context.sourceFile, context.program.getTypeChecker(), symbolToken, context.program.getCompilerOptions()));
        const fix = getTypeOnlyPromotionFix(context.sourceFile, symbolToken, symbolName, context.program);
        return fix && [{ fix, symbolName, errorIdentifierText: symbolToken.text }];
    }
    else {
        info = getFixesInfoForNonUMDImport(context, symbolToken, useAutoImportProvider);
    }

    const packageJsonImportFilter = ts.createPackageJsonImportFilter(context.sourceFile, context.preferences, context.host);
    return info && sortFixInfo(info, context.sourceFile, context.program, packageJsonImportFilter, context.host);
}

function sortFixInfo(fixes: readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[], sourceFile: ts.SourceFile, program: ts.Program, packageJsonImportFilter: ts.PackageJsonImportFilter, host: ts.LanguageServiceHost): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[] {
    const _toPath = (fileName: string) => ts.toPath(fileName, host.getCurrentDirectory(), ts.hostGetCanonicalFileName(host));
    return ts.sort(fixes, (a, b) =>
        ts.compareBooleans(!!a.isJsxNamespaceFix, !!b.isJsxNamespaceFix) ||
        ts.compareValues(a.fix.kind, b.fix.kind) ||
        compareModuleSpecifiers(a.fix, b.fix, sourceFile, program, packageJsonImportFilter.allowsImportingSpecifier, _toPath));
}

function getBestFix(fixes: readonly ImportFixWithModuleSpecifier[], sourceFile: ts.SourceFile, program: ts.Program, packageJsonImportFilter: ts.PackageJsonImportFilter, host: ts.LanguageServiceHost): ImportFixWithModuleSpecifier | undefined {
    if (!ts.some(fixes)) return;
    // These will always be placed first if available, and are better than other kinds
    if (fixes[0].kind === ImportFixKind.UseNamespace || fixes[0].kind === ImportFixKind.AddToExisting) {
        return fixes[0];
    }

    return fixes.reduce((best, fix) =>
        // Takes true branch of conditional if `fix` is better than `best`
        compareModuleSpecifiers(
            fix,
            best,
            sourceFile,
            program,
            packageJsonImportFilter.allowsImportingSpecifier,
            fileName => ts.toPath(fileName, host.getCurrentDirectory(), ts.hostGetCanonicalFileName(host)),
        ) === ts.Comparison.LessThan ? fix : best
    );
}

/** @returns `Comparison.LessThan` if `a` is better than `b`. */
function compareModuleSpecifiers(
    a: ImportFixWithModuleSpecifier,
    b: ImportFixWithModuleSpecifier,
    importingFile: ts.SourceFile,
    program: ts.Program,
    allowsImportingSpecifier: (specifier: string) => boolean,
    toPath: (fileName: string) => ts.Path,
): ts.Comparison {
    if (a.kind !== ImportFixKind.UseNamespace && b.kind !== ImportFixKind.UseNamespace) {
        return ts.compareBooleans(allowsImportingSpecifier(b.moduleSpecifier), allowsImportingSpecifier(a.moduleSpecifier))
            || compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program)
            || ts.compareBooleans(
                isFixPossiblyReExportingImportingFile(a, importingFile, program.getCompilerOptions(), toPath),
                isFixPossiblyReExportingImportingFile(b, importingFile, program.getCompilerOptions(), toPath))
            || ts.compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier);
    }
    return ts.Comparison.EqualTo;
}

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index" (we don't even try to consider
// this if we're in a resolution mode where you can't drop trailing "/index" from paths).
function isFixPossiblyReExportingImportingFile(fix: ImportFixWithModuleSpecifier, importingFile: ts.SourceFile, compilerOptions: ts.CompilerOptions, toPath: (fileName: string) => ts.Path): boolean {
    if (fix.isReExport &&
        fix.exportInfo?.moduleFileName &&
        ts.getEmitModuleResolutionKind(compilerOptions) === ts.ModuleResolutionKind.NodeJs &&
        isIndexFileName(fix.exportInfo.moduleFileName)
    ) {
        const reExportDir = toPath(ts.getDirectoryPath(fix.exportInfo.moduleFileName));
        return ts.startsWith((importingFile.path), reExportDir);
    }
    return false;
}

function isIndexFileName(fileName: string) {
    return ts.getBaseFileName(fileName, [".js", ".jsx", ".d.ts", ".ts", ".tsx"], /*ignoreCase*/ true) === "index";
}

function compareNodeCoreModuleSpecifiers(a: string, b: string, importingFile: ts.SourceFile, program: ts.Program): ts.Comparison {
    if (ts.startsWith(a, "node:") && !ts.startsWith(b, "node:")) return ts.shouldUseUriStyleNodeCoreModules(importingFile, program) ? ts.Comparison.LessThan : ts.Comparison.GreaterThan;
    if (ts.startsWith(b, "node:") && !ts.startsWith(a, "node:")) return ts.shouldUseUriStyleNodeCoreModules(importingFile, program) ? ts.Comparison.GreaterThan : ts.Comparison.LessThan;
    return ts.Comparison.EqualTo;
}

function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }: ts.CodeFixContextBase, token: ts.Node): (FixInfo & { fix: ImportFixWithModuleSpecifier })[] | undefined {
    const checker = program.getTypeChecker();
    const umdSymbol = getUmdSymbol(token, checker);
    if (!umdSymbol) return undefined;
    const symbol = checker.getAliasedSymbol(umdSymbol);
    const symbolName = umdSymbol.name;
    const exportInfo: readonly ts.SymbolExportInfo[] = [{ symbol: umdSymbol, moduleSymbol: symbol, moduleFileName: undefined, exportKind: ts.ExportKind.UMD, targetFlags: symbol.flags, isFromPackageJson: false }];
    const useRequire = shouldUseRequire(sourceFile, program);
    const position = ts.isIdentifier(token) ? token.getStart(sourceFile) : undefined;
    const fixes = getImportFixes(exportInfo, position ? { position, symbolName } : undefined, /*isValidTypeOnlyUseSite*/ false, useRequire, program, sourceFile, host, preferences).fixes;
    return fixes.map(fix => ({ fix, symbolName, errorIdentifierText: ts.tryCast(token, ts.isIdentifier)?.text }));
}
function getUmdSymbol(token: ts.Node, checker: ts.TypeChecker): ts.Symbol | undefined {
    // try the identifier to see if it is the umd symbol
    const umdSymbol = ts.isIdentifier(token) ? checker.getSymbolAtLocation(token) : undefined;
    if (ts.isUMDExportSymbol(umdSymbol)) return umdSymbol;

    // The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
    const { parent } = token;
    return (ts.isJsxOpeningLikeElement(parent) && parent.tagName === token) || ts.isJsxOpeningFragment(parent)
        ? ts.tryCast(checker.resolveName(checker.getJsxNamespace(parent), ts.isJsxOpeningLikeElement(parent) ? token : parent, ts.SymbolFlags.Value, /*excludeGlobals*/ false), ts.isUMDExportSymbol)
        : undefined;
}

/**
 * @param forceImportKeyword Indicates that the user has already typed `import`, so the result must start with `import`.
 * (In other words, do not allow `const x = require("...")` for JS files.)
 */
export function getImportKind(importingFile: ts.SourceFile, exportKind: ts.ExportKind, compilerOptions: ts.CompilerOptions, forceImportKeyword?: boolean): ts.ImportKind {
    switch (exportKind) {
        case ts.ExportKind.Named: return ts.ImportKind.Named;
        case ts.ExportKind.Default: return ts.ImportKind.Default;
        case ts.ExportKind.ExportEquals: return getExportEqualsImportKind(importingFile, compilerOptions, !!forceImportKeyword);
        case ts.ExportKind.UMD: return getUmdImportKind(importingFile, compilerOptions, !!forceImportKeyword);
        default: return ts.Debug.assertNever(exportKind);
    }
}

function getUmdImportKind(importingFile: ts.SourceFile, compilerOptions: ts.CompilerOptions, forceImportKeyword: boolean): ts.ImportKind {
    // Import a synthetic `default` if enabled.
    if (ts.getAllowSyntheticDefaultImports(compilerOptions)) {
        return ts.ImportKind.Default;
    }

    // When a synthetic `default` is unavailable, use `import..require` if the module kind supports it.
    const moduleKind = ts.getEmitModuleKind(compilerOptions);
    switch (moduleKind) {
        case ts.ModuleKind.AMD:
        case ts.ModuleKind.CommonJS:
        case ts.ModuleKind.UMD:
            if (ts.isInJSFile(importingFile)) {
                return ts.isExternalModule(importingFile) || forceImportKeyword ? ts.ImportKind.Namespace : ts.ImportKind.CommonJS;
            }
            return ts.ImportKind.CommonJS;
        case ts.ModuleKind.System:
        case ts.ModuleKind.ES2015:
        case ts.ModuleKind.ES2020:
        case ts.ModuleKind.ES2022:
        case ts.ModuleKind.ESNext:
        case ts.ModuleKind.None:
            // Fall back to the `import * as ns` style import.
            return ts.ImportKind.Namespace;
        case ts.ModuleKind.Node16:
        case ts.ModuleKind.NodeNext:
            return importingFile.impliedNodeFormat === ts.ModuleKind.ESNext ? ts.ImportKind.Namespace : ts.ImportKind.CommonJS;
        default:
            return ts.Debug.assertNever(moduleKind, `Unexpected moduleKind ${moduleKind}`);
    }
}

function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }: ts.CodeFixContextBase, symbolToken: ts.Identifier, useAutoImportProvider: boolean): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[] | undefined {
    const checker = program.getTypeChecker();
    const compilerOptions = program.getCompilerOptions();
    return ts.flatMap(getSymbolNamesToImport(sourceFile, checker, symbolToken, compilerOptions), symbolName => {
        // "default" is a keyword and not a legal identifier for the import, but appears as an identifier.
        if (symbolName === ts.InternalSymbolName.Default) {
            return undefined;
        }
        const isValidTypeOnlyUseSite = ts.isValidTypeOnlyAliasUseSite(symbolToken);
        const useRequire = shouldUseRequire(sourceFile, program);
        const exportInfo = getExportInfos(symbolName, ts.isJSXTagName(symbolToken), ts.getMeaningFromLocation(symbolToken), cancellationToken, sourceFile, program, useAutoImportProvider, host, preferences);
        const fixes = ts.arrayFrom(ts.flatMapIterator(exportInfo.entries(), ([_, exportInfos]) =>
            getImportFixes(exportInfos, { symbolName, position: symbolToken.getStart(sourceFile) }, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes));
        return fixes.map(fix => ({ fix, symbolName, errorIdentifierText: symbolToken.text, isJsxNamespaceFix: symbolName !== symbolToken.text }));
    });
}

function getTypeOnlyPromotionFix(sourceFile: ts.SourceFile, symbolToken: ts.Identifier, symbolName: string, program: ts.Program): FixPromoteTypeOnlyImport | undefined {
    const checker = program.getTypeChecker();
    const symbol = checker.resolveName(symbolName, symbolToken, ts.SymbolFlags.Value, /*excludeGlobals*/ true);
    if (!symbol) return undefined;

    const typeOnlyAliasDeclaration = checker.getTypeOnlyAliasDeclaration(symbol);
    if (!typeOnlyAliasDeclaration || ts.getSourceFileOfNode(typeOnlyAliasDeclaration) !== sourceFile) return undefined;

    return { kind: ImportFixKind.PromoteTypeOnly, typeOnlyAliasDeclaration };
}

function getSymbolNamesToImport(sourceFile: ts.SourceFile, checker: ts.TypeChecker, symbolToken: ts.Identifier, compilerOptions: ts.CompilerOptions): string[] {
    const parent = symbolToken.parent;
    if ((ts.isJsxOpeningLikeElement(parent) || ts.isJsxClosingElement(parent)) && parent.tagName === symbolToken && ts.jsxModeNeedsExplicitImport(compilerOptions.jsx)) {
        const jsxNamespace = checker.getJsxNamespace(sourceFile);
        if (needsJsxNamespaceFix(jsxNamespace, symbolToken, checker)) {
            const needsComponentNameFix = !ts.isIntrinsicJsxName(symbolToken.text) && !checker.resolveName(symbolToken.text, symbolToken, ts.SymbolFlags.Value, /*excludeGlobals*/ false);
            return needsComponentNameFix ? [symbolToken.text, jsxNamespace] : [jsxNamespace];
        }
    }
    return [symbolToken.text];
}

function needsJsxNamespaceFix(jsxNamespace: string, symbolToken: ts.Identifier, checker: ts.TypeChecker) {
    if (ts.isIntrinsicJsxName(symbolToken.text)) return true; // If we were triggered by a matching error code on an intrinsic, the error must have been about missing the JSX factory
    const namespaceSymbol = checker.resolveName(jsxNamespace, symbolToken, ts.SymbolFlags.Value, /*excludeGlobals*/ true);
    return !namespaceSymbol || ts.some(namespaceSymbol.declarations, ts.isTypeOnlyImportOrExportDeclaration) && !(namespaceSymbol.flags & ts.SymbolFlags.Value);
}

// Returns a map from an exported symbol's ID to a list of every way it's (re-)exported.
function getExportInfos(
    symbolName: string,
    isJsxTagName: boolean,
    currentTokenMeaning: ts.SemanticMeaning,
    cancellationToken: ts.CancellationToken,
    fromFile: ts.SourceFile,
    program: ts.Program,
    useAutoImportProvider: boolean,
    host: ts.LanguageServiceHost,
    preferences: ts.UserPreferences,
): ts.ReadonlyESMap<string, readonly ts.SymbolExportInfo[]> {
    // For each original symbol, keep all re-exports of that symbol together so we can call `getCodeActionsForImport` on the whole group at once.
    // Maps symbol id to info for modules providing that symbol (original export + re-exports).
    const originalSymbolToExportInfos = ts.createMultiMap<ts.SymbolExportInfo>();
    const packageJsonFilter = ts.createPackageJsonImportFilter(fromFile, preferences, host);
    const moduleSpecifierCache = host.getModuleSpecifierCache?.();
    const getModuleSpecifierResolutionHost = ts.memoizeOne((isFromPackageJson: boolean) => {
        return ts.createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider!()! : program, host);
    });
    function addSymbol(moduleSymbol: ts.Symbol, toFile: ts.SourceFile | undefined, exportedSymbol: ts.Symbol, exportKind: ts.ExportKind, program: ts.Program, isFromPackageJson: boolean): void {
        const moduleSpecifierResolutionHost = getModuleSpecifierResolutionHost(isFromPackageJson);
        if (toFile && ts.isImportableFile(program, fromFile, toFile, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) ||
            !toFile && packageJsonFilter.allowsImportingAmbientModule(moduleSymbol, moduleSpecifierResolutionHost)
        ) {
            const checker = program.getTypeChecker();
            originalSymbolToExportInfos.add(ts.getUniqueSymbolId(exportedSymbol, checker).toString(), { symbol: exportedSymbol, moduleSymbol, moduleFileName: toFile?.fileName, exportKind, targetFlags: ts.skipAlias(exportedSymbol, checker).flags, isFromPackageJson });
        }
    }
    ts.forEachExternalModuleToImportFrom(program, host, preferences, useAutoImportProvider, (moduleSymbol, sourceFile, program, isFromPackageJson) => {
        const checker = program.getTypeChecker();
        cancellationToken.throwIfCancellationRequested();

        const compilerOptions = program.getCompilerOptions();
        const defaultInfo = ts.getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
        if (defaultInfo && (defaultInfo.name === symbolName || moduleSymbolToValidIdentifier(moduleSymbol, ts.getEmitScriptTarget(compilerOptions), isJsxTagName) === symbolName) && symbolHasMeaning(defaultInfo.symbolForMeaning, currentTokenMeaning)) {
            addSymbol(moduleSymbol, sourceFile, defaultInfo.symbol, defaultInfo.exportKind, program, isFromPackageJson);
        }

        // check exports with the same name
        const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
        if (exportSymbolWithIdenticalName && symbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
            addSymbol(moduleSymbol, sourceFile, exportSymbolWithIdenticalName, ts.ExportKind.Named, program, isFromPackageJson);
        }
    });
    return originalSymbolToExportInfos;
}

function getExportEqualsImportKind(importingFile: ts.SourceFile, compilerOptions: ts.CompilerOptions, forceImportKeyword: boolean): ts.ImportKind {
    const allowSyntheticDefaults = ts.getAllowSyntheticDefaultImports(compilerOptions);
    const isJS = ts.isInJSFile(importingFile);
    // 1. 'import =' will not work in es2015+ TS files, so the decision is between a default
    //    and a namespace import, based on allowSyntheticDefaultImports/esModuleInterop.
    if (!isJS && ts.getEmitModuleKind(compilerOptions) >= ts.ModuleKind.ES2015) {
        return allowSyntheticDefaults ? ts.ImportKind.Default : ts.ImportKind.Namespace;
    }
    // 2. 'import =' will not work in JavaScript, so the decision is between a default import,
    //    a namespace import, and const/require.
    if (isJS) {
        return ts.isExternalModule(importingFile) || forceImportKeyword
            ? allowSyntheticDefaults ? ts.ImportKind.Default : ts.ImportKind.Namespace
            : ts.ImportKind.CommonJS;
    }
    // 3. At this point the most correct choice is probably 'import =', but people
    //    really hate that, so look to see if the importing file has any precedent
    //    on how to handle it.
    for (const statement of importingFile.statements) {
        // `import foo` parses as an ImportEqualsDeclaration even though it could be an ImportDeclaration
        if (ts.isImportEqualsDeclaration(statement) && !ts.nodeIsMissing(statement.moduleReference)) {
            return ts.ImportKind.CommonJS;
        }
    }
    // 4. We have no precedent to go on, so just use a default import if
    //    allowSyntheticDefaultImports/esModuleInterop is enabled.
    return allowSyntheticDefaults ? ts.ImportKind.Default : ts.ImportKind.CommonJS;
}

function codeActionForFix(context: ts.textChanges.TextChangesContext, sourceFile: ts.SourceFile, symbolName: string, fix: ImportFix, includeSymbolNameInDescription: boolean, quotePreference: ts.QuotePreference, compilerOptions: ts.CompilerOptions): ts.CodeFixAction {
    let diag!: ts.DiagnosticAndArguments;
    const changes = ts.textChanges.ChangeTracker.with(context, tracker => {
        diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, includeSymbolNameInDescription, quotePreference, compilerOptions);
    });
    return ts.codefix.createCodeFixAction(importFixName, changes, diag, importFixId, ts.Diagnostics.Add_all_missing_imports);
}
function codeActionForFixWorker(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, symbolName: string, fix: ImportFix, includeSymbolNameInDescription: boolean, quotePreference: ts.QuotePreference, compilerOptions: ts.CompilerOptions): ts.DiagnosticAndArguments {
    switch (fix.kind) {
        case ImportFixKind.UseNamespace:
            addNamespaceQualifier(changes, sourceFile, fix);
            return [ts.Diagnostics.Change_0_to_1, symbolName, `${fix.namespacePrefix}.${symbolName}`];
        case ImportFixKind.JsdocTypeImport:
            addImportType(changes, sourceFile, fix, quotePreference);
            return [ts.Diagnostics.Change_0_to_1, symbolName, getImportTypePrefix(fix.moduleSpecifier, quotePreference) + symbolName];
        case ImportFixKind.AddToExisting: {
            const { importClauseOrBindingPattern, importKind, addAsTypeOnly, moduleSpecifier } = fix;
            doAddExistingFix(
                changes,
                sourceFile,
                importClauseOrBindingPattern,
                importKind === ts.ImportKind.Default ? { name: symbolName, addAsTypeOnly } : undefined,
                importKind === ts.ImportKind.Named ? [{ name: symbolName, addAsTypeOnly }] : ts.emptyArray,
                compilerOptions);
            const moduleSpecifierWithoutQuotes = ts.stripQuotes(moduleSpecifier);
            return includeSymbolNameInDescription
                ? [ts.Diagnostics.Import_0_from_1, symbolName, moduleSpecifierWithoutQuotes]
                : [ts.Diagnostics.Update_import_from_0, moduleSpecifierWithoutQuotes];
        }
        case ImportFixKind.AddNew: {
            const { importKind, moduleSpecifier, addAsTypeOnly, useRequire } = fix;
            const getDeclarations = useRequire ? getNewRequires : getNewImports;
            const defaultImport: Import | undefined = importKind === ts.ImportKind.Default ? { name: symbolName, addAsTypeOnly } : undefined;
            const namedImports: Import[] | undefined = importKind === ts.ImportKind.Named ? [{ name: symbolName, addAsTypeOnly }] : undefined;
            const namespaceLikeImport = importKind === ts.ImportKind.Namespace || importKind === ts.ImportKind.CommonJS ? { importKind, name: symbolName, addAsTypeOnly } : undefined;
            ts.insertImports(changes, sourceFile, getDeclarations(moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport), /*blankLineBetween*/ true);
            return includeSymbolNameInDescription
                ? [ts.Diagnostics.Import_0_from_1, symbolName, moduleSpecifier]
                : [ts.Diagnostics.Add_import_from_0, moduleSpecifier];
        }
        case ImportFixKind.PromoteTypeOnly: {
            const { typeOnlyAliasDeclaration } = fix;
            const promotedDeclaration = promoteFromTypeOnly(changes, typeOnlyAliasDeclaration, compilerOptions, sourceFile);
            return promotedDeclaration.kind === ts.SyntaxKind.ImportSpecifier
                ? [ts.Diagnostics.Remove_type_from_import_of_0_from_1, symbolName, getModuleSpecifierText(promotedDeclaration.parent.parent)]
                : [ts.Diagnostics.Remove_type_from_import_declaration_from_0, getModuleSpecifierText(promotedDeclaration)];
        }
        default:
            return ts.Debug.assertNever(fix, `Unexpected fix kind ${(fix as ImportFix).kind}`);
    }
}

function getModuleSpecifierText(promotedDeclaration: ts.ImportClause | ts.ImportEqualsDeclaration): string {
    return promotedDeclaration.kind === ts.SyntaxKind.ImportEqualsDeclaration
        ? ts.tryCast(ts.tryCast(promotedDeclaration.moduleReference, ts.isExternalModuleReference)?.expression, ts.isStringLiteralLike)?.text || promotedDeclaration.moduleReference.getText()
        : ts.cast(promotedDeclaration.parent.moduleSpecifier, ts.isStringLiteral).text;
}

function promoteFromTypeOnly(changes: ts.textChanges.ChangeTracker, aliasDeclaration: ts.TypeOnlyAliasDeclaration, compilerOptions: ts.CompilerOptions, sourceFile: ts.SourceFile) {
    // See comment in `doAddExistingFix` on constant with the same name.
    const convertExistingToTypeOnly = compilerOptions.preserveValueImports && compilerOptions.isolatedModules;
    switch (aliasDeclaration.kind) {
        case ts.SyntaxKind.ImportSpecifier:
            if (aliasDeclaration.isTypeOnly) {
                if (aliasDeclaration.parent.elements.length > 1 && ts.OrganizeImports.importSpecifiersAreSorted(aliasDeclaration.parent.elements)) {
                    changes.delete(sourceFile, aliasDeclaration);
                    const newSpecifier = ts.factory.updateImportSpecifier(aliasDeclaration, /*isTypeOnly*/ false, aliasDeclaration.propertyName, aliasDeclaration.name);
                    const insertionIndex = ts.OrganizeImports.getImportSpecifierInsertionIndex(aliasDeclaration.parent.elements, newSpecifier);
                    changes.insertImportSpecifierAtIndex(sourceFile, newSpecifier, aliasDeclaration.parent, insertionIndex);
                }
                else {
                    changes.deleteRange(sourceFile, aliasDeclaration.getFirstToken()!);
                }
                return aliasDeclaration;
            }
            else {
                ts.Debug.assert(aliasDeclaration.parent.parent.isTypeOnly);
                promoteImportClause(aliasDeclaration.parent.parent);
                return aliasDeclaration.parent.parent;
            }
        case ts.SyntaxKind.ImportClause:
            promoteImportClause(aliasDeclaration);
            return aliasDeclaration;
        case ts.SyntaxKind.NamespaceImport:
            promoteImportClause(aliasDeclaration.parent);
            return aliasDeclaration.parent;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            changes.deleteRange(sourceFile, aliasDeclaration.getChildAt(1));
            return aliasDeclaration;
        default:
            ts.Debug.failBadSyntaxKind(aliasDeclaration);
    }

    function promoteImportClause(importClause: ts.ImportClause) {
        changes.delete(sourceFile, ts.getTypeKeywordOfTypeOnlyImport(importClause, sourceFile));
        if (convertExistingToTypeOnly) {
            const namedImports = ts.tryCast(importClause.namedBindings, ts.isNamedImports);
            if (namedImports && namedImports.elements.length > 1) {
                if (ts.OrganizeImports.importSpecifiersAreSorted(namedImports.elements) &&
                    aliasDeclaration.kind === ts.SyntaxKind.ImportSpecifier &&
                    namedImports.elements.indexOf(aliasDeclaration) !== 0
                ) {
                    // The import specifier being promoted will be the only non-type-only,
                    //  import in the NamedImports, so it should be moved to the front.
                    changes.delete(sourceFile, aliasDeclaration);
                    changes.insertImportSpecifierAtIndex(sourceFile, aliasDeclaration, namedImports, 0);
                }
                for (const element of namedImports.elements) {
                    if (element !== aliasDeclaration && !element.isTypeOnly) {
                        changes.insertModifierBefore(sourceFile, ts.SyntaxKind.TypeKeyword, element);
                    }
                }
            }
        }
    }
}

function doAddExistingFix(
    changes: ts.textChanges.ChangeTracker,
    sourceFile: ts.SourceFile,
    clause: ts.ImportClause | ts.ObjectBindingPattern,
    defaultImport: Import | undefined,
    namedImports: readonly Import[],
    compilerOptions: ts.CompilerOptions,
): void {
    if (clause.kind === ts.SyntaxKind.ObjectBindingPattern) {
        if (defaultImport) {
            addElementToBindingPattern(clause, defaultImport.name, "default");
        }
        for (const specifier of namedImports) {
            addElementToBindingPattern(clause, specifier.name, /*propertyName*/ undefined);
        }
        return;
    }

    const promoteFromTypeOnly = clause.isTypeOnly && ts.some([defaultImport, ...namedImports], i => i?.addAsTypeOnly === AddAsTypeOnly.NotAllowed);
    const existingSpecifiers = clause.namedBindings && ts.tryCast(clause.namedBindings, ts.isNamedImports)?.elements;
    // If we are promoting from a type-only import and `--isolatedModules` and `--preserveValueImports`
    // are enabled, we need to make every existing import specifier type-only. It may be possible that
    // some of them don't strictly need to be marked type-only (if they have a value meaning and are
    // never used in an emitting position). These are allowed to be imported without being type-only,
    // but the user has clearly already signified that they don't need them to be present at runtime
    // by placing them in a type-only import. So, just mark each specifier as type-only.
    const convertExistingToTypeOnly = promoteFromTypeOnly && compilerOptions.preserveValueImports && compilerOptions.isolatedModules;

    if (defaultImport) {
        ts.Debug.assert(!clause.name, "Cannot add a default import to an import clause that already has one");
        changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), ts.factory.createIdentifier(defaultImport.name), { suffix: ", " });
    }

    if (namedImports.length) {
        const newSpecifiers = ts.stableSort(
            namedImports.map(namedImport => ts.factory.createImportSpecifier(
                (!clause.isTypeOnly || promoteFromTypeOnly) && needsTypeOnly(namedImport),
                /*propertyName*/ undefined,
                ts.factory.createIdentifier(namedImport.name))),
            ts.OrganizeImports.compareImportOrExportSpecifiers);

        if (existingSpecifiers?.length && ts.OrganizeImports.importSpecifiersAreSorted(existingSpecifiers)) {
            for (const spec of newSpecifiers) {
                // Organize imports puts type-only import specifiers last, so if we're
                // adding a non-type-only specifier and converting all the other ones to
                // type-only, there's no need to ask for the insertion index - it's 0.
                const insertionIndex = convertExistingToTypeOnly && !spec.isTypeOnly
                    ? 0
                    : ts.OrganizeImports.getImportSpecifierInsertionIndex(existingSpecifiers, spec);
                changes.insertImportSpecifierAtIndex(sourceFile, spec, clause.namedBindings as ts.NamedImports, insertionIndex);
            }
        }
        else if (existingSpecifiers?.length) {
            for (const spec of newSpecifiers) {
                changes.insertNodeInListAfter(sourceFile, ts.last(existingSpecifiers), spec, existingSpecifiers);
            }
        }
        else {
            if (newSpecifiers.length) {
                const namedImports = ts.factory.createNamedImports(newSpecifiers);
                if (clause.namedBindings) {
                    changes.replaceNode(sourceFile, clause.namedBindings, namedImports);
                }
                else {
                    changes.insertNodeAfter(sourceFile, ts.Debug.checkDefined(clause.name, "Import clause must have either named imports or a default import"), namedImports);
                }
            }
        }
    }

    if (promoteFromTypeOnly) {
        changes.delete(sourceFile, ts.getTypeKeywordOfTypeOnlyImport(clause, sourceFile));
        if (convertExistingToTypeOnly && existingSpecifiers) {
            for (const specifier of existingSpecifiers) {
                changes.insertModifierBefore(sourceFile, ts.SyntaxKind.TypeKeyword, specifier);
            }
        }
    }

    function addElementToBindingPattern(bindingPattern: ts.ObjectBindingPattern, name: string, propertyName: string | undefined) {
        const element = ts.factory.createBindingElement(/*dotDotDotToken*/ undefined, propertyName, name);
        if (bindingPattern.elements.length) {
            changes.insertNodeInListAfter(sourceFile, ts.last(bindingPattern.elements), element);
        }
        else {
            changes.replaceNode(sourceFile, bindingPattern, ts.factory.createObjectBindingPattern([element]));
        }
    }
}

function addNamespaceQualifier(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { namespacePrefix, position }: FixUseNamespaceImport): void {
    changes.insertText(sourceFile, position, namespacePrefix + ".");
}

function addImportType(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { moduleSpecifier, position }: FixAddJsdocTypeImport, quotePreference: ts.QuotePreference): void {
    changes.insertText(sourceFile, position, getImportTypePrefix(moduleSpecifier, quotePreference));
}

function getImportTypePrefix(moduleSpecifier: string, quotePreference: ts.QuotePreference): string {
    const quote = ts.getQuoteFromPreference(quotePreference);
    return `import(${quote}${moduleSpecifier}${quote}).`;
}

interface Import {
    readonly name: string;
    readonly addAsTypeOnly: AddAsTypeOnly;
}

interface ImportsCollection {
    readonly defaultImport?: Import;
    readonly namedImports?: ts.ESMap<string, AddAsTypeOnly>;
    readonly namespaceLikeImport?: {
        readonly importKind: ts.ImportKind.CommonJS | ts.ImportKind.Namespace;
        readonly name: string;
        readonly addAsTypeOnly: AddAsTypeOnly;
    };
}

function needsTypeOnly({ addAsTypeOnly }: { addAsTypeOnly: AddAsTypeOnly }): boolean {
    return addAsTypeOnly === AddAsTypeOnly.Required;
}

function getNewImports(
    moduleSpecifier: string,
    quotePreference: ts.QuotePreference,
    defaultImport: Import | undefined,
    namedImports: readonly Import[] | undefined,
    namespaceLikeImport: Import & { importKind: ts.ImportKind.CommonJS | ts.ImportKind.Namespace } | undefined
): ts.AnyImportSyntax | readonly ts.AnyImportSyntax[] {
    const quotedModuleSpecifier = ts.makeStringLiteral(moduleSpecifier, quotePreference);
    let statements: ts.AnyImportSyntax | readonly ts.AnyImportSyntax[] | undefined;
    if (defaultImport !== undefined || namedImports?.length) {
        const topLevelTypeOnly = (!defaultImport || needsTypeOnly(defaultImport)) && ts.every(namedImports, needsTypeOnly);
        statements = ts.combine(statements, ts.makeImport(
            defaultImport && ts.factory.createIdentifier(defaultImport.name),
            namedImports?.map(({ addAsTypeOnly, name }) => ts.factory.createImportSpecifier(
                !topLevelTypeOnly && addAsTypeOnly === AddAsTypeOnly.Required,
                /*propertyName*/ undefined,
                ts.factory.createIdentifier(name))),
            moduleSpecifier,
            quotePreference,
            topLevelTypeOnly));
    }

    if (namespaceLikeImport) {
        const declaration = namespaceLikeImport.importKind === ts.ImportKind.CommonJS
            ? ts.factory.createImportEqualsDeclaration(
                /*modifiers*/ undefined,
                needsTypeOnly(namespaceLikeImport),
                ts.factory.createIdentifier(namespaceLikeImport.name),
                ts.factory.createExternalModuleReference(quotedModuleSpecifier))
            : ts.factory.createImportDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createImportClause(
                    needsTypeOnly(namespaceLikeImport),
                    /*name*/ undefined,
                    ts.factory.createNamespaceImport(ts.factory.createIdentifier(namespaceLikeImport.name))),
                quotedModuleSpecifier,
                /*assertClause*/ undefined);
        statements = ts.combine(statements, declaration);
    }
    return ts.Debug.checkDefined(statements);
}

function getNewRequires(moduleSpecifier: string, quotePreference: ts.QuotePreference, defaultImport: Import | undefined, namedImports: readonly Import[] | undefined, namespaceLikeImport: Import | undefined): ts.RequireVariableStatement | readonly ts.RequireVariableStatement[] {
    const quotedModuleSpecifier = ts.makeStringLiteral(moduleSpecifier, quotePreference);
    let statements: ts.RequireVariableStatement | readonly ts.RequireVariableStatement[] | undefined;
    // const { default: foo, bar, etc } = require('./mod');
    if (defaultImport || namedImports?.length) {
        const bindingElements = namedImports?.map(({ name }) => ts.factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, name)) || [];
        if (defaultImport) {
            bindingElements.unshift(ts.factory.createBindingElement(/*dotDotDotToken*/ undefined, "default", defaultImport.name));
        }
        const declaration = createConstEqualsRequireDeclaration(ts.factory.createObjectBindingPattern(bindingElements), quotedModuleSpecifier);
        statements = ts.combine(statements, declaration);
    }
    // const foo = require('./mod');
    if (namespaceLikeImport) {
        const declaration = createConstEqualsRequireDeclaration(namespaceLikeImport.name, quotedModuleSpecifier);
        statements = ts.combine(statements, declaration);
    }
    return ts.Debug.checkDefined(statements);
}

function createConstEqualsRequireDeclaration(name: string | ts.ObjectBindingPattern, quotedModuleSpecifier: ts.StringLiteral): ts.RequireVariableStatement {
    return ts.factory.createVariableStatement(
        /*modifiers*/ undefined,
        ts.factory.createVariableDeclarationList([
            ts.factory.createVariableDeclaration(
                typeof name === "string" ? ts.factory.createIdentifier(name) : name,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                ts.factory.createCallExpression(ts.factory.createIdentifier("require"), /*typeArguments*/ undefined, [quotedModuleSpecifier]))],
            ts.NodeFlags.Const)) as ts.RequireVariableStatement;
}

function symbolHasMeaning({ declarations }: ts.Symbol, meaning: ts.SemanticMeaning): boolean {
    return ts.some(declarations, decl => !!(ts.getMeaningFromDeclaration(decl) & meaning));
}

export function moduleSymbolToValidIdentifier(moduleSymbol: ts.Symbol, target: ts.ScriptTarget | undefined, forceCapitalize: boolean): string {
    return moduleSpecifierToValidIdentifier(ts.removeFileExtension(ts.stripQuotes(moduleSymbol.name)), target, forceCapitalize);
}

export function moduleSpecifierToValidIdentifier(moduleSpecifier: string, target: ts.ScriptTarget | undefined, forceCapitalize?: boolean): string {
    const baseName = ts.getBaseFileName(ts.removeSuffix(moduleSpecifier, "/index"));
    let res = "";
    let lastCharWasValid = true;
    const firstCharCode = baseName.charCodeAt(0);
    if (ts.isIdentifierStart(firstCharCode, target)) {
        res += String.fromCharCode(firstCharCode);
        if (forceCapitalize) {
            res = res.toUpperCase();
        }
    }
    else {
        lastCharWasValid = false;
    }
    for (let i = 1; i < baseName.length; i++) {
        const ch = baseName.charCodeAt(i);
        const isValid = ts.isIdentifierPart(ch, target);
        if (isValid) {
            let char = String.fromCharCode(ch);
            if (!lastCharWasValid) {
                char = char.toUpperCase();
            }
            res += char;
        }
        lastCharWasValid = isValid;
    }
    // Need `|| "_"` to ensure result isn't empty.
    return !ts.isStringANonContextualKeyword(res) ? res || "_" : `_${res}`;
}
}

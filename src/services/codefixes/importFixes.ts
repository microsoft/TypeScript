import {
    AnyImportOrRequire, AnyImportOrRequireStatement, AnyImportSyntax, arrayFrom, CancellationToken, cast, CodeAction,
    CodeFixAction, CodeFixContextBase, combine, compareBooleans, compareNumberOfDirectorySeparators, compareValues,
    Comparison, CompilerOptions, createModuleSpecifierResolutionHost, createMultiMap, createPackageJsonImportFilter,
    Debug, DiagnosticAndArguments, Diagnostics, DiagnosticWithLocation, emptyArray, escapeLeadingUnderscores,
    every, ExportKind, factory, first, firstDefined, flatMap, flatMapIterator, forEachExternalModuleToImportFrom,
    formatting, getAllowSyntheticDefaultImports, getBaseFileName, getDefaultLikeExportInfo, getDirectoryPath,
    getEmitModuleKind, getEmitModuleResolutionKind, getEmitScriptTarget, getExportInfoMap, getMeaningFromDeclaration,
    getMeaningFromLocation, getNameForExportedSymbol, getNodeId, getQuoteFromPreference, getQuotePreference,
    getSourceFileOfNode, getSymbolId, getTokenAtPosition, getTypeKeywordOfTypeOnlyImport, getUniqueSymbolId,
    hostGetCanonicalFileName, Identifier, ImportClause, ImportEqualsDeclaration, importFromModuleSpecifier, ImportKind,
    ImportsNotUsedAsValues, insertImports, InternalSymbolName, isExternalModule, isExternalModuleReference,
    isIdentifier, isIdentifierPart, isIdentifierStart, isImportableFile, isImportEqualsDeclaration, isInJSFile,
    isIntrinsicJsxName, isJsxClosingElement, isJsxOpeningFragment, isJsxOpeningLikeElement, isJSXTagName,
    isNamedImports, isNamespaceImport, isSourceFileJS, isStringANonContextualKeyword, isStringLiteral,
    isStringLiteralLike, isTypeOnlyImportOrExportDeclaration, isUMDExportSymbol, isValidTypeOnlyAliasUseSite,
    isVariableDeclarationInitializedToRequire, jsxModeNeedsExplicitImport, LanguageServiceHost, last, makeImport,
    makeStringLiteral, mapDefined, memoizeOne, ModuleKind, ModuleResolutionKind, moduleResolutionUsesNodeModules,
    moduleSpecifiers, MultiMap, Mutable, NamedImports, Node, NodeFlags, nodeIsMissing, ObjectBindingPattern,
    OrganizeImports, PackageJsonImportFilter, Path, pathContainsNodeModules, pathIsBareSpecifier, Program,
    QuotePreference, removeFileExtension, removeSuffix, RequireVariableStatement, ScriptTarget,
    SemanticMeaning, shouldUseUriStyleNodeCoreModules, single, skipAlias, some, sort, SourceFile, stableSort,
    startsWith, StringLiteral, stripQuotes, Symbol, SymbolExportInfo, SymbolFlags, SymbolId, SyntaxKind, textChanges,
    toPath, tryCast, tryGetModuleSpecifierFromDeclaration, TypeChecker, TypeOnlyAliasDeclaration, UserPreferences,
} from "../_namespaces/ts";
import {
    createCodeFixAction, createCombinedCodeActions, eachDiagnostic, registerCodeFix,
} from "../_namespaces/ts.codefix";

/** @internal */
export const importFixName = "import";
const importFixId = "fixMissingImport";
const errorCodes: readonly number[] = [
    Diagnostics.Cannot_find_name_0.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
    Diagnostics.Cannot_find_namespace_0.code,
    Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code,
    Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here.code,
    Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.code,
    Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { errorCode, preferences, sourceFile, span, program } = context;
        const info = getFixInfos(context, errorCode, span.start, /*useAutoImportProvider*/ true);
        if (!info) return undefined;
        const quotePreference = getQuotePreference(sourceFile, preferences);
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
        eachDiagnostic(context, errorCodes, diag => importAdder.addImportFromDiagnostic(diag, context));
        return createCombinedCodeActions(textChanges.ChangeTracker.with(context, importAdder.writeFixes));
    },
});

/**
 * Computes multiple import additions to a file and writes them to a ChangeTracker.
 *
 * @internal
 */
export interface ImportAdder {
    hasFixes(): boolean;
    addImportFromDiagnostic: (diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) => void;
    addImportFromExportedSymbol: (exportedSymbol: Symbol, isValidTypeOnlyUseSite?: boolean) => void;
    writeFixes: (changeTracker: textChanges.ChangeTracker) => void;
}

/** @internal */
export function createImportAdder(sourceFile: SourceFile, program: Program, preferences: UserPreferences, host: LanguageServiceHost, cancellationToken?: CancellationToken): ImportAdder {
    return createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ false, preferences, host, cancellationToken);
}

interface AddToExistingState {
    readonly importClauseOrBindingPattern: ImportClause | ObjectBindingPattern;
    defaultImport: Import | undefined;
    readonly namedImports: Map<string, AddAsTypeOnly>;
}

function createImportAdderWorker(sourceFile: SourceFile, program: Program, useAutoImportProvider: boolean, preferences: UserPreferences, host: LanguageServiceHost, cancellationToken: CancellationToken | undefined): ImportAdder {
    const compilerOptions = program.getCompilerOptions();
    // Namespace fixes don't conflict, so just build a list.
    const addToNamespace: FixUseNamespaceImport[] = [];
    const importType: FixAddJsdocTypeImport[] = [];
    /** Keys are import clause node IDs. */
    const addToExisting = new Map<string, AddToExistingState>();

    type NewImportsKey = `${0 | 1}|${string}`;
    /** Use `getNewImportEntry` for access */
    const newImports = new Map<NewImportsKey, Mutable<ImportsCollection & { useRequire: boolean }>>();
    return { addImportFromDiagnostic, addImportFromExportedSymbol, writeFixes, hasFixes };

    function addImportFromDiagnostic(diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) {
        const info = getFixInfos(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
        if (!info || !info.length) return;
        addImport(first(info));
    }

    function addImportFromExportedSymbol(exportedSymbol: Symbol, isValidTypeOnlyUseSite?: boolean) {
        const moduleSymbol = Debug.checkDefined(exportedSymbol.parent);
        const symbolName = getNameForExportedSymbol(exportedSymbol, getEmitScriptTarget(compilerOptions));
        const checker = program.getTypeChecker();
        const symbol = checker.getMergedSymbol(skipAlias(exportedSymbol, checker));
        const exportInfo = getAllExportInfoForSymbol(sourceFile, symbol, symbolName, /*isJsxTagName*/ false, program, host, preferences, cancellationToken);
        const useRequire = shouldUseRequire(sourceFile, program);
        const fix = getImportFixForSymbol(sourceFile, Debug.checkDefined(exportInfo), moduleSymbol, program, /*useNamespaceInfo*/ undefined, !!isValidTypeOnlyUseSite, useRequire, host, preferences);
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
                const key = String(getNodeId(importClauseOrBindingPattern));
                let entry = addToExisting.get(key);
                if (!entry) {
                    addToExisting.set(key, entry = { importClauseOrBindingPattern, defaultImport: undefined, namedImports: new Map() });
                }
                if (importKind === ImportKind.Named) {
                    const prevValue = entry?.namedImports.get(symbolName);
                    entry.namedImports.set(symbolName, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                }
                else {
                    Debug.assert(entry.defaultImport === undefined || entry.defaultImport.name === symbolName, "(Add to Existing) Default import should be missing or match symbolName");
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
                Debug.assert(entry.useRequire === useRequire, "(Add new) Tried to add an `import` and a `require` for the same module");

                switch (importKind) {
                    case ImportKind.Default:
                        Debug.assert(entry.defaultImport === undefined || entry.defaultImport.name === symbolName, "(Add new) Default import should be missing or match symbolName");
                        entry.defaultImport = { name: symbolName, addAsTypeOnly: reduceAddAsTypeOnlyValues(entry.defaultImport?.addAsTypeOnly, addAsTypeOnly) };
                        break;
                    case ImportKind.Named:
                        const prevValue = (entry.namedImports ||= new Map()).get(symbolName);
                        entry.namedImports.set(symbolName, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                        break;
                    case ImportKind.CommonJS:
                    case ImportKind.Namespace:
                        Debug.assert(entry.namespaceLikeImport === undefined || entry.namespaceLikeImport.name === symbolName, "Namespacelike import shoudl be missing or match symbolName");
                        entry.namespaceLikeImport = { importKind, name: symbolName, addAsTypeOnly };
                        break;
                }
                break;
            }
            case ImportFixKind.PromoteTypeOnly:
                // Excluding from fix-all
                break;
            default:
                Debug.assertNever(fix, `fix wasn't never - got kind ${(fix as ImportFix).kind}`);
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

        function getNewImportEntry(moduleSpecifier: string, importKind: ImportKind, useRequire: boolean, addAsTypeOnly: AddAsTypeOnly): Mutable<ImportsCollection & { useRequire: boolean }> {
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
            if (importKind === ImportKind.Default && addAsTypeOnly === AddAsTypeOnly.Required) {
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

    function writeFixes(changeTracker: textChanges.ChangeTracker) {
        const quotePreference = getQuotePreference(sourceFile, preferences);
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
                arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })),
                compilerOptions);
        });

        let newDeclarations: AnyImportOrRequireStatement | readonly AnyImportOrRequireStatement[] | undefined;
        newImports.forEach(({ useRequire, defaultImport, namedImports, namespaceLikeImport }, key) => {
            const moduleSpecifier = key.slice(2); // From `${0 | 1}|${moduleSpecifier}` format
            const getDeclarations = useRequire ? getNewRequires : getNewImports;
            const declarations = getDeclarations(
                moduleSpecifier,
                quotePreference,
                defaultImport,
                namedImports && arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })),
                namespaceLikeImport);
            newDeclarations = combine(newDeclarations, declarations);
        });
        if (newDeclarations) {
            insertImports(changeTracker, sourceFile, newDeclarations, /*blankLineBetween*/ true);
        }
    }

    function hasFixes() {
        return addToNamespace.length > 0 || importType.length > 0 || addToExisting.size > 0 || newImports.size > 0;
    }
}

/**
 * Computes module specifiers for multiple import additions to a file.
 *
 * @internal
 */
 export interface ImportSpecifierResolver {
    getModuleSpecifierForBestExportInfo(
        exportInfo: readonly SymbolExportInfo[],
        symbolName: string,
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean
    ): { exportInfo?: SymbolExportInfo, moduleSpecifier: string, computedWithoutCacheCount: number } | undefined;
}

/** @internal */
export function createImportSpecifierResolver(importingFile: SourceFile, program: Program, host: LanguageServiceHost, preferences: UserPreferences): ImportSpecifierResolver {
    const packageJsonImportFilter = createPackageJsonImportFilter(importingFile, preferences, host);
    const importMap = createExistingImportMap(program.getTypeChecker(), importingFile, program.getCompilerOptions());
    return { getModuleSpecifierForBestExportInfo };

    function getModuleSpecifierForBestExportInfo(
        exportInfo: readonly SymbolExportInfo[],
        symbolName: string,
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: SymbolExportInfo, moduleSpecifier: string, computedWithoutCacheCount: number } | undefined {
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
    readonly exportInfo?: SymbolExportInfo;
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
    readonly exportInfo: SymbolExportInfo;
}
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
}
interface FixPromoteTypeOnlyImport {
    readonly kind: ImportFixKind.PromoteTypeOnly;
    readonly typeOnlyAliasDeclaration: TypeOnlyAliasDeclaration;
}


/** Information needed to augment an existing import declaration. */
interface FixAddToExistingImportInfo {
    readonly declaration: AnyImportOrRequire;
    readonly importKind: ImportKind;
    readonly targetFlags: SymbolFlags;
    readonly symbol: Symbol;
}

/** @internal */
export function getImportCompletionAction(
    targetSymbol: Symbol,
    moduleSymbol: Symbol,
    sourceFile: SourceFile,
    symbolName: string,
    isJsxTagName: boolean,
    host: LanguageServiceHost,
    program: Program,
    formatContext: formatting.FormatContext,
    position: number,
    preferences: UserPreferences,
    cancellationToken: CancellationToken,
): { readonly moduleSpecifier: string, readonly codeAction: CodeAction } {
    const compilerOptions = program.getCompilerOptions();

    const exportInfos = pathIsBareSpecifier(stripQuotes(moduleSymbol.name))
        ? [getSingleExportInfoForSymbol(targetSymbol, moduleSymbol, program, host)]
        : getAllExportInfoForSymbol(sourceFile, targetSymbol, symbolName, isJsxTagName, program, host, preferences, cancellationToken);

    Debug.assertIsDefined(exportInfos);
    const useRequire = shouldUseRequire(sourceFile, program);
    const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(getTokenAtPosition(sourceFile, position));
    const fix = Debug.checkDefined(getImportFixForSymbol(sourceFile, exportInfos, moduleSymbol, program, { symbolName, position }, isValidTypeOnlyUseSite, useRequire, host, preferences));
    return {
        moduleSpecifier: fix.moduleSpecifier,
        codeAction: codeFixActionToCodeAction(codeActionForFix(
            { host, formatContext, preferences },
            sourceFile,
            symbolName,
            fix,
            /*includeSymbolNameInDescription*/ false,
            getQuotePreference(sourceFile, preferences), compilerOptions))
    };
}

/** @internal */
export function getPromoteTypeOnlyCompletionAction(sourceFile: SourceFile, symbolToken: Identifier, program: Program, host: LanguageServiceHost, formatContext: formatting.FormatContext, preferences: UserPreferences) {
    const compilerOptions = program.getCompilerOptions();
    const symbolName = single(getSymbolNamesToImport(sourceFile, program.getTypeChecker(), symbolToken, compilerOptions));
    const fix = getTypeOnlyPromotionFix(sourceFile, symbolToken, symbolName, program);
    const includeSymbolNameInDescription = symbolName !== symbolToken.text;
    return fix && codeFixActionToCodeAction(codeActionForFix({ host, formatContext, preferences }, sourceFile, symbolName, fix, includeSymbolNameInDescription, QuotePreference.Double, compilerOptions));
}

function getImportFixForSymbol(sourceFile: SourceFile, exportInfos: readonly SymbolExportInfo[], moduleSymbol: Symbol, program: Program, useNamespaceInfo: { position: number, symbolName: string } | undefined, isValidTypeOnlyUseSite: boolean, useRequire: boolean, host: LanguageServiceHost, preferences: UserPreferences) {
    Debug.assert(exportInfos.some(info => info.moduleSymbol === moduleSymbol || info.symbol.parent === moduleSymbol), "Some exportInfo should match the specified moduleSymbol");
    const packageJsonImportFilter = createPackageJsonImportFilter(sourceFile, preferences, host);
    return getBestFix(getImportFixes(exportInfos, useNamespaceInfo, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes, sourceFile, program, packageJsonImportFilter, host);
}

function codeFixActionToCodeAction({ description, changes, commands }: CodeFixAction): CodeAction {
    return { description, changes, commands };
}

function getAllExportInfoForSymbol(importingFile: SourceFile, symbol: Symbol, symbolName: string, preferCapitalized: boolean, program: Program, host: LanguageServiceHost, preferences: UserPreferences, cancellationToken: CancellationToken | undefined): readonly SymbolExportInfo[] | undefined {
    const getChecker = createGetChecker(program, host);
    return getExportInfoMap(importingFile, host, program, preferences, cancellationToken)
        .search(importingFile.path, preferCapitalized, name => name === symbolName, info => {
            if (skipAlias(info[0].symbol, getChecker(info[0].isFromPackageJson)) === symbol) {
                return info;
            }
        });
}

function getSingleExportInfoForSymbol(symbol: Symbol, moduleSymbol: Symbol, program: Program, host: LanguageServiceHost): SymbolExportInfo {
    const compilerOptions = program.getCompilerOptions();
    const mainProgramInfo = getInfoWithChecker(program.getTypeChecker(), /*isFromPackageJson*/ false);
    if (mainProgramInfo) {
        return mainProgramInfo;
    }
    const autoImportProvider = host.getPackageJsonAutoImportProvider?.()?.getTypeChecker();
    return Debug.checkDefined(autoImportProvider && getInfoWithChecker(autoImportProvider, /*isFromPackageJson*/ true), `Could not find symbol in specified module for code actions`);

    function getInfoWithChecker(checker: TypeChecker, isFromPackageJson: boolean): SymbolExportInfo | undefined {
        const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
        if (defaultInfo && skipAlias(defaultInfo.symbol, checker) === symbol) {
            return { symbol: defaultInfo.symbol, moduleSymbol, moduleFileName: undefined, exportKind: defaultInfo.exportKind, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
        }
        const named = checker.tryGetMemberInModuleExportsAndProperties(symbol.name, moduleSymbol);
        if (named && skipAlias(named, checker) === symbol) {
            return { symbol: named, moduleSymbol, moduleFileName: undefined, exportKind: ExportKind.Named, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
        }
    }
}

function getImportFixes(
    exportInfos: readonly SymbolExportInfo[],
    useNamespaceInfo: {
        symbolName: string,
        position: number,
    } | undefined,
    /** undefined only for missing JSX namespace */
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    program: Program,
    sourceFile: SourceFile,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    importMap = createExistingImportMap(program.getTypeChecker(), sourceFile, program.getCompilerOptions()),
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number, fixes: readonly ImportFixWithModuleSpecifier[] } {
    const checker = program.getTypeChecker();
    const existingImports = flatMap(exportInfos, importMap.getImportsForExportInfo);
    const useNamespace = useNamespaceInfo && tryUseExistingNamespaceImport(existingImports, useNamespaceInfo.symbolName, useNamespaceInfo.position, checker);
    const addToExisting = tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, checker, program.getCompilerOptions());
    if (addToExisting) {
        // Don't bother providing an action to add a new import if we can add to an existing one.
        return {
            computedWithoutCacheCount: 0,
            fixes: [...(useNamespace ? [useNamespace] : emptyArray), addToExisting],
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
        fixes: [...(useNamespace ? [useNamespace] : emptyArray), ...fixes],
    };
}

function tryUseExistingNamespaceImport(existingImports: readonly FixAddToExistingImportInfo[], symbolName: string, position: number, checker: TypeChecker): FixUseNamespaceImport | undefined {
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
    return firstDefined(existingImports, ({ declaration }): FixUseNamespaceImport | undefined => {
        const namespacePrefix = getNamespaceLikeImportText(declaration);
        const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(declaration)?.text;
        if (namespacePrefix && moduleSpecifier) {
            const moduleSymbol = getTargetModuleFromNamespaceLikeImport(declaration, checker);
            if (moduleSymbol && moduleSymbol.exports!.has(escapeLeadingUnderscores(symbolName))) {
                return { kind: ImportFixKind.UseNamespace, namespacePrefix, position, moduleSpecifier };
            }
        }
    });
}

function getTargetModuleFromNamespaceLikeImport(declaration: AnyImportOrRequire, checker: TypeChecker) {
    switch (declaration.kind) {
        case SyntaxKind.VariableDeclaration:
            return checker.resolveExternalModuleName(declaration.initializer.arguments[0]);
        case SyntaxKind.ImportEqualsDeclaration:
            return checker.getAliasedSymbol(declaration.symbol);
        case SyntaxKind.ImportDeclaration:
            const namespaceImport = tryCast(declaration.importClause?.namedBindings, isNamespaceImport);
            return namespaceImport && checker.getAliasedSymbol(namespaceImport.symbol);
        default:
            return Debug.assertNever(declaration);
    }
}

function getNamespaceLikeImportText(declaration: AnyImportOrRequire) {
    switch (declaration.kind) {
        case SyntaxKind.VariableDeclaration:
            return tryCast(declaration.name, isIdentifier)?.text;
        case SyntaxKind.ImportEqualsDeclaration:
            return declaration.name.text;
        case SyntaxKind.ImportDeclaration:
            return tryCast(declaration.importClause?.namedBindings, isNamespaceImport)?.name.text;
        default:
            return Debug.assertNever(declaration);
    }
}

function getAddAsTypeOnly(
    isValidTypeOnlyUseSite: boolean,
    isForNewImportDeclaration: boolean,
    symbol: Symbol,
    targetFlags: SymbolFlags,
    checker: TypeChecker,
    compilerOptions: CompilerOptions
) {
    if (!isValidTypeOnlyUseSite) {
        // Can't use a type-only import if the usage is an emitting position
        return AddAsTypeOnly.NotAllowed;
    }
    if (isForNewImportDeclaration && compilerOptions.importsNotUsedAsValues === ImportsNotUsedAsValues.Error) {
        // Not writing a (top-level) type-only import here would create an error because the runtime dependency is unnecessary
        return AddAsTypeOnly.Required;
    }
    if (compilerOptions.isolatedModules && compilerOptions.preserveValueImports &&
        (!(targetFlags & SymbolFlags.Value) || !!checker.getTypeOnlyAliasDeclaration(symbol))
    ) {
        // A type-only import is required for this symbol if under these settings if the symbol will
        // be erased, which will happen if the target symbol is purely a type or if it was exported/imported
        // as type-only already somewhere between this import and the target.
        return AddAsTypeOnly.Required;
    }
    return AddAsTypeOnly.Allowed;
}

function tryAddToExistingImport(existingImports: readonly FixAddToExistingImportInfo[], isValidTypeOnlyUseSite: boolean, checker: TypeChecker, compilerOptions: CompilerOptions): FixAddToExistingImport | undefined {
    return firstDefined(existingImports, ({ declaration, importKind, symbol, targetFlags }): FixAddToExistingImport | undefined => {
        if (importKind === ImportKind.CommonJS || importKind === ImportKind.Namespace || declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
            // These kinds of imports are not combinable with anything
            return undefined;
        }

        if (declaration.kind === SyntaxKind.VariableDeclaration) {
            return (importKind === ImportKind.Named || importKind === ImportKind.Default) && declaration.name.kind === SyntaxKind.ObjectBindingPattern
                ? { kind: ImportFixKind.AddToExisting, importClauseOrBindingPattern: declaration.name, importKind, moduleSpecifier: declaration.initializer.arguments[0].text, addAsTypeOnly: AddAsTypeOnly.NotAllowed }
                : undefined;
        }

        const { importClause } = declaration;
        if (!importClause || !isStringLiteralLike(declaration.moduleSpecifier)) return undefined;
        const { name, namedBindings } = importClause;
        // A type-only import may not have both a default and named imports, so the only way a name can
        // be added to an existing type-only import is adding a named import to existing named bindings.
        if (importClause.isTypeOnly && !(importKind === ImportKind.Named && namedBindings)) return undefined;

        // N.B. we don't have to figure out whether to use the main program checker
        // or the AutoImportProvider checker because we're adding to an existing import; the existence of
        // the import guarantees the symbol came from the main program.
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ false, symbol, targetFlags, checker, compilerOptions);

        if (importKind === ImportKind.Default && (
            name ||                                                   // Cannot add a default import to a declaration that already has one
            addAsTypeOnly === AddAsTypeOnly.Required && namedBindings // Cannot add a default import as type-only if the import already has named bindings
        )) return undefined;
        if (
            importKind === ImportKind.Named &&
            namedBindings?.kind === SyntaxKind.NamespaceImport        // Cannot add a named import to a declaration that has a namespace import
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

function createExistingImportMap(checker: TypeChecker, importingFile: SourceFile, compilerOptions: CompilerOptions) {
    let importMap: MultiMap<SymbolId, AnyImportOrRequire> | undefined;
    for (const moduleSpecifier of importingFile.imports) {
        const i = importFromModuleSpecifier(moduleSpecifier);
        if (isVariableDeclarationInitializedToRequire(i.parent)) {
            const moduleSymbol = checker.resolveExternalModuleName(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i.parent);
            }
        }
        else if (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration) {
            const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i);
            }
        }
    }

    return {
        getImportsForExportInfo: ({ moduleSymbol, exportKind, targetFlags, symbol }: SymbolExportInfo): readonly FixAddToExistingImportInfo[] => {
            // Can't use an es6 import for a type in JS.
            if (!(targetFlags & SymbolFlags.Value) && isSourceFileJS(importingFile)) return emptyArray;
            const matchingDeclarations = importMap?.get(getSymbolId(moduleSymbol));
            if (!matchingDeclarations) return emptyArray;
            const importKind = getImportKind(importingFile, exportKind, compilerOptions);
            return matchingDeclarations.map(declaration => ({ declaration, importKind, symbol, targetFlags }));
        }
    };
}

function shouldUseRequire(sourceFile: SourceFile, program: Program): boolean {
    // 1. TypeScript files don't use require variable declarations
    if (!isSourceFileJS(sourceFile)) {
        return false;
    }

    // 2. If the current source file is unambiguously CJS or ESM, go with that
    if (sourceFile.commonJsModuleIndicator && !sourceFile.externalModuleIndicator) return true;
    if (sourceFile.externalModuleIndicator && !sourceFile.commonJsModuleIndicator) return false;

    // 3. If there's a tsconfig/jsconfig, use its module setting
    const compilerOptions = program.getCompilerOptions();
    if (compilerOptions.configFile) {
        return getEmitModuleKind(compilerOptions) < ModuleKind.ES2015;
    }

    // 4. Match the first other JS file in the program that's unambiguously CJS or ESM
    for (const otherFile of program.getSourceFiles()) {
        if (otherFile === sourceFile || !isSourceFileJS(otherFile) || program.isSourceFileFromExternalLibrary(otherFile)) continue;
        if (otherFile.commonJsModuleIndicator && !otherFile.externalModuleIndicator) return true;
        if (otherFile.externalModuleIndicator && !otherFile.commonJsModuleIndicator) return false;
    }

    // 5. Literally nothing to go on
    return true;
}

function createGetChecker(program: Program, host: LanguageServiceHost) {
    return memoizeOne((isFromPackageJson: boolean) => isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker());
}

function getNewImportFixes(
    program: Program,
    sourceFile: SourceFile,
    position: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    exportInfo: readonly SymbolExportInfo[],
    host: LanguageServiceHost,
    preferences: UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number, fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[] } {
    const isJs = isSourceFileJS(sourceFile);
    const compilerOptions = program.getCompilerOptions();
    const moduleSpecifierResolutionHost = createModuleSpecifierResolutionHost(program, host);
    const getChecker = createGetChecker(program, host);
    const rejectNodeModulesRelativePaths = moduleResolutionUsesNodeModules(getEmitModuleResolutionKind(compilerOptions));
    const getModuleSpecifiers = fromCacheOnly
        ? (moduleSymbol: Symbol) => ({ moduleSpecifiers: moduleSpecifiers.tryGetModuleSpecifiersFromCache(moduleSymbol, sourceFile, moduleSpecifierResolutionHost, preferences), computedWithoutCache: false })
        : (moduleSymbol: Symbol, checker: TypeChecker) => moduleSpecifiers.getModuleSpecifiersWithCacheInfo(moduleSymbol, checker, compilerOptions, sourceFile, moduleSpecifierResolutionHost, preferences);

    let computedWithoutCacheCount = 0;
    const fixes = flatMap(exportInfo, (exportInfo, i) => {
        const checker = getChecker(exportInfo.isFromPackageJson);
        const { computedWithoutCache, moduleSpecifiers } = getModuleSpecifiers(exportInfo.moduleSymbol, checker);
        const importedSymbolHasValueMeaning = !!(exportInfo.targetFlags & SymbolFlags.Value);
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ true, exportInfo.symbol, exportInfo.targetFlags, checker, compilerOptions);
        computedWithoutCacheCount += computedWithoutCache ? 1 : 0;
        return mapDefined(moduleSpecifiers, (moduleSpecifier): FixAddNewImport | FixAddJsdocTypeImport | undefined =>
            rejectNodeModulesRelativePaths && pathContainsNodeModules(moduleSpecifier) ? undefined :
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
    exportInfos: readonly SymbolExportInfo[],
    existingImports: readonly FixAddToExistingImportInfo[],
    program: Program,
    sourceFile: SourceFile,
    position: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount?: number, fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[] } {
    const existingDeclaration = firstDefined(existingImports, info => newImportInfoFromExistingSpecifier(info, isValidTypeOnlyUseSite, useRequire, program.getTypeChecker(), program.getCompilerOptions()));
    return existingDeclaration ? { fixes: [existingDeclaration] } : getNewImportFixes(program, sourceFile, position, isValidTypeOnlyUseSite, useRequire, exportInfos, host, preferences, fromCacheOnly);
}

function newImportInfoFromExistingSpecifier(
    { declaration, importKind, symbol, targetFlags }: FixAddToExistingImportInfo,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    checker: TypeChecker,
    compilerOptions: CompilerOptions
): FixAddNewImport | undefined {
    const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(declaration)?.text;
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
function getFixInfos(context: CodeFixContextBase, errorCode: number, pos: number, useAutoImportProvider: boolean): readonly FixInfo[] | undefined {
    const symbolToken = getTokenAtPosition(context.sourceFile, pos);
    let info;
    if (errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code) {
        info = getFixesInfoForUMDImport(context, symbolToken);
    }
    else if (!isIdentifier(symbolToken)) {
        return undefined;
    }
    else if (errorCode === Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code) {
        const symbolName = single(getSymbolNamesToImport(context.sourceFile, context.program.getTypeChecker(), symbolToken, context.program.getCompilerOptions()));
        const fix = getTypeOnlyPromotionFix(context.sourceFile, symbolToken, symbolName, context.program);
        return fix && [{ fix, symbolName, errorIdentifierText: symbolToken.text }];
    }
    else {
        info = getFixesInfoForNonUMDImport(context, symbolToken, useAutoImportProvider);
    }

    const packageJsonImportFilter = createPackageJsonImportFilter(context.sourceFile, context.preferences, context.host);
    return info && sortFixInfo(info, context.sourceFile, context.program, packageJsonImportFilter, context.host);
}

function sortFixInfo(fixes: readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[], sourceFile: SourceFile, program: Program, packageJsonImportFilter: PackageJsonImportFilter, host: LanguageServiceHost): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[] {
    const _toPath = (fileName: string) => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host));
    return sort(fixes, (a, b) =>
        compareBooleans(!!a.isJsxNamespaceFix, !!b.isJsxNamespaceFix) ||
        compareValues(a.fix.kind, b.fix.kind) ||
        compareModuleSpecifiers(a.fix, b.fix, sourceFile, program, packageJsonImportFilter.allowsImportingSpecifier, _toPath));
}

function getBestFix(fixes: readonly ImportFixWithModuleSpecifier[], sourceFile: SourceFile, program: Program, packageJsonImportFilter: PackageJsonImportFilter, host: LanguageServiceHost): ImportFixWithModuleSpecifier | undefined {
    if (!some(fixes)) return;
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
            fileName => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host)),
        ) === Comparison.LessThan ? fix : best
    );
}

/** @returns `Comparison.LessThan` if `a` is better than `b`. */
function compareModuleSpecifiers(
    a: ImportFixWithModuleSpecifier,
    b: ImportFixWithModuleSpecifier,
    importingFile: SourceFile,
    program: Program,
    allowsImportingSpecifier: (specifier: string) => boolean,
    toPath: (fileName: string) => Path,
): Comparison {
    if (a.kind !== ImportFixKind.UseNamespace && b.kind !== ImportFixKind.UseNamespace) {
        return compareBooleans(allowsImportingSpecifier(b.moduleSpecifier), allowsImportingSpecifier(a.moduleSpecifier))
            || compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program)
            || compareBooleans(
                isFixPossiblyReExportingImportingFile(a, importingFile, program.getCompilerOptions(), toPath),
                isFixPossiblyReExportingImportingFile(b, importingFile, program.getCompilerOptions(), toPath))
            || compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier);
    }
    return Comparison.EqualTo;
}

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index" (we don't even try to consider
// this if we're in a resolution mode where you can't drop trailing "/index" from paths).
function isFixPossiblyReExportingImportingFile(fix: ImportFixWithModuleSpecifier, importingFile: SourceFile, compilerOptions: CompilerOptions, toPath: (fileName: string) => Path): boolean {
    if (fix.isReExport &&
        fix.exportInfo?.moduleFileName &&
        getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs &&
        isIndexFileName(fix.exportInfo.moduleFileName)
    ) {
        const reExportDir = toPath(getDirectoryPath(fix.exportInfo.moduleFileName));
        return startsWith((importingFile.path), reExportDir);
    }
    return false;
}

function isIndexFileName(fileName: string) {
    return getBaseFileName(fileName, [".js", ".jsx", ".d.ts", ".ts", ".tsx"], /*ignoreCase*/ true) === "index";
}

function compareNodeCoreModuleSpecifiers(a: string, b: string, importingFile: SourceFile, program: Program): Comparison {
    if (startsWith(a, "node:") && !startsWith(b, "node:")) return shouldUseUriStyleNodeCoreModules(importingFile, program) ? Comparison.LessThan : Comparison.GreaterThan;
    if (startsWith(b, "node:") && !startsWith(a, "node:")) return shouldUseUriStyleNodeCoreModules(importingFile, program) ? Comparison.GreaterThan : Comparison.LessThan;
    return Comparison.EqualTo;
}

function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }: CodeFixContextBase, token: Node): (FixInfo & { fix: ImportFixWithModuleSpecifier })[] | undefined {
    const checker = program.getTypeChecker();
    const umdSymbol = getUmdSymbol(token, checker);
    if (!umdSymbol) return undefined;
    const symbol = checker.getAliasedSymbol(umdSymbol);
    const symbolName = umdSymbol.name;
    const exportInfo: readonly SymbolExportInfo[] = [{ symbol: umdSymbol, moduleSymbol: symbol, moduleFileName: undefined, exportKind: ExportKind.UMD, targetFlags: symbol.flags, isFromPackageJson: false }];
    const useRequire = shouldUseRequire(sourceFile, program);
    const position = isIdentifier(token) ? token.getStart(sourceFile) : undefined;
    const fixes = getImportFixes(exportInfo, position ? { position, symbolName } : undefined, /*isValidTypeOnlyUseSite*/ false, useRequire, program, sourceFile, host, preferences).fixes;
    return fixes.map(fix => ({ fix, symbolName, errorIdentifierText: tryCast(token, isIdentifier)?.text }));
}
function getUmdSymbol(token: Node, checker: TypeChecker): Symbol | undefined {
    // try the identifier to see if it is the umd symbol
    const umdSymbol = isIdentifier(token) ? checker.getSymbolAtLocation(token) : undefined;
    if (isUMDExportSymbol(umdSymbol)) return umdSymbol;

    // The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
    const { parent } = token;
    return (isJsxOpeningLikeElement(parent) && parent.tagName === token) || isJsxOpeningFragment(parent)
        ? tryCast(checker.resolveName(checker.getJsxNamespace(parent), isJsxOpeningLikeElement(parent) ? token : parent, SymbolFlags.Value, /*excludeGlobals*/ false), isUMDExportSymbol)
        : undefined;
}

/**
 * @param forceImportKeyword Indicates that the user has already typed `import`, so the result must start with `import`.
 * (In other words, do not allow `const x = require("...")` for JS files.)
 *
 * @internal
 */
export function getImportKind(importingFile: SourceFile, exportKind: ExportKind, compilerOptions: CompilerOptions, forceImportKeyword?: boolean): ImportKind {
    switch (exportKind) {
        case ExportKind.Named: return ImportKind.Named;
        case ExportKind.Default: return ImportKind.Default;
        case ExportKind.ExportEquals: return getExportEqualsImportKind(importingFile, compilerOptions, !!forceImportKeyword);
        case ExportKind.UMD: return getUmdImportKind(importingFile, compilerOptions, !!forceImportKeyword);
        default: return Debug.assertNever(exportKind);
    }
}

function getUmdImportKind(importingFile: SourceFile, compilerOptions: CompilerOptions, forceImportKeyword: boolean): ImportKind {
    // Import a synthetic `default` if enabled.
    if (getAllowSyntheticDefaultImports(compilerOptions)) {
        return ImportKind.Default;
    }

    // When a synthetic `default` is unavailable, use `import..require` if the module kind supports it.
    const moduleKind = getEmitModuleKind(compilerOptions);
    switch (moduleKind) {
        case ModuleKind.AMD:
        case ModuleKind.CommonJS:
        case ModuleKind.UMD:
            if (isInJSFile(importingFile)) {
                return isExternalModule(importingFile) || forceImportKeyword ? ImportKind.Namespace : ImportKind.CommonJS;
            }
            return ImportKind.CommonJS;
        case ModuleKind.System:
        case ModuleKind.ES2015:
        case ModuleKind.ES2020:
        case ModuleKind.ES2022:
        case ModuleKind.ESNext:
        case ModuleKind.None:
            // Fall back to the `import * as ns` style import.
            return ImportKind.Namespace;
        case ModuleKind.Node16:
        case ModuleKind.NodeNext:
            return importingFile.impliedNodeFormat === ModuleKind.ESNext ? ImportKind.Namespace : ImportKind.CommonJS;
        default:
            return Debug.assertNever(moduleKind, `Unexpected moduleKind ${moduleKind}`);
    }
}

function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier })[] | undefined {
    const checker = program.getTypeChecker();
    const compilerOptions = program.getCompilerOptions();
    return flatMap(getSymbolNamesToImport(sourceFile, checker, symbolToken, compilerOptions), symbolName => {
        // "default" is a keyword and not a legal identifier for the import, but appears as an identifier.
        if (symbolName === InternalSymbolName.Default) {
            return undefined;
        }
        const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(symbolToken);
        const useRequire = shouldUseRequire(sourceFile, program);
        const exportInfo = getExportInfos(symbolName, isJSXTagName(symbolToken), getMeaningFromLocation(symbolToken), cancellationToken, sourceFile, program, useAutoImportProvider, host, preferences);
        const fixes = arrayFrom(flatMapIterator(exportInfo.entries(), ([_, exportInfos]) =>
            getImportFixes(exportInfos, { symbolName, position: symbolToken.getStart(sourceFile) }, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes));
        return fixes.map(fix => ({ fix, symbolName, errorIdentifierText: symbolToken.text, isJsxNamespaceFix: symbolName !== symbolToken.text }));
    });
}

function getTypeOnlyPromotionFix(sourceFile: SourceFile, symbolToken: Identifier, symbolName: string, program: Program): FixPromoteTypeOnlyImport | undefined {
    const checker = program.getTypeChecker();
    const symbol = checker.resolveName(symbolName, symbolToken, SymbolFlags.Value, /*excludeGlobals*/ true);
    if (!symbol) return undefined;

    const typeOnlyAliasDeclaration = checker.getTypeOnlyAliasDeclaration(symbol);
    if (!typeOnlyAliasDeclaration || getSourceFileOfNode(typeOnlyAliasDeclaration) !== sourceFile) return undefined;

    return { kind: ImportFixKind.PromoteTypeOnly, typeOnlyAliasDeclaration };
}

function getSymbolNamesToImport(sourceFile: SourceFile, checker: TypeChecker, symbolToken: Identifier, compilerOptions: CompilerOptions): string[] {
    const parent = symbolToken.parent;
    if ((isJsxOpeningLikeElement(parent) || isJsxClosingElement(parent)) && parent.tagName === symbolToken && jsxModeNeedsExplicitImport(compilerOptions.jsx)) {
        const jsxNamespace = checker.getJsxNamespace(sourceFile);
        if (needsJsxNamespaceFix(jsxNamespace, symbolToken, checker)) {
            const needsComponentNameFix = !isIntrinsicJsxName(symbolToken.text) && !checker.resolveName(symbolToken.text, symbolToken, SymbolFlags.Value, /*excludeGlobals*/ false);
            return needsComponentNameFix ? [symbolToken.text, jsxNamespace] : [jsxNamespace];
        }
    }
    return [symbolToken.text];
}

function needsJsxNamespaceFix(jsxNamespace: string, symbolToken: Identifier, checker: TypeChecker) {
    if (isIntrinsicJsxName(symbolToken.text)) return true; // If we were triggered by a matching error code on an intrinsic, the error must have been about missing the JSX factory
    const namespaceSymbol = checker.resolveName(jsxNamespace, symbolToken, SymbolFlags.Value, /*excludeGlobals*/ true);
    return !namespaceSymbol || some(namespaceSymbol.declarations, isTypeOnlyImportOrExportDeclaration) && !(namespaceSymbol.flags & SymbolFlags.Value);
}

// Returns a map from an exported symbol's ID to a list of every way it's (re-)exported.
function getExportInfos(
    symbolName: string,
    isJsxTagName: boolean,
    currentTokenMeaning: SemanticMeaning,
    cancellationToken: CancellationToken,
    fromFile: SourceFile,
    program: Program,
    useAutoImportProvider: boolean,
    host: LanguageServiceHost,
    preferences: UserPreferences,
): ReadonlyMap<string, readonly SymbolExportInfo[]> {
    // For each original symbol, keep all re-exports of that symbol together so we can call `getCodeActionsForImport` on the whole group at once.
    // Maps symbol id to info for modules providing that symbol (original export + re-exports).
    const originalSymbolToExportInfos = createMultiMap<SymbolExportInfo>();
    const packageJsonFilter = createPackageJsonImportFilter(fromFile, preferences, host);
    const moduleSpecifierCache = host.getModuleSpecifierCache?.();
    const getModuleSpecifierResolutionHost = memoizeOne((isFromPackageJson: boolean) => {
        return createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider!()! : program, host);
    });
    function addSymbol(moduleSymbol: Symbol, toFile: SourceFile | undefined, exportedSymbol: Symbol, exportKind: ExportKind, program: Program, isFromPackageJson: boolean): void {
        const moduleSpecifierResolutionHost = getModuleSpecifierResolutionHost(isFromPackageJson);
        if (toFile && isImportableFile(program, fromFile, toFile, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) ||
            !toFile && packageJsonFilter.allowsImportingAmbientModule(moduleSymbol, moduleSpecifierResolutionHost)
        ) {
            const checker = program.getTypeChecker();
            originalSymbolToExportInfos.add(getUniqueSymbolId(exportedSymbol, checker).toString(), { symbol: exportedSymbol, moduleSymbol, moduleFileName: toFile?.fileName, exportKind, targetFlags: skipAlias(exportedSymbol, checker).flags, isFromPackageJson });
        }
    }
    forEachExternalModuleToImportFrom(program, host, preferences, useAutoImportProvider, (moduleSymbol, sourceFile, program, isFromPackageJson) => {
        const checker = program.getTypeChecker();
        cancellationToken.throwIfCancellationRequested();

        const compilerOptions = program.getCompilerOptions();
        const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
        if (defaultInfo && (defaultInfo.name === symbolName || moduleSymbolToValidIdentifier(moduleSymbol, getEmitScriptTarget(compilerOptions), isJsxTagName) === symbolName) && symbolHasMeaning(defaultInfo.symbolForMeaning, currentTokenMeaning)) {
            addSymbol(moduleSymbol, sourceFile, defaultInfo.symbol, defaultInfo.exportKind, program, isFromPackageJson);
        }

        // check exports with the same name
        const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
        if (exportSymbolWithIdenticalName && symbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
            addSymbol(moduleSymbol, sourceFile, exportSymbolWithIdenticalName, ExportKind.Named, program, isFromPackageJson);
        }
    });
    return originalSymbolToExportInfos;
}

function getExportEqualsImportKind(importingFile: SourceFile, compilerOptions: CompilerOptions, forceImportKeyword: boolean): ImportKind {
    const allowSyntheticDefaults = getAllowSyntheticDefaultImports(compilerOptions);
    const isJS = isInJSFile(importingFile);
    // 1. 'import =' will not work in es2015+ TS files, so the decision is between a default
    //    and a namespace import, based on allowSyntheticDefaultImports/esModuleInterop.
    if (!isJS && getEmitModuleKind(compilerOptions) >= ModuleKind.ES2015) {
        return allowSyntheticDefaults ? ImportKind.Default : ImportKind.Namespace;
    }
    // 2. 'import =' will not work in JavaScript, so the decision is between a default import,
    //    a namespace import, and const/require.
    if (isJS) {
        return isExternalModule(importingFile) || forceImportKeyword
            ? allowSyntheticDefaults ? ImportKind.Default : ImportKind.Namespace
            : ImportKind.CommonJS;
    }
    // 3. At this point the most correct choice is probably 'import =', but people
    //    really hate that, so look to see if the importing file has any precedent
    //    on how to handle it.
    for (const statement of importingFile.statements) {
        // `import foo` parses as an ImportEqualsDeclaration even though it could be an ImportDeclaration
        if (isImportEqualsDeclaration(statement) && !nodeIsMissing(statement.moduleReference)) {
            return ImportKind.CommonJS;
        }
    }
    // 4. We have no precedent to go on, so just use a default import if
    //    allowSyntheticDefaultImports/esModuleInterop is enabled.
    return allowSyntheticDefaults ? ImportKind.Default : ImportKind.CommonJS;
}

function codeActionForFix(context: textChanges.TextChangesContext, sourceFile: SourceFile, symbolName: string, fix: ImportFix, includeSymbolNameInDescription: boolean, quotePreference: QuotePreference, compilerOptions: CompilerOptions): CodeFixAction {
    let diag!: DiagnosticAndArguments;
    const changes = textChanges.ChangeTracker.with(context, tracker => {
        diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, includeSymbolNameInDescription, quotePreference, compilerOptions);
    });
    return createCodeFixAction(importFixName, changes, diag, importFixId, Diagnostics.Add_all_missing_imports);
}
function codeActionForFixWorker(changes: textChanges.ChangeTracker, sourceFile: SourceFile, symbolName: string, fix: ImportFix, includeSymbolNameInDescription: boolean, quotePreference: QuotePreference, compilerOptions: CompilerOptions): DiagnosticAndArguments {
    switch (fix.kind) {
        case ImportFixKind.UseNamespace:
            addNamespaceQualifier(changes, sourceFile, fix);
            return [Diagnostics.Change_0_to_1, symbolName, `${fix.namespacePrefix}.${symbolName}`];
        case ImportFixKind.JsdocTypeImport:
            addImportType(changes, sourceFile, fix, quotePreference);
            return [Diagnostics.Change_0_to_1, symbolName, getImportTypePrefix(fix.moduleSpecifier, quotePreference) + symbolName];
        case ImportFixKind.AddToExisting: {
            const { importClauseOrBindingPattern, importKind, addAsTypeOnly, moduleSpecifier } = fix;
            doAddExistingFix(
                changes,
                sourceFile,
                importClauseOrBindingPattern,
                importKind === ImportKind.Default ? { name: symbolName, addAsTypeOnly } : undefined,
                importKind === ImportKind.Named ? [{ name: symbolName, addAsTypeOnly }] : emptyArray,
                compilerOptions);
            const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
            return includeSymbolNameInDescription
                ? [Diagnostics.Import_0_from_1, symbolName, moduleSpecifierWithoutQuotes]
                : [Diagnostics.Update_import_from_0, moduleSpecifierWithoutQuotes];
        }
        case ImportFixKind.AddNew: {
            const { importKind, moduleSpecifier, addAsTypeOnly, useRequire } = fix;
            const getDeclarations = useRequire ? getNewRequires : getNewImports;
            const defaultImport: Import | undefined = importKind === ImportKind.Default ? { name: symbolName, addAsTypeOnly } : undefined;
            const namedImports: Import[] | undefined = importKind === ImportKind.Named ? [{ name: symbolName, addAsTypeOnly }] : undefined;
            const namespaceLikeImport = importKind === ImportKind.Namespace || importKind === ImportKind.CommonJS ? { importKind, name: symbolName, addAsTypeOnly } : undefined;
            insertImports(changes, sourceFile, getDeclarations(moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport), /*blankLineBetween*/ true);
            return includeSymbolNameInDescription
                ? [Diagnostics.Import_0_from_1, symbolName, moduleSpecifier]
                : [Diagnostics.Add_import_from_0, moduleSpecifier];
        }
        case ImportFixKind.PromoteTypeOnly: {
            const { typeOnlyAliasDeclaration } = fix;
            const promotedDeclaration = promoteFromTypeOnly(changes, typeOnlyAliasDeclaration, compilerOptions, sourceFile);
            return promotedDeclaration.kind === SyntaxKind.ImportSpecifier
                ? [Diagnostics.Remove_type_from_import_of_0_from_1, symbolName, getModuleSpecifierText(promotedDeclaration.parent.parent)]
                : [Diagnostics.Remove_type_from_import_declaration_from_0, getModuleSpecifierText(promotedDeclaration)];
        }
        default:
            return Debug.assertNever(fix, `Unexpected fix kind ${(fix as ImportFix).kind}`);
    }
}

function getModuleSpecifierText(promotedDeclaration: ImportClause | ImportEqualsDeclaration): string {
    return promotedDeclaration.kind === SyntaxKind.ImportEqualsDeclaration
        ? tryCast(tryCast(promotedDeclaration.moduleReference, isExternalModuleReference)?.expression, isStringLiteralLike)?.text || promotedDeclaration.moduleReference.getText()
        : cast(promotedDeclaration.parent.moduleSpecifier, isStringLiteral).text;
}

function promoteFromTypeOnly(changes: textChanges.ChangeTracker, aliasDeclaration: TypeOnlyAliasDeclaration, compilerOptions: CompilerOptions, sourceFile: SourceFile) {
    // See comment in `doAddExistingFix` on constant with the same name.
    const convertExistingToTypeOnly = compilerOptions.preserveValueImports && compilerOptions.isolatedModules;
    switch (aliasDeclaration.kind) {
        case SyntaxKind.ImportSpecifier:
            if (aliasDeclaration.isTypeOnly) {
                if (aliasDeclaration.parent.elements.length > 1 && OrganizeImports.importSpecifiersAreSorted(aliasDeclaration.parent.elements)) {
                    changes.delete(sourceFile, aliasDeclaration);
                    const newSpecifier = factory.updateImportSpecifier(aliasDeclaration, /*isTypeOnly*/ false, aliasDeclaration.propertyName, aliasDeclaration.name);
                    const insertionIndex = OrganizeImports.getImportSpecifierInsertionIndex(aliasDeclaration.parent.elements, newSpecifier);
                    changes.insertImportSpecifierAtIndex(sourceFile, newSpecifier, aliasDeclaration.parent, insertionIndex);
                }
                else {
                    changes.deleteRange(sourceFile, aliasDeclaration.getFirstToken()!);
                }
                return aliasDeclaration;
            }
            else {
                Debug.assert(aliasDeclaration.parent.parent.isTypeOnly);
                promoteImportClause(aliasDeclaration.parent.parent);
                return aliasDeclaration.parent.parent;
            }
        case SyntaxKind.ImportClause:
            promoteImportClause(aliasDeclaration);
            return aliasDeclaration;
        case SyntaxKind.NamespaceImport:
            promoteImportClause(aliasDeclaration.parent);
            return aliasDeclaration.parent;
        case SyntaxKind.ImportEqualsDeclaration:
            changes.deleteRange(sourceFile, aliasDeclaration.getChildAt(1));
            return aliasDeclaration;
        default:
            Debug.failBadSyntaxKind(aliasDeclaration);
    }

    function promoteImportClause(importClause: ImportClause) {
        changes.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(importClause, sourceFile));
        if (convertExistingToTypeOnly) {
            const namedImports = tryCast(importClause.namedBindings, isNamedImports);
            if (namedImports && namedImports.elements.length > 1) {
                if (OrganizeImports.importSpecifiersAreSorted(namedImports.elements) &&
                    aliasDeclaration.kind === SyntaxKind.ImportSpecifier &&
                    namedImports.elements.indexOf(aliasDeclaration) !== 0
                ) {
                    // The import specifier being promoted will be the only non-type-only,
                    //  import in the NamedImports, so it should be moved to the front.
                    changes.delete(sourceFile, aliasDeclaration);
                    changes.insertImportSpecifierAtIndex(sourceFile, aliasDeclaration, namedImports, 0);
                }
                for (const element of namedImports.elements) {
                    if (element !== aliasDeclaration && !element.isTypeOnly) {
                        changes.insertModifierBefore(sourceFile, SyntaxKind.TypeKeyword, element);
                    }
                }
            }
        }
    }
}

function doAddExistingFix(
    changes: textChanges.ChangeTracker,
    sourceFile: SourceFile,
    clause: ImportClause | ObjectBindingPattern,
    defaultImport: Import | undefined,
    namedImports: readonly Import[],
    compilerOptions: CompilerOptions,
): void {
    if (clause.kind === SyntaxKind.ObjectBindingPattern) {
        if (defaultImport) {
            addElementToBindingPattern(clause, defaultImport.name, "default");
        }
        for (const specifier of namedImports) {
            addElementToBindingPattern(clause, specifier.name, /*propertyName*/ undefined);
        }
        return;
    }

    const promoteFromTypeOnly = clause.isTypeOnly && some([defaultImport, ...namedImports], i => i?.addAsTypeOnly === AddAsTypeOnly.NotAllowed);
    const existingSpecifiers = clause.namedBindings && tryCast(clause.namedBindings, isNamedImports)?.elements;
    // If we are promoting from a type-only import and `--isolatedModules` and `--preserveValueImports`
    // are enabled, we need to make every existing import specifier type-only. It may be possible that
    // some of them don't strictly need to be marked type-only (if they have a value meaning and are
    // never used in an emitting position). These are allowed to be imported without being type-only,
    // but the user has clearly already signified that they don't need them to be present at runtime
    // by placing them in a type-only import. So, just mark each specifier as type-only.
    const convertExistingToTypeOnly = promoteFromTypeOnly && compilerOptions.preserveValueImports && compilerOptions.isolatedModules;

    if (defaultImport) {
        Debug.assert(!clause.name, "Cannot add a default import to an import clause that already has one");
        changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), factory.createIdentifier(defaultImport.name), { suffix: ", " });
    }

    if (namedImports.length) {
        const newSpecifiers = stableSort(
            namedImports.map(namedImport => factory.createImportSpecifier(
                (!clause.isTypeOnly || promoteFromTypeOnly) && needsTypeOnly(namedImport),
                /*propertyName*/ undefined,
                factory.createIdentifier(namedImport.name))),
            OrganizeImports.compareImportOrExportSpecifiers);

        if (existingSpecifiers?.length && OrganizeImports.importSpecifiersAreSorted(existingSpecifiers)) {
            for (const spec of newSpecifiers) {
                // Organize imports puts type-only import specifiers last, so if we're
                // adding a non-type-only specifier and converting all the other ones to
                // type-only, there's no need to ask for the insertion index - it's 0.
                const insertionIndex = convertExistingToTypeOnly && !spec.isTypeOnly
                    ? 0
                    : OrganizeImports.getImportSpecifierInsertionIndex(existingSpecifiers, spec);
                changes.insertImportSpecifierAtIndex(sourceFile, spec, clause.namedBindings as NamedImports, insertionIndex);
            }
        }
        else if (existingSpecifiers?.length) {
            for (const spec of newSpecifiers) {
                changes.insertNodeInListAfter(sourceFile, last(existingSpecifiers), spec, existingSpecifiers);
            }
        }
        else {
            if (newSpecifiers.length) {
                const namedImports = factory.createNamedImports(newSpecifiers);
                if (clause.namedBindings) {
                    changes.replaceNode(sourceFile, clause.namedBindings, namedImports);
                }
                else {
                    changes.insertNodeAfter(sourceFile, Debug.checkDefined(clause.name, "Import clause must have either named imports or a default import"), namedImports);
                }
            }
        }
    }

    if (promoteFromTypeOnly) {
        changes.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(clause, sourceFile));
        if (convertExistingToTypeOnly && existingSpecifiers) {
            for (const specifier of existingSpecifiers) {
                changes.insertModifierBefore(sourceFile, SyntaxKind.TypeKeyword, specifier);
            }
        }
    }

    function addElementToBindingPattern(bindingPattern: ObjectBindingPattern, name: string, propertyName: string | undefined) {
        const element = factory.createBindingElement(/*dotDotDotToken*/ undefined, propertyName, name);
        if (bindingPattern.elements.length) {
            changes.insertNodeInListAfter(sourceFile, last(bindingPattern.elements), element);
        }
        else {
            changes.replaceNode(sourceFile, bindingPattern, factory.createObjectBindingPattern([element]));
        }
    }
}

function addNamespaceQualifier(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { namespacePrefix, position }: FixUseNamespaceImport): void {
    changes.insertText(sourceFile, position, namespacePrefix + ".");
}

function addImportType(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { moduleSpecifier, position }: FixAddJsdocTypeImport, quotePreference: QuotePreference): void {
    changes.insertText(sourceFile, position, getImportTypePrefix(moduleSpecifier, quotePreference));
}

function getImportTypePrefix(moduleSpecifier: string, quotePreference: QuotePreference): string {
    const quote = getQuoteFromPreference(quotePreference);
    return `import(${quote}${moduleSpecifier}${quote}).`;
}

interface Import {
    readonly name: string;
    readonly addAsTypeOnly: AddAsTypeOnly;
}

interface ImportsCollection {
    readonly defaultImport?: Import;
    readonly namedImports?: Map<string, AddAsTypeOnly>;
    readonly namespaceLikeImport?: {
        readonly importKind: ImportKind.CommonJS | ImportKind.Namespace;
        readonly name: string;
        readonly addAsTypeOnly: AddAsTypeOnly;
    };
}

function needsTypeOnly({ addAsTypeOnly }: { addAsTypeOnly: AddAsTypeOnly }): boolean {
    return addAsTypeOnly === AddAsTypeOnly.Required;
}

function getNewImports(
    moduleSpecifier: string,
    quotePreference: QuotePreference,
    defaultImport: Import | undefined,
    namedImports: readonly Import[] | undefined,
    namespaceLikeImport: Import & { importKind: ImportKind.CommonJS | ImportKind.Namespace } | undefined
): AnyImportSyntax | readonly AnyImportSyntax[] {
    const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
    let statements: AnyImportSyntax | readonly AnyImportSyntax[] | undefined;
    if (defaultImport !== undefined || namedImports?.length) {
        const topLevelTypeOnly = (!defaultImport || needsTypeOnly(defaultImport)) && every(namedImports, needsTypeOnly);
        statements = combine(statements, makeImport(
            defaultImport && factory.createIdentifier(defaultImport.name),
            namedImports?.map(({ addAsTypeOnly, name }) => factory.createImportSpecifier(
                !topLevelTypeOnly && addAsTypeOnly === AddAsTypeOnly.Required,
                /*propertyName*/ undefined,
                factory.createIdentifier(name))),
            moduleSpecifier,
            quotePreference,
            topLevelTypeOnly));
    }

    if (namespaceLikeImport) {
        const declaration = namespaceLikeImport.importKind === ImportKind.CommonJS
            ? factory.createImportEqualsDeclaration(
                /*modifiers*/ undefined,
                needsTypeOnly(namespaceLikeImport),
                factory.createIdentifier(namespaceLikeImport.name),
                factory.createExternalModuleReference(quotedModuleSpecifier))
            : factory.createImportDeclaration(
                /*modifiers*/ undefined,
                factory.createImportClause(
                    needsTypeOnly(namespaceLikeImport),
                    /*name*/ undefined,
                    factory.createNamespaceImport(factory.createIdentifier(namespaceLikeImport.name))),
                quotedModuleSpecifier,
                /*assertClause*/ undefined);
        statements = combine(statements, declaration);
    }
    return Debug.checkDefined(statements);
}

function getNewRequires(moduleSpecifier: string, quotePreference: QuotePreference, defaultImport: Import | undefined, namedImports: readonly Import[] | undefined, namespaceLikeImport: Import | undefined): RequireVariableStatement | readonly RequireVariableStatement[] {
    const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
    let statements: RequireVariableStatement | readonly RequireVariableStatement[] | undefined;
    // const { default: foo, bar, etc } = require('./mod');
    if (defaultImport || namedImports?.length) {
        const bindingElements = namedImports?.map(({ name }) => factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, name)) || [];
        if (defaultImport) {
            bindingElements.unshift(factory.createBindingElement(/*dotDotDotToken*/ undefined, "default", defaultImport.name));
        }
        const declaration = createConstEqualsRequireDeclaration(factory.createObjectBindingPattern(bindingElements), quotedModuleSpecifier);
        statements = combine(statements, declaration);
    }
    // const foo = require('./mod');
    if (namespaceLikeImport) {
        const declaration = createConstEqualsRequireDeclaration(namespaceLikeImport.name, quotedModuleSpecifier);
        statements = combine(statements, declaration);
    }
    return Debug.checkDefined(statements);
}

function createConstEqualsRequireDeclaration(name: string | ObjectBindingPattern, quotedModuleSpecifier: StringLiteral): RequireVariableStatement {
    return factory.createVariableStatement(
        /*modifiers*/ undefined,
        factory.createVariableDeclarationList([
            factory.createVariableDeclaration(
                typeof name === "string" ? factory.createIdentifier(name) : name,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, [quotedModuleSpecifier]))],
            NodeFlags.Const)) as RequireVariableStatement;
}

function symbolHasMeaning({ declarations }: Symbol, meaning: SemanticMeaning): boolean {
    return some(declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning));
}

/** @internal */
export function moduleSymbolToValidIdentifier(moduleSymbol: Symbol, target: ScriptTarget | undefined, forceCapitalize: boolean): string {
    return moduleSpecifierToValidIdentifier(removeFileExtension(stripQuotes(moduleSymbol.name)), target, forceCapitalize);
}

/** @internal */
export function moduleSpecifierToValidIdentifier(moduleSpecifier: string, target: ScriptTarget | undefined, forceCapitalize?: boolean): string {
    const baseName = getBaseFileName(removeSuffix(moduleSpecifier, "/index"));
    let res = "";
    let lastCharWasValid = true;
    const firstCharCode = baseName.charCodeAt(0);
    if (isIdentifierStart(firstCharCode, target)) {
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
        const isValid = isIdentifierPart(ch, target);
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
    return !isStringANonContextualKeyword(res) ? res || "_" : `_${res}`;
}

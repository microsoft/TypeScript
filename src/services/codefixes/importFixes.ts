import {
    createCodeFixAction,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    AnyImportOrRequire,
    AnyImportOrRequireStatement,
    AnyImportSyntax,
    arrayFrom,
    BindingElement,
    CancellationToken,
    cast,
    changeAnyExtension,
    CodeAction,
    CodeFixAction,
    CodeFixContextBase,
    combine,
    compareBooleans,
    compareNumberOfDirectorySeparators,
    compareValues,
    Comparison,
    CompilerOptions,
    createFutureSourceFile,
    createModuleSpecifierResolutionHost,
    createMultiMap,
    createPackageJsonImportFilter,
    Debug,
    DiagnosticOrDiagnosticAndArguments,
    Diagnostics,
    DiagnosticWithLocation,
    emptyArray,
    every,
    ExportKind,
    ExportMapInfoKey,
    factory,
    findAncestor,
    first,
    firstDefined,
    flatMap,
    flatMapIterator,
    forEachExternalModuleToImportFrom,
    forEachNameOfDefaultExport,
    formatting,
    FutureSourceFile,
    FutureSymbolExportInfo,
    getAllowSyntheticDefaultImports,
    getBaseFileName,
    getDeclarationOfKind,
    getDefaultLikeExportInfo,
    getDirectoryPath,
    getEmitModuleFormatOfFileWorker,
    getEmitModuleKind,
    getEmitModuleResolutionKind,
    getEmitScriptTarget,
    getExportInfoMap,
    getImpliedNodeFormatForEmitWorker,
    getIsFileExcluded,
    getMeaningFromLocation,
    getNameForExportedSymbol,
    getOutputExtension,
    getQuoteFromPreference,
    getQuotePreference,
    getSourceFileOfNode,
    getSymbolId,
    getSynthesizedDeepClone,
    getTokenAtPosition,
    getTokenPosOfNode,
    getTypeKeywordOfTypeOnlyImport,
    getUniqueSymbolId,
    hasJSFileExtension,
    hostGetCanonicalFileName,
    Identifier,
    identity,
    ImportClause,
    ImportEqualsDeclaration,
    importFromModuleSpecifier,
    ImportKind,
    ImportSpecifier,
    insertImports,
    InternalSymbolName,
    isExternalModuleReference,
    isFullSourceFile,
    isIdentifier,
    isImportableFile,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isIntrinsicJsxName,
    isJSDocImportTag,
    isJsxClosingElement,
    isJsxOpeningFragment,
    isJsxOpeningLikeElement,
    isJSXTagName,
    isNamedImports,
    isNamespaceImport,
    isRequireVariableStatement,
    isSourceFileJS,
    isStringLiteral,
    isStringLiteralLike,
    isTypeOnlyImportDeclaration,
    isTypeOnlyImportOrExportDeclaration,
    isUMDExportSymbol,
    isValidTypeOnlyAliasUseSite,
    isVariableDeclarationInitializedToRequire,
    jsxModeNeedsExplicitImport,
    LanguageServiceHost,
    last,
    makeImport,
    makeStringLiteral,
    mapDefined,
    memoizeOne,
    ModuleKind,
    moduleResolutionUsesNodeModules,
    moduleSpecifiers,
    moduleSymbolToValidIdentifier,
    MultiMap,
    Mutable,
    NamedImports,
    NamespaceImport,
    Node,
    NodeFlags,
    nodeIsMissing,
    ObjectBindingPattern,
    OrganizeImports,
    PackageJsonImportFilter,
    Path,
    pathContainsNodeModules,
    pathIsBareSpecifier,
    Program,
    QuotePreference,
    RequireOrImportCall,
    RequireVariableStatement,
    sameMap,
    SemanticMeaning,
    shouldUseUriStyleNodeCoreModules,
    single,
    skipAlias,
    some,
    SourceFile,
    startsWith,
    StringLiteral,
    stripQuotes,
    Symbol,
    SymbolExportInfo,
    SymbolFlags,
    SymbolId,
    SyntaxKind,
    textChanges,
    toPath,
    toSorted,
    tryCast,
    tryGetModuleSpecifierFromDeclaration,
    TypeChecker,
    TypeOnlyAliasDeclaration,
    UserPreferences,
    VariableDeclarationInitializedTo,
} from "../_namespaces/ts.js";

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
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode.code,
    Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig.code,
    Diagnostics.Cannot_find_namespace_0_Did_you_mean_1.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { errorCode, preferences, sourceFile, span, program } = context;
        const info = getFixInfos(context, errorCode, span.start, /*useAutoImportProvider*/ true);
        if (!info) return undefined;
        return info.map(({ fix, symbolName, errorIdentifierText }) =>
            codeActionForFix(
                context,
                sourceFile,
                symbolName,
                fix,
                /*includeSymbolNameInDescription*/ symbolName !== errorIdentifierText,
                program,
                preferences,
            )
        );
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
 * The node kinds that may be the declaration of an alias symbol imported/required from an external module.
 * `ImportClause` is the declaration for a syntactic default import. `VariableDeclaration` is the declaration
 * for a non-destructured `require` call.
 * @internal
 */
export type ImportOrRequireAliasDeclaration = ImportEqualsDeclaration | ImportClause | ImportSpecifier | NamespaceImport | VariableDeclarationInitializedTo<RequireOrImportCall> | BindingElement;

/**
 * Computes multiple import additions to a file and writes them to a ChangeTracker.
 *
 * @internal
 */
export interface ImportAdder {
    hasFixes(): boolean;
    addImportFromDiagnostic: (diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) => void;
    addImportFromExportedSymbol: (exportedSymbol: Symbol, isValidTypeOnlyUseSite?: boolean, referenceImport?: ImportOrRequireAliasDeclaration) => void;
    addImportForNonExistentExport: (exportName: string, exportingFileName: string, exportKind: ExportKind, exportedMeanings: SymbolFlags, isImportUsageValidAsTypeOnly: boolean) => void;
    addImportForUnresolvedIdentifier: (context: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean) => void;
    addVerbatimImport: (declaration: AnyImportOrRequireStatement | ImportOrRequireAliasDeclaration) => void;
    removeExistingImport: (declaration: ImportOrRequireAliasDeclaration) => void;
    writeFixes: (changeTracker: textChanges.ChangeTracker, oldFileQuotePreference?: QuotePreference) => void;
}

/** @internal */
export function createImportAdder(sourceFile: SourceFile | FutureSourceFile, program: Program, preferences: UserPreferences, host: LanguageServiceHost, cancellationToken?: CancellationToken): ImportAdder {
    return createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ false, preferences, host, cancellationToken);
}

interface AddToExistingState {
    readonly importClauseOrBindingPattern: ImportClause | ObjectBindingPattern;
    defaultImport: Import | undefined;
    readonly namedImports: Map<string, AddAsTypeOnly>;
}

function createImportAdderWorker(sourceFile: SourceFile | FutureSourceFile, program: Program, useAutoImportProvider: boolean, preferences: UserPreferences, host: LanguageServiceHost, cancellationToken: CancellationToken | undefined): ImportAdder {
    const compilerOptions = program.getCompilerOptions();
    // Namespace fixes don't conflict, so just build a list.
    const addToNamespace: FixUseNamespaceImport[] = [];
    const importType: FixAddJsdocTypeImport[] = [];
    const addToExisting = new Map<ImportClause | ObjectBindingPattern, AddToExistingState>();
    const removeExisting = new Set<ImportOrRequireAliasDeclaration>();
    const verbatimImports = new Set<AnyImportOrRequireStatement | ImportOrRequireAliasDeclaration>();

    type NewImportsKey = `${0 | 1}|${string}`;
    /** Use `getNewImportEntry` for access */
    const newImports = new Map<NewImportsKey, Mutable<ImportsCollection & { useRequire: boolean; }>>();
    return { addImportFromDiagnostic, addImportFromExportedSymbol, writeFixes, hasFixes, addImportForUnresolvedIdentifier, addImportForNonExistentExport, removeExistingImport, addVerbatimImport };

    function addVerbatimImport(declaration: AnyImportOrRequireStatement | ImportOrRequireAliasDeclaration) {
        verbatimImports.add(declaration);
    }

    function addImportForUnresolvedIdentifier(context: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean) {
        const info = getFixInfosWithoutDiagnostic(context, symbolToken, useAutoImportProvider);
        if (!info || !info.length) return;
        addImport(first(info));
    }

    function addImportFromDiagnostic(diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) {
        const info = getFixInfos(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
        if (!info || !info.length) return;
        addImport(first(info));
    }

    function addImportFromExportedSymbol(exportedSymbol: Symbol, isValidTypeOnlyUseSite?: boolean, referenceImport?: ImportOrRequireAliasDeclaration) {
        const moduleSymbol = Debug.checkDefined(exportedSymbol.parent);
        const symbolName = getNameForExportedSymbol(exportedSymbol, getEmitScriptTarget(compilerOptions));
        const checker = program.getTypeChecker();
        const symbol = checker.getMergedSymbol(skipAlias(exportedSymbol, checker));
        const exportInfo = getAllExportInfoForSymbol(sourceFile, symbol, symbolName, moduleSymbol, /*preferCapitalized*/ false, program, host, preferences, cancellationToken);
        if (!exportInfo) {
            // If no exportInfo is found, this means export could not be resolved when we have filtered for autoImportFileExcludePatterns,
            //     so we should not generate an import.
            Debug.assert(preferences.autoImportFileExcludePatterns?.length);
            return;
        }
        const useRequire = shouldUseRequire(sourceFile, program);
        let fix = getImportFixForSymbol(sourceFile, exportInfo, program, /*position*/ undefined, !!isValidTypeOnlyUseSite, useRequire, host, preferences);
        if (fix) {
            const localName = tryCast(referenceImport?.name, isIdentifier)?.text ?? symbolName;
            if (
                referenceImport
                && isTypeOnlyImportDeclaration(referenceImport)
                && (fix.kind === ImportFixKind.AddNew || fix.kind === ImportFixKind.AddToExisting)
                && fix.addAsTypeOnly === AddAsTypeOnly.Allowed
            ) {
                // Copy the type-only status from the reference import
                fix = { ...fix, addAsTypeOnly: AddAsTypeOnly.Required };
            }
            addImport({ fix, symbolName: localName ?? symbolName, errorIdentifierText: undefined });
        }
    }

    function addImportForNonExistentExport(exportName: string, exportingFileName: string, exportKind: ExportKind, exportedMeanings: SymbolFlags, isImportUsageValidAsTypeOnly: boolean) {
        const exportingSourceFile = program.getSourceFile(exportingFileName);
        const useRequire = shouldUseRequire(sourceFile, program);
        if (exportingSourceFile && exportingSourceFile.symbol) {
            const { fixes } = getImportFixes(
                [{
                    exportKind,
                    isFromPackageJson: false,
                    moduleFileName: exportingFileName,
                    moduleSymbol: exportingSourceFile.symbol,
                    targetFlags: exportedMeanings,
                }],
                /*usagePosition*/ undefined,
                isImportUsageValidAsTypeOnly,
                useRequire,
                program,
                sourceFile,
                host,
                preferences,
            );
            if (fixes.length) {
                addImport({ fix: fixes[0], symbolName: exportName, errorIdentifierText: exportName });
            }
        }
        else {
            // File does not exist yet or has no exports, so all imports added will be "new"
            const futureExportingSourceFile = createFutureSourceFile(exportingFileName, ModuleKind.ESNext, program, host);
            const moduleSpecifier = moduleSpecifiers.getLocalModuleSpecifierBetweenFileNames(
                sourceFile,
                exportingFileName,
                compilerOptions,
                createModuleSpecifierResolutionHost(program, host),
            );
            const importKind = getImportKind(futureExportingSourceFile, exportKind, program);
            const addAsTypeOnly = getAddAsTypeOnly(
                isImportUsageValidAsTypeOnly,
                /*isForNewImportDeclaration*/ true,
                /*symbol*/ undefined,
                exportedMeanings,
                program.getTypeChecker(),
                compilerOptions,
            );
            const fix: FixAddNewImport = {
                kind: ImportFixKind.AddNew,
                moduleSpecifierKind: "relative",
                moduleSpecifier,
                importKind,
                addAsTypeOnly,
                useRequire,
            };
            addImport({ fix, symbolName: exportName, errorIdentifierText: exportName });
        }
    }

    function removeExistingImport(declaration: ImportOrRequireAliasDeclaration) {
        if (declaration.kind === SyntaxKind.ImportClause) {
            Debug.assertIsDefined(declaration.name, "ImportClause should have a name if it's being removed");
        }
        removeExisting.add(declaration);
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
                let entry = addToExisting.get(importClauseOrBindingPattern);
                if (!entry) {
                    addToExisting.set(importClauseOrBindingPattern, entry = { importClauseOrBindingPattern, defaultImport: undefined, namedImports: new Map() });
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
                        if (compilerOptions.verbatimModuleSyntax) {
                            const prevValue = (entry.namedImports ||= new Map()).get(symbolName);
                            entry.namedImports.set(symbolName, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                        }
                        else {
                            Debug.assert(entry.namespaceLikeImport === undefined || entry.namespaceLikeImport.name === symbolName, "Namespacelike import shoudl be missing or match symbolName");
                            entry.namespaceLikeImport = { importKind, name: symbolName, addAsTypeOnly };
                        }
                        break;
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

        function getNewImportEntry(moduleSpecifier: string, importKind: ImportKind, useRequire: boolean, addAsTypeOnly: AddAsTypeOnly): Mutable<ImportsCollection & { useRequire: boolean; }> {
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
            const newEntry: ImportsCollection & { useRequire: boolean; } = {
                defaultImport: undefined,
                namedImports: undefined,
                namespaceLikeImport: undefined,
                useRequire,
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

    function writeFixes(changeTracker: textChanges.ChangeTracker, oldFileQuotePreference?: QuotePreference) {
        let quotePreference: QuotePreference;
        if (isFullSourceFile(sourceFile) && sourceFile.imports.length === 0 && oldFileQuotePreference !== undefined) {
            // If the target file has no imports, we must use the same quote preference as the file we are importing from.
            quotePreference = oldFileQuotePreference;
        }
        else {
            quotePreference = getQuotePreference(sourceFile, preferences);
        }
        for (const fix of addToNamespace) {
            // Any modifications to existing syntax imply SourceFile already exists
            addNamespaceQualifier(changeTracker, sourceFile as SourceFile, fix);
        }
        for (const fix of importType) {
            // Any modifications to existing syntax imply SourceFile already exists
            addImportType(changeTracker, sourceFile as SourceFile, fix, quotePreference);
        }
        let importSpecifiersToRemoveWhileAdding: Set<ImportSpecifier | BindingElement> | undefined;
        if (removeExisting.size) {
            Debug.assert(isFullSourceFile(sourceFile), "Cannot remove imports from a future source file");
            const importDeclarationsWithRemovals = new Set(mapDefined([...removeExisting], d => findAncestor(d, isImportDeclaration)!));
            const variableDeclarationsWithRemovals = new Set(mapDefined([...removeExisting], d => findAncestor(d, isVariableDeclarationInitializedToRequire)!));
            const emptyImportDeclarations = [...importDeclarationsWithRemovals].filter(d =>
                // nothing added to the import declaration
                !addToExisting.has(d.importClause!) &&
                // no default, or default is being removed
                (!d.importClause?.name || removeExisting.has(d.importClause)) &&
                // no namespace import, or namespace import is being removed
                (!tryCast(d.importClause?.namedBindings, isNamespaceImport) || removeExisting.has(d.importClause!.namedBindings as NamespaceImport)) &&
                // no named imports, or all named imports are being removed
                (!tryCast(d.importClause?.namedBindings, isNamedImports) || every((d.importClause!.namedBindings as NamedImports).elements, e => removeExisting.has(e)))
            );
            const emptyVariableDeclarations = [...variableDeclarationsWithRemovals].filter(d =>
                // no binding elements being added to the variable declaration
                (d.name.kind !== SyntaxKind.ObjectBindingPattern || !addToExisting.has(d.name)) &&
                // no binding elements, or all binding elements are being removed
                (d.name.kind !== SyntaxKind.ObjectBindingPattern || every(d.name.elements, e => removeExisting.has(e)))
            );
            const namedBindingsToDelete = [...importDeclarationsWithRemovals].filter(d =>
                // has named bindings
                d.importClause?.namedBindings &&
                // is not being fully removed
                emptyImportDeclarations.indexOf(d) === -1 &&
                // is not gaining named imports
                !addToExisting.get(d.importClause)?.namedImports &&
                // all named imports are being removed
                (d.importClause.namedBindings.kind === SyntaxKind.NamespaceImport || every(d.importClause.namedBindings.elements, e => removeExisting.has(e)))
            );
            for (const declaration of [...emptyImportDeclarations, ...emptyVariableDeclarations]) {
                changeTracker.delete(sourceFile, declaration);
            }
            for (const declaration of namedBindingsToDelete) {
                changeTracker.replaceNode(
                    sourceFile,
                    declaration.importClause!,
                    factory.updateImportClause(
                        declaration.importClause!,
                        declaration.importClause!.isTypeOnly,
                        declaration.importClause!.name,
                        /*namedBindings*/ undefined,
                    ),
                );
            }
            for (const declaration of removeExisting) {
                const importDeclaration = findAncestor(declaration, isImportDeclaration);
                if (
                    importDeclaration &&
                    emptyImportDeclarations.indexOf(importDeclaration) === -1 &&
                    namedBindingsToDelete.indexOf(importDeclaration) === -1
                ) {
                    if (declaration.kind === SyntaxKind.ImportClause) {
                        changeTracker.delete(sourceFile, declaration.name!);
                    }
                    else {
                        Debug.assert(declaration.kind === SyntaxKind.ImportSpecifier, "NamespaceImport should have been handled earlier");
                        if (addToExisting.get(importDeclaration.importClause!)?.namedImports) {
                            // Handle combined inserts/deletes in `doAddExistingFix`
                            (importSpecifiersToRemoveWhileAdding ??= new Set()).add(declaration);
                        }
                        else {
                            changeTracker.delete(sourceFile, declaration);
                        }
                    }
                }
                else if (declaration.kind === SyntaxKind.BindingElement) {
                    if (addToExisting.get(declaration.parent as ObjectBindingPattern)?.namedImports) {
                        // Handle combined inserts/deletes in `doAddExistingFix`
                        (importSpecifiersToRemoveWhileAdding ??= new Set()).add(declaration);
                    }
                    else {
                        changeTracker.delete(sourceFile, declaration);
                    }
                }
                else if (declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
                    changeTracker.delete(sourceFile, declaration);
                }
            }
        }
        addToExisting.forEach(({ importClauseOrBindingPattern, defaultImport, namedImports }) => {
            doAddExistingFix(
                changeTracker,
                sourceFile as SourceFile,
                importClauseOrBindingPattern,
                defaultImport,
                arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })),
                importSpecifiersToRemoveWhileAdding,
                preferences,
            );
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
                namespaceLikeImport,
                compilerOptions,
                preferences,
            );
            newDeclarations = combine(newDeclarations, declarations);
        });
        newDeclarations = combine(newDeclarations, getCombinedVerbatimImports());
        if (newDeclarations) {
            insertImports(changeTracker, sourceFile, newDeclarations, /*blankLineBetween*/ true, preferences);
        }
    }

    function getCombinedVerbatimImports(): AnyImportOrRequireStatement[] | undefined {
        if (!verbatimImports.size) return undefined;
        const importDeclarations = new Set(mapDefined([...verbatimImports], d => findAncestor(d, isImportDeclaration)));
        const requireStatements = new Set(mapDefined([...verbatimImports], d => findAncestor(d, isRequireVariableStatement)));
        return [
            ...mapDefined([...verbatimImports], d =>
                d.kind === SyntaxKind.ImportEqualsDeclaration
                    ? getSynthesizedDeepClone(d, /*includeTrivia*/ true)
                    : undefined),
            ...[...importDeclarations].map(d => {
                if (verbatimImports.has(d)) {
                    return getSynthesizedDeepClone(d, /*includeTrivia*/ true);
                }
                return getSynthesizedDeepClone(
                    factory.updateImportDeclaration(
                        d,
                        d.modifiers,
                        d.importClause && factory.updateImportClause(
                            d.importClause,
                            d.importClause.isTypeOnly,
                            verbatimImports.has(d.importClause) ? d.importClause.name : undefined,
                            verbatimImports.has(d.importClause.namedBindings as NamespaceImport)
                                ? d.importClause.namedBindings as NamespaceImport :
                                tryCast(d.importClause.namedBindings, isNamedImports)?.elements.some(e => verbatimImports.has(e))
                                ? factory.updateNamedImports(
                                    d.importClause.namedBindings as NamedImports,
                                    (d.importClause.namedBindings as NamedImports).elements.filter(e => verbatimImports.has(e)),
                                )
                                : undefined,
                        ),
                        d.moduleSpecifier,
                        d.attributes,
                    ),
                    /*includeTrivia*/ true,
                );
            }),
            ...[...requireStatements].map(s => {
                if (verbatimImports.has(s)) {
                    return getSynthesizedDeepClone(s, /*includeTrivia*/ true);
                }
                return getSynthesizedDeepClone(
                    factory.updateVariableStatement(
                        s,
                        s.modifiers,
                        factory.updateVariableDeclarationList(
                            s.declarationList,
                            mapDefined(s.declarationList.declarations, d => {
                                if (verbatimImports.has(d)) {
                                    return d;
                                }
                                return factory.updateVariableDeclaration(
                                    d,
                                    d.name.kind === SyntaxKind.ObjectBindingPattern
                                        ? factory.updateObjectBindingPattern(
                                            d.name,
                                            d.name.elements.filter(e => verbatimImports.has(e)),
                                        ) : d.name,
                                    d.exclamationToken,
                                    d.type,
                                    d.initializer,
                                );
                            }),
                        ),
                    ),
                    /*includeTrivia*/ true,
                ) as RequireVariableStatement;
            }),
        ];
    }

    function hasFixes() {
        return addToNamespace.length > 0 || importType.length > 0 || addToExisting.size > 0 || newImports.size > 0 || verbatimImports.size > 0 || removeExisting.size > 0;
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
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: SymbolExportInfo | FutureSymbolExportInfo; moduleSpecifier: string; computedWithoutCacheCount: number; } | undefined;
}

/** @internal */
export function createImportSpecifierResolver(importingFile: SourceFile, program: Program, host: LanguageServiceHost, preferences: UserPreferences): ImportSpecifierResolver {
    const packageJsonImportFilter = createPackageJsonImportFilter(importingFile, preferences, host);
    const importMap = createExistingImportMap(importingFile, program);
    return { getModuleSpecifierForBestExportInfo };

    function getModuleSpecifierForBestExportInfo(
        exportInfo: readonly SymbolExportInfo[],
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: SymbolExportInfo | FutureSymbolExportInfo; moduleSpecifier: string; computedWithoutCacheCount: number; } | undefined {
        const { fixes, computedWithoutCacheCount } = getImportFixes(
            exportInfo,
            position,
            isValidTypeOnlyUseSite,
            /*useRequire*/ false,
            program,
            importingFile,
            host,
            preferences,
            importMap,
            fromCacheOnly,
        );
        const result = getBestFix(fixes, importingFile, program, packageJsonImportFilter, host, preferences);
        return result && { ...result, computedWithoutCacheCount };
    }
}

// Sorted with the preferred fix coming first.
const enum ImportFixKind {
    UseNamespace,
    JsdocTypeImport,
    AddToExisting,
    AddNew,
    PromoteTypeOnly,
}
// These should not be combined as bitflags, but are given powers of 2 values to
// easily detect conflicts between `NotAllowed` and `Required` by giving them a unique sum.
// They're also ordered in terms of increasing priority for a fix-all scenario (see
// `reduceAddAsTypeOnlyValues`).
const enum AddAsTypeOnly {
    Allowed = 1 << 0,
    Required = 1 << 1,
    NotAllowed = 1 << 2,
}
type ImportFix = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport | FixPromoteTypeOnlyImport;
type ImportFixWithModuleSpecifier = FixUseNamespaceImport | FixAddJsdocTypeImport | FixAddToExistingImport | FixAddNewImport;

// Properties are be undefined if fix is derived from an existing import
interface ImportFixBase {
    readonly isReExport?: boolean;
    readonly exportInfo?: SymbolExportInfo | FutureSymbolExportInfo;
    readonly moduleSpecifierKind: moduleSpecifiers.ModuleSpecifierResult["kind"];
    readonly moduleSpecifier: string;
}
interface Qualification {
    readonly usagePosition: number;
    readonly namespacePrefix: string;
}
interface FixUseNamespaceImport extends ImportFixBase, Qualification {
    readonly kind: ImportFixKind.UseNamespace;
}
interface FixAddJsdocTypeImport extends ImportFixBase {
    readonly kind: ImportFixKind.JsdocTypeImport;
    readonly usagePosition: number;
    readonly isReExport: boolean;
    readonly exportInfo: SymbolExportInfo | FutureSymbolExportInfo;
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
    readonly qualification?: Qualification;
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
    readonly symbol?: Symbol;
}

/** @internal */
export function getImportCompletionAction(
    targetSymbol: Symbol,
    moduleSymbol: Symbol,
    exportMapKey: ExportMapInfoKey | undefined,
    sourceFile: SourceFile,
    symbolName: string,
    isJsxTagName: boolean,
    host: LanguageServiceHost,
    program: Program,
    formatContext: formatting.FormatContext,
    position: number,
    preferences: UserPreferences,
    cancellationToken: CancellationToken,
): { readonly moduleSpecifier: string; readonly codeAction: CodeAction; } {
    let exportInfos;

    if (exportMapKey) {
        // The new way: `exportMapKey` should be in the `data` of each auto-import completion entry and
        // sent back when asking for details.
        exportInfos = getExportInfoMap(sourceFile, host, program, preferences, cancellationToken).get(sourceFile.path, exportMapKey);
        Debug.assertIsDefined(exportInfos, "Some exportInfo should match the specified exportMapKey");
    }
    else {
        // The old way, kept alive for super old editors that don't give us `data` back.
        exportInfos = pathIsBareSpecifier(stripQuotes(moduleSymbol.name))
            ? [getSingleExportInfoForSymbol(targetSymbol, symbolName, moduleSymbol, program, host)]
            : getAllExportInfoForSymbol(sourceFile, targetSymbol, symbolName, moduleSymbol, isJsxTagName, program, host, preferences, cancellationToken);
        Debug.assertIsDefined(exportInfos, "Some exportInfo should match the specified symbol / moduleSymbol");
    }

    const useRequire = shouldUseRequire(sourceFile, program);
    const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(getTokenAtPosition(sourceFile, position));
    const fix = Debug.checkDefined(getImportFixForSymbol(sourceFile, exportInfos, program, position, isValidTypeOnlyUseSite, useRequire, host, preferences));
    return {
        moduleSpecifier: fix.moduleSpecifier,
        codeAction: codeFixActionToCodeAction(codeActionForFix(
            { host, formatContext, preferences },
            sourceFile,
            symbolName,
            fix,
            /*includeSymbolNameInDescription*/ false,
            program,
            preferences,
        )),
    };
}

/** @internal */
export function getPromoteTypeOnlyCompletionAction(sourceFile: SourceFile, symbolToken: Identifier, program: Program, host: LanguageServiceHost, formatContext: formatting.FormatContext, preferences: UserPreferences) {
    const compilerOptions = program.getCompilerOptions();
    const symbolName = single(getSymbolNamesToImport(sourceFile, program.getTypeChecker(), symbolToken, compilerOptions));
    const fix = getTypeOnlyPromotionFix(sourceFile, symbolToken, symbolName, program);
    const includeSymbolNameInDescription = symbolName !== symbolToken.text;
    return fix && codeFixActionToCodeAction(codeActionForFix(
        { host, formatContext, preferences },
        sourceFile,
        symbolName,
        fix,
        includeSymbolNameInDescription,
        program,
        preferences,
    ));
}

function getImportFixForSymbol(sourceFile: SourceFile | FutureSourceFile, exportInfos: readonly SymbolExportInfo[], program: Program, position: number | undefined, isValidTypeOnlyUseSite: boolean, useRequire: boolean, host: LanguageServiceHost, preferences: UserPreferences) {
    const packageJsonImportFilter = createPackageJsonImportFilter(sourceFile, preferences, host);
    return getBestFix(getImportFixes(exportInfos, position, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes, sourceFile, program, packageJsonImportFilter, host, preferences);
}

function codeFixActionToCodeAction({ description, changes, commands }: CodeFixAction): CodeAction {
    return { description, changes, commands };
}

function getAllExportInfoForSymbol(importingFile: SourceFile | FutureSourceFile, symbol: Symbol, symbolName: string, moduleSymbol: Symbol, preferCapitalized: boolean, program: Program, host: LanguageServiceHost, preferences: UserPreferences, cancellationToken: CancellationToken | undefined): readonly SymbolExportInfo[] | undefined {
    const getChecker = createGetChecker(program, host);
    const isFileExcluded = preferences.autoImportFileExcludePatterns && getIsFileExcluded(host, preferences);
    const mergedModuleSymbol = program.getTypeChecker().getMergedSymbol(moduleSymbol);
    const moduleSourceFile = isFileExcluded && mergedModuleSymbol.declarations && getDeclarationOfKind(mergedModuleSymbol, SyntaxKind.SourceFile);
    const moduleSymbolExcluded = moduleSourceFile && isFileExcluded(moduleSourceFile as SourceFile);
    return getExportInfoMap(importingFile, host, program, preferences, cancellationToken)
        .search(importingFile.path, preferCapitalized, name => name === symbolName, info => {
            if (
                getChecker(info[0].isFromPackageJson).getMergedSymbol(skipAlias(info[0].symbol, getChecker(info[0].isFromPackageJson))) === symbol
                && (moduleSymbolExcluded || info.some(i => i.moduleSymbol === moduleSymbol || i.symbol.parent === moduleSymbol))
            ) {
                return info;
            }
        });
}

function getSingleExportInfoForSymbol(symbol: Symbol, symbolName: string, moduleSymbol: Symbol, program: Program, host: LanguageServiceHost): SymbolExportInfo {
    const mainProgramInfo = getInfoWithChecker(program.getTypeChecker(), /*isFromPackageJson*/ false);
    if (mainProgramInfo) {
        return mainProgramInfo;
    }
    const autoImportProvider = host.getPackageJsonAutoImportProvider?.()?.getTypeChecker();
    return Debug.checkDefined(autoImportProvider && getInfoWithChecker(autoImportProvider, /*isFromPackageJson*/ true), `Could not find symbol in specified module for code actions`);

    function getInfoWithChecker(checker: TypeChecker, isFromPackageJson: boolean): SymbolExportInfo | undefined {
        const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker);
        if (defaultInfo && skipAlias(defaultInfo.symbol, checker) === symbol) {
            return { symbol: defaultInfo.symbol, moduleSymbol, moduleFileName: undefined, exportKind: defaultInfo.exportKind, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
        }
        const named = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
        if (named && skipAlias(named, checker) === symbol) {
            return { symbol: named, moduleSymbol, moduleFileName: undefined, exportKind: ExportKind.Named, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
        }
    }
}

function getImportFixes(
    exportInfos: readonly SymbolExportInfo[] | readonly FutureSymbolExportInfo[],
    usagePosition: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    program: Program,
    sourceFile: SourceFile | FutureSourceFile,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    importMap = isFullSourceFile(sourceFile) ? createExistingImportMap(sourceFile, program) : undefined,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number; fixes: readonly ImportFixWithModuleSpecifier[]; } {
    const checker = program.getTypeChecker();
    const existingImports = importMap ? flatMap(exportInfos, importMap.getImportsForExportInfo) : emptyArray;
    const useNamespace = usagePosition !== undefined && tryUseExistingNamespaceImport(existingImports, usagePosition);
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
        usagePosition,
        isValidTypeOnlyUseSite,
        useRequire,
        host,
        preferences,
        fromCacheOnly,
    );
    return {
        computedWithoutCacheCount,
        fixes: [...(useNamespace ? [useNamespace] : emptyArray), ...fixes],
    };
}

function tryUseExistingNamespaceImport(existingImports: readonly FixAddToExistingImportInfo[], position: number): FixUseNamespaceImport | undefined {
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
    return firstDefined(existingImports, ({ declaration, importKind }): FixUseNamespaceImport | undefined => {
        if (importKind !== ImportKind.Named) return undefined;
        const namespacePrefix = getNamespaceLikeImportText(declaration);
        const moduleSpecifier = namespacePrefix && tryGetModuleSpecifierFromDeclaration(declaration)?.text;
        if (moduleSpecifier) {
            return { kind: ImportFixKind.UseNamespace, namespacePrefix, usagePosition: position, moduleSpecifierKind: undefined, moduleSpecifier };
        }
    });
}

function getNamespaceLikeImportText(declaration: AnyImportOrRequire) {
    switch (declaration.kind) {
        case SyntaxKind.VariableDeclaration:
            return tryCast(declaration.name, isIdentifier)?.text;
        case SyntaxKind.ImportEqualsDeclaration:
            return declaration.name.text;
        case SyntaxKind.JSDocImportTag:
        case SyntaxKind.ImportDeclaration:
            return tryCast(declaration.importClause?.namedBindings, isNamespaceImport)?.name.text;
        default:
            return Debug.assertNever(declaration);
    }
}

function getAddAsTypeOnly(
    isValidTypeOnlyUseSite: boolean,
    isForNewImportDeclaration: boolean,
    symbol: Symbol | undefined,
    targetFlags: SymbolFlags,
    checker: TypeChecker,
    compilerOptions: CompilerOptions,
) {
    if (!isValidTypeOnlyUseSite) {
        // Can't use a type-only import if the usage is an emitting position
        return AddAsTypeOnly.NotAllowed;
    }
    if (
        symbol &&
        compilerOptions.verbatimModuleSyntax &&
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
    let best: FixAddToExistingImport | undefined;
    for (const existingImport of existingImports) {
        const fix = getAddToExistingImportFix(existingImport);
        if (!fix) continue;
        const isTypeOnly = isTypeOnlyImportDeclaration(fix.importClauseOrBindingPattern);
        if (
            fix.addAsTypeOnly !== AddAsTypeOnly.NotAllowed && isTypeOnly ||
            fix.addAsTypeOnly === AddAsTypeOnly.NotAllowed && !isTypeOnly
        ) {
            // Give preference to putting types in existing type-only imports and avoiding conversions
            // of import statements to/from type-only.
            return fix;
        }
        best ??= fix;
    }
    return best;

    function getAddToExistingImportFix({ declaration, importKind, symbol, targetFlags }: FixAddToExistingImportInfo): FixAddToExistingImport | undefined {
        if (importKind === ImportKind.CommonJS || importKind === ImportKind.Namespace || declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
            // These kinds of imports are not combinable with anything
            return undefined;
        }

        if (declaration.kind === SyntaxKind.VariableDeclaration) {
            return (importKind === ImportKind.Named || importKind === ImportKind.Default) && declaration.name.kind === SyntaxKind.ObjectBindingPattern
                ? { kind: ImportFixKind.AddToExisting, importClauseOrBindingPattern: declaration.name, importKind, moduleSpecifierKind: undefined, moduleSpecifier: declaration.initializer.arguments[0].text, addAsTypeOnly: AddAsTypeOnly.NotAllowed }
                : undefined;
        }

        const { importClause } = declaration;
        if (!importClause || !isStringLiteralLike(declaration.moduleSpecifier)) {
            return undefined;
        }
        const { name, namedBindings } = importClause;
        // A type-only import may not have both a default and named imports, so the only way a name can
        // be added to an existing type-only import is adding a named import to existing named bindings.
        if (importClause.isTypeOnly && !(importKind === ImportKind.Named && namedBindings)) {
            return undefined;
        }

        // N.B. we don't have to figure out whether to use the main program checker
        // or the AutoImportProvider checker because we're adding to an existing import; the existence of
        // the import guarantees the symbol came from the main program.
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ false, symbol, targetFlags, checker, compilerOptions);

        if (
            importKind === ImportKind.Default && (
                name || // Cannot add a default import to a declaration that already has one
                addAsTypeOnly === AddAsTypeOnly.Required && namedBindings // Cannot add a default import as type-only if the import already has named bindings
            )
        ) {
            return undefined;
        }
        if (
            importKind === ImportKind.Named &&
            namedBindings?.kind === SyntaxKind.NamespaceImport // Cannot add a named import to a declaration that has a namespace import
        ) {
            return undefined;
        }

        return {
            kind: ImportFixKind.AddToExisting,
            importClauseOrBindingPattern: importClause,
            importKind,
            moduleSpecifierKind: undefined,
            moduleSpecifier: declaration.moduleSpecifier.text,
            addAsTypeOnly,
        };
    }
}

function createExistingImportMap(importingFile: SourceFile, program: Program) {
    const checker = program.getTypeChecker();
    let importMap: MultiMap<SymbolId, AnyImportOrRequire> | undefined;
    for (const moduleSpecifier of importingFile.imports) {
        const i = importFromModuleSpecifier(moduleSpecifier);
        if (isVariableDeclarationInitializedToRequire(i.parent)) {
            const moduleSymbol = checker.resolveExternalModuleName(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i.parent);
            }
        }
        else if (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration || i.kind === SyntaxKind.JSDocImportTag) {
            const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i);
            }
        }
    }

    return {
        getImportsForExportInfo: ({ moduleSymbol, exportKind, targetFlags, symbol }: SymbolExportInfo | FutureSymbolExportInfo): readonly FixAddToExistingImportInfo[] => {
            const matchingDeclarations = importMap?.get(getSymbolId(moduleSymbol));
            if (!matchingDeclarations) return emptyArray;

            // Can't use an es6 import for a type in JS.
            if (
                isSourceFileJS(importingFile)
                && !(targetFlags & SymbolFlags.Value)
                && !every(matchingDeclarations, isJSDocImportTag)
            ) return emptyArray;

            const importKind = getImportKind(importingFile, exportKind, program);
            return matchingDeclarations.map(declaration => ({ declaration, importKind, symbol, targetFlags }));
        },
    };
}

function shouldUseRequire(sourceFile: SourceFile | FutureSourceFile, program: Program): boolean {
    // 1. TypeScript files don't use require variable declarations
    if (!hasJSFileExtension(sourceFile.fileName)) {
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

    // 4. In --module nodenext, assume we're not emitting JS -> JS, so use
    //    whatever syntax Node expects based on the detected module kind
    //    TODO: consider removing `impliedNodeFormatForEmit`
    if (getImpliedNodeFormatForEmit(sourceFile, program) === ModuleKind.CommonJS) return true;
    if (getImpliedNodeFormatForEmit(sourceFile, program) === ModuleKind.ESNext) return false;

    // 5. Match the first other JS file in the program that's unambiguously CJS or ESM
    for (const otherFile of program.getSourceFiles()) {
        if (otherFile === sourceFile || !isSourceFileJS(otherFile) || program.isSourceFileFromExternalLibrary(otherFile)) continue;
        if (otherFile.commonJsModuleIndicator && !otherFile.externalModuleIndicator) return true;
        if (otherFile.externalModuleIndicator && !otherFile.commonJsModuleIndicator) return false;
    }

    // 6. Literally nothing to go on
    return true;
}

function createGetChecker(program: Program, host: LanguageServiceHost) {
    return memoizeOne((isFromPackageJson: boolean) => isFromPackageJson ? host.getPackageJsonAutoImportProvider!()!.getTypeChecker() : program.getTypeChecker());
}

function getNewImportFixes(
    program: Program,
    sourceFile: SourceFile | FutureSourceFile,
    usagePosition: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    exportInfo: readonly (SymbolExportInfo | FutureSymbolExportInfo)[],
    host: LanguageServiceHost,
    preferences: UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number; fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[]; } {
    const isJs = hasJSFileExtension(sourceFile.fileName);
    const compilerOptions = program.getCompilerOptions();
    const moduleSpecifierResolutionHost = createModuleSpecifierResolutionHost(program, host);
    const getChecker = createGetChecker(program, host);
    const moduleResolution = getEmitModuleResolutionKind(compilerOptions);
    const rejectNodeModulesRelativePaths = moduleResolutionUsesNodeModules(moduleResolution);
    const getModuleSpecifiers = fromCacheOnly
        ? (exportInfo: SymbolExportInfo | FutureSymbolExportInfo) => moduleSpecifiers.tryGetModuleSpecifiersFromCache(exportInfo.moduleSymbol, sourceFile, moduleSpecifierResolutionHost, preferences)
        : (exportInfo: SymbolExportInfo | FutureSymbolExportInfo, checker: TypeChecker) => moduleSpecifiers.getModuleSpecifiersWithCacheInfo(exportInfo.moduleSymbol, checker, compilerOptions, sourceFile, moduleSpecifierResolutionHost, preferences, /*options*/ undefined, /*forAutoImport*/ true);

    let computedWithoutCacheCount = 0;
    const fixes = flatMap(exportInfo, (exportInfo, i) => {
        const checker = getChecker(exportInfo.isFromPackageJson);
        const { computedWithoutCache, moduleSpecifiers, kind: moduleSpecifierKind } = getModuleSpecifiers(exportInfo, checker) ?? {};
        const importedSymbolHasValueMeaning = !!(exportInfo.targetFlags & SymbolFlags.Value);
        const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ true, exportInfo.symbol, exportInfo.targetFlags, checker, compilerOptions);
        computedWithoutCacheCount += computedWithoutCache ? 1 : 0;
        return mapDefined(moduleSpecifiers, (moduleSpecifier): FixAddNewImport | FixAddJsdocTypeImport | undefined => {
            if (rejectNodeModulesRelativePaths && pathContainsNodeModules(moduleSpecifier)) {
                return undefined;
            }
            if (!importedSymbolHasValueMeaning && isJs && usagePosition !== undefined) {
                // `position` should only be undefined at a missing jsx namespace, in which case we shouldn't be looking for pure types.
                return { kind: ImportFixKind.JsdocTypeImport, moduleSpecifierKind, moduleSpecifier, usagePosition, exportInfo, isReExport: i > 0 };
            }
            const importKind = getImportKind(sourceFile, exportInfo.exportKind, program);
            let qualification: Qualification | undefined;
            if (usagePosition !== undefined && importKind === ImportKind.CommonJS && exportInfo.exportKind === ExportKind.Named) {
                // Compiler options are restricting our import options to a require, but we need to access
                // a named export or property of the exporting module. We need to import the entire module
                // and insert a property access, e.g. `writeFile` becomes
                //
                // import fs = require("fs"); // or const in JS
                // fs.writeFile
                const exportEquals = checker.resolveExternalModuleSymbol(exportInfo.moduleSymbol);
                let namespacePrefix;
                if (exportEquals !== exportInfo.moduleSymbol) {
                    namespacePrefix = forEachNameOfDefaultExport(exportEquals, checker, getEmitScriptTarget(compilerOptions), identity)!;
                }
                namespacePrefix ||= moduleSymbolToValidIdentifier(
                    exportInfo.moduleSymbol,
                    getEmitScriptTarget(compilerOptions),
                    /*forceCapitalize*/ false,
                );
                qualification = { namespacePrefix, usagePosition };
            }
            return {
                kind: ImportFixKind.AddNew,
                moduleSpecifierKind,
                moduleSpecifier,
                importKind,
                useRequire,
                addAsTypeOnly,
                exportInfo,
                isReExport: i > 0,
                qualification,
            };
        });
    });

    return { computedWithoutCacheCount, fixes };
}

function getFixesForAddImport(
    exportInfos: readonly SymbolExportInfo[] | readonly FutureSymbolExportInfo[],
    existingImports: readonly FixAddToExistingImportInfo[],
    program: Program,
    sourceFile: SourceFile | FutureSourceFile,
    usagePosition: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount?: number; fixes: readonly (FixAddNewImport | FixAddJsdocTypeImport)[]; } {
    const existingDeclaration = firstDefined(existingImports, info => newImportInfoFromExistingSpecifier(info, isValidTypeOnlyUseSite, useRequire, program.getTypeChecker(), program.getCompilerOptions()));
    return existingDeclaration ? { fixes: [existingDeclaration] } : getNewImportFixes(program, sourceFile, usagePosition, isValidTypeOnlyUseSite, useRequire, exportInfos, host, preferences, fromCacheOnly);
}

function newImportInfoFromExistingSpecifier(
    { declaration, importKind, symbol, targetFlags }: FixAddToExistingImportInfo,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    checker: TypeChecker,
    compilerOptions: CompilerOptions,
): FixAddNewImport | undefined {
    const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(declaration)?.text;
    if (moduleSpecifier) {
        const addAsTypeOnly = useRequire
            ? AddAsTypeOnly.NotAllowed
            : getAddAsTypeOnly(isValidTypeOnlyUseSite, /*isForNewImportDeclaration*/ true, symbol, targetFlags, checker, compilerOptions);
        return { kind: ImportFixKind.AddNew, moduleSpecifierKind: undefined, moduleSpecifier, importKind, addAsTypeOnly, useRequire };
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
    return info && sortFixInfo(info, context.sourceFile, context.program, packageJsonImportFilter, context.host, context.preferences);
}

function sortFixInfo(fixes: readonly (FixInfo & { fix: ImportFixWithModuleSpecifier; })[], sourceFile: SourceFile, program: Program, packageJsonImportFilter: PackageJsonImportFilter, host: LanguageServiceHost, preferences: UserPreferences): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier; })[] {
    const _toPath = (fileName: string) => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host));
    return toSorted(fixes, (a, b) =>
        compareBooleans(!!a.isJsxNamespaceFix, !!b.isJsxNamespaceFix) ||
        compareValues(a.fix.kind, b.fix.kind) ||
        compareModuleSpecifiers(a.fix, b.fix, sourceFile, program, preferences, packageJsonImportFilter.allowsImportingSpecifier, _toPath));
}

function getFixInfosWithoutDiagnostic(context: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean): readonly FixInfo[] | undefined {
    const info = getFixesInfoForNonUMDImport(context, symbolToken, useAutoImportProvider);
    const packageJsonImportFilter = createPackageJsonImportFilter(context.sourceFile, context.preferences, context.host);
    return info && sortFixInfo(info, context.sourceFile, context.program, packageJsonImportFilter, context.host, context.preferences);
}

function getBestFix(fixes: readonly ImportFixWithModuleSpecifier[], sourceFile: SourceFile | FutureSourceFile, program: Program, packageJsonImportFilter: PackageJsonImportFilter, host: LanguageServiceHost, preferences: UserPreferences): ImportFixWithModuleSpecifier | undefined {
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
                preferences,
                packageJsonImportFilter.allowsImportingSpecifier,
                fileName => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host)),
            ) === Comparison.LessThan ? fix : best
    );
}

/** @returns `Comparison.LessThan` if `a` is better than `b`. */
function compareModuleSpecifiers(
    a: ImportFixWithModuleSpecifier,
    b: ImportFixWithModuleSpecifier,
    importingFile: SourceFile | FutureSourceFile,
    program: Program,
    preferences: UserPreferences,
    allowsImportingSpecifier: (specifier: string) => boolean,
    toPath: (fileName: string) => Path,
): Comparison {
    if (a.kind !== ImportFixKind.UseNamespace && b.kind !== ImportFixKind.UseNamespace) {
        return compareBooleans(
            b.moduleSpecifierKind !== "node_modules" || allowsImportingSpecifier(b.moduleSpecifier),
            a.moduleSpecifierKind !== "node_modules" || allowsImportingSpecifier(a.moduleSpecifier),
        )
            || compareModuleSpecifierRelativity(a, b, preferences)
            || compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program)
            || compareBooleans(
                isFixPossiblyReExportingImportingFile(a, importingFile.path, toPath),
                isFixPossiblyReExportingImportingFile(b, importingFile.path, toPath),
            )
            || compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier);
    }
    return Comparison.EqualTo;
}

function compareModuleSpecifierRelativity(a: ImportFixWithModuleSpecifier, b: ImportFixWithModuleSpecifier, preferences: UserPreferences): Comparison {
    if (preferences.importModuleSpecifierPreference === "non-relative" || preferences.importModuleSpecifierPreference === "project-relative") {
        return compareBooleans(a.moduleSpecifierKind === "relative", b.moduleSpecifierKind === "relative");
    }
    return Comparison.EqualTo;
}

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index".
function isFixPossiblyReExportingImportingFile(fix: ImportFixWithModuleSpecifier, importingFilePath: Path, toPath: (fileName: string) => Path): boolean {
    if (
        fix.isReExport &&
        fix.exportInfo?.moduleFileName &&
        isIndexFileName(fix.exportInfo.moduleFileName)
    ) {
        const reExportDir = toPath(getDirectoryPath(fix.exportInfo.moduleFileName));
        return startsWith(importingFilePath, reExportDir);
    }
    return false;
}

function isIndexFileName(fileName: string) {
    return getBaseFileName(fileName, [".js", ".jsx", ".d.ts", ".ts", ".tsx"], /*ignoreCase*/ true) === "index";
}

function compareNodeCoreModuleSpecifiers(a: string, b: string, importingFile: SourceFile | FutureSourceFile, program: Program): Comparison {
    if (startsWith(a, "node:") && !startsWith(b, "node:")) return shouldUseUriStyleNodeCoreModules(importingFile, program) ? Comparison.LessThan : Comparison.GreaterThan;
    if (startsWith(b, "node:") && !startsWith(a, "node:")) return shouldUseUriStyleNodeCoreModules(importingFile, program) ? Comparison.GreaterThan : Comparison.LessThan;
    return Comparison.EqualTo;
}

function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }: CodeFixContextBase, token: Node): (FixInfo & { fix: ImportFixWithModuleSpecifier; })[] | undefined {
    const checker = program.getTypeChecker();
    const umdSymbol = getUmdSymbol(token, checker);
    if (!umdSymbol) return undefined;
    const symbol = checker.getAliasedSymbol(umdSymbol);
    const symbolName = umdSymbol.name;
    const exportInfo: readonly SymbolExportInfo[] = [{ symbol: umdSymbol, moduleSymbol: symbol, moduleFileName: undefined, exportKind: ExportKind.UMD, targetFlags: symbol.flags, isFromPackageJson: false }];
    const useRequire = shouldUseRequire(sourceFile, program);
    // `usagePosition` is undefined because `token` may not actually be a usage of the symbol we're importing.
    // For example, we might need to import `React` in order to use an arbitrary JSX tag. We could send a position
    // for other UMD imports, but `usagePosition` is currently only used to insert a namespace qualification
    // before a named import, like converting `writeFile` to `fs.writeFile` (whether `fs` is already imported or
    // not), and this function will only be called for UMD symbols, which are necessarily an `export =`, not a
    // named export.
    const fixes = getImportFixes(exportInfo, /*usagePosition*/ undefined, /*isValidTypeOnlyUseSite*/ false, useRequire, program, sourceFile, host, preferences).fixes;
    return fixes.map(fix => ({ fix, symbolName, errorIdentifierText: tryCast(token, isIdentifier)?.text }));
}
function getUmdSymbol(token: Node, checker: TypeChecker): Symbol | undefined {
    // try the identifier to see if it is the umd symbol
    const umdSymbol = isIdentifier(token) ? checker.getSymbolAtLocation(token) : undefined;
    if (isUMDExportSymbol(umdSymbol)) return umdSymbol;

    // The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
    const { parent } = token;
    if ((isJsxOpeningLikeElement(parent) && parent.tagName === token) || isJsxOpeningFragment(parent)) {
        const parentSymbol = checker.resolveName(checker.getJsxNamespace(parent), isJsxOpeningLikeElement(parent) ? token : parent, SymbolFlags.Value, /*excludeGlobals*/ false);
        if (isUMDExportSymbol(parentSymbol)) {
            return parentSymbol;
        }
    }
    return undefined;
}

/**
 * @param forceImportKeyword Indicates that the user has already typed `import`, so the result must start with `import`.
 * (In other words, do not allow `const x = require("...")` for JS files.)
 *
 * @internal
 */
export function getImportKind(importingFile: SourceFile | FutureSourceFile, exportKind: ExportKind, program: Program, forceImportKeyword?: boolean): ImportKind {
    if (program.getCompilerOptions().verbatimModuleSyntax && getEmitModuleFormatOfFile(importingFile, program) === ModuleKind.CommonJS) {
        // TODO: if the exporting file is ESM under nodenext, or `forceImport` is given in a JS file, this is impossible
        return ImportKind.CommonJS;
    }
    switch (exportKind) {
        case ExportKind.Named:
            return ImportKind.Named;
        case ExportKind.Default:
            return ImportKind.Default;
        case ExportKind.ExportEquals:
            return getExportEqualsImportKind(importingFile, program.getCompilerOptions(), !!forceImportKeyword);
        case ExportKind.UMD:
            return getUmdImportKind(importingFile, program, !!forceImportKeyword);
        default:
            return Debug.assertNever(exportKind);
    }
}

function getUmdImportKind(importingFile: SourceFile | FutureSourceFile, program: Program, forceImportKeyword: boolean): ImportKind {
    // Import a synthetic `default` if enabled.
    if (getAllowSyntheticDefaultImports(program.getCompilerOptions())) {
        return ImportKind.Default;
    }

    // When a synthetic `default` is unavailable, use `import..require` if the module kind supports it.
    const moduleKind = getEmitModuleKind(program.getCompilerOptions());
    switch (moduleKind) {
        case ModuleKind.AMD:
        case ModuleKind.CommonJS:
        case ModuleKind.UMD:
            if (hasJSFileExtension(importingFile.fileName)) {
                return importingFile.externalModuleIndicator || forceImportKeyword ? ImportKind.Namespace : ImportKind.CommonJS;
            }
            return ImportKind.CommonJS;
        case ModuleKind.System:
        case ModuleKind.ES2015:
        case ModuleKind.ES2020:
        case ModuleKind.ES2022:
        case ModuleKind.ESNext:
        case ModuleKind.None:
        case ModuleKind.Preserve:
            // Fall back to the `import * as ns` style import.
            return ImportKind.Namespace;
        case ModuleKind.Node16:
        case ModuleKind.NodeNext:
            return getImpliedNodeFormatForEmit(importingFile, program) === ModuleKind.ESNext ? ImportKind.Namespace : ImportKind.CommonJS;
        default:
            return Debug.assertNever(moduleKind, `Unexpected moduleKind ${moduleKind}`);
    }
}

function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean): readonly (FixInfo & { fix: ImportFixWithModuleSpecifier; })[] | undefined {
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
        return arrayFrom(
            flatMapIterator(exportInfo.values(), exportInfos => getImportFixes(exportInfos, symbolToken.getStart(sourceFile), isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes),
            fix => ({ fix, symbolName, errorIdentifierText: symbolToken.text, isJsxNamespaceFix: symbolName !== symbolToken.text }),
        );
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
    const originalSymbolToExportInfos = createMultiMap<string, SymbolExportInfo>();
    const packageJsonFilter = createPackageJsonImportFilter(fromFile, preferences, host);
    const moduleSpecifierCache = host.getModuleSpecifierCache?.();
    const getModuleSpecifierResolutionHost = memoizeOne((isFromPackageJson: boolean) => {
        return createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider!()! : program, host);
    });
    function addSymbol(moduleSymbol: Symbol, toFile: SourceFile | undefined, exportedSymbol: Symbol, exportKind: ExportKind, program: Program, isFromPackageJson: boolean): void {
        const moduleSpecifierResolutionHost = getModuleSpecifierResolutionHost(isFromPackageJson);
        if (
            toFile && isImportableFile(program, fromFile, toFile, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) ||
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
        const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker);
        if (
            defaultInfo
            && symbolFlagsHaveMeaning(checker.getSymbolFlags(defaultInfo.symbol), currentTokenMeaning)
            && forEachNameOfDefaultExport(defaultInfo.symbol, checker, getEmitScriptTarget(compilerOptions), (name, capitalizedName) => (isJsxTagName ? capitalizedName ?? name : name) === symbolName)
        ) {
            addSymbol(moduleSymbol, sourceFile, defaultInfo.symbol, defaultInfo.exportKind, program, isFromPackageJson);
        }

        // check exports with the same name
        const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
        if (exportSymbolWithIdenticalName && symbolFlagsHaveMeaning(checker.getSymbolFlags(exportSymbolWithIdenticalName), currentTokenMeaning)) {
            addSymbol(moduleSymbol, sourceFile, exportSymbolWithIdenticalName, ExportKind.Named, program, isFromPackageJson);
        }
    });
    return originalSymbolToExportInfos;
}

function getExportEqualsImportKind(importingFile: SourceFile | FutureSourceFile, compilerOptions: CompilerOptions, forceImportKeyword: boolean): ImportKind {
    const allowSyntheticDefaults = getAllowSyntheticDefaultImports(compilerOptions);
    const isJS = hasJSFileExtension(importingFile.fileName);
    // 1. 'import =' will not work in es2015+ TS files, so the decision is between a default
    //    and a namespace import, based on allowSyntheticDefaultImports/esModuleInterop.
    if (!isJS && getEmitModuleKind(compilerOptions) >= ModuleKind.ES2015) {
        return allowSyntheticDefaults ? ImportKind.Default : ImportKind.Namespace;
    }
    // 2. 'import =' will not work in JavaScript, so the decision is between a default import,
    //    a namespace import, and const/require.
    if (isJS) {
        return importingFile.externalModuleIndicator || forceImportKeyword
            ? allowSyntheticDefaults ? ImportKind.Default : ImportKind.Namespace
            : ImportKind.CommonJS;
    }
    // 3. At this point the most correct choice is probably 'import =', but people
    //    really hate that, so look to see if the importing file has any precedent
    //    on how to handle it.
    for (const statement of importingFile.statements ?? emptyArray) {
        // `import foo` parses as an ImportEqualsDeclaration even though it could be an ImportDeclaration
        if (isImportEqualsDeclaration(statement) && !nodeIsMissing(statement.moduleReference)) {
            return ImportKind.CommonJS;
        }
    }
    // 4. We have no precedent to go on, so just use a default import if
    //    allowSyntheticDefaultImports/esModuleInterop is enabled.
    return allowSyntheticDefaults ? ImportKind.Default : ImportKind.CommonJS;
}

function codeActionForFix(
    context: textChanges.TextChangesContext,
    sourceFile: SourceFile,
    symbolName: string,
    fix: ImportFix,
    includeSymbolNameInDescription: boolean,
    program: Program,
    preferences: UserPreferences,
): CodeFixAction {
    let diag!: DiagnosticOrDiagnosticAndArguments;
    const changes = textChanges.ChangeTracker.with(context, tracker => {
        diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, includeSymbolNameInDescription, program, preferences);
    });
    return createCodeFixAction(importFixName, changes, diag, importFixId, Diagnostics.Add_all_missing_imports);
}
function codeActionForFixWorker(
    changes: textChanges.ChangeTracker,
    sourceFile: SourceFile,
    symbolName: string,
    fix: ImportFix,
    includeSymbolNameInDescription: boolean,
    program: Program,
    preferences: UserPreferences,
): DiagnosticOrDiagnosticAndArguments {
    const quotePreference = getQuotePreference(sourceFile, preferences);
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
                /*removeExistingImportSpecifiers*/ undefined,
                preferences,
            );
            const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
            return includeSymbolNameInDescription
                ? [Diagnostics.Import_0_from_1, symbolName, moduleSpecifierWithoutQuotes]
                : [Diagnostics.Update_import_from_0, moduleSpecifierWithoutQuotes];
        }
        case ImportFixKind.AddNew: {
            const { importKind, moduleSpecifier, addAsTypeOnly, useRequire, qualification } = fix;
            const getDeclarations = useRequire ? getNewRequires : getNewImports;
            const defaultImport: Import | undefined = importKind === ImportKind.Default ? { name: symbolName, addAsTypeOnly } : undefined;
            const namedImports: Import[] | undefined = importKind === ImportKind.Named ? [{ name: symbolName, addAsTypeOnly }] : undefined;
            const namespaceLikeImport = importKind === ImportKind.Namespace || importKind === ImportKind.CommonJS
                ? { importKind, name: qualification?.namespacePrefix || symbolName, addAsTypeOnly }
                : undefined;
            insertImports(
                changes,
                sourceFile,
                getDeclarations(
                    moduleSpecifier,
                    quotePreference,
                    defaultImport,
                    namedImports,
                    namespaceLikeImport,
                    program.getCompilerOptions(),
                    preferences,
                ),
                /*blankLineBetween*/ true,
                preferences,
            );
            if (qualification) {
                addNamespaceQualifier(changes, sourceFile, qualification);
            }
            return includeSymbolNameInDescription
                ? [Diagnostics.Import_0_from_1, symbolName, moduleSpecifier]
                : [Diagnostics.Add_import_from_0, moduleSpecifier];
        }
        case ImportFixKind.PromoteTypeOnly: {
            const { typeOnlyAliasDeclaration } = fix;
            const promotedDeclaration = promoteFromTypeOnly(changes, typeOnlyAliasDeclaration, program, sourceFile, preferences);
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

function promoteFromTypeOnly(
    changes: textChanges.ChangeTracker,
    aliasDeclaration: TypeOnlyAliasDeclaration,
    program: Program,
    sourceFile: SourceFile,
    preferences: UserPreferences,
) {
    const compilerOptions = program.getCompilerOptions();
    // See comment in `doAddExistingFix` on constant with the same name.
    const convertExistingToTypeOnly = compilerOptions.verbatimModuleSyntax;
    switch (aliasDeclaration.kind) {
        case SyntaxKind.ImportSpecifier:
            if (aliasDeclaration.isTypeOnly) {
                if (aliasDeclaration.parent.elements.length > 1) {
                    const newSpecifier = factory.updateImportSpecifier(aliasDeclaration, /*isTypeOnly*/ false, aliasDeclaration.propertyName, aliasDeclaration.name);
                    const { specifierComparer } = OrganizeImports.getNamedImportSpecifierComparerWithDetection(aliasDeclaration.parent.parent.parent, preferences, sourceFile);
                    const insertionIndex = OrganizeImports.getImportSpecifierInsertionIndex(aliasDeclaration.parent.elements, newSpecifier, specifierComparer);
                    if (insertionIndex !== aliasDeclaration.parent.elements.indexOf(aliasDeclaration)) {
                        changes.delete(sourceFile, aliasDeclaration);
                        changes.insertImportSpecifierAtIndex(sourceFile, newSpecifier, aliasDeclaration.parent, insertionIndex);
                        return aliasDeclaration;
                    }
                }
                changes.deleteRange(sourceFile, { pos: getTokenPosOfNode(aliasDeclaration.getFirstToken()!), end: getTokenPosOfNode(aliasDeclaration.propertyName ?? aliasDeclaration.name) });
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
        // Change .ts extension to .js if necessary
        if (!compilerOptions.allowImportingTsExtensions) {
            const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(importClause.parent);
            const resolvedModule = moduleSpecifier && program.getResolvedModuleFromModuleSpecifier(moduleSpecifier, sourceFile)?.resolvedModule;
            if (resolvedModule?.resolvedUsingTsExtension) {
                const changedExtension = changeAnyExtension(moduleSpecifier!.text, getOutputExtension(moduleSpecifier!.text, compilerOptions));
                changes.replaceNode(sourceFile, moduleSpecifier!, factory.createStringLiteral(changedExtension));
            }
        }
        if (convertExistingToTypeOnly) {
            const namedImports = tryCast(importClause.namedBindings, isNamedImports);
            if (namedImports && namedImports.elements.length > 1) {
                const sortState = OrganizeImports.getNamedImportSpecifierComparerWithDetection(importClause.parent, preferences, sourceFile);
                if (
                    (sortState.isSorted !== false) &&
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
    removeExistingImportSpecifiers: Set<ImportSpecifier | BindingElement> | undefined,
    preferences: UserPreferences,
): void {
    if (clause.kind === SyntaxKind.ObjectBindingPattern) {
        if (removeExistingImportSpecifiers && clause.elements.some(e => removeExistingImportSpecifiers.has(e))) {
            // If we're both adding and removing elements, just replace and reprint the whole
            // node. The change tracker doesn't understand all the operations and can insert or
            // leave behind stray commas.
            changes.replaceNode(
                sourceFile,
                clause,
                factory.createObjectBindingPattern([
                    ...clause.elements.filter(e => !removeExistingImportSpecifiers.has(e)),
                    ...defaultImport ? [factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ "default", defaultImport.name)] : emptyArray,
                    ...namedImports.map(i => factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, i.name)),
                ]),
            );
            return;
        }
        if (defaultImport) {
            addElementToBindingPattern(clause, defaultImport.name, "default");
        }
        for (const specifier of namedImports) {
            addElementToBindingPattern(clause, specifier.name, /*propertyName*/ undefined);
        }
        return;
    }

    // promoteFromTypeOnly = true if we need to promote the entire original clause from type only
    const promoteFromTypeOnly = clause.isTypeOnly && some([defaultImport, ...namedImports], i => i?.addAsTypeOnly === AddAsTypeOnly.NotAllowed);
    const existingSpecifiers = clause.namedBindings && tryCast(clause.namedBindings, isNamedImports)?.elements;

    if (defaultImport) {
        Debug.assert(!clause.name, "Cannot add a default import to an import clause that already has one");
        changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), factory.createIdentifier(defaultImport.name), { suffix: ", " });
    }

    if (namedImports.length) {
        const { specifierComparer, isSorted } = OrganizeImports.getNamedImportSpecifierComparerWithDetection(clause.parent, preferences, sourceFile);
        const newSpecifiers = toSorted(
            namedImports.map(namedImport =>
                factory.createImportSpecifier(
                    (!clause.isTypeOnly || promoteFromTypeOnly) && shouldUseTypeOnly(namedImport, preferences),
                    /*propertyName*/ undefined,
                    factory.createIdentifier(namedImport.name),
                )
            ),
            specifierComparer,
        );

        if (removeExistingImportSpecifiers) {
            // If we're both adding and removing specifiers, just replace and reprint the whole
            // node. The change tracker doesn't understand all the operations and can insert or
            // leave behind stray commas.
            changes.replaceNode(
                sourceFile,
                clause.namedBindings!,
                factory.updateNamedImports(
                    clause.namedBindings as NamedImports,
                    toSorted([...existingSpecifiers!.filter(s => !removeExistingImportSpecifiers.has(s)), ...newSpecifiers], specifierComparer),
                ),
            );
        }
        // The sorting preference computed earlier may or may not have validated that these particular
        // import specifiers are sorted. If they aren't, `getImportSpecifierInsertionIndex` will return
        // nonsense. So if there are existing specifiers, even if we know the sorting preference, we
        // need to ensure that the existing specifiers are sorted according to the preference in order
        // to do a sorted insertion.

        // changed to check if existing specifiers are sorted
        else if (existingSpecifiers?.length && isSorted !== false) {
            // if we're promoting the clause from type-only, we need to transform the existing imports before attempting to insert the new named imports
            const transformedExistingSpecifiers = (promoteFromTypeOnly && existingSpecifiers) ? factory.updateNamedImports(
                clause.namedBindings as NamedImports,
                sameMap(existingSpecifiers, e => factory.updateImportSpecifier(e, /*isTypeOnly*/ true, e.propertyName, e.name)),
            ).elements : existingSpecifiers;
            for (const spec of newSpecifiers) {
                const insertionIndex = OrganizeImports.getImportSpecifierInsertionIndex(transformedExistingSpecifiers, spec, specifierComparer);
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
        if (existingSpecifiers) {
            // We used to convert existing specifiers to type-only only if compiler options indicated that
            // would be meaningful (see the `importNameElisionDisabled` utility function), but user
            // feedback indicated a preference for preserving the type-onlyness of existing specifiers
            // regardless of whether it would make a difference in emit.
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

function addNamespaceQualifier(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { namespacePrefix, usagePosition }: Qualification): void {
    changes.insertText(sourceFile, usagePosition, namespacePrefix + ".");
}

function addImportType(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { moduleSpecifier, usagePosition: position }: FixAddJsdocTypeImport, quotePreference: QuotePreference): void {
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

function needsTypeOnly({ addAsTypeOnly }: { addAsTypeOnly: AddAsTypeOnly; }): boolean {
    return addAsTypeOnly === AddAsTypeOnly.Required;
}

function shouldUseTypeOnly(info: { addAsTypeOnly: AddAsTypeOnly; }, preferences: UserPreferences): boolean {
    return needsTypeOnly(info) || !!preferences.preferTypeOnlyAutoImports && info.addAsTypeOnly !== AddAsTypeOnly.NotAllowed;
}

function getNewImports(
    moduleSpecifier: string,
    quotePreference: QuotePreference,
    defaultImport: Import | undefined,
    namedImports: readonly Import[] | undefined,
    namespaceLikeImport: Import & { importKind: ImportKind.CommonJS | ImportKind.Namespace; } | undefined,
    compilerOptions: CompilerOptions,
    preferences: UserPreferences,
): AnyImportSyntax | readonly AnyImportSyntax[] {
    const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
    let statements: AnyImportSyntax | readonly AnyImportSyntax[] | undefined;
    if (defaultImport !== undefined || namedImports?.length) {
        // `verbatimModuleSyntax` should prefer top-level `import type` -
        // even though it's not an error, it would add unnecessary runtime emit.
        const topLevelTypeOnly = (!defaultImport || needsTypeOnly(defaultImport)) && every(namedImports, needsTypeOnly) ||
            (compilerOptions.verbatimModuleSyntax || preferences.preferTypeOnlyAutoImports) &&
                defaultImport?.addAsTypeOnly !== AddAsTypeOnly.NotAllowed &&
                !some(namedImports, i => i.addAsTypeOnly === AddAsTypeOnly.NotAllowed);
        statements = combine(
            statements,
            makeImport(
                defaultImport && factory.createIdentifier(defaultImport.name),
                namedImports?.map(namedImport =>
                    factory.createImportSpecifier(
                        !topLevelTypeOnly && shouldUseTypeOnly(namedImport, preferences),
                        /*propertyName*/ undefined,
                        factory.createIdentifier(namedImport.name),
                    )
                ),
                moduleSpecifier,
                quotePreference,
                topLevelTypeOnly,
            ),
        );
    }

    if (namespaceLikeImport) {
        const declaration = namespaceLikeImport.importKind === ImportKind.CommonJS
            ? factory.createImportEqualsDeclaration(
                /*modifiers*/ undefined,
                shouldUseTypeOnly(namespaceLikeImport, preferences),
                factory.createIdentifier(namespaceLikeImport.name),
                factory.createExternalModuleReference(quotedModuleSpecifier),
            )
            : factory.createImportDeclaration(
                /*modifiers*/ undefined,
                factory.createImportClause(
                    shouldUseTypeOnly(namespaceLikeImport, preferences),
                    /*name*/ undefined,
                    factory.createNamespaceImport(factory.createIdentifier(namespaceLikeImport.name)),
                ),
                quotedModuleSpecifier,
                /*attributes*/ undefined,
            );
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
                factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, [quotedModuleSpecifier]),
            ),
        ], NodeFlags.Const),
    ) as RequireVariableStatement;
}

function symbolFlagsHaveMeaning(flags: SymbolFlags, meaning: SemanticMeaning): boolean {
    return meaning === SemanticMeaning.All ? true :
        meaning & SemanticMeaning.Value ? !!(flags & SymbolFlags.Value) :
        meaning & SemanticMeaning.Type ? !!(flags & SymbolFlags.Type) :
        meaning & SemanticMeaning.Namespace ? !!(flags & SymbolFlags.Namespace) :
        false;
}

function getImpliedNodeFormatForEmit(file: SourceFile | FutureSourceFile, program: Program) {
    return isFullSourceFile(file) ? program.getImpliedNodeFormatForEmit(file) : getImpliedNodeFormatForEmitWorker(file, program.getCompilerOptions());
}

function getEmitModuleFormatOfFile(file: SourceFile | FutureSourceFile, program: Program) {
    return isFullSourceFile(file) ? program.getEmitModuleFormatOfFile(file) : getEmitModuleFormatOfFileWorker(file, program.getCompilerOptions());
}

/* @internal */
namespace ts.codefix {
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
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { errorCode, preferences, sourceFile, span } = context;
            const info = getFixesInfo(context, errorCode, span.start, /*useAutoImportProvider*/ true);
            if (!info) return undefined;
            const { fixes, symbolName } = info;
            const quotePreference = getQuotePreference(sourceFile, preferences);
            return fixes.map(fix => codeActionForFix(context, sourceFile, symbolName, fix, quotePreference));
        },
        fixIds: [importFixId],
        getAllCodeActions: context => {
            const { sourceFile, program, preferences, host } = context;
            const importAdder = createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ true, preferences, host);
            eachDiagnostic(context, errorCodes, diag => importAdder.addImportFromDiagnostic(diag, context));
            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, importAdder.writeFixes));
        },
    });

    export interface ImportAdder {
        addImportFromDiagnostic: (diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) => void;
        addImportFromExportedSymbol: (exportedSymbol: Symbol, usageIsTypeOnly?: boolean) => void;
        writeFixes: (changeTracker: textChanges.ChangeTracker) => void;
    }

    export function createImportAdder(sourceFile: SourceFile, program: Program, preferences: UserPreferences, host: LanguageServiceHost): ImportAdder {
        return createImportAdderWorker(sourceFile, program, /*useAutoImportProvider*/ false, preferences, host);
    }

    function createImportAdderWorker(sourceFile: SourceFile, program: Program, useAutoImportProvider: boolean, preferences: UserPreferences, host: LanguageServiceHost): ImportAdder {
        const compilerOptions = program.getCompilerOptions();
        // Namespace fixes don't conflict, so just build a list.
        const addToNamespace: FixUseNamespaceImport[] = [];
        const importType: FixUseImportType[] = [];
        // Keys are import clause node IDs.
        const addToExisting = new Map<string, { readonly importClauseOrBindingPattern: ImportClause | ObjectBindingPattern, defaultImport: string | undefined; readonly namedImports: string[], canUseTypeOnlyImport: boolean }>();
        const newImports = new Map<string, Mutable<ImportsCollection & { useRequire: boolean }>>();
        return { addImportFromDiagnostic, addImportFromExportedSymbol, writeFixes };

        function addImportFromDiagnostic(diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) {
            const info = getFixesInfo(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
            if (!info || !info.fixes.length) return;
            addImport(info);
        }

        function addImportFromExportedSymbol(exportedSymbol: Symbol, usageIsTypeOnly?: boolean) {
            const moduleSymbol = Debug.checkDefined(exportedSymbol.parent);
            const symbolName = getNameForExportedSymbol(exportedSymbol, getEmitScriptTarget(compilerOptions));
            const checker = program.getTypeChecker();
            const symbol = checker.getMergedSymbol(skipAlias(exportedSymbol, checker));
            const exportInfos = getAllReExportingModules(sourceFile, symbol, moduleSymbol, symbolName, host, program, useAutoImportProvider);
            const preferTypeOnlyImport = !!usageIsTypeOnly && compilerOptions.importsNotUsedAsValues === ImportsNotUsedAsValues.Error;
            const useRequire = shouldUseRequire(sourceFile, compilerOptions);
            const fix = getImportFixForSymbol(sourceFile, exportInfos, moduleSymbol, symbolName, program, /*position*/ undefined, preferTypeOnlyImport, useRequire, host, preferences);
            addImport({ fixes: [fix], symbolName });
        }

        function addImport(info: FixesInfo) {
            const { fixes, symbolName } = info;
            const fix = first(fixes);
            switch (fix.kind) {
                case ImportFixKind.UseNamespace:
                    addToNamespace.push(fix);
                    break;
                case ImportFixKind.ImportType:
                    importType.push(fix);
                    break;
                case ImportFixKind.AddToExisting: {
                    const { importClauseOrBindingPattern, importKind, canUseTypeOnlyImport } = fix;
                    const key = String(getNodeId(importClauseOrBindingPattern));
                    let entry = addToExisting.get(key);
                    if (!entry) {
                        addToExisting.set(key, entry = { importClauseOrBindingPattern, defaultImport: undefined, namedImports: [], canUseTypeOnlyImport });
                    }
                    if (importKind === ImportKind.Named) {
                        pushIfUnique(entry.namedImports, symbolName);
                    }
                    else {
                        Debug.assert(entry.defaultImport === undefined || entry.defaultImport === symbolName, "(Add to Existing) Default import should be missing or match symbolName");
                        entry.defaultImport = symbolName;
                    }
                    break;
                }
                case ImportFixKind.AddNew: {
                    const { moduleSpecifier, importKind, useRequire, typeOnly } = fix;
                    let entry = newImports.get(moduleSpecifier);
                    if (!entry) {
                        newImports.set(moduleSpecifier, entry = { namedImports: [], namespaceLikeImport: undefined, typeOnly, useRequire });
                    }
                    else {
                        // An import clause can only be type-only if every import fix contributing to it can be type-only.
                        entry.typeOnly = entry.typeOnly && typeOnly;
                    }
                    switch (importKind) {
                        case ImportKind.Default:
                            Debug.assert(entry.defaultImport === undefined || entry.defaultImport === symbolName, "(Add new) Default import should be missing or match symbolName");
                            entry.defaultImport = symbolName;
                            break;
                        case ImportKind.Named:
                            pushIfUnique(entry.namedImports || (entry.namedImports = []), symbolName);
                            break;
                        case ImportKind.CommonJS:
                        case ImportKind.Namespace:
                            Debug.assert(entry.namespaceLikeImport === undefined || entry.namespaceLikeImport.name === symbolName, "Namespacelike import shoudl be missing or match symbolName");
                            entry.namespaceLikeImport = { importKind, name: symbolName };
                            break;
                    }
                    break;
                }
                default:
                    Debug.assertNever(fix, `fix wasn't never - got kind ${(fix as ImportFix).kind}`);
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
            addToExisting.forEach(({ importClauseOrBindingPattern, defaultImport, namedImports, canUseTypeOnlyImport }) => {
                doAddExistingFix(changeTracker, sourceFile, importClauseOrBindingPattern, defaultImport, namedImports, canUseTypeOnlyImport);
            });

            let newDeclarations: Statement | readonly Statement[] | undefined;
            newImports.forEach(({ useRequire, ...imports }, moduleSpecifier) => {
                const getDeclarations = useRequire ? getNewRequires : getNewImports;
                newDeclarations = combine(newDeclarations, getDeclarations(moduleSpecifier, quotePreference, imports));
            });
            if (newDeclarations) {
                insertImports(changeTracker, sourceFile, newDeclarations, /*blankLineBetween*/ true);
            }
        }
    }

    // Sorted with the preferred fix coming first.
    const enum ImportFixKind { UseNamespace, ImportType, AddToExisting, AddNew }
    type ImportFix = FixUseNamespaceImport | FixUseImportType | FixAddToExistingImport | FixAddNewImport;
    interface FixUseNamespaceImport {
        readonly kind: ImportFixKind.UseNamespace;
        readonly namespacePrefix: string;
        readonly position: number;
    }
    interface FixUseImportType {
        readonly kind: ImportFixKind.ImportType;
        readonly moduleSpecifier: string;
        readonly position: number;
    }
    interface FixAddToExistingImport {
        readonly kind: ImportFixKind.AddToExisting;
        readonly importClauseOrBindingPattern: ImportClause | ObjectBindingPattern;
        readonly moduleSpecifier: string;
        readonly importKind: ImportKind.Default | ImportKind.Named;
        readonly canUseTypeOnlyImport: boolean;
    }
    interface FixAddNewImport {
        readonly kind: ImportFixKind.AddNew;
        readonly moduleSpecifier: string;
        readonly importKind: ImportKind;
        readonly typeOnly: boolean;
        readonly useRequire: boolean;
    }

    const enum ImportKind {
        Named,
        Default,
        Namespace,
        CommonJS,
    }

    /** Information about how a symbol is exported from a module. (We don't need to store the exported symbol, just its module.) */
    interface SymbolExportInfo {
        readonly moduleSymbol: Symbol;
        readonly importKind: ImportKind;
        /** If true, can't use an es6 import from a js file. */
        readonly exportedSymbolIsTypeOnly: boolean;
    }

    /** Information needed to augment an existing import declaration. */
    interface FixAddToExistingImportInfo {
        readonly declaration: AnyImportOrRequire;
        readonly importKind: ImportKind;
    }

    export function getImportCompletionAction(
        exportedSymbol: Symbol,
        moduleSymbol: Symbol,
        sourceFile: SourceFile,
        symbolName: string,
        host: LanguageServiceHost,
        program: Program,
        formatContext: formatting.FormatContext,
        position: number,
        preferences: UserPreferences,
    ): { readonly moduleSpecifier: string, readonly codeAction: CodeAction } {
        const compilerOptions = program.getCompilerOptions();
        const exportInfos = getAllReExportingModules(sourceFile, exportedSymbol, moduleSymbol, symbolName, host, program, /*useAutoImportProvider*/ true);
        const useRequire = shouldUseRequire(sourceFile, compilerOptions);
        const preferTypeOnlyImport = compilerOptions.importsNotUsedAsValues === ImportsNotUsedAsValues.Error && !isSourceFileJS(sourceFile) && isValidTypeOnlyAliasUseSite(getTokenAtPosition(sourceFile, position));
        const moduleSpecifier = first(getNewImportInfos(program, sourceFile, position, preferTypeOnlyImport, useRequire, exportInfos, host, preferences)).moduleSpecifier;
        const fix = getImportFixForSymbol(sourceFile, exportInfos, moduleSymbol, symbolName, program, position, preferTypeOnlyImport, useRequire, host, preferences);
        return { moduleSpecifier, codeAction: codeFixActionToCodeAction(codeActionForFix({ host, formatContext, preferences }, sourceFile, symbolName, fix, getQuotePreference(sourceFile, preferences))) };
    }

    function getImportFixForSymbol(sourceFile: SourceFile, exportInfos: readonly SymbolExportInfo[], moduleSymbol: Symbol, symbolName: string, program: Program, position: number | undefined, preferTypeOnlyImport: boolean, useRequire: boolean, host: LanguageServiceHost, preferences: UserPreferences) {
        Debug.assert(exportInfos.some(info => info.moduleSymbol === moduleSymbol), "Some exportInfo should match the specified moduleSymbol");
        // We sort the best codefixes first, so taking `first` is best.
        return first(getFixForImport(exportInfos, symbolName, position, preferTypeOnlyImport, useRequire, program, sourceFile, host, preferences));
    }

    function codeFixActionToCodeAction({ description, changes, commands }: CodeFixAction): CodeAction {
        return { description, changes, commands };
    }

    function getAllReExportingModules(importingFile: SourceFile, exportedSymbol: Symbol, exportingModuleSymbol: Symbol, symbolName: string, host: LanguageServiceHost, program: Program, useAutoImportProvider: boolean): readonly SymbolExportInfo[] {
        const result: SymbolExportInfo[] = [];
        const compilerOptions = program.getCompilerOptions();
        forEachExternalModuleToImportFrom(program, host, importingFile, /*filterByPackageJson*/ false, useAutoImportProvider, (moduleSymbol, moduleFile, program) => {
            const checker = program.getTypeChecker();
            // Don't import from a re-export when looking "up" like to `./index` or `../index`.
            if (moduleFile && moduleSymbol !== exportingModuleSymbol && startsWith(importingFile.fileName, getDirectoryPath(moduleFile.fileName))) {
                return;
            }

            const defaultInfo = getDefaultLikeExportInfo(importingFile, moduleSymbol, checker, compilerOptions);
            if (defaultInfo && defaultInfo.name === symbolName && skipAlias(defaultInfo.symbol, checker) === exportedSymbol) {
                result.push({ moduleSymbol, importKind: defaultInfo.kind, exportedSymbolIsTypeOnly: isTypeOnlySymbol(defaultInfo.symbol, checker) });
            }

            for (const exported of checker.getExportsAndPropertiesOfModule(moduleSymbol)) {
                if (exported.name === symbolName && skipAlias(exported, checker) === exportedSymbol) {
                    result.push({ moduleSymbol, importKind: ImportKind.Named, exportedSymbolIsTypeOnly: isTypeOnlySymbol(exported, checker) });
                }
            }
        });
        return result;
    }

    function isTypeOnlySymbol(s: Symbol, checker: TypeChecker): boolean {
        return !(skipAlias(s, checker).flags & SymbolFlags.Value);
    }

    function isTypeOnlyPosition(sourceFile: SourceFile, position: number) {
        return isValidTypeOnlyAliasUseSite(getTokenAtPosition(sourceFile, position));
    }

    function getFixForImport(
        exportInfos: readonly SymbolExportInfo[],
        symbolName: string,
        /** undefined only for missing JSX namespace */
        position: number | undefined,
        preferTypeOnlyImport: boolean,
        useRequire: boolean,
        program: Program,
        sourceFile: SourceFile,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): readonly ImportFix[] {
        const checker = program.getTypeChecker();
        const existingImports = flatMap(exportInfos, info => getExistingImportDeclarations(info, checker, sourceFile));
        const useNamespace = position === undefined ? undefined : tryUseExistingNamespaceImport(existingImports, symbolName, position, checker);
        const addToExisting = tryAddToExistingImport(existingImports, position !== undefined && isTypeOnlyPosition(sourceFile, position));
        // Don't bother providing an action to add a new import if we can add to an existing one.
        const addImport = addToExisting ? [addToExisting] : getFixesForAddImport(exportInfos, existingImports, program, sourceFile, position, preferTypeOnlyImport, useRequire, host, preferences);
        return [...(useNamespace ? [useNamespace] : emptyArray), ...addImport];
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
            if (namespacePrefix) {
                const moduleSymbol = getTargetModuleFromNamespaceLikeImport(declaration, checker);
                if (moduleSymbol && moduleSymbol.exports!.has(escapeLeadingUnderscores(symbolName))) {
                    return { kind: ImportFixKind.UseNamespace, namespacePrefix, position };
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

    function tryAddToExistingImport(existingImports: readonly FixAddToExistingImportInfo[], canUseTypeOnlyImport: boolean): FixAddToExistingImport | undefined {
        return firstDefined(existingImports, ({ declaration, importKind }): FixAddToExistingImport | undefined => {
            if (declaration.kind === SyntaxKind.ImportEqualsDeclaration) return undefined;
            if (declaration.kind === SyntaxKind.VariableDeclaration) {
                return (importKind === ImportKind.Named || importKind === ImportKind.Default) && declaration.name.kind === SyntaxKind.ObjectBindingPattern
                    ? { kind: ImportFixKind.AddToExisting, importClauseOrBindingPattern: declaration.name, importKind, moduleSpecifier: declaration.initializer.arguments[0].text, canUseTypeOnlyImport: false }
                    : undefined;
            }
            const { importClause } = declaration;
            if (!importClause) return undefined;
            const { name, namedBindings } = importClause;
            return importKind === ImportKind.Default && !name || importKind === ImportKind.Named && (!namedBindings || namedBindings.kind === SyntaxKind.NamedImports)
                ? { kind: ImportFixKind.AddToExisting, importClauseOrBindingPattern: importClause, importKind, moduleSpecifier: declaration.moduleSpecifier.getText(), canUseTypeOnlyImport }
                : undefined;
        });
    }

    function getExistingImportDeclarations({ moduleSymbol, importKind, exportedSymbolIsTypeOnly }: SymbolExportInfo, checker: TypeChecker, sourceFile: SourceFile): readonly FixAddToExistingImportInfo[] {
        // Can't use an es6 import for a type in JS.
        return exportedSymbolIsTypeOnly && isSourceFileJS(sourceFile) ? emptyArray : mapDefined(sourceFile.imports, (moduleSpecifier): FixAddToExistingImportInfo | undefined => {
            const i = importFromModuleSpecifier(moduleSpecifier);
            if (isRequireVariableDeclaration(i.parent, /*requireStringLiteralLikeArgument*/ true)) {
                return checker.resolveExternalModuleName(moduleSpecifier) === moduleSymbol ? { declaration: i.parent, importKind } : undefined;
            }
            if (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration) {
                return checker.getSymbolAtLocation(moduleSpecifier) === moduleSymbol ? { declaration: i, importKind } : undefined;
            }
        });
    }

    function shouldUseRequire(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean {
        return isSourceFileJS(sourceFile)
            && !sourceFile.externalModuleIndicator
            && (!!sourceFile.commonJsModuleIndicator || getEmitModuleKind(compilerOptions) < ModuleKind.ES2015);
    }

    function getNewImportInfos(
        program: Program,
        sourceFile: SourceFile,
        position: number | undefined,
        preferTypeOnlyImport: boolean,
        useRequire: boolean,
        moduleSymbols: readonly SymbolExportInfo[],
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): readonly (FixAddNewImport | FixUseImportType)[] {
        const isJs = isSourceFileJS(sourceFile);
        const compilerOptions = program.getCompilerOptions();
        const { allowsImportingSpecifier } = createAutoImportFilter(sourceFile, program, host);

        const choicesForEachExportingModule = flatMap(moduleSymbols, ({ moduleSymbol, importKind, exportedSymbolIsTypeOnly }) =>
            moduleSpecifiers.getModuleSpecifiers(moduleSymbol, compilerOptions, sourceFile, createModuleSpecifierResolutionHost(program, host) , preferences)
                .map((moduleSpecifier): FixAddNewImport | FixUseImportType =>
                    // `position` should only be undefined at a missing jsx namespace, in which case we shouldn't be looking for pure types.
                    exportedSymbolIsTypeOnly && isJs
                        ? { kind: ImportFixKind.ImportType, moduleSpecifier, position: Debug.checkDefined(position, "position should be defined") }
                        : { kind: ImportFixKind.AddNew, moduleSpecifier, importKind, useRequire, typeOnly: preferTypeOnlyImport }));

        // Sort by presence in package.json, then shortest paths first
        return sort(choicesForEachExportingModule, (a, b) => {
            const allowsImportingA = allowsImportingSpecifier(a.moduleSpecifier);
            const allowsImportingB = allowsImportingSpecifier(b.moduleSpecifier);
            if (allowsImportingA && !allowsImportingB) {
                return -1;
            }
            if (allowsImportingB && !allowsImportingA) {
                return 1;
            }
            return a.moduleSpecifier.length - b.moduleSpecifier.length;
        });
    }

    function getFixesForAddImport(
        exportInfos: readonly SymbolExportInfo[],
        existingImports: readonly FixAddToExistingImportInfo[],
        program: Program,
        sourceFile: SourceFile,
        position: number | undefined,
        preferTypeOnlyImport: boolean,
        useRequire: boolean,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): readonly (FixAddNewImport | FixUseImportType)[] {
        const existingDeclaration = firstDefined(existingImports, info => newImportInfoFromExistingSpecifier(info, preferTypeOnlyImport, useRequire));
        return existingDeclaration ? [existingDeclaration] : getNewImportInfos(program, sourceFile, position, preferTypeOnlyImport, useRequire, exportInfos, host, preferences);
    }

    function newImportInfoFromExistingSpecifier({ declaration, importKind }: FixAddToExistingImportInfo, preferTypeOnlyImport: boolean, useRequire: boolean): FixAddNewImport | undefined {
        const moduleSpecifier = declaration.kind === SyntaxKind.ImportDeclaration ? declaration.moduleSpecifier :
            declaration.kind === SyntaxKind.VariableDeclaration ? declaration.initializer.arguments[0] :
            declaration.moduleReference.kind === SyntaxKind.ExternalModuleReference ? declaration.moduleReference.expression :
            undefined;
        return moduleSpecifier && isStringLiteral(moduleSpecifier)
            ? { kind: ImportFixKind.AddNew, moduleSpecifier: moduleSpecifier.text, importKind, typeOnly: preferTypeOnlyImport, useRequire }
            : undefined;
    }

    interface FixesInfo { readonly fixes: readonly ImportFix[]; readonly symbolName: string; }
    function getFixesInfo(context: CodeFixContextBase, errorCode: number, pos: number, useAutoImportProvider: boolean): FixesInfo | undefined {
        const symbolToken = getTokenAtPosition(context.sourceFile, pos);
        const info = errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code
            ? getFixesInfoForUMDImport(context, symbolToken)
            : isIdentifier(symbolToken) ? getFixesInfoForNonUMDImport(context, symbolToken, useAutoImportProvider) : undefined;
        return info && { ...info, fixes: sort(info.fixes, (a, b) => a.kind - b.kind) };
    }

    function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }: CodeFixContextBase, token: Node): FixesInfo | undefined {
        const checker = program.getTypeChecker();
        const umdSymbol = getUmdSymbol(token, checker);
        if (!umdSymbol) return undefined;
        const symbol = checker.getAliasedSymbol(umdSymbol);
        const symbolName = umdSymbol.name;
        const exportInfos: readonly SymbolExportInfo[] = [{ moduleSymbol: symbol, importKind: getUmdImportKind(sourceFile, program.getCompilerOptions()), exportedSymbolIsTypeOnly: false }];
        const useRequire = shouldUseRequire(sourceFile, program.getCompilerOptions());
        const fixes = getFixForImport(exportInfos, symbolName, isIdentifier(token) ? token.getStart(sourceFile) : undefined, /*preferTypeOnlyImport*/ false, useRequire, program, sourceFile, host, preferences);
        return { fixes, symbolName };
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

    function getUmdImportKind(importingFile: SourceFile, compilerOptions: CompilerOptions): ImportKind {
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
                    return isExternalModule(importingFile) ? ImportKind.Namespace : ImportKind.CommonJS;
                }
                return ImportKind.CommonJS;
            case ModuleKind.System:
            case ModuleKind.ES2015:
            case ModuleKind.ES2020:
            case ModuleKind.ESNext:
            case ModuleKind.None:
                // Fall back to the `import * as ns` style import.
                return ImportKind.Namespace;
            default:
                return Debug.assertNever(moduleKind, `Unexpected moduleKind ${moduleKind}`);
        }
    }

    function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean): FixesInfo | undefined {
        const checker = program.getTypeChecker();
        // If we're at `<Foo/>`, we must check if `Foo` is already in scope, and if so, get an import for `React` instead.
        const symbolName = isJsxOpeningLikeElement(symbolToken.parent)
            && symbolToken.parent.tagName === symbolToken
            && (isIntrinsicJsxName(symbolToken.text) || checker.resolveName(symbolToken.text, symbolToken, SymbolFlags.All, /*excludeGlobals*/ false))
            ? checker.getJsxNamespace(sourceFile)
            : symbolToken.text;
        // "default" is a keyword and not a legal identifier for the import, so we don't expect it here
        Debug.assert(symbolName !== InternalSymbolName.Default, "'default' isn't a legal identifier and couldn't occur here");

        const compilerOptions = program.getCompilerOptions();
        const preferTypeOnlyImport = compilerOptions.importsNotUsedAsValues === ImportsNotUsedAsValues.Error && isValidTypeOnlyAliasUseSite(symbolToken);
        const useRequire = shouldUseRequire(sourceFile, compilerOptions);
        const exportInfos = getExportInfos(symbolName, getMeaningFromLocation(symbolToken), cancellationToken, sourceFile, checker, program, useAutoImportProvider, host);
        const fixes = arrayFrom(flatMapIterator(exportInfos.entries(), ([_, exportInfos]) =>
            getFixForImport(exportInfos, symbolName, symbolToken.getStart(sourceFile), preferTypeOnlyImport, useRequire, program, sourceFile, host, preferences)));
        return { fixes, symbolName };
    }

    // Returns a map from an exported symbol's ID to a list of every way it's (re-)exported.
    function getExportInfos(
        symbolName: string,
        currentTokenMeaning: SemanticMeaning,
        cancellationToken: CancellationToken,
        sourceFile: SourceFile,
        checker: TypeChecker,
        program: Program,
        useAutoImportProvider: boolean,
        host: LanguageServiceHost
    ): ReadonlyMap<string, readonly SymbolExportInfo[]> {
        // For each original symbol, keep all re-exports of that symbol together so we can call `getCodeActionsForImport` on the whole group at once.
        // Maps symbol id to info for modules providing that symbol (original export + re-exports).
        const originalSymbolToExportInfos = createMultiMap<SymbolExportInfo>();
        function addSymbol(moduleSymbol: Symbol, exportedSymbol: Symbol, importKind: ImportKind): void {
            originalSymbolToExportInfos.add(getUniqueSymbolId(exportedSymbol, checker).toString(), { moduleSymbol, importKind, exportedSymbolIsTypeOnly: isTypeOnlySymbol(exportedSymbol, checker) });
        }
        forEachExternalModuleToImportFrom(program, host, sourceFile, /*filterByPackageJson*/ true, useAutoImportProvider, moduleSymbol => {
            cancellationToken.throwIfCancellationRequested();

            const defaultInfo = getDefaultLikeExportInfo(sourceFile, moduleSymbol, checker, program.getCompilerOptions());
            if (defaultInfo && defaultInfo.name === symbolName && symbolHasMeaning(defaultInfo.symbolForMeaning, currentTokenMeaning)) {
                addSymbol(moduleSymbol, defaultInfo.symbol, defaultInfo.kind);
            }

            // check exports with the same name
            const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
            if (exportSymbolWithIdenticalName && symbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
                addSymbol(moduleSymbol, exportSymbolWithIdenticalName, ImportKind.Named);
            }
        });
        return originalSymbolToExportInfos;
    }

    function getDefaultLikeExportInfo(
        importingFile: SourceFile, moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions,
    ): { readonly symbol: Symbol, readonly symbolForMeaning: Symbol, readonly name: string, readonly kind: ImportKind } | undefined {
        const exported = getDefaultLikeExportWorker(importingFile, moduleSymbol, checker, compilerOptions);
        if (!exported) return undefined;
        const { symbol, kind } = exported;
        const info = getDefaultExportInfoWorker(symbol, moduleSymbol, checker, compilerOptions);
        return info && { symbol, kind, ...info };
    }

    function getDefaultLikeExportWorker(importingFile: SourceFile, moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions): { readonly symbol: Symbol, readonly kind: ImportKind } | undefined {
        const defaultExport = checker.tryGetMemberInModuleExports(InternalSymbolName.Default, moduleSymbol);
        if (defaultExport) return { symbol: defaultExport, kind: ImportKind.Default };
        const exportEquals = checker.resolveExternalModuleSymbol(moduleSymbol);
        return exportEquals === moduleSymbol ? undefined : { symbol: exportEquals, kind: getExportEqualsImportKind(importingFile, compilerOptions) };
    }

    function getExportEqualsImportKind(importingFile: SourceFile, compilerOptions: CompilerOptions): ImportKind {
        const allowSyntheticDefaults = getAllowSyntheticDefaultImports(compilerOptions);
        // 1. 'import =' will not work in es2015+, so the decision is between a default
        //    and a namespace import, based on allowSyntheticDefaultImports/esModuleInterop.
        if (getEmitModuleKind(compilerOptions) >= ModuleKind.ES2015) {
            return allowSyntheticDefaults ? ImportKind.Default : ImportKind.Namespace;
        }
        // 2. 'import =' will not work in JavaScript, so the decision is between a default
        //    and const/require.
        if (isInJSFile(importingFile)) {
            return isExternalModule(importingFile) ? ImportKind.Default : ImportKind.CommonJS;
        }
        // 3. At this point the most correct choice is probably 'import =', but people
        //    really hate that, so look to see if the importing file has any precedent
        //    on how to handle it.
        for (const statement of importingFile.statements) {
            if (isImportEqualsDeclaration(statement)) {
                return ImportKind.CommonJS;
            }
        }
        // 4. We have no precedent to go on, so just use a default import if
        //    allowSyntheticDefaultImports/esModuleInterop is enabled.
        return allowSyntheticDefaults ? ImportKind.Default : ImportKind.CommonJS;
    }

    function getDefaultExportInfoWorker(defaultExport: Symbol, moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions): { readonly symbolForMeaning: Symbol, readonly name: string } | undefined {
        const localSymbol = getLocalSymbolForExportDefault(defaultExport);
        if (localSymbol) return { symbolForMeaning: localSymbol, name: localSymbol.name };

        const name = getNameForExportDefault(defaultExport);
        if (name !== undefined) return { symbolForMeaning: defaultExport, name };

        if (defaultExport.flags & SymbolFlags.Alias) {
            const aliased = checker.getImmediateAliasedSymbol(defaultExport);
            return aliased && getDefaultExportInfoWorker(aliased, Debug.checkDefined(aliased.parent, "Alias targets of default exports must have a parent"), checker, compilerOptions);
        }

        if (defaultExport.escapedName !== InternalSymbolName.Default &&
            defaultExport.escapedName !== InternalSymbolName.ExportEquals) {
            return { symbolForMeaning: defaultExport, name: defaultExport.getName() };
        }
        return { symbolForMeaning: defaultExport, name: moduleSymbolToValidIdentifier(moduleSymbol, compilerOptions.target!) };
    }

    function getNameForExportDefault(symbol: Symbol): string | undefined {
        return symbol.declarations && firstDefined(symbol.declarations, declaration => {
            if (isExportAssignment(declaration)) {
                if (isIdentifier(declaration.expression)) {
                    return declaration.expression.text;
                }
            }
            else if (isExportSpecifier(declaration)) {
                Debug.assert(declaration.name.text === InternalSymbolName.Default, "Expected the specifier to be a default export");
                return declaration.propertyName && declaration.propertyName.text;
            }
        });
    }

    function codeActionForFix(context: textChanges.TextChangesContext, sourceFile: SourceFile, symbolName: string, fix: ImportFix, quotePreference: QuotePreference): CodeFixAction {
        let diag!: DiagnosticAndArguments;
        const changes = textChanges.ChangeTracker.with(context, tracker => {
            diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, quotePreference);
        });
        return createCodeFixAction(importFixName, changes, diag, importFixId, Diagnostics.Add_all_missing_imports);
    }
    function codeActionForFixWorker(changes: textChanges.ChangeTracker, sourceFile: SourceFile, symbolName: string, fix: ImportFix, quotePreference: QuotePreference): DiagnosticAndArguments {
        switch (fix.kind) {
            case ImportFixKind.UseNamespace:
                addNamespaceQualifier(changes, sourceFile, fix);
                return [Diagnostics.Change_0_to_1, symbolName, `${fix.namespacePrefix}.${symbolName}`];
            case ImportFixKind.ImportType:
                addImportType(changes, sourceFile, fix, quotePreference);
                return [Diagnostics.Change_0_to_1, symbolName, getImportTypePrefix(fix.moduleSpecifier, quotePreference) + symbolName];
            case ImportFixKind.AddToExisting: {
                const { importClauseOrBindingPattern, importKind, canUseTypeOnlyImport, moduleSpecifier } = fix;
                doAddExistingFix(changes, sourceFile, importClauseOrBindingPattern, importKind === ImportKind.Default ? symbolName : undefined, importKind === ImportKind.Named ? [symbolName] : emptyArray, canUseTypeOnlyImport);
                const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
                return [importKind === ImportKind.Default ? Diagnostics.Add_default_import_0_to_existing_import_declaration_from_1 : Diagnostics.Add_0_to_existing_import_declaration_from_1, symbolName, moduleSpecifierWithoutQuotes]; // you too!
            }
            case ImportFixKind.AddNew: {
                const { importKind, moduleSpecifier, typeOnly, useRequire } = fix;
                const getDeclarations = useRequire ? getNewRequires : getNewImports;
                const importsCollection = importKind === ImportKind.Default ? { defaultImport: symbolName, typeOnly } :
                    importKind === ImportKind.Named ? { namedImports: [symbolName], typeOnly } :
                    { namespaceLikeImport: { importKind, name: symbolName }, typeOnly };
                insertImports(changes, sourceFile, getDeclarations(moduleSpecifier, quotePreference, importsCollection), /*blankLineBetween*/ true);
                return [importKind === ImportKind.Default ? Diagnostics.Import_default_0_from_module_1 : Diagnostics.Import_0_from_module_1, symbolName, moduleSpecifier];
            }
            default:
                return Debug.assertNever(fix, `Unexpected fix kind ${(fix as ImportFix).kind}`);
        }
    }

    function doAddExistingFix(changes: textChanges.ChangeTracker, sourceFile: SourceFile, clause: ImportClause | ObjectBindingPattern, defaultImport: string | undefined, namedImports: readonly string[], canUseTypeOnlyImport: boolean): void {
        if (clause.kind === SyntaxKind.ObjectBindingPattern) {
            if (defaultImport) {
                addElementToBindingPattern(clause, defaultImport, "default");
            }
            for (const specifier of namedImports) {
                addElementToBindingPattern(clause, specifier, /*propertyName*/ undefined);
            }
            return;
        }

        const convertTypeOnlyToRegular = !canUseTypeOnlyImport && clause.isTypeOnly;
        if (defaultImport) {
            Debug.assert(!clause.name, "Cannot add a default import to an import clause that already has one");
            changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), factory.createIdentifier(defaultImport), { suffix: ", " });
        }

        if (namedImports.length) {
            const specifiers = namedImports.map(name => factory.createImportSpecifier(/*propertyName*/ undefined, factory.createIdentifier(name)));
            if (clause.namedBindings && cast(clause.namedBindings, isNamedImports).elements.length) {
                for (const spec of specifiers) {
                    changes.insertNodeInListAfter(sourceFile, last(cast(clause.namedBindings, isNamedImports).elements), spec);
                }
            }
            else {
                if (specifiers.length) {
                    const namedImports = factory.createNamedImports(specifiers);
                    if (clause.namedBindings) {
                        changes.replaceNode(sourceFile, clause.namedBindings, namedImports);
                    }
                    else {
                        changes.insertNodeAfter(sourceFile, Debug.checkDefined(clause.name, "Import clause must have either named imports or a default import"), namedImports);
                    }
                }
            }
        }

        if (convertTypeOnlyToRegular) {
            changes.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(clause, sourceFile));
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

    function addImportType(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { moduleSpecifier, position }: FixUseImportType, quotePreference: QuotePreference): void {
        changes.insertText(sourceFile, position, getImportTypePrefix(moduleSpecifier, quotePreference));
    }

    function getImportTypePrefix(moduleSpecifier: string, quotePreference: QuotePreference): string {
        const quote = getQuoteFromPreference(quotePreference);
        return `import(${quote}${moduleSpecifier}${quote}).`;
    }

    interface ImportsCollection {
        readonly typeOnly: boolean;
        readonly defaultImport?: string;
        readonly namedImports?: string[];
        readonly namespaceLikeImport?: {
            readonly importKind: ImportKind.CommonJS | ImportKind.Namespace;
            readonly name: string;
        };
    }
    function getNewImports(moduleSpecifier: string, quotePreference: QuotePreference, imports: ImportsCollection): Statement | readonly Statement[] {
        const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
        let statements: Statement | readonly Statement[] | undefined;
        if (imports.defaultImport !== undefined || imports.namedImports?.length) {
            statements = combine(statements, makeImport(
                imports.defaultImport === undefined ? undefined : factory.createIdentifier(imports.defaultImport),
                imports.namedImports?.map(n => factory.createImportSpecifier(/*propertyName*/ undefined, factory.createIdentifier(n))), moduleSpecifier, quotePreference, imports.typeOnly));
        }
        const { namespaceLikeImport, typeOnly } = imports;
        if (namespaceLikeImport) {
            const declaration = namespaceLikeImport.importKind === ImportKind.CommonJS
                ? factory.createImportEqualsDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    factory.createIdentifier(namespaceLikeImport.name),
                    factory.createExternalModuleReference(quotedModuleSpecifier))
                : factory.createImportDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    factory.createImportClause(
                        typeOnly,
                        /*name*/ undefined,
                        factory.createNamespaceImport(factory.createIdentifier(namespaceLikeImport.name))),
                    quotedModuleSpecifier);
            statements = combine(statements, declaration);
        }
        return Debug.checkDefined(statements);
    }

    function getNewRequires(moduleSpecifier: string, quotePreference: QuotePreference, imports: ImportsCollection): Statement | readonly Statement[] {
        const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
        let statements: Statement | readonly Statement[] | undefined;
        // const { default: foo, bar, etc } = require('./mod');
        if (imports.defaultImport || imports.namedImports?.length) {
            const bindingElements = imports.namedImports?.map(name => factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, name)) || [];
            if (imports.defaultImport) {
                bindingElements.unshift(factory.createBindingElement(/*dotDotDotToken*/ undefined, "default", imports.defaultImport));
            }
            const declaration = createConstEqualsRequireDeclaration(factory.createObjectBindingPattern(bindingElements), quotedModuleSpecifier);
            statements = combine(statements, declaration);
        }
        // const foo = require('./mod');
        if (imports.namespaceLikeImport) {
            const declaration = createConstEqualsRequireDeclaration(imports.namespaceLikeImport.name, quotedModuleSpecifier);
            statements = combine(statements, declaration);
        }
        return Debug.checkDefined(statements);
    }

    function createConstEqualsRequireDeclaration(name: string | ObjectBindingPattern, quotedModuleSpecifier: StringLiteral): VariableStatement {
        return factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    typeof name === "string" ? factory.createIdentifier(name) : name,
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, [quotedModuleSpecifier]))],
                NodeFlags.Const));
    }

    function symbolHasMeaning({ declarations }: Symbol, meaning: SemanticMeaning): boolean {
        return some(declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning));
    }

    export function forEachExternalModuleToImportFrom(
        program: Program,
        host: LanguageServiceHost,
        from: SourceFile,
        filterByPackageJson: boolean,
        useAutoImportProvider: boolean,
        cb: (module: Symbol, moduleFile: SourceFile | undefined, program: Program, isFromPackageJson: boolean) => void,
    ) {
        forEachExternalModuleToImportFromInProgram(program, host, from, filterByPackageJson, (module, file) => cb(module, file, program, /*isFromPackageJson*/ false));
        const autoImportProvider = useAutoImportProvider && host.getPackageJsonAutoImportProvider?.();
        if (autoImportProvider) {
            const start = timestamp();
            forEachExternalModuleToImportFromInProgram(autoImportProvider, host, from, filterByPackageJson, (module, file) => cb(module, file, autoImportProvider, /*isFromPackageJson*/ true));
            host.log?.(`forEachExternalModuleToImportFrom autoImportProvider: ${timestamp() - start}`);
        }
    }

    function forEachExternalModuleToImportFromInProgram(
        program: Program,
        host: LanguageServiceHost,
        from: SourceFile,
        filterByPackageJson: boolean,
        cb: (module: Symbol, moduleFile: SourceFile | undefined) => void,
    ) {
        let filteredCount = 0;
        const moduleSpecifierResolutionHost = createModuleSpecifierResolutionHost(program, host);
        const packageJson = filterByPackageJson && createAutoImportFilter(from, program, host, moduleSpecifierResolutionHost);
        forEachExternalModule(program.getTypeChecker(), program.getSourceFiles(), (module, sourceFile) => {
            if (sourceFile === undefined) {
                if (!packageJson || packageJson.allowsImportingAmbientModule(module)) {
                    cb(module, sourceFile);
                }
                else if (packageJson) {
                    filteredCount++;
                }
            }
            else if (sourceFile &&
                sourceFile !== from &&
                isImportableFile(program, from, sourceFile, moduleSpecifierResolutionHost)
            ) {
                if (!packageJson || packageJson.allowsImportingSourceFile(sourceFile)) {
                    cb(module, sourceFile);
                }
                else if (packageJson) {
                    filteredCount++;
                }
            }
        });
        host.log?.(`forEachExternalModuleToImportFrom: filtered out ${filteredCount} modules by package.json contents`);
    }

    function forEachExternalModule(checker: TypeChecker, allSourceFiles: readonly SourceFile[], cb: (module: Symbol, sourceFile: SourceFile | undefined) => void) {
        for (const ambient of checker.getAmbientModules()) {
            cb(ambient, /*sourceFile*/ undefined);
        }
        for (const sourceFile of allSourceFiles) {
            if (isExternalOrCommonJsModule(sourceFile)) {
                cb(checker.getMergedSymbol(sourceFile.symbol), sourceFile);
            }
        }
    }

    function isImportableFile(
        program: Program,
        from: SourceFile,
        to: SourceFile,
        moduleSpecifierResolutionHost: ModuleSpecifierResolutionHost
    ) {
        const getCanonicalFileName = hostGetCanonicalFileName(moduleSpecifierResolutionHost);
        const globalTypingsCache = moduleSpecifierResolutionHost.getGlobalTypingsCacheLocation?.();
        return !!moduleSpecifiers.forEachFileNameOfModule(
            from.fileName,
            to.fileName,
            moduleSpecifierResolutionHost,
            /*preferSymlinks*/ false,
            toPath => {
                const toFile = program.getSourceFile(toPath);
                // Determine to import using toPath only if toPath is what we were looking at
                // or there doesnt exist the file in the program by the symlink
                return (toFile === to || !toFile) &&
                    isImportablePath(from.fileName, toPath, getCanonicalFileName, globalTypingsCache);
            }
        );
    }

    /**
     * Don't include something from a `node_modules` that isn't actually reachable by a global import.
     * A relative import to node_modules is usually a bad idea.
     */
    function isImportablePath(fromPath: string, toPath: string, getCanonicalFileName: GetCanonicalFileName, globalCachePath?: string): boolean {
        // If it's in a `node_modules` but is not reachable from here via a global import, don't bother.
        const toNodeModules = forEachAncestorDirectory(toPath, ancestor => getBaseFileName(ancestor) === "node_modules" ? ancestor : undefined);
        const toNodeModulesParent = toNodeModules && getDirectoryPath(getCanonicalFileName(toNodeModules));
        return toNodeModulesParent === undefined
            || startsWith(getCanonicalFileName(fromPath), toNodeModulesParent)
            || (!!globalCachePath && startsWith(getCanonicalFileName(globalCachePath), toNodeModulesParent));
    }

    export function moduleSymbolToValidIdentifier(moduleSymbol: Symbol, target: ScriptTarget): string {
        return moduleSpecifierToValidIdentifier(removeFileExtension(stripQuotes(moduleSymbol.name)), target);
    }

    export function moduleSpecifierToValidIdentifier(moduleSpecifier: string, target: ScriptTarget): string {
        const baseName = getBaseFileName(removeSuffix(moduleSpecifier, "/index"));
        let res = "";
        let lastCharWasValid = true;
        const firstCharCode = baseName.charCodeAt(0);
        if (isIdentifierStart(firstCharCode, target)) {
            res += String.fromCharCode(firstCharCode);
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

    function createAutoImportFilter(fromFile: SourceFile, program: Program, host: LanguageServiceHost, moduleSpecifierResolutionHost = createModuleSpecifierResolutionHost(program, host)) {
        const packageJsons = (
            (host.getPackageJsonsVisibleToFile && host.getPackageJsonsVisibleToFile(fromFile.fileName)) || getPackageJsonsVisibleToFile(fromFile.fileName, host)
          ).filter(p => p.parseable);

        let usesNodeCoreModules: boolean | undefined;
        return { allowsImportingAmbientModule, allowsImportingSourceFile, allowsImportingSpecifier, moduleSpecifierResolutionHost };

        function moduleSpecifierIsCoveredByPackageJson(specifier: string) {
            const packageName = getNodeModuleRootSpecifier(specifier);
            for (const packageJson of packageJsons) {
                if (packageJson.has(packageName) || packageJson.has(getTypesPackageName(packageName))) {
                    return true;
                }
            }
            return false;
        }

        function allowsImportingAmbientModule(moduleSymbol: Symbol): boolean {
            if (!packageJsons.length) {
                return true;
            }

            const declaringSourceFile = moduleSymbol.valueDeclaration.getSourceFile();
            const declaringNodeModuleName = getNodeModulesPackageNameFromFileName(declaringSourceFile.fileName);
            if (typeof declaringNodeModuleName === "undefined") {
                return true;
            }

            const declaredModuleSpecifier = stripQuotes(moduleSymbol.getName());
            if (isAllowedCoreNodeModulesImport(declaredModuleSpecifier)) {
                return true;
            }

            return moduleSpecifierIsCoveredByPackageJson(declaringNodeModuleName)
                || moduleSpecifierIsCoveredByPackageJson(declaredModuleSpecifier);
        }

        function allowsImportingSourceFile(sourceFile: SourceFile): boolean {
            if (!packageJsons.length) {
                return true;
            }

            const moduleSpecifier = getNodeModulesPackageNameFromFileName(sourceFile.fileName);
            if (!moduleSpecifier) {
                return true;
            }

            return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
        }

        /**
         * Use for a specific module specifier that has already been resolved.
         * Use `allowsImportingAmbientModule` or `allowsImportingSourceFile` to resolve
         * the best module specifier for a given module _and_ determine if it’s importable.
         */
        function allowsImportingSpecifier(moduleSpecifier: string) {
            if (!packageJsons.length || isAllowedCoreNodeModulesImport(moduleSpecifier)) {
                return true;
            }
            if (pathIsRelative(moduleSpecifier) || isRootedDiskPath(moduleSpecifier)) {
                return true;
            }
            return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
        }

        function isAllowedCoreNodeModulesImport(moduleSpecifier: string) {
            // If we’re in JavaScript, it can be difficult to tell whether the user wants to import
            // from Node core modules or not. We can start by seeing if the user is actually using
            // any node core modules, as opposed to simply having @types/node accidentally as a
            // dependency of a dependency.
            if (isSourceFileJS(fromFile) && JsTyping.nodeCoreModules.has(moduleSpecifier)) {
                if (usesNodeCoreModules === undefined) {
                    usesNodeCoreModules = consumesNodeCoreModules(fromFile);
                }
                if (usesNodeCoreModules) {
                    return true;
                }
            }
            return false;
        }

        function getNodeModulesPackageNameFromFileName(importedFileName: string): string | undefined {
            if (!stringContains(importedFileName, "node_modules")) {
                return undefined;
            }
            const specifier = moduleSpecifiers.getNodeModulesPackageName(
                host.getCompilationSettings(),
                fromFile.path,
                importedFileName,
                moduleSpecifierResolutionHost,
            );

            if (!specifier) {
                return undefined;
            }
            // Paths here are not node_modules, so we don’t care about them;
            // returning anything will trigger a lookup in package.json.
            if (!pathIsRelative(specifier) && !isRootedDiskPath(specifier)) {
                return getNodeModuleRootSpecifier(specifier);
            }
        }

        function getNodeModuleRootSpecifier(fullSpecifier: string): string {
            const components = getPathComponents(getPackageNameFromTypesPackageName(fullSpecifier)).slice(1);
            // Scoped packages
            if (startsWith(components[0], "@")) {
                return `${components[0]}/${components[1]}`;
            }
            return components[0];
        }
    }
}

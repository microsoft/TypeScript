/* @internal */
namespace ts.codefix {
    export const importFixId = "fixMissingImport";
    const errorCodes: ReadonlyArray<number> = [
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
            const info = getFixesInfo(context, errorCode, span.start);
            if (!info) return undefined;
            const { fixes, symbolName } = info;
            const quotePreference = getQuotePreference(sourceFile, preferences);
            return fixes.map(fix => codeActionForFix(context, sourceFile, symbolName, fix, quotePreference));
        },
        fixIds: [importFixId],
        getAllCodeActions: context => {
            const { sourceFile, preferences } = context;

            // Namespace fixes don't conflict, so just build a list.
            const addToNamespace: FixUseNamespaceImport[] = [];
            // Keys are import clause node IDs.
            const addToExisting = createMap<{ readonly importClause: ImportClause, defaultImport: string | undefined; readonly namedImports: string[] }>();
            // Keys are module specifiers.
            const newImports = createMap<Mutable<ImportsCollection>>();

            eachDiagnostic(context, errorCodes, diag => {
                const info = getFixesInfo(context, diag.code, diag.start);
                if (!info || !info.fixes.length) return;
                const { fixes, symbolName } = info;

                const fix = first(fixes);
                switch (fix.kind) {
                    case ImportFixKind.UseNamespace:
                        addToNamespace.push(fix);
                        break;
                    case ImportFixKind.AddToExisting: {
                        const { importClause, importKind } = fix;
                        const key = String(getNodeId(importClause));
                        let entry = addToExisting.get(key);
                        if (!entry) {
                            addToExisting.set(key, entry = { importClause, defaultImport: undefined, namedImports: [] });
                        }
                        if (importKind === ImportKind.Named) {
                            pushIfUnique(entry.namedImports, symbolName);
                        }
                        else {
                            Debug.assert(entry.defaultImport === undefined || entry.defaultImport === symbolName);
                            entry.defaultImport = symbolName;
                        }
                        break;
                    }
                    case ImportFixKind.AddNew: {
                        const { moduleSpecifier, importKind } = fix;
                        let entry = newImports.get(moduleSpecifier);
                        if (!entry) {
                            newImports.set(moduleSpecifier, entry = { defaultImport: undefined, namedImports: [], namespaceLikeImport: undefined });
                        }
                        switch (importKind) {
                            case ImportKind.Default:
                                Debug.assert(entry.defaultImport === undefined || entry.defaultImport === symbolName);
                                entry.defaultImport = symbolName;
                                break;
                            case ImportKind.Named:
                                pushIfUnique(entry.namedImports, symbolName);
                                break;
                            case ImportKind.Equals:
                            case ImportKind.Namespace:
                                Debug.assert(entry.namespaceLikeImport === undefined || entry.namespaceLikeImport.name === symbolName);
                                entry.namespaceLikeImport = { importKind, name: symbolName };
                                break;
                        }
                        break;
                    }
                    default:
                        Debug.assertNever(fix);
                }
            });

            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                for (const fix of addToNamespace) {
                    addNamespaceQualifier(changes, sourceFile, fix);
                }
                addToExisting.forEach(({ importClause, defaultImport, namedImports }) => {
                    doAddExistingFix(changes, sourceFile, importClause, defaultImport, namedImports);
                });
                const quotePreference = getQuotePreference(sourceFile, preferences);
                newImports.forEach((imports, moduleSpecifier) => {
                    addNewImports(changes, sourceFile, moduleSpecifier, quotePreference, imports);
                });
            }));
        },
    });

    // Sorted with the preferred fix coming first.
    const enum ImportFixKind { UseNamespace, AddToExisting, AddNew }
    type ImportFix = FixUseNamespaceImport | FixAddToExistingImport | FixAddNewImport;
    interface FixUseNamespaceImport {
        readonly kind: ImportFixKind.UseNamespace;
        readonly namespacePrefix: string;
        readonly symbolToken: Identifier;
    }
    interface FixAddToExistingImport {
        readonly kind: ImportFixKind.AddToExisting;
        readonly importClause: ImportClause;
        readonly importKind: ImportKind.Default | ImportKind.Named;
    }
    interface FixAddNewImport {
        readonly kind: ImportFixKind.AddNew;
        readonly moduleSpecifier: string;
        readonly importKind: ImportKind;
    }

    const enum ImportKind {
        Named,
        Default,
        Namespace,
        Equals
    }

    /** Information about how a symbol is exported from a module. (We don't need to store the exported symbol, just its module.) */
    interface SymbolExportInfo {
        readonly moduleSymbol: Symbol;
        readonly importKind: ImportKind;
    }

    /** Information needed to augment an existing import declaration. */
    interface FixAddToExistingImportInfo {
        readonly declaration: AnyImportSyntax;
        readonly importKind: ImportKind;
    }

    export function getImportCompletionAction(
        exportedSymbol: Symbol,
        moduleSymbol: Symbol,
        sourceFile: SourceFile,
        symbolName: string,
        host: LanguageServiceHost,
        program: Program,
        checker: TypeChecker,
        allSourceFiles: ReadonlyArray<SourceFile>,
        formatContext: formatting.FormatContext,
        symbolToken: Node | undefined,
        preferences: UserPreferences,
    ): { readonly moduleSpecifier: string, readonly codeAction: CodeAction } {
        const exportInfos = getAllReExportingModules(exportedSymbol, moduleSymbol, symbolName, sourceFile, checker, allSourceFiles);
        Debug.assert(exportInfos.some(info => info.moduleSymbol === moduleSymbol));
        // We sort the best codefixes first, so taking `first` is best for completions.
        const moduleSpecifier = first(getNewImportInfos(program, sourceFile, exportInfos, host, preferences)).moduleSpecifier;
        const fix = first(getFixForImport(exportInfos, symbolName, symbolToken, program, sourceFile, host, preferences));
        return { moduleSpecifier, codeAction: codeActionForFix({ host, formatContext }, sourceFile, symbolName, fix, getQuotePreference(sourceFile, preferences)) };
    }
    function getAllReExportingModules(exportedSymbol: Symbol, exportingModuleSymbol: Symbol, symbolName: string, sourceFile: SourceFile, checker: TypeChecker, allSourceFiles: ReadonlyArray<SourceFile>): ReadonlyArray<SymbolExportInfo> {
        const result: SymbolExportInfo[] = [];
        forEachExternalModule(checker, allSourceFiles, (moduleSymbol, moduleFile) => {
            // Don't import from a re-export when looking "up" like to `./index` or `../index`.
            if (moduleFile && moduleSymbol !== exportingModuleSymbol && startsWith(sourceFile.fileName, getDirectoryPath(moduleFile.fileName))) {
                return;
            }

            for (const exported of checker.getExportsOfModule(moduleSymbol)) {
                if ((exported.escapedName === InternalSymbolName.Default || exported.name === symbolName) && skipAlias(exported, checker) === exportedSymbol) {
                    const isDefaultExport = checker.tryGetMemberInModuleExports(InternalSymbolName.Default, moduleSymbol) === exported;
                    result.push({ moduleSymbol, importKind: isDefaultExport ? ImportKind.Default : ImportKind.Named });
                }
            }
        });
        return result;
    }

    function getFixForImport(
        exportInfos: ReadonlyArray<SymbolExportInfo>,
        symbolName: string,
        symbolToken: Node | undefined,
        program: Program,
        sourceFile: SourceFile,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): ReadonlyArray<ImportFix> {
        const checker = program.getTypeChecker();
        const existingImports = flatMap(exportInfos, info => getExistingImportDeclarations(info, checker, sourceFile));
        const useNamespace = tryUseExistingNamespaceImport(existingImports, symbolName, symbolToken, checker);
        const addToExisting = tryAddToExistingImport(existingImports);
        // Don't bother providing an action to add a new import if we can add to an existing one.
        const addImport = addToExisting ? [addToExisting] : getFixesForAddImport(exportInfos, existingImports, program, sourceFile, host, preferences);
        return [...(useNamespace ? [useNamespace] : emptyArray), ...addImport];
    }

    function tryUseExistingNamespaceImport(existingImports: ReadonlyArray<FixAddToExistingImportInfo>, symbolName: string, symbolToken: Node | undefined, checker: TypeChecker): FixUseNamespaceImport | undefined {
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
        return !symbolToken || !isIdentifier(symbolToken) ? undefined : firstDefined(existingImports, ({ declaration }): FixUseNamespaceImport | undefined => {
            const namespace = getNamespaceImportName(declaration);
            if (namespace) {
                const moduleSymbol = checker.getAliasedSymbol(checker.getSymbolAtLocation(namespace)!);
                if (moduleSymbol && moduleSymbol.exports!.has(escapeLeadingUnderscores(symbolName))) {
                    return { kind: ImportFixKind.UseNamespace, namespacePrefix: namespace.text, symbolToken };
                }
            }
        });
    }

    function tryAddToExistingImport(existingImports: ReadonlyArray<FixAddToExistingImportInfo>): FixAddToExistingImport | undefined {
        return firstDefined(existingImports, ({ declaration, importKind }): FixAddToExistingImport | undefined => {
            if (declaration.kind !== SyntaxKind.ImportDeclaration) return undefined;
            const { importClause } = declaration;
            if (!importClause) return undefined;
            const { name, namedBindings } = importClause;
            return importKind === ImportKind.Default && !name || importKind === ImportKind.Named && (!namedBindings || namedBindings.kind === SyntaxKind.NamedImports)
                ? { kind: ImportFixKind.AddToExisting, importClause, importKind }
                : undefined;
        });
    }

    function getNamespaceImportName(declaration: AnyImportSyntax): Identifier | undefined {
        if (declaration.kind === SyntaxKind.ImportDeclaration) {
            const namedBindings = declaration.importClause && isImportClause(declaration.importClause) && declaration.importClause.namedBindings;
            return namedBindings && namedBindings.kind === SyntaxKind.NamespaceImport ? namedBindings.name : undefined;
        }
        else {
            return declaration.name;
        }
    }

    function getExistingImportDeclarations({ moduleSymbol, importKind }: SymbolExportInfo, checker: TypeChecker, { imports }: SourceFile): ReadonlyArray<FixAddToExistingImportInfo> {
        return mapDefined<StringLiteralLike, FixAddToExistingImportInfo>(imports, moduleSpecifier => {
            const i = importFromModuleSpecifier(moduleSpecifier);
            return (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration)
                && checker.getSymbolAtLocation(moduleSpecifier) === moduleSymbol ? { declaration: i, importKind } : undefined;
        });
    }

    function getNewImportInfos(
        program: Program,
        sourceFile: SourceFile,
        moduleSymbols: ReadonlyArray<SymbolExportInfo>,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): ReadonlyArray<FixAddNewImport> {
        const choicesForEachExportingModule = flatMap<SymbolExportInfo, ReadonlyArray<FixAddNewImport>>(moduleSymbols, ({ moduleSymbol, importKind }) => {
            const modulePathsGroups = moduleSpecifiers.getModuleSpecifiers(moduleSymbol, program.getCompilerOptions(), sourceFile, host, program.getSourceFiles(), preferences, program.redirectTargetsMap);
            return modulePathsGroups.map(group => group.map((moduleSpecifier): FixAddNewImport => ({ kind: ImportFixKind.AddNew, moduleSpecifier, importKind })));
        });
        // Sort to keep the shortest paths first, but keep [relativePath, importRelativeToBaseUrl] groups together
        return flatten<FixAddNewImport>(choicesForEachExportingModule.sort((a, b) => first(a).moduleSpecifier.length - first(b).moduleSpecifier.length));
    }

    function getFixesForAddImport(
        exportInfos: ReadonlyArray<SymbolExportInfo>,
        existingImports: ReadonlyArray<FixAddToExistingImportInfo>,
        program: Program,
        sourceFile: SourceFile,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): ReadonlyArray<FixAddNewImport> {
        const existingDeclaration = firstDefined(existingImports, newImportInfoFromExistingSpecifier);
        return existingDeclaration ? [existingDeclaration] : getNewImportInfos(program, sourceFile, exportInfos, host, preferences);
    }

    function newImportInfoFromExistingSpecifier({ declaration, importKind }: FixAddToExistingImportInfo): FixAddNewImport | undefined {
        const expression = declaration.kind === SyntaxKind.ImportDeclaration
            ? declaration.moduleSpecifier
            : declaration.moduleReference.kind === SyntaxKind.ExternalModuleReference
                ? declaration.moduleReference.expression
                : undefined;
        return expression && isStringLiteral(expression) ? { kind: ImportFixKind.AddNew, moduleSpecifier: expression.text, importKind } : undefined;
    }

    interface FixesInfo { readonly fixes: ReadonlyArray<ImportFix>; readonly symbolName: string; }
    function getFixesInfo(context: CodeFixContextBase, errorCode: number, pos: number): FixesInfo | undefined {
        const symbolToken = getTokenAtPosition(context.sourceFile, pos);
        const info = errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code
            ? getFixesInfoForUMDImport(context, symbolToken)
            : getFixesInfoForNonUMDImport(context, symbolToken);
        return info && { ...info, fixes: sort(info.fixes, (a, b) => a.kind - b.kind) };
    }

    function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }: CodeFixContextBase, token: Node): FixesInfo | undefined {
        const checker = program.getTypeChecker();
        const umdSymbol = getUmdSymbol(token, checker);
        if (!umdSymbol) return undefined;
        const symbol = checker.getAliasedSymbol(umdSymbol);
        const symbolName = umdSymbol.name;
        const exportInfos: ReadonlyArray<SymbolExportInfo> = [{ moduleSymbol: symbol, importKind: getUmdImportKind(program.getCompilerOptions()) }];
        const fixes = getFixForImport(exportInfos, symbolName, token, program, sourceFile, host, preferences);
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

    function getUmdImportKind(compilerOptions: CompilerOptions): ImportKind {
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
                return ImportKind.Equals;
            case ModuleKind.System:
            case ModuleKind.ES2015:
            case ModuleKind.ESNext:
            case ModuleKind.None:
                // Fall back to the `import * as ns` style import.
                return ImportKind.Namespace;
            default:
                return Debug.assertNever(moduleKind);
        }
    }

    function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }: CodeFixContextBase, symbolToken: Node): FixesInfo | undefined {
        // This will always be an Identifier, since the diagnostics we fix only fail on identifiers.
        const checker = program.getTypeChecker();
        // If we're at `<Foo/>`, we must check if `Foo` is already in scope, and if so, get an import for `React` instead.
        const symbolName = isJsxOpeningLikeElement(symbolToken.parent)
            && symbolToken.parent.tagName === symbolToken
            && (!isIdentifier(symbolToken) || isIntrinsicJsxName(symbolToken.text) || checker.resolveName(symbolToken.text, symbolToken, SymbolFlags.All, /*excludeGlobals*/ false))
            ? checker.getJsxNamespace()
            : isIdentifier(symbolToken) ? symbolToken.text : undefined;
        if (!symbolName) return undefined;
        // "default" is a keyword and not a legal identifier for the import, so we don't expect it here
        Debug.assert(symbolName !== InternalSymbolName.Default);

        const fixes = arrayFrom(flatMapIterator(getExportInfos(symbolName, getMeaningFromLocation(symbolToken), cancellationToken, sourceFile, checker, program).entries(), ([_, exportInfos]) =>
            getFixForImport(exportInfos, symbolName, symbolToken, program, sourceFile, host, preferences)));
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
    ): ReadonlyMap<ReadonlyArray<SymbolExportInfo>> {
        // For each original symbol, keep all re-exports of that symbol together so we can call `getCodeActionsForImport` on the whole group at once.
        // Maps symbol id to info for modules providing that symbol (original export + re-exports).
        const originalSymbolToExportInfos = createMultiMap<SymbolExportInfo>();
        function addSymbol(moduleSymbol: Symbol, exportedSymbol: Symbol, importKind: ImportKind): void {
            originalSymbolToExportInfos.add(getUniqueSymbolId(exportedSymbol, checker).toString(), { moduleSymbol, importKind });
        }
        forEachExternalModuleToImportFrom(checker, sourceFile, program.getSourceFiles(), moduleSymbol => {
            cancellationToken.throwIfCancellationRequested();

            // check the default export
            const defaultExport = checker.tryGetMemberInModuleExports(InternalSymbolName.Default, moduleSymbol);
            if (defaultExport) {
                const info = getDefaultExportInfo(defaultExport, moduleSymbol, program);
                if (info && info.name === symbolName && symbolHasMeaning(info.symbolForMeaning, currentTokenMeaning)) {
                    addSymbol(moduleSymbol, defaultExport, ImportKind.Default);
                }
            }

            // check exports with the same name
            const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
            if (exportSymbolWithIdenticalName && symbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
                addSymbol(moduleSymbol, exportSymbolWithIdenticalName, ImportKind.Named);
            }
        });
        return originalSymbolToExportInfos;
    }

    function getDefaultExportInfo(defaultExport: Symbol, moduleSymbol: Symbol, program: Program): { readonly symbolForMeaning: Symbol, readonly name: string } | undefined {
        const checker = program.getTypeChecker();

        const localSymbol = getLocalSymbolForExportDefault(defaultExport);
        if (localSymbol) return { symbolForMeaning: localSymbol, name: localSymbol.name };

        const name = getNameForExportDefault(defaultExport);
        if (name !== undefined) return { symbolForMeaning: defaultExport, name };

        if (defaultExport.flags & SymbolFlags.Alias) {
            const aliased = checker.getAliasedSymbol(defaultExport);
            return getDefaultExportInfo(aliased, Debug.assertDefined(aliased.parent), program);
        }
        else {
            const moduleName = moduleSymbolToValidIdentifier(moduleSymbol, program.getCompilerOptions().target!);
            return moduleName === undefined ? undefined : { symbolForMeaning: defaultExport, name: moduleName };
        }
    }

    function getNameForExportDefault(symbol: Symbol): string | undefined {
        return symbol.declarations && firstDefined(symbol.declarations, declaration => {
            if (isExportAssignment(declaration)) {
                if (isIdentifier(declaration.expression)) {
                    return declaration.expression.text;
                }
            }
            else if (isExportSpecifier(declaration)) {
                Debug.assert(declaration.name.text === InternalSymbolName.Default);
                return declaration.propertyName && declaration.propertyName.text;
            }
        });
    }

    function codeActionForFix(context: textChanges.TextChangesContext, sourceFile: SourceFile, symbolName: string, fix: ImportFix, quotePreference: QuotePreference): CodeFixAction {
        let diag!: DiagnosticAndArguments;
        const changes = textChanges.ChangeTracker.with(context, tracker => {
            diag = codeActionForFixWorker(tracker, sourceFile, symbolName, fix, quotePreference);
        });
        return createCodeFixAction("import", changes, diag, importFixId, Diagnostics.Add_all_missing_imports);
    }
    function codeActionForFixWorker(changes: textChanges.ChangeTracker, sourceFile: SourceFile, symbolName: string, fix: ImportFix, quotePreference: QuotePreference): DiagnosticAndArguments {
        switch (fix.kind) {
            case ImportFixKind.UseNamespace:
                addNamespaceQualifier(changes, sourceFile, fix);
                return [Diagnostics.Change_0_to_1, symbolName, `${fix.namespacePrefix}.${symbolName}`];
            case ImportFixKind.AddToExisting: {
                const { importClause, importKind } = fix;
                doAddExistingFix(changes, sourceFile, importClause, importKind === ImportKind.Default ? symbolName : undefined, importKind === ImportKind.Named ? [symbolName] : emptyArray);
                const moduleSpecifierWithoutQuotes = stripQuotes(importClause.parent.moduleSpecifier.getText());
                return [Diagnostics.Add_0_to_existing_import_declaration_from_1, symbolName, moduleSpecifierWithoutQuotes];
            }
            case ImportFixKind.AddNew: {
                const { importKind, moduleSpecifier } = fix;
                addNewImports(changes, sourceFile, moduleSpecifier, quotePreference, importKind === ImportKind.Default ? { defaultImport: symbolName, namedImports: emptyArray, namespaceLikeImport: undefined }
                    : importKind === ImportKind.Named ? { defaultImport: undefined, namedImports: [symbolName], namespaceLikeImport: undefined }
                    : { defaultImport: undefined, namedImports: emptyArray, namespaceLikeImport: { importKind, name: symbolName } });
                return [Diagnostics.Import_0_from_module_1, symbolName, moduleSpecifier];
            }
            default:
                return Debug.assertNever(fix);
        }
    }

    function doAddExistingFix(changes: textChanges.ChangeTracker, sourceFile: SourceFile, clause: ImportClause, defaultImport: string | undefined, namedImports: ReadonlyArray<string>): void {
        if (defaultImport) {
            Debug.assert(!clause.name);
            changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), createIdentifier(defaultImport), { suffix: ", " });
        }

        if (namedImports.length) {
            const specifiers = namedImports.map(name => createImportSpecifier(/*propertyName*/ undefined, createIdentifier(name)));
            if (clause.namedBindings && cast(clause.namedBindings, isNamedImports).elements.length) {
                for (const spec of specifiers) {
                    changes.insertNodeInListAfter(sourceFile, last(cast(clause.namedBindings, isNamedImports).elements), spec);
                }
            }
            else {
                if (specifiers.length) {
                    const namedImports = createNamedImports(specifiers);
                    if (clause.namedBindings) {
                        changes.replaceNode(sourceFile, clause.namedBindings, namedImports);
                    }
                    else {
                        changes.insertNodeAfter(sourceFile, Debug.assertDefined(clause.name), namedImports);
                    }
                }
            }
        }
    }

    function addNamespaceQualifier(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { namespacePrefix, symbolToken }: FixUseNamespaceImport): void {
        changes.replaceNode(sourceFile, symbolToken, createPropertyAccess(createIdentifier(namespacePrefix), createIdentifier(symbolToken.text)));
    }

    interface ImportsCollection {
        readonly defaultImport: string | undefined;
        readonly namedImports: string[];
        readonly namespaceLikeImport: { readonly importKind: ImportKind.Equals | ImportKind.Namespace, readonly name: string } | undefined;
    }
    function addNewImports(changes: textChanges.ChangeTracker, sourceFile: SourceFile, moduleSpecifier: string, quotePreference: QuotePreference, { defaultImport, namedImports, namespaceLikeImport }: ImportsCollection): void {
        const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
        if (defaultImport !== undefined || namedImports.length) {
            insertImport(changes, sourceFile,
                makeImport(
                    defaultImport === undefined ? undefined : createIdentifier(defaultImport),
                    namedImports.map(n => createImportSpecifier(/*propertyName*/ undefined, createIdentifier(n))), moduleSpecifier, quotePreference));
        }
        if (namespaceLikeImport) {
            insertImport(changes, sourceFile, namespaceLikeImport.importKind === ImportKind.Equals
                ? createImportEqualsDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createIdentifier(namespaceLikeImport.name), createExternalModuleReference(quotedModuleSpecifier))
                : createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(/*name*/ undefined, createNamespaceImport(createIdentifier(namespaceLikeImport.name))), quotedModuleSpecifier));
        }
    }

    function symbolHasMeaning({ declarations }: Symbol, meaning: SemanticMeaning): boolean {
        return some(declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning));
    }

    export function forEachExternalModuleToImportFrom(checker: TypeChecker, from: SourceFile, allSourceFiles: ReadonlyArray<SourceFile>, cb: (module: Symbol) => void) {
        forEachExternalModule(checker, allSourceFiles, (module, sourceFile) => {
            if (sourceFile === undefined || sourceFile !== from && isImportablePath(from.fileName, sourceFile.fileName)) {
                cb(module);
            }
        });
    }

    function forEachExternalModule(checker: TypeChecker, allSourceFiles: ReadonlyArray<SourceFile>, cb: (module: Symbol, sourceFile: SourceFile | undefined) => void) {
        for (const ambient of checker.getAmbientModules()) {
            cb(ambient, /*sourceFile*/ undefined);
        }
        for (const sourceFile of allSourceFiles) {
            if (isExternalOrCommonJsModule(sourceFile)) {
                cb(checker.getMergedSymbol(sourceFile.symbol), sourceFile);
            }
        }
    }

    /**
     * Don't include something from a `node_modules` that isn't actually reachable by a global import.
     * A relative import to node_modules is usually a bad idea.
     */
    function isImportablePath(fromPath: string, toPath: string): boolean {
        // If it's in a `node_modules` but is not reachable from here via a global import, don't bother.
        const toNodeModules = forEachAncestorDirectory(toPath, ancestor => getBaseFileName(ancestor) === "node_modules" ? ancestor : undefined);
        return toNodeModules === undefined || startsWith(fromPath, getDirectoryPath(toNodeModules));
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
}

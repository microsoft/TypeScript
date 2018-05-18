/* @internal */
namespace ts.codefix {
    import ChangeTracker = textChanges.ChangeTracker;

    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_name_0.code,
            Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
            Diagnostics.Cannot_find_namespace_0.code,
            Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code,
            Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here.code,
        ],
        getCodeActions: getImportCodeActions,
        // TODO: GH#20315
        fixIds: [],
        getAllCodeActions: notImplemented,
    });

    // Map from module Id to an array of import declarations in that module.
    type ImportDeclarationMap = ExistingImportInfo[][];

    interface SymbolContext extends textChanges.TextChangesContext {
        sourceFile: SourceFile;
        symbolName: string;
    }

    interface ImportCodeFixContext extends SymbolContext {
        symbolToken: Node;
        program: Program;
        checker: TypeChecker;
        compilerOptions: CompilerOptions;
        getCanonicalFileName: GetCanonicalFileName;
        cachedImportDeclarations?: ImportDeclarationMap;
        preferences: UserPreferences;
    }

    function createCodeAction(descriptionDiagnostic: DiagnosticMessage, diagnosticArgs: [string, string], changes: FileTextChanges[]): CodeFixAction {
        // TODO: GH#20315
        return createCodeFixActionNoFixId("import", changes, [descriptionDiagnostic, ...diagnosticArgs] as [DiagnosticMessage, string, string]);
    }

    function convertToImportCodeFixContext(context: CodeFixContext, symbolToken: Node, symbolName: string): ImportCodeFixContext {
        const { program } = context;
        const checker = program.getTypeChecker();

        return {
            host: context.host,
            formatContext: context.formatContext,
            sourceFile: context.sourceFile,
            program,
            checker,
            compilerOptions: program.getCompilerOptions(),
            cachedImportDeclarations: [],
            getCanonicalFileName: createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(context.host)),
            symbolName,
            symbolToken,
            preferences: context.preferences,
        };
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
    interface ExistingImportInfo {
        readonly declaration: AnyImportSyntax;
        readonly importKind: ImportKind;
    }

    /** Information needed to create a new import declaration. */
    interface NewImportInfo {
        readonly moduleSpecifier: string;
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
        compilerOptions: CompilerOptions,
        allSourceFiles: ReadonlyArray<SourceFile>,
        formatContext: formatting.FormatContext,
        getCanonicalFileName: GetCanonicalFileName,
        symbolToken: Node | undefined,
        preferences: UserPreferences,
    ): { readonly moduleSpecifier: string, readonly codeAction: CodeAction } {
        const exportInfos = getAllReExportingModules(exportedSymbol, moduleSymbol, symbolName, sourceFile, checker, allSourceFiles);
        Debug.assert(exportInfos.some(info => info.moduleSymbol === moduleSymbol));
        // We sort the best codefixes first, so taking `first` is best for completions.
        const moduleSpecifier = first(getNewImportInfos(program, sourceFile, exportInfos, host, preferences)).moduleSpecifier;
        const ctx: ImportCodeFixContext = { host, program, checker, compilerOptions, sourceFile, formatContext, symbolName, getCanonicalFileName, symbolToken, preferences };
        return { moduleSpecifier, codeAction: first(getCodeActionsForImport(exportInfos, ctx)) };
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

    function getCodeActionsForImport(exportInfos: ReadonlyArray<SymbolExportInfo>, context: ImportCodeFixContext): CodeFixAction[] {
        const result: CodeFixAction[] = [];
        getCodeActionsForImport_separateExistingAndNew(exportInfos, context, result, result);
        return result;
    }

    function getCodeActionsForImport_separateExistingAndNew(exportInfos: ReadonlyArray<SymbolExportInfo>, context: ImportCodeFixContext, useExisting: Push<CodeFixAction>, addNew: Push<CodeFixAction>): void {
        const existingImports = flatMap(exportInfos, info =>
            getImportDeclarations(info, context.checker, context.sourceFile, context.cachedImportDeclarations));
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
        if (context.symbolToken && isIdentifier(context.symbolToken)) {
            for (const { declaration } of existingImports) {
                const namespace = getNamespaceImportName(declaration);
                if (namespace) {
                    const moduleSymbol = context.checker.getAliasedSymbol(context.checker.getSymbolAtLocation(namespace));
                    if (moduleSymbol && moduleSymbol.exports.has(escapeLeadingUnderscores(context.symbolName))) {
                        useExisting.push(getCodeActionForUseExistingNamespaceImport(namespace.text, context, context.symbolToken));
                    }
                }
            }
        }
        getCodeActionsForAddImport(exportInfos, context, existingImports, useExisting, addNew);
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

    // TODO(anhans): This doesn't seem important to cache... just use an iterator instead of creating a new array?
    function getImportDeclarations({ moduleSymbol, importKind }: SymbolExportInfo, checker: TypeChecker, { imports }: SourceFile, cachedImportDeclarations: ImportDeclarationMap = []): ReadonlyArray<ExistingImportInfo> {
        const moduleSymbolId = getUniqueSymbolId(moduleSymbol, checker);
        let cached = cachedImportDeclarations[moduleSymbolId];
        if (!cached) {
            cached = cachedImportDeclarations[moduleSymbolId] = mapDefined<StringLiteralLike, ExistingImportInfo>(imports, moduleSpecifier => {
                const i = importFromModuleSpecifier(moduleSpecifier);
                return (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration)
                    && checker.getSymbolAtLocation(moduleSpecifier) === moduleSymbol ? { declaration: i, importKind } : undefined;
            });
        }
        return cached;
    }

    function getCodeActionForNewImport(context: SymbolContext & { preferences: UserPreferences }, { moduleSpecifier, importKind }: NewImportInfo): CodeFixAction {
        const { sourceFile, symbolName, preferences } = context;
        const lastImportDeclaration = findLast(sourceFile.statements, isAnyImportSyntax);

        const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
        const quotedModuleSpecifier = createLiteral(moduleSpecifierWithoutQuotes, shouldUseSingleQuote(sourceFile, preferences));
        const importDecl = importKind !== ImportKind.Equals
            ? createImportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createImportClauseOfKind(importKind, symbolName),
                quotedModuleSpecifier)
            : createImportEqualsDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createIdentifier(symbolName),
                createExternalModuleReference(quotedModuleSpecifier));

        const changes = ChangeTracker.with(context, changeTracker => {
            if (lastImportDeclaration) {
                changeTracker.insertNodeAfter(sourceFile, lastImportDeclaration, importDecl);
            }
            else {
                changeTracker.insertNodeAtTopOfFile(sourceFile, importDecl, /*blankLineBetween*/ true);
            }
        });

        // if this file doesn't have any import statements, insert an import statement and then insert a new line
        // between the only import statement and user code. Otherwise just insert the statement because chances
        // are there are already a new line seperating code and import statements.
        return createCodeAction(Diagnostics.Import_0_from_module_1, [symbolName, moduleSpecifierWithoutQuotes], changes);
    }

    function shouldUseSingleQuote(sourceFile: SourceFile, preferences: UserPreferences): boolean {
        if (preferences.quotePreference) {
            return preferences.quotePreference === "single";
        }
        else {
            const firstModuleSpecifier = firstOrUndefined(sourceFile.imports);
            return !!firstModuleSpecifier && !isStringDoubleQuoted(firstModuleSpecifier, sourceFile);
        }
    }

    function createImportClauseOfKind(kind: ImportKind.Default | ImportKind.Named | ImportKind.Namespace, symbolName: string) {
        const id = createIdentifier(symbolName);
        switch (kind) {
            case ImportKind.Default:
                return createImportClause(id, /*namedBindings*/ undefined);
            case ImportKind.Namespace:
                return createImportClause(/*name*/ undefined, createNamespaceImport(id));
            case ImportKind.Named:
                return createImportClause(/*name*/ undefined, createNamedImports([createImportSpecifier(/*propertyName*/ undefined, id)]));
            default:
                Debug.assertNever(kind);
        }
    }

    function getNewImportInfos(
        program: Program,
        sourceFile: SourceFile,
        moduleSymbols: ReadonlyArray<SymbolExportInfo>,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): ReadonlyArray<NewImportInfo> {
        const choicesForEachExportingModule = flatMap<SymbolExportInfo, NewImportInfo[]>(moduleSymbols, ({ moduleSymbol, importKind }) => {
            const modulePathsGroups = moduleSpecifiers.getModuleSpecifiers(moduleSymbol, program, sourceFile, host, preferences);
            return modulePathsGroups.map(group => group.map(moduleSpecifier => ({ moduleSpecifier, importKind })));
        });
        // Sort to keep the shortest paths first, but keep [relativePath, importRelativeToBaseUrl] groups together
        return flatten<NewImportInfo>(choicesForEachExportingModule.sort((a, b) => first(a).moduleSpecifier.length - first(b).moduleSpecifier.length));
    }

    function getCodeActionsForAddImport(
        exportInfos: ReadonlyArray<SymbolExportInfo>,
        ctx: ImportCodeFixContext,
        existingImports: ReadonlyArray<ExistingImportInfo>,
        useExisting: Push<CodeFixAction>,
        addNew: Push<CodeFixAction>,
    ): void {
        const fromExistingImport = firstDefined(existingImports, ({ declaration, importKind }) => {
            if (declaration.kind === SyntaxKind.ImportDeclaration && declaration.importClause) {
                const changes = tryUpdateExistingImport(ctx, isImportClause(declaration.importClause) && declaration.importClause || undefined, importKind);
                if (changes) {
                    const moduleSpecifierWithoutQuotes = stripQuotes(declaration.moduleSpecifier.getText());
                    return createCodeAction(Diagnostics.Add_0_to_existing_import_declaration_from_1, [ctx.symbolName, moduleSpecifierWithoutQuotes], changes);
                }
            }
        });
        if (fromExistingImport) {
            useExisting.push(fromExistingImport);
            return;
        }

        const existingDeclaration = firstDefined(existingImports, newImportInfoFromExistingSpecifier);
        const newImportInfos = existingDeclaration
            ? [existingDeclaration]
            : getNewImportInfos(ctx.program, ctx.sourceFile, exportInfos, ctx.host, ctx.preferences);
        for (const info of newImportInfos) {
            addNew.push(getCodeActionForNewImport(ctx, info));
        }
    }

    function newImportInfoFromExistingSpecifier({ declaration, importKind }: ExistingImportInfo): NewImportInfo | undefined {
        const expression = declaration.kind === SyntaxKind.ImportDeclaration
            ? declaration.moduleSpecifier
            : declaration.moduleReference.kind === SyntaxKind.ExternalModuleReference
                ? declaration.moduleReference.expression
                : undefined;
        return expression && isStringLiteral(expression) ? { moduleSpecifier: expression.text, importKind } : undefined;
    }

    function tryUpdateExistingImport(context: SymbolContext, importClause: ImportClause | ImportEqualsDeclaration, importKind: ImportKind): FileTextChanges[] | undefined {
        const { symbolName, sourceFile } = context;
        const { name } = importClause;
        const { namedBindings } = importClause.kind !== SyntaxKind.ImportEqualsDeclaration && importClause;
        switch (importKind) {
            case ImportKind.Default:
                return name ? undefined : ChangeTracker.with(context, t =>
                    t.replaceNode(sourceFile, importClause, createImportClause(createIdentifier(symbolName), namedBindings)));

            case ImportKind.Named: {
                const newImportSpecifier = createImportSpecifier(/*propertyName*/ undefined, createIdentifier(symbolName));
                if (namedBindings && namedBindings.kind === SyntaxKind.NamedImports && namedBindings.elements.length !== 0) {
                    // There are already named imports; add another.
                    return ChangeTracker.with(context, t => t.insertNodeInListAfter(
                        sourceFile,
                        namedBindings.elements[namedBindings.elements.length - 1],
                        newImportSpecifier));
                }
                if (!namedBindings || namedBindings.kind === SyntaxKind.NamedImports && namedBindings.elements.length === 0) {
                    return ChangeTracker.with(context, t =>
                        t.replaceNode(sourceFile, importClause, createImportClause(name, createNamedImports([newImportSpecifier]))));
                }
                return undefined;
            }

            case ImportKind.Namespace:
                return namedBindings ? undefined : ChangeTracker.with(context, t =>
                    t.replaceNode(sourceFile, importClause, createImportClause(name, createNamespaceImport(createIdentifier(symbolName)))));

            case ImportKind.Equals:
                return undefined;

            default:
                Debug.assertNever(importKind);
        }
    }

    function getCodeActionForUseExistingNamespaceImport(namespacePrefix: string, context: SymbolContext, symbolToken: Identifier): CodeFixAction {
        const { symbolName, sourceFile } = context;

        /**
         * Cases:
         *     import * as ns from "mod"
         *     import default, * as ns from "mod"
         *     import ns = require("mod")
         *
         * Because there is no import list, we alter the reference to include the
         * namespace instead of altering the import declaration. For example, "foo" would
         * become "ns.foo"
         */
        const changes = ChangeTracker.with(context, tracker =>
            tracker.replaceNode(sourceFile, symbolToken, createPropertyAccess(createIdentifier(namespacePrefix), symbolToken)));
        return createCodeAction(Diagnostics.Change_0_to_1, [symbolName, `${namespacePrefix}.${symbolName}`], changes);
    }

    function getImportCodeActions(context: CodeFixContext): CodeFixAction[] {
        return context.errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code
            ? getActionsForUMDImport(context)
            : getActionsForNonUMDImport(context);
    }

    function getActionsForUMDImport(context: CodeFixContext): CodeFixAction[] {
        const token = getTokenAtPosition(context.sourceFile, context.span.start, /*includeJsDocComment*/ false);
        const checker = context.program.getTypeChecker();

        let umdSymbol: Symbol | undefined;

        if (isIdentifier(token)) {
            // try the identifier to see if it is the umd symbol
            umdSymbol = checker.getSymbolAtLocation(token);
        }

        if (!isUMDExportSymbol(umdSymbol)) {
            // The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
            const parent = token.parent;
            const isNodeOpeningLikeElement = isJsxOpeningLikeElement(parent);
            if ((isJsxOpeningLikeElement && (<JsxOpeningLikeElement>parent).tagName === token) || parent.kind === SyntaxKind.JsxOpeningFragment) {
                umdSymbol = checker.resolveName(checker.getJsxNamespace(parent),
                    isNodeOpeningLikeElement ? (<JsxOpeningLikeElement>parent).tagName : parent, SymbolFlags.Value, /*excludeGlobals*/ false);
            }
        }

        if (isUMDExportSymbol(umdSymbol)) {
            const symbol = checker.getAliasedSymbol(umdSymbol);
            if (symbol) {
                return getCodeActionsForImport([{ moduleSymbol: symbol, importKind: getUmdImportKind(context.program.getCompilerOptions()) }],
                    convertToImportCodeFixContext(context, token, umdSymbol.name));
            }
        }

        return undefined;
    }

    function getUmdImportKind(compilerOptions: CompilerOptions) {
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

    function getActionsForNonUMDImport(context: CodeFixContext): CodeFixAction[] | undefined {
        // This will always be an Identifier, since the diagnostics we fix only fail on identifiers.
        const { sourceFile, span, program, cancellationToken } = context;
        const checker = program.getTypeChecker();
        const symbolToken = getTokenAtPosition(sourceFile, span.start, /*includeJsDocComment*/ false);
        // If we're at `<Foo/>`, we must check if `Foo` is already in scope, and if so, get an import for `React` instead.
        const symbolName = isJsxOpeningLikeElement(symbolToken.parent)
            && symbolToken.parent.tagName === symbolToken
            && (!isIdentifier(symbolToken) || isIntrinsicJsxName(symbolToken.text) || checker.resolveName(symbolToken.text, symbolToken, SymbolFlags.All, /*excludeGlobals*/ false))
            ? checker.getJsxNamespace()
            : isIdentifier(symbolToken) ? symbolToken.text : undefined;
        if (!symbolName) return undefined;

        // "default" is a keyword and not a legal identifier for the import, so we don't expect it here
        Debug.assert(symbolName !== "default");
        const currentTokenMeaning = getMeaningFromLocation(symbolToken);

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
                const localSymbol = getLocalSymbolForExportDefault(defaultExport);
                if ((
                        localSymbol && localSymbol.escapedName === symbolName ||
                        getEscapedNameForExportDefault(defaultExport) === symbolName ||
                        moduleSymbolToValidIdentifier(moduleSymbol, program.getCompilerOptions().target) === symbolName
                    ) && checkSymbolHasMeaning(localSymbol || defaultExport, currentTokenMeaning)) {
                    addSymbol(moduleSymbol, localSymbol || defaultExport, ImportKind.Default);
                }
            }

            // check exports with the same name
            const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
            if (exportSymbolWithIdenticalName && checkSymbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
                addSymbol(moduleSymbol, exportSymbolWithIdenticalName, ImportKind.Named);
            }

            function getEscapedNameForExportDefault(symbol: Symbol): __String | undefined {
                return firstDefined(symbol.declarations, declaration => {
                    if (isExportAssignment(declaration)) {
                        if (isIdentifier(declaration.expression)) {
                            return declaration.expression.escapedText;
                        }
                    }
                    else if (isExportSpecifier(declaration)) {
                        Debug.assert(declaration.name.escapedText === InternalSymbolName.Default);
                        if (declaration.propertyName) {
                            return declaration.propertyName.escapedText;
                        }
                    }
                });
            }
        });

        const addToExistingDeclaration: CodeFixAction[] = [];
        const addNewDeclaration: CodeFixAction[] = [];
        originalSymbolToExportInfos.forEach(exportInfos => {
            getCodeActionsForImport_separateExistingAndNew(exportInfos, convertToImportCodeFixContext(context, symbolToken, symbolName), addToExistingDeclaration, addNewDeclaration);
        });
        return [...addToExistingDeclaration, ...addNewDeclaration];
    }

    function checkSymbolHasMeaning({ declarations }: Symbol, meaning: SemanticMeaning): boolean {
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
                cb(sourceFile.symbol, sourceFile);
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

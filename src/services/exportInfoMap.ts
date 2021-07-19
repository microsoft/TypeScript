/*@internal*/
namespace ts {
    export const enum ImportKind {
        Named,
        Default,
        Namespace,
        CommonJS,
    }

    export const enum ExportKind {
        Named,
        Default,
        ExportEquals,
        UMD,
    }

    export interface SymbolExportInfo {
        readonly symbol: Symbol;
        readonly moduleSymbol: Symbol;
        /** Set if `moduleSymbol` is an external module, not an ambient module */
        moduleFileName: string | undefined;
        exportKind: ExportKind;
        /** If true, can't use an es6 import from a js file. */
        isTypeOnly: boolean;
        /** True if export was only found via the package.json AutoImportProvider (for telemetry). */
        isFromPackageJson: boolean;
    }

    interface CachedSymbolExportInfo {
        // Used to rehydrate `symbol` and `moduleSymbol` when transient
        id: number;
        symbolName: string;
        moduleName: string;
        moduleFile: SourceFile | undefined;

        // SymbolExportInfo, but optional symbols
        readonly symbol: Symbol | undefined;
        readonly moduleSymbol: Symbol | undefined;
        moduleFileName: string | undefined;
        exportKind: ExportKind;
        isTypeOnly: boolean;
        isFromPackageJson: boolean;
    }

    export interface ExportInfoMap {
        isUsableByFile(importingFile: Path): boolean;
        clear(): void;
        add(importingFile: Path, symbol: Symbol, moduleSymbol: Symbol, moduleFile: SourceFile | undefined, exportKind: ExportKind, isFromPackageJson: boolean, scriptTarget: ScriptTarget, checker: TypeChecker): void;
        get(importingFile: Path, importedName: string, symbol: Symbol, moduleName: string, checker: TypeChecker): readonly SymbolExportInfo[] | undefined;
        forEach(importingFile: Path, action: (info: readonly SymbolExportInfo[], name: string, isFromAmbientModule: boolean) => void): void;
        releaseSymbols(): void;
        isEmpty(): boolean;
        /** @returns Whether the change resulted in the cache being cleared */
        onFileChanged(oldSourceFile: SourceFile, newSourceFile: SourceFile, typeAcquisitionEnabled: boolean): boolean;
    }

    export interface CacheableExportInfoMapHost {
        getCurrentProgram(): Program | undefined;
        getPackageJsonAutoImportProvider(): Program | undefined;
    }

    export function createCacheableExportInfoMap(host: CacheableExportInfoMapHost): ExportInfoMap {
        let exportInfoId = 1;
        const exportInfo = createMultiMap<string, CachedSymbolExportInfo>();
        const symbols = new Map<number, [symbol: Symbol, moduleSymbol: Symbol]>();
        let usableByFileName: Path | undefined;
        const cache: ExportInfoMap = {
            isUsableByFile: importingFile => importingFile === usableByFileName,
            isEmpty: () => !exportInfo.size,
            clear: () => {
                exportInfo.clear();
                symbols.clear();
                usableByFileName = undefined;
            },
            add: (importingFile, symbol, moduleSymbol, moduleFile, exportKind, isFromPackageJson, scriptTarget, checker) => {
                if (importingFile !== usableByFileName) {
                    cache.clear();
                    usableByFileName = importingFile;
                }
                const isDefault = exportKind === ExportKind.Default;
                const importedName = getNameForExportedSymbol(isDefault && getLocalSymbolForExportDefault(symbol) || symbol, scriptTarget);
                const moduleName = stripQuotes(moduleSymbol.name);
                const id = exportInfoId++;
                const storedSymbol = symbol.flags & SymbolFlags.Transient ? undefined : symbol;
                const storedModuleSymbol = moduleSymbol.flags & SymbolFlags.Transient ? undefined : moduleSymbol;
                if (!storedSymbol || !storedModuleSymbol) symbols.set(id, [symbol, moduleSymbol]);

                exportInfo.add(key(importedName, symbol, moduleName, checker), {
                    id,
                    symbolName: importedName,
                    moduleName,
                    moduleFile,
                    moduleFileName: moduleFile?.fileName,
                    exportKind,
                    isTypeOnly: !(skipAlias(symbol, checker).flags & SymbolFlags.Value),
                    isFromPackageJson,
                    symbol: storedSymbol,
                    moduleSymbol: storedModuleSymbol,
                });
            },
            get: (importingFile, importedName, symbol, moduleName, checker) => {
                if (importingFile !== usableByFileName) return;
                const result = exportInfo.get(key(importedName, symbol, moduleName, checker));
                return result?.map(rehydrateCachedInfo);
            },
            forEach: (importingFile, action) => {
                if (importingFile !== usableByFileName) return;
                exportInfo.forEach((info, key) => {
                    const { symbolName, ambientModuleName } = parseKey(key);
                    action(info.map(rehydrateCachedInfo), symbolName, !!ambientModuleName);
                });
            },
            releaseSymbols: () => {
                symbols.clear();
            },
            onFileChanged: (oldSourceFile: SourceFile, newSourceFile: SourceFile, typeAcquisitionEnabled: boolean) => {
                if (fileIsGlobalOnly(oldSourceFile) && fileIsGlobalOnly(newSourceFile)) {
                    // File is purely global; doesn't affect export map
                    return false;
                }
                if (
                    usableByFileName && usableByFileName !== newSourceFile.path ||
                    // If ATA is enabled, auto-imports uses existing imports to guess whether you want auto-imports from node.
                    // Adding or removing imports from node could change the outcome of that guess, so could change the suggestions list.
                    typeAcquisitionEnabled && consumesNodeCoreModules(oldSourceFile) !== consumesNodeCoreModules(newSourceFile) ||
                    // Module agumentation and ambient module changes can add or remove exports available to be auto-imported.
                    // Changes elsewhere in the file can change the *type* of an export in a module augmentation,
                    // but type info is gathered in getCompletionEntryDetails, which doesn’t use the cache.
                    !arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations) ||
                    !ambientModuleDeclarationsAreEqual(oldSourceFile, newSourceFile)
                ) {
                    cache.clear();
                    return true;
                }
                usableByFileName = newSourceFile.path;
                return false;
            },
        };
        if (Debug.isDebugging) {
            Object.defineProperty(cache, "__cache", { get: () => exportInfo });
        }
        return cache;

        function rehydrateCachedInfo(info: CachedSymbolExportInfo): SymbolExportInfo {
            if (info.symbol && info.moduleSymbol) return info as SymbolExportInfo;
            const { id, exportKind, isTypeOnly, isFromPackageJson, moduleFileName } = info;
            const [cachedSymbol, cachedModuleSymbol] = symbols.get(id) || emptyArray;
            if (cachedSymbol && cachedModuleSymbol) {
                return {
                    symbol: cachedSymbol,
                    moduleSymbol: cachedModuleSymbol,
                    moduleFileName,
                    exportKind,
                    isTypeOnly,
                    isFromPackageJson,
                };
            }
            const checker = (isFromPackageJson
                ? host.getPackageJsonAutoImportProvider()!
                : host.getCurrentProgram()!).getTypeChecker();
            const moduleSymbol = info.moduleSymbol || cachedModuleSymbol || Debug.checkDefined(info.moduleFile
                ? checker.getMergedSymbol(info.moduleFile.symbol)
                : checker.tryFindAmbientModule(info.moduleName));
            const symbolName = exportKind === ExportKind.Default
                ? InternalSymbolName.Default
                : info.symbolName;
            const symbol = info.symbol || cachedSymbol || Debug.checkDefined(exportKind === ExportKind.ExportEquals
                ? checker.resolveExternalModuleSymbol(moduleSymbol)
                : checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol));
            symbols.set(id, [symbol, moduleSymbol]);
            return {
                symbol,
                moduleSymbol,
                moduleFileName,
                exportKind,
                isTypeOnly,
                isFromPackageJson,
            };
        }

        function key(importedName: string, symbol: Symbol, moduleName: string, checker: TypeChecker) {
            const unquoted = stripQuotes(moduleName);
            const moduleKey = isExternalModuleNameRelative(unquoted) ? "/" : unquoted;
            const target = skipAlias(symbol, checker);
            return `${importedName}|${createSymbolKey(target)}|${moduleKey}`;
        }

        function parseKey(key: string) {
            const symbolName = key.substring(0, key.indexOf("|"));
            const moduleKey = key.substring(key.lastIndexOf("|") + 1);
            const ambientModuleName = moduleKey === "/" ? undefined : moduleKey;
            return { symbolName, ambientModuleName };
        }

        function createSymbolKey(symbol: Symbol) {
            let key = symbol.name;
            while (symbol.parent) {
                key += `,${symbol.parent.name}`;
                symbol = symbol.parent;
            }
            return key;
        }

        function fileIsGlobalOnly(file: SourceFile) {
            return !file.commonJsModuleIndicator && !file.externalModuleIndicator && !file.moduleAugmentations && !file.ambientModuleNames;
        }

        function ambientModuleDeclarationsAreEqual(oldSourceFile: SourceFile, newSourceFile: SourceFile) {
            if (!arrayIsEqualTo(oldSourceFile.ambientModuleNames, newSourceFile.ambientModuleNames)) {
                return false;
            }
            let oldFileStatementIndex = -1;
            let newFileStatementIndex = -1;
            for (const ambientModuleName of newSourceFile.ambientModuleNames) {
                const isMatchingModuleDeclaration = (node: Statement) => isNonGlobalAmbientModule(node) && node.name.text === ambientModuleName;
                oldFileStatementIndex = findIndex(oldSourceFile.statements, isMatchingModuleDeclaration, oldFileStatementIndex + 1);
                newFileStatementIndex = findIndex(newSourceFile.statements, isMatchingModuleDeclaration, newFileStatementIndex + 1);
                if (oldSourceFile.statements[oldFileStatementIndex] !== newSourceFile.statements[newFileStatementIndex]) {
                    return false;
                }
            }
            return true;
        }
    }

    export function isImportableFile(
        program: Program,
        from: SourceFile,
        to: SourceFile,
        preferences: UserPreferences,
        packageJsonFilter: PackageJsonImportFilter | undefined,
        moduleSpecifierResolutionHost: ModuleSpecifierResolutionHost,
        moduleSpecifierCache: ModuleSpecifierCache | undefined,
    ): boolean {
        if (from === to) return false;
        const cachedResult = moduleSpecifierCache?.get(from.path, to.path, preferences);
        if (cachedResult?.isAutoImportable !== undefined) {
            return cachedResult.isAutoImportable;
        }

        const getCanonicalFileName = hostGetCanonicalFileName(moduleSpecifierResolutionHost);
        const globalTypingsCache = moduleSpecifierResolutionHost.getGlobalTypingsCacheLocation?.();
        const hasImportablePath = !!moduleSpecifiers.forEachFileNameOfModule(
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

        if (packageJsonFilter) {
            const isAutoImportable = hasImportablePath && packageJsonFilter.allowsImportingSourceFile(to, moduleSpecifierResolutionHost);
            moduleSpecifierCache?.setIsAutoImportable(from.path, to.path, preferences, isAutoImportable);
            return isAutoImportable;
        }

        return hasImportablePath;
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

    export function forEachExternalModuleToImportFrom(
        program: Program,
        host: LanguageServiceHost,
        useAutoImportProvider: boolean,
        cb: (module: Symbol, moduleFile: SourceFile | undefined, program: Program, isFromPackageJson: boolean) => void,
    ) {
        forEachExternalModule(program.getTypeChecker(), program.getSourceFiles(), (module, file) => cb(module, file, program, /*isFromPackageJson*/ false));
        const autoImportProvider = useAutoImportProvider && host.getPackageJsonAutoImportProvider?.();
        if (autoImportProvider) {
            const start = timestamp();
            forEachExternalModule(autoImportProvider.getTypeChecker(), autoImportProvider.getSourceFiles(), (module, file) => cb(module, file, autoImportProvider, /*isFromPackageJson*/ true));
            host.log?.(`forEachExternalModuleToImportFrom autoImportProvider: ${timestamp() - start}`);
        }
    }

    function forEachExternalModule(checker: TypeChecker, allSourceFiles: readonly SourceFile[], cb: (module: Symbol, sourceFile: SourceFile | undefined) => void) {
        for (const ambient of checker.getAmbientModules()) {
            if (!stringContains(ambient.name, "*")) {
                cb(ambient, /*sourceFile*/ undefined);
            }
        }
        for (const sourceFile of allSourceFiles) {
            if (isExternalOrCommonJsModule(sourceFile)) {
                cb(checker.getMergedSymbol(sourceFile.symbol), sourceFile);
            }
        }
    }

    export function getExportInfoMap(importingFile: SourceFile, host: LanguageServiceHost, program: Program): ExportInfoMap {
        const start = timestamp();
        // Pulling the AutoImportProvider project will trigger its updateGraph if pending,
        // which will invalidate the export map cache if things change, so pull it before
        // checking the cache.
        host.getPackageJsonAutoImportProvider?.();
        const cache = host.getCachedExportInfoMap?.() || createCacheableExportInfoMap({
            getCurrentProgram: () => program,
            getPackageJsonAutoImportProvider: () => host.getPackageJsonAutoImportProvider?.(),
        });

        if (cache.isUsableByFile(importingFile.path)) {
            host.log?.("getExportInfoMap: cache hit");
            return cache;
        }

        host.log?.("getExportInfoMap: cache miss or empty; calculating new results");
        const compilerOptions = program.getCompilerOptions();
        const scriptTarget = getEmitScriptTarget(compilerOptions);
        forEachExternalModuleToImportFrom(program, host, /*useAutoImportProvider*/ true, (moduleSymbol, moduleFile, program, isFromPackageJson) => {
            const seenExports = new Map<Symbol, true>();
            const checker = program.getTypeChecker();
            const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
            // Note: I think we shouldn't actually see resolved module symbols here, but weird merges
            // can cause it to happen: see 'completionsImport_mergedReExport.ts'
            if (defaultInfo && !checker.isUndefinedSymbol(defaultInfo.symbol) && !isExternalModuleSymbol(defaultInfo.symbol)) {
                cache.add(
                    importingFile.path,
                    defaultInfo.symbol,
                    moduleSymbol,
                    moduleFile,
                    defaultInfo.exportKind,
                    isFromPackageJson,
                    scriptTarget,
                    checker);
            }
            for (const exported of checker.getExportsAndPropertiesOfModule(moduleSymbol)) {
                if (exported !== defaultInfo?.symbol && !isKnownSymbol(exported) && !isExternalModuleSymbol(exported) && addToSeen(seenExports, exported)) {
                    cache.add(
                        importingFile.path,
                        exported,
                        moduleSymbol,
                        moduleFile,
                        ExportKind.Named,
                        isFromPackageJson,
                        scriptTarget,
                        checker);
                }
            }
        });

        host.log?.(`getExportInfoMap: done in ${timestamp() - start} ms`);
        return cache;
    }

    export function getDefaultLikeExportInfo(moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions) {
        const exported = getDefaultLikeExportWorker(moduleSymbol, checker);
        if (!exported) return undefined;
        const { symbol, exportKind } = exported;
        const info = getDefaultExportInfoWorker(symbol, checker, compilerOptions);
        return info && { symbol, exportKind, ...info };
    }

    function getDefaultLikeExportWorker(moduleSymbol: Symbol, checker: TypeChecker): { readonly symbol: Symbol, readonly exportKind: ExportKind } | undefined {
        const exportEquals = checker.resolveExternalModuleSymbol(moduleSymbol);
        if (exportEquals !== moduleSymbol) return { symbol: exportEquals, exportKind: ExportKind.ExportEquals };
        const defaultExport = checker.tryGetMemberInModuleExports(InternalSymbolName.Default, moduleSymbol);
        if (defaultExport) return { symbol: defaultExport, exportKind: ExportKind.Default };
    }

    function getDefaultExportInfoWorker(defaultExport: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions): { readonly symbolForMeaning: Symbol, readonly name: string } | undefined {
        const localSymbol = getLocalSymbolForExportDefault(defaultExport);
        if (localSymbol) return { symbolForMeaning: localSymbol, name: localSymbol.name };

        const name = getNameForExportDefault(defaultExport);
        if (name !== undefined) return { symbolForMeaning: defaultExport, name };

        if (defaultExport.flags & SymbolFlags.Alias) {
            const aliased = checker.getImmediateAliasedSymbol(defaultExport);
            if (aliased && aliased.parent) {
                // - `aliased` will be undefined if the module is exporting an unresolvable name,
                //    but we can still offer completions for it.
                // - `aliased.parent` will be undefined if the module is exporting `globalThis.something`,
                //    or another expression that resolves to a global.
                return getDefaultExportInfoWorker(aliased, checker, compilerOptions);
            }
        }

        if (defaultExport.escapedName !== InternalSymbolName.Default &&
            defaultExport.escapedName !== InternalSymbolName.ExportEquals) {
            return { symbolForMeaning: defaultExport, name: defaultExport.getName() };
        }
        return { symbolForMeaning: defaultExport, name: getNameForExportedSymbol(defaultExport, compilerOptions.target) };
    }

    function getNameForExportDefault(symbol: Symbol): string | undefined {
        return symbol.declarations && firstDefined(symbol.declarations, declaration => {
            if (isExportAssignment(declaration)) {
                return tryCast(skipOuterExpressions(declaration.expression), isIdentifier)?.text;
            }
            else if (isExportSpecifier(declaration)) {
                Debug.assert(declaration.name.text === InternalSymbolName.Default, "Expected the specifier to be a default export");
                return declaration.propertyName && declaration.propertyName.text;
            }
        });
    }
}

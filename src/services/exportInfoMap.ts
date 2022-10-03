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
        targetFlags: SymbolFlags;
        /** True if export was only found via the package.json AutoImportProvider (for telemetry). */
        isFromPackageJson: boolean;
    }

    interface CachedSymbolExportInfo {
        // Used to rehydrate `symbol` and `moduleSymbol` when transient
        id: number;
        symbolName: string;
        capitalizedSymbolName: string | undefined;
        symbolTableKey: __String;
        moduleName: string;
        moduleFile: SourceFile | undefined;
        packageName: string | undefined;

        // SymbolExportInfo, but optional symbols
        readonly symbol: Symbol | undefined;
        readonly moduleSymbol: Symbol | undefined;
        moduleFileName: string | undefined;
        exportKind: ExportKind;
        targetFlags: SymbolFlags;
        isFromPackageJson: boolean;
    }

    export interface ExportInfoMap {
        isUsableByFile(importingFile: Path): boolean;
        clear(): void;
        add(importingFile: Path, symbol: Symbol, key: __String, moduleSymbol: Symbol, moduleFile: SourceFile | undefined, exportKind: ExportKind, isFromPackageJson: boolean, checker: TypeChecker): void;
        get(importingFile: Path, key: string): readonly SymbolExportInfo[] | undefined;
        search<T>(importingFile: Path, preferCapitalized: boolean, matches: (name: string, targetFlags: SymbolFlags) => boolean, action: (info: readonly SymbolExportInfo[], symbolName: string, isFromAmbientModule: boolean, key: string) => T | undefined): T | undefined;
        releaseSymbols(): void;
        isEmpty(): boolean;
        /** @returns Whether the change resulted in the cache being cleared */
        onFileChanged(oldSourceFile: SourceFile, newSourceFile: SourceFile, typeAcquisitionEnabled: boolean): boolean;
    }

    export interface CacheableExportInfoMapHost {
        getCurrentProgram(): Program | undefined;
        getPackageJsonAutoImportProvider(): Program | undefined;
        getGlobalTypingsCacheLocation(): string | undefined;
    }

    export function createCacheableExportInfoMap(host: CacheableExportInfoMapHost): ExportInfoMap {
        let exportInfoId = 1;
        const exportInfo = createMultiMap<string, CachedSymbolExportInfo>();
        const symbols = new Map<number, [symbol: Symbol, moduleSymbol: Symbol]>();
        /**
         * Key: node_modules package name (no @types).
         * Value: path to deepest node_modules folder seen that is
         * both visible to `usableByFileName` and contains the package.
         *
         * Later, we can see if a given SymbolExportInfo is shadowed by
         * a another installation of the same package in a deeper
         * node_modules folder by seeing if its path starts with the
         * value stored here.
         */
        const packages = new Map<string, string>();
        let usableByFileName: Path | undefined;
        const cache: ExportInfoMap = {
            isUsableByFile: importingFile => importingFile === usableByFileName,
            isEmpty: () => !exportInfo.size,
            clear: () => {
                exportInfo.clear();
                symbols.clear();
                usableByFileName = undefined;
            },
            add: (importingFile, symbol, symbolTableKey, moduleSymbol, moduleFile, exportKind, isFromPackageJson, checker) => {
                if (importingFile !== usableByFileName) {
                    cache.clear();
                    usableByFileName = importingFile;
                }

                let packageName;
                if (moduleFile) {
                    const nodeModulesPathParts = getNodeModulePathParts(moduleFile.fileName);
                    if (nodeModulesPathParts) {
                        const { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex } = nodeModulesPathParts;
                        packageName = unmangleScopedPackageName(getPackageNameFromTypesPackageName(moduleFile.fileName.substring(topLevelPackageNameIndex + 1, packageRootIndex)));
                        if (startsWith(importingFile, moduleFile.path.substring(0, topLevelNodeModulesIndex))) {
                            const prevDeepestNodeModulesPath = packages.get(packageName);
                            const nodeModulesPath = moduleFile.fileName.substring(0, topLevelPackageNameIndex + 1);
                            if (prevDeepestNodeModulesPath) {
                                const prevDeepestNodeModulesIndex = prevDeepestNodeModulesPath.indexOf(nodeModulesPathPart);
                                if (topLevelNodeModulesIndex > prevDeepestNodeModulesIndex) {
                                    packages.set(packageName, nodeModulesPath);
                                }
                            }
                            else {
                                packages.set(packageName, nodeModulesPath);
                            }
                        }
                    }
                }

                const isDefault = exportKind === ExportKind.Default;
                const namedSymbol = isDefault && getLocalSymbolForExportDefault(symbol) || symbol;
                // 1. A named export must be imported by its key in `moduleSymbol.exports` or `moduleSymbol.members`.
                // 2. A re-export merged with an export from a module augmentation can result in `symbol`
                //    being an external module symbol; the name it is re-exported by will be `symbolTableKey`
                //    (which comes from the keys of `moduleSymbol.exports`.)
                // 3. Otherwise, we have a default/namespace import that can be imported by any name, and
                //    `symbolTableKey` will be something undesirable like `export=` or `default`, so we try to
                //    get a better name.
                const names = exportKind === ExportKind.Named || isExternalModuleSymbol(namedSymbol)
                    ? unescapeLeadingUnderscores(symbolTableKey)
                    : getNamesForExportedSymbol(namedSymbol, /*scriptTarget*/ undefined);

                const symbolName = typeof names === "string" ? names : names[0];
                const capitalizedSymbolName = typeof names === "string" ? undefined : names[1];

                const moduleName = stripQuotes(moduleSymbol.name);
                const id = exportInfoId++;
                const target = skipAlias(symbol, checker);
                const storedSymbol = symbol.flags & SymbolFlags.Transient ? undefined : symbol;
                const storedModuleSymbol = moduleSymbol.flags & SymbolFlags.Transient ? undefined : moduleSymbol;
                if (!storedSymbol || !storedModuleSymbol) symbols.set(id, [symbol, moduleSymbol]);

                exportInfo.add(key(symbolName, symbol, isExternalModuleNameRelative(moduleName) ? undefined : moduleName, checker), {
                    id,
                    symbolTableKey,
                    symbolName,
                    capitalizedSymbolName,
                    moduleName,
                    moduleFile,
                    moduleFileName: moduleFile?.fileName,
                    packageName,
                    exportKind,
                    targetFlags: target.flags,
                    isFromPackageJson,
                    symbol: storedSymbol,
                    moduleSymbol: storedModuleSymbol,
                });
            },
            get: (importingFile, key) => {
                if (importingFile !== usableByFileName) return;
                const result = exportInfo.get(key);
                return result?.map(rehydrateCachedInfo);
            },
            search: (importingFile, preferCapitalized, matches, action) => {
                if (importingFile !== usableByFileName) return;
                return forEachEntry(exportInfo, (info, key) => {
                    const { symbolName, ambientModuleName } = parseKey(key);
                    const name = preferCapitalized && info[0].capitalizedSymbolName || symbolName;
                    if (matches(name, info[0].targetFlags)) {
                        const rehydrated = info.map(rehydrateCachedInfo);
                        const filtered = rehydrated.filter((r, i) => isNotShadowedByDeeperNodeModulesPackage(r, info[i].packageName));
                        if (filtered.length) {
                            const res = action(filtered, name, !!ambientModuleName, key);
                            if (res !== undefined) return res;
                        }
                    }
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
            const { id, exportKind, targetFlags, isFromPackageJson, moduleFileName } = info;
            const [cachedSymbol, cachedModuleSymbol] = symbols.get(id) || emptyArray;
            if (cachedSymbol && cachedModuleSymbol) {
                return {
                    symbol: cachedSymbol,
                    moduleSymbol: cachedModuleSymbol,
                    moduleFileName,
                    exportKind,
                    targetFlags,
                    isFromPackageJson,
                };
            }
            const checker = (isFromPackageJson
                ? host.getPackageJsonAutoImportProvider()!
                : host.getCurrentProgram()!).getTypeChecker();
            const moduleSymbol = info.moduleSymbol || cachedModuleSymbol || Debug.checkDefined(info.moduleFile
                ? checker.getMergedSymbol(info.moduleFile.symbol)
                : checker.tryFindAmbientModule(info.moduleName));
            const symbol = info.symbol || cachedSymbol || Debug.checkDefined(exportKind === ExportKind.ExportEquals
                ? checker.resolveExternalModuleSymbol(moduleSymbol)
                : checker.tryGetMemberInModuleExportsAndProperties(unescapeLeadingUnderscores(info.symbolTableKey), moduleSymbol),
                `Could not find symbol '${info.symbolName}' by key '${info.symbolTableKey}' in module ${moduleSymbol.name}`);
            symbols.set(id, [symbol, moduleSymbol]);
            return {
                symbol,
                moduleSymbol,
                moduleFileName,
                exportKind,
                targetFlags,
                isFromPackageJson,
            };
        }

        function key(importedName: string, symbol: Symbol, ambientModuleName: string | undefined, checker: TypeChecker): string {
            const moduleKey = ambientModuleName || "";
            return `${importedName}|${getSymbolId(skipAlias(symbol, checker))}|${moduleKey}`;
        }

        function parseKey(key: string) {
            const symbolName = key.substring(0, key.indexOf("|"));
            const moduleKey = key.substring(key.lastIndexOf("|") + 1);
            const ambientModuleName = moduleKey === "" ? undefined : moduleKey;
            return { symbolName, ambientModuleName };
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

        function isNotShadowedByDeeperNodeModulesPackage(info: SymbolExportInfo, packageName: string | undefined) {
            if (!packageName || !info.moduleFileName) return true;
            const typingsCacheLocation = host.getGlobalTypingsCacheLocation();
            if (typingsCacheLocation && startsWith(info.moduleFileName, typingsCacheLocation)) return true;
            const packageDeepestNodeModulesPath = packages.get(packageName);
            return !packageDeepestNodeModulesPath || startsWith(info.moduleFileName, packageDeepestNodeModulesPath);
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
        const cachedResult = moduleSpecifierCache?.get(from.path, to.path, preferences, {});
        if (cachedResult?.isBlockedByPackageJsonDependencies !== undefined) {
            return !cachedResult.isBlockedByPackageJsonDependencies;
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
            moduleSpecifierCache?.setBlockedByPackageJsonDependencies(from.path, to.path, preferences, {}, !isAutoImportable);
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
        preferences: UserPreferences,
        useAutoImportProvider: boolean,
        cb: (module: Symbol, moduleFile: SourceFile | undefined, program: Program, isFromPackageJson: boolean) => void,
    ) {
        const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
        const excludePatterns = preferences.autoImportFileExcludePatterns && mapDefined(preferences.autoImportFileExcludePatterns, spec => {
            // The client is expected to send rooted path specs since we don't know
            // what directory a relative path is relative to.
            const pattern = getPatternFromSpec(spec, "", "exclude");
            return pattern ? getRegexFromPattern(pattern, useCaseSensitiveFileNames) : undefined;
        });

        forEachExternalModule(program.getTypeChecker(), program.getSourceFiles(), excludePatterns, (module, file) => cb(module, file, program, /*isFromPackageJson*/ false));
        const autoImportProvider = useAutoImportProvider && host.getPackageJsonAutoImportProvider?.();
        if (autoImportProvider) {
            const start = timestamp();
            forEachExternalModule(autoImportProvider.getTypeChecker(), autoImportProvider.getSourceFiles(), excludePatterns, (module, file) => cb(module, file, autoImportProvider, /*isFromPackageJson*/ true));
            host.log?.(`forEachExternalModuleToImportFrom autoImportProvider: ${timestamp() - start}`);
        }
    }

    function forEachExternalModule(checker: TypeChecker, allSourceFiles: readonly SourceFile[], excludePatterns: readonly RegExp[] | undefined, cb: (module: Symbol, sourceFile: SourceFile | undefined) => void) {
        const isExcluded = (fileName: string) => excludePatterns?.some(p => p.test(fileName));
        for (const ambient of checker.getAmbientModules()) {
            if (!stringContains(ambient.name, "*") && !(excludePatterns && ambient.declarations?.every(d => isExcluded(d.getSourceFile().fileName)))) {
                cb(ambient, /*sourceFile*/ undefined);
            }
        }
        for (const sourceFile of allSourceFiles) {
            if (isExternalOrCommonJsModule(sourceFile) && !isExcluded(sourceFile.fileName)) {
                cb(checker.getMergedSymbol(sourceFile.symbol), sourceFile);
            }
        }
    }

    export function getExportInfoMap(importingFile: SourceFile, host: LanguageServiceHost, program: Program, preferences: UserPreferences, cancellationToken: CancellationToken | undefined): ExportInfoMap {
        const start = timestamp();
        // Pulling the AutoImportProvider project will trigger its updateGraph if pending,
        // which will invalidate the export map cache if things change, so pull it before
        // checking the cache.
        host.getPackageJsonAutoImportProvider?.();
        const cache = host.getCachedExportInfoMap?.() || createCacheableExportInfoMap({
            getCurrentProgram: () => program,
            getPackageJsonAutoImportProvider: () => host.getPackageJsonAutoImportProvider?.(),
            getGlobalTypingsCacheLocation: () => host.getGlobalTypingsCacheLocation?.(),
        });

        if (cache.isUsableByFile(importingFile.path)) {
            host.log?.("getExportInfoMap: cache hit");
            return cache;
        }

        host.log?.("getExportInfoMap: cache miss or empty; calculating new results");
        const compilerOptions = program.getCompilerOptions();
        let moduleCount = 0;
        try {
            forEachExternalModuleToImportFrom(program, host, preferences, /*useAutoImportProvider*/ true, (moduleSymbol, moduleFile, program, isFromPackageJson) => {
                if (++moduleCount % 100 === 0) cancellationToken?.throwIfCancellationRequested();
                const seenExports = new Map<__String, true>();
                const checker = program.getTypeChecker();
                const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
                // Note: I think we shouldn't actually see resolved module symbols here, but weird merges
                // can cause it to happen: see 'completionsImport_mergedReExport.ts'
                if (defaultInfo && isImportableSymbol(defaultInfo.symbol, checker)) {
                    cache.add(
                        importingFile.path,
                        defaultInfo.symbol,
                        defaultInfo.exportKind === ExportKind.Default ? InternalSymbolName.Default : InternalSymbolName.ExportEquals,
                        moduleSymbol,
                        moduleFile,
                        defaultInfo.exportKind,
                        isFromPackageJson,
                        checker);
                }
                checker.forEachExportAndPropertyOfModule(moduleSymbol, (exported, key) => {
                    if (exported !== defaultInfo?.symbol && isImportableSymbol(exported, checker) && addToSeen(seenExports, key)) {
                        cache.add(
                            importingFile.path,
                            exported,
                            key,
                            moduleSymbol,
                            moduleFile,
                            ExportKind.Named,
                            isFromPackageJson,
                            checker);
                    }
                });
            });
        }
        catch (err) {
            // Ensure cache is reset if operation is cancelled
            cache.clear();
            throw err;
        }

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

    function isImportableSymbol(symbol: Symbol, checker: TypeChecker) {
        return !checker.isUndefinedSymbol(symbol) && !checker.isUnknownSymbol(symbol) && !isKnownSymbol(symbol) && !isPrivateIdentifierSymbol(symbol);
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

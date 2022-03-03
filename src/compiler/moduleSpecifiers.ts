// Used by importFixes, getEditsForFileRename, and declaration emit to synthesize import module specifiers.
/* @internal */
namespace ts.moduleSpecifiers {
    const enum RelativePreference { Relative, NonRelative, Shortest, ExternalNonRelative }
    // See UserPreferences#importPathEnding
    const enum Ending { Minimal, Index, JsExtension }

    // Processed preferences
    interface Preferences {
        readonly relativePreference: RelativePreference;
        readonly ending: Ending;
    }

    function getPreferences(host: ModuleSpecifierResolutionHost, { importModuleSpecifierPreference, importModuleSpecifierEnding }: UserPreferences, compilerOptions: CompilerOptions, importingSourceFile: SourceFile): Preferences {
        return {
            relativePreference:
                importModuleSpecifierPreference === "relative" ? RelativePreference.Relative :
                importModuleSpecifierPreference === "non-relative" ? RelativePreference.NonRelative :
                importModuleSpecifierPreference === "project-relative" ? RelativePreference.ExternalNonRelative :
                RelativePreference.Shortest,
            ending: getEnding(),
        };
        function getEnding(): Ending {
            switch (importModuleSpecifierEnding) {
                case "minimal": return Ending.Minimal;
                case "index": return Ending.Index;
                case "js": return Ending.JsExtension;
                default: return usesJsExtensionOnImports(importingSourceFile) || isFormatRequiringExtensions(compilerOptions, importingSourceFile.path, host) ? Ending.JsExtension
                    : getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.NodeJs ? Ending.Index : Ending.Minimal;
            }
        }
    }

    function getPreferencesForUpdate(compilerOptions: CompilerOptions, oldImportSpecifier: string, importingSourceFileName: Path, host: ModuleSpecifierResolutionHost): Preferences {
        return {
            relativePreference: isExternalModuleNameRelative(oldImportSpecifier) ? RelativePreference.Relative : RelativePreference.NonRelative,
            ending: hasJSFileExtension(oldImportSpecifier) || isFormatRequiringExtensions(compilerOptions, importingSourceFileName, host) ?
                Ending.JsExtension :
                getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.NodeJs || endsWith(oldImportSpecifier, "index") ? Ending.Index : Ending.Minimal,
        };
    }

    function isFormatRequiringExtensions(compilerOptions: CompilerOptions, importingSourceFileName: Path, host: ModuleSpecifierResolutionHost) {
        if (getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.Node12
        && getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.NodeNext) {
            return false;
        }
        return getImpliedNodeFormatForFile(importingSourceFileName, host.getPackageJsonInfoCache?.(), getModuleResolutionHost(host), compilerOptions) !== ModuleKind.CommonJS;
    }

    function getModuleResolutionHost(host: ModuleSpecifierResolutionHost): ModuleResolutionHost {
        return {
            fileExists: host.fileExists,
            readFile: Debug.checkDefined(host.readFile),
            directoryExists: host.directoryExists,
            getCurrentDirectory: host.getCurrentDirectory,
            realpath: host.realpath,
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames?.(),
        };
    }

    // `importingSourceFile` and `importingSourceFileName`? Why not just use `importingSourceFile.path`?
    // Because when this is called by the file renamer, `importingSourceFile` is the file being renamed,
    // while `importingSourceFileName` its *new* name. We need a source file just to get its
    // `impliedNodeFormat` and to detect certain preferences from existing import module specifiers.
    export function updateModuleSpecifier(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        oldImportSpecifier: string,
        options: ModuleSpecifierOptions = {},
    ): string | undefined {
        const res = getModuleSpecifierWorker(compilerOptions, importingSourceFile, importingSourceFileName, toFileName, host, getPreferencesForUpdate(compilerOptions, oldImportSpecifier, importingSourceFileName, host), {}, options);
        if (res === oldImportSpecifier) return undefined;
        return res;
    }

    // `importingSourceFile` and `importingSourceFileName`? Why not just use `importingSourceFile.path`?
    // Because when this is called by the declaration emitter, `importingSourceFile` is the implementation
    // file, but `importingSourceFileName` and `toFileName` refer to declaration files (the former to the
    // one currently being produced; the latter to the one being imported). We need an implementation file
    // just to get its `impliedNodeFormat` and to detect certain preferences from existing import module
    // specifiers.
    export function getModuleSpecifier(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        options: ModuleSpecifierOptions = {},
    ): string {
        return getModuleSpecifierWorker(compilerOptions, importingSourceFile, importingSourceFileName, toFileName, host, getPreferences(host, {}, compilerOptions, importingSourceFile), {}, options);
    }

    export function getNodeModulesPackageName(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        nodeModulesFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): string | undefined {
        const info = getInfo(importingSourceFile.path, host);
        const modulePaths = getAllModulePaths(importingSourceFile.path, nodeModulesFileName, host, preferences, options);
        return firstDefined(modulePaths,
            modulePath => tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, /*packageNameOnly*/ true, options.overrideImportMode));
    }

    function getModuleSpecifierWorker(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: Preferences,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {}
    ): string {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(importingSourceFileName, toFileName, host, userPreferences, options);
        return firstDefined(modulePaths, modulePath => tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, /*packageNameOnly*/ undefined, options.overrideImportMode)) ||
            getLocalModuleSpecifier(toFileName, info, compilerOptions, host, preferences);
    }

    export function tryGetModuleSpecifiersFromCache(
        moduleSymbol: Symbol,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): readonly string[] | undefined {
        return tryGetModuleSpecifiersFromCacheWorker(
            moduleSymbol,
            importingSourceFile,
            host,
            userPreferences,
            options)[0];
    }

    function tryGetModuleSpecifiersFromCacheWorker(
        moduleSymbol: Symbol,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): readonly [specifiers?: readonly string[], moduleFile?: SourceFile, modulePaths?: readonly ModulePath[], cache?: ModuleSpecifierCache] {
        const moduleSourceFile = getSourceFileOfModule(moduleSymbol);
        if (!moduleSourceFile) {
            return emptyArray as [];
        }

        const cache = host.getModuleSpecifierCache?.();
        const cached = cache?.get(importingSourceFile.path, moduleSourceFile.path, userPreferences, options);
        return [cached?.moduleSpecifiers, moduleSourceFile, cached?.modulePaths, cache];
    }

    /** Returns an import for each symlink and for the realpath. */
    export function getModuleSpecifiers(
        moduleSymbol: Symbol,
        checker: TypeChecker,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): readonly string[] {
        return getModuleSpecifiersWithCacheInfo(
            moduleSymbol,
            checker,
            compilerOptions,
            importingSourceFile,
            host,
            userPreferences,
            options
        ).moduleSpecifiers;
    }

    export function getModuleSpecifiersWithCacheInfo(
        moduleSymbol: Symbol,
        checker: TypeChecker,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): { moduleSpecifiers: readonly string[], computedWithoutCache: boolean } {
        let computedWithoutCache = false;
        const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol, checker);
        if (ambient) return { moduleSpecifiers: [ambient], computedWithoutCache };

        // eslint-disable-next-line prefer-const
        let [specifiers, moduleSourceFile, modulePaths, cache] = tryGetModuleSpecifiersFromCacheWorker(
            moduleSymbol,
            importingSourceFile,
            host,
            userPreferences,
            options
        );
        if (specifiers) return { moduleSpecifiers: specifiers, computedWithoutCache };
        if (!moduleSourceFile) return { moduleSpecifiers: emptyArray, computedWithoutCache };

        computedWithoutCache = true;
        modulePaths ||= getAllModulePathsWorker(importingSourceFile.path, moduleSourceFile.originalFileName, host);
        const result = computeModuleSpecifiers(modulePaths, compilerOptions, importingSourceFile, host, userPreferences, options);
        cache?.set(importingSourceFile.path, moduleSourceFile.path, userPreferences, options, modulePaths, result);
        return { moduleSpecifiers: result, computedWithoutCache };
    }

    function computeModuleSpecifiers(
        modulePaths: readonly ModulePath[],
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ): readonly string[] {
        const info = getInfo(importingSourceFile.path, host);
        const preferences = getPreferences(host, userPreferences, compilerOptions, importingSourceFile);
        const existingSpecifier = forEach(modulePaths, modulePath => forEach(
            host.getFileIncludeReasons().get(toPath(modulePath.path, host.getCurrentDirectory(), info.getCanonicalFileName)),
            reason => {
                if (reason.kind !== FileIncludeKind.Import || reason.file !== importingSourceFile.path) return undefined;
                // If the candidate import mode doesn't match the mode we're generating for, don't consider it
                // TODO: maybe useful to keep around as an alternative option for certain contexts where the mode is overridable
                if (importingSourceFile.impliedNodeFormat && importingSourceFile.impliedNodeFormat !== getModeForResolutionAtIndex(importingSourceFile, reason.index)) return undefined;
                const specifier = getModuleNameStringLiteralAt(importingSourceFile, reason.index).text;
                // If the preference is for non relative and the module specifier is relative, ignore it
                return preferences.relativePreference !== RelativePreference.NonRelative || !pathIsRelative(specifier) ?
                    specifier :
                    undefined;
            }
        ));
        if (existingSpecifier) {
            const moduleSpecifiers = [existingSpecifier];
            return moduleSpecifiers;
        }

        const importedFileIsInNodeModules = some(modulePaths, p => p.isInNodeModules);

        // Module specifier priority:
        //   1. "Bare package specifiers" (e.g. "@foo/bar") resulting from a path through node_modules to a package.json's "types" entry
        //   2. Specifiers generated using "paths" from tsconfig
        //   3. Non-relative specfiers resulting from a path through node_modules (e.g. "@foo/bar/path/to/file")
        //   4. Relative paths
        let nodeModulesSpecifiers: string[] | undefined;
        let pathsSpecifiers: string[] | undefined;
        let relativeSpecifiers: string[] | undefined;
        for (const modulePath of modulePaths) {
            const specifier = tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, /*packageNameOnly*/ undefined, options.overrideImportMode);
            nodeModulesSpecifiers = append(nodeModulesSpecifiers, specifier);
            if (specifier && modulePath.isRedirect) {
                // If we got a specifier for a redirect, it was a bare package specifier (e.g. "@foo/bar",
                // not "@foo/bar/path/to/file"). No other specifier will be this good, so stop looking.
                return nodeModulesSpecifiers!;
            }

            if (!specifier && !modulePath.isRedirect) {
                const local = getLocalModuleSpecifier(modulePath.path, info, compilerOptions, host, preferences);
                if (pathIsBareSpecifier(local)) {
                    pathsSpecifiers = append(pathsSpecifiers, local);
                }
                else if (!importedFileIsInNodeModules || modulePath.isInNodeModules) {
                    // Why this extra conditional, not just an `else`? If some path to the file contained
                    // 'node_modules', but we can't create a non-relative specifier (e.g. "@foo/bar/path/to/file"),
                    // that means we had to go through a *sibling's* node_modules, not one we can access directly.
                    // If some path to the file was in node_modules but another was not, this likely indicates that
                    // we have a monorepo structure with symlinks. In this case, the non-node_modules path is
                    // probably the realpath, e.g. "../bar/path/to/file", but a relative path to another package
                    // in a monorepo is probably not portable. So, the module specifier we actually go with will be
                    // the relative path through node_modules, so that the declaration emitter can produce a
                    // portability error. (See declarationEmitReexportedSymlinkReference3)
                    relativeSpecifiers = append(relativeSpecifiers, local);
                }
            }
        }

        return pathsSpecifiers?.length ? pathsSpecifiers :
            nodeModulesSpecifiers?.length ? nodeModulesSpecifiers :
            Debug.checkDefined(relativeSpecifiers);
    }

    interface Info {
        readonly getCanonicalFileName: GetCanonicalFileName;
        readonly importingSourceFileName: Path
        readonly sourceDirectory: Path;
    }
    // importingSourceFileName is separate because getEditsForFileRename may need to specify an updated path
    function getInfo(importingSourceFileName: Path, host: ModuleSpecifierResolutionHost): Info {
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : true);
        const sourceDirectory = getDirectoryPath(importingSourceFileName);
        return { getCanonicalFileName, importingSourceFileName, sourceDirectory };
    }

    function getLocalModuleSpecifier(moduleFileName: string, info: Info, compilerOptions: CompilerOptions, host: ModuleSpecifierResolutionHost, { ending, relativePreference }: Preferences): string {
        const { baseUrl, paths, rootDirs } = compilerOptions;
        const { sourceDirectory, getCanonicalFileName } = info;
        const relativePath = rootDirs && tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName, ending, compilerOptions) ||
            removeExtensionAndIndexPostFix(ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, moduleFileName, getCanonicalFileName)), ending, compilerOptions);
        if (!baseUrl && !paths || relativePreference === RelativePreference.Relative) {
            return relativePath;
        }

        const baseDirectory = getNormalizedAbsolutePath(getPathsBasePath(compilerOptions, host) || baseUrl!, host.getCurrentDirectory());
        const relativeToBaseUrl = getRelativePathIfInDirectory(moduleFileName, baseDirectory, getCanonicalFileName);
        if (!relativeToBaseUrl) {
            return relativePath;
        }

        const importRelativeToBaseUrl = removeExtensionAndIndexPostFix(relativeToBaseUrl, ending, compilerOptions);
        const fromPaths = paths && tryGetModuleNameFromPaths(removeFileExtension(relativeToBaseUrl), importRelativeToBaseUrl, paths);
        const nonRelative = fromPaths === undefined && baseUrl !== undefined ? importRelativeToBaseUrl : fromPaths;
        if (!nonRelative) {
            return relativePath;
        }

        if (relativePreference === RelativePreference.NonRelative) {
            return nonRelative;
        }

        if (relativePreference === RelativePreference.ExternalNonRelative) {
            const projectDirectory = compilerOptions.configFilePath ?
                toPath(getDirectoryPath(compilerOptions.configFilePath), host.getCurrentDirectory(), info.getCanonicalFileName) :
                info.getCanonicalFileName(host.getCurrentDirectory());
            const modulePath = toPath(moduleFileName, projectDirectory, getCanonicalFileName);
            const sourceIsInternal = startsWith(sourceDirectory, projectDirectory);
            const targetIsInternal = startsWith(modulePath, projectDirectory);
            if (sourceIsInternal && !targetIsInternal || !sourceIsInternal && targetIsInternal) {
                // 1. The import path crosses the boundary of the tsconfig.json-containing directory.
                //
                //      src/
                //        tsconfig.json
                //        index.ts -------
                //      lib/              | (path crosses tsconfig.json)
                //        imported.ts <---
                //
                return nonRelative;
            }

            const nearestTargetPackageJson = getNearestAncestorDirectoryWithPackageJson(host, getDirectoryPath(modulePath));
            const nearestSourcePackageJson = getNearestAncestorDirectoryWithPackageJson(host, sourceDirectory);
            if (nearestSourcePackageJson !== nearestTargetPackageJson) {
                // 2. The importing and imported files are part of different packages.
                //
                //      packages/a/
                //        package.json
                //        index.ts --------
                //      packages/b/        | (path crosses package.json)
                //        package.json     |
                //        component.ts <---
                //
                return nonRelative;
            }

            return relativePath;
        }

        if (relativePreference !== RelativePreference.Shortest) Debug.assertNever(relativePreference);

        // Prefer a relative import over a baseUrl import if it has fewer components.
        return isPathRelativeToParent(nonRelative) || countPathComponents(relativePath) < countPathComponents(nonRelative) ? relativePath : nonRelative;
    }

    export function countPathComponents(path: string): number {
        let count = 0;
        for (let i = startsWith(path, "./") ? 2 : 0; i < path.length; i++) {
            if (path.charCodeAt(i) === CharacterCodes.slash) count++;
        }
        return count;
    }

    function usesJsExtensionOnImports({ imports }: SourceFile): boolean {
        return firstDefined(imports, ({ text }) => pathIsRelative(text) ? hasJSFileExtension(text) : undefined) || false;
    }

    function comparePathsByRedirectAndNumberOfDirectorySeparators(a: ModulePath, b: ModulePath) {
        return compareBooleans(b.isRedirect, a.isRedirect) || compareNumberOfDirectorySeparators(a.path, b.path);
    }

    function getNearestAncestorDirectoryWithPackageJson(host: ModuleSpecifierResolutionHost, fileName: string) {
        if (host.getNearestAncestorDirectoryWithPackageJson) {
            return host.getNearestAncestorDirectoryWithPackageJson(fileName);
        }
        return !!forEachAncestorDirectory(fileName, directory => {
            return host.fileExists(combinePaths(directory, "package.json")) ? true : undefined;
        });
    }

    export function forEachFileNameOfModule<T>(
        importingFileName: string,
        importedFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferSymlinks: boolean,
        cb: (fileName: string, isRedirect: boolean) => T | undefined
    ): T | undefined {
        const getCanonicalFileName = hostGetCanonicalFileName(host);
        const cwd = host.getCurrentDirectory();
        const referenceRedirect = host.isSourceOfProjectReferenceRedirect(importedFileName) ? host.getProjectReferenceRedirect(importedFileName) : undefined;
        const importedPath = toPath(importedFileName, cwd, getCanonicalFileName);
        const redirects = host.redirectTargetsMap.get(importedPath) || emptyArray;
        const importedFileNames = [...(referenceRedirect ? [referenceRedirect] : emptyArray), importedFileName, ...redirects];
        const targets = importedFileNames.map(f => getNormalizedAbsolutePath(f, cwd));
        let shouldFilterIgnoredPaths = !every(targets, containsIgnoredPath);

        if (!preferSymlinks) {
            // Symlinks inside ignored paths are already filtered out of the symlink cache,
            // so we only need to remove them from the realpath filenames.
            const result = forEach(targets, p => !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) && cb(p, referenceRedirect === p));
            if (result) return result;
        }

        const symlinkedDirectories = host.getSymlinkCache?.().getSymlinkedDirectoriesByRealpath();
        const fullImportedFileName = getNormalizedAbsolutePath(importedFileName, cwd);
        const result = symlinkedDirectories && forEachAncestorDirectory(getDirectoryPath(fullImportedFileName), realPathDirectory => {
            const symlinkDirectories = symlinkedDirectories.get(ensureTrailingDirectorySeparator(toPath(realPathDirectory, cwd, getCanonicalFileName)));
            if (!symlinkDirectories) return undefined; // Continue to ancestor directory

            // Don't want to a package to globally import from itself (importNameCodeFix_symlink_own_package.ts)
            if (startsWithDirectory(importingFileName, realPathDirectory, getCanonicalFileName)) {
                return false; // Stop search, each ancestor directory will also hit this condition
            }

            return forEach(targets, target => {
                if (!startsWithDirectory(target, realPathDirectory, getCanonicalFileName)) {
                    return;
                }

                const relative = getRelativePathFromDirectory(realPathDirectory, target, getCanonicalFileName);
                for (const symlinkDirectory of symlinkDirectories) {
                    const option = resolvePath(symlinkDirectory, relative);
                    const result = cb(option, target === referenceRedirect);
                    shouldFilterIgnoredPaths = true; // We found a non-ignored path in symlinks, so we can reject ignored-path realpaths
                    if (result) return result;
                }
            });
        });
        return result || (preferSymlinks
            ? forEach(targets, p => shouldFilterIgnoredPaths && containsIgnoredPath(p) ? undefined : cb(p, p === referenceRedirect))
            : undefined);
    }

    /**
     * Looks for existing imports that use symlinks to this module.
     * Symlinks will be returned first so they are preferred over the real path.
     */
    function getAllModulePaths(
        importingFilePath: Path,
        importedFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: UserPreferences,
        options: ModuleSpecifierOptions = {},
    ) {
        const importedFilePath = toPath(importedFileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host));
        const cache = host.getModuleSpecifierCache?.();
        if (cache) {
            const cached = cache.get(importingFilePath, importedFilePath, preferences, options);
            if (cached?.modulePaths) return cached.modulePaths;
        }
        const modulePaths = getAllModulePathsWorker(importingFilePath, importedFileName, host);
        if (cache) {
            cache.setModulePaths(importingFilePath, importedFilePath, preferences, options, modulePaths);
        }
        return modulePaths;
    }

    function getAllModulePathsWorker(importingFileName: Path, importedFileName: string, host: ModuleSpecifierResolutionHost): readonly ModulePath[] {
        const getCanonicalFileName = hostGetCanonicalFileName(host);
        const allFileNames = new Map<string, { path: string, isRedirect: boolean, isInNodeModules: boolean }>();
        let importedFileFromNodeModules = false;
        forEachFileNameOfModule(
            importingFileName,
            importedFileName,
            host,
            /*preferSymlinks*/ true,
            (path, isRedirect) => {
                const isInNodeModules = pathContainsNodeModules(path);
                allFileNames.set(path, { path: getCanonicalFileName(path), isRedirect, isInNodeModules });
                importedFileFromNodeModules = importedFileFromNodeModules || isInNodeModules;
                // don't return value, so we collect everything
            }
        );

        // Sort by paths closest to importing file Name directory
        const sortedPaths: ModulePath[] = [];
        for (
            let directory = getDirectoryPath(importingFileName);
            allFileNames.size !== 0;
        ) {
            const directoryStart = ensureTrailingDirectorySeparator(directory);
            let pathsInDirectory: ModulePath[] | undefined;
            allFileNames.forEach(({ path, isRedirect, isInNodeModules }, fileName) => {
                if (startsWith(path, directoryStart)) {
                    (pathsInDirectory ||= []).push({ path: fileName, isRedirect, isInNodeModules });
                    allFileNames.delete(fileName);
                }
            });
            if (pathsInDirectory) {
                if (pathsInDirectory.length > 1) {
                    pathsInDirectory.sort(comparePathsByRedirectAndNumberOfDirectorySeparators);
                }
                sortedPaths.push(...pathsInDirectory);
            }
            const newDirectory = getDirectoryPath(directory);
            if (newDirectory === directory) break;
            directory = newDirectory;
        }
        if (allFileNames.size) {
            const remainingPaths = arrayFrom(allFileNames.values());
            if (remainingPaths.length > 1) remainingPaths.sort(comparePathsByRedirectAndNumberOfDirectorySeparators);
            sortedPaths.push(...remainingPaths);
        }

        return sortedPaths;
    }

    function tryGetModuleNameFromAmbientModule(moduleSymbol: Symbol, checker: TypeChecker): string | undefined {
        const decl = moduleSymbol.declarations?.find(
            d => isNonGlobalAmbientModule(d) && (!isExternalModuleAugmentation(d) || !isExternalModuleNameRelative(getTextOfIdentifierOrLiteral(d.name)))
        ) as (ModuleDeclaration & { name: StringLiteral }) | undefined;
        if (decl) {
            return decl.name.text;
        }

        // the module could be a namespace, which is export through "export=" from an ambient module.
        /**
         * declare module "m" {
         *     namespace ns {
         *         class c {}
         *     }
         *     export = ns;
         * }
         */
        // `import {c} from "m";` is valid, in which case, `moduleSymbol` is "ns", but the module name should be "m"
        const ambientModuleDeclareCandidates = mapDefined(moduleSymbol.declarations,
            d => {
                if (!isModuleDeclaration(d)) return;
                const topNamespace = getTopNamespace(d);
                if (!(topNamespace?.parent?.parent
                    && isModuleBlock(topNamespace.parent) && isAmbientModule(topNamespace.parent.parent) && isSourceFile(topNamespace.parent.parent.parent))) return;
                const exportAssignment = ((topNamespace.parent.parent.symbol.exports?.get("export=" as __String)?.valueDeclaration as ExportAssignment)?.expression as PropertyAccessExpression | Identifier);
                if (!exportAssignment) return;
                const exportSymbol = checker.getSymbolAtLocation(exportAssignment);
                if (!exportSymbol) return;
                const originalExportSymbol = exportSymbol?.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(exportSymbol) : exportSymbol;
                if (originalExportSymbol === d.symbol) return topNamespace.parent.parent;

                function getTopNamespace(namespaceDeclaration: ModuleDeclaration) {
                    while (namespaceDeclaration.flags & NodeFlags.NestedNamespace) {
                        namespaceDeclaration = namespaceDeclaration.parent as ModuleDeclaration;
                    }
                    return namespaceDeclaration;
                }
            }
        );
        const ambientModuleDeclare = ambientModuleDeclareCandidates[0] as (AmbientModuleDeclaration & { name: StringLiteral }) | undefined;
        if (ambientModuleDeclare) {
            return ambientModuleDeclare.name.text;
        }
    }

    function tryGetModuleNameFromPaths(relativeToBaseUrlWithIndex: string, relativeToBaseUrl: string, paths: MapLike<readonly string[]>): string | undefined {
        for (const key in paths) {
            for (const patternText of paths[key]) {
                const pattern = removeFileExtension(normalizePath(patternText));
                const indexOfStar = pattern.indexOf("*");
                if (indexOfStar !== -1) {
                    const prefix = pattern.substr(0, indexOfStar);
                    const suffix = pattern.substr(indexOfStar + 1);
                    if (relativeToBaseUrl.length >= prefix.length + suffix.length &&
                        startsWith(relativeToBaseUrl, prefix) &&
                        endsWith(relativeToBaseUrl, suffix) ||
                        !suffix && relativeToBaseUrl === removeTrailingDirectorySeparator(prefix)) {
                        const matchedStar = relativeToBaseUrl.substr(prefix.length, relativeToBaseUrl.length - suffix.length - prefix.length);
                        return key.replace("*", matchedStar);
                    }
                }
                else if (pattern === relativeToBaseUrl || pattern === relativeToBaseUrlWithIndex) {
                    return key;
                }
            }
        }
    }

    const enum MatchingMode {
        Exact,
        Directory,
        Pattern
    }

    function tryGetModuleNameFromExports(options: CompilerOptions, targetFilePath: string, packageDirectory: string, packageName: string, exports: unknown, conditions: string[], mode = MatchingMode.Exact): { moduleFileToTry: string } | undefined {
        if (typeof exports === "string") {
            const pathOrPattern = getNormalizedAbsolutePath(combinePaths(packageDirectory, exports), /*currentDirectory*/ undefined);
            const extensionSwappedTarget = hasTSFileExtension(targetFilePath) ? removeFileExtension(targetFilePath) + tryGetJSExtensionForFile(targetFilePath, options) : undefined;
            switch (mode) {
                case MatchingMode.Exact:
                    if (comparePaths(targetFilePath, pathOrPattern) === Comparison.EqualTo || (extensionSwappedTarget && comparePaths(extensionSwappedTarget, pathOrPattern) === Comparison.EqualTo)) {
                        return { moduleFileToTry: packageName };
                    }
                    break;
                case MatchingMode.Directory:
                    if (containsPath(pathOrPattern, targetFilePath)) {
                        const fragment = getRelativePathFromDirectory(pathOrPattern, targetFilePath, /*ignoreCase*/ false);
                        return { moduleFileToTry: getNormalizedAbsolutePath(combinePaths(combinePaths(packageName, exports), fragment), /*currentDirectory*/ undefined) };
                    }
                    break;
                case MatchingMode.Pattern:
                    const starPos = pathOrPattern.indexOf("*");
                    const leadingSlice = pathOrPattern.slice(0, starPos);
                    const trailingSlice = pathOrPattern.slice(starPos + 1);
                    if (startsWith(targetFilePath, leadingSlice) && endsWith(targetFilePath, trailingSlice)) {
                        const starReplacement = targetFilePath.slice(leadingSlice.length, targetFilePath.length - trailingSlice.length);
                        return { moduleFileToTry: packageName.replace("*", starReplacement) };
                    }
                    if (extensionSwappedTarget && startsWith(extensionSwappedTarget, leadingSlice) && endsWith(extensionSwappedTarget, trailingSlice)) {
                        const starReplacement = extensionSwappedTarget.slice(leadingSlice.length, extensionSwappedTarget.length - trailingSlice.length);
                        return { moduleFileToTry: packageName.replace("*", starReplacement) };
                    }
                    break;
            }
        }
        else if (Array.isArray(exports)) {
            return forEach(exports, e => tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, packageName, e, conditions));
        }
        else if (typeof exports === "object" && exports !== null) { // eslint-disable-line no-null/no-null
            if (allKeysStartWithDot(exports as MapLike<unknown>)) {
                // sub-mappings
                // 3 cases:
                // * directory mappings (legacyish, key ends with / (technically allows index/extension resolution under cjs mode))
                // * pattern mappings (contains a *)
                // * exact mappings (no *, does not end with /)
                return forEach(getOwnKeys(exports as MapLike<unknown>), k => {
                    const subPackageName = getNormalizedAbsolutePath(combinePaths(packageName, k), /*currentDirectory*/ undefined);
                    const mode = endsWith(k, "/") ? MatchingMode.Directory
                        : stringContains(k, "*") ? MatchingMode.Pattern
                        : MatchingMode.Exact;
                    return tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, subPackageName, (exports as MapLike<unknown>)[k], conditions, mode);
                });
            }
            else {
                // conditional mapping
                for (const key of getOwnKeys(exports as MapLike<unknown>)) {
                    if (key === "default" || conditions.indexOf(key) >= 0 || isApplicableVersionedTypesKey(conditions, key)) {
                        const subTarget = (exports as MapLike<unknown>)[key];
                        const result = tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, packageName, subTarget, conditions);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
        return undefined;
    }

    function tryGetModuleNameFromRootDirs(rootDirs: readonly string[], moduleFileName: string, sourceDirectory: string, getCanonicalFileName: (file: string) => string, ending: Ending, compilerOptions: CompilerOptions): string | undefined {
        const normalizedTargetPath = getPathRelativeToRootDirs(moduleFileName, rootDirs, getCanonicalFileName);
        if (normalizedTargetPath === undefined) {
            return undefined;
        }

        const normalizedSourcePath = getPathRelativeToRootDirs(sourceDirectory, rootDirs, getCanonicalFileName);
        const relativePath = normalizedSourcePath !== undefined ? ensurePathIsNonModuleName(getRelativePathFromDirectory(normalizedSourcePath, normalizedTargetPath, getCanonicalFileName)) : normalizedTargetPath;
        return getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs
            ? removeExtensionAndIndexPostFix(relativePath, ending, compilerOptions)
            : removeFileExtension(relativePath);
    }

    function tryGetModuleNameAsNodeModule({ path, isRedirect }: ModulePath, { getCanonicalFileName, sourceDirectory }: Info, importingSourceFile: SourceFile , host: ModuleSpecifierResolutionHost, options: CompilerOptions, packageNameOnly?: boolean, overrideMode?: ModuleKind.ESNext | ModuleKind.CommonJS): string | undefined {
        if (!host.fileExists || !host.readFile) {
            return undefined;
        }
        const parts: NodeModulePathParts = getNodeModulePathParts(path)!;
        if (!parts) {
            return undefined;
        }

        // Simplify the full file path to something that can be resolved by Node.

        let moduleSpecifier = path;
        let isPackageRootPath = false;
        if (!packageNameOnly) {
            let packageRootIndex = parts.packageRootIndex;
            let moduleFileNameForExtensionless: string | undefined;
            while (true) {
                // If the module could be imported by a directory name, use that directory's name
                const { moduleFileToTry, packageRootPath, blockedByExports, verbatimFromExports } = tryDirectoryWithPackageJson(packageRootIndex);
                if (getEmitModuleResolutionKind(options) !== ModuleResolutionKind.Classic) {
                    if (blockedByExports) {
                        return undefined; // File is under this package.json, but is not publicly exported - there's no way to name it via `node_modules` resolution
                    }
                    if (verbatimFromExports) {
                        return moduleFileToTry;
                    }
                }
                if (packageRootPath) {
                    moduleSpecifier = packageRootPath;
                    isPackageRootPath = true;
                    break;
                }
                if (!moduleFileNameForExtensionless) moduleFileNameForExtensionless = moduleFileToTry;

                // try with next level of directory
                packageRootIndex = path.indexOf(directorySeparator, packageRootIndex + 1);
                if (packageRootIndex === -1) {
                    moduleSpecifier = getExtensionlessFileName(moduleFileNameForExtensionless);
                    break;
                }
            }
        }

        if (isRedirect && !isPackageRootPath) {
            return undefined;
        }

        const globalTypingsCacheLocation = host.getGlobalTypingsCacheLocation && host.getGlobalTypingsCacheLocation();
        // Get a path that's relative to node_modules or the importing file's path
        // if node_modules folder is in this folder or any of its parent folders, no need to keep it.
        const pathToTopLevelNodeModules = getCanonicalFileName(moduleSpecifier.substring(0, parts.topLevelNodeModulesIndex));
        if (!(startsWith(sourceDirectory, pathToTopLevelNodeModules) || globalTypingsCacheLocation && startsWith(getCanonicalFileName(globalTypingsCacheLocation), pathToTopLevelNodeModules))) {
            return undefined;
        }

        // If the module was found in @types, get the actual Node package name
        const nodeModulesDirectoryName = moduleSpecifier.substring(parts.topLevelPackageNameIndex + 1);
        const packageName = getPackageNameFromTypesPackageName(nodeModulesDirectoryName);
        // For classic resolution, only allow importing from node_modules/@types, not other node_modules
        return getEmitModuleResolutionKind(options) === ModuleResolutionKind.Classic && packageName === nodeModulesDirectoryName ? undefined : packageName;

        function tryDirectoryWithPackageJson(packageRootIndex: number): { moduleFileToTry: string, packageRootPath?: string, blockedByExports?: true, verbatimFromExports?: true } {
            const packageRootPath = path.substring(0, packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            let moduleFileToTry = path;
            const cachedPackageJson = host.getPackageJsonInfoCache?.()?.getPackageJsonInfo(packageJsonPath);
            if (typeof cachedPackageJson === "object" || cachedPackageJson === undefined && host.fileExists(packageJsonPath)) {
                const packageJsonContent = cachedPackageJson?.packageJsonContent || JSON.parse(host.readFile!(packageJsonPath)!);
                if (getEmitModuleResolutionKind(options) === ModuleResolutionKind.Node12 || getEmitModuleResolutionKind(options) === ModuleResolutionKind.NodeNext) {
                    // `conditions` *could* be made to go against `importingSourceFile.impliedNodeFormat` if something wanted to generate
                    // an ImportEqualsDeclaration in an ESM-implied file or an ImportCall in a CJS-implied file. But since this function is
                    // usually called to conjure an import out of thin air, we don't have an existing usage to call `getModeForUsageAtIndex`
                    // with, so for now we just stick with the mode of the file.
                    const conditions = ["node", overrideMode || importingSourceFile.impliedNodeFormat === ModuleKind.ESNext ? "import" : "require", "types"];
                    const fromExports = packageJsonContent.exports && typeof packageJsonContent.name === "string"
                        ? tryGetModuleNameFromExports(options, path, packageRootPath, getPackageNameFromTypesPackageName(packageJsonContent.name), packageJsonContent.exports, conditions)
                        : undefined;
                    if (fromExports) {
                        const withJsExtension = !hasTSFileExtension(fromExports.moduleFileToTry)
                            ? fromExports
                            : { moduleFileToTry: removeFileExtension(fromExports.moduleFileToTry) + tryGetJSExtensionForFile(fromExports.moduleFileToTry, options) };
                        return { ...withJsExtension, verbatimFromExports: true };
                    }
                    if (packageJsonContent.exports) {
                        return { moduleFileToTry: path, blockedByExports: true };
                    }
                }
                const versionPaths = packageJsonContent.typesVersions
                    ? getPackageJsonTypesVersionsPaths(packageJsonContent.typesVersions)
                    : undefined;
                if (versionPaths) {
                    const subModuleName = path.slice(packageRootPath.length + 1);
                    const fromPaths = tryGetModuleNameFromPaths(
                        removeFileExtension(subModuleName),
                        removeExtensionAndIndexPostFix(subModuleName, Ending.Minimal, options),
                        versionPaths.paths
                    );
                    if (fromPaths !== undefined) {
                        moduleFileToTry = combinePaths(packageRootPath, fromPaths);
                    }
                }
                // If the file is the main module, it can be imported by the package name
                const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main;
                if (isString(mainFileRelative)) {
                    const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                    if (removeFileExtension(mainExportFile) === removeFileExtension(getCanonicalFileName(moduleFileToTry))) {
                        return { packageRootPath, moduleFileToTry };
                    }
                }
            }
            return { moduleFileToTry };
        }

        function getExtensionlessFileName(path: string): string {
            // We still have a file name - remove the extension
            const fullModulePathWithoutExtension = removeFileExtension(path);

            // If the file is /index, it can be imported by its directory name
            // IFF there is not _also_ a file by the same name
            if (getCanonicalFileName(fullModulePathWithoutExtension.substring(parts.fileNameIndex)) === "/index" && !tryGetAnyFileFromPath(host, fullModulePathWithoutExtension.substring(0, parts.fileNameIndex))) {
                return fullModulePathWithoutExtension.substring(0, parts.fileNameIndex);
            }

            return fullModulePathWithoutExtension;
        }
    }

    function tryGetAnyFileFromPath(host: ModuleSpecifierResolutionHost, path: string) {
        if (!host.fileExists) return;
        // We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
        const extensions = flatten(getSupportedExtensions({ allowJs: true }, [{ extension: "node", isMixedContent: false }, { extension: "json", isMixedContent: false, scriptKind: ScriptKind.JSON }]));
        for (const e of extensions) {
            const fullPath = path + e;
            if (host.fileExists(fullPath)) {
                return fullPath;
            }
        }
    }

    function getPathRelativeToRootDirs(path: string, rootDirs: readonly string[], getCanonicalFileName: GetCanonicalFileName): string | undefined {
        return firstDefined(rootDirs, rootDir => {
            const relativePath = getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName);
            return relativePath !== undefined && isPathRelativeToParent(relativePath) ? undefined : relativePath;
        });
    }

    function removeExtensionAndIndexPostFix(fileName: string, ending: Ending, options: CompilerOptions): string {
        if (fileExtensionIsOneOf(fileName, [Extension.Json, Extension.Mjs, Extension.Cjs])) return fileName;
        const noExtension = removeFileExtension(fileName);
        if (fileExtensionIsOneOf(fileName, [Extension.Dmts, Extension.Mts, Extension.Dcts, Extension.Cts])) return noExtension + getJSExtensionForFile(fileName, options);
        switch (ending) {
            case Ending.Minimal:
                return removeSuffix(noExtension, "/index");
            case Ending.Index:
                return noExtension;
            case Ending.JsExtension:
                return noExtension + getJSExtensionForFile(fileName, options);
            default:
                return Debug.assertNever(ending);
        }
    }

    function getJSExtensionForFile(fileName: string, options: CompilerOptions): Extension {
        return tryGetJSExtensionForFile(fileName, options) ?? Debug.fail(`Extension ${extensionFromPath(fileName)} is unsupported:: FileName:: ${fileName}`);
    }

    export function tryGetJSExtensionForFile(fileName: string, options: CompilerOptions): Extension | undefined {
        const ext = tryGetExtensionFromPath(fileName);
        switch (ext) {
            case Extension.Ts:
            case Extension.Dts:
                return Extension.Js;
            case Extension.Tsx:
                return options.jsx === JsxEmit.Preserve ? Extension.Jsx : Extension.Js;
            case Extension.Js:
            case Extension.Jsx:
            case Extension.Json:
                return ext;
            case Extension.Dmts:
            case Extension.Mts:
            case Extension.Mjs:
                return Extension.Mjs;
            case Extension.Dcts:
            case Extension.Cts:
            case Extension.Cjs:
                return Extension.Cjs;
            default:
                return undefined;
        }
    }

    function getRelativePathIfInDirectory(path: string, directoryPath: string, getCanonicalFileName: GetCanonicalFileName): string | undefined {
        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        return isRootedDiskPath(relativePath) ? undefined : relativePath;
    }

    function isPathRelativeToParent(path: string): boolean {
        return startsWith(path, "..");
    }
}

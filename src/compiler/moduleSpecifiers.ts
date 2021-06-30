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

    function getPreferences({ importModuleSpecifierPreference, importModuleSpecifierEnding }: UserPreferences, compilerOptions: CompilerOptions, importingSourceFile: SourceFile): Preferences {
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
                default: return usesJsExtensionOnImports(importingSourceFile) ? Ending.JsExtension
                    : getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.NodeJs ? Ending.Index : Ending.Minimal;
            }
        }
    }

    function getPreferencesForUpdate(compilerOptions: CompilerOptions, oldImportSpecifier: string): Preferences {
        return {
            relativePreference: isExternalModuleNameRelative(oldImportSpecifier) ? RelativePreference.Relative : RelativePreference.NonRelative,
            ending: hasJSFileExtension(oldImportSpecifier) ?
                Ending.JsExtension :
                getEmitModuleResolutionKind(compilerOptions) !== ModuleResolutionKind.NodeJs || endsWith(oldImportSpecifier, "index") ? Ending.Index : Ending.Minimal,
        };
    }

    export function updateModuleSpecifier(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        oldImportSpecifier: string,
    ): string | undefined {
        const res = getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, getPreferencesForUpdate(compilerOptions, oldImportSpecifier), {});
        if (res === oldImportSpecifier) return undefined;
        return res;
    }

    // Note: importingSourceFile is just for usesJsExtensionOnImports
    export function getModuleSpecifier(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
    ): string {
        return getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, getPreferences({}, compilerOptions, importingSourceFile), {});
    }

    export function getNodeModulesPackageName(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        nodeModulesFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: UserPreferences,
    ): string | undefined {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(importingSourceFileName, nodeModulesFileName, host, preferences);
        return firstDefined(modulePaths,
            modulePath => tryGetModuleNameAsNodeModule(modulePath, info, host, compilerOptions, /*packageNameOnly*/ true));
    }

    function getModuleSpecifierWorker(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: Preferences,
        userPreferences: UserPreferences,
    ): string {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(importingSourceFileName, toFileName, host, userPreferences);
        return firstDefined(modulePaths, modulePath => tryGetModuleNameAsNodeModule(modulePath, info, host, compilerOptions)) ||
            getLocalModuleSpecifier(toFileName, info, compilerOptions, host, preferences);
    }

    export function tryGetModuleSpecifiersFromCache(
        moduleSymbol: Symbol,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
    ): readonly string[] | undefined {
        return tryGetModuleSpecifiersFromCacheWorker(
            moduleSymbol,
            importingSourceFile,
            host,
            userPreferences)[0];
    }

    function tryGetModuleSpecifiersFromCacheWorker(
        moduleSymbol: Symbol,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
    ): readonly [specifiers?: readonly string[], moduleFile?: SourceFile, modulePaths?: readonly ModulePath[], cache?: ModuleSpecifierCache] {
        const moduleSourceFile = getSourceFileOfModule(moduleSymbol);
        if (!moduleSourceFile) {
            return emptyArray as [];
        }

        const cache = host.getModuleSpecifierCache?.();
        const cached = cache?.get(importingSourceFile.path, moduleSourceFile.path, userPreferences);
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
    ): readonly string[] {
        return getModuleSpecifiersWithCacheInfo(
            moduleSymbol,
            checker,
            compilerOptions,
            importingSourceFile,
            host,
            userPreferences,
        ).moduleSpecifiers;
    }

    export function getModuleSpecifiersWithCacheInfo(
        moduleSymbol: Symbol,
        checker: TypeChecker,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
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
        );
        if (specifiers) return { moduleSpecifiers: specifiers, computedWithoutCache };
        if (!moduleSourceFile) return { moduleSpecifiers: emptyArray, computedWithoutCache };

        computedWithoutCache = true;
        modulePaths ||= getAllModulePathsWorker(importingSourceFile.path, moduleSourceFile.originalFileName, host);
        const result = computeModuleSpecifiers(modulePaths, compilerOptions, importingSourceFile, host, userPreferences);
        cache?.set(importingSourceFile.path, moduleSourceFile.path, userPreferences, modulePaths, result);
        return { moduleSpecifiers: result, computedWithoutCache };
    }

    function computeModuleSpecifiers(
        modulePaths: readonly ModulePath[],
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
    ): readonly string[] {
        const info = getInfo(importingSourceFile.path, host);
        const preferences = getPreferences(userPreferences, compilerOptions, importingSourceFile);
        const existingSpecifier = forEach(modulePaths, modulePath => forEach(
            host.getFileIncludeReasons().get(toPath(modulePath.path, host.getCurrentDirectory(), info.getCanonicalFileName)),
            reason => {
                if (reason.kind !== FileIncludeKind.Import || reason.file !== importingSourceFile.path) return undefined;
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
            const specifier = tryGetModuleNameAsNodeModule(modulePath, info, host, compilerOptions);
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
        importedFilePath = toPath(importedFileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host))
    ) {
        const cache = host.getModuleSpecifierCache?.();
        if (cache) {
            const cached = cache.get(importingFilePath, importedFilePath, preferences);
            if (cached?.modulePaths) return cached.modulePaths;
        }
        const modulePaths = getAllModulePathsWorker(importingFilePath, importedFileName, host);
        if (cache) {
            cache.setModulePaths(importingFilePath, importedFilePath, preferences, modulePaths);
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

    function tryGetModuleNameAsNodeModule({ path, isRedirect }: ModulePath, { getCanonicalFileName, sourceDirectory }: Info, host: ModuleSpecifierResolutionHost, options: CompilerOptions, packageNameOnly?: boolean): string | undefined {
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
                const { moduleFileToTry, packageRootPath } = tryDirectoryWithPackageJson(packageRootIndex);
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
        return getEmitModuleResolutionKind(options) !== ModuleResolutionKind.NodeJs && packageName === nodeModulesDirectoryName ? undefined : packageName;

        function tryDirectoryWithPackageJson(packageRootIndex: number) {
            const packageRootPath = path.substring(0, packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            let moduleFileToTry = path;
            if (host.fileExists(packageJsonPath)) {
                const packageJsonContent = JSON.parse(host.readFile!(packageJsonPath)!);
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
        const extensions = getSupportedExtensions({ allowJs: true }, [{ extension: "node", isMixedContent: false }, { extension: "json", isMixedContent: false, scriptKind: ScriptKind.JSON }]);
        for (const e of extensions) {
            const fullPath = path + e;
            if (host.fileExists(fullPath)) {
                return fullPath;
            }
        }
    }

    interface NodeModulePathParts {
        readonly topLevelNodeModulesIndex: number;
        readonly topLevelPackageNameIndex: number;
        readonly packageRootIndex: number;
        readonly fileNameIndex: number;
    }
    function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
        // If fullPath can't be valid module file within node_modules, returns undefined.
        // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
        // Returns indices:                       ^            ^                                                      ^             ^

        let topLevelNodeModulesIndex = 0;
        let topLevelPackageNameIndex = 0;
        let packageRootIndex = 0;
        let fileNameIndex = 0;

        const enum States {
            BeforeNodeModules,
            NodeModules,
            Scope,
            PackageContent
        }

        let partStart = 0;
        let partEnd = 0;
        let state = States.BeforeNodeModules;

        while (partEnd >= 0) {
            partStart = partEnd;
            partEnd = fullPath.indexOf("/", partStart + 1);
            switch (state) {
                case States.BeforeNodeModules:
                    if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                        topLevelNodeModulesIndex = partStart;
                        topLevelPackageNameIndex = partEnd;
                        state = States.NodeModules;
                    }
                    break;
                case States.NodeModules:
                case States.Scope:
                    if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                        state = States.Scope;
                    }
                    else {
                        packageRootIndex = partEnd;
                        state = States.PackageContent;
                    }
                    break;
                case States.PackageContent:
                    if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                        state = States.NodeModules;
                    }
                    else {
                        state = States.PackageContent;
                    }
                    break;
            }
        }

        fileNameIndex = partStart;

        return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
    }

    function getPathRelativeToRootDirs(path: string, rootDirs: readonly string[], getCanonicalFileName: GetCanonicalFileName): string | undefined {
        return firstDefined(rootDirs, rootDir => {
            const relativePath = getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName)!; // TODO: GH#18217
            return isPathRelativeToParent(relativePath) ? undefined : relativePath;
        });
    }

    function removeExtensionAndIndexPostFix(fileName: string, ending: Ending, options: CompilerOptions): string {
        if (fileExtensionIs(fileName, Extension.Json)) return fileName;
        const noExtension = removeFileExtension(fileName);
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

// Used by importFixes to synthesize import module specifiers.
/* @internal */
namespace ts.moduleSpecifiers {
    export interface ModuleSpecifierPreferences {
        readonly importModuleSpecifierPreference?: "relative" | "non-relative";
    }

    // Note: importingSourceFile is just for usesJsExtensionOnImports
    export function getModuleSpecifier(
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        files: ReadonlyArray<SourceFile>,
        preferences: ModuleSpecifierPreferences = {},
    ): string {
        const info = getInfo(compilerOptions, importingSourceFile, importingSourceFileName, host);
        const modulePaths = getAllModulePaths(files, toFileName, info.getCanonicalFileName, host);
        return firstDefined(modulePaths, moduleFileName => getGlobalModuleSpecifier(moduleFileName, info, host, compilerOptions)) ||
            first(getLocalModuleSpecifiers(toFileName, info, compilerOptions, preferences));
    }

    // For each symlink/original for a module, returns a list of ways to import that file.
    export function getModuleSpecifiers(
        moduleSymbol: Symbol,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        files: ReadonlyArray<SourceFile>,
        preferences: ModuleSpecifierPreferences,
    ): ReadonlyArray<ReadonlyArray<string>> {
        const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol);
        if (ambient) return [[ambient]];

        const info = getInfo(compilerOptions, importingSourceFile, importingSourceFile.path, host);
        if (!files) {
            return Debug.fail("Files list must be present to resolve symlinks in specifier resolution");
        }
        const modulePaths = getAllModulePaths(files, getSourceFileOfNode(moduleSymbol.valueDeclaration).fileName, info.getCanonicalFileName, host);

        const global = mapDefined(modulePaths, moduleFileName => getGlobalModuleSpecifier(moduleFileName, info, host, compilerOptions));
        return global.length ? global.map(g => [g]) : modulePaths.map(moduleFileName =>
            getLocalModuleSpecifiers(moduleFileName, info, compilerOptions, preferences));
    }

    interface Info {
        readonly moduleResolutionKind: ModuleResolutionKind;
        readonly addJsExtension: boolean;
        readonly getCanonicalFileName: GetCanonicalFileName;
        readonly sourceDirectory: Path;
    }
    // importingSourceFileName is separate because getEditsForFileRename may need to specify an updated path
    function getInfo(compilerOptions: CompilerOptions, importingSourceFile: SourceFile, importingSourceFileName: Path, host: ModuleSpecifierResolutionHost): Info {
        const moduleResolutionKind = getEmitModuleResolutionKind(compilerOptions);
        const addJsExtension = usesJsExtensionOnImports(importingSourceFile);
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : true);
        const sourceDirectory = getDirectoryPath(importingSourceFileName);
        return { moduleResolutionKind, addJsExtension, getCanonicalFileName, sourceDirectory };
    }

    function getGlobalModuleSpecifier(
        moduleFileName: string,
        { addJsExtension, getCanonicalFileName, sourceDirectory }: Info,
        host: ModuleSpecifierResolutionHost,
        compilerOptions: CompilerOptions,
    ) {
        return tryGetModuleNameFromTypeRoots(compilerOptions, host, getCanonicalFileName, moduleFileName, addJsExtension)
            || tryGetModuleNameAsNodeModule(compilerOptions, moduleFileName, host, getCanonicalFileName, sourceDirectory);
    }

    function getLocalModuleSpecifiers(
        moduleFileName: string,
        { moduleResolutionKind, addJsExtension, getCanonicalFileName, sourceDirectory }: Info,
        compilerOptions: CompilerOptions,
        preferences: ModuleSpecifierPreferences,
    ): ReadonlyArray<string> {
        const { baseUrl, paths, rootDirs } = compilerOptions;

        const relativePath = rootDirs && tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName) ||
            removeExtensionAndIndexPostFix(ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, moduleFileName, getCanonicalFileName)), moduleResolutionKind, addJsExtension);
        if (!baseUrl || preferences.importModuleSpecifierPreference === "relative") {
            return [relativePath];
        }

        const relativeToBaseUrl = getRelativePathIfInDirectory(moduleFileName, baseUrl, getCanonicalFileName);
        if (!relativeToBaseUrl) {
            return [relativePath];
        }

        const importRelativeToBaseUrl = removeExtensionAndIndexPostFix(relativeToBaseUrl, moduleResolutionKind, addJsExtension);
        const fromPaths = paths && tryGetModuleNameFromPaths(removeFileExtension(relativeToBaseUrl), importRelativeToBaseUrl, paths);
        if (fromPaths) {
            return [fromPaths];
        }

        if (preferences.importModuleSpecifierPreference === "non-relative") {
            return [importRelativeToBaseUrl];
        }

        if (preferences.importModuleSpecifierPreference !== undefined) Debug.assertNever(preferences.importModuleSpecifierPreference);

        if (isPathRelativeToParent(relativeToBaseUrl)) {
            return [relativePath];
        }

        // Prefer a relative import over a baseUrl import if it has fewer components.
        const relativeFirst = countPathComponents(relativePath) < countPathComponents(importRelativeToBaseUrl);
        return relativeFirst ? [relativePath, importRelativeToBaseUrl] : [importRelativeToBaseUrl, relativePath];
    }

    function countPathComponents(path: string): number {
        let count = 0;
        for (let i = startsWith(path, "./") ? 2 : 0; i < path.length; i++) {
            if (path.charCodeAt(i) === CharacterCodes.slash) count++;
        }
        return count;
    }

    function usesJsExtensionOnImports({ imports }: SourceFile): boolean {
        return firstDefined(imports, ({ text }) => pathIsRelative(text) ? fileExtensionIs(text, Extension.Js) : undefined) || false;
    }

    function discoverProbableSymlinks(files: ReadonlyArray<SourceFile>, getCanonicalFileName: (file: string) => string, host: ModuleSpecifierResolutionHost) {
        const symlinks = mapDefined(files, sf =>
            sf.resolvedModules && firstDefinedIterator(sf.resolvedModules.values(), res =>
                res && res.originalPath && res.resolvedFileName !== res.originalPath ? [res.resolvedFileName, res.originalPath] : undefined));
        const result = createMap<string>();
        if (symlinks) {
            const currentDirectory = host.getCurrentDirectory ? host.getCurrentDirectory() : "";
            const compareStrings = (!host.useCaseSensitiveFileNames || host.useCaseSensitiveFileNames()) ? compareStringsCaseSensitive : compareStringsCaseInsensitive;
            for (const [resolvedPath, originalPath] of symlinks) {
                const resolvedParts = getPathComponents(toPath(resolvedPath, currentDirectory, getCanonicalFileName));
                const originalParts = getPathComponents(toPath(originalPath, currentDirectory, getCanonicalFileName));
                while (compareStrings(resolvedParts[resolvedParts.length - 1], originalParts[originalParts.length - 1]) === Comparison.EqualTo) {
                    resolvedParts.pop();
                    originalParts.pop();
                }
                result.set(getPathFromPathComponents(originalParts), getPathFromPathComponents(resolvedParts));
            }
        }
        return result;
    }

    function getAllModulePathsUsingIndirectSymlinks(files: ReadonlyArray<SourceFile>, target: string, getCanonicalFileName: (file: string) => string, host: ModuleSpecifierResolutionHost) {
        const links = discoverProbableSymlinks(files, getCanonicalFileName, host);
        const paths = arrayFrom(links.keys());
        let options: string[] | undefined;
        const compareStrings = (!host.useCaseSensitiveFileNames || host.useCaseSensitiveFileNames()) ? compareStringsCaseSensitive : compareStringsCaseInsensitive;
        for (const path of paths) {
            const resolved = links.get(path)!;
            if (compareStrings(target.slice(0, resolved.length + 1), resolved + "/") === Comparison.EqualTo) {
                const relative = getRelativePathFromDirectory(resolved, target, getCanonicalFileName);
                const option = resolvePath(path, relative);
                if (!host.fileExists || host.fileExists(option)) {
                    if (!options) options = [];
                    options.push(option);
                }
            }
        }
        if (options) {
            options.push(target); // Since these are speculative, we also include the original resolved name as a possibility
            return options;
        }
        return [target];
    }

    /**
     * Looks for existing imports that use symlinks to this module.
     * Only if no symlink is available, the real path will be used.
     */
    function getAllModulePaths(files: ReadonlyArray<SourceFile>, importedFileName: string, getCanonicalFileName: (file: string) => string, host: ModuleSpecifierResolutionHost): ReadonlyArray<string> {
        const symlinks = mapDefined(files, sf =>
            sf.resolvedModules && firstDefinedIterator(sf.resolvedModules.values(), res =>
                res && res.resolvedFileName === importedFileName ? res.originalPath : undefined));
        return symlinks.length === 0 ? getAllModulePathsUsingIndirectSymlinks(files, getNormalizedAbsolutePath(importedFileName, host.getCurrentDirectory ? host.getCurrentDirectory() : ""), getCanonicalFileName, host) : symlinks;
    }

    function tryGetModuleNameFromAmbientModule(moduleSymbol: Symbol): string | undefined {
        const decl = moduleSymbol.valueDeclaration;
        if (isModuleDeclaration(decl) && isStringLiteral(decl.name)) {
            return decl.name.text;
        }
    }

    function tryGetModuleNameFromPaths(relativeToBaseUrlWithIndex: string, relativeToBaseUrl: string, paths: MapLike<ReadonlyArray<string>>): string | undefined {
        for (const key in paths) {
            for (const patternText of paths[key]) {
                const pattern = removeFileExtension(normalizePath(patternText));
                const indexOfStar = pattern.indexOf("*");
                if (indexOfStar === 0 && pattern.length === 1) {
                    continue;
                }
                else if (indexOfStar !== -1) {
                    const prefix = pattern.substr(0, indexOfStar);
                    const suffix = pattern.substr(indexOfStar + 1);
                    if (relativeToBaseUrl.length >= prefix.length + suffix.length &&
                        startsWith(relativeToBaseUrl, prefix) &&
                        endsWith(relativeToBaseUrl, suffix)) {
                        const matchedStar = relativeToBaseUrl.substr(prefix.length, relativeToBaseUrl.length - suffix.length);
                        return key.replace("*", matchedStar);
                    }
                }
                else if (pattern === relativeToBaseUrl || pattern === relativeToBaseUrlWithIndex) {
                    return key;
                }
            }
        }
    }

    function tryGetModuleNameFromRootDirs(rootDirs: ReadonlyArray<string>, moduleFileName: string, sourceDirectory: string, getCanonicalFileName: (file: string) => string): string | undefined {
        const normalizedTargetPath = getPathRelativeToRootDirs(moduleFileName, rootDirs, getCanonicalFileName);
        if (normalizedTargetPath === undefined) {
            return undefined;
        }

        const normalizedSourcePath = getPathRelativeToRootDirs(sourceDirectory, rootDirs, getCanonicalFileName);
        const relativePath = normalizedSourcePath !== undefined ? ensurePathIsNonModuleName(getRelativePathFromDirectory(normalizedSourcePath, normalizedTargetPath, getCanonicalFileName)) : normalizedTargetPath;
        return removeFileExtension(relativePath);
    }

    function tryGetModuleNameFromTypeRoots(
        options: CompilerOptions,
        host: GetEffectiveTypeRootsHost,
        getCanonicalFileName: (file: string) => string,
        moduleFileName: string,
        addJsExtension: boolean,
    ): string | undefined {
        const roots = getEffectiveTypeRoots(options, host);
        return firstDefined(roots, unNormalizedTypeRoot => {
            const typeRoot = toPath(unNormalizedTypeRoot, /*basePath*/ undefined, getCanonicalFileName);
            if (startsWith(moduleFileName, typeRoot)) {
                // For a type definition, we can strip `/index` even with classic resolution.
                return removeExtensionAndIndexPostFix(moduleFileName.substring(typeRoot.length + 1), ModuleResolutionKind.NodeJs, addJsExtension);
            }
        });
    }

    function tryGetModuleNameAsNodeModule(
        options: CompilerOptions,
        moduleFileName: string,
        host: ModuleSpecifierResolutionHost,
        getCanonicalFileName: (file: string) => string,
        sourceDirectory: Path,
    ): string | undefined {
        if (getEmitModuleResolutionKind(options) !== ModuleResolutionKind.NodeJs) {
            // nothing to do here
            return undefined;
        }

        const parts: NodeModulePathParts = getNodeModulePathParts(moduleFileName)!;

        if (!parts) {
            return undefined;
        }

        // Simplify the full file path to something that can be resolved by Node.

        // If the module could be imported by a directory name, use that directory's name
        const moduleSpecifier = getDirectoryOrExtensionlessFileName(moduleFileName);
        // Get a path that's relative to node_modules or the importing file's path
        // if node_modules folder is in this folder or any of its parent folders, no need to keep it.
        if (!startsWith(sourceDirectory, getCanonicalFileName(moduleSpecifier.substring(0, parts.topLevelNodeModulesIndex)))) return undefined;
        // If the module was found in @types, get the actual Node package name
        return getPackageNameFromAtTypesDirectory(moduleSpecifier.substring(parts.topLevelPackageNameIndex + 1));

        function getDirectoryOrExtensionlessFileName(path: string): string {
            // If the file is the main module, it can be imported by the package name
            const packageRootPath = path.substring(0, parts.packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            if (host.fileExists!(packageJsonPath)) { // TODO: GH#18217
                const packageJsonContent = JSON.parse(host.readFile!(packageJsonPath)!);
                if (packageJsonContent) {
                    const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main;
                    if (mainFileRelative) {
                        const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                        if (removeFileExtension(mainExportFile) === removeFileExtension(getCanonicalFileName(path))) {
                            return packageRootPath;
                        }
                    }
                }
            }

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
        // We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
        const extensions = getSupportedExtensions({ allowJs: true }, [{ extension: "node", isMixedContent: false }, { extension: "json", isMixedContent: false, scriptKind: ScriptKind.JSON }]);
        for (const e of extensions) {
            const fullPath = path + e;
            if (host.fileExists!(fullPath)) { // TODO: GH#18217
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
                    if (fullPath.indexOf("/node_modules/", partStart) === partStart) {
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
                    if (fullPath.indexOf("/node_modules/", partStart) === partStart) {
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

    function getPathRelativeToRootDirs(path: string, rootDirs: ReadonlyArray<string>, getCanonicalFileName: GetCanonicalFileName): string | undefined {
        return firstDefined(rootDirs, rootDir => {
            const relativePath = getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName)!; // TODO: GH#18217
            return isPathRelativeToParent(relativePath) ? undefined : relativePath;
        });
    }

    function removeExtensionAndIndexPostFix(fileName: string, moduleResolutionKind: ModuleResolutionKind, addJsExtension: boolean): string {
        const noExtension = removeFileExtension(fileName);
        return addJsExtension
            ? noExtension + ".js"
            : moduleResolutionKind === ModuleResolutionKind.NodeJs
                ? removeSuffix(noExtension, "/index")
                : noExtension;
    }

    function getRelativePathIfInDirectory(path: string, directoryPath: string, getCanonicalFileName: GetCanonicalFileName): string | undefined {
        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        return isRootedDiskPath(relativePath) ? undefined : relativePath;
    }

    function isPathRelativeToParent(path: string): boolean {
        return startsWith(path, "..");
    }
}

// Used by importFixes, getEditsForFileRename, and declaration emit to synthesize import module specifiers.
/* @internal */
namespace ts.moduleSpecifiers {
    const enum RelativePreference { Relative, NonRelative, Auto }
    // See UserPreferences#importPathEnding
    const enum Ending { Minimal, Index, JsExtension }

    // Processed preferences
    interface Preferences {
        readonly relativePreference: RelativePreference;
        readonly ending: Ending;
    }

    function getPreferences({ importModuleSpecifierPreference, importModuleSpecifierEnding }: UserPreferences, compilerOptions: CompilerOptions, importingSourceFile: SourceFile): Preferences {
        return {
            relativePreference: importModuleSpecifierPreference === "relative" ? RelativePreference.Relative : importModuleSpecifierPreference === "non-relative" ? RelativePreference.NonRelative : RelativePreference.Auto,
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
        files: readonly SourceFile[],
        redirectTargetsMap: RedirectTargetsMap,
        oldImportSpecifier: string,
    ): string | undefined {
        const res = getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, files, redirectTargetsMap, getPreferencesForUpdate(compilerOptions, oldImportSpecifier));
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
        files: readonly SourceFile[],
        preferences: UserPreferences = {},
        redirectTargetsMap: RedirectTargetsMap,
    ): string {
        return getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, files, redirectTargetsMap, getPreferences(preferences, compilerOptions, importingSourceFile));
    }

    export function getNodeModulesPackageName(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        nodeModulesFileName: string,
        host: ModuleSpecifierResolutionHost,
        files: readonly SourceFile[],
        redirectTargetsMap: RedirectTargetsMap,
    ): string | undefined {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(files, importingSourceFileName, nodeModulesFileName, info.getCanonicalFileName, host, redirectTargetsMap);
        return firstDefined(modulePaths,
            moduleFileName => tryGetModuleNameAsNodeModule(moduleFileName, info, host, compilerOptions, /*packageNameOnly*/ true));
    }

    function getModuleSpecifierWorker(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        files: readonly SourceFile[],
        redirectTargetsMap: RedirectTargetsMap,
        preferences: Preferences
    ): string {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(files, importingSourceFileName, toFileName, info.getCanonicalFileName, host, redirectTargetsMap);
        return firstDefined(modulePaths, moduleFileName => tryGetModuleNameAsNodeModule(moduleFileName, info, host, compilerOptions)) ||
            getLocalModuleSpecifier(toFileName, info, compilerOptions, preferences);
    }

    /** Returns an import for each symlink and for the realpath. */
    export function getModuleSpecifiers(
        moduleSymbol: Symbol,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        files: readonly SourceFile[],
        userPreferences: UserPreferences,
        redirectTargetsMap: RedirectTargetsMap,
    ): readonly string[] {
        const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol);
        if (ambient) return [ambient];

        const info = getInfo(importingSourceFile.path, host);
        const moduleSourceFile = getSourceFileOfNode(moduleSymbol.valueDeclaration || getNonAugmentationDeclaration(moduleSymbol));
        const modulePaths = getAllModulePaths(files, importingSourceFile.path, moduleSourceFile.originalFileName, info.getCanonicalFileName, host, redirectTargetsMap);

        const preferences = getPreferences(userPreferences, compilerOptions, importingSourceFile);
        const global = mapDefined(modulePaths, moduleFileName => tryGetModuleNameAsNodeModule(moduleFileName, info, host, compilerOptions));
        return global.length ? global : modulePaths.map(moduleFileName => getLocalModuleSpecifier(moduleFileName, info, compilerOptions, preferences));
    }

    interface Info {
        readonly getCanonicalFileName: GetCanonicalFileName;
        readonly sourceDirectory: Path;
    }
    // importingSourceFileName is separate because getEditsForFileRename may need to specify an updated path
    function getInfo(importingSourceFileName: Path, host: ModuleSpecifierResolutionHost): Info {
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : true);
        const sourceDirectory = getDirectoryPath(importingSourceFileName);
        return { getCanonicalFileName, sourceDirectory };
    }

    function getLocalModuleSpecifier(moduleFileName: string, { getCanonicalFileName, sourceDirectory }: Info, compilerOptions: CompilerOptions, { ending, relativePreference }: Preferences): string {
        const { baseUrl, paths, rootDirs } = compilerOptions;

        const relativePath = rootDirs && tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName, ending, compilerOptions) ||
            removeExtensionAndIndexPostFix(ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, moduleFileName, getCanonicalFileName)), ending, compilerOptions);
        if (!baseUrl || relativePreference === RelativePreference.Relative) {
            return relativePath;
        }

        const relativeToBaseUrl = getRelativePathIfInDirectory(moduleFileName, baseUrl, getCanonicalFileName);
        if (!relativeToBaseUrl) {
            return relativePath;
        }

        const importRelativeToBaseUrl = removeExtensionAndIndexPostFix(relativeToBaseUrl, ending, compilerOptions);
        const fromPaths = paths && tryGetModuleNameFromPaths(removeFileExtension(relativeToBaseUrl), importRelativeToBaseUrl, paths);
        const nonRelative = fromPaths === undefined ? importRelativeToBaseUrl : fromPaths;

        if (relativePreference === RelativePreference.NonRelative) {
            return nonRelative;
        }

        if (relativePreference !== RelativePreference.Auto) Debug.assertNever(relativePreference);

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

    function numberOfDirectorySeparators(str: string) {
        const match = str.match(/\//g);
        return match ? match.length : 0;
    }

    function comparePathsByNumberOfDirectorySeparators(a: string, b: string) {
        return compareValues(
            numberOfDirectorySeparators(a),
            numberOfDirectorySeparators(b)
        );
    }

    /**
     * Looks for existing imports that use symlinks to this module.
     * Symlinks will be returned first so they are preferred over the real path.
     */
    function getAllModulePaths(files: readonly SourceFile[], importingFileName: string, importedFileName: string, getCanonicalFileName: GetCanonicalFileName, host: ModuleSpecifierResolutionHost, redirectTargetsMap: RedirectTargetsMap): readonly string[] {
        const redirects = redirectTargetsMap.get(importedFileName);
        const importedFileNames = redirects ? [...redirects, importedFileName] : [importedFileName];
        const cwd = host.getCurrentDirectory ? host.getCurrentDirectory() : "";
        const targets = importedFileNames.map(f => getNormalizedAbsolutePath(f, cwd));
        const links = host.getProbableSymlinks
            ? host.getProbableSymlinks(files)
            : discoverProbableSymlinks(files, getCanonicalFileName, cwd);

        const result: string[] = [];
        const compareStrings = (!host.useCaseSensitiveFileNames || host.useCaseSensitiveFileNames()) ? compareStringsCaseSensitive : compareStringsCaseInsensitive;
        links.forEach((resolved, path) => {
            if (startsWithDirectory(importingFileName, resolved, getCanonicalFileName)) {
                return; // Don't want to a package to globally import from itself
            }

            const target = find(targets, t => compareStrings(t.slice(0, resolved.length + 1), resolved + "/") === Comparison.EqualTo);
            if (target === undefined) return;

            const relative = getRelativePathFromDirectory(resolved, target, getCanonicalFileName);
            const option = resolvePath(path, relative);
            if (!host.fileExists || host.fileExists(option)) {
                result.push(option);
            }
        });
        result.push(...targets);
        if (result.length < 2) return result;

        // Sort by paths closest to importing file Name directory
        const allFileNames = arrayToMap(result, identity, getCanonicalFileName);
        const sortedPaths: string[] = [];
        for (
            let directory = getDirectoryPath(toPath(importingFileName, cwd, getCanonicalFileName));
            allFileNames.size !== 0;
        ) {
            const directoryStart = ensureTrailingDirectorySeparator(directory);
            let pathsInDirectory: string[] | undefined;
            allFileNames.forEach((canonicalFileName, fileName) => {
                if (startsWith(canonicalFileName, directoryStart)) {
                    (pathsInDirectory || (pathsInDirectory = [])).push(fileName);
                    allFileNames.delete(fileName);
                }
            });
            if (pathsInDirectory) {
                if (pathsInDirectory.length > 1) {
                    pathsInDirectory.sort(comparePathsByNumberOfDirectorySeparators);
                }
                sortedPaths.push(...pathsInDirectory);
            }
            const newDirectory = getDirectoryPath(directory);
            if (newDirectory === directory) break;
            directory = newDirectory;
        }
        if (allFileNames.size) {
            const remainingPaths = arrayFrom(allFileNames.values());
            if (remainingPaths.length > 1) remainingPaths.sort(comparePathsByNumberOfDirectorySeparators);
            sortedPaths.push(...remainingPaths);
        }
        return sortedPaths;
    }

    function tryGetModuleNameFromAmbientModule(moduleSymbol: Symbol): string | undefined {
        const decl = find(moduleSymbol.declarations,
            d => isNonGlobalAmbientModule(d) && (!isExternalModuleAugmentation(d) || !isExternalModuleNameRelative(getTextOfIdentifierOrLiteral(d.name)))
        ) as (ModuleDeclaration & { name: StringLiteral }) | undefined;
        if (decl) {
            return decl.name.text;
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

    function tryGetModuleNameAsNodeModule(moduleFileName: string, { getCanonicalFileName, sourceDirectory }: Info, host: ModuleSpecifierResolutionHost, options: CompilerOptions, packageNameOnly?: boolean): string | undefined {
        if (!host.fileExists || !host.readFile) {
            return undefined;
        }
        const parts: NodeModulePathParts = getNodeModulePathParts(moduleFileName)!;
        if (!parts) {
            return undefined;
        }

        let packageJsonContent: any | undefined;
        const packageRootPath = moduleFileName.substring(0, parts.packageRootIndex);
        if (!packageNameOnly) {
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            packageJsonContent = host.fileExists(packageJsonPath)
                ? JSON.parse(host.readFile(packageJsonPath)!)
                : undefined;
            const versionPaths = packageJsonContent && packageJsonContent.typesVersions
                ? getPackageJsonTypesVersionsPaths(packageJsonContent.typesVersions)
                : undefined;
            if (versionPaths) {
                const subModuleName = moduleFileName.slice(parts.packageRootIndex + 1);
                const fromPaths = tryGetModuleNameFromPaths(
                    removeFileExtension(subModuleName),
                    removeExtensionAndIndexPostFix(subModuleName, Ending.Minimal, options),
                    versionPaths.paths
                );
                if (fromPaths !== undefined) {
                    moduleFileName = combinePaths(moduleFileName.slice(0, parts.packageRootIndex), fromPaths);
                }
            }
        }

        // Simplify the full file path to something that can be resolved by Node.

        // If the module could be imported by a directory name, use that directory's name
        const moduleSpecifier = packageNameOnly ? moduleFileName : getDirectoryOrExtensionlessFileName(moduleFileName);
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

        function getDirectoryOrExtensionlessFileName(path: string): string {
            // If the file is the main module, it can be imported by the package name
            if (packageJsonContent) {
                const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main;
                if (isString(mainFileRelative)) {
                    const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                    if (removeFileExtension(mainExportFile) === removeFileExtension(getCanonicalFileName(path))) {
                        return packageRootPath;
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
        const ext = extensionFromPath(fileName);
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
            case Extension.TsBuildInfo:
                return Debug.fail(`Extension ${Extension.TsBuildInfo} is unsupported:: FileName:: ${fileName}`);
            default:
                return Debug.assertNever(ext);
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

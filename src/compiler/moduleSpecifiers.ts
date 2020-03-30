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
        oldImportSpecifier: string,
    ): string | undefined {
        const res = getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, getPreferencesForUpdate(compilerOptions, oldImportSpecifier));
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
        preferences: UserPreferences = {},
    ): string {
        return getModuleSpecifierWorker(compilerOptions, importingSourceFileName, toFileName, host, getPreferences(preferences, compilerOptions, importingSourceFile));
    }

    export function getNodeModulesPackageName(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        nodeModulesFileName: string,
        host: ModuleSpecifierResolutionHost,
    ): string | undefined {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(importingSourceFileName, nodeModulesFileName, host);
        return firstDefined(modulePaths,
            moduleFileName => tryGetModuleNameAsNodeModule(moduleFileName, info, host, compilerOptions, /*packageNameOnly*/ true));
    }

    function getModuleSpecifierWorker(
        compilerOptions: CompilerOptions,
        importingSourceFileName: Path,
        toFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferences: Preferences
    ): string {
        const info = getInfo(importingSourceFileName, host);
        const modulePaths = getAllModulePaths(importingSourceFileName, toFileName, host);
        return firstDefined(modulePaths, moduleFileName => tryGetModuleNameAsNodeModule(moduleFileName, info, host, compilerOptions)) ||
            getLocalModuleSpecifier(toFileName, info, compilerOptions, preferences);
    }

    /** Returns an import for each symlink and for the realpath. */
    export function getModuleSpecifiers(
        moduleSymbol: Symbol,
        compilerOptions: CompilerOptions,
        importingSourceFile: SourceFile,
        host: ModuleSpecifierResolutionHost,
        userPreferences: UserPreferences,
    ): readonly string[] {
        const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol);
        if (ambient) return [ambient];

        const info = getInfo(importingSourceFile.path, host);
        const moduleSourceFile = getSourceFileOfNode(moduleSymbol.valueDeclaration || getNonAugmentationDeclaration(moduleSymbol));
        const modulePaths = getAllModulePaths(importingSourceFile.path, moduleSourceFile.originalFileName, host);

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

    export function forEachFileNameOfModule<T>(
        importingFileName: string,
        importedFileName: string,
        host: ModuleSpecifierResolutionHost,
        preferSymlinks: boolean,
        cb: (fileName: string) => T | undefined
    ): T | undefined {
        const getCanonicalFileName = hostGetCanonicalFileName(host);
        const cwd = host.getCurrentDirectory();
        const referenceRedirect = host.isSourceOfProjectReferenceRedirect(importedFileName) ? host.getProjectReferenceRedirect(importedFileName) : undefined;
        const redirects = host.redirectTargetsMap.get(toPath(importedFileName, cwd, getCanonicalFileName)) || emptyArray;
        const importedFileNames = [...(referenceRedirect ? [referenceRedirect] : emptyArray), importedFileName, ...redirects];
        const targets = importedFileNames.map(f => getNormalizedAbsolutePath(f, cwd));
        if (!preferSymlinks) {
            const result = forEach(targets, cb);
            if (result) return result;
        }
        const links = host.getProbableSymlinks
            ? host.getProbableSymlinks(host.getSourceFiles())
            : discoverProbableSymlinks(host.getSourceFiles(), getCanonicalFileName, cwd);

        const compareStrings = (!host.useCaseSensitiveFileNames || host.useCaseSensitiveFileNames()) ? compareStringsCaseSensitive : compareStringsCaseInsensitive;
        const result = forEachEntry(links, (resolved, path) => {
            if (startsWithDirectory(importingFileName, resolved, getCanonicalFileName)) {
                return undefined; // Don't want to a package to globally import from itself
            }

            const target = find(targets, t => compareStrings(t.slice(0, resolved.length + 1), resolved + "/") === Comparison.EqualTo);
            if (target === undefined) return undefined;

            const relative = getRelativePathFromDirectory(resolved, target, getCanonicalFileName);
            const option = resolvePath(path, relative);
            if (!host.fileExists || host.fileExists(option)) {
                const result = cb(option);
                if (result) return result;
            }
        });
        return result ||
            (preferSymlinks ? forEach(targets, cb) : undefined);
    }

    /**
     * Looks for existing imports that use symlinks to this module.
     * Symlinks will be returned first so they are preferred over the real path.
     */
    function getAllModulePaths(importingFileName: string, importedFileName: string, host: ModuleSpecifierResolutionHost): readonly string[] {
        const cwd = host.getCurrentDirectory();
        const getCanonicalFileName = hostGetCanonicalFileName(host);
        const allFileNames = createMap<string>();
        let importedFileFromNodeModules = false;
        forEachFileNameOfModule(
            importingFileName,
            importedFileName,
            host,
            /*preferSymlinks*/ true,
            path => {
                // dont return value, so we collect everything
                allFileNames.set(path, getCanonicalFileName(path));
                importedFileFromNodeModules = importedFileFromNodeModules || pathContainsNodeModules(path);
            }
        );

        // Sort by paths closest to importing file Name directory
        const sortedPaths: string[] = [];
        for (
            let directory = getDirectoryPath(toPath(importingFileName, cwd, getCanonicalFileName));
            allFileNames.size !== 0;
        ) {
            const directoryStart = ensureTrailingDirectorySeparator(directory);
            let pathsInDirectory: string[] | undefined;
            allFileNames.forEach((canonicalFileName, fileName) => {
                if (startsWith(canonicalFileName, directoryStart)) {
                    // If the importedFile is from node modules, use only paths in node_modules folder as option
                    if (!importedFileFromNodeModules || pathContainsNodeModules(fileName)) {
                        (pathsInDirectory || (pathsInDirectory = [])).push(fileName);
                    }
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

        // Simplify the full file path to something that can be resolved by Node.

        let moduleSpecifier = moduleFileName;
        if (!packageNameOnly) {
            let packageRootIndex = parts.packageRootIndex;
            let moduleFileNameForExtensionless: string | undefined;
            while (true) {
                // If the module could be imported by a directory name, use that directory's name
                const { moduleFileToTry, packageRootPath } = tryDirectoryWithPackageJson(packageRootIndex);
                if (packageRootPath) {
                    moduleSpecifier = packageRootPath;
                    break;
                }
                if (!moduleFileNameForExtensionless) moduleFileNameForExtensionless = moduleFileToTry;

                // try with next level of directory
                packageRootIndex = moduleFileName.indexOf(directorySeparator, packageRootIndex + 1);
                if (packageRootIndex === -1) {
                    moduleSpecifier = getExtensionlessFileName(moduleFileNameForExtensionless);
                    break;
                }
            }
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
            const packageRootPath = moduleFileName.substring(0, packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            let moduleFileToTry = moduleFileName;
            if (host.fileExists(packageJsonPath)) {
                const packageJsonContent = JSON.parse(host.readFile!(packageJsonPath)!);
                const versionPaths = packageJsonContent.typesVersions
                    ? getPackageJsonTypesVersionsPaths(packageJsonContent.typesVersions)
                    : undefined;
                if (versionPaths) {
                    const subModuleName = moduleFileName.slice(packageRootPath.length + 1);
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

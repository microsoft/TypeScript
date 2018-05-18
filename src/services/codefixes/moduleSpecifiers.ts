// Used by importFixes to synthesize import module specifiers.
/* @internal */
namespace ts.moduleSpecifiers {
    // For each symlink/original for a module, returns a list of ways to import that file.
    export function getModuleSpecifiers(
        moduleSymbol: Symbol,
        program: Program,
        importingSourceFile: SourceFile,
        host: LanguageServiceHost,
        preferences: UserPreferences,
    ): ReadonlyArray<ReadonlyArray<string>> {
        const compilerOptions = program.getCompilerOptions();
        const { baseUrl, paths, rootDirs } = compilerOptions;
        const moduleResolutionKind = getEmitModuleResolutionKind(compilerOptions);
        const addJsExtension = usesJsExtensionOnImports(importingSourceFile);
        const getCanonicalFileName = hostGetCanonicalFileName(host);
        const sourceDirectory = getDirectoryPath(importingSourceFile.fileName);

        return getAllModulePaths(program, moduleSymbol.valueDeclaration.getSourceFile()).map(moduleFileName => {
            const global = tryGetModuleNameFromAmbientModule(moduleSymbol)
                || tryGetModuleNameFromTypeRoots(compilerOptions, host, getCanonicalFileName, moduleFileName, addJsExtension)
                || tryGetModuleNameAsNodeModule(compilerOptions, moduleFileName, host, getCanonicalFileName, sourceDirectory)
                || rootDirs && tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName);
            if (global) {
                return [global];
            }

            const relativePath = removeExtensionAndIndexPostFix(ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, moduleFileName, getCanonicalFileName)), moduleResolutionKind, addJsExtension);
            if (!baseUrl || preferences.importModuleSpecifierPreference === "relative") {
                return [relativePath];
            }

            const relativeToBaseUrl = getRelativePathIfInDirectory(moduleFileName, baseUrl, getCanonicalFileName);
            if (!relativeToBaseUrl) {
                return [relativePath];
            }

            const importRelativeToBaseUrl = removeExtensionAndIndexPostFix(relativeToBaseUrl, moduleResolutionKind, addJsExtension);
            if (paths) {
                const fromPaths = tryGetModuleNameFromPaths(removeFileExtension(relativeToBaseUrl), importRelativeToBaseUrl, paths);
                if (fromPaths) {
                    return [fromPaths];
                }
            }

            if (preferences.importModuleSpecifierPreference === "non-relative") {
                return [importRelativeToBaseUrl];
            }

            if (preferences.importModuleSpecifierPreference !== undefined) Debug.assertNever(preferences.importModuleSpecifierPreference);

            if (isPathRelativeToParent(relativeToBaseUrl)) {
                return [relativePath];
            }

            /*
            Prefer a relative import over a baseUrl import if it doesn't traverse up to baseUrl.

            Suppose we have:
                baseUrl = /base
                sourceDirectory = /base/a/b
                moduleFileName = /base/foo/bar
            Then:
                relativePath = ../../foo/bar
                getRelativePathNParents(relativePath) = 2
                pathFromSourceToBaseUrl = ../../
                getRelativePathNParents(pathFromSourceToBaseUrl) = 2
                2 < 2 = false
            In this case we should prefer using the baseUrl path "/a/b" instead of the relative path "../../foo/bar".

            Suppose we have:
                baseUrl = /base
                sourceDirectory = /base/foo/a
                moduleFileName = /base/foo/bar
            Then:
                relativePath = ../a
                getRelativePathNParents(relativePath) = 1
                pathFromSourceToBaseUrl = ../../
                getRelativePathNParents(pathFromSourceToBaseUrl) = 2
                1 < 2 = true
            In this case we should prefer using the relative path "../a" instead of the baseUrl path "foo/a".
            */
            const pathFromSourceToBaseUrl = ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, baseUrl, getCanonicalFileName));
            const relativeFirst = getRelativePathNParents(relativePath) < getRelativePathNParents(pathFromSourceToBaseUrl);
            return relativeFirst ? [relativePath, importRelativeToBaseUrl] : [importRelativeToBaseUrl, relativePath];
        });
    }

    function usesJsExtensionOnImports({ imports }: SourceFile): boolean {
        return firstDefined(imports, ({ text }) => pathIsRelative(text) ? fileExtensionIs(text, Extension.Js) : undefined) || false;
    }

    /**
     * Looks for a existing imports that use symlinks to this module.
     * Only if no symlink is available, the real path will be used.
     */
    function getAllModulePaths(program: Program, { fileName }: SourceFile): ReadonlyArray<string> {
        const symlinks = mapDefined(program.getSourceFiles(), sf =>
            sf.resolvedModules && firstDefinedIterator(sf.resolvedModules.values(), res =>
                res && res.resolvedFileName === fileName ? res.originalPath : undefined));
        return symlinks.length === 0 ? [fileName] : symlinks;
    }

    function getRelativePathNParents(relativePath: string): number {
        const components = getPathComponents(relativePath);
        if (components[0] || components.length === 1) return 0;
        for (let i = 1; i < components.length; i++) {
            if (components[i] !== "..") return i - 1;
        }
        return components.length - 1;
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
        host: LanguageServiceHost,
        getCanonicalFileName: (file: string) => string,
        sourceDirectory: string,
    ): string | undefined {
        if (getEmitModuleResolutionKind(options) !== ModuleResolutionKind.NodeJs) {
            // nothing to do here
            return undefined;
        }

        const parts = getNodeModulePathParts(moduleFileName);

        if (!parts) {
            return undefined;
        }

        // Simplify the full file path to something that can be resolved by Node.

        // If the module could be imported by a directory name, use that directory's name
        let moduleSpecifier = getDirectoryOrExtensionlessFileName(moduleFileName);
        // Get a path that's relative to node_modules or the importing file's path
        moduleSpecifier = getNodeResolvablePath(moduleSpecifier);
        // If the module was found in @types, get the actual Node package name
        return getPackageNameFromAtTypesDirectory(moduleSpecifier);

        function getDirectoryOrExtensionlessFileName(path: string): string {
            // If the file is the main module, it can be imported by the package name
            const packageRootPath = path.substring(0, parts.packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            if (host.fileExists(packageJsonPath)) {
                const packageJsonContent = JSON.parse(host.readFile(packageJsonPath));
                if (packageJsonContent) {
                    const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main;
                    if (mainFileRelative) {
                        const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                        if (mainExportFile === getCanonicalFileName(path)) {
                            return packageRootPath;
                        }
                    }
                }
            }

            // We still have a file name - remove the extension
            const fullModulePathWithoutExtension = removeFileExtension(path);

            // If the file is /index, it can be imported by its directory name
            if (getCanonicalFileName(fullModulePathWithoutExtension.substring(parts.fileNameIndex)) === "/index") {
                return fullModulePathWithoutExtension.substring(0, parts.fileNameIndex);
            }

            return fullModulePathWithoutExtension;
        }

        function getNodeResolvablePath(path: string): string {
            const basePath = path.substring(0, parts.topLevelNodeModulesIndex);
            if (sourceDirectory.indexOf(basePath) === 0) {
                // if node_modules folder is in this folder or any of its parent folders, no need to keep it.
                return path.substring(parts.topLevelPackageNameIndex + 1);
            }
            else {
                return ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, path, getCanonicalFileName));
            }
        }
    }

    function getNodeModulePathParts(fullPath: string) {
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
            const relativePath = getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName);
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

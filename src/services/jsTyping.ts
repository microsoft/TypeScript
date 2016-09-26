// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0.
// See LICENSE.txt in the project root for complete license information.

/// <reference path='../compiler/types.ts' />
/// <reference path='../compiler/core.ts' />
/// <reference path='../compiler/commandLineParser.ts' />

/* @internal */
namespace ts.JsTyping {

    export interface TypingResolutionHost {
        directoryExists: (path: string) => boolean;
        fileExists: (fileName: string) => boolean;
        readFile: (path: string, encoding?: string) => string;
        readDirectory: (rootDir: string, extensions: string[], excludes: string[], includes: string[], depth?: number) => string[];
    };

    interface PackageJson {
        _requiredBy?: string[];
        dependencies?: MapLike<string>;
        devDependencies?: MapLike<string>;
        name?: string;
        optionalDependencies?: MapLike<string>;
        peerDependencies?: MapLike<string>;
        typings?: string;
    };

    // A map of loose file names to library names
    // that we are confident require typings
    let safeList: Map<string, string>;

    const EmptySafeList = new StringMap<string>();

    /**
     * @param host is the object providing I/O related operations.
     * @param fileNames are the file names that belong to the same project
     * @param projectRootPath is the path to the project root directory
     * @param safeListPath is the path used to retrieve the safe list
     * @param packageNameToTypingLocation is the map of package names to their cached typing locations
     * @param typingOptions are used to customize the typing inference process
     * @param compilerOptions are used as a source for typing inference
     */
    export function discoverTypings(
        host: TypingResolutionHost,
        fileNames: string[],
        projectRootPath: Path,
        safeListPath: Path,
        packageNameToTypingLocation: Map<string, string>,
        typingOptions: TypingOptions,
        compilerOptions: CompilerOptions):
        { cachedTypingPaths: string[], newTypingNames: string[], filesToWatch: string[] } {

        // A typing name to typing file path mapping
        const inferredTypings = new StringMap<string | undefined>();

        if (!typingOptions || !typingOptions.enableAutoDiscovery) {
            return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
        }

        // Only infer typings for .js and .jsx files
        fileNames = filter(map(fileNames, normalizePath), f => {
            const kind = ensureScriptKind(f, getScriptKindFromFileName(f));
            return kind === ScriptKind.JS || kind === ScriptKind.JSX;
        });

        if (!safeList) {
            const result = readConfigFile(safeListPath, (path: string) => host.readFile(path));
            safeList = result.config ? mapOfMapLike<string>(result.config) : EmptySafeList;
        }

        const filesToWatch: string[] = [];
        // Directories to search for package.json, bower.json and other typing information
        let searchDirs: string[] = [];
        let exclude: string[] = [];

        mergeTypings(typingOptions.include);
        exclude = typingOptions.exclude || [];

        const possibleSearchDirs = map(fileNames, getDirectoryPath);
        if (projectRootPath !== undefined) {
            possibleSearchDirs.push(projectRootPath);
        }
        searchDirs = deduplicate(possibleSearchDirs);
        for (const searchDir of searchDirs) {
            const packageJsonPath = combinePaths(searchDir, "package.json");
            getTypingNamesFromJson(packageJsonPath, filesToWatch);

            const bowerJsonPath = combinePaths(searchDir, "bower.json");
            getTypingNamesFromJson(bowerJsonPath, filesToWatch);

            const nodeModulesPath = combinePaths(searchDir, "node_modules");
            getTypingNamesFromNodeModuleFolder(nodeModulesPath);
        }
        getTypingNamesFromSourceFileNames(fileNames);

        // Add the cached typing locations for inferred typings that are already installed
        packageNameToTypingLocation.forEach((typingLocation, name) => {
            if (inferredTypings.has(name) && inferredTypings.get(name) === undefined) {
                inferredTypings.set(name, typingLocation);
            }
        });

        // Remove typings that the user has added to the exclude list
        for (const excludeTypingName of exclude) {
            inferredTypings.delete(excludeTypingName);
        }

        const newTypingNames: string[] = [];
        const cachedTypingPaths: string[] = [];

        inferredTypings.forEach((inferredTyping, typing) => {
            if (inferredTyping !== undefined) {
                cachedTypingPaths.push(inferredTyping);
            }
            else {
                newTypingNames.push(typing);
            }
        });
        return { cachedTypingPaths, newTypingNames, filesToWatch };

        /**
         * Merge a given list of typingNames to the inferredTypings map
         */
        function mergeTypings(typingNames: string[]) {
            if (!typingNames) {
                return;
            }

            for (const typing of typingNames) {
                if (!inferredTypings.has(typing)) {
                    inferredTypings.set(typing, undefined);
                }
            }
        }

        /**
         * Get the typing info from common package manager json files like package.json or bower.json
         */
        function getTypingNamesFromJson(jsonPath: string, filesToWatch: string[]) {
            const result = readConfigFile(jsonPath, (path: string) => host.readFile(path));
            if (result.config) {
                const jsonConfig: PackageJson = result.config;
                filesToWatch.push(jsonPath);
                if (jsonConfig.dependencies) {
                    mergeTypings(getOwnKeys(jsonConfig.dependencies));
                }
                if (jsonConfig.devDependencies) {
                    mergeTypings(getOwnKeys(jsonConfig.devDependencies));
                }
                if (jsonConfig.optionalDependencies) {
                    mergeTypings(getOwnKeys(jsonConfig.optionalDependencies));
                }
                if (jsonConfig.peerDependencies) {
                    mergeTypings(getOwnKeys(jsonConfig.peerDependencies));
                }
            }
        }

        /**
         * Infer typing names from given file names. For example, the file name "jquery-min.2.3.4.js"
         * should be inferred to the 'jquery' typing name; and "angular-route.1.2.3.js" should be inferred
         * to the 'angular-route' typing name.
         * @param fileNames are the names for source files in the project
         */
        function getTypingNamesFromSourceFileNames(fileNames: string[]) {
            const jsFileNames = filter(fileNames, hasJavaScriptFileExtension);
            const inferredTypingNames = map(jsFileNames, f => removeFileExtension(getBaseFileName(f.toLowerCase())));
            const cleanedTypingNames = map(inferredTypingNames, f => f.replace(/((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g, ""));

            if (safeList !== EmptySafeList) {
                mergeTypings(filter(cleanedTypingNames, f => safeList.has(f)));
            }

            const hasJsxFile = forEach(fileNames, f => ensureScriptKind(f, getScriptKindFromFileName(f)) === ScriptKind.JSX);
            if (hasJsxFile) {
                mergeTypings(["react"]);
            }
        }

        /**
         * Infer typing names from node_module folder
         * @param nodeModulesPath is the path to the "node_modules" folder
         */
        function getTypingNamesFromNodeModuleFolder(nodeModulesPath: string) {
            // Todo: add support for ModuleResolutionHost too
            if (!host.directoryExists(nodeModulesPath)) {
                return;
            }

            const typingNames: string[] = [];
            const fileNames = host.readDirectory(nodeModulesPath, [".json"], /*excludes*/ undefined, /*includes*/ undefined, /*depth*/ 2);
            for (const fileName of fileNames) {
                const normalizedFileName = normalizePath(fileName);
                if (getBaseFileName(normalizedFileName) !== "package.json") {
                    continue;
                }
                const result = readConfigFile(normalizedFileName, (path: string) => host.readFile(path));
                if (!result.config) {
                    continue;
                }
                const packageJson: PackageJson = result.config;

                // npm 3's package.json contains a "_requiredBy" field
                // we should include all the top level module names for npm 2, and only module names whose
                // "_requiredBy" field starts with "#" or equals "/" for npm 3.
                if (packageJson._requiredBy &&
                    filter(packageJson._requiredBy, (r: string) => r[0] === "#" || r === "/").length === 0) {
                    continue;
                }

                // If the package has its own d.ts typings, those will take precedence. Otherwise the package name will be used
                // to download d.ts files from DefinitelyTyped
                if (!packageJson.name) {
                    continue;
                }
                if (packageJson.typings) {
                    const absolutePath = getNormalizedAbsolutePath(packageJson.typings, getDirectoryPath(normalizedFileName));
                    inferredTypings.set(packageJson.name, absolutePath);
                }
                else {
                    typingNames.push(packageJson.name);
                }
            }
            mergeTypings(typingNames);
        }

    }
}

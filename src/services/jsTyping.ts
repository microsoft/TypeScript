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
        dependencies?: Map<string>;
        devDependencies?: Map<string>;
        name?: string;
        optionalDependencies?: Map<string>;
        peerDependencies?: Map<string>;
        typings?: string;
    };

    // A map of loose file names to library names
    // that we are confident require typings
    let safeList: Map<string>;

    const EmptySafeList: Map<string> = createMap<string>();

    /* @internal */
    export const nodeCoreModuleList: ReadonlyArray<string> = [
        "buffer", "querystring", "events", "http", "cluster",
        "zlib", "os", "https", "punycode", "repl", "readline",
        "vm", "child_process", "url", "dns", "net",
        "dgram", "fs", "path", "string_decoder", "tls",
        "crypto", "stream", "util", "assert", "tty", "domain",
        "constants", "process", "v8", "timers", "console"];

    const nodeCoreModules = arrayToMap(<string[]>nodeCoreModuleList, x => x);

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
        packageNameToTypingLocation: Map<string>,
        typingOptions: TypingOptions,
        unresolvedImports: ReadonlyArray<string>):
        { cachedTypingPaths: string[], newTypingNames: string[], filesToWatch: string[] } {

        // A typing name to typing file path mapping
        const inferredTypings = createMap<string>();

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
            safeList = result.config ? createMap<string>(result.config) : EmptySafeList;
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

        // add typings for unresolved imports
        if (unresolvedImports) {
            for (const moduleId of unresolvedImports) {
                const typingName = moduleId in nodeCoreModules ? "node" : moduleId;
                if (!(typingName in inferredTypings)) {
                    inferredTypings[typingName] = undefined;
                }
            }
        }
        // Add the cached typing locations for inferred typings that are already installed
        for (const name in packageNameToTypingLocation) {
            if (name in inferredTypings && !inferredTypings[name]) {
                inferredTypings[name] = packageNameToTypingLocation[name];
            }
        }

        // Remove typings that the user has added to the exclude list
        for (const excludeTypingName of exclude) {
            delete inferredTypings[excludeTypingName];
        }

        const newTypingNames: string[] = [];
        const cachedTypingPaths: string[] = [];
        for (const typing in inferredTypings) {
            if (inferredTypings[typing] !== undefined) {
                cachedTypingPaths.push(inferredTypings[typing]);
            }
            else {
                newTypingNames.push(typing);
            }
        }
        return { cachedTypingPaths, newTypingNames, filesToWatch };

        /**
         * Merge a given list of typingNames to the inferredTypings map
         */
        function mergeTypings(typingNames: string[]) {
            if (!typingNames) {
                return;
            }

            for (const typing of typingNames) {
                if (!(typing in inferredTypings)) {
                    inferredTypings[typing] = undefined;
                }
            }
        }

        /**
         * Get the typing info from common package manager json files like package.json or bower.json
         */
        function getTypingNamesFromJson(jsonPath: string, filesToWatch: string[]) {
            if (host.fileExists(jsonPath)) {
                filesToWatch.push(jsonPath);
            }
            const result = readConfigFile(jsonPath, (path: string) => host.readFile(path));
            if (result.config) {
                const jsonConfig: PackageJson = result.config;
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
                mergeTypings(filter(cleanedTypingNames, f => f in safeList));
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
                    inferredTypings[packageJson.name] = absolutePath;
                }
                else {
                    typingNames.push(packageJson.name);
                }
            }
            mergeTypings(typingNames);
        }

    }
}

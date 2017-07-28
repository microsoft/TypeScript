// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0.
// See LICENSE.txt in the project root for complete license information.

/// <reference path='../compiler/types.ts' />
/// <reference path='../compiler/core.ts' />
/// <reference path='../compiler/commandLineParser.ts' />

/* @internal */
namespace ts.JsTyping {

    export interface TypingResolutionHost {
        directoryExists(path: string): boolean;
        fileExists(fileName: string): boolean;
        readFile(path: string, encoding?: string): string | undefined;
        readDirectory(rootDir: string, extensions: ReadonlyArray<string>, excludes: ReadonlyArray<string>, includes: ReadonlyArray<string>, depth?: number): string[];
    }

    interface PackageJson {
        _requiredBy?: string[];
        dependencies?: MapLike<string>;
        devDependencies?: MapLike<string>;
        name?: string;
        optionalDependencies?: MapLike<string>;
        peerDependencies?: MapLike<string>;
        typings?: string;
    }

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
     * A map of loose file names to library names that we are confident require typings
     */
    export type SafeList = ReadonlyMap<string>;

    export function loadSafeList(host: TypingResolutionHost, safeListPath: Path): SafeList {
        const result = readConfigFile(safeListPath, path => host.readFile(path));
        return createMapFromTemplate<string>(result.config);
    }

    /**
     * @param host is the object providing I/O related operations.
     * @param fileNames are the file names that belong to the same project
     * @param projectRootPath is the path to the project root directory
     * @param safeListPath is the path used to retrieve the safe list
     * @param packageNameToTypingLocation is the map of package names to their cached typing locations
     * @param typeAcquisition is used to customize the typing acquisition process
     * @param compilerOptions are used as a source for typing inference
     */
    export function discoverTypings(
        host: TypingResolutionHost,
        log: ((message: string) => void) | undefined,
        fileNames: string[],
        projectRootPath: Path,
        safeList: SafeList,
        packageNameToTypingLocation: ReadonlyMap<string>,
        typeAcquisition: TypeAcquisition,
        unresolvedImports: ReadonlyArray<string>):
        { cachedTypingPaths: string[], newTypingNames: string[], filesToWatch: string[] } {

        if (!typeAcquisition || !typeAcquisition.enable) {
            return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
        }

        // A typing name to typing file path mapping
        const inferredTypings = createMap<string>();

        // Only infer typings for .js and .jsx files
        fileNames = mapDefined(fileNames, fileName => {
            const path = normalizePath(fileName);
            if (hasJavaScriptFileExtension(path)) {
                return path;
            }
        });

        const filesToWatch: string[] = [];

        forEach(typeAcquisition.include, addInferredTyping);
        const exclude = typeAcquisition.exclude || [];

        // Directories to search for package.json, bower.json and other typing information
        const possibleSearchDirs = createMap<true>();
        for (const f of fileNames) {
            possibleSearchDirs.set(getDirectoryPath(f), true);
        }
        possibleSearchDirs.set(projectRootPath, true);
        possibleSearchDirs.forEach((_true, searchDir) => {
            const packageJsonPath = combinePaths(searchDir, "package.json");
            getTypingNamesFromJson(packageJsonPath, filesToWatch);

            const bowerJsonPath = combinePaths(searchDir, "bower.json");
            getTypingNamesFromJson(bowerJsonPath, filesToWatch);

            const bowerComponentsPath = combinePaths(searchDir, "bower_components");
            getTypingNamesFromPackagesFolder(bowerComponentsPath, filesToWatch);

            const nodeModulesPath = combinePaths(searchDir, "node_modules");
            getTypingNamesFromPackagesFolder(nodeModulesPath, filesToWatch);
        });
        getTypingNamesFromSourceFileNames(fileNames);

        // add typings for unresolved imports
        if (unresolvedImports) {
            const x = unresolvedImports.map(moduleId => nodeCoreModules.has(moduleId) ? "node" : moduleId);
            if (x.length && log) log(`Inferred typings from unresolved imports: ${JSON.stringify(x)}`);
            for (const typingName of x) {
                if (!inferredTypings.has(typingName)) {
                    inferredTypings.set(typingName, undefined);
                }
            }
        }
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
        inferredTypings.forEach((inferred, typing) => {
            if (inferred !== undefined) {
                cachedTypingPaths.push(inferred);
            }
            else {
                newTypingNames.push(typing);
            }
        });
        const result = { cachedTypingPaths, newTypingNames, filesToWatch };
        if (log) log(`Result: ${JSON.stringify(result)}`);
        return result;

        function addInferredTyping(typingName: string) {
            if (!inferredTypings.has(typingName)) {
                inferredTypings.set(typingName, undefined);
            }
        }

        /**
         * Get the typing info from common package manager json files like package.json or bower.json
         */
        function getTypingNamesFromJson(jsonPath: string, filesToWatch: Push<string>) {
            if (!host.fileExists(jsonPath)) {
                return;
            }

            filesToWatch.push(jsonPath);
            if (log) log(`Searching for typing names in '${jsonPath}' dependencies`);
            const jsonConfig: PackageJson = readConfigFile(jsonPath, (path: string) => host.readFile(path)).config;
            addInferredTypingsFromKeys(jsonConfig.dependencies);
            addInferredTypingsFromKeys(jsonConfig.devDependencies);
            addInferredTypingsFromKeys(jsonConfig.optionalDependencies);
            addInferredTypingsFromKeys(jsonConfig.peerDependencies);

            function addInferredTypingsFromKeys(map: MapLike<string> | undefined): void {
                for (const key in map) {
                    if (ts.hasProperty(map, key)) {
                        addInferredTyping(key);
                    }
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
            const fromFileNames = mapDefined(fileNames, j => {
                if (!hasJavaScriptFileExtension(j)) return undefined;

                const inferredTypingName = removeFileExtension(getBaseFileName(j.toLowerCase()));
                const cleanedTypingName = inferredTypingName.replace(/((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g, "");
                return safeList.get(cleanedTypingName);
            });
            if (fromFileNames.length) {
                if (log) log(`Inferred typings from file names: ${JSON.stringify(fromFileNames)}`);
                for (const safe of fromFileNames) {
                    addInferredTyping(safe);
                }
            }

            const hasJsxFile = some(fileNames, f => fileExtensionIs(f, Extension.Jsx));
            if (hasJsxFile) {
                if (log) log(`Inferred 'react' typings due to presence of '.jsx' extension`);
                addInferredTyping("react");
            }
        }

        /**
         * Infer typing names from packages folder (ex: node_module, bower_components)
         * @param packagesFolderPath is the path to the packages folder
         */
        function getTypingNamesFromPackagesFolder(packagesFolderPath: string, filesToWatch: Push<string>) {
            filesToWatch.push(packagesFolderPath);

            // Todo: add support for ModuleResolutionHost too
            if (!host.directoryExists(packagesFolderPath)) {
                return;
            }

            // depth of 2, so we access `node_modules/foo` but not `node_modules/foo/bar`
            const fileNames = host.readDirectory(packagesFolderPath, [".json"], /*excludes*/ undefined, /*includes*/ undefined, /*depth*/ 2);
            if (log) log(`Searching for typing names in ${packagesFolderPath}; all files: ${JSON.stringify(fileNames)}`);
            for (const fileName of fileNames) {
                const normalizedFileName = normalizePath(fileName);
                const baseFileName = getBaseFileName(normalizedFileName);
                if (baseFileName !== "package.json" && baseFileName !== "bower.json") {
                    continue;
                }
                const result = readConfigFile(normalizedFileName, (path: string) => host.readFile(path));
                const packageJson: PackageJson = result.config;

                // npm 3's package.json contains a "_requiredBy" field
                // we should include all the top level module names for npm 2, and only module names whose
                // "_requiredBy" field starts with "#" or equals "/" for npm 3.
                if (baseFileName === "package.json" && packageJson._requiredBy &&
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
                    addInferredTyping(packageJson.name);
                }
            }
        }

    }
}

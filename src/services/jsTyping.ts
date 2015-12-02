// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

/* @internal */
namespace ts.JsTyping {

    type HostType = {
        fileExists: (fileName: string) => boolean;
        readFile: (path: string, encoding?: string) => string;
        readDirectory: (path: string, extension?: string, exclude?: string[], depth?: number) => string[];
        writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void;
    };

    interface TsdJsonCacheInfo {
        path: string;
        value: any;
    }

    var _host: HostType;
    
    // a typing name to typing file path mapping
    var inferredTypings: Map<string> = {};

    function tryParseJson(jsonPath: string) {
        try {
            return JSON.parse(jsonPath);
        }
        catch (e) { return undefined; }
    }
    
    /**
     * @param cachePath is the path to the cache location, which contains a tsd.json file and a typings folder
     */
    export function discoverTypings(
        host: HostType, fileNames: string[], cachePath: string, compilerOptions?: CompilerOptions, safeList?: string[], noDevDependencies?: boolean)
        : { cachedTypingPaths: string[], newTypingNames: string[] } {
        _host = host;
        // Directories to search for package.json, bower.json and other typing information
        let searchDirs: string[] = [];

        for (let fileName of fileNames) {
            if (ts.getBaseFileName(fileName) !== "lib.d.ts") {
                let dir = ts.getDirectoryPath(ts.normalizePath(fileName));
                if (searchDirs.indexOf(dir) < 0) {
                    searchDirs.push(dir);
                }
            }
        }

        for (let searchDir of searchDirs) {
            let packageJsonPath = ts.combinePaths(searchDir, "package.json");
            getTypingNamesFromJson(packageJsonPath);

            let bowerJsonPath = ts.combinePaths(searchDir, "bower.json");
            getTypingNamesFromJson(bowerJsonPath);

            let nodeModulesPath = ts.combinePaths(searchDir, "node_modules");
            getTypingNamesFromNodeModuleFolder(nodeModulesPath);
        }
        
        // Todo: use a real safe list
        getTypingNamesFromSourceFileNames(fileNames, ["react", "jquery"]);
        getTypingNamesFromCompilerOptions(compilerOptions);

        let normalizedCachePath = ts.normalizePath(cachePath);
        let typingsPath = ts.combinePaths(normalizedCachePath, "typings");
        let tsdJsonCacheInfo = tryGetTsdJsonCacheInfo(host, cachePath);
        if (tsdJsonCacheInfo) {
            let cacheTsdJsonDict = tsdJsonCacheInfo.value;
            // The "notFound" property in the tsd.json is a list of items that were not found in DefinitelyTyped. 
            // Therefore if they don't come with d.ts files, we should not retry downloading these packages.
            if (cacheTsdJsonDict.hasOwnProperty("notFound")) {
                for (let notFoundTypingName of cacheTsdJsonDict["notFound"]) {
                    if (inferredTypings.hasOwnProperty(notFoundTypingName) && !inferredTypings[notFoundTypingName]) {
                        delete inferredTypings[notFoundTypingName];
                    }
                }
            }

            // The "installed" property in the tsd.json serves as a registry of installed typings. Each item 
            // of this object has a key of the relative file path, and a value that contains the corresponding
            // commit hash.
            if (cacheTsdJsonDict.hasOwnProperty("installed")) {
                for (let cachedTypingPath of Object.keys(cacheTsdJsonDict.installed)) {
                    // Assuming the cachedTypingPath has the format of "[package name]/[file name]"
                    // Todo: sometimes the package names may not match exactly. For example, in package.json angular
                    // is written as "angular", however the resolved typing is "angularjs/..", therefore it would never
                    // match cached version
                    let cachedTypingName = cachedTypingPath.substr(0, cachedTypingPath.indexOf('/'));
                    // If the inferred[cachedTypingName] is already not null, which means we found a corresponding
                    // d.ts file that coming with the package. That one should take higher priority.
                    if (inferredTypings.hasOwnProperty(cachedTypingName) && !inferredTypings[cachedTypingName]) {
                        inferredTypings[cachedTypingName] = ts.combinePaths(typingsPath, cachedTypingPath);
                    }
                }
            }
        }

        let newTypingNames: string[] = [];
        let cachedTypingPaths: string[] = [];
        for (let typing in inferredTypings) {
            if (inferredTypings[typing]) {
                cachedTypingPaths.push(inferredTypings[typing]);
            }
            else {
                newTypingNames.push(typing);
            }
        }

        return { cachedTypingPaths, newTypingNames };
    }

    /**
     * Merge a given list of typingNames to the inferredTypings map
     */
    function mergeTypings(typingNames: string[]) {
        for (let typing of typingNames) {
            if (!inferredTypings.hasOwnProperty(typing)) {
                inferredTypings[typing] = undefined;
            }
        }
    }

    /**
     * Get the typing info from common package manager json files like package.json or bower.json
     */
    function getTypingNamesFromJson(jsonPath: string) {
        if (_host.fileExists(jsonPath)) {
            let jsonDict = tryParseJson(_host.readFile(jsonPath));
            if (jsonDict && jsonDict.hasOwnProperty("dependencies")) {
                mergeTypings(Object.keys(jsonDict.dependencies));
            }
        }
    }

    /**
     * Infer typing names from given file names. For example, the file name "jquery-min.2.3.4.js"
     * should be inferred to the 'jquery' typing name; and "angular-route.1.2.3.js" should be inferred
     * to the 'angular-route' typing name.
     * @param fileNames are the names for source files in the project
     * @param safeList is the list of names that we are confident they are library names that requires typing
     */
    function getTypingNamesFromSourceFileNames(fileNames: string[], safeList: string[]) {
        safeList = safeList.map(s => s.toLowerCase());
        fileNames = fileNames.map(f => f.toLowerCase());
        let exactlyMatched: string[] = []
        let notExactlyMatched: string[] = []
        for (let fileName of fileNames) {
            let baseName = ts.getBaseFileName(fileName);
            let baseNameWithoutExtension = baseName.substring(0, baseName.lastIndexOf("."));
            (safeList.indexOf(baseNameWithoutExtension) >= 0) ? exactlyMatched.push(baseNameWithoutExtension) : notExactlyMatched.push(baseNameWithoutExtension);
        }

        let regex = /((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g;
        notExactlyMatched = notExactlyMatched.map(f => f.replace(regex, ""));
        let typingNames = exactlyMatched.concat(ts.filter(notExactlyMatched, f => ts.contains(safeList, f)));
        mergeTypings(typingNames);
    }

    /**
     * Infer typing names from node_module folder
     * @param nodeModulesPath is the path to the "node_modules" folder
     */
    function getTypingNamesFromNodeModuleFolder(nodeModulesPath: string) {
        // Todo: add support for ModuleResolutionHost too
        if (!_host.fileExists(nodeModulesPath)) {
            return;
        }

        let typingNames: string[] = [];
        let packageJsonFiles =
            _host.readDirectory(nodeModulesPath, /*extension*/undefined, /*exclude*/undefined, /*depth*/ 2).filter(f => ts.getBaseFileName(f) === "package.json");
        for (let packageJsonFile of packageJsonFiles) {
            let packageJsonContent = tryParseJson(_host.readFile(packageJsonFile));
            if (!packageJsonContent) { continue; }

            // npm 3 has the package.json contains a "_requiredBy" field
            // we should include all the top level module names for npm 2, and only module names whose
            // "_requiredBy" field starts with "#" or equals "/" for npm 3.
            if (packageJsonContent._requiredBy &&
                packageJsonContent._requiredBy.filter((r: string) => r[0] === "#" || r === "/").length === 0) {
                continue;
            }
            let packageName = packageJsonContent["name"];
            if (packageJsonContent.hasOwnProperty("typings")) {
                let absPath = ts.getNormalizedAbsolutePath(packageJsonContent.typings, ts.getDirectoryPath(packageJsonFile));
                inferredTypings[packageName] = absPath;
            }
            else {
                typingNames.push(packageName);
            }
        }
        mergeTypings(typingNames);
    }

    function getTypingNamesFromCompilerOptions(options: CompilerOptions) {
        let typingNames: string[] = [];
        if (options && options.jsx === JsxEmit.React) {
            typingNames.push("react");
        }
        mergeTypings(typingNames);
    }

    /**
     * Updates the tsd.json cache's "notFound" custom property. This property is used to determine if an attempt has already been
     * made to resolve a particular typing. Also updates typings.json, a project scope configuration file that can be used
     * to turn off the typing auto-acquisition feature, verify the list of typings that are being auto-referenced and exclude
     * typings from this list.
     * @param cachedTypingsPaths The list of resolved cached d.ts paths
     * @param newTypings The list of new typings that the host attempted to acquire using TSD
     * @param cachePath The path to the local tsd.json cache
     * @param typingsConfigPath The path to the project's typings.json
     */
    export function updateTypingsConfig(
        host: HostType, cachedTypingsPaths: string[], newTypings: string[], cachePath: string, typingsConfigPath: string): void {
        let tsdJsonCacheInfo = tryGetTsdJsonCacheInfo(host, cachePath);
        if (tsdJsonCacheInfo) {
            let notFound: string[] = [];
            let cacheTsdJsonDict = tsdJsonCacheInfo.value;
            if (cacheTsdJsonDict.hasOwnProperty("installed")) {
                let installedTypings = Object.keys(cacheTsdJsonDict.installed);
                notFound = ts.filter(newTypings, i => !isInstalled(i, installedTypings));
            }
            if (cacheTsdJsonDict.hasOwnProperty("notFound")) {
                notFound = cacheTsdJsonDict["notFound"].concat(notFound);
            }
            if (notFound.length > 0) {
                cacheTsdJsonDict["notFound"] = notFound;
                host.writeFile(tsdJsonCacheInfo.path, JSON.stringify(cacheTsdJsonDict));
            }
        }
    }

    function tryGetTsdJsonCacheInfo(host: HostType, cachePath: string): TsdJsonCacheInfo {
        let cacheTsdJsonPath = ts.combinePaths(ts.normalizePath(cachePath), "tsd.json");
        if (host.fileExists(cacheTsdJsonPath)) {
            let value = tryParseJson(host.readFile(cacheTsdJsonPath));
            if (value) {
                return { path: cacheTsdJsonPath, value };
            }
        }
        return undefined;
    }

    function isInstalled(typing: string, installedKeys: string[]) {
        for (let key of installedKeys) {
            if (key.indexOf(typing + '/') === 0) {
                return true;
            }
        }
        return false;
    }
}
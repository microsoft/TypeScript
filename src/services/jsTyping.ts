// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

/* @internal */
namespace ts.JsTyping {
    interface TsdJsonCacheInfo {
        path: string;
        value: any;
    }

    export function discoverTypings(
        host: TypeDefinitionResolutionHost | System, fileNames: string[], cachePath: string, compilerOptions?: CompilerOptions, safeList?: string[], noDevDependencies?: boolean)
        : { cachedTypingPaths: string[], newTypings: string[] } {
        let searchDirs: string[] = [];
        let typingNames: string[] = [];
        let cachedTypingPaths: string[] = [];
        let cachedTypingNames: string[] = [];

        for (let fileName of fileNames) {
            let dir = ts.getDirectoryPath(ts.normalizePath(fileName));
            if (searchDirs.indexOf(dir) < 0) {
                searchDirs.push(dir);
            }
        }

        for (let searchDir of searchDirs) {
            let packageJsonPath = ts.combinePaths(searchDir, "package.json");
            if (host.fileExists(packageJsonPath)) {
                let packageJsonDict = JSON.parse(host.readFile(packageJsonPath));
                if (packageJsonDict.hasOwnProperty("dependencies")) {
                    typingNames = typingNames.concat(Object.keys(packageJsonDict.dependencies));
                }
            }
        }
        
        let normalizedCachePath = ts.normalizePath(cachePath);
        let typingsPath = ts.combinePaths(normalizedCachePath, "typings");
        let tsdJsonCacheInfo = tryGetTsdJsonCacheInfo(host, cachePath);
        if (tsdJsonCacheInfo) {
            let cacheTsdJsonDict = tsdJsonCacheInfo.value;
            if (cacheTsdJsonDict.hasOwnProperty("notFound")) {
                let notFound = cacheTsdJsonDict["notFound"];
                typingNames = ts.filter(typingNames, i => notFound.indexOf(i) < 0);
            }
            if (cacheTsdJsonDict.hasOwnProperty("installed")) {
                for (let cachedTypingPath of Object.keys(cacheTsdJsonDict.installed)) {
                    let cachedTypingName = cachedTypingPath.substr(0, cachedTypingPath.indexOf('/'));
                    if (typingNames.indexOf(cachedTypingName) >= 0) {
                        cachedTypingNames.push(cachedTypingName);
                        cachedTypingPaths.push(ts.combinePaths(typingsPath, cachedTypingPath));
                    }
                }
            }
        }
        
        let newTypingNames = ts.filter(typingNames, t => cachedTypingNames.indexOf(t) < 0);
        return { cachedTypingPaths, newTypings: newTypingNames };
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
        host: TypeDefinitionResolutionHost | System, cachedTypingsPaths: string[], newTypings: string[], cachePath: string, typingsConfigPath: string): void {
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

    function tryGetTsdJsonCacheInfo(host: TypeDefinitionResolutionHost | System, cachePath: string): TsdJsonCacheInfo {
        let cacheTsdJsonPath = ts.combinePaths(ts.normalizePath(cachePath), "tsd.json");
        if (host.fileExists(cacheTsdJsonPath)) {
            return { path: cacheTsdJsonPath, value: JSON.parse(host.readFile(cacheTsdJsonPath)) };
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
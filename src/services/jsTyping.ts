// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

/* @internal */
namespace ts.JsTyping {
    export function discoverTypings(
        host: ModuleResolutionHost | System, fileNames: string[], compilerOptions?: CompilerOptions, safeList?: string[], noDevDependencies?: boolean)
        : { cachedTypingPaths: string[], newTypings: string[] } {
        let searchDirs: string[] = [];
        let typingNames: string[] = [];
        let cachedTypingPaths: string[] = [];
        let cachedTypingNames: string[] = [];
        
        for (let fileName of fileNames) {
            let dir = ts.getDirectoryPath(fileName);
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
        
        let cachePath = "C:/Users/lizhe/.typingCache";
        let typingsPath = "C:/Users/lizhe/.typingCache/typings";
        let cacheTsdJsonPath = ts.combinePaths(cachePath, "tsd.json");
        if (host.fileExists(cacheTsdJsonPath)) {
            let cacheTsdJsonDict = JSON.parse(host.readFile(cacheTsdJsonPath));
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
        
        let newTypingNames = typingNames.filter(t => cachedTypingNames.indexOf(t) < 0);
        
        return { cachedTypingPaths, newTypings: newTypingNames };
    }
}
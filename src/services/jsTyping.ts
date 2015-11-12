// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

/* @internal */
namespace ts.JsTyping {
    var _host: ModuleResolutionHost | System;
    /**
     * @param cachePath is the path to the cache location, which contains a tsd.json file and a typings folder
     */
    export function discoverTypings(
        host: ModuleResolutionHost | System, fileNames: string[], cachePath: string, compilerOptions?: CompilerOptions, safeList?: string[], noDevDependencies?: boolean)
        : { cachedTypingPaths: string[], newTypings: string[] } {
        _host = host
        // Directories to search for package.json, bower.json and other typing information
        let searchDirs: string[] = [];
        // Names of the typing package. For example, "angular", "underscore" etc.
        let typingNames: string[] = [];
        // Absolute paths of locally cached typing files. For example, "C:/Users/xxx/.typingCache/typings/angularjs/angular.d.ts"
        let cachedTypingPaths: string[] = [];
        // Package names of the locally cached typing files. For example, "angular", "underscore"
        let cachedTypingNames: string[] = [];
        
        for (let fileName of fileNames) {
            let dir = ts.getDirectoryPath(ts.normalizePath(fileName));
            if (searchDirs.indexOf(dir) < 0) {
                searchDirs.push(dir);
            }
        }
        
        for (let searchDir of searchDirs) {
            let packageJsonPath = ts.combinePaths(searchDir, "package.json");
            let bowerJsonPath = ts.combinePaths(searchDir, "bower.json");
            typingNames = typingNames
                .concat(getTypingNamesFromPackageJson(packageJsonPath))
                .concat(getTypingNamesFromBowerJson(bowerJsonPath));
        }
        
        let typingNamesFromSourceFileNames = getTypingNamesFromSourceFileNames(fileNames, ["react", "jquery"]);
        typingNames = typingNames.concat(typingNamesFromSourceFileNames);

        let normalizedCachePath = ts.normalizePath(cachePath);
        let typingsPath = ts.combinePaths(normalizedCachePath, "typings");
        let cacheTsdJsonPath = ts.combinePaths(normalizedCachePath, "tsd.json");
        if (host.fileExists(cacheTsdJsonPath)) {
            try{
                let cacheTsdJsonDict = JSON.parse(host.readFile(cacheTsdJsonPath));
                // The "installed" property in the tsd.json servers as a registry of installed typings. Each item 
                // of this object has a key of the relative file path, and a value that contains the corresponding
                // commit hash.
                if (cacheTsdJsonDict.hasOwnProperty("installed")) {
                    for (let cachedTypingPath of Object.keys(cacheTsdJsonDict.installed)) {
                        // Assuming the cachedTypingPath has the format of "[package name]/[file name]"
                        // Todo: sometimes the package names may not match exactly. For example, in package.json angular
                        // is written as "angular", however the resolved typing is "angularjs/..", therefore it would never
                        // match cached version
                        let cachedTypingName = cachedTypingPath.substr(0, cachedTypingPath.indexOf('/'));
                        if (typingNames.indexOf(cachedTypingName) >= 0) {
                            cachedTypingNames.push(cachedTypingName);
                            cachedTypingPaths.push(ts.combinePaths(typingsPath, cachedTypingPath));
                        }
                    }
                }
            }
            catch(e) { }
        }
        
        let newTypingNames = typingNames.filter(t => cachedTypingNames.indexOf(t) < 0);
        
        return { cachedTypingPaths, newTypings: newTypingNames };
    }
    
    function getTypingNamesFromPackageJson(packageJsonPath: string): string[] {
        let res: string[] = [];
        if (_host.fileExists(packageJsonPath)) {
            // Guide against malformed package.json
            try{
                let packageJsonDict = JSON.parse(_host.readFile(packageJsonPath));
                if (packageJsonDict.hasOwnProperty("dependencies")) {
                    res = Object.keys(packageJsonDict.dependencies);
                }
            }
            catch(e) {
            }
        }
        return res;
    }
    
    function getTypingNamesFromBowerJson(bowerJsonPath: string): string[] {
        let res: string[] = [];
        if (_host.fileExists(bowerJsonPath)) {
            // Guide against malformed package.json
            try{
                let packageJsonDict = JSON.parse(_host.readFile(bowerJsonPath));
                if (packageJsonDict.hasOwnProperty("dependencies")) {
                    res = Object.keys(packageJsonDict.dependencies);
                }
            }
            catch(e) {
            }
        }
        return res;
    }
    
    function getTypingNamesFromSourceFileNames(fileNames: string[], safeList: string[]): string[] {
        safeList = safeList.map(s => s.toLowerCase());
        fileNames = fileNames.map(f => f.toLowerCase());
        let exactlyMatched: string[] = []
        let notExactlyMatched: string[] = []
        for (let fileName of fileNames) {
            let baseName = ts.getBaseFileName(fileName);
            let baseNameWithoutExtension = baseName.substring(0, baseName.lastIndexOf("."));
            (safeList.indexOf(baseNameWithoutExtension) >= 0) ? exactlyMatched.push(baseNameWithoutExtension) : notExactlyMatched.push(baseNameWithoutExtension);
        }
        
        let regex = /((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g
        notExactlyMatched = notExactlyMatched.map(f => f.replace(regex, ""));
        return exactlyMatched.concat(notExactlyMatched.filter(f => ts.contains(safeList, f)));
    }
    
    function getTypingNamesFromNodeModuleFolder(fileNames: string[]): string[] {
        // Todo: implement this
        return [];
    }
    
    
}
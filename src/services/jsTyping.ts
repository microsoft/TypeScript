// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

/* @internal */
namespace ts.JsTyping {

    type HostType = {
        fileExists: (fileName: string) => boolean;
        readFile: (path: string, encoding?: string) => string;
        readDirectory: (path: string, extension?: string, exclude?: string[], depth?: number) => string[]; 
    };
    
    var _host: HostType;
    
    // a typing name to typing file path mapping
    var inferredTypings: Map<string> = {};
    
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
            getTypingNamesFromPackageJson(packageJsonPath);

            let bowerJsonPath = ts.combinePaths(searchDir, "bower.json");
            getTypingNamesFromBowerJson(bowerJsonPath);
            
            let nodeModulesPath = ts.combinePaths(searchDir, "node_modules");
            getTypingNamesFromNodeModuleFolder(nodeModulesPath);
        }
        
        // Todo: use a real safe list
        getTypingNamesFromSourceFileNames(fileNames, ["react", "jquery"]);
        getTypingNamesFromCompilerOptions(compilerOptions);

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
                        if (inferredTypings.hasOwnProperty(cachedTypingName) && !inferredTypings[cachedTypingName]) {
                            inferredTypings[cachedTypingName] = ts.combinePaths(typingsPath, cachedTypingPath);
                        }
                    }
                }
            }
            catch(e) { }
        }
        
        let newTypingNames: string[] = [];
        let cachedTypingPaths: string[] = [];
        for (let typing in inferredTypings) {
            if(inferredTypings[typing]) {
                cachedTypingPaths.push(inferredTypings[typing]);
            }
            else {
                newTypingNames.push(typing);
            }
        }
        
        return { cachedTypingPaths, newTypingNames };
    }
    
    function mergeTypings(typingNames: string[]) {
        for (let typing of typingNames) {
            if (!inferredTypings.hasOwnProperty(typing)) {
                inferredTypings[typing] = undefined;
            }
        }
    }

    function getTypingNamesFromPackageJson(packageJsonPath: string) {
        if (_host.fileExists(packageJsonPath)) {
            // Guide against malformed package.json
            try{
                let packageJsonDict = JSON.parse(_host.readFile(packageJsonPath));
                if (packageJsonDict.hasOwnProperty("dependencies")) {
                    mergeTypings(Object.keys(packageJsonDict.dependencies));
                }
            }
            catch(e) {
            }
        }
    }

    function getTypingNamesFromBowerJson(bowerJsonPath: string) {
        if (_host.fileExists(bowerJsonPath)) {
            // Guide against malformed package.json
            try{
                let packageJsonDict = JSON.parse(_host.readFile(bowerJsonPath));
                if (packageJsonDict.hasOwnProperty("dependencies")) {
                    mergeTypings(Object.keys(packageJsonDict.dependencies));
                }
            }
            catch(e) {
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
        let typingNames = exactlyMatched.concat(notExactlyMatched.filter(f => ts.contains(safeList, f)));
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
            let packageJsonContent = JSON.parse(_host.readFile(packageJsonFile));
            // npm 3 has the package.json contains a "_requiredBy" field
            // we should include all the top level module names for npm 2, and only module names whose
            // "_requiredBy" field starts with "#" or equals "/" for npm 3.
            if (packageJsonContent._requiredBy &&
                packageJsonContent._requiredBy.filter((r: string) => r[0] === "#" || r === "/").length == 0) {
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
}
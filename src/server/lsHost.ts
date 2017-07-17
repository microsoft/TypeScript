/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="scriptInfo.ts" />

namespace ts.server {
    export class CachedServerHost implements ServerHost {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;

        readonly trace: (s: string) => void;
        readonly realpath?: (path: string) => string;

        private cachedReadDirectoryResult = createMap<FileSystemEntries>();
        private readonly currentDirectory: string;

        constructor(private readonly host: ServerHost, private getCanonicalFileName: (fileName: string) => string) {
            this.args = host.args;
            this.newLine = host.newLine;
            this.useCaseSensitiveFileNames = host.useCaseSensitiveFileNames;
            if (host.trace) {
                this.trace = s => host.trace(s);
            }
            if (this.host.realpath) {
                this.realpath = path => this.host.realpath(path);
            }
            this.currentDirectory = this.host.getCurrentDirectory();
        }

        private toPath(fileName: string) {
            return toPath(fileName, this.currentDirectory, this.getCanonicalFileName);
        }

        private getFileSystemEntries(rootDir: string) {
            const path = this.toPath(rootDir);
            const cachedResult = this.cachedReadDirectoryResult.get(path);
            if (cachedResult) {
                return cachedResult;
            }

            const resultFromHost: FileSystemEntries = {
                files: this.host.readDirectory(rootDir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/["*.*"]) || [],
                directories: this.host.getDirectories(rootDir) || []
            };

            this.cachedReadDirectoryResult.set(path, resultFromHost);
            return resultFromHost;
        }

        private canWorkWithCacheForDir(rootDir: string) {
            // Some of the hosts might not be able to handle read directory or getDirectories
            const path = this.toPath(rootDir);
            if (this.cachedReadDirectoryResult.get(path)) {
                return true;
            }
            try {
                return this.getFileSystemEntries(rootDir);
            }
            catch (_e) {
                return false;
            }
        }

        write(s: string) {
            return this.host.write(s);
        }

        writeFile(fileName: string, data: string, writeByteOrderMark?: boolean) {
            const path = this.toPath(fileName);
            const result = this.cachedReadDirectoryResult.get(getDirectoryPath(path));
            const baseFileName = getBaseFileName(toNormalizedPath(fileName));
            if (result) {
                result.files = this.updateFileSystemEntry(result.files, baseFileName, /*isValid*/ true);
            }
            return this.host.writeFile(fileName, data, writeByteOrderMark);
        }

        resolvePath(path: string) {
            return this.host.resolvePath(path);
        }

        createDirectory(path: string) {
            Debug.fail(`Why is createDirectory called on the cached server for ${path}`);
        }

        getExecutingFilePath() {
            return this.host.getExecutingFilePath();
        }

        getCurrentDirectory() {
            return this.currentDirectory;
        }

        exit(exitCode?: number) {
            Debug.fail(`Why is exit called on the cached server: ${exitCode}`);
        }

        getEnvironmentVariable(name: string) {
            Debug.fail(`Why is getEnvironmentVariable called on the cached server: ${name}`);
            return this.host.getEnvironmentVariable(name);
        }

        getDirectories(rootDir: string) {
            if (this.canWorkWithCacheForDir(rootDir)) {
                return this.getFileSystemEntries(rootDir).directories.slice();
            }
            return this.host.getDirectories(rootDir);
        }

        readDirectory(rootDir: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            if (this.canWorkWithCacheForDir(rootDir)) {
                return matchFiles(rootDir, extensions, excludes, includes, this.useCaseSensitiveFileNames, this.currentDirectory, depth, path => this.getFileSystemEntries(path));
            }
            return this.host.readDirectory(rootDir, extensions, excludes, includes, depth);
        }

        fileExists(fileName: string): boolean {
            const path = this.toPath(fileName);
            const result = this.cachedReadDirectoryResult.get(getDirectoryPath(path));
            const baseName = getBaseFileName(toNormalizedPath(fileName));
            return (result && this.hasEntry(result.files, baseName)) || this.host.fileExists(fileName);
        }

        directoryExists(dirPath: string) {
            const path = this.toPath(dirPath);
            return this.cachedReadDirectoryResult.has(path) || this.host.directoryExists(dirPath);
        }

        readFile(path: string, encoding?: string): string {
            return this.host.readFile(path, encoding);
        }

        private fileNameEqual(name1: string, name2: string) {
            return this.getCanonicalFileName(name1) === this.getCanonicalFileName(name2);
        }

        private hasEntry(entries: ReadonlyArray<string>, name: string) {
            return some(entries, file => this.fileNameEqual(file, name));
        }

        private updateFileSystemEntry(entries: ReadonlyArray<string>, baseName: string, isValid: boolean) {
            if (this.hasEntry(entries, baseName)) {
                if (!isValid) {
                    return filter(entries, entry => !this.fileNameEqual(entry, baseName));
                }
            }
            else if (isValid) {
                return entries.concat(baseName);
            }
            return entries;
        }

        addOrDeleteFileOrFolder(fileOrFolder: NormalizedPath) {
            const path = this.toPath(fileOrFolder);
            const existingResult = this.cachedReadDirectoryResult.get(path);
            if (existingResult) {
                if (!this.host.directoryExists(fileOrFolder)) {
                    this.cachedReadDirectoryResult.delete(path);
                }
            }
            else {
                // Was this earlier file
                const parentResult = this.cachedReadDirectoryResult.get(getDirectoryPath(path));
                if (parentResult) {
                    const baseName = getBaseFileName(fileOrFolder);
                    if (parentResult) {
                        parentResult.files = this.updateFileSystemEntry(parentResult.files, baseName, this.host.fileExists(path));
                        parentResult.directories = this.updateFileSystemEntry(parentResult.directories, baseName, this.host.directoryExists(path));
                    }
                }
            }
        }

        clearCache() {
            this.cachedReadDirectoryResult = createMap<FileSystemEntries>();
        }

        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
            return this.host.setTimeout(callback, ms, ...args);
        }
        clearTimeout(timeoutId: any)  {
            return this.host.clearTimeout(timeoutId);
        }
        setImmediate(callback: (...args: any[]) => void, ...args: any[]) {
            this.host.setImmediate(callback, ...args);
        }
        clearImmediate(timeoutId: any) {
            this.host.clearImmediate(timeoutId);
        }

    }

    type NameResolutionWithFailedLookupLocations = { failedLookupLocations: string[], isInvalidated?: boolean };
    export class LSHost implements LanguageServiceHost, ModuleResolutionHost {
        private compilationSettings: CompilerOptions;
        private readonly resolvedModuleNames = createMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        private readonly resolvedTypeReferenceDirectives = createMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();

        private filesWithChangedSetOfUnresolvedImports: Path[];

        private resolveModuleName: typeof resolveModuleName;
        readonly trace: (s: string) => void;
        readonly realpath?: (path: string) => string;
        /**
         * This is the host that is associated with the project. This is normally same as projectService's host
         * except in Configured projects where it is CachedServerHost so that we can cache the results of the
         * file system entries as we would anyways be watching files in the project (so safe to cache)
         */
        /*@internal*/
        host: ServerHost;

        constructor(host: ServerHost, private project: Project, private readonly cancellationToken: HostCancellationToken) {
            this.host = host;
            this.cancellationToken = new ThrottledCancellationToken(cancellationToken, project.projectService.throttleWaitMilliseconds);

            if (host.trace) {
                this.trace = s => host.trace(s);
            }

            this.resolveModuleName = (moduleName, containingFile, compilerOptions, host) => {
                const globalCache = this.project.getTypeAcquisition().enable
                    ? this.project.projectService.typingsInstaller.globalTypingsCacheLocation
                    : undefined;
                const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host);
                // return result immediately only if it is .ts, .tsx or .d.ts
                if (!isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTypeScript(primaryResult.resolvedModule.extension)) && globalCache !== undefined) {
                    // otherwise try to load typings from @types

                    // create different collection of failed lookup locations for second pass
                    // if it will fail and we've already found something during the first pass - we don't want to pollute its results
                    const { resolvedModule, failedLookupLocations } = loadModuleFromGlobalCache(moduleName, this.project.getProjectName(), compilerOptions, host, globalCache);
                    if (resolvedModule) {
                        return { resolvedModule, failedLookupLocations: primaryResult.failedLookupLocations.concat(failedLookupLocations) };
                    }
                }
                return primaryResult;
            };

            if (this.host.realpath) {
                this.realpath = path => this.host.realpath(path);
            }
        }

        dispose() {
            this.project = undefined;
            this.resolveModuleName = undefined;
            this.host = undefined;
        }

        public startRecordingFilesWithChangedResolutions() {
            this.filesWithChangedSetOfUnresolvedImports = [];
        }

        public finishRecordingFilesWithChangedResolutions() {
            const collected = this.filesWithChangedSetOfUnresolvedImports;
            this.filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        private resolveNamesWithLocalCache<T extends NameResolutionWithFailedLookupLocations, R>(
            names: string[],
            containingFile: string,
            cache: Map<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined,
            logChanges: boolean): R[] {

            const path = this.project.projectService.toPath(containingFile);
            const currentResolutionsInFile = cache.get(path);

            const newResolutions: Map<T> = createMap<T>();
            const resolvedModules: R[] = [];
            const compilerOptions = this.getCompilationSettings();

            for (const name of names) {
                // check if this is a duplicate entry in the list
                let resolution = newResolutions.get(name);
                if (!resolution) {
                    const existingResolution = currentResolutionsInFile && currentResolutionsInFile.get(name);
                    if (moduleResolutionIsValid(existingResolution)) {
                        // ok, it is safe to use existing name resolution results
                        resolution = existingResolution;
                    }
                    else {
                        resolution = loader(name, containingFile, compilerOptions, this);
                        newResolutions.set(name, resolution);
                    }
                    if (logChanges && this.filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        this.filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }

                Debug.assert(resolution !== undefined);

                resolvedModules.push(getResult(resolution));
            }

            // replace old results with a new one
            cache.set(path, newResolutions);
            return resolvedModules;

            function resolutionIsEqualTo(oldResolution: T, newResolution: T): boolean {
                if (oldResolution === newResolution) {
                    return true;
                }
                if (!oldResolution || !newResolution || oldResolution.isInvalidated) {
                    return false;
                }
                const oldResult = getResult(oldResolution);
                const newResult = getResult(newResolution);
                if (oldResult === newResult) {
                    return true;
                }
                if (!oldResult || !newResult) {
                    return false;
                }
                return getResultFileName(oldResult) === getResultFileName(newResult);
            }

            function moduleResolutionIsValid(resolution: T): boolean {
                if (!resolution || resolution.isInvalidated) {
                    return false;
                }

                const result = getResult(resolution);
                if (result) {
                    return true;
                }

                // consider situation if we have no candidate locations as valid resolution.
                // after all there is no point to invalidate it if we have no idea where to look for the module.
                return resolution.failedLookupLocations.length === 0;
            }
        }

        getNewLine() {
            return this.host.newLine;
        }

        getProjectVersion() {
            return this.project.getProjectVersion();
        }

        getCompilationSettings() {
            return this.compilationSettings;
        }

        useCaseSensitiveFileNames() {
            return this.host.useCaseSensitiveFileNames;
        }

        getCancellationToken() {
            return this.cancellationToken;
        }

        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return this.resolveNamesWithLocalCache(typeDirectiveNames, containingFile, this.resolvedTypeReferenceDirectives, resolveTypeReferenceDirective,
                m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName,  /*logChanges*/ false);
        }

        resolveModuleNames(moduleNames: string[], containingFile: string): ResolvedModuleFull[] {
            return this.resolveNamesWithLocalCache(moduleNames, containingFile, this.resolvedModuleNames, this.resolveModuleName,
                m => m.resolvedModule, r => r.resolvedFileName, /*logChanges*/ true);
        }

        getDefaultLibFileName() {
            const nodeModuleBinDir = getDirectoryPath(normalizePath(this.host.getExecutingFilePath()));
            return combinePaths(nodeModuleBinDir, getDefaultLibFileName(this.compilationSettings));
        }

        getScriptSnapshot(filename: string): IScriptSnapshot {
            const scriptInfo = this.project.getScriptInfoLSHost(filename);
            if (scriptInfo) {
                return scriptInfo.getSnapshot();
            }
        }

        getScriptFileNames() {
            return this.project.getRootFilesLSHost();
        }

        getTypeRootsVersion() {
            return this.project.typesVersion;
        }

        getScriptKind(fileName: string) {
            const info = this.project.getScriptInfoLSHost(fileName);
            return info && info.scriptKind;
        }

        getScriptVersion(filename: string) {
            const info = this.project.getScriptInfoLSHost(filename);
            return info && info.getLatestVersion();
        }

        getCurrentDirectory(): string {
            return this.host.getCurrentDirectory();
        }

        resolvePath(path: string): string {
            return this.host.resolvePath(path);
        }

        fileExists(file: string): boolean {
            // As an optimization, don't hit the disks for files we already know don't exist
            // (because we're watching for their creation).
            const path = this.project.projectService.toPath(file);
            return !this.project.isWatchedMissingFile(path) && this.host.fileExists(file);
        }

        readFile(fileName: string): string | undefined {
            return this.host.readFile(fileName);
        }

        directoryExists(path: string): boolean {
            return this.host.directoryExists(path);
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return this.host.readDirectory(path, extensions, exclude, include, depth);
        }

        getDirectories(path: string): string[] {
            return this.host.getDirectories(path);
        }

        notifyFileRemoved(info: ScriptInfo) {
            this.invalidateResolutionOfDeletedFile(info, this.resolvedModuleNames,
                m => m.resolvedModule, r => r.resolvedFileName);
            this.invalidateResolutionOfDeletedFile(info, this.resolvedTypeReferenceDirectives,
                m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName);
        }

        private invalidateResolutionOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R>(
            deletedInfo: ScriptInfo,
            cache: Map<Map<T>>,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined) {
            cache.forEach((value, path) => {
                if (path === deletedInfo.path) {
                    cache.delete(path);
                }
                else if (value) {
                    value.forEach((resolution) => {
                        if (resolution && !resolution.isInvalidated) {
                            const result = getResult(resolution);
                            if (result) {
                                if (getResultFileName(result) === deletedInfo.path) {
                                    resolution.isInvalidated = true;
                                }
                            }
                        }
                    });
                }
            });
        }

        setCompilationSettings(opt: CompilerOptions) {
            if (changesAffectModuleResolution(this.compilationSettings, opt)) {
                this.resolvedModuleNames.clear();
                this.resolvedTypeReferenceDirectives.clear();
            }
            this.compilationSettings = opt;
        }
    }
}

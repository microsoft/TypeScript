/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="scriptInfo.ts" />

namespace ts.server {
    export class LSHost implements ts.LanguageServiceHost, ModuleResolutionHost, ServerLanguageServiceHost {
        private compilationSettings: ts.CompilerOptions;
        private readonly resolvedModuleNames: ts.FileMap<Map<ResolvedModuleWithFailedLookupLocations>>;
        private readonly resolvedTypeReferenceDirectives: ts.FileMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
        private readonly getCanonicalFileName: (fileName: string) => string;

        private filesWithChangedSetOfUnresolvedImports: Path[];

        private readonly resolveModuleName: typeof resolveModuleName;
        readonly trace: (s: string) => void;

        constructor(private readonly host: ServerHost, private readonly project: Project, private readonly cancellationToken: HostCancellationToken) {
            this.getCanonicalFileName = ts.createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);
            this.resolvedModuleNames = createFileMap<Map<ResolvedModuleWithFailedLookupLocations>>();
            this.resolvedTypeReferenceDirectives = createFileMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();

            if (host.trace) {
                this.trace = s => host.trace(s);
            }

            this.resolveModuleName = (moduleName, containingFile, compilerOptions, host) => {
                const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host);
                if (primaryResult.resolvedModule) {
                    // return result immediately only if it is .ts, .tsx or .d.ts
                    // otherwise try to load typings from @types
                    if (fileExtensionIsAny(primaryResult.resolvedModule.resolvedFileName, supportedTypeScriptExtensions)) {
                        return primaryResult;
                    }
                }
                // create different collection of failed lookup locations for second pass
                // if it will fail and we've already found something during the first pass - we don't want to pollute its results 
                const secondaryLookupFailedLookupLocations: string[] = [];
                const globalCache = this.project.projectService.typingsInstaller.globalTypingsCacheLocation;
                if (this.project.getTypingOptions().enableAutoDiscovery && globalCache) {
                    const traceEnabled = isTraceEnabled(compilerOptions, host);
                    if (traceEnabled) {
                        trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, this.project.getProjectName(), moduleName, globalCache);
                    }
                    const state: ModuleResolutionState = { compilerOptions, host, skipTsx: false, traceEnabled };
                    const resolvedName = loadModuleFromNodeModules(moduleName, globalCache, secondaryLookupFailedLookupLocations, state, /*checkOneLevel*/ true);
                    if (resolvedName) {
                        return createResolvedModule(resolvedName, /*isExternalLibraryImport*/ true, primaryResult.failedLookupLocations.concat(secondaryLookupFailedLookupLocations));
                    }
                }
                if (!primaryResult.resolvedModule && secondaryLookupFailedLookupLocations.length) {
                    primaryResult.failedLookupLocations = primaryResult.failedLookupLocations.concat(secondaryLookupFailedLookupLocations);
                }
                return primaryResult;
            };
        }

        public startRecordingFilesWithChangedResolutions() {
            this.filesWithChangedSetOfUnresolvedImports = [];
        }

        public finishRecordingFilesWithChangedResolutions() {
            const collected = this.filesWithChangedSetOfUnresolvedImports;
            this.filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        private resolveNamesWithLocalCache<T extends { failedLookupLocations: string[] }, R extends { resolvedFileName?: string }>(
            names: string[],
            containingFile: string,
            cache: ts.FileMap<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R,
            logChanges: boolean): R[] {

            const path = toPath(containingFile, this.host.getCurrentDirectory(), this.getCanonicalFileName);
            const currentResolutionsInFile = cache.get(path);

            const newResolutions: Map<T> = createMap<T>();
            const resolvedModules: R[] = [];
            const compilerOptions = this.getCompilationSettings();
            const lastDeletedFileName = this.project.projectService.lastDeletedFile && this.project.projectService.lastDeletedFile.fileName;

            for (const name of names) {
                // check if this is a duplicate entry in the list
                let resolution = newResolutions[name];
                if (!resolution) {
                    const existingResolution = currentResolutionsInFile && currentResolutionsInFile[name];
                    if (moduleResolutionIsValid(existingResolution)) {
                        // ok, it is safe to use existing name resolution results
                        resolution = existingResolution;
                    }
                    else {
                        newResolutions[name] = resolution = loader(name, containingFile, compilerOptions, this);
                    }
                    if (logChanges && this.filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        this.filesWithChangedSetOfUnresolvedImports.push(path);
                        // reset log changes to avoid recording the same file multiple times
                        logChanges = false;
                    }
                }

                ts.Debug.assert(resolution !== undefined);

                resolvedModules.push(getResult(resolution));
            }

            // replace old results with a new one
            cache.set(path, newResolutions);
            return resolvedModules;

            function resolutionIsEqualTo(oldResolution: T, newResolution: T): boolean {
                if (oldResolution === newResolution) {
                    return true;
                }
                if (!oldResolution || !newResolution) {
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
                return oldResult.resolvedFileName === newResult.resolvedFileName;
            }

            function moduleResolutionIsValid(resolution: T): boolean {
                if (!resolution) {
                    return false;
                }

                const result = getResult(resolution);
                if (result) {
                    if (result.resolvedFileName && result.resolvedFileName === lastDeletedFileName) {
                        return false;
                    }
                    return true;
                }

                // consider situation if we have no candidate locations as valid resolution.
                // after all there is no point to invalidate it if we have no idea where to look for the module.
                return resolution.failedLookupLocations.length === 0;
            }
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
            return this.resolveNamesWithLocalCache(typeDirectiveNames, containingFile, this.resolvedTypeReferenceDirectives, resolveTypeReferenceDirective, m => m.resolvedTypeReferenceDirective, /*logChanges*/ false);
        }

        resolveModuleNames(moduleNames: string[], containingFile: string): ResolvedModule[] {
            return this.resolveNamesWithLocalCache(moduleNames, containingFile, this.resolvedModuleNames, this.resolveModuleName, m => m.resolvedModule, /*logChanges*/ true);
        }

        getDefaultLibFileName() {
            const nodeModuleBinDir = getDirectoryPath(normalizePath(this.host.getExecutingFilePath()));
            return combinePaths(nodeModuleBinDir, getDefaultLibFileName(this.compilationSettings));
        }

        getScriptSnapshot(filename: string): ts.IScriptSnapshot {
            const scriptInfo = this.project.getScriptInfoLSHost(filename);
            if (scriptInfo) {
                return scriptInfo.snap();
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

        fileExists(path: string): boolean {
            return this.host.fileExists(path);
        }

        readFile(fileName: string): string {
            return this.host.readFile(fileName);
        }

        directoryExists(path: string): boolean {
            return this.host.directoryExists(path);
        }

        readDirectory(path: string, extensions?: string[], exclude?: string[], include?: string[]): string[] {
            return this.host.readDirectory(path, extensions, exclude, include);
        }

        getDirectories(path: string): string[] {
            return this.host.getDirectories(path);
        }

        notifyFileRemoved(info: ScriptInfo) {
            this.resolvedModuleNames.remove(info.path);
            this.resolvedTypeReferenceDirectives.remove(info.path);
        }

        setCompilationSettings(opt: ts.CompilerOptions) {
            if (changesAffectModuleResolution(this.compilationSettings, opt)) {
                this.resolvedModuleNames.clear();
                this.resolvedTypeReferenceDirectives.clear();
            }
            this.compilationSettings = opt;
        }
    }
}
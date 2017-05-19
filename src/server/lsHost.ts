/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="scriptInfo.ts" />

namespace ts.server {
    export class LSHost implements ts.LanguageServiceHost, ModuleResolutionHost {
        private compilationSettings: ts.CompilerOptions;
        private readonly resolvedModuleNames = createFileMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        private readonly resolvedTypeReferenceDirectives = createFileMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        private readonly getCanonicalFileName: (fileName: string) => string;

        private filesWithChangedSetOfUnresolvedImports: Path[];

        private readonly resolveModuleName: typeof resolveModuleName;
        readonly trace: (s: string) => void;
        readonly realpath?: (path: string) => string;

        constructor(private readonly host: ServerHost, private readonly project: Project, private readonly cancellationToken: HostCancellationToken) {
            this.cancellationToken = new ThrottledCancellationToken(cancellationToken, project.projectService.throttleWaitMilliseconds);
            this.getCanonicalFileName = ts.createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);

            if (host.trace) {
                this.trace = s => host.trace(s);
            }

            this.resolveModuleName = (moduleName, containingFile, compilerOptions, host) => {
                const globalCache = this.project.getTypeAcquisition().enable
                    ? this.project.projectService.typingsInstaller.globalTypingsCacheLocation
                    : undefined;
                const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host);
                // return result immediately only if it is .ts, .tsx or .d.ts
                if (moduleHasNonRelativeName(moduleName) && !(primaryResult.resolvedModule && extensionIsTypeScript(primaryResult.resolvedModule.extension)) && globalCache !== undefined) {
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

        public startRecordingFilesWithChangedResolutions() {
            this.filesWithChangedSetOfUnresolvedImports = [];
        }

        public finishRecordingFilesWithChangedResolutions() {
            const collected = this.filesWithChangedSetOfUnresolvedImports;
            this.filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        private resolveNamesWithLocalCache<T extends { failedLookupLocations: string[] }, R>(
            names: string[],
            containingFile: string,
            cache: ts.FileMap<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined,
            logChanges: boolean): R[] {

            const path = toPath(containingFile, this.host.getCurrentDirectory(), this.getCanonicalFileName);
            const currentResolutionsInFile = cache.get(path);

            const newResolutions: Map<T> = createMap<T>();
            const resolvedModules: R[] = [];
            const compilerOptions = this.getCompilationSettings();
            const lastDeletedFileName = this.project.projectService.lastDeletedFile && this.project.projectService.lastDeletedFile.fileName;

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
                return getResultFileName(oldResult) === getResultFileName(newResult);
            }

            function moduleResolutionIsValid(resolution: T): boolean {
                if (!resolution) {
                    return false;
                }

                const result = getResult(resolution);
                if (result) {
                    return getResultFileName(result) !== lastDeletedFileName;
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

        getScriptSnapshot(filename: string): ts.IScriptSnapshot {
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
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>

/*@internal*/
namespace ts {
    /** This is the cache of module/typedirectives resolution that can be retained across program */
    export interface ResolutionCache {
        setModuleResolutionHost(host: ModuleResolutionHost): void;

        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[];

        resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[];
        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];

        invalidateResolutionOfFile(filePath: Path): void;
        invalidateResolutionOfChangedFailedLookupLocation(failedLookupLocationPath: Path): void;

        createHasInvalidatedResolution(): HasInvalidatedResolution;

        clear(): void;
    }

    interface NameResolutionWithFailedLookupLocations {
        readonly failedLookupLocations: ReadonlyArray<string>;
        isInvalidated?: boolean;
    }

    interface FailedLookupLocationsWatcher {
        fileWatcher: FileWatcher;
        refCount: number;
    }

    export function createResolutionCache(
        toPath: (fileName: string) => Path,
        getCompilerOptions: () => CompilerOptions,
        watchForFailedLookupLocation: (failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) => FileWatcher,
        log: (s: string) => void,
        projectName?: string,
        getGlobalCache?: () => string | undefined): ResolutionCache {

        let host: ModuleResolutionHost;
        let filesWithChangedSetOfUnresolvedImports: Path[] | undefined;
        let filesWithInvalidatedResolutions: Map<true> | undefined;

        // The resolvedModuleNames and resolvedTypeReferenceDirectives are the cache of resolutions per file.
        // The key in the map is source file's path.
        // The values are Map of resolutions with key being name lookedup.
        const resolvedModuleNames = createMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        const resolvedTypeReferenceDirectives = createMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();

        const failedLookupLocationsWatches = createMap<FailedLookupLocationsWatcher>();

        return {
            setModuleResolutionHost,
            startRecordingFilesWithChangedResolutions,
            finishRecordingFilesWithChangedResolutions,
            resolveModuleNames,
            resolveTypeReferenceDirectives,
            invalidateResolutionOfFile,
            invalidateResolutionOfChangedFailedLookupLocation,
            createHasInvalidatedResolution,
            clear
        };

        function setModuleResolutionHost(updatedHost: ModuleResolutionHost) {
            host = updatedHost;
        }

        function clear() {
            // Close all the watches for failed lookup locations, irrespective of refcounts for them since this is to clear the cache
            clearMap(failedLookupLocationsWatches, (failedLookupLocationPath, failedLookupLocationWatcher) => {
                log(`Watcher: FailedLookupLocations: Status: ForceClose: LocationPath: ${failedLookupLocationPath}, refCount: ${failedLookupLocationWatcher.refCount}`);
                failedLookupLocationWatcher.fileWatcher.close();
            });
            resolvedModuleNames.clear();
            resolvedTypeReferenceDirectives.clear();
        }

        function startRecordingFilesWithChangedResolutions() {
            filesWithChangedSetOfUnresolvedImports = [];
        }

        function finishRecordingFilesWithChangedResolutions() {
            const collected = filesWithChangedSetOfUnresolvedImports;
            filesWithChangedSetOfUnresolvedImports = undefined;
            return collected;
        }

        function createHasInvalidatedResolution(): HasInvalidatedResolution {
            const collected = filesWithInvalidatedResolutions;
            filesWithInvalidatedResolutions = undefined;
            return path => collected && collected.has(path);
        }

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
            const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host);
            // return result immediately only if global cache support is not enabled or if it is .ts, .tsx or .d.ts
            if (!getGlobalCache) {
                return primaryResult;
            }

            // otherwise try to load typings from @types
            const globalCache = getGlobalCache();
            if (globalCache !== undefined && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTypeScript(primaryResult.resolvedModule.extension))) {
                // create different collection of failed lookup locations for second pass
                // if it will fail and we've already found something during the first pass - we don't want to pollute its results
                const { resolvedModule, failedLookupLocations } = loadModuleFromGlobalCache(moduleName, projectName, compilerOptions, host, globalCache);
                if (resolvedModule) {
                    return { resolvedModule, failedLookupLocations: addRange(primaryResult.failedLookupLocations as Array<string>, failedLookupLocations) };
                }
            }

            // Default return the result from the first pass
            return primaryResult;
        }

        function resolveNamesWithLocalCache<T extends NameResolutionWithFailedLookupLocations, R>(
            names: string[],
            containingFile: string,
            cache: Map<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined,
            logChanges: boolean): R[] {

            const path = toPath(containingFile);
            const currentResolutionsInFile = cache.get(path);

            const newResolutions: Map<T> = createMap<T>();
            const resolvedModules: R[] = [];
            const compilerOptions = getCompilerOptions();

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
                        resolution = loader(name, containingFile, compilerOptions, host);
                        updateFailedLookupLocationWatches(containingFile, name, existingResolution && existingResolution.failedLookupLocations, resolution.failedLookupLocations);
                    }
                    newResolutions.set(name, resolution);
                    if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                        filesWithChangedSetOfUnresolvedImports.push(path);
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

        function resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return resolveNamesWithLocalCache(typeDirectiveNames, containingFile, resolvedTypeReferenceDirectives, resolveTypeReferenceDirective,
                m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName,  /*logChanges*/ false);
        }

        function resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[] {
            return resolveNamesWithLocalCache(moduleNames, containingFile, resolvedModuleNames, resolveModuleName,
                m => m.resolvedModule, r => r.resolvedFileName, logChanges);
        }

        function watchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) {
            const failedLookupLocationWatcher = failedLookupLocationsWatches.get(failedLookupLocationPath);
            if (failedLookupLocationWatcher) {
                failedLookupLocationWatcher.refCount++;
                log(`Watcher: FailedLookupLocations: Status: Using existing watcher: Location: ${failedLookupLocation}, containingFile: ${containingFile}, name: ${name} refCount: ${failedLookupLocationWatcher.refCount}`);
            }
            else {
                log(`Watcher: FailedLookupLocations: Status: new watch: Location: ${failedLookupLocation}, containingFile: ${containingFile}, name: ${name}`);
                const fileWatcher = watchForFailedLookupLocation(failedLookupLocation, failedLookupLocationPath, containingFile, name);
                failedLookupLocationsWatches.set(failedLookupLocationPath, { fileWatcher, refCount: 1 });
            }
        }

        function closeFailedLookupLocationWatcher(failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) {
            const failedLookupLocationWatcher = failedLookupLocationsWatches.get(failedLookupLocationPath);
            Debug.assert(!!failedLookupLocationWatcher);
            failedLookupLocationWatcher.refCount--;
            if (failedLookupLocationWatcher.refCount) {
                log(`Watcher: FailedLookupLocations: Status: Removing existing watcher: Location: ${failedLookupLocation}, containingFile: ${containingFile}, name: ${name}: refCount: ${failedLookupLocationWatcher.refCount}`);
            }
            else {
                log(`Watcher: FailedLookupLocations: Status: Closing the file watcher: Location: ${failedLookupLocation}, containingFile: ${containingFile}, name: ${name}`);
                failedLookupLocationWatcher.fileWatcher.close();
                failedLookupLocationsWatches.delete(failedLookupLocationPath);
            }
        }

        type FailedLookupLocationAction = (failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) => void;
        function withFailedLookupLocations(failedLookupLocations: ReadonlyArray<string>, containingFile: string, name: string, fn: FailedLookupLocationAction) {
            forEach(failedLookupLocations, failedLookupLocation => {
                fn(failedLookupLocation, toPath(failedLookupLocation), containingFile, name);
            });
        }

        function updateFailedLookupLocationWatches(containingFile: string, name: string, existingFailedLookupLocations: ReadonlyArray<string> | undefined, failedLookupLocations: ReadonlyArray<string>) {
            // Watch all the failed lookup locations
            withFailedLookupLocations(failedLookupLocations, containingFile, name, watchFailedLookupLocation);

            // Close existing watches for the failed locations
            withFailedLookupLocations(existingFailedLookupLocations, containingFile, name, closeFailedLookupLocationWatcher);
        }

        function invalidateResolutionCacheOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R>(
            deletedFilePath: Path,
            cache: Map<Map<T>>,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined) {
            cache.forEach((value, path) => {
                if (path === deletedFilePath) {
                    cache.delete(path);
                    value.forEach((resolution, name) => {
                        withFailedLookupLocations(resolution.failedLookupLocations, path, name, closeFailedLookupLocationWatcher);
                    });
                }
                else if (value) {
                    value.forEach(resolution => {
                        if (resolution && !resolution.isInvalidated) {
                            const result = getResult(resolution);
                            if (result) {
                                if (toPath(getResultFileName(result)) === deletedFilePath) {
                                    resolution.isInvalidated = true;
                                    (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(path, true);
                                }
                            }
                        }
                    });
                }
            });
        }

        function invalidateResolutionCacheOfChangedFailedLookupLocation<T extends NameResolutionWithFailedLookupLocations>(
            failedLookupLocationPath: Path,
            cache: Map<Map<T>>) {
            cache.forEach((value, containingFile) => {
                if (value) {
                    value.forEach(resolution => {
                        if (resolution && !resolution.isInvalidated && some(resolution.failedLookupLocations, location => toPath(location) === failedLookupLocationPath)) {
                            // Mark the file as needing re-evaluation of module resolution instead of using it blindly.
                            resolution.isInvalidated = true;
                            (filesWithInvalidatedResolutions || (filesWithInvalidatedResolutions = createMap<true>())).set(containingFile, true);
                        }
                    });
                }
            });
        }

        function invalidateResolutionOfFile(filePath: Path) {
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedModuleNames, m => m.resolvedModule, r => r.resolvedFileName);
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedTypeReferenceDirectives, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName);
        }

        function invalidateResolutionOfChangedFailedLookupLocation(failedLookupLocationPath: Path) {
             invalidateResolutionCacheOfChangedFailedLookupLocation(failedLookupLocationPath, resolvedModuleNames);
             invalidateResolutionCacheOfChangedFailedLookupLocation(failedLookupLocationPath, resolvedTypeReferenceDirectives);
        }
    }
}

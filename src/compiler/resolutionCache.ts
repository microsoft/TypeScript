/// <reference path="types.ts"/>
/// <reference path="core.ts"/>

namespace ts {
    export interface ResolutionCache {
        setModuleResolutionHost(host: ModuleResolutionHost): void;
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[];
        resolveModuleNames(moduleNames: string[], containingFile: string, logChanges: boolean): ResolvedModuleFull[];
        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];
        invalidateResolutionOfDeletedFile(filePath: Path): void;
        clear(): void;
    }

    type NameResolutionWithFailedLookupLocations = { failedLookupLocations: string[], isInvalidated?: boolean };
    type ResolverWithGlobalCache = (primaryResult: ResolvedModuleWithFailedLookupLocations, moduleName: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost) => ResolvedModuleWithFailedLookupLocations | undefined;

    /*@internal*/
    export function resolveWithGlobalCache(primaryResult: ResolvedModuleWithFailedLookupLocations, moduleName: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string | undefined, projectName: string): ResolvedModuleWithFailedLookupLocations | undefined {
        if (!isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTypeScript(primaryResult.resolvedModule.extension)) && globalCache !== undefined) {
            // otherwise try to load typings from @types

            // create different collection of failed lookup locations for second pass
            // if it will fail and we've already found something during the first pass - we don't want to pollute its results
            const { resolvedModule, failedLookupLocations } = loadModuleFromGlobalCache(moduleName, projectName, compilerOptions, host, globalCache);
            if (resolvedModule) {
                return { resolvedModule, failedLookupLocations: primaryResult.failedLookupLocations.concat(failedLookupLocations) };
            }
        }
    }

    /*@internal*/
    export function createResolutionCache(
        toPath: (fileName: string) => Path,
        getCompilerOptions: () => CompilerOptions,
        resolveWithGlobalCache?: ResolverWithGlobalCache): ResolutionCache {

        let host: ModuleResolutionHost;
        let filesWithChangedSetOfUnresolvedImports: Path[];
        const resolvedModuleNames = createMap<Map<ResolvedModuleWithFailedLookupLocations>>();
        const resolvedTypeReferenceDirectives = createMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();

        return {
            setModuleResolutionHost,
            startRecordingFilesWithChangedResolutions,
            finishRecordingFilesWithChangedResolutions,
            resolveModuleNames,
            resolveTypeReferenceDirectives,
            invalidateResolutionOfDeletedFile,
            clear
        };

        function setModuleResolutionHost(updatedHost: ModuleResolutionHost) {
            host = updatedHost;
        }

        function clear() {
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

        function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
            const primaryResult = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host);
            // return result immediately only if it is .ts, .tsx or .d.ts
            // otherwise try to load typings from @types
            return (resolveWithGlobalCache && resolveWithGlobalCache(primaryResult, moduleName, compilerOptions, host)) || primaryResult;
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
                        newResolutions.set(name, resolution);
                    }
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

        function invalidateResolutionCacheOfDeletedFile<T extends NameResolutionWithFailedLookupLocations, R>(
            deletedFilePath: Path,
            cache: Map<Map<T>>,
            getResult: (s: T) => R,
            getResultFileName: (result: R) => string | undefined) {
            cache.forEach((value, path) => {
                if (path === deletedFilePath) {
                    cache.delete(path);
                }
                else if (value) {
                    value.forEach((resolution) => {
                        if (resolution && !resolution.isInvalidated) {
                            const result = getResult(resolution);
                            if (result) {
                                if (getResultFileName(result) === deletedFilePath) {
                                    resolution.isInvalidated = true;
                                }
                            }
                        }
                    });
                }
            });
        }

        function invalidateResolutionOfDeletedFile(filePath: Path) {
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedModuleNames, m => m.resolvedModule, r => r.resolvedFileName);
            invalidateResolutionCacheOfDeletedFile(filePath, resolvedTypeReferenceDirectives, m => m.resolvedTypeReferenceDirective, r => r.resolvedFileName);
        }
    }
}

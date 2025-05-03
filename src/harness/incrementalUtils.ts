import * as ts from "./_namespaces/ts.js";

export function reportDocumentRegistryStats(documentRegistry: ts.DocumentRegistry): string[] {
    const str: string[] = [];
    documentRegistry.getBuckets().forEach((bucketEntries, key) => {
        str.push(`  Key:: ${key}`);
        bucketEntries.forEach((entry, path) => {
            if (ts.isDocumentRegistryEntry(entry)) {
                str.push(`    ${path}: ${ts.Debug.formatScriptKind(entry.sourceFile.scriptKind)} ${entry.languageServiceRefCount}`);
            }
            else {
                entry.forEach((real, kind) => str.push(`    ${path}: ${ts.Debug.formatScriptKind(kind)} ${real.languageServiceRefCount}`));
            }
        });
    });
    return str;
}

type DocumentRegistryExpectedStats = Map<ts.DocumentRegistryBucketKeyWithMode, Map<ts.Path, Map<ts.ScriptKind, number>>>;
function verifyDocumentRegistryStats(
    documentRegistry: ts.DocumentRegistry,
    stats: DocumentRegistryExpectedStats,
) {
    documentRegistry.getBuckets().forEach((bucketEntries, key) => {
        const statsByPath = stats.get(key);
        bucketEntries.forEach((entry, path) => {
            const expected = statsByPath?.get(path);
            if (ts.isDocumentRegistryEntry(entry)) {
                ts.Debug.assert(
                    expected?.size === 1 && expected.has(entry.sourceFile.scriptKind) && expected.get(entry.sourceFile.scriptKind) === entry.languageServiceRefCount,
                    `Document registry has unexpected language service ref count for ${key} ${path} ${ts.Debug.formatScriptKind(entry.sourceFile.scriptKind)} ${entry.languageServiceRefCount}`,
                    reportStats,
                );
            }
            else {
                entry.forEach((real, kind) =>
                    ts.Debug.assert(
                        real.languageServiceRefCount === expected?.get(kind),
                        `Document registry has unexpected language service ref count for ${key} ${path} ${ts.Debug.formatScriptKind(kind)} ${real.languageServiceRefCount}`,
                        reportStats,
                    )
                );
                expected?.forEach((value, kind) =>
                    ts.Debug.assert(
                        entry.has(kind),
                        `Document registry expected language service ref count for ${key} ${path} ${ts.Debug.formatScriptKind(kind)} ${value}`,
                        reportStats,
                    )
                );
            }
        });
        statsByPath?.forEach((_value, path) =>
            ts.Debug.assert(
                bucketEntries.has(path),
                `Document registry does not contain entry for ${key}, ${path}`,
                reportStats,
            )
        );
    });
    stats.forEach((_value, key) =>
        ts.Debug.assert(
            documentRegistry.getBuckets().has(key),
            `Document registry does not contain entry for key: ${key}`,
            reportStats,
        )
    );

    function reportStats() {
        const str: string[] = ["", "Actual::", ...reportDocumentRegistryStats(documentRegistry)];
        str.push("Expected::");
        stats?.forEach((statsByPath, key) => {
            str.push(`  Key:: ${key}`);
            statsByPath.forEach((entry, path) => entry.forEach((refCount, kind) => str.push(`    ${path}: ${ts.Debug.formatScriptKind(kind)} ${refCount}`)));
        });
        return str.join("\n");
    }
}

function verifyDocumentRegistry(service: ts.server.ProjectService) {
    const stats: DocumentRegistryExpectedStats = new Map();
    const collectStats = (project: ts.server.Project) => {
        if (project.autoImportProviderHost) collectStats(project.autoImportProviderHost);
        if (project.noDtsResolutionProject) collectStats(project.noDtsResolutionProject);
        const program = project.getCurrentProgram();
        if (!program) return;
        const key = service.documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions());
        program.getSourceFiles().forEach(f => {
            const keyWithMode = service.documentRegistry.getDocumentRegistryBucketKeyWithMode(key, f.impliedNodeFormat);
            let mapForKeyWithMode = stats.get(keyWithMode);
            let result: Map<ts.ScriptKind, number> | undefined;
            if (mapForKeyWithMode === undefined) {
                stats.set(keyWithMode, mapForKeyWithMode = new Map());
                mapForKeyWithMode.set(f.resolvedPath, result = new Map());
            }
            else {
                result = mapForKeyWithMode.get(f.resolvedPath);
                if (!result) mapForKeyWithMode.set(f.resolvedPath, result = new Map());
            }
            result.set(f.scriptKind, (result.get(f.scriptKind) || 0) + 1);
        });
    };
    service.forEachProject(collectStats);
    verifyDocumentRegistryStats(service.documentRegistry, stats);
}

function isFromNodeModulesOfGlobalTypingsAncestor(l: string, globalTypingsCacheLocation: string | undefined) {
    return !!globalTypingsCacheLocation && ts.forEachAncestorDirectory(
        ts.getDirectoryPath(globalTypingsCacheLocation),
        ancestor => l.startsWith(ts.combinePaths(ancestor, "node_modules/")) ? true : undefined,
    );
}

function containsGlobalTypingsCacheLocation(locations: string[], globalTypingsCacheLocation: string | undefined) {
    return !!globalTypingsCacheLocation && ts.find(
        locations,
        l => l.startsWith(ts.combinePaths(globalTypingsCacheLocation, "node_modules/")),
    );
}

/**
 * Verifies that failed lookups, affecting locations and alternate result are present in actual resolution
 * Not checking otherway round because actual resolution can have more failed lookups and affecting locations
 */
function verifyResolutionWithFailedLookupLocationsProperties(
    expectedResolutionWithFailedLookupLocations: ts.ResolutionWithFailedLookupLocations,
    actualResolutionWithFailedLookupLocations: ts.ResolutionWithFailedLookupLocations | undefined,
    projectName: string,
    cacheType: string,
    globalTypingsCacheLocation: string | undefined,
) {
    expectedResolutionWithFailedLookupLocations?.failedLookupLocations?.forEach(l =>
        ts.Debug.assert(
            ts.contains(actualResolutionWithFailedLookupLocations!.failedLookupLocations, l) ||
                // If resolution is found in cache, we may not look and add js extensions since node resolvers traverses through
                // ancestor directories for ts and d.ts first and then for js files as next roung
                // So if moduleName was not resolved and is in cache in ancestor folder say folder when it was set from folder/a file
                // when we get the resolution from file folder/b , we will not add folder/b/node_modules/moduleName.js to failed lookup
                ts.fileExtensionIsOneOf(l, ts.supportedJSExtensionsFlat) ||
                // Global typings cache resolutions dont go past that folder,
                // so if one of the failed lookup was done from there and cached,
                // when this resolution is reused, there wont be failed lookups in ancestor folders of global typings location
                // which could be there if we didnt reuse the resolution so thats okay
                (
                    isFromNodeModulesOfGlobalTypingsAncestor(l, globalTypingsCacheLocation) &&
                    containsGlobalTypingsCacheLocation(
                        actualResolutionWithFailedLookupLocations!.failedLookupLocations!,
                        globalTypingsCacheLocation,
                    )
                ),
            `${projectName}:: ${cacheType}:: Expected failed lookup location ${l} not found in actual resolution`,
        )
    );

    expectedResolutionWithFailedLookupLocations?.affectingLocations?.forEach(l =>
        ts.Debug.assert(
            ts.contains(actualResolutionWithFailedLookupLocations!.affectingLocations, l),
            `${projectName}:: ${cacheType}:: Expected affecting location ${l} not found in actual resolution`,
        )
    );
    ts.Debug.assert(
        expectedResolutionWithFailedLookupLocations?.alternateResult === actualResolutionWithFailedLookupLocations!.alternateResult,
        `${projectName}:: ${cacheType}:: Expected alternateResult not matching with actual resolution`,
    );
    ts.Debug.assert(
        !!expectedResolutionWithFailedLookupLocations?.globalCacheResolution === !!actualResolutionWithFailedLookupLocations?.globalCacheResolution,
        `${projectName}:: ${cacheType}:: Expected globalCacheResolution presence to match`,
    );
    ts.Debug.assert(
        ts.isResolvedWithoutGlobalCachePass(expectedResolutionWithFailedLookupLocations) === ts.isResolvedWithoutGlobalCachePass(actualResolutionWithFailedLookupLocations!),
        `${projectName}:: ${cacheType}:: Expected globalCacheResolution isResolvedWithoutGlobalCachePass should match`,
    );
    ts.Debug.assert(
        ts.isResolvedWithGlobalCachePass(expectedResolutionWithFailedLookupLocations) === ts.isResolvedWithGlobalCachePass(actualResolutionWithFailedLookupLocations!),
        `${projectName}:: ${cacheType}:: Expected globalCacheResolution isResolvedWithGlobalCachePass should match`,
    );
    ts.Debug.assert(
        ts.isResolvedWithGlobalCachePassButStillUnresolved(expectedResolutionWithFailedLookupLocations) === ts.isResolvedWithGlobalCachePassButStillUnresolved(actualResolutionWithFailedLookupLocations!),
        `${projectName}:: ${cacheType}:: Expected globalCacheResolution isResolvedWithGlobalCachePassButStillUnresolved should match`,
    );
}

interface ResolutionInfo {
    cacheType: string;
    fileName: string;
    name: string;
    mode: ts.ResolutionMode;
}

function getResolutionCacheDetails<File, T extends ts.ResolutionWithFailedLookupLocations>(
    baseline: string[],
    cacheType: string,
    file: File,
    forEach:
        | ((
            callback: (resolvedModule: T, moduleName: string, mode: ts.ResolutionMode) => void,
            file: File,
        ) => void)
        | undefined,
    getResolvedFileName: (resolution: T) => string | undefined,
    indent: string,
    actualProgram: ts.Program | undefined,
    projectName: string | undefined,
    globalTypingsCacheLocation: string | undefined,
    actualProgramResolution: ((name: string, mode: ts.ResolutionMode) => T | undefined) | undefined,
) {
    let addedCacheType = false;
    forEach?.((resolved, key, mode) => {
        if (!addedCacheType) {
            addedCacheType = true;
            baseline.push(`${indent}${cacheType}:`);
        }
        baseline.push(`${indent}  ${key}: ${mode ? ts.getNameOfCompilerOptionValue(mode, ts.moduleOptionDeclaration.type) + ":" : ""}${getResolvedFileName(resolved)}`);
        if (actualProgram && actualProgramResolution) {
            verifyResolutionWithFailedLookupLocationsProperties(
                resolved,
                actualProgramResolution(key, mode),
                projectName!,
                cacheType,
                globalTypingsCacheLocation,
            );
        }
    }, file);
}

function getResolvedModuleFileName(r: ts.ResolvedModuleWithFailedLookupLocations) {
    return r.resolvedModule?.resolvedFileName;
}

function getResolvedTypeRefFileName(r: ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
    return r.resolvedTypeReferenceDirective?.resolvedFileName;
}

function getLibResolutionCacheDetails(
    baseline: string[],
    cache: Map<string, ts.LibResolution> | undefined,
    indent: string,
    actualProgram: ts.Program | undefined,
    projectName: string | undefined,
    globalTypingsCacheLocation: string | undefined,
    actualLibResolution: (libFileName: string) => ts.LibResolution | undefined,
) {
    let addedCacheType = false;
    cache?.forEach((resolved, libFileName) => {
        if (!addedCacheType) {
            addedCacheType = true;
            baseline.push(`${indent}Libs:`);
        }
        baseline.push(`${indent}  ${libFileName}: Actual: ${resolved.actual} Resolution: ${getResolvedModuleFileName(resolved.resolution)}`);
        if (actualProgram) {
            verifyResolutionWithFailedLookupLocationsProperties(
                resolved.resolution,
                actualLibResolution(libFileName)?.resolution,
                projectName!,
                "Libs",
                globalTypingsCacheLocation,
            );
        }
    });
}

function getProgramStructure(
    program: ts.Program | undefined,
    actualProgram?: ts.Program,
    projectName?: string,
    globalTypingsCacheLocation?: string,
    userResolvedModuleNames?: true,
) {
    const baseline: string[] = [];
    program?.getSourceFiles().slice().sort((f1, f2) => ts.comparePathsCaseSensitive(f1.path, f2.path)).forEach(f => {
        baseline.push(`  File: ${f.fileName} Path: ${f.path} ResolvedPath: ${f.resolvedPath} impliedNodeFormat: ${f.impliedNodeFormat}`);
        baseline.push(f.text.split(/\r?\n/).map(l => l ? "    " + l : "").join("\n"));
        const actualSourceFile = actualProgram?.getSourceFileByPath(f.path)!;
        getResolutionCacheDetails(
            baseline,
            "Modules",
            f,
            program.forEachResolvedModule,
            getResolvedModuleFileName,
            "    ",
            actualProgram,
            projectName,
            globalTypingsCacheLocation,
            !userResolvedModuleNames ?
                ((key, mode) => actualProgram!.getResolvedModule(actualSourceFile, key, mode)) :
                undefined,
        );
        getResolutionCacheDetails(
            baseline,
            "TypeRefs",
            f,
            program.forEachResolvedTypeReferenceDirective,
            getResolvedTypeRefFileName,
            "    ",
            actualProgram,
            projectName,
            globalTypingsCacheLocation,
            (key, mode) => actualProgram!.getResolvedTypeReferenceDirective(actualSourceFile, key, mode),
        );
    });
    getResolutionCacheDetails(
        baseline,
        "AutoTypeRefs",
        /*file*/ undefined,
        program?.getAutomaticTypeDirectiveResolutions().forEach,
        getResolvedTypeRefFileName,
        "  ",
        actualProgram,
        projectName,
        globalTypingsCacheLocation,
        (key, mode) => actualProgram!.getAutomaticTypeDirectiveResolutions()?.get(key, mode),
    );
    getLibResolutionCacheDetails(
        baseline,
        program?.resolvedLibReferences,
        "    ",
        actualProgram,
        projectName,
        globalTypingsCacheLocation,
        libFileName => actualProgram!.resolvedLibReferences?.get(libFileName),
    );
    return baseline.join("\n");
}

export function verifyProgramStructure(
    expectedProgram: ts.Program,
    actualProgram: ts.Program,
    projectName: string,
    globalTypingsCacheLocation: string | undefined,
    userResolvedModuleNames?: true,
): void {
    const actual = getProgramStructure(actualProgram);
    const expected = getProgramStructure(
        expectedProgram,
        actualProgram,
        projectName,
        globalTypingsCacheLocation,
        userResolvedModuleNames,
    );
    ts.Debug.assert(actual === expected, `Program verification:: ${projectName}`);
}

interface PopulateResolutionCacheResult {
    expected: ts.ResolutionCache;
    resolutionToRefs: Map<ts.ResolutionWithFailedLookupLocations, ResolutionInfo[]>;
}
function populateResolutionCache(
    actual: ts.ResolutionCache,
    sharedCache: ts.SharedResolutionCache,
    expectedToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
    actualToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
): PopulateResolutionCacheResult;
function populateResolutionCache(
    actual: ts.ResolutionCache,
    sharedCache: ts.SharedResolutionCache,
    expectedToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
    actualToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
    verifyProgramAndResolution: true,
    actualProgram: ts.Program,
    resolutionHostCacheHost: ts.ResolutionCacheHost,
    projectName: string,
    userResolvedModuleNames: true | undefined,
): PopulateResolutionCacheResult;
function populateResolutionCache(
    actual: ts.ResolutionCache,
    sharedCache: ts.SharedResolutionCache,
    expectedToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
    actualToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
    verifyProgramAndResolution?: true,
    actualProgram?: ts.Program,
    resolutionHostCacheHost?: ts.ResolutionCacheHost,
    projectName?: string,
    userResolvedModuleNames?: true,
) {
    resolutionHostCacheHost ??= {
        getCurrentDirectory: actual.resolutionHost.getCurrentDirectory.bind(actual.resolutionHost),
        toPath: actual.resolutionHost.toPath.bind(actual.resolutionHost),
        getCanonicalFileName: actual.resolutionHost.getCanonicalFileName.bind(actual.resolutionHost),
        getCompilationSettings: actual.resolutionHost.getCompilationSettings.bind(actual.resolutionHost),
        fileExists: ts.notImplemented,
        readFile: ts.notImplemented,
        realpath: actual.resolutionHost.realpath?.bind(actual.resolutionHost),
        globalCacheResolutionModuleName: actual.resolutionHost.globalCacheResolutionModuleName?.bind(actual.resolutionHost),
        getCurrentProgram: actual.resolutionHost.getCurrentProgram.bind(actual.resolutionHost),
        fileIsOpen: actual.resolutionHost.fileIsOpen.bind(actual.resolutionHost),
        projectName: actual.resolutionHost.projectName,
        preferNonRecursiveWatch: actual.resolutionHost.preferNonRecursiveWatch,
        watchDirectoryOfFailedLookupLocation: ts.returnNoopFileWatcher,
        watchAffectingFileLocation: ts.returnNoopFileWatcher,
        onInvalidatedResolution: ts.notImplemented,
        watchTypeRootsDirectory: ts.returnNoopFileWatcher,
        onChangedAutomaticTypeDirectiveNames: ts.notImplemented,
        scheduleInvalidateResolutionsOfFailedLookupLocations: ts.notImplemented,
        getCachedDirectoryStructureHost: ts.returnUndefined,
        writeLog: ts.noop,
    };
    actualProgram ??= actual.resolutionHost.getCurrentProgram()!;
    const currentDirectory = resolutionHostCacheHost.getCurrentDirectory();
    resolutionHostCacheHost.getRootDirInfoForResolution = (_redirectedReference, expectedResolution) =>
        actual.sharedCache.watchedResolutionInfoMap.get(
            expectedToResolution.get(expectedResolution)!,
        )!.rootDirInfo!;

    const expected = ts.createResolutionCache(resolutionHostCacheHost, actual.rootDirForResolution, sharedCache);
    expected.startCachingPerDirectoryResolution(actualProgram.getCompilerOptions());

    const resolutionToRefs = new Map<ts.ResolutionWithFailedLookupLocations, ResolutionInfo[]>();
    const inferredTypesPath = resolutionHostCacheHost.toPath(
        ts.getAutomaticTypeDirectiveContainingFile(
            actualProgram.getCompilerOptions(),
            currentDirectory,
        ),
    );
    actual.resolvedModuleNames.forEach((resolutions, path) =>
        collectResolutionToRefFromCache(
            "Modules",
            expectedToResolution,
            actualToResolution,
            path,
            resolutions,
            getResolvedModuleFileName,
            expected.resolvedModuleNames,
            expected.moduleResolutionCache,
            () => actualProgram.getRedirectReferenceForResolution(actualProgram.getSourceFileByPath(path)!),
            (name, mode) => actualProgram.getResolvedModule(actualProgram.getSourceFileByPath(path)!, name, mode),
        )
    );
    actual.resolvedTypeReferenceDirectives.forEach((resolutions, path) =>
        collectResolutionToRefFromCache(
            "TypeRefs",
            expectedToResolution,
            actualToResolution,
            path,
            resolutions,
            getResolvedTypeRefFileName,
            expected.resolvedTypeReferenceDirectives,
            expected.typeReferenceDirectiveResolutionCache,
            () =>
                path !== inferredTypesPath ?
                    actualProgram.getRedirectReferenceForResolution(actualProgram.getSourceFileByPath(path)!) :
                    undefined,
            (name, mode) =>
                path !== inferredTypesPath ?
                    actualProgram.getResolvedTypeReferenceDirective(actualProgram.getSourceFileByPath(path)!, name, mode) :
                    actualProgram.getAutomaticTypeDirectiveResolutions().get(name, mode),
            redirect => actualProgram.getTypeRootsCacheKeys()?.get(redirect?.sourceFile.path),
        )
    );
    actual.resolvedLibraries.forEach((resolved, libFileName) => {
        const libResolvedFrom = ts.getInferredLibraryNameResolveFrom(actualProgram.getCompilerOptions(), currentDirectory, libFileName);
        const expectedResolution = collectResolution(
            "Libs",
            expectedToResolution,
            actualToResolution,
            resolutionHostCacheHost.toPath(libResolvedFrom),
            resolved,
            getResolvedModuleFileName,
            ts.getLibraryNameFromLibFileName(libFileName),
            /*mode*/ undefined,
        );
        expected.resolvedLibraries.set(libFileName, expectedResolution);
        expected.libraryResolutionCache.setPerDirectoryAndNonRelativeNameCacheResult(
            ts.getLibraryNameFromLibFileName(libFileName),
            undefined,
            ts.getDirectoryPath(libResolvedFrom),
            undefined,
            undefined,
            expectedResolution,
        );
    });
    if (verifyProgramAndResolution) {
        // Check for resolutions in program but not in cache to empty resolutions
        if (!userResolvedModuleNames) {
            actualProgram.forEachResolvedModule((resolution, name, mode, filePath) =>
                verifyResolutionIsInCache(
                    "Modules",
                    actual.resolvedModuleNames.get(filePath),
                    resolution,
                    name,
                    mode,
                    filePath,
                )
            );
        }
        actualProgram.forEachResolvedTypeReferenceDirective((resolution, name, mode, filePath) =>
            verifyResolutionIsInCache(
                "TypeRefs",
                actual.resolvedTypeReferenceDirectives.get(filePath),
                resolution,
                name,
                mode,
                filePath,
            )
        );
        actualProgram.getAutomaticTypeDirectiveResolutions().forEach((resolution, name, mode) =>
            verifyResolutionIsInCache(
                "AutoTypeRefs",
                actual.resolvedTypeReferenceDirectives.get(inferredTypesPath),
                resolution,
                name,
                mode,
                inferredTypesPath,
            )
        );
    }

    expected.finishCachingPerDirectoryResolution(actualProgram, /*oldProgram*/ undefined, /*skipCacheCompact*/ true);
    const project = actual.resolutionHost as ts.server.Project;
    if (
        !project.projectService ||
        (project.languageServiceEnabled && project.projectService.serverMode === ts.LanguageServiceMode.Semantic)
    ) expected.updateTypeRootsWatch(actualProgram.getCompilerOptions());

    return { expected, resolutionToRefs };

    function collectResolutionToRefFromCache<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        expectedToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
        actualToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
        fileName: ts.Path,
        cache: ts.ModeAwareCache<T> | undefined,
        getResolvedFileName: (resolution: T) => string | undefined,
        storeExpected: Map<ts.Path, ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations>>,
        moduleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<T>,
        getRedirectReferenceForResolution: () => ts.ResolvedProjectReference | undefined,
        getProgramResolutions: (name: string, mode: ts.ResolutionMode) => T | undefined,
        getTypeRootsCacheKey?: (redirect: ts.ResolvedProjectReference | undefined) => ts.TypeRootsCacheKeyOrSpecifiedTypeRoots | undefined,
    ) {
        if (verifyProgramAndResolution) {
            ts.Debug.assert(
                actualProgram!.getSourceFileByPath(fileName) || inferredTypesPath === fileName,
                `${projectName}:: ${cacheType} ${fileName} Expect cache for file in program or auto type ref`,
            );
        }
        let expectedCache: ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations> | undefined;
        cache?.forEach((resolved, name, mode) => {
            const expected = collectResolution(
                cacheType,
                expectedToResolution,
                actualToResolution,
                fileName,
                resolved,
                getResolvedFileName,
                name,
                mode,
            );
            if (!expectedCache) storeExpected.set(fileName, expectedCache = ts.createModeAwareCache());
            expectedCache.set(name, mode, expected);
            const redirect = getRedirectReferenceForResolution();
            moduleOrTypeRefCache.setPerDirectoryAndNonRelativeNameCacheResult(
                name,
                mode,
                ts.getDirectoryPath(fileName),
                redirect,
                getTypeRootsCacheKey?.(redirect),
                expected as unknown as T,
            );
            if (verifyProgramAndResolution) {
                // Resolution in cache should be same as that is in program
                ts.Debug.assert(
                    resolved === getProgramResolutions(name, mode),
                    `${projectName}:: ${cacheType} ${fileName} ${name} ${mode} Expected resolution in cache to be matched to that in the program`,
                );
            }
        });
    }

    function collectResolution<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        expectedToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
        actualToResolution: Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>,
        fileName: ts.Path,
        resolved: T,
        getResolvedFileName: (resolution: T) => string | undefined,
        name: string,
        mode: ts.ResolutionMode,
    ) {
        const existing = resolutionToRefs.get(resolved);
        let expectedResolution = actualToResolution.get(resolved) as T | undefined;
        if (existing) {
            existing.push({ cacheType, fileName, name, mode });
        }
        else {
            resolutionToRefs.set(resolved, [{ cacheType, fileName, name, mode }]);
        }
        if (!expectedResolution) {
            expectedResolution = { ...resolved };
            if (ts.isResolvedWithGlobalCachePass(resolved)) {
                const primary = resolved.globalCacheResolution.primary;
                if (!actualToResolution.has(primary)) {
                    // Set primary resolution
                    const primaryExpectedResolution = { ...primary } as ts.ResolvedModuleWithFailedLookupLocations;
                    primaryExpectedResolution.globalCacheResolution = {
                        primary: primaryExpectedResolution,
                        globalResolution: primary.globalCacheResolution?.globalResolution,
                        globalResult: expectedResolution as ts.ResolvedModuleWithFailedLookupLocations,
                    };
                    (expectedResolution as ts.ResolvedModuleWithFailedLookupLocations).globalCacheResolution = primaryExpectedResolution.globalCacheResolution;
                    expectedToResolution.set(primaryExpectedResolution, primary);
                    actualToResolution.set(primary, primaryExpectedResolution);
                }
            }
            else if (ts.isResolvedWithoutGlobalCachePass(resolved)) {
                if (resolved.globalCacheResolution.globalResult) {
                    // Set the global resolution as well
                    const globalResult = resolved.globalCacheResolution.globalResult;
                    if (!actualToResolution.has(globalResult)) {
                        const globalExpectedResult = { ...globalResult } as ts.ResolvedModuleWithFailedLookupLocations;
                        expectedResolution.globalCacheResolution = {
                            primary: expectedResolution as ts.ResolvedModuleWithFailedLookupLocations,
                            globalResolution: resolved.globalCacheResolution.globalResolution,
                            globalResult: globalExpectedResult,
                        };
                        globalExpectedResult.globalCacheResolution = expectedResolution.globalCacheResolution;
                        expectedToResolution.set(globalExpectedResult, globalResult);
                        actualToResolution.set(globalResult, globalExpectedResult);
                    }
                }
                else {
                    expectedResolution.globalCacheResolution = { primary: expectedResolution as ts.ResolvedModuleWithFailedLookupLocations };
                }
            }
            expectedToResolution.set(expectedResolution, resolved);
            actualToResolution.set(resolved, expectedResolution);
        }
        // We are passing redirectedReference as undefined because we want to use existing rootDirInfo
        expected.watchResolution(
            expectedResolution,
            fileName,
            () => ({ resolvedFileName: getResolvedFileName(resolved) }),
            /*redirectedReference*/ undefined,
        );
        return expectedResolution;
    }

    function verifyResolutionIsInCache<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        cache: ts.ModeAwareCache<T> | undefined,
        resolution: T,
        name: string,
        mode: ts.ResolutionMode,
        fileName: string,
    ) {
        if (resolution !== ts.emptyResolution) {
            // Resolutions should match
            ts.Debug.assert(
                cache?.get(name, mode) === resolution,
                `${projectName}:: ${cacheType}:: ${name}:: ${mode} Expected resolution in program to be in cache ${fileName}`,
            );
        }
        else {
            // EmptyResolution is place holder and shouldnt be in the cache
            ts.Debug.assert(
                !cache?.has(name, mode),
                `${projectName}:: ${cacheType}:: ${name}:: ${mode} Ambient moduleResolution, should not be in cache or watched ${fileName}`,
            );
        }
    }
}

function releaseResolutionCache(
    expectedCache: ts.ResolutionCache,
    actualCache: ts.ResolutionCache,
    actualProgram: ts.Program | undefined,
    skipCacheCompact: boolean,
) {
    // Stop watching resolutions to verify everything gets closed.
    actualProgram ??= actualCache.resolutionHost.getCurrentProgram()!;
    expectedCache.startCachingPerDirectoryResolution(actualProgram.getCompilerOptions());
    actualCache.resolvedModuleNames.forEach((_resolutions, path) => expectedCache.removeResolutionsOfFile(path));
    actualCache.resolvedTypeReferenceDirectives.forEach((_resolutions, path) => expectedCache.removeResolutionsOfFile(path));
    expectedCache.finishCachingPerDirectoryResolution(/*newProgram*/ undefined, actualProgram, skipCacheCompact);
    expectedCache.closeTypeRootsWatch();
}

export function verifyResolutionCache(
    actual: ts.ResolutionCache,
    actualProgram: ts.Program,
    resolutionHostCacheHost: ts.ResolutionCacheHost,
    projectName: string,
    userResolvedModuleNames?: true,
): void {
    const expectedCacheToActualCache = new Map<ts.ResolutionCache, ts.ResolutionCache>();
    const actualCacheToExpectedCache = new Map<ts.ResolutionCache, ts.ResolutionCache>();
    const expectedToResolution = new Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>();
    const actualToResolution = new Map<ts.ResolutionWithFailedLookupLocations, ts.ResolutionWithFailedLookupLocations>();
    const expectedResolutionCacheToResolutions = new Map<ts.ResolutionCache, Set<ts.ResolutionWithFailedLookupLocations>>();

    const sharedCache = ts.createSharedResolutionCache(actual.sharedCache.sharedCacheHost);
    forEachOtherResolutionCachesInSharedCache(cache => {
        const expected = populateResolutionCache(
            cache,
            sharedCache,
            expectedToResolution,
            actualToResolution,
        );
        expectedCacheToActualCache.set(expected.expected, cache);
        actualCacheToExpectedCache.set(cache, expected.expected);
        const optionsSet = actual.sharedCache.cacheToOptions.get(cache);
        if (optionsSet) sharedCache.cacheToOptions.set(expected.expected, optionsSet);
        expectedResolutionCacheToResolutions.set(expected.expected, new Set(expected.resolutionToRefs.keys()));
    });

    expectedResolutionCacheToResolutions.forEach((expectedRefs, expectedCache) =>
        expectedRefs.forEach(actualResolution => {
            const expectedResolution = actualResolutionToExpectedResolution(actualResolution);
            const actualCache = expectedCacheToActualCache.get(expectedCache)!;
            if (actualCache.sharedCache.watchedResolutionInfoMap.get(actualResolution)!.isInvalidated) {
                sharedCache.watchedResolutionInfoMap.get(expectedResolution)!.isInvalidated = true;
            }
            if (ts.isResolvedWithGlobalCachePass(actualResolution)) {
                if (actualCache.sharedCache.watchedResolutionInfoMap.get(actualResolution.globalCacheResolution.primary)?.isInvalidated) {
                    sharedCache.watchedResolutionInfoMap.get(expectedResolution.globalCacheResolution!.primary)!.isInvalidated = true;
                }
            }
            else if (actualResolution.globalCacheResolution?.globalResult) {
                if (actualCache.sharedCache.watchedResolutionInfoMap.get(actualResolution.globalCacheResolution.globalResult)?.isInvalidated) {
                    sharedCache.watchedResolutionInfoMap.get(expectedResolution.globalCacheResolution!.globalResult!)!.isInvalidated = true;
                }
            }
        })
    );

    const { expected, resolutionToRefs } = populateResolutionCache(
        actual,
        sharedCache,
        expectedToResolution,
        actualToResolution,
        /*verifyProgramAndResolution*/ true,
        actualProgram,
        resolutionHostCacheHost,
        projectName,
        userResolvedModuleNames,
    );
    expectedCacheToActualCache.set(expected, actual);
    actualCacheToExpectedCache.set(actual, expected);

    verifyRefCountCache(sharedCache.inUseResolutionCaches, actual.sharedCache.inUseResolutionCaches, "inUseResolutionCaches");
    // Verify ref count
    resolutionToRefs.forEach((info, actualResolution) => {
        const actualFiles = actual.filesReferencingResolution.get(actualResolution);
        ts.Debug.assert(
            actualFiles?.size === info.length,
            `${projectName}:: Expected Resolution ref count ${info.length} but got ${actualFiles?.size}`,
            () =>
                `Expected from:: ${JSON.stringify(info, undefined, " ")}` +
                `Actual from: ${actualFiles?.size}`,
        );
        const actualWatchedResolutionInfo = actual.sharedCache.watchedResolutionInfoMap.get(actualResolution)!;
        ts.Debug.assert(
            actualWatchedResolutionInfo.caches.has(actual),
            `${projectName}:: Expected Resolution to have reference for the cache`,
        );
        ts.Debug.assert(
            !actualWatchedResolutionInfo.isInvalidated,
            `${projectName}:: Resolution should not be invalidated`,
        );
        const expectedResolution = actualResolutionToExpectedResolution(actualResolution);
        const expecedFiles = expected.filesReferencingResolution.get(expectedResolution);
        verifySet(expecedFiles, actualFiles, `Resolution files`);
        verifyWatchedResolutionInfo(sharedCache.watchedResolutionInfoMap.get(expectedResolution), actualWatchedResolutionInfo, "watchedResolutionInfo of Resolution");
    });
    verifyMap(
        sharedCache.watchedResolutionInfoMap,
        actual.sharedCache.watchedResolutionInfoMap,
        verifyWatchedResolutionInfo,
        "watchedResolutionInfoMap",
        expectedResolutionToActualResolution,
        actualResolutionToExpectedResolution,
    );
    verifyMapOfResolutionSet(sharedCache.resolvedFileToResolution, actual.sharedCache.resolvedFileToResolution, "resolvedFileToResolution");
    verifyResolutionSet(sharedCache.resolutionsWithFailedLookups, actual.sharedCache.resolutionsWithFailedLookups, "resolutionsWithFailedLookups");
    verifyResolutionSet(sharedCache.resolutionsWithOnlyAffectingLocations, actual.sharedCache.resolutionsWithOnlyAffectingLocations, `resolutionsWithOnlyAffectingLocations`);
    verifyDirectoryWatchesOfFailedLookups(sharedCache.directoryWatchesOfFailedLookups, actual.sharedCache.directoryWatchesOfFailedLookups, "directoryWatchesOfFailedLookups");
    verifyDirectoryWatchesOfFailedLookups(sharedCache.nonRecursiveDirectoryWatchesOfFailedLookups, actual.sharedCache.nonRecursiveDirectoryWatchesOfFailedLookups, "nonRecursiveDirectoryWatchesOfFailedLookups");
    verifyFileWatchesOfAffectingLocations(sharedCache.fileWatchesOfAffectingLocations, actual.sharedCache.fileWatchesOfAffectingLocations);
    verifyPackageDirWatchers(sharedCache.packageDirWatchers, actual.sharedCache.packageDirWatchers);
    verifyDirPathToSymlinkPackageRefCount(sharedCache.dirPathToSymlinkPackageRefCount, actual.sharedCache.dirPathToSymlinkPackageRefCount);
    ts.Debug.assert(
        expected.countResolutionsResolvedWithGlobalCache() === actual.countResolutionsResolvedWithGlobalCache(),
        `${projectName}:: Expected ResolutionsResolvedWithGlobalCache count ${expected.countResolutionsResolvedWithGlobalCache()} but got ${actual.countResolutionsResolvedWithGlobalCache()}`,
    );
    ts.Debug.assert(
        expected.countResolutionsResolvedWithoutGlobalCache() === actual.countResolutionsResolvedWithoutGlobalCache(),
        `${projectName}:: Expected ResolutionsResolvedWithoutGlobalCache count ${expected.countResolutionsResolvedWithoutGlobalCache()} but got ${actual.countResolutionsResolvedWithoutGlobalCache()}`,
    );

    // Verify that caches are same:
    forEachModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCache(cache, actual[cacheType], cacheType));
    forEachSharedModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCache(cache, actual.sharedCache[cacheType], `sharedCache ${cacheType}`));
    verifyPackageJsonWatchInfo();

    verifyTypeRootWatches();

    // Stop watching resolutions to verify everything gets closed.
    releaseResolutionCache(expected, actual, actualProgram, /*skipCacheCompact*/ true);
    verifyResolutionRefCountCacheOrSetDoesNotContainExpected(sharedCache.inUseResolutionCaches, "inUseResolutionCaches");
    ts.Debug.assert(!expected.filesReferencingResolution.size, `${projectName}:: Shouldnt watch any files`);
    sharedCache.watchedResolutionInfoMap.forEach(info =>
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            info.caches,
            "watchedResolutionInfoMap",
        )
    );
    sharedCache.resolvedFileToResolution.forEach((resolutions, file) =>
        verifyResolutionSetReleasedFromExpected(
            resolutions,
            `resolvedFileToResolution: ${file}`,
        )
    );
    verifyResolutionSetReleasedFromExpected(sharedCache.resolutionsWithFailedLookups, "resolutionsWithFailedLookups");
    verifyResolutionSetReleasedFromExpected(sharedCache.resolutionsWithOnlyAffectingLocations, "resolutionsWithOnlyAffectingLocations");
    sharedCache.directoryWatchesOfFailedLookups.forEach((watcher, dirPath) =>
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            watcher.refCount,
            `directoryWatchesOfFailedLookups: ${dirPath}`,
        )
    );
    sharedCache.nonRecursiveDirectoryWatchesOfFailedLookups.forEach((watcher, dirPath) =>
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            watcher.refCount,
            `nonRecursiveDirectoryWatchesOfFailedLookups: ${dirPath}`,
        )
    );
    sharedCache.fileWatchesOfAffectingLocations.forEach((watcher, fileName) => {
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            watcher.resolutions,
            `fileWatchesOfAffectingLocations: resolutions ${fileName}`,
        );
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            watcher.files,
            `fileWatchesOfAffectingLocations: files ${fileName}`,
        );
    });
    sharedCache.packageDirWatchers.forEach((watcher, dirPath) =>
        watcher.dirPathToWatcher.forEach(dirPathWatcher => {
            verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
                dirPathWatcher.refCount,
                `packageDirWatchers ${dirPath}`,
            );
            verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
                dirPathWatcher.watcher.refCount,
                `packageDirWatchers ${dirPath} watcher.refCount`,
            );
        })
    );
    ts.Debug.assert(expected.countResolutionsResolvedWithGlobalCache() === 0, `${projectName}:: ResolutionsResolvedWithGlobalCache should be cleared`);
    ts.Debug.assert(expected.countResolutionsResolvedWithoutGlobalCache() === 0, `${projectName}:: ResolutionsResolvedWithoutGlobalCache should be cleared`);
    forEachModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ false, ""));
    forEachSharedModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheReferencesOnlyOtherCaches(cache, cacheType, /*compacted*/ false));

    ts.Debug.assert(sharedCache.packageJsonRefCount.size <= actual.sharedCache.packageJsonRefCount.size, `${projectName}:: packageJsonRefCount should have released`);
    ts.Debug.assert(
        (sharedCache.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.size ?? 0) <= (actual.sharedCache.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()?.size ?? 0),
        `${projectName}:: Shouldnt have released packageJson entries`,
    );
    ts.Debug.assert(expected.typeRootsWatches.size === 0, `${projectName}:: typeRootsWatches should be cleared`);
    sharedCache.typeRootsWatches.forEach((watcher, dirPath) =>
        verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
            watcher.refCount,
            `typeRootsWatches ${dirPath}`,
        )
    );

    expected.compactCaches(/*newProgram*/ undefined);
    forEachModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ true, ""));
    forEachSharedModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheReferencesOnlyOtherCaches(cache, cacheType, /*compacted*/ true));

    // Release everything in shared cache::
    forEachOtherResolutionCachesInSharedCache(cache => {
        const expectedResolutionCache = actualCacheToExpectedCache.get(cache)!;
        releaseResolutionCache(
            expectedResolutionCache,
            cache,
            /*actualProgram*/ undefined,
            /*skipCacheCompact*/ false,
        );
        forEachModuleOrTypeRefOrLibCacheOfResolutionCache(
            expectedResolutionCache,
            (cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ false, `${expectedResolutionCache.resolutionHost.projectName}`),
        );
    });
    ts.Debug.assert(!sharedCache.inUseResolutionCaches.size, `${projectName}:: inUseResolutionCaches should be released`);
    ts.Debug.assert(!sharedCache.watchedResolutionInfoMap.size, `${projectName}:: Shouldnt watch any files`);
    ts.Debug.assert(sharedCache.resolvedFileToResolution.size === 0, `${projectName}:: resolvedFileToResolution should be released`);
    ts.Debug.assert(sharedCache.resolutionsWithFailedLookups.size === 0, `${projectName}:: resolutionsWithFailedLookups should be released`);
    ts.Debug.assert(sharedCache.resolutionsWithOnlyAffectingLocations.size === 0, `${projectName}:: resolutionsWithOnlyAffectingLocations should be released`);
    ts.Debug.assert(sharedCache.directoryWatchesOfFailedLookups.size === 0, `${projectName}:: directoryWatchesOfFailedLookups should be released`);
    ts.Debug.assert(sharedCache.nonRecursiveDirectoryWatchesOfFailedLookups.size === 0, `${projectName}:: nonRecursiveDirectoryWatchesOfFailedLookups should be released`);
    ts.Debug.assert(sharedCache.fileWatchesOfAffectingLocations.size === 0, `${projectName}:: fileWatchesOfAffectingLocations should be released`);
    ts.Debug.assert(sharedCache.packageDirWatchers.size === 0, `${projectName}:: packageDirWatchers should be released`);
    ts.Debug.assert(sharedCache.dirPathToSymlinkPackageRefCount.size === 0, `${projectName}:: dirPathToSymlinkPackageRefCount should be released`);
    ts.Debug.assert(sharedCache.packageJsonRefCount.size === 0, `${projectName}:: packageJsonRefCount should be cleared`);
    ts.Debug.assert(
        sharedCache.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap() === undefined || sharedCache.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()!.size === 0,
        `${projectName}:: Shouldnt have any packageJson entries`,
    );
    ts.Debug.assert(sharedCache.typeRootsWatches.size === 0, `${projectName}:: sharedCache typeRootsWatches should be cleared`);
    forEachSharedModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ false, "sharedCache "));

    // compact caches
    forEachOtherResolutionCachesInSharedCache(cache => {
        const expectedResolutionCache = actualCacheToExpectedCache.get(cache)!;
        expectedResolutionCache.compactCaches(/*newProgram*/ undefined);
        forEachModuleOrTypeRefOrLibCacheOfResolutionCache(
            expectedResolutionCache,
            (cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ true, `${expectedResolutionCache.resolutionHost.projectName}`),
        );
    });
    forEachSharedModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ true, "sharedCache "));

    function expectedResolutionToActualResolution(expectedResolution: ts.ResolutionWithFailedLookupLocations) {
        return expectedToResolution.get(expectedResolution)!;
    }

    function actualResolutionToExpectedResolution(actualResolution: ts.ResolutionWithFailedLookupLocations) {
        return actualToResolution.get(actualResolution)!;
    }

    function forEachOtherResolutionCachesInSharedCache(cb: (cache: ts.ResolutionCache) => void) {
        actual.sharedCache.inUseResolutionCaches.forEach((_refCount, cache) => cache !== actual ? cb(cache) : undefined);
    }

    function verifyWatchedResolutionInfo(
        expectedWatchedResolutionInfo: ts.WatchedResolutionInfo | undefined,
        actualWatchedResolutionInfo: ts.WatchedResolutionInfo | undefined,
        caption: string,
    ) {
        verifyResolutionCacheSet(
            expectedWatchedResolutionInfo?.caches,
            actualWatchedResolutionInfo?.caches,
            `${caption}:: CacheRefs`,
        );
        ts.Debug.assert(
            expectedWatchedResolutionInfo?.watchedFailed === actualWatchedResolutionInfo?.watchedFailed,
            `${projectName}:: Expected watchedFailed ${expectedWatchedResolutionInfo?.watchedFailed} but got ${actualWatchedResolutionInfo?.watchedFailed}`,
        );
        ts.Debug.assert(
            expectedWatchedResolutionInfo?.watchedAffected === actualWatchedResolutionInfo?.watchedAffected,
            `${projectName}:: Expected watchedAffected ${expectedWatchedResolutionInfo?.watchedAffected} but got ${actualWatchedResolutionInfo?.watchedAffected}`,
        );
        verifySet(expectedWatchedResolutionInfo?.dirWatches, actualWatchedResolutionInfo?.dirWatches, "Resolution dirWatches");
        verifySet(expectedWatchedResolutionInfo?.nonRecursiveDirWatches, actualWatchedResolutionInfo?.nonRecursiveDirWatches, "Resolution nonRecursiveDirWatches");
        verifyMap(
            expectedWatchedResolutionInfo?.packageDirWatchers,
            actualWatchedResolutionInfo?.packageDirWatchers,
            (expectedForDirWatchers, actualForDirWatchers, caption) =>
                verifySet(
                    expectedForDirWatchers,
                    actualForDirWatchers,
                    caption,
                ),
            `packageDirWatchers`,
        );
    }

    function verifyMapOfResolutionSet(
        expected: Map<ts.Path, Set<ts.ResolutionWithFailedLookupLocations>> | undefined,
        actual: Map<ts.Path, Set<ts.ResolutionWithFailedLookupLocations>> | undefined,
        caption: string,
    ) {
        verifyMap(expected, actual, verifyResolutionSet, caption);
    }

    function verifyResolutionSet(
        expected: Set<ts.ResolutionWithFailedLookupLocations> | undefined,
        actual: Set<ts.ResolutionWithFailedLookupLocations> | undefined,
        caption: string,
    ) {
        verifySet(
            expected,
            actual,
            `${projectName}:: ${caption}:: Resolutions`,
            expectedResolutionToActualResolution,
            actualResolutionToExpectedResolution,
        );
    }

    function expectedResolutionCacheToActualResolutionCache(expectedCache: ts.ResolutionCache): ts.ResolutionCache {
        return expectedCacheToActualCache.get(expectedCache)!;
    }

    function actualResolutionCacheToExpectedResolutionCache(actualCache: ts.ResolutionCache): ts.ResolutionCache {
        return actualCacheToExpectedCache.get(actualCache)!;
    }

    function resolutionCacheToText(cache: ts.ResolutionCache) {
        return cache.resolutionHost.projectName ?? cache;
    }

    function verifyResolutionCacheSet(
        expectedResolutionCacheSet: Set<ts.ResolutionCache> | undefined,
        actualdResolutionCacheSet: Set<ts.ResolutionCache> | undefined,
        caption: string,
    ) {
        verifySet(
            expectedResolutionCacheSet,
            actualdResolutionCacheSet,
            `${projectName}:: ${caption}`,
            expectedResolutionCacheToActualResolutionCache,
            actualResolutionCacheToExpectedResolutionCache,
            resolutionCacheToText,
        );
    }

    function verifyDirectoryWatchesOfFailedLookups(
        expected: Map<string, ts.DirectoryWatchesOfFailedLookup>,
        actual: Map<string, ts.DirectoryWatchesOfFailedLookup>,
        caption: string,
    ) {
        verifyMap(expected, actual, verifyDirectoryWatchesOfFailedLookup, caption);
    }

    function verifyDirectoryWatchesOfFailedLookup(
        expected: ts.DirectoryWatchesOfFailedLookup | undefined,
        actual: ts.DirectoryWatchesOfFailedLookup | undefined,
        caption: string,
    ) {
        verifyRefCountCache(expected?.refCount, actual?.refCount, `${caption}:: refCount`);
        ts.Debug.assert(!!expected?.refCount, `${projectName}:: ${caption}:: expected refCount to be non zero`);
    }

    function verifyRefCountCache(
        expectedRefCountCache: ts.RefCountCache | undefined,
        actualRefCountCache: ts.RefCountCache | undefined,
        caption: string,
    ) {
        verifyMap(
            expectedRefCountCache,
            actualRefCountCache,
            (expectedRefCount, actualRefCount, caption) =>
                ts.Debug.assert(
                    expectedRefCount === actualRefCount,
                    `${projectName}:: ${caption} Expected ref count ${expectedRefCount} but got ${actualRefCount}`,
                ),
            caption,
            expectedResolutionCacheToActualResolutionCache,
            actualResolutionCacheToExpectedResolutionCache,
            resolutionCacheToText,
        );
    }

    function verifyFileWatchesOfAffectingLocations(
        expected: Map<string, ts.FileWatcherOfAffectingLocation>,
        actual: Map<string, ts.FileWatcherOfAffectingLocation>,
    ) {
        verifyMap(expected, actual, verifyFileWatcherOfAffectingLocation, "fileWatchesOfAffectingLocations");
    }

    function verifyFileWatcherOfAffectingLocation(
        expected: ts.FileWatcherOfAffectingLocation | undefined,
        actual: ts.FileWatcherOfAffectingLocation | undefined,
        caption: string,
    ) {
        verifyRefCountCache(expected?.resolutions, actual?.resolutions, `${caption}:: resolutions`);
        verifyRefCountCache(expected?.files, actual?.files, `${caption}:: files`);
        verifySet(expected?.symlinks, actual?.symlinks, `${projectName}:: ${caption}:: symlinks`);
    }

    function verifyPackageDirWatchers(
        expected: Map<ts.Path, ts.PackageDirWatcher>,
        actual: Map<ts.Path, ts.PackageDirWatcher>,
    ) {
        verifyMap(expected, actual, verifyPackageDirWatcher, "packageDirWatchers");
    }

    function verifyPackageDirWatcher(
        expected: ts.PackageDirWatcher | undefined,
        actual: ts.PackageDirWatcher | undefined,
        caption: string,
    ) {
        ts.Debug.assert(expected?.isSymlink === actual?.isSymlink, `${projectName}:: ${caption}:: isSymlink`);
        verifyMap(expected?.dirPathToWatcher, actual?.dirPathToWatcher, verfiyDirPathToWatcherOfPackageDirWatcher, `${projectName}:: ${caption}:: dirPathToWatcher`);
    }

    function verfiyDirPathToWatcherOfPackageDirWatcher(
        expected: ts.DirPathToWatcherOfPackageDirWatcher | undefined,
        actual: ts.DirPathToWatcherOfPackageDirWatcher | undefined,
        caption: string,
    ) {
        verifyRefCountCache(expected?.refCount, actual?.refCount, `${caption}:: refCount`);
        verifyDirectoryWatchesOfFailedLookup(expected?.watcher, actual?.watcher, `${projectName}:: ${caption}:: directoryWatchesOfFailedLookup`);
    }

    function verifyDirPathToSymlinkPackageRefCount(
        expected: Map<ts.Path, number>,
        actual: Map<ts.Path, number>,
    ) {
        verifyMap(expected, actual, (expected, actual, caption) => {
            ts.Debug.assert(expected === actual, `${projectName}:: ${caption}`);
        }, "dirPathToSymlinkPackageRefCount");
    }

    type ModuleOrTypeRefOrLibraryCacheType = "moduleResolutionCache" | "typeReferenceDirectiveResolutionCache" | "libraryResolutionCache";
    function forEachModuleOrTypeRefOrLibCache(
        action: (cache: ts.ResolutionCache[ModuleOrTypeRefOrLibraryCacheType], cacheType: ModuleOrTypeRefOrLibraryCacheType) => void,
    ) {
        forEachModuleOrTypeRefOrLibCacheOfResolutionCache(expected, action);
    }

    function forEachSharedModuleOrTypeRefOrLibCache(
        action: (cache: ts.ResolutionCache[ModuleOrTypeRefOrLibraryCacheType], cacheType: ModuleOrTypeRefOrLibraryCacheType) => void,
    ) {
        forEachModuleOrTypeRefOrLibCacheOfResolutionCache(sharedCache, action);
    }

    function forEachModuleOrTypeRefOrLibCacheOfResolutionCache(
        cache: ts.ResolutionCache | ts.SharedResolutionCache,
        action: (cache: ts.ResolutionCache[ModuleOrTypeRefOrLibraryCacheType], cacheType: ModuleOrTypeRefOrLibraryCacheType) => void,
    ) {
        action(cache.moduleResolutionCache, "moduleResolutionCache");
        action(cache.typeReferenceDirectiveResolutionCache, "typeReferenceDirectiveResolutionCache");
        action(cache.libraryResolutionCache, "libraryResolutionCache");
    }

    function verifyModuleOrTypeResolutionCache(
        expectedModuleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<ts.ResolutionWithFailedLookupLocations>,
        actualModuleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<ts.ResolutionWithFailedLookupLocations>,
        cacheType: string,
    ) {
        verfiyCacheWithRedirects(
            expectedModuleOrTypeRefCache.directoryToModuleNameMap,
            actualModuleOrTypeRefCache.directoryToModuleNameMap,
            verifyDirectoryToModuleNameMap,
            `${cacheType}:: directoryToModuleNameMap`,
        );
        verfiyCacheWithRedirects(
            expectedModuleOrTypeRefCache.moduleNameToDirectoryMap,
            actualModuleOrTypeRefCache.moduleNameToDirectoryMap,
            verifyModuleNameToDirectoryMap,
            `${cacheType}:: moduleNameToDirectoryMap`,
        );
    }

    function verifyDirectoryToModuleNameMap(
        expectedDirectoryToModuleNameMap: ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations> | undefined,
        actualDirectoryToModuleNameMap: ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations> | undefined,
        caption: string,
    ) {
        verifyModeAwareCache(
            expectedDirectoryToModuleNameMap,
            actualDirectoryToModuleNameMap,
            verfiyResolution,
            caption,
        );
    }

    function verifyModuleNameToDirectoryMap(
        expectedModuleNameToDirectoryMap: ts.PerNonRelativeNameCache<ts.ResolutionWithFailedLookupLocations> | undefined,
        actualModuleNameToDirectoryMap: ts.PerNonRelativeNameCache<ts.ResolutionWithFailedLookupLocations> | undefined,
        caption: string,
    ) {
        verifyMap(
            expectedModuleNameToDirectoryMap?.directoryPathMap,
            actualModuleNameToDirectoryMap?.directoryPathMap,
            verfiyResolution,
            caption,
        );
    }

    function verfiyResolution(
        expectedResolution: ts.ResolutionWithFailedLookupLocations | undefined,
        actualResolution: ts.ResolutionWithFailedLookupLocations | undefined,
        caption: string,
    ) {
        ts.Debug.assert(
            expectedResolution ?
                // Resolution should match
                expectedResolutionToActualResolution(expectedResolution) === actualResolution :
                // Otherwise in actual cache present because of incremental storage and should be referenced somewhere
                sharedCache.watchedResolutionInfoMap.has(actualResolutionToExpectedResolution(actualResolution!)),
            `${projectName}:: ${caption} Expected resolution need to match in actual`,
        );
    }

    function verfiyCacheWithRedirects<K extends string, V>(
        expectedCacheWithRedirects: ts.CacheWithRedirects<K, V>,
        actualCacheWithRedirects: ts.CacheWithRedirects<K, V>,
        verifyValue: (expectedCacheWithRedirectsValue: V | undefined, actualCacheWithRedirectsValue: V | undefined, caption: string) => void,
        cacheType: string,
    ) {
        const expectedOwnOptions = expectedCacheWithRedirects.getOwnOptions();
        const actualOwnOptions = actualCacheWithRedirects.getOwnOptions();
        ts.Debug.assert(
            (expectedOwnOptions && ts.computeRedirectsCacheKey(expectedOwnOptions)) === (actualOwnOptions && ts.computeRedirectsCacheKey(actualOwnOptions)),
            `${projectName}:: ${cacheType}:: ownOptions affecting cache should match`,
        );
        verifyMapAndTypeRootsCacheKeyMaps(
            expectedCacheWithRedirects.getOwnMap(),
            actualCacheWithRedirects.getOwnMap(),
            `${cacheType}:: ownMap`,
        );

        expectedCacheWithRedirects.redirectsKeyToMap.forEach(
            (expectedCacheWithRedirectsValue, key) => {
                // Expected might have value in redirectsKeyToMap because we collect and set resolutions
                // in different order than its computed by program creation
                const actualCacheWithRedirectsValue = actualCacheWithRedirects.redirectsKeyToMap.get(key);
                if (actualCacheWithRedirectsValue) {
                    verifyMapAndTypeRootsCacheKeyMaps(
                        expectedCacheWithRedirectsValue,
                        actualCacheWithRedirects.redirectsKeyToMap.get(key),
                        `${cacheType}:: redirectsKeyToMap:: ${key}`,
                    );
                }
                else {
                    // This is own key
                    ts.Debug.assert(
                        ts.computeRedirectsCacheKey(expectedCacheWithRedirects.getOwnOptions()!) === key,
                        `${cacheType}:: redirectsKeyToMap:: ${key} not present in actualCacheWithRedirects: should be ownKey`,
                    );

                    ts.Debug.assert(
                        expectedCacheWithRedirects.getOwnMap() === expectedCacheWithRedirectsValue,
                        `${cacheType}:: redirectsKeyToMap:: ${key} not present in actualCacheWithRedirects: should be ownMap`,
                    );
                }
            },
        );
        actualCacheWithRedirects.redirectsKeyToMap.forEach(
            (actualCacheWithRedirectsValue, key) => {
                const expectedCacheWithRedirectsValue = expectedCacheWithRedirects.redirectsKeyToMap.get(key);
                if (expectedCacheWithRedirectsValue) {
                    verifyMapAndTypeRootsCacheKeyMaps(
                        expectedCacheWithRedirectsValue,
                        actualCacheWithRedirectsValue,
                        `${cacheType}:: redirectsKeyToMap:: ${key}`,
                    );
                }
                else if (actualCacheWithRedirectsValue.size) {
                    // When changes affect module resolution, we update the compilerOptions which sets the redirectsKeyToMap with ownMap
                    // This will not happen for initial program/resolution cache creation so expected may not have the value in redirectsKeyToMap
                    ts.Debug.assert(
                        ts.computeRedirectsCacheKey(actualCacheWithRedirects.getOwnOptions()!) === key,
                        `${cacheType}:: redirectsKeyToMap:: ${key} not present in expectedCacheWithRedirects: should be ownKey`,
                    );

                    ts.Debug.assert(
                        actualCacheWithRedirects.getOwnMap() === actualCacheWithRedirectsValue,
                        `${cacheType}:: redirectsKeyToMap:: ${key} not present in expectedCacheWithRedirects: should be ownMap`,
                    );
                }
            },
        );

        function verifyMapAndTypeRootsCacheKeyMaps(
            expectedRootMap: Map<K, V> | undefined,
            actualRootMap: Map<K, V> | undefined,
            caption: string,
        ) {
            verifyMapFromCacheSame(
                expectedRootMap,
                actualRootMap,
                caption,
            );
            verifyTypeRootsCacheKeyMaps(
                expectedCacheWithRedirects,
                actualCacheWithRedirects,
                verifyMapFromCacheSame,
                expectedRootMap,
                actualRootMap,
                caption,
            );
        }

        function verifyMapFromCacheSame(
            expctedCacheMap: Map<K, V> | undefined,
            actualCacheMap: Map<K, V> | undefined,
            caption: string,
        ) {
            verifyMap(
                expctedCacheMap,
                actualCacheMap,
                verifyValue,
                caption,
            );
        }
    }

    function verifyTypeRootsCacheKeyMaps<K extends string, V>(
        expectedCacheWithRedirects: ts.CacheWithRedirects<K, V>,
        actualCacheWithRedirects: ts.CacheWithRedirects<K, V>,
        verifyTypeRootsResultMap: (expectedTypeRootsCacheMap: Map<K, V> | undefined, actualTypeRootsCacheMap: Map<K, V> | undefined, caption: string) => void,
        expectedKeyMap: Map<K, V> | undefined,
        actualKeyMap: Map<K, V> | undefined,
        caption: string,
    ) {
        verifyMap(
            expectedCacheWithRedirects.getTypesRootKeyToMap()?.get(expectedKeyMap!),
            actualCacheWithRedirects.getTypesRootKeyToMap()?.get(actualKeyMap!),
            verifyTypeRootsResultMap,
            caption,
        );
    }

    function verifyModuleOrTypeResolutionCacheIsEmpty(
        moduleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<ts.ResolutionWithFailedLookupLocations>,
        cacheType: string,
        compacted: boolean,
        caption: string,
    ) {
        verifyCacheWithRedirectsIsEmpty(
            moduleOrTypeRefCache.directoryToModuleNameMap,
            `${caption}${cacheType}:: directoryToModuleNameMap`,
            compacted,
        );
        verifyCacheWithRedirectsIsEmpty(
            moduleOrTypeRefCache.moduleNameToDirectoryMap,
            `${caption}${cacheType}:: moduleNameToDirectoryMap`,
            compacted,
        );
    }

    function verifyCacheWithRedirectsIsEmpty<K, V>(
        cacheWithRedirects: ts.CacheWithRedirects<K, V>,
        cacheType: string,
        compacted: boolean,
    ) {
        ts.Debug.assert(
            cacheWithRedirects.getOwnMap().size === 0,
            `${projectName}:: ${cacheType}:: ${compacted}:: ownMap should be empty`,
        );
        cacheWithRedirects.redirectsKeyToMap.forEach((actualMap, actualKey) => {
            ts.Debug.assert(
                compacted ? actualMap === cacheWithRedirects.getOwnMap() : actualMap.size === 0,
                `${projectName}:: ${cacheType}:: ${compacted}:: redirectsKeyToMap:: ${actualKey} expected to be empty`,
            );
            if (compacted) {
                ts.Debug.assert(
                    ts.computeRedirectsCacheKey(cacheWithRedirects.getOwnOptions()!) === actualKey,
                    `${projectName}:: ${cacheType}:: ${compacted}:: redirectsKeyToMap:: ${actualKey} expected to be same as ownKey`,
                );
            }
        });
        // TODO:: sheetal
    }

    function verifyModuleOrTypeResolutionCacheReferencesOnlyOtherCaches(
        moduleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<ts.ResolutionWithFailedLookupLocations>,
        cacheType: ModuleOrTypeRefOrLibraryCacheType,
        compacted: boolean,
    ) {
        // TODO:: sheetal
        let allowedKeys: Set<ts.RedirectsCacheKey> | undefined;
        forEachOtherResolutionCachesInSharedCache(cache =>
            cacheType !== "libraryResolutionCache" ?
                actual.sharedCache.cacheToOptions.get(cache)?.availableOptions.forEach(
                    options =>
                        (allowedKeys ??= new Set()).add(
                            ts.computeRedirectsCacheKey(options),
                        ),
                ) :
                (allowedKeys ??= new Set()).add(
                    ts.computeRedirectsCacheKey(ts.getOptionsForLibraryResolution(/*options*/ undefined)),
                )
        );
        verifyCacheWithRedirectsReferencesOnlyOtherCaches(
            moduleOrTypeRefCache.directoryToModuleNameMap,
            `sharedCache ${cacheType}:: directoryToModuleNameMap`,
            allowedKeys,
            compacted,
        );
        verifyCacheWithRedirectsReferencesOnlyOtherCaches(
            moduleOrTypeRefCache.moduleNameToDirectoryMap,
            `sharedCache ${cacheType}:: moduleNameToDirectoryMap`,
            allowedKeys,
            compacted,
        );
    }

    function verifyCacheWithRedirectsReferencesOnlyOtherCaches<K, V>(
        cacheWithRedirects: ts.CacheWithRedirects<K, V>,
        cacheType: string,
        allowedKeys: Set<ts.RedirectsCacheKey> | undefined,
        compacted: boolean,
    ) {
        // TODO:: sheetal
        ts.Debug.assert(
            cacheWithRedirects.getOwnMap().size === 0 || allowedKeys?.has(ts.computeRedirectsCacheKey(cacheWithRedirects.getOwnOptions()!)),
            `${projectName}:: ${cacheType}:: ${compacted}:: ownMap should be empty`,
        );
        cacheWithRedirects.redirectsKeyToMap.forEach((actualMap, actualKey) =>
            ts.Debug.assert(
                (compacted ? actualMap === cacheWithRedirects.getOwnMap() : actualMap.size === 0) || allowedKeys?.has(actualKey),
                `${projectName}:: ${cacheType}:: ${compacted}:: redirectsKeyToMap:: ${actualKey} expected to be empty`,
            )
        );
    }

    function verifyPackageJsonWatchInfo() {
        verifyMap(
            sharedCache.packageJsonRefCount,
            actual.sharedCache.packageJsonRefCount,
            (expectedRefCount, actualRefCount, caption) =>
                ts.Debug.assert(
                    expectedRefCount === actualRefCount,
                    `${projectName}:: ${caption}`,
                ),
            "packageJsonRefCount",
        );
        verifyMap(
            actual.sharedCache.packageJsonRefCount,
            actual.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap(),
            (refCount, packageJsonCacheEntry, caption) => {
                // Ok to have refcount on entry not in cache
                if (!packageJsonCacheEntry) return;
                ts.Debug.assert(
                    !!refCount,
                    `${projectName}:: ${caption}:: expected ref count on packageJson as there is entry in the cache`,
                );
            },
            "Package Json cache watched",
        );
    }

    function verifyTypeRootWatches() {
        verifyMap(
            expected.typeRootsWatches,
            actual.typeRootsWatches,
            (expectedWatch, actualWatch, caption) =>
                ts.Debug.assert(
                    !!expectedWatch === !!actualWatch,
                    `${projectName}:: ${caption}`,
                ),
            "typeRootsWatches",
        );
        verifyMap(
            sharedCache.typeRootsWatches,
            actual.sharedCache.typeRootsWatches,
            verifySharedCacheTypeRootWatch,
            "sharedCache typeRootsWatches",
        );
    }

    function verifySharedCacheTypeRootWatch(
        expectedWatch: ts.TypeRootWatch | undefined,
        actualWatch: ts.TypeRootWatch | undefined,
        caption: string,
    ) {
        ts.Debug.assert(
            !!expectedWatch === !!actualWatch,
            `${projectName}:: ${caption}`,
        );
        ts.Debug.assert(
            !!expectedWatch?.watcher === !!actualWatch?.watcher,
            `${projectName}:: ${caption} watcher`,
        );
        verifyResolutionCacheSet(expectedWatch?.refCount, actualWatch?.refCount, `${caption} refCount`);
    }

    function verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
        refCacheOrSet: ts.RefCountCache | Set<ts.ResolutionCache> | undefined,
        caption: string,
    ) {
        ts.Debug.assert(
            !refCacheOrSet?.has(expected),
            `${projectName}:: Expected ${caption} to have released cache`,
        );
    }

    function verifyResolutionSetReleasedFromExpected(
        resolutionSet: Set<ts.ResolutionWithFailedLookupLocations>,
        caption: string,
    ) {
        resolutionSet.forEach(resolution => {
            verifyResolutionRefCountCacheOrSetDoesNotContainExpected(
                sharedCache.watchedResolutionInfoMap.get(resolution)!.caches,
                caption,
            );
        });
    }
}

function verifyMap<Key, Expected, Actual>(
    expectedMap: Map<Key, Expected> | undefined,
    actualMap: Map<Key, Actual> | undefined,
    verifyValue: (expectedValue: Expected | undefined, actualValue: Actual | undefined, caption: string) => void,
    caption: string,
    expectedKeyToActualKey: (expectedValue: Key) => Key = ts.identity,
    actualKeyToExpectedKey: (actualValue: Key) => Key = ts.identity,
    keyToText: (key: Key) => any = ts.identity,
) {
    expectedMap?.forEach((expectedValue, path) =>
        verifyValue(
            expectedValue,
            actualMap?.get(expectedKeyToActualKey(path)),
            `${caption}:: ${keyToText(path)}`,
        )
    );
    actualMap?.forEach((actualValue, path) =>
        verifyValue(
            expectedMap?.get(actualKeyToExpectedKey(path)),
            actualValue,
            `${caption}:: ${keyToText(path)}`,
        )
    );
}

function verifySet<K>(
    expectedSet: Set<K> | undefined,
    actualSet: Set<K> | undefined,
    caption: string,
    expectedValueToActualValue: (expectedValue: K) => K = ts.identity,
    actualValueToExpectedValue: (actualValue: K) => K = ts.identity,
    valueToText: (key: K) => any = ts.identity,
) {
    expectedSet?.forEach(expectedValue =>
        ts.Debug.assert(
            actualSet?.has(expectedValueToActualValue(expectedValue)),
            `${caption}:: ${valueToText(expectedValue)} should be present in actual`,
        )
    );
    actualSet?.forEach(actualValue =>
        ts.Debug.assert(
            expectedSet?.has(actualValueToExpectedValue(actualValue)),
            `${caption}:: ${valueToText(actualValue)} should be present in expected`,
        )
    );
}

function verifyArray(
    expectedArray: readonly string[] | undefined,
    actualArray: readonly string[] | undefined,
    caption: string,
) {
    return verifySet(expectedArray && new Set(expectedArray), actualArray && new Set(actualArray), caption);
}

function verifyModeAwareCache<T>(
    expectedModeAwareCache: ts.ModeAwareCache<T> | undefined,
    actualModeAwareCache: ts.ModeAwareCache<T> | undefined,
    verifyValue: (expectedModeAwareCacheValue: T | undefined, actualModeAwareCacheValue: T | undefined, caption: string) => void,
    caption: string,
) {
    expectedModeAwareCache?.forEach(
        (expectedModeAwareCacheValue, key, mode) =>
            verifyValue(
                expectedModeAwareCacheValue,
                actualModeAwareCache?.get(key, mode),
                `${caption}:: ${key}:: ${mode}`,
            ),
    );
    actualModeAwareCache?.forEach(
        (actualModeAwareCacheValue, key, mode) =>
            verifyValue(
                expectedModeAwareCache?.get(key, mode),
                actualModeAwareCacheValue,
                `${caption}:: ${key}:: ${mode}`,
            ),
    );
}

function verifyProgram(service: ts.server.ProjectService, project: ts.server.Project) {
    if (service.serverMode === ts.LanguageServiceMode.Syntactic) return;
    const options = project.getCompilerOptions();
    const compilerHost = ts.createCompilerHostWorker(options, /*setParentNodes*/ undefined, service.host);
    compilerHost.useSourceOfProjectReferenceRedirect = project.useSourceOfProjectReferenceRedirect?.bind(project);
    compilerHost.getCurrentDirectory = project.getCurrentDirectory.bind(project);
    const getDefaultLibLocation = compilerHost.getDefaultLibLocation!;
    compilerHost.getDefaultLibLocation = () => ts.getNormalizedAbsolutePath(getDefaultLibLocation(), service.host.getCurrentDirectory());
    compilerHost.getDefaultLibFileName = options => ts.combinePaths(compilerHost.getDefaultLibLocation!(), ts.getDefaultLibFileName(options));
    compilerHost.trace = ts.noop; // We dont want to update host just because of trace
    const readFile = compilerHost.readFile;
    compilerHost.readFile = fileName => {
        const path = project.toPath(fileName);
        const info = project.projectService.filenameToScriptInfo.get(path);
        if (info?.isDynamicOrHasMixedContent()) {
            return ts.getSnapshotText(info.getSnapshot());
        }
        if (!ts.isAnySupportedFileExtension(path)) {
            // Some external file
            const snapshot = project.getScriptSnapshot(path);
            return snapshot ? ts.getSnapshotText(snapshot) : undefined;
        }
        if (project.fileIsOpen(path)) {
            return ts.getSnapshotText(info!.getSnapshot());
        }
        // Read only rooted disk paths from host similar to ProjectService
        if (!ts.isRootedDiskPath(fileName) || !compilerHost.fileExists(fileName)) return undefined;
        if (ts.hasTSFileExtension(fileName)) return readFile(fileName);
        let text: string | undefined | false;
        let fileSize: number;
        if (service.host.getFileSize) fileSize = service.host.getFileSize(fileName);
        else {
            text = readFile(fileName);
            fileSize = text?.length || 0;
            text = text !== undefined ? text : false;
        }
        // Large js files like project service
        if (fileSize > ts.server.maxFileSize) return "";
        return text !== undefined ? text || undefined : readFile(fileName);
    };
    const getSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
        const projectScriptKind = project.getScriptKind(fileName);
        const scriptKind = ts.ensureScriptKind(fileName, /*scriptKind*/ undefined);
        if (scriptKind === projectScriptKind) return getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);

        let text: string | undefined;
        try {
            text = compilerHost.readFile(fileName);
        }
        catch (e) {
            onError?.(e.message);
            text = "";
        }
        return text !== undefined ?
            ts.createSourceFile(fileName, text, languageVersionOrOptions, /*setParentNodes*/ undefined, projectScriptKind) :
            undefined;
    };
    const resolutionHostCacheHost: ts.ResolutionCacheHost = {
        ...compilerHost,

        getCompilerHost: () => compilerHost,
        toPath: project.toPath.bind(project),
        getCompilationSettings: project.getCompilationSettings.bind(project),
        projectName: project.projectName,
        getGlobalTypingsCacheLocation: project.getGlobalTypingsCacheLocation.bind(project),
        globalCacheResolutionModuleName: project.globalCacheResolutionModuleName.bind(project),
        fileIsOpen: project.fileIsOpen.bind(project),
        getCurrentProgram: () => project.getCurrentProgram(),

        preferNonRecursiveWatch: project.preferNonRecursiveWatch,
        watchDirectoryOfFailedLookupLocation: ts.returnNoopFileWatcher,
        watchAffectingFileLocation: ts.returnNoopFileWatcher,
        onInvalidatedResolution: ts.noop,
        watchTypeRootsDirectory: ts.returnNoopFileWatcher,
        onChangedAutomaticTypeDirectiveNames: ts.noop,
        scheduleInvalidateResolutionsOfFailedLookupLocations: ts.noop,
        getCachedDirectoryStructureHost: ts.returnUndefined,
        writeLog: ts.noop,
    };
    const moduleResolutionCache = ts.createModuleResolutionCache(compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, project.getCompilerOptions());
    compilerHost.resolveModuleNameLiterals = (moduleNames, containingFile, redirectedReference, options, containingSourceFile) =>
        ts.loadWithModeAwareCache(
            moduleNames,
            containingFile,
            redirectedReference,
            options,
            containingSourceFile,
            compilerHost,
            moduleResolutionCache,
            (containingFile, redirectedReference, options) =>
                ts.createModuleResolutionLoaderUsingGlobalCache(
                    containingFile,
                    redirectedReference,
                    options,
                    resolutionHostCacheHost,
                    moduleResolutionCache,
                ),
        );
    compilerHost.getGlobalTypingsCacheLocation = resolutionHostCacheHost.getGlobalTypingsCacheLocation;
    verifyProgramStructure(
        ts.createProgram({
            rootNames: project.getScriptFileNames(),
            options: project.getCompilationSettings(),
            projectReferences: project.getProjectReferences(),
            host: compilerHost,
        }),
        project.getCurrentProgram()!,
        project.projectName,
        service.typingsInstaller.globalTypingsCacheLocation,
    );
    verifyResolutionCache(
        project.resolutionCache,
        project.getCurrentProgram()!,
        resolutionHostCacheHost,
        project.projectName,
    );
}

function verifyUnresolvedImports(_service: ts.server.ProjectService, project: ts.server.Project) {
    const cachedUnresolvedImportsPerFile = new Map<ts.Path, readonly string[]>();
    const lastCachedUnresolvedImportsList = project.useTypingsFromGlobalCache() ?
        ts.server.getUnresolvedImports(project.getCurrentProgram()!, cachedUnresolvedImportsPerFile) :
        undefined;
    verifyArray(
        lastCachedUnresolvedImportsList,
        project.lastCachedUnresolvedImportsList,
        `${project.getProjectName()}:: lastCachedUnresolvedImportsList`,
    );
    verifyMap(
        cachedUnresolvedImportsPerFile,
        project.cachedUnresolvedImportsPerFile,
        (expected, actual, caption) => verifyArray(expected, actual, caption),
        `${project.getProjectName()}:: cachedUnresolvedImportsPerFile`,
    );
}

interface ResolveSingleModuleNameWithoutWatchingData {
    resolutionToData: Map<ts.ResolutionWithFailedLookupLocations, Pick<ts.ResolvedModuleWithFailedLookupLocations, "failedLookupLocations" | "affectingLocations" | "resolutionDiagnostics">>;
    packageJsonMap: Map<ts.Path, ts.PackageJsonInfoCacheEntry> | undefined;
}

function beforeResolveSingleModuleNameWithoutWatching(
    moduleResolutionCache: ts.ModuleResolutionCache,
): ResolveSingleModuleNameWithoutWatchingData {
    const resolutionToData: ResolveSingleModuleNameWithoutWatchingData["resolutionToData"] = new Map();
    // Currently it doesnt matter if moduleResolutionCache itself changes or not so just verify resolutions:
    moduleResolutionCache.directoryToModuleNameMap.getOwnMap().forEach(cache => {
        cache.forEach(resolution => {
            if (resolutionToData.has(resolution)) return;
            resolutionToData.set(resolution, {
                failedLookupLocations: resolution.failedLookupLocations?.slice(),
                affectingLocations: resolution.affectingLocations?.slice(),
                resolutionDiagnostics: resolution.resolutionDiagnostics?.slice(),
            });
        });
    });

    // We also care about package json info cache
    const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
    return {
        resolutionToData,
        packageJsonMap: packageJsonMap && new Map(packageJsonMap),
    };
}

function afterResolveSingleModuleNameWithoutWatching(
    moduleResolutionCache: ts.ModuleResolutionCache,
    moduleName: string,
    containingFile: string,
    result: ts.ResolvedModuleWithFailedLookupLocations,
    data: ResolveSingleModuleNameWithoutWatchingData,
) {
    const existing = data.resolutionToData.get(result);
    if (existing) {
        verifyArrayLength(existing.failedLookupLocations, result.failedLookupLocations, "failedLookupLocations");
        verifyArrayLength(existing.affectingLocations, result.affectingLocations, "affectingLocations");
        verifyArrayLength(existing.resolutionDiagnostics, result.resolutionDiagnostics, "resolutionDiagnostics");
    }

    verifyMap(
        data.packageJsonMap,
        moduleResolutionCache.getPackageJsonInfoCache().getInternalMap(),
        (expected, actual, caption) => ts.Debug.assert(expected === actual, caption),
        `Expected packageJsonInfo to not change: ${moduleName} ${containingFile}`,
    );

    function verifyArrayLength<T>(expected: T[] | undefined, actual: T[] | undefined, caption: string) {
        ts.Debug.assert(
            expected?.length === actual?.length,
            `Expected ${caption} to not change: ${moduleName} ${containingFile}`,
            () =>
                `Expected: ${JSON.stringify(expected, undefined, " ")}` +
                `Actual: ${JSON.stringify(actual, undefined, " ")}`,
        );
    }
}

function onProjectCreation(project: ts.server.Project) {
    if (project.projectKind !== ts.server.ProjectKind.Auxiliary) return;

    (project as ts.ResolutionCacheHost).beforeResolveSingleModuleNameWithoutWatching = beforeResolveSingleModuleNameWithoutWatching;
    (project as ts.ResolutionCacheHost).afterResolveSingleModuleNameWithoutWatching = afterResolveSingleModuleNameWithoutWatching;
}

export interface IncrementalVerifierCallbacks {
    beforeVerification?(): any;
    afterVerification?(dataFromBefore: any): void;
}

export function incrementalVerifier(service: ts.server.ProjectService): void {
    service.verifyDocumentRegistry = withIncrementalVerifierCallbacks(service, verifyDocumentRegistry);
    service.verifyProgram = withIncrementalVerifierCallbacks(service, verifyProgram);
    service.verifyUnresovedImports = withIncrementalVerifierCallbacks(service, verifyUnresolvedImports);
    service.onProjectCreation = onProjectCreation;
}

function withIncrementalVerifierCallbacks(
    service: ts.server.ProjectService,
    callback: (service: ts.server.ProjectService, ...args: any[]) => void,
): (...args: any[]) => void {
    return (...args: any[]) => {
        const data = (service.host as IncrementalVerifierCallbacks).beforeVerification?.();
        callback(service, ...args);
        (service.host as IncrementalVerifierCallbacks).afterVerification?.(data);
    };
}

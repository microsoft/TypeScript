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

/**
 * Verifies that failed lookups, affecting locations and alternate result are present in actual resolution
 * Not checking otherway round because actual resolution can have more failed lookups and affecting locations
 */
function verifyResolutionWithFailedLookupLocationsProperties(
    expectedResolutionWithFailedLookupLocations: ts.ResolutionWithFailedLookupLocations,
    actualResolutionWithFailedLookupLocations: ts.ResolutionWithFailedLookupLocations | undefined,
    projectName: string,
    cacheType: string,
) {
    expectedResolutionWithFailedLookupLocations?.failedLookupLocations?.forEach(l =>
        ts.Debug.assert(
            ts.contains(actualResolutionWithFailedLookupLocations!.failedLookupLocations, l),
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
    // Check global cache resolution as well
    ts.Debug.assert(
        JSON.stringify(expectedResolutionWithFailedLookupLocations?.globalCacheResolution) === JSON.stringify(actualResolutionWithFailedLookupLocations!.globalCacheResolution),
        `${projectName}:: ${cacheType}:: Expected globalCacheResolution not matching with actual resolution`,
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
            );
        }
    });
}

function getProgramStructure(
    program: ts.Program | undefined,
    actualProgram?: ts.Program,
    projectName?: string,
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
        (key, mode) => actualProgram!.getAutomaticTypeDirectiveResolutions()?.get(key, mode),
    );
    getLibResolutionCacheDetails(
        baseline,
        program?.resolvedLibReferences,
        "    ",
        actualProgram,
        projectName,
        libFileName => actualProgram!.resolvedLibReferences?.get(libFileName),
    );
    return baseline.join("\n");
}

export function verifyProgramStructure(
    expectedProgram: ts.Program,
    actualProgram: ts.Program,
    projectName: string,
    userResolvedModuleNames?: true,
): void {
    const actual = getProgramStructure(actualProgram);
    const expected = getProgramStructure(expectedProgram, actualProgram, projectName, userResolvedModuleNames);
    ts.Debug.assert(actual === expected, `Program verification:: ${projectName}`);
}

export function verifyResolutionCache(
    actual: ts.ResolutionCache,
    actualProgram: ts.Program,
    resolutionHostCacheHost: ts.ResolutionCacheHost,
    projectName: string,
    userResolvedModuleNames?: true,
): void {
    const currentDirectory = resolutionHostCacheHost.getCurrentDirectory!();
    const expected = ts.createResolutionCache(resolutionHostCacheHost, actual.rootDirForResolution);
    expected.startCachingPerDirectoryResolution();

    type ExpectedResolution = ts.ResolvedModuleWithFailedLookupLocations & ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations;

    const expectedToResolution = new Map<ExpectedResolution, ts.ResolutionWithFailedLookupLocations>();
    const resolutionToExpected = new Map<ts.ResolutionWithFailedLookupLocations, ExpectedResolution>();
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
        )
    );
    actual.resolvedLibraries.forEach((resolved, libFileName) => {
        const libResolvedFrom = ts.getInferredLibraryNameResolveFrom(actualProgram.getCompilerOptions(), currentDirectory, libFileName);
        const expectedResolution = collectResolution(
            "Libs",
            resolutionHostCacheHost.toPath(libResolvedFrom),
            resolved,
            getResolvedModuleFileName(resolved),
            ts.getLibraryNameFromLibFileName(libFileName),
            /*mode*/ undefined,
        );
        expected.resolvedLibraries.set(libFileName, expectedResolution);
        ts.setPerDirectoryAndNonRelativeNameCacheResult(
            expected.libraryResolutionCache,
            ts.getLibraryNameFromLibFileName(libFileName),
            undefined,
            ts.getDirectoryPath(libResolvedFrom),
            undefined,
            expectedResolution,
        );
    });
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

    expected.finishCachingPerDirectoryResolution(actualProgram, /*oldProgram*/ undefined, /*skipCacheCompact*/ true);

    // Verify ref count
    resolutionToRefs.forEach((info, resolution) => {
        ts.Debug.assert(
            resolution.files?.size === info.length,
            `${projectName}:: Expected Resolution ref count ${info.length} but got ${resolution.files?.size}`,
            () =>
                `Expected from:: ${JSON.stringify(info, undefined, " ")}` +
                `Actual from: ${resolution.files?.size}`,
        );
        ts.Debug.assert(
            !resolution.isInvalidated,
            `${projectName}:: Resolution should not be invalidated`,
        );
        const expected = resolutionToExpected.get(resolution)!;
        verifySet(expected.files, resolution.files, `${projectName}:: Resolution files`);
        ts.Debug.assert(
            expected.watchedFailed === resolution.watchedFailed,
            `${projectName}:: Expected watchedFailed of Resolution ${expected.watchedFailed} but got ${resolution.watchedFailed}`,
        );
        ts.Debug.assert(
            expected.watchedAffected === resolution.watchedAffected,
            `${projectName}:: Expected watchedAffected of Resolution ${expected.watchedAffected} but got ${resolution.watchedAffected}`,
        );
        ts.Debug.assert(
            expected.setAtRoot === resolution.setAtRoot,
            `${projectName}:: Expected setAtRoot of Resolution ${expected.setAtRoot} but got ${resolution.setAtRoot}`,
        );
    });
    verifyMapOfResolutionSet(expected.resolvedFileToResolution, actual.resolvedFileToResolution, `resolvedFileToResolution`);
    verifyResolutionSet(expected.resolutionsWithFailedLookups, actual.resolutionsWithFailedLookups, `resolutionsWithFailedLookups`);
    verifyResolutionSet(expected.resolutionsWithOnlyAffectingLocations, actual.resolutionsWithOnlyAffectingLocations, `resolutionsWithOnlyAffectingLocations`);
    verifyDirectoryWatchesOfFailedLookups(expected.directoryWatchesOfFailedLookups, actual.directoryWatchesOfFailedLookups);
    verifyFileWatchesOfAffectingLocations(expected.fileWatchesOfAffectingLocations, actual.fileWatchesOfAffectingLocations);
    verifyPackageDirWatchers(expected.packageDirWatchers, actual.packageDirWatchers);
    verifyDirPathToSymlinkPackageRefCount(expected.dirPathToSymlinkPackageRefCount, actual.dirPathToSymlinkPackageRefCount);
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
    verifyPackageJsonWatchInfo();

    // Stop watching resolutions to verify everything gets closed.
    expected.startCachingPerDirectoryResolution();
    actual.resolvedModuleNames.forEach((_resolutions, path) => expected.removeResolutionsOfFile(path));
    actual.resolvedTypeReferenceDirectives.forEach((_resolutions, path) => expected.removeResolutionsOfFile(path));
    expected.finishCachingPerDirectoryResolution(/*newProgram*/ undefined, actualProgram, /*skipCacheCompact*/ true);

    resolutionToExpected.forEach(
        expected => ts.Debug.assert(!expected.files?.size, `${projectName}:: Shouldnt ref to any files`),
    );
    ts.Debug.assert(expected.resolvedFileToResolution.size === 0, `${projectName}:: resolvedFileToResolution should be released`);
    ts.Debug.assert(expected.resolutionsWithFailedLookups.size === 0, `${projectName}:: resolutionsWithFailedLookups should be released`);
    ts.Debug.assert(expected.resolutionsWithOnlyAffectingLocations.size === 0, `${projectName}:: resolutionsWithOnlyAffectingLocations should be released`);
    ts.Debug.assert(expected.directoryWatchesOfFailedLookups.size === 0, `${projectName}:: directoryWatchesOfFailedLookups should be released`);
    ts.Debug.assert(expected.fileWatchesOfAffectingLocations.size === 0, `${projectName}:: fileWatchesOfAffectingLocations should be released`);
    ts.Debug.assert(expected.countResolutionsResolvedWithGlobalCache() === 0, `${projectName}:: ResolutionsResolvedWithGlobalCache should be cleared`);
    ts.Debug.assert(expected.countResolutionsResolvedWithoutGlobalCache() === 0, `${projectName}:: ResolutionsResolvedWithoutGlobalCache should be cleared`);
    forEachModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ false));
    ts.Debug.assert(expected.packageJsonRefCount.size === 0, `${projectName}:: packageJsonRefCount should be cleared`);
    ts.Debug.assert(
        expected.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap() === undefined || expected.moduleResolutionCache.getPackageJsonInfoCache().getInternalMap()!.size === 0,
        `${projectName}:: Shouldnt have any packageJson entries`,
    );

    expected.compactCaches(/*newProgram*/ undefined);
    forEachModuleOrTypeRefOrLibCache((cache, cacheType) => verifyModuleOrTypeResolutionCacheIsEmpty(cache, cacheType, /*compacted*/ true));

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

    function collectResolutionToRefFromCache<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        fileName: ts.Path,
        cache: ts.ModeAwareCache<T> | undefined,
        getResolvedFileName: (resolution: T) => string | undefined,
        storeExpected: Map<ts.Path, ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations>>,
        moduleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<T>,
        getRedirectReferenceForResolution: () => ts.ResolvedProjectReference | undefined,
        getProgramResolutions: (name: string, mode: ts.ResolutionMode) => T | undefined,
    ) {
        ts.Debug.assert(
            actualProgram.getSourceFileByPath(fileName) || inferredTypesPath === fileName,
            `${projectName}:: ${cacheType} ${fileName} Expect cache for file in program or auto type ref`,
        );
        let expectedCache: ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations> | undefined;
        cache?.forEach((resolved, name, mode) => {
            const resolvedFileName = getResolvedFileName(resolved);
            const expected = collectResolution(cacheType, fileName, resolved, resolvedFileName, name, mode);
            if (!expectedCache) storeExpected.set(fileName, expectedCache = ts.createModeAwareCache());
            expectedCache.set(name, mode, expected);
            ts.setPerDirectoryAndNonRelativeNameCacheResult(
                moduleOrTypeRefCache,
                name,
                mode,
                ts.getDirectoryPath(fileName),
                getRedirectReferenceForResolution(),
                expected as unknown as T,
            );
            // Resolution in cache should be same as that is in program
            ts.Debug.assert(
                resolved === getProgramResolutions(name, mode),
                `${projectName}:: ${cacheType} ${fileName} ${name} ${mode} Expected resolution in cache to be matched to that in the program`,
            );
        });
    }

    function collectResolution<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        fileName: ts.Path,
        resolved: T,
        resolvedFileName: string | undefined,
        name: string,
        mode: ts.ResolutionMode,
    ): ExpectedResolution {
        const existing = resolutionToRefs.get(resolved);
        let expectedResolution: ExpectedResolution;
        if (existing) {
            existing.push({ cacheType, fileName, name, mode });
            expectedResolution = resolutionToExpected.get(resolved)!;
        }
        else {
            resolutionToRefs.set(resolved, [{ cacheType, fileName, name, mode }]);
            expectedResolution = {
                resolvedModule: (resolved as any).resolvedModule,
                resolvedTypeReferenceDirective: (resolved as any).resolvedTypeReferenceDirective,
                failedLookupLocations: resolved.failedLookupLocations,
                affectingLocations: resolved.affectingLocations,
                alternateResult: resolved.alternateResult,
                globalCacheResolution: resolved.globalCacheResolution,
                rootDirInfo: resolved.rootDirInfo,
            };
            expectedToResolution.set(expectedResolution, resolved);
            resolutionToExpected.set(resolved, expectedResolution);
        }
        // We are passing redirectedReference as undefined because we want to use existing rootDirInfo
        expected.watchResolution(expectedResolution, fileName, () => ({ resolvedFileName }), /*redirectedReference*/ undefined);
        return expectedResolution;
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
        expected?.forEach(resolution =>
            ts.Debug.assert(
                actual?.has(expectedToResolution.get(resolution as ExpectedResolution)!),
                `${projectName}:: ${caption}:: Expected resolution should be present in actual resolutions`,
            )
        );
        actual?.forEach(resolution =>
            ts.Debug.assert(
                expected?.has(resolutionToExpected.get(resolution)!),
                `${projectName}:: ${caption}:: Actual resolution should be present in expected resolutions`,
            )
        );
    }

    function verifyDirectoryWatchesOfFailedLookups(expected: Map<string, ts.DirectoryWatchesOfFailedLookup>, actual: Map<string, ts.DirectoryWatchesOfFailedLookup>) {
        verifyMap(expected, actual, verifyDirectoryWatchesOfFailedLookup, "directoryWatchesOfFailedLookups");
    }

    function verifyDirectoryWatchesOfFailedLookup(
        expected: ts.DirectoryWatchesOfFailedLookup | undefined,
        actual: ts.DirectoryWatchesOfFailedLookup | undefined,
        caption: string,
    ) {
        ts.Debug.assert(expected?.refCount === actual?.refCount, `${projectName}:: ${caption}:: refCount`);
        ts.Debug.assert(!!expected?.refCount, `${projectName}:: ${caption}:: expected refCount to be non zero`);
        ts.Debug.assert(expected?.nonRecursive === actual?.nonRecursive, `${projectName}:: ${caption}:: nonRecursive`);
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
        ts.Debug.assert(expected?.resolutions === actual?.resolutions, `${projectName}:: ${caption}:: resolutions`);
        ts.Debug.assert(expected?.files === actual?.files, `${projectName}:: ${caption}:: files`);
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
        ts.Debug.assert(expected?.refCount === actual?.refCount, `${projectName}:: ${caption}:: refCount`);
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
        action(expected.moduleResolutionCache, "moduleResolutionCache");
        action(expected.typeReferenceDirectiveResolutionCache, "typeReferenceDirectiveResolutionCache");
        action(expected.libraryResolutionCache, "libraryResolutionCache");
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
                expectedToResolution.get(expectedResolution as ExpectedResolution) === actualResolution :
                // Otherwise in actual cache present because of incremental storage and should be referenced somewhere
                resolutionToExpected.get(actualResolution!) !== undefined,
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
        verifyMap(
            expectedCacheWithRedirects.getOwnMap(),
            actualCacheWithRedirects.getOwnMap(),
            verifyValue,
            `${cacheType}:: ownMap`,
        );
        expectedCacheWithRedirects.redirectsKeyToMap.forEach(
            (expectedCacheWithRedirectsValue, key) =>
                verifyMap(
                    expectedCacheWithRedirectsValue,
                    actualCacheWithRedirects.redirectsKeyToMap.get(key),
                    verifyValue,
                    `${cacheType}:: redirectsKeyToMap:: ${key}`,
                ),
        );
        actualCacheWithRedirects.redirectsKeyToMap.forEach(
            (actualCacheWithRedirectsValue, key) => {
                const expectedCacheWithRedirectsValue = expectedCacheWithRedirects.redirectsKeyToMap.get(key);
                if (expectedCacheWithRedirectsValue) {
                    verifyMap(
                        expectedCacheWithRedirectsValue,
                        actualCacheWithRedirectsValue,
                        verifyValue,
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
    }

    function verifyModuleOrTypeResolutionCacheIsEmpty(
        moduleOrTypeRefCache: ts.ModuleOrTypeReferenceResolutionCache<ts.ResolutionWithFailedLookupLocations>,
        cacheType: string,
        compacted: boolean,
    ) {
        verifyCacheWithRedirectsIsEmpty(
            moduleOrTypeRefCache.directoryToModuleNameMap,
            `${cacheType}:: directoryToModuleNameMap`,
            compacted,
        );
        verifyCacheWithRedirectsIsEmpty(
            moduleOrTypeRefCache.moduleNameToDirectoryMap,
            `${cacheType}:: moduleNameToDirectoryMap`,
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
    }

    function verifyPackageJsonWatchInfo() {
        verifyMap(
            expected.packageJsonRefCount,
            actual.packageJsonRefCount,
            (expectedRefCount, actualRefCount, caption) =>
                ts.Debug.assert(
                    expectedRefCount === actualRefCount,
                    `${projectName}:: ${caption}`,
                ),
            "packageJsonRefCount",
        );
        verifyMap(
            actual.packageJsonRefCount,
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
}

function verifyMap<Key extends string, Expected, Actual>(
    expectedMap: Map<Key, Expected> | undefined,
    actualMap: Map<Key, Actual> | undefined,
    verifyValue: (expectedValue: Expected | undefined, actualValue: Actual | undefined, key: string) => void,
    caption: string,
) {
    expectedMap?.forEach((expectedValue, path) => verifyValue(expectedValue, actualMap?.get(path), `${caption}:: ${path}`));
    actualMap?.forEach((actualValue, path) => verifyValue(expectedMap?.get(path), actualValue, `${caption}:: ${path}`));
}

function verifySet(
    expectedSet: Set<string> | undefined,
    actualSet: Set<string> | undefined,
    caption: string,
) {
    expectedSet?.forEach(expectedValue =>
        ts.Debug.assert(
            actualSet?.has(expectedValue),
            `${caption}:: ${expectedValue} should be present in actual`,
        )
    );
    actualSet?.forEach(actualValue =>
        ts.Debug.assert(
            expectedSet?.has(actualValue),
            `${caption}:: ${actualValue} should be present in expected`,
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
    );
    verifyResolutionCache(project.resolutionCache, project.getCurrentProgram()!, resolutionHostCacheHost, project.projectName);
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

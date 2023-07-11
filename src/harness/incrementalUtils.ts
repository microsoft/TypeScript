import * as ts from "./_namespaces/ts";

export function reportDocumentRegistryStats(documentRegistry: ts.DocumentRegistry) {
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
                entry.forEach((real, kind) => ts.Debug.assert(
                    real.languageServiceRefCount === expected?.get(kind),
                    `Document registry has unexpected language service ref count for ${key} ${path} ${ts.Debug.formatScriptKind(kind)} ${real.languageServiceRefCount}`,
                    reportStats,
                ));
                expected?.forEach((value, kind) => ts.Debug.assert(
                    entry.has(kind),
                    `Document registry expected language service ref count for ${key} ${path} ${ts.Debug.formatScriptKind(kind)} ${value}`,
                    reportStats,
                ));
            }
        });
        statsByPath?.forEach((_value, path) => ts.Debug.assert(
            bucketEntries.has(path),
            `Document registry does not contain entry for ${key}, ${path}`,
            reportStats,
        ));
    });
    stats.forEach((_value, key) => ts.Debug.assert(
        documentRegistry.getBuckets().has(key),
        `Document registry does not contain entry for key: ${key}`,
        reportStats,
    ));

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
interface ResolutionInfo {
    cacheType: string;
    fileName: string;
    name: string;
    mode: ts.ResolutionMode;
}

function getResolutionCacheDetails<T extends ts.ResolutionWithFailedLookupLocations>(
    baseline: string[],
    cacheType: string,
    cache: ts.ModeAwareCache<T> | undefined,
    getResolvedFileName: (resolution: T) => string | undefined,
    indent: string,
) {
    let addedCacheType = false;
    cache?.forEach((resolved, key, mode) => {
        if (!addedCacheType) {
            addedCacheType = true;
            baseline.push(`${indent}${cacheType}:`);
        }
        baseline.push(`${indent}  ${key}: ${mode ? ts.getNameOfCompilerOptionValue(mode, ts.moduleOptionDeclaration.type) + ":" : ""}${getResolvedFileName(resolved)}`);
    });
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
) {
    let addedCacheType = false;
    cache?.forEach((resolved, libFileName) => {
        if (!addedCacheType) {
            addedCacheType = true;
            baseline.push(`${indent}Libs:`);
        }
        baseline.push(`${indent}  ${libFileName}: Actual: ${resolved.actual} Resolution: ${getResolvedModuleFileName(resolved.resolution)}`);
    });
}

function getProgramStructure(program: ts.Program | undefined) {
    const baseline: string[] = [];
    program?.getSourceFiles().slice().sort((f1, f2) => ts.comparePathsCaseSensitive(f1.path, f2.path)).forEach(f => {
        baseline.push(`  File: ${f.fileName} Path: ${f.path} ResolvedPath: ${f.resolvedPath} impliedNodeFormat: ${f.impliedNodeFormat}`);
        baseline.push(f.text.split(/\r?\n/g).map(l => l ? "    " + l : "").join("\n"));
        getResolutionCacheDetails(
            baseline,
            "Modules",
            f.resolvedModules,
            getResolvedModuleFileName,
            "    ",
        );
        getResolutionCacheDetails(
            baseline,
            "TypeRefs",
            f.resolvedTypeReferenceDirectiveNames,
            getResolvedTypeRefFileName,
            "    ",
        );
    });
    getResolutionCacheDetails(
        baseline,
        "AutoTypeRefs",
        program?.getAutomaticTypeDirectiveResolutions(),
        getResolvedTypeRefFileName,
        "  ",
    );
    getLibResolutionCacheDetails(
        baseline,
        program?.resolvedLibReferences,
        "    ",
    );
    return baseline.join("\n");
}

export function verifyProgramStructure(expectedProgram: ts.Program, actualProgram: ts.Program, projectName: string) {
    const actual = getProgramStructure(actualProgram);
    const expected = getProgramStructure(expectedProgram);
    ts.Debug.assert(actual === expected, `Program verification:: ${projectName}`, () => `Program Details::\nExpected:\n${expected}\nActual:\n${actual}`);
}

export function verifyResolutionCache(
    actual: ts.ResolutionCache,
    actualProgram: ts.Program,
    resolutionHostCacheHost: ts.ResolutionCacheHost,
    projectName: string,
    userResolvedModuleNames?: true,
) {
    const currentDirectory = resolutionHostCacheHost.getCurrentDirectory!();
    const expected = ts.createResolutionCache(resolutionHostCacheHost, actual.rootDirForResolution, /*logChangesWhenResolvingModule*/ false);
    expected.startCachingPerDirectoryResolution();

    type ExpectedResolution = ts.CachedResolvedModuleWithFailedLookupLocations & ts.CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations;

    const expectedToResolution = new Map<ExpectedResolution, ts.ResolutionWithFailedLookupLocations>();
    const resolutionToExpected = new Map<ts.ResolutionWithFailedLookupLocations, ExpectedResolution>();
    const resolutionToRefs = new Map<ts.ResolutionWithFailedLookupLocations, ResolutionInfo[]>();
    const inferredTypesPath = resolutionHostCacheHost.toPath(ts.getAutomaticTypeDirectiveContainingFile(actualProgram.getCompilerOptions(), currentDirectory));
    actual.resolvedModuleNames.forEach((resolutions, path) => collectResolutionToRefFromCache(
        "Modules",
        path,
        resolutions,
        getResolvedModuleFileName,
        expected.resolvedModuleNames,
        actualProgram.getSourceFileByPath(path)!.resolvedModules,
    ));
    actual.resolvedTypeReferenceDirectives.forEach((resolutions, path) => collectResolutionToRefFromCache(
        "TypeRefs",
        path,
        resolutions,
        getResolvedTypeRefFileName,
        expected.resolvedTypeReferenceDirectives,
        path !== inferredTypesPath ?
            actualProgram.getSourceFileByPath(path)!.resolvedTypeReferenceDirectiveNames :
            actualProgram.getAutomaticTypeDirectiveResolutions(),
    ));
    actual.resolvedLibraries.forEach((resolved, libFileName) => {
        const expectedResolution = collectResolution(
            "Libs",
            resolutionHostCacheHost.toPath(
                ts.getInferredLibraryNameResolveFrom(actualProgram.getCompilerOptions(), currentDirectory, libFileName)
            ),
            resolved,
            getResolvedModuleFileName(resolved),
            ts.getLibraryNameFromLibFileName(libFileName),
            /*mode*/ undefined,
        );
        expected.resolvedLibraries.set(libFileName, expectedResolution);
    });
    // Check for resolutions in program but not in cache to empty resolutions
    // Resolutions in cache are checked during collection so that we dont need to re-iterate over them
    actualProgram.getSourceFiles().forEach(f => {
        // If this is redirect file, then its not used for resolving module names
        if (f.redirectInfo?.unredirected.fileName === f.fileName) return;
        if (!userResolvedModuleNames && !actual.resolvedModuleNames.has(f.path)) verifyEveryResolutionInCache(/*cache*/ undefined, f.resolvedModules, f.fileName);
        if (!actual.resolvedTypeReferenceDirectives.has(f.path)) verifyEveryResolutionInCache(/*cache*/ undefined, f.resolvedTypeReferenceDirectiveNames, f.fileName);
    });
    if (!actual.resolvedTypeReferenceDirectives.has(inferredTypesPath)) verifyEveryResolutionInCache(/*cache*/ undefined, actualProgram.getAutomaticTypeDirectiveResolutions(), "auto inferred types");

    expected.finishCachingPerDirectoryResolution(actualProgram, /*oldProgram*/ undefined);

    // Verify ref count
    resolutionToRefs.forEach((info, resolution) => {
        ts.Debug.assert(
            resolution.files?.size === info.length,
            `${projectName}:: Expected Resolution ref count ${info.length} but got ${resolution.files?.size}`,
            () => `Expected from:: ${JSON.stringify(info, undefined, " ")}` +
                `Actual from: ${resolution.files?.size} used from ${resolution.files ? JSON.stringify(ts.arrayFrom(resolution.files), undefined, " "): "undefined"}`
        );
        ts.Debug.assert(
            !resolution.isInvalidated,
            `${projectName}:: Resolution should not be invalidated`
        );
        const expected = resolutionToExpected.get(resolution)!;
        verifySet(expected.files, resolution.files, `Resolution files`);
        ts.Debug.assert(
            expected.watchedFailed === resolution.watchedFailed,
            `${projectName}:: Expected watchedFailed of Resolution ${expected.watchedFailed} but got ${resolution.watchedFailed}`
        );
        ts.Debug.assert(
            expected.watchedAffected === resolution.watchedAffected,
            `${projectName}:: Expected watchedAffected of Resolution ${expected.watchedAffected} but got ${resolution.watchedAffected}`
        );
        ts.Debug.assert(
            expected.setAtRoot === resolution.setAtRoot,
            `${projectName}:: Expected setAtRoot of Resolution ${expected.setAtRoot} but got ${resolution.setAtRoot}`
        );
    });
    verifyMapOfResolutionSet(expected.resolvedFileToResolution, actual.resolvedFileToResolution, `resolvedFileToResolution`);
    verifyResolutionSet(expected.resolutionsWithFailedLookups, actual.resolutionsWithFailedLookups, `resolutionsWithFailedLookups`);
    verifyResolutionSet(expected.resolutionsWithOnlyAffectingLocations, actual.resolutionsWithOnlyAffectingLocations, `resolutionsWithOnlyAffectingLocations`);
    verifyDirectoryWatchesOfFailedLookups(expected.directoryWatchesOfFailedLookups, actual.directoryWatchesOfFailedLookups);
    verifyFileWatchesOfAffectingLocations(expected.fileWatchesOfAffectingLocations, actual.fileWatchesOfAffectingLocations);

    // Stop watching resolutions to verify everything gets closed.
    actual.resolvedModuleNames.forEach((_resolutions, path) => expected.removeResolutionsOfFile(path));
    actual.resolvedTypeReferenceDirectives.forEach((_resolutions, path) => expected.removeResolutionsOfFile(path));
    expected.finishCachingPerDirectoryResolution(/*newProgram*/ undefined, actualProgram);

    resolutionToExpected.forEach(expected => ts.Debug.assert(!expected.files?.size, `${projectName}:: Shouldnt ref to any files`));
    ts.Debug.assert(expected.resolvedFileToResolution.size === 0, `${projectName}:: resolvedFileToResolution should be released`);
    ts.Debug.assert(expected.resolutionsWithFailedLookups.size === 0, `${projectName}:: resolutionsWithFailedLookups should be released`);
    ts.Debug.assert(expected.resolutionsWithOnlyAffectingLocations.size === 0, `${projectName}:: resolutionsWithOnlyAffectingLocations should be released`);
    ts.Debug.assert(expected.directoryWatchesOfFailedLookups.size === 0, `${projectName}:: directoryWatchesOfFailedLookups should be released`);
    ts.Debug.assert(expected.fileWatchesOfAffectingLocations.size === 0, `${projectName}:: fileWatchesOfAffectingLocations should be released`);

    function verifyEveryResolutionInCache<T extends ts.ResolutionWithFailedLookupLocations>(
        cache: ts.ModeAwareCache<T> | undefined,
        fromProgramResolutions: ts.ModeAwareCache<T> | undefined,
        fileName: string,
    ) {
        fromProgramResolutions?.forEach((resolved, name, mode) => {
            if (resolved as unknown !== ts.emptyResolution) {
                // Resolutions should match
                ts.Debug.assert(cache?.get(name, mode) === resolved, `${projectName}:: ${name}:: ${mode} Expected resolution to be in cache ${fileName}`);
            }
            else {
                // EmptyResolution is place holder and shouldnt be in the cache
                ts.Debug.assert(!cache?.has(name, mode), `${projectName}:: ${name}:: ${mode} Ambient moduleResolution, should not be watched ${fileName}`);
            }
        });
    }

    function collectResolutionToRefFromCache<T extends ts.ResolutionWithFailedLookupLocations>(
        cacheType: string,
        fileName: ts.Path,
        cache: ts.ModeAwareCache<T> | undefined,
        getResolvedFileName: (resolution: T) => string | undefined,
        storeExpcted: Map<ts.Path, ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations>>,
        fromProgramResolutions: ts.ModeAwareCache<T> | undefined,
    ) {
        ts.Debug.assert(
            actualProgram.getSourceFileByPath(fileName) || inferredTypesPath === fileName,
            `${projectName}:: ${cacheType} ${fileName} Expect cache for file in program or auto type ref`,
        );
        let expectedCache: ts.ModeAwareCache<ts.ResolutionWithFailedLookupLocations> | undefined;
        cache?.forEach((resolved, name, mode) => {
            const resolvedFileName = getResolvedFileName(resolved);
            const expected = collectResolution(cacheType, fileName, resolved, resolvedFileName, name, mode);
            if (!expectedCache) storeExpcted.set(fileName, expectedCache = ts.createModeAwareCache());
            expectedCache.set(name, mode, expected);
            // Resolution in program should be same as in resolution cache
            ts.Debug.assert(resolved === fromProgramResolutions?.get(name, mode));
        });
        verifyEveryResolutionInCache(cache, fromProgramResolutions, fileName);
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
                node10Result: resolved.node10Result,
            };
            expectedToResolution.set(expectedResolution, resolved);
            resolutionToExpected.set(resolved, expectedResolution);
        }
        expected.watchResolution(expectedResolution, fileName, () => ({ resolvedFileName }));
        return expectedResolution;
    }

    function verifyMap<Expected, Actual>(
        expected: Map<string, Expected> | undefined,
        actual: Map<string, Actual> | undefined,
        verifyValue: (expected: Expected | undefined, actual: Actual | undefined, key: string) => void,
        caption: string,
    ) {
        expected?.forEach((expected, path) => verifyValue(expected, actual?.get(path), `${caption}:: ${path}`));
        actual?.forEach((actual, path) => verifyValue(expected?.get(path), actual, `${caption}:: ${path}`));
    }

    function verifySet(
        expected: Set<string> | undefined,
        actual: Set<string> | undefined,
        caption: string,
    ) {
        expected?.forEach(expected => ts.Debug.assert(
            actual?.has(expected),
            `${projectName}:: ${caption}:: Expected should be present in actual`,
        ));
        actual?.forEach(actual => ts.Debug.assert(
            expected?.has(actual),
            `${projectName}:: ${caption}:: Actual should be present in expected`,
        ));
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
        expected?.forEach(resolution => ts.Debug.assert(
            actual?.has(expectedToResolution.get(resolution as ExpectedResolution)!),
            `${projectName}:: ${caption}:: Expected resolution should be present in actual resolutions`,
        ));
        actual?.forEach(resolution => ts.Debug.assert(
            expected?.has(resolutionToExpected.get(resolution)!),
            `${projectName}:: ${caption}:: Actual resolution should be present in expected resolutions`
        ));
    }

    function verifyDirectoryWatchesOfFailedLookups(expected: Map<string, ts.DirectoryWatchesOfFailedLookup>, actual: Map<string, ts.DirectoryWatchesOfFailedLookup>) {
        verifyMap(expected, actual, (expected, actual, caption) => {
            ts.Debug.assert(expected?.refCount === actual?.refCount, `${projectName}:: ${caption}:: refCount`);
            ts.Debug.assert(!!expected?.refCount, `${projectName}:: ${caption}:: expected refCount to be non zero`);
            ts.Debug.assert(expected?.nonRecursive === actual?.nonRecursive, `${projectName}:: ${caption}:: nonRecursive`);
        }, "directoryWatchesOfFailedLookups");
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
    const readFile = compilerHost.readFile;
    compilerHost.readFile = fileName => {
        const path = project.toPath(fileName);
        const info = project.projectService.filenameToScriptInfo.get(path);
        if (info?.isDynamicOrHasMixedContent() || project.fileIsOpen(path)) {
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
    const resolutionHostCacheHost: ts.ResolutionCacheHost = {
        ...compilerHost,

        getCompilerHost: () => compilerHost,
        toPath: project.toPath.bind(project),
        getCompilationSettings: project.getCompilationSettings.bind(project),
        projectName: project.projectName,
        getGlobalCache: project.getGlobalCache.bind(project),
        globalCacheResolutionModuleName: project.globalCacheResolutionModuleName.bind(project),
        fileIsOpen: project.fileIsOpen.bind(project),
        getCurrentProgram: () => project.getCurrentProgram(),

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
            (containingFile, redirectedReference, options) => ts.createModuleResolutionLoaderUsingGlobalCache(
                containingFile,
                redirectedReference,
                options,
                resolutionHostCacheHost,
                moduleResolutionCache,
            ),
        );
    verifyProgramStructure(ts.createProgram({
        rootNames: project.getScriptFileNames(),
        options: project.getCompilationSettings(),
        projectReferences: project.getProjectReferences(),
        host: compilerHost,
    }), project.getCurrentProgram()!, project.projectName);
    verifyResolutionCache(project.resolutionCache, project.getCurrentProgram()!, resolutionHostCacheHost, project.projectName);
}

export function incrementalVerifier(service: ts.server.ProjectService) {
    service.verifyDocumentRegistry = () => verifyDocumentRegistry(service);
    service.verifyProgram = project => verifyProgram(service, project);
}
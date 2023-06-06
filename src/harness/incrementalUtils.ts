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

function verifyResolutionsOfProgram(expectedProgram: ts.Program, project: ts.server.Project) {
    const actualProgram = project.getCurrentProgram();
    const actual = getProgramStructure(actualProgram);
    const expected = getProgramStructure(expectedProgram);
    ts.Debug.assert(actual === expected, `Program verification:: ${project.projectName}`, () => `Program Details::\nExpected:\n${expected}\nActual:\n${actual}`);
}
function indentString(s: string, indent: string) {
    return s.split(/\r?\n/g).map(l => l ? indent + l : "").join("\n");
}
function readableResolutionMode(mode: ts.ResolutionMode, suffix: string) {
    return mode ? ts.getNameOfCompilerOptionValue(mode, ts.moduleOptionDeclaration.type) + suffix : "";
}

function getCacheDetails<T extends ts.ResolvedModuleWithFailedLookupLocations | ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations>(
    baseline: string[],
    cacheType: string,
    cache: ts.ModeAwareCache<T> | undefined,
    getResolvedFileName: (resolution: T) => string | undefined,
    indent: string,
) {
    if (!cache?.size()) return;
    baseline.push(`${indent}${cacheType}:`);
    cache.forEach((resolved, key, mode) =>
        baseline.push(`${indent}  ${key}: ${readableResolutionMode(mode, ":")}${getResolvedFileName(resolved)}`));
}

function getProgramStructure(program: ts.Program | undefined) {
    const baseline: string[] = [];
    program?.getSourceFiles().slice().sort((f1, f2) => ts.comparePathsCaseSensitive(f1.path, f2.path)).forEach(f => {
        baseline.push(`  File: ${f.fileName} Path: ${f.path} ResolvedPath: ${f.resolvedPath} impliedNodeFormat: ${f.impliedNodeFormat}`);
        baseline.push(indentString(f.text, "    "));
        getCacheDetails(baseline, "Modules", f.resolvedModules, r => r.resolvedModule?.resolvedFileName, "    ");
        getCacheDetails(baseline, "TypeRefs", f.resolvedTypeReferenceDirectiveNames, r => r.resolvedTypeReferenceDirective?.resolvedFileName, "    ");
    });
    getCacheDetails(baseline, "AutoTypeRefs", program?.getAutomaticTypeDirectiveResolutions(), r => r.resolvedTypeReferenceDirective?.resolvedFileName, "  ");
    return baseline.join("\n");
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
    // eslint-disable-next-line prefer-const
    let program: ts.Program | undefined;
    const resolutionHostCacheHost: ts.ResolutionCacheHost = {
        ...compilerHost,

        getCompilerHost: () => compilerHost,
        toPath: project.toPath.bind(project),
        getCompilationSettings: project.getCompilationSettings.bind(project),
        projectName: project.projectName,
        getGlobalCache: project.getGlobalCache.bind(project),
        globalCacheResolutionModuleName: project.globalCacheResolutionModuleName.bind(project),
        fileIsOpen: project.fileIsOpen.bind(project),
        getCurrentProgram: () => program,

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
    verifyResolutionsOfProgram(ts.createProgram({
        rootNames: project.getScriptFileNames(),
        options: project.getCompilationSettings(),
        projectReferences: project.getProjectReferences(),
        host: compilerHost,
    }), project);
    // Verify that resolutions watching matches
}

export function incrementalVerifier(service: ts.server.ProjectService) {
    service.verifyDocumentRegistry = () => verifyDocumentRegistry(service);
    service.verifyProgram = project => verifyProgram(service, project);
}
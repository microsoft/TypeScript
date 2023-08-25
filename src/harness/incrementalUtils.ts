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

export function incrementalVerifier(service: ts.server.ProjectService) {
    service.verifyDocumentRegistry = () => verifyDocumentRegistry(service);
}

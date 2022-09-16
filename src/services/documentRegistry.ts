import * as ts from "./_namespaces/ts";

/**
 * The document registry represents a store of SourceFile objects that can be shared between
 * multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
 * of files in the context.
 * SourceFile objects account for most of the memory usage by the language service. Sharing
 * the same DocumentRegistry instance between different instances of LanguageService allow
 * for more efficient memory utilization since all projects will share at least the library
 * file (lib.d.ts).
 *
 * A more advanced use of the document registry is to serialize sourceFile objects to disk
 * and re-hydrate them when needed.
 *
 * To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it
 * to all subsequent createLanguageService calls.
 */
export interface DocumentRegistry {
    /**
     * Request a stored SourceFile with a given fileName and compilationSettings.
     * The first call to acquire will call createLanguageServiceSourceFile to generate
     * the SourceFile if was not found in the registry.
     *
     * @param fileName The name of the file requested
     * @param compilationSettingsOrHost Some compilation settings like target affects the
     * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
     * multiple copies of the same file for different compilation settings. A minimal
     * resolution cache is needed to fully define a source file's shape when
     * the compilation settings include `module: node16`+, so providing a cache host
     * object should be preferred. A common host is a language service `ConfiguredProject`.
     * @param scriptSnapshot Text of the file. Only used if the file was not found
     * in the registry and a new one was created.
     * @param version Current version of the file. Only used if the file was not found
     * in the registry and a new one was created.
     */
    acquireDocument(
        fileName: string,
        compilationSettingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost,
        scriptSnapshot: ts.IScriptSnapshot,
        version: string,
        scriptKind?: ts.ScriptKind,
        sourceFileOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget,
    ): ts.SourceFile;

    acquireDocumentWithKey(
        fileName: string,
        path: ts.Path,
        compilationSettingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: ts.IScriptSnapshot,
        version: string,
        scriptKind?: ts.ScriptKind,
        sourceFileOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget,
    ): ts.SourceFile;

    /**
     * Request an updated version of an already existing SourceFile with a given fileName
     * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
     * to get an updated SourceFile.
     *
     * @param fileName The name of the file requested
     * @param compilationSettingsOrHost Some compilation settings like target affects the
     * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
     * multiple copies of the same file for different compilation settings. A minimal
     * resolution cache is needed to fully define a source file's shape when
     * the compilation settings include `module: node16`+, so providing a cache host
     * object should be preferred. A common host is a language service `ConfiguredProject`.
     * @param scriptSnapshot Text of the file.
     * @param version Current version of the file.
     */
    updateDocument(
        fileName: string,
        compilationSettingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost,
        scriptSnapshot: ts.IScriptSnapshot,
        version: string,
        scriptKind?: ts.ScriptKind,
        sourceFileOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget,
    ): ts.SourceFile;

    updateDocumentWithKey(
        fileName: string,
        path: ts.Path,
        compilationSettingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: ts.IScriptSnapshot,
        version: string,
        scriptKind?: ts.ScriptKind,
        sourceFileOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget,
    ): ts.SourceFile;

    getKeyForCompilationSettings(settings: ts.CompilerOptions): DocumentRegistryBucketKey;
    /**
     * Informs the DocumentRegistry that a file is not needed any longer.
     *
     * Note: It is not allowed to call release on a SourceFile that was not acquired from
     * this registry originally.
     *
     * @param fileName The name of the file to be released
     * @param compilationSettings The compilation settings used to acquire the file
     * @param scriptKind The script kind of the file to be released
     */
    /**@deprecated pass scriptKind and impliedNodeFormat for correctness */
    releaseDocument(fileName: string, compilationSettings: ts.CompilerOptions, scriptKind?: ts.ScriptKind): void;
    /**
     * Informs the DocumentRegistry that a file is not needed any longer.
     *
     * Note: It is not allowed to call release on a SourceFile that was not acquired from
     * this registry originally.
     *
     * @param fileName The name of the file to be released
     * @param compilationSettings The compilation settings used to acquire the file
     * @param scriptKind The script kind of the file to be released
     * @param impliedNodeFormat The implied source file format of the file to be released
     */
    releaseDocument(fileName: string, compilationSettings: ts.CompilerOptions, scriptKind: ts.ScriptKind, impliedNodeFormat: ts.SourceFile["impliedNodeFormat"]): void; // eslint-disable-line @typescript-eslint/unified-signatures
    /**
     * @deprecated pass scriptKind for and impliedNodeFormat correctness */
    releaseDocumentWithKey(path: ts.Path, key: DocumentRegistryBucketKey, scriptKind?: ts.ScriptKind): void;
    releaseDocumentWithKey(path: ts.Path, key: DocumentRegistryBucketKey, scriptKind: ts.ScriptKind, impliedNodeFormat: ts.SourceFile["impliedNodeFormat"]): void; // eslint-disable-line @typescript-eslint/unified-signatures

    /*@internal*/
    getLanguageServiceRefCounts(path: ts.Path, scriptKind: ts.ScriptKind): [string, number | undefined][];

    reportStats(): string;
}

/*@internal*/
export interface ExternalDocumentCache {
    setDocument(key: DocumentRegistryBucketKeyWithMode, path: ts.Path, sourceFile: ts.SourceFile): void;
    getDocument(key: DocumentRegistryBucketKeyWithMode, path: ts.Path): ts.SourceFile | undefined;
}

export type DocumentRegistryBucketKey = string & { __bucketKey: any };

interface DocumentRegistryEntry {
    sourceFile: ts.SourceFile;

    // The number of language services that this source file is referenced in.   When no more
    // language services are referencing the file, then the file can be removed from the
    // registry.
    languageServiceRefCount: number;
}

type BucketEntry = DocumentRegistryEntry | ts.ESMap<ts.ScriptKind, DocumentRegistryEntry>;
function isDocumentRegistryEntry(entry: BucketEntry): entry is DocumentRegistryEntry {
    return !!(entry as DocumentRegistryEntry).sourceFile;
}

export function createDocumentRegistry(useCaseSensitiveFileNames?: boolean, currentDirectory?: string): DocumentRegistry {
    return createDocumentRegistryInternal(useCaseSensitiveFileNames, currentDirectory);
}

/*@internal*/
export type DocumentRegistryBucketKeyWithMode = string & { __documentRegistryBucketKeyWithMode: any; };
/*@internal*/
export function createDocumentRegistryInternal(useCaseSensitiveFileNames?: boolean, currentDirectory = "", externalCache?: ExternalDocumentCache): DocumentRegistry {
    // Maps from compiler setting target (ES3, ES5, etc.) to all the cached documents we have
    // for those settings.
    const buckets = new ts.Map<DocumentRegistryBucketKeyWithMode, ts.ESMap<ts.Path, BucketEntry>>();
    const getCanonicalFileName = ts.createGetCanonicalFileName(!!useCaseSensitiveFileNames);

    function reportStats() {
        const bucketInfoArray = ts.arrayFrom(buckets.keys()).filter(name => name && name.charAt(0) === "_").map(name => {
            const entries = buckets.get(name)!;
            const sourceFiles: { name: string; scriptKind: ts.ScriptKind, refCount: number; }[] = [];
            entries.forEach((entry, name) => {
                if (isDocumentRegistryEntry(entry)) {
                    sourceFiles.push({
                        name,
                        scriptKind: entry.sourceFile.scriptKind,
                        refCount: entry.languageServiceRefCount
                    });
                }
                else {
                    entry.forEach((value, scriptKind) => sourceFiles.push({ name, scriptKind, refCount: value.languageServiceRefCount }));
                }
            });
            sourceFiles.sort((x, y) => y.refCount - x.refCount);
            return {
                bucket: name,
                sourceFiles
            };
        });
        return JSON.stringify(bucketInfoArray, undefined, 2);
    }

    function getCompilationSettings(settingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost) {
        if (typeof settingsOrHost.getCompilationSettings === "function") {
            return (settingsOrHost as ts.MinimalResolutionCacheHost).getCompilationSettings();
        }
        return settingsOrHost as ts.CompilerOptions;
    }

    function acquireDocument(fileName: string, compilationSettings: ts.CompilerOptions | ts.MinimalResolutionCacheHost, scriptSnapshot: ts.IScriptSnapshot, version: string, scriptKind?: ts.ScriptKind, languageVersionOrOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget): ts.SourceFile {
        const path = ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
        return acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind, languageVersionOrOptions);
    }

    function acquireDocumentWithKey(fileName: string, path: ts.Path, compilationSettings: ts.CompilerOptions | ts.MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: ts.IScriptSnapshot, version: string, scriptKind?: ts.ScriptKind, languageVersionOrOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget): ts.SourceFile {
        return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version, /*acquiring*/ true, scriptKind, languageVersionOrOptions);
    }

    function updateDocument(fileName: string, compilationSettings: ts.CompilerOptions | ts.MinimalResolutionCacheHost, scriptSnapshot: ts.IScriptSnapshot, version: string, scriptKind?: ts.ScriptKind, languageVersionOrOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget): ts.SourceFile {
        const path = ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
        return updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind, languageVersionOrOptions);
    }

    function updateDocumentWithKey(fileName: string, path: ts.Path, compilationSettings: ts.CompilerOptions | ts.MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: ts.IScriptSnapshot, version: string, scriptKind?: ts.ScriptKind, languageVersionOrOptions?: ts.CreateSourceFileOptions | ts.ScriptTarget): ts.SourceFile {
        return acquireOrUpdateDocument(fileName, path, getCompilationSettings(compilationSettings), key, scriptSnapshot, version, /*acquiring*/ false, scriptKind, languageVersionOrOptions);
    }

    function getDocumentRegistryEntry(bucketEntry: BucketEntry, scriptKind: ts.ScriptKind | undefined) {
        const entry = isDocumentRegistryEntry(bucketEntry) ? bucketEntry : bucketEntry.get(ts.Debug.checkDefined(scriptKind, "If there are more than one scriptKind's for same document the scriptKind should be provided"));
        ts.Debug.assert(scriptKind === undefined || !entry || entry.sourceFile.scriptKind === scriptKind, `Script kind should match provided ScriptKind:${scriptKind} and sourceFile.scriptKind: ${entry?.sourceFile.scriptKind}, !entry: ${!entry}`);
        return entry;
    }

    function acquireOrUpdateDocument(
        fileName: string,
        path: ts.Path,
        compilationSettingsOrHost: ts.CompilerOptions | ts.MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: ts.IScriptSnapshot,
        version: string,
        acquiring: boolean,
        scriptKind: ts.ScriptKind | undefined,
        languageVersionOrOptions: ts.CreateSourceFileOptions | ts.ScriptTarget | undefined,
    ): ts.SourceFile {
        scriptKind = ts.ensureScriptKind(fileName, scriptKind);
        const compilationSettings = getCompilationSettings(compilationSettingsOrHost);
        const host: ts.MinimalResolutionCacheHost | undefined = compilationSettingsOrHost === compilationSettings ? undefined : compilationSettingsOrHost as ts.MinimalResolutionCacheHost;
        const scriptTarget = scriptKind === ts.ScriptKind.JSON ? ts.ScriptTarget.JSON : ts.getEmitScriptTarget(compilationSettings);
        const sourceFileOptions: ts.CreateSourceFileOptions = typeof languageVersionOrOptions === "object" ?
            languageVersionOrOptions :
            {
                languageVersion: scriptTarget,
                impliedNodeFormat: host && ts.getImpliedNodeFormatForFile(path, host.getCompilerHost?.()?.getModuleResolutionCache?.()?.getPackageJsonInfoCache(), host, compilationSettings),
                setExternalModuleIndicator: ts.getSetExternalModuleIndicator(compilationSettings)
            };
        sourceFileOptions.languageVersion = scriptTarget;
        const oldBucketCount = buckets.size;
        const keyWithMode = getDocumentRegistryBucketKeyWithMode(key, sourceFileOptions.impliedNodeFormat);
        const bucket = ts.getOrUpdate(buckets, keyWithMode, () => new ts.Map());
        if (ts.tracing) {
            if (buckets.size > oldBucketCount) {
                // It is interesting, but not definitively problematic if a build requires multiple document registry buckets -
                // perhaps they are for two projects that don't have any overlap.
                // Bonus: these events can help us interpret the more interesting event below.
                ts.tracing.instant(ts.tracing.Phase.Session, "createdDocumentRegistryBucket", { configFilePath: compilationSettings.configFilePath, key: keyWithMode });
            }

            // It is fairly suspicious to have one path in two buckets - you'd expect dependencies to have similar configurations.
            // If this occurs unexpectedly, the fix is likely to synchronize the project settings.
            // Skip .d.ts files to reduce noise (should also cover most of node_modules).
            const otherBucketKey = !ts.isDeclarationFileName(path) &&
                ts.forEachEntry(buckets, (bucket, bucketKey) => bucketKey !== keyWithMode && bucket.has(path) && bucketKey);
            if (otherBucketKey) {
                ts.tracing.instant(ts.tracing.Phase.Session, "documentRegistryBucketOverlap", { path, key1: otherBucketKey, key2: keyWithMode });
            }
        }

        const bucketEntry = bucket.get(path);
        let entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
        if (!entry && externalCache) {
            const sourceFile = externalCache.getDocument(keyWithMode, path);
            if (sourceFile) {
                ts.Debug.assert(acquiring);
                entry = {
                    sourceFile,
                    languageServiceRefCount: 0
                };
                setBucketEntry();
            }
        }

        if (!entry) {
            // Have never seen this file with these settings.  Create a new source file for it.
            const sourceFile = ts.createLanguageServiceSourceFile(fileName, scriptSnapshot, sourceFileOptions, version, /*setNodeParents*/ false, scriptKind);
            if (externalCache) {
                externalCache.setDocument(keyWithMode, path, sourceFile);
            }
            entry = {
                sourceFile,
                languageServiceRefCount: 1,
            };
            setBucketEntry();
        }
        else {
            // We have an entry for this file.  However, it may be for a different version of
            // the script snapshot.  If so, update it appropriately.  Otherwise, we can just
            // return it as is.
            if (entry.sourceFile.version !== version) {
                entry.sourceFile = ts.updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version,
                    scriptSnapshot.getChangeRange(entry.sourceFile.scriptSnapshot!)); // TODO: GH#18217
                if (externalCache) {
                    externalCache.setDocument(keyWithMode, path, entry.sourceFile);
                }
            }

            // If we're acquiring, then this is the first time this LS is asking for this document.
            // Increase our ref count so we know there's another LS using the document.  If we're
            // not acquiring, then that means the LS is 'updating' the file instead, and that means
            // it has already acquired the document previously.  As such, we do not need to increase
            // the ref count.
            if (acquiring) {
                entry.languageServiceRefCount++;
            }
        }
        ts.Debug.assert(entry.languageServiceRefCount !== 0);

        return entry.sourceFile;

        function setBucketEntry() {
            if (!bucketEntry) {
                bucket.set(path, entry!);
            }
            else if (isDocumentRegistryEntry(bucketEntry)) {
                const scriptKindMap = new ts.Map<ts.ScriptKind, DocumentRegistryEntry>();
                scriptKindMap.set(bucketEntry.sourceFile.scriptKind, bucketEntry);
                scriptKindMap.set(scriptKind!, entry!);
                bucket.set(path, scriptKindMap);
            }
            else {
                bucketEntry.set(scriptKind!, entry!);
            }
        }
    }

    function releaseDocument(fileName: string, compilationSettings: ts.CompilerOptions, scriptKind?: ts.ScriptKind, impliedNodeFormat?: ts.SourceFile["impliedNodeFormat"]): void {
        const path = ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(compilationSettings);
        return releaseDocumentWithKey(path, key, scriptKind, impliedNodeFormat);
    }

    function releaseDocumentWithKey(path: ts.Path, key: DocumentRegistryBucketKey, scriptKind?: ts.ScriptKind, impliedNodeFormat?: ts.SourceFile["impliedNodeFormat"]): void {
        const bucket = ts.Debug.checkDefined(buckets.get(getDocumentRegistryBucketKeyWithMode(key, impliedNodeFormat)));
        const bucketEntry = bucket.get(path)!;
        const entry = getDocumentRegistryEntry(bucketEntry, scriptKind)!;
        entry.languageServiceRefCount--;

        ts.Debug.assert(entry.languageServiceRefCount >= 0);
        if (entry.languageServiceRefCount === 0) {
            if (isDocumentRegistryEntry(bucketEntry)) {
                bucket.delete(path);
            }
            else {
                bucketEntry.delete(scriptKind!);
                if (bucketEntry.size === 1) {
                    bucket.set(path, ts.firstDefinedIterator(bucketEntry.values(), ts.identity)!);
                }
            }
        }
    }

    function getLanguageServiceRefCounts(path: ts.Path, scriptKind: ts.ScriptKind) {
        return ts.arrayFrom(buckets.entries(), ([key, bucket]): [string, number | undefined] => {
            const bucketEntry = bucket.get(path);
            const entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
            return [key, entry && entry.languageServiceRefCount];
        });
    }

    return {
        acquireDocument,
        acquireDocumentWithKey,
        updateDocument,
        updateDocumentWithKey,
        releaseDocument,
        releaseDocumentWithKey,
        getLanguageServiceRefCounts,
        reportStats,
        getKeyForCompilationSettings
    };
}

function compilerOptionValueToString(value: unknown): string {
    if (value === null || typeof value !== "object") { // eslint-disable-line no-null/no-null
        return "" + value;
    }
    if (ts.isArray(value)) {
        return `[${ts.map(value, e => compilerOptionValueToString(e))?.join(",")}]`;
    }
    let str = "{";
    for (const key in value) {
        if (ts.hasProperty(value, key)) {
            str += `${key}: ${compilerOptionValueToString((value as any)[key])}`;
        }
    }
    return str + "}";
}

function getKeyForCompilationSettings(settings: ts.CompilerOptions): DocumentRegistryBucketKey {
    return ts.sourceFileAffectingCompilerOptions.map(option => compilerOptionValueToString(ts.getCompilerOptionValue(settings, option))).join("|") + (settings.pathsBasePath ? `|${settings.pathsBasePath}` : undefined) as DocumentRegistryBucketKey;
}

function getDocumentRegistryBucketKeyWithMode(key: DocumentRegistryBucketKey, mode: ts.ModuleKind.ESNext | ts.ModuleKind.CommonJS | undefined) {
    return (mode ? `${key}|${mode}` : key) as DocumentRegistryBucketKeyWithMode;
}

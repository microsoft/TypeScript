import {
    arrayFrom,
    CompilerOptions,
    createGetCanonicalFileName,
    createLanguageServiceSourceFile,
    CreateSourceFileOptions,
    Debug,
    ensureScriptKind,
    firstDefinedIterator,
    forEachEntry,
    getEmitScriptTarget,
    getImpliedNodeFormatForFile,
    getKeyForCompilerOptions,
    getOrUpdate,
    getSetExternalModuleIndicator,
    getSnapshotText,
    identity,
    IScriptSnapshot,
    isDeclarationFileName,
    JSDocParsingMode,
    MinimalResolutionCacheHost,
    Path,
    ResolutionMode,
    ScriptKind,
    ScriptTarget,
    SourceFile,
    sourceFileAffectingCompilerOptions,
    toPath,
    tracing,
    updateLanguageServiceSourceFile,
} from "./_namespaces/ts.js";

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
        compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost,
        scriptSnapshot: IScriptSnapshot,
        version: string,
        scriptKind?: ScriptKind,
        sourceFileOptions?: CreateSourceFileOptions | ScriptTarget,
    ): SourceFile;

    acquireDocumentWithKey(
        fileName: string,
        path: Path,
        compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: IScriptSnapshot,
        version: string,
        scriptKind?: ScriptKind,
        sourceFileOptions?: CreateSourceFileOptions | ScriptTarget,
    ): SourceFile;

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
        compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost,
        scriptSnapshot: IScriptSnapshot,
        version: string,
        scriptKind?: ScriptKind,
        sourceFileOptions?: CreateSourceFileOptions | ScriptTarget,
    ): SourceFile;

    updateDocumentWithKey(
        fileName: string,
        path: Path,
        compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: IScriptSnapshot,
        version: string,
        scriptKind?: ScriptKind,
        sourceFileOptions?: CreateSourceFileOptions | ScriptTarget,
    ): SourceFile;

    getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey;
    /** @internal */
    getDocumentRegistryBucketKeyWithMode(key: DocumentRegistryBucketKey, mode: ResolutionMode): DocumentRegistryBucketKeyWithMode;
    /**
     * Informs the DocumentRegistry that a file is not needed any longer.
     *
     * Note: It is not allowed to call release on a SourceFile that was not acquired from
     * this registry originally.
     *
     * @param fileName The name of the file to be released
     * @param compilationSettings The compilation settings used to acquire the file
     * @param scriptKind The script kind of the file to be released
     *
     * @deprecated pass scriptKind and impliedNodeFormat for correctness
     */
    releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind?: ScriptKind): void;
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
    releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind: ScriptKind, impliedNodeFormat: ResolutionMode): void; // eslint-disable-line @typescript-eslint/unified-signatures
    /**
     * @deprecated pass scriptKind for and impliedNodeFormat correctness */
    releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind?: ScriptKind): void;
    releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind: ScriptKind, impliedNodeFormat: ResolutionMode): void; // eslint-disable-line @typescript-eslint/unified-signatures

    reportStats(): string;
    /** @internal */ getBuckets(): Map<DocumentRegistryBucketKeyWithMode, Map<Path, BucketEntry>>;
}

/** @internal */
export interface ExternalDocumentCache {
    setDocument(key: DocumentRegistryBucketKeyWithMode, path: Path, sourceFile: SourceFile): void;
    getDocument(key: DocumentRegistryBucketKeyWithMode, path: Path): SourceFile | undefined;
}

export type DocumentRegistryBucketKey = string & { __bucketKey: any; };

/** @internal */
export interface DocumentRegistryEntry {
    sourceFile: SourceFile;

    // The number of language services that this source file is referenced in.   When no more
    // language services are referencing the file, then the file can be removed from the
    // registry.
    languageServiceRefCount: number;
}

/** @internal */
export type BucketEntry = DocumentRegistryEntry | Map<ScriptKind, DocumentRegistryEntry>;
/** @internal */
export function isDocumentRegistryEntry(entry: BucketEntry): entry is DocumentRegistryEntry {
    return !!(entry as DocumentRegistryEntry).sourceFile;
}

export function createDocumentRegistry(useCaseSensitiveFileNames?: boolean, currentDirectory?: string, jsDocParsingMode?: JSDocParsingMode): DocumentRegistry {
    return createDocumentRegistryInternal(useCaseSensitiveFileNames, currentDirectory, jsDocParsingMode);
}

/** @internal */
export type DocumentRegistryBucketKeyWithMode = string & { __documentRegistryBucketKeyWithMode: any; };
/** @internal */
export function createDocumentRegistryInternal(useCaseSensitiveFileNames?: boolean, currentDirectory = "", jsDocParsingMode?: JSDocParsingMode, externalCache?: ExternalDocumentCache): DocumentRegistry {
    // Maps from compiler setting target (ES3, ES5, etc.) to all the cached documents we have
    // for those settings.
    const buckets = new Map<DocumentRegistryBucketKeyWithMode, Map<Path, BucketEntry>>();
    const getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);

    function reportStats() {
        const bucketInfoArray = arrayFrom(buckets.keys()).filter(name => name && name.charAt(0) === "_").map(name => {
            const entries = buckets.get(name)!;
            const sourceFiles: { name: string; scriptKind: ScriptKind; refCount: number; }[] = [];
            entries.forEach((entry, name) => {
                if (isDocumentRegistryEntry(entry)) {
                    sourceFiles.push({
                        name,
                        scriptKind: entry.sourceFile.scriptKind,
                        refCount: entry.languageServiceRefCount,
                    });
                }
                else {
                    entry.forEach((value, scriptKind) => sourceFiles.push({ name, scriptKind, refCount: value.languageServiceRefCount }));
                }
            });
            sourceFiles.sort((x, y) => y.refCount - x.refCount);
            return {
                bucket: name,
                sourceFiles,
            };
        });
        return JSON.stringify(bucketInfoArray, undefined, 2);
    }

    function getCompilationSettings(settingsOrHost: CompilerOptions | MinimalResolutionCacheHost) {
        if (typeof settingsOrHost.getCompilationSettings === "function") {
            return (settingsOrHost as MinimalResolutionCacheHost).getCompilationSettings();
        }
        return settingsOrHost as CompilerOptions;
    }

    function acquireDocument(fileName: string, compilationSettings: CompilerOptions | MinimalResolutionCacheHost, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, languageVersionOrOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile {
        const path = toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
        return acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind, languageVersionOrOptions);
    }

    function acquireDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions | MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, languageVersionOrOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile {
        return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version, /*acquiring*/ true, scriptKind, languageVersionOrOptions);
    }

    function updateDocument(fileName: string, compilationSettings: CompilerOptions | MinimalResolutionCacheHost, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, languageVersionOrOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile {
        const path = toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
        return updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind, languageVersionOrOptions);
    }

    function updateDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions | MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, languageVersionOrOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile {
        return acquireOrUpdateDocument(fileName, path, getCompilationSettings(compilationSettings), key, scriptSnapshot, version, /*acquiring*/ false, scriptKind, languageVersionOrOptions);
    }

    function getDocumentRegistryEntry(bucketEntry: BucketEntry, scriptKind: ScriptKind | undefined) {
        const entry = isDocumentRegistryEntry(bucketEntry) ? bucketEntry : bucketEntry.get(Debug.checkDefined(scriptKind, "If there are more than one scriptKind's for same document the scriptKind should be provided"));
        Debug.assert(scriptKind === undefined || !entry || entry.sourceFile.scriptKind === scriptKind, `Script kind should match provided ScriptKind:${scriptKind} and sourceFile.scriptKind: ${entry?.sourceFile.scriptKind}, !entry: ${!entry}`);
        return entry;
    }

    function acquireOrUpdateDocument(
        fileName: string,
        path: Path,
        compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost,
        key: DocumentRegistryBucketKey,
        scriptSnapshot: IScriptSnapshot,
        version: string,
        acquiring: boolean,
        scriptKind: ScriptKind | undefined,
        languageVersionOrOptions: CreateSourceFileOptions | ScriptTarget | undefined,
    ): SourceFile {
        scriptKind = ensureScriptKind(fileName, scriptKind);
        const compilationSettings = getCompilationSettings(compilationSettingsOrHost);
        const host: MinimalResolutionCacheHost | undefined = compilationSettingsOrHost === compilationSettings ? undefined : compilationSettingsOrHost as MinimalResolutionCacheHost;
        const scriptTarget = scriptKind === ScriptKind.JSON ? ScriptTarget.JSON : getEmitScriptTarget(compilationSettings);
        const sourceFileOptions: CreateSourceFileOptions = typeof languageVersionOrOptions === "object" ?
            languageVersionOrOptions :
            {
                languageVersion: scriptTarget,
                impliedNodeFormat: host && getImpliedNodeFormatForFile(path, host.getCompilerHost?.()?.getModuleResolutionCache?.()?.getPackageJsonInfoCache(), host, compilationSettings),
                setExternalModuleIndicator: getSetExternalModuleIndicator(compilationSettings),
                jsDocParsingMode,
            };
        sourceFileOptions.languageVersion = scriptTarget;
        Debug.assertEqual(jsDocParsingMode, sourceFileOptions.jsDocParsingMode);
        const oldBucketCount = buckets.size;
        const keyWithMode = getDocumentRegistryBucketKeyWithMode(key, sourceFileOptions.impliedNodeFormat);
        const bucket = getOrUpdate(buckets, keyWithMode, () => new Map());
        if (tracing) {
            if (buckets.size > oldBucketCount) {
                // It is interesting, but not definitively problematic if a build requires multiple document registry buckets -
                // perhaps they are for two projects that don't have any overlap.
                // Bonus: these events can help us interpret the more interesting event below.
                tracing.instant(tracing.Phase.Session, "createdDocumentRegistryBucket", { configFilePath: compilationSettings.configFilePath, key: keyWithMode });
            }

            // It is fairly suspicious to have one path in two buckets - you'd expect dependencies to have similar configurations.
            // If this occurs unexpectedly, the fix is likely to synchronize the project settings.
            // Skip .d.ts files to reduce noise (should also cover most of node_modules).
            const otherBucketKey = !isDeclarationFileName(path) &&
                forEachEntry(buckets, (bucket, bucketKey) => bucketKey !== keyWithMode && bucket.has(path) && bucketKey);
            if (otherBucketKey) {
                tracing.instant(tracing.Phase.Session, "documentRegistryBucketOverlap", { path, key1: otherBucketKey, key2: keyWithMode });
            }
        }

        const bucketEntry = bucket.get(path);
        let entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
        if (!entry && externalCache) {
            const sourceFile = externalCache.getDocument(keyWithMode, path);
            if (sourceFile && sourceFile.scriptKind === scriptKind && sourceFile.text === getSnapshotText(scriptSnapshot)) {
                Debug.assert(acquiring);
                entry = {
                    sourceFile,
                    languageServiceRefCount: 0,
                };
                setBucketEntry();
            }
        }

        if (!entry) {
            // Have never seen this file with these settings.  Create a new source file for it.
            const sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, sourceFileOptions, version, /*setNodeParents*/ false, scriptKind);
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
                entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version, scriptSnapshot.getChangeRange(entry.sourceFile.scriptSnapshot));
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
        Debug.assert(entry.languageServiceRefCount !== 0);

        return entry.sourceFile;

        function setBucketEntry() {
            if (!bucketEntry) {
                bucket.set(path, entry);
            }
            else if (isDocumentRegistryEntry(bucketEntry)) {
                const scriptKindMap = new Map<ScriptKind, DocumentRegistryEntry>();
                scriptKindMap.set(bucketEntry.sourceFile.scriptKind, bucketEntry);
                scriptKindMap.set(scriptKind!, entry);
                bucket.set(path, scriptKindMap);
            }
            else {
                bucketEntry.set(scriptKind!, entry);
            }
        }
    }

    function releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind?: ScriptKind, impliedNodeFormat?: ResolutionMode): void {
        const path = toPath(fileName, currentDirectory, getCanonicalFileName);
        const key = getKeyForCompilationSettings(compilationSettings);
        return releaseDocumentWithKey(path, key, scriptKind, impliedNodeFormat);
    }

    function releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind?: ScriptKind, impliedNodeFormat?: ResolutionMode): void {
        const bucket = Debug.checkDefined(buckets.get(getDocumentRegistryBucketKeyWithMode(key, impliedNodeFormat)));
        const bucketEntry = bucket.get(path)!;
        const entry = getDocumentRegistryEntry(bucketEntry, scriptKind)!;
        entry.languageServiceRefCount--;

        Debug.assert(entry.languageServiceRefCount >= 0);
        if (entry.languageServiceRefCount === 0) {
            if (isDocumentRegistryEntry(bucketEntry)) {
                bucket.delete(path);
            }
            else {
                bucketEntry.delete(scriptKind!);
                if (bucketEntry.size === 1) {
                    bucket.set(path, firstDefinedIterator(bucketEntry.values(), identity)!);
                }
            }
        }
    }

    return {
        acquireDocument,
        acquireDocumentWithKey,
        updateDocument,
        updateDocumentWithKey,
        releaseDocument,
        releaseDocumentWithKey,
        getKeyForCompilationSettings,
        getDocumentRegistryBucketKeyWithMode,
        reportStats,
        getBuckets: () => buckets,
    };
}

function getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey {
    return getKeyForCompilerOptions(settings, sourceFileAffectingCompilerOptions) as DocumentRegistryBucketKey;
}

function getDocumentRegistryBucketKeyWithMode(key: DocumentRegistryBucketKey, mode: ResolutionMode) {
    return (mode ? `${key}|${mode}` : key) as DocumentRegistryBucketKeyWithMode;
}

namespace ts {
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
         * @param compilationSettings Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings.
         * @param scriptSnapshot Text of the file. Only used if the file was not found
         * in the registry and a new one was created.
         * @param version Current version of the file. Only used if the file was not found
         * in the registry and a new one was created.
         */
        acquireDocument(
            fileName: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            scriptKind?: ScriptKind): SourceFile;

        acquireDocumentWithKey(
            fileName: string,
            path: Path,
            compilationSettings: CompilerOptions,
            key: DocumentRegistryBucketKey,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            scriptKind?: ScriptKind): SourceFile;

        /**
         * Request an updated version of an already existing SourceFile with a given fileName
         * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
         * to get an updated SourceFile.
         *
         * @param fileName The name of the file requested
         * @param compilationSettings Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings.
         * @param scriptSnapshot Text of the file.
         * @param version Current version of the file.
         */
        updateDocument(
            fileName: string,
            compilationSettings: CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            scriptKind?: ScriptKind): SourceFile;

        updateDocumentWithKey(
            fileName: string,
            path: Path,
            compilationSettings: CompilerOptions,
            key: DocumentRegistryBucketKey,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            scriptKind?: ScriptKind): SourceFile;

        getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey;
        /**
         * Informs the DocumentRegistry that a file is not needed any longer.
         *
         * Note: It is not allowed to call release on a SourceFile that was not acquired from
         * this registry originally.
         *
         * @param fileName The name of the file to be released
         * @param compilationSettings The compilation settings used to acquire the file
         */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions): void;

        releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey): void;

        /*@internal*/
        getLanguageServiceRefCounts(path: Path): [string, number | undefined][];

        reportStats(): string;
    }

    /*@internal*/
    export interface ExternalDocumentCache {
        setDocument(key: DocumentRegistryBucketKey, path: Path, sourceFile: SourceFile): void;
        getDocument(key: DocumentRegistryBucketKey, path: Path): SourceFile | undefined;
    }

    export type DocumentRegistryBucketKey = string & { __bucketKey: any };

    interface DocumentRegistryEntry {
        sourceFile: SourceFile;

        // The number of language services that this source file is referenced in.   When no more
        // language services are referencing the file, then the file can be removed from the
        // registry.
        languageServiceRefCount: number;
    }

    export function createDocumentRegistry(useCaseSensitiveFileNames?: boolean, currentDirectory?: string): DocumentRegistry {
        return createDocumentRegistryInternal(useCaseSensitiveFileNames, currentDirectory);
    }

    /*@internal*/
    export function createDocumentRegistryInternal(useCaseSensitiveFileNames?: boolean, currentDirectory = "", externalCache?: ExternalDocumentCache): DocumentRegistry {
        // Maps from compiler setting target (ES3, ES5, etc.) to all the cached documents we have
        // for those settings.
        const buckets = new Map<string, Map<Path, DocumentRegistryEntry>>();
        const getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);

        function reportStats() {
            const bucketInfoArray = arrayFrom(buckets.keys()).filter(name => name && name.charAt(0) === "_").map(name => {
                const entries = buckets.get(name)!;
                const sourceFiles: { name: string; refCount: number; }[] = [];
                entries.forEach((entry, name) => {
                    sourceFiles.push({
                        name,
                        refCount: entry.languageServiceRefCount
                    });
                });
                sourceFiles.sort((x, y) => y.refCount - x.refCount);
                return {
                    bucket: name,
                    sourceFiles
                };
            });
            return JSON.stringify(bucketInfoArray, undefined, 2);
        }

        function acquireDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const key = getKeyForCompilationSettings(compilationSettings);
            return acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind);
        }

        function acquireDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile {
            return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version, /*acquiring*/ true, scriptKind);
        }

        function updateDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const key = getKeyForCompilationSettings(compilationSettings);
            return updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind);
        }

        function updateDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile {
            return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version, /*acquiring*/ false, scriptKind);
        }

        function acquireOrUpdateDocument(
            fileName: string,
            path: Path,
            compilationSettings: CompilerOptions,
            key: DocumentRegistryBucketKey,
            scriptSnapshot: IScriptSnapshot,
            version: string,
            acquiring: boolean,
            scriptKind?: ScriptKind): SourceFile {

            const bucket = getOrUpdate(buckets, key, () => new Map<Path, DocumentRegistryEntry>());
            let entry = bucket.get(path);
            const scriptTarget = scriptKind === ScriptKind.JSON ? ScriptTarget.JSON : compilationSettings.target || ScriptTarget.ES5;
            if (!entry && externalCache) {
                const sourceFile = externalCache.getDocument(key, path);
                if (sourceFile) {
                    Debug.assert(acquiring);
                    entry = {
                        sourceFile,
                        languageServiceRefCount: 0
                    };
                    bucket.set(path, entry);
                }
            }

            if (!entry) {
                // Have never seen this file with these settings.  Create a new source file for it.
                const sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, scriptTarget, version, /*setNodeParents*/ false, scriptKind);
                if (externalCache) {
                    externalCache.setDocument(key, path, sourceFile);
                }
                entry = {
                    sourceFile,
                    languageServiceRefCount: 1,
                };
                bucket.set(path, entry);
            }
            else {
                // We have an entry for this file.  However, it may be for a different version of
                // the script snapshot.  If so, update it appropriately.  Otherwise, we can just
                // return it as is.
                if (entry.sourceFile.version !== version) {
                    entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version,
                        scriptSnapshot.getChangeRange(entry.sourceFile.scriptSnapshot!)); // TODO: GH#18217
                    if (externalCache) {
                        externalCache.setDocument(key, path, entry.sourceFile);
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
        }

        function releaseDocument(fileName: string, compilationSettings: CompilerOptions): void {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const key = getKeyForCompilationSettings(compilationSettings);
            return releaseDocumentWithKey(path, key);
        }

        function releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey): void {
            const bucket = Debug.checkDefined(buckets.get(key));
            const entry = bucket.get(path)!;
            entry.languageServiceRefCount--;

            Debug.assert(entry.languageServiceRefCount >= 0);
            if (entry.languageServiceRefCount === 0) {
                bucket.delete(path);
            }
        }

        function getLanguageServiceRefCounts(path: Path) {
            return arrayFrom(buckets.entries(), ([key, bucket]): [string, number | undefined] => {
                const entry = bucket.get(path);
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

    function getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey {
        return sourceFileAffectingCompilerOptions.map(option => getCompilerOptionValue(settings, option)).join("|") as DocumentRegistryBucketKey;
    }
}

/// <reference path="builderState.ts" />

/*@internal*/
namespace ts {
    export enum BuilderKind {
        BuilderKindSemanticDiagnostics,
        BuilderKindEmitAndSemanticDiagnostics
    }

    interface BuilderStateWithChangedFiles extends BuilderState {
        /**
         * Cache of semantic diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile: Map<ReadonlyArray<Diagnostic>> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet: Map<true>;
        /**
         * Set of affected files being iterated
         */
        affectedFiles: ReadonlyArray<SourceFile> | undefined;
        /**
         * Current index to retrieve affected file from
         */
        affectedFilesIndex: number | undefined;
        /**
         * Current changed file for iterating over affected files
         */
        currentChangedFilePath: Path | undefined;
        /**
         * Map of file signatures, with key being file path, calculated while getting current changed file's affected files
         * These will be commited whenever the iteration through affected files of current changed file is complete
         */
        currentAffectedFilesSignatures: Map<string> | undefined;
        /**
         * Already seen affected files
         */
        seenAffectedFiles: Map<true> | undefined;
    }

    function hasSameKeys<T, U>(map1: ReadonlyMap<T> | undefined, map2: ReadonlyMap<U> | undefined) {
        if (map1 === undefined) {
            return map2 === undefined;
        }
        if (map2 === undefined) {
            return map1 === undefined;
        }
        // Has same size and every key is present in both maps
        return map1.size === map2.size && !forEachKey(map1, key => !map2.has(key));
    }

    /**
     * Create the state so that we can iterate on changedFiles/affected files
     */
    function createBuilderStateWithChangedFiles(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState?: Readonly<BuilderStateWithChangedFiles>): BuilderStateWithChangedFiles {
        const state = BuilderState.create(newProgram, getCanonicalFileName, oldState) as BuilderStateWithChangedFiles;
        const compilerOptions = newProgram.getCompilerOptions();
        if (!compilerOptions.outFile && !compilerOptions.out) {
            state.semanticDiagnosticsPerFile = createMap<ReadonlyArray<Diagnostic>>();
        }
        state.changedFilesSet = createMap<true>();
        const useOldState = BuilderState.canReuseOldState(state.referencedMap, oldState);
        const canCopySemanticDiagnostics = useOldState && oldState.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile;
        if (useOldState) {
            // Verify the sanity of old state
            if (!oldState.currentChangedFilePath) {
                Debug.assert(!oldState.affectedFiles && (!oldState.currentAffectedFilesSignatures || !oldState.currentAffectedFilesSignatures.size), "Cannot reuse if only few affected files of currentChangedFile were iterated");
            }
            if (canCopySemanticDiagnostics) {
                Debug.assert(!forEachKey(oldState.changedFilesSet, path => oldState.semanticDiagnosticsPerFile.has(path)), "Semantic diagnostics shouldnt be available for changed files");
            }

            // Copy old state's changed files set
            copyEntries(oldState.changedFilesSet, state.changedFilesSet);
        }

        // Update changed files and copy semantic diagnostics if we can
        const referencedMap = state.referencedMap;
        const oldReferencedMap = useOldState && oldState.referencedMap;
        state.fileInfos.forEach((info, sourceFilePath) => {
            let oldInfo: Readonly<BuilderState.FileInfo>;
            let newReferences: BuilderState.ReferencedSet;

            // if not using old state, every file is changed
            if (!useOldState ||
                // File wasnt present in old state
                !(oldInfo = oldState.fileInfos.get(sourceFilePath)) ||
                // versions dont match
                oldInfo.version !== info.version ||
                // Referenced files changed
                !hasSameKeys(newReferences = referencedMap && referencedMap.get(sourceFilePath), oldReferencedMap && oldReferencedMap.get(sourceFilePath)) ||
                // Referenced file was deleted in the new program
                newReferences && forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState.fileInfos.has(path))) {
                // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
                state.changedFilesSet.set(sourceFilePath, true);
            }
            else if (canCopySemanticDiagnostics) {
                // Unchanged file copy diagnostics
                const diagnostics = oldState.semanticDiagnosticsPerFile.get(sourceFilePath);
                if (diagnostics) {
                    state.semanticDiagnosticsPerFile.set(sourceFilePath, diagnostics);
                }
            }
        });

        return state;
    }

    export function createBuilder(host: BuilderHost, builderKind: BuilderKind.BuilderKindSemanticDiagnostics): SemanticDiagnosticsBuilder;
    export function createBuilder(host: BuilderHost, builderKind: BuilderKind.BuilderKindEmitAndSemanticDiagnostics): EmitAndSemanticDiagnosticsBuilder;
    export function createBuilder(host: BuilderHost, builderKind: BuilderKind) {
        /**
         * Create the canonical file name for identity
         */
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        /**
         * Computing hash to for signature verification
         */
        const computeHash = host.createHash || identity;
        let state: BuilderStateWithChangedFiles;

        switch (builderKind) {
            case BuilderKind.BuilderKindSemanticDiagnostics:
                return getSemanticDiagnosticsBuilder();
            case BuilderKind.BuilderKindEmitAndSemanticDiagnostics:
                return getEmitAndSemanticDiagnosticsBuilder();
            default:
                notImplemented();
        }

        function getSemanticDiagnosticsBuilder(): SemanticDiagnosticsBuilder {
            return {
                updateProgram,
                getAllDependencies,
                getSemanticDiagnosticsOfNextAffectedFile,
                getSemanticDiagnostics
            };
        }

        function getEmitAndSemanticDiagnosticsBuilder(): EmitAndSemanticDiagnosticsBuilder {
            return {
                updateProgram,
                getAllDependencies,
                emitNextAffectedFile,
                getSemanticDiagnostics
            };
        }

        /**
         * Update current state to reflect new program
         * Updates changed files, references, file infos etc which happens through the state callbacks
         */
        function updateProgram(newProgram: Program) {
            state = createBuilderStateWithChangedFiles(newProgram, getCanonicalFileName, state);
        }

        /**
         * This function returns the next affected file to be processed.
         * Note that until doneAffected is called it would keep reporting same result
         * This is to allow the callers to be able to actually remove affected file only when the operation is complete
         * eg. if during diagnostics check cancellation token ends up cancelling the request, the affected file should be retained
         */
        function getNextAffectedFile(programOfThisState: Program, cancellationToken: CancellationToken | undefined): SourceFile | Program | undefined {
            while (true) {
                const { affectedFiles } = state;
                if (affectedFiles) {
                    const { seenAffectedFiles, semanticDiagnosticsPerFile } = state;
                    let { affectedFilesIndex } = state;
                    while (affectedFilesIndex < affectedFiles.length) {
                        const affectedFile = affectedFiles[affectedFilesIndex];
                        if (!seenAffectedFiles.has(affectedFile.path)) {
                            // Set the next affected file as seen and remove the cached semantic diagnostics
                            state.affectedFilesIndex = affectedFilesIndex;
                            semanticDiagnosticsPerFile.delete(affectedFile.path);
                            return affectedFile;
                        }
                        seenAffectedFiles.set(affectedFile.path, true);
                        affectedFilesIndex++;
                    }

                    // Remove the changed file from the change set
                    state.changedFilesSet.delete(state.currentChangedFilePath);
                    state.currentChangedFilePath = undefined;
                    // Commit the changes in file signature
                    BuilderState.updateSignaturesFromCache(state, state.currentAffectedFilesSignatures);
                    state.currentAffectedFilesSignatures.clear();
                    state.affectedFiles = undefined;
                }

                // Get next changed file
                const nextKey = state.changedFilesSet.keys().next();
                if (nextKey.done) {
                    // Done
                    return undefined;
                }

                const compilerOptions = programOfThisState.getCompilerOptions();
                // With --out or --outFile all outputs go into single file
                // so operations are performed directly on program, return program
                if (compilerOptions.outFile || compilerOptions.out) {
                    Debug.assert(!state.semanticDiagnosticsPerFile);
                    return programOfThisState;
                }

                // Get next batch of affected files
                state.currentAffectedFilesSignatures = state.currentAffectedFilesSignatures || createMap();
                state.affectedFiles = BuilderState.getFilesAffectedBy(state, programOfThisState, nextKey.value as Path, cancellationToken, computeHash, state.currentAffectedFilesSignatures);
                state.currentChangedFilePath = nextKey.value as Path;
                state.semanticDiagnosticsPerFile.delete(nextKey.value as Path);
                state.affectedFilesIndex = 0;
                state.seenAffectedFiles = state.seenAffectedFiles || createMap<true>();
            }
        }

        /**
         * This is called after completing operation on the next affected file.
         * The operations here are postponed to ensure that cancellation during the iteration is handled correctly
         */
        function doneWithAffectedFile(programOfThisState: Program, affected: SourceFile | Program) {
            if (affected === programOfThisState) {
                state.changedFilesSet.clear();
            }
            else {
                state.seenAffectedFiles.set((affected as SourceFile).path, true);
                state.affectedFilesIndex++;
            }
        }

        /**
         * Returns the result with affected file
         */
        function toAffectedFileResult<T>(programOfThisState: Program, result: T, affected: SourceFile | Program): AffectedFileResult<T> {
            doneWithAffectedFile(programOfThisState, affected);
            return { result, affected };
        }

        /**
         * Emits the next affected file, and returns the EmitResult along with source files emitted
         * Returns undefined when iteration is complete
         */
        function emitNextAffectedFile(programOfThisState: Program, writeFileCallback: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult> {
            const affectedFile = getNextAffectedFile(programOfThisState, cancellationToken);
            if (!affectedFile) {
                // Done
                return undefined;
            }
            else if (affectedFile === programOfThisState) {
                // When whole program is affected, do emit only once (eg when --out or --outFile is specified)
                return toAffectedFileResult(
                    programOfThisState,
                    programOfThisState.emit(/*targetSourceFile*/ undefined, writeFileCallback, cancellationToken, /*emitOnlyDtsFiles*/ false, customTransformers),
                    programOfThisState
                );
            }

            // Emit the affected file
            const targetSourceFile = affectedFile as SourceFile;
            return toAffectedFileResult(
                programOfThisState,
                programOfThisState.emit(targetSourceFile, writeFileCallback, cancellationToken, /*emitOnlyDtsFiles*/ false, customTransformers),
                targetSourceFile
            );
        }

        /**
         * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
         * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
         */
        function getSemanticDiagnosticsOfNextAffectedFile(programOfThisState: Program, cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<ReadonlyArray<Diagnostic>> {
            while (true) {
                const affectedFile = getNextAffectedFile(programOfThisState, cancellationToken);
                if (!affectedFile) {
                    // Done
                    return undefined;
                }
                else if (affectedFile === programOfThisState) {
                    // When whole program is affected, get all semantic diagnostics (eg when --out or --outFile is specified)
                    return toAffectedFileResult(
                        programOfThisState,
                        programOfThisState.getSemanticDiagnostics(/*targetSourceFile*/ undefined, cancellationToken),
                        programOfThisState
                    );
                }

                // Get diagnostics for the affected file if its not ignored
                const targetSourceFile = affectedFile as SourceFile;
                if (ignoreSourceFile && ignoreSourceFile(targetSourceFile)) {
                    // Get next affected file
                    doneWithAffectedFile(programOfThisState, targetSourceFile);
                    continue;
                }

                return toAffectedFileResult(
                    programOfThisState,
                    getSemanticDiagnosticsOfFile(programOfThisState, targetSourceFile, cancellationToken),
                    targetSourceFile
                );
            }
        }

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files
         */
        function getSemanticDiagnostics(programOfThisState: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
            Debug.assert(!state.affectedFiles || state.affectedFiles[state.affectedFilesIndex - 1] !== sourceFile || !state.semanticDiagnosticsPerFile.has(sourceFile.path));
            const compilerOptions = programOfThisState.getCompilerOptions();
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                // We dont need to cache the diagnostics just return them from program
                return programOfThisState.getSemanticDiagnostics(sourceFile, cancellationToken);
            }

            if (sourceFile) {
                return getSemanticDiagnosticsOfFile(programOfThisState, sourceFile, cancellationToken);
            }

            let diagnostics: Diagnostic[];
            for (const sourceFile of programOfThisState.getSourceFiles()) {
                diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(programOfThisState, sourceFile, cancellationToken));
            }
            return diagnostics || emptyArray;
        }

        /**
         * Gets the semantic diagnostics either from cache if present, or otherwise from program and caches it
         * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files/changed file set
         */
        function getSemanticDiagnosticsOfFile(program: Program, sourceFile: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
            const path = sourceFile.path;
            const cachedDiagnostics = state.semanticDiagnosticsPerFile.get(path);
            // Report the semantic diagnostics from the cache if we already have those diagnostics present
            if (cachedDiagnostics) {
                return cachedDiagnostics;
            }

            // Diagnostics werent cached, get them from program, and cache the result
            const diagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
            state.semanticDiagnosticsPerFile.set(path, diagnostics);
            return diagnostics;
        }

        /**
         * Get all the dependencies of the sourceFile
         */
        function getAllDependencies(programOfThisState: Program, sourceFile: SourceFile) {
            return BuilderState.getAllDependencies(state, programOfThisState, sourceFile);
        }
    }
}

namespace ts {
    export type AffectedFileResult<T> = { result: T; affected: SourceFile | Program; } | undefined;

    export interface BuilderHost {
        /**
         * return true if file names are treated with case sensitivity
         */
        useCaseSensitiveFileNames(): boolean;
        /**
         * If provided this would be used this hash instead of actual file shape text for detecting changes
         */
        createHash?: (data: string) => string;
    }

    /**
     * Builder to manage the program state changes
     */
    export interface BaseBuilder {
        /**
         * Updates the program in the builder to represent new state
         */
        updateProgram(newProgram: Program): void;

        /**
         * Get all the dependencies of the file
         */
        getAllDependencies(programOfThisState: Program, sourceFile: SourceFile): ReadonlyArray<string>;
    }

    /**
     * The builder that caches the semantic diagnostics for the program and handles the changed files and affected files
     */
    export interface SemanticDiagnosticsBuilder extends BaseBuilder {
        /**
         * Gets the semantic diagnostics from the program for the next affected file and caches it
         * Returns undefined if the iteration is complete
         */
        getSemanticDiagnosticsOfNextAffectedFile(programOfThisState: Program, cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<ReadonlyArray<Diagnostic>>;

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that the when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         */
        getSemanticDiagnostics(programOfThisState: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
    }

    /**
     * The builder that can handle the changes in program and iterate through changed file to emit the files
     * The semantic diagnostics are cached per file and managed by clearing for the changed/affected files
     */
    export interface EmitAndSemanticDiagnosticsBuilder extends BaseBuilder {
        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         */
        emitNextAffectedFile(programOfThisState: Program, writeFileCallback: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that the when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         */
        getSemanticDiagnostics(programOfThisState: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
    }

    /**
     * Create the builder to manage semantic diagnostics and cache them
     */
    export function createSemanticDiagnosticsBuilder(host: BuilderHost): SemanticDiagnosticsBuilder {
        return createBuilder(host, BuilderKind.BuilderKindSemanticDiagnostics);
    }

    /**
     * Create the builder that can handle the changes in program and iterate through changed files
     * to emit the those files and manage semantic diagnostics cache as well
     */
    export function createEmitAndSemanticDiagnosticsBuilder(host: BuilderHost): EmitAndSemanticDiagnosticsBuilder {
        return createBuilder(host, BuilderKind.BuilderKindEmitAndSemanticDiagnostics);
    }
}

/// <reference path="builderState.ts" />

/*@internal*/
namespace ts {
    export enum BuilderKind {
        BuilderKindSemanticDiagnostics,
        BuilderKindEmitAndSemanticDiagnostics
    }

    export function createBuilder(host: BuilderHost, builderKind: BuilderKind.BuilderKindSemanticDiagnostics): SemanticDiagnosticsBuilder;
    export function createBuilder(host: BuilderHost, builderKind: BuilderKind.BuilderKindEmitAndSemanticDiagnostics): EmitAndSemanticDiagnosticsBuilder;
    export function createBuilder(host: BuilderHost, builderKind: BuilderKind) {
        /**
         * State corresponding to all the file references and shapes of the module etc
         */
        const state = createBuilderState({
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
            createHash: host.createHash,
            onUpdateProgramInitialized,
            onSourceFileAdd: addToChangedFilesSet,
            onSourceFileChanged: path => { addToChangedFilesSet(path); deleteSemanticDiagnostics(path); },
            onSourceFileRemoved: deleteSemanticDiagnostics
        });

        /**
         * Cache of semantic diagnostics for files with their Path being the key
         */
        const semanticDiagnosticsPerFile = createMap<ReadonlyArray<Diagnostic>>();

        /**
         * The map has key by source file's path that has been changed
         */
        const changedFilesSet = createMap<true>();

        /**
         * Set of affected files being iterated
         */
        let affectedFiles: ReadonlyArray<SourceFile> | undefined;
        /**
         * Current index to retrieve affected file from
         */
        let affectedFilesIndex = 0;
        /**
         * Current changed file for iterating over affected files
         */
        let currentChangedFilePath: Path | undefined;
        /**
         * Map of file signatures, with key being file path, calculated while getting current changed file's affected files
         * These will be commited whenever the iteration through affected files of current changed file is complete
         */
        const currentAffectedFilesSignatures = createMap<string>();
        /**
         * Already seen affected files
         */
        const seenAffectedFiles = createMap<true>();

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
         * Initialize changedFiles, affected files set, cached diagnostics, signatures
         */
        function onUpdateProgramInitialized(isModuleEmitChanged: boolean) {
            if (isModuleEmitChanged) {
                // Changes in the module emit, clear out everything and initialize as if first time

                // Clear file information and semantic diagnostics
                semanticDiagnosticsPerFile.clear();

                // Clear changed files and affected files information
                changedFilesSet.clear();
                affectedFiles = undefined;
                currentChangedFilePath = undefined;
                currentAffectedFilesSignatures.clear();
            }
            else {
                if (currentChangedFilePath) {
                    // Remove the diagnostics for all the affected files since we should resume the state such that
                    // the whole iteration on currentChangedFile never happened
                    affectedFiles.forEach(sourceFile => deleteSemanticDiagnostics(sourceFile.path));
                    affectedFiles = undefined;
                    currentAffectedFilesSignatures.clear();
                }
                else {
                    // Verify the sanity of old state
                    Debug.assert(!affectedFiles && !currentAffectedFilesSignatures.size, "Cannot reuse if only few affected files of currentChangedFile were iterated");
                }
                Debug.assert(!forEachKey(changedFilesSet, path => semanticDiagnosticsPerFile.has(path)), "Semantic diagnostics shouldnt be available for changed files");
            }
        }

        /**
         * Add file to the changed files set
         */
        function addToChangedFilesSet(path: Path) {
            changedFilesSet.set(path, true);
        }

        function deleteSemanticDiagnostics(path: Path) {
            semanticDiagnosticsPerFile.delete(path);
        }

        /**
         * Update current state to reflect new program
         * Updates changed files, references, file infos etc which happens through the state callbacks
         */
        function updateProgram(newProgram: Program) {
            state.updateProgram(newProgram);
        }

        /**
         * This function returns the next affected file to be processed.
         * Note that until doneAffected is called it would keep reporting same result
         * This is to allow the callers to be able to actually remove affected file only when the operation is complete
         * eg. if during diagnostics check cancellation token ends up cancelling the request, the affected file should be retained
         */
        function getNextAffectedFile(programOfThisState: Program, cancellationToken: CancellationToken | undefined): SourceFile | Program | undefined {
            while (true) {
                if (affectedFiles) {
                    while (affectedFilesIndex < affectedFiles.length) {
                        const affectedFile = affectedFiles[affectedFilesIndex];
                        if (!seenAffectedFiles.has(affectedFile.path)) {
                            // Set the next affected file as seen and remove the cached semantic diagnostics
                            semanticDiagnosticsPerFile.delete(affectedFile.path);
                            return affectedFile;
                        }
                        seenAffectedFiles.set(affectedFile.path, true);
                        affectedFilesIndex++;
                    }

                    // Remove the changed file from the change set
                    changedFilesSet.delete(currentChangedFilePath);
                    currentChangedFilePath = undefined;
                    // Commit the changes in file signature
                    state.updateSignaturesFromCache(currentAffectedFilesSignatures);
                    currentAffectedFilesSignatures.clear();
                    affectedFiles = undefined;
                }

                // Get next changed file
                const nextKey = changedFilesSet.keys().next();
                if (nextKey.done) {
                    // Done
                    return undefined;
                }

                const compilerOptions = programOfThisState.getCompilerOptions();
                // With --out or --outFile all outputs go into single file
                // so operations are performed directly on program, return program
                if (compilerOptions.outFile || compilerOptions.out) {
                    Debug.assert(semanticDiagnosticsPerFile.size === 0);
                    return programOfThisState;
                }

                // Get next batch of affected files
                currentAffectedFilesSignatures.clear();
                affectedFiles = state.getFilesAffectedBy(programOfThisState, nextKey.value as Path, cancellationToken, currentAffectedFilesSignatures);
                currentChangedFilePath = nextKey.value as Path;
                semanticDiagnosticsPerFile.delete(currentChangedFilePath);
                affectedFilesIndex = 0;
            }
        }

        /**
         * This is called after completing operation on the next affected file.
         * The operations here are postponed to ensure that cancellation during the iteration is handled correctly
         */
        function doneWithAffectedFile(programOfThisState: Program, affected: SourceFile | Program) {
            if (affected === programOfThisState) {
                changedFilesSet.clear();
            }
            else {
                seenAffectedFiles.set((<SourceFile>affected).path, true);
                affectedFilesIndex++;
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
            Debug.assert(!affectedFiles || affectedFiles[affectedFilesIndex - 1] !== sourceFile || !semanticDiagnosticsPerFile.has(sourceFile.path));
            const compilerOptions = programOfThisState.getCompilerOptions();
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(semanticDiagnosticsPerFile.size === 0);
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
            const cachedDiagnostics = semanticDiagnosticsPerFile.get(path);
            // Report the semantic diagnostics from the cache if we already have those diagnostics present
            if (cachedDiagnostics) {
                return cachedDiagnostics;
            }

            // Diagnostics werent cached, get them from program, and cache the result
            const diagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
            semanticDiagnosticsPerFile.set(path, diagnostics);
            return diagnostics;
        }

        /**
         * Get all the dependencies of the sourceFile
         */
        function getAllDependencies(programOfThisState: Program, sourceFile: SourceFile) {
            return state.getAllDependencies(programOfThisState, sourceFile);
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

/*@internal*/
namespace ts {
    /**
     * State to store the changed files, affected files and cache semantic diagnostics
     */
    // TODO: GH#18217 Properties of this interface are frequently asserted to be defined.
    export interface BuilderProgramState extends BuilderState {
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
         * These will be committed whenever the iteration through affected files of current changed file is complete
         */
        currentAffectedFilesSignatures: Map<string> | undefined;
        /**
         * Newly computed visible to outside referencedSet
         */
        currentAffectedFilesExportedModulesMap: BuilderState.ComputingExportedModulesMap | undefined;
        /**
         * Already seen affected files
         */
        seenAffectedFiles: Map<true> | undefined;
        /**
         * whether this program has cleaned semantic diagnostics cache for lib files
         */
        cleanedDiagnosticsOfLibFiles?: boolean;
        /**
         * True if the semantic diagnostics were copied from the old state
         */
        semanticDiagnosticsFromOldState?: Map<true>;
        /**
         * program corresponding to this state
         */
        program: Program | undefined;
        /**
         * compilerOptions for the program
         */
        compilerOptions: CompilerOptions;
        /**
         * Files pending to be emitted
         */
        affectedFilesPendingEmit: ReadonlyArray<Path> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex: number | undefined;
        /**
         * Already seen affected files
         */
        seenEmittedFiles: Map<true> | undefined;
        /**
         * true if program has been emitted
         */
        programEmitComplete?: true;
    }

    function hasSameKeys<T, U>(map1: ReadonlyMap<T> | undefined, map2: ReadonlyMap<U> | undefined): boolean {
        // Has same size and every key is present in both maps
        return map1 as ReadonlyMap<T | U> === map2 || map1 !== undefined && map2 !== undefined && map1.size === map2.size && !forEachKey(map1, key => !map2.has(key));
    }

    /**
     * Create the state so that we can iterate on changedFiles/affected files
     */
    function createBuilderProgramState(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState?: Readonly<BuilderProgramState>): BuilderProgramState {
        const state = BuilderState.create(newProgram, getCanonicalFileName, oldState) as BuilderProgramState;
        state.program = newProgram;
        const compilerOptions = newProgram.getCompilerOptions();
        state.compilerOptions = compilerOptions;
        // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
        // With --isolatedModules, emitting changed file doesnt emit dependent files so we cant know of dependent files to retrieve errors so dont cache the errors
        if (!compilerOptions.outFile && !compilerOptions.out && !compilerOptions.isolatedModules) {
            state.semanticDiagnosticsPerFile = createMap<ReadonlyArray<Diagnostic>>();
        }
        state.changedFilesSet = createMap<true>();

        const useOldState = BuilderState.canReuseOldState(state.referencedMap, oldState);
        const oldCompilerOptions = useOldState ? oldState!.compilerOptions : undefined;
        const canCopySemanticDiagnostics = useOldState && oldState!.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile &&
            !compilerOptionsAffectSemanticDiagnostics(compilerOptions, oldCompilerOptions!);
        if (useOldState) {
            // Verify the sanity of old state
            if (!oldState!.currentChangedFilePath) {
                const affectedSignatures = oldState!.currentAffectedFilesSignatures;
                Debug.assert(!oldState!.affectedFiles && (!affectedSignatures || !affectedSignatures.size), "Cannot reuse if only few affected files of currentChangedFile were iterated");
            }
            if (canCopySemanticDiagnostics) {
                Debug.assert(!forEachKey(oldState!.changedFilesSet, path => oldState!.semanticDiagnosticsPerFile!.has(path)), "Semantic diagnostics shouldnt be available for changed files");
            }

            // Copy old state's changed files set
            copyEntries(oldState!.changedFilesSet, state.changedFilesSet);
            if (!compilerOptions.outFile && !compilerOptions.out && oldState!.affectedFilesPendingEmit) {
                state.affectedFilesPendingEmit = oldState!.affectedFilesPendingEmit;
                state.affectedFilesPendingEmitIndex = oldState!.affectedFilesPendingEmitIndex;
            }
        }

        // Update changed files and copy semantic diagnostics if we can
        const referencedMap = state.referencedMap;
        const oldReferencedMap = useOldState ? oldState!.referencedMap : undefined;
        const copyDeclarationFileDiagnostics = canCopySemanticDiagnostics && !compilerOptions.skipLibCheck === !oldCompilerOptions!.skipLibCheck;
        const copyLibFileDiagnostics = copyDeclarationFileDiagnostics && !compilerOptions.skipDefaultLibCheck === !oldCompilerOptions!.skipDefaultLibCheck;
        state.fileInfos.forEach((info, sourceFilePath) => {
            let oldInfo: Readonly<BuilderState.FileInfo> | undefined;
            let newReferences: BuilderState.ReferencedSet | undefined;

            // if not using old state, every file is changed
            if (!useOldState ||
                // File wasnt present in old state
                !(oldInfo = oldState!.fileInfos.get(sourceFilePath)) ||
                // versions dont match
                oldInfo.version !== info.version ||
                // Referenced files changed
                !hasSameKeys(newReferences = referencedMap && referencedMap.get(sourceFilePath), oldReferencedMap && oldReferencedMap.get(sourceFilePath)) ||
                // Referenced file was deleted in the new program
                newReferences && forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState!.fileInfos.has(path))) {
                // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
                state.changedFilesSet.set(sourceFilePath, true);
            }
            else if (canCopySemanticDiagnostics) {
                const sourceFile = newProgram.getSourceFileByPath(sourceFilePath as Path)!;

                if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics) { return; }
                if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics) { return; }

                // Unchanged file copy diagnostics
                const diagnostics = oldState!.semanticDiagnosticsPerFile!.get(sourceFilePath);
                if (diagnostics) {
                    state.semanticDiagnosticsPerFile!.set(sourceFilePath, diagnostics);
                    if (!state.semanticDiagnosticsFromOldState) {
                        state.semanticDiagnosticsFromOldState = createMap<true>();
                    }
                    state.semanticDiagnosticsFromOldState.set(sourceFilePath, true);
                }
            }
        });

        return state;
    }

    /**
     * Releases program and other related not needed properties
     */
    function releaseCache(state: BuilderProgramState) {
        BuilderState.releaseCache(state);
        state.program = undefined;
    }

    /**
     * Creates a clone of the state
     */
    function cloneBuilderProgramState(state: Readonly<BuilderProgramState>): BuilderProgramState {
        const newState = BuilderState.clone(state) as BuilderProgramState;
        newState.semanticDiagnosticsPerFile = cloneMapOrUndefined(state.semanticDiagnosticsPerFile);
        newState.changedFilesSet = cloneMap(state.changedFilesSet);
        newState.affectedFiles = state.affectedFiles;
        newState.affectedFilesIndex = state.affectedFilesIndex;
        newState.currentChangedFilePath = state.currentChangedFilePath;
        newState.currentAffectedFilesSignatures = cloneMapOrUndefined(state.currentAffectedFilesSignatures);
        newState.currentAffectedFilesExportedModulesMap = cloneMapOrUndefined(state.currentAffectedFilesExportedModulesMap);
        newState.seenAffectedFiles = cloneMapOrUndefined(state.seenAffectedFiles);
        newState.cleanedDiagnosticsOfLibFiles = state.cleanedDiagnosticsOfLibFiles;
        newState.semanticDiagnosticsFromOldState = cloneMapOrUndefined(state.semanticDiagnosticsFromOldState);
        newState.program = state.program;
        newState.compilerOptions = state.compilerOptions;
        newState.affectedFilesPendingEmit = state.affectedFilesPendingEmit;
        newState.affectedFilesPendingEmitIndex = state.affectedFilesPendingEmitIndex;
        newState.seenEmittedFiles = cloneMapOrUndefined(state.seenEmittedFiles);
        newState.programEmitComplete = state.programEmitComplete;
        return newState;
    }

    /**
     * Verifies that source file is ok to be used in calls that arent handled by next
     */
    function assertSourceFileOkWithoutNextAffectedCall(state: BuilderProgramState, sourceFile: SourceFile | undefined) {
        Debug.assert(!sourceFile || !state.affectedFiles || state.affectedFiles[state.affectedFilesIndex! - 1] !== sourceFile || !state.semanticDiagnosticsPerFile!.has(sourceFile.path));
    }

    /**
     * This function returns the next affected file to be processed.
     * Note that until doneAffected is called it would keep reporting same result
     * This is to allow the callers to be able to actually remove affected file only when the operation is complete
     * eg. if during diagnostics check cancellation token ends up cancelling the request, the affected file should be retained
     */
    function getNextAffectedFile(state: BuilderProgramState, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash): SourceFile | Program | undefined {
        while (true) {
            const { affectedFiles } = state;
            if (affectedFiles) {
                const seenAffectedFiles = state.seenAffectedFiles!;
                let affectedFilesIndex = state.affectedFilesIndex!; // TODO: GH#18217
                while (affectedFilesIndex < affectedFiles.length) {
                    const affectedFile = affectedFiles[affectedFilesIndex];
                    if (!seenAffectedFiles.has(affectedFile.path)) {
                        // Set the next affected file as seen and remove the cached semantic diagnostics
                        state.affectedFilesIndex = affectedFilesIndex;
                        cleanSemanticDiagnosticsOfAffectedFile(state, affectedFile);
                        return affectedFile;
                    }
                    seenAffectedFiles.set(affectedFile.path, true);
                    affectedFilesIndex++;
                }

                // Remove the changed file from the change set
                state.changedFilesSet.delete(state.currentChangedFilePath!);
                state.currentChangedFilePath = undefined;
                // Commit the changes in file signature
                BuilderState.updateSignaturesFromCache(state, state.currentAffectedFilesSignatures!);
                state.currentAffectedFilesSignatures!.clear();
                BuilderState.updateExportedFilesMapFromCache(state, state.currentAffectedFilesExportedModulesMap);
                state.affectedFiles = undefined;
            }

            // Get next changed file
            const nextKey = state.changedFilesSet.keys().next();
            if (nextKey.done) {
                // Done
                return undefined;
            }

            // With --out or --outFile all outputs go into single file
            // so operations are performed directly on program, return program
            const program = Debug.assertDefined(state.program);
            const compilerOptions = program.getCompilerOptions();
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                return program;
            }

            // Get next batch of affected files
            state.currentAffectedFilesSignatures = state.currentAffectedFilesSignatures || createMap();
            if (state.exportedModulesMap) {
                state.currentAffectedFilesExportedModulesMap = state.currentAffectedFilesExportedModulesMap || createMap<BuilderState.ReferencedSet | false>();
            }
            state.affectedFiles = BuilderState.getFilesAffectedBy(state, program, nextKey.value as Path, cancellationToken, computeHash, state.currentAffectedFilesSignatures, state.currentAffectedFilesExportedModulesMap);
            state.currentChangedFilePath = nextKey.value as Path;
            state.affectedFilesIndex = 0;
            state.seenAffectedFiles = state.seenAffectedFiles || createMap<true>();
        }
    }

    /**
     * Returns next file to be emitted from files that retrieved semantic diagnostics but did not emit yet
     */
    function getNextAffectedFilePendingEmit(state: BuilderProgramState): SourceFile | undefined {
        const { affectedFilesPendingEmit } = state;
        if (affectedFilesPendingEmit) {
            const seenEmittedFiles = state.seenEmittedFiles || (state.seenEmittedFiles = createMap());
            for (let i = state.affectedFilesPendingEmitIndex!; i < affectedFilesPendingEmit.length; i++) {
                const affectedFile = Debug.assertDefined(state.program).getSourceFileByPath(affectedFilesPendingEmit[i]);
                if (affectedFile && !seenEmittedFiles.has(affectedFile.path)) {
                    // emit this file
                    state.affectedFilesPendingEmitIndex = i;
                    return affectedFile;
                }
            }
            state.affectedFilesPendingEmit = undefined;
            state.affectedFilesPendingEmitIndex = undefined;
        }
        return undefined;
    }

    /**
     * Remove the semantic diagnostics cached from old state for affected File and the files that are referencing modules that export entities from affected file
     */
    function cleanSemanticDiagnosticsOfAffectedFile(state: BuilderProgramState, affectedFile: SourceFile) {
        if (removeSemanticDiagnosticsOf(state, affectedFile.path)) {
            // If there are no more diagnostics from old cache, done
            return;
        }

        // Clean lib file diagnostics if its all files excluding default files to emit
        if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles && !state.cleanedDiagnosticsOfLibFiles) {
            state.cleanedDiagnosticsOfLibFiles = true;
            const program = Debug.assertDefined(state.program);
            const options = program.getCompilerOptions();
            if (forEach(program.getSourceFiles(), f =>
                program.isSourceFileDefaultLibrary(f) &&
                !skipTypeChecking(f, options) &&
                removeSemanticDiagnosticsOf(state, f.path)
            )) {
                return;
            }
        }

        // If there was change in signature for the changed file,
        // then delete the semantic diagnostics for files that are affected by using exports of this module

        if (!state.exportedModulesMap || state.affectedFiles!.length === 1 || !state.changedFilesSet.has(affectedFile.path)) {
            return;
        }

        Debug.assert(!!state.currentAffectedFilesExportedModulesMap);
        const seenFileAndExportsOfFile = createMap<true>();
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.currentAffectedFilesExportedModulesMap!, (exportedModules, exportedFromPath) =>
            exportedModules &&
            exportedModules.has(affectedFile.path) &&
            removeSemanticDiagnosticsOfFilesReferencingPath(state, exportedFromPath as Path, seenFileAndExportsOfFile)
        )) {
            return;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        forEachEntry(state.exportedModulesMap, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(affectedFile.path) &&
            removeSemanticDiagnosticsOfFilesReferencingPath(state, exportedFromPath as Path, seenFileAndExportsOfFile)
        );
    }

    /**
     * removes the semantic diagnostics of files referencing referencedPath and
     * returns true if there are no more semantic diagnostics from old state
     */
    function removeSemanticDiagnosticsOfFilesReferencingPath(state: BuilderProgramState, referencedPath: Path, seenFileAndExportsOfFile: Map<true>) {
        return forEachEntry(state.referencedMap!, (referencesInFile, filePath) =>
            referencesInFile.has(referencedPath) && removeSemanticDiagnosticsOfFileAndExportsOfFile(state, filePath as Path, seenFileAndExportsOfFile)
        );
    }

    /**
     * Removes semantic diagnostics of file and anything that exports this file
     */
    function removeSemanticDiagnosticsOfFileAndExportsOfFile(state: BuilderProgramState, filePath: Path, seenFileAndExportsOfFile: Map<true>): boolean {
        if (!addToSeen(seenFileAndExportsOfFile, filePath)) {
            return false;
        }

        if (removeSemanticDiagnosticsOf(state, filePath)) {
            // If there are no more diagnostics from old cache, done
            return true;
        }

        Debug.assert(!!state.currentAffectedFilesExportedModulesMap);
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.currentAffectedFilesExportedModulesMap!, (exportedModules, exportedFromPath) =>
            exportedModules &&
            exportedModules.has(filePath) &&
            removeSemanticDiagnosticsOfFileAndExportsOfFile(state, exportedFromPath as Path, seenFileAndExportsOfFile)
        )) {
            return true;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.exportedModulesMap!, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(filePath) &&
            removeSemanticDiagnosticsOfFileAndExportsOfFile(state, exportedFromPath as Path, seenFileAndExportsOfFile)
        )) {
            return true;
        }

        // Remove diagnostics of files that import this file (without going to exports of referencing files)
        return !!forEachEntry(state.referencedMap!, (referencesInFile, referencingFilePath) =>
            referencesInFile.has(filePath) &&
            !seenFileAndExportsOfFile.has(referencingFilePath) && // Not already removed diagnostic file
            removeSemanticDiagnosticsOf(state, referencingFilePath as Path) // Dont add to seen since this is not yet done with the export removal
        );
    }

    /**
     * Removes semantic diagnostics for path and
     * returns true if there are no more semantic diagnostics from the old state
     */
    function removeSemanticDiagnosticsOf(state: BuilderProgramState, path: Path) {
        if (!state.semanticDiagnosticsFromOldState) {
            return true;
        }
        state.semanticDiagnosticsFromOldState.delete(path);
        state.semanticDiagnosticsPerFile!.delete(path);
        return !state.semanticDiagnosticsFromOldState.size;
    }

    /**
     * This is called after completing operation on the next affected file.
     * The operations here are postponed to ensure that cancellation during the iteration is handled correctly
     */
    function doneWithAffectedFile(state: BuilderProgramState, affected: SourceFile | Program, isPendingEmit?: boolean) {
        if (affected === state.program) {
            state.changedFilesSet.clear();
            state.programEmitComplete = true;
        }
        else {
            state.seenAffectedFiles!.set((affected as SourceFile).path, true);
            if (isPendingEmit) {
                state.affectedFilesPendingEmitIndex!++;
            }
            else {
                state.affectedFilesIndex!++;
            }
        }
    }

    /**
     * Returns the result with affected file
     */
    function toAffectedFileResult<T>(state: BuilderProgramState, result: T, affected: SourceFile | Program, isPendingEmit?: boolean): AffectedFileResult<T> {
        doneWithAffectedFile(state, affected, isPendingEmit);
        return { result, affected };
    }

    /**
     * Gets the semantic diagnostics either from cache if present, or otherwise from program and caches it
     * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files/changed file set
     */
    function getSemanticDiagnosticsOfFile(state: BuilderProgramState, sourceFile: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
        const path = sourceFile.path;
        if (state.semanticDiagnosticsPerFile) {
            const cachedDiagnostics = state.semanticDiagnosticsPerFile.get(path);
            // Report the semantic diagnostics from the cache if we already have those diagnostics present
            if (cachedDiagnostics) {
                return cachedDiagnostics;
            }
        }

        // Diagnostics werent cached, get them from program, and cache the result
        const diagnostics = Debug.assertDefined(state.program).getSemanticDiagnostics(sourceFile, cancellationToken);
        if (state.semanticDiagnosticsPerFile) {
            state.semanticDiagnosticsPerFile.set(path, diagnostics);
        }
        return diagnostics;
    }

    export enum BuilderProgramKind {
        SemanticDiagnosticsBuilderProgram,
        EmitAndSemanticDiagnosticsBuilderProgram
    }

    export interface BuilderCreationParameters {
        newProgram: Program;
        host: BuilderProgramHost;
        oldProgram: BuilderProgram | undefined;
        configFileParsingDiagnostics: ReadonlyArray<Diagnostic>;
    }

    export function getBuilderCreationParameters(newProgramOrRootNames: Program | ReadonlyArray<string> | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: BuilderProgram | CompilerHost, configFileParsingDiagnosticsOrOldProgram?: ReadonlyArray<Diagnostic> | BuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>): BuilderCreationParameters {
        let host: BuilderProgramHost;
        let newProgram: Program;
        let oldProgram: BuilderProgram;
        if (newProgramOrRootNames === undefined) {
            Debug.assert(hostOrOptions === undefined);
            host = oldProgramOrHost as CompilerHost;
            oldProgram = configFileParsingDiagnosticsOrOldProgram as BuilderProgram;
            Debug.assert(!!oldProgram);
            newProgram = oldProgram.getProgram();
        }
        else if (isArray(newProgramOrRootNames)) {
            oldProgram = configFileParsingDiagnosticsOrOldProgram as BuilderProgram;
            newProgram = createProgram({
                rootNames: newProgramOrRootNames,
                options: hostOrOptions as CompilerOptions,
                host: oldProgramOrHost as CompilerHost,
                oldProgram: oldProgram && oldProgram.getProgramOrUndefined(),
                configFileParsingDiagnostics,
                projectReferences
            });
            host = oldProgramOrHost as CompilerHost;
        }
        else {
            newProgram = newProgramOrRootNames;
            host = hostOrOptions as BuilderProgramHost;
            oldProgram = oldProgramOrHost as BuilderProgram;
            configFileParsingDiagnostics = configFileParsingDiagnosticsOrOldProgram as ReadonlyArray<Diagnostic>;
        }
        return { host, newProgram, oldProgram, configFileParsingDiagnostics: configFileParsingDiagnostics || emptyArray };
    }

    export function createBuilderProgram(kind: BuilderProgramKind.SemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): SemanticDiagnosticsBuilderProgram;
    export function createBuilderProgram(kind: BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): EmitAndSemanticDiagnosticsBuilderProgram;
    export function createBuilderProgram(kind: BuilderProgramKind, { newProgram, host, oldProgram, configFileParsingDiagnostics }: BuilderCreationParameters) {
        // Return same program if underlying program doesnt change
        let oldState = oldProgram && oldProgram.getState();
        if (oldState && newProgram === oldState.program && configFileParsingDiagnostics === newProgram.getConfigFileParsingDiagnostics()) {
            newProgram = undefined!; // TODO: GH#18217
            oldState = undefined;
            return oldProgram;
        }

        /**
         * Create the canonical file name for identity
         */
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        /**
         * Computing hash to for signature verification
         */
        const computeHash = host.createHash || generateDjb2Hash;
        let state = createBuilderProgramState(newProgram, getCanonicalFileName, oldState);
        let backupState: BuilderProgramState | undefined;

        // To ensure that we arent storing any references to old program or new program without state
        newProgram = undefined!; // TODO: GH#18217
        oldProgram = undefined;
        oldState = undefined;

        const result = createRedirectedBuilderProgram(state, configFileParsingDiagnostics);
        result.getState = () => state;
        result.backupState = () => {
            Debug.assert(backupState === undefined);
            backupState = cloneBuilderProgramState(state);
        };
        result.restoreState = () => {
            state = Debug.assertDefined(backupState);
            backupState = undefined;
        };
        result.getAllDependencies = sourceFile => BuilderState.getAllDependencies(state, Debug.assertDefined(state.program), sourceFile);
        result.getSemanticDiagnostics = getSemanticDiagnostics;
        result.emit = emit;
        result.releaseProgram = () => {
            releaseCache(state);
            backupState = undefined;
        };

        if (kind === BuilderProgramKind.SemanticDiagnosticsBuilderProgram) {
            (result as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
        }
        else if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
            (result as EmitAndSemanticDiagnosticsBuilderProgram).emitNextAffectedFile = emitNextAffectedFile;
        }
        else {
            notImplemented();
        }

        return result;

        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        function emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult> {
            let affected = getNextAffectedFile(state, cancellationToken, computeHash);
            let isPendingEmitFile = false;
            if (!affected) {
                if (!state.compilerOptions.out && !state.compilerOptions.outFile) {
                    affected = getNextAffectedFilePendingEmit(state);
                    if (!affected) {
                        return undefined;
                    }
                    isPendingEmitFile = true;
                }
                else {
                    const program = Debug.assertDefined(state.program);
                    // Check if program uses any prepend project references, if thats the case we cant track of the js files of those, so emit even though there are no changes
                    if (state.programEmitComplete || !some(program.getProjectReferences(), ref => !!ref.prepend)) {
                        state.programEmitComplete = true;
                        return undefined;
                    }
                    affected = program;
                }
            }

            // Mark seen emitted files if there are pending files to be emitted
            if (state.affectedFilesPendingEmit && state.program !== affected) {
                (state.seenEmittedFiles || (state.seenEmittedFiles = createMap())).set((affected as SourceFile).path, true);
            }

            return toAffectedFileResult(
                state,
                // When whole program is affected, do emit only once (eg when --out or --outFile is specified)
                // Otherwise just affected file
                Debug.assertDefined(state.program).emit(affected === state.program ? undefined : affected as SourceFile, writeFile || host.writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers),
                affected,
                isPendingEmitFile
            );
        }

        /**
         * Emits the JavaScript and declaration files.
         * When targetSource file is specified, emits the files corresponding to that source file,
         * otherwise for the whole program.
         * In case of EmitAndSemanticDiagnosticsBuilderProgram, when targetSourceFile is specified,
         * it is assumed that that file is handled from affected file list. If targetSourceFile is not specified,
         * it will only emit all the affected files instead of whole program
         *
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        function emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult {
            if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
                assertSourceFileOkWithoutNextAffectedCall(state, targetSourceFile);
                if (!targetSourceFile) {
                    // Emit and report any errors we ran into.
                    let sourceMaps: SourceMapEmitResult[] = [];
                    let emitSkipped = false;
                    let diagnostics: Diagnostic[] | undefined;
                    let emittedFiles: string[] = [];

                    let affectedEmitResult: AffectedFileResult<EmitResult>;
                    while (affectedEmitResult = emitNextAffectedFile(writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers)) {
                        emitSkipped = emitSkipped || affectedEmitResult.result.emitSkipped;
                        diagnostics = addRange(diagnostics, affectedEmitResult.result.diagnostics);
                        emittedFiles = addRange(emittedFiles, affectedEmitResult.result.emittedFiles);
                        sourceMaps = addRange(sourceMaps, affectedEmitResult.result.sourceMaps);
                    }
                    return {
                        emitSkipped,
                        diagnostics: diagnostics || emptyArray,
                        emittedFiles,
                        sourceMaps
                    };
                }
            }
            return Debug.assertDefined(state.program).emit(targetSourceFile, writeFile || host.writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
        }

        /**
         * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
         * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
         */
        function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<ReadonlyArray<Diagnostic>> {
            while (true) {
                const affected = getNextAffectedFile(state, cancellationToken, computeHash);
                if (!affected) {
                    // Done
                    return undefined;
                }
                else if (affected === state.program) {
                    // When whole program is affected, get all semantic diagnostics (eg when --out or --outFile is specified)
                    return toAffectedFileResult(
                        state,
                        state.program.getSemanticDiagnostics(/*targetSourceFile*/ undefined, cancellationToken),
                        affected
                    );
                }

                // Get diagnostics for the affected file if its not ignored
                if (ignoreSourceFile && ignoreSourceFile(affected as SourceFile)) {
                    // Get next affected file
                    doneWithAffectedFile(state, affected);
                    continue;
                }

                return toAffectedFileResult(
                    state,
                    getSemanticDiagnosticsOfFile(state, affected as SourceFile, cancellationToken),
                    affected
                );
            }
        }

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
         * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
         */
        function getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
            assertSourceFileOkWithoutNextAffectedCall(state, sourceFile);
            const compilerOptions = Debug.assertDefined(state.program).getCompilerOptions();
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                // We dont need to cache the diagnostics just return them from program
                return Debug.assertDefined(state.program).getSemanticDiagnostics(sourceFile, cancellationToken);
            }

            if (sourceFile) {
                return getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken);
            }

            // When semantic builder asks for diagnostics of the whole program,
            // ensure that all the affected files are handled
            let affected: SourceFile | Program | undefined;
            let affectedFilesPendingEmit: Path[] | undefined;
            while (affected = getNextAffectedFile(state, cancellationToken, computeHash)) {
                if (affected !== state.program && kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
                    (affectedFilesPendingEmit || (affectedFilesPendingEmit = [])).push((affected as SourceFile).path);
                }
                doneWithAffectedFile(state, affected);
            }

            // In case of emit builder, cache the files to be emitted
            if (affectedFilesPendingEmit) {
                state.affectedFilesPendingEmit = concatenate(state.affectedFilesPendingEmit, affectedFilesPendingEmit);
                // affectedFilesPendingEmitIndex === undefined
                // - means the emit state.affectedFilesPendingEmit was undefined before adding current affected files
                //   so start from 0 as array would be affectedFilesPendingEmit
                // else, continue to iterate from existing index, the current set is appended to existing files
                if (state.affectedFilesPendingEmitIndex === undefined) {
                    state.affectedFilesPendingEmitIndex = 0;
                }
            }

            let diagnostics: Diagnostic[] | undefined;
            for (const sourceFile of Debug.assertDefined(state.program).getSourceFiles()) {
                diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken));
            }
            return diagnostics || emptyArray;
        }
    }

    export function createRedirectedBuilderProgram(state: { program: Program | undefined; compilerOptions: CompilerOptions; }, configFileParsingDiagnostics: ReadonlyArray<Diagnostic>): BuilderProgram {
        return {
            getState: notImplemented,
            backupState: noop,
            restoreState: noop,
            getProgram,
            getProgramOrUndefined: () => state.program,
            releaseProgram: () => state.program = undefined,
            getCompilerOptions: () => state.compilerOptions,
            getSourceFile: fileName => getProgram().getSourceFile(fileName),
            getSourceFiles: () => getProgram().getSourceFiles(),
            getOptionsDiagnostics: cancellationToken => getProgram().getOptionsDiagnostics(cancellationToken),
            getGlobalDiagnostics: cancellationToken => getProgram().getGlobalDiagnostics(cancellationToken),
            getConfigFileParsingDiagnostics: () => configFileParsingDiagnostics,
            getSyntacticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSyntacticDiagnostics(sourceFile, cancellationToken),
            getDeclarationDiagnostics: (sourceFile, cancellationToken) => getProgram().getDeclarationDiagnostics(sourceFile, cancellationToken),
            getSemanticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSemanticDiagnostics(sourceFile, cancellationToken),
            emit: (sourceFile, writeFile, cancellationToken, emitOnlyDts, customTransformers) => getProgram().emit(sourceFile, writeFile, cancellationToken, emitOnlyDts, customTransformers),
            getAllDependencies: notImplemented,
            getCurrentDirectory: () => getProgram().getCurrentDirectory()
        };

        function getProgram() {
            return Debug.assertDefined(state.program);
        }
    }
}

namespace ts {
    export type AffectedFileResult<T> = { result: T; affected: SourceFile | Program; } | undefined;

    export interface BuilderProgramHost {
        /**
         * return true if file names are treated with case sensitivity
         */
        useCaseSensitiveFileNames(): boolean;
        /**
         * If provided this would be used this hash instead of actual file shape text for detecting changes
         */
        createHash?: (data: string) => string;
        /**
         * When emit or emitNextAffectedFile are called without writeFile,
         * this callback if present would be used to write files
         */
        writeFile?: WriteFileCallback;
    }

    /**
     * Builder to manage the program state changes
     */
    export interface BuilderProgram {
        /*@internal*/
        getState(): BuilderProgramState;
        /*@internal*/
        backupState(): void;
        /*@internal*/
        restoreState(): void;
        /**
         * Returns current program
         */
        getProgram(): Program;
        /**
         * Returns current program that could be undefined if the program was released
         */
        /*@internal*/
        getProgramOrUndefined(): Program | undefined;
        /**
         * Releases reference to the program, making all the other operations that need program to fail.
         */
        /*@internal*/
        releaseProgram(): void;
        /**
         * Get compiler options of the program
         */
        getCompilerOptions(): CompilerOptions;
        /**
         * Get the source file in the program with file name
         */
        getSourceFile(fileName: string): SourceFile | undefined;
        /**
         * Get a list of files in the program
         */
        getSourceFiles(): ReadonlyArray<SourceFile>;
        /**
         * Get the diagnostics for compiler options
         */
        getOptionsDiagnostics(cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
        /**
         * Get the diagnostics that dont belong to any file
         */
        getGlobalDiagnostics(cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
        /**
         * Get the diagnostics from config file parsing
         */
        getConfigFileParsingDiagnostics(): ReadonlyArray<Diagnostic>;
        /**
         * Get the syntax diagnostics, for all source files if source file is not supplied
         */
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
        /**
         * Get the declaration diagnostics, for all source files if source file is not supplied
         */
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<DiagnosticWithLocation>;
        /**
         * Get all the dependencies of the file
         */
        getAllDependencies(sourceFile: SourceFile): ReadonlyArray<string>;

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
         * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
         */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
        /**
         * Emits the JavaScript and declaration files.
         * When targetSource file is specified, emits the files corresponding to that source file,
         * otherwise for the whole program.
         * In case of EmitAndSemanticDiagnosticsBuilderProgram, when targetSourceFile is specified,
         * it is assumed that that file is handled from affected file list. If targetSourceFile is not specified,
         * it will only emit all the affected files instead of whole program
         *
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        /**
         * Get the current directory of the program
         */
        getCurrentDirectory(): string;
    }

    /**
     * The builder that caches the semantic diagnostics for the program and handles the changed files and affected files
     */
    export interface SemanticDiagnosticsBuilderProgram extends BuilderProgram {
        /**
         * Gets the semantic diagnostics from the program for the next affected file and caches it
         * Returns undefined if the iteration is complete
         */
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<ReadonlyArray<Diagnostic>>;
    }

    /**
     * The builder that can handle the changes in program and iterate through changed file to emit the files
     * The semantic diagnostics are cached per file and managed by clearing for the changed/affected files
     */
    export interface EmitAndSemanticDiagnosticsBuilderProgram extends BuilderProgram {
        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
    }

    /**
     * Create the builder to manage semantic diagnostics and cache them
     */
    export function createSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>): SemanticDiagnosticsBuilderProgram;
    export function createSemanticDiagnosticsBuilderProgram(rootNames: ReadonlyArray<string> | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>): SemanticDiagnosticsBuilderProgram;
    export function createSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: Program | ReadonlyArray<string> | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: ReadonlyArray<Diagnostic> | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>) {
        return createBuilderProgram(BuilderProgramKind.SemanticDiagnosticsBuilderProgram, getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
    }

    /**
     * Create the builder that can handle the changes in program and iterate through changed files
     * to emit the those files and manage semantic diagnostics cache as well
     */
    export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>): EmitAndSemanticDiagnosticsBuilderProgram;
    export function createEmitAndSemanticDiagnosticsBuilderProgram(rootNames: ReadonlyArray<string> | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>): EmitAndSemanticDiagnosticsBuilderProgram;
    export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: Program | ReadonlyArray<string> | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: ReadonlyArray<Diagnostic> | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>) {
        return createBuilderProgram(BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
    }

    /**
     * Creates a builder thats just abstraction over program and can be used with watch
     */
    export function createAbstractBuilder(newProgram: Program, host: BuilderProgramHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>): BuilderProgram;
    export function createAbstractBuilder(rootNames: ReadonlyArray<string> | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>): BuilderProgram;
    export function createAbstractBuilder(newProgramOrRootNames: Program | ReadonlyArray<string> | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | BuilderProgram, configFileParsingDiagnosticsOrOldProgram?: ReadonlyArray<Diagnostic> | BuilderProgram, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>, projectReferences?: ReadonlyArray<ProjectReference>): BuilderProgram {
        const { newProgram, configFileParsingDiagnostics: newConfigFileParsingDiagnostics } = getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences);
        return createRedirectedBuilderProgram({ program: newProgram, compilerOptions: newProgram.getCompilerOptions() }, newConfigFileParsingDiagnostics);
    }
}

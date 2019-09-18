/*@internal*/
namespace ts {
    export interface ReusableDiagnostic extends ReusableDiagnosticRelatedInformation {
        /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
        reportsUnnecessary?: {};
        source?: string;
        relatedInformation?: ReusableDiagnosticRelatedInformation[];
    }

    export interface ReusableDiagnosticRelatedInformation {
        category: DiagnosticCategory;
        code: number;
        file: string | undefined;
        start: number | undefined;
        length: number | undefined;
        messageText: string | ReusableDiagnosticMessageChain;
    }

    export type ReusableDiagnosticMessageChain = DiagnosticMessageChain;

    export interface ReusableBuilderProgramState extends ReusableBuilderState {
        /**
         * Cache of semantic diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile?: ReadonlyMap<readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet?: ReadonlyMap<true>;
        /**
         * Set of affected files being iterated
         */
        affectedFiles?: readonly SourceFile[] | undefined;
        /**
         * Current changed file for iterating over affected files
         */
        currentChangedFilePath?: Path | undefined;
        /**
         * Map of file signatures, with key being file path, calculated while getting current changed file's affected files
         * These will be committed whenever the iteration through affected files of current changed file is complete
         */
        currentAffectedFilesSignatures?: ReadonlyMap<string> | undefined;
        /**
         * Newly computed visible to outside referencedSet
         */
        currentAffectedFilesExportedModulesMap?: Readonly<BuilderState.ComputingExportedModulesMap> | undefined;
        /**
         * True if the semantic diagnostics were copied from the old state
         */
        semanticDiagnosticsFromOldState?: Map<true>;
        /**
         * program corresponding to this state
         */
        program?: Program | undefined;
        /**
         * compilerOptions for the program
         */
        compilerOptions: CompilerOptions;
        /**
         * Files pending to be emitted
         */
        affectedFilesPendingEmit?: readonly Path[] | undefined;
        /**
         * Files pending to be emitted kind.
         */
        affectedFilesPendingEmitKind?: ReadonlyMap<BuilderFileEmit> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex?: number | undefined;
        /*
         * true if semantic diagnostics are ReusableDiagnostic instead of Diagnostic
         */
        hasReusableDiagnostic?: true;
    }

    export const enum BuilderFileEmit {
        DtsOnly,
        Full
    }

    /**
     * State to store the changed files, affected files and cache semantic diagnostics
     */
    // TODO: GH#18217 Properties of this interface are frequently asserted to be defined.
    export interface BuilderProgramState extends BuilderState {
        /**
         * Cache of semantic diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile: Map<readonly Diagnostic[]> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet: Map<true>;
        /**
         * Set of affected files being iterated
         */
        affectedFiles: readonly SourceFile[] | undefined;
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
        affectedFilesPendingEmit: Path[] | undefined;
        /**
         * Files pending to be emitted kind.
         */
        affectedFilesPendingEmitKind: Map<BuilderFileEmit> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex: number | undefined;
        /**
         * true if build info is emitted
         */
        emittedBuildInfo?: boolean;
        /**
         * Already seen emitted files
         */
        seenEmittedFiles: Map<BuilderFileEmit> | undefined;
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
    function createBuilderProgramState(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState?: Readonly<ReusableBuilderProgramState>): BuilderProgramState {
        const state = BuilderState.create(newProgram, getCanonicalFileName, oldState) as BuilderProgramState;
        state.program = newProgram;
        const compilerOptions = newProgram.getCompilerOptions();
        state.compilerOptions = compilerOptions;
        // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
        // With --isolatedModules, emitting changed file doesnt emit dependent files so we cant know of dependent files to retrieve errors so dont cache the errors
        if (!compilerOptions.outFile && !compilerOptions.out && !compilerOptions.isolatedModules) {
            state.semanticDiagnosticsPerFile = createMap<readonly Diagnostic[]>();
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
            const changedFilesSet = oldState!.changedFilesSet;
            if (canCopySemanticDiagnostics) {
                Debug.assert(!changedFilesSet || !forEachKey(changedFilesSet, path => oldState!.semanticDiagnosticsPerFile!.has(path)), "Semantic diagnostics shouldnt be available for changed files");
            }

            // Copy old state's changed files set
            if (changedFilesSet) {
                copyEntries(changedFilesSet, state.changedFilesSet);
            }
            if (!compilerOptions.outFile && !compilerOptions.out && oldState!.affectedFilesPendingEmit) {
                state.affectedFilesPendingEmit = oldState!.affectedFilesPendingEmit.slice();
                state.affectedFilesPendingEmitKind = cloneMapOrUndefined(oldState!.affectedFilesPendingEmitKind);
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
                    state.semanticDiagnosticsPerFile!.set(sourceFilePath, oldState!.hasReusableDiagnostic ? convertToDiagnostics(diagnostics as readonly ReusableDiagnostic[], newProgram, getCanonicalFileName) : diagnostics as readonly Diagnostic[]);
                    if (!state.semanticDiagnosticsFromOldState) {
                        state.semanticDiagnosticsFromOldState = createMap<true>();
                    }
                    state.semanticDiagnosticsFromOldState.set(sourceFilePath, true);
                }
            }
        });

        if (oldCompilerOptions && compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions)) {
            // Add all files to affectedFilesPendingEmit since emit changed
            newProgram.getSourceFiles().forEach(f => addToAffectedFilesPendingEmit(state, f.path, BuilderFileEmit.Full));
            Debug.assert(state.seenAffectedFiles === undefined);
            state.seenAffectedFiles = createMap<true>();
        }

        return state;
    }

    function convertToDiagnostics(diagnostics: readonly ReusableDiagnostic[], newProgram: Program, getCanonicalFileName: GetCanonicalFileName): readonly Diagnostic[] {
        if (!diagnostics.length) return emptyArray;
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getOutputPathForBuildInfo(newProgram.getCompilerOptions())!, newProgram.getCurrentDirectory()));
        return diagnostics.map(diagnostic => {
            const result: Diagnostic = convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPath);
            result.reportsUnnecessary = diagnostic.reportsUnnecessary;
            result.source = diagnostic.source;
            const { relatedInformation } = diagnostic;
            result.relatedInformation = relatedInformation ?
                relatedInformation.length ?
                    relatedInformation.map(r => convertToDiagnosticRelatedInformation(r, newProgram, toPath)) :
                    emptyArray :
                undefined;
            return result;
        });

        function toPath(path: string) {
            return ts.toPath(path, buildInfoDirectory, getCanonicalFileName);
        }
    }

    function convertToDiagnosticRelatedInformation(diagnostic: ReusableDiagnosticRelatedInformation, newProgram: Program, toPath: (path: string) => Path): DiagnosticRelatedInformation {
        const { file } = diagnostic;
        return {
            ...diagnostic,
            file: file ? newProgram.getSourceFileByPath(toPath(file)) : undefined
        };
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
        newState.affectedFilesPendingEmit = state.affectedFilesPendingEmit && state.affectedFilesPendingEmit.slice();
        newState.affectedFilesPendingEmitKind = cloneMapOrUndefined(state.affectedFilesPendingEmitKind);
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
                        handleDtsMayChangeOfAffectedFile(state, affectedFile, cancellationToken, computeHash);
                        return affectedFile;
                    }
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
    function getNextAffectedFilePendingEmit(state: BuilderProgramState) {
        const { affectedFilesPendingEmit } = state;
        if (affectedFilesPendingEmit) {
            const seenEmittedFiles = state.seenEmittedFiles || (state.seenEmittedFiles = createMap());
            for (let i = state.affectedFilesPendingEmitIndex!; i < affectedFilesPendingEmit.length; i++) {
                const affectedFile = Debug.assertDefined(state.program).getSourceFileByPath(affectedFilesPendingEmit[i]);
                if (affectedFile) {
                    const seenKind = seenEmittedFiles.get(affectedFile.path);
                    const emitKind = Debug.assertDefined(Debug.assertDefined(state.affectedFilesPendingEmitKind).get(affectedFile.path));
                    if (seenKind === undefined || seenKind < emitKind) {
                        // emit this file
                        state.affectedFilesPendingEmitIndex = i;
                        return { affectedFile, emitKind };
                    }
                }
            }
            state.affectedFilesPendingEmit = undefined;
            state.affectedFilesPendingEmitKind = undefined;
            state.affectedFilesPendingEmitIndex = undefined;
        }
        return undefined;
    }

    /**
     *  Handles semantic diagnostics and dts emit for affectedFile and files, that are referencing modules that export entities from affected file
     *  This is because even though js emit doesnt change, dts emit / type used can change resulting in need for dts emit and js change
     */
    function handleDtsMayChangeOfAffectedFile(state: BuilderProgramState, affectedFile: SourceFile, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash) {
        removeSemanticDiagnosticsOf(state, affectedFile.path);

        // If affected files is everything except default library, then nothing more to do
        if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles) {
            if (!state.cleanedDiagnosticsOfLibFiles) {
                state.cleanedDiagnosticsOfLibFiles = true;
                const program = Debug.assertDefined(state.program);
                const options = program.getCompilerOptions();
                forEach(program.getSourceFiles(), f =>
                    program.isSourceFileDefaultLibrary(f) &&
                    !skipTypeChecking(f, options) &&
                    removeSemanticDiagnosticsOf(state, f.path)
                );
            }
            return;
        }

        forEachReferencingModulesOfExportOfAffectedFile(state, affectedFile, (state, path) => handleDtsMayChangeOf(state, path, cancellationToken, computeHash));
    }

    /**
     * Handle the dts may change, so they need to be added to pending emit if dts emit is enabled,
     * Also we need to make sure signature is updated for these files
     */
    function handleDtsMayChangeOf(state: BuilderProgramState, path: Path, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash) {
        removeSemanticDiagnosticsOf(state, path);

        if (!state.changedFilesSet.has(path)) {
            const program = Debug.assertDefined(state.program);
            const sourceFile = program.getSourceFileByPath(path);
            if (sourceFile) {
                // Even though the js emit doesnt change and we are already handling dts emit and semantic diagnostics
                // we need to update the signature to reflect correctness of the signature(which is output d.ts emit) of this file
                // This ensures that we dont later during incremental builds considering wrong signature.
                // Eg where this also is needed to ensure that .tsbuildinfo generated by incremental build should be same as if it was first fresh build
                BuilderState.updateShapeSignature(
                    state,
                    program,
                    sourceFile,
                    Debug.assertDefined(state.currentAffectedFilesSignatures),
                    cancellationToken,
                    computeHash,
                    state.currentAffectedFilesExportedModulesMap
                );
                // If not dts emit, nothing more to do
                if (getEmitDeclarations(state.compilerOptions)) {
                    addToAffectedFilesPendingEmit(state, path, BuilderFileEmit.DtsOnly);
                }
            }
        }

        return false;
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
     * Iterate on referencing modules that export entities from affected file
     */
    function forEachReferencingModulesOfExportOfAffectedFile(state: BuilderProgramState, affectedFile: SourceFile, fn: (state: BuilderProgramState, filePath: Path) => boolean) {
        // If there was change in signature (dts output) for the changed file,
        // then only we need to handle pending file emit
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
            forEachFilesReferencingPath(state, exportedFromPath as Path, seenFileAndExportsOfFile, fn)
        )) {
            return;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        forEachEntry(state.exportedModulesMap, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(affectedFile.path) &&
            forEachFilesReferencingPath(state, exportedFromPath as Path, seenFileAndExportsOfFile, fn)
        );
    }

    /**
     * Iterate on files referencing referencedPath
     */
    function forEachFilesReferencingPath(state: BuilderProgramState, referencedPath: Path, seenFileAndExportsOfFile: Map<true>, fn: (state: BuilderProgramState, filePath: Path) => boolean) {
        return forEachEntry(state.referencedMap!, (referencesInFile, filePath) =>
            referencesInFile.has(referencedPath) && forEachFileAndExportsOfFile(state, filePath as Path, seenFileAndExportsOfFile, fn)
        );
    }

    /**
     * fn on file and iterate on anything that exports this file
     */
    function forEachFileAndExportsOfFile(state: BuilderProgramState, filePath: Path, seenFileAndExportsOfFile: Map<true>, fn: (state: BuilderProgramState, filePath: Path) => boolean): boolean {
        if (!addToSeen(seenFileAndExportsOfFile, filePath)) {
            return false;
        }

        if (fn(state, filePath)) {
            // If there are no more diagnostics from old cache, done
            return true;
        }

        Debug.assert(!!state.currentAffectedFilesExportedModulesMap);
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.currentAffectedFilesExportedModulesMap!, (exportedModules, exportedFromPath) =>
            exportedModules &&
            exportedModules.has(filePath) &&
            forEachFileAndExportsOfFile(state, exportedFromPath as Path, seenFileAndExportsOfFile, fn)
        )) {
            return true;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.exportedModulesMap!, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(filePath) &&
            forEachFileAndExportsOfFile(state, exportedFromPath as Path, seenFileAndExportsOfFile, fn)
        )) {
            return true;
        }

        // Remove diagnostics of files that import this file (without going to exports of referencing files)
        return !!forEachEntry(state.referencedMap!, (referencesInFile, referencingFilePath) =>
            referencesInFile.has(filePath) &&
            !seenFileAndExportsOfFile.has(referencingFilePath) && // Not already removed diagnostic file
            fn(state, referencingFilePath as Path) // Dont add to seen since this is not yet done with the export removal
        );
    }


    /**
     * This is called after completing operation on the next affected file.
     * The operations here are postponed to ensure that cancellation during the iteration is handled correctly
     */
    function doneWithAffectedFile(
        state: BuilderProgramState,
        affected: SourceFile | Program,
        emitKind?: BuilderFileEmit,
        isPendingEmit?: boolean,
        isBuildInfoEmit?: boolean
    ) {
        if (isBuildInfoEmit) {
            state.emittedBuildInfo = true;
        }
        else if (affected === state.program) {
            state.changedFilesSet.clear();
            state.programEmitComplete = true;
        }
        else {
            state.seenAffectedFiles!.set((affected as SourceFile).path, true);
            if (emitKind !== undefined) {
                (state.seenEmittedFiles || (state.seenEmittedFiles = createMap())).set((affected as SourceFile).path, emitKind);
            }
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
    function toAffectedFileResult<T>(state: BuilderProgramState, result: T, affected: SourceFile | Program): AffectedFileResult<T> {
        doneWithAffectedFile(state, affected);
        return { result, affected };
    }

    /**
     * Returns the result with affected file
     */
    function toAffectedFileEmitResult(
        state: BuilderProgramState,
        result: EmitResult,
        affected: SourceFile | Program,
        emitKind: BuilderFileEmit,
        isPendingEmit?: boolean,
        isBuildInfoEmit?: boolean
    ): AffectedFileResult<EmitResult> {
        doneWithAffectedFile(state, affected, emitKind, isPendingEmit, isBuildInfoEmit);
        return { result, affected };
    }

    /**
     * Gets the semantic diagnostics either from cache if present, or otherwise from program and caches it
     * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files/changed file set
     */
    function getSemanticDiagnosticsOfFile(state: BuilderProgramState, sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
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

    export type ProgramBuildInfoDiagnostic = string | [string, readonly ReusableDiagnostic[]];
    export interface ProgramBuildInfo {
        fileInfos: MapLike<BuilderState.FileInfo>;
        options: CompilerOptions;
        referencedMap?: MapLike<string[]>;
        exportedModulesMap?: MapLike<string[]>;
        semanticDiagnosticsPerFile?: ProgramBuildInfoDiagnostic[];
    }

    /**
     * Gets the program information to be emitted in buildInfo so that we can use it to create new program
     */
    function getProgramBuildInfo(state: Readonly<ReusableBuilderProgramState>, getCanonicalFileName: GetCanonicalFileName): ProgramBuildInfo | undefined {
        if (state.compilerOptions.outFile || state.compilerOptions.out) return undefined;
        const currentDirectory = Debug.assertDefined(state.program).getCurrentDirectory();
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getOutputPathForBuildInfo(state.compilerOptions)!, currentDirectory));
        const fileInfos: MapLike<BuilderState.FileInfo> = {};
        state.fileInfos.forEach((value, key) => {
            const signature = state.currentAffectedFilesSignatures && state.currentAffectedFilesSignatures.get(key);
            fileInfos[relativeToBuildInfo(key)] = signature === undefined ? value : { version: value.version, signature };
        });

        const result: ProgramBuildInfo = {
            fileInfos,
            options: convertToReusableCompilerOptions(state.compilerOptions, relativeToBuildInfoEnsuringAbsolutePath)
        };
        if (state.referencedMap) {
            const referencedMap: MapLike<string[]> = {};
            state.referencedMap.forEach((value, key) => {
                referencedMap[relativeToBuildInfo(key)] = arrayFrom(value.keys(), relativeToBuildInfo);
            });
            result.referencedMap = referencedMap;
        }

        if (state.exportedModulesMap) {
            const exportedModulesMap: MapLike<string[]> = {};
            state.exportedModulesMap.forEach((value, key) => {
                const newValue = state.currentAffectedFilesExportedModulesMap && state.currentAffectedFilesExportedModulesMap.get(key);
                // Not in temporary cache, use existing value
                if (newValue === undefined) exportedModulesMap[relativeToBuildInfo(key)] = arrayFrom(value.keys(), relativeToBuildInfo);
                // Value in cache and has updated value map, use that
                else if (newValue) exportedModulesMap[relativeToBuildInfo(key)] = arrayFrom(newValue.keys(), relativeToBuildInfo);
            });
            result.exportedModulesMap = exportedModulesMap;
        }

        if (state.semanticDiagnosticsPerFile) {
            const semanticDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] = [];
            // Currently not recording actual errors since those mean no emit for tsc --build
            state.semanticDiagnosticsPerFile.forEach((value, key) => semanticDiagnosticsPerFile.push(
                value.length ?
                    [
                        relativeToBuildInfo(key),
                        state.hasReusableDiagnostic ?
                            value as readonly ReusableDiagnostic[] :
                            convertToReusableDiagnostics(value as readonly Diagnostic[], relativeToBuildInfo)
                    ] :
                    relativeToBuildInfo(key)
            ));
            result.semanticDiagnosticsPerFile = semanticDiagnosticsPerFile;
        }

        return result;

        function relativeToBuildInfoEnsuringAbsolutePath(path: string) {
            return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
        }

        function relativeToBuildInfo(path: string) {
            return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
        }
    }

    function convertToReusableCompilerOptions(options: CompilerOptions, relativeToBuildInfo: (path: string) => string) {
        const result: CompilerOptions = {};
        const optionsNameMap = getOptionNameMap().optionNameMap;

        for (const name in options) {
            if (hasProperty(options, name)) {
                result[name] = convertToReusableCompilerOptionValue(
                    optionsNameMap.get(name.toLowerCase()),
                    options[name] as CompilerOptionsValue,
                    relativeToBuildInfo
                );
            }
        }
        if (result.configFilePath) {
            result.configFilePath = relativeToBuildInfo(result.configFilePath);
        }
        return result;
    }

    function convertToReusableCompilerOptionValue(option: CommandLineOption | undefined, value: CompilerOptionsValue, relativeToBuildInfo: (path: string) => string) {
        if (option) {
            if (option.type === "list") {
                const values = value as readonly (string | number)[];
                if (option.element.isFilePath && values.length) {
                    return values.map(relativeToBuildInfo);
                }
            }
            else if (option.isFilePath) {
                return relativeToBuildInfo(value as string);
            }
        }
        return value;
    }

    function convertToReusableDiagnostics(diagnostics: readonly Diagnostic[], relativeToBuildInfo: (path: string) => string): readonly ReusableDiagnostic[] {
        Debug.assert(!!diagnostics.length);
        return diagnostics.map(diagnostic => {
            const result: ReusableDiagnostic = convertToReusableDiagnosticRelatedInformation(diagnostic, relativeToBuildInfo);
            result.reportsUnnecessary = diagnostic.reportsUnnecessary;
            result.source = diagnostic.source;
            const { relatedInformation } = diagnostic;
            result.relatedInformation = relatedInformation ?
                relatedInformation.length ?
                    relatedInformation.map(r => convertToReusableDiagnosticRelatedInformation(r, relativeToBuildInfo)) :
                    emptyArray :
                undefined;
            return result;
        });
    }

    function convertToReusableDiagnosticRelatedInformation(diagnostic: DiagnosticRelatedInformation, relativeToBuildInfo: (path: string) => string): ReusableDiagnosticRelatedInformation {
        const { file } = diagnostic;
        return {
            ...diagnostic,
            file: file ? relativeToBuildInfo(file.path) : undefined
        };
    }

    export enum BuilderProgramKind {
        SemanticDiagnosticsBuilderProgram,
        EmitAndSemanticDiagnosticsBuilderProgram
    }

    export interface BuilderCreationParameters {
        newProgram: Program;
        host: BuilderProgramHost;
        oldProgram: BuilderProgram | undefined;
        configFileParsingDiagnostics: readonly Diagnostic[];
    }

    export function getBuilderCreationParameters(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: BuilderProgram | CompilerHost, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderCreationParameters {
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
            configFileParsingDiagnostics = configFileParsingDiagnosticsOrOldProgram as readonly Diagnostic[];
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
        newProgram.getProgramBuildInfo = () => getProgramBuildInfo(state, getCanonicalFileName);

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
            (result as EmitAndSemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
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
            let emitKind = BuilderFileEmit.Full;
            let isPendingEmitFile = false;
            if (!affected) {
                if (!state.compilerOptions.out && !state.compilerOptions.outFile) {
                    const pendingAffectedFile = getNextAffectedFilePendingEmit(state);
                    if (!pendingAffectedFile) {
                        if (state.emittedBuildInfo) {
                            return undefined;
                        }

                        const affected = Debug.assertDefined(state.program);
                        return toAffectedFileEmitResult(
                            state,
                            // When whole program is affected, do emit only once (eg when --out or --outFile is specified)
                            // Otherwise just affected file
                            affected.emitBuildInfo(writeFile || maybeBind(host, host.writeFile), cancellationToken),
                            affected,
                            /*emitKind*/ BuilderFileEmit.Full,
                            /*isPendingEmitFile*/ false,
                            /*isBuildInfoEmit*/ true
                        );
                    }
                    ({ affectedFile: affected, emitKind } = pendingAffectedFile);
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

            return toAffectedFileEmitResult(
                state,
                // When whole program is affected, do emit only once (eg when --out or --outFile is specified)
                // Otherwise just affected file
                Debug.assertDefined(state.program).emit(
                    affected === state.program ? undefined : affected as SourceFile,
                    writeFile || maybeBind(host, host.writeFile),
                    cancellationToken,
                    emitOnlyDtsFiles || emitKind === BuilderFileEmit.DtsOnly,
                    customTransformers
                ),
                affected,
                emitKind,
                isPendingEmitFile,
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
            return Debug.assertDefined(state.program).emit(targetSourceFile, writeFile || maybeBind(host, host.writeFile), cancellationToken, emitOnlyDtsFiles, customTransformers);
        }

        /**
         * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
         * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
         */
        function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]> {
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

                // Add file to affected file pending emit to handle for later emit time
                if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
                    addToAffectedFilesPendingEmit(state, (affected as SourceFile).path, BuilderFileEmit.Full);
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
        function getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
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
            // eslint-disable-next-line no-empty
            while (getSemanticDiagnosticsOfNextAffectedFile(cancellationToken)) {
            }

            let diagnostics: Diagnostic[] | undefined;
            for (const sourceFile of Debug.assertDefined(state.program).getSourceFiles()) {
                diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken));
            }
            return diagnostics || emptyArray;
        }
    }

    function addToAffectedFilesPendingEmit(state: BuilderProgramState, affectedFilePendingEmit: Path, kind: BuilderFileEmit) {
        if (!state.affectedFilesPendingEmit) state.affectedFilesPendingEmit = [];
        if (!state.affectedFilesPendingEmitKind) state.affectedFilesPendingEmitKind = createMap();

        const existingKind = state.affectedFilesPendingEmitKind.get(affectedFilePendingEmit);
        state.affectedFilesPendingEmit.push(affectedFilePendingEmit);
        state.affectedFilesPendingEmitKind.set(affectedFilePendingEmit, existingKind || kind);

        // affectedFilesPendingEmitIndex === undefined
        // - means the emit state.affectedFilesPendingEmit was undefined before adding current affected files
        //   so start from 0 as array would be affectedFilesPendingEmit
        // else, continue to iterate from existing index, the current set is appended to existing files
        if (state.affectedFilesPendingEmitIndex === undefined) {
            state.affectedFilesPendingEmitIndex = 0;
        }
    }

    function getMapOfReferencedSet(mapLike: MapLike<readonly string[]> | undefined, toPath: (path: string) => Path): ReadonlyMap<BuilderState.ReferencedSet> | undefined {
        if (!mapLike) return undefined;
        const map = createMap<BuilderState.ReferencedSet>();
        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in mapLike) {
            if (hasProperty(mapLike, key)) {
                map.set(toPath(key), arrayToSet(mapLike[key], toPath));
            }
        }
        return map;
    }

    export function createBuildProgramUsingProgramBuildInfo(program: ProgramBuildInfo, buildInfoPath: string, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram {
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());

        const fileInfos = createMap<BuilderState.FileInfo>();
        for (const key in program.fileInfos) {
            if (hasProperty(program.fileInfos, key)) {
                fileInfos.set(toPath(key), program.fileInfos[key]);
            }
        }

        const state: ReusableBuilderProgramState = {
            fileInfos,
            compilerOptions: convertFromReusableCompilerOptions(program.options, toAbsolutePath),
            referencedMap: getMapOfReferencedSet(program.referencedMap, toPath),
            exportedModulesMap: getMapOfReferencedSet(program.exportedModulesMap, toPath),
            semanticDiagnosticsPerFile: program.semanticDiagnosticsPerFile && arrayToMap(program.semanticDiagnosticsPerFile, value => toPath(isString(value) ? value : value[0]), value => isString(value) ? emptyArray : value[1]),
            hasReusableDiagnostic: true
        };
        return {
            getState: () => state,
            backupState: noop,
            restoreState: noop,
            getProgram: notImplemented,
            getProgramOrUndefined: returnUndefined,
            releaseProgram: noop,
            getCompilerOptions: () => state.compilerOptions,
            getSourceFile: notImplemented,
            getSourceFiles: notImplemented,
            getOptionsDiagnostics: notImplemented,
            getGlobalDiagnostics: notImplemented,
            getConfigFileParsingDiagnostics: notImplemented,
            getSyntacticDiagnostics: notImplemented,
            getDeclarationDiagnostics: notImplemented,
            getSemanticDiagnostics: notImplemented,
            emit: notImplemented,
            getAllDependencies: notImplemented,
            getCurrentDirectory: notImplemented,
            emitNextAffectedFile: notImplemented,
            getSemanticDiagnosticsOfNextAffectedFile: notImplemented,
        };

        function toPath(path: string) {
            return ts.toPath(path, buildInfoDirectory, getCanonicalFileName);
        }

        function toAbsolutePath(path: string) {
            return getNormalizedAbsolutePath(path, buildInfoDirectory);
        }
    }

    function convertFromReusableCompilerOptions(options: CompilerOptions, toAbsolutePath: (path: string) => string) {
        const result: CompilerOptions = {};
        const optionsNameMap = getOptionNameMap().optionNameMap;

        for (const name in options) {
            if (hasProperty(options, name)) {
                result[name] = convertFromReusableCompilerOptionValue(
                    optionsNameMap.get(name.toLowerCase()),
                    options[name] as CompilerOptionsValue,
                    toAbsolutePath
                );
            }
        }
        if (result.configFilePath) {
            result.configFilePath = toAbsolutePath(result.configFilePath);
        }
        return result;
    }

    function convertFromReusableCompilerOptionValue(option: CommandLineOption | undefined, value: CompilerOptionsValue, toAbsolutePath: (path: string) => string) {
        if (option) {
            if (option.type === "list") {
                const values = value as readonly (string | number)[];
                if (option.element.isFilePath && values.length) {
                    return values.map(toAbsolutePath);
                }
            }
            else if (option.isFilePath) {
                return toAbsolutePath(value as string);
            }
        }
        return value;
    }

    export function createRedirectedBuilderProgram(state: { program: Program | undefined; compilerOptions: CompilerOptions; }, configFileParsingDiagnostics: readonly Diagnostic[]): BuilderProgram {
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
            getCurrentDirectory: () => getProgram().getCurrentDirectory(),
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
        getState(): ReusableBuilderProgramState;
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
        getSourceFiles(): readonly SourceFile[];
        /**
         * Get the diagnostics for compiler options
         */
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics that dont belong to any file
         */
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics from config file parsing
         */
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        /**
         * Get the syntax diagnostics, for all source files if source file is not supplied
         */
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the declaration diagnostics, for all source files if source file is not supplied
         */
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /**
         * Get all the dependencies of the file
         */
        getAllDependencies(sourceFile: SourceFile): readonly string[];

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
         * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
         */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
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
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
    }

    /**
     * The builder that can handle the changes in program and iterate through changed file to emit the files
     * The semantic diagnostics are cached per file and managed by clearing for the changed/affected files
     */
    export interface EmitAndSemanticDiagnosticsBuilderProgram extends SemanticDiagnosticsBuilderProgram {
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
    export function createSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): SemanticDiagnosticsBuilderProgram;
    export function createSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): SemanticDiagnosticsBuilderProgram;
    export function createSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]) {
        return createBuilderProgram(BuilderProgramKind.SemanticDiagnosticsBuilderProgram, getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
    }

    /**
     * Create the builder that can handle the changes in program and iterate through changed files
     * to emit the those files and manage semantic diagnostics cache as well
     */
    export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): EmitAndSemanticDiagnosticsBuilderProgram;
    export function createEmitAndSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): EmitAndSemanticDiagnosticsBuilderProgram;
    export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]) {
        return createBuilderProgram(BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
    }

    /**
     * Creates a builder thats just abstraction over program and can be used with watch
     */
    export function createAbstractBuilder(newProgram: Program, host: BuilderProgramHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): BuilderProgram;
    export function createAbstractBuilder(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderProgram;
    export function createAbstractBuilder(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | BuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderProgram {
        const { newProgram, configFileParsingDiagnostics: newConfigFileParsingDiagnostics } = getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences);
        return createRedirectedBuilderProgram({ program: newProgram, compilerOptions: newProgram.getCompilerOptions() }, newConfigFileParsingDiagnostics);
    }
}

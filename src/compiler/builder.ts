/*@internal*/
namespace ts {
    export interface ReusableDiagnostic extends ReusableDiagnosticRelatedInformation {
        /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
        reportsUnnecessary?: {};
        reportDeprecated?: {}
        source?: string;
        relatedInformation?: ReusableDiagnosticRelatedInformation[];
        skippedOn?: keyof CompilerOptions;
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

    export interface ReusableBuilderProgramState extends BuilderState {
        /**
         * Cache of bind and check diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile?: ESMap<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet?: Set<Path>;
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
        affectedFilesPendingEmitKind?: ESMap<Path, BuilderFileEmit> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex?: number | undefined;
        /*
         * true if semantic diagnostics are ReusableDiagnostic instead of Diagnostic
         */
        hasReusableDiagnostic?: true;
        /**
         * Hash of d.ts emitted for the file, use to track when emit of d.ts changes
         */
        emitSignatures?: ESMap<Path, string>;
        /**
         * Hash of d.ts emit with --out
         */
        outSignature?: string;
        /**
         * Time when d.ts was modified
         */
        dtsChangeTime: number | undefined;
    }

    export const enum BuilderFileEmit {
        DtsOnly,
        Full
    }

    /**
     * State to store the changed files, affected files and cache semantic diagnostics
     */
    // TODO: GH#18217 Properties of this interface are frequently asserted to be defined.
    export interface BuilderProgramState extends BuilderState, ReusableBuilderProgramState {
        /**
         * Cache of bind and check diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile: ESMap<Path, readonly Diagnostic[]> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet: Set<Path>;
        /**
         * Set of affected files being iterated
         */
        affectedFiles?: readonly SourceFile[] | undefined;
        /**
         * Current index to retrieve affected file from
         */
        affectedFilesIndex: number | undefined;
        /**
         * Current changed file for iterating over affected files
         */
        currentChangedFilePath?: Path | undefined;
        /**
         * Already seen affected files
         */
        seenAffectedFiles: Set<Path> | undefined;
        /**
         * whether this program has cleaned semantic diagnostics cache for lib files
         */
        cleanedDiagnosticsOfLibFiles?: boolean;
        /**
         * True if the semantic diagnostics were copied from the old state
         */
        semanticDiagnosticsFromOldState?: Set<Path>;
        /**
         * Records if change in dts emit was detected
         */
         hasChangedEmitSignature?: boolean;
        /**
         * Files pending to be emitted
         */
        affectedFilesPendingEmit: Path[] | undefined;
        /**
         * true if build info is emitted
         */
        buildInfoEmitPending: boolean;
        /**
         * Already seen emitted files
         */
        seenEmittedFiles: ESMap<Path, BuilderFileEmit> | undefined;
        /**
         * true if program has been emitted
         */
        programEmitComplete?: true;
        /** Stores list of files that change signature during emit - test only */
        filesChangingSignature?: Set<Path>;
    }

    export type SavedBuildProgramEmitState = Pick<BuilderProgramState,
        "affectedFilesPendingEmit" |
        "affectedFilesPendingEmitIndex" |
        "affectedFilesPendingEmitKind" |
        "seenEmittedFiles" |
        "programEmitComplete" |
        "emitSignatures" |
        "outSignature" |
        "dtsChangeTime" |
        "hasChangedEmitSignature"
    > & { changedFilesSet: BuilderProgramState["changedFilesSet"] | undefined };

    function hasSameKeys(map1: ReadonlyCollection<string> | undefined, map2: ReadonlyCollection<string> | undefined): boolean {
        // Has same size and every key is present in both maps
        return map1 === map2 || map1 !== undefined && map2 !== undefined && map1.size === map2.size && !forEachKey(map1, key => !map2.has(key));
    }

    /**
     * Create the state so that we can iterate on changedFiles/affected files
     */
    function createBuilderProgramState(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState: Readonly<ReusableBuilderProgramState> | undefined, disableUseFileVersionAsSignature: boolean | undefined): BuilderProgramState {
        const state = BuilderState.create(newProgram, getCanonicalFileName, oldState, disableUseFileVersionAsSignature) as BuilderProgramState;
        state.program = newProgram;
        const compilerOptions = newProgram.getCompilerOptions();
        state.compilerOptions = compilerOptions;
        const outFilePath = outFile(compilerOptions);
        // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
        if (!outFilePath) {
            state.semanticDiagnosticsPerFile = new Map();
        }
        else if (compilerOptions.composite && oldState?.outSignature && outFilePath === outFile(oldState?.compilerOptions)) {
            state.outSignature = oldState?.outSignature;
        }
        state.changedFilesSet = new Set();
        state.dtsChangeTime = compilerOptions.composite ? oldState?.dtsChangeTime : undefined;

        const useOldState = BuilderState.canReuseOldState(state.referencedMap, oldState);
        const oldCompilerOptions = useOldState ? oldState!.compilerOptions : undefined;
        const canCopySemanticDiagnostics = useOldState && oldState!.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile &&
            !compilerOptionsAffectSemanticDiagnostics(compilerOptions, oldCompilerOptions!);
        const canCopyEmitSignatures = compilerOptions.composite &&
            oldState?.emitSignatures &&
            !outFilePath &&
            !compilerOptionsAffectDeclarationPath(compilerOptions, oldCompilerOptions!);
        if (useOldState) {
            // Copy old state's changed files set
            oldState!.changedFilesSet?.forEach(value => state.changedFilesSet.add(value));
            if (!outFilePath && oldState!.affectedFilesPendingEmit) {
                state.affectedFilesPendingEmit = oldState!.affectedFilesPendingEmit.slice();
                state.affectedFilesPendingEmitKind = oldState!.affectedFilesPendingEmitKind && new Map(oldState!.affectedFilesPendingEmitKind);
                state.affectedFilesPendingEmitIndex = oldState!.affectedFilesPendingEmitIndex;
                state.seenAffectedFiles = new Set();
            }
        }

        // Update changed files and copy semantic diagnostics if we can
        const referencedMap = state.referencedMap;
        const oldReferencedMap = useOldState ? oldState!.referencedMap : undefined;
        const copyDeclarationFileDiagnostics = canCopySemanticDiagnostics && !compilerOptions.skipLibCheck === !oldCompilerOptions!.skipLibCheck;
        const copyLibFileDiagnostics = copyDeclarationFileDiagnostics && !compilerOptions.skipDefaultLibCheck === !oldCompilerOptions!.skipDefaultLibCheck;
        state.fileInfos.forEach((info, sourceFilePath) => {
            let oldInfo: Readonly<BuilderState.FileInfo> | undefined;
            let newReferences: ReadonlySet<Path> | undefined;

            // if not using old state, every file is changed
            if (!useOldState ||
                // File wasn't present in old state
                !(oldInfo = oldState!.fileInfos.get(sourceFilePath)) ||
                // versions dont match
                oldInfo.version !== info.version ||
                // Implied formats dont match
                oldInfo.impliedFormat !== info.impliedFormat ||
                // Referenced files changed
                !hasSameKeys(newReferences = referencedMap && referencedMap.getValues(sourceFilePath), oldReferencedMap && oldReferencedMap.getValues(sourceFilePath)) ||
                // Referenced file was deleted in the new program
                newReferences && forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState!.fileInfos.has(path))) {
                // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
                state.changedFilesSet.add(sourceFilePath);
            }
            else if (canCopySemanticDiagnostics) {
                const sourceFile = newProgram.getSourceFileByPath(sourceFilePath)!;

                if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics) return;
                if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics) return;

                // Unchanged file copy diagnostics
                const diagnostics = oldState!.semanticDiagnosticsPerFile!.get(sourceFilePath);
                if (diagnostics) {
                    state.semanticDiagnosticsPerFile!.set(sourceFilePath, oldState!.hasReusableDiagnostic ? convertToDiagnostics(diagnostics as readonly ReusableDiagnostic[], newProgram, getCanonicalFileName) : diagnostics as readonly Diagnostic[]);
                    if (!state.semanticDiagnosticsFromOldState) {
                        state.semanticDiagnosticsFromOldState = new Set();
                    }
                    state.semanticDiagnosticsFromOldState.add(sourceFilePath);
                }
            }
            if (canCopyEmitSignatures) {
                const oldEmitSignature = oldState.emitSignatures.get(sourceFilePath);
                if (oldEmitSignature) (state.emitSignatures ||= new Map()).set(sourceFilePath, oldEmitSignature);
            }
        });

        // If the global file is removed, add all files as changed
        if (useOldState && forEachEntry(oldState!.fileInfos, (info, sourceFilePath) => info.affectsGlobalScope && !state.fileInfos.has(sourceFilePath))) {
            BuilderState.getAllFilesExcludingDefaultLibraryFile(state, newProgram, /*firstSourceFile*/ undefined)
                .forEach(file => state.changedFilesSet.add(file.resolvedPath));
        }
        else if (oldCompilerOptions && !outFilePath && compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions)) {
            // Add all files to affectedFilesPendingEmit since emit changed
            newProgram.getSourceFiles().forEach(f => addToAffectedFilesPendingEmit(state, f.resolvedPath, BuilderFileEmit.Full));
            Debug.assert(!state.seenAffectedFiles || !state.seenAffectedFiles.size);
            state.seenAffectedFiles = state.seenAffectedFiles || new Set();
        }
        // Since old states change files set is copied, any additional change means we would need to emit build info
        state.buildInfoEmitPending = !useOldState || state.changedFilesSet.size !== (oldState!.changedFilesSet?.size || 0);
        return state;
    }

    function convertToDiagnostics(diagnostics: readonly ReusableDiagnostic[], newProgram: Program, getCanonicalFileName: GetCanonicalFileName): readonly Diagnostic[] {
        if (!diagnostics.length) return emptyArray;
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(newProgram.getCompilerOptions())!, newProgram.getCurrentDirectory()));
        return diagnostics.map(diagnostic => {
            const result: Diagnostic = convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPath);
            result.reportsUnnecessary = diagnostic.reportsUnnecessary;
            result.reportsDeprecated = diagnostic.reportDeprecated;
            result.source = diagnostic.source;
            result.skippedOn = diagnostic.skippedOn;
            const { relatedInformation } = diagnostic;
            result.relatedInformation = relatedInformation ?
                relatedInformation.length ?
                    relatedInformation.map(r => convertToDiagnosticRelatedInformation(r, newProgram, toPath)) :
                    [] :
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

    function backupBuilderProgramEmitState(state: Readonly<BuilderProgramState>): SavedBuildProgramEmitState {
        const outFilePath = outFile(state.compilerOptions);
        // Only in --out changeFileSet is kept around till emit
        Debug.assert(!state.changedFilesSet.size || outFilePath);
        return {
            affectedFilesPendingEmit: state.affectedFilesPendingEmit && state.affectedFilesPendingEmit.slice(),
            affectedFilesPendingEmitKind: state.affectedFilesPendingEmitKind && new Map(state.affectedFilesPendingEmitKind),
            affectedFilesPendingEmitIndex: state.affectedFilesPendingEmitIndex,
            seenEmittedFiles: state.seenEmittedFiles && new Map(state.seenEmittedFiles),
            programEmitComplete: state.programEmitComplete,
            emitSignatures: state.emitSignatures && new Map(state.emitSignatures),
            outSignature: state.outSignature,
            dtsChangeTime: state.dtsChangeTime,
            hasChangedEmitSignature: state.hasChangedEmitSignature,
            changedFilesSet: outFilePath ? new Set(state.changedFilesSet) : undefined,
        };
    }

    function restoreBuilderProgramEmitState(state: BuilderProgramState, savedEmitState: SavedBuildProgramEmitState) {
        state.affectedFilesPendingEmit = savedEmitState.affectedFilesPendingEmit;
        state.affectedFilesPendingEmitKind = savedEmitState.affectedFilesPendingEmitKind;
        state.affectedFilesPendingEmitIndex = savedEmitState.affectedFilesPendingEmitIndex;
        state.seenEmittedFiles = savedEmitState.seenEmittedFiles;
        state.programEmitComplete = savedEmitState.programEmitComplete;
        state.emitSignatures = savedEmitState.emitSignatures;
        state.outSignature = savedEmitState.outSignature;
        state.dtsChangeTime = savedEmitState.dtsChangeTime;
        state.hasChangedEmitSignature = savedEmitState.hasChangedEmitSignature;
        if (savedEmitState.changedFilesSet) state.changedFilesSet = savedEmitState.changedFilesSet;
    }

    /**
     * Verifies that source file is ok to be used in calls that arent handled by next
     */
    function assertSourceFileOkWithoutNextAffectedCall(state: BuilderProgramState, sourceFile: SourceFile | undefined) {
        Debug.assert(!sourceFile || !state.affectedFiles || state.affectedFiles[state.affectedFilesIndex! - 1] !== sourceFile || !state.semanticDiagnosticsPerFile!.has(sourceFile.resolvedPath));
    }

    /**
     * This function returns the next affected file to be processed.
     * Note that until doneAffected is called it would keep reporting same result
     * This is to allow the callers to be able to actually remove affected file only when the operation is complete
     * eg. if during diagnostics check cancellation token ends up cancelling the request, the affected file should be retained
     */
    function getNextAffectedFile(state: BuilderProgramState, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash, host: BuilderProgramHost): SourceFile | Program | undefined {
        while (true) {
            const { affectedFiles } = state;
            if (affectedFiles) {
                const seenAffectedFiles = state.seenAffectedFiles!;
                let affectedFilesIndex = state.affectedFilesIndex!; // TODO: GH#18217
                while (affectedFilesIndex < affectedFiles.length) {
                    const affectedFile = affectedFiles[affectedFilesIndex];
                    if (!seenAffectedFiles.has(affectedFile.resolvedPath)) {
                        // Set the next affected file as seen and remove the cached semantic diagnostics
                        state.affectedFilesIndex = affectedFilesIndex;
                        handleDtsMayChangeOfAffectedFile(state, affectedFile, cancellationToken, computeHash, host);
                        return affectedFile;
                    }
                    affectedFilesIndex++;
                }

                // Remove the changed file from the change set
                state.changedFilesSet.delete(state.currentChangedFilePath!);
                state.currentChangedFilePath = undefined;
                // Commit the changes in file signature
                state.oldSignatures?.clear();
                state.oldExportedModulesMap?.clear();
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
            const program = Debug.checkDefined(state.program);
            const compilerOptions = program.getCompilerOptions();
            if (outFile(compilerOptions)) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                return program;
            }

            // Get next batch of affected files
            state.affectedFiles = BuilderState.getFilesAffectedByWithOldState(state, program, nextKey.value, cancellationToken, computeHash);
            state.currentChangedFilePath = nextKey.value;
            state.affectedFilesIndex = 0;
            if (!state.seenAffectedFiles) state.seenAffectedFiles = new Set();
        }
    }

    function clearAffectedFilesPendingEmit(state: BuilderProgramState) {
        state.affectedFilesPendingEmit = undefined;
        state.affectedFilesPendingEmitKind = undefined;
        state.affectedFilesPendingEmitIndex = undefined;
    }

    /**
     * Returns next file to be emitted from files that retrieved semantic diagnostics but did not emit yet
     */
    function getNextAffectedFilePendingEmit(state: BuilderProgramState) {
        const { affectedFilesPendingEmit } = state;
        if (affectedFilesPendingEmit) {
            const seenEmittedFiles = (state.seenEmittedFiles || (state.seenEmittedFiles = new Map()));
            for (let i = state.affectedFilesPendingEmitIndex!; i < affectedFilesPendingEmit.length; i++) {
                const affectedFile = Debug.checkDefined(state.program).getSourceFileByPath(affectedFilesPendingEmit[i]);
                if (affectedFile) {
                    const seenKind = seenEmittedFiles.get(affectedFile.resolvedPath);
                    const emitKind = Debug.checkDefined(Debug.checkDefined(state.affectedFilesPendingEmitKind).get(affectedFile.resolvedPath));
                    if (seenKind === undefined || seenKind < emitKind) {
                        // emit this file
                        state.affectedFilesPendingEmitIndex = i;
                        return { affectedFile, emitKind };
                    }
                }
            }
            clearAffectedFilesPendingEmit(state);
        }
        return undefined;
    }

    function removeDiagnosticsOfLibraryFiles(state: BuilderProgramState) {
        if (!state.cleanedDiagnosticsOfLibFiles) {
            state.cleanedDiagnosticsOfLibFiles = true;
            const program = Debug.checkDefined(state.program);
            const options = program.getCompilerOptions();
            forEach(program.getSourceFiles(), f =>
                program.isSourceFileDefaultLibrary(f) &&
                !skipTypeChecking(f, options, program) &&
                removeSemanticDiagnosticsOf(state, f.resolvedPath)
            );
        }
    }

    /**
     *  Handles semantic diagnostics and dts emit for affectedFile and files, that are referencing modules that export entities from affected file
     *  This is because even though js emit doesnt change, dts emit / type used can change resulting in need for dts emit and js change
     */
    function handleDtsMayChangeOfAffectedFile(
        state: BuilderProgramState,
        affectedFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        computeHash: BuilderState.ComputeHash,
        host: BuilderProgramHost,
    ) {
        removeSemanticDiagnosticsOf(state, affectedFile.resolvedPath);

        // If affected files is everything except default library, then nothing more to do
        if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles) {
            removeDiagnosticsOfLibraryFiles(state);
            // When a change affects the global scope, all files are considered to be affected without updating their signature
            // That means when affected file is handled, its signature can be out of date
            // To avoid this, ensure that we update the signature for any affected file in this scenario.
            BuilderState.updateShapeSignature(
                state,
                Debug.checkDefined(state.program),
                affectedFile,
                cancellationToken,
                computeHash,
            );
            return;
        }
        if (state.compilerOptions.assumeChangesOnlyAffectDirectDependencies) return;
        handleDtsMayChangeOfReferencingExportOfAffectedFile(state, affectedFile, cancellationToken, computeHash, host);
    }

    /**
     * Handle the dts may change, so they need to be added to pending emit if dts emit is enabled,
     * Also we need to make sure signature is updated for these files
     */
    function handleDtsMayChangeOf(
        state: BuilderProgramState,
        path: Path,
        cancellationToken: CancellationToken | undefined,
        computeHash: BuilderState.ComputeHash,
        host: BuilderProgramHost
    ): void {
        removeSemanticDiagnosticsOf(state, path);

        if (!state.changedFilesSet.has(path)) {
            const program = Debug.checkDefined(state.program);
            const sourceFile = program.getSourceFileByPath(path);
            if (sourceFile) {
                // Even though the js emit doesnt change and we are already handling dts emit and semantic diagnostics
                // we need to update the signature to reflect correctness of the signature(which is output d.ts emit) of this file
                // This ensures that we dont later during incremental builds considering wrong signature.
                // Eg where this also is needed to ensure that .tsbuildinfo generated by incremental build should be same as if it was first fresh build
                // But we avoid expensive full shape computation, as using file version as shape is enough for correctness.
                BuilderState.updateShapeSignature(
                    state,
                    program,
                    sourceFile,
                    cancellationToken,
                    computeHash,
                    !host.disableUseFileVersionAsSignature
                );
                // If not dts emit, nothing more to do
                if (getEmitDeclarations(state.compilerOptions)) {
                    addToAffectedFilesPendingEmit(state, path, BuilderFileEmit.DtsOnly);
                }
            }
        }
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

    function isChangedSignature(state: BuilderProgramState, path: Path) {
        const oldSignature = Debug.checkDefined(state.oldSignatures).get(path) || undefined;
        const newSignature = Debug.checkDefined(state.fileInfos.get(path)).signature;
        return newSignature !== oldSignature;
    }

    function handleDtsMayChangeOfGlobalScope(
        state: BuilderProgramState,
        filePath: Path,
        cancellationToken: CancellationToken | undefined,
        computeHash: BuilderState.ComputeHash,
        host: BuilderProgramHost,
    ): boolean {
        if (!state.fileInfos.get(filePath)?.affectsGlobalScope) return false;
        // Every file needs to be handled
        BuilderState.getAllFilesExcludingDefaultLibraryFile(state, state.program!, /*firstSourceFile*/ undefined)
            .forEach(file => handleDtsMayChangeOf(
                state,
                file.resolvedPath,
                cancellationToken,
                computeHash,
                host,
            ));
        removeDiagnosticsOfLibraryFiles(state);
        return true;
    }

    /**
     * Iterate on referencing modules that export entities from affected file and delete diagnostics and add pending emit
     */
    function handleDtsMayChangeOfReferencingExportOfAffectedFile(
        state: BuilderProgramState,
        affectedFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        computeHash: BuilderState.ComputeHash,
        host: BuilderProgramHost
    ) {
        // If there was change in signature (dts output) for the changed file,
        // then only we need to handle pending file emit
        if (!state.exportedModulesMap || !state.changedFilesSet.has(affectedFile.resolvedPath)) return;
        if (!isChangedSignature(state, affectedFile.resolvedPath)) return;

        // Since isolated modules dont change js files, files affected by change in signature is itself
        // But we need to cleanup semantic diagnostics and queue dts emit for affected files
        if (state.compilerOptions.isolatedModules) {
            const seenFileNamesMap = new Map<Path, true>();
            seenFileNamesMap.set(affectedFile.resolvedPath, true);
            const queue = BuilderState.getReferencedByPaths(state, affectedFile.resolvedPath);
            while (queue.length > 0) {
                const currentPath = queue.pop()!;
                if (!seenFileNamesMap.has(currentPath)) {
                    seenFileNamesMap.set(currentPath, true);
                    if (handleDtsMayChangeOfGlobalScope(state, currentPath, cancellationToken, computeHash, host)) return;
                    handleDtsMayChangeOf(state, currentPath, cancellationToken, computeHash, host);
                    if (isChangedSignature(state, currentPath)) {
                        const currentSourceFile = Debug.checkDefined(state.program).getSourceFileByPath(currentPath)!;
                        queue.push(...BuilderState.getReferencedByPaths(state, currentSourceFile.resolvedPath));
                    }
                }
            }
        }

        const seenFileAndExportsOfFile = new Set<string>();
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        state.exportedModulesMap.getKeys(affectedFile.resolvedPath)?.forEach(exportedFromPath => {
            if (handleDtsMayChangeOfGlobalScope(state, exportedFromPath, cancellationToken, computeHash, host)) return true;
            const references = state.referencedMap!.getKeys(exportedFromPath);
            return references && forEachKey(references, filePath =>
                handleDtsMayChangeOfFileAndExportsOfFile(
                    state,
                    filePath,
                    seenFileAndExportsOfFile,
                    cancellationToken,
                    computeHash,
                    host,
                )
            );
        });
    }

    /**
     * handle dts and semantic diagnostics on file and iterate on anything that exports this file
     * return true when all work is done and we can exit handling dts emit and semantic diagnostics
     */
    function handleDtsMayChangeOfFileAndExportsOfFile(
        state: BuilderProgramState,
        filePath: Path,
        seenFileAndExportsOfFile: Set<string>,
        cancellationToken: CancellationToken | undefined,
        computeHash: BuilderState.ComputeHash,
        host: BuilderProgramHost,
    ): boolean | undefined {
        if (!tryAddToSet(seenFileAndExportsOfFile, filePath)) return undefined;

        if (handleDtsMayChangeOfGlobalScope(state, filePath, cancellationToken, computeHash, host)) return true;
        handleDtsMayChangeOf(state, filePath, cancellationToken, computeHash, host);

        // If exported modules has path, all files referencing file exported from are affected
        state.exportedModulesMap!.getKeys(filePath)?.forEach(exportedFromPath =>
            handleDtsMayChangeOfFileAndExportsOfFile(
                state,
                exportedFromPath,
                seenFileAndExportsOfFile,
                cancellationToken,
                computeHash,
                host,
            )
        );

        // Remove diagnostics of files that import this file (without going to exports of referencing files)
        state.referencedMap!.getKeys(filePath)?.forEach(referencingFilePath =>
            !seenFileAndExportsOfFile.has(referencingFilePath) && // Not already removed diagnostic file
            handleDtsMayChangeOf( // Dont add to seen since this is not yet done with the export removal
                state,
                referencingFilePath,
                cancellationToken,
                computeHash,
                host,
            )
        );
        return undefined;
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
            state.buildInfoEmitPending = false;
        }
        else if (affected === state.program) {
            state.changedFilesSet.clear();
            state.programEmitComplete = true;
        }
        else {
            state.seenAffectedFiles!.add((affected as SourceFile).resolvedPath);
            // Change in changeSet/affectedFilesPendingEmit, buildInfo needs to be emitted
            state.buildInfoEmitPending = true;
            if (emitKind !== undefined) {
                (state.seenEmittedFiles || (state.seenEmittedFiles = new Map())).set((affected as SourceFile).resolvedPath, emitKind);
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
     * Gets semantic diagnostics for the file which are
     * bindAndCheckDiagnostics (from cache) and program diagnostics
     */
    function getSemanticDiagnosticsOfFile(state: BuilderProgramState, sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
        return concatenate(
            getBinderAndCheckerDiagnosticsOfFile(state, sourceFile, cancellationToken),
            Debug.checkDefined(state.program).getProgramDiagnostics(sourceFile)
        );
    }

    /**
     * Gets the binder and checker diagnostics either from cache if present, or otherwise from program and caches it
     * Note that it is assumed that when asked about binder and checker diagnostics, the file has been taken out of affected files/changed file set
     */
    function getBinderAndCheckerDiagnosticsOfFile(state: BuilderProgramState, sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
        const path = sourceFile.resolvedPath;
        if (state.semanticDiagnosticsPerFile) {
            const cachedDiagnostics = state.semanticDiagnosticsPerFile.get(path);
            // Report the bind and check diagnostics from the cache if we already have those diagnostics present
            if (cachedDiagnostics) {
                return filterSemanticDiagnostics(cachedDiagnostics, state.compilerOptions);
            }
        }

        // Diagnostics werent cached, get them from program, and cache the result
        const diagnostics = Debug.checkDefined(state.program).getBindAndCheckDiagnostics(sourceFile, cancellationToken);
        if (state.semanticDiagnosticsPerFile) {
            state.semanticDiagnosticsPerFile.set(path, diagnostics);
        }
        return filterSemanticDiagnostics(diagnostics, state.compilerOptions);
    }

    export type ProgramBuildInfoFileId = number & { __programBuildInfoFileIdBrand: any };
    export type ProgramBuildInfoFileIdListId = number & { __programBuildInfoFileIdListIdBrand: any };
    export type ProgramBuildInfoDiagnostic = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, diagnostics: readonly ReusableDiagnostic[]];
    export type ProgramBuilderInfoFilePendingEmit = [fileId: ProgramBuildInfoFileId, emitKind: BuilderFileEmit];
    export type ProgramBuildInfoReferencedMap = [fileId: ProgramBuildInfoFileId, fileIdListId: ProgramBuildInfoFileIdListId][];
    export type ProgramBuildInfoBuilderStateFileInfo = Omit<BuilderState.FileInfo, "signature"> & {
        /**
         * Signature is
         * - undefined if FileInfo.version === FileInfo.signature
         * - false if FileInfo has signature as undefined (not calculated)
         * - string actual signature
         */
        signature: string | false | undefined;
    };
    /**
     * [fileId, signature] if different from file's signature
     * fileId if file wasnt emitted
     */
    export type ProgramBuildInfoEmitSignature = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, signature: string];
    /**
     * ProgramBuildInfoFileInfo is string if FileInfo.version === FileInfo.signature && !FileInfo.affectsGlobalScope otherwise encoded FileInfo
     */
    export type ProgramBuildInfoFileInfo = string | ProgramBuildInfoBuilderStateFileInfo;
    export interface ProgramMultiFileEmitBuildInfo {
        fileNames: readonly string[];
        fileInfos: readonly ProgramBuildInfoFileInfo[];
        options: CompilerOptions | undefined;
        fileIdsList?: readonly (readonly ProgramBuildInfoFileId[])[];
        referencedMap?: ProgramBuildInfoReferencedMap;
        exportedModulesMap?: ProgramBuildInfoReferencedMap;
        semanticDiagnosticsPerFile?: ProgramBuildInfoDiagnostic[];
        affectedFilesPendingEmit?: ProgramBuilderInfoFilePendingEmit[];
        changeFileSet?: readonly ProgramBuildInfoFileId[];
        emitSignatures?: readonly ProgramBuildInfoEmitSignature[];
        dtsChangeTime?: number;
    }

    export interface ProgramBundleEmitBuildInfo {
        fileNames: readonly string[];
        fileInfos: readonly string[];
        options: CompilerOptions | undefined;
        outSignature?: string;
        dtsChangeTime?: number;
    }

    export type ProgramBuildInfo = ProgramMultiFileEmitBuildInfo | ProgramBundleEmitBuildInfo;

    export function isProgramBundleEmitBuildInfo(info: ProgramBuildInfo): info is ProgramBundleEmitBuildInfo {
        return !!outFile(info.options || {});
    }

    /**
     * Gets the program information to be emitted in buildInfo so that we can use it to create new program
     */
    function getProgramBuildInfo(state: BuilderProgramState, getCanonicalFileName: GetCanonicalFileName, host: BuilderProgramHost): ProgramBuildInfo | undefined {
        const outFilePath = outFile(state.compilerOptions);
        if (outFilePath && !state.compilerOptions.composite) return;
        const currentDirectory = Debug.checkDefined(state.program).getCurrentDirectory();
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(state.compilerOptions)!, currentDirectory));
        // Update the dtsChange time in buildInfo
        state.dtsChangeTime = state.hasChangedEmitSignature ? getCurrentTime(host).getTime() : state.dtsChangeTime;
        if (outFilePath) {
            const fileNames: string[] = [];
            const fileInfos: string[] = [];
            state.program!.getRootFileNames().forEach(f => {
                const sourceFile = state.program!.getSourceFile(f);
                if (!sourceFile) return;
                fileNames.push(relativeToBuildInfo(sourceFile.resolvedPath));
                fileInfos.push(sourceFile.version);
            });
            const result: ProgramBundleEmitBuildInfo = {
                fileNames,
                fileInfos,
                options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions, "affectsBundleEmitBuildInfo"),
                outSignature: state.outSignature,
                dtsChangeTime: state.dtsChangeTime,
            };
            return result;
        }

        const fileNames: string[] = [];
        const fileNameToFileId = new Map<string, ProgramBuildInfoFileId>();
        let fileIdsList: (readonly ProgramBuildInfoFileId[])[] | undefined;
        let fileNamesToFileIdListId: ESMap<string, ProgramBuildInfoFileIdListId> | undefined;
        let emitSignatures: ProgramBuildInfoEmitSignature[] | undefined;
        const fileInfos = arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramBuildInfoFileInfo => {
            // Ensure fileId
            const fileId = toFileId(key);
            Debug.assert(fileNames[fileId - 1] === relativeToBuildInfo(key));
            const oldSignature = state.oldSignatures?.get(key);
            const actualSignature = oldSignature !== undefined ? oldSignature || undefined : value.signature;
            if (state.compilerOptions.composite) {
                const file = state.program!.getSourceFileByPath(key)!;
                if (!isJsonSourceFile(file) && sourceFileMayBeEmitted(file, state.program!)) {
                    const emitSignature = state.emitSignatures?.get(key);
                    if (emitSignature !== actualSignature) {
                        (emitSignatures ||= []).push(emitSignature === undefined ? fileId : [fileId, emitSignature]);
                    }
                }
            }
            return value.version === actualSignature ?
                value.affectsGlobalScope || value.impliedFormat ?
                    // If file version is same as signature, dont serialize signature
                    { version: value.version, signature: undefined, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat } :
                    // If file info only contains version and signature and both are same we can just write string
                    value.version :
                actualSignature !== undefined ? // If signature is not same as version, encode signature in the fileInfo
                    oldSignature === undefined ?
                        // If we havent computed signature, use fileInfo as is
                        value :
                        // Serialize fileInfo with new updated signature
                        { version: value.version, signature: actualSignature, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat } :
                    // Signature of the FileInfo is undefined, serialize it as false
                    { version: value.version, signature: false, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat };
        });

        let referencedMap: ProgramBuildInfoReferencedMap | undefined;
        if (state.referencedMap) {
            referencedMap = arrayFrom(state.referencedMap.keys()).sort(compareStringsCaseSensitive).map(key => [
                toFileId(key),
                toFileIdListId(state.referencedMap!.getValues(key)!)
            ]);
        }

        let exportedModulesMap: ProgramBuildInfoReferencedMap | undefined;
        if (state.exportedModulesMap) {
            exportedModulesMap = mapDefined(arrayFrom(state.exportedModulesMap.keys()).sort(compareStringsCaseSensitive), key => {
                const oldValue = state.oldExportedModulesMap?.get(key);
                // Not in temporary cache, use existing value
                if (oldValue === undefined) return [toFileId(key), toFileIdListId(state.exportedModulesMap!.getValues(key)!)];
                if (oldValue) return [toFileId(key), toFileIdListId(oldValue)];
                return undefined;
            });
        }

        let semanticDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] | undefined;
        if (state.semanticDiagnosticsPerFile) {
            for (const key of arrayFrom(state.semanticDiagnosticsPerFile.keys()).sort(compareStringsCaseSensitive)) {
                const value = state.semanticDiagnosticsPerFile.get(key)!;
                (semanticDiagnosticsPerFile ||= []).push(
                    value.length ?
                        [
                            toFileId(key),
                            convertToReusableDiagnostics(value, relativeToBuildInfo)
                        ] :
                        toFileId(key)
                );
            }
        }

        let affectedFilesPendingEmit: ProgramBuilderInfoFilePendingEmit[] | undefined;
        if (state.affectedFilesPendingEmit) {
            const seenFiles = new Set<Path>();
            for (const path of state.affectedFilesPendingEmit.slice(state.affectedFilesPendingEmitIndex).sort(compareStringsCaseSensitive)) {
                if (tryAddToSet(seenFiles, path)) {
                    (affectedFilesPendingEmit ||= []).push([toFileId(path), state.affectedFilesPendingEmitKind!.get(path)!]);
                }
            }
        }

        let changeFileSet: ProgramBuildInfoFileId[] | undefined;
        if (state.changedFilesSet.size) {
            for (const path of arrayFrom(state.changedFilesSet.keys()).sort(compareStringsCaseSensitive)) {
                (changeFileSet ||= []).push(toFileId(path));
            }
        }

        const result: ProgramMultiFileEmitBuildInfo = {
            fileNames,
            fileInfos,
            options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions, "affectsMultiFileEmitBuildInfo"),
            fileIdsList,
            referencedMap,
            exportedModulesMap,
            semanticDiagnosticsPerFile,
            affectedFilesPendingEmit,
            changeFileSet,
            emitSignatures,
            dtsChangeTime: state.dtsChangeTime,
        };
        return result;

        function relativeToBuildInfoEnsuringAbsolutePath(path: string) {
            return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
        }

        function relativeToBuildInfo(path: string) {
            return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
        }

        function toFileId(path: Path): ProgramBuildInfoFileId {
            let fileId = fileNameToFileId.get(path);
            if (fileId === undefined) {
                fileNames.push(relativeToBuildInfo(path));
                fileNameToFileId.set(path, fileId = fileNames.length as ProgramBuildInfoFileId);
            }
            return fileId;
        }

        function toFileIdListId(set: ReadonlySet<Path>): ProgramBuildInfoFileIdListId {
            const fileIds = arrayFrom(set.keys(), toFileId).sort(compareValues);
            const key = fileIds.join();
            let fileIdListId = fileNamesToFileIdListId?.get(key);
            if (fileIdListId === undefined) {
                (fileIdsList ||= []).push(fileIds);
                (fileNamesToFileIdListId ||= new Map()).set(key, fileIdListId = fileIdsList.length as ProgramBuildInfoFileIdListId);
            }
            return fileIdListId;
        }

        /**
         * @param optionKey key of CommandLineOption to use to determine if the option should be serialized in tsbuildinfo
         */
        function convertToProgramBuildInfoCompilerOptions(options: CompilerOptions, optionKey: "affectsBundleEmitBuildInfo" | "affectsMultiFileEmitBuildInfo") {
            let result: CompilerOptions | undefined;
            const { optionsNameMap } = getOptionsNameMap();
            for (const name of getOwnKeys(options).sort(compareStringsCaseSensitive)) {
                const optionInfo = optionsNameMap.get(name.toLowerCase());
                if (optionInfo?.[optionKey]) {
                    (result ||= {})[name] = convertToReusableCompilerOptionValue(
                        optionInfo,
                        options[name] as CompilerOptionsValue,
                        relativeToBuildInfoEnsuringAbsolutePath
                    );
                }
            }
            return result;
        }
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
            result.reportDeprecated = diagnostic.reportsDeprecated;
            result.source = diagnostic.source;
            result.skippedOn = diagnostic.skippedOn;
            const { relatedInformation } = diagnostic;
            result.relatedInformation = relatedInformation ?
                relatedInformation.length ?
                    relatedInformation.map(r => convertToReusableDiagnosticRelatedInformation(r, relativeToBuildInfo)) :
                    [] :
                undefined;
            return result;
        });
    }

    function convertToReusableDiagnosticRelatedInformation(diagnostic: DiagnosticRelatedInformation, relativeToBuildInfo: (path: string) => string): ReusableDiagnosticRelatedInformation {
        const { file } = diagnostic;
        return {
            ...diagnostic,
            file: file ? relativeToBuildInfo(file.resolvedPath) : undefined
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

    export function computeSignature(text: string, data: WriteFileCallbackData | undefined, computeHash: BuilderState.ComputeHash | undefined) {
        return BuilderState.computeSignature(data?.sourceMapUrlPos !== undefined ? text.substring(0, data.sourceMapUrlPos) : text, computeHash);
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
        const computeHash = maybeBind(host, host.createHash);
        const state = createBuilderProgramState(newProgram, getCanonicalFileName, oldState, host.disableUseFileVersionAsSignature);
        newProgram.getProgramBuildInfo = () => getProgramBuildInfo(state, getCanonicalFileName, host);

        // To ensure that we arent storing any references to old program or new program without state
        newProgram = undefined!; // TODO: GH#18217
        oldProgram = undefined;
        oldState = undefined;

        const getState = () => state;
        const builderProgram = createRedirectedBuilderProgram(getState, configFileParsingDiagnostics);
        builderProgram.getState = getState;
        builderProgram.saveEmitState = () => backupBuilderProgramEmitState(state);
        builderProgram.restoreEmitState = (saved) => restoreBuilderProgramEmitState(state, saved);
        builderProgram.getAllDependencies = sourceFile => BuilderState.getAllDependencies(state, Debug.checkDefined(state.program), sourceFile);
        builderProgram.getSemanticDiagnostics = getSemanticDiagnostics;
        builderProgram.emit = emit;
        builderProgram.releaseProgram = () => releaseCache(state);

        if (kind === BuilderProgramKind.SemanticDiagnosticsBuilderProgram) {
            (builderProgram as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
        }
        else if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
            (builderProgram as EmitAndSemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
            (builderProgram as EmitAndSemanticDiagnosticsBuilderProgram).emitNextAffectedFile = emitNextAffectedFile;
            builderProgram.emitBuildInfo = emitBuildInfo;
        }
        else {
            notImplemented();
        }

        return builderProgram;

        function emitBuildInfo(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult {
            if (state.buildInfoEmitPending) {
                const result = Debug.checkDefined(state.program).emitBuildInfo(writeFile || maybeBind(host, host.writeFile), cancellationToken);
                state.buildInfoEmitPending = false;
                return result;
            }
            return emitSkippedWithNoDiagnostics;
        }

        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        function emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult> {
            let affected = getNextAffectedFile(state, cancellationToken, computeHash, host);
            let emitKind = BuilderFileEmit.Full;
            let isPendingEmitFile = false;
            if (!affected) {
                if (!outFile(state.compilerOptions)) {
                    const pendingAffectedFile = getNextAffectedFilePendingEmit(state);
                    if (!pendingAffectedFile) {
                        if (!state.buildInfoEmitPending) {
                            return undefined;
                        }

                        const affected = Debug.checkDefined(state.program);
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
                    const program = Debug.checkDefined(state.program);
                    if (state.programEmitComplete) return undefined;
                    affected = program;
                }
            }

            return toAffectedFileEmitResult(
                state,
                // When whole program is affected, do emit only once (eg when --out or --outFile is specified)
                // Otherwise just affected file
                Debug.checkDefined(state.program).emit(
                    affected === state.program ? undefined : affected as SourceFile,
                    getEmitDeclarations(state.compilerOptions) ?
                        getWriteFileCallback(writeFile, customTransformers) :
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

        function getWriteFileCallback(writeFile: WriteFileCallback | undefined, customTransformers: CustomTransformers | undefined): WriteFileCallback {
            return (fileName, text, writeByteOrderMark, onError, sourceFiles, data) => {
                if (isDeclarationFileName(fileName)) {
                    if (!outFile(state.compilerOptions)) {
                        Debug.assert(sourceFiles?.length === 1);
                        let newSignature;
                        if (!customTransformers) {
                            const file = sourceFiles[0];
                            const info = state.fileInfos.get(file.resolvedPath)!;
                            if (info.signature === file.version) {
                                newSignature = computeSignature(text, data, computeHash);
                                if (newSignature !== file.version) { // Update it
                                    if (host.storeFilesChangingSignatureDuringEmit) (state.filesChangingSignature ||= new Set()).add(file.resolvedPath);
                                    if (state.exportedModulesMap) BuilderState.updateExportedModules(state, file, file.exportedModulesFromDeclarationEmit);
                                    if (state.affectedFiles) {
                                        // Keep old signature so we know what to undo if cancellation happens
                                        const existing = state.oldSignatures?.get(file.resolvedPath);
                                        if (existing === undefined) (state.oldSignatures ||= new Map()).set(file.resolvedPath, info.signature || false);
                                        info.signature = newSignature;
                                    }
                                    else {
                                        // These are directly commited
                                        info.signature = newSignature;
                                        state.oldExportedModulesMap?.clear();
                                    }
                                }
                            }
                        }

                        // Store d.ts emit hash so later can be compared to check if d.ts has changed.
                        // Currently we do this only for composite projects since these are the only projects that can be referenced by other projects
                        // and would need their d.ts change time in --build mode
                        if (state.compilerOptions.composite) {
                            const filePath = sourceFiles[0].resolvedPath;
                            const oldSignature = state.emitSignatures?.get(filePath);
                            newSignature ||= computeSignature(text, data, computeHash);
                            if (newSignature !== oldSignature) {
                                (state.emitSignatures ||= new Map()).set(filePath, newSignature);
                                state.hasChangedEmitSignature = true;
                            }
                        }
                    }
                    else if (state.compilerOptions.composite) {
                        const newSignature = computeSignature(text, data, computeHash);
                        if (newSignature !== state.outSignature) {
                            state.outSignature = newSignature;
                            state.hasChangedEmitSignature = true;
                        }
                    }
                }
                if (writeFile) writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
                else if (host.writeFile) host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
                else state.program!.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
            };
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
            }
            const result = handleNoEmitOptions(builderProgram, targetSourceFile, writeFile, cancellationToken);
            if (result) return result;

            // Emit only affected files if using builder for emit
            if (!targetSourceFile) {
                if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
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
                // In non Emit builder, clear affected files pending emit
                else if (state.affectedFilesPendingEmitKind?.size) {
                    Debug.assert(kind === BuilderProgramKind.SemanticDiagnosticsBuilderProgram);
                    // State can clear affected files pending emit if
                    if (!emitOnlyDtsFiles // If we are doing complete emit, affected files pending emit can be cleared
                        // If every file pending emit is pending on only dts emit
                        || every(state.affectedFilesPendingEmit, (path, index) =>
                            index < state.affectedFilesPendingEmitIndex! ||
                            state.affectedFilesPendingEmitKind!.get(path) === BuilderFileEmit.DtsOnly)) {
                        clearAffectedFilesPendingEmit(state);
                    }
                }
            }
            return Debug.checkDefined(state.program).emit(
                targetSourceFile,
                getEmitDeclarations(state.compilerOptions) ?
                    getWriteFileCallback(writeFile, customTransformers) :
                    writeFile || maybeBind(host, host.writeFile),
                cancellationToken,
                emitOnlyDtsFiles,
                customTransformers
            );
        }

        /**
         * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
         * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
         */
        function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]> {
            while (true) {
                const affected = getNextAffectedFile(state, cancellationToken, computeHash, host);
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
                // Apart for emit builder do this for tsbuildinfo, do this for non emit builder when noEmit is set as tsbuildinfo is written and reused between emitters
                if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram || state.compilerOptions.noEmit || state.compilerOptions.noEmitOnError) {
                    addToAffectedFilesPendingEmit(state, (affected as SourceFile).resolvedPath, BuilderFileEmit.Full);
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
            const compilerOptions = Debug.checkDefined(state.program).getCompilerOptions();
            if (outFile(compilerOptions)) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                // We dont need to cache the diagnostics just return them from program
                return Debug.checkDefined(state.program).getSemanticDiagnostics(sourceFile, cancellationToken);
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
            for (const sourceFile of Debug.checkDefined(state.program).getSourceFiles()) {
                diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken));
            }
            return diagnostics || emptyArray;
        }
    }

    function addToAffectedFilesPendingEmit(state: BuilderProgramState, affectedFilePendingEmit: Path, kind: BuilderFileEmit) {
        if (!state.affectedFilesPendingEmit) state.affectedFilesPendingEmit = [];
        if (!state.affectedFilesPendingEmitKind) state.affectedFilesPendingEmitKind = new Map();

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

    export function toBuilderStateFileInfo(fileInfo: ProgramBuildInfoFileInfo): BuilderState.FileInfo {
        return isString(fileInfo) ?
            { version: fileInfo, signature: fileInfo, affectsGlobalScope: undefined, impliedFormat: undefined } :
            isString(fileInfo.signature) ?
                fileInfo as BuilderState.FileInfo :
                { version: fileInfo.version, signature: fileInfo.signature === false ? undefined : fileInfo.version, affectsGlobalScope: fileInfo.affectsGlobalScope, impliedFormat: fileInfo.impliedFormat };
    }

    export function createBuilderProgramUsingProgramBuildInfo(program: ProgramBuildInfo, buildInfoPath: string, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram {
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());

        let state: ReusableBuilderProgramState;
        let filePaths: Path[] | undefined;
        let filePathsSetList: Set<Path>[] | undefined;
        if (isProgramBundleEmitBuildInfo(program)) {
            state = {
                fileInfos: new Map(),
                compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
                dtsChangeTime: program.dtsChangeTime,
                outSignature: program.outSignature,
            };
        }
        else {
            filePaths = program.fileNames?.map(toPath);
            filePathsSetList = program.fileIdsList?.map(fileIds => new Set(fileIds.map(toFilePath)));
            const fileInfos = new Map<Path, BuilderState.FileInfo>();
            const emitSignatures = program.options?.composite && !outFile(program.options) ? new Map<Path, string>() : undefined;
            program.fileInfos.forEach((fileInfo, index) => {
                const path = toFilePath(index + 1 as ProgramBuildInfoFileId);
                const stateFileInfo = toBuilderStateFileInfo(fileInfo);
                fileInfos.set(path, stateFileInfo);
                if (emitSignatures && stateFileInfo.signature) emitSignatures.set(path, stateFileInfo.signature);
            });
            program.emitSignatures?.forEach(value => {
                if (isNumber(value)) emitSignatures!.delete(toFilePath(value));
                else emitSignatures!.set(toFilePath(value[0]), value[1]);
            });
            state = {
                fileInfos,
                compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
                referencedMap: toManyToManyPathMap(program.referencedMap),
                exportedModulesMap: toManyToManyPathMap(program.exportedModulesMap),
                semanticDiagnosticsPerFile: program.semanticDiagnosticsPerFile && arrayToMap(program.semanticDiagnosticsPerFile, value => toFilePath(isNumber(value) ? value : value[0]), value => isNumber(value) ? emptyArray : value[1]),
                hasReusableDiagnostic: true,
                affectedFilesPendingEmit: map(program.affectedFilesPendingEmit, value => toFilePath(value[0])),
                affectedFilesPendingEmitKind: program.affectedFilesPendingEmit && arrayToMap(program.affectedFilesPendingEmit, value => toFilePath(value[0]), value => value[1]),
                affectedFilesPendingEmitIndex: program.affectedFilesPendingEmit && 0,
                changedFilesSet: new Set(map(program.changeFileSet, toFilePath)),
                dtsChangeTime: program.dtsChangeTime,
                emitSignatures: emitSignatures?.size ? emitSignatures : undefined,
            };
        }

        return {
            getState: () => state,
            saveEmitState: noop as BuilderProgram["saveEmitState"],
            restoreEmitState: noop,
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
            emitBuildInfo: notImplemented,
            close: noop,
        };

        function toPath(path: string) {
            return ts.toPath(path, buildInfoDirectory, getCanonicalFileName);
        }

        function toAbsolutePath(path: string) {
            return getNormalizedAbsolutePath(path, buildInfoDirectory);
        }

        function toFilePath(fileId: ProgramBuildInfoFileId) {
            return filePaths![fileId - 1];
        }

        function toFilePathsSet(fileIdsListId: ProgramBuildInfoFileIdListId) {
            return filePathsSetList![fileIdsListId - 1];
        }

        function toManyToManyPathMap(referenceMap: ProgramBuildInfoReferencedMap | undefined): BuilderState.ManyToManyPathMap | undefined {
            if (!referenceMap) {
                return undefined;
            }

            const map = BuilderState.createManyToManyPathMap();
            referenceMap.forEach(([fileId, fileIdListId]) =>
                map.set(toFilePath(fileId), toFilePathsSet(fileIdListId))
            );
            return map;
        }
    }

    export function getBuildInfoFileVersionMap(
        program: ProgramBuildInfo,
        buildInfoPath: string,
        host: Pick<ReadBuildProgramHost, "useCaseSensitiveFileNames" | "getCurrentDirectory">
    ): ESMap<Path, string> {
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        const fileInfos = new Map<Path, string>();
        program.fileInfos.forEach((fileInfo, index) => {
            const path = toPath(program.fileNames[index], buildInfoDirectory, getCanonicalFileName);
            const version = isString(fileInfo) ? fileInfo : (fileInfo as ProgramBuildInfoBuilderStateFileInfo).version; // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
            fileInfos.set(path, version);
        });
        return fileInfos;
    }

    export function createRedirectedBuilderProgram(getState: () => { program?: Program | undefined; compilerOptions: CompilerOptions; }, configFileParsingDiagnostics: readonly Diagnostic[]): BuilderProgram {
        return {
            getState: notImplemented,
            saveEmitState: noop as BuilderProgram["saveEmitState"],
            restoreEmitState: noop,
            getProgram,
            getProgramOrUndefined: () => getState().program,
            releaseProgram: () => getState().program = undefined,
            getCompilerOptions: () => getState().compilerOptions,
            getSourceFile: fileName => getProgram().getSourceFile(fileName),
            getSourceFiles: () => getProgram().getSourceFiles(),
            getOptionsDiagnostics: cancellationToken => getProgram().getOptionsDiagnostics(cancellationToken),
            getGlobalDiagnostics: cancellationToken => getProgram().getGlobalDiagnostics(cancellationToken),
            getConfigFileParsingDiagnostics: () => configFileParsingDiagnostics,
            getSyntacticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSyntacticDiagnostics(sourceFile, cancellationToken),
            getDeclarationDiagnostics: (sourceFile, cancellationToken) => getProgram().getDeclarationDiagnostics(sourceFile, cancellationToken),
            getSemanticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSemanticDiagnostics(sourceFile, cancellationToken),
            emit: (sourceFile, writeFile, cancellationToken, emitOnlyDts, customTransformers) => getProgram().emit(sourceFile, writeFile, cancellationToken, emitOnlyDts, customTransformers),
            emitBuildInfo: (writeFile, cancellationToken) => getProgram().emitBuildInfo(writeFile, cancellationToken),
            getAllDependencies: notImplemented,
            getCurrentDirectory: () => getProgram().getCurrentDirectory(),
            close: noop,
        };

        function getProgram() {
            return Debug.checkDefined(getState().program);
        }
    }
}

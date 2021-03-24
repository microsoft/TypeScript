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

    export interface ReusableBuilderProgramState extends ReusableBuilderState {
        /**
         * Cache of bind and check diagnostics for files with their Path being the key
         */
        semanticDiagnosticsPerFile?: ReadonlyESMap<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
        /**
         * The map has key by source file's path that has been changed
         */
        changedFilesSet?: ReadonlySet<Path>;
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
        currentAffectedFilesSignatures?: ReadonlyESMap<Path, string> | undefined;
        /**
         * Newly computed visible to outside referencedSet
         */
        currentAffectedFilesExportedModulesMap?: Readonly<BuilderState.ComputingExportedModulesMap> | undefined;
        /**
         * True if the semantic diagnostics were copied from the old state
         */
        semanticDiagnosticsFromOldState?: Set<Path>;
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
        affectedFilesPendingEmitKind?: ReadonlyESMap<Path, BuilderFileEmit> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex?: number | undefined;
        /*
         * true if semantic diagnostics are ReusableDiagnostic instead of Diagnostic
         */
        hasReusableDiagnostic?: true;
        persistedProgramState?: PersistedProgramState;
    }

    export interface PersistedProgramState {
        files: readonly SourceFileOfProgramFromBuildInfo[];
        rootFileNames: readonly string[];
        filesByName: ESMap<Path, SourceFileOfProgramFromBuildInfo | Path | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile>;
        fileIncludeReasons: MultiMap<Path, FileIncludeReason>;
        sourceFileFromExternalLibraryPath: Set<Path> | undefined;
        redirectTargetsMap: MultiMap<Path, string>;
        sourceFileToPackageName: ESMap<Path, string>;
        projectReferences: readonly ProjectReference[] | undefined;
        resolvedProjectReferences: readonly (ResolvedProjectReferenceOfProgramFromBuildInfo | undefined)[] | undefined;
        resolvedTypeReferenceDirectives: ESMap<string, ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;
        fileProcessingDiagnostics: FilePreprocessingDiagnostic[] | undefined;
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
        currentAffectedFilesSignatures: ESMap<Path, string> | undefined;
        /**
         * Newly computed visible to outside referencedSet
         */
        currentAffectedFilesExportedModulesMap: BuilderState.ComputingExportedModulesMap | undefined;
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
        affectedFilesPendingEmitKind: ESMap<Path, BuilderFileEmit> | undefined;
        /**
         * Current index to retrieve pending affected file
         */
        affectedFilesPendingEmitIndex: number | undefined;
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
        persistedProgramState?: PersistedProgramState;
    }

    let diagnosticKeyMap: Map<keyof typeof Diagnostics> | undefined;
    function ensureDiagnosticKeyMap(): Map<keyof typeof Diagnostics> {
        if (!diagnosticKeyMap) {
            diagnosticKeyMap = new Map();
            for (const propName in Diagnostics) {
                if (Diagnostics.hasOwnProperty(propName)) {
                    diagnosticKeyMap.set(Diagnostics[propName as keyof typeof Diagnostics].key, propName as keyof typeof Diagnostics);
                }
            }
        }
        return diagnosticKeyMap;
    }

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
        // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
        if (!outFile(compilerOptions)) {
            state.semanticDiagnosticsPerFile = new Map();
        }
        state.changedFilesSet = new Set();

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
            changedFilesSet?.forEach(value => state.changedFilesSet.add(value));
            if (!outFile(compilerOptions) && oldState!.affectedFilesPendingEmit) {
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
            let newReferences: BuilderState.ReferencedSet | undefined;

            // if not using old state, every file is changed
            if (!useOldState ||
                // File wasn't present in old state
                !(oldInfo = oldState!.fileInfos.get(sourceFilePath)) ||
                // versions dont match
                oldInfo.version !== info.version ||
                // Referenced files changed
                !hasSameKeys(newReferences = referencedMap && referencedMap.get(sourceFilePath), oldReferencedMap && oldReferencedMap.get(sourceFilePath)) ||
                // Referenced file was deleted in the new program
                newReferences && forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState!.fileInfos.has(path))) {
                // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
                state.changedFilesSet.add(sourceFilePath);
            }
            else if (canCopySemanticDiagnostics) {
                const sourceFile = newProgram.getSourceFileByPath(sourceFilePath)!;

                if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics) { return; }
                if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics) { return; }

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
        });

        // If the global file is removed, add all files as changed
        if (useOldState && forEachEntry(oldState!.fileInfos, (info, sourceFilePath) => info.affectsGlobalScope && !state.fileInfos.has(sourceFilePath))) {
            BuilderState.getAllFilesExcludingDefaultLibraryFile(state, newProgram, /*firstSourceFile*/ undefined)
                .forEach(file => state.changedFilesSet.add(file.resolvedPath));
        }
        else if (oldCompilerOptions && !outFile(compilerOptions) && compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions)) {
            // Add all files to affectedFilesPendingEmit since emit changed
            newProgram.getSourceFiles().forEach(f => addToAffectedFilesPendingEmit(state, f.resolvedPath, BuilderFileEmit.Full));
            Debug.assert(!state.seenAffectedFiles || !state.seenAffectedFiles.size);
            state.seenAffectedFiles = state.seenAffectedFiles || new Set();
        }

        if (oldState && newProgram.structureIsReused === StructureIsReused.Completely) {
            state.persistedProgramState = oldState.persistedProgramState;
        }

        state.buildInfoEmitPending = !!state.changedFilesSet.size || !!compilerOptions.persistResolutions && newProgram.structureIsReused !== StructureIsReused.Completely;
        return state;
    }

    export function getToPathForBuildInfoFilePath(options: CompilerOptions, currentDirectory: string, getCanonicalFileName: GetCanonicalFileName) {
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(options)!, currentDirectory));
        return (path: string) => toPath(path, buildInfoDirectory, getCanonicalFileName);
    }

    function convertToDiagnostics(diagnostics: readonly ReusableDiagnostic[], newProgram: Program, getCanonicalFileName: GetCanonicalFileName): readonly Diagnostic[] {
        if (!diagnostics.length) return emptyArray;
        const toPath = getToPathForBuildInfoFilePath(newProgram.getCompilerOptions(), newProgram.getCurrentDirectory(), getCanonicalFileName);
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
        createPersistedProgramInfo(state);
        state.program = undefined;
    }

    function createPersistedProgramInfo(state: BuilderProgramState) {
        if (!state.program || !state.compilerOptions.persistResolutions || state.persistedProgramState) return;
        const filesByName = mapEntries(state.program.getFilesByNameMap(), (key, value) => [key, value ? value.path : value as SourceFileOfProgramFromBuildInfo | Path | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile]);
        let sourceFileFromExternalLibraryPath: Set<Path> | undefined;
        const files = mapToReadonlyArray(state.program.getSourceFiles(), toSourceFileOfProgramFromBuildInfo);
        state.persistedProgramState = {
            files,
            rootFileNames: state.program.getRootFileNames(),
            filesByName,
            fileIncludeReasons: state.program.getFileIncludeReasons(),
            sourceFileFromExternalLibraryPath,
            redirectTargetsMap: state.program.redirectTargetsMap,
            sourceFileToPackageName: state.program.sourceFileToPackageName,
            projectReferences: state.program.getProjectReferences(),
            resolvedProjectReferences: state.program.getResolvedProjectReferences()?.map(toResolvedProjectReferenceOfProgramFromBuildInfo),
            resolvedTypeReferenceDirectives: state.program.getResolvedTypeReferenceDirectives(),
            fileProcessingDiagnostics: state.program.getFileProcessingDiagnostics(),
        };

        function toSourceFileOfProgramFromBuildInfo(sourceFile: SourceFile): SourceFileOfProgramFromBuildInfo {
            if (state.program!.isSourceFileFromExternalLibraryPath(sourceFile.path)) (sourceFileFromExternalLibraryPath ||= new Set()).add(sourceFile.path);
            const file: SourceFileOfProgramFromBuildInfo = {
                fileName: sourceFile.fileName,
                originalFileName: sourceFile.originalFileName,
                path: sourceFile.path,
                resolvedPath: sourceFile.resolvedPath,
                flags: sourceFile.flags,
                version: sourceFile.version,
                typeReferenceDirectives: mapToReadonlyArray(sourceFile.typeReferenceDirectives, toFileReference),
                libReferenceDirectives: mapToReadonlyArray(sourceFile.libReferenceDirectives, toFileReference),
                referencedFiles: mapToReadonlyArray(sourceFile.referencedFiles, toFileReference),
                imports: mapToReadonlyArray(sourceFile.imports, toStringLiteralLikeOfProgramFromBuildInfo),
                moduleAugmentations: mapToReadonlyArray(sourceFile.moduleAugmentations, toModuleNameOfProgramFromBuildInfo),
                ambientModuleNames: sourceFile.ambientModuleNames,
                hasNoDefaultLib: sourceFile.hasNoDefaultLib,
                resolvedModules: sourceFile.resolvedModules,
                resolvedTypeReferenceDirectiveNames: sourceFile.resolvedTypeReferenceDirectiveNames,
                redirectInfo: sourceFile.redirectInfo && { redirectTarget: { path: sourceFile.redirectInfo.redirectTarget.path } }
            };

            if (state.program!.getFilesByNameMap().get(file.path) === sourceFile) filesByName.set(file.path, file);
            if (state.program!.getFilesByNameMap().get(file.resolvedPath) === sourceFile) filesByName.set(file.resolvedPath, file);
            return file;
        }
        function toResolvedProjectReferenceOfProgramFromBuildInfo(ref: ResolvedProjectReference | undefined): ResolvedProjectReferenceOfProgramFromBuildInfo | undefined {
            return ref && {
                commandLine: {
                    fileNames: ref.commandLine.fileNames,
                    options: ref.commandLine.options,
                    projectReferences: ref.commandLine.projectReferences
                },
                sourceFile: { version: ref.sourceFile.version, path: ref.sourceFile.path },
                references: ref.references?.map(toResolvedProjectReferenceOfProgramFromBuildInfo)
            };
        }
        function toStringLiteralLikeOfProgramFromBuildInfo(name: StringLiteralLike): StringLiteralLikeOfProgramFromBuildInfo {
            return { kind: name.kind, text: name.text };
        }

        function toModuleNameOfProgramFromBuildInfo(name: StringLiteralLike | Identifier): ModuleNameOfProgramFromBuildInfo {
            return isIdentifier(name) ? { kind: name.kind, escapedText: name.escapedText } : toStringLiteralLikeOfProgramFromBuildInfo(name);
        }

        function toFileReference(f: FileReference) {
            return f.fileName;
        }
    }

    /**
     * Creates a clone of the state
     */
    function cloneBuilderProgramState(state: Readonly<BuilderProgramState>): BuilderProgramState {
        const newState = BuilderState.clone(state) as BuilderProgramState;
        newState.semanticDiagnosticsPerFile = state.semanticDiagnosticsPerFile && new Map(state.semanticDiagnosticsPerFile);
        newState.changedFilesSet = new Set(state.changedFilesSet);
        newState.affectedFiles = state.affectedFiles;
        newState.affectedFilesIndex = state.affectedFilesIndex;
        newState.currentChangedFilePath = state.currentChangedFilePath;
        newState.currentAffectedFilesSignatures = state.currentAffectedFilesSignatures && new Map(state.currentAffectedFilesSignatures);
        newState.currentAffectedFilesExportedModulesMap = state.currentAffectedFilesExportedModulesMap && new Map(state.currentAffectedFilesExportedModulesMap);
        newState.seenAffectedFiles = state.seenAffectedFiles && new Set(state.seenAffectedFiles);
        newState.cleanedDiagnosticsOfLibFiles = state.cleanedDiagnosticsOfLibFiles;
        newState.semanticDiagnosticsFromOldState = state.semanticDiagnosticsFromOldState && new Set(state.semanticDiagnosticsFromOldState);
        newState.program = state.program;
        newState.compilerOptions = state.compilerOptions;
        newState.affectedFilesPendingEmit = state.affectedFilesPendingEmit && state.affectedFilesPendingEmit.slice();
        newState.affectedFilesPendingEmitKind = state.affectedFilesPendingEmitKind && new Map(state.affectedFilesPendingEmitKind);
        newState.affectedFilesPendingEmitIndex = state.affectedFilesPendingEmitIndex;
        newState.seenEmittedFiles = state.seenEmittedFiles && new Map(state.seenEmittedFiles);
        newState.programEmitComplete = state.programEmitComplete;
        return newState;
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
    function getNextAffectedFile(state: BuilderProgramState, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash): SourceFile | Program | undefined {
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
            const program = Debug.checkDefined(state.program);
            const compilerOptions = program.getCompilerOptions();
            if (outFile(compilerOptions)) {
                Debug.assert(!state.semanticDiagnosticsPerFile);
                return program;
            }

            // Get next batch of affected files
            if (!state.currentAffectedFilesSignatures) state.currentAffectedFilesSignatures = new Map();
            if (state.exportedModulesMap) {
                if (!state.currentAffectedFilesExportedModulesMap) state.currentAffectedFilesExportedModulesMap = new Map();
            }
            state.affectedFiles = BuilderState.getFilesAffectedBy(state, program, nextKey.value, cancellationToken, computeHash, state.currentAffectedFilesSignatures, state.currentAffectedFilesExportedModulesMap);
            state.currentChangedFilePath = nextKey.value;
            state.affectedFilesIndex = 0;
            if (!state.seenAffectedFiles) state.seenAffectedFiles = new Set();
        }
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
        removeSemanticDiagnosticsOf(state, affectedFile.resolvedPath);

        // If affected files is everything except default library, then nothing more to do
        if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles) {
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
            // When a change affects the global scope, all files are considered to be affected without updating their signature
            // That means when affected file is handled, its signature can be out of date
            // To avoid this, ensure that we update the signature for any affected file in this scenario.
            BuilderState.updateShapeSignature(
                state,
                Debug.checkDefined(state.program),
                affectedFile,
                Debug.checkDefined(state.currentAffectedFilesSignatures),
                cancellationToken,
                computeHash,
                state.currentAffectedFilesExportedModulesMap
            );
            return;
        }
        else {
            Debug.assert(state.hasCalledUpdateShapeSignature.has(affectedFile.resolvedPath) || state.currentAffectedFilesSignatures?.has(affectedFile.resolvedPath), `Signature not updated for affected file: ${affectedFile.fileName}`);
        }

        if (!state.compilerOptions.assumeChangesOnlyAffectDirectDependencies) {
            forEachReferencingModulesOfExportOfAffectedFile(state, affectedFile, (state, path) => handleDtsMayChangeOf(state, path, cancellationToken, computeHash));
        }
    }

    /**
     * Handle the dts may change, so they need to be added to pending emit if dts emit is enabled,
     * Also we need to make sure signature is updated for these files
     */
    function handleDtsMayChangeOf(state: BuilderProgramState, path: Path, cancellationToken: CancellationToken | undefined, computeHash: BuilderState.ComputeHash) {
        removeSemanticDiagnosticsOf(state, path);

        if (!state.changedFilesSet.has(path)) {
            const program = Debug.checkDefined(state.program);
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
                    Debug.checkDefined(state.currentAffectedFilesSignatures),
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

    function isChangedSignature(state: BuilderProgramState, path: Path) {
        const newSignature = Debug.checkDefined(state.currentAffectedFilesSignatures).get(path);
        const oldSignature = Debug.checkDefined(state.fileInfos.get(path)).signature;
        return newSignature !== oldSignature;
    }

    /**
     * Iterate on referencing modules that export entities from affected file
     */
    function forEachReferencingModulesOfExportOfAffectedFile(state: BuilderProgramState, affectedFile: SourceFile, fn: (state: BuilderProgramState, filePath: Path) => boolean) {
        // If there was change in signature (dts output) for the changed file,
        // then only we need to handle pending file emit
        if (!state.exportedModulesMap || !state.changedFilesSet.has(affectedFile.resolvedPath)) {
            return;
        }

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
                    const result = fn(state, currentPath);
                    if (result && isChangedSignature(state, currentPath)) {
                        const currentSourceFile = Debug.checkDefined(state.program).getSourceFileByPath(currentPath)!;
                        queue.push(...BuilderState.getReferencedByPaths(state, currentSourceFile.resolvedPath));
                    }
                }
            }
        }

        Debug.assert(!!state.currentAffectedFilesExportedModulesMap);
        const seenFileAndExportsOfFile = new Set<string>();
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.currentAffectedFilesExportedModulesMap, (exportedModules, exportedFromPath) =>
            exportedModules &&
            exportedModules.has(affectedFile.resolvedPath) &&
            forEachFilesReferencingPath(state, exportedFromPath, seenFileAndExportsOfFile, fn)
        )) {
            return;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        forEachEntry(state.exportedModulesMap, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(affectedFile.resolvedPath) &&
            forEachFilesReferencingPath(state, exportedFromPath, seenFileAndExportsOfFile, fn)
        );
    }

    /**
     * Iterate on files referencing referencedPath
     */
    function forEachFilesReferencingPath(state: BuilderProgramState, referencedPath: Path, seenFileAndExportsOfFile: Set<string>, fn: (state: BuilderProgramState, filePath: Path) => boolean) {
        return forEachEntry(state.referencedMap!, (referencesInFile, filePath) =>
            referencesInFile.has(referencedPath) && forEachFileAndExportsOfFile(state, filePath, seenFileAndExportsOfFile, fn)
        );
    }

    /**
     * fn on file and iterate on anything that exports this file
     */
    function forEachFileAndExportsOfFile(state: BuilderProgramState, filePath: Path, seenFileAndExportsOfFile: Set<string>, fn: (state: BuilderProgramState, filePath: Path) => boolean): boolean {
        if (!tryAddToSet(seenFileAndExportsOfFile, filePath)) {
            return false;
        }

        if (fn(state, filePath)) {
            // If there are no more diagnostics from old cache, done
            return true;
        }

        Debug.assert(!!state.currentAffectedFilesExportedModulesMap);
        // Go through exported modules from cache first
        // If exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.currentAffectedFilesExportedModulesMap, (exportedModules, exportedFromPath) =>
            exportedModules &&
            exportedModules.has(filePath) &&
            forEachFileAndExportsOfFile(state, exportedFromPath, seenFileAndExportsOfFile, fn)
        )) {
            return true;
        }

        // If exported from path is not from cache and exported modules has path, all files referencing file exported from are affected
        if (forEachEntry(state.exportedModulesMap!, (exportedModules, exportedFromPath) =>
            !state.currentAffectedFilesExportedModulesMap!.has(exportedFromPath) && // If we already iterated this through cache, ignore it
            exportedModules.has(filePath) &&
            forEachFileAndExportsOfFile(state, exportedFromPath, seenFileAndExportsOfFile, fn)
        )) {
            return true;
        }

        // Remove diagnostics of files that import this file (without going to exports of referencing files)
        return !!forEachEntry(state.referencedMap!, (referencesInFile, referencingFilePath) =>
            referencesInFile.has(filePath) &&
            !seenFileAndExportsOfFile.has(referencingFilePath) && // Not already removed diagnostic file
            fn(state, referencingFilePath) // Dont add to seen since this is not yet done with the export removal
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
            state.buildInfoEmitPending = false;
        }
        else if (affected === state.program) {
            state.changedFilesSet.clear();
            state.programEmitComplete = true;
        }
        else {
            state.seenAffectedFiles!.add((affected as SourceFile).resolvedPath);
            if (emitKind !== undefined) {
                (state.seenEmittedFiles || (state.seenEmittedFiles = new Map())).set((affected as SourceFile).resolvedPath, emitKind);
            }
            if (isPendingEmit) {
                state.affectedFilesPendingEmitIndex!++;
                state.buildInfoEmitPending = true;
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
                return filterSemanticDiagnotics(cachedDiagnostics, state.compilerOptions);
            }
        }

        // Diagnostics werent cached, get them from program, and cache the result
        const diagnostics = Debug.checkDefined(state.program).getBindAndCheckDiagnostics(sourceFile, cancellationToken);
        if (state.semanticDiagnosticsPerFile) {
            state.semanticDiagnosticsPerFile.set(path, diagnostics);
        }
        return filterSemanticDiagnotics(diagnostics, state.compilerOptions);
    }

    export type ProgramBuildInfoFileId = number & { __programBuildInfoFileIdBrand: any };
    export type ProgramBuildInfoAbsoluteFileId = number & { __programBuildInfoAbsoluteFileIdBrand: any };
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
     * ProgramBuildInfoFileInfo is string if FileInfo.version === FileInfo.signature && !FileInfo.affectsGlobalScope otherwise encoded FileInfo
     */
    export type ProgramBuildInfoFileInfo = string | ProgramBuildInfoBuilderStateFileInfo;
    export interface ResolutionWithFailedLookupLocations {
        serializationIndex?: PersistedProgramResolutionId;
    }
    export interface ResolvedModuleWithFailedLookupLocations extends ResolutionWithFailedLookupLocations { }
    export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolutionWithFailedLookupLocations { }
    export type PersistedProgramResolvedModuleFull = Omit<ResolvedModuleFull, "resolvedFileName" | "isExternalLibraryImport" | "originalPath"> & {
        resolvedFileName: ProgramBuildInfoAbsoluteFileId;
        isExternalLibraryImport?: true;
        readonly originalPath?: ProgramBuildInfoAbsoluteFileId;
    };
    export interface PersistedProgramResolvedModuleWithFailedLookupLocations {
        readonly resolvedModule: PersistedProgramResolvedModuleFull | undefined;
        failedLookupLocations?: readonly ProgramBuildInfoAbsoluteFileId[];
    }
    export type PersistedProgramResolvedTypeReferenceDirective = Omit<ResolvedTypeReferenceDirective, "resolvedFileName" | "isExternalLibraryImport"> & {
        resolvedFileName: ProgramBuildInfoAbsoluteFileId | undefined;
        isExternalLibraryImport?: true;
    };
    export interface PersistedProgramResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        resolvedTypeReferenceDirective: PersistedProgramResolvedTypeReferenceDirective | undefined;
        failedLookupLocations?: readonly ProgramBuildInfoAbsoluteFileId[];
    }
    export type PersistedProgramResolution = PersistedProgramResolvedModuleWithFailedLookupLocations & PersistedProgramResolvedTypeReferenceDirectiveWithFailedLookupLocations;
    export type PersistedProgramResolutionId = number & { __persistedProgramResolutionIdBrand: any };
    export type PersistedProgramResolutionEntry = [name: string, resolutionId: PersistedProgramResolutionId];
    export interface PersistedProgramSourceFile {
        fileName: ProgramBuildInfoAbsoluteFileId;
        originalFileName: ProgramBuildInfoAbsoluteFileId;
        path: ProgramBuildInfoFileId;
        resolvedPath: ProgramBuildInfoFileId;
        // This currently is set to sourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags but cant be set in type
        // Change this if it changes in reusing program
        flags: NodeFlags;
        version: string;

        typeReferenceDirectives?: readonly string[];
        libReferenceDirectives?: readonly string[];
        referencedFiles?: readonly string[];
        imports?: readonly StringLiteralLikeOfProgramFromBuildInfo[];
        moduleAugmentations?: readonly ModuleNameOfProgramFromBuildInfo[];
        ambientModuleNames?: readonly string[];
        hasNoDefaultLib?: true;

        resolvedModules?: readonly PersistedProgramResolutionEntry[];
        resolvedTypeReferenceDirectiveNames?: readonly PersistedProgramResolutionEntry[];
        redirectInfo?: { readonly redirectTarget: { readonly path: ProgramBuildInfoFileId; }; };

        includeReasons: readonly PersistedProgramFileIncludeReason[];
        isSourceFileFromExternalLibraryPath?: true;
        redirectTargets?: readonly ProgramBuildInfoAbsoluteFileId[];
        packageName?: string;
    }
    /** If key and value are same, just use ProgramBuildInfoFileId otherwise pair of key followed by value */
    export type PersistedProgramFileByNameEntry = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, file: ProgramBuildInfoFileId | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile];
    export type PersistedProgramReferencedFile = Omit<ReferencedFile, "file"> & {
        file: ProgramBuildInfoFileId;
    };
    export type PersistedProgramFileIncludeReason =
        RootFile |
        LibFile |
        ProjectReferenceFile |
        PersistedProgramReferencedFile |
        AutomaticTypeDirectiveFile;
    export type PersistedProgramFilePreprocessingReferencedDiagnostic = Omit<FilePreprocessingReferencedDiagnostic, "reason" | "diagnostic"> & {
        reason: PersistedProgramReferencedFile;
        diagnostic: keyof typeof Diagnostics;
    };
    export type PersistedProgramFilePreprocessingFileExplainingDiagnostic = Omit<FilePreprocessingFileExplainingDiagnostic, "file" | "fileProcessingReason" | "diagnostic"> & {
        file?: ProgramBuildInfoFileId;
        fileProcessingReason: PersistedProgramFileIncludeReason;
        diagnostic: keyof typeof Diagnostics;
    };
    export type PersistedProgramFilePreprocessingDiagnostic = PersistedProgramFilePreprocessingReferencedDiagnostic | PersistedProgramFilePreprocessingFileExplainingDiagnostic;
    export type PersistedProgramProjectReference = Omit<ProjectReference, "path"> & {
        path: ProgramBuildInfoAbsoluteFileId;
    };
    export interface PersistedProgramResolvedProjectReference {
        commandLine: {
            fileNames: readonly ProgramBuildInfoAbsoluteFileId[] | undefined;
            options: CompilerOptions;
            projectReferences: readonly PersistedProgramProjectReference[] | undefined;
        };
        sourceFile: { version: string; path: ProgramBuildInfoFileId; };
        references: readonly (PersistedProgramResolvedProjectReference | undefined)[] | undefined;
    }
    export interface PersistedProgram {
        files: readonly PersistedProgramSourceFile[] | undefined;
        rootFileNames: readonly ProgramBuildInfoAbsoluteFileId[] | undefined;
        filesByName: readonly PersistedProgramFileByNameEntry[] | undefined;
        projectReferences: readonly PersistedProgramProjectReference[] | undefined;
        resolvedProjectReferences: readonly (PersistedProgramResolvedProjectReference | undefined)[] | undefined;
        resolvedTypeReferenceDirectives: readonly PersistedProgramResolutionEntry[] | undefined;
        fileProcessingDiagnostics: readonly PersistedProgramFilePreprocessingDiagnostic[] | undefined;
        resolutions: readonly PersistedProgramResolution[] | undefined;
    }
    export interface ProgramBuildInfo {
        fileNames: readonly string[];
        fileInfos: readonly ProgramBuildInfoFileInfo[];
        options: CompilerOptions | undefined;
        fileIdsList?: readonly (readonly ProgramBuildInfoFileId[])[];
        referencedMap?: ProgramBuildInfoReferencedMap;
        exportedModulesMap?: ProgramBuildInfoReferencedMap;
        semanticDiagnosticsPerFile?: ProgramBuildInfoDiagnostic[];
        affectedFilesPendingEmit?: ProgramBuilderInfoFilePendingEmit[];
        peristedProgram?: PersistedProgram;
    }

    /**
     * Gets the program information to be emitted in buildInfo so that we can use it to create new program
     */
    function getProgramBuildInfo(state: Readonly<ReusableBuilderProgramState>, getCanonicalFileName: GetCanonicalFileName): ProgramBuildInfo | undefined {
        if (outFileWithoutPersistResolutions(state.compilerOptions)) return undefined;
        const program = Debug.checkDefined(state.program);
        const currentDirectory = program.getCurrentDirectory();
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(state.compilerOptions)!, currentDirectory));
        const fileNames: string[] = [];
        const fileNameToFileId = new Map<string, ProgramBuildInfoFileId & ProgramBuildInfoAbsoluteFileId>();
        let fileIdsList: (readonly ProgramBuildInfoFileId[])[] | undefined;
        let fileNamesToFileIdListId: ESMap<string, ProgramBuildInfoFileIdListId> | undefined;
        let resolutions: (ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations)[] | undefined;
        let programFilesByName: ESMap<Path, SourceFile | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile>;
        const fileInfos = arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramBuildInfoFileInfo => {
            // Ensure fileId
            const fileId = toFileId(key);
            Debug.assert(fileNames[fileId - 1] === relativeToBuildInfo(key));
            const signature = state.currentAffectedFilesSignatures && state.currentAffectedFilesSignatures.get(key);
            const actualSignature = signature ?? value.signature;
            return value.version === actualSignature ?
                value.affectsGlobalScope ?
                    { version: value.version, signature: undefined, affectsGlobalScope: true } :
                    value.version :
                actualSignature !== undefined ?
                    signature === undefined ?
                        value :
                        { version: value.version, signature, affectsGlobalScope: value.affectsGlobalScope } :
                    { version: value.version, signature: false, affectsGlobalScope: value.affectsGlobalScope };
        });

        let referencedMap: ProgramBuildInfoReferencedMap | undefined;
        if (state.referencedMap) {
            referencedMap = arrayFrom(state.referencedMap.keys()).sort(compareStringsCaseSensitive).map(key => [
                toFileId(key),
                toFileIdListId(state.referencedMap!.get(key)!)
            ]);
        }

        let exportedModulesMap: ProgramBuildInfoReferencedMap | undefined;
        if (state.exportedModulesMap) {
            exportedModulesMap = mapDefined(arrayFrom(state.exportedModulesMap.keys()).sort(compareStringsCaseSensitive), key => {
                const newValue = state.currentAffectedFilesExportedModulesMap && state.currentAffectedFilesExportedModulesMap.get(key);
                // Not in temporary cache, use existing value
                if (newValue === undefined) return [toFileId(key), toFileIdListId(state.exportedModulesMap!.get(key)!)];
                // Value in cache and has updated value map, use that
                else if (newValue) return [toFileId(key), toFileIdListId(newValue)];
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
                            state.hasReusableDiagnostic ?
                                value as readonly ReusableDiagnostic[] :
                                convertToReusableDiagnostics(value as readonly Diagnostic[], relativeToBuildInfo)
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

        let peristedProgram: PersistedProgram | undefined;
        if (state.compilerOptions.persistResolutions) {
            // persist program
            programFilesByName = new Map(program.getFilesByNameMap());
            const files = mapToReadonlyArrayOrUndefined(program.getSourceFiles(), toPersistedProgramSourceFile);
            let filesByName: PersistedProgramFileByNameEntry[] | undefined;
            for (const key of arrayFrom(programFilesByName.keys()).sort(compareStringsCaseSensitive)) {
                const value = program.getFilesByNameMap().get(key)!;
                const keyId = toFileId(key);
                const valueId = value ? toFileId(value.path) : value;
                (filesByName ||= []).push(keyId === valueId ? keyId : [keyId, valueId]);
            }
            peristedProgram = {
                files,
                rootFileNames: mapToReadonlyArrayOrUndefined(program.getRootFileNames(), toAbsoluteFileId),
                filesByName,
                projectReferences: program.getProjectReferences()?.map(toPersistedProgramProjectReference),
                resolvedProjectReferences: program.getResolvedProjectReferences()?.map(toPersistedProgramResolvedProjectReference),
                resolvedTypeReferenceDirectives: toPersistedProgramResolutionMap(program.getResolvedTypeReferenceDirectives()),
                fileProcessingDiagnostics: mapToReadonlyArrayOrUndefined(program.getFileProcessingDiagnostics(), toPersistedProgramFilePreprocessingDiagnostic),
                resolutions: mapToReadonlyArrayOrUndefined(resolutions, toPersistedProgramResolution),
            };
        }
        return {
            fileNames,
            fileInfos,
            options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions, relativeToBuildInfoEnsuringAbsolutePath, !state.compilerOptions.persistResolutions),
            fileIdsList,
            referencedMap,
            exportedModulesMap,
            semanticDiagnosticsPerFile,
            affectedFilesPendingEmit,
            peristedProgram,
        };

        function relativeToBuildInfoEnsuringAbsolutePath(path: string) {
            return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
        }

        function relativeToBuildInfo(path: string) {
            return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
        }

        function toFileAndAbsoluteFileId(path: string): ProgramBuildInfoFileId & ProgramBuildInfoAbsoluteFileId {
            let fileId = fileNameToFileId.get(path);
            if (fileId === undefined) {
                fileNames.push(relativeToBuildInfo(path));
                fileNameToFileId.set(path, fileId = fileNames.length as ProgramBuildInfoFileId & ProgramBuildInfoAbsoluteFileId);
            }
            return fileId;
        }

        function toFileId(path: Path): ProgramBuildInfoFileId {
            return toFileAndAbsoluteFileId(path);
        }

        function toAbsoluteFileId(path: string): ProgramBuildInfoAbsoluteFileId {
            return toFileAndAbsoluteFileId(getNormalizedAbsolutePath(path, currentDirectory));
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

        function toPersistedProgramSourceFile(sourceFile: SourceFile): PersistedProgramSourceFile {
            if (programFilesByName.get(sourceFile.path) === sourceFile) programFilesByName.delete(sourceFile.path);
            if (programFilesByName.get(sourceFile.resolvedPath) === sourceFile) programFilesByName.delete(sourceFile.resolvedPath);
            return {
                fileName: toAbsoluteFileId(sourceFile.fileName),
                originalFileName: toAbsoluteFileId(sourceFile.originalFileName),
                path: toFileId(sourceFile.path),
                resolvedPath: toFileId(sourceFile.resolvedPath),
                version: sourceFile.version,
                flags: sourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags,
                typeReferenceDirectives: mapToReadonlyArrayOrUndefined(sourceFile.typeReferenceDirectives, toPersistedProgramFileReference),
                libReferenceDirectives: mapToReadonlyArrayOrUndefined(sourceFile.libReferenceDirectives, toPersistedProgramFileReference),
                referencedFiles: mapToReadonlyArrayOrUndefined(sourceFile.referencedFiles, toPersistedProgramFileReference),
                imports: mapToReadonlyArrayOrUndefined(sourceFile.imports, toStringLiteralLikeOfProgramFromBuildInfo),
                moduleAugmentations: mapToReadonlyArrayOrUndefined(sourceFile.moduleAugmentations, toModuleNameOfProgramFromBuildInfo),
                ambientModuleNames: sourceFile.ambientModuleNames.length ? sourceFile.ambientModuleNames : undefined,
                hasNoDefaultLib: sourceFile.hasNoDefaultLib ? true : undefined,
                redirectInfo: sourceFile.redirectInfo && { redirectTarget: { path: toFileId(sourceFile.redirectInfo.redirectTarget.path) } },
                resolvedModules: toPersistedProgramResolutionMap(sourceFile.resolvedModules),
                resolvedTypeReferenceDirectiveNames: toPersistedProgramResolutionMap(sourceFile.resolvedTypeReferenceDirectiveNames),
                redirectTargets: mapToReadonlyArrayOrUndefined(program.redirectTargetsMap.get(sourceFile.path), toAbsoluteFileId),
                includeReasons: program.getFileIncludeReasons().get(sourceFile.path)!.map(toPersistedProgramFileIncludeReason),
                isSourceFileFromExternalLibraryPath: program.isSourceFileFromExternalLibraryPath(sourceFile.path) ? true : undefined,
                packageName: program.sourceFileToPackageName.get(sourceFile.path),
            };
        }

        function toPersistedProgramReferencedFile(reason: ReferencedFile): PersistedProgramReferencedFile {
            return { ...reason, file: toFileId(reason.file) };
        }

        function toPersistedProgramFileIncludeReason(reason: FileIncludeReason): PersistedProgramFileIncludeReason {
            return isReferencedFile(reason) ? toPersistedProgramReferencedFile(reason) : reason;
        }

        function toPersistedProgramFilePreprocessingDiagnostic(d: FilePreprocessingDiagnostic): PersistedProgramFilePreprocessingDiagnostic {
            switch (d.kind) {
                case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                    return {
                        ...d,
                        diagnostic: ensureDiagnosticKeyMap().get(d.diagnostic.key)!,
                        file: d.file && toFileId(d.file),
                        fileProcessingReason: toPersistedProgramFileIncludeReason(d.fileProcessingReason),
                    };
                case FilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic:
                    return {
                        ...d,
                        diagnostic: ensureDiagnosticKeyMap().get(d.diagnostic.key)!,
                        reason: toPersistedProgramReferencedFile(d.reason),
                    };
                default:
                    Debug.assertNever(d);
            }
        }

        function toPersistedProgramResolvedProjectReference(ref: ResolvedProjectReference | undefined): PersistedProgramResolvedProjectReference | undefined {
            return ref && {
                commandLine: {
                    fileNames: mapToReadonlyArrayOrUndefined(ref.commandLine.fileNames, toAbsoluteFileId),
                    options: convertToProgramBuildInfoCompilerOptions(ref.commandLine.options, relativeToBuildInfoEnsuringAbsolutePath, /*filterOptions*/ false)!,
                    projectReferences: mapToReadonlyArrayOrUndefined(ref.commandLine.projectReferences, toPersistedProgramProjectReference)
                },
                sourceFile: { version: ref.sourceFile.version, path: toFileId(ref.sourceFile.path) },
                references: mapToReadonlyArrayOrUndefined(ref.references, toPersistedProgramResolvedProjectReference)
            };
        }

        function toPersistedProgramProjectReference(ref: ProjectReference): PersistedProgramProjectReference {
            return { ...ref, path: toAbsoluteFileId(ref.path) };
        }

        function isResolvedModule(r: ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations): r is ResolvedModuleWithFailedLookupLocations {
            return !!(r as ResolvedModuleWithFailedLookupLocations).resolvedModule;
        }

        function toPersistedProgramResolution(r: ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations): PersistedProgramResolution {
            const resolvedModule = isResolvedModule(r) ? r.resolvedModule : undefined;
            const resolvedTypeReferenceDirective = isResolvedModule(r) ? undefined : r.resolvedTypeReferenceDirective;
            // Reset serializing index
            r.serializationIndex = undefined;
            return {
                resolvedModule: resolvedModule && {
                    ...resolvedModule,
                    resolvedFileName: toAbsoluteFileId(resolvedModule.resolvedFileName),
                    isExternalLibraryImport: resolvedModule.isExternalLibraryImport ? true : undefined,
                    originalPath: resolvedModule.originalPath ? toAbsoluteFileId(resolvedModule.originalPath) : undefined,
                },
                resolvedTypeReferenceDirective: resolvedTypeReferenceDirective && {
                    ...resolvedTypeReferenceDirective,
                    resolvedFileName: resolvedTypeReferenceDirective.resolvedFileName ? toAbsoluteFileId(resolvedTypeReferenceDirective.resolvedFileName) : undefined,
                    isExternalLibraryImport: resolvedTypeReferenceDirective.isExternalLibraryImport ? true : undefined,
                },
                failedLookupLocations: mapToReadonlyArrayOrUndefined(r.failedLookupLocations, toAbsoluteFileId),
            };
        }

        function toPersistedProgramResolutionMap(resolutionMap: ESMap<string, ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations> | undefined): readonly PersistedProgramResolutionEntry[] | undefined {
            let result: PersistedProgramResolutionEntry[] | undefined;
            resolutionMap?.forEach((resolution, key) => {
                if (resolution.serializationIndex === undefined) {
                    (resolutions ||= []).push(resolution);
                    resolution.serializationIndex = resolutions.length as PersistedProgramResolutionId;
                }
                (result ||= []).push([key, resolution.serializationIndex]);
            });
            return result;
        }

        function toStringLiteralLikeOfProgramFromBuildInfo(name: StringLiteralLike): StringLiteralLikeOfProgramFromBuildInfo {
            return { kind: name.kind, text: name.text };
        }

        function toModuleNameOfProgramFromBuildInfo(name: StringLiteralLike | Identifier): ModuleNameOfProgramFromBuildInfo {
            return isIdentifier(name) ? { kind: name.kind, escapedText: name.escapedText } : toStringLiteralLikeOfProgramFromBuildInfo(name);
        }

        function toPersistedProgramFileReference(f: FileReference) {
            return f.fileName;
        }
    }

    function mapToReadonlyArrayOrUndefined<T, U>(array: readonly T[] | undefined, map: (value: T) => U): readonly U[] | undefined {
        return array?.length ? array.map(map) : undefined;
    }

    function convertToProgramBuildInfoCompilerOptions(options: CompilerOptions, relativeToBuildInfo: (path: string) => string, filterOptions: boolean) {
        let result: CompilerOptions | undefined;
        const { optionsNameMap } = getOptionsNameMap();

        for (const name of getOwnKeys(options).sort(compareStringsCaseSensitive)) {
            const optionInfo = optionsNameMap.get(name.toLowerCase());
            if (!filterOptions || optionInfo?.affectsEmit || optionInfo?.affectsSemanticDiagnostics || name === "skipLibCheck" || name === "skipDefaultLibCheck") {
                (result ||= {})[name] = convertToReusableCompilerOptionValue(
                    optionInfo,
                    options[name] as CompilerOptionsValue,
                    relativeToBuildInfo
                );
            }
        }
        if (!filterOptions && result?.configFilePath) result.configFilePath = relativeToBuildInfo(result.configFilePath);
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
                oldProgram: oldProgram?.getProgramOrProgramFromBuildInfoOrUndefined(),
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
        const computeHash = maybeBind(host, host.createHash);
        let state = createBuilderProgramState(newProgram, getCanonicalFileName, oldState, host.disableUseFileVersionAsSignature);
        let backupState: BuilderProgramState | undefined;
        newProgram.getProgramBuildInfo = () => getProgramBuildInfo(state, getCanonicalFileName);

        // To ensure that we arent storing any references to old program or new program without state
        newProgram = undefined!; // TODO: GH#18217
        oldProgram = undefined;
        oldState = undefined;

        const getState = () => state;
        const builderProgram = createRedirectedBuilderProgram(getState, configFileParsingDiagnostics);
        builderProgram.getState = getState;
        builderProgram.backupState = () => {
            Debug.assert(backupState === undefined);
            Debug.checkDefined(state.program);
            backupState = cloneBuilderProgramState(state);
        };
        builderProgram.restoreState = () => {
            Debug.assert(backupState!.program === state.program);
            state = Debug.checkDefined(backupState);
            backupState = undefined;
        };
        builderProgram.getAllDependencies = sourceFile => BuilderState.getAllDependencies(state, Debug.checkDefined(state.program), sourceFile);
        builderProgram.getSemanticDiagnostics = getSemanticDiagnostics;
        builderProgram.emit = emit;
        builderProgram.releaseProgram = () => {
            releaseCache(state);
            backupState = undefined;
        };

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
            let affected = getNextAffectedFile(state, cancellationToken, computeHash);
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
            let restorePendingEmitOnHandlingNoEmitSuccess = false;
            let savedAffectedFilesPendingEmit;
            let savedAffectedFilesPendingEmitKind;
            let savedAffectedFilesPendingEmitIndex;
            // Backup and restore affected pendings emit state for non emit Builder if noEmitOnError is enabled and emitBuildInfo could be written in case there are errors
            // This ensures pending files to emit is updated in tsbuildinfo
            // Note that when there are no errors, emit proceeds as if everything is emitted as it is callers reponsibility to write the files to disk if at all (because its builder that doesnt track files to emit)
            if (kind !== BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram &&
                !targetSourceFile &&
                !outFile(state.compilerOptions) &&
                !state.compilerOptions.noEmit &&
                state.compilerOptions.noEmitOnError) {
                restorePendingEmitOnHandlingNoEmitSuccess = true;
                savedAffectedFilesPendingEmit = state.affectedFilesPendingEmit && state.affectedFilesPendingEmit.slice();
                savedAffectedFilesPendingEmitKind = state.affectedFilesPendingEmitKind && new Map(state.affectedFilesPendingEmitKind);
                savedAffectedFilesPendingEmitIndex = state.affectedFilesPendingEmitIndex;
            }

            if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
                assertSourceFileOkWithoutNextAffectedCall(state, targetSourceFile);
            }
            const result = handleNoEmitOptions(builderProgram, targetSourceFile, writeFile, cancellationToken);
            if (result) return result;

            if (restorePendingEmitOnHandlingNoEmitSuccess) {
                state.affectedFilesPendingEmit = savedAffectedFilesPendingEmit;
                state.affectedFilesPendingEmitKind = savedAffectedFilesPendingEmitKind;
                state.affectedFilesPendingEmitIndex = savedAffectedFilesPendingEmitIndex;
            }

            // Emit only affected files if using builder for emit
            if (!targetSourceFile && kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
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
            return Debug.checkDefined(state.program).emit(targetSourceFile, writeFile || maybeBind(host, host.writeFile), cancellationToken, emitOnlyDtsFiles, customTransformers);
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
            { version: fileInfo, signature: fileInfo, affectsGlobalScope: undefined } :
            isString(fileInfo.signature) ?
                fileInfo as BuilderState.FileInfo :
                { version: fileInfo.version, signature: fileInfo.signature === false ? undefined : fileInfo.version, affectsGlobalScope: fileInfo.affectsGlobalScope };
    }

    function getProgramBuildInfoIdDecoder(program: ProgramBuildInfo, buildInfoPath: string, host: ReadBuildProgramHost) {
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        const filePaths: (Path | undefined)[] = [];
        let fileAbsolutePaths: (string | undefined)[] | undefined;
        let filePathsSetList: (Set<Path> | undefined)[] | undefined;
        return {
            toAbsolutePath,
            toFilePath,
            toFileAbsolutePath,
            toFilePathsSet,
        };

        function toPath(path: string) {
            return ts.toPath(path, buildInfoDirectory, getCanonicalFileName);
        }

        function toAbsolutePath(path: string) {
            return getNormalizedAbsolutePath(path, buildInfoDirectory);
        }

        function toFilePath(fileId: ProgramBuildInfoFileId): Path {
            const result = filePaths[fileId - 1];
            return result !== undefined ? result : filePaths[fileId - 1] = toPath(program.fileNames[fileId - 1]);
        }

        function toFileAbsolutePath(fileId: ProgramBuildInfoAbsoluteFileId): string {
            const result = fileAbsolutePaths?.[fileId - 1];
            return result !== undefined ? result : (fileAbsolutePaths ||= [])[fileId - 1] = toAbsolutePath(program.fileNames[fileId - 1]);
        }

        function toFilePathsSet(fileIdsListId: ProgramBuildInfoFileIdListId): Set<Path> {
            const result = filePathsSetList?.[fileIdsListId - 1];
            return result !== undefined ? result : (filePathsSetList ||= [])[fileIdsListId - 1] = new Set(program.fileIdsList![fileIdsListId - 1].map(toFilePath));
        }
    }

    export function createBuildProgramUsingProgramBuildInfo(program: ProgramBuildInfo, buildInfoPath: string, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram {
        const { toAbsolutePath, toFilePath, toFilePathsSet } = getProgramBuildInfoIdDecoder(program, buildInfoPath, host);
        const fileInfos = new Map<Path, BuilderState.FileInfo>();
        program.fileInfos.forEach((fileInfo, index) => fileInfos.set(toFilePath(index + 1 as ProgramBuildInfoFileId), toBuilderStateFileInfo(fileInfo)));
        const state: ReusableBuilderProgramState = {
            fileInfos,
            compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
            referencedMap: toMapOfReferencedSet(program.referencedMap),
            exportedModulesMap: toMapOfReferencedSet(program.exportedModulesMap),
            semanticDiagnosticsPerFile: program.semanticDiagnosticsPerFile && arrayToMap(program.semanticDiagnosticsPerFile, value => toFilePath(isNumber(value) ? value : value[0]), value => isNumber(value) ? emptyArray : value[1]),
            hasReusableDiagnostic: true,
            affectedFilesPendingEmit: map(program.affectedFilesPendingEmit, value => toFilePath(value[0])),
            affectedFilesPendingEmitKind: program.affectedFilesPendingEmit && arrayToMap(program.affectedFilesPendingEmit, value => toFilePath(value[0]), value => value[1]),
            affectedFilesPendingEmitIndex: program.affectedFilesPendingEmit && 0,
        };
        let programFromBuildInfo: ProgramFromBuildInfo | false | undefined;
        return {
            getState: () => state,
            backupState: noop,
            restoreState: noop,
            getProgram: notImplemented,
            getProgramOrUndefined: returnUndefined,
            getProgramOrProgramFromBuildInfoOrUndefined,
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

        function getProgramOrProgramFromBuildInfoOrUndefined() {
            if (programFromBuildInfo === undefined) {
                const result = createProgramFromBuildInfo(program, buildInfoPath, host, state.compilerOptions);
                if (result) {
                    state.persistedProgramState = result.persistedProgramState;
                    programFromBuildInfo = result.program;
                }
                else {
                    programFromBuildInfo = false;
                }
            }

            return programFromBuildInfo || undefined;
        }

        function toMapOfReferencedSet(referenceMap: ProgramBuildInfoReferencedMap | undefined): ReadonlyESMap<Path, BuilderState.ReferencedSet> | undefined {
            return referenceMap && arrayToMap(referenceMap, value => toFilePath(value[0]), value => toFilePathsSet(value[1]));
        }
    }

    function mapToReadonlyArray<T, U>(array: readonly T[] | undefined, map: (value: T) => U): readonly U[] {
        return array?.length ? array.map(map) : emptyArray;
    }

    export function createProgramFromBuildInfo(
        program: ProgramBuildInfo,
        buildInfoPath: string,
        host: ReadBuildProgramHost,
        compilerOptions?: CompilerOptions
    ): { program: ProgramFromBuildInfo; persistedProgramState: PersistedProgramState; } | undefined {
        if (!program.peristedProgram) return undefined;
        const { toAbsolutePath, toFilePath, toFileAbsolutePath } = getProgramBuildInfoIdDecoder(program, buildInfoPath, host);

        compilerOptions ||= program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {};
        const filesByName = new Map<Path, SourceFileOfProgramFromBuildInfo | Path | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile>();
        const fileIncludeReasons = createMultiMap<Path, FileIncludeReason>();
        let sourceFileFromExternalLibraryPath: Set<Path> | undefined;
        const redirectTargetsMap = createMultiMap<Path, string>();
        const sourceFileToPackageName = new Map<Path, string>();
        program.peristedProgram.filesByName?.forEach(entry => {
            if (isArray(entry)) {
                filesByName.set(toFilePath(entry[0]), entry[1] ? toFilePath(entry[1]) : entry[1] as typeof missingSourceOfProjectReferenceRedirect | typeof missingFile);
            }
            else {
                const path = toFilePath(entry);
                filesByName.set(path, path);
            }
        });
        const resolutions = mapToReadonlyArray(program.peristedProgram.resolutions, toResolution);
        const files = mapToReadonlyArray(program.peristedProgram.files, toSourceFileOfProgramFromBuildInfo);
        const persistedProgramState: PersistedProgramState = {
            files,
            rootFileNames: mapToReadonlyArray(program.peristedProgram.rootFileNames, toFileAbsolutePath),
            filesByName,
            fileIncludeReasons,
            sourceFileFromExternalLibraryPath,
            redirectTargetsMap,
            sourceFileToPackageName,
            projectReferences: program.peristedProgram.projectReferences?.map(toProjectReference),
            resolvedProjectReferences: program.peristedProgram.resolvedProjectReferences?.map(toResolvedProjectReference),
            resolvedTypeReferenceDirectives: toResolutionMap(program.peristedProgram.resolvedTypeReferenceDirectives) || new Map(),
            fileProcessingDiagnostics: map(program.peristedProgram.fileProcessingDiagnostics, toFileProcessingDiagnostic),
        };
        return {
            program: createProgramFromPersistedProgramState(persistedProgramState, compilerOptions),
            persistedProgramState
        };

        function toSourceFileOfProgramFromBuildInfo(file: PersistedProgramSourceFile): SourceFileOfProgramFromBuildInfo {
            const path = toFilePath(file.path);
            const resolvedPath = toFilePath(file.resolvedPath);

            fileIncludeReasons.set(path, file.includeReasons.map(toFileIncludeReason));
            if (file.isSourceFileFromExternalLibraryPath) (sourceFileFromExternalLibraryPath ||= new Set()).add(path);
            if (file.redirectTargets) redirectTargetsMap.set(path, file.redirectTargets.map(toFileAbsolutePath));
            if (file.packageName) sourceFileToPackageName.set(path, file.packageName);

            const sourceFile: SourceFileOfProgramFromBuildInfo = {
                fileName: toFileAbsolutePath(file.fileName),
                originalFileName: toFileAbsolutePath(file.originalFileName),
                path,
                resolvedPath,
                flags: file.flags,
                version: file.version,
                typeReferenceDirectives: file.typeReferenceDirectives || emptyArray,
                libReferenceDirectives: file.libReferenceDirectives || emptyArray,
                referencedFiles: file.referencedFiles || emptyArray,
                imports: file.imports || emptyArray,
                moduleAugmentations: file.moduleAugmentations || emptyArray,
                ambientModuleNames: file.ambientModuleNames || emptyArray,
                hasNoDefaultLib: file.hasNoDefaultLib || false,
                resolvedModules: toResolutionMap(file.resolvedModules),
                resolvedTypeReferenceDirectiveNames: toResolutionMap(file.resolvedTypeReferenceDirectiveNames),
                redirectInfo: file.redirectInfo && { redirectTarget: { path: toFilePath(file.redirectInfo.redirectTarget.path) } }
            };

            if (!filesByName.has(path)) filesByName.set(path, sourceFile);
            if (!filesByName.has(resolvedPath)) filesByName.set(resolvedPath, sourceFile);
            return sourceFile;
        }

        function toReferencedFile(reason: PersistedProgramReferencedFile): ReferencedFile {
            return { ...reason, file: toFilePath(reason.file) };
        }

        function toFileIncludeReason(reason: PersistedProgramFileIncludeReason): FileIncludeReason {
            return isReferencedFile(reason) ? toReferencedFile(reason) : reason;
        }

        function toResolutionMap(resolutionMap: readonly PersistedProgramResolutionEntry[] | undefined) {
            return resolutionMap && arrayToMap(resolutionMap, value => value[0], value => resolutions[value[1] - 1]);
        }

        function toResolution({ resolvedModule, resolvedTypeReferenceDirective, failedLookupLocations }: PersistedProgramResolution): ResolvedModuleWithFailedLookupLocations & ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
            return {
                resolvedModule: resolvedModule && {
                    ...resolvedModule,
                    resolvedFileName: toFileAbsolutePath(resolvedModule.resolvedFileName),
                    originalPath: resolvedModule.originalPath && toFileAbsolutePath(resolvedModule.originalPath),
                },
                resolvedTypeReferenceDirective: resolvedTypeReferenceDirective && {
                    ...resolvedTypeReferenceDirective,
                    resolvedFileName: resolvedTypeReferenceDirective.resolvedFileName && toFileAbsolutePath(resolvedTypeReferenceDirective.resolvedFileName),
                },
                failedLookupLocations: failedLookupLocations ? failedLookupLocations.map(toFileAbsolutePath) : []
            };
        }

        function toProjectReference(ref: PersistedProgramProjectReference): ProjectReference {
            return { ...ref, path: toFileAbsolutePath(ref.path) };
        }

        function toResolvedProjectReference(ref: PersistedProgramResolvedProjectReference | undefined): ResolvedProjectReferenceOfProgramFromBuildInfo | undefined {
            return ref && {
                commandLine: {
                    fileNames: ref.commandLine.fileNames?.map(toFileAbsolutePath) || [],
                    options: convertToOptionsWithAbsolutePaths(ref.commandLine.options, toAbsolutePath),
                    projectReferences: ref.commandLine.projectReferences?.map(toProjectReference)
                },
                sourceFile: { version: ref.sourceFile.version, path: toFilePath(ref.sourceFile.path) },
                references: ref.references?.map(toResolvedProjectReference)
            };
        }

        function toFileProcessingDiagnostic(d: PersistedProgramFilePreprocessingDiagnostic): FilePreprocessingDiagnostic {
            switch (d.kind) {
                case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                    return {
                        ...d,
                        diagnostic: Diagnostics[d.diagnostic],
                        file: d.file ? toFilePath(d.file) : undefined,
                        fileProcessingReason: toFileIncludeReason(d.fileProcessingReason),
                    };
                case FilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic:
                    return {
                        ...d,
                        diagnostic: Diagnostics[d.diagnostic],
                        reason: toReferencedFile(d.reason),
                    };
                default:
                    Debug.assertNever(d);
            }
        }
    }

    function createProgramFromPersistedProgramState(persistedProgramState: PersistedProgramState, compilerOptions: CompilerOptions): ProgramFromBuildInfo {
        let missingFilePaths: readonly Path[] | undefined;
        return {
            programFromBuildInfo: true,
            getCompilerOptions: () => compilerOptions,
            getRootFileNames: () => persistedProgramState.rootFileNames,
            getSourceFiles: () => persistedProgramState.files,
            getSourceFileByPath: path => {
                const file = persistedProgramState.filesByName.get(path);
                return file && !isString(file) ? file : undefined;
            },
            getProjectReferences: () => persistedProgramState.projectReferences,
            getResolvedProjectReferences: () => persistedProgramState.resolvedProjectReferences,
            getMissingFilePaths: () => missingFilePaths ||= getMissingFilePaths(persistedProgramState.filesByName),
            getFileIncludeReasons: () => persistedProgramState.fileIncludeReasons,
            getResolvedTypeReferenceDirectives: () => persistedProgramState.resolvedTypeReferenceDirectives,
            getFilesByNameMap: () => persistedProgramState.filesByName,
            isSourceFileFromExternalLibraryPath: path => !!persistedProgramState.sourceFileFromExternalLibraryPath?.has(path),
            getFileProcessingDiagnostics: () => persistedProgramState.fileProcessingDiagnostics,
            redirectTargetsMap: persistedProgramState.redirectTargetsMap,
            sourceFileToPackageName: persistedProgramState.sourceFileToPackageName,
        };
    }

    export function createRedirectedBuilderProgram(getState: () => Pick<ReusableBuilderProgramState, "program" | "compilerOptions" | "persistedProgramState">, configFileParsingDiagnostics: readonly Diagnostic[]): BuilderProgram {
        let programFromBuildInfo: ProgramFromBuildInfo | false | undefined;
        return {
            getState: notImplemented,
            backupState: noop,
            restoreState: noop,
            getProgram,
            getProgramOrUndefined: () => getState().program,
            getProgramOrProgramFromBuildInfoOrUndefined,
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

        function getProgramOrProgramFromBuildInfoOrUndefined() {
            const state = getState();
            if (state.program) return state.program;
            if (programFromBuildInfo !== undefined) return programFromBuildInfo || undefined;
            if (!state.persistedProgramState) {
                programFromBuildInfo = false;
                return undefined;
            }
            return programFromBuildInfo = createProgramFromPersistedProgramState(state.persistedProgramState, state.compilerOptions);
        }
    }
}

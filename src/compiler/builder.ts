import * as ts from "./_namespaces/ts";

/** @internal */
export interface ReusableDiagnostic extends ReusableDiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};
    reportDeprecated?: {}
    source?: string;
    relatedInformation?: ReusableDiagnosticRelatedInformation[];
    skippedOn?: keyof ts.CompilerOptions;
}

/** @internal */
export interface ReusableDiagnosticRelatedInformation {
    category: ts.DiagnosticCategory;
    code: number;
    file: string | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | ReusableDiagnosticMessageChain;
}

/** @internal */
export type ReusableDiagnosticMessageChain = ts.DiagnosticMessageChain;

/** @internal */
/** Signature (Hash of d.ts emitted), is string if it was emitted using same d.ts.map option as what compilerOptions indicate, otherwise tuple of string */
export type EmitSignature = string | [signature: string];

/** @internal */
export interface ReusableBuilderProgramState extends ts.BuilderState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile?: ts.ESMap<ts.Path, readonly ReusableDiagnostic[] | readonly ts.Diagnostic[]> | undefined;
    /**
     * The map has key by source file's path that has been changed
     */
    changedFilesSet?: ts.Set<ts.Path>;
    /**
     * program corresponding to this state
     */
    program?: ts.Program | undefined;
    /**
     * compilerOptions for the program
     */
    compilerOptions: ts.CompilerOptions;
    /**
     * Files pending to be emitted
     */
    affectedFilesPendingEmit?: ts.ReadonlyESMap<ts.Path, BuilderFileEmit>;
    /**
     * emitKind pending for a program with --out
     */
    programEmitPending?: BuilderFileEmit;
    /*
     * true if semantic diagnostics are ReusableDiagnostic instead of Diagnostic
     */
    hasReusableDiagnostic?: true;
    /**
     * Hash of d.ts emitted for the file, use to track when emit of d.ts changes
     */
    emitSignatures?: ts.ESMap<ts.Path, EmitSignature>;
    /**
     * Hash of d.ts emit with --out
     */
    outSignature?: EmitSignature;
    /**
     * Name of the file whose dts was the latest to change
     */
    latestChangedDtsFile: string | undefined;
    /**
     * Bundle information either from oldState or current one so it can be used to complete the information in buildInfo when emitting only js or dts files
     */
    bundle?: ts.BundleBuildInfo;
}

/** @internal */
export const enum BuilderFileEmit {
    None                = 0,
    Js                  = 1 << 0,                       // emit js file
    JsMap               = 1 << 1,                       // emit js.map file
    JsInlineMap         = 1 << 2,                       // emit inline source map in js file
    Dts                 = 1 << 3,                       // emit d.ts file
    DtsMap              = 1 << 4,                       // emit d.ts.map file

    AllJs               = Js | JsMap | JsInlineMap,
    AllDts              = Dts | DtsMap,
    All                 = AllJs | AllDts,
}

/** @internal */
/**
 * State to store the changed files, affected files and cache semantic diagnostics
 */
// TODO: GH#18217 Properties of this interface are frequently asserted to be defined.
export interface BuilderProgramState extends ts.BuilderState, ReusableBuilderProgramState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile: ts.ESMap<ts.Path, readonly ts.Diagnostic[]> | undefined;
    /**
     * The map has key by source file's path that has been changed
     */
    changedFilesSet: ts.Set<ts.Path>;
    /**
     * Set of affected files being iterated
     */
    affectedFiles?: readonly ts.SourceFile[] | undefined;
    /**
     * Current index to retrieve affected file from
     */
    affectedFilesIndex: number | undefined;
    /**
     * Current changed file for iterating over affected files
     */
    currentChangedFilePath?: ts.Path | undefined;
    /**
     * Already seen affected files
     */
    seenAffectedFiles: ts.Set<ts.Path> | undefined;
    /**
     * whether this program has cleaned semantic diagnostics cache for lib files
     */
    cleanedDiagnosticsOfLibFiles?: boolean;
    /**
     * True if the semantic diagnostics were copied from the old state
     */
    semanticDiagnosticsFromOldState?: ts.Set<ts.Path>;
    /**
     * Records if change in dts emit was detected
     */
    hasChangedEmitSignature?: boolean;
    /**
     * Files pending to be emitted
     */
    affectedFilesPendingEmit?: ts.ESMap<ts.Path, BuilderFileEmit>;
    /**
     * true if build info is emitted
     */
    buildInfoEmitPending: boolean;
    /**
     * Already seen emitted files
     */
    seenEmittedFiles: ts.ESMap<ts.Path, BuilderFileEmit> | undefined;
    /** Stores list of files that change signature during emit - test only */
    filesChangingSignature?: ts.Set<ts.Path>;
}

/** @internal */
export type SavedBuildProgramEmitState = Pick<BuilderProgramState,
    "affectedFilesPendingEmit" |
    "seenEmittedFiles" |
    "programEmitPending" |
    "emitSignatures" |
    "outSignature" |
    "latestChangedDtsFile" |
    "hasChangedEmitSignature"
> & { changedFilesSet: BuilderProgramState["changedFilesSet"] | undefined };

/** @internal */
/** Get flags determining what all needs to be emitted */
export function getBuilderFileEmit(options: ts.CompilerOptions) {
    let result = BuilderFileEmit.Js;
    if (options.sourceMap) result = result | BuilderFileEmit.JsMap;
    if (options.inlineSourceMap) result = result | BuilderFileEmit.JsInlineMap;
    if (ts.getEmitDeclarations(options)) result = result | BuilderFileEmit.Dts;
    if (options.declarationMap) result = result | BuilderFileEmit.DtsMap;
    if (options.emitDeclarationOnly) result = result & BuilderFileEmit.AllDts;
    return result;
}

/** @internal */
/** Determing what all is pending to be emitted based on previous options or previous file emit flags */
export function getPendingEmitKind(optionsOrEmitKind: ts.CompilerOptions | BuilderFileEmit, oldOptionsOrEmitKind: ts.CompilerOptions | BuilderFileEmit | undefined): BuilderFileEmit {
    const oldEmitKind = oldOptionsOrEmitKind && (ts.isNumber(oldOptionsOrEmitKind) ? oldOptionsOrEmitKind : getBuilderFileEmit(oldOptionsOrEmitKind));
    const emitKind = ts.isNumber(optionsOrEmitKind) ? optionsOrEmitKind : getBuilderFileEmit(optionsOrEmitKind);
    if (oldEmitKind === emitKind) return BuilderFileEmit.None;
    if (!oldEmitKind || !emitKind) return emitKind;
    const diff = oldEmitKind ^ emitKind;
    let result = BuilderFileEmit.None;
    // If there is diff in Js emit, pending emit is js emit flags
    if (diff & BuilderFileEmit.AllJs) result = emitKind & BuilderFileEmit.AllJs;
    // If there is diff in Dts emit, pending emit is dts emit flags
    if (diff & BuilderFileEmit.AllDts) result = result | (emitKind & BuilderFileEmit.AllDts);
    return result;
}

function hasSameKeys(map1: ts.ReadonlyCollection<string> | undefined, map2: ts.ReadonlyCollection<string> | undefined): boolean {
    // Has same size and every key is present in both maps
    return map1 === map2 || map1 !== undefined && map2 !== undefined && map1.size === map2.size && !ts.forEachKey(map1, key => !map2.has(key));
}

/**
 * Create the state so that we can iterate on changedFiles/affected files
 */
function createBuilderProgramState(newProgram: ts.Program, getCanonicalFileName: ts.GetCanonicalFileName, oldState: Readonly<ReusableBuilderProgramState> | undefined, disableUseFileVersionAsSignature: boolean | undefined): BuilderProgramState {
    const state = ts.BuilderState.create(newProgram, getCanonicalFileName, oldState, disableUseFileVersionAsSignature) as BuilderProgramState;
    state.program = newProgram;
    const compilerOptions = newProgram.getCompilerOptions();
    state.compilerOptions = compilerOptions;
    const outFilePath = ts.outFile(compilerOptions);
    // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
    if (!outFilePath) {
        state.semanticDiagnosticsPerFile = new ts.Map();
    }
    else if (compilerOptions.composite && oldState?.outSignature && outFilePath === ts.outFile(oldState?.compilerOptions)) {
        state.outSignature = oldState.outSignature && getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldState.outSignature);
    }
    state.changedFilesSet = new ts.Set();
    state.latestChangedDtsFile = compilerOptions.composite ? oldState?.latestChangedDtsFile : undefined;

    const useOldState = ts.BuilderState.canReuseOldState(state.referencedMap, oldState);
    const oldCompilerOptions = useOldState ? oldState!.compilerOptions : undefined;
    const canCopySemanticDiagnostics = useOldState && oldState!.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile &&
        !ts.compilerOptionsAffectSemanticDiagnostics(compilerOptions, oldCompilerOptions!);
    // We can only reuse emit signatures (i.e. .d.ts signatures) if the .d.ts file is unchanged,
    // which will eg be depedent on change in options like declarationDir and outDir options are unchanged.
    // We need to look in oldState.compilerOptions, rather than oldCompilerOptions (i.e.we need to disregard useOldState) because
    // oldCompilerOptions can be undefined if there was change in say module from None to some other option
    // which would make useOldState as false since we can now use reference maps that are needed to track what to emit, what to check etc
    // but that option change does not affect d.ts file name so emitSignatures should still be reused.
    const canCopyEmitSignatures = compilerOptions.composite &&
        oldState?.emitSignatures &&
        !outFilePath &&
        !ts.compilerOptionsAffectDeclarationPath(compilerOptions, oldState.compilerOptions);
    if (useOldState) {
        // Copy old state's changed files set
        oldState!.changedFilesSet?.forEach(value => state.changedFilesSet.add(value));
        if (!outFilePath && oldState!.affectedFilesPendingEmit?.size) {
            state.affectedFilesPendingEmit = new ts.Map(oldState!.affectedFilesPendingEmit);
            state.seenAffectedFiles = new ts.Set();
        }
        state.programEmitPending = oldState!.programEmitPending;
    }
    else {
        // We arent using old state, so atleast emit buildInfo with current information
        state.buildInfoEmitPending = true;
    }

    // Update changed files and copy semantic diagnostics if we can
    const referencedMap = state.referencedMap;
    const oldReferencedMap = useOldState ? oldState!.referencedMap : undefined;
    const copyDeclarationFileDiagnostics = canCopySemanticDiagnostics && !compilerOptions.skipLibCheck === !oldCompilerOptions!.skipLibCheck;
    const copyLibFileDiagnostics = copyDeclarationFileDiagnostics && !compilerOptions.skipDefaultLibCheck === !oldCompilerOptions!.skipDefaultLibCheck;
    state.fileInfos.forEach((info, sourceFilePath) => {
        let oldInfo: Readonly<ts.BuilderState.FileInfo> | undefined;
        let newReferences: ts.ReadonlySet<ts.Path> | undefined;

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
            newReferences && ts.forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState!.fileInfos.has(path))) {
            // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
            addFileToChangeSet(state, sourceFilePath);
        }
        else if (canCopySemanticDiagnostics) {
            const sourceFile = newProgram.getSourceFileByPath(sourceFilePath)!;

            if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics) return;
            if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics) return;

            // Unchanged file copy diagnostics
            const diagnostics = oldState!.semanticDiagnosticsPerFile!.get(sourceFilePath);
            if (diagnostics) {
                state.semanticDiagnosticsPerFile!.set(sourceFilePath, oldState!.hasReusableDiagnostic ? convertToDiagnostics(diagnostics as readonly ReusableDiagnostic[], newProgram, getCanonicalFileName) : diagnostics as readonly ts.Diagnostic[]);
                if (!state.semanticDiagnosticsFromOldState) {
                    state.semanticDiagnosticsFromOldState = new ts.Set();
                }
                state.semanticDiagnosticsFromOldState.add(sourceFilePath);
            }
        }
        if (canCopyEmitSignatures) {
            const oldEmitSignature = oldState.emitSignatures.get(sourceFilePath);
            if (oldEmitSignature) {
                (state.emitSignatures ??= new ts.Map()).set(sourceFilePath, getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldEmitSignature));
            }
        }
    });

    // If the global file is removed, add all files as changed
    if (useOldState && ts.forEachEntry(oldState!.fileInfos, (info, sourceFilePath) => (outFilePath || info.affectsGlobalScope) && !state.fileInfos.has(sourceFilePath))) {
        ts.BuilderState.getAllFilesExcludingDefaultLibraryFile(state, newProgram, /*firstSourceFile*/ undefined)
            .forEach(file => addFileToChangeSet(state, file.resolvedPath));
    }
    else if (oldCompilerOptions) {
        // If options affect emit, then we need to do complete emit per compiler options
        // otherwise only the js or dts that needs to emitted because its different from previously emitted options
        const pendingEmitKind = ts.compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions) ?
            getBuilderFileEmit(compilerOptions) :
            getPendingEmitKind(compilerOptions, oldCompilerOptions);
        if (pendingEmitKind !== BuilderFileEmit.None) {
            if (!outFilePath) {
                // Add all files to affectedFilesPendingEmit since emit changed
                newProgram.getSourceFiles().forEach(f => {
                    // Add to affectedFilesPending emit only if not changed since any changed file will do full emit
                    if (!state.changedFilesSet.has(f.resolvedPath)) {
                        addToAffectedFilesPendingEmit(
                            state,
                            f.resolvedPath,
                            pendingEmitKind
                        );
                    }
                });
                ts.Debug.assert(!state.seenAffectedFiles || !state.seenAffectedFiles.size);
                state.seenAffectedFiles = state.seenAffectedFiles || new ts.Set();
                state.buildInfoEmitPending = true;
            }
            else {
                state.programEmitPending = state.programEmitPending ?
                    state.programEmitPending | pendingEmitKind :
                    pendingEmitKind;
            }
        }
    }
    if (outFilePath && !state.changedFilesSet.size) {
        // Copy the bundle information from old state so we can patch it later if we are doing partial emit
        if (useOldState) state.bundle = oldState!.bundle;
        // If this program has prepend references, always emit since we wont know if files on disk are correct unless we check file hash for correctness
        if (ts.some(newProgram.getProjectReferences(), ref => !!ref.prepend)) state.programEmitPending = getBuilderFileEmit(compilerOptions);
    }
    return state;
}

function addFileToChangeSet(state: BuilderProgramState, path: ts.Path) {
    state.changedFilesSet.add(path);
    state.buildInfoEmitPending = true;
    // Setting this to undefined as changed files means full emit so no need to track emit explicitly
    state.programEmitPending = undefined;
}

/**
 * Covert to Emit signature based on oldOptions and EmitSignature format
 * If d.ts map options differ then swap the format, otherwise use as is
 */
function getEmitSignatureFromOldSignature(options: ts.CompilerOptions, oldOptions: ts.CompilerOptions, oldEmitSignature: EmitSignature): EmitSignature {
    return !!options.declarationMap === !!oldOptions.declarationMap ?
        // Use same format of signature
        oldEmitSignature :
        // Convert to different format
        ts.isString(oldEmitSignature) ? [oldEmitSignature] : oldEmitSignature[0];
}

function convertToDiagnostics(diagnostics: readonly ReusableDiagnostic[], newProgram: ts.Program, getCanonicalFileName: ts.GetCanonicalFileName): readonly ts.Diagnostic[] {
    if (!diagnostics.length) return ts.emptyArray;
    const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(ts.getTsBuildInfoEmitOutputFilePath(newProgram.getCompilerOptions())!, newProgram.getCurrentDirectory()));
    return diagnostics.map(diagnostic => {
        const result: ts.Diagnostic = convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPath);
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

function convertToDiagnosticRelatedInformation(diagnostic: ReusableDiagnosticRelatedInformation, newProgram: ts.Program, toPath: (path: string) => ts.Path): ts.DiagnosticRelatedInformation {
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
    ts.BuilderState.releaseCache(state);
    state.program = undefined;
}

function backupBuilderProgramEmitState(state: Readonly<BuilderProgramState>): SavedBuildProgramEmitState {
    const outFilePath = ts.outFile(state.compilerOptions);
    // Only in --out changeFileSet is kept around till emit
    ts.Debug.assert(!state.changedFilesSet.size || outFilePath);
    return {
        affectedFilesPendingEmit: state.affectedFilesPendingEmit && new ts.Map(state.affectedFilesPendingEmit),
        seenEmittedFiles: state.seenEmittedFiles && new ts.Map(state.seenEmittedFiles),
        programEmitPending: state.programEmitPending,
        emitSignatures: state.emitSignatures && new ts.Map(state.emitSignatures),
        outSignature: state.outSignature,
        latestChangedDtsFile: state.latestChangedDtsFile,
        hasChangedEmitSignature: state.hasChangedEmitSignature,
        changedFilesSet: outFilePath ? new ts.Set(state.changedFilesSet) : undefined,
    };
}

function restoreBuilderProgramEmitState(state: BuilderProgramState, savedEmitState: SavedBuildProgramEmitState) {
    state.affectedFilesPendingEmit = savedEmitState.affectedFilesPendingEmit;
    state.seenEmittedFiles = savedEmitState.seenEmittedFiles;
    state.programEmitPending = savedEmitState.programEmitPending;
    state.emitSignatures = savedEmitState.emitSignatures;
    state.outSignature = savedEmitState.outSignature;
    state.latestChangedDtsFile = savedEmitState.latestChangedDtsFile;
    state.hasChangedEmitSignature = savedEmitState.hasChangedEmitSignature;
    if (savedEmitState.changedFilesSet) state.changedFilesSet = savedEmitState.changedFilesSet;
}

/**
 * Verifies that source file is ok to be used in calls that arent handled by next
 */
function assertSourceFileOkWithoutNextAffectedCall(state: BuilderProgramState, sourceFile: ts.SourceFile | undefined) {
    ts.Debug.assert(!sourceFile || !state.affectedFiles || state.affectedFiles[state.affectedFilesIndex! - 1] !== sourceFile || !state.semanticDiagnosticsPerFile!.has(sourceFile.resolvedPath));
}

/**
 * This function returns the next affected file to be processed.
 * Note that until doneAffected is called it would keep reporting same result
 * This is to allow the callers to be able to actually remove affected file only when the operation is complete
 * eg. if during diagnostics check cancellation token ends up cancelling the request, the affected file should be retained
 */
function getNextAffectedFile(
    state: BuilderProgramState,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost
): ts.SourceFile | ts.Program | undefined {
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
                    addToAffectedFilesPendingEmit(state, affectedFile.resolvedPath, getBuilderFileEmit(state.compilerOptions));
                    handleDtsMayChangeOfAffectedFile(
                        state,
                        affectedFile,
                        cancellationToken,
                        computeHash,
                        getCanonicalFileName,
                        host
                    );
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
        const program = ts.Debug.checkDefined(state.program);
        const compilerOptions = program.getCompilerOptions();
        if (ts.outFile(compilerOptions)) {
            ts.Debug.assert(!state.semanticDiagnosticsPerFile);
            return program;
        }

        // Get next batch of affected files
        state.affectedFiles = ts.BuilderState.getFilesAffectedByWithOldState(
            state,
            program,
            nextKey.value,
            cancellationToken,
            computeHash,
            getCanonicalFileName,
        );
        state.currentChangedFilePath = nextKey.value;
        state.affectedFilesIndex = 0;
        if (!state.seenAffectedFiles) state.seenAffectedFiles = new ts.Set();
    }
}

function clearAffectedFilesPendingEmit(state: BuilderProgramState, emitOnlyDtsFiles: boolean | undefined) {
    if (!state.affectedFilesPendingEmit?.size) return;
    if (!emitOnlyDtsFiles) return state.affectedFilesPendingEmit = undefined;
    state.affectedFilesPendingEmit.forEach((emitKind, path) => {
        // Mark the files as pending only if they are pending on js files, remove the dts emit pending flag
        const pending = emitKind & BuilderFileEmit.AllJs;
        if (!pending) state.affectedFilesPendingEmit!.delete(path);
        else state.affectedFilesPendingEmit!.set(path, pending);
    });
}

/**
 * Returns next file to be emitted from files that retrieved semantic diagnostics but did not emit yet
 */
function getNextAffectedFilePendingEmit(state: BuilderProgramState, emitOnlyDtsFiles: boolean | undefined) {
    if (!state.affectedFilesPendingEmit?.size) return undefined;
    return ts.forEachEntry(state.affectedFilesPendingEmit, (emitKind, path) => {
        const affectedFile = state.program!.getSourceFileByPath(path);
        if (!affectedFile || !ts.sourceFileMayBeEmitted(affectedFile, state.program!)) {
            state.affectedFilesPendingEmit!.delete(path);
            return undefined;
        }
        const seenKind = state.seenEmittedFiles?.get(affectedFile.resolvedPath);
        let pendingKind = getPendingEmitKind(emitKind, seenKind);
        if (emitOnlyDtsFiles) pendingKind = pendingKind & BuilderFileEmit.AllDts;
        if (pendingKind) return { affectedFile, emitKind: pendingKind };
    });
}

function removeDiagnosticsOfLibraryFiles(state: BuilderProgramState) {
    if (!state.cleanedDiagnosticsOfLibFiles) {
        state.cleanedDiagnosticsOfLibFiles = true;
        const program = ts.Debug.checkDefined(state.program);
        const options = program.getCompilerOptions();
        ts.forEach(program.getSourceFiles(), f =>
            program.isSourceFileDefaultLibrary(f) &&
            !ts.skipTypeChecking(f, options, program) &&
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
    affectedFile: ts.SourceFile,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost,
) {
    removeSemanticDiagnosticsOf(state, affectedFile.resolvedPath);

    // If affected files is everything except default library, then nothing more to do
    if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles) {
        removeDiagnosticsOfLibraryFiles(state);
        // When a change affects the global scope, all files are considered to be affected without updating their signature
        // That means when affected file is handled, its signature can be out of date
        // To avoid this, ensure that we update the signature for any affected file in this scenario.
        ts.BuilderState.updateShapeSignature(
            state,
            ts.Debug.checkDefined(state.program),
            affectedFile,
            cancellationToken,
            computeHash,
            getCanonicalFileName,
        );
        return;
    }
    if (state.compilerOptions.assumeChangesOnlyAffectDirectDependencies) return;
    handleDtsMayChangeOfReferencingExportOfAffectedFile(
        state,
        affectedFile,
        cancellationToken,
        computeHash,
        getCanonicalFileName,
        host,
    );
}

/**
 * Handle the dts may change, so they need to be added to pending emit if dts emit is enabled,
 * Also we need to make sure signature is updated for these files
 */
function handleDtsMayChangeOf(
    state: BuilderProgramState,
    path: ts.Path,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost
): void {
    removeSemanticDiagnosticsOf(state, path);

    if (!state.changedFilesSet.has(path)) {
        const program = ts.Debug.checkDefined(state.program);
        const sourceFile = program.getSourceFileByPath(path);
        if (sourceFile) {
            // Even though the js emit doesnt change and we are already handling dts emit and semantic diagnostics
            // we need to update the signature to reflect correctness of the signature(which is output d.ts emit) of this file
            // This ensures that we dont later during incremental builds considering wrong signature.
            // Eg where this also is needed to ensure that .tsbuildinfo generated by incremental build should be same as if it was first fresh build
            // But we avoid expensive full shape computation, as using file version as shape is enough for correctness.
            ts.BuilderState.updateShapeSignature(
                state,
                program,
                sourceFile,
                cancellationToken,
                computeHash,
                getCanonicalFileName,
                !host.disableUseFileVersionAsSignature
            );
            // If not dts emit, nothing more to do
            if (ts.getEmitDeclarations(state.compilerOptions)) {
                addToAffectedFilesPendingEmit(state, path, state.compilerOptions.declarationMap ? BuilderFileEmit.AllDts : BuilderFileEmit.Dts);
            }
        }
    }
}

/**
 * Removes semantic diagnostics for path and
 * returns true if there are no more semantic diagnostics from the old state
 */
function removeSemanticDiagnosticsOf(state: BuilderProgramState, path: ts.Path) {
    if (!state.semanticDiagnosticsFromOldState) {
        return true;
    }
    state.semanticDiagnosticsFromOldState.delete(path);
    state.semanticDiagnosticsPerFile!.delete(path);
    return !state.semanticDiagnosticsFromOldState.size;
}

function isChangedSignature(state: BuilderProgramState, path: ts.Path) {
    const oldSignature = ts.Debug.checkDefined(state.oldSignatures).get(path) || undefined;
    const newSignature = ts.Debug.checkDefined(state.fileInfos.get(path)).signature;
    return newSignature !== oldSignature;
}

function handleDtsMayChangeOfGlobalScope(
    state: BuilderProgramState,
    filePath: ts.Path,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost,
): boolean {
    if (!state.fileInfos.get(filePath)?.affectsGlobalScope) return false;
    // Every file needs to be handled
    ts.BuilderState.getAllFilesExcludingDefaultLibraryFile(state, state.program!, /*firstSourceFile*/ undefined)
        .forEach(file => handleDtsMayChangeOf(
            state,
            file.resolvedPath,
            cancellationToken,
            computeHash,
            getCanonicalFileName,
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
    affectedFile: ts.SourceFile,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost
) {
    // If there was change in signature (dts output) for the changed file,
    // then only we need to handle pending file emit
    if (!state.exportedModulesMap || !state.changedFilesSet.has(affectedFile.resolvedPath)) return;
    if (!isChangedSignature(state, affectedFile.resolvedPath)) return;

    // Since isolated modules dont change js files, files affected by change in signature is itself
    // But we need to cleanup semantic diagnostics and queue dts emit for affected files
    if (state.compilerOptions.isolatedModules) {
        const seenFileNamesMap = new ts.Map<ts.Path, true>();
        seenFileNamesMap.set(affectedFile.resolvedPath, true);
        const queue = ts.BuilderState.getReferencedByPaths(state, affectedFile.resolvedPath);
        while (queue.length > 0) {
            const currentPath = queue.pop()!;
            if (!seenFileNamesMap.has(currentPath)) {
                seenFileNamesMap.set(currentPath, true);
                if (handleDtsMayChangeOfGlobalScope(state, currentPath, cancellationToken, computeHash, getCanonicalFileName, host)) return;
                handleDtsMayChangeOf(state, currentPath, cancellationToken, computeHash, getCanonicalFileName, host);
                if (isChangedSignature(state, currentPath)) {
                    const currentSourceFile = ts.Debug.checkDefined(state.program).getSourceFileByPath(currentPath)!;
                    queue.push(...ts.BuilderState.getReferencedByPaths(state, currentSourceFile.resolvedPath));
                }
            }
        }
    }

    const seenFileAndExportsOfFile = new ts.Set<string>();
    // Go through exported modules from cache first
    // If exported modules has path, all files referencing file exported from are affected
    state.exportedModulesMap.getKeys(affectedFile.resolvedPath)?.forEach(exportedFromPath => {
        if (handleDtsMayChangeOfGlobalScope(state, exportedFromPath, cancellationToken, computeHash, getCanonicalFileName, host)) return true;
        const references = state.referencedMap!.getKeys(exportedFromPath);
        return references && ts.forEachKey(references, filePath =>
            handleDtsMayChangeOfFileAndExportsOfFile(
                state,
                filePath,
                seenFileAndExportsOfFile,
                cancellationToken,
                computeHash,
                getCanonicalFileName,
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
    filePath: ts.Path,
    seenFileAndExportsOfFile: ts.Set<string>,
    cancellationToken: ts.CancellationToken | undefined,
    computeHash: ts.BuilderState.ComputeHash,
    getCanonicalFileName: ts.GetCanonicalFileName,
    host: ts.BuilderProgramHost,
): boolean | undefined {
    if (!ts.tryAddToSet(seenFileAndExportsOfFile, filePath)) return undefined;

    if (handleDtsMayChangeOfGlobalScope(state, filePath, cancellationToken, computeHash, getCanonicalFileName, host)) return true;
    handleDtsMayChangeOf(state, filePath, cancellationToken, computeHash, getCanonicalFileName, host);

    // If exported modules has path, all files referencing file exported from are affected
    state.exportedModulesMap!.getKeys(filePath)?.forEach(exportedFromPath =>
        handleDtsMayChangeOfFileAndExportsOfFile(
            state,
            exportedFromPath,
            seenFileAndExportsOfFile,
            cancellationToken,
            computeHash,
            getCanonicalFileName,
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
            getCanonicalFileName,
            host,
        )
    );
    return undefined;
}

/**
 * Gets semantic diagnostics for the file which are
 * bindAndCheckDiagnostics (from cache) and program diagnostics
 */
function getSemanticDiagnosticsOfFile(state: BuilderProgramState, sourceFile: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
    return ts.concatenate(
        getBinderAndCheckerDiagnosticsOfFile(state, sourceFile, cancellationToken),
        ts.Debug.checkDefined(state.program).getProgramDiagnostics(sourceFile)
    );
}

/**
 * Gets the binder and checker diagnostics either from cache if present, or otherwise from program and caches it
 * Note that it is assumed that when asked about binder and checker diagnostics, the file has been taken out of affected files/changed file set
 */
function getBinderAndCheckerDiagnosticsOfFile(state: BuilderProgramState, sourceFile: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
    const path = sourceFile.resolvedPath;
    if (state.semanticDiagnosticsPerFile) {
        const cachedDiagnostics = state.semanticDiagnosticsPerFile.get(path);
        // Report the bind and check diagnostics from the cache if we already have those diagnostics present
        if (cachedDiagnostics) {
            return ts.filterSemanticDiagnostics(cachedDiagnostics, state.compilerOptions);
        }
    }

    // Diagnostics werent cached, get them from program, and cache the result
    const diagnostics = ts.Debug.checkDefined(state.program).getBindAndCheckDiagnostics(sourceFile, cancellationToken);
    if (state.semanticDiagnosticsPerFile) {
        state.semanticDiagnosticsPerFile.set(path, diagnostics);
    }
    return ts.filterSemanticDiagnostics(diagnostics, state.compilerOptions);
}

/** @internal */
export type ProgramBuildInfoFileId = number & { __programBuildInfoFileIdBrand: any };
/** @internal */
export type ProgramBuildInfoFileIdListId = number & { __programBuildInfoFileIdListIdBrand: any };
/** @internal */
export type ProgramBuildInfoDiagnostic = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, diagnostics: readonly ReusableDiagnostic[]];
/** @internal */
/**
 * fileId if pending emit is same as what compilerOptions suggest
 * [fileId] if pending emit is only dts file emit
 * [fileId, emitKind] if any other type emit is pending
 */
export type ProgramBuilderInfoFilePendingEmit = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId] | [fileId: ProgramBuildInfoFileId, emitKind: BuilderFileEmit];
/** @internal */
export type ProgramBuildInfoReferencedMap = [fileId: ProgramBuildInfoFileId, fileIdListId: ProgramBuildInfoFileIdListId][];
/** @internal */
export type ProgramMultiFileEmitBuildInfoBuilderStateFileInfo = Omit<ts.BuilderState.FileInfo, "signature"> & {
    /**
     * Signature is
     * - undefined if FileInfo.version === FileInfo.signature
     * - false if FileInfo has signature as undefined (not calculated)
     * - string actual signature
     */
    signature: string | false | undefined;
};
/** @internal */
/**
 * [fileId, signature] if different from file's signature
 * fileId if file wasnt emitted
 */
export type ProgramBuildInfoEmitSignature = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, signature: EmitSignature | []];
/** @internal */
/**
 * ProgramMultiFileEmitBuildInfoFileInfo is string if FileInfo.version === FileInfo.signature && !FileInfo.affectsGlobalScope otherwise encoded FileInfo
 */
export type ProgramMultiFileEmitBuildInfoFileInfo = string | ProgramMultiFileEmitBuildInfoBuilderStateFileInfo;
/** @internal */
export interface ProgramMultiFileEmitBuildInfo {
    fileNames: readonly string[];
    fileInfos: readonly ProgramMultiFileEmitBuildInfoFileInfo[];
    options: ts.CompilerOptions | undefined;
    fileIdsList: readonly (readonly ProgramBuildInfoFileId[])[] | undefined;
    referencedMap: ProgramBuildInfoReferencedMap | undefined;
    exportedModulesMap: ProgramBuildInfoReferencedMap | undefined;
    semanticDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] | undefined;
    affectedFilesPendingEmit: ProgramBuilderInfoFilePendingEmit[] | undefined;
    changeFileSet: readonly ProgramBuildInfoFileId[] | undefined;
    emitSignatures: readonly ProgramBuildInfoEmitSignature[] | undefined;
    // Because this is only output file in the program, we dont need fileId to deduplicate name
    latestChangedDtsFile?: string | undefined;
}
/** @internal */
/**
 * ProgramBundleEmitBuildInfoFileInfo is string if !FileInfo.impliedFormat otherwise encoded FileInfo
 */
export type ProgramBundleEmitBuildInfoFileInfo = string | ts.BuilderState.FileInfo;
/** @internal */
/**
 * false if it is the emit corresponding to compilerOptions
 * value otherwise
 */
export type ProgramBuildInfoBundlePendingEmit = BuilderFileEmit | false;
/** @internal */
export interface ProgramBundleEmitBuildInfo {
    fileNames: readonly string[];
    fileInfos: readonly ProgramBundleEmitBuildInfoFileInfo[];
    options: ts.CompilerOptions | undefined;
    outSignature: EmitSignature | undefined;
    latestChangedDtsFile: string | undefined;
    pendingEmit: ProgramBuildInfoBundlePendingEmit | undefined;
}

/** @internal */
export type ProgramBuildInfo = ProgramMultiFileEmitBuildInfo | ProgramBundleEmitBuildInfo;

/** @internal */
export function isProgramBundleEmitBuildInfo(info: ProgramBuildInfo): info is ProgramBundleEmitBuildInfo {
    return !!ts.outFile(info.options || {});
}

/**
 * Gets the program information to be emitted in buildInfo so that we can use it to create new program
 */
function getBuildInfo(state: BuilderProgramState, getCanonicalFileName: ts.GetCanonicalFileName, bundle: ts.BundleBuildInfo | undefined): ts.BuildInfo {
    const currentDirectory = ts.Debug.checkDefined(state.program).getCurrentDirectory();
    const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(ts.getTsBuildInfoEmitOutputFilePath(state.compilerOptions)!, currentDirectory));
    // Convert the file name to Path here if we set the fileName instead to optimize multiple d.ts file emits and having to compute Canonical path
    const latestChangedDtsFile = state.latestChangedDtsFile ? relativeToBuildInfoEnsuringAbsolutePath(state.latestChangedDtsFile) : undefined;
    const fileNames: string[] = [];
    const fileNameToFileId = new ts.Map<string, ProgramBuildInfoFileId>();
    if (ts.outFile(state.compilerOptions)) {
        // Copy all fileInfo, version and impliedFormat
        // Affects global scope and signature doesnt matter because with --out they arent calculated or needed to determine upto date ness
        const fileInfos = ts.arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramBundleEmitBuildInfoFileInfo => {
            // Ensure fileId
            toFileId(key);
            return value.impliedFormat ?
                { version: value.version, impliedFormat: value.impliedFormat, signature: undefined, affectsGlobalScope: undefined } :
                value.version;
        });
        const program: ProgramBundleEmitBuildInfo = {
            fileNames,
            fileInfos,
            options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
            outSignature: state.outSignature,
            latestChangedDtsFile,
            pendingEmit: !state.programEmitPending ?
                undefined :  // Pending is undefined or None is encoded as undefined
                state.programEmitPending === getBuilderFileEmit(state.compilerOptions) ?
                    false : // Pending emit is same as deteremined by compilerOptions
                    state.programEmitPending, // Actual value
        };
        // Complete the bundle information if we are doing partial emit (only js or only dts)
        const { js, dts, commonSourceDirectory, sourceFiles } = bundle!;
        state.bundle = bundle = {
            commonSourceDirectory,
            sourceFiles,
            js: js || (!state.compilerOptions.emitDeclarationOnly ? state.bundle?.js : undefined),
            dts: dts || (ts.getEmitDeclarations(state.compilerOptions) ? state.bundle?.dts : undefined),
        };
        return ts.createBuildInfo(program, bundle);
    }

    let fileIdsList: (readonly ProgramBuildInfoFileId[])[] | undefined;
    let fileNamesToFileIdListId: ts.ESMap<string, ProgramBuildInfoFileIdListId> | undefined;
    let emitSignatures: ProgramBuildInfoEmitSignature[] | undefined;
    const fileInfos = ts.arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramMultiFileEmitBuildInfoFileInfo => {
        // Ensure fileId
        const fileId = toFileId(key);
        ts.Debug.assert(fileNames[fileId - 1] === relativeToBuildInfo(key));
        const oldSignature = state.oldSignatures?.get(key);
        const actualSignature = oldSignature !== undefined ? oldSignature || undefined : value.signature;
        if (state.compilerOptions.composite) {
            const file = state.program!.getSourceFileByPath(key)!;
            if (!ts.isJsonSourceFile(file) && ts.sourceFileMayBeEmitted(file, state.program!)) {
                const emitSignature = state.emitSignatures?.get(key);
                if (emitSignature !== actualSignature) {
                    (emitSignatures ||= []).push(emitSignature === undefined ?
                        fileId : // There is no emit, encode as false
                        // fileId, signature: emptyArray if signature only differs in dtsMap option than our own compilerOptions otherwise EmitSignature
                        [fileId, !ts.isString(emitSignature) && emitSignature[0] === actualSignature ? ts.emptyArray as [] : emitSignature]);
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
        referencedMap = ts.arrayFrom(state.referencedMap.keys()).sort(ts.compareStringsCaseSensitive).map(key => [
            toFileId(key),
            toFileIdListId(state.referencedMap!.getValues(key)!)
        ]);
    }

    let exportedModulesMap: ProgramBuildInfoReferencedMap | undefined;
    if (state.exportedModulesMap) {
        exportedModulesMap = ts.mapDefined(ts.arrayFrom(state.exportedModulesMap.keys()).sort(ts.compareStringsCaseSensitive), key => {
            const oldValue = state.oldExportedModulesMap?.get(key);
            // Not in temporary cache, use existing value
            if (oldValue === undefined) return [toFileId(key), toFileIdListId(state.exportedModulesMap!.getValues(key)!)];
            if (oldValue) return [toFileId(key), toFileIdListId(oldValue)];
            return undefined;
        });
    }

    let semanticDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] | undefined;
    if (state.semanticDiagnosticsPerFile) {
        for (const key of ts.arrayFrom(state.semanticDiagnosticsPerFile.keys()).sort(ts.compareStringsCaseSensitive)) {
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
    if (state.affectedFilesPendingEmit?.size) {
        const fullEmitForOptions = getBuilderFileEmit(state.compilerOptions);
        const seenFiles = new ts.Set<ts.Path>();
        for (const path of ts.arrayFrom(state.affectedFilesPendingEmit.keys()).sort(ts.compareStringsCaseSensitive)) {
            if (ts.tryAddToSet(seenFiles, path)) {
                const file = state.program!.getSourceFileByPath(path)!;
                if (!ts.sourceFileMayBeEmitted(file, state.program!)) continue;
                const fileId = toFileId(path), pendingEmit = state.affectedFilesPendingEmit.get(path)!;
                (affectedFilesPendingEmit ||= []).push(
                    pendingEmit === fullEmitForOptions ?
                        fileId :  // Pending full emit per options
                        pendingEmit === BuilderFileEmit.Dts ?
                            [fileId] : // Pending on Dts only
                            [fileId, pendingEmit] // Anything else
                );
            }
        }
    }

    let changeFileSet: ProgramBuildInfoFileId[] | undefined;
    if (state.changedFilesSet.size) {
        for (const path of ts.arrayFrom(state.changedFilesSet.keys()).sort(ts.compareStringsCaseSensitive)) {
            (changeFileSet ||= []).push(toFileId(path));
        }
    }

    const program: ProgramMultiFileEmitBuildInfo = {
        fileNames,
        fileInfos,
        options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
        fileIdsList,
        referencedMap,
        exportedModulesMap,
        semanticDiagnosticsPerFile,
        affectedFilesPendingEmit,
        changeFileSet,
        emitSignatures,
        latestChangedDtsFile,
    };
    return ts.createBuildInfo(program, bundle);

    function relativeToBuildInfoEnsuringAbsolutePath(path: string) {
        return relativeToBuildInfo(ts.getNormalizedAbsolutePath(path, currentDirectory));
    }

    function relativeToBuildInfo(path: string) {
        return ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
    }

    function toFileId(path: ts.Path): ProgramBuildInfoFileId {
        let fileId = fileNameToFileId.get(path);
        if (fileId === undefined) {
            fileNames.push(relativeToBuildInfo(path));
            fileNameToFileId.set(path, fileId = fileNames.length as ProgramBuildInfoFileId);
        }
        return fileId;
    }

    function toFileIdListId(set: ts.ReadonlySet<ts.Path>): ProgramBuildInfoFileIdListId {
        const fileIds = ts.arrayFrom(set.keys(), toFileId).sort(ts.compareValues);
        const key = fileIds.join();
        let fileIdListId = fileNamesToFileIdListId?.get(key);
        if (fileIdListId === undefined) {
            (fileIdsList ||= []).push(fileIds);
            (fileNamesToFileIdListId ||= new ts.Map()).set(key, fileIdListId = fileIdsList.length as ProgramBuildInfoFileIdListId);
        }
        return fileIdListId;
    }

    /**
     * @param optionKey key of CommandLineOption to use to determine if the option should be serialized in tsbuildinfo
     */
    function convertToProgramBuildInfoCompilerOptions(options: ts.CompilerOptions) {
        let result: ts.CompilerOptions | undefined;
        const { optionsNameMap } = ts.getOptionsNameMap();
        for (const name of ts.getOwnKeys(options).sort(ts.compareStringsCaseSensitive)) {
            const optionInfo = optionsNameMap.get(name.toLowerCase());
            if (optionInfo?.affectsBuildInfo) {
                (result ||= {})[name] = convertToReusableCompilerOptionValue(
                    optionInfo,
                    options[name] as ts.CompilerOptionsValue,
                    relativeToBuildInfoEnsuringAbsolutePath
                );
            }
        }
        return result;
    }
}

function convertToReusableCompilerOptionValue(option: ts.CommandLineOption | undefined, value: ts.CompilerOptionsValue, relativeToBuildInfo: (path: string) => string) {
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

function convertToReusableDiagnostics(diagnostics: readonly ts.Diagnostic[], relativeToBuildInfo: (path: string) => string): readonly ReusableDiagnostic[] {
    ts.Debug.assert(!!diagnostics.length);
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

function convertToReusableDiagnosticRelatedInformation(diagnostic: ts.DiagnosticRelatedInformation, relativeToBuildInfo: (path: string) => string): ReusableDiagnosticRelatedInformation {
    const { file } = diagnostic;
    return {
        ...diagnostic,
        file: file ? relativeToBuildInfo(file.resolvedPath) : undefined
    };
}

/** @internal */
export enum BuilderProgramKind {
    SemanticDiagnosticsBuilderProgram,
    EmitAndSemanticDiagnosticsBuilderProgram
}

/** @internal */
export interface BuilderCreationParameters {
    newProgram: ts.Program;
    host: ts.BuilderProgramHost;
    oldProgram: ts.BuilderProgram | undefined;
    configFileParsingDiagnostics: readonly ts.Diagnostic[];
}

/** @internal */
export function getBuilderCreationParameters(newProgramOrRootNames: ts.Program | readonly string[] | undefined, hostOrOptions: ts.BuilderProgramHost | ts.CompilerOptions | undefined, oldProgramOrHost?: ts.BuilderProgram | ts.CompilerHost, configFileParsingDiagnosticsOrOldProgram?: readonly ts.Diagnostic[] | ts.BuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]): BuilderCreationParameters {
    let host: ts.BuilderProgramHost;
    let newProgram: ts.Program;
    let oldProgram: ts.BuilderProgram;
    if (newProgramOrRootNames === undefined) {
        ts.Debug.assert(hostOrOptions === undefined);
        host = oldProgramOrHost as ts.CompilerHost;
        oldProgram = configFileParsingDiagnosticsOrOldProgram as ts.BuilderProgram;
        ts.Debug.assert(!!oldProgram);
        newProgram = oldProgram.getProgram();
    }
    else if (ts.isArray(newProgramOrRootNames)) {
        oldProgram = configFileParsingDiagnosticsOrOldProgram as ts.BuilderProgram;
        newProgram = ts.createProgram({
            rootNames: newProgramOrRootNames,
            options: hostOrOptions as ts.CompilerOptions,
            host: oldProgramOrHost as ts.CompilerHost,
            oldProgram: oldProgram && oldProgram.getProgramOrUndefined(),
            configFileParsingDiagnostics,
            projectReferences
        });
        host = oldProgramOrHost as ts.CompilerHost;
    }
    else {
        newProgram = newProgramOrRootNames;
        host = hostOrOptions as ts.BuilderProgramHost;
        oldProgram = oldProgramOrHost as ts.BuilderProgram;
        configFileParsingDiagnostics = configFileParsingDiagnosticsOrOldProgram as readonly ts.Diagnostic[];
    }
    return { host, newProgram, oldProgram, configFileParsingDiagnostics: configFileParsingDiagnostics || ts.emptyArray };
}

function getTextHandlingSourceMapForSignature(text: string, data: ts.WriteFileCallbackData | undefined) {
    return data?.sourceMapUrlPos !== undefined ? text.substring(0, data.sourceMapUrlPos) : text;
}

/** @internal */
export function computeSignatureWithDiagnostics(
    sourceFile: ts.SourceFile,
    text: string,
    computeHash: ts.BuilderState.ComputeHash | undefined,
    getCanonicalFileName: ts.GetCanonicalFileName,
    data: ts.WriteFileCallbackData | undefined
) {
    text = getTextHandlingSourceMapForSignature(text, data);
    let sourceFileDirectory: string | undefined;
    if (data?.diagnostics?.length) {
        text += data.diagnostics.map(diagnostic =>
            `${locationInfo(diagnostic)}${ts.DiagnosticCategory[diagnostic.category]}${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText)}`
        ).join("\n");
    }
    return (computeHash ?? ts.generateDjb2Hash)(text);

    function flattenDiagnosticMessageText(diagnostic: string | ts.DiagnosticMessageChain | undefined): string {
        return ts.isString(diagnostic) ?
            diagnostic :
            diagnostic === undefined ?
                "" :
                !diagnostic.next ?
                    diagnostic.messageText :
                    diagnostic.messageText + diagnostic.next.map(flattenDiagnosticMessageText).join("\n");
    }

    function locationInfo(diagnostic: ts.DiagnosticWithLocation) {
        if (diagnostic.file.resolvedPath === sourceFile.resolvedPath) return `(${diagnostic.start},${diagnostic.length})`;
        if (sourceFileDirectory === undefined) sourceFileDirectory = ts.getDirectoryPath(sourceFile.resolvedPath);
        return `${ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(sourceFileDirectory, diagnostic.file.resolvedPath, getCanonicalFileName))}(${diagnostic.start},${diagnostic.length})`;
    }
}

/** @internal */
export function computeSignature(text: string, computeHash: ts.BuilderState.ComputeHash | undefined, data?: ts.WriteFileCallbackData) {
    return (computeHash ?? ts.generateDjb2Hash)(getTextHandlingSourceMapForSignature(text, data));
}

/** @internal */
export function createBuilderProgram(kind: BuilderProgramKind.SemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): ts.SemanticDiagnosticsBuilderProgram;
/** @internal */
export function createBuilderProgram(kind: BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): ts.EmitAndSemanticDiagnosticsBuilderProgram;
/** @internal */
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
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    /**
     * Computing hash to for signature verification
     */
    const computeHash = ts.maybeBind(host, host.createHash);
    const state = createBuilderProgramState(newProgram, getCanonicalFileName, oldState, host.disableUseFileVersionAsSignature);
    newProgram.getBuildInfo = bundle => getBuildInfo(state, getCanonicalFileName, bundle);

    // To ensure that we arent storing any references to old program or new program without state
    newProgram = undefined!; // TODO: GH#18217
    oldProgram = undefined;
    oldState = undefined;

    const getState = () => state;
    const builderProgram = createRedirectedBuilderProgram(getState, configFileParsingDiagnostics);
    builderProgram.getState = getState;
    builderProgram.saveEmitState = () => backupBuilderProgramEmitState(state);
    builderProgram.restoreEmitState = (saved) => restoreBuilderProgramEmitState(state, saved);
    builderProgram.hasChangedEmitSignature = () => !!state.hasChangedEmitSignature;
    builderProgram.getAllDependencies = sourceFile => ts.BuilderState.getAllDependencies(state, ts.Debug.checkDefined(state.program), sourceFile);
    builderProgram.getSemanticDiagnostics = getSemanticDiagnostics;
    builderProgram.emit = emit;
    builderProgram.releaseProgram = () => releaseCache(state);

    if (kind === BuilderProgramKind.SemanticDiagnosticsBuilderProgram) {
        (builderProgram as ts.SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
    }
    else if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
        (builderProgram as ts.EmitAndSemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
        (builderProgram as ts.EmitAndSemanticDiagnosticsBuilderProgram).emitNextAffectedFile = emitNextAffectedFile;
        builderProgram.emitBuildInfo = emitBuildInfo;
    }
    else {
        ts.notImplemented();
    }

    return builderProgram;

    function emitBuildInfo(writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken): ts.EmitResult {
        if (state.buildInfoEmitPending) {
            const result = ts.Debug.checkDefined(state.program).emitBuildInfo(writeFile || ts.maybeBind(host, host.writeFile), cancellationToken);
            state.buildInfoEmitPending = false;
            return result;
        }
        return ts.emitSkippedWithNoDiagnostics;
    }

    /**
     * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
     * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
     * in that order would be used to write the files
     */
    function emitNextAffectedFile(writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): ts.AffectedFileResult<ts.EmitResult> {
        let affected = getNextAffectedFile(state, cancellationToken, computeHash, getCanonicalFileName, host);
        const programEmitKind = getBuilderFileEmit(state.compilerOptions);
        let emitKind: BuilderFileEmit = emitOnlyDtsFiles ?
            programEmitKind & BuilderFileEmit.AllDts : programEmitKind;
        if (!affected) {
            if (!ts.outFile(state.compilerOptions)) {
                const pendingAffectedFile = getNextAffectedFilePendingEmit(state, emitOnlyDtsFiles);
                if (!pendingAffectedFile) {
                    // Emit buildinfo if pending
                    if (!state.buildInfoEmitPending) return undefined;
                    const affected = state.program!;
                    const result = affected.emitBuildInfo(writeFile || ts.maybeBind(host, host.writeFile), cancellationToken);
                    state.buildInfoEmitPending = false;
                    return { result, affected };
                }
                // Emit pending affected file
                ({ affectedFile: affected, emitKind } = pendingAffectedFile);
            }
            else {
                // Emit program if it was pending emit
                if (!state.programEmitPending) return undefined;
                emitKind = state.programEmitPending;
                if (emitOnlyDtsFiles) emitKind = emitKind & BuilderFileEmit.AllDts;
                if (!emitKind) return undefined;
                affected = state.program!;
            }
        }
        // Determine if we can do partial emit
        let emitOnly: ts.EmitOnly | undefined;
        if (emitKind & BuilderFileEmit.AllJs) emitOnly = ts.EmitOnly.Js;
        if (emitKind & BuilderFileEmit.AllDts) emitOnly = emitOnly === undefined ? ts.EmitOnly.Dts : undefined;
        if (affected === state.program) {
            // Set up programEmit before calling emit so that its set in buildInfo
            state.programEmitPending = state.changedFilesSet.size ?
                getPendingEmitKind(programEmitKind, emitKind) :
                state.programEmitPending ?
                    getPendingEmitKind(state.programEmitPending, emitKind) :
                    undefined;
        }
        // Actual emit
        const result = state.program!.emit(
            affected === state.program ? undefined : affected as ts.SourceFile,
            getWriteFileCallback(writeFile, customTransformers),
            cancellationToken,
            emitOnly,
            customTransformers
        );
        if (affected !== state.program) {
            // update affected files
            const affectedSourceFile = affected as ts.SourceFile;
            state.seenAffectedFiles!.add(affectedSourceFile.resolvedPath);
            if (state.affectedFilesIndex !== undefined) state.affectedFilesIndex++;
            // Change in changeSet/affectedFilesPendingEmit, buildInfo needs to be emitted
            state.buildInfoEmitPending = true;
            // Update the pendingEmit for the file
            const existing = state.seenEmittedFiles?.get(affectedSourceFile.resolvedPath) || BuilderFileEmit.None;
            (state.seenEmittedFiles ??= new ts.Map()).set(affectedSourceFile.resolvedPath, emitKind | existing);
            const existingPending = state.affectedFilesPendingEmit?.get(affectedSourceFile.resolvedPath) || programEmitKind;
            const pendingKind = getPendingEmitKind(existingPending, emitKind | existing);
            if (pendingKind) (state.affectedFilesPendingEmit ??= new ts.Map()).set(affectedSourceFile.resolvedPath, pendingKind);
            else state.affectedFilesPendingEmit?.delete(affectedSourceFile.resolvedPath);
        }
        else {
            // In program clear our changed files since any emit handles all changes
            state.changedFilesSet.clear();
        }
        return { result, affected };
    }

    function getWriteFileCallback(writeFile: ts.WriteFileCallback | undefined, customTransformers: ts.CustomTransformers | undefined): ts.WriteFileCallback | undefined {
        if (!ts.getEmitDeclarations(state.compilerOptions)) return writeFile || ts.maybeBind(host, host.writeFile);
        return (fileName, text, writeByteOrderMark, onError, sourceFiles, data) => {
            if (ts.isDeclarationFileName(fileName)) {
                if (!ts.outFile(state.compilerOptions)) {
                    ts.Debug.assert(sourceFiles?.length === 1);
                    let emitSignature;
                    if (!customTransformers) {
                        const file = sourceFiles[0];
                        const info = state.fileInfos.get(file.resolvedPath)!;
                        if (info.signature === file.version) {
                            const signature = computeSignatureWithDiagnostics(
                                file,
                                text,
                                computeHash,
                                getCanonicalFileName,
                                data,
                            );
                            // With d.ts diagnostics they are also part of the signature so emitSignature will be different from it since its just hash of d.ts
                            if (!data?.diagnostics?.length) emitSignature = signature;
                            if (signature !== file.version) { // Update it
                                if (host.storeFilesChangingSignatureDuringEmit) (state.filesChangingSignature ??= new ts.Set()).add(file.resolvedPath);
                                if (state.exportedModulesMap) ts.BuilderState.updateExportedModules(state, file, file.exportedModulesFromDeclarationEmit);
                                if (state.affectedFiles) {
                                    // Keep old signature so we know what to undo if cancellation happens
                                    const existing = state.oldSignatures?.get(file.resolvedPath);
                                    if (existing === undefined) (state.oldSignatures ??= new ts.Map()).set(file.resolvedPath, info.signature || false);
                                    info.signature = signature;
                                }
                                else {
                                    // These are directly commited
                                    info.signature = signature;
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
                        emitSignature = handleNewSignature(state.emitSignatures?.get(filePath), emitSignature);
                        if (!emitSignature) return;
                        (state.emitSignatures ??= new ts.Map()).set(filePath, emitSignature);
                    }
                }
                else if (state.compilerOptions.composite) {
                    const newSignature = handleNewSignature(state.outSignature, /*newSignature*/ undefined);
                    if (!newSignature) return;
                    state.outSignature = newSignature;
                }
            }
            if (writeFile) writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
            else if (host.writeFile) host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
            else state.program!.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);

            /**
             * Compare to existing computed signature and store it or handle the changes in d.ts map option from before
             * returning undefined means that, we dont need to emit this d.ts file since its contents didnt change
             */
            function handleNewSignature(oldSignatureFormat: EmitSignature | undefined, newSignature: string | undefined) {
                const oldSignature = !oldSignatureFormat || ts.isString(oldSignatureFormat) ? oldSignatureFormat : oldSignatureFormat[0];
                newSignature ??= computeSignature(text, computeHash, data);
                // Dont write dts files if they didn't change
                if (newSignature === oldSignature) {
                    // If the signature was encoded as string the dts map options match so nothing to do
                    if (oldSignatureFormat === oldSignature) return undefined;
                    // Mark as differsOnlyInMap so that --build can reverse the timestamp so that
                    // the downstream projects dont detect this as change in d.ts file
                    else if (data) data.differsOnlyInMap = true;
                    else data = { differsOnlyInMap: true };
                }
                else {
                    state.hasChangedEmitSignature = true;
                    state.latestChangedDtsFile = fileName;
                }
                return newSignature;
            }
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
    function emit(targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): ts.EmitResult {
        if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
            assertSourceFileOkWithoutNextAffectedCall(state, targetSourceFile);
        }
        const result = ts.handleNoEmitOptions(builderProgram, targetSourceFile, writeFile, cancellationToken);
        if (result) return result;

        // Emit only affected files if using builder for emit
        if (!targetSourceFile) {
            if (kind === BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram) {
                // Emit and report any errors we ran into.
                let sourceMaps: ts.SourceMapEmitResult[] = [];
                let emitSkipped = false;
                let diagnostics: ts.Diagnostic[] | undefined;
                let emittedFiles: string[] = [];

                let affectedEmitResult: ts.AffectedFileResult<ts.EmitResult>;
                while (affectedEmitResult = emitNextAffectedFile(writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers)) {
                    emitSkipped = emitSkipped || affectedEmitResult.result.emitSkipped;
                    diagnostics = ts.addRange(diagnostics, affectedEmitResult.result.diagnostics);
                    emittedFiles = ts.addRange(emittedFiles, affectedEmitResult.result.emittedFiles);
                    sourceMaps = ts.addRange(sourceMaps, affectedEmitResult.result.sourceMaps);
                }
                return {
                    emitSkipped,
                    diagnostics: diagnostics || ts.emptyArray,
                    emittedFiles,
                    sourceMaps
                };
            }
            // In non Emit builder, clear affected files pending emit
            else {
                clearAffectedFilesPendingEmit(state, emitOnlyDtsFiles);
            }
        }
        return ts.Debug.checkDefined(state.program).emit(
            targetSourceFile,
            getWriteFileCallback(writeFile, customTransformers),
            cancellationToken,
            emitOnlyDtsFiles,
            customTransformers
        );
    }

    /**
     * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
     * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
     */
    function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: ts.CancellationToken, ignoreSourceFile?: (sourceFile: ts.SourceFile) => boolean): ts.AffectedFileResult<readonly ts.Diagnostic[]> {
        while (true) {
            const affected = getNextAffectedFile(state, cancellationToken, computeHash, getCanonicalFileName, host);
            let result;
            if (!affected) return undefined; // Done
            else if (affected !== state.program) {
                // Get diagnostics for the affected file if its not ignored
                const affectedSourceFile = affected as ts.SourceFile;
                if (!ignoreSourceFile || !ignoreSourceFile(affectedSourceFile)) {
                    result = getSemanticDiagnosticsOfFile(state, affectedSourceFile, cancellationToken);
                }
                state.seenAffectedFiles!.add(affectedSourceFile.resolvedPath);
                state.affectedFilesIndex!++;
                // Change in changeSet, buildInfo needs to be emitted
                state.buildInfoEmitPending = true;
                if (!result) continue;
            }
            else {
                // When whole program is affected, get all semantic diagnostics (eg when --out or --outFile is specified)
                result = state.program.getSemanticDiagnostics(/*targetSourceFile*/ undefined, cancellationToken);
                state.changedFilesSet.clear();
                state.programEmitPending = getBuilderFileEmit(state.compilerOptions);
            }
            return { result, affected };
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
    function getSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
        assertSourceFileOkWithoutNextAffectedCall(state, sourceFile);
        const compilerOptions = ts.Debug.checkDefined(state.program).getCompilerOptions();
        if (ts.outFile(compilerOptions)) {
            ts.Debug.assert(!state.semanticDiagnosticsPerFile);
            // We dont need to cache the diagnostics just return them from program
            return ts.Debug.checkDefined(state.program).getSemanticDiagnostics(sourceFile, cancellationToken);
        }

        if (sourceFile) {
            return getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken);
        }

        // When semantic builder asks for diagnostics of the whole program,
        // ensure that all the affected files are handled
        // eslint-disable-next-line no-empty
        while (getSemanticDiagnosticsOfNextAffectedFile(cancellationToken)) {
        }

        let diagnostics: ts.Diagnostic[] | undefined;
        for (const sourceFile of ts.Debug.checkDefined(state.program).getSourceFiles()) {
            diagnostics = ts.addRange(diagnostics, getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken));
        }
        return diagnostics || ts.emptyArray;
    }
}

function addToAffectedFilesPendingEmit(state: BuilderProgramState, affectedFilePendingEmit: ts.Path, kind: BuilderFileEmit) {
    const existingKind = state.affectedFilesPendingEmit?.get(affectedFilePendingEmit) || BuilderFileEmit.None;
    (state.affectedFilesPendingEmit ??= new ts.Map()).set(affectedFilePendingEmit, existingKind | kind);
}

/** @internal */
export function toBuilderStateFileInfoForMultiEmit(fileInfo: ProgramMultiFileEmitBuildInfoFileInfo): ts.BuilderState.FileInfo {
    return ts.isString(fileInfo) ?
        { version: fileInfo, signature: fileInfo, affectsGlobalScope: undefined, impliedFormat: undefined } :
        ts.isString(fileInfo.signature) ?
            fileInfo as ts.BuilderState.FileInfo :
            { version: fileInfo.version, signature: fileInfo.signature === false ? undefined : fileInfo.version, affectsGlobalScope: fileInfo.affectsGlobalScope, impliedFormat: fileInfo.impliedFormat };
}

/** @internal */
export function toBuilderFileEmit(value: ProgramBuilderInfoFilePendingEmit, fullEmitForOptions: BuilderFileEmit): BuilderFileEmit{
    return ts.isNumber(value) ? fullEmitForOptions : value[1] || BuilderFileEmit.Dts;
}

/** @internal */
export function toProgramEmitPending(value: ProgramBuildInfoBundlePendingEmit, options: ts.CompilerOptions | undefined): BuilderFileEmit | undefined {
    return !value ? getBuilderFileEmit(options || {}) : value;
}

/** @internal */
export function createBuilderProgramUsingProgramBuildInfo(buildInfo: ts.BuildInfo, buildInfoPath: string, host: ts.ReadBuildProgramHost): ts.EmitAndSemanticDiagnosticsBuilderProgram {
    const program = buildInfo.program!;
    const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());

    let state: ReusableBuilderProgramState;
    const filePaths = program.fileNames?.map(toPath);
    let filePathsSetList: ts.Set<ts.Path>[] | undefined;
    const latestChangedDtsFile = program.latestChangedDtsFile ? toAbsolutePath(program.latestChangedDtsFile) : undefined;
    if (isProgramBundleEmitBuildInfo(program)) {
        const fileInfos = new ts.Map<ts.Path, ts.BuilderState.FileInfo>();
        program.fileInfos.forEach((fileInfo, index) => {
            const path = toFilePath(index + 1 as ProgramBuildInfoFileId);
            fileInfos.set(path, ts.isString(fileInfo) ? { version: fileInfo, signature: undefined, affectsGlobalScope: undefined, impliedFormat: undefined } : fileInfo);
        });
        state = {
            fileInfos,
            compilerOptions: program.options ? ts.convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
            latestChangedDtsFile,
            outSignature: program.outSignature,
            programEmitPending: program.pendingEmit === undefined ? undefined : toProgramEmitPending(program.pendingEmit, program.options),
            bundle: buildInfo.bundle,
        };
    }
    else {
        filePathsSetList = program.fileIdsList?.map(fileIds => new ts.Set(fileIds.map(toFilePath)));
        const fileInfos = new ts.Map<ts.Path, ts.BuilderState.FileInfo>();
        const emitSignatures = program.options?.composite && !ts.outFile(program.options) ? new ts.Map<ts.Path, EmitSignature>() : undefined;
        program.fileInfos.forEach((fileInfo, index) => {
            const path = toFilePath(index + 1 as ProgramBuildInfoFileId);
            const stateFileInfo = toBuilderStateFileInfoForMultiEmit(fileInfo);
            fileInfos.set(path, stateFileInfo);
            if (emitSignatures && stateFileInfo.signature) emitSignatures.set(path, stateFileInfo.signature);
        });
        program.emitSignatures?.forEach(value => {
            if (ts.isNumber(value)) emitSignatures!.delete(toFilePath(value));
            else {
                const key = toFilePath(value[0]);
                emitSignatures!.set(key, !ts.isString(value[1]) && !value[1].length ?
                    // File signature is emit signature but differs in map
                    [emitSignatures!.get(key)! as string] :
                    value[1]
                );
            }
        });
        const fullEmitForOptions = program.affectedFilesPendingEmit ? getBuilderFileEmit(program.options || {}) : undefined;
        state = {
            fileInfos,
            compilerOptions: program.options ? ts.convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
            referencedMap: toManyToManyPathMap(program.referencedMap),
            exportedModulesMap: toManyToManyPathMap(program.exportedModulesMap),
            semanticDiagnosticsPerFile: program.semanticDiagnosticsPerFile && ts.arrayToMap(program.semanticDiagnosticsPerFile, value => toFilePath(ts.isNumber(value) ? value : value[0]), value => ts.isNumber(value) ? ts.emptyArray : value[1]),
            hasReusableDiagnostic: true,
            affectedFilesPendingEmit: program.affectedFilesPendingEmit && ts.arrayToMap(program.affectedFilesPendingEmit, value => toFilePath(ts.isNumber(value) ? value : value[0]), value => toBuilderFileEmit(value, fullEmitForOptions!)),
            changedFilesSet: new ts.Set(ts.map(program.changeFileSet, toFilePath)),
            latestChangedDtsFile,
            emitSignatures: emitSignatures?.size ? emitSignatures : undefined,
        };
    }

    return {
        getState: () => state,
        saveEmitState: ts.noop as ts.BuilderProgram["saveEmitState"],
        restoreEmitState: ts.noop,
        getProgram: ts.notImplemented,
        getProgramOrUndefined: ts.returnUndefined,
        releaseProgram: ts.noop,
        getCompilerOptions: () => state.compilerOptions,
        getSourceFile: ts.notImplemented,
        getSourceFiles: ts.notImplemented,
        getOptionsDiagnostics: ts.notImplemented,
        getGlobalDiagnostics: ts.notImplemented,
        getConfigFileParsingDiagnostics: ts.notImplemented,
        getSyntacticDiagnostics: ts.notImplemented,
        getDeclarationDiagnostics: ts.notImplemented,
        getSemanticDiagnostics: ts.notImplemented,
        emit: ts.notImplemented,
        getAllDependencies: ts.notImplemented,
        getCurrentDirectory: ts.notImplemented,
        emitNextAffectedFile: ts.notImplemented,
        getSemanticDiagnosticsOfNextAffectedFile: ts.notImplemented,
        emitBuildInfo: ts.notImplemented,
        close: ts.noop,
        hasChangedEmitSignature: ts.returnFalse,
    };

    function toPath(path: string) {
        return ts.toPath(path, buildInfoDirectory, getCanonicalFileName);
    }

    function toAbsolutePath(path: string) {
        return ts.getNormalizedAbsolutePath(path, buildInfoDirectory);
    }

    function toFilePath(fileId: ProgramBuildInfoFileId) {
        return filePaths[fileId - 1];
    }

    function toFilePathsSet(fileIdsListId: ProgramBuildInfoFileIdListId) {
        return filePathsSetList![fileIdsListId - 1];
    }

    function toManyToManyPathMap(referenceMap: ProgramBuildInfoReferencedMap | undefined): ts.BuilderState.ManyToManyPathMap | undefined {
        if (!referenceMap) {
            return undefined;
        }

        const map = ts.BuilderState.createManyToManyPathMap();
        referenceMap.forEach(([fileId, fileIdListId]) =>
            map.set(toFilePath(fileId), toFilePathsSet(fileIdListId))
        );
        return map;
    }
}

/** @internal */
export function getBuildInfoFileVersionMap(
    program: ProgramBuildInfo,
    buildInfoPath: string,
    host: Pick<ts.ReadBuildProgramHost, "useCaseSensitiveFileNames" | "getCurrentDirectory">
): ts.ESMap<ts.Path, string> {
    const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    const fileInfos = new ts.Map<ts.Path, string>();
    program.fileInfos.forEach((fileInfo, index) => {
        const path = ts.toPath(program.fileNames[index], buildInfoDirectory, getCanonicalFileName);
        const version = ts.isString(fileInfo) ? fileInfo : fileInfo.version;
        fileInfos.set(path, version);
    });
    return fileInfos;
}

/** @internal */
export function createRedirectedBuilderProgram(getState: () => { program?: ts.Program | undefined; compilerOptions: ts.CompilerOptions; }, configFileParsingDiagnostics: readonly ts.Diagnostic[]): ts.BuilderProgram {
    return {
        getState: ts.notImplemented,
        saveEmitState: ts.noop as ts.BuilderProgram["saveEmitState"],
        restoreEmitState: ts.noop,
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
        getAllDependencies: ts.notImplemented,
        getCurrentDirectory: () => getProgram().getCurrentDirectory(),
        close: ts.noop,
    };

    function getProgram() {
        return ts.Debug.checkDefined(getState().program);
    }
}

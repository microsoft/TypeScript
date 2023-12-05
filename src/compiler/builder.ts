import {
    addRange,
    AffectedFileResult,
    arrayFrom,
    arrayToMap,
    BuilderProgram,
    BuilderProgramHost,
    BuilderState,
    BuildInfo,
    BundleBuildInfo,
    CancellationToken,
    CommandLineOption,
    compareStringsCaseSensitive,
    compareValues,
    CompilerHost,
    CompilerOptions,
    compilerOptionsAffectDeclarationPath,
    compilerOptionsAffectEmit,
    compilerOptionsAffectSemanticDiagnostics,
    CompilerOptionsValue,
    concatenate,
    convertToOptionsWithAbsolutePaths,
    createBuildInfo,
    createGetCanonicalFileName,
    createModuleNotFoundChain,
    createProgram,
    CustomTransformers,
    Debug,
    Diagnostic,
    DiagnosticCategory,
    DiagnosticMessageChain,
    DiagnosticRelatedInformation,
    DiagnosticWithLocation,
    EmitAndSemanticDiagnosticsBuilderProgram,
    EmitOnly,
    EmitResult,
    emitSkippedWithNoDiagnostics,
    emptyArray,
    ensurePathIsNonModuleName,
    FileIncludeKind,
    filterSemanticDiagnostics,
    forEach,
    forEachEntry,
    forEachKey,
    generateDjb2Hash,
    getDirectoryPath,
    getEmitDeclarations,
    getIsolatedModules,
    getNormalizedAbsolutePath,
    getOptionsNameMap,
    getOwnKeys,
    getRelativePathFromDirectory,
    getTsBuildInfoEmitOutputFilePath,
    handleNoEmitOptions,
    HostForComputeHash,
    isArray,
    isDeclarationFileName,
    isJsonSourceFile,
    isNumber,
    isString,
    map,
    mapDefined,
    maybeBind,
    noop,
    notImplemented,
    outFile,
    Path,
    Program,
    ProjectReference,
    ReadBuildProgramHost,
    ReadonlyCollection,
    RepopulateDiagnosticChainInfo,
    RepopulateModuleNotFoundDiagnosticChain,
    returnFalse,
    returnUndefined,
    sameMap,
    SemanticDiagnosticsBuilderProgram,
    skipTypeChecking,
    some,
    SourceFile,
    sourceFileMayBeEmitted,
    SourceMapEmitResult,
    toPath,
    tryAddToSet,
    WriteFileCallback,
    WriteFileCallbackData,
} from "./_namespaces/ts";

/** @internal */
export interface ReusableDiagnostic extends ReusableDiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};
    reportDeprecated?: {};
    source?: string;
    relatedInformation?: ReusableDiagnosticRelatedInformation[];
    skippedOn?: keyof CompilerOptions;
}

/** @internal */
export interface ReusableDiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: string | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | ReusableDiagnosticMessageChain;
}

/** @internal */
export interface ReusableRepopulateModuleNotFoundChain {
    info: RepopulateModuleNotFoundDiagnosticChain;
    next?: ReusableDiagnosticMessageChain[];
}

/** @internal */
export type SerializedDiagnosticMessageChain = Omit<DiagnosticMessageChain, "next" | "repopulateInfo"> & {
    next?: ReusableDiagnosticMessageChain[];
};

/** @internal */
export type ReusableDiagnosticMessageChain = SerializedDiagnosticMessageChain | ReusableRepopulateModuleNotFoundChain;

/**
 * Signature (Hash of d.ts emitted), is string if it was emitted using same d.ts.map option as what compilerOptions indicate, otherwise tuple of string
 *
 * @internal
 */
export type EmitSignature = string | [signature: string];

/** @internal */
export interface ReusableBuilderProgramState extends BuilderState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile?: Map<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
    /** Cache of dts emit diagnostics for files with their Path being the key */
    emitDiagnosticsPerFile?: Map<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
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
    affectedFilesPendingEmit?: ReadonlyMap<Path, BuilderFileEmit>;
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
    emitSignatures?: Map<Path, EmitSignature>;
    /**
     * Hash of d.ts emit with --out
     */
    outSignature?: EmitSignature;
    /**
     * Name of the file whose dts was the latest to change
     */
    latestChangedDtsFile: string | undefined;
    /**
     * @deprecated
     * Bundle information either from oldState or current one so it can be used to complete the information in buildInfo when emitting only js or dts files
     */
    bundle?: BundleBuildInfo;
}

// dprint-ignore
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

/**
 * State to store the changed files, affected files and cache semantic diagnostics
 *
 * @internal
 */
// TODO: GH#18217 Properties of this interface are frequently asserted to be defined.
export interface BuilderProgramState extends BuilderState, ReusableBuilderProgramState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile: Map<Path, readonly Diagnostic[]> | undefined;
    /** Cache of dts emit diagnostics for files with their Path being the key */
    emitDiagnosticsPerFile?: Map<Path, readonly Diagnostic[]> | undefined;
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
    affectedFilesPendingEmit?: Map<Path, BuilderFileEmit>;
    /**
     * true if build info is emitted
     */
    buildInfoEmitPending: boolean;
    /**
     * Already seen emitted files
     */
    seenEmittedFiles: Map<Path, BuilderFileEmit> | undefined;
    /** Stores list of files that change signature during emit - test only */
    filesChangingSignature?: Set<Path>;
}

/** @internal */
export type SavedBuildProgramEmitState =
    & Pick<
        BuilderProgramState,
        | "affectedFilesPendingEmit"
        | "seenEmittedFiles"
        | "programEmitPending"
        | "emitSignatures"
        | "outSignature"
        | "latestChangedDtsFile"
        | "hasChangedEmitSignature"
        | "buildInfoEmitPending"
        | "emitDiagnosticsPerFile"
    >
    & { changedFilesSet: BuilderProgramState["changedFilesSet"] | undefined; };

/**
 * Get flags determining what all needs to be emitted
 *
 * @internal
 */
export function getBuilderFileEmit(options: CompilerOptions) {
    let result = BuilderFileEmit.Js;
    if (options.sourceMap) result = result | BuilderFileEmit.JsMap;
    if (options.inlineSourceMap) result = result | BuilderFileEmit.JsInlineMap;
    if (getEmitDeclarations(options)) result = result | BuilderFileEmit.Dts;
    if (options.declarationMap) result = result | BuilderFileEmit.DtsMap;
    if (options.emitDeclarationOnly) result = result & BuilderFileEmit.AllDts;
    return result;
}

/**
 * Determining what all is pending to be emitted based on previous options or previous file emit flags
 *
 * @internal
 */
export function getPendingEmitKind(optionsOrEmitKind: CompilerOptions | BuilderFileEmit, oldOptionsOrEmitKind: CompilerOptions | BuilderFileEmit | undefined): BuilderFileEmit {
    const oldEmitKind = oldOptionsOrEmitKind && (isNumber(oldOptionsOrEmitKind) ? oldOptionsOrEmitKind : getBuilderFileEmit(oldOptionsOrEmitKind));
    const emitKind = isNumber(optionsOrEmitKind) ? optionsOrEmitKind : getBuilderFileEmit(optionsOrEmitKind);
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

function hasSameKeys(map1: ReadonlyCollection<string> | undefined, map2: ReadonlyCollection<string> | undefined): boolean {
    // Has same size and every key is present in both maps
    return map1 === map2 || map1 !== undefined && map2 !== undefined && map1.size === map2.size && !forEachKey(map1, key => !map2.has(key));
}

/**
 * Create the state so that we can iterate on changedFiles/affected files
 */
function createBuilderProgramState(newProgram: Program, oldState: Readonly<ReusableBuilderProgramState> | undefined): BuilderProgramState {
    const state = BuilderState.create(newProgram, oldState, /*disableUseFileVersionAsSignature*/ false) as BuilderProgramState;
    state.program = newProgram;
    const compilerOptions = newProgram.getCompilerOptions();
    state.compilerOptions = compilerOptions;
    const outFilePath = outFile(compilerOptions);
    // With --out or --outFile, any change affects all semantic diagnostics so no need to cache them
    if (!outFilePath) {
        state.semanticDiagnosticsPerFile = new Map();
    }
    else if (compilerOptions.composite && oldState?.outSignature && outFilePath === outFile(oldState?.compilerOptions)) {
        state.outSignature = oldState.outSignature && getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldState.outSignature);
    }
    state.changedFilesSet = new Set();
    state.latestChangedDtsFile = compilerOptions.composite ? oldState?.latestChangedDtsFile : undefined;

    const useOldState = BuilderState.canReuseOldState(state.referencedMap, oldState);
    const oldCompilerOptions = useOldState ? oldState!.compilerOptions : undefined;
    const canCopySemanticDiagnostics = useOldState && oldState!.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile &&
        !compilerOptionsAffectSemanticDiagnostics(compilerOptions, oldCompilerOptions!);
    // We can only reuse emit signatures (i.e. .d.ts signatures) if the .d.ts file is unchanged,
    // which will eg be depedent on change in options like declarationDir and outDir options are unchanged.
    // We need to look in oldState.compilerOptions, rather than oldCompilerOptions (i.e.we need to disregard useOldState) because
    // oldCompilerOptions can be undefined if there was change in say module from None to some other option
    // which would make useOldState as false since we can now use reference maps that are needed to track what to emit, what to check etc
    // but that option change does not affect d.ts file name so emitSignatures should still be reused.
    const canCopyEmitSignatures = compilerOptions.composite &&
        oldState?.emitSignatures &&
        !outFilePath &&
        !compilerOptionsAffectDeclarationPath(compilerOptions, oldState.compilerOptions);
    if (useOldState) {
        // Copy old state's changed files set
        oldState!.changedFilesSet?.forEach(value => state.changedFilesSet.add(value));
        if (!outFilePath && oldState!.affectedFilesPendingEmit?.size) {
            state.affectedFilesPendingEmit = new Map(oldState!.affectedFilesPendingEmit);
            state.seenAffectedFiles = new Set();
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
        let oldInfo: Readonly<BuilderState.FileInfo> | undefined;
        let newReferences: ReadonlySet<Path> | undefined;

        // if not using old state, every file is changed
        if (
            !useOldState ||
            // File wasn't present in old state
            !(oldInfo = oldState!.fileInfos.get(sourceFilePath)) ||
            // versions dont match
            oldInfo.version !== info.version ||
            // Implied formats dont match
            oldInfo.impliedFormat !== info.impliedFormat ||
            // Referenced files changed
            !hasSameKeys(newReferences = referencedMap && referencedMap.getValues(sourceFilePath), oldReferencedMap && oldReferencedMap.getValues(sourceFilePath)) ||
            // Referenced file was deleted in the new program
            newReferences && forEachKey(newReferences, path => !state.fileInfos.has(path) && oldState!.fileInfos.has(path))
        ) {
            // Register file as changed file and do not copy semantic diagnostics, since all changed files need to be re-evaluated
            addFileToChangeSet(state, sourceFilePath);
        }
        else {
            const sourceFile = newProgram.getSourceFileByPath(sourceFilePath)!;
            const emitDiagnostics = oldState!.emitDiagnosticsPerFile?.get(sourceFilePath);
            if (emitDiagnostics) {
                (state.emitDiagnosticsPerFile ??= new Map()).set(
                    sourceFilePath,
                    oldState!.hasReusableDiagnostic ?
                        convertToDiagnostics(emitDiagnostics as readonly ReusableDiagnostic[], newProgram) :
                        repopulateDiagnostics(emitDiagnostics as readonly Diagnostic[], newProgram),
                );
            }

            if (canCopySemanticDiagnostics) {
                if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics) return;
                if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics) return;

                // Unchanged file copy diagnostics
                const diagnostics = oldState!.semanticDiagnosticsPerFile!.get(sourceFilePath);
                if (diagnostics) {
                    state.semanticDiagnosticsPerFile!.set(
                        sourceFilePath,
                        oldState!.hasReusableDiagnostic ?
                            convertToDiagnostics(diagnostics as readonly ReusableDiagnostic[], newProgram) :
                            repopulateDiagnostics(diagnostics as readonly Diagnostic[], newProgram),
                    );
                    (state.semanticDiagnosticsFromOldState ??= new Set()).add(sourceFilePath);
                }
            }
        }
        if (canCopyEmitSignatures) {
            const oldEmitSignature = oldState.emitSignatures.get(sourceFilePath);
            if (oldEmitSignature) {
                (state.emitSignatures ??= new Map()).set(sourceFilePath, getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldEmitSignature));
            }
        }
    });

    // If the global file is removed, add all files as changed
    if (
        useOldState && forEachEntry(oldState!.fileInfos, (info, sourceFilePath) => {
            if (state.fileInfos.has(sourceFilePath)) return false;
            if (outFilePath || info.affectsGlobalScope) return true;
            // if file is deleted we need to write buildInfo again
            state.buildInfoEmitPending = true;
            return false;
        })
    ) {
        BuilderState.getAllFilesExcludingDefaultLibraryFile(state, newProgram, /*firstSourceFile*/ undefined)
            .forEach(file => addFileToChangeSet(state, file.resolvedPath));
    }
    else if (oldCompilerOptions) {
        // If options affect emit, then we need to do complete emit per compiler options
        // otherwise only the js or dts that needs to emitted because its different from previously emitted options
        const pendingEmitKind = compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions) ?
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
                            pendingEmitKind,
                        );
                    }
                });
                Debug.assert(!state.seenAffectedFiles || !state.seenAffectedFiles.size);
                state.seenAffectedFiles = state.seenAffectedFiles || new Set();
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
        if (some(newProgram.getProjectReferences(), ref => !!ref.prepend)) state.programEmitPending = getBuilderFileEmit(compilerOptions);
    }
    return state;
}

function addFileToChangeSet(state: BuilderProgramState, path: Path) {
    state.changedFilesSet.add(path);
    state.buildInfoEmitPending = true;
    // Setting this to undefined as changed files means full emit so no need to track emit explicitly
    state.programEmitPending = undefined;
}

/**
 * Covert to Emit signature based on oldOptions and EmitSignature format
 * If d.ts map options differ then swap the format, otherwise use as is
 */
function getEmitSignatureFromOldSignature(options: CompilerOptions, oldOptions: CompilerOptions, oldEmitSignature: EmitSignature): EmitSignature {
    return !!options.declarationMap === !!oldOptions.declarationMap ?
        // Use same format of signature
        oldEmitSignature :
        // Convert to different format
        isString(oldEmitSignature) ? [oldEmitSignature] : oldEmitSignature[0];
}

function repopulateDiagnostics(diagnostics: readonly Diagnostic[], newProgram: Program): readonly Diagnostic[] {
    if (!diagnostics.length) return diagnostics;
    return sameMap(diagnostics, diag => {
        if (isString(diag.messageText)) return diag;
        const repopulatedChain = convertOrRepopulateDiagnosticMessageChain(diag.messageText, diag.file, newProgram, chain => chain.repopulateInfo?.());
        return repopulatedChain === diag.messageText ?
            diag :
            { ...diag, messageText: repopulatedChain };
    });
}

function convertOrRepopulateDiagnosticMessageChain<T extends DiagnosticMessageChain | ReusableDiagnosticMessageChain>(
    chain: T,
    sourceFile: SourceFile | undefined,
    newProgram: Program,
    repopulateInfo: (chain: T) => RepopulateDiagnosticChainInfo | undefined,
): DiagnosticMessageChain {
    const info = repopulateInfo(chain);
    if (info) {
        return {
            ...createModuleNotFoundChain(sourceFile!, newProgram, info.moduleReference, info.mode, info.packageName || info.moduleReference),
            next: convertOrRepopulateDiagnosticMessageChainArray(chain.next as T[], sourceFile, newProgram, repopulateInfo),
        };
    }
    const next = convertOrRepopulateDiagnosticMessageChainArray(chain.next as T[], sourceFile, newProgram, repopulateInfo);
    return next === chain.next ? chain as DiagnosticMessageChain : { ...chain as DiagnosticMessageChain, next };
}

function convertOrRepopulateDiagnosticMessageChainArray<T extends DiagnosticMessageChain | ReusableDiagnosticMessageChain>(
    array: T[] | undefined,
    sourceFile: SourceFile | undefined,
    newProgram: Program,
    repopulateInfo: (chain: T) => RepopulateDiagnosticChainInfo | undefined,
): DiagnosticMessageChain[] | undefined {
    return sameMap(array, chain => convertOrRepopulateDiagnosticMessageChain(chain, sourceFile, newProgram, repopulateInfo));
}

function convertToDiagnostics(diagnostics: readonly ReusableDiagnostic[], newProgram: Program): readonly Diagnostic[] {
    if (!diagnostics.length) return emptyArray;
    let buildInfoDirectory: string | undefined;
    return diagnostics.map(diagnostic => {
        const result: Diagnostic = convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPathInBuildInfoDirectory);
        result.reportsUnnecessary = diagnostic.reportsUnnecessary;
        result.reportsDeprecated = diagnostic.reportDeprecated;
        result.source = diagnostic.source;
        result.skippedOn = diagnostic.skippedOn;
        const { relatedInformation } = diagnostic;
        result.relatedInformation = relatedInformation ?
            relatedInformation.length ?
                relatedInformation.map(r => convertToDiagnosticRelatedInformation(r, newProgram, toPathInBuildInfoDirectory)) :
                [] :
            undefined;
        return result;
    });

    function toPathInBuildInfoDirectory(path: string) {
        buildInfoDirectory ??= getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(newProgram.getCompilerOptions())!, newProgram.getCurrentDirectory()));
        return toPath(path, buildInfoDirectory, newProgram.getCanonicalFileName);
    }
}

function convertToDiagnosticRelatedInformation(diagnostic: ReusableDiagnosticRelatedInformation, newProgram: Program, toPath: (path: string) => Path): DiagnosticRelatedInformation {
    const { file } = diagnostic;
    const sourceFile = file ? newProgram.getSourceFileByPath(toPath(file)) : undefined;
    return {
        ...diagnostic,
        file: sourceFile,
        messageText: isString(diagnostic.messageText) ?
            diagnostic.messageText :
            convertOrRepopulateDiagnosticMessageChain(diagnostic.messageText, sourceFile, newProgram, chain => (chain as ReusableRepopulateModuleNotFoundChain).info),
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
        affectedFilesPendingEmit: state.affectedFilesPendingEmit && new Map(state.affectedFilesPendingEmit),
        seenEmittedFiles: state.seenEmittedFiles && new Map(state.seenEmittedFiles),
        programEmitPending: state.programEmitPending,
        emitSignatures: state.emitSignatures && new Map(state.emitSignatures),
        outSignature: state.outSignature,
        latestChangedDtsFile: state.latestChangedDtsFile,
        hasChangedEmitSignature: state.hasChangedEmitSignature,
        changedFilesSet: outFilePath ? new Set(state.changedFilesSet) : undefined,
        buildInfoEmitPending: state.buildInfoEmitPending,
        emitDiagnosticsPerFile: state.emitDiagnosticsPerFile && new Map(state.emitDiagnosticsPerFile),
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
    state.buildInfoEmitPending = savedEmitState.buildInfoEmitPending;
    state.emitDiagnosticsPerFile = savedEmitState.emitDiagnosticsPerFile;
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
function getNextAffectedFile(
    state: BuilderProgramState,
    cancellationToken: CancellationToken | undefined,
    host: BuilderProgramHost,
): SourceFile | Program | undefined {
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
                        host,
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
        const program = Debug.checkDefined(state.program);
        const compilerOptions = program.getCompilerOptions();
        if (outFile(compilerOptions)) {
            Debug.assert(!state.semanticDiagnosticsPerFile);
            return program;
        }

        // Get next batch of affected files
        state.affectedFiles = BuilderState.getFilesAffectedByWithOldState(
            state,
            program,
            nextKey.value,
            cancellationToken,
            host,
        );
        state.currentChangedFilePath = nextKey.value;
        state.affectedFilesIndex = 0;
        if (!state.seenAffectedFiles) state.seenAffectedFiles = new Set();
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
    return forEachEntry(state.affectedFilesPendingEmit, (emitKind, path) => {
        const affectedFile = state.program!.getSourceFileByPath(path);
        if (!affectedFile || !sourceFileMayBeEmitted(affectedFile, state.program!)) {
            state.affectedFilesPendingEmit!.delete(path);
            return undefined;
        }
        const seenKind = state.seenEmittedFiles?.get(affectedFile.resolvedPath);
        let pendingKind = getPendingEmitKind(emitKind, seenKind);
        if (emitOnlyDtsFiles) pendingKind = pendingKind & BuilderFileEmit.AllDts;
        if (pendingKind) return { affectedFile, emitKind: pendingKind };
    });
}

function getNextPendingEmitDiagnosticsFile(state: BuilderProgramState) {
    if (!state.emitDiagnosticsPerFile?.size) return undefined;
    return forEachEntry(state.emitDiagnosticsPerFile, (diagnostics, path) => {
        const affectedFile = state.program!.getSourceFileByPath(path);
        if (!affectedFile || !sourceFileMayBeEmitted(affectedFile, state.program!)) {
            state.emitDiagnosticsPerFile!.delete(path);
            return undefined;
        }
        const seenKind = state.seenEmittedFiles?.get(affectedFile.resolvedPath) || BuilderFileEmit.None;
        if (!(seenKind & BuilderFileEmit.AllDts)) return { affectedFile, diagnostics, seenKind };
    });
}

function removeDiagnosticsOfLibraryFiles(state: BuilderProgramState) {
    if (!state.cleanedDiagnosticsOfLibFiles) {
        state.cleanedDiagnosticsOfLibFiles = true;
        const program = Debug.checkDefined(state.program);
        const options = program.getCompilerOptions();
        forEach(program.getSourceFiles(), f =>
            program.isSourceFileDefaultLibrary(f) &&
            !skipTypeChecking(f, options, program) &&
            removeSemanticDiagnosticsOf(state, f.resolvedPath));
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
            host,
        );
        return;
    }
    if (state.compilerOptions.assumeChangesOnlyAffectDirectDependencies) return;
    handleDtsMayChangeOfReferencingExportOfAffectedFile(
        state,
        affectedFile,
        cancellationToken,
        host,
    );
}

/**
 * Handle the dts may change, so they need to be added to pending emit if dts emit is enabled,
 * Also we need to make sure signature is updated for these files
 */
function handleDtsMayChangeOf(
    state: BuilderProgramState,
    path: Path,
    cancellationToken: CancellationToken | undefined,
    host: BuilderProgramHost,
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
                host,
                /*useFileVersionAsSignature*/ true,
            );
            // If not dts emit, nothing more to do
            if (getEmitDeclarations(state.compilerOptions)) {
                addToAffectedFilesPendingEmit(state, path, state.compilerOptions.declarationMap ? BuilderFileEmit.AllDts : BuilderFileEmit.Dts);
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
    host: BuilderProgramHost,
): boolean {
    if (!state.fileInfos.get(filePath)?.affectsGlobalScope) return false;
    // Every file needs to be handled
    BuilderState.getAllFilesExcludingDefaultLibraryFile(state, state.program!, /*firstSourceFile*/ undefined)
        .forEach(file =>
            handleDtsMayChangeOf(
                state,
                file.resolvedPath,
                cancellationToken,
                host,
            )
        );
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
    host: BuilderProgramHost,
) {
    // If there was change in signature (dts output) for the changed file,
    // then only we need to handle pending file emit
    if (!state.exportedModulesMap || !state.changedFilesSet.has(affectedFile.resolvedPath)) return;
    if (!isChangedSignature(state, affectedFile.resolvedPath)) return;

    // Since isolated modules dont change js files, files affected by change in signature is itself
    // But we need to cleanup semantic diagnostics and queue dts emit for affected files
    if (getIsolatedModules(state.compilerOptions)) {
        const seenFileNamesMap = new Map<Path, true>();
        seenFileNamesMap.set(affectedFile.resolvedPath, true);
        const queue = BuilderState.getReferencedByPaths(state, affectedFile.resolvedPath);
        while (queue.length > 0) {
            const currentPath = queue.pop()!;
            if (!seenFileNamesMap.has(currentPath)) {
                seenFileNamesMap.set(currentPath, true);
                if (handleDtsMayChangeOfGlobalScope(state, currentPath, cancellationToken, host)) return;
                handleDtsMayChangeOf(state, currentPath, cancellationToken, host);
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
        if (handleDtsMayChangeOfGlobalScope(state, exportedFromPath, cancellationToken, host)) return true;
        const references = state.referencedMap!.getKeys(exportedFromPath);
        return references && forEachKey(references, filePath =>
            handleDtsMayChangeOfFileAndExportsOfFile(
                state,
                filePath,
                seenFileAndExportsOfFile,
                cancellationToken,
                host,
            ));
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
    host: BuilderProgramHost,
): boolean | undefined {
    if (!tryAddToSet(seenFileAndExportsOfFile, filePath)) return undefined;

    if (handleDtsMayChangeOfGlobalScope(state, filePath, cancellationToken, host)) return true;
    handleDtsMayChangeOf(state, filePath, cancellationToken, host);

    // If exported modules has path, all files referencing file exported from are affected
    state.exportedModulesMap!.getKeys(filePath)?.forEach(exportedFromPath =>
        handleDtsMayChangeOfFileAndExportsOfFile(
            state,
            exportedFromPath,
            seenFileAndExportsOfFile,
            cancellationToken,
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
            host,
        )
    );
    return undefined;
}

/**
 * Gets semantic diagnostics for the file which are
 * bindAndCheckDiagnostics (from cache) and program diagnostics
 */
function getSemanticDiagnosticsOfFile(state: BuilderProgramState, sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
    return concatenate(
        getBinderAndCheckerDiagnosticsOfFile(state, sourceFile, cancellationToken),
        Debug.checkDefined(state.program).getProgramDiagnostics(sourceFile),
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

/** @internal */
export type ProgramBuildInfoFileId = number & { __programBuildInfoFileIdBrand: any; };
/** @internal */
export type ProgramBuildInfoFileIdListId = number & { __programBuildInfoFileIdListIdBrand: any; };
/** @internal */
export type ProgramBuildInfoDiagnostic = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, diagnostics: readonly ReusableDiagnostic[]];
/**
 * fileId if pending emit is same as what compilerOptions suggest
 * [fileId] if pending emit is only dts file emit
 * [fileId, emitKind] if any other type emit is pending
 *
 * @internal
 */
export type ProgramBuilderInfoFilePendingEmit = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId] | [fileId: ProgramBuildInfoFileId, emitKind: BuilderFileEmit];
/** @internal */
export type ProgramBuildInfoReferencedMap = [fileId: ProgramBuildInfoFileId, fileIdListId: ProgramBuildInfoFileIdListId][];
/** @internal */
export type ProgramMultiFileEmitBuildInfoBuilderStateFileInfo = Omit<BuilderState.FileInfo, "signature"> & {
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
 *
 * @internal
 */
export type ProgramBuildInfoEmitSignature = ProgramBuildInfoFileId | [fileId: ProgramBuildInfoFileId, signature: EmitSignature | []];
/**
 * ProgramMultiFileEmitBuildInfoFileInfo is string if FileInfo.version === FileInfo.signature && !FileInfo.affectsGlobalScope otherwise encoded FileInfo
 *
 * @internal
 */
export type ProgramMultiFileEmitBuildInfoFileInfo = string | ProgramMultiFileEmitBuildInfoBuilderStateFileInfo;
/** @internal */
export type ProgramBuildInfoRootStartEnd = [start: ProgramBuildInfoFileId, end: ProgramBuildInfoFileId];
/**
 * Either start and end of FileId for consecutive fileIds to be included as root or single fileId that is root
 * @internal
 */
export type ProgramBuildInfoRoot = ProgramBuildInfoRootStartEnd | ProgramBuildInfoFileId;
/** @internal */
export interface ProgramMultiFileEmitBuildInfo {
    fileNames: readonly string[];
    fileInfos: readonly ProgramMultiFileEmitBuildInfoFileInfo[];
    root: readonly ProgramBuildInfoRoot[];
    options: CompilerOptions | undefined;
    fileIdsList: readonly (readonly ProgramBuildInfoFileId[])[] | undefined;
    referencedMap: ProgramBuildInfoReferencedMap | undefined;
    exportedModulesMap: ProgramBuildInfoReferencedMap | undefined;
    semanticDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] | undefined;
    emitDiagnosticsPerFile: ProgramBuildInfoDiagnostic[] | undefined;
    affectedFilesPendingEmit: ProgramBuilderInfoFilePendingEmit[] | undefined;
    changeFileSet: readonly ProgramBuildInfoFileId[] | undefined;
    emitSignatures: readonly ProgramBuildInfoEmitSignature[] | undefined;
    // Because this is only output file in the program, we dont need fileId to deduplicate name
    latestChangedDtsFile?: string | undefined;
}
/**
 * ProgramBundleEmitBuildInfoFileInfo is string if !FileInfo.impliedFormat otherwise encoded FileInfo
 *
 * @internal
 */
export type ProgramBundleEmitBuildInfoFileInfo = string | BuilderState.FileInfo;
/**
 * false if it is the emit corresponding to compilerOptions
 * value otherwise
 *
 * @internal
 */
export type ProgramBuildInfoBundlePendingEmit = BuilderFileEmit | false;
/** @internal */
export interface ProgramBundleEmitBuildInfo {
    fileNames: readonly string[];
    fileInfos: readonly ProgramBundleEmitBuildInfoFileInfo[];
    root: readonly ProgramBuildInfoRoot[];
    options: CompilerOptions | undefined;
    outSignature: EmitSignature | undefined;
    latestChangedDtsFile: string | undefined;
    pendingEmit: ProgramBuildInfoBundlePendingEmit | undefined;
}

/** @internal */
export type ProgramBuildInfo = ProgramMultiFileEmitBuildInfo | ProgramBundleEmitBuildInfo;

/** @internal */
export function isProgramBundleEmitBuildInfo(info: ProgramBuildInfo): info is ProgramBundleEmitBuildInfo {
    return !!outFile(info.options || {});
}

/**
 * Gets the program information to be emitted in buildInfo so that we can use it to create new program
 */
function getBuildInfo(state: BuilderProgramState, bundle: BundleBuildInfo | undefined): BuildInfo {
    const currentDirectory = Debug.checkDefined(state.program).getCurrentDirectory();
    const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(state.compilerOptions)!, currentDirectory));
    // Convert the file name to Path here if we set the fileName instead to optimize multiple d.ts file emits and having to compute Canonical path
    const latestChangedDtsFile = state.latestChangedDtsFile ? relativeToBuildInfoEnsuringAbsolutePath(state.latestChangedDtsFile) : undefined;
    const fileNames: string[] = [];
    const fileNameToFileId = new Map<string, ProgramBuildInfoFileId>();
    const root: ProgramBuildInfoRoot[] = [];
    if (outFile(state.compilerOptions)) {
        // Copy all fileInfo, version and impliedFormat
        // Affects global scope and signature doesnt matter because with --out they arent calculated or needed to determine upto date ness
        const fileInfos = arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramBundleEmitBuildInfoFileInfo => {
            // Ensure fileId
            const fileId = toFileId(key);
            tryAddRoot(key, fileId);
            return value.impliedFormat ?
                { version: value.version, impliedFormat: value.impliedFormat, signature: undefined, affectsGlobalScope: undefined } :
                value.version;
        });
        const program: ProgramBundleEmitBuildInfo = {
            fileNames,
            fileInfos,
            root,
            options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
            outSignature: state.outSignature,
            latestChangedDtsFile,
            pendingEmit: !state.programEmitPending ?
                undefined : // Pending is undefined or None is encoded as undefined
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
            dts: dts || (getEmitDeclarations(state.compilerOptions) ? state.bundle?.dts : undefined),
        };
        return createBuildInfo(program, bundle);
    }

    let fileIdsList: (readonly ProgramBuildInfoFileId[])[] | undefined;
    let fileNamesToFileIdListId: Map<string, ProgramBuildInfoFileIdListId> | undefined;
    let emitSignatures: ProgramBuildInfoEmitSignature[] | undefined;
    const fileInfos = arrayFrom(state.fileInfos.entries(), ([key, value]): ProgramMultiFileEmitBuildInfoFileInfo => {
        // Ensure fileId
        const fileId = toFileId(key);
        tryAddRoot(key, fileId);
        Debug.assert(fileNames[fileId - 1] === relativeToBuildInfo(key));
        const oldSignature = state.oldSignatures?.get(key);
        const actualSignature = oldSignature !== undefined ? oldSignature || undefined : value.signature;
        if (state.compilerOptions.composite) {
            const file = state.program!.getSourceFileByPath(key)!;
            if (!isJsonSourceFile(file) && sourceFileMayBeEmitted(file, state.program!)) {
                const emitSignature = state.emitSignatures?.get(key);
                if (emitSignature !== actualSignature) {
                    (emitSignatures ||= []).push(
                        emitSignature === undefined ?
                            fileId : // There is no emit, encode as false
                            // fileId, signature: emptyArray if signature only differs in dtsMap option than our own compilerOptions otherwise EmitSignature
                            [fileId, !isString(emitSignature) && emitSignature[0] === actualSignature ? emptyArray as [] : emitSignature],
                    );
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
            toFileIdListId(state.referencedMap!.getValues(key)!),
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

    const semanticDiagnosticsPerFile = convertToProgramBuildInfoDiagnostics(state.semanticDiagnosticsPerFile);
    let affectedFilesPendingEmit: ProgramBuilderInfoFilePendingEmit[] | undefined;
    if (state.affectedFilesPendingEmit?.size) {
        const fullEmitForOptions = getBuilderFileEmit(state.compilerOptions);
        const seenFiles = new Set<Path>();
        for (const path of arrayFrom(state.affectedFilesPendingEmit.keys()).sort(compareStringsCaseSensitive)) {
            if (tryAddToSet(seenFiles, path)) {
                const file = state.program!.getSourceFileByPath(path);
                if (!file || !sourceFileMayBeEmitted(file, state.program!)) continue;
                const fileId = toFileId(path), pendingEmit = state.affectedFilesPendingEmit.get(path)!;
                (affectedFilesPendingEmit ||= []).push(
                    pendingEmit === fullEmitForOptions ?
                        fileId : // Pending full emit per options
                        pendingEmit === BuilderFileEmit.Dts ?
                        [fileId] : // Pending on Dts only
                        [fileId, pendingEmit], // Anything else
                );
            }
        }
    }

    let changeFileSet: ProgramBuildInfoFileId[] | undefined;
    if (state.changedFilesSet.size) {
        for (const path of arrayFrom(state.changedFilesSet.keys()).sort(compareStringsCaseSensitive)) {
            (changeFileSet ||= []).push(toFileId(path));
        }
    }
    const emitDiagnosticsPerFile = convertToProgramBuildInfoDiagnostics(state.emitDiagnosticsPerFile);
    const program: ProgramMultiFileEmitBuildInfo = {
        fileNames,
        fileInfos,
        root,
        options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
        fileIdsList,
        referencedMap,
        exportedModulesMap,
        semanticDiagnosticsPerFile,
        emitDiagnosticsPerFile,
        affectedFilesPendingEmit,
        changeFileSet,
        emitSignatures,
        latestChangedDtsFile,
    };
    return createBuildInfo(program, bundle);

    function relativeToBuildInfoEnsuringAbsolutePath(path: string) {
        return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
    }

    function relativeToBuildInfo(path: string) {
        return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, state.program!.getCanonicalFileName));
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

    function tryAddRoot(path: Path, fileId: ProgramBuildInfoFileId) {
        const file = state.program!.getSourceFile(path)!;
        if (!state.program!.getFileIncludeReasons().get(file.path)!.some(r => r.kind === FileIncludeKind.RootFile)) return;
        // First fileId as is
        if (!root.length) return root.push(fileId);
        const last = root[root.length - 1];
        const isLastStartEnd = isArray(last);
        // If its [..., last = [start, end = fileId - 1]], update last to [start, fileId]
        if (isLastStartEnd && last[1] === fileId - 1) return last[1] = fileId;
        // If its [..., last = [start, end !== fileId - 1]] or [last] or [..., last !== fileId - 1], push the fileId
        if (isLastStartEnd || root.length === 1 || last !== fileId - 1) return root.push(fileId);
        const lastButOne = root[root.length - 2];
        // If [..., lastButOne = [start, end], lastFileId] or [..., lastButOne !== lastFileId - 1, lastFileId], push the fileId
        if (!isNumber(lastButOne) || lastButOne !== last - 1) return root.push(fileId);
        // Convert lastButOne as [lastButOne, fileId]
        root[root.length - 2] = [lastButOne, fileId];
        return root.length = root.length - 1;
    }

    /**
     * @param optionKey key of CommandLineOption to use to determine if the option should be serialized in tsbuildinfo
     */
    function convertToProgramBuildInfoCompilerOptions(options: CompilerOptions) {
        let result: CompilerOptions | undefined;
        const { optionsNameMap } = getOptionsNameMap();
        for (const name of getOwnKeys(options).sort(compareStringsCaseSensitive)) {
            const optionInfo = optionsNameMap.get(name.toLowerCase());
            if (optionInfo?.affectsBuildInfo) {
                (result ||= {})[name] = convertToReusableCompilerOptionValue(
                    optionInfo,
                    options[name] as CompilerOptionsValue,
                );
            }
        }
        return result;
    }

    function convertToReusableCompilerOptionValue(option: CommandLineOption | undefined, value: CompilerOptionsValue) {
        if (option) {
            Debug.assert(option.type !== "listOrElement");
            if (option.type === "list") {
                const values = value as readonly string[];
                if (option.element.isFilePath && values.length) {
                    return values.map(relativeToBuildInfoEnsuringAbsolutePath);
                }
            }
            else if (option.isFilePath) {
                return relativeToBuildInfoEnsuringAbsolutePath(value as string);
            }
        }
        return value;
    }

    function convertToProgramBuildInfoDiagnostics(diagnostics: Map<Path, readonly Diagnostic[]> | undefined) {
        let result: ProgramBuildInfoDiagnostic[] | undefined;
        if (diagnostics) {
            for (const key of arrayFrom(diagnostics.keys()).sort(compareStringsCaseSensitive)) {
                const value = diagnostics.get(key)!;
                (result ||= []).push(
                    value.length ?
                        [
                            toFileId(key),
                            convertToReusableDiagnostics(value),
                        ] :
                        toFileId(key),
                );
            }
        }
        return result;
    }

    function convertToReusableDiagnostics(diagnostics: readonly Diagnostic[]): readonly ReusableDiagnostic[] {
        Debug.assert(!!diagnostics.length);
        return diagnostics.map(diagnostic => {
            const result: ReusableDiagnostic = convertToReusableDiagnosticRelatedInformation(diagnostic);
            result.reportsUnnecessary = diagnostic.reportsUnnecessary;
            result.reportDeprecated = diagnostic.reportsDeprecated;
            result.source = diagnostic.source;
            result.skippedOn = diagnostic.skippedOn;
            const { relatedInformation } = diagnostic;
            result.relatedInformation = relatedInformation ?
                relatedInformation.length ?
                    relatedInformation.map(r => convertToReusableDiagnosticRelatedInformation(r)) :
                    [] :
                undefined;
            return result;
        });
    }

    function convertToReusableDiagnosticRelatedInformation(diagnostic: DiagnosticRelatedInformation): ReusableDiagnosticRelatedInformation {
        const { file } = diagnostic;
        return {
            ...diagnostic,
            file: file ? relativeToBuildInfo(file.resolvedPath) : undefined,
            messageText: isString(diagnostic.messageText) ? diagnostic.messageText : convertToReusableDiagnosticMessageChain(diagnostic.messageText),
        };
    }

    function convertToReusableDiagnosticMessageChain(chain: DiagnosticMessageChain): ReusableDiagnosticMessageChain {
        if (chain.repopulateInfo) {
            return {
                info: chain.repopulateInfo(),
                next: convertToReusableDiagnosticMessageChainArray(chain.next),
            };
        }
        const next = convertToReusableDiagnosticMessageChainArray(chain.next);
        return next === chain.next ? chain : { ...chain, next };
    }

    function convertToReusableDiagnosticMessageChainArray(array: DiagnosticMessageChain[] | undefined): ReusableDiagnosticMessageChain[] | undefined {
        if (!array) return array;
        return forEach(array, (chain, index) => {
            const reusable = convertToReusableDiagnosticMessageChain(chain);
            if (chain === reusable) return undefined;
            const result: ReusableDiagnosticMessageChain[] = index > 0 ? array.slice(0, index - 1) : [];
            result.push(reusable);
            for (let i = index + 1; i < array.length; i++) {
                result.push(convertToReusableDiagnosticMessageChain(array[i]));
            }
            return result;
        }) || array;
    }
}

/** @internal */
export enum BuilderProgramKind {
    SemanticDiagnosticsBuilderProgram,
    EmitAndSemanticDiagnosticsBuilderProgram,
}

/** @internal */
export interface BuilderCreationParameters {
    newProgram: Program;
    host: BuilderProgramHost;
    oldProgram: BuilderProgram | undefined;
    configFileParsingDiagnostics: readonly Diagnostic[];
}

/** @internal */
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
            projectReferences,
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

function getTextHandlingSourceMapForSignature(text: string, data: WriteFileCallbackData | undefined) {
    return data?.sourceMapUrlPos !== undefined ? text.substring(0, data.sourceMapUrlPos) : text;
}

/** @internal */
export function computeSignatureWithDiagnostics(
    program: Program,
    sourceFile: SourceFile,
    text: string,
    host: HostForComputeHash,
    data: WriteFileCallbackData | undefined,
) {
    text = getTextHandlingSourceMapForSignature(text, data);
    let sourceFileDirectory: string | undefined;
    if (data?.diagnostics?.length) {
        text += data.diagnostics.map(diagnostic => `${locationInfo(diagnostic)}${DiagnosticCategory[diagnostic.category]}${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText)}`).join("\n");
    }
    return (host.createHash ?? generateDjb2Hash)(text);

    function flattenDiagnosticMessageText(diagnostic: string | DiagnosticMessageChain | undefined): string {
        return isString(diagnostic) ?
            diagnostic :
            diagnostic === undefined ?
            "" :
            !diagnostic.next ?
            diagnostic.messageText :
            diagnostic.messageText + diagnostic.next.map(flattenDiagnosticMessageText).join("\n");
    }

    function locationInfo(diagnostic: DiagnosticWithLocation) {
        if (diagnostic.file.resolvedPath === sourceFile.resolvedPath) return `(${diagnostic.start},${diagnostic.length})`;
        if (sourceFileDirectory === undefined) sourceFileDirectory = getDirectoryPath(sourceFile.resolvedPath);
        return `${
            ensurePathIsNonModuleName(getRelativePathFromDirectory(
                sourceFileDirectory,
                diagnostic.file.resolvedPath,
                program.getCanonicalFileName,
            ))
        }(${diagnostic.start},${diagnostic.length})`;
    }
}

/** @internal */
export function computeSignature(text: string, host: HostForComputeHash, data?: WriteFileCallbackData) {
    return (host.createHash ?? generateDjb2Hash)(getTextHandlingSourceMapForSignature(text, data));
}

/** @internal */
export function createBuilderProgram(kind: BuilderProgramKind.SemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): SemanticDiagnosticsBuilderProgram;
/** @internal */
export function createBuilderProgram(kind: BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): EmitAndSemanticDiagnosticsBuilderProgram;
/** @internal */
export function createBuilderProgram(kind: BuilderProgramKind, { newProgram, host, oldProgram, configFileParsingDiagnostics }: BuilderCreationParameters) {
    // Return same program if underlying program doesnt change
    let oldState = oldProgram && oldProgram.getState();
    if (oldState && newProgram === oldState.program && configFileParsingDiagnostics === newProgram.getConfigFileParsingDiagnostics()) {
        newProgram = undefined!; // TODO: GH#18217
        oldState = undefined;
        return oldProgram;
    }

    const state = createBuilderProgramState(newProgram, oldState);
    newProgram.getBuildInfo = bundle => getBuildInfo(state, bundle);

    // To ensure that we arent storing any references to old program or new program without state
    newProgram = undefined!; // TODO: GH#18217
    oldProgram = undefined;
    oldState = undefined;

    const getState = () => state;
    const builderProgram = createRedirectedBuilderProgram(getState, configFileParsingDiagnostics);
    builderProgram.getState = getState;
    builderProgram.saveEmitState = () => backupBuilderProgramEmitState(state);
    builderProgram.restoreEmitState = saved => restoreBuilderProgramEmitState(state, saved);
    builderProgram.hasChangedEmitSignature = () => !!state.hasChangedEmitSignature;
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
        let affected = getNextAffectedFile(state, cancellationToken, host);
        const programEmitKind = getBuilderFileEmit(state.compilerOptions);
        let emitKind: BuilderFileEmit = emitOnlyDtsFiles ?
            programEmitKind & BuilderFileEmit.AllDts : programEmitKind;
        if (!affected) {
            if (!outFile(state.compilerOptions)) {
                const pendingAffectedFile = getNextAffectedFilePendingEmit(state, emitOnlyDtsFiles);
                if (!pendingAffectedFile) {
                    const pendingForDiagnostics = getNextPendingEmitDiagnosticsFile(state);
                    if (pendingForDiagnostics) {
                        (state.seenEmittedFiles ??= new Map()).set(pendingForDiagnostics.affectedFile.resolvedPath, pendingForDiagnostics.seenKind | BuilderFileEmit.AllDts);
                        return {
                            result: { emitSkipped: true, diagnostics: pendingForDiagnostics.diagnostics },
                            affected: pendingForDiagnostics.affectedFile,
                        };
                    }
                    // Emit buildinfo if pending
                    if (!state.buildInfoEmitPending) return undefined;
                    const affected = state.program!;
                    const result = affected.emitBuildInfo(writeFile || maybeBind(host, host.writeFile), cancellationToken);
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
        let emitOnly: EmitOnly | undefined;
        if (emitKind & BuilderFileEmit.AllJs) emitOnly = EmitOnly.Js;
        if (emitKind & BuilderFileEmit.AllDts) emitOnly = emitOnly === undefined ? EmitOnly.Dts : undefined;
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
            affected === state.program ? undefined : affected as SourceFile,
            getWriteFileCallback(writeFile, customTransformers),
            cancellationToken,
            emitOnly,
            customTransformers,
        );
        if (affected !== state.program) {
            // update affected files
            const affectedSourceFile = affected as SourceFile;
            state.seenAffectedFiles!.add(affectedSourceFile.resolvedPath);
            if (state.affectedFilesIndex !== undefined) state.affectedFilesIndex++;
            // Change in changeSet/affectedFilesPendingEmit, buildInfo needs to be emitted
            state.buildInfoEmitPending = true;
            // Update the pendingEmit for the file
            const existing = state.seenEmittedFiles?.get(affectedSourceFile.resolvedPath) || BuilderFileEmit.None;
            (state.seenEmittedFiles ??= new Map()).set(affectedSourceFile.resolvedPath, emitKind | existing);
            const existingPending = state.affectedFilesPendingEmit?.get(affectedSourceFile.resolvedPath) || programEmitKind;
            const pendingKind = getPendingEmitKind(existingPending, emitKind | existing);
            if (pendingKind) (state.affectedFilesPendingEmit ??= new Map()).set(affectedSourceFile.resolvedPath, pendingKind);
            else state.affectedFilesPendingEmit?.delete(affectedSourceFile.resolvedPath);
            if (result.diagnostics.length) (state.emitDiagnosticsPerFile ??= new Map()).set(affectedSourceFile.resolvedPath, result.diagnostics);
        }
        else {
            // In program clear our changed files since any emit handles all changes
            state.changedFilesSet.clear();
        }
        return { result, affected };
    }

    function getWriteFileCallback(writeFile: WriteFileCallback | undefined, customTransformers: CustomTransformers | undefined): WriteFileCallback | undefined {
        if (!getEmitDeclarations(state.compilerOptions)) return writeFile || maybeBind(host, host.writeFile);
        return (fileName, text, writeByteOrderMark, onError, sourceFiles, data) => {
            if (isDeclarationFileName(fileName)) {
                if (!outFile(state.compilerOptions)) {
                    Debug.assert(sourceFiles?.length === 1);
                    let emitSignature;
                    if (!customTransformers) {
                        const file = sourceFiles[0];
                        const info = state.fileInfos.get(file.resolvedPath)!;
                        if (info.signature === file.version) {
                            const signature = computeSignatureWithDiagnostics(
                                state.program!,
                                file,
                                text,
                                host,
                                data,
                            );
                            // With d.ts diagnostics they are also part of the signature so emitSignature will be different from it since its just hash of d.ts
                            if (!data?.diagnostics?.length) emitSignature = signature;
                            if (signature !== file.version) { // Update it
                                if (host.storeFilesChangingSignatureDuringEmit) (state.filesChangingSignature ??= new Set()).add(file.resolvedPath);
                                if (state.exportedModulesMap) BuilderState.updateExportedModules(state, file, file.exportedModulesFromDeclarationEmit);
                                if (state.affectedFiles) {
                                    // Keep old signature so we know what to undo if cancellation happens
                                    const existing = state.oldSignatures?.get(file.resolvedPath);
                                    if (existing === undefined) (state.oldSignatures ??= new Map()).set(file.resolvedPath, info.signature || false);
                                    info.signature = signature;
                                }
                                else {
                                    // These are directly committed
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
                        (state.emitSignatures ??= new Map()).set(filePath, emitSignature);
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
                const oldSignature = !oldSignatureFormat || isString(oldSignatureFormat) ? oldSignatureFormat : oldSignatureFormat[0];
                newSignature ??= computeSignature(text, host, data);
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
                    sourceMaps,
                };
            }
            // In non Emit builder, clear affected files pending emit
            else {
                clearAffectedFilesPendingEmit(state, emitOnlyDtsFiles);
            }
        }
        return Debug.checkDefined(state.program).emit(
            targetSourceFile,
            getWriteFileCallback(writeFile, customTransformers),
            cancellationToken,
            emitOnlyDtsFiles,
            customTransformers,
        );
    }

    /**
     * Return the semantic diagnostics for the next affected file or undefined if iteration is complete
     * If provided ignoreSourceFile would be called before getting the diagnostics and would ignore the sourceFile if the returned value was true
     */
    function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]> {
        while (true) {
            const affected = getNextAffectedFile(state, cancellationToken, host);
            let result;
            if (!affected) return undefined; // Done
            else if (affected !== state.program) {
                // Get diagnostics for the affected file if its not ignored
                const affectedSourceFile = affected as SourceFile;
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
                result = state.program.getSemanticDiagnostics(/*sourceFile*/ undefined, cancellationToken);
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
    const existingKind = state.affectedFilesPendingEmit?.get(affectedFilePendingEmit) || BuilderFileEmit.None;
    (state.affectedFilesPendingEmit ??= new Map()).set(affectedFilePendingEmit, existingKind | kind);
    state.emitDiagnosticsPerFile?.delete(affectedFilePendingEmit);
}

/** @internal */
export function toBuilderStateFileInfoForMultiEmit(fileInfo: ProgramMultiFileEmitBuildInfoFileInfo): BuilderState.FileInfo {
    return isString(fileInfo) ?
        { version: fileInfo, signature: fileInfo, affectsGlobalScope: undefined, impliedFormat: undefined } :
        isString(fileInfo.signature) ?
        fileInfo as BuilderState.FileInfo :
        { version: fileInfo.version, signature: fileInfo.signature === false ? undefined : fileInfo.version, affectsGlobalScope: fileInfo.affectsGlobalScope, impliedFormat: fileInfo.impliedFormat };
}

/** @internal */
export function toBuilderFileEmit(value: ProgramBuilderInfoFilePendingEmit, fullEmitForOptions: BuilderFileEmit): BuilderFileEmit {
    return isNumber(value) ? fullEmitForOptions : value[1] || BuilderFileEmit.Dts;
}

/** @internal */
export function toProgramEmitPending(value: ProgramBuildInfoBundlePendingEmit, options: CompilerOptions | undefined): BuilderFileEmit | undefined {
    return !value ? getBuilderFileEmit(options || {}) : value;
}

/** @internal */
export function createBuilderProgramUsingProgramBuildInfo(buildInfo: BuildInfo, buildInfoPath: string, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram {
    const program = buildInfo.program!;
    const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
    const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());

    let state: ReusableBuilderProgramState;
    const filePaths = program.fileNames?.map(toPathInBuildInfoDirectory);
    let filePathsSetList: Set<Path>[] | undefined;
    const latestChangedDtsFile = program.latestChangedDtsFile ? toAbsolutePath(program.latestChangedDtsFile) : undefined;
    if (isProgramBundleEmitBuildInfo(program)) {
        const fileInfos = new Map<Path, BuilderState.FileInfo>();
        program.fileInfos.forEach((fileInfo, index) => {
            const path = toFilePath(index + 1 as ProgramBuildInfoFileId);
            fileInfos.set(path, isString(fileInfo) ? { version: fileInfo, signature: undefined, affectsGlobalScope: undefined, impliedFormat: undefined } : fileInfo);
        });
        state = {
            fileInfos,
            compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
            latestChangedDtsFile,
            outSignature: program.outSignature,
            programEmitPending: program.pendingEmit === undefined ? undefined : toProgramEmitPending(program.pendingEmit, program.options),
            bundle: buildInfo.bundle,
        };
    }
    else {
        filePathsSetList = program.fileIdsList?.map(fileIds => new Set(fileIds.map(toFilePath)));
        const fileInfos = new Map<Path, BuilderState.FileInfo>();
        const emitSignatures = program.options?.composite && !outFile(program.options) ? new Map<Path, EmitSignature>() : undefined;
        program.fileInfos.forEach((fileInfo, index) => {
            const path = toFilePath(index + 1 as ProgramBuildInfoFileId);
            const stateFileInfo = toBuilderStateFileInfoForMultiEmit(fileInfo);
            fileInfos.set(path, stateFileInfo);
            if (emitSignatures && stateFileInfo.signature) emitSignatures.set(path, stateFileInfo.signature);
        });
        program.emitSignatures?.forEach(value => {
            if (isNumber(value)) emitSignatures!.delete(toFilePath(value));
            else {
                const key = toFilePath(value[0]);
                emitSignatures!.set(
                    key,
                    !isString(value[1]) && !value[1].length ?
                        // File signature is emit signature but differs in map
                        [emitSignatures!.get(key)! as string] :
                        value[1],
                );
            }
        });
        const fullEmitForOptions = program.affectedFilesPendingEmit ? getBuilderFileEmit(program.options || {}) : undefined;
        state = {
            fileInfos,
            compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
            referencedMap: toManyToManyPathMap(program.referencedMap),
            exportedModulesMap: toManyToManyPathMap(program.exportedModulesMap),
            semanticDiagnosticsPerFile: toPerFileDiagnostics(program.semanticDiagnosticsPerFile),
            emitDiagnosticsPerFile: toPerFileDiagnostics(program.emitDiagnosticsPerFile),
            hasReusableDiagnostic: true,
            affectedFilesPendingEmit: program.affectedFilesPendingEmit && arrayToMap(program.affectedFilesPendingEmit, value => toFilePath(isNumber(value) ? value : value[0]), value => toBuilderFileEmit(value, fullEmitForOptions!)),
            changedFilesSet: new Set(map(program.changeFileSet, toFilePath)),
            latestChangedDtsFile,
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
        hasChangedEmitSignature: returnFalse,
    };

    function toPathInBuildInfoDirectory(path: string) {
        return toPath(path, buildInfoDirectory, getCanonicalFileName);
    }

    function toAbsolutePath(path: string) {
        return getNormalizedAbsolutePath(path, buildInfoDirectory);
    }

    function toFilePath(fileId: ProgramBuildInfoFileId) {
        return filePaths[fileId - 1];
    }

    function toFilePathsSet(fileIdsListId: ProgramBuildInfoFileIdListId) {
        return filePathsSetList![fileIdsListId - 1];
    }

    function toManyToManyPathMap(referenceMap: ProgramBuildInfoReferencedMap | undefined): BuilderState.ManyToManyPathMap | undefined {
        if (!referenceMap) {
            return undefined;
        }

        const map = BuilderState.createManyToManyPathMap();
        referenceMap.forEach(([fileId, fileIdListId]) => map.set(toFilePath(fileId), toFilePathsSet(fileIdListId)));
        return map;
    }

    function toPerFileDiagnostics(diagnostics: readonly ProgramBuildInfoDiagnostic[] | undefined): Map<Path, readonly ReusableDiagnostic[]> | undefined {
        return diagnostics && arrayToMap(diagnostics, value => toFilePath(isNumber(value) ? value : value[0]), value => isNumber(value) ? emptyArray : value[1]);
    }
}

/** @internal */
export function getBuildInfoFileVersionMap(
    program: ProgramBuildInfo,
    buildInfoPath: string,
    host: Pick<ReadBuildProgramHost, "useCaseSensitiveFileNames" | "getCurrentDirectory">,
) {
    const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
    const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
    const fileInfos = new Map<Path, string>();
    let rootIndex = 0;
    const roots: Path[] = [];
    program.fileInfos.forEach((fileInfo, index) => {
        const path = toPath(program.fileNames[index], buildInfoDirectory, getCanonicalFileName);
        const version = isString(fileInfo) ? fileInfo : fileInfo.version;
        fileInfos.set(path, version);
        if (rootIndex < program.root.length) {
            const current = program.root[rootIndex];
            const fileId = (index + 1) as ProgramBuildInfoFileId;
            if (isArray(current)) {
                if (current[0] <= fileId && fileId <= current[1]) {
                    roots.push(path);
                    if (current[1] === fileId) rootIndex++;
                }
            }
            else if (current === fileId) {
                roots.push(path);
                rootIndex++;
            }
        }
    });
    return { fileInfos, roots };
}

/** @internal */
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

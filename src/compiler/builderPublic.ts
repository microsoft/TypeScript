import * as ts from "./_namespaces/ts";

export type AffectedFileResult<T> = { result: T; affected: ts.SourceFile | ts.Program; } | undefined;

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
    writeFile?: ts.WriteFileCallback;
    /**
     * disable using source file version as signature for testing
     */
    /*@internal*/
    disableUseFileVersionAsSignature?: boolean;
    /**
     * Store the list of files that update signature during the emit
     */
    /*@internal*/
    storeFilesChangingSignatureDuringEmit?: boolean;
    /**
     * Gets the current time
     */
    /*@internal*/
    now?(): Date;
}

/**
 * Builder to manage the program state changes
 */
export interface BuilderProgram {
    /*@internal*/
    getState(): ts.ReusableBuilderProgramState;
    /*@internal*/
    saveEmitState(): ts.SavedBuildProgramEmitState;
    /*@internal*/
    restoreEmitState(saved: ts.SavedBuildProgramEmitState): void;
    /*@internal*/
    hasChangedEmitSignature?(): boolean;
    /**
     * Returns current program
     */
    getProgram(): ts.Program;
    /**
     * Returns current program that could be undefined if the program was released
     */
    /*@internal*/
    getProgramOrUndefined(): ts.Program | undefined;
    /**
     * Releases reference to the program, making all the other operations that need program to fail.
     */
    /*@internal*/
    releaseProgram(): void;
    /**
     * Get compiler options of the program
     */
    getCompilerOptions(): ts.CompilerOptions;
    /**
     * Get the source file in the program with file name
     */
    getSourceFile(fileName: string): ts.SourceFile | undefined;
    /**
     * Get a list of files in the program
     */
    getSourceFiles(): readonly ts.SourceFile[];
    /**
     * Get the diagnostics for compiler options
     */
    getOptionsDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    /**
     * Get the diagnostics that dont belong to any file
     */
    getGlobalDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    /**
     * Get the diagnostics from config file parsing
     */
    getConfigFileParsingDiagnostics(): readonly ts.Diagnostic[];
    /**
     * Get the syntax diagnostics, for all source files if source file is not supplied
     */
    getSyntacticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    /**
     * Get the declaration diagnostics, for all source files if source file is not supplied
     */
    getDeclarationDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.DiagnosticWithLocation[];
    /**
     * Get all the dependencies of the file
     */
    getAllDependencies(sourceFile: ts.SourceFile): readonly string[];

    /**
     * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
     * The semantic diagnostics are cached and managed here
     * Note that it is assumed that when asked about semantic diagnostics through this API,
     * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
     * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
     * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
     */
    getSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
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
    emit(targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): ts.EmitResult;
    /*@internal*/
    emitBuildInfo(writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken): ts.EmitResult;
    /**
     * Get the current directory of the program
     */
    getCurrentDirectory(): string;
    /*@internal*/
    close(): void;
}

/**
 * The builder that caches the semantic diagnostics for the program and handles the changed files and affected files
 */
export interface SemanticDiagnosticsBuilderProgram extends BuilderProgram {
    /**
     * Gets the semantic diagnostics from the program for the next affected file and caches it
     * Returns undefined if the iteration is complete
     */
    getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: ts.CancellationToken, ignoreSourceFile?: (sourceFile: ts.SourceFile) => boolean): AffectedFileResult<readonly ts.Diagnostic[]>;
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
    emitNextAffectedFile(writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): AffectedFileResult<ts.EmitResult>;
}

/**
 * Create the builder to manage semantic diagnostics and cache them
 */
export function createSemanticDiagnosticsBuilderProgram(newProgram: ts.Program, host: BuilderProgramHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[]): SemanticDiagnosticsBuilderProgram;
export function createSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: ts.CompilerOptions | undefined, host?: ts.CompilerHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]): SemanticDiagnosticsBuilderProgram;
export function createSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: ts.Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | ts.CompilerOptions | undefined, oldProgramOrHost?: ts.CompilerHost | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly ts.Diagnostic[] | SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]) {
    return ts.createBuilderProgram(ts.BuilderProgramKind.SemanticDiagnosticsBuilderProgram, ts.getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
}

/**
 * Create the builder that can handle the changes in program and iterate through changed files
 * to emit the those files and manage semantic diagnostics cache as well
 */
export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: ts.Program, host: BuilderProgramHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[]): EmitAndSemanticDiagnosticsBuilderProgram;
export function createEmitAndSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: ts.CompilerOptions | undefined, host?: ts.CompilerHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]): EmitAndSemanticDiagnosticsBuilderProgram;
export function createEmitAndSemanticDiagnosticsBuilderProgram(newProgramOrRootNames: ts.Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | ts.CompilerOptions | undefined, oldProgramOrHost?: ts.CompilerHost | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly ts.Diagnostic[] | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]) {
    return ts.createBuilderProgram(ts.BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, ts.getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
}

/**
 * Creates a builder thats just abstraction over program and can be used with watch
 */
export function createAbstractBuilder(newProgram: ts.Program, host: BuilderProgramHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[]): BuilderProgram;
export function createAbstractBuilder(rootNames: readonly string[] | undefined, options: ts.CompilerOptions | undefined, host?: ts.CompilerHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]): BuilderProgram;
export function createAbstractBuilder(newProgramOrRootNames: ts.Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | ts.CompilerOptions | undefined, oldProgramOrHost?: ts.CompilerHost | BuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly ts.Diagnostic[] | BuilderProgram, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[]): BuilderProgram {
    const { newProgram, configFileParsingDiagnostics: newConfigFileParsingDiagnostics } = ts.getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences);
    return ts.createRedirectedBuilderProgram(() => ({ program: newProgram, compilerOptions: newProgram.getCompilerOptions() }), newConfigFileParsingDiagnostics);
}

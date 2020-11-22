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
        /*@internal*/
        emitBuildInfo(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult;
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

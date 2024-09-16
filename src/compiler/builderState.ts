import {
    arrayFrom,
    CancellationToken,
    CompilerOptions,
    computeSignatureWithDiagnostics,
    CustomTransformers,
    Debug,
    EmitOnly,
    EmitOutput,
    emptyArray,
    GetCanonicalFileName,
    getDirectoryPath,
    getIsolatedModules,
    getSourceFileOfNode,
    HostForComputeHash,
    isDeclarationFileName,
    isExternalOrCommonJsModule,
    isGlobalScopeAugmentation,
    isJsonSourceFile,
    isModuleWithStringLiteralName,
    isStringLiteral,
    mapDefined,
    mapDefinedIterator,
    ModuleDeclaration,
    ModuleKind,
    OutputFile,
    Path,
    Program,
    ResolutionMode,
    some,
    SourceFile,
    StringLiteralLike,
    Symbol,
    toPath,
    TypeChecker,
} from "./_namespaces/ts.js";

/** @internal */
export function getFileEmitOutput(
    program: Program,
    sourceFile: SourceFile,
    emitOnlyDtsFiles: boolean,
    cancellationToken?: CancellationToken,
    customTransformers?: CustomTransformers,
    forceDtsEmit?: boolean,
): EmitOutput {
    const outputFiles: OutputFile[] = [];
    const { emitSkipped, diagnostics } = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers, forceDtsEmit);
    return { outputFiles, emitSkipped, diagnostics };

    function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
        outputFiles.push({ name: fileName, writeByteOrderMark, text });
    }
}
/** @internal */
export enum SignatureInfo {
    ComputedDts,
    StoredSignatureAtEmit,
    UsedVersion,
}
/** @internal */
export interface BuilderState {
    /**
     * Information of the file eg. its version, signature etc
     */
    fileInfos: Map<Path, BuilderState.FileInfo>;
    /**
     * Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
     * Otherwise undefined
     * Thus non undefined value indicates, module emit
     */
    readonly referencedMap?: BuilderState.ReadonlyManyToManyPathMap | undefined;
    /**
     * true if file version is used as signature
     * This helps in delaying the calculation of the d.ts hash as version for the file till reasonable time
     */
    useFileVersionAsSignature?: boolean;
    /**
     * Map of files that have already called update signature.
     * That means hence forth these files are assumed to have
     * no change in their signature for this version of the program
     */
    hasCalledUpdateShapeSignature?: Set<Path>;
    /**
     * Stores signatures before before the update till affected file is committed
     */
    oldSignatures?: Map<Path, string | false>;
    /**
     * Cache of all files excluding default library file for the current program
     */
    allFilesExcludingDefaultLibraryFile?: readonly SourceFile[];
    /**
     * Cache of all the file names
     */
    allFileNames?: readonly string[];
    /** Information about the signature computation - test only */
    signatureInfo?: Map<Path, SignatureInfo>;
}
/** @internal */
export namespace BuilderState {
    /**
     * Information about the source file: Its version and optional signature from last emit
     */
    export interface FileInfo {
        readonly version: string;
        signature: string | undefined;
        affectsGlobalScope: true | undefined;
        impliedFormat: ResolutionMode;
    }

    export interface ReadonlyManyToManyPathMap {
        getKeys(v: Path): ReadonlySet<Path> | undefined;
        getValues(k: Path): ReadonlySet<Path> | undefined;
        keys(): IterableIterator<Path>;
        size(): number;
    }

    export interface ManyToManyPathMap extends ReadonlyManyToManyPathMap {
        deleteKey(k: Path): boolean;
        set(k: Path, v: ReadonlySet<Path>): void;
    }

    export function createManyToManyPathMap(): ManyToManyPathMap {
        function create(forward: Map<Path, ReadonlySet<Path>>, reverse: Map<Path, Set<Path>>, deleted: Set<Path> | undefined): ManyToManyPathMap {
            const map: ManyToManyPathMap = {
                getKeys: v => reverse.get(v),
                getValues: k => forward.get(k),
                keys: () => forward.keys(),
                size: () => forward.size,

                deleteKey: k => {
                    (deleted ||= new Set<Path>()).add(k);

                    const set = forward.get(k);
                    if (!set) {
                        return false;
                    }

                    set.forEach(v => deleteFromMultimap(reverse, v, k));
                    forward.delete(k);
                    return true;
                },
                set: (k, vSet) => {
                    deleted?.delete(k);

                    const existingVSet = forward.get(k);
                    forward.set(k, vSet);

                    existingVSet?.forEach(v => {
                        if (!vSet.has(v)) {
                            deleteFromMultimap(reverse, v, k);
                        }
                    });

                    vSet.forEach(v => {
                        if (!existingVSet?.has(v)) {
                            addToMultimap(reverse, v, k);
                        }
                    });

                    return map;
                },
            };

            return map;
        }

        return create(new Map<Path, Set<Path>>(), new Map<Path, Set<Path>>(), /*deleted*/ undefined);
    }

    function addToMultimap<K, V>(map: Map<K, Set<V>>, k: K, v: V): void {
        let set = map.get(k);
        if (!set) {
            set = new Set<V>();
            map.set(k, set);
        }
        set.add(v);
    }

    function deleteFromMultimap<K, V>(map: Map<K, Set<V>>, k: K, v: V): boolean {
        const set = map.get(k);

        if (set?.delete(v)) {
            if (!set.size) {
                map.delete(k);
            }
            return true;
        }

        return false;
    }

    function getReferencedFilesFromImportedModuleSymbol(symbol: Symbol): Path[] {
        return mapDefined(symbol.declarations, declaration => getSourceFileOfNode(declaration)?.resolvedPath);
    }

    /**
     * Get the module source file and all augmenting files from the import name node from file
     */
    function getReferencedFilesFromImportLiteral(checker: TypeChecker, importName: StringLiteralLike): Path[] | undefined {
        const symbol = checker.getSymbolAtLocation(importName);
        return symbol && getReferencedFilesFromImportedModuleSymbol(symbol);
    }

    /**
     * Gets the path to reference file from file name, it could be resolvedPath if present otherwise path
     */
    function getReferencedFileFromFileName(program: Program, fileName: string, sourceFileDirectory: Path, getCanonicalFileName: GetCanonicalFileName): Path {
        return toPath(program.getProjectReferenceRedirect(fileName) || fileName, sourceFileDirectory, getCanonicalFileName);
    }

    /**
     * Gets the referenced files for a file from the program with values for the keys as referenced file's path to be true
     */
    function getReferencedFiles(program: Program, sourceFile: SourceFile, getCanonicalFileName: GetCanonicalFileName): Set<Path> | undefined {
        let referencedFiles: Set<Path> | undefined;

        // We need to use a set here since the code can contain the same import twice,
        // but that will only be one dependency.
        // To avoid invernal conversion, the key of the referencedFiles map must be of type Path
        if (sourceFile.imports && sourceFile.imports.length > 0) {
            const checker: TypeChecker = program.getTypeChecker();
            for (const importName of sourceFile.imports) {
                const declarationSourceFilePaths = getReferencedFilesFromImportLiteral(checker, importName);
                declarationSourceFilePaths?.forEach(addReferencedFile);
            }
        }

        const sourceFileDirectory = getDirectoryPath(sourceFile.resolvedPath);
        // Handle triple slash references
        if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
            for (const referencedFile of sourceFile.referencedFiles) {
                const referencedPath = getReferencedFileFromFileName(program, referencedFile.fileName, sourceFileDirectory, getCanonicalFileName);
                addReferencedFile(referencedPath);
            }
        }

        // Handle type reference directives
        program.forEachResolvedTypeReferenceDirective(({ resolvedTypeReferenceDirective }) => {
            if (!resolvedTypeReferenceDirective) {
                return;
            }

            const fileName = resolvedTypeReferenceDirective.resolvedFileName!; // TODO: GH#18217
            const typeFilePath = getReferencedFileFromFileName(program, fileName, sourceFileDirectory, getCanonicalFileName);
            addReferencedFile(typeFilePath);
        }, sourceFile);

        // Add module augmentation as references
        if (sourceFile.moduleAugmentations.length) {
            const checker = program.getTypeChecker();
            for (const moduleName of sourceFile.moduleAugmentations) {
                if (!isStringLiteral(moduleName)) continue;
                const symbol = checker.getSymbolAtLocation(moduleName);
                if (!symbol) continue;

                // Add any file other than our own as reference
                addReferenceFromAmbientModule(symbol);
            }
        }

        // From ambient modules
        for (const ambientModule of program.getTypeChecker().getAmbientModules()) {
            if (ambientModule.declarations && ambientModule.declarations.length > 1) {
                addReferenceFromAmbientModule(ambientModule);
            }
        }

        return referencedFiles;

        function addReferenceFromAmbientModule(symbol: Symbol) {
            if (!symbol.declarations) {
                return;
            }
            // Add any file other than our own as reference
            for (const declaration of symbol.declarations) {
                const declarationSourceFile = getSourceFileOfNode(declaration);
                if (
                    declarationSourceFile &&
                    declarationSourceFile !== sourceFile
                ) {
                    addReferencedFile(declarationSourceFile.resolvedPath);
                }
            }
        }

        function addReferencedFile(referencedPath: Path) {
            (referencedFiles || (referencedFiles = new Set())).add(referencedPath);
        }
    }

    /**
     * Returns true if oldState is reusable, that is the emitKind = module/non module has not changed
     */
    export function canReuseOldState(newReferencedMap: ReadonlyManyToManyPathMap | undefined, oldState: BuilderState | undefined): boolean | undefined {
        return oldState && !oldState.referencedMap === !newReferencedMap;
    }

    export function createReferencedMap(options: CompilerOptions): ManyToManyPathMap | undefined {
        return options.module !== ModuleKind.None && !options.outFile ?
            createManyToManyPathMap() :
            undefined;
    }

    /**
     * Creates the state of file references and signature for the new program from oldState if it is safe
     */
    export function create(newProgram: Program, oldState: Readonly<BuilderState> | undefined, disableUseFileVersionAsSignature: boolean): BuilderState {
        const fileInfos = new Map<Path, FileInfo>();
        const options = newProgram.getCompilerOptions();
        const referencedMap = createReferencedMap(options);
        const useOldState = canReuseOldState(referencedMap, oldState);

        // Ensure source files have parent pointers set
        newProgram.getTypeChecker();

        // Create the reference map, and set the file infos
        for (const sourceFile of newProgram.getSourceFiles()) {
            const version = Debug.checkDefined(sourceFile.version, "Program intended to be used with Builder should have source files with versions set");
            const oldUncommittedSignature = useOldState ? oldState!.oldSignatures?.get(sourceFile.resolvedPath) : undefined;
            const signature = oldUncommittedSignature === undefined ?
                useOldState ? oldState!.fileInfos.get(sourceFile.resolvedPath)?.signature : undefined :
                oldUncommittedSignature || undefined;
            if (referencedMap) {
                const newReferences = getReferencedFiles(newProgram, sourceFile, newProgram.getCanonicalFileName);
                if (newReferences) {
                    referencedMap.set(sourceFile.resolvedPath, newReferences);
                }
            }
            fileInfos.set(sourceFile.resolvedPath, {
                version,
                signature,
                // No need to calculate affectsGlobalScope with --out since its not used at all
                affectsGlobalScope: !options.outFile ? isFileAffectingGlobalScope(sourceFile) || undefined : undefined,
                impliedFormat: sourceFile.impliedNodeFormat,
            });
        }

        return {
            fileInfos,
            referencedMap,
            useFileVersionAsSignature: !disableUseFileVersionAsSignature && !useOldState,
        };
    }

    /**
     * Releases needed properties
     */
    export function releaseCache(state: BuilderState): void {
        state.allFilesExcludingDefaultLibraryFile = undefined;
        state.allFileNames = undefined;
    }

    /**
     * Gets the files affected by the path from the program
     */
    export function getFilesAffectedBy(
        state: BuilderState,
        programOfThisState: Program,
        path: Path,
        cancellationToken: CancellationToken | undefined,
        host: HostForComputeHash,
    ): readonly SourceFile[] {
        const result = getFilesAffectedByWithOldState(
            state,
            programOfThisState,
            path,
            cancellationToken,
            host,
        );
        state.oldSignatures?.clear();
        return result;
    }

    export function getFilesAffectedByWithOldState(
        state: BuilderState,
        programOfThisState: Program,
        path: Path,
        cancellationToken: CancellationToken | undefined,
        host: HostForComputeHash,
    ): readonly SourceFile[] {
        const sourceFile = programOfThisState.getSourceFileByPath(path);
        if (!sourceFile) {
            return emptyArray;
        }

        if (!updateShapeSignature(state, programOfThisState, sourceFile, cancellationToken, host)) {
            return [sourceFile];
        }

        return (state.referencedMap ? getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit)(state, programOfThisState, sourceFile, cancellationToken, host);
    }

    export function updateSignatureOfFile(state: BuilderState, signature: string | undefined, path: Path): void {
        state.fileInfos.get(path)!.signature = signature;
        (state.hasCalledUpdateShapeSignature ||= new Set()).add(path);
    }

    export function computeDtsSignature(
        programOfThisState: Program,
        sourceFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        host: HostForComputeHash,
        onNewSignature: (signature: string, sourceFiles: readonly SourceFile[]) => void,
    ): void {
        programOfThisState.emit(
            sourceFile,
            (fileName, text, _writeByteOrderMark, _onError, sourceFiles, data) => {
                Debug.assert(isDeclarationFileName(fileName), `File extension for signature expected to be dts: Got:: ${fileName}`);
                onNewSignature(
                    computeSignatureWithDiagnostics(
                        programOfThisState,
                        sourceFile,
                        text,
                        host,
                        data,
                    ),
                    sourceFiles!,
                );
            },
            cancellationToken,
            EmitOnly.BuilderSignature,
            /*customTransformers*/ undefined,
            /*forceDtsEmit*/ true,
        );
    }

    /**
     * Returns if the shape of the signature has changed since last emit
     */
    export function updateShapeSignature(
        state: BuilderState,
        programOfThisState: Program,
        sourceFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        host: HostForComputeHash,
        useFileVersionAsSignature: boolean | undefined = state.useFileVersionAsSignature,
    ): boolean {
        // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
        if (state.hasCalledUpdateShapeSignature?.has(sourceFile.resolvedPath)) return false;

        const info = state.fileInfos.get(sourceFile.resolvedPath)!;
        const prevSignature = info.signature;
        let latestSignature: string | undefined;
        if (!sourceFile.isDeclarationFile && !useFileVersionAsSignature) {
            computeDtsSignature(programOfThisState, sourceFile, cancellationToken, host, signature => {
                latestSignature = signature;
                if (host.storeSignatureInfo) (state.signatureInfo ??= new Map()).set(sourceFile.resolvedPath, SignatureInfo.ComputedDts);
            });
        }
        // Default is to use file version as signature
        if (latestSignature === undefined) {
            latestSignature = sourceFile.version;
            if (host.storeSignatureInfo) (state.signatureInfo ??= new Map()).set(sourceFile.resolvedPath, SignatureInfo.UsedVersion);
        }
        (state.oldSignatures ||= new Map()).set(sourceFile.resolvedPath, prevSignature || false);
        (state.hasCalledUpdateShapeSignature ||= new Set()).add(sourceFile.resolvedPath);
        info.signature = latestSignature;
        return latestSignature !== prevSignature;
    }

    /**
     * Get all the dependencies of the sourceFile
     */
    export function getAllDependencies(state: BuilderState, programOfThisState: Program, sourceFile: SourceFile): readonly string[] {
        const compilerOptions = programOfThisState.getCompilerOptions();
        // With --out or --outFile all outputs go into single file, all files depend on each other
        if (compilerOptions.outFile) {
            return getAllFileNames(state, programOfThisState);
        }

        // If this is non module emit, or its a global file, it depends on all the source files
        if (!state.referencedMap || isFileAffectingGlobalScope(sourceFile)) {
            return getAllFileNames(state, programOfThisState);
        }

        // Get the references, traversing deep from the referenceMap
        const seenMap = new Set<Path>();
        const queue = [sourceFile.resolvedPath];
        while (queue.length) {
            const path = queue.pop()!;
            if (!seenMap.has(path)) {
                seenMap.add(path);
                const references = state.referencedMap.getValues(path);
                if (references) {
                    for (const key of references.keys()) {
                        queue.push(key);
                    }
                }
            }
        }

        return arrayFrom(mapDefinedIterator(seenMap.keys(), path => programOfThisState.getSourceFileByPath(path)?.fileName ?? path));
    }

    /**
     * Gets the names of all files from the program
     */
    function getAllFileNames(state: BuilderState, programOfThisState: Program): readonly string[] {
        if (!state.allFileNames) {
            const sourceFiles = programOfThisState.getSourceFiles();
            state.allFileNames = sourceFiles === emptyArray ? emptyArray : sourceFiles.map(file => file.fileName);
        }
        return state.allFileNames;
    }

    /**
     * Gets the files referenced by the the file path
     */
    export function getReferencedByPaths(state: Readonly<BuilderState>, referencedFilePath: Path): Path[] {
        const keys = state.referencedMap!.getKeys(referencedFilePath);
        return keys ? arrayFrom(keys.keys()) : [];
    }

    /**
     * For script files that contains only ambient external modules, although they are not actually external module files,
     * they can only be consumed via importing elements from them. Regular script files cannot consume them. Therefore,
     * there are no point to rebuild all script files if these special files have changed. However, if any statement
     * in the file is not ambient external module, we treat it as a regular script file.
     */
    function containsOnlyAmbientModules(sourceFile: SourceFile) {
        for (const statement of sourceFile.statements) {
            if (!isModuleWithStringLiteralName(statement)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return true if file contains anything that augments to global scope we need to build them as if
     * they are global files as well as module
     */
    function containsGlobalScopeAugmentation(sourceFile: SourceFile) {
        return some(sourceFile.moduleAugmentations, augmentation => isGlobalScopeAugmentation(augmentation.parent as ModuleDeclaration));
    }

    /**
     * Return true if the file will invalidate all files because it affectes global scope
     */
    function isFileAffectingGlobalScope(sourceFile: SourceFile) {
        return containsGlobalScopeAugmentation(sourceFile) ||
            !isExternalOrCommonJsModule(sourceFile) && !isJsonSourceFile(sourceFile) && !containsOnlyAmbientModules(sourceFile);
    }

    /**
     * Gets all files of the program excluding the default library file
     */
    export function getAllFilesExcludingDefaultLibraryFile(state: BuilderState, programOfThisState: Program, firstSourceFile: SourceFile | undefined): readonly SourceFile[] {
        // Use cached result
        if (state.allFilesExcludingDefaultLibraryFile) {
            return state.allFilesExcludingDefaultLibraryFile;
        }

        let result: SourceFile[] | undefined;
        if (firstSourceFile) addSourceFile(firstSourceFile);
        for (const sourceFile of programOfThisState.getSourceFiles()) {
            if (sourceFile !== firstSourceFile) {
                addSourceFile(sourceFile);
            }
        }
        state.allFilesExcludingDefaultLibraryFile = result || emptyArray;
        return state.allFilesExcludingDefaultLibraryFile;

        function addSourceFile(sourceFile: SourceFile) {
            if (!programOfThisState.isSourceFileDefaultLibrary(sourceFile)) {
                (result || (result = [])).push(sourceFile);
            }
        }
    }

    /**
     * When program emits non modular code, gets the files affected by the sourceFile whose shape has changed
     */
    function getFilesAffectedByUpdatedShapeWhenNonModuleEmit(state: BuilderState, programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile) {
        const compilerOptions = programOfThisState.getCompilerOptions();
        // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
        // so returning the file itself is good enough.
        if (compilerOptions && compilerOptions.outFile) {
            return [sourceFileWithUpdatedShape];
        }
        return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
    }

    /**
     * When program emits modular code, gets the files affected by the sourceFile whose shape has changed
     */
    function getFilesAffectedByUpdatedShapeWhenModuleEmit(
        state: BuilderState,
        programOfThisState: Program,
        sourceFileWithUpdatedShape: SourceFile,
        cancellationToken: CancellationToken | undefined,
        host: HostForComputeHash,
    ) {
        if (isFileAffectingGlobalScope(sourceFileWithUpdatedShape)) {
            return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
        }

        const compilerOptions = programOfThisState.getCompilerOptions();
        if (compilerOptions && (getIsolatedModules(compilerOptions) || compilerOptions.outFile)) {
            return [sourceFileWithUpdatedShape];
        }

        // Now we need to if each file in the referencedBy list has a shape change as well.
        // Because if so, its own referencedBy files need to be saved as well to make the
        // emitting result consistent with files on disk.
        const seenFileNamesMap = new Map<Path, SourceFile>();

        // Start with the paths this file was referenced by
        seenFileNamesMap.set(sourceFileWithUpdatedShape.resolvedPath, sourceFileWithUpdatedShape);
        const queue = getReferencedByPaths(state, sourceFileWithUpdatedShape.resolvedPath);
        while (queue.length > 0) {
            const currentPath = queue.pop()!;
            if (!seenFileNamesMap.has(currentPath)) {
                const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath)!;
                seenFileNamesMap.set(currentPath, currentSourceFile);
                if (currentSourceFile && updateShapeSignature(state, programOfThisState, currentSourceFile, cancellationToken, host)) {
                    queue.push(...getReferencedByPaths(state, currentSourceFile.resolvedPath));
                }
            }
        }

        // Return array of values that needs emit
        return arrayFrom(mapDefinedIterator(seenFileNamesMap.values(), value => value));
    }
}

namespace ts {
    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
        /* @internal */ exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
}

/*@internal*/
namespace ts {
    export function getFileEmitOutput(program: Program, sourceFile: SourceFile, emitOnlyDtsFiles: boolean,
        cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): EmitOutput {
        const outputFiles: OutputFile[] = [];
        const emitResult = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
        return { outputFiles, emitSkipped: emitResult.emitSkipped, exportedModulesFromDeclarationEmit: emitResult.exportedModulesFromDeclarationEmit };

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
            outputFiles.push({ name: fileName, writeByteOrderMark, text });
        }
    }

    export interface BuilderState {
        /**
         * Information of the file eg. its version, signature etc
         */
        fileInfos: Map<BuilderState.FileInfo>;
        /**
         * Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
         * Otherwise undefined
         * Thus non undefined value indicates, module emit
         */
        readonly referencedMap: ReadonlyMap<BuilderState.ReferencedSet> | undefined;
        /**
         * Contains the map of exported modules ReferencedSet=exorted module files from the file if module emit is enabled
         * Otherwise undefined
         */
        readonly exportedModulesMap: Map<BuilderState.ReferencedSet> | undefined;
        /**
         * Map of files that have already called update signature.
         * That means hence forth these files are assumed to have
         * no change in their signature for this version of the program
         */
        hasCalledUpdateShapeSignature: Map<true>;
        /**
         * Cache of all files excluding default library file for the current program
         */
        allFilesExcludingDefaultLibraryFile: ReadonlyArray<SourceFile> | undefined;
        /**
         * Cache of all the file names
         */
        allFileNames: ReadonlyArray<string> | undefined;
    }
}

/*@internal*/
namespace ts.BuilderState {
    /**
     * Information about the source file: Its version and optional signature from last emit
     */
    export interface FileInfo {
        readonly version: string;
        signature: string | undefined;
    }
    /**
     * Referenced files with values for the keys as referenced file's path to be true
     */
    export type ReferencedSet = ReadonlyMap<true>;
    /**
     * Compute the hash to store the shape of the file
     */
    export type ComputeHash = (data: string) => string;

    /**
     * Exported modules to from declaration emit being computed.
     * This can contain false in the affected file path to specify that there are no exported module(types from other modules) for this file
     */
    export type ComputingExportedModulesMap = Map<ReferencedSet | false>;

    /**
     * Get the referencedFile from the imported module symbol
     */
    function getReferencedFileFromImportedModuleSymbol(symbol: Symbol) {
        if (symbol.declarations && symbol.declarations[0]) {
            const declarationSourceFile = getSourceFileOfNode(symbol.declarations[0]);
            return declarationSourceFile && declarationSourceFile.resolvedPath;
        }
    }

    /**
     * Get the referencedFile from the import name node from file
     */
    function getReferencedFileFromImportLiteral(checker: TypeChecker, importName: StringLiteralLike) {
        const symbol = checker.getSymbolAtLocation(importName);
        return symbol && getReferencedFileFromImportedModuleSymbol(symbol);
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
    function getReferencedFiles(program: Program, sourceFile: SourceFile, getCanonicalFileName: GetCanonicalFileName): Map<true> | undefined {
        let referencedFiles: Map<true> | undefined;

        // We need to use a set here since the code can contain the same import twice,
        // but that will only be one dependency.
        // To avoid invernal conversion, the key of the referencedFiles map must be of type Path
        if (sourceFile.imports && sourceFile.imports.length > 0) {
            const checker: TypeChecker = program.getTypeChecker();
            for (const importName of sourceFile.imports) {
                const declarationSourceFilePath = getReferencedFileFromImportLiteral(checker, importName);
                if (declarationSourceFilePath) {
                    addReferencedFile(declarationSourceFilePath);
                }
            }
        }

        const sourceFileDirectory = getDirectoryPath(sourceFile.path);
        // Handle triple slash references
        if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
            for (const referencedFile of sourceFile.referencedFiles) {
                const referencedPath = getReferencedFileFromFileName(program, referencedFile.fileName, sourceFileDirectory, getCanonicalFileName);
                addReferencedFile(referencedPath);
            }
        }

        // Handle type reference directives
        if (sourceFile.resolvedTypeReferenceDirectiveNames) {
            sourceFile.resolvedTypeReferenceDirectiveNames.forEach((resolvedTypeReferenceDirective) => {
                if (!resolvedTypeReferenceDirective) {
                    return;
                }

                const fileName = resolvedTypeReferenceDirective.resolvedFileName!; // TODO: GH#18217
                const typeFilePath = getReferencedFileFromFileName(program, fileName, sourceFileDirectory, getCanonicalFileName);
                addReferencedFile(typeFilePath);
            });
        }

        // Add module augmentation as references
        if (sourceFile.moduleAugmentations.length) {
            const checker = program.getTypeChecker();
            for (const moduleName of sourceFile.moduleAugmentations) {
                if (!isStringLiteral(moduleName)) { continue; }
                const symbol = checker.getSymbolAtLocation(moduleName);
                if (!symbol) { continue; }

                // Add any file other than our own as reference
                addReferenceFromAmbientModule(symbol);
            }
        }

        // From ambient modules
        for (const ambientModule of program.getTypeChecker().getAmbientModules()) {
            if (ambientModule.declarations.length > 1) {
                addReferenceFromAmbientModule(ambientModule);
            }
        }

        return referencedFiles;

        function addReferenceFromAmbientModule(symbol: Symbol) {
            // Add any file other than our own as reference
            for (const declaration of symbol.declarations) {
                const declarationSourceFile = getSourceFileOfNode(declaration);
                if (declarationSourceFile &&
                    declarationSourceFile !== sourceFile) {
                    addReferencedFile(declarationSourceFile.resolvedPath);
                }
            }
        }

        function addReferencedFile(referencedPath: Path) {
            if (!referencedFiles) {
                referencedFiles = createMap<true>();
            }
            referencedFiles.set(referencedPath, true);
        }
    }

    /**
     * Returns true if oldState is reusable, that is the emitKind = module/non module has not changed
     */
    export function canReuseOldState(newReferencedMap: ReadonlyMap<ReferencedSet> | undefined, oldState: Readonly<BuilderState> | undefined) {
        return oldState && !oldState.referencedMap === !newReferencedMap;
    }

    /**
     * Creates the state of file references and signature for the new program from oldState if it is safe
     */
    export function create(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState?: Readonly<BuilderState>): BuilderState {
        const fileInfos = createMap<FileInfo>();
        const referencedMap = newProgram.getCompilerOptions().module !== ModuleKind.None ? createMap<ReferencedSet>() : undefined;
        const exportedModulesMap = referencedMap ? createMap<ReferencedSet>() : undefined;
        const hasCalledUpdateShapeSignature = createMap<true>();
        const useOldState = canReuseOldState(referencedMap, oldState);

        // Create the reference map, and set the file infos
        for (const sourceFile of newProgram.getSourceFiles()) {
            const version = sourceFile.version;
            const oldInfo = useOldState ? oldState!.fileInfos.get(sourceFile.path) : undefined;
            if (referencedMap) {
                const newReferences = getReferencedFiles(newProgram, sourceFile, getCanonicalFileName);
                if (newReferences) {
                    referencedMap.set(sourceFile.path, newReferences);
                }
                // Copy old visible to outside files map
                if (useOldState) {
                    const exportedModules = oldState!.exportedModulesMap!.get(sourceFile.path);
                    if (exportedModules) {
                        exportedModulesMap!.set(sourceFile.path, exportedModules);
                    }
                }
            }
            fileInfos.set(sourceFile.path, { version, signature: oldInfo && oldInfo.signature });
        }

        return {
            fileInfos,
            referencedMap,
            exportedModulesMap,
            hasCalledUpdateShapeSignature,
            allFilesExcludingDefaultLibraryFile: undefined,
            allFileNames: undefined
        };
    }

    /**
     * Gets the files affected by the path from the program
     */
    export function getFilesAffectedBy(state: BuilderState, programOfThisState: Program, path: Path, cancellationToken: CancellationToken | undefined, computeHash: ComputeHash, cacheToUpdateSignature?: Map<string>, exportedModulesMapCache?: ComputingExportedModulesMap): ReadonlyArray<SourceFile> {
        // Since the operation could be cancelled, the signatures are always stored in the cache
        // They will be commited once it is safe to use them
        // eg when calling this api from tsserver, if there is no cancellation of the operation
        // In the other cases the affected files signatures are commited only after the iteration through the result is complete
        const signatureCache = cacheToUpdateSignature || createMap();
        const sourceFile = programOfThisState.getSourceFileByPath(path);
        if (!sourceFile) {
            return emptyArray;
        }

        if (!updateShapeSignature(state, programOfThisState, sourceFile, signatureCache, cancellationToken, computeHash, exportedModulesMapCache)) {
            return [sourceFile];
        }

        const result = (state.referencedMap ? getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit)(state, programOfThisState, sourceFile, signatureCache, cancellationToken, computeHash, exportedModulesMapCache);
        if (!cacheToUpdateSignature) {
            // Commit all the signatures in the signature cache
            updateSignaturesFromCache(state, signatureCache);
        }
        return result;
    }

    /**
     * Updates the signatures from the cache into state's fileinfo signatures
     * This should be called whenever it is safe to commit the state of the builder
     */
    export function updateSignaturesFromCache(state: BuilderState, signatureCache: Map<string>) {
        signatureCache.forEach((signature, path) => {
            state.fileInfos.get(path)!.signature = signature;
            state.hasCalledUpdateShapeSignature.set(path, true);
        });
    }

    /**
     * Returns if the shape of the signature has changed since last emit
     */
    function updateShapeSignature(state: Readonly<BuilderState>, programOfThisState: Program, sourceFile: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined, computeHash: ComputeHash, exportedModulesMapCache?: ComputingExportedModulesMap) {
        Debug.assert(!!sourceFile);
        Debug.assert(!exportedModulesMapCache || !!state.exportedModulesMap, "Compute visible to outside map only if visibleToOutsideReferencedMap present in the state");

        // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
        if (state.hasCalledUpdateShapeSignature.has(sourceFile.path) || cacheToUpdateSignature.has(sourceFile.path)) {
            return false;
        }

        const info = state.fileInfos.get(sourceFile.path);
        if (!info) return Debug.fail();

        const prevSignature = info.signature;
        let latestSignature: string;
        if (sourceFile.isDeclarationFile) {
            latestSignature = sourceFile.version;
            if (exportedModulesMapCache && latestSignature !== prevSignature) {
                // All the references in this file are exported
                const references = state.referencedMap ? state.referencedMap.get(sourceFile.path) : undefined;
                exportedModulesMapCache.set(sourceFile.path, references || false);
            }
        }
        else {
            const emitOutput = getFileEmitOutput(programOfThisState, sourceFile, /*emitOnlyDtsFiles*/ true, cancellationToken);
            if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                latestSignature = computeHash(emitOutput.outputFiles[0].text);
                if (exportedModulesMapCache && latestSignature !== prevSignature) {
                    updateExportedModules(sourceFile, emitOutput.exportedModulesFromDeclarationEmit, exportedModulesMapCache);
                }
            }
            else {
                latestSignature = prevSignature!; // TODO: GH#18217
            }

        }
        cacheToUpdateSignature.set(sourceFile.path, latestSignature);

        return !prevSignature || latestSignature !== prevSignature;
    }

    /**
     * Coverts the declaration emit result into exported modules map
     */
    function updateExportedModules(sourceFile: SourceFile, exportedModulesFromDeclarationEmit: ExportedModulesFromDeclarationEmit | undefined, exportedModulesMapCache: ComputingExportedModulesMap) {
        if (!exportedModulesFromDeclarationEmit) {
            exportedModulesMapCache.set(sourceFile.path, false);
            return;
        }

        let exportedModules: Map<true> | undefined;
        exportedModulesFromDeclarationEmit.forEach(symbol => addExportedModule(getReferencedFileFromImportedModuleSymbol(symbol)));
        exportedModulesMapCache.set(sourceFile.path, exportedModules || false);

        function addExportedModule(exportedModulePath: Path | undefined) {
            if (exportedModulePath) {
                if (!exportedModules) {
                    exportedModules = createMap<true>();
                }
                exportedModules.set(exportedModulePath, true);
            }
        }
    }

    /**
     * Updates the exported modules from cache into state's exported modules map
     * This should be called whenever it is safe to commit the state of the builder
     */
    export function updateExportedFilesMapFromCache(state: BuilderState, exportedModulesMapCache: ComputingExportedModulesMap | undefined) {
        if (exportedModulesMapCache) {
            Debug.assert(!!state.exportedModulesMap);
            exportedModulesMapCache.forEach((exportedModules, path) => {
                if (exportedModules) {
                    state.exportedModulesMap!.set(path, exportedModules);
                }
                else {
                    state.exportedModulesMap!.delete(path);
                }
            });
        }
    }

    /**
     * Get all the dependencies of the sourceFile
     */
    export function getAllDependencies(state: BuilderState, programOfThisState: Program, sourceFile: SourceFile): ReadonlyArray<string> {
        const compilerOptions = programOfThisState.getCompilerOptions();
        // With --out or --outFile all outputs go into single file, all files depend on each other
        if (compilerOptions.outFile || compilerOptions.out) {
            return getAllFileNames(state, programOfThisState);
        }

        // If this is non module emit, or its a global file, it depends on all the source files
        if (!state.referencedMap || (!isExternalModule(sourceFile) && !containsOnlyAmbientModules(sourceFile))) {
            return getAllFileNames(state, programOfThisState);
        }

        // Get the references, traversing deep from the referenceMap
        const seenMap = createMap<true>();
        const queue = [sourceFile.path];
        while (queue.length) {
            const path = queue.pop()!;
            if (!seenMap.has(path)) {
                seenMap.set(path, true);
                const references = state.referencedMap.get(path);
                if (references) {
                    const iterator = references.keys();
                    for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
                        queue.push(value as Path);
                    }
                }
            }
        }

        return arrayFrom(mapDefinedIterator(seenMap.keys(), path => {
            const file = programOfThisState.getSourceFileByPath(path as Path);
            return file ? file.fileName : path;
        }));
    }

    /**
     * Gets the names of all files from the program
     */
    function getAllFileNames(state: BuilderState, programOfThisState: Program): ReadonlyArray<string> {
        if (!state.allFileNames) {
            const sourceFiles = programOfThisState.getSourceFiles();
            state.allFileNames = sourceFiles === emptyArray ? emptyArray : sourceFiles.map(file => file.fileName);
        }
        return state.allFileNames;
    }

    /**
     * Gets the files referenced by the the file path
     */
    function getReferencedByPaths(state: Readonly<BuilderState>, referencedFilePath: Path) {
        return arrayFrom(mapDefinedIterator(state.referencedMap!.entries(), ([filePath, referencesInFile]) =>
            referencesInFile.has(referencedFilePath) ? filePath as Path : undefined
        ));
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
     * Gets all files of the program excluding the default library file
     */
    function getAllFilesExcludingDefaultLibraryFile(state: BuilderState, programOfThisState: Program, firstSourceFile: SourceFile): ReadonlyArray<SourceFile> {
        // Use cached result
        if (state.allFilesExcludingDefaultLibraryFile) {
            return state.allFilesExcludingDefaultLibraryFile;
        }

        let result: SourceFile[] | undefined;
        addSourceFile(firstSourceFile);
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
        if (compilerOptions && (compilerOptions.out || compilerOptions.outFile)) {
            return [sourceFileWithUpdatedShape];
        }
        return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
    }

    /**
     * When program emits modular code, gets the files affected by the sourceFile whose shape has changed
     */
    function getFilesAffectedByUpdatedShapeWhenModuleEmit(state: BuilderState, programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined, computeHash: ComputeHash | undefined, exportedModulesMapCache: ComputingExportedModulesMap | undefined) {
        if (!isExternalModule(sourceFileWithUpdatedShape) && !containsOnlyAmbientModules(sourceFileWithUpdatedShape)) {
            return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
        }

        const compilerOptions = programOfThisState.getCompilerOptions();
        if (compilerOptions && (compilerOptions.isolatedModules || compilerOptions.out || compilerOptions.outFile)) {
            return [sourceFileWithUpdatedShape];
        }

        // Now we need to if each file in the referencedBy list has a shape change as well.
        // Because if so, its own referencedBy files need to be saved as well to make the
        // emitting result consistent with files on disk.
        const seenFileNamesMap = createMap<SourceFile>();

        // Start with the paths this file was referenced by
        seenFileNamesMap.set(sourceFileWithUpdatedShape.path, sourceFileWithUpdatedShape);
        const queue = getReferencedByPaths(state, sourceFileWithUpdatedShape.path);
        while (queue.length > 0) {
            const currentPath = queue.pop()!;
            if (!seenFileNamesMap.has(currentPath)) {
                const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath)!;
                seenFileNamesMap.set(currentPath, currentSourceFile);
                if (currentSourceFile && updateShapeSignature(state, programOfThisState, currentSourceFile, cacheToUpdateSignature, cancellationToken, computeHash!, exportedModulesMapCache)) { // TODO: GH#18217
                    queue.push(...getReferencedByPaths(state, currentPath));
                }
            }
        }

        // Return array of values that needs emit
        // Return array of values that needs emit
        return arrayFrom(mapDefinedIterator(seenFileNamesMap.values(), value => value));
    }
}

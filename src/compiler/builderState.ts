/// <reference path="program.ts" />
namespace ts {
    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
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
        return { outputFiles, emitSkipped: emitResult.emitSkipped };

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
            outputFiles.push({ name: fileName, writeByteOrderMark, text });
        }
    }

    /**
     * Information about the source file: Its version and optional signature from last emit
     */
    interface FileInfo {
        version: string;
        signature?: string;
    }

    /**
     * Referenced files with values for the keys as referenced file's path to be true
     */
    type ReferencedSet = ReadonlyMap<true>;

    function hasSameKeys<T, U>(map1: ReadonlyMap<T> | undefined, map2: ReadonlyMap<U> | undefined) {
        if (map1 === undefined) {
            return map2 === undefined;
        }
        if (map2 === undefined) {
            return map1 === undefined;
        }
        // Has same size and every key is present in both maps
        return map1.size === map2.size && !forEachKey(map1, key => !map2.has(key));
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
                const symbol = checker.getSymbolAtLocation(importName);
                if (symbol && symbol.declarations && symbol.declarations[0]) {
                    const declarationSourceFile = getSourceFileOfNode(symbol.declarations[0]);
                    if (declarationSourceFile) {
                        addReferencedFile(declarationSourceFile.path);
                    }
                }
            }
        }

        const sourceFileDirectory = getDirectoryPath(sourceFile.path);
        // Handle triple slash references
        if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
            for (const referencedFile of sourceFile.referencedFiles) {
                const referencedPath = toPath(referencedFile.fileName, sourceFileDirectory, getCanonicalFileName);
                addReferencedFile(referencedPath);
            }
        }

        // Handle type reference directives
        if (sourceFile.resolvedTypeReferenceDirectiveNames) {
            sourceFile.resolvedTypeReferenceDirectiveNames.forEach((resolvedTypeReferenceDirective) => {
                if (!resolvedTypeReferenceDirective) {
                    return;
                }

                const fileName = resolvedTypeReferenceDirective.resolvedFileName;
                const typeFilePath = toPath(fileName, sourceFileDirectory, getCanonicalFileName);
                addReferencedFile(typeFilePath);
            });
        }

        return referencedFiles;

        function addReferencedFile(referencedPath: Path) {
            if (!referencedFiles) {
                referencedFiles = createMap<true>();
            }
            referencedFiles.set(referencedPath, true);
        }
    }

    export interface BuilderStateHost {
        /**
         * true if file names are treated with case sensitivity
         */
        useCaseSensitiveFileNames: boolean;
        /**
         * if provided this would be used this hash instead of actual file shape text for detecting changes
         */
        createHash?: (data: string) => string;
        /**
         * Called when programState is initialized, indicating if isModuleEmit is changed
         */
        onUpdateProgramInitialized(isModuleEmitChanged: boolean): void;
        onSourceFileAdd(path: Path): void;
        onSourceFileChanged(path: Path): void;
        onSourceFileRemoved(path: Path): void;
    }

    export interface BuilderStateOld {
        /**
         * Updates the program in the builder to represent new state
         */
        updateProgram(newProgram: Program): void;
        /**
         * Gets the files affected by the file path
         */
        getFilesAffectedBy(programOfThisState: Program, path: Path, cancellationToken: CancellationToken, cacheToUpdateSignature?: Map<string>): ReadonlyArray<SourceFile>;
        /**
         * Updates the signatures from the cache
         * This should be called whenever it is safe to commit the state of the builder
         */
        updateSignaturesFromCache(signatureCache: Map<string>): void;
        /**
         * Get all the dependencies of the sourceFile
         */
        getAllDependencies(programOfThisState: Program, sourceFile: SourceFile): ReadonlyArray<string>;
    }

    export interface BuilderState {
        /**
         * Information of the file eg. its version, signature etc
         */
        fileInfos: Map<FileInfo>;
        /**
         * Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
         * Otherwise undefined
         * Thus non undefined value indicates, module emit
         */
        readonly referencedMap: ReadonlyMap<ReferencedSet> | undefined;
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

    export function createBuilderState(newProgram: Program, getCanonicalFileName: GetCanonicalFileName, oldState?: BuilderState): BuilderState {
        const fileInfos = createMap<FileInfo>();
        const referencedMap = newProgram.getCompilerOptions().module !== ModuleKind.None ? createMap<ReferencedSet>() : undefined;
        const hasCalledUpdateShapeSignature = createMap<true>();
        const useOldState = oldState && !!oldState.referencedMap !== !!referencedMap;

        // Create the reference map, and set the file infos
        for (const sourceFile of newProgram.getSourceFiles()) {
            const version = sourceFile.version;
            const oldInfo = useOldState && oldState.fileInfos.get(sourceFile.path);
            if (referencedMap) {
                const newReferences = getReferencedFiles(newProgram, sourceFile, getCanonicalFileName);
                if (newReferences) {
                    referencedMap.set(sourceFile.path, newReferences);
                }
            }
            fileInfos.set(sourceFile.path, { version, signature: oldInfo && oldInfo.signature });
        }

        oldState = undefined;
        newProgram = undefined;

        return {
            fileInfos,
            referencedMap,
            hasCalledUpdateShapeSignature,
            allFilesExcludingDefaultLibraryFile: undefined,
            allFileNames: undefined
        };
    }

    export function createBuilderStateOld(host: BuilderStateHost): BuilderStateOld {
        /**
         * Create the canonical file name for identity
         */
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        /**
         * Computing hash to for signature verification
         */
        const computeHash = host.createHash || identity;

        /**
         * Information of the file eg. its version, signature etc
         */
        const fileInfos = createMap<FileInfo>();

        /**
         * Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
         * Otherwise undefined
         */
        let referencedMap: Map<ReferencedSet> | undefined;

        /**
         * Get the files affected by the source file.
         * This is dependent on whether its a module emit or not and hence function expression
         */
        let getEmitDependentFilesAffectedBy: (programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined) => ReadonlyArray<SourceFile>;

        /**
         * Map of files that have already called update signature.
         * That means hence forth these files are assumed to have
         * no change in their signature for this version of the program
         */
        const hasCalledUpdateShapeSignature = createMap<true>();

        /**
         * Cache of all files excluding default library file for the current program
         */
        let allFilesExcludingDefaultLibraryFile: ReadonlyArray<SourceFile> | undefined;
        /**
         * Cache of all the file names
         */
        let allFileNames: ReadonlyArray<string> | undefined;

        return {
            updateProgram,
            getFilesAffectedBy,
            getAllDependencies,
            updateSignaturesFromCache
        };

        /**
         * Update current state to reflect new program
         * Updates changed files, references, file infos etc
         */
        function updateProgram(newProgram: Program) {
            const newProgramHasModuleEmit = newProgram.getCompilerOptions().module !== ModuleKind.None;
            const oldReferencedMap = referencedMap;
            const isModuleEmitChanged = !!referencedMap !== newProgramHasModuleEmit;
            if (isModuleEmitChanged) {
                // Changes in the module emit, clear out everything and initialize as if first time

                // Clear file information
                fileInfos.clear();

                // Update the reference map creation
                referencedMap = newProgramHasModuleEmit ? createMap<ReferencedSet>() : undefined;

                // Update the module emit
                getEmitDependentFilesAffectedBy = newProgramHasModuleEmit ?
                    getFilesAffectedByUpdatedShapeWhenModuleEmit :
                    getFilesAffectedByUpdatedShapeWhenNonModuleEmit;
            }
            host.onUpdateProgramInitialized(isModuleEmitChanged);

            // Clear datas that cant be retained beyond previous state
            hasCalledUpdateShapeSignature.clear();
            allFilesExcludingDefaultLibraryFile = undefined;
            allFileNames = undefined;

            // Create the reference map and update changed files
            for (const sourceFile of newProgram.getSourceFiles()) {
                const version = sourceFile.version;
                const newReferences = referencedMap && getReferencedFiles(newProgram, sourceFile, getCanonicalFileName);
                const oldInfo = fileInfos.get(sourceFile.path);
                let oldReferences: ReferencedSet;

                // Register changed file if its new file or we arent reusing old state
                if (!oldInfo) {
                    // New file: Set the file info
                    fileInfos.set(sourceFile.path, { version });
                    host.onSourceFileAdd(sourceFile.path);
                }
                // versions dont match
                else if (oldInfo.version !== version ||
                    // Referenced files changed
                    !hasSameKeys(newReferences, (oldReferences = oldReferencedMap && oldReferencedMap.get(sourceFile.path))) ||
                    // Referenced file was deleted in the new program
                    newReferences && forEachKey(newReferences, path => !newProgram.getSourceFileByPath(path as Path) && fileInfos.has(path))) {

                    // Changed file: Update the version, set as changed file
                    oldInfo.version = version;
                    host.onSourceFileChanged(sourceFile.path);
                }

                // Set the references
                if (newReferences) {
                    referencedMap.set(sourceFile.path, newReferences);
                }
                else if (referencedMap) {
                    referencedMap.delete(sourceFile.path);
                }
            }

            // For removed files, remove the semantic diagnostics and file info
            if (fileInfos.size > newProgram.getSourceFiles().length) {
                fileInfos.forEach((_value, path) => {
                    if (!newProgram.getSourceFileByPath(path as Path)) {
                        fileInfos.delete(path);
                        host.onSourceFileRemoved(path as Path);
                        if (referencedMap) {
                            referencedMap.delete(path);
                        }
                    }
                });
            }
        }

        /**
         * Gets the files affected by the path from the program
         */
        function getFilesAffectedBy(programOfThisState: Program, path: Path, cancellationToken: CancellationToken | undefined, cacheToUpdateSignature?: Map<string>): ReadonlyArray<SourceFile> {
            // Since the operation could be cancelled, the signatures are always stored in the cache
            // They will be commited once it is safe to use them
            // eg when calling this api from tsserver, if there is no cancellation of the operation
            // In the other cases the affected files signatures are commited only after the iteration through the result is complete
            const signatureCache = cacheToUpdateSignature || createMap();
            const sourceFile = programOfThisState.getSourceFileByPath(path);
            if (!sourceFile) {
                return emptyArray;
            }

            if (!updateShapeSignature(programOfThisState, sourceFile, signatureCache, cancellationToken)) {
                return [sourceFile];
            }

            const result = getEmitDependentFilesAffectedBy(programOfThisState, sourceFile, signatureCache, cancellationToken);
            if (!cacheToUpdateSignature) {
                // Commit all the signatures in the signature cache
                updateSignaturesFromCache(signatureCache);
            }
            return result;
        }

        /**
         * Get all the dependencies of the sourceFile
         */
        function getAllDependencies(programOfThisState: Program, sourceFile: SourceFile): ReadonlyArray<string> {
            const compilerOptions = programOfThisState.getCompilerOptions();
            // With --out or --outFile all outputs go into single file, all files depend on each other
            if (compilerOptions.outFile || compilerOptions.out) {
                return getAllFileNames(programOfThisState);
            }

            // If this is non module emit, or its a global file, it depends on all the source files
            if (!referencedMap || (!isExternalModule(sourceFile) && !containsOnlyAmbientModules(sourceFile))) {
                return getAllFileNames(programOfThisState);
            }

            // Get the references, traversing deep from the referenceMap
            const seenMap = createMap<true>();
            const queue = [sourceFile.path];
            while (queue.length) {
                const path = queue.pop();
                if (!seenMap.has(path)) {
                    seenMap.set(path, true);
                    const references = referencedMap.get(path);
                    if (references) {
                        const iterator = references.keys();
                        for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
                            queue.push(value as Path);
                        }
                    }
                }
            }

            return flatMapIter(seenMap.keys(), path => {
                const file = programOfThisState.getSourceFileByPath(path as Path);
                if (file) {
                    return file.fileName;
                }
                return path;
            });
        }

        /**
         * Gets the names of all files from the program
         */
        function getAllFileNames(programOfThisState: Program): ReadonlyArray<string> {
            if (!allFileNames) {
                allFileNames = programOfThisState.getSourceFiles().map(file => file.fileName);
            }
            return allFileNames;
        }

        /**
         * Updates the signatures from the cache
         * This should be called whenever it is safe to commit the state of the builder
         */
        function updateSignaturesFromCache(signatureCache: Map<string>) {
            signatureCache.forEach((signature, path) => {
                fileInfos.get(path).signature = signature;
                hasCalledUpdateShapeSignature.set(path, true);
            });
        }

        /**
         * Returns if the shape of the signature has changed since last emit
         * Note that it also updates the current signature as the latest signature for the file
         */
        function updateShapeSignature(program: Program, sourceFile: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined) {
            Debug.assert(!!sourceFile);

            // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
            if (hasCalledUpdateShapeSignature.has(sourceFile.path) || cacheToUpdateSignature.has(sourceFile.path)) {
                return false;
            }

            const info = fileInfos.get(sourceFile.path);
            Debug.assert(!!info);

            const prevSignature = info.signature;
            let latestSignature: string;
            if (sourceFile.isDeclarationFile) {
                latestSignature = sourceFile.version;
            }
            else {
                const emitOutput = getFileEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ true, cancellationToken);
                if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                    latestSignature = computeHash(emitOutput.outputFiles[0].text);
                }
                else {
                    latestSignature = prevSignature;
                }
            }
            cacheToUpdateSignature.set(sourceFile.path, latestSignature);

            return !prevSignature || latestSignature !== prevSignature;
        }

        /**
         * Gets the files referenced by the the file path
         */
        function getReferencedByPaths(referencedFilePath: Path) {
            return mapDefinedIter(referencedMap.entries(), ([filePath, referencesInFile]) =>
                referencesInFile.has(referencedFilePath) ? filePath as Path : undefined
            );
        }

        /**
         * Gets all files of the program excluding the default library file
         */
        function getAllFilesExcludingDefaultLibraryFile(program: Program, firstSourceFile: SourceFile): ReadonlyArray<SourceFile> {
            // Use cached result
            if (allFilesExcludingDefaultLibraryFile) {
                return allFilesExcludingDefaultLibraryFile;
            }

            let result: SourceFile[];
            addSourceFile(firstSourceFile);
            for (const sourceFile of program.getSourceFiles()) {
                if (sourceFile !== firstSourceFile) {
                    addSourceFile(sourceFile);
                }
            }
            allFilesExcludingDefaultLibraryFile = result || emptyArray;
            return allFilesExcludingDefaultLibraryFile;

            function addSourceFile(sourceFile: SourceFile) {
                if (!program.isSourceFileDefaultLibrary(sourceFile)) {
                    (result || (result = [])).push(sourceFile);
                }
            }
        }

        /**
         * When program emits non modular code, gets the files affected by the sourceFile whose shape has changed
         */
        function getFilesAffectedByUpdatedShapeWhenNonModuleEmit(programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile) {
            const compilerOptions = programOfThisState.getCompilerOptions();
            // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
            // so returning the file itself is good enough.
            if (compilerOptions && (compilerOptions.out || compilerOptions.outFile)) {
                return [sourceFileWithUpdatedShape];
            }
            return getAllFilesExcludingDefaultLibraryFile(programOfThisState, sourceFileWithUpdatedShape);
        }

        /**
         * When program emits modular code, gets the files affected by the sourceFile whose shape has changed
         */
        function getFilesAffectedByUpdatedShapeWhenModuleEmit(programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined) {
            if (!isExternalModule(sourceFileWithUpdatedShape) && !containsOnlyAmbientModules(sourceFileWithUpdatedShape)) {
                return getAllFilesExcludingDefaultLibraryFile(programOfThisState, sourceFileWithUpdatedShape);
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
            const queue = getReferencedByPaths(sourceFileWithUpdatedShape.path);
            while (queue.length > 0) {
                const currentPath = queue.pop();
                if (!seenFileNamesMap.has(currentPath)) {
                    const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath);
                    seenFileNamesMap.set(currentPath, currentSourceFile);
                    if (currentSourceFile && updateShapeSignature(programOfThisState, currentSourceFile, cacheToUpdateSignature, cancellationToken)) {
                        queue.push(...getReferencedByPaths(currentPath));
                    }
                }
            }

            // Return array of values that needs emit
            return flatMapIter(seenFileNamesMap.values(), value => value);
        }
    }
}

/*@internal*/
namespace ts.BuilderState {
    type ComputeHash = (data: string) => string;

    /**
     * Gets the files affected by the path from the program
     */
    export function getFilesAffectedBy(state: BuilderState, programOfThisState: Program, path: Path, cancellationToken: CancellationToken | undefined, computeHash?: ComputeHash, cacheToUpdateSignature?: Map<string>): ReadonlyArray<SourceFile> {
        // Since the operation could be cancelled, the signatures are always stored in the cache
        // They will be commited once it is safe to use them
        // eg when calling this api from tsserver, if there is no cancellation of the operation
        // In the other cases the affected files signatures are commited only after the iteration through the result is complete
        const signatureCache = cacheToUpdateSignature || createMap();
        const sourceFile = programOfThisState.getSourceFileByPath(path);
        if (!sourceFile) {
            return emptyArray;
        }

        if (!updateShapeSignature(state, programOfThisState, sourceFile, signatureCache, cancellationToken, computeHash)) {
            return [sourceFile];
        }

        const result = (state.referencedMap ? getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit)(state, programOfThisState, sourceFile, signatureCache, cancellationToken, computeHash);
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
            state.fileInfos.get(path).signature = signature;
            state.hasCalledUpdateShapeSignature.set(path, true);
        });
    }

    /**
     * Returns if the shape of the signature has changed since last emit
     */
    function updateShapeSignature(state: Readonly<BuilderState>, programOfThisState: Program, sourceFile: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined, computeHash: ComputeHash | undefined) {
        Debug.assert(!!sourceFile);

        // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
        if (state.hasCalledUpdateShapeSignature.has(sourceFile.path) || cacheToUpdateSignature.has(sourceFile.path)) {
            return false;
        }

        const info = state.fileInfos.get(sourceFile.path);
        Debug.assert(!!info);

        const prevSignature = info.signature;
        let latestSignature: string;
        if (sourceFile.isDeclarationFile) {
            latestSignature = sourceFile.version;
        }
        else {
            const emitOutput = getFileEmitOutput(programOfThisState, sourceFile, /*emitOnlyDtsFiles*/ true, cancellationToken);
            if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                latestSignature = (computeHash || identity)(emitOutput.outputFiles[0].text);
            }
            else {
                latestSignature = prevSignature;
            }
        }
        cacheToUpdateSignature.set(sourceFile.path, latestSignature);

        return !prevSignature || latestSignature !== prevSignature;
    }

    /**
     * Gets the files referenced by the the file path
     */
    function getReferencedByPaths(state: Readonly<BuilderState>, referencedFilePath: Path) {
        return mapDefinedIter(state.referencedMap.entries(), ([filePath, referencesInFile]) =>
            referencesInFile.has(referencedFilePath) ? filePath as Path : undefined
        );
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

        let result: SourceFile[];
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
    function getFilesAffectedByUpdatedShapeWhenModuleEmit(state: BuilderState, programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile, cacheToUpdateSignature: Map<string>, cancellationToken: CancellationToken | undefined, computeHash: ComputeHash | undefined) {
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
            const currentPath = queue.pop();
            if (!seenFileNamesMap.has(currentPath)) {
                const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath);
                seenFileNamesMap.set(currentPath, currentSourceFile);
                if (currentSourceFile && updateShapeSignature(state, programOfThisState, currentSourceFile, cacheToUpdateSignature, cancellationToken, computeHash)) {
                    queue.push(...getReferencedByPaths(state, currentPath));
                }
            }
        }

        // Return array of values that needs emit
        return flatMapIter(seenFileNamesMap.values(), value => value);
    }
}

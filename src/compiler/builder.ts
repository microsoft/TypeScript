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

    /* @internal */
    export function getFileEmitOutput(program: Program, sourceFile: SourceFile, emitOnlyDtsFiles: boolean,
        cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): EmitOutput {
        const outputFiles: OutputFile[] = [];
        const emitResult = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
            return { outputFiles, emitSkipped: emitResult.emitSkipped };

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
            outputFiles.push({ name: fileName, writeByteOrderMark, text });
        }
    }

    function hasSameKeys<T, U>(map1: ReadonlyMap<T> | undefined, map2: ReadonlyMap<U> | undefined) {
        if (map1 === undefined) {
            return map2 === undefined;
        }
        if (map2 === undefined) {
            return map1 === undefined;
        }
        // Has same size and every key is present in both maps
        return map1.size === map2.size && !forEachEntry(map1, (_value, key) => !map2.has(key));
    }

    /**
     * State on which you can query affected files (files to save) and get semantic diagnostics(with their cache managed in the object)
     * Note that it is only safe to pass BuilderState as old state when creating new state, when
     * - If iterator's next method to get next affected file is never called
     * - Iteration of single changed file and its dependencies (iteration through all of its affected files) is complete
     */
    export interface BuilderState {
        /**
         * The map of file infos, where there is entry for each file in the program
         * The entry is signature of the file (from last emit) or empty string
         */
        fileInfos: ReadonlyMap<Readonly<FileInfo>>;

        /**
         * Returns true if module gerneration is not ModuleKind.None
         */
        isModuleEmit: boolean;

        /**
         * Map of file referenced or undefined if it wasnt module emit
         * The entry is present only if file references other files
         * The key is path of file and value is referenced map for that file (for every file referenced, there is entry in the set)
         */
        referencedMap: ReadonlyMap<ReferencedSet> | undefined;

        /**
         * Set of source file's paths that have been changed, either in resolution or versions
         */
        changedFilesSet: ReadonlyMap<true>;

        /**
         * Set of cached semantic diagnostics per file
         */
        semanticDiagnosticsPerFile: ReadonlyMap<ReadonlyArray<Diagnostic>>;

        /**
         * Returns true if this state is safe to use as oldState
         */
        canCreateNewStateFrom(): boolean;

        /**
         * Gets the files affected by the file path
         * This api is only for internal use
         */
        /* @internal */
        getFilesAffectedBy(programOfThisState: Program, path: Path): ReadonlyArray<SourceFile>;

        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         */
        emitNextAffectedFile(programOfThisState: Program, writeFileCallback: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileEmitResult | undefined;

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files
         */
        getSemanticDiagnostics(programOfThisState: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic>;
    }

    /**
     * Information about the source file: Its version and optional signature from last emit
     */
    export interface FileInfo {
        version: string;
        signature: string;
    }

    export interface AffectedFileEmitResult extends EmitResult {
        affectedFile?: SourceFile;
    }

    /**
     * Referenced files with values for the keys as referenced file's path to be true
     */
    export type ReferencedSet = ReadonlyMap<true>;

    export interface BuilderOptions {
        getCanonicalFileName: GetCanonicalFileName;
        computeHash: (data: string) => string;
    }

    export function createBuilderState(newProgram: Program, options: BuilderOptions, oldState?: Readonly<BuilderState>): BuilderState {
        const fileInfos = createMap<FileInfo>();
        const isModuleEmit = newProgram.getCompilerOptions().module !== ModuleKind.None;
        const referencedMap = isModuleEmit ? createMap<ReferencedSet>() : undefined;

        const semanticDiagnosticsPerFile = createMap<ReadonlyArray<Diagnostic>>();
        /** The map has key by source file's path that has been changed */
        const changedFilesSet = createMap<true>();
        const hasShapeChanged = createMap<true>();
        let allFilesExcludingDefaultLibraryFile: ReadonlyArray<SourceFile> | undefined;

        // Iterator datas
        let affectedFiles: ReadonlyArray<SourceFile> | undefined;
        let affectedFilesIndex = 0;
        const seenAffectedFiles = createMap<true>();
        const getEmitDependentFilesAffectedBy = isModuleEmit ?
            getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit;

        const useOldState = oldState && oldState.isModuleEmit === isModuleEmit;
        if (useOldState) {
            Debug.assert(oldState.canCreateNewStateFrom(), "Cannot use this state as old state");
            Debug.assert(!forEachEntry(oldState.changedFilesSet, (_value, path) => oldState.semanticDiagnosticsPerFile.has(path)), "Semantic diagnostics shouldnt be available for changed files");

            copyEntries(oldState.changedFilesSet, changedFilesSet);
            copyEntries(oldState.semanticDiagnosticsPerFile, semanticDiagnosticsPerFile);
        }

        for (const sourceFile of newProgram.getSourceFiles()) {
            const version = sourceFile.version;
            let oldInfo: Readonly<FileInfo>;
            let oldReferences: ReferencedSet;
            const newReferences = referencedMap && getReferencedFiles(newProgram, sourceFile);

            // Register changed file
            // if not using old state so every file is changed
            if (!useOldState ||
                // File wasnt present earlier
                !(oldInfo = oldState.fileInfos.get(sourceFile.path)) ||
                // versions dont match
                oldInfo.version !== version ||
                // Referenced files changed
                !hasSameKeys(newReferences, (oldReferences = oldState.referencedMap && oldState.referencedMap.get(sourceFile.path))) ||
                // Referenced file was deleted
                newReferences && forEachEntry(newReferences, (_value, path) => oldState.fileInfos.has(path) && !newProgram.getSourceFileByPath(path as Path))) {
                changedFilesSet.set(sourceFile.path, true);
                // All changed files need to re-evaluate its semantic diagnostics
                semanticDiagnosticsPerFile.delete(sourceFile.path);
            }

            if (newReferences) {
                referencedMap.set(sourceFile.path, newReferences);
            }
            fileInfos.set(sourceFile.path, { version, signature: oldInfo && oldInfo.signature });
        }

        // For removed files, remove the semantic diagnostics removed files as changed
        if (useOldState) {
            oldState.fileInfos.forEach((_value, path) => !fileInfos.has(path) && semanticDiagnosticsPerFile.delete(path));
        }

        // Set the old state and program to undefined to ensure we arent keeping them alive hence forward
        oldState = undefined;
        newProgram = undefined;

        return {
            fileInfos,
            isModuleEmit,
            referencedMap,
            changedFilesSet,
            semanticDiagnosticsPerFile,
            canCreateNewStateFrom,
            getFilesAffectedBy,
            emitNextAffectedFile,
            getSemanticDiagnostics
        };

        /**
         * Can use this state as old State if we have iterated through all affected files present
         */
        function canCreateNewStateFrom() {
            return !affectedFiles || affectedFiles.length <= affectedFilesIndex;
        }

        /**
         * Gets the files affected by the path from the program
         */
        function getFilesAffectedBy(programOfThisState: Program, path: Path): ReadonlyArray<SourceFile> {
            const sourceFile = programOfThisState.getSourceFileByPath(path);
            if (!sourceFile) {
                return emptyArray;
            }

            if (!updateShapeSignature(programOfThisState, sourceFile)) {
                return [sourceFile];
            }

            return getEmitDependentFilesAffectedBy(programOfThisState, sourceFile);
        }

        /**
         * Emits the next affected file, and returns the EmitResult along with source files emitted
         * Returns undefined when iteration is complete
         */
        function emitNextAffectedFile(programOfThisState: Program, writeFileCallback: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileEmitResult | undefined {
            if (affectedFiles) {
                while (affectedFilesIndex < affectedFiles.length) {
                    const affectedFile = affectedFiles[affectedFilesIndex];
                    affectedFilesIndex++;
                    if (!seenAffectedFiles.has(affectedFile.path)) {
                        seenAffectedFiles.set(affectedFile.path, true);

                        // Emit the affected file
                        const result = programOfThisState.emit(affectedFile, writeFileCallback, cancellationToken, /*emitOnlyDtsFiles*/ false, customTransformers) as AffectedFileEmitResult;
                        result.affectedFile = affectedFile;
                        return result;
                    }
                }

                affectedFiles = undefined;
            }

            // Get next changed file
            const nextKey = changedFilesSet.keys().next();
            if (nextKey.done) {
                // Done
                return undefined;
            }

            const compilerOptions = programOfThisState.getCompilerOptions();
            // With --out or --outFile all outputs go into single file, do it only once
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(semanticDiagnosticsPerFile.size === 0);
                changedFilesSet.clear();
                return programOfThisState.emit(/*targetSourceFile*/ undefined, writeFileCallback, cancellationToken, /*emitOnlyDtsFiles*/ false, customTransformers);
            }

            // Get next batch of affected files
            changedFilesSet.delete(nextKey.value);
            affectedFilesIndex = 0;
            affectedFiles = getFilesAffectedBy(programOfThisState, nextKey.value as Path);

            // Clear the semantic diagnostic of affected files
            affectedFiles.forEach(affectedFile => semanticDiagnosticsPerFile.delete(affectedFile.path));

            return emitNextAffectedFile(programOfThisState, writeFileCallback, cancellationToken, customTransformers);
        }

        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files
         */
        function getSemanticDiagnostics(programOfThisState: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
            const compilerOptions = programOfThisState.getCompilerOptions();
            if (compilerOptions.outFile || compilerOptions.out) {
                Debug.assert(semanticDiagnosticsPerFile.size === 0);
                // We dont need to cache the diagnostics just return them from program
                return programOfThisState.getSemanticDiagnostics(sourceFile, cancellationToken);
            }

            if (sourceFile) {
                return getSemanticDiagnosticsOfFile(programOfThisState, sourceFile, cancellationToken);
            }

            let diagnostics: Diagnostic[];
            for (const sourceFile of programOfThisState.getSourceFiles()) {
                diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(programOfThisState, sourceFile, cancellationToken));
            }
            return diagnostics || emptyArray;
        }

        /**
         * Gets the semantic diagnostics either from cache if present, or otherwise from program and caches it
         * Note that it is assumed that the when asked about semantic diagnostics, the file has been taken out of affected files/changed file set
         */
        function getSemanticDiagnosticsOfFile(program: Program, sourceFile: SourceFile, cancellationToken?: CancellationToken): ReadonlyArray<Diagnostic> {
            const path = sourceFile.path;
            const cachedDiagnostics = semanticDiagnosticsPerFile.get(path);
            // Report the semantic diagnostics from the cache if we already have those diagnostics present
            if (cachedDiagnostics) {
                return cachedDiagnostics;
            }

            // Diagnostics werent cached, get them from program, and cache the result
            const diagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
            semanticDiagnosticsPerFile.set(path, diagnostics);
            return diagnostics;
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
        * Returns if the shape of the signature has changed since last emit
        * Note that it also updates the current signature as the latest signature for the file
        */
        function updateShapeSignature(program: Program, sourceFile: SourceFile) {
            Debug.assert(!!sourceFile);

            // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
            if (hasShapeChanged.has(sourceFile.path)) {
                return false;
            }

            hasShapeChanged.set(sourceFile.path, true);
            const info = fileInfos.get(sourceFile.path);
            Debug.assert(!!info);

            const prevSignature = info.signature;
            let latestSignature: string;
            if (sourceFile.isDeclarationFile) {
                latestSignature = sourceFile.version;
                info.signature = latestSignature;
            }
            else {
                const emitOutput = getFileEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ true);
                if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                    latestSignature = options.computeHash(emitOutput.outputFiles[0].text);
                    info.signature = latestSignature;
                }
                else {
                    latestSignature = prevSignature;
                }
            }

            return !prevSignature || latestSignature !== prevSignature;
        }

        /**
         * Gets the referenced files for a file from the program with values for the keys as referenced file's path to be true
         */
        function getReferencedFiles(program: Program, sourceFile: SourceFile): Map<true> | undefined {
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
                    const referencedPath = toPath(referencedFile.fileName, sourceFileDirectory, options.getCanonicalFileName);
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
                    const typeFilePath = toPath(fileName, sourceFileDirectory, options.getCanonicalFileName);
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
        function getFilesAffectedByUpdatedShapeWhenModuleEmit(programOfThisState: Program, sourceFileWithUpdatedShape: SourceFile) {
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
                    if (currentSourceFile && updateShapeSignature(programOfThisState, currentSourceFile)) {
                        queue.push(...getReferencedByPaths(currentPath));
                    }
                }
            }

            // Return array of values that needs emit
            return flatMapIter(seenFileNamesMap.values(), value => value);
        }
    }
}

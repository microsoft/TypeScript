/// <reference path="program.ts" />

namespace ts {
    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
    }

    export interface EmitOutputDetailed extends EmitOutput {
        diagnostics: Diagnostic[];
        sourceMaps: SourceMapData[];
        emittedSourceFiles: SourceFile[];
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }

    export function getFileEmitOutput(program: Program, sourceFile: SourceFile, emitOnlyDtsFiles: boolean, isDetailed: boolean,
        cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): EmitOutput | EmitOutputDetailed {
        const outputFiles: OutputFile[] = [];
        let emittedSourceFiles: SourceFile[];
        const emitResult = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
        if (!isDetailed) {
            return { outputFiles, emitSkipped: emitResult.emitSkipped };
        }

        return {
            outputFiles,
            emitSkipped: emitResult.emitSkipped,
            diagnostics: emitResult.diagnostics,
            sourceMaps: emitResult.sourceMaps,
            emittedSourceFiles
        };

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean, _onError: (message: string) => void, sourceFiles: SourceFile[]) {
            outputFiles.push({ name: fileName, writeByteOrderMark, text });
            if (isDetailed) {
                emittedSourceFiles = addRange(emittedSourceFiles, sourceFiles);
            }
        }
    }
}

/* @internal */
namespace ts {
    export interface Builder {
        /** Called to inform builder about new program */
        updateProgram(newProgram: Program): void;
        /** Gets the files affected by the file path */
        getFilesAffectedBy(program: Program, path: Path): ReadonlyArray<SourceFile>;
        /** Emits the given file */
        emitFile(program: Program, path: Path): EmitOutput;

        /** Emit the changed files and clear the cache of the changed files */
        emitChangedFiles(program: Program): EmitOutputDetailed[];
        /** When called gets the semantic diagnostics for the program. It also caches the diagnostics and manage them */
        getSemanticDiagnostics(program: Program, cancellationToken?: CancellationToken): Diagnostic[];

        /** Called to reset the status of the builder */
        clear(): void;
    }

    interface EmitHandler {
        /**
         * Called when sourceFile is added to the program
         */
        onAddSourceFile(program: Program, sourceFile: SourceFile): void;
        /**
         * Called when sourceFile is removed from the program
         */
        onRemoveSourceFile(path: Path): void;
        /**
         * For all source files, either "onUpdateSourceFile" or "onUpdateSourceFileWithSameVersion" will be called.
         * If the builder is sure that the source file needs an update, "onUpdateSourceFile" will be called;
         * otherwise "onUpdateSourceFileWithSameVersion" will be called.
         */
        onUpdateSourceFile(program: Program, sourceFile: SourceFile): void;
        /**
         * For all source files, either "onUpdateSourceFile" or "onUpdateSourceFileWithSameVersion" will be called.
         * If the builder is sure that the source file needs an update, "onUpdateSourceFile" will be called;
         * otherwise "onUpdateSourceFileWithSameVersion" will be called.
         * This function should return whether the source file should be marked as changed (meaning that something associated with file has changed, e.g. module resolution)
         */
        onUpdateSourceFileWithSameVersion(program: Program, sourceFile: SourceFile): boolean;
        /**
         * Gets the files affected by the script info which has updated shape from the known one
         */
        getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile): ReadonlyArray<SourceFile>;
    }

    interface FileInfo {
        version: string;
        signature: string;
    }

    export interface BuilderOptions {
        getCanonicalFileName: (fileName: string) => string;
        getEmitOutput: (program: Program, sourceFile: SourceFile, emitOnlyDtsFiles: boolean, isDetailed: boolean) => EmitOutput | EmitOutputDetailed;
        computeHash: (data: string) => string;
        shouldEmitFile: (sourceFile: SourceFile) => boolean;
    }

    export function createBuilder(options: BuilderOptions): Builder {
        let isModuleEmit: boolean | undefined;
        const fileInfos = createMap<FileInfo>();
        const semanticDiagnosticsPerFile = createMap<ReadonlyArray<Diagnostic>>();
        /** The map has key by source file's path that has been changed */
        const changedFileNames = createMap<true>();
        let emitHandler: EmitHandler;
        return {
            updateProgram,
            getFilesAffectedBy,
            emitFile,
            emitChangedFiles,
            getSemanticDiagnostics,
            clear
        };

        function createProgramGraph(program: Program) {
            const currentIsModuleEmit = program.getCompilerOptions().module !== ModuleKind.None;
            if (isModuleEmit !== currentIsModuleEmit) {
                isModuleEmit = currentIsModuleEmit;
                emitHandler = isModuleEmit ? getModuleEmitHandler() : getNonModuleEmitHandler();
                fileInfos.clear();
                semanticDiagnosticsPerFile.clear();
            }
            mutateMap(
                fileInfos,
                arrayToMap(program.getSourceFiles(), sourceFile => sourceFile.path),
                {
                    // Add new file info
                    createNewValue: (_path, sourceFile) => addNewFileInfo(program, sourceFile),
                    // Remove existing file info
                    onDeleteValue: removeExistingFileInfo,
                    // We will update in place instead of deleting existing value and adding new one
                    onExistingValue: (existingInfo, sourceFile) => updateExistingFileInfo(program, existingInfo, sourceFile)
                }
            );
        }

        function registerChangedFile(path: Path) {
            changedFileNames.set(path, true);
            // All changed files need to re-evaluate its semantic diagnostics
            semanticDiagnosticsPerFile.delete(path);
        }

        function addNewFileInfo(program: Program, sourceFile: SourceFile): FileInfo {
            registerChangedFile(sourceFile.path);
            emitHandler.onAddSourceFile(program, sourceFile);
            return { version: sourceFile.version, signature: undefined };
        }

        function removeExistingFileInfo(_existingFileInfo: FileInfo, path: Path) {
            registerChangedFile(path);
            emitHandler.onRemoveSourceFile(path);
        }

        function updateExistingFileInfo(program: Program, existingInfo: FileInfo, sourceFile: SourceFile) {
            if (existingInfo.version !== sourceFile.version) {
                registerChangedFile(sourceFile.path);
                existingInfo.version = sourceFile.version;
                emitHandler.onUpdateSourceFile(program, sourceFile);
            }
            else if (emitHandler.onUpdateSourceFileWithSameVersion(program, sourceFile)) {
                registerChangedFile(sourceFile.path);
            }
        }

        function ensureProgramGraph(program: Program) {
            if (!emitHandler) {
                createProgramGraph(program);
            }
        }

        function updateProgram(newProgram: Program) {
            if (emitHandler) {
                createProgramGraph(newProgram);
            }
        }

        function getFilesAffectedBy(program: Program, path: Path): ReadonlyArray<SourceFile> {
            ensureProgramGraph(program);

            const sourceFile = program.getSourceFileByPath(path);
            const info = fileInfos.get(path);
            if (!info || !updateShapeSignature(program, sourceFile, info)) {
                return sourceFile && [sourceFile] || emptyArray;
            }

            Debug.assert(!!sourceFile);
            return emitHandler.getFilesAffectedByUpdatedShape(program, sourceFile);
        }

        function emitFile(program: Program, path: Path) {
            ensureProgramGraph(program);
            const sourceFile = program.getSourceFileByPath(path);
            if (!fileInfos.has(path) || options.shouldEmitFile(sourceFile)) {
                return { outputFiles: [], emitSkipped: true };
            }

            return options.getEmitOutput(program, program.getSourceFileByPath(path), /*emitOnlyDtsFiles*/ false, /*isDetailed*/ false);
        }

        function enumerateChangedFilesSet(
            program: Program,
            onAffectedFile: (sourceFile: SourceFile) => void
        ) {
            changedFileNames.forEach((_true, path) => {
                const affectedFiles = getFilesAffectedBy(program, path as Path);
                for (const file of affectedFiles) {
                    onAffectedFile(file);
                }
            });
        }

        function enumerateChangedFilesEmitOutput(
            program: Program,
            emitOnlyDtsFiles: boolean,
            onEmitOutput: (emitOutput: EmitOutputDetailed) => void
        ) {
            const seenFiles = createMap<true>();
            enumerateChangedFilesSet(program, sourceFile => {
                if (!seenFiles.has(sourceFile.path)) {
                    seenFiles.set(sourceFile.path, true);
                    // Any affected file shouldnt have the cached diagnostics
                    semanticDiagnosticsPerFile.delete(sourceFile.path);

                    const emitOutput = options.getEmitOutput(program, sourceFile, emitOnlyDtsFiles, /*isDetailed*/ true) as EmitOutputDetailed;

                    // mark all the emitted source files as seen
                    if (emitOutput.emittedSourceFiles) {
                        for (const file of emitOutput.emittedSourceFiles) {
                            seenFiles.set(file.path, true);
                        }
                    }

                    onEmitOutput(emitOutput);
                }
            });
        }

        function emitChangedFiles(program: Program): EmitOutputDetailed[] {
            ensureProgramGraph(program);
            const result: EmitOutputDetailed[] = [];
            enumerateChangedFilesEmitOutput(program, /*emitOnlyDtsFiles*/ false, emitOutput => result.push(emitOutput));
            changedFileNames.clear();
            return result;
        }

        function getSemanticDiagnostics(program: Program, cancellationToken?: CancellationToken): Diagnostic[] {
            ensureProgramGraph(program);

            // Ensure that changed files have cleared their respective
            enumerateChangedFilesSet(program, sourceFile => semanticDiagnosticsPerFile.delete(sourceFile.path));

            let diagnostics: Diagnostic[];
            for (const sourceFile of program.getSourceFiles()) {
                const path = sourceFile.path;
                const cachedDiagnostics = semanticDiagnosticsPerFile.get(path);
                // Report the semantic diagnostics from the cache if we already have those diagnostics present
                if (cachedDiagnostics) {
                    diagnostics = addRange(diagnostics, cachedDiagnostics);
                }
                else {
                    // Diagnostics werent cached, get them from program, and cache the result
                    const cachedDiagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
                    semanticDiagnosticsPerFile.set(path, cachedDiagnostics);
                    diagnostics = addRange(diagnostics, cachedDiagnostics);
                }
            }
            return diagnostics || emptyArray;
        }

        function clear() {
            isModuleEmit = undefined;
            emitHandler = undefined;
            fileInfos.clear();
            semanticDiagnosticsPerFile.clear();
            changedFileNames.clear();
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
         * @return {boolean} indicates if the shape signature has changed since last update.
         */
        function updateShapeSignature(program: Program, sourceFile: SourceFile, info: FileInfo) {
            const prevSignature = info.signature;
            let latestSignature: string;
            if (sourceFile.isDeclarationFile) {
                latestSignature = options.computeHash(sourceFile.text);
                info.signature = latestSignature;
            }
            else {
                const emitOutput = options.getEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ true, /*isDetailed*/ false);
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
         * Gets all files of the program excluding the default library file
         */
        function getAllFilesExcludingDefaultLibraryFile(program: Program, firstSourceFile: SourceFile): ReadonlyArray<SourceFile> {
            let result: SourceFile[];
            for (const sourceFile of program.getSourceFiles()) {
                if (sourceFile !== firstSourceFile) {
                    addSourceFile(sourceFile);
                }
            }
            return result || emptyArray;

            function addSourceFile(sourceFile: SourceFile) {
                if (!program.isSourceFileDefaultLibrary(sourceFile)) {
                    (result || (result = [])).push(sourceFile);
                }
            }
        }

        function getNonModuleEmitHandler(): EmitHandler {
            return {
                onAddSourceFile: noop,
                onRemoveSourceFile: noop,
                onUpdateSourceFile: noop,
                onUpdateSourceFileWithSameVersion: returnFalse,
                getFilesAffectedByUpdatedShape
            };

            function getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile): ReadonlyArray<SourceFile> {
                const options = program.getCompilerOptions();
                // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
                // so returning the file itself is good enough.
                if (options && (options.out || options.outFile)) {
                    return [sourceFile];
                }
                return getAllFilesExcludingDefaultLibraryFile(program, sourceFile);
            }
        }

        function getModuleEmitHandler(): EmitHandler {
            const references = createMap<Map<true>>();
            return {
                onAddSourceFile: setReferences,
                onRemoveSourceFile,
                onUpdateSourceFile: updateReferences,
                onUpdateSourceFileWithSameVersion: updateReferencesTrackingChangedReferences,
                getFilesAffectedByUpdatedShape
            };

            function setReferences(program: Program, sourceFile: SourceFile) {
                const newReferences = getReferencedFiles(program, sourceFile);
                if (newReferences) {
                    references.set(sourceFile.path, newReferences);
                }
            }

            function updateReferences(program: Program, sourceFile: SourceFile) {
                const newReferences = getReferencedFiles(program, sourceFile);
                if (newReferences) {
                    references.set(sourceFile.path, newReferences);
                }
                else {
                    references.delete(sourceFile.path);
                }
            }

            function updateReferencesTrackingChangedReferences(program: Program, sourceFile: SourceFile) {
                const newReferences = getReferencedFiles(program, sourceFile);
                if (!newReferences) {
                    // Changed if we had references
                    return references.delete(sourceFile.path);
                }

                const oldReferences = references.get(sourceFile.path);
                references.set(sourceFile.path, newReferences);
                if (!oldReferences || oldReferences.size !== newReferences.size) {
                    return true;
                }

                // If there are any new references that werent present previously there is change
                return forEachEntry(newReferences, (_true, referencedPath) => !oldReferences.delete(referencedPath)) ||
                    // Otherwise its changed if there are more references previously than now
                    !!oldReferences.size;
            }

            function onRemoveSourceFile(removedFilePath: Path) {
                // Remove existing references
                references.forEach((referencesInFile, filePath) => {
                    if (referencesInFile.has(removedFilePath)) {
                        // add files referencing the removedFilePath, as changed files too
                        const referencedByInfo = fileInfos.get(filePath);
                        if (referencedByInfo) {
                            registerChangedFile(filePath as Path);
                        }
                    }
                });
                // Delete the entry for the removed file path
                references.delete(removedFilePath);
            }

            function getReferencedByPaths(referencedFilePath: Path) {
                return mapDefinedIter(references.entries(), ([filePath, referencesInFile]) =>
                    referencesInFile.has(referencedFilePath) ? filePath as Path : undefined
                );
            }

            function getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile): ReadonlyArray<SourceFile> {
                if (!isExternalModule(sourceFile) && !containsOnlyAmbientModules(sourceFile)) {
                    return getAllFilesExcludingDefaultLibraryFile(program, sourceFile);
                }

                const compilerOptions = program.getCompilerOptions();
                if (compilerOptions && (compilerOptions.isolatedModules || compilerOptions.out || compilerOptions.outFile)) {
                    return [sourceFile];
                }

                // Now we need to if each file in the referencedBy list has a shape change as well.
                // Because if so, its own referencedBy files need to be saved as well to make the
                // emitting result consistent with files on disk.
                const seenFileNamesMap = createMap<SourceFile>();

                // Start with the paths this file was referenced by
                const path = sourceFile.path;
                seenFileNamesMap.set(path, sourceFile);
                const queue = getReferencedByPaths(path);
                while (queue.length > 0) {
                    const currentPath = queue.pop();
                    if (!seenFileNamesMap.has(currentPath)) {
                        const currentSourceFile = program.getSourceFileByPath(currentPath);
                        seenFileNamesMap.set(currentPath, currentSourceFile);
                        if (currentSourceFile && updateShapeSignature(program, currentSourceFile, fileInfos.get(currentPath))) {
                            queue.push(...getReferencedByPaths(currentPath));
                        }
                    }
                }

                // Return array of values that needs emit
                return flatMapIter(seenFileNamesMap.values(), value => value);
            }
        }
    }
}

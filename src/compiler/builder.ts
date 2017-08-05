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

    export interface Builder {
        /**
         * This is the callback when file infos in the builder are updated
         */
        onProgramUpdateGraph(program: Program, hasInvalidatedResolution: HasInvalidatedResolution): void;
        getFilesAffectedBy(program: Program, path: Path): string[];
        emitFile(program: Program, path: Path): EmitOutput;
        emitChangedFiles(program: Program): EmitOutputDetailed[];
        clear(): void;
    }

    interface EmitHandler {
        addScriptInfo(program: Program, sourceFile: SourceFile): void;
        removeScriptInfo(path: Path): void;
        updateScriptInfo(program: Program, sourceFile: SourceFile): void;
        /**
         * Gets the files affected by the script info which has updated shape from the known one
         */
        getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile, singleFileResult: string[]): string[];
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
                emittedSourceFiles = concatenate(emittedSourceFiles, sourceFiles);
            }
        }
    }

    export function createBuilder(
        getCanonicalFileName: (fileName: string) => string,
        getEmitOutput: (program: Program, sourceFile: SourceFile, emitOnlyDtsFiles: boolean, isDetailed: boolean) => EmitOutput | EmitOutputDetailed,
        computeHash: (data: string) => string,
        shouldEmitFile: (sourceFile: SourceFile) => boolean
    ): Builder {
        let isModuleEmit: boolean | undefined;
        // Last checked shape signature for the file info
        type FileInfo = { version: string; signature: string; };
        let fileInfos: Map<FileInfo>;
        let changedFilesSinceLastEmit: Map<true>;
        let emitHandler: EmitHandler;
        return {
            onProgramUpdateGraph,
            getFilesAffectedBy,
            emitFile,
            emitChangedFiles,
            clear
        };

        function createProgramGraph(program: Program, hasInvalidatedResolution: HasInvalidatedResolution) {
            const currentIsModuleEmit = program.getCompilerOptions().module !== ModuleKind.None;
            if (isModuleEmit !== currentIsModuleEmit) {
                isModuleEmit = currentIsModuleEmit;
                emitHandler = isModuleEmit ? getModuleEmitHandler() : getNonModuleEmitHandler();
                fileInfos = undefined;
            }

            changedFilesSinceLastEmit = changedFilesSinceLastEmit || createMap<true>();
            fileInfos = mutateExistingMapWithSameExistingValues(
                fileInfos, arrayToMap(program.getSourceFiles(), sourceFile => sourceFile.path),
                // Add new file info
                (_path, sourceFile) => addNewFileInfo(program, sourceFile),
                // Remove existing file info
                removeExistingFileInfo,
                // We will update in place instead of deleting existing value and adding new one
                (existingInfo, sourceFile) => updateExistingFileInfo(program, existingInfo, sourceFile, hasInvalidatedResolution)
            );
        }

        function addNewFileInfo(program: Program, sourceFile: SourceFile): FileInfo {
            changedFilesSinceLastEmit.set(sourceFile.path, true);
            emitHandler.addScriptInfo(program, sourceFile);
            return { version: sourceFile.version, signature: undefined };
        }

        function removeExistingFileInfo(path: Path, _existingFileInfo: FileInfo) {
            changedFilesSinceLastEmit.set(path, true);
            emitHandler.removeScriptInfo(path);
        }

        function updateExistingFileInfo(program: Program, existingInfo: FileInfo, sourceFile: SourceFile, hasInvalidatedResolution: HasInvalidatedResolution) {
            if (existingInfo.version !== sourceFile.version || hasInvalidatedResolution(sourceFile.path)) {
                changedFilesSinceLastEmit.set(sourceFile.path, true);
                existingInfo.version = sourceFile.version;
                emitHandler.updateScriptInfo(program, sourceFile);
            }
        }

        function ensureProgramGraph(program: Program) {
            if (!emitHandler) {
                createProgramGraph(program, noop);
            }
        }

        function onProgramUpdateGraph(program: Program, hasInvalidatedResolution: HasInvalidatedResolution) {
            if (emitHandler) {
                createProgramGraph(program, hasInvalidatedResolution);
            }
        }

        function getFilesAffectedBy(program: Program, path: Path): string[] {
            ensureProgramGraph(program);

            const sourceFile = program.getSourceFile(path);
            const singleFileResult = sourceFile && shouldEmitFile(sourceFile) ? [sourceFile.fileName] : [];
            const info = fileInfos && fileInfos.get(path);
            if (!info || !updateShapeSignature(program, sourceFile, info)) {
                return singleFileResult;
            }

            Debug.assert(!!sourceFile);
            return emitHandler.getFilesAffectedByUpdatedShape(program, sourceFile, singleFileResult);
        }

        function emitFile(program: Program, path: Path) {
            ensureProgramGraph(program);
            if (!fileInfos || !fileInfos.has(path)) {
                return { outputFiles: [], emitSkipped: true };
            }

            return getEmitOutput(program, program.getSourceFileByPath(path), /*emitOnlyDtsFiles*/ false, /*isDetailed*/ false);
        }

        function emitChangedFiles(program: Program): EmitOutputDetailed[] {
            ensureProgramGraph(program);
            const result: EmitOutputDetailed[] = [];
            if (changedFilesSinceLastEmit) {
                const seenFiles = createMap<SourceFile>();
                changedFilesSinceLastEmit.forEach((__value, path: Path) => {
                    const affectedFiles = getFilesAffectedBy(program, path);
                    for (const file of affectedFiles) {
                        if (!seenFiles.has(file)) {
                            const sourceFile = program.getSourceFile(file);
                            seenFiles.set(file, sourceFile);
                            if (sourceFile) {
                                const emitOutput = getEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ false, /*isDetailed*/ true) as EmitOutputDetailed;
                                result.push(emitOutput);

                                // mark all the emitted source files as seen
                                if (emitOutput.emittedSourceFiles) {
                                    for (const file of emitOutput.emittedSourceFiles) {
                                        seenFiles.set(file.fileName, file);
                                    }
                                }
                            }
                        }
                    }
                });

                changedFilesSinceLastEmit = undefined;
            }
            return result;
        }

        function clear() {
            isModuleEmit = undefined;
            emitHandler = undefined;
            fileInfos = undefined;
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
                latestSignature = computeHash(sourceFile.text);
                info.signature = latestSignature;
            }
            else {
                const emitOutput = getEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ true, /*isDetailed*/ false);
                if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                    latestSignature = computeHash(emitOutput.outputFiles[0].text);
                    info.signature = latestSignature;
                }
                else {
                    latestSignature = prevSignature;
                }
            }

            return !prevSignature || latestSignature !== prevSignature;
        }

        /**
         * Gets the referenced files for a file from the program
         * @param program
         * @param path
         */
        function getReferencedFiles(program: Program, sourceFile: SourceFile): Map<true> {
            const referencedFiles = createMap<true>();

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
                            referencedFiles.set(declarationSourceFile.path, true);
                        }
                    }
                }
            }

            const sourceFileDirectory = getDirectoryPath(sourceFile.path);
            // Handle triple slash references
            if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
                for (const referencedFile of sourceFile.referencedFiles) {
                    const referencedPath = toPath(referencedFile.fileName, sourceFileDirectory, getCanonicalFileName);
                    referencedFiles.set(referencedPath, true);
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
                    referencedFiles.set(typeFilePath, true);
                });
            }

            return referencedFiles;
        }

        /**
         * Gets all the emittable files from the program
         */
        function getAllEmittableFiles(program: Program) {
            const defaultLibraryFileName = getDefaultLibFileName(program.getCompilerOptions());
            const sourceFiles = program.getSourceFiles();
            const result: string[] = [];
            for (const sourceFile of sourceFiles) {
                if (getBaseFileName(sourceFile.fileName) !== defaultLibraryFileName && shouldEmitFile(sourceFile)) {
                    result.push(sourceFile.fileName);
                }
            }
            return result;
        }

        function getNonModuleEmitHandler(): EmitHandler {
            return {
                addScriptInfo: noop,
                removeScriptInfo: noop,
                updateScriptInfo: noop,
                getFilesAffectedByUpdatedShape
            };

            function getFilesAffectedByUpdatedShape(program: Program, _sourceFile: SourceFile, singleFileResult: string[]): string[] {
                const options = program.getCompilerOptions();
                // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
                // so returning the file itself is good enough.
                if (options && (options.out || options.outFile)) {
                    return singleFileResult;
                }
                return getAllEmittableFiles(program);
            }
        }

        function getModuleEmitHandler(): EmitHandler {
            const references = createMap<Map<true>>();
            const referencedBy = createMultiMap<Path>();
            return {
                addScriptInfo: setReferences,
                removeScriptInfo,
                updateScriptInfo: setReferences,
                getFilesAffectedByUpdatedShape
            };

            function setReferences(program: Program, sourceFile: SourceFile) {
                const path = sourceFile.path;
                references.set(path,
                    mutateExistingMapWithNewSet<true>(
                        // Existing references
                        references.get(path),
                        // Updated references
                        getReferencedFiles(program, sourceFile),
                        // Creating new Reference: as sourceFile references file with path 'key'
                        // in other words source file (path) is referenced by 'key'
                        key => { referencedBy.add(key, path); return true; },
                        // Remove existing reference by entry: source file doesnt reference file 'key' any more
                        // in other words source file (path) is not referenced by 'key'
                        (key, _existingValue) => { referencedBy.remove(key, path); }
                    )
                );
            }

            function removeScriptInfo(path: Path) {
                // Remove existing references
                references.forEach((_value, key) => {
                    referencedBy.remove(key, path);
                });
                references.delete(path);

                // Delete the entry and add files referencing this file, as chagned files too
                const referencedByPaths = referencedBy.get(path);
                if (referencedByPaths) {
                    for (const path of referencedByPaths) {
                        changedFilesSinceLastEmit.set(path, true);
                    }
                    referencedBy.delete(path);
                }
            }

            function getReferencedByPaths(path: Path) {
                return referencedBy.get(path) || [];
            }

            function getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile, singleFileResult: string[]): string[] {
                if (!isExternalModule(sourceFile) && !containsOnlyAmbientModules(sourceFile)) {
                    return getAllEmittableFiles(program);
                }

                const options = program.getCompilerOptions();
                if (options && (options.isolatedModules || options.out || options.outFile)) {
                    return singleFileResult;
                }

                // Now we need to if each file in the referencedBy list has a shape change as well.
                // Because if so, its own referencedBy files need to be saved as well to make the
                // emitting result consistent with files on disk.

                const seenFileNamesMap = createMap<string>();
                const setSeenFileName = (path: Path, sourceFile: SourceFile) => {
                    seenFileNamesMap.set(path, sourceFile && shouldEmitFile(sourceFile) ? sourceFile.fileName : undefined);
                };

                // Start with the paths this file was referenced by
                const path = sourceFile.path;
                setSeenFileName(path, sourceFile);
                const queue = getReferencedByPaths(path).slice();
                while (queue.length > 0) {
                    const currentPath = queue.pop();
                    if (!seenFileNamesMap.has(currentPath)) {
                        const currentSourceFile = program.getSourceFileByPath(currentPath);
                        if (currentSourceFile && updateShapeSignature(program, currentSourceFile, fileInfos.get(currentPath))) {
                            queue.push(...getReferencedByPaths(currentPath));
                        }
                        setSeenFileName(currentPath, currentSourceFile);
                    }
                }

                // Return array of values that needs emit
                return flatMapIter(seenFileNamesMap.values());
            }
        }
    }
}

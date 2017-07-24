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

    export interface Builder {
        /**
         * This is the callback when file infos in the builder are updated
         */
        onProgramUpdateGraph(program: Program): void;
        getFilesAffectedBy(program: Program, path: Path): string[];
        emitFile(program: Program, path: Path): EmitOutput;
        clear(): void;
    }

    export function getFileEmitOutput(program: Program, sourceFile: SourceFile, emitOnlyDtsFiles?: boolean,
        cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): EmitOutput {
        const outputFiles: OutputFile[] = [];
        const emitOutput = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
        return {
            outputFiles,
            emitSkipped: emitOutput.emitSkipped
        };

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
            outputFiles.push({ name: fileName, writeByteOrderMark, text });
        }
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

    export function createBuilder(
        getCanonicalFileName: (fileName: string) => string,
        getEmitOutput: (program: Program, sourceFile: SourceFile, emitOnlyDtsFiles?: boolean) => EmitOutput,
        computeHash: (data: string) => string,
        shouldEmitFile: (sourceFile: SourceFile) => boolean
    ): Builder {
        let isModuleEmit: boolean | undefined;
        // Last checked shape signature for the file info
        let fileInfos: Map<string>;
        let emitHandler: EmitHandler;
        return {
            onProgramUpdateGraph,
            getFilesAffectedBy,
            emitFile,
            clear
        };

        function createProgramGraph(program: Program) {
            const currentIsModuleEmit = program.getCompilerOptions().module !== ModuleKind.None;
            if (isModuleEmit !== currentIsModuleEmit) {
                isModuleEmit = currentIsModuleEmit;
                emitHandler = isModuleEmit ? getModuleEmitHandler() : getNonModuleEmitHandler();
                fileInfos = undefined;
            }

            fileInfos = mutateExistingMap(
                fileInfos, arrayToMap(program.getSourceFiles(), sourceFile => sourceFile.path),
                (_path, sourceFile) => {
                    emitHandler.addScriptInfo(program, sourceFile);
                    return "";
                },
                (path: Path, _value) => emitHandler.removeScriptInfo(path),
                    /*isSameValue*/ undefined,
                    /*OnDeleteExistingMismatchValue*/ undefined,
                (_prevValue, sourceFile) => emitHandler.updateScriptInfo(program, sourceFile)
            );
        }

        function ensureProgramGraph(program: Program) {
            if (!emitHandler) {
                createProgramGraph(program);
            }
        }

        function onProgramUpdateGraph(program: Program) {
            if (emitHandler) {
                createProgramGraph(program);
            }
        }

        function getFilesAffectedBy(program: Program, path: Path): string[] {
            ensureProgramGraph(program);

            const sourceFile = program.getSourceFile(path);
            const singleFileResult = sourceFile && shouldEmitFile(sourceFile) ? [sourceFile.fileName] : [];
            if (!fileInfos || !fileInfos.has(path) || !updateShapeSignature(program, sourceFile)) {
                return singleFileResult;
            }

            return emitHandler.getFilesAffectedByUpdatedShape(program, sourceFile, singleFileResult);
        }

        function emitFile(program: Program, path: Path): EmitOutput {
            ensureProgramGraph(program);
            if (!fileInfos || !fileInfos.has(path)) {
                return { outputFiles: [], emitSkipped: true };
            }

            return getEmitOutput(program, program.getSourceFileByPath(path), /*emitOnlyDtsFiles*/ false);
        }

        function clear() {
            isModuleEmit = undefined;
            emitHandler = undefined;
            fileInfos = undefined;
        }

        function isExternalModuleOrHasOnlyAmbientExternalModules(sourceFile: SourceFile) {
            return sourceFile && (isExternalModule(sourceFile) || containsOnlyAmbientModules(sourceFile));
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
        function updateShapeSignature(program: Program, sourceFile: SourceFile) {
            const path = sourceFile.path;

            const prevSignature = fileInfos.get(path);
            let latestSignature = prevSignature;
            if (sourceFile.isDeclarationFile) {
                latestSignature = computeHash(sourceFile.text);
                fileInfos.set(path, latestSignature);
            }
            else {
                const emitOutput = getEmitOutput(program, sourceFile, /*emitOnlyDtsFiles*/ true);
                if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                    latestSignature = computeHash(emitOutput.outputFiles[0].text);
                    fileInfos.set(path, latestSignature);
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

        function noop() { }

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
            const scriptVersionForReferences = createMap<string>();
            return {
                addScriptInfo,
                removeScriptInfo,
                updateScriptInfo,
                getFilesAffectedByUpdatedShape
            };

            function setReferences(program: Program, sourceFile: SourceFile, existingMap: Map<true>) {
                const path = sourceFile.path;
                existingMap = mutateExistingMapWithNewSet<true>(
                    existingMap,
                    getReferencedFiles(program, sourceFile),
                    // Creating new Reference: Also add referenced by
                    key => { referencedBy.add(key, path); return true; },
                    // Remove existing reference
                    (key, _existingValue) => { referencedBy.remove(key, path); }
                );
                references.set(path, existingMap);
                scriptVersionForReferences.set(path, sourceFile.version);
            }

            function addScriptInfo(program: Program, sourceFile: SourceFile) {
                setReferences(program, sourceFile, undefined);
            }

            function removeScriptInfo(path: Path) {
                references.delete(path);
                scriptVersionForReferences.delete(path);
            }

            function updateScriptInfo(program: Program, sourceFile: SourceFile) {
                const path = sourceFile.path;
                const lastUpdatedVersion = scriptVersionForReferences.get(path);
                if (lastUpdatedVersion !== sourceFile.version) {
                    setReferences(program, sourceFile, references.get(path));
                }
            }

            function getReferencedByPaths(path: Path) {
                return referencedBy.get(path) || [];
            }

            function getFilesAffectedByUpdatedShape(program: Program, sourceFile: SourceFile, singleFileResult: string[]): string[] {
                if (!isExternalModuleOrHasOnlyAmbientExternalModules(sourceFile)) {
                    return getAllEmittableFiles(program);
                }

                const options = program.getCompilerOptions();
                if (options && (options.isolatedModules || options.out || options.outFile)) {
                    return singleFileResult;
                }

                // Now we need to if each file in the referencedBy list has a shape change as well.
                // Because if so, its own referencedBy files need to be saved as well to make the
                // emitting result consistent with files on disk.

                const fileNamesMap = createMap<string>();
                const setFileName = (path: Path, sourceFile: SourceFile) => {
                    fileNamesMap.set(path, sourceFile && shouldEmitFile(sourceFile) ? sourceFile.fileName : undefined);
                };

                // Start with the paths this file was referenced by
                const path = sourceFile.path;
                setFileName(path, sourceFile);
                const queue = getReferencedByPaths(path).slice();
                while (queue.length > 0) {
                    const currentPath = queue.pop();
                    if (!fileNamesMap.has(currentPath)) {
                        const currentSourceFile = program.getSourceFileByPath(currentPath);
                        if (currentSourceFile && updateShapeSignature(program, currentSourceFile)) {
                            queue.push(...getReferencedByPaths(currentPath));
                        }
                        setFileName(currentPath, currentSourceFile);
                    }
                }

                // Return array of values that needs emit
                return flatMapIter(fileNamesMap.values(), value => value);
            }
        }
    }
}

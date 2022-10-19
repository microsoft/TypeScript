/*@internal*/
namespace ts {
export function getFileEmitOutput(program: ts.Program, sourceFile: ts.SourceFile, emitOnlyDtsFiles: boolean,
    cancellationToken?: ts.CancellationToken, customTransformers?: ts.CustomTransformers, forceDtsEmit?: boolean): ts.EmitOutput {
    const outputFiles: ts.OutputFile[] = [];
    const { emitSkipped, diagnostics } = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers, forceDtsEmit);
    return { outputFiles, emitSkipped, diagnostics };

    function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
        outputFiles.push({ name: fileName, writeByteOrderMark, text });
    }
}
export interface BuilderState {
    /**
     * Information of the file eg. its version, signature etc
     */
    fileInfos: ts.ESMap<ts.Path, BuilderState.FileInfo>;
    /**
     * Contains the map of ReferencedSet=Referenced files of the file if module emit is enabled
     * Otherwise undefined
     * Thus non undefined value indicates, module emit
     */
    readonly referencedMap?: BuilderState.ReadonlyManyToManyPathMap | undefined;
    /**
     * Contains the map of exported modules ReferencedSet=exported module files from the file if module emit is enabled
     * Otherwise undefined
     *
     * This is equivalent to referencedMap, but for the emitted .d.ts file.
     */
    readonly exportedModulesMap?: BuilderState.ManyToManyPathMap | undefined;

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
    hasCalledUpdateShapeSignature?: ts.Set<ts.Path>;
    /**
     * Stores signatures before before the update till affected file is commited
     */
    oldSignatures?: ts.ESMap<ts.Path, string | false>;
    /**
     * Stores exportedModulesMap before the update till affected file is commited
     */
    oldExportedModulesMap?: ts.ESMap<ts.Path, ts.ReadonlySet<ts.Path> | false>;
    /**
     * Cache of all files excluding default library file for the current program
     */
    allFilesExcludingDefaultLibraryFile?: readonly ts.SourceFile[];
    /**
     * Cache of all the file names
     */
    allFileNames?: readonly string[];
}
export namespace BuilderState {
    /**
     * Information about the source file: Its version and optional signature from last emit
     */
    export interface FileInfo {
        readonly version: string;
        signature: string | undefined;
        affectsGlobalScope: true | undefined;
        impliedFormat: ts.SourceFile["impliedNodeFormat"];
    }

    export interface ReadonlyManyToManyPathMap {
        getKeys(v: ts.Path): ts.ReadonlySet<ts.Path> | undefined;
        getValues(k: ts.Path): ts.ReadonlySet<ts.Path> | undefined;
        keys(): ts.Iterator<ts.Path>;
    }

    export interface ManyToManyPathMap extends ReadonlyManyToManyPathMap {
        deleteKey(k: ts.Path): boolean;
        set(k: ts.Path, v: ts.ReadonlySet<ts.Path>): void;
    }

    export function createManyToManyPathMap(): ManyToManyPathMap {
        function create(forward: ts.ESMap<ts.Path, ts.ReadonlySet<ts.Path>>, reverse: ts.ESMap<ts.Path, ts.Set<ts.Path>>, deleted: ts.Set<ts.Path> | undefined): ManyToManyPathMap {
            const map: ManyToManyPathMap = {
                getKeys: v => reverse.get(v),
                getValues: k => forward.get(k),
                keys: () => forward.keys(),

                deleteKey: k => {
                    (deleted ||= new ts.Set<ts.Path>()).add(k);

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

        return create(new ts.Map<ts.Path, ts.Set<ts.Path>>(), new ts.Map<ts.Path, ts.Set<ts.Path>>(), /*deleted*/ undefined);
    }

    function addToMultimap<K, V>(map: ts.ESMap<K, ts.Set<V>>, k: K, v: V): void {
        let set = map.get(k);
        if (!set) {
            set = new ts.Set<V>();
            map.set(k, set);
        }
        set.add(v);
    }

    function deleteFromMultimap<K, V>(map: ts.ESMap<K, ts.Set<V>>, k: K, v: V): boolean {
        const set = map.get(k);

        if (set?.delete(v)) {
            if (!set.size) {
                map.delete(k);
            }
            return true;
        }

        return false;
    }

    /**
     * Compute the hash to store the shape of the file
     */
    export type ComputeHash = ((data: string) => string) | undefined;

    function getReferencedFilesFromImportedModuleSymbol(symbol: ts.Symbol): ts.Path[] {
        return ts.mapDefined(symbol.declarations, declaration => ts.getSourceFileOfNode(declaration)?.resolvedPath);
    }

    /**
     * Get the module source file and all augmenting files from the import name node from file
     */
    function getReferencedFilesFromImportLiteral(checker: ts.TypeChecker, importName: ts.StringLiteralLike): ts.Path[] | undefined {
        const symbol = checker.getSymbolAtLocation(importName);
        return symbol && getReferencedFilesFromImportedModuleSymbol(symbol);
    }

    /**
     * Gets the path to reference file from file name, it could be resolvedPath if present otherwise path
     */
    function getReferencedFileFromFileName(program: ts.Program, fileName: string, sourceFileDirectory: ts.Path, getCanonicalFileName: ts.GetCanonicalFileName): ts.Path {
        return ts.toPath(program.getProjectReferenceRedirect(fileName) || fileName, sourceFileDirectory, getCanonicalFileName);
    }

    /**
     * Gets the referenced files for a file from the program with values for the keys as referenced file's path to be true
     */
    function getReferencedFiles(program: ts.Program, sourceFile: ts.SourceFile, getCanonicalFileName: ts.GetCanonicalFileName): ts.Set<ts.Path> | undefined {
        let referencedFiles: ts.Set<ts.Path> | undefined;

        // We need to use a set here since the code can contain the same import twice,
        // but that will only be one dependency.
        // To avoid invernal conversion, the key of the referencedFiles map must be of type Path
        if (sourceFile.imports && sourceFile.imports.length > 0) {
            const checker: ts.TypeChecker = program.getTypeChecker();
            for (const importName of sourceFile.imports) {
                const declarationSourceFilePaths = getReferencedFilesFromImportLiteral(checker, importName);
                declarationSourceFilePaths?.forEach(addReferencedFile);
            }
        }

        const sourceFileDirectory = ts.getDirectoryPath(sourceFile.resolvedPath);
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
                if (!ts.isStringLiteral(moduleName)) continue;
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

        function addReferenceFromAmbientModule(symbol: ts.Symbol) {
            if (!symbol.declarations) {
                return;
            }
            // Add any file other than our own as reference
            for (const declaration of symbol.declarations) {
                const declarationSourceFile = ts.getSourceFileOfNode(declaration);
                if (declarationSourceFile &&
                    declarationSourceFile !== sourceFile) {
                    addReferencedFile(declarationSourceFile.resolvedPath);
                }
            }
        }

        function addReferencedFile(referencedPath: ts.Path) {
            (referencedFiles || (referencedFiles = new ts.Set())).add(referencedPath);
        }
    }

    /**
     * Returns true if oldState is reusable, that is the emitKind = module/non module has not changed
     */
    export function canReuseOldState(newReferencedMap: ReadonlyManyToManyPathMap | undefined, oldState: BuilderState | undefined) {
        return oldState && !oldState.referencedMap === !newReferencedMap;
    }

    /**
     * Creates the state of file references and signature for the new program from oldState if it is safe
     */
    export function create(newProgram: ts.Program, getCanonicalFileName: ts.GetCanonicalFileName, oldState?: Readonly<BuilderState>, disableUseFileVersionAsSignature?: boolean): BuilderState {
        const fileInfos = new ts.Map<ts.Path, FileInfo>();
        const referencedMap = newProgram.getCompilerOptions().module !== ts.ModuleKind.None ? createManyToManyPathMap() : undefined;
        const exportedModulesMap = referencedMap ? createManyToManyPathMap() : undefined;
        const useOldState = canReuseOldState(referencedMap, oldState);

        // Ensure source files have parent pointers set
        newProgram.getTypeChecker();

        // Create the reference map, and set the file infos
        for (const sourceFile of newProgram.getSourceFiles()) {
            const version = ts.Debug.checkDefined(sourceFile.version, "Program intended to be used with Builder should have source files with versions set");
            const oldUncommittedSignature = useOldState ? oldState!.oldSignatures?.get(sourceFile.resolvedPath) : undefined;
            const signature = oldUncommittedSignature === undefined ?
                useOldState ? oldState!.fileInfos.get(sourceFile.resolvedPath)?.signature : undefined :
                oldUncommittedSignature || undefined;
            if (referencedMap) {
                const newReferences = getReferencedFiles(newProgram, sourceFile, getCanonicalFileName);
                if (newReferences) {
                    referencedMap.set(sourceFile.resolvedPath, newReferences);
                }
                // Copy old visible to outside files map
                if (useOldState) {
                    const oldUncommittedExportedModules = oldState!.oldExportedModulesMap?.get(sourceFile.resolvedPath);
                    const exportedModules = oldUncommittedExportedModules === undefined ?
                        oldState!.exportedModulesMap!.getValues(sourceFile.resolvedPath) :
                        oldUncommittedExportedModules || undefined;
                    if (exportedModules) {
                        exportedModulesMap!.set(sourceFile.resolvedPath, exportedModules);
                    }
                }
            }
            fileInfos.set(sourceFile.resolvedPath, {
                version,
                signature,
                affectsGlobalScope: isFileAffectingGlobalScope(sourceFile) || undefined,
                impliedFormat: sourceFile.impliedNodeFormat
            });
        }

        return {
            fileInfos,
            referencedMap,
            exportedModulesMap,
            useFileVersionAsSignature: !disableUseFileVersionAsSignature && !useOldState
        };
    }

    /**
     * Releases needed properties
     */
    export function releaseCache(state: BuilderState) {
        state.allFilesExcludingDefaultLibraryFile = undefined;
        state.allFileNames = undefined;
    }

    /**
     * Gets the files affected by the path from the program
     */
    export function getFilesAffectedBy(
        state: BuilderState,
        programOfThisState: ts.Program,
        path: ts.Path,
        cancellationToken: ts.CancellationToken | undefined,
        computeHash: ComputeHash,
        getCanonicalFileName: ts.GetCanonicalFileName,
    ): readonly ts.SourceFile[] {
        const result = getFilesAffectedByWithOldState(
            state,
            programOfThisState,
            path,
            cancellationToken,
            computeHash,
            getCanonicalFileName,
        );
        state.oldSignatures?.clear();
        state.oldExportedModulesMap?.clear();
        return result;
    }

    export function getFilesAffectedByWithOldState(
        state: BuilderState,
        programOfThisState: ts.Program,
        path: ts.Path,
        cancellationToken: ts.CancellationToken | undefined,
        computeHash: ComputeHash,
        getCanonicalFileName: ts.GetCanonicalFileName,
    ): readonly ts.SourceFile[] {
        const sourceFile = programOfThisState.getSourceFileByPath(path);
        if (!sourceFile) {
            return ts.emptyArray;
        }

        if (!updateShapeSignature(state, programOfThisState, sourceFile, cancellationToken, computeHash, getCanonicalFileName)) {
            return [sourceFile];
        }

        return (state.referencedMap ? getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit)(state, programOfThisState, sourceFile, cancellationToken, computeHash, getCanonicalFileName);
    }

    export function updateSignatureOfFile(state: BuilderState, signature: string | undefined, path: ts.Path) {
        state.fileInfos.get(path)!.signature = signature;
        (state.hasCalledUpdateShapeSignature ||= new ts.Set()).add(path);
    }

    /**
     * Returns if the shape of the signature has changed since last emit
     */
    export function updateShapeSignature(
        state: BuilderState,
        programOfThisState: ts.Program,
        sourceFile: ts.SourceFile,
        cancellationToken: ts.CancellationToken | undefined,
        computeHash: ComputeHash,
        getCanonicalFileName: ts.GetCanonicalFileName,
        useFileVersionAsSignature = state.useFileVersionAsSignature
    ) {
        // If we have cached the result for this file, that means hence forth we should assume file shape is uptodate
        if (state.hasCalledUpdateShapeSignature?.has(sourceFile.resolvedPath)) return false;

        const info = state.fileInfos.get(sourceFile.resolvedPath)!;
        const prevSignature = info.signature;
        let latestSignature: string | undefined;
        if (!sourceFile.isDeclarationFile && !useFileVersionAsSignature) {
            programOfThisState.emit(
                sourceFile,
                (fileName, text, _writeByteOrderMark, _onError, sourceFiles, data) => {
                    ts.Debug.assert(ts.isDeclarationFileName(fileName), `File extension for signature expected to be dts: Got:: ${fileName}`);
                    latestSignature = ts.computeSignatureWithDiagnostics(
                        sourceFile,
                        text,
                        computeHash,
                        getCanonicalFileName,
                        data,
                    );
                    if (latestSignature !== prevSignature) {
                        updateExportedModules(state, sourceFile, sourceFiles![0].exportedModulesFromDeclarationEmit);
                    }
                },
                cancellationToken,
                /*emitOnlyDtsFiles*/ true,
                /*customTransformers*/ undefined,
                /*forceDtsEmit*/ true
            );
        }
        // Default is to use file version as signature
        if (latestSignature === undefined) {
            latestSignature = sourceFile.version;
            if (state.exportedModulesMap && latestSignature !== prevSignature) {
                (state.oldExportedModulesMap ||= new ts.Map()).set(sourceFile.resolvedPath, state.exportedModulesMap.getValues(sourceFile.resolvedPath) || false);
                // All the references in this file are exported
                const references = state.referencedMap ? state.referencedMap.getValues(sourceFile.resolvedPath) : undefined;
                if (references) {
                    state.exportedModulesMap.set(sourceFile.resolvedPath, references);
                }
                else {
                    state.exportedModulesMap.deleteKey(sourceFile.resolvedPath);
                }
            }
        }
        (state.oldSignatures ||= new ts.Map()).set(sourceFile.resolvedPath, prevSignature || false);
        (state.hasCalledUpdateShapeSignature ||= new ts.Set()).add(sourceFile.resolvedPath);
        info.signature = latestSignature;
        return latestSignature !== prevSignature;
    }

    /**
     * Coverts the declaration emit result into exported modules map
     */
    export function updateExportedModules(state: BuilderState, sourceFile: ts.SourceFile, exportedModulesFromDeclarationEmit: ts.ExportedModulesFromDeclarationEmit | undefined) {
        if (!state.exportedModulesMap) return;
        (state.oldExportedModulesMap ||= new ts.Map()).set(sourceFile.resolvedPath, state.exportedModulesMap.getValues(sourceFile.resolvedPath) || false);
        if (!exportedModulesFromDeclarationEmit) {
            state.exportedModulesMap.deleteKey(sourceFile.resolvedPath);
            return;
        }

        let exportedModules: ts.Set<ts.Path> | undefined;
        exportedModulesFromDeclarationEmit.forEach(symbol => addExportedModule(getReferencedFilesFromImportedModuleSymbol(symbol)));
        if (exportedModules) {
            state.exportedModulesMap.set(sourceFile.resolvedPath, exportedModules);
        }
        else {
            state.exportedModulesMap.deleteKey(sourceFile.resolvedPath);
        }

        function addExportedModule(exportedModulePaths: ts.Path[] | undefined) {
            if (exportedModulePaths?.length) {
                if (!exportedModules) {
                    exportedModules = new ts.Set();
                }
                exportedModulePaths.forEach(path => exportedModules!.add(path));
            }
        }
    }

    /**
     * Get all the dependencies of the sourceFile
     */
    export function getAllDependencies(state: BuilderState, programOfThisState: ts.Program, sourceFile: ts.SourceFile): readonly string[] {
        const compilerOptions = programOfThisState.getCompilerOptions();
        // With --out or --outFile all outputs go into single file, all files depend on each other
        if (ts.outFile(compilerOptions)) {
            return getAllFileNames(state, programOfThisState);
        }

        // If this is non module emit, or its a global file, it depends on all the source files
        if (!state.referencedMap || isFileAffectingGlobalScope(sourceFile)) {
            return getAllFileNames(state, programOfThisState);
        }

        // Get the references, traversing deep from the referenceMap
        const seenMap = new ts.Set<ts.Path>();
        const queue = [sourceFile.resolvedPath];
        while (queue.length) {
            const path = queue.pop()!;
            if (!seenMap.has(path)) {
                seenMap.add(path);
                const references = state.referencedMap.getValues(path);
                if (references) {
                    const iterator = references.keys();
                    for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
                        queue.push(iterResult.value);
                    }
                }
            }
        }

        return ts.arrayFrom(ts.mapDefinedIterator(seenMap.keys(), path => programOfThisState.getSourceFileByPath(path)?.fileName ?? path));
    }

    /**
     * Gets the names of all files from the program
     */
    function getAllFileNames(state: BuilderState, programOfThisState: ts.Program): readonly string[] {
        if (!state.allFileNames) {
            const sourceFiles = programOfThisState.getSourceFiles();
            state.allFileNames = sourceFiles === ts.emptyArray ? ts.emptyArray : sourceFiles.map(file => file.fileName);
        }
        return state.allFileNames;
    }

    /**
     * Gets the files referenced by the the file path
     */
    export function getReferencedByPaths(state: Readonly<BuilderState>, referencedFilePath: ts.Path) {
        const keys = state.referencedMap!.getKeys(referencedFilePath);
        return keys ? ts.arrayFrom(keys.keys()) : [];
    }

    /**
     * For script files that contains only ambient external modules, although they are not actually external module files,
     * they can only be consumed via importing elements from them. Regular script files cannot consume them. Therefore,
     * there are no point to rebuild all script files if these special files have changed. However, if any statement
     * in the file is not ambient external module, we treat it as a regular script file.
     */
    function containsOnlyAmbientModules(sourceFile: ts.SourceFile) {
        for (const statement of sourceFile.statements) {
            if (!ts.isModuleWithStringLiteralName(statement)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return true if file contains anything that augments to global scope we need to build them as if
     * they are global files as well as module
     */
    function containsGlobalScopeAugmentation(sourceFile: ts.SourceFile) {
        return ts.some(sourceFile.moduleAugmentations, augmentation => ts.isGlobalScopeAugmentation(augmentation.parent as ts.ModuleDeclaration));
    }

    /**
     * Return true if the file will invalidate all files because it affectes global scope
     */
    function isFileAffectingGlobalScope(sourceFile: ts.SourceFile) {
        return containsGlobalScopeAugmentation(sourceFile) ||
            !ts.isExternalOrCommonJsModule(sourceFile) && !ts.isJsonSourceFile(sourceFile) && !containsOnlyAmbientModules(sourceFile);
    }

    /**
     * Gets all files of the program excluding the default library file
     */
    export function getAllFilesExcludingDefaultLibraryFile(state: BuilderState, programOfThisState: ts.Program, firstSourceFile: ts.SourceFile | undefined): readonly ts.SourceFile[] {
        // Use cached result
        if (state.allFilesExcludingDefaultLibraryFile) {
            return state.allFilesExcludingDefaultLibraryFile;
        }

        let result: ts.SourceFile[] | undefined;
        if (firstSourceFile) addSourceFile(firstSourceFile);
        for (const sourceFile of programOfThisState.getSourceFiles()) {
            if (sourceFile !== firstSourceFile) {
                addSourceFile(sourceFile);
            }
        }
        state.allFilesExcludingDefaultLibraryFile = result || ts.emptyArray;
        return state.allFilesExcludingDefaultLibraryFile;

        function addSourceFile(sourceFile: ts.SourceFile) {
            if (!programOfThisState.isSourceFileDefaultLibrary(sourceFile)) {
                (result || (result = [])).push(sourceFile);
            }
        }
    }

    /**
     * When program emits non modular code, gets the files affected by the sourceFile whose shape has changed
     */
    function getFilesAffectedByUpdatedShapeWhenNonModuleEmit(state: BuilderState, programOfThisState: ts.Program, sourceFileWithUpdatedShape: ts.SourceFile) {
        const compilerOptions = programOfThisState.getCompilerOptions();
        // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
        // so returning the file itself is good enough.
        if (compilerOptions && ts.outFile(compilerOptions)) {
            return [sourceFileWithUpdatedShape];
        }
        return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
    }

    /**
     * When program emits modular code, gets the files affected by the sourceFile whose shape has changed
     */
    function getFilesAffectedByUpdatedShapeWhenModuleEmit(
        state: BuilderState,
        programOfThisState: ts.Program,
        sourceFileWithUpdatedShape: ts.SourceFile,
        cancellationToken: ts.CancellationToken | undefined,
        computeHash: ComputeHash,
        getCanonicalFileName: ts.GetCanonicalFileName,
    ) {
        if (isFileAffectingGlobalScope(sourceFileWithUpdatedShape)) {
            return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
        }

        const compilerOptions = programOfThisState.getCompilerOptions();
        if (compilerOptions && (compilerOptions.isolatedModules || ts.outFile(compilerOptions))) {
            return [sourceFileWithUpdatedShape];
        }

        // Now we need to if each file in the referencedBy list has a shape change as well.
        // Because if so, its own referencedBy files need to be saved as well to make the
        // emitting result consistent with files on disk.
        const seenFileNamesMap = new ts.Map<ts.Path, ts.SourceFile>();

        // Start with the paths this file was referenced by
        seenFileNamesMap.set(sourceFileWithUpdatedShape.resolvedPath, sourceFileWithUpdatedShape);
        const queue = getReferencedByPaths(state, sourceFileWithUpdatedShape.resolvedPath);
        while (queue.length > 0) {
            const currentPath = queue.pop()!;
            if (!seenFileNamesMap.has(currentPath)) {
                const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath)!;
                seenFileNamesMap.set(currentPath, currentSourceFile);
                if (currentSourceFile && updateShapeSignature(state, programOfThisState, currentSourceFile, cancellationToken, computeHash, getCanonicalFileName)) {
                    queue.push(...getReferencedByPaths(state, currentSourceFile.resolvedPath));
                }
            }
        }

        // Return array of values that needs emit
        return ts.arrayFrom(ts.mapDefinedIterator(seenFileNamesMap.values(), value => value));
    }
}
}

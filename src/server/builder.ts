/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="session.ts" />

namespace ts.server {
    export function shouldEmitFile(scriptInfo: ScriptInfo) {
        return !scriptInfo.hasMixedContent;
    }

    export interface Builder {
        /**
         * This is the callback when file infos in the builder are updated
         */
        onProjectUpdateGraph(): void;
        getFilesAffectedBy(scriptInfo: ScriptInfo): string[];
        /**
         * @returns {boolean} whether the emit was conducted or not
         */
        emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): boolean;
        clear(): void;
    }

    interface EmitHandler {
        addScriptInfo(scriptInfo: ScriptInfo): void;
        removeScriptInfo(path: Path): void;
        updateScriptInfo(scriptInfo: ScriptInfo): void;
        /**
         * Gets the files affected by the script info which has updated shape from the known one
         */
        getFilesAffectedByUpdatedShape(scriptInfo: ScriptInfo, singleFileResult: string[]): string[];
    }

    export function createBuilder(project: Project): Builder {
        let isModuleEmit: boolean | undefined;
        let projectVersionForDependencyGraph: string;
        // Last checked shape signature for the file info
        let fileInfos: Map<string>;
        let emitHandler: EmitHandler;
        return {
            onProjectUpdateGraph,
            getFilesAffectedBy,
            emitFile,
            clear
        };

        function createProjectGraph() {
            const currentIsModuleEmit = project.getCompilerOptions().module !== ModuleKind.None;
            if (isModuleEmit !== currentIsModuleEmit) {
                isModuleEmit = currentIsModuleEmit;
                emitHandler = isModuleEmit ? getModuleEmitHandler() : getNonModuleEmitHandler();
                fileInfos = undefined;
            }

            fileInfos = mutateExistingMap(
                fileInfos, arrayToMap(project.getScriptInfos(), info => info.path),
                (_path, info) => {
                    emitHandler.addScriptInfo(info);
                    return "";
                },
                (path: Path, _value) => emitHandler.removeScriptInfo(path),
                    /*isSameValue*/ undefined,
                    /*OnDeleteExistingMismatchValue*/ undefined,
                (_prevValue, scriptInfo) => emitHandler.updateScriptInfo(scriptInfo)
            );
            projectVersionForDependencyGraph = project.getProjectVersion();
        }

        function ensureFileInfos() {
            if (!emitHandler) {
                createProjectGraph();
            }
            Debug.assert(projectVersionForDependencyGraph === project.getProjectVersion());
        }

        function onProjectUpdateGraph() {
            if (emitHandler) {
                createProjectGraph();
            }
        }

        function getFilesAffectedBy(scriptInfo: ScriptInfo): string[] {
            ensureFileInfos();

            const singleFileResult = scriptInfo.hasMixedContent ? [] : [scriptInfo.fileName];
            const path = scriptInfo.path;
            if (!fileInfos || !fileInfos.has(path) || !updateShapeSignature(scriptInfo)) {
                return singleFileResult;
            }

            return emitHandler.getFilesAffectedByUpdatedShape(scriptInfo, singleFileResult);
        }

        /**
         * @returns {boolean} whether the emit was conducted or not
         */
        function emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): boolean {
            ensureFileInfos();
            if (!fileInfos || !fileInfos.has(scriptInfo.path)) {
                return false;
            }

            const { emitSkipped, outputFiles } = project.getFileEmitOutput(scriptInfo, /*emitOnlyDtsFiles*/ false);
            if (!emitSkipped) {
                const projectRootPath = project.getProjectRootPath();
                for (const outputFile of outputFiles) {
                    const outputFileAbsoluteFileName = getNormalizedAbsolutePath(outputFile.name, projectRootPath ? projectRootPath : getDirectoryPath(scriptInfo.fileName));
                    writeFile(outputFileAbsoluteFileName, outputFile.text, outputFile.writeByteOrderMark);
                }
            }
            return !emitSkipped;
        }

        function clear() {
            isModuleEmit = undefined;
            emitHandler = undefined;
            fileInfos = undefined;
            projectVersionForDependencyGraph = undefined;
        }

        function getSourceFile(path: Path) {
            return project.getSourceFile(path);
        }

        function getScriptInfo(path: Path) {
            return project.projectService.getScriptInfoForPath(path);
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
        function updateShapeSignature(scriptInfo: ScriptInfo) {
            const path = scriptInfo.path;
            const sourceFile = getSourceFile(path);
            if (!sourceFile) {
                return true;
            }

            const prevSignature = fileInfos.get(path);
            let latestSignature = prevSignature;
            if (sourceFile.isDeclarationFile) {
                latestSignature = computeHash(sourceFile.text);
                fileInfos.set(path, latestSignature);
            }
            else {
                const emitOutput = project.getFileEmitOutput(scriptInfo, /*emitOnlyDtsFiles*/ true);
                if (emitOutput.outputFiles && emitOutput.outputFiles.length > 0) {
                    latestSignature = computeHash(emitOutput.outputFiles[0].text);
                    fileInfos.set(path, latestSignature);
                }
            }

            return !prevSignature || latestSignature !== prevSignature;
        }

        function computeHash(text: string) {
            return project.projectService.host.createHash(text);
        }

        function noop() { }

        function getNonModuleEmitHandler(): EmitHandler {
            return {
                addScriptInfo: noop,
                removeScriptInfo: noop,
                updateScriptInfo: noop,
                getFilesAffectedByUpdatedShape
            };

            function getFilesAffectedByUpdatedShape(_scriptInfo: ScriptInfo, singleFileResult: string[]): string[] {
                const options = project.getCompilerOptions();
                // If `--out` or `--outFile` is specified, any new emit will result in re-emitting the entire project,
                // so returning the file itself is good enough.
                if (options && (options.out || options.outFile)) {
                    return singleFileResult;
                }
                return project.getAllEmittableFiles();
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

            function setReferences(path: Path, latestVersion: string, existingMap: Map<true>) {
                existingMap = mutateExistingMapWithNewSet<true>(existingMap, project.getReferencedFiles(path),
                    // Creating new Reference: Also add referenced by
                    key => { referencedBy.add(key, path); return true; },
                    // Remove existing reference
                    (key, _existingValue) => { referencedBy.remove(key, path); }
                );
                references.set(path, existingMap);
                scriptVersionForReferences.set(path, latestVersion);
            }

            function addScriptInfo(info: ScriptInfo) {
                setReferences(info.path, info.getLatestVersion(), undefined);
            }

            function removeScriptInfo(path: Path) {
                references.delete(path);
                scriptVersionForReferences.delete(path);
            }

            function updateScriptInfo(scriptInfo: ScriptInfo) {
                const path = scriptInfo.path;
                const lastUpdatedVersion = scriptVersionForReferences.get(path);
                const latestVersion = scriptInfo.getLatestVersion();
                if (lastUpdatedVersion !== latestVersion) {
                    setReferences(path, latestVersion, references.get(path));
                }
            }

            function getReferencedByPaths(path: Path) {
                return referencedBy.get(path) || [];
            }

            function getFilesAffectedByUpdatedShape(scriptInfo: ScriptInfo, singleFileResult: string[]): string[] {
                const path = scriptInfo.path;
                const sourceFile = getSourceFile(path);
                if (!isExternalModuleOrHasOnlyAmbientExternalModules(sourceFile)) {
                    return project.getAllEmittableFiles();
                }

                const options = project.getCompilerOptions();
                if (options && (options.isolatedModules || options.out || options.outFile)) {
                    return singleFileResult;
                }

                // Now we need to if each file in the referencedBy list has a shape change as well.
                // Because if so, its own referencedBy files need to be saved as well to make the
                // emitting result consistent with files on disk.

                const fileNamesMap = createMap<NormalizedPath>();
                const setFileName = (path: Path, scriptInfo: ScriptInfo) => {
                    fileNamesMap.set(path, scriptInfo && shouldEmitFile(scriptInfo) ? scriptInfo.fileName : undefined);
                };

                // Start with the paths this file was referenced by
                setFileName(path, scriptInfo);
                const queue = getReferencedByPaths(path).slice();
                while (queue.length > 0) {
                    const currentPath = queue.pop();
                    if (!fileNamesMap.has(currentPath)) {
                        const currentScriptInfo = getScriptInfo(currentPath);
                        if (currentScriptInfo && updateShapeSignature(currentScriptInfo)) {
                            queue.push(...getReferencedByPaths(currentPath));
                        }
                        setFileName(currentPath, currentScriptInfo);
                    }
                }

                // Return array of values that needs emit
                return flatMapIter(fileNamesMap.values(), value => value);
            }
        }
    }
}

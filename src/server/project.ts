/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts"/>
/// <reference path="scriptInfo.ts"/>
/// <reference path="lsHost.ts"/>
/// <reference path="typingsCache.ts"/>
/// <reference path="builder.ts"/>

namespace ts.server {

    export enum ProjectKind {
        Inferred,
        Configured,
        External
    }

    /* @internal */
    export function countEachFileTypes(infos: ScriptInfo[]): FileStats {
        const result = { js: 0, jsx: 0, ts: 0, tsx: 0, dts: 0 };
        for (const info of infos) {
            switch (info.scriptKind) {
                case ScriptKind.JS:
                    result.js += 1;
                    break;
                case ScriptKind.JSX:
                    result.jsx += 1;
                    break;
                case ScriptKind.TS:
                    fileExtensionIs(info.fileName, Extension.Dts)
                        ? result.dts += 1
                        : result.ts += 1;
                    break;
                case ScriptKind.TSX:
                    result.tsx += 1;
                    break;
            }
        }
        return result;
    }

    function hasOneOrMoreJsAndNoTsFiles(project: Project) {
        const counts = countEachFileTypes(project.getScriptInfos());
        return counts.js > 0 && counts.ts === 0 && counts.tsx === 0;
    }

    export function allRootFilesAreJsOrDts(project: Project): boolean {
        const counts = countEachFileTypes(project.getRootScriptInfos());
        return counts.ts === 0 && counts.tsx === 0;
    }

    export function allFilesAreJsOrDts(project: Project): boolean {
        const counts = countEachFileTypes(project.getScriptInfos());
        return counts.ts === 0 && counts.tsx === 0;
    }

    /* @internal */
    export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
        projectErrors: Diagnostic[];
    }

    export class UnresolvedImportsMap {
        readonly perFileMap = createMap<ReadonlyArray<string>>();
        private version = 0;

        public clear() {
            this.perFileMap.clear();
            this.version = 0;
        }

        public getVersion() {
            return this.version;
        }

        public remove(path: Path) {
            this.perFileMap.delete(path);
            this.version++;
        }

        public get(path: Path) {
            return this.perFileMap.get(path);
        }

        public set(path: Path, value: ReadonlyArray<string>) {
            this.perFileMap.set(path, value);
            this.version++;
        }
    }

    export interface PluginCreateInfo {
        project: Project;
        languageService: LanguageService;
        languageServiceHost: LanguageServiceHost;
        serverHost: ServerHost;
        config: any;
    }

    export interface PluginModule {
        create(createInfo: PluginCreateInfo): LanguageService;
        getExternalFiles?(proj: Project): string[];
    }

    export interface PluginModuleFactory {
        (mod: { typescript: typeof ts }): PluginModule;
    }

    export abstract class Project {
        private rootFiles: ScriptInfo[] = [];
        private rootFilesMap: Map<ScriptInfo> = createMap<ScriptInfo>();
        private program: Program;
        private externalFiles: SortedReadonlyArray<string>;
        private missingFilesMap: Map<FileWatcher> = createMap<FileWatcher>();

        private cachedUnresolvedImportsPerFile = new UnresolvedImportsMap();
        private lastCachedUnresolvedImportsList: SortedReadonlyArray<string>;

        // wrapper over the real language service that will suppress all semantic operations
        protected languageService: LanguageService;

        public languageServiceEnabled = true;

        protected lsHost: LSHost;

        builder: Builder;
        /**
         * Set of files names that were updated since the last call to getChangesSinceVersion.
         */
        private updatedFileNames: Map<true>;
        /**
         * Set of files that was returned from the last call to getChangesSinceVersion.
         */
        private lastReportedFileNames: Map<true>;
        /**
         * Last version that was reported.
         */
        private lastReportedVersion = 0;
        /**
         * Current project structure version.
         * This property is changed in 'updateGraph' based on the set of files in program
         */
        private projectStructureVersion = 0;
        /**
         * Current version of the project state. It is changed when:
         * - new root file was added/removed
         * - edit happen in some file that is currently included in the project.
         * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
         */
        private projectStateVersion = 0;

        private typingFiles: SortedReadonlyArray<string>;

        protected projectErrors: Diagnostic[];

        public typesVersion = 0;

        public isNonTsProject() {
            this.updateGraph();
            return allFilesAreJsOrDts(this);
        }

        public isJsOnlyProject() {
            this.updateGraph();
            return hasOneOrMoreJsAndNoTsFiles(this);
        }

        public getCachedUnresolvedImportsPerFile_TestOnly() {
            return this.cachedUnresolvedImportsPerFile;
        }

        public static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void): {} {
            const resolvedPath = normalizeSlashes(host.resolvePath(combinePaths(initialDir, "node_modules")));
            log(`Loading ${moduleName} from ${initialDir} (resolved to ${resolvedPath})`);
            const result = host.require(resolvedPath, moduleName);
            if (result.error) {
                log(`Failed to load module: ${JSON.stringify(result.error)}`);
                return undefined;
            }
            return result.module;
        }

        constructor(
            private readonly projectName: string,
            readonly projectKind: ProjectKind,
            readonly projectService: ProjectService,
            private documentRegistry: DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            languageServiceEnabled: boolean,
            private compilerOptions: CompilerOptions,
            public compileOnSaveEnabled: boolean) {

            if (!this.compilerOptions) {
                this.compilerOptions = getDefaultCompilerOptions();
                this.compilerOptions.allowNonTsExtensions = true;
                this.compilerOptions.allowJs = true;
            }
            else if (hasExplicitListOfFiles || this.compilerOptions.allowJs) {
                // If files are listed explicitly or allowJs is specified, allow all extensions
                this.compilerOptions.allowNonTsExtensions = true;
            }

            this.setInternalCompilerOptionsForEmittingJsFiles();

            this.lsHost = new LSHost(this.projectService.host, this, this.projectService.cancellationToken);
            this.lsHost.setCompilationSettings(this.compilerOptions);

            this.languageService = createLanguageService(this.lsHost, this.documentRegistry);

            if (!languageServiceEnabled) {
                this.disableLanguageService();
            }

            this.builder = createBuilder(this);
            this.markAsDirty();
        }

        private setInternalCompilerOptionsForEmittingJsFiles() {
            if (this.projectKind === ProjectKind.Inferred || this.projectKind === ProjectKind.External) {
                this.compilerOptions.noEmitForJsFiles = true;
            }
        }

        /**
         * Get the errors that dont have any file name associated
         */
        getGlobalProjectErrors() {
            return filter(this.projectErrors, diagnostic => !diagnostic.file);
        }

        getAllProjectErrors() {
            return this.projectErrors;
        }

        getLanguageService(ensureSynchronized = true): LanguageService {
            if (ensureSynchronized) {
                this.updateGraph();
            }
            return this.languageService;
        }

        getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[] {
            if (!this.languageServiceEnabled) {
                return [];
            }
            this.updateGraph();
            return this.builder.getFilesAffectedBy(scriptInfo);
        }

        getProjectVersion() {
            return this.projectStateVersion.toString();
        }

        enableLanguageService() {
            if (this.languageServiceEnabled) {
                return;
            }
            this.languageServiceEnabled = true;
            this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ true);
        }

        disableLanguageService() {
            if (!this.languageServiceEnabled) {
                return;
            }
            this.languageService.cleanupSemanticCache();
            this.languageServiceEnabled = false;
            this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ false);
        }

        getProjectName() {
            return this.projectName;
        }
        abstract getProjectRootPath(): string | undefined;
        abstract getTypeAcquisition(): TypeAcquisition;

        getExternalFiles(): SortedReadonlyArray<string> {
            return emptyArray as SortedReadonlyArray<string>;
        }

        getSourceFile(path: Path) {
            if (!this.program) {
                return undefined;
            }
            return this.program.getSourceFileByPath(path);
        }

        updateTypes() {
            this.typesVersion++;
            this.markAsDirty();
            this.updateGraph();
        }

        close() {
            if (this.program) {
                // if we have a program - release all files that are enlisted in program
                for (const f of this.program.getSourceFiles()) {
                    const info = this.projectService.getScriptInfo(f.fileName);
                    info.detachFromProject(this);
                }
            }
            if (!this.program || !this.languageServiceEnabled) {
                // release all root files either if there is no program or language service is disabled.
                // in the latter case set of root files can be larger than the set of files in program.
                for (const root of this.rootFiles) {
                    root.detachFromProject(this);
                }
            }
            this.rootFiles = undefined;
            this.rootFilesMap = undefined;
            this.program = undefined;
            this.builder = undefined;
            this.cachedUnresolvedImportsPerFile = undefined;
            this.projectErrors = undefined;
            this.lsHost.dispose();
            this.lsHost = undefined;

            // Clean up file watchers waiting for missing files
            this.missingFilesMap.forEach(fileWatcher => fileWatcher.close());
            this.missingFilesMap = undefined;

            // signal language service to release source files acquired from document registry
            this.languageService.dispose();
            this.languageService = undefined;
        }

        getCompilerOptions() {
            return this.compilerOptions;
        }

        hasRoots() {
            return this.rootFiles && this.rootFiles.length > 0;
        }

        getRootFiles() {
            return this.rootFiles && this.rootFiles.map(info => info.fileName);
        }

        getRootFilesLSHost() {
            const result: string[] = [];
            if (this.rootFiles) {
                for (const f of this.rootFiles) {
                    if (this.languageServiceEnabled || f.isScriptOpen()) {
                        // if language service is disabled - process only files that are open
                        result.push(f.fileName);
                    }
                }
                if (this.typingFiles) {
                    for (const f of this.typingFiles) {
                        result.push(f);
                    }
                }
            }
            return result;
        }

        getRootScriptInfos() {
            return this.rootFiles;
        }

        getScriptInfos() {
            if (!this.languageServiceEnabled) {
                // if language service is not enabled - return just root files
                return this.rootFiles;
            }
            return map(this.program.getSourceFiles(), sourceFile => {
                const scriptInfo = this.projectService.getScriptInfoForPath(sourceFile.path);
                if (!scriptInfo) {
                    Debug.assert(false, `scriptInfo for a file '${sourceFile.fileName}' is missing.`);
                }
                return scriptInfo;
            });
        }

        getFileEmitOutput(info: ScriptInfo, emitOnlyDtsFiles: boolean) {
            if (!this.languageServiceEnabled) {
                return undefined;
            }
            return this.getLanguageService().getEmitOutput(info.fileName, emitOnlyDtsFiles);
        }

        getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean) {
            if (!this.program) {
                return [];
            }

            if (!this.languageServiceEnabled) {
                // if language service is disabled assume that all files in program are root files + default library
                let rootFiles = this.getRootFiles();
                if (this.compilerOptions) {
                    const defaultLibrary = getDefaultLibFilePath(this.compilerOptions);
                    if (defaultLibrary) {
                        (rootFiles || (rootFiles = [])).push(asNormalizedPath(defaultLibrary));
                    }
                }
                return rootFiles;
            }
            const result: NormalizedPath[] = [];
            for (const f of this.program.getSourceFiles()) {
                if (excludeFilesFromExternalLibraries && this.program.isSourceFileFromExternalLibrary(f)) {
                    continue;
                }
                result.push(asNormalizedPath(f.fileName));
            }
            if (!excludeConfigFiles) {
                const configFile = this.program.getCompilerOptions().configFile;
                if (configFile) {
                    result.push(asNormalizedPath(configFile.fileName));
                    if (configFile.extendedSourceFiles) {
                        for (const f of configFile.extendedSourceFiles) {
                            result.push(asNormalizedPath(f));
                        }
                    }
                }
            }
            return result;
        }

        hasConfigFile(configFilePath: NormalizedPath) {
            if (this.program && this.languageServiceEnabled) {
                const configFile = this.program.getCompilerOptions().configFile;
                if (configFile) {
                    if (configFilePath === asNormalizedPath(configFile.fileName)) {
                        return true;
                    }
                    if (configFile.extendedSourceFiles) {
                        for (const f of configFile.extendedSourceFiles) {
                            if (configFilePath === asNormalizedPath(f)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

        getAllEmittableFiles() {
            if (!this.languageServiceEnabled) {
                return [];
            }
            const defaultLibraryFileName = getDefaultLibFileName(this.compilerOptions);
            const infos = this.getScriptInfos();
            const result: string[] = [];
            for (const info of infos) {
                if (getBaseFileName(info.fileName) !== defaultLibraryFileName && shouldEmitFile(info)) {
                    result.push(info.fileName);
                }
            }
            return result;
        }

        containsScriptInfo(info: ScriptInfo): boolean {
            return this.isRoot(info) || (this.program && this.program.getSourceFileByPath(info.path) !== undefined);
        }

        containsFile(filename: NormalizedPath, requireOpen?: boolean) {
            const info = this.projectService.getScriptInfoForNormalizedPath(filename);
            if (info && (info.isScriptOpen() || !requireOpen)) {
                return this.containsScriptInfo(info);
            }
        }

        isRoot(info: ScriptInfo) {
            return this.rootFilesMap && this.rootFilesMap.has(info.path);
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            if (!this.isRoot(info)) {
                this.rootFiles.push(info);
                this.rootFilesMap.set(info.path, info);
                info.attachToProject(this);

                this.markAsDirty();
            }
        }

        removeFile(info: ScriptInfo, detachFromProject = true) {
            if (this.isRoot(info)) {
                this.removeRoot(info);
            }
            this.lsHost.notifyFileRemoved(info);
            this.cachedUnresolvedImportsPerFile.remove(info.path);

            if (detachFromProject) {
                info.detachFromProject(this);
            }

            this.markAsDirty();
        }

        registerFileUpdate(fileName: string) {
            (this.updatedFileNames || (this.updatedFileNames = createMap<true>())).set(fileName, true);
        }

        markAsDirty() {
            this.projectStateVersion++;
        }

        private extractUnresolvedImportsFromSourceFile(file: SourceFile, result: string[]) {
            const cached = this.cachedUnresolvedImportsPerFile.get(file.path);
            if (cached) {
                // found cached result - use it and return
                for (const f of cached) {
                    result.push(f);
                }
                return;
            }
            let unresolvedImports: string[];
            if (file.resolvedModules) {
                file.resolvedModules.forEach((resolvedModule, name) => {
                    // pick unresolved non-relative names
                    if (!resolvedModule && !isExternalModuleNameRelative(name)) {
                        // for non-scoped names extract part up-to the first slash
                        // for scoped names - extract up to the second slash
                        let trimmed = name.trim();
                        let i = trimmed.indexOf("/");
                        if (i !== -1 && trimmed.charCodeAt(0) === CharacterCodes.at) {
                            i = trimmed.indexOf("/", i + 1);
                        }
                        if (i !== -1) {
                            trimmed = trimmed.substr(0, i);
                        }
                        (unresolvedImports || (unresolvedImports = [])).push(trimmed);
                        result.push(trimmed);
                    }
                });
            }
            this.cachedUnresolvedImportsPerFile.set(file.path, unresolvedImports || emptyArray);
        }

        /**
         * Updates set of files that contribute to this project
         * @returns: true if set of files in the project stays the same and false - otherwise.
         */
        updateGraph(): boolean {
            this.lsHost.startRecordingFilesWithChangedResolutions();

            let hasChanges = this.updateGraphWorker();

            const changedFiles: ReadonlyArray<Path> = this.lsHost.finishRecordingFilesWithChangedResolutions() || emptyArray;

            for (const file of changedFiles) {
                // delete cached information for changed files
                this.cachedUnresolvedImportsPerFile.remove(file);
            }

            // 1. no changes in structure, no changes in unresolved imports - do nothing
            // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
            // (can reuse cached imports for files that were not changed)
            // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
            // (can reuse cached imports for files that were not changed)
            // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
            let unresolvedImports: SortedReadonlyArray<string>;
            if (hasChanges || changedFiles.length) {
                const result: string[] = [];
                for (const sourceFile of this.program.getSourceFiles()) {
                    this.extractUnresolvedImportsFromSourceFile(sourceFile, result);
                }
                this.lastCachedUnresolvedImportsList = toSortedArray(result);
            }
            unresolvedImports = this.lastCachedUnresolvedImportsList;

            const cachedTypings = this.projectService.typingsCache.getTypingsForProject(this, unresolvedImports, hasChanges);
            if (this.setTypings(cachedTypings)) {
                hasChanges = this.updateGraphWorker() || hasChanges;
            }

            // update builder only if language service is enabled
            // otherwise tell it to drop its internal state
            if (this.languageServiceEnabled) {
                this.builder.onProjectUpdateGraph();
            }
            else {
                this.builder.clear();
            }

            if (hasChanges) {
                this.projectStructureVersion++;
            }
            return !hasChanges;
        }

        private setTypings(typings: SortedReadonlyArray<string>): boolean {
            if (arrayIsEqualTo(this.typingFiles, typings)) {
                return false;
            }
            this.typingFiles = typings;
            this.markAsDirty();
            return true;
        }

        private updateGraphWorker() {
            const oldProgram = this.program;
            this.program = this.languageService.getProgram();

            // bump up the version if
            // - oldProgram is not set - this is a first time updateGraph is called
            // - newProgram is different from the old program and structure of the old program was not reused.
            const hasChanges = !oldProgram || (this.program !== oldProgram && !(oldProgram.structureIsReused & StructureIsReused.Completely));

            if (hasChanges) {
                if (oldProgram) {
                    for (const f of oldProgram.getSourceFiles()) {
                        if (this.program.getSourceFileByPath(f.path)) {
                            continue;
                        }
                        // new program does not contain this file - detach it from the project
                        const scriptInfoToDetach = this.projectService.getScriptInfo(f.fileName);
                        if (scriptInfoToDetach) {
                            scriptInfoToDetach.detachFromProject(this);
                        }
                    }
                }

                const missingFilePaths = this.program.getMissingFilePaths();
                const missingFilePathsSet = arrayToSet(missingFilePaths);

                // Files that are no longer missing (e.g. because they are no longer required)
                // should no longer be watched.
                this.missingFilesMap.forEach((fileWatcher, missingFilePath) => {
                    if (!missingFilePathsSet.has(missingFilePath)) {
                        this.missingFilesMap.delete(missingFilePath);
                        fileWatcher.close();
                    }
                });

                // Missing files that are not yet watched should be added to the map.
                for (const missingFilePath of missingFilePaths) {
                    if (!this.missingFilesMap.has(missingFilePath)) {
                        const fileWatcher = this.projectService.host.watchFile(missingFilePath, (_filename: string, eventKind: FileWatcherEventKind) => {
                            if (eventKind === FileWatcherEventKind.Created && this.missingFilesMap.has(missingFilePath)) {
                                fileWatcher.close();
                                this.missingFilesMap.delete(missingFilePath);

                                // When a missing file is created, we should update the graph.
                                this.markAsDirty();
                                this.updateGraph();
                            }
                        });
                        this.missingFilesMap.set(missingFilePath, fileWatcher);
                    }
                }
            }

            const oldExternalFiles = this.externalFiles || emptyArray as SortedReadonlyArray<string>;
            this.externalFiles = this.getExternalFiles();
            enumerateInsertsAndDeletes(this.externalFiles, oldExternalFiles,
                // Ensure a ScriptInfo is created for new external files. This is performed indirectly
                // by the LSHost for files in the program when the program is retrieved above but
                // the program doesn't contain external files so this must be done explicitly.
                inserted => {
                    const scriptInfo = this.projectService.getOrCreateScriptInfo(inserted, /*openedByClient*/ false);
                    scriptInfo.attachToProject(this);
                },
                removed => {
                    const scriptInfoToDetach = this.projectService.getScriptInfo(removed);
                    if (scriptInfoToDetach) {
                        scriptInfoToDetach.detachFromProject(this);
                    }
                });

            return hasChanges;
        }

        isWatchedMissingFile(path: Path) {
            return this.missingFilesMap.has(path);
        }

        getScriptInfoLSHost(fileName: string) {
            const scriptInfo = this.projectService.getOrCreateScriptInfo(fileName, /*openedByClient*/ false);
            if (scriptInfo) {
                scriptInfo.attachToProject(this);
            }
            return scriptInfo;
        }

        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            const scriptInfo = this.projectService.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ false);
            if (scriptInfo && !scriptInfo.isAttached(this)) {
                return Errors.ThrowProjectDoesNotContainDocument(fileName, this);
            }
            return scriptInfo;
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        }

        filesToString() {
            if (!this.program) {
                return "";
            }
            let strBuilder = "";
            for (const file of this.program.getSourceFiles()) {
                strBuilder += `\t${file.fileName}\n`;
            }
            return strBuilder;
        }

        setCompilerOptions(compilerOptions: CompilerOptions) {
            if (compilerOptions) {
                compilerOptions.allowNonTsExtensions = true;
                if (changesAffectModuleResolution(this.compilerOptions, compilerOptions)) {
                    // reset cached unresolved imports if changes in compiler options affected module resolution
                    this.cachedUnresolvedImportsPerFile.clear();
                    this.lastCachedUnresolvedImportsList = undefined;
                }
                this.compilerOptions = compilerOptions;
                this.setInternalCompilerOptionsForEmittingJsFiles();
                this.lsHost.setCompilationSettings(compilerOptions);

                this.markAsDirty();
            }
        }

        reloadScript(filename: NormalizedPath, tempFileName?: NormalizedPath): boolean {
            const script = this.projectService.getScriptInfoForNormalizedPath(filename);
            if (script) {
                Debug.assert(script.isAttached(this));
                script.reloadFromFile(tempFileName);
                return true;
            }
            return false;
        }

        /* @internal */
        getChangesSinceVersion(lastKnownVersion?: number): ProjectFilesWithTSDiagnostics {
            this.updateGraph();

            const info = {
                projectName: this.getProjectName(),
                version: this.projectStructureVersion,
                isInferred: this.projectKind === ProjectKind.Inferred,
                options: this.getCompilerOptions(),
                languageServiceDisabled: !this.languageServiceEnabled
            };
            const updatedFileNames = this.updatedFileNames;
            this.updatedFileNames = undefined;
            // check if requested version is the same that we have reported last time
            if (this.lastReportedFileNames && lastKnownVersion === this.lastReportedVersion) {
                // if current structure version is the same - return info without any changes
                if (this.projectStructureVersion === this.lastReportedVersion && !updatedFileNames) {
                    return { info, projectErrors: this.getGlobalProjectErrors() };
                }
                // compute and return the difference
                const lastReportedFileNames = this.lastReportedFileNames;
                const currentFiles = arrayToSet(this.getFileNames());

                const added: string[] = [];
                const removed: string[] = [];
                const updated: string[] = updatedFileNames ? arrayFrom(updatedFileNames.keys()) : [];

                forEachKey(currentFiles, id => {
                    if (!lastReportedFileNames.has(id)) {
                        added.push(id);
                    }
                });
                forEachKey(lastReportedFileNames, id => {
                    if (!currentFiles.has(id)) {
                        removed.push(id);
                    }
                });
                this.lastReportedFileNames = currentFiles;
                this.lastReportedVersion = this.projectStructureVersion;
                return { info, changes: { added, removed, updated }, projectErrors: this.getGlobalProjectErrors() };
            }
            else {
                // unknown version - return everything
                const projectFileNames = this.getFileNames();
                this.lastReportedFileNames = arrayToSet(projectFileNames);
                this.lastReportedVersion = this.projectStructureVersion;
                return { info, files: projectFileNames, projectErrors: this.getGlobalProjectErrors() };
            }
        }

        getReferencedFiles(path: Path): Path[] {
            if (!this.languageServiceEnabled) {
                return [];
            }

            const sourceFile = this.getSourceFile(path);
            if (!sourceFile) {
                return [];
            }
            // We need to use a set here since the code can contain the same import twice,
            // but that will only be one dependency.
            // To avoid invernal conversion, the key of the referencedFiles map must be of type Path
            const referencedFiles = createMap<true>();
            if (sourceFile.imports && sourceFile.imports.length > 0) {
                const checker: TypeChecker = this.program.getTypeChecker();
                for (const importName of sourceFile.imports) {
                    const symbol = checker.getSymbolAtLocation(importName);
                    if (symbol && symbol.declarations && symbol.declarations[0]) {
                        const declarationSourceFile = symbol.declarations[0].getSourceFile();
                        if (declarationSourceFile) {
                            referencedFiles.set(declarationSourceFile.path, true);
                        }
                    }
                }
            }

            const currentDirectory = getDirectoryPath(path);
            const getCanonicalFileName = createGetCanonicalFileName(this.projectService.host.useCaseSensitiveFileNames);
            // Handle triple slash references
            if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
                for (const referencedFile of sourceFile.referencedFiles) {
                    const referencedPath = toPath(referencedFile.fileName, currentDirectory, getCanonicalFileName);
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
                    const typeFilePath = toPath(fileName, currentDirectory, getCanonicalFileName);
                    referencedFiles.set(typeFilePath, true);
                });
            }

            const allFileNames = arrayFrom(referencedFiles.keys()) as Path[];
            return filter(allFileNames, file => this.projectService.host.fileExists(file));
        }

        // remove a root file from project
        protected removeRoot(info: ScriptInfo): void {
            orderedRemoveItem(this.rootFiles, info);
            this.rootFilesMap.delete(info.path);
        }
    }

    /**
     * If a file is opened and no tsconfig (or jsconfig) is found,
     * the file and its imports/references are put into an InferredProject.
     */
    export class InferredProject extends Project {

        private static newName = (() => {
            let nextId = 1;
            return () => {
                const id = nextId;
                nextId++;
                return makeInferredProjectName(id);
            };
        })();

        private _isJsInferredProject = false;

        toggleJsInferredProject(isJsInferredProject: boolean) {
            if (isJsInferredProject !== this._isJsInferredProject) {
                this._isJsInferredProject = isJsInferredProject;
                this.setCompilerOptions();
            }
        }

        setCompilerOptions(options?: CompilerOptions) {
            // Avoid manipulating the given options directly
            const newOptions = options ? cloneCompilerOptions(options) : this.getCompilerOptions();
            if (!newOptions) {
                return;
            }

            if (this._isJsInferredProject && typeof newOptions.maxNodeModuleJsDepth !== "number") {
                newOptions.maxNodeModuleJsDepth = 2;
            }
            else if (!this._isJsInferredProject) {
                newOptions.maxNodeModuleJsDepth = undefined;
            }
            newOptions.allowJs = true;
            super.setCompilerOptions(newOptions);
        }

        // Used to keep track of what directories are watched for this project
        directoriesWatchedForTsconfig: string[] = [];

        constructor(projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions) {
            super(InferredProject.newName(),
                ProjectKind.Inferred,
                projectService,
                documentRegistry,
                /*files*/ undefined,
                /*languageServiceEnabled*/ true,
                compilerOptions,
                /*compileOnSaveEnabled*/ false);
        }

        addRoot(info: ScriptInfo) {
            if (!this._isJsInferredProject && info.isJavaScript()) {
                this.toggleJsInferredProject(/*isJsInferredProject*/ true);
            }
            super.addRoot(info);
        }

        removeRoot(info: ScriptInfo) {
            if (this._isJsInferredProject && info.isJavaScript()) {
                if (filter(this.getRootScriptInfos(), info => info.isJavaScript()).length === 0) {
                    this.toggleJsInferredProject(/*isJsInferredProject*/ false);
                }
            }
            super.removeRoot(info);
        }

        getProjectRootPath() {
            // Single inferred project does not have a project root.
            if (this.projectService.useSingleInferredProject) {
                return undefined;
            }
            const rootFiles = this.getRootFiles();
            return getDirectoryPath(rootFiles[0]);
        }

        close() {
            super.close();

            for (const directory of this.directoriesWatchedForTsconfig) {
                this.projectService.stopWatchingDirectory(directory);
            }
        }

        getTypeAcquisition(): TypeAcquisition {
            return {
                enable: allRootFilesAreJsOrDts(this),
                include: [],
                exclude: []
            };
        }
    }

    /**
     * If a file is opened, the server will look for a tsconfig (or jsconfig)
     * and if successfull create a ConfiguredProject for it.
     * Otherwise it will create an InferredProject.
     */
    export class ConfiguredProject extends Project {
        private typeAcquisition: TypeAcquisition;
        private projectFileWatcher: FileWatcher;
        private directoryWatcher: FileWatcher;
        private directoriesWatchedForWildcards: Map<FileWatcher>;
        private typeRootsWatchers: FileWatcher[];
        readonly canonicalConfigFilePath: NormalizedPath;

        private plugins: PluginModule[] = [];

        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        constructor(configFileName: NormalizedPath,
            projectService: ProjectService,
            documentRegistry: DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            compilerOptions: CompilerOptions,
            private wildcardDirectories: Map<WatchDirectoryFlags>,
            languageServiceEnabled: boolean,
            public compileOnSaveEnabled: boolean) {
            super(configFileName, ProjectKind.Configured, projectService, documentRegistry, hasExplicitListOfFiles, languageServiceEnabled, compilerOptions, compileOnSaveEnabled);
            this.canonicalConfigFilePath = asNormalizedPath(projectService.toCanonicalFileName(configFileName));
            this.enablePlugins();
        }

        getConfigFilePath() {
            return this.getProjectName();
        }

        enablePlugins() {
            const host = this.projectService.host;
            const options = this.getCompilerOptions();

            if (!host.require) {
                this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
                return;
            }

            // Search our peer node_modules, then any globally-specified probe paths
            // ../../.. to walk from X/node_modules/typescript/lib/tsserver.js to X/node_modules/
            const searchPaths = [combinePaths(host.getExecutingFilePath(), "../../.."), ...this.projectService.pluginProbeLocations];

            if (this.projectService.allowLocalPluginLoads) {
                const local = getDirectoryPath(this.canonicalConfigFilePath);
                this.projectService.logger.info(`Local plugin loading enabled; adding ${local} to search paths`);
                searchPaths.unshift(local);
            }

            // Enable tsconfig-specified plugins
            if (options.plugins) {
                for (const pluginConfigEntry of options.plugins) {
                    this.enablePlugin(pluginConfigEntry, searchPaths);
                }
            }

            if (this.projectService.globalPlugins) {
                // Enable global plugins with synthetic configuration entries
                for (const globalPluginName of this.projectService.globalPlugins) {
                    // Skip already-locally-loaded plugins
                    if (options.plugins && options.plugins.some(p => p.name === globalPluginName)) continue;

                    // Provide global: true so plugins can detect why they can't find their config
                    this.enablePlugin({ name: globalPluginName, global: true } as PluginImport, searchPaths);
                }
            }
        }

        private enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[]) {
            const log = (message: string) => {
                this.projectService.logger.info(message);
            };

            for (const searchPath of searchPaths) {
                const resolvedModule = <PluginModuleFactory>Project.resolveModule(pluginConfigEntry.name, searchPath, this.projectService.host, log);
                if (resolvedModule) {
                    this.enableProxy(resolvedModule, pluginConfigEntry);
                    return;
                }
            }
            this.projectService.logger.info(`Couldn't find ${pluginConfigEntry.name} anywhere in paths: ${searchPaths.join(",")}`);
        }

        private enableProxy(pluginModuleFactory: PluginModuleFactory, configEntry: PluginImport) {
            try {
                if (typeof pluginModuleFactory !== "function") {
                    this.projectService.logger.info(`Skipped loading plugin ${configEntry.name} because it did expose a proper factory function`);
                    return;
                }

                const info: PluginCreateInfo = {
                    config: configEntry,
                    project: this,
                    languageService: this.languageService,
                    languageServiceHost: this.lsHost,
                    serverHost: this.projectService.host
                };

                const pluginModule = pluginModuleFactory({ typescript: ts });
                this.languageService = pluginModule.create(info);
                this.plugins.push(pluginModule);
            }
            catch (e) {
                this.projectService.logger.info(`Plugin activation failed: ${e}`);
            }
        }

        getProjectRootPath() {
            return getDirectoryPath(this.getConfigFilePath());
        }

        setProjectErrors(projectErrors: Diagnostic[]) {
            this.projectErrors = projectErrors;
        }

        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void {
            this.typeAcquisition = newTypeAcquisition;
        }

        getTypeAcquisition() {
            return this.typeAcquisition;
        }

        getExternalFiles(): SortedReadonlyArray<string> {
            return toSortedArray(flatMap(this.plugins, plugin => {
                if (typeof plugin.getExternalFiles !== "function") return;
                try {
                    return plugin.getExternalFiles(this);
                }
                catch (e) {
                    this.projectService.logger.info(`A plugin threw an exception in getExternalFiles: ${e}`);
                }
            }));
        }

        watchConfigFile(callback: (project: ConfiguredProject) => void) {
            this.projectFileWatcher = this.projectService.host.watchFile(this.getConfigFilePath(), _ => callback(this));
        }

        watchTypeRoots(callback: (project: ConfiguredProject, path: string) => void) {
            const roots = this.getEffectiveTypeRoots();
            const watchers: FileWatcher[] = [];
            for (const root of roots) {
                this.projectService.logger.info(`Add type root watcher for: ${root}`);
                watchers.push(this.projectService.host.watchDirectory(root, path => callback(this, path), /*recursive*/ false));
            }
            this.typeRootsWatchers = watchers;
        }

        watchConfigDirectory(callback: (project: ConfiguredProject, path: string) => void) {
            if (this.directoryWatcher) {
                return;
            }

            const directoryToWatch = getDirectoryPath(this.getConfigFilePath());
            this.projectService.logger.info(`Add recursive watcher for: ${directoryToWatch}`);
            this.directoryWatcher = this.projectService.host.watchDirectory(directoryToWatch, path => callback(this, path), /*recursive*/ true);
        }

        watchWildcards(callback: (project: ConfiguredProject, path: string) => void) {
            if (!this.wildcardDirectories) {
                return;
            }
            const configDirectoryPath = getDirectoryPath(this.getConfigFilePath());

            this.directoriesWatchedForWildcards = createMap<FileWatcher>();
            this.wildcardDirectories.forEach((flag, directory) => {
                if (comparePaths(configDirectoryPath, directory, ".", !this.projectService.host.useCaseSensitiveFileNames) !== Comparison.EqualTo) {
                    const recursive = (flag & WatchDirectoryFlags.Recursive) !== 0;
                    this.projectService.logger.info(`Add ${recursive ? "recursive " : ""}watcher for: ${directory}`);
                    this.directoriesWatchedForWildcards.set(directory, this.projectService.host.watchDirectory(
                        directory,
                        path => callback(this, path),
                        recursive
                    ));
                }
            });
        }

        stopWatchingDirectory() {
            if (this.directoryWatcher) {
                this.directoryWatcher.close();
                this.directoryWatcher = undefined;
            }
        }

        close() {
            super.close();

            if (this.projectFileWatcher) {
                this.projectFileWatcher.close();
                this.projectFileWatcher = undefined;
            }

            if (this.typeRootsWatchers) {
                for (const watcher of this.typeRootsWatchers) {
                    watcher.close();
                }
                this.typeRootsWatchers = undefined;
            }

            this.directoriesWatchedForWildcards.forEach(watcher => {
                watcher.close();
            });
            this.directoriesWatchedForWildcards = undefined;

            this.stopWatchingDirectory();
        }

        addOpenRef() {
            this.openRefCount++;
        }

        deleteOpenRef() {
            this.openRefCount--;
            return this.openRefCount;
        }

        getEffectiveTypeRoots() {
            return getEffectiveTypeRoots(this.getCompilerOptions(), this.projectService.host) || [];
        }
    }

    /**
     * Project whose configuration is handled externally, such as in a '.csproj'.
     * These are created only if a host explicitly calls `openExternalProject`.
     */
    export class ExternalProject extends Project {
        private typeAcquisition: TypeAcquisition;
        constructor(public externalProjectName: string,
            projectService: ProjectService,
            documentRegistry: DocumentRegistry,
            compilerOptions: CompilerOptions,
            languageServiceEnabled: boolean,
            public compileOnSaveEnabled: boolean,
            private readonly projectFilePath?: string) {
            super(externalProjectName, ProjectKind.External, projectService, documentRegistry, /*hasExplicitListOfFiles*/ true, languageServiceEnabled, compilerOptions, compileOnSaveEnabled);
        }

        getProjectRootPath() {
            if (this.projectFilePath) {
                return getDirectoryPath(this.projectFilePath);
            }
            // if the projectFilePath is not given, we make the assumption that the project name
            // is the path of the project file. AS the project name is provided by VS, we need to
            // normalize slashes before using it as a file name.
            return getDirectoryPath(normalizeSlashes(this.getProjectName()));
        }

        getTypeAcquisition() {
            return this.typeAcquisition;
        }

        setProjectErrors(projectErrors: Diagnostic[]) {
            this.projectErrors = projectErrors;
        }

        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void {
            if (!newTypeAcquisition) {
                // set default typings options
                newTypeAcquisition = {
                    enable: allRootFilesAreJsOrDts(this),
                    include: [],
                    exclude: []
                };
            }
            else {
                if (newTypeAcquisition.enable === undefined) {
                    // if autoDiscovery was not specified by the caller - set it based on the content of the project
                    newTypeAcquisition.enable = allRootFilesAreJsOrDts(this);
                }
                if (!newTypeAcquisition.include) {
                    newTypeAcquisition.include = [];
                }
                if (!newTypeAcquisition.exclude) {
                    newTypeAcquisition.exclude = [];
                }
            }
            this.typeAcquisition = newTypeAcquisition;
        }
    }
}

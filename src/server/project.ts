namespace ts.server {

    export enum ProjectKind {
        Inferred,
        Configured,
        External
    }

    /* @internal */
    export type Mutable<T> = { -readonly [K in keyof T]: T[K]; };

    /* @internal */
    export function countEachFileTypes(infos: ScriptInfo[]): FileStats {
        const result: Mutable<FileStats> = { js: 0, jsx: 0, ts: 0, tsx: 0, dts: 0, deferred: 0 };
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
                case ScriptKind.Deferred:
                    result.deferred += 1;
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
    export function hasNoTypeScriptSource(fileNames: string[]): boolean {
        return !fileNames.some(fileName => (fileExtensionIs(fileName, Extension.Ts) && !fileExtensionIs(fileName, Extension.Dts)) || fileExtensionIs(fileName, Extension.Tsx));
    }

    /* @internal */
    export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
        projectErrors: ReadonlyArray<Diagnostic>;
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

    export type PluginModuleFactory = (mod: { typescript: typeof ts }) => PluginModule;

    /**
     * The project root can be script info - if root is present,
     * or it could be just normalized path if root wasnt present on the host(only for non inferred project)
     */
    export type ProjectRoot = ScriptInfo | NormalizedPath;
    /* @internal */
    export function isScriptInfo(value: ProjectRoot): value is ScriptInfo {
        return value instanceof ScriptInfo;
    }

    export abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
        private rootFiles: ScriptInfo[] = [];
        private rootFilesMap: Map<ProjectRoot> = createMap<ProjectRoot>();
        private program: Program;
        private externalFiles: SortedReadonlyArray<string>;
        private missingFilesMap: Map<FileWatcher>;
        private plugins: PluginModule[] = [];

        /*@internal*/
        /**
         * This is map from files to unresolved imports in it
         * Maop does not contain entries for files that do not have unresolved imports
         * This helps in containing the set of files to invalidate
         */
        cachedUnresolvedImportsPerFile = createMap<ReadonlyArray<string>>();

        /*@internal*/
        lastCachedUnresolvedImportsList: SortedReadonlyArray<string>;
        /*@internal*/
        private hasAddedorRemovedFiles = false;

        private lastFileExceededProgramSize: string | undefined;

        // wrapper over the real language service that will suppress all semantic operations
        protected languageService: LanguageService;

        public languageServiceEnabled: boolean;

        readonly trace?: (s: string) => void;
        readonly realpath?: (path: string) => string;

        /*@internal*/
        hasInvalidatedResolution: HasInvalidatedResolution;

        /*@internal*/
        resolutionCache: ResolutionCache;

        private builderState: BuilderState | undefined;
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
         * Current project's program version. (incremented everytime new program is created that is not complete reuse from the old one)
         * This property is changed in 'updateGraph' based on the set of files in program
         */
        private projectProgramVersion = 0;
        /**
         * Current version of the project state. It is changed when:
         * - new root file was added/removed
         * - edit happen in some file that is currently included in the project.
         * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
         */
        private projectStateVersion = 0;

        /*@internal*/
        dirty = false;

        /*@internal*/
        hasChangedAutomaticTypeDirectiveNames = false;

        /*@internal*/
        typingFiles: SortedReadonlyArray<string> = emptyArray;

        private readonly cancellationToken: ThrottledCancellationToken;

        public isNonTsProject() {
            this.updateGraph();
            return allFilesAreJsOrDts(this);
        }

        public isJsOnlyProject() {
            this.updateGraph();
            return hasOneOrMoreJsAndNoTsFiles(this);
        }

        public static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void): {} | undefined {
            const resolvedPath = normalizeSlashes(host.resolvePath(combinePaths(initialDir, "node_modules")));
            log(`Loading ${moduleName} from ${initialDir} (resolved to ${resolvedPath})`);
            const result = host.require(resolvedPath, moduleName);
            if (result.error) {
                const err = result.error.stack || result.error.message || JSON.stringify(result.error);
                log(`Failed to load module '${moduleName}': ${err}`);
                return undefined;
            }
            return result.module;
        }

        /*@internal*/
        readonly currentDirectory: string;

        /*@internal*/
        public directoryStructureHost: DirectoryStructureHost;

        /*@internal*/
        public readonly getCanonicalFileName: GetCanonicalFileName;

        /*@internal*/
        constructor(
            /*@internal*/readonly projectName: string,
            readonly projectKind: ProjectKind,
            readonly projectService: ProjectService,
            private documentRegistry: DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            lastFileExceededProgramSize: string | undefined,
            private compilerOptions: CompilerOptions,
            public compileOnSaveEnabled: boolean,
            directoryStructureHost: DirectoryStructureHost,
            currentDirectory: string | undefined) {
            this.directoryStructureHost = directoryStructureHost;
            this.currentDirectory = this.projectService.getNormalizedAbsolutePath(currentDirectory || "");
            this.getCanonicalFileName = this.projectService.toCanonicalFileName;

            this.cancellationToken = new ThrottledCancellationToken(this.projectService.cancellationToken, this.projectService.throttleWaitMilliseconds);
            if (!this.compilerOptions) {
                this.compilerOptions = getDefaultCompilerOptions();
                this.compilerOptions.allowNonTsExtensions = true;
                this.compilerOptions.allowJs = true;
            }
            else if (hasExplicitListOfFiles || this.compilerOptions.allowJs || this.projectService.hasDeferredExtension()) {
                // If files are listed explicitly or allowJs is specified, allow all extensions
                this.compilerOptions.allowNonTsExtensions = true;
            }

            this.languageServiceEnabled = !projectService.syntaxOnly;

            this.setInternalCompilerOptionsForEmittingJsFiles();
            const host = this.projectService.host;
            if (this.projectService.logger.loggingEnabled()) {
                this.trace = s => this.writeLog(s);
            }
            else if (host.trace) {
                this.trace = s => host.trace(s);
            }

            if (host.realpath) {
                this.realpath = path => host.realpath(path);
            }

            // Use the current directory as resolution root only if the project created using current directory string
            this.resolutionCache = createResolutionCache(this, currentDirectory && this.currentDirectory, /*logChangesWhenResolvingModule*/ true);
            this.languageService = createLanguageService(this, this.documentRegistry, projectService.syntaxOnly);
            if (lastFileExceededProgramSize) {
                this.disableLanguageService(lastFileExceededProgramSize);
            }
            this.markAsDirty();
            this.projectService.pendingEnsureProjectForOpenFiles = true;
        }

        isKnownTypesPackageName(name: string): boolean {
            return this.typingsCache.isKnownTypesPackageName(name);
        }
        installPackage(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult> {
            return this.typingsCache.installPackage({ ...options, projectName: this.projectName, projectRootPath: this.toPath(this.currentDirectory) });
        }
        private get typingsCache(): TypingsCache {
            return this.projectService.typingsCache;
        }

        // Method of LanguageServiceHost
        getCompilationSettings() {
            return this.compilerOptions;
        }

        // Method to support public API
        getCompilerOptions() {
            return this.getCompilationSettings();
        }

        getNewLine() {
            return this.projectService.host.newLine;
        }

        getProjectVersion() {
            return this.projectStateVersion.toString();
        }

        getProjectReferences(): ReadonlyArray<ProjectReference> | undefined {
            return undefined;
        }

        getScriptFileNames() {
            if (!this.rootFiles) {
                return ts.emptyArray;
            }

            let result: string[] | undefined;
            this.rootFilesMap.forEach(value => {
                if (this.languageServiceEnabled || (isScriptInfo(value) && value.isScriptOpen())) {
                    // if language service is disabled - process only files that are open
                    (result || (result = [])).push(isScriptInfo(value) ? value.fileName : value);
                }
            });

            return addRange(result, this.typingFiles) || ts.emptyArray;
        }

        private getOrCreateScriptInfoAndAttachToProject(fileName: string) {
            const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(fileName, this.currentDirectory, this.directoryStructureHost);
            if (scriptInfo) {
                const existingValue = this.rootFilesMap.get(scriptInfo.path);
                if (existingValue !== scriptInfo && existingValue !== undefined) {
                    // This was missing path earlier but now the file exists. Update the root
                    this.rootFiles.push(scriptInfo);
                    this.rootFilesMap.set(scriptInfo.path, scriptInfo);
                }
                scriptInfo.attachToProject(this);
            }
            return scriptInfo;
        }

        getScriptKind(fileName: string) {
            const info = this.getOrCreateScriptInfoAndAttachToProject(fileName);
            return info && info.scriptKind;
        }

        getScriptVersion(filename: string) {
            const info = this.getOrCreateScriptInfoAndAttachToProject(filename);
            return info && info.getLatestVersion();
        }

        getScriptSnapshot(filename: string): IScriptSnapshot {
            const scriptInfo = this.getOrCreateScriptInfoAndAttachToProject(filename);
            if (scriptInfo) {
                return scriptInfo.getSnapshot();
            }
        }

        getCancellationToken(): HostCancellationToken {
            return this.cancellationToken;
        }

        getCurrentDirectory(): string {
            return this.currentDirectory;
        }

        getDefaultLibFileName() {
            const nodeModuleBinDir = getDirectoryPath(normalizePath(this.projectService.getExecutingFilePath()));
            return combinePaths(nodeModuleBinDir, getDefaultLibFileName(this.compilerOptions));
        }

        useCaseSensitiveFileNames() {
            return this.projectService.host.useCaseSensitiveFileNames;
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return this.directoryStructureHost.readDirectory(path, extensions, exclude, include, depth);
        }

        readFile(fileName: string): string | undefined {
            return this.projectService.host.readFile(fileName);
        }

        fileExists(file: string): boolean {
            // As an optimization, don't hit the disks for files we already know don't exist
            // (because we're watching for their creation).
            const path = this.toPath(file);
            return !this.isWatchedMissingFile(path) && this.directoryStructureHost.fileExists(file);
        }

        resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModuleFull[] {
            return this.resolutionCache.resolveModuleNames(moduleNames, containingFile, reusedNames);
        }

        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return this.resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile);
        }

        directoryExists(path: string): boolean {
            return this.directoryStructureHost.directoryExists(path);
        }

        getDirectories(path: string): string[] {
            return this.directoryStructureHost.getDirectories(path);
        }

        /*@internal*/
        getCachedDirectoryStructureHost(): CachedDirectoryStructureHost {
            return undefined;
        }

        /*@internal*/
        toPath(fileName: string) {
            return toPath(fileName, this.currentDirectory, this.projectService.toCanonicalFileName);
        }

        /*@internal*/
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
            return this.projectService.watchFactory.watchDirectory(
                this.projectService.host,
                directory,
                cb,
                flags,
                WatchType.FailedLookupLocation,
                this
            );
        }

        /*@internal*/
        onInvalidatedResolution() {
            this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
        }

        /*@internal*/
        watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
            return this.projectService.watchFactory.watchDirectory(
                this.projectService.host,
                directory,
                cb,
                flags,
                WatchType.TypeRoots,
                this
            );
        }

        /*@internal*/
        onChangedAutomaticTypeDirectiveNames() {
            this.hasChangedAutomaticTypeDirectiveNames = true;
            this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
        }

        /*@internal*/
        getGlobalCache() {
            return this.getTypeAcquisition().enable ? this.projectService.typingsInstaller.globalTypingsCacheLocation : undefined;
        }

        /*@internal*/
        writeLog(s: string) {
            this.projectService.logger.info(s);
        }

        log(s: string) {
            this.writeLog(s);
        }

        error(s: string) {
            this.projectService.logger.msg(s, Msg.Err);
        }

        private setInternalCompilerOptionsForEmittingJsFiles() {
            if (this.projectKind === ProjectKind.Inferred || this.projectKind === ProjectKind.External) {
                this.compilerOptions.noEmitForJsFiles = true;
            }
        }

        /**
         * Get the errors that dont have any file name associated
         */
        getGlobalProjectErrors(): ReadonlyArray<Diagnostic> {
            return emptyArray;
        }

        getAllProjectErrors(): ReadonlyArray<Diagnostic> {
            return emptyArray;
        }

        getLanguageService(ensureSynchronized = true): LanguageService {
            if (ensureSynchronized) {
                this.updateGraph();
            }
            return this.languageService;
        }

        private shouldEmitFile(scriptInfo: ScriptInfo) {
            return scriptInfo && !scriptInfo.isDynamicOrHasMixedContent();
        }

        getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[] {
            if (!this.languageServiceEnabled) {
                return [];
            }
            this.updateGraph();
            this.builderState = BuilderState.create(this.program, this.projectService.toCanonicalFileName, this.builderState);
            return mapDefined(BuilderState.getFilesAffectedBy(this.builderState, this.program, scriptInfo.path, this.cancellationToken, data => this.projectService.host.createHash(data)),
                sourceFile => this.shouldEmitFile(this.projectService.getScriptInfoForPath(sourceFile.path)) ? sourceFile.fileName : undefined);
        }

        /**
         * Returns true if emit was conducted
         */
        emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): boolean {
            if (!this.languageServiceEnabled || !this.shouldEmitFile(scriptInfo)) {
                return false;
            }
            const { emitSkipped, outputFiles } = this.getLanguageService(/*ensureSynchronized*/ false).getEmitOutput(scriptInfo.fileName);
            if (!emitSkipped) {
                for (const outputFile of outputFiles) {
                    const outputFileAbsoluteFileName = getNormalizedAbsolutePath(outputFile.name, this.currentDirectory);
                    writeFile(outputFileAbsoluteFileName, outputFile.text, outputFile.writeByteOrderMark);
                }
            }

            return !emitSkipped;
        }

        enableLanguageService() {
            if (this.languageServiceEnabled || this.projectService.syntaxOnly) {
                return;
            }
            this.languageServiceEnabled = true;
            this.lastFileExceededProgramSize = undefined;
            this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ true);
        }

        disableLanguageService(lastFileExceededProgramSize?: string) {
            if (!this.languageServiceEnabled) {
                return;
            }
            Debug.assert(!this.projectService.syntaxOnly);
            this.languageService.cleanupSemanticCache();
            this.languageServiceEnabled = false;
            this.lastFileExceededProgramSize = lastFileExceededProgramSize;
            this.builderState = undefined;
            this.resolutionCache.closeTypeRootsWatch();
            this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ false);
        }

        getProjectName() {
            return this.projectName;
        }
        abstract getTypeAcquisition(): TypeAcquisition;

        protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: TypeAcquisition): TypeAcquisition {
            if (!newTypeAcquisition || !newTypeAcquisition.include) {
                // Nothing to filter out, so just return as-is
                return newTypeAcquisition;
            }
            return { ...newTypeAcquisition, include: this.removeExistingTypings(newTypeAcquisition.include) };
        }

        getExternalFiles(): SortedReadonlyArray<string> {
            return toSortedArray(flatMap(this.plugins, plugin => {
                if (typeof plugin.getExternalFiles !== "function") return;
                try {
                    return plugin.getExternalFiles(this);
                }
                catch (e) {
                    this.projectService.logger.info(`A plugin threw an exception in getExternalFiles: ${e}`);
                    if (e.stack) {
                        this.projectService.logger.info(e.stack);
                    }
                }
            }));
        }

        getSourceFile(path: Path) {
            if (!this.program) {
                return undefined;
            }
            return this.program.getSourceFileByPath(path);
        }

        close() {
            if (this.program) {
                // if we have a program - release all files that are enlisted in program but arent root
                // The releasing of the roots happens later
                // The project could have pending update remaining and hence the info could be in the files but not in program graph
                for (const f of this.program.getSourceFiles()) {
                    this.detachScriptInfoIfNotRoot(f.fileName);
                }
            }
            // Release external files
            forEach(this.externalFiles, externalFile => this.detachScriptInfoIfNotRoot(externalFile));
            // Always remove root files from the project
            for (const root of this.rootFiles) {
                root.detachFromProject(this);
            }
            this.projectService.pendingEnsureProjectForOpenFiles = true;

            this.rootFiles = undefined;
            this.rootFilesMap = undefined;
            this.externalFiles = undefined;
            this.program = undefined;
            this.builderState = undefined;
            this.resolutionCache.clear();
            this.resolutionCache = undefined;
            this.cachedUnresolvedImportsPerFile = undefined;
            this.directoryStructureHost = undefined;

            // Clean up file watchers waiting for missing files
            if (this.missingFilesMap) {
                clearMap(this.missingFilesMap, closeFileWatcher);
                this.missingFilesMap = undefined;
            }

            // signal language service to release source files acquired from document registry
            this.languageService.dispose();
            this.languageService = undefined;
        }

        private detachScriptInfoIfNotRoot(uncheckedFilename: string) {
            const info = this.projectService.getScriptInfo(uncheckedFilename);
            // We might not find the script info in case its not associated with the project any more
            // and project graph was not updated (eg delayed update graph in case of files changed/deleted on the disk)
            if (info && !this.isRoot(info)) {
                info.detachFromProject(this);
            }
        }

        isClosed() {
            return this.rootFiles === undefined;
        }

        hasRoots() {
            return this.rootFiles && this.rootFiles.length > 0;
        }

        /*@internal*/
        isOrphan() {
            return false;
        }

        getRootFiles() {
            return this.rootFiles && this.rootFiles.map(info => info.fileName);
        }

        /*@internal*/
        getRootFilesMap() {
            return this.rootFilesMap;
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
                    Debug.fail(`scriptInfo for a file '${sourceFile.fileName}' Path: '${sourceFile.path}' is missing.`);
                }
                return scriptInfo;
            });
        }

        getExcludedFiles(): ReadonlyArray<NormalizedPath> {
            return emptyArray;
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

        containsScriptInfo(info: ScriptInfo): boolean {
            return this.isRoot(info) || (this.program && this.program.getSourceFileByPath(info.path) !== undefined);
        }

        containsFile(filename: NormalizedPath, requireOpen?: boolean) {
            const info = this.projectService.getScriptInfoForPath(this.toPath(filename));
            if (info && (info.isScriptOpen() || !requireOpen)) {
                return this.containsScriptInfo(info);
            }
        }

        isRoot(info: ScriptInfo) {
            return this.rootFilesMap && this.rootFilesMap.get(info.path) === info;
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            Debug.assert(!this.isRoot(info));
            this.rootFiles.push(info);
            this.rootFilesMap.set(info.path, info);
            info.attachToProject(this);

            this.markAsDirty();
        }

        // add a root file that doesnt exist on host
        addMissingFileRoot(fileName: NormalizedPath) {
            const path = this.projectService.toPath(fileName);
            this.rootFilesMap.set(path, fileName);
            this.markAsDirty();
        }

        removeFile(info: ScriptInfo, fileExists: boolean, detachFromProject: boolean) {
            if (this.isRoot(info)) {
                this.removeRoot(info);
            }
            if (fileExists) {
                // If file is present, just remove the resolutions for the file
                this.resolutionCache.removeResolutionsOfFile(info.path);
            }
            else {
                this.resolutionCache.invalidateResolutionOfFile(info.path);
            }
            this.cachedUnresolvedImportsPerFile.delete(info.path);

            if (detachFromProject) {
                info.detachFromProject(this);
            }

            this.markAsDirty();
        }

        registerFileUpdate(fileName: string) {
            (this.updatedFileNames || (this.updatedFileNames = createMap<true>())).set(fileName, true);
        }

        markAsDirty() {
            if (!this.dirty) {
                this.projectStateVersion++;
                this.dirty = true;
            }
        }

        /* @internal */
        private extractUnresolvedImportsFromSourceFile(file: SourceFile, ambientModules: string[]): ReadonlyArray<string> {
            const cached = this.cachedUnresolvedImportsPerFile.get(file.path);
            if (cached) {
                // found cached result, return
                return cached;
            }
            let unresolvedImports: string[] | undefined;
            if (file.resolvedModules) {
                file.resolvedModules.forEach((resolvedModule, name) => {
                    // pick unresolved non-relative names
                    if (!resolvedModule && !isExternalModuleNameRelative(name) && !isAmbientlyDeclaredModule(name)) {
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
                    }
                });
            }

            this.cachedUnresolvedImportsPerFile.set(file.path, unresolvedImports || emptyArray);
            return unresolvedImports || emptyArray;

            function isAmbientlyDeclaredModule(name: string) {
                return ambientModules.some(m => m === name);
            }
        }

        /* @internal */
        onFileAddedOrRemoved() {
            this.hasAddedorRemovedFiles = true;
        }

        /**
         * Updates set of files that contribute to this project
         * @returns: true if set of files in the project stays the same and false - otherwise.
         */
        updateGraph(): boolean {
            this.resolutionCache.startRecordingFilesWithChangedResolutions();

            const hasNewProgram = this.updateGraphWorker();
            const hasAddedorRemovedFiles = this.hasAddedorRemovedFiles;
            this.hasAddedorRemovedFiles = false;

            const changedFiles: ReadonlyArray<Path> = this.resolutionCache.finishRecordingFilesWithChangedResolutions() || emptyArray;

            for (const file of changedFiles) {
                // delete cached information for changed files
                this.cachedUnresolvedImportsPerFile.delete(file);
            }

            // update builder only if language service is enabled
            // otherwise tell it to drop its internal state
            if (this.languageServiceEnabled) {
                // 1. no changes in structure, no changes in unresolved imports - do nothing
                // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
                // (can reuse cached imports for files that were not changed)
                // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
                // (can reuse cached imports for files that were not changed)
                // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
                if (hasNewProgram || changedFiles.length) {
                    let result: string[] | undefined;
                    const ambientModules = this.program.getTypeChecker().getAmbientModules().map(mod => stripQuotes(mod.getName()));
                    for (const sourceFile of this.program.getSourceFiles()) {
                        const unResolved = this.extractUnresolvedImportsFromSourceFile(sourceFile, ambientModules);
                        if (unResolved !== emptyArray) {
                            (result || (result = [])).push(...unResolved);
                        }
                    }
                    this.lastCachedUnresolvedImportsList = result ? toDeduplicatedSortedArray(result) : emptyArray;
                }

                this.projectService.typingsCache.enqueueInstallTypingsForProject(this, this.lastCachedUnresolvedImportsList, hasAddedorRemovedFiles);
            }
            else {
                this.lastCachedUnresolvedImportsList = undefined;
            }

            if (hasNewProgram) {
                this.projectProgramVersion++;
            }
            return !hasNewProgram;
        }

        /*@internal*/
        updateTypingFiles(typingFiles: SortedReadonlyArray<string>) {
            enumerateInsertsAndDeletes(typingFiles, this.typingFiles, getStringComparer(!this.useCaseSensitiveFileNames()),
                /*inserted*/ noop,
                removed => this.detachScriptInfoFromProject(removed)
            );
            this.typingFiles = typingFiles;
            // Invalidate files with unresolved imports
            this.resolutionCache.setFilesWithInvalidatedNonRelativeUnresolvedImports(this.cachedUnresolvedImportsPerFile);
        }

        /* @internal */
        getCurrentProgram() {
            return this.program;
        }

        protected removeExistingTypings(include: string[]): string[] {
            const existing = getAutomaticTypeDirectiveNames(this.getCompilerOptions(), this.directoryStructureHost);
            return include.filter(i => existing.indexOf(i) < 0);
        }

        private updateGraphWorker() {
            const oldProgram = this.program;
            Debug.assert(!this.isClosed(), "Called update graph worker of closed project");
            this.writeLog(`Starting updateGraphWorker: Project: ${this.getProjectName()}`);
            const start = timestamp();
            this.hasInvalidatedResolution = this.resolutionCache.createHasInvalidatedResolution();
            this.resolutionCache.startCachingPerDirectoryResolution();
            this.program = this.languageService.getProgram();
            this.dirty = false;
            this.resolutionCache.finishCachingPerDirectoryResolution();

            Debug.assert(oldProgram === undefined || this.program !== undefined);

            // bump up the version if
            // - oldProgram is not set - this is a first time updateGraph is called
            // - newProgram is different from the old program and structure of the old program was not reused.
            const hasNewProgram = this.program && (!oldProgram || (this.program !== oldProgram && !(oldProgram.structureIsReused & StructureIsReused.Completely)));
            this.hasChangedAutomaticTypeDirectiveNames = false;
            if (hasNewProgram) {
                if (oldProgram) {
                    for (const f of oldProgram.getSourceFiles()) {
                        if (this.program.getSourceFileByPath(f.path)) {
                            continue;
                        }
                        // new program does not contain this file - detach it from the project
                        this.detachScriptInfoFromProject(f.fileName);
                    }
                }

                // Update the missing file paths watcher
                updateMissingFilePathsWatch(
                    this.program,
                    this.missingFilesMap || (this.missingFilesMap = createMap()),
                    // Watch the missing files
                    missingFilePath => this.addMissingFileWatcher(missingFilePath)
                );

                // Watch the type locations that would be added to program as part of automatic type resolutions
                if (this.languageServiceEnabled) {
                    this.resolutionCache.updateTypeRootsWatch();
                }
            }

            const oldExternalFiles = this.externalFiles || emptyArray as SortedReadonlyArray<string>;
            this.externalFiles = this.getExternalFiles();
            enumerateInsertsAndDeletes(this.externalFiles, oldExternalFiles, getStringComparer(!this.useCaseSensitiveFileNames()),
                // Ensure a ScriptInfo is created for new external files. This is performed indirectly
                // by the LSHost for files in the program when the program is retrieved above but
                // the program doesn't contain external files so this must be done explicitly.
                inserted => {
                    const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(inserted, this.currentDirectory, this.directoryStructureHost);
                    scriptInfo.attachToProject(this);
                },
                removed => this.detachScriptInfoFromProject(removed)
            );
            const elapsed = timestamp() - start;
            this.writeLog(`Finishing updateGraphWorker: Project: ${this.getProjectName()} Version: ${this.getProjectVersion()} structureChanged: ${hasNewProgram} Elapsed: ${elapsed}ms`);
            return hasNewProgram;
        }

        private detachScriptInfoFromProject(uncheckedFileName: string) {
            const scriptInfoToDetach = this.projectService.getScriptInfo(uncheckedFileName);
            if (scriptInfoToDetach) {
                scriptInfoToDetach.detachFromProject(this);
                this.resolutionCache.removeResolutionsOfFile(scriptInfoToDetach.path);
            }
        }

        private addMissingFileWatcher(missingFilePath: Path) {
            const fileWatcher = this.projectService.watchFactory.watchFile(
                this.projectService.host,
                missingFilePath,
                (fileName, eventKind) => {
                    if (this.projectKind === ProjectKind.Configured) {
                        this.getCachedDirectoryStructureHost().addOrDeleteFile(fileName, missingFilePath, eventKind);
                    }

                    if (eventKind === FileWatcherEventKind.Created && this.missingFilesMap.has(missingFilePath)) {
                        this.missingFilesMap.delete(missingFilePath);
                        fileWatcher.close();

                        // When a missing file is created, we should update the graph.
                        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
                    }
                },
                PollingInterval.Medium,
                WatchType.MissingFilePath,
                this
            );
            return fileWatcher;
        }

        private isWatchedMissingFile(path: Path) {
            return this.missingFilesMap && this.missingFilesMap.has(path);
        }

        getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined {
            const scriptInfo = this.projectService.getScriptInfoForPath(this.toPath(fileName));
            if (scriptInfo && !scriptInfo.isAttached(this)) {
                return Errors.ThrowProjectDoesNotContainDocument(fileName, this);
            }
            return scriptInfo;
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.projectService.getScriptInfo(uncheckedFileName);
        }

        filesToString(writeProjectFileNames: boolean) {
            if (!this.program) {
                return "\tFiles (0)\n";
            }
            const sourceFiles = this.program.getSourceFiles();
            let strBuilder = `\tFiles (${sourceFiles.length})\n`;
            if (writeProjectFileNames) {
                for (const file of sourceFiles) {
                    strBuilder += `\t${file.fileName}\n`;
                }
            }
            return strBuilder;
        }

        setCompilerOptions(compilerOptions: CompilerOptions) {
            if (compilerOptions) {
                compilerOptions.allowNonTsExtensions = true;
                const oldOptions = this.compilerOptions;
                this.compilerOptions = compilerOptions;
                this.setInternalCompilerOptionsForEmittingJsFiles();
                if (changesAffectModuleResolution(oldOptions, compilerOptions)) {
                    // reset cached unresolved imports if changes in compiler options affected module resolution
                    this.cachedUnresolvedImportsPerFile.clear();
                    this.lastCachedUnresolvedImportsList = undefined;
                    this.resolutionCache.clear();
                }
                this.markAsDirty();
            }
        }

        /* @internal */
        getChangesSinceVersion(lastKnownVersion?: number): ProjectFilesWithTSDiagnostics {
            this.updateGraph();

            const info: protocol.ProjectVersionInfo = {
                projectName: this.getProjectName(),
                version: this.projectProgramVersion,
                isInferred: this.projectKind === ProjectKind.Inferred,
                options: this.getCompilationSettings(),
                languageServiceDisabled: !this.languageServiceEnabled,
                lastFileExceededProgramSize: this.lastFileExceededProgramSize
            };
            const updatedFileNames = this.updatedFileNames;
            this.updatedFileNames = undefined;
            // check if requested version is the same that we have reported last time
            if (this.lastReportedFileNames && lastKnownVersion === this.lastReportedVersion) {
                // if current structure version is the same - return info without any changes
                if (this.projectProgramVersion === this.lastReportedVersion && !updatedFileNames) {
                    return { info, projectErrors: this.getGlobalProjectErrors() };
                }
                // compute and return the difference
                const lastReportedFileNames = this.lastReportedFileNames;
                const externalFiles = this.getExternalFiles().map(f => toNormalizedPath(f));
                const currentFiles = arrayToSet(this.getFileNames().concat(externalFiles));

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
                this.lastReportedVersion = this.projectProgramVersion;
                return { info, changes: { added, removed, updated }, projectErrors: this.getGlobalProjectErrors() };
            }
            else {
                // unknown version - return everything
                const projectFileNames = this.getFileNames();
                const externalFiles = this.getExternalFiles().map(f => toNormalizedPath(f));
                const allFiles = projectFileNames.concat(externalFiles);
                this.lastReportedFileNames = arrayToSet(allFiles);
                this.lastReportedVersion = this.projectProgramVersion;
                return { info, files: allFiles, projectErrors: this.getGlobalProjectErrors() };
            }
        }

        // remove a root file from project
        protected removeRoot(info: ScriptInfo): void {
            orderedRemoveItem(this.rootFiles, info);
            this.rootFilesMap.delete(info.path);
        }

        protected enableGlobalPlugins() {
            const host = this.projectService.host;
            const options = this.getCompilationSettings();

            if (!host.require) {
                this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
                return;
            }

            // Search our peer node_modules, then any globally-specified probe paths
            // ../../.. to walk from X/node_modules/typescript/lib/tsserver.js to X/node_modules/
            const searchPaths = [combinePaths(this.projectService.getExecutingFilePath(), "../../.."), ...this.projectService.pluginProbeLocations];

            if (this.projectService.globalPlugins) {
                // Enable global plugins with synthetic configuration entries
                for (const globalPluginName of this.projectService.globalPlugins) {
                    // Skip empty names from odd commandline parses
                    if (!globalPluginName) continue;

                    // Skip already-locally-loaded plugins
                    if (options.plugins && options.plugins.some(p => p.name === globalPluginName)) continue;

                    // Provide global: true so plugins can detect why they can't find their config
                    this.projectService.logger.info(`Loading global plugin ${globalPluginName}`);
                    this.enablePlugin({ name: globalPluginName, global: true } as PluginImport, searchPaths);
                }
            }
        }

        protected enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[]) {
            this.projectService.logger.info(`Enabling plugin ${pluginConfigEntry.name} from candidate paths: ${searchPaths.join(",")}`);

            const log = (message: string) => {
                this.projectService.logger.info(message);
            };

            const resolvedModule = firstDefined(searchPaths, searchPath =>
                <PluginModuleFactory | undefined>Project.resolveModule(pluginConfigEntry.name, searchPath, this.projectService.host, log));
            if (resolvedModule) {
                this.enableProxy(resolvedModule, pluginConfigEntry);
            }
            else {
                this.projectService.logger.info(`Couldn't find ${pluginConfigEntry.name}`);
            }
        }

        /** Starts a new check for diagnostics. Call this if some file has updated that would cause diagnostics to be changed. */
        refreshDiagnostics() {
            this.projectService.sendProjectsUpdatedInBackgroundEvent();
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
                    languageServiceHost: this,
                    serverHost: this.projectService.host
                };

                const pluginModule = pluginModuleFactory({ typescript: ts });
                const newLS = pluginModule.create(info);
                for (const k of Object.keys(this.languageService)) {
                    if (!(k in newLS)) {
                        this.projectService.logger.info(`Plugin activation warning: Missing proxied method ${k} in created LS. Patching.`);
                        (newLS as any)[k] = (this.languageService as any)[k];
                    }
                }
                this.projectService.logger.info(`Plugin validation succeded`);
                this.languageService = newLS;
                this.plugins.push(pluginModule);
            }
            catch (e) {
                this.projectService.logger.info(`Plugin activation failed: ${e}`);
            }
        }
    }

    /**
     * If a file is opened and no tsconfig (or jsconfig) is found,
     * the file and its imports/references are put into an InferredProject.
     */
    export class InferredProject extends Project {
        private static readonly newName = (() => {
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
            const newOptions = options ? cloneCompilerOptions(options) : this.getCompilationSettings();
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

        /** this is canonical project root path */
        readonly projectRootPath: string | undefined;

        /*@internal*/
        /** stored only if their is no projectRootPath and this isnt single inferred project */
        readonly canonicalCurrentDirectory: string | undefined;

        /*@internal*/
        constructor(
            projectService: ProjectService,
            documentRegistry: DocumentRegistry,
            compilerOptions: CompilerOptions,
            projectRootPath: NormalizedPath | undefined,
            currentDirectory: string | undefined) {
            super(InferredProject.newName(),
                ProjectKind.Inferred,
                projectService,
                documentRegistry,
                /*files*/ undefined,
                /*lastFileExceededProgramSize*/ undefined,
                compilerOptions,
                /*compileOnSaveEnabled*/ false,
                projectService.host,
                currentDirectory);
            this.projectRootPath = projectRootPath && projectService.toCanonicalFileName(projectRootPath);
            if (!projectRootPath && !projectService.useSingleInferredProject) {
                this.canonicalCurrentDirectory = projectService.toCanonicalFileName(this.currentDirectory);
            }
            this.enableGlobalPlugins();
        }

        addRoot(info: ScriptInfo) {
            Debug.assert(info.isScriptOpen());
            this.projectService.startWatchingConfigFilesForInferredProjectRoot(info);
            if (!this._isJsInferredProject && info.isJavaScript()) {
                this.toggleJsInferredProject(/*isJsInferredProject*/ true);
            }
            super.addRoot(info);
        }

        removeRoot(info: ScriptInfo) {
            this.projectService.stopWatchingConfigFilesForInferredProjectRoot(info);
            super.removeRoot(info);
            if (this._isJsInferredProject && info.isJavaScript()) {
                if (every(this.getRootScriptInfos(), rootInfo => !rootInfo.isJavaScript())) {
                    this.toggleJsInferredProject(/*isJsInferredProject*/ false);
                }
            }
        }

        /*@internal*/
        isOrphan() {
            return !this.hasRoots();
        }

        isProjectWithSingleRoot() {
            // - when useSingleInferredProject is not set and projectRootPath is not set,
            //   we can guarantee that this will be the only root
            // - other wise it has single root if it has single root script info
            return (!this.projectRootPath && !this.projectService.useSingleInferredProject) ||
                this.getRootScriptInfos().length === 1;
        }

        close() {
            forEach(this.getRootScriptInfos(), info => this.projectService.stopWatchingConfigFilesForInferredProjectRoot(info));
            super.close();
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
        /* @internal */
        configFileWatcher: FileWatcher;
        private directoriesWatchedForWildcards: Map<WildcardDirectoryWatcher> | undefined;
        readonly canonicalConfigFilePath: NormalizedPath;

        /* @internal */
        pendingReload: ConfigFileProgramReloadLevel;

        /*@internal*/
        configFileSpecs: ConfigFileSpecs;

        /** Ref count to the project when opened from external project */
        private externalProjectRefCount = 0;

        private projectErrors: Diagnostic[];

        /*@internal*/
        constructor(configFileName: NormalizedPath,
            projectService: ProjectService,
            documentRegistry: DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            compilerOptions: CompilerOptions,
            lastFileExceededProgramSize: string | undefined,
            public compileOnSaveEnabled: boolean,
            cachedDirectoryStructureHost: CachedDirectoryStructureHost,
            private projectReferences: ReadonlyArray<ProjectReference> | undefined) {
            super(configFileName,
                ProjectKind.Configured,
                projectService,
                documentRegistry,
                hasExplicitListOfFiles,
                lastFileExceededProgramSize,
                compilerOptions,
                compileOnSaveEnabled,
                cachedDirectoryStructureHost,
                getDirectoryPath(configFileName));
            this.canonicalConfigFilePath = asNormalizedPath(projectService.toCanonicalFileName(configFileName));
            this.enablePlugins();
        }

        /**
         * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
         * @returns: true if set of files in the project stays the same and false - otherwise.
         */
        updateGraph(): boolean {
            const reloadLevel = this.pendingReload;
            this.pendingReload = ConfigFileProgramReloadLevel.None;
            switch (reloadLevel) {
                case ConfigFileProgramReloadLevel.Partial:
                    return this.projectService.reloadFileNamesOfConfiguredProject(this);
                case ConfigFileProgramReloadLevel.Full:
                    this.projectService.reloadConfiguredProject(this);
                    return true;
                default:
                    return super.updateGraph();
            }
        }

        /*@internal*/
        getCachedDirectoryStructureHost() {
            return this.directoryStructureHost as CachedDirectoryStructureHost;
        }

        getConfigFilePath() {
            return asNormalizedPath(this.getProjectName());
        }

        getProjectReferences(): ReadonlyArray<ProjectReference> | undefined {
            return this.projectReferences;
        }

        updateReferences(refs: ReadonlyArray<ProjectReference> | undefined) {
            this.projectReferences = refs;
        }

        enablePlugins() {
            const host = this.projectService.host;
            const options = this.getCompilationSettings();

            if (!host.require) {
                this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
                return;
            }

            // Search our peer node_modules, then any globally-specified probe paths
            // ../../.. to walk from X/node_modules/typescript/lib/tsserver.js to X/node_modules/
            const searchPaths = [combinePaths(this.projectService.getExecutingFilePath(), "../../.."), ...this.projectService.pluginProbeLocations];

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

            this.enableGlobalPlugins();
        }

        /**
         * Get the errors that dont have any file name associated
         */
        getGlobalProjectErrors(): ReadonlyArray<Diagnostic> {
            return filter(this.projectErrors, diagnostic => !diagnostic.file) || emptyArray;
        }

        /**
         * Get all the project errors
         */
        getAllProjectErrors(): ReadonlyArray<Diagnostic> {
            return this.projectErrors || emptyArray;
        }

        setProjectErrors(projectErrors: Diagnostic[]) {
            this.projectErrors = projectErrors;
        }

        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void {
            this.typeAcquisition = this.removeLocalTypingsFromTypeAcquisition(newTypeAcquisition);
        }

        getTypeAcquisition() {
            return this.typeAcquisition;
        }

        /*@internal*/
        watchWildcards(wildcardDirectories: Map<WatchDirectoryFlags>) {
            updateWatchingWildcardDirectories(
                this.directoriesWatchedForWildcards || (this.directoriesWatchedForWildcards = createMap()),
                wildcardDirectories,
                // Create new directory watcher
                (directory, flags) => this.projectService.watchWildcardDirectory(directory as Path, flags, this),
            );
        }

        /*@internal*/
        stopWatchingWildCards() {
            if (this.directoriesWatchedForWildcards) {
                clearMap(this.directoriesWatchedForWildcards, closeFileWatcherOf);
                this.directoriesWatchedForWildcards = undefined;
            }
        }

        close() {
            if (this.configFileWatcher) {
                this.configFileWatcher.close();
                this.configFileWatcher = undefined;
            }

            this.stopWatchingWildCards();
            this.projectErrors = undefined;
            this.configFileSpecs = undefined;
            super.close();
        }

        /* @internal */
        addExternalProjectReference() {
            this.externalProjectRefCount++;
        }

        /* @internal */
        deleteExternalProjectReference() {
            this.externalProjectRefCount--;
        }

        /** Returns true if the project is needed by any of the open script info/external project */
        /* @internal */
        hasOpenRef() {
            if (!!this.externalProjectRefCount) {
                return true;
            }

            // Closed project doesnt have any reference
            if (this.isClosed()) {
                return false;
            }

            const configFileExistenceInfo = this.projectService.getConfigFileExistenceInfo(this);
            if (this.projectService.hasPendingProjectUpdate(this)) {
                // If there is pending update for this project,
                // we dont know if this project would be needed by any of the open files impacted by this config file
                // In that case keep the project alive if there are open files impacted by this project
                return !!configFileExistenceInfo.openFilesImpactedByConfigFile.size;
            }

            // If there is no pending update for this project,
            // We know exact set of open files that get impacted by this configured project as the files in the project
            // The project is referenced only if open files impacted by this project are present in this project
            return forEachEntry(
                configFileExistenceInfo.openFilesImpactedByConfigFile,
                (_value, infoPath) => this.containsScriptInfo(this.projectService.getScriptInfoForPath(infoPath as Path))
            ) || false;
        }

        getEffectiveTypeRoots() {
            return getEffectiveTypeRoots(this.getCompilationSettings(), this.directoryStructureHost) || [];
        }

        /*@internal*/
        updateErrorOnNoInputFiles(hasFileNames: boolean) {
            if (hasFileNames) {
                filterMutate(this.projectErrors, error => !isErrorNoInputFiles(error));
            }
            else if (!this.configFileSpecs.filesSpecs && !some(this.projectErrors, isErrorNoInputFiles)) {
                this.projectErrors.push(getErrorForNoInputFiles(this.configFileSpecs, this.getConfigFilePath()));
            }
        }
    }

    /**
     * Project whose configuration is handled externally, such as in a '.csproj'.
     * These are created only if a host explicitly calls `openExternalProject`.
     */
    export class ExternalProject extends Project {
        excludedFiles: ReadonlyArray<NormalizedPath> = [];
        private typeAcquisition: TypeAcquisition;
        /*@internal*/
        constructor(public externalProjectName: string,
            projectService: ProjectService,
            documentRegistry: DocumentRegistry,
            compilerOptions: CompilerOptions,
            lastFileExceededProgramSize: string | undefined,
            public compileOnSaveEnabled: boolean,
            projectFilePath?: string) {
            super(externalProjectName,
                ProjectKind.External,
                projectService,
                documentRegistry,
                /*hasExplicitListOfFiles*/ true,
                lastFileExceededProgramSize,
                compilerOptions,
                compileOnSaveEnabled,
                projectService.host,
                getDirectoryPath(projectFilePath || normalizeSlashes(externalProjectName)));
        }

        getExcludedFiles() {
            return this.excludedFiles;
        }

        getTypeAcquisition() {
            return this.typeAcquisition;
        }

        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void {
            Debug.assert(!!newTypeAcquisition, "newTypeAcquisition may not be null/undefined");
            Debug.assert(!!newTypeAcquisition.include, "newTypeAcquisition.include may not be null/undefined");
            Debug.assert(!!newTypeAcquisition.exclude, "newTypeAcquisition.exclude may not be null/undefined");
            Debug.assert(typeof newTypeAcquisition.enable === "boolean", "newTypeAcquisition.enable may not be null/undefined");
            this.typeAcquisition = this.removeLocalTypingsFromTypeAcquisition(newTypeAcquisition);
        }
    }
}

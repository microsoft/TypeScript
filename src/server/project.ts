namespace ts.server {

export enum ProjectKind {
    Inferred,
    Configured,
    External,
    AutoImportProvider,
    Auxiliary,
}

/* @internal */
export type Mutable<T> = { -readonly [K in keyof T]: T[K]; };

/* @internal */
export function countEachFileTypes(infos: ts.server.ScriptInfo[], includeSizes = false): ts.server.FileStats {
    const result: Mutable<ts.server.FileStats> = {
        js: 0, jsSize: 0,
        jsx: 0, jsxSize: 0,
        ts: 0, tsSize: 0,
        tsx: 0, tsxSize: 0,
        dts: 0, dtsSize: 0,
        deferred: 0, deferredSize: 0,
    };
    for (const info of infos) {
        const fileSize = includeSizes ? info.getTelemetryFileSize() : 0;
        switch (info.scriptKind) {
            case ts.ScriptKind.JS:
                result.js += 1;
                result.jsSize! += fileSize;
                break;
            case ts.ScriptKind.JSX:
                result.jsx += 1;
                result.jsxSize! += fileSize;
                break;
            case ts.ScriptKind.TS:
                if (ts.isDeclarationFileName(info.fileName)) {
                    result.dts += 1;
                    result.dtsSize! += fileSize;
                }
                else {
                    result.ts += 1;
                    result.tsSize! += fileSize;
                }
                break;
            case ts.ScriptKind.TSX:
                result.tsx += 1;
                result.tsxSize! += fileSize;
                break;
            case ts.ScriptKind.Deferred:
                result.deferred += 1;
                result.deferredSize! += fileSize;
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
    return !fileNames.some(fileName => (ts.fileExtensionIs(fileName, ts.Extension.Ts) && !ts.isDeclarationFileName(fileName)) || ts.fileExtensionIs(fileName, ts.Extension.Tsx));
}

/* @internal */
export interface ProjectFilesWithTSDiagnostics extends ts.server.protocol.ProjectFiles {
    projectErrors: readonly ts.Diagnostic[];
}

export interface PluginCreateInfo {
    project: Project;
    languageService: ts.LanguageService;
    languageServiceHost: ts.LanguageServiceHost;
    serverHost: ts.server.ServerHost;
    session?: ts.server.Session<unknown>;
    config: any;
}

export interface PluginModule {
    create(createInfo: PluginCreateInfo): ts.LanguageService;
    getExternalFiles?(proj: Project): string[];
    onConfigurationChanged?(config: any): void;
}

export interface PluginModuleWithName {
    name: string;
    module: PluginModule;
}

export type PluginModuleFactory = (mod: { typescript: typeof ts }) => PluginModule;

/* @internal */
export interface BeginEnablePluginResult {
    pluginConfigEntry: ts.PluginImport;
    pluginConfigOverrides: ts.Map<any> | undefined;
    resolvedModule: PluginModuleFactory | undefined;
    errorLogs: string[] | undefined;
}

/**
 * The project root can be script info - if root is present,
 * or it could be just normalized path if root wasn't present on the host(only for non inferred project)
 */
/* @internal */
export interface ProjectRootFile {
    fileName: ts.server.NormalizedPath;
    info?: ts.server.ScriptInfo;
}

interface GeneratedFileWatcher {
    generatedFilePath: ts.Path;
    watcher: ts.FileWatcher;
}
type GeneratedFileWatcherMap = GeneratedFileWatcher | ts.ESMap<ts.Path, GeneratedFileWatcher>;
function isGeneratedFileWatcher(watch: GeneratedFileWatcherMap): watch is GeneratedFileWatcher {
    return (watch as GeneratedFileWatcher).generatedFilePath !== undefined;
}

/*@internal*/
export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: readonly ts.Diagnostic[];
}

export abstract class Project implements ts.LanguageServiceHost, ts.ModuleResolutionHost {
    private rootFiles: ts.server.ScriptInfo[] = [];
    private rootFilesMap = new ts.Map<string, ProjectRootFile>();
    private program: ts.Program | undefined;
    private externalFiles: ts.SortedReadonlyArray<string> | undefined;
    private missingFilesMap: ts.ESMap<ts.Path, ts.FileWatcher> | undefined;
    private generatedFilesMap: GeneratedFileWatcherMap | undefined;

    /*@internal*/
    protected readonly plugins: PluginModuleWithName[] = [];

    /*@internal*/
    /**
     * This is map from files to unresolved imports in it
     * Maop does not contain entries for files that do not have unresolved imports
     * This helps in containing the set of files to invalidate
     */
    cachedUnresolvedImportsPerFile = new ts.Map<ts.Path, readonly string[]>();

    /*@internal*/
    lastCachedUnresolvedImportsList: ts.SortedReadonlyArray<string> | undefined;
    /*@internal*/
    private hasAddedorRemovedFiles = false;
    /*@internal*/
    private hasAddedOrRemovedSymlinks = false;

    /*@internal*/
    lastFileExceededProgramSize: string | undefined;

    // wrapper over the real language service that will suppress all semantic operations
    protected languageService: ts.LanguageService;

    public languageServiceEnabled: boolean;

    readonly trace?: (s: string) => void;
    readonly realpath?: (path: string) => string;

    /*@internal*/
    hasInvalidatedResolutions: ts.HasInvalidatedResolutions | undefined;

    /*@internal*/
    resolutionCache: ts.ResolutionCache;

    private builderState: ts.BuilderState | undefined;
    /**
     * Set of files names that were updated since the last call to getChangesSinceVersion.
     */
    private updatedFileNames: ts.Set<string> | undefined;
    /**
     * Set of files that was returned from the last call to getChangesSinceVersion.
     */
    private lastReportedFileNames: ts.ESMap<string, boolean> | undefined;
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

    protected projectErrors: ts.Diagnostic[] | undefined;

    protected isInitialLoadPending: () => boolean = ts.returnFalse;

    /*@internal*/
    dirty = false;

    /*@internal*/
    typingFiles: ts.SortedReadonlyArray<string> = ts.server.emptyArray;

    /*@internal*/
    originalConfiguredProjects: ts.Set<ts.server.NormalizedPath> | undefined;

    /*@internal*/
    private packageJsonsForAutoImport: ts.Set<string> | undefined;

    /*@internal*/
    private noDtsResolutionProject?: AuxiliaryProject | undefined;

    /*@internal*/
    getResolvedProjectReferenceToRedirect(_fileName: string): ts.ResolvedProjectReference | undefined {
        return undefined;
    }

    /* @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /* @internal */ getParsedCommandLine?(fileName: string): ts.ParsedCommandLine | undefined;

    private readonly cancellationToken: ts.ThrottledCancellationToken;

    public isNonTsProject() {
        ts.server.updateProjectIfDirty(this);
        return allFilesAreJsOrDts(this);
    }

    public isJsOnlyProject() {
        ts.server.updateProjectIfDirty(this);
        return hasOneOrMoreJsAndNoTsFiles(this);
    }

    public static resolveModule(moduleName: string, initialDir: string, host: ts.server.ServerHost, log: (message: string) => void, logErrors?: (message: string) => void): {} | undefined {
        const resolvedPath = ts.normalizeSlashes(host.resolvePath(ts.combinePaths(initialDir, "node_modules")));
        log(`Loading ${moduleName} from ${initialDir} (resolved to ${resolvedPath})`);
        const result = host.require!(resolvedPath, moduleName); // TODO: GH#18217
        if (result.error) {
            const err = result.error.stack || result.error.message || JSON.stringify(result.error);
            (logErrors || log)(`Failed to load module '${moduleName}' from ${resolvedPath}: ${err}`);
            return undefined;
        }
        return result.module;
    }

    /*@internal*/
    public static async importServicePluginAsync(moduleName: string, initialDir: string, host: ts.server.ServerHost, log: (message: string) => void, logErrors?: (message: string) => void): Promise<{} | undefined> {
        ts.Debug.assertIsDefined(host.importPlugin);
        const resolvedPath = ts.combinePaths(initialDir, "node_modules");
        log(`Dynamically importing ${moduleName} from ${initialDir} (resolved to ${resolvedPath})`);
        let result: ts.server.ModuleImportResult;
        try {
            result = await host.importPlugin(resolvedPath, moduleName);
        }
        catch (e) {
            result = { module: undefined, error: e };
        }
        if (result.error) {
            const err = result.error.stack || result.error.message || JSON.stringify(result.error);
            (logErrors || log)(`Failed to dynamically import module '${moduleName}' from ${resolvedPath}: ${err}`);
            return undefined;
        }
        return result.module;
    }

    /*@internal*/
    readonly currentDirectory: string;

    /*@internal*/
    public directoryStructureHost: ts.DirectoryStructureHost;

    /*@internal*/
    public readonly getCanonicalFileName: ts.GetCanonicalFileName;

    /*@internal*/
    private exportMapCache: ts.ExportInfoMap | undefined;
    /*@internal*/
    private changedFilesForExportMapCache: ts.Set<ts.Path> | undefined;
    /*@internal*/
    private moduleSpecifierCache = ts.server.createModuleSpecifierCache(this);
    /*@internal*/
    private symlinks: ts.SymlinkCache | undefined;
    /*@internal*/
    autoImportProviderHost: AutoImportProviderProject | false | undefined;
    /*@internal*/
    protected typeAcquisition: ts.TypeAcquisition | undefined;

    /*@internal*/
    constructor(
        /*@internal*/ readonly projectName: string,
        readonly projectKind: ProjectKind,
        readonly projectService: ts.server.ProjectService,
        private documentRegistry: ts.DocumentRegistry,
        hasExplicitListOfFiles: boolean,
        lastFileExceededProgramSize: string | undefined,
        private compilerOptions: ts.CompilerOptions,
        public compileOnSaveEnabled: boolean,
        protected watchOptions: ts.WatchOptions | undefined,
        directoryStructureHost: ts.DirectoryStructureHost,
        currentDirectory: string | undefined,
    ) {
        this.directoryStructureHost = directoryStructureHost;
        this.currentDirectory = this.projectService.getNormalizedAbsolutePath(currentDirectory || "");
        this.getCanonicalFileName = this.projectService.toCanonicalFileName;

        this.cancellationToken = new ts.ThrottledCancellationToken(this.projectService.cancellationToken, this.projectService.throttleWaitMilliseconds);
        if (!this.compilerOptions) {
            this.compilerOptions = ts.getDefaultCompilerOptions();
            this.compilerOptions.allowNonTsExtensions = true;
            this.compilerOptions.allowJs = true;
        }
        else if (hasExplicitListOfFiles || ts.getAllowJSCompilerOption(this.compilerOptions) || this.projectService.hasDeferredExtension()) {
            // If files are listed explicitly or allowJs is specified, allow all extensions
            this.compilerOptions.allowNonTsExtensions = true;
        }

        switch (projectService.serverMode) {
            case ts.LanguageServiceMode.Semantic:
                this.languageServiceEnabled = true;
                break;
            case ts.LanguageServiceMode.PartialSemantic:
                this.languageServiceEnabled = true;
                this.compilerOptions.noResolve = true;
                this.compilerOptions.types = [];
                break;
            case ts.LanguageServiceMode.Syntactic:
                this.languageServiceEnabled = false;
                this.compilerOptions.noResolve = true;
                this.compilerOptions.types = [];
                break;
            default:
                ts.Debug.assertNever(projectService.serverMode);
        }

        this.setInternalCompilerOptionsForEmittingJsFiles();
        const host = this.projectService.host;
        if (this.projectService.logger.loggingEnabled()) {
            this.trace = s => this.writeLog(s);
        }
        else if (host.trace) {
            this.trace = s => host.trace!(s);
        }
        this.realpath = ts.maybeBind(host, host.realpath);

        // Use the current directory as resolution root only if the project created using current directory string
        this.resolutionCache = ts.createResolutionCache(
            this,
            currentDirectory && this.currentDirectory,
            /*logChangesWhenResolvingModule*/ true
        );
        this.languageService = ts.createLanguageService(this, this.documentRegistry, this.projectService.serverMode);
        if (lastFileExceededProgramSize) {
            this.disableLanguageService(lastFileExceededProgramSize);
        }
        this.markAsDirty();
        if (projectKind !== ProjectKind.AutoImportProvider) {
            this.projectService.pendingEnsureProjectForOpenFiles = true;
        }
    }

    isKnownTypesPackageName(name: string): boolean {
        return this.typingsCache.isKnownTypesPackageName(name);
    }
    installPackage(options: ts.InstallPackageOptions): Promise<ts.ApplyCodeActionCommandResult> {
        return this.typingsCache.installPackage({ ...options, projectName: this.projectName, projectRootPath: this.toPath(this.currentDirectory) });
    }

    /*@internal*/
    getGlobalTypingsCacheLocation() {
        return this.getGlobalCache();
    }

    private get typingsCache(): ts.server.TypingsCache {
        return this.projectService.typingsCache;
    }

    /*@internal*/
    getSymlinkCache(): ts.SymlinkCache {
        if (!this.symlinks) {
            this.symlinks = ts.createSymlinkCache(this.getCurrentDirectory(), this.getCanonicalFileName);
        }
        if (this.program && !this.symlinks.hasProcessedResolutions()) {
            this.symlinks.setSymlinksFromResolutions(
                this.program.getSourceFiles(),
                this.program.getResolvedTypeReferenceDirectives());
        }
        return this.symlinks;
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

    getProjectReferences(): readonly ts.ProjectReference[] | undefined {
        return undefined;
    }

    getScriptFileNames() {
        if (!this.rootFiles) {
            return ts.emptyArray;
        }

        let result: string[] | undefined;
        this.rootFilesMap.forEach(value => {
            if (this.languageServiceEnabled || (value.info && value.info.isScriptOpen())) {
                // if language service is disabled - process only files that are open
                (result || (result = [])).push(value.fileName);
            }
        });

        return ts.addRange(result, this.typingFiles) || ts.emptyArray;
    }

    private getOrCreateScriptInfoAndAttachToProject(fileName: string) {
        const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(fileName, this.currentDirectory, this.directoryStructureHost);
        if (scriptInfo) {
            const existingValue = this.rootFilesMap.get(scriptInfo.path);
            if (existingValue && existingValue.info !== scriptInfo) {
                // This was missing path earlier but now the file exists. Update the root
                this.rootFiles.push(scriptInfo);
                existingValue.info = scriptInfo;
            }
            scriptInfo.attachToProject(this);
        }
        return scriptInfo;
    }

    getScriptKind(fileName: string) {
        const info = this.getOrCreateScriptInfoAndAttachToProject(fileName);
        return (info && info.scriptKind)!; // TODO: GH#18217
    }

    getScriptVersion(filename: string) {
        // Don't attach to the project if version is asked

        const info = this.projectService.getOrCreateScriptInfoNotOpenedByClient(filename, this.currentDirectory, this.directoryStructureHost);
        return (info && info.getLatestVersion())!; // TODO: GH#18217
    }

    getScriptSnapshot(filename: string): ts.IScriptSnapshot | undefined {
        const scriptInfo = this.getOrCreateScriptInfoAndAttachToProject(filename);
        if (scriptInfo) {
            return scriptInfo.getSnapshot();
        }
    }

    getCancellationToken(): ts.HostCancellationToken {
        return this.cancellationToken;
    }

    getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    getDefaultLibFileName() {
        const nodeModuleBinDir = ts.getDirectoryPath(ts.normalizePath(this.projectService.getExecutingFilePath()));
        return ts.combinePaths(nodeModuleBinDir, ts.getDefaultLibFileName(this.compilerOptions));
    }

    useCaseSensitiveFileNames() {
        return this.projectService.host.useCaseSensitiveFileNames;
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.directoryStructureHost.readDirectory!(path, extensions, exclude, include, depth);
    }

    readFile(fileName: string): string | undefined {
        return this.projectService.host.readFile(fileName);
    }

    writeFile(fileName: string, content: string): void {
        return this.projectService.host.writeFile(fileName, content);
    }

    fileExists(file: string): boolean {
        // As an optimization, don't hit the disks for files we already know don't exist
        // (because we're watching for their creation).
        const path = this.toPath(file);
        return !this.isWatchedMissingFile(path) && this.directoryStructureHost.fileExists(file);
    }

    resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames?: string[], redirectedReference?: ts.ResolvedProjectReference, _options?: ts.CompilerOptions, containingSourceFile?: ts.SourceFile): (ts.ResolvedModuleFull | undefined)[] {
        return this.resolutionCache.resolveModuleNames(moduleNames, containingFile, reusedNames, redirectedReference, containingSourceFile);
    }

    getModuleResolutionCache(): ts.ModuleResolutionCache | undefined {
        return this.resolutionCache.getModuleResolutionCache();
    }

    getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext): ts.ResolvedModuleWithFailedLookupLocations | undefined {
        return this.resolutionCache.getResolvedModuleWithFailedLookupLocationsFromCache(moduleName, containingFile, resolutionMode);
    }

    resolveTypeReferenceDirectives(typeDirectiveNames: string[] | ts.FileReference[], containingFile: string, redirectedReference?: ts.ResolvedProjectReference, _options?: ts.CompilerOptions, containingFileMode?: ts.SourceFile["impliedNodeFormat"] | undefined): (ts.ResolvedTypeReferenceDirective | undefined)[] {
        return this.resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile, redirectedReference, containingFileMode);
    }

    directoryExists(path: string): boolean {
        return this.directoryStructureHost.directoryExists!(path); // TODO: GH#18217
    }

    getDirectories(path: string): string[] {
        return this.directoryStructureHost.getDirectories!(path); // TODO: GH#18217
    }

    /*@internal*/
    getCachedDirectoryStructureHost(): ts.CachedDirectoryStructureHost {
        return undefined!; // TODO: GH#18217
    }

    /*@internal*/
    toPath(fileName: string) {
        return ts.toPath(fileName, this.currentDirectory, this.projectService.toCanonicalFileName);
    }

    /*@internal*/
    watchDirectoryOfFailedLookupLocation(directory: string, cb: ts.DirectoryWatcherCallback, flags: ts.WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            ts.WatchType.FailedLookupLocations,
            this
        );
    }

    /*@internal*/
    watchAffectingFileLocation(file: string, cb: ts.FileWatcherCallback) {
        return this.projectService.watchFactory.watchFile(
            file,
            cb,
            ts.PollingInterval.High,
            this.projectService.getWatchOptions(this),
            ts.WatchType.AffectingFileLocation,
            this
        );
    }

    /*@internal*/
    clearInvalidateResolutionOfFailedLookupTimer() {
        return this.projectService.throttledOperations.cancel(`${this.getProjectName()}FailedLookupInvalidation`);
    }

    /*@internal*/
    scheduleInvalidateResolutionsOfFailedLookupLocations() {
        this.projectService.throttledOperations.schedule(`${this.getProjectName()}FailedLookupInvalidation`, /*delay*/ 1000, () => {
            if (this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
                this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
            }
        });
    }

    /*@internal*/
    invalidateResolutionsOfFailedLookupLocations() {
        if (this.clearInvalidateResolutionOfFailedLookupTimer() &&
            this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
            this.markAsDirty();
            this.projectService.delayEnsureProjectForOpenFiles();
        }
    }

    /*@internal*/
    onInvalidatedResolution() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    /*@internal*/
    watchTypeRootsDirectory(directory: string, cb: ts.DirectoryWatcherCallback, flags: ts.WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            ts.WatchType.TypeRoots,
            this
        );
    }

    /*@internal*/
    hasChangedAutomaticTypeDirectiveNames() {
        return this.resolutionCache.hasChangedAutomaticTypeDirectiveNames();
    }

    /*@internal*/
    onChangedAutomaticTypeDirectiveNames() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    /*@internal*/
    getGlobalCache() {
        return this.getTypeAcquisition().enable ? this.projectService.typingsInstaller.globalTypingsCacheLocation : undefined;
    }

    /*@internal*/
    globalCacheResolutionModuleName = ts.JsTyping.nonRelativeModuleNameForTypingCache;

    /*@internal*/
    fileIsOpen(filePath: ts.Path) {
        return this.projectService.openFiles.has(filePath);
    }

    /*@internal*/
    writeLog(s: string) {
        this.projectService.logger.info(s);
    }

    log(s: string) {
        this.writeLog(s);
    }

    error(s: string) {
        this.projectService.logger.msg(s, ts.server.Msg.Err);
    }

    private setInternalCompilerOptionsForEmittingJsFiles() {
        if (this.projectKind === ProjectKind.Inferred || this.projectKind === ProjectKind.External) {
            this.compilerOptions.noEmitForJsFiles = true;
        }
    }

    /**
     * Get the errors that dont have any file name associated
     */
    getGlobalProjectErrors(): readonly ts.Diagnostic[] {
        return ts.filter(this.projectErrors, diagnostic => !diagnostic.file) || ts.server.emptyArray;
    }

    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly ts.Diagnostic[] {
        return this.projectErrors || ts.server.emptyArray;
    }

    setProjectErrors(projectErrors: ts.Diagnostic[] | undefined) {
        this.projectErrors = projectErrors;
    }

    getLanguageService(ensureSynchronized = true): ts.LanguageService {
        if (ensureSynchronized) {
            ts.server.updateProjectIfDirty(this);
        }
        return this.languageService;
    }

    /** @internal */
    getSourceMapper(): ts.SourceMapper {
        return this.getLanguageService().getSourceMapper();
    }

    /** @internal */
    clearSourceMapperCache() {
        this.languageService.clearSourceMapperCache();
    }

    /*@internal*/
    getDocumentPositionMapper(generatedFileName: string, sourceFileName?: string): ts.DocumentPositionMapper | undefined {
        return this.projectService.getDocumentPositionMapper(this, generatedFileName, sourceFileName);
    }

    /*@internal*/
    getSourceFileLike(fileName: string) {
        return this.projectService.getSourceFileLike(fileName, this);
    }

    /*@internal*/
    shouldEmitFile(scriptInfo: ts.server.ScriptInfo | undefined) {
        return scriptInfo &&
            !scriptInfo.isDynamicOrHasMixedContent() &&
            !this.program!.isSourceOfProjectReferenceRedirect(scriptInfo.path);
    }

    getCompileOnSaveAffectedFileList(scriptInfo: ts.server.ScriptInfo): string[] {
        if (!this.languageServiceEnabled) {
            return [];
        }
        ts.server.updateProjectIfDirty(this);
        this.builderState = ts.BuilderState.create(this.program!, this.projectService.toCanonicalFileName, this.builderState, /*disableUseFileVersionAsSignature*/ true);
        return ts.mapDefined(
            ts.BuilderState.getFilesAffectedBy(
                this.builderState,
                this.program!,
                scriptInfo.path,
                this.cancellationToken,
                ts.maybeBind(this.projectService.host, this.projectService.host.createHash),
                this.getCanonicalFileName,
            ),
            sourceFile => this.shouldEmitFile(this.projectService.getScriptInfoForPath(sourceFile.path)) ? sourceFile.fileName : undefined
        );
    }

    /**
     * Returns true if emit was conducted
     */
    emitFile(scriptInfo: ts.server.ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): EmitResult {
        if (!this.languageServiceEnabled || !this.shouldEmitFile(scriptInfo)) {
            return { emitSkipped: true, diagnostics: ts.server.emptyArray };
        }
        const { emitSkipped, diagnostics, outputFiles } = this.getLanguageService().getEmitOutput(scriptInfo.fileName);
        if (!emitSkipped) {
            for (const outputFile of outputFiles) {
                const outputFileAbsoluteFileName = ts.getNormalizedAbsolutePath(outputFile.name, this.currentDirectory);
                writeFile(outputFileAbsoluteFileName, outputFile.text, outputFile.writeByteOrderMark);
            }

            // Update the signature
            if (this.builderState && ts.getEmitDeclarations(this.compilerOptions)) {
                const dtsFiles = outputFiles.filter(f => ts.isDeclarationFileName(f.name));
                if (dtsFiles.length === 1) {
                    const sourceFile = this.program!.getSourceFile(scriptInfo.fileName)!;
                    const signature = this.projectService.host.createHash ?
                        this.projectService.host.createHash(dtsFiles[0].text) :
                        ts.generateDjb2Hash(dtsFiles[0].text);
                    ts.BuilderState.updateSignatureOfFile(this.builderState, signature, sourceFile.resolvedPath);
                }
            }
        }

        return { emitSkipped, diagnostics };
    }

    enableLanguageService() {
        if (this.languageServiceEnabled || this.projectService.serverMode === ts.LanguageServiceMode.Syntactic) {
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
        ts.Debug.assert(this.projectService.serverMode !== ts.LanguageServiceMode.Syntactic);
        this.languageService.cleanupSemanticCache();
        this.languageServiceEnabled = false;
        this.lastFileExceededProgramSize = lastFileExceededProgramSize;
        this.builderState = undefined;
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.close();
        }
        this.autoImportProviderHost = undefined;
        this.resolutionCache.closeTypeRootsWatch();
        this.clearGeneratedFileWatch();
        this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ false);
    }

    getProjectName() {
        return this.projectName;
    }

    protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: ts.TypeAcquisition): ts.TypeAcquisition {
        if (!newTypeAcquisition || !newTypeAcquisition.include) {
            // Nothing to filter out, so just return as-is
            return newTypeAcquisition;
        }
        return { ...newTypeAcquisition, include: this.removeExistingTypings(newTypeAcquisition.include) };
    }

    getExternalFiles(): ts.SortedReadonlyArray<string> {
        return ts.sort(ts.flatMap(this.plugins, plugin => {
            if (typeof plugin.module.getExternalFiles !== "function") return;
            try {
                return plugin.module.getExternalFiles(this);
            }
            catch (e) {
                this.projectService.logger.info(`A plugin threw an exception in getExternalFiles: ${e}`);
                if (e.stack) {
                    this.projectService.logger.info(e.stack);
                }
            }
        }));
    }

    getSourceFile(path: ts.Path) {
        if (!this.program) {
            return undefined;
        }
        return this.program.getSourceFileByPath(path);
    }

    /* @internal */
    getSourceFileOrConfigFile(path: ts.Path): ts.SourceFile | undefined {
        const options = this.program!.getCompilerOptions();
        return path === options.configFilePath ? options.configFile : this.getSourceFile(path);
    }

    close() {
        if (this.program) {
            // if we have a program - release all files that are enlisted in program but arent root
            // The releasing of the roots happens later
            // The project could have pending update remaining and hence the info could be in the files but not in program graph
            for (const f of this.program.getSourceFiles()) {
                this.detachScriptInfoIfNotRoot(f.fileName);
            }
            this.program.forEachResolvedProjectReference(ref =>
                this.detachScriptInfoFromProject(ref.sourceFile.fileName));
        }

        // Release external files
        ts.forEach(this.externalFiles, externalFile => this.detachScriptInfoIfNotRoot(externalFile));
        // Always remove root files from the project
        for (const root of this.rootFiles) {
            root.detachFromProject(this);
        }
        this.projectService.pendingEnsureProjectForOpenFiles = true;

        this.rootFiles = undefined!;
        this.rootFilesMap = undefined!;
        this.externalFiles = undefined;
        this.program = undefined;
        this.builderState = undefined;
        this.resolutionCache.clear();
        this.resolutionCache = undefined!;
        this.cachedUnresolvedImportsPerFile = undefined!;
        this.moduleSpecifierCache = undefined!;
        this.directoryStructureHost = undefined!;
        this.exportMapCache = undefined;
        this.projectErrors = undefined;
        this.plugins.length = 0;

        // Clean up file watchers waiting for missing files
        if (this.missingFilesMap) {
            ts.clearMap(this.missingFilesMap, ts.closeFileWatcher);
            this.missingFilesMap = undefined;
        }
        this.clearGeneratedFileWatch();
        this.clearInvalidateResolutionOfFailedLookupTimer();
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.close();
        }
        this.autoImportProviderHost = undefined;
        if (this.noDtsResolutionProject) {
            this.noDtsResolutionProject.close();
        }
        this.noDtsResolutionProject = undefined;

        // signal language service to release source files acquired from document registry
        this.languageService.dispose();
        this.languageService = undefined!;
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

    getScriptInfos(): ts.server.ScriptInfo[] {
        if (!this.languageServiceEnabled) {
            // if language service is not enabled - return just root files
            return this.rootFiles;
        }
        return ts.map(this.program!.getSourceFiles(), sourceFile => {
            const scriptInfo = this.projectService.getScriptInfoForPath(sourceFile.resolvedPath);
            ts.Debug.assert(!!scriptInfo, "getScriptInfo", () => `scriptInfo for a file '${sourceFile.fileName}' Path: '${sourceFile.path}' / '${sourceFile.resolvedPath}' is missing.`);
            return scriptInfo;
        });
    }

    getExcludedFiles(): readonly ts.server.NormalizedPath[] {
        return ts.server.emptyArray;
    }

    getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean) {
        if (!this.program) {
            return [];
        }

        if (!this.languageServiceEnabled) {
            // if language service is disabled assume that all files in program are root files + default library
            let rootFiles = this.getRootFiles();
            if (this.compilerOptions) {
                const defaultLibrary = ts.getDefaultLibFilePath(this.compilerOptions);
                if (defaultLibrary) {
                    (rootFiles || (rootFiles = [])).push(ts.server.asNormalizedPath(defaultLibrary));
                }
            }
            return rootFiles;
        }
        const result: ts.server.NormalizedPath[] = [];
        for (const f of this.program.getSourceFiles()) {
            if (excludeFilesFromExternalLibraries && this.program.isSourceFileFromExternalLibrary(f)) {
                continue;
            }
            result.push(ts.server.asNormalizedPath(f.fileName));
        }
        if (!excludeConfigFiles) {
            const configFile = this.program.getCompilerOptions().configFile;
            if (configFile) {
                result.push(ts.server.asNormalizedPath(configFile.fileName));
                if (configFile.extendedSourceFiles) {
                    for (const f of configFile.extendedSourceFiles) {
                        result.push(ts.server.asNormalizedPath(f));
                    }
                }
            }
        }
        return result;
    }

    /* @internal */
    getFileNamesWithRedirectInfo(includeProjectReferenceRedirectInfo: boolean) {
        return this.getFileNames().map((fileName): ts.server.protocol.FileWithProjectReferenceRedirectInfo => ({
            fileName,
            isSourceOfProjectReferenceRedirect: includeProjectReferenceRedirectInfo && this.isSourceOfProjectReferenceRedirect(fileName)
         }));
    }

    hasConfigFile(configFilePath: ts.server.NormalizedPath) {
        if (this.program && this.languageServiceEnabled) {
            const configFile = this.program.getCompilerOptions().configFile;
            if (configFile) {
                if (configFilePath === ts.server.asNormalizedPath(configFile.fileName)) {
                    return true;
                }
                if (configFile.extendedSourceFiles) {
                    for (const f of configFile.extendedSourceFiles) {
                        if (configFilePath === ts.server.asNormalizedPath(f)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    containsScriptInfo(info: ts.server.ScriptInfo): boolean {
        if (this.isRoot(info)) return true;
        if (!this.program) return false;
        const file = this.program.getSourceFileByPath(info.path);
        return !!file && file.resolvedPath === info.path;
    }

    containsFile(filename: ts.server.NormalizedPath, requireOpen?: boolean): boolean {
        const info = this.projectService.getScriptInfoForNormalizedPath(filename);
        if (info && (info.isScriptOpen() || !requireOpen)) {
            return this.containsScriptInfo(info);
        }
        return false;
    }

    isRoot(info: ts.server.ScriptInfo) {
        return this.rootFilesMap && this.rootFilesMap.get(info.path)?.info === info;
    }

    // add a root file to project
    addRoot(info: ts.server.ScriptInfo, fileName?: ts.server.NormalizedPath) {
        ts.Debug.assert(!this.isRoot(info));
        this.rootFiles.push(info);
        this.rootFilesMap.set(info.path, { fileName: fileName || info.fileName, info });
        info.attachToProject(this);

        this.markAsDirty();
    }

    // add a root file that doesnt exist on host
    addMissingFileRoot(fileName: ts.server.NormalizedPath) {
        const path = this.projectService.toPath(fileName);
        this.rootFilesMap.set(path, { fileName });
        this.markAsDirty();
    }

    removeFile(info: ts.server.ScriptInfo, fileExists: boolean, detachFromProject: boolean) {
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
        (this.updatedFileNames || (this.updatedFileNames = new ts.Set<string>())).add(fileName);
    }

    /*@internal*/
    markFileAsDirty(changedFile: ts.Path) {
        this.markAsDirty();
        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            (this.changedFilesForExportMapCache ||= new ts.Set()).add(changedFile);
        }
    }

    markAsDirty() {
        if (!this.dirty) {
            this.projectStateVersion++;
            this.dirty = true;
        }
    }

    /*@internal*/
    onAutoImportProviderSettingsChanged() {
        if (this.autoImportProviderHost === false) {
            this.autoImportProviderHost = undefined;
        }
        else {
            this.autoImportProviderHost?.markAsDirty();
        }
    }

    /*@internal*/
    onPackageJsonChange(packageJsonPath: ts.Path) {
        if (this.packageJsonsForAutoImport?.has(packageJsonPath)) {
            this.moduleSpecifierCache.clear();
            if (this.autoImportProviderHost) {
                this.autoImportProviderHost.markAsDirty();
            }
        }
    }

    /* @internal */
    onFileAddedOrRemoved(isSymlink: boolean | undefined) {
        this.hasAddedorRemovedFiles = true;
        if (isSymlink) {
            this.hasAddedOrRemovedSymlinks = true;
        }
    }

    /* @internal */
    onDiscoveredSymlink() {
        this.hasAddedOrRemovedSymlinks = true;
    }

    /**
     * Updates set of files that contribute to this project
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean {
        ts.tracing?.push(ts.tracing.Phase.Session, "updateGraph", { name: this.projectName, kind: ProjectKind[this.projectKind] });
        ts.perfLogger.logStartUpdateGraph();
        this.resolutionCache.startRecordingFilesWithChangedResolutions();

        const hasNewProgram = this.updateGraphWorker();
        const hasAddedorRemovedFiles = this.hasAddedorRemovedFiles;
        this.hasAddedorRemovedFiles = false;
        this.hasAddedOrRemovedSymlinks = false;

        const changedFiles: readonly ts.Path[] = this.resolutionCache.finishRecordingFilesWithChangedResolutions() || ts.server.emptyArray;

        for (const file of changedFiles) {
            // delete cached information for changed files
            this.cachedUnresolvedImportsPerFile.delete(file);
        }

        // update builder only if language service is enabled
        // otherwise tell it to drop its internal state
        if (this.languageServiceEnabled && this.projectService.serverMode === ts.LanguageServiceMode.Semantic) {
            // 1. no changes in structure, no changes in unresolved imports - do nothing
            // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
            // (can reuse cached imports for files that were not changed)
            // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
            // (can reuse cached imports for files that were not changed)
            // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
            if (hasNewProgram || changedFiles.length) {
                this.lastCachedUnresolvedImportsList = getUnresolvedImports(this.program!, this.cachedUnresolvedImportsPerFile);
            }

            this.projectService.typingsCache.enqueueInstallTypingsForProject(this, this.lastCachedUnresolvedImportsList, hasAddedorRemovedFiles);
        }
        else {
            this.lastCachedUnresolvedImportsList = undefined;
        }

        const isFirstProgramLoad = this.projectProgramVersion === 0 && hasNewProgram;
        if (hasNewProgram) {
            this.projectProgramVersion++;
        }
        if (hasAddedorRemovedFiles) {
            if (!this.autoImportProviderHost) this.autoImportProviderHost = undefined;
            this.autoImportProviderHost?.markAsDirty();
        }
        if (isFirstProgramLoad) {
            // Preload auto import provider so it's not created during completions request
            this.getPackageJsonAutoImportProvider();
        }
        ts.perfLogger.logStopUpdateGraph();
        ts.tracing?.pop();
        return !hasNewProgram;
    }

    /*@internal*/
    updateTypingFiles(typingFiles: ts.SortedReadonlyArray<string>) {
        if (ts.enumerateInsertsAndDeletes<string, string>(typingFiles, this.typingFiles, ts.getStringComparer(!this.useCaseSensitiveFileNames()),
            /*inserted*/ ts.noop,
            removed => this.detachScriptInfoFromProject(removed)
        )) {
            // If typing files changed, then only schedule project update
            this.typingFiles = typingFiles;
            // Invalidate files with unresolved imports
            this.resolutionCache.setFilesWithInvalidatedNonRelativeUnresolvedImports(this.cachedUnresolvedImportsPerFile);
            this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
        }
    }

    /* @internal */
    getCurrentProgram(): ts.Program | undefined {
        return this.program;
    }

    protected removeExistingTypings(include: string[]): string[] {
        const existing = ts.getAutomaticTypeDirectiveNames(this.getCompilerOptions(), this.directoryStructureHost);
        return include.filter(i => existing.indexOf(i) < 0);
    }

    private updateGraphWorker() {
        const oldProgram = this.languageService.getCurrentProgram();
        ts.Debug.assert(!this.isClosed(), "Called update graph worker of closed project");
        this.writeLog(`Starting updateGraphWorker: Project: ${this.getProjectName()}`);
        const start = ts.timestamp();
        this.hasInvalidatedResolutions = this.resolutionCache.createHasInvalidatedResolutions(ts.returnFalse);
        this.resolutionCache.startCachingPerDirectoryResolution();
        this.program = this.languageService.getProgram(); // TODO: GH#18217
        this.dirty = false;
        ts.tracing?.push(ts.tracing.Phase.Session, "finishCachingPerDirectoryResolution");
        this.resolutionCache.finishCachingPerDirectoryResolution(this.program, oldProgram);
        ts.tracing?.pop();

        ts.Debug.assert(oldProgram === undefined || this.program !== undefined);

        // bump up the version if
        // - oldProgram is not set - this is a first time updateGraph is called
        // - newProgram is different from the old program and structure of the old program was not reused.
        let hasNewProgram = false;
        if (this.program && (!oldProgram || (this.program !== oldProgram && this.program.structureIsReused !== ts.StructureIsReused.Completely))) {
            hasNewProgram = true;
            if (oldProgram) {
                for (const f of oldProgram.getSourceFiles()) {
                    const newFile = this.program.getSourceFileByPath(f.resolvedPath);
                    if (!newFile || (f.resolvedPath === f.path && newFile.resolvedPath !== f.path)) {
                        // new program does not contain this file - detach it from the project
                        // - remove resolutions only if the new program doesnt contain source file by the path (not resolvedPath since path is used for resolution)
                        this.detachScriptInfoFromProject(f.fileName, !!this.program.getSourceFileByPath(f.path));
                    }
                }

                oldProgram.forEachResolvedProjectReference(resolvedProjectReference => {
                    if (!this.program!.getResolvedProjectReferenceByPath(resolvedProjectReference.sourceFile.path)) {
                        this.detachScriptInfoFromProject(resolvedProjectReference.sourceFile.fileName);
                    }
                });
            }

            // Update the missing file paths watcher
            ts.updateMissingFilePathsWatch(
                this.program,
                this.missingFilesMap || (this.missingFilesMap = new ts.Map()),
                // Watch the missing files
                missingFilePath => this.addMissingFileWatcher(missingFilePath)
            );

            if (this.generatedFilesMap) {
                const outPath = ts.outFile(this.compilerOptions);
                if (isGeneratedFileWatcher(this.generatedFilesMap)) {
                    // --out
                    if (!outPath || !this.isValidGeneratedFileWatcher(
                        ts.removeFileExtension(outPath) + ts.Extension.Dts,
                        this.generatedFilesMap,
                    )) {
                        this.clearGeneratedFileWatch();
                    }
                }
                else {
                    // MultiFile
                    if (outPath) {
                        this.clearGeneratedFileWatch();
                    }
                    else {
                        this.generatedFilesMap.forEach((watcher, source) => {
                            const sourceFile = this.program!.getSourceFileByPath(source);
                            if (!sourceFile ||
                                sourceFile.resolvedPath !== source ||
                                !this.isValidGeneratedFileWatcher(
                                    ts.getDeclarationEmitOutputFilePathWorker(sourceFile.fileName, this.compilerOptions, this.currentDirectory, this.program!.getCommonSourceDirectory(), this.getCanonicalFileName),
                                    watcher
                                )) {
                                ts.closeFileWatcherOf(watcher);
                                (this.generatedFilesMap as ts.ESMap<string, GeneratedFileWatcher>).delete(source);
                            }
                        });
                    }
                }
            }

            // Watch the type locations that would be added to program as part of automatic type resolutions
            if (this.languageServiceEnabled && this.projectService.serverMode === ts.LanguageServiceMode.Semantic) {
                this.resolutionCache.updateTypeRootsWatch();
            }
        }

        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            this.exportMapCache.releaseSymbols();
            if (this.hasAddedorRemovedFiles || oldProgram && !this.program!.structureIsReused) {
                this.exportMapCache.clear();
            }
            else if (this.changedFilesForExportMapCache && oldProgram && this.program) {
                ts.forEachKey(this.changedFilesForExportMapCache, fileName => {
                    const oldSourceFile = oldProgram.getSourceFileByPath(fileName);
                    const sourceFile = this.program!.getSourceFileByPath(fileName);
                    if (!oldSourceFile || !sourceFile) {
                        this.exportMapCache!.clear();
                        return true;
                    }
                    return this.exportMapCache!.onFileChanged(oldSourceFile, sourceFile, !!this.getTypeAcquisition().enable);
                });
            }
        }
        if (this.changedFilesForExportMapCache) {
            this.changedFilesForExportMapCache.clear();
        }

        if (this.hasAddedOrRemovedSymlinks || this.program && !this.program.structureIsReused && this.getCompilerOptions().preserveSymlinks) {
            // With --preserveSymlinks, we may not determine that a file is a symlink, so we never set `hasAddedOrRemovedSymlinks`
            this.symlinks = undefined;
            this.moduleSpecifierCache.clear();
        }

        const oldExternalFiles = this.externalFiles || ts.server.emptyArray as ts.SortedReadonlyArray<string>;
        this.externalFiles = this.getExternalFiles();
        ts.enumerateInsertsAndDeletes<string, string>(this.externalFiles, oldExternalFiles, ts.getStringComparer(!this.useCaseSensitiveFileNames()),
            // Ensure a ScriptInfo is created for new external files. This is performed indirectly
            // by the host for files in the program when the program is retrieved above but
            // the program doesn't contain external files so this must be done explicitly.
            inserted => {
                const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(inserted, this.currentDirectory, this.directoryStructureHost);
                scriptInfo?.attachToProject(this);
            },
            removed => this.detachScriptInfoFromProject(removed)
        );
        const elapsed = ts.timestamp() - start;
        this.sendPerformanceEvent("UpdateGraph", elapsed);
        this.writeLog(`Finishing updateGraphWorker: Project: ${this.getProjectName()} Version: ${this.getProjectVersion()} structureChanged: ${hasNewProgram}${this.program ? ` structureIsReused:: ${(ts as any).StructureIsReused[this.program.structureIsReused]}` : ""} Elapsed: ${elapsed}ms`);
        if (this.hasAddedorRemovedFiles) {
            this.print(/*writeProjectFileNames*/ true);
        }
        else if (this.program !== oldProgram) {
            this.writeLog(`Different program with same set of files`);
        }
        return hasNewProgram;
    }

    /* @internal */
    sendPerformanceEvent(kind: ts.PerformanceEvent["kind"], durationMs: number) {
        this.projectService.sendPerformanceEvent(kind, durationMs);
    }

    private detachScriptInfoFromProject(uncheckedFileName: string, noRemoveResolution?: boolean) {
        const scriptInfoToDetach = this.projectService.getScriptInfo(uncheckedFileName);
        if (scriptInfoToDetach) {
            scriptInfoToDetach.detachFromProject(this);
            if (!noRemoveResolution) {
                this.resolutionCache.removeResolutionsOfFile(scriptInfoToDetach.path);
            }
        }
    }

    private addMissingFileWatcher(missingFilePath: ts.Path) {
        if (isConfiguredProject(this)) {
            // If this file is referenced config file, we are already watching it, no need to watch again
            const configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(missingFilePath as string as ts.server.NormalizedPath);
            if (configFileExistenceInfo?.config?.projects.has(this.canonicalConfigFilePath)) return ts.noopFileWatcher;
        }
        const fileWatcher = this.projectService.watchFactory.watchFile(
            missingFilePath,
            (fileName, eventKind) => {
                if (isConfiguredProject(this)) {
                    this.getCachedDirectoryStructureHost().addOrDeleteFile(fileName, missingFilePath, eventKind);
                }

                if (eventKind === ts.FileWatcherEventKind.Created && this.missingFilesMap!.has(missingFilePath)) {
                    this.missingFilesMap!.delete(missingFilePath);
                    fileWatcher.close();

                    // When a missing file is created, we should update the graph.
                    this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
                }
            },
            ts.PollingInterval.Medium,
            this.projectService.getWatchOptions(this),
            ts.WatchType.MissingFile,
            this
        );
        return fileWatcher;
    }

    private isWatchedMissingFile(path: ts.Path) {
        return !!this.missingFilesMap && this.missingFilesMap.has(path);
    }

    /* @internal */
    addGeneratedFileWatch(generatedFile: string, sourceFile: string) {
        if (ts.outFile(this.compilerOptions)) {
            // Single watcher
            if (!this.generatedFilesMap) {
                this.generatedFilesMap = this.createGeneratedFileWatcher(generatedFile);
            }
        }
        else {
            // Map
            const path = this.toPath(sourceFile);
            if (this.generatedFilesMap) {
                if (isGeneratedFileWatcher(this.generatedFilesMap)) {
                    ts.Debug.fail(`${this.projectName} Expected to not have --out watcher for generated file with options: ${JSON.stringify(this.compilerOptions)}`);
                    return;
                }
                if (this.generatedFilesMap.has(path)) return;
            }
            else {
                this.generatedFilesMap = new ts.Map();
            }
            this.generatedFilesMap.set(path, this.createGeneratedFileWatcher(generatedFile));
        }
    }

    private createGeneratedFileWatcher(generatedFile: string): GeneratedFileWatcher {
        return {
            generatedFilePath: this.toPath(generatedFile),
            watcher: this.projectService.watchFactory.watchFile(
                generatedFile,
                () => {
                    this.clearSourceMapperCache();
                    this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
                },
                ts.PollingInterval.High,
                this.projectService.getWatchOptions(this),
                ts.WatchType.MissingGeneratedFile,
                this
            )
        };
    }

    private isValidGeneratedFileWatcher(generateFile: string, watcher: GeneratedFileWatcher) {
        return this.toPath(generateFile) === watcher.generatedFilePath;
    }

    private clearGeneratedFileWatch() {
        if (this.generatedFilesMap) {
            if (isGeneratedFileWatcher(this.generatedFilesMap)) {
                ts.closeFileWatcherOf(this.generatedFilesMap);
            }
            else {
                ts.clearMap(this.generatedFilesMap, ts.closeFileWatcherOf);
            }
            this.generatedFilesMap = undefined;
        }
    }

    getScriptInfoForNormalizedPath(fileName: ts.server.NormalizedPath): ts.server.ScriptInfo | undefined {
        const scriptInfo = this.projectService.getScriptInfoForPath(this.toPath(fileName));
        if (scriptInfo && !scriptInfo.isAttached(this)) {
            return ts.server.Errors.ThrowProjectDoesNotContainDocument(fileName, this);
        }
        return scriptInfo;
    }

    getScriptInfo(uncheckedFileName: string) {
        return this.projectService.getScriptInfo(uncheckedFileName);
    }

    filesToString(writeProjectFileNames: boolean) {
        if (this.isInitialLoadPending()) return "\tFiles (0) InitialLoadPending\n";
        if (!this.program) return "\tFiles (0) NoProgram\n";
        const sourceFiles = this.program.getSourceFiles();
        let strBuilder = `\tFiles (${sourceFiles.length})\n`;
        if (writeProjectFileNames) {
            for (const file of sourceFiles) {
                strBuilder += `\t${file.fileName}\n`;
            }
            strBuilder += "\n\n";
            ts.explainFiles(this.program, s => strBuilder += `\t${s}\n`);
        }
        return strBuilder;
    }

    /*@internal*/
    print(writeProjectFileNames: boolean) {
        this.writeLog(`Project '${this.projectName}' (${ProjectKind[this.projectKind]})`);
        this.writeLog(this.filesToString(writeProjectFileNames && this.projectService.logger.hasLevel(ts.server.LogLevel.verbose)));
        this.writeLog("-----------------------------------------------");
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.print(/*writeProjectFileNames*/ false);
        }
    }

    setCompilerOptions(compilerOptions: ts.CompilerOptions) {
        if (compilerOptions) {
            compilerOptions.allowNonTsExtensions = true;
            const oldOptions = this.compilerOptions;
            this.compilerOptions = compilerOptions;
            this.setInternalCompilerOptionsForEmittingJsFiles();
            this.noDtsResolutionProject?.setCompilerOptions(this.getCompilerOptionsForNoDtsResolutionProject());
            if (ts.changesAffectModuleResolution(oldOptions, compilerOptions)) {
                // reset cached unresolved imports if changes in compiler options affected module resolution
                this.cachedUnresolvedImportsPerFile.clear();
                this.lastCachedUnresolvedImportsList = undefined;
                this.resolutionCache.clear();
                this.moduleSpecifierCache.clear();
            }
            this.markAsDirty();
        }
    }

    /*@internal*/
    setWatchOptions(watchOptions: ts.WatchOptions | undefined) {
        this.watchOptions = watchOptions;
    }

    /*@internal*/
    getWatchOptions(): ts.WatchOptions | undefined {
        return this.watchOptions;
    }

    setTypeAcquisition(newTypeAcquisition: ts.TypeAcquisition | undefined): void {
        if (newTypeAcquisition) {
            this.typeAcquisition = this.removeLocalTypingsFromTypeAcquisition(newTypeAcquisition);
        }
    }

    getTypeAcquisition() {
        return this.typeAcquisition || {};
    }

    /* @internal */
    getChangesSinceVersion(lastKnownVersion?: number, includeProjectReferenceRedirectInfo?: boolean): ProjectFilesWithTSDiagnostics {
        const includeProjectReferenceRedirectInfoIfRequested =
            includeProjectReferenceRedirectInfo
                ? (files: ts.ESMap<string, boolean>) => ts.arrayFrom(files.entries(), ([fileName, isSourceOfProjectReferenceRedirect]): ts.server.protocol.FileWithProjectReferenceRedirectInfo => ({
                    fileName,
                    isSourceOfProjectReferenceRedirect
                }))
                : (files: ts.ESMap<string, boolean>) => ts.arrayFrom(files.keys());

        // Update the graph only if initial configured project load is not pending
        if (!this.isInitialLoadPending()) {
            ts.server.updateProjectIfDirty(this);
        }

        const info: ts.server.protocol.ProjectVersionInfo = {
            projectName: this.getProjectName(),
            version: this.projectProgramVersion,
            isInferred: isInferredProject(this),
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
            const externalFiles = this.getExternalFiles().map((f): ts.server.protocol.FileWithProjectReferenceRedirectInfo => ({
                fileName: ts.server.toNormalizedPath(f),
                isSourceOfProjectReferenceRedirect: false
            }));
            const currentFiles = ts.arrayToMap(
                this.getFileNamesWithRedirectInfo(!!includeProjectReferenceRedirectInfo).concat(externalFiles),
                info => info.fileName,
                info => info.isSourceOfProjectReferenceRedirect
            );

            const added: ts.ESMap<string, boolean> = new ts.Map<string, boolean>();
            const removed: ts.ESMap<string, boolean> = new ts.Map<string, boolean>();

            const updated: string[] = updatedFileNames ? ts.arrayFrom(updatedFileNames.keys()) : [];
            const updatedRedirects: ts.server.protocol.FileWithProjectReferenceRedirectInfo[] = [];

            ts.forEachEntry(currentFiles, (isSourceOfProjectReferenceRedirect, fileName) => {
                if (!lastReportedFileNames.has(fileName)) {
                    added.set(fileName, isSourceOfProjectReferenceRedirect);
                }
                else if (includeProjectReferenceRedirectInfo && isSourceOfProjectReferenceRedirect !== lastReportedFileNames.get(fileName)){
                    updatedRedirects.push({
                        fileName,
                        isSourceOfProjectReferenceRedirect
                    });
                }
            });
            ts.forEachEntry(lastReportedFileNames, (isSourceOfProjectReferenceRedirect, fileName) => {
                if (!currentFiles.has(fileName)) {
                    removed.set(fileName, isSourceOfProjectReferenceRedirect);
                }
            });
            this.lastReportedFileNames = currentFiles;
            this.lastReportedVersion = this.projectProgramVersion;
            return {
                info,
                changes: {
                    added: includeProjectReferenceRedirectInfoIfRequested(added),
                    removed: includeProjectReferenceRedirectInfoIfRequested(removed),
                    updated: includeProjectReferenceRedirectInfo
                        ? updated.map((fileName): ts.server.protocol.FileWithProjectReferenceRedirectInfo => ({
                            fileName,
                            isSourceOfProjectReferenceRedirect: this.isSourceOfProjectReferenceRedirect(fileName)
                        }))
                        : updated,
                    updatedRedirects: includeProjectReferenceRedirectInfo ? updatedRedirects : undefined
                },
                projectErrors: this.getGlobalProjectErrors()
            };
        }
        else {
            // unknown version - return everything
            const projectFileNames = this.getFileNamesWithRedirectInfo(!!includeProjectReferenceRedirectInfo);
            const externalFiles = this.getExternalFiles().map((f): ts.server.protocol.FileWithProjectReferenceRedirectInfo => ({
                fileName: ts.server.toNormalizedPath(f),
                isSourceOfProjectReferenceRedirect: false
            }));
            const allFiles = projectFileNames.concat(externalFiles);
            this.lastReportedFileNames = ts.arrayToMap(
                allFiles,
                info => info.fileName,
                info => info.isSourceOfProjectReferenceRedirect
            );
            this.lastReportedVersion = this.projectProgramVersion;
            return {
                info,
                files: includeProjectReferenceRedirectInfo ? allFiles : allFiles.map(f => f.fileName),
                projectErrors: this.getGlobalProjectErrors()
            };
        }
    }

    // remove a root file from project
    protected removeRoot(info: ts.server.ScriptInfo): void {
        ts.orderedRemoveItem(this.rootFiles, info);
        this.rootFilesMap.delete(info.path);
    }

    /*@internal*/
    isSourceOfProjectReferenceRedirect(fileName: string) {
        return !!this.program && this.program.isSourceOfProjectReferenceRedirect(fileName);
    }

    /*@internal*/
    protected getGlobalPluginSearchPaths() {
        // Search any globally-specified probe paths, then our peer node_modules
        return [
            ...this.projectService.pluginProbeLocations,
            // ../../.. to walk from X/node_modules/typescript/lib/tsserver.js to X/node_modules/
            ts.combinePaths(this.projectService.getExecutingFilePath(), "../../.."),
        ];
    }

    protected enableGlobalPlugins(options: ts.CompilerOptions, pluginConfigOverrides: ts.Map<any> | undefined): void {
        if (!this.projectService.globalPlugins.length) return;
        const host = this.projectService.host;

        if (!host.require && !host.importPlugin) {
            this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
            return;
        }

        // Enable global plugins with synthetic configuration entries
        const searchPaths = this.getGlobalPluginSearchPaths();
        for (const globalPluginName of this.projectService.globalPlugins) {
            // Skip empty names from odd commandline parses
            if (!globalPluginName) continue;

            // Skip already-locally-loaded plugins
            if (options.plugins && options.plugins.some(p => p.name === globalPluginName)) continue;

            // Provide global: true so plugins can detect why they can't find their config
            this.projectService.logger.info(`Loading global plugin ${globalPluginName}`);

            this.enablePlugin({ name: globalPluginName, global: true } as ts.PluginImport, searchPaths, pluginConfigOverrides);
        }
    }

    /**
     * Performs the initial steps of enabling a plugin by finding and instantiating the module for a plugin synchronously using 'require'.
     */
    /*@internal*/
    beginEnablePluginSync(pluginConfigEntry: ts.PluginImport, searchPaths: string[], pluginConfigOverrides: ts.Map<any> | undefined): BeginEnablePluginResult {
        ts.Debug.assertIsDefined(this.projectService.host.require);

        let errorLogs: string[] | undefined;
        const log = (message: string) => this.projectService.logger.info(message);
        const logError = (message: string) => {
            (errorLogs ??= []).push(message);
        };
        const resolvedModule = ts.firstDefined(searchPaths, searchPath =>
            Project.resolveModule(pluginConfigEntry.name, searchPath, this.projectService.host, log, logError) as PluginModuleFactory | undefined);
        return { pluginConfigEntry, pluginConfigOverrides, resolvedModule, errorLogs };
    }

    /**
     * Performs the initial steps of enabling a plugin by finding and instantiating the module for a plugin asynchronously using dynamic `import`.
     */
    /*@internal*/
    async beginEnablePluginAsync(pluginConfigEntry: ts.PluginImport, searchPaths: string[], pluginConfigOverrides: ts.Map<any> | undefined): Promise<BeginEnablePluginResult> {
        ts.Debug.assertIsDefined(this.projectService.host.importPlugin);

        let errorLogs: string[] | undefined;
        const log = (message: string) => this.projectService.logger.info(message);
        const logError = (message: string) => {
            (errorLogs ??= []).push(message);
        };

        let resolvedModule: PluginModuleFactory | undefined;
        for (const searchPath of searchPaths) {
            resolvedModule = await Project.importServicePluginAsync(pluginConfigEntry.name, searchPath, this.projectService.host, log, logError) as PluginModuleFactory | undefined;
            if (resolvedModule !== undefined) {
                break;
            }
        }
        return { pluginConfigEntry, pluginConfigOverrides, resolvedModule, errorLogs };
    }

    /**
     * Performs the remaining steps of enabling a plugin after its module has been instantiated.
     */
    /*@internal*/
    endEnablePlugin({ pluginConfigEntry, pluginConfigOverrides, resolvedModule, errorLogs }: BeginEnablePluginResult) {
        if (resolvedModule) {
            const configurationOverride = pluginConfigOverrides && pluginConfigOverrides.get(pluginConfigEntry.name);
            if (configurationOverride) {
                // Preserve the name property since it's immutable
                const pluginName = pluginConfigEntry.name;
                pluginConfigEntry = configurationOverride;
                pluginConfigEntry.name = pluginName;
            }

            this.enableProxy(resolvedModule, pluginConfigEntry);
        }
        else {
            ts.forEach(errorLogs, message => this.projectService.logger.info(message));
            this.projectService.logger.info(`Couldn't find ${pluginConfigEntry.name}`);
        }
    }

    protected enablePlugin(pluginConfigEntry: ts.PluginImport, searchPaths: string[], pluginConfigOverrides: ts.Map<any> | undefined): void {
        this.projectService.requestEnablePlugin(this, pluginConfigEntry, searchPaths, pluginConfigOverrides);
    }

    private enableProxy(pluginModuleFactory: PluginModuleFactory, configEntry: ts.PluginImport) {
        try {
            if (typeof pluginModuleFactory !== "function") {
                this.projectService.logger.info(`Skipped loading plugin ${configEntry.name} because it did not expose a proper factory function`);
                return;
            }

            const info: PluginCreateInfo = {
                config: configEntry,
                project: this,
                languageService: this.languageService,
                languageServiceHost: this,
                serverHost: this.projectService.host,
                session: this.projectService.session
            };

            const pluginModule = pluginModuleFactory({ typescript: ts });
            const newLS = pluginModule.create(info);
            for (const k of Object.keys(this.languageService)) {
                // eslint-disable-next-line local/no-in-operator
                if (!(k in newLS)) {
                    this.projectService.logger.info(`Plugin activation warning: Missing proxied method ${k} in created LS. Patching.`);
                    (newLS as any)[k] = (this.languageService as any)[k];
                }
            }
            this.projectService.logger.info(`Plugin validation succeeded`);
            this.languageService = newLS;
            this.plugins.push({ name: configEntry.name, module: pluginModule });
        }
        catch (e) {
            this.projectService.logger.info(`Plugin activation failed: ${e}`);
        }
    }

    /*@internal*/
    onPluginConfigurationChanged(pluginName: string, configuration: any) {
        this.plugins.filter(plugin => plugin.name === pluginName).forEach(plugin => {
            if (plugin.module.onConfigurationChanged) {
                plugin.module.onConfigurationChanged(configuration);
            }
        });
    }

    /** Starts a new check for diagnostics. Call this if some file has updated that would cause diagnostics to be changed. */
    refreshDiagnostics() {
        this.projectService.sendProjectsUpdatedInBackgroundEvent();
    }

    /*@internal*/
    getPackageJsonsVisibleToFile(fileName: string, rootDir?: string): readonly ts.ProjectPackageJsonInfo[] {
        if (this.projectService.serverMode !== ts.LanguageServiceMode.Semantic) return ts.server.emptyArray;
        return this.projectService.getPackageJsonsVisibleToFile(fileName, rootDir);
    }

    /*@internal*/
    getNearestAncestorDirectoryWithPackageJson(fileName: string): string | undefined {
        return this.projectService.getNearestAncestorDirectoryWithPackageJson(fileName);
    }

    /*@internal*/
    getPackageJsonsForAutoImport(rootDir?: string): readonly ts.ProjectPackageJsonInfo[] {
        const packageJsons = this.getPackageJsonsVisibleToFile(ts.combinePaths(this.currentDirectory, ts.inferredTypesContainingFile), rootDir);
        this.packageJsonsForAutoImport = new ts.Set(packageJsons.map(p => p.fileName));
        return packageJsons;
    }

    /* @internal */
    getPackageJsonCache() {
        return this.projectService.packageJsonCache;
    }

    /*@internal*/
    getCachedExportInfoMap() {
        return this.exportMapCache ||= ts.createCacheableExportInfoMap(this);
    }

    /*@internal*/
    clearCachedExportInfoMap() {
        this.exportMapCache?.clear();
    }

    /*@internal*/
    getModuleSpecifierCache() {
        return this.moduleSpecifierCache;
    }

    /*@internal*/
    includePackageJsonAutoImports(): ts.PackageJsonAutoImportPreference {
        if (this.projectService.includePackageJsonAutoImports() === ts.PackageJsonAutoImportPreference.Off ||
            !this.languageServiceEnabled ||
            ts.isInsideNodeModules(this.currentDirectory) ||
            !this.isDefaultProjectForOpenFiles()) {
            return ts.PackageJsonAutoImportPreference.Off;
        }
        return this.projectService.includePackageJsonAutoImports();
    }

    /*@internal*/
    getModuleResolutionHostForAutoImportProvider(): ts.ModuleResolutionHost {
        if (this.program) {
            return {
                fileExists: this.program.fileExists,
                directoryExists: this.program.directoryExists,
                realpath: this.program.realpath || this.projectService.host.realpath?.bind(this.projectService.host),
                getCurrentDirectory: this.getCurrentDirectory.bind(this),
                readFile: this.projectService.host.readFile.bind(this.projectService.host),
                getDirectories: this.projectService.host.getDirectories.bind(this.projectService.host),
                trace: this.projectService.host.trace?.bind(this.projectService.host),
                useCaseSensitiveFileNames: this.program.useCaseSensitiveFileNames(),
            };
        }
        return this.projectService.host;
    }

    /*@internal*/
    getPackageJsonAutoImportProvider(): ts.Program | undefined {
        if (this.autoImportProviderHost === false) {
            return undefined;
        }
        if (this.projectService.serverMode !== ts.LanguageServiceMode.Semantic) {
            this.autoImportProviderHost = false;
            return undefined;
        }
        if (this.autoImportProviderHost) {
            ts.server.updateProjectIfDirty(this.autoImportProviderHost);
            if (this.autoImportProviderHost.isEmpty()) {
                this.autoImportProviderHost.close();
                this.autoImportProviderHost = undefined;
                return undefined;
            }
            return this.autoImportProviderHost.getCurrentProgram();
        }

        const dependencySelection = this.includePackageJsonAutoImports();
        if (dependencySelection) {
            ts.tracing?.push(ts.tracing.Phase.Session, "getPackageJsonAutoImportProvider");
            const start = ts.timestamp();
            this.autoImportProviderHost = AutoImportProviderProject.create(dependencySelection, this, this.getModuleResolutionHostForAutoImportProvider(), this.documentRegistry);
            if (this.autoImportProviderHost) {
                ts.server.updateProjectIfDirty(this.autoImportProviderHost);
                this.sendPerformanceEvent("CreatePackageJsonAutoImportProvider", ts.timestamp() - start);
                ts.tracing?.pop();
                return this.autoImportProviderHost.getCurrentProgram();
            }
            ts.tracing?.pop();
        }
    }

    /*@internal*/
    private isDefaultProjectForOpenFiles(): boolean {
        return !!ts.forEachEntry(
            this.projectService.openFiles,
            (_, fileName) => this.projectService.tryGetDefaultProjectForFile(ts.server.toNormalizedPath(fileName)) === this);
    }

    /*@internal*/
    watchNodeModulesForPackageJsonChanges(directoryPath: string) {
        return this.projectService.watchPackageJsonsInNodeModules(this.toPath(directoryPath), this);
    }

    /*@internal*/
    getIncompleteCompletionsCache() {
        return this.projectService.getIncompleteCompletionsCache();
    }

    /*@internal*/
    getNoDtsResolutionProject(rootFileNames: readonly string[]): Project {
        ts.Debug.assert(this.projectService.serverMode === ts.LanguageServiceMode.Semantic);
        if (!this.noDtsResolutionProject) {
            this.noDtsResolutionProject = new AuxiliaryProject(this.projectService, this.documentRegistry, this.getCompilerOptionsForNoDtsResolutionProject());
        }

        ts.enumerateInsertsAndDeletes<ts.server.NormalizedPath, ts.server.NormalizedPath>(
            rootFileNames.map(ts.server.toNormalizedPath),
            this.noDtsResolutionProject.getRootFiles(),
            ts.getStringComparer(!this.useCaseSensitiveFileNames()),
            pathToAdd => {
                const info = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
                    pathToAdd,
                    this.currentDirectory,
                    this.noDtsResolutionProject!.directoryStructureHost);
                if (info) {
                    this.noDtsResolutionProject!.addRoot(info, pathToAdd);
                }
            },
            pathToRemove => {
                // It may be preferable to remove roots only once project grows to a certain size?
                const info = this.noDtsResolutionProject!.getScriptInfo(pathToRemove);
                if (info) {
                    this.noDtsResolutionProject!.removeRoot(info);
                }
            },
        );

        return this.noDtsResolutionProject;
    }

    /*@internal*/
    private getCompilerOptionsForNoDtsResolutionProject() {
        return {
            ...this.getCompilerOptions(),
            noDtsResolution: true,
            allowJs: true,
            maxNodeModuleJsDepth: 3,
            diagnostics: false,
            skipLibCheck: true,
            sourceMap: false,
            types: ts.emptyArray,
            lib: ts.emptyArray,
            noLib: true,
        };
    }
}

function getUnresolvedImports(program: ts.Program, cachedUnresolvedImportsPerFile: ts.ESMap<ts.Path, readonly string[]>): ts.SortedReadonlyArray<string> {
    const sourceFiles = program.getSourceFiles();
    ts.tracing?.push(ts.tracing.Phase.Session, "getUnresolvedImports", { count: sourceFiles.length });
    const ambientModules = program.getTypeChecker().getAmbientModules().map(mod => ts.stripQuotes(mod.getName()));
    const result = ts.sortAndDeduplicate(ts.flatMap(sourceFiles, sourceFile =>
        extractUnresolvedImportsFromSourceFile(sourceFile, ambientModules, cachedUnresolvedImportsPerFile)));
    ts.tracing?.pop();
    return result;
}
function extractUnresolvedImportsFromSourceFile(file: ts.SourceFile, ambientModules: readonly string[], cachedUnresolvedImportsPerFile: ts.ESMap<ts.Path, readonly string[]>): readonly string[] {
    return ts.getOrUpdate(cachedUnresolvedImportsPerFile, file.path, () => {
        if (!file.resolvedModules) return ts.server.emptyArray;
        let unresolvedImports: string[] | undefined;
        file.resolvedModules.forEach((resolvedModule, name) => {
            // pick unresolved non-relative names
            if ((!resolvedModule || !ts.resolutionExtensionIsTSOrJson(resolvedModule.extension)) &&
                !ts.isExternalModuleNameRelative(name) &&
                !ambientModules.some(m => m === name)) {
                unresolvedImports = ts.append(unresolvedImports, ts.parsePackageName(name).packageName);
            }
        });
        return unresolvedImports || ts.server.emptyArray;
    });
}

/**
 * If a file is opened and no tsconfig (or jsconfig) is found,
 * the file and its imports/references are put into an InferredProject.
 */
export class InferredProject extends Project {
    private _isJsInferredProject = false;

    toggleJsInferredProject(isJsInferredProject: boolean) {
        if (isJsInferredProject !== this._isJsInferredProject) {
            this._isJsInferredProject = isJsInferredProject;
            this.setCompilerOptions();
        }
    }

    setCompilerOptions(options?: ts.CompilerOptions) {
        // Avoid manipulating the given options directly
        if (!options && !this.getCompilationSettings()) {
            return;
        }
        const newOptions = ts.cloneCompilerOptions(options || this.getCompilationSettings());
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
        projectService: ts.server.ProjectService,
        documentRegistry: ts.DocumentRegistry,
        compilerOptions: ts.CompilerOptions,
        watchOptions: ts.WatchOptions | undefined,
        projectRootPath: ts.server.NormalizedPath | undefined,
        currentDirectory: string | undefined,
        pluginConfigOverrides: ts.ESMap<string, any> | undefined,
        typeAcquisition: ts.TypeAcquisition | undefined) {
        super(projectService.newInferredProjectName(),
            ProjectKind.Inferred,
            projectService,
            documentRegistry,
            // TODO: GH#18217
            /*files*/ undefined!,
            /*lastFileExceededProgramSize*/ undefined,
            compilerOptions,
            /*compileOnSaveEnabled*/ false,
            watchOptions,
            projectService.host,
            currentDirectory);
        this.typeAcquisition = typeAcquisition;
        this.projectRootPath = projectRootPath && projectService.toCanonicalFileName(projectRootPath);
        if (!projectRootPath && !projectService.useSingleInferredProject) {
            this.canonicalCurrentDirectory = projectService.toCanonicalFileName(this.currentDirectory);
        }
        this.enableGlobalPlugins(this.getCompilerOptions(), pluginConfigOverrides);
    }

    addRoot(info: ts.server.ScriptInfo) {
        ts.Debug.assert(info.isScriptOpen());
        this.projectService.startWatchingConfigFilesForInferredProjectRoot(info);
        if (!this._isJsInferredProject && info.isJavaScript()) {
            this.toggleJsInferredProject(/*isJsInferredProject*/ true);
        }
        super.addRoot(info);
    }

    removeRoot(info: ts.server.ScriptInfo) {
        this.projectService.stopWatchingConfigFilesForInferredProjectRoot(info);
        super.removeRoot(info);
        if (this._isJsInferredProject && info.isJavaScript()) {
            if (ts.every(this.getRootScriptInfos(), rootInfo => !rootInfo.isJavaScript())) {
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
        ts.forEach(this.getRootScriptInfos(), info => this.projectService.stopWatchingConfigFilesForInferredProjectRoot(info));
        super.close();
    }

    getTypeAcquisition(): ts.TypeAcquisition {
        return this.typeAcquisition || {
            enable: allRootFilesAreJsOrDts(this),
            include: ts.emptyArray,
            exclude: ts.emptyArray
        };
    }
}

class AuxiliaryProject extends Project {
    constructor(projectService: ts.server.ProjectService, documentRegistry: ts.DocumentRegistry, compilerOptions: ts.CompilerOptions) {
        super(projectService.newAuxiliaryProjectName(),
            ProjectKind.Auxiliary,
            projectService,
            documentRegistry,
            /*hasExplicitListOfFiles*/ false,
            /*lastFileExceededProgramSize*/ undefined,
            compilerOptions,
            /*compileOnSaveEnabled*/ false,
            /*watchOptions*/ undefined,
            projectService.host,
            /*currentDirectory*/ undefined);
    }

    isOrphan(): boolean {
        return true;
    }

    /*@internal*/
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void {
        // Invalidation will happen on-demand as part of updateGraph
        return;
    }
}

export class AutoImportProviderProject extends Project {
    /*@internal*/
    private static readonly maxDependencies = 10;

    /*@internal*/
    static getRootFileNames(dependencySelection: ts.PackageJsonAutoImportPreference, hostProject: Project, moduleResolutionHost: ts.ModuleResolutionHost, compilerOptions: ts.CompilerOptions): string[] {
        if (!dependencySelection) {
            return ts.emptyArray;
        }

        const program = hostProject.getCurrentProgram();
        if (!program) {
            return ts.emptyArray;
        }

        const start = ts.timestamp();
        let dependencyNames: ts.Set<string> | undefined;
        let rootNames: string[] | undefined;
        const rootFileName = ts.combinePaths(hostProject.currentDirectory, ts.inferredTypesContainingFile);
        const packageJsons = hostProject.getPackageJsonsForAutoImport(ts.combinePaths(hostProject.currentDirectory, rootFileName));
        for (const packageJson of packageJsons) {
            packageJson.dependencies?.forEach((_, dependenyName) => addDependency(dependenyName));
            packageJson.peerDependencies?.forEach((_, dependencyName) => addDependency(dependencyName));
        }

        let dependenciesAdded = 0;
        if (dependencyNames) {
            const symlinkCache = hostProject.getSymlinkCache();
            for (const name of ts.arrayFrom(dependencyNames.keys())) {
                // Avoid creating a large project that would significantly slow down time to editor interactivity
                if (dependencySelection === ts.PackageJsonAutoImportPreference.Auto && dependenciesAdded > this.maxDependencies) {
                    hostProject.log(`AutoImportProviderProject: attempted to add more than ${this.maxDependencies} dependencies. Aborting.`);
                    return ts.emptyArray;
                }

                // 1. Try to load from the implementation package. For many dependencies, the
                //    package.json will exist, but the package will not contain any typings,
                //    so `entrypoints` will be undefined. In that case, or if the dependency
                //    is missing altogether, we will move on to trying the @types package (2).
                const packageJson = ts.resolvePackageNameToPackageJson(
                    name,
                    hostProject.currentDirectory,
                    compilerOptions,
                    moduleResolutionHost,
                    program.getModuleResolutionCache());
                if (packageJson) {
                    const entrypoints = getRootNamesFromPackageJson(packageJson, program, symlinkCache);
                    if (entrypoints) {
                        rootNames = ts.concatenate(rootNames, entrypoints);
                        dependenciesAdded += entrypoints.length ? 1 : 0;
                        continue;
                    }
                }

                // 2. Try to load from the @types package in the tree and in the global
                //    typings cache location, if enabled.
                const done = ts.forEach([hostProject.currentDirectory, hostProject.getGlobalTypingsCacheLocation()], directory => {
                    if (directory) {
                        const typesPackageJson = ts.resolvePackageNameToPackageJson(
                            `@types/${name}`,
                            directory,
                            compilerOptions,
                            moduleResolutionHost,
                            program.getModuleResolutionCache());
                        if (typesPackageJson) {
                            const entrypoints = getRootNamesFromPackageJson(typesPackageJson, program, symlinkCache);
                            rootNames = ts.concatenate(rootNames, entrypoints);
                            dependenciesAdded += entrypoints?.length ? 1 : 0;
                            return true;
                        }
                    }
                });

                if (done) continue;

                // 3. If the @types package did not exist and the user has settings that
                //    allow processing JS from node_modules, go back to the implementation
                //    package and load the JS.
                if (packageJson && compilerOptions.allowJs && compilerOptions.maxNodeModuleJsDepth) {
                    const entrypoints = getRootNamesFromPackageJson(packageJson, program, symlinkCache, /*allowJs*/ true);
                    rootNames = ts.concatenate(rootNames, entrypoints);
                    dependenciesAdded += entrypoints?.length ? 1 : 0;
                }
            }
        }

        if (rootNames?.length) {
            hostProject.log(`AutoImportProviderProject: found ${rootNames.length} root files in ${dependenciesAdded} dependencies in ${ts.timestamp() - start} ms`);
        }
        return rootNames || ts.emptyArray;

        function addDependency(dependency: string) {
            if (!ts.startsWith(dependency, "@types/")) {
                (dependencyNames || (dependencyNames = new ts.Set())).add(dependency);
            }
        }

        function getRootNamesFromPackageJson(packageJson: ts.PackageJsonInfo, program: ts.Program, symlinkCache: ts.SymlinkCache, resolveJs?: boolean) {
            const entrypoints = ts.getEntrypointsFromPackageJsonInfo(
                packageJson,
                compilerOptions,
                moduleResolutionHost,
                program.getModuleResolutionCache(),
                resolveJs);
            if (entrypoints) {
                const real = moduleResolutionHost.realpath?.(packageJson.packageDirectory);
                const isSymlink = real && real !== packageJson.packageDirectory;
                if (isSymlink) {
                    symlinkCache.setSymlinkedDirectory(packageJson.packageDirectory, {
                        real,
                        realPath: hostProject.toPath(real),
                    });
                }

                return ts.mapDefined(entrypoints, entrypoint => {
                    const resolvedFileName = isSymlink ? entrypoint.replace(packageJson.packageDirectory, real) : entrypoint;
                    if (!program.getSourceFile(resolvedFileName) && !(isSymlink && program.getSourceFile(entrypoint))) {
                        return resolvedFileName;
                    }
                });
            }
        }
    }

    /*@internal*/
    static readonly compilerOptionsOverrides: ts.CompilerOptions = {
        diagnostics: false,
        skipLibCheck: true,
        sourceMap: false,
        types: ts.emptyArray,
        lib: ts.emptyArray,
        noLib: true,
    };

    /*@internal*/
    static create(dependencySelection: ts.PackageJsonAutoImportPreference, hostProject: Project, moduleResolutionHost: ts.ModuleResolutionHost, documentRegistry: ts.DocumentRegistry): AutoImportProviderProject | undefined {
        if (dependencySelection === ts.PackageJsonAutoImportPreference.Off) {
            return undefined;
        }

        const compilerOptions = {
            ...hostProject.getCompilerOptions(),
            ...this.compilerOptionsOverrides,
        };

        const rootNames = this.getRootFileNames(dependencySelection, hostProject, moduleResolutionHost, compilerOptions);
        if (!rootNames.length) {
            return undefined;
        }

        return new AutoImportProviderProject(hostProject, rootNames, documentRegistry, compilerOptions);
    }

    private rootFileNames: string[] | undefined;

    /*@internal*/
    constructor(
        private hostProject: Project,
        initialRootNames: string[],
        documentRegistry: ts.DocumentRegistry,
        compilerOptions: ts.CompilerOptions,
    ) {
        super(hostProject.projectService.newAutoImportProviderProjectName(),
            ProjectKind.AutoImportProvider,
            hostProject.projectService,
            documentRegistry,
            /*hasExplicitListOfFiles*/ false,
            /*lastFileExceededProgramSize*/ undefined,
            compilerOptions,
            /*compileOnSaveEnabled*/ false,
            hostProject.getWatchOptions(),
            hostProject.projectService.host,
            hostProject.currentDirectory);

        this.rootFileNames = initialRootNames;
        this.useSourceOfProjectReferenceRedirect = ts.maybeBind(this.hostProject, this.hostProject.useSourceOfProjectReferenceRedirect);
        this.getParsedCommandLine = ts.maybeBind(this.hostProject, this.hostProject.getParsedCommandLine);
    }

    /*@internal*/
    isEmpty() {
        return !ts.some(this.rootFileNames);
    }

    isOrphan() {
        return true;
    }

    updateGraph() {
        let rootFileNames = this.rootFileNames;
        if (!rootFileNames) {
            rootFileNames = AutoImportProviderProject.getRootFileNames(
                this.hostProject.includePackageJsonAutoImports(),
                this.hostProject,
                this.hostProject.getModuleResolutionHostForAutoImportProvider(),
                this.getCompilationSettings());
        }

        this.projectService.setFileNamesOfAutoImportProviderProject(this, rootFileNames);
        this.rootFileNames = rootFileNames;
        const oldProgram = this.getCurrentProgram();
        const hasSameSetOfFiles = super.updateGraph();
        if (oldProgram && oldProgram !== this.getCurrentProgram()) {
            this.hostProject.clearCachedExportInfoMap();
        }
        return hasSameSetOfFiles;
    }

    /*@internal*/
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void {
        // Invalidation will happen on-demand as part of updateGraph
        return;
    }

    hasRoots() {
        return !!this.rootFileNames?.length;
    }

    markAsDirty() {
        this.rootFileNames = undefined;
        super.markAsDirty();
    }

    getScriptFileNames() {
        return this.rootFileNames || ts.emptyArray;
    }

    getLanguageService(): never {
        throw new Error("AutoImportProviderProject language service should never be used. To get the program, use `project.getCurrentProgram()`.");
    }

    /*@internal*/
    onAutoImportProviderSettingsChanged(): never {
        throw new Error("AutoImportProviderProject is an auto import provider; use `markAsDirty()` instead.");
    }

    /*@internal*/
    onPackageJsonChange(): never {
        throw new Error("package.json changes should be notified on an AutoImportProvider's host project");
    }

    getModuleResolutionHostForAutoImportProvider(): never {
        throw new Error("AutoImportProviderProject cannot provide its own host; use `hostProject.getModuleResolutionHostForAutomImportProvider()` instead.");
    }

    getProjectReferences() {
        return this.hostProject.getProjectReferences();
    }

    /*@internal*/
    includePackageJsonAutoImports() {
        return ts.PackageJsonAutoImportPreference.Off;
    }

    getTypeAcquisition(): ts.TypeAcquisition {
        return { enable: false };
    }

    /*@internal*/
    getSymlinkCache() {
        return this.hostProject.getSymlinkCache();
    }

    /*@internal*/
    getModuleResolutionCache() {
        return this.hostProject.getCurrentProgram()?.getModuleResolutionCache();
    }
}

/**
 * If a file is opened, the server will look for a tsconfig (or jsconfig)
 * and if successful create a ConfiguredProject for it.
 * Otherwise it will create an InferredProject.
 */
export class ConfiguredProject extends Project {
    /* @internal */
    pendingReload: ts.ConfigFileProgramReloadLevel | undefined;
    /* @internal */
    pendingReloadReason: string | undefined;

    /* @internal */
    openFileWatchTriggered = new ts.Map<string, ts.ConfigFileProgramReloadLevel>();

    /*@internal*/
    canConfigFileJsonReportNoInputFiles = false;

    /** Ref count to the project when opened from external project */
    private externalProjectRefCount = 0;

    private projectReferences: readonly ts.ProjectReference[] | undefined;

    /** Potential project references before the project is actually loaded (read config file) */
    /*@internal*/
    potentialProjectReferences: ts.Set<string> | undefined;

    /*@internal*/
    projectOptions?: ts.server.ProjectOptions | true;

    /*@internal*/
    isInitialLoadPending: () => boolean = ts.returnTrue;

    /*@internal*/
    sendLoadingProjectFinish = false;

    /*@internal*/
    private compilerHost?: ts.CompilerHost;

    /*@internal*/
    constructor(configFileName: ts.server.NormalizedPath,
        readonly canonicalConfigFilePath: ts.server.NormalizedPath,
        projectService: ts.server.ProjectService,
        documentRegistry: ts.DocumentRegistry,
        cachedDirectoryStructureHost: ts.CachedDirectoryStructureHost) {
        super(configFileName,
            ProjectKind.Configured,
            projectService,
            documentRegistry,
            /*hasExplicitListOfFiles*/ false,
            /*lastFileExceededProgramSize*/ undefined,
            /*compilerOptions*/ {},
            /*compileOnSaveEnabled*/ false,
            /*watchOptions*/ undefined,
            cachedDirectoryStructureHost,
            ts.getDirectoryPath(configFileName)
        );
    }

    /* @internal */
    setCompilerHost(host: ts.CompilerHost) {
        this.compilerHost = host;
    }

    /* @internal */
    getCompilerHost(): ts.CompilerHost | undefined {
        return this.compilerHost;
    }

    /* @internal */
    useSourceOfProjectReferenceRedirect() {
        return this.languageServiceEnabled;
    }

    /* @internal */
    getParsedCommandLine(fileName: string) {
        const configFileName = ts.server.asNormalizedPath(ts.normalizePath(fileName));
        const canonicalConfigFilePath = ts.server.asNormalizedPath(this.projectService.toCanonicalFileName(configFileName));
        // Ensure the config file existience info is cached
        let configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        if (!configFileExistenceInfo) {
            this.projectService.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo = { exists: this.projectService.host.fileExists(configFileName) });
        }
        // Ensure we have upto date parsed command line
        this.projectService.ensureParsedConfigUptoDate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, this);
        // Watch wild cards if LS is enabled
        if (this.languageServiceEnabled && this.projectService.serverMode === ts.LanguageServiceMode.Semantic) {
            this.projectService.watchWildcards(configFileName, configFileExistenceInfo, this);
        }
        return configFileExistenceInfo.exists ? configFileExistenceInfo.config!.parsedCommandLine : undefined;
    }

    /* @internal */
    onReleaseParsedCommandLine(fileName: string) {
        this.releaseParsedConfig(ts.server.asNormalizedPath(this.projectService.toCanonicalFileName(ts.server.asNormalizedPath(ts.normalizePath(fileName)))));
    }

    /* @internal */
    private releaseParsedConfig(canonicalConfigFilePath: ts.server.NormalizedPath) {
        this.projectService.stopWatchingWildCards(canonicalConfigFilePath, this);
        this.projectService.releaseParsedConfig(canonicalConfigFilePath, this);
    }

    /**
     * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean {
        const isInitialLoad = this.isInitialLoadPending();
        this.isInitialLoadPending = ts.returnFalse;
        const reloadLevel = this.pendingReload;
        this.pendingReload = ts.ConfigFileProgramReloadLevel.None;
        let result: boolean;
        switch (reloadLevel) {
            case ts.ConfigFileProgramReloadLevel.Partial:
                this.openFileWatchTriggered.clear();
                result = this.projectService.reloadFileNamesOfConfiguredProject(this);
                break;
            case ts.ConfigFileProgramReloadLevel.Full:
                this.openFileWatchTriggered.clear();
                const reason = ts.Debug.checkDefined(this.pendingReloadReason);
                this.pendingReloadReason = undefined;
                this.projectService.reloadConfiguredProject(this, reason, isInitialLoad, /*clearSemanticCache*/ false);
                result = true;
                break;
            default:
                result = super.updateGraph();
        }
        this.compilerHost = undefined;
        this.projectService.sendProjectLoadingFinishEvent(this);
        this.projectService.sendProjectTelemetry(this);
        return result;
    }

    /*@internal*/
    getCachedDirectoryStructureHost() {
        return this.directoryStructureHost as ts.CachedDirectoryStructureHost;
    }

    getConfigFilePath() {
        return ts.server.asNormalizedPath(this.getProjectName());
    }

    getProjectReferences(): readonly ts.ProjectReference[] | undefined {
        return this.projectReferences;
    }

    updateReferences(refs: readonly ts.ProjectReference[] | undefined) {
        this.projectReferences = refs;
        this.potentialProjectReferences = undefined;
    }

    /*@internal*/
    setPotentialProjectReference(canonicalConfigPath: ts.server.NormalizedPath) {
        ts.Debug.assert(this.isInitialLoadPending());
        (this.potentialProjectReferences || (this.potentialProjectReferences = new ts.Set())).add(canonicalConfigPath);
    }

    /*@internal*/
    getResolvedProjectReferenceToRedirect(fileName: string): ts.ResolvedProjectReference | undefined {
        const program = this.getCurrentProgram();
        return program && program.getResolvedProjectReferenceToRedirect(fileName);
    }

    /*@internal*/
    forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ts.ResolvedProjectReference) => T | undefined
    ): T | undefined {
        return this.getCurrentProgram()?.forEachResolvedProjectReference(cb);
    }

    /*@internal*/
    enablePluginsWithOptions(options: ts.CompilerOptions, pluginConfigOverrides: ts.ESMap<string, any> | undefined): void {
        this.plugins.length = 0;
        if (!options.plugins?.length && !this.projectService.globalPlugins.length) return;
        const host = this.projectService.host;
        if (!host.require && !host.importPlugin) {
            this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
            return;
        }

        const searchPaths = this.getGlobalPluginSearchPaths();
        if (this.projectService.allowLocalPluginLoads) {
            const local = ts.getDirectoryPath(this.canonicalConfigFilePath);
            this.projectService.logger.info(`Local plugin loading enabled; adding ${local} to search paths`);
            searchPaths.unshift(local);
        }

        // Enable tsconfig-specified plugins
        if (options.plugins) {
            for (const pluginConfigEntry of options.plugins) {
                this.enablePlugin(pluginConfigEntry, searchPaths, pluginConfigOverrides);
            }
        }

        return this.enableGlobalPlugins(options, pluginConfigOverrides);
    }

    /**
     * Get the errors that dont have any file name associated
     */
    getGlobalProjectErrors(): readonly ts.Diagnostic[] {
        return ts.filter(this.projectErrors, diagnostic => !diagnostic.file) || ts.server.emptyArray;
    }

    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly ts.Diagnostic[] {
        return this.projectErrors || ts.server.emptyArray;
    }

    setProjectErrors(projectErrors: ts.Diagnostic[]) {
        this.projectErrors = projectErrors;
    }

    close() {
        this.projectService.configFileExistenceInfoCache.forEach((_configFileExistenceInfo, canonicalConfigFilePath) =>
            this.releaseParsedConfig(canonicalConfigFilePath));
        this.projectErrors = undefined;
        this.openFileWatchTriggered.clear();
        this.compilerHost = undefined;
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

    /* @internal */
    isSolution() {
        return this.getRootFilesMap().size === 0 &&
            !this.canConfigFileJsonReportNoInputFiles;
    }

    /* @internal */
    /** Find the configured project from the project references in project which contains the info directly */
    getDefaultChildProjectFromProjectWithReferences(info: ts.server.ScriptInfo) {
        return ts.server.forEachResolvedProjectReferenceProject(
            this,
            info.path,
            child => ts.server.projectContainsInfoDirectly(child, info) ?
                child :
                undefined,
            ts.server.ProjectReferenceProjectLoadKind.Find
        );
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

        const configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(this.canonicalConfigFilePath)!;
        if (this.projectService.hasPendingProjectUpdate(this)) {
            // If there is pending update for this project,
            // we dont know if this project would be needed by any of the open files impacted by this config file
            // In that case keep the project alive if there are open files impacted by this project
            return !!configFileExistenceInfo.openFilesImpactedByConfigFile?.size;
        }

        // If there is no pending update for this project,
        // We know exact set of open files that get impacted by this configured project as the files in the project
        // The project is referenced only if open files impacted by this project are present in this project
        return !!configFileExistenceInfo.openFilesImpactedByConfigFile && ts.forEachEntry(
            configFileExistenceInfo.openFilesImpactedByConfigFile,
            (_value, infoPath) => {
                const info = this.projectService.getScriptInfoForPath(infoPath)!;
                return this.containsScriptInfo(info) ||
                    !!ts.server.forEachResolvedProjectReferenceProject(
                        this,
                        info.path,
                        child => child.containsScriptInfo(info),
                        ts.server.ProjectReferenceProjectLoadKind.Find
                    );
            }
        ) || false;
    }

    /*@internal*/
    hasExternalProjectRef() {
        return !!this.externalProjectRefCount;
    }

    getEffectiveTypeRoots() {
        return ts.getEffectiveTypeRoots(this.getCompilationSettings(), this.directoryStructureHost) || [];
    }

    /*@internal*/
    updateErrorOnNoInputFiles(fileNames: string[]) {
        ts.updateErrorForNoInputFiles(fileNames, this.getConfigFilePath(), this.getCompilerOptions().configFile!.configFileSpecs!, this.projectErrors!, this.canConfigFileJsonReportNoInputFiles);
    }
}

/**
 * Project whose configuration is handled externally, such as in a '.csproj'.
 * These are created only if a host explicitly calls `openExternalProject`.
 */
export class ExternalProject extends Project {
    excludedFiles: readonly ts.server.NormalizedPath[] = [];
    /*@internal*/
    constructor(public externalProjectName: string,
        projectService: ts.server.ProjectService,
        documentRegistry: ts.DocumentRegistry,
        compilerOptions: ts.CompilerOptions,
        lastFileExceededProgramSize: string | undefined,
        public compileOnSaveEnabled: boolean,
        projectFilePath?: string,
        pluginConfigOverrides?: ts.ESMap<string, any>,
        watchOptions?: ts.WatchOptions) {
        super(externalProjectName,
            ProjectKind.External,
            projectService,
            documentRegistry,
            /*hasExplicitListOfFiles*/ true,
            lastFileExceededProgramSize,
            compilerOptions,
            compileOnSaveEnabled,
            watchOptions,
            projectService.host,
            ts.getDirectoryPath(projectFilePath || ts.normalizeSlashes(externalProjectName)));
        this.enableGlobalPlugins(this.getCompilerOptions(), pluginConfigOverrides);
    }

    updateGraph() {
        const result = super.updateGraph();
        this.projectService.sendProjectTelemetry(this);
        return result;
    }

    getExcludedFiles() {
        return this.excludedFiles;
    }
}

/* @internal */
export function isInferredProject(project: Project): project is InferredProject {
    return project.projectKind === ProjectKind.Inferred;
}

/* @internal */
export function isConfiguredProject(project: Project): project is ConfiguredProject {
    return project.projectKind === ProjectKind.Configured;
}

/* @internal */
export function isExternalProject(project: Project): project is ExternalProject {
    return project.projectKind === ProjectKind.External;
}
}

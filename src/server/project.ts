import * as ts from "./_namespaces/ts.js";
import {
    addRange,
    append,
    ApplyCodeActionCommandResult,
    arrayFrom,
    arrayIsEqualTo,
    arrayToMap,
    BuilderState,
    CachedDirectoryStructureHost,
    changeExtension,
    changesAffectModuleResolution,
    clearMap,
    cloneCompilerOptions,
    closeFileWatcher,
    closeFileWatcherOf,
    combinePaths,
    comparePaths,
    CompilerHost,
    CompilerOptions,
    containsPath,
    createCacheableExportInfoMap,
    createLanguageService,
    createResolutionCache,
    createSymlinkCache,
    Debug,
    Diagnostic,
    directorySeparator,
    DirectoryStructureHost,
    DirectoryWatcherCallback,
    DocumentPositionMapper,
    DocumentRegistry,
    ensureTrailingDirectorySeparator,
    enumerateInsertsAndDeletes,
    every,
    explainFiles,
    ExportInfoMap,
    Extension,
    fileExtensionIs,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    FileWatcherEventKind,
    filter,
    flatMap,
    forEach,
    forEachEntry,
    forEachKey,
    generateDjb2Hash,
    getAllowJSCompilerOption,
    getAutomaticTypeDirectiveNames,
    getBaseFileName,
    GetCanonicalFileName,
    getCommonSourceDirectoryOfConfig,
    getDeclarationEmitOutputFilePathWorker,
    getDefaultCompilerOptions,
    getDefaultLibFileName,
    getDefaultLibFilePath,
    getDirectoryPath,
    getEffectiveTypeRoots,
    getEmitDeclarations,
    getEntrypointsFromPackageJsonInfo,
    getNormalizedAbsolutePath,
    getOrUpdate,
    getOutputDeclarationFileName,
    GetPackageJsonEntrypointsHost,
    getStringComparer,
    HasInvalidatedLibResolutions,
    HasInvalidatedResolutions,
    HostCancellationToken,
    inferredTypesContainingFile,
    InstallPackageOptions,
    IScriptSnapshot,
    isDeclarationFileName,
    isExternalModuleNameRelative,
    isInsideNodeModules,
    JSDocParsingMode,
    JsTyping,
    LanguageService,
    LanguageServiceHost,
    LanguageServiceMode,
    map,
    mapDefined,
    maybeBind,
    memoize,
    ModuleResolutionCache,
    ModuleResolutionHost,
    noop,
    noopFileWatcher,
    normalizePath,
    normalizeSlashes,
    PackageJsonAutoImportPreference,
    PackageJsonInfo,
    ParsedCommandLine,
    parsePackageName,
    Path,
    PerformanceEvent,
    PluginImport,
    PollingInterval,
    Program,
    ProgramUpdateLevel,
    ProjectPackageJsonInfo,
    ProjectReference,
    removeFileExtension,
    ResolutionCache,
    resolutionExtensionIsTSOrJson,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    resolvePackageNameToPackageJson,
    returnFalse,
    returnTrue,
    ScriptKind,
    some,
    sortAndDeduplicate,
    SortedReadonlyArray,
    SourceFile,
    SourceMapper,
    startsWith,
    StringLiteralLike,
    stripQuotes,
    StructureIsReused,
    SymlinkCache,
    ThrottledCancellationToken,
    timestamp,
    toPath,
    toSorted,
    tracing,
    TypeAcquisition,
    updateErrorForNoInputFiles,
    updateMissingFilePathsWatch,
    WatchDirectoryFlags,
    WatchOptions,
    WatchType,
} from "./_namespaces/ts.js";
import {
    ActionInvalidate,
    asNormalizedPath,
    createModuleSpecifierCache,
    emptyArray,
    Errors,
    FileStats,
    LogLevel,
    ModuleImportResult,
    Msg,
    NormalizedPath,
    nullTypingsInstaller,
    PackageJsonWatcher,
    ProjectOptions,
    ProjectService,
    ScriptInfo,
    ServerHost,
    Session,
    toNormalizedPath,
    updateProjectIfDirty,
} from "./_namespaces/ts.server.js";
import * as protocol from "./protocol.js";

export enum ProjectKind {
    Inferred,
    Configured,
    External,
    AutoImportProvider,
    Auxiliary,
}

/** @internal */
export type Mutable<T> = { -readonly [K in keyof T]: T[K]; };

/** @internal */
export function countEachFileTypes(infos: ScriptInfo[], includeSizes = false): FileStats {
    const result: Mutable<FileStats> = {
        js: 0,
        jsSize: 0,
        jsx: 0,
        jsxSize: 0,
        ts: 0,
        tsSize: 0,
        tsx: 0,
        tsxSize: 0,
        dts: 0,
        dtsSize: 0,
        deferred: 0,
        deferredSize: 0,
    };
    for (const info of infos) {
        const fileSize = includeSizes ? info.textStorage.getTelemetryFileSize() : 0;
        switch (info.scriptKind) {
            case ScriptKind.JS:
                result.js += 1;
                result.jsSize! += fileSize;
                break;
            case ScriptKind.JSX:
                result.jsx += 1;
                result.jsxSize! += fileSize;
                break;
            case ScriptKind.TS:
                if (isDeclarationFileName(info.fileName)) {
                    result.dts += 1;
                    result.dtsSize! += fileSize;
                }
                else {
                    result.ts += 1;
                    result.tsSize! += fileSize;
                }
                break;
            case ScriptKind.TSX:
                result.tsx += 1;
                result.tsxSize! += fileSize;
                break;
            case ScriptKind.Deferred:
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

/** @internal */
export function hasNoTypeScriptSource(fileNames: string[]): boolean {
    return !fileNames.some(fileName => (fileExtensionIs(fileName, Extension.Ts) && !isDeclarationFileName(fileName)) || fileExtensionIs(fileName, Extension.Tsx));
}

/** @internal */
export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
    projectErrors: readonly Diagnostic[];
}

export interface PluginCreateInfo {
    project: Project;
    languageService: LanguageService;
    languageServiceHost: LanguageServiceHost;
    serverHost: ServerHost;
    session?: Session<unknown>;
    config: any;
}

export interface PluginModule {
    create(createInfo: PluginCreateInfo): LanguageService;
    getExternalFiles?(proj: Project, updateLevel: ProgramUpdateLevel): string[];
    onConfigurationChanged?(config: any): void;
}

export interface PluginModuleWithName {
    name: string;
    module: PluginModule;
}

export type PluginModuleFactory = (mod: { typescript: typeof ts; }) => PluginModule;

/** @internal */
export interface PluginImportResult<T> {
    pluginConfigEntry: PluginImport;
    resolvedModule: T | undefined;
    errorLogs: string[] | undefined;
}

/** @internal */
export type BeginEnablePluginResult = PluginImportResult<PluginModuleFactory>;

/**
 * The project root can be script info - if root is present,
 * or it could be just normalized path if root wasn't present on the host(only for non inferred project)
 *
 * @internal
 */
export interface ProjectRootFile {
    fileName: NormalizedPath;
    info?: ScriptInfo;
}

interface GeneratedFileWatcher {
    generatedFilePath: Path;
    watcher: FileWatcher;
}
type GeneratedFileWatcherMap = GeneratedFileWatcher | Map<Path, GeneratedFileWatcher>;
function isGeneratedFileWatcher(watch: GeneratedFileWatcherMap): watch is GeneratedFileWatcher {
    return (watch as GeneratedFileWatcher).generatedFilePath !== undefined;
}

/** @internal */
export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: readonly Diagnostic[];
}

const enum TypingWatcherType {
    FileWatcher = "FileWatcher",
    DirectoryWatcher = "DirectoryWatcher",
}

type TypingWatchers = Map<Path, FileWatcher> & { isInvoked?: boolean; };

interface TypingsCacheEntry {
    readonly typeAcquisition: TypeAcquisition;
    readonly compilerOptions: CompilerOptions;
    readonly unresolvedImports: SortedReadonlyArray<string> | undefined;
}

function setIsEqualTo(arr1: string[] | undefined, arr2: string[] | undefined): boolean {
    if (arr1 === arr2) {
        return true;
    }
    if ((arr1 || emptyArray).length === 0 && (arr2 || emptyArray).length === 0) {
        return true;
    }
    const set = new Map<string, boolean>();
    let unique = 0;

    for (const v of arr1!) {
        if (set.get(v) !== true) {
            set.set(v, true);
            unique++;
        }
    }
    for (const v of arr2!) {
        const isSet = set.get(v);
        if (isSet === undefined) {
            return false;
        }
        if (isSet === true) {
            set.set(v, false);
            unique--;
        }
    }
    return unique === 0;
}

function typeAcquisitionChanged(opt1: TypeAcquisition, opt2: TypeAcquisition): boolean {
    return opt1.enable !== opt2.enable ||
        !setIsEqualTo(opt1.include, opt2.include) ||
        !setIsEqualTo(opt1.exclude, opt2.exclude);
}

function compilerOptionsChanged(opt1: CompilerOptions, opt2: CompilerOptions): boolean {
    // TODO: add more relevant properties
    return getAllowJSCompilerOption(opt1) !== getAllowJSCompilerOption(opt2);
}

function unresolvedImportsChanged(imports1: SortedReadonlyArray<string> | undefined, imports2: SortedReadonlyArray<string> | undefined): boolean {
    if (imports1 === imports2) {
        return false;
    }
    return !arrayIsEqualTo(imports1, imports2);
}

export abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
    private rootFilesMap = new Map<Path, ProjectRootFile>();
    private program: Program | undefined;
    private externalFiles: SortedReadonlyArray<string> | undefined;
    private missingFilesMap: Map<Path, FileWatcher> | undefined;
    private generatedFilesMap: GeneratedFileWatcherMap | undefined;

    /** @internal */
    protected readonly plugins: PluginModuleWithName[] = [];

    /**
     * This is map from files to unresolved imports in it
     * Maop does not contain entries for files that do not have unresolved imports
     * This helps in containing the set of files to invalidate
     *
     * @internal
     */
    cachedUnresolvedImportsPerFile = new Map<Path, readonly string[]>();

    /** @internal */
    lastCachedUnresolvedImportsList: SortedReadonlyArray<string> | undefined;
    private hasAddedorRemovedFiles = false;
    private hasAddedOrRemovedSymlinks = false;

    /** @internal */
    lastFileExceededProgramSize: string | undefined;

    // wrapper over the real language service that will suppress all semantic operations
    protected languageService: LanguageService;

    public languageServiceEnabled: boolean;

    readonly trace?: (s: string) => void;
    readonly realpath?: (path: string) => string;

    /** @internal */
    hasInvalidatedResolutions?: HasInvalidatedResolutions | undefined;

    /** @internal */
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions | undefined;

    /** @internal */
    resolutionCache: ResolutionCache;

    private builderState: BuilderState | undefined;
    /**
     * Set of files names that were updated since the last call to getChangesSinceVersion.
     */
    private updatedFileNames: Set<string> | undefined;
    /**
     * Set of files that was returned from the last call to getChangesSinceVersion.
     */
    private lastReportedFileNames: Map<string, boolean> | undefined;
    /**
     * Last version that was reported.
     */
    private lastReportedVersion = 0;
    /**
     * Current project's program version. (incremented everytime new program is created that is not complete reuse from the old one)
     * This property is changed in 'updateGraph' based on the set of files in program
     * @internal
     */
    projectProgramVersion = 0;
    /**
     * Current version of the project state. It is changed when:
     * - new root file was added/removed
     * - edit happen in some file that is currently included in the project.
     * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
     * @internal
     */
    projectStateVersion = 0;

    protected projectErrors: Diagnostic[] | undefined;

    protected isInitialLoadPending: () => boolean = returnFalse;

    /** @internal */
    dirty = false;

    /** @internal */
    typingFiles: SortedReadonlyArray<string> = emptyArray;

    private typingsCache: TypingsCacheEntry | undefined;

    private typingWatchers: TypingWatchers | undefined;

    /** @internal */
    originalConfiguredProjects: Set<NormalizedPath> | undefined;

    /** @internal */
    packageJsonWatches: Set<PackageJsonWatcher> | undefined;

    /** @internal */
    noDtsResolutionProject?: AuxiliaryProject | undefined;

    /** @internal */
    getResolvedProjectReferenceToRedirect(_fileName: string): ResolvedProjectReference | undefined {
        return undefined;
    }

    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /** @internal */ getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

    private readonly cancellationToken: ThrottledCancellationToken;

    public isNonTsProject() {
        updateProjectIfDirty(this);
        return allFilesAreJsOrDts(this);
    }

    public isJsOnlyProject() {
        updateProjectIfDirty(this);
        return hasOneOrMoreJsAndNoTsFiles(this);
    }

    public static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void): {} | undefined {
        return Project.importServicePluginSync({ name: moduleName }, [initialDir], host, log).resolvedModule;
    }

    /** @internal */
    public static importServicePluginSync<T = {}>(
        pluginConfigEntry: PluginImport,
        searchPaths: string[],
        host: ServerHost,
        log: (message: string) => void,
    ): PluginImportResult<T> {
        Debug.assertIsDefined(host.require);
        let errorLogs: string[] | undefined;
        let resolvedModule: T | undefined;
        for (const initialDir of searchPaths) {
            const resolvedPath = normalizeSlashes(host.resolvePath(combinePaths(initialDir, "node_modules")));
            log(`Loading ${pluginConfigEntry.name} from ${initialDir} (resolved to ${resolvedPath})`);
            const result = host.require(resolvedPath, pluginConfigEntry.name); // TODO: GH#18217
            if (!result.error) {
                resolvedModule = result.module as T;
                break;
            }
            const err = result.error.stack || result.error.message || JSON.stringify(result.error);
            (errorLogs ??= []).push(`Failed to load module '${pluginConfigEntry.name}' from ${resolvedPath}: ${err}`);
        }
        return { pluginConfigEntry, resolvedModule, errorLogs };
    }

    /** @internal */
    public static async importServicePluginAsync<T = {}>(
        pluginConfigEntry: PluginImport,
        searchPaths: string[],
        host: ServerHost,
        log: (message: string) => void,
    ): Promise<PluginImportResult<T>> {
        Debug.assertIsDefined(host.importPlugin);
        let errorLogs: string[] | undefined;
        let resolvedModule: T | undefined;
        for (const initialDir of searchPaths) {
            const resolvedPath = combinePaths(initialDir, "node_modules");
            log(`Dynamically importing ${pluginConfigEntry.name} from ${initialDir} (resolved to ${resolvedPath})`);
            let result: ModuleImportResult;
            try {
                result = await host.importPlugin(resolvedPath, pluginConfigEntry.name);
            }
            catch (e) {
                result = { module: undefined, error: e };
            }
            if (!result.error) {
                resolvedModule = result.module as T;
                break;
            }
            const err = result.error.stack || result.error.message || JSON.stringify(result.error);
            (errorLogs ??= []).push(`Failed to dynamically import module '${pluginConfigEntry.name}' from ${resolvedPath}: ${err}`);
        }
        return { pluginConfigEntry, resolvedModule, errorLogs };
    }

    /** @internal */
    readonly currentDirectory: string;

    /** @internal */
    readonly projectName: string;

    /** @internal */
    public directoryStructureHost: DirectoryStructureHost;

    /** @internal */
    public readonly getCanonicalFileName: GetCanonicalFileName;

    private exportMapCache: ExportInfoMap | undefined;
    private changedFilesForExportMapCache: Set<Path> | undefined;
    private moduleSpecifierCache = createModuleSpecifierCache(this);
    private symlinks: SymlinkCache | undefined;
    /** @internal */
    autoImportProviderHost: AutoImportProviderProject | false | undefined;
    /** @internal */
    protected typeAcquisition: TypeAcquisition | undefined;
    /** @internal */
    createHash = maybeBind(this.projectService.host, this.projectService.host.createHash);
    /** @internal*/ preferNonRecursiveWatch: boolean | undefined;

    readonly jsDocParsingMode: JSDocParsingMode | undefined;

    /** @internal */
    constructor(
        projectName: string,
        readonly projectKind: ProjectKind,
        readonly projectService: ProjectService,
        private documentRegistry: DocumentRegistry,
        hasExplicitListOfFiles: boolean,
        lastFileExceededProgramSize: string | undefined,
        private compilerOptions: CompilerOptions,
        public compileOnSaveEnabled: boolean,
        protected watchOptions: WatchOptions | undefined,
        directoryStructureHost: DirectoryStructureHost,
        currentDirectory: string,
    ) {
        this.projectName = projectName;
        this.directoryStructureHost = directoryStructureHost;
        this.currentDirectory = this.projectService.getNormalizedAbsolutePath(currentDirectory);
        this.getCanonicalFileName = this.projectService.toCanonicalFileName;
        this.jsDocParsingMode = this.projectService.jsDocParsingMode;

        this.cancellationToken = new ThrottledCancellationToken(this.projectService.cancellationToken, this.projectService.throttleWaitMilliseconds);
        if (!this.compilerOptions) {
            this.compilerOptions = getDefaultCompilerOptions();
            this.compilerOptions.allowNonTsExtensions = true;
            this.compilerOptions.allowJs = true;
        }
        else if (hasExplicitListOfFiles || getAllowJSCompilerOption(this.compilerOptions) || this.projectService.hasDeferredExtension()) {
            // If files are listed explicitly or allowJs is specified, allow all extensions
            this.compilerOptions.allowNonTsExtensions = true;
        }
        switch (projectService.serverMode) {
            case LanguageServiceMode.Semantic:
                this.languageServiceEnabled = true;
                break;
            case LanguageServiceMode.PartialSemantic:
                this.languageServiceEnabled = true;
                this.compilerOptions.noResolve = true;
                this.compilerOptions.types = [];
                break;
            case LanguageServiceMode.Syntactic:
                this.languageServiceEnabled = false;
                this.compilerOptions.noResolve = true;
                this.compilerOptions.types = [];
                break;
            default:
                Debug.assertNever(projectService.serverMode);
        }

        this.setInternalCompilerOptionsForEmittingJsFiles();
        const host = this.projectService.host;
        if (this.projectService.logger.loggingEnabled()) {
            this.trace = s => this.writeLog(s);
        }
        else if (host.trace) {
            this.trace = s => host.trace!(s);
        }
        this.realpath = maybeBind(host, host.realpath);
        this.preferNonRecursiveWatch = this.projectService.canUseWatchEvents || host.preferNonRecursiveWatch;

        // Use the current directory as resolution root only if the project created using current directory string
        this.resolutionCache = createResolutionCache(
            this,
            this.currentDirectory,
            /*logChangesWhenResolvingModule*/ true,
        );
        this.languageService = createLanguageService(this, this.documentRegistry, this.projectService.serverMode);
        if (lastFileExceededProgramSize) {
            this.disableLanguageService(lastFileExceededProgramSize);
        }
        this.markAsDirty();
        if (!isBackgroundProject(this)) {
            this.projectService.pendingEnsureProjectForOpenFiles = true;
        }
        this.projectService.onProjectCreation(this);
    }

    isKnownTypesPackageName(name: string): boolean {
        return this.projectService.typingsInstaller.isKnownTypesPackageName(name);
    }
    installPackage(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult> {
        return this.projectService.typingsInstaller.installPackage({ ...options, projectName: this.projectName, projectRootPath: this.toPath(this.currentDirectory) });
    }

    /** @internal */
    getGlobalTypingsCacheLocation() {
        return this.getGlobalCache();
    }

    /** @internal */
    getSymlinkCache(): SymlinkCache {
        if (!this.symlinks) {
            this.symlinks = createSymlinkCache(this.getCurrentDirectory(), this.getCanonicalFileName);
        }
        if (this.program && !this.symlinks.hasProcessedResolutions()) {
            this.symlinks.setSymlinksFromResolutions(
                this.program.forEachResolvedModule,
                this.program.forEachResolvedTypeReferenceDirective,
                this.program.getAutomaticTypeDirectiveResolutions(),
            );
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

    getProjectReferences(): readonly ProjectReference[] | undefined {
        return undefined;
    }

    getScriptFileNames() {
        if (!this.rootFilesMap.size) {
            return ts.emptyArray;
        }

        let result: string[] | undefined;
        this.rootFilesMap.forEach(value => {
            if (this.languageServiceEnabled || (value.info && value.info.isScriptOpen())) {
                // if language service is disabled - process only files that are open
                (result || (result = [])).push(value.fileName);
            }
        });

        return addRange(result, this.typingFiles) || ts.emptyArray;
    }

    private getOrCreateScriptInfoAndAttachToProject(fileName: string) {
        const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
            fileName,
            this.currentDirectory,
            this.directoryStructureHost,
            /*deferredDeleteOk*/ false,
        );
        if (scriptInfo) {
            const existingValue = this.rootFilesMap.get(scriptInfo.path);
            if (existingValue && existingValue.info !== scriptInfo) {
                // This was missing path earlier but now the file exists. Update the root
                existingValue.info = scriptInfo;
            }
            scriptInfo.attachToProject(this);
        }
        return scriptInfo;
    }

    getScriptKind(fileName: string) {
        const info = this.projectService.getScriptInfoForPath(this.toPath(fileName));
        return (info && info.scriptKind)!; // TODO: GH#18217
    }

    getScriptVersion(filename: string) {
        // Don't attach to the project if version is asked

        const info = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
            filename,
            this.currentDirectory,
            this.directoryStructureHost,
            /*deferredDeleteOk*/ false,
        );
        return (info && info.getLatestVersion())!; // TODO: GH#18217
    }

    getScriptSnapshot(filename: string): IScriptSnapshot | undefined {
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
        return !!this.projectService.getScriptInfoForPath(path) ||
            (!this.isWatchedMissingFile(path) && this.directoryStructureHost.fileExists(file));
    }

    /** @internal */
    resolveModuleNameLiterals(moduleLiterals: readonly StringLiteralLike[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, reusedNames: readonly StringLiteralLike[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[] {
        return this.resolutionCache.resolveModuleNameLiterals(moduleLiterals, containingFile, redirectedReference, options, containingSourceFile, reusedNames);
    }

    /** @internal */
    getModuleResolutionCache(): ModuleResolutionCache | undefined {
        return this.resolutionCache.getModuleResolutionCache();
    }

    /** @internal */
    resolveTypeReferenceDirectiveReferences<T extends string | FileReference>(typeDirectiveReferences: readonly T[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile | undefined, reusedNames: readonly T[] | undefined): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[] {
        return this.resolutionCache.resolveTypeReferenceDirectiveReferences(
            typeDirectiveReferences,
            containingFile,
            redirectedReference,
            options,
            containingSourceFile,
            reusedNames,
        );
    }

    /** @internal */
    resolveLibrary(libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string): ResolvedModuleWithFailedLookupLocations {
        return this.resolutionCache.resolveLibrary(libraryName, resolveFrom, options, libFileName);
    }

    directoryExists(path: string): boolean {
        return this.directoryStructureHost.directoryExists!(path); // TODO: GH#18217
    }

    getDirectories(path: string): string[] {
        return this.directoryStructureHost.getDirectories!(path); // TODO: GH#18217
    }

    /** @internal */
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost {
        return undefined!; // TODO: GH#18217
    }

    /** @internal */
    toPath(fileName: string) {
        return toPath(fileName, this.currentDirectory, this.projectService.toCanonicalFileName);
    }

    /** @internal */
    watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            WatchType.FailedLookupLocations,
            this,
        );
    }

    /** @internal */
    watchAffectingFileLocation(file: string, cb: FileWatcherCallback) {
        return this.projectService.watchFactory.watchFile(
            file,
            cb,
            PollingInterval.High,
            this.projectService.getWatchOptions(this),
            WatchType.AffectingFileLocation,
            this,
        );
    }

    /** @internal */
    clearInvalidateResolutionOfFailedLookupTimer() {
        return this.projectService.throttledOperations.cancel(`${this.getProjectName()}FailedLookupInvalidation`);
    }

    /** @internal */
    scheduleInvalidateResolutionsOfFailedLookupLocations() {
        this.projectService.throttledOperations.schedule(`${this.getProjectName()}FailedLookupInvalidation`, /*delay*/ 1000, () => {
            if (this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
                this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
            }
        });
    }

    /** @internal */
    invalidateResolutionsOfFailedLookupLocations() {
        if (
            this.clearInvalidateResolutionOfFailedLookupTimer() &&
            this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()
        ) {
            this.markAsDirty();
            this.projectService.delayEnsureProjectForOpenFiles();
        }
    }

    /** @internal */
    onInvalidatedResolution() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    /** @internal */
    watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            WatchType.TypeRoots,
            this,
        );
    }

    /** @internal */
    hasChangedAutomaticTypeDirectiveNames() {
        return this.resolutionCache.hasChangedAutomaticTypeDirectiveNames();
    }

    /** @internal */
    onChangedAutomaticTypeDirectiveNames() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    /** @internal */
    getGlobalCache() {
        return this.getTypeAcquisition().enable ? this.projectService.typingsInstaller.globalTypingsCacheLocation : undefined;
    }

    /** @internal */
    globalCacheResolutionModuleName = JsTyping.nonRelativeModuleNameForTypingCache;

    /** @internal */
    fileIsOpen(filePath: Path) {
        return this.projectService.openFiles.has(filePath);
    }

    /** @internal */
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
    getGlobalProjectErrors(): readonly Diagnostic[] {
        return filter(this.projectErrors, diagnostic => !diagnostic.file) || emptyArray;
    }

    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly Diagnostic[] {
        return this.projectErrors || emptyArray;
    }

    setProjectErrors(projectErrors: Diagnostic[] | undefined) {
        this.projectErrors = projectErrors;
    }

    getLanguageService(ensureSynchronized = true): LanguageService {
        if (ensureSynchronized) {
            updateProjectIfDirty(this);
        }
        return this.languageService;
    }

    /** @internal */
    getSourceMapper(): SourceMapper {
        return this.getLanguageService().getSourceMapper();
    }

    /** @internal */
    clearSourceMapperCache() {
        this.languageService.clearSourceMapperCache();
    }

    /** @internal */
    getDocumentPositionMapper(generatedFileName: string, sourceFileName?: string): DocumentPositionMapper | undefined {
        return this.projectService.getDocumentPositionMapper(this, generatedFileName, sourceFileName);
    }

    /** @internal */
    getSourceFileLike(fileName: string) {
        return this.projectService.getSourceFileLike(fileName, this);
    }

    /** @internal */
    shouldEmitFile(scriptInfo: ScriptInfo | undefined) {
        return scriptInfo &&
            !scriptInfo.isDynamicOrHasMixedContent() &&
            !this.program!.isSourceOfProjectReferenceRedirect(scriptInfo.path);
    }

    getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[] {
        if (!this.languageServiceEnabled) {
            return [];
        }
        updateProjectIfDirty(this);
        this.builderState = BuilderState.create(this.program!, this.builderState, /*disableUseFileVersionAsSignature*/ true);
        return mapDefined(
            BuilderState.getFilesAffectedBy(
                this.builderState,
                this.program!,
                scriptInfo.path,
                this.cancellationToken,
                this.projectService.host,
            ),
            sourceFile => this.shouldEmitFile(this.projectService.getScriptInfoForPath(sourceFile.path)) ? sourceFile.fileName : undefined,
        );
    }

    /**
     * Returns true if emit was conducted
     */
    emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): EmitResult {
        if (!this.languageServiceEnabled || !this.shouldEmitFile(scriptInfo)) {
            return { emitSkipped: true, diagnostics: emptyArray };
        }
        const { emitSkipped, diagnostics, outputFiles } = this.getLanguageService().getEmitOutput(scriptInfo.fileName);
        if (!emitSkipped) {
            for (const outputFile of outputFiles) {
                const outputFileAbsoluteFileName = getNormalizedAbsolutePath(outputFile.name, this.currentDirectory);
                writeFile(outputFileAbsoluteFileName, outputFile.text, outputFile.writeByteOrderMark);
            }

            // Update the signature
            if (this.builderState && getEmitDeclarations(this.compilerOptions)) {
                const dtsFiles = outputFiles.filter(f => isDeclarationFileName(f.name));
                if (dtsFiles.length === 1) {
                    const sourceFile = this.program!.getSourceFile(scriptInfo.fileName)!;
                    const signature = this.projectService.host.createHash ?
                        this.projectService.host.createHash(dtsFiles[0].text) :
                        generateDjb2Hash(dtsFiles[0].text);
                    BuilderState.updateSignatureOfFile(this.builderState, signature, sourceFile.resolvedPath);
                }
            }
        }

        return { emitSkipped, diagnostics };
    }

    enableLanguageService() {
        if (this.languageServiceEnabled || this.projectService.serverMode === LanguageServiceMode.Syntactic) {
            return;
        }
        this.languageServiceEnabled = true;
        this.lastFileExceededProgramSize = undefined;
        this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ true);
    }

    /** @internal */
    cleanupProgram() {
        if (this.program) {
            // Root files are always attached to the project irrespective of program
            for (const f of this.program.getSourceFiles()) {
                this.detachScriptInfoIfNotRoot(f.fileName);
            }
            this.program.forEachResolvedProjectReference(ref => this.detachScriptInfoFromProject(ref.sourceFile.fileName));
            this.program = undefined;
        }
    }

    disableLanguageService(lastFileExceededProgramSize?: string) {
        if (!this.languageServiceEnabled) {
            return;
        }
        Debug.assert(this.projectService.serverMode !== LanguageServiceMode.Syntactic);
        this.languageService.cleanupSemanticCache();
        this.languageServiceEnabled = false;
        this.cleanupProgram();
        this.lastFileExceededProgramSize = lastFileExceededProgramSize;
        this.builderState = undefined;
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.close();
        }
        this.autoImportProviderHost = undefined;
        this.resolutionCache.closeTypeRootsWatch();
        this.clearGeneratedFileWatch();
        this.projectService.verifyDocumentRegistry();
        this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ false);
    }

    getProjectName() {
        return this.projectName;
    }

    protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: TypeAcquisition): TypeAcquisition {
        if (!newTypeAcquisition.enable || !newTypeAcquisition.include) {
            // Nothing to filter out, so just return as-is
            return newTypeAcquisition;
        }
        return { ...newTypeAcquisition, include: this.removeExistingTypings(newTypeAcquisition.include) };
    }

    getExternalFiles(updateLevel?: ProgramUpdateLevel): SortedReadonlyArray<string> {
        return toSorted(flatMap(this.plugins, plugin => {
            if (typeof plugin.module.getExternalFiles !== "function") return;
            try {
                return plugin.module.getExternalFiles(this, updateLevel || ProgramUpdateLevel.Update);
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

    /** @internal */
    getSourceFileOrConfigFile(path: Path): SourceFile | undefined {
        const options = this.program!.getCompilerOptions();
        return path === options.configFilePath ? options.configFile : this.getSourceFile(path);
    }

    close() {
        if (this.typingsCache) this.projectService.typingsInstaller.onProjectClosed(this);
        this.typingsCache = undefined;
        this.closeWatchingTypingLocations();
        // if we have a program - release all files that are enlisted in program but arent root
        // The releasing of the roots happens later
        // The project could have pending update remaining and hence the info could be in the files but not in program graph
        this.cleanupProgram();
        // Release external files
        forEach(this.externalFiles, externalFile => this.detachScriptInfoIfNotRoot(externalFile));
        // Always remove root files from the project
        this.rootFilesMap.forEach(root => root.info?.detachFromProject(this));
        this.projectService.pendingEnsureProjectForOpenFiles = true;

        this.rootFilesMap = undefined!;
        this.externalFiles = undefined;
        this.program = undefined;
        this.builderState = undefined;
        this.resolutionCache.clear();
        this.resolutionCache = undefined!;
        this.cachedUnresolvedImportsPerFile = undefined!;
        this.packageJsonWatches?.forEach(watcher => {
            watcher.projects.delete(this);
            watcher.close();
        });
        this.packageJsonWatches = undefined;
        this.moduleSpecifierCache.clear();
        this.moduleSpecifierCache = undefined!;
        this.directoryStructureHost = undefined!;
        this.exportMapCache = undefined;
        this.projectErrors = undefined;
        this.plugins.length = 0;

        // Clean up file watchers waiting for missing files
        if (this.missingFilesMap) {
            clearMap(this.missingFilesMap, closeFileWatcher);
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
        return this.rootFilesMap === undefined;
    }

    hasRoots() {
        return !!this.rootFilesMap?.size;
    }

    /** @internal */
    isOrphan() {
        return false;
    }

    getRootFiles(): NormalizedPath[] {
        return this.rootFilesMap && arrayFrom(ts.mapDefinedIterator(this.rootFilesMap.values(), value => value.info?.fileName));
    }

    /** @internal */
    getRootFilesMap() {
        return this.rootFilesMap;
    }

    getRootScriptInfos() {
        return arrayFrom(ts.mapDefinedIterator(this.rootFilesMap.values(), value => value.info));
    }

    getScriptInfos(): ScriptInfo[] {
        if (!this.languageServiceEnabled) {
            // if language service is not enabled - return just root files
            return this.getRootScriptInfos();
        }
        return map(this.program!.getSourceFiles(), sourceFile => {
            const scriptInfo = this.projectService.getScriptInfoForPath(sourceFile.resolvedPath);
            Debug.assert(!!scriptInfo, "getScriptInfo", () => `scriptInfo for a file '${sourceFile.fileName}' Path: '${sourceFile.path}' / '${sourceFile.resolvedPath}' is missing.`);
            return scriptInfo;
        });
    }

    getExcludedFiles(): readonly NormalizedPath[] {
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

    /** @internal */
    getFileNamesWithRedirectInfo(includeProjectReferenceRedirectInfo: boolean) {
        return this.getFileNames().map((fileName): protocol.FileWithProjectReferenceRedirectInfo => ({
            fileName,
            isSourceOfProjectReferenceRedirect: includeProjectReferenceRedirectInfo && this.isSourceOfProjectReferenceRedirect(fileName),
        }));
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
        if (this.isRoot(info)) return true;
        if (!this.program) return false;
        const file = this.program.getSourceFileByPath(info.path);
        return !!file && file.resolvedPath === info.path;
    }

    containsFile(filename: NormalizedPath, requireOpen?: boolean): boolean {
        const info = this.projectService.getScriptInfoForNormalizedPath(filename);
        if (info && (info.isScriptOpen() || !requireOpen)) {
            return this.containsScriptInfo(info);
        }
        return false;
    }

    isRoot(info: ScriptInfo) {
        return this.rootFilesMap?.get(info.path)?.info === info;
    }

    // add a root file to project
    addRoot(info: ScriptInfo, fileName?: NormalizedPath) {
        Debug.assert(!this.isRoot(info));
        this.rootFilesMap.set(info.path, { fileName: fileName || info.fileName, info });
        info.attachToProject(this);

        this.markAsDirty();
    }

    // add a root file that doesnt exist on host
    addMissingFileRoot(fileName: NormalizedPath) {
        const path = this.projectService.toPath(fileName);
        this.rootFilesMap.set(path, { fileName });
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
        (this.updatedFileNames || (this.updatedFileNames = new Set<string>())).add(fileName);
    }

    /** @internal */
    markFileAsDirty(changedFile: Path) {
        this.markAsDirty();
        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            (this.changedFilesForExportMapCache ||= new Set()).add(changedFile);
        }
    }

    /** @internal */
    markAsDirty() {
        if (!this.dirty) {
            this.projectStateVersion++;
            this.dirty = true;
        }
    }

    /** @internal */
    markAutoImportProviderAsDirty() {
        if (!this.autoImportProviderHost) this.autoImportProviderHost = undefined;
        this.autoImportProviderHost?.markAsDirty();
    }

    /** @internal */
    onAutoImportProviderSettingsChanged() {
        if (this.autoImportProviderHost === false) {
            this.autoImportProviderHost = undefined;
        }
        else {
            this.autoImportProviderHost?.markAsDirty();
        }
    }

    /** @internal */
    onPackageJsonChange() {
        this.moduleSpecifierCache.clear();
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.markAsDirty();
        }
    }

    /** @internal */
    onFileAddedOrRemoved(isSymlink: boolean | undefined) {
        this.hasAddedorRemovedFiles = true;
        if (isSymlink) {
            this.hasAddedOrRemovedSymlinks = true;
        }
    }

    /** @internal */
    onDiscoveredSymlink() {
        this.hasAddedOrRemovedSymlinks = true;
    }

    /** @internal */
    onReleaseOldSourceFile(
        oldSourceFile: SourceFile,
        _oldOptions: CompilerOptions,
        hasSourceFileByPath: boolean,
        newSourceFileByResolvedPath: SourceFile | undefined,
    ) {
        if (
            !newSourceFileByResolvedPath ||
            (oldSourceFile.resolvedPath === oldSourceFile.path && newSourceFileByResolvedPath.resolvedPath !== oldSourceFile.path)
        ) {
            // new program does not contain this file - detach it from the project
            // - remove resolutions only if the new program doesnt contain source file by the path
            //   (not resolvedPath since path is used for resolution)
            this.detachScriptInfoFromProject(oldSourceFile.fileName, hasSourceFileByPath);
        }
    }

    /** @internal */
    updateFromProjectInProgress = false;

    /** @internal */
    updateFromProject() {
        updateProjectIfDirty(this);
    }

    /**
     * Updates set of files that contribute to this project
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean {
        tracing?.push(tracing.Phase.Session, "updateGraph", { name: this.projectName, kind: ProjectKind[this.projectKind] });
        this.resolutionCache.startRecordingFilesWithChangedResolutions();

        const hasNewProgram = this.updateGraphWorker();
        const hasAddedorRemovedFiles = this.hasAddedorRemovedFiles;
        this.hasAddedorRemovedFiles = false;
        this.hasAddedOrRemovedSymlinks = false;

        const changedFiles: readonly Path[] = this.resolutionCache.finishRecordingFilesWithChangedResolutions() || emptyArray;

        for (const file of changedFiles) {
            // delete cached information for changed files
            this.cachedUnresolvedImportsPerFile.delete(file);
        }

        // update builder only if language service is enabled
        // otherwise tell it to drop its internal state
        if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic && !this.isOrphan()) {
            // 1. no changes in structure, no changes in unresolved imports - do nothing
            // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
            // (can reuse cached imports for files that were not changed)
            // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
            // (can reuse cached imports for files that were not changed)
            // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
            if (hasNewProgram || changedFiles.length) {
                this.lastCachedUnresolvedImportsList = getUnresolvedImports(this.program!, this.cachedUnresolvedImportsPerFile);
            }

            this.enqueueInstallTypingsForProject(hasAddedorRemovedFiles);
        }
        else {
            this.lastCachedUnresolvedImportsList = undefined;
        }

        const isFirstProgramLoad = this.projectProgramVersion === 0 && hasNewProgram;
        if (hasNewProgram) {
            this.projectProgramVersion++;
        }
        if (hasAddedorRemovedFiles) {
            this.markAutoImportProviderAsDirty();
        }
        if (isFirstProgramLoad) {
            // Preload auto import provider so it's not created during completions request
            this.getPackageJsonAutoImportProvider();
        }
        tracing?.pop();
        return !hasNewProgram;
    }

    /** @internal */
    enqueueInstallTypingsForProject(forceRefresh: boolean) {
        const typeAcquisition = this.getTypeAcquisition();

        if (!typeAcquisition || !typeAcquisition.enable || this.projectService.typingsInstaller === nullTypingsInstaller) {
            return;
        }

        const entry = this.typingsCache;
        if (
            forceRefresh ||
            !entry ||
            typeAcquisitionChanged(typeAcquisition, entry.typeAcquisition) ||
            compilerOptionsChanged(this.getCompilationSettings(), entry.compilerOptions) ||
            unresolvedImportsChanged(this.lastCachedUnresolvedImportsList, entry.unresolvedImports)
        ) {
            // Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
            // instead it acts as a placeholder to prevent issuing multiple requests
            this.typingsCache = {
                compilerOptions: this.getCompilationSettings(),
                typeAcquisition,
                unresolvedImports: this.lastCachedUnresolvedImportsList,
            };
            // something has been changed, issue a request to update typings
            this.projectService.typingsInstaller.enqueueInstallTypingsRequest(this, typeAcquisition, this.lastCachedUnresolvedImportsList);
        }
    }

    /** @internal */
    updateTypingFiles(compilerOptions: CompilerOptions, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, newTypings: string[]) {
        this.typingsCache = {
            compilerOptions,
            typeAcquisition,
            unresolvedImports,
        };
        const typingFiles = !typeAcquisition || !typeAcquisition.enable ? emptyArray : toSorted(newTypings);
        if (enumerateInsertsAndDeletes<string, string>(typingFiles, this.typingFiles, getStringComparer(!this.useCaseSensitiveFileNames()), /*inserted*/ noop, removed => this.detachScriptInfoFromProject(removed))) {
            // If typing files changed, then only schedule project update
            this.typingFiles = typingFiles;
            // Invalidate files with unresolved imports
            this.resolutionCache.setFilesWithInvalidatedNonRelativeUnresolvedImports(this.cachedUnresolvedImportsPerFile);
            this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
        }
    }

    private closeWatchingTypingLocations() {
        if (this.typingWatchers) clearMap(this.typingWatchers, closeFileWatcher);
        this.typingWatchers = undefined;
    }

    private onTypingInstallerWatchInvoke() {
        this.typingWatchers!.isInvoked = true;
        this.projectService.updateTypingsForProject({ projectName: this.getProjectName(), kind: ActionInvalidate });
    }

    /** @internal */
    watchTypingLocations(files: readonly string[] | undefined) {
        if (!files) {
            this.typingWatchers!.isInvoked = false;
            return;
        }

        if (!files.length) {
            // shut down existing watchers
            this.closeWatchingTypingLocations();
            return;
        }

        const toRemove = new Map(this.typingWatchers);
        if (!this.typingWatchers) this.typingWatchers = new Map();

        // handler should be invoked once for the entire set of files since it will trigger full rediscovery of typings
        this.typingWatchers.isInvoked = false;
        const createProjectWatcher = (path: string, typingsWatcherType: TypingWatcherType) => {
            const canonicalPath = this.toPath(path);
            toRemove.delete(canonicalPath);
            if (!this.typingWatchers!.has(canonicalPath)) {
                this.typingWatchers!.set(
                    canonicalPath,
                    typingsWatcherType === TypingWatcherType.FileWatcher ?
                        this.projectService.watchFactory.watchFile(
                            path,
                            () =>
                                !this.typingWatchers!.isInvoked ?
                                    this.onTypingInstallerWatchInvoke() :
                                    this.writeLog(`TypingWatchers already invoked`),
                            PollingInterval.High,
                            this.projectService.getWatchOptions(this),
                            WatchType.TypingInstallerLocationFile,
                            this,
                        ) :
                        this.projectService.watchFactory.watchDirectory(
                            path,
                            f => {
                                if (this.typingWatchers!.isInvoked) return this.writeLog(`TypingWatchers already invoked`);
                                if (!fileExtensionIs(f, Extension.Json)) return this.writeLog(`Ignoring files that are not *.json`);
                                if (comparePaths(f, combinePaths(this.projectService.typingsInstaller.globalTypingsCacheLocation!, "package.json"), !this.useCaseSensitiveFileNames())) return this.writeLog(`Ignoring package.json change at global typings location`);
                                this.onTypingInstallerWatchInvoke();
                            },
                            WatchDirectoryFlags.Recursive,
                            this.projectService.getWatchOptions(this),
                            WatchType.TypingInstallerLocationDirectory,
                            this,
                        ),
                );
            }
        };

        // Create watches from list of files
        for (const file of files) {
            const basename = getBaseFileName(file);
            if (basename === "package.json" || basename === "bower.json") {
                // package.json or bower.json exists, watch the file to detect changes and update typings
                createProjectWatcher(file, TypingWatcherType.FileWatcher);
                continue;
            }

            // path in projectRoot, watch project root
            if (containsPath(this.currentDirectory, file, this.currentDirectory, !this.useCaseSensitiveFileNames())) {
                const subDirectory = file.indexOf(directorySeparator, this.currentDirectory.length + 1);
                if (subDirectory !== -1) {
                    // Watch subDirectory
                    createProjectWatcher(file.substr(0, subDirectory), TypingWatcherType.DirectoryWatcher);
                }
                else {
                    // Watch the directory itself
                    createProjectWatcher(file, TypingWatcherType.DirectoryWatcher);
                }
                continue;
            }

            // path in global cache, watch global cache
            if (containsPath(this.projectService.typingsInstaller.globalTypingsCacheLocation!, file, this.currentDirectory, !this.useCaseSensitiveFileNames())) {
                createProjectWatcher(this.projectService.typingsInstaller.globalTypingsCacheLocation!, TypingWatcherType.DirectoryWatcher);
                continue;
            }

            // watch node_modules or bower_components
            createProjectWatcher(file, TypingWatcherType.DirectoryWatcher);
        }

        // Remove unused watches
        toRemove.forEach((watch, path) => {
            watch.close();
            this.typingWatchers!.delete(path);
        });
    }

    /** @internal */
    getCurrentProgram(): Program | undefined {
        return this.program;
    }

    protected removeExistingTypings(include: string[]): string[] {
        if (!include.length) return include;
        const existing = getAutomaticTypeDirectiveNames(this.getCompilerOptions(), this.directoryStructureHost);
        return filter(include, i => !existing.includes(i));
    }

    private updateGraphWorker() {
        const oldProgram = this.languageService.getCurrentProgram();
        Debug.assert(oldProgram === this.program);
        Debug.assert(!this.isClosed(), "Called update graph worker of closed project");
        this.writeLog(`Starting updateGraphWorker: Project: ${this.getProjectName()}`);
        const start = timestamp();
        const { hasInvalidatedResolutions, hasInvalidatedLibResolutions } = this.resolutionCache.createHasInvalidatedResolutions(returnFalse, returnFalse);
        this.hasInvalidatedResolutions = hasInvalidatedResolutions;
        this.hasInvalidatedLibResolutions = hasInvalidatedLibResolutions;
        this.resolutionCache.startCachingPerDirectoryResolution();
        this.dirty = false;
        this.updateFromProjectInProgress = true;
        this.program = this.languageService.getProgram(); // TODO: GH#18217
        this.updateFromProjectInProgress = false;
        tracing?.push(tracing.Phase.Session, "finishCachingPerDirectoryResolution");
        this.resolutionCache.finishCachingPerDirectoryResolution(this.program, oldProgram);
        tracing?.pop();

        Debug.assert(oldProgram === undefined || this.program !== undefined);

        // bump up the version if
        // - oldProgram is not set - this is a first time updateGraph is called
        // - newProgram is different from the old program and structure of the old program was not reused.
        let hasNewProgram = false;
        if (this.program && (!oldProgram || (this.program !== oldProgram && this.program.structureIsReused !== StructureIsReused.Completely))) {
            hasNewProgram = true;

            // Update roots
            this.rootFilesMap.forEach((value, path) => {
                const file = this.program!.getSourceFileByPath(path);
                const info = value.info;
                if (!file || value.info?.path === file.resolvedPath) return;
                value.info = this.projectService.getScriptInfo(file.fileName)!;
                Debug.assert(value.info.isAttached(this));
                info?.detachFromProject(this);
            });

            // Update the missing file paths watcher
            updateMissingFilePathsWatch(
                this.program,
                this.missingFilesMap || (this.missingFilesMap = new Map()),
                // Watch the missing files
                (missingFilePath, missingFileName) => this.addMissingFileWatcher(missingFilePath, missingFileName),
            );

            if (this.generatedFilesMap) {
                const outPath = this.compilerOptions.outFile;
                if (isGeneratedFileWatcher(this.generatedFilesMap)) {
                    // --out
                    if (
                        !outPath || !this.isValidGeneratedFileWatcher(
                            removeFileExtension(outPath) + Extension.Dts,
                            this.generatedFilesMap,
                        )
                    ) {
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
                            if (
                                !sourceFile ||
                                sourceFile.resolvedPath !== source ||
                                !this.isValidGeneratedFileWatcher(
                                    getDeclarationEmitOutputFilePathWorker(sourceFile.fileName, this.compilerOptions, this.program!),
                                    watcher,
                                )
                            ) {
                                closeFileWatcherOf(watcher);
                                (this.generatedFilesMap as Map<string, GeneratedFileWatcher>).delete(source);
                            }
                        });
                    }
                }
            }

            // Watch the type locations that would be added to program as part of automatic type resolutions
            if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic) {
                this.resolutionCache.updateTypeRootsWatch();
            }
        }

        this.projectService.verifyProgram(this);
        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            this.exportMapCache.releaseSymbols();
            if (this.hasAddedorRemovedFiles || oldProgram && !this.program!.structureIsReused) {
                this.exportMapCache.clear();
            }
            else if (this.changedFilesForExportMapCache && oldProgram && this.program) {
                forEachKey(this.changedFilesForExportMapCache, fileName => {
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

        const oldExternalFiles = this.externalFiles || emptyArray as SortedReadonlyArray<string>;
        this.externalFiles = this.getExternalFiles();
        enumerateInsertsAndDeletes<string, string>(
            this.externalFiles,
            oldExternalFiles,
            getStringComparer(!this.useCaseSensitiveFileNames()), // Ensure a ScriptInfo is created for new external files. This is performed indirectly
            // by the host for files in the program when the program is retrieved above but
            // the program doesn't contain external files so this must be done explicitly.
            inserted => {
                const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
                    inserted,
                    this.currentDirectory,
                    this.directoryStructureHost,
                    /*deferredDeleteOk*/ false,
                );
                scriptInfo?.attachToProject(this);
            },
            removed => this.detachScriptInfoFromProject(removed),
        );
        const elapsed = timestamp() - start;
        this.sendPerformanceEvent("UpdateGraph", elapsed);
        this.writeLog(`Finishing updateGraphWorker: Project: ${this.getProjectName()} projectStateVersion: ${this.projectStateVersion} projectProgramVersion: ${this.projectProgramVersion} structureChanged: ${hasNewProgram}${this.program ? ` structureIsReused:: ${(ts as any).StructureIsReused[this.program.structureIsReused]}` : ""} Elapsed: ${elapsed}ms`);
        if (this.projectService.logger.isTestLogger) {
            if (this.program !== oldProgram) {
                this.print(/*writeProjectFileNames*/ true, this.hasAddedorRemovedFiles, /*writeFileVersionAndText*/ true);
            }
            else {
                this.writeLog(`Same program as before`);
            }
        }
        else if (this.hasAddedorRemovedFiles) {
            this.print(/*writeProjectFileNames*/ true, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);
        }
        else if (this.program !== oldProgram) {
            this.writeLog(`Different program with same set of files`);
        }
        // Verify the document registry count
        this.projectService.verifyDocumentRegistry();
        return hasNewProgram;
    }

    /** @internal */
    sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number) {
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

    private addMissingFileWatcher(missingFilePath: Path, missingFileName: string): FileWatcher {
        if (isConfiguredProject(this)) {
            // If this file is referenced config file, we are already watching it, no need to watch again
            const configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(missingFilePath as string as NormalizedPath);
            if (configFileExistenceInfo?.config?.projects.has(this.canonicalConfigFilePath)) return noopFileWatcher;
        }
        const fileWatcher = this.projectService.watchFactory.watchFile(
            getNormalizedAbsolutePath(missingFileName, this.currentDirectory),
            (fileName, eventKind) => {
                if (isConfiguredProject(this)) {
                    this.getCachedDirectoryStructureHost().addOrDeleteFile(fileName, missingFilePath, eventKind);
                }

                if (eventKind === FileWatcherEventKind.Created && this.missingFilesMap!.has(missingFilePath)) {
                    this.missingFilesMap!.delete(missingFilePath);
                    fileWatcher.close();

                    // When a missing file is created, we should update the graph.
                    this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
                }
            },
            PollingInterval.Medium,
            this.projectService.getWatchOptions(this),
            WatchType.MissingFile,
            this,
        );
        return fileWatcher;
    }

    private isWatchedMissingFile(path: Path) {
        return !!this.missingFilesMap && this.missingFilesMap.has(path);
    }

    /** @internal */
    addGeneratedFileWatch(generatedFile: string, sourceFile: string) {
        if (this.compilerOptions.outFile) {
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
                    Debug.fail(`${this.projectName} Expected to not have --out watcher for generated file with options: ${JSON.stringify(this.compilerOptions)}`);
                    return;
                }
                if (this.generatedFilesMap.has(path)) return;
            }
            else {
                this.generatedFilesMap = new Map();
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
                PollingInterval.High,
                this.projectService.getWatchOptions(this),
                WatchType.MissingGeneratedFile,
                this,
            ),
        };
    }

    private isValidGeneratedFileWatcher(generateFile: string, watcher: GeneratedFileWatcher) {
        return this.toPath(generateFile) === watcher.generatedFilePath;
    }

    private clearGeneratedFileWatch() {
        if (this.generatedFilesMap) {
            if (isGeneratedFileWatcher(this.generatedFilesMap)) {
                closeFileWatcherOf(this.generatedFilesMap);
            }
            else {
                clearMap(this.generatedFilesMap, closeFileWatcherOf);
            }
            this.generatedFilesMap = undefined;
        }
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
        return this.filesToStringWorker(writeProjectFileNames, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);
    }

    private filesToStringWorker(writeProjectFileNames: boolean, writeFileExplaination: boolean, writeFileVersionAndText: boolean) {
        if (this.isInitialLoadPending()) return "\tFiles (0) InitialLoadPending\n";
        if (!this.program) return "\tFiles (0) NoProgram\n";
        const sourceFiles = this.program.getSourceFiles();
        let strBuilder = `\tFiles (${sourceFiles.length})\n`;
        if (writeProjectFileNames) {
            for (const file of sourceFiles) {
                strBuilder += `\t${file.fileName}${writeFileVersionAndText ? ` ${file.version} ${JSON.stringify(file.text)}` : ""}\n`;
            }
            if (writeFileExplaination) {
                strBuilder += "\n\n";
                explainFiles(this.program, s => strBuilder += `\t${s}\n`);
            }
        }
        return strBuilder;
    }

    /** @internal */
    print(writeProjectFileNames: boolean, writeFileExplaination: boolean, writeFileVersionAndText: boolean) {
        this.writeLog(`Project '${this.projectName}' (${ProjectKind[this.projectKind]})`);
        this.writeLog(this.filesToStringWorker(
            writeProjectFileNames && this.projectService.logger.hasLevel(LogLevel.verbose),
            writeFileExplaination && this.projectService.logger.hasLevel(LogLevel.verbose),
            writeFileVersionAndText && this.projectService.logger.hasLevel(LogLevel.verbose),
        ));
        this.writeLog("-----------------------------------------------");
        if (this.autoImportProviderHost) {
            this.autoImportProviderHost.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
        }
        this.noDtsResolutionProject?.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
    }

    setCompilerOptions(compilerOptions: CompilerOptions) {
        if (compilerOptions) {
            compilerOptions.allowNonTsExtensions = true;
            const oldOptions = this.compilerOptions;
            this.compilerOptions = compilerOptions;
            this.setInternalCompilerOptionsForEmittingJsFiles();
            this.noDtsResolutionProject?.setCompilerOptions(this.getCompilerOptionsForNoDtsResolutionProject());
            if (changesAffectModuleResolution(oldOptions, compilerOptions)) {
                // reset cached unresolved imports if changes in compiler options affected module resolution
                this.cachedUnresolvedImportsPerFile.clear();
                this.lastCachedUnresolvedImportsList = undefined;
                this.resolutionCache.onChangesAffectModuleResolution();
                this.moduleSpecifierCache.clear();
            }
            this.markAsDirty();
        }
    }

    /** @internal */
    setWatchOptions(watchOptions: WatchOptions | undefined) {
        this.watchOptions = watchOptions;
    }

    /** @internal */
    getWatchOptions(): WatchOptions | undefined {
        return this.watchOptions;
    }

    setTypeAcquisition(newTypeAcquisition: TypeAcquisition | undefined): void {
        if (newTypeAcquisition) {
            this.typeAcquisition = this.removeLocalTypingsFromTypeAcquisition(newTypeAcquisition);
        }
    }

    getTypeAcquisition() {
        return this.typeAcquisition || {};
    }

    /** @internal */
    getChangesSinceVersion(lastKnownVersion?: number, includeProjectReferenceRedirectInfo?: boolean): ProjectFilesWithTSDiagnostics {
        const includeProjectReferenceRedirectInfoIfRequested = includeProjectReferenceRedirectInfo
            ? (files: Map<string, boolean>) =>
                arrayFrom(files.entries(), ([fileName, isSourceOfProjectReferenceRedirect]): protocol.FileWithProjectReferenceRedirectInfo => ({
                    fileName,
                    isSourceOfProjectReferenceRedirect,
                }))
            : (files: Map<string, boolean>) => arrayFrom(files.keys());

        // Update the graph only if initial configured project load is not pending
        if (!this.isInitialLoadPending()) {
            updateProjectIfDirty(this);
        }

        const info: protocol.ProjectVersionInfo = {
            projectName: this.getProjectName(),
            version: this.projectProgramVersion,
            isInferred: isInferredProject(this),
            options: this.getCompilationSettings(),
            languageServiceDisabled: !this.languageServiceEnabled,
            lastFileExceededProgramSize: this.lastFileExceededProgramSize,
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
            const externalFiles = this.externalFiles?.map((f): protocol.FileWithProjectReferenceRedirectInfo => ({
                fileName: toNormalizedPath(f),
                isSourceOfProjectReferenceRedirect: false,
            })) || emptyArray;
            const currentFiles = arrayToMap(
                this.getFileNamesWithRedirectInfo(!!includeProjectReferenceRedirectInfo).concat(externalFiles),
                info => info.fileName,
                info => info.isSourceOfProjectReferenceRedirect,
            );

            const added: Map<string, boolean> = new Map<string, boolean>();
            const removed: Map<string, boolean> = new Map<string, boolean>();

            const updated: string[] = updatedFileNames ? arrayFrom(updatedFileNames.keys()) : [];
            const updatedRedirects: protocol.FileWithProjectReferenceRedirectInfo[] = [];

            forEachEntry(currentFiles, (isSourceOfProjectReferenceRedirect, fileName) => {
                if (!lastReportedFileNames.has(fileName)) {
                    added.set(fileName, isSourceOfProjectReferenceRedirect);
                }
                else if (includeProjectReferenceRedirectInfo && isSourceOfProjectReferenceRedirect !== lastReportedFileNames.get(fileName)) {
                    updatedRedirects.push({
                        fileName,
                        isSourceOfProjectReferenceRedirect,
                    });
                }
            });
            forEachEntry(lastReportedFileNames, (isSourceOfProjectReferenceRedirect, fileName) => {
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
                        ? updated.map((fileName): protocol.FileWithProjectReferenceRedirectInfo => ({
                            fileName,
                            isSourceOfProjectReferenceRedirect: this.isSourceOfProjectReferenceRedirect(fileName),
                        }))
                        : updated,
                    updatedRedirects: includeProjectReferenceRedirectInfo ? updatedRedirects : undefined,
                },
                projectErrors: this.getGlobalProjectErrors(),
            };
        }
        else {
            // unknown version - return everything
            const projectFileNames = this.getFileNamesWithRedirectInfo(!!includeProjectReferenceRedirectInfo);
            const externalFiles = this.externalFiles?.map((f): protocol.FileWithProjectReferenceRedirectInfo => ({
                fileName: toNormalizedPath(f),
                isSourceOfProjectReferenceRedirect: false,
            })) || emptyArray;
            const allFiles = projectFileNames.concat(externalFiles);
            this.lastReportedFileNames = arrayToMap(
                allFiles,
                info => info.fileName,
                info => info.isSourceOfProjectReferenceRedirect,
            );
            this.lastReportedVersion = this.projectProgramVersion;
            return {
                info,
                files: includeProjectReferenceRedirectInfo ? allFiles : allFiles.map(f => f.fileName),
                projectErrors: this.getGlobalProjectErrors(),
            };
        }
    }

    // remove a root file from project
    protected removeRoot(info: ScriptInfo): void {
        this.rootFilesMap.delete(info.path);
    }

    /** @internal */
    isSourceOfProjectReferenceRedirect(fileName: string) {
        return !!this.program && this.program.isSourceOfProjectReferenceRedirect(fileName);
    }

    /** @internal */
    protected getGlobalPluginSearchPaths() {
        // Search any globally-specified probe paths, then our peer node_modules
        return [
            ...this.projectService.pluginProbeLocations,
            // ../../.. to walk from X/node_modules/typescript/lib/tsserver.js to X/node_modules/
            combinePaths(this.projectService.getExecutingFilePath(), "../../.."),
        ];
    }

    protected enableGlobalPlugins(options: CompilerOptions): void {
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

            this.enablePlugin({ name: globalPluginName, global: true } as PluginImport, searchPaths);
        }
    }

    protected enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[]): void {
        this.projectService.requestEnablePlugin(this, pluginConfigEntry, searchPaths);
    }

    /** @internal */
    enableProxy(pluginModuleFactory: PluginModuleFactory, configEntry: PluginImport) {
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
                session: this.projectService.session,
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

    /** @internal */
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

    /** @internal */
    getPackageJsonsVisibleToFile(fileName: string, rootDir?: string): readonly ProjectPackageJsonInfo[] {
        if (this.projectService.serverMode !== LanguageServiceMode.Semantic) return emptyArray;
        return this.projectService.getPackageJsonsVisibleToFile(fileName, this, rootDir);
    }

    /** @internal */
    getNearestAncestorDirectoryWithPackageJson(fileName: string): string | undefined {
        return this.projectService.getNearestAncestorDirectoryWithPackageJson(fileName);
    }

    /** @internal */
    getPackageJsonsForAutoImport(rootDir?: string): readonly ProjectPackageJsonInfo[] {
        return this.getPackageJsonsVisibleToFile(combinePaths(this.currentDirectory, inferredTypesContainingFile), rootDir);
    }

    /** @internal */
    getPackageJsonCache() {
        return this.projectService.packageJsonCache;
    }

    /** @internal */
    getCachedExportInfoMap() {
        return this.exportMapCache ||= createCacheableExportInfoMap(this);
    }

    /** @internal */
    clearCachedExportInfoMap() {
        this.exportMapCache?.clear();
    }

    /** @internal */
    getModuleSpecifierCache() {
        return this.moduleSpecifierCache;
    }

    /** @internal */
    includePackageJsonAutoImports(): PackageJsonAutoImportPreference {
        if (
            this.projectService.includePackageJsonAutoImports() === PackageJsonAutoImportPreference.Off ||
            !this.languageServiceEnabled ||
            isInsideNodeModules(this.currentDirectory) ||
            !this.isDefaultProjectForOpenFiles()
        ) {
            return PackageJsonAutoImportPreference.Off;
        }
        return this.projectService.includePackageJsonAutoImports();
    }

    /** @internal */
    getHostForAutoImportProvider(): GetPackageJsonEntrypointsHost {
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
                readDirectory: this.projectService.host.readDirectory.bind(this.projectService.host),
            };
        }
        return this.projectService.host;
    }

    /** @internal */
    getPackageJsonAutoImportProvider(): Program | undefined {
        if (this.autoImportProviderHost === false) {
            return undefined;
        }
        if (this.projectService.serverMode !== LanguageServiceMode.Semantic) {
            this.autoImportProviderHost = false;
            return undefined;
        }
        if (this.autoImportProviderHost) {
            updateProjectIfDirty(this.autoImportProviderHost);
            if (this.autoImportProviderHost.isEmpty()) {
                this.autoImportProviderHost.close();
                this.autoImportProviderHost = undefined;
                return undefined;
            }
            return this.autoImportProviderHost.getCurrentProgram();
        }

        const dependencySelection = this.includePackageJsonAutoImports();
        if (dependencySelection) {
            tracing?.push(tracing.Phase.Session, "getPackageJsonAutoImportProvider");
            const start = timestamp();
            this.autoImportProviderHost = AutoImportProviderProject.create(dependencySelection, this, this.getHostForAutoImportProvider(), this.documentRegistry);
            if (this.autoImportProviderHost) {
                updateProjectIfDirty(this.autoImportProviderHost);
                this.sendPerformanceEvent("CreatePackageJsonAutoImportProvider", timestamp() - start);
                tracing?.pop();
                return this.autoImportProviderHost.getCurrentProgram();
            }
            tracing?.pop();
        }
    }

    private isDefaultProjectForOpenFiles(): boolean {
        return !!forEachEntry(
            this.projectService.openFiles,
            (_projectRootPath, path) => this.projectService.tryGetDefaultProjectForFile(this.projectService.getScriptInfoForPath(path)!) === this,
        );
    }

    /** @internal */
    watchNodeModulesForPackageJsonChanges(directoryPath: string) {
        return this.projectService.watchPackageJsonsInNodeModules(directoryPath, this);
    }

    /** @internal */
    getIncompleteCompletionsCache() {
        return this.projectService.getIncompleteCompletionsCache();
    }

    /** @internal */
    getNoDtsResolutionProject(rootFile: NormalizedPath): AuxiliaryProject {
        Debug.assert(this.projectService.serverMode === LanguageServiceMode.Semantic);
        if (!this.noDtsResolutionProject) {
            this.noDtsResolutionProject = new AuxiliaryProject(this.projectService, this.documentRegistry, this.getCompilerOptionsForNoDtsResolutionProject(), this.currentDirectory);
        }
        if (this.noDtsResolutionProject.rootFile !== rootFile) {
            this.projectService.setFileNamesOfAutpImportProviderOrAuxillaryProject(this.noDtsResolutionProject, [rootFile]);
            this.noDtsResolutionProject.rootFile = rootFile;
        }
        return this.noDtsResolutionProject;
    }

    /** @internal */
    runWithTemporaryFileUpdate(rootFile: string, updatedText: string, cb: (updatedProgram: Program, originalProgram: Program | undefined, updatedFile: SourceFile) => void) {
        const originalProgram = this.program;
        const rootSourceFile = Debug.checkDefined(this.program?.getSourceFile(rootFile), "Expected file to be part of program");
        const originalText = Debug.checkDefined(rootSourceFile.getFullText());

        this.getScriptInfo(rootFile)?.editContent(0, originalText.length, updatedText);
        this.updateGraph();
        try {
            cb(this.program!, originalProgram, (this.program?.getSourceFile(rootFile))!);
        }
        finally {
            this.getScriptInfo(rootFile)?.editContent(0, updatedText.length, originalText);
        }
    }

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

function getUnresolvedImports(program: Program, cachedUnresolvedImportsPerFile: Map<Path, readonly string[]>): SortedReadonlyArray<string> {
    const sourceFiles = program.getSourceFiles();
    tracing?.push(tracing.Phase.Session, "getUnresolvedImports", { count: sourceFiles.length });
    const ambientModules = program.getTypeChecker().getAmbientModules().map(mod => stripQuotes(mod.getName()));
    const result = sortAndDeduplicate(flatMap(sourceFiles, sourceFile =>
        extractUnresolvedImportsFromSourceFile(
            program,
            sourceFile,
            ambientModules,
            cachedUnresolvedImportsPerFile,
        )));
    tracing?.pop();
    return result;
}
function extractUnresolvedImportsFromSourceFile(
    program: Program,
    file: SourceFile,
    ambientModules: readonly string[],
    cachedUnresolvedImportsPerFile: Map<Path, readonly string[]>,
): readonly string[] {
    return getOrUpdate(cachedUnresolvedImportsPerFile, file.path, () => {
        let unresolvedImports: string[] | undefined;
        program.forEachResolvedModule(({ resolvedModule }, name) => {
            // pick unresolved non-relative names
            if (
                (!resolvedModule || !resolutionExtensionIsTSOrJson(resolvedModule.extension)) &&
                !isExternalModuleNameRelative(name) &&
                !ambientModules.some(m => m === name)
            ) {
                unresolvedImports = append(unresolvedImports, parsePackageName(name).packageName);
            }
        }, file);
        return unresolvedImports || emptyArray;
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

    override setCompilerOptions(options?: CompilerOptions) {
        // Avoid manipulating the given options directly
        if (!options && !this.getCompilationSettings()) {
            return;
        }
        const newOptions = cloneCompilerOptions(options || this.getCompilationSettings());
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

    /**
     * stored only if their is no projectRootPath and this isnt single inferred project
     *
     * @internal
     */
    readonly canonicalCurrentDirectory: string | undefined;

    /** @internal */
    constructor(
        projectService: ProjectService,
        documentRegistry: DocumentRegistry,
        compilerOptions: CompilerOptions,
        watchOptions: WatchOptions | undefined,
        projectRootPath: NormalizedPath | undefined,
        currentDirectory: string,
        typeAcquisition: TypeAcquisition | undefined,
    ) {
        super(
            projectService.newInferredProjectName(),
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
            currentDirectory,
        );
        this.typeAcquisition = typeAcquisition;
        this.projectRootPath = projectRootPath && projectService.toCanonicalFileName(projectRootPath);
        if (!projectRootPath && !projectService.useSingleInferredProject) {
            this.canonicalCurrentDirectory = projectService.toCanonicalFileName(this.currentDirectory);
        }
        this.enableGlobalPlugins(this.getCompilerOptions());
    }

    override addRoot(info: ScriptInfo) {
        Debug.assert(info.isScriptOpen());
        this.projectService.startWatchingConfigFilesForInferredProjectRoot(info);
        if (!this._isJsInferredProject && info.isJavaScript()) {
            this.toggleJsInferredProject(/*isJsInferredProject*/ true);
        }
        else if (this.isOrphan() && this._isJsInferredProject && !info.isJavaScript()) {
            this.toggleJsInferredProject(/*isJsInferredProject*/ false);
        }
        super.addRoot(info);
    }

    override removeRoot(info: ScriptInfo) {
        this.projectService.stopWatchingConfigFilesForScriptInfo(info);
        super.removeRoot(info);
        // Delay toggling to isJsInferredProject = false till we actually need it again
        if (!this.isOrphan() && this._isJsInferredProject && info.isJavaScript()) {
            if (every(this.getRootScriptInfos(), rootInfo => !rootInfo.isJavaScript())) {
                this.toggleJsInferredProject(/*isJsInferredProject*/ false);
            }
        }
    }

    /** @internal */
    override isOrphan() {
        return !this.hasRoots();
    }

    isProjectWithSingleRoot() {
        // - when useSingleInferredProject is not set and projectRootPath is not set,
        //   we can guarantee that this will be the only root
        // - other wise it has single root if it has single root script info
        return (!this.projectRootPath && !this.projectService.useSingleInferredProject) ||
            this.getRootScriptInfos().length === 1;
    }

    override close() {
        forEach(this.getRootScriptInfos(), info => this.projectService.stopWatchingConfigFilesForScriptInfo(info));
        super.close();
    }

    override getTypeAcquisition(): TypeAcquisition {
        return this.typeAcquisition || {
            enable: allRootFilesAreJsOrDts(this),
            include: ts.emptyArray,
            exclude: ts.emptyArray,
        };
    }
}

/** @internal */
export class AuxiliaryProject extends Project {
    /** @internal */ rootFile: NormalizedPath | undefined;
    constructor(projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions, currentDirectory: string) {
        super(projectService.newAuxiliaryProjectName(), ProjectKind.Auxiliary, projectService, documentRegistry, /*hasExplicitListOfFiles*/ false, /*lastFileExceededProgramSize*/ undefined, compilerOptions, /*compileOnSaveEnabled*/ false, /*watchOptions*/ undefined, projectService.host, currentDirectory);
    }

    override isOrphan(): boolean {
        return true;
    }

    override scheduleInvalidateResolutionsOfFailedLookupLocations(): void {
        // Invalidation will happen on-demand as part of updateGraph
        return;
    }
}

export class AutoImportProviderProject extends Project {
    private static readonly maxDependencies = 10;

    /** @internal */
    static getRootFileNames(dependencySelection: PackageJsonAutoImportPreference, hostProject: Project, host: GetPackageJsonEntrypointsHost, compilerOptions: CompilerOptions): string[] {
        if (!dependencySelection) {
            return ts.emptyArray;
        }

        const program = hostProject.getCurrentProgram();
        if (!program) {
            return ts.emptyArray;
        }

        const start = timestamp();
        let dependencyNames: Set<string> | undefined;
        let rootNames: Set<string> | undefined;
        const rootFileName = combinePaths(hostProject.currentDirectory, inferredTypesContainingFile);
        const packageJsons = hostProject.getPackageJsonsForAutoImport(combinePaths(hostProject.currentDirectory, rootFileName));
        for (const packageJson of packageJsons) {
            packageJson.dependencies?.forEach((_, dependenyName) => addDependency(dependenyName));
            packageJson.peerDependencies?.forEach((_, dependencyName) => addDependency(dependencyName));
        }

        let dependenciesAdded = 0;
        if (dependencyNames) {
            const symlinkCache = hostProject.getSymlinkCache();
            for (const name of arrayFrom(dependencyNames.keys())) {
                // Avoid creating a large project that would significantly slow down time to editor interactivity
                if (dependencySelection === PackageJsonAutoImportPreference.Auto && dependenciesAdded > this.maxDependencies) {
                    hostProject.log(`AutoImportProviderProject: attempted to add more than ${this.maxDependencies} dependencies. Aborting.`);
                    return ts.emptyArray;
                }

                // 1. Try to load from the implementation package. For many dependencies, the
                //    package.json will exist, but the package will not contain any typings,
                //    so `entrypoints` will be undefined. In that case, or if the dependency
                //    is missing altogether, we will move on to trying the @types package (2).
                const packageJson = resolvePackageNameToPackageJson(
                    name,
                    hostProject.currentDirectory,
                    compilerOptions,
                    host,
                    program.getModuleResolutionCache(),
                );
                if (packageJson) {
                    const entrypoints = getRootNamesFromPackageJson(packageJson, program, symlinkCache);
                    if (entrypoints) {
                        dependenciesAdded += addRootNames(entrypoints);
                        continue;
                    }
                }

                // 2. Try to load from the @types package in the tree and in the global
                //    typings cache location, if enabled.
                const done = forEach([hostProject.currentDirectory, hostProject.getGlobalTypingsCacheLocation()], directory => {
                    if (directory) {
                        const typesPackageJson = resolvePackageNameToPackageJson(
                            `@types/${name}`,
                            directory,
                            compilerOptions,
                            host,
                            program.getModuleResolutionCache(),
                        );
                        if (typesPackageJson) {
                            const entrypoints = getRootNamesFromPackageJson(typesPackageJson, program, symlinkCache);
                            dependenciesAdded += addRootNames(entrypoints);
                            return true;
                        }
                    }
                });

                if (done) continue;

                // 3. If the @types package did not exist and the user has settings that
                //    allow processing JS from node_modules, go back to the implementation
                //    package and load the JS.
                if (packageJson && compilerOptions.allowJs && compilerOptions.maxNodeModuleJsDepth) {
                    const entrypoints = getRootNamesFromPackageJson(packageJson, program, symlinkCache, /*resolveJs*/ true);
                    dependenciesAdded += addRootNames(entrypoints);
                }
            }
        }

        const references = program.getResolvedProjectReferences();
        let referencesAddded = 0;
        if (references?.length && hostProject.projectService.getHostPreferences().includeCompletionsForModuleExports) {
            // Add direct referenced projects to rootFiles names
            references.forEach(ref => {
                if (ref?.commandLine.options.outFile) {
                    referencesAddded += addRootNames(filterEntrypoints([
                        changeExtension(ref.commandLine.options.outFile, ".d.ts"),
                    ]));
                }
                else if (ref) {
                    const getCommonSourceDirectory = memoize(() =>
                        getCommonSourceDirectoryOfConfig(
                            ref.commandLine,
                            !hostProject.useCaseSensitiveFileNames(),
                        )
                    );
                    referencesAddded += addRootNames(filterEntrypoints(mapDefined(
                        ref.commandLine.fileNames,
                        fileName =>
                            !isDeclarationFileName(fileName) &&
                                !fileExtensionIs(fileName, Extension.Json) &&
                                !program.getSourceFile(fileName) ?
                                getOutputDeclarationFileName(
                                    fileName,
                                    ref.commandLine,
                                    !hostProject.useCaseSensitiveFileNames(),
                                    getCommonSourceDirectory,
                                ) : undefined,
                    )));
                }
            });
        }

        if (rootNames?.size) {
            hostProject.log(`AutoImportProviderProject: found ${rootNames.size} root files in ${dependenciesAdded} dependencies ${referencesAddded} referenced projects in ${timestamp() - start} ms`);
        }
        return rootNames ? arrayFrom(rootNames.values()) : ts.emptyArray;

        function addRootNames(entrypoints: readonly string[] | undefined) {
            if (!entrypoints?.length) return 0;
            rootNames ??= new Set();
            entrypoints.forEach(entry => rootNames!.add(entry));
            return 1;
        }

        function addDependency(dependency: string) {
            if (!startsWith(dependency, "@types/")) {
                (dependencyNames || (dependencyNames = new Set())).add(dependency);
            }
        }

        function getRootNamesFromPackageJson(packageJson: PackageJsonInfo, program: Program, symlinkCache: SymlinkCache, resolveJs?: boolean) {
            const entrypoints = getEntrypointsFromPackageJsonInfo(
                packageJson,
                compilerOptions,
                host,
                program.getModuleResolutionCache(),
                resolveJs,
            );
            if (entrypoints) {
                const real = host.realpath?.(packageJson.packageDirectory);
                const realPath = real ? hostProject.toPath(real) : undefined;
                const isSymlink = realPath && realPath !== hostProject.toPath(packageJson.packageDirectory);
                if (isSymlink) {
                    symlinkCache.setSymlinkedDirectory(packageJson.packageDirectory, {
                        real: ensureTrailingDirectorySeparator(real!),
                        realPath: ensureTrailingDirectorySeparator(realPath),
                    });
                }

                return filterEntrypoints(entrypoints, isSymlink ? entrypoint => entrypoint.replace(packageJson.packageDirectory, real!) : undefined);
            }
        }

        function filterEntrypoints(entrypoints: readonly string[] | undefined, symlinkName?: (entrypoint: string) => string) {
            return mapDefined(entrypoints, entrypoint => {
                const resolvedFileName = symlinkName ? symlinkName(entrypoint) : entrypoint;
                if (!program!.getSourceFile(resolvedFileName) && !(symlinkName && program!.getSourceFile(entrypoint))) {
                    return resolvedFileName;
                }
            });
        }
    }

    /** @internal */
    static readonly compilerOptionsOverrides: CompilerOptions = {
        diagnostics: false,
        skipLibCheck: true,
        sourceMap: false,
        types: ts.emptyArray,
        lib: ts.emptyArray,
        noLib: true,
    };

    /** @internal */
    static create(dependencySelection: PackageJsonAutoImportPreference, hostProject: Project, host: GetPackageJsonEntrypointsHost, documentRegistry: DocumentRegistry): AutoImportProviderProject | undefined {
        if (dependencySelection === PackageJsonAutoImportPreference.Off) {
            return undefined;
        }

        const compilerOptions = {
            ...hostProject.getCompilerOptions(),
            ...this.compilerOptionsOverrides,
        };

        const rootNames = this.getRootFileNames(dependencySelection, hostProject, host, compilerOptions);
        if (!rootNames.length) {
            return undefined;
        }

        return new AutoImportProviderProject(hostProject, rootNames, documentRegistry, compilerOptions);
    }

    private rootFileNames: string[] | undefined;

    /** @internal */
    constructor(
        private hostProject: Project,
        initialRootNames: string[],
        documentRegistry: DocumentRegistry,
        compilerOptions: CompilerOptions,
    ) {
        super(hostProject.projectService.newAutoImportProviderProjectName(), ProjectKind.AutoImportProvider, hostProject.projectService, documentRegistry, /*hasExplicitListOfFiles*/ false, /*lastFileExceededProgramSize*/ undefined, compilerOptions, /*compileOnSaveEnabled*/ false, hostProject.getWatchOptions(), hostProject.projectService.host, hostProject.currentDirectory);

        this.rootFileNames = initialRootNames;
        this.useSourceOfProjectReferenceRedirect = maybeBind(this.hostProject, this.hostProject.useSourceOfProjectReferenceRedirect);
        this.getParsedCommandLine = maybeBind(this.hostProject, this.hostProject.getParsedCommandLine);
    }

    /** @internal */
    isEmpty() {
        return !some(this.rootFileNames);
    }

    /** @internal */
    override isOrphan() {
        return true;
    }

    override updateGraph() {
        let rootFileNames = this.rootFileNames;
        if (!rootFileNames) {
            rootFileNames = AutoImportProviderProject.getRootFileNames(
                this.hostProject.includePackageJsonAutoImports(),
                this.hostProject,
                this.hostProject.getHostForAutoImportProvider(),
                this.getCompilationSettings(),
            );
        }

        this.projectService.setFileNamesOfAutpImportProviderOrAuxillaryProject(this, rootFileNames);
        this.rootFileNames = rootFileNames;
        const oldProgram = this.getCurrentProgram();
        const hasSameSetOfFiles = super.updateGraph();
        if (oldProgram && oldProgram !== this.getCurrentProgram()) {
            this.hostProject.clearCachedExportInfoMap();
        }
        return hasSameSetOfFiles;
    }

    /** @internal */
    override scheduleInvalidateResolutionsOfFailedLookupLocations(): void {
        // Invalidation will happen on-demand as part of updateGraph
        return;
    }

    override hasRoots() {
        return !!this.rootFileNames?.length;
    }

    /** @internal */
    override markAsDirty() {
        this.rootFileNames = undefined;
        super.markAsDirty();
    }

    override getScriptFileNames() {
        return this.rootFileNames || ts.emptyArray;
    }

    override getLanguageService(): never {
        throw new Error("AutoImportProviderProject language service should never be used. To get the program, use `project.getCurrentProgram()`.");
    }

    /** @internal */
    override onAutoImportProviderSettingsChanged(): never {
        throw new Error("AutoImportProviderProject is an auto import provider; use `markAsDirty()` instead.");
    }

    /** @internal */
    override onPackageJsonChange(): never {
        throw new Error("package.json changes should be notified on an AutoImportProvider's host project");
    }

    override getHostForAutoImportProvider(): never {
        throw new Error("AutoImportProviderProject cannot provide its own host; use `hostProject.getModuleResolutionHostForAutomImportProvider()` instead.");
    }

    override getProjectReferences() {
        return this.hostProject.getProjectReferences();
    }

    /** @internal */
    override includePackageJsonAutoImports() {
        return PackageJsonAutoImportPreference.Off;
    }

    /** @internal */
    override getSymlinkCache() {
        return this.hostProject.getSymlinkCache();
    }

    /** @internal */
    override getModuleResolutionCache() {
        return this.hostProject.getCurrentProgram()?.getModuleResolutionCache();
    }
}

/**
 * If a file is opened, the server will look for a tsconfig (or jsconfig)
 * and if successful create a ConfiguredProject for it.
 * Otherwise it will create an InferredProject.
 */
export class ConfiguredProject extends Project {
    /** @internal */
    pendingUpdateLevel: ProgramUpdateLevel;
    /** @internal */
    pendingUpdateReason: string | undefined;

    /** @internal */
    openFileWatchTriggered = new Map<string, ProgramUpdateLevel>();

    /** @internal */
    canConfigFileJsonReportNoInputFiles = false;

    private projectReferences: readonly ProjectReference[] | undefined;

    /**
     * Potential project references before the project is actually loaded (read config file)
     *
     * @internal
     */
    potentialProjectReferences: Set<NormalizedPath> | undefined;

    /** @internal */
    projectOptions?: ProjectOptions | true;

    /** @internal */
    override isInitialLoadPending: () => boolean = returnTrue;

    /** @internal */
    sendLoadingProjectFinish = false;

    private compilerHost?: CompilerHost;

    /** @internal */
    configDiagDiagnosticsReported?: number;

    /** @internal */
    triggerFileForConfigFileDiag?: NormalizedPath;

    /** @internal */
    deferredClose?: boolean;

    /** @internal */
    constructor(
        configFileName: NormalizedPath,
        readonly canonicalConfigFilePath: NormalizedPath,
        projectService: ProjectService,
        documentRegistry: DocumentRegistry,
        cachedDirectoryStructureHost: CachedDirectoryStructureHost,
        pendingUpdateReason: string,
    ) {
        super(configFileName, ProjectKind.Configured, projectService, documentRegistry, /*hasExplicitListOfFiles*/ false, /*lastFileExceededProgramSize*/ undefined, /*compilerOptions*/ {}, /*compileOnSaveEnabled*/ false, /*watchOptions*/ undefined, cachedDirectoryStructureHost, getDirectoryPath(configFileName));
        this.pendingUpdateLevel = ProgramUpdateLevel.Full;
        this.pendingUpdateReason = pendingUpdateReason;
    }

    /** @internal */
    setCompilerHost(host: CompilerHost) {
        this.compilerHost = host;
    }

    /** @internal */
    getCompilerHost(): CompilerHost | undefined {
        return this.compilerHost;
    }

    /** @internal */
    override useSourceOfProjectReferenceRedirect() {
        return this.languageServiceEnabled;
    }

    /** @internal */
    override getParsedCommandLine(fileName: string) {
        const configFileName = asNormalizedPath(normalizePath(fileName));
        const canonicalConfigFilePath = asNormalizedPath(this.projectService.toCanonicalFileName(configFileName));
        // Ensure the config file existience info is cached
        let configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        if (!configFileExistenceInfo) {
            this.projectService.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo = { exists: this.projectService.host.fileExists(configFileName) });
        }
        // Ensure we have upto date parsed command line
        this.projectService.ensureParsedConfigUptoDate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, this);
        // Watch wild cards if LS is enabled
        if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic) {
            this.projectService.watchWildcards(configFileName, configFileExistenceInfo, this);
        }
        return configFileExistenceInfo.exists ? configFileExistenceInfo.config!.parsedCommandLine : undefined;
    }

    /** @internal */
    onReleaseParsedCommandLine(fileName: string) {
        this.releaseParsedConfig(asNormalizedPath(this.projectService.toCanonicalFileName(asNormalizedPath(normalizePath(fileName)))));
    }

    private releaseParsedConfig(canonicalConfigFilePath: NormalizedPath) {
        this.projectService.stopWatchingWildCards(canonicalConfigFilePath, this);
        this.projectService.releaseParsedConfig(canonicalConfigFilePath, this);
    }

    /**
     * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    override updateGraph(): boolean {
        if (this.deferredClose) return false;
        const isDirty = this.dirty;
        this.isInitialLoadPending = returnFalse;
        const updateLevel = this.pendingUpdateLevel;
        this.pendingUpdateLevel = ProgramUpdateLevel.Update;
        let result: boolean;
        switch (updateLevel) {
            case ProgramUpdateLevel.RootNamesAndUpdate:
                this.openFileWatchTriggered.clear();
                result = this.projectService.reloadFileNamesOfConfiguredProject(this);
                break;
            case ProgramUpdateLevel.Full:
                this.openFileWatchTriggered.clear();
                const reason = Debug.checkDefined(this.pendingUpdateReason);
                this.projectService.reloadConfiguredProject(this, reason);
                result = true;
                break;
            default:
                result = super.updateGraph();
        }
        this.compilerHost = undefined;
        this.projectService.sendProjectLoadingFinishEvent(this);
        this.projectService.sendProjectTelemetry(this);
        if (
            updateLevel === ProgramUpdateLevel.Full || ( // Already sent event through reload
                result && ( // Not new program
                    !isDirty ||
                    !this.triggerFileForConfigFileDiag ||
                    this.getCurrentProgram()!.structureIsReused === StructureIsReused.Completely
                )
            )
        ) {
            // Dont send the configFileDiag
            this.triggerFileForConfigFileDiag = undefined;
        }
        else if (!this.triggerFileForConfigFileDiag) {
            // If we arent tracking to send configFileDiag, send event if diagnostics presence has changed
            this.projectService.sendConfigFileDiagEvent(this, /*triggerFile*/ undefined, /*force*/ false);
        }
        return result;
    }

    /** @internal */
    override getCachedDirectoryStructureHost() {
        return this.directoryStructureHost as CachedDirectoryStructureHost;
    }

    getConfigFilePath() {
        return asNormalizedPath(this.getProjectName());
    }

    override getProjectReferences(): readonly ProjectReference[] | undefined {
        return this.projectReferences;
    }

    updateReferences(refs: readonly ProjectReference[] | undefined) {
        this.projectReferences = refs;
        this.potentialProjectReferences = undefined;
    }

    /** @internal */
    setPotentialProjectReference(canonicalConfigPath: NormalizedPath) {
        Debug.assert(this.isInitialLoadPending());
        (this.potentialProjectReferences || (this.potentialProjectReferences = new Set())).add(canonicalConfigPath);
    }

    /** @internal */
    override getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined {
        const program = this.getCurrentProgram();
        return program && program.getResolvedProjectReferenceToRedirect(fileName);
    }

    /** @internal */
    forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    ): T | undefined {
        return this.getCurrentProgram()?.forEachResolvedProjectReference(cb);
    }

    /** @internal */
    enablePluginsWithOptions(options: CompilerOptions): void {
        this.plugins.length = 0;
        if (!options.plugins?.length && !this.projectService.globalPlugins.length) return;
        const host = this.projectService.host;
        if (!host.require && !host.importPlugin) {
            this.projectService.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
            return;
        }

        const searchPaths = this.getGlobalPluginSearchPaths();
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

        return this.enableGlobalPlugins(options);
    }

    /**
     * Get the errors that dont have any file name associated
     */
    override getGlobalProjectErrors(): readonly Diagnostic[] {
        return filter(this.projectErrors, diagnostic => !diagnostic.file) || emptyArray;
    }

    /**
     * Get all the project errors
     */
    override getAllProjectErrors(): readonly Diagnostic[] {
        return this.projectErrors || emptyArray;
    }

    override setProjectErrors(projectErrors: Diagnostic[]) {
        this.projectErrors = projectErrors;
    }

    override close() {
        this.projectService.configFileExistenceInfoCache.forEach((_configFileExistenceInfo, canonicalConfigFilePath) => this.releaseParsedConfig(canonicalConfigFilePath));
        this.projectErrors = undefined;
        this.openFileWatchTriggered.clear();
        this.compilerHost = undefined;
        super.close();
    }

    /** @internal */
    override markAsDirty() {
        if (this.deferredClose) return;
        super.markAsDirty();
    }

    /** @internal */
    isSolution() {
        return this.getRootFilesMap().size === 0 &&
            !this.canConfigFileJsonReportNoInputFiles;
    }

    /** @internal */
    override isOrphan(): boolean {
        return !!this.deferredClose;
    }

    getEffectiveTypeRoots() {
        return getEffectiveTypeRoots(this.getCompilationSettings(), this) || [];
    }

    /** @internal */
    updateErrorOnNoInputFiles(fileNames: string[]) {
        updateErrorForNoInputFiles(fileNames, this.getConfigFilePath(), this.getCompilerOptions().configFile!.configFileSpecs!, this.projectErrors!, this.canConfigFileJsonReportNoInputFiles);
    }
}

/**
 * Project whose configuration is handled externally, such as in a '.csproj'.
 * These are created only if a host explicitly calls `openExternalProject`.
 */
export class ExternalProject extends Project {
    excludedFiles: readonly NormalizedPath[] = [];
    /** @internal */
    constructor(public externalProjectName: string, projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions, lastFileExceededProgramSize: string | undefined, public override compileOnSaveEnabled: boolean, projectFilePath?: string, watchOptions?: WatchOptions) {
        super(externalProjectName, ProjectKind.External, projectService, documentRegistry, /*hasExplicitListOfFiles*/ true, lastFileExceededProgramSize, compilerOptions, compileOnSaveEnabled, watchOptions, projectService.host, getDirectoryPath(projectFilePath || normalizeSlashes(externalProjectName)));
        this.enableGlobalPlugins(this.getCompilerOptions());
    }

    override updateGraph() {
        const result = super.updateGraph();
        this.projectService.sendProjectTelemetry(this);
        return result;
    }

    override getExcludedFiles() {
        return this.excludedFiles;
    }
}

/** @internal */
export function isInferredProject(project: Project): project is InferredProject {
    return project.projectKind === ProjectKind.Inferred;
}

/** @internal */
export function isConfiguredProject(project: Project): project is ConfiguredProject {
    return project.projectKind === ProjectKind.Configured;
}

/** @internal */
export function isExternalProject(project: Project): project is ExternalProject {
    return project.projectKind === ProjectKind.External;
}

/**@internal */
export function isBackgroundProject(project: Project): project is AutoImportProviderProject | AuxiliaryProject {
    return project.projectKind === ProjectKind.AutoImportProvider || project.projectKind === ProjectKind.Auxiliary;
}

/** @internal */
export function isProjectDeferredClose(project: Project): project is ConfiguredProject {
    return isConfiguredProject(project) && !!project.deferredClose;
}

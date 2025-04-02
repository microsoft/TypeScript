import {
    addToSeen,
    arrayFrom,
    AssertionLevel,
    CachedDirectoryStructureHost,
    canWatchDirectoryOrFilePath,
    cleanExtendedConfigCache,
    clearMap,
    clearSharedExtendedConfigFileWatcher,
    closeFileWatcherOf,
    combinePaths,
    CommandLineOption,
    CompilerOptions,
    CompletionInfo,
    contains,
    containsPath,
    convertCompilerOptionsForTelemetry,
    convertJsonOption,
    createCachedDirectoryStructureHost,
    createDocumentRegistryInternal,
    createGetCanonicalFileName,
    createMultiMap,
    Debug,
    Diagnostic,
    directorySeparator,
    DirectoryStructureHost,
    DirectoryWatcherCallback,
    DocumentPosition,
    DocumentPositionMapper,
    DocumentRegistry,
    DocumentRegistryBucketKeyWithMode,
    emptyOptions,
    endsWith,
    ensureTrailingDirectorySeparator,
    equateStringsCaseInsensitive,
    equateStringsCaseSensitive,
    ExtendedConfigCacheEntry,
    FileExtensionInfo,
    fileExtensionIs,
    FileWatcher,
    FileWatcherCallback,
    FileWatcherEventKind,
    find,
    forEach,
    forEachAncestorDirectoryStoppingAtGlobalCache,
    forEachEntry,
    forEachKey,
    forEachResolvedProjectReference,
    FormatCodeSettings,
    getAnyExtensionFromPath,
    getBaseFileName,
    getDefaultFormatCodeSettings,
    getDirectoryPath,
    getDocumentPositionMapper,
    getFileNamesFromConfigSpecs,
    getFileWatcherEventKind,
    getNormalizedAbsolutePath,
    getPatternFromSpec,
    getRegexFromPattern,
    getSnapshotText,
    getWatchFactory,
    handleWatchOptionsConfigDirTemplateSubstitution,
    hasExtension,
    hasProperty,
    hasTSFileExtension,
    HostCancellationToken,
    identity,
    IncompleteCompletionsCache,
    IndentStyle,
    isArray,
    isExternalModuleNameRelative,
    isIgnoredFileFromWildCardWatching,
    isInsideNodeModules,
    isJsonEqual,
    isNodeModulesDirectory,
    isRootedDiskPath,
    isSolutionConfig,
    isString,
    isSupportedSourceFileName,
    JSDocParsingMode,
    LanguageServiceMode,
    length,
    map,
    mapDefinedIterator,
    matchesExcludeWorker,
    memoize,
    missingFileModifiedTime,
    MultiMap,
    noop,
    normalizeSlashes,
    notImplemented,
    optionDeclarations,
    optionsForWatch,
    orderedRemoveItem,
    PackageJsonAutoImportPreference,
    ParsedCommandLine,
    parseJsonSourceFileConfigFileContent,
    parseJsonText,
    Path,
    PerformanceEvent,
    PluginImport,
    PollingInterval,
    ProgramUpdateLevel,
    ProjectPackageJsonInfo,
    ProjectReference,
    ReadMapFile,
    ReadonlyCollection,
    removeFileExtension,
    removeIgnoredPath,
    removeMinAndVersionNumbers,
    ResolvedProjectReference,
    resolveProjectReferencePath,
    returnFalse,
    returnNoopFileWatcher,
    ScriptKind,
    SharedExtendedConfigFileWatcher,
    some,
    SourceFile,
    SourceFileLike,
    startsWith,
    Ternary,
    TextChange,
    toFileNameLowerCase,
    toPath,
    tracing,
    tryAddToSet,
    tryReadFile,
    TsConfigSourceFile,
    TypeAcquisition,
    typeAcquisitionDeclarations,
    unorderedRemoveItem,
    updateSharedExtendedConfigFileWatcher,
    updateWatchingWildcardDirectories,
    UserPreferences,
    version,
    WatchDirectoryFlags,
    WatchFactory,
    WatchFactoryHost,
    WatchLogLevel,
    WatchOptions,
    WatchType,
    WildcardDirectoryWatcher,
} from "./_namespaces/ts.js";
import {
    ActionInvalidate,
    ActionSet,
    asNormalizedPath,
    AutoImportProviderProject,
    AuxiliaryProject,
    BeginEnablePluginResult,
    BeginInstallTypes,
    ConfiguredProject,
    countEachFileTypes,
    createPackageJsonCache,
    emptyArray,
    EndInstallTypes,
    Errors,
    ExternalProject,
    getBaseConfigFileName,
    hasNoTypeScriptSource,
    InferredProject,
    InvalidateCachedTypings,
    isBackgroundProject,
    isConfiguredProject,
    isDynamicFileName,
    isExternalProject,
    isInferredProject,
    isInferredProjectName,
    isProjectDeferredClose,
    ITypingsInstaller,
    Logger,
    LogLevel,
    makeAutoImportProviderProjectName,
    makeAuxiliaryProjectName,
    makeInferredProjectName,
    Msg,
    NormalizedPath,
    normalizedPathToPath,
    PackageInstalledResponse,
    PackageJsonCache,
    Project,
    ProjectFilesWithTSDiagnostics,
    ProjectKind,
    ProjectOptions,
    ScriptInfo,
    scriptInfoIsContainedByBackgroundProject,
    scriptInfoIsContainedByDeferredClosedProject,
    ServerHost,
    Session,
    SetTypings,
    ThrottledOperations,
    toNormalizedPath,
    WatchTypingLocations,
} from "./_namespaces/ts.server.js";
import * as protocol from "./protocol.js";

export const maxProgramSizeForNonTsFiles: number = 20 * 1024 * 1024;
/** @internal */
export const maxFileSize: number = 4 * 1024 * 1024;

export const ProjectsUpdatedInBackgroundEvent = "projectsUpdatedInBackground";
export const ProjectLoadingStartEvent = "projectLoadingStart";
export const ProjectLoadingFinishEvent = "projectLoadingFinish";
export const LargeFileReferencedEvent = "largeFileReferenced";
export const ConfigFileDiagEvent = "configFileDiag";
export const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
export const ProjectInfoTelemetryEvent = "projectInfo";
export const OpenFileInfoTelemetryEvent = "openFileInfo";
export const CreateFileWatcherEvent: protocol.CreateFileWatcherEventName = "createFileWatcher";
export const CreateDirectoryWatcherEvent: protocol.CreateDirectoryWatcherEventName = "createDirectoryWatcher";
export const CloseFileWatcherEvent: protocol.CloseFileWatcherEventName = "closeFileWatcher";
const ensureProjectForOpenFileSchedule = "*ensureProjectForOpenFiles*";

export interface ProjectsUpdatedInBackgroundEvent {
    eventName: typeof ProjectsUpdatedInBackgroundEvent;
    data: { openFiles: string[]; };
}

export interface ProjectLoadingStartEvent {
    eventName: typeof ProjectLoadingStartEvent;
    data: { project: Project; reason: string; };
}

export interface ProjectLoadingFinishEvent {
    eventName: typeof ProjectLoadingFinishEvent;
    data: { project: Project; };
}

export interface LargeFileReferencedEvent {
    eventName: typeof LargeFileReferencedEvent;
    data: { file: string; fileSize: number; maxFileSize: number; };
}

export interface ConfigFileDiagEvent {
    eventName: typeof ConfigFileDiagEvent;
    data: { triggerFile: string; configFileName: string; diagnostics: readonly Diagnostic[]; };
}

export interface ProjectLanguageServiceStateEvent {
    eventName: typeof ProjectLanguageServiceStateEvent;
    data: { project: Project; languageServiceEnabled: boolean; };
}

/** This will be converted to the payload of a protocol.TelemetryEvent in session.defaultEventHandler. */
export interface ProjectInfoTelemetryEvent {
    readonly eventName: typeof ProjectInfoTelemetryEvent;
    readonly data: ProjectInfoTelemetryEventData;
}

/* __GDPR__
    "projectInfo" : {
        "${include}": ["${TypeScriptCommonProperties}"],
        "projectId": { "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight", "endpoint": "ProjectId" },
        "fileStats": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "compilerOptions": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "extends": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "files": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "include": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "exclude": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "compileOnSave": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "typeAcquisition": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "configFileName": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "projectType": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "languageServiceEnabled": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
        "version": { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    }
 */
export interface ProjectInfoTelemetryEventData {
    /** Cryptographically secure hash of project file location. */
    readonly projectId: string;
    /** Count of file extensions seen in the project. */
    readonly fileStats: FileStats;
    /**
     * Any compiler options that might contain paths will be taken out.
     * Enum compiler options will be converted to strings.
     */
    readonly compilerOptions: CompilerOptions;
    // "extends", "files", "include", or "exclude" will be undefined if an external config is used.
    // Otherwise, we will use "true" if the property is present and "false" if it is missing.
    readonly extends: boolean | undefined;
    readonly files: boolean | undefined;
    readonly include: boolean | undefined;
    readonly exclude: boolean | undefined;
    readonly compileOnSave: boolean;
    readonly typeAcquisition: ProjectInfoTypeAcquisitionData;

    readonly configFileName: "tsconfig.json" | "jsconfig.json" | "other";
    readonly projectType: "external" | "configured";
    readonly languageServiceEnabled: boolean;
    /** TypeScript version used by the server. */
    readonly version: string;
}

/**
 * Info that we may send about a file that was just opened.
 * Info about a file will only be sent once per session, even if the file changes in ways that might affect the info.
 * Currently this is only sent for '.js' files.
 */
export interface OpenFileInfoTelemetryEvent {
    readonly eventName: typeof OpenFileInfoTelemetryEvent;
    readonly data: OpenFileInfoTelemetryEventData;
}

export interface OpenFileInfoTelemetryEventData {
    readonly info: OpenFileInfo;
}

export interface ProjectInfoTypeAcquisitionData {
    readonly enable: boolean | undefined;
    // Actual values of include/exclude entries are scrubbed.
    readonly include: boolean;
    readonly exclude: boolean;
}

export interface FileStats {
    readonly js: number;
    readonly jsSize?: number;

    readonly jsx: number;
    readonly jsxSize?: number;

    readonly ts: number;
    readonly tsSize?: number;

    readonly tsx: number;
    readonly tsxSize?: number;

    readonly dts: number;
    readonly dtsSize?: number;

    readonly deferred: number;
    readonly deferredSize?: number;
}

export interface OpenFileInfo {
    readonly checkJs: boolean;
}

export interface CreateFileWatcherEvent {
    readonly eventName: protocol.CreateFileWatcherEventName;
    readonly data: protocol.CreateFileWatcherEventBody;
}

export interface CreateDirectoryWatcherEvent {
    readonly eventName: protocol.CreateDirectoryWatcherEventName;
    readonly data: protocol.CreateDirectoryWatcherEventBody;
}

export interface CloseFileWatcherEvent {
    readonly eventName: protocol.CloseFileWatcherEventName;
    readonly data: protocol.CloseFileWatcherEventBody;
}

export type ProjectServiceEvent =
    | LargeFileReferencedEvent
    | ProjectsUpdatedInBackgroundEvent
    | ProjectLoadingStartEvent
    | ProjectLoadingFinishEvent
    | ConfigFileDiagEvent
    | ProjectLanguageServiceStateEvent
    | ProjectInfoTelemetryEvent
    | OpenFileInfoTelemetryEvent
    | CreateFileWatcherEvent
    | CreateDirectoryWatcherEvent
    | CloseFileWatcherEvent;

export type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;

/** @internal */
export type PerformanceEventHandler = (event: PerformanceEvent) => void;

export interface SafeList {
    [name: string]: { match: RegExp; exclude?: (string | number)[][]; types?: string[]; };
}

function prepareConvertersForEnumLikeCompilerOptions(commandLineOptions: CommandLineOption[]): Map<string, Map<string, number>> {
    const map = new Map<string, Map<string, number>>();
    for (const option of commandLineOptions) {
        if (typeof option.type === "object") {
            const optionMap = option.type as Map<string, number>;
            // verify that map contains only numbers
            optionMap.forEach(value => {
                Debug.assert(typeof value === "number");
            });
            map.set(option.name, optionMap);
        }
    }
    return map;
}

const compilerOptionConverters = prepareConvertersForEnumLikeCompilerOptions(optionDeclarations);
const watchOptionsConverters = prepareConvertersForEnumLikeCompilerOptions(optionsForWatch);
const indentStyle = new Map(Object.entries({
    none: IndentStyle.None,
    block: IndentStyle.Block,
    smart: IndentStyle.Smart,
}));

export interface TypesMapFile {
    typesMap: SafeList;
    simpleMap: { [libName: string]: string; };
}

/**
 * How to understand this block:
 *  * The 'match' property is a regexp that matches a filename.
 *  * If 'match' is successful, then:
 *     * All files from 'exclude' are removed from the project. See below.
 *     * All 'types' are included in ATA
 *  * What the heck is 'exclude' ?
 *     * An array of an array of strings and numbers
 *     * Each array is:
 *       * An array of strings and numbers
 *       * The strings are literals
 *       * The numbers refer to capture group indices from the 'match' regexp
 *          * Remember that '1' is the first group
 *       * These are concatenated together to form a new regexp
 *       * Filenames matching these regexps are excluded from the project
 * This default value is tested in tsserverProjectSystem.ts; add tests there
 *   if you are changing this so that you can be sure your regexp works!
 */
const defaultTypeSafeList: SafeList = {
    "jquery": {
        // jquery files can have names like "jquery-1.10.2.min.js" (or "jquery.intellisense.js")
        match: /jquery(-[\d.]+)?(\.intellisense)?(\.min)?\.js$/i,
        types: ["jquery"],
    },
    "WinJS": {
        // e.g. c:/temp/UWApp1/lib/winjs-4.0.1/js/base.js
        match: /^(.*\/winjs-[.\d]+)\/js\/base\.js$/i, // If the winjs/base.js file is found..
        exclude: [["^", 1, "/.*"]], // ..then exclude all files under the winjs folder
        types: ["winjs"], // And fetch the @types package for WinJS
    },
    "Kendo": {
        // e.g. /Kendo3/wwwroot/lib/kendo/kendo.all.min.js
        match: /^(.*\/kendo(-ui)?)\/kendo\.all(\.min)?\.js$/i,
        exclude: [["^", 1, "/.*"]],
        types: ["kendo-ui"],
    },
    "Office Nuget": {
        // e.g. /scripts/Office/1/excel-15.debug.js
        match: /^(.*\/office\/1)\/excel-\d+\.debug\.js$/i, // Office NuGet package is installed under a "1/office" folder
        exclude: [["^", 1, "/.*"]], // Exclude that whole folder if the file indicated above is found in it
        types: ["office"], // @types package to fetch instead
    },
    "References": {
        match: /^(.*\/_references\.js)$/i,
        exclude: [["^", 1, "$"]],
    },
};

export function convertFormatOptions(protocolOptions: protocol.FormatCodeSettings): FormatCodeSettings {
    if (isString(protocolOptions.indentStyle)) {
        protocolOptions.indentStyle = indentStyle.get(protocolOptions.indentStyle.toLowerCase());
        Debug.assert(protocolOptions.indentStyle !== undefined);
    }
    return protocolOptions as any;
}

export function convertCompilerOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): CompilerOptions & protocol.CompileOnSaveMixin {
    compilerOptionConverters.forEach((mappedValues, id) => {
        const propertyValue = protocolOptions[id];
        if (isString(propertyValue)) {
            protocolOptions[id] = mappedValues.get(propertyValue.toLowerCase());
        }
    });
    return protocolOptions as any;
}

export function convertWatchOptions(protocolOptions: protocol.ExternalProjectCompilerOptions, currentDirectory?: string): WatchOptionsAndErrors | undefined {
    let watchOptions: WatchOptions | undefined;
    let errors: Diagnostic[] | undefined;
    optionsForWatch.forEach(option => {
        const propertyValue = protocolOptions[option.name];
        if (propertyValue === undefined) return;
        const mappedValues = watchOptionsConverters.get(option.name);
        (watchOptions || (watchOptions = {}))[option.name] = mappedValues ?
            isString(propertyValue) ? mappedValues.get(propertyValue.toLowerCase()) : propertyValue :
            convertJsonOption(option, propertyValue, currentDirectory || "", errors || (errors = []));
    });
    return watchOptions && { watchOptions, errors };
}

export function convertTypeAcquisition(protocolOptions: protocol.InferredProjectCompilerOptions): TypeAcquisition | undefined {
    let result: TypeAcquisition | undefined;
    typeAcquisitionDeclarations.forEach(option => {
        const propertyValue = protocolOptions[option.name];
        if (propertyValue === undefined) return;
        (result || (result = {}))[option.name] = propertyValue;
    });
    return result;
}

export function tryConvertScriptKindName(scriptKindName: protocol.ScriptKindName | ScriptKind): ScriptKind {
    return isString(scriptKindName) ? convertScriptKindName(scriptKindName) : scriptKindName;
}

export function convertScriptKindName(scriptKindName: protocol.ScriptKindName): ScriptKind {
    switch (scriptKindName) {
        case "JS":
            return ScriptKind.JS;
        case "JSX":
            return ScriptKind.JSX;
        case "TS":
            return ScriptKind.TS;
        case "TSX":
            return ScriptKind.TSX;
        default:
            return ScriptKind.Unknown;
    }
}

/** @internal */
export function convertUserPreferences(preferences: protocol.UserPreferences): UserPreferences {
    const { lazyConfiguredProjectsFromExternalProject: _, ...userPreferences } = preferences;
    return userPreferences;
}

export interface HostConfiguration {
    formatCodeOptions: FormatCodeSettings;
    preferences: protocol.UserPreferences;
    hostInfo: string;
    extraFileExtensions?: FileExtensionInfo[];
    watchOptions?: WatchOptions;
    /** @internal */ beforeSubstitution?: WatchOptions;
}

export interface OpenConfiguredProjectResult {
    configFileName?: NormalizedPath;
    configFileErrors?: readonly Diagnostic[];
}

interface AssignProjectResult extends OpenConfiguredProjectResult {
    retainProjects: ConfigureProjectToLoadKind | undefined;
}

interface FilePropertyReader<T> {
    getFileName(f: T): string;
    getScriptKind(f: T, extraFileExtensions?: FileExtensionInfo[]): ScriptKind;
    hasMixedContent(f: T, extraFileExtensions: FileExtensionInfo[] | undefined): boolean;
}

const fileNamePropertyReader: FilePropertyReader<string> = {
    getFileName: x => x,
    getScriptKind: (fileName, extraFileExtensions) => {
        let result: ScriptKind | undefined;
        if (extraFileExtensions) {
            const fileExtension = getAnyExtensionFromPath(fileName);
            if (fileExtension) {
                some(extraFileExtensions, info => {
                    if (info.extension === fileExtension) {
                        result = info.scriptKind;
                        return true;
                    }
                    return false;
                });
            }
        }
        return result!; // TODO: GH#18217
    },
    hasMixedContent: (fileName, extraFileExtensions) => some(extraFileExtensions, ext => ext.isMixedContent && fileExtensionIs(fileName, ext.extension)),
};

const externalFilePropertyReader: FilePropertyReader<protocol.ExternalFile> = {
    getFileName: x => x.fileName,
    getScriptKind: x => tryConvertScriptKindName(x.scriptKind!), // TODO: GH#18217
    hasMixedContent: x => !!x.hasMixedContent,
};

function findProjectByName<T extends Project>(projectName: string, projects: T[]): T | undefined {
    for (const proj of projects) {
        if (proj.getProjectName() === projectName) {
            return proj;
        }
    }
}

export const nullTypingsInstaller: ITypingsInstaller = {
    isKnownTypesPackageName: returnFalse,
    // Should never be called because we never provide a types registry.
    installPackage: notImplemented,
    enqueueInstallTypingsRequest: noop,
    attach: noop,
    onProjectClosed: noop,
    globalTypingsCacheLocation: undefined!, // TODO: GH#18217
};

const noopConfigFileWatcher: FileWatcher = { close: noop };

/** @internal */
export interface ConfigFileExistenceInfo {
    /**
     * Cached value of existence of config file
     * It is true if there is configured project open for this file.
     * It can be either true or false if this is the config file that is being watched by inferred project
     *   to decide when to update the structure so that it knows about updating the project for its files
     *   (config file may include the inferred project files after the change and hence may be wont need to be in inferred project)
     */
    exists: boolean;
    /**
     * Tracks how many open files are impacted by this config file that are root of inferred project
     */
    inferredProjectRoots?: number;
    /**
     * openFilesImpactedByConfigFiles is a map of open files that would be impacted by this config file
     *   because these are the paths being looked up for their default configured project location
     */
    openFilesImpactedByConfigFile?: Set<Path>;
    /**
     * The file watcher watching the config file because there is open script info that is root of
     * inferred project and will be impacted by change in the status of the config file
     * or
     * Configured project for this config file is open
     * or
     * Configured project references this config file
     */
    watcher?: FileWatcher;
    /**
     * Cached parsed command line and other related information like watched directories etc
     */
    config?: ParsedConfig;
}

export interface ProjectServiceOptions {
    host: ServerHost;
    logger: Logger;
    cancellationToken: HostCancellationToken;
    useSingleInferredProject: boolean;
    useInferredProjectPerProjectRoot: boolean;
    typingsInstaller?: ITypingsInstaller;
    eventHandler?: ProjectServiceEventHandler;
    canUseWatchEvents?: boolean;
    suppressDiagnosticEvents?: boolean;
    throttleWaitMilliseconds?: number;
    globalPlugins?: readonly string[];
    pluginProbeLocations?: readonly string[];
    allowLocalPluginLoads?: boolean;
    typesMapLocation?: string;
    serverMode?: LanguageServiceMode;
    session: Session<unknown> | undefined;
    /** @internal */ incrementalVerifier?: (service: ProjectService) => void;
    jsDocParsingMode?: JSDocParsingMode;
}

/**
 * string if file name,
 * false if no config file name
 * @internal
 */
export type ConfigFileName = NormalizedPath | false;

/**
 * Stores cached config file name for info as well as ancestor so is a map
 * Key is false for Open ScriptInfo
 * Key is NormalizedPath for Config file name
 * @internal
 */
export type ConfigFileMapForOpenFile = Map<ConfigFileName, ConfigFileName>;

/**
 * The cache for open script info will have
 * ConfigFileName or false if ancestors are not looked up
 * Map if ancestors are looked up
 * @internal
 */
export type ConfigFileForOpenFile = ConfigFileName | ConfigFileMapForOpenFile;

/** Gets cached value of config file name based on open script info or ancestor script info */
function getConfigFileNameFromCache(info: OpenScriptInfoOrClosedOrConfigFileInfo, cache: Map<Path, ConfigFileForOpenFile> | undefined): ConfigFileName | undefined {
    if (!cache) return undefined;
    const configFileForOpenFile = cache.get(info.path);
    if (configFileForOpenFile === undefined) return undefined;
    if (!isAncestorConfigFileInfo(info)) {
        return isString(configFileForOpenFile) || !configFileForOpenFile ?
            configFileForOpenFile : // direct result
            configFileForOpenFile.get(/*key*/ false); // Its a map, use false as the key for the info's config file name
    }
    else {
        return configFileForOpenFile && !isString(configFileForOpenFile) ? // Map with fileName as key
            configFileForOpenFile.get(info.fileName) :
            undefined; // No result for the config file name
    }
}

/** @internal */
export interface OriginalFileInfo {
    fileName: NormalizedPath;
    path: Path;
}
/** @internal */
export interface AncestorConfigFileInfo {
    /** config file name */
    fileName: NormalizedPath;
    /** path of open file so we can look at correct root */
    path: Path;
    configFileInfo: true;
    isForDefaultProject: boolean;
}
/** @internal */
export type OpenScriptInfoOrClosedFileInfo = ScriptInfo | OriginalFileInfo;
/** @internal */
export type OpenScriptInfoOrClosedOrConfigFileInfo = OpenScriptInfoOrClosedFileInfo | AncestorConfigFileInfo;

function isOpenScriptInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is ScriptInfo {
    return !!(infoOrFileNameOrConfig as ScriptInfo).containingProjects;
}

function isAncestorConfigFileInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is AncestorConfigFileInfo {
    return !!(infoOrFileNameOrConfig as AncestorConfigFileInfo).configFileInfo;
}

/** @internal */
export enum ConfiguredProjectLoadKind {
    FindOptimized,
    Find,
    CreateReplayOptimized,
    CreateReplay,
    CreateOptimized,
    Create,
    ReloadOptimized,
    Reload,
}

type ConguredProjectLoadFindCreateOrReload =
    | ConfiguredProjectLoadKind.Find
    | ConfiguredProjectLoadKind.CreateReplay
    | ConfiguredProjectLoadKind.Create
    | ConfiguredProjectLoadKind.Reload;

type ConguredProjectLoadFindCreateOrReloadOptimized =
    | ConfiguredProjectLoadKind.FindOptimized
    | ConfiguredProjectLoadKind.CreateReplayOptimized
    | ConfiguredProjectLoadKind.CreateOptimized
    | ConfiguredProjectLoadKind.ReloadOptimized;

function toConfiguredProjectLoadOptimized(kind: ConguredProjectLoadFindCreateOrReload): ConguredProjectLoadFindCreateOrReloadOptimized {
    return kind - 1;
}

/** @internal */
export type ConfigureProjectToLoadKind = Map<ConfiguredProject, ConfiguredProjectLoadKind>;

/** @internal */
export type ConfiguredProjectToAnyReloadKind = Map<
    ConfiguredProject,
    | ConfiguredProjectLoadKind.Reload
    | ConfiguredProjectLoadKind.ReloadOptimized
>;

/** @internal */
export type DefaultConfiguredProjectResult = ReturnType<ProjectService["tryFindDefaultConfiguredProjectForOpenScriptInfoOrClosedFileInfo"]>;

/** @internal */
export interface FindCreateOrLoadConfiguredProjectResult {
    project: ConfiguredProject;
    sentConfigFileDiag: boolean;
    configFileExistenceInfo: ConfigFileExistenceInfo | undefined;
    reason: string | undefined;
}

/**
 * Goes through each tsconfig from project till project root of open script info and finds, creates or reloads project per kind
 */
function forEachAncestorProjectLoad<T>(
    info: ScriptInfo,
    project: ConfiguredProject,
    cb: (ancestor: FindCreateOrLoadConfiguredProjectResult) => T | undefined,
    kind: ConfiguredProjectLoadKind,
    /** Used with ConfiguredProjectLoadKind.Create or ConfiguredProjectLoadKind.Reload for new projects or reload updates */
    reason: string,
    /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
    allowDeferredClosed: boolean | undefined,
    /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
    reloadedProjects: ConfiguredProjectToAnyReloadKind | undefined,
    /** true means we are looking for solution, so we can stop if found project is not composite to go into parent solution */
    searchOnlyPotentialSolution: boolean,
    /** Used with ConfiguredProjectLoadKind.Reload to specify delay reload, and also a set of configured projects already marked for delay load */
    delayReloadedConfiguredProjects?: Set<ConfiguredProject>,
): T | undefined {
    // Create configured project till project root
    while (true) {
        // Skip if project is not composite and we are only looking for solution
        if (
            project.parsedCommandLine &&
            (
                (searchOnlyPotentialSolution && !project.parsedCommandLine.options.composite) ||
                // Currently disableSolutionSearching is shared for finding solution/project when
                // - loading solution for find all references
                // - trying to find default project
                project.parsedCommandLine.options.disableSolutionSearching
            )
        ) return;

        // Get config file name
        const configFileName = project.projectService.getConfigFileNameForFile(
            {
                fileName: project.getConfigFilePath(),
                path: info.path,
                configFileInfo: true,
                isForDefaultProject: !searchOnlyPotentialSolution,
            },
            kind <= ConfiguredProjectLoadKind.CreateReplay,
        );
        if (!configFileName) return;

        // find or delay load the project
        const ancestor = project.projectService.findCreateOrReloadConfiguredProject(
            configFileName,
            kind,
            reason,
            allowDeferredClosed,
            !searchOnlyPotentialSolution ? info.fileName : undefined, // Config Diag event for project if its for default project
            reloadedProjects,
            searchOnlyPotentialSolution, // Delay load if we are searching for solution
            delayReloadedConfiguredProjects,
        );
        if (!ancestor) return;

        // If this ancestor is new and was delay loaded, then set the project as potential project reference
        if (
            !ancestor.project.parsedCommandLine &&
            project.parsedCommandLine?.options.composite
        ) {
            // Set a potential project reference
            ancestor.project.setPotentialProjectReference(project.canonicalConfigFilePath);
        }
        const result = cb(ancestor);
        if (result) return result;
        project = ancestor.project;
    }
}

/**
 * Goes through parentConfig's project references and finds, creates or reloads project per kind
 */
function forEachResolvedProjectReferenceProjectLoad<T>(
    project: ConfiguredProject,
    parentConfig: ParsedCommandLine,
    cb: (
        childConfigFileExistenceInfo: ConfigFileExistenceInfo,
        childProject: ConfiguredProject | undefined,
        childConfigName: NormalizedPath,
        reason: string,
        project: ConfiguredProject,
        childCanonicalConfigPath: NormalizedPath,
    ) => T | undefined,
    kind: ConguredProjectLoadFindCreateOrReloadOptimized,
    reason: string,
    /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
    allowDeferredClosed: boolean | undefined,
    /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
    reloadedProjects: ConfiguredProjectToAnyReloadKind | undefined,
    seenResolvedRefs?: Map<string, ConfiguredProjectLoadKind>,
): T | undefined {
    const loadKind = parentConfig.options.disableReferencedProjectLoad ? ConfiguredProjectLoadKind.FindOptimized : kind;
    let children: ParsedCommandLine[] | undefined;
    return forEach(
        parentConfig.projectReferences,
        ref => {
            const childConfigName = toNormalizedPath(resolveProjectReferencePath(ref));
            const childCanonicalConfigPath = asNormalizedPath(project.projectService.toCanonicalFileName(childConfigName));

            const seenValue = seenResolvedRefs?.get(childCanonicalConfigPath);
            if (seenValue !== undefined && seenValue >= loadKind) return undefined;

            // Get the config
            const configFileExistenceInfo = project.projectService.configFileExistenceInfoCache.get(childCanonicalConfigPath);
            let childConfig = loadKind === ConfiguredProjectLoadKind.FindOptimized ?
                configFileExistenceInfo?.exists || project.resolvedChildConfigs?.has(childCanonicalConfigPath) ?
                    configFileExistenceInfo!.config!.parsedCommandLine : undefined :
                project.getParsedCommandLine(childConfigName);
            if (childConfig && loadKind !== kind && loadKind > ConfiguredProjectLoadKind.CreateReplayOptimized) {
                // If this was found using find: ensure this is uptodate if looking for creating or reloading
                childConfig = project.getParsedCommandLine(childConfigName);
            }
            if (!childConfig) return undefined;

            // Find the project
            const childProject = project.projectService.findConfiguredProjectByProjectName(childConfigName, allowDeferredClosed);
            // Ignore if we couldnt find child project or config file existence info
            if (
                loadKind === ConfiguredProjectLoadKind.CreateReplayOptimized &&
                !configFileExistenceInfo &&
                !childProject
            ) return undefined;
            switch (loadKind) {
                case ConfiguredProjectLoadKind.ReloadOptimized:
                    if (childProject) childProject.projectService.reloadConfiguredProjectOptimized(childProject, reason, reloadedProjects!);
                    // falls through
                case ConfiguredProjectLoadKind.CreateOptimized:
                    (project.resolvedChildConfigs ??= new Set()).add(childCanonicalConfigPath);
                // falls through
                case ConfiguredProjectLoadKind.CreateReplayOptimized:
                case ConfiguredProjectLoadKind.FindOptimized:
                    if (childProject || loadKind !== ConfiguredProjectLoadKind.FindOptimized) {
                        const result = cb(
                            configFileExistenceInfo ?? project.projectService.configFileExistenceInfoCache.get(childCanonicalConfigPath)!,
                            childProject,
                            childConfigName,
                            reason,
                            project,
                            childCanonicalConfigPath,
                        );
                        if (result) return result;
                    }
                    break;
                default:
                    Debug.assertNever(loadKind);
            }
            (seenResolvedRefs ??= new Map()).set(childCanonicalConfigPath, loadKind);
            (children ??= []).push(childConfig);
        },
    ) || forEach(
        children,
        childConfig =>
            childConfig.projectReferences && forEachResolvedProjectReferenceProjectLoad(
                project,
                childConfig,
                cb,
                loadKind,
                reason,
                allowDeferredClosed,
                reloadedProjects,
                seenResolvedRefs,
            ),
    );
}

function updateProjectFoundUsingFind(
    project: ConfiguredProject,
    kind: ConfiguredProjectLoadKind,
    /** Used with ConfiguredProjectLoadKind.Create to send configFileDiag */
    triggerFile?: NormalizedPath | undefined,
    /** Used with ConfiguredProjectLoadKind.Reload to for reload reason */
    reason?: string,
    /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
    reloadedProjects?: ConfiguredProjectToAnyReloadKind | undefined,
): FindCreateOrLoadConfiguredProjectResult {
    let sentConfigFileDiag = false;
    let configFileExistenceInfo: ConfigFileExistenceInfo | undefined;
    // This project was found using "Find" instead of the actually specified kind of "Create" or "Reload",
    // We need to update or reload this existing project before calling callback
    switch (kind) {
        case ConfiguredProjectLoadKind.CreateReplayOptimized:
        case ConfiguredProjectLoadKind.CreateReplay:
            if (useConfigFileExistenceInfoForOptimizedLoading(project)) {
                configFileExistenceInfo = project.projectService.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!;
            }
            break;
        case ConfiguredProjectLoadKind.CreateOptimized:
            configFileExistenceInfo = configFileExistenceInfoForOptimizedLoading(project);
            if (configFileExistenceInfo) break;
        // falls through
        case ConfiguredProjectLoadKind.Create:
            sentConfigFileDiag = updateConfiguredProject(project, triggerFile);
            break;
        case ConfiguredProjectLoadKind.ReloadOptimized:
            project.projectService.reloadConfiguredProjectOptimized(project, reason!, reloadedProjects!);
            configFileExistenceInfo = configFileExistenceInfoForOptimizedLoading(project);
            if (configFileExistenceInfo) break;
        // falls through
        case ConfiguredProjectLoadKind.Reload:
            sentConfigFileDiag = project.projectService.reloadConfiguredProjectClearingSemanticCache(
                project,
                reason!,
                reloadedProjects!,
            );
            break;
        case ConfiguredProjectLoadKind.FindOptimized:
        case ConfiguredProjectLoadKind.Find:
            break;
        default:
            Debug.assertNever(kind);
    }
    return { project, sentConfigFileDiag, configFileExistenceInfo, reason };
}

function forEachPotentialProjectReference<T>(
    project: ConfiguredProject,
    cb: (potentialProjectReference: NormalizedPath) => T | undefined,
): T | undefined {
    return project.initialLoadPending ?
        (project.potentialProjectReferences && forEachKey(project.potentialProjectReferences, cb)) ??
            (project.resolvedChildConfigs && forEachKey(project.resolvedChildConfigs, cb)) :
        undefined;
}

function forEachAnyProjectReferenceKind<T>(
    project: ConfiguredProject,
    cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    cbProjectRef: (projectReference: ProjectReference) => T | undefined,
    cbPotentialProjectRef: (potentialProjectReference: NormalizedPath) => T | undefined,
): T | undefined {
    return project.getCurrentProgram() ?
        project.forEachResolvedProjectReference(cb) :
        project.initialLoadPending ?
        forEachPotentialProjectReference(project, cbPotentialProjectRef) :
        forEach(project.getProjectReferences(), cbProjectRef);
}

function callbackRefProject<T, P extends string>(
    project: ConfiguredProject,
    cb: (refProj: ConfiguredProject) => T | undefined,
    refPath: P | undefined,
) {
    const refProject = refPath && project.projectService.configuredProjects.get(refPath);
    return refProject && cb(refProject);
}

function forEachReferencedProject<T>(
    project: ConfiguredProject,
    cb: (refProj: ConfiguredProject) => T | undefined,
): T | undefined {
    return forEachAnyProjectReferenceKind(
        project,
        resolvedRef => callbackRefProject(project, cb, resolvedRef.sourceFile.path),
        projectRef => callbackRefProject(project, cb, project.toPath(resolveProjectReferencePath(projectRef))),
        potentialProjectRef => callbackRefProject(project, cb, potentialProjectRef),
    );
}

interface NodeModulesWatcher extends FileWatcher {
    /** How many watchers of this directory were for closed ScriptInfo */
    refreshScriptInfoRefCount: number;
    /** List of project names whose module specifier cache should be cleared when package.jsons change */
    affectedModuleSpecifierCacheProjects?: Set<Project>;
}

/** @internal */
export interface PackageJsonWatcher extends FileWatcher {
    projects: Set<Project | WildcardWatcher>;
}

/** @internal */
export interface WildcardWatcher extends FileWatcher {
    packageJsonWatches: Set<PackageJsonWatcher> | undefined;
}

/** @internal */
export function getDetailWatchInfo(watchType: WatchType, project: Project | NormalizedPath | undefined) {
    return `${isString(project) ? `Config: ${project} ` : project ? `Project: ${project.getProjectName()} ` : ""}WatchType: ${watchType}`;
}

function isScriptInfoWatchedFromNodeModules(info: ScriptInfo) {
    return !info.isScriptOpen() && info.mTime !== undefined;
}

/**
 * returns true if project updated with new program
 * @internal
 */
export function updateProjectIfDirty(project: Project): boolean {
    project.invalidateResolutionsOfFailedLookupLocations();
    return project.dirty && !project.updateGraph();
}

/** Updates the program for triggerFile and returns true if sent configFileDiagEvent */
function updateWithTriggerFile(project: ConfiguredProject, triggerFile: NormalizedPath, isReload: boolean): boolean {
    if (!isReload) {
        project.invalidateResolutionsOfFailedLookupLocations();
        if (!project.dirty) return false;
    }
    project.triggerFileForConfigFileDiag = triggerFile;
    const updateLevel = project.pendingUpdateLevel;
    project.updateGraph();
    // On full update the event is sent by recursive updateWithTrigger through reloadConfiguredProject
    if (!project.triggerFileForConfigFileDiag && !isReload) return updateLevel === ProgramUpdateLevel.Full;
    const sent = project.projectService.sendConfigFileDiagEvent(project, triggerFile, isReload);
    project.triggerFileForConfigFileDiag = undefined;
    return sent;
}

/** Updates with triggerFile if persent otherwise updateProjectIfDirty, returns true if sent configFileDiagEvent */
function updateConfiguredProject(project: ConfiguredProject, triggerFile: NormalizedPath | undefined) {
    if (triggerFile) {
        if (updateWithTriggerFile(project, triggerFile, /*isReload*/ false)) return true;
    }
    else {
        updateProjectIfDirty(project);
    }
    return false;
}

function configFileExistenceInfoForOptimizedLoading(project: ConfiguredProject) {
    const configFileName = toNormalizedPath(project.getConfigFilePath());
    const configFileExistenceInfo = project.projectService.ensureParsedConfigUptoDate(
        configFileName,
        project.canonicalConfigFilePath,
        project.projectService.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!,
        project,
    );
    const parsedCommandLine = configFileExistenceInfo.config!.parsedCommandLine!;
    project.parsedCommandLine = parsedCommandLine;
    project.resolvedChildConfigs = undefined;
    project.updateReferences(parsedCommandLine.projectReferences);
    // Composite can determine based on files themselves, no need to load project
    // If solution, no need to load it to determine if file belongs to it
    if (useConfigFileExistenceInfoForOptimizedLoading(project)) return configFileExistenceInfo;
}

function useConfigFileExistenceInfoForOptimizedLoading(project: ConfiguredProject) {
    return !!project.parsedCommandLine &&
        (!!project.parsedCommandLine.options.composite ||
            // If solution, no need to load it to determine if file belongs to it
            !!isSolutionConfig(project.parsedCommandLine));
}

function configFileExistenceInfoForOptimizedReplay(project: ConfiguredProject) {
    return useConfigFileExistenceInfoForOptimizedLoading(project) ?
        project.projectService.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)! :
        undefined;
}

function fileOpenReason(info: ScriptInfo) {
    return `Creating possible configured project for ${info.fileName} to open`;
}

function reloadReason(reason: string) {
    return `User requested reload projects: ${reason}`;
}

function setProjectOptionsUsed(project: ConfiguredProject | ExternalProject) {
    if (isConfiguredProject(project)) {
        project.projectOptions = true;
    }
}

/** @internal */
export interface OpenFileArguments {
    fileName: string;
    content?: string;
    scriptKind?: protocol.ScriptKindName | ScriptKind;
    hasMixedContent?: boolean;
    projectRootPath?: string;
}

/** @internal */
export interface ChangeFileArguments {
    fileName: string;
    changes: Iterable<TextChange>;
}

export interface WatchOptionsAndErrors {
    watchOptions: WatchOptions;
    errors: Diagnostic[] | undefined;
}

/** @internal */
export interface ParsedConfig {
    cachedDirectoryStructureHost: CachedDirectoryStructureHost;
    /**
     * The map contains
     *   - true if project is watching config file as well as wild cards
     *   - false if just config file is watched
     */
    projects: Map<NormalizedPath, boolean>;
    parsedCommandLine?: ParsedCommandLine;
    watchedDirectories?: Map<string, WildcardDirectoryWatcher<WildcardWatcher>>;
    /**
     * true if watchedDirectories need to be updated as per parsedCommandLine's updated watched directories
     */
    watchedDirectoriesStale?: boolean;
    updateLevel?: ProgramUpdateLevel.RootNamesAndUpdate | ProgramUpdateLevel.Full;
}

function createProjectNameFactoryWithCounter(nameFactory: (counter: number) => string) {
    let nextId = 1;
    return () => nameFactory(nextId++);
}

interface HostWatcherMap<T> {
    idToCallbacks: Map<number, Set<T>>;
    pathToId: Map<Path, number>;
}

function getHostWatcherMap<T>(): HostWatcherMap<T> {
    return { idToCallbacks: new Map(), pathToId: new Map() };
}

function getCanUseWatchEvents(service: ProjectService, canUseWatchEvents: boolean | undefined) {
    return !!canUseWatchEvents && !!service.eventHandler && !!service.session;
}

function createWatchFactoryHostUsingWatchEvents(service: ProjectService, canUseWatchEvents: boolean | undefined): WatchFactoryHost | undefined {
    if (!getCanUseWatchEvents(service, canUseWatchEvents)) return undefined;
    const watchedFiles = getHostWatcherMap<FileWatcherCallback>();
    const watchedDirectories = getHostWatcherMap<DirectoryWatcherCallback>();
    const watchedDirectoriesRecursive = getHostWatcherMap<DirectoryWatcherCallback>();
    let ids = 1;
    service.session!.addProtocolHandler(protocol.CommandTypes.WatchChange, req => {
        onWatchChange((req as protocol.WatchChangeRequest).arguments);
        return { responseRequired: false };
    });
    return {
        watchFile,
        watchDirectory,
        getCurrentDirectory: () => service.host.getCurrentDirectory(),
        useCaseSensitiveFileNames: service.host.useCaseSensitiveFileNames,
    };
    function watchFile(path: string, callback: FileWatcherCallback): FileWatcher {
        return getOrCreateFileWatcher(
            watchedFiles,
            path,
            callback,
            id => ({ eventName: CreateFileWatcherEvent, data: { id, path } }),
        );
    }
    function watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher {
        return getOrCreateFileWatcher(
            recursive ? watchedDirectoriesRecursive : watchedDirectories,
            path,
            callback,
            id => ({
                eventName: CreateDirectoryWatcherEvent,
                data: {
                    id,
                    path,
                    recursive: !!recursive,
                    // Special case node_modules as we watch it for changes to closed script infos as well
                    ignoreUpdate: !path.endsWith("/node_modules") ? true : undefined,
                },
            }),
        );
    }
    function getOrCreateFileWatcher<T>(
        { pathToId, idToCallbacks }: HostWatcherMap<T>,
        path: string,
        callback: T,
        event: (id: number) => CreateFileWatcherEvent | CreateDirectoryWatcherEvent,
    ) {
        const key = service.toPath(path);
        let id = pathToId.get(key);
        if (!id) pathToId.set(key, id = ids++);
        let callbacks = idToCallbacks.get(id);
        if (!callbacks) {
            idToCallbacks.set(id, callbacks = new Set());
            // Add watcher
            service.eventHandler!(event(id));
        }
        callbacks.add(callback);
        return {
            close() {
                const callbacks = idToCallbacks.get(id);
                if (!callbacks?.delete(callback)) return;
                if (callbacks.size) return;
                idToCallbacks.delete(id);
                pathToId.delete(key);
                service.eventHandler!({ eventName: CloseFileWatcherEvent, data: { id } });
            },
        };
    }
    function onWatchChange(args: protocol.WatchChangeRequestArgs | readonly protocol.WatchChangeRequestArgs[]) {
        if (isArray(args)) args.forEach(onWatchChangeRequestArgs);
        else onWatchChangeRequestArgs(args);
    }

    function onWatchChangeRequestArgs({ id, created, deleted, updated }: protocol.WatchChangeRequestArgs) {
        onWatchEventType(id, created, FileWatcherEventKind.Created);
        onWatchEventType(id, deleted, FileWatcherEventKind.Deleted);
        onWatchEventType(id, updated, FileWatcherEventKind.Changed);
    }

    function onWatchEventType(id: number, paths: readonly string[] | undefined, eventKind: FileWatcherEventKind) {
        if (!paths?.length) return;
        forEachCallback(watchedFiles, id, paths, (callback, eventPath) => callback(eventPath, eventKind));
        forEachCallback(watchedDirectories, id, paths, (callback, eventPath) => callback(eventPath));
        forEachCallback(watchedDirectoriesRecursive, id, paths, (callback, eventPath) => callback(eventPath));
    }

    function forEachCallback<T>(
        hostWatcherMap: HostWatcherMap<T>,
        id: number,
        eventPaths: readonly string[],
        cb: (callback: T, eventPath: string) => void,
    ) {
        hostWatcherMap.idToCallbacks.get(id)?.forEach(callback => {
            eventPaths.forEach(eventPath => cb(callback, normalizeSlashes(eventPath)));
        });
    }
}

export class ProjectService {
    /** @internal */
    readonly documentRegistry: DocumentRegistry;

    /**
     * Container of all known scripts
     *
     * @internal
     */
    readonly filenameToScriptInfo: Map<Path, ScriptInfo> = new Map();
    private readonly nodeModulesWatchers = new Map<Path, NodeModulesWatcher>();
    /**
     * Contains all the deleted script info's version information so that
     * it does not reset when creating script info again
     * (and could have potentially collided with version where contents mismatch)
     */
    private readonly filenameToScriptInfoVersion = new Map<Path, number>();
    // Set of all '.js' files ever opened.
    private readonly allJsFilesForOpenFileTelemetry = new Set<string>();

    /**
     * Map to the real path of the infos
     *
     * @internal
     */
    readonly realpathToScriptInfos: MultiMap<Path, ScriptInfo> | undefined;
    /**
     * maps external project file name to list of config files that were the part of this project
     */
    private readonly externalProjectToConfiguredProjectMap = new Map<string, Set<ConfiguredProject>>();

    /**
     * external projects (configuration and list of root files is not controlled by tsserver)
     */
    readonly externalProjects: ExternalProject[] = [];
    /**
     * projects built from openFileRoots
     */
    readonly inferredProjects: InferredProject[] = [];
    /**
     * projects specified by a tsconfig.json file
     */
    readonly configuredProjects: Map<string, ConfiguredProject> = new Map();
    /** @internal */
    readonly newInferredProjectName: () => string = createProjectNameFactoryWithCounter(makeInferredProjectName);
    /** @internal */
    readonly newAutoImportProviderProjectName: () => string = createProjectNameFactoryWithCounter(makeAutoImportProviderProjectName);
    /** @internal */
    readonly newAuxiliaryProjectName: () => string = createProjectNameFactoryWithCounter(makeAuxiliaryProjectName);
    /**
     * Open files: with value being project root path, and key being Path of the file that is open
     */
    readonly openFiles: Map<Path, NormalizedPath | undefined> = new Map();
    /** Config files looked up and cached config files for open script info */
    private readonly configFileForOpenFiles = new Map<Path, ConfigFileForOpenFile>();
    /** Set of open script infos that are root of inferred project */
    private rootOfInferredProjects = new Set<ScriptInfo>();
    /**
     * Map of open files that are opened without complete path but have projectRoot as current directory
     */
    private readonly openFilesWithNonRootedDiskPath = new Map<string, ScriptInfo>();

    private compilerOptionsForInferredProjects: CompilerOptions | undefined;
    private compilerOptionsForInferredProjectsPerProjectRoot = new Map<string, CompilerOptions>();
    private watchOptionsForInferredProjects: WatchOptionsAndErrors | undefined;
    private watchOptionsForInferredProjectsPerProjectRoot = new Map<string, WatchOptionsAndErrors | false>();
    private typeAcquisitionForInferredProjects: TypeAcquisition | undefined;
    private typeAcquisitionForInferredProjectsPerProjectRoot = new Map<string, TypeAcquisition | undefined>();
    /**
     * Project size for configured or external projects
     */
    private readonly projectToSizeMap = new Map<string, number>();
    /**
     * This is a map of config file paths existence that doesnt need query to disk
     * - The entry can be present because there is inferred project that needs to watch addition of config file to directory
     *   In this case the exists could be true/false based on config file is present or not
     * - Or it is present if we have configured project open with config file at that location
     *   In this case the exists property is always true
     *
     * @internal
     */
    readonly configFileExistenceInfoCache: Map<NormalizedPath, ConfigFileExistenceInfo> = new Map();
    /** @internal */ readonly throttledOperations: ThrottledOperations;

    private readonly hostConfiguration: HostConfiguration;
    private safelist: SafeList = defaultTypeSafeList;
    private readonly legacySafelist = new Map<string, string>();

    private pendingProjectUpdates = new Map<string, Project>();
    /**
     * All the open script info that needs recalculation of the default project,
     * this also caches config file info before config file change was detected to use it in case projects are not updated yet
     */
    private pendingOpenFileProjectUpdates?: Map<Path, ConfigFileForOpenFile>;
    /** @internal */
    pendingEnsureProjectForOpenFiles = false;

    readonly currentDirectory: NormalizedPath;
    readonly toCanonicalFileName: (f: string) => string;

    public readonly host: ServerHost;
    public readonly logger: Logger;
    public readonly cancellationToken: HostCancellationToken;
    public readonly useSingleInferredProject: boolean;
    public readonly useInferredProjectPerProjectRoot: boolean;
    public readonly typingsInstaller: ITypingsInstaller;
    private readonly globalCacheLocationDirectoryPath: Path | undefined;
    public readonly throttleWaitMilliseconds?: number;
    /** @internal */
    readonly eventHandler?: ProjectServiceEventHandler;
    private readonly suppressDiagnosticEvents?: boolean;

    public readonly globalPlugins: readonly string[];
    public readonly pluginProbeLocations: readonly string[];
    public readonly allowLocalPluginLoads: boolean;
    /** @internal */ currentPluginConfigOverrides: Map<string, any> | undefined;

    public readonly typesMapLocation: string | undefined;

    public readonly serverMode: LanguageServiceMode;

    /** Tracks projects that we have already sent telemetry for. */
    private readonly seenProjects = new Map<string, true>();

    /** @internal */
    readonly watchFactory: WatchFactory<WatchType, Project | NormalizedPath>;

    private readonly sharedExtendedConfigFileWatchers = new Map<Path, SharedExtendedConfigFileWatcher<NormalizedPath>>();
    private readonly extendedConfigCache = new Map<string, ExtendedConfigCacheEntry>();

    /** @internal */
    readonly packageJsonCache: PackageJsonCache;
    private packageJsonFilesMap: Map<Path, PackageJsonWatcher> | undefined;
    private incompleteCompletionsCache: IncompleteCompletionsCache | undefined;
    /** @internal */
    readonly session: Session<unknown> | undefined;

    private performanceEventHandler?: PerformanceEventHandler;

    private pendingPluginEnablements?: Map<Project, Promise<BeginEnablePluginResult>[]>;
    private currentPluginEnablementPromise?: Promise<void>;

    /** @internal */ baseline: (title?: string) => void = noop;
    /** @internal */ verifyDocumentRegistry: typeof noop = noop;
    /** @internal */ verifyProgram: (project: Project) => void = noop;
    /** @internal */ onProjectCreation: (project: Project) => void = noop;
    /** @internal */ canUseWatchEvents: boolean;

    readonly jsDocParsingMode: JSDocParsingMode | undefined;

    constructor(opts: ProjectServiceOptions) {
        this.host = opts.host;
        this.logger = opts.logger;
        this.cancellationToken = opts.cancellationToken;
        this.useSingleInferredProject = opts.useSingleInferredProject;
        this.useInferredProjectPerProjectRoot = opts.useInferredProjectPerProjectRoot;
        this.typingsInstaller = opts.typingsInstaller || nullTypingsInstaller;
        this.throttleWaitMilliseconds = opts.throttleWaitMilliseconds;
        this.eventHandler = opts.eventHandler;
        this.suppressDiagnosticEvents = opts.suppressDiagnosticEvents;
        this.globalPlugins = opts.globalPlugins || emptyArray;
        this.pluginProbeLocations = opts.pluginProbeLocations || emptyArray;
        this.allowLocalPluginLoads = !!opts.allowLocalPluginLoads;
        this.typesMapLocation = (opts.typesMapLocation === undefined) ? combinePaths(getDirectoryPath(this.getExecutingFilePath()), "typesMap.json") : opts.typesMapLocation;
        this.session = opts.session;
        this.jsDocParsingMode = opts.jsDocParsingMode;

        if (opts.serverMode !== undefined) {
            this.serverMode = opts.serverMode;
        }
        else {
            this.serverMode = LanguageServiceMode.Semantic;
        }

        if (this.host.realpath) {
            this.realpathToScriptInfos = createMultiMap();
        }
        this.currentDirectory = toNormalizedPath(this.host.getCurrentDirectory());
        this.toCanonicalFileName = createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);
        this.globalCacheLocationDirectoryPath = this.typingsInstaller.globalTypingsCacheLocation
            ? ensureTrailingDirectorySeparator(this.toPath(this.typingsInstaller.globalTypingsCacheLocation))
            : undefined;
        this.throttledOperations = new ThrottledOperations(this.host, this.logger);

        this.logger.info(`currentDirectory:: ${this.host.getCurrentDirectory()} useCaseSensitiveFileNames:: ${this.host.useCaseSensitiveFileNames}`);
        this.logger.info(`libs Location:: ${getDirectoryPath(this.host.getExecutingFilePath())}`);
        this.logger.info(`globalTypingsCacheLocation:: ${this.typingsInstaller.globalTypingsCacheLocation}`);

        if (this.typesMapLocation) {
            this.loadTypesMap();
        }
        else {
            this.logger.info("No types map provided; using the default");
        }

        this.typingsInstaller.attach(this);

        this.hostConfiguration = {
            formatCodeOptions: getDefaultFormatCodeSettings(this.host.newLine),
            preferences: emptyOptions,
            hostInfo: "Unknown host",
            extraFileExtensions: [],
        };

        this.documentRegistry = createDocumentRegistryInternal(
            this.host.useCaseSensitiveFileNames,
            this.currentDirectory,
            this.jsDocParsingMode,
            this,
        );
        const watchLogLevel = this.logger.hasLevel(LogLevel.verbose) ? WatchLogLevel.Verbose :
            this.logger.loggingEnabled() ? WatchLogLevel.TriggerOnly : WatchLogLevel.None;
        const log: (s: string) => void = watchLogLevel !== WatchLogLevel.None ? (s => this.logger.info(s)) : noop;
        this.packageJsonCache = createPackageJsonCache(this);
        this.watchFactory = this.serverMode !== LanguageServiceMode.Semantic ?
            {
                watchFile: returnNoopFileWatcher,
                watchDirectory: returnNoopFileWatcher,
            } :
            getWatchFactory(
                createWatchFactoryHostUsingWatchEvents(this, opts.canUseWatchEvents) || this.host,
                watchLogLevel,
                log,
                getDetailWatchInfo,
            );
        this.canUseWatchEvents = getCanUseWatchEvents(this, opts.canUseWatchEvents);
        opts.incrementalVerifier?.(this);
    }

    toPath(fileName: string): Path {
        return toPath(fileName, this.currentDirectory, this.toCanonicalFileName);
    }

    /** @internal */
    getExecutingFilePath(): string {
        return this.getNormalizedAbsolutePath(this.host.getExecutingFilePath());
    }

    /** @internal */
    getNormalizedAbsolutePath(fileName: string): string {
        return getNormalizedAbsolutePath(fileName, this.host.getCurrentDirectory());
    }

    /** @internal */
    setDocument(key: DocumentRegistryBucketKeyWithMode, path: Path, sourceFile: SourceFile): void {
        const info = Debug.checkDefined(this.getScriptInfoForPath(path));
        info.cacheSourceFile = { key, sourceFile };
    }

    /** @internal */
    getDocument(key: DocumentRegistryBucketKeyWithMode, path: Path): SourceFile | undefined {
        const info = this.getScriptInfoForPath(path);
        return info && info.cacheSourceFile && info.cacheSourceFile.key === key ? info.cacheSourceFile.sourceFile : undefined;
    }

    /** @internal */
    ensureInferredProjectsUpToDate_TestOnly(): void {
        this.ensureProjectStructuresUptoDate();
    }

    /** @internal */
    getCompilerOptionsForInferredProjects(): CompilerOptions | undefined {
        return this.compilerOptionsForInferredProjects;
    }

    /** @internal */
    onUpdateLanguageServiceStateForProject(project: Project, languageServiceEnabled: boolean): void {
        if (!this.eventHandler) {
            return;
        }
        const event: ProjectLanguageServiceStateEvent = {
            eventName: ProjectLanguageServiceStateEvent,
            data: { project, languageServiceEnabled },
        };
        this.eventHandler(event);
    }

    private loadTypesMap() {
        try {
            const fileContent = this.host.readFile(this.typesMapLocation!); // TODO: GH#18217
            if (fileContent === undefined) {
                this.logger.info(`Provided types map file "${this.typesMapLocation}" doesn't exist`);
                return;
            }
            const raw: TypesMapFile = JSON.parse(fileContent);
            // Parse the regexps
            for (const k of Object.keys(raw.typesMap)) {
                raw.typesMap[k].match = new RegExp(raw.typesMap[k].match as {} as string, "i");
            }
            // raw is now fixed and ready
            this.safelist = raw.typesMap;
            for (const key in raw.simpleMap) {
                if (hasProperty(raw.simpleMap, key)) {
                    this.legacySafelist.set(key, raw.simpleMap[key].toLowerCase());
                }
            }
        }
        catch (e) {
            this.logger.info(`Error loading types map: ${e}`);
            this.safelist = defaultTypeSafeList;
            this.legacySafelist.clear();
        }
    }

    updateTypingsForProject(response: SetTypings | InvalidateCachedTypings | PackageInstalledResponse): void;
    /** @internal */
    updateTypingsForProject(response: SetTypings | InvalidateCachedTypings | PackageInstalledResponse | BeginInstallTypes | EndInstallTypes): void; // eslint-disable-line @typescript-eslint/unified-signatures
    updateTypingsForProject(response: SetTypings | InvalidateCachedTypings | PackageInstalledResponse | BeginInstallTypes | EndInstallTypes): void {
        const project = this.findProject(response.projectName);
        if (!project) {
            return;
        }
        switch (response.kind) {
            case ActionSet:
                // Update the typing files and update the project
                project.updateTypingFiles(
                    response.compilerOptions,
                    response.typeAcquisition,
                    response.unresolvedImports,
                    response.typings,
                );
                return;
            case ActionInvalidate:
                // Do not clear resolution cache, there was changes detected in typings, so enque typing request and let it get us correct results
                project.enqueueInstallTypingsForProject(/*forceRefresh*/ true);
                return;
        }
    }

    /** @internal */
    watchTypingLocations(response: WatchTypingLocations): void {
        this.findProject(response.projectName)?.watchTypingLocations(response.files);
    }

    /** @internal */
    delayEnsureProjectForOpenFiles(): void {
        if (!this.openFiles.size) return;
        this.pendingEnsureProjectForOpenFiles = true;
        this.throttledOperations.schedule(ensureProjectForOpenFileSchedule, /*delay*/ 2500, () => {
            if (this.pendingProjectUpdates.size !== 0) {
                this.delayEnsureProjectForOpenFiles();
            }
            else {
                if (this.pendingEnsureProjectForOpenFiles) {
                    this.ensureProjectForOpenFiles();

                    // Send the event to notify that there were background project updates
                    // send current list of open files
                    this.sendProjectsUpdatedInBackgroundEvent();
                }
            }
        });
    }

    private delayUpdateProjectGraph(project: Project) {
        if (isProjectDeferredClose(project)) return;
        project.markAsDirty();
        if (isBackgroundProject(project)) return;
        const projectName = project.getProjectName();
        this.pendingProjectUpdates.set(projectName, project);
        this.throttledOperations.schedule(projectName, /*delay*/ 250, () => {
            if (this.pendingProjectUpdates.delete(projectName)) {
                updateProjectIfDirty(project);
            }
        });
    }

    /** @internal */
    hasPendingProjectUpdate(project: Project): boolean {
        return this.pendingProjectUpdates.has(project.getProjectName());
    }

    /** @internal */
    sendProjectsUpdatedInBackgroundEvent(): void {
        if (!this.eventHandler) {
            return;
        }

        const event: ProjectsUpdatedInBackgroundEvent = {
            eventName: ProjectsUpdatedInBackgroundEvent,
            data: {
                openFiles: arrayFrom(this.openFiles.keys(), path => this.getScriptInfoForPath(path)!.fileName),
            },
        };
        this.eventHandler(event);
    }

    /** @internal */
    sendLargeFileReferencedEvent(file: string, fileSize: number): void {
        if (!this.eventHandler) {
            return;
        }

        const event: LargeFileReferencedEvent = {
            eventName: LargeFileReferencedEvent,
            data: { file, fileSize, maxFileSize },
        };
        this.eventHandler(event);
    }

    /** @internal */
    sendProjectLoadingStartEvent(project: ConfiguredProject, reason: string): void {
        if (!this.eventHandler) {
            return;
        }
        project.sendLoadingProjectFinish = true;
        const event: ProjectLoadingStartEvent = {
            eventName: ProjectLoadingStartEvent,
            data: { project, reason },
        };
        this.eventHandler(event);
    }

    /** @internal */
    sendProjectLoadingFinishEvent(project: ConfiguredProject): void {
        if (!this.eventHandler || !project.sendLoadingProjectFinish) {
            return;
        }

        project.sendLoadingProjectFinish = false;
        const event: ProjectLoadingFinishEvent = {
            eventName: ProjectLoadingFinishEvent,
            data: { project },
        };
        this.eventHandler(event);
    }

    /** @internal */
    sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number): void {
        if (this.performanceEventHandler) {
            this.performanceEventHandler({ kind, durationMs });
        }
    }

    /** @internal */
    delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project: Project): void {
        this.delayUpdateProjectGraph(project);
        this.delayEnsureProjectForOpenFiles();
    }

    private delayUpdateProjectGraphs(projects: readonly Project[], clearSourceMapperCache: boolean) {
        if (projects.length) {
            for (const project of projects) {
                // Even if program doesnt change, clear the source mapper cache
                if (clearSourceMapperCache) project.clearSourceMapperCache();
                this.delayUpdateProjectGraph(project);
            }
            this.delayEnsureProjectForOpenFiles();
        }
    }

    setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.InferredProjectCompilerOptions, projectRootPath?: string): void {
        Debug.assert(projectRootPath === undefined || this.useInferredProjectPerProjectRoot, "Setting compiler options per project root path is only supported when useInferredProjectPerProjectRoot is enabled");

        const compilerOptions = convertCompilerOptions(projectCompilerOptions);
        const watchOptions = convertWatchOptions(projectCompilerOptions, projectRootPath);
        const typeAcquisition = convertTypeAcquisition(projectCompilerOptions);

        // always set 'allowNonTsExtensions' for inferred projects since user cannot configure it from the outside
        // previously we did not expose a way for user to change these settings and this option was enabled by default
        compilerOptions.allowNonTsExtensions = true;
        const canonicalProjectRootPath = projectRootPath && this.toCanonicalFileName(projectRootPath);
        if (canonicalProjectRootPath) {
            this.compilerOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, compilerOptions);
            this.watchOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, watchOptions || false);
            this.typeAcquisitionForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, typeAcquisition);
        }
        else {
            this.compilerOptionsForInferredProjects = compilerOptions;
            this.watchOptionsForInferredProjects = watchOptions;
            this.typeAcquisitionForInferredProjects = typeAcquisition;
        }

        for (const project of this.inferredProjects) {
            // Only update compiler options in the following cases:
            // - Inferred projects without a projectRootPath, if the new options do not apply to
            //   a workspace root
            // - Inferred projects with a projectRootPath, if the new options do not apply to a
            //   workspace root and there is no more specific set of options for that project's
            //   root path
            // - Inferred projects with a projectRootPath, if the new options apply to that
            //   project root path.
            if (
                canonicalProjectRootPath ?
                    project.projectRootPath === canonicalProjectRootPath :
                    !project.projectRootPath || !this.compilerOptionsForInferredProjectsPerProjectRoot.has(project.projectRootPath)
            ) {
                project.setCompilerOptions(compilerOptions);
                project.setTypeAcquisition(typeAcquisition);
                project.setWatchOptions(watchOptions?.watchOptions);
                project.setProjectErrors(watchOptions?.errors);
                project.compileOnSaveEnabled = compilerOptions.compileOnSave!;
                project.markAsDirty();
                this.delayUpdateProjectGraph(project);
            }
        }

        this.delayEnsureProjectForOpenFiles();
    }

    findProject(projectName: string): Project | undefined {
        if (projectName === undefined) {
            return undefined;
        }
        if (isInferredProjectName(projectName)) {
            return findProjectByName(projectName, this.inferredProjects);
        }
        return this.findExternalProjectByProjectName(projectName) || this.findConfiguredProjectByProjectName(toNormalizedPath(projectName));
    }

    /** @internal */
    forEachProject(cb: (project: Project) => void): void {
        this.externalProjects.forEach(cb);
        this.configuredProjects.forEach(cb);
        this.inferredProjects.forEach(cb);
    }

    /** @internal */
    forEachEnabledProject(cb: (project: Project) => void): void {
        this.forEachProject(project => {
            if (!project.isOrphan() && project.languageServiceEnabled) {
                cb(project);
            }
        });
    }

    getDefaultProjectForFile(fileName: NormalizedPath, ensureProject: boolean): Project | undefined {
        return ensureProject ? this.ensureDefaultProjectForFile(fileName) : this.tryGetDefaultProjectForFile(fileName);
    }

    /** @internal */
    tryGetDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project | undefined {
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        return scriptInfo && !scriptInfo.isOrphan() ? scriptInfo.getDefaultProject() : undefined;
    }

    /**
     * If there is default project calculation pending for this file,
     * then it completes that calculation so that correct default project is used for the project
     */
    private tryGetDefaultProjectForEnsuringConfiguredProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project | undefined {
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        if (!scriptInfo) return undefined;
        if (this.pendingOpenFileProjectUpdates?.delete(scriptInfo.path)) {
            this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                scriptInfo,
                ConfiguredProjectLoadKind.Create,
            );
            if (scriptInfo.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(scriptInfo, this.openFiles.get(scriptInfo.path));
            }
        }

        return this.tryGetDefaultProjectForFile(scriptInfo);
    }

    /** @internal */
    ensureDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project {
        return this.tryGetDefaultProjectForEnsuringConfiguredProjectForFile(fileNameOrScriptInfo) || this.doEnsureDefaultProjectForFile(fileNameOrScriptInfo);
    }

    private doEnsureDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project {
        this.ensureProjectStructuresUptoDate();
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        return scriptInfo ?
            scriptInfo.getDefaultProject() :
            (this.logErrorForScriptInfoNotFound(isString(fileNameOrScriptInfo) ? fileNameOrScriptInfo : fileNameOrScriptInfo.fileName), Errors.ThrowNoProject());
    }

    getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string): ScriptInfo | undefined {
        this.ensureProjectStructuresUptoDate();
        return this.getScriptInfo(uncheckedFileName);
    }

    /**
     * Ensures the project structures are upto date
     * This means,
     * - we go through all the projects and update them if they are dirty
     * - if updates reflect some change in structure or there was pending request to ensure projects for open files
     *   ensure that each open script info has project
     */
    private ensureProjectStructuresUptoDate() {
        let hasChanges = this.pendingEnsureProjectForOpenFiles;
        this.pendingProjectUpdates.clear();
        const updateGraph = (project: Project) => {
            hasChanges = updateProjectIfDirty(project) || hasChanges;
        };

        this.externalProjects.forEach(updateGraph);
        this.configuredProjects.forEach(updateGraph);
        this.inferredProjects.forEach(updateGraph);
        if (hasChanges) {
            this.ensureProjectForOpenFiles();
        }
    }

    getFormatCodeOptions(file: NormalizedPath): FormatCodeSettings {
        const info = this.getScriptInfoForNormalizedPath(file);
        return info && info.getFormatCodeSettings() || this.hostConfiguration.formatCodeOptions;
    }

    getPreferences(file: NormalizedPath): protocol.UserPreferences {
        const info = this.getScriptInfoForNormalizedPath(file);
        return { ...this.hostConfiguration.preferences, ...info && info.getPreferences() };
    }

    getHostFormatCodeOptions(): FormatCodeSettings {
        return this.hostConfiguration.formatCodeOptions;
    }

    getHostPreferences(): protocol.UserPreferences {
        return this.hostConfiguration.preferences;
    }

    private onSourceFileChanged(info: ScriptInfo, eventKind: FileWatcherEventKind) {
        Debug.assert(!info.isScriptOpen());
        if (eventKind === FileWatcherEventKind.Deleted) {
            this.handleDeletedFile(info, /*deferredDelete*/ true);
        }
        else {
            if (info.deferredDelete) info.deferredDelete = undefined;
            // file has been changed which might affect the set of referenced files in projects that include
            // this file and set of inferred projects
            info.delayReloadNonMixedContentFile();
            this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ false);
            this.handleSourceMapProjects(info);
        }
    }

    private handleSourceMapProjects(info: ScriptInfo) {
        // Change in d.ts, update source projects as well
        if (info.sourceMapFilePath) {
            if (isString(info.sourceMapFilePath)) {
                const sourceMapFileInfo = this.getScriptInfoForPath(info.sourceMapFilePath);
                this.delayUpdateSourceInfoProjects(sourceMapFileInfo?.sourceInfos);
            }
            else {
                this.delayUpdateSourceInfoProjects(info.sourceMapFilePath.sourceInfos);
            }
        }
        // Change in mapInfo, update declarationProjects and source projects
        this.delayUpdateSourceInfoProjects(info.sourceInfos);
        if (info.declarationInfoPath) {
            this.delayUpdateProjectsOfScriptInfoPath(info.declarationInfoPath);
        }
    }

    private delayUpdateSourceInfoProjects(sourceInfos: Set<Path> | undefined) {
        if (sourceInfos) {
            sourceInfos.forEach((_value, path) => this.delayUpdateProjectsOfScriptInfoPath(path));
        }
    }

    private delayUpdateProjectsOfScriptInfoPath(path: Path) {
        const info = this.getScriptInfoForPath(path);
        if (info) {
            this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ true);
        }
    }

    private handleDeletedFile(info: ScriptInfo, deferredDelete: boolean) {
        Debug.assert(!info.isScriptOpen());
        this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ false);
        this.handleSourceMapProjects(info);
        info.detachAllProjects();
        if (deferredDelete) {
            info.delayReloadNonMixedContentFile();
            info.deferredDelete = true;
        }
        else {
            this.deleteScriptInfo(info);
        }
    }

    /**
     * This is to watch whenever files are added or removed to the wildcard directories
     */
    private watchWildcardDirectory(
        directory: string,
        flags: WatchDirectoryFlags,
        configFileName: NormalizedPath,
        config: ParsedConfig,
    ) {
        let watcher: FileWatcher | undefined = this.watchFactory.watchDirectory(
            directory,
            fileOrDirectory =>
                this.onWildCardDirectoryWatcherInvoke(
                    directory,
                    configFileName,
                    config,
                    result,
                    fileOrDirectory,
                ),
            flags,
            this.getWatchOptionsFromProjectWatchOptions(config.parsedCommandLine!.watchOptions, getDirectoryPath(configFileName)),
            WatchType.WildcardDirectory,
            configFileName,
        );

        const result: WildcardWatcher = {
            packageJsonWatches: undefined,
            close() {
                if (watcher) {
                    watcher.close();
                    watcher = undefined;
                    result.packageJsonWatches?.forEach(watcher => {
                        watcher.projects.delete(result);
                        watcher.close();
                    });
                    result.packageJsonWatches = undefined;
                }
            },
        };
        return result;
    }

    private onWildCardDirectoryWatcherInvoke(
        directory: string,
        configFileName: NormalizedPath,
        config: ParsedConfig,
        wildCardWatcher: WildcardWatcher,
        fileOrDirectory: string,
    ) {
        const fileOrDirectoryPath = this.toPath(fileOrDirectory);
        const fsResult = config.cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
        if (
            getBaseFileName(fileOrDirectoryPath) === "package.json" && !isInsideNodeModules(fileOrDirectoryPath) &&
            (fsResult && fsResult.fileExists || !fsResult && this.host.fileExists(fileOrDirectory))
        ) {
            const file = this.getNormalizedAbsolutePath(fileOrDirectory);
            this.logger.info(`Config: ${configFileName} Detected new package.json: ${file}`);
            this.packageJsonCache.addOrUpdate(file, fileOrDirectoryPath);
            this.watchPackageJsonFile(file, fileOrDirectoryPath, wildCardWatcher);
        }

        if (!fsResult?.fileExists) {
            // Ensure we send sourceFileChange
            this.sendSourceFileChange(fileOrDirectoryPath);
        }

        const configuredProjectForConfig = this.findConfiguredProjectByProjectName(configFileName);
        if (
            isIgnoredFileFromWildCardWatching({
                watchedDirPath: this.toPath(directory),
                fileOrDirectory,
                fileOrDirectoryPath,
                configFileName,
                extraFileExtensions: this.hostConfiguration.extraFileExtensions,
                currentDirectory: this.currentDirectory,
                options: config.parsedCommandLine!.options,
                program: configuredProjectForConfig?.getCurrentProgram() || config.parsedCommandLine!.fileNames,
                useCaseSensitiveFileNames: this.host.useCaseSensitiveFileNames,
                writeLog: s => this.logger.info(s),
                toPath: s => this.toPath(s),
                getScriptKind: configuredProjectForConfig ? (fileName => configuredProjectForConfig.getScriptKind(fileName)) : undefined,
            })
        ) return;

        // Reload is pending, do the reload
        if (config.updateLevel !== ProgramUpdateLevel.Full) config.updateLevel = ProgramUpdateLevel.RootNamesAndUpdate;
        config.projects.forEach((watchWildcardDirectories, projectCanonicalPath) => {
            if (!watchWildcardDirectories) return;
            const project = this.getConfiguredProjectByCanonicalConfigFilePath(projectCanonicalPath);
            if (!project) return;

            if (
                configuredProjectForConfig !== project &&
                this.getHostPreferences().includeCompletionsForModuleExports
            ) {
                const path = this.toPath(configFileName);
                if (find(project.getCurrentProgram()?.getResolvedProjectReferences(), ref => ref?.sourceFile.path === path)) {
                    project.markAutoImportProviderAsDirty();
                }
            }

            // Load root file names for configured project with the config file name
            // But only schedule update if project references this config file
            const updateLevel = configuredProjectForConfig === project ? ProgramUpdateLevel.RootNamesAndUpdate : ProgramUpdateLevel.Update;
            if (project.pendingUpdateLevel > updateLevel) return;

            // don't trigger callback on open, existing files
            if (this.openFiles.has(fileOrDirectoryPath)) {
                const info = Debug.checkDefined(this.getScriptInfoForPath(fileOrDirectoryPath));
                if (info.isAttached(project)) {
                    const loadLevelToSet = Math.max(updateLevel, project.openFileWatchTriggered.get(fileOrDirectoryPath) || ProgramUpdateLevel.Update) as ProgramUpdateLevel;
                    project.openFileWatchTriggered.set(fileOrDirectoryPath, loadLevelToSet);
                }
                else {
                    project.pendingUpdateLevel = updateLevel;
                    this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
                }
            }
            else {
                project.pendingUpdateLevel = updateLevel;
                this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
            }
        });
    }

    private delayUpdateProjectsFromParsedConfigOnConfigFileChange(canonicalConfigFilePath: NormalizedPath, loadReason: string) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        if (!configFileExistenceInfo?.config) return false;
        let scheduledAnyProjectUpdate = false;
        // Update projects watching cached config
        configFileExistenceInfo.config.updateLevel = ProgramUpdateLevel.Full;
        configFileExistenceInfo.config.cachedDirectoryStructureHost.clearCache();

        configFileExistenceInfo.config.projects.forEach((_watchWildcardDirectories, projectCanonicalPath) => {
            const project = this.getConfiguredProjectByCanonicalConfigFilePath(projectCanonicalPath);
            if (!project) return;

            scheduledAnyProjectUpdate = true;

            if (projectCanonicalPath === canonicalConfigFilePath) {
                // Skip refresh if project is not yet loaded
                if (project.initialLoadPending) return;
                project.pendingUpdateLevel = ProgramUpdateLevel.Full;
                project.pendingUpdateReason = loadReason;
                this.delayUpdateProjectGraph(project);
                project.markAutoImportProviderAsDirty();
            }
            else {
                // Any files impacted by config of project, need to update their open project
                if (project.initialLoadPending) {
                    this.configFileExistenceInfoCache.get(projectCanonicalPath)?.openFilesImpactedByConfigFile?.forEach(path => {
                        // Cache the existing config file info for this open file if not already done so
                        if (!this.pendingOpenFileProjectUpdates?.has(path)) {
                            (this.pendingOpenFileProjectUpdates ??= new Map()).set(
                                path,
                                this.configFileForOpenFiles.get(path),
                            );
                        }
                    });
                    // Skip refresh if project is not yet loaded
                    return;
                }

                // Change in referenced project config file
                const path = this.toPath(canonicalConfigFilePath);
                project.resolutionCache.removeResolutionsFromProjectReferenceRedirects(path);
                this.delayUpdateProjectGraph(project);
                if (
                    this.getHostPreferences().includeCompletionsForModuleExports &&
                    find(project.getCurrentProgram()?.getResolvedProjectReferences(), ref => ref?.sourceFile.path === path)
                ) {
                    project.markAutoImportProviderAsDirty();
                }
            }
        });
        return scheduledAnyProjectUpdate;
    }

    private onConfigFileChanged(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, eventKind: FileWatcherEventKind) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        const project = this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
        const wasDefferedClose = project?.deferredClose;
        if (eventKind === FileWatcherEventKind.Deleted) {
            // Update the cached status
            // We arent updating or removing the cached config file presence info as that will be taken care of by
            // releaseParsedConfig when the project is closed or doesnt need this config any more (depending on tracking open files)
            configFileExistenceInfo.exists = false;

            // Deferred remove the configured project for this config file
            if (project) project.deferredClose = true;
        }
        else {
            // Update the cached status
            configFileExistenceInfo.exists = true;
            if (wasDefferedClose) {
                project.deferredClose = undefined;
                project.markAsDirty();
            }
        }

        // Update projects watching config
        this.delayUpdateProjectsFromParsedConfigOnConfigFileChange(
            canonicalConfigFilePath,
            "Change in config file detected",
        );

        this.openFiles.forEach((_projectRootPath, path) => {
            const configFileForOpenFile = this.configFileForOpenFiles.get(path);

            // If this open script info does not depend on this config file, skip
            if (!configFileExistenceInfo.openFilesImpactedByConfigFile?.has(path)) return;
            // Invalidate default config file name for open file
            this.configFileForOpenFiles.delete(path);
            const info = this.getScriptInfoForPath(path)!;

            // Find new default config file name for this open file
            const newConfigFileNameForInfo = this.getConfigFileNameForFile(info, /*findFromCacheOnly*/ false);
            if (!newConfigFileNameForInfo) return;

            // Cache the existing config file info for this open file if not already done so
            if (!this.pendingOpenFileProjectUpdates?.has(path)) {
                (this.pendingOpenFileProjectUpdates ??= new Map()).set(path, configFileForOpenFile);
            }
        });

        // Ensure that all the open files have project
        this.delayEnsureProjectForOpenFiles();
    }

    private removeProject(project: Project) {
        this.logger.info("`remove Project::");
        project.print(/*writeProjectFileNames*/ true, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);

        project.close();
        if (Debug.shouldAssert(AssertionLevel.Normal)) {
            this.filenameToScriptInfo.forEach(info =>
                Debug.assert(
                    !info.isAttached(project),
                    "Found script Info still attached to project",
                    () =>
                        `${project.projectName}: ScriptInfos still attached: ${
                            JSON.stringify(
                                arrayFrom(
                                    mapDefinedIterator(
                                        this.filenameToScriptInfo.values(),
                                        info =>
                                            info.isAttached(project) ?
                                                {
                                                    fileName: info.fileName,
                                                    projects: info.containingProjects.map(p => p.projectName),
                                                    hasMixedContent: info.hasMixedContent,
                                                } : undefined,
                                    ),
                                ),
                                /*replacer*/ undefined,
                                " ",
                            )
                        }`,
                )
            );
        }
        // Remove the project from pending project updates
        this.pendingProjectUpdates.delete(project.getProjectName());

        switch (project.projectKind) {
            case ProjectKind.External:
                unorderedRemoveItem(this.externalProjects, project as ExternalProject);
                this.projectToSizeMap.delete(project.getProjectName());
                break;
            case ProjectKind.Configured:
                this.configuredProjects.delete((project as ConfiguredProject).canonicalConfigFilePath);
                this.projectToSizeMap.delete((project as ConfiguredProject).canonicalConfigFilePath);
                break;
            case ProjectKind.Inferred:
                unorderedRemoveItem(this.inferredProjects, project as InferredProject);
                break;
        }
    }

    /** @internal */
    assignOrphanScriptInfoToInferredProject(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): InferredProject {
        Debug.assert(info.isOrphan());
        const project = this.getOrCreateInferredProjectForProjectRootPathIfEnabled(info, projectRootPath) ||
            this.getOrCreateSingleInferredProjectIfEnabled() ||
            this.getOrCreateSingleInferredWithoutProjectRoot(
                info.isDynamic ?
                    projectRootPath || this.currentDirectory :
                    getDirectoryPath(
                        isRootedDiskPath(info.fileName) ?
                            info.fileName :
                            getNormalizedAbsolutePath(
                                info.fileName,
                                projectRootPath ?
                                    this.getNormalizedAbsolutePath(projectRootPath) :
                                    this.currentDirectory,
                            ),
                    ),
            );

        project.addRoot(info);
        if (info.containingProjects[0] !== project) {
            // Ensure this is first project, we could be in this scenario because info could be part of orphan project
            orderedRemoveItem(info.containingProjects, project);
            info.containingProjects.unshift(project);
        }
        project.updateGraph();

        if (!this.useSingleInferredProject && !project.projectRootPath) {
            // Note that we need to create a copy of the array since the list of project can change
            for (const inferredProject of this.inferredProjects) {
                if (inferredProject === project || inferredProject.isOrphan()) {
                    continue;
                }

                // Remove the inferred project if the root of it is now part of newly created inferred project
                // e.g through references
                // Which means if any root of inferred project is part of more than 1 project can be removed
                // This logic is same as iterating over all open files and calling
                // this.removeRootOfInferredProjectIfNowPartOfOtherProject(f);
                // Since this is also called from refreshInferredProject and closeOpen file
                // to update inferred projects of the open file, this iteration might be faster
                // instead of scanning all open files
                const roots = inferredProject.getRootScriptInfos();
                Debug.assert(roots.length === 1 || !!inferredProject.projectRootPath);
                if (roots.length === 1 && forEach(roots[0].containingProjects, p => p !== roots[0].containingProjects[0] && !p.isOrphan())) {
                    inferredProject.removeFile(roots[0], /*fileExists*/ true, /*detachFromProject*/ true);
                }
            }
        }

        return project;
    }

    private assignOrphanScriptInfosToInferredProject() {
        // collect orphaned files and assign them to inferred project just like we treat open of a file
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            // collect all orphaned script infos from open files
            if (info.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(info, projectRootPath);
            }
        });
    }

    /**
     * Remove this file from the set of open, non-configured files.
     * @param info The file that has been closed or newly configured
     */
    private closeOpenFile(info: ScriptInfo, skipAssignOrphanScriptInfosToInferredProject?: true) {
        // Closing file should trigger re-reading the file content from disk. This is
        // because the user may chose to discard the buffer content before saving
        // to the disk, and the server's version of the file can be out of sync.
        const fileExists = info.isDynamic ? false : this.host.fileExists(info.fileName);
        info.close(fileExists);
        this.stopWatchingConfigFilesForScriptInfo(info);

        const canonicalFileName = this.toCanonicalFileName(info.fileName);
        if (this.openFilesWithNonRootedDiskPath.get(canonicalFileName) === info) {
            this.openFilesWithNonRootedDiskPath.delete(canonicalFileName);
        }

        // collect all projects that should be removed
        let ensureProjectsForOpenFiles = false;
        for (const p of info.containingProjects) {
            if (isConfiguredProject(p)) {
                if (info.hasMixedContent) {
                    info.registerFileUpdate();
                }
                // Do not remove the project so that we can reuse this project
                // if it would need to be re-created with next file open

                // If project had open file affecting
                // Reload the root Files from config if its not already scheduled
                const updateLevel = p.openFileWatchTriggered.get(info.path);
                if (updateLevel !== undefined) {
                    p.openFileWatchTriggered.delete(info.path);
                    if (p.pendingUpdateLevel < updateLevel) {
                        p.pendingUpdateLevel = updateLevel;
                        p.markFileAsDirty(info.path);
                    }
                }
            }
            else if (isInferredProject(p) && p.isRoot(info)) {
                // If this was the last open root file of inferred project
                if (p.isProjectWithSingleRoot()) {
                    ensureProjectsForOpenFiles = true;
                }

                p.removeFile(info, fileExists, /*detachFromProject*/ true);
                // Do not remove the project even if this was last root of the inferred project
                // so that we can reuse this project, if it would need to be re-created with next file open
            }

            if (!p.languageServiceEnabled) {
                // if project language service is disabled then we create a program only for open files.
                // this means that project should be marked as dirty to force rebuilding of the program
                // on the next request
                p.markAsDirty();
            }
        }

        this.openFiles.delete(info.path);
        this.configFileForOpenFiles.delete(info.path);
        this.pendingOpenFileProjectUpdates?.delete(info.path);
        Debug.assert(!this.rootOfInferredProjects.has(info));

        if (!skipAssignOrphanScriptInfosToInferredProject && ensureProjectsForOpenFiles) {
            this.assignOrphanScriptInfosToInferredProject();
        }

        // Cleanup script infos that arent part of any project (eg. those could be closed script infos not referenced by any project)
        // is postponed to next file open so that if file from same project is opened,
        // we wont end up creating same script infos

        // If the current info is being just closed - add the watcher file to track changes
        // But if file was deleted, handle that part
        if (fileExists) {
            this.watchClosedScriptInfo(info);
        }
        else {
            this.handleDeletedFile(info, /*deferredDelete*/ false);
        }
        return ensureProjectsForOpenFiles;
    }

    private deleteScriptInfo(info: ScriptInfo) {
        Debug.assert(!info.isScriptOpen());
        this.filenameToScriptInfo.delete(info.path);
        this.filenameToScriptInfoVersion.set(info.path, info.textStorage.version);
        this.stopWatchingScriptInfo(info);
        const realpath = info.getRealpathIfDifferent();
        if (realpath) {
            this.realpathToScriptInfos!.remove(realpath, info); // TODO: GH#18217
        }
        info.closeSourceMapFileWatcher();
    }

    private configFileExists(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, info: OpenScriptInfoOrClosedOrConfigFileInfo) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);

        let openFilesImpactedByConfigFile: Set<Path> | undefined;
        if (this.openFiles.has(info.path) && (!isAncestorConfigFileInfo(info) || info.isForDefaultProject)) {
            // By default the info would get impacted by presence of config file since its in the detection path
            // Only adding the info as a root to inferred project will need the existence to be watched by file watcher
            if (configFileExistenceInfo) (configFileExistenceInfo.openFilesImpactedByConfigFile ??= new Set()).add(info.path);
            else (openFilesImpactedByConfigFile = new Set()).add(info.path);
        }

        if (configFileExistenceInfo) return configFileExistenceInfo.exists;

        // Theoretically we should be adding watch for the directory here itself.
        // In practice there will be very few scenarios where the config file gets added
        // somewhere inside the another config file directory.
        // And technically we could handle that case in configFile's directory watcher in some cases
        // But given that its a rare scenario it seems like too much overhead. (we werent watching those directories earlier either)

        // So what we are now watching is: configFile if the configured project corresponding to it is open
        // Or the whole chain of config files for the roots of the inferred projects

        // Cache the host value of file exists and add the info to map of open files impacted by this config file
        const exists = this.host.fileExists(configFileName);
        this.configFileExistenceInfoCache.set(canonicalConfigFilePath, { exists, openFilesImpactedByConfigFile });
        return exists;
    }

    private createConfigFileWatcherForParsedConfig(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        // When watching config file for parsed config, remove the noopFileWatcher that can be created for open files impacted by config file and watch for real
        if (!configFileExistenceInfo.watcher || configFileExistenceInfo.watcher === noopConfigFileWatcher) {
            configFileExistenceInfo.watcher = this.watchFactory.watchFile(
                configFileName,
                (_fileName, eventKind) => this.onConfigFileChanged(configFileName, canonicalConfigFilePath, eventKind),
                PollingInterval.High,
                this.getWatchOptionsFromProjectWatchOptions(configFileExistenceInfo?.config?.parsedCommandLine?.watchOptions, getDirectoryPath(configFileName)),
                WatchType.ConfigFile,
                forProject,
            );
        }
        this.ensureConfigFileWatcherForProject(configFileExistenceInfo, forProject);
    }

    private ensureConfigFileWatcherForProject(configFileExistenceInfo: ConfigFileExistenceInfo, forProject: ConfiguredProject) {
        // Watching config file for project, update the map
        const projects = configFileExistenceInfo.config!.projects;
        projects.set(forProject.canonicalConfigFilePath, projects.get(forProject.canonicalConfigFilePath) || false);
    }

    /** @internal */
    releaseParsedConfig(canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject): void {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        if (!configFileExistenceInfo.config?.projects.delete(forProject.canonicalConfigFilePath)) return;
        // If there are still projects watching this config file existence and config, there is nothing to do
        if (configFileExistenceInfo.config?.projects.size) return;

        configFileExistenceInfo.config = undefined;
        clearSharedExtendedConfigFileWatcher(canonicalConfigFilePath, this.sharedExtendedConfigFileWatchers);
        Debug.checkDefined(configFileExistenceInfo.watcher);
        if (configFileExistenceInfo.openFilesImpactedByConfigFile?.size) {
            // If there are open files that are impacted by this config file existence
            // but none of them are root of inferred project, the config file watcher will be
            // created when any of the script infos are added as root of inferred project
            if (configFileExistenceInfo.inferredProjectRoots) {
                // If we cannot watch config file existence without configured project, close the configured file watcher
                if (!canWatchDirectoryOrFilePath(getDirectoryPath(canonicalConfigFilePath) as Path)) {
                    configFileExistenceInfo.watcher!.close();
                    configFileExistenceInfo.watcher = noopConfigFileWatcher;
                }
            }
            else {
                // Close existing watcher
                configFileExistenceInfo.watcher!.close();
                configFileExistenceInfo.watcher = undefined;
            }
        }
        else {
            // There is not a single file open thats tracking the status of this config file. Remove from cache
            configFileExistenceInfo.watcher!.close();
            this.configFileExistenceInfoCache.delete(canonicalConfigFilePath);
        }
    }

    /**
     * This is called on file close or when its removed from inferred project as root,
     * so that we handle the watches and inferred project root data
     * @internal
     */
    stopWatchingConfigFilesForScriptInfo(info: ScriptInfo): void {
        if (this.serverMode !== LanguageServiceMode.Semantic) return;
        const isRootOfInferredProject = this.rootOfInferredProjects.delete(info);
        const isOpen = info.isScriptOpen();
        // Nothing to stop watching if this is open script info and not root of inferred project
        if (isOpen && !isRootOfInferredProject) return;
        this.forEachConfigFileLocation(info, canonicalConfigFilePath => {
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (!configFileExistenceInfo) return;

            if (isOpen) {
                // If this file doesnt get impacted by this config file, skip
                if (!configFileExistenceInfo?.openFilesImpactedByConfigFile?.has(info.path)) return;
            }
            else {
                // Delete the info from map, since this file is no more open
                if (!configFileExistenceInfo.openFilesImpactedByConfigFile?.delete(info.path)) return;
            }

            // If the script info was not root of inferred project,
            // there wont be config file watch open because of this script info
            if (isRootOfInferredProject) {
                // But if it is a root, it could be the last script info that is root of inferred project
                // and hence we would need to close the config file watcher
                configFileExistenceInfo.inferredProjectRoots!--;

                // Close the config file watcher if there are no more open files that are root of inferred project
                // or if there are no projects that need to watch this config file existence info
                if (
                    configFileExistenceInfo.watcher &&
                    !configFileExistenceInfo.config &&
                    !configFileExistenceInfo.inferredProjectRoots
                ) {
                    configFileExistenceInfo.watcher.close();
                    configFileExistenceInfo.watcher = undefined;
                }
            }

            // If there are no open files that are impacted by configFileExistenceInfo after closing this script info
            // and there is are no projects that need the config file existence or parsed config,
            // remove the cached existence info
            if (
                !configFileExistenceInfo.openFilesImpactedByConfigFile?.size &&
                !configFileExistenceInfo.config
            ) {
                Debug.assert(!configFileExistenceInfo.watcher);
                this.configFileExistenceInfoCache.delete(canonicalConfigFilePath);
            }
        });
    }

    /**
     * This is called by inferred project whenever script info is added as a root
     *
     * @internal
     */
    startWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo): void {
        if (this.serverMode !== LanguageServiceMode.Semantic) return;
        Debug.assert(info.isScriptOpen());
        // Set this file as the root of inferred project
        this.rootOfInferredProjects.add(info);
        this.forEachConfigFileLocation(info, (canonicalConfigFilePath, configFileName) => {
            let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (!configFileExistenceInfo) {
                // Create the cache
                configFileExistenceInfo = { exists: this.host.fileExists(configFileName), inferredProjectRoots: 1 };
                this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo);
            }
            else {
                configFileExistenceInfo.inferredProjectRoots = (configFileExistenceInfo.inferredProjectRoots ?? 0) + 1;
            }

            // It might not have been marked as impacting by presence of this script info if
            // this is in ancestor folder of config that was not looked up yet
            (configFileExistenceInfo.openFilesImpactedByConfigFile ??= new Set()).add(info.path);

            // If there is no configured project for this config file, add the file watcher
            configFileExistenceInfo.watcher ||= canWatchDirectoryOrFilePath(getDirectoryPath(canonicalConfigFilePath) as Path) ?
                this.watchFactory.watchFile(
                    configFileName,
                    (_filename, eventKind) => this.onConfigFileChanged(configFileName, canonicalConfigFilePath, eventKind),
                    PollingInterval.High,
                    this.hostConfiguration.watchOptions,
                    WatchType.ConfigFileForInferredRoot,
                ) :
                noopConfigFileWatcher;
        });
    }

    /**
     * This function tries to search for a tsconfig.json for the given file.
     * This is different from the method the compiler uses because
     * the compiler can assume it will always start searching in the
     * current directory (the directory in which tsc was invoked).
     * The server must start searching from the directory containing
     * the newly opened file.
     */
    private forEachConfigFileLocation(info: OpenScriptInfoOrClosedOrConfigFileInfo, action: (canonicalConfigFilePath: NormalizedPath, configFileName: NormalizedPath) => boolean | void) {
        if (this.serverMode !== LanguageServiceMode.Semantic) {
            return undefined;
        }

        Debug.assert(!isOpenScriptInfo(info) || this.openFiles.has(info.path));
        const projectRootPath = this.openFiles.get(info.path);
        const scriptInfo = Debug.checkDefined(this.getScriptInfo(info.path));
        if (scriptInfo.isDynamic) return undefined;

        let searchPath = asNormalizedPath(getDirectoryPath(info.fileName));
        const isSearchPathInProjectRoot = () => containsPath(projectRootPath!, searchPath, this.currentDirectory, !this.host.useCaseSensitiveFileNames);

        // If projectRootPath doesn't contain info.path, then do normal search for config file
        const anySearchPathOk = !projectRootPath || !isSearchPathInProjectRoot();

        let searchTsconfig = true;
        let searchJsconfig = true;
        if (isAncestorConfigFileInfo(info)) {
            // For ancestor of config file always ignore itself
            if (endsWith(info.fileName, "tsconfig.json")) searchTsconfig = false;
            else searchTsconfig = searchJsconfig = false;
        }
        do {
            const canonicalSearchPath = normalizedPathToPath(searchPath, this.currentDirectory, this.toCanonicalFileName);
            if (searchTsconfig) {
                const tsconfigFileName = asNormalizedPath(combinePaths(searchPath, "tsconfig.json"));
                const result = action(combinePaths(canonicalSearchPath, "tsconfig.json") as NormalizedPath, tsconfigFileName);
                if (result) return tsconfigFileName;
            }

            if (searchJsconfig) {
                const jsconfigFileName = asNormalizedPath(combinePaths(searchPath, "jsconfig.json"));
                const result = action(combinePaths(canonicalSearchPath, "jsconfig.json") as NormalizedPath, jsconfigFileName);
                if (result) return jsconfigFileName;
            }

            // If we started within node_modules, don't look outside node_modules.
            // Otherwise, we might pick up a very large project and pull in the world,
            // causing an editor delay.
            if (isNodeModulesDirectory(canonicalSearchPath)) {
                break;
            }

            const parentPath = asNormalizedPath(getDirectoryPath(searchPath));
            if (parentPath === searchPath) break;
            searchPath = parentPath;
            searchTsconfig = searchJsconfig = true;
        }
        while (anySearchPathOk || isSearchPathInProjectRoot());

        return undefined;
    }

    /** @internal */
    findDefaultConfiguredProject(info: ScriptInfo): ConfiguredProject | undefined {
        return this.findDefaultConfiguredProjectWorker(
            info,
            ConfiguredProjectLoadKind.Find,
        )?.defaultProject;
    }

    /** @internal */
    findDefaultConfiguredProjectWorker(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Find | ConfiguredProjectLoadKind.CreateReplay,
    ): DefaultConfiguredProjectResult | undefined {
        return info.isScriptOpen() ?
            this.tryFindDefaultConfiguredProjectForOpenScriptInfo(
                info,
                kind,
            ) :
            undefined;
    }

    /** Get cached configFileName for scriptInfo or ancestor of open script info */
    private getConfigFileNameForFileFromCache(
        info: OpenScriptInfoOrClosedOrConfigFileInfo,
        lookInPendingFilesForValue: boolean,
    ): ConfigFileName | undefined {
        if (lookInPendingFilesForValue) {
            const result = getConfigFileNameFromCache(info, this.pendingOpenFileProjectUpdates);
            if (result !== undefined) return result;
        }
        return getConfigFileNameFromCache(info, this.configFileForOpenFiles);
    }

    /** Caches the configFilename for script info or ancestor of open script info */
    private setConfigFileNameForFileInCache(
        info: OpenScriptInfoOrClosedOrConfigFileInfo,
        configFileName: NormalizedPath | undefined,
    ) {
        if (!this.openFiles.has(info.path)) return; // Dont cache for closed script infos
        const config = configFileName || false;
        if (!isAncestorConfigFileInfo(info)) {
            // Set value for open script info
            this.configFileForOpenFiles.set(info.path, config);
        }
        else {
            // Need to set value for ancestor in ConfigFileMapForOpenFile
            let configFileForOpenFile = this.configFileForOpenFiles.get(info.path)!;
            if (!configFileForOpenFile || isString(configFileForOpenFile)) {
                // We have value for open script info in cache, make a map with that as false key and set new vlaue
                this.configFileForOpenFiles.set(
                    info.path,
                    configFileForOpenFile = new Map().set(false, configFileForOpenFile),
                );
            }
            // Set value of for ancestor in the map
            configFileForOpenFile.set(info.fileName, config);
        }
    }

    /**
     * This function tries to search for a tsconfig.json for the given file.
     * This is different from the method the compiler uses because
     * the compiler can assume it will always start searching in the
     * current directory (the directory in which tsc was invoked).
     * The server must start searching from the directory containing
     * the newly opened file.
     * If script info is passed in, it is asserted to be open script info
     * otherwise just file name
     * when findFromCacheOnly is true only looked up in cache instead of hitting disk to figure things out
     * @internal
     */
    getConfigFileNameForFile(info: OpenScriptInfoOrClosedOrConfigFileInfo, findFromCacheOnly: boolean): NormalizedPath | undefined {
        // If we are using already cached values, look for values from pending update as well
        const fromCache = this.getConfigFileNameForFileFromCache(info, findFromCacheOnly);
        if (fromCache !== undefined) return fromCache || undefined;
        if (findFromCacheOnly) return undefined;
        const configFileName = this.forEachConfigFileLocation(info, (canonicalConfigFilePath, configFileName) => this.configFileExists(configFileName, canonicalConfigFilePath, info));
        this.logger.info(`getConfigFileNameForFile:: File: ${info.fileName} ProjectRootPath: ${this.openFiles.get(info.path)}:: Result: ${configFileName}`);
        this.setConfigFileNameForFileInCache(info, configFileName);
        return configFileName;
    }

    private printProjects() {
        if (!this.logger.hasLevel(LogLevel.normal)) {
            return;
        }

        this.logger.startGroup();

        this.externalProjects.forEach(printProjectWithoutFileNames);
        this.configuredProjects.forEach(printProjectWithoutFileNames);
        this.inferredProjects.forEach(printProjectWithoutFileNames);

        this.logger.info("Open files: ");
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            this.logger.info(`\tFileName: ${info.fileName} ProjectRootPath: ${projectRootPath}`);
            this.logger.info(`\t\tProjects: ${info.containingProjects.map(p => p.getProjectName())}`);
        });

        this.logger.endGroup();
    }

    /** @internal */
    findConfiguredProjectByProjectName(configFileName: NormalizedPath, allowDeferredClosed?: boolean): ConfiguredProject | undefined {
        // make sure that casing of config file name is consistent
        const canonicalConfigFilePath = asNormalizedPath(this.toCanonicalFileName(configFileName));
        const result = this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
        return allowDeferredClosed ? result : !result?.deferredClose ? result : undefined;
    }

    private getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath: string): ConfiguredProject | undefined {
        return this.configuredProjects.get(canonicalConfigFilePath);
    }

    private findExternalProjectByProjectName(projectFileName: string) {
        return findProjectByName(projectFileName, this.externalProjects);
    }

    /** Get a filename if the language service exceeds the maximum allowed program size; otherwise returns undefined. */
    private getFilenameForExceededTotalSizeLimitForNonTsFiles<T>(name: string, options: CompilerOptions | undefined, fileNames: T[], propertyReader: FilePropertyReader<T>): string | undefined {
        if (options && options.disableSizeLimit || !this.host.getFileSize) {
            return;
        }

        let availableSpace = maxProgramSizeForNonTsFiles;
        this.projectToSizeMap.set(name, 0);
        this.projectToSizeMap.forEach(val => (availableSpace -= val || 0));

        let totalNonTsFileSize = 0;

        for (const f of fileNames) {
            const fileName = propertyReader.getFileName(f);
            if (hasTSFileExtension(fileName)) {
                continue;
            }

            totalNonTsFileSize += this.host.getFileSize(fileName);

            if (totalNonTsFileSize > maxProgramSizeForNonTsFiles || totalNonTsFileSize > availableSpace) {
                const top5LargestFiles = fileNames.map(f => propertyReader.getFileName(f))
                    .filter(name => !hasTSFileExtension(name))
                    .map(name => ({ name, size: this.host.getFileSize!(name) }))
                    .sort((a, b) => b.size - a.size)
                    .slice(0, 5);
                this.logger.info(`Non TS file size exceeded limit (${totalNonTsFileSize}). Largest files: ${top5LargestFiles.map(file => `${file.name}:${file.size}`).join(", ")}`);
                // Keep the size as zero since it's disabled
                return fileName;
            }
        }
        this.projectToSizeMap.set(name, totalNonTsFileSize);
    }

    private createExternalProject(projectFileName: string, files: protocol.ExternalFile[], options: protocol.ExternalProjectCompilerOptions, typeAcquisition: TypeAcquisition, excludedFiles: NormalizedPath[]) {
        const compilerOptions = convertCompilerOptions(options);
        const watchOptionsAndErrors = convertWatchOptions(options, getDirectoryPath(normalizeSlashes(projectFileName)));
        const project = new ExternalProject(
            projectFileName,
            this,
            compilerOptions,
            /*lastFileExceededProgramSize*/ this.getFilenameForExceededTotalSizeLimitForNonTsFiles(projectFileName, compilerOptions, files, externalFilePropertyReader),
            options.compileOnSave === undefined ? true : options.compileOnSave,
            /*projectFilePath*/ undefined,
            watchOptionsAndErrors?.watchOptions,
        );
        project.setProjectErrors(watchOptionsAndErrors?.errors);
        project.excludedFiles = excludedFiles;

        this.addFilesToNonInferredProject(project, files, externalFilePropertyReader, typeAcquisition);
        this.externalProjects.push(project);
        return project;
    }

    /** @internal */
    sendProjectTelemetry(project: ExternalProject | ConfiguredProject): void {
        if (this.seenProjects.has(project.projectName)) {
            setProjectOptionsUsed(project);
            return;
        }
        this.seenProjects.set(project.projectName, true);

        if (!this.eventHandler || !this.host.createSHA256Hash) {
            setProjectOptionsUsed(project);
            return;
        }

        const projectOptions = isConfiguredProject(project) ? project.projectOptions as ProjectOptions : undefined;
        setProjectOptionsUsed(project);
        const data: ProjectInfoTelemetryEventData = {
            projectId: this.host.createSHA256Hash(project.projectName),
            fileStats: countEachFileTypes(project.getScriptInfos(), /*includeSizes*/ true),
            compilerOptions: convertCompilerOptionsForTelemetry(project.getCompilationSettings()),
            typeAcquisition: convertTypeAcquisition(project.getTypeAcquisition()),
            extends: projectOptions && projectOptions.configHasExtendsProperty,
            files: projectOptions && projectOptions.configHasFilesProperty,
            include: projectOptions && projectOptions.configHasIncludeProperty,
            exclude: projectOptions && projectOptions.configHasExcludeProperty,
            compileOnSave: project.compileOnSaveEnabled,
            configFileName: configFileName(),
            projectType: project instanceof ExternalProject ? "external" : "configured",
            languageServiceEnabled: project.languageServiceEnabled,
            version,
        };
        this.eventHandler({ eventName: ProjectInfoTelemetryEvent, data });

        function configFileName(): ProjectInfoTelemetryEventData["configFileName"] {
            if (!isConfiguredProject(project)) {
                return "other";
            }

            return getBaseConfigFileName(project.getConfigFilePath()) || "other";
        }

        function convertTypeAcquisition({ enable, include, exclude }: TypeAcquisition): ProjectInfoTypeAcquisitionData {
            return {
                enable,
                include: include !== undefined && include.length !== 0,
                exclude: exclude !== undefined && exclude.length !== 0,
            };
        }
    }

    private addFilesToNonInferredProject<T>(project: ConfiguredProject | ExternalProject, files: T[], propertyReader: FilePropertyReader<T>, typeAcquisition: TypeAcquisition): void {
        this.updateNonInferredProjectFiles(project, files, propertyReader);
        project.setTypeAcquisition(typeAcquisition);
        project.markAsDirty();
    }

    /** @internal */
    createConfiguredProject(configFileName: NormalizedPath, reason: string): ConfiguredProject {
        tracing?.instant(tracing.Phase.Session, "createConfiguredProject", { configFilePath: configFileName });
        const canonicalConfigFilePath = asNormalizedPath(this.toCanonicalFileName(configFileName));
        let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        // We could be in this scenario if project is the configured project tracked by external project
        // Since that route doesnt check if the config file is present or not
        if (!configFileExistenceInfo) {
            this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo = { exists: true });
        }
        else {
            configFileExistenceInfo.exists = true;
        }
        if (!configFileExistenceInfo.config) {
            configFileExistenceInfo.config = {
                cachedDirectoryStructureHost: createCachedDirectoryStructureHost(this.host, this.host.getCurrentDirectory(), this.host.useCaseSensitiveFileNames)!,
                projects: new Map(),
                updateLevel: ProgramUpdateLevel.Full,
            };
        }

        const project = new ConfiguredProject(
            configFileName,
            canonicalConfigFilePath,
            this,
            configFileExistenceInfo.config.cachedDirectoryStructureHost,
            reason,
        );
        Debug.assert(!this.configuredProjects.has(canonicalConfigFilePath));
        this.configuredProjects.set(canonicalConfigFilePath, project);
        this.createConfigFileWatcherForParsedConfig(configFileName, canonicalConfigFilePath, project);
        return project;
    }

    /**
     * Read the config file of the project, and update the project root file names.
     */
    private loadConfiguredProject(project: ConfiguredProject, reason: string) {
        tracing?.push(tracing.Phase.Session, "loadConfiguredProject", { configFilePath: project.canonicalConfigFilePath });
        this.sendProjectLoadingStartEvent(project, reason);

        // Read updated contents from disk
        const configFilename = toNormalizedPath(project.getConfigFilePath());
        const configFileExistenceInfo = this.ensureParsedConfigUptoDate(
            configFilename,
            project.canonicalConfigFilePath,
            this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!,
            project,
        );
        const parsedCommandLine = configFileExistenceInfo.config!.parsedCommandLine!;
        Debug.assert(!!parsedCommandLine.fileNames);
        const compilerOptions = parsedCommandLine.options;

        // Update the project
        if (!project.projectOptions) {
            project.projectOptions = {
                configHasExtendsProperty: parsedCommandLine.raw.extends !== undefined,
                configHasFilesProperty: parsedCommandLine.raw.files !== undefined,
                configHasIncludeProperty: parsedCommandLine.raw.include !== undefined,
                configHasExcludeProperty: parsedCommandLine.raw.exclude !== undefined,
            };
        }
        project.parsedCommandLine = parsedCommandLine;
        project.setProjectErrors(parsedCommandLine.options.configFile!.parseDiagnostics);
        project.updateReferences(parsedCommandLine.projectReferences);
        const lastFileExceededProgramSize = this.getFilenameForExceededTotalSizeLimitForNonTsFiles(project.canonicalConfigFilePath, compilerOptions, parsedCommandLine.fileNames, fileNamePropertyReader);
        if (lastFileExceededProgramSize) {
            project.disableLanguageService(lastFileExceededProgramSize);
            this.configFileExistenceInfoCache.forEach((_configFileExistenceInfo, canonicalConfigFilePath) => this.stopWatchingWildCards(canonicalConfigFilePath, project));
        }
        else {
            project.setCompilerOptions(compilerOptions);
            project.setWatchOptions(parsedCommandLine.watchOptions);
            project.enableLanguageService();
            this.watchWildcards(configFilename, configFileExistenceInfo, project);
        }
        project.enablePluginsWithOptions(compilerOptions);
        const filesToAdd = parsedCommandLine.fileNames.concat(project.getExternalFiles(ProgramUpdateLevel.Full));
        this.updateRootAndOptionsOfNonInferredProject(project, filesToAdd, fileNamePropertyReader, compilerOptions, parsedCommandLine.typeAcquisition!, parsedCommandLine.compileOnSave, parsedCommandLine.watchOptions);
        tracing?.pop();
    }

    /** @internal */
    ensureParsedConfigUptoDate(
        configFilename: NormalizedPath,
        canonicalConfigFilePath: NormalizedPath,
        configFileExistenceInfo: ConfigFileExistenceInfo,
        forProject: ConfiguredProject,
    ): ConfigFileExistenceInfo {
        if (configFileExistenceInfo.config) {
            if (configFileExistenceInfo.config.updateLevel === ProgramUpdateLevel.RootNamesAndUpdate) {
                this.reloadFileNamesOfParsedConfig(configFilename, configFileExistenceInfo.config);
            }
            if (!configFileExistenceInfo.config.updateLevel) {
                this.ensureConfigFileWatcherForProject(configFileExistenceInfo, forProject);
                return configFileExistenceInfo;
            }
        }

        // Dont update if file isnt on the disk
        if (!configFileExistenceInfo.exists && configFileExistenceInfo.config) {
            configFileExistenceInfo.config.updateLevel = undefined;
            this.ensureConfigFileWatcherForProject(configFileExistenceInfo, forProject);
            return configFileExistenceInfo;
        }

        // Parse the config file and ensure its cached
        const cachedDirectoryStructureHost = configFileExistenceInfo.config?.cachedDirectoryStructureHost ||
            createCachedDirectoryStructureHost(this.host, this.host.getCurrentDirectory(), this.host.useCaseSensitiveFileNames)!;

        // Read updated contents from disk
        const configFileContent = tryReadFile(configFilename, fileName => this.host.readFile(fileName));
        const configFile = parseJsonText(configFilename, isString(configFileContent) ? configFileContent : "") as TsConfigSourceFile;
        const configFileErrors = configFile.parseDiagnostics as Diagnostic[];
        if (!isString(configFileContent)) configFileErrors.push(configFileContent);
        const configDir = getDirectoryPath(configFilename);
        const parsedCommandLine = parseJsonSourceFileConfigFileContent(
            configFile,
            cachedDirectoryStructureHost,
            configDir,
            /*existingOptions*/ undefined,
            configFilename,
            /*resolutionStack*/ undefined,
            this.hostConfiguration.extraFileExtensions,
            this.extendedConfigCache,
        );

        if (parsedCommandLine.errors.length) {
            configFileErrors.push(...parsedCommandLine.errors);
        }

        this.logger.info(`Config: ${configFilename} : ${
            JSON.stringify(
                {
                    rootNames: parsedCommandLine.fileNames,
                    options: parsedCommandLine.options,
                    watchOptions: parsedCommandLine.watchOptions,
                    projectReferences: parsedCommandLine.projectReferences,
                },
                /*replacer*/ undefined,
                " ",
            )
        }`);

        const oldCommandLine = configFileExistenceInfo.config?.parsedCommandLine;
        if (!configFileExistenceInfo.config) {
            configFileExistenceInfo.config = { parsedCommandLine, cachedDirectoryStructureHost, projects: new Map() };
        }
        else {
            configFileExistenceInfo.config.parsedCommandLine = parsedCommandLine;
            configFileExistenceInfo.config.watchedDirectoriesStale = true;
            configFileExistenceInfo.config.updateLevel = undefined;
        }

        // If watch options different than older options when setting for the first time, update the config file watcher
        if (
            !oldCommandLine && !isJsonEqual(
                // Old options
                this.getWatchOptionsFromProjectWatchOptions(/*projectOptions*/ undefined, configDir),
                // New options
                this.getWatchOptionsFromProjectWatchOptions(parsedCommandLine.watchOptions, configDir),
            )
        ) {
            // Reset the config file watcher
            configFileExistenceInfo.watcher?.close();
            configFileExistenceInfo.watcher = undefined;
        }

        // Ensure there is watcher for this config file
        this.createConfigFileWatcherForParsedConfig(configFilename, canonicalConfigFilePath, forProject);
        // Watch extended config files
        updateSharedExtendedConfigFileWatcher(
            canonicalConfigFilePath,
            parsedCommandLine.options,
            this.sharedExtendedConfigFileWatchers,
            (extendedConfigFileName, extendedConfigFilePath) =>
                this.watchFactory.watchFile(
                    extendedConfigFileName,
                    () => {
                        // Update extended config cache
                        cleanExtendedConfigCache(this.extendedConfigCache, extendedConfigFilePath, fileName => this.toPath(fileName));
                        // Update projects
                        let ensureProjectsForOpenFiles = false;
                        this.sharedExtendedConfigFileWatchers.get(extendedConfigFilePath)?.projects.forEach(canonicalPath => {
                            ensureProjectsForOpenFiles = this.delayUpdateProjectsFromParsedConfigOnConfigFileChange(canonicalPath, `Change in extended config file ${extendedConfigFileName} detected`) || ensureProjectsForOpenFiles;
                        });
                        if (ensureProjectsForOpenFiles) this.delayEnsureProjectForOpenFiles();
                    },
                    PollingInterval.High,
                    this.hostConfiguration.watchOptions,
                    WatchType.ExtendedConfigFile,
                    configFilename,
                ),
            fileName => this.toPath(fileName),
        );
        return configFileExistenceInfo;
    }

    /** @internal */
    watchWildcards(configFileName: NormalizedPath, { exists, config }: ConfigFileExistenceInfo, forProject: ConfiguredProject): void {
        config!.projects.set(forProject.canonicalConfigFilePath, true);
        if (exists) {
            if (config!.watchedDirectories && !config!.watchedDirectoriesStale) return;
            config!.watchedDirectoriesStale = false;
            updateWatchingWildcardDirectories(
                config!.watchedDirectories ||= new Map(),
                config!.parsedCommandLine!.wildcardDirectories,
                // Create new directory watcher
                (directory, flags) => this.watchWildcardDirectory(directory, flags, configFileName, config!),
            );
        }
        else {
            config!.watchedDirectoriesStale = false;
            if (!config!.watchedDirectories) return;
            clearMap(config!.watchedDirectories, closeFileWatcherOf);
            config!.watchedDirectories = undefined;
        }
    }

    /** @internal */
    stopWatchingWildCards(canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject): void {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        if (
            !configFileExistenceInfo.config ||
            !configFileExistenceInfo.config.projects.get(forProject.canonicalConfigFilePath)
        ) {
            return;
        }

        configFileExistenceInfo.config.projects.set(forProject.canonicalConfigFilePath, false);
        // If any of the project is still watching wild cards dont close the watcher
        if (forEachEntry(configFileExistenceInfo.config.projects, identity)) return;

        if (configFileExistenceInfo.config.watchedDirectories) {
            clearMap(configFileExistenceInfo.config.watchedDirectories, closeFileWatcherOf);
            configFileExistenceInfo.config.watchedDirectories = undefined;
        }
        configFileExistenceInfo.config.watchedDirectoriesStale = undefined;
    }

    private updateNonInferredProjectFiles<T>(project: Project, files: readonly T[], propertyReader: FilePropertyReader<T>) {
        const projectRootFilesMap = project.getRootFilesMap();
        const newRootScriptInfoMap = new Map<string, true>();

        for (const f of files) {
            const newRootFile = propertyReader.getFileName(f);
            const fileName = toNormalizedPath(newRootFile);
            const isDynamic = isDynamicFileName(fileName);
            let path: Path;
            // Use the project's fileExists so that it can use caching instead of reaching to disk for the query
            if (!isDynamic && !project.fileExists(newRootFile)) {
                path = normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName);
                const existingValue = projectRootFilesMap.get(path);
                if (existingValue) {
                    if (existingValue.info?.path === path) {
                        project.removeFile(existingValue.info, /*fileExists*/ false, /*detachFromProject*/ true);
                        existingValue.info = undefined;
                    }
                    existingValue.fileName = fileName;
                }
                else {
                    projectRootFilesMap.set(path, { fileName });
                }
            }
            else {
                const scriptKind = propertyReader.getScriptKind(f, this.hostConfiguration.extraFileExtensions);
                const hasMixedContent = propertyReader.hasMixedContent(f, this.hostConfiguration.extraFileExtensions);
                const scriptInfo = Debug.checkDefined(this.getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
                    fileName,
                    project.currentDirectory,
                    scriptKind,
                    hasMixedContent,
                    project.directoryStructureHost,
                    /*deferredDeleteOk*/ false,
                ));
                path = scriptInfo.path;
                const existingValue = projectRootFilesMap.get(path);
                // If this script info is not already a root add it
                if (!existingValue || existingValue.info !== scriptInfo) {
                    project.addRoot(scriptInfo, fileName);
                    if (scriptInfo.isScriptOpen()) {
                        // if file is already root in some inferred project
                        // - remove the file from that project and delete the project if necessary
                        this.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo);
                    }
                }
                else {
                    // Already root update the fileName
                    existingValue.fileName = fileName;
                }
            }
            newRootScriptInfoMap.set(path, true);
        }

        // project's root file map size is always going to be same or larger than new roots map
        // as we have already all the new files to the project
        if (projectRootFilesMap.size > newRootScriptInfoMap.size) {
            projectRootFilesMap.forEach((value, path) => {
                if (!newRootScriptInfoMap.has(path)) {
                    if (value.info) {
                        project.removeFile(value.info, project.fileExists(value.info.fileName), /*detachFromProject*/ true);
                    }
                    else {
                        projectRootFilesMap.delete(path);
                    }
                }
            });
        }
    }

    private updateRootAndOptionsOfNonInferredProject<T>(project: ExternalProject | ConfiguredProject, newUncheckedFiles: T[], propertyReader: FilePropertyReader<T>, newOptions: CompilerOptions, newTypeAcquisition: TypeAcquisition, compileOnSave: boolean | undefined, watchOptions: WatchOptions | undefined) {
        project.setCompilerOptions(newOptions);
        project.setWatchOptions(watchOptions);
        // VS only set the CompileOnSaveEnabled option in the request if the option was changed recently
        // therefore if it is undefined, it should not be updated.
        if (compileOnSave !== undefined) {
            project.compileOnSaveEnabled = compileOnSave;
        }
        this.addFilesToNonInferredProject(project, newUncheckedFiles, propertyReader, newTypeAcquisition);
    }

    /**
     * Reload the file names from config file specs and update the project graph
     *
     * @internal
     */
    reloadFileNamesOfConfiguredProject(project: ConfiguredProject): boolean {
        const config = this.reloadFileNamesOfParsedConfig(project.getConfigFilePath(), this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!.config!);
        project.updateErrorOnNoInputFiles(config);
        this.updateNonInferredProjectFiles(
            project,
            config.fileNames.concat(project.getExternalFiles(ProgramUpdateLevel.RootNamesAndUpdate)),
            fileNamePropertyReader,
        );
        project.markAsDirty();
        return project.updateGraph();
    }

    private reloadFileNamesOfParsedConfig(configFileName: NormalizedPath, config: ParsedConfig) {
        if (config.updateLevel === undefined) return config.parsedCommandLine!;
        Debug.assert(config.updateLevel === ProgramUpdateLevel.RootNamesAndUpdate);
        const configFileSpecs = config.parsedCommandLine!.options.configFile!.configFileSpecs!;
        const fileNames = getFileNamesFromConfigSpecs(
            configFileSpecs,
            getDirectoryPath(configFileName),
            config.parsedCommandLine!.options,
            config.cachedDirectoryStructureHost,
            this.hostConfiguration.extraFileExtensions,
        );
        config.parsedCommandLine = { ...config.parsedCommandLine!, fileNames };
        config.updateLevel = undefined;
        return config.parsedCommandLine;
    }

    /** @internal */
    setFileNamesOfAutoImportProviderOrAuxillaryProject(
        project: AutoImportProviderProject | AuxiliaryProject,
        fileNames: readonly string[],
    ): void {
        this.updateNonInferredProjectFiles(project, fileNames, fileNamePropertyReader);
    }

    /** @internal */
    reloadConfiguredProjectOptimized(
        project: ConfiguredProject,
        reason: string,
        reloadedProjects: ConfiguredProjectToAnyReloadKind,
    ): void {
        if (reloadedProjects.has(project)) return;
        reloadedProjects.set(project, ConfiguredProjectLoadKind.ReloadOptimized);
        if (!project.initialLoadPending) {
            this.setProjectForReload(project, ProgramUpdateLevel.Full, reason);
        }
    }

    /** @internal */
    reloadConfiguredProjectClearingSemanticCache(
        project: ConfiguredProject,
        reason: string,
        reloadedProjects: ConfiguredProjectToAnyReloadKind,
    ): boolean {
        if (reloadedProjects.get(project) === ConfiguredProjectLoadKind.Reload) return false;
        reloadedProjects.set(project, ConfiguredProjectLoadKind.Reload);
        this.clearSemanticCache(project);
        this.reloadConfiguredProject(project, reloadReason(reason));
        return true;
    }

    private setProjectForReload(
        project: ConfiguredProject,
        updateLevel: ProgramUpdateLevel.Full,
        reason: string | undefined,
    ): void;
    private setProjectForReload(
        project: ConfiguredProject,
        updateLevel: ProgramUpdateLevel.Update,
    ): void;
    private setProjectForReload(
        project: ConfiguredProject,
        updateLevel: ProgramUpdateLevel,
        reason?: string,
    ) {
        if (updateLevel === ProgramUpdateLevel.Full) this.clearSemanticCache(project);
        project.pendingUpdateReason = reason && reloadReason(reason);
        project.pendingUpdateLevel = updateLevel;
    }

    /**
     * Read the config file of the project again by clearing the cache and update the project graph
     *
     * @internal
     */
    reloadConfiguredProject(project: ConfiguredProject, reason: string): void {
        project.initialLoadPending = false;
        this.setProjectForReload(project, ProgramUpdateLevel.Update);
        // Load project from the disk
        this.loadConfiguredProject(project, reason);
        updateWithTriggerFile(project, project.triggerFileForConfigFileDiag ?? project.getConfigFilePath(), /*isReload*/ true);
    }

    private clearSemanticCache(project: Project) {
        project.originalConfiguredProjects = undefined;
        project.resolutionCache.clear();
        project.getLanguageService(/*ensureSynchronized*/ false).cleanupSemanticCache();
        project.cleanupProgram();
        project.markAsDirty();
    }

    /** @internal */
    sendConfigFileDiagEvent(project: ConfiguredProject, triggerFile: NormalizedPath | undefined, force: boolean): boolean {
        if (!this.eventHandler || this.suppressDiagnosticEvents) return false;
        const diagnostics = project.getLanguageService().getCompilerOptionsDiagnostics();
        diagnostics.push(...project.getAllProjectErrors());

        if (!force && diagnostics.length === (project.configDiagDiagnosticsReported ?? 0)) return false;
        project.configDiagDiagnosticsReported = diagnostics.length;
        this.eventHandler(
            {
                eventName: ConfigFileDiagEvent,
                data: { configFileName: project.getConfigFilePath(), diagnostics, triggerFile: triggerFile ?? project.getConfigFilePath() },
            } satisfies ConfigFileDiagEvent,
        );
        return true;
    }

    private getOrCreateInferredProjectForProjectRootPathIfEnabled(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): InferredProject | undefined {
        if (
            !this.useInferredProjectPerProjectRoot ||
            // Its a dynamic info opened without project root
            (info.isDynamic && projectRootPath === undefined)
        ) {
            return undefined;
        }

        if (projectRootPath) {
            const canonicalProjectRootPath = this.toCanonicalFileName(projectRootPath);
            // if we have an explicit project root path, find (or create) the matching inferred project.
            for (const project of this.inferredProjects) {
                if (project.projectRootPath === canonicalProjectRootPath) {
                    return project;
                }
            }
            return this.createInferredProject(projectRootPath, /*isSingleInferredProject*/ false, projectRootPath);
        }

        // we don't have an explicit root path, so we should try to find an inferred project
        // that more closely contains the file.
        let bestMatch: InferredProject | undefined;
        for (const project of this.inferredProjects) {
            // ignore single inferred projects (handled elsewhere)
            if (!project.projectRootPath) continue;
            // ignore inferred projects that don't contain the root's path
            if (!containsPath(project.projectRootPath, info.path, this.host.getCurrentDirectory(), !this.host.useCaseSensitiveFileNames)) continue;
            // ignore inferred projects that are higher up in the project root.
            // TODO(rbuckton): Should we add the file as a root to these as well?
            if (bestMatch && bestMatch.projectRootPath!.length > project.projectRootPath.length) continue;
            bestMatch = project;
        }

        return bestMatch;
    }

    private getOrCreateSingleInferredProjectIfEnabled(): InferredProject | undefined {
        if (!this.useSingleInferredProject) {
            return undefined;
        }

        // If `useInferredProjectPerProjectRoot` is not enabled, then there will only be one
        // inferred project for all files. If `useInferredProjectPerProjectRoot` is enabled
        // then we want to put all files that are not opened with a `projectRootPath` into
        // the same inferred project.
        //
        // To avoid the cost of searching through the array and to optimize for the case where
        // `useInferredProjectPerProjectRoot` is not enabled, we will always put the inferred
        // project for non-rooted files at the front of the array.
        if (this.inferredProjects.length > 0 && this.inferredProjects[0].projectRootPath === undefined) {
            return this.inferredProjects[0];
        }

        // Single inferred project does not have a project root and hence no current directory
        return this.createInferredProject(
            this.currentDirectory,
            /*isSingleInferredProject*/ true,
            /*projectRootPath*/ undefined,
        );
    }

    private getOrCreateSingleInferredWithoutProjectRoot(currentDirectory: string): InferredProject {
        Debug.assert(!this.useSingleInferredProject);
        const expectedCurrentDirectory = this.toCanonicalFileName(this.getNormalizedAbsolutePath(currentDirectory));
        // Reuse the project with same current directory but no roots
        for (const inferredProject of this.inferredProjects) {
            if (
                !inferredProject.projectRootPath &&
                inferredProject.isOrphan() &&
                inferredProject.canonicalCurrentDirectory === expectedCurrentDirectory
            ) {
                return inferredProject;
            }
        }

        return this.createInferredProject(
            currentDirectory,
            /*isSingleInferredProject*/ false,
            /*projectRootPath*/ undefined,
        );
    }

    private createInferredProject(
        currentDirectory: string,
        isSingleInferredProject: boolean,
        projectRootPath: NormalizedPath | undefined,
    ): InferredProject {
        const compilerOptions = projectRootPath && this.compilerOptionsForInferredProjectsPerProjectRoot.get(projectRootPath) || this.compilerOptionsForInferredProjects!; // TODO: GH#18217
        let watchOptionsAndErrors: WatchOptionsAndErrors | false | undefined;
        let typeAcquisition: TypeAcquisition | undefined;
        if (projectRootPath) {
            watchOptionsAndErrors = this.watchOptionsForInferredProjectsPerProjectRoot.get(projectRootPath);
            typeAcquisition = this.typeAcquisitionForInferredProjectsPerProjectRoot.get(projectRootPath);
        }
        if (watchOptionsAndErrors === undefined) {
            watchOptionsAndErrors = this.watchOptionsForInferredProjects;
        }
        if (typeAcquisition === undefined) {
            typeAcquisition = this.typeAcquisitionForInferredProjects;
        }
        watchOptionsAndErrors = watchOptionsAndErrors || undefined;
        const project = new InferredProject(
            this,
            compilerOptions,
            watchOptionsAndErrors?.watchOptions,
            projectRootPath,
            currentDirectory,
            typeAcquisition,
        );
        project.setProjectErrors(watchOptionsAndErrors?.errors);
        if (isSingleInferredProject) {
            this.inferredProjects.unshift(project);
        }
        else {
            this.inferredProjects.push(project);
        }
        return project;
    }

    /** @internal */
    getOrCreateScriptInfoNotOpenedByClient(
        uncheckedFileName: string,
        currentDirectory: string,
        hostToQueryFileExistsOn: DirectoryStructureHost,
        deferredDeleteOk: boolean,
    ): ScriptInfo | undefined {
        return this.getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
            toNormalizedPath(uncheckedFileName),
            currentDirectory,
            /*scriptKind*/ undefined,
            /*hasMixedContent*/ undefined,
            hostToQueryFileExistsOn,
            deferredDeleteOk,
        );
    }

    getScriptInfo(uncheckedFileName: string): ScriptInfo | undefined {
        return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
    }

    /** @internal */
    getScriptInfoOrConfig(uncheckedFileName: string): ScriptInfoOrConfig | undefined {
        const path = toNormalizedPath(uncheckedFileName);
        const info = this.getScriptInfoForNormalizedPath(path);
        if (info) return info;
        const configProject = this.configuredProjects.get(this.toPath(uncheckedFileName));
        return configProject && configProject.getCompilerOptions().configFile;
    }

    /** @internal */
    logErrorForScriptInfoNotFound(fileName: string): void {
        const names = arrayFrom(
            mapDefinedIterator(
                this.filenameToScriptInfo.entries(),
                entry => entry[1].deferredDelete ? undefined : entry,
            ),
            ([path, scriptInfo]) => ({ path, fileName: scriptInfo.fileName }),
        );
        this.logger.msg(`Could not find file ${JSON.stringify(fileName)}.\nAll files are: ${JSON.stringify(names)}`, Msg.Err);
    }

    /**
     * Returns the projects that contain script info through SymLink
     * Note that this does not return projects in info.containingProjects
     *
     * @internal
     */
    getSymlinkedProjects(info: ScriptInfo): MultiMap<Path, Project> | undefined {
        let projects: MultiMap<Path, Project> | undefined;
        if (this.realpathToScriptInfos) {
            const realpath = info.getRealpathIfDifferent();
            if (realpath) {
                forEach(this.realpathToScriptInfos.get(realpath), combineProjects);
            }
            forEach(this.realpathToScriptInfos.get(info.path), combineProjects);
        }

        return projects;

        function combineProjects(toAddInfo: ScriptInfo) {
            if (toAddInfo !== info) {
                for (const project of toAddInfo.containingProjects) {
                    // Add the projects only if they can use symLink targets and not already in the list
                    if (
                        project.languageServiceEnabled &&
                        !project.isOrphan() &&
                        !project.getCompilerOptions().preserveSymlinks &&
                        !info.isAttached(project)
                    ) {
                        if (!projects) {
                            projects = createMultiMap();
                            projects.add(toAddInfo.path, project);
                        }
                        else if (!forEachEntry(projects, (projs, path) => path === toAddInfo.path ? false : contains(projs, project))) {
                            projects.add(toAddInfo.path, project);
                        }
                    }
                }
            }
        }
    }

    private watchClosedScriptInfo(info: ScriptInfo) {
        Debug.assert(!info.fileWatcher);
        // do not watch files with mixed content - server doesn't know how to interpret it
        // do not watch files in the global cache location
        if (
            !info.isDynamicOrHasMixedContent() &&
            (!this.globalCacheLocationDirectoryPath ||
                !startsWith(info.path, this.globalCacheLocationDirectoryPath))
        ) {
            const indexOfNodeModules = info.fileName.indexOf("/node_modules/");
            if (!this.host.getModifiedTime || indexOfNodeModules === -1) {
                info.fileWatcher = this.watchFactory.watchFile(
                    info.fileName,
                    (_fileName, eventKind) => this.onSourceFileChanged(info, eventKind),
                    PollingInterval.Medium,
                    this.hostConfiguration.watchOptions,
                    WatchType.ClosedScriptInfo,
                );
            }
            else {
                info.mTime = this.getModifiedTime(info);
                info.fileWatcher = this.watchClosedScriptInfoInNodeModules(info.fileName.substring(0, indexOfNodeModules));
            }
        }
    }

    private createNodeModulesWatcher(dir: string, dirPath: Path) {
        let watcher: FileWatcher | undefined = this.watchFactory.watchDirectory(
            dir,
            fileOrDirectory => {
                const fileOrDirectoryPath = removeIgnoredPath(this.toPath(fileOrDirectory));
                if (!fileOrDirectoryPath) return;

                // Clear module specifier cache for any projects whose cache was affected by
                // dependency package.jsons in this node_modules directory
                const basename = getBaseFileName(fileOrDirectoryPath);
                if (
                    result.affectedModuleSpecifierCacheProjects?.size && (
                        basename === "package.json" || basename === "node_modules"
                    )
                ) {
                    result.affectedModuleSpecifierCacheProjects.forEach(project => {
                        project.getModuleSpecifierCache()?.clear();
                    });
                }

                // Refresh closed script info after an npm install
                if (result.refreshScriptInfoRefCount) {
                    if (dirPath === fileOrDirectoryPath) {
                        this.refreshScriptInfosInDirectory(dirPath);
                    }
                    else {
                        const info = this.filenameToScriptInfo.get(fileOrDirectoryPath);
                        if (info) {
                            if (isScriptInfoWatchedFromNodeModules(info)) {
                                this.refreshScriptInfo(info);
                            }
                        }
                        // Folder
                        else if (!hasExtension(fileOrDirectoryPath)) {
                            this.refreshScriptInfosInDirectory(fileOrDirectoryPath);
                        }
                    }
                }
            },
            WatchDirectoryFlags.Recursive,
            this.hostConfiguration.watchOptions,
            WatchType.NodeModules,
        );
        const result: NodeModulesWatcher = {
            refreshScriptInfoRefCount: 0,
            affectedModuleSpecifierCacheProjects: undefined,
            close: () => {
                if (watcher && !result.refreshScriptInfoRefCount && !result.affectedModuleSpecifierCacheProjects?.size) {
                    watcher.close();
                    watcher = undefined;
                    this.nodeModulesWatchers.delete(dirPath);
                }
            },
        };
        this.nodeModulesWatchers.set(dirPath, result);
        return result;
    }

    /** @internal */
    watchPackageJsonsInNodeModules(dir: string, project: Project): FileWatcher {
        const dirPath = this.toPath(dir);
        const watcher = this.nodeModulesWatchers.get(dirPath) || this.createNodeModulesWatcher(dir, dirPath);
        Debug.assert(!watcher.affectedModuleSpecifierCacheProjects?.has(project));
        (watcher.affectedModuleSpecifierCacheProjects ||= new Set()).add(project);

        return {
            close: () => {
                watcher.affectedModuleSpecifierCacheProjects?.delete(project);
                watcher.close();
            },
        };
    }

    private watchClosedScriptInfoInNodeModules(dir: string): FileWatcher {
        const watchDir = dir + "/node_modules";
        const watchDirPath = this.toPath(watchDir);
        const watcher = this.nodeModulesWatchers.get(watchDirPath) || this.createNodeModulesWatcher(watchDir, watchDirPath);
        watcher.refreshScriptInfoRefCount++;

        return {
            close: () => {
                watcher.refreshScriptInfoRefCount--;
                watcher.close();
            },
        };
    }

    private getModifiedTime(info: ScriptInfo) {
        return (this.host.getModifiedTime!(info.fileName) || missingFileModifiedTime).getTime();
    }

    private refreshScriptInfo(info: ScriptInfo) {
        const mTime = this.getModifiedTime(info);
        if (mTime !== info.mTime) {
            const eventKind = getFileWatcherEventKind(info.mTime!, mTime);
            info.mTime = mTime;
            this.onSourceFileChanged(info, eventKind);
        }
    }

    private refreshScriptInfosInDirectory(dir: Path) {
        dir = dir + directorySeparator as Path;
        this.filenameToScriptInfo.forEach(info => {
            if (isScriptInfoWatchedFromNodeModules(info) && startsWith(info.path, dir)) {
                this.refreshScriptInfo(info);
            }
        });
    }

    private stopWatchingScriptInfo(info: ScriptInfo) {
        if (info.fileWatcher) {
            info.fileWatcher.close();
            info.fileWatcher = undefined;
        }
    }

    private getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
        fileName: NormalizedPath,
        currentDirectory: string,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean | undefined,
        hostToQueryFileExistsOn: DirectoryStructureHost | undefined,
        deferredDeleteOk: boolean,
    ) {
        if (isRootedDiskPath(fileName) || isDynamicFileName(fileName)) {
            return this.getOrCreateScriptInfoWorker(
                fileName,
                currentDirectory,
                /*openedByClient*/ false,
                /*fileContent*/ undefined,
                scriptKind,
                !!hasMixedContent,
                hostToQueryFileExistsOn,
                deferredDeleteOk,
            );
        }

        // This is non rooted path with different current directory than project service current directory
        // Only paths recognized are open relative file paths
        const info = this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName));
        if (info) {
            return info;
        }

        // This means triple slash references wont be resolved in dynamic and unsaved files
        // which is intentional since we dont know what it means to be relative to non disk files
        return undefined;
    }

    getOrCreateScriptInfoForNormalizedPath(
        fileName: NormalizedPath,
        openedByClient: boolean,
        fileContent?: string,
        scriptKind?: ScriptKind,
        hasMixedContent?: boolean,
        hostToQueryFileExistsOn?: { fileExists(path: string): boolean; },
    ): ScriptInfo | undefined {
        return this.getOrCreateScriptInfoWorker(
            fileName,
            this.currentDirectory,
            openedByClient,
            fileContent,
            scriptKind,
            !!hasMixedContent,
            hostToQueryFileExistsOn,
            /*deferredDeleteOk*/ false,
        );
    }

    private getOrCreateScriptInfoWorker(
        fileName: NormalizedPath,
        currentDirectory: string,
        openedByClient: boolean,
        fileContent: string | undefined,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean,
        hostToQueryFileExistsOn: { fileExists(path: string): boolean; } | undefined,
        deferredDeleteOk: boolean,
    ) {
        Debug.assert(fileContent === undefined || openedByClient, "ScriptInfo needs to be opened by client to be able to set its user defined content");
        const path = normalizedPathToPath(fileName, currentDirectory, this.toCanonicalFileName);
        let info = this.filenameToScriptInfo.get(path);
        if (!info) {
            const isDynamic = isDynamicFileName(fileName);
            Debug.assert(isRootedDiskPath(fileName) || isDynamic || openedByClient, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nScript info with non-dynamic relative file name can only be open script info or in context of host currentDirectory`);
            Debug.assert(!isRootedDiskPath(fileName) || this.currentDirectory === currentDirectory || !this.openFilesWithNonRootedDiskPath.has(this.toCanonicalFileName(fileName)), "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nOpen script files with non rooted disk path opened with current directory context cannot have same canonical names`);
            Debug.assert(!isDynamic || this.currentDirectory === currentDirectory || this.useInferredProjectPerProjectRoot, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`);
            // If the file is not opened by client and the file doesnot exist on the disk, return
            if (!openedByClient && !isDynamic && !(hostToQueryFileExistsOn || this.host).fileExists(fileName)) {
                return;
            }
            info = new ScriptInfo(this.host, fileName, scriptKind!, hasMixedContent, path, this.filenameToScriptInfoVersion.get(path));
            this.filenameToScriptInfo.set(info.path, info);
            this.filenameToScriptInfoVersion.delete(info.path);
            if (!openedByClient) {
                this.watchClosedScriptInfo(info);
            }
            else if (!isRootedDiskPath(fileName) && (!isDynamic || this.currentDirectory !== currentDirectory)) {
                // File that is opened by user but isn't rooted disk path
                this.openFilesWithNonRootedDiskPath.set(this.toCanonicalFileName(fileName), info);
            }
        }
        else if (info.deferredDelete) {
            Debug.assert(!info.isDynamic);
            // If the file is not opened by client and the file doesnot exist on the disk, return
            if (!openedByClient && !(hostToQueryFileExistsOn || this.host).fileExists(fileName)) {
                return deferredDeleteOk ? info : undefined;
            }
            info.deferredDelete = undefined;
        }
        if (openedByClient) {
            // Opening closed script info
            // either it was created just now, or was part of projects but was closed
            this.stopWatchingScriptInfo(info);
            info.open(fileContent);
            if (hasMixedContent) {
                info.registerFileUpdate();
            }
        }
        return info;
    }

    /**
     * This gets the script info for the normalized path. If the path is not rooted disk path then the open script info with project root context is preferred
     */
    getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined {
        return !isRootedDiskPath(fileName) && this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName)) ||
            this.getScriptInfoForPath(normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName));
    }

    getScriptInfoForPath(fileName: Path): ScriptInfo | undefined {
        const info = this.filenameToScriptInfo.get(fileName);
        return !info || !info.deferredDelete ? info : undefined;
    }

    /** @internal */
    getDocumentPositionMapper(project: Project, generatedFileName: string, sourceFileName?: string): DocumentPositionMapper | undefined {
        // Since declaration info and map file watches arent updating project's directory structure host (which can cache file structure) use host
        const declarationInfo = this.getOrCreateScriptInfoNotOpenedByClient(
            generatedFileName,
            project.currentDirectory,
            this.host,
            /*deferredDeleteOk*/ false,
        );
        if (!declarationInfo) {
            if (sourceFileName) {
                // Project contains source file and it generates the generated file name
                project.addGeneratedFileWatch(generatedFileName, sourceFileName);
            }
            return undefined;
        }

        // Try to get from cache
        declarationInfo.getSnapshot(); // Ensure synchronized
        if (isString(declarationInfo.sourceMapFilePath)) {
            // Ensure mapper is synchronized
            const sourceMapFileInfo = this.getScriptInfoForPath(declarationInfo.sourceMapFilePath);
            if (sourceMapFileInfo) {
                sourceMapFileInfo.getSnapshot();
                if (sourceMapFileInfo.documentPositionMapper !== undefined) {
                    sourceMapFileInfo.sourceInfos = this.addSourceInfoToSourceMap(sourceFileName, project, sourceMapFileInfo.sourceInfos);
                    return sourceMapFileInfo.documentPositionMapper ? sourceMapFileInfo.documentPositionMapper : undefined;
                }
            }
            declarationInfo.sourceMapFilePath = undefined;
        }
        else if (declarationInfo.sourceMapFilePath) {
            declarationInfo.sourceMapFilePath.sourceInfos = this.addSourceInfoToSourceMap(sourceFileName, project, declarationInfo.sourceMapFilePath.sourceInfos);
            return undefined;
        }
        else if (declarationInfo.sourceMapFilePath !== undefined) {
            // Doesnt have sourceMap
            return undefined;
        }

        // Create the mapper
        let sourceMapFileInfo: ScriptInfo | string | undefined;
        let readMapFile: ReadMapFile | undefined = (mapFileName, mapFileNameFromDts) => {
            const mapInfo = this.getOrCreateScriptInfoNotOpenedByClient(
                mapFileName,
                project.currentDirectory,
                this.host,
                /*deferredDeleteOk*/ true,
            );
            sourceMapFileInfo = mapInfo || mapFileNameFromDts;
            if (!mapInfo || mapInfo.deferredDelete) return undefined;
            const snap = mapInfo.getSnapshot();
            if (mapInfo.documentPositionMapper !== undefined) return mapInfo.documentPositionMapper;
            return getSnapshotText(snap);
        };
        const projectName = project.projectName;
        const documentPositionMapper = getDocumentPositionMapper(
            { getCanonicalFileName: this.toCanonicalFileName, log: s => this.logger.info(s), getSourceFileLike: f => this.getSourceFileLike(f, projectName, declarationInfo) },
            declarationInfo.fileName,
            declarationInfo.textStorage.getLineInfo(),
            readMapFile,
        );
        readMapFile = undefined; // Remove ref to project
        if (sourceMapFileInfo) {
            if (!isString(sourceMapFileInfo)) {
                declarationInfo.sourceMapFilePath = sourceMapFileInfo.path;
                sourceMapFileInfo.declarationInfoPath = declarationInfo.path;
                if (!sourceMapFileInfo.deferredDelete) sourceMapFileInfo.documentPositionMapper = documentPositionMapper || false;
                sourceMapFileInfo.sourceInfos = this.addSourceInfoToSourceMap(sourceFileName, project, sourceMapFileInfo.sourceInfos);
            }
            else {
                declarationInfo.sourceMapFilePath = {
                    watcher: this.addMissingSourceMapFile(
                        project.currentDirectory === this.currentDirectory ?
                            sourceMapFileInfo :
                            getNormalizedAbsolutePath(sourceMapFileInfo, project.currentDirectory),
                        declarationInfo.path,
                    ),
                    sourceInfos: this.addSourceInfoToSourceMap(sourceFileName, project),
                };
            }
        }
        else {
            declarationInfo.sourceMapFilePath = false;
        }
        return documentPositionMapper;
    }

    private addSourceInfoToSourceMap(sourceFileName: string | undefined, project: Project, sourceInfos?: Set<Path>) {
        if (sourceFileName) {
            // Attach as source
            const sourceInfo = this.getOrCreateScriptInfoNotOpenedByClient(
                sourceFileName,
                project.currentDirectory,
                project.directoryStructureHost,
                /*deferredDeleteOk*/ false,
            )!;
            (sourceInfos || (sourceInfos = new Set())).add(sourceInfo.path);
        }
        return sourceInfos;
    }

    private addMissingSourceMapFile(mapFileName: string, declarationInfoPath: Path) {
        const fileWatcher = this.watchFactory.watchFile(
            mapFileName,
            () => {
                const declarationInfo = this.getScriptInfoForPath(declarationInfoPath);
                if (declarationInfo && declarationInfo.sourceMapFilePath && !isString(declarationInfo.sourceMapFilePath)) {
                    // Update declaration and source projects
                    this.delayUpdateProjectGraphs(declarationInfo.containingProjects, /*clearSourceMapperCache*/ true);
                    this.delayUpdateSourceInfoProjects(declarationInfo.sourceMapFilePath.sourceInfos);
                    declarationInfo.closeSourceMapFileWatcher();
                }
            },
            PollingInterval.High,
            this.hostConfiguration.watchOptions,
            WatchType.MissingSourceMapFile,
        );
        return fileWatcher;
    }

    /** @internal */
    getSourceFileLike(fileName: string, projectNameOrProject: string | Project, declarationInfo?: ScriptInfo): SourceFileLike | undefined {
        const project = (projectNameOrProject as Project).projectName ? projectNameOrProject as Project : this.findProject(projectNameOrProject as string);
        if (project) {
            const path = project.toPath(fileName);
            const sourceFile = project.getSourceFile(path);
            if (sourceFile && sourceFile.resolvedPath === path) return sourceFile;
        }

        // Need to look for other files.
        const info = this.getOrCreateScriptInfoNotOpenedByClient(
            fileName,
            (project || this).currentDirectory,
            project ? project.directoryStructureHost : this.host,
            /*deferredDeleteOk*/ false,
        );
        if (!info) return undefined;

        // Attach as source
        if (declarationInfo && isString(declarationInfo.sourceMapFilePath) && info !== declarationInfo) {
            const sourceMapInfo = this.getScriptInfoForPath(declarationInfo.sourceMapFilePath);
            if (sourceMapInfo) {
                (sourceMapInfo.sourceInfos ??= new Set()).add(info.path);
            }
        }

        // Key doesnt matter since its only for text and lines
        if (info.cacheSourceFile) return info.cacheSourceFile.sourceFile;

        // Create sourceFileLike
        if (!info.sourceFileLike) {
            info.sourceFileLike = {
                get text() {
                    Debug.fail("shouldnt need text");
                    return "";
                },
                getLineAndCharacterOfPosition: pos => {
                    const lineOffset = info.positionToLineOffset(pos);
                    return { line: lineOffset.line - 1, character: lineOffset.offset - 1 };
                },
                getPositionOfLineAndCharacter: (line, character, allowEdits) => info.lineOffsetToPosition(line + 1, character + 1, allowEdits),
            };
        }
        return info.sourceFileLike;
    }

    /** @internal */
    setPerformanceEventHandler(performanceEventHandler: PerformanceEventHandler): void {
        this.performanceEventHandler = performanceEventHandler;
    }

    setHostConfiguration(args: protocol.ConfigureRequestArguments): void {
        if (args.file) {
            const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(args.file));
            if (info) {
                info.setOptions(convertFormatOptions(args.formatOptions!), args.preferences);
                this.logger.info(`Host configuration update for file ${args.file}`);
            }
        }
        else {
            if (args.hostInfo !== undefined) {
                this.hostConfiguration.hostInfo = args.hostInfo;
                this.logger.info(`Host information ${args.hostInfo}`);
            }
            if (args.formatOptions) {
                this.hostConfiguration.formatCodeOptions = { ...this.hostConfiguration.formatCodeOptions, ...convertFormatOptions(args.formatOptions) };
                this.logger.info("Format host information updated");
            }
            if (args.preferences) {
                const {
                    lazyConfiguredProjectsFromExternalProject,
                    includePackageJsonAutoImports,
                    includeCompletionsForModuleExports,
                } = this.hostConfiguration.preferences;

                this.hostConfiguration.preferences = { ...this.hostConfiguration.preferences, ...args.preferences };
                if (lazyConfiguredProjectsFromExternalProject && !this.hostConfiguration.preferences.lazyConfiguredProjectsFromExternalProject) {
                    // Load configured projects for external projects that are pending reload
                    this.externalProjectToConfiguredProjectMap.forEach(projects =>
                        projects.forEach(project => {
                            if (
                                !project.deferredClose &&
                                !project.isClosed() &&
                                project.pendingUpdateLevel === ProgramUpdateLevel.Full &&
                                !this.hasPendingProjectUpdate(project)
                            ) {
                                project.updateGraph();
                            }
                        })
                    );
                }
                if (
                    includePackageJsonAutoImports !== args.preferences.includePackageJsonAutoImports ||
                    !!includeCompletionsForModuleExports !== !!args.preferences.includeCompletionsForModuleExports
                ) {
                    this.forEachProject(project => {
                        project.onAutoImportProviderSettingsChanged();
                    });
                }
            }
            if (args.extraFileExtensions) {
                this.hostConfiguration.extraFileExtensions = args.extraFileExtensions;
                // We need to update the project structures again as it is possible that existing
                // project structure could have more or less files depending on extensions permitted
                this.reloadProjects();
                this.logger.info("Host file extension mappings updated");
            }

            if (args.watchOptions) {
                const watchOptions = convertWatchOptions(args.watchOptions)?.watchOptions;
                const substitution = handleWatchOptionsConfigDirTemplateSubstitution(watchOptions, this.currentDirectory);
                this.hostConfiguration.watchOptions = substitution;
                this.hostConfiguration.beforeSubstitution = substitution === watchOptions ? undefined : watchOptions;
                this.logger.info(`Host watch options changed to ${JSON.stringify(this.hostConfiguration.watchOptions)}, it will be take effect for next watches.`);
            }
        }
    }

    /** @internal */
    getWatchOptions(project: Project): WatchOptions | undefined {
        return this.getWatchOptionsFromProjectWatchOptions(project.getWatchOptions(), project.getCurrentDirectory());
    }

    private getWatchOptionsFromProjectWatchOptions(projectOptions: WatchOptions | undefined, basePath: string) {
        const hostWatchOptions = !this.hostConfiguration.beforeSubstitution ? this.hostConfiguration.watchOptions :
            handleWatchOptionsConfigDirTemplateSubstitution(
                this.hostConfiguration.beforeSubstitution,
                basePath,
            );
        return projectOptions && hostWatchOptions ?
            { ...hostWatchOptions, ...projectOptions } :
            projectOptions || hostWatchOptions;
    }

    closeLog(): void {
        this.logger.close();
    }

    private sendSourceFileChange(inPath: Path | undefined) {
        this.filenameToScriptInfo.forEach(info => {
            if (this.openFiles.has(info.path)) return; // Skip open files
            if (!info.fileWatcher) return; // not watched file
            const eventKind = memoize(() =>
                this.host.fileExists(info.fileName) ?
                    info.deferredDelete ?
                        FileWatcherEventKind.Created :
                        FileWatcherEventKind.Changed :
                    FileWatcherEventKind.Deleted
            );
            if (inPath) {
                // Skip node modules and files that are not in path
                if (isScriptInfoWatchedFromNodeModules(info) || !info.path.startsWith(inPath)) return;
                // If we are sending delete event and its already deleted, ignore
                if (eventKind() === FileWatcherEventKind.Deleted && info.deferredDelete) return;
                // In change cases, its hard to know if this is marked correctly across files and projects, so just send the event
                this.logger.info(`Invoking sourceFileChange on ${info.fileName}:: ${eventKind()}`);
            }

            // Handle as if file is changed or deleted
            this.onSourceFileChanged(
                info,
                eventKind(),
            );
        });
    }

    /**
     * This function rebuilds the project for every file opened by the client
     * This does not reload contents of open files from disk. But we could do that if needed
     */
    reloadProjects(): void {
        this.logger.info("reload projects.");
        // If we want this to also reload open files from disk, we could do that,
        // but then we need to make sure we arent calling this function
        // (and would separate out below reloading of projects to be called when immediate reload is needed)
        // as there is no need to load contents of the files from the disk

        // Reload script infos
        this.sendSourceFileChange(/*inPath*/ undefined);
        // Cancel all project updates since we will be updating them now
        this.pendingProjectUpdates.forEach((_project, projectName) => {
            this.throttledOperations.cancel(projectName);
            this.pendingProjectUpdates.delete(projectName);
        });
        this.throttledOperations.cancel(ensureProjectForOpenFileSchedule);
        this.pendingOpenFileProjectUpdates = undefined;
        this.pendingEnsureProjectForOpenFiles = false;

        // Ensure everything is reloaded for cached configs
        this.configFileExistenceInfoCache.forEach(info => {
            if (info.config) {
                info.config.updateLevel = ProgramUpdateLevel.Full;
                info.config.cachedDirectoryStructureHost.clearCache();
            }
        });
        this.configFileForOpenFiles.clear();

        // Reload Projects
        this.externalProjects.forEach(project => {
            this.clearSemanticCache(project);
            project.updateGraph();
        });

        // Configured projects of external files
        const reloadedConfiguredProjects: ConfiguredProjectToAnyReloadKind = new Map();
        const delayReloadedConfiguredProjects = new Set<ConfiguredProject>();
        this.externalProjectToConfiguredProjectMap.forEach((projects, externalProjectName) => {
            const reason = `Reloading configured project in external project: ${externalProjectName}`;
            projects.forEach(project => {
                if (this.getHostPreferences().lazyConfiguredProjectsFromExternalProject) {
                    this.reloadConfiguredProjectOptimized(project, reason, reloadedConfiguredProjects);
                }
                else {
                    this.reloadConfiguredProjectClearingSemanticCache(
                        project,
                        reason,
                        reloadedConfiguredProjects,
                    );
                }
            });
        });

        // Configured projects for open file
        this.openFiles.forEach((_projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            if (find(info.containingProjects, isExternalProject)) return;
            this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                info,
                ConfiguredProjectLoadKind.Reload,
                reloadedConfiguredProjects,
                delayReloadedConfiguredProjects,
            );
        });

        // Retain delay loaded configured projects too
        delayReloadedConfiguredProjects.forEach(p => reloadedConfiguredProjects.set(p, ConfiguredProjectLoadKind.Reload));

        this.inferredProjects.forEach(project => this.clearSemanticCache(project));
        this.ensureProjectForOpenFiles();

        // Cleanup
        this.cleanupProjectsAndScriptInfos(
            reloadedConfiguredProjects,
            new Set(this.openFiles.keys()),
            new Set(this.externalProjectToConfiguredProjectMap.keys()),
        );

        this.logger.info("After reloading projects..");
        this.printProjects();
    }

    /**
     * Remove the root of inferred project if script info is part of another project
     */
    private removeRootOfInferredProjectIfNowPartOfOtherProject(info: ScriptInfo) {
        // If the script info is root of inferred project, it could only be first containing project
        // since info is added as root to the inferred project only when there are no other projects containing it
        // So when it is root of the inferred project and after project structure updates its now part
        // of multiple project it needs to be removed from that inferred project because:
        // - references in inferred project supersede the root part
        // - root / reference in non - inferred project beats root in inferred project

        // eg. say this is structure /a/b/a.ts /a/b/c.ts where c.ts references a.ts
        // When a.ts is opened, since there is no configured project/external project a.ts can be part of
        // a.ts is added as root to inferred project.
        // Now at time of opening c.ts, c.ts is also not aprt of any existing project,
        // so it will be added to inferred project as a root. (for sake of this example assume single inferred project is false)
        // So at this poing a.ts is part of first inferred project and second inferred project (of which c.ts is root)
        // And hence it needs to be removed from the first inferred project.
        Debug.assert(info.containingProjects.length > 0);
        const firstProject = info.containingProjects[0];

        if (
            !firstProject.isOrphan() &&
            isInferredProject(firstProject) &&
            firstProject.isRoot(info) &&
            forEach(info.containingProjects, p => p !== firstProject && !p.isOrphan())
        ) {
            firstProject.removeFile(info, /*fileExists*/ true, /*detachFromProject*/ true);
        }
    }

    /**
     * This function is to update the project structure for every inferred project.
     * It is called on the premise that all the configured projects are
     * up to date.
     * This will go through open files and assign them to inferred project if open file is not part of any other project
     * After that all the inferred project graphs are updated
     */
    private ensureProjectForOpenFiles() {
        this.logger.info("Before ensureProjectForOpenFiles:");
        this.printProjects();

        // Ensure that default projects for pending openFile updates are created
        const pendingOpenFileProjectUpdates = this.pendingOpenFileProjectUpdates;
        this.pendingOpenFileProjectUpdates = undefined;
        pendingOpenFileProjectUpdates?.forEach((_config, path) =>
            this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                this.getScriptInfoForPath(path)!,
                ConfiguredProjectLoadKind.Create,
            )
        );

        // Assigned the orphan scriptInfos to inferred project
        // Remove the infos from inferred project that no longer need to be part of it
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            // collect all orphaned script infos from open files
            if (info.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(info, projectRootPath);
            }
            else {
                // Or remove the root of inferred project if is referenced in more than one projects
                this.removeRootOfInferredProjectIfNowPartOfOtherProject(info);
            }
        });
        this.pendingEnsureProjectForOpenFiles = false;
        this.inferredProjects.forEach(updateProjectIfDirty);

        this.logger.info("After ensureProjectForOpenFiles:");
        this.printProjects();
    }

    /**
     * Open file whose contents is managed by the client
     * @param filename is absolute pathname
     * @param fileContent is a known version of the file content that is more up to date than the one on disk
     */
    openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: string): OpenConfiguredProjectResult {
        return this.openClientFileWithNormalizedPath(toNormalizedPath(fileName), fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath ? toNormalizedPath(projectRootPath) : undefined);
    }

    /** @internal */
    getOriginalLocationEnsuringConfiguredProject(project: Project, location: DocumentPosition): DocumentPosition | undefined {
        const isSourceOfProjectReferenceRedirect = project.isSourceOfProjectReferenceRedirect(location.fileName);
        const originalLocation = isSourceOfProjectReferenceRedirect ?
            location :
            project.getSourceMapper().tryGetSourcePosition(location);
        if (!originalLocation) return undefined;

        const { fileName } = originalLocation;
        const scriptInfo = this.getScriptInfo(fileName);
        if (!scriptInfo && !this.host.fileExists(fileName)) return undefined;

        const originalFileInfo: OriginalFileInfo = { fileName: toNormalizedPath(fileName), path: this.toPath(fileName) };
        const configFileName = this.getConfigFileNameForFile(originalFileInfo, /*findFromCacheOnly*/ false);
        if (!configFileName) return undefined;

        let configuredProject: ConfiguredProject | undefined = this.findConfiguredProjectByProjectName(configFileName);
        if (!configuredProject) {
            if (project.getCompilerOptions().disableReferencedProjectLoad) {
                // If location was a project reference redirect, then `location` and `originalLocation` are the same.
                if (isSourceOfProjectReferenceRedirect) {
                    return location;
                }

                // Otherwise, if we found `originalLocation` via a source map instead, then we check whether it's in
                // an open project.  If it is, we should search the containing project(s), even though the "default"
                // configured project isn't open.  However, if it's not in an open project, we need to stick with
                // `location` (i.e. the .d.ts file) because otherwise we'll miss the references in that file.
                return scriptInfo?.containingProjects.length
                    ? originalLocation
                    : location;
            }

            configuredProject = this.createConfiguredProject(configFileName, `Creating project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`);
        }
        const result = this.tryFindDefaultConfiguredProjectForOpenScriptInfoOrClosedFileInfo(
            originalFileInfo,
            ConfiguredProjectLoadKind.Create,
            updateProjectFoundUsingFind(
                configuredProject,
                ConfiguredProjectLoadKind.CreateOptimized,
            ),
            project => `Creating project referenced in solution ${project.projectName} to find possible configured project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`,
        );
        if (!result.defaultProject) return undefined;
        if (result.defaultProject === project) return originalLocation;

        // Keep this configured project as referenced from project
        addOriginalConfiguredProject(result.defaultProject);

        const originalScriptInfo = this.getScriptInfo(fileName);
        if (!originalScriptInfo || !originalScriptInfo.containingProjects.length) return undefined;

        // Add configured projects as referenced
        originalScriptInfo.containingProjects.forEach(project => {
            if (isConfiguredProject(project)) {
                addOriginalConfiguredProject(project);
            }
        });
        return originalLocation;

        function addOriginalConfiguredProject(originalProject: ConfiguredProject) {
            (project.originalConfiguredProjects ??= new Set()).add(originalProject.canonicalConfigFilePath);
        }
    }

    /** @internal */
    fileExists(fileName: NormalizedPath): boolean {
        return !!this.getScriptInfoForNormalizedPath(fileName) || this.host.fileExists(fileName);
    }

    private findExternalProjectContainingOpenScriptInfo(info: ScriptInfo): ExternalProject | undefined {
        return find(this.externalProjects, proj => {
            // Ensure project structure is up-to-date to check if info is present in external project
            updateProjectIfDirty(proj);
            return proj.containsScriptInfo(info);
        });
    }

    private getOrCreateOpenScriptInfo(
        fileName: NormalizedPath,
        fileContent: string | undefined,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean | undefined,
        projectRootPath: NormalizedPath | undefined,
    ) {
        const info = this.getOrCreateScriptInfoWorker(
            fileName,
            projectRootPath ? this.getNormalizedAbsolutePath(projectRootPath) : this.currentDirectory,
            /*openedByClient*/ true,
            fileContent,
            scriptKind,
            !!hasMixedContent,
            /*hostToQueryFileExistsOn*/ undefined,
            /*deferredDeleteOk*/ true,
        )!;
        this.openFiles.set(info.path, projectRootPath);
        return info;
    }

    private assignProjectToOpenedScriptInfo(info: ScriptInfo): AssignProjectResult {
        let configFileName: NormalizedPath | undefined;
        let configFileErrors: readonly Diagnostic[] | undefined;
        const project = this.findExternalProjectContainingOpenScriptInfo(info);
        let retainProjects: ConfigureProjectToLoadKind | undefined;
        let sentConfigDiag: Set<ConfiguredProject> | undefined;
        if (!project && this.serverMode === LanguageServiceMode.Semantic) { // Checking semantic mode is an optimization
            const result = this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                info,
                ConfiguredProjectLoadKind.Create,
            );
            if (result) {
                retainProjects = result.seenProjects;
                sentConfigDiag = result.sentConfigDiag;
                if (result.defaultProject) {
                    configFileName = result.defaultProject.getConfigFilePath();
                    configFileErrors = result.defaultProject.getAllProjectErrors();
                }
            }
        }

        // Project we have at this point is going to be updated since its either found through
        // - external project search, which updates the project before checking if info is present in it
        // - configured project - either created or updated to ensure we know correct status of info

        // At this point we need to ensure that containing projects of the info are uptodate
        // This will ensure that later question of info.isOrphan() will return correct answer
        // and we correctly create inferred project for the info
        info.containingProjects.forEach(updateProjectIfDirty);

        // At this point if file is part of any any configured or external project, then it would be present in the containing projects
        // So if it still doesnt have any containing projects, it needs to be part of inferred project
        if (info.isOrphan()) {
            // Even though this info did not belong to any of the configured projects, send the config file diag for all non optimized loads
            retainProjects?.forEach((kind, project) => {
                if (
                    kind !== ConfiguredProjectLoadKind.CreateOptimized &&
                    !sentConfigDiag!.has(project)
                ) this.sendConfigFileDiagEvent(project, info.fileName, /*force*/ true);
            });
            Debug.assert(this.openFiles.has(info.path));
            this.assignOrphanScriptInfoToInferredProject(info, this.openFiles.get(info.path));
        }
        Debug.assert(!info.isOrphan());
        return { configFileName, configFileErrors, retainProjects };
    }

    /**
     * Depending on kind
     * - Find the configuedProject and return it - if allowDeferredClosed is set it will find the deferredClosed project as well
     * - Create - if the project doesnt exist, it creates one as well. If not delayLoad, the project is updated (with triggerFile if passed)
     * - Reload - if the project doesnt exist, it creates one. If not delayLoad, the project is reloaded clearing semantic cache
     *  @internal
     */
    findCreateOrReloadConfiguredProject(
        configFileName: NormalizedPath,
        kind: ConfiguredProjectLoadKind,
        /** Used with ConfiguredProjectLoadKind.Create or ConfiguredProjectLoadKind.Reload for new projects or reload updates */
        reason?: string,
        /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
        allowDeferredClosed?: boolean,
        /** Used with ConfiguredProjectLoadKind.Create to send configFileDiag */
        triggerFile?: NormalizedPath,
        /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
        reloadedProjects?: ConfiguredProjectToAnyReloadKind,
        /** Used with ConfiguredProjectLoadKind.Create to specify only create project without updating */
        delayLoad?: boolean,
        /** Used with ConfiguredProjectLoadKind.Reload to specify delay reload, and also a set of configured projects already marked for delay load */
        delayReloadedConfiguredProjects?: Set<ConfiguredProject>,
        /** project if already known for the config file */
        projectForConfigFile?: ConfiguredProject,
    ): FindCreateOrLoadConfiguredProjectResult | undefined {
        let project = projectForConfigFile ?? this.findConfiguredProjectByProjectName(configFileName, allowDeferredClosed);
        let sentConfigFileDiag = false;
        let configFileExistenceInfo: ConfigFileExistenceInfo | undefined;
        switch (kind) {
            case ConfiguredProjectLoadKind.FindOptimized:
            case ConfiguredProjectLoadKind.Find:
            case ConfiguredProjectLoadKind.CreateReplay:
                if (!project) return;
                break;
            case ConfiguredProjectLoadKind.CreateReplayOptimized:
                if (!project) return;
                configFileExistenceInfo = configFileExistenceInfoForOptimizedReplay(project);
                break;
            case ConfiguredProjectLoadKind.CreateOptimized:
            case ConfiguredProjectLoadKind.Create:
                project ??= this.createConfiguredProject(configFileName, reason!);
                if (!delayLoad) {
                    // Ensure project is updated
                    ({ sentConfigFileDiag, configFileExistenceInfo } = updateProjectFoundUsingFind(
                        project,
                        kind,
                        triggerFile,
                    ));
                }
                break;
            case ConfiguredProjectLoadKind.ReloadOptimized:
                project ??= this.createConfiguredProject(configFileName, reloadReason(reason!));
                project.projectService.reloadConfiguredProjectOptimized(project, reason!, reloadedProjects!);
                configFileExistenceInfo = configFileExistenceInfoForOptimizedLoading(project);
                if (configFileExistenceInfo) break;
                // falls through
            case ConfiguredProjectLoadKind.Reload:
                project ??= this.createConfiguredProject(configFileName, reloadReason(reason!));
                // Reload immediately if not delayed
                sentConfigFileDiag = !delayReloadedConfiguredProjects &&
                    this.reloadConfiguredProjectClearingSemanticCache(project, reason!, reloadedProjects!);
                if (
                    delayReloadedConfiguredProjects &&
                    !delayReloadedConfiguredProjects.has(project) &&
                    !reloadedProjects!.has(project)
                ) {
                    // Add to delayed reload
                    this.setProjectForReload(project, ProgramUpdateLevel.Full, reason);
                    delayReloadedConfiguredProjects.add(project);
                }
                break;
            default:
                Debug.assertNever(kind);
        }
        return { project, sentConfigFileDiag, configFileExistenceInfo, reason };
    }

    /**
     * Finds the default configured project for given info
     * For any tsconfig found, it looks into that project, if not then all its references,
     * The search happens for all tsconfigs till projectRootPath
     */
    private tryFindDefaultConfiguredProjectForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConguredProjectLoadFindCreateOrReload,
        /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
        allowDeferredClosed?: boolean,
        /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
        reloadedProjects?: ConfiguredProjectToAnyReloadKind,
    ): DefaultConfiguredProjectResult | undefined {
        const configFileName = this.getConfigFileNameForFile(info, kind <= ConfiguredProjectLoadKind.CreateReplay);
        // If no config file name, no result
        if (!configFileName) return;

        // We need to create this project to ensure we can set life time of all the configs we read associated with this project
        // We are not actually creating program graph with optimized loading - just config file and root file names
        const optimizedKind = toConfiguredProjectLoadOptimized(kind);
        const result = this.findCreateOrReloadConfiguredProject(
            configFileName,
            optimizedKind,
            fileOpenReason(info),
            allowDeferredClosed,
            info.fileName,
            reloadedProjects,
        );
        // If the project for the configFileName does not exist, no result
        return result && this.tryFindDefaultConfiguredProjectForOpenScriptInfoOrClosedFileInfo(
            info,
            kind,
            result,
            project => `Creating project referenced in solution ${project.projectName} to find possible configured project for ${info.fileName} to open`,
            allowDeferredClosed,
            reloadedProjects,
        );
    }

    private isMatchedByConfig(
        configFileName: NormalizedPath,
        config: ParsedCommandLine,
        info: OpenScriptInfoOrClosedFileInfo,
    ) {
        // If info is root of the file
        if (config.fileNames.some(rootName => this.toPath(rootName) === info.path)) return true;

        if (
            isSupportedSourceFileName(
                info.fileName,
                config.options,
                this.hostConfiguration.extraFileExtensions,
            )
        ) return false; // We already handled this as part of parsing default file names

        const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = config.options.configFile!.configFileSpecs!;

        // Matched by file
        const basePath = toNormalizedPath(getNormalizedAbsolutePath(getDirectoryPath(configFileName), this.currentDirectory));
        if (validatedFilesSpec?.some(fileSpec => this.toPath(getNormalizedAbsolutePath(fileSpec, basePath)) === info.path)) return true;

        if (!validatedIncludeSpecs?.length) return false;

        // If this is excluded file ignore:
        if (
            matchesExcludeWorker(
                info.fileName,
                validatedExcludeSpecs,
                this.host.useCaseSensitiveFileNames,
                this.currentDirectory,
                basePath,
            )
        ) return false;

        // If matched by include
        return validatedIncludeSpecs?.some(includeSpec => {
            const pattern = getPatternFromSpec(includeSpec, basePath, "files");
            return !!pattern && getRegexFromPattern(`(${pattern})$`, this.host.useCaseSensitiveFileNames).test(info.fileName);
        });
    }

    private tryFindDefaultConfiguredProjectForOpenScriptInfoOrClosedFileInfo(
        info: OpenScriptInfoOrClosedFileInfo,
        kind: ConguredProjectLoadFindCreateOrReload,
        initialConfigResult: FindCreateOrLoadConfiguredProjectResult,
        referencedProjectReason: (project: ConfiguredProject) => string,
        /** Used with ConfiguredProjectLoadKind.Find  to get deferredClosed projects as well */
        allowDeferredClosed?: boolean,
        /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
        reloadedProjects?: ConfiguredProjectToAnyReloadKind,
    ) {
        const infoIsOpenScriptInfo = isOpenScriptInfo(info);
        const optimizedKind = toConfiguredProjectLoadOptimized(kind);
        const seenProjects: ConfigureProjectToLoadKind = new Map();
        let seenConfigs: Set<NormalizedPath> | undefined;
        const sentConfigDiag = new Set<ConfiguredProject>();
        let defaultProject: ConfiguredProject | undefined;
        let possiblyDefault: ConfiguredProject | undefined;
        let tsconfigOfDefault: ConfiguredProject | undefined;
        let tsconfigOfPossiblyDefault: ConfiguredProject | undefined;
        // See if this is the project or is it one of the references or find ancestor projects
        tryFindDefaultConfiguredProject(initialConfigResult);
        return {
            defaultProject: defaultProject ?? possiblyDefault,
            tsconfigProject: tsconfigOfDefault ?? tsconfigOfPossiblyDefault,
            sentConfigDiag,
            seenProjects,
            seenConfigs,
        };

        function tryFindDefaultConfiguredProject(result: FindCreateOrLoadConfiguredProjectResult): ConfiguredProject | undefined {
            return isDefaultProjectOptimized(result, result.project) ??
                tryFindDefaultConfiguredProjectFromReferences(result.project) ??
                tryFindDefaultConfiguredProjectFromAncestor(result.project);
        }

        function isDefaultConfigFileExistenceInfo(
            configFileExistenceInfo: ConfigFileExistenceInfo,
            project: ConfiguredProject | undefined,
            childConfigName: NormalizedPath,
            reason: string,
            tsconfigProject: ConfiguredProject,
            canonicalConfigFilePath?: NormalizedPath,
        ) {
            // Set seen based on project if present of for config file if its not yet created
            if (project) {
                if (seenProjects.has(project)) return;
                seenProjects.set(project, optimizedKind);
            }
            else {
                if (seenConfigs?.has(canonicalConfigFilePath!)) return;
                (seenConfigs ??= new Set()).add(canonicalConfigFilePath!);
            }

            // If the file is listed in root files, then only we can use this project as default project
            if (
                !tsconfigProject.projectService.isMatchedByConfig(
                    childConfigName,
                    configFileExistenceInfo.config!.parsedCommandLine!,
                    info,
                )
            ) {
                if (tsconfigProject.languageServiceEnabled) {
                    // Ensure we are watching the parsedCommandLine
                    tsconfigProject.projectService.watchWildcards(
                        childConfigName,
                        configFileExistenceInfo,
                        tsconfigProject,
                    );
                }
                return;
            }

            // Ensure the project is uptodate and created since the file may belong to this project
            const result = project ?
                updateProjectFoundUsingFind(
                    project,
                    kind,
                    info.fileName,
                    reason,
                    reloadedProjects,
                ) :
                tsconfigProject.projectService.findCreateOrReloadConfiguredProject(
                    childConfigName,
                    kind,
                    reason,
                    allowDeferredClosed,
                    info.fileName,
                    reloadedProjects,
                );
            if (!result) {
                // Did no find existing project but thats ok, we will give information based on what we find
                Debug.assert(kind === ConfiguredProjectLoadKind.CreateReplay);
                return undefined;
            }
            seenProjects.set(result.project, optimizedKind);
            if (result.sentConfigFileDiag) sentConfigDiag.add(result.project);
            return isDefaultProject(result.project, tsconfigProject);
        }

        function isDefaultProject(
            project: ConfiguredProject,
            tsconfigProject: ConfiguredProject,
        ): ConfiguredProject | undefined {
            // Skip already looked up projects
            if (seenProjects.get(project) === kind) return;
            seenProjects.set(project, kind);
            // If script info belongs to this project, use this as default config project
            const scriptInfo = infoIsOpenScriptInfo ? info : project.projectService.getScriptInfo(info.fileName);
            const projectWithInfo = scriptInfo && project.containsScriptInfo(scriptInfo);
            if (projectWithInfo && !project.isSourceOfProjectReferenceRedirect(scriptInfo.path)) {
                tsconfigOfDefault = tsconfigProject;
                return defaultProject = project;
            }
            // If this project uses the script info, if default project is not found, use this project as possible default
            if (!possiblyDefault && infoIsOpenScriptInfo && projectWithInfo) {
                tsconfigOfPossiblyDefault = tsconfigProject;
                possiblyDefault = project;
            }
        }

        function isDefaultProjectOptimized(
            result: FindCreateOrLoadConfiguredProjectResult,
            tsconfigProject: ConfiguredProject,
        ): ConfiguredProject | undefined {
            if (result.sentConfigFileDiag) sentConfigDiag.add(result.project);
            return result.configFileExistenceInfo ?
                isDefaultConfigFileExistenceInfo(
                    result.configFileExistenceInfo,
                    result.project,
                    toNormalizedPath(result.project.getConfigFilePath()),
                    result.reason!,
                    result.project,
                    result.project.canonicalConfigFilePath,
                ) :
                isDefaultProject(result.project, tsconfigProject);
        }

        function tryFindDefaultConfiguredProjectFromReferences(project: ConfiguredProject) {
            // If this configured project doesnt contain script info but
            // if this is solution with project references, try those project references
            return project.parsedCommandLine &&
                forEachResolvedProjectReferenceProjectLoad(
                    project,
                    project.parsedCommandLine,
                    isDefaultConfigFileExistenceInfo,
                    optimizedKind,
                    referencedProjectReason(project),
                    allowDeferredClosed,
                    reloadedProjects,
                );
        }

        function tryFindDefaultConfiguredProjectFromAncestor(project: ConfiguredProject) {
            return infoIsOpenScriptInfo ? forEachAncestorProjectLoad( // If not in referenced projects, try ancestors and its references
                info,
                project,
                tryFindDefaultConfiguredProject,
                optimizedKind,
                `Creating possible configured project for ${info.fileName} to open`,
                allowDeferredClosed,
                reloadedProjects,
                /*searchOnlyPotentialSolution*/ false,
            ) : undefined;
        }
    }

    /**
     * Finds the default configured project, if found, it creates the solution projects (does not load them right away)
     * with Find: finds the projects even if the project is deferredClosed
     */
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Find | ConfiguredProjectLoadKind.Create,
    ): DefaultConfiguredProjectResult | undefined;
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Reload,
        reloadedProjects: ConfiguredProjectToAnyReloadKind,
        delayReloadedConfiguredProjects: Set<ConfiguredProject>,
    ): DefaultConfiguredProjectResult | undefined;
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Find | ConfiguredProjectLoadKind.Create | ConfiguredProjectLoadKind.Reload,
        reloadedProjects?: ConfiguredProjectToAnyReloadKind,
        delayReloadedConfiguredProjects?: Set<ConfiguredProject>,
    ): DefaultConfiguredProjectResult | undefined {
        const allowDeferredClosed = kind === ConfiguredProjectLoadKind.Find;
        // Find default project
        const result = this.tryFindDefaultConfiguredProjectForOpenScriptInfo(
            info,
            kind,
            allowDeferredClosed,
            reloadedProjects,
        );
        if (!result) return;
        const { defaultProject, tsconfigProject, seenProjects } = result;
        if (defaultProject) {
            // Create ancestor tree for findAllRefs (dont load them right away)
            forEachAncestorProjectLoad(
                info,
                tsconfigProject!,
                ancestor => {
                    seenProjects.set(ancestor.project, kind);
                },
                kind,
                `Creating project possibly referencing default composite project ${defaultProject.getProjectName()} of open file ${info.fileName}`,
                allowDeferredClosed,
                reloadedProjects,
                /*searchOnlyPotentialSolution*/ true,
                delayReloadedConfiguredProjects,
            );
        }
        return result;
    }

    /** @internal */
    loadAncestorProjectTree(forProjects?: ReadonlyCollection<string>): void {
        forProjects ??= new Set(
            mapDefinedIterator(this.configuredProjects.entries(), ([key, project]) => !project.initialLoadPending ? key : undefined),
        );

        const seenProjects = new Set<NormalizedPath>();
        // We must copy the current configured projects into a separate array,
        // as we could end up creating and adding more projects indirectly.
        const currentConfiguredProjects = arrayFrom(this.configuredProjects.values());
        for (const project of currentConfiguredProjects) {
            // If this project has potential project reference for any of the project we are loading ancestor tree for
            // load this project first
            if (forEachPotentialProjectReference(project, potentialRefPath => forProjects.has(potentialRefPath))) {
                updateProjectIfDirty(project);
            }
            this.ensureProjectChildren(project, forProjects, seenProjects);
        }
    }

    private ensureProjectChildren(project: ConfiguredProject, forProjects: ReadonlyCollection<string>, seenProjects: Set<NormalizedPath>) {
        if (!tryAddToSet(seenProjects, project.canonicalConfigFilePath)) return;

        // If this project disables child load ignore it
        if (project.getCompilerOptions().disableReferencedProjectLoad) return;

        const children = project.getCurrentProgram()?.getResolvedProjectReferences();
        if (!children) return;

        for (const child of children) {
            if (!child) continue;
            const referencedProject = forEachResolvedProjectReference(child.references, ref => forProjects.has(ref.sourceFile.path) ? ref : undefined);
            if (!referencedProject) continue;

            // Load this project,
            const configFileName = toNormalizedPath(child.sourceFile.fileName);
            const childProject = this.findConfiguredProjectByProjectName(configFileName) ??
                this.createConfiguredProject(
                    configFileName,
                    `Creating project referenced by : ${project.projectName} as it references project ${referencedProject.sourceFile.fileName}`,
                );
            updateProjectIfDirty(childProject);

            // Ensure children for this project
            this.ensureProjectChildren(childProject, forProjects, seenProjects);
        }
    }

    private cleanupConfiguredProjects(
        toRetainConfiguredProjects?: ConfigureProjectToLoadKind | Set<ConfiguredProject>,
        externalProjectsRetainingConfiguredProjects?: Set<string>,
        openFilesWithRetainedConfiguredProject?: Set<Path>,
    ) {
        // Remove all orphan projects
        this.getOrphanConfiguredProjects(
            toRetainConfiguredProjects,
            openFilesWithRetainedConfiguredProject,
            externalProjectsRetainingConfiguredProjects,
        ).forEach(project => this.removeProject(project));
    }

    private cleanupProjectsAndScriptInfos(
        toRetainConfiguredProjects: ConfigureProjectToLoadKind | undefined,
        openFilesWithRetainedConfiguredProject: Set<Path> | undefined,
        externalProjectsRetainingConfiguredProjects: Set<string> | undefined,
    ) {
        // This was postponed from closeOpenFile to after opening next file,
        // so that we can reuse the project if we need to right away
        // Remove all the non marked projects
        this.cleanupConfiguredProjects(
            toRetainConfiguredProjects,
            externalProjectsRetainingConfiguredProjects,
            openFilesWithRetainedConfiguredProject,
        );

        // Remove orphan inferred projects now that we have reused projects
        // We need to create a duplicate because we cant guarantee order after removal
        for (const inferredProject of this.inferredProjects.slice()) {
            if (inferredProject.isOrphan()) {
                this.removeProject(inferredProject);
            }
        }

        // Delete the orphan files here because there might be orphan script infos (which are not part of project)
        // when some file/s were closed which resulted in project removal.
        // It was then postponed to cleanup these script infos so that they can be reused if
        // the file from that old project is reopened because of opening file from here.
        this.removeOrphanScriptInfos();
    }

    private tryInvokeWildCardDirectories(info: ScriptInfo) {
        // This might not have reflected in projects,
        this.configFileExistenceInfoCache.forEach((configFileExistenceInfo, config) => {
            if (
                !configFileExistenceInfo.config?.parsedCommandLine ||
                contains(
                    configFileExistenceInfo.config.parsedCommandLine.fileNames,
                    info.fileName,
                    !this.host.useCaseSensitiveFileNames ? equateStringsCaseInsensitive : equateStringsCaseSensitive,
                )
            ) {
                return;
            }
            configFileExistenceInfo.config.watchedDirectories?.forEach((watcher, directory) => {
                if (containsPath(directory, info.fileName, !this.host.useCaseSensitiveFileNames)) {
                    this.logger.info(`Invoking ${config}:: wildcard for open scriptInfo:: ${info.fileName}`);
                    this.onWildCardDirectoryWatcherInvoke(
                        directory,
                        config,
                        configFileExistenceInfo.config!,
                        watcher.watcher,
                        info.fileName,
                    );
                }
            });
        });
    }

    openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult {
        const existing = this.getScriptInfoForPath(normalizedPathToPath(
            fileName,
            projectRootPath ? this.getNormalizedAbsolutePath(projectRootPath) : this.currentDirectory,
            this.toCanonicalFileName,
        ));
        const info = this.getOrCreateOpenScriptInfo(fileName, fileContent, scriptKind, hasMixedContent, projectRootPath);
        if (!existing && info && !info.isDynamic) this.tryInvokeWildCardDirectories(info);
        const { retainProjects, ...result } = this.assignProjectToOpenedScriptInfo(info);
        this.cleanupProjectsAndScriptInfos(
            retainProjects,
            new Set([info.path]),
            /*externalProjectsRetainingConfiguredProjects*/ undefined,
        );
        this.telemetryOnOpenFile(info);
        this.printProjects();
        return result;
    }

    /** @internal */
    getOrphanConfiguredProjects(
        toRetainConfiguredProjects: ConfigureProjectToLoadKind | Set<ConfiguredProject> | undefined,
        openFilesWithRetainedConfiguredProject: Set<Path> | undefined,
        externalProjectsRetainingConfiguredProjects: Set<string> | undefined,
    ): Set<ConfiguredProject> {
        const toRemoveConfiguredProjects = new Set(this.configuredProjects.values());
        const markOriginalProjectsAsUsed = (project: Project) => {
            if (project.originalConfiguredProjects && (isConfiguredProject(project) || !project.isOrphan())) {
                project.originalConfiguredProjects.forEach(
                    (_value, configuredProjectPath) => {
                        const project = this.getConfiguredProjectByCanonicalConfigFilePath(configuredProjectPath);
                        return project && retainConfiguredProject(project);
                    },
                );
            }
        };
        toRetainConfiguredProjects?.forEach((_, project) => retainConfiguredProject(project));
        // Everything needs to be retained, fast path to skip all the work
        if (!toRemoveConfiguredProjects.size) return toRemoveConfiguredProjects;

        // Do not remove configured projects that are used as original projects of other
        this.inferredProjects.forEach(markOriginalProjectsAsUsed);
        this.externalProjects.forEach(markOriginalProjectsAsUsed);
        // Retain all configured projects referenced by external projects
        this.externalProjectToConfiguredProjectMap.forEach((projects, externalProjectName) => {
            if (!externalProjectsRetainingConfiguredProjects?.has(externalProjectName)) {
                projects.forEach(retainConfiguredProject);
            }
        });
        // Everything needs to be retained, fast path to skip all the work
        if (!toRemoveConfiguredProjects.size) return toRemoveConfiguredProjects;

        forEachEntry(this.openFiles, (_projectRootPath, path) => {
            if (openFilesWithRetainedConfiguredProject?.has(path)) return;
            const info = this.getScriptInfoForPath(path)!;
            // Part of external project
            if (find(info.containingProjects, isExternalProject)) return;
            // We want to retain the projects for open file if they are pending updates so deferredClosed projects are ok
            const result = this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                info,
                ConfiguredProjectLoadKind.Find,
            );
            if (result?.defaultProject) {
                result?.seenProjects.forEach((_, project) => retainConfiguredProject(project));
                // Everything needs to be retained, fast path to skip all the work
                if (!toRemoveConfiguredProjects.size) return toRemoveConfiguredProjects;
            }
        });

        // Everything needs to be retained, fast path to skip all the work
        if (!toRemoveConfiguredProjects.size) return toRemoveConfiguredProjects;

        // Retain all the configured projects that have pending updates
        // or the ones that is referencing retained project (or to be retained)
        forEachEntry(this.configuredProjects, project => {
            if (toRemoveConfiguredProjects.has(project)) {
                if (isPendingUpdate(project) || forEachReferencedProject(project, isRetained)) {
                    retainConfiguredProject(project);
                    if (!toRemoveConfiguredProjects.size) return toRemoveConfiguredProjects;
                }
            }
        });

        return toRemoveConfiguredProjects;

        function isRetained(project: ConfiguredProject) {
            return !toRemoveConfiguredProjects.has(project) || isPendingUpdate(project);
        }

        function isPendingUpdate(project: ConfiguredProject) {
            return (
                project.deferredClose ||
                project.projectService.hasPendingProjectUpdate(project)
            ) &&
                !!project.projectService.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)?.openFilesImpactedByConfigFile?.size;
        }

        function retainConfiguredProject(project: ConfiguredProject) {
            if (!toRemoveConfiguredProjects.delete(project)) return;
            // Keep original projects used
            markOriginalProjectsAsUsed(project);
            // Keep all the references alive
            forEachReferencedProject(project, retainConfiguredProject);
        }
    }

    private removeOrphanScriptInfos() {
        const toRemoveScriptInfos = new Map(this.filenameToScriptInfo);
        this.filenameToScriptInfo.forEach(info => {
            if (info.deferredDelete) return;
            // If script info is open or orphan, retain it and its dependencies
            if (
                !info.isScriptOpen() &&
                info.isOrphan() &&
                !scriptInfoIsContainedByDeferredClosedProject(info) &&
                !scriptInfoIsContainedByBackgroundProject(info)
            ) {
                // Otherwise if there is any source info that is alive, this alive too
                if (!info.sourceMapFilePath) return;
                let sourceInfos: Set<Path> | undefined;
                if (isString(info.sourceMapFilePath)) {
                    const sourceMapInfo = this.filenameToScriptInfo.get(info.sourceMapFilePath);
                    sourceInfos = sourceMapInfo?.sourceInfos;
                }
                else {
                    sourceInfos = info.sourceMapFilePath.sourceInfos;
                }
                if (!sourceInfos) return;
                if (
                    !forEachKey(sourceInfos, path => {
                        const info = this.getScriptInfoForPath(path);
                        return !!info && (info.isScriptOpen() || !info.isOrphan());
                    })
                ) {
                    return;
                }
            }

            // Retain this script info
            toRemoveScriptInfos.delete(info.path);
            // If we retained declaration file, retain source map and sources as well
            if (info.sourceMapFilePath) {
                let sourceInfos: Set<Path> | undefined;
                if (isString(info.sourceMapFilePath)) {
                    // And map file info and source infos
                    const sourceMapInfo = this.filenameToScriptInfo.get(info.sourceMapFilePath);
                    if (sourceMapInfo?.deferredDelete) {
                        info.sourceMapFilePath = {
                            watcher: this.addMissingSourceMapFile(sourceMapInfo.fileName, info.path),
                            sourceInfos: sourceMapInfo.sourceInfos,
                        };
                    }
                    else {
                        toRemoveScriptInfos.delete(info.sourceMapFilePath);
                    }
                    sourceInfos = sourceMapInfo?.sourceInfos;
                }
                else {
                    sourceInfos = info.sourceMapFilePath.sourceInfos;
                }
                if (sourceInfos) {
                    sourceInfos.forEach((_value, path) => toRemoveScriptInfos.delete(path));
                }
            }
        });

        // if there are not projects that include this script info - delete it
        toRemoveScriptInfos.forEach(info => this.deleteScriptInfo(info));
    }

    private telemetryOnOpenFile(scriptInfo: ScriptInfo): void {
        if (this.serverMode !== LanguageServiceMode.Semantic || !this.eventHandler || !scriptInfo.isJavaScript() || !addToSeen(this.allJsFilesForOpenFileTelemetry, scriptInfo.path)) {
            return;
        }

        const project = this.ensureDefaultProjectForFile(scriptInfo);
        if (!project.languageServiceEnabled) {
            return;
        }

        const sourceFile = project.getSourceFile(scriptInfo.path);
        const checkJs = !!sourceFile && !!sourceFile.checkJsDirective;
        this.eventHandler({ eventName: OpenFileInfoTelemetryEvent, data: { info: { checkJs } } });
    }

    /**
     * Close file whose contents is managed by the client
     * @param filename is absolute pathname
     */
    closeClientFile(uncheckedFileName: string): void;
    /** @internal */
    closeClientFile(uncheckedFileName: string, skipAssignOrphanScriptInfosToInferredProject: true): boolean;
    closeClientFile(uncheckedFileName: string, skipAssignOrphanScriptInfosToInferredProject?: true) {
        const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        const result = info ? this.closeOpenFile(info, skipAssignOrphanScriptInfosToInferredProject) : false;
        if (!skipAssignOrphanScriptInfosToInferredProject) {
            this.printProjects();
        }
        return result;
    }

    private collectChanges(
        lastKnownProjectVersions: protocol.ProjectVersionInfo[],
        currentProjects: Iterable<Project>,
        includeProjectReferenceRedirectInfo: boolean | undefined,
        result: ProjectFilesWithTSDiagnostics[],
    ): void {
        for (const proj of currentProjects) {
            const knownProject = find(lastKnownProjectVersions, p => p.projectName === proj.getProjectName());
            result.push(proj.getChangesSinceVersion(knownProject && knownProject.version, includeProjectReferenceRedirectInfo));
        }
    }

    /** @internal */
    synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[], includeProjectReferenceRedirectInfo?: boolean): ProjectFilesWithTSDiagnostics[] {
        const files: ProjectFilesWithTSDiagnostics[] = [];
        this.collectChanges(knownProjects, this.externalProjects, includeProjectReferenceRedirectInfo, files);
        this.collectChanges(knownProjects, mapDefinedIterator(this.configuredProjects.values(), p => p.deferredClose ? undefined : p), includeProjectReferenceRedirectInfo, files);
        this.collectChanges(knownProjects, this.inferredProjects, includeProjectReferenceRedirectInfo, files);
        return files;
    }

    /** @internal */
    applyChangesInOpenFiles(openFiles: Iterable<OpenFileArguments> | undefined, changedFiles?: Iterable<ChangeFileArguments>, closedFiles?: string[]): void {
        let existingOpenScriptInfos: (ScriptInfo | undefined)[] | undefined;
        let openScriptInfos: ScriptInfo[] | undefined;
        let assignOrphanScriptInfosToInferredProject = false;
        if (openFiles) {
            for (const file of openFiles) {
                (existingOpenScriptInfos ??= []).push(this.getScriptInfoForPath(normalizedPathToPath(
                    toNormalizedPath(file.fileName),
                    file.projectRootPath ? this.getNormalizedAbsolutePath(file.projectRootPath) : this.currentDirectory,
                    this.toCanonicalFileName,
                )));
                // Create script infos so we have the new content for all the open files before we do any updates to projects
                const info = this.getOrCreateOpenScriptInfo(
                    toNormalizedPath(file.fileName),
                    file.content,
                    tryConvertScriptKindName(file.scriptKind!),
                    file.hasMixedContent,
                    file.projectRootPath ? toNormalizedPath(file.projectRootPath) : undefined,
                );
                (openScriptInfos || (openScriptInfos = [])).push(info);
            }
        }

        if (changedFiles) {
            for (const file of changedFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName)!;
                Debug.assert(!!scriptInfo);
                // Make edits to script infos and marks containing project as dirty
                this.applyChangesToFile(scriptInfo, file.changes);
            }
        }

        if (closedFiles) {
            for (const file of closedFiles) {
                // Close files, but dont assign projects to orphan open script infos, that part comes later
                assignOrphanScriptInfosToInferredProject = this.closeClientFile(file, /*skipAssignOrphanScriptInfosToInferredProject*/ true) || assignOrphanScriptInfosToInferredProject;
            }
        }

        // All the script infos now exist, so ok to go update projects for open files
        let retainProjects: ConfigureProjectToLoadKind | undefined;
        forEach(
            existingOpenScriptInfos,
            (existing, index) =>
                !existing && openScriptInfos![index] && !openScriptInfos![index].isDynamic ?
                    this.tryInvokeWildCardDirectories(openScriptInfos![index]) :
                    undefined,
        );
        openScriptInfos?.forEach(info =>
            this.assignProjectToOpenedScriptInfo(info).retainProjects?.forEach(
                (kind, p) => (retainProjects ??= new Map()).set(p, kind),
            )
        );

        // While closing files there could be open files that needed assigning new inferred projects, do it now
        if (assignOrphanScriptInfosToInferredProject) {
            this.assignOrphanScriptInfosToInferredProject();
        }

        if (openScriptInfos) {
            // Cleanup projects
            this.cleanupProjectsAndScriptInfos(
                retainProjects,
                new Set(openScriptInfos.map(info => info.path)),
                /*externalProjectsRetainingConfiguredProjects*/ undefined,
            );
            // Telemetry
            openScriptInfos.forEach(info => this.telemetryOnOpenFile(info));
            this.printProjects();
        }
        else if (length(closedFiles)) {
            this.printProjects();
        }
    }

    /** @internal */
    applyChangesToFile(scriptInfo: ScriptInfo, changes: Iterable<TextChange>): void {
        for (const change of changes) {
            scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
        }
    }

    closeExternalProject(uncheckedFileName: string): void;
    /** @internal */
    closeExternalProject(uncheckedFileName: string, cleanupAfter: boolean): void; // eslint-disable-line @typescript-eslint/unified-signatures
    closeExternalProject(uncheckedFileName: string, cleanupAfter?: boolean) {
        const fileName = toNormalizedPath(uncheckedFileName);
        const projects = this.externalProjectToConfiguredProjectMap.get(fileName);
        if (projects) {
            this.externalProjectToConfiguredProjectMap.delete(fileName);
        }
        else {
            // close external project
            const externalProject = this.findExternalProjectByProjectName(uncheckedFileName);
            if (externalProject) {
                this.removeProject(externalProject);
            }
        }
        if (cleanupAfter) {
            this.cleanupConfiguredProjects();
            this.printProjects();
        }
    }

    openExternalProjects(projects: protocol.ExternalProject[]): void {
        // record project list before the update
        const projectsToClose = new Set(this.externalProjects.map(p => p.getProjectName()));
        this.externalProjectToConfiguredProjectMap.forEach((_, externalProjectName) => projectsToClose.add(externalProjectName));

        for (const externalProject of projects) {
            this.openExternalProject(externalProject, /*cleanupAfter*/ false);
            // delete project that is present in input list
            projectsToClose.delete(externalProject.projectFileName);
        }

        // close projects that were missing in the input list
        projectsToClose.forEach(externalProjectName => this.closeExternalProject(externalProjectName, /*cleanupAfter*/ false));

        // Cleanup
        this.cleanupConfiguredProjects();
        this.printProjects();
    }

    /** Makes a filename safe to insert in a RegExp */
    private static readonly filenameEscapeRegexp = /[-/\\^$*+?.()|[\]{}]/g;
    private static escapeFilenameForRegex(filename: string) {
        return filename.replace(this.filenameEscapeRegexp, "\\$&");
    }

    resetSafeList(): void {
        this.safelist = defaultTypeSafeList;
    }

    applySafeList(proj: protocol.ExternalProject): NormalizedPath[] {
        const typeAcquisition = proj.typeAcquisition!;
        Debug.assert(!!typeAcquisition, "proj.typeAcquisition should be set by now");
        const result = this.applySafeListWorker(proj, proj.rootFiles, typeAcquisition);
        return result?.excludedFiles ?? [];
    }

    private applySafeListWorker(proj: protocol.ExternalProject, rootFiles: protocol.ExternalFile[], typeAcquisition: TypeAcquisition) {
        if (typeAcquisition.enable === false || typeAcquisition.disableFilenameBasedTypeAcquisition) {
            return undefined;
        }

        const typeAcqInclude = typeAcquisition.include || (typeAcquisition.include = []);
        const excludeRules: string[] = [];

        const normalizedNames = rootFiles.map(f => normalizeSlashes(f.fileName)) as NormalizedPath[];
        for (const name of Object.keys(this.safelist)) {
            const rule = this.safelist[name];
            for (const root of normalizedNames) {
                if (rule.match.test(root)) {
                    this.logger.info(`Excluding files based on rule ${name} matching file '${root}'`);

                    // If the file matches, collect its types packages and exclude rules
                    if (rule.types) {
                        for (const type of rule.types) {
                            // Best-effort de-duping here - doesn't need to be unduplicated but
                            // we don't want the list to become a 400-element array of just 'kendo'
                            if (!typeAcqInclude.includes(type)) {
                                typeAcqInclude.push(type);
                            }
                        }
                    }

                    if (rule.exclude) {
                        for (const exclude of rule.exclude) {
                            const processedRule = root.replace(rule.match, (...groups: string[]) => {
                                return exclude.map(groupNumberOrString => {
                                    // RegExp group numbers are 1-based, but the first element in groups
                                    // is actually the original string, so it all works out in the end.
                                    if (typeof groupNumberOrString === "number") {
                                        if (!isString(groups[groupNumberOrString])) {
                                            // Specification was wrong - exclude nothing!
                                            this.logger.info(`Incorrect RegExp specification in safelist rule ${name} - not enough groups`);
                                            // * can't appear in a filename; escape it because it's feeding into a RegExp
                                            return "\\*";
                                        }
                                        return ProjectService.escapeFilenameForRegex(groups[groupNumberOrString]);
                                    }
                                    return groupNumberOrString;
                                }).join("");
                            });

                            if (!excludeRules.includes(processedRule)) {
                                excludeRules.push(processedRule);
                            }
                        }
                    }
                    else {
                        // If not rules listed, add the default rule to exclude the matched file
                        const escaped = ProjectService.escapeFilenameForRegex(root);
                        if (!excludeRules.includes(escaped)) {
                            excludeRules.push(escaped);
                        }
                    }
                }
            }
        }

        const excludeRegexes = excludeRules.map(e => new RegExp(e, "i"));
        let filesToKeep: protocol.ExternalFile[] | undefined;
        let excludedFiles: NormalizedPath[] | undefined;
        for (let i = 0; i < rootFiles.length; i++) {
            if (excludeRegexes.some(re => re.test(normalizedNames[i]))) {
                addExcludedFile(i);
            }
            else {
                if (typeAcquisition.enable) {
                    const baseName = getBaseFileName(toFileNameLowerCase(normalizedNames[i]));
                    if (fileExtensionIs(baseName, "js")) {
                        const inferredTypingName = removeFileExtension(baseName);
                        const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
                        const typeName = this.legacySafelist.get(cleanedTypingName);
                        if (typeName !== undefined) {
                            this.logger.info(`Excluded '${normalizedNames[i]}' because it matched ${cleanedTypingName} from the legacy safelist`);
                            addExcludedFile(i);
                            // *exclude* it from the project...
                            // ... but *include* it in the list of types to acquire
                            // Same best-effort dedupe as above
                            if (!typeAcqInclude.includes(typeName)) {
                                typeAcqInclude.push(typeName);
                            }
                            continue;
                        }
                    }
                }
                // Exclude any minified files that get this far
                if (/^.+[.-]min\.js$/.test(normalizedNames[i])) {
                    addExcludedFile(i);
                }
                else {
                    filesToKeep?.push(rootFiles[i]);
                }
            }
        }

        return excludedFiles ? {
            rootFiles: filesToKeep!,
            excludedFiles,
        } : undefined;

        function addExcludedFile(index: number) {
            if (!excludedFiles) {
                Debug.assert(!filesToKeep);
                filesToKeep = rootFiles.slice(0, index);
                excludedFiles = [];
            }
            excludedFiles.push(normalizedNames[index]);
        }
    }
    openExternalProject(proj: protocol.ExternalProject): void;
    /** @internal */
    openExternalProject(proj: protocol.ExternalProject, cleanupAfter: boolean): void; // eslint-disable-line @typescript-eslint/unified-signatures
    openExternalProject(proj: protocol.ExternalProject, cleanupAfter?: boolean): void {
        const existingExternalProject = this.findExternalProjectByProjectName(proj.projectFileName);
        let configuredProjects: Set<ConfiguredProject> | undefined;
        let rootFiles: protocol.ExternalFile[] = [];
        for (const file of proj.rootFiles) {
            const normalized = toNormalizedPath(file.fileName);
            if (getBaseConfigFileName(normalized)) {
                if (this.serverMode === LanguageServiceMode.Semantic && this.host.fileExists(normalized)) {
                    let project = this.findConfiguredProjectByProjectName(normalized);
                    if (!project) {
                        // errors are stored in the project, do not need to update the graph
                        project = this.createConfiguredProject(normalized, `Creating configured project in external project: ${proj.projectFileName}`);
                        if (!this.getHostPreferences().lazyConfiguredProjectsFromExternalProject) project.updateGraph();
                    }
                    (configuredProjects ??= new Set()).add(project);
                    Debug.assert(!project.isClosed()); // Should not have closed project
                }
            }
            else {
                rootFiles.push(file);
            }
        }

        if (configuredProjects) {
            // store the list of tsconfig files that belong to the external project
            this.externalProjectToConfiguredProjectMap.set(proj.projectFileName, configuredProjects);
            // Close external project if present
            if (existingExternalProject) this.removeProject(existingExternalProject);
        }
        else {
            // no config files - remove the item from the collection
            this.externalProjectToConfiguredProjectMap.delete(proj.projectFileName);
            const typeAcquisition = proj.typeAcquisition || {};
            typeAcquisition.include = typeAcquisition.include || [];
            typeAcquisition.exclude = typeAcquisition.exclude || [];
            if (typeAcquisition.enable === undefined) {
                typeAcquisition.enable = hasNoTypeScriptSource(rootFiles.map(f => f.fileName));
            }
            const excludeResult = this.applySafeListWorker(proj, rootFiles, typeAcquisition);
            const excludedFiles = excludeResult?.excludedFiles ?? [];
            rootFiles = excludeResult?.rootFiles ?? rootFiles;
            if (existingExternalProject) {
                existingExternalProject.excludedFiles = excludedFiles;
                const compilerOptions = convertCompilerOptions(proj.options);
                const watchOptionsAndErrors = convertWatchOptions(proj.options, existingExternalProject.getCurrentDirectory());
                const lastFileExceededProgramSize = this.getFilenameForExceededTotalSizeLimitForNonTsFiles(proj.projectFileName, compilerOptions, rootFiles, externalFilePropertyReader);
                if (lastFileExceededProgramSize) {
                    existingExternalProject.disableLanguageService(lastFileExceededProgramSize);
                }
                else {
                    existingExternalProject.enableLanguageService();
                }
                existingExternalProject.setProjectErrors(watchOptionsAndErrors?.errors);
                // external project already exists and not config files were added - update the project and return;
                // The graph update here isnt postponed since any file open operation needs all updated external projects
                this.updateRootAndOptionsOfNonInferredProject(existingExternalProject, rootFiles, externalFilePropertyReader, compilerOptions, typeAcquisition, proj.options.compileOnSave, watchOptionsAndErrors?.watchOptions);
                existingExternalProject.updateGraph();
            }
            else {
                // Create external project and update its graph, do not delay update since
                // any file open operation needs all updated external projects
                const project = this.createExternalProject(proj.projectFileName, rootFiles, proj.options, typeAcquisition, excludedFiles);
                project.updateGraph();
            }
        }

        if (cleanupAfter) {
            this.cleanupConfiguredProjects(
                configuredProjects,
                new Set([proj.projectFileName]),
            );
            this.printProjects();
        }
    }

    hasDeferredExtension(): boolean {
        for (const extension of this.hostConfiguration.extraFileExtensions!) { // TODO: GH#18217
            if (extension.scriptKind === ScriptKind.Deferred) {
                return true;
            }
        }

        return false;
    }

    /**
     * Performs the initial steps of enabling a plugin by finding and instantiating the module for a plugin either asynchronously or synchronously
     * @internal
     */
    requestEnablePlugin(project: Project, pluginConfigEntry: PluginImport, searchPaths: string[]): void {
        if (!this.host.importPlugin && !this.host.require) {
            this.logger.info("Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded");
            return;
        }

        this.logger.info(`Enabling plugin ${pluginConfigEntry.name} from candidate paths: ${searchPaths.join(",")}`);
        if (
            !pluginConfigEntry.name ||
            isExternalModuleNameRelative(pluginConfigEntry.name) ||
            /[\\/]\.\.?(?:$|[\\/])/.test(pluginConfigEntry.name)
        ) {
            this.logger.info(`Skipped loading plugin ${pluginConfigEntry.name || JSON.stringify(pluginConfigEntry)} because only package name is allowed plugin name`);
            return;
        }

        // If the host supports dynamic import, begin enabling the plugin asynchronously.
        if (this.host.importPlugin) {
            const importPromise = Project.importServicePluginAsync(
                pluginConfigEntry,
                searchPaths,
                this.host,
                s => this.logger.info(s),
            ) as Promise<BeginEnablePluginResult>;
            this.pendingPluginEnablements ??= new Map();
            let promises = this.pendingPluginEnablements.get(project);
            if (!promises) this.pendingPluginEnablements.set(project, promises = []);
            promises.push(importPromise);
            return;
        }

        // Otherwise, load the plugin using `require`
        this.endEnablePlugin(
            project,
            Project.importServicePluginSync(
                pluginConfigEntry,
                searchPaths,
                this.host,
                s => this.logger.info(s),
            ),
        );
    }

    /**
     * Performs the remaining steps of enabling a plugin after its module has been instantiated.
     */
    private endEnablePlugin(project: Project, { pluginConfigEntry, resolvedModule, errorLogs }: BeginEnablePluginResult) {
        if (resolvedModule) {
            const configurationOverride = this.currentPluginConfigOverrides?.get(pluginConfigEntry.name);
            if (configurationOverride) {
                // Preserve the name property since it's immutable
                const pluginName = pluginConfigEntry.name;
                pluginConfigEntry = configurationOverride;
                pluginConfigEntry.name = pluginName;
            }
            project.enableProxy(resolvedModule, pluginConfigEntry);
        }
        else {
            forEach(errorLogs, message => this.logger.info(message));
            this.logger.info(`Couldn't find ${pluginConfigEntry.name}`);
        }
    }

    /** @internal */
    hasNewPluginEnablementRequests(): boolean {
        return !!this.pendingPluginEnablements;
    }

    /** @internal */
    hasPendingPluginEnablements(): boolean {
        return !!this.currentPluginEnablementPromise;
    }

    /**
     * Waits for any ongoing plugin enablement requests to complete.
     *
     * @internal
     */
    async waitForPendingPlugins(): Promise<void> {
        while (this.currentPluginEnablementPromise) {
            await this.currentPluginEnablementPromise;
        }
    }

    /**
     * Starts enabling any requested plugins without waiting for the result.
     *
     * @internal
     */
    enableRequestedPlugins(): void {
        if (this.pendingPluginEnablements) {
            void this.enableRequestedPluginsAsync();
        }
    }

    private async enableRequestedPluginsAsync() {
        if (this.currentPluginEnablementPromise) {
            // If we're already enabling plugins, wait for any existing operations to complete
            await this.waitForPendingPlugins();
        }

        // Skip if there are no new plugin enablement requests
        if (!this.pendingPluginEnablements) {
            return;
        }

        // Consume the pending plugin enablement requests
        const entries = arrayFrom(this.pendingPluginEnablements.entries());
        this.pendingPluginEnablements = undefined;

        // Start processing the requests, keeping track of the promise for the operation so that
        // project consumers can potentially wait for the plugins to load.
        this.currentPluginEnablementPromise = this.enableRequestedPluginsWorker(entries);
        await this.currentPluginEnablementPromise;
    }

    private async enableRequestedPluginsWorker(pendingPlugins: [Project, Promise<BeginEnablePluginResult>[]][]) {
        // This should only be called from `enableRequestedPluginsAsync`, which ensures this precondition is met.
        Debug.assert(this.currentPluginEnablementPromise === undefined);

        // Process all pending plugins, partitioned by project. This way a project with few plugins doesn't need to wait
        // on a project with many plugins.
        let sendProjectsUpdatedInBackgroundEvent = false;
        await Promise.all(map(pendingPlugins, async ([project, promises]) => {
            // Await all pending plugin imports. This ensures all requested plugin modules are fully loaded
            // prior to patching the language service, and that any promise rejections are observed.
            const results = await Promise.all(promises);
            if (project.isClosed() || isProjectDeferredClose(project)) {
                this.logger.info(`Cancelling plugin enabling for ${project.getProjectName()} as it is ${project.isClosed() ? "closed" : "deferred close"}`);
                // project is not alive, so don't enable plugins.
                return;
            }
            sendProjectsUpdatedInBackgroundEvent = true;
            for (const result of results) {
                this.endEnablePlugin(project, result);
            }

            // Plugins may have modified external files, so mark the project as dirty.
            this.delayUpdateProjectGraph(project);
        }));

        // Clear the pending operation and notify the client that projects have been updated.
        this.currentPluginEnablementPromise = undefined;
        if (sendProjectsUpdatedInBackgroundEvent) this.sendProjectsUpdatedInBackgroundEvent();
    }

    configurePlugin(args: protocol.ConfigurePluginRequestArguments): void {
        // For any projects that already have the plugin loaded, configure the plugin
        this.forEachEnabledProject(project => project.onPluginConfigurationChanged(args.pluginName, args.configuration));

        // Also save the current configuration to pass on to any projects that are yet to be loaded.
        // If a plugin is configured twice, only the latest configuration will be remembered.
        this.currentPluginConfigOverrides = this.currentPluginConfigOverrides || new Map();
        this.currentPluginConfigOverrides.set(args.pluginName, args.configuration);
    }

    /** @internal */
    getPackageJsonsVisibleToFile(fileName: string, project: Project, rootDir?: string): readonly ProjectPackageJsonInfo[] {
        const packageJsonCache = this.packageJsonCache;
        const rootPath = rootDir && this.toPath(rootDir);
        const result: ProjectPackageJsonInfo[] = [];
        const processDirectory = (directory: string): boolean | undefined => {
            switch (packageJsonCache.directoryHasPackageJson(directory)) {
                // Sync and check same directory again
                case Ternary.Maybe:
                    packageJsonCache.searchDirectoryAndAncestors(directory, project);
                    return processDirectory(directory);
                // Check package.json
                case Ternary.True:
                    const packageJsonFileName = combinePaths(directory, "package.json");
                    this.watchPackageJsonFile(packageJsonFileName, this.toPath(packageJsonFileName), project);
                    const info = packageJsonCache.getInDirectory(directory);
                    if (info) result.push(info);
            }
            if (rootPath && rootPath === directory) {
                return true;
            }
        };

        forEachAncestorDirectoryStoppingAtGlobalCache(
            project,
            getDirectoryPath(fileName),
            processDirectory,
        );
        return result;
    }

    /** @internal */
    getNearestAncestorDirectoryWithPackageJson(fileName: string, project: Project): string | undefined {
        return forEachAncestorDirectoryStoppingAtGlobalCache(
            project,
            fileName,
            directory => {
                switch (this.packageJsonCache.directoryHasPackageJson(directory)) {
                    case Ternary.True:
                        return directory;
                    case Ternary.False:
                        return undefined;
                    case Ternary.Maybe:
                        return this.host.fileExists(combinePaths(directory, "package.json"))
                            ? directory
                            : undefined;
                }
            },
        );
    }

    private watchPackageJsonFile(file: string, path: Path, project: Project | WildcardWatcher) {
        Debug.assert(project !== undefined);
        let result = (this.packageJsonFilesMap ??= new Map()).get(path);
        if (!result) {
            // this.invalidateProjectPackageJson(path);
            let watcher: FileWatcher | undefined = this.watchFactory.watchFile(
                file,
                (fileName, eventKind) => {
                    switch (eventKind) {
                        case FileWatcherEventKind.Created:
                        case FileWatcherEventKind.Changed:
                            this.packageJsonCache.addOrUpdate(fileName, path);
                            this.onPackageJsonChange(result);
                            break;
                        case FileWatcherEventKind.Deleted:
                            this.packageJsonCache.delete(path);
                            this.onPackageJsonChange(result);
                            result.projects.clear();
                            result.close();
                    }
                },
                PollingInterval.Low,
                this.hostConfiguration.watchOptions,
                WatchType.PackageJson,
            );
            result = {
                projects: new Set(),
                close: () => {
                    if (result.projects.size || !watcher) return;
                    watcher.close();
                    watcher = undefined;
                    this.packageJsonFilesMap?.delete(path);
                    this.packageJsonCache.invalidate(path);
                },
            };
            this.packageJsonFilesMap.set(path, result);
        }
        result.projects.add(project);
        (project.packageJsonWatches ??= new Set()).add(result);
    }

    private onPackageJsonChange(result: PackageJsonWatcher) {
        result.projects.forEach(project => (project as Project).onPackageJsonChange?.());
    }

    /** @internal */
    includePackageJsonAutoImports(): PackageJsonAutoImportPreference {
        switch (this.hostConfiguration.preferences.includePackageJsonAutoImports) {
            case "on":
                return PackageJsonAutoImportPreference.On;
            case "off":
                return PackageJsonAutoImportPreference.Off;
            default:
                return PackageJsonAutoImportPreference.Auto;
        }
    }

    /** @internal */
    getIncompleteCompletionsCache(): IncompleteCompletionsCache {
        return this.incompleteCompletionsCache ||= createIncompleteCompletionsCache();
    }
}

function createIncompleteCompletionsCache(): IncompleteCompletionsCache {
    let info: CompletionInfo | undefined;
    return {
        get() {
            return info;
        },
        set(newInfo) {
            info = newInfo;
        },
        clear() {
            info = undefined;
        },
    };
}

/** @internal */
export type ScriptInfoOrConfig = ScriptInfo | TsConfigSourceFile;
/** @internal */
export function isConfigFile(config: ScriptInfoOrConfig): config is TsConfigSourceFile {
    return (config as TsConfigSourceFile).kind !== undefined;
}

function printProjectWithoutFileNames(project: Project) {
    project.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
}

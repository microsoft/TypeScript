namespace ts.server {
    export const maxProgramSizeForNonTsFiles = 20 * 1024 * 1024;
    /*@internal*/
    export const maxFileSize = 4 * 1024 * 1024;

    export const ProjectsUpdatedInBackgroundEvent = "projectsUpdatedInBackground";
    export const ProjectLoadingStartEvent = "projectLoadingStart";
    export const ProjectLoadingFinishEvent = "projectLoadingFinish";
    export const LargeFileReferencedEvent = "largeFileReferenced";
    export const ConfigFileDiagEvent = "configFileDiag";
    export const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
    export const ProjectInfoTelemetryEvent = "projectInfo";
    export const OpenFileInfoTelemetryEvent = "openFileInfo";

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
        data: { triggerFile: string, configFileName: string, diagnostics: readonly Diagnostic[] };
    }

    export interface ProjectLanguageServiceStateEvent {
        eventName: typeof ProjectLanguageServiceStateEvent;
        data: { project: Project, languageServiceEnabled: boolean };
    }

    /** This will be converted to the payload of a protocol.TelemetryEvent in session.defaultEventHandler. */
    export interface ProjectInfoTelemetryEvent {
        readonly eventName: typeof ProjectInfoTelemetryEvent;
        readonly data: ProjectInfoTelemetryEventData;
    }

    /*
     * __GDPR__
     * "projectInfo" : {
     *      "${include}": ["${TypeScriptCommonProperties}"],
     *      "projectId": { "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight", "endpoint": "ProjectId" },
     *      "fileStats": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "compilerOptions": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "extends": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "files": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "include": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "exclude": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "compileOnSave": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "typeAcquisition": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "configFileName": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "projectType": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "languageServiceEnabled": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *      "version": { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
     * }
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

    export type ProjectServiceEvent =
        LargeFileReferencedEvent
        | ProjectsUpdatedInBackgroundEvent
        | ProjectLoadingStartEvent
        | ProjectLoadingFinishEvent
        | ConfigFileDiagEvent
        | ProjectLanguageServiceStateEvent
        | ProjectInfoTelemetryEvent
        | OpenFileInfoTelemetryEvent;

    export type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;

    /*@internal*/
    export type PerformanceEventHandler = (event: PerformanceEvent) => void;

    export interface SafeList {
        [name: string]: { match: RegExp, exclude?: (string | number)[][], types?: string[] };
    }

    function prepareConvertersForEnumLikeCompilerOptions(commandLineOptions: CommandLineOption[]): Map<string, Map<string, number>> {
        const map: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
        for (const option of commandLineOptions) {
            if (typeof option.type === "object") {
                const optionMap = <Map<string, number>>option.type;
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
    const indentStyle = new Map(getEntries({
        none: IndentStyle.None,
        block: IndentStyle.Block,
        smart: IndentStyle.Smart
    }));

    export interface TypesMapFile {
        typesMap: SafeList;
        simpleMap: { [libName: string]: string };
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
            match: /jquery(-(\.?\d+)+)?(\.intellisense)?(\.min)?\.js$/i,
            types: ["jquery"]
        },
        "WinJS": {
            // e.g. c:/temp/UWApp1/lib/winjs-4.0.1/js/base.js
            match: /^(.*\/winjs-[.\d]+)\/js\/base\.js$/i,        // If the winjs/base.js file is found..
            exclude: [["^", 1, "/.*"]],                // ..then exclude all files under the winjs folder
            types: ["winjs"]                           // And fetch the @types package for WinJS
        },
        "Kendo": {
            // e.g. /Kendo3/wwwroot/lib/kendo/kendo.all.min.js
            match: /^(.*\/kendo(-ui)?)\/kendo\.all(\.min)?\.js$/i,
            exclude: [["^", 1, "/.*"]],
            types: ["kendo-ui"]
        },
        "Office Nuget": {
            // e.g. /scripts/Office/1/excel-15.debug.js
            match: /^(.*\/office\/1)\/excel-\d+\.debug\.js$/i, // Office NuGet package is installed under a "1/office" folder
            exclude: [["^", 1, "/.*"]],                     // Exclude that whole folder if the file indicated above is found in it
            types: ["office"]                               // @types package to fetch instead
        },
        "References": {
            match: /^(.*\/_references\.js)$/i,
            exclude: [["^", 1, "$"]]
        }
    };

    export function convertFormatOptions(protocolOptions: protocol.FormatCodeSettings): FormatCodeSettings {
        if (isString(protocolOptions.indentStyle)) {
            protocolOptions.indentStyle = indentStyle.get(protocolOptions.indentStyle.toLowerCase());
            Debug.assert(protocolOptions.indentStyle !== undefined);
        }
        return <any>protocolOptions;
    }

    export function convertCompilerOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): CompilerOptions & protocol.CompileOnSaveMixin {
        compilerOptionConverters.forEach((mappedValues, id) => {
            const propertyValue = protocolOptions[id];
            if (isString(propertyValue)) {
                protocolOptions[id] = mappedValues.get(propertyValue.toLowerCase());
            }
        });
        return <any>protocolOptions;
    }

    export function convertWatchOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): WatchOptions | undefined {
        let result: WatchOptions | undefined;
        watchOptionsConverters.forEach((mappedValues, id) => {
            const propertyValue = protocolOptions[id];
            if (propertyValue === undefined) return;
            (result || (result = {}))[id] = isString(propertyValue) ?
                mappedValues.get(propertyValue.toLowerCase()) :
                propertyValue;
        });
        return result;
    }

    export function tryConvertScriptKindName(scriptKindName: protocol.ScriptKindName | ScriptKind): ScriptKind {
        return isString(scriptKindName) ? convertScriptKindName(scriptKindName) : scriptKindName;
    }

    export function convertScriptKindName(scriptKindName: protocol.ScriptKindName) {
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

    /*@internal*/
    export function convertUserPreferences(preferences: protocol.UserPreferences): UserPreferences {
        const { lazyConfiguredProjectsFromExternalProject, ...userPreferences } = preferences;
        return userPreferences;
    }

    export interface HostConfiguration {
        formatCodeOptions: FormatCodeSettings;
        preferences: protocol.UserPreferences;
        hostInfo: string;
        extraFileExtensions?: FileExtensionInfo[];
        watchOptions?: WatchOptions;
    }

    export interface OpenConfiguredProjectResult {
        configFileName?: NormalizedPath;
        configFileErrors?: readonly Diagnostic[];
    }

    interface AssignProjectResult extends OpenConfiguredProjectResult {
        retainProjects: readonly ConfiguredProject[] | ConfiguredProject | undefined;
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

    const enum ConfigFileWatcherStatus {
        ReloadingFiles = "Reloading configured projects for files",
        ReloadingInferredRootFiles = "Reloading configured projects for only inferred root files",
        UpdatedCallback = "Updated the callback",
        OpenFilesImpactedByConfigFileAdd = "File added to open files impacted by this config file",
        OpenFilesImpactedByConfigFileRemove = "File removed from open files impacted by this config file",
        RootOfInferredProjectTrue = "Open file was set as Inferred root",
        RootOfInferredProjectFalse = "Open file was set as not inferred root",
    }

    /*@internal*/
    interface ConfigFileExistenceInfo {
        /**
         * Cached value of existence of config file
         * It is true if there is configured project open for this file.
         * It can be either true or false if this is the config file that is being watched by inferred project
         *   to decide when to update the structure so that it knows about updating the project for its files
         *   (config file may include the inferred project files after the change and hence may be wont need to be in inferred project)
         */
        exists: boolean;
        /**
         * openFilesImpactedByConfigFiles is a map of open files that would be impacted by this config file
         *   because these are the paths being looked up for their default configured project location
         * The value in the map is true if the open file is root of the inferred project
         * It is false when the open file that would still be impacted by existence of
         *   this config file but it is not the root of inferred project
         */
        openFilesImpactedByConfigFile: Map<Path, boolean>;
        /**
         * The file watcher watching the config file because there is open script info that is root of
         * inferred project and will be impacted by change in the status of the config file
         * The watcher is present only when there is no open configured project for the config file
         */
        configFileWatcherForRootOfInferredProject?: FileWatcher;
    }

    export interface ProjectServiceOptions {
        host: ServerHost;
        logger: Logger;
        cancellationToken: HostCancellationToken;
        useSingleInferredProject: boolean;
        useInferredProjectPerProjectRoot: boolean;
        typingsInstaller: ITypingsInstaller;
        eventHandler?: ProjectServiceEventHandler;
        suppressDiagnosticEvents?: boolean;
        throttleWaitMilliseconds?: number;
        globalPlugins?: readonly string[];
        pluginProbeLocations?: readonly string[];
        allowLocalPluginLoads?: boolean;
        typesMapLocation?: string;
        syntaxOnly?: boolean;
    }

    interface OriginalFileInfo { fileName: NormalizedPath; path: Path; }
    interface AncestorConfigFileInfo {
        /** config file name */
        fileName: string;
        /** path of open file so we can look at correct root */
        path: Path;
        configFileInfo: true;
    }
    type OpenScriptInfoOrClosedFileInfo = ScriptInfo | OriginalFileInfo;
    type OpenScriptInfoOrClosedOrConfigFileInfo = OpenScriptInfoOrClosedFileInfo | AncestorConfigFileInfo;

    function isOpenScriptInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is ScriptInfo {
        return !!(infoOrFileNameOrConfig as ScriptInfo).containingProjects;
    }

    function isAncestorConfigFileInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is AncestorConfigFileInfo {
        return !!(infoOrFileNameOrConfig as AncestorConfigFileInfo).configFileInfo;
    }

    /*@internal*/
    /** Kind of operation to perform to get project reference project */
    export enum ProjectReferenceProjectLoadKind {
        /** Find existing project for project reference */
        Find,
        /** Find existing project or create one for the project reference */
        FindCreate,
        /** Find existing project or create and load it for the project reference */
        FindCreateLoad
    }

    /*@internal*/
    export function forEachResolvedProjectReferenceProject<T>(
        project: ConfiguredProject,
        cb: (child: ConfiguredProject, configFileName: NormalizedPath) => T | undefined,
        projectReferenceProjectLoadKind: ProjectReferenceProjectLoadKind.Find | ProjectReferenceProjectLoadKind.FindCreate
    ): T | undefined;
    /*@internal*/
    export function forEachResolvedProjectReferenceProject<T>(
        project: ConfiguredProject,
        cb: (child: ConfiguredProject, configFileName: NormalizedPath) => T | undefined,
        projectReferenceProjectLoadKind: ProjectReferenceProjectLoadKind.FindCreateLoad,
        reason: string
    ): T | undefined;
    export function forEachResolvedProjectReferenceProject<T>(
        project: ConfiguredProject,
        cb: (child: ConfiguredProject, configFileName: NormalizedPath) => T | undefined,
        projectReferenceProjectLoadKind: ProjectReferenceProjectLoadKind,
        reason?: string
    ): T | undefined {
        return forEachResolvedProjectReference(project, ref => {
            if (!ref) return undefined;
            const configFileName = toNormalizedPath(ref.sourceFile.fileName);
            const child = project.projectService.findConfiguredProjectByProjectName(configFileName) || (
                projectReferenceProjectLoadKind === ProjectReferenceProjectLoadKind.FindCreate ?
                    project.projectService.createConfiguredProject(configFileName) :
                    projectReferenceProjectLoadKind === ProjectReferenceProjectLoadKind.FindCreateLoad ?
                        project.projectService.createAndLoadConfiguredProject(configFileName, reason!) :
                        undefined
            );
            return child && cb(child, configFileName);
        });
    }

    /*@internal*/
    export function forEachResolvedProjectReference<T>(
        project: ConfiguredProject,
        cb: (resolvedProjectReference: ResolvedProjectReference | undefined, resolvedProjectReferencePath: Path) => T | undefined
    ): T | undefined {
        const program = project.getCurrentProgram();
        return program && program.forEachResolvedProjectReference(cb);
    }

    function forEachPotentialProjectReference<T>(
        project: ConfiguredProject,
        cb: (potentialProjectReference: Path) => T | undefined
    ): T | undefined {
        return project.potentialProjectReferences &&
            forEachKey(project.potentialProjectReferences, cb);
    }

    function forEachAnyProjectReferenceKind<T>(
        project: ConfiguredProject,
        cb: (resolvedProjectReference: ResolvedProjectReference | undefined, resolvedProjectReferencePath: Path) => T | undefined,
        cbProjectRef: (projectReference: ProjectReference) => T | undefined,
        cbPotentialProjectRef: (potentialProjectReference: Path) => T | undefined
    ): T | undefined {
        return project.getCurrentProgram() ?
            forEachResolvedProjectReference(project, cb) :
            project.isInitialLoadPending() ?
                forEachPotentialProjectReference(project, cbPotentialProjectRef) :
                forEach(project.getProjectReferences(), cbProjectRef);
    }

    function callbackRefProject<T>(
        project: ConfiguredProject,
        cb: (refProj: ConfiguredProject) => T | undefined,
        refPath: Path | undefined
    ) {
        const refProject = refPath && project.projectService.configuredProjects.get(refPath);
        return refProject && cb(refProject);
    }

    function forEachReferencedProject<T>(
        project: ConfiguredProject,
        cb: (refProj: ConfiguredProject) => T | undefined
    ): T | undefined {
        return forEachAnyProjectReferenceKind(
            project,
            resolvedRef => callbackRefProject(project, cb, resolvedRef && resolvedRef.sourceFile.path),
            projectRef => callbackRefProject(project, cb, project.toPath(projectRef.path)),
            potentialProjectRef => callbackRefProject(project, cb, potentialProjectRef)
        );
    }

    interface ScriptInfoInNodeModulesWatcher extends FileWatcher {
        refCount: number;
    }

    function getDetailWatchInfo(watchType: WatchType, project: Project | undefined) {
        return `Project: ${project ? project.getProjectName() : ""} WatchType: ${watchType}`;
    }

    function isScriptInfoWatchedFromNodeModules(info: ScriptInfo) {
        return !info.isScriptOpen() && info.mTime !== undefined;
    }

    /*@internal*/
    /** true if script info is part of project and is not in project because it is referenced from project reference source */
    export function projectContainsInfoDirectly(project: Project, info: ScriptInfo) {
        return project.containsScriptInfo(info) &&
            !project.isSourceOfProjectReferenceRedirect(info.path);
    }

    /*@internal*/
    export function updateProjectIfDirty(project: Project) {
        project.invalidateResolutionsOfFailedLookupLocations();
        return project.dirty && project.updateGraph();
    }

    function setProjectOptionsUsed(project: ConfiguredProject | ExternalProject) {
        if (isConfiguredProject(project)) {
            project.projectOptions = true;
        }
    }

    /*@internal*/
    export interface OpenFileArguments {
        fileName: string;
        content?: string;
        scriptKind?: protocol.ScriptKindName | ScriptKind;
        hasMixedContent?: boolean;
        projectRootPath?: string;
    }

    /*@internal*/
    export interface ChangeFileArguments {
        fileName: string;
        changes: Iterator<TextChange>;
    }

    export class ProjectService {

        /*@internal*/
        readonly typingsCache: TypingsCache;

        /*@internal*/
        readonly documentRegistry: DocumentRegistry;

        /**
         * Container of all known scripts
         */
        /*@internal*/
        readonly filenameToScriptInfo = new Map<string, ScriptInfo>();
        private readonly scriptInfoInNodeModulesWatchers = new Map<string, ScriptInfoInNodeModulesWatcher>();
        /**
         * Contains all the deleted script info's version information so that
         * it does not reset when creating script info again
         * (and could have potentially collided with version where contents mismatch)
         */
        private readonly filenameToScriptInfoVersion = new Map<string, ScriptInfoVersion>();
        // Set of all '.js' files ever opened.
        private readonly allJsFilesForOpenFileTelemetry = new Map<string, true>();

        /**
         * Map to the real path of the infos
         */
        /* @internal */
        readonly realpathToScriptInfos: MultiMap<Path, ScriptInfo> | undefined;
        /**
         * maps external project file name to list of config files that were the part of this project
         */
        private readonly externalProjectToConfiguredProjectMap: Map<string, NormalizedPath[]> = new Map<string, NormalizedPath[]>();

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
        readonly configuredProjects = new Map<string, ConfiguredProject>();
        /**
         * Open files: with value being project root path, and key being Path of the file that is open
         */
        readonly openFiles = new Map<Path, NormalizedPath | undefined>();
        /**
         * Map of open files that are opened without complete path but have projectRoot as current directory
         */
        private readonly openFilesWithNonRootedDiskPath = new Map<string, ScriptInfo>();

        private compilerOptionsForInferredProjects: CompilerOptions | undefined;
        private compilerOptionsForInferredProjectsPerProjectRoot = new Map<string, CompilerOptions>();
        private watchOptionsForInferredProjects: WatchOptions | undefined;
        private watchOptionsForInferredProjectsPerProjectRoot = new Map<string, WatchOptions | false>();
        /**
         * Project size for configured or external projects
         */
        private readonly projectToSizeMap: Map<string, number> = new Map<string, number>();
        /**
         * This is a map of config file paths existence that doesnt need query to disk
         * - The entry can be present because there is inferred project that needs to watch addition of config file to directory
         *   In this case the exists could be true/false based on config file is present or not
         * - Or it is present if we have configured project open with config file at that location
         *   In this case the exists property is always true
         */
        private readonly configFileExistenceInfoCache = new Map<string, ConfigFileExistenceInfo>();
        /*@internal*/ readonly throttledOperations: ThrottledOperations;

        private readonly hostConfiguration: HostConfiguration;
        private safelist: SafeList = defaultTypeSafeList;
        private readonly legacySafelist = new Map<string, string>();

        private pendingProjectUpdates = new Map<string, Project>();
        /* @internal */
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
        private readonly eventHandler?: ProjectServiceEventHandler;
        private readonly suppressDiagnosticEvents?: boolean;

        public readonly globalPlugins: readonly string[];
        public readonly pluginProbeLocations: readonly string[];
        public readonly allowLocalPluginLoads: boolean;
        private currentPluginConfigOverrides: Map<string, any> | undefined;

        public readonly typesMapLocation: string | undefined;

        public readonly syntaxOnly?: boolean;

        /** Tracks projects that we have already sent telemetry for. */
        private readonly seenProjects = new Map<string, true>();

        /*@internal*/
        readonly watchFactory: WatchFactory<WatchType, Project>;

        /*@internal*/
        readonly packageJsonCache: PackageJsonCache;
        /*@internal*/
        private packageJsonFilesMap: Map<Path, FileWatcher> | undefined;


        private performanceEventHandler?: PerformanceEventHandler;

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
            this.syntaxOnly = opts.syntaxOnly;

            Debug.assert(!!this.host.createHash, "'ServerHost.createHash' is required for ProjectService");
            if (this.host.realpath) {
                this.realpathToScriptInfos = createMultiMap();
            }
            this.currentDirectory = toNormalizedPath(this.host.getCurrentDirectory());
            this.toCanonicalFileName = createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);
            this.globalCacheLocationDirectoryPath = this.typingsInstaller.globalTypingsCacheLocation
                ? ensureTrailingDirectorySeparator(this.toPath(this.typingsInstaller.globalTypingsCacheLocation))
                : undefined;
            this.throttledOperations = new ThrottledOperations(this.host, this.logger);

            if (this.typesMapLocation) {
                this.loadTypesMap();
            }
            else {
                this.logger.info("No types map provided; using the default");
            }

            this.typingsInstaller.attach(this);

            this.typingsCache = new TypingsCache(this.typingsInstaller);

            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeSettings(this.host.newLine),
                preferences: emptyOptions,
                hostInfo: "Unknown host",
                extraFileExtensions: [],
            };

            this.documentRegistry = createDocumentRegistryInternal(this.host.useCaseSensitiveFileNames, this.currentDirectory, this);
            const watchLogLevel = this.logger.hasLevel(LogLevel.verbose) ? WatchLogLevel.Verbose :
                this.logger.loggingEnabled() ? WatchLogLevel.TriggerOnly : WatchLogLevel.None;
            const log: (s: string) => void = watchLogLevel !== WatchLogLevel.None ? (s => this.logger.info(s)) : noop;
            this.packageJsonCache = createPackageJsonCache(this);
            this.watchFactory = this.syntaxOnly ?
                {
                    watchFile: returnNoopFileWatcher,
                    watchFilePath: returnNoopFileWatcher,
                    watchDirectory: returnNoopFileWatcher,
                } :
                getWatchFactory(watchLogLevel, log, getDetailWatchInfo);
        }

        toPath(fileName: string) {
            return toPath(fileName, this.currentDirectory, this.toCanonicalFileName);
        }

        /*@internal*/
        getExecutingFilePath() {
            return this.getNormalizedAbsolutePath(this.host.getExecutingFilePath());
        }

        /*@internal*/
        getNormalizedAbsolutePath(fileName: string) {
            return getNormalizedAbsolutePath(fileName, this.host.getCurrentDirectory());
        }

        /*@internal*/
        setDocument(key: DocumentRegistryBucketKey, path: Path, sourceFile: SourceFile) {
            const info = Debug.checkDefined(this.getScriptInfoForPath(path));
            info.cacheSourceFile = { key, sourceFile };
        }

        /*@internal*/
        getDocument(key: DocumentRegistryBucketKey, path: Path): SourceFile | undefined {
            const info = this.getScriptInfoForPath(path);
            return info && info.cacheSourceFile && info.cacheSourceFile.key === key ? info.cacheSourceFile.sourceFile : undefined;
        }

        /* @internal */
        ensureInferredProjectsUpToDate_TestOnly() {
            this.ensureProjectStructuresUptoDate();
        }

        /* @internal */
        getCompilerOptionsForInferredProjects() {
            return this.compilerOptionsForInferredProjects;
        }

        /* @internal */
        onUpdateLanguageServiceStateForProject(project: Project, languageServiceEnabled: boolean) {
            if (!this.eventHandler) {
                return;
            }
            const event: ProjectLanguageServiceStateEvent = {
                eventName: ProjectLanguageServiceStateEvent,
                data: { project, languageServiceEnabled }
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
                    if (raw.simpleMap.hasOwnProperty(key)) {
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
                    project.updateTypingFiles(this.typingsCache.updateTypingsForProject(response.projectName, response.compilerOptions, response.typeAcquisition, response.unresolvedImports, response.typings));
                    break;
                case ActionInvalidate:
                    // Do not clear resolution cache, there was changes detected in typings, so enque typing request and let it get us correct results
                    this.typingsCache.enqueueInstallTypingsForProject(project, project.lastCachedUnresolvedImportsList, /*forceRefresh*/ true);
                    return;
            }
            this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
        }

        /*@internal*/
        delayEnsureProjectForOpenFiles() {
            this.pendingEnsureProjectForOpenFiles = true;
            this.throttledOperations.schedule("*ensureProjectForOpenFiles*", /*delay*/ 2500, () => {
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
            project.markAsDirty();
            const projectName = project.getProjectName();
            this.pendingProjectUpdates.set(projectName, project);
            this.throttledOperations.schedule(projectName, /*delay*/ 250, () => {
                if (this.pendingProjectUpdates.delete(projectName)) {
                    updateProjectIfDirty(project);
                }
            });
        }

        /*@internal*/
        hasPendingProjectUpdate(project: Project) {
            return this.pendingProjectUpdates.has(project.getProjectName());
        }

        /* @internal */
        sendProjectsUpdatedInBackgroundEvent() {
            if (!this.eventHandler) {
                return;
            }

            const event: ProjectsUpdatedInBackgroundEvent = {
                eventName: ProjectsUpdatedInBackgroundEvent,
                data: {
                    openFiles: arrayFrom(this.openFiles.keys(), path => this.getScriptInfoForPath(path)!.fileName)
                }
            };
            this.eventHandler(event);
        }

        /* @internal */
        sendLargeFileReferencedEvent(file: string, fileSize: number) {
            if (!this.eventHandler) {
                return;
            }

            const event: LargeFileReferencedEvent = {
                eventName: LargeFileReferencedEvent,
                data: { file, fileSize, maxFileSize }
            };
            this.eventHandler(event);
        }

        /* @internal */
        sendProjectLoadingStartEvent(project: ConfiguredProject, reason: string) {
            if (!this.eventHandler) {
                return;
            }
            project.sendLoadingProjectFinish = true;
            const event: ProjectLoadingStartEvent = {
                eventName: ProjectLoadingStartEvent,
                data: { project, reason }
            };
            this.eventHandler(event);
        }

        /* @internal */
        sendProjectLoadingFinishEvent(project: ConfiguredProject) {
            if (!this.eventHandler || !project.sendLoadingProjectFinish) {
                return;
            }

            project.sendLoadingProjectFinish = false;
            const event: ProjectLoadingFinishEvent = {
                eventName: ProjectLoadingFinishEvent,
                data: { project }
            };
            this.eventHandler(event);
        }

        /* @internal */
        sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number) {
            if (this.performanceEventHandler) {
                this.performanceEventHandler({ kind, durationMs });
            }
        }

        /* @internal */
        delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project: Project) {
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

        setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.ExternalProjectCompilerOptions, projectRootPath?: string): void {
            Debug.assert(projectRootPath === undefined || this.useInferredProjectPerProjectRoot, "Setting compiler options per project root path is only supported when useInferredProjectPerProjectRoot is enabled");

            const compilerOptions = convertCompilerOptions(projectCompilerOptions);
            const watchOptions = convertWatchOptions(projectCompilerOptions);

            // always set 'allowNonTsExtensions' for inferred projects since user cannot configure it from the outside
            // previously we did not expose a way for user to change these settings and this option was enabled by default
            compilerOptions.allowNonTsExtensions = true;
            const canonicalProjectRootPath = projectRootPath && this.toCanonicalFileName(projectRootPath);
            if (canonicalProjectRootPath) {
                this.compilerOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, compilerOptions);
                this.watchOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, watchOptions || false);
            }
            else {
                this.compilerOptionsForInferredProjects = compilerOptions;
                this.watchOptionsForInferredProjects = watchOptions;
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
                if (canonicalProjectRootPath ?
                    project.projectRootPath === canonicalProjectRootPath :
                    !project.projectRootPath || !this.compilerOptionsForInferredProjectsPerProjectRoot.has(project.projectRootPath)) {
                    project.setCompilerOptions(compilerOptions);
                    project.setWatchOptions(watchOptions);
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

        /* @internal */
        private forEachProject(cb: (project: Project) => void) {
            this.externalProjects.forEach(cb);
            this.configuredProjects.forEach(cb);
            this.inferredProjects.forEach(cb);
        }

        /* @internal */
        forEachEnabledProject(cb: (project: Project) => void) {
            this.forEachProject(project => {
                if (!project.isOrphan() && project.languageServiceEnabled) {
                    cb(project);
                }
            });
        }

        getDefaultProjectForFile(fileName: NormalizedPath, ensureProject: boolean): Project | undefined {
            return ensureProject ? this.ensureDefaultProjectForFile(fileName) : this.tryGetDefaultProjectForFile(fileName);
        }

        /* @internal */
        tryGetDefaultProjectForFile(fileName: NormalizedPath): Project | undefined {
            const scriptInfo = this.getScriptInfoForNormalizedPath(fileName);
            return scriptInfo && !scriptInfo.isOrphan() ? scriptInfo.getDefaultProject() : undefined;
        }

        /* @internal */
        ensureDefaultProjectForFile(fileName: NormalizedPath): Project {
            return this.tryGetDefaultProjectForFile(fileName) || this.doEnsureDefaultProjectForFile(fileName);
        }

        private doEnsureDefaultProjectForFile(fileName: NormalizedPath): Project {
            this.ensureProjectStructuresUptoDate();
            const scriptInfo = this.getScriptInfoForNormalizedPath(fileName);
            return scriptInfo ? scriptInfo.getDefaultProject() : (this.logErrorForScriptInfoNotFound(fileName), Errors.ThrowNoProject());
        }

        getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string) {
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

        getFormatCodeOptions(file: NormalizedPath) {
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

        private onSourceFileChanged(fileName: string, eventKind: FileWatcherEventKind, path: Path) {
            const info = this.getScriptInfoForPath(path);
            if (!info) {
                this.logger.msg(`Error: got watch notification for unknown file: ${fileName}`);
            }
            else {
                if (info.containingProjects) {
                    info.containingProjects.forEach(project => project.resolutionCache.removeResolutionsFromProjectReferenceRedirects(info.path));
                }
                if (eventKind === FileWatcherEventKind.Deleted) {
                    // File was deleted
                    this.handleDeletedFile(info);
                }
                else if (!info.isScriptOpen()) {
                    // file has been changed which might affect the set of referenced files in projects that include
                    // this file and set of inferred projects
                    info.delayReloadNonMixedContentFile();
                    this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ false);
                    this.handleSourceMapProjects(info);
                }
            }
        }

        private handleSourceMapProjects(info: ScriptInfo) {
            // Change in d.ts, update source projects as well
            if (info.sourceMapFilePath) {
                if (isString(info.sourceMapFilePath)) {
                    const sourceMapFileInfo = this.getScriptInfoForPath(info.sourceMapFilePath);
                    this.delayUpdateSourceInfoProjects(sourceMapFileInfo && sourceMapFileInfo.sourceInfos);
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

        private handleDeletedFile(info: ScriptInfo) {
            this.stopWatchingScriptInfo(info);

            if (!info.isScriptOpen()) {
                this.deleteScriptInfo(info);

                // capture list of projects since detachAllProjects will wipe out original list
                const containingProjects = info.containingProjects.slice();

                info.detachAllProjects();

                // update projects to make sure that set of referenced files is correct
                this.delayUpdateProjectGraphs(containingProjects, /*clearSourceMapperCache*/ false);
                this.handleSourceMapProjects(info);
                info.closeSourceMapFileWatcher();
                // need to recalculate source map from declaration file
                if (info.declarationInfoPath) {
                    const declarationInfo = this.getScriptInfoForPath(info.declarationInfoPath);
                    if (declarationInfo) {
                        declarationInfo.sourceMapFilePath = undefined;
                    }
                }
            }
        }

        /**
         * This is to watch whenever files are added or removed to the wildcard directories
         */
        /*@internal*/
        watchWildcardDirectory(directory: Path, flags: WatchDirectoryFlags, project: ConfiguredProject) {
            const watchOptions = this.getWatchOptions(project);
            return this.watchFactory.watchDirectory(
                this.host,
                directory,
                fileOrDirectory => {
                    const fileOrDirectoryPath = this.toPath(fileOrDirectory);
                    const fsResult = project.getCachedDirectoryStructureHost().addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    const configFileName = project.getConfigFilePath();
                    if (getBaseFileName(fileOrDirectoryPath) === "package.json" && !isInsideNodeModules(fileOrDirectoryPath) &&
                        (fsResult && fsResult.fileExists || !fsResult && this.host.fileExists(fileOrDirectoryPath))
                    ) {
                        this.logger.info(`Project: ${configFileName} Detected new package.json: ${fileOrDirectory}`);
                        this.onAddPackageJson(fileOrDirectoryPath);
                    }

                    if (isIgnoredFileFromWildCardWatching({
                        watchedDirPath: directory,
                        fileOrDirectory,
                        fileOrDirectoryPath,
                        configFileName,
                        configFileSpecs: project.configFileSpecs!,
                        extraFileExtensions: this.hostConfiguration.extraFileExtensions,
                        currentDirectory: this.currentDirectory,
                        options: project.getCompilationSettings(),
                        program: project.getCurrentProgram(),
                        useCaseSensitiveFileNames: this.host.useCaseSensitiveFileNames,
                        writeLog: s => this.logger.info(s)
                    })) return;

                    // don't trigger callback on open, existing files
                    if (project.fileIsOpen(fileOrDirectoryPath)) {
                        if (project.pendingReload !== ConfigFileProgramReloadLevel.Full) {
                            const info = Debug.checkDefined(this.getScriptInfoForPath(fileOrDirectoryPath));
                            if (info.isAttached(project)) {
                                project.openFileWatchTriggered.set(fileOrDirectoryPath, true);
                            }
                            else {
                                project.pendingReload = ConfigFileProgramReloadLevel.Partial;
                                this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
                            }
                        }
                        return;
                    }

                    // Reload is pending, do the reload
                    if (project.pendingReload !== ConfigFileProgramReloadLevel.Full) {
                        project.pendingReload = ConfigFileProgramReloadLevel.Partial;
                        this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
                    }
                },
                flags,
                watchOptions,
                WatchType.WildcardDirectory,
                project
            );
        }

        /** Gets the config file existence info for the configured project */
        /*@internal*/
        getConfigFileExistenceInfo(project: ConfiguredProject) {
            return this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!;
        }

        /*@internal*/
        onConfigChangedForConfiguredProject(project: ConfiguredProject, eventKind: FileWatcherEventKind) {
            const configFileExistenceInfo = this.getConfigFileExistenceInfo(project);
            if (eventKind === FileWatcherEventKind.Deleted) {
                // Update the cached status
                // We arent updating or removing the cached config file presence info as that will be taken care of by
                // setConfigFilePresenceByClosedConfigFile when the project is closed (depending on tracking open files)
                configFileExistenceInfo.exists = false;
                this.removeProject(project);

                // Reload the configured projects for the open files in the map as they are affected by this config file
                // Since the configured project was deleted, we want to reload projects for all the open files including files
                // that are not root of the inferred project
                this.logConfigFileWatchUpdate(project.getConfigFilePath(), project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingFiles);
                this.delayReloadConfiguredProjectForFiles(configFileExistenceInfo, /*ignoreIfNotInferredProjectRoot*/ false);
            }
            else {
                this.logConfigFileWatchUpdate(project.getConfigFilePath(), project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingInferredRootFiles);
                // Skip refresh if project is not yet loaded
                if (project.isInitialLoadPending()) return;
                project.pendingReload = ConfigFileProgramReloadLevel.Full;
                project.pendingReloadReason = "Change in config file detected";
                this.delayUpdateProjectGraph(project);
                // As we scheduled the update on configured project graph,
                // we would need to schedule the project reload for only the root of inferred projects
                this.delayReloadConfiguredProjectForFiles(configFileExistenceInfo, /*ignoreIfNotInferredProjectRoot*/ true);
            }
        }

        /**
         * This is the callback function for the config file add/remove/change at any location
         * that matters to open script info but doesnt have configured project open
         * for the config file
         */
        private onConfigFileChangeForOpenScriptInfo(configFileName: NormalizedPath, eventKind: FileWatcherEventKind) {
            // This callback is called only if we dont have config file project for this config file
            const canonicalConfigPath = normalizedPathToPath(configFileName, this.currentDirectory, this.toCanonicalFileName);
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigPath)!;
            configFileExistenceInfo.exists = (eventKind !== FileWatcherEventKind.Deleted);
            this.logConfigFileWatchUpdate(configFileName, canonicalConfigPath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingFiles);

            // Because there is no configured project open for the config file, the tracking open files map
            // will only have open files that need the re-detection of the project and hence
            // reload projects for all the tracking open files in the map
            this.delayReloadConfiguredProjectForFiles(configFileExistenceInfo, /*ignoreIfNotInferredProjectRoot*/ false);
        }

        private removeProject(project: Project) {
            this.logger.info("`remove Project::");
            project.print(/*writeProjectFileNames*/ true);

            project.close();
            if (Debug.shouldAssert(AssertionLevel.Normal)) {
                this.filenameToScriptInfo.forEach(info => Debug.assert(
                    !info.isAttached(project),
                    "Found script Info still attached to project",
                    () => `${project.projectName}: ScriptInfos still attached: ${JSON.stringify(
                        arrayFrom(
                            mapDefinedIterator(
                                this.filenameToScriptInfo.values(),
                                info => info.isAttached(project) ?
                                    {
                                        fileName: info.fileName,
                                        projects: info.containingProjects.map(p => p.projectName),
                                        hasMixedContent: info.hasMixedContent
                                    } : undefined
                            )
                        ),
                        /*replacer*/ undefined,
                        " "
                    )}`));
            }
            // Remove the project from pending project updates
            this.pendingProjectUpdates.delete(project.getProjectName());

            switch (project.projectKind) {
                case ProjectKind.External:
                    unorderedRemoveItem(this.externalProjects, <ExternalProject>project);
                    this.projectToSizeMap.delete(project.getProjectName());
                    break;
                case ProjectKind.Configured:
                    this.configuredProjects.delete((<ConfiguredProject>project).canonicalConfigFilePath);
                    this.projectToSizeMap.delete((project as ConfiguredProject).canonicalConfigFilePath);
                    this.setConfigFileExistenceInfoByClosedConfiguredProject(<ConfiguredProject>project);
                    break;
                case ProjectKind.Inferred:
                    unorderedRemoveItem(this.inferredProjects, <InferredProject>project);
                    break;
            }
        }

        /*@internal*/
        assignOrphanScriptInfoToInferredProject(info: ScriptInfo, projectRootPath: NormalizedPath | undefined) {
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
                                        this.currentDirectory
                                )
                        )
                );

            project.addRoot(info);
            if (info.containingProjects[0] !== project) {
                // Ensure this is first project, we could be in this scenario because info could be part of orphan project
                info.detachFromProject(project);
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
            this.stopWatchingConfigFilesForClosedScriptInfo(info);

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
                    if (p.openFileWatchTriggered.has(info.path)) {
                        p.openFileWatchTriggered.delete(info.path);
                        if (!p.pendingReload) {
                            p.pendingReload = ConfigFileProgramReloadLevel.Partial;
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
                this.handleDeletedFile(info);
            }

            return ensureProjectsForOpenFiles;
        }

        private deleteScriptInfo(info: ScriptInfo) {
            this.filenameToScriptInfo.delete(info.path);
            this.filenameToScriptInfoVersion.set(info.path, info.getVersion());
            const realpath = info.getRealpathIfDifferent();
            if (realpath) {
                this.realpathToScriptInfos!.remove(realpath, info); // TODO: GH#18217
            }
        }

        private configFileExists(configFileName: NormalizedPath, canonicalConfigFilePath: string, info: OpenScriptInfoOrClosedOrConfigFileInfo) {
            let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (configFileExistenceInfo) {
                // By default the info would get impacted by presence of config file since its in the detection path
                // Only adding the info as a root to inferred project will need the existence to be watched by file watcher
                if (isOpenScriptInfo(info) && !configFileExistenceInfo.openFilesImpactedByConfigFile.has(info.path)) {
                    configFileExistenceInfo.openFilesImpactedByConfigFile.set(info.path, false);
                    this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.OpenFilesImpactedByConfigFileAdd);
                }
                return configFileExistenceInfo.exists;
            }

            // Theoretically we should be adding watch for the directory here itself.
            // In practice there will be very few scenarios where the config file gets added
            // somewhere inside the another config file directory.
            // And technically we could handle that case in configFile's directory watcher in some cases
            // But given that its a rare scenario it seems like too much overhead. (we werent watching those directories earlier either)

            // So what we are now watching is: configFile if the configured project corresponding to it is open
            // Or the whole chain of config files for the roots of the inferred projects

            // Cache the host value of file exists and add the info to map of open files impacted by this config file
            const exists = this.host.fileExists(configFileName);
            const openFilesImpactedByConfigFile = new Map<Path, boolean>();
            if (isOpenScriptInfo(info)) {
                openFilesImpactedByConfigFile.set(info.path, false);
            }
            configFileExistenceInfo = { exists, openFilesImpactedByConfigFile };
            this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo);
            this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.OpenFilesImpactedByConfigFileAdd);
            return exists;
        }

        private setConfigFileExistenceByNewConfiguredProject(project: ConfiguredProject) {
            const configFileExistenceInfo = this.getConfigFileExistenceInfo(project);
            if (configFileExistenceInfo) {
                // The existence might not be set if the file watcher is not invoked by the time config project is created by external project
                configFileExistenceInfo.exists = true;
                // close existing watcher
                if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject) {
                    const configFileName = project.getConfigFilePath();
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject.close();
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject = undefined;
                    this.logConfigFileWatchUpdate(configFileName, project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.UpdatedCallback);
                }
            }
            else {
                // We could be in this scenario if project is the configured project tracked by external project
                // Since that route doesnt check if the config file is present or not
                this.configFileExistenceInfoCache.set(project.canonicalConfigFilePath, {
                    exists: true,
                    openFilesImpactedByConfigFile: new Map<Path, boolean>()
                });
            }
        }

        /**
         * Returns true if the configFileExistenceInfo is needed/impacted by open files that are root of inferred project
         */
        private configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo: ConfigFileExistenceInfo) {
            return forEachEntry(configFileExistenceInfo.openFilesImpactedByConfigFile, (isRootOfInferredProject) => isRootOfInferredProject);
        }

        private setConfigFileExistenceInfoByClosedConfiguredProject(closedProject: ConfiguredProject) {
            const configFileExistenceInfo = this.getConfigFileExistenceInfo(closedProject);
            Debug.assert(!!configFileExistenceInfo);
            if (configFileExistenceInfo.openFilesImpactedByConfigFile.size) {
                const configFileName = closedProject.getConfigFilePath();
                // If there are open files that are impacted by this config file existence
                // but none of them are root of inferred project, the config file watcher will be
                // created when any of the script infos are added as root of inferred project
                if (this.configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo)) {
                    Debug.assert(!configFileExistenceInfo.configFileWatcherForRootOfInferredProject);
                    this.createConfigFileWatcherOfConfigFileExistence(configFileName, closedProject.canonicalConfigFilePath, configFileExistenceInfo);
                }
            }
            else {
                // There is not a single file open thats tracking the status of this config file. Remove from cache
                this.configFileExistenceInfoCache.delete(closedProject.canonicalConfigFilePath);
            }
        }

        private logConfigFileWatchUpdate(configFileName: NormalizedPath, canonicalConfigFilePath: string, configFileExistenceInfo: ConfigFileExistenceInfo, status: ConfigFileWatcherStatus) {
            if (!this.logger.hasLevel(LogLevel.verbose)) {
                return;
            }
            const inferredRoots: string[] = [];
            const otherFiles: string[] = [];
            configFileExistenceInfo.openFilesImpactedByConfigFile.forEach((isRootOfInferredProject, key) => {
                const info = this.getScriptInfoForPath(key)!;
                (isRootOfInferredProject ? inferredRoots : otherFiles).push(info.fileName);
            });

            const watches: WatchType[] = [];
            if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject) {
                watches.push(
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject === noopFileWatcher ?
                        WatchType.NoopConfigFileForInferredRoot :
                        WatchType.ConfigFileForInferredRoot
                );
            }
            if (this.configuredProjects.has(canonicalConfigFilePath)) {
                watches.push(WatchType.ConfigFile);
            }
            this.logger.info(`ConfigFilePresence:: Current Watches: ${watches}:: File: ${configFileName} Currently impacted open files: RootsOfInferredProjects: ${inferredRoots} OtherOpenFiles: ${otherFiles} Status: ${status}`);
        }

        /**
         * Create the watcher for the configFileExistenceInfo
         */
        private createConfigFileWatcherOfConfigFileExistence(
            configFileName: NormalizedPath,
            canonicalConfigFilePath: string,
            configFileExistenceInfo: ConfigFileExistenceInfo
        ) {
            configFileExistenceInfo.configFileWatcherForRootOfInferredProject =
                canWatchDirectory(getDirectoryPath(canonicalConfigFilePath) as Path) ?
                    this.watchFactory.watchFile(
                        this.host,
                        configFileName,
                        (_filename, eventKind) => this.onConfigFileChangeForOpenScriptInfo(configFileName, eventKind),
                        PollingInterval.High,
                        this.hostConfiguration.watchOptions,
                        WatchType.ConfigFileForInferredRoot
                    ) :
                    noopFileWatcher;
            this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.UpdatedCallback);
        }

        /**
         * Close the config file watcher in the cached ConfigFileExistenceInfo
         *   if there arent any open files that are root of inferred project
         */
        private closeConfigFileWatcherOfConfigFileExistenceInfo(configFileExistenceInfo: ConfigFileExistenceInfo) {
            // Close the config file watcher if there are no more open files that are root of inferred project
            if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject &&
                !this.configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo)) {
                configFileExistenceInfo.configFileWatcherForRootOfInferredProject.close();
                configFileExistenceInfo.configFileWatcherForRootOfInferredProject = undefined;
            }
        }

        /**
         * This is called on file close, so that we stop watching the config file for this script info
         */
        private stopWatchingConfigFilesForClosedScriptInfo(info: ScriptInfo) {
            Debug.assert(!info.isScriptOpen());
            this.forEachConfigFileLocation(info, (configFileName, canonicalConfigFilePath) => {
                const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
                if (configFileExistenceInfo) {
                    const infoIsRootOfInferredProject = configFileExistenceInfo.openFilesImpactedByConfigFile.get(info.path);

                    // Delete the info from map, since this file is no more open
                    configFileExistenceInfo.openFilesImpactedByConfigFile.delete(info.path);
                    this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.OpenFilesImpactedByConfigFileRemove);

                    // If the script info was not root of inferred project,
                    // there wont be config file watch open because of this script info
                    if (infoIsRootOfInferredProject) {
                        // But if it is a root, it could be the last script info that is root of inferred project
                        // and hence we would need to close the config file watcher
                        this.closeConfigFileWatcherOfConfigFileExistenceInfo(configFileExistenceInfo);
                    }

                    // If there are no open files that are impacted by configFileExistenceInfo after closing this script info
                    // there is no configured project present, remove the cached existence info
                    if (!configFileExistenceInfo.openFilesImpactedByConfigFile.size &&
                        !this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath)) {
                        Debug.assert(!configFileExistenceInfo.configFileWatcherForRootOfInferredProject);
                        this.configFileExistenceInfoCache.delete(canonicalConfigFilePath);
                    }
                }
            });
        }

        /**
         * This is called by inferred project whenever script info is added as a root
         */
        /* @internal */
        startWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo) {
            Debug.assert(info.isScriptOpen());
            this.forEachConfigFileLocation(info, (configFileName, canonicalConfigFilePath) => {
                let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
                if (!configFileExistenceInfo) {
                    // Create the cache
                    configFileExistenceInfo = {
                        exists: this.host.fileExists(configFileName),
                        openFilesImpactedByConfigFile: new Map<Path, boolean>()
                    };
                    this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo);
                }

                // Set this file as the root of inferred project
                configFileExistenceInfo.openFilesImpactedByConfigFile.set(info.path, true);
                this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.RootOfInferredProjectTrue);

                // If there is no configured project for this config file, add the file watcher
                if (!configFileExistenceInfo.configFileWatcherForRootOfInferredProject &&
                    !this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath)) {
                    this.createConfigFileWatcherOfConfigFileExistence(configFileName, canonicalConfigFilePath, configFileExistenceInfo);
                }
            });
        }

        /**
         * This is called by inferred project whenever root script info is removed from it
         */
        /* @internal */
        stopWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo) {
            this.forEachConfigFileLocation(info, (configFileName, canonicalConfigFilePath) => {
                const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
                if (configFileExistenceInfo && configFileExistenceInfo.openFilesImpactedByConfigFile.has(info.path)) {
                    Debug.assert(info.isScriptOpen());

                    // Info is not root of inferred project any more
                    configFileExistenceInfo.openFilesImpactedByConfigFile.set(info.path, false);
                    this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.RootOfInferredProjectFalse);

                    // Close the config file watcher
                    this.closeConfigFileWatcherOfConfigFileExistenceInfo(configFileExistenceInfo);
                }
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
        private forEachConfigFileLocation(info: OpenScriptInfoOrClosedOrConfigFileInfo, action: (configFileName: NormalizedPath, canonicalConfigFilePath: string) => boolean | void) {
            if (this.syntaxOnly) {
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
            // For ancestor of config file always ignore its own directory since its going to result in itself
            let searchInDirectory = !isAncestorConfigFileInfo(info);
            do {
                if (searchInDirectory) {
                    const canonicalSearchPath = normalizedPathToPath(searchPath, this.currentDirectory, this.toCanonicalFileName);
                    const tsconfigFileName = asNormalizedPath(combinePaths(searchPath, "tsconfig.json"));
                    let result = action(tsconfigFileName, combinePaths(canonicalSearchPath, "tsconfig.json"));
                    if (result) return tsconfigFileName;

                    const jsconfigFileName = asNormalizedPath(combinePaths(searchPath, "jsconfig.json"));
                    result = action(jsconfigFileName, combinePaths(canonicalSearchPath, "jsconfig.json"));
                    if (result) return jsconfigFileName;

                    // If we started within node_modules, don't look outside node_modules.
                    // Otherwise, we might pick up a very large project and pull in the world,
                    // causing an editor delay.
                    if (isNodeModulesDirectory(canonicalSearchPath)) {
                        break;
                    }
                }

                const parentPath = asNormalizedPath(getDirectoryPath(searchPath));
                if (parentPath === searchPath) break;
                searchPath = parentPath;
                searchInDirectory = true;
            } while (anySearchPathOk || isSearchPathInProjectRoot());

            return undefined;
        }

        /*@internal*/
        findDefaultConfiguredProject(info: ScriptInfo) {
            if (!info.isScriptOpen()) return undefined;
            const configFileName = this.getConfigFileNameForFile(info);
            const project = configFileName &&
                this.findConfiguredProjectByProjectName(configFileName);

            return project?.isSolution() ?
                project.getDefaultChildProjectFromSolution(info) :
                project && projectContainsInfoDirectly(project, info) ?
                    project :
                    undefined;
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
         */
        private getConfigFileNameForFile(info: OpenScriptInfoOrClosedOrConfigFileInfo) {
            if (isOpenScriptInfo(info)) Debug.assert(info.isScriptOpen());
            this.logger.info(`Search path: ${getDirectoryPath(info.fileName)}`);
            const configFileName = this.forEachConfigFileLocation(info, (configFileName, canonicalConfigFilePath) =>
                this.configFileExists(configFileName, canonicalConfigFilePath, info));
            if (configFileName) {
                this.logger.info(`For info: ${info.fileName} :: Config file name: ${configFileName}`);
            }
            else {
                this.logger.info(`For info: ${info.fileName} :: No config files found.`);
            }
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

        /*@internal*/
        findConfiguredProjectByProjectName(configFileName: NormalizedPath): ConfiguredProject | undefined {
            // make sure that casing of config file name is consistent
            const canonicalConfigFilePath = asNormalizedPath(this.toCanonicalFileName(configFileName));
            return this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
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
            this.projectToSizeMap.forEach(val => (availableSpace -= (val || 0)));

            let totalNonTsFileSize = 0;

            for (const f of fileNames) {
                const fileName = propertyReader.getFileName(f);
                if (hasTSFileExtension(fileName)) {
                    continue;
                }

                totalNonTsFileSize += this.host.getFileSize(fileName);

                if (totalNonTsFileSize > maxProgramSizeForNonTsFiles || totalNonTsFileSize > availableSpace) {
                    this.logger.info(getExceedLimitMessage({ propertyReader, hasTSFileExtension: ts.hasTSFileExtension, host: this.host }, totalNonTsFileSize)); // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
                    // Keep the size as zero since it's disabled
                    return fileName;
                }
            }

            this.projectToSizeMap.set(name, totalNonTsFileSize);

            return;

            function getExceedLimitMessage(context: { propertyReader: FilePropertyReader<any>, hasTSFileExtension: (filename: string) => boolean, host: ServerHost }, totalNonTsFileSize: number) {
                const files = getTop5LargestFiles(context);

                return `Non TS file size exceeded limit (${totalNonTsFileSize}). Largest files: ${files.map(file => `${file.name}:${file.size}`).join(", ")}`;
            }
            function getTop5LargestFiles({ propertyReader, hasTSFileExtension, host }: { propertyReader: FilePropertyReader<any>, hasTSFileExtension: (filename: string) => boolean, host: ServerHost }) {
                return fileNames.map(f => propertyReader.getFileName(f))
                    .filter(name => hasTSFileExtension(name))
                    .map(name => ({ name, size: host.getFileSize!(name) })) // TODO: GH#18217
                    .sort((a, b) => b.size - a.size)
                    .slice(0, 5);
            }
        }

        private createExternalProject(projectFileName: string, files: protocol.ExternalFile[], options: protocol.ExternalProjectCompilerOptions, typeAcquisition: TypeAcquisition, excludedFiles: NormalizedPath[]) {
            const compilerOptions = convertCompilerOptions(options);
            const watchOptions = convertWatchOptions(options);
            const project = new ExternalProject(
                projectFileName,
                this,
                this.documentRegistry,
                compilerOptions,
                /*lastFileExceededProgramSize*/ this.getFilenameForExceededTotalSizeLimitForNonTsFiles(projectFileName, compilerOptions, files, externalFilePropertyReader),
                options.compileOnSave === undefined ? true : options.compileOnSave,
                /*projectFilePath*/ undefined,
                this.currentPluginConfigOverrides,
                watchOptions
            );
            project.excludedFiles = excludedFiles;

            this.addFilesToNonInferredProject(project, files, externalFilePropertyReader, typeAcquisition);
            this.externalProjects.push(project);
            return project;
        }

        /*@internal*/
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
                version: ts.version, // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
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
        }

        /* @internal */
        createConfiguredProject(configFileName: NormalizedPath) {
            const cachedDirectoryStructureHost = createCachedDirectoryStructureHost(this.host, this.host.getCurrentDirectory(), this.host.useCaseSensitiveFileNames)!; // TODO: GH#18217
            this.logger.info(`Opened configuration file ${configFileName}`);
            const project = new ConfiguredProject(
                configFileName,
                this,
                this.documentRegistry,
                cachedDirectoryStructureHost);
            // TODO: We probably should also watch the configFiles that are extended
            project.createConfigFileWatcher();
            this.configuredProjects.set(project.canonicalConfigFilePath, project);
            this.setConfigFileExistenceByNewConfiguredProject(project);
            return project;
        }

        /* @internal */
        private createConfiguredProjectWithDelayLoad(configFileName: NormalizedPath, reason: string) {
            const project = this.createConfiguredProject(configFileName);
            project.pendingReload = ConfigFileProgramReloadLevel.Full;
            project.pendingReloadReason = reason;
            return project;
        }

        /* @internal */
        createAndLoadConfiguredProject(configFileName: NormalizedPath, reason: string) {
            const project = this.createConfiguredProject(configFileName);
            this.loadConfiguredProject(project, reason);
            return project;
        }

        /* @internal */
        private createLoadAndUpdateConfiguredProject(configFileName: NormalizedPath, reason: string) {
            const project = this.createAndLoadConfiguredProject(configFileName, reason);
            project.updateGraph();
            return project;
        }

        /**
         * Read the config file of the project, and update the project root file names.
         */
        /* @internal */
        private loadConfiguredProject(project: ConfiguredProject, reason: string) {
            this.sendProjectLoadingStartEvent(project, reason);

            // Read updated contents from disk
            const configFilename = normalizePath(project.getConfigFilePath());

            const configFileContent = tryReadFile(configFilename, fileName => this.host.readFile(fileName));
            const result = parseJsonText(configFilename, isString(configFileContent) ? configFileContent : "");
            const configFileErrors = result.parseDiagnostics as Diagnostic[];
            if (!isString(configFileContent)) configFileErrors.push(configFileContent);
            const parsedCommandLine = parseJsonSourceFileConfigFileContent(
                result,
                project.getCachedDirectoryStructureHost(),
                getDirectoryPath(configFilename),
                /*existingOptions*/ {},
                configFilename,
                /*resolutionStack*/[],
                this.hostConfiguration.extraFileExtensions,
                /*extendedConfigCache*/ undefined,
            );

            if (parsedCommandLine.errors.length) {
                configFileErrors.push(...parsedCommandLine.errors);
            }

            this.logger.info(`Config: ${configFilename} : ${JSON.stringify({
                rootNames: parsedCommandLine.fileNames,
                options: parsedCommandLine.options,
                projectReferences: parsedCommandLine.projectReferences
            }, /*replacer*/ undefined, " ")}`);

            Debug.assert(!!parsedCommandLine.fileNames);
            const compilerOptions = parsedCommandLine.options;

            // Update the project
            if (!project.projectOptions) {
                project.projectOptions = {
                    configHasExtendsProperty: parsedCommandLine.raw.extends !== undefined,
                    configHasFilesProperty: parsedCommandLine.raw.files !== undefined,
                    configHasIncludeProperty: parsedCommandLine.raw.include !== undefined,
                    configHasExcludeProperty: parsedCommandLine.raw.exclude !== undefined
                };
            }
            project.configFileSpecs = parsedCommandLine.configFileSpecs;
            project.canConfigFileJsonReportNoInputFiles = canJsonReportNoInputFiles(parsedCommandLine.raw);
            project.setProjectErrors(configFileErrors);
            project.updateReferences(parsedCommandLine.projectReferences);
            const lastFileExceededProgramSize = this.getFilenameForExceededTotalSizeLimitForNonTsFiles(project.canonicalConfigFilePath, compilerOptions, parsedCommandLine.fileNames, fileNamePropertyReader);
            if (lastFileExceededProgramSize) {
                project.disableLanguageService(lastFileExceededProgramSize);
                project.stopWatchingWildCards();
            }
            else {
                project.setCompilerOptions(compilerOptions);
                project.setWatchOptions(parsedCommandLine.watchOptions);
                project.enableLanguageService();
                project.watchWildcards(new Map(getEntries(parsedCommandLine.wildcardDirectories!))); // TODO: GH#18217
            }
            project.enablePluginsWithOptions(compilerOptions, this.currentPluginConfigOverrides);
            const filesToAdd = parsedCommandLine.fileNames.concat(project.getExternalFiles());
            this.updateRootAndOptionsOfNonInferredProject(project, filesToAdd, fileNamePropertyReader, compilerOptions, parsedCommandLine.typeAcquisition!, parsedCommandLine.compileOnSave, parsedCommandLine.watchOptions);
        }

        private updateNonInferredProjectFiles<T>(project: ExternalProject | ConfiguredProject | AutoImportProviderProject, files: T[], propertyReader: FilePropertyReader<T>) {
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
                        if (existingValue.info) {
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
                        project.directoryStructureHost
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
                            project.removeFile(value.info, project.fileExists(path), /*detachFromProject*/ true);
                        }
                        else {
                            projectRootFilesMap.delete(path);
                        }
                    }
                });
            }

            // Just to ensure that even if root files dont change, the changes to the non root file are picked up,
            // mark the project as dirty unconditionally
            project.markAsDirty();
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
         */
        /*@internal*/
        reloadFileNamesOfConfiguredProject(project: ConfiguredProject) {
            const configFileSpecs = project.configFileSpecs!; // TODO: GH#18217
            const configFileName = project.getConfigFilePath();
            const fileNamesResult = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), project.getCompilationSettings(), project.getCachedDirectoryStructureHost(), this.hostConfiguration.extraFileExtensions);
            project.updateErrorOnNoInputFiles(fileNamesResult);
            this.updateNonInferredProjectFiles(project, fileNamesResult.fileNames.concat(project.getExternalFiles()), fileNamePropertyReader);
            return project.updateGraph();
        }

        /*@internal*/
        setFileNamesOfAutoImportProviderProject(project: AutoImportProviderProject, fileNames: string[]) {
            this.updateNonInferredProjectFiles(project, fileNames, fileNamePropertyReader);
        }

        /**
         * Read the config file of the project again by clearing the cache and update the project graph
         */
        /* @internal */
        reloadConfiguredProject(project: ConfiguredProject, reason: string) {
            // At this point, there is no reason to not have configFile in the host
            const host = project.getCachedDirectoryStructureHost();

            // Clear the cache since we are reloading the project from disk
            host.clearCache();
            const configFileName = project.getConfigFilePath();
            this.logger.info(`Reloading configured project ${configFileName}`);

            // Load project from the disk
            this.loadConfiguredProject(project, reason);
            project.updateGraph();

            this.sendConfigFileDiagEvent(project, configFileName);
        }

        private sendConfigFileDiagEvent(project: ConfiguredProject, triggerFile: NormalizedPath) {
            if (!this.eventHandler || this.suppressDiagnosticEvents) {
                return;
            }
            const diagnostics = project.getLanguageService().getCompilerOptionsDiagnostics();
            diagnostics.push(...project.getAllProjectErrors());

            this.eventHandler(<ConfigFileDiagEvent>{
                eventName: ConfigFileDiagEvent,
                data: { configFileName: project.getConfigFilePath(), diagnostics, triggerFile }
            });
        }

        private getOrCreateInferredProjectForProjectRootPathIfEnabled(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): InferredProject | undefined {
            if (!this.useInferredProjectPerProjectRoot ||
                // Its a dynamic info opened without project root
                (info.isDynamic && projectRootPath === undefined)) {
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
            return this.createInferredProject(/*currentDirectory*/ undefined, /*isSingleInferredProject*/ true);
        }

        private getOrCreateSingleInferredWithoutProjectRoot(currentDirectory: string | undefined): InferredProject {
            Debug.assert(!this.useSingleInferredProject);
            const expectedCurrentDirectory = this.toCanonicalFileName(this.getNormalizedAbsolutePath(currentDirectory || ""));
            // Reuse the project with same current directory but no roots
            for (const inferredProject of this.inferredProjects) {
                if (!inferredProject.projectRootPath &&
                    inferredProject.isOrphan() &&
                    inferredProject.canonicalCurrentDirectory === expectedCurrentDirectory) {
                    return inferredProject;
                }
            }

            return this.createInferredProject(currentDirectory);
        }

        private createInferredProject(currentDirectory: string | undefined, isSingleInferredProject?: boolean, projectRootPath?: NormalizedPath): InferredProject {
            const compilerOptions = projectRootPath && this.compilerOptionsForInferredProjectsPerProjectRoot.get(projectRootPath) || this.compilerOptionsForInferredProjects!; // TODO: GH#18217
            let watchOptions: WatchOptions | false | undefined;
            if (projectRootPath) {
                watchOptions = this.watchOptionsForInferredProjectsPerProjectRoot.get(projectRootPath);
            }
            if (watchOptions === undefined) {
                watchOptions = this.watchOptionsForInferredProjects;
            }
            const project = new InferredProject(this, this.documentRegistry, compilerOptions, watchOptions || undefined, projectRootPath, currentDirectory, this.currentPluginConfigOverrides);
            if (isSingleInferredProject) {
                this.inferredProjects.unshift(project);
            }
            else {
                this.inferredProjects.push(project);
            }
            return project;
        }

        /*@internal*/
        getOrCreateScriptInfoNotOpenedByClient(uncheckedFileName: string, currentDirectory: string, hostToQueryFileExistsOn: DirectoryStructureHost) {
            return this.getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
                toNormalizedPath(uncheckedFileName), currentDirectory, /*scriptKind*/ undefined,
                /*hasMixedContent*/ undefined, hostToQueryFileExistsOn
            );
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        }

        /* @internal */
        getScriptInfoOrConfig(uncheckedFileName: string): ScriptInfoOrConfig | undefined {
            const path = toNormalizedPath(uncheckedFileName);
            const info = this.getScriptInfoForNormalizedPath(path);
            if (info) return info;
            const configProject = this.configuredProjects.get(this.toPath(uncheckedFileName));
            return configProject && configProject.getCompilerOptions().configFile;
        }

        /* @internal */
        logErrorForScriptInfoNotFound(fileName: string): void {
            const names = arrayFrom(this.filenameToScriptInfo.entries()).map(([path, scriptInfo]) => ({ path, fileName: scriptInfo.fileName }));
            this.logger.msg(`Could not find file ${JSON.stringify(fileName)}.\nAll files are: ${JSON.stringify(names)}`, Msg.Err);
        }

        /**
         * Returns the projects that contain script info through SymLink
         * Note that this does not return projects in info.containingProjects
         */
        /*@internal*/
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
                        if (project.languageServiceEnabled &&
                            !project.isOrphan() &&
                            !project.getCompilerOptions().preserveSymlinks &&
                            !info.isAttached(project)) {
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
            if (!info.isDynamicOrHasMixedContent() &&
                (!this.globalCacheLocationDirectoryPath ||
                    !startsWith(info.path, this.globalCacheLocationDirectoryPath))) {
                const indexOfNodeModules = info.path.indexOf("/node_modules/");
                if (!this.host.getModifiedTime || indexOfNodeModules === -1) {
                    info.fileWatcher = this.watchFactory.watchFilePath(
                        this.host,
                        info.fileName,
                        (fileName, eventKind, path) => this.onSourceFileChanged(fileName, eventKind, path),
                        PollingInterval.Medium,
                        this.hostConfiguration.watchOptions,
                        info.path,
                        WatchType.ClosedScriptInfo
                    );
                }
                else {
                    info.mTime = this.getModifiedTime(info);
                    info.fileWatcher = this.watchClosedScriptInfoInNodeModules(info.path.substr(0, indexOfNodeModules) as Path);
                }
            }
        }

        private watchClosedScriptInfoInNodeModules(dir: Path): ScriptInfoInNodeModulesWatcher {
            // Watch only directory
            const existing = this.scriptInfoInNodeModulesWatchers.get(dir);
            if (existing) {
                existing.refCount++;
                return existing;
            }

            const watchDir = dir + "/node_modules" as Path;
            const watcher = this.watchFactory.watchDirectory(
                this.host,
                watchDir,
                (fileOrDirectory) => {
                    const fileOrDirectoryPath = removeIgnoredPath(this.toPath(fileOrDirectory));
                    if (!fileOrDirectoryPath) return;

                    // Has extension
                    Debug.assert(result.refCount > 0);
                    if (watchDir === fileOrDirectoryPath) {
                        this.refreshScriptInfosInDirectory(watchDir);
                    }
                    else {
                        const info = this.getScriptInfoForPath(fileOrDirectoryPath);
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
                },
                WatchDirectoryFlags.Recursive,
                this.hostConfiguration.watchOptions,
                WatchType.NodeModulesForClosedScriptInfo
            );
            const result: ScriptInfoInNodeModulesWatcher = {
                close: () => {
                    if (result.refCount === 1) {
                        watcher.close();
                        this.scriptInfoInNodeModulesWatchers.delete(dir);
                    }
                    else {
                        result.refCount--;
                    }
                },
                refCount: 1
            };
            this.scriptInfoInNodeModulesWatchers.set(dir, result);
            return result;
        }

        private getModifiedTime(info: ScriptInfo) {
            return (this.host.getModifiedTime!(info.path) || missingFileModifiedTime).getTime();
        }

        private refreshScriptInfo(info: ScriptInfo) {
            const mTime = this.getModifiedTime(info);
            if (mTime !== info.mTime) {
                const eventKind = getFileWatcherEventKind(info.mTime!, mTime);
                info.mTime = mTime;
                this.onSourceFileChanged(info.fileName, eventKind, info.path);
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

        private getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(fileName: NormalizedPath, currentDirectory: string, scriptKind: ScriptKind | undefined, hasMixedContent: boolean | undefined, hostToQueryFileExistsOn: DirectoryStructureHost | undefined) {
            if (isRootedDiskPath(fileName) || isDynamicFileName(fileName)) {
                return this.getOrCreateScriptInfoWorker(fileName, currentDirectory, /*openedByClient*/ false, /*fileContent*/ undefined, scriptKind, hasMixedContent, hostToQueryFileExistsOn);
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

        private getOrCreateScriptInfoOpenedByClientForNormalizedPath(fileName: NormalizedPath, currentDirectory: string, fileContent: string | undefined, scriptKind: ScriptKind | undefined, hasMixedContent: boolean | undefined) {
            return this.getOrCreateScriptInfoWorker(fileName, currentDirectory, /*openedByClient*/ true, fileContent, scriptKind, hasMixedContent);
        }

        getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, hostToQueryFileExistsOn?: { fileExists(path: string): boolean; }) {
            return this.getOrCreateScriptInfoWorker(fileName, this.currentDirectory, openedByClient, fileContent, scriptKind, hasMixedContent, hostToQueryFileExistsOn);
        }

        private getOrCreateScriptInfoWorker(fileName: NormalizedPath, currentDirectory: string, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, hostToQueryFileExistsOn?: { fileExists(path: string): boolean; }) {
            Debug.assert(fileContent === undefined || openedByClient, "ScriptInfo needs to be opened by client to be able to set its user defined content");
            const path = normalizedPathToPath(fileName, currentDirectory, this.toCanonicalFileName);
            let info = this.getScriptInfoForPath(path);
            if (!info) {
                const isDynamic = isDynamicFileName(fileName);
                Debug.assert(isRootedDiskPath(fileName) || isDynamic || openedByClient, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nScript info with non-dynamic relative file name can only be open script info or in context of host currentDirectory`);
                Debug.assert(!isRootedDiskPath(fileName) || this.currentDirectory === currentDirectory || !this.openFilesWithNonRootedDiskPath.has(this.toCanonicalFileName(fileName)), "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nOpen script files with non rooted disk path opened with current directory context cannot have same canonical names`);
                Debug.assert(!isDynamic || this.currentDirectory === currentDirectory || this.useInferredProjectPerProjectRoot, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`);
                // If the file is not opened by client and the file doesnot exist on the disk, return
                if (!openedByClient && !isDynamic && !(hostToQueryFileExistsOn || this.host).fileExists(fileName)) {
                    return;
                }
                info = new ScriptInfo(this.host, fileName, scriptKind!, !!hasMixedContent, path, this.filenameToScriptInfoVersion.get(path)); // TODO: GH#18217
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
            if (openedByClient) {
                // Opening closed script info
                // either it was created just now, or was part of projects but was closed
                this.stopWatchingScriptInfo(info);
                info.open(fileContent!);
                if (hasMixedContent) {
                    info.registerFileUpdate();
                }
            }
            return info;
        }

        /**
         * This gets the script info for the normalized path. If the path is not rooted disk path then the open script info with project root context is preferred
         */
        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            return !isRootedDiskPath(fileName) && this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName)) ||
                this.getScriptInfoForPath(normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName));
        }

        getScriptInfoForPath(fileName: Path) {
            return this.filenameToScriptInfo.get(fileName);
        }

        /*@internal*/
        getDocumentPositionMapper(project: Project, generatedFileName: string, sourceFileName?: string): DocumentPositionMapper | undefined {
            // Since declaration info and map file watches arent updating project's directory structure host (which can cache file structure) use host
            const declarationInfo = this.getOrCreateScriptInfoNotOpenedByClient(generatedFileName, project.currentDirectory, this.host);
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
            let sourceMapFileInfo: ScriptInfo | undefined;
            let mapFileNameFromDeclarationInfo: string | undefined;

            let readMapFile: ReadMapFile | undefined = (mapFileName, mapFileNameFromDts) => {
                const mapInfo = this.getOrCreateScriptInfoNotOpenedByClient(mapFileName, project.currentDirectory, this.host);
                if (!mapInfo) {
                    mapFileNameFromDeclarationInfo = mapFileNameFromDts;
                    return undefined;
                }
                sourceMapFileInfo = mapInfo;
                const snap = mapInfo.getSnapshot();
                if (mapInfo.documentPositionMapper !== undefined) return mapInfo.documentPositionMapper;
                return snap.getText(0, snap.getLength());
            };
            const projectName = project.projectName;
            const documentPositionMapper = getDocumentPositionMapper(
                { getCanonicalFileName: this.toCanonicalFileName, log: s => this.logger.info(s), getSourceFileLike: f => this.getSourceFileLike(f, projectName, declarationInfo) },
                declarationInfo.fileName,
                declarationInfo.getLineInfo(),
                readMapFile
            );
            readMapFile = undefined; // Remove ref to project
            if (sourceMapFileInfo) {
                declarationInfo.sourceMapFilePath = sourceMapFileInfo.path;
                sourceMapFileInfo.declarationInfoPath = declarationInfo.path;
                sourceMapFileInfo.documentPositionMapper = documentPositionMapper || false;
                sourceMapFileInfo.sourceInfos = this.addSourceInfoToSourceMap(sourceFileName, project, sourceMapFileInfo.sourceInfos);
            }
            else if (mapFileNameFromDeclarationInfo) {
                declarationInfo.sourceMapFilePath = {
                    watcher: this.addMissingSourceMapFile(
                        project.currentDirectory === this.currentDirectory ?
                            mapFileNameFromDeclarationInfo :
                            getNormalizedAbsolutePath(mapFileNameFromDeclarationInfo, project.currentDirectory),
                        declarationInfo.path
                    ),
                    sourceInfos: this.addSourceInfoToSourceMap(sourceFileName, project)
                };
            }
            else {
                declarationInfo.sourceMapFilePath = false;
            }
            return documentPositionMapper;
        }

        private addSourceInfoToSourceMap(sourceFileName: string | undefined, project: Project, sourceInfos?: Set<Path>) {
            if (sourceFileName) {
                // Attach as source
                const sourceInfo = this.getOrCreateScriptInfoNotOpenedByClient(sourceFileName, project.currentDirectory, project.directoryStructureHost)!;
                (sourceInfos || (sourceInfos = new Set())).add(sourceInfo.path);
            }
            return sourceInfos;
        }

        private addMissingSourceMapFile(mapFileName: string, declarationInfoPath: Path) {
            const fileWatcher = this.watchFactory.watchFile(
                this.host,
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

        /*@internal*/
        getSourceFileLike(fileName: string, projectNameOrProject: string | Project, declarationInfo?: ScriptInfo) {
            const project = (projectNameOrProject as Project).projectName ? projectNameOrProject as Project : this.findProject(projectNameOrProject as string);
            if (project) {
                const path = project.toPath(fileName);
                const sourceFile = project.getSourceFile(path);
                if (sourceFile && sourceFile.resolvedPath === path) return sourceFile;
            }

            // Need to look for other files.
            const info = this.getOrCreateScriptInfoNotOpenedByClient(fileName, (project || this).currentDirectory, project ? project.directoryStructureHost : this.host);
            if (!info) return undefined;

            // Attach as source
            if (declarationInfo && isString(declarationInfo.sourceMapFilePath) && info !== declarationInfo) {
                const sourceMapInfo = this.getScriptInfoForPath(declarationInfo.sourceMapFilePath);
                if (sourceMapInfo) {
                    (sourceMapInfo.sourceInfos || (sourceMapInfo.sourceInfos = new Set())).add(info.path);
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
                    getPositionOfLineAndCharacter: (line, character, allowEdits) => info.lineOffsetToPosition(line + 1, character + 1, allowEdits)
                };
            }
            return info.sourceFileLike;
        }

        /*@internal*/
        setPerformanceEventHandler(performanceEventHandler: PerformanceEventHandler) {
            this.performanceEventHandler = performanceEventHandler;
        }

        setHostConfiguration(args: protocol.ConfigureRequestArguments) {
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
                    const { lazyConfiguredProjectsFromExternalProject, includePackageJsonAutoImports } = this.hostConfiguration.preferences;
                    this.hostConfiguration.preferences = { ...this.hostConfiguration.preferences, ...args.preferences };
                    if (lazyConfiguredProjectsFromExternalProject && !this.hostConfiguration.preferences.lazyConfiguredProjectsFromExternalProject) {
                        // Load configured projects for external projects that are pending reload
                        this.configuredProjects.forEach(project => {
                            if (project.hasExternalProjectRef() &&
                                project.pendingReload === ConfigFileProgramReloadLevel.Full &&
                                !this.pendingProjectUpdates.has(project.getProjectName())) {
                                project.updateGraph();
                            }
                        });
                    }
                    if (includePackageJsonAutoImports !== args.preferences.includePackageJsonAutoImports) {
                        this.invalidateProjectAutoImports(/*packageJsonPath*/ undefined);
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
                    this.hostConfiguration.watchOptions = convertWatchOptions(args.watchOptions);
                    this.logger.info(`Host watch options changed to ${JSON.stringify(this.hostConfiguration.watchOptions)}, it will be take effect for next watches.`);
                }
            }
        }

        /*@internal*/
        getWatchOptions(project: Project) {
            const projectOptions = project.getWatchOptions();
            return projectOptions && this.hostConfiguration.watchOptions ?
                { ...this.hostConfiguration.watchOptions, ...projectOptions } :
                projectOptions || this.hostConfiguration.watchOptions;
        }

        closeLog() {
            this.logger.close();
        }

        /**
         * This function rebuilds the project for every file opened by the client
         * This does not reload contents of open files from disk. But we could do that if needed
         */
        reloadProjects() {
            this.logger.info("reload projects.");
            // If we want this to also reload open files from disk, we could do that,
            // but then we need to make sure we arent calling this function
            // (and would separate out below reloading of projects to be called when immediate reload is needed)
            // as there is no need to load contents of the files from the disk

            // Reload Projects
            this.reloadConfiguredProjectForFiles(this.openFiles, /*delayReload*/ false, returnTrue, "User requested reload projects");
            this.ensureProjectForOpenFiles();
        }

        private delayReloadConfiguredProjectForFiles(configFileExistenceInfo: ConfigFileExistenceInfo, ignoreIfNotRootOfInferredProject: boolean) {
            // Get open files to reload projects for
            this.reloadConfiguredProjectForFiles(
                configFileExistenceInfo.openFilesImpactedByConfigFile,
                /*delayReload*/ true,
                ignoreIfNotRootOfInferredProject ?
                    isRootOfInferredProject => isRootOfInferredProject : // Reload open files if they are root of inferred project
                    returnTrue, // Reload all the open files impacted by config file
                "Change in config file detected"
            );
            this.delayEnsureProjectForOpenFiles();
        }

        /**
         * This function goes through all the openFiles and tries to file the config file for them.
         * If the config file is found and it refers to existing project, it reloads it either immediately
         * or schedules it for reload depending on delayReload option
         * If the there is no existing project it just opens the configured project for the config file
         * reloadForInfo provides a way to filter out files to reload configured project for
         */
        private reloadConfiguredProjectForFiles<T>(openFiles: Map<Path, T>, delayReload: boolean, shouldReloadProjectFor: (openFileValue: T) => boolean, reason: string) {
            const updatedProjects = new Map<string, true>();
            // try to reload config file for all open files
            openFiles.forEach((openFileValue, path) => {
                // Filter out the files that need to be ignored
                if (!shouldReloadProjectFor(openFileValue)) {
                    return;
                }

                const info = this.getScriptInfoForPath(path)!; // TODO: GH#18217
                Debug.assert(info.isScriptOpen());
                // This tries to search for a tsconfig.json for the given file. If we found it,
                // we first detect if there is already a configured project created for it: if so,
                // we re- read the tsconfig file content and update the project only if we havent already done so
                // otherwise we create a new one.
                const configFileName = this.getConfigFileNameForFile(info);
                if (configFileName) {
                    const project = this.findConfiguredProjectByProjectName(configFileName) || this.createConfiguredProject(configFileName);
                    if (!updatedProjects.has(project.canonicalConfigFilePath)) {
                        updatedProjects.set(project.canonicalConfigFilePath, true);
                        if (delayReload) {
                            project.pendingReload = ConfigFileProgramReloadLevel.Full;
                            project.pendingReloadReason = reason;
                            this.delayUpdateProjectGraph(project);
                        }
                        else {
                            // reload from the disk
                            this.reloadConfiguredProject(project, reason);
                            // If this is solution, reload the project till the reloaded project contains the script info directly
                            if (!project.containsScriptInfo(info) && project.isSolution()) {
                                forEachResolvedProjectReferenceProject(
                                    project,
                                    child => {
                                        if (!updatedProjects.has(child.canonicalConfigFilePath)) {
                                            updatedProjects.set(child.canonicalConfigFilePath, true);
                                            this.reloadConfiguredProject(child, reason);
                                        }
                                        return projectContainsInfoDirectly(child, info);
                                    },
                                    ProjectReferenceProjectLoadKind.FindCreate
                                );
                            }
                        }
                    }
                }
            });
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

            if (!firstProject.isOrphan() &&
                isInferredProject(firstProject) &&
                firstProject.isRoot(info) &&
                forEach(info.containingProjects, p => p !== firstProject && !p.isOrphan())) {
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

        /*@internal*/
        getOriginalLocationEnsuringConfiguredProject(project: Project, location: DocumentPosition): DocumentPosition | undefined {
            const originalLocation = project.isSourceOfProjectReferenceRedirect(location.fileName) ?
                location :
                project.getSourceMapper().tryGetSourcePosition(location);
            if (!originalLocation) return undefined;

            const { fileName } = originalLocation;
            if (!this.getScriptInfo(fileName) && !this.host.fileExists(fileName)) return undefined;

            const originalFileInfo: OriginalFileInfo = { fileName: toNormalizedPath(fileName), path: this.toPath(fileName) };
            const configFileName = this.getConfigFileNameForFile(originalFileInfo);
            if (!configFileName) return undefined;

            let configuredProject: ConfiguredProject | undefined = this.findConfiguredProjectByProjectName(configFileName) ||
                this.createAndLoadConfiguredProject(configFileName, `Creating project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`);
            updateProjectIfDirty(configuredProject);

            if (configuredProject.isSolution()) {
                // Find the project that is referenced from this solution that contains the script info directly
                configuredProject = forEachResolvedProjectReferenceProject(
                    configuredProject,
                    child => {
                        updateProjectIfDirty(child);
                        const info = this.getScriptInfo(fileName);
                        return info && projectContainsInfoDirectly(child, info) ? child : undefined;
                    },
                    ProjectReferenceProjectLoadKind.FindCreateLoad,
                    `Creating project referenced in solution ${configuredProject.projectName} to find possible configured project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`
                );
                if (!configuredProject) return undefined;
                if (configuredProject === project) return originalLocation;
            }

            // Keep this configured project as referenced from project
            addOriginalConfiguredProject(configuredProject);

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
                if (!project.originalConfiguredProjects) {
                    project.originalConfiguredProjects = new Set();
                }
                project.originalConfiguredProjects.add(originalProject.canonicalConfigFilePath);
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

        private getOrCreateOpenScriptInfo(fileName: NormalizedPath, fileContent: string | undefined, scriptKind: ScriptKind | undefined, hasMixedContent: boolean | undefined, projectRootPath: NormalizedPath | undefined) {
            const info = this.getOrCreateScriptInfoOpenedByClientForNormalizedPath(fileName, projectRootPath ? this.getNormalizedAbsolutePath(projectRootPath) : this.currentDirectory, fileContent, scriptKind, hasMixedContent)!; // TODO: GH#18217
            this.openFiles.set(info.path, projectRootPath);
            return info;
        }

        private assignProjectToOpenedScriptInfo(info: ScriptInfo): AssignProjectResult {
            let configFileName: NormalizedPath | undefined;
            let configFileErrors: readonly Diagnostic[] | undefined;
            let project: ConfiguredProject | ExternalProject | undefined = this.findExternalProjectContainingOpenScriptInfo(info);
            let defaultConfigProject: ConfiguredProject | undefined;
            let retainProjects: ConfiguredProject[] | ConfiguredProject | undefined;
            if (!project && !this.syntaxOnly) { // Checking syntaxOnly is an optimization
                configFileName = this.getConfigFileNameForFile(info);
                if (configFileName) {
                    project = this.findConfiguredProjectByProjectName(configFileName);
                    if (!project) {
                        project = this.createLoadAndUpdateConfiguredProject(configFileName, `Creating possible configured project for ${info.fileName} to open`);
                        // Send the event only if the project got created as part of this open request and info is part of the project
                        if (!project.containsScriptInfo(info)) {
                            // Since the file isnt part of configured project, do not send config file info
                            configFileName = undefined;
                        }
                        else {
                            configFileErrors = project.getAllProjectErrors();
                            this.sendConfigFileDiagEvent(project, info.fileName);
                        }
                    }
                    else {
                        // Ensure project is ready to check if it contains opened script info
                        updateProjectIfDirty(project);
                    }

                    defaultConfigProject = project;
                    retainProjects = defaultConfigProject;

                    // If this configured project doesnt contain script info but
                    // it is solution with project references, try those project references
                    if (!project.containsScriptInfo(info) && project.isSolution()) {
                        forEachResolvedProjectReferenceProject(
                            project,
                            (child, childConfigFileName) => {
                                updateProjectIfDirty(child);
                                // Retain these projects
                                if (!isArray(retainProjects)) {
                                    retainProjects = [project as ConfiguredProject, child];
                                }
                                else {
                                    retainProjects.push(child);
                                }

                                // If script info belongs to this child project, use this as default config project
                                if (projectContainsInfoDirectly(child, info)) {
                                    configFileName = childConfigFileName;
                                    configFileErrors = child.getAllProjectErrors();
                                    this.sendConfigFileDiagEvent(child, info.fileName);
                                    return child;
                                }
                            },
                            ProjectReferenceProjectLoadKind.FindCreateLoad,
                            `Creating project referenced in solution ${project.projectName} to find possible configured project for ${info.fileName} to open`
                        );
                    }
                    else {
                        // Create ancestor configured project
                        this.createAncestorProjects(info, defaultConfigProject || project);
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
                // Even though this info did not belong to any of the configured projects, send the config file diag
                if (isArray(retainProjects)) {
                    retainProjects.forEach(project => this.sendConfigFileDiagEvent(project, info.fileName));
                }
                else if (retainProjects) {
                    this.sendConfigFileDiagEvent(retainProjects, info.fileName);
                }
                Debug.assert(this.openFiles.has(info.path));
                this.assignOrphanScriptInfoToInferredProject(info, this.openFiles.get(info.path));
            }
            Debug.assert(!info.isOrphan());
            return { configFileName, configFileErrors, retainProjects };
        }

        private createAncestorProjects(info: ScriptInfo, project: ConfiguredProject) {
            // Skip if info is not part of default configured project
            if (!info.isAttached(project)) return;

            // Create configured project till project root
            while (true) {
                // Skip if project is not composite
                if (!project.isInitialLoadPending() &&
                    (
                        !project.getCompilerOptions().composite ||
                        project.getCompilerOptions().disableSolutionSearching
                    )
                ) return;

                // Get config file name
                const configFileName = this.getConfigFileNameForFile({
                    fileName: project.getConfigFilePath(),
                    path: info.path,
                    configFileInfo: true
                });
                if (!configFileName) return;

                // find or delay load the project
                const ancestor = this.findConfiguredProjectByProjectName(configFileName) ||
                    this.createConfiguredProjectWithDelayLoad(configFileName, `Creating project possibly referencing default composite project ${project.getProjectName()} of open file ${info.fileName}`);
                if (ancestor.isInitialLoadPending()) {
                    // Set a potential project reference
                    ancestor.setPotentialProjectReference(project.canonicalConfigFilePath);
                }
                project = ancestor;
            }
        }

        /*@internal*/
        loadAncestorProjectTree(forProjects?: ReadonlyCollection<string>) {
            forProjects = forProjects || mapDefinedEntries(
                this.configuredProjects,
                (key, project) => !project.isInitialLoadPending() ? [key, true] : undefined
            );

            const seenProjects = new Set<NormalizedPath>();
            // Work on array copy as we could add more projects as part of callback
            for (const project of arrayFrom(this.configuredProjects.values())) {
                // If this project has potential project reference for any of the project we are loading ancestor tree for
                // we need to load this project tree
                if (forEachPotentialProjectReference(
                    project,
                    potentialRefPath => forProjects!.has(potentialRefPath)
                ) || (project.isSolution() && forEachResolvedProjectReference(
                    project,
                    (_ref, resolvedPath) => forProjects!.has(resolvedPath)
                ))) {
                    // Load children
                    this.ensureProjectChildren(project, seenProjects);
                }
            }
        }

        private ensureProjectChildren(project: ConfiguredProject, seenProjects: Set<NormalizedPath>) {
            if (!tryAddToSet(seenProjects, project.canonicalConfigFilePath)) return;
            // Update the project
            updateProjectIfDirty(project);

            // Create tree because project is uptodate we only care of resolved references
            forEachResolvedProjectReferenceProject(
                project,
                child => this.ensureProjectChildren(child, seenProjects),
                ProjectReferenceProjectLoadKind.FindCreateLoad,
                `Creating project for reference of project: ${project.projectName}`
            );
        }

        private cleanupAfterOpeningFile(toRetainConfigProjects: readonly ConfiguredProject[] | ConfiguredProject | undefined) {
            // This was postponed from closeOpenFile to after opening next file,
            // so that we can reuse the project if we need to right away
            this.removeOrphanConfiguredProjects(toRetainConfigProjects);

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

        openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult {
            const info = this.getOrCreateOpenScriptInfo(fileName, fileContent, scriptKind, hasMixedContent, projectRootPath);
            const { retainProjects, ...result } = this.assignProjectToOpenedScriptInfo(info);
            this.cleanupAfterOpeningFile(retainProjects);
            this.telemetryOnOpenFile(info);
            this.printProjects();
            return result;
        }

        private removeOrphanConfiguredProjects(toRetainConfiguredProjects: readonly ConfiguredProject[] | ConfiguredProject | undefined) {
            const toRemoveConfiguredProjects = new Map(this.configuredProjects);
            const markOriginalProjectsAsUsed = (project: Project) => {
                if (!project.isOrphan() && project.originalConfiguredProjects) {
                    project.originalConfiguredProjects.forEach(
                        (_value, configuredProjectPath) => {
                            const project = this.getConfiguredProjectByCanonicalConfigFilePath(configuredProjectPath);
                            return project && retainConfiguredProject(project);
                        }
                    );
                }
            };
            if (toRetainConfiguredProjects) {
                if (isArray(toRetainConfiguredProjects)) {
                    toRetainConfiguredProjects.forEach(retainConfiguredProject);
                }
                else {
                    retainConfiguredProject(toRetainConfiguredProjects);
                }
            }

            // Do not remove configured projects that are used as original projects of other
            this.inferredProjects.forEach(markOriginalProjectsAsUsed);
            this.externalProjects.forEach(markOriginalProjectsAsUsed);
            this.configuredProjects.forEach(project => {
                // If project has open ref (there are more than zero references from external project/open file), keep it alive as well as any project it references
                if (project.hasOpenRef()) {
                    retainConfiguredProject(project);
                }
                else if (toRemoveConfiguredProjects.has(project.canonicalConfigFilePath)) {
                    // If the configured project for project reference has more than zero references, keep it alive
                    forEachReferencedProject(
                        project,
                        ref => isRetained(ref) && retainConfiguredProject(project)
                    );
                }
            });

            // Remove all the non marked projects
            toRemoveConfiguredProjects.forEach(project => this.removeProject(project));

            function isRetained(project: ConfiguredProject) {
                return project.hasOpenRef() || !toRemoveConfiguredProjects.has(project.canonicalConfigFilePath);
            }

            function retainConfiguredProject(project: ConfiguredProject) {
                if (toRemoveConfiguredProjects.delete(project.canonicalConfigFilePath)) {
                    // Keep original projects used
                    markOriginalProjectsAsUsed(project);
                    // Keep all the references alive
                    forEachReferencedProject(project, retainConfiguredProject);
                }
            }
        }

        private removeOrphanScriptInfos() {
            const toRemoveScriptInfos = new Map(this.filenameToScriptInfo);
            this.filenameToScriptInfo.forEach(info => {
                // If script info is open or orphan, retain it and its dependencies
                if (!info.isScriptOpen() && info.isOrphan() && !info.isContainedByAutoImportProvider()) {
                    // Otherwise if there is any source info that is alive, this alive too
                    if (!info.sourceMapFilePath) return;
                    let sourceInfos: Set<Path> | undefined;
                    if (isString(info.sourceMapFilePath)) {
                        const sourceMapInfo = this.getScriptInfoForPath(info.sourceMapFilePath);
                        sourceInfos = sourceMapInfo && sourceMapInfo.sourceInfos;
                    }
                    else {
                        sourceInfos = info.sourceMapFilePath.sourceInfos;
                    }
                    if (!sourceInfos) return;
                    if (!forEachKey(sourceInfos, path => {
                        const info = this.getScriptInfoForPath(path);
                        return !!info && (info.isScriptOpen() || !info.isOrphan());
                    })) {
                        return;
                    }
                }

                // Retain this script info
                toRemoveScriptInfos.delete(info.path);
                if (info.sourceMapFilePath) {
                    let sourceInfos: Set<Path> | undefined;
                    if (isString(info.sourceMapFilePath)) {
                        // And map file info and source infos
                        toRemoveScriptInfos.delete(info.sourceMapFilePath);
                        const sourceMapInfo = this.getScriptInfoForPath(info.sourceMapFilePath);
                        sourceInfos = sourceMapInfo && sourceMapInfo.sourceInfos;
                    }
                    else {
                        sourceInfos = info.sourceMapFilePath.sourceInfos;
                    }
                    if (sourceInfos) {
                        sourceInfos.forEach((_value, path) => toRemoveScriptInfos.delete(path));
                    }
                }
            });

            toRemoveScriptInfos.forEach(info => {
                // if there are not projects that include this script info - delete it
                this.stopWatchingScriptInfo(info);
                this.deleteScriptInfo(info);
                info.closeSourceMapFileWatcher();
            });
        }

        private telemetryOnOpenFile(scriptInfo: ScriptInfo): void {
            if (this.syntaxOnly || !this.eventHandler || !scriptInfo.isJavaScript() || !addToSeen(this.allJsFilesForOpenFileTelemetry, scriptInfo.path)) {
                return;
            }

            const project = scriptInfo.getDefaultProject();
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
        /*@internal*/
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
            currentProjects: Project[],
            includeProjectReferenceRedirectInfo: boolean | undefined,
            result: ProjectFilesWithTSDiagnostics[]
            ): void {
            for (const proj of currentProjects) {
                const knownProject = find(lastKnownProjectVersions, p => p.projectName === proj.getProjectName());
                result.push(proj.getChangesSinceVersion(knownProject && knownProject.version, includeProjectReferenceRedirectInfo));
            }
        }

        /* @internal */
        synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[], includeProjectReferenceRedirectInfo?: boolean): ProjectFilesWithTSDiagnostics[] {
            const files: ProjectFilesWithTSDiagnostics[] = [];
            this.collectChanges(knownProjects, this.externalProjects, includeProjectReferenceRedirectInfo, files);
            this.collectChanges(knownProjects, arrayFrom(this.configuredProjects.values()), includeProjectReferenceRedirectInfo, files);
            this.collectChanges(knownProjects, this.inferredProjects, includeProjectReferenceRedirectInfo, files);
            return files;
        }

        /* @internal */
        applyChangesInOpenFiles(openFiles: Iterator<OpenFileArguments> | undefined, changedFiles?: Iterator<ChangeFileArguments>, closedFiles?: string[]): void {
            let openScriptInfos: ScriptInfo[] | undefined;
            let assignOrphanScriptInfosToInferredProject = false;
            if (openFiles) {
                while (true) {
                    const iterResult = openFiles.next();
                    if (iterResult.done) break;
                    const file = iterResult.value;
                    // Create script infos so we have the new content for all the open files before we do any updates to projects
                    const info = this.getOrCreateOpenScriptInfo(
                        toNormalizedPath(file.fileName),
                        file.content,
                        tryConvertScriptKindName(file.scriptKind!),
                        file.hasMixedContent,
                        file.projectRootPath ? toNormalizedPath(file.projectRootPath) : undefined
                    );
                    (openScriptInfos || (openScriptInfos = [])).push(info);
                }
            }

            if (changedFiles) {
                while (true) {
                    const iterResult = changedFiles.next();
                    if (iterResult.done) break;
                    const file = iterResult.value;
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
            let retainProjects: readonly ConfiguredProject[] | undefined;
            if (openScriptInfos) {
                retainProjects = flatMap(openScriptInfos, info => this.assignProjectToOpenedScriptInfo(info).retainProjects);
            }

            // While closing files there could be open files that needed assigning new inferred projects, do it now
            if (assignOrphanScriptInfosToInferredProject) {
                this.assignOrphanScriptInfosToInferredProject();
            }

            if (openScriptInfos) {
                // Cleanup projects
                this.cleanupAfterOpeningFile(retainProjects);
                // Telemetry
                openScriptInfos.forEach(info => this.telemetryOnOpenFile(info));
                this.printProjects();
            }
            else if (length(closedFiles)) {
                this.printProjects();
            }
        }

        /* @internal */
        applyChangesToFile(scriptInfo: ScriptInfo, changes: Iterator<TextChange>) {
            while (true) {
                const iterResult = changes.next();
                if (iterResult.done) break;
                const change = iterResult.value;
                scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
            }
        }

        private closeConfiguredProjectReferencedFromExternalProject(configFile: NormalizedPath) {
            const configuredProject = this.findConfiguredProjectByProjectName(configFile);
            if (configuredProject) {
                configuredProject.deleteExternalProjectReference();
                if (!configuredProject.hasOpenRef()) {
                    this.removeProject(configuredProject);
                    return;
                }
            }
        }

        closeExternalProject(uncheckedFileName: string): void {
            const fileName = toNormalizedPath(uncheckedFileName);
            const configFiles = this.externalProjectToConfiguredProjectMap.get(fileName);
            if (configFiles) {
                for (const configFile of configFiles) {
                    this.closeConfiguredProjectReferencedFromExternalProject(configFile);
                }
                this.externalProjectToConfiguredProjectMap.delete(fileName);
            }
            else {
                // close external project
                const externalProject = this.findExternalProjectByProjectName(uncheckedFileName);
                if (externalProject) {
                    this.removeProject(externalProject);
                }
            }
        }

        openExternalProjects(projects: protocol.ExternalProject[]): void {
            // record project list before the update
            const projectsToClose = arrayToMap(this.externalProjects, p => p.getProjectName(), _ => true);
            forEachKey(this.externalProjectToConfiguredProjectMap, externalProjectName => {
                projectsToClose.set(externalProjectName, true);
            });

            for (const externalProject of projects) {
                this.openExternalProject(externalProject);
                // delete project that is present in input list
                projectsToClose.delete(externalProject.projectFileName);
            }

            // close projects that were missing in the input list
            forEachKey(projectsToClose, externalProjectName => {
                this.closeExternalProject(externalProjectName);
            });
        }

        /** Makes a filename safe to insert in a RegExp */
        private static readonly filenameEscapeRegexp = /[-\/\\^$*+?.()|[\]{}]/g;
        private static escapeFilenameForRegex(filename: string) {
            return filename.replace(this.filenameEscapeRegexp, "\\$&");
        }

        resetSafeList(): void {
            this.safelist = defaultTypeSafeList;
        }

        applySafeList(proj: protocol.ExternalProject): NormalizedPath[] {
            const { rootFiles } = proj;
            const typeAcquisition = proj.typeAcquisition!;
            Debug.assert(!!typeAcquisition, "proj.typeAcquisition should be set by now");
            // If type acquisition has been explicitly disabled, do not exclude anything from the project
            if (typeAcquisition.enable === false) {
                return [];
            }

            const typeAcqInclude = typeAcquisition.include || (typeAcquisition.include = []);
            const excludeRules: string[] = [];

            const normalizedNames = rootFiles.map(f => normalizeSlashes(f.fileName)) as NormalizedPath[];
            const excludedFiles: NormalizedPath[] = [];

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
                                if (typeAcqInclude.indexOf(type) < 0) {
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

                                if (excludeRules.indexOf(processedRule) === -1) {
                                    excludeRules.push(processedRule);
                                }
                            }
                        }
                        else {
                            // If not rules listed, add the default rule to exclude the matched file
                            const escaped = ProjectService.escapeFilenameForRegex(root);
                            if (excludeRules.indexOf(escaped) < 0) {
                                excludeRules.push(escaped);
                            }
                        }
                    }
                }
            }

            const excludeRegexes = excludeRules.map(e => new RegExp(e, "i"));
            const filesToKeep: protocol.ExternalFile[] = [];
            for (let i = 0; i < proj.rootFiles.length; i++) {
                if (excludeRegexes.some(re => re.test(normalizedNames[i]))) {
                    excludedFiles.push(normalizedNames[i]);
                }
                else {
                    let exclude = false;
                    if (typeAcquisition.enable || typeAcquisition.enableAutoDiscovery) {
                        const baseName = getBaseFileName(toFileNameLowerCase(normalizedNames[i]));
                        if (fileExtensionIs(baseName, "js")) {
                            const inferredTypingName = removeFileExtension(baseName);
                            const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
                            const typeName = this.legacySafelist.get(cleanedTypingName);
                            if (typeName !== undefined) {
                                this.logger.info(`Excluded '${normalizedNames[i]}' because it matched ${cleanedTypingName} from the legacy safelist`);
                                excludedFiles.push(normalizedNames[i]);
                                // *exclude* it from the project...
                                exclude = true;
                                // ... but *include* it in the list of types to acquire
                                // Same best-effort dedupe as above
                                if (typeAcqInclude.indexOf(typeName) < 0) {
                                    typeAcqInclude.push(typeName);
                                }
                            }
                        }
                    }
                    if (!exclude) {
                        // Exclude any minified files that get this far
                        if (/^.+[\.-]min\.js$/.test(normalizedNames[i])) {
                            excludedFiles.push(normalizedNames[i]);
                        }
                        else {
                            filesToKeep.push(proj.rootFiles[i]);
                        }
                    }
                }
            }
            proj.rootFiles = filesToKeep;
            return excludedFiles;
        }

        openExternalProject(proj: protocol.ExternalProject): void {
            // typingOptions has been deprecated and is only supported for backward compatibility
            // purposes. It should be removed in future releases - use typeAcquisition instead.
            if (proj.typingOptions && !proj.typeAcquisition) {
                const typeAcquisition = convertEnableAutoDiscoveryToEnable(proj.typingOptions);
                proj.typeAcquisition = typeAcquisition;
            }
            proj.typeAcquisition = proj.typeAcquisition || {};
            proj.typeAcquisition.include = proj.typeAcquisition.include || [];
            proj.typeAcquisition.exclude = proj.typeAcquisition.exclude || [];
            if (proj.typeAcquisition.enable === undefined) {
                proj.typeAcquisition.enable = hasNoTypeScriptSource(proj.rootFiles.map(f => f.fileName));
            }

            const excludedFiles = this.applySafeList(proj);

            let tsConfigFiles: NormalizedPath[] | undefined;
            const rootFiles: protocol.ExternalFile[] = [];
            for (const file of proj.rootFiles) {
                const normalized = toNormalizedPath(file.fileName);
                if (getBaseConfigFileName(normalized)) {
                    if (!this.syntaxOnly && this.host.fileExists(normalized)) {
                        (tsConfigFiles || (tsConfigFiles = [])).push(normalized);
                    }
                }
                else {
                    rootFiles.push(file);
                }
            }

            // sort config files to simplify comparison later
            if (tsConfigFiles) {
                tsConfigFiles.sort();
            }

            const externalProject = this.findExternalProjectByProjectName(proj.projectFileName);
            let exisingConfigFiles: string[] | undefined;
            if (externalProject) {
                externalProject.excludedFiles = excludedFiles;
                if (!tsConfigFiles) {
                    const compilerOptions = convertCompilerOptions(proj.options);
                    const watchOptions = convertWatchOptions(proj.options);
                    const lastFileExceededProgramSize = this.getFilenameForExceededTotalSizeLimitForNonTsFiles(proj.projectFileName, compilerOptions, proj.rootFiles, externalFilePropertyReader);
                    if (lastFileExceededProgramSize) {
                        externalProject.disableLanguageService(lastFileExceededProgramSize);
                    }
                    else {
                        externalProject.enableLanguageService();
                    }
                    // external project already exists and not config files were added - update the project and return;
                    // The graph update here isnt postponed since any file open operation needs all updated external projects
                    this.updateRootAndOptionsOfNonInferredProject(externalProject, proj.rootFiles, externalFilePropertyReader, compilerOptions, proj.typeAcquisition, proj.options.compileOnSave, watchOptions);
                    externalProject.updateGraph();
                    return;
                }
                // some config files were added to external project (that previously were not there)
                // close existing project and later we'll open a set of configured projects for these files
                this.closeExternalProject(proj.projectFileName);
            }
            else if (this.externalProjectToConfiguredProjectMap.get(proj.projectFileName)) {
                // this project used to include config files
                if (!tsConfigFiles) {
                    // config files were removed from the project - close existing external project which in turn will close configured projects
                    this.closeExternalProject(proj.projectFileName);
                }
                else {
                    // project previously had some config files - compare them with new set of files and close all configured projects that correspond to unused files
                    const oldConfigFiles = this.externalProjectToConfiguredProjectMap.get(proj.projectFileName)!;
                    let iNew = 0;
                    let iOld = 0;
                    while (iNew < tsConfigFiles.length && iOld < oldConfigFiles.length) {
                        const newConfig = tsConfigFiles[iNew];
                        const oldConfig = oldConfigFiles[iOld];
                        if (oldConfig < newConfig) {
                            this.closeConfiguredProjectReferencedFromExternalProject(oldConfig);
                            iOld++;
                        }
                        else if (oldConfig > newConfig) {
                            iNew++;
                        }
                        else {
                            // record existing config files so avoid extra add-refs
                            (exisingConfigFiles || (exisingConfigFiles = [])).push(oldConfig);
                            iOld++;
                            iNew++;
                        }
                    }
                    for (let i = iOld; i < oldConfigFiles.length; i++) {
                        // projects for all remaining old config files should be closed
                        this.closeConfiguredProjectReferencedFromExternalProject(oldConfigFiles[i]);
                    }
                }
            }
            if (tsConfigFiles) {
                // store the list of tsconfig files that belong to the external project
                this.externalProjectToConfiguredProjectMap.set(proj.projectFileName, tsConfigFiles);
                for (const tsconfigFile of tsConfigFiles) {
                    let project = this.findConfiguredProjectByProjectName(tsconfigFile);
                    if (!project) {
                        // errors are stored in the project, do not need to update the graph
                        project = this.getHostPreferences().lazyConfiguredProjectsFromExternalProject ?
                            this.createConfiguredProjectWithDelayLoad(tsconfigFile, `Creating configured project in external project: ${proj.projectFileName}`) :
                            this.createLoadAndUpdateConfiguredProject(tsconfigFile, `Creating configured project in external project: ${proj.projectFileName}`);
                    }
                    if (project && !contains(exisingConfigFiles, tsconfigFile)) {
                        // keep project alive even if no documents are opened - its lifetime is bound to the lifetime of containing external project
                        project.addExternalProjectReference();
                    }
                }
            }
            else {
                // no config files - remove the item from the collection
                // Create external project and update its graph, do not delay update since
                // any file open operation needs all updated external projects
                this.externalProjectToConfiguredProjectMap.delete(proj.projectFileName);
                const project = this.createExternalProject(proj.projectFileName, rootFiles, proj.options, proj.typeAcquisition, excludedFiles);
                project.updateGraph();
            }
        }

        hasDeferredExtension() {
            for (const extension of this.hostConfiguration.extraFileExtensions!) { // TODO: GH#18217
                if (extension.scriptKind === ScriptKind.Deferred) {
                    return true;
                }
            }

            return false;
        }

        configurePlugin(args: protocol.ConfigurePluginRequestArguments) {
            // For any projects that already have the plugin loaded, configure the plugin
            this.forEachEnabledProject(project => project.onPluginConfigurationChanged(args.pluginName, args.configuration));

            // Also save the current configuration to pass on to any projects that are yet to be loaded.
            // If a plugin is configured twice, only the latest configuration will be remembered.
            this.currentPluginConfigOverrides = this.currentPluginConfigOverrides || new Map();
            this.currentPluginConfigOverrides.set(args.pluginName, args.configuration);
        }

        /*@internal*/
        getPackageJsonsVisibleToFile(fileName: string, rootDir?: string): readonly PackageJsonInfo[] {
            const packageJsonCache = this.packageJsonCache;
            const watchPackageJsonFile = this.watchPackageJsonFile.bind(this);
            const toPath = this.toPath.bind(this);
            const rootPath = rootDir && toPath(rootDir);
            const filePath = toPath(fileName);
            const result: PackageJsonInfo[] = [];
            forEachAncestorDirectory(getDirectoryPath(filePath), function processDirectory(directory): boolean | undefined {
                switch (packageJsonCache.directoryHasPackageJson(directory)) {
                    // Sync and check same directory again
                    case Ternary.Maybe:
                        packageJsonCache.searchDirectoryAndAncestors(directory);
                        return processDirectory(directory);
                    // Check package.json
                    case Ternary.True:
                        const packageJsonFileName = combinePaths(directory, "package.json");
                        watchPackageJsonFile(packageJsonFileName);
                        const info = packageJsonCache.getInDirectory(directory);
                        if (info) result.push(info);
                }
                if (rootPath && rootPath === toPath(directory)) {
                    return true;
                }
            });

            return result;
        }

        /*@internal*/
        private watchPackageJsonFile(path: Path) {
            const watchers = this.packageJsonFilesMap || (this.packageJsonFilesMap = new Map());
            if (!watchers.has(path)) {
                this.invalidateProjectAutoImports(path);
                watchers.set(path, this.watchFactory.watchFile(
                    this.host,
                    path,
                    (fileName, eventKind) => {
                        const path = this.toPath(fileName);
                        switch (eventKind) {
                            case FileWatcherEventKind.Created:
                                return Debug.fail();
                            case FileWatcherEventKind.Changed:
                                this.packageJsonCache.addOrUpdate(path);
                                this.invalidateProjectAutoImports(path);
                                break;
                            case FileWatcherEventKind.Deleted:
                                this.packageJsonCache.delete(path);
                                this.invalidateProjectAutoImports(path);
                                watchers.get(path)!.close();
                                watchers.delete(path);
                        }
                    },
                    PollingInterval.Low,
                    this.hostConfiguration.watchOptions,
                    WatchType.PackageJsonFile,
                ));
            }
        }

        /*@internal*/
        private onAddPackageJson(path: Path) {
            this.packageJsonCache.addOrUpdate(path);
            this.watchPackageJsonFile(path);
        }

        /*@internal*/
        includePackageJsonAutoImports(): PackageJsonAutoImportPreference {
            switch (this.hostConfiguration.preferences.includePackageJsonAutoImports) {
                case "none": return PackageJsonAutoImportPreference.None;
                case "all": return PackageJsonAutoImportPreference.All;
                default: return PackageJsonAutoImportPreference.ExcludeDevDependencies;
            }
        }

        /*@internal*/
        private invalidateProjectAutoImports(packageJsonPath: Path | undefined) {
            if (this.includePackageJsonAutoImports()) {
                this.configuredProjects.forEach(invalidate);
                this.inferredProjects.forEach(invalidate);
                this.externalProjects.forEach(invalidate);
            }
            function invalidate(project: Project) {
                if (!packageJsonPath || project.packageJsonsForAutoImport?.has(packageJsonPath)) {
                    project.markAutoImportProviderAsDirty();
                }
            }
        }
    }

    /* @internal */
    export type ScriptInfoOrConfig = ScriptInfo | TsConfigSourceFile;
    /* @internal */
    export function isConfigFile(config: ScriptInfoOrConfig): config is TsConfigSourceFile {
        return (config as TsConfigSourceFile).kind !== undefined;
    }

    function printProjectWithoutFileNames(project: Project) {
        project.print(/*writeProjectFileNames*/ false);
    }
}

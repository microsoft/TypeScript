/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="session.ts" />
/// <reference path="scriptVersionCache.ts"/>
/// <reference path="lsHost.ts"/>
/// <reference path="project.ts"/>
/// <reference path="typingsCache.ts"/>

namespace ts.server {
    export const maxProgramSizeForNonTsFiles = 20 * 1024 * 1024;

    export const ContextEvent = "context";
    export const ConfigFileDiagEvent = "configFileDiag";
    export const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
    export const ProjectInfoTelemetryEvent = "projectInfo";

    export interface ContextEvent {
        eventName: typeof ContextEvent;
        data: { project: Project; fileName: NormalizedPath };
    }

    export interface ConfigFileDiagEvent {
        eventName: typeof ConfigFileDiagEvent;
        data: { triggerFile: string, configFileName: string, diagnostics: ReadonlyArray<Diagnostic> };
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

    export interface ProjectInfoTypeAcquisitionData {
        readonly enable: boolean;
        // Actual values of include/exclude entries are scrubbed.
        readonly include: boolean;
        readonly exclude: boolean;
    }

    export interface FileStats {
        readonly js: number;
        readonly jsx: number;
        readonly ts: number;
        readonly tsx: number;
        readonly dts: number;
    }

    export type ProjectServiceEvent = ContextEvent | ConfigFileDiagEvent | ProjectLanguageServiceStateEvent | ProjectInfoTelemetryEvent;

    export interface ProjectServiceEventHandler {
        (event: ProjectServiceEvent): void;
    }

    export interface SafeList {
        [name: string]: { match: RegExp, exclude?: Array<Array<string | number>>, types?: string[] };
    }

    function prepareConvertersForEnumLikeCompilerOptions(commandLineOptions: CommandLineOption[]): Map<Map<number>> {
        const map: Map<Map<number>> = createMap<Map<number>>();
        for (const option of commandLineOptions) {
            if (typeof option.type === "object") {
                const optionMap = <Map<number>>option.type;
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
    const indentStyle = createMapFromTemplate({
        "none": IndentStyle.None,
        "block": IndentStyle.Block,
        "smart": IndentStyle.Smart
    });

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
            "match": /jquery(-(\.?\d+)+)?(\.intellisense)?(\.min)?\.js$/i,
            "types": ["jquery"]
        },
        "WinJS": {
            // e.g. c:/temp/UWApp1/lib/winjs-4.0.1/js/base.js
            "match": /^(.*\/winjs-[.\d]+)\/js\/base\.js$/i,        // If the winjs/base.js file is found..
            "exclude": [["^", 1, "/.*"]],                // ..then exclude all files under the winjs folder
            "types": ["winjs"]                           // And fetch the @types package for WinJS
        },
        "Kendo": {
            // e.g. /Kendo3/wwwroot/lib/kendo/kendo.all.min.js
            "match": /^(.*\/kendo)\/kendo\.all\.min\.js$/i,
            "exclude": [["^", 1, "/.*"]],
            "types": ["kendo-ui"]
        },
        "Office Nuget": {
            // e.g. /scripts/Office/1/excel-15.debug.js
            "match": /^(.*\/office\/1)\/excel-\d+\.debug\.js$/i, // Office NuGet package is installed under a "1/office" folder
            "exclude": [["^", 1, "/.*"]],                     // Exclude that whole folder if the file indicated above is found in it
            "types": ["office"]                               // @types package to fetch instead
        },
        "Minified files": {
            // e.g. /whatever/blah.min.js
            "match": /^(.+\.min\.js)$/i,
            "exclude": [["^", 1, "$"]]
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

    /**
     * This helper function processes a list of projects and return the concatenated, sortd and deduplicated output of processing each project.
     */
    export function combineProjectOutput<T>(projects: ReadonlyArray<Project>, action: (project: Project) => ReadonlyArray<T>, comparer?: (a: T, b: T) => number, areEqual?: (a: T, b: T) => boolean) {
        const result = flatMap(projects, action).sort(comparer);
        return projects.length > 1 ? deduplicate(result, areEqual) : result;
    }

    export interface HostConfiguration {
        formatCodeOptions: FormatCodeSettings;
        hostInfo: string;
        extraFileExtensions?: JsFileExtensionInfo[];
    }

    export interface OpenConfiguredProjectResult {
        configFileName?: NormalizedPath;
        configFileErrors?: ReadonlyArray<Diagnostic>;
    }

    interface FilePropertyReader<T> {
        getFileName(f: T): string;
        getScriptKind(f: T): ScriptKind;
        hasMixedContent(f: T, extraFileExtensions: JsFileExtensionInfo[]): boolean;
    }

    const fileNamePropertyReader: FilePropertyReader<string> = {
        getFileName: x => x,
        getScriptKind: _ => undefined,
        hasMixedContent: (fileName, extraFileExtensions) => some(extraFileExtensions, ext => ext.isMixedContent && fileExtensionIs(fileName, ext.extension)),
    };

    const externalFilePropertyReader: FilePropertyReader<protocol.ExternalFile> = {
        getFileName: x => x.fileName,
        getScriptKind: x => tryConvertScriptKindName(x.scriptKind),
        hasMixedContent: x => x.hasMixedContent
    };

    function findProjectByName<T extends Project>(projectName: string, projects: T[]): T {
        for (const proj of projects) {
            if (proj.getProjectName() === projectName) {
                return proj;
            }
        }
    }

    /* @internal */
    export const enum WatchType {
        ConfigFilePath = "Config file for the program",
        MissingFilePath = "Missing file from program",
        WildcardDirectories = "Wild card directory",
        TypeRoot = "Type root of the project",
        ClosedScriptInfo = "Closed Script info",
        ConfigFileForInferredRoot = "Config file for the inferred project root",
        FailedLookupLocation = "Failed lookup locations in module resolution"
    }

    /* @internal */
    export const enum WatcherCloseReason {
        ProjectClose = "Project close",
        NotNeeded = "After project update isnt required any more",
        FileCreated = "File got created",
        RecursiveChanged = "Recursive changed for the watch",
        ProjectReloadHitMaxSize = "Project reloaded and hit the max file size capacity",
        OrphanScriptInfoWithChange = "Orphan script info, Detected change in file thats not needed any more",
        OrphanScriptInfo = "Removing Orphan script info as part of cleanup",
        FileDeleted = "File was deleted",
        FileOpened = "File opened",
        ConfigProjectCreated = "Config file project created",
        FileClosed = "File is closed"
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

    /* @internal */
    export type ServerDirectoryWatcherCallback = (path: NormalizedPath) => void;

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
         * It is false when the open file that would still be impacted by existance of
         *   this config file but it is not the root of inferred project
         */
        openFilesImpactedByConfigFile: Map<boolean>;
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
        throttleWaitMilliseconds?: number;
        globalPlugins?: ReadonlyArray<string>;
        pluginProbeLocations?: ReadonlyArray<string>;
        allowLocalPluginLoads?: boolean;
    }

    export class ProjectService {

        public readonly typingsCache: TypingsCache;

        private readonly documentRegistry: DocumentRegistry;

        /**
         * Container of all known scripts
         */
        private readonly filenameToScriptInfo = createMap<ScriptInfo>();
        /**
         * maps external project file name to list of config files that were the part of this project
         */
        private readonly externalProjectToConfiguredProjectMap: Map<NormalizedPath[]> = createMap<NormalizedPath[]>();

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
        readonly configuredProjects = createMap<ConfiguredProject>();
        /**
         * list of open files
         */
        readonly openFiles: ScriptInfo[] = [];

        private compilerOptionsForInferredProjects: CompilerOptions;
        private compilerOptionsForInferredProjectsPerProjectRoot = createMap<CompilerOptions>();
        /**
         * Project size for configured or external projects
         */
        private readonly projectToSizeMap: Map<number> = createMap<number>();
        /**
         * This is a map of config file paths existance that doesnt need query to disk
         * - The entry can be present because there is inferred project that needs to watch addition of config file to folder
         *   In this case the exists could be true/false based on config file is present or not
         * - Or it is present if we have configured project open with config file at that location
         *   In this case the exists property is always true
         */
        private readonly configFileExistenceInfoCache = createMap<ConfigFileExistenceInfo>();
        private readonly throttledOperations: ThrottledOperations;

        private readonly hostConfiguration: HostConfiguration;
        private safelist: SafeList = defaultTypeSafeList;

        private changedFiles: ScriptInfo[];
        private pendingProjectUpdates = createMap<Project>();
        private pendingInferredProjectUpdate: boolean;

        readonly currentDirectory: string;
        readonly toCanonicalFileName: (f: string) => string;

        public readonly host: ServerHost;
        public readonly logger: Logger;
        public readonly cancellationToken: HostCancellationToken;
        public readonly useSingleInferredProject: boolean;
        public readonly useInferredProjectPerProjectRoot: boolean;
        public readonly typingsInstaller: ITypingsInstaller;
        public readonly throttleWaitMilliseconds?: number;
        private readonly eventHandler?: ProjectServiceEventHandler;

        public readonly globalPlugins: ReadonlyArray<string>;
        public readonly pluginProbeLocations: ReadonlyArray<string>;
        public readonly allowLocalPluginLoads: boolean;

        /** Tracks projects that we have already sent telemetry for. */
        private readonly seenProjects = createMap<true>();

        constructor(opts: ProjectServiceOptions) {
            this.host = opts.host;
            this.logger = opts.logger;
            this.cancellationToken = opts.cancellationToken;
            this.useSingleInferredProject = opts.useSingleInferredProject;
            this.useInferredProjectPerProjectRoot = opts.useInferredProjectPerProjectRoot;
            this.typingsInstaller = opts.typingsInstaller || nullTypingsInstaller;
            this.throttleWaitMilliseconds = opts.throttleWaitMilliseconds;
            this.eventHandler = opts.eventHandler;
            this.globalPlugins = opts.globalPlugins || emptyArray;
            this.pluginProbeLocations = opts.pluginProbeLocations || emptyArray;
            this.allowLocalPluginLoads = !!opts.allowLocalPluginLoads;

            Debug.assert(!!this.host.createHash, "'ServerHost.createHash' is required for ProjectService");

            this.currentDirectory = this.host.getCurrentDirectory();
            this.toCanonicalFileName = createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);
            this.throttledOperations = new ThrottledOperations(this.host);

            this.typingsInstaller.attach(this);

            this.typingsCache = new TypingsCache(this.typingsInstaller);

            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeSettings(this.host),
                hostInfo: "Unknown host",
                extraFileExtensions: []
            };

            this.documentRegistry = createDocumentRegistry(this.host.useCaseSensitiveFileNames, this.currentDirectory);
        }

        toPath(fileName: string, basePath = this.currentDirectory) {
            return toPath(fileName, basePath, this.toCanonicalFileName);
        }

        /* @internal */
        getChangedFiles_TestOnly() {
            return this.changedFiles;
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

        updateTypingsForProject(response: SetTypings | InvalidateCachedTypings): void {
            const project = this.findProject(response.projectName);
            if (!project) {
                return;
            }
            switch (response.kind) {
                case ActionSet:
                    this.typingsCache.updateTypingsForProject(response.projectName, response.compilerOptions, response.typeAcquisition, response.unresolvedImports, response.typings);
                    break;
                case ActionInvalidate:
                    this.typingsCache.deleteTypingsForProject(response.projectName);
                    break;
            }
            project.markAsDirty();
            this.delayUpdateProjectGraphAndInferredProjectsRefresh(project);
        }

        private delayInferredProjectsRefresh() {
            this.pendingInferredProjectUpdate = true;
            this.throttledOperations.schedule("*refreshInferredProjects*", /*delay*/ 250, () => {
                if (this.pendingProjectUpdates.size !== 0) {
                    this.delayInferredProjectsRefresh();
                }
                else if (this.pendingInferredProjectUpdate) {
                    this.pendingInferredProjectUpdate = false;
                    this.refreshInferredProjects();
                }
            });
        }

        private delayUpdateProjectGraph(project: Project) {
            const projectName = project.getProjectName();
            this.pendingProjectUpdates.set(projectName, project);
            this.throttledOperations.schedule(projectName, /*delay*/ 250, () => {
                if (this.pendingProjectUpdates.delete(projectName)) {
                    project.updateGraph();
                }
            });
        }

        /* @internal */
        delayUpdateProjectGraphAndInferredProjectsRefresh(project: Project) {
            this.delayUpdateProjectGraph(project);
            this.delayInferredProjectsRefresh();
        }

        private delayUpdateProjectGraphs(projects: Project[]) {
            for (const project of projects) {
                this.delayUpdateProjectGraph(project);
            }
            this.delayInferredProjectsRefresh();
        }

        setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.ExternalProjectCompilerOptions, projectRootPath?: string): void {
            Debug.assert(projectRootPath === undefined || this.useInferredProjectPerProjectRoot, "Setting compiler options per project root path is only supported when useInferredProjectPerProjectRoot is enabled");

            const compilerOptions = convertCompilerOptions(projectCompilerOptions);

            // always set 'allowNonTsExtensions' for inferred projects since user cannot configure it from the outside
            // previously we did not expose a way for user to change these settings and this option was enabled by default
            compilerOptions.allowNonTsExtensions = true;

            if (projectRootPath) {
                this.compilerOptionsForInferredProjectsPerProjectRoot.set(projectRootPath, compilerOptions);
            }
            else {
                this.compilerOptionsForInferredProjects = compilerOptions;
            }

            const projectsToUpdate: Project[] = [];
            for (const project of this.inferredProjects) {
                // Only update compiler options in the following cases:
                // - Inferred projects without a projectRootPath, if the new options do not apply to
                //   a workspace root
                // - Inferred projects with a projectRootPath, if the new options do not apply to a
                //   workspace root and there is no more specific set of options for that project's
                //   root path
                // - Inferred projects with a projectRootPath, if the new options apply to that
                //   project root path.
                if (projectRootPath ?
                        project.projectRootPath === projectRootPath :
                        !project.projectRootPath || !this.compilerOptionsForInferredProjectsPerProjectRoot.has(project.projectRootPath)) {
                    project.setCompilerOptions(compilerOptions);
                    project.compileOnSaveEnabled = compilerOptions.compileOnSave;
                    project.markAsDirty();
                    projectsToUpdate.push(project);
                }
            }

            this.delayUpdateProjectGraphs(projectsToUpdate);
        }

        findProject(projectName: string): Project | undefined {
            if (projectName === undefined) {
                return undefined;
            }
            if (isInferredProjectName(projectName)) {
                this.ensureProjectStructuresUptoDate();
                return findProjectByName(projectName, this.inferredProjects);
            }
            return this.findExternalProjectByProjectName(projectName) || this.findConfiguredProjectByProjectName(toNormalizedPath(projectName));
        }

        getDefaultProjectForFile(fileName: NormalizedPath, refreshInferredProjects: boolean) {
            if (refreshInferredProjects) {
                this.ensureProjectStructuresUptoDate();
            }
            const scriptInfo = this.getScriptInfoForNormalizedPath(fileName);
            return scriptInfo && !scriptInfo.isOrphan() && scriptInfo.getDefaultProject();
        }

        getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string) {
            this.ensureProjectStructuresUptoDate();
            return this.getScriptInfo(uncheckedFileName);
        }

        /**
         * Ensures the project structures are upto date
         * This means,
         * - if there are changedFiles (the files were updated but their containing project graph was not upto date),
         *   their project graph is updated
         * - If there are pendingProjectUpdates (scheduled to be updated with delay so they can batch update the graph if there are several changes in short time span)
         *   their project graph is updated
         * - If there were project graph updates and/or there was pending inferred project update and/or called forced the inferred project structure refresh
         *   Inferred projects are created/updated/deleted based on open files states
         * @param forceInferredProjectsRefresh when true updates the inferred projects even if there is no pending work to update the files/project structures
         */
        private ensureProjectStructuresUptoDate(forceInferredProjectsRefresh?: boolean) {
            if (this.changedFiles) {
                let projectsToUpdate: Project[];
                if (this.changedFiles.length === 1) {
                    // simpliest case - no allocations
                    projectsToUpdate = this.changedFiles[0].containingProjects;
                }
                else {
                    projectsToUpdate = [];
                    for (const f of this.changedFiles) {
                        addRange(projectsToUpdate, f.containingProjects);
                    }
                }
                this.changedFiles = undefined;
                this.updateProjectGraphs(projectsToUpdate);
            }

            if (this.pendingProjectUpdates.size !== 0) {
                const projectsToUpdate = arrayFrom(this.pendingProjectUpdates.values());
                this.pendingProjectUpdates.clear();
                this.updateProjectGraphs(projectsToUpdate);
            }

            if (this.pendingInferredProjectUpdate || forceInferredProjectsRefresh) {
                this.pendingInferredProjectUpdate = false;
                this.refreshInferredProjects();
            }
        }

        private findContainingExternalProject(fileName: NormalizedPath): ExternalProject {
            for (const proj of this.externalProjects) {
                if (proj.containsFile(fileName)) {
                    return proj;
                }
            }
            return undefined;
        }

        getFormatCodeOptions(file?: NormalizedPath) {
            let formatCodeSettings: FormatCodeSettings;
            if (file) {
                const info = this.getScriptInfoForNormalizedPath(file);
                if (info) {
                    formatCodeSettings = info.getFormatCodeSettings();
                }
            }
            return formatCodeSettings || this.hostConfiguration.formatCodeOptions;
        }

        private updateProjectGraphs(projects: Project[]) {
            for (const p of projects) {
                if (!p.updateGraph()) {
                    this.pendingInferredProjectUpdate = true;
                }
            }
        }

        private onSourceFileChanged(fileName: NormalizedPath, eventKind: FileWatcherEventKind) {
            const info = this.getScriptInfoForNormalizedPath(fileName);
            if (!info) {
                this.logger.msg(`Error: got watch notification for unknown file: ${fileName}`);
            }
            else if (eventKind === FileWatcherEventKind.Deleted) {
                // File was deleted
                this.handleDeletedFile(info);
            }
            else if (!info.isScriptOpen()) {
                if (info.containingProjects.length === 0) {
                    // Orphan script info, remove it as we can always reload it on next open file request
                    this.stopWatchingScriptInfo(info, WatcherCloseReason.OrphanScriptInfoWithChange);
                    this.filenameToScriptInfo.delete(info.path);
                }
                else {
                    // file has been changed which might affect the set of referenced files in projects that include
                    // this file and set of inferred projects
                    info.reloadFromFile();
                    this.delayUpdateProjectGraphs(info.containingProjects);
                }
            }
        }

        private handleDeletedFile(info: ScriptInfo) {
            this.stopWatchingScriptInfo(info, WatcherCloseReason.FileDeleted);

            // TODO: handle isOpen = true case

            if (!info.isScriptOpen()) {
                this.filenameToScriptInfo.delete(info.path);

                // capture list of projects since detachAllProjects will wipe out original list
                const containingProjects = info.containingProjects.slice();

                info.detachAllProjects();

                // update projects to make sure that set of referenced files is correct
                this.delayUpdateProjectGraphs(containingProjects);

                // TODO: (sheetalkamat) Someway to send this event so that error checks are updated?
                // if (!this.eventHandler) {
                //     return;
                // }

                // for (const openFile of this.openFiles) {
                //     const event: ContextEvent = {
                //         eventName: ContextEvent,
                //         data: { project: openFile.getDefaultProject(), fileName: openFile.fileName }
                //     };
                //     this.eventHandler(event);
                // }
            }
        }

        /* @internal  */
        onTypeRootFileChanged(project: ConfiguredProject, fileOrFolder: NormalizedPath) {
            project.getCachedServerHost().addOrDeleteFileOrFolder(fileOrFolder, this.toPath(fileOrFolder));
            project.updateTypes();
            this.delayUpdateProjectGraphAndInferredProjectsRefresh(project);
        }

        /**
         * This is the callback function when a watched directory has added or removed source code files.
         * @param project the project that associates with this directory watcher
         * @param fileName the absolute file name that changed in watched directory
         */
        /* @internal */
        onFileAddOrRemoveInWatchedDirectoryOfProject(project: ConfiguredProject, fileOrFolder: NormalizedPath) {
            project.getCachedServerHost().addOrDeleteFileOrFolder(fileOrFolder, this.toPath(fileOrFolder));
            const configFilename = project.getConfigFilePath();

            // If a change was made inside "folder/file", node will trigger the callback twice:
            // one with the fileName being "folder/file", and the other one with "folder".
            // We don't respond to the second one.
            if (fileOrFolder && !isSupportedSourceFileName(fileOrFolder, project.getCompilerOptions(), this.hostConfiguration.extraFileExtensions)) {
                this.logger.info(`Project: ${configFilename} Detected file add/remove of non supported extension: ${fileOrFolder}`);
                return;
            }

            const configFileSpecs = project.configFileSpecs;
            const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFilename), project.getCompilerOptions(), project.getCachedServerHost(), this.hostConfiguration.extraFileExtensions);
            project.updateErrorOnNoInputFiles(result.fileNames.length !== 0);
            this.updateNonInferredProjectFiles(project, result.fileNames, fileNamePropertyReader, /*clientFileName*/ undefined);
            this.delayUpdateProjectGraphAndInferredProjectsRefresh(project);
        }

        private onConfigChangedForConfiguredProject(project: ConfiguredProject, eventKind: FileWatcherEventKind) {
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath);
            if (eventKind === FileWatcherEventKind.Deleted) {
                // Update the cached status
                // We arent updating or removing the cached config file presence info as that will be taken care of by
                // setConfigFilePresenceByClosedConfigFile when the project is closed (depending on tracking open files)
                configFileExistenceInfo.exists = false;
                this.removeProject(project);

                // Reload the configured projects for the open files in the map as they are affectected by this config file
                // Since the configured project was deleted, we want to reload projects for all the open files including files
                // that are not root of the inferred project
                this.logConfigFileWatchUpdate(project.getConfigFilePath(), project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingFiles);
                this.delayReloadConfiguredProjectForFiles(configFileExistenceInfo, /*ignoreIfNotInferredProjectRoot*/ false);
            }
            else {
                this.logConfigFileWatchUpdate(project.getConfigFilePath(), project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingInferredRootFiles);
                project.pendingReload = true;
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
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigPath);
            configFileExistenceInfo.exists = (eventKind !== FileWatcherEventKind.Deleted);
            this.logConfigFileWatchUpdate(configFileName, canonicalConfigPath, configFileExistenceInfo, ConfigFileWatcherStatus.ReloadingFiles);

            // Because there is no configured project open for the config file, the tracking open files map
            // will only have open files that need the re-detection of the project and hence
            // reload projects for all the tracking open files in the map
            this.delayReloadConfiguredProjectForFiles(configFileExistenceInfo, /*ignoreIfNotInferredProjectRoot*/ false);
        }

        private removeProject(project: Project) {
            this.logger.info(`remove project: ${project.getRootFiles().toString()}`);

            project.close();
            // Remove the project from pending project updates
            this.pendingProjectUpdates.delete(project.getProjectName());

            switch (project.projectKind) {
                case ProjectKind.External:
                    unorderedRemoveItem(this.externalProjects, <ExternalProject>project);
                    this.projectToSizeMap.delete((project as ExternalProject).externalProjectName);
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
        assignOrphanScriptInfoToInferredProject(info: ScriptInfo, projectRootPath?: string) {
            Debug.assert(info.isOrphan());

            const project = this.getOrCreateInferredProjectForProjectRootPathIfEnabled(info, projectRootPath) ||
                this.getOrCreateSingleInferredProjectIfEnabled() ||
                this.createInferredProject();

            project.addRoot(info);
            project.updateGraph();

            if (!this.useSingleInferredProject && !project.projectRootPath) {
                // Note that we need to create a copy of the array since the list of project can change
                for (const inferredProject of this.inferredProjects.slice(0, this.inferredProjects.length - 1)) {
                    Debug.assert(inferredProject !== project);
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
                    if (roots.length === 1 && roots[0].containingProjects.length > 1) {
                        this.removeProject(inferredProject);
                    }
                }
            }

            return project;
        }

        private addToListOfOpenFiles(info: ScriptInfo) {
            Debug.assert(!info.isOrphan());
            for (const p of info.containingProjects) {
                // file is the part of configured project, addref the project
                if (p.projectKind === ProjectKind.Configured) {
                    ((<ConfiguredProject>p)).addOpenRef();
                }
            }

            this.openFiles.push(info);
        }

        /**
         * Remove this file from the set of open, non-configured files.
         * @param info The file that has been closed or newly configured
         */
        private closeOpenFile(info: ScriptInfo): void {
            // Closing file should trigger re-reading the file content from disk. This is
            // because the user may chose to discard the buffer content before saving
            // to the disk, and the server's version of the file can be out of sync.
            info.close();
            this.stopWatchingConfigFilesForClosedScriptInfo(info);

            unorderedRemoveItem(this.openFiles, info);

            // collect all projects that should be removed
            let projectsToRemove: Project[];
            for (const p of info.containingProjects) {
                if (p.projectKind === ProjectKind.Configured) {
                    if (info.hasMixedContent) {
                        info.registerFileUpdate();
                    }
                    // last open file in configured project - close it
                    if ((<ConfiguredProject>p).deleteOpenRef() === 0) {
                        (projectsToRemove || (projectsToRemove = [])).push(p);
                    }
                }
                else if (p.projectKind === ProjectKind.Inferred && p.isRoot(info)) {
                    // If this was the open root file of inferred project
                    if ((p as InferredProject).isProjectWithSingleRoot()) {
                        // - when useSingleInferredProject is not set, we can guarantee that this will be the only root
                        // - other wise remove the project if it is the only root
                        (projectsToRemove || (projectsToRemove = [])).push(p);
                    }
                    else {
                        p.removeFile(info);
                    }
                }

                if (!p.languageServiceEnabled) {
                    // if project language service is disabled then we create a program only for open files.
                    // this means that project should be marked as dirty to force rebuilding of the program
                    // on the next request
                    p.markAsDirty();
                }
            }
            if (projectsToRemove) {
                for (const project of projectsToRemove) {
                    this.removeProject(project);
                }

                // collect orphaned files and assign them to inferred project just like we treat open of a file
                for (const f of this.openFiles) {
                    if (f.isOrphan()) {
                        this.assignOrphanScriptInfoToInferredProject(f);
                    }
                }

                // Cleanup script infos that arent part of any project (eg. those could be closed script infos not referenced by any project)
                // is postponed to next file open so that if file from same project is opened,
                // we wont end up creating same script infos
            }

            // If the current info is being just closed - add the watcher file to track changes
            // But if file was deleted, handle that part
            if (this.host.fileExists(info.fileName)) {
                this.watchClosedScriptInfo(info);
            }
            else {
                this.handleDeletedFile(info);
            }
        }

        private deleteOrphanScriptInfoNotInAnyProject() {
            this.filenameToScriptInfo.forEach(info => {
                if (!info.isScriptOpen() && info.isOrphan()) {
                    // if there are not projects that include this script info - delete it
                    this.stopWatchingScriptInfo(info, WatcherCloseReason.OrphanScriptInfo);
                    this.filenameToScriptInfo.delete(info.path);
                }
            });
        }

        private configFileExists(configFileName: NormalizedPath, canonicalConfigFilePath: string, info: ScriptInfo) {
            let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (configFileExistenceInfo) {
                // By default the info would get impacted by presence of config file since its in the detection path
                // Only adding the info as a root to inferred project will need the existence to be watched by file watcher
                if (!configFileExistenceInfo.openFilesImpactedByConfigFile.has(info.path)) {
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
            const openFilesImpactedByConfigFile = createMap<boolean>();
            openFilesImpactedByConfigFile.set(info.path, false);
            const exists = this.host.fileExists(configFileName);
            configFileExistenceInfo = { exists, openFilesImpactedByConfigFile };
            this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo);
            this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.OpenFilesImpactedByConfigFileAdd);
            return exists;
        }

        private setConfigFileExistenceByNewConfiguredProject(project: ConfiguredProject) {
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath);
            if (configFileExistenceInfo) {
                Debug.assert(configFileExistenceInfo.exists);
                // close existing watcher
                if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject) {
                    const configFileName = project.getConfigFilePath();
                    this.closeFileWatcher(
                        WatchType.ConfigFileForInferredRoot, /*project*/ undefined, configFileName,
                        configFileExistenceInfo.configFileWatcherForRootOfInferredProject, WatcherCloseReason.ConfigProjectCreated
                    );
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject = undefined;
                    this.logConfigFileWatchUpdate(configFileName, project.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.UpdatedCallback);
                }
            }
            else {
                // We could be in this scenario if project is the configured project tracked by external project
                // Since that route doesnt check if the config file is present or not
                this.configFileExistenceInfoCache.set(project.canonicalConfigFilePath, {
                    exists: true,
                    openFilesImpactedByConfigFile: createMap<boolean>()
                });
            }
        }

        /**
         * Returns true if the configFileExistenceInfo is needed/impacted by open files that are root of inferred project
         */
        private configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo: ConfigFileExistenceInfo) {
            return forEachEntry(configFileExistenceInfo.openFilesImpactedByConfigFile, (isRootOfInferredProject, __key) => isRootOfInferredProject);
        }

        private setConfigFileExistenceInfoByClosedConfiguredProject(closedProject: ConfiguredProject) {
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(closedProject.canonicalConfigFilePath);
            Debug.assert(!!configFileExistenceInfo);
            if (configFileExistenceInfo.openFilesImpactedByConfigFile.size) {
                const configFileName = closedProject.getConfigFilePath();
                // If there are open files that are impacted by this config file existence
                // but none of them are root of inferred project, the config file watcher will be
                // created when any of the script infos are added as root of inferred project
                if (this.configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo)) {
                    Debug.assert(!configFileExistenceInfo.configFileWatcherForRootOfInferredProject);
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject = this.addFileWatcher(
                        WatchType.ConfigFileForInferredRoot, /*project*/ undefined, configFileName,
                        (_filename, eventKind) => this.onConfigFileChangeForOpenScriptInfo(configFileName, eventKind)
                    );
                    this.logConfigFileWatchUpdate(configFileName, closedProject.canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.UpdatedCallback);
                }
            }
            else {
                // There is not a single file open thats tracking the status of this config file. Remove from cache
                this.configFileExistenceInfoCache.delete(closedProject.canonicalConfigFilePath);
            }
        }

        private logConfigFileWatchUpdate(configFileName: NormalizedPath, canonicalConfigFilePath: string, configFileExistenceInfo: ConfigFileExistenceInfo, status: ConfigFileWatcherStatus) {
            if (!this.logger.loggingEnabled()) {
                return;
            }
            const inferredRoots: string[] = [];
            const otherFiles: string[] = [];
            configFileExistenceInfo.openFilesImpactedByConfigFile.forEach((isRootOfInferredProject, key) => {
                const info = this.getScriptInfoForPath(key as Path);
                (isRootOfInferredProject ? inferredRoots : otherFiles).push(info.fileName);
            });

            const watches: WatchType[] = [];
            if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject) {
                watches.push(WatchType.ConfigFileForInferredRoot);
            }
            if (this.configuredProjects.has(canonicalConfigFilePath)) {
                watches.push(WatchType.ConfigFilePath);
            }
            this.logger.info(`ConfigFilePresence:: Current Watches: ['${watches.join("','")}']:: File: ${configFileName} Currently impacted open files: RootsOfInferredProjects: ${inferredRoots} OtherOpenFiles: ${otherFiles} Status: ${status}`);
        }

        /**
         * Close the config file watcher in the cached ConfigFileExistenceInfo
         *   if there arent any open files that are root of inferred project
         */
        private closeConfigFileWatcherOfConfigFileExistenceInfo(
            configFileName: NormalizedPath, configFileExistenceInfo: ConfigFileExistenceInfo,
            reason: WatcherCloseReason
        ) {
            // Close the config file watcher if there are no more open files that are root of inferred project
            if (configFileExistenceInfo.configFileWatcherForRootOfInferredProject &&
                !this.configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo)) {
                this.closeFileWatcher(
                    WatchType.ConfigFileForInferredRoot, /*project*/ undefined, configFileName,
                    configFileExistenceInfo.configFileWatcherForRootOfInferredProject, reason
                );
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
                        this.closeConfigFileWatcherOfConfigFileExistenceInfo(
                            configFileName, configFileExistenceInfo, WatcherCloseReason.FileClosed
                        );
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
                let configFilePresenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
                if (!configFilePresenceInfo) {
                    // Create the cache
                    configFilePresenceInfo = {
                        exists: this.host.fileExists(configFileName),
                        openFilesImpactedByConfigFile: createMap<boolean>()
                    };
                    this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFilePresenceInfo);
                }

                // Set this file as the root of inferred project
                configFilePresenceInfo.openFilesImpactedByConfigFile.set(info.path, true);
                this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFilePresenceInfo, ConfigFileWatcherStatus.RootOfInferredProjectTrue);

                // If there is no configured project for this config file, add the file watcher
                if (!configFilePresenceInfo.configFileWatcherForRootOfInferredProject &&
                    !this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath)) {
                    configFilePresenceInfo.configFileWatcherForRootOfInferredProject = this.addFileWatcher(WatchType.ConfigFileForInferredRoot, /*project*/ undefined, configFileName,
                        (_fileName, eventKind) => this.onConfigFileChangeForOpenScriptInfo(configFileName, eventKind)
                    );
                    this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFilePresenceInfo, ConfigFileWatcherStatus.UpdatedCallback);
                }
            });
        }

        /**
         * This is called by inferred project whenever root script info is removed from it
         */
        /* @internal */
        stopWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo, reason: WatcherCloseReason) {
            this.forEachConfigFileLocation(info, (configFileName, canonicalConfigFilePath) => {
                const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
                if (configFileExistenceInfo && configFileExistenceInfo.openFilesImpactedByConfigFile.has(info.path)) {
                    Debug.assert(info.isScriptOpen());

                    // Info is not root of inferred project any more
                    configFileExistenceInfo.openFilesImpactedByConfigFile.set(info.path, false);
                    this.logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, ConfigFileWatcherStatus.RootOfInferredProjectFalse);

                    // Close the config file watcher
                    this.closeConfigFileWatcherOfConfigFileExistenceInfo(
                        configFileName, configFileExistenceInfo, reason
                    );
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
        private forEachConfigFileLocation(info: ScriptInfo,
            action: (configFileName: NormalizedPath, canonicalConfigFilePath: string) => boolean | void,
            projectRootPath?: NormalizedPath) {
            let searchPath = asNormalizedPath(getDirectoryPath(info.fileName));

            while (!projectRootPath || searchPath.indexOf(projectRootPath) >= 0) {
                const canonicalSearchPath = normalizedPathToPath(searchPath, this.currentDirectory, this.toCanonicalFileName);
                const tsconfigFileName = asNormalizedPath(combinePaths(searchPath, "tsconfig.json"));
                let result = action(tsconfigFileName, combinePaths(canonicalSearchPath, "tsconfig.json"));
                if (result) {
                    return tsconfigFileName;
                }

                const jsconfigFileName = asNormalizedPath(combinePaths(searchPath, "jsconfig.json"));
                result = action(jsconfigFileName, combinePaths(canonicalSearchPath, "jsconfig.json"));
                if (result) {
                    return jsconfigFileName;
                }

                const parentPath = asNormalizedPath(getDirectoryPath(searchPath));
                if (parentPath === searchPath) {
                    break;
                }
                searchPath = parentPath;
            }

            return undefined;
        }

        /**
         * This function tries to search for a tsconfig.json for the given file.
         * This is different from the method the compiler uses because
         * the compiler can assume it will always start searching in the
         * current directory (the directory in which tsc was invoked).
         * The server must start searching from the directory containing
         * the newly opened file.
         */
        private getConfigFileNameForFile(info: ScriptInfo, projectRootPath?: NormalizedPath) {
            Debug.assert(info.isScriptOpen());
            this.logger.info(`Search path: ${getDirectoryPath(info.fileName)}`);
            const configFileName = this.forEachConfigFileLocation(info,
                (configFileName, canonicalConfigFilePath) =>
                    this.configFileExists(configFileName, canonicalConfigFilePath, info),
                projectRootPath
            );
            if (configFileName) {
                this.logger.info(`For info: ${info.fileName} :: Config file name: ${configFileName}`);
            }
            else {
                this.logger.info(`For info: ${info.fileName} :: No config files found.`);
            }
            return configFileName;
        }

        private printProjects() {
            if (!this.logger.hasLevel(LogLevel.verbose)) {
                return;
            }

            this.logger.startGroup();
            let counter = 0;
            const printProjects = (projects: Project[], counter: number): number => {
                for (const project of projects) {
                    this.logger.info(`Project '${project.getProjectName()}' (${ProjectKind[project.projectKind]}) ${counter}`);
                    this.logger.info(project.filesToString());
                    this.logger.info("-----------------------------------------------");
                    counter++;
                }
                return counter;
            };
            counter = printProjects(this.externalProjects, counter);
            counter = printProjects(arrayFrom(this.configuredProjects.values()), counter);
            printProjects(this.inferredProjects, counter);

            this.logger.info("Open files: ");
            for (const rootFile of this.openFiles) {
                this.logger.info(`\t${rootFile.fileName}`);
            }

            this.logger.endGroup();
        }

        private findConfiguredProjectByProjectName(configFileName: NormalizedPath): ConfiguredProject | undefined {
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

        private convertConfigFileContentToProjectOptions(configFilename: string, cachedServerHost: CachedServerHost) {
            configFilename = normalizePath(configFilename);

            const configFileContent = this.host.readFile(configFilename);

            const result = parseJsonText(configFilename, configFileContent);
            if (!result.endOfFileToken) {
                result.endOfFileToken = <EndOfFileToken>{ kind: SyntaxKind.EndOfFileToken };
            }
            const errors = result.parseDiagnostics;
            const parsedCommandLine = parseJsonSourceFileConfigFileContent(
                result,
                cachedServerHost,
                getDirectoryPath(configFilename),
                /*existingOptions*/ {},
                configFilename,
                /*resolutionStack*/[],
                this.hostConfiguration.extraFileExtensions);

            if (parsedCommandLine.errors.length) {
                errors.push(...parsedCommandLine.errors);
            }

            Debug.assert(!!parsedCommandLine.fileNames);

            const projectOptions: ProjectOptions = {
                files: parsedCommandLine.fileNames,
                compilerOptions: parsedCommandLine.options,
                configHasExtendsProperty: parsedCommandLine.raw["extends"] !== undefined,
                configHasFilesProperty: parsedCommandLine.raw["files"] !== undefined,
                configHasIncludeProperty: parsedCommandLine.raw["include"] !== undefined,
                configHasExcludeProperty: parsedCommandLine.raw["exclude"] !== undefined,
                wildcardDirectories: createMapFromTemplate(parsedCommandLine.wildcardDirectories),
                typeAcquisition: parsedCommandLine.typeAcquisition,
                compileOnSave: parsedCommandLine.compileOnSave
            };

            return { projectOptions, configFileErrors: errors, configFileSpecs: parsedCommandLine.configFileSpecs };
        }

        private exceededTotalSizeLimitForNonTsFiles<T>(name: string, options: CompilerOptions, fileNames: T[], propertyReader: FilePropertyReader<T>) {
            if (options && options.disableSizeLimit || !this.host.getFileSize) {
                return false;
            }

            let availableSpace = maxProgramSizeForNonTsFiles;
            this.projectToSizeMap.set(name, 0);
            this.projectToSizeMap.forEach(val => (availableSpace -= (val || 0)));

            let totalNonTsFileSize = 0;
            for (const f of fileNames) {
                const fileName = propertyReader.getFileName(f);
                if (hasTypeScriptFileExtension(fileName)) {
                    continue;
                }
                totalNonTsFileSize += this.host.getFileSize(fileName);
                if (totalNonTsFileSize > maxProgramSizeForNonTsFiles) {
                    // Keep the size as zero since it's disabled
                    return true;
                }
            }

            if (totalNonTsFileSize > availableSpace) {
                return true;
            }

            this.projectToSizeMap.set(name, totalNonTsFileSize);
            return false;
        }

        private createExternalProject(projectFileName: string, files: protocol.ExternalFile[], options: protocol.ExternalProjectCompilerOptions, typeAcquisition: TypeAcquisition) {
            const compilerOptions = convertCompilerOptions(options);
            const project = new ExternalProject(
                projectFileName,
                this,
                this.documentRegistry,
                compilerOptions,
                /*languageServiceEnabled*/ !this.exceededTotalSizeLimitForNonTsFiles(projectFileName, compilerOptions, files, externalFilePropertyReader),
                options.compileOnSave === undefined ? true : options.compileOnSave);

            this.addFilesToNonInferredProjectAndUpdateGraph(project, files, externalFilePropertyReader, /*clientFileName*/ undefined, typeAcquisition);
            this.externalProjects.push(project);
            this.sendProjectTelemetry(project.externalProjectName, project);
            return project;
        }

        private sendProjectTelemetry(projectKey: string, project: server.ExternalProject | server.ConfiguredProject, projectOptions?: ProjectOptions): void {
            if (this.seenProjects.has(projectKey)) {
                return;
            }
            this.seenProjects.set(projectKey, true);

            if (!this.eventHandler) return;

            const data: ProjectInfoTelemetryEventData = {
                projectId: this.host.createHash(projectKey),
                fileStats: countEachFileTypes(project.getScriptInfos()),
                compilerOptions: convertCompilerOptionsForTelemetry(project.getCompilerOptions()),
                typeAcquisition: convertTypeAcquisition(project.getTypeAcquisition()),
                extends: projectOptions && projectOptions.configHasExtendsProperty,
                files: projectOptions && projectOptions.configHasFilesProperty,
                include: projectOptions && projectOptions.configHasIncludeProperty,
                exclude: projectOptions && projectOptions.configHasExcludeProperty,
                compileOnSave: project.compileOnSaveEnabled,
                configFileName: configFileName(),
                projectType: project instanceof server.ExternalProject ? "external" : "configured",
                languageServiceEnabled: project.languageServiceEnabled,
                version,
            };
            this.eventHandler({ eventName: ProjectInfoTelemetryEvent, data });

            function configFileName(): ProjectInfoTelemetryEventData["configFileName"] {
                if (!(project instanceof server.ConfiguredProject)) {
                    return "other";
                }

                const configFilePath = project instanceof server.ConfiguredProject && project.getConfigFilePath();
                return getBaseConfigFileName(configFilePath) || "other";
            }

            function convertTypeAcquisition({ enable, include, exclude }: TypeAcquisition): ProjectInfoTypeAcquisitionData {
                return {
                    enable,
                    include: include !== undefined && include.length !== 0,
                    exclude: exclude !== undefined && exclude.length !== 0,
                };
            }
        }

        private addFilesToNonInferredProjectAndUpdateGraph<T>(project: ConfiguredProject | ExternalProject, files: T[], propertyReader: FilePropertyReader<T>, clientFileName: string, typeAcquisition: TypeAcquisition): void {
            this.updateNonInferredProjectFiles(project, files, propertyReader, clientFileName);
            project.setTypeAcquisition(typeAcquisition);
            // This doesnt need scheduling since its either creation or reload of the project
            project.updateGraph();
        }

        private createConfiguredProject(configFileName: NormalizedPath, clientFileName?: string) {
            const cachedServerHost = new CachedServerHost(this.host);
            const { projectOptions, configFileErrors, configFileSpecs } = this.convertConfigFileContentToProjectOptions(configFileName, cachedServerHost);
            this.logger.info(`Opened configuration file ${configFileName}`);
            const languageServiceEnabled = !this.exceededTotalSizeLimitForNonTsFiles(configFileName, projectOptions.compilerOptions, projectOptions.files, fileNamePropertyReader);
            const project = new ConfiguredProject(
                configFileName,
                this,
                this.documentRegistry,
                projectOptions.configHasFilesProperty,
                projectOptions.compilerOptions,
                languageServiceEnabled,
                projectOptions.compileOnSave === undefined ? false : projectOptions.compileOnSave,
                cachedServerHost);

            project.configFileSpecs = configFileSpecs;
            // TODO: We probably should also watch the configFiles that are extended
            project.configFileWatcher = this.addFileWatcher(WatchType.ConfigFilePath, project,
                configFileName, (_fileName, eventKind) => this.onConfigChangedForConfiguredProject(project, eventKind)
            );
            if (languageServiceEnabled) {
                project.watchWildcards(projectOptions.wildcardDirectories);
                project.watchTypeRoots();
            }

            project.setProjectErrors(configFileErrors);
            this.addFilesToNonInferredProjectAndUpdateGraph(project, projectOptions.files, fileNamePropertyReader, clientFileName, projectOptions.typeAcquisition);
            this.configuredProjects.set(project.canonicalConfigFilePath, project);
            this.setConfigFileExistenceByNewConfiguredProject(project);
            this.sendProjectTelemetry(project.getConfigFilePath(), project, projectOptions);
            return project;
        }

        private updateNonInferredProjectFiles<T>(project: ExternalProject | ConfiguredProject, files: T[], propertyReader: FilePropertyReader<T>, clientFileName?: string) {
            const projectRootFilesMap = project.getRootFilesMap();
            const newRootScriptInfoMap = createMap<ProjectRoot>();

            for (const f of files) {
                const newRootFile = propertyReader.getFileName(f);
                const normalizedPath = toNormalizedPath(newRootFile);
                let scriptInfo: ScriptInfo | NormalizedPath;
                let path: Path;
                // Use the project's lsHost so that it can use caching instead of reaching to disk for the query
                if (!project.lsHost.fileExists(newRootFile)) {
                    path = normalizedPathToPath(normalizedPath, this.currentDirectory, this.toCanonicalFileName);
                    const existingValue = projectRootFilesMap.get(path);
                    if (isScriptInfo(existingValue)) {
                        project.removeFile(existingValue);
                    }
                    projectRootFilesMap.set(path, normalizedPath);
                    scriptInfo = normalizedPath;
                }
                else {
                    const scriptKind = propertyReader.getScriptKind(f);
                    const hasMixedContent = propertyReader.hasMixedContent(f, this.hostConfiguration.extraFileExtensions);
                    scriptInfo = this.getOrCreateScriptInfoForNormalizedPath(normalizedPath, /*openedByClient*/ clientFileName === newRootFile, /*fileContent*/ undefined, scriptKind, hasMixedContent);
                    path = scriptInfo.path;
                    // If this script info is not already a root add it
                    if (!project.isRoot(scriptInfo)) {
                        project.addRoot(scriptInfo);
                        if (scriptInfo.isScriptOpen()) {
                            // if file is already root in some inferred project
                            // - remove the file from that project and delete the project if necessary
                            this.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo);
                        }
                    }
                }
                newRootScriptInfoMap.set(path, scriptInfo);
            }

            // project's root file map size is always going to be same or larger than new roots map
            // as we have already all the new files to the project
            if (projectRootFilesMap.size > newRootScriptInfoMap.size) {
                projectRootFilesMap.forEach((value, path) => {
                    if (!newRootScriptInfoMap.has(path)) {
                        if (isScriptInfo(value)) {
                            project.removeFile(value);
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

        private updateNonInferredProject<T>(project: ExternalProject | ConfiguredProject, newUncheckedFiles: T[], propertyReader: FilePropertyReader<T>, newOptions: CompilerOptions, newTypeAcquisition: TypeAcquisition, compileOnSave: boolean) {
            project.setCompilerOptions(newOptions);
            // VS only set the CompileOnSaveEnabled option in the request if the option was changed recently
            // therefore if it is undefined, it should not be updated.
            if (compileOnSave !== undefined) {
                project.compileOnSaveEnabled = compileOnSave;
            }
            this.addFilesToNonInferredProjectAndUpdateGraph(project, newUncheckedFiles, propertyReader, /*clientFileName*/ undefined, newTypeAcquisition);
        }

        /**
         * Read the config file of the project again and update the project
         */
        /* @internal */
        reloadConfiguredProject(project: ConfiguredProject) {
            // At this point, there is no reason to not have configFile in the host
            const host = project.getCachedServerHost();

            // Clear the cache since we are reloading the project from disk
            host.clearCache();
            const configFileName = project.getConfigFilePath();
            this.logger.info(`Reloading configured project ${configFileName}`);

            // Read updated contents from disk
            const { projectOptions, configFileErrors, configFileSpecs } = this.convertConfigFileContentToProjectOptions(configFileName, host);

            // Update the project
            project.configFileSpecs = configFileSpecs;
            project.setProjectErrors(configFileErrors);
            if (this.exceededTotalSizeLimitForNonTsFiles(project.canonicalConfigFilePath, projectOptions.compilerOptions, projectOptions.files, fileNamePropertyReader)) {
                project.disableLanguageService();
                project.stopWatchingWildCards(WatcherCloseReason.ProjectReloadHitMaxSize);
                project.stopWatchingTypeRoots(WatcherCloseReason.ProjectReloadHitMaxSize);
            }
            else {
                project.enableLanguageService();
                project.watchWildcards(projectOptions.wildcardDirectories);
                project.watchTypeRoots();
            }
            this.updateNonInferredProject(project, projectOptions.files, fileNamePropertyReader, projectOptions.compilerOptions, projectOptions.typeAcquisition, projectOptions.compileOnSave);

            if (!this.eventHandler) {
                return;
            }

            this.eventHandler(<ConfigFileDiagEvent>{
                eventName: ConfigFileDiagEvent,
                data: { configFileName, diagnostics: project.getGlobalProjectErrors() || [], triggerFile: configFileName }
            });
        }

        private getOrCreateInferredProjectForProjectRootPathIfEnabled(info: ScriptInfo, projectRootPath: string | undefined): InferredProject | undefined {
            if (!this.useInferredProjectPerProjectRoot) {
                return undefined;
            }

            if (projectRootPath) {
                // if we have an explicit project root path, find (or create) the matching inferred project.
                for (const project of this.inferredProjects) {
                    if (project.projectRootPath === projectRootPath) {
                        return project;
                    }
                }
                return this.createInferredProject(/*isSingleInferredProject*/ false, projectRootPath);
            }

            // we don't have an explicit root path, so we should try to find an inferred project
            // that more closely contains the file.
            let bestMatch: InferredProject;
            for (const project of this.inferredProjects) {
                // ignore single inferred projects (handled elsewhere)
                if (!project.projectRootPath) continue;
                // ignore inferred projects that don't contain the root's path
                if (!containsPath(project.projectRootPath, info.path, this.host.getCurrentDirectory(), !this.host.useCaseSensitiveFileNames)) continue;
                // ignore inferred projects that are higher up in the project root.
                // TODO(rbuckton): Should we add the file as a root to these as well?
                if (bestMatch && bestMatch.projectRootPath.length > project.projectRootPath.length) continue;
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

            return this.createInferredProject(/*isSingleInferredProject*/ true);
        }

        private createInferredProject(isSingleInferredProject?: boolean, projectRootPath?: string): InferredProject {
            const compilerOptions = projectRootPath && this.compilerOptionsForInferredProjectsPerProjectRoot.get(projectRootPath) || this.compilerOptionsForInferredProjects;
            const project = new InferredProject(this, this.documentRegistry, compilerOptions, projectRootPath);
            if (isSingleInferredProject) {
                this.inferredProjects.unshift(project);
            }
            else {
                this.inferredProjects.push(project);
            }
            return project;
        }

        /**
         * @param uncheckedFileName is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */

        getOrCreateScriptInfo(uncheckedFileName: string, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
            return this.getOrCreateScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName), openedByClient, fileContent, scriptKind);
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        }

        private watchClosedScriptInfo(info: ScriptInfo) {
            Debug.assert(!info.fileWatcher);
            // do not watch files with mixed content - server doesn't know how to interpret it
            if (!info.hasMixedContent) {
                const { fileName } = info;
                info.fileWatcher = this.addFileWatcher(WatchType.ClosedScriptInfo, /*project*/ undefined, fileName,
                    (_fileName, eventKind) => this.onSourceFileChanged(fileName, eventKind)
                );
            }
        }

        private stopWatchingScriptInfo(info: ScriptInfo, reason: WatcherCloseReason) {
            if (info.fileWatcher) {
                this.closeFileWatcher(WatchType.ClosedScriptInfo, /*project*/ undefined, info.fileName, info.fileWatcher, reason);
                info.fileWatcher = undefined;
            }
        }

        getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean) {
            const path = normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName);
            let info = this.getScriptInfoForPath(path);
            if (!info) {
                if (openedByClient || this.host.fileExists(fileName)) {
                    info = new ScriptInfo(this.host, fileName, scriptKind, hasMixedContent, path);

                    this.filenameToScriptInfo.set(info.path, info);

                    if (openedByClient) {
                        if (fileContent === undefined) {
                            // if file is opened by client and its content is not specified - use file text
                            fileContent = this.host.readFile(fileName) || "";
                        }
                    }
                    else {
                        this.watchClosedScriptInfo(info);
                    }
                }
            }
            if (info) {
                if (openedByClient && !info.isScriptOpen()) {
                    this.stopWatchingScriptInfo(info, WatcherCloseReason.FileOpened);
                    info.open(fileContent);
                    if (hasMixedContent) {
                        info.registerFileUpdate();
                    }
                }
                else if (fileContent !== undefined) {
                    info.reload(fileContent);
                }
            }
            return info;
        }

        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            return this.getScriptInfoForPath(normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName));
        }

        getScriptInfoForPath(fileName: Path) {
            return this.filenameToScriptInfo.get(fileName);
        }

        setHostConfiguration(args: protocol.ConfigureRequestArguments) {
            if (args.file) {
                const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(args.file));
                if (info) {
                    info.setFormatOptions(convertFormatOptions(args.formatOptions));
                    this.logger.info(`Host configuration update for file ${args.file}`);
                }
            }
            else {
                if (args.hostInfo !== undefined) {
                    this.hostConfiguration.hostInfo = args.hostInfo;
                    this.logger.info(`Host information ${args.hostInfo}`);
                }
                if (args.formatOptions) {
                    mergeMapLikes(this.hostConfiguration.formatCodeOptions, convertFormatOptions(args.formatOptions));
                    this.logger.info("Format host information updated");
                }
                if (args.extraFileExtensions) {
                    this.hostConfiguration.extraFileExtensions = args.extraFileExtensions;
                    // We need to update the project structures again as it is possible that existing
                    // project structure could have more or less files depending on extensions permitted
                    this.reloadProjects();
                    this.logger.info("Host file extension mappings updated");
                }
            }
        }

        /* @internal */
        closeFileWatcher(watchType: WatchType, project: Project, file: string, watcher: FileWatcher, reason: WatcherCloseReason) {
            this.logger.info(`FileWatcher:: Close: ${file} Project: ${project ? project.getProjectName() : ""} WatchType: ${watchType} Reason: ${reason}`);
            watcher.close();
        }

        /* @internal */
        addFileWatcher(watchType: WatchType, project: Project, file: string, cb: FileWatcherCallback) {
            this.logger.info(`FileWatcher:: Added: ${file} Project: ${project ? project.getProjectName() : ""} WatchType: ${watchType}`);
            return this.host.watchFile(file, (fileName, eventKind) => {
                this.logger.info(`FileWatcher:: File ${FileWatcherEventKind[eventKind]}: ${file} Project: ${project ? project.getProjectName() : ""} WatchType: ${watchType}`);
                cb(fileName, eventKind);
            });
        }

        /* @internal */
        closeDirectoryWatcher(watchType: WatchType, project: Project, directory: string, watcher: FileWatcher, flags: WatchDirectoryFlags, reason: WatcherCloseReason) {
            const recursive = (flags & WatchDirectoryFlags.Recursive) !== 0;
            this.logger.info(`DirectoryWatcher ${recursive ? "recursive" : ""}:: Close: ${directory} Project: ${project.getProjectName()} WatchType: ${watchType} Reason: ${reason}`);
            watcher.close();
        }

        /* @internal */
        addDirectoryWatcher(watchType: WatchType, project: Project, directory: string, cb: ServerDirectoryWatcherCallback, flags: WatchDirectoryFlags) {
            const recursive = (flags & WatchDirectoryFlags.Recursive) !== 0;
            this.logger.info(`DirectoryWatcher ${recursive ? "recursive" : ""}:: Added: ${directory} Project: ${project.getProjectName()} WatchType: ${watchType}`);
            return this.host.watchDirectory(directory, fileName => {
                const path = toNormalizedPath(getNormalizedAbsolutePath(fileName, directory));
                this.logger.info(`DirectoryWatcher:: EventOn: ${directory} Trigger: ${fileName} Path: ${path} Project: ${project.getProjectName()} WatchType: ${watchType}`);
                cb(path);
            }, recursive);
        }

        closeLog() {
            this.logger.close();
        }

        /**
         * This function rebuilds the project for every file opened by the client
         */
        reloadProjects() {
            this.logger.info("reload projects.");
            this.reloadConfiguredsProjectForFiles(this.openFiles, /*delayReload*/ false);
            this.refreshInferredProjects();
        }

        private delayReloadConfiguredProjectForFiles(configFileExistenceInfo: ConfigFileExistenceInfo, ignoreIfNotRootOfInferredProject: boolean) {
            // Get open files to reload projects for
            const openFiles = mapDefinedIter(
                configFileExistenceInfo.openFilesImpactedByConfigFile.entries(),
                ([path, isRootOfInferredProject]) => {
                    if (!ignoreIfNotRootOfInferredProject || isRootOfInferredProject) {
                        const info = this.getScriptInfoForPath(path as Path);
                        Debug.assert(!!info);
                        return info;
                    }
                }
            );
            this.reloadConfiguredsProjectForFiles(openFiles, /*delayReload*/ true);
            this.delayInferredProjectsRefresh();
        }

        /**
         * This function goes through all the openFiles and tries to file the config file for them.
         * If the config file is found and it refers to existing project, it reloads it either immediately
         * or schedules it for reload depending on delayReload option
         * If the there is no existing project it just opens the configured project for the config file
         */
        private reloadConfiguredsProjectForFiles(openFiles: ScriptInfo[], delayReload: boolean) {
            const updatedProjects = createMap<true>();
            // try to reload config file for all open files
            for (const info of openFiles) {
                // This tries to search for a tsconfig.json for the given file. If we found it,
                // we first detect if there is already a configured project created for it: if so,
                // we re- read the tsconfig file content and update the project only if we havent already done so
                // otherwise we create a new one.
                const configFileName = this.getConfigFileNameForFile(info);
                if (configFileName) {
                    const project = this.findConfiguredProjectByProjectName(configFileName);
                    if (!project) {
                        this.createConfiguredProject(configFileName, info.fileName);
                        updatedProjects.set(configFileName, true);
                    }
                    else if (!updatedProjects.has(configFileName)) {
                        if (delayReload) {
                            project.pendingReload = true;
                            this.delayUpdateProjectGraph(project);
                        }
                        else {
                            this.reloadConfiguredProject(project);
                        }
                        updatedProjects.set(configFileName, true);
                    }
                }
            }
        }

        /**
         * Remove the root of inferred project if script info is part of another project
         */
        private removeRootOfInferredProjectIfNowPartOfOtherProject(info: ScriptInfo) {
            // If the script info is root of inferred project, it could only be first containing project
            // since info is added to inferred project and made root only when there are no other projects containing it
            // So even if it is root of the inferred project and after project structure updates its now part
            // of multiple project it needs to be removed from that inferred project because:
            // - references in inferred project supercede the root part
            // - root / reference in non - inferred project beats root in inferred project
            if (info.containingProjects.length > 1 &&
                info.containingProjects[0].projectKind === ProjectKind.Inferred &&
                info.containingProjects[0].isRoot(info)) {
                const inferredProject = info.containingProjects[0] as InferredProject;
                if (inferredProject.isProjectWithSingleRoot()) {
                    this.removeProject(inferredProject);
                }
                else {
                    inferredProject.removeFile(info);
                }
            }
        }

        /**
         * This function is to update the project structure for every inferred project.
         * It is called on the premise that all the configured projects are
         * up to date.
         * This will go through open files and assign them to inferred project if open file is not part of any other project
         * After that all the inferred project graphs are updated
         */
        private refreshInferredProjects() {
            this.logger.info("refreshInferredProjects: updating project structure from ...");
            this.printProjects();

            for (const info of this.openFiles) {
                // collect all orphaned script infos from open files
                if (info.isOrphan()) {
                    this.assignOrphanScriptInfoToInferredProject(info);
                }
                else {
                    // Or remove the root of inferred project if is referenced in more than one projects
                    this.removeRootOfInferredProjectIfNowPartOfOtherProject(info);
                }
            }

            for (const p of this.inferredProjects) {
                p.updateGraph();
            }

            this.logger.info("refreshInferredProjects: updated project structure ...");
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

        openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult {
            let configFileName: NormalizedPath;
            let configFileErrors: ReadonlyArray<Diagnostic>;

            const info = this.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ true, fileContent, scriptKind, hasMixedContent);
            let project: ConfiguredProject | ExternalProject = this.findContainingExternalProject(fileName);
            if (!project) {
                configFileName = this.getConfigFileNameForFile(info, projectRootPath);
                if (configFileName) {
                    project = this.findConfiguredProjectByProjectName(configFileName);
                    if (!project) {
                        project = this.createConfiguredProject(configFileName, fileName);

                        // even if opening config file was successful, it could still
                        // contain errors that were tolerated.
                        const errors = project.getGlobalProjectErrors();
                        if (errors && errors.length > 0) {
                            // set configFileErrors only when the errors array is non-empty
                            configFileErrors = errors;
                        }
                    }
                }
            }
            if (project && !project.languageServiceEnabled) {
                // if project language service is disabled then we create a program only for open files.
                // this means that project should be marked as dirty to force rebuilding of the program
                // on the next request
                project.markAsDirty();
            }

            // At this point if file is part of any any configured or external project, then it would be present in the containing projects
            // So if it still doesnt have any containing projects, it needs to be part of inferred project
            if (info.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(info, projectRootPath);
            }
            this.addToListOfOpenFiles(info);

            // Delete the orphan files here because there might be orphan script infos (which are not part of project)
            // when some file/s were closed which resulted in project removal.
            // It was then postponed to cleanup these script infos so that they can be reused if
            // the file from that old project is reopened because of opening file from here.
            this.deleteOrphanScriptInfoNotInAnyProject();
            this.printProjects();
            return { configFileName, configFileErrors };
        }

        /**
         * Close file whose contents is managed by the client
         * @param filename is absolute pathname
         */
        closeClientFile(uncheckedFileName: string) {
            const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
            if (info) {
                this.closeOpenFile(info);
            }
            this.printProjects();
        }

        private collectChanges(lastKnownProjectVersions: protocol.ProjectVersionInfo[], currentProjects: Project[], result: ProjectFilesWithTSDiagnostics[]): void {
            for (const proj of currentProjects) {
                const knownProject = forEach(lastKnownProjectVersions, p => p.projectName === proj.getProjectName() && p);
                result.push(proj.getChangesSinceVersion(knownProject && knownProject.version));
            }
        }

        /* @internal */
        synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[]): ProjectFilesWithTSDiagnostics[] {
            const files: ProjectFilesWithTSDiagnostics[] = [];
            this.collectChanges(knownProjects, this.externalProjects, files);
            this.collectChanges(knownProjects, arrayFrom(this.configuredProjects.values()), files);
            this.collectChanges(knownProjects, this.inferredProjects, files);
            return files;
        }

        /* @internal */
        applyChangesInOpenFiles(openFiles: protocol.ExternalFile[], changedFiles: protocol.ChangedOpenFile[], closedFiles: string[]): void {
            if (openFiles) {
                for (const file of openFiles) {
                    const scriptInfo = this.getScriptInfo(file.fileName);
                    Debug.assert(!scriptInfo || !scriptInfo.isScriptOpen());
                    const normalizedPath = scriptInfo ? scriptInfo.fileName : toNormalizedPath(file.fileName);
                    this.openClientFileWithNormalizedPath(normalizedPath, file.content, tryConvertScriptKindName(file.scriptKind), file.hasMixedContent);
                }
            }

            if (changedFiles) {
                for (const file of changedFiles) {
                    const scriptInfo = this.getScriptInfo(file.fileName);
                    Debug.assert(!!scriptInfo);
                    // apply changes in reverse order
                    for (let i = file.changes.length - 1; i >= 0; i--) {
                        const change = file.changes[i];
                        scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
                    }
                    if (!this.changedFiles) {
                        this.changedFiles = [scriptInfo];
                    }
                    else if (!contains(this.changedFiles, scriptInfo)) {
                        this.changedFiles.push(scriptInfo);
                    }
                }
            }

            if (closedFiles) {
                for (const file of closedFiles) {
                    this.closeClientFile(file);
                }
            }
            // if files were open or closed then explicitly refresh list of inferred projects
            // otherwise if there were only changes in files - record changed files in `changedFiles` and defer the update
            if (openFiles || closedFiles) {
                this.ensureProjectStructuresUptoDate(/*refreshInferredProjects*/ true);
            }
        }

        private closeConfiguredProject(configFile: NormalizedPath): void {
            const configuredProject = this.findConfiguredProjectByProjectName(configFile);
            if (configuredProject && configuredProject.deleteOpenRef() === 0) {
                this.removeProject(configuredProject);
            }
        }

        closeExternalProject(uncheckedFileName: string, suppressRefresh = false): void {
            const fileName = toNormalizedPath(uncheckedFileName);
            const configFiles = this.externalProjectToConfiguredProjectMap.get(fileName);
            if (configFiles) {
                let shouldRefreshInferredProjects = false;
                for (const configFile of configFiles) {
                    if (this.closeConfiguredProject(configFile)) {
                        shouldRefreshInferredProjects = true;
                    }
                }
                this.externalProjectToConfiguredProjectMap.delete(fileName);
                if (shouldRefreshInferredProjects && !suppressRefresh) {
                    this.ensureProjectStructuresUptoDate(/*refreshInferredProjects*/ true);
                }
            }
            else {
                // close external project
                const externalProject = this.findExternalProjectByProjectName(uncheckedFileName);
                if (externalProject) {
                    this.removeProject(externalProject);
                    if (!suppressRefresh) {
                        this.ensureProjectStructuresUptoDate(/*refreshInferredProjects*/ true);
                    }
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
                this.openExternalProject(externalProject, /*suppressRefreshOfInferredProjects*/ true);
                // delete project that is present in input list
                projectsToClose.delete(externalProject.projectFileName);
            }

            // close projects that were missing in the input list
            forEachKey(projectsToClose, externalProjectName => {
                this.closeExternalProject(externalProjectName, /*suppressRefresh*/ true);
            });

            this.ensureProjectStructuresUptoDate(/*refreshInferredProjects*/ true);
        }

        /** Makes a filename safe to insert in a RegExp */
        private static readonly filenameEscapeRegexp = /[-\/\\^$*+?.()|[\]{}]/g;
        private static escapeFilenameForRegex(filename: string) {
            return filename.replace(this.filenameEscapeRegexp, "\\$&");
        }

        resetSafeList(): void {
            this.safelist = defaultTypeSafeList;
        }

        loadSafeList(fileName: string): void {
            const raw: SafeList = JSON.parse(this.host.readFile(fileName, "utf-8"));
            // Parse the regexps
            for (const k of Object.keys(raw)) {
                raw[k].match = new RegExp(raw[k].match as {} as string, "i");
            }
            // raw is now fixed and ready
            this.safelist = raw;
        }

        applySafeList(proj: protocol.ExternalProject): void {
            const { rootFiles, typeAcquisition } = proj;
            const types = (typeAcquisition && typeAcquisition.include) || [];

            const excludeRules: string[] = [];

            const normalizedNames = rootFiles.map(f => normalizeSlashes(f.fileName));

            for (const name of Object.keys(this.safelist)) {
                const rule = this.safelist[name];
                for (const root of normalizedNames) {
                    if (rule.match.test(root)) {
                        this.logger.info(`Excluding files based on rule ${name}`);

                        // If the file matches, collect its types packages and exclude rules
                        if (rule.types) {
                            for (const type of rule.types) {
                                if (types.indexOf(type) < 0) {
                                    types.push(type);
                                }
                            }
                        }

                        if (rule.exclude) {
                            for (const exclude of rule.exclude) {
                                const processedRule = root.replace(rule.match, (...groups: Array<string>) => {
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

                // Copy back this field into the project if needed
                if (types.length > 0) {
                    proj.typeAcquisition = proj.typeAcquisition || {};
                    proj.typeAcquisition.include = types;
                }
            }

            const excludeRegexes = excludeRules.map(e => new RegExp(e, "i"));
            proj.rootFiles = proj.rootFiles.filter((_file, index) => !excludeRegexes.some(re => re.test(normalizedNames[index])));
        }

        openExternalProject(proj: protocol.ExternalProject, suppressRefreshOfInferredProjects = false): void {
            // typingOptions has been deprecated and is only supported for backward compatibility
            // purposes. It should be removed in future releases - use typeAcquisition instead.
            if (proj.typingOptions && !proj.typeAcquisition) {
                const typeAcquisition = convertEnableAutoDiscoveryToEnable(proj.typingOptions);
                proj.typeAcquisition = typeAcquisition;
            }

            this.applySafeList(proj);

            let tsConfigFiles: NormalizedPath[];
            const rootFiles: protocol.ExternalFile[] = [];
            for (const file of proj.rootFiles) {
                const normalized = toNormalizedPath(file.fileName);
                if (getBaseConfigFileName(normalized)) {
                    if (this.host.fileExists(normalized)) {
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
            let exisingConfigFiles: string[];
            if (externalProject) {
                if (!tsConfigFiles) {
                    const compilerOptions = convertCompilerOptions(proj.options);
                    if (this.exceededTotalSizeLimitForNonTsFiles(proj.projectFileName, compilerOptions, proj.rootFiles, externalFilePropertyReader)) {
                        externalProject.disableLanguageService();
                    }
                    else {
                        externalProject.enableLanguageService();
                    }
                    // external project already exists and not config files were added - update the project and return;
                    this.updateNonInferredProject(externalProject, proj.rootFiles, externalFilePropertyReader, compilerOptions, proj.typeAcquisition, proj.options.compileOnSave);
                    return;
                }
                // some config files were added to external project (that previously were not there)
                // close existing project and later we'll open a set of configured projects for these files
                this.closeExternalProject(proj.projectFileName, /*suppressRefresh*/ true);
            }
            else if (this.externalProjectToConfiguredProjectMap.get(proj.projectFileName)) {
                // this project used to include config files
                if (!tsConfigFiles) {
                    // config files were removed from the project - close existing external project which in turn will close configured projects
                    this.closeExternalProject(proj.projectFileName, /*suppressRefresh*/ true);
                }
                else {
                    // project previously had some config files - compare them with new set of files and close all configured projects that correspond to unused files
                    const oldConfigFiles = this.externalProjectToConfiguredProjectMap.get(proj.projectFileName);
                    let iNew = 0;
                    let iOld = 0;
                    while (iNew < tsConfigFiles.length && iOld < oldConfigFiles.length) {
                        const newConfig = tsConfigFiles[iNew];
                        const oldConfig = oldConfigFiles[iOld];
                        if (oldConfig < newConfig) {
                            this.closeConfiguredProject(oldConfig);
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
                        this.closeConfiguredProject(oldConfigFiles[i]);
                    }
                }
            }
            if (tsConfigFiles) {
                // store the list of tsconfig files that belong to the external project
                this.externalProjectToConfiguredProjectMap.set(proj.projectFileName, tsConfigFiles);
                for (const tsconfigFile of tsConfigFiles) {
                    let project = this.findConfiguredProjectByProjectName(tsconfigFile);
                    if (!project) {
                        // errors are stored in the project
                        project = this.createConfiguredProject(tsconfigFile);
                    }
                    if (project && !contains(exisingConfigFiles, tsconfigFile)) {
                        // keep project alive even if no documents are opened - its lifetime is bound to the lifetime of containing external project
                        project.addOpenRef();
                    }
                }
            }
            else {
                // no config files - remove the item from the collection
                this.externalProjectToConfiguredProjectMap.delete(proj.projectFileName);
                this.createExternalProject(proj.projectFileName, rootFiles, proj.options, proj.typeAcquisition);
            }
            if (!suppressRefreshOfInferredProjects) {
                this.ensureProjectStructuresUptoDate(/*refreshInferredProjects*/ true);
            }
        }
    }
}

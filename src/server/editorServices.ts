/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />
/// <reference path="scriptVersionCache.ts"/>

namespace ts.server {
    export interface Logger {
        close(): void;
        isVerbose(): boolean;
        loggingEnabled(): boolean;
        perftrc(s: string): void;
        info(s: string): void;
        startGroup(): void;
        endGroup(): void;
        msg(s: string, type?: string): void;
    }

    function getDefaultFormatCodeOptions(host: ServerHost): ts.FormatCodeOptions {
        return ts.clone(<ts.FormatCodeOptions>{
            IndentSize: 4,
            TabSize: 4,
            NewLineCharacter: host.newLine || "\n",
            ConvertTabsToSpaces: true,
            IndentStyle: ts.IndentStyle.Smart,
            InsertSpaceAfterCommaDelimiter: true,
            InsertSpaceAfterSemicolonInForStatements: true,
            InsertSpaceBeforeAndAfterBinaryOperators: true,
            InsertSpaceAfterKeywordsInControlFlowStatements: true,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
            InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
            PlaceOpenBraceOnNewLineForFunctions: false,
            PlaceOpenBraceOnNewLineForControlBlocks: false,
        });
    }

    function mergeFormatOptions(formatCodeOptions: FormatCodeOptions, formatOptions: protocol.FormatOptions): void {
        const hasOwnProperty = Object.prototype.hasOwnProperty;
        Object.keys(formatOptions).forEach((key) => {
            const codeKey = key.charAt(0).toUpperCase() + key.substring(1);
            if (hasOwnProperty.call(formatCodeOptions, codeKey)) {
                formatCodeOptions[codeKey] = formatOptions[key];
            }
        });
    }

    export class ScriptInfo {
        svc: ScriptVersionCache;
        defaultProject: Project;      // project to use by default for file
        fileWatcher: FileWatcher;
        formatCodeOptions: ts.FormatCodeOptions;
        path: Path;
        scriptKind: ScriptKind;

        constructor(private host: ServerHost, public fileName: string, public content: string, public isOpen = false) {
            this.path = toPath(fileName, host.getCurrentDirectory(), createGetCanonicalFileName(host.useCaseSensitiveFileNames));
            this.svc = ScriptVersionCache.fromString(host, content);
            this.formatCodeOptions = getDefaultFormatCodeOptions(this.host);
        }

        setFormatOptions(formatOptions: protocol.FormatOptions): void {
            if (formatOptions) {
                mergeFormatOptions(this.formatCodeOptions, formatOptions);
            }
        }

        close() {
            this.isOpen = false;
        }

        snap() {
            return this.svc.getSnapshot();
        }

        getLineInfo(line: number) {
            const snap = this.snap();
            return snap.index.lineNumberToInfo(line);
        }

        editContent(start: number, end: number, newText: string): void {
            this.svc.edit(start, end - start, newText);
        }

        /**
         *  @param line 1 based index
         */
        lineToTextSpan(line: number) {
            const index = this.snap().index;
            const lineInfo = index.lineNumberToInfo(line + 1);
            let len: number;
            if (lineInfo.leaf) {
                len = lineInfo.leaf.text.length;
            }
            else {
                const nextLineInfo = index.lineNumberToInfo(line + 2);
                len = nextLineInfo.offset - lineInfo.offset;
            }
            return ts.createTextSpan(lineInfo.offset, len);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number): number {
            const index = this.snap().index;

            const lineInfo = index.lineNumberToInfo(line);
            // TODO: assert this offset is actually on the line
            return (lineInfo.offset + offset - 1);
        }

        /**
         * @param line 1-based index
         * @param offset 1-based index
         */
        positionToLineOffset(position: number): ILineInfo {
            const index = this.snap().index;
            const lineOffset = index.charOffsetToLineNumberAndPos(position);
            return { line: lineOffset.line, offset: lineOffset.offset + 1 };
        }
    }

    export class LSHost implements ts.LanguageServiceHost, ModuleResolutionHost {
        private compilationSettings: ts.CompilerOptions;
        private resolvedModuleNames: ts.FileMap<Map<ResolvedModuleWithFailedLookupLocations>>;
        private resolvedTypeReferenceDirectives: ts.FileMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
        private getCanonicalFileName: (fileName: string) => string;

        constructor(private host: ServerHost, private project: Project, private cancellationToken: HostCancellationToken) {
            this.getCanonicalFileName = ts.createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);
            this.resolvedModuleNames = createFileMap<Map<ResolvedModuleWithFailedLookupLocations>>();
            this.resolvedTypeReferenceDirectives = createFileMap<Map<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>();
        }

        private resolveNamesWithLocalCache<T extends { failedLookupLocations: string[] }, R>(
            names: string[],
            containingFile: string,
            cache: ts.FileMap<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R): R[] {

            const path = toPath(containingFile, this.host.getCurrentDirectory(), this.getCanonicalFileName);
            const currentResolutionsInFile = cache.get(path);

            const newResolutions: Map<T> = {};
            const resolvedModules: R[] = [];
            const compilerOptions = this.getCompilationSettings();

            for (const name of names) {
                // check if this is a duplicate entry in the list
                let resolution = lookUp(newResolutions, name);
                if (!resolution) {
                    const existingResolution = currentResolutionsInFile && ts.lookUp(currentResolutionsInFile, name);
                    if (moduleResolutionIsValid(existingResolution)) {
                        // ok, it is safe to use existing name resolution results
                        resolution = existingResolution;
                    }
                    else {
                        newResolutions[name] = resolution = loader(name, containingFile, compilerOptions, this);
                    }
                }

                ts.Debug.assert(resolution !== undefined);

                resolvedModules.push(getResult(resolution));
            }

            // replace old results with a new one
            cache.set(path, newResolutions);
            return resolvedModules;

            function moduleResolutionIsValid(resolution: T): boolean {
                if (!resolution) {
                    return false;
                }

                if (getResult(resolution)) {
                    // TODO: consider checking failedLookupLocations
                    return true;
                }

                // consider situation if we have no candidate locations as valid resolution.
                // after all there is no point to invalidate it if we have no idea where to look for the module.
                return resolution.failedLookupLocations.length === 0;
            }
        }

        getCancellationToken() {
            return this.cancellationToken;
        }

        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return this.resolveNamesWithLocalCache(typeDirectiveNames, containingFile, this.resolvedTypeReferenceDirectives, resolveTypeReferenceDirective, m => m.resolvedTypeReferenceDirective);
        }

        resolveModuleNames(moduleNames: string[], containingFile: string): ResolvedModule[] {
            return this.resolveNamesWithLocalCache(moduleNames, containingFile, this.resolvedModuleNames, resolveModuleName, m => m.resolvedModule);
        }

        getDefaultLibFileName() {
            const nodeModuleBinDir = ts.getDirectoryPath(ts.normalizePath(this.host.getExecutingFilePath()));
            return ts.combinePaths(nodeModuleBinDir, ts.getDefaultLibFileName(this.compilationSettings));
        }

        getScriptSnapshot(filename: string): ts.IScriptSnapshot {
            const scriptInfo = this.project.getScriptInfo(filename);
            if (scriptInfo) {
                return scriptInfo.snap();
            }
        }

        setCompilationSettings(opt: ts.CompilerOptions) {
            this.compilationSettings = opt;
            // conservatively assume that changing compiler options might affect module resolution strategy
            this.resolvedModuleNames.clear();
            this.resolvedTypeReferenceDirectives.clear();
        }

        getCompilationSettings() {
            // change this to return active project settings for file
            return this.compilationSettings;
        }

        getScriptFileNames() {
            return this.project.getRootFiles();
        }

        getScriptKind(fileName: string) {
            const info = this.project.getScriptInfo(fileName);
            if (!info) {
                return undefined;
            }

            if (!info.scriptKind) {
                info.scriptKind = getScriptKindFromFileName(fileName);
            }
            return info.scriptKind;
        }

        getScriptVersion(filename: string) {
            return this.project.getScriptInfo(filename).svc.latestVersion().toString();
        }

        getCurrentDirectory(): string {
            return "";
        }

        removeReferencedFile(info: ScriptInfo) {
            if (!info.isOpen) {
                this.resolvedModuleNames.remove(info.path);
                this.resolvedTypeReferenceDirectives.remove(info.path);
            }
        }

        removeRoot(info: ScriptInfo) {
            this.resolvedModuleNames.remove(info.path);
            this.resolvedTypeReferenceDirectives.remove(info.path);
        }

        resolvePath(path: string): string {
            return this.host.resolvePath(path);
        }

        fileExists(path: string): boolean {
            return this.host.fileExists(path);
        }

        directoryExists(path: string): boolean {
            return this.host.directoryExists(path);
        }

        readFile(fileName: string): string {
            return this.host.readFile(fileName);
        }

        getDirectories(path: string): string[] {
            return this.host.getDirectories(path);
        }
    }

    export interface ProjectOptions {
        /**
         * true if config file explicitly listed files
         **/
        configHasFilesProperty?: boolean;
        /**
         * these fields can be present in the project file
         **/
        files?: string[];
        compilerOptions?: ts.CompilerOptions;
    }

    export enum ProjectKind {
        Inferred,
        Configured,
        External
    }

    export abstract class Project {
        private rootFiles: ScriptInfo[] = [];
        private rootFilesMap: FileMap<ScriptInfo> = createFileMap<ScriptInfo>();
        private readonly lsHost: LSHost;

        readonly languageService: LanguageService;
        protected program: ts.Program;

        constructor(
            readonly projectKind: ProjectKind,
            readonly projectService: ProjectService,
            documentRegistry: ts.DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            compilerOptions: CompilerOptions) {

            if (!compilerOptions) {
                compilerOptions = ts.getDefaultCompilerOptions();
                compilerOptions.allowNonTsExtensions = true;
                compilerOptions.allowJs = true;
            }
            else if (hasExplicitListOfFiles) {
                // If files are listed explicitly, allow all extensions
                compilerOptions.allowNonTsExtensions = true;
            }

            this.lsHost = new LSHost(this.projectService.host, this, this.projectService.cancellationToken);
            this.lsHost.setCompilationSettings(compilerOptions);
            this.languageService = ts.createLanguageService(this.lsHost, documentRegistry);
        }

        getProjectFileName(): string {
            return undefined;
        }

        close() {
            // signal language service to release files acquired from document registry
            this.languageService.dispose();
        }

        getCompilerOptions() {
            return this.lsHost.getCompilationSettings();
        }

        getRootFiles() {
            return this.rootFiles.map(info => info.fileName);
        }

        getFileNames() {
            const sourceFiles = this.program.getSourceFiles();
            return sourceFiles.map(sourceFile => sourceFile.fileName);
        }

        containsScriptInfo(info: ScriptInfo): boolean {
            return this.program.getSourceFileByPath(info.path) !== undefined;
        }

        containsFile(filename: string, requireOpen?: boolean) {
            const info = this.projectService.getScriptInfo(filename);
            if (info) {
                if ((!requireOpen) || info.isOpen) {
                    return this.containsScriptInfo(info);
                }
            }
        }

        isRoot(info: ScriptInfo) {
            return this.rootFilesMap.contains(info.path);
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            if (!this.isRoot(info)) {
                this.rootFiles.push(info);
                this.rootFilesMap.set(info.path, info);
            }
        }

        // remove a root file from project
        removeRoot(info: ScriptInfo) {
            if (this.isRoot(info)) {
                this.rootFiles = copyListRemovingItem(info, this.rootFiles);
                this.rootFilesMap.remove(info.path);
                this.lsHost.removeRoot(info);
            }
        }

        removeReferencedFile(info: ScriptInfo) {
            if (!info.isOpen) {
                this.lsHost.removeReferencedFile(info);
            }
            this.updateGraph();
        }

        updateGraph() {
            this.program = this.languageService.getProgram();
        }

        getScriptInfo(fileName: string) {
            return this.projectService.getOrCreateScriptInfo(fileName, /*openedByClient*/ false);
        }

        filesToString() {
            if (!this.program) {
                return "";
            }
            let strBuilder = "";
            for (const file of this.program.getSourceFiles()) {
                strBuilder += `${file.fileName}\n`;
            }
            return strBuilder;
        }

        setCompilerOptions(compilerOptions: CompilerOptions) {
            if (compilerOptions) {
                compilerOptions.allowNonTsExtensions = true;
                this.lsHost.setCompilationSettings(compilerOptions);
            }
        }

        saveTo(filename: string, tmpfilename: string) {
            const script = this.getScriptInfo(filename);
            if (script) {
                const snap = script.snap();
                this.projectService.host.writeFile(tmpfilename, snap.getText(0, snap.getLength()));
            }
        }

        reloadScript(filename: string, tmpfilename: string, cb: () => any) {
            const script = this.getScriptInfo(filename);
            if (script) {
                script.svc.reloadFromFile(tmpfilename, cb);
            }
        }
    }

    class InferredProject extends Project {
        // Used to keep track of what directories are watched for this project
        directoriesWatchedForTsconfig: string[] = [];

        constructor(projectService: ProjectService, documentRegistry: ts.DocumentRegistry) {
            super(ProjectKind.Inferred, projectService, documentRegistry, /*files*/ undefined, /*compilerOptions*/ undefined);
        }

        close() {
            super.close();

            for (const directory of this.directoriesWatchedForTsconfig) {
                this.projectService.stopWatchingDirectory(directory);
            }
        }
    }

    function findVersionedProjectByFileName<T extends VersionedProject>(projectFileName: string, projects: T[]): T {
        for (const proj of projects) {
            if (proj.getProjectFileName() === projectFileName) {
                return proj;
            }
        }
    }

    abstract class VersionedProject extends Project {

        private lastReportedFileNames: Map<string>;
        private lastReportedVersion: number = 0;
        currentVersion: number = 1;

        updateGraph() {
            const oldProgram = this.program;

            super.updateGraph();

            if (!oldProgram || !oldProgram.structureIsReused) {
                this.currentVersion++;
            }
        }

        getChangesSinceVersion(lastKnownVersion?: number): protocol.ExternalProjectFiles {
            const info = {
                projectFileName: this.getProjectFileName(),
                version: this.currentVersion
            };
            if (this.lastReportedFileNames && lastKnownVersion === this.lastReportedVersion) {
                if (this.currentVersion == this.lastReportedVersion) {
                    return { info };
                }
                const lastReportedFileNames = this.lastReportedFileNames;
                const currentFiles = arrayToMap(this.getFileNames(), x => x);

                const added: string[] = [];
                const removed: string[] = [];
                for (const id in currentFiles) {
                    if (hasProperty(currentFiles, id) && !hasProperty(lastReportedFileNames, id)) {
                        added.push(id);
                    }
                }
                for (const id in lastReportedFileNames) {
                    if (hasProperty(lastReportedFileNames, id) && !hasProperty(currentFiles, id)) {
                        removed.push(id);
                    }
                }
                this.lastReportedFileNames = currentFiles;

                this.lastReportedFileNames = currentFiles;
                this.lastReportedVersion = this.currentVersion;
                return { info, changes: { added, removed } };
            }
            else {
                // unknown version - return everything
                const projectFileNames = this.getFileNames();
                this.lastReportedFileNames = arrayToMap(projectFileNames, x => x);
                this.lastReportedVersion = this.currentVersion;
                return { info, files: projectFileNames };
            }
        }
    }

    class ConfiguredProject extends VersionedProject {
        private projectFileWatcher: FileWatcher;
        private directoryWatcher: FileWatcher;
        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        constructor(readonly configFileName: string, projectService: ProjectService, documentRegistry: ts.DocumentRegistry, hasExplicitListOfFiles: boolean, compilerOptions: CompilerOptions) {
            super(ProjectKind.Configured, projectService, documentRegistry, hasExplicitListOfFiles, compilerOptions);
        }

        getProjectFileName() {
            return this.configFileName;
        }

        watchConfigFile(callback: (project: ConfiguredProject) => void) {
            this.projectFileWatcher = this.projectService.host.watchFile(this.configFileName, _ => callback(this));
        }

        watchConfigDirectory(callback: (project: ConfiguredProject, path: string) => void) {
            const directoryToWatch = ts.getDirectoryPath(this.configFileName);
            this.projectService.log(`Add recursive watcher for: ${directoryToWatch}`);
            this.directoryWatcher = this.projectService.host.watchDirectory(directoryToWatch, path => callback(this, path), /*recursive*/ true);
        }

        close() {
            super.close();

            if (this.projectFileWatcher) {
                this.projectFileWatcher.close();
            }
            if (this.directoryWatcher) {
                this.directoryWatcher.close();
            }
        }

        addOpenRef() {
            this.openRefCount++;
        }

        deleteOpenRef() {
            this.openRefCount--;
            return this.openRefCount;
        }
    }

    class ExternalProject extends VersionedProject {
        constructor(readonly projectFileName: string, projectService: ProjectService, documentRegistry: ts.DocumentRegistry, compilerOptions: CompilerOptions) {
            super(ProjectKind.External, projectService, documentRegistry, /*hasExplicitListOfFiles*/ true, compilerOptions);
        }

        getProjectFileName() {
            return this.projectFileName;
        }
    }

    export interface ProjectOpenResult {
        success?: boolean;
        errorMsg?: string;
        project?: Project;
    }

    function copyListRemovingItem<T>(item: T, list: T[]) {
        const copiedList: T[] = [];
        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i] != item) {
                copiedList.push(list[i]);
            }
        }
        return copiedList;
    }

    /**
     * This helper funciton processes a list of projects and return the concatenated, sortd and deduplicated output of processing each project.
     */
    export function combineProjectOutput<T>(projects: Project[], action: (project: Project) => T[], comparer?: (a: T, b: T) => number, areEqual?: (a: T, b: T) => boolean) {
        const result = projects.reduce<T[]>((previous, current) => concatenate(previous, action(current)), []).sort(comparer);
        return projects.length > 1 ? deduplicate(result, areEqual) : result;
    }

    export interface ProjectServiceEventHandler {
        (eventName: string, project: Project, fileName: string): void;
    }

    export interface HostConfiguration {
        formatCodeOptions: ts.FormatCodeOptions;
        hostInfo: string;
    }

    export class ProjectService {
        private filenameToScriptInfo: ts.Map<ScriptInfo> = {};
        /** 
         * open, non-configured root files 
         **/
        openFileRoots: ScriptInfo[] = [];

        /**
         * maps external project file name to list of config files that were the part of this project
         */
        externalProjectToConfiguredProjectMap: ts.Map<string[]> = {};

        /**
         * external projects (configuration and list of root files is not controlled by tsserver)
         */
        externalProjects: ExternalProject[] = [];
        /**
         * projects built from openFileRoots
         **/
        inferredProjects: InferredProject[] = [];
        /**
         * projects specified by a tsconfig.json file
         **/
        configuredProjects: ConfiguredProject[] = [];
        /**
         * open files referenced by a project
         **/
        openFilesReferenced: ScriptInfo[] = [];
        /**
         * open files that are roots of a configured project
         **/
        openFileRootsConfigured: ScriptInfo[] = [];
        /**
         * a path to directory watcher map that detects added tsconfig files
         **/
        private directoryWatchersForTsconfig: ts.Map<FileWatcher> = {};
        /**
         * count of how many projects are using the directory watcher.
         * If the number becomes 0 for a watcher, then we should close it.
         **/
        private directoryWatchersRefCount: ts.Map<number> = {};

        private hostConfiguration: HostConfiguration;
        private timerForDetectingProjectFileListChanges: Map<any> = {};

        private documentRegistry: ts.DocumentRegistry;

        constructor(public host: ServerHost,
            public psLogger: Logger,
            public cancellationToken: HostCancellationToken,
            public eventHandler?: ProjectServiceEventHandler) {
            // ts.disableIncrementalParsing = true;
            this.setDefaultHostConfiguration();
            this.documentRegistry = ts.createDocumentRegistry(host.useCaseSensitiveFileNames, host.getCurrentDirectory());
        }

        private setDefaultHostConfiguration() {
            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeOptions(this.host),
                hostInfo: "Unknown host"
            };
        }

        stopWatchingDirectory(directory: string) {
            // if the ref count for this directory watcher drops to 0, it's time to close it
            this.directoryWatchersRefCount[directory]--;
            if (this.directoryWatchersRefCount[directory] === 0) {
                this.log("Close directory watcher for: " + directory);
                this.directoryWatchersForTsconfig[directory].close();
                delete this.directoryWatchersForTsconfig[directory];
            }
        }

        getFormatCodeOptions(file?: string) {
            if (file) {
                const info = this.filenameToScriptInfo[file];
                if (info) {
                    return info.formatCodeOptions;
                }
            }
            return this.hostConfiguration.formatCodeOptions;
        }

        private onSourceFileChanged(fileName: string) {
            const info = this.filenameToScriptInfo[fileName];
            if (!info) {
                this.psLogger.info("Error: got watch notification for unknown file: " + fileName);
            }

            if (!this.host.fileExists(fileName)) {
                // File was deleted
                this.handleDeletedFile(info);
            }
            else {
                if (info && (!info.isOpen)) {
                    info.svc.reloadFromFile(info.fileName);
                }
            }
        }

        private handleDeletedFile(info: ScriptInfo) {
            this.psLogger.info(info.fileName + " deleted");

            if (info.fileWatcher) {
                info.fileWatcher.close();
                info.fileWatcher = undefined;
            }

            if (!info.isOpen) {
                this.filenameToScriptInfo[info.fileName] = undefined;
                const referencingProjects = this.findReferencingProjects(info);
                if (info.defaultProject) {
                    info.defaultProject.removeRoot(info);
                }
                for (let i = 0, len = referencingProjects.length; i < len; i++) {
                    referencingProjects[i].removeReferencedFile(info);
                }
                for (let j = 0, flen = this.openFileRoots.length; j < flen; j++) {
                    const openFile = this.openFileRoots[j];
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.defaultProject, openFile.fileName);
                    }
                }
                for (let j = 0, flen = this.openFilesReferenced.length; j < flen; j++) {
                    const openFile = this.openFilesReferenced[j];
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.defaultProject, openFile.fileName);
                    }
                }
            }

            this.printProjects();
        }
        /**
         * This is the callback function when a watched directory has added or removed source code files.
         * @param project the project that associates with this directory watcher
         * @param fileName the absolute file name that changed in watched directory
         */
        private onSourceFileInDirectoryChangedForConfiguredProject(project: ConfiguredProject, fileName: string) {
            // If a change was made inside "folder/file", node will trigger the callback twice:
            // one with the fileName being "folder/file", and the other one with "folder".
            // We don't respond to the second one.
            if (fileName && !ts.isSupportedSourceFileName(fileName, project.getCompilerOptions())) {
                return;
            }

            this.log("Detected source file changes: " + fileName);
            const timeoutId = this.timerForDetectingProjectFileListChanges[project.configFileName];
            if (timeoutId) {
                this.host.clearTimeout(timeoutId);
            }
            this.timerForDetectingProjectFileListChanges[project.configFileName] = this.host.setTimeout(
                () => this.handleChangeInSourceFileForConfiguredProject(project),
                250
            );
        }

        private handleChangeInSourceFileForConfiguredProject(project: ConfiguredProject) {
            const { projectOptions } = this.configFileToProjectOptions(project.configFileName);

            const newRootFiles = projectOptions.files.map((f => this.getCanonicalFileName(f)));
            const currentRootFiles = project.getRootFiles().map((f => this.getCanonicalFileName(f)));

            // We check if the project file list has changed. If so, we update the project.
            if (!arrayIsEqualTo(currentRootFiles && currentRootFiles.sort(), newRootFiles && newRootFiles.sort())) {
                // For configured projects, the change is made outside the tsconfig file, and
                // it is not likely to affect the project for other files opened by the client. We can
                // just update the current project.
                this.updateConfiguredProject(project);

                // Call updateProjectStructure to clean up inferred projects we may have
                // created for the new files
                this.updateProjectStructure();
            }
        }

        private onConfigChangedForConfiguredProject(project: ConfiguredProject) {
            this.log("Config file changed: " + project.configFileName);
            this.updateConfiguredProject(project);
            this.updateProjectStructure();
        }

        /**
         * This is the callback function when a watched directory has an added tsconfig file.
         */
        private onConfigChangeForInferredProject(fileName: string) {
            if (ts.getBaseFileName(fileName) != "tsconfig.json") {
                this.log(fileName + " is not tsconfig.json");
                return;
            }

            this.log("Detected newly added tsconfig file: " + fileName);

            const { projectOptions } = this.configFileToProjectOptions(fileName);

            const rootFilesInTsconfig = projectOptions.files.map(f => this.getCanonicalFileName(f));
            // We should only care about the new tsconfig file if it contains any
            // opened root files of existing inferred projects
            for (const rootFile of this.openFileRoots) {
                if (contains(rootFilesInTsconfig, this.getCanonicalFileName(rootFile.fileName))) {
                    this.reloadProjects();
                    return;
                }
            }
        }

        private getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return ts.normalizePath(name);
        }

        private refreshConfiguredProjects() {
            const configuredProjects: ConfiguredProject[] = [];
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                const proj = this.configuredProjects[i];
                if (proj.openRefCount > 0) {
                    configuredProjects.push(proj);
                }
                else {
                    proj.close();
                }
            }
            this.configuredProjects = configuredProjects;
        }

       private removeProject(project: Project) {
            this.log("remove project: " + project.getRootFiles().toString());

            project.close();

            switch (project.projectKind) {
                case ProjectKind.External:
                    this.externalProjects = copyListRemovingItem(<ExternalProject>project, this.externalProjects);
                    break;
                case ProjectKind.Configured:
                    this.configuredProjects = copyListRemovingItem((<ConfiguredProject>project), this.configuredProjects);
                    break;
                case ProjectKind.Inferred:
                    this.inferredProjects = copyListRemovingItem((<InferredProject>project), this.inferredProjects);
                    break;
            }

            for (const fileName of project.getFileNames()) {
                const info = this.getScriptInfo(fileName);
                if (info.defaultProject === project) {
                    info.defaultProject = undefined;
                }
            }
        }

        private findContainingConfiguredProject(info: ScriptInfo): ConfiguredProject {
            for (const proj of this.configuredProjects) {
                if (proj.isRoot(info)) {
                    return proj;
                }
            }
            return undefined;
        }

        private addOpenFile(info: ScriptInfo) {
            const externalProject = this.findContainingExternalProject(info.fileName);
            if (externalProject) {
                info.defaultProject = externalProject;
                return;
            }
            const configuredProject = this.findContainingConfiguredProject(info);
            if (configuredProject) {
                info.defaultProject = configuredProject;
                configuredProject.addOpenRef();

                // ?? better do this on file close
                this.refreshConfiguredProjects();
                return;
            }

            this.findReferencingProjects(info);
            if (info.defaultProject) {
                this.openFilesReferenced.push(info);
            }
            else {
                // create new inferred project p with the newly opened file as root
                info.defaultProject = this.createAndAddInferredProject(info);
                const openFileRoots: ScriptInfo[] = [];
                // for each inferred project root r
                for (const rootFile of this.openFileRoots) {
                    // if r referenced by the new project
                    if (info.defaultProject.containsScriptInfo(rootFile)) {
                        // remove project rooted at r
                        this.removeProject(rootFile.defaultProject);
                        // put r in referenced open file list
                        this.openFilesReferenced.push(rootFile);
                        // set default project of r to the new project
                        rootFile.defaultProject = info.defaultProject;
                    }
                    else {
                        // otherwise, keep r as root of inferred project
                        openFileRoots.push(rootFile);
                    }
                }
                this.openFileRoots = openFileRoots;
                this.openFileRoots.push(info);
            }
        }

        /**
          * Remove this file from the set of open, non-configured files.
          * @param info The file that has been closed or newly configured
          */
        private closeOpenFile(info: ScriptInfo) {
            // Closing file should trigger re-reading the file content from disk. This is
            // because the user may chose to discard the buffer content before saving
            // to the disk, and the server's version of the file can be out of sync.
            info.svc.reloadFromFile(info.fileName);

            const openFileRoots: ScriptInfo[] = [];
            let removedProject: Project;
            for (const rootFile of this.openFileRoots) {
                // if closed file is root of project
                if (info === rootFile) {
                    // remove that project and remember it
                    removedProject = info.defaultProject;
                }
                else {
                    openFileRoots.push(rootFile);
                }
            }

            this.openFileRoots = openFileRoots;
            if (!removedProject) {
                const openFileRootsConfigured: ScriptInfo[] = [];

                for (const configuredRoot of this.openFileRootsConfigured) {
                    if (info === configuredRoot) {
                        if ((<ConfiguredProject>info.defaultProject).deleteOpenRef() === 0) {
                            removedProject = info.defaultProject;
                        }
                    }
                    else {
                        openFileRootsConfigured.push(configuredRoot);
                    }
                }

                this.openFileRootsConfigured = openFileRootsConfigured;
            }
            if (removedProject) {
                this.removeProject(removedProject);
                const openFilesReferenced: ScriptInfo[] = [];
                const orphanFiles: ScriptInfo[] = [];
                // for all open, referenced files f
                for (const f of this.openFilesReferenced) {
                    // if f was referenced by the removed project, remember it
                    if (f.defaultProject === removedProject || !f.defaultProject) {
                        f.defaultProject = undefined;
                        orphanFiles.push(f);
                    }
                    else {
                        // otherwise add it back to the list of referenced files
                        openFilesReferenced.push(f);
                    }
                }
                this.openFilesReferenced = openFilesReferenced;
                // treat orphaned files as newly opened
                for (let i = 0, len = orphanFiles.length; i < len; i++) {
                    this.addOpenFile(orphanFiles[i]);
                }
            }
            else {
                this.openFilesReferenced = copyListRemovingItem(info, this.openFilesReferenced);
            }
            info.close();
        }

        private findContainingExternalProject(fileName: string): ExternalProject {
            fileName = normalizePath(fileName);
            for (const proj of this.externalProjects) {
                if (proj.containsFile(fileName)) {
                    return proj;
                }
            }
            return undefined;
        }

        /**
         * This function tries to search for a tsconfig.json for the given file. If we found it,
         * we first detect if there is already a configured project created for it: if so, we re-read
         * the tsconfig file content and update the project; otherwise we create a new one.
         */
        private openOrUpdateConfiguredProjectForFile(fileName: string): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            const searchPath = ts.normalizePath(getDirectoryPath(fileName));
            this.log("Search path: " + searchPath, "Info");
            // check if this file is already included in one of external projects
            const configFileName = this.findConfigFile(searchPath);
            if (configFileName) {
                this.log("Config file name: " + configFileName, "Info");
                const project = this.findConfiguredProjectByConfigFile(configFileName);
                if (!project) {
                    const { success, errors } = this.openConfigFile(configFileName, fileName);
                    if (!success) {
                        return { configFileName, configFileErrors: errors };
                    }
                    else {
                        // even if opening config file was successful, it could still
                        // contain errors that were tolerated.
                        this.log("Opened configuration file " + configFileName, "Info");
                        if (errors && errors.length > 0) {
                            return { configFileName, configFileErrors: errors };
                        }
                    }
                }
                else {
                    this.updateConfiguredProject(project);
                }
            }
            else {
                this.log("No config files found.");
            }
            return configFileName ? { configFileName } : {};
        }

        // This is different from the method the compiler uses because
        // the compiler can assume it will always start searching in the
        // current directory (the directory in which tsc was invoked).
        // The server must start searching from the directory containing
        // the newly opened file.
        private findConfigFile(searchPath: string): string {
            while (true) {
                const tsconfigFileName = ts.combinePaths(searchPath, "tsconfig.json");
                if (this.host.fileExists(tsconfigFileName)) {
                    return tsconfigFileName;
                }

                const jsconfigFileName = ts.combinePaths(searchPath, "jsconfig.json");
                if (this.host.fileExists(jsconfigFileName)) {
                    return jsconfigFileName;
                }

                const parentPath = ts.getDirectoryPath(searchPath);
                if (parentPath === searchPath) {
                    break;
                }
                searchPath = parentPath;
            }
            return undefined;
        }

        private printProjects() {
            if (!this.psLogger.isVerbose()) {
                return;
            }
            this.psLogger.startGroup();
            for (let i = 0, len = this.inferredProjects.length; i < len; i++) {
                const project = this.inferredProjects[i];
                project.updateGraph();
                this.psLogger.info("Project " + i.toString());
                this.psLogger.info(project.filesToString());
                this.psLogger.info("-----------------------------------------------");
            }
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                const project = this.configuredProjects[i];
                project.updateGraph();
                this.psLogger.info("Project (configured) " + (i + this.inferredProjects.length).toString());
                this.psLogger.info(project.filesToString());
                this.psLogger.info("-----------------------------------------------");
            }
            this.psLogger.info("Open file roots of inferred projects: ");
            for (let i = 0, len = this.openFileRoots.length; i < len; i++) {
                this.psLogger.info(this.openFileRoots[i].fileName);
            }
            this.psLogger.info("Open files referenced by inferred or configured projects: ");
            for (const referencedFile of this.openFilesReferenced) {
                const fileInfo = `${referencedFile.fileName} ${ProjectKind[referencedFile.defaultProject.projectKind]}`;
                this.psLogger.info(fileInfo);
            }
            this.psLogger.info("Open file roots of configured projects: ");
            for (let i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
                this.psLogger.info(this.openFileRootsConfigured[i].fileName);
            }
            this.psLogger.endGroup();
        }

        private findConfiguredProjectByConfigFile(configFileName: string) {
            return findVersionedProjectByFileName(configFileName, this.configuredProjects);
        }

        private findExternalProjectByProjectFileName(projectFileName: string) {
            return findVersionedProjectByFileName(projectFileName, this.externalProjects);
        }

        private configFileToProjectOptions(configFilename: string): { succeeded: boolean, projectOptions?: ProjectOptions, errors?: Diagnostic[] } {
            configFilename = ts.normalizePath(configFilename);
            // file references will be relative to dirPath (or absolute)
            const dirPath = ts.getDirectoryPath(configFilename);
            const contents = this.host.readFile(configFilename);
            const rawConfig: { config?: ProjectOptions; error?: Diagnostic; } = ts.parseConfigFileTextToJson(configFilename, contents);
            if (rawConfig.error) {
                return { succeeded: false, errors: [rawConfig.error] };
            }
            else {
                const configHasFilesProperty = rawConfig.config["files"] !== undefined;
                const parsedCommandLine = ts.parseJsonConfigFileContent(rawConfig.config, this.host, dirPath, /*existingOptions*/ {}, configFilename);
                Debug.assert(!!parsedCommandLine.fileNames);

                if (parsedCommandLine.errors && (parsedCommandLine.errors.length > 0)) {
                    return { succeeded: false, errors: parsedCommandLine.errors };
                }
                else if (parsedCommandLine.fileNames.length === 0) {
                    const error = createCompilerDiagnostic(Diagnostics.The_config_file_0_found_doesn_t_contain_any_source_files, configFilename);
                    return { succeeded: false, errors: [error] };
                }
                else {
                    const projectOptions: ProjectOptions = {
                        files: parsedCommandLine.fileNames,
                        compilerOptions: parsedCommandLine.options,
                        configHasFilesProperty
                    };
                    return { succeeded: true, projectOptions };
                }
            }

        }

        private createAndAddExternalProject(projectFileName: string, files: string[], compilerOptions: CompilerOptions, clientFileName?: string) {
            const project = new ExternalProject(projectFileName, this, this.documentRegistry, compilerOptions);
            const errors = this.addFilesToProject(project, files, clientFileName);
            this.externalProjects.push(project);
            return { project, errors };
        }

        private createAndAddConfiguredProject(configFileName: string, projectOptions: ProjectOptions, clientFileName?: string) {
            const project = new ConfiguredProject(configFileName, this, this.documentRegistry, projectOptions.configHasFilesProperty, projectOptions.compilerOptions);
            const errors = this.addFilesToProject(project, projectOptions.files, clientFileName);
            project.watchConfigFile(project => this.onConfigChangedForConfiguredProject(project));
            if (!projectOptions.configHasFilesProperty) {
                project.watchConfigDirectory((project, path) => this.onSourceFileInDirectoryChangedForConfiguredProject(project, path));
            }
            this.configuredProjects.push(project);
            return { project, errors };
        }

        private addFilesToProject(project: ConfiguredProject | ExternalProject, files: string[], clientFileName: string): Diagnostic[] {
            let errors: Diagnostic[];
            for (const rootFilename of files) {
                if (this.host.fileExists(rootFilename)) {
                    const info = this.getOrCreateScriptInfo(rootFilename, /*openedByClient*/ clientFileName == rootFilename);
                    project.addRoot(info);
                }
                else {
                    (errors || (errors = [])).push(createCompilerDiagnostic(Diagnostics.File_0_not_found, rootFilename));
                }
            }
            project.updateGraph();
            return errors;
        }

        private openConfigFile(configFileName: string, clientFileName?: string): { success: boolean, project?: ConfiguredProject, errors?: Diagnostic[] } {
            const { succeeded, projectOptions, errors } = this.configFileToProjectOptions(configFileName);
            if (!succeeded) {
                return { success: false, errors };
            }
            else {
                const { project, errors } = this.createAndAddConfiguredProject(configFileName, projectOptions, clientFileName);
                return { success: true, project, errors };
            }
        }

        private updateVersionedProjectWorker(project: VersionedProject, newRootFiles: string[], newOptions: CompilerOptions) {
            const oldRootFiles = project.getRootFiles();
            const newFileNames = ts.filter(newRootFiles, f => this.host.fileExists(f));
            const fileNamesToRemove = oldRootFiles.filter(f => !contains(newFileNames, f));
            const fileNamesToAdd = newFileNames.filter(f => !contains(oldRootFiles, f));

            for (const fileName of fileNamesToRemove) {
                const info = this.getScriptInfo(fileName);
                if (info) {
                    project.removeRoot(info);
                }
            }

            for (const fileName of fileNamesToAdd) {
                let info = this.getScriptInfo(fileName);
                if (!info) {
                    info = this.getOrCreateScriptInfo(fileName, /*openedByClient*/ false);
                }
                else {
                    // if the root file was opened by client, it would belong to either
                    // openFileRoots or openFileReferenced.
                    if (info.isOpen) {
                        if (contains(this.openFileRoots, info)) {
                            this.openFileRoots = copyListRemovingItem(info, this.openFileRoots);
                            if (info.defaultProject && info.defaultProject.projectKind === ProjectKind.Inferred) {
                                this.removeProject(info.defaultProject);
                            }
                        }
                        if (contains(this.openFilesReferenced, info)) {
                            this.openFilesReferenced = copyListRemovingItem(info, this.openFilesReferenced);
                        }
                        if (project.projectKind === ProjectKind.Configured)  {
                            this.openFileRootsConfigured.push(info);
                        }
                        info.defaultProject = project;
                    }
                }
                project.addRoot(info);
            }

            project.setCompilerOptions(newOptions);
            project.updateGraph();
        }

        private updateConfiguredProject(project: ConfiguredProject) {
            if (!this.host.fileExists(project.configFileName)) {
                this.log("Config file deleted");
                this.removeProject(project);
            }
            else {
                const { succeeded, projectOptions, errors } = this.configFileToProjectOptions(project.configFileName);
                if (!succeeded) {
                    return errors;
                }
                else {
                    this.updateVersionedProjectWorker(project, projectOptions.files, projectOptions.compilerOptions);
                }
            }
        }

        createAndAddInferredProject(root: ScriptInfo) {
            const project = new InferredProject(this, this.documentRegistry);
            project.addRoot(root);

            let currentPath = ts.getDirectoryPath(root.fileName);
            let parentPath = ts.getDirectoryPath(currentPath);
            while (currentPath != parentPath) {
                if (!this.directoryWatchersForTsconfig[currentPath]) {
                    this.log("Add watcher for: " + currentPath);
                    this.directoryWatchersForTsconfig[currentPath] = this.host.watchDirectory(currentPath, fileName => this.onConfigChangeForInferredProject(fileName));
                    this.directoryWatchersRefCount[currentPath] = 1;
                }
                else {
                    this.directoryWatchersRefCount[currentPath] += 1;
                }
                project.directoriesWatchedForTsconfig.push(currentPath);
                currentPath = parentPath;
                parentPath = ts.getDirectoryPath(parentPath);
            }

            project.updateGraph();
            this.inferredProjects.push(project);
            return project;
        }

        /**
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        getOrCreateScriptInfo(fileName: string, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
            fileName = ts.normalizePath(fileName);
            let info = ts.lookUp(this.filenameToScriptInfo, fileName);
            if (!info) {
                let content: string;
                if (this.host.fileExists(fileName)) {
                    content = fileContent || this.host.readFile(fileName);
                }
                if (!content) {
                    if (openedByClient) {
                        content = "";
                    }
                }
                if (content !== undefined) {
                    info = new ScriptInfo(this.host, fileName, content, openedByClient);
                    info.scriptKind = scriptKind;
                    info.setFormatOptions(this.getFormatCodeOptions());
                    this.filenameToScriptInfo[fileName] = info;
                    if (!info.isOpen) {
                        info.fileWatcher = this.host.watchFile(fileName, _ => { this.onSourceFileChanged(fileName); });
                    }
                }
            }
            if (info) {
                if (fileContent) {
                    info.svc.reload(fileContent);
                }
                if (openedByClient) {
                    info.isOpen = true;
                }
            }
            return info;
        }

        log(msg: string, type = "Err") {
            this.psLogger.msg(msg, type);
        }

        setHostConfiguration(args: ts.server.protocol.ConfigureRequestArguments) {
            if (args.file) {
                const info = this.filenameToScriptInfo[args.file];
                if (info) {
                    info.setFormatOptions(args.formatOptions);
                    this.log("Host configuration update for file " + args.file, "Info");
                }
            }
            else {
                if (args.hostInfo !== undefined) {
                    this.hostConfiguration.hostInfo = args.hostInfo;
                    this.log("Host information " + args.hostInfo, "Info");
                }
                if (args.formatOptions) {
                    mergeFormatOptions(this.hostConfiguration.formatCodeOptions, args.formatOptions);
                    this.log("Format host information updated", "Info");
                }
            }
        }

        closeLog() {
            this.psLogger.close();
        }

        findReferencingProjects(info: ScriptInfo, excludedProject?: Project) {
            const referencingProjects: Project[] = [];
            info.defaultProject = undefined;
            for (let i = 0, len = this.inferredProjects.length; i < len; i++) {
                const inferredProject = this.inferredProjects[i];
                inferredProject.updateGraph();
                if (inferredProject !== excludedProject) {
                    if (inferredProject.containsScriptInfo(info)) {
                        info.defaultProject = inferredProject;
                        referencingProjects.push(inferredProject);
                    }
                }
            }
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                const configuredProject = this.configuredProjects[i];
                configuredProject.updateGraph();
                if (configuredProject.containsScriptInfo(info)) {
                    info.defaultProject = configuredProject;
                    referencingProjects.push(configuredProject);
                }
            }
            return referencingProjects;
        }

        /**
         * This function rebuilds the project for every file opened by the client
         */
        reloadProjects() {
            this.log("reload projects.");
            // First check if there is new tsconfig file added for inferred project roots
            for (const info of this.openFileRoots) {
                this.openOrUpdateConfiguredProjectForFile(info.fileName);
            }
            this.updateProjectStructure();
        }

        /**
         * This function is to update the project structure for every projects.
         * It is called on the premise that all the configured projects are
         * up to date.
         */
        updateProjectStructure() {
            this.log("updating project structure from ...", "Info");
            this.printProjects();

            const unattachedOpenFiles: ScriptInfo[] = [];
            const openFileRootsConfigured: ScriptInfo[] = [];
            for (const info of this.openFileRootsConfigured) {
                const project = info.defaultProject;
                if (!project || !(project.containsScriptInfo(info))) {
                    info.defaultProject = undefined;
                    unattachedOpenFiles.push(info);
                }
                else {
                    openFileRootsConfigured.push(info);
                }
            }
            this.openFileRootsConfigured = openFileRootsConfigured;

            // First loop through all open files that are referenced by projects but are not
            // project roots.  For each referenced file, see if the default project still
            // references that file.  If so, then just keep the file in the referenced list.
            // If not, add the file to an unattached list, to be rechecked later.
            const openFilesReferenced: ScriptInfo[] = [];
            for (const referencedFile of this.openFilesReferenced) {
                referencedFile.defaultProject.updateGraph();
                if (referencedFile.defaultProject.containsScriptInfo(referencedFile)) {
                    openFilesReferenced.push(referencedFile);
                }
                else {
                    unattachedOpenFiles.push(referencedFile);
                }
            }
            this.openFilesReferenced = openFilesReferenced;

            // Then, loop through all of the open files that are project roots.
            // For each root file, note the project that it roots.  Then see if
            // any other projects newly reference the file.  If zero projects
            // newly reference the file, keep it as a root.  If one or more
            // projects newly references the file, remove its project from the
            // inferred projects list (since it is no longer a root) and add
            // the file to the open, referenced file list.
            const openFileRoots: ScriptInfo[] = [];
            for (const rootFile of this.openFileRoots) {
                const rootedProject = rootFile.defaultProject;
                const referencingProjects = this.findReferencingProjects(rootFile, rootedProject);

                if (rootFile.defaultProject && rootFile.defaultProject.projectKind !== ProjectKind.Inferred) {
                    // If the root file has already been added into a configured project,
                    // meaning the original inferred project is gone already.
                    if (rootedProject.projectKind === ProjectKind.Inferred) {
                        this.removeProject(rootedProject);
                    }
                    this.openFileRootsConfigured.push(rootFile);
                }
                else {
                    if (referencingProjects.length === 0) {
                        rootFile.defaultProject = rootedProject;
                        openFileRoots.push(rootFile);
                    }
                    else {
                        // remove project from inferred projects list because root captured
                        this.removeProject(rootedProject);
                        this.openFilesReferenced.push(rootFile);
                    }
                }
            }
            this.openFileRoots = openFileRoots;

            // Finally, if we found any open, referenced files that are no longer
            // referenced by their default project, treat them as newly opened
            // by the editor.
            for (let i = 0, len = unattachedOpenFiles.length; i < len; i++) {
                this.addOpenFile(unattachedOpenFiles[i]);
            }
            this.printProjects();
        }

        getScriptInfo(filename: string) {
            filename = ts.normalizePath(filename);
            return ts.lookUp(this.filenameToScriptInfo, filename);
        }

        /**
         * Open file whose contents is managed by the client
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            let configFileName: string;
            let configFileErrors: Diagnostic[];
            if (!this.findContainingExternalProject(fileName)) {
                ({ configFileName, configFileErrors } = this.openOrUpdateConfiguredProjectForFile(fileName));
            }
            const info = this.getOrCreateScriptInfo(fileName, /*openedByClient*/ true, fileContent, scriptKind);
            this.addOpenFile(info);
            this.printProjects();
            return { configFileName, configFileErrors };
        }

        /**
         * Close file whose contents is managed by the client
         * @param filename is absolute pathname
         */
        closeClientFile(filename: string) {
            const info = ts.lookUp(this.filenameToScriptInfo, filename);
            if (info) {
                this.closeOpenFile(info);
                info.isOpen = false;
            }
            this.printProjects();
        }

        getProjectForFile(filename: string) {
            const scriptInfo = ts.lookUp(this.filenameToScriptInfo, filename);
            if (scriptInfo) {
                return scriptInfo.defaultProject;
            }
        }

        private addExternalProjectFilesForVersionedProjects(knownProjects: protocol.ExternalProjectInfo[], projects: VersionedProject[], result: protocol.ExternalProjectFiles[]): void {
            for (const proj of projects) {
                const knownProject = ts.forEach(knownProjects, p => p.projectFileName === proj.getProjectFileName() && p);
                result.push(proj.getChangesSinceVersion(knownProject && knownProject.version));
            }
        }

        synchronizeProjectList(knownProjects: protocol.ExternalProjectInfo[]): protocol.ExternalProjectFiles[] {
            const files: protocol.ExternalProjectFiles[] = [];
            this.addExternalProjectFilesForVersionedProjects(knownProjects, this.externalProjects, files);
            this.addExternalProjectFilesForVersionedProjects(knownProjects, this.configuredProjects, files);
            for (const inferredProject of this.inferredProjects) {
                files.push({ files: inferredProject.getFileNames() });
            }
            return files;
        }

        applyChangesInOpenFiles(openFiles: protocol.NewOpenFile[], changedFiles: protocol.ChangedOpenFile[], closedFiles: string[]): void {
            for (const file of openFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName);
                Debug.assert(!scriptInfo || !scriptInfo.isOpen);
                this.openClientFile(file.fileName, file.content);
            }

            for (const file of changedFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName);
                Debug.assert(!!scriptInfo);
                for (const change of file.changes) {
                    scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
                }
            }

            for (const file of closedFiles) {
                this.closeClientFile(file);
            }

            this.updateProjectStructure();
        }

        closeExternalProject(fileName: string): void {
            fileName = normalizePath(fileName);
            const configFiles = this.externalProjectToConfiguredProjectMap[fileName];
            if (configFiles) {
                for (const configFile of configFiles) {
                    const configuredProject = this.findConfiguredProjectByConfigFile(configFile);
                    if (configuredProject) {
                        this.removeProject(configuredProject);
                        this.updateProjectStructure();
                    }
                }
            }
            else {
                // close external project
                const externalProject = this.findExternalProjectByProjectFileName(fileName);
                if (externalProject) {
                    this.removeProject(externalProject);
                    this.updateProjectStructure();
                }
            }
        }

        openExternalProject(proj: protocol.ExternalProject): void {
            const externalProject = this.findExternalProjectByProjectFileName(proj.projectFileName);
            if (externalProject) {
                this.updateVersionedProjectWorker(externalProject, proj.rootFiles, proj.options);
            }
            else {
                let tsConfigFiles: string[];
                const rootFiles: string[] = [];
                for (const file of proj.rootFiles) {
                    if (getBaseFileName(file) === "tsconfig.json") {
                        (tsConfigFiles || (tsConfigFiles = [])).push(file);
                    }
                    else {
                        rootFiles.push(file);
                    }
                }
                if (tsConfigFiles) {
                    // store the list of tsconfig files that belong to the external project
                    this.externalProjectToConfiguredProjectMap[proj.projectFileName] = tsConfigFiles;
                    for (const tsconfigFile of tsConfigFiles) {
                        const { success, project, errors } = this.openConfigFile(tsconfigFile);
                        if (success) {
                            // keep project alive - its lifetime is bound to the lifetime of containing external project
                            project.addOpenRef();
                        }
                    }
                }
                else {
                    this.createAndAddExternalProject(proj.projectFileName, proj.rootFiles, proj.options);
                }
            }
        }
    }
}

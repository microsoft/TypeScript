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

    interface Timestamped {
        lastCheckTime?: number;
    }

    interface TimestampedResolvedModule extends ResolvedModuleWithFailedLookupLocations, Timestamped {
    }

    interface TimestampedResolvedTypeReferenceDirective extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, Timestamped {
    }

    export class LSHost implements ts.LanguageServiceHost {
        private compilationSettings: ts.CompilerOptions;
        private resolvedModuleNames: ts.FileMap<Map<TimestampedResolvedModule>>;
        private resolvedTypeReferenceDirectives: ts.FileMap<Map<TimestampedResolvedTypeReferenceDirective>>;
        private moduleResolutionHost: ts.ModuleResolutionHost;

        constructor(private host: ServerHost, private project: Project) {
            this.resolvedModuleNames = createFileMap<Map<TimestampedResolvedModule>>();
            this.resolvedTypeReferenceDirectives = createFileMap<Map<TimestampedResolvedTypeReferenceDirective>>();
            this.moduleResolutionHost = {
                fileExists: fileName => this.fileExists(fileName),
                readFile: fileName => this.host.readFile(fileName),
                directoryExists: directoryName => this.host.directoryExists(directoryName)
            };
        }

        private resolveNamesWithLocalCache<T extends Timestamped & { failedLookupLocations: string[] }, R>(
            names: string[],
            containingFile: string,
            cache: ts.FileMap<Map<T>>,
            loader: (name: string, containingFile: string, options: CompilerOptions, host: ModuleResolutionHost) => T,
            getResult: (s: T) => R): R[] {

            const path = toPath(containingFile, this.host.getCurrentDirectory(), this.project.getCanonicalFileName);
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
                        resolution = loader(name, containingFile, compilerOptions, this.moduleResolutionHost);
                        resolution.lastCheckTime = Date.now();
                        newResolutions[name] = resolution;
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
                    // TODO: use lastCheckTime to track expiration for module name resolution
                    return true;
                }

                // consider situation if we have no candidate locations as valid resolution.
                // after all there is no point to invalidate it if we have no idea where to look for the module.
                return resolution.failedLookupLocations.length === 0;
            }
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
    }

    export interface ProjectOptions {
        // these fields can be present in the project file
        files?: string[];
        compilerOptions?: ts.CompilerOptions;
    }

    export class Project {
        private lsHost: LSHost;
        languageService: LanguageService;
        projectFilename: string;
        projectFileWatcher: FileWatcher;
        directoryWatcher: FileWatcher;
        // Used to keep track of what directories are watched for this project
        directoriesWatchedForTsconfig: string[] = [];
        program: ts.Program;
        filenameToSourceFile: ts.Map<ts.SourceFile> = {};
        updateGraphSeq = 0;
        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        getCanonicalFileName: (fileName: string) => string;

        private rootFiles: ScriptInfo[] = [];
        private pathToScriptInfo: ts.FileMap<ScriptInfo>;

        constructor(public projectService: ProjectService, documentRegistry: ts.DocumentRegistry, public projectOptions?: ProjectOptions) {
            this.pathToScriptInfo = ts.createFileMap<ScriptInfo>();
            this.getCanonicalFileName = ts.createGetCanonicalFileName(this.projectService.host.useCaseSensitiveFileNames);
            if (projectOptions && projectOptions.files) {
                // If files are listed explicitly, allow all extensions
                projectOptions.compilerOptions.allowNonTsExtensions = true;
            }
            this.lsHost = new LSHost(this.projectService.host, this);
            if (projectOptions && projectOptions.compilerOptions) {
                this.lsHost.setCompilationSettings(projectOptions.compilerOptions);
            }
            else {
                const defaultOpts = ts.getDefaultCompilerOptions();
                defaultOpts.allowNonTsExtensions = true;
                defaultOpts.allowJs = true;
                this.lsHost.setCompilationSettings(defaultOpts);
            }
            this.languageService = ts.createLanguageService(this.lsHost, documentRegistry);
        }

        addOpenRef() {
            this.openRefCount++;
        }

        deleteOpenRef() {
            this.openRefCount--;
            return this.openRefCount;
        }

        openReferencedFile(filename: string) {
            return this.projectService.openFile(filename, /*openedByClient*/ false);
        }

        getRootFiles() {
            return this.rootFiles.map(info => info.fileName);
        }

        getFileNames() {
            const sourceFiles = this.program.getSourceFiles();
            return sourceFiles.map(sourceFile => sourceFile.fileName);
        }

        getSourceFile(info: ScriptInfo) {
            return this.filenameToSourceFile[info.fileName];
        }

        getSourceFileFromName(filename: string, requireOpen?: boolean) {
            const info = this.projectService.getScriptInfo(filename);
            if (info) {
                if ((!requireOpen) || info.isOpen) {
                    return this.getSourceFile(info);
                }
            }
        }

        isRoot(info: ScriptInfo) {
            return this.rootFiles.some(root => root === info);
        }

        removeReferencedFile(info: ScriptInfo) {
            if (!info.isOpen) {
                this.pathToScriptInfo.remove(info.path);
                this.lsHost.removeReferencedFile(info);
            }
            this.updateGraph();
        }

        updateFileMap() {
            this.filenameToSourceFile = {};
            const sourceFiles = this.program.getSourceFiles();
            for (let i = 0, len = sourceFiles.length; i < len; i++) {
                const normFilename = ts.normalizePath(sourceFiles[i].fileName);
                this.filenameToSourceFile[normFilename] = sourceFiles[i];
            }
        }

        finishGraph() {
            this.updateGraph();
            this.languageService.getNavigateToItems(".*");
        }

        updateGraph() {
            this.program = this.languageService.getProgram();
            this.updateFileMap();
        }

        isConfiguredProject() {
            return this.projectFilename;
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            if (!this.pathToScriptInfo.contains(info.path)) {
                this.pathToScriptInfo.set(info.path, info);
                this.rootFiles.push(info);
            }
        }

        // remove a root file from project
        removeRoot(info: ScriptInfo) {
            if (!this.pathToScriptInfo.contains(info.path)) {
                this.pathToScriptInfo.remove(info.path);
                this.rootFiles = copyListRemovingItem(info, this.rootFiles);
                this.lsHost.removeRoot(info);
            }
        }

        getScriptInfo(fileName: string) {
            const path = toPath(fileName, this.projectService.host.getCurrentDirectory(), this.getCanonicalFileName);
            let scriptInfo = this.pathToScriptInfo.get(path);
            if (!scriptInfo) {
                scriptInfo = this.openReferencedFile(fileName);
                if (scriptInfo) {
                    this.pathToScriptInfo.set(path, scriptInfo);
                }
            }
            return scriptInfo;
        }

        filesToString() {
            let strBuilder = "";
            ts.forEachValue(this.filenameToSourceFile,
                sourceFile => { strBuilder += sourceFile.fileName + "\n"; });
            return strBuilder;
        }

        setProjectOptions(projectOptions: ProjectOptions) {
            this.projectOptions = projectOptions;
            if (projectOptions.compilerOptions) {
                projectOptions.compilerOptions.allowNonTsExtensions = true;
                this.lsHost.setCompilationSettings(projectOptions.compilerOptions);
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

        editScript(filename: string, start: number, end: number, newText: string) {
            const script = this.getScriptInfo(filename);
            if (script) {
                script.editContent(start, end, newText);
                return;
            }

            throw new Error("No script with name '" + filename + "'");
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
        filenameToScriptInfo: ts.Map<ScriptInfo> = {};
        // open, non-configured root files
        openFileRoots: ScriptInfo[] = [];
        // projects built from openFileRoots
        inferredProjects: Project[] = [];
        // projects specified by a tsconfig.json file
        configuredProjects: Project[] = [];
        // open files referenced by a project
        openFilesReferenced: ScriptInfo[] = [];
        // open files that are roots of a configured project
        openFileRootsConfigured: ScriptInfo[] = [];
        // a path to directory watcher map that detects added tsconfig files
        directoryWatchersForTsconfig: ts.Map<FileWatcher> = {};
        // count of how many projects are using the directory watcher. If the
        // number becomes 0 for a watcher, then we should close it.
        directoryWatchersRefCount: ts.Map<number> = {};
        hostConfiguration: HostConfiguration;
        timerForDetectingProjectFileListChanges: Map<any> = {};

        documentRegistry: ts.DocumentRegistry;

        constructor(public host: ServerHost, public psLogger: Logger, public eventHandler?: ProjectServiceEventHandler) {
            // ts.disableIncrementalParsing = true;
            this.addDefaultHostConfiguration();
            this.documentRegistry = ts.createDocumentRegistry(host.useCaseSensitiveFileNames, host.getCurrentDirectory());
        }

        addDefaultHostConfiguration() {
            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeOptions(this.host),
                hostInfo: "Unknown host"
            };
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

        watchedFileChanged(fileName: string) {
            const info = this.filenameToScriptInfo[fileName];
            if (!info) {
                this.psLogger.info("Error: got watch notification for unknown file: " + fileName);
            }

            if (!this.host.fileExists(fileName)) {
                // File was deleted
                this.fileDeletedInFilesystem(info);
            }
            else {
                if (info && (!info.isOpen)) {
                    info.svc.reloadFromFile(info.fileName);
                }
            }
        }

        /**
         * This is the callback function when a watched directory has added or removed source code files.
         * @param project the project that associates with this directory watcher
         * @param fileName the absolute file name that changed in watched directory
         */
        directoryWatchedForSourceFilesChanged(project: Project, fileName: string) {
            // If a change was made inside "folder/file", node will trigger the callback twice:
            // one with the fileName being "folder/file", and the other one with "folder".
            // We don't respond to the second one.
            if (fileName && !ts.isSupportedSourceFileName(fileName, project.projectOptions ? project.projectOptions.compilerOptions : undefined)) {
                return;
            }

            this.log("Detected source file changes: " + fileName);
            this.startTimerForDetectingProjectFileListChanges(project);
        }

        startTimerForDetectingProjectFileListChanges(project: Project) {
            if (this.timerForDetectingProjectFileListChanges[project.projectFilename]) {
                this.host.clearTimeout(this.timerForDetectingProjectFileListChanges[project.projectFilename]);
            }
            this.timerForDetectingProjectFileListChanges[project.projectFilename] = this.host.setTimeout(
                () => this.handleProjectFileListChanges(project),
                250
            );
        }

        handleProjectFileListChanges(project: Project) {
            const { projectOptions } = this.configFileToProjectOptions(project.projectFilename);

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

        /**
         * This is the callback function when a watched directory has an added tsconfig file.
         */
        directoryWatchedForTsconfigChanged(fileName: string) {
            if (ts.getBaseFileName(fileName) != "tsconfig.json") {
                this.log(fileName + " is not tsconfig.json");
                return;
            }

            this.log("Detected newly added tsconfig file: " + fileName);

            const { projectOptions } = this.configFileToProjectOptions(fileName);

            const rootFilesInTsconfig = projectOptions.files.map(f => this.getCanonicalFileName(f));
            const openFileRoots = this.openFileRoots.map(s => this.getCanonicalFileName(s.fileName));

            // We should only care about the new tsconfig file if it contains any
            // opened root files of existing inferred projects
            for (const openFileRoot of openFileRoots) {
                if (rootFilesInTsconfig.indexOf(openFileRoot) >= 0) {
                    this.reloadProjects();
                    return;
                }
            }
        }

        getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return ts.normalizePath(name);
        }

        watchedProjectConfigFileChanged(project: Project) {
            this.log("Config file changed: " + project.projectFilename);
            this.updateConfiguredProject(project);
            this.updateProjectStructure();
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

        createInferredProject(root: ScriptInfo) {
            const project = new Project(this, this.documentRegistry);
            project.addRoot(root);

            let currentPath = ts.getDirectoryPath(root.fileName);
            let parentPath = ts.getDirectoryPath(currentPath);
            while (currentPath != parentPath) {
                if (!project.projectService.directoryWatchersForTsconfig[currentPath]) {
                    this.log("Add watcher for: " + currentPath);
                    project.projectService.directoryWatchersForTsconfig[currentPath] =
                        this.host.watchDirectory(currentPath, fileName => this.directoryWatchedForTsconfigChanged(fileName));
                    project.projectService.directoryWatchersRefCount[currentPath] = 1;
                }
                else {
                    project.projectService.directoryWatchersRefCount[currentPath] += 1;
                }
                project.directoriesWatchedForTsconfig.push(currentPath);
                currentPath = parentPath;
                parentPath = ts.getDirectoryPath(parentPath);
            }

            project.finishGraph();
            this.inferredProjects.push(project);
            return project;
        }

        fileDeletedInFilesystem(info: ScriptInfo) {
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

        updateConfiguredProjectList() {
            const configuredProjects: Project[] = [];
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                if (this.configuredProjects[i].openRefCount > 0) {
                    configuredProjects.push(this.configuredProjects[i]);
                }
            }
            this.configuredProjects = configuredProjects;
        }

        removeProject(project: Project) {
            this.log("remove project: " + project.getRootFiles().toString());
            if (project.isConfiguredProject()) {
                project.projectFileWatcher.close();
                project.directoryWatcher.close();
                this.configuredProjects = copyListRemovingItem(project, this.configuredProjects);
            }
            else {
                for (const directory of project.directoriesWatchedForTsconfig) {
                    // if the ref count for this directory watcher drops to 0, it's time to close it
                    project.projectService.directoryWatchersRefCount[directory]--;
                    if (!project.projectService.directoryWatchersRefCount[directory]) {
                        this.log("Close directory watcher for: " + directory);
                        project.projectService.directoryWatchersForTsconfig[directory].close();
                        delete project.projectService.directoryWatchersForTsconfig[directory];
                    }
                }
                this.inferredProjects = copyListRemovingItem(project, this.inferredProjects);
            }

            const fileNames = project.getFileNames();
            for (const fileName of fileNames) {
                const info = this.getScriptInfo(fileName);
                if (info.defaultProject == project) {
                    info.defaultProject = undefined;
                }
            }
        }

        setConfiguredProjectRoot(info: ScriptInfo) {
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                const configuredProject = this.configuredProjects[i];
                if (configuredProject.isRoot(info)) {
                    info.defaultProject = configuredProject;
                    configuredProject.addOpenRef();
                    return true;
                }
            }
            return false;
        }

        addOpenFile(info: ScriptInfo) {
            if (this.setConfiguredProjectRoot(info)) {
                this.openFileRootsConfigured.push(info);
            }
            else {
                this.findReferencingProjects(info);
                if (info.defaultProject) {
                    this.openFilesReferenced.push(info);
                }
                else {
                    // create new inferred project p with the newly opened file as root
                    info.defaultProject = this.createInferredProject(info);
                    const openFileRoots: ScriptInfo[] = [];
                    // for each inferred project root r
                    for (let i = 0, len = this.openFileRoots.length; i < len; i++) {
                        const r = this.openFileRoots[i];
                        // if r referenced by the new project
                        if (info.defaultProject.getSourceFile(r)) {
                            // remove project rooted at r
                            this.removeProject(r.defaultProject);
                            // put r in referenced open file list
                            this.openFilesReferenced.push(r);
                            // set default project of r to the new project
                            r.defaultProject = info.defaultProject;
                        }
                        else {
                            // otherwise, keep r as root of inferred project
                            openFileRoots.push(r);
                        }
                    }
                    this.openFileRoots = openFileRoots;
                    this.openFileRoots.push(info);
                }
            }
            this.updateConfiguredProjectList();
        }

        /**
          * Remove this file from the set of open, non-configured files.
          * @param info The file that has been closed or newly configured
          */
        closeOpenFile(info: ScriptInfo) {
            // Closing file should trigger re-reading the file content from disk. This is
            // because the user may chose to discard the buffer content before saving
            // to the disk, and the server's version of the file can be out of sync.
            info.svc.reloadFromFile(info.fileName);

            const openFileRoots: ScriptInfo[] = [];
            let removedProject: Project;
            for (let i = 0, len = this.openFileRoots.length; i < len; i++) {
                // if closed file is root of project
                if (info === this.openFileRoots[i]) {
                    // remove that project and remember it
                    removedProject = info.defaultProject;
                }
                else {
                    openFileRoots.push(this.openFileRoots[i]);
                }
            }
            this.openFileRoots = openFileRoots;
            if (!removedProject) {
                const openFileRootsConfigured: ScriptInfo[] = [];

                for (let i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
                    if (info === this.openFileRootsConfigured[i]) {
                        if (info.defaultProject.deleteOpenRef() === 0) {
                            removedProject = info.defaultProject;
                        }
                    }
                    else {
                        openFileRootsConfigured.push(this.openFileRootsConfigured[i]);
                    }
                }

                this.openFileRootsConfigured = openFileRootsConfigured;
            }
            if (removedProject) {
                this.removeProject(removedProject);
                const openFilesReferenced: ScriptInfo[] = [];
                const orphanFiles: ScriptInfo[] = [];
                // for all open, referenced files f
                for (let i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                    const f = this.openFilesReferenced[i];
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

        findReferencingProjects(info: ScriptInfo, excludedProject?: Project) {
            const referencingProjects: Project[] = [];
            info.defaultProject = undefined;
            for (let i = 0, len = this.inferredProjects.length; i < len; i++) {
                const inferredProject = this.inferredProjects[i];
                inferredProject.updateGraph();
                if (inferredProject !== excludedProject) {
                    if (inferredProject.getSourceFile(info)) {
                        info.defaultProject = inferredProject;
                        referencingProjects.push(inferredProject);
                    }
                }
            }
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                const configuredProject = this.configuredProjects[i];
                configuredProject.updateGraph();
                if (configuredProject.getSourceFile(info)) {
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
                if (!project || !(project.getSourceFile(info))) {
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
            for (let i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                const referencedFile = this.openFilesReferenced[i];
                referencedFile.defaultProject.updateGraph();
                const sourceFile = referencedFile.defaultProject.getSourceFile(referencedFile);
                if (sourceFile) {
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
            for (let i = 0, len = this.openFileRoots.length; i < len; i++) {
                const rootFile = this.openFileRoots[i];
                const rootedProject = rootFile.defaultProject;
                const referencingProjects = this.findReferencingProjects(rootFile, rootedProject);

                if (rootFile.defaultProject && rootFile.defaultProject.isConfiguredProject()) {
                    // If the root file has already been added into a configured project,
                    // meaning the original inferred project is gone already.
                    if (!rootedProject.isConfiguredProject()) {
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
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        openFile(fileName: string, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
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
                        info.fileWatcher = this.host.watchFile(fileName, _ => { this.watchedFileChanged(fileName); });
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

        // This is different from the method the compiler uses because
        // the compiler can assume it will always start searching in the
        // current directory (the directory in which tsc was invoked).
        // The server must start searching from the directory containing
        // the newly opened file.
        findConfigFile(searchPath: string): string {
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

        /**
         * Open file whose contents is managed by the client
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            const { configFileName, configFileErrors } = this.openOrUpdateConfiguredProjectForFile(fileName);
            const info = this.openFile(fileName, /*openedByClient*/ true, fileContent, scriptKind);
            this.addOpenFile(info);
            this.printProjects();
            return { configFileName, configFileErrors };
        }

        /**
         * This function tries to search for a tsconfig.json for the given file. If we found it,
         * we first detect if there is already a configured project created for it: if so, we re-read
         * the tsconfig file content and update the project; otherwise we create a new one.
         */
        openOrUpdateConfiguredProjectForFile(fileName: string): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            const searchPath = ts.normalizePath(getDirectoryPath(fileName));
            this.log("Search path: " + searchPath, "Info");
            const configFileName = this.findConfigFile(searchPath);
            if (configFileName) {
                this.log("Config file name: " + configFileName, "Info");
                const project = this.findConfiguredProjectByConfigFile(configFileName);
                if (!project) {
                    const configResult = this.openConfigFile(configFileName, fileName);
                    if (!configResult.success) {
                        return { configFileName, configFileErrors: configResult.errors };
                    }
                    else {
                        // even if opening config file was successful, it could still
                        // contain errors that were tolerated.
                        this.log("Opened configuration file " + configFileName, "Info");
                        this.configuredProjects.push(configResult.project);
                        if (configResult.errors && configResult.errors.length > 0) {
                            return { configFileName, configFileErrors: configResult.errors };
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
            return {};
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

        printProjectsForFile(filename: string) {
            const scriptInfo = ts.lookUp(this.filenameToScriptInfo, filename);
            if (scriptInfo) {
                this.psLogger.startGroup();
                this.psLogger.info("Projects for " + filename);
                const projects = this.findReferencingProjects(scriptInfo);
                for (let i = 0, len = projects.length; i < len; i++) {
                    this.psLogger.info("Project " + i.toString());
                }
                this.psLogger.endGroup();
            }
            else {
                this.psLogger.info(filename + " not in any project");
            }
        }

        printProjects() {
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
            for (let i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                let fileInfo = this.openFilesReferenced[i].fileName;
                if (this.openFilesReferenced[i].defaultProject.isConfiguredProject()) {
                    fileInfo += " (configured)";
                }
                this.psLogger.info(fileInfo);
            }
            this.psLogger.info("Open file roots of configured projects: ");
            for (let i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
                this.psLogger.info(this.openFileRootsConfigured[i].fileName);
            }
            this.psLogger.endGroup();
        }

        configProjectIsActive(fileName: string) {
            return this.findConfiguredProjectByConfigFile(fileName) === undefined;
        }

        findConfiguredProjectByConfigFile(configFileName: string) {
            for (let i = 0, len = this.configuredProjects.length; i < len; i++) {
                if (this.configuredProjects[i].projectFilename == configFileName) {
                    return this.configuredProjects[i];
                }
            }
            return undefined;
        }

        configFileToProjectOptions(configFilename: string): { succeeded: boolean, projectOptions?: ProjectOptions, errors?: Diagnostic[] } {
            configFilename = ts.normalizePath(configFilename);
            // file references will be relative to dirPath (or absolute)
            const dirPath = ts.getDirectoryPath(configFilename);
            const contents = this.host.readFile(configFilename);
            const rawConfig: { config?: ProjectOptions; error?: Diagnostic; } = ts.parseConfigFileTextToJson(configFilename, contents);
            if (rawConfig.error) {
                return { succeeded: false, errors: [rawConfig.error] };
            }
            else {
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
                        compilerOptions: parsedCommandLine.options
                    };
                    return { succeeded: true, projectOptions };
                }
            }

        }

        openConfigFile(configFilename: string, clientFileName?: string): { success: boolean, project?: Project, errors?: Diagnostic[] } {
            const { succeeded, projectOptions, errors } = this.configFileToProjectOptions(configFilename);
            if (!succeeded) {
                return { success: false, errors };
            }
            else {
                const project = this.createProject(configFilename, projectOptions);
                let errors: Diagnostic[];
                for (const rootFilename of projectOptions.files) {
                    if (this.host.fileExists(rootFilename)) {
                        const info = this.openFile(rootFilename, /*openedByClient*/ clientFileName == rootFilename);
                        project.addRoot(info);
                    }
                    else {
                        (errors || (errors = [])).push(createCompilerDiagnostic(Diagnostics.File_0_not_found, rootFilename));
                    }
                }
                project.finishGraph();
                project.projectFileWatcher = this.host.watchFile(configFilename, _ => this.watchedProjectConfigFileChanged(project));
                this.log("Add recursive watcher for: " + ts.getDirectoryPath(configFilename));
                project.directoryWatcher = this.host.watchDirectory(
                    ts.getDirectoryPath(configFilename),
                    path => this.directoryWatchedForSourceFilesChanged(project, path),
                    /*recursive*/ true
                );
                return { success: true, project: project, errors };
            }
        }

        updateConfiguredProject(project: Project) {
            if (!this.host.fileExists(project.projectFilename)) {
                this.log("Config file deleted");
                this.removeProject(project);
            }
            else {
                const { succeeded, projectOptions, errors } = this.configFileToProjectOptions(project.projectFilename);
                if (!succeeded) {
                    return errors;
                }
                else {
                    const oldFileNames = project.getRootFiles();
                    const newFileNames = ts.filter(projectOptions.files, f => this.host.fileExists(f));
                    const fileNamesToRemove = oldFileNames.filter(f => newFileNames.indexOf(f) < 0);
                    const fileNamesToAdd = newFileNames.filter(f => oldFileNames.indexOf(f) < 0);

                    for (const fileName of fileNamesToRemove) {
                        const info = this.getScriptInfo(fileName);
                        if (info) {
                            project.removeRoot(info);
                        }
                    }

                    for (const fileName of fileNamesToAdd) {
                        let info = this.getScriptInfo(fileName);
                        if (!info) {
                            info = this.openFile(fileName, /*openedByClient*/ false);
                        }
                        else {
                            // if the root file was opened by client, it would belong to either
                            // openFileRoots or openFileReferenced.
                            if (info.isOpen) {
                                if (this.openFileRoots.indexOf(info) >= 0) {
                                    this.openFileRoots = copyListRemovingItem(info, this.openFileRoots);
                                    if (info.defaultProject && !info.defaultProject.isConfiguredProject()) {
                                        this.removeProject(info.defaultProject);
                                    }
                                }
                                if (this.openFilesReferenced.indexOf(info) >= 0) {
                                    this.openFilesReferenced = copyListRemovingItem(info, this.openFilesReferenced);
                                }
                                this.openFileRootsConfigured.push(info);
                                info.defaultProject = project;
                            }
                        }
                        project.addRoot(info);
                    }

                    project.setProjectOptions(projectOptions);
                    project.finishGraph();
                }
            }
        }

        createProject(projectFilename: string, projectOptions?: ProjectOptions) {
            const project = new Project(this, this.documentRegistry, projectOptions);
            project.projectFilename = projectFilename;
            return project;
        }
    }
}

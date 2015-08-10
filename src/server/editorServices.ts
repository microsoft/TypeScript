/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="session.ts" />

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

    var lineCollectionCapacity = 4;

    function mergeFormatOptions(formatCodeOptions: FormatCodeOptions, formatOptions: protocol.FormatOptions): void {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        Object.keys(formatOptions).forEach((key) => {
            var codeKey = key.charAt(0).toUpperCase() + key.substring(1);
            if (hasOwnProperty.call(formatCodeOptions, codeKey)) {
                formatCodeOptions[codeKey] = formatOptions[key];
            }
        });
    }

    export class ScriptInfo {
        svc: ScriptVersionCache;
        children: ScriptInfo[] = [];     // files referenced by this file
        defaultProject: Project;      // project to use by default for file
        fileWatcher: FileWatcher;
        formatCodeOptions = ts.clone(CompilerService.defaultFormatCodeOptions);

        constructor(private host: ServerHost, public fileName: string, public content: string, public isOpen = false) {
            this.svc = ScriptVersionCache.fromString(host, content);
        }

        setFormatOptions(formatOptions: protocol.FormatOptions): void {
            if (formatOptions) {
                mergeFormatOptions(this.formatCodeOptions, formatOptions);
            }
        }

        close() {
            this.isOpen = false;
        }

        addChild(childInfo: ScriptInfo) {
            this.children.push(childInfo);
        }

        snap() {
            return this.svc.getSnapshot();
        }

        getText() {
            var snap = this.snap();
            return snap.getText(0, snap.getLength());
        }

        getLineInfo(line: number) {
            var snap = this.snap();
            return snap.index.lineNumberToInfo(line);
        }

        editContent(start: number, end: number, newText: string): void {
            this.svc.edit(start, end - start, newText);
        }

        getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange {
            return this.svc.getTextChangesBetweenVersions(startVersion, endVersion);
        }

        getChangeRange(oldSnapshot: ts.IScriptSnapshot): ts.TextChangeRange {
            return this.snap().getChangeRange(oldSnapshot);
        }
    }

    export class LSHost implements ts.LanguageServiceHost {
        ls: ts.LanguageService = null;
        compilationSettings: ts.CompilerOptions;
        filenameToScript: ts.Map<ScriptInfo> = {};
        roots: ScriptInfo[] = [];

        constructor(public host: ServerHost, public project: Project) {
        }

        getDefaultLibFileName() {
            var nodeModuleBinDir = ts.getDirectoryPath(ts.normalizePath(this.host.getExecutingFilePath()));
            return ts.combinePaths(nodeModuleBinDir, ts.getDefaultLibFileName(this.compilationSettings));
        }

        getScriptSnapshot(filename: string): ts.IScriptSnapshot {
            var scriptInfo = this.getScriptInfo(filename);
            if (scriptInfo) {
                return scriptInfo.snap();
            }
        }

        setCompilationSettings(opt: ts.CompilerOptions) {
            this.compilationSettings = opt;
        }

        lineAffectsRefs(filename: string, line: number) {
            var info = this.getScriptInfo(filename);
            var lineInfo = info.getLineInfo(line);
            if (lineInfo && lineInfo.text) {
                var regex = /reference|import|\/\*|\*\//;
                return regex.test(lineInfo.text);
            }
        }

        getCompilationSettings() {
            // change this to return active project settings for file
            return this.compilationSettings;
        }

        getScriptFileNames() {
            return this.roots.map(root => root.fileName);
        }

        getScriptVersion(filename: string) {
            return this.getScriptInfo(filename).svc.latestVersion().toString();
        }

        getCurrentDirectory(): string {
            return "";
        }

        getScriptIsOpen(filename: string) {
            return this.getScriptInfo(filename).isOpen;
        }

        removeReferencedFile(info: ScriptInfo) {
            if (!info.isOpen) {
                this.filenameToScript[info.fileName] = undefined;
            }
        }

        getScriptInfo(filename: string): ScriptInfo {
            var scriptInfo = ts.lookUp(this.filenameToScript, filename);
            if (!scriptInfo) {
                scriptInfo = this.project.openReferencedFile(filename);
                if (scriptInfo) {
                    this.filenameToScript[scriptInfo.fileName] = scriptInfo;
                }
            }
            else {
            }
            return scriptInfo;
        }

        addRoot(info: ScriptInfo) {
            var scriptInfo = ts.lookUp(this.filenameToScript, info.fileName);
            if (!scriptInfo) {
                this.filenameToScript[info.fileName] = info;
                this.roots.push(info);
            }
        }

        saveTo(filename: string, tmpfilename: string) {
            var script = this.getScriptInfo(filename);
            if (script) {
                var snap = script.snap();
                this.host.writeFile(tmpfilename, snap.getText(0, snap.getLength()));
            }
        }

        reloadScript(filename: string, tmpfilename: string, cb: () => any) {
            var script = this.getScriptInfo(filename);
            if (script) {
                script.svc.reloadFromFile(tmpfilename, cb);
            }
        }

        editScript(filename: string, start: number, end: number, newText: string) {
            var script = this.getScriptInfo(filename);
            if (script) {
                script.editContent(start, end, newText);
                return;
            }

            throw new Error("No script with name '" + filename + "'");
        }

        resolvePath(path: string): string {
            var start = new Date().getTime();
            var result = this.host.resolvePath(path);
            return result;
        }

        fileExists(path: string): boolean {
            var start = new Date().getTime();
            var result = this.host.fileExists(path);
            return result;
        }

        directoryExists(path: string): boolean {
            return this.host.directoryExists(path);
        }

        /**
         *  @param line 1 based index
         */
        lineToTextSpan(filename: string, line: number): ts.TextSpan {
            var script: ScriptInfo = this.filenameToScript[filename];
            var index = script.snap().index;

            var lineInfo = index.lineNumberToInfo(line + 1);
            var len: number;
            if (lineInfo.leaf) {
                len = lineInfo.leaf.text.length;
            }
            else {
                var nextLineInfo = index.lineNumberToInfo(line + 2);
                len = nextLineInfo.offset - lineInfo.offset;
            }
            return ts.createTextSpan(lineInfo.offset, len);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(filename: string, line: number, offset: number): number {
            var script: ScriptInfo = this.filenameToScript[filename];
            var index = script.snap().index;

            var lineInfo = index.lineNumberToInfo(line);
            // TODO: assert this offset is actually on the line
            return (lineInfo.offset + offset - 1);
        }

        /**
         * @param line 1-based index
         * @param offset 1-based index
         */
        positionToLineOffset(filename: string, position: number): ILineInfo {
            var script: ScriptInfo = this.filenameToScript[filename];
            var index = script.snap().index;
            var lineOffset = index.charOffsetToLineNumberAndPos(position);
            return { line: lineOffset.line, offset: lineOffset.offset + 1 };
        }
    }

    // assumes normalized paths
    function getAbsolutePath(filename: string, directory: string) {
        var rootLength = ts.getRootLength(filename);
        if (rootLength > 0) {
            return filename;
        }
        else {
            var splitFilename = filename.split('/');
            var splitDir = directory.split('/');
            var i = 0;
            var dirTail = 0;
            var sflen = splitFilename.length;
            while ((i < sflen) && (splitFilename[i].charAt(0) == '.')) {
                var dots = splitFilename[i];
                if (dots == '..') {
                    dirTail++;
                }
                else if (dots != '.') {
                    return undefined;
                }
                i++;
            }
            return splitDir.slice(0, splitDir.length - dirTail).concat(splitFilename.slice(i)).join('/');
        }
    }

    export interface ProjectOptions {
        // these fields can be present in the project file
        files?: string[];
        compilerOptions?: ts.CompilerOptions;
    }

    export class Project {
        compilerService: CompilerService;
        projectFilename: string;
        program: ts.Program;
        filenameToSourceFile: ts.Map<ts.SourceFile> = {};
        updateGraphSeq = 0;
        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        constructor(public projectService: ProjectService, public projectOptions?: ProjectOptions) {
            this.compilerService = new CompilerService(this,projectOptions && projectOptions.compilerOptions);
        }

        addOpenRef() {
            this.openRefCount++;
        }

        deleteOpenRef() {
            this.openRefCount--;
            return this.openRefCount;
        }

        openReferencedFile(filename: string) {
            return this.projectService.openFile(filename, false);
        }

        getFileNames() {
            let sourceFiles = this.program.getSourceFiles();
            return sourceFiles.map(sourceFile => sourceFile.fileName);
        }

        getSourceFile(info: ScriptInfo) {
            return this.filenameToSourceFile[info.fileName];
        }

        getSourceFileFromName(filename: string, requireOpen?: boolean) {
            var info = this.projectService.getScriptInfo(filename);
            if (info) {
                if ((!requireOpen) || info.isOpen) {
                    return this.getSourceFile(info);
                }
            }
        }

        isRoot(info: ScriptInfo) {
            return this.compilerService.host.roots.some(root => root === info);
        }

        removeReferencedFile(info: ScriptInfo) {
            this.compilerService.host.removeReferencedFile(info);
            this.updateGraph();
        }

        updateFileMap() {
            this.filenameToSourceFile = {};
            var sourceFiles = this.program.getSourceFiles();
            for (var i = 0, len = sourceFiles.length; i < len; i++) {
                var normFilename = ts.normalizePath(sourceFiles[i].fileName);
                this.filenameToSourceFile[normFilename] = sourceFiles[i];
            }
        }

        finishGraph() {
            this.updateGraph();
            this.compilerService.languageService.getNavigateToItems(".*");
        }

        updateGraph() {
            this.program = this.compilerService.languageService.getProgram();
            this.updateFileMap();
        }

        isConfiguredProject() {
            return this.projectFilename;
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            info.defaultProject = this;
            this.compilerService.host.addRoot(info);
        }

        filesToString() {
            var strBuilder = "";
            ts.forEachValue(this.filenameToSourceFile,
                sourceFile => { strBuilder += sourceFile.fileName + "\n"; });
            return strBuilder;
        }

        setProjectOptions(projectOptions: ProjectOptions) {
            this.projectOptions = projectOptions;
            if (projectOptions.compilerOptions) {
                this.compilerService.setCompilerOptions(projectOptions.compilerOptions);
            }
        }
    }

    export interface ProjectOpenResult {
        success?: boolean;
        errorMsg?: string;
        project?: Project;
    }

    function copyListRemovingItem<T>(item: T, list: T[]) {
        var copiedList: T[] = [];
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i] != item) {
                copiedList.push(list[i]);
            }
        }
        return copiedList;
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
        hostConfiguration: HostConfiguration;

        constructor(public host: ServerHost, public psLogger: Logger, public eventHandler?: ProjectServiceEventHandler) {
            // ts.disableIncrementalParsing = true;
            this.addDefaultHostConfiguration();
        }

        addDefaultHostConfiguration() {
            this.hostConfiguration = {
                formatCodeOptions: ts.clone(CompilerService.defaultFormatCodeOptions),
                hostInfo: "Unknown host"
            }
        }

        getFormatCodeOptions(file?: string) {
            if (file) {
                var info = this.filenameToScriptInfo[file];
                if (info) {
                    return info.formatCodeOptions;
                }
            }
            return this.hostConfiguration.formatCodeOptions;
        }

        watchedFileChanged(fileName: string) {
            var info = this.filenameToScriptInfo[fileName];
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

        log(msg: string, type = "Err") {
            this.psLogger.msg(msg, type);
        }

        setHostConfiguration(args: ts.server.protocol.ConfigureRequestArguments) {
            if (args.file) {
                var info = this.filenameToScriptInfo[args.file];
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
            var iproj = new Project(this);
            iproj.addRoot(root);
            iproj.finishGraph();
            this.inferredProjects.push(iproj);
            return iproj;
        }

        fileDeletedInFilesystem(info: ScriptInfo) {
            this.psLogger.info(info.fileName + " deleted");

            if (info.fileWatcher) {
                info.fileWatcher.close();
                info.fileWatcher = undefined;
            }

            if (!info.isOpen) {
                this.filenameToScriptInfo[info.fileName] = undefined;
                var referencingProjects = this.findReferencingProjects(info);
                for (var i = 0, len = referencingProjects.length; i < len; i++) {
                    referencingProjects[i].removeReferencedFile(info);
                }
                for (var j = 0, flen = this.openFileRoots.length; j < flen; j++) {
                    var openFile = this.openFileRoots[j];
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.defaultProject, openFile.fileName);
                    }
                }
                for (var j = 0, flen = this.openFilesReferenced.length; j < flen; j++) {
                    var openFile = this.openFilesReferenced[j];
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.defaultProject, openFile.fileName);
                    }
                }
            }

            this.printProjects();
        }

        updateConfiguredProjectList() {
            var configuredProjects: Project[] = [];
            for (var i = 0, len = this.configuredProjects.length; i < len; i++) {
                if (this.configuredProjects[i].openRefCount > 0) {
                    configuredProjects.push(this.configuredProjects[i]);
                }
            }
            this.configuredProjects = configuredProjects;
        }

        setConfiguredProjectRoot(info: ScriptInfo) {
             for (var i = 0, len = this.configuredProjects.length; i < len; i++) {
                 let configuredProject = this.configuredProjects[i];
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
                    var openFileRoots: ScriptInfo[] = [];
                    // for each inferred project root r
                    for (var i = 0, len = this.openFileRoots.length; i < len; i++) {
                        var r = this.openFileRoots[i];
                        // if r referenced by the new project
                        if (info.defaultProject.getSourceFile(r)) {
                            // remove project rooted at r
                            this.inferredProjects =
                            copyListRemovingItem(r.defaultProject, this.inferredProjects);
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
          * @param openedByConfig True if info has become a root of a configured project
          */
        closeOpenFile(info: ScriptInfo) {
            var openFileRoots: ScriptInfo[] = [];
            var removedProject: Project;
            for (var i = 0, len = this.openFileRoots.length; i < len; i++) {
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
                var openFileRootsConfigured: ScriptInfo[] = [];

                for (var i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
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
                if (removedProject.isConfiguredProject()) {
                    this.configuredProjects = copyListRemovingItem(removedProject, this.configuredProjects);
                }
                else {
                    this.inferredProjects = copyListRemovingItem(removedProject, this.inferredProjects);
                }
                var openFilesReferenced: ScriptInfo[] = [];
                var orphanFiles: ScriptInfo[] = [];
                // for all open, referenced files f
                for (var i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                    var f = this.openFilesReferenced[i];
                    // if f was referenced by the removed project, remember it
                    if (f.defaultProject === removedProject) {
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
                for (var i = 0, len = orphanFiles.length; i < len; i++) {
                    this.addOpenFile(orphanFiles[i]);
                }
            }
            else {
                this.openFilesReferenced = copyListRemovingItem(info, this.openFilesReferenced);
            }
            info.close();
        }

        findReferencingProjects(info: ScriptInfo, excludedProject?: Project) {
            var referencingProjects: Project[] = [];
            info.defaultProject = undefined;
            for (var i = 0, len = this.inferredProjects.length; i < len; i++) {
                var inferredProject = this.inferredProjects[i];
                inferredProject.updateGraph();
                if (inferredProject !== excludedProject) {
                    if (inferredProject.getSourceFile(info)) {
                        info.defaultProject = inferredProject;
                        referencingProjects.push(inferredProject);
                    }
                }
            }
            for (var i = 0, len = this.configuredProjects.length; i < len; i++) {
                var configuredProject = this.configuredProjects[i];
                configuredProject.updateGraph();
                if (configuredProject.getSourceFile(info)) {
                    info.defaultProject = configuredProject;
                }
            }
            return referencingProjects;
        }

        updateProjectStructure() {
            this.log("updating project structure from ...", "Info");
            this.printProjects();

            // First loop through all open files that are referenced by projects but are not
            // project roots.  For each referenced file, see if the default project still
            // references that file.  If so, then just keep the file in the referenced list.
            // If not, add the file to an unattached list, to be rechecked later.

            var openFilesReferenced: ScriptInfo[] = [];
            var unattachedOpenFiles: ScriptInfo[] = [];

            for (var i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                var referencedFile = this.openFilesReferenced[i];
                referencedFile.defaultProject.updateGraph();
                var sourceFile = referencedFile.defaultProject.getSourceFile(referencedFile);
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
            var openFileRoots: ScriptInfo[] = [];
            for (var i = 0, len = this.openFileRoots.length; i < len; i++) {
                var rootFile = this.openFileRoots[i];
                var rootedProject = rootFile.defaultProject;
                var referencingProjects = this.findReferencingProjects(rootFile, rootedProject);
                if (referencingProjects.length === 0) {
                    rootFile.defaultProject = rootedProject;
                    openFileRoots.push(rootFile);
                }
                else {
                    // remove project from inferred projects list because root captured
                    this.inferredProjects = copyListRemovingItem(rootedProject, this.inferredProjects);
                    this.openFilesReferenced.push(rootFile);
                }
            }
            this.openFileRoots = openFileRoots;

            // Finally, if we found any open, referenced files that are no longer
            // referenced by their default project, treat them as newly opened
            // by the editor.
            for (var i = 0, len = unattachedOpenFiles.length; i < len; i++) {
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
         */
        openFile(fileName: string, openedByClient: boolean) {
            fileName = ts.normalizePath(fileName);
            var info = ts.lookUp(this.filenameToScriptInfo, fileName);
            if (!info) {
                var content: string;
                if (this.host.fileExists(fileName)) {
                    content = this.host.readFile(fileName);
                }
                if (!content) {
                    if (openedByClient) {
                        content = "";
                    }
                }
                if (content !== undefined) {
                    var indentSize: number;
                    info = new ScriptInfo(this.host, fileName, content, openedByClient);
                    info.setFormatOptions(this.getFormatCodeOptions());
                    this.filenameToScriptInfo[fileName] = info;
                    if (!info.isOpen) {
                        info.fileWatcher = this.host.watchFile(fileName, _ => { this.watchedFileChanged(fileName); });
                    }
                }
            }
            if (info) {
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
                var fileName = ts.combinePaths(searchPath, "tsconfig.json");
                if (this.host.fileExists(fileName)) {
                    return fileName;
                }
                var parentPath = ts.getDirectoryPath(searchPath);
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
         */

        openClientFile(fileName: string) {
            var searchPath = ts.normalizePath(getDirectoryPath(fileName));
            this.log("Search path: " + searchPath,"Info");
            var configFileName = this.findConfigFile(searchPath);
            if (configFileName) {
                this.log("Config file name: " + configFileName, "Info");
            } else {
                this.log("no config file");
            }
            if (configFileName && (!this.configProjectIsActive(configFileName))) {
                var configResult = this.openConfigFile(configFileName, fileName);
                if (!configResult.success) {
                    this.log("Error opening config file " + configFileName + " " + configResult.errorMsg);
                }
                else {
                    this.log("Opened configuration file " + configFileName,"Info");
                    this.configuredProjects.push(configResult.project);
                }
            }
            var info = this.openFile(fileName, true);
            this.addOpenFile(info);
            this.printProjects();
            return info;
        }

        /**
         * Close file whose contents is managed by the client
         * @param filename is absolute pathname
         */

        closeClientFile(filename: string) {
            var info = ts.lookUp(this.filenameToScriptInfo, filename);
            if (info) {
                this.closeOpenFile(info);
                info.isOpen = false;
            }
            this.printProjects();
        }

        getProjectForFile(filename: string) {
            var scriptInfo = ts.lookUp(this.filenameToScriptInfo, filename);
            if (scriptInfo) {
                return scriptInfo.defaultProject;
            }
        }

        printProjectsForFile(filename: string) {
            var scriptInfo = ts.lookUp(this.filenameToScriptInfo, filename);
            if (scriptInfo) {
                this.psLogger.startGroup();
                this.psLogger.info("Projects for " + filename)
                var projects = this.findReferencingProjects(scriptInfo);
                for (var i = 0, len = projects.length; i < len; i++) {
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
            for (var i = 0, len = this.inferredProjects.length; i < len; i++) {
                var project = this.inferredProjects[i];
                project.updateGraph();
                this.psLogger.info("Project " + i.toString());
                this.psLogger.info(project.filesToString());
                this.psLogger.info("-----------------------------------------------");
            }
            for (var i = 0, len = this.configuredProjects.length; i < len; i++) {
                var project = this.configuredProjects[i];
                project.updateGraph();
                this.psLogger.info("Project (configured) " + (i+this.inferredProjects.length).toString());
                this.psLogger.info(project.filesToString());
                this.psLogger.info("-----------------------------------------------");
            }
            this.psLogger.info("Open file roots of inferred projects: ")
            for (var i = 0, len = this.openFileRoots.length; i < len; i++) {
                this.psLogger.info(this.openFileRoots[i].fileName);
            }
            this.psLogger.info("Open files referenced by inferred or configured projects: ")
            for (var i = 0, len = this.openFilesReferenced.length; i < len; i++) {
                var fileInfo = this.openFilesReferenced[i].fileName;
                if (this.openFilesReferenced[i].defaultProject.isConfiguredProject()) {
                    fileInfo += " (configured)";
                }
                this.psLogger.info(fileInfo);
            }
            this.psLogger.info("Open file roots of configured projects: ")
            for (var i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
                this.psLogger.info(this.openFileRootsConfigured[i].fileName);
            }
            this.psLogger.endGroup();
        }

        configProjectIsActive(fileName: string) {
            for (var i = 0, len = this.configuredProjects.length; i < len; i++) {
                if (this.configuredProjects[i].projectFilename == fileName) {
                    return true;
                }
            }
            return false;
        }

        openConfigFile(configFilename: string, clientFileName?: string): ProjectOpenResult {
            configFilename = ts.normalizePath(configFilename);
            // file references will be relative to dirPath (or absolute)
            var dirPath = ts.getDirectoryPath(configFilename);
            var contents = this.host.readFile(configFilename)
            var rawConfig: { config?: ProjectOptions; error?: Diagnostic; } = ts.parseConfigFileText(configFilename, contents);
            if (rawConfig.error) {
                return rawConfig.error;
            }
            else {
                var parsedCommandLine = ts.parseConfigFile(rawConfig.config, this.host, dirPath);
                if (parsedCommandLine.errors && (parsedCommandLine.errors.length > 0)) {
                    return { errorMsg: "tsconfig option errors" };
                }
                else if (parsedCommandLine.fileNames) {
                    var projectOptions: ProjectOptions = {
                        files: parsedCommandLine.fileNames,
                        compilerOptions: parsedCommandLine.options
                    };
                    var proj = this.createProject(configFilename, projectOptions);
                    for (var i = 0, len = parsedCommandLine.fileNames.length; i < len; i++) {
                        var rootFilename = parsedCommandLine.fileNames[i];
                        if (this.host.fileExists(rootFilename)) {
                            var info = this.openFile(rootFilename, clientFileName == rootFilename);
                            proj.addRoot(info);
                        }
                        else {
                            return { errorMsg: "specified file " + rootFilename + " not found" };
                        }
                    }
                    proj.finishGraph();
                    return { success: true, project: proj };
                }
                else {
                    return { errorMsg: "no files found" };
                }
            }
        }

        createProject(projectFilename: string, projectOptions?: ProjectOptions) {
            var project = new Project(this, projectOptions);
            project.projectFilename = projectFilename;
            return project;
        }

    }

    export class CompilerService {
        host: LSHost;
        languageService: ts.LanguageService;
        classifier: ts.Classifier;
        settings: ts.CompilerOptions;
        documentRegistry = ts.createDocumentRegistry();

        constructor(public project: Project, opt?: ts.CompilerOptions) {
            this.host = new LSHost(project.projectService.host, project);
            if (opt) {
                this.setCompilerOptions(opt);
            }
            else {
                this.setCompilerOptions(ts.getDefaultCompilerOptions());
            }
            this.languageService = ts.createLanguageService(this.host, this.documentRegistry);
            this.classifier = ts.createClassifier();
        }

        setCompilerOptions(opt: ts.CompilerOptions) {
            this.settings = opt;
            this.host.setCompilationSettings(opt);
        }

        isExternalModule(filename: string): boolean {
            var sourceFile = this.languageService.getSourceFile(filename);
            return ts.isExternalModule(sourceFile);
        }

        static defaultFormatCodeOptions: ts.FormatCodeOptions = {
            IndentSize: 4,
            TabSize: 4,
            NewLineCharacter: ts.sys ? ts.sys.newLine : '\n',
            ConvertTabsToSpaces: true,
            InsertSpaceAfterCommaDelimiter: true,
            InsertSpaceAfterSemicolonInForStatements: true,
            InsertSpaceBeforeAndAfterBinaryOperators: true,
            InsertSpaceAfterKeywordsInControlFlowStatements: true,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            PlaceOpenBraceOnNewLineForFunctions: false,
            PlaceOpenBraceOnNewLineForControlBlocks: false,
        }

    }

    export interface LineCollection {
        charCount(): number;
        lineCount(): number;
        isLeaf(): boolean;
        walk(rangeStart: number, rangeLength: number, walkFns: ILineIndexWalker): void;
    }

    export interface ILineInfo {
        line: number;
        offset: number;
        text?: string;
        leaf?: LineLeaf;
    }

    export enum CharRangeSection {
        PreStart,
        Start,
        Entire,
        Mid,
        End,
        PostEnd
    }

    export interface ILineIndexWalker {
        goSubtree: boolean;
        done: boolean;
        leaf(relativeStart: number, relativeLength: number, lineCollection: LineLeaf): void;
        pre? (relativeStart: number, relativeLength: number, lineCollection: LineCollection,
            parent: LineNode, nodeType: CharRangeSection): LineCollection;
        post? (relativeStart: number, relativeLength: number, lineCollection: LineCollection,
            parent: LineNode, nodeType: CharRangeSection): LineCollection;
    }

    class BaseLineIndexWalker implements ILineIndexWalker {
        goSubtree = true;
        done = false;
        leaf(rangeStart: number, rangeLength: number, ll: LineLeaf) {
        }
    }

    class EditWalker extends BaseLineIndexWalker {
        lineIndex = new LineIndex();
        // path to start of range
        startPath: LineCollection[];
        endBranch: LineCollection[] = [];
        branchNode: LineNode;
        // path to current node
        stack: LineNode[];
        state = CharRangeSection.Entire;
        lineCollectionAtBranch: LineCollection;
        initialText = "";
        trailingText = "";
        suppressTrailingText = false;

        constructor() {
            super();
            this.lineIndex.root = new LineNode();
            this.startPath = [this.lineIndex.root];
            this.stack = [this.lineIndex.root];
        }

        insertLines(insertedText: string) {
            if (this.suppressTrailingText) {
                this.trailingText = "";
            }
            if (insertedText) {
                insertedText = this.initialText + insertedText + this.trailingText;
            }
            else {
                insertedText = this.initialText + this.trailingText;
            }
            var lm = LineIndex.linesFromText(insertedText);
            var lines = lm.lines;
            if (lines.length > 1) {
                if (lines[lines.length - 1] == "") {
                    lines.length--;
                }
            }
            var branchParent: LineNode;
            var lastZeroCount: LineCollection;

            for (var k = this.endBranch.length - 1; k >= 0; k--) {
                (<LineNode>this.endBranch[k]).updateCounts();
                if (this.endBranch[k].charCount() === 0) {
                    lastZeroCount = this.endBranch[k];
                    if (k > 0) {
                        branchParent = <LineNode>this.endBranch[k - 1];
                    }
                    else {
                        branchParent = this.branchNode;
                    }
                }
            }
            if (lastZeroCount) {
                branchParent.remove(lastZeroCount);
            }

            // path at least length two (root and leaf)
            var insertionNode = <LineNode>this.startPath[this.startPath.length - 2];
            var leafNode = <LineLeaf>this.startPath[this.startPath.length - 1];
            var len = lines.length;

            if (len > 0) {
                leafNode.text = lines[0];

                if (len > 1) {
                    var insertedNodes = <LineCollection[]>new Array(len - 1);
                    var startNode = <LineCollection>leafNode;
                    for (var i = 1, len = lines.length; i < len; i++) {
                        insertedNodes[i - 1] = new LineLeaf(lines[i]);
                    }
                    var pathIndex = this.startPath.length - 2;
                    while (pathIndex >= 0) {
                        insertionNode = <LineNode>this.startPath[pathIndex];
                        insertedNodes = insertionNode.insertAt(startNode, insertedNodes);
                        pathIndex--;
                        startNode = insertionNode;
                    }
                    var insertedNodesLen = insertedNodes.length;
                    while (insertedNodesLen > 0) {
                        var newRoot = new LineNode();
                        newRoot.add(this.lineIndex.root);
                        insertedNodes = newRoot.insertAt(this.lineIndex.root, insertedNodes);
                        insertedNodesLen = insertedNodes.length;
                        this.lineIndex.root = newRoot;
                    }
                    this.lineIndex.root.updateCounts();
                }
                else {
                    for (var j = this.startPath.length - 2; j >= 0; j--) {
                        (<LineNode>this.startPath[j]).updateCounts();
                    }
                }
            }
            else {
                // no content for leaf node, so delete it
                insertionNode.remove(leafNode);
                for (var j = this.startPath.length - 2; j >= 0; j--) {
                    (<LineNode>this.startPath[j]).updateCounts();
                }
            }

            return this.lineIndex;
        }

        post(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineCollection, nodeType: CharRangeSection): LineCollection {
            // have visited the path for start of range, now looking for end
            // if range is on single line, we will never make this state transition
            if (lineCollection === this.lineCollectionAtBranch) {
                this.state = CharRangeSection.End;
            }
            // always pop stack because post only called when child has been visited
            this.stack.length--;
            return undefined;
        }

        pre(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineCollection, nodeType: CharRangeSection) {
            // currentNode corresponds to parent, but in the new tree
            var currentNode = this.stack[this.stack.length - 1];

            if ((this.state === CharRangeSection.Entire) && (nodeType === CharRangeSection.Start)) {
                // if range is on single line, we will never make this state transition
                this.state = CharRangeSection.Start;
                this.branchNode = currentNode;
                this.lineCollectionAtBranch = lineCollection;
            }

            var child: LineCollection;
            function fresh(node: LineCollection): LineCollection {
                if (node.isLeaf()) {
                    return new LineLeaf("");
                }
                else return new LineNode();
            }
            switch (nodeType) {
                case CharRangeSection.PreStart:
                    this.goSubtree = false;
                    if (this.state !== CharRangeSection.End) {
                        currentNode.add(lineCollection);
                    }
                    break;
                case CharRangeSection.Start:
                    if (this.state === CharRangeSection.End) {
                        this.goSubtree = false;
                    }
                    else {
                        child = fresh(lineCollection);
                        currentNode.add(child);
                        this.startPath[this.startPath.length] = child;
                    }
                    break;
                case CharRangeSection.Entire:
                    if (this.state !== CharRangeSection.End) {
                        child = fresh(lineCollection);
                        currentNode.add(child);
                        this.startPath[this.startPath.length] = child;
                    }
                    else {
                        if (!lineCollection.isLeaf()) {
                            child = fresh(lineCollection);
                            currentNode.add(child);
                            this.endBranch[this.endBranch.length] = child;
                        }
                    }
                    break;
                case CharRangeSection.Mid:
                    this.goSubtree = false;
                    break;
                case CharRangeSection.End:
                    if (this.state !== CharRangeSection.End) {
                        this.goSubtree = false;
                    }
                    else {
                        if (!lineCollection.isLeaf()) {
                            child = fresh(lineCollection);
                            currentNode.add(child);
                            this.endBranch[this.endBranch.length] = child;
                        }
                    }
                    break;
                case CharRangeSection.PostEnd:
                    this.goSubtree = false;
                    if (this.state !== CharRangeSection.Start) {
                        currentNode.add(lineCollection);
                    }
                    break;
            }
            if (this.goSubtree) {
                this.stack[this.stack.length] = <LineNode>child;
            }
            return lineCollection;
        }
        // just gather text from the leaves
        leaf(relativeStart: number, relativeLength: number, ll: LineLeaf) {
            if (this.state === CharRangeSection.Start) {
                this.initialText = ll.text.substring(0, relativeStart);
            }
            else if (this.state === CharRangeSection.Entire) {
                this.initialText = ll.text.substring(0, relativeStart);
                this.trailingText = ll.text.substring(relativeStart + relativeLength);
            }
            else {
                // state is CharRangeSection.End
                this.trailingText = ll.text.substring(relativeStart + relativeLength);
            }
        }
    }

    // text change information
    export class TextChange {
        constructor(public pos: number, public deleteLen: number, public insertedText?: string) {
        }

        getTextChangeRange() {
            return ts.createTextChangeRange(ts.createTextSpan(this.pos, this.deleteLen),
                this.insertedText ? this.insertedText.length : 0);
        }
    }

    export class ScriptVersionCache {
        changes: TextChange[] = [];
        versions: LineIndexSnapshot[] = [];
        minVersion = 0;  // no versions earlier than min version will maintain change history
        private currentVersion = 0;
        private host: ServerHost;

        static changeNumberThreshold = 8;
        static changeLengthThreshold = 256;
        static maxVersions = 8;

        // REVIEW: can optimize by coalescing simple edits
        edit(pos: number, deleteLen: number, insertedText?: string) {
            this.changes[this.changes.length] = new TextChange(pos, deleteLen, insertedText);
            if ((this.changes.length > ScriptVersionCache.changeNumberThreshold) ||
                (deleteLen > ScriptVersionCache.changeLengthThreshold) ||
                (insertedText && (insertedText.length > ScriptVersionCache.changeLengthThreshold))) {
                this.getSnapshot();
            }
        }

        latest() {
            return this.versions[this.currentVersion];
        }

        latestVersion() {
            if (this.changes.length > 0) {
                this.getSnapshot();
            }
            return this.currentVersion;
        }

        reloadFromFile(filename: string, cb?: () => any) {
            var content = this.host.readFile(filename);
            this.reload(content);
            if (cb)
                cb();
        }

        // reload whole script, leaving no change history behind reload
        reload(script: string) {
            this.currentVersion++;
            this.changes = []; // history wiped out by reload
            var snap = new LineIndexSnapshot(this.currentVersion, this);
            this.versions[this.currentVersion] = snap;
            snap.index = new LineIndex();
            var lm = LineIndex.linesFromText(script);
            snap.index.load(lm.lines);
            // REVIEW: could use linked list
            for (var i = this.minVersion; i < this.currentVersion; i++) {
                this.versions[i] = undefined;
            }
            this.minVersion = this.currentVersion;

        }

        getSnapshot() {
            var snap = this.versions[this.currentVersion];
            if (this.changes.length > 0) {
                var snapIndex = this.latest().index;
                for (var i = 0, len = this.changes.length; i < len; i++) {
                    var change = this.changes[i];
                    snapIndex = snapIndex.edit(change.pos, change.deleteLen, change.insertedText);
                }
                snap = new LineIndexSnapshot(this.currentVersion + 1, this);
                snap.index = snapIndex;
                snap.changesSincePreviousVersion = this.changes;
                this.currentVersion = snap.version;
                this.versions[snap.version] = snap;
                this.changes = [];
                if ((this.currentVersion - this.minVersion) >= ScriptVersionCache.maxVersions) {
                    var oldMin = this.minVersion;
                    this.minVersion = (this.currentVersion - ScriptVersionCache.maxVersions) + 1;
                    for (var j = oldMin; j < this.minVersion; j++) {
                        this.versions[j] = undefined;
                    }
                }
            }
            return snap;
        }

        getTextChangesBetweenVersions(oldVersion: number, newVersion: number) {
            if (oldVersion < newVersion) {
                if (oldVersion >= this.minVersion) {
                    var textChangeRanges: ts.TextChangeRange[] = [];
                    for (var i = oldVersion + 1; i <= newVersion; i++) {
                        var snap = this.versions[i];
                        for (var j = 0, len = snap.changesSincePreviousVersion.length; j < len; j++) {
                            var textChange = snap.changesSincePreviousVersion[j];
                            textChangeRanges[textChangeRanges.length] = textChange.getTextChangeRange();
                        }
                    }
                    return ts.collapseTextChangeRangesAcrossMultipleVersions(textChangeRanges);
                }
                else {
                    return undefined;
                }
            }
            else {
                return ts.unchangedTextChangeRange;
            }
        }

        static fromString(host: ServerHost, script: string) {
            var svc = new ScriptVersionCache();
            var snap = new LineIndexSnapshot(0, svc);
            svc.versions[svc.currentVersion] = snap;
            svc.host = host;
            snap.index = new LineIndex();
            var lm = LineIndex.linesFromText(script);
            snap.index.load(lm.lines);
            return svc;
        }
    }

    export class LineIndexSnapshot implements ts.IScriptSnapshot {
        index: LineIndex;
        changesSincePreviousVersion: TextChange[] = [];

        constructor(public version: number, public cache: ScriptVersionCache) {
        }

        getText(rangeStart: number, rangeEnd: number) {
            return this.index.getText(rangeStart, rangeEnd - rangeStart);
        }

        getLength() {
            return this.index.root.charCount();
        }

        // this requires linear space so don't hold on to these
        getLineStartPositions(): number[] {
            var starts: number[] = [-1];
            var count = 1;
            var pos = 0;
            this.index.every((ll, s, len) => {
                starts[count++] = pos;
                pos += ll.text.length;
                return true;
            }, 0);
            return starts;
        }

        getLineMapper() {
            return ((line: number) => {
                return this.index.lineNumberToInfo(line).offset;
            });
        }

        getTextChangeRangeSinceVersion(scriptVersion: number) {
            if (this.version <= scriptVersion) {
                return ts.unchangedTextChangeRange;
            }
            else {
                return this.cache.getTextChangesBetweenVersions(scriptVersion, this.version);
            }
        }
        getChangeRange(oldSnapshot: ts.IScriptSnapshot): ts.TextChangeRange {
            var oldSnap = <LineIndexSnapshot>oldSnapshot;
            return this.getTextChangeRangeSinceVersion(oldSnap.version);
        }
    }

    export class LineIndex {
        root: LineNode;
        // set this to true to check each edit for accuracy
        checkEdits = false;

        charOffsetToLineNumberAndPos(charOffset: number) {
            return this.root.charOffsetToLineNumberAndPos(1, charOffset);
        }

        lineNumberToInfo(lineNumber: number): ILineInfo {
            var lineCount = this.root.lineCount();
            if (lineNumber <= lineCount) {
                var lineInfo = this.root.lineNumberToInfo(lineNumber, 0);
                lineInfo.line = lineNumber;
                return lineInfo;
            }
            else {
                return {
                    line: lineNumber,
                    offset: this.root.charCount()
                }
            }
        }

        load(lines: string[]) {
            if (lines.length > 0) {
                var leaves: LineLeaf[] = [];
                for (var i = 0, len = lines.length; i < len; i++) {
                    leaves[i] = new LineLeaf(lines[i]);
                }
                this.root = LineIndex.buildTreeFromBottom(leaves);
            }
            else {
                this.root = new LineNode();
            }
        }

        walk(rangeStart: number, rangeLength: number, walkFns: ILineIndexWalker) {
            this.root.walk(rangeStart, rangeLength, walkFns);
        }

        getText(rangeStart: number, rangeLength: number) {
            var accum = "";
            if ((rangeLength > 0) && (rangeStart < this.root.charCount())) {
                this.walk(rangeStart, rangeLength, {
                    goSubtree: true,
                    done: false,
                    leaf: (relativeStart: number, relativeLength: number, ll: LineLeaf) => {
                        accum = accum.concat(ll.text.substring(relativeStart, relativeStart + relativeLength));
                    }
                });
            }
            return accum;
        }

        getLength(): number {
            return this.root.charCount();
        }

        every(f: (ll: LineLeaf, s: number, len: number) => boolean, rangeStart: number, rangeEnd?: number) {
            if (!rangeEnd) {
                rangeEnd = this.root.charCount();
            }
            var walkFns = {
                goSubtree: true,
                done: false,
                leaf: function (relativeStart: number, relativeLength: number, ll: LineLeaf) {
                    if (!f(ll, relativeStart, relativeLength)) {
                        this.done = true;
                    }
                }
            }
            this.walk(rangeStart, rangeEnd - rangeStart, walkFns);
            return !walkFns.done;
        }

        edit(pos: number, deleteLength: number, newText?: string) {
            function editFlat(source: string, s: number, dl: number, nt = "") {
                return source.substring(0, s) + nt + source.substring(s + dl, source.length);
            }
            if (this.root.charCount() === 0) {
                // TODO: assert deleteLength === 0
                if (newText) {
                    this.load(LineIndex.linesFromText(newText).lines);
                    return this;
                }
            }
            else {
                if (this.checkEdits) {
                    var checkText = editFlat(this.getText(0, this.root.charCount()), pos, deleteLength, newText);
                }
                var walker = new EditWalker();
                if (pos >= this.root.charCount()) {
                    // insert at end
                    pos = this.root.charCount() - 1;
                    var endString = this.getText(pos, 1);
                    if (newText) {
                        newText = endString + newText;
                    }
                    else {
                        newText = endString;
                    }
                    deleteLength = 0;
                    walker.suppressTrailingText = true;
                }
                else if (deleteLength > 0) {
                    // check whether last characters deleted are line break
                    var e = pos + deleteLength;
                    var lineInfo = this.charOffsetToLineNumberAndPos(e);
                    if ((lineInfo && (lineInfo.offset === 0))) {
                        // move range end just past line that will merge with previous line
                        deleteLength += lineInfo.text.length;
                        // store text by appending to end of insertedText
                        if (newText) {
                            newText = newText + lineInfo.text;
                        }
                        else {
                            newText = lineInfo.text;
                        }
                    }
                }
                if (pos < this.root.charCount()) {
                    this.root.walk(pos, deleteLength, walker);
                    walker.insertLines(newText);
                }
                if (this.checkEdits) {
                    var updatedText = this.getText(0, this.root.charCount());
                    Debug.assert(checkText == updatedText, "buffer edit mismatch");
                }
                return walker.lineIndex;
            }
        }

        static buildTreeFromBottom(nodes: LineCollection[]): LineNode {
            var nodeCount = Math.ceil(nodes.length / lineCollectionCapacity);
            var interiorNodes: LineNode[] = [];
            var nodeIndex = 0;
            for (var i = 0; i < nodeCount; i++) {
                interiorNodes[i] = new LineNode();
                var charCount = 0;
                var lineCount = 0;
                for (var j = 0; j < lineCollectionCapacity; j++) {
                    if (nodeIndex < nodes.length) {
                        interiorNodes[i].add(nodes[nodeIndex]);
                        charCount += nodes[nodeIndex].charCount();
                        lineCount += nodes[nodeIndex].lineCount();
                    }
                    else {
                        break;
                    }
                    nodeIndex++;
                }
                interiorNodes[i].totalChars = charCount;
                interiorNodes[i].totalLines = lineCount;
            }
            if (interiorNodes.length === 1) {
                return interiorNodes[0];
            }
            else {
                return this.buildTreeFromBottom(interiorNodes);
            }
        }

        static linesFromText(text: string) {
            var lineStarts = ts.computeLineStarts(text);

            if (lineStarts.length === 0) {
                return { lines: <string[]>[], lineMap: lineStarts };
            }
            var lines = <string[]>new Array(lineStarts.length);
            var lc = lineStarts.length - 1;
            for (var lmi = 0; lmi < lc; lmi++) {
                lines[lmi] = text.substring(lineStarts[lmi], lineStarts[lmi + 1]);
            }

            var endText = text.substring(lineStarts[lc]);
            if (endText.length > 0) {
                lines[lc] = endText;
            }
            else {
                lines.length--;
            }
            return { lines: lines, lineMap: lineStarts };
        }
    }

    export class LineNode implements LineCollection {
        totalChars = 0;
        totalLines = 0;
        children: LineCollection[] = [];

        isLeaf() {
            return false;
        }

        updateCounts() {
            this.totalChars = 0;
            this.totalLines = 0;
            for (var i = 0, len = this.children.length; i < len; i++) {
                var child = this.children[i];
                this.totalChars += child.charCount();
                this.totalLines += child.lineCount();
            }
        }

        execWalk(rangeStart: number, rangeLength: number, walkFns: ILineIndexWalker, childIndex: number, nodeType: CharRangeSection) {
            if (walkFns.pre) {
                walkFns.pre(rangeStart, rangeLength, this.children[childIndex], this, nodeType);
            }
            if (walkFns.goSubtree) {
                this.children[childIndex].walk(rangeStart, rangeLength, walkFns);
                if (walkFns.post) {
                    walkFns.post(rangeStart, rangeLength, this.children[childIndex], this, nodeType);
                }
            }
            else {
                walkFns.goSubtree = true;
            }
            return walkFns.done;
        }

        skipChild(relativeStart: number, relativeLength: number, childIndex: number, walkFns: ILineIndexWalker, nodeType: CharRangeSection) {
            if (walkFns.pre && (!walkFns.done)) {
                walkFns.pre(relativeStart, relativeLength, this.children[childIndex], this, nodeType);
                walkFns.goSubtree = true;
            }
        }

        walk(rangeStart: number, rangeLength: number, walkFns: ILineIndexWalker) {
            // assume (rangeStart < this.totalChars) && (rangeLength <= this.totalChars)
            var childIndex = 0;
            var child = this.children[0];
            var childCharCount = child.charCount();
            // find sub-tree containing start
            var adjustedStart = rangeStart;
            while (adjustedStart >= childCharCount) {
                this.skipChild(adjustedStart, rangeLength, childIndex, walkFns, CharRangeSection.PreStart);
                adjustedStart -= childCharCount;
                child = this.children[++childIndex];
                childCharCount = child.charCount();
            }
            // Case I: both start and end of range in same subtree
            if ((adjustedStart + rangeLength) <= childCharCount) {
                if (this.execWalk(adjustedStart, rangeLength, walkFns, childIndex, CharRangeSection.Entire)) {
                    return;
                }
            }
            else {
                // Case II: start and end of range in different subtrees (possibly with subtrees in the middle)
                if (this.execWalk(adjustedStart, childCharCount - adjustedStart, walkFns, childIndex, CharRangeSection.Start)) {
                    return;
                }
                var adjustedLength = rangeLength - (childCharCount - adjustedStart);
                child = this.children[++childIndex];
                childCharCount = child.charCount();
                while (adjustedLength > childCharCount) {
                    if (this.execWalk(0, childCharCount, walkFns, childIndex, CharRangeSection.Mid)) {
                        return;
                    }
                    adjustedLength -= childCharCount;
                    child = this.children[++childIndex];
                    childCharCount = child.charCount();
                }
                if (adjustedLength > 0) {
                    if (this.execWalk(0, adjustedLength, walkFns, childIndex, CharRangeSection.End)) {
                        return;
                    }
                }
            }
            // Process any subtrees after the one containing range end
            if (walkFns.pre) {
                var clen = this.children.length;
                if (childIndex < (clen - 1)) {
                    for (var ej = childIndex + 1; ej < clen; ej++) {
                        this.skipChild(0, 0, ej, walkFns, CharRangeSection.PostEnd);
                    }
                }
            }
        }

        charOffsetToLineNumberAndPos(lineNumber: number, charOffset: number): ILineInfo {
            var childInfo = this.childFromCharOffset(lineNumber, charOffset);
            if (!childInfo.child) {
                return {
                    line: lineNumber,
                    offset: charOffset,
                }
            }
            else if (childInfo.childIndex < this.children.length) {
                if (childInfo.child.isLeaf()) {
                    return {
                        line: childInfo.lineNumber,
                        offset: childInfo.charOffset,
                        text: (<LineLeaf>(childInfo.child)).text,
                        leaf: (<LineLeaf>(childInfo.child))
                    };
                }
                else {
                    var lineNode = <LineNode>(childInfo.child);
                    return lineNode.charOffsetToLineNumberAndPos(childInfo.lineNumber, childInfo.charOffset);
                }
            }
            else {
                var lineInfo = this.lineNumberToInfo(this.lineCount(), 0);
                return { line: this.lineCount(), offset: lineInfo.leaf.charCount() };
            }
        }

        lineNumberToInfo(lineNumber: number, charOffset: number): ILineInfo {
            var childInfo = this.childFromLineNumber(lineNumber, charOffset);
            if (!childInfo.child) {
                return {
                    line: lineNumber,
                    offset: charOffset
                }
            }
            else if (childInfo.child.isLeaf()) {
                return {
                    line: lineNumber,
                    offset: childInfo.charOffset,
                    text: (<LineLeaf>(childInfo.child)).text,
                    leaf: (<LineLeaf>(childInfo.child))
                }
            }
            else {
                var lineNode = <LineNode>(childInfo.child);
                return lineNode.lineNumberToInfo(childInfo.relativeLineNumber, childInfo.charOffset);
            }
        }

        childFromLineNumber(lineNumber: number, charOffset: number) {
            var child: LineCollection;
            var relativeLineNumber = lineNumber;
            for (var i = 0, len = this.children.length; i < len; i++) {
                child = this.children[i];
                var childLineCount = child.lineCount();
                if (childLineCount >= relativeLineNumber) {
                    break;
                }
                else {
                    relativeLineNumber -= childLineCount;
                    charOffset += child.charCount();
                }
            }
            return {
                child: child,
                childIndex: i,
                relativeLineNumber: relativeLineNumber,
                charOffset: charOffset
            };
        }

        childFromCharOffset(lineNumber: number, charOffset: number) {
            var child: LineCollection;
            for (var i = 0, len = this.children.length; i < len; i++) {
                child = this.children[i];
                if (child.charCount() > charOffset) {
                    break;
                }
                else {
                    charOffset -= child.charCount();
                    lineNumber += child.lineCount();
                }
            }
            return {
                child: child,
                childIndex: i,
                charOffset: charOffset,
                lineNumber: lineNumber
            }
        }

        splitAfter(childIndex: number) {
            var splitNode: LineNode;
            var clen = this.children.length;
            childIndex++;
            var endLength = childIndex;
            if (childIndex < clen) {
                splitNode = new LineNode();
                while (childIndex < clen) {
                    splitNode.add(this.children[childIndex++]);
                }
                splitNode.updateCounts();
            }
            this.children.length = endLength;
            return splitNode;
        }

        remove(child: LineCollection) {
            var childIndex = this.findChildIndex(child);
            var clen = this.children.length;
            if (childIndex < (clen - 1)) {
                for (var i = childIndex; i < (clen - 1); i++) {
                    this.children[i] = this.children[i + 1];
                }
            }
            this.children.length--;
        }

        findChildIndex(child: LineCollection) {
            var childIndex = 0;
            var clen = this.children.length;
            while ((this.children[childIndex] !== child) && (childIndex < clen)) childIndex++;
            return childIndex;
        }

        insertAt(child: LineCollection, nodes: LineCollection[]) {
            var childIndex = this.findChildIndex(child);
            var clen = this.children.length;
            var nodeCount = nodes.length;
            // if child is last and there is more room and only one node to place, place it
            if ((clen < lineCollectionCapacity) && (childIndex === (clen - 1)) && (nodeCount === 1)) {
                this.add(nodes[0]);
                this.updateCounts();
                return [];
            }
            else {
                var shiftNode = this.splitAfter(childIndex);
                var nodeIndex = 0;
                childIndex++;
                while ((childIndex < lineCollectionCapacity) && (nodeIndex < nodeCount)) {
                    this.children[childIndex++] = nodes[nodeIndex++];
                }
                var splitNodes: LineNode[] = [];
                var splitNodeCount = 0;
                if (nodeIndex < nodeCount) {
                    splitNodeCount = Math.ceil((nodeCount - nodeIndex) / lineCollectionCapacity);
                    splitNodes = <LineNode[]>new Array(splitNodeCount);
                    var splitNodeIndex = 0;
                    for (var i = 0; i < splitNodeCount; i++) {
                        splitNodes[i] = new LineNode();
                    }
                    var splitNode = <LineNode>splitNodes[0];
                    while (nodeIndex < nodeCount) {
                        splitNode.add(nodes[nodeIndex++]);
                        if (splitNode.children.length === lineCollectionCapacity) {
                            splitNodeIndex++;
                            splitNode = <LineNode>splitNodes[splitNodeIndex];
                        }
                    }
                    for (i = splitNodes.length - 1; i >= 0; i--) {
                        if (splitNodes[i].children.length === 0) {
                            splitNodes.length--;
                        }
                    }
                }
                if (shiftNode) {
                    splitNodes[splitNodes.length] = shiftNode;
                }
                this.updateCounts();
                for (i = 0; i < splitNodeCount; i++) {
                    (<LineNode>splitNodes[i]).updateCounts();
                }
                return splitNodes;
            }
        }

        // assume there is room for the item; return true if more room
        add(collection: LineCollection) {
            this.children[this.children.length] = collection;
            return (this.children.length < lineCollectionCapacity);
        }

        charCount() {
            return this.totalChars;
        }

        lineCount() {
            return this.totalLines;
        }
    }

    export class LineLeaf implements LineCollection {
        udata: any;

        constructor(public text: string) {

        }

        setUdata(data: any) {
            this.udata = data;
        }

        getUdata() {
            return this.udata;
        }

        isLeaf() {
            return true;
        }

        walk(rangeStart: number, rangeLength: number, walkFns: ILineIndexWalker) {
            walkFns.leaf(rangeStart, rangeLength, this);
        }

        charCount() {
            return this.text.length;
        }

        lineCount() {
            return 1;
        }
    }
}

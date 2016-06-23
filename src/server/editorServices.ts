/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="utilities.ts" />
/// <reference path="session.ts" />
/// <reference path="scriptVersionCache.ts"/>
/// <reference path="lshost.ts"/>
/// <reference path="project.ts"/>

namespace ts.server {

    export const maxProgramSizeForNonTsFiles = 20 * 1024 * 1024;

    /**
     * This helper funciton processes a list of projects and return the concatenated, sortd and deduplicated output of processing each project.
     */
    export function combineProjectOutput<T>(projects: Project[], action: (project: Project) => T[], comparer?: (a: T, b: T) => number, areEqual?: (a: T, b: T) => boolean) {
        const result = projects.reduce<T[]>((previous, current) => concatenate(previous, action(current)), []).sort(comparer);
        return projects.length > 1 ? deduplicate(result, areEqual) : result;
    }

    export interface ProjectServiceEventHandler {
        (eventName: string, project: Project, fileName: NormalizedPath): void;
    }

    export interface HostConfiguration {
        formatCodeOptions: ts.FormatCodeSettings;
        hostInfo: string;
    }

    function findProjectByName<T extends Project>(projectName: string, projects: T[]): T {
        for (const proj of projects) {
            if (proj.getProjectName() === projectName) {
                return proj;
            }
        }
    }

    export interface ProjectOpenResult {
        success?: boolean;
        errorMsg?: string;
        project?: Project;
    }

    class DirectoryWatchers {
        /**
         * a path to directory watcher map that detects added tsconfig files
         **/
        private directoryWatchersForTsconfig: ts.Map<FileWatcher> = {};
        /**
         * count of how many projects are using the directory watcher.
         * If the number becomes 0 for a watcher, then we should close it.
         **/
        private directoryWatchersRefCount: ts.Map<number> = {};

        constructor(private readonly projectService: ProjectService) {
        }

        stopWatchingDirectory(directory: string) {
            // if the ref count for this directory watcher drops to 0, it's time to close it
            this.directoryWatchersRefCount[directory]--;
            if (this.directoryWatchersRefCount[directory] === 0) {
                this.projectService.log("Close directory watcher for: " + directory);
                this.directoryWatchersForTsconfig[directory].close();
                delete this.directoryWatchersForTsconfig[directory];
            }
        }

        startWatchingContainingDirectoriesForFile(fileName: string, project: InferredProject, callback: (fileName: string) => void) {
            let currentPath = ts.getDirectoryPath(fileName);
            let parentPath = ts.getDirectoryPath(currentPath);
            while (currentPath != parentPath) {
                if (!this.directoryWatchersForTsconfig[currentPath]) {
                    this.projectService.log("Add watcher for: " + currentPath);
                    this.directoryWatchersForTsconfig[currentPath] = this.projectService.host.watchDirectory(currentPath, callback);
                    this.directoryWatchersRefCount[currentPath] = 1;
                }
                else {
                    this.directoryWatchersRefCount[currentPath] += 1;
                }
                project.directoriesWatchedForTsconfig.push(currentPath);
                currentPath = parentPath;
                parentPath = ts.getDirectoryPath(parentPath);
            }

        }
    }

    export class ProjectService {
        /**
         * Container of all known scripts
         */
        private filenameToScriptInfo = createNormalizedPathMap<ScriptInfo>();
        /**
         * maps external project file name to list of config files that were the part of this project
         */
        externalProjectToConfiguredProjectMap: Map<NormalizedPath[]>;

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
         * open, non-configured root files 
         **/
        openFileRoots: ScriptInfo[] = [];
        /**
         * open files referenced by some project
         **/
        openFilesReferenced: ScriptInfo[] = [];
        /**
         * open files that are roots of a configured project
         **/
        openFileRootsConfigured: ScriptInfo[] = [];

        private directoryWatchers: DirectoryWatchers;

        private hostConfiguration: HostConfiguration;
        private timerForDetectingProjectFileListChanges: Map<any> = {};

        private documentRegistry: ts.DocumentRegistry;

        constructor(public readonly host: ServerHost,
            public readonly psLogger: Logger,
            public readonly cancellationToken: HostCancellationToken,
            private readonly eventHandler?: ProjectServiceEventHandler) {

            this.directoryWatchers = new DirectoryWatchers(this);
            // ts.disableIncrementalParsing = true;
            this.setDefaultHostConfiguration();
            this.documentRegistry = ts.createDocumentRegistry(host.useCaseSensitiveFileNames, host.getCurrentDirectory());
        }

        private setDefaultHostConfiguration() {
            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeSettings(this.host),
                hostInfo: "Unknown host"
            };
        }

        stopWatchingDirectory(directory: string) {
            this.directoryWatchers.stopWatchingDirectory(directory);
        }

        findProject(projectName: string): Project {
            if (projectName === undefined) {
                return undefined;
            }
            if (isInferredProjectName(projectName)) {
                return forEach(this.inferredProjects, p => p.getProjectName() === projectName && p);
            }
            return this.findExternalProjectByProjectName(projectName) || this.findConfiguredProjectByProjectName(toNormalizedPath(projectName));
        }

        getFormatCodeOptions(file?: NormalizedPath) {
            if (file) {
                const info = this.filenameToScriptInfo.get(file);
                if (info) {
                    return info.formatCodeSettings;
                }
            }
            return this.hostConfiguration.formatCodeOptions;
        }

        private onSourceFileChanged(fileName: NormalizedPath) {
            const info = this.filenameToScriptInfo.get(fileName);
            if (!info) {
                this.psLogger.info("Error: got watch notification for unknown file: " + fileName);
            }

            if (!this.host.fileExists(fileName)) {
                // File was deleted
                this.handleDeletedFile(info);
            }
            else {
                if (info && (!info.isOpen)) {
                    info.reloadFromFile(info.fileName);
                }
            }
        }

        private handleDeletedFile(info: ScriptInfo) {
            this.psLogger.info(info.fileName + " deleted");

            info.stopWatcher();

            if (!info.isOpen) {
                this.filenameToScriptInfo.remove(info.fileName);

                info.detachAllProjects();

                for (const openFile of this.openFileRoots) {
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.getDefaultProject(), openFile.fileName);
                    }
                }

                for (const openFile of this.openFilesReferenced) {
                    if (this.eventHandler) {
                        this.eventHandler("context", openFile.getDefaultProject(), openFile.fileName);
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

        private releaseNonReferencedConfiguredProjects() {
            if (this.configuredProjects.every(p => p.openRefCount > 0)) {
                return;
            }

            const configuredProjects: ConfiguredProject[] = [];

            for (const proj of this.configuredProjects) {
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
                    removeItemFromSet(this.externalProjects, <ExternalProject>project);
                    break;
                case ProjectKind.Configured:
                    removeItemFromSet(this.configuredProjects, <ConfiguredProject>project);
                    break;
                case ProjectKind.Inferred:
                    removeItemFromSet(this.inferredProjects, <InferredProject>project);
                    break;
            }
        }

        private findContainingConfiguredProject(info: ScriptInfo): ConfiguredProject {
            for (const proj of this.configuredProjects) {
                if (proj.containsScriptInfo(info)) {
                    return proj;
                }
            }
            return undefined;
        }

        private findContainingExternalProject(fileName: NormalizedPath): ExternalProject {
            for (const proj of this.externalProjects) {
                if (proj.containsFile(fileName)) {
                    return proj;
                }
            }
            return undefined;
        }

        private addOpenFile(info: ScriptInfo) {
            const externalProject = this.findContainingExternalProject(info.fileName);
            if (externalProject) {
                return;
            }
            const configuredProject = this.findContainingConfiguredProject(info);
            if (configuredProject) {
                // info.defaultProject = configuredProject;
                configuredProject.addOpenRef();
                if (configuredProject.isRoot(info)) {
                    this.openFileRootsConfigured.push(info);
                }
                else {
                    this.openFilesReferenced.push(info);
                }
                return;
            }
            // create new inferred project p with the newly opened file as root
            const inferredProject = this.createAndAddInferredProject(info);
            const openFileRoots: ScriptInfo[] = [];
            // for each inferred project root r
            for (const rootFile of this.openFileRoots) {
                // if r referenced by the new project
                if (inferredProject.containsScriptInfo(rootFile)) {
                    // remove project rooted at r
                    this.removeProject(rootFile.getDefaultProject());
                    // put r in referenced open file list
                    this.openFilesReferenced.push(rootFile);
                    // set default project of r to the new project
                    rootFile.attachToProject(inferredProject);
                }
                else {
                    // otherwise, keep r as root of inferred project
                    openFileRoots.push(rootFile);
                }
            }
            this.openFileRoots = openFileRoots;
            this.openFileRoots.push(info);
        }

        /**
          * Remove this file from the set of open, non-configured files.
          * @param info The file that has been closed or newly configured
          */
        private closeOpenFile(info: ScriptInfo) {
            // Closing file should trigger re-reading the file content from disk. This is
            // because the user may chose to discard the buffer content before saving
            // to the disk, and the server's version of the file can be out of sync.
            info.reloadFromFile(info.fileName);

            this.openFileRoots = copyListRemovingItem(info, this.openFileRoots);
            this.openFileRootsConfigured = copyListRemovingItem(info, this.openFileRootsConfigured);

            // collect all projects that should be removed
            let projectsToRemove: Project[];
            for (const p of info.containingProjects) {
                if ( p.projectKind === ProjectKind.Configured) {
                    // last open file in configured project - close it
                    if ((<ConfiguredProject>p).deleteOpenRef() === 0) {
                        (projectsToRemove || (projectsToRemove = [])).push(p);
                    }
                }
                else if (p.projectKind === ProjectKind.Inferred && p.isRoot(info)) {
                    // open file in inferred project
                    (projectsToRemove || (projectsToRemove = [])).push(p);
                }
            }
            if (projectsToRemove) {
                for (const project of projectsToRemove) {
                    this.removeProject(project);
                }

                const openFilesReferenced: ScriptInfo[] = [];
                const orphanFiles: ScriptInfo[] = [];
                // for all open, referenced files f
                for (const f of this.openFilesReferenced) {
                    // collect orphanted files and try to re-add them as newly opened
                    if (f.containingProjects.length === 0) {
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

            this.releaseNonReferencedConfiguredProjects();

            info.isOpen = false;
        }

        /**
         * This function tries to search for a tsconfig.json for the given file. If we found it,
         * we first detect if there is already a configured project created for it: if so, we re-read
         * the tsconfig file content and update the project; otherwise we create a new one.
         */
        private openOrUpdateConfiguredProjectForFile(fileName: string): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            const searchPath = asNormalizedPath(getDirectoryPath(toNormalizedPath(fileName)));
            this.log("Search path: " + searchPath, "Info");
            // check if this file is already included in one of external projects
            const configFileName = this.findConfigFile(searchPath);
            if (configFileName) {
                this.log("Config file name: " + configFileName, "Info");
                const project = this.findConfiguredProjectByProjectName(configFileName);
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
        private findConfigFile(searchPath: NormalizedPath): NormalizedPath {
            while (true) {
                const tsconfigFileName = asNormalizedPath(combinePaths(searchPath, "tsconfig.json"));
                if (this.host.fileExists(tsconfigFileName)) {
                    return tsconfigFileName;
                }

                const jsconfigFileName = asNormalizedPath(combinePaths(searchPath, "jsconfig.json"));
                if (this.host.fileExists(jsconfigFileName)) {
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
                const fileInfo = `${referencedFile.fileName} ${ProjectKind[referencedFile.getDefaultProject().projectKind]}`;
                this.psLogger.info(fileInfo);
            }
            this.psLogger.info("Open file roots of configured projects: ");
            for (let i = 0, len = this.openFileRootsConfigured.length; i < len; i++) {
                this.psLogger.info(this.openFileRootsConfigured[i].fileName);
            }
            this.psLogger.endGroup();
        }

        private findConfiguredProjectByProjectName(configFileName: NormalizedPath) {
            return findProjectByName(configFileName, this.configuredProjects);
        }

        private findExternalProjectByProjectName(projectFileName: string) {
            return findProjectByName(projectFileName, this.externalProjects);
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
                        configHasFilesProperty,
                        wildcardDirectories: parsedCommandLine.wildcardDirectories,
                    };
                    return { succeeded: true, projectOptions };
                }
            }
        }

        private exceedTotalNonTsFileSizeLimit(options: CompilerOptions, fileNames: string[]) {
            if (options && options.disableSizeLimit) {
                return false;
            }
            let totalNonTsFileSize = 0;
            if (!this.host.getFileSize) {
                return false;
            }

            for (const fileName of fileNames) {
                if (hasTypeScriptFileExtension(fileName)) {
                    continue;
                }
                totalNonTsFileSize += this.host.getFileSize(fileName);
                if (totalNonTsFileSize > maxProgramSizeForNonTsFiles) {
                    return true;
                }
            }
            return false;
        }

        private createAndAddExternalProject(projectFileName: string, files: string[], compilerOptions: CompilerOptions, clientFileName?: string) {
            const sizeLimitExceeded = this.exceedTotalNonTsFileSizeLimit(compilerOptions, files);
            const project = new ExternalProject(projectFileName, this, this.documentRegistry, compilerOptions, !sizeLimitExceeded);
            const errors = this.addFilesToProject(project, files, clientFileName);
            this.externalProjects.push(project);
            return { project, errors };
        }

        private createAndAddConfiguredProject(configFileName: NormalizedPath, projectOptions: ProjectOptions, clientFileName?: string) {
            const sizeLimitExceeded = this.exceedTotalNonTsFileSizeLimit(projectOptions.compilerOptions, projectOptions.files);
            const project = new ConfiguredProject(
                configFileName,
                this,
                this.documentRegistry,
                projectOptions.configHasFilesProperty,
                projectOptions.compilerOptions,
                projectOptions.wildcardDirectories,
                !sizeLimitExceeded);

            const errors = this.addFilesToProject(project, projectOptions.files, clientFileName);
            project.watchConfigFile(project => this.onConfigChangedForConfiguredProject(project));
            if (!sizeLimitExceeded) {
                this.watchConfigDirectoryForProject(project, projectOptions);
            }
            project.watchWildcards((project, path) => this.onSourceFileInDirectoryChangedForConfiguredProject(project, path));
            this.configuredProjects.push(project);
            return { project, errors };
        }

        private watchConfigDirectoryForProject(project: ConfiguredProject, options: ProjectOptions) {
            if (!options.configHasFilesProperty) {
                project.watchConfigDirectory((project, path) => this.onSourceFileInDirectoryChangedForConfiguredProject(project, path));
            }
        }

        private addFilesToProject(project: ConfiguredProject | ExternalProject, files: string[], clientFileName: string): Diagnostic[] {
            let errors: Diagnostic[];
            for (const rootFilename of files) {
                if (this.host.fileExists(rootFilename)) {
                    const info = this.getOrCreateScriptInfoForNormalizedPath(toNormalizedPath(rootFilename), /*openedByClient*/ clientFileName == rootFilename);
                    project.addRoot(info);
                }
                else {
                    (errors || (errors = [])).push(createCompilerDiagnostic(Diagnostics.File_0_not_found, rootFilename));
                }
            }
            project.updateGraph();
            return errors;
        }

        private openConfigFile(configFileName: NormalizedPath, clientFileName?: string): { success: boolean, project?: ConfiguredProject, errors?: Diagnostic[] } {
            const { succeeded, projectOptions, errors } = this.configFileToProjectOptions(configFileName);
            if (!succeeded) {
                return { success: false, errors };
            }
            else {
                const { project, errors } = this.createAndAddConfiguredProject(configFileName, projectOptions, clientFileName);
                return { success: true, project, errors };
            }
        }

        private updateNonInferredProject(project: ExternalProject | ConfiguredProject, newRootFiles: string[], newOptions: CompilerOptions) {
            const oldRootFiles = project.getRootFiles();
            const newFileNames = asNormalizedPathArray(filter(newRootFiles, f => this.host.fileExists(f)));
            const fileNamesToRemove = oldRootFiles.filter(f => !contains(newFileNames, f));
            const fileNamesToAdd = newFileNames.filter(f => !contains(oldRootFiles, f));

            for (const fileName of fileNamesToRemove) {
                const info = this.getScriptInfoForNormalizedPath(fileName);
                if (info) {
                    project.removeFile(info);
                }
            }

            for (const fileName of fileNamesToAdd) {
                let info = this.getScriptInfo(fileName);
                if (!info) {
                    info = this.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ false);
                }
                else {
                    // if the root file was opened by client, it would belong to either
                    // openFileRoots or openFileReferenced.
                    if (info.isOpen) {
                        if (contains(this.openFileRoots, info)) {
                            this.openFileRoots = copyListRemovingItem(info, this.openFileRoots);
                            // delete inferred project
                            let toRemove: Project[];
                            for (const p of info.containingProjects) {
                                if (p.projectKind === ProjectKind.Inferred && p.isRoot(info)) {
                                    (toRemove || (toRemove = [])).push(p);
                                }
                            }
                            if (toRemove) {
                                for (const p of toRemove) {
                                    this.removeProject(p);
                                }
                            }
                        }
                        if (contains(this.openFilesReferenced, info)) {
                            removeItemFromSet(this.openFilesReferenced, info);
                        }
                        if (project.projectKind === ProjectKind.Configured)  {
                            this.openFileRootsConfigured.push(info);
                        }
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
                    if (this.exceedTotalNonTsFileSizeLimit(projectOptions.compilerOptions, projectOptions.files)) {
                        project.setCompilerOptions(projectOptions.compilerOptions);
                        if (!project.languageServiceEnabled) {
                            // language service is already disabled
                            return;
                        }
                        project.disableLanguageService();
                        project.stopWatchingDirectory();
                    }
                    else {
                        if (!project.languageServiceEnabled) {
                            project.enableLanguageService();
                        }
                        this.watchConfigDirectoryForProject(project, projectOptions);
                        this.updateNonInferredProject(project, projectOptions.files, projectOptions.compilerOptions);
                    }
                }
            }
        }

        createAndAddInferredProject(root: ScriptInfo) {
            const project = new InferredProject(this, this.documentRegistry, /*languageServiceEnabled*/ true);
            project.addRoot(root);

            this.directoryWatchers.startWatchingContainingDirectoriesForFile(
                root.fileName,
                project,
                fileName => this.onConfigChangeForInferredProject(fileName));

            project.updateGraph();
            this.inferredProjects.push(project);
            return project;
        }

        /**
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */

        getOrCreateScriptInfo(fileName: string, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
            return this.getOrCreateScriptInfoForNormalizedPath(toNormalizedPath(fileName), openedByClient, fileContent, scriptKind);
        }
        getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
            let info = this.filenameToScriptInfo.get(fileName);
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
                    info = new ScriptInfo(this.host, fileName, content, scriptKind, openedByClient);
                    info.setFormatOptions(toEditorSettings(this.getFormatCodeOptions()));
                    this.filenameToScriptInfo.set(fileName, info);
                    if (!info.isOpen) {
                        info.setWatcher(this.host.watchFile(fileName, _ => this.onSourceFileChanged(fileName)));
                    }
                }
            }
            if (info) {
                if (fileContent) {
                    info.reload(fileContent);
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
                const info = this.filenameToScriptInfo.get(toNormalizedPath(args.file));
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
                    mergeMaps(this.hostConfiguration.formatCodeOptions, args.formatOptions);
                    this.log("Format host information updated", "Info");
                }
            }
        }

        closeLog() {
            this.psLogger.close();
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
            // collect all orphanted script infos that used to be roots of configured projects
            for (const info of this.openFileRootsConfigured) {
                if(info.containingProjects.length === 0) {
                    unattachedOpenFiles.push(info);
                }
                else {
                    openFileRootsConfigured.push(info);
                }
                // const project = info.defaultProject;
                // if (!project || !(project.containsScriptInfo(info))) {
                //     info.defaultProject = undefined;
                //     unattachedOpenFiles.push(info);
                // }
                // else {
                //     openFileRootsConfigured.push(info);
                // }
            }
            this.openFileRootsConfigured = openFileRootsConfigured;

            // First loop through all open files that are referenced by projects but are not
            // project roots.  For each referenced file, see if the default project still
            // references that file.  If so, then just keep the file in the referenced list.
            // If not, add the file to an unattached list, to be rechecked later.
            const openFilesReferenced: ScriptInfo[] = [];
            for (const referencedFile of this.openFilesReferenced) {
                // check if any of projects that used to reference this file are still referencing it
                if (referencedFile.containingProjects.length === 0) {
                    unattachedOpenFiles.push(referencedFile);
                }
                else {
                    openFilesReferenced.push(referencedFile);
                }
                // referencedFile.defaultProject.updateGraph();
                // if (referencedFile.defaultProject.containsScriptInfo(referencedFile)) {
                //     openFilesReferenced.push(referencedFile);
                // }
                // else {
                //     unattachedOpenFiles.push(referencedFile);
                // }
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
                let inConfiguredProject = false;
                let inExternalProject = false;
                for (const p of rootFile.containingProjects) {
                    inConfiguredProject = inConfiguredProject || p.projectKind === ProjectKind.Configured;
                    inExternalProject = inExternalProject || p.projectKind === ProjectKind.External;
                }
                if (inConfiguredProject || inExternalProject) {
                    const inferredProjects = rootFile.containingProjects.filter(p => p.projectKind === ProjectKind.Inferred);
                    for (const p of inferredProjects) {
                        this.removeProject(p);
                    }
                    if (inConfiguredProject) {
                        this.openFileRootsConfigured.push(rootFile);
                    }
                }
                else {
                    // 
                    openFileRoots.push(rootFile);
                }
                if (rootFile.containingProjects.some(p => p.projectKind !== ProjectKind.Inferred)) {
                    // file was included in non-inferred project - drop old inferred project

                }
                else {
                    openFileRoots.push(rootFile);
                }
                let inferredProjectsToRemove: Project[];
                for (const p of rootFile.containingProjects) {
                    if (p.projectKind !== ProjectKind.Inferred) {
                        // file was included in non-inferred project - drop old inferred project
                    }
                }
                // if (inInferredProjectOnly) {
                //     openFileRoots.push(rootFile);
                // }
                // else {

                // }

                // const rootedProject = rootFile.defaultProject;
                // const referencingProjects = this.findReferencingProjects(rootFile, rootedProject);

                
                // if (rootFile.defaultProject && rootFile.defaultProject.projectKind !== ProjectKind.Inferred) {
                //     // If the root file has already been added into a configured project,
                //     // meaning the original inferred project is gone already.
                //     if (rootedProject.projectKind === ProjectKind.Inferred) {
                //         this.removeProject(rootedProject);
                //     }
                //     this.openFileRootsConfigured.push(rootFile);
                // }
                // else {
                //     if (referencingProjects.length === 0) {
                //         rootFile.defaultProject = rootedProject;
                //         openFileRoots.push(rootFile);
                //     }
                //     else {
                //         // remove project from inferred projects list because root captured
                //         this.removeProject(rootedProject);
                //         this.openFilesReferenced.push(rootFile);
                //     }
                // }
            }
            this.openFileRoots = openFileRoots;

            // Finally, if we found any open, referenced files that are no longer
            // referenced by their default project, treat them as newly opened
            // by the editor.
            for (const f of unattachedOpenFiles) {
                this.addOpenFile(f);
            }
            this.printProjects();
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        }

        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            return this.filenameToScriptInfo.get(fileName);
        }
        /**
         * Open file whose contents is managed by the client
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            return this.openClientFileWithNormalizedPath(toNormalizedPath(fileName), fileContent, scriptKind);
        }

        openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind): { configFileName?: string, configFileErrors?: Diagnostic[] } {
            let configFileName: string;
            let configFileErrors: Diagnostic[];

            if (!this.findContainingExternalProject(fileName)) {
                ({ configFileName, configFileErrors } = this.openOrUpdateConfiguredProjectForFile(fileName));
            }

            // at this point if file is the part of some configured/external project then this project should be created
            const info = this.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ true, fileContent, scriptKind);
            this.addOpenFile(info);
            this.printProjects();
            return { configFileName, configFileErrors };
        }

        /**
         * Close file whose contents is managed by the client
         * @param filename is absolute pathname
         */
        closeClientFile(uncheckedFileName: string) {
            const info = this.filenameToScriptInfo.get(toNormalizedPath(uncheckedFileName));
            if (info) {
                this.closeOpenFile(info);
                info.isOpen = false;
            }
            this.printProjects();
        }

        getDefaultProjectForFile(fileName: NormalizedPath) {
            const scriptInfo = this.filenameToScriptInfo.get(fileName);
            return scriptInfo && scriptInfo.getDefaultProject();
        }

        private syncExternalFilesList(knownProjects: protocol.ProjectVersionInfo[], projects: Project[], result: protocol.ProjectFiles[]): void {
            for (const proj of projects) {
                const knownProject = ts.forEach(knownProjects, p => p.projectName === proj.getProjectName() && p);
                result.push(proj.getChangesSinceVersion(knownProject && knownProject.version));
            }
        }

        synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[]): protocol.ProjectFiles[] {
            const files: protocol.ProjectFiles[] = [];
            this.syncExternalFilesList(knownProjects, this.externalProjects, files);
            this.syncExternalFilesList(knownProjects, this.configuredProjects, files);
            this.syncExternalFilesList(knownProjects, this.inferredProjects, files);
            return files;
        }

        applyChangesInOpenFiles(openFiles: protocol.NewOpenFile[], changedFiles: protocol.ChangedOpenFile[], closedFiles: string[]): void {
            for (const file of openFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName);
                Debug.assert(!scriptInfo || !scriptInfo.isOpen);
                this.openClientFileWithNormalizedPath(toNormalizedPath(file.fileName), file.content);
            }

            for (const file of changedFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName);
                Debug.assert(!!scriptInfo);
                for (let i = file.changes.length - 1; i >= 0; i--) {
                    const change = file.changes[i];
                    scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
                }
            }

            for (const file of closedFiles) {
                this.closeClientFile(file);
            }

            this.updateProjectStructure();
        }

        closeExternalProject(uncheckedFileName: string): void {
            const fileName = toNormalizedPath(uncheckedFileName);
            const configFiles = this.externalProjectToConfiguredProjectMap[fileName];
            if (configFiles) {
                for (const configFile of configFiles) {
                    const configuredProject = this.findConfiguredProjectByProjectName(configFile);
                    if (configuredProject) {
                        this.removeProject(configuredProject);
                        this.updateProjectStructure();
                    }
                }
            }
            else {
                // close external project
                const externalProject = this.findExternalProjectByProjectName(uncheckedFileName);
                if (externalProject) {
                    this.removeProject(externalProject);
                    this.updateProjectStructure();
                }
            }
        }

        openExternalProject(proj: protocol.ExternalProject): void {
            const externalProject = this.findExternalProjectByProjectName(proj.projectFileName);
            if (externalProject) {
                this.updateNonInferredProject(externalProject, proj.rootFiles, proj.options);
            }
            else {
                let tsConfigFiles: NormalizedPath[];
                const rootFiles: string[] = [];
                for (const file of proj.rootFiles) {
                    if (getBaseFileName(file) === "tsconfig.json") {
                        (tsConfigFiles || (tsConfigFiles = [])).push(toNormalizedPath(file));
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

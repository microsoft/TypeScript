/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="utilities.ts" />
/// <reference path="session.ts" />
/// <reference path="scriptVersionCache.ts"/>
/// <reference path="lsHost.ts"/>
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
        formatCodeOptions: FormatCodeSettings;
        hostInfo: string;
    }

    interface ConfigFileConversionResult {
        success: boolean;
        errors?: Diagnostic[];

        projectOptions?: ProjectOptions;
    }

    interface OpenConfigFileResult {
        success: boolean;
        errors?: Diagnostic[];

        project?: ConfiguredProject;
    }

    interface OpenConfiguredProjectResult {
        configFileName?: string;
        configFileErrors?: Diagnostic[];
    }

    function findProjectByName<T extends Project>(projectName: string, projects: T[]): T {
        for (const proj of projects) {
            if (proj.getProjectName() === projectName) {
                return proj;
            }
        }
    }

    class DirectoryWatchers {
        /**
         * a path to directory watcher map that detects added tsconfig files
         **/
        private directoryWatchersForTsconfig: Map<FileWatcher> = {};
        /**
         * count of how many projects are using the directory watcher.
         * If the number becomes 0 for a watcher, then we should close it.
         **/
        private directoryWatchersRefCount: Map<number> = {};

        constructor(private readonly projectService: ProjectService) {
        }

        stopWatchingDirectory(directory: string) {
            // if the ref count for this directory watcher drops to 0, it's time to close it
            this.directoryWatchersRefCount[directory]--;
            if (this.directoryWatchersRefCount[directory] === 0) {
                this.projectService.log(`Close directory watcher for: ${directory}`);
                this.directoryWatchersForTsconfig[directory].close();
                delete this.directoryWatchersForTsconfig[directory];
            }
        }

        startWatchingContainingDirectoriesForFile(fileName: string, project: InferredProject, callback: (fileName: string) => void) {
            let currentPath = getDirectoryPath(fileName);
            let parentPath = getDirectoryPath(currentPath);
            while (currentPath != parentPath) {
                if (!this.directoryWatchersForTsconfig[currentPath]) {
                    this.projectService.log(`Add watcher for: ${currentPath}`);
                    this.directoryWatchersForTsconfig[currentPath] = this.projectService.host.watchDirectory(currentPath, callback);
                    this.directoryWatchersRefCount[currentPath] = 1;
                }
                else {
                    this.directoryWatchersRefCount[currentPath] += 1;
                }
                project.directoriesWatchedForTsconfig.push(currentPath);
                currentPath = parentPath;
                parentPath = getDirectoryPath(parentPath);
            }

        }
    }

    export class ProjectService {
        private readonly documentRegistry: DocumentRegistry;

        /**
         * Container of all known scripts
         */
        private readonly filenameToScriptInfo = createNormalizedPathMap<ScriptInfo>();
        /**
         * maps external project file name to list of config files that were the part of this project
         */
        private readonly externalProjectToConfiguredProjectMap: Map<NormalizedPath[]>;

        /**
         * external projects (configuration and list of root files is not controlled by tsserver)
         */
        readonly externalProjects: ExternalProject[] = [];
        /**
         * projects built from openFileRoots
         **/
        readonly inferredProjects: InferredProject[] = [];
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

        private readonly directoryWatchers: DirectoryWatchers;

        private hostConfiguration: HostConfiguration;

        private timerForDetectingProjectFileListChanges: Map<any> = {};

        constructor(public readonly host: ServerHost,
            public readonly logger: Logger,
            public readonly cancellationToken: HostCancellationToken,
            private readonly eventHandler?: ProjectServiceEventHandler) {

            this.directoryWatchers = new DirectoryWatchers(this);
            // ts.disableIncrementalParsing = true;
            this.setDefaultHostConfiguration();
            this.documentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames, host.getCurrentDirectory());
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
                const info = this.getScriptInfoForNormalizedPath(file);
                if (info) {
                    return info.formatCodeSettings;
                }
            }
            return this.hostConfiguration.formatCodeOptions;
        }

        private onSourceFileChanged(fileName: NormalizedPath) {
            const info = this.getScriptInfoForNormalizedPath(fileName);
            if (!info) {
                this.logger.info(`Error: got watch notification for unknown file: ${fileName}`);
            }

            if (!this.host.fileExists(fileName)) {
                // File was deleted
                this.handleDeletedFile(info);
            }
            else {
                if (info && (!info.isOpen)) {
                    info.reloadFromFile();
                }
            }
        }

        private handleDeletedFile(info: ScriptInfo) {
            this.logger.info(`${info.fileName} deleted`);

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

            this.log(`Detected source file changes: ${fileName}`);
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
            const { projectOptions } = this.convertConfigFileContentToProjectOptions(project.configFileName);

            const newRootFiles = projectOptions.files.map((f => this.getCanonicalFileName(f)));
            const currentRootFiles = project.getRootFiles().map((f => this.getCanonicalFileName(f)));

            // We check if the project file list has changed. If so, we update the project.
            if (!arrayIsEqualTo(currentRootFiles.sort(), newRootFiles.sort())) {
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
            this.log(`Config file changed: ${project.configFileName}`);
            this.updateConfiguredProject(project);
            this.updateProjectStructure();
        }

        /**
         * This is the callback function when a watched directory has an added tsconfig file.
         */
        private onConfigFileAddedForInferredProject(fileName: string) {
            // TODO: check directory separators
            if (getBaseFileName(fileName) != "tsconfig.json") {
                this.log(`${fileName} is not tsconfig.json`);
                return;
            }

            this.log(`Detected newly added tsconfig file: ${fileName}`);
            const { projectOptions } = this.convertConfigFileContentToProjectOptions(fileName);
            const rootFilesInTsconfig = projectOptions.files.map(f => this.getCanonicalFileName(f));
            // We should only care about the new tsconfig file if it contains any
            // opened root files of existing inferred projects
            for (const rootFile of this.openFileRoots) {
                if (contains(rootFilesInTsconfig, this.getCanonicalFileName(rootFile.fileName))) {
                    this.reloadProjects();
                    break;
                }
            }
        }

        private getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return normalizePath(name);
        }

        // TODO: delete if unused
        // private releaseNonReferencedConfiguredProjects() {
        //     if (this.configuredProjects.every(p => p.openRefCount > 0)) {
        //         return;
        //     }

        //     const configuredProjects: ConfiguredProject[] = [];
        //     for (const proj of this.configuredProjects) {
        //         if (proj.openRefCount > 0) {
        //             configuredProjects.push(proj);
        //         }
        //         else {
        //             proj.close();
        //         }
        //     }

        //     this.configuredProjects = configuredProjects;
        // }

       private removeProject(project: Project) {
            this.log(`remove project: ${project.getRootFiles().toString()}`);

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

        private addOpenFile(info: ScriptInfo): void {
            const externalProject = this.findContainingExternalProject(info.fileName);
            if (externalProject) {
                // file is already included in some external project - do nothing
                return;
            }
            const configuredProject = this.findContainingConfiguredProject(info);
            if (configuredProject) {
                // file is the part of configured project
                configuredProject.addOpenRef();
                if (configuredProject.isRoot(info)) {
                    this.openFileRootsConfigured.push(info);
                }
                else {
                    this.openFilesReferenced.push(info);
                }
                return;
            }
            if (info.containingProjects.length === 0) {
                // create new inferred project p with the newly opened file as root
                const inferredProject = this.createAndAddInferredProject(info);
                const openFileRoots: ScriptInfo[] = [];
                // for each inferred project root r
                for (const rootFile of this.openFileRoots) {
                    // if r referenced by the new project
                    if (inferredProject.containsScriptInfo(rootFile)) {
                        // remove inferred project that was initially created for rootFile
                        const defaultProject = rootFile.getDefaultProject();
                        if (defaultProject === inferredProject) {
                            continue;
                        }
                        Debug.assert(defaultProject.projectKind === ProjectKind.Inferred);

                        this.removeProject(defaultProject);
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
            }

            this.openFileRoots.push(info);
        }

        /**
          * Remove this file from the set of open, non-configured files.
          * @param info The file that has been closed or newly configured
          */
        private closeOpenFile(info: ScriptInfo): void {
            // Closing file should trigger re-reading the file content from disk. This is
            // because the user may chose to discard the buffer content before saving
            // to the disk, and the server's version of the file can be out of sync.
            info.reloadFromFile();

            removeItemFromSet(this.openFileRoots, info);
            removeItemFromSet(this.openFileRootsConfigured, info);

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
                    if (f === info) {
                        // skip closed file
                        continue;
                    }
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
                for (const f of orphanFiles) {
                    this.addOpenFile(f);
                }
            }
            else {
                // just close file
                removeItemFromSet(this.openFilesReferenced, info);
            }

            // projectsToRemove should already cover it
            // this.releaseNonReferencedConfiguredProjects();

            info.isOpen = false;
        }

        /**
         * This function tries to search for a tsconfig.json for the given file. If we found it,
         * we first detect if there is already a configured project created for it: if so, we re-read
         * the tsconfig file content and update the project; otherwise we create a new one.
         */
        private openOrUpdateConfiguredProjectForFile(fileName: NormalizedPath): OpenConfiguredProjectResult {
            const searchPath = getDirectoryPath(fileName);
            this.log(`Search path: ${searchPath}`, "Info");

            // check if this file is already included in one of external projects
            const configFileName = this.findConfigFile(asNormalizedPath(searchPath));
            if (!configFileName) {
                this.log("No config files found.");
                return {};
            }

            this.log(`Config file name: ${configFileName}`, "Info");

            const project = this.findConfiguredProjectByProjectName(configFileName);
            if (!project) {
                const { success, errors } = this.openConfigFile(configFileName, fileName);
                if (!success) {
                    return { configFileName, configFileErrors: errors };
                }

                // even if opening config file was successful, it could still
                // contain errors that were tolerated.
                this.log(`Opened configuration file ${configFileName}`, "Info");
                if (errors && errors.length > 0) {
                    return { configFileName, configFileErrors: errors };
                }
            }
            else {
                this.updateConfiguredProject(project);
            }

            return { configFileName };
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
            if (!this.logger.isVerbose()) {
                return;
            }
            this.logger.startGroup();

            let counter = 0;
            counter = printProjects(this.logger, this.externalProjects, counter);
            counter = printProjects(this.logger, this.configuredProjects, counter);
            counter = printProjects(this.logger, this.inferredProjects, counter);

            this.logger.info("Open file roots of inferred projects: ");
            for (const rootFile of this.openFileRoots) {
                this.logger.info(rootFile.fileName);
            }
            this.logger.info("Open files referenced by inferred or configured projects: ");
            for (const referencedFile of this.openFilesReferenced) {
                const fileInfo = `${referencedFile.fileName} ${ProjectKind[referencedFile.getDefaultProject().projectKind]}`;
                this.logger.info(fileInfo);
            }
            this.logger.info("Open file roots of configured projects: ");
            for (const configuredRoot of this.openFileRootsConfigured) {
                this.logger.info(configuredRoot.fileName);
            }

            this.logger.endGroup();

            function printProjects(logger: Logger, projects: Project[], counter: number) {
                for (const project of projects) {
                    project.updateGraph();
                    logger.info(`Project '${project.getProjectName()}' (${ProjectKind[project.projectKind]}) ${counter}`);
                    logger.info(project.filesToString());
                    logger.info("-----------------------------------------------");
                    counter++;
                }
                return counter;
            }
        }

        private findConfiguredProjectByProjectName(configFileName: NormalizedPath) {
            return findProjectByName(configFileName, this.configuredProjects);
        }

        private findExternalProjectByProjectName(projectFileName: string) {
            return findProjectByName(projectFileName, this.externalProjects);
        }

        private convertConfigFileContentToProjectOptions(configFilename: string): ConfigFileConversionResult {
            configFilename = normalizePath(configFilename);

            const configObj = parseConfigFileTextToJson(configFilename, this.host.readFile(configFilename));
            if (configObj.error) {
                return { success: false, errors: [configObj.error] };
            }

            const parsedCommandLine = parseJsonConfigFileContent(
                configObj.config,
                this.host,
                getDirectoryPath(configFilename),
                /*existingOptions*/ {},
                configFilename);

            Debug.assert(!!parsedCommandLine.fileNames);

            if (parsedCommandLine.errors && (parsedCommandLine.errors.length > 0)) {
                return { success: false, errors: parsedCommandLine.errors };
            }

            if (parsedCommandLine.fileNames.length === 0) {
                const error = createCompilerDiagnostic(Diagnostics.The_config_file_0_found_doesn_t_contain_any_source_files, configFilename);
                return { success: false, errors: [error] };
            }

            const projectOptions: ProjectOptions = {
                files: parsedCommandLine.fileNames,
                compilerOptions: parsedCommandLine.options,
                configHasFilesProperty: configObj.config["files"] !== undefined,
                wildcardDirectories: parsedCommandLine.wildcardDirectories,
            };
            return { success: true, projectOptions };
        }

        private exceededTotalSizeLimitForNonTsFiles(options: CompilerOptions, fileNames: string[]) {
            if (options && options.disableSizeLimit || !this.host.getFileSize) {
                return false;
            }
            let totalNonTsFileSize = 0;
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

        private createAndAddExternalProject(projectFileName: string, files: string[], compilerOptions: CompilerOptions) {
            const project = new ExternalProject(
                projectFileName,
                this,
                this.documentRegistry,
                compilerOptions,
                /*languageServiceEnabled*/ !this.exceededTotalSizeLimitForNonTsFiles(compilerOptions, files));

            const errors = this.addFilesToProjectAndUpdateGraph(project, files, /*clientFileName*/ undefined);
            this.externalProjects.push(project);
            return { project, errors };
        }

        private createAndAddConfiguredProject(configFileName: NormalizedPath, projectOptions: ProjectOptions, clientFileName?: string) {
            const sizeLimitExceeded = this.exceededTotalSizeLimitForNonTsFiles(projectOptions.compilerOptions, projectOptions.files);
            const project = new ConfiguredProject(
                configFileName,
                this,
                this.documentRegistry,
                projectOptions.configHasFilesProperty,
                projectOptions.compilerOptions,
                projectOptions.wildcardDirectories,
                /*languageServiceEnabled*/ !sizeLimitExceeded);

            const errors = this.addFilesToProjectAndUpdateGraph(project, projectOptions.files, clientFileName);

            project.watchConfigFile(project => this.onConfigChangedForConfiguredProject(project));
            if (!sizeLimitExceeded) {
                this.watchConfigDirectoryForProject(project, projectOptions);
            }
            project.watchWildcards((project, path) => this.onSourceFileInDirectoryChangedForConfiguredProject(project, path));

            this.configuredProjects.push(project);
            return { project, errors };
        }

        private watchConfigDirectoryForProject(project: ConfiguredProject, options: ProjectOptions): void {
            if (!options.configHasFilesProperty) {
                project.watchConfigDirectory((project, path) => this.onSourceFileInDirectoryChangedForConfiguredProject(project, path));
            }
        }

        private addFilesToProjectAndUpdateGraph(project: ConfiguredProject | ExternalProject, files: string[], clientFileName: string): Diagnostic[] {
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

        private openConfigFile(configFileName: NormalizedPath, clientFileName?: string): OpenConfigFileResult {
            const conversionResult = this.convertConfigFileContentToProjectOptions(configFileName);
            if (!conversionResult.success) {
                return { success: false, errors: conversionResult.errors };
            }
            const { project, errors } = this.createAndAddConfiguredProject(configFileName, conversionResult.projectOptions, clientFileName);
            return { success: true, project, errors };
        }

        private updateNonInferredProject(project: ExternalProject | ConfiguredProject, newRootFiles: string[], newOptions: CompilerOptions) {
            const oldRootFiles = project.getRootFiles();

            // TODO: verify that newRootFiles are always normalized
            // TODO: avoid N^2
            const newFileNames = asNormalizedPathArray(filter(newRootFiles, f => this.host.fileExists(f)));
            const fileNamesToRemove = asNormalizedPathArray(oldRootFiles.filter(f => !contains(newFileNames, f)));
            const fileNamesToAdd = asNormalizedPathArray(newFileNames.filter(f => !contains(oldRootFiles, f)));

            for (const fileName of fileNamesToRemove) {
                const info = this.getScriptInfoForNormalizedPath(fileName);
                if (info) {
                    project.removeFile(info);
                }
            }

            for (const fileName of fileNamesToAdd) {
                let info = this.getScriptInfoForNormalizedPath(fileName);
                if (!info) {
                    info = this.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ false);
                }
                else {
                    // if the root file was opened by client, it would belong to either
                    // openFileRoots or openFileReferenced.
                    if (info.isOpen) {
                        if (contains(this.openFileRoots, info)) {
                            removeItemFromSet(this.openFileRoots, info);

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
                return;
            }

            const { success, projectOptions, errors } = this.convertConfigFileContentToProjectOptions(project.configFileName);
            if (!success) {
                return errors;
            }

            if (this.exceededTotalSizeLimitForNonTsFiles(projectOptions.compilerOptions, projectOptions.files)) {
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

        createAndAddInferredProject(root: ScriptInfo) {
            const project = new InferredProject(this, this.documentRegistry, /*languageServiceEnabled*/ true);
            project.addRoot(root);

            this.directoryWatchers.startWatchingContainingDirectoriesForFile(
                root.fileName,
                project,
                fileName => this.onConfigFileAddedForInferredProject(fileName));

            project.updateGraph();
            this.inferredProjects.push(project);
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

        getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind) {
            let info = this.getScriptInfoForNormalizedPath(fileName);
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

        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            return this.filenameToScriptInfo.get(fileName);
        }

        log(msg: string, type = "Err") {
            this.logger.msg(msg, type);
        }

        setHostConfiguration(args: protocol.ConfigureRequestArguments) {
            if (args.file) {
                const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(args.file));
                if (info) {
                    info.setFormatOptions(args.formatOptions);
                    this.log(`Host configuration update for file ${args.file}`, "Info");
                }
            }
            else {
                if (args.hostInfo !== undefined) {
                    this.hostConfiguration.hostInfo = args.hostInfo;
                    this.log(`Host information ${args.hostInfo}`, "Info");
                }
                if (args.formatOptions) {
                    mergeMaps(this.hostConfiguration.formatCodeOptions, args.formatOptions);
                    this.log("Format host information updated", "Info");
                }
            }
        }

        closeLog() {
            this.logger.close();
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
                if (info.containingProjects.length === 0) {
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
                    if (rootFile.containingProjects.length === 1) {
                        // file contained only in one project
                        openFileRoots.push(rootFile);
                    }
                    else {
                        // TODO: fixme
                        // file is contained in more than one inferred project - keep only ones where it is used as reference
                        const roots = rootFile.containingProjects.filter(p => p.isRoot(rootFile));
                        for (const root of roots) {
                            this.removeProject(root);
                        }
                        Debug.assert(rootFile.containingProjects.length > 0);
                        this.openFilesReferenced.push(rootFile);
                    }
                }
                // if (rootFile.containingProjects.some(p => p.projectKind !== ProjectKind.Inferred)) {
                //     // file was included in non-inferred project - drop old inferred project

                // }
                // else {
                //     openFileRoots.push(rootFile);
                // }
                // let inferredProjectsToRemove: Project[];
                // for (const p of rootFile.containingProjects) {
                //     if (p.projectKind !== ProjectKind.Inferred) {
                //         // file was included in non-inferred project - drop old inferred project
                //     }
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

        /**
         * Open file whose contents is managed by the client
         * @param filename is absolute pathname
         * @param fileContent is a known version of the file content that is more up to date than the one on disk
         */
        openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind): OpenConfiguredProjectResult {
            return this.openClientFileWithNormalizedPath(toNormalizedPath(fileName), fileContent, scriptKind);
        }

        openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind): OpenConfiguredProjectResult {
            const { configFileName = undefined, configFileErrors = undefined }: OpenConfiguredProjectResult = this.findContainingExternalProject(fileName)
                ? {}
                : this.openOrUpdateConfiguredProjectForFile(fileName);

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
            const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
            if (info) {
                this.closeOpenFile(info);
                info.isOpen = false;
            }
            this.printProjects();
        }

        getDefaultProjectForFile(fileName: NormalizedPath) {
            const scriptInfo = this.getScriptInfoForNormalizedPath(fileName);
            return scriptInfo && scriptInfo.getDefaultProject();
        }

        private collectChanges(lastKnownProjectVersions: protocol.ProjectVersionInfo[], currentProjects: Project[], result: protocol.ProjectFiles[]): void {
            for (const proj of currentProjects) {
                const knownProject = forEach(lastKnownProjectVersions, p => p.projectName === proj.getProjectName() && p);
                result.push(proj.getChangesSinceVersion(knownProject && knownProject.version));
            }
        }

        synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[]): protocol.ProjectFiles[] {
            const files: protocol.ProjectFiles[] = [];
            this.collectChanges(knownProjects, this.externalProjects, files);
            this.collectChanges(knownProjects, this.configuredProjects, files);
            this.collectChanges(knownProjects, this.inferredProjects, files);
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
                // apply changes in reverse order 
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
                    }
                }
                this.updateProjectStructure();
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
                return;
            }

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

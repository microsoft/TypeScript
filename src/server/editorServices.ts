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

    /**
     * TODO: enforce invariants:
     *  - script info can be never migrate to state - root file in inferred project, this is only a starting point
     *  - if script info has more that one containing projects - it is not a root file in inferred project because:
     *    - references in inferred project supercede the root part
     *    - root/reference in non-inferred project beats root in inferred project
     */
    function isRootFileInInferredProject(info: ScriptInfo): boolean {
        if (info.containingProjects.length === 0) {
            return false;
        }
        return info.containingProjects[0].projectKind === ProjectKind.Inferred && info.containingProjects[0].isRoot(info);
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
        readonly configuredProjects: ConfiguredProject[] = [];
        /**
         * list of open files
         */
        readonly openFiles: ScriptInfo[] = [];

        private readonly directoryWatchers: DirectoryWatchers;
        private readonly throttledOperations: ThrottledOperations;

        private readonly hostConfiguration: HostConfiguration;

        constructor(public readonly host: ServerHost,
            public readonly logger: Logger,
            public readonly cancellationToken: HostCancellationToken,
            private readonly useSingleInferredProject: boolean,
            private readonly eventHandler?: ProjectServiceEventHandler) {

            this.directoryWatchers = new DirectoryWatchers(this);
            this.throttledOperations = new ThrottledOperations(host);
            // ts.disableIncrementalParsing = true;

            this.hostConfiguration = {
                formatCodeOptions: getDefaultFormatCodeSettings(this.host),
                hostInfo: "Unknown host"
            };

            this.documentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames, host.getCurrentDirectory());
        }

        stopWatchingDirectory(directory: string) {
            this.directoryWatchers.stopWatchingDirectory(directory);
        }

        findProject(projectName: string): Project {
            if (projectName === undefined) {
                return undefined;
            }
            if (isInferredProjectName(projectName)) {
                return findProjectByName(projectName, this.inferredProjects);
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

                if (!this.eventHandler) {
                    return;
                }

                for (const openFile of this.openFiles) {
                    this.eventHandler("context", openFile.getDefaultProject(), openFile.fileName);
                }

                // TODO: project system view is inconsistent
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
            this.throttledOperations.schedule(
                project.configFileName,
                250,
                () => this.handleChangeInSourceFileForConfiguredProject(project));
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
                this.refreshInferredProjects();
            }
        }

        private onConfigChangedForConfiguredProject(project: ConfiguredProject) {
            this.log(`Config file changed: ${project.configFileName}`);
            this.updateConfiguredProject(project);
            this.refreshInferredProjects();
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
            // TODO: add tests to check correct migration of currently open file if it is referenced from the root file of configured project 
            this.reloadProjects();
        }

        private getCanonicalFileName(fileName: string) {
            const name = this.host.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            return normalizePath(name);
        }

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

        private assignScriptInfoToInferredProjectIfNecessary(info: ScriptInfo, addToListOfOpenFiles: boolean): void {
            const externalProject = this.findContainingExternalProject(info.fileName);
            if (externalProject) {
                // file is already included in some external project - do nothing
                if (addToListOfOpenFiles) {
                    this.openFiles.push(info);
                }
                return;
            }
            const configuredProject = this.findContainingConfiguredProject(info);
            if (configuredProject) {
                // file is the part of configured project
                if (addToListOfOpenFiles) {
                    configuredProject.addOpenRef();
                    this.openFiles.push(info);
                }
                return;
            }

            if (info.containingProjects.length === 0) {
                // create new inferred project p with the newly opened file as root
                // or add root to existing inferred project if 'useOneInferredProject' is true
                const inferredProject = this.createInferredProjectWithRootFileIfNecessary(info);
                if (!this.useSingleInferredProject) {

                    // if useOneInferredProject is not set then try to fixup ownership of open files
                    for (const f of this.openFiles) {
                        const defaultProject = f.getDefaultProject();
                        if (isRootFileInInferredProject(info) && defaultProject !== inferredProject && inferredProject.containsScriptInfo(f)) {

                            // open file used to be root in inferred project, 
                            // this inferred project is different from the one we've just created for current file
                            // and new inferred project references this open file.
                            // We should delete old inferred project and attach open file to the new one
                            this.removeProject(defaultProject);
                            f.attachToProject(inferredProject);
                        }
                    }
                }
            }

            if (addToListOfOpenFiles) {
                this.openFiles.push(info);
            }
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

            removeItemFromSet(this.openFiles, info);
            info.isOpen = false;

            // collect all projects that should be removed
            let projectsToRemove: Project[];
            for (const p of info.containingProjects) {
                if (p.projectKind === ProjectKind.Configured) {
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

                let orphanFiles: ScriptInfo[];
                // for all open files
                for (const f of this.openFiles) {
                    // collect orphanted files and try to re-add them as newly opened
                    if (f.containingProjects.length === 0) {
                        (orphanFiles || (orphanFiles = [])).push(f);
                    }
                }

                // treat orphaned files as newly opened
                if (orphanFiles) {
                    for (const f of orphanFiles) {
                        this.assignScriptInfoToInferredProjectIfNecessary(f, /*addToListOfOpenFiles*/ false);
                    }
                }
            }
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

            this.logger.info("Open files: ");
            for (const rootFile of this.openFiles) {
                this.logger.info(rootFile.fileName);
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
                        // delete inferred project
                        let toRemove: Project;
                        if (isRootFileInInferredProject(info)) {
                            toRemove = info.containingProjects[0];
                        }
                        if (toRemove) {
                            toRemove.removeFile(info);
                            if (!toRemove.hasRoots()) {
                                this.removeProject(toRemove);
                            }
                        }
                        // if (contains(this.openFileRoots, info)) {
                        //     removeItemFromSet(this.openFileRoots, info);

                        //     // delete inferred project
                        //     let toRemove: Project[];

                        //     // TODO: unify logic
                        //     for (const p of info.containingProjects) {
                        //         if (p.projectKind === ProjectKind.Inferred && p.isRoot(info)) {
                        //             (toRemove || (toRemove = [])).push(p);
                        //         }
                        //     }
                        //     if (toRemove) {
                        //         for (const p of toRemove) {
                        //             p.removeFile(info);
                        //             if (!p.hasRoots()) {
                        //                 this.removeProject(p);
                        //             }
                        //         }
                        //     }
                        // }
                        // if (contains(this.openFilesReferenced, info)) {
                        //     removeItemFromSet(this.openFilesReferenced, info);
                        // }
                        // if (project.projectKind === ProjectKind.Configured) {
                        //     this.openFileRootsConfigured.push(info);
                        // }
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

        createInferredProjectWithRootFileIfNecessary(root: ScriptInfo) {
            const useExistingProject = this.useSingleInferredProject && this.inferredProjects.length;
            const project = useExistingProject
                ? this.inferredProjects[0]
                : new InferredProject(this, this.documentRegistry, /*languageServiceEnabled*/ true);

            project.addRoot(root);

            this.directoryWatchers.startWatchingContainingDirectoriesForFile(
                root.fileName,
                project,
                fileName => this.onConfigFileAddedForInferredProject(fileName));

            project.updateGraph();

            if (!useExistingProject) {
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
            // try to reload config file for all open files
            for (const info of this.openFiles) {
                this.openOrUpdateConfiguredProjectForFile(info.fileName);
            }
            this.refreshInferredProjects();
        }

        /**
         * This function is to update the project structure for every projects.
         * It is called on the premise that all the configured projects are
         * up to date.
         */
        refreshInferredProjects() {
            this.log("updating project structure from ...", "Info");
            this.printProjects();

            const unattachedOpenFiles: ScriptInfo[] = [];
            // collect all orphanted script infos from open files
            for (const info of this.openFiles) {
                if (info.containingProjects.length === 0) {
                    unattachedOpenFiles.push(info);
                }
                else {
                    if (isRootFileInInferredProject(info) && info.containingProjects.length > 1) {
                        const inferredProject = info.containingProjects[0];
                        Debug.assert(inferredProject.projectKind === ProjectKind.Inferred);
                        inferredProject.removeFile(info);
                        if (!inferredProject.hasRoots()) {
                            this.removeProject(inferredProject);
                        }
                    }
                    // let inConfiguredProject = false;
                    // let inExternalProject = false;
                    // for (const p of info.containingProjects) {
                    //     inConfiguredProject = inConfiguredProject || p.projectKind === ProjectKind.Configured;
                    //     inExternalProject = inExternalProject || p.projectKind === ProjectKind.External;
                    // }
                    // if (inConfiguredProject || inExternalProject) {
                    //     const inferredProjects = rootFile.containingProjects.filter(p => p.projectKind === ProjectKind.Inferred);
                    //     for (const p of inferredProjects) {
                    //         p.removeFile(rootFile, /*detachFromProject*/ true);
                    //         if (!p.hasRoots()) {
                    //             this.removeProject(p);
                    //         }
                    //     }
                    // }
                    // else {
                    //     if (rootFile.containingProjects.length > 1) {
                    //         // TODO: fixme
                    //         // file is contained in more than one inferred project - keep only ones where it is used as reference
                    //         const roots = rootFile.containingProjects.filter(p => p.isRoot(rootFile));
                    //         for (const root of roots) {
                    //             this.removeProject(root);
                    //         }
                    //         Debug.assert(info.containingProjects.length > 0);
                    //     }
                    // }

                }

                // if (info.containingProjects.length === 0) {
                //     unattachedOpenFiles.push(info);
                // }
                // else {
                //     openFileRootsConfigured.push(info);
                // }
                // const project = info.defaultProject;
                // if (!project || !(project.containsScriptInfo(info))) {
                //     info.defaultProject = undefined;
                //     unattachedOpenFiles.push(info);
                // }
                // else {
                //     openFileRootsConfigured.push(info);
                // }
            }
            for (const unattached of unattachedOpenFiles) {
                this.assignScriptInfoToInferredProjectIfNecessary(unattached, /*addToListOfOpenFiles*/ false);
            }

            // this.openFileRootsConfigured = openFileRootsConfigured;

            // // First loop through all open files that are referenced by projects but are not
            // // project roots.  For each referenced file, see if the default project still
            // // references that file.  If so, then just keep the file in the referenced list.
            // // If not, add the file to an unattached list, to be rechecked later.
            // const openFilesReferenced: ScriptInfo[] = [];
            // for (const referencedFile of this.openFilesReferenced) {
            //     // check if any of projects that used to reference this file are still referencing it
            //     if (referencedFile.containingProjects.length === 0) {
            //         unattachedOpenFiles.push(referencedFile);
            //     }
            //     else {
            //         openFilesReferenced.push(referencedFile);
            //     }
            //     // referencedFile.defaultProject.updateGraph();
            //     // if (referencedFile.defaultProject.containsScriptInfo(referencedFile)) {
            //     //     openFilesReferenced.push(referencedFile);
            //     // }
            //     // else {
            //     //     unattachedOpenFiles.push(referencedFile);
            //     // }
            // }
            // this.openFilesReferenced = openFilesReferenced;

            // Then, loop through all of the open files that are project roots.
            // For each root file, note the project that it roots.  Then see if
            // any other projects newly reference the file.  If zero projects
            // newly reference the file, keep it as a root.  If one or more
            // projects newly references the file, remove its project from the
            // inferred projects list (since it is no longer a root) and add
            // the file to the open, referenced file list.
            // const openFileRoots: ScriptInfo[] = [];
            // for (const rootFile of this.openFileRoots) {
            //     let inConfiguredProject = false;
            //     let inExternalProject = false;
            //     for (const p of rootFile.containingProjects) {
            //         inConfiguredProject = inConfiguredProject || p.projectKind === ProjectKind.Configured;
            //         inExternalProject = inExternalProject || p.projectKind === ProjectKind.External;
            //     }
            //     if (inConfiguredProject || inExternalProject) {
            //         const inferredProjects = rootFile.containingProjects.filter(p => p.projectKind === ProjectKind.Inferred);
            //         for (const p of inferredProjects) {
            //             p.removeFile(rootFile, /*detachFromProject*/ true);
            //             if (!p.hasRoots()) {
            //                 this.removeProject(p);
            //             }
            //         }
            //         if (inConfiguredProject) {
            //             this.openFileRootsConfigured.push(rootFile);
            //         }
            //     }
            //     else {
            //         if (rootFile.containingProjects.length === 1) {
            //             // file contained only in one project
            //             openFileRoots.push(rootFile);
            //         }
            //         else {
            //             // TODO: fixme
            //             // file is contained in more than one inferred project - keep only ones where it is used as reference
            //             const roots = rootFile.containingProjects.filter(p => p.isRoot(rootFile));
            //             for (const root of roots) {
            //                 this.removeProject(root);
            //             }
            //             Debug.assert(rootFile.containingProjects.length > 0);
            //             this.openFilesReferenced.push(rootFile);
            //         }
            //     }
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
            // }
            // this.openFileRoots = openFileRoots;

            // Finally, if we found any open, referenced files that are no longer
            // referenced by their default project, treat them as newly opened
            // by the editor.
            // for (const f of unattachedOpenFiles) {
            //     this.addOpenFile(f);
            // }
            for (const p of this.inferredProjects) {
                p.updateGraph();
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
            this.assignScriptInfoToInferredProjectIfNecessary(info, /*addToListOfOpenFiles*/ true);
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
            if (openFiles) {
                for (const file of openFiles) {
                    const scriptInfo = this.getScriptInfo(file.fileName);
                    Debug.assert(!scriptInfo || !scriptInfo.isOpen);
                    this.openClientFileWithNormalizedPath(toNormalizedPath(file.fileName), file.content);
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
                }
            }

            if (closedFiles) {
                for (const file of closedFiles) {
                    this.closeClientFile(file);
                }
            }

            if (openFiles || changedFiles || closedFiles) {
                this.refreshInferredProjects();
            }
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
                this.refreshInferredProjects();
            }
            else {
                // close external project
                const externalProject = this.findExternalProjectByProjectName(uncheckedFileName);
                if (externalProject) {
                    this.removeProject(externalProject);
                    this.refreshInferredProjects();
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

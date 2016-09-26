/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts"/>
/// <reference path="scriptInfo.ts"/>
/// <reference path="lsHost.ts"/>
/// <reference path="typingsCache.ts"/>
/// <reference path="builder.ts"/>

namespace ts.server {

    export enum ProjectKind {
        Inferred,
        Configured,
        External
    }

    function remove<T>(items: T[], item: T) {
        const index = items.indexOf(item);
        if (index >= 0) {
            items.splice(index, 1);
        }
    }

    function isJsOrDtsFile(info: ScriptInfo) {
        return info.scriptKind === ScriptKind.JS || info.scriptKind == ScriptKind.JSX || fileExtensionIs(info.fileName, ".d.ts");
    }

    export function allRootFilesAreJsOrDts(project: Project): boolean {
        return project.getRootScriptInfos().every(isJsOrDtsFile);
    }

    export function allFilesAreJsOrDts(project: Project): boolean {
        return project.getScriptInfos().every(isJsOrDtsFile);
    }

    export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
        projectErrors: Diagnostic[];
    }

    export abstract class Project {
        private rootFiles: ScriptInfo[] = [];
        private rootFilesMap: FileMap<ScriptInfo> = createFileMap<ScriptInfo>();
        private lsHost: ServerLanguageServiceHost;
        private program: ts.Program;

        private languageService: LanguageService;
        builder: Builder;
        /**
         * Set of files that was returned from the last call to getChangesSinceVersion.
         */
        private lastReportedFileNames: Map<string, string>;
        /**
         * Last version that was reported.
         */
        private lastReportedVersion = 0;
        /**
         * Current project structure version.
         * This property is changed in 'updateGraph' based on the set of files in program
         */
        private projectStructureVersion = 0;
        /**
         * Current version of the project state. It is changed when:
         * - new root file was added/removed
         * - edit happen in some file that is currently included in the project.
         * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
         */
        private projectStateVersion = 0;

        private typingFiles: TypingsArray;

        protected projectErrors: Diagnostic[];

        public typesVersion = 0;

        public isJsOnlyProject() {
            this.updateGraph();
            return allFilesAreJsOrDts(this);
        }

        constructor(
            readonly projectKind: ProjectKind,
            readonly projectService: ProjectService,
            private documentRegistry: ts.DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            public languageServiceEnabled: boolean,
            private compilerOptions: CompilerOptions,
            public compileOnSaveEnabled: boolean) {

            if (!this.compilerOptions) {
                this.compilerOptions = ts.getDefaultCompilerOptions();
                this.compilerOptions.allowNonTsExtensions = true;
                this.compilerOptions.allowJs = true;
            }
            else if (hasExplicitListOfFiles) {
                // If files are listed explicitly, allow all extensions
                this.compilerOptions.allowNonTsExtensions = true;
            }

            if (languageServiceEnabled) {
                this.enableLanguageService();
            }
            else {
                this.disableLanguageService();
            }

            this.builder = createBuilder(this);
            this.markAsDirty();
        }

        getProjectErrors() {
            return this.projectErrors;
        }

        getLanguageService(ensureSynchronized = true): LanguageService {
            if (ensureSynchronized) {
                this.updateGraph();
            }
            return this.languageService;
        }

        getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[] {
            if (!this.languageServiceEnabled) {
                return [];
            }
            this.updateGraph();
            return this.builder.getFilesAffectedBy(scriptInfo);
        }

        getProjectVersion() {
            return this.projectStateVersion.toString();
        }

        enableLanguageService() {
            const lsHost = new LSHost(this.projectService.host, this, this.projectService.cancellationToken);
            lsHost.setCompilationSettings(this.compilerOptions);
            this.languageService = ts.createLanguageService(lsHost, this.documentRegistry);

            this.lsHost = lsHost;
            this.languageServiceEnabled = true;
        }

        disableLanguageService() {
            this.languageService = nullLanguageService;
            this.lsHost = nullLanguageServiceHost;
            this.languageServiceEnabled = false;
        }

        abstract getProjectName(): string;
        abstract getProjectRootPath(): string | undefined;
        abstract getTypingOptions(): TypingOptions;

        getSourceFile(path: Path) {
            if (!this.program) {
                return undefined;
            }
            return this.program.getSourceFileByPath(path);
        }

        updateTypes() {
            this.typesVersion++;
            this.markAsDirty();
            this.updateGraph();
        }

        close() {
            if (this.program) {
                // if we have a program - release all files that are enlisted in program
                for (const f of this.program.getSourceFiles()) {
                    const info = this.projectService.getScriptInfo(f.fileName);
                    info.detachFromProject(this);
                }
            }
            else {
                // release all root files
                for (const root of this.rootFiles) {
                    root.detachFromProject(this);
                }
            }
            this.rootFiles = undefined;
            this.rootFilesMap = undefined;
            this.program = undefined;

            // signal language service to release source files acquired from document registry
            this.languageService.dispose();
        }

        getCompilerOptions() {
            return this.compilerOptions;
        }

        hasRoots() {
            return this.rootFiles && this.rootFiles.length > 0;
        }

        getRootFiles() {
            return this.rootFiles && this.rootFiles.map(info => info.fileName);
        }

        getRootFilesLSHost() {
            const result: string[] = [];
            if (this.rootFiles) {
                for (const f of this.rootFiles) {
                    result.push(f.fileName);
                }
                if (this.typingFiles) {
                    for (const f of this.typingFiles) {
                        result.push(f);
                    }
                }
            }
            return result;
        }

        getRootScriptInfos() {
            return this.rootFiles;
        }

        getScriptInfos() {
            return map(this.program.getSourceFiles(), sourceFile => {
                const scriptInfo = this.projectService.getScriptInfoForPath(sourceFile.path);
                if (!scriptInfo) {
                    Debug.assert(false, `scriptInfo for a file '${sourceFile.fileName}' is missing.`);
                }
                return scriptInfo;
            });
        }

        getFileEmitOutput(info: ScriptInfo, emitOnlyDtsFiles: boolean) {
            if (!this.languageServiceEnabled) {
                return undefined;
            }
            return this.getLanguageService().getEmitOutput(info.fileName, emitOnlyDtsFiles);
        }

        getFileNames() {
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
            const sourceFiles = this.program.getSourceFiles();
            return sourceFiles.map(sourceFile => asNormalizedPath(sourceFile.fileName));
        }

        getAllEmittableFiles() {
            if (!this.languageServiceEnabled) {
                return [];
            }
            const defaultLibraryFileName = getDefaultLibFileName(this.compilerOptions);
            const infos = this.getScriptInfos();
            const result: string[] = [];
            for (const info of infos) {
                if (getBaseFileName(info.fileName) !== defaultLibraryFileName && shouldEmitFile(info)) {
                    result.push(info.fileName);
                }
            }
            return result;
        }

        containsScriptInfo(info: ScriptInfo): boolean {
            return this.isRoot(info) || (this.program && this.program.getSourceFileByPath(info.path) !== undefined);
        }

        containsFile(filename: NormalizedPath, requireOpen?: boolean) {
            const info = this.projectService.getScriptInfoForNormalizedPath(filename);
            if (info && (info.isOpen || !requireOpen)) {
                return this.containsScriptInfo(info);
            }
        }

        isRoot(info: ScriptInfo) {
            return this.rootFilesMap && this.rootFilesMap.contains(info.path);
        }

        // add a root file to project
        addRoot(info: ScriptInfo) {
            if (!this.isRoot(info)) {
                this.rootFiles.push(info);
                this.rootFilesMap.set(info.path, info);
                info.attachToProject(this);

                this.markAsDirty();
            }
        }

        removeFile(info: ScriptInfo, detachFromProject = true) {
            this.removeRootFileIfNecessary(info);
            this.lsHost.notifyFileRemoved(info);

            if (detachFromProject) {
                info.detachFromProject(this);
            }

            this.markAsDirty();
        }

        markAsDirty() {
            this.projectStateVersion++;
        }

        /**
         * Updates set of files that contribute to this project
         * @returns: true if set of files in the project stays the same and false - otherwise.
         */
        updateGraph(): boolean {
            if (!this.languageServiceEnabled) {
                return true;
            }
            let hasChanges = this.updateGraphWorker();
            const cachedTypings = this.projectService.typingsCache.getTypingsForProject(this, hasChanges);
            if (this.setTypings(cachedTypings)) {
                hasChanges = this.updateGraphWorker() || hasChanges;
            }
            if (hasChanges) {
                this.projectStructureVersion++;
            }
            return !hasChanges;
        }

        private setTypings(typings: TypingsArray): boolean {
            if (arrayIsEqualTo(this.typingFiles, typings)) {
                return false;
            }
            this.typingFiles = typings;
            this.markAsDirty();
            return true;
        }

        private updateGraphWorker() {
            const oldProgram = this.program;
            this.program = this.languageService.getProgram();

            let hasChanges = false;
            // bump up the version if
            // - oldProgram is not set - this is a first time updateGraph is called
            // - newProgram is different from the old program and structure of the old program was not reused.
            if (!oldProgram || (this.program !== oldProgram && !oldProgram.structureIsReused)) {
                hasChanges = true;
                if (oldProgram) {
                    for (const f of oldProgram.getSourceFiles()) {
                        if (this.program.getSourceFileByPath(f.path)) {
                            continue;
                        }
                        // new program does not contain this file - detach it from the project
                        const scriptInfoToDetach = this.projectService.getScriptInfo(f.fileName);
                        if (scriptInfoToDetach) {
                            scriptInfoToDetach.detachFromProject(this);
                        }
                    }
                }
            }
            this.builder.onProjectUpdateGraph();
            return hasChanges;
        }

        getScriptInfoLSHost(fileName: string) {
            const scriptInfo = this.projectService.getOrCreateScriptInfo(fileName, /*openedByClient*/ false);
            if (scriptInfo) {
                scriptInfo.attachToProject(this);
            }
            return scriptInfo;
        }

        getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
            const scriptInfo = this.projectService.getOrCreateScriptInfoForNormalizedPath(fileName, /*openedByClient*/ false);
            if (scriptInfo && !scriptInfo.isAttached(this)) {
                return Errors.ThrowProjectDoesNotContainDocument(fileName, this);
            }
            return scriptInfo;
        }

        getScriptInfo(uncheckedFileName: string) {
            return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
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
                if (this.projectKind === ProjectKind.Inferred) {
                    compilerOptions.allowJs = true;
                }
                compilerOptions.allowNonTsExtensions = true;
                this.compilerOptions = compilerOptions;
                this.lsHost.setCompilationSettings(compilerOptions);

                this.markAsDirty();
            }
        }

        reloadScript(filename: NormalizedPath): boolean {
            const script = this.projectService.getScriptInfoForNormalizedPath(filename);
            if (script) {
                Debug.assert(script.isAttached(this));
                script.reloadFromFile();
                return true;
            }
            return false;
        }

        getChangesSinceVersion(lastKnownVersion?: number): ProjectFilesWithTSDiagnostics {
            this.updateGraph();

            const info = {
                projectName: this.getProjectName(),
                version: this.projectStructureVersion,
                isInferred: this.projectKind === ProjectKind.Inferred,
                options: this.getCompilerOptions()
            };
            // check if requested version is the same that we have reported last time
            if (this.lastReportedFileNames && lastKnownVersion === this.lastReportedVersion) {
                // if current structure version is the same - return info witout any changes
                if (this.projectStructureVersion == this.lastReportedVersion) {
                    return { info, projectErrors: this.projectErrors };
                }
                // compute and return the difference
                const lastReportedFileNames = this.lastReportedFileNames;
                const currentFiles = arrayToMap(this.getFileNames(), x => x);

                const added: string[] = [];
                const removed: string[] = [];
                forEachKeyInMap(currentFiles, id => {
                    if (!lastReportedFileNames.has(id)) {
                        added.push(id);
                    }
                });
                forEachKeyInMap(lastReportedFileNames, id => {
                    if (!currentFiles.has(id)) {
                        removed.push(id);
                    }
                });
                this.lastReportedFileNames = currentFiles;
                this.lastReportedVersion = this.projectStructureVersion;
                return { info, changes: { added, removed }, projectErrors: this.projectErrors };
            }
            else {
                // unknown version - return everything
                const projectFileNames = this.getFileNames();
                this.lastReportedFileNames = arrayToMap(projectFileNames, x => x);
                this.lastReportedVersion = this.projectStructureVersion;
                return { info, files: projectFileNames, projectErrors: this.projectErrors };
            }
        }

        getReferencedFiles(path: Path): Path[] {
            if (!this.languageServiceEnabled) {
                return [];
            }

            const sourceFile = this.getSourceFile(path);
            if (!sourceFile) {
                return [];
            }
            // We need to use a set here since the code can contain the same import twice,
            // but that will only be one dependency.
            // To avoid invernal conversion, the key of the referencedFiles map must be of type Path
            const referencedFiles = new StringSet();
            if (sourceFile.imports && sourceFile.imports.length > 0) {
                const checker: TypeChecker = this.program.getTypeChecker();
                for (const importName of sourceFile.imports) {
                    const symbol = checker.getSymbolAtLocation(importName);
                    if (symbol && symbol.declarations && symbol.declarations[0]) {
                        const declarationSourceFile = symbol.declarations[0].getSourceFile();
                        if (declarationSourceFile) {
                            referencedFiles.add(declarationSourceFile.path);
                        }
                    }
                }
            }

            const currentDirectory = getDirectoryPath(path);
            const getCanonicalFileName = createGetCanonicalFileName(this.projectService.host.useCaseSensitiveFileNames);
            // Handle triple slash references
            if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
                for (const referencedFile of sourceFile.referencedFiles) {
                    const referencedPath = toPath(referencedFile.fileName, currentDirectory, getCanonicalFileName);
                    referencedFiles.add(referencedPath);
                }
            }

            // Handle type reference directives
            if (sourceFile.resolvedTypeReferenceDirectiveNames) {
                sourceFile.resolvedTypeReferenceDirectiveNames.forEach(resolvedTypeReferenceDirective => {
                    if (!resolvedTypeReferenceDirective) {
                        return;
                    }

                    const fileName = resolvedTypeReferenceDirective.resolvedFileName;
                    const typeFilePath = toPath(fileName, currentDirectory, getCanonicalFileName);
                    referencedFiles.add(typeFilePath);
                });
            }

            return filterSetToArray(referencedFiles, file => this.projectService.host.fileExists(file)) as Path[];
        }

        // remove a root file from project
        private removeRootFileIfNecessary(info: ScriptInfo): void {
            if (this.isRoot(info)) {
                remove(this.rootFiles, info);
                this.rootFilesMap.remove(info.path);
            }
        }
    }

    export class InferredProject extends Project {

        private static NextId = 1;

        /**
         * Unique name that identifies this particular inferred project
         */
        private readonly inferredProjectName: string;

        // Used to keep track of what directories are watched for this project
        directoriesWatchedForTsconfig: string[] = [];

        constructor(projectService: ProjectService, documentRegistry: ts.DocumentRegistry, languageServiceEnabled: boolean, compilerOptions: CompilerOptions, public compileOnSaveEnabled: boolean) {
            super(ProjectKind.Inferred,
                projectService,
                documentRegistry,
                /*files*/ undefined,
                languageServiceEnabled,
                compilerOptions,
                compileOnSaveEnabled);

            this.inferredProjectName = makeInferredProjectName(InferredProject.NextId);
            InferredProject.NextId++;
        }

        getProjectName() {
            return this.inferredProjectName;
        }

        getProjectRootPath() {
            // Single inferred project does not have a project root.
            if (this.projectService.useSingleInferredProject) {
                return undefined;
            }
            const rootFiles = this.getRootFiles();
            return getDirectoryPath(rootFiles[0]);
        }

        close() {
            super.close();

            for (const directory of this.directoriesWatchedForTsconfig) {
                this.projectService.stopWatchingDirectory(directory);
            }
        }

        getTypingOptions(): TypingOptions {
            return {
                enableAutoDiscovery: allRootFilesAreJsOrDts(this),
                include: [],
                exclude: []
            };
        }
    }

    export class ConfiguredProject extends Project {
        private typingOptions: TypingOptions;
        private projectFileWatcher: FileWatcher;
        private directoryWatcher: FileWatcher;
        private directoriesWatchedForWildcards: Map<string, FileWatcher>;
        private typeRootsWatchers: FileWatcher[];

        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        constructor(readonly configFileName: NormalizedPath,
            projectService: ProjectService,
            documentRegistry: ts.DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            compilerOptions: CompilerOptions,
            private wildcardDirectories: Map<string, WatchDirectoryFlags>,
            languageServiceEnabled: boolean,
            public compileOnSaveEnabled: boolean) {
            super(ProjectKind.Configured, projectService, documentRegistry, hasExplicitListOfFiles, languageServiceEnabled, compilerOptions, compileOnSaveEnabled);
        }

        getProjectRootPath() {
            return getDirectoryPath(this.configFileName);
        }

        setProjectErrors(projectErrors: Diagnostic[]) {
            this.projectErrors = projectErrors;
        }

        setTypingOptions(newTypingOptions: TypingOptions): void {
            this.typingOptions = newTypingOptions;
        }

        getTypingOptions() {
            return this.typingOptions;
        }

        getProjectName() {
            return this.configFileName;
        }

        watchConfigFile(callback: (project: ConfiguredProject) => void) {
            this.projectFileWatcher = this.projectService.host.watchFile(this.configFileName, _ => callback(this));
        }

        watchTypeRoots(callback: (project: ConfiguredProject, path: string) => void) {
            const roots = this.getEffectiveTypeRoots();
            const watchers: FileWatcher[] = [];
            for (const root of roots) {
                this.projectService.logger.info(`Add type root watcher for: ${root}`);
                watchers.push(this.projectService.host.watchDirectory(root, path => callback(this, path), /*recursive*/ false));
            }
            this.typeRootsWatchers = watchers;
        }

        watchConfigDirectory(callback: (project: ConfiguredProject, path: string) => void) {
            if (this.directoryWatcher) {
                return;
            }

            const directoryToWatch = getDirectoryPath(this.configFileName);
            this.projectService.logger.info(`Add recursive watcher for: ${directoryToWatch}`);
            this.directoryWatcher = this.projectService.host.watchDirectory(directoryToWatch, path => callback(this, path), /*recursive*/ true);
        }

        watchWildcards(callback: (project: ConfiguredProject, path: string) => void) {
            if (!this.wildcardDirectories) {
                return;
            }
            const configDirectoryPath = getDirectoryPath(this.configFileName);

            this.directoriesWatchedForWildcards = new StringMap<FileWatcher>();
            this.wildcardDirectories.forEach((flag, directory) => {
                if (comparePaths(configDirectoryPath, directory, ".", !this.projectService.host.useCaseSensitiveFileNames) !== Comparison.EqualTo) {
                    const recursive = (flag & WatchDirectoryFlags.Recursive) !== 0;
                    this.projectService.logger.info(`Add ${recursive ? "recursive " : ""}watcher for: ${directory}`);
                    this.directoriesWatchedForWildcards.set(directory, this.projectService.host.watchDirectory(
                        directory,
                        path => callback(this, path),
                        recursive
                    ));
                }
            });
        }

        stopWatchingDirectory() {
            if (this.directoryWatcher) {
                this.directoryWatcher.close();
                this.directoryWatcher = undefined;
            }
        }

        close() {
            super.close();

            if (this.projectFileWatcher) {
                this.projectFileWatcher.close();
            }

            if (this.typeRootsWatchers) {
                for (const watcher of this.typeRootsWatchers) {
                    watcher.close();
                }
                this.typeRootsWatchers = undefined;
            }

            this.directoriesWatchedForWildcards.forEach(watcher => { watcher.close(); });
            this.directoriesWatchedForWildcards = undefined;

            this.stopWatchingDirectory();
        }

        addOpenRef() {
            this.openRefCount++;
        }

        deleteOpenRef() {
            this.openRefCount--;
            return this.openRefCount;
        }

        getEffectiveTypeRoots() {
            return ts.getEffectiveTypeRoots(this.getCompilerOptions(), this.projectService.host) || [];
        }
    }

    export class ExternalProject extends Project {
        private typingOptions: TypingOptions;
        constructor(readonly externalProjectName: string,
            projectService: ProjectService,
            documentRegistry: ts.DocumentRegistry,
            compilerOptions: CompilerOptions,
            languageServiceEnabled: boolean,
            public compileOnSaveEnabled: boolean,
            private readonly projectFilePath?: string) {
            super(ProjectKind.External, projectService, documentRegistry, /*hasExplicitListOfFiles*/ true, languageServiceEnabled, compilerOptions, compileOnSaveEnabled);
        }

        getProjectRootPath() {
            if (this.projectFilePath) {
                return getDirectoryPath(this.projectFilePath);
            }
            // if the projectFilePath is not given, we make the assumption that the project name
            // is the path of the project file. AS the project name is provided by VS, we need to
            // normalize slashes before using it as a file name.
            return getDirectoryPath(normalizeSlashes(this.externalProjectName));
        }

        getTypingOptions() {
            return this.typingOptions;
        }

        setProjectErrors(projectErrors: Diagnostic[]) {
            this.projectErrors = projectErrors;
        }

        setTypingOptions(newTypingOptions: TypingOptions): void {
            if (!newTypingOptions) {
                // set default typings options
                newTypingOptions = {
                    enableAutoDiscovery: allRootFilesAreJsOrDts(this),
                    include: [],
                    exclude: []
                };
            }
            else {
                if (newTypingOptions.enableAutoDiscovery === undefined) {
                    // if autoDiscovery was not specified by the caller - set it based on the content of the project
                    newTypingOptions.enableAutoDiscovery = allRootFilesAreJsOrDts(this);
                }
                if (!newTypingOptions.include) {
                    newTypingOptions.include = [];
                }
                if (!newTypingOptions.exclude) {
                    newTypingOptions.exclude = [];
                }
            }
            this.typingOptions = newTypingOptions;
        }

        getProjectName() {
            return this.externalProjectName;
        }
    }
}
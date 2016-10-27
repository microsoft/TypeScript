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

    function countEachFileTypes(infos: ScriptInfo[]): { js: number, jsx: number, ts: number, tsx: number, dts: number } {
        const result = { js: 0, jsx: 0, ts: 0, tsx: 0, dts: 0 };
        for (const info of infos) {
            switch (info.scriptKind) {
                case ScriptKind.JS:
                    result.js += 1;
                    break;
                case ScriptKind.JSX:
                    result.jsx += 1;
                    break;
                case ScriptKind.TS:
                    fileExtensionIs(info.fileName, ".d.ts")
                        ? result.dts += 1
                        : result.ts += 1;
                    break;
                case ScriptKind.TSX:
                    result.tsx += 1;
                    break;
            }
        }
        return result;
    }

    function hasOneOrMoreJsAndNoTsFiles(project: Project) {
        const counts = countEachFileTypes(project.getScriptInfos());
        return counts.js > 0 && counts.ts === 0 && counts.tsx === 0;
    }

    export function allRootFilesAreJsOrDts(project: Project): boolean {
        const counts = countEachFileTypes(project.getRootScriptInfos());
        return counts.ts === 0 && counts.tsx === 0;
    }

    export function allFilesAreJsOrDts(project: Project): boolean {
        const counts = countEachFileTypes(project.getScriptInfos());
        return counts.ts === 0 && counts.tsx === 0;
    }

    export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
        projectErrors: Diagnostic[];
    }

    export class UnresolvedImportsMap {
        readonly perFileMap = createFileMap<ReadonlyArray<string>>();
        private version = 0;

        public clear() {
            this.perFileMap.clear();
            this.version = 0;
        }

        public getVersion() {
            return this.version;
        }

        public remove(path: Path) {
            this.perFileMap.remove(path);
            this.version++;
        }

        public get(path: Path) {
            return this.perFileMap.get(path);
        }

        public set(path: Path, value: ReadonlyArray<string>) {
            this.perFileMap.set(path, value);
            this.version++;
        }
    }

    export abstract class Project {
        private rootFiles: ScriptInfo[] = [];
        private rootFilesMap: FileMap<ScriptInfo> = createFileMap<ScriptInfo>();
        private lsHost: ServerLanguageServiceHost;
        private program: ts.Program;

        private cachedUnresolvedImportsPerFile = new UnresolvedImportsMap();
        private lastCachedUnresolvedImportsList: SortedReadonlyArray<string>;

        private languageService: LanguageService;
        builder: Builder;
        /**
         * Set of files that was returned from the last call to getChangesSinceVersion.
         */
        private lastReportedFileNames: Map<string>;
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

        private typingFiles: SortedReadonlyArray<string>;

        protected projectErrors: Diagnostic[];

        public typesVersion = 0;

        public isNonTsProject() {
            this.updateGraph();
            return allFilesAreJsOrDts(this);
        }

        public isJsOnlyProject() {
            this.updateGraph();
            return hasOneOrMoreJsAndNoTsFiles(this);
        }

        public getCachedUnresolvedImportsPerFile_TestOnly() {
            return this.cachedUnresolvedImportsPerFile;
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
            this.cachedUnresolvedImportsPerFile.remove(info.path);

            if (detachFromProject) {
                info.detachFromProject(this);
            }

            this.markAsDirty();
        }

        markAsDirty() {
            this.projectStateVersion++;
        }

        private extractUnresolvedImportsFromSourceFile(file: SourceFile, result: string[]) {
            const cached = this.cachedUnresolvedImportsPerFile.get(file.path);
            if (cached) {
                // found cached result - use it and return
                for (const f of cached) {
                    result.push(f);
                }
                return;
            }
            let unresolvedImports: string[];
            if (file.resolvedModules) {
                for (const name in file.resolvedModules) {
                    // pick unresolved non-relative names
                    if (!file.resolvedModules[name] && !isExternalModuleNameRelative(name)) {
                        // for non-scoped names extract part up-to the first slash
                        // for scoped names - extract up to the second slash
                        let trimmed = name.trim();
                        let i = trimmed.indexOf("/");
                        if (i !== -1 && trimmed.charCodeAt(0) === CharacterCodes.at) {
                            i = trimmed.indexOf("/", i + 1);
                        }
                        if (i !== -1) {
                            trimmed = trimmed.substr(0, i);
                        }
                        (unresolvedImports || (unresolvedImports = [])).push(trimmed);
                        result.push(trimmed);
                    }
                }
            }
            this.cachedUnresolvedImportsPerFile.set(file.path, unresolvedImports || emptyArray);
        }

        /**
         * Updates set of files that contribute to this project
         * @returns: true if set of files in the project stays the same and false - otherwise.
         */
        updateGraph(): boolean {
            if (!this.languageServiceEnabled) {
                return true;
            }

            this.lsHost.startRecordingFilesWithChangedResolutions();

            let hasChanges = this.updateGraphWorker();

            const changedFiles: ReadonlyArray<Path> = this.lsHost.finishRecordingFilesWithChangedResolutions() || emptyArray;

            for (const file of changedFiles) {
                // delete cached information for changed files
                this.cachedUnresolvedImportsPerFile.remove(file);
            }

            // 1. no changes in structure, no changes in unresolved imports - do nothing
            // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files 
            // (can reuse cached imports for files that were not changed)
            // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
            // (can reuse cached imports for files that were not changed)
            // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
            let unresolvedImports: SortedReadonlyArray<string>;
            if (hasChanges || changedFiles.length) {
                const result: string[] = [];
                for (const sourceFile of this.program.getSourceFiles()) {
                    this.extractUnresolvedImportsFromSourceFile(sourceFile, result);
                }
                this.lastCachedUnresolvedImportsList = toSortedReadonlyArray(result);
            }
            unresolvedImports = this.lastCachedUnresolvedImportsList;

            const cachedTypings = this.projectService.typingsCache.getTypingsForProject(this, unresolvedImports, hasChanges);
            if (this.setTypings(cachedTypings)) {
                hasChanges = this.updateGraphWorker() || hasChanges;
            }
            if (hasChanges) {
                this.projectStructureVersion++;
            }
            return !hasChanges;
        }

        private setTypings(typings: SortedReadonlyArray<string>): boolean {
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
                if (changesAffectModuleResolution(this.compilerOptions, compilerOptions)) {
                    // reset cached unresolved imports if changes in compiler options affected module resolution
                    this.cachedUnresolvedImportsPerFile.clear();
                    this.lastCachedUnresolvedImportsList = undefined;
                }
                this.compilerOptions = compilerOptions;
                this.lsHost.setCompilationSettings(compilerOptions);

                this.markAsDirty();
            }
        }

        reloadScript(filename: NormalizedPath, tempFileName?: NormalizedPath): boolean {
            const script = this.projectService.getScriptInfoForNormalizedPath(filename);
            if (script) {
                Debug.assert(script.isAttached(this));
                script.reloadFromFile(tempFileName);
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
                for (const id in currentFiles) {
                    if (!hasProperty(lastReportedFileNames, id)) {
                        added.push(id);
                    }
                }
                for (const id in lastReportedFileNames) {
                    if (!hasProperty(currentFiles, id)) {
                        removed.push(id);
                    }
                }
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
            const referencedFiles = createMap<boolean>();
            if (sourceFile.imports && sourceFile.imports.length > 0) {
                const checker: TypeChecker = this.program.getTypeChecker();
                for (const importName of sourceFile.imports) {
                    const symbol = checker.getSymbolAtLocation(importName);
                    if (symbol && symbol.declarations && symbol.declarations[0]) {
                        const declarationSourceFile = symbol.declarations[0].getSourceFile();
                        if (declarationSourceFile) {
                            referencedFiles[declarationSourceFile.path] = true;
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
                    referencedFiles[referencedPath] = true;
                }
            }

            // Handle type reference directives
            if (sourceFile.resolvedTypeReferenceDirectiveNames) {
                for (const typeName in sourceFile.resolvedTypeReferenceDirectiveNames) {
                    const resolvedTypeReferenceDirective = sourceFile.resolvedTypeReferenceDirectiveNames[typeName];
                    if (!resolvedTypeReferenceDirective) {
                        continue;
                    }

                    const fileName = resolvedTypeReferenceDirective.resolvedFileName;
                    const typeFilePath = toPath(fileName, currentDirectory, getCanonicalFileName);
                    referencedFiles[typeFilePath] = true;
                }
            }

            const allFileNames = map(Object.keys(referencedFiles), key => <Path>key);
            return filter(allFileNames, file => this.projectService.host.fileExists(file));
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
        private directoriesWatchedForWildcards: Map<FileWatcher>;
        private typeRootsWatchers: FileWatcher[];

        /** Used for configured projects which may have multiple open roots */
        openRefCount = 0;

        constructor(readonly configFileName: NormalizedPath,
            projectService: ProjectService,
            documentRegistry: ts.DocumentRegistry,
            hasExplicitListOfFiles: boolean,
            compilerOptions: CompilerOptions,
            private wildcardDirectories: Map<WatchDirectoryFlags>,
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
            this.directoriesWatchedForWildcards = reduceProperties(this.wildcardDirectories, (watchers, flag, directory) => {
                if (comparePaths(configDirectoryPath, directory, ".", !this.projectService.host.useCaseSensitiveFileNames) !== Comparison.EqualTo) {
                    const recursive = (flag & WatchDirectoryFlags.Recursive) !== 0;
                    this.projectService.logger.info(`Add ${recursive ? "recursive " : ""}watcher for: ${directory}`);
                    watchers[directory] = this.projectService.host.watchDirectory(
                        directory,
                        path => callback(this, path),
                        recursive
                    );
                }
                return watchers;
            }, <Map<FileWatcher>>{});
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

            for (const id in this.directoriesWatchedForWildcards) {
                this.directoriesWatchedForWildcards[id].close();
            }
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
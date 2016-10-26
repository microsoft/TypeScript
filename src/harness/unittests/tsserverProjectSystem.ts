/// <reference path="..\harness.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    import TI = server.typingsInstaller;
    import protocol = server.protocol;
    import CommandNames = server.CommandNames;

    const safeList = {
        path: <Path>"/safeList.json",
        content: JSON.stringify({
            commander: "commander",
            express: "express",
            jquery: "jquery",
            lodash: "lodash",
            moment: "moment"
        })
    };

    export interface PostExecAction {
        readonly requestKind: TI.RequestKind;
        readonly success: boolean;
        readonly callback: TI.RequestCompletedAction;
    }

    export const nullLogger: server.Logger = {
        close: () => void 0,
        hasLevel: () => void 0,
        loggingEnabled: () => false,
        perftrc: () => void 0,
        info: () => void 0,
        startGroup: () => void 0,
        endGroup: () => void 0,
        msg: () => void 0,
        getLogFileName: (): string => undefined
    };

    export const nullCancellationToken: HostCancellationToken = {
        isCancellationRequested: () => false
    };

    export const { content: libFileContent } = Harness.getDefaultLibraryFile(Harness.IO);
    export const libFile: FileOrFolder = {
        path: "/a/lib/lib.d.ts",
        content: libFileContent
    };

    export class TestTypingsInstaller extends TI.TypingsInstaller implements server.ITypingsInstaller {
        protected projectService: server.ProjectService;
        constructor(readonly globalTypingsCacheLocation: string, throttleLimit: number, readonly installTypingHost: server.ServerHost, log?: TI.Log) {
            super(globalTypingsCacheLocation, safeList.path, throttleLimit, log);
            this.init();
        }

        safeFileList = safeList.path;
        protected postExecActions: PostExecAction[] = [];

        executePendingCommands() {
            const actionsToRun = this.postExecActions;
            this.postExecActions = [];
            for (const action of actionsToRun) {
                action.callback(action.success);
            }
        }

        checkPendingCommands(expected: TI.RequestKind[]) {
            assert.equal(this.postExecActions.length, expected.length, `Expected ${expected.length} post install actions`);
            this.postExecActions.forEach((act, i) => assert.equal(act.requestKind, expected[i], "Unexpected post install action"));
        }

        onProjectClosed() {
        }

        attach(projectService: server.ProjectService) {
            this.projectService = projectService;
        }

        getInstallTypingHost() {
            return this.installTypingHost;
        }

        executeRequest(requestKind: TI.RequestKind, _requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
            switch (requestKind) {
                case TI.NpmViewRequest:
                case TI.NpmInstallRequest:
                    break;
                default:
                    assert.isTrue(false, `request ${requestKind} is not supported`);
            }
            this.addPostExecAction(requestKind, "success", cb);
        }

        sendResponse(response: server.SetTypings | server.InvalidateCachedTypings) {
            this.projectService.updateTypingsForProject(response);
        }

        enqueueInstallTypingsRequest(project: server.Project, typingOptions: TypingOptions, unresolvedImports: server.SortedReadonlyArray<string>) {
            const request = server.createInstallTypingsRequest(project, typingOptions, unresolvedImports, this.globalTypingsCacheLocation);
            this.install(request);
        }

        addPostExecAction(requestKind: TI.RequestKind, stdout: string | string[], cb: TI.RequestCompletedAction) {
            const out = typeof stdout === "string" ? stdout : createNpmPackageJsonString(stdout);
            const action: PostExecAction = {
                success: !!out,
                callback: cb,
                requestKind
            };
            this.postExecActions.push(action);
        }
    }

    function createNpmPackageJsonString(installedTypings: string[]): string {
        const dependencies: MapLike<any> = {};
        for (const typing of installedTypings) {
            dependencies[typing] = "1.0.0";
        }
        return JSON.stringify({ dependencies: dependencies });
    }

    export function getExecutingFilePathFromLibFile(): string {
        return combinePaths(getDirectoryPath(libFile.path), "tsc.js");
    }

    export function toExternalFile(fileName: string): protocol.ExternalFile {
        return { fileName };
    }

    export function toExternalFiles(fileNames: string[]) {
        return map(fileNames, toExternalFile);
    }

    export class TestServerEventManager {
        public events: server.ProjectServiceEvent[] = [];

        handler: server.ProjectServiceEventHandler = (event: server.ProjectServiceEvent) => {
            this.events.push(event);
        }

        checkEventCountOfType(eventType: "context" | "configFileDiag", expectedCount: number) {
            const eventsOfType = filter(this.events, e => e.eventName === eventType);
            assert.equal(eventsOfType.length, expectedCount, `The actual event counts of type ${eventType} is ${eventsOfType.length}, while expected ${expectedCount}`);
        }
    }

    export interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        libFile?: FileOrFolder;
        currentDirectory?: string;
    }

    export function createServerHost(fileOrFolderList: FileOrFolder[], params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList);
        host.createFileOrFolder(safeList, /*createParentDirectory*/ true);
        return host;
    }

    class TestSession extends server.Session {
        getProjectService() {
            return this.projectService;
        }
    };

    export function createSession(host: server.ServerHost, typingsInstaller?: server.ITypingsInstaller, projectServiceEventHandler?: server.ProjectServiceEventHandler) {
        if (typingsInstaller === undefined) {
            typingsInstaller = new TestTypingsInstaller("/a/data/", /*throttleLimit*/5, host);
        }

        return new TestSession(host, nullCancellationToken, /*useSingleInferredProject*/ false, typingsInstaller, Utils.byteLength, process.hrtime, nullLogger, /*canUseEvents*/ projectServiceEventHandler !== undefined, projectServiceEventHandler);
    }

    export interface CreateProjectServiceParameters {
        cancellationToken?: HostCancellationToken;
        logger?: server.Logger;
        useSingleInferredProject?: boolean;
        typingsInstaller?: server.ITypingsInstaller;
        eventHandler?: server.ProjectServiceEventHandler;
    }


    export class TestProjectService extends server.ProjectService {
        constructor(host: server.ServerHost, logger: server.Logger, cancellationToken: HostCancellationToken, useSingleInferredProject: boolean,
            typingsInstaller: server.ITypingsInstaller, eventHandler: server.ProjectServiceEventHandler) {
            super(host, logger, cancellationToken, useSingleInferredProject, typingsInstaller, eventHandler);
        }

        checkNumberOfProjects(count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
            checkNumberOfProjects(this, count);
        }
    }
    export function createProjectService(host: server.ServerHost, parameters: CreateProjectServiceParameters = {}) {
        const cancellationToken = parameters.cancellationToken || nullCancellationToken;
        const logger = parameters.logger || nullLogger;
        const useSingleInferredProject = parameters.useSingleInferredProject !== undefined ? parameters.useSingleInferredProject : false;
        return new TestProjectService(host, logger, cancellationToken, useSingleInferredProject, parameters.typingsInstaller, parameters.eventHandler);
    }

    export interface FileOrFolder {
        path: string;
        content?: string;
        fileSize?: number;
    }

    export interface FSEntry {
        path: Path;
        fullPath: string;
    }

    export interface File extends FSEntry {
        content: string;
        fileSize?: number;
    }

    export interface Folder extends FSEntry {
        entries: FSEntry[];
    }

    export function isFolder(s: FSEntry): s is Folder {
        return isArray((<Folder>s).entries);
    }

    export function isFile(s: FSEntry): s is File {
        return typeof (<File>s).content === "string";
    }

    export function addFolder(fullPath: string, toPath: (s: string) => Path, fs: FileMap<FSEntry>): Folder {
        const path = toPath(fullPath);
        if (fs.contains(path)) {
            Debug.assert(isFolder(fs.get(path)));
            return (<Folder>fs.get(path));
        }

        const entry: Folder = { path, entries: [], fullPath };
        fs.set(path, entry);

        const baseFullPath = getDirectoryPath(fullPath);
        if (fullPath !== baseFullPath) {
            addFolder(baseFullPath, toPath, fs).entries.push(entry);
        }

        return entry;
    }

    export function checkMapKeys(caption: string, map: Map<any>, expectedKeys: string[]) {
        assert.equal(reduceProperties(map, count => count + 1, 0), expectedKeys.length, `${caption}: incorrect size of map`);
        for (const name of expectedKeys) {
            assert.isTrue(name in map, `${caption} is expected to contain ${name}, actual keys: ${Object.keys(map)}`);
        }
    }

    export function checkFileNames(caption: string, actualFileNames: string[], expectedFileNames: string[]) {
        assert.equal(actualFileNames.length, expectedFileNames.length, `${caption}: incorrect actual number of files, expected ${JSON.stringify(expectedFileNames)}, got ${actualFileNames}`);
        for (const f of expectedFileNames) {
            assert.isTrue(contains(actualFileNames, f), `${caption}: expected to find ${f} in ${JSON.stringify(actualFileNames)}`);
        }
    }

    export function checkNumberOfConfiguredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.configuredProjects.length, expected, `expected ${expected} configured project(s)`);
    }

    export function checkNumberOfExternalProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.externalProjects.length, expected, `expected ${expected} external project(s)`);
    }

    export function checkNumberOfInferredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.inferredProjects.length, expected, `expected ${expected} inferred project(s)`);
    }

    export function checkNumberOfProjects(projectService: server.ProjectService, count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
        checkNumberOfConfiguredProjects(projectService, count.configuredProjects || 0);
        checkNumberOfExternalProjects(projectService, count.externalProjects || 0);
        checkNumberOfInferredProjects(projectService, count.inferredProjects || 0);
    }

    export function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]) {
        checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
    }

    export function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[]) {
        checkMapKeys("watchedDirectories", host.watchedDirectories, expectedDirectories);
    }

    export function checkProjectActualFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, actual files`, project.getFileNames(), expectedFiles);
    }

    export function checkProjectRootFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, rootFileNames`, project.getRootFiles(), expectedFiles);
    }

    export class Callbacks {
        private map: { [n: number]: TimeOutCallback } = {};
        private nextId = 1;

        register(cb: (...args: any[]) => void, args: any[]) {
            const timeoutId = this.nextId;
            this.nextId++;
            this.map[timeoutId] = cb.bind(undefined, ...args);
            return timeoutId;
        }
        unregister(id: any) {
            if (typeof id === "number") {
                delete this.map[id];
            }
        }

        count() {
            let n = 0;
            for (const _ in this.map) {
                // TODO: GH#11734
                _;
                n++;
            }
            return n;
        }

        invoke() {
            for (const id in this.map) {
                if (hasProperty(this.map, id)) {
                    this.map[id]();
                }
            }
            this.map = {};
        }
    }

    export type TimeOutCallback = () => any;

    export class TestServerHost implements server.ServerHost {
        args: string[] = [];
        newLine: "\n";

        private fs: ts.FileMap<FSEntry>;
        private getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;
        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();

        readonly watchedDirectories = createMap<{ cb: DirectoryWatcherCallback, recursive: boolean }[]>();
        readonly watchedFiles = createMap<FileWatcherCallback[]>();

        private filesOrFolders: FileOrFolder[];

        constructor(public useCaseSensitiveFileNames: boolean, private executingFilePath: string, private currentDirectory: string, fileOrFolderList: FileOrFolder[]) {
            this.getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);

            this.reloadFS(fileOrFolderList);
        }

        reloadFS(filesOrFolders: FileOrFolder[]) {
            this.filesOrFolders = filesOrFolders;
            this.fs = createFileMap<FSEntry>();
            for (const fileOrFolder of filesOrFolders) {
                const path = this.toPath(fileOrFolder.path);
                const fullPath = getNormalizedAbsolutePath(fileOrFolder.path, this.currentDirectory);
                if (typeof fileOrFolder.content === "string") {
                    const entry = { path, content: fileOrFolder.content, fullPath, fileSize: fileOrFolder.fileSize };
                    this.fs.set(path, entry);
                    addFolder(getDirectoryPath(fullPath), this.toPath, this.fs).entries.push(entry);
                }
                else {
                    addFolder(fullPath, this.toPath, this.fs);
                }
            }
        }

        fileExists(s: string) {
            const path = this.toPath(s);
            return this.fs.contains(path) && isFile(this.fs.get(path));
        };

        getFileSize(s: string) {
            const path = this.toPath(s);
            if (this.fs.contains(path)) {
                const entry = this.fs.get(path);
                if (isFile(entry)) {
                    return entry.fileSize ? entry.fileSize : entry.content.length;
                }
            }
            return undefined;
        }

        directoryExists(s: string) {
            const path = this.toPath(s);
            return this.fs.contains(path) && isFolder(this.fs.get(path));
        }

        getDirectories(s: string) {
            const path = this.toPath(s);
            if (!this.fs.contains(path)) {
                return [];
            }
            else {
                const entry = this.fs.get(path);
                return isFolder(entry) ? map(entry.entries, x => getBaseFileName(x.fullPath)) : [];
            }
        }

        readDirectory(path: string, extensions?: string[], exclude?: string[], include?: string[]): string[] {
            const that = this;
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), (dir) => {
                const result: FileSystemEntries = {
                    directories: [],
                    files: []
                };
                const dirEntry = that.fs.get(that.toPath(dir));
                if (isFolder(dirEntry)) {
                    dirEntry.entries.forEach((entry) => {
                        if (isFolder(entry)) {
                            result.directories.push(entry.fullPath);
                        }
                        else if (isFile(entry)) {
                            result.files.push(entry.fullPath);
                        }
                    });
                }
                return result;
            });
        }

        watchDirectory(directoryName: string, callback: DirectoryWatcherCallback, recursive: boolean): DirectoryWatcher {
            const path = this.toPath(directoryName);
            const cbWithRecursive = { cb: callback, recursive };
            multiMapAdd(this.watchedDirectories, path, cbWithRecursive);
            return {
                referenceCount: 0,
                directoryName,
                close: () => multiMapRemove(this.watchedDirectories, path, cbWithRecursive)
            };
        }

        triggerDirectoryWatcherCallback(directoryName: string, fileName: string): void {
            const path = this.toPath(directoryName);
            const callbacks = this.watchedDirectories[path];
            if (callbacks) {
                for (const callback of callbacks) {
                    callback.cb(fileName);
                }
            }
        }

        triggerFileWatcherCallback(fileName: string, removed?: boolean): void {
            const path = this.toPath(fileName);
            const callbacks = this.watchedFiles[path];
            if (callbacks) {
                for (const callback of callbacks) {
                    callback(path, removed);
                }
            }
        }

        watchFile(fileName: string, callback: FileWatcherCallback) {
            const path = this.toPath(fileName);
            multiMapAdd(this.watchedFiles, path, callback);
            return { close: () => multiMapRemove(this.watchedFiles, path, callback) };
        }

        // TOOD: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args);
        };

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
        };

        checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timeoutCallbacks.count();
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }

        runQueuedTimeoutCallbacks() {
            this.timeoutCallbacks.invoke();
        }

        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        };

        createDirectory(directoryName: string): void {
            this.createFileOrFolder({ path: directoryName });
        }

        writeFile(path: string, content: string): void {
            this.createFileOrFolder({ path, content, fileSize: content.length });
        }

        createFileOrFolder(f: FileOrFolder, createParentDirectory = false): void {
            const base = getDirectoryPath(f.path);
            if (base !== f.path && !this.directoryExists(base)) {
                if (createParentDirectory) {
                    // TODO: avoid reloading FS on every creation
                    this.createFileOrFolder({ path: base }, createParentDirectory);
                }
                else {
                    throw new Error(`directory ${base} does not exist`);
                }
            }
            const filesOrFolders = this.filesOrFolders.slice(0);
            filesOrFolders.push(f);
            this.reloadFS(filesOrFolders);
        }

        write() { }

        readonly readFile = (s: string) => (<File>this.fs.get(this.toPath(s))).content;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        readonly exit = notImplemented;
        readonly getEnvironmentVariable = notImplemented;
    }

    export function makeSessionRequest<T>(command: string, args: T) {
        const newRequest: protocol.Request = {
            seq: 0,
            type: "request",
            command,
            arguments: args
        };
        return newRequest;
    }

    export function openFilesForSession(files: FileOrFolder[], session: server.Session) {
        for (const file of files) {
            const request = makeSessionRequest<protocol.OpenRequestArgs>(CommandNames.Open, { file: file.path });
            session.executeCommand(request);
        }
    }

    describe("tsserver-project-system", () => {
        const commonFile1: FileOrFolder = {
            path: "/a/b/commonFile1.ts",
            content: "let x = 1"
        };
        const commonFile2: FileOrFolder = {
            path: "/a/b/commonFile2.ts",
            content: "let y = 1"
        };

        it("create inferred project", () => {
            const appFile: FileOrFolder = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: FileOrFolder = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createServerHost([appFile, moduleFile, libFile]);
            const projectService = createProjectService(host);
            const { configFileName } = projectService.openClientFile(appFile.path);

            assert(!configFileName, `should not find config, got: '${configFileName}`);
            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);

            const project = projectService.inferredProjects[0];

            checkFileNames("inferred project", project.getFileNames(), [appFile.path, libFile.path, moduleFile.path]);
            checkWatchedDirectories(host, ["/a/b/c", "/a/b", "/a"]);
        });

        it("create configured project without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: FileOrFolder = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: FileOrFolder = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: FileOrFolder = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createServerHost([configFile, libFile, file1, file2, file3]);
            const projectService = createProjectService(host);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkNumberOfInferredProjects(projectService, 0);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = projectService.configuredProjects[0];
            checkProjectActualFiles(project, [file1.path, libFile.path, file2.path]);
            checkProjectRootFiles(project, [file1.path, file2.path]);
            // watching all files except one that was open
            checkWatchedFiles(host, [configFile.path, file2.path, libFile.path]);
            checkWatchedDirectories(host, [getDirectoryPath(configFile.path)]);
        });

        it("add and then remove a config file in a folder with loose files", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "files": ["commonFile1.ts"]
                }`
            };
            const filesWithoutConfig = [libFile, commonFile1, commonFile2];
            const host = createServerHost(filesWithoutConfig);

            const filesWithConfig = [libFile, commonFile1, commonFile2, configFile];
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkNumberOfInferredProjects(projectService, 2);
            checkWatchedDirectories(host, ["/a/b", "/a"]);

            // Add a tsconfig file
            host.reloadFS(filesWithConfig);
            host.triggerDirectoryWatcherCallback("/a/b", configFile.path);

            checkNumberOfInferredProjects(projectService, 1);
            checkNumberOfConfiguredProjects(projectService, 1);
            // watching all files except one that was open
            checkWatchedFiles(host, [libFile.path, configFile.path]);

            // remove the tsconfig file
            host.reloadFS(filesWithoutConfig);
            host.triggerFileWatcherCallback(configFile.path);

            checkNumberOfInferredProjects(projectService, 2);
            checkNumberOfConfiguredProjects(projectService, 0);
            checkWatchedDirectories(host, ["/a/b", "/a"]);
        });

        it("add new files to a configured project without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            checkWatchedDirectories(host, ["/a/b"]);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = projectService.configuredProjects[0];
            checkProjectRootFiles(project, [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.triggerDirectoryWatcherCallback("/a/b", commonFile2.path);
            host.runQueuedTimeoutCallbacks();
            // project service waits for 250ms to update the project structure, therefore the assertion needs to wait longer.
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkProjectRootFiles(project, [commonFile1.path]);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("handle recreated files correctly", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);

            // delete commonFile2
            host.reloadFS([commonFile1, configFile]);
            host.triggerDirectoryWatcherCallback("/a/b", commonFile2.path);
            host.runQueuedTimeoutCallbacks();
            checkProjectRootFiles(project, [commonFile1.path]);

            // re-add commonFile2
            host.reloadFS([commonFile1, commonFile2, configFile]);
            host.triggerDirectoryWatcherCallback("/a/b", commonFile2.path);
            host.runQueuedTimeoutCallbacks();
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("should create new inferred projects for files excluded from a configured project", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            const project = projectService.configuredProjects[0];
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;
            host.reloadFS(files);
            host.triggerFileWatcherCallback(configFile.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(project, [commonFile1.path]);

            projectService.openClientFile(commonFile2.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: FileOrFolder = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createServerHost([commonFile1, commonFile2, excludedFile1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            projectService.openClientFile(excludedFile1.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: FileOrFolder = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: FileOrFolder = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            const files = [file1, nodeModuleFile, classicModuleFile, configFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.openClientFile(nodeModuleFile.path);
            projectService.openClientFile(classicModuleFile.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkProjectActualFiles(project, [file1.path, nodeModuleFile.path]);
            checkNumberOfInferredProjects(projectService, 1);

            configFile.content = `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`;
            host.reloadFS(files);
            host.triggerFileWatcherCallback(configFile.path);
            checkProjectActualFiles(project, [file1.path, classicModuleFile.path]);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: FileOrFolder = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: FileOrFolder = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: FileOrFolder = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: FileOrFolder = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });
        it("should tolerate config file errors and still try to build a project", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(projectService.configuredProjects[0], [commonFile1.path, commonFile2.path]);
        });

        it("should use only one inferred project if 'useOneInferredProject' is set", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const file2 = {
                path: "/a/c/main.ts",
                content: "let x =1;"
            };

            const file3 = {
                path: "/a/d/main.ts",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, file3, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);
            projectService.openClientFile(file3.path);

            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path, libFile.path]);


            host.reloadFS([file1, configFile, file2, file3, libFile]);
            host.triggerDirectoryWatcherCallback(getDirectoryPath(configFile.path), configFile.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path, file3.path, libFile.path]);
        });

        it("should close configured project after closing last open file", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, configFile, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);

            projectService.closeClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 0);
        });

        it("should not close external project with no open files", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y =1;"
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path, file2.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // close client file - external project should still exists
            projectService.closeClientFile(file1.path);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfExternalProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("external project that included config files", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f1.ts"]
                    }
                )
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "let y =1;"
            };
            const config2 = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f2.ts"]
                    }
                )
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "let z =1;"
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, file2, file3, config1, config2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([config1.path, config2.path, file3.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 2 });

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });

            projectService.openClientFile(file3.path, file3.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2, inferredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            // open file 'file1' from configured project keeps project alive
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });

            projectService.closeClientFile(file3.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, {});
        });

        it("external project with included config file opened after configured project", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            // configured project is alive since it is opened as part of external project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfProjects(projectService, { configuredProjects: 0 });
        });
        it("external project with included config file opened after configured project and then closed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            // configured project is alive since file is still open
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, {});
        });

        it("changes in closed files are reflected in project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export let x = 1`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);

            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfInferredProjects(projectService, 2);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            const modifiedFile2 = {
                path: file2.path,
                content: `export * from "../c/f3"` // now inferred project should inclule file3
            };

            host.reloadFS([file1, modifiedFile2, file3]);
            host.triggerFileWatcherCallback(modifiedFile2.path, /*removed*/ false);

            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, modifiedFile2.path, file3.path]);
        });

        it("deleted files affect project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            host.reloadFS([file1, file3]);
            host.triggerFileWatcherCallback(file2.path, /*removed*/ true);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);
        });

        it("open file become a part of configured project if it is referenced from root file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: "export let y = 1"
            };
            const configFile = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
            };

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            host.reloadFS([file1, file2, file3, configFile]);
            host.triggerDirectoryWatcherCallback(getDirectoryPath(configFile.path), configFile.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path, file3.path]);
        });

        it("correctly migrate files between projects", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `
                export * from "../c/f2";
                export * from "../d/f3";`
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "export let x = 1;"
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "export let y = 1;"
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectRootFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
        });

        it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path]);

            host.reloadFS([file1, file2, configFile]);

            host.triggerDirectoryWatcherCallback(getDirectoryPath(file2.path), file2.path);
            host.checkTimeoutQueueLength(1);
            host.runQueuedTimeoutCallbacks(); // to execute throttled requests

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(projectService.configuredProjects[0], [file1.path, file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.triggerFileWatcherCallback(configFile.path, /*removed*/ false);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(projectService.configuredProjects[0], [file1.path, file2.path]);
        });

        it("can update configured project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.triggerFileWatcherCallback(configFile.path, /*removed*/ false);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(projectService.configuredProjects[0], [file1.path, file2.path]);
        });

        it("can correctly update external project when set of root files has changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path]);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
        });

        it("can update external project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "m"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "export let y = 1"
            };
            const file3 = {
                path: "/a/m.ts",
                content: "export let y = 1"
            };

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.NodeJs }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path]);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.Classic }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path, file3.path]);
        });

        it("config file is deleted", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 2;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createServerHost([file1, file2, config]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path]);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path]);

            host.reloadFS([file1, file2]);
            host.triggerFileWatcherCallback(config.path, /*removed*/ true);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
        });

        it("project structure update is deferred if files are not added\removed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `import {x} from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "export let x = 1"
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/[{ fileName: file1.path, changes: [{ span: createTextSpan(0, file1.path.length), newText: "let y = 1" }] }],
                /*closedFiles*/ undefined);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const changedFiles = projectService.getChangedFiles_TestOnly();
            assert(changedFiles && changedFiles.length === 1, `expected 1 changed file, got ${JSON.stringify(changedFiles && changedFiles.length || 0)}`);

            projectService.ensureInferredProjectsUpToDate_TestOnly();
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
        });

        it("files with mixed content are handled correctly", () => {
            const file1 = {
                path: "/a/b/f1.html",
                content: `<html><script language="javascript">var x = 1;</></html>`
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host);
            const projectFileName = "projectFileName";
            projectService.openExternalProject({ projectFileName, options: {}, rootFiles: [{ fileName: file1.path, scriptKind: ScriptKind.JS, hasMixedContent: true }] });

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkWatchedFiles(host, []);

            const project = projectService.externalProjects[0];

            const scriptInfo = project.getScriptInfo(file1.path);
            const snap = scriptInfo.snap();
            const actualText = snap.getText(0, snap.getLength());
            assert.equal(actualText, "", `expected content to be empty string, got "${actualText}"`);

            projectService.openClientFile(file1.path, `var x = 1;`);
            project.updateGraph();

            const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file1.path, 4);
            assert.equal(quickInfo.kind, ScriptElementKind.variableElement);

            projectService.closeClientFile(file1.path);

            const scriptInfo2 = project.getScriptInfo(file1.path);
            const snap2 = scriptInfo2.snap();
            const actualText2 = snap2.getText(0, snap.getLength());
            assert.equal(actualText2, "", `expected content to be empty string, got "${actualText2}"`);
        });

        it("project settings for inferred projects", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: `import {x} from "mod"`
            };
            const modFile = {
                path: "/a/mod.ts",
                content: "export let x: number"
            };
            const host = createServerHost([file1, modFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(modFile.path);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });

            projectService.setCompilerOptionsForInferredProjects({ moduleResolution: ModuleResolutionKind.Classic });
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
        });

        it("syntax tree cache handles changes in project settings", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "{x: 1}"
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: false });
            projectService.openClientFile(file1.path);
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: true });
            projectService.getScriptInfo(file1.path).editContent(0, 0, " ");
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.closeClientFile(file1.path);
        });

        it("File in multiple projects at opened and closed correctly", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/c/f.ts",
                content: `/// <reference path="../b/app.ts"/>`
            };
            const tsconfig1 = {
                path: "/a/c/tsconfig.json",
                content: "{}"
            };
            const tsconfig2 = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, file2, tsconfig1, tsconfig2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project1 = projectService.configuredProjects[0];
            assert.equal(project1.openRefCount, 1, "Open ref count in project1 - 1");
            assert.equal(project1.getScriptInfo(file2.path).containingProjects.length, 1, "containing projects count");

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.equal(project1.openRefCount, 2, "Open ref count in project1 - 2");

            const project2 = projectService.configuredProjects[1];
            assert.equal(project2.openRefCount, 1, "Open ref count in project2 - 2");

            assert.equal(project1.getScriptInfo(file1.path).containingProjects.length, 2, `${file1.path} containing projects count`);
            assert.equal(project1.getScriptInfo(file2.path).containingProjects.length, 1, `${file2.path} containing projects count`);

            projectService.closeClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.equal(project1.openRefCount, 1, "Open ref count in project1 - 3");
            assert.equal(project2.openRefCount, 1, "Open ref count in project2 - 3");

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 0 });
        });
    });

    describe("Proper errors", () => {
        it("document is not contained in project", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const corruptedConfig = {
                path: "/a/b/tsconfig.json",
                content: "{"
            };
            const host = createServerHost([file1, corruptedConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const project = projectService.findProject(corruptedConfig.path);
            checkProjectRootFiles(project, [file1.path]);
        });
    });

    describe("autoDiscovery", () => {
        it("does not depend on extension", () => {
            const file1 = {
                path: "/a/b/app.html",
                content: ""
            };
            const file2 = {
                path: "/a/b/app.d.ts",
                content: ""
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName: "/a/b/proj.csproj",
                rootFiles: [toExternalFile(file2.path), { fileName: file1.path, hasMixedContent: true, scriptKind: ScriptKind.JS }],
                options: {}
            });
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const typingOptions = projectService.externalProjects[0].getTypingOptions();
            assert.isTrue(typingOptions.enableAutoDiscovery, "Typing autodiscovery should be enabled");
        });
    });

    describe("extra resolution pass in lshost", () => {
        it("can load typings that are proper modules", () => {
            const file1 = {
                path: "/a/b/app.js",
                content: `var x = require("lib")`
            };
            const lib = {
                path: "/a/cache/node_modules/@types/lib/index.d.ts",
                content: "export let x = 1"
            };
            const host: TestServerHost & ModuleResolutionHost = createServerHost([file1, lib]);
            const resolutionTrace: string[] = [];
            host.trace = resolutionTrace.push.bind(resolutionTrace);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller("/a/cache", /*throttleLimit*/5, host) });

            projectService.setCompilerOptionsForInferredProjects({ traceResolution: true, allowJs: true });
            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];

            assert.deepEqual(resolutionTrace, [
                "======== Resolving module 'lib' from '/a/b/app.js'. ========",
                "Module resolution kind is not specified, using 'NodeJs'.",
                "Loading module 'lib' from 'node_modules' folder.",
                "File '/a/b/node_modules/lib.ts' does not exist.",
                "File '/a/b/node_modules/lib.tsx' does not exist.",
                "File '/a/b/node_modules/lib.d.ts' does not exist.",
                "File '/a/b/node_modules/lib.js' does not exist.",
                "File '/a/b/node_modules/lib.jsx' does not exist.",
                "File '/a/b/node_modules/lib/package.json' does not exist.",
                "File '/a/b/node_modules/lib/index.ts' does not exist.",
                "File '/a/b/node_modules/lib/index.tsx' does not exist.",
                "File '/a/b/node_modules/lib/index.d.ts' does not exist.",
                "File '/a/b/node_modules/lib/index.js' does not exist.",
                "File '/a/b/node_modules/lib/index.jsx' does not exist.",
                "File '/a/b/node_modules/@types/lib.ts' does not exist.",
                "File '/a/b/node_modules/@types/lib.tsx' does not exist.",
                "File '/a/b/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/b/node_modules/@types/lib.js' does not exist.",
                "File '/a/b/node_modules/@types/lib.jsx' does not exist.",
                "File '/a/b/node_modules/@types/lib/package.json' does not exist.",
                "File '/a/b/node_modules/@types/lib/index.ts' does not exist.",
                "File '/a/b/node_modules/@types/lib/index.tsx' does not exist.",
                "File '/a/b/node_modules/@types/lib/index.d.ts' does not exist.",
                "File '/a/b/node_modules/@types/lib/index.js' does not exist.",
                "File '/a/b/node_modules/@types/lib/index.jsx' does not exist.",
                "File '/a/node_modules/lib.ts' does not exist.",
                "File '/a/node_modules/lib.tsx' does not exist.",
                "File '/a/node_modules/lib.d.ts' does not exist.",
                "File '/a/node_modules/lib.js' does not exist.",
                "File '/a/node_modules/lib.jsx' does not exist.",
                "File '/a/node_modules/lib/package.json' does not exist.",
                "File '/a/node_modules/lib/index.ts' does not exist.",
                "File '/a/node_modules/lib/index.tsx' does not exist.",
                "File '/a/node_modules/lib/index.d.ts' does not exist.",
                "File '/a/node_modules/lib/index.js' does not exist.",
                "File '/a/node_modules/lib/index.jsx' does not exist.",
                "File '/a/node_modules/@types/lib.ts' does not exist.",
                "File '/a/node_modules/@types/lib.tsx' does not exist.",
                "File '/a/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/node_modules/@types/lib.js' does not exist.",
                "File '/a/node_modules/@types/lib.jsx' does not exist.",
                "File '/a/node_modules/@types/lib/package.json' does not exist.",
                "File '/a/node_modules/@types/lib/index.ts' does not exist.",
                "File '/a/node_modules/@types/lib/index.tsx' does not exist.",
                "File '/a/node_modules/@types/lib/index.d.ts' does not exist.",
                "File '/a/node_modules/@types/lib/index.js' does not exist.",
                "File '/a/node_modules/@types/lib/index.jsx' does not exist.",
                "File '/node_modules/lib.ts' does not exist.",
                "File '/node_modules/lib.tsx' does not exist.",
                "File '/node_modules/lib.d.ts' does not exist.",
                "File '/node_modules/lib.js' does not exist.",
                "File '/node_modules/lib.jsx' does not exist.",
                "File '/node_modules/lib/package.json' does not exist.",
                "File '/node_modules/lib/index.ts' does not exist.",
                "File '/node_modules/lib/index.tsx' does not exist.",
                "File '/node_modules/lib/index.d.ts' does not exist.",
                "File '/node_modules/lib/index.js' does not exist.",
                "File '/node_modules/lib/index.jsx' does not exist.",
                "File '/node_modules/@types/lib.ts' does not exist.",
                "File '/node_modules/@types/lib.tsx' does not exist.",
                "File '/node_modules/@types/lib.d.ts' does not exist.",
                "File '/node_modules/@types/lib.js' does not exist.",
                "File '/node_modules/@types/lib.jsx' does not exist.",
                "File '/node_modules/@types/lib/package.json' does not exist.",
                "File '/node_modules/@types/lib/index.ts' does not exist.",
                "File '/node_modules/@types/lib/index.tsx' does not exist.",
                "File '/node_modules/@types/lib/index.d.ts' does not exist.",
                "File '/node_modules/@types/lib/index.js' does not exist.",
                "File '/node_modules/@types/lib/index.jsx' does not exist.",
                "======== Module name 'lib' was not resolved. ========",
                `Auto discovery for typings is enabled in project '${proj.getProjectName()}'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.`,
                "File '/a/cache/node_modules/lib.ts' does not exist.",
                "File '/a/cache/node_modules/lib.tsx' does not exist.",
                "File '/a/cache/node_modules/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/lib.js' does not exist.",
                "File '/a/cache/node_modules/lib.jsx' does not exist.",
                "File '/a/cache/node_modules/lib/package.json' does not exist.",
                "File '/a/cache/node_modules/lib/index.ts' does not exist.",
                "File '/a/cache/node_modules/lib/index.tsx' does not exist.",
                "File '/a/cache/node_modules/lib/index.d.ts' does not exist.",
                "File '/a/cache/node_modules/lib/index.js' does not exist.",
                "File '/a/cache/node_modules/lib/index.jsx' does not exist.",
                "File '/a/cache/node_modules/@types/lib.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib.tsx' does not exist.",
                "File '/a/cache/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib.js' does not exist.",
                "File '/a/cache/node_modules/@types/lib.jsx' does not exist.",
                "File '/a/cache/node_modules/@types/lib/package.json' does not exist.",
                "File '/a/cache/node_modules/@types/lib/index.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib/index.tsx' does not exist.",
                "File '/a/cache/node_modules/@types/lib/index.d.ts' exist - use it as a name resolution result.",
            ]);
            checkProjectActualFiles(proj, [file1.path, lib.path]);
        });
    });

    describe("navigate-to for javascript project", () => {
        function containsNavToItem(items: protocol.NavtoItem[], itemName: string, itemKind: string) {
            return find(items, item => item.name === itemName && item.kind === itemKind) !== undefined;
        }

        it("should not include type symbols", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.js",
                content: "function foo() {}"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, configFile, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);

            // Try to find some interface type defined in lib.d.ts
            const libTypeNavToRequest = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
            const items: protocol.NavtoItem[] = session.executeCommand(libTypeNavToRequest).response;
            assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

            const localFunctionNavToRequst = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
            const items2: protocol.NavtoItem[] = session.executeCommand(localFunctionNavToRequst).response;
            assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
        });
    });

    describe("external projects", () => {
        it("correctly handling add/remove tsconfig - 1", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: ""
            };
            const host = createServerHost([f1, f2]);
            const projectService = createProjectService(host);

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);

            // rename lib.ts to tsconfig.json
            host.reloadFS([f1, tsconfig]);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, tsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path]);

            // rename tsconfig.json back to lib.ts
            host.reloadFS([f1, f2]);
            host.triggerFileWatcherCallback(tsconfig.path, /*removed*/ true);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);
        });


        it("correctly handling add/remove tsconfig - 2", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const cLib = {
                path: "/a/b/c/lib.ts",
                content: ""
            };
            const cTsconfig = {
                path: "/a/b/c/tsconfig.json",
                content: "{}"
            };
            const dLib = {
                path: "/a/b/d/lib.ts",
                content: ""
            };
            const dTsconfig = {
                path: "/a/b/d/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, cLib, cTsconfig, dLib, dTsconfig]);
            const projectService = createProjectService(host);

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 2 });
            checkProjectActualFiles(projectService.configuredProjects[0], [cLib.path]);
            checkProjectActualFiles(projectService.configuredProjects[1], [dLib.path]);

            // remove one config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, dTsconfig.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [dLib.path]);

            // remove second config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

            // open two config files
            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 2 });
            checkProjectActualFiles(projectService.configuredProjects[0], [cLib.path]);
            checkProjectActualFiles(projectService.configuredProjects[1], [dLib.path]);

            // close all projects - no projects should be opened
            projectService.closeExternalProject(projectName);
            projectService.checkNumberOfProjects({});
        });

        it("correctly handles changes in lib section of config file", () => {
            const libES5 = {
                path: "/compiler/lib.es5.d.ts",
                content: "declare const eval: any"
            };
            const libES2015Promise = {
                path: "/compiler/lib.es2015.promise.d.ts",
                content: "declare class Promise<T> {}"
            };
            const app = {
                path: "/src/app.ts",
                content: "var x: Promise<string>;"
            };
            const config1 = {
                path: "/src/tsconfig.json",
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5"
                            ]
                        }
                    })
            };
            const config2 = {
                path: config1.path,
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5",
                                "es2015.promise"
                            ]
                        }
                    })
            };
            const host = createServerHost([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            const projectService = createProjectService(host);
            projectService.openClientFile(app.path);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [libES5.path, app.path]);

            host.reloadFS([libES5, libES2015Promise, app, config2]);
            host.triggerFileWatcherCallback(config1.path);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [libES5.path, libES2015Promise.path, app.path]);
        });
    });

    describe("prefer typings to js", () => {
        it("during second resolution pass", () => {
            const typingsCacheLocation = "/a/typings";
            const f1 = {
                path: "/a/b/app.js",
                content: "var x = require('bar')"
            };
            const barjs = {
                path: "/a/b/node_modules/bar/index.js",
                content: "export let x = 1"
            };
            const barTypings = {
                path: `${typingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
                content: "export let y: number"
            };
            const config = {
                path: "/a/b/jsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] })
            };
            const host = createServerHost([f1, barjs, barTypings, config]);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller(typingsCacheLocation, /*throttleLimit*/ 5, host) });

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path, barTypings.path]);
        });
    });

    describe("format settings", () => {
        it("can be set globally", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x;"
            };
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);

            const defaultSettings = projectService.getFormatCodeOptions();

            // set global settings
            const newGlobalSettings1 = clone(defaultSettings);
            newGlobalSettings1.placeOpenBraceOnNewLineForControlBlocks = !newGlobalSettings1.placeOpenBraceOnNewLineForControlBlocks;
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings1 });

            // get format options for file - should be equal to new global settings
            const s1 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s1, newGlobalSettings1, "file settings should be the same with global settings");

            // set per file format options
            const newPerFileSettings = clone(defaultSettings);
            newPerFileSettings.insertSpaceAfterCommaDelimiter = !newPerFileSettings.insertSpaceAfterCommaDelimiter;
            projectService.setHostConfiguration({ formatOptions: newPerFileSettings, file: f1.path });

            // get format options for file - should be equal to new per-file settings
            const s2 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s2, newPerFileSettings, "file settings should be the same with per-file settings");

            // set new global settings - they should not affect ones that were set per-file
            const newGlobalSettings2 = clone(defaultSettings);
            newGlobalSettings2.insertSpaceAfterSemicolonInForStatements = !newGlobalSettings2.insertSpaceAfterSemicolonInForStatements;
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings2 });

            // get format options for file - should be equal to new per-file settings
            const s3 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s3, newPerFileSettings, "file settings should still be the same with per-file settings");
        });
    });

    describe("watching @types", () => {
        it("works correctly when typings are added or removed", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const t1 = {
                path: "/a/b/node_modules/@types/lib1/index.d.ts",
                content: "export let a: number"
            };
            const t2 = {
                path: "/a/b/node_modules/@types/lib2/index.d.ts",
                content: "export let b: number"
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    exclude: ["node_modules"]
                })
            };
            const host = createServerHost([f1, t1, tsconfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path, t1.path]);

            // delete t1
            host.reloadFS([f1, tsconfig]);
            host.triggerDirectoryWatcherCallback("/a/b/node_modules/@types", "lib1");
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path]);

            // create t2
            host.reloadFS([f1, tsconfig, t2]);
            host.triggerDirectoryWatcherCallback("/a/b/node_modules/@types", "lib2");
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path, t2.path]);
        });
    });

    describe("Open-file", () => {
        it("can be reloaded with empty content", () => {
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const projectFileName = "externalProject";
            const host = createServerHost([f]);
            const projectService = createProjectService(host);
            // create a project
            projectService.openExternalProject({ projectFileName, rootFiles: [toExternalFile(f.path)], options: {} });
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            const p = projectService.externalProjects[0];
            // force to load the content of the file
            p.updateGraph();

            const scriptInfo = p.getScriptInfo(f.path);
            checkSnapLength(scriptInfo.snap(), f.content.length);

            // open project and replace its content with empty string
            projectService.openClientFile(f.path, "");
            checkSnapLength(scriptInfo.snap(), 0);
        });
        function checkSnapLength(snap: server.LineIndexSnapshot, expectedLength: number) {
            assert.equal(snap.getLength(), expectedLength, "Incorrect snapshot size");
        }
    });

    describe("Language service", () => {
        it("should work correctly on case-sensitive file systems", () => {
            const lib = {
                path: "/a/Lib/lib.d.ts",
                content: "let x: number"
            };
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([lib, f], { executingFilePath: "/a/Lib/tsc.js", useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            projectService.inferredProjects[0].getLanguageService().getProgram();
        });
    });

    describe("rename a module file and rename back", () => {
        it("should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([moduleFile, file1]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 0);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1]);
            host.triggerFileWatcherCallback(moduleFileOldPath);
            host.triggerDirectoryWatcherCallback("/a/b", moduleFile.path);
            host.runQueuedTimeoutCallbacks();
            diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 1);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1]);
            host.triggerFileWatcherCallback(moduleFileNewPath);
            host.triggerDirectoryWatcherCallback("/a/b", moduleFile.path);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);
            host.runQueuedTimeoutCallbacks();

            diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 0);
        });

        it("should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([moduleFile, file1, configFile]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 0);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, configFile]);
            host.triggerFileWatcherCallback(moduleFileOldPath);
            host.triggerDirectoryWatcherCallback("/a/b", moduleFile.path);
            host.runQueuedTimeoutCallbacks();
            diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 1);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, configFile]);
            host.triggerFileWatcherCallback(moduleFileNewPath);
            host.triggerDirectoryWatcherCallback("/a/b", moduleFile.path);
            host.runQueuedTimeoutCallbacks();
            diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 0);
        });

    });

    describe("add the missing module file for inferred project", () => {
        it("should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([file1]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 1);

            host.reloadFS([file1, moduleFile]);
            host.triggerDirectoryWatcherCallback(getDirectoryPath(file1.path), moduleFile.path);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);

            // Recheck
            diags = <server.protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.equal(diags.length, 0);
        });
    });

    describe("Configure file diagnostics events", () => {

        it("are generated when the config file has errors", () => {
            const serverEventManager = new TestServerEventManager();
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
            };

            const host = createServerHost([file, configFile]);
            const session = createSession(host, /*typingsInstaller*/ undefined, serverEventManager.handler);
            openFilesForSession([file], session);
            serverEventManager.checkEventCountOfType("configFileDiag", 1);

            for (const event of serverEventManager.events) {
                if (event.eventName === "configFileDiag") {
                    assert.equal(event.data.configFileName, configFile.path);
                    assert.equal(event.data.triggerFile, file.path);
                    return;
                }
            }
        });

        it("are generated when the config file doesn't have errors", () => {
            const serverEventManager = new TestServerEventManager();
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {}
                }`
            };

            const host = createServerHost([file, configFile]);
            const session = createSession(host, /*typingsInstaller*/ undefined, serverEventManager.handler);
            openFilesForSession([file], session);
            serverEventManager.checkEventCountOfType("configFileDiag", 1);
        });
    });

    describe("skipLibCheck", () => {
        it("should be turned on for js-only inferred projects", () => {
            const file1 = {
                path: "/a/b/file1.js",
                content: `
                /// <reference path="file2.d.ts" />
                var x = 1;`
            };
            const file2 = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([file1, file2]);
            const session = createSession(host);
            openFilesForSession([file1, file2], session);

            const file2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: file2.path }
            );
            let errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);

            const closeFileRequest = makeSessionRequest<protocol.FileRequestArgs>(CommandNames.Close, { file: file1.path });
            session.executeCommand(closeFileRequest);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length !== 0);

            openFilesForSession([file1], session);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should be turned on for js-only external projects", () => {
            const jsFile = {
                path: "/a/b/file1.js",
                content: "let x =1;"
            };
            const dTsFile = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([jsFile, dTsFile]);
            const session = createSession(host);

            const openExternalProjectRequest = makeSessionRequest<protocol.OpenExternalProjectArgs>(
                CommandNames.OpenExternalProject,
                {
                    projectFileName: "project1",
                    rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
                    options: {}
                }
            );
            session.executeCommand(openExternalProjectRequest);

            const dTsFileGetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(dTsFileGetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });
    });

    describe("non-existing directories listed in config file input array", () => {
        it("should be tolerated without crashing the server", () => {
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }`
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "let t = 10;"
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 1);

            const configuredProject = projectService.configuredProjects[0];
            assert.isTrue(configuredProject.getFileNames().length == 0);

            const inferredProject = projectService.inferredProjects[0];
            assert.isTrue(inferredProject.containsFile(<server.NormalizedPath>file1.path));
        });
    });

    describe("reload", () => {
        it("should work with temp file", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const tmp = {
                path: "/a/b/app.tmp",
                content: "const y = 42"
            };
            const host = createServerHost([f1, tmp]);
            const session = createSession(host);

            // send open request
            session.executeCommand(<server.protocol.OpenRequest>{
                type: "request",
                command: "open",
                seq: 1,
                arguments: { file: f1.path }
            });

            // reload from tmp file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path, tmpfile: tmp.path }
            });

            // verify content
            const projectServiice = session.getProjectService();
            const snap1 = projectServiice.getScriptInfo(f1.path).snap();
            assert.equal(snap1.getText(0, snap1.getLength()), tmp.content, "content should be equal to the content of temp file");

            // reload from original file file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path }
            });

            // verify content
            const snap2 = projectServiice.getScriptInfo(f1.path).snap();
            assert.equal(snap2.getText(0, snap2.getLength()), f1.content, "content should be equal to the content of original file");

        });
    });
}
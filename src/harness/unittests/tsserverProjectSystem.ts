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

    const customSafeList = {
        path: <Path>"/typeMapList.json",
        content: JSON.stringify({
            "quack": {
                "match": "/duckquack-(\\d+)\\.min\\.js",
                "types": ["duck-types"]
            },
        })
    };

    export interface PostExecAction {
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

    export const { content: libFileContent } = Harness.getDefaultLibraryFile(Harness.IO);
    export const libFile: FileOrFolder = {
        path: "/a/lib/lib.d.ts",
        content: libFileContent
    };

    export class TestTypingsInstaller extends TI.TypingsInstaller implements server.ITypingsInstaller {
        protected projectService: server.ProjectService;
        constructor(
            readonly globalTypingsCacheLocation: string,
            throttleLimit: number,
            installTypingHost: server.ServerHost,
            readonly typesRegistry = createMap<void>(),
            log?: TI.Log) {
            super(installTypingHost, globalTypingsCacheLocation, safeList.path, throttleLimit, log);
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

        checkPendingCommands(expectedCount: number) {
            assert.equal(this.postExecActions.length, expectedCount, `Expected ${expectedCount} post install actions`);
        }

        onProjectClosed() {
        }

        attach(projectService: server.ProjectService) {
            this.projectService = projectService;
        }

        getInstallTypingHost() {
            return this.installTypingHost;
        }

        installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
            this.addPostExecAction("success", cb);
        }

        sendResponse(response: server.SetTypings | server.InvalidateCachedTypings) {
            this.projectService.updateTypingsForProject(response);
        }

        enqueueInstallTypingsRequest(project: server.Project, typeAcquisition: TypeAcquisition, unresolvedImports: server.SortedReadonlyArray<string>) {
            const request = server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports, this.globalTypingsCacheLocation);
            this.install(request);
        }

        addPostExecAction(stdout: string | string[], cb: TI.RequestCompletedAction) {
            const out = typeof stdout === "string" ? stdout : createNpmPackageJsonString(stdout);
            const action: PostExecAction = {
                success: !!out,
                callback: cb
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
        currentDirectory?: string;
        newLine?: string;
    }

    export function createServerHost(fileOrFolderList: FileOrFolder[], params?: TestServerHostCreationParameters): TestServerHost {
        if (!params) {
            params = {};
        }
        const host = new TestServerHost(
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(),
            params.currentDirectory || "/",
            fileOrFolderList,
            params.newLine);
        return host;
    }

    class TestSession extends server.Session {
        private seq = 0;

        getProjectService() {
            return this.projectService;
        }

        public getSeq() {
            return this.seq;
        }

        public getNextSeq() {
            return this.seq + 1;
        }

        public executeCommandSeq<T extends server.protocol.Request>(request: Partial<T>) {
            this.seq++;
            request.seq = this.seq;
            request.type = "request";
            return this.executeCommand(<T>request);
        }
    }

    export function createSession(host: server.ServerHost, typingsInstaller?: server.ITypingsInstaller, projectServiceEventHandler?: server.ProjectServiceEventHandler, cancellationToken?: server.ServerCancellationToken, throttleWaitMilliseconds?: number) {
        if (typingsInstaller === undefined) {
            typingsInstaller = new TestTypingsInstaller("/a/data/", /*throttleLimit*/5, host);
        }
        const opts: server.SessionOptions = {
            host,
            cancellationToken: cancellationToken || server.nullCancellationToken,
            useSingleInferredProject: false,
            typingsInstaller,
            byteLength: Utils.byteLength,
            hrtime: process.hrtime,
            logger: nullLogger,
            canUseEvents: projectServiceEventHandler !== undefined,
            eventHandler: projectServiceEventHandler,
            throttleWaitMilliseconds
        };
        return new TestSession(opts);
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
            super({
                host, logger, cancellationToken, useSingleInferredProject, typingsInstaller, eventHandler
            });
        }

        checkNumberOfProjects(count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
            checkNumberOfProjects(this, count);
        }
    }
    export function createProjectService(host: server.ServerHost, parameters: CreateProjectServiceParameters = {}) {
        const cancellationToken = parameters.cancellationToken || server.nullCancellationToken;
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
        assert.equal(map.size, expectedKeys.length, `${caption}: incorrect size of map`);
        for (const name of expectedKeys) {
            assert.isTrue(map.has(name), `${caption} is expected to contain ${name}, actual keys: ${arrayFrom(map.keys())}`);
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
        private map: TimeOutCallback[] = [];
        private nextId = 1;

        register(cb: (...args: any[]) => void, args: any[]) {
            const timeoutId = this.nextId;
            this.nextId++;
            this.map[timeoutId] = cb.bind(/*this*/ undefined, ...args);
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
                n++;
            }
            return n;
        }

        invoke() {
            // Note: invoking a callback may result in new callbacks been queued,
            // so do not clear the entire callback list regardless. Only remove the
            // ones we have invoked.
            for (const key in this.map) {
                this.map[key]();
                delete this.map[key];
            }
        }
    }

    export type TimeOutCallback = () => any;

    export class TestServerHost implements server.ServerHost {
        args: string[] = [];

        private readonly output: string[] = [];

        private fs: ts.FileMap<FSEntry>;
        private getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;
        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();

        readonly watchedDirectories = createMultiMap<{ cb: DirectoryWatcherCallback, recursive: boolean }>();
        readonly watchedFiles = createMultiMap<FileWatcherCallback>();

        private filesOrFolders: FileOrFolder[];

        constructor(public useCaseSensitiveFileNames: boolean, private executingFilePath: string, private currentDirectory: string, fileOrFolderList: FileOrFolder[], public readonly newLine = "\n") {
            this.getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);

            this.reloadFS(fileOrFolderList);
        }

        reloadFS(filesOrFolders: FileOrFolder[]) {
            this.filesOrFolders = filesOrFolders;
            this.fs = createFileMap<FSEntry>();
            // always inject safelist file in the list of files
            for (const fileOrFolder of filesOrFolders.concat(safeList)) {
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
        }

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
            this.watchedDirectories.add(path, cbWithRecursive);
            return {
                referenceCount: 0,
                directoryName,
                close: () => this.watchedDirectories.remove(path, cbWithRecursive)
            };
        }

        createHash(s: string): string {
            return s;
        }

        triggerDirectoryWatcherCallback(directoryName: string, fileName: string): void {
            const path = this.toPath(directoryName);
            const callbacks = this.watchedDirectories.get(path);
            if (callbacks) {
                for (const callback of callbacks) {
                    callback.cb(fileName);
                }
            }
        }

        triggerFileWatcherCallback(fileName: string, removed?: boolean): void {
            const path = this.toPath(fileName);
            const callbacks = this.watchedFiles.get(path);
            if (callbacks) {
                for (const callback of callbacks) {
                    callback(path, removed);
                }
            }
        }

        watchFile(fileName: string, callback: FileWatcherCallback) {
            const path = this.toPath(fileName);
            this.watchedFiles.add(path, callback);
            return { close: () => this.watchedFiles.remove(path, callback) };
        }

        // TOOD: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.timeoutCallbacks.register(callback, args);
        }

        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId);
        }

        checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timeoutCallbacks.count();
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }

        runQueuedTimeoutCallbacks() {
            this.timeoutCallbacks.invoke();
        }

        runQueuedImmediateCallbacks() {
            this.immediateCallbacks.invoke();
        }

        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

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

        write(message: string) {
            this.output.push(message);
        }

        getOutput(): ReadonlyArray<string> {
            return this.output;
        }

        clearOutput() {
            this.output.length = 0;
        }

        readonly readFile = (s: string) => (<File>this.fs.get(this.toPath(s))).content;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        readonly exit = notImplemented;
        readonly getEnvironmentVariable = notImplemented;
    }

    /**
     * Test server cancellation token used to mock host token cancellation requests.
     * The cancelAfterRequest constructor param specifies how many isCancellationRequested() calls
     * should be made before canceling the token. The id of the request to cancel should be set with
     * setRequestToCancel();
     */
    export class TestServerCancellationToken implements server.ServerCancellationToken {
        private currentId = -1;
        private requestToCancel = -1;
        private isCancellationRequestedCount = 0;

        constructor(private cancelAfterRequest = 0) {
        }

        setRequest(requestId: number) {
            this.currentId = requestId;
        }

        setRequestToCancel(requestId: number) {
            this.resetToken();
            this.requestToCancel = requestId;
        }

        resetRequest(requestId: number) {
            assert.equal(requestId, this.currentId, "unexpected request id in cancellation");
            this.currentId = undefined;
        }

        isCancellationRequested() {
            this.isCancellationRequestedCount++;
            // If the request id is the request to cancel and isCancellationRequestedCount
            // has been met then cancel the request. Ex: cancel the request if it is a
            // nav bar request & isCancellationRequested() has already been called three times.
            return this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        }

        resetToken() {
            this.currentId = -1;
            this.isCancellationRequestedCount = 0;
            this.requestToCancel = -1;
        }
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

        it("can handle tsconfig file name with difference casing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    include: []
                })
            };

            const host = createServerHost([f1, config], { useCaseSensitiveFileNames: false });
            const service = createProjectService(host);
            service.openExternalProject(<protocol.ExternalProject>{
                projectFileName: "/a/b/project.csproj",
                rootFiles: toExternalFiles([f1.path, combinePaths(getDirectoryPath(config.path).toUpperCase(), getBaseFileName(config.path))]),
                options: {}
            });
            service.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects[0], []);

            service.openClientFile(f1.path);
            service.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });

            checkProjectActualFiles(service.configuredProjects[0], []);
            checkProjectActualFiles(service.inferredProjects[0], [f1.path]);
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

        it("remove not-listed external projects", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/b/app.ts",
                content: "let x = 1"
            };
            const f3 = {
                path: "/c/app.ts",
                content: "let x = 1"
            };
            const makeProject = (f: FileOrFolder) => ({ projectFileName: f.path + ".csproj", rootFiles: [toExternalFile(f.path)], options: {} });
            const p1 = makeProject(f1);
            const p2 = makeProject(f2);
            const p3 = makeProject(f3);

            const host = createServerHost([f1, f2, f3]);
            const session = createSession(host);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 1,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p2] }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p2.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 2,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p3] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p3.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 0 });

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p2] }
            });
            assert.equal(projectService.externalProjects[0].getProjectName(), p2.projectFileName);
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

        it("should disable features when the files are too large", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: "let x =1;",
                fileSize: 10 * 1024 * 1024
            };
            const file2 = {
                path: "/a/b/f2.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };
            const file3 = {
                path: "/a/b/f3.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };

            const proj1name = "proj1", proj2name = "proj2", proj3name = "proj3";

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file1.path]), options: {}, projectFileName: proj1name });
            const proj1 = projectService.findProject(proj1name);
            assert.isTrue(proj1.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file2.path]), options: {}, projectFileName: proj2name });
            const proj2 = projectService.findProject(proj2name);
            assert.isTrue(proj2.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file3.path]), options: {}, projectFileName: proj3name });
            const proj3 = projectService.findProject(proj3name);
            assert.isFalse(proj3.languageServiceEnabled);
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

        it("reload regular file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "x."
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: "let x: number;"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: toExternalFiles([f1.path, f2.path]), options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let x: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2);
            // should contain completions for string
            assert.isTrue(completions1.entries.some(e => e.name === "charAt"), "should contain 'charAt'");
            assert.isFalse(completions1.entries.some(e => e.name === "toExponential"), "should not contain 'toExponential'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2);
            // should contain completions for string
            assert.isFalse(completions2.entries.some(e => e.name === "charAt"), "should not contain 'charAt'");
            assert.isTrue(completions2.entries.some(e => e.name === "toExponential"), "should contain 'toExponential'");
        });

        it("clear mixed content file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: " "
            };
            const f2 = {
                path: "/a/b/lib.html",
                content: "<html/>"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: [{ fileName: f1.path }, { fileName: f2.path, hasMixedContent: true }], options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let somelongname: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0);
            assert.isTrue(completions1.entries.some(e => e.name === "somelongname"), "should contain 'somelongname'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0);
            assert.isFalse(completions2.entries.some(e => e.name === "somelongname"), "should not contain 'somelongname'");
            const sf2 = service.externalProjects[0].getLanguageService().getProgram().getSourceFile(f2.path);
            assert.equal(sf2.text, "");
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

        it("ignores files excluded by a custom safe type list", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const office = {
                path: "/lib/duckquack-3.min.js",
                content: "whoa do @@ not parse me ok thanks!!!"
            };
            const host = createServerHost([customSafeList, file1, office]);
            const projectService = createProjectService(host);
            projectService.loadSafeList(customSafeList.path);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, office.path]) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["duck-types"]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("ignores files excluded by the default type list", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const minFile = {
                path: "/c/moment.min.js",
                content: "unspecified"
            };
            const kendoFile1 = {
                path: "/q/lib/kendo/kendo.all.min.js",
                content: "unspecified"
            };
            const kendoFile2 = {
                path: "/q/lib/kendo/kendo.ui.min.js",
                content: "unspecified"
            };
            const officeFile1 = {
                path: "/scripts/Office/1/excel-15.debug.js",
                content: "unspecified"
            };
            const officeFile2 = {
                path: "/scripts/Office/1/powerpoint.js",
                content: "unspecified"
            };
            const files = [file1, minFile, kendoFile1, kendoFile2, officeFile1, officeFile2];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles(files.map(f => f.path)) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["kendo-ui", "office"]);
            } finally {
                projectService.resetSafeList();
            }
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

        it("loading files with correct priority", () => {
            const f1 = {
                path: "/a/main.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/main.js",
                content: "var y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { allowJs: true }
                })
            };
            const host = createServerHost([f1, f2, config]);
            const projectService = createProjectService(host);
            projectService.setHostConfiguration({
                extraFileExtensions: [
                    { extension: ".js", isMixedContent: false },
                    { extension: ".html", isMixedContent: true }
                ]
            });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path]);

            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f2.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [f2.path]);
        });

        it("tsconfig script block support", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([file1, file2, config]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            // HTML file will not be included in any projects yet
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path]);

            // Specify .html extension as mixed content
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest).response;

            // HTML file still not included in the project as it is closed
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path]);

            // Open HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ [{ fileName: file2.path, hasMixedContent: true, scriptKind: ScriptKind.JS, content: `var hello = "hello";` }],
                /*changedFiles*/ undefined,
                /*closedFiles*/ undefined);

            // Now HTML file is included in the project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path]);

            // Check identifiers defined in HTML content are available in .ts file
            const project = projectService.configuredProjects[0];
            let completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 1);
            assert(completions && completions.entries[0].name === "hello", `expected entry hello to be in completion list`);

            // Close HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/ undefined,
                /*closedFiles*/ [file2.path]);

            // HTML file is still included in project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [file1.path, file2.path]);

            // Check identifiers defined in HTML content are not available in .ts file
            completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 5);
            assert(completions && completions.entries[0].name !== "hello", `unexpected hello entry in completion list`);
        });

        it("no tsconfig script block diagnostic errors", () => {

            //  #1. Ensure no diagnostic errors when allowJs is true
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };

            let host = createServerHost([file1, file2, config1, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            let session = createSession(host);

            // Specify .html extension as mixed content in a configure host request
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            let projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            let diagnostics = projectService.configuredProjects[0].getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #2. Ensure no errors when allowJs is false
            const config2 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: false } })
            };

            host = createServerHost([file1, file2, config2, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = projectService.configuredProjects[0].getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #3. Ensure no errors when compiler options aren't specified
            const config3 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({})
            };

            host = createServerHost([file1, file2, config3, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = projectService.configuredProjects[0].getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly specified in tsconfig
            const config4 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, files: [file1.path, file2.path] })
            };

            host = createServerHost([file1, file2, config4, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = projectService.configuredProjects[0].getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly excluded in tsconfig
            const config5 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: [file2.path] })
            };

            host = createServerHost([file1, file2, config5, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = projectService.configuredProjects[0].getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
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
            const snap = scriptInfo.getSnapshot();
            const actualText = snap.getText(0, snap.getLength());
            assert.equal(actualText, "", `expected content to be empty string, got "${actualText}"`);

            projectService.openClientFile(file1.path, `var x = 1;`);
            project.updateGraph();

            const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file1.path, 4);
            assert.equal(quickInfo.kind, ScriptElementKind.variableElement);

            projectService.closeClientFile(file1.path);

            const scriptInfo2 = project.getScriptInfo(file1.path);
            const snap2 = scriptInfo2.getSnapshot();
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

        it("language service disabled state is updated in external projects", () => {
            const f1 = {
                path: "/a/app.js",
                content: "var x = 1"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const host = createServerHost([f1, f2]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const service = createProjectService(host);
            const projectFileName = "/a/proj.csproj";

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 1");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isTrue(service.externalProjects[0].languageServiceEnabled, "language service should be enabled");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 2");
        });

        it("files are properly detached when language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "var x = 1"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const f3 = {
                path: "/a/lib.js",
                content: "var x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([f1, f2, f3, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            projectService.closeClientFile(f1.path);
            projectService.checkNumberOfProjects({});

            for (const f of [f2, f3]) {
                const scriptInfo = projectService.getScriptInfoForNormalizedPath(server.toNormalizedPath(f.path));
                assert.equal(scriptInfo.containingProjects.length, 0, `expect 0 containing projects for '${f.path}'`);
            }
        });

        it("language service disabled events are triggered", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const configWithExclude = {
                path: config.path,
                content: JSON.stringify({ exclude: ["largefile.js"] })
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            let lastEvent: server.ProjectLanguageServiceStateEvent;
            const session = createSession(host, /*typingsInstaller*/ undefined, e => {
                if (e.eventName === server.ConfigFileDiagEvent || e.eventName === server.ContextEvent) {
                    return;
                }
                assert.equal(e.eventName, server.ProjectLanguageServiceStateEvent);
                assert.equal(e.data.project.getProjectName(), config.path, "project name");
                lastEvent = <server.ProjectLanguageServiceStateEvent>e;
            });
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects[0];
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.isTrue(!!lastEvent, "should receive event");
            assert.equal(lastEvent.data.project, project, "project name");
            assert.equal(lastEvent.data.project.getProjectName(), config.path, "config path");
            assert.isFalse(lastEvent.data.languageServiceEnabled, "Language service state");

            host.reloadFS([f1, f2, configWithExclude]);
            host.triggerFileWatcherCallback(config.path, /*removed*/ false);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isTrue(project.languageServiceEnabled, "Language service enabled");
            assert.equal(lastEvent.data.project, project, "project");
            assert.isTrue(lastEvent.data.languageServiceEnabled, "Language service state");
        });

        it("syntactic features work even if language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x =   1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);
            let lastEvent: server.ProjectLanguageServiceStateEvent;
            const session = createSession(host, /*typingsInstaller*/ undefined, e => {
                if (e.eventName === server.ConfigFileDiagEvent) {
                    return;
                }
                assert.equal(e.eventName, server.ProjectLanguageServiceStateEvent);
                lastEvent = <server.ProjectLanguageServiceStateEvent>e;
            });
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects[0];
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.isTrue(!!lastEvent, "should receive event");
            assert.equal(lastEvent.data.project, project, "project name");
            assert.isFalse(lastEvent.data.languageServiceEnabled, "Language service state");

            const options = projectService.getFormatCodeOptions();
            const edits = project.getLanguageService().getFormattingEditsForDocument(f1.path, options);
            assert.deepEqual(edits, [{ span: createTextSpan(/*start*/ 7, /*length*/ 3), newText: " " }]);
        });

        it("snapshot from different caches are incompatible", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([f1]);
            const projectFileName = "/a/b/proj.csproj";
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName,
                rootFiles: [toExternalFile(f1.path)],
                options: {}
            });
            projectService.openClientFile(f1.path, "let x = 1;\nlet y = 2;");

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const navbar = projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            assert.equal(navbar[0].spans[0].length, f1.content.length);
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
            const typeAcquisition = projectService.externalProjects[0].getTypeAcquisition();
            assert.isTrue(typeAcquisition.enable, "Typine acquisition should be enabled");
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
                "Loading module 'lib' from 'node_modules' folder, target file type 'TypeScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "Loading module 'lib' from 'node_modules' folder, target file type 'JavaScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "======== Module name 'lib' was not resolved. ========",
                `Auto discovery for typings is enabled in project '${proj.getProjectName()}'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.`,
                "File '/a/cache/node_modules/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib/package.json' does not exist.",
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

        it("should handle non-existing directories in config file", () => {
            const f = {
                path: "/a/src/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    include: [
                        "src/**/*",
                        "notexistingfolder/*"
                    ]
                })
            };
            const host = createServerHost([f, config]);
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            projectService.closeClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 0 });

            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
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
            checkSnapLength(scriptInfo.getSnapshot(), f.content.length);

            // open project and replace its content with empty string
            projectService.openClientFile(f.path, "");
            checkSnapLength(scriptInfo.getSnapshot(), 0);
        });
        function checkSnapLength(snap: IScriptSnapshot, expectedLength: number) {
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

        it("should property handle missing config files", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const projectName = "project1";
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });

            // should have one external project since config file is missing
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            host.reloadFS([f1, config]);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
        });

        it("types should load from config file path if config exists", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
            };
            const node = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: "declare var process: any"
            };
            const cwd = {
                path: "/a/c"
            };
            const host = createServerHost([f1, config, node, cwd], { currentDirectory: cwd.path });
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(projectService.configuredProjects[0], [f1.path, node.path]);
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

        it("are generated when the config file changes", () => {
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

            configFile.content = `{
                "compilerOptions": {
                    "haha": 123
                }
            }`;
            host.reloadFS([file, configFile]);
            host.triggerFileWatcherCallback(configFile.path);
            host.runQueuedTimeoutCallbacks();
            serverEventManager.checkEventCountOfType("configFileDiag", 2);

            configFile.content = `{
                "compilerOptions": {}
            }`;
            host.reloadFS([file, configFile]);
            host.triggerFileWatcherCallback(configFile.path);
            host.runQueuedTimeoutCallbacks();
            serverEventManager.checkEventCountOfType("configFileDiag", 3);
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

        it("should be turned on for js-only external projects with skipLibCheck=false", () => {
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
                    options: { skipLibCheck: false }
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

        it("should not report bind errors for declaration files with skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: "let x = 1;"
            };
            const dTsFile1 = {
                path: "/a/dTsFile1.d.ts",
                content: `
                declare var x: number;`
            };
            const dTsFile2 = {
                path: "/a/dTsFile2.d.ts",
                content: `
                declare var x: string;`
            };
            const host = createServerHost([jsconfigFile, jsFile, dTsFile1, dTsFile2]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const dTsFile1GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile1.path }
            );
            const error1Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile1GetErrRequest).response;
            assert.isTrue(error1Result.length === 0);

             const dTsFile2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile2.path }
            );
            const error2Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile2GetErrRequest).response;
            assert.isTrue(error2Result.length === 0);
        });

        it("should report semanitc errors for loose JS files with '// @ts-check' and skipLibCheck=true", () => {
            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
        });

        it("should report semanitc errors for configured js project with '// @ts-check' and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };

            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
        });

        it("should report semanitc errors for configured js project with checkJs=true and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        checkJs: true,
                        skipLibCheck: true
                    },
                })
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: `let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
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
            assert.isTrue(configuredProject.getFileNames().length === 0);

            const inferredProject = projectService.inferredProjects[0];
            assert.isTrue(inferredProject.containsFile(<server.NormalizedPath>file1.path));
        });

        it("should be able to handle @types if input file list is empty", () => {
            const f = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compiler: {},
                    files: []
                })
            };
            const t1 = {
                path: "/a/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`
            };
            const t2 = {
                path: "/a/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`
            };
            const host = createServerHost([f, config, t1, t2], { currentDirectory: getDirectoryPath(f.path) });
            const projectService = createProjectService(host);

            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
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
            const snap1 = projectServiice.getScriptInfo(f1.path).getSnapshot();
            assert.equal(snap1.getText(0, snap1.getLength()), tmp.content, "content should be equal to the content of temp file");

            // reload from original file file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path }
            });

            // verify content
            const snap2 = projectServiice.getScriptInfo(f1.path).getSnapshot();
            assert.equal(snap2.getText(0, snap2.getLength()), f1.content, "content should be equal to the content of original file");

        });
    });

    describe("Inferred projects", () => {
        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createServerHost([f]);
            const session = createSession(host);
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 1,
                type: "request",
                command: "compilerOptionsForInferredProjects",
                arguments: {
                    options: {
                        allowJs: true
                    }
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 2,
                type: "request",
                command: "open",
                arguments: {
                    file: f.path,
                    fileContent: f.content,
                    scriptKindName: "JS"
                }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f.path]);
        });
    });

    describe("No overwrite emit error", () => {
        it("for inferred project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            openFilesForSession([f1], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const projectName = projectService.inferredProjects[0].getProjectName();

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName: projectName }
            }).response;
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsForInferredProjects,
                seq: 3,
                arguments: { options: { module: ModuleKind.CommonJS } }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName: projectName }
            }).response;
            assert.isTrue(diagsAfterUpdate.length === 0);
        });

        it("for external project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const projectFileName = "/a/b/project.csproj";
            const externalFiles = toExternalFiles([f1.path]);
            projectService.openExternalProject(<protocol.ExternalProject>{
                projectFileName,
                rootFiles: externalFiles,
                options: {}
            });

            checkNumberOfProjects(projectService, { externalProjects: 1 });

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName }
            }).response;
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.OpenExternalProjectRequest>{
                type: "request",
                command: server.CommandNames.OpenExternalProject,
                seq: 3,
                arguments: {
                    projectFileName,
                    rootFiles: externalFiles,
                    options: { module: ModuleKind.CommonJS }
                }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName }
            }).response;
            assert.isTrue(diagsAfterUpdate.length === 0);
        });
    });

    describe("emit with outFile or out setting", () => {
        function test(opts: CompilerOptions, expectedUsesOutFile: boolean) {
            const f1 = {
                path: "/a/a.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/b.ts",
                content: "let y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: opts,
                    compileOnSave: true
                })
            };
            const host = createServerHost([f1, f2, config]);
            const session = createSession(host);
            session.executeCommand(<protocol.OpenRequest>{
                seq: 1,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 1 });
            const { response } = session.executeCommand(<protocol.CompileOnSaveAffectedFileListRequest>{
                seq: 2,
                type: "request",
                command: "compileOnSaveAffectedFileList",
                arguments: { file: f1.path }
            });
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response).length, 1, "expected output for 1 project");
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response)[0].fileNames.length, 2, "expected output for 1 project");
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response)[0].projectUsesOutFile, expectedUsesOutFile, "usesOutFile");
        }

        it("projectUsesOutFile should not be returned if not set", () => {
            test({}, /*expectedUsesOutFile*/ false);
        });
        it("projectUsesOutFile should be true if outFile is set", () => {
            test({ outFile: "/a/out.js" }, /*expectedUsesOutFile*/ true);
        });
        it("projectUsesOutFile should be true if out is set", () => {
            test({ out: "/a/out.js" }, /*expectedUsesOutFile*/ true);
        });
    });

    describe("import helpers", () => {
        it("should not crash in tsserver", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "export async function foo() { return 100; }"
            };
            const tslib = {
                path: "/a/node_modules/tslib/index.d.ts",
                content: ""
            };
            const host = createServerHost([f1, tslib]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "p", rootFiles: [toExternalFile(f1.path)], options: { importHelpers: true } });
            service.checkNumberOfProjects({ externalProjects: 1 });
        });
    });

    describe("searching for config file", () => {
        it("should stop at projectRootPath if given", () => {
            const f1 = {
                path: "/a/file1.ts",
                content: ""
            };
            const configFile = {
                path: "/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, configFile]);
            const service = createProjectService(host);
            service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a");

            checkNumberOfConfiguredProjects(service, 0);
            checkNumberOfInferredProjects(service, 1);

            service.closeClientFile(f1.path);
            service.openClientFile(f1.path);
            checkNumberOfConfiguredProjects(service, 1);
            checkNumberOfInferredProjects(service, 0);
        });
    });

    describe("cancellationToken", () => {
        it("is attached to request", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let xyz = 1;"
            };
            const host = createServerHost([f1]);
            let expectedRequestId: number;
            const cancellationToken: server.ServerCancellationToken = {
                isCancellationRequested: () => false,
                setRequest: requestId => {
                    if (expectedRequestId === undefined) {
                        assert.isTrue(false, "unexpected call");
                    }
                    assert.equal(requestId, expectedRequestId);
                },
                resetRequest: noop
            };

            const session = createSession(host, /*typingsInstaller*/ undefined, /*projectServiceEventHandler*/ undefined, cancellationToken);

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OpenRequest>{
                command: "open",
                arguments: { file: f1.path }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.GeterrRequest>{
                command: "geterr",
                arguments: { files: [f1.path] }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OccurrencesRequest>{
                command: "occurrences",
                arguments: { file: f1.path, line: 1, offset: 6 }
            });

            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
        });

        it("Geterr is cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };

            const cancellationToken = new TestServerCancellationToken();
            const host = createServerHost([f1, config]);
            const session = createSession(host, /*typingsInstaller*/ undefined, () => { }, cancellationToken);
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });
                // send geterr for missing file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: ["/a/missing"] }
                });
                // no files - expect 'completed' event
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(session.getSeq(), 0);
            }
            {
                const getErrId = session.getNextSeq();
                // send geterr for a valid file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });

                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run new request
                session.executeCommandSeq(<protocol.ProjectInfoRequest>{
                    command: "projectInfo",
                    arguments: { file: f1.path }
                });
                host.clearOutput();

                // cancel previously issued Geterr
                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedTimeoutCallbacks();

                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                // the semanticDiag message
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 2, "expect 2 messages");
                const e2 = <protocol.Event>getMessage(0);
                assert.equal(e2.event, "semanticDiag");
                verifyRequestCompleted(getErrId, 1);

                cancellationToken.resetToken();
            }
            {
                const getErr1 = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");
                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                // make sure that getErr1 is completed
                verifyRequestCompleted(getErr1, 0);
            }

            function verifyRequestCompleted(expectedSeq: number, n: number) {
                const event = <protocol.RequestCompletedEvent>getMessage(n);
                assert.equal(event.event, "requestCompleted");
                assert.equal(event.body.request_seq, expectedSeq, "expectedSeq");
                host.clearOutput();
            }

            function getMessage(n: number) {
                return JSON.parse(server.extractMessage(host.getOutput()[n]));
            }
        });
        it("Lower priority tasks are cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: `{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";`
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };
            const cancellationToken = new TestServerCancellationToken(/*cancelAfterRequest*/ 3);
            const host = createServerHost([f1, config]);
            const session = createSession(host, /*typingsInstaller*/ undefined, () => { }, cancellationToken, /*throttleWaitMilliseconds*/ 0);
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });

                // send navbar request (normal priority)
                session.executeCommandSeq(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // ensure the nav bar request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // send outlining spans request (normal priority)
                session.executeCommandSeq(<protocol.OutliningSpansRequest>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });

                // ensure the outlining spans request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.OutliningSpansRequest>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });
            }

            function verifyExecuteCommandSeqIsCancellable<T extends server.protocol.Request>(request: Partial<T>) {
                // Set the next request to be cancellable
                // The cancellation token will cancel the request the third time
                // isCancellationRequested() is called.
                cancellationToken.setRequestToCancel(session.getNextSeq());
                let operationCanceledExceptionThrown = false;

                try {
                    session.executeCommandSeq(request);
                }
                catch (e) {
                    assert(e instanceof OperationCanceledException);
                    operationCanceledExceptionThrown = true;
                }
                assert(operationCanceledExceptionThrown, "Operation Canceled Exception not thrown for request: " + JSON.stringify(request));
            }
        });
    });

    describe("occurence highlight on string", () => {
        it("should be marked if only on string values", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.ts",
                content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
            };

            const host = createServerHost([file1]);
            const session = createSession(host);
            const projectService = session.getProjectService();

            projectService.openClientFile(file1.path);
            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 1, offset: 11 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                const firstOccurence = highlightResponse[0];
                assert.isTrue(firstOccurence.isInString, "Highlights should be marked with isInString");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 3, offset: 13 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on property name");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 4, offset: 14 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on indexer");
            }
        });
    });

    describe("maxNodeModuleJsDepth for inferred projects", () => {
        it("should be set to 2 if the project has js root files", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.js",
                content: `var t = require("test"); t.`
            };
            const moduleFile: FileOrFolder = {
                path: "/a/b/node_modules/test/index.js",
                content: `var v = 10; module.exports = v;`
            };

            const host = createServerHost([file1, moduleFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);

            let project = projectService.inferredProjects[0];
            let options = project.getCompilerOptions();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);

            // Assert the option sticks
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES2016 });
            project = projectService.inferredProjects[0];
            options = project.getCompilerOptions();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);
        });

        it("should return to normal state when all js root files are removed from project", () => {
            const file1 = {
                path: "/a/file1.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/file2.js",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });

            projectService.openClientFile(file1.path);
            checkNumberOfInferredProjects(projectService, 1);
            let project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilerOptions().maxNodeModuleJsDepth);

            projectService.openClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isTrue(project.getCompilerOptions().maxNodeModuleJsDepth === 2);

            projectService.closeClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilerOptions().maxNodeModuleJsDepth);
        });
    });
}

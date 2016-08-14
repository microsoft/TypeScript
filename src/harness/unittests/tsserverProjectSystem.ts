/// <reference path="..\harness.ts" />

namespace ts {
    function notImplemented(): any {
        throw new Error("Not yet implemented");
    }

    const nullLogger: server.Logger = {
        close: () => void 0,
        hasLevel: () => void 0,
        loggingEnabled: () => false,
        perftrc: () => void 0,
        info: () => void 0,
        startGroup: () => void 0,
        endGroup: () => void 0,
        msg: () => void 0
    };

    const nullCancellationToken: HostCancellationToken = {
        isCancellationRequested: () => false
    };

    const { content: libFileContent } = Harness.getDefaultLibraryFile(Harness.IO);
    const libFile: FileOrFolder = {
        path: "/a/lib/lib.d.ts",
        content: libFileContent
    };

    function getExecutingFilePathFromLibFile(libFilePath: string): string {
        return combinePaths(getDirectoryPath(libFile.path), "tsc.js");
    }

    function toExternalFile(fileName: string): server.protocol.ExternalFile {
        return { fileName };
    }

    function toExternalFiles(fileNames: string[]) {
        return map(fileNames, toExternalFile);
    }

    interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        libFile?: FileOrFolder;
        currentDirectory?: string;
    }

    function createServerHost(fileOrFolderList: FileOrFolder[],
        params?: TestServerHostCreationParameters,
        libFilePath: string = libFile.path): TestServerHost {

        if (!params) {
            params = {};
        }
        return new TestServerHost(
            params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false,
            params.executingFilePath || getExecutingFilePathFromLibFile(libFilePath),
            params.currentDirectory || "/",
            fileOrFolderList);
    }

    interface FileOrFolder {
        path: string;
        content?: string;
        fileSize?: number;
    }

    interface FSEntry {
        path: Path;
        fullPath: string;
    }

    interface File extends FSEntry {
        content: string;
        fileSize?: number;
    }

    interface Folder extends FSEntry {
        entries: FSEntry[];
    }

    function isFolder(s: FSEntry): s is Folder {
        return isArray((<Folder>s).entries);
    }

    function isFile(s: FSEntry): s is File {
        return typeof (<File>s).content === "string";
    }

    function addFolder(fullPath: string, toPath: (s: string) => Path, fs: FileMap<FSEntry>): Folder {
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

    function sizeOfMap(map: Map<any>): number {
        let n = 0;
        for (const name in map) {
            if (hasProperty(map, name)) {
                n++;
            }
        }
        return n;
    }

    function checkMapKeys(caption: string, map: Map<any>, expectedKeys: string[]) {
        assert.equal(sizeOfMap(map), expectedKeys.length, `${caption}: incorrect size of map`);
        for (const name of expectedKeys) {
            assert.isTrue(hasProperty(map, name), `${caption} is expected to contain ${name}, actual keys: ${getKeys(map)}`);
        }
    }

    function checkFileNames(caption: string, actualFileNames: string[], expectedFileNames: string[]) {
        assert.equal(actualFileNames.length, expectedFileNames.length, `${caption}: incorrect actual number of files, expected ${JSON.stringify(expectedFileNames)}, got ${actualFileNames}`);
        for (const f of expectedFileNames) {
            assert.isTrue(contains(actualFileNames, f), `${caption}: expected to find ${f} in ${JSON.stringify(actualFileNames)}`);
        }
    }

    function checkNumberOfConfiguredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.configuredProjects.length, expected, `expected ${expected} configured project(s)`);
    }

    function checkNumberOfExternalProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.externalProjects.length, expected, `expected ${expected} external project(s)`);
    }

    function checkNumberOfInferredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.inferredProjects.length, expected, `expected ${expected} inferred project(s)`);
    }

    function checkNumberOfProjects(projectService: server.ProjectService, count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
        checkNumberOfConfiguredProjects(projectService, count.configuredProjects || 0);
        checkNumberOfExternalProjects(projectService, count.externalProjects || 0);
        checkNumberOfInferredProjects(projectService, count.inferredProjects || 0);
    }

    function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]) {
        checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
    }

    function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[]) {
        checkMapKeys("watchedDirectories", host.watchedDirectories, expectedDirectories);
    }

    function checkProjectActualFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, actual files`, project.getFileNames(), expectedFiles);
    }

    function checkProjectRootFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, rootFileNames`, project.getRootFiles(), expectedFiles);
    }

    class Callbacks {
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
            return sizeOfMap(this.map);
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

    type TimeOutCallback = () => any;

    class TestServerHost implements server.ServerHost {
        args: string[] = [];
        newLine: "\n";

        private fs: ts.FileMap<FSEntry>;
        private getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;

        private timeoutCallbacks = new Callbacks();
        private immediateCallbacks = new Callbacks();

        readonly watchedDirectories: Map<{ cb: DirectoryWatcherCallback, recursive: boolean }[]> = {};
        readonly watchedFiles: Map<FileWatcherCallback[]> = {};

        constructor(public useCaseSensitiveFileNames: boolean, private executingFilePath: string, private currentDirectory: string, fileOrFolderList: FileOrFolder[]) {
            this.getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);

            this.reloadFS(fileOrFolderList);
        }

        reloadFS(filesOrFolders: FileOrFolder[]) {
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
            const callbacks = lookUp(this.watchedDirectories, path) || (this.watchedDirectories[path] = []);
            callbacks.push({ cb: callback, recursive });
            return {
                referenceCount: 0,
                directoryName,
                close: () => {
                    for (let i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].cb === callback) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                    if (!callbacks.length) {
                        delete this.watchedDirectories[path];
                    }
                }
            };
        }

        triggerDirectoryWatcherCallback(directoryName: string, fileName: string): void {
            const path = this.toPath(directoryName);
            const callbacks = lookUp(this.watchedDirectories, path);
            if (callbacks) {
                for (const callback of callbacks) {
                    callback.cb(fileName);
                }
            }
        }

        triggerFileWatcherCallback(fileName: string, removed?: boolean): void {
            const path = this.toPath(fileName);
            const callbacks = lookUp(this.watchedFiles, path);
            if (callbacks) {
                for (const callback of callbacks) {
                    callback(path, removed);
                }
            }
        }

        watchFile(fileName: string, callback: FileWatcherCallback) {
            const path = this.toPath(fileName);
            const callbacks = lookUp(this.watchedFiles, path) || (this.watchedFiles[path] = []);
            callbacks.push(callback);
            return {
                close: () => {
                    const i = callbacks.indexOf(callback);
                    callbacks.splice(i, 1);
                    if (!callbacks.length) {
                        delete this.watchedFiles[path];
                    }
                }
            };
        }

        // TOOD: record and invoke callbacks to simulate timer events
        setTimeout(callback: TimeOutCallback, time: number, ...args: any[]) {
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

        setImmediate(callback: TimeOutCallback, time: number, ...args: any[]) {
            return this.immediateCallbacks.register(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId);
        }

        writeFile(fileName: string, content: string) {
            const path = this.toPath(fileName);
            const newEntry: File = {
                content,
                fullPath: path,
                path
            };
            this.fs.set(path, newEntry);
        };

        readonly readFile = (s: string) => (<File>this.fs.get(this.toPath(s))).content;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        readonly writeCompressedData = () => notImplemented();
        readonly write = (s: string) => notImplemented();
        readonly createDirectory = (s: string) => notImplemented();
        readonly exit = () => notImplemented();
    }

    function makeSessionRequest<T>(command: string, args: T) {
        const newRequest: server.protocol.Request = {
            seq: 0,
            type: "request",
            command,
            canCompressResponse: false,
            arguments: args
        };
        return newRequest;
    }

    function openFilesForSession(files: FileOrFolder[], session: server.Session) {
        for (const file of files) {
            const request = makeSessionRequest<server.protocol.OpenRequestArgs>(server.CommandNames.Open, { file: file.path });
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ true);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ true);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useOneInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
                export * from "../c/f2.ts";
                export * from "../d/f3.ts";`
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ true);
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
            const projectService = new server.ProjectService(host, nullLogger, nullCancellationToken, /*useSingleInferredProject*/ false);

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

    describe("CompileOnSave affected list", () => {
        function sendAffectedFileRequestAndCheckResult(session: server.Session, request: server.protocol.Request, expectedFileList: FileOrFolder[]) {
            const actualResult = session.executeCommand(request).response;
            const expectedFileNameList = expectedFileList.length > 0 ? ts.map(expectedFileList, f => f.path).sort() : [];
            const actualFileNameList = actualResult.sort();
            assert.isTrue(arrayIsEqualTo(actualFileNameList, expectedFileNameList), `Actual result is ${actualFileNameList}, while expected ${expectedFileNameList}`);
        }

        describe("for configured projects", () => {
            let moduleFile1: FileOrFolder;
            let file1Consumer1: FileOrFolder;
            let file1Consumer2: FileOrFolder;
            let moduleFile2: FileOrFolder;
            let globalFile3: FileOrFolder;
            let configFile: FileOrFolder;
            let changeModuleFile1ShapeRequest1: server.protocol.Request;
            let changeModuleFile1InternalRequest1: server.protocol.Request;
            let changeModuleFile1ShapeRequest2: server.protocol.Request;
            // A compile on save affected file request using file1
            let moduleFile1FileListRequest: server.protocol.Request;
            let host: TestServerHost;
            let session: server.Session;

            beforeEach(() => {
                moduleFile1 = {
                    path: "/a/b/moduleFile1.ts",
                    content: "export function Foo() { };"
                };

                file1Consumer1 = {
                    path: "/a/b/file1Consumer1.ts",
                    content: `import {Foo} from "./moduleFile1"; let y = Foo();`
                };

                file1Consumer2 = {
                    path: "/a/b/file1Consumer2.ts",
                    content: `import {Foo} from "./moduleFile1"; let z = 10;`
                };

                moduleFile2 = {
                    path: "/a/b/moduleFile2.ts",
                    content: `export var Foo4 = 10;`
                };

                globalFile3 = {
                    path: "/a/b/globalFile3.ts",
                    content: `interface GlobalFoo { age: number }`
                };

                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{
                        "compilerOptions": {
                            "compileOnSave": true
                        }
                    }`
                };

                // Change the content of file1 to `export var T: number;export function Foo() { };`
                changeModuleFile1ShapeRequest1 = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                // Change the content of file1 to `export var T: number;export function Foo() { };`
                changeModuleFile1InternalRequest1 = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T1: number;`
                });

                // Change the content of file1 to `export var T: number;export function Foo() { };`
                changeModuleFile1ShapeRequest2 = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T2: number;`
                });

                moduleFile1FileListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(server.CommandNames.CompileOnSaveAffectedFileList, { file: moduleFile1.path });

                host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
                session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);
            });

            it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);

                // Change the content of file1 to `export var T: number;export function Foo() { console.log('hi'); };`
                const changeFile1InternalRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 46,
                    endLine: 1,
                    endOffset: 46,
                    insertString: `console.log('hi');`
                });
                session.executeCommand(changeFile1InternalRequest);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1]);
            });

            it("should be up-to-date with the reference map changes", () => {
                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);

                // Change file2 content to `let y = Foo();`
                const removeFile1Consumer1ImportRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: file1Consumer1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 28,
                    insertString: ""
                });
                session.executeCommand(removeFile1Consumer1ImportRequest);
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer2]);

                // Add the import statements back to file2
                const addFile2ImportRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: file1Consumer1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `import {Foo} from "./moduleFile1";`
                });
                session.executeCommand(addFile2ImportRequest);

                // Change the content of file1 to `export var T2: string;export var T: number;export function Foo() { };`
                const changeModuleFile1ShapeRequest2 = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T2: string;`
                });
                session.executeCommand(changeModuleFile1ShapeRequest2);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);
            });

            it("should be up-to-date with changes made in non-open files", () => {
                openFilesForSession([moduleFile1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);

                file1Consumer1.content = `let y = 10;`;
                host.reloadFS([moduleFile1, file1Consumer1, file1Consumer2, configFile, libFile]);
                host.triggerFileWatcherCallback(file1Consumer1.path, /*removed*/ false);

                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer2]);
            });

            it("should be up-to-date with deleted files", () => {
                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);

                session.executeCommand(changeModuleFile1ShapeRequest1);
                // Delete file1Consumer2
                host.reloadFS([moduleFile1, file1Consumer1, configFile, libFile]);
                host.triggerFileWatcherCallback(file1Consumer2.path, /*removed*/ true);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1]);
            });

            it("should be up-to-date with newly created files", () => {
                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2]);

                const file1Consumer3: FileOrFolder = {
                    path: "/a/b/file1Consumer3.ts",
                    content: `import {Foo} from "./moduleFile1"; let y = Foo();`
                };
                host.reloadFS([moduleFile1, file1Consumer1, file1Consumer2, file1Consumer3, globalFile3, configFile, libFile]);
                host.triggerDirectoryWatcherCallback(ts.getDirectoryPath(file1Consumer3.path), file1Consumer3.path);
                host.runQueuedTimeoutCallbacks();
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2, file1Consumer3]);
            });

            it("should detect changes in non-root files", () => {
                moduleFile1 = {
                    path: "/a/b/moduleFile1.ts",
                    content: "export function Foo() { };"
                };

                file1Consumer1 = {
                    path: "/a/b/file1Consumer1.ts",
                    content: `import {Foo} from "./moduleFile1"; let y = Foo();`
                };

                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{
                        "compilerOptions": {
                            "compileOnSave": true
                        },
                        "files": ["${file1Consumer1.path}"]
                    }`
                };

                host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
                session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);

                openFilesForSession([moduleFile1, file1Consumer1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1]);

                // change file1 shape now, and verify both files are affected
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1, file1Consumer1]);

                // change file1 internal, and verify only file1 is affected
                session.executeCommand(changeModuleFile1InternalRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1]);
            });

            it("should return all files if a global file changed shape", () => {
                openFilesForSession([globalFile3], session);
                const changeGlobalFile3ShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: globalFile3.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T2: string;`
                });

                // check after file1 shape changes
                session.executeCommand(changeGlobalFile3ShapeRequest);
                const globalFile3FileListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(server.CommandNames.CompileOnSaveAffectedFileList, { file: globalFile3.path });
                sendAffectedFileRequestAndCheckResult(session, globalFile3FileListRequest, [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2]);
            });

            it("should return empty array if CompileOnSave is not enabled", () => {
                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{}`
                };

                host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile, libFile]);
                session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);
                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, []);
            });

            it("should always return the file itself if '--isolatedModules' is specified", () => {
                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{
                        "compilerOptions": {
                            "compileOnSave": true,
                            "isolatedModules": true
                        }
                    }`
                };

                host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
                session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);
                openFilesForSession([moduleFile1], session);

                const file1ChangeShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`
                });
                session.executeCommand(file1ChangeShapeRequest);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1]);
            });

            it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{
                        "compilerOptions": {
                            "module": "system",
                            "compileOnSave": true,
                            "outFile": "/a/b/out.js"
                        }
                    }`
                };

                host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
                session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);
                openFilesForSession([moduleFile1], session);

                const file1ChangeShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(server.CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`
                });
                session.executeCommand(file1ChangeShapeRequest);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [moduleFile1]);
            });
        });
    });

    describe("EmitFile test", () => {
        it("should emit specified file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export function Foo() { return 10; }`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `import {Foo} from "./f1"; let y = Foo();`
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([file1, file2, config, libFile]);
            const session = new server.Session(host, nullCancellationToken, /*useSingleInferredProject*/ false, Utils.byteLength, Utils.maxUncompressedMessageSize, Utils.compress, process.hrtime, nullLogger);

            openFilesForSession([file1, file2], session);
            const compileFileRequest = makeSessionRequest<server.protocol.CompileOnSaveEmitFileRequestArgs>(server.CommandNames.CompileOnSaveEmitFile, { file: file1.path, projectFileName: config.path });
            session.executeCommand(compileFileRequest);

            const expectedEmittedFileName = "/a/b/f1.js";
            assert.isTrue(host.fileExists(expectedEmittedFileName));
            assert.equal(host.readFile(expectedEmittedFileName), `"use strict";\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`);
        });
    });
}
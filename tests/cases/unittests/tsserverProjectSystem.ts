/// <reference path="..\..\..\src\harness\harness.ts" />

namespace ts {
    function notImplemented(): any {
        throw new Error("Not yet implemented");
    }

    const nullLogger: server.Logger = {
        close: () => void 0,
        isVerbose: () => void 0,
        loggingEnabled: () => false,
        perftrc: () => void 0,
        info: () => void 0,
        startGroup: () => void 0,
        endGroup: () => void 0,
        msg: () => void 0
    };

    const { content: libFileContent } = Harness.getDefaultLibraryFile(Harness.IO);

    function getExecutingFilePathFromLibFile(libFile: FileOrFolder): string {
        return combinePaths(getDirectoryPath(libFile.path), "tsc.js");
    }

    interface FileOrFolder {
        path: string;
        content?: string;
    }

    interface FSEntry {
        path: Path;
        fullPath: string;
    }

    interface File extends FSEntry {
        content: string;
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

    function readDirectory(folder: FSEntry, ext: string, excludes: Path[], result: string[]): void {
        if (!folder || !isFolder(folder) || contains(excludes, folder.path)) {
            return;
        }
        for (const entry of folder.entries) {
            if (contains(excludes, entry.path)) {
                continue;
            }
            if (isFolder(entry)) {
                readDirectory(entry, ext, excludes, result);
            }
            else if (fileExtensionIs(entry.path, ext)) {
                result.push(entry.fullPath);
            }
        }
    }

    function checkConfiguredProjectNumber(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.configuredProjects.length, expected, `expected ${expected} configured project(s)`);
    }

    function checkInferredProjectNumber(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.inferredProjects.length, expected, `expected ${expected} inferred project(s)`);
    }

    function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]) {
        checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
    }

    function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[]) {
        checkMapKeys("watchedDirectories", host.watchedDirectories, expectedDirectories);
    }

    function checkConfiguredProjectActualFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames("configuredProjects project, actualFileNames", project.getFileNames(), expectedFiles);
    }

    function checkConfiguredProjectRootFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames("configuredProjects project, rootFileNames", project.getRootFiles(), expectedFiles);
    }

    class TestServerHost implements server.ServerHost {
        args: string[] = [];
        newLine: "\n";

        private fs: ts.FileMap<FSEntry>;
        private getCanonicalFileName: (s: string) => string;
        private toPath: (f: string) => Path;
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
                    const entry = { path, content: fileOrFolder.content, fullPath };
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

        readDirectory(path: string, ext: string, excludes: string[]): string[] {
            const result: string[] = [];
            readDirectory(this.fs.get(this.toPath(path)), ext, map(excludes, e => toPath(e, path, this.getCanonicalFileName)), result);
            return result;
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

        triggerFileWatcherCallback(fileName: string): void {
            const path = this.toPath(fileName);
            const callbacks = lookUp(this.watchedFiles, path);
            if (callbacks) {
                for (const callback of callbacks) {
                    callback(path, /*removed*/ true);
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
        readonly setTimeout = setTimeout;
        readonly clearTimeout = (timeoutId: any): void => void 0;
        readonly readFile = (s: string) => (<File>this.fs.get(this.toPath(s))).content;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        readonly writeFile = (path: string, content: string) => notImplemented();
        readonly write = (s: string) => notImplemented();
        readonly createDirectory = (s: string) => notImplemented();
        readonly exit = () => notImplemented();
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
        const libFile: FileOrFolder = {
            path: "/a/lib/lib.d.ts",
            content: libFileContent
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
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [appFile, moduleFile, libFile]);
            const projectService = new server.ProjectService(host, nullLogger);
            const { configFileName } = projectService.openClientFile(appFile.path);

            assert(!configFileName, `should not find config, got: '${configFileName}`);
            checkConfiguredProjectNumber(projectService, 0);
            checkInferredProjectNumber(projectService, 1);

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

            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [ configFile, libFile, file1, file2, file3 ]);
            const projectService = new server.ProjectService(host, nullLogger);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkInferredProjectNumber(projectService, 0);
            checkConfiguredProjectNumber(projectService, 1);

            const project = projectService.configuredProjects[0];
            checkConfiguredProjectActualFiles(project, [file1.path, libFile.path, file2.path]);
            checkConfiguredProjectRootFiles(project, [file1.path, file2.path]);
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
            const filesWithoutConfig = [ libFile, commonFile1, commonFile2 ];
            const filesWithConfig = [ libFile, commonFile1, commonFile2, configFile ];
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", filesWithoutConfig);
            const projectService = new server.ProjectService(host, nullLogger);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkInferredProjectNumber(projectService, 2);
            checkWatchedDirectories(host, ["/a/b", "/a"]);

            // Add a tsconfig file
            host.reloadFS(filesWithConfig);
            host.triggerDirectoryWatcherCallback("/a/b", configFile.path);

            checkInferredProjectNumber(projectService, 1);
            checkConfiguredProjectNumber(projectService, 1);
            // watching all files except one that was open
            checkWatchedFiles(host, [libFile.path, configFile.path]);

            // remove the tsconfig file
            host.reloadFS(filesWithoutConfig);
            host.triggerFileWatcherCallback(configFile.path);
            checkInferredProjectNumber(projectService, 2);
            checkConfiguredProjectNumber(projectService, 0);
            checkWatchedDirectories(host, ["/a/b", "/a"]);
        });

        it("add new files to a configured project without file list", (done: () => void) => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [commonFile1, libFile, configFile]);
            const projectService = new server.ProjectService(host, nullLogger);
            projectService.openClientFile(commonFile1.path);
            checkWatchedDirectories(host, ["/a/b"]);
            checkConfiguredProjectNumber(projectService, 1);

            const project = projectService.configuredProjects[0];
            checkConfiguredProjectRootFiles(project, [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.triggerDirectoryWatcherCallback("/a/b", commonFile2.path);
            // project service waits for 250ms to update the project structure, therefore the assertion needs to wait longer.
            setTimeout(() => {
                checkConfiguredProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
                done();
            }, 1000);
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
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [commonFile1, commonFile2, configFile]);
            const projectService = new server.ProjectService(host, nullLogger);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkConfiguredProjectNumber(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkConfiguredProjectRootFiles(project, [commonFile1.path]);
            checkInferredProjectNumber(projectService, 1);
        });

        it("handle recreated files correctly", (done: () => void) => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [commonFile1, commonFile2, configFile]);
            const projectService = new server.ProjectService(host, nullLogger);
            projectService.openClientFile(commonFile1.path);

            checkConfiguredProjectNumber(projectService, 1);
            const project = projectService.configuredProjects[0];
            checkConfiguredProjectRootFiles(project, [commonFile1.path, commonFile2.path]);

            // delete commonFile1
            projectService.closeClientFile(commonFile1.path);
            host.reloadFS([configFile]);
            host.triggerDirectoryWatcherCallback("/a/b", commonFile1.path);
            host.setTimeout(() => {
                // re-add commonFile1
                host.reloadFS([commonFile1, configFile]);
                projectService.openClientFile(commonFile1.path);
                host.setTimeout(() => {
                    checkConfiguredProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
                    done();
                }, 500);
            }, 500);
        });
    });
}
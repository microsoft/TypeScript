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
        readonly setTimeout = (callback: (...args: any[]) => void, ms: number, ...args: any[]): any => void 0;
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

    describe("tsserver project system:", () => {
        it("create inferred project", () => {
            const appFile: FileOrFolder = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };
            const libFile: FileOrFolder = {
                path: "/a/lib/lib.d.ts",
                content: libFileContent
            };
            const moduleFile: FileOrFolder = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = new TestServerHost(/*useCaseSensitiveFileNames*/ false, getExecutingFilePathFromLibFile(libFile), "/", [appFile, moduleFile, libFile]);
            const projectService = new server.ProjectService(host, nullLogger);
            const { configFileName } = projectService.openClientFile(appFile.path);

            assert(!configFileName, `should not find config, got: '${configFileName}`);
            assert.equal(projectService.inferredProjects.length, 1, "expected one inferred project");
            assert.equal(projectService.configuredProjects.length, 0, "expected no configured project");

            const project = projectService.inferredProjects[0];

            checkFileNames("inferred project", project.getFileNames(), [appFile.path, libFile.path, moduleFile.path]);
            checkMapKeys("watchedDirectories", host.watchedDirectories, ["/a/b/c", "/a/b", "/a"]);
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
            const libFile: FileOrFolder = {
                path: "/a/lib/lib.d.ts",
                content: libFileContent
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
            assert.equal(projectService.inferredProjects.length, 0, "expected no inferred project");
            assert.equal(projectService.configuredProjects.length, 1, "expected one configured project");

            const project = projectService.configuredProjects[0];
            checkFileNames("configuredProjects project, actualFileNames", project.getFileNames(), [file1.path, libFile.path, file2.path]);
            checkFileNames("configuredProjects project, rootFileNames", project.getRootFiles(), [file1.path, file2.path]);

            checkMapKeys("watchedFiles", host.watchedFiles, [configFile.path, file2.path, libFile.path]); // watching all files except one that was open
            checkMapKeys("watchedDirectories", host.watchedDirectories, [getDirectoryPath(configFile.path)]);
        });
    });
}
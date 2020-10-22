namespace ts.projectSystem {
    describe("unittests:: tsserver:: events:: ProjectsUpdatedInBackground", () => {
        function verifyFiles(caption: string, actual: readonly string[], expected: readonly string[]) {
            assert.equal(actual.length, expected.length, `Incorrect number of ${caption}. Actual: ${actual} Expected: ${expected}`);
            const seen = new Map<string, true>();
            forEach(actual, f => {
                assert.isFalse(seen.has(f), `${caption}: Found duplicate ${f}. Actual: ${actual} Expected: ${expected}`);
                seen.set(f, true);
                assert.isTrue(contains(expected, f), `${caption}: Expected not to contain ${f}. Actual: ${actual} Expected: ${expected}`);
            });
        }

        function createVerifyInitialOpen(session: TestSession, verifyProjectsUpdatedInBackgroundEventHandler: (events: server.ProjectsUpdatedInBackgroundEvent[]) => void) {
            return (file: File) => {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: server.CommandNames.Open,
                    arguments: {
                        file: file.path
                    }
                });
                verifyProjectsUpdatedInBackgroundEventHandler([]);
            };
        }

        interface ProjectsUpdatedInBackgroundEventVerifier {
            session: TestSession;
            verifyProjectsUpdatedInBackgroundEventHandler(events: server.ProjectsUpdatedInBackgroundEvent[]): void;
            verifyInitialOpen(file: File): void;
        }

        function verifyProjectsUpdatedInBackgroundEvent(createSession: (host: TestServerHost) => ProjectsUpdatedInBackgroundEventVerifier) {
            it("when adding new file", () => {
                const commonFile1: File = {
                    path: "/a/b/file1.ts",
                    content: "export var x = 10;"
                };
                const commonFile2: File = {
                    path: "/a/b/file2.ts",
                    content: "export var y = 10;"
                };
                const commonFile3: File = {
                    path: "/a/b/file3.ts",
                    content: "export var z = 10;"
                };
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: `{}`
                };
                const openFiles = [commonFile1.path];
                const host = createServerHost([commonFile1, libFile, configFile]);
                const { verifyProjectsUpdatedInBackgroundEventHandler, verifyInitialOpen } = createSession(host);
                verifyInitialOpen(commonFile1);

                host.writeFile(commonFile2.path, commonFile2.content);
                host.runQueuedTimeoutCallbacks();
                verifyProjectsUpdatedInBackgroundEventHandler([{
                    eventName: server.ProjectsUpdatedInBackgroundEvent,
                    data: {
                        openFiles
                    }
                }]);

                host.writeFile(commonFile3.path, commonFile3.content);
                host.runQueuedTimeoutCallbacks();
                verifyProjectsUpdatedInBackgroundEventHandler([{
                    eventName: server.ProjectsUpdatedInBackgroundEvent,
                    data: {
                        openFiles
                    }
                }]);
            });

            describe("with --out or --outFile setting", () => {
                function verifyEventWithOutSettings(compilerOptions: CompilerOptions = {}) {
                    const config: File = {
                        path: "/a/tsconfig.json",
                        content: JSON.stringify({
                            compilerOptions
                        })
                    };

                    const f1: File = {
                        path: "/a/a.ts",
                        content: "export let x = 1"
                    };
                    const f2: File = {
                        path: "/a/b.ts",
                        content: "export let y = 1"
                    };

                    const openFiles = [f1.path];
                    const files = [f1, config, libFile];
                    const host = createServerHost(files);
                    const { verifyInitialOpen, verifyProjectsUpdatedInBackgroundEventHandler } = createSession(host);
                    verifyInitialOpen(f1);

                    host.writeFile(f2.path, f2.content);
                    host.runQueuedTimeoutCallbacks();

                    verifyProjectsUpdatedInBackgroundEventHandler([{
                        eventName: server.ProjectsUpdatedInBackgroundEvent,
                        data: {
                            openFiles
                        }
                    }]);

                    host.writeFile(f2.path, "export let x = 11");
                    host.runQueuedTimeoutCallbacks();
                    verifyProjectsUpdatedInBackgroundEventHandler([{
                        eventName: server.ProjectsUpdatedInBackgroundEvent,
                        data: {
                            openFiles
                        }
                    }]);
                }

                it("when both options are not set", () => {
                    verifyEventWithOutSettings();
                });

                it("when --out is set", () => {
                    const outJs = "/a/out.js";
                    verifyEventWithOutSettings({ out: outJs });
                });

                it("when --outFile is set", () => {
                    const outJs = "/a/out.js";
                    verifyEventWithOutSettings({ outFile: outJs });
                });
            });

            describe("with modules and configured project", () => {
                const file1Consumer1Path = "/a/b/file1Consumer1.ts";
                const moduleFile1Path = "/a/b/moduleFile1.ts";
                const configFilePath = "/a/b/tsconfig.json";
                interface InitialStateParams {
                    /** custom config file options */
                    configObj?: any;
                    /** Additional files and folders to add */
                    getAdditionalFileOrFolder?(): File[];
                    /** initial list of files to reload in fs and first file in this list being the file to open */
                    firstReloadFileList?: string[];
                }
                function getInitialState({ configObj = {}, getAdditionalFileOrFolder, firstReloadFileList }: InitialStateParams = {}) {
                    const moduleFile1: File = {
                        path: moduleFile1Path,
                        content: "export function Foo() { };",
                    };

                    const file1Consumer1: File = {
                        path: file1Consumer1Path,
                        content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    };

                    const file1Consumer2: File = {
                        path: "/a/b/file1Consumer2.ts",
                        content: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    };

                    const moduleFile2: File = {
                        path: "/a/b/moduleFile2.ts",
                        content: `export var Foo4 = 10;`,
                    };

                    const globalFile3: File = {
                        path: "/a/b/globalFile3.ts",
                        content: `interface GlobalFoo { age: number }`
                    };

                    const additionalFiles = getAdditionalFileOrFolder ? getAdditionalFileOrFolder() : [];
                    const configFile = {
                        path: configFilePath,
                        content: JSON.stringify(configObj || { compilerOptions: {} })
                    };

                    const files: File[] = [file1Consumer1, moduleFile1, file1Consumer2, moduleFile2, ...additionalFiles, globalFile3, libFile, configFile];

                    const filesToReload = firstReloadFileList && getFiles(firstReloadFileList) || files;
                    const host = createServerHost([filesToReload[0], configFile]);

                    // Initial project creation
                    const { session, verifyProjectsUpdatedInBackgroundEventHandler, verifyInitialOpen } = createSession(host);
                    const openFiles = [filesToReload[0].path];
                    verifyInitialOpen(filesToReload[0]);

                    // Since this is first event, it will have all the files
                    filesToReload.forEach(f => host.ensureFileOrFolder(f));
                    if (!firstReloadFileList) host.runQueuedTimeoutCallbacks(); // Invalidated module resolutions to schedule project update
                    verifyProjectsUpdatedInBackgroundEvent();

                    return {
                        host,
                        moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile,
                        updateContentOfOpenFile,
                        verifyNoProjectsUpdatedInBackgroundEvent,
                        verifyProjectsUpdatedInBackgroundEvent
                    };

                    function getFiles(filelist: string[]) {
                        return map(filelist, getFile);
                    }

                    function getFile(fileName: string) {
                        return find(files, file => file.path === fileName)!;
                    }

                    function verifyNoProjectsUpdatedInBackgroundEvent() {
                        host.runQueuedTimeoutCallbacks();
                        verifyProjectsUpdatedInBackgroundEventHandler([]);
                    }

                    function verifyProjectsUpdatedInBackgroundEvent() {
                        host.runQueuedTimeoutCallbacks();
                        verifyProjectsUpdatedInBackgroundEventHandler([{
                            eventName: server.ProjectsUpdatedInBackgroundEvent,
                            data: {
                                openFiles
                            }
                        }]);
                    }

                    function updateContentOfOpenFile(file: File, newContent: string) {
                        session.executeCommandSeq<protocol.ChangeRequest>({
                            command: server.CommandNames.Change,
                            arguments: {
                                file: file.path,
                                insertString: newContent,
                                endLine: 1,
                                endOffset: file.content.length,
                                line: 1,
                                offset: 1
                            }
                        });
                        file.content = newContent;
                    }
                }

                it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                    const { host, moduleFile1, verifyProjectsUpdatedInBackgroundEvent } = getInitialState();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { console.log('hi'); };`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should be up-to-date with the reference map changes", () => {
                    const { host, moduleFile1, file1Consumer1, updateContentOfOpenFile, verifyProjectsUpdatedInBackgroundEvent, verifyNoProjectsUpdatedInBackgroundEvent } = getInitialState();

                    // Change file1Consumer1 content to `export let y = Foo();`
                    updateContentOfOpenFile(file1Consumer1, "export let y = Foo();");
                    verifyNoProjectsUpdatedInBackgroundEvent();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();

                    // Add the import statements back to file1Consumer1
                    updateContentOfOpenFile(file1Consumer1, `import {Foo} from "./moduleFile1";let y = Foo();`);
                    verifyNoProjectsUpdatedInBackgroundEvent();

                    // Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`
                    host.writeFile(moduleFile1.path, `export var T: number;export var T2: string;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();

                    // Multiple file edits in one go:

                    // Change file1Consumer1 content to `export let y = Foo();`
                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    updateContentOfOpenFile(file1Consumer1, `export let y = Foo();`);
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should be up-to-date with deleted files", () => {
                    const { host, moduleFile1, file1Consumer2, verifyProjectsUpdatedInBackgroundEvent } = getInitialState();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);

                    // Delete file1Consumer2
                    host.deleteFile(file1Consumer2.path);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should be up-to-date with newly created files", () => {
                    const { host, moduleFile1, verifyProjectsUpdatedInBackgroundEvent, } = getInitialState();

                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    host.writeFile("/a/b/file1Consumer3.ts", `import {Foo} from "./moduleFile1"; let y = Foo();`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should detect changes in non-root files", () => {
                    const { host, moduleFile1, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        configObj: { files: [file1Consumer1Path] },
                    });

                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();

                    // change file1 internal, and verify only file1 is affected
                    host.writeFile(moduleFile1.path, moduleFile1.content + "var T1: number;");
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should return all files if a global file changed shape", () => {
                    const { host, globalFile3, verifyProjectsUpdatedInBackgroundEvent } = getInitialState();

                    host.writeFile(globalFile3.path, globalFile3.content + "var T2: string;");
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should always return the file itself if '--isolatedModules' is specified", () => {
                    const { host, moduleFile1, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        configObj: { compilerOptions: { isolatedModules: true } }
                    });

                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                    const outFilePath = "/a/b/out.js";
                    const { host, moduleFile1, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        configObj: { compilerOptions: { module: "system", outFile: outFilePath } }
                    });

                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should return cascaded affected file list", () => {
                    const file1Consumer1Consumer1: File = {
                        path: "/a/b/file1Consumer1Consumer1.ts",
                        content: `import {y} from "./file1Consumer1";`
                    };
                    const { host, moduleFile1, file1Consumer1, updateContentOfOpenFile, verifyNoProjectsUpdatedInBackgroundEvent, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [file1Consumer1Consumer1]
                    });

                    updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T: number;");
                    verifyNoProjectsUpdatedInBackgroundEvent();

                    // Doesnt change the shape of file1Consumer1
                    host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();

                    // Change both files before the timeout
                    updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T2: number;");
                    host.writeFile(moduleFile1.path, `export var T2: number;export function Foo() { };`);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should work fine for files with circular references", () => {
                    const file1: File = {
                        path: "/a/b/file1.ts",
                        content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
                    };
                    const file2: File = {
                        path: "/a/b/file2.ts",
                        content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
                    };
                    const { host, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [file1, file2],
                        firstReloadFileList: [file1.path, libFile.path, file2.path, configFilePath]
                    });

                    host.writeFile(file2.path, file2.content + "export var t3 = 10;");
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should detect removed code file", () => {
                    const referenceFile1: File = {
                        path: "/a/b/referenceFile1.ts",
                        content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
                    };
                    const { host, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [referenceFile1],
                        firstReloadFileList: [referenceFile1.path, libFile.path, moduleFile1Path, configFilePath]
                    });

                    host.deleteFile(moduleFile1Path);
                    verifyProjectsUpdatedInBackgroundEvent();
                });

                it("should detect non-existing code file", () => {
                    const referenceFile1: File = {
                        path: "/a/b/referenceFile1.ts",
                        content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
                    };
                    const { host, moduleFile2, updateContentOfOpenFile, verifyNoProjectsUpdatedInBackgroundEvent, verifyProjectsUpdatedInBackgroundEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [referenceFile1],
                        firstReloadFileList: [referenceFile1.path, libFile.path, configFilePath]
                    });

                    updateContentOfOpenFile(referenceFile1, referenceFile1.content + "export var yy = Foo();");
                    verifyNoProjectsUpdatedInBackgroundEvent();

                    // Create module File2 and see both files are saved
                    host.writeFile(moduleFile2.path, moduleFile2.content);
                    verifyProjectsUpdatedInBackgroundEvent();
                });
            });

            describe("resolution when resolution cache size", () => {
                function verifyWithMaxCacheLimit(useSlashRootAsSomeNotRootFolderInUserDirectory: boolean) {
                    const rootFolder = useSlashRootAsSomeNotRootFolderInUserDirectory ? "/user/username/rootfolder/otherfolder/" : "/";
                    const file1: File = {
                        path: rootFolder + "a/b/project/file1.ts",
                        content: 'import a from "file2"'
                    };
                    const file2: File = {
                        path: rootFolder + "a/b/node_modules/file2.d.ts",
                        content: "export class a { }"
                    };
                    const file3: File = {
                        path: rootFolder + "a/b/project/file3.ts",
                        content: "export class c { }"
                    };
                    const configFile: File = {
                        path: rootFolder + "a/b/project/tsconfig.json",
                        content: JSON.stringify({ compilerOptions: { typeRoots: [] } })
                    };

                    const projectFiles = [file1, file3, libFile, configFile];
                    const openFiles = [file1.path];
                    const watchedRecursiveDirectories = useSlashRootAsSomeNotRootFolderInUserDirectory ?
                        // Folders of node_modules lookup not in changedRoot
                        ["a/b/project", "a/b/project/node_modules", "a/b/node_modules", "a/node_modules", "node_modules"].map(v => rootFolder + v) :
                        // Folder of tsconfig
                        ["/a/b/project", "/a/b/project/node_modules"];
                    const host = createServerHost(projectFiles);
                    const { session, verifyInitialOpen, verifyProjectsUpdatedInBackgroundEventHandler } = createSession(host);
                    const projectService = session.getProjectService();
                    verifyInitialOpen(file1);
                    checkNumberOfProjects(projectService, { configuredProjects: 1 });
                    const project = projectService.configuredProjects.get(configFile.path)!;
                    verifyProject();

                    file3.content += "export class d {}";
                    host.writeFile(file3.path, file3.content);
                    host.checkTimeoutQueueLengthAndRun(2);

                    // Since this is first event
                    verifyProject();
                    verifyProjectsUpdatedInBackgroundEventHandler([{
                        eventName: server.ProjectsUpdatedInBackgroundEvent,
                        data: {
                            openFiles
                        }
                    }]);

                    projectFiles.push(file2);
                    host.writeFile(file2.path, file2.content);
                    host.runQueuedTimeoutCallbacks(); // For invalidation
                    host.runQueuedTimeoutCallbacks(); // For actual update
                    if (useSlashRootAsSomeNotRootFolderInUserDirectory) {
                        watchedRecursiveDirectories.length = 3;
                    }
                    else {
                        // file2 addition wont be detected
                        projectFiles.pop();
                        assert.isTrue(host.fileExists(file2.path));
                    }
                    verifyProject();

                    verifyProjectsUpdatedInBackgroundEventHandler(useSlashRootAsSomeNotRootFolderInUserDirectory ? [{
                        eventName: server.ProjectsUpdatedInBackgroundEvent,
                        data: {
                            openFiles
                        }
                    }] : []);

                    function verifyProject() {
                        checkProjectActualFiles(project, map(projectFiles, file => file.path));
                        checkWatchedDirectories(host, [], /*recursive*/ false);
                        checkWatchedDirectories(host, watchedRecursiveDirectories, /*recursive*/ true);
                    }
                }

                it("project is not at root level", () => {
                    verifyWithMaxCacheLimit(/*useSlashRootAsSomeNotRootFolderInUserDirectory*/ true);
                });

                it("project is at root level", () => {
                    verifyWithMaxCacheLimit(/*useSlashRootAsSomeNotRootFolderInUserDirectory*/ false);
                });
            });
        }

        describe("when event handler is set in the session", () => {
            verifyProjectsUpdatedInBackgroundEvent(createSessionWithProjectChangedEventHandler);

            function createSessionWithProjectChangedEventHandler(host: TestServerHost): ProjectsUpdatedInBackgroundEventVerifier {
                const { session, events: projectChangedEvents } = createSessionWithEventTracking<server.ProjectsUpdatedInBackgroundEvent>(host, server.ProjectsUpdatedInBackgroundEvent);
                return {
                    session,
                    verifyProjectsUpdatedInBackgroundEventHandler,
                    verifyInitialOpen: createVerifyInitialOpen(session, verifyProjectsUpdatedInBackgroundEventHandler)
                };

                function eventToString(event: server.ProjectsUpdatedInBackgroundEvent) {
                    return JSON.stringify(event && { eventName: event.eventName, data: event.data });
                }

                function eventsToString(events: readonly server.ProjectsUpdatedInBackgroundEvent[]) {
                    return "[" + map(events, eventToString).join(",") + "]";
                }

                function verifyProjectsUpdatedInBackgroundEventHandler(expectedEvents: readonly server.ProjectsUpdatedInBackgroundEvent[]) {
                    assert.equal(projectChangedEvents.length, expectedEvents.length, `Incorrect number of events Actual: ${eventsToString(projectChangedEvents)} Expected: ${eventsToString(expectedEvents)}`);
                    forEach(projectChangedEvents, (actualEvent, i) => {
                        const expectedEvent = expectedEvents[i];
                        assert.strictEqual(actualEvent.eventName, expectedEvent.eventName);
                        verifyFiles("openFiles", actualEvent.data.openFiles, expectedEvent.data.openFiles);
                    });

                    // Verified the events, reset them
                    projectChangedEvents.length = 0;
                }
            }
        });

        describe("when event handler is not set but session is created with canUseEvents = true", () => {
            describe("without noGetErrOnBackgroundUpdate, diagnostics for open files are queued", () => {
                verifyProjectsUpdatedInBackgroundEvent(createSessionThatUsesEvents);
            });

            describe("with noGetErrOnBackgroundUpdate, diagnostics for open file are not queued", () => {
                verifyProjectsUpdatedInBackgroundEvent(host => createSessionThatUsesEvents(host, /*noGetErrOnBackgroundUpdate*/ true));
            });


            function createSessionThatUsesEvents(host: TestServerHost, noGetErrOnBackgroundUpdate?: boolean): ProjectsUpdatedInBackgroundEventVerifier {
                const { session, getEvents, clearEvents } = createSessionWithDefaultEventHandler<protocol.ProjectsUpdatedInBackgroundEvent>(host, server.ProjectsUpdatedInBackgroundEvent, { noGetErrOnBackgroundUpdate });

                return {
                    session,
                    verifyProjectsUpdatedInBackgroundEventHandler,
                    verifyInitialOpen: createVerifyInitialOpen(session, verifyProjectsUpdatedInBackgroundEventHandler)
                };

                function verifyProjectsUpdatedInBackgroundEventHandler(expected: readonly server.ProjectsUpdatedInBackgroundEvent[]) {
                    const expectedEvents: protocol.ProjectsUpdatedInBackgroundEventBody[] = map(expected, e => {
                        return {
                            openFiles: e.data.openFiles
                        };
                    });
                    const events = getEvents();
                    assert.equal(events.length, expectedEvents.length, `Incorrect number of events Actual: ${map(events, e => e.body)} Expected: ${expectedEvents}`);
                    forEach(events, (actualEvent, i) => {
                        const expectedEvent = expectedEvents[i];
                        verifyFiles("openFiles", actualEvent.body.openFiles, expectedEvent.openFiles);
                    });

                    // Verified the events, reset them
                    clearEvents();

                    if (events.length) {
                        host.checkTimeoutQueueLength(noGetErrOnBackgroundUpdate ? 0 : 1); // Error checking queued only if not noGetErrOnBackgroundUpdate
                    }
                }
            }
        });
    });
}

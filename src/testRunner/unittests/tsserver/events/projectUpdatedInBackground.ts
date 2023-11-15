import * as ts from "../../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../../helpers";
import {
    baselineTsserverLogs,
    createSessionWithCustomEventHandler,
    openFilesForSession,
    TestSession,
} from "../../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    TestServerHost,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: ProjectsUpdatedInBackground", () => {
    function verifyProjectsUpdatedInBackgroundEvent(scenario: string, createSession: (host: TestServerHost) => TestSession) {
        it("when adding new file", () => {
            const commonFile1: File = {
                path: "/users/username/projects/project/file1.ts",
                content: "export var x = 10;",
            };
            const commonFile2: File = {
                path: "/users/username/projects/project/file2.ts",
                content: "export var y = 10;",
            };
            const commonFile3: File = {
                path: "/users/username/projects/project/file3.ts",
                content: "export var z = 10;",
            };
            const configFile: File = {
                path: "/users/username/projects/project/tsconfig.json",
                content: `{}`,
            };
            const host = createServerHost([commonFile1, libFile, configFile]);
            const session = createSession(host);
            openFilesForSession([commonFile1], session);

            host.writeFile(commonFile2.path, commonFile2.content);
            host.runQueuedTimeoutCallbacks();

            host.writeFile(commonFile3.path, commonFile3.content);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and when adding new file`, session);
        });

        describe("with --out or --outFile setting", () => {
            function verifyEventWithOutSettings(subScenario: string, compilerOptions: ts.CompilerOptions = {}) {
                it(subScenario, () => {
                    const config: File = {
                        path: "/users/username/projects/project/tsconfig.json",
                        content: jsonToReadableText({
                            compilerOptions,
                        }),
                    };

                    const f1: File = {
                        path: "/users/username/projects/project/a.ts",
                        content: "export let x = 1",
                    };
                    const f2: File = {
                        path: "/users/username/projects/project/b.ts",
                        content: "export let y = 1",
                    };

                    const files = [f1, config, libFile];
                    const host = createServerHost(files);
                    const session = createSession(host);
                    openFilesForSession([f1], session);

                    host.writeFile(f2.path, f2.content);
                    host.runQueuedTimeoutCallbacks();

                    host.writeFile(f2.path, "export let x = 11");
                    host.runQueuedTimeoutCallbacks();
                    baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and ${subScenario}`, session);
                });
            }
            verifyEventWithOutSettings("when both options are not set");
            verifyEventWithOutSettings("when --out is set", { out: "/a/out.js" });
            verifyEventWithOutSettings("when --outFile is set", { outFile: "/a/out.js" });
        });

        describe("with modules and configured project", () => {
            const file1Consumer1Path = "/users/username/projects/project/file1Consumer1.ts";
            const moduleFile1Path = "/users/username/projects/project/moduleFile1.ts";
            const configFilePath = "/users/username/projects/project/tsconfig.json";
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
                    path: "/users/username/projects/project/file1Consumer2.ts",
                    content: `import {Foo} from "./moduleFile1"; let z = 10;`,
                };

                const moduleFile2: File = {
                    path: "/users/username/projects/project/moduleFile2.ts",
                    content: `export var Foo4 = 10;`,
                };

                const globalFile3: File = {
                    path: "/users/username/projects/project/globalFile3.ts",
                    content: `interface GlobalFoo { age: number }`,
                };

                const additionalFiles = getAdditionalFileOrFolder ? getAdditionalFileOrFolder() : [];
                const configFile = {
                    path: configFilePath,
                    content: jsonToReadableText(configObj || { compilerOptions: {} }),
                };

                const files: File[] = [file1Consumer1, moduleFile1, file1Consumer2, moduleFile2, ...additionalFiles, globalFile3, libFile, configFile];

                const filesToReload = firstReloadFileList?.map(fileName => ts.find(files, file => file.path === fileName)!) || files;
                const host = createServerHost([filesToReload[0], configFile]);

                // Initial project creation
                const session = createSession(host);
                openFilesForSession([filesToReload[0]], session);

                // Since this is first event, it will have all the files
                filesToReload.forEach(f => host.ensureFileOrFolder(f));
                if (!firstReloadFileList) host.runQueuedTimeoutCallbacks(); // Invalidated module resolutions to schedule project update

                return {
                    host,
                    session,
                    moduleFile1,
                    file1Consumer1,
                    file1Consumer2,
                    moduleFile2,
                    globalFile3,
                    configFile,
                    updateContentOfOpenFile,
                };

                function updateContentOfOpenFile(file: File, newContent: string) {
                    session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                        command: ts.server.protocol.CommandTypes.Change,
                        arguments: {
                            file: file.path,
                            insertString: newContent,
                            endLine: 1,
                            endOffset: file.content.length,
                            line: 1,
                            offset: 1,
                        },
                    });
                    file.content = newContent;
                }
            }

            it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                const { host, moduleFile1, session } = getInitialState();

                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();

                // Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { console.log('hi'); };`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should contains only itself`, session);
            });

            it("should be up-to-date with the reference map changes", () => {
                const { host, moduleFile1, file1Consumer1, updateContentOfOpenFile, session } = getInitialState();

                // Change file1Consumer1 content to `export let y = Foo();`
                updateContentOfOpenFile(file1Consumer1, "export let y = Foo();");
                host.runQueuedTimeoutCallbacks();

                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();

                // Add the import statements back to file1Consumer1
                updateContentOfOpenFile(file1Consumer1, `import {Foo} from "./moduleFile1";let y = Foo();`);
                host.runQueuedTimeoutCallbacks();

                // Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`
                host.writeFile(moduleFile1.path, `export var T: number;export var T2: string;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();

                // Multiple file edits in one go:

                // Change file1Consumer1 content to `export let y = Foo();`
                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                updateContentOfOpenFile(file1Consumer1, `export let y = Foo();`);
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should be up-to-date with the reference map changes`, session);
            });

            it("should be up-to-date with deleted files", () => {
                const { host, moduleFile1, file1Consumer2, session } = getInitialState();

                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);

                // Delete file1Consumer2
                host.deleteFile(file1Consumer2.path);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should be up-to-date with deleted files`, session);
            });

            it("should be up-to-date with newly created files", () => {
                const { host, moduleFile1, session } = getInitialState();

                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.writeFile("/users/username/projects/project/file1Consumer3.ts", `import {Foo} from "./moduleFile1"; let y = Foo();`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should be up-to-date with newly created files`, session);
            });

            it("should detect changes in non-root files", () => {
                const { host, moduleFile1, session } = getInitialState({
                    configObj: { files: [file1Consumer1Path] },
                });

                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();

                // change file1 internal, and verify only file1 is affected
                host.writeFile(moduleFile1.path, moduleFile1.content + "var T1: number;");
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should detect changes in non-root files`, session);
            });

            it("should return all files if a global file changed shape", () => {
                const { host, globalFile3, session } = getInitialState();

                host.writeFile(globalFile3.path, globalFile3.content + "var T2: string;");
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should return all files if a global file changed shape`, session);
            });

            it("should always return the file itself if '--isolatedModules' is specified", () => {
                const { host, moduleFile1, session } = getInitialState({
                    configObj: { compilerOptions: { isolatedModules: true } },
                });

                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should always return the file itself if --isolatedModules is specified`, session);
            });

            it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                const outFilePath = "/users/username/projects/project/out.js";
                const { host, moduleFile1, session } = getInitialState({
                    configObj: { compilerOptions: { module: "system", outFile: outFilePath } },
                });

                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should always return the file itself if --out or --outFile is specified`, session);
            });

            it("should return cascaded affected file list", () => {
                const file1Consumer1Consumer1: File = {
                    path: "/users/username/projects/project/file1Consumer1Consumer1.ts",
                    content: `import {y} from "./file1Consumer1";`,
                };
                const { host, moduleFile1, file1Consumer1, updateContentOfOpenFile, session } = getInitialState({
                    getAdditionalFileOrFolder: () => [file1Consumer1Consumer1],
                });

                updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T: number;");
                host.runQueuedTimeoutCallbacks();

                // Doesnt change the shape of file1Consumer1
                host.writeFile(moduleFile1.path, `export var T: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();

                // Change both files before the timeout
                updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T2: number;");
                host.writeFile(moduleFile1.path, `export var T2: number;export function Foo() { };`);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should return cascaded affected file list`, session);
            });

            it("should work fine for files with circular references", () => {
                const file1: File = {
                    path: "/users/username/projects/project/file1.ts",
                    content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`,
                };
                const file2: File = {
                    path: "/users/username/projects/project/file2.ts",
                    content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`,
                };
                const { host, session } = getInitialState({
                    getAdditionalFileOrFolder: () => [file1, file2],
                    firstReloadFileList: [file1.path, libFile.path, file2.path, configFilePath],
                });

                host.writeFile(file2.path, file2.content + "export var t3 = 10;");
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should work fine for files with circular references`, session);
            });

            it("should detect removed code file", () => {
                const referenceFile1: File = {
                    path: "/users/username/projects/project/referenceFile1.ts",
                    content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`,
                };
                const { host, session } = getInitialState({
                    getAdditionalFileOrFolder: () => [referenceFile1],
                    firstReloadFileList: [referenceFile1.path, libFile.path, moduleFile1Path, configFilePath],
                });

                host.deleteFile(moduleFile1Path);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should detect removed code file`, session);
            });

            it("should detect non-existing code file", () => {
                const referenceFile1: File = {
                    path: "/users/username/projects/project/referenceFile1.ts",
                    content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`,
                };
                const { host, moduleFile2, updateContentOfOpenFile, session } = getInitialState({
                    getAdditionalFileOrFolder: () => [referenceFile1],
                    firstReloadFileList: [referenceFile1.path, libFile.path, configFilePath],
                });

                updateContentOfOpenFile(referenceFile1, referenceFile1.content + "export var yy = Foo();");
                host.runQueuedTimeoutCallbacks();

                // Create module File2 and see both files are saved
                host.writeFile(moduleFile2.path, moduleFile2.content);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and should detect non-existing code file`, session);
            });
        });

        describe("resolution when resolution cache size", () => {
            function verifyWithMaxCacheLimit(subScenario: string, useSlashRootAsSomeNotRootFolderInUserDirectory: boolean) {
                it(subScenario, () => {
                    const rootFolder = useSlashRootAsSomeNotRootFolderInUserDirectory ? "/user/username/rootfolder/otherfolder/" : "/";
                    const file1: File = {
                        path: rootFolder + "a/b/project/file1.ts",
                        content: 'import a from "file2"',
                    };
                    const file2: File = {
                        path: rootFolder + "a/b/node_modules/file2.d.ts",
                        content: "export class a { }",
                    };
                    const file3: File = {
                        path: rootFolder + "a/b/project/file3.ts",
                        content: "export class c { }",
                    };
                    const configFile: File = {
                        path: rootFolder + "a/b/project/tsconfig.json",
                        content: jsonToReadableText({ compilerOptions: { typeRoots: [] } }),
                    };

                    const host = createServerHost([file1, file3, libFile, configFile]);
                    const session = createSession(host);
                    openFilesForSession([file1], session);

                    file3.content += "export class d {}";
                    host.writeFile(file3.path, file3.content);
                    host.runQueuedTimeoutCallbacks();

                    host.writeFile(file2.path, file2.content);
                    host.runQueuedTimeoutCallbacks(); // For invalidation
                    host.runQueuedTimeoutCallbacks(); // For actual update

                    baselineTsserverLogs("events/projectUpdatedInBackground", `${scenario} and ${subScenario}`, session);
                });
            }
            verifyWithMaxCacheLimit("project is not at root level", /*useSlashRootAsSomeNotRootFolderInUserDirectory*/ true);
            verifyWithMaxCacheLimit("project is at root level", /*useSlashRootAsSomeNotRootFolderInUserDirectory*/ false);
        });
    }

    describe("when event handler is set in the session", () => {
        verifyProjectsUpdatedInBackgroundEvent("when event handler is set in the session", createSessionWithCustomEventHandler);
    });

    describe("when event handler is not set but session is created with canUseEvents = true", () => {
        describe("without noGetErrOnBackgroundUpdate, diagnostics for open files are queued", () => {
            verifyProjectsUpdatedInBackgroundEvent("without noGetErrOnBackgroundUpdate", host =>
                new TestSession({
                    host,
                    noGetErrOnBackgroundUpdate: false,
                }));
        });

        describe("with noGetErrOnBackgroundUpdate, diagnostics for open file are not queued", () => {
            verifyProjectsUpdatedInBackgroundEvent("with noGetErrOnBackgroundUpdate", host => new TestSession(host));
        });
    });
});

import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    TestSession,
    toExternalFiles,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: compileOnSave:: affected list", () => {
    describe("for configured projects", () => {
        function files() {
            const moduleFile1: File = {
                path: "/a/b/moduleFile1.ts",
                content: "export function Foo() { };",
            };

            const file1Consumer1: File = {
                path: "/a/b/file1Consumer1.ts",
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
                content: `interface GlobalFoo { age: number }`,
            };

            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true
                    }`,
            };
            return { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile };
        }

        it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1, file1Consumer1], session);

            // Send an initial compileOnSave request
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            // Change the content of file1 to `export var T: number;export function Foo() { console.log('hi'); };`
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 46,
                    endLine: 1,
                    endOffset: 46,
                    insertString: `console.log('hi');`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects module shape changed", session);
        });

        it("should be up-to-date with the reference map changes", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1, file1Consumer1], session);

            // Send an initial compileOnSave request
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            // Change file2 content to `let y = Foo();`
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: file1Consumer1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 28,
                    insertString: "",
                },
            });
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            // Add the import statements back to file2
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: file1Consumer1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `import {Foo} from "./moduleFile1";`,
                },
            });

            // Change the content of file1 to `export var T2: string;export var T: number;export function Foo() { };`
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T2: string;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects uptodate with reference map changes", session);
        });

        it("should be up-to-date with changes made in non-open files", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1], session);

            // Send an initial compileOnSave request
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            host.writeFile(file1Consumer1.path, `let y = 10;`);

            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects uptodate with changes in non open files", session);
        });

        it("should be up-to-date with deleted files", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            // Delete file1Consumer2
            host.deleteFile(file1Consumer2.path);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects uptodate with deleted files", session);
        });

        it("should be up-to-date with newly created files", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            const file1Consumer3: File = {
                path: "/a/b/file1Consumer3.ts",
                content: `import {Foo} from "./moduleFile1"; let y = Foo();`,
            };
            host.writeFile(file1Consumer3.path, file1Consumer3.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects uptodate with new files", session);
        });

        it("should detect changes in non-root files", () => {
            const moduleFile1: File = {
                path: "/a/b/moduleFile1.ts",
                content: "export function Foo() { };",
            };

            const file1Consumer1: File = {
                path: "/a/b/file1Consumer1.ts",
                content: `import {Foo} from "./moduleFile1"; let y = Foo();`,
            };

            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "files": ["${file1Consumer1.path}"]
                    }`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1, file1Consumer1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            // change file1 shape now, and verify both files are affected
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            // change file1 internal, and verify only file1 is affected
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T1: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects detect changes in non-root files", session);
        });

        it("should return all files if a global file changed shape", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile } = files();
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([globalFile3], session);

            // check after file1 shape changes
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: globalFile3.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T2: string;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: globalFile3.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects global file shape changed", session);
        });

        it("should return empty array if CompileOnSave is not enabled", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2 } = files();
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile, libFile]);
            const session = new TestSession(host);
            openFilesForSession([moduleFile1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects compileOnSave disabled", session);
        });

        it("should return empty array if noEmit is set", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2 } = files();
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "noEmit": true
                        }
                    }`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile, libFile]);
            const session = new TestSession(host);
            openFilesForSession([moduleFile1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects noEmit", session);
        });

        it("should save when compileOnSave is enabled in base tsconfig.json", () => {
            const { moduleFile1, file1Consumer1, file1Consumer2 } = files();
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "extends": "/a/tsconfig.json"
                    }`,
            };

            const configFile2: File = {
                path: "/a/tsconfig.json",
                content: `{
                        "compileOnSave": true
                    }`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile2, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1, file1Consumer1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects compileOnSave in base tsconfig", session);
        });

        it("should always return the file itself if '--isolatedModules' is specified", () => {
            const { moduleFile1, file1Consumer1 } = files();
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "isolatedModules": true
                        }
                    }`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
            const session = new TestSession(host);
            openFilesForSession([moduleFile1], session);

            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects isolatedModules", session);
        });

        it("should always return the file itself if '--out' or '--outFile' is specified", () => {
            const { moduleFile1, file1Consumer1 } = files();
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "module": "system",
                            "outFile": "/a/b/out.js"
                        }
                    }`,
            };

            const host = createServerHost([moduleFile1, file1Consumer1, configFile, libFile]);
            const session = new TestSession(host);
            openFilesForSession([moduleFile1], session);

            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects outFile", session);
        });

        it("should return cascaded affected file list", () => {
            const { moduleFile1, file1Consumer1, globalFile3, configFile } = files();
            const file1Consumer1Consumer1: File = {
                path: "/a/b/file1Consumer1Consumer1.ts",
                content: `import {y} from "./file1Consumer1";`,
            };
            const host = createServerHost([moduleFile1, file1Consumer1, file1Consumer1Consumer1, globalFile3, configFile, libFile]);
            const session = new TestSession(host);

            openFilesForSession([moduleFile1, file1Consumer1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });

            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                command: ts.server.protocol.CommandTypes.Change,
                arguments: {
                    file: file1Consumer1.path,
                    line: 2,
                    offset: 1,
                    endLine: 2,
                    endOffset: 1,
                    insertString: `export var T: number;`,
                },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path, projectFileName: configFile.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects cascaded affected file list", session);
        });

        it("should work fine for files with circular references", () => {
            const { configFile } = files();
            const file1: File = {
                path: "/a/b/file1.ts",
                content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`,
            };
            const file2: File = {
                path: "/a/b/file2.ts",
                content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`,
            };
            const host = createServerHost([file1, file2, configFile]);
            const session = new TestSession(host);

            openFilesForSession([file1, file2], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects circular references", session);
        });

        it("should return results for all projects if not specifying projectFileName", () => {
            const file1: File = { path: "/a/b/file1.ts", content: "export var t = 10;" };
            const file2: File = { path: "/a/b/file2.ts", content: `import {t} from "./file1"; var t2 = 11;` };
            const file3: File = { path: "/a/c/file2.ts", content: `import {t} from "../b/file1"; var t3 = 11;` };
            const configFile1: File = { path: "/a/b/tsconfig.json", content: `{ "compileOnSave": true }` };
            const configFile2: File = { path: "/a/c/tsconfig.json", content: `{ "compileOnSave": true }` };

            const host = createServerHost([file1, file2, file3, configFile1, configFile2]);
            const session = new TestSession(host);

            openFilesForSession([file1, file2, file3], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects all projects without projectPath", session);
        });

        it("should detect removed code file", () => {
            const { moduleFile1, configFile } = files();
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`,
            };
            const host = createServerHost([moduleFile1, referenceFile1, configFile]);
            const session = new TestSession(host);

            openFilesForSession([referenceFile1], session);
            host.deleteFile(moduleFile1.path);

            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: referenceFile1.path },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: moduleFile1.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects removed code", session);
        });

        it("should detect non-existing code file", () => {
            const { configFile } = files();
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`,
            };
            const host = createServerHost([referenceFile1, configFile]);
            const session = new TestSession(host);

            openFilesForSession([referenceFile1], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: referenceFile1.path },
            });
            baselineTsserverLogs("compileOnSave", "configProjects non existing code", session);
        });
    });

    describe("for changes in declaration files", () => {
        function testDTS(subScenario: string, dtsFileContents: string, tsFileContents: string, opts: ts.CompilerOptions) {
            it(subScenario, () => {
                const dtsFile = {
                    path: "/a/runtime/a.d.ts",
                    content: dtsFileContents,
                };
                const f2 = {
                    path: "/a/b.ts",
                    content: tsFileContents,
                };
                const config = {
                    path: "/a/tsconfig.json",
                    content: jsonToReadableText({
                        compilerOptions: opts,
                        compileOnSave: true,
                    }),
                };
                const host = createServerHost([dtsFile, f2, config]);
                const session = new TestSession(host);
                openFilesForSession([dtsFile], session);
                openFilesForSession([f2], session);
                session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: dtsFile.path },
                });
                session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: f2.path },
                });
                baselineTsserverLogs("compileOnSave", subScenario, session);
            });
        }

        testDTS(
            "dtsFileChange in global file",
            /*dtsFileContents*/ "declare const x: string;",
            /*tsFileContents*/ "var y = 1;",
            /*opts*/ {},
        );

        testDTS(
            "dtsFileChange in module file",
            /*dtsFileContents*/ "export const x: string;",
            /*tsFileContents*/ "import { x } from './runtime/a;",
            /*opts*/ {},
        );

        testDTS(
            "dtsFileChange in global file with dts emit",
            /*dtsFileContents*/ "declare const x: string;",
            /*tsFileContents*/ "var y = 1;",
            /*opts*/ { declaration: true },
        );

        testDTS(
            "dtsFileChange in global file with composite",
            /*dtsFileContents*/ "declare const x: string;",
            /*tsFileContents*/ "var y = 1;",
            /*opts*/ { composite: true },
        );

        testDTS(
            "dtsFileChange in global file with decorator emit",
            /*dtsFileContents*/ "declare const x: string;",
            /*tsFileContents*/ "var y = 1;",
            /*opts*/ { experimentalDecorators: true, emitDecoratorMetadata: true },
        );
    });

    describe("tsserverProjectSystem emit with outFile or out setting", () => {
        function test(subScenario: string, opts: ts.CompilerOptions) {
            it(subScenario, () => {
                const f1 = {
                    path: "/a/a.ts",
                    content: "let x = 1",
                };
                const f2 = {
                    path: "/a/b.ts",
                    content: "let y = 1",
                };
                const config = {
                    path: "/a/tsconfig.json",
                    content: jsonToReadableText({
                        compilerOptions: opts,
                        compileOnSave: true,
                    }),
                };
                const host = createServerHost([f1, f2, config]);
                const session = new TestSession(host);
                openFilesForSession([f1], session);
                session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: f1.path },
                });
                baselineTsserverLogs("compileOnSave", subScenario, session);
            });
        }
        test("compileOnSaveAffectedFileList projectUsesOutFile should not be returned if not set", {});
        test("compileOnSaveAffectedFileList projectUsesOutFile should be true if outFile is set", { outFile: "/a/out.js" });
        test("compileOnSaveAffectedFileList projectUsesOutFile should be true if out is set", { out: "/a/out.js" });
    });
});

describe("unittests:: tsserver:: compileOnSave:: EmitFile test", () => {
    it("should respect line endings", () => {
        const logger = createLoggerWithInMemoryLogs(/*host*/ undefined!); // special handling
        test("\n", logger);
        test("\r\n", logger);
        baselineTsserverLogs("compileOnSave", "line endings", { logger });

        function test(newLine: string, logger: LoggerWithInMemoryLogs) {
            const lines = ["var x = 1;", "var y = 2;"];
            const path = "/a/app";
            const f = {
                path: path + ts.Extension.Ts,
                content: lines.join(newLine),
            };
            const host = createServerHost([f], { newLine });
            logger.host = host;
            logger.log(`currentDirectory:: ${host.getCurrentDirectory()} useCaseSensitiveFileNames: ${host.useCaseSensitiveFileNames} newLine: ${host.newLine}`);
            const session = new TestSession({ host, logger });
            openFilesForSession([f], session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: f.path },
            });
            return logger;
        }
    });

    it("should emit specified file", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export function Foo() { return 10; }`,
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: `import {Foo} from "./f1"; let y = Foo();`,
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: `{}`,
        };
        const host = createServerHost([file1, file2, configFile, libFile], { newLine: "\r\n" });
        const session = new TestSession(host);

        openFilesForSession([file1, file2], session);
        session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
            command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
            arguments: { file: file1.path, projectFileName: configFile.path },
        });

        baselineTsserverLogs("compileOnSave", "emit specified file", session);
    });

    it("shoud not emit js files in external projects", () => {
        const file1 = {
            path: "/a/b/file1.ts",
            content: "consonle.log('file1');",
        };
        // file2 has errors. The emitting should not be blocked.
        const file2 = {
            path: "/a/b/file2.js",
            content: "console.log'file2');",
        };
        const file3 = {
            path: "/a/b/file3.js",
            content: "console.log('file3');",
        };
        const projectFileName = "/a/b/externalproject";
        const host = createServerHost([file1, file2, file3, libFile]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([file1.path, file2.path]),
            options: {
                allowJs: true,
                outFile: "dist.js",
                compileOnSave: true,
            },
            projectFileName,
        }, session);

        session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
            command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
            arguments: { file: file1.path },
        });

        baselineTsserverLogs("compileOnSave", "should not emit js files in external projects", session);
    });

    it("should use project root as current directory so that compile on save results in correct file mapping", () => {
        const inputFileName = "Foo.ts";
        const file1 = {
            path: `/root/TypeScriptProject3/TypeScriptProject3/${inputFileName}`,
            content: "consonle.log('file1');",
        };
        const projectFileName = "/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj";
        const host = createServerHost([file1, libFile]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([file1.path]),
            options: {
                outFile: "bar.js",
                sourceMap: true,
                compileOnSave: true,
            },
            projectFileName,
        }, session);
        session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
            command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
            arguments: { file: file1.path },
        });
        baselineTsserverLogs("compileOnSave", "use projectRoot as current directory", session);
    });

    describe("compile on save emit with and without richResponse", () => {
        it("without rich Response", () => {
            verify(/*richResponse*/ undefined);
        });
        it("with rich Response set to false", () => {
            verify(/*richResponse*/ false);
        });
        it("with rich Repsonse", () => {
            verify(/*richResponse*/ true);
        });

        function verify(richResponse: boolean | undefined) {
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compileOnSave: true,
                    compilerOptions: {
                        outDir: "test",
                        noEmitOnError: true,
                        declaration: true,
                    },
                    exclude: ["node_modules"],
                }),
            };
            const file1: File = {
                path: `/user/username/projects/myproject/file1.ts`,
                content: "const x = 1;",
            };
            const file2: File = {
                path: `/user/username/projects/myproject/file2.ts`,
                content: "const y = 2;",
            };
            const host = createServerHost([file1, file2, config, libFile]);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: file1.path, richResponse },
            });
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: file2.path, richResponse },
            });
            baselineTsserverLogs("compileOnSave", `emit with richRepsonse as ${richResponse}`, session);
        }
    });

    describe("compile on save in global files", () => {
        describe("when program contains module", () => {
            it("when d.ts emit is enabled", () => {
                verifyGlobalSave(/*declaration*/ true, /*hasModule*/ true);
            });
            it("when d.ts emit is not enabled", () => {
                verifyGlobalSave(/*declaration*/ false, /*hasModule*/ true);
            });
        });
        describe("when program doesnt have module", () => {
            it("when d.ts emit is enabled", () => {
                verifyGlobalSave(/*declaration*/ true, /*hasModule*/ false);
            });
            it("when d.ts emit is not enabled", () => {
                verifyGlobalSave(/*declaration*/ false, /*hasModule*/ false);
            });
        });
        function verifyGlobalSave(declaration: boolean, hasModule: boolean) {
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compileOnSave: true,
                    compilerOptions: {
                        declaration,
                        module: hasModule ? undefined : "none",
                    },
                }),
            };
            const file1: File = {
                path: `/user/username/projects/myproject/file1.ts`,
                content: `const x = 1;
function foo() {
    return "hello";
}`,
            };
            const file2: File = {
                path: `/user/username/projects/myproject/file2.ts`,
                content: `const y = 2;
function bar() {
    return "world";
}`,
            };
            const file3: File = {
                path: `/user/username/projects/myproject/file3.ts`,
                content: "const xy = 3;",
            };
            const module: File = {
                path: `/user/username/projects/myproject/module.ts`,
                content: "export const xyz = 4;",
            };
            const files = [file1, file2, file3, ...(hasModule ? [module] : ts.emptyArray)];
            const host = createServerHost([...files, config, libFile]);
            const session = new TestSession(host);
            openFilesForSession([file1, file2], session);

            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path },
            });

            verifyFileSave(file1);
            verifyFileSave(file2);
            verifyFileSave(file3);
            if (hasModule) {
                verifyFileSave(module);
            }

            // Change file1 get affected file list
            verifyLocalEdit(file1, "hello", "world");

            // Change file2 get affected file list = will return only file2 if --declaration otherwise all files
            verifyLocalEdit(file2, "world", "hello");
            baselineTsserverLogs("compileOnSave", `emit in project${hasModule ? " with module" : ""}${declaration ? " with dts emit" : ""}`, session);

            function verifyFileSave(file: File) {
                session.executeCommandSeq<ts.server.protocol.CompileOnSaveEmitFileRequest>({
                    command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
                    arguments: { file: file.path },
                });
            }

            function verifyLocalEdit(file: File, oldText: string, newText: string) {
                // Change file1 get affected file list
                session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                    command: ts.server.protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: file.path,
                            textChanges: [{
                                newText,
                                ...protocolTextSpanFromSubstring(file.content, oldText),
                            }],
                        }],
                    },
                });
                session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: file.path },
                });
                file.content = file.content.replace(oldText, newText);
                verifyFileSave(file);
            }
        }
    });
});

describe("unittests:: tsserver:: compileOnSave:: CompileOnSaveAffectedFileListRequest with and without projectFileName in request", () => {
    function insertString(session: TestSession, file: File) {
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: file.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: "let k = 1",
            },
        });
    }

    function logDirtyOfProjects(session: TestSession) {
        session.logger.log(`Project1 is dirty: ${session.getProjectService().configuredProjects.get(`/user/username/projects/myproject/app1/tsconfig.json`)!.dirty}`);
        session.logger.log(`Project2 is dirty: ${session.getProjectService().configuredProjects.get(`/user/username/projects/myproject/app2/tsconfig.json`)!.dirty}`);
    }

    function verify(subScenario: string, commandArgs: ts.server.protocol.FileRequestArgs) {
        it(subScenario, () => {
            const core: File = {
                path: `/user/username/projects/myproject/core/core.ts`,
                content: "let z = 10;",
            };
            const app1: File = {
                path: `/user/username/projects/myproject/app1/app.ts`,
                content: "let x = 10;",
            };
            const app2: File = {
                path: `/user/username/projects/myproject/app2/app.ts`,
                content: "let y = 10;",
            };
            const app1Config: File = {
                path: `/user/username/projects/myproject/app1/tsconfig.json`,
                content: jsonToReadableText({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true,
                }),
            };
            const app2Config: File = {
                path: `/user/username/projects/myproject/app2/tsconfig.json`,
                content: jsonToReadableText({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true,
                }),
            };
            const files = [libFile, core, app1, app2, app1Config, app2Config];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([app1, app2, core], session);
            insertString(session, app1);
            insertString(session, app2);
            logDirtyOfProjects(session);
            session.executeCommandSeq<ts.server.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.server.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: commandArgs,
            });
            logDirtyOfProjects(session);
            baselineTsserverLogs("compileOnSave", subScenario, session);
        });
    }
    verify("CompileOnSaveAffectedFileListRequest when projectFile is specified", {
        file: `/user/username/projects/myproject/core/core.ts`,
        projectFileName: `/user/username/projects/myproject/app1/tsconfig.json`,
    });
    verify("CompileOnSaveAffectedFileListRequest when projectFile is not specified", {
        file: `/user/username/projects/myproject/core/core.ts`,
    });
});

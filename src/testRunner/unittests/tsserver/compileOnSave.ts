import * as ts from "../../_namespaces/ts";

import CommandNames = ts.server.CommandNames;
function createTestTypingsInstaller(host: ts.server.ServerHost) {
    return new ts.projectSystem.TestTypingsInstaller("/a/data/", /*throttleLimit*/5, host);
}

describe("unittests:: tsserver:: compileOnSave:: affected list", () => {
    function sendAffectedFileRequestAndCheckResult(session: ts.server.Session, request: ts.server.protocol.Request, expectedFileList: { projectFileName: string, files: ts.projectSystem.File[] }[]) {
        const response = session.executeCommand(request).response as ts.server.protocol.CompileOnSaveAffectedFileListSingleProject[];
        const actualResult = response.sort((list1, list2) => ts.compareStringsCaseSensitive(list1.projectFileName, list2.projectFileName));
        expectedFileList = expectedFileList.sort((list1, list2) => ts.compareStringsCaseSensitive(list1.projectFileName, list2.projectFileName));

        assert.equal(actualResult.length, expectedFileList.length, `Actual result project number is different from the expected project number`);

        for (let i = 0; i < actualResult.length; i++) {
            const actualResultSingleProject = actualResult[i];
            const expectedResultSingleProject = expectedFileList[i];
            assert.equal(actualResultSingleProject.projectFileName, expectedResultSingleProject.projectFileName, `Actual result contains different projects than the expected result`);

            const actualResultSingleProjectFileNameList = actualResultSingleProject.fileNames.sort();
            const expectedResultSingleProjectFileNameList = ts.map(expectedResultSingleProject.files, f => f.path).sort();
            assert.isTrue(
                ts.arrayIsEqualTo(actualResultSingleProjectFileNameList, expectedResultSingleProjectFileNameList),
                `For project ${actualResultSingleProject.projectFileName}, the actual result is ${actualResultSingleProjectFileNameList}, while expected ${expectedResultSingleProjectFileNameList}`);
        }
    }

    describe("for configured projects", () => {
        let moduleFile1: ts.projectSystem.File;
        let file1Consumer1: ts.projectSystem.File;
        let file1Consumer2: ts.projectSystem.File;
        let moduleFile2: ts.projectSystem.File;
        let globalFile3: ts.projectSystem.File;
        let configFile: ts.projectSystem.File;
        let changeModuleFile1ShapeRequest1: ts.server.protocol.Request;
        let changeModuleFile1InternalRequest1: ts.server.protocol.Request;
        // A compile on save affected file request using file1
        let moduleFile1FileListRequest: ts.server.protocol.Request;

        beforeEach(() => {
            moduleFile1 = {
                path: "/a/b/moduleFile1.ts",
                content: "export function Foo() { };"
            };

            file1Consumer1 = {
                path: "/a/b/file1Consumer1.ts",
                content: `import {Foo} from "./moduleFile1"; export var y = 10;`
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
                        "compileOnSave": true
                    }`
            };

            // Change the content of file1 to `export var T: number;export function Foo() { };`
            changeModuleFile1ShapeRequest1 = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: `export var T: number;`
            });

            // Change the content of file1 to `export var T: number;export function Foo() { };`
            changeModuleFile1InternalRequest1 = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: `var T1: number;`
            });

            moduleFile1FileListRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: moduleFile1.path, projectFileName: configFile.path });
        });

        it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1, file1Consumer1], session);

            // Send an initial compileOnSave request
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);
            session.executeCommand(changeModuleFile1ShapeRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

            // Change the content of file1 to `export var T: number;export function Foo() { console.log('hi'); };`
            const changeFile1InternalRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 46,
                endLine: 1,
                endOffset: 46,
                insertString: `console.log('hi');`
            });
            session.executeCommand(changeFile1InternalRequest);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1] }]);
        });

        it("should be up-to-date with the reference map changes", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1, file1Consumer1], session);

            // Send an initial compileOnSave request
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

            // Change file2 content to `let y = Foo();`
            const removeFile1Consumer1ImportRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: file1Consumer1.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 28,
                insertString: ""
            });
            session.executeCommand(removeFile1Consumer1ImportRequest);
            session.executeCommand(changeModuleFile1ShapeRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer2] }]);

            // Add the import statements back to file2
            const addFile2ImportRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: file1Consumer1.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: `import {Foo} from "./moduleFile1";`
            });
            session.executeCommand(addFile2ImportRequest);

            // Change the content of file1 to `export var T2: string;export var T: number;export function Foo() { };`
            const changeModuleFile1ShapeRequest2 = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: `export var T2: string;`
            });
            session.executeCommand(changeModuleFile1ShapeRequest2);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);
        });

        it("should be up-to-date with changes made in non-open files", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1], session);

            // Send an initial compileOnSave request
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

            host.writeFile(file1Consumer1.path, `let y = 10;`);

            session.executeCommand(changeModuleFile1ShapeRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer2] }]);
        });

        it("should be up-to-date with deleted files", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

            session.executeCommand(changeModuleFile1ShapeRequest1);
            // Delete file1Consumer2
            host.deleteFile(file1Consumer2.path);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);
        });

        it("should be up-to-date with newly created files", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

            const file1Consumer3: ts.projectSystem.File = {
                path: "/a/b/file1Consumer3.ts",
                content: `import {Foo} from "./moduleFile1"; let y = Foo();`
            };
            host.writeFile(file1Consumer3.path, file1Consumer3.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommand(changeModuleFile1ShapeRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2, file1Consumer3] }]);
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
                        "compileOnSave": true,
                        "files": ["${file1Consumer1.path}"]
                    }`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1, file1Consumer1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);

            // change file1 shape now, and verify both files are affected
            session.executeCommand(changeModuleFile1ShapeRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);

            // change file1 internal, and verify only file1 is affected
            session.executeCommand(changeModuleFile1InternalRequest1);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1] }]);
        });

        it("should return all files if a global file changed shape", () => {
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([globalFile3], session);
            const changeGlobalFile3ShapeRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: globalFile3.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: `var T2: string;`
            });

            // check after file1 shape changes
            session.executeCommand(changeGlobalFile3ShapeRequest);
            const globalFile3FileListRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: globalFile3.path });
            sendAffectedFileRequestAndCheckResult(session, globalFile3FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2] }]);
        });

        it("should return empty array if CompileOnSave is not enabled", () => {
            configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });
            ts.projectSystem.openFilesForSession([moduleFile1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, []);
        });

        it("should return empty array if noEmit is set", () => {
            configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "noEmit": true
                        }
                    }`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });
            ts.projectSystem.openFilesForSession([moduleFile1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, []);
        });

        it("should save when compileOnSave is enabled in base tsconfig.json", () => {
            configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "extends": "/a/tsconfig.json"
                    }`
            };

            const configFile2: ts.projectSystem.File = {
                path: "/a/tsconfig.json",
                content: `{
                        "compileOnSave": true
                    }`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer2, configFile2, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1, file1Consumer1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);
        });

        it("should always return the file itself if '--isolatedModules' is specified", () => {
            configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "isolatedModules": true
                        }
                    }`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });
            ts.projectSystem.openFilesForSession([moduleFile1], session);

            const file1ChangeShapeRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 27,
                endLine: 1,
                endOffset: 27,
                insertString: `Point,`
            });
            session.executeCommand(file1ChangeShapeRequest);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1] }]);
        });

        it("should always return the file itself if '--out' or '--outFile' is specified", () => {
            configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compileOnSave": true,
                        "compilerOptions": {
                            "module": "system",
                            "outFile": "/a/b/out.js"
                        }
                    }`
            };

            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });
            ts.projectSystem.openFilesForSession([moduleFile1], session);

            const file1ChangeShapeRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: moduleFile1.path,
                line: 1,
                offset: 27,
                endLine: 1,
                endOffset: 27,
                insertString: `Point,`
            });
            session.executeCommand(file1ChangeShapeRequest);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1] }]);
        });

        it("should return cascaded affected file list", () => {
            const file1Consumer1Consumer1: ts.projectSystem.File = {
                path: "/a/b/file1Consumer1Consumer1.ts",
                content: `import {y} from "./file1Consumer1";`
            };
            const host = ts.projectSystem.createServerHost([moduleFile1, file1Consumer1, file1Consumer1Consumer1, globalFile3, configFile, ts.projectSystem.libFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([moduleFile1, file1Consumer1], session);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer1Consumer1] }]);

            const changeFile1Consumer1ShapeRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                file: file1Consumer1.path,
                line: 2,
                offset: 1,
                endLine: 2,
                endOffset: 1,
                insertString: `export var T: number;`
            });
            session.executeCommand(changeModuleFile1ShapeRequest1);
            session.executeCommand(changeFile1Consumer1ShapeRequest);
            sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer1Consumer1] }]);
        });

        it("should work fine for files with circular references", () => {
            const file1: ts.projectSystem.File = {
                path: "/a/b/file1.ts",
                content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
            };
            const file2: ts.projectSystem.File = {
                path: "/a/b/file2.ts",
                content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
            };
            const host = ts.projectSystem.createServerHost([file1, file2, configFile]);
            const typingsInstaller = createTestTypingsInstaller(host);
            const session = ts.projectSystem.createSession(host, { typingsInstaller });

            ts.projectSystem.openFilesForSession([file1, file2], session);
            const file1AffectedListRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: file1.path });
            sendAffectedFileRequestAndCheckResult(session, file1AffectedListRequest, [{ projectFileName: configFile.path, files: [file1, file2] }]);
        });

        it("should return results for all projects if not specifying projectFileName", () => {
            const file1: ts.projectSystem.File = { path: "/a/b/file1.ts", content: "export var t = 10;" };
            const file2: ts.projectSystem.File = { path: "/a/b/file2.ts", content: `import {t} from "./file1"; var t2 = 11;` };
            const file3: ts.projectSystem.File = { path: "/a/c/file2.ts", content: `import {t} from "../b/file1"; var t3 = 11;` };
            const configFile1: ts.projectSystem.File = { path: "/a/b/tsconfig.json", content: `{ "compileOnSave": true }` };
            const configFile2: ts.projectSystem.File = { path: "/a/c/tsconfig.json", content: `{ "compileOnSave": true }` };

            const host = ts.projectSystem.createServerHost([file1, file2, file3, configFile1, configFile2]);
            const session = ts.projectSystem.createSession(host);

            ts.projectSystem.openFilesForSession([file1, file2, file3], session);
            const file1AffectedListRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: file1.path });

            sendAffectedFileRequestAndCheckResult(session, file1AffectedListRequest, [
                { projectFileName: configFile1.path, files: [file1, file2] },
                { projectFileName: configFile2.path, files: [file1, file3] }
            ]);
        });

        it("should detect removed code file", () => {
            const referenceFile1: ts.projectSystem.File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
            };
            const host = ts.projectSystem.createServerHost([moduleFile1, referenceFile1, configFile]);
            const session = ts.projectSystem.createSession(host);

            ts.projectSystem.openFilesForSession([referenceFile1], session);
            host.deleteFile(moduleFile1.path);

            const request = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: referenceFile1.path });
            sendAffectedFileRequestAndCheckResult(session, request, [
                { projectFileName: configFile.path, files: [referenceFile1] }
            ]);
            const requestForMissingFile = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: moduleFile1.path });
            sendAffectedFileRequestAndCheckResult(session, requestForMissingFile, []);
        });

        it("should detect non-existing code file", () => {
            const referenceFile1: ts.projectSystem.File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
            };
            const host = ts.projectSystem.createServerHost([referenceFile1, configFile]);
            const session = ts.projectSystem.createSession(host);

            ts.projectSystem.openFilesForSession([referenceFile1], session);
            const request = ts.projectSystem.makeSessionRequest<ts.server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: referenceFile1.path });
            sendAffectedFileRequestAndCheckResult(session, request, [
                { projectFileName: configFile.path, files: [referenceFile1] }
            ]);
        });
    });

    describe("for changes in declaration files", () => {
        function testDTS(dtsFileContents: string, tsFileContents: string, opts: ts.CompilerOptions, expectDTSEmit: boolean) {
            const dtsFile = {
                path: "/a/runtime/a.d.ts",
                content: dtsFileContents
            };
            const f2 = {
                path: "/a/b.ts",
                content: tsFileContents
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: opts,
                    compileOnSave: true
                })
            };
            const host = ts.projectSystem.createServerHost([dtsFile, f2, config]);
            const session = ts.projectSystem.createSession(host);
            session.executeCommand({
                seq: 1,
                type: "request",
                command: "open",
                arguments: { file: dtsFile.path }
            } as ts.projectSystem.protocol.OpenRequest);
            const projectService = session.getProjectService();
            ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects.get(config.path)!;
            ts.projectSystem.checkProjectRootFiles(project, [dtsFile.path, f2.path]);
            session.executeCommand({
                seq: 2,
                type: "request",
                command: "open",
                arguments: { file: f2.path }
            } as ts.projectSystem.protocol.OpenRequest);
            ts.projectSystem.checkNumberOfProjects(session.getProjectService(), { configuredProjects: 1 });
            const { response } = session.executeCommand({
                seq: 3,
                type: "request",
                command: "compileOnSaveAffectedFileList",
                arguments: { file: dtsFile.path }
            } as ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest);
            if (expectDTSEmit) {
                assert.equal((response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[]).length, 1, "expected output from 1 project");
                assert.equal((response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[])[0].fileNames.length, 2, "expected to affect 2 files");
            }
            else {
                assert.equal((response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[]).length, 0, "expected no output");
            }


            const { response: response2 } = session.executeCommand({
                seq: 4,
                type: "request",
                command: "compileOnSaveAffectedFileList",
                arguments: { file: f2.path }
            } as ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest);
            assert.equal((response2 as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[]).length, 1, "expected output from 1 project");
        }

        it("should return empty array if change is made in a global declaration file", () => {
            testDTS(
                /*dtsFileContents*/ "declare const x: string;",
                /*tsFileContents*/ "var y = 1;",
                /*opts*/ {},
                /*expectDTSEmit*/ false
            );
        });

        it("should return empty array if change is made in a module declaration file", () => {
            testDTS(
                /*dtsFileContents*/ "export const x: string;",
                /*tsFileContents*/  "import { x } from './runtime/a;",
                /*opts*/ {},
                /*expectDTSEmit*/ false
            );
        });

        it("should return results if change is made in a global declaration file with declaration emit", () => {
            testDTS(
                /*dtsFileContents*/ "declare const x: string;",
                /*tsFileContents*/ "var y = 1;",
                /*opts*/ { declaration: true },
                /*expectDTSEmit*/ true
            );
        });

        it("should return results if change is made in a global declaration file with composite enabled", () => {
            testDTS(
                /*dtsFileContents*/ "declare const x: string;",
                /*tsFileContents*/ "var y = 1;",
                /*opts*/ { composite: true },
                /*expectDTSEmit*/ true
            );
        });

        it("should return results if change is made in a global declaration file with decorator emit enabled", () => {
            testDTS(
                /*dtsFileContents*/ "declare const x: string;",
                /*tsFileContents*/ "var y = 1;",
                /*opts*/ { experimentalDecorators: true, emitDecoratorMetadata: true },
                /*expectDTSEmit*/ true
            );
        });
    });

    describe("tsserverProjectSystem emit with outFile or out setting", () => {
        function test(subScenario: string, opts: ts.CompilerOptions) {
            it(subScenario, () => {
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
                const host = ts.projectSystem.createServerHost([f1, f2, config]);
                const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
                ts.projectSystem.openFilesForSession([f1], session);
                session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: f1.path }
                });
                ts.projectSystem.baselineTsserverLogs("compileOnSave", subScenario, session);
            });
        }
        test("compileOnSaveAffectedFileList projectUsesOutFile should not be returned if not set", {});
        test("compileOnSaveAffectedFileList projectUsesOutFile should be true if outFile is set", { outFile: "/a/out.js" });
        test("compileOnSaveAffectedFileList projectUsesOutFile should be true if out is set", { out: "/a/out.js" });
    });
});

describe("unittests:: tsserver:: compileOnSave:: EmitFile test", () => {
    it("should respect line endings", () => {
        test("\n");
        test("\r\n");

        function test(newLine: string) {
            const lines = ["var x = 1;", "var y = 2;"];
            const path = "/a/app";
            const f = {
                path: path + ts.Extension.Ts,
                content: lines.join(newLine)
            };
            const host = ts.projectSystem.createServerHost([f], { newLine });
            const session = ts.projectSystem.createSession(host);
            const openRequest: ts.server.protocol.OpenRequest = {
                seq: 1,
                type: "request",
                command: ts.server.protocol.CommandTypes.Open,
                arguments: { file: f.path }
            };
            session.executeCommand(openRequest);
            const emitFileRequest: ts.server.protocol.CompileOnSaveEmitFileRequest = {
                seq: 2,
                type: "request",
                command: ts.server.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: f.path }
            };
            session.executeCommand(emitFileRequest);
            const emitOutput = host.readFile(path + ts.Extension.Js);
            assert.equal(emitOutput, f.content + newLine, "content of emit output should be identical with the input + newline");
        }
    });

    it("should emit specified file", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export function Foo() { return 10; }`
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: `import {Foo} from "./f1"; let y = Foo();`
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: `{}`
        };
        const host = ts.projectSystem.createServerHost([file1, file2, configFile, ts.projectSystem.libFile], { newLine: "\r\n" });
        const typingsInstaller = createTestTypingsInstaller(host);
        const session = ts.projectSystem.createSession(host, { typingsInstaller });

        ts.projectSystem.openFilesForSession([file1, file2], session);
        const compileFileRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path, projectFileName: configFile.path });
        session.executeCommand(compileFileRequest);

        const expectedEmittedFileName = "/a/b/f1.js";
        assert.isTrue(host.fileExists(expectedEmittedFileName));
        assert.equal(host.readFile(expectedEmittedFileName), `"use strict";\r\nexports.__esModule = true;\r\nexports.Foo = void 0;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`);
    });

    it("shoud not emit js files in external projects", () => {
        const file1 = {
            path: "/a/b/file1.ts",
            content: "consonle.log('file1');"
        };
        // file2 has errors. The emitting should not be blocked.
        const file2 = {
            path: "/a/b/file2.js",
            content: "console.log'file2');"
        };
        const file3 = {
            path: "/a/b/file3.js",
            content: "console.log('file3');"
        };
        const externalProjectName = "/a/b/externalproject";
        const host = ts.projectSystem.createServerHost([file1, file2, file3, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();

        projectService.openExternalProject({
            rootFiles: ts.projectSystem.toExternalFiles([file1.path, file2.path]),
            options: {
                allowJs: true,
                outFile: "dist.js",
                compileOnSave: true
            },
            projectFileName: externalProjectName
        });

        const emitRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path });
        session.executeCommand(emitRequest);

        const expectedOutFileName = "/a/b/dist.js";
        assert.isTrue(host.fileExists(expectedOutFileName));
        const outFileContent = host.readFile(expectedOutFileName)!;
        assert.isTrue(outFileContent.indexOf(file1.content) !== -1);
        assert.isTrue(outFileContent.indexOf(file2.content) === -1);
        assert.isTrue(outFileContent.indexOf(file3.content) === -1);
    });

    it("should use project root as current directory so that compile on save results in correct file mapping", () => {
        const inputFileName = "Foo.ts";
        const file1 = {
            path: `/root/TypeScriptProject3/TypeScriptProject3/${inputFileName}`,
            content: "consonle.log('file1');"
        };
        const externalProjectName = "/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj";
        const host = ts.projectSystem.createServerHost([file1, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();

        const outFileName = "bar.js";
        projectService.openExternalProject({
            rootFiles: ts.projectSystem.toExternalFiles([file1.path]),
            options: {
                outFile: outFileName,
                sourceMap: true,
                compileOnSave: true
            },
            projectFileName: externalProjectName
        });

        const emitRequest = ts.projectSystem.makeSessionRequest<ts.server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path });
        session.executeCommand(emitRequest);

        // Verify js file
        const expectedOutFileName = "/root/TypeScriptProject3/TypeScriptProject3/" + outFileName;
        assert.isTrue(host.fileExists(expectedOutFileName));
        const outFileContent = host.readFile(expectedOutFileName)!;
        verifyContentHasString(outFileContent, file1.content);
        verifyContentHasString(outFileContent, `//# ${"sourceMappingURL"}=${outFileName}.map`); // Sometimes tools can sometimes see this line as a source mapping url comment, so we obfuscate it a little

        // Verify map file
        const expectedMapFileName = expectedOutFileName + ".map";
        assert.isTrue(host.fileExists(expectedMapFileName));
        const mapFileContent = host.readFile(expectedMapFileName)!;
        verifyContentHasString(mapFileContent, `"sources":["${inputFileName}"]`);

        function verifyContentHasString(content: string, str: string) {
            assert.isTrue(ts.stringContains(content, str), `Expected "${content}" to have "${str}"`);
        }
    });

    describe("compile on save emit with and without richResponse", () => {
        it("without rich Response", () => {
            verify(/*richRepsonse*/ undefined);
        });
        it("with rich Response set to false", () => {
            verify(/*richRepsonse*/ false);
        });
        it("with rich Repsonse", () => {
            verify(/*richRepsonse*/ true);
        });

        function verify(richResponse: boolean | undefined) {
            const config: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compileOnSave: true,
                    compilerOptions: {
                        outDir: "test",
                        noEmitOnError: true,
                        declaration: true,
                    },
                    exclude: ["node_modules"]
                })
            };
            const file1: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/file1.ts`,
                content: "const x = 1;"
            };
            const file2: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/file2.ts`,
                content: "const y = 2;"
            };
            const host = ts.projectSystem.createServerHost([file1, file2, config, ts.projectSystem.libFile]);
            const session = ts.projectSystem.createSession(host);
            ts.projectSystem.openFilesForSession([file1], session);

            const affectedFileResponse = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path }
            }).response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[];
            assert.deepEqual(affectedFileResponse, [
                { fileNames: [file1.path, file2.path], projectFileName: config.path, projectUsesOutFile: false }
            ]);
            const file1SaveResponse = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveEmitFileRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: file1.path, richResponse }
            }).response;
            if (richResponse) {
                assert.deepEqual(file1SaveResponse, { emitSkipped: false, diagnostics: ts.emptyArray });
            }
            else {
                assert.isTrue(file1SaveResponse);
            }
            assert.strictEqual(host.readFile(`${ts.tscWatch.projectRoot}/test/file1.d.ts`), "declare const x = 1;\n");
            const file2SaveResponse = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveEmitFileRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: { file: file2.path, richResponse }
            }).response;
            if (richResponse) {
                assert.deepEqual(file2SaveResponse, {
                    emitSkipped: true,
                    diagnostics: [{
                        start: undefined,
                        end: undefined,
                        fileName: undefined,
                        text: ts.formatStringFromArgs(ts.Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file.message, [`${ts.tscWatch.projectRoot}/test/file1.d.ts`]),
                        code: ts.Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file.code,
                        category: ts.diagnosticCategoryName(ts.Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file),
                        reportsUnnecessary: undefined,
                        reportsDeprecated: undefined,
                        relatedInformation: undefined,
                        source: undefined
                    }]
                });
            }
            else {
                assert.isFalse(file2SaveResponse);
            }
            assert.isFalse(host.fileExists(`${ts.tscWatch.projectRoot}/test/file2.d.ts`));
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
        function verifyGlobalSave(declaration: boolean,hasModule: boolean) {
            const config: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compileOnSave: true,
                    compilerOptions: {
                        declaration,
                        module: hasModule ? undefined : "none"
                    },
                })
            };
            const file1: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/file1.ts`,
                content: `const x = 1;
function foo() {
    return "hello";
}`
            };
            const file2: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/file2.ts`,
                content: `const y = 2;
function bar() {
    return "world";
}`
            };
            const file3: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/file3.ts`,
                content: "const xy = 3;"
            };
            const module: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/module.ts`,
                content: "export const xyz = 4;"
            };
            const files = [file1, file2, file3, ...(hasModule ? [module] : ts.emptyArray)];
            const host = ts.projectSystem.createServerHost([...files, config, ts.projectSystem.libFile]);
            const session = ts.projectSystem.createSession(host);
            ts.projectSystem.openFilesForSession([file1, file2], session);

            const affectedFileResponse = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: { file: file1.path }
            }).response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[];
            assert.deepEqual(affectedFileResponse, [
                { fileNames: files.map(f => f.path), projectFileName: config.path, projectUsesOutFile: false }
            ]);
            verifyFileSave(file1);
            verifyFileSave(file2);
            verifyFileSave(file3);
            if (hasModule) {
                verifyFileSave(module);
            }

            // Change file1 get affected file list
            verifyLocalEdit(file1, "hello", "world");

            // Change file2 get affected file list = will return only file2 if --declaration otherwise all files
            verifyLocalEdit(file2, "world", "hello", /*returnsAllFilesAsAffected*/ !declaration);

            function verifyFileSave(file: ts.projectSystem.File) {
                const response = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveEmitFileRequest>({
                    command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveEmitFile,
                    arguments: { file: file.path }
                }).response;
                assert.isTrue(response);
                assert.strictEqual(
                    host.readFile(ts.changeExtension(file.path, ".js")),
                    file === module ?
                        `"use strict";\nexports.__esModule = true;\nexports.xyz = void 0;\nexports.xyz = 4;\n` :
                        `${file.content.replace("const", "var")}\n`
                );
                if (declaration) {
                    assert.strictEqual(
                        host.readFile(ts.changeExtension(file.path, ".d.ts")),
                        (file.content.substr(0, file.content.indexOf(" {") === -1 ? file.content.length : file.content.indexOf(" {"))
                            .replace("const ", "declare const ")
                            .replace("function ", "declare function ")
                            .replace(")", "): string;")) + "\n"
                    );
                }
            }

            function verifyLocalEdit(file: ts.projectSystem.File, oldText: string, newText: string, returnsAllFilesAsAffected?: boolean) {
                // Change file1 get affected file list
                session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
                    command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: file.path,
                            textChanges: [{
                                newText,
                                ...ts.projectSystem.protocolTextSpanFromSubstring(file.content, oldText)
                            }]
                        }]
                    }
                });
                const affectedFileResponse = session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest>({
                    command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: { file: file.path }
                }).response as ts.projectSystem.protocol.CompileOnSaveAffectedFileListSingleProject[];
                assert.deepEqual(affectedFileResponse, [
                    { fileNames: [file.path, ...(returnsAllFilesAsAffected ? files.filter(f => f !== file).map(f => f.path) : ts.emptyArray)], projectFileName: config.path, projectUsesOutFile: false }
                ]);
                file.content = file.content.replace(oldText, newText);
                verifyFileSave(file);
            }
        }
    });
});

describe("unittests:: tsserver:: compileOnSave:: CompileOnSaveAffectedFileListRequest with and without projectFileName in request", () => {
    function insertString(session: ts.projectSystem.TestSession, file: ts.projectSystem.File) {
        session.executeCommandSeq<ts.projectSystem.protocol.ChangeRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Change,
            arguments: {
                file: file.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: "let k = 1"
            }
        });
    }

    function logDirtyOfProjects(session: ts.projectSystem.TestSession) {
        session.logger.logs.push(`Project1 is dirty: ${session.getProjectService().configuredProjects.get(`${ts.tscWatch.projectRoot}/app1/tsconfig.json`)!.dirty}`);
        session.logger.logs.push(`Project2 is dirty: ${session.getProjectService().configuredProjects.get(`${ts.tscWatch.projectRoot}/app2/tsconfig.json`)!.dirty}`);
    }

    function verify(subScenario: string, commandArgs: ts.projectSystem.protocol.FileRequestArgs) {
        it(subScenario, () => {
            const core: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/core/core.ts`,
                content: "let z = 10;"
            };
            const app1: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/app1/app.ts`,
                content: "let x = 10;"
            };
            const app2: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/app2/app.ts`,
                content: "let y = 10;"
            };
            const app1Config: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/app1/tsconfig.json`,
                content: JSON.stringify({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true
                })
            };
            const app2Config: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/app2/tsconfig.json`,
                content: JSON.stringify({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true
                })
            };
            const files = [ts.projectSystem.libFile, core, app1, app2, app1Config, app2Config];
            const host = ts.projectSystem.createServerHost(files);
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            ts.projectSystem.openFilesForSession([app1, app2, core], session);
            insertString(session, app1);
            insertString(session, app2);
            logDirtyOfProjects(session);
            session.executeCommandSeq<ts.projectSystem.protocol.CompileOnSaveAffectedFileListRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompileOnSaveAffectedFileList,
                arguments: commandArgs
            });
            logDirtyOfProjects(session);
            ts.projectSystem.baselineTsserverLogs("compileOnSave", subScenario, session);
        });
    }
    verify("CompileOnSaveAffectedFileListRequest when projectFile is specified", {
        file: `${ts.tscWatch.projectRoot}/core/core.ts`,
        projectFileName: `${ts.tscWatch.projectRoot}/app1/tsconfig.json`
    });
    verify("CompileOnSaveAffectedFileListRequest when projectFile is not specified", {
        file: `${ts.tscWatch.projectRoot}/core/core.ts`,
    });
});

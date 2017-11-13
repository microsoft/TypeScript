/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />
/// <reference path="../mocks.ts" />

namespace ts.projectSystem {
    import CommandNames = server.CommandNames;
    const nullCancellationToken = server.nullCancellationToken;

    function createTestTypingsInstaller(host: server.ServerHost) {
        return new TestTypingsInstaller("/a/data/", /*throttleLimit*/5, host);
    }

    describe("CompileOnSave affected list", () => {
        function sendAffectedFileRequestAndCheckResult(session: server.Session, request: server.protocol.Request, expectedFileList: { projectFileName: string, files: FileOrFolder[] }[]) {
            const response = session.executeCommand(request).response as server.protocol.CompileOnSaveAffectedFileListSingleProject[];
            const actualResult = response.sort((list1, list2) => ts.compareStringsCaseSensitive(list1.projectFileName, list2.projectFileName));
            expectedFileList = expectedFileList.sort((list1, list2) => ts.compareStringsCaseSensitive(list1.projectFileName, list2.projectFileName));

            assert.equal(actualResult.length, expectedFileList.length, `Actual result project number is different from the expected project number`);

            for (let i = 0; i < actualResult.length; i++) {
                const actualResultSingleProject = actualResult[i];
                const expectedResultSingleProject = expectedFileList[i];
                assert.equal(actualResultSingleProject.projectFileName, expectedResultSingleProject.projectFileName, `Actual result contains different projects than the expected result`);

                const actualResultSingleProjectFileNameList = actualResultSingleProject.fileNames.sort();
                const expectedResultSingleProjectFileNameList = map(expectedResultSingleProject.files, f => f.path).sort();
                assert.isTrue(
                    arrayIsEqualTo(actualResultSingleProjectFileNameList, expectedResultSingleProjectFileNameList),
                    `For project ${actualResultSingleProject.projectFileName}, the actual result is ${actualResultSingleProjectFileNameList}, while expected ${expectedResultSingleProjectFileNameList}`);
            }
        }

        function createSession(host: server.ServerHost, typingsInstaller?: server.ITypingsInstaller): server.Session {
            const opts: server.SessionOptions = {
                host,
                cancellationToken: nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: typingsInstaller || server.nullTypingsInstaller,
                byteLength: Utils.byteLength,
                hrtime: process.hrtime,
                logger: nullLogger,
                canUseEvents: false
            };
            return new server.Session(opts);
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
            // A compile on save affected file request using file1
            let moduleFile1FileListRequest: server.protocol.Request;

            let sharedFs: vfs.VirtualFileSystem;
            before(() => {
                const fs = new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true);
                fs.addFile("/a/b/moduleFile1.ts", `export function Foo() { };`);
                fs.addFile("/a/b/file1Consumer1.ts", `import {Foo} from "./moduleFile1"; export var y = 10;`);
                fs.addFile("/a/b/file1Consumer2.ts", `import {Foo} from "./moduleFile1"; let z = 10;`);
                fs.addFile("/a/b/globalFile3.ts", `interface GlobalFoo { age: number }`);
                fs.addFile("/a/b/moduleFile2.ts", `export var Foo4 = 10;`);
                fs.addFile("/a/b/tsconfig.json", `{ compileOnSave": true }`);
                fs.addFile(libFile.path, libFile.content);
                fs.makeReadOnly();
                sharedFs = fs;
            });

            after(() => {
                sharedFs = undefined;
            });

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
                changeModuleFile1ShapeRequest1 = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                // Change the content of file1 to `export var T: number;export function Foo() { };`
                changeModuleFile1InternalRequest1 = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                    file: moduleFile1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T1: number;`
                });

                moduleFile1FileListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: moduleFile1.path, projectFileName: configFile.path });
            });

            it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

                // Change the content of file1 to `export var T: number;export function Foo() { console.log('hi'); };`
                const changeFile1InternalRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

                // Change file2 content to `let y = Foo();`
                const removeFile1Consumer1ImportRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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
                const addFile2ImportRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                    file: file1Consumer1.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `import {Foo} from "./moduleFile1";`
                });
                session.executeCommand(addFile2ImportRequest);

                // Change the content of file1 to `export var T2: string;export var T: number;export function Foo() { };`
                const changeModuleFile1ShapeRequest2 = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

                host.vfs.writeFile(file1Consumer1.path, `let y = 10;`);
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer2] }]);
            });

            it("should be up-to-date with deleted files", () => {
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

                session.executeCommand(changeModuleFile1ShapeRequest1);

                host.vfs.removeFile(file1Consumer2.path);

                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);
            });

            it("should be up-to-date with newly created files", () => {
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2] }]);

                const file1Consumer3: FileOrFolder = {
                    path: "/a/b/file1Consumer3.ts",
                    content: `import {Foo} from "./moduleFile1"; let y = Foo();`
                };
                host.vfs.writeFile(file1Consumer3.path, file1Consumer3.content);
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

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(moduleFile1.path, moduleFile1.content);
                host.vfs.addFile(file1Consumer1.path, file1Consumer1.content);
                host.vfs.addFile(configFile.path, configFile.content);
                host.vfs.addFile(libFile.path, libFile.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1, file1Consumer1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);

                // change file1 shape now, and verify both files are affected
                session.executeCommand(changeModuleFile1ShapeRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1] }]);

                // change file1 internal, and verify only file1 is affected
                session.executeCommand(changeModuleFile1InternalRequest1);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1] }]);
            });

            it("should return all files if a global file changed shape", () => {
                const host = new mocks.MockServerHost(sharedFs.shadow());
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([globalFile3], session);
                const changeGlobalFile3ShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
                    file: globalFile3.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T2: string;`
                });

                // check after file1 shape changes
                session.executeCommand(changeGlobalFile3ShapeRequest);
                const globalFile3FileListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: globalFile3.path });
                sendAffectedFileRequestAndCheckResult(session, globalFile3FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2] }]);
            });

            it("should return empty array if CompileOnSave is not enabled", () => {
                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{}`
                };

                const host = new mocks.MockServerHost(sharedFs.shadow());
                host.vfs.writeFile(configFile.path, configFile.content);
                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);
                openFilesForSession([moduleFile1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, []);
            });

            it("should save when compileOnSave is enabled in base tsconfig.json", () => {
                configFile = {
                    path: "/a/b/tsconfig.json",
                    content: `{
                        "extends": "/a/tsconfig.json"
                    }`
                };

                const configFile2: FileOrFolder = {
                    path: "/a/tsconfig.json",
                    content: `{
                        "compileOnSave": true
                    }`
                };

                const host = new mocks.MockServerHost(sharedFs.shadow());
                host.vfs.writeFile(configFile.path, configFile.content);
                host.vfs.addFile(configFile2.path, configFile2.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1, file1Consumer1], session);
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

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(moduleFile1.path, moduleFile1.content);
                host.vfs.addFile(file1Consumer1.path, file1Consumer1.content);
                host.vfs.addFile(configFile.path, configFile.content);
                host.vfs.addFile(libFile.path, libFile.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);
                openFilesForSession([moduleFile1], session);

                const file1ChangeShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(moduleFile1.path, moduleFile1.content);
                host.vfs.addFile(file1Consumer1.path, file1Consumer1.content);
                host.vfs.addFile(configFile.path, configFile.content);
                host.vfs.addFile(libFile.path, libFile.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);
                openFilesForSession([moduleFile1], session);

                const file1ChangeShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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
                const file1Consumer1Consumer1: FileOrFolder = {
                    path: "/a/b/file1Consumer1Consumer1.ts",
                    content: `import {y} from "./file1Consumer1";`
                };

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(moduleFile1.path, moduleFile1.content);
                host.vfs.addFile(file1Consumer1.path, file1Consumer1.content);
                host.vfs.addFile(file1Consumer1Consumer1.path, file1Consumer1Consumer1.content);
                host.vfs.addFile(globalFile3.path, globalFile3.content);
                host.vfs.addFile(configFile.path, configFile.content);
                host.vfs.addFile(libFile.path, libFile.content);
                host.vfs.addFile(file1Consumer1Consumer1.path, file1Consumer1Consumer1.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([moduleFile1, file1Consumer1], session);
                sendAffectedFileRequestAndCheckResult(session, moduleFile1FileListRequest, [{ projectFileName: configFile.path, files: [moduleFile1, file1Consumer1, file1Consumer1Consumer1] }]);

                const changeFile1Consumer1ShapeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(CommandNames.Change, {
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
                const file1: FileOrFolder = {
                    path: "/a/b/file1.ts",
                    content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
                };
                const file2: FileOrFolder = {
                    path: "/a/b/file2.ts",
                    content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
                };

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(file1.path, file1.content);
                host.vfs.addFile(file2.path, file2.content);
                host.vfs.addFile(configFile.path, configFile.content);

                const typingsInstaller = createTestTypingsInstaller(host);
                const session = createSession(host, typingsInstaller);

                openFilesForSession([file1, file2], session);
                const file1AffectedListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: file1.path });
                sendAffectedFileRequestAndCheckResult(session, file1AffectedListRequest, [{ projectFileName: configFile.path, files: [file1, file2] }]);
            });

            it("should return results for all projects if not specifying projectFileName", () => {
                const file1: FileOrFolder = { path: "/a/b/file1.ts", content: "export var t = 10;" };
                const file2: FileOrFolder = { path: "/a/b/file2.ts", content: `import {t} from "./file1"; var t2 = 11;` };
                const file3: FileOrFolder = { path: "/a/c/file2.ts", content: `import {t} from "../b/file1"; var t3 = 11;` };
                const configFile1: FileOrFolder = { path: "/a/b/tsconfig.json", content: `{ "compileOnSave": true }` };
                const configFile2: FileOrFolder = { path: "/a/c/tsconfig.json", content: `{ "compileOnSave": true }` };

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(file1.path, file1.content);
                host.vfs.addFile(file2.path, file2.content);
                host.vfs.addFile(file3.path, file3.content);
                host.vfs.addFile(configFile1.path, configFile1.content);
                host.vfs.addFile(configFile2.path, configFile2.content);

                const session = createSession(host);

                openFilesForSession([file1, file2, file3], session);
                const file1AffectedListRequest = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: file1.path });

                sendAffectedFileRequestAndCheckResult(session, file1AffectedListRequest, [
                    { projectFileName: configFile1.path, files: [file1, file2] },
                    { projectFileName: configFile2.path, files: [file1, file3] }
                ]);
            });

            it("should detect removed code file", () => {
                const referenceFile1: FileOrFolder = {
                    path: "/a/b/referenceFile1.ts",
                    content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
                };

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(moduleFile1.path, moduleFile1.content);
                host.vfs.addFile(referenceFile1.path, referenceFile1.content);
                host.vfs.addFile(configFile.path, configFile.content);

                const session = createSession(host);

                openFilesForSession([referenceFile1], session);

                host.vfs.removeFile(moduleFile1.path);

                const request = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: referenceFile1.path });
                sendAffectedFileRequestAndCheckResult(session, request, [
                    { projectFileName: configFile.path, files: [referenceFile1] }
                ]);

                const requestForMissingFile = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: moduleFile1.path });
                sendAffectedFileRequestAndCheckResult(session, requestForMissingFile, []);
            });

            it("should detect non-existing code file", () => {
                const referenceFile1: FileOrFolder = {
                    path: "/a/b/referenceFile1.ts",
                    content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
                };

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
                host.vfs.addFile(referenceFile1.path, referenceFile1.content);
                host.vfs.addFile(configFile.path, configFile.content);

                const session = createSession(host);

                openFilesForSession([referenceFile1], session);

                const request = makeSessionRequest<server.protocol.FileRequestArgs>(CommandNames.CompileOnSaveAffectedFileList, { file: referenceFile1.path });
                sendAffectedFileRequestAndCheckResult(session, request, [
                    { projectFileName: configFile.path, files: [referenceFile1] }
                ]);
            });
        });
    });

    describe("EmitFile test", () => {
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

                const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true), /*executingFilePath*/ undefined, newLine);
                host.vfs.addFile(f.path, f.content);

                const session = createSession(host);
                const openRequest: server.protocol.OpenRequest = {
                    seq: 1,
                    type: "request",
                    command: server.protocol.CommandTypes.Open,
                    arguments: { file: f.path }
                };
                session.executeCommand(openRequest);
                const emitFileRequest: server.protocol.CompileOnSaveEmitFileRequest = {
                    seq: 2,
                    type: "request",
                    command: server.protocol.CommandTypes.CompileOnSaveEmitFile,
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

            const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true), /*executingFilePath*/ undefined, "\r\n");
            host.vfs.addFile(file1.path, file1.content);
            host.vfs.addFile(file2.path, file2.content);
            host.vfs.addFile(configFile.path, configFile.content);
            host.vfs.addFile(libFile.path, libFile.content);

            const typingsInstaller = createTestTypingsInstaller(host);
            const session = createSession(host, { typingsInstaller });

            openFilesForSession([file1, file2], session);
            const compileFileRequest = makeSessionRequest<server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path, projectFileName: configFile.path });
            session.executeCommand(compileFileRequest);

            const expectedEmittedFileName = "/a/b/f1.js";
            assert.isTrue(host.fileExists(expectedEmittedFileName));
            assert.equal(host.readFile(expectedEmittedFileName), `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`);
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

            const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
            host.vfs.addFile(file1.path, file1.content);
            host.vfs.addFile(file2.path, file2.content);
            host.vfs.addFile(file3.path, file3.content);
            host.vfs.addFile(libFile.path, libFile.content);

            const session = createSession(host);
            const projectService = session.getProjectService();

            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path, file2.path]),
                options: {
                    allowJs: true,
                    outFile: "dist.js",
                    compileOnSave: true
                },
                projectFileName: externalProjectName
            });

            const emitRequest = makeSessionRequest<server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path });
            session.executeCommand(emitRequest);

            const expectedOutFileName = "/a/b/dist.js";
            assert.isTrue(host.fileExists(expectedOutFileName));
            const outFileContent = host.readFile(expectedOutFileName);
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

            const host = new mocks.MockServerHost(new vfs.VirtualFileSystem("/", /*useCaseSensitiveFileNames*/ true));
            host.vfs.addFile(file1.path, file1.content);
            host.vfs.addFile(libFile.path, libFile.content);

            const session = createSession(host);
            const projectService = session.getProjectService();

            const outFileName = "bar.js";
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path]),
                options: {
                    outFile: outFileName,
                    sourceMap: true,
                    compileOnSave: true
                },
                projectFileName: externalProjectName
            });

            const emitRequest = makeSessionRequest<server.protocol.CompileOnSaveEmitFileRequestArgs>(CommandNames.CompileOnSaveEmitFile, { file: file1.path });
            session.executeCommand(emitRequest);

            // Verify js file
            const expectedOutFileName = "/root/TypeScriptProject3/TypeScriptProject3/" + outFileName;
            assert.isTrue(host.fileExists(expectedOutFileName));
            const outFileContent = host.readFile(expectedOutFileName);
            verifyContentHasString(outFileContent, file1.content);
            verifyContentHasString(outFileContent, `//# ${"sourceMappingURL"}=${outFileName}.map`); // Sometimes tools can sometimes see this line as a source mapping url comment, so we obfuscate it a little

            // Verify map file
            const expectedMapFileName = expectedOutFileName + ".map";
            assert.isTrue(host.fileExists(expectedMapFileName));
            const mapFileContent = host.readFile(expectedMapFileName);
            verifyContentHasString(mapFileContent, `"sources":["${inputFileName}"]`);

            function verifyContentHasString(content: string, str: string) {
                assert.isTrue(stringContains(content, str), `Expected "${content}" to have "${str}"`);
            }
        });
    });
}

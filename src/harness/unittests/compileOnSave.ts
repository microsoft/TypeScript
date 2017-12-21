/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />
/// <reference path="../vfs.ts" />
/// <reference path="../fakes.ts" />

namespace ts.projectSystem {
    const nullCancellationToken = server.nullCancellationToken;

    function createTestTypingsInstaller(host: server.ServerHost) {
        return new TestTypingsInstaller("/a/data/", /*throttleLimit*/5, host);
    }

    describe("CompileOnSave affected list", () => {
        interface ProjectFileList {
            projectFileName: string;
            files: string[];
        }

        function sendAffectedFileRequestAndCheckResult(session: server.Session, args: server.protocol.FileRequestArgs, expectedFileList: ProjectFileList | ProjectFileList[]) {
            checkAffectedFiles(sendCompileOnSaveAffectedFileListRequest(session, args), expectedFileList);
        }

        function checkAffectedFiles(actualFileList: server.protocol.CompileOnSaveAffectedFileListSingleProject[], expectedFileList: ProjectFileList | ProjectFileList[]) {
            actualFileList = sort(actualFileList, compareFileLists);
            expectedFileList = Array.isArray(expectedFileList) ? sort(expectedFileList, compareFileLists) : [expectedFileList];

            assert.equal(actualFileList.length, expectedFileList.length, `Actual result project number is different from the expected project number`);

            for (let i = 0; i < actualFileList.length; i++) {
                const actualResultSingleProject = actualFileList[i];
                const expectedResultSingleProject = expectedFileList[i];
                assert.equal(actualResultSingleProject.projectFileName, expectedResultSingleProject.projectFileName, `Actual result contains different projects than the expected result`);

                const actualResultSingleProjectFileNameList = sort(actualResultSingleProject.fileNames, compareStringsCaseSensitive);
                const expectedFiles = expectedResultSingleProject.files;
                const expectedResultSingleProjectFileNameList = sort(expectedFiles, compareStringsCaseSensitive);
                assert.isTrue(
                    arrayIsEqualTo(actualResultSingleProjectFileNameList, expectedResultSingleProjectFileNameList),
                    `For project ${actualResultSingleProject.projectFileName}, the actual result is ${actualResultSingleProjectFileNameList}, while expected ${expectedResultSingleProjectFileNameList}`);
            }
        }

        function compareFileLists<T extends { projectFileName: string }>(a: T, b: T) {
            return ts.compareStringsCaseSensitive(a.projectFileName, b.projectFileName);
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
            it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                // Change the content of file1 to `export var T: number;export function Foo() { console.log('hi'); };`
                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 46,
                    endLine: 1,
                    endOffset: 46,
                    insertString: `console.log('hi');`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1] });
            });

            it("should be up-to-date with the reference map changes", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    ["/a/b/globalFile3.ts"]: `interface GlobalFoo { age: number }`,
                    ["/a/b/moduleFile2.ts"]: `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1, file1Consumer1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                // Change file2 content to `let y = Foo();`
                sendChangeRequest(session, {
                    file: file1Consumer1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 28,
                    insertString: ""
                });

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer2] });

                // Add the import statements back to file2
                sendChangeRequest(session, {
                    file: file1Consumer1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `import {Foo} from "./moduleFile1";`
                });

                // Change the content of file1 to `export var T2: string;export var T: number;export function Foo() { };`
                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T2: string;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });
            });

            it("should be up-to-date with changes made in non-open files", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                // Send an initial compileOnSave request
                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                host.vfs.writeFileSync(file1Consumer1, `let y = 10;`);

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer2] });
            });

            it("should be up-to-date with deleted files", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                host.vfs.unlinkSync(file1Consumer2);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1] });
            });

            it("should be up-to-date with newly created files", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const file1Consumer3 = "/a/b/file1Consumer3.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });

                host.vfs.writeFileSync(file1Consumer3, `import {Foo} from "./moduleFile1"; let y = Foo();`);

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2, file1Consumer3] });
            });

            it("should detect changes in non-root files", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ "compileOnSave": true, "files": ["${file1Consumer1}"] }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; let y = Foo();`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1, file1Consumer1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1] });

                // change file1 shape now, and verify both files are affected
                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1] });

                // change file1 internal, and verify only file1 is affected
                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T1: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1] });
            });

            it("should return all files if a global file changed shape", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const globalFile3 = "/a/b/globalFile3.ts";
                const moduleFile2 = "/a/b/moduleFile2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    [globalFile3]: `interface GlobalFoo { age: number }`,
                    [moduleFile2]: `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([globalFile3], session);

                // check after file1 shape changes
                sendChangeRequest(session, {
                    file: globalFile3,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `var T2: string;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { file: globalFile3 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2] });
            });

            it("should return empty array if CompileOnSave is not enabled", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{}`,
                    [moduleFile1]: `export function Foo() { };`,
                    "/a/b/file1Consumer1.ts": `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    "/a/b/file1Consumer2.ts": `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    []);
            });

            it("should return empty array if noEmit is set", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ "compileOnSave": true, "compilerOptions": { "noEmit": true } }`,
                    [moduleFile1]: `export function Foo() { };`,
                    "/a/b/file1Consumer1.ts": `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    "/a/b/file1Consumer2.ts": `import {Foo} from "./moduleFile1"; let z = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    []);
            });

            it("should save when compileOnSave is enabled in base tsconfig.json", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer2 = "/a/b/file1Consumer2.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ "extends": "/a/tsconfig.json" }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer2]: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                    "/a/b/moduleFile2.ts": `export var Foo4 = 10;`,
                    "/a/tsconfig.json": `{ "compileOnSave": true }`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1, file1Consumer1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer2] });
            });

            it("should always return the file itself if '--isolatedModules' is specified", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ "compileOnSave": true, "compilerOptions": { "isolatedModules": true } }`,
                    [moduleFile1]: `export function Foo() { };`,
                    "/a/b/file1Consumer1.ts": `import {Foo} from "./moduleFile1"; export var y = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1] });
            });

            it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ "compileOnSave": true, "compilerOptions": { "module": "system", "outFile": "/a/b/out.js" } }`,
                    [moduleFile1]: `export function Foo() { };`,
                    "/a/b/file1Consumer1.ts": `import {Foo} from "./moduleFile1"; export var y = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1], session);

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 27,
                    endLine: 1,
                    endOffset: 27,
                    insertString: `Point,`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1] });
            });

            it("should return cascaded affected file list", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const file1Consumer1 = "/a/b/file1Consumer1.ts";
                const file1Consumer1Consumer1 = "/a/b/file1Consumer1Consumer1.ts";
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [file1Consumer1]: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    [file1Consumer1Consumer1]: `import {y} from "./file1Consumer1";`,
                    "/a/b/globalFile3.ts": `interface GlobalFoo { age: number }`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([moduleFile1, file1Consumer1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer1Consumer1] });

                sendChangeRequest(session, {
                    file: moduleFile1,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendChangeRequest(session, {
                    file: file1Consumer1,
                    line: 2,
                    offset: 1,
                    endLine: 2,
                    endOffset: 1,
                    insertString: `export var T: number;`
                });

                sendAffectedFileRequestAndCheckResult(session,
                    { projectFileName: configFile, file: moduleFile1 },
                    { projectFileName: configFile, files: [moduleFile1, file1Consumer1, file1Consumer1Consumer1] });
            });

            it("should work fine for files with circular references", () => {
                const configFile = "/a/b/tsconfig.json";
                const file1 = "/a/b/file1.ts";
                const file2 = "/a/b/file2.ts";
                const host = new fakes.FakeServerHost();
                host.vfs.apply({
                    [configFile]: `{ compileOnSave": true }`,
                    [file1]: `/// <reference path="./file2.ts" />\nexport var t1 = 10;`,
                    [file2]: `/// <reference path="./file1.ts" />\nexport var t2 = 10;`,
                });
                const session = createSession(host, createTestTypingsInstaller(host));

                openFilesForSession([file1, file2], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { file: file1 },
                    { projectFileName: configFile, files: [file1, file2] });
            });

            it("should return results for all projects if not specifying projectFileName", () => {
                const file1 = "/a/b/file1.ts";
                const file2 = "/a/b/file2.ts";
                const file3 = "/a/c/file2.ts";
                const configFile1 = "/a/b/tsconfig.json";
                const configFile2 = "/a/c/tsconfig.json";
                const host = new fakes.FakeServerHost();
                host.vfs.apply({
                    [file1]: `export var t = 10;`,
                    [file2]: `import {t} from "./file1"; var t2 = 11;`,
                    [file3]: `import {t} from "../b/file1"; var t3 = 11;`,
                    [configFile1]: `{ "compileOnSave": true }`,
                    [configFile2]: `{ "compileOnSave": true }`,
                });
                const session = createSession(host);

                openFilesForSession([file1, file2, file3], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { file: file1 },
                    [
                        { projectFileName: configFile1, files: [file1, file2] },
                        { projectFileName: configFile2, files: [file1, file3] }
                    ]);
            });

            it("should detect removed code file", () => {
                const configFile = "/a/b/tsconfig.json";
                const moduleFile1 = "/a/b/moduleFile1.ts";
                const referenceFile1 = "/a/b/referenceFile1.ts";
                const host = new fakes.FakeServerHost();
                host.vfs.apply({
                    [configFile]: `{ compileOnSave": true }`,
                    [moduleFile1]: `export function Foo() { };`,
                    [referenceFile1]: `/// <reference path="./moduleFile1.ts" />\nexport var x = Foo();`,
                });
                const session = createSession(host);

                openFilesForSession([referenceFile1], session);

                host.vfs.unlinkSync(moduleFile1);

                sendAffectedFileRequestAndCheckResult(session,
                    { file: referenceFile1 },
                    { projectFileName: configFile, files: [referenceFile1] });

                sendAffectedFileRequestAndCheckResult(session,
                    { file: moduleFile1 },
                    []);
            });

            it("should detect non-existing code file", () => {
                const configFile = "/a/b/tsconfig.json";
                const referenceFile1 = "/a/b/referenceFile1.ts";
                const host = new fakes.FakeServerHost();
                host.vfs.apply({
                    [configFile]: `{ compileOnSave": true }`,
                    [referenceFile1]: `/// <reference path="./moduleFile2.ts" />\nexport var x = Foo();`,
                });
                const session = createSession(host);

                openFilesForSession([referenceFile1], session);

                sendAffectedFileRequestAndCheckResult(session,
                    { file: referenceFile1 },
                    { projectFileName: configFile, files: [referenceFile1] });
            });
        });
    });

    describe("EmitFile test", () => {
        it("should respect line endings", () => {
            test("\n");
            test("\r\n");

            function test(newLine: "\r\n" | "\n") {
                const f = "/a/app.ts";
                const content = `var x = 1;${newLine}var y = 2;`;
                const host = new fakes.FakeServerHost({ newLine }, /*files*/ {
                    [f]: content
                });
                const session = createSession(host);

                sendOpenRequest(session, { file: f }, 1);
                sendCompileOnSaveEmitFileRequest(session, { file: f }, 2);

                const emitOutput = host.readFile("/a/app.js");
                assert.equal(emitOutput, content + newLine, "content of emit output should be identical with the input + newline");
            }
        });

        it("should emit specified file", () => {
            const file1 = "/a/b/f1.ts";
            const file2 = "/a/b/f2.ts";
            const configFile = "/a/b/tsconfig.json";
            const host = new fakes.FakeServerHost({ lib: true, newLine: "\r\n" });
            host.vfs.apply({
                [file1]: `export function Foo() { return 10; }`,
                [file2]: `import {Foo} from "./f1"; let y = Foo();`,
                [configFile]: `{}`,
            });

            const typingsInstaller = createTestTypingsInstaller(host);
            const session = createSession(host, { typingsInstaller });

            openFilesForSession([file1, file2], session);

            sendCompileOnSaveEmitFileRequest(session, { file: file1, projectFileName: configFile });

            const expectedEmittedFileName = "/a/b/f1.js";
            assert.isTrue(host.fileExists(expectedEmittedFileName));
            assert.equal(host.readFile(expectedEmittedFileName), `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`);
        });

        it("shoud not emit js files in external projects", () => {
            const externalProjectName = "/a/b/externalproject";
            const file1 = "/a/b/file1.ts";
            const file2 = "/a/b/file2.js";
            const file3 = "/a/b/file3.js";
            const file1Content = `consonle.log('file1');`;
            const file2Content = `console.log'file2');`;
            const file3Content = `console.log('file3');`;
            const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                [file1]: file1Content,
                // file2 has errors. The emit should not be blocked.
                [file2]: file2Content,
                [file3]: file3Content,
            });

            const session = createSession(host);
            const projectService = session.getProjectService();

            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1, file2]),
                options: {
                    allowJs: true,
                    outFile: "dist.js",
                    compileOnSave: true
                },
                projectFileName: externalProjectName
            });

            sendCompileOnSaveEmitFileRequest(session, { file: file1 });

            const expectedOutFileName = "/a/b/dist.js";
            assert.isTrue(host.fileExists(expectedOutFileName));
            const outFileContent = host.readFile(expectedOutFileName);
            assert.isTrue(outFileContent.indexOf(file1Content) !== -1);
            assert.isTrue(outFileContent.indexOf(file2Content) === -1);
            assert.isTrue(outFileContent.indexOf(file3Content) === -1);
        });

        it("should use project root as current directory so that compile on save results in correct file mapping", () => {
            const externalProjectName = "/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj";
            const file1 = "/root/TypeScriptProject3/TypeScriptProject3/Foo.ts";
            const file1Content = `consonle.log('file1');`;
            const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                [file1]: file1Content,
            });

            const session = createSession(host);
            const projectService = session.getProjectService();

            const outFileName = "bar.js";
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1]),
                options: {
                    outFile: outFileName,
                    sourceMap: true,
                    compileOnSave: true
                },
                projectFileName: externalProjectName
            });

            sendCompileOnSaveEmitFileRequest(session, { file: file1 });

            // Verify js file
            const expectedOutFileName = "/root/TypeScriptProject3/TypeScriptProject3/" + outFileName;
            assert.isTrue(host.fileExists(expectedOutFileName));
            const outFileContent = host.readFile(expectedOutFileName);
            verifyContentHasString(outFileContent, file1Content);
            verifyContentHasString(outFileContent, `//# ${"sourceMappingURL"}=${outFileName}.map`); // Sometimes tools can sometimes see this line as a source mapping url comment, so we obfuscate it a little

            // Verify map file
            const expectedMapFileName = expectedOutFileName + ".map";
            assert.isTrue(host.fileExists(expectedMapFileName));
            const mapFileContent = host.readFile(expectedMapFileName);
            verifyContentHasString(mapFileContent, `"sources":["Foo.ts"]`);

            function verifyContentHasString(content: string, str: string) {
                assert.isTrue(stringContains(content, str), `Expected "${content}" to have "${str}"`);
            }
        });
    });
}

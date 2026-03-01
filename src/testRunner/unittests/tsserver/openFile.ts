import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openExternalProjectForSession,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    TestSession,
    toExternalFile,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: openfile::", () => {
    it("can be reloaded with empty content", () => {
        const f = {
            path: "/home/src/projects/project/a/b/app.ts",
            content: "let x = 1",
        };
        const projectFileName = "externalProject";
        const host = TestServerHost.createServerHost([f]);
        const session = new TestSession(host);
        // create a project
        openExternalProjectForSession({
            projectFileName,
            rootFiles: [toExternalFile(f.path)],
            options: {},
        }, session);

        // open project and replace its content with empty string
        openFilesForSession([{ file: f, content: "" }], session);
        baselineTsserverLogs("openfile", "realoaded with empty content", session);
    });

    function verifyOpenFileWorks(subScenario: string, useCaseSensitiveFileNames: boolean) {
        it(subScenario, () => {
            const file1: File = {
                path: "/home/src/projects/project/a/b/src/app.ts",
                content: "let x = 10;",
            };
            const file2: File = {
                path: "/home/src/projects/project/a/B/lib/module2.ts",
                content: "let z = 10;",
            };
            const configFile: File = {
                path: "/home/src/projects/project/a/b/tsconfig.json",
                content: "",
            };
            const configFile2: File = {
                path: "/home/src/projects/project/a/tsconfig.json",
                content: "",
            };
            const host = TestServerHost.createServerHost([file1, file2, configFile, configFile2], {
                useCaseSensitiveFileNames,
            });
            const session = new TestSession(host);

            // Open file1 -> configFile
            verifyConfigFileName(file1, "/home/src/projects/project/a");
            verifyConfigFileName(file1, "/home/src/projects/project/a/b");
            verifyConfigFileName(file1, "/home/src/projects/project/a/B");

            // Open file2 use root "/home/src/projects/project/a/b"
            verifyConfigFileName(file2, "/home/src/projects/project/a");
            verifyConfigFileName(file2, "/home/src/projects/project/a/b");
            verifyConfigFileName(file2, "/home/src/projects/project/a/B");

            baselineTsserverLogs("openfile", subScenario, session);
            function verifyConfigFileName(file: File, projectRootPath: string) {
                openFilesForSession([{ file, projectRootPath }], session);
                closeFilesForSession([file], session);
            }
        });
    }
    verifyOpenFileWorks("project root is used with case-sensitive system", /*useCaseSensitiveFileNames*/ true);
    verifyOpenFileWorks("project root is used with case-insensitive system", /*useCaseSensitiveFileNames*/ false);

    it("uses existing project even if project refresh is pending", () => {
        const projectRootPath = "/user/someuser/projects/myproject";
        const aFile: File = {
            path: `${projectRootPath}/src/a.ts`,
            content: "export const x = 0;",
        };
        const configFile: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: "{}",
        };
        const files = [aFile, configFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([{ file: aFile, projectRootPath }], session);

        const bFile: File = {
            path: `${projectRootPath}/src/b.ts`,
            content: `export {}; declare module "./a" {  export const y: number; }`,
        };
        host.writeFile(bFile.path, bFile.content);
        openFilesForSession([{ file: bFile, projectRootPath }], session);
        baselineTsserverLogs("openfile", "uses existing project even if project refresh is pending", session);
    });

    it("can open same file again", () => {
        const projectRootPath = "/user/someuser/projects/myproject";
        const aFile: File = {
            path: `${projectRootPath}/src/a.ts`,
            content: "export const x = 0;",
        };
        const configFile: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: "{}",
        };
        const files = [aFile, configFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([{ file: aFile, content: aFile.content, projectRootPath }], session);
        openFilesForSession([{ file: aFile, content: `${aFile.content}export const y = 10;`, projectRootPath }], session);
        baselineTsserverLogs("openfile", "can open same file again", session);
    });

    it("when file makes edits to add/remove comment directives, they are handled correcrly", () => {
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: `const x = 10;
function foo() {
    // @ts-ignore
    let y: string = x;
    return y;
}
function bar() {
    // @ts-ignore
    let z : string = x;
    return z;
}
foo();
bar();`,
        };
        const host = TestServerHost.createServerHost([file]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        verifyGetErrRequest({ session, files: [file] });

        // Remove first ts-ignore and check only first error is reported
        const tsIgnoreComment = `// @ts-ignore`;
        const locationOfTsIgnore = protocolTextSpanFromSubstring(file.content, tsIgnoreComment);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: file.path,
                    textChanges: [{
                        newText: "             ",
                        ...locationOfTsIgnore,
                    }],
                }],
            },
        });
        verifyGetErrRequest({ session, files: [file] });
        // Revert the change and no errors should be reported
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: file.path,
                    textChanges: [{
                        newText: tsIgnoreComment,
                        ...locationOfTsIgnore,
                    }],
                }],
            },
        });
        verifyGetErrRequest({ session, files: [file] });
        baselineTsserverLogs("openfile", "when file makes edits to add/remove comment directives, they are handled correcrly", session);
    });

    describe("opening file and refreshing program", () => {
        function createHostAndSession() {
            const host = TestServerHost.createServerHost({
                "/home/src/projects/project/a.ts": "export const a = 10;",
                "/home/src/projects/project/b.ts": "export const b = 10;",
                "/home/src/projects/project/tsconfig.json": "{}",
            });
            const session = new TestSession(host);
            return { host, session };
        }

        function applyEdit(fileName: string, session: TestSession) {
            session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
                command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    changedFiles: [{
                        fileName,
                        changes: [{
                            span: { start: 0, length: 0 },
                            newText: "export const y = 10;",
                        }],
                    }],
                },
            });
        }

        it("file opening does not refresh sourceFile", () => {
            const { host, session } = createHostAndSession();
            openFilesForSession(["/home/src/projects/project/a.ts"], session);
            openFilesForSession(["/home/src/projects/project/b.ts"], session);
            applyEdit("/home/src/projects/project/a.ts", session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            closeFilesForSession(["/home/src/projects/project/b.ts"], session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            host.appendFile("/home/src/projects/project/b.ts", "export const x = 10;");
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("openfile", "does not refresh sourceFile", session);
        });

        it("file opening with different content refreshes sourceFile", () => {
            const { host, session } = createHostAndSession();
            openFilesForSession(["/home/src/projects/project/a.ts"], session);
            openFilesForSession([{ file: "/home/src/projects/project/b.ts", content: "export const newB = 10;" }], session);
            applyEdit("/home/src/projects/project/a.ts", session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            closeFilesForSession(["/home/src/projects/project/b.ts"], session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            host.appendFile("/home/src/projects/project/b.ts", "export const x = 10;");
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("openfile", "different content refreshes sourceFile", session);
        });

        it("edits on file and then close refreshes sourceFile", () => {
            const { host, session } = createHostAndSession();
            openFilesForSession(["/home/src/projects/project/a.ts"], session);
            openFilesForSession(["/home/src/projects/project/b.ts"], session);
            applyEdit("/home/src/projects/project/a.ts", session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            applyEdit("/home/src/projects/project/b.ts", session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            closeFilesForSession(["/home/src/projects/project/b.ts"], session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            host.appendFile("/home/src/projects/project/b.ts", "export const x = 10;");
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("openfile", "edits on file and then close refreshes sourceFile", session);
        });

        it("edits on file and then close does not refresh sourceFile if contents match", () => {
            const { host, session } = createHostAndSession();
            openFilesForSession(["/home/src/projects/project/a.ts"], session);
            openFilesForSession(["/home/src/projects/project/b.ts"], session);
            applyEdit("/home/src/projects/project/a.ts", session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            applyEdit("/home/src/projects/project/b.ts", session);
            host.prependFile("/home/src/projects/project/b.ts", "export const y = 10;");
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            closeFilesForSession(["/home/src/projects/project/b.ts"], session);
            session.getProjectService().configuredProjects.get("/home/src/projects/project/tsconfig.json")!.updateGraph();
            host.appendFile("/home/src/projects/project/b.ts", "export const x = 10;");
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("openfile", "edits on file and then close does not refresh sourceFile if contents match", session);
        });
    });
});

import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    toExternalFile,
    verifyGetErrRequest,
} from "./helpers";

describe("unittests:: tsserver:: Open-file", () => {
    it("can be reloaded with empty content", () => {
        const f = {
            path: "/a/b/app.ts",
            content: "let x = 1"
        };
        const projectFileName = "externalProject";
        const host = createServerHost([f]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        // create a project
        projectService.openExternalProject({ projectFileName, rootFiles: [toExternalFile(f.path)], options: {} });

        const p = projectService.externalProjects[0];
        // force to load the content of the file
        p.updateGraph();

        const scriptInfo = p.getScriptInfo(f.path)!;
        projectService.logger.log(`Snapshot size: ${scriptInfo.getSnapshot().getLength()}`);

        // open project and replace its content with empty string
        projectService.openClientFile(f.path, "");
        projectService.logger.log(`Snapshot size: ${scriptInfo.getSnapshot().getLength()}`);
        baselineTsserverLogs("openfile", "realoaded with empty content", projectService);
    });

    function verifyOpenFileWorks(subScenario: string, useCaseSensitiveFileNames: boolean) {
        it(subScenario, () => {
            const file1: File = {
                path: "/a/b/src/app.ts",
                content: "let x = 10;"
            };
            const file2: File = {
                path: "/a/B/lib/module2.ts",
                content: "let z = 10;"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: ""
            };
            const configFile2: File = {
                path: "/a/tsconfig.json",
                content: ""
            };
            const host = createServerHost([file1, file2, configFile, configFile2], {
                useCaseSensitiveFileNames
            });
            const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

            // Open file1 -> configFile
            verifyConfigFileName(file1, "/a");
            verifyConfigFileName(file1, "/a/b");
            verifyConfigFileName(file1, "/a/B");

            // Open file2 use root "/a/b"
            verifyConfigFileName(file2, "/a");
            verifyConfigFileName(file2, "/a/b");
            verifyConfigFileName(file2, "/a/B");

            baselineTsserverLogs("openfile", subScenario, service);
            function verifyConfigFileName(file: File, projectRoot: string) {
                const { configFileName } = service.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRoot);
                service.logger.log(`file: ${file.path} configFile: ${configFileName}`);
                service.closeClientFile(file.path);
            }
        });
    }
    verifyOpenFileWorks("project root is used with case-sensitive system", /*useCaseSensitiveFileNames*/ true);
    verifyOpenFileWorks("project root is used with case-insensitive system", /*useCaseSensitiveFileNames*/ false);

    it("uses existing project even if project refresh is pending", () => {
        const projectFolder = "/user/someuser/projects/myproject";
        const aFile: File = {
            path: `${projectFolder}/src/a.ts`,
            content: "export const x = 0;"
        };
        const configFile: File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}"
        };
        const files = [aFile, configFile, libFile];
        const host = createServerHost(files);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(aFile.path, /*fileContent*/ undefined, ts.ScriptKind.TS, projectFolder);

        const bFile: File = {
            path: `${projectFolder}/src/b.ts`,
            content: `export {}; declare module "./a" {  export const y: number; }`
        };
        host.writeFile(bFile.path, bFile.content);
        service.openClientFile(bFile.path, /*fileContent*/ undefined, ts.ScriptKind.TS, projectFolder);
        baselineTsserverLogs("openfile", "uses existing project even if project refresh is pending", service);
    });

    it("can open same file again", () => {
        const projectFolder = "/user/someuser/projects/myproject";
        const aFile: File = {
            path: `${projectFolder}/src/a.ts`,
            content: "export const x = 0;"
        };
        const configFile: File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}"
        };
        const files = [aFile, configFile, libFile];
        const host = createServerHost(files);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        verifyProject(aFile.content);
        verifyProject(`${aFile.content}export const y = 10;`);
        baselineTsserverLogs("openfile", "can open same file again", service);

        function verifyProject(aFileContent: string) {
            service.openClientFile(aFile.path, aFileContent, ts.ScriptKind.TS, projectFolder);
            service.logger.log(`aFileContent: ${service.configuredProjects.get(configFile.path)!.getCurrentProgram()?.getSourceFile(aFile.path)!.text}`);
        }
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
bar();`
        };
        const host = createServerHost([file, libFile]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file], session);
        verifyGetErrRequest({ session, host, files: [file] });

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
                        ...locationOfTsIgnore
                    }]
                }]
            }
        });
        verifyGetErrRequest({ session, host, files: [file] });
        // Revert the change and no errors should be reported
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: file.path,
                    textChanges: [{
                        newText: tsIgnoreComment,
                        ...locationOfTsIgnore
                    }]
                }]
            }
        });
        verifyGetErrRequest({ session, host, files: [file] });
        baselineTsserverLogs("openfile", "when file makes edits to add/remove comment directives, they are handled correcrly", session);
    });
});

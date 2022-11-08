import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: Open-file", () => {
    it("can be reloaded with empty content", () => {
        const f = {
            path: "/a/b/app.ts",
            content: "let x = 1"
        };
        const projectFileName = "externalProject";
        const host = ts.projectSystem.createServerHost([f]);
        const projectService = ts.projectSystem.createProjectService(host);
        // create a project
        projectService.openExternalProject({ projectFileName, rootFiles: [ts.projectSystem.toExternalFile(f.path)], options: {} });
        projectService.checkNumberOfProjects({ externalProjects: 1 });

        const p = projectService.externalProjects[0];
        // force to load the content of the file
        p.updateGraph();

        const scriptInfo = p.getScriptInfo(f.path)!;
        checkSnapLength(scriptInfo.getSnapshot(), f.content.length);

        // open project and replace its content with empty string
        projectService.openClientFile(f.path, "");
        checkSnapLength(scriptInfo.getSnapshot(), 0);
    });
    function checkSnapLength(snap: ts.IScriptSnapshot, expectedLength: number) {
        assert.equal(snap.getLength(), expectedLength, "Incorrect snapshot size");
    }

    function verifyOpenFileWorks(useCaseSensitiveFileNames: boolean) {
        const file1: ts.projectSystem.File = {
            path: "/a/b/src/app.ts",
            content: "let x = 10;"
        };
        const file2: ts.projectSystem.File = {
            path: "/a/B/lib/module2.ts",
            content: "let z = 10;"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: ""
        };
        const configFile2: ts.projectSystem.File = {
            path: "/a/tsconfig.json",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([file1, file2, configFile, configFile2], {
            useCaseSensitiveFileNames
        });
        const service = ts.projectSystem.createProjectService(host);

        // Open file1 -> configFile
        verifyConfigFileName(file1, "/a", configFile);
        verifyConfigFileName(file1, "/a/b", configFile);
        verifyConfigFileName(file1, "/a/B", configFile);

        // Open file2 use root "/a/b"
        verifyConfigFileName(file2, "/a", useCaseSensitiveFileNames ? configFile2 : configFile);
        verifyConfigFileName(file2, "/a/b", useCaseSensitiveFileNames ? configFile2 : configFile);
        verifyConfigFileName(file2, "/a/B", useCaseSensitiveFileNames ? undefined : configFile);

        function verifyConfigFileName(file: ts.projectSystem.File, projectRoot: string, expectedConfigFile: ts.projectSystem.File | undefined) {
            const { configFileName } = service.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRoot);
            assert.equal(configFileName, expectedConfigFile && expectedConfigFile.path);
            service.closeClientFile(file.path);
        }
    }
    it("works when project root is used with case-sensitive system", () => {
        verifyOpenFileWorks(/*useCaseSensitiveFileNames*/ true);
    });

    it("works when project root is used with case-insensitive system", () => {
        verifyOpenFileWorks(/*useCaseSensitiveFileNames*/ false);
    });

    it("uses existing project even if project refresh is pending", () => {
        const projectFolder = "/user/someuser/projects/myproject";
        const aFile: ts.projectSystem.File = {
            path: `${projectFolder}/src/a.ts`,
            content: "export const x = 0;"
        };
        const configFile: ts.projectSystem.File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}"
        };
        const files = [aFile, configFile, ts.projectSystem.libFile];
        const host = ts.projectSystem.createServerHost(files);
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(aFile.path, /*fileContent*/ undefined, ts.ScriptKind.TS, projectFolder);
        verifyProject();

        const bFile: ts.projectSystem.File = {
            path: `${projectFolder}/src/b.ts`,
            content: `export {}; declare module "./a" {  export const y: number; }`
        };
        files.push(bFile);
        host.writeFile(bFile.path, bFile.content);
        service.openClientFile(bFile.path, /*fileContent*/ undefined, ts.ScriptKind.TS, projectFolder);
        verifyProject();

        function verifyProject() {
            assert.isDefined(service.configuredProjects.get(configFile.path));
            const project = service.configuredProjects.get(configFile.path)!;
            ts.projectSystem.checkProjectActualFiles(project, files.map(f => f.path));
        }
    });

    it("can open same file again", () => {
        const projectFolder = "/user/someuser/projects/myproject";
        const aFile: ts.projectSystem.File = {
            path: `${projectFolder}/src/a.ts`,
            content: "export const x = 0;"
        };
        const configFile: ts.projectSystem.File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}"
        };
        const files = [aFile, configFile, ts.projectSystem.libFile];
        const host = ts.projectSystem.createServerHost(files);
        const service = ts.projectSystem.createProjectService(host);
        verifyProject(aFile.content);
        verifyProject(`${aFile.content}export const y = 10;`);

        function verifyProject(aFileContent: string) {
            service.openClientFile(aFile.path, aFileContent, ts.ScriptKind.TS, projectFolder);
            const project = service.configuredProjects.get(configFile.path)!;
            ts.projectSystem.checkProjectActualFiles(project, files.map(f => f.path));
            assert.equal(project.getCurrentProgram()?.getSourceFile(aFile.path)!.text, aFileContent);
        }
    });

    it("when file makes edits to add/remove comment directives, they are handled correcrly", () => {
        const file: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/file.ts`,
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
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [file] });

        // Remove first ts-ignore and check only first error is reported
        const tsIgnoreComment = `// @ts-ignore`;
        const locationOfTsIgnore = ts.projectSystem.protocolTextSpanFromSubstring(file.content, tsIgnoreComment);
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
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
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [file] });
        // Revert the change and no errors should be reported
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
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
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [file] });
        ts.projectSystem.baselineTsserverLogs("openfile", "when file makes edits to add/remove comment directives, they are handled correcrly", session);
    });
});

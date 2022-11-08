import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: Project Errors", () => {
    function checkProjectErrors(projectFiles: ts.server.ProjectFilesWithTSDiagnostics, expectedErrors: readonly string[]): void {
        assert.isTrue(projectFiles !== undefined, "missing project files");
        checkProjectErrorsWorker(projectFiles.projectErrors, expectedErrors);
    }

    function checkProjectErrorsWorker(errors: readonly ts.Diagnostic[], expectedErrors: readonly string[]): void {
        assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
        if (expectedErrors.length) {
            for (let i = 0; i < errors.length; i++) {
                const actualMessage = ts.flattenDiagnosticMessageText(errors[i].messageText, "\n");
                const expectedMessage = expectedErrors[i];
                assert.isTrue(actualMessage.indexOf(expectedMessage) === 0, `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
            }
        }
    }

    function checkDiagnosticsWithLinePos(errors: ts.server.protocol.DiagnosticWithLinePosition[], expectedErrors: string[]) {
        assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
        if (expectedErrors.length) {
            ts.zipWith(errors, expectedErrors, ({ message: actualMessage }, expectedMessage) => {
                assert.isTrue(ts.startsWith(actualMessage, actualMessage), `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
            });
        }
    }

    it("external project - diagnostics for missing files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const file2 = {
            path: "/a/b/applib.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([file1, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();
        const projectFileName = "/a/b/test.csproj";
        const compilerOptionsRequest: ts.server.protocol.CompilerOptionsDiagnosticsRequest = {
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 2,
            arguments: { projectFileName }
        };

        {
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: ts.projectSystem.toExternalFiles([file1.path, file2.path])
            });

            ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags = session.executeCommand(compilerOptionsRequest).response as ts.server.protocol.DiagnosticWithLinePosition[];
            // only file1 exists - expect error
            checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);
        }
        host.renameFile(file1.path, file2.path);
        {
            // only file2 exists - expect error
            ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags = session.executeCommand(compilerOptionsRequest).response as ts.server.protocol.DiagnosticWithLinePosition[];
            checkDiagnosticsWithLinePos(diags, ["File '/a/b/app.ts' not found."]);
        }

        host.writeFile(file1.path, file1.content);
        {
            // both files exist - expect no errors
            ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags = session.executeCommand(compilerOptionsRequest).response as ts.server.protocol.DiagnosticWithLinePosition[];
            checkDiagnosticsWithLinePos(diags, []);
        }
    });

    it("configured projects - diagnostics for missing files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const file2 = {
            path: "/a/b/applib.ts",
            content: ""
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) })
        };
        const host = ts.projectSystem.createServerHost([file1, config, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        const project = ts.projectSystem.configuredProjectAt(projectService, 0);
        const compilerOptionsRequest: ts.server.protocol.CompilerOptionsDiagnosticsRequest = {
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 2,
            arguments: { projectFileName: project.getProjectName() }
        };
        let diags = session.executeCommand(compilerOptionsRequest).response as ts.server.protocol.DiagnosticWithLinePosition[];
        checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);

        host.writeFile(file2.path, file2.content);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        diags = session.executeCommand(compilerOptionsRequest).response as ts.server.protocol.DiagnosticWithLinePosition[];
        checkDiagnosticsWithLinePos(diags, []);
    });

    it("configured projects - diagnostics for corrupted config 1", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const file2 = {
            path: "/a/b/lib.ts",
            content: ""
        };
        const correctConfig = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) })
        };
        const corruptedConfig = {
            path: correctConfig.path,
            content: correctConfig.content.substr(1)
        };
        const host = ts.projectSystem.createServerHost([file1, file2, corruptedConfig]);
        const projectService = ts.projectSystem.createProjectService(host);

        projectService.openClientFile(file1.path);
        {
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const configuredProject = ts.find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
            assert.isTrue(configuredProject !== undefined, "should find configured project");
            checkProjectErrors(configuredProject, []);
            const projectErrors = ts.projectSystem.configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors, [
                "'{' expected."
            ]);
            assert.isNotNull(projectErrors[0].file);
            assert.equal(projectErrors[0].file!.fileName, corruptedConfig.path);
        }
        // fix config and trigger watcher
        host.writeFile(correctConfig.path, correctConfig.content);
        {
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const configuredProject = ts.find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
            assert.isTrue(configuredProject !== undefined, "should find configured project");
            checkProjectErrors(configuredProject, []);
            const projectErrors = ts.projectSystem.configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors, []);
        }
    });

    it("configured projects - diagnostics for corrupted config 2", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const file2 = {
            path: "/a/b/lib.ts",
            content: ""
        };
        const correctConfig = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) })
        };
        const corruptedConfig = {
            path: correctConfig.path,
            content: correctConfig.content.substr(1)
        };
        const host = ts.projectSystem.createServerHost([file1, file2, correctConfig]);
        const projectService = ts.projectSystem.createProjectService(host);

        projectService.openClientFile(file1.path);
        {
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const configuredProject = ts.find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
            assert.isTrue(configuredProject !== undefined, "should find configured project");
            checkProjectErrors(configuredProject, []);
            const projectErrors = ts.projectSystem.configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors, []);
        }
        // break config and trigger watcher
        host.writeFile(corruptedConfig.path, corruptedConfig.content);
        {
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const configuredProject = ts.find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
            assert.isTrue(configuredProject !== undefined, "should find configured project");
            checkProjectErrors(configuredProject, []);
            const projectErrors = ts.projectSystem.configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors, [
                "'{' expected."
            ]);
            assert.isNotNull(projectErrors[0].file);
            assert.equal(projectErrors[0].file!.fileName, corruptedConfig.path);
        }
    });
});

describe("unittests:: tsserver:: Project Errors are reported as appropriate", () => {
    it("document is not contained in project", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const corruptedConfig = {
            path: "/a/b/tsconfig.json",
            content: "{"
        };
        const host = ts.projectSystem.createServerHost([file1, corruptedConfig]);
        const projectService = ts.projectSystem.createProjectService(host);

        projectService.openClientFile(file1.path);
        projectService.checkNumberOfProjects({ configuredProjects: 1 });

        const project = projectService.findProject(corruptedConfig.path)!;
        ts.projectSystem.checkProjectRootFiles(project, [file1.path]);
    });

    describe("when opening new file that doesnt exist on disk yet", () => {
        function verifyNonExistentFile(useProjectRoot: boolean) {
            const folderPath = "/user/someuser/projects/someFolder";
            const fileInRoot: ts.projectSystem.File = {
                path: `/src/somefile.d.ts`,
                content: "class c { }"
            };
            const fileInProjectRoot: ts.projectSystem.File = {
                path: `${folderPath}/src/somefile.d.ts`,
                content: "class c { }"
            };
            const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, fileInRoot, fileInProjectRoot]);
            const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host), useInferredProjectPerProjectRoot: true });

            const untitledFile = "untitled:Untitled-1";
            const refPathNotFound1 = "../../../../../../typings/@epic/Core.d.ts";
            const refPathNotFound2 = "./src/somefile.d.ts";
            const fileContent = `/// <reference path="${refPathNotFound1}" />
/// <reference path="${refPathNotFound2}" />`;
            session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
                command: ts.server.CommandNames.Open,
                arguments: {
                    file: untitledFile,
                    fileContent,
                    scriptKindName: "TS",
                    projectRootPath: useProjectRoot ? folderPath : undefined
                }
            });
            ts.projectSystem.appendAllScriptInfos(session.getProjectService(), session.logger.logs);

            // Since this is not js project so no typings are queued
            host.checkTimeoutQueueLength(0);
            ts.projectSystem.verifyGetErrRequest({ session, host, files: [untitledFile] });
            ts.projectSystem.baselineTsserverLogs("projectErrors", `when opening new file that doesnt exist on disk yet ${useProjectRoot ? "with projectRoot" : "without projectRoot"}`, session);
        }

        it("has projectRoot", () => {
            verifyNonExistentFile(/*useProjectRoot*/ true);
        });

        it("does not have projectRoot", () => {
            verifyNonExistentFile(/*useProjectRoot*/ false);
        });
    });

    it("folder rename updates project structure and reports no errors", () => {
        const projectDir = "/a/b/projects/myproject";
        const app: ts.projectSystem.File = {
            path: `${projectDir}/bar/app.ts`,
            content: "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
        };
        const foo: ts.projectSystem.File = {
            path: `${projectDir}/foo/foo.ts`,
            content: "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"
        };
        const configFile: ts.projectSystem.File = {
            path: `${projectDir}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { module: "none", targer: "es5" }, exclude: ["node_modules"] })
        };
        const host = ts.projectSystem.createServerHost([app, foo, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });

        session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
            command: ts.server.CommandNames.Open,
            arguments: { file: app.path, }
        });
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [app] });

        host.renameFolder(`${projectDir}/foo`, `${projectDir}/foo2`);
        host.runQueuedTimeoutCallbacks();
        host.runQueuedTimeoutCallbacks();
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [app] });
        ts.projectSystem.baselineTsserverLogs("projectErrors", `folder rename updates project structure and reports no errors`, session);
    });

    it("Getting errors before opening file", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/project/file.ts",
            content: "let x: number = false;"
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        session.executeCommandSeq<ts.projectSystem.protocol.GeterrRequest>({
            command: ts.server.CommandNames.Geterr,
            arguments: {
                delay: 0,
                files: [file.path]
            }
        });

        host.checkTimeoutQueueLengthAndRun(1);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "getting errors before opening file", session);
    });

    it("Reports errors correctly when file referenced by inferred project root, is opened right after closing the root file", () => {
        const app: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/src/client/app.js`,
            content: ""
        };
        const serverUtilities: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/src/server/utilities.js`,
            content: `function getHostName() { return "hello"; } export { getHostName };`
        };
        const backendTest: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/test/backend/index.js`,
            content: `import { getHostName } from '../../src/server/utilities';export default getHostName;`
        };
        const files = [ts.projectSystem.libFile, app, serverUtilities, backendTest];
        const host = ts.projectSystem.createServerHost(files);
        const session = ts.projectSystem.createSession(host, { useInferredProjectPerProjectRoot: true, canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([{ file: app, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.openFilesForSession([{ file: backendTest, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [backendTest.path, app.path] });
        ts.projectSystem.closeFilesForSession([backendTest], session);
        ts.projectSystem.openFilesForSession([{ file: serverUtilities.path, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [serverUtilities.path, app.path] });
        ts.projectSystem.baselineTsserverLogs("projectErrors", `reports errors correctly when file referenced by inferred project root, is opened right after closing the root file`, session);
    });

    it("Correct errors when resolution resolves to file that has same ambient module and is also module", () => {
        const projectRootPath = "/users/username/projects/myproject";
        const aFile: ts.projectSystem.File = {
            path: `${projectRootPath}/src/a.ts`,
            content: `import * as myModule from "@custom/plugin";
function foo() {
  // hello
}`
        };
        const config: ts.projectSystem.File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: JSON.stringify({ include: ["src"] })
        };
        const plugin: ts.projectSystem.File = {
            path: `${projectRootPath}/node_modules/@custom/plugin/index.d.ts`,
            content: `import './proposed';
declare module '@custom/plugin' {
    export const version: string;
}`
        };
        const pluginProposed: ts.projectSystem.File = {
            path: `${projectRootPath}/node_modules/@custom/plugin/proposed.d.ts`,
            content: `declare module '@custom/plugin' {
    export const bar = 10;
}`
        };
        const files = [ts.projectSystem.libFile, aFile, config, plugin, pluginProposed];
        const host = ts.projectSystem.createServerHost(files);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([aFile], session);

        checkErrors();

        session.executeCommandSeq<ts.projectSystem.protocol.ChangeRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Change,
            arguments: {
                file: aFile.path,
                line: 3,
                offset: 8,
                endLine: 3,
                endOffset: 8,
                insertString: "o"
            }
        });
        checkErrors();
        ts.projectSystem.baselineTsserverLogs("projectErrors", `correct errors when resolution resolves to file that has same ambient module and is also module`, session);

        function checkErrors() {
            host.checkTimeoutQueueLength(0);
            ts.projectSystem.verifyGetErrRequest({ session, host, files: [aFile] });
        }
    });

    describe("when semantic error returns includes global error", () => {
        const file: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/ui.ts`,
            content: `const x = async (_action: string) => {
};`
        };
        const config: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        ts.projectSystem.verifyGetErrScenario({
            scenario: "projectErrors",
            subScenario: "when semantic error returns includes global error",
            allFiles: () => [ts.projectSystem.libFile, file, config],
            openFiles: () => [file],
            getErrRequest: () => [file],
            getErrForProjectRequest: () => [{ project: file, files: [file] }],
            syncDiagnostics: () => [{ file, project: config }],
        });
    });
});

describe("unittests:: tsserver:: Project Errors for Configure file diagnostics events", () => {
    it("are generated when the config file has errors", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file has errors", session);
    });

    it("are generated when the config file doesn't have errors", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {}
                }`
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file doesnt have errors", session);
    });

    it("are generated when the config file changes", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {}
                }`
        };

        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);

        configFile.content = `{
                "compilerOptions": {
                    "haha": 123
                }
            }`;
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks();

        configFile.content = `{
                "compilerOptions": {}
            }`;
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks();
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file changes", session);
    });

    it("are not generated when the config file does not include file opened and config file has errors", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const file2: ts.projectSystem.File = {
            path: "/a/b/test.ts",
            content: "let x = 10"
        };
        const file3: ts.projectSystem.File = {
            path: "/a/b/test2.ts",
            content: "let xy = 10"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    },
                    "files": ["app.ts"]
                }`
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file2], session);
        ts.projectSystem.openFilesForSession([file], session);
        // We generate only if project is created when opening file from the project
        ts.projectSystem.openFilesForSession([file3], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file does not include file opened and config file has errors", session);
    });

    it("are not generated when the config file has errors but suppressDiagnosticEvents is true", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, suppressDiagnosticEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file has errors but suppressDiagnosticEvents is true", session);
    });

    it("are not generated when the config file does not include file opened and doesnt contain any errors", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const file2: ts.projectSystem.File = {
            path: "/a/b/test.ts",
            content: "let x = 10"
        };
        const file3: ts.projectSystem.File = {
            path: "/a/b/test2.ts",
            content: "let xy = 10"
        };
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "files": ["app.ts"]
                }`
        };

        const host = ts.projectSystem.createServerHost([file, file2, file3, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file2], session);
        ts.projectSystem.openFilesForSession([file], session);
        // We generate only if project is created when opening file from the project
        ts.projectSystem.openFilesForSession([file3], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file does not include file opened and doesnt contain any errors", session);
    });

    it("contains the project reference errors", () => {
        const file: ts.projectSystem.File = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const noSuchTsconfig = "no-such-tsconfig.json";
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "files": ["app.ts"],
                    "references": [{"path":"./${noSuchTsconfig}"}]
                }`
        };

        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([file], session);
        ts.projectSystem.baselineTsserverLogs("projectErrors", "configFileDiagnostic events contains the project reference errors", session);
    });
});

describe("unittests:: tsserver:: Project Errors dont include overwrite emit error", () => {
    it("for inferred project", () => {
        const f1 = {
            path: "/a/b/f1.js",
            content: "function test1() { }"
        };
        const host = ts.projectSystem.createServerHost([f1, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([f1], session);

        const projectService = session.getProjectService();
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const projectName = projectService.inferredProjects[0].getProjectName();

        const diags = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 2,
            arguments: { projectFileName: projectName }
        } as ts.server.protocol.CompilerOptionsDiagnosticsRequest).response as readonly ts.projectSystem.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diags.length === 0);

        session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsForInferredProjects,
            seq: 3,
            arguments: { options: { module: ts.ModuleKind.CommonJS } }
        } as ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest);
        const diagsAfterUpdate = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 4,
            arguments: { projectFileName: projectName }
        } as ts.server.protocol.CompilerOptionsDiagnosticsRequest).response as readonly ts.projectSystem.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diagsAfterUpdate.length === 0);
    });

    it("for external project", () => {
        const f1 = {
            path: "/a/b/f1.js",
            content: "function test1() { }"
        };
        const host = ts.projectSystem.createServerHost([f1, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();
        const projectFileName = "/a/b/project.csproj";
        const externalFiles = ts.projectSystem.toExternalFiles([f1.path]);
        projectService.openExternalProject({
            projectFileName,
            rootFiles: externalFiles,
            options: {}
        } as ts.projectSystem.protocol.ExternalProject);

        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });

        const diags = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 2,
            arguments: { projectFileName }
        } as ts.server.protocol.CompilerOptionsDiagnosticsRequest).response as readonly ts.server.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diags.length === 0);

        session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.OpenExternalProject,
            seq: 3,
            arguments: {
                projectFileName,
                rootFiles: externalFiles,
                options: { module: ts.ModuleKind.CommonJS }
            }
        } as ts.server.protocol.OpenExternalProjectRequest);
        const diagsAfterUpdate = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.CompilerOptionsDiagnosticsFull,
            seq: 4,
            arguments: { projectFileName }
        } as ts.server.protocol.CompilerOptionsDiagnosticsRequest).response as readonly ts.server.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diagsAfterUpdate.length === 0);
    });
});

describe("unittests:: tsserver:: Project Errors reports Options Diagnostic locations correctly with changes in configFile contents", () => {
    it("when options change", () => {
        const file = {
            path: "/a/b/app.ts",
            content: "let x = 10"
        };
        const configFileContentBeforeComment = `{`;
        const configFileContentComment = `
                // comment`;
        const configFileContentAfterComment = `
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }`;
        const configFileContentWithComment = configFileContentBeforeComment + configFileContentComment + configFileContentAfterComment;
        const configFileContentWithoutCommentLine = configFileContentBeforeComment + configFileContentAfterComment;

        const configFile = {
            path: "/a/b/tsconfig.json",
            content: configFileContentWithComment
        };
        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([file], session);

        const projectService = session.getProjectService();
        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        const projectName = ts.projectSystem.configuredProjectAt(projectService, 0).getProjectName();

        const diags = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.SemanticDiagnosticsSync,
            seq: 2,
            arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
        } as ts.server.protocol.SemanticDiagnosticsSyncRequest).response as readonly ts.server.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diags.length === 3);

        configFile.content = configFileContentWithoutCommentLine;
        host.writeFile(configFile.path, configFile.content);

        const diagsAfterEdit = session.executeCommand({
            type: "request",
            command: ts.server.CommandNames.SemanticDiagnosticsSync,
            seq: 2,
            arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
        } as ts.server.protocol.SemanticDiagnosticsSyncRequest).response as readonly ts.server.protocol.DiagnosticWithLinePosition[];
        assert.isTrue(diagsAfterEdit.length === 3);

        verifyDiagnostic(diags[0], diagsAfterEdit[0]);
        verifyDiagnostic(diags[1], diagsAfterEdit[1]);
        verifyDiagnostic(diags[2], diagsAfterEdit[2]);

        function verifyDiagnostic(beforeEditDiag: ts.server.protocol.DiagnosticWithLinePosition, afterEditDiag: ts.server.protocol.DiagnosticWithLinePosition) {
            assert.equal(beforeEditDiag.message, afterEditDiag.message);
            assert.equal(beforeEditDiag.code, afterEditDiag.code);
            assert.equal(beforeEditDiag.category, afterEditDiag.category);
            assert.equal(beforeEditDiag.startLocation.line, afterEditDiag.startLocation.line + 1);
            assert.equal(beforeEditDiag.startLocation.offset, afterEditDiag.startLocation.offset);
            assert.equal(beforeEditDiag.endLocation.line, afterEditDiag.endLocation.line + 1);
            assert.equal(beforeEditDiag.endLocation.offset, afterEditDiag.endLocation.offset);
        }
    });
});

describe("unittests:: tsserver:: Project Errors with config file change", () => {
    it("Updates diagnostics when '--noUnusedLabels' changes", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "label: while (1) {}" };
        const options = (allowUnusedLabels: boolean) => `{ "compilerOptions": { "allowUnusedLabels": ${allowUnusedLabels} } }`;
        const tsconfig: ts.projectSystem.File = { path: "/tsconfig.json", content: options(/*allowUnusedLabels*/ true) };

        const host = ts.projectSystem.createServerHost([aTs, tsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs], session);

        host.modifyFile(tsconfig.path, options(/*allowUnusedLabels*/ false));
        host.runQueuedTimeoutCallbacks();

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.SemanticDiagnosticsSyncRequest, ts.projectSystem.protocol.SemanticDiagnosticsSyncResponse>(session, ts.projectSystem.protocol.CommandTypes.SemanticDiagnosticsSync, { file: aTs.path }) as ts.projectSystem.protocol.Diagnostic[] | undefined;
        assert.deepEqual<ts.projectSystem.protocol.Diagnostic[] | undefined>(response, [
            {
                start: { line: 1, offset: 1 },
                end: { line: 1, offset: 1 + "label".length },
                text: "Unused label.",
                category: "error",
                code: ts.Diagnostics.Unused_label.code,
                relatedInformation: undefined,
                reportsUnnecessary: true,
                reportsDeprecated: undefined,
                source: undefined,
            },
        ]);
    });
});

describe("unittests:: tsserver:: Project Errors with resolveJsonModule", () => {
    function createSessionForTest({ include }: { include: readonly string[]; }) {
        const test: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/src/test.ts`,
            content: `import * as blabla from "./blabla.json";
declare var console: any;
console.log(blabla);`
        };
        const blabla: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/src/blabla.json`,
            content: "{}"
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    resolveJsonModule: true,
                    composite: true
                },
                include
            })
        };

        const host = ts.projectSystem.createServerHost([test, blabla, ts.projectSystem.libFile, tsconfig]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([test], session);
        return { host, session, test, blabla, tsconfig };
    }

    it("should not report incorrect error when json is root file found by tsconfig", () => {
        const { host, session, test } = createSessionForTest({
            include: ["./src/*.ts", "./src/*.json"]
        });
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [test] });
        ts.projectSystem.baselineTsserverLogs("projectErrors", `should not report incorrect error when json is root file found by tsconfig`, session);
    });

    it("should report error when json is not root file found by tsconfig", () => {
        const { host, session, test } = createSessionForTest({
            include: ["./src/*.ts"]
        });
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [test] });
        ts.projectSystem.baselineTsserverLogs("projectErrors", `should report error when json is not root file found by tsconfig`, session);
    });
});

describe("unittests:: tsserver:: Project Errors with npm install when", () => {
    function verifyNpmInstall(timeoutDuringPartialInstallation: boolean) {
        const main: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/src/main.ts`,
            content: "import * as _a from '@angular/core';"
        };
        const config: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        // Move things from staging to node_modules without triggering watch
        const moduleFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/node_modules/@angular/core/index.d.ts`,
            content: `export const y = 10;`
        };
        const projectFiles = [main, ts.projectSystem.libFile, config];
        const host = ts.projectSystem.createServerHost(projectFiles);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([{ file: main, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [main] });

        let npmInstallComplete = false;

        // Simulate npm install
        let filesAndFoldersToAdd: (ts.projectSystem.File | ts.projectSystem.Folder)[] = [
            { path: `${ts.tscWatch.projectRoot}/node_modules` }, // This should queue update
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging` },
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/@babel` },
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/@babel/helper-plugin-utils-a06c629f` },
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/core-js-db53158d` },
        ];
        verifyWhileNpmInstall(3);

        filesAndFoldersToAdd = [
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a` },
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts`, content: `export const x = 10;` },
            { path: `${ts.tscWatch.projectRoot}/node_modules/.staging/@angular/core-0963aebf/index.d.ts`, content: `export const y = 10;` },
        ];
        // Since we added/removed in .staging no timeout
        verifyWhileNpmInstall(0);

        filesAndFoldersToAdd = [];
        host.ensureFileOrFolder(moduleFile, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true, /*ignoreParentWatch*/ true);
        // Since we added/removed in .staging no timeout
        verifyWhileNpmInstall(0);

        // Remove staging folder to remove errors
        host.deleteFolder(`${ts.tscWatch.projectRoot}/node_modules/.staging`, /*recursive*/ true);
        npmInstallComplete = true;
        projectFiles.push(moduleFile);
        // Additional watch for watching script infos from node_modules
        verifyWhileNpmInstall(3);

        ts.projectSystem.baselineTsserverLogs("projectErrors", `npm install when timeout occurs ${timeoutDuringPartialInstallation ? "inbetween" : "after"} installation`, session);

        function verifyWhileNpmInstall(timeouts: number) {
            filesAndFoldersToAdd.forEach(f => host.ensureFileOrFolder(f));
            if (npmInstallComplete || timeoutDuringPartialInstallation) {
                host.checkTimeoutQueueLengthAndRun(timeouts); // Invalidation of failed lookups
                if (timeouts) {
                    host.checkTimeoutQueueLengthAndRun(timeouts - 1); // Actual update
                }
            }
            else {
                host.checkTimeoutQueueLength(timeouts ? 3 : 2);
            }
            ts.projectSystem.verifyGetErrRequest({ session, host, files: [main], existingTimeouts: !npmInstallComplete && !timeoutDuringPartialInstallation ? timeouts ? 3 : 2 : undefined });
        }
    }

    it("timeouts occur inbetween installation", () => {
        verifyNpmInstall(/*timeoutDuringPartialInstallation*/ true);
    });

    it("timeout occurs after installation", () => {
        verifyNpmInstall(/*timeoutDuringPartialInstallation*/ false);
    });
});

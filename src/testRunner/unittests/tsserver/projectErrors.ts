namespace ts.projectSystem {
    describe("unittests:: tsserver:: Project Errors", () => {
        function checkProjectErrors(projectFiles: server.ProjectFilesWithTSDiagnostics, expectedErrors: readonly string[]): void {
            assert.isTrue(projectFiles !== undefined, "missing project files");
            checkProjectErrorsWorker(projectFiles.projectErrors, expectedErrors);
        }

        function checkProjectErrorsWorker(errors: readonly Diagnostic[], expectedErrors: readonly string[]): void {
            assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
            if (expectedErrors.length) {
                for (let i = 0; i < errors.length; i++) {
                    const actualMessage = flattenDiagnosticMessageText(errors[i].messageText, "\n");
                    const expectedMessage = expectedErrors[i];
                    assert.isTrue(actualMessage.indexOf(expectedMessage) === 0, `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
                }
            }
        }

        function checkDiagnosticsWithLinePos(errors: server.protocol.DiagnosticWithLinePosition[], expectedErrors: string[]) {
            assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
            if (expectedErrors.length) {
                zipWith(errors, expectedErrors, ({ message: actualMessage }, expectedMessage) => {
                    assert.isTrue(startsWith(actualMessage, actualMessage), `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
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
            const host = createServerHost([file1, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const projectFileName = "/a/b/test.csproj";
            const compilerOptionsRequest: server.protocol.CompilerOptionsDiagnosticsRequest = {
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName }
            };

            {
                projectService.openExternalProject({
                    projectFileName,
                    options: {},
                    rootFiles: toExternalFiles([file1.path, file2.path])
                });

                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response as server.protocol.DiagnosticWithLinePosition[];
                // only file1 exists - expect error
                checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);
            }
            host.reloadFS([file2, libFile]);
            {
                // only file2 exists - expect error
                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response as server.protocol.DiagnosticWithLinePosition[];
                checkDiagnosticsWithLinePos(diags, ["File '/a/b/app.ts' not found."]);
            }

            host.reloadFS([file1, file2, libFile]);
            {
                // both files exist - expect no errors
                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response as server.protocol.DiagnosticWithLinePosition[];
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
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const host = createServerHost([file1, config, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            const compilerOptionsRequest: server.protocol.CompilerOptionsDiagnosticsRequest = {
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName: project.getProjectName() }
            };
            let diags = session.executeCommand(compilerOptionsRequest).response as server.protocol.DiagnosticWithLinePosition[];
            checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);

            host.reloadFS([file1, file2, config, libFile]);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            diags = session.executeCommand(compilerOptionsRequest).response as server.protocol.DiagnosticWithLinePosition[];
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
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const corruptedConfig = {
                path: correctConfig.path,
                content: correctConfig.content.substr(1)
            };
            const host = createServerHost([file1, file2, corruptedConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = configuredProjectAt(projectService, 0).getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, [
                    "'{' expected."
                ]);
                assert.isNotNull(projectErrors[0].file);
                assert.equal(projectErrors[0].file!.fileName, corruptedConfig.path);
            }
            // fix config and trigger watcher
            host.reloadFS([file1, file2, correctConfig]);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = configuredProjectAt(projectService, 0).getAllProjectErrors();
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
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const corruptedConfig = {
                path: correctConfig.path,
                content: correctConfig.content.substr(1)
            };
            const host = createServerHost([file1, file2, correctConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = configuredProjectAt(projectService, 0).getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, []);
            }
            // break config and trigger watcher
            host.reloadFS([file1, file2, corruptedConfig]);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = find(projectService.synchronizeProjectList([]), f => f.info!.projectName === corruptedConfig.path)!;
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = configuredProjectAt(projectService, 0).getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, [
                    "'{' expected."
                ]);
                assert.isNotNull(projectErrors[0].file);
                assert.equal(projectErrors[0].file!.fileName, corruptedConfig.path);
            }
        });
    });

    describe("unittests:: tsserver:: Project Errors are reported as appropriate", () => {
        function createErrorLogger() {
            let hasError = false;
            const errorLogger: server.Logger = {
                close: noop,
                hasLevel: () => true,
                loggingEnabled: () => true,
                perftrc: noop,
                info: noop,
                msg: (_s, type) => {
                    if (type === server.Msg.Err) {
                        hasError = true;
                    }
                },
                startGroup: noop,
                endGroup: noop,
                getLogFileName: returnUndefined
            };
            return {
                errorLogger,
                hasError: () => hasError
            };
        }

        it("document is not contained in project", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const corruptedConfig = {
                path: "/a/b/tsconfig.json",
                content: "{"
            };
            const host = createServerHost([file1, corruptedConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const project = projectService.findProject(corruptedConfig.path)!;
            checkProjectRootFiles(project, [file1.path]);
        });

        describe("when opening new file that doesnt exist on disk yet", () => {
            function verifyNonExistentFile(useProjectRoot: boolean) {
                const folderPath = "/user/someuser/projects/someFolder";
                const fileInRoot: File = {
                    path: `/src/somefile.d.ts`,
                    content: "class c { }"
                };
                const fileInProjectRoot: File = {
                    path: `${folderPath}/src/somefile.d.ts`,
                    content: "class c { }"
                };
                const host = createServerHost([libFile, fileInRoot, fileInProjectRoot]);
                const { hasError, errorLogger } = createErrorLogger();
                const session = createSession(host, { canUseEvents: true, logger: errorLogger, useInferredProjectPerProjectRoot: true });

                const projectService = session.getProjectService();
                const untitledFile = "untitled:Untitled-1";
                const refPathNotFound1 = "../../../../../../typings/@epic/Core.d.ts";
                const refPathNotFound2 = "./src/somefile.d.ts";
                const fileContent = `/// <reference path="${refPathNotFound1}" />
/// <reference path="${refPathNotFound2}" />`;
                session.executeCommandSeq<protocol.OpenRequest>({
                    command: server.CommandNames.Open,
                    arguments: {
                        file: untitledFile,
                        fileContent,
                        scriptKindName: "TS",
                        projectRootPath: useProjectRoot ? folderPath : undefined
                    }
                });
                checkNumberOfProjects(projectService, { inferredProjects: 1 });
                const infoForUntitledAtProjectRoot = projectService.getScriptInfoForPath(`${folderPath.toLowerCase()}/${untitledFile.toLowerCase()}` as Path);
                const infoForUnitiledAtRoot = projectService.getScriptInfoForPath(`/${untitledFile.toLowerCase()}` as Path);
                const infoForSomefileAtProjectRoot = projectService.getScriptInfoForPath(`/${folderPath.toLowerCase()}/src/somefile.d.ts` as Path);
                const infoForSomefileAtRoot = projectService.getScriptInfoForPath(`${fileInRoot.path.toLowerCase()}` as Path);
                if (useProjectRoot) {
                    assert.isDefined(infoForUntitledAtProjectRoot);
                    assert.isUndefined(infoForUnitiledAtRoot);
                }
                else {
                    assert.isDefined(infoForUnitiledAtRoot);
                    assert.isUndefined(infoForUntitledAtProjectRoot);
                }
                assert.isUndefined(infoForSomefileAtRoot);
                assert.isUndefined(infoForSomefileAtProjectRoot);

                // Since this is not js project so no typings are queued
                host.checkTimeoutQueueLength(0);

                const errorOffset = fileContent.indexOf(refPathNotFound1) + 1;
                verifyGetErrRequest({
                    session,
                    host,
                    expected: [{
                        file: untitledFile,
                        syntax: [],
                        semantic: [
                            createDiagnostic({ line: 1, offset: errorOffset }, { line: 1, offset: errorOffset + refPathNotFound1.length }, Diagnostics.File_0_not_found, [refPathNotFound1], "error"),
                            createDiagnostic({ line: 2, offset: errorOffset }, { line: 2, offset: errorOffset + refPathNotFound2.length }, Diagnostics.File_0_not_found, [refPathNotFound2.substr(2)], "error")
                        ],
                        suggestion: []
                    }],
                    onErrEvent: () => assert.isFalse(hasError())
                });
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
            const app: File = {
                path: `${projectDir}/bar/app.ts`,
                content: "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
            };
            const foo: File = {
                path: `${projectDir}/foo/foo.ts`,
                content: "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"
            };
            const configFile: File = {
                path: `${projectDir}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { module: "none", targer: "es5" }, exclude: ["node_modules"] })
            };
            const host = createServerHost([app, foo, configFile]);
            const session = createSession(host, { canUseEvents: true, });
            const projectService = session.getProjectService();

            session.executeCommandSeq<protocol.OpenRequest>({
                command: server.CommandNames.Open,
                arguments: { file: app.path, }
            });
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isDefined(projectService.configuredProjects.get(configFile.path));
            verifyErrorsInApp();

            host.renameFolder(`${projectDir}/foo`, `${projectDir}/foo2`);
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();
            verifyErrorsInApp();

            function verifyErrorsInApp() {
                verifyGetErrRequest({
                    session,
                    host,
                    expected: [{
                        file: app,
                        syntax: [],
                        semantic: [],
                        suggestion: []
                    }],
                });
            }
        });

        it("Getting errors before opening file", () => {
            const file: File = {
                path: "/a/b/project/file.ts",
                content: "let x: number = false;"
            };
            const host = createServerHost([file, libFile]);
            const { hasError, errorLogger } = createErrorLogger();
            const session = createSession(host, { canUseEvents: true, logger: errorLogger });

            session.clearMessages();
            const expectedSequenceId = session.getNextSeq();
            session.executeCommandSeq<protocol.GeterrRequest>({
                command: server.CommandNames.Geterr,
                arguments: {
                    delay: 0,
                    files: [file.path]
                }
            });

            host.runQueuedImmediateCallbacks();
            assert.isFalse(hasError());
            checkCompleteEvent(session, 1, expectedSequenceId);
            session.clearMessages();
        });

        it("Reports errors correctly when file referenced by inferred project root, is opened right after closing the root file", () => {
            const app: File = {
                path: `${tscWatch.projectRoot}/src/client/app.js`,
                content: ""
            };
            const serverUtilities: File = {
                path: `${tscWatch.projectRoot}/src/server/utilities.js`,
                content: `function getHostName() { return "hello"; } export { getHostName };`
            };
            const backendTest: File = {
                path: `${tscWatch.projectRoot}/test/backend/index.js`,
                content: `import { getHostName } from '../../src/server/utilities';export default getHostName;`
            };
            const files = [libFile, app, serverUtilities, backendTest];
            const host = createServerHost(files);
            const session = createSession(host, { useInferredProjectPerProjectRoot: true, canUseEvents: true });
            openFilesForSession([{ file: app, projectRootPath: tscWatch.projectRoot }], session);
            const service = session.getProjectService();
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, app.path]);
            openFilesForSession([{ file: backendTest, projectRootPath: tscWatch.projectRoot }], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, files.map(f => f.path));
            checkErrors([backendTest.path, app.path]);
            closeFilesForSession([backendTest], session);
            openFilesForSession([{ file: serverUtilities.path, projectRootPath: tscWatch.projectRoot }], session);
            checkErrors([serverUtilities.path, app.path]);

            function checkErrors(openFiles: [string, string]) {
                verifyGetErrRequest({
                    session,
                    host,
                    expected: openFiles.map(file => ({ file, syntax: [], semantic: [], suggestion: [] })),
                    existingTimeouts: 2
                });
            }
        });

        it("Correct errors when resolution resolves to file that has same ambient module and is also module", () => {
            const projectRootPath = "/users/username/projects/myproject";
            const aFile: File = {
                path: `${projectRootPath}/src/a.ts`,
                content: `import * as myModule from "@custom/plugin";
function foo() {
  // hello
}`
            };
            const config: File = {
                path: `${projectRootPath}/tsconfig.json`,
                content: JSON.stringify({ include: ["src"] })
            };
            const plugin: File = {
                path: `${projectRootPath}/node_modules/@custom/plugin/index.d.ts`,
                content: `import './proposed';
declare module '@custom/plugin' {
    export const version: string;
}`
            };
            const pluginProposed: File = {
                path: `${projectRootPath}/node_modules/@custom/plugin/proposed.d.ts`,
                content: `declare module '@custom/plugin' {
    export const bar = 10;
}`
            };
            const files = [libFile, aFile, config, plugin, pluginProposed];
            const host = createServerHost(files);
            const session = createSession(host, { canUseEvents: true });
            const service = session.getProjectService();
            openFilesForSession([aFile], session);

            checkNumberOfProjects(service, { configuredProjects: 1 });
            session.clearMessages();
            checkErrors();

            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
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

            function checkErrors() {
                host.checkTimeoutQueueLength(0);
                verifyGetErrRequest({
                    session,
                    host,
                    expected: [{
                        file: aFile,
                        syntax: [],
                        semantic: [],
                        suggestion: [
                            createDiagnostic({ line: 1, offset: 1 }, { line: 1, offset: 44 }, Diagnostics._0_is_declared_but_its_value_is_never_read, ["myModule"], "suggestion", /*reportsUnnecessary*/ true),
                            createDiagnostic({ line: 2, offset: 10 }, { line: 2, offset: 13 }, Diagnostics._0_is_declared_but_its_value_is_never_read, ["foo"], "suggestion", /*reportsUnnecessary*/ true)
                        ]
                    }]
                });
            }
        });
    });

    describe("unittests:: tsserver:: Project Errors for Configure file diagnostics events", () => {
        function getUnknownCompilerOptionDiagnostic(configFile: File, prop: string, didYouMean?: string): ConfigFileDiagnostic {
            const d = didYouMean ? Diagnostics.Unknown_compiler_option_0_Did_you_mean_1 : Diagnostics.Unknown_compiler_option_0;
            const start = configFile.content.indexOf(prop) - 1; // start at "prop"
            return {
                fileName: configFile.path,
                start,
                length: prop.length + 2,
                messageText: formatStringFromArgs(d.message, didYouMean ? [prop, didYouMean] : [prop]),
                category: d.category,
                code: d.code,
                reportsUnnecessary: undefined
            };
        }

        function getFileNotFoundDiagnostic(configFile: File, relativeFileName: string): ConfigFileDiagnostic {
            const findString = `{"path":"./${relativeFileName}"}`;
            const d = Diagnostics.File_0_not_found;
            const start = configFile.content.indexOf(findString);
            return {
                fileName: configFile.path,
                start,
                length: findString.length,
                messageText: formatStringFromArgs(d.message, [`${getDirectoryPath(configFile.path)}/${relativeFileName}`]),
                category: d.category,
                code: d.code,
                reportsUnnecessary: undefined
            };
        }

        it("are generated when the config file has errors", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
            };
            const serverEventManager = new TestServerEventManager([file, libFile, configFile]);
            openFilesForSession([file], serverEventManager.session);
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, file.path, [
                getUnknownCompilerOptionDiagnostic(configFile, "foo"),
                getUnknownCompilerOptionDiagnostic(configFile, "allowJS", "allowJs")
            ]);
        });

        it("are generated when the config file doesn't have errors", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {}
                }`
            };
            const serverEventManager = new TestServerEventManager([file, libFile, configFile]);
            openFilesForSession([file], serverEventManager.session);
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, file.path, emptyArray);
        });

        it("are generated when the config file changes", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {}
                }`
            };

            const files = [file, libFile, configFile];
            const serverEventManager = new TestServerEventManager(files);
            openFilesForSession([file], serverEventManager.session);
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, file.path, emptyArray);

            configFile.content = `{
                "compilerOptions": {
                    "haha": 123
                }
            }`;
            serverEventManager.host.reloadFS(files);
            serverEventManager.host.runQueuedTimeoutCallbacks();
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, configFile.path, [
                getUnknownCompilerOptionDiagnostic(configFile, "haha")
            ]);

            configFile.content = `{
                "compilerOptions": {}
            }`;
            serverEventManager.host.reloadFS(files);
            serverEventManager.host.runQueuedTimeoutCallbacks();
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, configFile.path, emptyArray);
        });

        it("are not generated when the config file does not include file opened and config file has errors", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const file2: File = {
                path: "/a/b/test.ts",
                content: "let x = 10"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    },
                    "files": ["app.ts"]
                }`
            };
            const serverEventManager = new TestServerEventManager([file, file2, libFile, configFile]);
            openFilesForSession([file2], serverEventManager.session);
            serverEventManager.hasZeroEvent("configFileDiag");
        });

        it("are not generated when the config file has errors but suppressDiagnosticEvents is true", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
            };
            const serverEventManager = new TestServerEventManager([file, libFile, configFile], /*suppressDiagnosticEvents*/ true);
            openFilesForSession([file], serverEventManager.session);
            serverEventManager.hasZeroEvent("configFileDiag");
        });

        it("are not generated when the config file does not include file opened and doesnt contain any errors", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const file2: File = {
                path: "/a/b/test.ts",
                content: "let x = 10"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "files": ["app.ts"]
                }`
            };

            const serverEventManager = new TestServerEventManager([file, file2, libFile, configFile]);
            openFilesForSession([file2], serverEventManager.session);
            serverEventManager.hasZeroEvent("configFileDiag");
        });

        it("contains the project reference errors", () => {
            const file: File = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const noSuchTsconfig = "no-such-tsconfig.json";
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "files": ["app.ts"],
                    "references": [{"path":"./${noSuchTsconfig}"}]
                }`
            };

            const serverEventManager = new TestServerEventManager([file, libFile, configFile]);
            openFilesForSession([file], serverEventManager.session);
            serverEventManager.checkSingleConfigFileDiagEvent(configFile.path, file.path, [
                getFileNotFoundDiagnostic(configFile, noSuchTsconfig)
            ]);
        });
    });

    describe("unittests:: tsserver:: Project Errors dont include overwrite emit error", () => {
        it("for inferred project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            openFilesForSession([f1], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const projectName = projectService.inferredProjects[0].getProjectName();

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName: projectName }
            }).response as readonly protocol.DiagnosticWithLinePosition[];
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsForInferredProjects,
                seq: 3,
                arguments: { options: { module: ModuleKind.CommonJS } }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName: projectName }
            }).response as readonly protocol.DiagnosticWithLinePosition[];
            assert.isTrue(diagsAfterUpdate.length === 0);
        });

        it("for external project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const projectFileName = "/a/b/project.csproj";
            const externalFiles = toExternalFiles([f1.path]);
            projectService.openExternalProject(<protocol.ExternalProject>{
                projectFileName,
                rootFiles: externalFiles,
                options: {}
            });

            checkNumberOfProjects(projectService, { externalProjects: 1 });

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName }
            }).response as readonly server.protocol.DiagnosticWithLinePosition[];
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.OpenExternalProjectRequest>{
                type: "request",
                command: server.CommandNames.OpenExternalProject,
                seq: 3,
                arguments: {
                    projectFileName,
                    rootFiles: externalFiles,
                    options: { module: ModuleKind.CommonJS }
                }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName }
            }).response as readonly server.protocol.DiagnosticWithLinePosition[];
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
            const host = createServerHost([file, libFile, configFile]);
            const session = createSession(host);
            openFilesForSession([file], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const projectName = configuredProjectAt(projectService, 0).getProjectName();

            const diags = session.executeCommand(<server.protocol.SemanticDiagnosticsSyncRequest>{
                type: "request",
                command: server.CommandNames.SemanticDiagnosticsSync,
                seq: 2,
                arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
            }).response as readonly server.protocol.DiagnosticWithLinePosition[];
            assert.isTrue(diags.length === 3);

            configFile.content = configFileContentWithoutCommentLine;
            host.reloadFS([file, configFile]);

            const diagsAfterEdit = session.executeCommand(<server.protocol.SemanticDiagnosticsSyncRequest>{
                type: "request",
                command: server.CommandNames.SemanticDiagnosticsSync,
                seq: 2,
                arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
            }).response as readonly server.protocol.DiagnosticWithLinePosition[];
            assert.isTrue(diagsAfterEdit.length === 3);

            verifyDiagnostic(diags[0], diagsAfterEdit[0]);
            verifyDiagnostic(diags[1], diagsAfterEdit[1]);
            verifyDiagnostic(diags[2], diagsAfterEdit[2]);

            function verifyDiagnostic(beforeEditDiag: server.protocol.DiagnosticWithLinePosition, afterEditDiag: server.protocol.DiagnosticWithLinePosition) {
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
            const aTs: File = { path: "/a.ts", content: "label: while (1) {}" };
            const options = (allowUnusedLabels: boolean) => `{ "compilerOptions": { "allowUnusedLabels": ${allowUnusedLabels} } }`;
            const tsconfig: File = { path: "/tsconfig.json", content: options(/*allowUnusedLabels*/ true) };

            const host = createServerHost([aTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs], session);

            host.modifyFile(tsconfig.path, options(/*allowUnusedLabels*/ false));
            host.runQueuedTimeoutCallbacks();

            const response = executeSessionRequest<protocol.SemanticDiagnosticsSyncRequest, protocol.SemanticDiagnosticsSyncResponse>(session, protocol.CommandTypes.SemanticDiagnosticsSync, { file: aTs.path }) as protocol.Diagnostic[] | undefined;
            assert.deepEqual<protocol.Diagnostic[] | undefined>(response, [
                {
                    start: { line: 1, offset: 1 },
                    end: { line: 1, offset: 1 + "label".length },
                    text: "Unused label.",
                    category: "error",
                    code: Diagnostics.Unused_label.code,
                    relatedInformation: undefined,
                    reportsUnnecessary: true,
                    source: undefined,
                },
            ]);
        });
    });

    describe("unittests:: tsserver:: Project Errors with resolveJsonModule", () => {
        function createSessionForTest({ include }: { include: readonly string[]; }) {
            const test: File = {
                path: `${tscWatch.projectRoot}/src/test.ts`,
                content: `import * as blabla from "./blabla.json";
declare var console: any;
console.log(blabla);`
            };
            const blabla: File = {
                path: `${tscWatch.projectRoot}/src/blabla.json`,
                content: "{}"
            };
            const tsconfig: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        resolveJsonModule: true,
                        composite: true
                    },
                    include
                })
            };

            const host = createServerHost([test, blabla, libFile, tsconfig]);
            const session = createSession(host, { canUseEvents: true });
            openFilesForSession([test], session);
            return { host, session, test, blabla, tsconfig };
        }

        it("should not report incorrect error when json is root file found by tsconfig", () => {
            const { host, session, test } = createSessionForTest({
                include: ["./src/*.ts", "./src/*.json"]
            });
            verifyGetErrRequest({
                session,
                host,
                expected: [
                    {
                        file: test,
                        syntax: [],
                        semantic: [],
                        suggestion: []
                    }
                ]
            });
        });

        it("should report error when json is not root file found by tsconfig", () => {
            const { host, session, test, blabla, tsconfig } = createSessionForTest({
                include: ["./src/*.ts"]
            });
            const span = protocolTextSpanFromSubstring(test.content, `"./blabla.json"`);
            verifyGetErrRequest({
                session,
                host,
                expected: [{
                    file: test,
                    syntax: [],
                    semantic: [
                        createDiagnostic(
                            span.start,
                            span.end,
                            Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
                            [blabla.path, tsconfig.path]
                        )
                    ],
                    suggestion: []
                }]
            });
        });
    });

    describe("unittests:: tsserver:: Project Errors with npm install when", () => {
        function verifyNpmInstall(timeoutDuringPartialInstallation: boolean) {
            const main: File = {
                path: `${tscWatch.projectRoot}/src/main.ts`,
                content: "import * as _a from '@angular/core';"
            };
            const config: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const projectFiles = [main, libFile, config];
            const host = createServerHost(projectFiles);
            const session = createSession(host, { canUseEvents: true });
            const service = session.getProjectService();
            openFilesForSession([{ file: main, projectRootPath: tscWatch.projectRoot }], session);
            const span = protocolTextSpanFromSubstring(main.content, `'@angular/core'`);
            const moduleNotFoundErr: protocol.Diagnostic[] = [
                createDiagnostic(
                    span.start,
                    span.end,
                    Diagnostics.Cannot_find_module_0,
                    ["@angular/core"]
                )
            ];
            const expectedRecursiveWatches = arrayToMap([`${tscWatch.projectRoot}`, `${tscWatch.projectRoot}/src`, `${tscWatch.projectRoot}/node_modules`, `${tscWatch.projectRoot}/node_modules/@types`], identity, () => 1);
            verifyProject();
            verifyErrors(moduleNotFoundErr);

            let npmInstallComplete = false;

            // Simulate npm install
            let filesAndFoldersToAdd: (File | Folder)[] = [
                { path: `${tscWatch.projectRoot}/node_modules` }, // This should queue update
                { path: `${tscWatch.projectRoot}/node_modules/.staging` },
                { path: `${tscWatch.projectRoot}/node_modules/.staging/@babel` },
                { path: `${tscWatch.projectRoot}/node_modules/.staging/@babel/helper-plugin-utils-a06c629f` },
                { path: `${tscWatch.projectRoot}/node_modules/.staging/core-js-db53158d` },
            ];
            verifyWhileNpmInstall({ timeouts: 2, semantic: moduleNotFoundErr });

            filesAndFoldersToAdd = [
                { path: `${tscWatch.projectRoot}/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a` },
                { path: `${tscWatch.projectRoot}/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts`, content: `export const x = 10;` },
                { path: `${tscWatch.projectRoot}/node_modules/.staging/@angular/core-0963aebf/index.d.ts`, content: `export const y = 10;` },
            ];
            // Since we added/removed in .staging no timeout
            verifyWhileNpmInstall({ timeouts: 0, semantic: moduleNotFoundErr });

            filesAndFoldersToAdd = [];
            // Move things from staging to node_modules without triggering watch
            const moduleFile: File = {
                path: `${tscWatch.projectRoot}/node_modules/@angular/core/index.d.ts`,
                content: `export const y = 10;`
            };
            host.ensureFileOrFolder(moduleFile, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true, /*ignoreParentWatch*/ true);
            // Since we added/removed in .staging no timeout
            verifyWhileNpmInstall({ timeouts: 0, semantic: moduleNotFoundErr });

            // Remove staging folder to remove errors
            host.deleteFolder(`${tscWatch.projectRoot}/node_modules/.staging`, /*recursive*/ true);
            npmInstallComplete = true;
            projectFiles.push(moduleFile);
            // Additional watch for watching script infos from node_modules
            expectedRecursiveWatches.set(`${tscWatch.projectRoot}/node_modules`, 2);
            verifyWhileNpmInstall({ timeouts: 2, semantic: [] });

            function verifyWhileNpmInstall({ timeouts, semantic }: { timeouts: number; semantic: protocol.Diagnostic[] }) {
                filesAndFoldersToAdd.forEach(f => host.ensureFileOrFolder(f));
                if (npmInstallComplete || timeoutDuringPartialInstallation) {
                    host.checkTimeoutQueueLengthAndRun(timeouts);
                }
                else {
                    host.checkTimeoutQueueLength(2);
                }
                verifyProject();
                verifyErrors(semantic, !npmInstallComplete && !timeoutDuringPartialInstallation ? 2 : undefined);
            }

            function verifyProject() {
                checkNumberOfConfiguredProjects(service, 1);

                const project = service.configuredProjects.get(config.path)!;
                checkProjectActualFiles(project, map(projectFiles, f => f.path));

                checkWatchedFilesDetailed(host, mapDefined(projectFiles, f => f === main || f === moduleFile ? undefined : f.path), 1);
                checkWatchedDirectoriesDetailed(host, expectedRecursiveWatches, /*recursive*/ true);
                checkWatchedDirectories(host, [], /*recursive*/ false);
            }

            function verifyErrors(semantic: protocol.Diagnostic[], existingTimeouts?: number) {
                verifyGetErrRequest({
                    session,
                    host,
                    expected: [{
                        file: main,
                        syntax: [],
                        semantic,
                        suggestion: []
                    }],
                    existingTimeouts
                });

            }
        }

        it("timeouts occur inbetween installation", () => {
            verifyNpmInstall(/*timeoutDuringPartialInstallation*/ true);
        });

        it("timeout occurs after installation", () => {
            verifyNpmInstall(/*timeoutDuringPartialInstallation*/ false);
        });
    });
}

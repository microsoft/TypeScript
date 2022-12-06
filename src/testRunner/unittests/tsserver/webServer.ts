import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import {
    createServerHost,
    File,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    checkNumberOfProjects,
    checkProjectActualFiles,
    nullLogger,
    protocolFileLocationFromSubstring,
    protocolTextSpanWithContextFromSubstring,
} from "./helpers";

/* eslint-disable local/boolean-trivia */
describe("unittests:: tsserver:: webServer", () => {
    class TestWorkerSession extends ts.server.WorkerSession {
        constructor(host: ts.server.ServerHost, webHost: ts.server.HostWithWriteMessage, options: Partial<ts.server.StartSessionOptions>, logger: ts.server.Logger) {
            super(
                host,
                webHost,
                {
                    globalPlugins: undefined,
                    pluginProbeLocations: undefined,
                    allowLocalPluginLoads: undefined,
                    useSingleInferredProject: true,
                    useInferredProjectPerProjectRoot: false,
                    suppressDiagnosticEvents: false,
                    noGetErrOnBackgroundUpdate: true,
                    syntaxOnly: undefined,
                    serverMode: undefined,
                    ...options
                },
                logger,
                ts.server.nullCancellationToken,
                () => ts.emptyArray
            );
        }

        getProjectService() {
            return this.projectService;
        }
    }

    function setup(logLevel: ts.server.LogLevel | undefined, options?: Partial<ts.server.StartSessionOptions>, importPlugin?: ts.server.ServerHost["importPlugin"]) {
        const host = createServerHost([libFile], { windowsStyleRoot: "c:/" });
        const messages: any[] = [];
        const webHost: ts.server.WebHost = {
            readFile: s => host.readFile(s),
            fileExists: s => host.fileExists(s),
            writeMessage: s => messages.push(s),
        };
        const webSys = ts.server.createWebSystem(webHost, ts.emptyArray, () => host.getExecutingFilePath());
        webSys.importPlugin = importPlugin;
        const logger = logLevel !== undefined ? new ts.server.MainProcessLogger(logLevel, webHost) : nullLogger();
        const session = new TestWorkerSession(webSys, webHost, { serverMode: ts.LanguageServiceMode.PartialSemantic, ...options }, logger);
        return { getMessages: () => messages, clearMessages: () => messages.length = 0, session };

    }

    describe("open files are added to inferred project and semantic operations succeed", () => {
        function verify(logLevel: ts.server.LogLevel | undefined) {
            const { session, clearMessages, getMessages } = setup(logLevel);
            const service = session.getProjectService();
            const file: File = {
                path: "^memfs:/sample-folder/large.ts",
                content: "export const numberConst = 10; export const arrayConst: Array<string> = [];"
            };
            session.executeCommand({
                seq: 1,
                type: "request",
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: file.path,
                    fileContent: file.content
                }
            });
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, ["/lib.d.ts", file.path]); // Lib files are rooted
            verifyQuickInfo();
            verifyGotoDefInLib();

            function verifyQuickInfo() {
                clearMessages();
                const start = protocolFileLocationFromSubstring(file, "numberConst");
                session.onMessage({
                    seq: 2,
                    type: "request",
                    command: ts.server.protocol.CommandTypes.Quickinfo,
                    arguments: start
                });
                assert.deepEqual(ts.last(getMessages()), {
                    seq: 0,
                    type: "response",
                    command: ts.server.protocol.CommandTypes.Quickinfo,
                    request_seq: 2,
                    success: true,
                    performanceData: undefined,
                    body: {
                        kind: ts.ScriptElementKind.constElement,
                        kindModifiers: "export",
                        start: { line: start.line, offset: start.offset },
                        end: { line: start.line, offset: start.offset + "numberConst".length },
                        displayString: "const numberConst: 10",
                        documentation: "",
                        tags: []
                    }
                });
                verifyLogger();
            }

            function verifyGotoDefInLib() {
                clearMessages();
                const start = protocolFileLocationFromSubstring(file, "Array");
                session.onMessage({
                    seq: 3,
                    type: "request",
                    command: ts.server.protocol.CommandTypes.DefinitionAndBoundSpan,
                    arguments: start
                });
                assert.deepEqual(ts.last(getMessages()), {
                    seq: 0,
                    type: "response",
                    command: ts.server.protocol.CommandTypes.DefinitionAndBoundSpan,
                    request_seq: 3,
                    success: true,
                    performanceData: undefined,
                    body: {
                        definitions: [{
                            file: "/lib.d.ts",
                            ...protocolTextSpanWithContextFromSubstring({
                                fileText: libFile.content,
                                text: "Array",
                                contextText: "interface Array<T> { length: number; [n: number]: T; }"
                            })
                        }],
                        textSpan: {
                            start: { line: start.line, offset: start.offset },
                            end: { line: start.line, offset: start.offset + "Array".length },
                        }
                    }
                });
                verifyLogger();
            }

            function verifyLogger() {
                const messages = getMessages();
                assert.equal(messages.length, logLevel === ts.server.LogLevel.verbose ? 4 : 1, `Expected ${JSON.stringify(messages)}`);
                if (logLevel === ts.server.LogLevel.verbose) {
                    verifyLogMessages(messages[0], "info");
                    verifyLogMessages(messages[1], "perf");
                    verifyLogMessages(messages[2], "info");
                }
                clearMessages();
            }

            function verifyLogMessages(actual: any, expectedLevel: ts.server.MessageLogLevel) {
                assert.equal(actual.type, "log");
                assert.equal(actual.level, expectedLevel);
            }
        }

        it("with logging enabled", () => {
            verify(ts.server.LogLevel.verbose);
        });

        it("with logging disabled", () => {
            verify(/*logLevel*/ undefined);
        });
    });

    describe("async loaded plugins", () => {
        it("plugins are not loaded immediately", async () => {
            let pluginModuleInstantiated = false;
            let pluginInvoked = false;
            const importPlugin = async (_root: string, _moduleName: string): Promise<ts.server.ModuleImportResult> => {
                await Promise.resolve(); // simulate at least a single turn delay
                pluginModuleInstantiated = true;
                return {
                    module: (() => {
                        pluginInvoked = true;
                        return { create: info => info.languageService };
                    }) as ts.server.PluginModuleFactory,
                    error: undefined
                };
            };

            const { session } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importPlugin);
            const projectService = session.getProjectService();

            session.executeCommand({ seq: 1, type: "request", command: ts.server.protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

            // This should be false because `executeCommand` should have already triggered
            // plugin enablement asynchronously and there are no plugin enablements currently
            // being processed.
            expect(projectService.hasNewPluginEnablementRequests()).eq(false);

            // Should be true because async imports have already been triggered in the background
            expect(projectService.hasPendingPluginEnablements()).eq(true);

            // Should be false because resolution of async imports happens in a later turn.
            expect(pluginModuleInstantiated).eq(false);

            await projectService.waitForPendingPlugins();

            // at this point all plugin modules should have been instantiated and all plugins
            // should have been invoked
            expect(pluginModuleInstantiated).eq(true);
            expect(pluginInvoked).eq(true);
        });

        it("plugins evaluation in correct order even if imports resolve out of order", async () => {
            const pluginADeferred = Utils.defer();
            const pluginBDeferred = Utils.defer();
            const log: string[] = [];
            const importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
                log.push(`request import ${moduleName}`);
                const promise = moduleName === "plugin-a" ? pluginADeferred.promise : pluginBDeferred.promise;
                await promise;
                log.push(`fulfill import ${moduleName}`);
                return {
                    module: (() => {
                        log.push(`invoke plugin ${moduleName}`);
                        return { create: info => info.languageService };
                    }) as ts.server.PluginModuleFactory,
                    error: undefined
                };
            };

            const { session } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a", "plugin-b"] }, importPlugin);
            const projectService = session.getProjectService();

            session.executeCommand({ seq: 1, type: "request", command: ts.server.protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

            // wait a turn
            await Promise.resolve();

            // resolve imports out of order
            pluginBDeferred.resolve();
            pluginADeferred.resolve();

            // wait for load to complete
            await projectService.waitForPendingPlugins();

            expect(log).to.deep.equal([
                "request import plugin-a",
                "request import plugin-b",
                "fulfill import plugin-b",
                "fulfill import plugin-a",
                "invoke plugin plugin-a",
                "invoke plugin plugin-b",
            ]);
        });

        it("sends projectsUpdatedInBackground event", async () => {
            const importPlugin = async (_root: string, _moduleName: string): Promise<ts.server.ModuleImportResult> => {
                await Promise.resolve(); // simulate at least a single turn delay
                return {
                    module: (() => ({ create: info => info.languageService })) as ts.server.PluginModuleFactory,
                    error: undefined
                };
            };

            const { session, getMessages } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importPlugin);
            const projectService = session.getProjectService();

            session.executeCommand({ seq: 1, type: "request", command: ts.server.protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

            await projectService.waitForPendingPlugins();

            expect(getMessages()).to.deep.equal([{
                seq: 0,
                type: "event",
                event: "projectsUpdatedInBackground",
                body: {
                    openFiles: ["^memfs:/foo.ts"]
                }
            }]);
        });

        it("adds external files", async () => {
            const pluginAShouldLoad = Utils.defer();
            const pluginAExternalFilesRequested = Utils.defer();

            const importPlugin = async (_root: string, _moduleName: string): Promise<ts.server.ModuleImportResult> => {
                // wait until the initial external files are requested from the project service.
                await pluginAShouldLoad.promise;

                return {
                    module: (() => ({
                        create: info => info.languageService,
                        getExternalFiles: () => {
                            // signal that external files have been requested by the project service.
                            pluginAExternalFilesRequested.resolve();
                            return ["external.txt"];
                        }
                    })) as ts.server.PluginModuleFactory,
                    error: undefined
                };
            };

            const { session } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importPlugin);
            const projectService = session.getProjectService();

            session.executeCommand({ seq: 1, type: "request", command: ts.server.protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

            const project = projectService.inferredProjects[0];

            // get the external files we know about before plugins are loaded
            const initialExternalFiles = project.getExternalFiles();

            // we've ready the initial set of external files, allow the plugin to continue loading.
            pluginAShouldLoad.resolve();

            // wait for plugins
            await projectService.waitForPendingPlugins();

            // wait for the plugin's external files to be requested
            await pluginAExternalFilesRequested.promise;

            // get the external files we know aobut after plugins are loaded
            const pluginExternalFiles = project.getExternalFiles();

            expect(initialExternalFiles).to.deep.equal([]);
            expect(pluginExternalFiles).to.deep.equal(["external.txt"]);
        });

        it("project is closed before plugins are loaded", async () => {
            const pluginALoaded = Utils.defer();
            const projectClosed = Utils.defer();
            const importPlugin = async (_root: string, _moduleName: string): Promise<ts.server.ModuleImportResult> => {
                // mark that the plugin has started loading
                pluginALoaded.resolve();

                // wait until after a project close has been requested to continue
                await projectClosed.promise;
                return {
                    module: (() => ({ create: info => info.languageService })) as ts.server.PluginModuleFactory,
                    error: undefined
                };
            };

            const { session, getMessages } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importPlugin);
            const projectService = session.getProjectService();

            session.executeCommand({ seq: 1, type: "request", command: ts.server.protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

            // wait for the plugin to start loading
            await pluginALoaded.promise;

            // close the project
            session.executeCommand({ seq: 2, type: "request", command: ts.server.protocol.CommandTypes.Close, arguments: { file: "^memfs:/foo.ts" } });

            // continue loading the plugin
            projectClosed.resolve();

            await projectService.waitForPendingPlugins();

            // the project was closed before plugins were ready. no project update should have been requested
            expect(getMessages()).not.to.deep.equal([{
                seq: 0,
                type: "event",
                event: "projectsUpdatedInBackground",
                body: {
                    openFiles: ["^memfs:/foo.ts"]
                }
            }]);
        });
    });
});

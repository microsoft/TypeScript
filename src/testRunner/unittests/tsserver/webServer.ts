/* eslint-disable boolean-trivia */
namespace ts.projectSystem {
    describe("unittests:: tsserver:: webServer", () => {
        class TestWorkerSession extends server.WorkerSession {
            constructor(host: server.ServerHost, webHost: server.HostWithWriteMessage, options: Partial<server.StartSessionOptions>, logger: server.Logger) {
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
                    server.nullCancellationToken,
                    () => emptyArray
                );
            }

            getProjectService() {
                return this.projectService;
            }
        }

        function setup(logLevel: server.LogLevel | undefined, options?: Partial<server.StartSessionOptions>, importServicePlugin?: server.ServerHost["importServicePlugin"]) {
            const host = createServerHost([libFile], { windowsStyleRoot: "c:/" });
            const messages: any[] = [];
            const webHost: server.WebHost = {
                readFile: s => host.readFile(s),
                fileExists: s => host.fileExists(s),
                writeMessage: s => messages.push(s),
            };
            const webSys = server.createWebSystem(webHost, emptyArray, () => host.getExecutingFilePath());
            webSys.importServicePlugin = importServicePlugin;
            const logger = logLevel !== undefined ? new server.MainProcessLogger(logLevel, webHost) : nullLogger();
            const session = new TestWorkerSession(webSys, webHost, { serverMode: LanguageServiceMode.PartialSemantic, ...options }, logger);
            return { getMessages: () => messages, clearMessages: () => messages.length = 0, session };

        }

        describe("open files are added to inferred project and semantic operations succeed", () => {
            function verify(logLevel: server.LogLevel | undefined) {
                const { session, clearMessages, getMessages } = setup(logLevel);
                const service = session.getProjectService();
                const file: File = {
                    path: "^memfs:/sample-folder/large.ts",
                    content: "export const numberConst = 10; export const arrayConst: Array<string> = [];"
                };
                session.executeCommand({
                    seq: 1,
                    type: "request",
                    command: protocol.CommandTypes.Open,
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
                        command: protocol.CommandTypes.Quickinfo,
                        arguments: start
                    });
                    assert.deepEqual(last(getMessages()), {
                        seq: 0,
                        type: "response",
                        command: protocol.CommandTypes.Quickinfo,
                        request_seq: 2,
                        success: true,
                        performanceData: undefined,
                        body: {
                            kind: ScriptElementKind.constElement,
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
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: start
                    });
                    assert.deepEqual(last(getMessages()), {
                        seq: 0,
                        type: "response",
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
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
                    assert.equal(messages.length, logLevel === server.LogLevel.verbose ? 4 : 1, `Expected ${JSON.stringify(messages)}`);
                    if (logLevel === server.LogLevel.verbose) {
                        verifyLogMessages(messages[0], "info");
                        verifyLogMessages(messages[1], "perf");
                        verifyLogMessages(messages[2], "info");
                    }
                    clearMessages();
                }

                function verifyLogMessages(actual: any, expectedLevel: server.MessageLogLevel) {
                    assert.equal(actual.type, "log");
                    assert.equal(actual.level, expectedLevel);
                }
            }

            it("with logging enabled", () => {
                verify(server.LogLevel.verbose);
            });

            it("with logging disabled", () => {
                verify(/*logLevel*/ undefined);
            });
        });

        describe("async loaded plugins", () => {
            it("plugins are not loaded immediately", async () => {
                let pluginModuleInstantiated = false;
                let pluginInvoked = false;
                const importServicePlugin = async (_root: string, _moduleName: string): Promise<server.ModuleImportResult> => {
                    await Promise.resolve(); // simulate at least a single turn delay
                    pluginModuleInstantiated = true;
                    return {
                        module: (() => {
                            pluginInvoked = true;
                            return { create: info => info.languageService };
                        }) as server.PluginModuleFactory,
                        error: undefined
                    };
                };

                const { session } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importServicePlugin);
                const projectService = session.getProjectService();

                session.executeCommand({ seq: 1, type: "request", command: protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

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
                let resolvePluginA!: () => void;
                let resolvePluginB!: () => void;
                const pluginAPromise = new Promise<void>(_resolve => resolvePluginA = _resolve);
                const pluginBPromise = new Promise<void>(_resolve => resolvePluginB = _resolve);
                const log: string[] = [];
                const importServicePlugin = async (_root: string, moduleName: string): Promise<server.ModuleImportResult> => {
                    log.push(`request import ${moduleName}`);
                    const promise = moduleName === "plugin-a" ? pluginAPromise : pluginBPromise;
                    await promise;
                    log.push(`fulfill import ${moduleName}`);
                    return {
                        module: (() => {
                            log.push(`invoke plugin ${moduleName}`);
                            return { create: info => info.languageService };
                        }) as server.PluginModuleFactory,
                        error: undefined
                    };
                };

                const { session } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a", "plugin-b"] }, importServicePlugin);
                const projectService = session.getProjectService();

                session.executeCommand({ seq: 1, type: "request", command: protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

                // wait a turn
                await Promise.resolve();

                // resolve imports out of order
                resolvePluginB();
                resolvePluginA();

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
                const importServicePlugin = async (_root: string, _moduleName: string): Promise<server.ModuleImportResult> => {
                    await Promise.resolve(); // simulate at least a single turn delay
                    return {
                        module: (() => ({ create: info => info.languageService })) as server.PluginModuleFactory,
                        error: undefined
                    };
                };

                const { session, getMessages } = setup(/*logLevel*/ undefined, { globalPlugins: ["plugin-a"] }, importServicePlugin);
                const projectService = session.getProjectService();

                session.executeCommand({ seq: 1, type: "request", command: protocol.CommandTypes.Open, arguments: { file: "^memfs:/foo.ts", content: "" } });

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
        });
    });
}

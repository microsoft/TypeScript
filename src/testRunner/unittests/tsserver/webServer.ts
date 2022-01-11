import { WorkerSession, ServerHost, HostWithWriteMessage, StartSessionOptions, Logger, nullCancellationToken, LogLevel, WebHost, createWebSystem, MainProcessLogger, MessageLogLevel } from "../../ts.server";
import { emptyArray, LanguageServiceMode, last, ScriptElementKind } from "../../ts";
import { createServerHost, libFile, nullLogger, File, protocol, checkNumberOfProjects, checkProjectActualFiles, protocolFileLocationFromSubstring, protocolTextSpanWithContextFromSubstring } from "../../ts.projectSystem";
describe("unittests:: tsserver:: webServer", () => {
    class TestWorkerSession extends WorkerSession {
        constructor(host: ServerHost, webHost: HostWithWriteMessage, options: Partial<StartSessionOptions>, logger: Logger) {
            super(host, webHost, {
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
            }, logger, nullCancellationToken, () => emptyArray);
        }

        getProjectService() {
            return this.projectService;
        }
    }
    function setup(logLevel: LogLevel | undefined) {
        const host = createServerHost([libFile], { windowsStyleRoot: "c:/" });
        const messages: any[] = [];
        const webHost: WebHost = {
            readFile: s => host.readFile(s),
            fileExists: s => host.fileExists(s),
            writeMessage: s => messages.push(s),
        };
        const webSys = createWebSystem(webHost, emptyArray, () => host.getExecutingFilePath());
        const logger = logLevel !== undefined ? new MainProcessLogger(logLevel, webHost) : nullLogger();
        const session = new TestWorkerSession(webSys, webHost, { serverMode: LanguageServiceMode.PartialSemantic }, logger);
        return { getMessages: () => messages, clearMessages: () => messages.length = 0, session };

    }

    describe("open files are added to inferred project and semantic operations succeed", () => {
        function verify(logLevel: LogLevel | undefined) {
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
                assert.equal(messages.length, logLevel === LogLevel.verbose ? 4 : 1, `Expected ${JSON.stringify(messages)}`);
                if (logLevel === LogLevel.verbose) {
                    verifyLogMessages(messages[0], "info");
                    verifyLogMessages(messages[1], "perf");
                    verifyLogMessages(messages[2], "info");
                }
                clearMessages();
            }

            function verifyLogMessages(actual: any, expectedLevel: MessageLogLevel) {
                assert.equal(actual.type, "log");
                assert.equal(actual.level, expectedLevel);
            }
        }

        it("with logging enabled", () => {
            verify(LogLevel.verbose);
        });

        it("with logging disabled", () => {
            verify(/*logLevel*/ undefined);
        });
    });
});

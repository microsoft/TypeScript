namespace ts.server {
    const _chai: typeof import("chai") = require("chai");
    const expect: typeof _chai.expect = _chai.expect;
    let lastWrittenToHost: string;
    const noopFileWatcher: FileWatcher = { close: noop };
    const mockHost: ServerHost = {
        args: [],
        newLine: "\n",
        useCaseSensitiveFileNames: true,
        write(s): void { lastWrittenToHost = s; },
        readFile: returnUndefined,
        writeFile: noop,
        resolvePath(): string { return undefined!; }, // TODO: GH#18217
        fileExists: () => false,
        directoryExists: () => false,
        getDirectories: () => [],
        createDirectory: noop,
        getExecutingFilePath(): string { return ""; },
        getCurrentDirectory(): string { return ""; },
        getEnvironmentVariable(): string { return ""; },
        readDirectory() { return []; },
        exit: noop,
        setTimeout() { return 0; },
        clearTimeout: noop,
        setImmediate: () => 0,
        clearImmediate: noop,
        createHash: Harness.mockHash,
        watchFile: () => noopFileWatcher,
        watchDirectory: () => noopFileWatcher
    };

    class TestSession extends Session {
        getProjectService() {
            return this.projectService;
        }
    }

    describe("unittests:: tsserver:: Session:: General functionality", () => {
        let session: TestSession;
        let lastSent: protocol.Message;

        function createSession(): TestSession {
            const opts: SessionOptions = {
                host: mockHost,
                cancellationToken: nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined!, // TODO: GH#18217
                byteLength: Utils.byteLength,
                hrtime: process.hrtime,
                logger: projectSystem.nullLogger,
                canUseEvents: true
            };
            return new TestSession(opts);
        }

        // Disable sourcemap support for the duration of the test, as sourcemapping the errors generated during this test is slow and not something we care to test
        let oldPrepare: AnyFunction;
        before(() => {
            oldPrepare = (Error as any).prepareStackTrace;
            delete (Error as any).prepareStackTrace;
        });

        after(() => {
            (Error as any).prepareStackTrace = oldPrepare;
        });

        beforeEach(() => {
            session = createSession();
            session.send = (msg: protocol.Message) => {
                lastSent = msg;
            };
        });

        describe("executeCommand", () => {
            it("should throw when commands are executed with invalid arguments", () => {
                const req: protocol.FileRequest = {
                    command: CommandNames.Open,
                    seq: 0,
                    type: "request",
                    arguments: {
                        file: undefined! // TODO: GH#18217
                    }
                };

                expect(() => session.executeCommand(req)).to.throw();
            });
            it("should output an error response when a command does not exist", () => {
                const req: protocol.Request = {
                    command: "foobar",
                    seq: 0,
                    type: "request"
                };

                session.executeCommand(req);

                const expected: protocol.Response = {
                    command: CommandNames.Unknown,
                    type: "response",
                    seq: 0,
                    message: "Unrecognized JSON command: foobar",
                    request_seq: 0,
                    success: false,
                    performanceData: undefined,
                };
                expect(lastSent).to.deep.equal(expected);
            });
            it("should return a tuple containing the response and if a response is required on success", () => {
                const req: protocol.ConfigureRequest = {
                    command: CommandNames.Configure,
                    seq: 0,
                    type: "request",
                    arguments: {
                        hostInfo: "unit test",
                        formatOptions: {
                            newLineCharacter: "`n"
                        }
                    }
                };

                expect(session.executeCommand(req)).to.deep.equal({
                    responseRequired: false
                });
                expect(lastSent).to.deep.equal({
                    command: CommandNames.Configure,
                    type: "response",
                    success: true,
                    request_seq: 0,
                    seq: 0,
                    body: undefined,
                    performanceData: undefined,
                });
            });
            it("should handle literal types in request", () => {
                const configureRequest: protocol.ConfigureRequest = {
                    command: CommandNames.Configure,
                    seq: 0,
                    type: "request",
                    arguments: {
                        formatOptions: {
                            indentStyle: protocol.IndentStyle.Block,
                        }
                    }
                };

                session.onMessage(JSON.stringify(configureRequest));

                assert.equal(session.getProjectService().getFormatCodeOptions("" as NormalizedPath).indentStyle, IndentStyle.Block);

                const setOptionsRequest: protocol.SetCompilerOptionsForInferredProjectsRequest = {
                    command: CommandNames.CompilerOptionsForInferredProjects,
                    seq: 1,
                    type: "request",
                    arguments: {
                        options: {
                            module: protocol.ModuleKind.System,
                            target: protocol.ScriptTarget.ES5,
                            jsx: protocol.JsxEmit.React,
                            newLine: protocol.NewLineKind.Lf,
                            moduleResolution: protocol.ModuleResolutionKind.Node,
                        }
                    }
                };
                session.onMessage(JSON.stringify(setOptionsRequest));
                assert.deepEqual(
                    session.getProjectService().getCompilerOptionsForInferredProjects(),
                    <CompilerOptions>{
                        module: ModuleKind.System,
                        target: ScriptTarget.ES5,
                        jsx: JsxEmit.React,
                        newLine: NewLineKind.LineFeed,
                        moduleResolution: ModuleResolutionKind.NodeJs,
                        allowNonTsExtensions: true // injected by tsserver
                    });
            });

            it("Status request gives ts.version", () => {
                const req: protocol.StatusRequest = {
                    command: CommandNames.Status,
                    seq: 0,
                    type: "request"
                };

                const expected: protocol.StatusResponseBody = {
                    version: ts.version, // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
                };
                assert.deepEqual(session.executeCommand(req).response, expected);
            });
        });

        describe("onMessage", () => {
            const allCommandNames: CommandNames[] = [
                CommandNames.Brace,
                CommandNames.BraceFull,
                CommandNames.BraceCompletion,
                CommandNames.Change,
                CommandNames.Close,
                CommandNames.Completions,
                CommandNames.CompletionsFull,
                CommandNames.CompletionDetails,
                CommandNames.CompileOnSaveAffectedFileList,
                CommandNames.Configure,
                CommandNames.Definition,
                CommandNames.DefinitionFull,
                CommandNames.DefinitionAndBoundSpan,
                CommandNames.DefinitionAndBoundSpanFull,
                CommandNames.Implementation,
                CommandNames.ImplementationFull,
                CommandNames.Exit,
                CommandNames.Format,
                CommandNames.Formatonkey,
                CommandNames.FormatFull,
                CommandNames.FormatonkeyFull,
                CommandNames.FormatRangeFull,
                CommandNames.Geterr,
                CommandNames.GeterrForProject,
                CommandNames.SemanticDiagnosticsSync,
                CommandNames.SyntacticDiagnosticsSync,
                CommandNames.SuggestionDiagnosticsSync,
                CommandNames.NavBar,
                CommandNames.NavBarFull,
                CommandNames.Navto,
                CommandNames.NavtoFull,
                CommandNames.NavTree,
                CommandNames.NavTreeFull,
                CommandNames.Occurrences,
                CommandNames.DocumentHighlights,
                CommandNames.DocumentHighlightsFull,
                CommandNames.JsxClosingTag,
                CommandNames.Open,
                CommandNames.Quickinfo,
                CommandNames.QuickinfoFull,
                CommandNames.References,
                CommandNames.ReferencesFull,
                CommandNames.Reload,
                CommandNames.Rename,
                CommandNames.RenameInfoFull,
                CommandNames.RenameLocationsFull,
                CommandNames.Saveto,
                CommandNames.SignatureHelp,
                CommandNames.SignatureHelpFull,
                CommandNames.Status,
                CommandNames.TypeDefinition,
                CommandNames.ProjectInfo,
                CommandNames.ReloadProjects,
                CommandNames.Unknown,
                CommandNames.OpenExternalProject,
                CommandNames.CloseExternalProject,
                CommandNames.SynchronizeProjectList,
                CommandNames.ApplyChangedToOpenFiles,
                CommandNames.EncodedSemanticClassificationsFull,
                CommandNames.Cleanup,
                CommandNames.OutliningSpans,
                CommandNames.TodoComments,
                CommandNames.Indentation,
                CommandNames.DocCommentTemplate,
                CommandNames.CompilerOptionsDiagnosticsFull,
                CommandNames.NameOrDottedNameSpan,
                CommandNames.BreakpointStatement,
                CommandNames.CompilerOptionsForInferredProjects,
                CommandNames.GetCodeFixes,
                CommandNames.GetCodeFixesFull,
                CommandNames.GetSupportedCodeFixes,
                CommandNames.GetApplicableRefactors,
                CommandNames.GetEditsForRefactor,
                CommandNames.GetEditsForRefactorFull,
                CommandNames.OrganizeImports,
                CommandNames.OrganizeImportsFull,
                CommandNames.GetEditsForFileRename,
                CommandNames.GetEditsForFileRenameFull,
                CommandNames.SelectionRange,
                CommandNames.PrepareCallHierarchy,
                CommandNames.ProvideCallHierarchyIncomingCalls,
                CommandNames.ProvideCallHierarchyOutgoingCalls,
            ];

            it("should not throw when commands are executed with invalid arguments", () => {
                let i = 0;
                for (const name of allCommandNames) {
                    const req: protocol.Request = {
                        command: name,
                        seq: i,
                        type: "request"
                    };
                    i++;
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = {};
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = null; // eslint-disable-line no-null/no-null
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = "";
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = 0;
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = [];
                    session.onMessage(JSON.stringify(req));
                }
                session.onMessage("GARBAGE NON_JSON DATA");
            });
            it("should output the response for a correctly handled message", () => {
                const req: protocol.ConfigureRequest = {
                    command: CommandNames.Configure,
                    seq: 0,
                    type: "request",
                    arguments: {
                        hostInfo: "unit test",
                        formatOptions: {
                            newLineCharacter: "`n"
                        }
                    }
                };

                session.onMessage(JSON.stringify(req));

                expect(lastSent).to.deep.equal(<protocol.ConfigureResponse>{
                    command: CommandNames.Configure,
                    type: "response",
                    success: true,
                    request_seq: 0,
                    seq: 0,
                    body: undefined,
                    performanceData: undefined,
                });
            });
        });

        describe("send", () => {
            it("is an overrideable handle which sends protocol messages over the wire", () => {
                const msg: protocol.Request = { seq: 0, type: "request", command: "" };
                const strmsg = JSON.stringify(msg);
                const len = 1 + Utils.byteLength(strmsg, "utf8");
                const resultMsg = `Content-Length: ${len}\r\n\r\n${strmsg}\n`;

                session.send = Session.prototype.send;
                assert(session.send);
                expect(session.send(msg)).to.not.exist; // eslint-disable-line @typescript-eslint/no-unused-expressions
                expect(lastWrittenToHost).to.equal(resultMsg);
            });
        });

        describe("addProtocolHandler", () => {
            it("can add protocol handlers", () => {
                const respBody = {
                    item: false
                };
                const command = "newhandle";
                const result: HandlerResponse = {
                    response: respBody,
                    responseRequired: true
                };

                session.addProtocolHandler(command, () => result);

                expect(session.executeCommand({
                    command,
                    seq: 0,
                    type: "request"
                })).to.deep.equal(result);
            });
            it("throws when a duplicate handler is passed", () => {
                const respBody = {
                    item: false
                };
                const resp: HandlerResponse = {
                    response: respBody,
                    responseRequired: true
                };
                const command = "newhandle";

                session.addProtocolHandler(command, () => resp);

                expect(() => session.addProtocolHandler(command, () => resp))
                    .to.throw(`Protocol handler already exists for command "${command}"`);
            });
        });

        describe("event", () => {
            it("can format event responses and send them", () => {
                const evt = "notify-test";
                const info = {
                    test: true
                };

                session.event(info, evt);

                expect(lastSent).to.deep.equal({
                    type: "event",
                    seq: 0,
                    event: evt,
                    body: info
                });
            });
        });

        describe("output", () => {
            it("can format command responses and send them", () => {
                const body = {
                    block: {
                        key: "value"
                    }
                };
                const command = "test";

                session.output(body, command, /*reqSeq*/ 0);

                expect(lastSent).to.deep.equal({
                    seq: 0,
                    request_seq: 0,
                    type: "response",
                    command,
                    body,
                    success: true,
                    performanceData: undefined,
                });
            });
        });
    });

    describe("unittests:: tsserver:: Session:: exceptions", () => {

        // Disable sourcemap support for the duration of the test, as sourcemapping the errors generated during this test is slow and not something we care to test
        let oldPrepare: AnyFunction;
        let oldStackTraceLimit: number;
        before(() => {
            oldStackTraceLimit = (Error as any).stackTraceLimit;
            oldPrepare = (Error as any).prepareStackTrace;
            delete (Error as any).prepareStackTrace;
            (Error as any).stackTraceLimit = 10;
        });

        after(() => {
            (Error as any).prepareStackTrace = oldPrepare;
            (Error as any).stackTraceLimit = oldStackTraceLimit;
        });

        const command = "testhandler";
        class TestSession extends Session {
            lastSent: protocol.Message | undefined;
            private exceptionRaisingHandler(_request: protocol.Request): { response?: any, responseRequired: boolean } {
                f1();
                return Debug.fail(); // unreachable, throw to make compiler happy
                function f1() {
                    throw new Error("myMessage");
                }
            }

            constructor() {
                super({
                    host: mockHost,
                    cancellationToken: nullCancellationToken,
                    useSingleInferredProject: false,
                    useInferredProjectPerProjectRoot: false,
                    typingsInstaller: undefined!, // TODO: GH#18217
                    byteLength: Utils.byteLength,
                    hrtime: process.hrtime,
                    logger: projectSystem.nullLogger,
                    canUseEvents: true
                });
                this.addProtocolHandler(command, this.exceptionRaisingHandler);
            }
            send(msg: protocol.Message) {
                this.lastSent = msg;
            }
        }

        it("raised in a protocol handler generate an event", () => {

            const session = new TestSession();

            const request = {
                command,
                seq: 0,
                type: "request"
            };

            session.onMessage(JSON.stringify(request));
            const lastSent = session.lastSent as protocol.Response;

            expect(lastSent).to.contain({
                seq: 0,
                type: "response",
                command,
                success: false
            });

            expect(lastSent.message).has.string("myMessage").and.has.string("f1");
        });
    });

    describe("unittests:: tsserver:: Session:: how Session is extendable via subclassing", () => {
        class TestSession extends Session {
            lastSent: protocol.Message | undefined;
            customHandler = "testhandler";
            constructor() {
                super({
                    host: mockHost,
                    cancellationToken: nullCancellationToken,
                    useSingleInferredProject: false,
                    useInferredProjectPerProjectRoot: false,
                    typingsInstaller: undefined!, // TODO: GH#18217
                    byteLength: Utils.byteLength,
                    hrtime: process.hrtime,
                    logger: projectSystem.createHasErrorMessageLogger().logger,
                    canUseEvents: true
                });
                this.addProtocolHandler(this.customHandler, () => {
                    return { response: undefined, responseRequired: true };
                });
            }
            send(msg: protocol.Message) {
                this.lastSent = msg;
            }
        }

        it("can override methods such as send", () => {
            const session = new TestSession();
            const body = {
                block: {
                    key: "value"
                }
            };
            const command = "test";

            session.output(body, command, /*reqSeq*/ 0);

            expect(session.lastSent).to.deep.equal({
                seq: 0,
                request_seq: 0,
                type: "response",
                command,
                body,
                success: true,
                performanceData: undefined,
            });
        });
        it("can add and respond to new protocol handlers", () => {
            const session = new TestSession();

            expect(session.executeCommand({
                seq: 0,
                type: "request",
                command: session.customHandler
            })).to.deep.equal({
                response: undefined,
                responseRequired: true
            });
        });
        it("has access to the project service", () => {
            new class extends TestSession {
                constructor() {
                    super();
                    assert(this.projectService);
                    expect(this.projectService).to.be.instanceOf(ProjectService);
                }
            }();
        });
    });

    describe("unittests:: tsserver:: Session:: an example of using the Session API to create an in-process server", () => {
        class InProcSession extends Session {
            private queue: protocol.Request[] = [];
            constructor(private client: InProcClient) {
                super({
                    host: mockHost,
                    cancellationToken: nullCancellationToken,
                    useSingleInferredProject: false,
                    useInferredProjectPerProjectRoot: false,
                    typingsInstaller: undefined!, // TODO: GH#18217
                    byteLength: Utils.byteLength,
                    hrtime: process.hrtime,
                    logger: projectSystem.createHasErrorMessageLogger().logger,
                    canUseEvents: true
                });
                this.addProtocolHandler("echo", (req: protocol.Request) => ({
                    response: req.arguments,
                    responseRequired: true
                }));
            }

            send(msg: protocol.Message) {
                this.client.handle(msg);
            }

            enqueue(msg: protocol.Request) {
                this.queue.unshift(msg);
            }

            handleRequest(msg: protocol.Request) {
                let response: protocol.Response;
                try {
                    response = this.executeCommand(msg).response as protocol.Response;
                }
                catch (e) {
                    this.output(undefined, msg.command, msg.seq, e.toString());
                    return;
                }
                if (response) {
                    this.output(response, msg.command, msg.seq);
                }
            }

            consumeQueue() {
                while (this.queue.length > 0) {
                    const elem = this.queue.pop()!;
                    this.handleRequest(elem);
                }
            }
        }

        class InProcClient {
            private server: InProcSession | undefined;
            private seq = 0;
            private callbacks: ((resp: protocol.Response) => void)[] = [];
            private eventHandlers = new Map<string, (args: any) => void>();

            handle(msg: protocol.Message): void {
                if (msg.type === "response") {
                    const response = <protocol.Response>msg;
                    const handler = this.callbacks[response.request_seq];
                    if (handler) {
                        handler(response);
                        delete this.callbacks[response.request_seq];
                    }
                }
                else if (msg.type === "event") {
                    const event = <protocol.Event>msg;
                    this.emit(event.event, event.body);
                }
            }

            emit(name: string, args: any): void {
                const handler = this.eventHandlers.get(name);
                if (handler) {
                    handler(args);
                }
            }

            on(name: string, handler: (args: any) => void): void {
                this.eventHandlers.set(name, handler);
            }

            connect(session: InProcSession): void {
                this.server = session;
            }

            execute(command: string, args: any, callback: (resp: protocol.Response) => void): void {
                if (!this.server) {
                    return;
                }
                this.seq++;
                this.server.enqueue({
                    seq: this.seq,
                    type: "request",
                    command,
                    arguments: args
                });
                this.callbacks[this.seq] = callback;
            }
        }

        it("can be constructed and respond to commands", (done) => {
            const cli = new InProcClient();
            const session = new InProcSession(cli);
            const toEcho = {
                data: true
            };
            const toEvent = {
                data: false
            };
            let responses = 0;

            // Connect the client
            cli.connect(session);

            // Add an event handler
            cli.on("testevent", (eventinfo) => {
                expect(eventinfo).to.equal(toEvent);
                responses++;
                expect(responses).to.equal(1);
            });

            // Trigger said event from the server
            session.event(toEvent, "testevent");

            // Queue an echo command
            cli.execute("echo", toEcho, (resp) => {
                assert(resp.success, resp.message);
                responses++;
                expect(responses).to.equal(2);
                expect(resp.body).to.deep.equal(toEcho);
            });

            // Queue a configure command
            cli.execute("configure", {
                hostInfo: "unit test",
                formatOptions: {
                    newLineCharacter: "`n"
                }
            }, (resp) => {
                assert(resp.success, resp.message);
                responses++;
                expect(responses).to.equal(3);
                done();
            });

            // Consume the queue and trigger the callbacks
            session.consumeQueue();
        });
    });

    describe("unittests:: tsserver:: Session:: helpers", () => {
        it(getLocationInNewDocument.name, () => {
            const text = `// blank line\nconst x = 0;`;
            const renameLocationInOldText = text.indexOf("0");
            const fileName = "/a.ts";
            const edits: FileTextChanges = {
                fileName,
                textChanges: [
                    {
                        span: { start: 0, length: 0 },
                        newText: "const newLocal = 0;\n\n",
                    },
                    {
                        span: { start: renameLocationInOldText, length: 1 },
                        newText: "newLocal",
                    },
                ],
            };
            const renameLocationInNewText = renameLocationInOldText + edits.textChanges[0].newText.length;
            const res = getLocationInNewDocument(text, fileName, renameLocationInNewText, [edits]);
            assert.deepEqual(res, { line: 4, offset: 11 });
        });
    });
}

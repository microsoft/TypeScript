/// <reference path="..\harness.ts" />

const expect: typeof _chai.expect = _chai.expect;

namespace ts.server {
    let lastWrittenToHost: string;
    const mockHost: ServerHost = {
        args: [],
        newLine: "\n",
        useCaseSensitiveFileNames: true,
        write(s): void { lastWrittenToHost = s; },
        readFile(): string { return void 0; },
        writeFile(): void {},
        resolvePath(): string { return void 0; },
        fileExists: () => false,
        directoryExists: () => false,
        getDirectories: () => [],
        createDirectory(): void {},
        getExecutingFilePath(): string { return void 0; },
        getCurrentDirectory(): string { return void 0; },
        readDirectory(): string[] { return []; },
        exit(): void { },
        setTimeout(callback, ms, ...args) { return 0; },
        clearTimeout(timeoutId) { }
    };
    const mockLogger: Logger = {
        close(): void {},
        isVerbose(): boolean { return false; },
        loggingEnabled(): boolean { return false; },
        perftrc(s: string): void {},
        info(s: string): void {},
        startGroup(): void {},
        endGroup(): void {},
        msg(s: string, type?: string): void {},
    };

    describe("the Session class", () => {
        let session: Session;
        let lastSent: protocol.Message;

        beforeEach(() => {
            session = new Session(mockHost, Utils.byteLength, process.hrtime, mockLogger);
            session.send = (msg: protocol.Message) => {
                lastSent = msg;
            };
        });

        describe("executeCommand", () => {
            it("should throw when commands are executed with invalid arguments", () => {
                const req: protocol.FileRequest = {
                    command: CommandNames.Open,
                    seq: 0,
                    type: "command",
                    arguments: {
                        file: undefined
                    }
                };

                expect(() => session.executeCommand(req)).to.throw();
            });
            it("should output an error response when a command does not exist", () => {
                const req: protocol.Request = {
                    command: "foobar",
                    seq: 0,
                    type: "command"
                };

                session.executeCommand(req);

                expect(lastSent).to.deep.equal(<protocol.Response>{
                    command: CommandNames.Unknown,
                    type: "response",
                    seq: 0,
                    message: "Unrecognized JSON command: foobar",
                    request_seq: 0,
                    success: false
                });
            });
            it("should return a tuple containing the response and if a response is required on success", () => {
                const req: protocol.ConfigureRequest = {
                    command: CommandNames.Configure,
                    seq: 0,
                    type: "command",
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
                    body: undefined
                });
            });
        });

        describe("onMessage", () => {
            it("should not throw when commands are executed with invalid arguments", () => {
                let i = 0;
                for (const name in CommandNames) {
                    if (!Object.prototype.hasOwnProperty.call(CommandNames, name)) {
                        continue;
                    }
                    const req: protocol.Request = {
                        command: name,
                        seq: i,
                        type: "command"
                    };
                    i++;
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    req.arguments = {};
                    session.onMessage(JSON.stringify(req));
                    req.seq = i;
                    i++;
                    /* tslint:disable no-null-keyword */
                    req.arguments = null;
                    /* tslint:enable no-null-keyword */
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
                    type: "command",
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
                    body: undefined
                });
            });
        });

        describe("send", () => {
            it("is an overrideable handle which sends protocol messages over the wire", () => {
                const msg = { seq: 0, type: "none" };
                const strmsg = JSON.stringify(msg);
                const len = 1 + Utils.byteLength(strmsg, "utf8");
                const resultMsg = `Content-Length: ${len}\r\n\r\n${strmsg}\n`;

                session.send = Session.prototype.send;
                assert(session.send);
                expect(session.send(msg)).to.not.exist;
                expect(lastWrittenToHost).to.equal(resultMsg);
            });
        });

        describe("addProtocolHandler", () => {
            it("can add protocol handlers", () => {
                const respBody = {
                    item: false
                };
                const command = "newhandle";
                const result = {
                    response: respBody,
                    responseRequired: true
                };

                session.addProtocolHandler(command, (req) => result);

                expect(session.executeCommand({
                    command,
                    seq: 0,
                    type: "command"
                })).to.deep.equal(result);
            });
            it("throws when a duplicate handler is passed", () => {
                const respBody = {
                    item: false
                };
                const resp = {
                    response: respBody,
                    responseRequired: true
                };
                const command = "newhandle";

                session.addProtocolHandler(command, (req) => resp);

                expect(() => session.addProtocolHandler(command, (req) => resp))
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

                session.output(body, command);

                expect(lastSent).to.deep.equal({
                    seq: 0,
                    request_seq: 0,
                    type: "response",
                    command,
                    body: body,
                    success: true
                });
            });
        });
    });

    describe("how Session is extendable via subclassing", () => {
        class TestSession extends Session {
            lastSent: protocol.Message;
            customHandler = "testhandler";
            constructor() {
                super(mockHost, Utils.byteLength, process.hrtime, mockLogger);
                this.addProtocolHandler(this.customHandler, () => {
                    return { response: undefined, responseRequired: true };
                });
            }
            send(msg: protocol.Message) {
                this.lastSent = msg;
            }
        };

        it("can override methods such as send", () => {
            const session = new TestSession();
            const body = {
                block: {
                    key: "value"
                }
            };
            const command = "test";

            session.output(body, command);

            expect(session.lastSent).to.deep.equal({
                seq: 0,
                request_seq: 0,
                type: "response",
                command,
                body: body,
                success: true
            });
        });
        it("can add and respond to new protocol handlers", () => {
            const session = new TestSession();

            expect(session.executeCommand({
                seq: 0,
                type: "command",
                command: session.customHandler
            })).to.deep.equal({
                response: undefined,
                responseRequired: true
            });
        });
        it("has access to the project service", () => {
            class ServiceSession extends TestSession {
                constructor() {
                    super();
                    assert(this.projectService);
                    expect(this.projectService).to.be.instanceOf(ProjectService);
                }
            };
            new ServiceSession();
        });
    });

    describe("an example of using the Session API to create an in-process server", () => {
        class InProcSession extends Session {
            private queue: protocol.Request[] = [];
            constructor(private client: InProcClient) {
                super(mockHost, Utils.byteLength, process.hrtime, mockLogger);
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
                    ({ response } = this.executeCommand(msg));
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
                    const elem = this.queue.pop();
                    this.handleRequest(elem);
                }
            }
        }

        class InProcClient {
            private server: InProcSession;
            private seq = 0;
            private callbacks = createMap<(resp: protocol.Response) => void>();
            private eventHandlers = createMap<(args: any) => void>();

            handle(msg: protocol.Message): void {
                if (msg.type === "response") {
                    const response = <protocol.Response>msg;
                    if (response.request_seq in this.callbacks) {
                        this.callbacks[response.request_seq](response);
                        delete this.callbacks[response.request_seq];
                    }
                }
                else if (msg.type === "event") {
                    const event = <protocol.Event>msg;
                    this.emit(event.event, event.body);
                }
            }

            emit(name: string, args: any): void {
                if (name in this.eventHandlers) {
                    this.eventHandlers[name](args);
                }
            }

            on(name: string, handler: (args: any) => void): void {
                this.eventHandlers[name] = handler;
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
                    type: "command",
                    command,
                    arguments: args
                });
                this.callbacks[this.seq] = callback;
            }
        };

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
}

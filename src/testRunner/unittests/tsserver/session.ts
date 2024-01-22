import {
    expect,
} from "chai";

import {
    incrementalVerifier,
} from "../../../harness/incrementalUtils";
import {
    createHasErrorMessageLogger,
    nullLogger,
} from "../../../harness/tsserverLogger";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";

let lastWrittenToHost: string;
const noopFileWatcher: ts.FileWatcher = { close: ts.noop };
const mockHost: ts.server.ServerHost = {
    args: [],
    newLine: "\n",
    useCaseSensitiveFileNames: true,
    write(s): void {
        lastWrittenToHost = s;
    },
    readFile: ts.returnUndefined,
    writeFile: ts.noop,
    resolvePath(): string {
        return undefined!;
    }, // TODO: GH#18217
    fileExists: () => false,
    directoryExists: () => false,
    getDirectories: () => [],
    createDirectory: ts.noop,
    getExecutingFilePath(): string {
        return "";
    },
    getCurrentDirectory(): string {
        return "";
    },
    getEnvironmentVariable(): string {
        return "";
    },
    readDirectory() {
        return [];
    },
    exit: ts.noop,
    setTimeout() {
        return 0;
    },
    clearTimeout: ts.noop,
    setImmediate: () => 0,
    clearImmediate: ts.noop,
    createHash: Harness.mockHash,
    watchFile: () => noopFileWatcher,
    watchDirectory: () => noopFileWatcher,
};

class TestSession extends ts.server.Session {
    getProjectService() {
        return this.projectService;
    }
}

describe("unittests:: tsserver:: Session:: General functionality", () => {
    let session: TestSession;
    let lastSent: ts.server.protocol.Message;

    function createSession(): TestSession {
        const opts: ts.server.SessionOptions = {
            host: mockHost,
            cancellationToken: ts.server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            byteLength: Buffer.byteLength,
            hrtime: process.hrtime,
            logger: nullLogger(),
            canUseEvents: true,
            incrementalVerifier,
        };
        return new TestSession(opts);
    }

    // Disable sourcemap support for the duration of the test, as sourcemapping the errors generated during this test is slow and not something we care to test
    let oldPrepare: ts.AnyFunction;
    before(() => {
        oldPrepare = (Error as any).prepareStackTrace;
        delete (Error as any).prepareStackTrace;
    });

    after(() => {
        (Error as any).prepareStackTrace = oldPrepare;
    });

    beforeEach(() => {
        session = createSession();
        session.send = (msg: ts.server.protocol.Message) => {
            lastSent = msg;
        };
    });

    describe("executeCommand", () => {
        it("should throw when commands are executed with invalid arguments", () => {
            const req: ts.server.protocol.FileRequest = {
                command: ts.server.protocol.CommandTypes.Open,
                seq: 0,
                type: "request",
                arguments: {
                    file: undefined!, // TODO: GH#18217
                },
            };

            expect(() => session.executeCommand(req)).to.throw();
        });
        it("should output an error response when a command does not exist", () => {
            const req: ts.server.protocol.Request = {
                command: "foobar",
                seq: 0,
                type: "request",
            };

            session.executeCommand(req);

            const expected: ts.server.protocol.Response = {
                command: ts.server.protocol.CommandTypes.Unknown,
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
            const req: ts.server.protocol.ConfigureRequest = {
                command: ts.server.protocol.CommandTypes.Configure,
                seq: 0,
                type: "request",
                arguments: {
                    hostInfo: "unit test",
                    formatOptions: {
                        newLineCharacter: "`n",
                    },
                },
            };

            expect(session.executeCommand(req)).to.deep.equal({
                responseRequired: false,
            });
            expect(lastSent).to.deep.equal({
                command: ts.server.protocol.CommandTypes.Configure,
                type: "response",
                success: true,
                request_seq: 0,
                seq: 0,
                body: undefined,
                performanceData: undefined,
            });
        });
        it("should handle literal types in request", () => {
            const configureRequest: ts.server.protocol.ConfigureRequest = {
                command: ts.server.protocol.CommandTypes.Configure,
                seq: 0,
                type: "request",
                arguments: {
                    formatOptions: {
                        indentStyle: ts.server.protocol.IndentStyle.Block,
                    },
                },
            };

            session.onMessage(JSON.stringify(configureRequest));

            assert.equal(session.getProjectService().getFormatCodeOptions("" as ts.server.NormalizedPath).indentStyle, ts.IndentStyle.Block);

            const setOptionsRequest: ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest = {
                command: ts.server.protocol.CommandTypes.CompilerOptionsForInferredProjects,
                seq: 1,
                type: "request",
                arguments: {
                    options: {
                        module: ts.server.protocol.ModuleKind.System,
                        target: ts.server.protocol.ScriptTarget.ES5,
                        jsx: ts.server.protocol.JsxEmit.React,
                        newLine: ts.server.protocol.NewLineKind.Lf,
                        moduleResolution: ts.server.protocol.ModuleResolutionKind.Node,
                    },
                },
            };
            session.onMessage(JSON.stringify(setOptionsRequest));
            assert.deepEqual(
                session.getProjectService().getCompilerOptionsForInferredProjects(),
                {
                    module: ts.ModuleKind.System,
                    target: ts.ScriptTarget.ES5,
                    jsx: ts.JsxEmit.React,
                    newLine: ts.NewLineKind.LineFeed,
                    moduleResolution: ts.ModuleResolutionKind.Node10,
                    allowNonTsExtensions: true, // injected by tsserver
                } as ts.CompilerOptions,
            );
        });

        it("Status request gives ts.version", () => {
            const req: ts.server.protocol.StatusRequest = {
                command: ts.server.protocol.CommandTypes.Status,
                seq: 0,
                type: "request",
            };

            const expected: ts.server.protocol.StatusResponseBody = {
                version: ts.version,
            };
            assert.deepEqual(session.executeCommand(req).response, expected);
        });
    });

    describe("onMessage", () => {
        const allCommandNames: ts.server.protocol.CommandTypes[] = Object.values((ts.server.protocol as any).CommandTypes);

        it("should not throw when commands are executed with invalid arguments", () => {
            let i = 0;
            for (const name of allCommandNames) {
                const req: ts.server.protocol.Request = {
                    command: name,
                    seq: i,
                    type: "request",
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
            const req: ts.server.protocol.ConfigureRequest = {
                command: ts.server.protocol.CommandTypes.Configure,
                seq: 0,
                type: "request",
                arguments: {
                    hostInfo: "unit test",
                    formatOptions: {
                        newLineCharacter: "`n",
                    },
                },
            };

            session.onMessage(JSON.stringify(req));

            expect(lastSent).to.deep.equal({
                command: ts.server.protocol.CommandTypes.Configure,
                type: "response",
                success: true,
                request_seq: 0,
                seq: 0,
                body: undefined,
                performanceData: undefined,
            } as ts.server.protocol.ConfigureResponse);
        });
    });

    describe("send", () => {
        it("is an overrideable handle which sends protocol messages over the wire", () => {
            const msg: ts.server.protocol.Request = { seq: 0, type: "request", command: "" };
            const strmsg = JSON.stringify(msg);
            const len = 1 + Buffer.byteLength(strmsg, "utf8");
            const resultMsg = `Content-Length: ${len}\r\n\r\n${strmsg}\n`;

            session.send = ts.server.Session.prototype.send;
            assert(session.send);
            expect(session.send(msg)).to.not.exist; // eslint-disable-line @typescript-eslint/no-unused-expressions
            expect(lastWrittenToHost).to.equal(resultMsg);
        });
    });

    describe("addProtocolHandler", () => {
        it("can add protocol handlers", () => {
            const respBody = {
                item: false,
            };
            const command = "newhandle";
            const result: ts.server.HandlerResponse = {
                response: respBody,
                responseRequired: true,
            };

            session.addProtocolHandler(command, () => result);

            expect(session.executeCommand({
                command,
                seq: 0,
                type: "request",
            })).to.deep.equal(result);
        });
        it("throws when a duplicate handler is passed", () => {
            const respBody = {
                item: false,
            };
            const resp: ts.server.HandlerResponse = {
                response: respBody,
                responseRequired: true,
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
                test: true,
            };

            session.event(info, evt);

            expect(lastSent).to.deep.equal({
                type: "event",
                seq: 0,
                event: evt,
                body: info,
            });
        });
    });

    describe("output", () => {
        it("can format command responses and send them", () => {
            const body = {
                block: {
                    key: "value",
                },
            };
            const command = "test";

            session.doOutput(body, command, /*reqSeq*/ 0, /*success*/ true);

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
    let oldPrepare: ts.AnyFunction;
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
    class TestSession extends ts.server.Session {
        lastSent: ts.server.protocol.Message | undefined;
        private exceptionRaisingHandler(_request: ts.server.protocol.Request): { response?: any; responseRequired: boolean; } {
            f1();
            return ts.Debug.fail(); // unreachable, throw to make compiler happy
            function f1() {
                throw new Error("myMessage");
            }
        }

        constructor() {
            super({
                host: mockHost,
                cancellationToken: ts.server.nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined!, // TODO: GH#18217
                byteLength: Buffer.byteLength,
                hrtime: process.hrtime,
                logger: nullLogger(),
                canUseEvents: true,
                incrementalVerifier,
            });
            this.addProtocolHandler(command, this.exceptionRaisingHandler);
        }
        override send(msg: ts.server.protocol.Message) {
            this.lastSent = msg;
        }
    }

    it("raised in a protocol handler generate an event", () => {
        const session = new TestSession();

        const request = {
            command,
            seq: 0,
            type: "request",
        };

        session.onMessage(JSON.stringify(request));
        const lastSent = session.lastSent as ts.server.protocol.Response;

        expect(lastSent).to.contain({
            seq: 0,
            type: "response",
            command,
            success: false,
        });

        expect(lastSent.message).has.string("myMessage").and.has.string("f1");
    });
});

describe("unittests:: tsserver:: Session:: how Session is extendable via subclassing", () => {
    class TestSession extends ts.server.Session {
        lastSent: ts.server.protocol.Message | undefined;
        customHandler = "testhandler";
        constructor() {
            super({
                host: mockHost,
                cancellationToken: ts.server.nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined!, // TODO: GH#18217
                byteLength: Buffer.byteLength,
                hrtime: process.hrtime,
                logger: createHasErrorMessageLogger(),
                canUseEvents: true,
                incrementalVerifier,
            });
            this.addProtocolHandler(this.customHandler, () => {
                return { response: undefined, responseRequired: true };
            });
        }
        override send(msg: ts.server.protocol.Message) {
            this.lastSent = msg;
        }
    }

    it("can override methods such as send", () => {
        const session = new TestSession();
        const body = {
            block: {
                key: "value",
            },
        };
        const command = "test";

        session.doOutput(body, command, /*reqSeq*/ 0, /*success*/ true);

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
            command: session.customHandler,
        })).to.deep.equal({
            response: undefined,
            responseRequired: true,
        });
    });
    it("has access to the project service", () => {
        new class extends TestSession {
            constructor() {
                super();
                assert(this.projectService);
                expect(this.projectService).to.be.instanceOf(ts.server.ProjectService);
            }
        }();
    });
});

describe("unittests:: tsserver:: Session:: an example of using the Session API to create an in-process server", () => {
    class InProcSession extends ts.server.Session {
        private queue: ts.server.protocol.Request[] = [];
        constructor(private client: InProcClient) {
            super({
                host: mockHost,
                cancellationToken: ts.server.nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined!, // TODO: GH#18217
                byteLength: Buffer.byteLength,
                hrtime: process.hrtime,
                logger: createHasErrorMessageLogger(),
                canUseEvents: true,
                incrementalVerifier,
            });
            this.addProtocolHandler("echo", (req: ts.server.protocol.Request) => ({
                response: req.arguments,
                responseRequired: true,
            }));
        }

        override send(msg: ts.server.protocol.Message) {
            this.client.handle(msg);
        }

        enqueue(msg: ts.server.protocol.Request) {
            this.queue.unshift(msg);
        }

        handleRequest(msg: ts.server.protocol.Request) {
            let response: ts.server.protocol.Response;
            try {
                response = this.executeCommand(msg).response as ts.server.protocol.Response;
            }
            catch (e) {
                this.doOutput(/*info*/ undefined, msg.command, msg.seq, /*success*/ false, e.toString());
                return;
            }
            if (response) {
                this.doOutput(response, msg.command, msg.seq, /*success*/ true);
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
        private callbacks: ((resp: ts.server.protocol.Response) => void)[] = [];
        private eventHandlers = new Map<string, (args: any) => void>();

        handle(msg: ts.server.protocol.Message): void {
            if (msg.type === "response") {
                const response = msg as ts.server.protocol.Response;
                const handler = this.callbacks[response.request_seq];
                if (handler) {
                    handler(response);
                    delete this.callbacks[response.request_seq];
                }
            }
            else if (msg.type === "event") {
                const event = msg as ts.server.protocol.Event;
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

        execute(command: string, args: any, callback: (resp: ts.server.protocol.Response) => void): void {
            if (!this.server) {
                return;
            }
            this.seq++;
            this.server.enqueue({
                seq: this.seq,
                type: "request",
                command,
                arguments: args,
            });
            this.callbacks[this.seq] = callback;
        }
    }

    it("can be constructed and respond to commands", done => {
        const cli = new InProcClient();
        const session = new InProcSession(cli);
        const toEcho = {
            data: true,
        };
        const toEvent = {
            data: false,
        };
        let responses = 0;

        // Connect the client
        cli.connect(session);

        // Add an event handler
        cli.on("testevent", eventinfo => {
            expect(eventinfo).to.equal(toEvent);
            responses++;
            expect(responses).to.equal(1);
        });

        // Trigger said event from the server
        session.event(toEvent, "testevent");

        // Queue an echo command
        cli.execute("echo", toEcho, resp => {
            assert(resp.success, resp.message);
            responses++;
            expect(responses).to.equal(2);
            expect(resp.body).to.deep.equal(toEcho);
        });

        // Queue a configure command
        cli.execute("configure", {
            hostInfo: "unit test",
            formatOptions: {
                newLineCharacter: "`n",
            },
        }, resp => {
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
    it(ts.server.getLocationInNewDocument.name, () => {
        const text = `// blank line\nconst x = 0;`;
        const renameLocationInOldText = text.indexOf("0");
        const fileName = "/a.ts";
        const edits: ts.FileTextChanges = {
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
        const res = ts.server.getLocationInNewDocument(text, fileName, renameLocationInNewText, [edits]);
        assert.deepEqual(res, { line: 4, offset: 11 });
    });
});

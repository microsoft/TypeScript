/// <reference path="..\..\..\src\harness\harness.ts" />

module ts.server {
	let lastWrittenToHost: string,
	mockHost: ServerHost = {
		args: [],
		newLine: '\n',
		useCaseSensitiveFileNames: true,
		write: (s) => lastWrittenToHost = s,
		readFile: () => void 0,
		writeFile: () => void 0,
		resolvePath: () => void 0,
		fileExists: () => false,
		directoryExists: () => false,
		createDirectory: () => void 0,
		getExecutingFilePath: () => void 0,
		getCurrentDirectory: () => void 0,
		readDirectory: () => void 0,
		exit: () => void 0
	},
	mockLogger: Logger = {
        close(): void {},
        isVerbose(): boolean { return false; },
        loggingEnabled(): boolean { return false; },
        perftrc(s: string): void {},
        info(s: string): void {},
        startGroup(): void {},
        endGroup(): void {},
        msg(s: string, type?: string): void {},
	};
	
	describe('the Session class', () => {
		let session: Session,
			lastSent: protocol.Message;

		beforeEach(() => {
			session = new Session(mockHost, Buffer.byteLength, process.hrtime, mockLogger);
			session.send = (msg: protocol.Message) => {
				lastSent = msg;
			};
		});

		describe('executeCommand', () => {
			it('should throw when commands are executed with invalid arguments', () => {
				let req : protocol.FileRequest = {
					command: CommandNames.Open,
					seq: 0,
					type: 'command',
					arguments: {
						file: undefined
					}
				};

				expect(() => session.executeCommand(req)).to.throw();
			});
			it('should output an error response when a command does not exist', () => {
				let req : protocol.Request = {
					command: 'foobar',
					seq: 0,
					type: 'command'
				};

				session.executeCommand(req);

				expect(lastSent).to.deep.equal(<protocol.Response>{
					command: CommandNames.Unknown,
					type: 'response',
					seq: 0,
					message: 'Unrecognized JSON command: foobar',
					request_seq: 0,
					success: false
				});
			});
			it('should return a tuple containing the response and if a response is required on success', () => {
				let req : protocol.ConfigureRequest = {
					command: CommandNames.Configure,
					seq: 0,
					type: 'command',
					arguments: {
						hostInfo: 'unit test',
						formatOptions: {
							newLineCharacter: '`n'
						}
					}
				};

				expect(session.executeCommand(req)).to.deep.equal({
					responseRequired: false
				});
				expect(lastSent).to.deep.equal({
					command: CommandNames.Configure,
					type: 'response',
					success: true,
					request_seq: 0,
					seq: 0,
					body: undefined
				});
			});
		});

		describe('onMessage', () => {
			it('should not throw when commands are executed with invalid arguments', () => {
				let i = 0;
				for (name in CommandNames) {
					if (!Object.prototype.hasOwnProperty.call(CommandNames, name)) {
						continue;
					}
					let req : protocol.Request = {
						command: name,
						seq: i++,
						type: 'command'
					};
					session.onMessage(JSON.stringify(req));
					req.seq += 2;
					req.arguments = {};
					session.onMessage(JSON.stringify(req));
					req.seq += 2;
					req.arguments = null;
					session.onMessage(JSON.stringify(req));
				}
			});
			it('should output the response for a correctly handled message', () => {
				let req : protocol.ConfigureRequest = {
					command: CommandNames.Configure,
					seq: 0,
					type: 'command',
					arguments: {
						hostInfo: 'unit test',
						formatOptions: {
							newLineCharacter: '`n'
						}
					}
				};

				session.onMessage(JSON.stringify(req));

				expect(lastSent).to.deep.equal(<protocol.ConfigureResponse>{
					command: CommandNames.Configure,
					type: 'response',
					success: true,
					request_seq: 0,
					seq: 0,
					body: undefined
				});
			});
		});

		describe('exit', () => {
			it('is a noop which can be handled by subclasses', () => {
				session.exit(); // Does nothing, should keep running tests
				expect(session).to.exist;
			});
		});

		describe('send', () => {
			it('is an overrideable handle which sends protocol messages over the wire', () => {
				let msg = {seq: 0, type: 'none'},
				strmsg = JSON.stringify(msg),
				len = 1 + Buffer.byteLength(strmsg, 'utf8'),
				resultMsg = `Content-Length: ${len}\r\n\r\n${strmsg}\n`;

				session.send = Session.prototype.send;
				assert(session.send);
				expect(session.send(msg)).to.not.exist;
				expect(lastWrittenToHost).to.equal(resultMsg);
			});
		});

		describe('addProtocolHandler', () => {
			it('can add protocol handlers', () => {
				let respBody = {
					item: false
				},
				command = 'newhandle',
				result = {
					response: respBody,
					responseRequired: true
				};

				session.addProtocolHandler(command, (req) => result);

				expect(session.executeCommand({
					command,
					seq: 0,
					type: 'command'
				})).to.deep.equal(result);
			});
			it('throws when a duplicate handler is passed', () => {
				let respBody = {
					item: false
				},
				resp = {
					response: respBody,
					responseRequired: true
				},
				command = 'newhandle';

				session.addProtocolHandler(command, (req) => resp);

				expect(() => session.addProtocolHandler(command, (req) => resp))
				.to.throw(`Protocol handler already exists for command "${command}"`);
			});
		});
		
		describe('event', () => {
			it('can format event responses and send them', () => {
				let evt = 'notify-test',
				info = {
					test: true
				};

				session.event(info, evt);

				expect(lastSent).to.deep.equal({
					type: 'event',
					seq: 0,
					event: evt,
					body: info
				});
			});
		});

		describe('output', () => {
			it('can format command responses and send them', () => {
				let body = {
					block: {
						key: 'value'
					}
				},
				command = 'test';

				session.output(body, command);

				expect(lastSent).to.deep.equal({
					seq: 0,
					request_seq: 0,
					type: 'response',
					command,
					body: body,
					success: true
				});
			});
		});
	});

	describe('how Session is extendable via subclassing', () => {
		let TestSession = class extends Session {
			lastSent: protocol.Message;
			customHandler: string = 'testhandler';
			constructor(){
				super(mockHost, Buffer.byteLength, process.hrtime, mockLogger);
				this.addProtocolHandler(this.customHandler, () => {
					return {response: undefined, responseRequired: true};
				});
			}
			send(msg: protocol.Message) {
				this.lastSent = msg;
			}
		};

		it('can override methods such as send', () => {
			let session = new TestSession(),
			body = {
				block: {
					key: 'value'
				}
			},
			command = 'test';

			session.output(body, command);

			expect(session.lastSent).to.deep.equal({
				seq: 0,
				request_seq: 0,
				type: 'response',
				command,
				body: body,
				success: true
			});
		});
		it('can add and respond to new protocol handlers', () => {
			let session = new TestSession();

			expect(session.executeCommand({
				seq: 0,
				type: 'command',
				command: session.customHandler
			})).to.deep.equal({
				response: undefined,
				responseRequired: true
			});
		});
		it('has access to the project service', () => {
			let ServiceSession = class extends TestSession {
				constructor() {
					super();
					assert(this.projectService);
					expect(this.projectService).to.be.instanceOf(ProjectService);
				}
			};
			new ServiceSession();
		});
	});

	describe('an example of using the Session API to create an in-process server', () => {
		let inProcHost: ServerHost = {
			args: [],
			newLine: '\n',
			useCaseSensitiveFileNames: true,
			write: (s) => lastWrittenToHost = s,
			readFile: () => void 0,
			writeFile: () => void 0,
			resolvePath: () => void 0,
			fileExists: () => false,
			directoryExists: () => false,
			createDirectory: () => void 0,
			getExecutingFilePath: () => void 0,
			getCurrentDirectory: () => void 0,
			readDirectory: () => void 0,
			exit: () => void 0
		},
		InProcSession = class extends Session {
			private queue: protocol.Request[] = [];
			constructor(private client: {handle: (msg: protocol.Message) => void}) {
				super(inProcHost, Buffer.byteLength, process.hrtime, mockLogger);
				this.addProtocolHandler('echo', (req: protocol.Request) => ({
					response: req.arguments,
					responseRequired: true
				}));
			}
			
			send(msg: protocol.Message) {
				this.client.handle(msg);
			}

			enqueue(msg: protocol.Request) {
				this.queue = [msg].concat(this.queue);
			}
			
			handleRequest(msg: protocol.Request) {
				let response: protocol.Response;
				try {
					response = this.executeCommand(msg).response;
				} catch (e) {
					this.output(undefined, msg.command, msg.seq, e.toString());
					return;
				}
				if (response) {
					this.output(response, msg.command, msg.seq);
				}
			}

			consumeQueue() {
				while (this.queue.length > 0) {
					let elem = this.queue[this.queue.length - 1];
					this.queue = this.queue.slice(0, this.queue.length - 1);
					this.handleRequest(elem);
				}
			}
		},
		InProcClient = class {
			private server: Session & {enqueue: (msg: protocol.Request) => void};
			private seq: number = 0;
			private callbacks: ts.Map<(resp: protocol.Response) => void> = {};
			private eventHandlers: ts.Map<(args: any) => void> = {};

			handle(msg: protocol.Message): void {
				if (msg.type === 'response') {
					let response = <protocol.Response>msg;
					if (this.callbacks[response.request_seq]) {
						this.callbacks[response.request_seq](response);
						delete this.callbacks[response.request_seq];
					}
				} else if (msg.type === 'event') {
					let event = <protocol.Event>msg;
					this.emit(event.event, event.body);
				}
			}

			emit(name: string, args: any): void {
				if (!this.eventHandlers[name]) {
					return;
				}
				this.eventHandlers[name](args);
			}

			on(name: string, handler: (args: any) => void): void {
				this.eventHandlers[name] = handler;
			}

			connect(session: Session & {enqueue: (msg: protocol.Request) => void}): void {
				this.server = session;
			}
			
			execute(command: string, args: any, callback: (resp: protocol.Response) => void): void {
				if (!this.server) {
					return;
				}
				this.seq++;
				this.server.enqueue({
					seq: this.seq,
					type: 'command',
					command,
					arguments: args
				});
				this.callbacks[this.seq] = callback;
			}
		};
		
		it('can be constructed and respond to commands', (done) => {
			let cli = new InProcClient(),
			session = new InProcSession(cli),
			toEcho = {
				data: true
			},
			toEvent = {
				data: false	
			},
			responses = 0;

			// Connect the client
			cli.connect(session);
			
			// Add an event handler
			cli.on('testevent', (eventinfo) => {
				expect(eventinfo).to.equal(toEvent);
				responses++;
				expect(responses).to.equal(1);
			});
			
			// Trigger said event from the server
			session.event(toEvent, 'testevent');
			
			// Queue an echo command
			cli.execute('echo', toEcho, (resp) => {
				assert(resp.success, resp.message);
				responses++;
				expect(responses).to.equal(2);
				expect(resp.body).to.deep.equal(toEcho);
			});
			
			// Queue a configure command
			cli.execute('configure', {
				hostInfo: 'unit test',
				formatOptions: {
					newLineCharacter: '`n'
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
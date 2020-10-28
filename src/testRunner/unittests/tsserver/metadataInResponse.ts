namespace ts.projectSystem {
    describe("unittests:: tsserver:: with metadata in response", () => {
        const metadata = "Extra Info";
        function verifyOutput(host: TestServerHost, expectedResponse: protocol.Response) {
            const output = host.getOutput().map(mapOutputToJson);
            assert.deepEqual(output, [expectedResponse]);
            host.clearOutput();
        }

        function verifyCommandWithMetadata<T extends server.protocol.Request, U = undefined>(session: TestSession, host: TestServerHost, command: Partial<T>, expectedResponseBody: U) {
            command.seq = session.getSeq();
            command.type = "request";
            session.onMessage(JSON.stringify(command));
            verifyOutput(host, expectedResponseBody ?
                { seq: 0, type: "response", command: command.command!, request_seq: command.seq, success: true, body: expectedResponseBody, metadata } :
                { seq: 0, type: "response", command: command.command!, request_seq: command.seq, success: false, message: "No content available." }
            );
        }

        const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: { plugins: [{ name: "myplugin" }] }
            })
        };
        function createHostWithPlugin(files: readonly File[]) {
            const host = createServerHost(files);
            host.require = (_initialPath, moduleName) => {
                assert.equal(moduleName, "myplugin");
                return {
                    module: () => ({
                        create(info: server.PluginCreateInfo) {
                            const proxy = Harness.LanguageService.makeDefaultProxy(info);
                            proxy.getCompletionsAtPosition = (filename, position, options) => {
                                const result = info.languageService.getCompletionsAtPosition(filename, position, options);
                                if (result) {
                                    result.metadata = metadata;
                                }
                                return result;
                            };
                            return proxy;
                        }
                    }),
                    error: undefined
                };
            };
            return host;
        }

        describe("With completion requests", () => {
            const completionRequestArgs: protocol.CompletionsRequestArgs = {
                file: aTs.path,
                line: 1,
                offset: aTs.content.indexOf("this.") + 1 + "this.".length
            };
            const expectedCompletionEntries: readonly protocol.CompletionEntry[] = [
                { name: "foo", kind: ScriptElementKind.memberFunctionElement, kindModifiers: "", sortText: Completions.SortText.LocationPriority },
                { name: "prop", kind: ScriptElementKind.memberVariableElement, kindModifiers: "", sortText: Completions.SortText.LocationPriority }
            ];

            it("can pass through metadata when the command returns array", () => {
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest, readonly protocol.CompletionEntry[]>(session, host, {
                    command: protocol.CommandTypes.Completions,
                    arguments: completionRequestArgs
                }, expectedCompletionEntries);
            });

            it("can pass through metadata when the command returns object", () => {
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest, protocol.CompletionInfo>(session, host, {
                    command: protocol.CommandTypes.CompletionInfo,
                    arguments: completionRequestArgs
                }, {
                    isGlobalCompletion: false,
                    isMemberCompletion: true,
                    isNewIdentifierLocation: false,
                    optionalReplacementSpan: {
                        start: { line: 1, offset: aTs.content.indexOf("prop;") + 1 },
                        end: { line: 1, offset: aTs.content.indexOf("prop;") + 1 + "prop".length }
                    },
                    entries: expectedCompletionEntries
                });
            });

            it("returns undefined correctly", () => {
                const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { const x = 0; } }` };
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest>(session, host, {
                    command: protocol.CommandTypes.Completions,
                    arguments: { file: aTs.path, line: 1, offset: aTs.content.indexOf("x") + 1 }
                }, /*expectedResponseBody*/ undefined);
            });
        });
    });
}

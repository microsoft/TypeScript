namespace ts.projectSystem {
    describe("unittests:: tsserver:: plugins loading", () => {
        const testProtocolCommand = "testProtocolCommand";
        const testProtocolCommandRequest = "testProtocolCommandRequest";
        const testProtocolCommandResponse = "testProtocolCommandResponse";

        function createHostWithPlugin(files: readonly File[]) {
            const host = createServerHost(files);
            const pluginsLoaded: string[] = [];
            const protocolHandlerRequests: [string, string][] = [];
            host.require = (_initialPath, moduleName) => {
                pluginsLoaded.push(moduleName);
                return {
                    module: () => ({
                        create(info: server.PluginCreateInfo) {
                            info.session?.addProtocolHandler(testProtocolCommand, request => {
                                protocolHandlerRequests.push([request.command, request.arguments]);
                                return {
                                    response: testProtocolCommandResponse
                                };
                            });
                            return Harness.LanguageService.makeDefaultProxy(info);
                        }
                    }),
                    error: undefined
                };
            };
            return { host, pluginsLoaded, protocolHandlerRequests };
        }

        it("With local plugins", () => {
            const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
            const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
            const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        plugins: [
                            ...[...expectedToLoad, ...notToLoad].map(name => ({ name })),
                            { transform: "some-transform" }
                        ]
                    }
                })
            };
            const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, libFile]);
            const service = createProjectService(host);
            service.openClientFile(aTs.path);
            assert.deepEqual(pluginsLoaded, expectedToLoad);
        });

        it("With global plugins", () => {
            const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
            const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
            const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}"
            };
            const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, libFile]);
            const service = createProjectService(host, { globalPlugins: [...expectedToLoad, ...notToLoad] });
            service.openClientFile(aTs.path);
            assert.deepEqual(pluginsLoaded, expectedToLoad);
        });

        it("With session and custom protocol message", () => {
            const pluginName = "some-plugin";
            const expectedToLoad = [pluginName];
            const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        plugins: [
                            { name: pluginName }
                        ]
                    }
                })
            };

            const { host, pluginsLoaded, protocolHandlerRequests } = createHostWithPlugin([aTs, tsconfig, libFile]);
            const session = createSession(host);

            const service = createProjectService(host, { session });
            service.openClientFile(aTs.path);
            assert.deepEqual(pluginsLoaded, expectedToLoad);

            const resp = session.executeCommandSeq({
                command: testProtocolCommand,
                arguments: testProtocolCommandRequest
            });

            assert.strictEqual(protocolHandlerRequests.length, 1);
            const [command, args] = protocolHandlerRequests[0];
            assert.strictEqual(command, testProtocolCommand);
            assert.strictEqual(args, testProtocolCommandRequest);

            const expectedResp: server.HandlerResponse = {
                response: testProtocolCommandResponse
            };
            assert.deepEqual(resp, expectedResp);
        });
    });
}
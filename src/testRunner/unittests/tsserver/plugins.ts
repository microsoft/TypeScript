import * as ts from "../../_namespaces/ts";
import * as Harness from "../../_namespaces/Harness";

describe("unittests:: tsserver:: plugins loading", () => {
    const testProtocolCommand = "testProtocolCommand";
    const testProtocolCommandRequest = "testProtocolCommandRequest";
    const testProtocolCommandResponse = "testProtocolCommandResponse";

    function createHostWithPlugin(files: readonly ts.projectSystem.File[]) {
        const host = ts.projectSystem.createServerHost(files);
        const pluginsLoaded: string[] = [];
        const protocolHandlerRequests: [string, string][] = [];
        host.require = (_initialPath, moduleName) => {
            pluginsLoaded.push(moduleName);
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
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
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: ts.projectSystem.File = {
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
        const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, ts.projectSystem.libFile]);
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(aTs.path);
        assert.deepEqual(pluginsLoaded, expectedToLoad);
    });

    it("With global plugins", () => {
        const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
        const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: "{}"
        };
        const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, ts.projectSystem.libFile]);
        const service = ts.projectSystem.createProjectService(host, { globalPlugins: [...expectedToLoad, ...notToLoad] });
        service.openClientFile(aTs.path);
        assert.deepEqual(pluginsLoaded, expectedToLoad);
    });

    it("With session and custom protocol message", () => {
        const pluginName = "some-plugin";
        const expectedToLoad = [pluginName];
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    plugins: [
                        { name: pluginName }
                    ]
                }
            })
        };

        const { host, pluginsLoaded, protocolHandlerRequests } = createHostWithPlugin([aTs, tsconfig, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host);

        const service = ts.projectSystem.createProjectService(host, { session });
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

        const expectedResp: ts.server.HandlerResponse = {
            response: testProtocolCommandResponse
        };
        assert.deepEqual(resp, expectedResp);
    });

    it("gets external files with config file reload", () => {
        const aTs: ts.projectSystem.File = { path: `${ts.tscWatch.projectRoot}/a.ts`, content: `export const x = 10;` };
        const tsconfig: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    plugins: [{ name: "some-plugin" }]
                }
            })
        };

        const externalFiles: ts.MapLike<string[]> = {
            "some-plugin": ["someFile.txt"],
            "some-other-plugin": ["someOtherFile.txt"],
        };

        const host = ts.projectSystem.createServerHost([aTs, tsconfig, ts.projectSystem.libFile]);
        host.require = (_initialPath, moduleName) => {
            session.logger.logs.push(`Require:: ${moduleName}`);
            return {
                module: (): ts.server.PluginModule => {
                    session.logger.logs.push(`PluginFactory Invoke`);
                    return {
                        create: Harness.LanguageService.makeDefaultProxy,
                        getExternalFiles: () => externalFiles[moduleName]
                    };
                },
                error: undefined
            };
        };
        const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([aTs], session);
        session.logger.logs.push(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        host.writeFile(tsconfig.path, JSON.stringify({
            compilerOptions: {
                plugins: [{ name: "some-other-plugin" }]
            }
        }));
        host.runQueuedTimeoutCallbacks();
        session.logger.logs.push(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        ts.projectSystem.baselineTsserverLogs("plugins", "gets external files with config file reload", session);
    });
});
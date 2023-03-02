import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    openFilesForSession,
} from "./helpers";

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

        const expectedResp: ts.server.HandlerResponse = {
            response: testProtocolCommandResponse
        };
        assert.deepEqual(resp, expectedResp);
    });

    it("gets external files with config file reload", () => {
        const aTs: File = { path: `/user/username/projects/myproject/a.ts`, content: `export const x = 10;` };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
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

        const host = createServerHost([aTs, tsconfig, libFile]);
        host.require = (_initialPath, moduleName) => {
            session.logger.log(`Require:: ${moduleName}`);
            return {
                module: (): ts.server.PluginModule => {
                    session.logger.log(`PluginFactory Invoke`);
                    return {
                        create: Harness.LanguageService.makeDefaultProxy,
                        getExternalFiles: () => externalFiles[moduleName]
                    };
                },
                error: undefined
            };
        };
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs], session);
        session.logger.log(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        host.writeFile(tsconfig.path, JSON.stringify({
            compilerOptions: {
                plugins: [{ name: "some-other-plugin" }]
            }
        }));
        host.runQueuedTimeoutCallbacks();
        session.logger.log(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        baselineTsserverLogs("plugins", "gets external files with config file reload", session);
    });
});

describe("unittests:: tsserver:: plugins overriding getSupportedCodeFixes", () => {
    it("getSupportedCodeFixes can be proxied", () => {
        const aTs: File = {
            path: "/a.ts",
            content: `class c { prop = "hello"; foo() { const x = 0; } }`
        };
        const bTs: File = {
            path: "/b.ts",
            content: aTs.content
        };
        const cTs: File = {
            path: "/c.ts",
            content: aTs.content
        };
        const config: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: { plugins: [{ name: "myplugin" }] }
            })
        };
        const host = createServerHost([aTs, bTs, cTs, config, libFile]);
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = Harness.LanguageService.makeDefaultProxy(info);
                        proxy.getSupportedCodeFixes = (fileName) => {
                            switch (fileName) {
                                case "/a.ts":
                                    return ["a"];
                                case "/b.ts":
                                    return ["b"];
                                default:
                                    // Make this stable list of single item so we dont have to update the baseline for every additional error
                                    return [info.languageService.getSupportedCodeFixes(fileName)[0]];
                            }
                        };
                        return proxy;
                    }
                }),
                error: undefined
            };
        };
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs, bTs, cTs], session);
        // Without arguments
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { file: aTs.path }
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { file: bTs.path }
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { file: cTs.path }
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { projectFileName: config.path }
        });

        baselineTsserverLogs("plugins", "getSupportedCodeFixes can be proxied", session);
    });
});
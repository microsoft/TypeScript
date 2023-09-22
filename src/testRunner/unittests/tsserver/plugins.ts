import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
    openFilesForSession,
    TestSessionOptions,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: plugins:: loading", () => {
    const testProtocolCommand = "testProtocolCommand";
    const testProtocolCommandRequest = "testProtocolCommandRequest";
    const testProtocolCommandResponse = "testProtocolCommandResponse";

    function createHostWithPlugin(files: readonly File[], opts?: Partial<TestSessionOptions>) {
        const host = createServerHost(files);
        host.require = (_initialPath, moduleName) => {
            session.logger.log(`Loading plugin: ${moduleName}`);
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        info.session?.addProtocolHandler(testProtocolCommand, request => {
                            session.logger.log(`addProtocolHandler: ${JSON.stringify(request, undefined, " ")}`);
                            return {
                                response: testProtocolCommandResponse,
                            };
                        });
                        return Harness.LanguageService.makeDefaultProxy(info);
                    },
                }),
                error: undefined,
            };
        };
        const session = createSession(host, { ...opts, logger: createLoggerWithInMemoryLogs(host) });
        return { host, session };
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
                        { transform: "some-transform" },
                    ],
                },
            }),
        };
        const { session } = createHostWithPlugin([aTs, tsconfig, libFile]);
        openFilesForSession([aTs], session);
        baselineTsserverLogs("plugins", "With local plugins", session);
    });

    it("With global plugins", () => {
        const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
        const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
        const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: "{}",
        };
        const { session } = createHostWithPlugin([aTs, tsconfig, libFile], { globalPlugins: [...expectedToLoad, ...notToLoad] });
        openFilesForSession([aTs], session);
        baselineTsserverLogs("plugins", "With global plugins", session);
    });

    it("With session and custom protocol message", () => {
        const pluginName = "some-plugin";
        const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    plugins: [
                        { name: pluginName },
                    ],
                },
            }),
        };

        const { session } = createHostWithPlugin([aTs, tsconfig, libFile]);

        openFilesForSession([aTs], session);

        session.executeCommandSeq({
            command: testProtocolCommand,
            arguments: testProtocolCommandRequest,
        });

        baselineTsserverLogs("plugins", "With session and custom protocol message", session);
    });

    it("gets external files with config file reload", () => {
        const aTs: File = { path: `/user/username/projects/myproject/a.ts`, content: `export const x = 10;` };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    plugins: [{ name: "some-plugin" }],
                },
            }),
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
                        getExternalFiles: () => externalFiles[moduleName],
                    };
                },
                error: undefined,
            };
        };
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs], session);
        session.logger.log(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        host.writeFile(
            tsconfig.path,
            JSON.stringify({
                compilerOptions: {
                    plugins: [{ name: "some-other-plugin" }],
                },
            }),
        );
        host.runQueuedTimeoutCallbacks();
        session.logger.log(`ExternalFiles:: ${JSON.stringify(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        baselineTsserverLogs("plugins", "gets external files with config file reload", session);
    });
});

describe("unittests:: tsserver:: plugins:: overriding getSupportedCodeFixes", () => {
    it("getSupportedCodeFixes can be proxied", () => {
        const aTs: File = {
            path: "/a.ts",
            content: `class c { prop = "hello"; foo() { const x = 0; } }`,
        };
        const bTs: File = {
            path: "/b.ts",
            content: aTs.content,
        };
        const cTs: File = {
            path: "/c.ts",
            content: aTs.content,
        };
        const config: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: { plugins: [{ name: "myplugin" }] },
            }),
        };
        const host = createServerHost([aTs, bTs, cTs, config, libFile]);
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = Harness.LanguageService.makeDefaultProxy(info);
                        proxy.getSupportedCodeFixes = fileName => {
                            switch (fileName) {
                                case "/a.ts":
                                    return ["a"];
                                case "/b.ts":
                                    return ["b"];
                                default:
                                    // Make this stable list of single item so we dont have to update the baseline for every additional error
                                    return info.languageService.getSupportedCodeFixes(fileName);
                            }
                        };
                        return proxy;
                    },
                }),
                error: undefined,
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
            arguments: { file: aTs.path },
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { file: bTs.path },
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { file: cTs.path },
        });
        session.executeCommandSeq<ts.server.protocol.GetSupportedCodeFixesRequest>({
            command: ts.server.protocol.CommandTypes.GetSupportedCodeFixes,
            arguments: { projectFileName: config.path },
        });

        baselineTsserverLogs("plugins", "getSupportedCodeFixes can be proxied", session);
    });
});

describe("unittests:: tsserver:: plugins:: supportedExtensions::", () => {
    it("new files with non ts extensions and wildcard matching", () => {
        const aTs: File = {
            path: "/user/username/projects/myproject/a.ts",
            content: `export const a = 10;`,
        };
        const bVue: File = {
            path: "/user/username/projects/myproject/b.vue",
            content: "bVue file",
        };
        const config: File = {
            path: "/user/username/projects/myproject/tsconfig.json",
            content: JSON.stringify(
                {
                    compilerOptions: { composite: true },
                    include: ["*.ts", "*.vue"],
                },
                undefined,
                " ",
            ),
        };
        const host = createServerHost([aTs, bVue, config, libFile]);
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = Harness.LanguageService.makeDefaultProxy(info);
                        const originalScriptKind = info.languageServiceHost.getScriptKind!.bind(info.languageServiceHost);
                        info.languageServiceHost.getScriptKind = fileName =>
                            ts.fileExtensionIs(fileName, ".vue") ?
                                ts.ScriptKind.TS :
                                originalScriptKind(fileName);
                        const originalGetScriptSnapshot = info.languageServiceHost.getScriptSnapshot.bind(info.languageServiceHost);
                        info.languageServiceHost.getScriptSnapshot = fileName =>
                            ts.fileExtensionIs(fileName, ".vue") ?
                                ts.ScriptSnapshot.fromString(`export const y = "${info.languageServiceHost.readFile(fileName)}";`) :
                                originalGetScriptSnapshot(fileName);
                        return proxy;
                    },
                    getExternalFiles: (project: ts.server.Project) => {
                        if (project.projectKind !== ts.server.ProjectKind.Configured) return [];
                        const configFile = project.getProjectName();
                        const config = ts.readJsonConfigFile(configFile, project.readFile.bind(project));
                        const parseHost: ts.ParseConfigHost = {
                            useCaseSensitiveFileNames: project.useCaseSensitiveFileNames(),
                            fileExists: project.fileExists.bind(project),
                            readFile: project.readFile.bind(project),
                            readDirectory: (...args) => {
                                args[1] = [".vue"];
                                return project.readDirectory(...args);
                            },
                        };
                        const parsed = ts.parseJsonSourceFileConfigFileContent(config, parseHost, project.getCurrentDirectory());
                        return parsed.fileNames;
                    },
                }),
                error: undefined,
            };
        };
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host), globalPlugins: ["myplugin"] });
        openFilesForSession([aTs], session);

        host.writeFile("/user/username/projects/myproject/c.vue", "cVue file");
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("plugins", "new files with non ts extensions with wildcard matching", session);
    });
});

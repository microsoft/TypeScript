import { LanguageService } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: plugins:: loading", () => {
    const testProtocolCommand = "testProtocolCommand";
    const testProtocolCommandRequest = "testProtocolCommandRequest";
    const testProtocolCommandResponse = "testProtocolCommandResponse";

    function createHostWithPlugin(files: readonly File[], globalPlugins?: readonly string[]) {
        const host = TestServerHost.createServerHost(files);
        host.require = (_initialPath, moduleName) => {
            session.logger.log(`Loading plugin: ${moduleName}`);
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        info.session?.addProtocolHandler(testProtocolCommand, request => {
                            session.logger.log(`addProtocolHandler: ${jsonToReadableText(request)}`);
                            // Assume this one needs program
                            info.languageService.getProgram();
                            return {
                                response: testProtocolCommandResponse,
                            };
                        });
                        return LanguageService.makeDefaultProxy(info);
                    },
                }),
                error: undefined,
            };
        };
        const session = new TestSession({ host, globalPlugins });
        return { host, session };
    }

    it("With local plugins", () => {
        const expectedToLoad = [
            "@myscoped/plugin",
            "@myscoped/plugin/subpath",
            "@myscoped/plugin/sub/path",
            "unscopedPlugin",
            "unscopedPlugin/subpath",
            "unscopedPlugin/sub/path",
        ];
        const notToLoad = [
            "../myPlugin",
            "@myscoped/plugin/../malicious",
            "myPlugin/../malicious",
            "myPlugin/subpath/../../malicious",
        ];
        const aTs: File = { path: "/home/src/projects/project/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    plugins: [
                        ...[...expectedToLoad, ...notToLoad].map(name => ({ name })),
                        { transform: "some-transform" },
                    ],
                },
            }),
        };
        const { session } = createHostWithPlugin([aTs, tsconfig]);
        openFilesForSession([aTs], session);
        baselineTsserverLogs("plugins", "With local plugins", session);
    });

    it("With global plugins", () => {
        const expectedToLoad = [
            "@myscoped/plugin",
            "@myscoped/plugin/subpath",
            "@myscoped/plugin/sub/path",
            "unscopedPlugin",
            "unscopedPlugin/subpath",
            "unscopedPlugin/sub/path",
        ];
        const notToLoad = [
            "../myPlugin",
            "@myscoped/plugin/../malicious",
            "myPlugin/../malicious",
            "myPlugin/subpath/../../malicious",
        ];
        const aTs: File = { path: "/home/src/projects/project/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };
        const { session } = createHostWithPlugin([aTs, tsconfig], [...expectedToLoad, ...notToLoad]);
        openFilesForSession([aTs], session);
        baselineTsserverLogs("plugins", "With global plugins", session);
    });

    it("With session and custom protocol message", () => {
        const pluginName = "some-plugin";
        const aTs: File = { path: "/home/src/projects/project/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    plugins: [
                        { name: pluginName },
                    ],
                },
            }),
        };

        const { session } = createHostWithPlugin([aTs, tsconfig]);

        openFilesForSession([aTs], session);

        session.executeCommandSeq({
            command: testProtocolCommand,
            arguments: testProtocolCommandRequest,
        });

        baselineTsserverLogs("plugins", "With session and custom protocol message", session);
    });

    it("when plugins use LS to get program and update is pending", () => {
        const pluginName = "some-plugin";
        const aTs: File = {
            path: "/user/username/projects/project/a.ts",
            content: `/// <reference path="./b.ts"/>`,
        };
        const tsconfig: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    plugins: [
                        { name: pluginName },
                    ],
                },
            }),
        };

        const { session, host } = createHostWithPlugin([aTs, tsconfig]);

        openFilesForSession([aTs], session);
        // Write the missing file (referenced by 'a.ts') to schedule an update.
        host.writeFile("/user/username/projects/project/b.ts", "const y = 10;");

        // This should update the language service with a new program.
        session.executeCommandSeq({
            command: testProtocolCommand,
            arguments: testProtocolCommandRequest,
        });

        // This results in a program update.
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("plugins", "when plugins use LS to get program and update is pending", session);
    });

    it("gets external files with config file reload", () => {
        const aTs: File = { path: `/user/username/projects/myproject/a.ts`, content: `export const x = 10;` };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    plugins: [{ name: "some-plugin" }],
                },
            }),
        };

        const externalFiles: ts.MapLike<string[]> = {
            "some-plugin": ["someFile.txt"],
            "some-other-plugin": ["someOtherFile.txt"],
        };

        const host = TestServerHost.createServerHost([aTs, tsconfig]);
        host.require = (_initialPath, moduleName) => {
            session.logger.log(`Require:: ${moduleName}`);
            return {
                module: (): ts.server.PluginModule => {
                    session.logger.log(`PluginFactory Invoke`);
                    return {
                        create: LanguageService.makeDefaultProxy,
                        getExternalFiles: () => externalFiles[moduleName],
                    };
                },
                error: undefined,
            };
        };
        const session = new TestSession(host);
        openFilesForSession([aTs], session);
        session.logger.log(`ExternalFiles:: ${jsonToReadableText(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        host.writeFile(
            tsconfig.path,
            jsonToReadableText({
                compilerOptions: {
                    plugins: [{ name: "some-other-plugin" }],
                },
            }),
        );
        host.runQueuedTimeoutCallbacks();
        session.logger.log(`ExternalFiles:: ${jsonToReadableText(session.getProjectService().configuredProjects.get(tsconfig.path)!.getExternalFiles())}`);

        baselineTsserverLogs("plugins", "gets external files with config file reload", session);
    });
});

describe("unittests:: tsserver:: plugins:: overriding getSupportedCodeFixes", () => {
    it("getSupportedCodeFixes can be proxied", () => {
        const aTs: File = {
            path: "/home/src/projects/project/a.ts",
            content: `class c { prop = "hello"; foo() { const x = 0; } }`,
        };
        const bTs: File = {
            path: "/home/src/projects/project/b.ts",
            content: aTs.content,
        };
        const cTs: File = {
            path: "/home/src/projects/project/c.ts",
            content: aTs.content,
        };
        const config: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { plugins: [{ name: "myplugin" }] },
            }),
        };
        const host = TestServerHost.createServerHost([aTs, bTs, cTs, config]);
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = LanguageService.makeDefaultProxy(info);
                        proxy.getSupportedCodeFixes = fileName => {
                            switch (fileName) {
                                case "/home/src/projects/project/a.ts":
                                    return ["a"];
                                case "/home/src/projects/project/b.ts":
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
        const session = new TestSession(host);
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
    function createGetExternalFiles(getSession: () => TestSession) {
        const externalFiles = new Map<ts.server.Project, string[]>();
        return (project: ts.server.Project, updateLevel: ts.ProgramUpdateLevel) => {
            if (project.projectKind !== ts.server.ProjectKind.Configured) return [];
            if (updateLevel === ts.ProgramUpdateLevel.Update) {
                const existing = externalFiles.get(project);
                if (existing) {
                    getSession().logger.log(`getExternalFiles:: Returning cached .vue files`);
                    return existing;
                }
            }
            getSession().logger.log(`getExternalFiles:: Getting new list of .vue files`);
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
            externalFiles.set(project, parsed.fileNames);
            return parsed.fileNames;
        };
    }

    it("new files with non ts extensions and wildcard matching", () => {
        const aTs: File = {
            path: "/user/username/projects/myproject/a.ts",
            content: `export const a = 10;`,
        };
        const dTs: File = {
            path: "/user/username/projects/myproject/d.ts",
            content: `export const d = 10;`,
        };
        const bVue: File = {
            path: "/user/username/projects/myproject/b.vue",
            content: "bVue file",
        };
        const config: File = {
            path: "/user/username/projects/myproject/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { composite: true },
                include: ["*.ts", "*.vue"],
            }),
        };
        const host = TestServerHost.createServerHost([aTs, dTs, bVue, config]);
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = LanguageService.makeDefaultProxy(info);
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
                    getExternalFiles: createGetExternalFiles(() => session),
                }),
                error: undefined,
            };
        };
        const session = new TestSession({ host, globalPlugins: ["myplugin"] });
        openFilesForSession([aTs], session);

        host.writeFile("/user/username/projects/myproject/c.vue", "cVue file");
        host.runQueuedTimeoutCallbacks();

        host.appendFile(dTs.path, "export const x = 10;");
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("plugins", "new files with non ts extensions with wildcard matching", session);
    });

    it("when scriptKind changes for the external file", () => {
        const aTs: File = {
            path: "/user/username/projects/myproject/a.ts",
            content: `export const a = 10;`,
        };
        const bVue: File = {
            path: "/user/username/projects/myproject/b.vue",
            content: "bVueFile",
        };
        const config: File = {
            path: "/user/username/projects/myproject/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { composite: true },
                include: ["*.ts", "*.vue"],
            }),
        };
        const host = TestServerHost.createServerHost([aTs, bVue, config]);
        let currentVueScriptKind = ts.ScriptKind.TS;
        host.require = () => {
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = LanguageService.makeDefaultProxy(info);
                        const originalScriptKind = info.languageServiceHost.getScriptKind!.bind(info.languageServiceHost);
                        info.languageServiceHost.getScriptKind = fileName =>
                            fileName === bVue.path ?
                                currentVueScriptKind :
                                originalScriptKind(fileName);
                        const originalGetScriptSnapshot = info.languageServiceHost.getScriptSnapshot.bind(info.languageServiceHost);
                        info.languageServiceHost.getScriptSnapshot = fileName =>
                            fileName === bVue.path ?
                                ts.ScriptSnapshot.fromString(`import { y } from "${bVue.content}";`) : // Change the text so that imports change and we need to reconstruct program
                                originalGetScriptSnapshot(fileName);
                        return proxy;
                    },
                    getExternalFiles: createGetExternalFiles(() => session),
                }),
                error: undefined,
            };
        };
        const session = new TestSession({ host, globalPlugins: ["myplugin"] });
        openFilesForSession([bVue], session);

        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: bVue.path,
                    textChanges: [{
                        start: { line: 1, offset: bVue.content.length + 1 },
                        end: { line: 1, offset: bVue.content.length + 1 },
                        newText: "Updated",
                    }],
                }],
            },
        });
        bVue.content += "Updated";
        currentVueScriptKind = ts.ScriptKind.JS;

        verifyGetErrRequest({ session, files: [bVue] });
        baselineTsserverLogs("plugins", "when scriptKind changes for the external file", session);
    });
});

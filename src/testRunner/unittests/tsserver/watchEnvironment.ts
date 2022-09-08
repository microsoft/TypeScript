import * as ts from "../../_namespaces/ts";
import {
    commonFile1,
    commonFile2,
    createWatchFactorySystem,
    WatchFactorySystem,
} from "../tscWatch/helpers";
import {
    createServerHost,
    File,
    libFile,
    Tsc_WatchDirectory,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    Logger,
    openExternalProjectForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    TestSessionOptions,
    toExternalFiles,
} from "./helpers";

describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
    function verifyCompletionListWithNewFileInSubFolder(scenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
        it(scenario, () => {
            const projectFolder = "/a/username/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: File = {
                path: `${projectFolder}/tsconfig.json`,
                content: JSON.stringify({
                    watchOptions: {
                        synchronousWatchDirectory: true
                    }
                })
            };
            const index: File = {
                path: `${projectSrcFolder}/index.ts`,
                content: `import {} from "./"`
            };
            const file1: File = {
                path: `${projectSrcFolder}/file1.ts`,
                content: ""
            };

            const files = [index, file1, configFile, libFile];
            const environmentVariables = new Map<string, string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = createServerHost(files, { environmentVariables });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([index], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });

            // Add file2
            const file2: File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: ""
            };
            host.writeFile(file2.path, file2.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyCompletionListWithNewFileInSubFolder(
        "uses watchFile when file is added to subfolder",
        Tsc_WatchDirectory.WatchFile
    );
    verifyCompletionListWithNewFileInSubFolder(
        "uses non recursive watchDirectory when file is added to subfolder",
        Tsc_WatchDirectory.NonRecursiveWatchDirectory
    );
    verifyCompletionListWithNewFileInSubFolder(
        "uses dynamic polling when file is added to subfolder",
        Tsc_WatchDirectory.DynamicPolling
    );
});

describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
    function verifyWatchedDirectories(scenario: string, rootedPath: string, useProjectAtRoot: boolean) {
        it(scenario, () => {
            const root = useProjectAtRoot ? rootedPath : `${rootedPath}myfolder/allproject/`;
            const configFile: File = {
                path: root + "project/tsconfig.json",
                content: "{}"
            };
            const file1: File = {
                path: root + "project/file1.ts",
                content: "let x = 10;"
            };
            const file2: File = {
                path: root + "project/file2.ts",
                content: "let y = 10;"
            };
            const files = [configFile, file1, file2, libFile];
            const host = createServerHost(files, { windowsStyleRoot: "c:/" });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([file1], session);
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyWatchedDirectories("files at windows style root", "c:/", /*useProjectAtRoot*/ true);
    verifyWatchedDirectories("files not at windows style root", "c:/", /*useProjectAtRoot*/ false);
    verifyWatchedDirectories("files at root", "c:/", /*useProjectAtRoot*/ true);
    verifyWatchedDirectories("files not at root", "c:/", /*useProjectAtRoot*/ false);
});

it(`unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem recursive watch directory implementation does not watch files/directories in node_modules starting with "."`, () => {
    const projectFolder = "/a/username/project";
    const projectSrcFolder = `${projectFolder}/src`;
    const configFile: File = {
        path: `${projectFolder}/tsconfig.json`,
        content: "{}"
    };
    const index: File = {
        path: `${projectSrcFolder}/index.ts`,
        content: `import {} from "file"`
    };
    const file1: File = {
        path: `${projectSrcFolder}/file1.ts`,
        content: ""
    };
    const nodeModulesExistingUnusedFile: File = {
        path: `${projectFolder}/node_modules/someFile.d.ts`,
        content: ""
    };
    const environmentVariables = new Map<string, string>();
    environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
    const host = createServerHost([index, file1, configFile, libFile, nodeModulesExistingUnusedFile], { environmentVariables });
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    openFilesForSession([index], session);

    const nodeModulesIgnoredFileFromIgnoreDirectory: File = {
        path: `${projectFolder}/node_modules/.cache/someFile.d.ts`,
        content: ""
    };

    const nodeModulesIgnoredFile: File = {
        path: `${projectFolder}/node_modules/.cacheFile.ts`,
        content: ""
    };

    const gitIgnoredFileFromIgnoreDirectory: File = {
        path: `${projectFolder}/.git/someFile.d.ts`,
        content: ""
    };

    const gitIgnoredFile: File = {
        path: `${projectFolder}/.gitCache.d.ts`,
        content: ""
    };
    const emacsIgnoredFileFromIgnoreDirectory: File = {
        path: `${projectFolder}/src/.#field.ts`,
        content: ""
    };

    [
        nodeModulesIgnoredFileFromIgnoreDirectory,
        nodeModulesIgnoredFile,
        gitIgnoredFileFromIgnoreDirectory,
        gitIgnoredFile,
        emacsIgnoredFileFromIgnoreDirectory
    ].forEach(ignoredEntity => {
        host.ensureFileOrFolder(ignoredEntity);
        session.testhost.logTimeoutQueueLength();
    });

    baselineTsserverLogs("watchEnvironment", `recursive directory does not watch files starting with dot in node_modules`, session);
});

it("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
    const logger = createLoggerWithInMemoryLogs(/*host*/ undefined!); // Special handling to ensure same logger is used
    verifyFilePathStyle("c:/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js", logger);
    verifyFilePathStyle("c:/users/username/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js", logger);
    baselineTsserverLogs("watchEnvironment", `watching files with network style paths`, { logger });

    function verifyFilePathStyle(path: string, logger: Logger) {
        const windowsStyleRoot = path.substring(0, ts.getRootLength(path));
        const file: File = { path, content: "const x = 10" };
        const host = createServerHost(
            [libFile, file],
            { windowsStyleRoot }
        );
        logger.host = host;
        logger.info(`For files of style ${path}`);
        logger.log(`currentDirectory:: ${host.getCurrentDirectory()} useCaseSensitiveFileNames: ${host.useCaseSensitiveFileNames}`);
        const session = createSession(host, { logger });
        openFilesForSession([file], session);
    }
});

describe("unittests:: tsserver:: watchEnvironment:: handles watch compiler options", () => {
    it("with watchFile option as host configuration", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1));
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchFile: ts.server.protocol.WatchFileKind.UseFsEvents
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchFile option as host configuration`, session);
    });

    it("with watchDirectory option as host configuration", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchDirectory: ts.server.protocol.WatchDirectoryKind.UseFsEvents
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchDirectory option as host configuration`, session);
    });

    it("with fallbackPolling option as host configuration", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with fallbackPolling option as host configuration`, session);
    });

    it("with watchFile option in configFile", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    watchFile: "UseFsEvents"
                }
            })
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1));
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchFile option in configFile`, session);
    });

    it("with watchDirectory option in configFile", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    watchDirectory: "UseFsEvents"
                }
            })
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchDirectory option in configFile`, session);
    });

    it("with fallbackPolling option in configFile", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    fallbackPolling: "PriorityInterval"
                }
            })
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with fallbackPolling option in configFile`, session);
    });

    describe("excludeDirectories", () => {
        function setupFiles() {
            const main: File = {
                path: `/user/username/projects/myproject/src/main.ts`,
                content: `import { foo } from "bar"; foo();`
            };
            const bar: File = {
                path: `/user/username/projects/myproject/node_modules/bar/index.d.ts`,
                content: `export { foo } from "./foo";`
            };
            const foo: File = {
                path: `/user/username/projects/myproject/node_modules/bar/foo.d.ts`,
                content: `export function foo(): string;`
            };
            return { main, bar, foo };
        }

        function setupConfigureHost(session: TestSession, configureHost: boolean | undefined) {
            if (configureHost) {
                session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                    command: ts.server.protocol.CommandTypes.Configure,
                    arguments: {
                        watchOptions: { excludeDirectories: ["node_modules"] }
                    }
                });
            }
        }
        function setup(configureHost?: boolean) {
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({ include: ["src"], watchOptions: { excludeDirectories: ["node_modules"] } })
            };
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo, configFile];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            openFilesForSession([main], session);
            return session;
        }

        it("with excludeDirectories option in configFile", () => {
            const session = setup();
            baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configFile`, session);
        });

        it("with excludeDirectories option in configuration", () => {
            const session = setup(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configuration`, session);
        });

        function setupExternalProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            openExternalProjectForSession({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["node_modules"] }
            }, session);
            openFilesForSession([main], session);
            return session;
        }

        it("external project watch options", () => {
            const session = setupExternalProject();
            baselineTsserverLogs("watchEnvironment", `external project watch options`, session);
        });

        it("external project watch options in host configuration", () => {
            const session = setupExternalProject(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `external project watch options in host configuration`, session);
        });

        it("external project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            service.openExternalProject({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["**/../*"] }
            } as ts.server.protocol.ExternalProject);
            service.openClientFile(main.path);
            const project = service.externalProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            baselineTsserverLogs("watchEnvironment", `external project watch options errors`, service);
        });

        function setupInferredProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: { excludeDirectories: ["node_modules"] },
                projectRootPath: "/user/username/projects/myproject"
            }, session);
            openFilesForSession([{ file: main, projectRootPath: "/user/username/projects/myproject" }], session);
            return session;
        }

        it("inferred project watch options", () => {
            const session = setupInferredProject();
            baselineTsserverLogs("watchEnvironment", `inferred project watch options`, session);
        });

        it("inferred project watch options in host configuration", () => {
            const session = setupInferredProject(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `inferred project watch options in host configuration`, session);
        });

        it("inferred project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const service = createProjectService(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["**/../*"] }, "/user/username/projects/myproject");
            service.openClientFile(main.path, main.content, ts.ScriptKind.TS, "/user/username/projects/myproject");
            const project = service.inferredProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            baselineTsserverLogs("watchEnvironment", `inferred project watch options errors`, service);
        });
    });
});

describe("unittests:: tsserver:: watchEnvironment:: file names on case insensitive file system", () => {
    function verifyFileNames(scenario: string, projectRootPath: string) {
        it(scenario, () => {
            const file: File = {
                path: `${projectRootPath}/foo.ts`,
                content: `import { foo } from "bar"`
            };
            const host = createServerHost([file, libFile]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([{ file, projectRootPath }], session);
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyFileNames("project with ascii file names", "/User/userName/Projects/I");
    verifyFileNames("project with ascii file names with i", "/User/userName/Projects/i");
    verifyFileNames("project with unicode file names", "/User/userName/Projects/İ");
});

describe("unittests:: tsserver:: watchEnvironment:: watchFile is single watcher per file", () => {
    it("when watchFile is single watcher per file", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    composite: true,
                    resolveJsonModule: true,
                },
            })
        };
        const index: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: `import * as tsconfig from "./tsconfig.json";`
        };
        const host = createServerHost([config, index, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([index], session);
        baselineTsserverLogs("watchEnvironment", "when watchFile is single watcher per file", session);
    });
});

describe("unittests:: tsserver:: watchEnvironment:: watchFactory", () => {
    it("plugin overriding watch", () => {
        const { host, session, plugin, aTs, bTs, } = createHostForPlugins({ globalPlugins: ["myplugin"] });
        const existingWatchFile = host.watchFile;
        const existingWatchDirectory = host.watchDirectory;
        host.require = (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            return {
                module: (): ts.server.PluginModule => ({
                    create: info => {
                        info.serverHost.watchFile = plugin.watchFile;
                        info.serverHost.watchDirectory = plugin.watchDirectory;
                        return info.languageService;
                    }
                }),
                error: undefined
            };
        };
        openFilesForSession([aTs], session);
        session.logger.log(`Host watchFile expected to be patched. Actual: ${host.watchFile !== existingWatchFile}`);
        session.logger.log(`Host watchDirectory expected to be patched. Actual: ${host.watchDirectory !== existingWatchDirectory}`);

        // Change b.ts
        session.logger.log("Change file");
        host.writeFile(bTs.path, aTs.content);
        // Since we have overriden watch, this shouldnt do anything
        host.runQueuedTimeoutCallbacks();

        // Actually invoke watches
        session.logger.log("Invoke plugin watches");
        plugin.watchedFiles.get(bTs.path)!.forEach(({ callback }) => callback(bTs.path, ts.FileWatcherEventKind.Changed));
        // Host should have updates queued
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("watchEnvironment", "plugin overriding watch", session);
    });

    function verifyWatchFactory(pluginOverride: boolean, allowLocalPluginLoads: boolean, useObject: boolean) {
        it(scenarioName("watchFactory in config file", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin, aTs } = createHostForPlugins(
                { allowLocalPluginLoads },
                { watchFactory: getWatchFactory("myplugin", useObject) }
            );
            host.require = requireReturningWatchFactory(session, plugin);
            if (pluginOverride) configurePlugin(session, "myplugin", { init: "initialConfig" });
            openFilesForSession([aTs], session);

            // Add c.ts
            session.logger.log("Add a file");
            host.writeFile(`/user/username/projects/myproject/c.ts`, aTs.content);
            // Since we have overriden watch, this shouldnt do anything
            host.runQueuedTimeoutCallbacks();

            // Actually invoke watches
            session.logger.log("Invoke plugin watches");
            plugin.watchedDirectoriesRecursive.get("/user/username/projects/myproject")!.forEach(({ callback }) => callback(`/user/username/projects/myproject/c.ts`));
            // Host should have updates queued
            host.runQueuedTimeoutCallbacks();

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchEnvironment", scenarioName("watchFactory in config file", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        it(scenarioName("watchFactory as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin, aTs, bTs, } = createHostForPlugins({ allowLocalPluginLoads });
            host.require = requireReturningWatchFactory(session, plugin);
            configureGlobalWatchOptions(session, "myplugin", useObject);
            if (pluginOverride) configurePlugin(session, "myplugin", { init: "initialConfig" });
            openFilesForSession([aTs], session);

            // Change b.ts
            session.logger.log("Change file");
            host.writeFile(bTs.path, aTs.content);
            // Since we have overriden watch, this shouldnt do anything
            host.runQueuedTimeoutCallbacks();

            // Actually invoke watches
            session.logger.log("Invoke plugin watches");
            plugin.watchedFiles.get(bTs.path)!.forEach(({ callback }) => callback(bTs.path, ts.FileWatcherEventKind.Changed));
            // Host should have updates queued
            host.runQueuedTimeoutCallbacks();

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchEnvironment", scenarioName("watchFactory as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        it(scenarioName("watchFactory in config as well as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin, aTs, bTs, } = createHostForPlugins(
                { allowLocalPluginLoads },
                { watchFactory: getWatchFactory("myplugin", useObject) }
            );
            const plugin2 = createFactoryFunctions(session, "myplugin2");
            host.require = requireReturningWatchFactory(session, plugin, plugin2);
            configureGlobalWatchOptions(session, "myplugin2", useObject);
            if (pluginOverride) {
                configurePlugin(session, "myplugin", { init: "initialConfig" });
                configurePlugin(session, "myplugin2", { init2: "initialConfig2" });
            }
            openFilesForSession([aTs], session);

            // Add c.ts
            session.logger.log("Add a file");
            host.writeFile(`/user/username/projects/myproject/c.ts`, aTs.content);
            // Since we have overriden watch, this shouldnt do anything
            host.runQueuedTimeoutCallbacks();

            // Actually invoke watches
            session.logger.log("Invoke plugin watches");
            plugin.watchedDirectoriesRecursive.get("/user/username/projects/myproject")!.forEach(({ callback }) => callback(`/user/username/projects/myproject/c.ts`));
            // Host should have updates queued
            host.runQueuedTimeoutCallbacks();

            // Change b.ts
            session.logger.log("Change file");
            host.writeFile(bTs.path, aTs.content);
            // Since we have overriden watch, this shouldnt do anything
            host.runQueuedTimeoutCallbacks();

            // Actually invoke watches
            session.logger.log("Invoke plugin watches");
            plugin2.watchedFiles.get(bTs.path)!.forEach(({ callback }) => callback(bTs.path, ts.FileWatcherEventKind.Changed));
            // Host should have updates queued
            host.runQueuedTimeoutCallbacks();

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "myplugin2");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchEnvironment", scenarioName("watchFactory in config as well as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        if (allowLocalPluginLoads || pluginOverride) return;
        it(scenarioName("watchFactory as configuration of host with errors", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, aTs, bTs, } = createHostForPlugins();
            host.require = ts.notImplemented; // Should throw if called
            configureGlobalWatchOptions(session, "myplugin/../malicious", useObject);
            openFilesForSession([aTs], session);

            // Change b.ts
            session.logger.log("Change file");
            host.writeFile(bTs.path, aTs.content);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("watchEnvironment", scenarioName("watchFactory as configuration of host with errors", pluginOverride, allowLocalPluginLoads, useObject), session);
        });
    }
    verifyWatchFactory(/*pluginOverride*/ false, /*allowLocalPluginLoads*/ false, /*useObject*/ false);
    verifyWatchFactory(/*pluginOverride*/ false, /*allowLocalPluginLoads*/ true, /*useObject*/ false);
    verifyWatchFactory(/*pluginOverride*/ false, /*allowLocalPluginLoads*/ false, /*useObject*/ true);
    verifyWatchFactory(/*pluginOverride*/ false, /*allowLocalPluginLoads*/ true, /*useObject*/ true);
    verifyWatchFactory(/*pluginOverride*/ true, /*allowLocalPluginLoads*/ false, /*useObject*/ false);
    verifyWatchFactory(/*pluginOverride*/ true, /*allowLocalPluginLoads*/ true, /*useObject*/ false);
    verifyWatchFactory(/*pluginOverride*/ true, /*allowLocalPluginLoads*/ false, /*useObject*/ true);
    verifyWatchFactory(/*pluginOverride*/ true, /*allowLocalPluginLoads*/ true, /*useObject*/ true);

    function createHostForPlugins(opts?: Partial<TestSessionOptions>, watchOptions?: ts.WatchOptions) {
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({ watchOptions })
        };
        const aTs: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `export class a { prop = "hello"; foo() { return this.prop; } }`
        };
        const bTs: File = {
            path: `/user/username/projects/myproject/b.ts`,
            content: `export class b { prop = "hello"; foo() { return this.prop; } }`
        };
        const host = createServerHost([aTs, bTs, configFile, libFile]);
        const session = createSession(host, {
            ...opts,
            logger: createLoggerWithInMemoryLogs(host),
            pluginProbeLocations: ["/a/pluginprobe1", "/a/pluginprobe2"],
        });
        return { host, session, aTs, bTs, plugin: createFactoryFunctions(session) };
    }

    function createFactoryFunctions(session: TestSession, pluginName?: string) {
        return createWatchFactorySystem(session.testhost, s => session.logger.log(s), pluginName).factoryData;
    }

    function scenarioName(scenario: string, pluginOverride: boolean, allowLocalPluginLoads: boolean, useObject: boolean) {
        return `${scenario}${pluginOverride ? " with pluginOverride" : ""}${allowLocalPluginLoads ? " allowLocalPluginLoads" : ""}${useObject ? " object" : ""}`;
    }

    interface PluginImport extends ts.PluginImport {
        myconfig: "somethingelse";
    }
    function getWatchFactory(watchFactory: string, _useObject: boolean): PluginImport | string {
        return watchFactory;
        // return useObject ? { name: watchFactory, myconfig: "somethingelse" } : watchFactory;
    }

    function configureGlobalWatchOptions(session: TestSession, watchFactory: string, useObject: boolean) {
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { watchOptions: { watchFactory: getWatchFactory(watchFactory, useObject) } }
        });
    }

    function configurePlugin(session: TestSession, pluginName: string, configuration?: any) {
        session.executeCommandSeq<ts.server.protocol.ConfigurePluginRequest>({
            command: ts.server.protocol.CommandTypes.ConfigurePlugin,
            arguments: {
                pluginName,
                configuration: configuration || { extraData: "myData" }
            }
        });
    }

    function requireReturningWatchFactory(
        session: TestSession,
        plugin: WatchFactorySystem["factoryData"],
        plugin2?: WatchFactorySystem["factoryData"],
    ): ts.System["require"] {
        return (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            return {
                module: (({ options, config }) => {
                    session.logger.log(`Require:: Module ${moduleName} created with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}`);
                    return !plugin2 || moduleName === "myplugin" ?
                        plugin :
                        plugin2;
                }) as ts.UserWatchFactoryModule,
                error: undefined
            };
        };
    }
});

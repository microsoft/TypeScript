import * as ts from "../../_namespaces/ts";
import { defer } from "../../_namespaces/Utils";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createHostForWatchFactoryPlugins,
    createWatchFactoryFunctions,
    WatchFactorySystem,
} from "../helpers/watchFactory";

describe("unittests:: tsserver:: watchEnvironment:: watchFactory", () => {
    it("plugin overriding watch", () => {
        const { host, session, plugin } = createHostForWatchFactoryPlugins({ globalPlugins: ["myplugin"] });
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
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);
        session.logger.log(`Host watchFile expected to be patched. Actual: ${host.watchFile !== existingWatchFile}`);
        session.logger.log(`Host watchDirectory expected to be patched. Actual: ${host.watchDirectory !== existingWatchDirectory}`);

        // Change b.ts
        changeFile(session, plugin, "/user/username/projects/myproject/b.ts");

        baselineTsserverLogs("watchFactory", "plugin overriding watch", session);
    });

    function verifyWatchFactory(pluginOverride: boolean, allowLocalPluginLoads: boolean, useObject: boolean) {
        it(scenarioName("config file", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin } = createHostForWatchFactoryPlugins(
                { allowLocalPluginLoads },
                { watchFactory: getWatchFactory("myplugin", useObject) }
            );
            host.require = requireReturningWatchFactory(session, plugin);
            if (pluginOverride) configurePlugin(session, "myplugin", { init: "initialConfig" });
            openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

            // Add c.ts
            addFile(session, plugin, "/user/username/projects/myproject/c.ts");

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchFactory", scenarioName("config file", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        it(scenarioName("configuration of host", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin } = createHostForWatchFactoryPlugins({ allowLocalPluginLoads });
            host.require = requireReturningWatchFactory(session, plugin);
            configureGlobalWatchOptions(session, "myplugin", useObject);
            if (pluginOverride) configurePlugin(session, "myplugin", { init: "initialConfig" });
            openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

            // Change b.ts
            changeFile(session, plugin, "/user/username/projects/myproject/b.ts");

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchFactory", scenarioName("configuration of host", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        it(scenarioName("config as well as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session, plugin } = createHostForWatchFactoryPlugins(
                { allowLocalPluginLoads },
                { watchFactory: getWatchFactory("myplugin", useObject) }
            );
            const plugin2 = createWatchFactoryFunctions(session, "myplugin2");
            host.require = requireReturningWatchFactory(session, plugin, plugin2);
            configureGlobalWatchOptions(session, "myplugin2", useObject);
            if (pluginOverride) {
                configurePlugin(session, "myplugin", { init: "initialConfig" });
                configurePlugin(session, "myplugin2", { init2: "initialConfig2" });
            }
            openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

            // Add c.ts
            addFile(session, plugin, "/user/username/projects/myproject/c.ts");

            // Change b.ts
            changeFile(session, plugin2, "/user/username/projects/myproject/b.ts");

            // Configuration changed
            configurePlugin(session, "myplugin");
            configurePlugin(session, "myplugin2");
            configurePlugin(session, "randomplugin");

            baselineTsserverLogs("watchFactory", scenarioName("config as well as configuration of host", pluginOverride, allowLocalPluginLoads, useObject), session);
        });

        if (allowLocalPluginLoads || pluginOverride) return;
        it(scenarioName("configuration of host with errors", pluginOverride, allowLocalPluginLoads, useObject), () => {
            const { host, session } = createHostForWatchFactoryPlugins();
            host.require = ts.notImplemented; // Should throw if called
            configureGlobalWatchOptions(session, "myplugin/../malicious", useObject);
            openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

            // Change b.ts
            updateFileOnHost(session, "/user/username/projects/myproject/b.ts");

            baselineTsserverLogs("watchFactory", scenarioName("configuration of host with errors", pluginOverride, allowLocalPluginLoads, useObject), session);
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

    it("registering command with session", () => {
        const { host, session, plugin } = createHostForWatchFactoryPlugins({ canUseEvents: true });
        // This is what vscode does on their side to watch on event
        const originalWrite = host.write;
        host.write = s => {
            originalWrite.call(host, s);
            const event = JSON.parse(s.substring(s.indexOf("{"))) as ts.server.protocol.Event;
            if (event.event === "watchFile") {
                const file = event.body.fileName;
                plugin.watchFile(file, (fileName, eventKind) => {
                    session.executeCommandSeq({
                        command: "onFileChange",
                        arguments: { file, fileName, eventKind }
                    });
                }, event.body.pollingInterval, event.body.options);
            }
            else if (event.event === "watchDirectory") {
                const dir = event.body.fileName;
                const recursive = event.body.recursive;
                plugin.watchDirectory(dir, file => {
                    session.executeCommandSeq({
                        command: "onDirectoryChange",
                        arguments: { dir, file, recursive }
                    });
                }, recursive, event.body.options);
            }
        };
        host.require = (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            return {
                module: (): ts.UserWatchFactory => {
                    const watchedFiles = new Map<string, Set<ts.FileWatcherCallback>>();
                    const watchedDirectories = new Map<string, Set<ts.DirectoryWatcherCallback>>();
                    const watchedDirectoriesRecursive = new Map<string, Set<ts.DirectoryWatcherCallback>>();
                    return {
                        create: ({ config, options, session: sessionParam }) => {
                            session.logger.log(`Module ${moduleName}:: create with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}`);
                            // Plugin adds the comamnds to execute callbacks so that vscode notifies plugin about file change
                            sessionParam?.addProtocolHandler("onFileChange", req => {
                                session.logger.log(`CustomRequest:: ${JSON.stringify(req)}`);
                                watchedFiles.get(req.arguments.file)?.forEach(callback => callback(req.arguments.fileName, req.arguments.eventKind));
                                return { response: "completedOnFileChange" };
                            });
                            sessionParam?.addProtocolHandler("onDirectoryChange", req => {
                                session.logger.log(`CustomRequest:: ${JSON.stringify(req)}`);
                                (req.arguments.recursive ? watchedDirectoriesRecursive : watchedDirectories).get(req.arguments.dir)?.forEach(callback => callback(req.arguments.file));
                                return { response: "completedOnDirectoryChange" };
                            });
                        },
                        watchFile: (fileName, callback, pollingInterval, options) => {
                            let forFile = watchedFiles.get(fileName);
                            if (!forFile) watchedFiles.set(fileName, forFile = new Set());
                            forFile.add(callback);
                            session.event({ fileName, pollingInterval, options }, "watchFile");
                            return {
                                close: () => {
                                    watchedFiles.get(fileName)?.delete(callback);
                                }
                            };
                        },
                        watchDirectory: (fileName, callback, recursive, options) => {
                            let forDir = (recursive ? watchedDirectoriesRecursive : watchedDirectories).get(fileName);
                            if (!forDir) (recursive ? watchedDirectoriesRecursive : watchedDirectories).set(fileName, forDir = new Set());
                            forDir.add(callback);
                            session.event({ fileName, recursive, options }, "watchDirectory");
                            return {
                                close: () => {
                                    (recursive ? watchedDirectoriesRecursive : watchedDirectories).get(fileName)?.delete(callback);
                                }
                            };
                        },
                    };
                },
                error: undefined,
            };
        };
        configureGlobalWatchOptions(session, "myplugin", /*useObject*/ false);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Add c.ts
        addFile(session, plugin, "/user/username/projects/myproject/c.ts");
        session.testhost.runQueuedTimeoutCallbacks();

        // Change b.ts
        changeFile(session, plugin, "/user/username/projects/myproject/b.ts");
        session.testhost.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("watchFactory", "when registering command with session", session);
    });

    it("with async watchFactory", async () => {
        const { host, session, plugin } = createHostForWatchFactoryPlugins();
        const shouldLoad = defer();
        host.importPlugin = async (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            await shouldLoad.promise;
            return {
                module: (() => ({
                    create: ({ config, options }) => {
                        session.logger.log(`Module ${moduleName}:: create with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}`);
                    },
                    ...plugin,
                })) as ts.UserWatchFactoryModule,
                error: undefined,
            };
        };
        configureGlobalWatchOptions(session, "myplugin", /*useObject*/ false);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Add c.ts
        addFile(session, plugin, "/user/username/projects/myproject/c.ts", "Add a file before factory is resolved");

        shouldLoad.resolve();

        await ((session.getProjectService().userWatchFactory as ts.UserWatchFactoryWithName).factory as ts.UserWatchFactoryWithPromise).importPromise;

        session.testhost.baselineHost("Watches after plugin is resolved");

        addFile(session, plugin, "/user/username/projects/myproject/d.ts", "Add a file after factory is resolved");

        baselineTsserverLogs("watchFactory", "with async watchFactory", session);
    });

    it("with async watchFactory plugin not found", async () => {
        const { host, session } = createHostForWatchFactoryPlugins();
        const shouldLoad = defer();
        host.importPlugin = async (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            await shouldLoad.promise;
            return {
                module: undefined,
                error: { message: `Cannot find module myPlugin at ${initialPath}` },
            };
        };
        configureGlobalWatchOptions(session, "myplugin", /*useObject*/ false);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Add c.ts
        addFile(session, /*plugin*/ undefined, "/user/username/projects/myproject/c.ts", "Add a file before factory is resolved");

        shouldLoad.resolve();

        await ((session.getProjectService().userWatchFactory as ts.UserWatchFactoryWithName).factory as ts.UserWatchFactoryWithPromise).importPromise;

        session.testhost.baselineHost("Watches after plugin is resolved");

        addFile(session, /*plugin*/ undefined, "/user/username/projects/myproject/d.ts", "Add a file after factory is resolved");

        baselineTsserverLogs("watchFactory", "with async watchFactory plugin not found", session);
    });

    it("with async watchFactory does not implements watchFile", async () => {
        const { host, session, plugin } = createHostForWatchFactoryPlugins();
        const shouldLoad = defer();
        const loaded = defer();
        host.importPlugin = async (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            await shouldLoad.promise;
            return {
                module: (() => ({
                    create: ({ config, options }) => {
                        session.logger.log(`Module ${moduleName}:: create with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}`);
                        loaded.resolve();
                    },
                    watchDirectory: plugin.watchDirectory,
                })) as ts.UserWatchFactoryModule,
                error: undefined,
            };
        };
        configureGlobalWatchOptions(session, "myplugin", /*useObject*/ false);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        addFile(session, plugin, "/user/username/projects/myproject/c.ts", "Add a file before factory is resolved");

        shouldLoad.resolve();

        await ((session.getProjectService().userWatchFactory as ts.UserWatchFactoryWithName).factory as ts.UserWatchFactoryWithPromise).importPromise;

        session.testhost.baselineHost("Watches after plugin is resolved");

        changeFile(session, plugin, "/user/username/projects/myproject/b.ts");
        addFile(session, plugin, "/user/username/projects/myproject/d.ts", "Add a file after factory is resolved");

        baselineTsserverLogs("watchFactory", "with async watchFactory does not implements watchFile", session);
    });

    it("with async watchFactory plugin does not return factory function", async () => {
        const { host, session } = createHostForWatchFactoryPlugins();
        const shouldLoad = defer();
        host.importPlugin = async (initialPath, moduleName) => {
            session.logger.log(`CustomRequire:: Resolving ${moduleName} from ${initialPath}`);
            await shouldLoad.promise;
            return {
                module: { watchDirectory: ts.notImplemented },
                error: undefined,
            };
        };
        configureGlobalWatchOptions(session, "myplugin", /*useObject*/ false);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Add c.ts
        addFile(session, /*plugin*/ undefined, "/user/username/projects/myproject/c.ts", "Add a file before factory is resolved");

        shouldLoad.resolve();

        await ((session.getProjectService().userWatchFactory as ts.UserWatchFactoryWithName).factory as ts.UserWatchFactoryWithPromise).importPromise;

        session.testhost.baselineHost("Watches after plugin is resolved");

        addFile(session, /*plugin*/ undefined, "/user/username/projects/myproject/d.ts", "Add a file after factory is resolved");

        baselineTsserverLogs("watchFactory", "with async watchFactory plugin does not return factory function", session);
    });

    function scenarioName(scenario: string, pluginOverride: boolean, allowLocalPluginLoads: boolean, useObject: boolean) {
        return `${scenario}${pluginOverride ? " with pluginOverride" : ""}${allowLocalPluginLoads ? " allowLocalPluginLoads" : ""}${useObject ? " object" : ""}`;
    }

    interface PluginImport extends ts.PluginImport {
        myconfig: "somethingelse";
    }
    function getWatchFactory(watchFactory: string, _useObject: boolean): PluginImport | string {
        // return useObject ? { name: watchFactory, myconfig: "somethingelse" } : watchFactory;
        return watchFactory;
    }

    function updateFileOnHost(session: TestSession, file: string, log?: string) {
        // Change b.ts
        session.logger.log(log || "Change file");
        session.testhost.writeFile(file, session.testhost.readFile("/user/username/projects/myproject/a.ts")!);
        session.testhost.runQueuedTimeoutCallbacks();
    }

    function addFile(session: TestSession, plugin: WatchFactorySystem["factoryData"] | undefined, file: string, log?: string) {
        updateFileOnHost(session, file, log || "Add a file");
        if (plugin) {
            session.logger.log("Invoke plugin watches");
            plugin.watchedDirectoriesRecursive.get("/user/username/projects/myproject")?.forEach(({ callback }) => callback(file));
            session.testhost.runQueuedTimeoutCallbacks();
        }
    }

    function changeFile(session: TestSession, plugin: WatchFactorySystem["factoryData"], file: string) {
        updateFileOnHost(session, file);

        session.logger.log("Invoke plugin watches");
        plugin.watchedFiles.get(file)?.forEach(({ callback }) => callback(file, ts.FileWatcherEventKind.Changed));
        session.testhost.runQueuedTimeoutCallbacks();
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
                module: (() => ({
                    create: ({ config, options, watch, solution, session: sessionParam }) => {
                        session.logger.log(`Module ${moduleName}:: create with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}`);
                        ts.Debug.assert(session === sessionParam);
                        ts.Debug.assert(!watch);
                        ts.Debug.assert(!solution);
                    },
                    ...(!plugin2 || moduleName === "myplugin" ? plugin : plugin2),
                })) as ts.UserWatchFactoryModule,
                error: undefined,
            };
        };
    }
});

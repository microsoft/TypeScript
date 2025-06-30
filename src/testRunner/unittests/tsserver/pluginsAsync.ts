import * as ts from "../../_namespaces/ts.js";
import {
    defer,
    Deferred,
} from "../../_namespaces/Utils.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: pluginsAsync:: async loaded plugins", () => {
    function setup(globalPlugins: string[]) {
        const host = TestServerHost.createServerHost([]);
        const session = new TestSession({ host, globalPlugins });
        return { host, session };
    }

    it("plugins are not loaded immediately", async () => {
        const { host, session } = setup(["plugin-a"]);
        let pluginModuleInstantiated = false;
        let pluginInvoked = false;
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            await Promise.resolve(); // simulate at least a single turn delay
            pluginModuleInstantiated = true;
            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => {
                    pluginInvoked = true;
                    return { create: info => info.languageService };
                }) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([{ file: "^memfs:/foo.ts", content: "" }], session);
        const projectService = session.getProjectService();

        session.logger.log(`This should be false because 'executeCommand' should have already triggered plugin enablement asynchronously and there are no plugin enablements currently being processed`);
        session.logger.log(`hasNewPluginEnablementRequests:: ${projectService.hasNewPluginEnablementRequests()}`);

        session.logger.log(`Should be true because async imports have already been triggered in the background`);
        session.logger.log(`hasPendingPluginEnablements:: ${projectService.hasPendingPluginEnablements()}`);

        session.logger.log(`Should be false because resolution of async imports happens in a later turn`);
        session.logger.log(`pluginModuleInstantiated:: ${pluginModuleInstantiated}`);

        await projectService.waitForPendingPlugins();
        session.host.baselineHost("after waitForPendingPlugins");

        session.logger.log(`at this point all plugin modules should have been instantiated and all plugins should have been invoked`);
        session.logger.log(`pluginModuleInstantiated:: ${pluginModuleInstantiated}`);
        session.logger.log(`pluginInvoked:: ${pluginInvoked}`);

        baselineTsserverLogs("pluginsAsync", "plugins are not loaded immediately", session);
    });

    it("plugins evaluation in correct order even if imports resolve out of order", async () => {
        const { host, session } = setup(["plugin-a", "plugin-b"]);
        const pluginADeferred = defer();
        const pluginBDeferred = defer();
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            const promise = moduleName === "plugin-a" ? pluginADeferred.promise : pluginBDeferred.promise;
            await promise;
            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => {
                    session.logger.log(`invoke plugin ${moduleName}`);
                    return { create: info => info.languageService };
                }) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([{ file: "^memfs:/foo.ts", content: "" }], session);
        const projectService = session.getProjectService();

        // wait a turn
        await Promise.resolve();

        // resolve imports out of order
        pluginBDeferred.resolve();
        pluginADeferred.resolve();

        // wait for load to complete
        await projectService.waitForPendingPlugins();
        session.host.baselineHost("after waitForPendingPlugins ");

        baselineTsserverLogs("pluginsAsync", "plugins evaluation in correct order even if imports resolve out of order", session);
    });

    it("sends projectsUpdatedInBackground event", async () => {
        const { host, session } = setup(["plugin-a"]);
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            await Promise.resolve(); // simulate at least a single turn delay
            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => ({ create: info => info.languageService })) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([{ file: "^memfs:/foo.ts", content: "" }], session);
        const projectService = session.getProjectService();

        await projectService.waitForPendingPlugins();
        session.host.baselineHost("after waitForPendingPlugins");

        baselineTsserverLogs("pluginsAsync", "sends projectsUpdatedInBackground event", session);
    });

    it("adds external files", async () => {
        const { host, session } = setup(["plugin-a"]);
        const pluginAShouldLoad = defer();
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            // wait until the initial external files are requested from the project service.
            await pluginAShouldLoad.promise;
            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => ({
                    create: info => info.languageService,
                    getExternalFiles: () => ["external.txt"],
                })) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([{ file: "^memfs:/foo.ts", content: "" }], session);
        const projectService = session.getProjectService();

        const project = projectService.inferredProjects[0];

        session.logger.log(`External files before plugin is loaded: ${project.getExternalFiles().join(",")}`);
        // we've ready the initial set of external files, allow the plugin to continue loading.
        pluginAShouldLoad.resolve();

        // wait for plugins
        await projectService.waitForPendingPlugins();

        host.runQueuedTimeoutCallbacks();

        session.logger.log(`External files before plugin after plugin is loaded: ${project.getExternalFiles().join(",")}`);
        baselineTsserverLogs("pluginsAsync", "adds external files", session);
    });

    it("project is closed before plugins are loaded", async () => {
        const { host, session } = setup(["plugin-a"]);
        const pluginALoaded = defer();
        const projectClosed = defer();
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            // mark that the plugin has started loading
            pluginALoaded.resolve();

            // wait until after a project close has been requested to continue
            session.logger.log(`Awaiting project close`);
            await projectClosed.promise;

            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => ({ create: info => info.languageService })) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([{ file: "^memfs:/foo.ts", content: "" }], session);
        const projectService = session.getProjectService();

        // wait for the plugin to start loading
        await pluginALoaded.promise;

        // close the project
        closeFilesForSession(["^memfs:/foo.ts"], session);
        openFilesForSession([{ file: "/random/foo2.ts", content: "" }], session);

        // continue loading the plugin
        projectClosed.resolve();

        session.host.baselineHost("before waitForPendingPlugins");
        await projectService.waitForPendingPlugins(); // For closed foo.ts
        session.host.baselineHost("after waitForPendingPlugins for closed foo.ts");
        await projectService.waitForPendingPlugins(); // For random file
        session.host.baselineHost("after waitForPendingPlugins for random file");

        // the project was closed before plugins were ready. no project update should have been requested
        baselineTsserverLogs("pluginsAsync", "project is closed before plugins are loaded", session);
    });

    it("project is deferred closed before plugins are loaded", async () => {
        const config = "/home/src/projects/project/tsconfig.json";
        const file = "/home/src/projects/project/a.ts";
        const host = TestServerHost.createServerHost({
            [config]: `{}`,
            [file]: "export const a = 10;",
        });
        const session = new TestSession({ host, globalPlugins: ["plugin-a"] });
        const pluginALoaded = defer();
        let configFileDeleted: Deferred<void> | undefined = defer();
        host.importPlugin = async (_root: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            session.logger.log(`request import ${moduleName}`);
            // mark that the plugin has started loading
            pluginALoaded.resolve();
            // wait until after a project close has been requested to continue
            if (configFileDeleted) {
                session.logger.log(`awaiting config file delete`);
                await configFileDeleted.promise;
            }
            session.logger.log(`fulfill import ${moduleName}`);
            return {
                module: (() => ({ create: info => info.languageService })) as ts.server.PluginModuleFactory,
                error: undefined,
            };
        };

        openFilesForSession([file], session);
        const projectService = session.getProjectService();

        // wait for the plugin to start loading
        await pluginALoaded.promise;

        session.host.baselineHost("before deleteFile");
        // close the project
        host.deleteFile(config);
        session.host.baselineHost("after deleteFile");

        // continue loading the plugin
        configFileDeleted.resolve();
        session.host.baselineHost("before waitForPendingPlugins");
        await projectService.waitForPendingPlugins();
        session.host.baselineHost("after waitForPendingPlugins");

        configFileDeleted = undefined;
        host.writeFile(config, "{}");
        host.runQueuedTimeoutCallbacks();
        session.host.baselineHost("before enableRequestedPlugins");
        projectService.enableRequestedPlugins();
        session.host.baselineHost("before waitForPendingPlugins");
        await projectService.waitForPendingPlugins();
        session.host.baselineHost("after waitForPendingPlugins");

        // the project was closed before plugins were ready. no project update should have been requested
        baselineTsserverLogs("pluginsAsync", "project is deferred closed before plugins are loaded", session);
    });
});

import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    openFilesForSession,
} from "../helpers/tsserver";
import { createHostForWatchFactoryPlugins } from "../helpers/watchFactory";

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
        session.logger.log("Change file");
        host.writeFile("/user/username/projects/myproject/b.ts", host.readFile("/user/username/projects/myproject/a.ts")!);
        // Since we have overriden watch, this shouldnt do anything
        host.runQueuedTimeoutCallbacks();

        // Actually invoke watches
        session.logger.log("Invoke plugin watches");
        plugin.watchedFiles.get("/user/username/projects/myproject/b.ts")!.forEach(({ callback }) => callback("/user/username/projects/myproject/b.ts", ts.FileWatcherEventKind.Changed));
        // Host should have updates queued
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("watchFactory", "plugin overriding watch", session);
    });
});

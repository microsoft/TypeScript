import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../../harness/tsserverLogger";
import {
    createWatchUtils,
    WatchUtils,
} from "../../../../harness/watchUtils";
import * as ts from "../../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createSessionWithCustomEventHandler,
    openFilesForSession,
    TestSession,
} from "../../helpers/tsserver";
import {
    createServerHost,
    libFile,
    TestServerHost,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: watchEvents", () => {
    interface TestServerHostWithCustomWatch extends TestServerHost {
        factoryData: {
            watchUtils: WatchUtils<ts.server.protocol.CreateFileWatcherEventBody, ts.server.protocol.CreateDirectoryWatcherEventBody>;
            watchFile(data: ts.server.protocol.CreateFileWatcherEventBody): void;
            watchDirectory(data: ts.server.protocol.CreateDirectoryWatcherEventBody): void;
            closeWatcher(data: ts.server.protocol.CloseFileWatcherEventBody): void;
        };
    }

    function createTestServerHostWithCustomWatch(
        logger: LoggerWithInMemoryLogs,
    ) {
        const idToClose = new Map<number, () => void>();
        const host = logger.host as TestServerHostWithCustomWatch;
        const originalSerializeWatches = host.serializeWatches;
        host.serializeWatches = serializeWatches;
        host.factoryData = {
            watchUtils: createWatchUtils<ts.server.protocol.CreateFileWatcherEventBody, ts.server.protocol.CreateDirectoryWatcherEventBody>(
                "Custom WatchedFiles",
                "Custom WatchedDirectories",
                host.getCanonicalFileName,
            ),
            watchFile,
            watchDirectory,
            closeWatcher,
        };
        return host;

        function watchFile(data: ts.server.protocol.CreateFileWatcherEventBody) {
            logger.log(`Custom watchFile: ${data.id}: ${data.path}`);
            ts.Debug.assert(!idToClose.has(data.id));
            const result = host.factoryData.watchUtils.pollingWatch(data.path, data);
            idToClose.set(data.id, () => {
                logger.log(`Custom watchFile:: Close:: ${data.id}: ${data.path}`);
                result.close();
            });
        }

        function watchDirectory(data: ts.server.protocol.CreateDirectoryWatcherEventBody) {
            logger.log(`Custom watchDirectory: ${data.id}: ${data.path} ${data.recursive}`);
            ts.Debug.assert(!idToClose.has(data.id));
            const result = host.factoryData.watchUtils.fsWatch(data.path, data.recursive, data);
            idToClose.set(data.id, () => {
                logger.log(`Custom watchDirectory:: Close:: ${data.id}: ${data.path} ${data.recursive}`);
                result.close();
            });
        }

        function closeWatcher(data: ts.server.protocol.CloseFileWatcherEventBody) {
            const close = idToClose.get(data.id);
            if (close) {
                idToClose.delete(data.id);
                close();
            }
        }

        function serializeWatches(baseline: string[] = []) {
            if (host.factoryData.watchUtils.getHasWatchChanges()) host.watchUtils.setHasWatchChanges();
            const hasWatchChanges = host.watchUtils.getHasWatchChanges();
            originalSerializeWatches.call(host, baseline);
            if (hasWatchChanges) {
                host.factoryData.watchUtils.setHasWatchChanges();
                host.factoryData.watchUtils.serializeWatches(baseline);
            }
            return baseline;
        }
    }

    function updateFileOnHost(session: TestSession, file: string, log: string, content?: string) {
        // Change b.ts
        session.logger.log(`${log}: ${file}`);
        if (content) session.host.appendFile(file, content);
        else session.host.writeFile(file, session.host.readFile("/user/username/projects/myproject/a.ts")!);
        session.host.runQueuedTimeoutCallbacks();
    }

    function invokeDirectoryWatcher(session: TestSession, dir: string, path: string, eventType: ts.server.protocol.WatchChangeRequestArgs["eventType"]) {
        session.logger.log(`Custom watch:: ${dir} ${path} ${eventType}`);
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.fsWatchesRecursive.forEach(
            dir,
            data =>
                session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                    command: ts.server.protocol.CommandTypes.WatchChange,
                    arguments: { id: data.id, path, eventType },
                }),
        );
    }

    function invokeFileWatcher(session: TestSession, path: string, eventType: ts.server.protocol.WatchChangeRequestArgs["eventType"]) {
        session.logger.log(`Custom watch:: ${path} ${eventType}`);
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.pollingWatches.forEach(
            path,
            data =>
                session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                    command: ts.server.protocol.CommandTypes.WatchChange,
                    arguments: { id: data.id, path, eventType },
                }),
        );
    }

    function addFile(session: TestSession, path: string) {
        updateFileOnHost(session, path, "Add file");
        invokeDirectoryWatcher(session, "/user/username/projects/myproject", path, "create");
        session.host.runQueuedTimeoutCallbacks();
    }

    function changeFile(session: TestSession, path: string, content?: string) {
        updateFileOnHost(session, path, "Change File", content);
        invokeFileWatcher(session, path, "update");
        invokeDirectoryWatcher(session, ts.getDirectoryPath(path), path, "update");
        session.host.runQueuedTimeoutCallbacks();
    }

    function npmInstall(session: TestSession) {
        session.logger.log("update with npm install");
        session.host.appendFile("/user/username/projects/myproject/node_modules/something/index.d.ts", `export const y = 20;`);
        session.host.runQueuedTimeoutCallbacks();
        invokeDirectoryWatcher(session, "/user/username/projects/myproject/node_modules", "/user/username/projects/myproject/node_modules/something/index.d.ts", "update");
        session.host.runQueuedTimeoutCallbacks();
    }

    function setup() {
        const inputHost = createServerHost({
            "/user/username/projects/myproject/tsconfig.json": "{}",
            "/user/username/projects/myproject/a.ts": `export class a { prop = "hello"; foo() { return this.prop; } }`,
            "/user/username/projects/myproject/b.ts": `export class b { prop = "hello"; foo() { return this.prop; } }`,
            "/user/username/projects/myproject/m.ts": `import { x } from "something"`,
            "/user/username/projects/myproject/node_modules/something/index.d.ts": `export const x = 10;`,
            [libFile.path]: libFile.content,
        });
        const logger = createLoggerWithInMemoryLogs(inputHost);
        const host = createTestServerHostWithCustomWatch(logger);
        return { host, logger };
    }

    it("canUseWatchEvents", () => {
        const { host, logger } = setup();
        const session = createSessionWithCustomEventHandler({ host, canUseWatchEvents: true, logger }, handleWatchEvents);
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Directory watcher
        addFile(session, "/user/username/projects/myproject/c.ts");

        // File Watcher
        changeFile(session, "/user/username/projects/myproject/b.ts");

        // Close watcher
        openFilesForSession(["/user/username/projects/myproject/b.ts"], session);

        // Re watch
        closeFilesForSession(["/user/username/projects/myproject/b.ts"], session);

        // Update c.ts
        changeFile(session, "/user/username/projects/myproject/c.ts", `export const y = 20;`);

        // Update with npm install
        npmInstall(session);

        baselineTsserverLogs("events/watchEvents", `canUseWatchEvents`, session);
        function handleWatchEvents(event: ts.server.ProjectServiceEvent) {
            switch (event.eventName) {
                case ts.server.CreateFileWatcherEvent:
                    host.factoryData.watchFile(event.data);
                    break;
                case ts.server.CreateDirectoryWatcherEvent:
                    host.factoryData.watchDirectory(event.data);
                    break;
                case ts.server.CloseFileWatcherEvent:
                    host.factoryData.closeWatcher(event.data);
                    break;
                default:
                    break;
            }
        }
    });

    it("canUseWatchEvents without canUseEvents", () => {
        const { host, logger } = setup();
        const session = new TestSession({ host, canUseEvents: false, canUseWatchEvents: true, logger });
        openFilesForSession(["/user/username/projects/myproject/a.ts"], session);

        // Directory watcher
        addFile(session, "/user/username/projects/myproject/c.ts");

        // File Watcher
        changeFile(session, "/user/username/projects/myproject/b.ts");

        // Close watcher
        openFilesForSession(["/user/username/projects/myproject/b.ts"], session);

        // Re watch
        closeFilesForSession(["/user/username/projects/myproject/b.ts"], session);

        // Shouldnt have watch change request
        logger.msg = (s, type) => logger.info(`${type}:: ${s}`);
        session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
            command: ts.server.protocol.CommandTypes.WatchChange,
            arguments: { id: 1, path: "/user/username/projects/myproject/b.ts", eventType: "update" },
        });

        // Update c.ts
        changeFile(session, "/user/username/projects/myproject/c.ts", `export const y = 20;`);

        // Update with npm install
        npmInstall(session);

        baselineTsserverLogs("events/watchEvents", `canUseWatchEvents without canUseEvents`, session);
    });
});

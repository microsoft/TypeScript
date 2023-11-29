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

    function updateFileOnHost(session: TestSession, file: string, log: string) {
        // Change b.ts
        session.logger.log(log);
        session.host.writeFile(file, session.host.readFile("/user/username/projects/myproject/a.ts")!);
        session.host.runQueuedTimeoutCallbacks();
    }

    function addFile(session: TestSession, path: string) {
        updateFileOnHost(session, path, "Add file");
        session.logger.log("Custom watch");
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.fsWatchesRecursive.forEach(
            "/user/username/projects/myproject",
            data =>
                session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                    command: ts.server.protocol.CommandTypes.WatchChange,
                    arguments: { id: data.id, path, eventType: "create" },
                }),
        );
        session.host.runQueuedTimeoutCallbacks();
    }

    function changeFile(session: TestSession, path: string) {
        updateFileOnHost(session, path, "Change File");
        session.logger.log("Custom watch");
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.pollingWatches.forEach(
            path,
            data =>
                session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                    command: ts.server.protocol.CommandTypes.WatchChange,
                    arguments: { id: data.id, path, eventType: "update" },
                }),
        );
        session.host.runQueuedTimeoutCallbacks();
    }

    function setup() {
        const inputHost = createServerHost({
            "/user/username/projects/myproject/tsconfig.json": "{}",
            "/user/username/projects/myproject/a.ts": `export class a { prop = "hello"; foo() { return this.prop; } }`,
            "/user/username/projects/myproject/b.ts": `export class b { prop = "hello"; foo() { return this.prop; } }`,
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

        baselineTsserverLogs("events/watchEvents", `canUseWatchEvents without canUseEvents`, session);
    });
});

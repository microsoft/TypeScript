import * as ts from "../../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createLoggerWithInMemoryLogs,
    createSession,
    createSessionWithCustomEventHandler,
    Logger,
    openFilesForSession,
    TestSession,
} from "../../helpers/tsserver";
import {
    createServerHost,
    libFile,
    serializeMultiMap,
    TestServerHost,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: watchEvents", () => {
    interface TestServerHostWithCustomWatch extends TestServerHost {
        factoryData: {
            watchedFiles: ts.MultiMap<string, ts.server.protocol.CreateFileWatcherEventBody>;
            watchedDirectories: ts.MultiMap<string, ts.server.protocol.CreateDirectoryWatcherEventBody>;
            watchedDirectoriesRecursive: ts.MultiMap<string, ts.server.protocol.CreateDirectoryWatcherEventBody>;
            watchFile(data: ts.server.protocol.CreateFileWatcherEventBody): void;
            watchDirectory(data: ts.server.protocol.CreateDirectoryWatcherEventBody): void;
            closeWatcher(data: ts.server.protocol.CloseFileWatcherEventBody): void;
        };
    }

    function createTestServerHostWithCustomWatch(
        logger: Logger,
    ) {
        const idToClose = new Map<number, () => void>();
        let serializedWatchedFiles: Map<string, ts.server.protocol.CreateFileWatcherEventBody[]> | undefined;
        let serializedWatchedDirectories: Map<string, ts.server.protocol.CreateDirectoryWatcherEventBody[]> | undefined;
        let serializedWatchedDirectoriesRecursive: Map<string, ts.server.protocol.CreateDirectoryWatcherEventBody[]> | undefined;
        const host = logger.host as TestServerHostWithCustomWatch;
        const originalSerializeWatches = host.serializeWatches;
        host.serializeWatches = serializeWatches;
        host.factoryData = {
            watchedFiles: ts.createMultiMap(),
            watchedDirectories: ts.createMultiMap(),
            watchedDirectoriesRecursive: ts.createMultiMap(),
            watchFile,
            watchDirectory,
            closeWatcher,
        };
        return host;

        function watchFile(data: ts.server.protocol.CreateFileWatcherEventBody) {
            logger.log(`Custom watchFile: ${data.id}: ${data.path}`);
            ts.Debug.assert(!idToClose.has(data.id));
            host.factoryData.watchedFiles.add(data.path, data);
            host.hasWatchChanges = true;
            idToClose.set(data.id, () => {
                logger.log(`Custom watchFile:: Close:: ${data.id}: ${data.path}`);
                host.factoryData.watchedFiles.remove(data.path, data);
            });
        }

        function watchDirectory(data: ts.server.protocol.CreateDirectoryWatcherEventBody) {
            logger.log(`Custom watchDirectory: ${data.id}: ${data.path} ${data.recursive}`);
            ts.Debug.assert(!idToClose.has(data.id));
            (data.recursive ? host.factoryData.watchedDirectoriesRecursive : host.factoryData.watchedDirectories).add(data.path, data);
            host.hasWatchChanges = true;
            idToClose.set(data.id, () => {
                logger.log(`Custom watchDirectory:: Close:: ${data.id}: ${data.path} ${data.recursive}`);
                (data.recursive ? host.factoryData.watchedDirectoriesRecursive : host.factoryData.watchedDirectories).remove(data.path, data);
            });
        }

        function closeWatcher(data: ts.server.protocol.CloseFileWatcherEventBody) {
            const close = idToClose.get(data.id);
            if (close) {
                idToClose.delete(data.id);
                host.hasWatchChanges = true;
                close();
            }
        }

        function serializeWatches(baseline: string[] = []) {
            const hasWatchChanges = host.hasWatchChanges;
            originalSerializeWatches.call(host, baseline);
            if (!hasWatchChanges) return baseline;
            serializedWatchedFiles = serializeMultiMap(baseline, `Custom WatchedFiles`, host.factoryData.watchedFiles, serializedWatchedFiles);
            serializedWatchedDirectories = serializeMultiMap(baseline, `Custom WatchedDirectories:Recursive`, host.factoryData.watchedDirectoriesRecursive, serializedWatchedDirectories);
            serializedWatchedDirectoriesRecursive = serializeMultiMap(baseline, `Custom WatchedDirectories`, host.factoryData.watchedDirectories, serializedWatchedDirectoriesRecursive);
            return baseline;
        }
    }

    function updateFileOnHost(session: TestSession, file: string, log: string) {
        // Change b.ts
        session.logger.log(log);
        session.testhost.writeFile(file, session.testhost.readFile("/user/username/projects/myproject/a.ts")!);
        session.testhost.runQueuedTimeoutCallbacks();
    }

    function addFile(session: TestSession, path: string) {
        updateFileOnHost(session, path, "Add file");
        session.logger.log("Custom watch");
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchedDirectoriesRecursive.get("/user/username/projects/myproject")?.forEach(data =>
            session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                command: ts.server.protocol.CommandTypes.WatchChange,
                arguments: { id: data.id, path, eventType: "create" },
            })
        );
        session.testhost.runQueuedTimeoutCallbacks();
    }

    function changeFile(session: TestSession, path: string) {
        updateFileOnHost(session, path, "Change File");
        session.logger.log("Custom watch");
        (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchedFiles.get(path)?.forEach(data =>
            session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                command: ts.server.protocol.CommandTypes.WatchChange,
                arguments: { id: data.id, path, eventType: "update" },
            })
        );
        session.testhost.runQueuedTimeoutCallbacks();
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
        const session = createSessionWithCustomEventHandler(logger.host!, { canUseWatchEvents: true, logger }, handleWatchEvents);
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
        const { logger } = setup();
        const session = createSession(logger.host!, { canUseEvents: false, logger });
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

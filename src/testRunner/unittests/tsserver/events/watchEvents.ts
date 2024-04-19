import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../../harness/tsserverLogger";
import {
    createWatchUtils,
    Watches,
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
                host,
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
            logger.log(`Custom watchDirectory: ${data.id}: ${data.path} ${data.recursive} ${data.ignoreUpdate}`);
            ts.Debug.assert(!idToClose.has(data.id));
            const result = host.factoryData.watchUtils.fsWatch(data.path, data.recursive, data);
            idToClose.set(data.id, () => {
                logger.log(`Custom watchDirectory:: Close:: ${data.id}: ${data.path} ${data.recursive} ${data.ignoreUpdate}`);
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
        if (content && session.host.fileExists(file)) session.host.appendFile(file, content);
        else session.host.writeFile(file, content ?? session.host.readFile("/user/username/projects/myproject/a.ts")!);
        session.host.runQueuedTimeoutCallbacks();
    }

    function collectWatchChanges<T extends ts.server.protocol.CreateFileWatcherEventBody | ts.server.protocol.CreateDirectoryWatcherEventBody>(
        session: TestSession,
        watches: Watches<T>,
        path: string,
        eventPath: string,
        eventType: "created" | "deleted" | "updated",
        ignoreUpdate?: (data: T) => boolean,
    ) {
        session.logger.log(`Custom watch:: ${path} ${eventPath} ${eventType}`);
        let result: ts.server.protocol.WatchChangeRequestArgs[] | undefined;
        watches.forEach(
            path,
            data => {
                if (ignoreUpdate?.(data)) return;
                switch (eventType) {
                    case "created":
                        (result ??= []).push({ id: data.id, created: [eventPath] });
                        break;
                    case "deleted":
                        (result ??= []).push({ id: data.id, deleted: [eventPath] });
                        break;
                    case "updated":
                        (result ??= []).push({ id: data.id, updated: [eventPath] });
                        break;
                    default:
                        ts.Debug.assertNever(eventType);
                }
            },
        );
        return result;
    }

    function collectDirectoryWatcherChanges(
        session: TestSession,
        dir: string,
        eventPath: string,
        eventType: "created" | "deleted" | "updated",
    ) {
        return collectWatchChanges(
            session,
            (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.fsWatchesRecursive,
            dir,
            eventPath,
            eventType,
            data => !!data.ignoreUpdate && eventType === "updated",
        );
    }

    function collectFileWatcherChanges(
        session: TestSession,
        file: string,
        eventType: "created" | "deleted" | "updated",
        eventPath?: string,
    ) {
        return collectWatchChanges(
            session,
            (session.logger.host as TestServerHostWithCustomWatch).factoryData.watchUtils.pollingWatches,
            file,
            eventPath ?? file,
            eventType,
        );
    }

    function invokeWatchChange(
        session: TestSession,
        ...args: (ts.server.protocol.WatchChangeRequestArgs[] | undefined)[]
    ) {
        let result: Map<number, ts.server.protocol.WatchChangeRequestArgs> | undefined;
        args.forEach(arg =>
            arg?.forEach(value => {
                result ??= new Map();
                const valueInResult = result.get(value.id);
                if (!valueInResult) result.set(value.id, value);
                else {
                    valueInResult.created = ts.combine(valueInResult.created, value.created);
                    valueInResult.deleted = ts.combine(valueInResult.deleted, value.deleted);
                    valueInResult.updated = ts.combine(valueInResult.updated, value.updated);
                }
            })
        );
        if (result) {
            session.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
                command: ts.server.protocol.CommandTypes.WatchChange,
                arguments: ts.singleOrMany(ts.arrayFrom(result.values())),
            });
        }
    }

    function addFile(session: TestSession, path: string, content?: string, eventPath?: string) {
        updateFileOnHost(session, path, "Add file", content);
        invokeWatchChange(
            session,
            collectDirectoryWatcherChanges(session, ts.getDirectoryPath(path), eventPath ?? path, "created"),
        );
        session.host.runQueuedTimeoutCallbacks();
    }

    function changeFile(session: TestSession, path: string, content?: string, eventPath?: string) {
        updateFileOnHost(session, path, "Change File", content);
        invokeWatchChange(
            session,
            collectFileWatcherChanges(session, path, "updated", eventPath),
            collectDirectoryWatcherChanges(session, ts.getDirectoryPath(path), eventPath ?? path, "updated"),
        );
        session.host.runQueuedTimeoutCallbacks();
    }

    function npmInstall(session: TestSession) {
        session.logger.log("update with npm install");
        session.host.appendFile("/user/username/projects/myproject/node_modules/something/index.d.ts", `export const y = 20;`);
        session.host.runQueuedTimeoutCallbacks();
        invokeWatchChange(
            session,
            collectDirectoryWatcherChanges(
                session,
                "/user/username/projects/myproject/node_modules",
                "/user/username/projects/myproject/node_modules/something/index.d.ts",
                "updated",
            ),
        );
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
        host.runQueuedTimeoutCallbacks();

        // Add and change multiple files - combine and send multiple requests together
        updateFileOnHost(session, "/user/username/projects/myproject/d.ts", "Add file");
        updateFileOnHost(session, "/user/username/projects/myproject/c.ts", "Change File", `export const z = 30;`);
        updateFileOnHost(session, "/user/username/projects/myproject/e.ts", "Add File");
        invokeWatchChange(
            session,
            collectDirectoryWatcherChanges(session, "/user/username/projects/myproject", "/user/username/projects/myproject/d.ts", "created"),
            collectFileWatcherChanges(session, "/user/username/projects/myproject/c.ts", "updated"),
            collectDirectoryWatcherChanges(session, "/user/username/projects/myproject", "/user/username/projects/myproject/c.ts", "updated"),
            collectDirectoryWatcherChanges(session, "/user/username/projects/myproject", "/user/username/projects/myproject/e.ts", "created"),
        );
        session.host.runQueuedTimeoutCallbacks();

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
            arguments: { id: 1, updated: ["/user/username/projects/myproject/b.ts"] },
        });

        // Update c.ts
        changeFile(session, "/user/username/projects/myproject/c.ts", `export const y = 20;`);

        // Update with npm install
        npmInstall(session);

        baselineTsserverLogs("events/watchEvents", `canUseWatchEvents without canUseEvents`, session);
    });

    it("canUseWatchEvents on windows", () => {
        const inputHost = createServerHost({
            "c:\\projects\\myproject\\tsconfig.json": "{}",
            "c:\\projects\\myproject\\a.ts": `export class a { prop = "hello"; foo() { return this.prop; } }`,
            "c:\\projects\\myproject\\b.ts": `export class b { prop = "hello"; foo() { return this.prop; } }`,
            "c:\\projects\\myproject\\m.ts": `import { x } from "something"`,
            "c:\\projects\\myproject\\node_modules\\something\\index.d.ts": `export const x = 10;`,
            [libFile.path]: libFile.content,
        }, { windowsStyleRoot: "c:\\" });
        const logger = createLoggerWithInMemoryLogs(inputHost);
        const host = createTestServerHostWithCustomWatch(logger);

        const session = createSessionWithCustomEventHandler({ host, canUseWatchEvents: true, logger }, handleWatchEvents);
        openFilesForSession(["c:\\projects\\myproject\\a.ts"], session);

        // Directory watcher
        addFile(session, "c:/projects/myproject/c.ts", `export xyx = 10;`, "c:\\projects\\myproject\\c.ts");

        // File Watcher
        changeFile(session, "c:/projects/myproject/b.ts", "export const ss = 20;", "c:\\projects\\myproject\\b.ts");

        // Close watcher
        openFilesForSession(["c:\\projects\\myproject\\b.ts"], session);

        // Re watch
        closeFilesForSession(["c:\\projects\\myproject\\b.ts"], session);

        // Update c.ts
        changeFile(session, "c:/projects/myproject/c.ts", "export const ss = 20;", "c:\\projects\\myproject\\b.ts");

        // Update with npm install
        session.logger.log("update with npm install");
        session.host.appendFile("c:\\projects\\myproject\\node_modules\\something\\index.d.ts", `export const y = 20;`);
        session.host.runQueuedTimeoutCallbacks();
        invokeWatchChange(
            session,
            collectDirectoryWatcherChanges(
                session,
                "c:/projects/myproject/node_modules",
                "c:\\projects\\myproject\\node_modules\\something\\index.d.ts",
                "updated",
            ),
        );
        session.host.runQueuedTimeoutCallbacks();
        host.runQueuedTimeoutCallbacks();

        // Add and change multiple files - combine and send multiple requests together
        updateFileOnHost(session, "c:/projects/myproject/d.ts", "Add file", "export const yy = 10;");
        updateFileOnHost(session, "c:/projects/myproject/c.ts", "Change File", `export const z = 30;`);
        updateFileOnHost(session, "c:/projects/myproject/e.ts", "Add File", "export const zz = 40;");
        invokeWatchChange(
            session,
            collectDirectoryWatcherChanges(session, "c:/projects/myproject", "c:\\projects\\myproject\\d.ts", "created"),
            collectFileWatcherChanges(session, "c:/projects/myproject/c.ts", "updated", "c:\\projects\\myproject\\c.ts"),
            collectDirectoryWatcherChanges(session, "c:/projects/myproject", "c:\\projects\\myproject\\c.ts", "updated"),
            collectDirectoryWatcherChanges(session, "c:/projects/myproject", "c:\\projects\\myproject\\e.ts", "created"),
        );
        session.host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("events/watchEvents", `canUseWatchEvents on windows`, session);
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
});

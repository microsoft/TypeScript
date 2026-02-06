import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../../helpers/tsserver.js";
import { TestServerHost } from "../../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: events:: watchEvents::", () => {
    function verifyCanUseWatchEvents(
        canUseEvents: boolean,
        projectPath: string,
        directorySeparator: string,
        windowsStyleRoot?: string,
    ) {
        it(canUseEvents ? windowsStyleRoot ? "canUseWatchEvents on windows" : "canUseWatchEvents" : "canUseWatchEvents without canUseEvents", () => {
            const host = TestServerHost.createServerHost({
                [`${projectPath}${directorySeparator}tsconfig.json`]: "{}",
                [`${projectPath}${directorySeparator}a.ts`]: `export class a { prop = "hello"; foo() { return this.prop; } }`,
                [`${projectPath}${directorySeparator}b.ts`]: `export class b { prop = "hello"; foo() { return this.prop; } }`,
                [`${projectPath}${directorySeparator}m.ts`]: `import { x } from "something"`,
                [`${projectPath}${directorySeparator}node_modules${directorySeparator}something${directorySeparator}index.d.ts`]: `export const x = 10;`,
            }, { windowsStyleRoot });
            const session = new TestSession({ host, canUseWatchEvents: true, canUseEvents });
            if (!canUseEvents) session.logger.msg = (s, type) => session.logger.info(`${type}:: ${s}`);
            openFilesForSession([`${projectPath}${directorySeparator}a.ts`], session);

            // Directory watcher
            host.writeFile(`${projectPath}${directorySeparator}c.ts`, `export class a { prop = "hello"; foo() { return this.prop; } }`);
            host.runQueuedTimeoutCallbacks();
            session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();

            // File Watcher
            host.writeFile(`${projectPath}${directorySeparator}b.ts`, `export class a { prop = "hello"; foo() { return this.prop; } }`);
            host.runQueuedTimeoutCallbacks();
            session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();

            // Close watcher
            openFilesForSession([`${projectPath}${directorySeparator}b.ts`], session);

            // Re watch
            closeFilesForSession([`${projectPath}${directorySeparator}b.ts`], session);

            // Update c.ts
            host.appendFile(`${projectPath}${directorySeparator}c.ts`, `export const y = 20;`);
            host.runQueuedTimeoutCallbacks();
            session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();

            // Add and change multiple files - combine and send multiple requests together
            session.host.writeFile(`${projectPath}${directorySeparator}d.ts`, `export class a { prop = "hello"; foo() { return this.prop; } }`);
            session.host.runQueuedTimeoutCallbacks();
            session.host.appendFile(`${projectPath}${directorySeparator}c.ts`, `export const z = 30;`);
            session.host.runQueuedTimeoutCallbacks();
            session.host.writeFile(`${projectPath}${directorySeparator}e.ts`, `export class a { prop = "hello"; foo() { return this.prop; } }`);
            session.host.runQueuedTimeoutCallbacks();
            session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();

            // Update with npm install
            host.appendFile(`${projectPath}${directorySeparator}node_modules${directorySeparator}something${directorySeparator}index.d.ts`, `export const y = 20;`);
            host.runQueuedTimeoutCallbacks();
            session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("events/watchEvents", canUseEvents ? windowsStyleRoot ? "canUseWatchEvents on windows" : "canUseWatchEvents" : "canUseWatchEvents without canUseEvents", session);
        });
    }

    verifyCanUseWatchEvents(/*canUseEvents*/ true, "/user/username/projects/myproject", "/");
    verifyCanUseWatchEvents(/*canUseEvents*/ false, "/user/username/projects/myproject", "/");
    verifyCanUseWatchEvents(/*canUseEvents*/ true, "c:\\projects\\myproject", "\\", "c:\\");
});

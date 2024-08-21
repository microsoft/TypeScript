import * as fs from "fs";

import {
    IO,
    skipSysTests,
} from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import {
    defer,
    Deferred,
} from "../../_namespaces/Utils.js";
import {
    FileOrFolderOrSymLinkMap,
    osFlavorToString,
    TestServerHost,
    TestServerHostOsFlavor,
} from "../helpers/virtualFileSystemWithWatch.js";
describe("unittests:: sys:: symlinkWatching::", () => {
    function delayedOp(op: () => void, delay: number) {
        ts.sys.setTimeout!(op, delay);
    }

    function modifiedTimeToString(d: Date | undefined) {
        if (!d) return undefined;
        return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}.${d.getMilliseconds().toString().padStart(3, "0")}`;
    }

    function verifyWatchFile(
        scenario: string,
        getSys: () => ts.System,
        file: string,
        link: string,
        watchOptions: Pick<ts.WatchOptions, "watchFile">,
        getFileName?: (file: string) => string,
    ) {
        if (skipSysTests) return;
        it(scenario, async () => {
            const sys = getSys();
            const fileResult = watchFile(file);
            const linkResult = watchFile(link);

            await writeFile(file);
            await writeFile(link);

            fileResult.watcher.close();
            linkResult.watcher.close();

            function watchFile(toWatch: string) {
                const result = {
                    watcher: sys.watchFile!(
                        toWatch,
                        (fileName, eventKind, modifiedTime) => {
                            try {
                                assert.equal(fileName, toWatch);
                                assert.equal(eventKind, ts.FileWatcherEventKind.Changed);
                                const actual = modifiedTimeToString(modifiedTime);
                                assert(actual === undefined || actual === modifiedTimeToString(sys.getModifiedTime!(file)));
                            }
                            catch (e) {
                                result.deferred.reject(e);
                                return;
                            }
                            result.deferred.resolve();
                        },
                        10,
                        watchOptions,
                    ),
                    deferred: undefined! as Deferred<void>,
                };
                return result;
            }

            async function writeFile(onFile: string) {
                fileResult.deferred = defer();
                linkResult.deferred = defer();
                delayedOp(() => sys.writeFile(getFileName?.(onFile) ?? onFile, "export const x = 100;"), 100);
                // Should invoke on file as well as link
                await fileResult.deferred.promise;
                await linkResult.deferred.promise;
            }
        });
    }

    interface EventAndFileName {
        event: "rename" | "change";
        // eslint-disable-next-line no-restricted-syntax
        fileName: string | null | undefined;
    }
    interface ExpectedEventAndFileName {
        event: "rename" | "change" | readonly ["rename", "change"]; // Its expected event name or any of the event names
        // eslint-disable-next-line no-restricted-syntax
        fileName: string | null | undefined;
        optional?: boolean; // This event is optional and may or may not be triggered on a given OS (see https://github.com/nodejs/node/issues/53903)
    }
    type FsWatch<System extends ts.System> = (dir: string, recursive: boolean, cb: ts.FsWatchCallback, sys: System) => ts.FileWatcher;
    interface WatchDirectoryResult {
        dir: string;
        watcher: ts.FileWatcher;
        actual: EventAndFileName[];
    }
    function watchDirectory<System extends ts.System>(
        sys: System,
        fsWatch: FsWatch<System>,
        dir: string,
        recursive: boolean,
    ) {
        const result: WatchDirectoryResult = {
            dir,
            watcher: fsWatch(
                dir,
                recursive,
                (event, fileName) => result.actual.push({ event, fileName: fileName ? ts.normalizeSlashes(fileName) : fileName }),
                sys,
            ),
            actual: [],
        };
        return result;
    }

    function initializeWatchDirectoryResult(...results: WatchDirectoryResult[]) {
        results.forEach(result => result.actual.length = 0);
    }

    function verfiyWatchDirectoryResult(
        opType: string,
        dirResult: WatchDirectoryResult,
        linkResult: WatchDirectoryResult,
        expectedResult: readonly ExpectedEventAndFileName[] | undefined,
    ) {
        const deferred = defer();
        delayedOp(() => {
            if (opType !== "init") {
                try {
                    verifyEventAndFileNames(`${opType}:: dir`, dirResult.actual, expectedResult);
                    verifyEventAndFileNames(`${opType}:: link`, linkResult.actual, expectedResult);
                }
                catch (e) {
                    deferred.reject(e);
                    return;
                }
            }
            deferred.resolve();
        }, !!process.env.CI ? 1000 : 500);
        return deferred.promise;
    }

    function compareEventFileName(a: EventAndFileName["fileName"], b: EventAndFileName["fileName"]) {
        return ts.compareStringsCaseSensitive(a ?? undefined, b ?? undefined);
    }

    function compareEventAndFileName(a: EventAndFileName, b: EventAndFileName): ts.Comparison {
        return compareEventFileName(b.fileName, a.fileName) || // Also longer string to be before shorter string
            ts.compareStringsCaseSensitive(b.event, a.event); // We want rename to be before change
    }

    function verifyEventAndFileNames(
        prefix: string,
        actual: readonly EventAndFileName[],
        expected: readonly ExpectedEventAndFileName[] | undefined,
    ) {
        const maxExpected = expected?.length ?? 0;
        const minExpected = expected?.reduce((m, e) => e.optional ? m : m + 1, 0) ?? maxExpected;
        const sortedActual = ts.sortAndDeduplicate(actual, compareEventAndFileName);
        assert(sortedActual.length >= minExpected && sortedActual.length <= maxExpected, `${prefix}:: Expected ${JSON.stringify(expected)} events, got ${JSON.stringify(actual)}`);

        let actualIndex = 0;
        let expectedIndex = 0;
        while (actualIndex < sortedActual.length && expectedIndex < maxExpected) {
            const a = sortedActual[actualIndex];
            const e = expected![expectedIndex];
            if (isExpectedEventAndFileName(a, e)) {
                actualIndex++;
                expectedIndex++;
                continue;
            }
            if (e.optional) {
                expectedIndex++;
                continue;
            }
            break;
        }
        if (actualIndex < sortedActual.length) {
            ts.Debug.fail(`${prefix}:: Expected ${JSON.stringify(expected)} events, got ${JSON.stringify(actual)} Sorted: ${JSON.stringify(sortedActual)}`);
        }
        while (expectedIndex < maxExpected) {
            const e = expected![expectedIndex];
            if (e.optional) {
                expectedIndex++;
                continue;
            }
            break;
        }
        assert(expectedIndex >= maxExpected, `${prefix}:: Should get all events: Expected ${JSON.stringify(expected)} events, got ${JSON.stringify(actual)} Sorted: ${JSON.stringify(sortedActual)}`);
    }

    function isExpectedEventAndFileName(actual: EventAndFileName, expected: ExpectedEventAndFileName | undefined) {
        return !!expected &&
            actual.fileName === expected.fileName &&
            (ts.isString(expected.event) ? actual.event === expected.event : ts.contains(expected.event, actual.event));
    }

    interface FsEventsForWatchDirectory extends Record<string, readonly ExpectedEventAndFileName[] | undefined> {
        // The first time events are most of the time are not predictable, so just create random file for that reason
        init?: readonly ExpectedEventAndFileName[];
        fileCreate: readonly ExpectedEventAndFileName[];
        linkFileCreate: readonly ExpectedEventAndFileName[];
        fileChange: readonly ExpectedEventAndFileName[];
        fileModifiedTimeChange: readonly ExpectedEventAndFileName[];
        linkModifiedTimeChange: readonly ExpectedEventAndFileName[];
        linkFileChange: readonly ExpectedEventAndFileName[];
        fileDelete: readonly ExpectedEventAndFileName[];
        linkFileDelete: readonly ExpectedEventAndFileName[];
    }
    function verifyWatchDirectoryUsingFsEvents<System extends ts.System>(
        getSys: () => System,
        fsWatch: FsWatch<System>,
        dir: string,
        link: string,
        osFlavor: TestServerHostOsFlavor,
    ) {
        if (skipSysTests) return;
        it(`watchDirectory using fsEvents ${osFlavorToString(osFlavor)}`, async () => {
            const sys = getSys();
            const tableOfEvents: FsEventsForWatchDirectory = osFlavor === TestServerHostOsFlavor.MacOs ?
                {
                    fileCreate: [
                        { event: "rename", fileName: "file1.ts" },
                    ],
                    linkFileCreate: [
                        { event: "rename", fileName: "file2.ts" },
                    ],
                    fileChange: [
                        // On MacOs 18 and below we might get rename or change and its not deterministic
                        { event: ["rename", "change"], fileName: "file1.ts" },
                    ],
                    linkFileChange: [
                        // On MacOs 18 and below we might get rename or change and its not deterministic
                        { event: ["rename", "change"], fileName: "file2.ts" },
                    ],
                    fileModifiedTimeChange: [
                        // On MacOs 18 and below we might get rename or change and its not deterministic
                        { event: ["rename", "change"], fileName: "file1.ts" },
                    ],
                    linkModifiedTimeChange: [
                        // On MacOs 18 and below we might get rename or change and its not deterministic
                        { event: ["rename", "change"], fileName: "file2.ts" },
                    ],
                    fileDelete: [
                        { event: "rename", fileName: "file1.ts" },
                    ],
                    linkFileDelete: [
                        { event: "rename", fileName: "file2.ts" },
                    ],
                } :
                osFlavor === TestServerHostOsFlavor.Windows ?
                {
                    fileCreate: [
                        { event: "rename", fileName: "file1.ts" },
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkFileCreate: [
                        { event: "rename", fileName: "file2.ts" },
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileChange: [
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkFileChange: [
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileModifiedTimeChange: [
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkModifiedTimeChange: [
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileDelete: [
                        { event: "rename", fileName: "file1.ts" },
                    ],
                    linkFileDelete: [
                        { event: "rename", fileName: "file2.ts" },
                    ],
                } :
                {
                    fileCreate: [
                        { event: "rename", fileName: "file1.ts" },
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkFileCreate: [
                        { event: "rename", fileName: "file2.ts" },
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileChange: [
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkFileChange: [
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileModifiedTimeChange: [
                        { event: "change", fileName: "file1.ts" },
                    ],
                    linkModifiedTimeChange: [
                        { event: "change", fileName: "file2.ts" },
                    ],
                    fileDelete: [
                        { event: "rename", fileName: "file1.ts" },
                    ],
                    linkFileDelete: [
                        { event: "rename", fileName: "file2.ts" },
                    ],
                };
            await testWatchDirectoryOperations(
                sys,
                fsWatch,
                tableOfEvents,
                operation,
                dir,
                link,
                /*recursive*/ false,
                [
                    "init",
                    "fileCreate",
                    "linkFileCreate",
                    "fileChange",
                    "linkFileChange",
                    "fileModifiedTimeChange",
                    "linkModifiedTimeChange",
                    "fileDelete",
                    "linkFileDelete",
                ],
            );

            function operation(sys: System, opType: keyof FsEventsForWatchDirectory) {
                switch (opType) {
                    case "init":
                        sys.writeFile(`${dir}/init.ts`, "export const x = 100;");
                        break;
                    case "fileCreate":
                    case "linkFileCreate":
                        sys.writeFile(fileName(opType), "export const x = 100;");
                        break;
                    case "fileChange":
                    case "linkFileChange":
                        sys.writeFile(fileName(opType), "export const x2 = 100;");
                        break;
                    case "fileModifiedTimeChange":
                    case "linkModifiedTimeChange":
                        sys.setModifiedTime!(fileName(opType), new Date());
                        break;
                    case "fileDelete":
                    case "linkFileDelete":
                        sys.deleteFile!(fileName(opType));
                        break;
                }
            }

            function fileName(opType: string) {
                return ts.startsWith(opType, "file") ?
                    `${dir}/file1.ts` :
                    `${link}/file2.ts`;
            }
        });
    }

    interface RecursiveFsEventsForWatchDirectory extends FsEventsForWatchDirectory {
        linkSubFileCreate: readonly ExpectedEventAndFileName[];
        linkSubFileChange: readonly ExpectedEventAndFileName[];
        linkSubModifiedTimeChange: readonly ExpectedEventAndFileName[];
        linkSubFileDelete: readonly ExpectedEventAndFileName[] | undefined;

        parallelFileCreate: readonly ExpectedEventAndFileName[] | undefined;
        parallelLinkFileCreate: readonly ExpectedEventAndFileName[] | undefined;
        parallelFileChange: readonly ExpectedEventAndFileName[] | undefined;
        parallelLinkFileChange: readonly ExpectedEventAndFileName[] | undefined;
        parallelFileModifiedTimeChange: readonly ExpectedEventAndFileName[] | undefined;
        parallelLinkModifiedTimeChange: readonly ExpectedEventAndFileName[] | undefined;
        parallelFileDelete: readonly ExpectedEventAndFileName[] | undefined;
        parallelLinkFileDelete: readonly ExpectedEventAndFileName[] | undefined;
    }
    function verifyRecursiveWatchDirectoryUsingFsEvents<System extends ts.System>(
        getSys: () => System,
        fsWatch: FsWatch<System>,
        dir: string,
        link: string,
        osFlavor: TestServerHostOsFlavor.Windows | TestServerHostOsFlavor.MacOs,
    ) {
        if (skipSysTests) return;
        const tableOfEvents: RecursiveFsEventsForWatchDirectory = osFlavor === TestServerHostOsFlavor.MacOs ?
            {
                fileCreate: [
                    { event: "rename", fileName: "sub/folder/file1.ts" },
                ],
                linkFileCreate: [
                    { event: "rename", fileName: "sub/folder/file2.ts" },
                ],
                fileChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file1.ts" },
                ],
                linkFileChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file2.ts" },
                ],
                fileModifiedTimeChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file1.ts" },
                ],
                linkModifiedTimeChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file2.ts" },
                ],
                fileDelete: [
                    { event: "rename", fileName: "sub/folder/file1.ts" },
                ],
                linkFileDelete: [
                    { event: "rename", fileName: "sub/folder/file2.ts" },
                ],

                linkSubFileCreate: [
                    { event: "rename", fileName: "sub/folder/file3.ts" },
                ],
                linkSubFileChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file3.ts" },
                ],
                linkSubModifiedTimeChange: [
                    // On MacOs 18 and below we might get rename or change and its not deterministic
                    { event: ["rename", "change"], fileName: "sub/folder/file3.ts" },
                ],
                linkSubFileDelete: [
                    { event: "rename", fileName: "sub/folder/file3.ts" },
                ],

                parallelFileCreate: undefined,
                parallelLinkFileCreate: undefined,
                parallelFileChange: undefined,
                parallelLinkFileChange: undefined,
                parallelFileModifiedTimeChange: undefined,
                parallelLinkModifiedTimeChange: undefined,
                parallelFileDelete: undefined,
                parallelLinkFileDelete: undefined,
            } :
            {
                fileCreate: [
                    { event: "rename", fileName: "sub/folder/file1.ts" },
                    { event: "change", fileName: "sub/folder/file1.ts" },
                    { event: "change", fileName: "sub/folder" },
                ],
                linkFileCreate: [
                    { event: "rename", fileName: "sub/folder/file2.ts" },
                    { event: "change", fileName: "sub/folder/file2.ts" },
                    { event: "change", fileName: "sub/folder" },
                ],
                fileChange: [
                    { event: "change", fileName: "sub/folder/file1.ts" },
                ],
                linkFileChange: [
                    { event: "change", fileName: "sub/folder/file2.ts" },
                ],
                fileModifiedTimeChange: [
                    { event: "change", fileName: "sub/folder/file1.ts" },
                ],
                linkModifiedTimeChange: [
                    { event: "change", fileName: "sub/folder/file2.ts" },
                ],
                fileDelete: [
                    { event: "rename", fileName: "sub/folder/file1.ts" },
                ],
                linkFileDelete: [
                    { event: "rename", fileName: "sub/folder/file2.ts" },
                    { event: "change", fileName: "sub/folder", optional: osFlavor === TestServerHostOsFlavor.Windows },
                ],

                linkSubFileCreate: [
                    { event: "rename", fileName: "sub/folder/file3.ts" },
                    { event: "change", fileName: "sub/folder/file3.ts" },
                    { event: "change", fileName: "sub/folder" },
                ],
                linkSubFileChange: [
                    { event: "change", fileName: "sub/folder/file3.ts" },
                ],
                linkSubModifiedTimeChange: [
                    { event: "change", fileName: "sub/folder/file3.ts" },
                ],
                linkSubFileDelete: [
                    { event: "rename", fileName: "sub/folder/file3.ts" },
                ],

                parallelFileCreate: undefined,
                parallelLinkFileCreate: undefined,
                parallelFileChange: undefined,
                parallelLinkFileChange: undefined,
                parallelFileModifiedTimeChange: undefined,
                parallelLinkModifiedTimeChange: undefined,
                parallelFileDelete: undefined,
                parallelLinkFileDelete: undefined,
            };

        it(`recursive watchDirectory using fsEvents ${osFlavorToString(osFlavor)}`, async () => {
            const sys = getSys();
            await testWatchDirectoryOperations(
                sys,
                fsWatch,
                tableOfEvents,
                watchDirectoryOperation,
                dir,
                link,
                /*recursive*/ true,
                [
                    "init",
                    "fileCreate",
                    "linkFileCreate",
                    "fileChange",
                    "linkFileChange",
                    "fileModifiedTimeChange",
                    "linkModifiedTimeChange",
                    "fileDelete",
                    "linkFileDelete",
                ],
            );
        });

        it(`recursive watchDirectory using fsEvents when linked in same folder ${osFlavorToString(osFlavor)}`, async () => {
            const sys = getSys();
            await testWatchDirectoryOperations(
                sys,
                fsWatch,
                tableOfEvents,
                watchDirectoryOperation,
                `${dir}sub`,
                `${link}sub`,
                /*recursive*/ true,
                [
                    "init",
                    "linkSubFileCreate",
                    "linkSubFileChange",
                    "linkSubModifiedTimeChange",
                    "linkSubFileDelete",
                ],
            );
        });

        it(`recursive watchDirectory using fsEvents when links not in directory ${osFlavorToString(osFlavor)}`, async () => {
            const sys = getSys();
            await testWatchDirectoryOperations(
                sys,
                fsWatch,
                tableOfEvents,
                watchDirectoryOperation,
                `${dir}parallel`,
                `${link}parallel`,
                /*recursive*/ true,
                [
                    "init",
                    "parallelFileCreate",
                    "parallelLinkFileCreate",
                    "parallelFileChange",
                    "parallelLinkFileChange",
                    "parallelFileModifiedTimeChange",
                    "parallelLinkModifiedTimeChange",
                    "parallelFileDelete",
                    "parallelLinkFileDelete",
                ],
            );
        });

        function watchDirectoryOperation(
            sys: System,
            opType: keyof RecursiveFsEventsForWatchDirectory,
            dir: string,
            link: string,
        ) {
            switch (opType) {
                case "init":
                    sys.writeFile(`${dir}/sub/folder/init.ts`, "export const x = 100;");
                    sys.writeFile(`${dir}2/sub/folder/init.ts`, "export const x = 100;");
                    break;
                case "fileCreate":
                case "linkFileCreate":
                case "linkSubFileCreate":
                case "parallelFileCreate":
                case "parallelLinkFileCreate":
                    sys.writeFile(fileName(dir, link, opType), "export const x = 100;");
                    break;
                case "fileChange":
                case "linkFileChange":
                case "linkSubFileChange":
                case "parallelFileChange":
                case "parallelLinkFileChange":
                    sys.writeFile(fileName(dir, link, opType), "export const x2 = 100;");
                    break;
                case "fileModifiedTimeChange":
                case "linkModifiedTimeChange":
                case "linkSubModifiedTimeChange":
                case "parallelFileModifiedTimeChange":
                case "parallelLinkModifiedTimeChange":
                    sys.setModifiedTime!(fileName(dir, link, opType), new Date());
                    break;
                case "fileDelete":
                case "linkFileDelete":
                case "linkSubFileDelete":
                case "parallelFileDelete":
                case "parallelLinkFileDelete":
                    sys.deleteFile!(fileName(dir, link, opType));
                    break;
            }
        }

        function fileName(dir: string, link: string, opType: string) {
            return ts.startsWith(opType, "file") ?
                `${dir}/sub/folder/file1.ts` :
                ts.startsWith(opType, "linkSub") ?
                `${dir}/linkedsub/folder/file3.ts` :
                ts.startsWith(opType, "link") ?
                `${link}/sub/folder/file2.ts` :
                ts.startsWith(opType, "parallelFile") ?
                `${dir}2/sub/folder/file4.ts` :
                `${dir}/linkedsub2/sub/folder/file5.ts`;
        }
    }

    type EventRecord = Record<string, readonly ExpectedEventAndFileName[] | undefined>;
    type Operation<System extends ts.System, Events extends EventRecord> = (sys: System, opType: keyof Events, dir: string, link: string) => void;
    async function testWatchDirectoryOperations<System extends ts.System, Events extends EventRecord>(
        sys: System,
        fsWatch: FsWatch<System>,
        tableOfEvents: Events,
        operation: Operation<System, Events>,
        directoryName: string,
        linkName: string,
        recursive: boolean,
        opTypes: (keyof Events & string)[],
    ) {
        const dirResult = watchDirectory(sys, fsWatch, directoryName, recursive);
        const linkResult = watchDirectory(sys, fsWatch, linkName, recursive);

        for (const opType of opTypes) {
            await watchDirectoryOperation(sys, tableOfEvents, opType, operation, directoryName, linkName, dirResult, linkResult);
        }

        dirResult.watcher.close();
        linkResult.watcher.close();
    }

    async function watchDirectoryOperation<System extends ts.System, Events extends EventRecord>(
        sys: System,
        tableOfEvents: Events,
        opType: keyof Events & string,
        operation: Operation<System, Events>,
        directoryName: string,
        linkName: string,
        dirResult: WatchDirectoryResult,
        linkResult: WatchDirectoryResult,
    ) {
        initializeWatchDirectoryResult(dirResult, linkResult);
        operation(sys, opType, directoryName, linkName);
        await verfiyWatchDirectoryResult(
            opType,
            dirResult,
            linkResult,
            tableOfEvents[opType],
        );
    }

    function getFileName(): (dir: string) => string {
        return dir => `${dir}/${ts.getBaseFileName(dir)}.ts`;
    }

    describe("with ts.sys::", () => {
        const root = ts.normalizePath(IO.joinPath(IO.getWorkspaceRoot(), "tests/baselines/symlinks"));
        const osFlavor = process.platform === "darwin" ?
            TestServerHostOsFlavor.MacOs :
            process.platform === "win32" ?
            TestServerHostOsFlavor.Windows :
            TestServerHostOsFlavor.Linux;
        before(() => {
            cleanup();
        });
        after(() => {
            cleanup();
        });
        function cleanup() {
            withSwallowException(() => fs.rmSync(root, { recursive: true, force: true }));
        }
        function withSwallowException(op: () => void) {
            try {
                op();
            }
            catch { /* swallow */ }
        }
        describe("watchFile using polling", () => {
            before(() => {
                ts.sys.writeFile(`${root}/polling/file.ts`, "export const x = 10;");
                withSwallowException(() => fs.symlinkSync(`${root}/polling`, `${root}/linkedpolling`, "junction"));
            });
            verifyWatchFile(
                "watchFile using polling",
                () => ts.sys,
                `${root}/polling/file.ts`,
                `${root}/linkedpolling/file.ts`,
                { watchFile: ts.WatchFileKind.PriorityPollingInterval },
            );
        });
        describe("watchFile using fsEvents", () => {
            before(() => {
                ts.sys.writeFile(`${root}/fsevents/file.ts`, "export const x = 10;");
                withSwallowException(() => fs.symlinkSync(`${root}/fsevents`, `${root}/linkedfsevents`, "junction"));
            });
            verifyWatchFile(
                "watchFile using fsEvents",
                () => ts.sys,
                `${root}/fsevents/file.ts`,
                `${root}/linkedfsevents/file.ts`,
                { watchFile: ts.WatchFileKind.UseFsEvents },
            );
        });
        describe("watchDirectory using polling", () => {
            before(() => {
                ts.sys.writeFile(`${root}/dirpolling/file.ts`, "export const x = 10;");
                withSwallowException(() => fs.symlinkSync(`${root}/dirpolling`, `${root}/linkeddirpolling`, "junction"));
            });
            verifyWatchFile(
                "watchDirectory using polling",
                () => ts.sys,
                `${root}/dirpolling`,
                `${root}/linkeddirpolling`,
                { watchFile: ts.WatchFileKind.PriorityPollingInterval },
                getFileName(),
            );
        });
        describe("watchDirectory using fsEvents", () => {
            before(() => {
                ts.sys.writeFile(`${root}/dirfsevents/file.ts`, "export const x = 10;");
                withSwallowException(() => fs.symlinkSync(`${root}/dirfsevents`, `${root}/linkeddirfsevents`, "junction"));
            });
            verifyWatchDirectoryUsingFsEvents(
                () => ts.sys,
                (dir, _recursive, cb) => fs.watch(dir, { persistent: true }, cb),
                `${root}/dirfsevents`,
                `${root}/linkeddirfsevents`,
                osFlavor,
            );
        });

        if (osFlavor !== TestServerHostOsFlavor.Linux) {
            describe("recursive watchDirectory using fsEvents", () => {
                before(() => {
                    setupRecursiveFsEvents("recursivefsevents");
                    setupRecursiveFsEvents("recursivefseventssub");
                    setupRecursiveFsEvents("recursivefseventsparallel");
                });
                verifyRecursiveWatchDirectoryUsingFsEvents(
                    () => ts.sys,
                    (dir, recursive, cb) => fs.watch(dir, { persistent: true, recursive }, cb),
                    `${root}/recursivefsevents`,
                    `${root}/linkedrecursivefsevents`,
                    osFlavor,
                );
            });
        }

        function setupRecursiveFsEvents(recursiveName: string) {
            ts.sys.writeFile(`${root}/${recursiveName}/sub/folder/file.ts`, "export const x = 10;");
            ts.sys.writeFile(`${root}/${recursiveName}2/sub/folder/file.ts`, "export const x = 10;");
            withSwallowException(() => fs.symlinkSync(`${root}/${recursiveName}`, `${root}/linked${recursiveName}`, "junction"));
            withSwallowException(() => fs.symlinkSync(`${root}/${recursiveName}/sub`, `${root}/${recursiveName}/linkedsub`, "junction"));
            withSwallowException(() => fs.symlinkSync(`${root}/${recursiveName}2`, `${root}/${recursiveName}/linkedsub2`, "junction"));
        }
    });

    describe("with virtualFileSystem::", () => {
        const root = ts.normalizePath("/home/tests/baselines/symlinks");
        function getSys(osFlavor?: TestServerHostOsFlavor) {
            return TestServerHost.createWatchedSystem({
                [`${root}/folder/file.ts`]: "export const x = 10;",
                [`${root}/linked`]: { symLink: `${root}/folder` },
            }, { osFlavor, currentDirectory: root });
        }
        verifyWatchFile(
            "watchFile using polling",
            getSys,
            `${root}/folder/file.ts`,
            `${root}/linked/file.ts`,
            { watchFile: ts.WatchFileKind.PriorityPollingInterval },
        );
        verifyWatchFile(
            "watchFile using fsEvents",
            getSys,
            `${root}/folder/file.ts`,
            `${root}/linked/file.ts`,
            { watchFile: ts.WatchFileKind.UseFsEvents },
        );

        verifyWatchFile(
            "watchDirectory using polling",
            getSys,
            `${root}/folder`,
            `${root}/linked`,
            { watchFile: ts.WatchFileKind.PriorityPollingInterval },
            getFileName(),
        );

        function verifyWatchDirectoryUsingFsEventsTestServerHost(osFlavor: TestServerHostOsFlavor) {
            verifyWatchDirectoryUsingFsEvents(
                () => getSys(osFlavor),
                (dir, recursive, cb, sys) => sys.fsWatchWorker(dir, recursive, cb),
                `${root}/folder`,
                `${root}/linked`,
                osFlavor,
            );
        }
        verifyWatchDirectoryUsingFsEventsTestServerHost(TestServerHostOsFlavor.Windows);
        verifyWatchDirectoryUsingFsEventsTestServerHost(TestServerHostOsFlavor.MacOs);
        verifyWatchDirectoryUsingFsEventsTestServerHost(TestServerHostOsFlavor.Linux);

        function getRecursiveSys(osFlavor: TestServerHostOsFlavor) {
            return TestServerHost.createWatchedSystem({
                ...getRecursiveFs("recursivefsevents"),
                ...getRecursiveFs("recursivefseventssub"),
                ...getRecursiveFs("recursivefseventsparallel"),
            }, { osFlavor, currentDirectory: root });

            function getRecursiveFs(recursiveName: string): FileOrFolderOrSymLinkMap {
                return {
                    [`${root}/${recursiveName}/sub/folder/file.ts`]: "export const x = 10;",
                    [`${root}/${recursiveName}2/sub/folder/file.ts`]: "export const x = 10;",
                    [`${root}/linked${recursiveName}`]: { symLink: `${root}/${recursiveName}` },
                    [`${root}/${recursiveName}/linkedsub`]: { symLink: `${root}/${recursiveName}/sub` },
                    [`${root}/${recursiveName}/linkedsub2`]: { symLink: `${root}/${recursiveName}2` },
                };
            }
        }

        function verifyRecursiveWatchDirectoryUsingFsEventsTestServerHost(osFlavor: TestServerHostOsFlavor.Windows | TestServerHostOsFlavor.MacOs) {
            verifyRecursiveWatchDirectoryUsingFsEvents(
                () => getRecursiveSys(osFlavor),
                (dir, recursive, cb, sys) => sys.fsWatchWorker(dir, recursive, cb),
                `${root}/recursivefsevents`,
                `${root}/linkedrecursivefsevents`,
                osFlavor,
            );
        }
        verifyRecursiveWatchDirectoryUsingFsEventsTestServerHost(TestServerHostOsFlavor.Windows);
        verifyRecursiveWatchDirectoryUsingFsEventsTestServerHost(TestServerHostOsFlavor.MacOs);
    });
});

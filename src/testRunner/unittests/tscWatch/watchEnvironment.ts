import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    commonFile1,
    commonFile2,
    noopChange,
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    libFile,
    SymLink,
    TestServerHost,
    Tsc_WatchDirectory,
    Tsc_WatchFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: watchEnvironment:: tsc-watch with different polling/non polling options", () => {
    const scenario = "watchEnvironment";
    verifyTscWatch({
        scenario,
        subScenario: "watchFile/using dynamic priority polling",
        commandLineArgs: ["--w", `/a/username/project/typescript.ts`],
        sys: () => {
            const projectFolder = "/a/username/project";
            const file1: File = {
                path: `${projectFolder}/typescript.ts`,
                content: "var z = 10;",
            };
            const environmentVariables = new Map<string, string>();
            environmentVariables.set("TSC_WATCHFILE", Tsc_WatchFile.DynamicPolling);
            return createWatchedSystem([file1, libFile], { environmentVariables });
        },
        edits: [
            {
                caption: "Time spent to Transition libFile and file1 to low priority queue",
                edit: ts.noop,
                timeouts: (sys, programs) => {
                    const initialProgram = programs[0][0];
                    const mediumPollingIntervalThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Medium];
                    for (let index = 0; index < mediumPollingIntervalThreshold; index++) {
                        // Transition libFile and file1 to low priority queue
                        sys.runQueuedTimeoutCallbacks();
                        assert.deepEqual(programs[0][0], initialProgram);
                    }
                    return;
                },
            },
            {
                caption: "Make change to file",
                // Make a change to file
                edit: sys => sys.writeFile("/a/username/project/typescript.ts", "var zz30 = 100;"),
                // During this timeout the file would be detected as unchanged
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Callbacks: medium priority + high priority queue and scheduled program update",
                edit: ts.noop,
                // Callbacks: medium priority + high priority queue and scheduled program update
                // This should detect change in the file
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Polling queues polled and everything is in the high polling queue",
                edit: ts.noop,
                timeouts: (sys, programs) => {
                    const initialProgram = programs[0][0];
                    const mediumPollingIntervalThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Medium];
                    const newThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Low] + mediumPollingIntervalThreshold;
                    for (let fileUnchangeDetected = 1; fileUnchangeDetected < newThreshold; fileUnchangeDetected++) {
                        // For high + Medium/low polling interval
                        sys.runQueuedTimeoutCallbacks();
                        assert.deepEqual(programs[0][0], initialProgram);
                    }

                    // Everything goes in high polling interval queue
                    sys.runQueuedTimeoutCallbacks();
                    return;
                },
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "watchFile/using fixed chunk size polling",
        commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
        sys: () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: jsonToReadableText({
                    watchOptions: {
                        watchFile: "FixedChunkSizePolling",
                    },
                }),
            };
            const files = [libFile, commonFile1, commonFile2, configFile];
            return createWatchedSystem(files);
        },
        edits: [
            {
                caption: "The timeout is to check the status of all files",
                edit: ts.noop,
                timeouts: (sys, programs) => {
                    // On each timeout file does not change
                    const initialProgram = programs[0][0];
                    for (let index = 0; index < 4; index++) {
                        sys.runQueuedTimeoutCallbacks();
                        assert.deepEqual(programs[0][0], initialProgram);
                    }
                },
            },
            {
                caption: "Make change to file but should detect as changed and schedule program update",
                // Make a change to file
                edit: sys => sys.writeFile(commonFile1.path, "var zz30 = 100;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Callbacks: queue and scheduled program update",
                edit: ts.noop,
                // Callbacks: scheduled program update and queue for the polling
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "The timeout is to check the status of all files",
                edit: ts.noop,
                timeouts: (sys, programs) => {
                    // On each timeout file does not change
                    const initialProgram = programs[0][0];
                    sys.runQueuedTimeoutCallbacks();
                    assert.deepEqual(programs[0][0], initialProgram);
                },
            },
        ],
    });

    describe("tsc-watch when watchDirectories implementation", () => {
        function verifyRenamingFileInSubFolder(subScenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
            const projectFolder = "/a/username/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: File = {
                path: `${projectFolder}/tsconfig.json`,
                content: jsonToReadableText({
                    watchOptions: {
                        synchronousWatchDirectory: true,
                    },
                }),
            };
            const file: File = {
                path: `${projectSrcFolder}/file1.ts`,
                content: "",
            };
            verifyTscWatch({
                scenario,
                subScenario: `watchDirectories/${subScenario}`,
                commandLineArgs: ["--w", "-p", configFile.path],
                sys: () => {
                    const files = [file, configFile, libFile];
                    const environmentVariables = new Map<string, string>();
                    environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                    return createWatchedSystem(files, { environmentVariables });
                },
                edits: [
                    {
                        caption: "Rename file1 to file2",
                        // Rename the file:
                        edit: sys => sys.renameFile(file.path, file.path.replace("file1.ts", "file2.ts")),
                        timeouts: sys => {
                            if (tscWatchDirectory === Tsc_WatchDirectory.DynamicPolling) {
                                // With dynamic polling the fs change would be detected only by running timeouts
                                sys.runQueuedTimeoutCallbacks();
                            }
                            // Delayed update program
                            sys.runQueuedTimeoutCallbacks();
                            return;
                        },
                    },
                ],
            });
        }

        verifyRenamingFileInSubFolder("uses watchFile when renaming file in subfolder", Tsc_WatchDirectory.WatchFile);

        verifyRenamingFileInSubFolder("uses non recursive watchDirectory when renaming file in subfolder", Tsc_WatchDirectory.NonRecursiveWatchDirectory);

        verifyRenamingFileInSubFolder("uses non recursive dynamic polling when renaming file in subfolder", Tsc_WatchDirectory.DynamicPolling);

        verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/when there are symlinks to folders in recursive folders",
            commandLineArgs: ["--w"],
            sys: () => {
                const cwd = "/home/user/projects/myproject";
                const file1: File = {
                    path: `${cwd}/src/file.ts`,
                    content: `import * as a from "a"`,
                };
                const tsconfig: File = {
                    path: `${cwd}/tsconfig.json`,
                    content: `{ "compilerOptions": { "extendedDiagnostics": true, "traceResolution": true }}`,
                };
                const realA: File = {
                    path: `${cwd}/node_modules/reala/index.d.ts`,
                    content: `export {}`,
                };
                const realB: File = {
                    path: `${cwd}/node_modules/realb/index.d.ts`,
                    content: `export {}`,
                };
                const symLinkA: SymLink = {
                    path: `${cwd}/node_modules/a`,
                    symLink: `${cwd}/node_modules/reala`,
                };
                const symLinkB: SymLink = {
                    path: `${cwd}/node_modules/b`,
                    symLink: `${cwd}/node_modules/realb`,
                };
                const symLinkBInA: SymLink = {
                    path: `${cwd}/node_modules/reala/node_modules/b`,
                    symLink: `${cwd}/node_modules/b`,
                };
                const symLinkAInB: SymLink = {
                    path: `${cwd}/node_modules/realb/node_modules/a`,
                    symLink: `${cwd}/node_modules/a`,
                };
                const files = [libFile, file1, tsconfig, realA, realB, symLinkA, symLinkB, symLinkBInA, symLinkAInB];
                const environmentVariables = new Map<string, string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
                return createWatchedSystem(files, { environmentVariables, currentDirectory: cwd });
            },
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory",
            commandLineArgs: ["--w", "-p", `/user/username/projects/myproject/tsconfig.json`],
            sys: () => {
                const configFile: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: "{}",
                };
                const file1: File = {
                    path: `/user/username/projects/myproject/src/file1.ts`,
                    content: `import { x } from "file2";`,
                };
                const file2: File = {
                    path: `/user/username/projects/myproject/node_modules/file2/index.d.ts`,
                    content: `export const x = 10;`,
                };
                const files = [libFile, file1, file2, configFile];
                return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            edits: [
                {
                    caption: "Directory watch updates because of file1.js creation",
                    edit: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // To update directory callbacks for file1.js output
                    },
                },
                {
                    caption: "Remove directory node_modules",
                    // Remove directory node_modules
                    edit: sys => sys.deleteFolder(`/user/username/projects/myproject/node_modules`, /*recursive*/ true),
                    // 1. Failed lookup invalidation 2. For updating program and 3. for updating child watches
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(sys.getNextTimeoutId() - 2), // Update program,
                },
                {
                    caption: "Pending directory watchers and program update",
                    edit: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // To update directory watchers
                        sys.runQueuedTimeoutCallbacks(); // To Update program and failed lookup update
                        sys.runQueuedTimeoutCallbacks(); // Actual program update
                    },
                },
                {
                    caption: "Start npm install",
                    // npm install
                    edit: sys => sys.createDirectory(`/user/username/projects/myproject/node_modules`),
                    timeouts: ts.noop, // To update folder structure
                },
                {
                    caption: "npm install folder creation of file2",
                    edit: sys => sys.createDirectory(`/user/username/projects/myproject/node_modules/file2`),
                    timeouts: ts.noop, // To update folder structure
                },
                {
                    caption: "npm install index file in file2",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/node_modules/file2/index.d.ts`, `export const x = 10;`),
                    timeouts: ts.noop, // To update folder structure
                },
                {
                    caption: "Updates the program",
                    edit: ts.noop,
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // To Update program and failed lookup update
                },
                {
                    caption: "Invalidates module resolution cache",
                    edit: ts.noop,
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // To Update program
                },
                {
                    caption: "Pending updates",
                    edit: ts.noop,
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory with outDir and declaration enabled",
            commandLineArgs: ["--w", "-p", `/user/username/projects/myproject/tsconfig.json`],
            sys: () => {
                const configFile: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { outDir: "dist", declaration: true } }),
                };
                const file1: File = {
                    path: `/user/username/projects/myproject/src/file1.ts`,
                    content: `import { x } from "file2";`,
                };
                const file2: File = {
                    path: `/user/username/projects/myproject/node_modules/file2/index.d.ts`,
                    content: `export const x = 10;`,
                };
                const files = [libFile, file1, file2, configFile];
                return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            edits: [
                noopChange,
                {
                    caption: "Add new file, should schedule and run timeout to update directory watcher",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/src/file3.ts`, `export const y = 10;`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Update the child watch
                },
                {
                    caption: "Actual program update to include new file",
                    edit: ts.noop,
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Scheduling failed lookup update and program update
                },
                {
                    caption: "After program emit with new file, should schedule and run timeout to update directory watcher",
                    edit: ts.noop,
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Update the child watch
                },
                noopChange,
            ],
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory renaming a file",
            commandLineArgs: ["--w", "-p", `/user/username/projects/myproject/tsconfig.json`],
            sys: () => {
                const configFile: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { outDir: "dist" } }),
                };
                const file1: File = {
                    path: `/user/username/projects/myproject/src/file1.ts`,
                    content: `import { x } from "./file2";`,
                };
                const file2: File = {
                    path: `/user/username/projects/myproject/src/file2.ts`,
                    content: `export const x = 10;`,
                };
                const files = [libFile, file1, file2, configFile];
                return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            edits: [
                noopChange,
                {
                    caption: "rename the file",
                    edit: sys => sys.renameFile(`/user/username/projects/myproject/src/file2.ts`, `/user/username/projects/myproject/src/renamed.ts`),
                    // 1. For updating program and 2. for updating child watches
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(1), // Update program
                },
                {
                    caption: "Pending directory watchers and program update",
                    edit: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // To update directory watchers
                        sys.runQueuedTimeoutCallbacks(); // To Update program and failed lookup update
                        sys.runQueuedTimeoutCallbacks(); // Actual program update
                    },
                },
            ],
        });
    });

    describe("handles watch compiler options", () => {
        verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchFile option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: jsonToReadableText({
                        watchOptions: {
                            watchFile: "UseFsEvents",
                        },
                    }),
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                return createWatchedSystem(files);
            },
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchDirectory option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: jsonToReadableText({
                        watchOptions: {
                            watchDirectory: "UseFsEvents",
                        },
                    }),
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with fallbackPolling option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: jsonToReadableText({
                        watchOptions: {
                            fallbackPolling: "PriorityInterval",
                        },
                    }),
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                return createWatchedSystem(files, { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
            },
        });

        verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchFile as watch options to extend",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json", "--watchFile", "UseFsEvents"],
            sys: () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: "{}",
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                return createWatchedSystem(files);
            },
        });

        describe("exclude options", () => {
            function sys(watchOptions: ts.WatchOptions, runWithoutRecursiveWatches?: boolean): TestServerHost {
                const configFile: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({ exclude: ["node_modules"], watchOptions }),
                };
                const main: File = {
                    path: `/user/username/projects/myproject/src/main.ts`,
                    content: `import { foo } from "bar"; foo();`,
                };
                const bar: File = {
                    path: `/user/username/projects/myproject/node_modules/bar/index.d.ts`,
                    content: `export { foo } from "./foo";`,
                };
                const foo: File = {
                    path: `/user/username/projects/myproject/node_modules/bar/foo.d.ts`,
                    content: `export function foo(): string;`,
                };
                const fooBar: File = {
                    path: `/user/username/projects/myproject/node_modules/bar/fooBar.d.ts`,
                    content: `export function fooBar(): string;`,
                };
                const temp: File = {
                    path: `/user/username/projects/myproject/node_modules/bar/temp/index.d.ts`,
                    content: "export function temp(): string;",
                };
                const files = [libFile, main, bar, foo, fooBar, temp, configFile];
                return createWatchedSystem(files, { currentDirectory: "/user/username/projects/myproject", runWithoutRecursiveWatches });
            }

            function verifyWorker(...additionalFlags: string[]) {
                verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeFiles option${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeFiles: ["node_modules/*"] }),
                    edits: [
                        {
                            caption: "Change foo",
                            edit: sys => sys.replaceFileText(`/user/username/projects/myproject/node_modules/bar/foo.d.ts`, "foo", "fooBar"),
                            timeouts: ts.noop,
                        },
                    ],
                });

                verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeDirectories option${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeDirectories: ["node_modules"] }),
                    edits: [
                        {
                            caption: "delete fooBar",
                            edit: sys => sys.deleteFile(`/user/username/projects/myproject/node_modules/bar/fooBar.d.ts`),
                            timeouts: ts.noop,
                        },
                    ],
                });

                verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeDirectories option with recursive directory watching${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeDirectories: ["**/temp"] }, /*runWithoutRecursiveWatches*/ true),
                    edits: [
                        {
                            caption: "Directory watch updates because of main.js creation",
                            edit: ts.noop,
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(), // To update directory callbacks for main.js output
                        },
                        {
                            caption: "add new folder to temp",
                            edit: sys => sys.ensureFileOrFolder({ path: `/user/username/projects/myproject/node_modules/bar/temp/fooBar/index.d.ts`, content: "export function temp(): string;" }),
                            timeouts: ts.noop,
                        },
                    ],
                });
            }

            verifyWorker();
            verifyWorker("-extendedDiagnostics");
        });
    });

    verifyTscWatch({
        scenario,
        subScenario: `fsWatch/when using file watching thats when rename occurs when file is still on the disk`,
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: () =>
            createWatchedSystem(
                {
                    [libFile.path]: libFile.content,
                    [`/user/username/projects/myproject/main.ts`]: `import { foo } from "./foo"; foo();`,
                    [`/user/username/projects/myproject/foo.ts`]: `export declare function foo(): string;`,
                    [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({
                        watchOptions: { watchFile: "useFsEvents" },
                        files: ["foo.ts", "main.ts"],
                    }),
                },
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        edits: [
            {
                caption: "Introduce error such that when callback happens file is already appeared",
                // vm's wq generates this kind of event
                // Skip delete event so inode changes but when the create's rename occurs file is on disk
                edit: sys =>
                    sys.modifyFile(`/user/username/projects/myproject/foo.ts`, `export declare function foo2(): string;`, {
                        invokeFileDeleteCreateAsPartInsteadOfChange: true,
                        ignoreDelete: true,
                    }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Replace file with rename event that fixes error",
                edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.ts`, `export declare function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    describe("with fsWatch on inodes", () => {
        verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () =>
                createWatchedSystem(
                    {
                        [libFile.path]: libFile.content,
                        [`/user/username/projects/myproject/main.ts`]: `import { foo } from "./foo"; foo();`,
                        [`/user/username/projects/myproject/foo.d.ts`]: `export function foo(): string;`,
                        [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({ watchOptions: { watchFile: "useFsEvents" }, files: ["foo.d.ts", "main.ts"] }),
                    },
                    {
                        currentDirectory: "/user/username/projects/myproject",
                        inodeWatching: true,
                    },
                ),
            edits: [
                {
                    caption: "Replace file with rename event that introduces error",
                    edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.d.ts`, `export function foo2(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.d.ts`, `export function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });

        verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode when rename event ends with tilde`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () =>
                createWatchedSystem(
                    {
                        [libFile.path]: libFile.content,
                        [`/user/username/projects/myproject/main.ts`]: `import { foo } from "./foo"; foo();`,
                        [`/user/username/projects/myproject/foo.d.ts`]: `export function foo(): string;`,
                        [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({ watchOptions: { watchFile: "useFsEvents" }, files: ["foo.d.ts", "main.ts"] }),
                    },
                    {
                        currentDirectory: "/user/username/projects/myproject",
                        inodeWatching: true,
                    },
                ),
            edits: [
                {
                    caption: "Replace file with rename event that introduces error",
                    edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.d.ts`, `export function foo2(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, useTildeAsSuffixInRenameEventFileName: true }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.d.ts`, `export function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, useTildeAsSuffixInRenameEventFileName: true }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });

        verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode when rename occurs when file is still on the disk`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () =>
                createWatchedSystem(
                    {
                        [libFile.path]: libFile.content,
                        [`/user/username/projects/myproject/main.ts`]: `import { foo } from "./foo"; foo();`,
                        [`/user/username/projects/myproject/foo.ts`]: `export declare function foo(): string;`,
                        [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({
                            watchOptions: { watchFile: "useFsEvents" },
                            files: ["foo.ts", "main.ts"],
                        }),
                    },
                    {
                        currentDirectory: "/user/username/projects/myproject",
                        inodeWatching: true,
                    },
                ),
            edits: [
                {
                    caption: "Introduce error such that when callback happens file is already appeared",
                    // vm's wq generates this kind of event
                    // Skip delete event so inode changes but when the create's rename occurs file is on disk
                    edit: sys =>
                        sys.modifyFile(`/user/username/projects/myproject/foo.ts`, `export declare function foo2(): string;`, {
                            invokeFileDeleteCreateAsPartInsteadOfChange: true,
                            ignoreDelete: true,
                            skipInodeCheckOnCreate: true,
                        }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    edit: sys => sys.modifyFile(`/user/username/projects/myproject/foo.ts`, `export declare function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    });

    describe("with fsWatch with fsWatchWithTimestamp", () => {
        function verify(fsWatchWithTimestamp: boolean) {
            verifyTscWatch({
                scenario,
                subScenario: `fsWatch/fsWatchWithTimestamp ${fsWatchWithTimestamp}`,
                commandLineArgs: ["-w", "--extendedDiagnostics"],
                sys: () =>
                    createWatchedSystem(
                        {
                            [libFile.path]: libFile.content,
                            "/user/username/projects/myproject/main.ts": `export const x = 10;`,
                            "/user/username/projects/myproject/tsconfig.json": jsonToReadableText({ files: ["main.ts"] }),
                        },
                        {
                            currentDirectory: "/user/username/projects/myproject",
                            fsWatchWithTimestamp,
                        },
                    ),
                edits: [
                    {
                        caption: "emulate access",
                        edit: sys => sys.invokeFsWatches("/user/username/projects/myproject/main.ts", "change", /*modifiedTime*/ undefined, /*useTildeSuffix*/ undefined),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify file contents",
                        edit: sys => sys.appendFile("/user/username/projects/myproject/main.ts", "export const y = 10;"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ],
            });
        }
        verify(/*fsWatchWithTimestamp*/ true);
        verify(/*fsWatchWithTimestamp*/ false);
    });

    verifyTscWatch({
        scenario,
        subScenario: "fsEvent for change is repeated",
        commandLineArgs: ["-w", "main.ts", "--extendedDiagnostics"],
        sys: () =>
            createWatchedSystem({
                "/user/username/projects/project/main.ts": `let a: string = "Hello"`,
                [libFile.path]: libFile.content,
            }, { currentDirectory: "/user/username/projects/project" }),
        edits: [
            {
                caption: "change main.ts",
                edit: sys => sys.replaceFileText("/user/username/projects/project/main.ts", "Hello", "Hello World"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "receive another change event without modifying the file",
                edit: sys => sys.invokeFsWatches("/user/username/projects/project/main.ts", "change", /*modifiedTime*/ undefined, /*useTildeSuffix*/ undefined),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "change main.ts to empty text",
                edit: sys => sys.writeFile("/user/username/projects/project/main.ts", ""),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "receive another change event without modifying the file",
                edit: sys => sys.invokeFsWatches("/user/username/projects/project/main.ts", "change", /*modifiedTime*/ undefined, /*useTildeSuffix*/ undefined),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

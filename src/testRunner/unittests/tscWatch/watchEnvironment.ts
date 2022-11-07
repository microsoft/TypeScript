import * as ts from "../../_namespaces/ts";

import Tsc_WatchDirectory = ts.TestFSWithWatch.Tsc_WatchDirectory;
describe("unittests:: tsc-watch:: watchEnvironment:: tsc-watch with different polling/non polling options", () => {
    const scenario = "watchEnvironment";
    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "watchFile/using dynamic priority polling",
        commandLineArgs: ["--w", `/a/username/project/typescript.ts`],
        sys: () => {
            const projectFolder = "/a/username/project";
            const file1: ts.tscWatch.File = {
                path: `${projectFolder}/typescript.ts`,
                content: "var z = 10;"
            };
            const environmentVariables = new ts.Map<string, string>();
            environmentVariables.set("TSC_WATCHFILE", ts.TestFSWithWatch.Tsc_WatchFile.DynamicPolling);
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile], { environmentVariables });
        },
        changes: [
            {
                caption: "Time spent to Transition libFile and file1 to low priority queue",
                change: ts.noop,
                timeouts: (sys, programs) => {
                    const initialProgram = programs[0][0];
                    const mediumPollingIntervalThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Medium];
                    for (let index = 0; index < mediumPollingIntervalThreshold; index++) {
                        // Transition libFile and file1 to low priority queue
                        sys.checkTimeoutQueueLengthAndRun(1);
                        assert.deepEqual(programs[0][0], initialProgram);
                    }
                    return;
                },
            },
            {
                caption: "Make change to file",
                // Make a change to file
                change: sys => sys.writeFile("/a/username/project/typescript.ts", "var zz30 = 100;"),
                // During this timeout the file would be detected as unchanged
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Callbacks: medium priority + high priority queue and scheduled program update",
                change: ts.noop,
                // Callbacks: medium priority + high priority queue and scheduled program update
                // This should detect change in the file
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(3),
            },
            {
                caption: "Polling queues polled and everything is in the high polling queue",
                change: ts.noop,
                timeouts: (sys, programs) => {
                    const initialProgram = programs[0][0];
                    const mediumPollingIntervalThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Medium];
                    const newThreshold = ts.unchangedPollThresholds[ts.PollingInterval.Low] + mediumPollingIntervalThreshold;
                    for (let fileUnchangeDetected = 1; fileUnchangeDetected < newThreshold; fileUnchangeDetected++) {
                        // For high + Medium/low polling interval
                        sys.checkTimeoutQueueLengthAndRun(2);
                        assert.deepEqual(programs[0][0], initialProgram);
                    }

                    // Everything goes in high polling interval queue
                    sys.checkTimeoutQueueLengthAndRun(1);
                    return;
                },
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "watchFile/using fixed chunk size polling",
        commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    watchOptions: {
                        watchFile: "FixedChunkSizePolling"
                    }
                })
            };
            const files = [ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile];
            return ts.tscWatch.createWatchedSystem(files);
        },
        changes: [
            {
                caption: "The timeout is to check the status of all files",
                change: ts.noop,
                timeouts: (sys, programs) => {
                    // On each timeout file does not change
                    const initialProgram = programs[0][0];
                    for (let index = 0; index < 4; index++) {
                        sys.checkTimeoutQueueLengthAndRun(1);
                        assert.deepEqual(programs[0][0], initialProgram);
                    }
                },
            },
            {
                caption: "Make change to file but should detect as changed and schedule program update",
                // Make a change to file
                change: sys => sys.writeFile(ts.tscWatch.commonFile1.path, "var zz30 = 100;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Callbacks: queue and scheduled program update",
                change: ts.noop,
                // Callbacks: scheduled program update and queue for the polling
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2),
            },
            {
                caption: "The timeout is to check the status of all files",
                change: ts.noop,
                timeouts: (sys, programs) => {
                    // On each timeout file does not change
                    const initialProgram = programs[0][0];
                    sys.checkTimeoutQueueLengthAndRun(1);
                    assert.deepEqual(programs[0][0], initialProgram);
                },
            },
        ]
    });

    describe("tsc-watch when watchDirectories implementation", () => {
        function verifyRenamingFileInSubFolder(subScenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
            const projectFolder = "/a/username/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: ts.tscWatch.File = {
                path: `${projectFolder}/tsconfig.json`,
                content: JSON.stringify({
                    watchOptions: {
                        synchronousWatchDirectory: true
                    }
                })
            };
            const file: ts.tscWatch.File = {
                path: `${projectSrcFolder}/file1.ts`,
                content: ""
            };
            ts.tscWatch.verifyTscWatch({
                scenario,
                subScenario: `watchDirectories/${subScenario}`,
                commandLineArgs: ["--w", "-p", configFile.path],
                sys: () => {
                    const files = [file, configFile, ts.tscWatch.libFile];
                    const environmentVariables = new ts.Map<string, string>();
                    environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                    return ts.tscWatch.createWatchedSystem(files, { environmentVariables });
                },
                changes: [
                    {
                        caption: "Rename file1 to file2",
                        // Rename the file:
                        change: sys => sys.renameFile(file.path, file.path.replace("file1.ts", "file2.ts")),
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

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/when there are symlinks to folders in recursive folders",
            commandLineArgs: ["--w"],
            sys: () => {
                const cwd = "/home/user/projects/myproject";
                const file1: ts.tscWatch.File = {
                    path: `${cwd}/src/file.ts`,
                    content: `import * as a from "a"`
                };
                const tsconfig: ts.tscWatch.File = {
                    path: `${cwd}/tsconfig.json`,
                    content: `{ "compilerOptions": { "extendedDiagnostics": true, "traceResolution": true }}`
                };
                const realA: ts.tscWatch.File = {
                    path: `${cwd}/node_modules/reala/index.d.ts`,
                    content: `export {}`
                };
                const realB: ts.tscWatch.File = {
                    path: `${cwd}/node_modules/realb/index.d.ts`,
                    content: `export {}`
                };
                const symLinkA: ts.tscWatch.SymLink = {
                    path: `${cwd}/node_modules/a`,
                    symLink: `${cwd}/node_modules/reala`
                };
                const symLinkB: ts.tscWatch.SymLink = {
                    path: `${cwd}/node_modules/b`,
                    symLink: `${cwd}/node_modules/realb`
                };
                const symLinkBInA: ts.tscWatch.SymLink = {
                    path: `${cwd}/node_modules/reala/node_modules/b`,
                    symLink: `${cwd}/node_modules/b`
                };
                const symLinkAInB: ts.tscWatch.SymLink = {
                    path: `${cwd}/node_modules/realb/node_modules/a`,
                    symLink: `${cwd}/node_modules/a`
                };
                const files = [ts.tscWatch.libFile, file1, tsconfig, realA, realB, symLinkA, symLinkB, symLinkBInA, symLinkAInB];
                const environmentVariables = new ts.Map<string, string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
                return ts.tscWatch.createWatchedSystem(files, { environmentVariables, currentDirectory: cwd });
            },
            changes: ts.emptyArray
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory",
            commandLineArgs: ["--w", "-p", `${ts.tscWatch.projectRoot}/tsconfig.json`],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: "{}"
                };
                const file1: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/src/file1.ts`,
                    content: `import { x } from "file2";`
                };
                const file2: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/file2/index.d.ts`,
                    content: `export const x = 10;`
                };
                const files = [ts.tscWatch.libFile, file1, file2, configFile];
                return ts.tscWatch.createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            changes: [
                {
                    caption: "Directory watch updates because of file1.js creation",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // To update directory callbacks for file1.js output
                        sys.checkTimeoutQueueLength(0);
                    },
                },
                {
                    caption: "Remove directory node_modules",
                    // Remove directory node_modules
                    change: sys => sys.deleteFolder(`${ts.tscWatch.projectRoot}/node_modules`, /*recursive*/ true),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLength(3); // 1. Failed lookup invalidation 2. For updating program and 3. for updating child watches
                        sys.runQueuedTimeoutCallbacks(sys.getNextTimeoutId() - 2); // Update program
                    },
                },
                {
                    caption: "Pending directory watchers and program update",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // To update directory watchers
                        sys.checkTimeoutQueueLengthAndRun(2); // To Update program and failed lookup update
                        sys.checkTimeoutQueueLengthAndRun(1); // Actual program update
                        sys.checkTimeoutQueueLength(0);
                    },
                },
                {
                    caption: "Start npm install",
                    // npm install
                    change: sys => sys.createDirectory(`${ts.tscWatch.projectRoot}/node_modules`),
                    timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                },
                {
                    caption: "npm install folder creation of file2",
                    change: sys => sys.createDirectory(`${ts.tscWatch.projectRoot}/node_modules/file2`),
                    timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                },
                {
                    caption: "npm install index file in file2",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/node_modules/file2/index.d.ts`, `export const x = 10;`),
                    timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                },
                {
                    caption: "Updates the program",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.checkTimeoutQueueLength(2); // To Update program and failed lookup update
                    },
                },
                {
                    caption: "Invalidates module resolution cache",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.checkTimeoutQueueLength(1); // To Update program
                    },
                },
                {
                    caption: "Pending updates",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.checkTimeoutQueueLength(0);
                    },
                },
            ],
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory with outDir and declaration enabled",
            commandLineArgs: ["--w", "-p", `${ts.tscWatch.projectRoot}/tsconfig.json`],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { outDir: "dist", declaration: true } })
                };
                const file1: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/src/file1.ts`,
                    content: `import { x } from "file2";`
                };
                const file2: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/file2/index.d.ts`,
                    content: `export const x = 10;`
                };
                const files = [ts.tscWatch.libFile, file1, file2, configFile];
                return ts.tscWatch.createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            changes: [
                ts.tscWatch.noopChange,
                {
                    caption: "Add new file, should schedule and run timeout to update directory watcher",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/src/file3.ts`, `export const y = 10;`),
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // Update the child watch
                },
                {
                    caption: "Actual program update to include new file",
                    change: ts.noop,
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2), // Scheduling failed lookup update and program update
                },
                {
                    caption: "After program emit with new file, should schedule and run timeout to update directory watcher",
                    change: ts.noop,
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // Update the child watch
                },
                ts.tscWatch.noopChange,
            ],
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchDirectories/with non synchronous watch directory renaming a file",
            commandLineArgs: ["--w", "-p", `${ts.tscWatch.projectRoot}/tsconfig.json`],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { outDir: "dist" } })
                };
                const file1: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/src/file1.ts`,
                    content: `import { x } from "./file2";`
                };
                const file2: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/src/file2.ts`,
                    content: `export const x = 10;`
                };
                const files = [ts.tscWatch.libFile, file1, file2, configFile];
                return ts.tscWatch.createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            changes: [
                ts.tscWatch.noopChange,
                {
                    caption: "rename the file",
                    change: sys => sys.renameFile(`${ts.tscWatch.projectRoot}/src/file2.ts`, `${ts.tscWatch.projectRoot}/src/renamed.ts`),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLength(2); // 1. For updating program and 2. for updating child watches
                        sys.runQueuedTimeoutCallbacks(1); // Update program
                    },
                },
                {
                    caption: "Pending directory watchers and program update",
                    change: ts.noop,
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // To update directory watchers
                        sys.checkTimeoutQueueLengthAndRun(2); // To Update program and failed lookup update
                        sys.checkTimeoutQueueLengthAndRun(1); // Actual program update
                        sys.checkTimeoutQueueLength(0);
                    },
                },
            ],
        });
    });

    describe("handles watch compiler options", () => {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchFile option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            watchFile: "UseFsEvents"
                        }
                    })
                };
                const files = [ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile];
                return ts.tscWatch.createWatchedSystem(files);
            },
            changes: ts.emptyArray
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchDirectory option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            watchDirectory: "UseFsEvents"
                        }
                    })
                };
                const files = [ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile];
                return ts.tscWatch.createWatchedSystem(files, { runWithoutRecursiveWatches: true });
            },
            changes: ts.emptyArray
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with fallbackPolling option",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            fallbackPolling: "PriorityInterval"
                        }
                    })
                };
                const files = [ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile];
                return ts.tscWatch.createWatchedSystem(files, { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
            },
            changes: ts.emptyArray
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "watchOptions/with watchFile as watch options to extend",
            commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json", "--watchFile", "UseFsEvents"],
            sys: () => {
                const configFile: ts.tscWatch.File = {
                    path: "/a/b/tsconfig.json",
                    content: "{}"
                };
                const files = [ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile];
                return ts.tscWatch.createWatchedSystem(files);
            },
            changes: ts.emptyArray
        });

        describe("exclude options", () => {
            function sys(watchOptions: ts.WatchOptions, runWithoutRecursiveWatches?: boolean): ts.tscWatch.WatchedSystem {
                const configFile: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ exclude: ["node_modules"], watchOptions })
                };
                const main: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/src/main.ts`,
                    content: `import { foo } from "bar"; foo();`
                };
                const bar: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/bar/index.d.ts`,
                    content: `export { foo } from "./foo";`
                };
                const foo: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/bar/foo.d.ts`,
                    content: `export function foo(): string;`
                };
                const fooBar: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/bar/fooBar.d.ts`,
                    content: `export function fooBar(): string;`
                };
                const temp: ts.tscWatch.File = {
                    path: `${ts.tscWatch.projectRoot}/node_modules/bar/temp/index.d.ts`,
                    content: "export function temp(): string;"
                };
                const files = [ts.tscWatch.libFile, main, bar, foo, fooBar, temp, configFile];
                return ts.tscWatch.createWatchedSystem(files, { currentDirectory: ts.tscWatch.projectRoot, runWithoutRecursiveWatches });
            }

            function verifyWorker(...additionalFlags: string[]) {
                ts.tscWatch.verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeFiles option${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeFiles: ["node_modules/*"] }),
                    changes: [
                        {
                            caption: "Change foo",
                            change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/node_modules/bar/foo.d.ts`, "foo", "fooBar"),
                            timeouts: sys => sys.checkTimeoutQueueLength(0),
                        }
                    ]
                });

                ts.tscWatch.verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeDirectories option${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeDirectories: ["node_modules"] }),
                    changes: [
                        {
                            caption: "delete fooBar",
                            change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/node_modules/bar/fooBar.d.ts`),
                            timeouts: sys => sys.checkTimeoutQueueLength(0),                            }
                    ]
                });

                ts.tscWatch.verifyTscWatch({
                    scenario,
                    subScenario: `watchOptions/with excludeDirectories option with recursive directory watching${additionalFlags.join("")}`,
                    commandLineArgs: ["-w", ...additionalFlags],
                    sys: () => sys({ excludeDirectories: ["**/temp"] }, /*runWithoutRecursiveWatches*/ true),
                    changes: [
                        {
                            caption: "Directory watch updates because of main.js creation",
                            change: ts.noop,
                            timeouts: sys => {
                                sys.checkTimeoutQueueLengthAndRun(1); // To update directory callbacks for main.js output
                                sys.checkTimeoutQueueLength(0);
                            },
                        },
                        {
                            caption: "add new folder to temp",
                            change: sys => sys.ensureFileOrFolder({ path: `${ts.tscWatch.projectRoot}/node_modules/bar/temp/fooBar/index.d.ts`, content: "export function temp(): string;" }),
                            timeouts: sys => sys.checkTimeoutQueueLength(0),
                        }
                    ]
                });
            }

            verifyWorker();
            verifyWorker("-extendedDiagnostics");
        });
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: `fsWatch/when using file watching thats when rename occurs when file is still on the disk`,
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: () => ts.tscWatch.createWatchedSystem(
            {
                [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
                [`${ts.tscWatch.projectRoot}/main.ts`]: `import { foo } from "./foo"; foo();`,
                [`${ts.tscWatch.projectRoot}/foo.ts`]: `export declare function foo(): string;`,
                [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({
                    watchOptions: { watchFile: "useFsEvents" },
                    files: ["foo.ts", "main.ts"]
                }),
            },
            { currentDirectory: ts.tscWatch.projectRoot, }
        ),
        changes: [
            {
                caption: "Introduce error such that when callback happens file is already appeared",
                // vm's wq generates this kind of event
                // Skip delete event so inode changes but when the create's rename occurs file is on disk
                change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.ts`, `export declare function foo2(): string;`, {
                    invokeFileDeleteCreateAsPartInsteadOfChange: true,
                    ignoreDelete: true,
                }),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
            },
            {
                caption: "Replace file with rename event that fixes error",
                change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.ts`, `export declare function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, }),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
            },
        ]
    });

    describe("with fsWatch on inodes", () => {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () => ts.tscWatch.createWatchedSystem(
                {
                    [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
                    [`${ts.tscWatch.projectRoot}/main.ts`]: `import { foo } from "./foo"; foo();`,
                    [`${ts.tscWatch.projectRoot}/foo.d.ts`]: `export function foo(): string;`,
                    [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({ watchOptions: { watchFile: "useFsEvents" }, files: ["foo.d.ts", "main.ts"] }),
                },
                {
                    currentDirectory: ts.tscWatch.projectRoot,
                    inodeWatching: true
                }
            ),
            changes: [
                {
                    caption: "Replace file with rename event that introduces error",
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.d.ts`, `export function foo2(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.d.ts`, `export function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2),
                },
            ]
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode when rename event ends with tilde`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () => ts.tscWatch.createWatchedSystem(
                {
                    [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
                    [`${ts.tscWatch.projectRoot}/main.ts`]: `import { foo } from "./foo"; foo();`,
                    [`${ts.tscWatch.projectRoot}/foo.d.ts`]: `export function foo(): string;`,
                    [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({ watchOptions: { watchFile: "useFsEvents" }, files: ["foo.d.ts", "main.ts"] }),
                },
                {
                    currentDirectory: ts.tscWatch.projectRoot,
                    inodeWatching: true
                }
            ),
            changes: [
                {
                    caption: "Replace file with rename event that introduces error",
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.d.ts`, `export function foo2(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, useTildeAsSuffixInRenameEventFileName: true }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.d.ts`, `export function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, useTildeAsSuffixInRenameEventFileName: true }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2),
                },
            ]
        });

        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `fsWatch/when using file watching thats on inode when rename occurs when file is still on the disk`,
            commandLineArgs: ["-w", "--extendedDiagnostics"],
            sys: () => ts.tscWatch.createWatchedSystem(
                {
                    [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
                    [`${ts.tscWatch.projectRoot}/main.ts`]: `import { foo } from "./foo"; foo();`,
                    [`${ts.tscWatch.projectRoot}/foo.ts`]: `export declare function foo(): string;`,
                    [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({
                        watchOptions: { watchFile: "useFsEvents" },
                        files: ["foo.ts", "main.ts"]
                    }),
                },
                {
                    currentDirectory: ts.tscWatch.projectRoot,
                    inodeWatching: true,
                }
            ),
            changes: [
                {
                    caption: "Introduce error such that when callback happens file is already appeared",
                    // vm's wq generates this kind of event
                    // Skip delete event so inode changes but when the create's rename occurs file is on disk
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.ts`, `export declare function foo2(): string;`, {
                        invokeFileDeleteCreateAsPartInsteadOfChange: true,
                        ignoreDelete: true,
                        skipInodeCheckOnCreate: true
                    }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
                },
                {
                    caption: "Replace file with rename event that fixes error",
                    change: sys => sys.modifyFile(`${ts.tscWatch.projectRoot}/foo.ts`, `export declare function foo(): string;`, { invokeFileDeleteCreateAsPartInsteadOfChange: true, }),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
                },
            ]
        });
    });
});

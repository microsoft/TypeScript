namespace ts.tscWatch {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;
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
                    content: "var z = 10;"
                };
                const environmentVariables = new Map<string, string>();
                environmentVariables.set("TSC_WATCHFILE", TestFSWithWatch.Tsc_WatchFile.DynamicPolling);
                return createWatchedSystem([file1, libFile], { environmentVariables });
            },
            changes: [
                {
                    caption: "Time spent to Transition libFile and file1 to low priority queue",
                    change: noop,
                    timeouts: (sys, programs) => {
                        const initialProgram = programs[0][0];
                        const mediumPollingIntervalThreshold = unchangedPollThresholds[PollingInterval.Medium];
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
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "Callbacks: medium priority + high priority queue and scheduled program update",
                    change: noop,
                    // Callbacks: medium priority + high priority queue and scheduled program update
                    // This should detect change in the file
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(3),
                },
                {
                    caption: "Polling queues polled and everything is in the high polling queue",
                    change: noop,
                    timeouts: (sys, programs) => {
                        const initialProgram = programs[0][0];
                        const mediumPollingIntervalThreshold = unchangedPollThresholds[PollingInterval.Medium];
                        const newThreshold = unchangedPollThresholds[PollingInterval.Low] + mediumPollingIntervalThreshold;
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

        describe("tsc-watch when watchDirectories implementation", () => {
            function verifyRenamingFileInSubFolder(subScenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
                const projectFolder = "/a/username/project";
                const projectSrcFolder = `${projectFolder}/src`;
                const configFile: File = {
                    path: `${projectFolder}/tsconfig.json`,
                    content: JSON.stringify({
                        watchOptions: {
                            synchronousWatchDirectory: true
                        }
                    })
                };
                const file: File = {
                    path: `${projectSrcFolder}/file1.ts`,
                    content: ""
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

            verifyTscWatch({
                scenario,
                subScenario: "watchDirectories/when there are symlinks to folders in recursive folders",
                commandLineArgs: ["--w"],
                sys: () => {
                    const cwd = "/home/user/projects/myproject";
                    const file1: File = {
                        path: `${cwd}/src/file.ts`,
                        content: `import * as a from "a"`
                    };
                    const tsconfig: File = {
                        path: `${cwd}/tsconfig.json`,
                        content: `{ "compilerOptions": { "extendedDiagnostics": true, "traceResolution": true }}`
                    };
                    const realA: File = {
                        path: `${cwd}/node_modules/reala/index.d.ts`,
                        content: `export {}`
                    };
                    const realB: File = {
                        path: `${cwd}/node_modules/realb/index.d.ts`,
                        content: `export {}`
                    };
                    const symLinkA: SymLink = {
                        path: `${cwd}/node_modules/a`,
                        symLink: `${cwd}/node_modules/reala`
                    };
                    const symLinkB: SymLink = {
                        path: `${cwd}/node_modules/b`,
                        symLink: `${cwd}/node_modules/realb`
                    };
                    const symLinkBInA: SymLink = {
                        path: `${cwd}/node_modules/reala/node_modules/b`,
                        symLink: `${cwd}/node_modules/b`
                    };
                    const symLinkAInB: SymLink = {
                        path: `${cwd}/node_modules/realb/node_modules/a`,
                        symLink: `${cwd}/node_modules/a`
                    };
                    const files = [libFile, file1, tsconfig, realA, realB, symLinkA, symLinkB, symLinkBInA, symLinkAInB];
                    const environmentVariables = new Map<string, string>();
                    environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
                    return createWatchedSystem(files, { environmentVariables, currentDirectory: cwd });
                },
                changes: emptyArray
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchDirectories/with non synchronous watch directory",
                commandLineArgs: ["--w", "-p", `${projectRoot}/tsconfig.json`],
                sys: () => {
                    const configFile: File = {
                        path: `${projectRoot}/tsconfig.json`,
                        content: "{}"
                    };
                    const file1: File = {
                        path: `${projectRoot}/src/file1.ts`,
                        content: `import { x } from "file2";`
                    };
                    const file2: File = {
                        path: `${projectRoot}/node_modules/file2/index.d.ts`,
                        content: `export const x = 10;`
                    };
                    const files = [libFile, file1, file2, configFile];
                    return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                },
                changes: [
                    {
                        caption: "Directory watch updates because of file1.js creation",
                        change: noop,
                        timeouts: sys => {
                            sys.checkTimeoutQueueLengthAndRun(1); // To update directory callbacks for file1.js output
                            sys.checkTimeoutQueueLength(0);
                        },
                    },
                    {
                        caption: "Remove directory node_modules",
                        // Remove directory node_modules
                        change: sys => sys.deleteFolder(`${projectRoot}/node_modules`, /*recursive*/ true),
                        timeouts: sys => {
                            sys.checkTimeoutQueueLength(3); // 1. Failed lookup invalidation 2. For updating program and 3. for updating child watches
                            sys.runQueuedTimeoutCallbacks(sys.getNextTimeoutId() - 2); // Update program
                        },
                    },
                    {
                        caption: "Pending directory watchers and program update",
                        change: noop,
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
                        change: sys => sys.createDirectory(`${projectRoot}/node_modules`),
                        timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                    },
                    {
                        caption: "npm install folder creation of file2",
                        change: sys => sys.createDirectory(`${projectRoot}/node_modules/file2`),
                        timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                    },
                    {
                        caption: "npm install index file in file2",
                        change: sys => sys.writeFile(`${projectRoot}/node_modules/file2/index.d.ts`, `export const x = 10;`),
                        timeouts: sys => sys.checkTimeoutQueueLength(1), // To update folder structure
                    },
                    {
                        caption: "Updates the program",
                        change: noop,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.checkTimeoutQueueLength(2); // To Update program and failed lookup update
                        },
                    },
                    {
                        caption: "Invalidates module resolution cache",
                        change: noop,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.checkTimeoutQueueLength(1); // To Update program
                        },
                    },
                    {
                        caption: "Pending updates",
                        change: noop,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.checkTimeoutQueueLength(0);
                        },
                    },
                ],
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchDirectories/with non synchronous watch directory with outDir and declaration enabled",
                commandLineArgs: ["--w", "-p", `${projectRoot}/tsconfig.json`],
                sys: () => {
                    const configFile: File = {
                        path: `${projectRoot}/tsconfig.json`,
                        content: JSON.stringify({ compilerOptions: { outDir: "dist", declaration: true } })
                    };
                    const file1: File = {
                        path: `${projectRoot}/src/file1.ts`,
                        content: `import { x } from "file2";`
                    };
                    const file2: File = {
                        path: `${projectRoot}/node_modules/file2/index.d.ts`,
                        content: `export const x = 10;`
                    };
                    const files = [libFile, file1, file2, configFile];
                    return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                },
                changes: [
                    noopChange,
                    {
                        caption: "Add new file, should schedule and run timeout to update directory watcher",
                        change: sys => sys.writeFile(`${projectRoot}/src/file3.ts`, `export const y = 10;`),
                        timeouts: checkSingleTimeoutQueueLengthAndRun, // Update the child watch
                    },
                    {
                        caption: "Actual program update to include new file",
                        change: noop,
                        timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2), // Scheduling failed lookup update and program update
                    },
                    {
                        caption: "After program emit with new file, should schedule and run timeout to update directory watcher",
                        change: noop,
                        timeouts: checkSingleTimeoutQueueLengthAndRun, // Update the child watch
                    },
                    noopChange,
                ],
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchDirectories/with non synchronous watch directory renaming a file",
                commandLineArgs: ["--w", "-p", `${projectRoot}/tsconfig.json`],
                sys: () => {
                    const configFile: File = {
                        path: `${projectRoot}/tsconfig.json`,
                        content: JSON.stringify({ compilerOptions: { outDir: "dist" } })
                    };
                    const file1: File = {
                        path: `${projectRoot}/src/file1.ts`,
                        content: `import { x } from "./file2";`
                    };
                    const file2: File = {
                        path: `${projectRoot}/src/file2.ts`,
                        content: `export const x = 10;`
                    };
                    const files = [libFile, file1, file2, configFile];
                    return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                },
                changes: [
                    noopChange,
                    {
                        caption: "rename the file",
                        change: sys => sys.renameFile(`${projectRoot}/src/file2.ts`, `${projectRoot}/src/renamed.ts`),
                        timeouts: sys => {
                            sys.checkTimeoutQueueLength(2); // 1. For updating program and 2. for updating child watches
                            sys.runQueuedTimeoutCallbacks(1); // Update program
                        },
                    },
                    {
                        caption: "Pending directory watchers and program update",
                        change: noop,
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
            verifyTscWatch({
                scenario,
                subScenario: "watchOptions/with watchFile option",
                commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
                sys: () => {
                    const configFile: File = {
                        path: "/a/b/tsconfig.json",
                        content: JSON.stringify({
                            watchOptions: {
                                watchFile: "UseFsEvents"
                            }
                        })
                    };
                    const files = [libFile, commonFile1, commonFile2, configFile];
                    return createWatchedSystem(files);
                },
                changes: emptyArray
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchOptions/with watchDirectory option",
                commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
                sys: () => {
                    const configFile: File = {
                        path: "/a/b/tsconfig.json",
                        content: JSON.stringify({
                            watchOptions: {
                                watchDirectory: "UseFsEvents"
                            }
                        })
                    };
                    const files = [libFile, commonFile1, commonFile2, configFile];
                    return createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                },
                changes: emptyArray
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchOptions/with fallbackPolling option",
                commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
                sys: () => {
                    const configFile: File = {
                        path: "/a/b/tsconfig.json",
                        content: JSON.stringify({
                            watchOptions: {
                                fallbackPolling: "PriorityInterval"
                            }
                        })
                    };
                    const files = [libFile, commonFile1, commonFile2, configFile];
                    return createWatchedSystem(files, { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
                },
                changes: emptyArray
            });

            verifyTscWatch({
                scenario,
                subScenario: "watchOptions/with watchFile as watch options to extend",
                commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json", "--watchFile", "UseFsEvents"],
                sys: () => {
                    const configFile: File = {
                        path: "/a/b/tsconfig.json",
                        content: "{}"
                    };
                    const files = [libFile, commonFile1, commonFile2, configFile];
                    return createWatchedSystem(files);
                },
                changes: emptyArray
            });
        });
    });
}

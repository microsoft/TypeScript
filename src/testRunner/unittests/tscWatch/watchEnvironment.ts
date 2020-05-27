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
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHFILE", TestFSWithWatch.Tsc_WatchFile.DynamicPolling);
                return createWatchedSystem([file1, libFile], { environmentVariables });
            },
            changes: [
                (sys, programs) => {
                    const initialProgram = programs[0][0];
                    const mediumPollingIntervalThreshold = unchangedPollThresholds[PollingInterval.Medium];
                    for (let index = 0; index < mediumPollingIntervalThreshold; index++) {
                        // Transition libFile and file1 to low priority queue
                        sys.checkTimeoutQueueLengthAndRun(1);
                        assert.deepEqual(programs[0][0], initialProgram);
                    }
                    return "Time spent to Transition libFile and file1 to low priority queue";
                },
                sys => {
                    // Make a change to file
                    sys.writeFile("/a/username/project/typescript.ts", "var zz30 = 100;");

                    // During this timeout the file would be detected as unchanged
                    sys.checkTimeoutQueueLengthAndRun(1);
                    return "Make change to file";
                },
                sys => {
                    // Callbacks: medium priority + high priority queue and scheduled program update
                    sys.checkTimeoutQueueLengthAndRun(3);
                    // This should detect change in the file
                    return "Callbacks: medium priority + high priority queue and scheduled program update";
                },
                (sys, programs) => {
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
                    return "Polling queues polled and everything is in the high polling queue";
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
                        const environmentVariables = createMap<string>();
                        environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                        return createWatchedSystem(files, { environmentVariables });
                    },
                    changes: [
                        sys => {
                            // Rename the file:
                            sys.renameFile(file.path, file.path.replace("file1.ts", "file2.ts"));
                            if (tscWatchDirectory === Tsc_WatchDirectory.DynamicPolling) {
                                // With dynamic polling the fs change would be detected only by running timeouts
                                sys.runQueuedTimeoutCallbacks();
                            }
                            // Delayed update program
                            sys.runQueuedTimeoutCallbacks();
                            return "Rename file1 to file2";
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
                    const environmentVariables = createMap<string>();
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
                    sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // To update directory callbacks for file1.js output
                        sys.checkTimeoutQueueLengthAndRun(1); // Update program again
                        sys.checkTimeoutQueueLength(0);
                        return "Pending updates because of file1.js creation";
                    },
                    sys => {
                        // Remove directory node_modules
                        sys.deleteFolder(`${projectRoot}/node_modules`, /*recursive*/ true);
                        sys.checkTimeoutQueueLength(2); // 1. For updating program and 2. for updating child watches
                        sys.runQueuedTimeoutCallbacks(sys.getNextTimeoutId() - 2); // Update program
                        return "Remove directory node_modules";
                    },
                    sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // To update directory watchers
                        sys.checkTimeoutQueueLengthAndRun(1); // To Update program
                        sys.checkTimeoutQueueLength(0);
                        return "Pending directory watchers and program update";
                    },
                    sys => {
                        // npm install
                        sys.createDirectory(`${projectRoot}/node_modules`);
                        sys.checkTimeoutQueueLength(1); // To update folder structure
                        return "Start npm install";
                    },
                    sys => {
                        sys.createDirectory(`${projectRoot}/node_modules/file2`);
                        sys.checkTimeoutQueueLength(1); // To update folder structure
                        return "npm install folder creation of file2";
                    },
                    sys => {
                        sys.writeFile(`${projectRoot}/node_modules/file2/index.d.ts`, `export const x = 10;`);
                        sys.checkTimeoutQueueLength(1); // To update folder structure
                        return "npm install index file in file2";
                    },
                    sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.checkTimeoutQueueLength(1); // To Update the program
                        return "Updates the program";
                    },
                    sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.checkTimeoutQueueLength(0);
                        return "Pending updates";
                    }
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

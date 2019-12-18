namespace ts.tscWatch {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;
    describe("unittests:: tsc-watch:: watchEnvironment:: tsc-watch with different polling/non polling options", () => {
        it("watchFile using dynamic priority polling", () => {
            const projectFolder = "/a/username/project";
            const file1: File = {
                path: `${projectFolder}/typescript.ts`,
                content: "var z = 10;"
            };
            const files = [file1, libFile];
            const environmentVariables = createMap<string>();
            environmentVariables.set("TSC_WATCHFILE", TestFSWithWatch.Tsc_WatchFile.DynamicPolling);
            const host = createWatchedSystem(files, { environmentVariables });
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            const initialProgram = watch();
            verifyProgram();

            const mediumPollingIntervalThreshold = unchangedPollThresholds[PollingInterval.Medium];
            for (let index = 0; index < mediumPollingIntervalThreshold; index++) {
                // Transition libFile and file1 to low priority queue
                host.checkTimeoutQueueLengthAndRun(1);
                assert.deepEqual(watch(), initialProgram);
            }

            // Make a change to file
            file1.content = "var zz30 = 100;";
            host.reloadFS(files);

            // This should detect change in the file
            host.checkTimeoutQueueLengthAndRun(1);
            assert.deepEqual(watch(), initialProgram);

            // Callbacks: medium priority + high priority queue and scheduled program update
            host.checkTimeoutQueueLengthAndRun(3);
            // During this timeout the file would be detected as unchanged
            let fileUnchangeDetected = 1;
            const newProgram = watch();
            assert.notStrictEqual(newProgram, initialProgram);

            verifyProgram();
            const outputFile1 = changeExtension(file1.path, ".js");
            assert.isTrue(host.fileExists(outputFile1));
            assert.equal(host.readFile(outputFile1), file1.content + host.newLine);

            const newThreshold = unchangedPollThresholds[PollingInterval.Low] + mediumPollingIntervalThreshold;
            for (; fileUnchangeDetected < newThreshold; fileUnchangeDetected++) {
                // For high + Medium/low polling interval
                host.checkTimeoutQueueLengthAndRun(2);
                assert.deepEqual(watch(), newProgram);
            }

            // Everything goes in high polling interval queue
            host.checkTimeoutQueueLengthAndRun(1);
            assert.deepEqual(watch(), newProgram);

            function verifyProgram() {
                checkProgramActualFiles(watch(), files.map(f => f.path));
                checkWatchedFiles(host, []);
                checkWatchedDirectories(host, [], /*recursive*/ false);
                checkWatchedDirectories(host, [], /*recursive*/ true);
            }
        });

        describe("tsc-watch when watchDirectories implementation", () => {
            function verifyRenamingFileInSubFolder(tscWatchDirectory: Tsc_WatchDirectory) {
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
                const programFiles = [file, libFile];
                const files = [file, configFile, libFile];
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                const host = createWatchedSystem(files, { environmentVariables });
                const watch = createWatchOfConfigFile(configFile.path, host);
                const projectFolders = [projectFolder, projectSrcFolder, `${projectFolder}/node_modules/@types`];
                // Watching files config file, file, lib file
                const expectedWatchedFiles = files.map(f => f.path);
                const expectedWatchedDirectories = tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory ? projectFolders : emptyArray;
                if (tscWatchDirectory === Tsc_WatchDirectory.WatchFile) {
                    expectedWatchedFiles.push(...projectFolders);
                }

                verifyProgram(checkOutputErrorsInitial);

                // Rename the file:
                file.path = file.path.replace("file1.ts", "file2.ts");
                expectedWatchedFiles[0] = file.path;
                host.reloadFS(files);
                if (tscWatchDirectory === Tsc_WatchDirectory.DynamicPolling) {
                    // With dynamic polling the fs change would be detected only by running timeouts
                    host.runQueuedTimeoutCallbacks();
                }
                // Delayed update program
                host.runQueuedTimeoutCallbacks();
                verifyProgram(checkOutputErrorsIncremental);

                function verifyProgram(checkOutputErrors: (host: WatchedSystem, errors: readonly Diagnostic[]) => void) {
                    checkProgramActualFiles(watch(), programFiles.map(f => f.path));
                    checkOutputErrors(host, emptyArray);

                    const outputFile = changeExtension(file.path, ".js");
                    assert(host.fileExists(outputFile));
                    assert.equal(host.readFile(outputFile), file.content);

                    checkWatchedDirectories(host, emptyArray, /*recursive*/ true);

                    // Watching config file, file, lib file and directories
                    checkWatchedFilesDetailed(host, expectedWatchedFiles, 1);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, 1, /*recursive*/ false);
                }
            }

            it("uses watchFile when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(Tsc_WatchDirectory.WatchFile);
            });

            it("uses non recursive watchDirectory when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(Tsc_WatchDirectory.NonRecursiveWatchDirectory);
            });

            it("uses non recursive dynamic polling when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(Tsc_WatchDirectory.DynamicPolling);
            });

            it("when there are symlinks to folders in recursive folders", () => {
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
                const files = [file1, tsconfig, realA, realB, symLinkA, symLinkB, symLinkBInA, symLinkAInB];
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
                const host = createWatchedSystem(files, { environmentVariables, currentDirectory: cwd });
                createWatchOfConfigFile("tsconfig.json", host);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                checkWatchedDirectories(host, [cwd, `${cwd}/node_modules`, `${cwd}/node_modules/@types`, `${cwd}/node_modules/reala`, `${cwd}/node_modules/realb`,
                    `${cwd}/node_modules/reala/node_modules`, `${cwd}/node_modules/realb/node_modules`, `${cwd}/src`], /*recursive*/ false);
            });

            it("with non synchronous watch directory", () => {
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
                const host = createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                const watch = createWatchOfConfigFile(configFile.path, host);
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
                checkOutputErrorsInitial(host, emptyArray);
                const watchedDirectories = [`${projectRoot}`, `${projectRoot}/src`, `${projectRoot}/node_modules`, `${projectRoot}/node_modules/file2`, `${projectRoot}/node_modules/@types`];
                checkWatchesWithFile2();
                host.checkTimeoutQueueLengthAndRun(1); // To update directory callbacks for file1.js output
                host.checkTimeoutQueueLengthAndRun(1); // Update program again
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, emptyArray);
                checkWatchesWithFile2();

                // Remove directory node_modules
                host.deleteFolder(`${projectRoot}/node_modules`, /*recursive*/ true);
                host.checkTimeoutQueueLength(2); // 1. For updating program and 2. for updating child watches
                host.runQueuedTimeoutCallbacks(host.getNextTimeoutId() - 2); // Update program
                checkOutputErrorsIncremental(host, [
                    getDiagnosticModuleNotFoundOfFile(watch(), file1, "file2")
                ]);
                checkWatchesWithoutFile2();

                host.checkTimeoutQueueLengthAndRun(1); // To update directory watchers
                host.checkTimeoutQueueLengthAndRun(1); // To Update program
                host.checkTimeoutQueueLength(0);
                checkWatchesWithoutFile2();
                checkOutputErrorsIncremental(host, [
                    getDiagnosticModuleNotFoundOfFile(watch(), file1, "file2")
                ]);

                // npm install
                host.createDirectory(`${projectRoot}/node_modules`);
                host.checkTimeoutQueueLength(1); // To update folder structure
                assert.deepEqual(host.getOutput(), emptyArray);
                checkWatchesWithoutFile2();
                host.createDirectory(`${projectRoot}/node_modules/file2`);
                host.checkTimeoutQueueLength(1); // To update folder structure
                assert.deepEqual(host.getOutput(), emptyArray);
                checkWatchesWithoutFile2();
                host.writeFile(file2.path, file2.content);
                host.checkTimeoutQueueLength(1); // To update folder structure
                assert.deepEqual(host.getOutput(), emptyArray);
                checkWatchesWithoutFile2();

                host.runQueuedTimeoutCallbacks();
                host.checkTimeoutQueueLength(1); // To Update the program
                assert.deepEqual(host.getOutput(), emptyArray);
                checkWatchedFiles(files.filter(f => f !== file2)); // Files like without file2
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                checkNonRecursiveWatchedDirectories(watchedDirectories); // Directories like with file2

                host.runQueuedTimeoutCallbacks();
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, emptyArray);
                checkWatchesWithFile2();

                function checkWatchesWithFile2() {
                    checkWatchedFiles(files);
                    checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                    checkNonRecursiveWatchedDirectories(watchedDirectories);
                }

                function checkWatchesWithoutFile2() {
                    checkWatchedFiles(files.filter(f => f !== file2));
                    checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                    checkNonRecursiveWatchedDirectories(watchedDirectories.filter(f => f !== `${projectRoot}/node_modules/file2`));
                }

                function checkWatchedFiles(files: readonly File[]) {
                    checkWatchedFilesDetailed(
                        host,
                        files.map(f => f.path.toLowerCase()),
                        1,
                        arrayToMap(
                            files,
                            f => f.path.toLowerCase(),
                            () => [PollingInterval.Low]
                        )
                    );
                }

                function checkNonRecursiveWatchedDirectories(directories: readonly string[]) {
                    checkWatchedDirectoriesDetailed(
                        host,
                        directories,
                        1,
                        /*recursive*/ false,
                        arrayToMap(
                            directories,
                            identity,
                            () => [{
                                fallbackPollingInterval: PollingInterval.Medium,
                                fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                            }]
                        )
                    );
                }
            });
        });

        describe("handles watch compiler options", () => {
            it("with watchFile option", () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            watchFile: "UseFsEvents"
                        }
                    })
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                const host = createWatchedSystem(files);
                const watch = createWatchOfConfigFile(configFile.path, host, { extendedDiagnostics: true });
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));

                // Instead of polling watch (= watchedFiles), uses fsWatch
                checkWatchedFiles(host, emptyArray);
                checkWatchedDirectoriesDetailed(
                    host,
                    files.map(f => f.path.toLowerCase()),
                    1,
                    /*recursive*/ false,
                    arrayToMap(
                        files,
                        f => f.path.toLowerCase(),
                        f => [{
                            fallbackPollingInterval: f === configFile ? PollingInterval.High : PollingInterval.Low,
                            fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                        }]
                    )
                );
                checkWatchedDirectoriesDetailed(
                    host,
                    ["/a/b", "/a/b/node_modules/@types"],
                    1,
                    /*recursive*/ true,
                    arrayToMap(
                        ["/a/b", "/a/b/node_modules/@types"],
                        identity,
                        () => [{
                            fallbackPollingInterval: PollingInterval.Medium,
                            fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                        }]
                    )
                );
            });

            it("with watchDirectory option", () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            watchDirectory: "UseFsEvents"
                        }
                    })
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                const host = createWatchedSystem(files, { runWithoutRecursiveWatches: true });
                const watch = createWatchOfConfigFile(configFile.path, host, { extendedDiagnostics: true });
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));

                checkWatchedFilesDetailed(
                    host,
                    files.map(f => f.path.toLowerCase()),
                    1,
                    arrayToMap(
                        files,
                        f => f.path.toLowerCase(),
                        () => [PollingInterval.Low]
                    )
                );
                checkWatchedDirectoriesDetailed(
                    host,
                    ["/a/b", "/a/b/node_modules/@types"],
                    1,
                    /*recursive*/ false,
                    arrayToMap(
                        ["/a/b", "/a/b/node_modules/@types"],
                        identity,
                        () => [{
                            fallbackPollingInterval: PollingInterval.Medium,
                            fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                        }]
                    )
                );
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
            });

            it("with fallbackPolling option", () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: JSON.stringify({
                        watchOptions: {
                            fallbackPolling: "PriorityInterval"
                        }
                    })
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                const host = createWatchedSystem(files, { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
                const watch = createWatchOfConfigFile(configFile.path, host, { extendedDiagnostics: true });
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
                const filePaths = files.map(f => f.path.toLowerCase());
                checkWatchedFilesDetailed(
                    host,
                    filePaths.concat(["/a/b", "/a/b/node_modules/@types"]),
                    1,
                    arrayToMap(
                        filePaths.concat(["/a/b", "/a/b/node_modules/@types"]),
                        identity,
                        f => [contains(filePaths, f) ? PollingInterval.Low : PollingInterval.Medium]
                    )
                );
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
            });

            it("with watchFile as watch options to extend", () => {
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: "{}"
                };
                const files = [libFile, commonFile1, commonFile2, configFile];
                const host = createWatchedSystem(files);
                const watch = createWatchOfConfigFile(configFile.path, host, { extendedDiagnostics: true }, { watchFile: WatchFileKind.UseFsEvents });
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));

                // Instead of polling watch (= watchedFiles), uses fsWatch
                checkWatchedFiles(host, emptyArray);
                checkWatchedDirectoriesDetailed(
                    host,
                    files.map(f => f.path.toLowerCase()),
                    1,
                    /*recursive*/ false,
                    arrayToMap(
                        files,
                        f => f.path.toLowerCase(),
                        f => [{
                            fallbackPollingInterval: f === configFile ? PollingInterval.High : PollingInterval.Low,
                            fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                        }]
                    )
                );
                checkWatchedDirectoriesDetailed(
                    host,
                    ["/a/b", "/a/b/node_modules/@types"],
                    1,
                    /*recursive*/ true,
                    arrayToMap(
                        ["/a/b", "/a/b/node_modules/@types"],
                        identity,
                        () => [{
                            fallbackPollingInterval: PollingInterval.Medium,
                            fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                        }]
                    )
                );
            });
        });
    });
}

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
                    content: "{}"
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
        });
    });
}

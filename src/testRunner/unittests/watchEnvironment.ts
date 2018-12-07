namespace ts {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;

    export namespace tscWatch {
        describe("watchEnvironment:: tsc-watch with different polling/non polling options", () => {
            it("watchFile using dynamic priority polling", () => {
                const projectFolder = "/a/username/project";
                const file1: File = {
                    path: `${projectFolder}/typescript.ts`,
                    content: "var z = 10;"
                };
                const files = [file1, libFile];
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHFILE", "DynamicPriorityPolling");
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

                    function verifyProgram(checkOutputErrors: (host: WatchedSystem, errors: ReadonlyArray<Diagnostic>) => void) {
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

    export namespace projectSystem {
        describe("watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
            function verifyCompletionListWithNewFileInSubFolder(tscWatchDirectory: Tsc_WatchDirectory) {
                const projectFolder = "/a/username/project";
                const projectSrcFolder = `${projectFolder}/src`;
                const configFile: File = {
                    path: `${projectFolder}/tsconfig.json`,
                    content: "{}"
                };
                const index: File = {
                    path: `${projectSrcFolder}/index.ts`,
                    content: `import {} from "./"`
                };
                const file1: File = {
                    path: `${projectSrcFolder}/file1.ts`,
                    content: ""
                };

                const files = [index, file1, configFile, libFile];
                const fileNames = files.map(file => file.path);
                // All closed files(files other than index), project folder, project/src folder and project/node_modules/@types folder
                const expectedWatchedFiles = arrayToMap(fileNames.slice(1), s => s, () => 1);
                const expectedWatchedDirectories = createMap<number>();
                const mapOfDirectories = tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory ?
                    expectedWatchedDirectories :
                    tscWatchDirectory === Tsc_WatchDirectory.WatchFile ?
                        expectedWatchedFiles :
                        createMap();
                // For failed resolution lookup and tsconfig files => cached so only watched only once
                mapOfDirectories.set(projectFolder, 1);
                // Through above recursive watches
                mapOfDirectories.set(projectSrcFolder, 1);
                // node_modules/@types folder
                mapOfDirectories.set(`${projectFolder}/${nodeModulesAtTypes}`, 1);
                const expectedCompletions = ["file1"];
                const completionPosition = index.content.lastIndexOf('"');
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                const host = createServerHost(files, { environmentVariables });
                const projectService = createProjectService(host);
                projectService.openClientFile(index.path);

                const project = Debug.assertDefined(projectService.configuredProjects.get(configFile.path));
                verifyProjectAndCompletions();

                // Add file2
                const file2: File = {
                    path: `${projectSrcFolder}/file2.ts`,
                    content: ""
                };
                files.push(file2);
                fileNames.push(file2.path);
                expectedWatchedFiles.set(file2.path, 1);
                expectedCompletions.push("file2");
                host.reloadFS(files);
                host.runQueuedTimeoutCallbacks();
                assert.equal(projectService.configuredProjects.get(configFile.path), project);
                verifyProjectAndCompletions();

                function verifyProjectAndCompletions() {
                    const completions = project.getLanguageService().getCompletionsAtPosition(index.path, completionPosition, { includeExternalModuleExports: false, includeInsertTextCompletions: false })!;
                    checkArray("Completion Entries", completions.entries.map(e => e.name), expectedCompletions);

                    checkWatchedDirectories(host, emptyArray, /*recursive*/ true);

                    checkWatchedFilesDetailed(host, expectedWatchedFiles);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, /*recursive*/ false);
                    checkProjectActualFiles(project, fileNames);
                }
            }

            it("uses watchFile when file is added to subfolder, completion list has new file", () => {
                verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.WatchFile);
            });

            it("uses non recursive watchDirectory when file is added to subfolder, completion list has new file", () => {
                verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.NonRecursiveWatchDirectory);
            });

            it("uses dynamic polling when file is added to subfolder, completion list has new file", () => {
                verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.DynamicPolling);
            });
        });

        describe("watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
            function verifyWatchedDirectories(rootedPath: string, useProjectAtRoot: boolean) {
                const root = useProjectAtRoot ? rootedPath : `${rootedPath}myfolder/allproject/`;
                const configFile: File = {
                    path: root + "project/tsconfig.json",
                    content: "{}"
                };
                const file1: File = {
                    path: root + "project/file1.ts",
                    content: "let x = 10;"
                };
                const file2: File = {
                    path: root + "project/file2.ts",
                    content: "let y = 10;"
                };
                const files = [configFile, file1, file2, libFile];
                const host = createServerHost(files, { useWindowsStylePaths: true });
                const projectService = createProjectService(host);
                projectService.openClientFile(file1.path);
                const project = projectService.configuredProjects.get(configFile.path)!;
                assert.isDefined(project);
                const winsowsStyleLibFilePath = "c:/" + libFile.path.substring(1);
                checkProjectActualFiles(project, files.map(f => f === libFile ? winsowsStyleLibFilePath : f.path));
                checkWatchedFiles(host, mapDefined(files, f => f === libFile ? winsowsStyleLibFilePath : f === file1 ? undefined : f.path));
                checkWatchedDirectories(host, [], /*recursive*/ false);
                checkWatchedDirectories(host, [
                    root + "project",
                    root + "project/node_modules/@types"
                ].concat(useProjectAtRoot ? [] : [root + nodeModulesAtTypes]), /*recursive*/ true);
            }

            function verifyRootedDirectoryWatch(rootedPath: string) {
                it("When project is in rootFolder of style c:/", () => {
                    verifyWatchedDirectories(rootedPath, /*useProjectAtRoot*/ true);
                });

                it("When files at some folder other than root", () => {
                    verifyWatchedDirectories(rootedPath, /*useProjectAtRoot*/ false);
                });
            }

            describe("for rootFolder of style c:/", () => {
                verifyRootedDirectoryWatch("c:/");
            });

            describe("for rootFolder of style c:/users/username", () => {
                verifyRootedDirectoryWatch("c:/users/username/");
            });
        });
    }
}

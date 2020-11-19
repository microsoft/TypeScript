namespace ts.projectSystem {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;
    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
        function verifyCompletionListWithNewFileInSubFolder(tscWatchDirectory: Tsc_WatchDirectory) {
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
            const expectedWatchedDirectories = new Map<string, number>();
            const mapOfDirectories = tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory ?
                expectedWatchedDirectories :
                tscWatchDirectory === Tsc_WatchDirectory.WatchFile ?
                    expectedWatchedFiles :
                    new Map();
            // For failed resolution lookup and tsconfig files => cached so only watched only once
            mapOfDirectories.set(projectFolder, 1);
            // Through above recursive watches
            mapOfDirectories.set(projectSrcFolder, 1);
            // node_modules/@types folder
            mapOfDirectories.set(`${projectFolder}/${nodeModulesAtTypes}`, 1);
            const expectedCompletions = ["file1"];
            const completionPosition = index.content.lastIndexOf('"');
            const environmentVariables = new Map<string, string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = createServerHost(files, { environmentVariables });
            const projectService = createProjectService(host);
            projectService.openClientFile(index.path);

            const project = Debug.checkDefined(projectService.configuredProjects.get(configFile.path));
            verifyProjectAndCompletions();

            // Add file2
            const file2: File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: ""
            };
            fileNames.push(file2.path);
            expectedWatchedFiles.set(file2.path, 1);
            expectedCompletions.push("file2");
            host.writeFile(file2.path, file2.content);
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

    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
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
            const host = createServerHost(files, { windowsStyleRoot: "c:/" });
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

    it(`unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem recursive watch directory implementation does not watch files/directories in node_modules starting with "."`, () => {
        const projectFolder = "/a/username/project";
        const projectSrcFolder = `${projectFolder}/src`;
        const configFile: File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}"
        };
        const index: File = {
            path: `${projectSrcFolder}/index.ts`,
            content: `import {} from "file"`
        };
        const file1: File = {
            path: `${projectSrcFolder}/file1.ts`,
            content: ""
        };
        const nodeModulesExistingUnusedFile: File = {
            path: `${projectFolder}/node_modules/someFile.d.ts`,
            content: ""
        };

        const fileNames = [index, file1, configFile, libFile].map(file => file.path);
        // All closed files(files other than index), project folder, project/src folder and project/node_modules/@types folder
        const expectedWatchedFiles = arrayToMap(fileNames.slice(1), identity, () => 1);
        const expectedWatchedDirectories = arrayToMap([projectFolder, projectSrcFolder, `${projectFolder}/${nodeModules}`, `${projectFolder}/${nodeModulesAtTypes}`], identity, () => 1);

        const environmentVariables = new Map<string, string>();
        environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
        const host = createServerHost([index, file1, configFile, libFile, nodeModulesExistingUnusedFile], { environmentVariables });
        const projectService = createProjectService(host);
        projectService.openClientFile(index.path);

        const project = Debug.checkDefined(projectService.configuredProjects.get(configFile.path));
        verifyProject();

        const nodeModulesIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/node_modules/.cache/someFile.d.ts`,
            content: ""
        };

        const nodeModulesIgnoredFile: File = {
            path: `${projectFolder}/node_modules/.cacheFile.ts`,
            content: ""
        };

        const gitIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/.git/someFile.d.ts`,
            content: ""
        };

        const gitIgnoredFile: File = {
            path: `${projectFolder}/.gitCache.d.ts`,
            content: ""
        };
        const emacsIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/src/.#field.ts`,
            content: ""
        };

        [
            nodeModulesIgnoredFileFromIgnoreDirectory,
            nodeModulesIgnoredFile,
            gitIgnoredFileFromIgnoreDirectory,
            gitIgnoredFile,
            emacsIgnoredFileFromIgnoreDirectory
        ].forEach(ignoredEntity => {
            host.ensureFileOrFolder(ignoredEntity);
            host.checkTimeoutQueueLength(0);
            verifyProject();
        });

        function verifyProject() {
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
            checkWatchedFilesDetailed(host, expectedWatchedFiles);
            checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, /*recursive*/ false);
            checkProjectActualFiles(project, fileNames);
        }
    });

    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
        function verifyFilePathStyle(path: string) {
            const windowsStyleRoot = path.substr(0, getRootLength(path));
            const host = createServerHost(
                [libFile, { path, content: "const x = 10" }],
                { windowsStyleRoot }
            );
            const service = createProjectService(host);
            service.openClientFile(path);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const libPath = `${windowsStyleRoot}${libFile.path.substring(1)}`;
            checkProjectActualFiles(service.inferredProjects[0], [path, libPath]);
            checkWatchedFiles(host, [libPath, `${getDirectoryPath(path)}/tsconfig.json`, `${getDirectoryPath(path)}/jsconfig.json`]);
        }

        it("for file of style c:/myprojects/project/x.js", () => {
            verifyFilePathStyle("c:/myprojects/project/x.js");
        });

        it("for file of style //vda1cs4850/myprojects/project/x.js", () => {
            verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js");
        });

        it("for file of style //vda1cs4850/c$/myprojects/project/x.js", () => {
            verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js");
        });

        it("for file of style c:/users/username/myprojects/project/x.js", () => {
            verifyFilePathStyle("c:/users/username/myprojects/project/x.js");
        });

        it("for file of style //vda1cs4850/c$/users/username/myprojects/project/x.js", () => {
            verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js");
        });
    });

    describe("unittests:: tsserver:: watchEnvironment:: handles watch compiler options", () => {
        it("with watchFile option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1));
            const session = createSession(host);
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        watchFile: protocol.WatchFileKind.UseFsEvents
                    }
                }
            });
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

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
                        directoryName: f.path,
                        fallbackPollingInterval: f === configFile ? PollingInterval.High : PollingInterval.Medium,
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
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.Medium,
                        fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                    }]
                )
            );
        });

        it("with watchDirectory option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
            const session = createSession(host);
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        watchDirectory: protocol.WatchDirectoryKind.UseFsEvents
                    }
                }
            });
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

            checkWatchedFilesDetailed(
                host,
                files.map(f => f.path.toLowerCase()),
                1,
                arrayToMap(
                    files,
                    f => f.path.toLowerCase(),
                    f => [{
                        fileName: f.path,
                        pollingInterval: PollingInterval.Low
                    }]
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
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.Medium,
                        fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                    }]
                )
            );
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
        });

        it("with fallbackPolling option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
            const session = createSession(host);
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        fallbackPolling: protocol.PollingWatchKind.PriorityInterval
                    }
                }
            });
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

            const filePaths = files.map(f => f.path);
            const allFilePaths = filePaths.concat(["/a/b", "/a/b/node_modules/@types"]);
            checkWatchedFilesDetailed(
                host,
                allFilePaths.map(toLowerCase),
                1,
                arrayToMap(
                    allFilePaths,
                    toLowerCase,
                    fileName => [{
                        fileName,
                        pollingInterval: contains(filePaths, fileName) ? PollingInterval.Low : PollingInterval.Medium
                    }]
                )
            );
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
        });

        it("with watchFile option in configFile", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    watchOptions: {
                        watchFile: "UseFsEvents"
                    }
                })
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1));
            const session = createSession(host);
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

            // The closed script infos are watched using host settings
            checkWatchedFilesDetailed(
                host,
                [libFile, commonFile2].map(f => f.path.toLowerCase()),
                1,
                arrayToMap(
                    [libFile, commonFile2],
                    f => f.path.toLowerCase(),
                    f => [{
                        fileName: f.path,
                        pollingInterval: PollingInterval.Low
                    }]
                )
            );
            // Config file with the setting with fsWatch
            checkWatchedDirectoriesDetailed(
                host,
                [configFile.path.toLowerCase()],
                1,
                /*recursive*/ false,
                arrayToMap(
                    [configFile.path],
                    toLowerCase,
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.High,
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
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.Medium,
                        fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                    }]
                )
            );
        });

        it("with watchDirectory option in configFile", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    watchOptions: {
                        watchDirectory: "UseFsEvents"
                    }
                })
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
            const session = createSession(host);
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

            checkWatchedFilesDetailed(
                host,
                files.map(f => f.path.toLowerCase()),
                1,
                arrayToMap(
                    files,
                    f => f.path.toLowerCase(),
                    f => [{
                        fileName: f.path,
                        pollingInterval: PollingInterval.Low
                    }]
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
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.Medium,
                        fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                    }]
                )
            );
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
        });

        it("with fallbackPolling option in configFile", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    watchOptions: {
                        fallbackPolling: "PriorityInterval"
                    }
                })
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
            const session = createSession(host);
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        fallbackPolling: protocol.PollingWatchKind.PriorityInterval
                    }
                }
            });
            const service = session.getProjectService();
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            checkProjectActualFiles(
                service.configuredProjects.get(configFile.path)!,
                files.map(f => f.path).concat(commonFile1.path)
            );

            const filePaths = files.map(f => f.path);
            const allFilePaths = filePaths.concat(["/a/b", "/a/b/node_modules/@types"]);
            checkWatchedFilesDetailed(
                host,
                allFilePaths.map(toLowerCase),
                1,
                arrayToMap(
                    allFilePaths,
                    toLowerCase,
                    fileName => [{
                        fileName,
                        pollingInterval: contains(filePaths, fileName) ? PollingInterval.Low : PollingInterval.Medium
                    }]
                )
            );
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
        });

        describe("excludeDirectories", () => {
            function setupFiles() {
                const main: File = {
                    path: `${tscWatch.projectRoot}/src/main.ts`,
                    content: `import { foo } from "bar"; foo();`
                };
                const bar: File = {
                    path: `${tscWatch.projectRoot}/node_modules/bar/index.d.ts`,
                    content: `export { foo } from "./foo";`
                };
                const foo: File = {
                    path: `${tscWatch.projectRoot}/node_modules/bar/foo.d.ts`,
                    content: `export function foo(): string;`
                };
                return { main, bar, foo };
            }

            function setupConfigureHost(service: TestProjectService, configureHost: boolean | undefined) {
                if (configureHost) {
                    service.setHostConfiguration({
                        watchOptions: { excludeDirectories: ["node_modules"] }
                    });
                }
            }
            function setup(configureHost?: boolean) {
                const configFile: File = {
                    path: `${tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ include: ["src"], watchOptions: { excludeDirectories: ["node_modules"] } })
                };
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo, configFile];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host);
                setupConfigureHost(service, configureHost);
                service.openClientFile(main.path);
                return { host, configFile };
            }

            it("with excludeDirectories option in configFile", () => {
                const { host, configFile } = setup();
                checkWatchedFilesDetailed(host, [configFile.path, libFile.path], 1);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    arrayToMap(
                        [`${tscWatch.projectRoot}/src`, `${tscWatch.projectRoot}/node_modules`],
                        identity,
                        f => f === `${tscWatch.projectRoot}/node_modules` ? 1 : 2,
                    ),
                    /*recursive*/ true,
                );
            });

            it("with excludeDirectories option in configuration", () => {
                const { host, configFile } = setup(/*configureHost*/ true);
                checkWatchedFilesDetailed(host, [configFile.path, libFile.path], 1);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    [`${tscWatch.projectRoot}/src`],
                    2,
                    /*recursive*/ true,
                );
            });

            function setupExternalProject(configureHost?: boolean) {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host);
                setupConfigureHost(service, configureHost);
                service.openExternalProject(<protocol.ExternalProject>{
                    projectFileName: `${tscWatch.projectRoot}/project.csproj`,
                    rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                    options: { excludeDirectories: ["node_modules"] }
                });
                service.openClientFile(main.path);
                return host;
            }

            it("external project watch options", () => {
                const host = setupExternalProject();
                checkWatchedFilesDetailed(host, [libFile.path], 1);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    [`${tscWatch.projectRoot}/src`, `${tscWatch.projectRoot}/node_modules`],
                    1,
                    /*recursive*/ true,
                );
            });

            it("external project watch options in host configuration", () => {
                const host = setupExternalProject(/*configureHost*/ true);
                checkWatchedFilesDetailed(host, [libFile.path], 1);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    [`${tscWatch.projectRoot}/src`],
                    1,
                    /*recursive*/ true,
                );
            });

            it("external project watch options errors", () => {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host);
                service.openExternalProject(<protocol.ExternalProject>{
                    projectFileName: `${tscWatch.projectRoot}/project.csproj`,
                    rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                    options: { excludeDirectories: ["**/../*"] }
                });
                service.openClientFile(main.path);
                const project = service.externalProjects[0];
                assert.deepEqual(project.getAllProjectErrors(), [
                    {
                        messageText: `File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.`,
                        category: Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.category,
                        code: Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.code,
                        file: undefined,
                        start: undefined,
                        length: undefined,
                        reportsDeprecated: undefined,
                        reportsUnnecessary: undefined,
                    }
                ]);
            });

            function setupInferredProject(configureHost?: boolean) {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host, {}, { useInferredProjectPerProjectRoot: true });
                setupConfigureHost(service, configureHost);
                service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["node_modules"] }, tscWatch.projectRoot);
                service.openClientFile(main.path, main.content, ScriptKind.TS, tscWatch.projectRoot);
                return host;
            }

            it("inferred project watch options", () => {
                const host = setupInferredProject();
                checkWatchedFilesDetailed(
                    host,
                    [libFile.path, `${tscWatch.projectRoot}/tsconfig.json`, `${tscWatch.projectRoot}/jsconfig.json`, `${tscWatch.projectRoot}/src/tsconfig.json`, `${tscWatch.projectRoot}/src/jsconfig.json`],
                    1
                );
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    [`${tscWatch.projectRoot}/src`, `${tscWatch.projectRoot}/node_modules`],
                    1,
                    /*recursive*/ true,
                );
            });

            it("inferred project watch options in host configuration", () => {
                const host = setupInferredProject(/*configureHost*/ true);
                checkWatchedFilesDetailed(
                    host,
                    [libFile.path, `${tscWatch.projectRoot}/tsconfig.json`, `${tscWatch.projectRoot}/jsconfig.json`, `${tscWatch.projectRoot}/src/tsconfig.json`, `${tscWatch.projectRoot}/src/jsconfig.json`],
                    1
                );
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(
                    host,
                    [`${tscWatch.projectRoot}/src`],
                    1,
                    /*recursive*/ true,
                );
            });

            it("inferred project watch options errors", () => {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host, {}, { useInferredProjectPerProjectRoot: true });
                service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["**/../*"] }, tscWatch.projectRoot);
                service.openClientFile(main.path, main.content, ScriptKind.TS, tscWatch.projectRoot);
                const project = service.inferredProjects[0];
                assert.deepEqual(project.getAllProjectErrors(), [
                    {
                        messageText: `File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.`,
                        category: Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.category,
                        code: Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.code,
                        file: undefined,
                        start: undefined,
                        length: undefined,
                        reportsDeprecated: undefined,
                        reportsUnnecessary: undefined,
                    }
                ]);
            });
        });
    });

    describe("unittests:: tsserver:: watchEnvironment:: file names on case insensitive file system", () => {
        function verifyFileNames(projectRoot: string, projectRootPath: string) {
            const keyMapper = (str: string) => str.replace(projectRoot, projectRootPath);
            const file: File = {
                path: `${projectRoot}/foo.ts`,
                content: `import { foo } from "bar"`
            };
            const host = createServerHost([file, libFile]);
            const service = createProjectService(host);
            service.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRoot);
            const expectedWatchFiles = [libFile.path, `${projectRoot}/tsconfig.json`, `${projectRoot}/jsconfig.json`];
            checkWatchedFilesDetailed(
                host,
                expectedWatchFiles.map(keyMapper),
                1,
                arrayToMap(
                    expectedWatchFiles,
                    keyMapper,
                    fileName => [{
                        fileName,
                        pollingInterval: PollingInterval.Low
                    }]
                )
            );
            checkWatchedDirectories(host, [], /*recursive*/ false);
            const expectedWatchedDirectories = [`${projectRoot}/node_modules`, `${projectRoot}/node_modules/@types`];
            checkWatchedDirectoriesDetailed(
                host,
                expectedWatchedDirectories.map(keyMapper),
                1,
                /*recursive*/ true,
                arrayToMap(
                    expectedWatchedDirectories,
                    keyMapper,
                    directoryName => [{
                        directoryName,
                        fallbackPollingInterval: PollingInterval.Medium,
                        fallbackOptions: { watchFile: WatchFileKind.PriorityPollingInterval }
                    }]
                )
            );
        }

        it("project with ascii file names", () => {
            verifyFileNames("/User/userName/Projects/I", "/user/username/projects/i");
        });

        it("project with ascii file names with i", () => {
            verifyFileNames("/User/userName/Projects/i", "/user/username/projects/i");
        });

        it("project with unicode file names", () => {
            verifyFileNames("/User/userName/Projects/İ", "/user/username/projects/İ");
        });
    });
}

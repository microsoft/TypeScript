namespace ts.projectSystem {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;
    function serializeHostWatchesIntoLogger(host: TestServerHost, logger: Logger) {
        const baselines: string[] = [];
        host.serializeWatches(baselines);
        baselines.forEach(s => logger.info(s));
    }

    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
        function verifyCompletionListWithNewFileInSubFolder(scenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
            it(scenario, () => {
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
                const completionPosition = index.content.lastIndexOf('"');
                const environmentVariables = new Map<string, string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                const host = createServerHost(files, { environmentVariables });
                const logger = createLoggerWithInMemoryLogs();
                const projectService = createProjectService(host, { logger });
                projectService.openClientFile(index.path);

                const project = Debug.checkDefined(projectService.configuredProjects.get(configFile.path));
                verifyProjectAndCompletions();

                // Add file2
                const file2: File = {
                    path: `${projectSrcFolder}/file2.ts`,
                    content: ""
                };
                host.writeFile(file2.path, file2.content);
                host.runQueuedTimeoutCallbacks();
                assert.equal(projectService.configuredProjects.get(configFile.path), project);
                verifyProjectAndCompletions();
                baselineTsserverLogs("watchEnvironment", scenario, projectService);

                function verifyProjectAndCompletions() {
                    const completions = project.getLanguageService().getCompletionsAtPosition(index.path, completionPosition, { includeExternalModuleExports: false, includeInsertTextCompletions: false })!;
                    logger.info(`Completion Entries:: ${JSON.stringify(completions.entries.map(e => e.name))}`);
                    serializeHostWatchesIntoLogger(host, logger);
                }
            });
        }

        verifyCompletionListWithNewFileInSubFolder(
            "uses watchFile when file is added to subfolder",
            Tsc_WatchDirectory.WatchFile
        );
        verifyCompletionListWithNewFileInSubFolder(
            "uses non recursive watchDirectory when file is added to subfolder",
            Tsc_WatchDirectory.NonRecursiveWatchDirectory
        );
        verifyCompletionListWithNewFileInSubFolder(
            "uses dynamic polling when file is added to subfolder",
            Tsc_WatchDirectory.DynamicPolling
        );
    });

    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
        function verifyWatchedDirectories(scenario: string, rootedPath: string, useProjectAtRoot: boolean) {
            it(scenario, () => {
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
                const logger = createLoggerWithInMemoryLogs();
                const projectService = createProjectService(host, { logger });
                projectService.openClientFile(file1.path);
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", scenario, projectService);
            });
        }

        verifyWatchedDirectories("files at windows style root", "c:/", /*useProjectAtRoot*/ true);
        verifyWatchedDirectories("files not at windows style root", "c:/", /*useProjectAtRoot*/ false);
        verifyWatchedDirectories("files at root", "c:/", /*useProjectAtRoot*/ true);
        verifyWatchedDirectories("files not at root", "c:/", /*useProjectAtRoot*/ false);
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
        const environmentVariables = new Map<string, string>();
        environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
        const host = createServerHost([index, file1, configFile, libFile, nodeModulesExistingUnusedFile], { environmentVariables });
        const logger = createLoggerWithInMemoryLogs();
        const projectService = createProjectService(host, { logger });
        projectService.openClientFile(index.path);

        serializeHostWatchesIntoLogger(host, logger);
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
            serializeHostWatchesIntoLogger(host, logger);
        });

        serializeHostWatchesIntoLogger(host, logger);
        baselineTsserverLogs("watchEnvironment", `recursive directory does not watch files starting with dot in node_modules`, projectService);
    });

    it("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
        const logger = createLoggerWithInMemoryLogs();
        verifyFilePathStyle("c:/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js", logger);
        verifyFilePathStyle("c:/users/username/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js", logger);
        baselineTsserverLogs("watchEnvironment", `watching files with network style paths`, { logger });

        function verifyFilePathStyle(path: string, logger: Logger) {
            logger.info(`For files of style ${path}`);
            const windowsStyleRoot = path.substring(0, getRootLength(path));
            const host = createServerHost(
                [libFile, { path, content: "const x = 10" }],
                { windowsStyleRoot }
            );
            const service = createProjectService(host, { logger });
            service.openClientFile(path);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            serializeHostWatchesIntoLogger(host, logger);
        }
    });

    describe("unittests:: tsserver:: watchEnvironment:: handles watch compiler options", () => {
        it("with watchFile option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1));
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        watchFile: protocol.WatchFileKind.UseFsEvents
                    }
                }
            });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with watchFile option as host configuration`, session);
        });

        it("with watchDirectory option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        watchDirectory: protocol.WatchDirectoryKind.UseFsEvents
                    }
                }
            });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with watchDirectory option as host configuration`, session);
        });

        it("with fallbackPolling option as host configuration", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const files = [libFile, commonFile2, configFile];
            const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        fallbackPolling: protocol.PollingWatchKind.PriorityInterval
                    }
                }
            });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with fallbackPolling option as host configuration`, session);
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
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with watchFile option in configFile`, session);
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
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with watchDirectory option in configFile`, session);
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
            const logger = createLoggerWithInMemoryLogs();
            const session = createSession(host, { logger });
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        fallbackPolling: protocol.PollingWatchKind.PriorityInterval
                    }
                }
            });
            openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
            serializeHostWatchesIntoLogger(host, logger);
            baselineTsserverLogs("watchEnvironment", `with fallbackPolling option in configFile`, session);
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
                const logger = createLoggerWithInMemoryLogs();
                const service = createProjectService(host, { logger });
                setupConfigureHost(service, configureHost);
                service.openClientFile(main.path);
                return { host, service, logger };
            }

            it("with excludeDirectories option in configFile", () => {
                const { host, service, logger } = setup();
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configFile`, service);
            });

            it("with excludeDirectories option in configuration", () => {
                const { host, service, logger } = setup(/*configureHost*/ true);
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configuration`, service);
            });

            function setupExternalProject(configureHost?: boolean) {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const logger = createLoggerWithInMemoryLogs();
                const service = createProjectService(host, { logger });
                setupConfigureHost(service, configureHost);
                service.openExternalProject({
                    projectFileName: `${tscWatch.projectRoot}/project.csproj`,
                    rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                    options: { excludeDirectories: ["node_modules"] }
                } as protocol.ExternalProject);
                service.openClientFile(main.path);
                return { host, service, logger };
            }

            it("external project watch options", () => {
                const { host, service, logger } = setupExternalProject();
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `external project watch options`, service);
            });

            it("external project watch options in host configuration", () => {
                const { host, service, logger } = setupExternalProject(/*configureHost*/ true);
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `external project watch options in host configuration`, service);
            });

            it("external project watch options errors", () => {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host);
                service.openExternalProject({
                    projectFileName: `${tscWatch.projectRoot}/project.csproj`,
                    rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                    options: { excludeDirectories: ["**/../*"] }
                } as protocol.ExternalProject);
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
                const logger = createLoggerWithInMemoryLogs();
                const service = createProjectService(host, { useInferredProjectPerProjectRoot: true, logger });
                setupConfigureHost(service, configureHost);
                service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["node_modules"] }, tscWatch.projectRoot);
                service.openClientFile(main.path, main.content, ScriptKind.TS, tscWatch.projectRoot);
                return { host, service, logger };
            }

            it("inferred project watch options", () => {
                const { host, service, logger } = setupInferredProject();
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `inferred project watch options`, service);
            });

            it("inferred project watch options in host configuration", () => {
                const { host, service, logger } = setupInferredProject(/*configureHost*/ true);
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", `inferred project watch options in host configuration`, service);
            });

            it("inferred project watch options errors", () => {
                const { main, bar, foo } = setupFiles();
                const files = [libFile, main, bar, foo];
                const host = createServerHost(files, { currentDirectory: tscWatch.projectRoot });
                const service = createProjectService(host, { useInferredProjectPerProjectRoot: true });
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
        function verifyFileNames(scenario: string, projectRoot: string) {
            it(scenario, () => {
                const file: File = {
                    path: `${projectRoot}/foo.ts`,
                    content: `import { foo } from "bar"`
                };
                const host = createServerHost([file, libFile]);
                const logger = createLoggerWithInMemoryLogs();
                const service = createProjectService(host, { logger });
                service.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRoot);
                serializeHostWatchesIntoLogger(host, logger);
                baselineTsserverLogs("watchEnvironment", scenario, service);
            });
        }

        verifyFileNames("project with ascii file names", "/User/userName/Projects/I");
        verifyFileNames("project with ascii file names with i", "/User/userName/Projects/i");
        verifyFileNames("project with unicode file names", "/User/userName/Projects/İ");
    });

    describe("unittests:: tsserver:: watchEnvironment:: watchFile is single watcher per file", () => {
        function verifyWatchFile(scenario: string, environmentVariables?: ESMap<string, string>) {
            it(scenario, () => {
                const config: File = {
                    path: `${tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            resolveJsonModule: true,
                        },
                    })
                };
                const index: File = {
                    path: `${tscWatch.projectRoot}/index.ts`,
                    content: `import * as tsconfig from "./tsconfig.json";`
                };
                const host = createServerHost([config, index, libFile], { environmentVariables });
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([index], session);
                host.serializeWatches().forEach(b => session.logger.info(b));
                baselineTsserverLogs("watchEnvironment", scenario, session);
            });
        }

        verifyWatchFile("when watchFile can create multiple watchers per file");
        verifyWatchFile(
            "when watchFile is single watcher per file",
            arrayToMap(["TSC_WATCHFILE"], identity, () => TestFSWithWatch.Tsc_WatchFile.SingleFileWatcherPerName)
        );
    });
}

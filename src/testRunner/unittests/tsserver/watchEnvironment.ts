import * as ts from "../../_namespaces/ts";

import Tsc_WatchDirectory = ts.TestFSWithWatch.Tsc_WatchDirectory;
describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
    function verifyCompletionListWithNewFileInSubFolder(scenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
        it(scenario, () => {
            const projectFolder = "/a/username/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: ts.projectSystem.File = {
                path: `${projectFolder}/tsconfig.json`,
                content: JSON.stringify({
                    watchOptions: {
                        synchronousWatchDirectory: true
                    }
                })
            };
            const index: ts.projectSystem.File = {
                path: `${projectSrcFolder}/index.ts`,
                content: `import {} from "./"`
            };
            const file1: ts.projectSystem.File = {
                path: `${projectSrcFolder}/file1.ts`,
                content: ""
            };

            const files = [index, file1, configFile, ts.projectSystem.libFile];
            const environmentVariables = new ts.Map<string, string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = ts.projectSystem.createServerHost(files, { environmentVariables });
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            ts.projectSystem.openFilesForSession([index], session);
            session.executeCommandSeq<ts.projectSystem.protocol.CompletionsRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompletionInfo,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });

            // Add file2
            const file2: ts.projectSystem.File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: ""
            };
            host.writeFile(file2.path, file2.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.projectSystem.protocol.CompletionsRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompletionInfo,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", scenario, session);
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
            const configFile: ts.projectSystem.File = {
                path: root + "project/tsconfig.json",
                content: "{}"
            };
            const file1: ts.projectSystem.File = {
                path: root + "project/file1.ts",
                content: "let x = 10;"
            };
            const file2: ts.projectSystem.File = {
                path: root + "project/file2.ts",
                content: "let y = 10;"
            };
            const files = [configFile, file1, file2, ts.projectSystem.libFile];
            const host = ts.projectSystem.createServerHost(files, { windowsStyleRoot: "c:/" });
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            ts.projectSystem.openFilesForSession([file1], session);
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", scenario, session);
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
    const configFile: ts.projectSystem.File = {
        path: `${projectFolder}/tsconfig.json`,
        content: "{}"
    };
    const index: ts.projectSystem.File = {
        path: `${projectSrcFolder}/index.ts`,
        content: `import {} from "file"`
    };
    const file1: ts.projectSystem.File = {
        path: `${projectSrcFolder}/file1.ts`,
        content: ""
    };
    const nodeModulesExistingUnusedFile: ts.projectSystem.File = {
        path: `${projectFolder}/node_modules/someFile.d.ts`,
        content: ""
    };
    const environmentVariables = new ts.Map<string, string>();
    environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
    const host = ts.projectSystem.createServerHost([index, file1, configFile, ts.projectSystem.libFile, nodeModulesExistingUnusedFile], { environmentVariables });
    const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
    ts.projectSystem.openFilesForSession([index], session);

    const nodeModulesIgnoredFileFromIgnoreDirectory: ts.projectSystem.File = {
        path: `${projectFolder}/node_modules/.cache/someFile.d.ts`,
        content: ""
    };

    const nodeModulesIgnoredFile: ts.projectSystem.File = {
        path: `${projectFolder}/node_modules/.cacheFile.ts`,
        content: ""
    };

    const gitIgnoredFileFromIgnoreDirectory: ts.projectSystem.File = {
        path: `${projectFolder}/.git/someFile.d.ts`,
        content: ""
    };

    const gitIgnoredFile: ts.projectSystem.File = {
        path: `${projectFolder}/.gitCache.d.ts`,
        content: ""
    };
    const emacsIgnoredFileFromIgnoreDirectory: ts.projectSystem.File = {
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
    });

    ts.projectSystem.baselineTsserverLogs("watchEnvironment", `recursive directory does not watch files starting with dot in node_modules`, session);
});

it("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
    const logger = ts.projectSystem.createLoggerWithInMemoryLogs(/*host*/ undefined!); // Special handling to ensure same logger is used
    verifyFilePathStyle("c:/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js", logger);
    verifyFilePathStyle("c:/users/username/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js", logger);
    ts.projectSystem.baselineTsserverLogs("watchEnvironment", `watching files with network style paths`, { logger });

    function verifyFilePathStyle(path: string, logger: ts.projectSystem.Logger) {
        const windowsStyleRoot = path.substring(0, ts.getRootLength(path));
        const file: ts.projectSystem.File = { path, content: "const x = 10" };
        const host = ts.projectSystem.createServerHost(
            [ts.projectSystem.libFile, file],
            { windowsStyleRoot }
        );
        logger.host = host;
        logger.info(`For files of style ${path}`);
        const session = ts.projectSystem.createSession(host, { logger });
        ts.projectSystem.openFilesForSession([file], session);
    }
});

describe("unittests:: tsserver:: watchEnvironment:: handles watch compiler options", () => {
    it("with watchFile option as host configuration", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1));
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchFile: ts.projectSystem.protocol.WatchFileKind.UseFsEvents
                }
            }
        });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with watchFile option as host configuration`, session);
    });

    it("with watchDirectory option as host configuration", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1), { runWithoutRecursiveWatches: true });
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchDirectory: ts.projectSystem.protocol.WatchDirectoryKind.UseFsEvents
                }
            }
        });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with watchDirectory option as host configuration`, session);
    });

    it("with fallbackPolling option as host configuration", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.projectSystem.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with fallbackPolling option as host configuration`, session);
    });

    it("with watchFile option in configFile", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    watchFile: "UseFsEvents"
                }
            })
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1));
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with watchFile option in configFile`, session);
    });

    it("with watchDirectory option in configFile", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    watchDirectory: "UseFsEvents"
                }
            })
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1), { runWithoutRecursiveWatches: true });
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with watchDirectory option in configFile`, session);
    });

    it("with fallbackPolling option in configFile", () => {
        const configFile: ts.projectSystem.File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                watchOptions: {
                    fallbackPolling: "PriorityInterval"
                }
            })
        };
        const files = [ts.projectSystem.libFile, ts.projectSystem.commonFile2, configFile];
        const host = ts.projectSystem.createServerHost(files.concat(ts.projectSystem.commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
        const logger = ts.projectSystem.createLoggerWithInMemoryLogs(host);
        const session = ts.projectSystem.createSession(host, { logger });
        session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.projectSystem.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        ts.projectSystem.openFilesForSession([{ file: ts.projectSystem.commonFile1, projectRootPath: "/a/b" }], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with fallbackPolling option in configFile`, session);
    });

    describe("excludeDirectories", () => {
        function setupFiles() {
            const main: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/main.ts`,
                content: `import { foo } from "bar"; foo();`
            };
            const bar: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/node_modules/bar/index.d.ts`,
                content: `export { foo } from "./foo";`
            };
            const foo: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/node_modules/bar/foo.d.ts`,
                content: `export function foo(): string;`
            };
            return { main, bar, foo };
        }

        function setupConfigureHost(session: ts.projectSystem.TestSession, configureHost: boolean | undefined) {
            if (configureHost) {
                session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
                    command: ts.projectSystem.protocol.CommandTypes.Configure,
                    arguments: {
                        watchOptions: { excludeDirectories: ["node_modules"] }
                    }
                });
            }
        }
        function setup(configureHost?: boolean) {
            const configFile: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ include: ["src"], watchOptions: { excludeDirectories: ["node_modules"] } })
            };
            const { main, bar, foo } = setupFiles();
            const files = [ts.projectSystem.libFile, main, bar, foo, configFile];
            const host = ts.projectSystem.createServerHost(files, { currentDirectory: ts.tscWatch.projectRoot });
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            ts.projectSystem.openFilesForSession([main], session);
            return session;
        }

        it("with excludeDirectories option in configFile", () => {
            const session = setup();
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configFile`, session);
        });

        it("with excludeDirectories option in configuration", () => {
            const session = setup(/*configureHost*/ true);
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configuration`, session);
        });

        function setupExternalProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [ts.projectSystem.libFile, main, bar, foo];
            const host = ts.projectSystem.createServerHost(files, { currentDirectory: ts.tscWatch.projectRoot });
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            session.executeCommandSeq<ts.projectSystem.protocol.OpenExternalProjectRequest>({
                command: ts.projectSystem.protocol.CommandTypes.OpenExternalProject,
                arguments: {
                    projectFileName: `${ts.tscWatch.projectRoot}/project.csproj`,
                    rootFiles: ts.projectSystem.toExternalFiles([main.path, bar.path, foo.path]),
                    options: { excludeDirectories: ["node_modules"] }
                }
            });
            ts.projectSystem.openFilesForSession([main], session);
            return session;
        }

        it("external project watch options", () => {
            const session = setupExternalProject();
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `external project watch options`, session);
        });

        it("external project watch options in host configuration", () => {
            const session = setupExternalProject(/*configureHost*/ true);
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `external project watch options in host configuration`, session);
        });

        it("external project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [ts.projectSystem.libFile, main, bar, foo];
            const host = ts.projectSystem.createServerHost(files, { currentDirectory: ts.tscWatch.projectRoot });
            const service = ts.projectSystem.createProjectService(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            service.openExternalProject({
                projectFileName: `${ts.tscWatch.projectRoot}/project.csproj`,
                rootFiles: ts.projectSystem.toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["**/../*"] }
            } as ts.projectSystem.protocol.ExternalProject);
            service.openClientFile(main.path);
            const project = service.externalProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `external project watch options errors`, service);
        });

        function setupInferredProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [ts.projectSystem.libFile, main, bar, foo];
            const host = ts.projectSystem.createServerHost(files, { currentDirectory: ts.tscWatch.projectRoot });
            const session = ts.projectSystem.createSession(host, { useInferredProjectPerProjectRoot: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            session.executeCommandSeq<ts.projectSystem.protocol.SetCompilerOptionsForInferredProjectsRequest>({
                command: ts.projectSystem.protocol.CommandTypes.CompilerOptionsForInferredProjects,
                arguments: {
                    options: { excludeDirectories: ["node_modules"] },
                    projectRootPath: ts.tscWatch.projectRoot
                }
            });
            ts.projectSystem.openFilesForSession([{ file: main, projectRootPath: ts.tscWatch.projectRoot }], session);
            return session;
        }

        it("inferred project watch options", () => {
            const session = setupInferredProject();
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `inferred project watch options`, session);
        });

        it("inferred project watch options in host configuration", () => {
            const session = setupInferredProject(/*configureHost*/ true);
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `inferred project watch options in host configuration`, session);
        });

        it("inferred project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [ts.projectSystem.libFile, main, bar, foo];
            const host = ts.projectSystem.createServerHost(files, { currentDirectory: ts.tscWatch.projectRoot });
            const service = ts.projectSystem.createProjectService(host, { useInferredProjectPerProjectRoot: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["**/../*"] }, ts.tscWatch.projectRoot);
            service.openClientFile(main.path, main.content, ts.ScriptKind.TS, ts.tscWatch.projectRoot);
            const project = service.inferredProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", `inferred project watch options errors`, service);
        });
    });
});

describe("unittests:: tsserver:: watchEnvironment:: file names on case insensitive file system", () => {
    function verifyFileNames(scenario: string, projectRootPath: string) {
        it(scenario, () => {
            const file: ts.projectSystem.File = {
                path: `${projectRootPath}/foo.ts`,
                content: `import { foo } from "bar"`
            };
            const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile]);
            const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            ts.projectSystem.openFilesForSession([{ file, projectRootPath }], session);
            ts.projectSystem.baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyFileNames("project with ascii file names", "/User/userName/Projects/I");
    verifyFileNames("project with ascii file names with i", "/User/userName/Projects/i");
    verifyFileNames("project with unicode file names", "/User/userName/Projects/İ");
});

describe("unittests:: tsserver:: watchEnvironment:: watchFile is single watcher per file", () => {
    it("when watchFile is single watcher per file", () => {
        const config: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    composite: true,
                    resolveJsonModule: true,
                },
            })
        };
        const index: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/index.ts`,
            content: `import * as tsconfig from "./tsconfig.json";`
        };
        const host = ts.projectSystem.createServerHost([config, index, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([index], session);
        ts.projectSystem.baselineTsserverLogs("watchEnvironment", "when watchFile is single watcher per file", session);
    });
});

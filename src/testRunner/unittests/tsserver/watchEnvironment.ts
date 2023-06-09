import {
    createLoggerWithInMemoryLogs,
    Logger,
} from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    commonFile1,
    commonFile2,
} from "../helpers/tscWatch";
import {
    baselineTsserverLogs,
    createProjectService,
    createSession,
    openExternalProjectForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    toExternalFiles,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    Tsc_WatchDirectory,
} from "../helpers/virtualFileSystemWithWatch";

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
            const environmentVariables = new Map<string, string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = createServerHost(files, { environmentVariables });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([index], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });

            // Add file2
            const file2: File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: ""
            };
            host.writeFile(file2.path, file2.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 })
            });
            baselineTsserverLogs("watchEnvironment", scenario, session);
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
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([file1], session);
            baselineTsserverLogs("watchEnvironment", scenario, session);
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
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    openFilesForSession([index], session);

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
        session.testhost.logTimeoutQueueLength();
    });

    baselineTsserverLogs("watchEnvironment", `recursive directory does not watch files starting with dot in node_modules`, session);
});

it("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
    const logger = createLoggerWithInMemoryLogs(/*host*/ undefined!); // Special handling to ensure same logger is used
    verifyFilePathStyle("c:/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js", logger);
    verifyFilePathStyle("c:/users/username/myprojects/project/x.js", logger);
    verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js", logger);
    baselineTsserverLogs("watchEnvironment", `watching files with network style paths`, { logger });

    function verifyFilePathStyle(path: string, logger: Logger) {
        const windowsStyleRoot = path.substring(0, ts.getRootLength(path));
        const file: File = { path, content: "const x = 10" };
        const host = createServerHost(
            [libFile, file],
            { windowsStyleRoot }
        );
        logger.host = host;
        logger.info(`For files of style ${path}`);
        logger.log(`currentDirectory:: ${host.getCurrentDirectory()} useCaseSensitiveFileNames: ${host.useCaseSensitiveFileNames}`);
        const session = createSession(host, { logger });
        openFilesForSession([file], session);
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
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchFile: ts.server.protocol.WatchFileKind.UseFsEvents
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchFile option as host configuration`, session);
    });

    it("with watchDirectory option as host configuration", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchDirectory: ts.server.protocol.WatchDirectoryKind.UseFsEvents
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchDirectory option as host configuration`, session);
    });

    it("with fallbackPolling option as host configuration", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const files = [libFile, commonFile2, configFile];
        const host = createServerHost(files.concat(commonFile1), { runWithoutRecursiveWatches: true, runWithFallbackPolling: true });
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
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
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
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
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
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
        const logger = createLoggerWithInMemoryLogs(host);
        const session = createSession(host, { logger });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval
                }
            }
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with fallbackPolling option in configFile`, session);
    });

    describe("excludeDirectories", () => {
        function setupFiles() {
            const main: File = {
                path: `/user/username/projects/myproject/src/main.ts`,
                content: `import { foo } from "bar"; foo();`
            };
            const bar: File = {
                path: `/user/username/projects/myproject/node_modules/bar/index.d.ts`,
                content: `export { foo } from "./foo";`
            };
            const foo: File = {
                path: `/user/username/projects/myproject/node_modules/bar/foo.d.ts`,
                content: `export function foo(): string;`
            };
            return { main, bar, foo };
        }

        function setupConfigureHost(session: TestSession, configureHost: boolean | undefined) {
            if (configureHost) {
                session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                    command: ts.server.protocol.CommandTypes.Configure,
                    arguments: {
                        watchOptions: { excludeDirectories: ["node_modules"] }
                    }
                });
            }
        }
        function setup(configureHost?: boolean) {
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({ include: ["src"], watchOptions: { excludeDirectories: ["node_modules"] } })
            };
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo, configFile];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            openFilesForSession([main], session);
            return session;
        }

        it("with excludeDirectories option in configFile", () => {
            const session = setup();
            baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configFile`, session);
        });

        it("with excludeDirectories option in configuration", () => {
            const session = setup(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `with excludeDirectories option in configuration`, session);
        });

        function setupExternalProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            openExternalProjectForSession({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["node_modules"] }
            }, session);
            openFilesForSession([main], session);
            return session;
        }

        it("external project watch options", () => {
            const session = setupExternalProject();
            baselineTsserverLogs("watchEnvironment", `external project watch options`, session);
        });

        it("external project watch options in host configuration", () => {
            const session = setupExternalProject(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `external project watch options in host configuration`, session);
        });

        it("external project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            service.openExternalProject({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["**/../*"] }
            } as ts.server.protocol.ExternalProject);
            service.openClientFile(main.path);
            const project = service.externalProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            baselineTsserverLogs("watchEnvironment", `external project watch options errors`, service);
        });

        function setupInferredProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const session = createSession(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            setupConfigureHost(session, configureHost);
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: { excludeDirectories: ["node_modules"] },
                projectRootPath: "/user/username/projects/myproject"
            }, session);
            openFilesForSession([{ file: main, projectRootPath: "/user/username/projects/myproject" }], session);
            return session;
        }

        it("inferred project watch options", () => {
            const session = setupInferredProject();
            baselineTsserverLogs("watchEnvironment", `inferred project watch options`, session);
        });

        it("inferred project watch options in host configuration", () => {
            const session = setupInferredProject(/*configureHost*/ true);
            baselineTsserverLogs("watchEnvironment", `inferred project watch options in host configuration`, session);
        });

        it("inferred project watch options errors", () => {
            const { main, bar, foo } = setupFiles();
            const files = [libFile, main, bar, foo];
            const host = createServerHost(files, { currentDirectory: "/user/username/projects/myproject" });
            const service = createProjectService(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["**/../*"] }, "/user/username/projects/myproject");
            service.openClientFile(main.path, main.content, ts.ScriptKind.TS, "/user/username/projects/myproject");
            const project = service.inferredProjects[0];
            service.logger.info(JSON.stringify(project.getAllProjectErrors(), undefined, 2));
            baselineTsserverLogs("watchEnvironment", `inferred project watch options errors`, service);
        });
    });
});

describe("unittests:: tsserver:: watchEnvironment:: file names on case insensitive file system", () => {
    function verifyFileNames(scenario: string, projectRootPath: string) {
        it(scenario, () => {
            const file: File = {
                path: `${projectRootPath}/foo.ts`,
                content: `import { foo } from "bar"`
            };
            const host = createServerHost([file, libFile]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([{ file, projectRootPath }], session);
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyFileNames("project with ascii file names", "/User/userName/Projects/I");
    verifyFileNames("project with ascii file names with i", "/User/userName/Projects/i");
    verifyFileNames("project with unicode file names", "/User/userName/Projects/İ");
});

describe("unittests:: tsserver:: watchEnvironment:: watchFile is single watcher per file", () => {
    it("when watchFile is single watcher per file", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    composite: true,
                    resolveJsonModule: true,
                },
            })
        };
        const index: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: `import * as tsconfig from "./tsconfig.json";`
        };
        const host = createServerHost([config, index, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([index], session);
        baselineTsserverLogs("watchEnvironment", "when watchFile is single watcher per file", session);
    });
});

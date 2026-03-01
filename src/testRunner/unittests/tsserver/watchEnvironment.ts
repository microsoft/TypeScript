import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../harness/tsserverLogger.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    toExternalFiles,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
    TestServerHostOsFlavor,
    Tsc_WatchDirectory,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
    function verifyCompletionListWithNewFileInSubFolder(scenario: string, tscWatchDirectory: Tsc_WatchDirectory) {
        it(scenario, () => {
            const projectFolder = "/a/username/workspace/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: File = {
                path: `${projectFolder}/tsconfig.json`,
                content: jsonToReadableText({
                    watchOptions: {
                        synchronousWatchDirectory: true,
                    },
                }),
            };
            const index: File = {
                path: `${projectSrcFolder}/index.ts`,
                content: `import {} from "./"`,
            };
            const file1: File = {
                path: `${projectSrcFolder}/file1.ts`,
                content: "",
            };

            const files = [index, file1, configFile];
            const environmentVariables = new Map<string, string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = TestServerHost.createServerHost(files, { osFlavor: TestServerHostOsFlavor.Linux, environmentVariables });
            const session = new TestSession(host);
            openFilesForSession([index], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 }),
            });

            // Add file2
            const file2: File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: "",
            };
            host.writeFile(file2.path, file2.content);
            host.runQueuedTimeoutCallbacks();
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: protocolFileLocationFromSubstring(index, '"', { index: 1 }),
            });
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyCompletionListWithNewFileInSubFolder(
        "uses watchFile when file is added to subfolder",
        Tsc_WatchDirectory.WatchFile,
    );
    verifyCompletionListWithNewFileInSubFolder(
        "uses non recursive watchDirectory when file is added to subfolder",
        Tsc_WatchDirectory.NonRecursiveWatchDirectory,
    );
    verifyCompletionListWithNewFileInSubFolder(
        "uses dynamic polling when file is added to subfolder",
        Tsc_WatchDirectory.DynamicPolling,
    );
});

describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
    function verifyWatchedDirectories(scenario: string, rootedPath: string, useProjectAtRoot: boolean, watchableExempt?: boolean) {
        it(scenario, () => {
            const root = useProjectAtRoot ? rootedPath : `${rootedPath}myfolder/allproject/`;
            const configFile: File = {
                path: root + "project/tsconfig.json",
                content: "{}",
                watchableExempt,
            };
            const file1: File = {
                path: root + "project/file1.ts",
                content: "let x = 10;",
                watchableExempt,
            };
            const file2: File = {
                path: root + "project/file2.ts",
                content: "let y = 10;",
                watchableExempt,
            };
            const files = [configFile, file1, file2];
            const host = TestServerHost.createServerHost(files, { windowsStyleRoot: "c:/" });
            const session = new TestSession(host);
            openFilesForSession([file1], session);
            baselineTsserverLogs("watchEnvironment", scenario, session);
        });
    }

    verifyWatchedDirectories("files at windows style root", "c:/", /*useProjectAtRoot*/ true, /*watchableExempt*/ true);
    verifyWatchedDirectories("files not at windows style root", "c:/", /*useProjectAtRoot*/ false);
    verifyWatchedDirectories("files at root", "c:/workspaces/", /*useProjectAtRoot*/ true);
    verifyWatchedDirectories("files not at root", "c:/workspaces/", /*useProjectAtRoot*/ false);
});

describe("unittests:: tsserver:: watchEnvironment:: recursiveWatchDirectory", () => {
    it(`unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem recursive watch directory implementation does not watch files/directories in node_modules starting with "."`, () => {
        const projectFolder = "/a/username/workspace/project";
        const projectSrcFolder = `${projectFolder}/src`;
        const configFile: File = {
            path: `${projectFolder}/tsconfig.json`,
            content: "{}",
        };
        const index: File = {
            path: `${projectSrcFolder}/index.ts`,
            content: `import {} from "file"`,
        };
        const file1: File = {
            path: `${projectSrcFolder}/file1.ts`,
            content: "",
        };
        const nodeModulesExistingUnusedFile: File = {
            path: `${projectFolder}/node_modules/someFile.d.ts`,
            content: "",
        };
        const environmentVariables = new Map<string, string>();
        environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
        const host = TestServerHost.createServerHost(
            [index, file1, configFile, nodeModulesExistingUnusedFile],
            { osFlavor: TestServerHostOsFlavor.Linux, environmentVariables },
        );
        const session = new TestSession(host);
        openFilesForSession([index], session);

        const nodeModulesIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/node_modules/.cache/someFile.d.ts`,
            content: "",
        };

        const nodeModulesIgnoredFile: File = {
            path: `${projectFolder}/node_modules/.cacheFile.ts`,
            content: "",
        };

        const gitIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/.git/someFile.d.ts`,
            content: "",
        };

        const gitIgnoredFile: File = {
            path: `${projectFolder}/.gitCache.d.ts`,
            content: "",
        };
        const emacsIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/src/.#field.ts`,
            content: "",
        };

        [
            nodeModulesIgnoredFileFromIgnoreDirectory,
            nodeModulesIgnoredFile,
            gitIgnoredFileFromIgnoreDirectory,
            gitIgnoredFile,
            emacsIgnoredFileFromIgnoreDirectory,
        ].forEach(ignoredEntity => {
            host.ensureFileOrFolder(ignoredEntity);
            session.host.baselineHost("After writing ignored file or folder");
        });

        baselineTsserverLogs("watchEnvironment", `recursive directory does not watch files starting with dot in node_modules`, session);
    });
});

describe("unittests:: tsserver:: watchEnvironment:: networkStylePaths", () => {
    it("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watching files with network style paths", () => {
        const logger = createLoggerWithInMemoryLogs(/*host*/ undefined!); // Special handling to ensure same logger is used
        verifyFilePathStyle("c:/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/c$/myprojects/project/x.js", logger);
        verifyFilePathStyle("c:/users/username/myprojects/project/x.js", logger);
        verifyFilePathStyle("//vda1cs4850/c$/users/username/myprojects/project/x.js", logger);
        baselineTsserverLogs("watchEnvironment", `watching files with network style paths`, { logger });

        function verifyFilePathStyle(path: string, logger: LoggerWithInMemoryLogs) {
            const windowsStyleRoot = path.substring(0, ts.getRootLength(path));
            const file: File = { path, content: "const x = 10" };
            const host = TestServerHost.createServerHost(
                [file],
                { windowsStyleRoot },
            );
            logger.host = host;
            logger.info(`For files of style ${path}`);
            const session = new TestSession({ host, logger });
            openFilesForSession([file], session);
        }
    });
});

describe("unittests:: tsserver:: watchEnvironment:: handles watch compiler options", () => {
    it("with watchFile option as host configuration", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: "{}",
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1));
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchFile: ts.server.protocol.WatchFileKind.UseFsEvents,
                },
            },
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchFile option as host configuration`, session);
    });

    it("with watchDirectory option as host configuration", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: "{}",
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1), { osFlavor: TestServerHostOsFlavor.Linux });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    watchDirectory: ts.server.protocol.WatchDirectoryKind.UseFsEvents,
                },
            },
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchDirectory option as host configuration`, session);
    });

    it("with fallbackPolling option as host configuration", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: "{}",
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1), { osFlavor: TestServerHostOsFlavor.Linux, runWithFallbackPolling: true });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval,
                },
            },
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with fallbackPolling option as host configuration`, session);
    });

    it("with watchFile option in configFile", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                watchOptions: {
                    watchFile: "UseFsEvents",
                },
            }),
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1));
        const session = new TestSession(host);
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchFile option in configFile`, session);
    });

    it("with watchDirectory option in configFile", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                watchOptions: {
                    watchDirectory: "UseFsEvents",
                },
            }),
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1), { osFlavor: TestServerHostOsFlavor.Linux });
        const session = new TestSession(host);
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with watchDirectory option in configFile`, session);
    });

    it("with fallbackPolling option in configFile", () => {
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                watchOptions: {
                    fallbackPolling: "PriorityInterval",
                },
            }),
        };
        const files = [commonFile2, configFile];
        const host = TestServerHost.createServerHost(files.concat(commonFile1), { osFlavor: TestServerHostOsFlavor.Linux, runWithFallbackPolling: true });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                watchOptions: {
                    fallbackPolling: ts.server.protocol.PollingWatchKind.PriorityInterval,
                },
            },
        });
        openFilesForSession([{ file: commonFile1, projectRootPath: "/a/b" }], session);
        baselineTsserverLogs("watchEnvironment", `with fallbackPolling option in configFile`, session);
    });

    describe("excludeDirectories", () => {
        function setupFiles() {
            const main: File = {
                path: `/user/username/projects/myproject/src/main.ts`,
                content: `import { foo } from "bar"; foo();`,
            };
            const bar: File = {
                path: `/user/username/projects/myproject/node_modules/bar/index.d.ts`,
                content: `export { foo } from "./foo";`,
            };
            const foo: File = {
                path: `/user/username/projects/myproject/node_modules/bar/foo.d.ts`,
                content: `export function foo(): string;`,
            };
            return { main, bar, foo };
        }

        function setupConfigureHost(session: TestSession, configureHost: boolean | undefined) {
            if (configureHost) {
                session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                    command: ts.server.protocol.CommandTypes.Configure,
                    arguments: {
                        watchOptions: { excludeDirectories: ["node_modules"] },
                    },
                });
            }
        }
        function setup(configureHost?: boolean) {
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ include: ["src"], watchOptions: { excludeDirectories: ["node_modules"] } }),
            };
            const { main, bar, foo } = setupFiles();
            const files = [main, bar, foo, configFile];
            const host = TestServerHost.createServerHost(files);
            const session = new TestSession(host);
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
            const files = [main, bar, foo];
            const host = TestServerHost.createServerHost(files);
            const session = new TestSession(host);
            setupConfigureHost(session, configureHost);
            openExternalProjectForSession({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["node_modules"] },
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
            const files = [main, bar, foo];
            const host = TestServerHost.createServerHost(files);
            const session = new TestSession(host);
            openExternalProjectForSession({
                projectFileName: `/user/username/projects/myproject/project.csproj`,
                rootFiles: toExternalFiles([main.path, bar.path, foo.path]),
                options: { excludeDirectories: ["**/../*"] },
            }, session);
            openFilesForSession([main], session);
            const project = session.getProjectService().externalProjects[0];
            session.logger.info(jsonToReadableText(project.getAllProjectErrors()));
            baselineTsserverLogs("watchEnvironment", `external project watch options errors`, session);
        });

        function setupInferredProject(configureHost?: boolean) {
            const { main, bar, foo } = setupFiles();
            const files = [main, bar, foo];
            const host = TestServerHost.createServerHost(files);
            const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
            setupConfigureHost(session, configureHost);
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: { excludeDirectories: ["node_modules"] },
                projectRootPath: "/user/username/projects/myproject",
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
            const files = [main, bar, foo];
            const host = TestServerHost.createServerHost(files);
            const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: { excludeDirectories: ["**/../*"] },
                projectRootPath: "/user/username/projects/myproject",
            }, session);
            openFilesForSession([{ file: main.path, projectRootPath: "/user/username/projects/myproject" }], session);
            const project = session.getProjectService().inferredProjects[0];
            session.logger.info(jsonToReadableText(project.getAllProjectErrors()));
            baselineTsserverLogs("watchEnvironment", `inferred project watch options errors`, session);
        });
    });
});

describe("unittests:: tsserver:: watchEnvironment:: file names on case insensitive file system", () => {
    function verifyFileNames(scenario: string, projectRootPath: string) {
        it(scenario, () => {
            const file: File = {
                path: `${projectRootPath}/foo.ts`,
                content: `import { foo } from "bar"`,
            };
            const host = TestServerHost.createServerHost([file]);
            const session = new TestSession(host);
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
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    resolveJsonModule: true,
                },
            }),
        };
        const index: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: `import * as tsconfig from "./tsconfig.json";`,
        };
        const host = TestServerHost.createServerHost([config, index]);
        const session = new TestSession(host);
        openFilesForSession([index], session);
        baselineTsserverLogs("watchEnvironment", "when watchFile is single watcher per file", session);
    });
});

describe("unittests:: tsserver:: watchEnvironment:: watching at workspaces codespaces style", () => {
    it("watching npm install in codespaces where workspaces folder is hosted at root", () => {
        const config: File = {
            path: "/workspaces/somerepo/src/tsconfig.json",
            content: "{}",
        };
        const main: File = {
            path: "/workspaces/somerepo/src/main.ts",
            content: `import { randomSeed } from "random-seed";\nrandomSeed();`,
        };
        const randomSeed: File = {
            path: "/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts",
            content: `export function randomSeed(): string;`,
        };
        const host = TestServerHost.createServerHost([config, main, randomSeed], { osFlavor: TestServerHostOsFlavor.Linux });
        const session = new TestSession(host);
        openFilesForSession([main], session);
        verifyGetErrRequest({ session, files: [main] });
        // npm ci
        // clear part
        host.deleteFolder("/workspaces/somerepo/node_modules", /*recursive*/ true);
        verifyGetErrRequest({ session, files: [main], existingTimeouts: true });
        host.runQueuedTimeoutCallbacks();
        // Install part
        host.ensureFileOrFolder(randomSeed);
        verifyGetErrRequest({ session, files: [main], existingTimeouts: true });
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("watchEnvironment", "watching npm install in codespaces where workspaces folder is hosted at root", session);
    });
});

describe("unittests:: tsserver:: watchEnvironment:: perVolumeCasing", () => {
    it("new file addition", () => {
        const host = TestServerHost.createServerHost([]);
        // Make /Volumes case sensitive
        host.getCanonicalFileName = s => ts.startsWith(s, "/Volumes/") ? s : ts.toFileNameLowerCase(s);
        host.ensureFileOrFolder({ path: "/Volumes/git/projects/project/foo.ts", content: `export const foo = "foo";` });
        host.writeFile("/Volumes/git/projects/project/tsconfig.json", "{ }");
        host.writeFile("/Volumes/git/projects/project/package.json", jsonToReadableText({ name: "project", version: "1.0.0" }));
        const session = new TestSession(host);
        openFilesForSession(["/Volumes/git/projects/project/foo.ts"], session);
        host.writeFile("/Volumes/git/projects/project/Bar.ts", `export const bar = "bar";`);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("watchEnvironment", "perVolumeCasing and new file addition", session);
    });
});

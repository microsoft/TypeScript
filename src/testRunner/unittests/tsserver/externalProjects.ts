import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    logConfiguredProjectsHasOpenRefStatus,
    logInferredProjectsOrphanStatus,
    openExternalProjectForSession,
    openExternalProjectsForSession,
    openFilesForSession,
    TestSession,
    toExternalFile,
    toExternalFiles,
    verifyDynamic,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: externalProjects", () => {
    describe("can handle tsconfig file name with difference casing", () => {
        function verifyConfigFileCasing(lazyConfiguredProjectsFromExternalProject: boolean) {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1",
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: jsonToReadableText({
                    include: [],
                }),
            };

            const host = createServerHost([f1, config], { useCaseSensitiveFileNames: false });
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: {
                    preferences: { lazyConfiguredProjectsFromExternalProject },
                },
            });
            const upperCaseConfigFilePath = ts.combinePaths(ts.getDirectoryPath(config.path).toUpperCase(), ts.getBaseFileName(config.path));
            openExternalProjectForSession({
                projectFileName: "/a/b/project.csproj",
                rootFiles: toExternalFiles([f1.path, upperCaseConfigFilePath]),
                options: {},
            }, session);

            openFilesForSession([f1], session);
            baselineTsserverLogs("externalProjects", `can handle tsconfig file name with difference casing${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, session);
        }

        it("when lazyConfiguredProjectsFromExternalProject not set", () => {
            verifyConfigFileCasing(/*lazyConfiguredProjectsFromExternalProject*/ false);
        });

        it("when lazyConfiguredProjectsFromExternalProject is set", () => {
            verifyConfigFileCasing(/*lazyConfiguredProjectsFromExternalProject*/ true);
        });
    });

    it("load global plugins", () => {
        const f1 = {
            path: "/a/file1.ts",
            content: "let x = [1, 2];",
        };
        const p1 = { projectFileName: "/a/proj1.csproj", rootFiles: [toExternalFile(f1.path)], options: {} };

        const host = createServerHost([f1]);
        host.require = (_initialPath, moduleName) => {
            assert.equal(moduleName, "myplugin");
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = Harness.LanguageService.makeDefaultProxy(info);
                        proxy.getSemanticDiagnostics = filename => {
                            const prev = info.languageService.getSemanticDiagnostics(filename);
                            const sourceFile: ts.SourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                            prev.push({
                                category: ts.DiagnosticCategory.Warning,
                                file: sourceFile,
                                code: 9999,
                                length: 3,
                                messageText: `Plugin diagnostic`,
                                start: 0,
                            });
                            return prev;
                        };
                        return proxy;
                    },
                }),
                error: undefined,
            };
        };
        const session = new TestSession({ host, globalPlugins: ["myplugin"] });

        openExternalProjectsForSession([p1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: {
                file: f1.path,
                projectFileName: p1.projectFileName,
            },
        });
        baselineTsserverLogs("externalProjects", "load global plugins", session);
    });

    it("remove not-listed external projects", () => {
        const f1 = {
            path: "/a/app.ts",
            content: "let x = 1",
        };
        const f2 = {
            path: "/b/app.ts",
            content: "let x = 1",
        };
        const f3 = {
            path: "/c/app.ts",
            content: "let x = 1",
        };
        const makeProject = (f: File) => ({ projectFileName: f.path + ".csproj", rootFiles: [toExternalFile(f.path)], options: {} });
        const p1 = makeProject(f1);
        const p2 = makeProject(f2);
        const p3 = makeProject(f3);

        const host = createServerHost([f1, f2, f3]);
        const session = new TestSession(host);
        openExternalProjectsForSession([p1, p2], session);
        openExternalProjectsForSession([p1, p3], session);
        openExternalProjectsForSession([], session);
        openExternalProjectsForSession([p2], session);
        baselineTsserverLogs("externalProjects", "remove not-listed external projects", session);
    });

    it("should not close external project with no open files", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;",
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y =1;",
        };
        const projectFileName = "externalproject";
        const host = createServerHost([file1, file2]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([file1.path, file2.path]),
            options: {},
            projectFileName,
        }, session);
        // open client file - should not lead to creation of inferred project
        openFilesForSession([file1], session);
        // close client file - external project should still exists
        closeFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName },
        });
        baselineTsserverLogs("externalProjects", "should not close external project with no open files", session);
    });

    it("external project for dynamic file", () => {
        const projectFileName = "^ScriptDocument1 file1.ts";
        const externalFiles = toExternalFiles(["^ScriptDocument1 file1.ts"]);
        const host = createServerHost([]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: externalFiles,
            options: {},
            projectFileName,
        }, session);

        verifyDynamic(session, "/^scriptdocument1 file1.ts");

        externalFiles[0].content = "let x =1;";
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                openFiles: externalFiles,
            },
        });
        baselineTsserverLogs("externalProjects", "external project for dynamic file", session);
    });

    it("when file name starts with ^", () => {
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const x = 10;",
        };
        const app: File = {
            path: `/user/username/projects/myproject/^app.ts`,
            content: "const y = 10;",
        };
        const host = createServerHost([file, app, libFile]);
        const session = new TestSession(host);
        openExternalProjectsForSession([{
            projectFileName: `/user/username/projects/myproject/myproject.njsproj`,
            rootFiles: [
                toExternalFile(file.path),
                toExternalFile(app.path),
            ],
            options: {},
        }], session);
        baselineTsserverLogs("externalProjects", "when file name starts with caret", session);
    });

    it("external project that included config files", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;",
        };
        const config1 = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText(
                {
                    compilerOptions: {},
                    files: ["f1.ts"],
                },
            ),
        };
        const file2 = {
            path: "/a/c/f2.ts",
            content: "let y =1;",
        };
        const config2 = {
            path: "/a/c/tsconfig.json",
            content: jsonToReadableText(
                {
                    compilerOptions: {},
                    files: ["f2.ts"],
                },
            ),
        };
        const file3 = {
            path: "/a/d/f3.ts",
            content: "let z =1;",
        };
        const projectFileName = "externalproject";
        const host = createServerHost([file1, file2, file3, config1, config2]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([config1.path, config2.path, file3.path]),
            options: {},
            projectFileName,
        }, session);

        // open client file - should not lead to creation of inferred project
        openFilesForSession([file1], session);
        logInferredProjectsOrphanStatus(session);

        openFilesForSession([file3], session);
        logInferredProjectsOrphanStatus(session);

        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName },
        });
        logInferredProjectsOrphanStatus(session);
        // open file 'file1' from configured project keeps project alive

        closeFilesForSession([file3], session);
        logInferredProjectsOrphanStatus(session);

        closeFilesForSession([file1], session);
        logInferredProjectsOrphanStatus(session);

        openFilesForSession([file2], session);
        baselineTsserverLogs("externalProjects", "external project that included config files", session);
    });

    it("external project with included config file opened after configured project", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1",
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: {} }),
        };
        const projectFileName = "externalproject";
        const host = createServerHost([file1, configFile]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);

        openExternalProjectForSession({
            rootFiles: toExternalFiles([configFile.path]),
            options: {},
            projectFileName,
        }, session);

        closeFilesForSession([file1], session);
        // configured project is alive since it is opened as part of external project

        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName },
        });
        baselineTsserverLogs("externalProjects", "external project with included config file opened after configured project", session);
    });

    it("external project with included config file opened after configured project and then closed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1",
        };
        const file2 = {
            path: "/a/f2.ts",
            content: "let x = 1",
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: {} }),
        };
        const projectFileName = "externalproject";
        const host = createServerHost([file1, file2, libFile, configFile]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);

        openExternalProjectForSession({
            rootFiles: toExternalFiles([configFile.path]),
            options: {},
            projectFileName,
        }, session);

        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName },
        });
        // configured project is alive since file is still open

        closeFilesForSession([file1], session);

        openFilesForSession([file2], session);
        baselineTsserverLogs("externalProjects", "external project with included config file opened after configured project and then closed", session);
    });

    it("can correctly update external project when set of root files has changed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1",
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 1",
        };
        const host = createServerHost([file1, file2]);
        const session = new TestSession(host);

        openExternalProjectForSession({
            projectFileName: "project",
            options: {},
            rootFiles: toExternalFiles([file1.path]),
        }, session);

        openExternalProjectForSession({
            projectFileName: "project",
            options: {},
            rootFiles: toExternalFiles([file1.path, file2.path]),
        }, session);
        baselineTsserverLogs("externalProjects", "can correctly update external project when set of root files has changed", session);
    });

    it("can update external project when set of root files was not changed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export * from "m"`,
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "export let y = 1",
        };
        const file3 = {
            path: "/a/m.ts",
            content: "export let y = 1",
        };

        const host = createServerHost([file1, file2, file3]);
        const session = new TestSession(host);

        openExternalProjectForSession({
            projectFileName: "project",
            options: { moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: toExternalFiles([file1.path, file2.path]),
        }, session);

        openExternalProjectForSession({
            projectFileName: "project",
            options: { moduleResolution: ts.ModuleResolutionKind.Classic },
            rootFiles: toExternalFiles([file1.path, file2.path]),
        }, session);
        baselineTsserverLogs("externalProjects", "can update external project when set of root files was not changed", session);
    });

    it("language service disabled state is updated in external projects", () => {
        const f1 = {
            path: "/a/app.js",
            content: "var x = 1",
        };
        const f2 = {
            path: "/a/largefile.js",
            content: "",
        };
        const host = createServerHost([f1, f2]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) => filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

        const session = new TestSession(host);
        const projectFileName = "/a/proj.csproj";

        openExternalProjectForSession({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, f2.path]),
            options: {},
        }, session);
        assert.isFalse(session.getProjectService().externalProjects[0].languageServiceEnabled, "language service should be disabled - 1");

        openExternalProjectForSession({
            projectFileName,
            rootFiles: toExternalFiles([f1.path]),
            options: {},
        }, session);
        assert.isTrue(session.getProjectService().externalProjects[0].languageServiceEnabled, "language service should be enabled");

        openExternalProjectForSession({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, f2.path]),
            options: {},
        }, session);
        assert.isFalse(session.getProjectService().externalProjects[0].languageServiceEnabled, "language service should be disabled - 2");
        baselineTsserverLogs("externalProjects", "language service disabled state is updated in external projects", session);
    });

    describe("deleting config file opened from the external project works", () => {
        function verifyDeletingConfigFile(lazyConfiguredProjectsFromExternalProject: boolean) {
            const site = {
                path: "/user/someuser/project/js/site.js",
                content: "",
            };
            const configFile = {
                path: "/user/someuser/project/tsconfig.json",
                content: "{}",
            };
            const projectFileName = "/user/someuser/project/WebApplication6.csproj";
            const host = createServerHost([libFile, site, configFile]);
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { lazyConfiguredProjectsFromExternalProject } },
            });

            const externalProject: ts.server.protocol.ExternalProject = {
                projectFileName,
                rootFiles: [toExternalFile(site.path), toExternalFile(configFile.path)],
                options: { allowJs: false },
                typeAcquisition: { include: [] },
            };

            openExternalProjectsForSession([externalProject], session);

            const knownProjects = session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: {
                    knownProjects: [],
                },
            }).response as ts.server.protocol.ProjectFilesWithDiagnostics[];

            host.deleteFile(configFile.path);

            session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: {
                    knownProjects: knownProjects.map(p => p.info!),
                },
            }).response as ts.server.protocol.ProjectFilesWithDiagnostics[];

            externalProject.rootFiles.length = 1;
            openExternalProjectsForSession([externalProject], session);

            baselineTsserverLogs("externalProjects", `deleting config file opened from the external project works${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, session);
        }
        it("when lazyConfiguredProjectsFromExternalProject not set", () => {
            verifyDeletingConfigFile(/*lazyConfiguredProjectsFromExternalProject*/ false);
        });
        it("when lazyConfiguredProjectsFromExternalProject is set", () => {
            verifyDeletingConfigFile(/*lazyConfiguredProjectsFromExternalProject*/ true);
        });
    });

    describe("correctly handling add/remove tsconfig - 1", () => {
        function verifyAddRemoveConfig(lazyConfiguredProjectsFromExternalProject: boolean) {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;",
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: "",
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: "",
            };
            const host = createServerHost([f1, f2]);
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { lazyConfiguredProjectsFromExternalProject } },
            });

            // open external project
            const projectFileName = "/a/b/proj1";
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {},
            }, session);
            openFilesForSession([f1], session);

            // rename lib.ts to tsconfig.json
            host.renameFile(f2.path, tsconfig.path);
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, tsconfig.path]),
                options: {},
            }, session);
            if (lazyConfiguredProjectsFromExternalProject) {
                session.getProjectService().ensureInferredProjectsUpToDate_TestOnly();
            }

            // rename tsconfig.json back to lib.ts
            host.renameFile(tsconfig.path, f2.path);
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {},
            }, session);
            baselineTsserverLogs("externalProjects", `correctly handling add or remove tsconfig - 1${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, session);
        }
        it("when lazyConfiguredProjectsFromExternalProject not set", () => {
            verifyAddRemoveConfig(/*lazyConfiguredProjectsFromExternalProject*/ false);
        });
        it("when lazyConfiguredProjectsFromExternalProject is set", () => {
            verifyAddRemoveConfig(/*lazyConfiguredProjectsFromExternalProject*/ true);
        });
    });

    describe("correctly handling add/remove tsconfig - 2", () => {
        function verifyAddRemoveConfig(lazyConfiguredProjectsFromExternalProject: boolean) {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;",
            };
            const cLib = {
                path: "/a/b/c/lib.ts",
                content: "",
            };
            const cTsconfig = {
                path: "/a/b/c/tsconfig.json",
                content: "{}",
            };
            const dLib = {
                path: "/a/b/d/lib.ts",
                content: "",
            };
            const dTsconfig = {
                path: "/a/b/d/tsconfig.json",
                content: "{}",
            };
            const host = createServerHost([f1, cLib, cTsconfig, dLib, dTsconfig]);
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { lazyConfiguredProjectsFromExternalProject } },
            });

            // open external project
            const projectFileName = "/a/b/proj1";
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path]),
                options: {},
            }, session);

            // add two config file as root files
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {},
            }, session);
            if (lazyConfiguredProjectsFromExternalProject) {
                session.getProjectService().ensureInferredProjectsUpToDate_TestOnly();
            }

            // remove one config file
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, dTsconfig.path]),
                options: {},
            }, session);

            // remove second config file
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path]),
                options: {},
            }, session);

            // open two config files
            // add two config file as root files
            openExternalProjectForSession({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {},
            }, session);
            if (lazyConfiguredProjectsFromExternalProject) {
                session.getProjectService().ensureInferredProjectsUpToDate_TestOnly();
            }

            // close all projects - no projects should be opened
            session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
                command: ts.server.protocol.CommandTypes.CloseExternalProject,
                arguments: { projectFileName },
            });
            baselineTsserverLogs("externalProjects", `correctly handling add or remove tsconfig - 2${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, session);
        }

        it("when lazyConfiguredProjectsFromExternalProject not set", () => {
            verifyAddRemoveConfig(/*lazyConfiguredProjectsFromExternalProject*/ false);
        });
        it("when lazyConfiguredProjectsFromExternalProject is set", () => {
            verifyAddRemoveConfig(/*lazyConfiguredProjectsFromExternalProject*/ true);
        });
    });

    it("correctly handles changes in lib section of config file", () => {
        const libES5 = {
            path: "/compiler/lib.es5.d.ts",
            content: "declare const eval: any",
        };
        const libES2015Promise = {
            path: "/compiler/lib.es2015.promise.d.ts",
            content: "declare class Promise<T> {}",
        };
        const app = {
            path: "/src/app.ts",
            content: "var x: Promise<string>;",
        };
        const config1 = {
            path: "/src/tsconfig.json",
            content: jsonToReadableText(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: true,
                        sourceMap: false,
                        lib: [
                            "es5",
                        ],
                    },
                },
            ),
        };
        const config2 = {
            path: config1.path,
            content: jsonToReadableText(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: true,
                        sourceMap: false,
                        lib: [
                            "es5",
                            "es2015.promise",
                        ],
                    },
                },
            ),
        };
        const host = createServerHost([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
        const session = new TestSession(host);
        openFilesForSession([app], session);

        host.writeFile(config2.path, config2.content);
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("externalProjects", "correctly handles changes in lib section of config file", session);
    });

    it("should handle non-existing directories in config file", () => {
        const f = {
            path: "/a/src/app.ts",
            content: "let x = 1;",
        };
        const config = {
            path: "/a/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                include: [
                    "src/**/*",
                    "notexistingfolder/*",
                ],
            }),
        };
        const host = createServerHost([f, config]);
        const session = new TestSession(host);
        openFilesForSession([f], session);
        logConfiguredProjectsHasOpenRefStatus(session);
        closeFilesForSession([f], session);
        logConfiguredProjectsHasOpenRefStatus(session);

        openFilesForSession([f], session);
        logConfiguredProjectsHasOpenRefStatus(session);
        baselineTsserverLogs("externalProjects", "should handle non-existing directories in config file", session);
    });

    it("handles loads existing configured projects of external projects when lazyConfiguredProjectsFromExternalProject is disabled", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1",
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({}),
        };
        const projectFileName = "/a/b/project.csproj";
        const host = createServerHost([f1, config]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { lazyConfiguredProjectsFromExternalProject: true } },
        });
        openExternalProjectForSession({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {},
        }, session);
        const project = session.getProjectService().configuredProjects.get(config.path)!;
        assert.equal(project.pendingUpdateLevel, ts.ProgramUpdateLevel.Full); // External project referenced configured project pending to be reloaded

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { lazyConfiguredProjectsFromExternalProject: false } },
        });
        assert.equal(project.pendingUpdateLevel, ts.ProgramUpdateLevel.Update); // External project referenced configured project loaded

        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName },
        });

        openExternalProjectForSession({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {},
        }, session);
        const project2 = session.getProjectService().configuredProjects.get(config.path)!;
        assert.equal(project2.pendingUpdateLevel, ts.ProgramUpdateLevel.Update); // External project referenced configured project loaded
        baselineTsserverLogs("externalProjects", "handles loads existing configured projects of external projects when lazyConfiguredProjectsFromExternalProject is disabled", session);
    });

    it("handles creation of external project with jsconfig before jsconfig creation watcher is invoked", () => {
        const projectFileName = `/user/username/projects/myproject/WebApplication36.csproj`;
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const files = [libFile, tsconfig];
        const host = createServerHost(files);
        const session = new TestSession(host);

        // Create external project
        openExternalProjectsForSession([{
            projectFileName,
            rootFiles: [{ fileName: tsconfig.path }],
            options: { allowJs: false },
        }], session);

        // write js file, open external project and open it for edit
        const jsFilePath = `/user/username/projects/myproject/javascript.js`;
        host.writeFile(jsFilePath, "");
        openExternalProjectsForSession([{
            projectFileName,
            rootFiles: [{ fileName: tsconfig.path }, { fileName: jsFilePath }],
            options: { allowJs: false },
        }], session);
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                openFiles: [{ fileName: jsFilePath, scriptKind: "JS", content: "" }],
            },
        });

        // write jsconfig file
        const jsConfig: File = {
            path: `/user/username/projects/myproject/jsconfig.json`,
            content: "{}",
        };
        // Dont invoke file creation watchers as the repro suggests
        host.ensureFileOrFolder(jsConfig, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);

        // Open external project
        openExternalProjectsForSession([{
            projectFileName,
            rootFiles: [{ fileName: jsConfig.path }, { fileName: tsconfig.path }, { fileName: jsFilePath }],
            options: { allowJs: false },
        }], session);
        logInferredProjectsOrphanStatus(session);
        baselineTsserverLogs("externalProjects", "handles creation of external project with jsconfig before jsconfig creation watcher is invoked", session);
    });

    it("does not crash if external file does not exist", () => {
        const f1 = {
            path: "/a/file1.ts",
            content: "let x = [1, 2];",
        };
        const p1 = {
            projectFileName: "/a/proj1.csproj",
            rootFiles: [toExternalFile(f1.path)],
            options: {},
        };

        const host = createServerHost([f1]);
        host.require = (_initialPath, moduleName) => {
            assert.equal(moduleName, "myplugin");
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        return Harness.LanguageService.makeDefaultProxy(info);
                    },
                    getExternalFiles() {
                        return ["/does/not/exist"];
                    },
                }),
                error: undefined,
            };
        };
        const session = new TestSession({ host, globalPlugins: ["myplugin"] });
        // When the external project is opened, the graph will be updated,
        // and in the process getExternalFiles() above will be called.
        // Since the external file does not exist, there will not be a script
        // info for it. If tsserver does not handle this case, the following
        // method call will crash.
        openExternalProjectForSession(p1, session);
        baselineTsserverLogs("externalProjects", "does not crash if external file does not exist", session);
    });
});

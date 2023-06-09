import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createProjectService,
    createSession,
    logConfiguredProjectsHasOpenRefStatus,
    logInferredProjectsOrphanStatus,
    openExternalProjectForSession,
    openExternalProjectsForSession,
    openFilesForSession,
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
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    include: []
                })
            };

            const host = createServerHost([f1, config], { useCaseSensitiveFileNames: false });
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: {
                    preferences: { lazyConfiguredProjectsFromExternalProject }
                }
            });
            const upperCaseConfigFilePath = ts.combinePaths(ts.getDirectoryPath(config.path).toUpperCase(), ts.getBaseFileName(config.path));
            openExternalProjectForSession({
                projectFileName: "/a/b/project.csproj",
                rootFiles: toExternalFiles([f1.path, upperCaseConfigFilePath]),
                options: {}
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
            content: "let x = [1, 2];"
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
                                start: 0
                            });
                            return prev;
                        };
                        return proxy;
                    }
                }),
                error: undefined
            };
        };
        const session = createSession(host, { globalPlugins: ["myplugin"], logger: createLoggerWithInMemoryLogs(host) });

        openExternalProjectsForSession([p1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: {
                file: f1.path,
                projectFileName: p1.projectFileName
            }
        });
        baselineTsserverLogs("externalProjects", "load global plugins", session);
    });

    it("remove not-listed external projects", () => {
        const f1 = {
            path: "/a/app.ts",
            content: "let x = 1"
        };
        const f2 = {
            path: "/b/app.ts",
            content: "let x = 1"
        };
        const f3 = {
            path: "/c/app.ts",
            content: "let x = 1"
        };
        const makeProject = (f: File) => ({ projectFileName: f.path + ".csproj", rootFiles: [toExternalFile(f.path)], options: {} });
        const p1 = makeProject(f1);
        const p2 = makeProject(f2);
        const p3 = makeProject(f3);

        const host = createServerHost([f1, f2, f3]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openExternalProjectsForSession([p1, p2], session);
        openExternalProjectsForSession([p1, p3], session);
        openExternalProjectsForSession([], session);
        openExternalProjectsForSession([p2], session);
        baselineTsserverLogs("externalProjects", "remove not-listed external projects", session);
    });

    it("should not close external project with no open files", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y =1;"
        };
        const externalProjectName = "externalproject";
        const host = createServerHost([file1, file2]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openExternalProject({
            rootFiles: toExternalFiles([file1.path, file2.path]),
            options: {},
            projectFileName: externalProjectName
        });
        // open client file - should not lead to creation of inferred project
        projectService.openClientFile(file1.path, file1.content);
        // close client file - external project should still exists
        projectService.closeClientFile(file1.path);
        projectService.closeExternalProject(externalProjectName);
        baselineTsserverLogs("externalProjects", "should not close external project with no open files", projectService);
    });

    it("external project for dynamic file", () => {
        const externalProjectName = "^ScriptDocument1 file1.ts";
        const externalFiles = toExternalFiles(["^ScriptDocument1 file1.ts"]);
        const host = createServerHost([]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openExternalProject({
            rootFiles: externalFiles,
            options: {},
            projectFileName: externalProjectName
        });

        verifyDynamic(projectService, "/^scriptdocument1 file1.ts");

        externalFiles[0].content = "let x =1;";
        projectService.applyChangesInOpenFiles(externalFiles);
        baselineTsserverLogs("externalProjects", "external project for dynamic file", projectService);
    });

    it("when file name starts with ^", () => {
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const x = 10;"
        };
        const app: File = {
            path: `/user/username/projects/myproject/^app.ts`,
            content: "const y = 10;"
        };
        const host = createServerHost([file, app, libFile]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openExternalProjects([{
            projectFileName: `/user/username/projects/myproject/myproject.njsproj`,
            rootFiles: [
                toExternalFile(file.path),
                toExternalFile(app.path)
            ],
            options: {},
        }]);
        baselineTsserverLogs("externalProjects", "when file name starts with caret", service);
    });

    it("external project that included config files", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;"
        };
        const config1 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify(
                {
                    compilerOptions: {},
                    files: ["f1.ts"]
                }
            )
        };
        const file2 = {
            path: "/a/c/f2.ts",
            content: "let y =1;"
        };
        const config2 = {
            path: "/a/c/tsconfig.json",
            content: JSON.stringify(
                {
                    compilerOptions: {},
                    files: ["f2.ts"]
                }
            )
        };
        const file3 = {
            path: "/a/d/f3.ts",
            content: "let z =1;"
        };
        const externalProjectName = "externalproject";
        const host = createServerHost([file1, file2, file3, config1, config2]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openExternalProject({
            rootFiles: toExternalFiles([config1.path, config2.path, file3.path]),
            options: {},
            projectFileName: externalProjectName
        });

        // open client file - should not lead to creation of inferred project
        projectService.openClientFile(file1.path, file1.content);
        logInferredProjectsOrphanStatus(projectService);

        projectService.openClientFile(file3.path, file3.content);
        logInferredProjectsOrphanStatus(projectService);

        projectService.closeExternalProject(externalProjectName);
        logInferredProjectsOrphanStatus(projectService);
        // open file 'file1' from configured project keeps project alive

        projectService.closeClientFile(file3.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.closeClientFile(file1.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.openClientFile(file2.path, file2.content);
        baselineTsserverLogs("externalProjects", "external project that included config files", projectService);
    });

    it("external project with included config file opened after configured project", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {} })
        };
        const externalProjectName = "externalproject";
        const host = createServerHost([file1, configFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);

        projectService.openExternalProject({
            rootFiles: toExternalFiles([configFile.path]),
            options: {},
            projectFileName: externalProjectName
        });


        projectService.closeClientFile(file1.path);
        // configured project is alive since it is opened as part of external project

        projectService.closeExternalProject(externalProjectName);
        baselineTsserverLogs("externalProjects", "external project with included config file opened after configured project", projectService);
    });

    it("external project with included config file opened after configured project and then closed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2 = {
            path: "/a/f2.ts",
            content: "let x = 1"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {} })
        };
        const externalProjectName = "externalproject";
        const host = createServerHost([file1, file2, libFile, configFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);

        projectService.openExternalProject({
            rootFiles: toExternalFiles([configFile.path]),
            options: {},
            projectFileName: externalProjectName
        });

        projectService.closeExternalProject(externalProjectName);
        // configured project is alive since file is still open

        projectService.closeClientFile(file1.path);

        projectService.openClientFile(file2.path);
        baselineTsserverLogs("externalProjects", "external project with included config file opened after configured project and then closed", projectService);
    });

    it("can correctly update external project when set of root files has changed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 1"
        };
        const host = createServerHost([file1, file2]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path]) });

        projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]) });
        baselineTsserverLogs("externalProjects", "can correctly update external project when set of root files has changed", projectService);
    });

    it("can update external project when set of root files was not changed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export * from "m"`
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "export let y = 1"
        };
        const file3 = {
            path: "/a/m.ts",
            content: "export let y = 1"
        };

        const host = createServerHost([file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ts.ModuleResolutionKind.Node10 }, rootFiles: toExternalFiles([file1.path, file2.path]) });

        projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ts.ModuleResolutionKind.Classic }, rootFiles: toExternalFiles([file1.path, file2.path]) });
        baselineTsserverLogs("externalProjects", "can update external project when set of root files was not changed", projectService);
    });

    it("language service disabled state is updated in external projects", () => {
        const f1 = {
            path: "/a/app.js",
            content: "var x = 1"
        };
        const f2 = {
            path: "/a/largefile.js",
            content: ""
        };
        const host = createServerHost([f1, f2]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) =>
            filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        const projectFileName = "/a/proj.csproj";

        service.openExternalProject({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, f2.path]),
            options: {}
        });
        assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 1");

        service.openExternalProject({
            projectFileName,
            rootFiles: toExternalFiles([f1.path]),
            options: {}
        });
        assert.isTrue(service.externalProjects[0].languageServiceEnabled, "language service should be enabled");

        service.openExternalProject({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, f2.path]),
            options: {}
        });
        assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 2");
        baselineTsserverLogs("externalProjects", "language service disabled state is updated in external projects", service);
    });

    describe("deleting config file opened from the external project works", () => {
        function verifyDeletingConfigFile(lazyConfiguredProjectsFromExternalProject: boolean) {
            const site = {
                path: "/user/someuser/project/js/site.js",
                content: ""
            };
            const configFile = {
                path: "/user/someuser/project/tsconfig.json",
                content: "{}"
            };
            const projectFileName = "/user/someuser/project/WebApplication6.csproj";
            const host = createServerHost([libFile, site, configFile]);
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

            const externalProject: ts.server.protocol.ExternalProject = {
                projectFileName,
                rootFiles: [toExternalFile(site.path), toExternalFile(configFile.path)],
                options: { allowJs: false },
                typeAcquisition: { include: [] }
            };

            projectService.openExternalProjects([externalProject]);

            const knownProjects = projectService.synchronizeProjectList([]);

            host.deleteFile(configFile.path);

            projectService.synchronizeProjectList(ts.map(knownProjects, proj => proj.info!)); // TODO: GH#18217 GH#20039

            externalProject.rootFiles.length = 1;
            projectService.openExternalProjects([externalProject]);

            baselineTsserverLogs("externalProjects", `deleting config file opened from the external project works${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, projectService);
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
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: ""
            };
            const host = createServerHost([f1, f2]);
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            projectService.openClientFile(f1.path);

            // rename lib.ts to tsconfig.json
            host.renameFile(f2.path, tsconfig.path);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, tsconfig.path]),
                options: {}
            });
            if (lazyConfiguredProjectsFromExternalProject) {
                projectService.ensureInferredProjectsUpToDate_TestOnly();
            }

            // rename tsconfig.json back to lib.ts
            host.renameFile(tsconfig.path, f2.path);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            baselineTsserverLogs("externalProjects", `correctly handling add or remove tsconfig - 1${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, projectService);
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
                content: "let x = 1;"
            };
            const cLib = {
                path: "/a/b/c/lib.ts",
                content: ""
            };
            const cTsconfig = {
                path: "/a/b/c/tsconfig.json",
                content: "{}"
            };
            const dLib = {
                path: "/a/b/d/lib.ts",
                content: ""
            };
            const dTsconfig = {
                path: "/a/b/d/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, cLib, cTsconfig, dLib, dTsconfig]);
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            if (lazyConfiguredProjectsFromExternalProject) {
                projectService.ensureInferredProjectsUpToDate_TestOnly();
            }

            // remove one config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, dTsconfig.path]),
                options: {}
            });

            // remove second config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            // open two config files
            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            if (lazyConfiguredProjectsFromExternalProject) {
                projectService.ensureInferredProjectsUpToDate_TestOnly();
            }

            // close all projects - no projects should be opened
            projectService.closeExternalProject(projectName);
            baselineTsserverLogs("externalProjects", `correctly handling add or remove tsconfig - 2${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, projectService);
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
            content: "declare const eval: any"
        };
        const libES2015Promise = {
            path: "/compiler/lib.es2015.promise.d.ts",
            content: "declare class Promise<T> {}"
        };
        const app = {
            path: "/src/app.ts",
            content: "var x: Promise<string>;"
        };
        const config1 = {
            path: "/src/tsconfig.json",
            content: JSON.stringify(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: true,
                        sourceMap: false,
                        lib: [
                            "es5"
                        ]
                    }
                })
        };
        const config2 = {
            path: config1.path,
            content: JSON.stringify(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: true,
                        sourceMap: false,
                        lib: [
                            "es5",
                            "es2015.promise"
                        ]
                    }
                })
        };
        const host = createServerHost([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(app.path);

        host.writeFile(config2.path, config2.content);
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("externalProjects", "correctly handles changes in lib section of config file", projectService);
    });

    it("should handle non-existing directories in config file", () => {
        const f = {
            path: "/a/src/app.ts",
            content: "let x = 1;"
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {},
                include: [
                    "src/**/*",
                    "notexistingfolder/*"
                ]
            })
        };
        const host = createServerHost([f, config]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(f.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);
        projectService.closeClientFile(f.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);

        projectService.openClientFile(f.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);
        baselineTsserverLogs("externalProjects", "should handle non-existing directories in config file", projectService);
    });

    it("handles loads existing configured projects of external projects when lazyConfiguredProjectsFromExternalProject is disabled", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1"
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({})
        };
        const projectFileName = "/a/b/project.csproj";
        const host = createServerHost([f1, config]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject: true } });
        service.openExternalProject({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {}
        } as ts.server.protocol.ExternalProject);
        const project = service.configuredProjects.get(config.path)!;
        assert.equal(project.pendingReload, ts.ConfigFileProgramReloadLevel.Full); // External project referenced configured project pending to be reloaded

        service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject: false } });
        assert.equal(project.pendingReload, ts.ConfigFileProgramReloadLevel.None); // External project referenced configured project loaded

        service.closeExternalProject(projectFileName);

        service.openExternalProject({
            projectFileName,
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {}
        } as ts.server.protocol.ExternalProject);
        const project2 = service.configuredProjects.get(config.path)!;
        assert.equal(project2.pendingReload, ts.ConfigFileProgramReloadLevel.None); // External project referenced configured project loaded
        baselineTsserverLogs("externalProjects", "handles loads existing configured projects of external projects when lazyConfiguredProjectsFromExternalProject is disabled", service);
    });

    it("handles creation of external project with jsconfig before jsconfig creation watcher is invoked", () => {
        const projectFileName = `/user/username/projects/myproject/WebApplication36.csproj`;
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const files = [libFile, tsconfig];
        const host = createServerHost(files);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        // Create external project
        service.openExternalProjects([{
            projectFileName,
            rootFiles: [{ fileName: tsconfig.path }],
            options: { allowJs: false }
        }]);

        // write js file, open external project and open it for edit
        const jsFilePath = `/user/username/projects/myproject/javascript.js`;
        host.writeFile(jsFilePath, "");
        service.openExternalProjects([{
            projectFileName,
            rootFiles: [{ fileName: tsconfig.path }, { fileName: jsFilePath }],
            options: { allowJs: false }
        }]);
        service.applyChangesInOpenFiles(ts.singleIterator({ fileName: jsFilePath, scriptKind: ts.ScriptKind.JS, content: "" }));

        // write jsconfig file
        const jsConfig: File = {
            path: `/user/username/projects/myproject/jsconfig.json`,
            content: "{}"
        };
        // Dont invoke file creation watchers as the repro suggests
        host.ensureFileOrFolder(jsConfig, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);

        // Open external project
        service.openExternalProjects([{
            projectFileName,
            rootFiles: [{ fileName: jsConfig.path }, { fileName: tsconfig.path }, { fileName: jsFilePath }],
            options: { allowJs: false }
        }]);
        logInferredProjectsOrphanStatus(service);
        baselineTsserverLogs("externalProjects", "handles creation of external project with jsconfig before jsconfig creation watcher is invoked", service);
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
        const session = createSession(host, {
            globalPlugins: ["myplugin"],
            logger: createLoggerWithInMemoryLogs(host),
        });
        // When the external project is opened, the graph will be updated,
        // and in the process getExternalFiles() above will be called.
        // Since the external file does not exist, there will not be a script
        // info for it. If tsserver does not handle this case, the following
        // method call will crash.
        openExternalProjectForSession(p1, session);
        baselineTsserverLogs("externalProjects", "does not crash if external file does not exist", session);
    });
});

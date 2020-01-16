namespace ts.projectSystem {
    describe("unittests:: tsserver:: ExternalProjects", () => {
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
                const service = createProjectService(host);
                service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });
                const upperCaseConfigFilePath = combinePaths(getDirectoryPath(config.path).toUpperCase(), getBaseFileName(config.path));
                service.openExternalProject(<protocol.ExternalProject>{
                    projectFileName: "/a/b/project.csproj",
                    rootFiles: toExternalFiles([f1.path, upperCaseConfigFilePath]),
                    options: {}
                });
                service.checkNumberOfProjects({ configuredProjects: 1 });
                const project = service.configuredProjects.get(config.path)!;
                if (lazyConfiguredProjectsFromExternalProject) {
                    assert.equal(project.pendingReload, ConfigFileProgramReloadLevel.Full); // External project referenced configured project pending to be reloaded
                    checkProjectActualFiles(project, emptyArray);
                }
                else {
                    assert.equal(project.pendingReload, ConfigFileProgramReloadLevel.None); // External project referenced configured project loaded
                    checkProjectActualFiles(project, [upperCaseConfigFilePath]);
                }

                service.openClientFile(f1.path);
                service.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });

                assert.equal(project.pendingReload, ConfigFileProgramReloadLevel.None); // External project referenced configured project is updated
                checkProjectActualFiles(project, [upperCaseConfigFilePath]);
                checkProjectActualFiles(service.inferredProjects[0], [f1.path]);
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
                        create(info: server.PluginCreateInfo) {
                            const proxy = Harness.LanguageService.makeDefaultProxy(info);
                            proxy.getSemanticDiagnostics = filename => {
                                const prev = info.languageService.getSemanticDiagnostics(filename);
                                const sourceFile: SourceFile = info.project.getSourceFile(toPath(filename, /*basePath*/ undefined, createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                prev.push({
                                    category: DiagnosticCategory.Warning,
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
            const session = createSession(host, { globalPlugins: ["myplugin"] });

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 1,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1] }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);

            const handlerResponse = session.executeCommand(<protocol.SemanticDiagnosticsSyncRequest>{
                seq: 2,
                type: "request",
                command: "semanticDiagnosticsSync",
                arguments: {
                    file: f1.path,
                    projectFileName: p1.projectFileName
                }
            });

            assert.isDefined(handlerResponse.response);
            const response = handlerResponse.response as protocol.Diagnostic[];
            assert.equal(response.length, 1);
            assert.equal(response[0].text, "Plugin diagnostic");
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
            const session = createSession(host);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 1,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p2] }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p2.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 2,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p3] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p3.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 0 });

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p2] }
            });
            assert.equal(projectService.externalProjects[0].getProjectName(), p2.projectFileName);
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
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path, file2.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // close client file - external project should still exists
            projectService.closeClientFile(file1.path);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfExternalProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("external project for dynamic file", () => {
            const externalProjectName = "^ScriptDocument1 file1.ts";
            const externalFiles = toExternalFiles(["^ScriptDocument1 file1.ts"]);
            const host = createServerHost([]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: externalFiles,
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            externalFiles[0].content = "let x =1;";
            projectService.applyChangesInOpenFiles(arrayIterator(externalFiles));
        });

        it("when file name starts with ^", () => {
            const file: File = {
                path: `${tscWatch.projectRoot}/file.ts`,
                content: "const x = 10;"
            };
            const app: File = {
                path: `${tscWatch.projectRoot}/^app.ts`,
                content: "const y = 10;"
            };
            const host = createServerHost([file, app, libFile]);
            const service = createProjectService(host);
            service.openExternalProjects([{
                projectFileName: `${tscWatch.projectRoot}/myproject.njsproj`,
                rootFiles: [
                    toExternalFile(file.path),
                    toExternalFile(app.path)
                ],
                options: { },
            }]);
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
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([config1.path, config2.path, file3.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            const proj1 = projectService.configuredProjects.get(config1.path);
            const proj2 = projectService.configuredProjects.get(config2.path);
            assert.isDefined(proj1);
            assert.isDefined(proj2);

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.strictEqual(projectService.configuredProjects.get(config1.path), proj1);
            assert.strictEqual(projectService.configuredProjects.get(config2.path), proj2);

            projectService.openClientFile(file3.path, file3.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2, inferredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config1.path), proj1);
            assert.strictEqual(projectService.configuredProjects.get(config2.path), proj2);

            projectService.closeExternalProject(externalProjectName);
            // open file 'file1' from configured project keeps project alive
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config1.path), proj1);
            assert.isUndefined(projectService.configuredProjects.get(config2.path));

            projectService.closeClientFile(file3.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config1.path), proj1);
            assert.isUndefined(projectService.configuredProjects.get(config2.path));
            assert.isTrue(projectService.inferredProjects[0].isOrphan());

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config1.path), proj1);
            assert.isUndefined(projectService.configuredProjects.get(config2.path));
            assert.isTrue(projectService.inferredProjects[0].isOrphan());

            projectService.openClientFile(file2.path, file2.content);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isUndefined(projectService.configuredProjects.get(config1.path));
            assert.isDefined(projectService.configuredProjects.get(config2.path));
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
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            // configured project is alive since it is opened as part of external project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfProjects(projectService, { configuredProjects: 0 });
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
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects.get(configFile.path);

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);

            projectService.closeExternalProject(externalProjectName);
            // configured project is alive since file is still open
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            assert.isUndefined(projectService.configuredProjects.get(configFile.path));
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
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path]);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
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
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.NodeJs }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path]);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.Classic }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path, file3.path]);
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
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const service = createProjectService(host);
            const projectFileName = "/a/proj.csproj";

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 1");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isTrue(service.externalProjects[0].languageServiceEnabled, "language service should be enabled");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 2");
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
                const projectService = createProjectService(host);
                projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

                const externalProject: protocol.ExternalProject = {
                    projectFileName,
                    rootFiles: [toExternalFile(site.path), toExternalFile(configFile.path)],
                    options: { allowJs: false },
                    typeAcquisition: { include: [] }
                };

                projectService.openExternalProjects([externalProject]);

                let knownProjects = projectService.synchronizeProjectList([]);
                checkNumberOfProjects(projectService, { configuredProjects: 1, externalProjects: 0, inferredProjects: 0 });

                const configProject = configuredProjectAt(projectService, 0);
                checkProjectActualFiles(configProject, lazyConfiguredProjectsFromExternalProject ?
                    emptyArray : // Since no files opened from this project, its not loaded
                    [configFile.path]);

                host.reloadFS([libFile, site]);
                host.checkTimeoutQueueLengthAndRun(1);

                knownProjects = projectService.synchronizeProjectList(map(knownProjects, proj => proj.info!)); // TODO: GH#18217 GH#20039
                checkNumberOfProjects(projectService, { configuredProjects: 0, externalProjects: 0, inferredProjects: 0 });

                externalProject.rootFiles.length = 1;
                projectService.openExternalProjects([externalProject]);

                checkNumberOfProjects(projectService, { configuredProjects: 0, externalProjects: 1, inferredProjects: 0 });
                checkProjectActualFiles(projectService.externalProjects[0], [site.path, libFile.path]);
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
                const projectService = createProjectService(host);
                projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

                // open external project
                const projectName = "/a/b/proj1";
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, f2.path]),
                    options: {}
                });
                projectService.openClientFile(f1.path);
                projectService.checkNumberOfProjects({ externalProjects: 1 });
                checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);

                // rename lib.ts to tsconfig.json
                host.reloadFS([f1, tsconfig]);
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, tsconfig.path]),
                    options: {}
                });
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                if (lazyConfiguredProjectsFromExternalProject) {
                    checkProjectActualFiles(configuredProjectAt(projectService, 0), emptyArray); // Configured project created but not loaded till actually needed
                    projectService.ensureInferredProjectsUpToDate_TestOnly();
                }
                checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, tsconfig.path]);

                // rename tsconfig.json back to lib.ts
                host.reloadFS([f1, f2]);
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, f2.path]),
                    options: {}
                });

                projectService.checkNumberOfProjects({ externalProjects: 1 });
                checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);
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
                const projectService = createProjectService(host);
                projectService.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });

                // open external project
                const projectName = "/a/b/proj1";
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path]),
                    options: {}
                });

                projectService.checkNumberOfProjects({ externalProjects: 1 });
                checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

                // add two config file as root files
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                    options: {}
                });
                projectService.checkNumberOfProjects({ configuredProjects: 2 });
                if (lazyConfiguredProjectsFromExternalProject) {
                    checkProjectActualFiles(configuredProjectAt(projectService, 0), emptyArray); // Configured project created but not loaded till actually needed
                    checkProjectActualFiles(configuredProjectAt(projectService, 1), emptyArray); // Configured project created but not loaded till actually needed
                    projectService.ensureInferredProjectsUpToDate_TestOnly();
                }
                checkProjectActualFiles(configuredProjectAt(projectService, 0), [cLib.path, cTsconfig.path]);
                checkProjectActualFiles(configuredProjectAt(projectService, 1), [dLib.path, dTsconfig.path]);

                // remove one config file
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, dTsconfig.path]),
                    options: {}
                });

                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                checkProjectActualFiles(configuredProjectAt(projectService, 0), [dLib.path, dTsconfig.path]);

                // remove second config file
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path]),
                    options: {}
                });

                projectService.checkNumberOfProjects({ externalProjects: 1 });
                checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

                // open two config files
                // add two config file as root files
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                    options: {}
                });
                projectService.checkNumberOfProjects({ configuredProjects: 2 });
                if (lazyConfiguredProjectsFromExternalProject) {
                    checkProjectActualFiles(configuredProjectAt(projectService, 0), emptyArray); // Configured project created but not loaded till actually needed
                    checkProjectActualFiles(configuredProjectAt(projectService, 1), emptyArray); // Configured project created but not loaded till actually needed
                    projectService.ensureInferredProjectsUpToDate_TestOnly();
                }
                checkProjectActualFiles(configuredProjectAt(projectService, 0), [cLib.path, cTsconfig.path]);
                checkProjectActualFiles(configuredProjectAt(projectService, 1), [dLib.path, dTsconfig.path]);

                // close all projects - no projects should be opened
                projectService.closeExternalProject(projectName);
                projectService.checkNumberOfProjects({});
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
            const projectService = createProjectService(host);
            projectService.openClientFile(app.path);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [libES5.path, app.path, config1.path]);

            host.reloadFS([libES5, libES2015Promise, app, config2]);
            host.checkTimeoutQueueLengthAndRun(2);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [libES5.path, libES2015Promise.path, app.path, config2.path]);
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
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const project = projectService.configuredProjects.get(config.path)!;
            assert.isTrue(project.hasOpenRef()); // f

            projectService.closeClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config.path), project);
            assert.isFalse(project.hasOpenRef()); // No files
            assert.isFalse(project.isClosed());

            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config.path), project);
            assert.isTrue(project.hasOpenRef()); // f
            assert.isFalse(project.isClosed());
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
            const service = createProjectService(host);
            service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject: true } });
            service.openExternalProject(<protocol.ExternalProject>{
                projectFileName,
                rootFiles: toExternalFiles([f1.path, config.path]),
                options: {}
            });
            service.checkNumberOfProjects({ configuredProjects: 1 });
            const project = service.configuredProjects.get(config.path)!;
            assert.equal(project.pendingReload, ConfigFileProgramReloadLevel.Full); // External project referenced configured project pending to be reloaded
            checkProjectActualFiles(project, emptyArray);

            service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject: false } });
            assert.equal(project.pendingReload, ConfigFileProgramReloadLevel.None); // External project referenced configured project loaded
            checkProjectActualFiles(project, [config.path, f1.path]);

            service.closeExternalProject(projectFileName);
            service.checkNumberOfProjects({});

            service.openExternalProject(<protocol.ExternalProject>{
                projectFileName,
                rootFiles: toExternalFiles([f1.path, config.path]),
                options: {}
            });
            service.checkNumberOfProjects({ configuredProjects: 1 });
            const project2 = service.configuredProjects.get(config.path)!;
            assert.equal(project2.pendingReload, ConfigFileProgramReloadLevel.None); // External project referenced configured project loaded
            checkProjectActualFiles(project2, [config.path, f1.path]);
        });

        it("handles creation of external project with jsconfig before jsconfig creation watcher is invoked", () => {
            const projectFileName = `${tscWatch.projectRoot}/WebApplication36.csproj`;
            const tsconfig: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const files = [libFile, tsconfig];
            const host = createServerHost(files);
            const service = createProjectService(host);

            // Create external project
            service.openExternalProjects([{
                projectFileName,
                rootFiles: [{ fileName: tsconfig.path }],
                options: { allowJs: false }
            }]);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const configProject = service.configuredProjects.get(tsconfig.path.toLowerCase())!;
            checkProjectActualFiles(configProject, [tsconfig.path]);

            // write js file, open external project and open it for edit
            const jsFilePath = `${tscWatch.projectRoot}/javascript.js`;
            host.writeFile(jsFilePath, "");
            service.openExternalProjects([{
                projectFileName,
                rootFiles: [{ fileName: tsconfig.path }, { fileName: jsFilePath }],
                options: { allowJs: false }
            }]);
            service.applyChangesInOpenFiles(singleIterator({ fileName: jsFilePath, scriptKind: ScriptKind.JS, content: "" }));
            checkNumberOfProjects(service, { configuredProjects: 1, inferredProjects: 1 });
            checkProjectActualFiles(configProject, [tsconfig.path]);
            const inferredProject = service.inferredProjects[0];
            checkProjectActualFiles(inferredProject, [libFile.path, jsFilePath]);

            // write jsconfig file
            const jsConfig: File = {
                path: `${tscWatch.projectRoot}/jsconfig.json`,
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
            checkNumberOfProjects(service, { configuredProjects: 2, inferredProjects: 1 });
            checkProjectActualFiles(configProject, [tsconfig.path]);
            assert.isTrue(inferredProject.isOrphan());
            const jsConfigProject = service.configuredProjects.get(jsConfig.path.toLowerCase())!;
            checkProjectActualFiles(jsConfigProject, [jsConfig.path, jsFilePath, libFile.path]);
        });
    });
}

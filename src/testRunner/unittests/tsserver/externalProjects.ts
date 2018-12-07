namespace ts.projectSystem {
    describe("tsserver:: ExternalProjects", () => {
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
    });
}

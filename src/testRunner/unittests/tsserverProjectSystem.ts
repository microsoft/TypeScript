namespace ts.projectSystem {
    describe("tsserverProjectSystem general functionality", () => {
        it("create inferred project", () => {
            const appFile: File = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: File = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createServerHost([appFile, moduleFile, libFile]);
            const projectService = createProjectService(host);
            const { configFileName } = projectService.openClientFile(appFile.path);

            assert(!configFileName, `should not find config, got: '${configFileName}`);
            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);

            const project = projectService.inferredProjects[0];

            checkArray("inferred project", project.getFileNames(), [appFile.path, libFile.path, moduleFile.path]);
            const configFileLocations = ["/a/b/c/", "/a/b/", "/a/", "/"];
            const configFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]);
            checkWatchedFiles(host, configFiles.concat(libFile.path, moduleFile.path));
            checkWatchedDirectories(host, ["/a/b/c"], /*recursive*/ false);
            checkWatchedDirectories(host, [combinePaths(getDirectoryPath(appFile.path), nodeModulesAtTypes)], /*recursive*/ true);
        });

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

        it("create configured project without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: File = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: File = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: File = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createServerHost([configFile, libFile, file1, file2, file3]);
            const projectService = createProjectService(host);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors || configFileErrors.length === 0, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkNumberOfInferredProjects(projectService, 0);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [file1.path, libFile.path, file2.path, configFile.path]);
            checkProjectRootFiles(project, [file1.path, file2.path]);
            // watching all files except one that was open
            checkWatchedFiles(host, [configFile.path, file2.path, libFile.path]);
            const configFileDirectory = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configFileDirectory, combinePaths(configFileDirectory, nodeModulesAtTypes)], /*recursive*/ true);
        });

        it("create configured project with the file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "include": ["*.ts"]
                }`
            };
            const file1: File = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2: File = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const file3: File = {
                path: "/a/b/c/f3.ts",
                content: "let z = 1"
            };

            const host = createServerHost([configFile, libFile, file1, file2, file3]);
            const projectService = createProjectService(host);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors || configFileErrors.length === 0, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkNumberOfInferredProjects(projectService, 0);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [file1.path, libFile.path, file2.path, configFile.path]);
            checkProjectRootFiles(project, [file1.path, file2.path]);
            // watching all files except one that was open
            checkWatchedFiles(host, [configFile.path, file2.path, libFile.path]);
            checkWatchedDirectories(host, [getDirectoryPath(configFile.path)], /*recursive*/ false);
        });

        it("add and then remove a config file in a folder with loose files", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "files": ["commonFile1.ts"]
                }`
            };
            const filesWithoutConfig = [libFile, commonFile1, commonFile2];
            const host = createServerHost(filesWithoutConfig);

            const filesWithConfig = [libFile, commonFile1, commonFile2, configFile];
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            projectService.checkNumberOfProjects({ inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [commonFile1.path, libFile.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [commonFile2.path, libFile.path]);

            const configFileLocations = ["/", "/a/", "/a/b/"];
            const watchedFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]).concat(libFile.path);
            checkWatchedFiles(host, watchedFiles);

            // Add a tsconfig file
            host.reloadFS(filesWithConfig);
            host.checkTimeoutQueueLengthAndRun(2); // load configured project from disk + ensureProjectsForOpenFiles

            projectService.checkNumberOfProjects({ inferredProjects: 2, configuredProjects: 1 });
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            checkProjectActualFiles(projectService.inferredProjects[1], [commonFile2.path, libFile.path]);
            checkProjectActualFiles(projectService.configuredProjects.get(configFile.path)!, [libFile.path, commonFile1.path, configFile.path]);

            checkWatchedFiles(host, watchedFiles);

            // remove the tsconfig file
            host.reloadFS(filesWithoutConfig);

            projectService.checkNumberOfProjects({ inferredProjects: 2 });
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            checkProjectActualFiles(projectService.inferredProjects[1], [commonFile2.path, libFile.path]);

            host.checkTimeoutQueueLengthAndRun(1); // Refresh inferred projects

            projectService.checkNumberOfProjects({ inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [commonFile1.path, libFile.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [commonFile2.path, libFile.path]);
            checkWatchedFiles(host, watchedFiles);
        });

        it("add new files to a configured project without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            const configFileDir = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configFileDir, combinePaths(configFileDir, nodeModulesAtTypes)], /*recursive*/ true);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            // project service waits for 250ms to update the project structure, therefore the assertion needs to wait longer.
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path]);
            checkNumberOfInferredProjects(projectService, 1);
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

        it("handle recreated files correctly", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);

            // delete commonFile2
            host.reloadFS([commonFile1, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(project, [commonFile1.path]);

            // re-add commonFile2
            host.reloadFS([commonFile1, commonFile2, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("handles the missing files - that were added to program because they were added with ///<ref", () => {
            const file1: File = {
                path: "/a/b/commonFile1.ts",
                content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
            };
            const host = createServerHost([file1, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            checkNumberOfInferredProjects(projectService, 1);
            const project = projectService.inferredProjects[0];
            checkProjectRootFiles(project, [file1.path]);
            checkProjectActualFiles(project, [file1.path, libFile.path]);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );

            // Two errors: CommonFile2 not found and cannot find name y
            let diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_name_0, errorTextArguments: ["y"] },
                { diagnosticMessage: Diagnostics.File_0_not_found, errorTextArguments: [commonFile2.path] }
            ]);

            host.reloadFS([file1, commonFile2, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfInferredProjects(projectService, 1);
            assert.strictEqual(projectService.inferredProjects[0], project, "Inferred project should be same");
            checkProjectRootFiles(project, [file1.path]);
            checkProjectActualFiles(project, [file1.path, libFile.path, commonFile2.path]);
            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);
        });

        it("should create new inferred projects for files excluded from a configured project", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;
            host.reloadFS(files);

            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            host.checkTimeoutQueueLengthAndRun(2); // Update the configured project + refresh inferred projects
            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(project, [commonFile1.path]);

            projectService.openClientFile(commonFile2.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: File = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createServerHost([commonFile1, commonFile2, excludedFile1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            projectService.openClientFile(excludedFile1.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: File = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: File = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: File = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const randomFile: File = {
                path: "/a/file1.ts",
                content: `export interface T {}`
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            const files = [file1, nodeModuleFile, classicModuleFile, configFile, randomFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.openClientFile(nodeModuleFile.path);
            projectService.openClientFile(classicModuleFile.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            const inferredProject0 = projectService.inferredProjects[0];
            checkProjectActualFiles(project, [file1.path, nodeModuleFile.path, configFile.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [classicModuleFile.path]);

            configFile.content = `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`;
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(2);

            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 }); // will not remove project 1
            checkProjectActualFiles(project, [file1.path, classicModuleFile.path, configFile.path]);
            assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            const inferredProject1 = projectService.inferredProjects[1];
            checkProjectActualFiles(projectService.inferredProjects[1], [nodeModuleFile.path]);

            // Open random file and it will reuse first inferred project
            projectService.openClientFile(randomFile.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
            checkProjectActualFiles(project, [file1.path, classicModuleFile.path, configFile.path]);
            assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
            checkProjectActualFiles(projectService.inferredProjects[0], [randomFile.path]); // Reuses first inferred project
            assert.strictEqual(projectService.inferredProjects[1], inferredProject1);
            checkProjectActualFiles(projectService.inferredProjects[1], [nodeModuleFile.path]);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: File = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: File = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: File = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: File = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });
        it("should tolerate config file errors and still try to build a project", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [commonFile1.path, commonFile2.path]);
        });

        it("should disable features when the files are too large", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: "let x =1;",
                fileSize: 10 * 1024 * 1024
            };
            const file2 = {
                path: "/a/b/f2.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };
            const file3 = {
                path: "/a/b/f3.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };

            const proj1name = "proj1", proj2name = "proj2", proj3name = "proj3";

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file1.path]), options: {}, projectFileName: proj1name });
            const proj1 = projectService.findProject(proj1name)!;
            assert.isTrue(proj1.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file2.path]), options: {}, projectFileName: proj2name });
            const proj2 = projectService.findProject(proj2name)!;
            assert.isTrue(proj2.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file3.path]), options: {}, projectFileName: proj3name });
            const proj3 = projectService.findProject(proj3name)!;
            assert.isFalse(proj3.languageServiceEnabled);
        });

        it("should use only one inferred project if 'useOneInferredProject' is set", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const file2 = {
                path: "/a/c/main.ts",
                content: "let x =1;"
            };

            const file3 = {
                path: "/a/d/main.ts",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, file3, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);
            projectService.openClientFile(file3.path);

            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path, libFile.path]);


            host.reloadFS([file1, configFile, file2, file3, libFile]);
            host.checkTimeoutQueueLengthAndRun(2); // load configured project from disk + ensureProjectsForOpenFiles
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path, file3.path, libFile.path]);
        });

        it("should reuse same project if file is opened from the configured project that has no open files", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/b/main2.ts",
                content: "let y =1;"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts", "main2.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects.get(configFile.path)!;
            assert.isTrue(project.hasOpenRef()); // file1

            projectService.closeClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
            assert.isFalse(project.hasOpenRef()); // No open files
            assert.isFalse(project.isClosed());

            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
            assert.isTrue(project.hasOpenRef()); // file2
            assert.isFalse(project.isClosed());
        });

        it("should not close configured project after closing last open file, but should be closed on next file open if its not the file from same project", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, configFile, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            const project = projectService.configuredProjects.get(configFile.path)!;
            assert.isTrue(project.hasOpenRef()); // file1

            projectService.closeClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
            assert.isFalse(project.hasOpenRef()); // No files
            assert.isFalse(project.isClosed());

            projectService.openClientFile(libFile.path);
            checkNumberOfConfiguredProjects(projectService, 0);
            assert.isFalse(project.hasOpenRef()); // No files + project closed
            assert.isTrue(project.isClosed());
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
            projectService.applyChangesInOpenFiles(externalFiles, [], []);
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

        describe("ignoreConfigFiles", () => {
            it("external project including config file", () => {
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

                const externalProjectName = "externalproject";
                const host = createServerHost([file1, config1]);
                const projectService = createProjectService(host, { useSingleInferredProject: true }, { syntaxOnly: true });
                projectService.openExternalProject({
                    rootFiles: toExternalFiles([file1.path, config1.path]),
                    options: {},
                    projectFileName: externalProjectName
                });

                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const proj = projectService.externalProjects[0];
                assert.isDefined(proj);

                assert.isTrue(proj.fileExists(file1.path));
            });

            it("loose file included in config file (openClientFile)", () => {
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

                const host = createServerHost([file1, config1]);
                const projectService = createProjectService(host, { useSingleInferredProject: true }, { syntaxOnly: true });
                projectService.openClientFile(file1.path, file1.content);

                checkNumberOfProjects(projectService, { inferredProjects: 1 });
                const proj = projectService.inferredProjects[0];
                assert.isDefined(proj);

                assert.isTrue(proj.fileExists(file1.path));
            });

            it("loose file included in config file (applyCodeChanges)", () => {
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

                const host = createServerHost([file1, config1]);
                const projectService = createProjectService(host, { useSingleInferredProject: true }, { syntaxOnly: true });
                projectService.applyChangesInOpenFiles([{ fileName: file1.path, content: file1.content }], [], []);

                checkNumberOfProjects(projectService, { inferredProjects: 1 });
                const proj = projectService.inferredProjects[0];
                assert.isDefined(proj);

                assert.isTrue(proj.fileExists(file1.path));
            });
        });

        it("disable inferred project", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };

            const host = createServerHost([file1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true }, { syntaxOnly: true });

            projectService.openClientFile(file1.path, file1.content);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];
            assert.isDefined(proj);

            assert.isFalse(proj.languageServiceEnabled);
        });

        it("reload regular file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "x."
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: "let x: number;"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: toExternalFiles([f1.path, f2.path]), options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let x: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2, emptyOptions)!;
            // should contain completions for string
            assert.isTrue(completions1.entries.some(e => e.name === "charAt"), "should contain 'charAt'");
            assert.isFalse(completions1.entries.some(e => e.name === "toExponential"), "should not contain 'toExponential'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2, emptyOptions)!;
            // should contain completions for string
            assert.isFalse(completions2.entries.some(e => e.name === "charAt"), "should not contain 'charAt'");
            assert.isTrue(completions2.entries.some(e => e.name === "toExponential"), "should contain 'toExponential'");
        });

        it("clear mixed content file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: " "
            };
            const f2 = {
                path: "/a/b/lib.html",
                content: "<html/>"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: [{ fileName: f1.path }, { fileName: f2.path, hasMixedContent: true }], options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let somelongname: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0, emptyOptions)!;
            assert.isTrue(completions1.entries.some(e => e.name === "somelongname"), "should contain 'somelongname'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0, emptyOptions)!;
            assert.isFalse(completions2.entries.some(e => e.name === "somelongname"), "should not contain 'somelongname'");
            const sf2 = service.externalProjects[0].getLanguageService().getProgram()!.getSourceFile(f2.path)!;
            assert.equal(sf2.text, "");
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

        it("changes in closed files are reflected in project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export let x = 1`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const inferredProject0 = projectService.inferredProjects[0];
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path]);
            const inferredProject1 = projectService.inferredProjects[1];
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            const modifiedFile2 = {
                path: file2.path,
                content: `export * from "../c/f3"` // now inferred project should inclule file3
            };

            host.reloadFS([file1, modifiedFile2, file3]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, modifiedFile2.path, file3.path]);
            assert.strictEqual(projectService.inferredProjects[1], inferredProject1);
            assert.isTrue(inferredProject1.isOrphan());
        });

        it("deleted files affect project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(2);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);
        });

        it("ignores files excluded by a custom safe type list", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: "export let x = 5"
            };
            const office = {
                path: "/lib/duckquack-3.min.js",
                content: "whoa do @@ not parse me ok thanks!!!"
            };
            const host = createServerHost([file1, office, customTypesMap]);
            const projectService = createProjectService(host);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, office.path]) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["duck-types"]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("file with name constructor.js doesnt cause issue with typeAcquisition when safe type list", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: `export let x = 5; import { s } from "s"`
            };
            const constructorFile = {
                path: "/a/b/constructor.js",
                content: "const x = 10;"
            };
            const bliss = {
                path: "/a/b/bliss.js",
                content: "export function is() { return true; }"
            };
            const host = createServerHost([file1, libFile, constructorFile, bliss, customTypesMap]);
            let request: string | undefined;
            const cachePath = "/a/data";
            const typingsInstaller: server.ITypingsInstaller = {
                isKnownTypesPackageName: returnFalse,
                installPackage: notImplemented,
                inspectValue: notImplemented,
                enqueueInstallTypingsRequest: (proj, typeAcquisition, unresolvedImports) => {
                    assert.isUndefined(request);
                    request = JSON.stringify(server.createInstallTypingsRequest(proj, typeAcquisition, unresolvedImports || server.emptyArray, cachePath));
                },
                attach: noop,
                onProjectClosed: noop,
                globalTypingsCacheLocation: cachePath
            };

            const projectName = "project";
            const projectService = createProjectService(host, { typingsInstaller });
            projectService.openExternalProject({ projectFileName: projectName, options: {}, rootFiles: toExternalFiles([file1.path, constructorFile.path, bliss.path]) });
            assert.equal(request, JSON.stringify({
                projectName,
                fileNames: [libFile.path, file1.path, constructorFile.path, bliss.path],
                compilerOptions: { allowNonTsExtensions: true, noEmitForJsFiles: true },
                typeAcquisition: { include: ["blissfuljs"], exclude: [], enable: true },
                unresolvedImports: ["s"],
                projectRootPath: "/",
                cachePath,
                kind: "discover"
            }));
            const response = JSON.parse(request!);
            request = undefined;
            projectService.updateTypingsForProject({
                kind: "action::set",
                projectName: response.projectName,
                typeAcquisition: response.typeAcquisition,
                compilerOptions: response.compilerOptions,
                typings: emptyArray,
                unresolvedImports: response.unresolvedImports,
            });

            host.checkTimeoutQueueLengthAndRun(2);
            assert.isUndefined(request);
        });

        it("ignores files excluded by the default type list", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: "export let x = 5"
            };
            const minFile = {
                path: "/c/moment.min.js",
                content: "unspecified"
            };
            const kendoFile1 = {
                path: "/q/lib/kendo/kendo.all.min.js",
                content: "unspecified"
            };
            const kendoFile2 = {
                path: "/q/lib/kendo/kendo.ui.min.js",
                content: "unspecified"
            };
            const kendoFile3 = {
                path: "/q/lib/kendo-ui/kendo.all.js",
                content: "unspecified"
            };
            const officeFile1 = {
                path: "/scripts/Office/1/excel-15.debug.js",
                content: "unspecified"
            };
            const officeFile2 = {
                path: "/scripts/Office/1/powerpoint.js",
                content: "unspecified"
            };
            const files = [file1, minFile, kendoFile1, kendoFile2, kendoFile3, officeFile1, officeFile2];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles(files.map(f => f.path)) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["kendo-ui", "office"]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("removes version numbers correctly", () => {
            const testData: [string, string][] = [
                ["jquery-max", "jquery-max"],
                ["jquery.min", "jquery"],
                ["jquery-min.4.2.3", "jquery"],
                ["jquery.min.4.2.1", "jquery"],
                ["minimum", "minimum"],
                ["min", "min"],
                ["min.3.2", "min"],
                ["jquery", "jquery"]
            ];
            for (const t of testData) {
                assert.equal(removeMinAndVersionNumbers(t[0]), t[1], t[0]);
            }
        });

        it("ignores files excluded by a legacy safe type list", () => {
            const file1 = {
                path: "/a/b/bliss.js",
                content: "let x = 5"
            };
            const file2 = {
                path: "/a/b/foo.js",
                content: ""
            };
            const file3 = {
                path: "/a/b/Bacon.js",
                content: "let y = 5"
            };
            const host = createServerHost([file1, file2, file3, customTypesMap]);
            const projectService = createProjectService(host);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]), typeAcquisition: { enable: true } });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(), [file2.path]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("open file become a part of configured project if it is referenced from root file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: "export let y = 1"
            };
            const configFile = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
            };

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            host.reloadFS([file1, file2, file3, configFile]);
            host.checkTimeoutQueueLengthAndRun(2); // load configured project from disk + ensureProjectsForOpenFiles
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, file3.path, configFile.path]);
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            assert.isTrue(projectService.inferredProjects[1].isOrphan());
        });

        it("correctly migrate files between projects", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `
                export * from "../c/f2";
                export * from "../d/f3";`
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "export let x = 1;"
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "export let y = 1;"
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);
            let inferredProjects = projectService.inferredProjects.slice();

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProjects[0]);
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);
            inferredProjects = projectService.inferredProjects.slice();

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            assert.notStrictEqual(projectService.inferredProjects[0], inferredProjects[0]);
            assert.notStrictEqual(projectService.inferredProjects[0], inferredProjects[1]);
            checkProjectRootFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);
            inferredProjects = projectService.inferredProjects.slice();

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 3 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProjects[0]);
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[2], [file3.path]);
            inferredProjects = projectService.inferredProjects.slice();

            projectService.closeClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 3 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProjects[0]);
            assert.strictEqual(projectService.inferredProjects[1], inferredProjects[1]);
            assert.strictEqual(projectService.inferredProjects[2], inferredProjects[2]);
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
            assert.isTrue(projectService.inferredProjects[2].isOrphan());

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProjects[2]);
            assert.strictEqual(projectService.inferredProjects[1], inferredProjects[1]);
            checkProjectActualFiles(projectService.inferredProjects[0], [file3.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

            host.reloadFS([file1, file2, configFile]);

            host.checkTimeoutQueueLengthAndRun(2);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
        });

        it("can update configured project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, configFile.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
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

        it("regression test for crash in acquireOrUpdateDocument", () => {
            const tsFile = {
                fileName: "/a/b/file1.ts",
                path: "/a/b/file1.ts",
                content: ""
            };
            const jsFile = {
                path: "/a/b/file1.js",
                content: "var x = 10;",
                fileName: "/a/b/file1.js",
                scriptKind: "JS" as "JS"
            };

            const host = createServerHost([]);
            const projectService = createProjectService(host);
            projectService.applyChangesInOpenFiles([tsFile], [], []);
            const projs = projectService.synchronizeProjectList([]);
            projectService.findProject(projs[0].info!.projectName)!.getLanguageService().getNavigationBarItems(tsFile.fileName);
            projectService.synchronizeProjectList([projs[0].info!]);
            projectService.applyChangesInOpenFiles([jsFile], [], []);
        });

        it("config file is deleted", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 2;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createServerHost([file1, file2, config]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            host.reloadFS([file1, file2]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
        });

        it("loading files with correct priority", () => {
            const f1 = {
                path: "/a/main.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/main.js",
                content: "var y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { allowJs: true }
                })
            };
            const host = createServerHost([f1, f2, config]);
            const projectService = createProjectService(host);
            projectService.setHostConfiguration({
                extraFileExtensions: [
                    { extension: ".js", isMixedContent: false },
                    { extension: ".html", isMixedContent: true }
                ]
            });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, config.path]);

            // Should close configured project with next file open
            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f2.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            assert.isUndefined(projectService.configuredProjects.get(config.path));
            checkProjectActualFiles(projectService.inferredProjects[0], [f2.path]);
        });

        it("tsconfig script block support", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([file1, file2, config]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            // HTML file will not be included in any projects yet
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const configuredProj = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(configuredProj, [file1.path, config.path]);

            // Specify .html extension as mixed content
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest);

            // The configured project should now be updated to include html file
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(configuredProjectAt(projectService, 0), configuredProj, "Same configured project should be updated");
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Open HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/[{ fileName: file2.path, hasMixedContent: true, scriptKind: ScriptKind.JS, content: `var hello = "hello";` }],
                /*changedFiles*/ undefined,
                /*closedFiles*/ undefined);

            // Now HTML file is included in the project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Check identifiers defined in HTML content are available in .ts file
            const project = configuredProjectAt(projectService, 0);
            let completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 1, emptyOptions);
            assert(completions && completions.entries[0].name === "hello", `expected entry hello to be in completion list`);

            // Close HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/ undefined,
                /*closedFiles*/[file2.path]);

            // HTML file is still included in project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Check identifiers defined in HTML content are not available in .ts file
            completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 5, emptyOptions);
            assert(completions && completions.entries[0].name !== "hello", `unexpected hello entry in completion list`);
        });

        it("no tsconfig script block diagnostic errors", () => {

            //  #1. Ensure no diagnostic errors when allowJs is true
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };

            let host = createServerHost([file1, file2, config1, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            let session = createSession(host);

            // Specify .html extension as mixed content in a configure host request
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest);

            openFilesForSession([file1], session);
            let projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            let diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #2. Ensure no errors when allowJs is false
            const config2 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: false } })
            };

            host = createServerHost([file1, file2, config2, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest);

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #3. Ensure no errors when compiler options aren't specified
            const config3 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({})
            };

            host = createServerHost([file1, file2, config3, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest);

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly specified in tsconfig
            const config4 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, files: [file1.path, file2.path] })
            };

            host = createServerHost([file1, file2, config4, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest);

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly excluded in tsconfig
            const config5 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: [file2.path] })
            };

            host = createServerHost([file1, file2, config5, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest);

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
        });

        it("project structure update is deferred if files are not added\removed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `import {x} from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "export let x = 1"
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/[{ fileName: file1.path, changes: [{ span: createTextSpan(0, file1.path.length), newText: "let y = 1" }] }],
                /*closedFiles*/ undefined);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            projectService.ensureInferredProjectsUpToDate_TestOnly();
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
        });

        it("files with mixed content are handled correctly", () => {
            const file1 = {
                path: "/a/b/f1.html",
                content: `<html><script language="javascript">var x = 1;</></html>`
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host);
            const projectFileName = "projectFileName";
            projectService.openExternalProject({ projectFileName, options: {}, rootFiles: [{ fileName: file1.path, scriptKind: ScriptKind.JS, hasMixedContent: true }] });

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkWatchedFiles(host, [libFile.path]); // watching the "missing" lib file

            const project = projectService.externalProjects[0];

            const scriptInfo = project.getScriptInfo(file1.path)!;
            const snap = scriptInfo.getSnapshot();
            const actualText = getSnapshotText(snap);
            assert.equal(actualText, "", `expected content to be empty string, got "${actualText}"`);

            projectService.openClientFile(file1.path, `var x = 1;`);
            project.updateGraph();

            const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file1.path, 4)!;
            assert.equal(quickInfo.kind, ScriptElementKind.variableElement);

            projectService.closeClientFile(file1.path);

            const scriptInfo2 = project.getScriptInfo(file1.path)!;
            const actualText2 = getSnapshotText(scriptInfo2.getSnapshot());
            assert.equal(actualText2, "", `expected content to be empty string, got "${actualText2}"`);
        });

        it("project settings for inferred projects", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: `import {x} from "mod"`
            };
            const modFile = {
                path: "/a/mod.ts",
                content: "export let x: number"
            };
            const host = createServerHost([file1, modFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(modFile.path);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            const inferredProjects = projectService.inferredProjects.slice();
            checkProjectActualFiles(inferredProjects[0], [file1.path]);
            checkProjectActualFiles(inferredProjects[1], [modFile.path]);

            projectService.setCompilerOptionsForInferredProjects({ moduleResolution: ModuleResolutionKind.Classic });
            host.checkTimeoutQueueLengthAndRun(3);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            assert.strictEqual(projectService.inferredProjects[0], inferredProjects[0]);
            assert.strictEqual(projectService.inferredProjects[1], inferredProjects[1]);
            checkProjectActualFiles(inferredProjects[0], [file1.path, modFile.path]);
            assert.isTrue(inferredProjects[1].isOrphan());
        });

        it("syntax tree cache handles changes in project settings", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "{x: 1}"
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: false });
            projectService.openClientFile(file1.path);
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: true });
            projectService.getScriptInfo(file1.path)!.editContent(0, 0, " ");
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.closeClientFile(file1.path);
        });

        it("File in multiple projects at opened and closed correctly", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/c/f.ts",
                content: `/// <reference path="../b/app.ts"/>`
            };
            const tsconfig1 = {
                path: "/a/c/tsconfig.json",
                content: "{}"
            };
            const tsconfig2 = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, file2, tsconfig1, tsconfig2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project1 = projectService.configuredProjects.get(tsconfig1.path)!;
            assert.isTrue(project1.hasOpenRef(), "Has open ref count in project1 - 1"); // file2
            assert.equal(project1.getScriptInfo(file2.path)!.containingProjects.length, 1, "containing projects count");
            assert.isFalse(project1.isClosed());

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.isTrue(project1.hasOpenRef(), "Has open ref count in project1 - 2"); // file2
            assert.strictEqual(projectService.configuredProjects.get(tsconfig1.path), project1);
            assert.isFalse(project1.isClosed());

            const project2 = projectService.configuredProjects.get(tsconfig2.path)!;
            assert.isTrue(project2.hasOpenRef(), "Has open ref count in project2 - 2"); // file1
            assert.isFalse(project2.isClosed());

            assert.equal(project1.getScriptInfo(file1.path)!.containingProjects.length, 2, `${file1.path} containing projects count`);
            assert.equal(project1.getScriptInfo(file2.path)!.containingProjects.length, 1, `${file2.path} containing projects count`);

            projectService.closeClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.isFalse(project1.hasOpenRef(), "Has open ref count in project1 - 3"); // No files
            assert.isTrue(project2.hasOpenRef(), "Has open ref count in project2 - 3"); // file1
            assert.strictEqual(projectService.configuredProjects.get(tsconfig1.path), project1);
            assert.strictEqual(projectService.configuredProjects.get(tsconfig2.path), project2);
            assert.isFalse(project1.isClosed());
            assert.isFalse(project2.isClosed());

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.isFalse(project1.hasOpenRef(), "Has open ref count in project1 - 4"); // No files
            assert.isFalse(project2.hasOpenRef(), "Has open ref count in project2 - 4"); // No files
            assert.strictEqual(projectService.configuredProjects.get(tsconfig1.path), project1);
            assert.strictEqual(projectService.configuredProjects.get(tsconfig2.path), project2);
            assert.isFalse(project1.isClosed());
            assert.isFalse(project2.isClosed());

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(tsconfig1.path), project1);
            assert.isUndefined(projectService.configuredProjects.get(tsconfig2.path));
            assert.isTrue(project1.hasOpenRef(), "Has open ref count in project1 - 5"); // file2
            assert.isFalse(project1.isClosed());
            assert.isTrue(project2.isClosed());
        });

        it("Open ref of configured project when open file gets added to the project as part of configured file update", () => {
            const file1: File = {
                path: "/a/b/src/file1.ts",
                content: "let x = 1;"
            };
            const file2: File = {
                path: "/a/b/src/file2.ts",
                content: "let y = 1;"
            };
            const file3: File = {
                path: "/a/b/file3.ts",
                content: "let z = 1;"
            };
            const file4: File = {
                path: "/a/file4.ts",
                content: "let z = 1;"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: ["src/file1.ts", "file3.ts"] })
            };

            const files = [file1, file2, file3, file4];
            const host = createServerHost(files.concat(configFile));
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);
            projectService.openClientFile(file3.path);
            projectService.openClientFile(file4.path);

            const infos = files.map(file => projectService.getScriptInfoForPath(file.path as Path)!);
            checkOpenFiles(projectService, files);
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
            const configProject1 = projectService.configuredProjects.get(configFile.path)!;
            assert.isTrue(configProject1.hasOpenRef()); // file1 and file3
            checkProjectActualFiles(configProject1, [file1.path, file3.path, configFile.path]);
            const inferredProject1 = projectService.inferredProjects[0];
            checkProjectActualFiles(inferredProject1, [file2.path]);
            const inferredProject2 = projectService.inferredProjects[1];
            checkProjectActualFiles(inferredProject2, [file4.path]);

            configFile.content = "{}";
            host.reloadFS(files.concat(configFile));
            host.runQueuedTimeoutCallbacks();

            verifyScriptInfos();
            checkOpenFiles(projectService, files);
            verifyConfiguredProjectStateAfterUpdate(/*hasOpenRef*/ true, 2); // file1, file2, file3
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            const inferredProject3 = projectService.inferredProjects[1];
            checkProjectActualFiles(inferredProject3, [file4.path]);
            assert.strictEqual(inferredProject3, inferredProject2);

            projectService.closeClientFile(file1.path);
            projectService.closeClientFile(file2.path);
            projectService.closeClientFile(file4.path);

            verifyScriptInfos();
            checkOpenFiles(projectService, [file3]);
            verifyConfiguredProjectStateAfterUpdate(/*hasOpenRef*/ true, 2); // file3
            assert.isTrue(projectService.inferredProjects[0].isOrphan());
            assert.isTrue(projectService.inferredProjects[1].isOrphan());

            projectService.openClientFile(file4.path);
            verifyScriptInfos();
            checkOpenFiles(projectService, [file3, file4]);
            verifyConfiguredProjectStateAfterUpdate(/*hasOpenRef*/ true, 1); // file3
            const inferredProject4 = projectService.inferredProjects[0];
            checkProjectActualFiles(inferredProject4, [file4.path]);

            projectService.closeClientFile(file3.path);
            verifyScriptInfos();
            checkOpenFiles(projectService, [file4]);
            verifyConfiguredProjectStateAfterUpdate(/*hasOpenRef*/ false, 1); // No open files
            const inferredProject5 = projectService.inferredProjects[0];
            checkProjectActualFiles(inferredProject4, [file4.path]);
            assert.strictEqual(inferredProject5, inferredProject4);

            const file5: File = {
                path: "/file5.ts",
                content: "let zz = 1;"
            };
            host.reloadFS(files.concat(configFile, file5));
            projectService.openClientFile(file5.path);
            verifyScriptInfosAreUndefined([file1, file2, file3]);
            assert.strictEqual(projectService.getScriptInfoForPath(file4.path as Path), find(infos, info => info.path === file4.path));
            assert.isDefined(projectService.getScriptInfoForPath(file5.path as Path));
            checkOpenFiles(projectService, [file4, file5]);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file4.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file5.path]);

            function verifyScriptInfos() {
                infos.forEach(info => assert.strictEqual(projectService.getScriptInfoForPath(info.path), info));
            }

            function verifyScriptInfosAreUndefined(files: File[]) {
                for (const file of files) {
                    assert.isUndefined(projectService.getScriptInfoForPath(file.path as Path));
                }
            }

            function verifyConfiguredProjectStateAfterUpdate(hasOpenRef: boolean, inferredProjects: number) {
                checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects });
                const configProject2 = projectService.configuredProjects.get(configFile.path)!;
                assert.strictEqual(configProject2, configProject1);
                checkProjectActualFiles(configProject2, [file1.path, file2.path, file3.path, configFile.path]);
                assert.equal(configProject2.hasOpenRef(), hasOpenRef);
            }
        });

        it("Open ref of configured project when open file gets added to the project as part of configured file update buts its open file references are all closed when the update happens", () => {
            const file1: File = {
                path: "/a/b/src/file1.ts",
                content: "let x = 1;"
            };
            const file2: File = {
                path: "/a/b/src/file2.ts",
                content: "let y = 1;"
            };
            const file3: File = {
                path: "/a/b/file3.ts",
                content: "let z = 1;"
            };
            const file4: File = {
                path: "/a/file4.ts",
                content: "let z = 1;"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: ["src/file1.ts", "file3.ts"] })
            };

            const files = [file1, file2, file3];
            const hostFiles = files.concat(file4, configFile);
            const host = createServerHost(hostFiles);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);
            projectService.openClientFile(file3.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
            const configuredProject = projectService.configuredProjects.get(configFile.path)!;
            assert.isTrue(configuredProject.hasOpenRef()); // file1 and file3
            checkProjectActualFiles(configuredProject, [file1.path, file3.path, configFile.path]);
            const inferredProject1 = projectService.inferredProjects[0];
            checkProjectActualFiles(inferredProject1, [file2.path]);

            projectService.closeClientFile(file1.path);
            projectService.closeClientFile(file3.path);
            assert.isFalse(configuredProject.hasOpenRef()); // No files

            configFile.content = "{}";
            host.reloadFS(files.concat(configFile));
            // Time out is not yet run so there is project update pending
            assert.isTrue(configuredProject.hasOpenRef()); // Pending update and file2 might get into the project

            projectService.openClientFile(file4.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), configuredProject);
            assert.isTrue(configuredProject.hasOpenRef()); // Pending update and F2 might get into the project
            assert.strictEqual(projectService.inferredProjects[0], inferredProject1);
            const inferredProject2 = projectService.inferredProjects[1];
            checkProjectActualFiles(inferredProject2, [file4.path]);

            host.runQueuedTimeoutCallbacks();
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), configuredProject);
            assert.isTrue(configuredProject.hasOpenRef()); // file2
            checkProjectActualFiles(configuredProject, [file1.path, file2.path, file3.path, configFile.path]);
            assert.strictEqual(projectService.inferredProjects[0], inferredProject1);
            assert.isTrue(inferredProject1.isOrphan());
            assert.strictEqual(projectService.inferredProjects[1], inferredProject2);
            checkProjectActualFiles(inferredProject2, [file4.path]);
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

        it("files are properly detached when language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "var x = 1"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const f3 = {
                path: "/a/lib.js",
                content: "var x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([f1, f2, f3, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const project = projectService.configuredProjects.get(config.path)!;
            assert.isTrue(project.hasOpenRef()); // f1
            assert.isFalse(project.isClosed());

            projectService.closeClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(config.path), project);
            assert.isFalse(project.hasOpenRef()); // No files
            assert.isFalse(project.isClosed());

            for (const f of [f1, f2, f3]) {
                // All the script infos should be present and contain the project since it is still alive.
                const scriptInfo = projectService.getScriptInfoForNormalizedPath(server.toNormalizedPath(f.path))!;
                assert.equal(scriptInfo.containingProjects.length, 1, `expect 1 containing projects for '${f.path}'`);
                assert.equal(scriptInfo.containingProjects[0], project, `expect configured project to be the only containing project for '${f.path}'`);
            }

            const f4 = {
                path: "/aa.js",
                content: "var x = 1"
            };
            host.reloadFS([f1, f2, f3, config, f4]);
            projectService.openClientFile(f4.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            assert.isFalse(project.hasOpenRef()); // No files
            assert.isTrue(project.isClosed());

            for (const f of [f1, f2, f3]) {
                // All the script infos should not be present since the project is closed and orphan script infos are collected
                assert.isUndefined(projectService.getScriptInfoForNormalizedPath(server.toNormalizedPath(f.path)));
            }
        });

        it("language service disabled events are triggered", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const configWithExclude = {
                path: config.path,
                content: JSON.stringify({ exclude: ["largefile.js"] })
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const { session, events } = createSessionWithEventTracking<server.ProjectLanguageServiceStateEvent>(host, server.ProjectLanguageServiceStateEvent);
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.equal(events.length, 1, "should receive event");
            assert.equal(events[0].data.project, project, "project name");
            assert.equal(events[0].data.project.getProjectName(), config.path, "config path");
            assert.isFalse(events[0].data.languageServiceEnabled, "Language service state");

            host.reloadFS([f1, f2, configWithExclude]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isTrue(project.languageServiceEnabled, "Language service enabled");
            assert.equal(events.length, 2, "should receive event");
            assert.equal(events[1].data.project, project, "project");
            assert.equal(events[1].data.project.getProjectName(), config.path, "config path");
            assert.isTrue(events[1].data.languageServiceEnabled, "Language service state");
        });

        it("syntactic features work even if language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x =   1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);
            const { session, events } = createSessionWithEventTracking<server.ProjectLanguageServiceStateEvent>(host, server.ProjectLanguageServiceStateEvent);
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.equal(events.length, 1, "should receive event");
            assert.equal(events[0].data.project, project, "project name");
            assert.isFalse(events[0].data.languageServiceEnabled, "Language service state");

            const options = projectService.getFormatCodeOptions(f1.path as server.NormalizedPath);
            const edits = project.getLanguageService().getFormattingEditsForDocument(f1.path, options);
            assert.deepEqual(edits, [{ span: createTextSpan(/*start*/ 7, /*length*/ 3), newText: " " }]);
        });

        it("snapshot from different caches are incompatible", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([f1]);
            const projectFileName = "/a/b/proj.csproj";
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName,
                rootFiles: [toExternalFile(f1.path)],
                options: {}
            });
            projectService.openClientFile(f1.path, "let x = 1;\nlet y = 2;");

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const navbar = projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            assert.equal(navbar[0].spans[0].length, f1.content.length);
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

        it("Getting errors from closed script info does not throw exception (because of getting project from orphan script info)", () => {
            const { logger, hasErrorMsg } = createHasErrorMessageLogger();
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createServerHost([f1, libFile, config]);
            const session = createSession(host, { logger });
            session.executeCommandSeq(<protocol.OpenRequest>{
                command: server.CommandNames.Open,
                arguments: {
                    file: f1.path
                }
            });
            session.executeCommandSeq(<protocol.CloseRequest>{
                command: server.CommandNames.Close,
                arguments: {
                    file: f1.path
                }
            });
            session.executeCommandSeq(<protocol.GeterrRequest>{
                command: server.CommandNames.Geterr,
                arguments: {
                    delay: 0,
                    files: [f1.path]
                }
            });
            assert.isFalse(hasErrorMsg());
        });

        it("Changed module resolution reflected when specifying files list", () => {
            const file1: File = {
                path: "/a/b/file1.ts",
                content: 'import classc from "file2"'
            };
            const file2a: File = {
                path: "/a/file2.ts",
                content: "export classc { method2a() { return 10; } }"
            };
            const file2: File = {
                path: "/a/b/file2.ts",
                content: "export classc { method2() { return 10; } }"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: [file1.path], compilerOptions: { module: "amd" } })
            };
            const files = [file1, file2a, configFile, libFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects.get(configFile.path)!;
            assert.isDefined(project);
            checkProjectActualFiles(project, map(files, file => file.path));
            checkWatchedFiles(host, mapDefined(files, file => file === file1 ? undefined : file.path));
            checkWatchedDirectoriesDetailed(host, ["/a/b"], 1, /*recursive*/ false);
            checkWatchedDirectoriesDetailed(host, ["/a/b/node_modules/@types"], 1, /*recursive*/ true);

            files.push(file2);
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
            checkProjectActualFiles(project, mapDefined(files, file => file === file2a ? undefined : file.path));
            checkWatchedFiles(host, mapDefined(files, file => file === file1 ? undefined : file.path));
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectoriesDetailed(host, ["/a/b/node_modules/@types"], 1, /*recursive*/ true);

            // On next file open the files file2a should be closed and not watched any more
            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
            checkProjectActualFiles(project, mapDefined(files, file => file === file2a ? undefined : file.path));
            checkWatchedFiles(host, [libFile.path, configFile.path]);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectoriesDetailed(host, ["/a/b/node_modules/@types"], 1, /*recursive*/ true);

        });

        it("Failed lookup locations uses parent most node_modules directory", () => {
            const root = "/user/username/rootfolder";
            const file1: File = {
                path: "/a/b/src/file1.ts",
                content: 'import { classc } from "module1"'
            };
            const module1: File = {
                path: "/a/b/node_modules/module1/index.d.ts",
                content: `import { class2 } from "module2";
                          export classc { method2a(): class2; }`
            };
            const module2: File = {
                path: "/a/b/node_modules/module2/index.d.ts",
                content: "export class2 { method2() { return 10; } }"
            };
            const module3: File = {
                path: "/a/b/node_modules/module/node_modules/module3/index.d.ts",
                content: "export class3 { method2() { return 10; } }"
            };
            const configFile: File = {
                path: "/a/b/src/tsconfig.json",
                content: JSON.stringify({ files: ["file1.ts"] })
            };
            const nonLibFiles = [file1, module1, module2, module3, configFile];
            nonLibFiles.forEach(f => f.path = root + f.path);
            const files = nonLibFiles.concat(libFile);
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects.get(configFile.path)!;
            assert.isDefined(project);
            checkProjectActualFiles(project, [file1.path, libFile.path, module1.path, module2.path, configFile.path]);
            checkWatchedFiles(host, [libFile.path, configFile.path]);
            checkWatchedDirectories(host, [], /*recursive*/ false);
            const watchedRecursiveDirectories = getTypeRootsFromLocation(root + "/a/b/src");
            watchedRecursiveDirectories.push(`${root}/a/b/src/node_modules`, `${root}/a/b/node_modules`);
            checkWatchedDirectories(host, watchedRecursiveDirectories, /*recursive*/ true);
        });

        it("Properly handle Windows-style outDir", () => {
            const configFile: File = {
                path: "C:\\a\\tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        outDir: `C:\\a\\b`
                    },
                    include: ["*.ts"]
                })
            };
            const file1: File = {
                path: "C:\\a\\f1.ts",
                content: "let x = 1;"
            };

            const host = createServerHost([file1, configFile], { useWindowsStylePaths: true });
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [normalizePath(file1.path), normalizePath(configFile.path)]);
            const options = project.getCompilerOptions();
            assert.equal(options.outDir, "C:/a/b", "");
        });

        it("dynamic file without external project", () => {
            const file: File = {
                path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
                content: "var x = 10;"
            };
            const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
            projectService.setCompilerOptionsForInferredProjects({
                module: ModuleKind.CommonJS,
                allowJs: true,
                allowSyntheticDefaultImports: true,
                allowNonTsExtensions: true
            });
            projectService.openClientFile(file.path, "var x = 10;");

            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            const project = projectService.inferredProjects[0];
            checkProjectRootFiles(project, [file.path]);
            checkProjectActualFiles(project, [file.path, libFile.path]);

            assert.strictEqual(projectService.ensureDefaultProjectForFile(server.toNormalizedPath(file.path)), project);
            const indexOfX = file.content.indexOf("x");
            assert.deepEqual(project.getLanguageService(/*ensureSynchronized*/ true).getQuickInfoAtPosition(file.path, indexOfX), {
                kind: ScriptElementKind.variableElement,
                kindModifiers: "",
                textSpan: { start: indexOfX, length: 1 },
                displayParts: [
                    { text: "var", kind: "keyword" },
                    { text: " ", kind: "space" },
                    { text: "x", kind: "localName" },
                    { text: ":", kind: "punctuation" },
                    { text: " ", kind: "space" },
                    { text: "number", kind: "keyword" }
                ],
                documentation: [],
                tags: undefined,
            });
        });

        it("dynamic file with reference paths without external project", () => {
            const file: File = {
                path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
                content: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />
/// <reference path="../../../../../../typings/@epic/Shell.d.ts" />
var x = 10;`
            };
            const host = createServerHost([libFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file.path, file.content);

            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            const project = projectService.inferredProjects[0];
            checkProjectRootFiles(project, [file.path]);
            checkProjectActualFiles(project, [file.path, libFile.path]);
        });

        it("files opened, closed affecting multiple projects", () => {
            const file: File = {
                path: "/a/b/projects/config/file.ts",
                content: `import {a} from "../files/file1"; export let b = a;`
            };
            const config: File = {
                path: "/a/b/projects/config/tsconfig.json",
                content: ""
            };
            const filesFile1: File = {
                path: "/a/b/projects/files/file1.ts",
                content: "export let a = 10;"
            };
            const filesFile2: File = {
                path: "/a/b/projects/files/file2.ts",
                content: "export let aa = 10;"
            };

            const files = [config, file, filesFile1, filesFile2, libFile];
            const host = createServerHost(files);
            const session = createSession(host);
            // Create configured project
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: {
                    file: file.path
                }
            });

            const projectService = session.getProjectService();
            const configuredProject = projectService.configuredProjects.get(config.path)!;
            verifyConfiguredProject();

            // open files/file1 = should not create another project
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: {
                    file: filesFile1.path
                }
            });
            verifyConfiguredProject();

            // Close the file = should still have project
            session.executeCommandSeq<protocol.CloseRequest>({
                command: protocol.CommandTypes.Close,
                arguments: {
                    file: file.path
                }
            });
            verifyConfiguredProject();

            // Open files/file2 - should create inferred project and close configured project
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: {
                    file: filesFile2.path
                }
            });
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [libFile.path, filesFile2.path]);

            // Actions on file1 would result in assert
            session.executeCommandSeq<protocol.OccurrencesRequest>({
                command: protocol.CommandTypes.Occurrences,
                arguments: {
                    file: filesFile1.path,
                    line: 1,
                    offset: filesFile1.content.indexOf("a")
                }
            });

            function verifyConfiguredProject() {
                checkNumberOfProjects(projectService, { configuredProjects: 1 });
                checkProjectActualFiles(configuredProject, [file.path, filesFile1.path, libFile.path, config.path]);
            }
        });

        it("requests are done on file on pendingReload but has svc for previous version", () => {
            const projectLocation = "/user/username/projects/project";
            const file1: File = {
                path: `${projectLocation}/src/file1.ts`,
                content: `import { y } from "./file2"; let x = 10;`
            };
            const file2: File = {
                path: `${projectLocation}/src/file2.ts`,
                content: "export let y = 10;"
            };
            const config: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: "{}"
            };
            const files = [file1, file2, libFile, config];
            const host = createServerHost(files);
            const session = createSession(host);
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: file2.path, fileContent: file2.content }
            });
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: file1.path }
            });
            session.executeCommandSeq<protocol.CloseRequest>({
                command: protocol.CommandTypes.Close,
                arguments: { file: file2.path }
            });

            file2.content += "export let z = 10;";
            host.reloadFS(files);
            // Do not let the timeout runs, before executing command
            const startOffset = file2.content.indexOf("y") + 1;
            session.executeCommandSeq<protocol.GetApplicableRefactorsRequest>({
                command: protocol.CommandTypes.GetApplicableRefactors,
                arguments: { file: file2.path, startLine: 1, startOffset, endLine: 1, endOffset: startOffset + 1 }
            });
        });

        describe("getApplicableRefactors", () => {
            it("works when taking position", () => {
                const aTs: File = { path: "/a.ts", content: "" };
                const session = createSession(createServerHost([aTs]));
                openFilesForSession([aTs], session);
                const response = executeSessionRequest<protocol.GetApplicableRefactorsRequest, protocol.GetApplicableRefactorsResponse>(
                    session, protocol.CommandTypes.GetApplicableRefactors, { file: aTs.path, line: 1, offset: 1 });
                assert.deepEqual<ReadonlyArray<protocol.ApplicableRefactorInfo> | undefined>(response, []);
            });
        });

        describe("includes deferred files in the project context", () => {
            function verifyDeferredContext(lazyConfiguredProjectsFromExternalProject: boolean) {
                const file1 = {
                    path: "/a.deferred",
                    content: "const a = 1;"
                };
                // Deferred extensions should not affect JS files.
                const file2 = {
                    path: "/b.js",
                    content: "const b = 1;"
                };
                const tsconfig = {
                    path: "/tsconfig.json",
                    content: ""
                };

                const host = createServerHost([file1, file2, tsconfig]);
                const session = createSession(host);
                const projectService = session.getProjectService();
                session.executeCommandSeq<protocol.ConfigureRequest>({
                    command: protocol.CommandTypes.Configure,
                    arguments: { preferences: { lazyConfiguredProjectsFromExternalProject } }
                });

                // Configure the deferred extension.
                const extraFileExtensions = [{ extension: ".deferred", scriptKind: ScriptKind.Deferred, isMixedContent: true }];
                const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
                session.executeCommand(configureHostRequest);

                // Open external project
                const projectName = "/proj1";
                projectService.openExternalProject({
                    projectFileName: projectName,
                    rootFiles: toExternalFiles([file1.path, file2.path, tsconfig.path]),
                    options: {}
                });

                // Assert
                checkNumberOfProjects(projectService, { configuredProjects: 1 });

                const configuredProject = configuredProjectAt(projectService, 0);
                if (lazyConfiguredProjectsFromExternalProject) {
                    // configured project is just created and not yet loaded
                    checkProjectActualFiles(configuredProject, emptyArray);
                    projectService.ensureInferredProjectsUpToDate_TestOnly();
                }
                checkProjectActualFiles(configuredProject, [file1.path, tsconfig.path]);

                // Allow allowNonTsExtensions will be set to true for deferred extensions.
                assert.isTrue(configuredProject.getCompilerOptions().allowNonTsExtensions);
            }

            it("when lazyConfiguredProjectsFromExternalProject not set", () => {
                verifyDeferredContext(/*lazyConfiguredProjectsFromExternalProject*/ false);
            });
            it("when lazyConfiguredProjectsFromExternalProject is set", () => {
                verifyDeferredContext(/*lazyConfiguredProjectsFromExternalProject*/ true);
            });
        });

        it("Orphan source files are handled correctly on watch trigger", () => {
            const projectLocation = "/user/username/projects/project";
            const file1: File = {
                path: `${projectLocation}/src/file1.ts`,
                content: `export let x = 10;`
            };
            const file2: File = {
                path: `${projectLocation}/src/file2.ts`,
                content: "export let y = 10;"
            };
            const configContent1 = JSON.stringify({
                files: ["src/file1.ts", "src/file2.ts"]
            });
            const config: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: configContent1
            };
            const files = [file1, file2, libFile, config];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(file1.path);
            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [file1.path, file2.path, libFile.path, config.path]);

            const configContent2 = JSON.stringify({
                files: ["src/file1.ts"]
            });
            config.content = configContent2;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();

            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [file1.path, libFile.path, config.path]);
            verifyFile2InfoIsOrphan();

            file2.content += "export let z = 10;";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();

            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [file1.path, libFile.path, config.path]);
            verifyFile2InfoIsOrphan();

            function verifyFile2InfoIsOrphan() {
                const info = Debug.assertDefined(service.getScriptInfoForPath(file2.path as Path));
                assert.equal(info.containingProjects.length, 0);
            }
        });

        it("handles delayed directory watch invoke on file creation", () => {
            const projectRootPath = "/users/username/projects/project";
            const fileB: File = {
                path: `${projectRootPath}/b.ts`,
                content: "export const b = 10;"
            };
            const fileA: File = {
                path: `${projectRootPath}/a.ts`,
                content: "export const a = 10;"
            };
            const fileSubA: File = {
                path: `${projectRootPath}/sub/a.ts`,
                content: fileA.content
            };
            const config: File = {
                path: `${projectRootPath}/tsconfig.json`,
                content: "{}"
            };
            const files = [fileSubA, fileB, config, libFile];
            const host = createServerHost(files);
            const { logger, hasErrorMsg } = createHasErrorMessageLogger();
            const session = createSession(host, { canUseEvents: true, noGetErrOnBackgroundUpdate: true, logger });
            openFile(fileB);
            openFile(fileSubA);

            const services = session.getProjectService();
            checkNumberOfProjects(services, { configuredProjects: 1 });
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, files.map(f => f.path));
            host.checkTimeoutQueueLengthAndRun(0);

            // This should schedule 2 timeouts for ensuring project structure and ensuring projects for open file
            const filesWithFileA = files.map(f => f === fileSubA ? fileA : f);
            host.reloadFS(files.map(f => f === fileSubA ? fileA : f));
            host.checkTimeoutQueueLength(2);

            closeFilesForSession([fileSubA], session);
            // This should cancel existing updates and schedule new ones
            host.checkTimeoutQueueLength(2);
            checkNumberOfProjects(services, { configuredProjects: 1 });
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, files.map(f => f.path));

            // Open the fileA (as if rename)
            openFile(fileA);

            // config project is updated to check if fileA is present in it
            checkNumberOfProjects(services, { configuredProjects: 1 });
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, filesWithFileA.map(f => f.path));

            // Run the timeout for updating configured project and ensuring projects for open file
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, filesWithFileA.map(f => f.path));

            // file is deleted but watches are not yet invoked
            const originalFileExists = host.fileExists;
            host.fileExists = s => s === fileA.path ? false : originalFileExists.call(host, s);
            closeFilesForSession([fileA], session);
            host.checkTimeoutQueueLength(2); // Update configured project and projects for open file
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, filesWithFileA.map(f => f.path));

            // host.fileExists = originalFileExists;
            openFile(fileSubA);
            // This should create inferred project since fileSubA not on the disk
            checkProjectActualFiles(services.configuredProjects.get(config.path)!, mapDefined(filesWithFileA, f => f === fileA ? undefined : f.path));
            checkProjectActualFiles(services.inferredProjects[0], [fileSubA.path, libFile.path]);

            host.checkTimeoutQueueLengthAndRun(2); // Update configured project and projects for open file
            host.fileExists = originalFileExists;

            // Actually trigger the file move
            host.reloadFS(files);
            host.checkTimeoutQueueLength(2);
            const fileBErrorTimeoutId = host.getNextTimeoutId();

            session.executeCommandSeq<protocol.GeterrRequest>({
                command: protocol.CommandTypes.Geterr,
                arguments: {
                    files: [fileB.path, fileSubA.path],
                    delay: 0
                }
            });
            const getErrSeqId = session.getSeq();
            host.checkTimeoutQueueLength(3);

            session.clearMessages();
            host.runQueuedTimeoutCallbacks(fileBErrorTimeoutId);
            checkErrorMessage(session, "syntaxDiag", { file: fileB.path, diagnostics: [] });

            session.clearMessages();
            host.runQueuedImmediateCallbacks();
            checkErrorMessage(session, "semanticDiag", { file: fileB.path, diagnostics: [] });

            session.clearMessages();
            const fileSubAErrorTimeoutId = host.getNextTimeoutId();
            host.runQueuedImmediateCallbacks();
            checkErrorMessage(session, "suggestionDiag", { file: fileB.path, diagnostics: [] });

            session.clearMessages();
            host.checkTimeoutQueueLength(3);
            host.runQueuedTimeoutCallbacks(fileSubAErrorTimeoutId);
            checkCompleteEvent(session, 1, getErrSeqId);
            assert.isFalse(hasErrorMsg());

            function openFile(file: File) {
                openFilesForSession([{ file, projectRootPath }], session);
            }
        });

        function createSessionWithEventHandler(host: TestServerHost) {
            const { session, events: surveyEvents } = createSessionWithEventTracking<server.SurveyReady>(host, server.SurveyReady);

            return { session, verifySurveyReadyEvent };

            function verifySurveyReadyEvent(numberOfEvents: number) {
                assert.equal(surveyEvents.length, numberOfEvents);
                const expectedEvents = numberOfEvents === 0 ? [] : [{
                    eventName: server.SurveyReady,
                    data: { surveyId: "checkJs" }
                }];
                assert.deepEqual(surveyEvents, expectedEvents);
            }
        }

        it("doesn't log an event when checkJs isn't set", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            const service = session.getProjectService();
            openFilesForSession([file], session);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, [file.path, tsconfig.path]);

            verifySurveyReadyEvent(0);
        });

        it("logs an event when checkJs is set", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { checkJs: true } }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });

        it("logs an event when checkJs is set, only the first time", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const rando: File = {
                path: `/rando/calrissian.ts`,
                content: "export function f() { }"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { checkJs: true } }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);

            closeFilesForSession([file], session);
            openFilesForSession([rando], session);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });

        it("logs an event when checkJs is set after closing and reopening", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const rando: File = {
                path: `/rando/calrissian.ts`,
                content: "export function f() { }"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({}),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(0);

            closeFilesForSession([file], session);
            openFilesForSession([rando], session);
            host.writeFile(tsconfig.path, JSON.stringify({ compilerOptions: { checkJs: true } }));
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });

        describe("CompileOnSaveAffectedFileListRequest with and without projectFileName in request", () => {
            const projectRoot = "/user/username/projects/myproject";
            const core: File = {
                path: `${projectRoot}/core/core.ts`,
                content: "let z = 10;"
            };
            const app1: File = {
                path: `${projectRoot}/app1/app.ts`,
                content: "let x = 10;"
            };
            const app2: File = {
                path: `${projectRoot}/app2/app.ts`,
                content: "let y = 10;"
            };
            const app1Config: File = {
                path: `${projectRoot}/app1/tsconfig.json`,
                content: JSON.stringify({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true
                })
            };
            const app2Config: File = {
                path: `${projectRoot}/app2/tsconfig.json`,
                content: JSON.stringify({
                    files: ["app.ts", "../core/core.ts"],
                    compilerOptions: { outFile: "build/output.js" },
                    compileOnSave: true
                })
            };
            const files = [libFile, core, app1, app2, app1Config, app2Config];

            function insertString(session: TestSession, file: File) {
                session.executeCommandSeq<protocol.ChangeRequest>({
                    command: protocol.CommandTypes.Change,
                    arguments: {
                        file: file.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: "let k = 1"
                    }
                });
            }

            function getSession() {
                const host = createServerHost(files);
                const session = createSession(host);
                openFilesForSession([app1, app2, core], session);
                const service = session.getProjectService();
                checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                const project1 = service.configuredProjects.get(app1Config.path)!;
                const project2 = service.configuredProjects.get(app2Config.path)!;
                checkProjectActualFiles(project1, [libFile.path, app1.path, core.path, app1Config.path]);
                checkProjectActualFiles(project2, [libFile.path, app2.path, core.path, app2Config.path]);
                insertString(session, app1);
                insertString(session, app2);
                assert.equal(project1.dirty, true);
                assert.equal(project2.dirty, true);
                return session;
            }

            it("when projectFile is specified", () => {
                const session = getSession();
                const response = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                    command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: {
                        file: core.path,
                        projectFileName: app1Config.path
                    }
                }).response;
                assert.deepEqual(response, [
                    { projectFileName: app1Config.path, fileNames: [core.path, app1.path], projectUsesOutFile: true }
                ]);
                assert.equal(session.getProjectService().configuredProjects.get(app1Config.path)!.dirty, false);
                assert.equal(session.getProjectService().configuredProjects.get(app2Config.path)!.dirty, true);
            });

            it("when projectFile is not specified", () => {
                const session = getSession();
                const response = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                    command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: {
                        file: core.path
                    }
                }).response;
                assert.deepEqual(response, [
                    { projectFileName: app1Config.path, fileNames: [core.path, app1.path], projectUsesOutFile: true },
                    { projectFileName: app2Config.path, fileNames: [core.path, app2.path], projectUsesOutFile: true }
                ]);
                assert.equal(session.getProjectService().configuredProjects.get(app1Config.path)!.dirty, false);
                assert.equal(session.getProjectService().configuredProjects.get(app2Config.path)!.dirty, false);
            });
        });
    });

    describe("tsserverProjectSystem non-existing directories listed in config file input array", () => {
        it("should be tolerated without crashing the server", () => {
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }`
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "let t = 10;"
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            host.runQueuedTimeoutCallbacks();
            // Since there is no file open from configFile it would be closed
            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);

            const inferredProject = projectService.inferredProjects[0];
            assert.isTrue(inferredProject.containsFile(<server.NormalizedPath>file1.path));
        });

        it("should be able to handle @types if input file list is empty", () => {
            const f = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compiler: {},
                    files: []
                })
            };
            const t1 = {
                path: "/a/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`
            };
            const t2 = {
                path: "/a/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`
            };
            const host = createServerHost([f, config, t1, t2], { currentDirectory: getDirectoryPath(f.path) });
            const projectService = createProjectService(host);

            projectService.openClientFile(f.path);
            // Since no file from the configured project is open, it would be closed immediately
            projectService.checkNumberOfProjects({ configuredProjects: 0, inferredProjects: 1 });
        });

        it("should tolerate invalid include files that start in subDirectory", () => {
            const projectFolder = "/user/username/projects/myproject";
            const f = {
                path: `${projectFolder}/src/server/index.ts`,
                content: "let x = 1"
            };
            const config = {
                path: `${projectFolder}/src/server/tsconfig.json`,
                content: JSON.stringify({
                    compiler: {
                        module: "commonjs",
                        outDir: "../../build"
                    },
                    include: [
                        "../src/**/*.ts"
                    ]
                })
            };
            const host = createServerHost([f, config, libFile], { useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);

            projectService.openClientFile(f.path);
            // Since no file from the configured project is open, it would be closed immediately
            projectService.checkNumberOfProjects({ configuredProjects: 0, inferredProjects: 1 });
        });
    });
}

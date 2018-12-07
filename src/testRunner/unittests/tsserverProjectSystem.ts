namespace ts.projectSystem {
    function checkOpenFiles(projectService: server.ProjectService, expectedFiles: File[]) {
        checkArray("Open files", arrayFrom(projectService.openFiles.keys(), path => projectService.getScriptInfoForPath(path as Path)!.fileName), expectedFiles.map(file => file.path));
    }

    function checkScriptInfos(projectService: server.ProjectService, expectedFiles: ReadonlyArray<string>) {
        checkArray("ScriptInfos files", arrayFrom(projectService.filenameToScriptInfo.values(), info => info.fileName), expectedFiles);
    }

    function protocolFileLocationFromSubstring(file: File, substring: string): protocol.FileLocationRequestArgs {
        return { file: file.path, ...protocolLocationFromSubstring(file.content, substring) };
    }
    function protocolFileSpanFromSubstring(file: File, substring: string, options?: SpanFromSubstringOptions): protocol.FileSpan {
        return { file: file.path, ...protocolTextSpanFromSubstring(file.content, substring, options) };
    }
    function documentSpanFromSubstring(file: File, substring: string, options?: SpanFromSubstringOptions): DocumentSpan {
        return { fileName: file.path, textSpan: textSpanFromSubstring(file.content, substring, options) };
    }
    function renameLocation(file: File, substring: string, options?: SpanFromSubstringOptions): RenameLocation {
        return documentSpanFromSubstring(file, substring, options);
    }

    describe("tsserverProjectSystem general functionality", () => {
        const commonFile1: File = {
            path: "/a/b/commonFile1.ts",
            content: "let x = 1"
        };
        const commonFile2: File = {
            path: "/a/b/commonFile2.ts",
            content: "let y = 1"
        };

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
                content: JSON.stringify({ compilerOptions: { } }),
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
                content: JSON.stringify({ }),
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

    describe("tsserverProjectSystem autoDiscovery", () => {
        it("does not depend on extension", () => {
            const file1 = {
                path: "/a/b/app.html",
                content: ""
            };
            const file2 = {
                path: "/a/b/app.d.ts",
                content: ""
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName: "/a/b/proj.csproj",
                rootFiles: [toExternalFile(file2.path), { fileName: file1.path, hasMixedContent: true, scriptKind: ScriptKind.JS }],
                options: {}
            });
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const typeAcquisition = projectService.externalProjects[0].getTypeAcquisition();
            assert.isTrue(typeAcquisition.enable, "Typine acquisition should be enabled");
        });
    });

    describe("tsserverProjectSystem navigate-to for javascript project", () => {
        function containsNavToItem(items: protocol.NavtoItem[], itemName: string, itemKind: string) {
            return find(items, item => item.name === itemName && item.kind === itemKind) !== undefined;
        }

        it("should not include type symbols", () => {
            const file1: File = {
                path: "/a/b/file1.js",
                content: "function foo() {}"
            };
            const configFile: File = {
                path: "/a/b/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, configFile, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);

            // Try to find some interface type defined in lib.d.ts
            const libTypeNavToRequest = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
            const items = session.executeCommand(libTypeNavToRequest).response as protocol.NavtoItem[];
            assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

            const localFunctionNavToRequst = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
            const items2 = session.executeCommand(localFunctionNavToRequst).response as protocol.NavtoItem[];
            assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
        });
    });

    describe("tsserverProjectSystem external projects", () => {
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

    describe("tsserverProjectSystem prefer typings to js", () => {
        it("during second resolution pass", () => {
            const typingsCacheLocation = "/a/typings";
            const f1 = {
                path: "/a/b/app.js",
                content: "var x = require('bar')"
            };
            const barjs = {
                path: "/a/b/node_modules/bar/index.js",
                content: "export let x = 1"
            };
            const barTypings = {
                path: `${typingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
                content: "export let y: number"
            };
            const config = {
                path: "/a/b/jsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] })
            };
            const host = createServerHost([f1, barjs, barTypings, config]);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller(typingsCacheLocation, /*throttleLimit*/ 5, host) });

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, barTypings.path, config.path]);
        });
    });

    describe("tsserverProjectSystem format settings", () => {
        it("can be set globally", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x;"
            };
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);

            const defaultSettings = projectService.getFormatCodeOptions(f1.path as server.NormalizedPath);

            // set global settings
            const newGlobalSettings1 = { ...defaultSettings, placeOpenBraceOnNewLineForControlBlocks: !defaultSettings.placeOpenBraceOnNewLineForControlBlocks };
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings1 });

            // get format options for file - should be equal to new global settings
            const s1 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s1, newGlobalSettings1, "file settings should be the same with global settings");

            // set per file format options
            const newPerFileSettings = { ...defaultSettings, insertSpaceAfterCommaDelimiter: !defaultSettings.insertSpaceAfterCommaDelimiter };
            projectService.setHostConfiguration({ formatOptions: newPerFileSettings, file: f1.path });

            // get format options for file - should be equal to new per-file settings
            const s2 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s2, newPerFileSettings, "file settings should be the same with per-file settings");

            // set new global settings - they should not affect ones that were set per-file
            const newGlobalSettings2 = { ...defaultSettings, insertSpaceAfterSemicolonInForStatements: !defaultSettings.insertSpaceAfterSemicolonInForStatements };
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings2 });

            // get format options for file - should be equal to new per-file settings
            const s3 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s3, newPerFileSettings, "file settings should still be the same with per-file settings");
        });
    });

    describe("tsserverProjectSystem Open-file", () => {
        it("can be reloaded with empty content", () => {
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const projectFileName = "externalProject";
            const host = createServerHost([f]);
            const projectService = createProjectService(host);
            // create a project
            projectService.openExternalProject({ projectFileName, rootFiles: [toExternalFile(f.path)], options: {} });
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            const p = projectService.externalProjects[0];
            // force to load the content of the file
            p.updateGraph();

            const scriptInfo = p.getScriptInfo(f.path)!;
            checkSnapLength(scriptInfo.getSnapshot(), f.content.length);

            // open project and replace its content with empty string
            projectService.openClientFile(f.path, "");
            checkSnapLength(scriptInfo.getSnapshot(), 0);
        });
        function checkSnapLength(snap: IScriptSnapshot, expectedLength: number) {
            assert.equal(snap.getLength(), expectedLength, "Incorrect snapshot size");
        }

        function verifyOpenFileWorks(useCaseSensitiveFileNames: boolean) {
            const file1: File = {
                path: "/a/b/src/app.ts",
                content: "let x = 10;"
            };
            const file2: File = {
                path: "/a/B/lib/module2.ts",
                content: "let z = 10;"
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: ""
            };
            const configFile2: File = {
                path: "/a/tsconfig.json",
                content: ""
            };
            const host = createServerHost([file1, file2, configFile, configFile2], {
                useCaseSensitiveFileNames
            });
            const service = createProjectService(host);

            // Open file1 -> configFile
            verifyConfigFileName(file1, "/a", configFile);
            verifyConfigFileName(file1, "/a/b", configFile);
            verifyConfigFileName(file1, "/a/B", configFile);

            // Open file2 use root "/a/b"
            verifyConfigFileName(file2, "/a", useCaseSensitiveFileNames ? configFile2 : configFile);
            verifyConfigFileName(file2, "/a/b", useCaseSensitiveFileNames ? configFile2 : configFile);
            verifyConfigFileName(file2, "/a/B", useCaseSensitiveFileNames ? undefined : configFile);

            function verifyConfigFileName(file: File, projectRoot: string, expectedConfigFile: File | undefined) {
                const { configFileName } = service.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRoot);
                assert.equal(configFileName, expectedConfigFile && expectedConfigFile.path);
                service.closeClientFile(file.path);
            }
        }
        it("works when project root is used with case-sensitive system", () => {
            verifyOpenFileWorks(/*useCaseSensitiveFileNames*/ true);
        });

        it("works when project root is used with case-insensitive system", () => {
            verifyOpenFileWorks(/*useCaseSensitiveFileNames*/ false);
        });

        it("uses existing project even if project refresh is pending", () => {
            const projectFolder = "/user/someuser/projects/myproject";
            const aFile: File = {
                path: `${projectFolder}/src/a.ts`,
                content: "export const x = 0;"
            };
            const configFile: File = {
                path: `${projectFolder}/tsconfig.json`,
                content: "{}"
            };
            const files = [aFile, configFile, libFile];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(aFile.path, /*fileContent*/ undefined, ScriptKind.TS, projectFolder);
            verifyProject();

            const bFile: File = {
                path: `${projectFolder}/src/b.ts`,
                content: `export {}; declare module "./a" {  export const y: number; }`
            };
            files.push(bFile);
            host.reloadFS(files);
            service.openClientFile(bFile.path, /*fileContent*/ undefined, ScriptKind.TS, projectFolder);
            verifyProject();

            function verifyProject() {
                assert.isDefined(service.configuredProjects.get(configFile.path));
                const project = service.configuredProjects.get(configFile.path)!;
                checkProjectActualFiles(project, files.map(f => f.path));
            }
        });
    });

    describe("tsserverProjectSystem Language service", () => {
        it("should work correctly on case-sensitive file systems", () => {
            const lib = {
                path: "/a/Lib/lib.d.ts",
                content: "let x: number"
            };
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([lib, f], { executingFilePath: "/a/Lib/tsc.js", useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            projectService.inferredProjects[0].getLanguageService().getProgram();
        });
    });

    describe("tsserverProjectSystem skipLibCheck", () => {
        it("should be turned on for js-only inferred projects", () => {
            const file1 = {
                path: "/a/b/file1.js",
                content: `
                /// <reference path="file2.d.ts" />
                var x = 1;`
            };
            const file2 = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([file1, file2]);
            const session = createSession(host);
            openFilesForSession([file1, file2], session);

            const file2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: file2.path }
            );
            let errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);

            const closeFileRequest = makeSessionRequest<protocol.FileRequestArgs>(CommandNames.Close, { file: file1.path });
            session.executeCommand(closeFileRequest);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length !== 0);

            openFilesForSession([file1], session);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should be turned on for js-only external projects", () => {
            const jsFile = {
                path: "/a/b/file1.js",
                content: "let x =1;"
            };
            const dTsFile = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([jsFile, dTsFile]);
            const session = createSession(host);

            const openExternalProjectRequest = makeSessionRequest<protocol.OpenExternalProjectArgs>(
                CommandNames.OpenExternalProject,
                {
                    projectFileName: "project1",
                    rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
                    options: {}
                }
            );
            session.executeCommand(openExternalProjectRequest);

            const dTsFileGetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(dTsFileGetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should be turned on for js-only external projects with skipLibCheck=false", () => {
            const jsFile = {
                path: "/a/b/file1.js",
                content: "let x =1;"
            };
            const dTsFile = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([jsFile, dTsFile]);
            const session = createSession(host);

            const openExternalProjectRequest = makeSessionRequest<protocol.OpenExternalProjectArgs>(
                CommandNames.OpenExternalProject,
                {
                    projectFileName: "project1",
                    rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
                    options: { skipLibCheck: false }
                }
            );
            session.executeCommand(openExternalProjectRequest);

            const dTsFileGetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(dTsFileGetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should not report bind errors for declaration files with skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: "let x = 1;"
            };
            const dTsFile1 = {
                path: "/a/dTsFile1.d.ts",
                content: `
                declare var x: number;`
            };
            const dTsFile2 = {
                path: "/a/dTsFile2.d.ts",
                content: `
                declare var x: string;`
            };
            const host = createServerHost([jsconfigFile, jsFile, dTsFile1, dTsFile2]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const dTsFile1GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile1.path }
            );
            const error1Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile1GetErrRequest).response;
            assert.isTrue(error1Result.length === 0);

            const dTsFile2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile2.path }
            );
            const error2Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile2GetErrRequest).response;
            assert.isTrue(error2Result.length === 0);
        });

        it("should report semantic errors for loose JS files with '// @ts-check' and skipLibCheck=true", () => {
            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.This_condition_will_always_return_0_since_the_types_1_and_2_have_no_overlap.code);
        });

        it("should report semantic errors for configured js project with '// @ts-check' and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };

            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.This_condition_will_always_return_0_since_the_types_1_and_2_have_no_overlap.code);
        });

        it("should report semantic errors for configured js project with checkJs=true and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        checkJs: true,
                        skipLibCheck: true
                    },
                })
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: `let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.This_condition_will_always_return_0_since_the_types_1_and_2_have_no_overlap.code);
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

    describe("tsserverProjectSystem reload", () => {
        it("should work with temp file", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const tmp = {
                path: "/a/b/app.tmp",
                content: "const y = 42"
            };
            const host = createServerHost([f1, tmp]);
            const session = createSession(host);

            // send open request
            session.executeCommand(<server.protocol.OpenRequest>{
                type: "request",
                command: "open",
                seq: 1,
                arguments: { file: f1.path }
            });

            // reload from tmp file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path, tmpfile: tmp.path }
            });

            // verify content
            const projectServiice = session.getProjectService();
            const snap1 = projectServiice.getScriptInfo(f1.path)!.getSnapshot();
            assert.equal(getSnapshotText(snap1), tmp.content, "content should be equal to the content of temp file");

            // reload from original file file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path }
            });

            // verify content
            const snap2 = projectServiice.getScriptInfo(f1.path)!.getSnapshot();
            assert.equal(getSnapshotText(snap2), f1.content, "content should be equal to the content of original file");

        });

        it("should work when script info doesnt have any project open", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const tmp = {
                path: "/a/b/app.tmp",
                content: "const y = 42"
            };
            const host = createServerHost([f1, tmp, libFile]);
            const session = createSession(host);
            const openContent = "let z = 1";
            // send open request
            session.executeCommandSeq(<server.protocol.OpenRequest>{
                command: server.protocol.CommandTypes.Open,
                arguments: { file: f1.path, fileContent: openContent }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const info = projectService.getScriptInfo(f1.path)!;
            assert.isDefined(info);
            checkScriptInfoContents(openContent, "contents set during open request");

            // send close request
            session.executeCommandSeq(<server.protocol.CloseRequest>{
                command: server.protocol.CommandTypes.Close,
                arguments: { file: f1.path }
            });
            checkScriptInfoAndProjects(f1.content, "contents of closed file");
            checkInferredProjectIsOrphan();

            // Can reload contents of the file when its not open and has no project
            // reload from temp file
            session.executeCommandSeq(<server.protocol.ReloadRequest>{
                command: server.protocol.CommandTypes.Reload,
                arguments: { file: f1.path, tmpfile: tmp.path }
            });
            checkScriptInfoAndProjects(tmp.content, "contents of temp file");
            checkInferredProjectIsOrphan();

            // reload from own file
            session.executeCommandSeq(<server.protocol.ReloadRequest>{
                command: server.protocol.CommandTypes.Reload,
                arguments: { file: f1.path }
            });
            checkScriptInfoAndProjects(f1.content, "contents of closed file");
            checkInferredProjectIsOrphan();

            // Open file again without setting its content
            session.executeCommandSeq(<server.protocol.OpenRequest>{
                command: server.protocol.CommandTypes.Open,
                arguments: { file: f1.path }
            });
            checkScriptInfoAndProjects(f1.content, "contents of file when opened without specifying contents");
            const snap = info.getSnapshot();

            // send close request
            session.executeCommandSeq(<server.protocol.CloseRequest>{
                command: server.protocol.CommandTypes.Close,
                arguments: { file: f1.path }
            });
            checkScriptInfoAndProjects(f1.content, "contents of closed file");
            assert.strictEqual(info.getSnapshot(), snap);
            checkInferredProjectIsOrphan();

            // reload from temp file
            session.executeCommandSeq(<server.protocol.ReloadRequest>{
                command: server.protocol.CommandTypes.Reload,
                arguments: { file: f1.path, tmpfile: tmp.path }
            });
            checkScriptInfoAndProjects(tmp.content, "contents of temp file");
            assert.notStrictEqual(info.getSnapshot(), snap);
            checkInferredProjectIsOrphan();

            // reload from own file
            session.executeCommandSeq(<server.protocol.ReloadRequest>{
                command: server.protocol.CommandTypes.Reload,
                arguments: { file: f1.path }
            });
            checkScriptInfoAndProjects(f1.content, "contents of closed file");
            assert.notStrictEqual(info.getSnapshot(), snap);
            checkInferredProjectIsOrphan();

            function checkInferredProjectIsOrphan() {
                assert.isTrue(projectService.inferredProjects[0].isOrphan());
                assert.equal(info.containingProjects.length, 0);
            }

            function checkScriptInfoAndProjects(contentsOfInfo: string, captionForContents: string) {
                checkNumberOfProjects(projectService, { inferredProjects: 1 });
                assert.strictEqual(projectService.getScriptInfo(f1.path), info);
                checkScriptInfoContents(contentsOfInfo, captionForContents);
            }

            function checkScriptInfoContents(contentsOfInfo: string, captionForContents: string) {
                const snap = info.getSnapshot();
                assert.equal(getSnapshotText(snap), contentsOfInfo, "content should be equal to " + captionForContents);
            }
        });
    });

    describe("tsserverProjectSystem Inferred projects", () => {
        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createServerHost([f]);
            const session = createSession(host);
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 1,
                type: "request",
                command: "compilerOptionsForInferredProjects",
                arguments: {
                    options: {
                        allowJs: true
                    }
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 2,
                type: "request",
                command: "open",
                arguments: {
                    file: f.path,
                    fileContent: f.content,
                    scriptKindName: "JS"
                }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f.path]);
        });

        it("inferred projects per project root", () => {
            const file1 = { path: "/a/file1.ts", content: "let x = 1;", projectRootPath: "/a" };
            const file2 = { path: "/a/file2.ts", content: "let y = 2;", projectRootPath: "/a" };
            const file3 = { path: "/b/file2.ts", content: "let x = 3;", projectRootPath: "/b" };
            const file4 = { path: "/c/file3.ts", content: "let z = 4;" };
            const host = createServerHost([file1, file2, file3, file4]);
            const session = createSession(host, {
                useSingleInferredProject: true,
                useInferredProjectPerProjectRoot: true
            });
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 1,
                type: "request",
                command: CommandNames.CompilerOptionsForInferredProjects,
                arguments: {
                    options: {
                        allowJs: true,
                        target: ScriptTarget.ESNext
                    }
                }
            });
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 2,
                type: "request",
                command: CommandNames.CompilerOptionsForInferredProjects,
                arguments: {
                    options: {
                        allowJs: true,
                        target: ScriptTarget.ES2015
                    },
                    projectRootPath: "/b"
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 3,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file1.path,
                    fileContent: file1.content,
                    scriptKindName: "JS",
                    projectRootPath: file1.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 4,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file2.path,
                    fileContent: file2.content,
                    scriptKindName: "JS",
                    projectRootPath: file2.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 5,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file3.path,
                    fileContent: file3.content,
                    scriptKindName: "JS",
                    projectRootPath: file3.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 6,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file4.path,
                    fileContent: file4.content,
                    scriptKindName: "JS"
                }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 3 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file4.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[2], [file3.path]);
            assert.equal(projectService.inferredProjects[0].getCompilationSettings().target, ScriptTarget.ESNext);
            assert.equal(projectService.inferredProjects[1].getCompilationSettings().target, ScriptTarget.ESNext);
            assert.equal(projectService.inferredProjects[2].getCompilationSettings().target, ScriptTarget.ES2015);
        });

        function checkInferredProject(inferredProject: server.InferredProject, actualFiles: File[], target: ScriptTarget) {
            checkProjectActualFiles(inferredProject, actualFiles.map(f => f.path));
            assert.equal(inferredProject.getCompilationSettings().target, target);
        }

        function verifyProjectRootWithCaseSensitivity(useCaseSensitiveFileNames: boolean) {
            const files: [File, File, File, File] = [
                { path: "/a/file1.ts", content: "let x = 1;" },
                { path: "/A/file2.ts", content: "let y = 2;" },
                { path: "/b/file2.ts", content: "let x = 3;" },
                { path: "/c/file3.ts", content: "let z = 4;" }
            ];
            const host = createServerHost(files, { useCaseSensitiveFileNames });
            const projectService = createProjectService(host, { useSingleInferredProject: true, }, { useInferredProjectPerProjectRoot: true });
            projectService.setCompilerOptionsForInferredProjects({
                allowJs: true,
                target: ScriptTarget.ESNext
            });
            projectService.setCompilerOptionsForInferredProjects({
                allowJs: true,
                target: ScriptTarget.ES2015
            }, "/a");

            openClientFiles(["/a", "/a", "/b", undefined]);
            verifyInferredProjectsState([
                [[files[3]], ScriptTarget.ESNext],
                [[files[0], files[1]], ScriptTarget.ES2015],
                [[files[2]], ScriptTarget.ESNext]
            ]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            if (useCaseSensitiveFileNames) {
                verifyInferredProjectsState([
                    [[files[3]], ScriptTarget.ESNext],
                    [[files[0]], ScriptTarget.ES2015],
                    [[files[1]], ScriptTarget.ESNext],
                    [[files[2]], ScriptTarget.ESNext]
                ]);
            }
            else {
                verifyInferredProjectsState([
                    [[files[3]], ScriptTarget.ESNext],
                    [[files[0], files[1]], ScriptTarget.ES2015],
                    [[files[2]], ScriptTarget.ESNext]
                ]);
            }
            closeClientFiles();

            projectService.setCompilerOptionsForInferredProjects({
                allowJs: true,
                target: ScriptTarget.ES2017
            }, "/A");

            openClientFiles(["/a", "/a", "/b", undefined]);
            verifyInferredProjectsState([
                [[files[3]], ScriptTarget.ESNext],
                [[files[0], files[1]], useCaseSensitiveFileNames ? ScriptTarget.ES2015 : ScriptTarget.ES2017],
                [[files[2]], ScriptTarget.ESNext]
            ]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            if (useCaseSensitiveFileNames) {
                verifyInferredProjectsState([
                    [[files[3]], ScriptTarget.ESNext],
                    [[files[0]], ScriptTarget.ES2015],
                    [[files[1]], ScriptTarget.ES2017],
                    [[files[2]], ScriptTarget.ESNext]
                ]);
            }
            else {
                verifyInferredProjectsState([
                    [[files[3]], ScriptTarget.ESNext],
                    [[files[0], files[1]], ScriptTarget.ES2017],
                    [[files[2]], ScriptTarget.ESNext]
                ]);
            }
            closeClientFiles();

            function openClientFiles(projectRoots: [string | undefined, string | undefined, string | undefined, string | undefined]) {
                files.forEach((file, index) => {
                    projectService.openClientFile(file.path, file.content, ScriptKind.JS, projectRoots[index]);
                });
            }

            function closeClientFiles() {
                files.forEach(file => projectService.closeClientFile(file.path));
            }

            function verifyInferredProjectsState(expected: [File[], ScriptTarget][]) {
                checkNumberOfProjects(projectService, { inferredProjects: expected.length });
                projectService.inferredProjects.forEach((p, index) => {
                    const [actualFiles, target] = expected[index];
                    checkInferredProject(p, actualFiles, target);
                });
            }
        }

        it("inferred projects per project root with case sensitive system", () => {
            verifyProjectRootWithCaseSensitivity(/*useCaseSensitiveFileNames*/ true);
        });

        it("inferred projects per project root with case insensitive system", () => {
            verifyProjectRootWithCaseSensitivity(/*useCaseSensitiveFileNames*/ false);
        });
    });

    describe("tsserverProjectSystem import helpers", () => {
        it("should not crash in tsserver", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "export async function foo() { return 100; }"
            };
            const tslib = {
                path: "/a/node_modules/tslib/index.d.ts",
                content: ""
            };
            const host = createServerHost([f1, tslib]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "p", rootFiles: [toExternalFile(f1.path)], options: { importHelpers: true } });
            service.checkNumberOfProjects({ externalProjects: 1 });
        });
    });

    describe("tsserverProjectSystem searching for config file", () => {
        it("should stop at projectRootPath if given", () => {
            const f1 = {
                path: "/a/file1.ts",
                content: ""
            };
            const configFile = {
                path: "/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, configFile]);
            const service = createProjectService(host);
            service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a");

            checkNumberOfConfiguredProjects(service, 0);
            checkNumberOfInferredProjects(service, 1);

            service.closeClientFile(f1.path);
            service.openClientFile(f1.path);
            checkNumberOfConfiguredProjects(service, 1);
            checkNumberOfInferredProjects(service, 0);
        });

        it("should use projectRootPath when searching for inferred project again", () => {
            const projectDir = "/a/b/projects/project";
            const configFileLocation = `${projectDir}/src`;
            const f1 = {
                path: `${configFileLocation}/file1.ts`,
                content: ""
            };
            const configFile = {
                path: `${configFileLocation}/tsconfig.json`,
                content: "{}"
            };
            const configFile2 = {
                path: "/a/b/projects/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, libFile, configFile, configFile2]);
            const service = createProjectService(host);
            service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            assert.isDefined(service.configuredProjects.get(configFile.path));
            checkWatchedFiles(host, [libFile.path, configFile.path]);
            checkWatchedDirectories(host, [], /*recursive*/ false);
            const typeRootLocations = getTypeRootsFromLocation(configFileLocation);
            checkWatchedDirectories(host, typeRootLocations.concat(configFileLocation), /*recursive*/ true);

            // Delete config file - should create inferred project and not configured project
            host.reloadFS([f1, libFile, configFile2]);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkWatchedFiles(host, [libFile.path, configFile.path, `${configFileLocation}/jsconfig.json`, `${projectDir}/tsconfig.json`, `${projectDir}/jsconfig.json`]);
            checkWatchedDirectories(host, [], /*recursive*/ false);
            checkWatchedDirectories(host, typeRootLocations, /*recursive*/ true);
        });

        it("should use projectRootPath when searching for inferred project again 2", () => {
            const projectDir = "/a/b/projects/project";
            const configFileLocation = `${projectDir}/src`;
            const f1 = {
                path: `${configFileLocation}/file1.ts`,
                content: ""
            };
            const configFile = {
                path: `${configFileLocation}/tsconfig.json`,
                content: "{}"
            };
            const configFile2 = {
                path: "/a/b/projects/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, libFile, configFile, configFile2]);
            const service = createProjectService(host, { useSingleInferredProject: true }, { useInferredProjectPerProjectRoot: true });
            service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            assert.isDefined(service.configuredProjects.get(configFile.path));
            checkWatchedFiles(host, [libFile.path, configFile.path]);
            checkWatchedDirectories(host, [], /*recursive*/ false);
            checkWatchedDirectories(host, getTypeRootsFromLocation(configFileLocation).concat(configFileLocation), /*recursive*/ true);

            // Delete config file - should create inferred project with project root path set
            host.reloadFS([f1, libFile, configFile2]);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfProjects(service, { inferredProjects: 1 });
            assert.equal(service.inferredProjects[0].projectRootPath, projectDir);
            checkWatchedFiles(host, [libFile.path, configFile.path, `${configFileLocation}/jsconfig.json`, `${projectDir}/tsconfig.json`, `${projectDir}/jsconfig.json`]);
            checkWatchedDirectories(host, [], /*recursive*/ false);
            checkWatchedDirectories(host, getTypeRootsFromLocation(projectDir), /*recursive*/ true);
        });

        describe("when the opened file is not from project root", () => {
            const projectRoot = "/a/b/projects/project";
            const file: File = {
                path: `${projectRoot}/src/index.ts`,
                content: "let y = 10"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const files = [file, libFile];
            const filesWithConfig = files.concat(tsconfig);
            const dirOfFile = getDirectoryPath(file.path);

            function openClientFile(files: File[]) {
                const host = createServerHost(files);
                const projectService = createProjectService(host);

                projectService.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a/b/projects/proj");
                return { host, projectService };
            }

            function verifyConfiguredProject(host: TestServerHost, projectService: TestProjectService, orphanInferredProject?: boolean) {
                projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: orphanInferredProject ? 1 : 0 });
                const project = Debug.assertDefined(projectService.configuredProjects.get(tsconfig.path));

                if (orphanInferredProject) {
                    const inferredProject = projectService.inferredProjects[0];
                    assert.isTrue(inferredProject.isOrphan());
                }

                checkProjectActualFiles(project, [file.path, libFile.path, tsconfig.path]);
                checkWatchedFiles(host, [libFile.path, tsconfig.path]);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectories(host, (orphanInferredProject ? [projectRoot, `${dirOfFile}/node_modules/@types`] : [projectRoot]).concat(getTypeRootsFromLocation(projectRoot)), /*recursive*/ true);
            }

            function verifyInferredProject(host: TestServerHost, projectService: TestProjectService) {
                projectService.checkNumberOfProjects({ inferredProjects: 1 });
                const project = projectService.inferredProjects[0];
                assert.isDefined(project);

                const filesToWatch = [libFile.path];
                forEachAncestorDirectory(dirOfFile, ancestor => {
                    filesToWatch.push(combinePaths(ancestor, "tsconfig.json"));
                    filesToWatch.push(combinePaths(ancestor, "jsconfig.json"));
                });

                checkProjectActualFiles(project, [file.path, libFile.path]);
                checkWatchedFiles(host, filesToWatch);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectories(host, getTypeRootsFromLocation(dirOfFile), /*recursive*/ true);
            }

            it("tsconfig for the file exists", () => {
                const { host, projectService } = openClientFile(filesWithConfig);
                verifyConfiguredProject(host, projectService);

                host.reloadFS(files);
                host.runQueuedTimeoutCallbacks();
                verifyInferredProject(host, projectService);

                host.reloadFS(filesWithConfig);
                host.runQueuedTimeoutCallbacks();
                verifyConfiguredProject(host, projectService, /*orphanInferredProject*/ true);
            });

            it("tsconfig for the file does not exist", () => {
                const { host, projectService } = openClientFile(files);
                verifyInferredProject(host, projectService);

                host.reloadFS(filesWithConfig);
                host.runQueuedTimeoutCallbacks();
                verifyConfiguredProject(host, projectService, /*orphanInferredProject*/ true);

                host.reloadFS(files);
                host.runQueuedTimeoutCallbacks();
                verifyInferredProject(host, projectService);
            });
        });
    });

    describe("tsserverProjectSystem cancellationToken", () => {
        // Disable sourcemap support for the duration of the test, as sourcemapping the errors generated during this test is slow and not something we care to test
        let oldPrepare: AnyFunction;
        before(() => {
            oldPrepare = (Error as any).prepareStackTrace;
            delete (Error as any).prepareStackTrace;
        });

        after(() => {
            (Error as any).prepareStackTrace = oldPrepare;
        });

        it("is attached to request", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let xyz = 1;"
            };
            const host = createServerHost([f1]);
            let expectedRequestId: number;
            const cancellationToken: server.ServerCancellationToken = {
                isCancellationRequested: () => false,
                setRequest: requestId => {
                    if (expectedRequestId === undefined) {
                        assert.isTrue(false, "unexpected call");
                    }
                    assert.equal(requestId, expectedRequestId);
                },
                resetRequest: noop
            };

            const session = createSession(host, { cancellationToken });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OpenRequest>{
                command: "open",
                arguments: { file: f1.path }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.GeterrRequest>{
                command: "geterr",
                arguments: { files: [f1.path] }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OccurrencesRequest>{
                command: "occurrences",
                arguments: { file: f1.path, line: 1, offset: 6 }
            });

            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
        });

        it("Geterr is cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };

            const cancellationToken = new TestServerCancellationToken();
            const host = createServerHost([f1, config]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: noop,
                cancellationToken
            });
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });
                // send geterr for missing file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: ["/a/missing"] }
                });
                // no files - expect 'completed' event
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(session.getSeq(), 0);
            }
            {
                const getErrId = session.getNextSeq();
                // send geterr for a valid file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });

                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run new request
                session.executeCommandSeq(<protocol.ProjectInfoRequest>{
                    command: "projectInfo",
                    arguments: { file: f1.path }
                });
                session.clearMessages();

                // cancel previously issued Geterr
                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedTimeoutCallbacks();

                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                session.clearMessages();

                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                session.clearMessages();

                // the semanticDiag message
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 1);
                const e2 = <protocol.Event>getMessage(0);
                assert.equal(e2.event, "semanticDiag");
                session.clearMessages();

                host.runQueuedImmediateCallbacks(1);
                assert.equal(host.getOutput().length, 2);
                const e3 = <protocol.Event>getMessage(0);
                assert.equal(e3.event, "suggestionDiag");
                verifyRequestCompleted(getErrId, 1);

                cancellationToken.resetToken();
            }
            {
                const getErr1 = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");
                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                session.clearMessages();

                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                // make sure that getErr1 is completed
                verifyRequestCompleted(getErr1, 0);
            }

            function verifyRequestCompleted(expectedSeq: number, n: number) {
                const event = <protocol.RequestCompletedEvent>getMessage(n);
                assert.equal(event.event, "requestCompleted");
                assert.equal(event.body.request_seq, expectedSeq, "expectedSeq");
                session.clearMessages();
            }

            function getMessage(n: number) {
                return JSON.parse(server.extractMessage(host.getOutput()[n]));
            }
        });

        it("Lower priority tasks are cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: `{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";`
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };
            const cancellationToken = new TestServerCancellationToken(/*cancelAfterRequest*/ 3);
            const host = createServerHost([f1, config]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: noop,
                cancellationToken,
                throttleWaitMilliseconds: 0
            });
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });

                // send navbar request (normal priority)
                session.executeCommandSeq(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // ensure the nav bar request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // send outlining spans request (normal priority)
                session.executeCommandSeq(<protocol.OutliningSpansRequestFull>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });

                // ensure the outlining spans request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.OutliningSpansRequestFull>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });
            }

            function verifyExecuteCommandSeqIsCancellable<T extends server.protocol.Request>(request: Partial<T>) {
                // Set the next request to be cancellable
                // The cancellation token will cancel the request the third time
                // isCancellationRequested() is called.
                cancellationToken.setRequestToCancel(session.getNextSeq());
                let operationCanceledExceptionThrown = false;

                try {
                    session.executeCommandSeq(request);
                }
                catch (e) {
                    assert(e instanceof OperationCanceledException);
                    operationCanceledExceptionThrown = true;
                }
                assert(operationCanceledExceptionThrown, "Operation Canceled Exception not thrown for request: " + JSON.stringify(request));
            }
        });
    });

    describe("tsserverProjectSystem occurence highlight on string", () => {
        it("should be marked if only on string values", () => {
            const file1: File = {
                path: "/a/b/file1.ts",
                content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
            };

            const host = createServerHost([file1]);
            const session = createSession(host);
            const projectService = session.getProjectService();

            projectService.openClientFile(file1.path);
            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 1, offset: 11 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                const firstOccurence = highlightResponse[0];
                assert.isTrue(firstOccurence.isInString, "Highlights should be marked with isInString");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 3, offset: 13 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on property name");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 4, offset: 14 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on indexer");
            }
        });
    });

    describe("tsserverProjectSystem maxNodeModuleJsDepth for inferred projects", () => {
        it("should be set to 2 if the project has js root files", () => {
            const file1: File = {
                path: "/a/b/file1.js",
                content: `var t = require("test"); t.`
            };
            const moduleFile: File = {
                path: "/a/b/node_modules/test/index.js",
                content: `var v = 10; module.exports = v;`
            };

            const host = createServerHost([file1, moduleFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);

            let project = projectService.inferredProjects[0];
            let options = project.getCompilationSettings();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);

            // Assert the option sticks
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES2016 });
            project = projectService.inferredProjects[0];
            options = project.getCompilationSettings();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);
        });

        it("should return to normal state when all js root files are removed from project", () => {
            const file1 = {
                path: "/a/file1.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/file2.js",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });

            projectService.openClientFile(file1.path);
            checkNumberOfInferredProjects(projectService, 1);
            let project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilationSettings().maxNodeModuleJsDepth);

            projectService.openClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isTrue(project.getCompilationSettings().maxNodeModuleJsDepth === 2);

            projectService.closeClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilationSettings().maxNodeModuleJsDepth);
        });
    });

    describe("tsserverProjectSystem refactors", () => {
        it("use formatting options", () => {
            const file = {
                path: "/a.ts",
                content: "function f() {\n  1;\n}",
            };
            const host = createServerHost([file]);
            const session = createSession(host);
            openFilesForSession([file], session);

            const response0 = session.executeCommandSeq<server.protocol.ConfigureRequest>({
                command: server.protocol.CommandTypes.Configure,
                arguments: {
                    formatOptions: {
                        indentSize: 2,
                    },
                },
            }).response;
            assert.deepEqual(response0, /*expected*/ undefined);

            const response1 = session.executeCommandSeq<server.protocol.GetEditsForRefactorRequest>({
                command: server.protocol.CommandTypes.GetEditsForRefactor,
                arguments: {
                    refactor: "Extract Symbol",
                    action: "function_scope_1",
                    file: "/a.ts",
                    startLine: 2,
                    startOffset: 3,
                    endLine: 2,
                    endOffset: 4,
                },
            }).response;
            assert.deepEqual(response1, {
                edits: [
                    {
                        fileName: "/a.ts",
                        textChanges: [
                            {
                                start: { line: 2, offset: 3 },
                                end: { line: 2, offset: 5 },
                                newText: "newFunction();",
                            },
                            {
                                start: { line: 3, offset: 2 },
                                end: { line: 3, offset: 2 },
                                newText: "\n\nfunction newFunction() {\n  1;\n}\n",
                            },
                        ]
                    }
                ],
                renameFilename: "/a.ts",
                renameLocation: { line: 2, offset: 3 },
            });
        });

        it("handles text changes in tsconfig.json", () => {
            const aTs = {
                path: "/a.ts",
                content: "export const a = 0;",
            };
            const tsconfig = {
                path: "/tsconfig.json",
                content: '{ "files": ["./a.ts"] }',
            };

            const session = createSession(createServerHost([aTs, tsconfig]));
            openFilesForSession([aTs], session);

            const response1 = session.executeCommandSeq<server.protocol.GetEditsForRefactorRequest>({
                command: server.protocol.CommandTypes.GetEditsForRefactor,
                arguments: {
                    refactor: "Move to a new file",
                    action: "Move to a new file",
                    file: "/a.ts",
                    startLine: 1,
                    startOffset: 1,
                    endLine: 1,
                    endOffset: 20,
                },
            }).response;
            assert.deepEqual(response1, {
                edits: [
                    {
                        fileName: "/a.ts",
                        textChanges: [
                            {
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 20 },
                                newText: "",
                            },
                        ],
                    },
                    {
                        fileName: "/tsconfig.json",
                        textChanges: [
                            {
                                start: { line: 1, offset: 21 },
                                end: { line: 1, offset: 21 },
                                newText: ", \"./a.1.ts\"",
                            },
                        ],
                    },
                    {
                        fileName: "/a.1.ts",
                        textChanges: [
                            {
                                start: { line: 0, offset: 0 },
                                end: { line: 0, offset: 0 },
                                newText: "export const a = 0;\n",
                            },
                        ],
                    }
                ],
                renameFilename: undefined,
                renameLocation: undefined,
            });
        });
    });

    describe("tsserverProjectSystem forceConsistentCasingInFileNames", () => {
        it("works when extends is specified with a case insensitive file system", () => {
            const rootPath = "/Users/username/dev/project";
            const file1: File = {
                path: `${rootPath}/index.ts`,
                content: 'import {x} from "file2";',
            };
            const file2: File = {
                path: `${rootPath}/file2.js`,
                content: "",
            };
            const file2Dts: File = {
                path: `${rootPath}/types/file2/index.d.ts`,
                content: "export declare const x: string;",
            };
            const tsconfigAll: File = {
                path: `${rootPath}/tsconfig.all.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        baseUrl: ".",
                        paths: { file2: ["./file2.js"] },
                        typeRoots: ["./types"],
                        forceConsistentCasingInFileNames: true,
                    },
                }),
            };
            const tsconfig: File = {
                path: `${rootPath}/tsconfig.json`,
                content: JSON.stringify({ extends: "./tsconfig.all.json" }),
            };

            const host = createServerHost([file1, file2, file2Dts, libFile, tsconfig, tsconfigAll], { useCaseSensitiveFileNames: false });
            const session = createSession(host);

            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            const diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
        });
    });

    describe("tsserverProjectSystem getEditsForFileRename", () => {
        it("works for host implementing 'resolveModuleNames' and 'getResolvedModuleWithFailedLookupLocationsFromCache'", () => {
            const userTs: File = {
                path: "/user.ts",
                content: 'import { x } from "./old";',
            };
            const newTs: File = {
                path: "/new.ts",
                content: "export const x = 0;",
            };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const host = createServerHost([userTs, newTs, tsconfig]);
            const projectService = createProjectService(host);
            projectService.openClientFile(userTs.path);
            const project = projectService.configuredProjects.get(tsconfig.path)!;

            Debug.assert(!!project.resolveModuleNames);

            const edits = project.getLanguageService().getEditsForFileRename("/old.ts", "/new.ts", testFormatSettings, emptyOptions);
            assert.deepEqual<ReadonlyArray<FileTextChanges>>(edits, [{
                fileName: "/user.ts",
                textChanges: [{
                    span: textSpanFromSubstring(userTs.content, "./old"),
                    newText: "./new",
                }],
            }]);
        });

        it("works with multiple projects", () => {
            const aUserTs: File = {
                path: "/a/user.ts",
                content: 'import { x } from "./old";',
            };
            const aOldTs: File = {
                path: "/a/old.ts",
                content: "export const x = 0;",
            };
            const aTsconfig: File = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ files: ["./old.ts", "./user.ts"] }),
            };
            const bUserTs: File = {
                path: "/b/user.ts",
                content: 'import { x } from "../a/old";',
            };
            const bTsconfig: File = {
                path: "/b/tsconfig.json",
                content: "{}",
            };

            const host = createServerHost([aUserTs, aOldTs, aTsconfig, bUserTs, bTsconfig]);
            const session = createSession(host);
            openFilesForSession([aUserTs, bUserTs], session);

            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: aOldTs.path,
                newFilePath: "/a/new.ts",
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, [
                {
                    fileName: aTsconfig.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(aTsconfig.content, "./old.ts"), newText: "new.ts" }],
                },
                {
                    fileName: aUserTs.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(aUserTs.content, "./old"), newText: "./new" }],
                },
                {
                    fileName: bUserTs.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(bUserTs.content, "../a/old"), newText: "../a/new" }],
                },
            ]);
        });

        it("works with file moved to inferred project", () => {
            const aTs: File = { path: "/a.ts", content: 'import {} from "./b";' };
            const cTs: File = { path: "/c.ts", content: "export {};" };
            const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./a.ts", "./b.ts"] }) };

            const host = createServerHost([aTs, cTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs, cTs], session);

            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: "/b.ts",
                newFilePath: cTs.path,
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, [
                {
                    fileName: "/tsconfig.json",
                    textChanges: [{ ...protocolTextSpanFromSubstring(tsconfig.content, "./b.ts"), newText: "c.ts" }],
                },
                {
                    fileName: "/a.ts",
                    textChanges: [{ ...protocolTextSpanFromSubstring(aTs.content, "./b"), newText: "./c" }],
                },
            ]);
        });
    });

    describe("tsserverProjectSystem document registry in project service", () => {
        const projectRootPath = "/user/username/projects/project";
        const importModuleContent = `import {a} from "./module1"`;
        const file: File = {
            path: `${projectRootPath}/index.ts`,
            content: importModuleContent
        };
        const moduleFile: File = {
            path: `${projectRootPath}/module1.d.ts`,
            content: "export const a: number;"
        };
        const configFile: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: JSON.stringify({ files: ["index.ts"] })
        };

        function getProject(service: TestProjectService) {
            return service.configuredProjects.get(configFile.path)!;
        }

        function checkProject(service: TestProjectService, moduleIsOrphan: boolean) {
            // Update the project
            const project = getProject(service);
            project.getLanguageService();
            checkProjectActualFiles(project, [file.path, libFile.path, configFile.path, ...(moduleIsOrphan ? [] : [moduleFile.path])]);
            const moduleInfo = service.getScriptInfo(moduleFile.path)!;
            assert.isDefined(moduleInfo);
            assert.equal(moduleInfo.isOrphan(), moduleIsOrphan);
            const key = service.documentRegistry.getKeyForCompilationSettings(project.getCompilationSettings());
            assert.deepEqual(service.documentRegistry.getLanguageServiceRefCounts(moduleInfo.path), [[key, moduleIsOrphan ? undefined : 1]]);
        }

        function createServiceAndHost() {
            const host = createServerHost([file, moduleFile, libFile, configFile]);
            const service = createProjectService(host);
            service.openClientFile(file.path);
            checkProject(service, /*moduleIsOrphan*/ false);
            return { host, service };
        }

        function changeFileToNotImportModule(service: TestProjectService) {
            const info = service.getScriptInfo(file.path)!;
            service.applyChangesToFile(info, [{ span: { start: 0, length: importModuleContent.length }, newText: "" }]);
            checkProject(service, /*moduleIsOrphan*/ true);
        }

        function changeFileToImportModule(service: TestProjectService) {
            const info = service.getScriptInfo(file.path)!;
            service.applyChangesToFile(info, [{ span: { start: 0, length: 0 }, newText: importModuleContent }]);
            checkProject(service, /*moduleIsOrphan*/ false);
        }

        it("Caches the source file if script info is orphan", () => {
            const { service } = createServiceAndHost();
            const project = getProject(service);

            const moduleInfo = service.getScriptInfo(moduleFile.path)!;
            const sourceFile = moduleInfo.cacheSourceFile!.sourceFile;
            assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);

            // edit file
            changeFileToNotImportModule(service);
            assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);

            // write content back
            changeFileToImportModule(service);
            assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);
            assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);
        });

        it("Caches the source file if script info is orphan, and orphan script info changes", () => {
            const { host, service } = createServiceAndHost();
            const project = getProject(service);

            const moduleInfo = service.getScriptInfo(moduleFile.path)!;
            const sourceFile = moduleInfo.cacheSourceFile!.sourceFile;
            assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);

            // edit file
            changeFileToNotImportModule(service);
            assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);

            const updatedModuleContent = moduleFile.content + "\nexport const b: number;";
            host.writeFile(moduleFile.path, updatedModuleContent);

            // write content back
            changeFileToImportModule(service);
            assert.notEqual(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);
            assert.equal(project.getSourceFile(moduleInfo.path), moduleInfo.cacheSourceFile!.sourceFile);
            assert.equal(moduleInfo.cacheSourceFile!.sourceFile.text, updatedModuleContent);
        });
    });

    describe("tsserverProjectSystem syntax operations", () => {
        function navBarFull(session: TestSession, file: File) {
            return JSON.stringify(session.executeCommandSeq<protocol.FileRequest>({
                command: protocol.CommandTypes.NavBarFull,
                arguments: { file: file.path }
            }).response);
        }

        function openFile(session: TestSession, file: File) {
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: file.path, fileContent: file.content }
            });
        }

        it("works when file is removed and added with different content", () => {
            const projectRoot = "/user/username/projects/myproject";
            const app: File = {
                path: `${projectRoot}/app.ts`,
                content: "console.log('Hello world');"
            };
            const unitTest1: File = {
                path: `${projectRoot}/unitTest1.ts`,
                content: `import assert = require('assert');

describe("Test Suite 1", () => {
    it("Test A", () => {
        assert.ok(true, "This shouldn't fail");
    });

    it("Test B", () => {
        assert.ok(1 === 1, "This shouldn't fail");
        assert.ok(false, "This should fail");
    });
});`
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const files = [app, libFile, tsconfig];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            openFile(session, app);

            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            const expectedFilesWithoutUnitTest1 = files.map(f => f.path);
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            host.writeFile(unitTest1.path, unitTest1.content);
            host.runQueuedTimeoutCallbacks();
            const expectedFilesWithUnitTest1 = expectedFilesWithoutUnitTest1.concat(unitTest1.path);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            openFile(session, unitTest1);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            const navBarResultUnitTest1 = navBarFull(session, unitTest1);
            host.deleteFile(unitTest1.path);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            session.executeCommandSeq<protocol.CloseRequest>({
                command: protocol.CommandTypes.Close,
                arguments: { file: unitTest1.path }
            });
            checkProjectActualFiles(project, expectedFilesWithoutUnitTest1);

            const unitTest1WithChangedContent: File = {
                path: unitTest1.path,
                content: `import assert = require('assert');

export function Test1() {
    assert.ok(true, "This shouldn't fail");
};

export function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
};`
            };
            host.writeFile(unitTest1.path, unitTest1WithChangedContent.content);
            host.runQueuedTimeoutCallbacks();
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);

            openFile(session, unitTest1WithChangedContent);
            checkProjectActualFiles(project, expectedFilesWithUnitTest1);
            const sourceFile = project.getLanguageService().getNonBoundSourceFile(unitTest1WithChangedContent.path);
            assert.strictEqual(sourceFile.text, unitTest1WithChangedContent.content);

            const navBarResultUnitTest1WithChangedContent = navBarFull(session, unitTest1WithChangedContent);
            assert.notStrictEqual(navBarResultUnitTest1WithChangedContent, navBarResultUnitTest1, "With changes in contents of unitTest file, we should see changed naviagation bar item result");
        });
    });

    describe("tsserverProjectSystem completions", () => {
        it("works", () => {
            const aTs: File = {
                path: "/a.ts",
                content: "export const foo = 0;",
            };
            const bTs: File = {
                path: "/b.ts",
                content: "foo",
            };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const session = createSession(createServerHost([aTs, bTs, tsconfig]));
            openFilesForSession([aTs, bTs], session);

            const requestLocation: protocol.FileLocationRequestArgs = {
                file: bTs.path,
                line: 1,
                offset: 3,
            };

            const response = executeSessionRequest<protocol.CompletionsRequest, protocol.CompletionInfoResponse>(session, protocol.CommandTypes.CompletionInfo, {
                ...requestLocation,
                includeExternalModuleExports: true,
                prefix: "foo",
            });
            const entry: protocol.CompletionEntry = {
                hasAction: true,
                insertText: undefined,
                isRecommended: undefined,
                kind: ScriptElementKind.constElement,
                kindModifiers: ScriptElementKindModifier.exportedModifier,
                name: "foo",
                replacementSpan: undefined,
                sortText: "0",
                source: "/a",
            };
            assert.deepEqual<protocol.CompletionInfo | undefined>(response, {
                isGlobalCompletion: true,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: [entry],
            });

            const detailsRequestArgs: protocol.CompletionDetailsRequestArgs = {
                ...requestLocation,
                entryNames: [{ name: "foo", source: "/a" }],
            };

            const detailsResponse = executeSessionRequest<protocol.CompletionDetailsRequest, protocol.CompletionDetailsResponse>(session, protocol.CommandTypes.CompletionDetails, detailsRequestArgs);
            const detailsCommon: protocol.CompletionEntryDetails & CompletionEntryDetails = {
                displayParts: [
                    keywordPart(SyntaxKind.ConstKeyword),
                    spacePart(),
                    displayPart("foo", SymbolDisplayPartKind.localName),
                    punctuationPart(SyntaxKind.ColonToken),
                    spacePart(),
                    displayPart("0", SymbolDisplayPartKind.stringLiteral),
                ],
                documentation: emptyArray,
                kind: ScriptElementKind.constElement,
                kindModifiers: ScriptElementKindModifier.exportedModifier,
                name: "foo",
                source: [{ text: "./a", kind: "text" }],
                tags: undefined,
            };
            assert.deepEqual<ReadonlyArray<protocol.CompletionEntryDetails> | undefined>(detailsResponse, [
                {
                    codeActions: [
                        {
                            description: `Import 'foo' from module "./a"`,
                            changes: [
                                {
                                    fileName: "/b.ts",
                                    textChanges: [
                                        {
                                            start: { line: 1, offset: 1 },
                                            end: { line: 1, offset: 1 },
                                            newText: 'import { foo } from "./a";\n\n',
                                        },
                                    ],
                                },
                            ],
                            commands: undefined,
                        },
                    ],
                    ...detailsCommon,
                },
            ]);

            interface CompletionDetailsFullRequest extends protocol.FileLocationRequest {
                readonly command: protocol.CommandTypes.CompletionDetailsFull;
                readonly arguments: protocol.CompletionDetailsRequestArgs;
            }
            interface CompletionDetailsFullResponse extends protocol.Response {
                readonly body?: ReadonlyArray<CompletionEntryDetails>;
            }
            const detailsFullResponse = executeSessionRequest<CompletionDetailsFullRequest, CompletionDetailsFullResponse>(session, protocol.CommandTypes.CompletionDetailsFull, detailsRequestArgs);
            assert.deepEqual<ReadonlyArray<CompletionEntryDetails> | undefined>(detailsFullResponse, [
                {
                    codeActions: [
                        {
                            description: `Import 'foo' from module "./a"`,
                            changes: [
                                {
                                    fileName: "/b.ts",
                                    textChanges: [createTextChange(createTextSpan(0, 0), 'import { foo } from "./a";\n\n')],
                                },
                            ],
                            commands: undefined,
                        }
                    ],
                    ...detailsCommon,
                }
            ]);
        });
    });

    describe("tsserverProjectSystem rename", () => {
        it("works with fileToRename", () => {
            const aTs: File = { path: "/a.ts", content: "export const a = 0;" };
            const bTs: File = { path: "/b.ts", content: 'import { a } from "./a";' };

            const session = createSession(createServerHost([aTs, bTs]));
            openFilesForSession([bTs], session);

            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(bTs, 'a";'));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    fileToRename: aTs.path,
                    displayName: aTs.path,
                    fullDisplayName: aTs.path,
                    kind: ScriptElementKind.moduleElement,
                    kindModifiers: "",
                    triggerSpan: protocolTextSpanFromSubstring(bTs.content, "a", { index: 1 }),
                },
                locs: [{ file: bTs.path, locs: [protocolRenameSpanFromSubstring(bTs.content, "./a")] }],
            });
        });

        it("works with prefixText and suffixText", () => {
            const aTs: File = { path: "/a.ts", content: "const x = 0; const o = { x };" };
            const session = createSession(createServerHost([aTs]));
            openFilesForSession([aTs], session);

            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(aTs, "x"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    fileToRename: undefined,
                    displayName: "x",
                    fullDisplayName: "x",
                    kind: ScriptElementKind.constElement,
                    kindModifiers: ScriptElementKindModifier.none,
                    triggerSpan: protocolTextSpanFromSubstring(aTs.content, "x"),
                },
                locs: [
                    {
                        file: aTs.path,
                        locs: [
                            protocolRenameSpanFromSubstring(aTs.content, "x"),
                            protocolRenameSpanFromSubstring(aTs.content, "x", { index: 1 }, { prefixText: "x: " }),
                        ],
                    },
                ],
            });
        });
    });

    describe("tsserverProjectSystem typeReferenceDirectives", () => {
        it("when typeReferenceDirective contains UpperCasePackage", () => {
            const projectLocation = "/user/username/projects/myproject";
            const libProjectLocation = `${projectLocation}/lib`;
            const typeLib: File = {
                path: `${libProjectLocation}/@types/UpperCasePackage/index.d.ts`,
                content: `declare class BrokenTest {
    constructor(name: string, width: number, height: number, onSelect: Function);
    Name: string;
    SelectedFile: string;
}`
            };
            const appLib: File = {
                path: `${libProjectLocation}/@app/lib/index.d.ts`,
                content: `/// <reference types="UpperCasePackage" />
declare class TestLib {
    issue: BrokenTest;
    constructor();
    test(): void;
}`
            };
            const testProjectLocation = `${projectLocation}/test`;
            const testFile: File = {
                path: `${testProjectLocation}/test.ts`,
                content: `class TestClass1 {

    constructor() {
        var l = new TestLib();

    }

    public test2() {
        var x = new BrokenTest('',0,0,null);

    }
}`
            };
            const testConfig: File = {
                path: `${testProjectLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        typeRoots: ["../lib/@types", "../lib/@app"]
                    }
                })
            };

            const files = [typeLib, appLib, testFile, testConfig, libFile];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(testFile.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(testConfig.path)!;
            checkProjectActualFiles(project, files.map(f => f.path));
            host.writeFile(appLib.path, appLib.content.replace("test()", "test2()"));
            host.checkTimeoutQueueLengthAndRun(2);
        });

        it("when typeReferenceDirective is relative path and in a sibling folder", () => {
            const projectRootPath = "/user/username/projects/browser-addon";
            const projectPath = `${projectRootPath}/background`;
            const file: File = {
                path: `${projectPath}/a.ts`,
                content: "let x = 10;"
            };
            const tsconfig: File = {
                path: `${projectPath}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        types: [
                            "../typedefs/filesystem"
                        ]                    }
                })
            };
            const filesystem: File = {
                path: `${projectRootPath}/typedefs/filesystem.d.ts`,
                content: `interface LocalFileSystem { someProperty: string; }`
            };
            const files = [file, tsconfig, filesystem, libFile];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(file.path);
        });
    });

    describe("tsserverProjectSystem project references", () => {
        const aTs: File = {
            path: "/a/a.ts",
            content: "export function fnA() {}\nexport interface IfaceA {}\nexport const instanceA: IfaceA = {};",
        };
        const compilerOptions: CompilerOptions = {
            outDir: "bin",
            declaration: true,
            declarationMap: true,
            composite: true,
        };
        const configContent = JSON.stringify({ compilerOptions });
        const aTsconfig: File = { path: "/a/tsconfig.json", content: configContent };

        const aDtsMapContent: RawSourceMap = {
            version: 3,
            file: "a.d.ts",
            sourceRoot: "",
            sources: ["../a.ts"],
            names: [],
            mappings: "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"
        };
        const aDtsMap: File = {
            path: "/a/bin/a.d.ts.map",
            content: JSON.stringify(aDtsMapContent),
        };
        const aDts: File = {
            path: "/a/bin/a.d.ts",
            // Need to mangle the sourceMappingURL part or it breaks the build
            content: `export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# source${""}MappingURL=a.d.ts.map`,
        };

        const bTs: File = {
            path: "/b/b.ts",
            content: "export function fnB() {}",
        };
        const bTsconfig: File = { path: "/b/tsconfig.json", content: configContent };

        const bDtsMapContent: RawSourceMap = {
            version: 3,
            file: "b.d.ts",
            sourceRoot: "",
            sources: ["../b.ts"],
            names: [],
            mappings: "AAAA,wBAAgB,GAAG,SAAK",
        };
        const bDtsMap: File = {
            path: "/b/bin/b.d.ts.map",
            content: JSON.stringify(bDtsMapContent),
        };
        const bDts: File = {
            // Need to mangle the sourceMappingURL part or it breaks the build
            path: "/b/bin/b.d.ts",
            content: `export declare function fnB(): void;\n//# source${""}MappingURL=b.d.ts.map`,
        };

        const dummyFile: File = {
            path: "/dummy/dummy.ts",
            content: "let a = 10;"
        };

        const userTs: File = {
            path: "/user/user.ts",
            content: 'import * as a from "../a/bin/a";\nimport * as b from "../b/bin/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
        };

        const userTsForConfigProject: File = {
            path: "/user/user.ts",
            content: 'import * as a from "../a/a";\nimport * as b from "../b/b";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }',
        };

        const userTsconfig: File = {
            path: "/user/tsconfig.json",
            content: JSON.stringify({
                file: ["user.ts"],
                references: [{ path: "../a" }, { path: "../b" }]
            })
        };

        function makeSampleProjects(addUserTsConfig?: boolean) {
            const host = createServerHost([aTs, aTsconfig, aDtsMap, aDts, bTsconfig, bTs, bDtsMap, bDts, ...(addUserTsConfig ? [userTsForConfigProject, userTsconfig] : [userTs]), dummyFile]);
            const session = createSession(host);

            checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
            checkDeclarationFiles(bTs, session, [bDtsMap, bDts]);

            // Testing what happens if we delete the original sources.
            host.deleteFile(bTs.path);

            openFilesForSession([userTs], session);
            const service = session.getProjectService();
            checkNumberOfProjects(service, addUserTsConfig ? { configuredProjects: 1 } : { inferredProjects: 1 });
            return session;
        }

        function verifyInferredProjectUnchanged(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().inferredProjects[0], [userTs.path, aDts.path, bDts.path]);
        }

        function verifyDummyProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().inferredProjects[0], [dummyFile.path]);
        }

        function verifyOnlyOrphanInferredProject(session: TestSession) {
            openFilesForSession([dummyFile], session);
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
            verifyDummyProject(session);
        }

        function verifySingleInferredProject(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1 });
            verifyInferredProjectUnchanged(session);

            // Close user file should close all the projects after opening dummy file
            closeFilesForSession([userTs], session);
            verifyOnlyOrphanInferredProject(session);
        }

        function verifyATsConfigProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(aTsconfig.path)!, [aTs.path, aTsconfig.path]);
        }

        function verifyATsConfigOriginalProject(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyInferredProjectUnchanged(session);
            verifyATsConfigProject(session);
            // Close user file should close all the projects
            closeFilesForSession([userTs], session);
            verifyOnlyOrphanInferredProject(session);
        }

        function verifyATsConfigWhenOpened(session: TestSession) {
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyInferredProjectUnchanged(session);
            verifyATsConfigProject(session);

            closeFilesForSession([userTs], session);
            openFilesForSession([dummyFile], session);
            checkNumberOfProjects(session.getProjectService(), { inferredProjects: 1, configuredProjects: 1 });
            verifyDummyProject(session);
            verifyATsConfigProject(session); // ATsConfig should still be alive
        }

        function verifyUserTsConfigProject(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(userTsconfig.path)!, [userTs.path, aDts.path, userTsconfig.path]);
        }

        it("goToDefinition", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionRequest, protocol.DefinitionResponse>(session, protocol.CommandTypes.Definition, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, [protocolFileSpanFromSubstring(aTs, "fnA")]);
            verifySingleInferredProject(session);
        });

        it("getDefinitionAndBoundSpan", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(session, protocol.CommandTypes.DefinitionAndBoundSpan, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, {
                textSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                definitions: [protocolFileSpanFromSubstring(aTs, "fnA")],
            });
            verifySingleInferredProject(session);
        });

        it("getDefinitionAndBoundSpan with file navigation", () => {
            const session = makeSampleProjects(/*addUserTsConfig*/ true);
            const response = executeSessionRequest<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionAndBoundSpanResponse>(session, protocol.CommandTypes.DefinitionAndBoundSpan, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, {
                textSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                definitions: [protocolFileSpanFromSubstring(aTs, "fnA")],
            });
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 1 });
            verifyUserTsConfigProject(session);

            // Navigate to the definition
            closeFilesForSession([userTs], session);
            openFilesForSession([aTs], session);

            // UserTs configured project should be alive
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
            verifyUserTsConfigProject(session);
            verifyATsConfigProject(session);

            closeFilesForSession([aTs], session);
            verifyOnlyOrphanInferredProject(session);
        });

        it("goToType", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.TypeDefinitionRequest, protocol.TypeDefinitionResponse>(session, protocol.CommandTypes.TypeDefinition, protocolFileLocationFromSubstring(userTs, "instanceA"));
            assert.deepEqual(response, [protocolFileSpanFromSubstring(aTs, "IfaceA")]);
            verifySingleInferredProject(session);
        });

        it("goToImplementation", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.ImplementationRequest, protocol.ImplementationResponse>(session, protocol.CommandTypes.Implementation, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual(response, [protocolFileSpanFromSubstring(aTs, "fnA")]);
            verifySingleInferredProject(session);
        });

        it("goToDefinition -- target does not exist", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionRequest, protocol.DefinitionResponse>(session, CommandNames.Definition, protocolFileLocationFromSubstring(userTs, "fnB()"));
            // bTs does not exist, so stick with bDts
            assert.deepEqual(response, [protocolFileSpanFromSubstring(bDts, "fnB")]);
            verifySingleInferredProject(session);
        });

        it("navigateTo", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.NavtoRequest, protocol.NavtoResponse>(session, CommandNames.Navto, { file: userTs.path, searchValue: "fn" });
            assert.deepEqual<ReadonlyArray<protocol.NavtoItem> | undefined>(response, [
                {
                    ...protocolFileSpanFromSubstring(bDts, "export declare function fnB(): void;"),
                    name: "fnB",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export,declare",
                },
                {
                    ...protocolFileSpanFromSubstring(userTs, "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"),
                    name: "fnUser",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
                {
                    ...protocolFileSpanFromSubstring(aTs, "export function fnA() {}"),
                    name: "fnA",
                    matchKind: "prefix",
                    isCaseSensitive: true,
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: "export",
                },
            ]);

            verifyATsConfigOriginalProject(session);
        });

        const referenceATs = (aTs: File): protocol.ReferencesResponseItem => makeReferenceItem(aTs, /*isDefinition*/ true, "fnA", "export function fnA() {}");
        const referencesUserTs = (userTs: File): ReadonlyArray<protocol.ReferencesResponseItem> => [
            makeReferenceItem(userTs, /*isDefinition*/ false, "fnA", "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"),
        ];

        it("findAllReferences", () => {
            const session = makeSampleProjects();

            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [...referencesUserTs(userTs), referenceATs(aTs)],
                symbolName: "fnA",
                symbolStartOffset: protocolLocationFromSubstring(userTs.content, "fnA()").offset,
                symbolDisplayString: "function fnA(): void",
            });

            verifyATsConfigOriginalProject(session);
        });

        it("findAllReferences -- starting at definition", () => {
            const session = makeSampleProjects();
            openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(aTs, "fnA"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [referenceATs(aTs), ...referencesUserTs(userTs)],
                symbolName: "fnA",
                symbolStartOffset: protocolLocationFromSubstring(aTs.content, "fnA").offset,
                symbolDisplayString: "function fnA(): void",
            });
            verifyATsConfigWhenOpened(session);
        });

        interface ReferencesFullRequest extends protocol.FileLocationRequest { readonly command: protocol.CommandTypes.ReferencesFull; }
        interface ReferencesFullResponse extends protocol.Response { readonly body: ReadonlyArray<ReferencedSymbol>; }

        it("findAllReferencesFull", () => {
            const session = makeSampleProjects();

            const responseFull = executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, protocol.CommandTypes.ReferencesFull, protocolFileLocationFromSubstring(userTs, "fnA()"));

            assert.deepEqual<ReadonlyArray<ReferencedSymbol>>(responseFull, [
                {
                    definition: {
                        ...documentSpanFromSubstring(aTs, "fnA"),
                        kind: ScriptElementKind.functionElement,
                        name: "function fnA(): void",
                        containerKind: ScriptElementKind.unknown,
                        containerName: "",
                        displayParts: [
                            keywordPart(SyntaxKind.FunctionKeyword),
                            spacePart(),
                            displayPart("fnA", SymbolDisplayPartKind.functionName),
                            punctuationPart(SyntaxKind.OpenParenToken),
                            punctuationPart(SyntaxKind.CloseParenToken),
                            punctuationPart(SyntaxKind.ColonToken),
                            spacePart(),
                            keywordPart(SyntaxKind.VoidKeyword),
                        ],
                    },
                    references: [
                        makeReferenceEntry(userTs, /*isDefinition*/ false, "fnA"),
                        makeReferenceEntry(aTs, /*isDefinition*/ true, "fnA"),
                    ],
                },
            ]);
            verifyATsConfigOriginalProject(session);
        });

        it("findAllReferencesFull definition is in mapped file", () => {
            const aTs: File = { path: "/a/a.ts", content: `function f() {}` };
            const aTsconfig: File = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { declaration: true, declarationMap: true, outFile: "../bin/a.js" } }),
            };
            const bTs: File = { path: "/b/b.ts", content: `f();` };
            const bTsconfig: File = { path: "/b/tsconfig.json", content: JSON.stringify({ references: [{ path: "../a" }] }) };
            const aDts: File = { path: "/bin/a.d.ts", content: `declare function f(): void;\n//# sourceMappingURL=a.d.ts.map` };
            const aDtsMap: File = {
                path: "/bin/a.d.ts.map",
                content: JSON.stringify({ version: 3, file: "a.d.ts", sourceRoot: "", sources: ["../a/a.ts"], names: [], mappings: "AAAA,iBAAS,CAAC,SAAK" }),
            };

            const session = createSession(createServerHost([aTs, aTsconfig, bTs, bTsconfig, aDts, aDtsMap]));
            checkDeclarationFiles(aTs, session, [aDtsMap, aDts]);
            openFilesForSession([bTs], session);
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 1 });

            const responseFull = executeSessionRequest<ReferencesFullRequest, ReferencesFullResponse>(session, protocol.CommandTypes.ReferencesFull, protocolFileLocationFromSubstring(bTs, "f()"));

            assert.deepEqual<ReadonlyArray<ReferencedSymbol>>(responseFull, [
                {
                    definition: {
                        containerKind: ScriptElementKind.unknown,
                        containerName: "",
                        displayParts: [
                            keywordPart(SyntaxKind.FunctionKeyword),
                            spacePart(),
                            displayPart("f", SymbolDisplayPartKind.functionName),
                            punctuationPart(SyntaxKind.OpenParenToken),
                            punctuationPart(SyntaxKind.CloseParenToken),
                            punctuationPart(SyntaxKind.ColonToken),
                            spacePart(),
                            keywordPart(SyntaxKind.VoidKeyword),
                        ],
                        fileName: aTs.path,
                        kind: ScriptElementKind.functionElement,
                        name: "function f(): void",
                        textSpan: { start: 9, length: 1 },
                    },
                    references: [
                        {
                            fileName: bTs.path,
                            isDefinition: false,
                            isInString: undefined,
                            isWriteAccess: false,
                            textSpan: { start: 0, length: 1 },
                        },
                        {
                            fileName: aTs.path,
                            isDefinition: true,
                            isInString: undefined,
                            isWriteAccess: true,
                            textSpan: { start: 9, length: 1 },
                        },
                    ],
                }
            ]);
        });

        it("findAllReferences -- target does not exist", () => {
            const session = makeSampleProjects();

            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(session, protocol.CommandTypes.References, protocolFileLocationFromSubstring(userTs, "fnB()"));
            assert.deepEqual<protocol.ReferencesResponseBody | undefined>(response, {
                refs: [
                    makeReferenceItem(bDts, /*isDefinition*/ true, "fnB", "export declare function fnB(): void;"),
                    makeReferenceItem(userTs, /*isDefinition*/ false, "fnB", "export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"),
                ],
                symbolName: "fnB",
                symbolStartOffset: protocolLocationFromSubstring(userTs.content, "fnB()").offset,
                symbolDisplayString: "function fnB(): void",
            });
            verifySingleInferredProject(session);
        });

        const renameATs = (aTs: File): protocol.SpanGroup => ({
            file: aTs.path,
            locs: [protocolRenameSpanFromSubstring(aTs.content, "fnA")],
        });
        const renameUserTs = (userTs: File): protocol.SpanGroup => ({
            file: userTs.path,
            locs: [protocolRenameSpanFromSubstring(userTs.content, "fnA")],
        });

        it("renameLocations", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnA",
                    fileToRename: undefined,
                    fullDisplayName: '"/a/bin/a".fnA', // Ideally this would use the original source's path instead of the declaration file's path.
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: [ScriptElementKindModifier.exportedModifier, ScriptElementKindModifier.ambientModifier].join(","),
                    triggerSpan: protocolTextSpanFromSubstring(userTs.content, "fnA"),
                },
                locs: [renameUserTs(userTs), renameATs(aTs)],
            });
            verifyATsConfigOriginalProject(session);
        });

        it("renameLocations -- starting at definition", () => {
            const session = makeSampleProjects();
            openFilesForSession([aTs], session); // If it's not opened, the reference isn't found.
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(aTs, "fnA"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnA",
                    fileToRename: undefined,
                    fullDisplayName: '"/a/a".fnA',
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: ScriptElementKindModifier.exportedModifier,
                    triggerSpan: protocolTextSpanFromSubstring(aTs.content, "fnA"),
                },
                locs: [renameATs(aTs), renameUserTs(userTs)],
            });
            verifyATsConfigWhenOpened(session);
        });

        it("renameLocationsFull", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameFullRequest, protocol.RenameFullResponse>(session, protocol.CommandTypes.RenameLocationsFull, protocolFileLocationFromSubstring(userTs, "fnA()"));
            assert.deepEqual<ReadonlyArray<RenameLocation>>(response, [
                renameLocation(userTs, "fnA"),
                renameLocation(aTs, "fnA"),
            ]);
            verifyATsConfigOriginalProject(session);
        });

        it("renameLocations -- target does not exist", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(userTs, "fnB()"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "fnB",
                    fileToRename: undefined,
                    fullDisplayName: '"/b/bin/b".fnB',
                    kind: ScriptElementKind.functionElement,
                    kindModifiers: [ScriptElementKindModifier.exportedModifier, ScriptElementKindModifier.ambientModifier].join(","),
                    triggerSpan: protocolTextSpanFromSubstring(userTs.content, "fnB"),
                },
                locs: [
                    {
                        file: bDts.path,
                        locs: [protocolRenameSpanFromSubstring(bDts.content, "fnB")],
                    },
                    {
                        file: userTs.path,
                        locs: [protocolRenameSpanFromSubstring(userTs.content, "fnB")],
                    },
                ],
            });
            verifySingleInferredProject(session);
        });

        it("getEditsForFileRename", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, protocol.CommandTypes.GetEditsForFileRename, {
                oldFilePath: aTs.path,
                newFilePath: "/a/aNew.ts",
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, [
                {
                    fileName: userTs.path,
                    textChanges: [
                        { ...protocolTextSpanFromSubstring(userTs.content, "../a/bin/a"), newText: "../a/bin/aNew" },
                    ],
                },
            ]);
            verifySingleInferredProject(session);
        });

        it("getEditsForFileRename when referencing project doesnt include file and its renamed", () => {
            const aTs: File = { path: "/a/src/a.ts", content: "" };
            const aTsconfig: File = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        declarationMap: true,
                        outDir: "./build",
                    }
                }),
            };
            const bTs: File = { path: "/b/src/b.ts", content: "" };
            const bTsconfig: File = {
                path: "/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "./build",
                    },
                    include: ["./src"],
                    references: [{ path: "../a" }],
                }),
            };

            const host = createServerHost([aTs, aTsconfig, bTs, bTsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs, bTs], session);
            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: aTs.path,
                newFilePath: "/a/src/a1.ts",
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, []); // Should not change anything
        });
    });

    describe("tsserverProjectSystem with tsbuild projects", () => {
        function createHost(files: ReadonlyArray<File>, rootNames: ReadonlyArray<string>) {
            const host = createServerHost(files);

            // ts build should succeed
            const solutionBuilder = tscWatch.createSolutionBuilder(host, rootNames, {});
            solutionBuilder.buildAllProjects();
            assert.equal(host.getOutput().length, 0);

            return host;
        }

        describe("with container project", () => {
            function getProjectFiles(project: string): [File, File] {
                return [
                    TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile(project, "index.ts"),
                ];
            }

            const project = "container";
            const containerLib = getProjectFiles("container/lib");
            const containerExec = getProjectFiles("container/exec");
            const containerCompositeExec = getProjectFiles("container/compositeExec");
            const containerConfig = TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json");
            const files = [libFile, ...containerLib, ...containerExec, ...containerCompositeExec, containerConfig];

            it("does not error on container only project", () => {
                const host = createHost(files, [containerConfig.path]);

                // Open external project for the folder
                const session = createSession(host);
                const service = session.getProjectService();
                service.openExternalProjects([{
                    projectFileName: TestFSWithWatch.getTsBuildProjectFilePath(project, project),
                    rootFiles: files.map(f => ({ fileName: f.path })),
                    options: {}
                }]);
                checkNumberOfProjects(service, { configuredProjects: 4 });
                files.forEach(f => {
                    const args: protocol.FileRequestArgs = {
                        file: f.path,
                        projectFileName: endsWith(f.path, "tsconfig.json") ? f.path : undefined
                    };
                    const syntaxDiagnostics = session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(syntaxDiagnostics, []);
                    const semanticDiagnostics = session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SemanticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(semanticDiagnostics, []);
                });
                const containerProject = service.configuredProjects.get(containerConfig.path)!;
                checkProjectActualFiles(containerProject, [containerConfig.path]);
                const optionsDiagnostics = session.executeCommandSeq<protocol.CompilerOptionsDiagnosticsRequest>({
                    command: protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
                    arguments: { projectFileName: containerProject.projectName }
                }).response;
                assert.deepEqual(optionsDiagnostics, []);
            });

            it("can successfully find references with --out options", () => {
                const host = createHost(files, [containerConfig.path]);
                const session = createSession(host);
                openFilesForSession([containerCompositeExec[1]], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 1 });
                const locationOfMyConst = protocolLocationFromSubstring(containerCompositeExec[1].content, "myConst");
                const response = session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: {
                        file: containerCompositeExec[1].path,
                        ...locationOfMyConst
                    }
                }).response as protocol.RenameResponseBody;


                const myConstLen = "myConst".length;
                const locationOfMyConstInLib = protocolLocationFromSubstring(containerLib[1].content, "myConst");
                assert.deepEqual(response.locs, [
                    { file: containerCompositeExec[1].path, locs: [{ start: locationOfMyConst, end: { line: locationOfMyConst.line, offset: locationOfMyConst.offset + myConstLen } }] },
                    { file: containerLib[1].path, locs: [{ start: locationOfMyConstInLib, end: { line: locationOfMyConstInLib.line, offset: locationOfMyConstInLib.offset + myConstLen } }] }
                ]);
            });
        });

        describe("with main and depedency project", () => {
            const projectLocation = "/user/username/projects/myproject";
            const dependecyLocation = `${projectLocation}/dependency`;
            const mainLocation = `${projectLocation}/main`;
            const dependencyTs: File = {
                path: `${dependecyLocation}/FnS.ts`,
                content: `export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }
`
            };
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, declarationMap: true } })
            };

            const mainTs: File = {
                path: `${mainLocation}/main.ts`,
                content: `import {
    fn1,
    fn2,
    fn3,
    fn4,
    fn5
} from '../dependency/fns'

fn1();
fn2();
fn3();
fn4();
fn5();
`
            };
            const mainConfig: File = {
                path: `${mainLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, declarationMap: true },
                    references: [{ path: "../dependency" }]
                })
            };

            const randomFile: File = {
                path: `${projectLocation}/random/random.ts`,
                content: "let a = 10;"
            };
            const randomConfig: File = {
                path: `${projectLocation}/random/tsconfig.json`,
                content: "{}"
            };
            const dtsLocation = `${dependecyLocation}/FnS.d.ts`;
            const dtsPath = dtsLocation.toLowerCase() as Path;
            const dtsMapLocation = `${dtsLocation}.map`;
            const dtsMapPath = dtsMapLocation.toLowerCase() as Path;

            const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, libFile, randomFile, randomConfig];

            function verifyScriptInfos(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>) {
                checkScriptInfos(session.getProjectService(), openInfos.concat(closedInfos));
                checkWatchedFiles(host, closedInfos.concat(otherWatchedFiles).map(f => f.toLowerCase()));
            }

            function verifyInfosWithRandom(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>) {
                verifyScriptInfos(session, host, openInfos.concat(randomFile.path), closedInfos, otherWatchedFiles.concat(randomConfig.path));
            }

            function verifyOnlyRandomInfos(session: TestSession, host: TestServerHost) {
                verifyScriptInfos(session, host, [randomFile.path], [libFile.path], [randomConfig.path]);
            }

            // Returns request and expected Response, expected response when no map file
            interface SessionAction<Req = protocol.Request, Response = {}> {
                reqName: string;
                request: Partial<Req>;
                expectedResponse: Response;
                expectedResponseNoMap?: Response;
                expectedResponseNoDts?: Response;
            }
            function gotoDefintinionFromMainTs(fn: number): SessionAction<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                const definition: protocol.FileSpan = { file: dependencyTs.path, ...definitionSpan(fn) };
                const declareSpaceLength = "declare ".length;
                return {
                    reqName: "goToDef",
                    request: {
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: { file: mainTs.path, ...textSpan.start }
                    },
                    expectedResponse: {
                        // To dependency
                        definitions: [definition],
                        textSpan
                    },
                    expectedResponseNoMap: {
                        // To the dts
                        definitions: [{ file: dtsPath, start: { line: fn, offset: definition.start.offset + declareSpaceLength }, end: { line: fn, offset: definition.end.offset + declareSpaceLength } }],
                        textSpan
                    },
                    expectedResponseNoDts: {
                        // To import declaration
                        definitions: [{ file: mainTs.path, ...importSpan(fn) }],
                        textSpan
                    }
                };
            }

            function definitionSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn, offset: 17 }, end: { line: fn, offset: 20 } };
            }
            function importSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn + 1, offset: 5 }, end: { line: fn + 1, offset: 8 } };
            }
            function usageSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn + 8, offset: 1 }, end: { line: fn + 8, offset: 4 } };
            }

            function renameFromDependencyTs(fn: number): SessionAction<protocol.RenameRequest, protocol.RenameResponseBody> {
                const triggerSpan = definitionSpan(fn);
                return {
                    reqName: "rename",
                    request: {
                        command: protocol.CommandTypes.Rename,
                        arguments: { file: dependencyTs.path, ...triggerSpan.start }
                    },
                    expectedResponse: {
                        info: {
                            canRename: true,
                            fileToRename: undefined,
                            displayName: `fn${fn}`,
                            fullDisplayName: `"${dependecyLocation}/FnS".fn${fn}`,
                            kind: ScriptElementKind.functionElement,
                            kindModifiers: "export",
                            triggerSpan
                        },
                        locs: [
                            { file: dependencyTs.path, locs: [triggerSpan] }
                        ]
                    }
                };
            }

            function renameFromDependencyTsWithBothProjectsOpen(fn: number): SessionAction<protocol.RenameRequest, protocol.RenameResponseBody> {
                const { reqName, request, expectedResponse } = renameFromDependencyTs(fn);
                const { info, locs } = expectedResponse;
                return {
                    reqName,
                    request,
                    expectedResponse: {
                        info,
                        locs: [
                            locs[0],
                            {
                                file: mainTs.path,
                                locs: [
                                    importSpan(fn),
                                    usageSpan(fn)
                                ]
                            }
                        ]
                    },
                    // Only dependency result
                    expectedResponseNoMap: expectedResponse,
                    expectedResponseNoDts: expectedResponse
                };
            }

            // Returns request and expected Response
            type SessionActionGetter<Req = protocol.Request, Response = {}> = (fn: number) => SessionAction<Req, Response>;
            // Open File, expectedProjectActualFiles, actionGetter, openFileLastLine
            interface DocumentPositionMapperVerifier {
                openFile: File;
                expectedProjectActualFiles: ReadonlyArray<string>;
                actionGetter: SessionActionGetter;
                openFileLastLine: number;
            }
            function verifyDocumentPositionMapperUpdates(
                mainScenario: string,
                verifier: ReadonlyArray<DocumentPositionMapperVerifier>,
                closedInfos: ReadonlyArray<string>) {

                const openFiles = verifier.map(v => v.openFile);
                const expectedProjectActualFiles = verifier.map(v => v.expectedProjectActualFiles);
                const actionGetters = verifier.map(v => v.actionGetter);
                const openFileLastLines = verifier.map(v => v.openFileLastLine);

                const configFiles = openFiles.map(openFile => `${getDirectoryPath(openFile.path)}/tsconfig.json`);
                const openInfos = openFiles.map(f => f.path);
                // When usage and dependency are used, dependency config is part of closedInfo so ignore
                const otherWatchedFiles = verifier.length > 1 ? [configFiles[0]] : configFiles;
                function openTsFile(onHostCreate?: (host: TestServerHost) => void) {
                    const host = createHost(files, [mainConfig.path]);
                    if (onHostCreate) {
                        onHostCreate(host);
                    }
                    const session = createSession(host);
                    openFilesForSession([...openFiles, randomFile], session);
                    return { host, session };
                }

                function checkProject(session: TestSession, noDts?: true) {
                    const service = session.getProjectService();
                    checkNumberOfProjects(service, { configuredProjects: 1 + verifier.length });
                    configFiles.forEach((configFile, index) => {
                        checkProjectActualFiles(
                            service.configuredProjects.get(configFile)!,
                            noDts ?
                                expectedProjectActualFiles[index].filter(f => f.toLowerCase() !== dtsPath) :
                                expectedProjectActualFiles[index]
                        );
                    });
                }

                function verifyInfos(session: TestSession, host: TestServerHost) {
                    verifyInfosWithRandom(session, host, openInfos, closedInfos, otherWatchedFiles);
                }

                function verifyInfosWhenNoMapFile(session: TestSession, host: TestServerHost, dependencyTsOK?: true) {
                    const dtsMapClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsMapPath ? f : undefined);
                    verifyInfosWithRandom(
                        session,
                        host,
                        openInfos,
                        closedInfos.filter(f => f !== dtsMapClosedInfo && (dependencyTsOK || f !== dependencyTs.path)),
                        dtsMapClosedInfo ? otherWatchedFiles.concat(dtsMapClosedInfo) : otherWatchedFiles
                    );
                }

                function verifyInfosWhenNoDtsFile(session: TestSession, host: TestServerHost, dependencyTsAndMapOk?: true) {
                    const dtsMapClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsMapPath ? f : undefined);
                    const dtsClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsPath ? f : undefined);
                    verifyInfosWithRandom(
                        session,
                        host,
                        openInfos,
                        closedInfos.filter(f => (dependencyTsAndMapOk || f !== dtsMapClosedInfo) && f !== dtsClosedInfo && (dependencyTsAndMapOk || f !== dependencyTs.path)),
                        // When project actual file contains dts, it needs to be watched
                        dtsClosedInfo && expectedProjectActualFiles.some(expectedProjectActualFiles => expectedProjectActualFiles.some(f => f.toLowerCase() === dtsPath)) ?
                            otherWatchedFiles.concat(dtsClosedInfo) :
                            otherWatchedFiles
                    );
                }

                function verifyDocumentPositionMapper(session: TestSession, dependencyMap: server.ScriptInfo, documentPositionMapper: server.ScriptInfo["documentPositionMapper"], notEqual?: true) {
                    assert.strictEqual(session.getProjectService().filenameToScriptInfo.get(dtsMapPath), dependencyMap);
                    if (notEqual) {
                        assert.notStrictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                    else {
                        assert.strictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                }

                function action(actionGetter: SessionActionGetter, fn: number, session: TestSession) {
                    const { reqName, request, expectedResponse, expectedResponseNoMap, expectedResponseNoDts } = actionGetter(fn);
                    const { response } = session.executeCommandSeq(request);
                    return { reqName, response, expectedResponse, expectedResponseNoMap, expectedResponseNoDts };
                }

                function firstAction(session: TestSession) {
                    actionGetters.forEach(actionGetter => action(actionGetter, 1, session));
                }

                function verifyAllFnActionWorker(session: TestSession, verifyAction: (result: ReturnType<typeof action>, dtsInfo: server.ScriptInfo | undefined, isFirst: boolean) => void, dtsAbsent?: true) {
                    // action
                    let isFirst = true;
                    for (const actionGetter of actionGetters) {
                        for (let fn = 1; fn <= 5; fn++) {
                            const result = action(actionGetter, fn, session);
                            const dtsInfo = session.getProjectService().filenameToScriptInfo.get(dtsPath);
                            if (dtsAbsent) {
                                assert.isUndefined(dtsInfo);
                            }
                            else {
                                assert.isDefined(dtsInfo);
                            }
                            verifyAction(result, dtsInfo, isFirst);
                            isFirst = false;
                        }
                    }
                }

                function verifyAllFnAction(
                    session: TestSession,
                    host: TestServerHost,
                    firstDocumentPositionMapperNotEquals?: true,
                    dependencyMap?: server.ScriptInfo,
                    documentPositionMapper?: server.ScriptInfo["documentPositionMapper"]
                ) {
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse }, dtsInfo, isFirst) => {
                        assert.deepEqual(response, expectedResponse, `Failed on ${reqName}`);
                        verifyInfos(session, host);
                        assert.equal(dtsInfo!.sourceMapFilePath, dtsMapPath);
                        if (isFirst) {
                            if (dependencyMap) {
                                verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, firstDocumentPositionMapperNotEquals);
                                documentPositionMapper = dependencyMap.documentPositionMapper;
                            }
                            else {
                                dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath)!;
                                documentPositionMapper = dependencyMap.documentPositionMapper;
                            }
                        }
                        else {
                            verifyDocumentPositionMapper(session, dependencyMap!, documentPositionMapper);
                        }
                    });
                    return { dependencyMap: dependencyMap!, documentPositionMapper };
                }

                function verifyAllFnActionWithNoMap(
                    session: TestSession,
                    host: TestServerHost,
                    dependencyTsOK?: true
                ) {
                    let sourceMapFilePath: server.ScriptInfo["sourceMapFilePath"];
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse, expectedResponseNoMap }, dtsInfo, isFirst) => {
                        assert.deepEqual(response, expectedResponseNoMap || expectedResponse, `Failed on ${reqName}`);
                        verifyInfosWhenNoMapFile(session, host, dependencyTsOK);
                        assert.isUndefined(session.getProjectService().filenameToScriptInfo.get(dtsMapPath));
                        if (isFirst) {
                            assert.isNotString(dtsInfo!.sourceMapFilePath);
                            assert.isNotFalse(dtsInfo!.sourceMapFilePath);
                            assert.isDefined(dtsInfo!.sourceMapFilePath);
                            sourceMapFilePath = dtsInfo!.sourceMapFilePath;
                        }
                        else {
                            assert.equal(dtsInfo!.sourceMapFilePath, sourceMapFilePath);
                        }
                    });
                    return sourceMapFilePath;
                }

                function verifyAllFnActionWithNoDts(
                    session: TestSession,
                    host: TestServerHost,
                    dependencyTsAndMapOk?: true
                ) {
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse, expectedResponseNoDts }) => {
                        assert.deepEqual(response, expectedResponseNoDts || expectedResponse, `Failed on ${reqName}`);
                        verifyInfosWhenNoDtsFile(session, host, dependencyTsAndMapOk);
                    }, /*dtsAbsent*/ true);
                }

                function verifyScenarioWithChangesWorker(
                    change: (host: TestServerHost, session: TestSession) => void,
                    afterActionDocumentPositionMapperNotEquals: true | undefined,
                    timeoutBeforeAction: boolean
                ) {
                    const { host, session } = openTsFile();

                    // Create DocumentPositionMapper
                    firstAction(session);
                    const dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath)!;
                    const documentPositionMapper = dependencyMap.documentPositionMapper;

                    // change
                    change(host, session);
                    if (timeoutBeforeAction) {
                        host.runQueuedTimeoutCallbacks();
                        checkProject(session);
                        verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper);
                    }

                    // action
                    verifyAllFnAction(session, host, afterActionDocumentPositionMapperNotEquals, dependencyMap, documentPositionMapper);
                }

                function verifyScenarioWithChanges(
                    scenarioName: string,
                    change: (host: TestServerHost, session: TestSession) => void,
                    afterActionDocumentPositionMapperNotEquals?: true
                ) {
                    describe(scenarioName, () => {
                        it("when timeout occurs before request", () => {
                            verifyScenarioWithChangesWorker(change, afterActionDocumentPositionMapperNotEquals, /*timeoutBeforeAction*/ true);
                        });

                        it("when timeout does not occur before request", () => {
                            verifyScenarioWithChangesWorker(change, afterActionDocumentPositionMapperNotEquals, /*timeoutBeforeAction*/ false);
                        });
                    });
                }

                function verifyMainScenarioAndScriptInfoCollection(session: TestSession, host: TestServerHost) {
                    // Main scenario action
                    const { dependencyMap, documentPositionMapper } = verifyAllFnAction(session, host);
                    checkProject(session);
                    verifyInfos(session, host);

                    // Collecting at this point retains dependency.d.ts and map
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfos(session, host);
                    verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyMainScenarioAndScriptInfoCollectionWithNoMap(session: TestSession, host: TestServerHost, dependencyTsOKInScenario?: true) {
                    // Main scenario action
                    verifyAllFnActionWithNoMap(session, host, dependencyTsOKInScenario);

                    // Collecting at this point retains dependency.d.ts and map watcher
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfosWhenNoMapFile(session, host);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyMainScenarioAndScriptInfoCollectionWithNoDts(session: TestSession, host: TestServerHost, dependencyTsAndMapOk?: true) {
                    // Main scenario action
                    verifyAllFnActionWithNoDts(session, host, dependencyTsAndMapOk);

                    // Collecting at this point retains dependency.d.ts and map watcher
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfosWhenNoDtsFile(session, host);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyScenarioWhenFileNotPresent(
                    scenarioName: string,
                    fileLocation: string,
                    verifyScenarioAndScriptInfoCollection: (session: TestSession, host: TestServerHost, dependencyTsOk?: true) => void,
                    noDts?: true
                ) {
                    describe(scenarioName, () => {
                        it(mainScenario, () => {
                            const { host, session } = openTsFile(host => host.deleteFile(fileLocation));
                            checkProject(session, noDts);

                            verifyScenarioAndScriptInfoCollection(session, host);
                        });

                        it("when file is created", () => {
                            let fileContents: string | undefined;
                            const { host, session } = openTsFile(host => {
                                fileContents = host.readFile(fileLocation);
                                host.deleteFile(fileLocation);
                            });
                            firstAction(session);

                            host.writeFile(fileLocation, fileContents!);
                            verifyMainScenarioAndScriptInfoCollection(session, host);
                        });

                        it("when file is deleted", () => {
                            const { host, session } = openTsFile();
                            firstAction(session);

                            // The dependency file is deleted when orphan files are collected
                            host.deleteFile(fileLocation);
                            verifyScenarioAndScriptInfoCollection(session, host, /*dependencyTsOk*/ true);
                        });
                    });
                }

                it(mainScenario, () => {
                    const { host, session } = openTsFile();
                    checkProject(session);

                    verifyMainScenarioAndScriptInfoCollection(session, host);
                });

                // Edit
                verifyScenarioWithChanges(
                    "when usage file changes, document position mapper doesnt change",
                    (_host, session) => openFiles.forEach(
                        (openFile, index) => session.executeCommandSeq<protocol.ChangeRequest>({
                            command: protocol.CommandTypes.Change,
                            arguments: { file: openFile.path, line: openFileLastLines[index], offset: 1, endLine: openFileLastLines[index], endOffset: 1, insertString: "const x = 10;" }
                        })
                    )
                );

                // Edit dts to add new fn
                verifyScenarioWithChanges(
                    "when dependency .d.ts changes, document position mapper doesnt change",
                    host => host.writeFile(
                        dtsLocation,
                        host.readFile(dtsLocation)!.replace(
                            "//# sourceMappingURL=FnS.d.ts.map",
                            `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`
                        )
                    )
                );

                // Edit map file to represent added new line
                verifyScenarioWithChanges(
                    "when dependency file's map changes",
                    host => host.writeFile(
                        dtsMapLocation,
                        `{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC"}`
                    ),
                    /*afterActionDocumentPositionMapperNotEquals*/ true
                );

                verifyScenarioWhenFileNotPresent(
                    "when map file is not present",
                    dtsMapLocation,
                    verifyMainScenarioAndScriptInfoCollectionWithNoMap
                );

                verifyScenarioWhenFileNotPresent(
                    "when .d.ts file is not present",
                    dtsLocation,
                    verifyMainScenarioAndScriptInfoCollectionWithNoDts,
                    /*noDts*/ true
                );
            }

            const usageVerifier: DocumentPositionMapperVerifier = {
                openFile: mainTs,
                expectedProjectActualFiles: [mainTs.path, libFile.path, mainConfig.path, dtsPath],
                actionGetter: gotoDefintinionFromMainTs,
                openFileLastLine: 14
            };
            describe("from project that uses dependency", () => {
                const closedInfos = [dependencyTs.path, dependencyConfig.path, libFile.path, dtsPath, dtsMapLocation];
                verifyDocumentPositionMapperUpdates(
                    "can go to definition correctly",
                    [usageVerifier],
                    closedInfos
                );
            });

            const definingVerifier: DocumentPositionMapperVerifier = {
                openFile: dependencyTs,
                expectedProjectActualFiles: [dependencyTs.path, libFile.path, dependencyConfig.path],
                actionGetter: renameFromDependencyTs,
                openFileLastLine: 6
            };
            describe("from defining project", () => {
                const closedInfos = [libFile.path, dtsLocation, dtsMapLocation];
                verifyDocumentPositionMapperUpdates(
                    "rename locations from dependency",
                    [definingVerifier],
                    closedInfos
                );
            });

            describe("when opening depedency and usage project", () => {
                const closedInfos = [libFile.path, dtsPath, dtsMapLocation, dependencyConfig.path];
                verifyDocumentPositionMapperUpdates(
                    "goto Definition in usage and rename locations from defining project",
                    [usageVerifier, { ...definingVerifier, actionGetter: renameFromDependencyTsWithBothProjectsOpen }],
                    closedInfos
                );
            });
        });
    });

    describe("tsserverProjectSystem duplicate packages", () => {
        // Tests that 'moduleSpecifiers.ts' will import from the redirecting file, and not from the file it redirects to, if that can provide a global module specifier.
        it("works with import fixes", () => {
            const packageContent = "export const foo: number;";
            const packageJsonContent = JSON.stringify({ name: "foo", version: "1.2.3" });
            const aFooIndex: File = { path: "/a/node_modules/foo/index.d.ts", content: packageContent };
            const aFooPackage: File = { path: "/a/node_modules/foo/package.json", content: packageJsonContent };
            const bFooIndex: File = { path: "/b/node_modules/foo/index.d.ts", content: packageContent };
            const bFooPackage: File = { path: "/b/node_modules/foo/package.json", content: packageJsonContent };

            const userContent = 'import("foo");\nfoo';
            const aUser: File = { path: "/a/user.ts", content: userContent };
            const bUser: File = { path: "/b/user.ts", content: userContent };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const host = createServerHost([aFooIndex, aFooPackage, bFooIndex, bFooPackage, aUser, bUser, tsconfig]);
            const session = createSession(host);

            openFilesForSession([aUser, bUser], session);

            for (const user of [aUser, bUser]) {
                const response = executeSessionRequest<protocol.CodeFixRequest, protocol.CodeFixResponse>(session, protocol.CommandTypes.GetCodeFixes, {
                    file: user.path,
                    startLine: 2,
                    startOffset: 1,
                    endLine: 2,
                    endOffset: 4,
                    errorCodes: [Diagnostics.Cannot_find_name_0.code],
                });
                assert.deepEqual<ReadonlyArray<protocol.CodeFixAction> | undefined>(response, [
                    {
                        description: `Import 'foo' from module "foo"`,
                        fixName: "import",
                        fixId: "fixMissingImport",
                        fixAllDescription: "Add all missing imports",
                        changes: [{
                            fileName: user.path,
                            textChanges: [{
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                                newText: 'import { foo } from "foo";\n\n',
                            }],
                        }],
                        commands: undefined,
                    },
                ]);
            }
        });
    });

    describe("tsserverProjectSystem Untitled files", () => {
        it("Can convert positions to locations", () => {
            const aTs: File = { path: "/proj/a.ts", content: "" };
            const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
            const session = createSession(createServerHost([aTs, tsconfig]));

            openFilesForSession([aTs], session);

            const untitledFile = "untitled:^Untitled-1";
            executeSessionRequestNoResponse<protocol.OpenRequest>(session, protocol.CommandTypes.Open, {
                file: untitledFile,
                fileContent: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />\nlet foo = 1;\nfooo/**/`,
                scriptKindName: "TS",
                projectRootPath: "/proj",
            });

            const response = executeSessionRequest<protocol.CodeFixRequest, protocol.CodeFixResponse>(session, protocol.CommandTypes.GetCodeFixes, {
                file: untitledFile,
                startLine: 3,
                startOffset: 1,
                endLine: 3,
                endOffset: 5,
                errorCodes: [Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
            });
            assert.deepEqual<ReadonlyArray<protocol.CodeFixAction> | undefined>(response, [
                {
                    description: "Change spelling to 'foo'",
                    fixAllDescription: "Fix all detected spelling errors",
                    fixId: "fixSpelling",
                    fixName: "spelling",
                    changes: [{
                        fileName: untitledFile,
                        textChanges: [{
                            start: { line: 3, offset: 1 },
                            end: { line: 3, offset: 5 },
                            newText: "foo",
                        }],
                    }],
                    commands: undefined,
                },
            ]);
        });
    });

    describe("tsserverProjectSystem with metadata in response", () => {
        const metadata = "Extra Info";
        function verifyOutput(host: TestServerHost, expectedResponse: protocol.Response) {
            const output = host.getOutput().map(mapOutputToJson);
            assert.deepEqual(output, [expectedResponse]);
            host.clearOutput();
        }

        function verifyCommandWithMetadata<T extends server.protocol.Request, U = undefined>(session: TestSession, host: TestServerHost, command: Partial<T>, expectedResponseBody: U) {
            command.seq = session.getSeq();
            command.type = "request";
            session.onMessage(JSON.stringify(command));
            verifyOutput(host, expectedResponseBody ?
                { seq: 0, type: "response", command: command.command!, request_seq: command.seq, success: true, body: expectedResponseBody, metadata } :
                { seq: 0, type: "response", command: command.command!, request_seq: command.seq, success: false, message: "No content available." }
            );
        }

        const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: { plugins: [{ name: "myplugin" }] }
            })
        };
        function createHostWithPlugin(files: ReadonlyArray<File>) {
            const host = createServerHost(files);
            host.require = (_initialPath, moduleName) => {
                assert.equal(moduleName, "myplugin");
                return {
                    module: () => ({
                        create(info: server.PluginCreateInfo) {
                            const proxy = Harness.LanguageService.makeDefaultProxy(info);
                            proxy.getCompletionsAtPosition = (filename, position, options) => {
                                const result = info.languageService.getCompletionsAtPosition(filename, position, options);
                                if (result) {
                                    result.metadata = metadata;
                                }
                                return result;
                            };
                            return proxy;
                        }
                    }),
                    error: undefined
                };
            };
            return host;
        }

        describe("With completion requests", () => {
            const completionRequestArgs: protocol.CompletionsRequestArgs = {
                file: aTs.path,
                line: 1,
                offset: aTs.content.indexOf("this.") + 1 + "this.".length
            };
            const expectedCompletionEntries: ReadonlyArray<protocol.CompletionEntry> = [
                { name: "foo", kind: ScriptElementKind.memberFunctionElement, kindModifiers: "", sortText: "0" },
                { name: "prop", kind: ScriptElementKind.memberVariableElement, kindModifiers: "", sortText: "0" }
            ];

            it("can pass through metadata when the command returns array", () => {
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest, ReadonlyArray<protocol.CompletionEntry>>(session, host, {
                    command: protocol.CommandTypes.Completions,
                    arguments: completionRequestArgs
                }, expectedCompletionEntries);
            });

            it("can pass through metadata when the command returns object", () => {
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest, protocol.CompletionInfo>(session, host, {
                    command: protocol.CommandTypes.CompletionInfo,
                    arguments: completionRequestArgs
                }, {
                    isGlobalCompletion: false,
                    isMemberCompletion: true,
                    isNewIdentifierLocation: false,
                    entries: expectedCompletionEntries
                });
            });

            it("returns undefined correctly", () => {
                const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { const x = 0; } }` };
                const host = createHostWithPlugin([aTs, tsconfig]);
                const session = createSession(host);
                openFilesForSession([aTs], session);
                verifyCommandWithMetadata<protocol.CompletionsRequest>(session, host, {
                    command: protocol.CommandTypes.Completions,
                    arguments: { file: aTs.path, line: 1, offset: aTs.content.indexOf("x") + 1 }
                }, /*expectedResponseBody*/ undefined);
            });
        });
    });

    function makeReferenceItem(file: File, isDefinition: boolean, text: string, lineText: string, options?: SpanFromSubstringOptions): protocol.ReferencesResponseItem {
        return {
            ...protocolFileSpanFromSubstring(file, text, options),
            isDefinition,
            isWriteAccess: isDefinition,
            lineText,
        };
    }

    function makeReferenceEntry(file: File, isDefinition: boolean, text: string, options?: SpanFromSubstringOptions): ReferenceEntry {
        return {
            ...documentSpanFromSubstring(file, text, options),
            isDefinition,
            isWriteAccess: isDefinition,
            isInString: undefined,
        };
    }

    function checkDeclarationFiles(file: File, session: TestSession, expectedFiles: ReadonlyArray<File>): void {
        openFilesForSession([file], session);
        const project = Debug.assertDefined(session.getProjectService().getDefaultProjectForFile(file.path as server.NormalizedPath, /*ensureProject*/ false));
        const program = project.getCurrentProgram()!;
        const output = getFileEmitOutput(program, Debug.assertDefined(program.getSourceFile(file.path)), /*emitOnlyDtsFiles*/ true);
        closeFilesForSession([file], session);

        Debug.assert(!output.emitSkipped);
        assert.deepEqual(output.outputFiles, expectedFiles.map((e): OutputFile => ({ name: e.path, text: e.content, writeByteOrderMark: false })));
    }
}

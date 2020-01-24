namespace ts.projectSystem {
    describe("unittests:: tsserver:: ConfiguredProjects", () => {
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
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: `{
                    "files": ["commonFile1.ts"]
                }`
            };
            const commonFile1: File = {
                path: `${tscWatch.projectRoot}/commonFile1.ts`,
                content: "let x = 1"
            };
            const commonFile2: File = {
                path: `${tscWatch.projectRoot}/commonFile2.ts`,
                content: "let y = 1"
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

            const watchedFiles = getConfigFilesToWatch(tscWatch.projectRoot).concat(libFile.path);
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

        it("open file become a part of configured project if it is referenced from root file", () => {
            const file1 = {
                path: `${tscWatch.projectRoot}/a/b/f1.ts`,
                content: "export let x = 5"
            };
            const file2 = {
                path: `${tscWatch.projectRoot}/a/c/f2.ts`,
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: `${tscWatch.projectRoot}/a/c/f3.ts`,
                content: "export let y = 1"
            };
            const configFile = {
                path: `${tscWatch.projectRoot}/a/c/tsconfig.json`,
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

        it("when multiple projects are open, detects correct default project", () => {
            const barConfig: File = {
                path: `${tscWatch.projectRoot}/bar/tsconfig.json`,
                content: JSON.stringify({
                    include: ["index.ts"],
                    compilerOptions: {
                        lib: ["dom", "es2017"]
                    }
                })
            };
            const barIndex: File = {
                path: `${tscWatch.projectRoot}/bar/index.ts`,
                content: `
export function bar() {
  console.log("hello world");
}`
            };
            const fooConfig: File = {
                path: `${tscWatch.projectRoot}/foo/tsconfig.json`,
                content: JSON.stringify({
                    include: ["index.ts"],
                    compilerOptions: {
                        lib: ["es2017"]
                    }
                })
            };
            const fooIndex: File = {
                path: `${tscWatch.projectRoot}/foo/index.ts`,
                content: `
import { bar } from "bar";
bar();`
            };
            const barSymLink: SymLink = {
                path: `${tscWatch.projectRoot}/foo/node_modules/bar`,
                symLink: `${tscWatch.projectRoot}/bar`
            };

            const lib2017: File = {
                path: `${getDirectoryPath(libFile.path)}/lib.es2017.d.ts`,
                content: libFile.content
            };
            const libDom: File = {
                path: `${getDirectoryPath(libFile.path)}/lib.dom.d.ts`,
                content: `
declare var console: {
    log(...args: any[]): void;
};`
            };
            const host = createServerHost([barConfig, barIndex, fooConfig, fooIndex, barSymLink, lib2017, libDom]);
            const session = createSession(host, { canUseEvents: true, });
            openFilesForSession([fooIndex, barIndex], session);
            verifyGetErrRequest({
                session,
                host,
                expected: [
                    { file: barIndex, syntax: [], semantic: [], suggestion: [] },
                    { file: fooIndex, syntax: [], semantic: [], suggestion: [] },
                ]
            });
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
            const tsconfig: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([file, app, tsconfig, libFile]);
            const service = createProjectService(host);
            service.openClientFile(file.path);
        });
    });

    describe("unittests:: tsserver:: ConfiguredProjects:: non-existing directories listed in config file input array", () => {
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

            // Since file1 refers to config file as the default project, it needs to be kept alive
            checkNumberOfProjects(projectService, { inferredProjects: 1, configuredProjects: 1 });
            const inferredProject = projectService.inferredProjects[0];
            assert.isTrue(inferredProject.containsFile(<server.NormalizedPath>file1.path));
            assert.isFalse(projectService.configuredProjects.get(configFile.path)!.containsFile(<server.NormalizedPath>file1.path));
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
            // Since f refers to config file as the default project, it needs to be kept alive
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
        });

        it("should tolerate invalid include files that start in subDirectory", () => {
            const f = {
                path: `${tscWatch.projectRoot}/src/server/index.ts`,
                content: "let x = 1"
            };
            const config = {
                path: `${tscWatch.projectRoot}/src/server/tsconfig.json`,
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
            // Since f refers to config file as the default project, it needs to be kept alive
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
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
    });
}

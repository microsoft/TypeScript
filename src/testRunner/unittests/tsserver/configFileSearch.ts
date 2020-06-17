namespace ts.projectSystem {
    describe("unittests:: tsserver:: searching for config file", () => {
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
            host.deleteFile(configFile.path);
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
            host.deleteFile(configFile.path);
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
            const dirOfFile = getDirectoryPath(file.path);

            function openClientFile(files: File[]) {
                const host = createServerHost(files);
                const projectService = createProjectService(host);

                projectService.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a/b/projects/proj");
                return { host, projectService };
            }

            function verifyConfiguredProject(host: TestServerHost, projectService: TestProjectService, orphanInferredProject?: boolean) {
                projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: orphanInferredProject ? 1 : 0 });
                const project = Debug.checkDefined(projectService.configuredProjects.get(tsconfig.path));

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

                const filesToWatch = [libFile.path, ...getConfigFilesToWatch(dirOfFile)];

                checkProjectActualFiles(project, [file.path, libFile.path]);
                checkWatchedFiles(host, filesToWatch);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectories(host, getTypeRootsFromLocation(dirOfFile), /*recursive*/ true);
            }

            it("tsconfig for the file exists", () => {
                const { host, projectService } = openClientFile([file, libFile, tsconfig]);
                verifyConfiguredProject(host, projectService);

                host.deleteFile(tsconfig.path);
                host.runQueuedTimeoutCallbacks();
                verifyInferredProject(host, projectService);

                host.writeFile(tsconfig.path, tsconfig.content);
                host.runQueuedTimeoutCallbacks();
                verifyConfiguredProject(host, projectService, /*orphanInferredProject*/ true);
            });

            it("tsconfig for the file does not exist", () => {
                const { host, projectService } = openClientFile([file, libFile]);
                verifyInferredProject(host, projectService);

                host.writeFile(tsconfig.path, tsconfig.content);
                host.runQueuedTimeoutCallbacks();
                verifyConfiguredProject(host, projectService, /*orphanInferredProject*/ true);

                host.deleteFile(tsconfig.path);
                host.runQueuedTimeoutCallbacks();
                verifyInferredProject(host, projectService);
            });
        });

        describe("should not search and watch config files from directories that cannot be watched", () => {
            const root = "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace";
            function verifyConfigFileWatch(projectRootPath: string | undefined) {
                const path = `${root}/x.js`;
                const host = createServerHost([libFile, { path, content: "const x = 10" }], { useCaseSensitiveFileNames: true });
                const service = createProjectService(host);
                service.openClientFile(path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRootPath);
                checkNumberOfProjects(service, { inferredProjects: 1 });
                checkProjectActualFiles(service.inferredProjects[0], [path, libFile.path]);
                checkWatchedFilesDetailed(host, [libFile.path, ...getConfigFilesToWatch(root)], 1);
            }

            it("when projectRootPath is not present", () => {
                verifyConfigFileWatch(/*projectRootPath*/ undefined);
            });
            it("when projectRootPath is present but file is not from project root", () => {
                verifyConfigFileWatch("/a/b");
            });
        });
    });
}

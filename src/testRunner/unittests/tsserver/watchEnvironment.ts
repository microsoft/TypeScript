namespace ts.projectSystem {
    import Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory;
    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem watchDirectories implementation", () => {
        function verifyCompletionListWithNewFileInSubFolder(tscWatchDirectory: Tsc_WatchDirectory) {
            const projectFolder = "/a/username/project";
            const projectSrcFolder = `${projectFolder}/src`;
            const configFile: File = {
                path: `${projectFolder}/tsconfig.json`,
                content: "{}"
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
            const fileNames = files.map(file => file.path);
            // All closed files(files other than index), project folder, project/src folder and project/node_modules/@types folder
            const expectedWatchedFiles = arrayToMap(fileNames.slice(1), s => s, () => 1);
            const expectedWatchedDirectories = createMap<number>();
            const mapOfDirectories = tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory ?
                expectedWatchedDirectories :
                tscWatchDirectory === Tsc_WatchDirectory.WatchFile ?
                    expectedWatchedFiles :
                    createMap();
            // For failed resolution lookup and tsconfig files => cached so only watched only once
            mapOfDirectories.set(projectFolder, 1);
            // Through above recursive watches
            mapOfDirectories.set(projectSrcFolder, 1);
            // node_modules/@types folder
            mapOfDirectories.set(`${projectFolder}/${nodeModulesAtTypes}`, 1);
            const expectedCompletions = ["file1"];
            const completionPosition = index.content.lastIndexOf('"');
            const environmentVariables = createMap<string>();
            environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
            const host = createServerHost(files, { environmentVariables });
            const projectService = createProjectService(host);
            projectService.openClientFile(index.path);

            const project = Debug.assertDefined(projectService.configuredProjects.get(configFile.path));
            verifyProjectAndCompletions();

            // Add file2
            const file2: File = {
                path: `${projectSrcFolder}/file2.ts`,
                content: ""
            };
            files.push(file2);
            fileNames.push(file2.path);
            expectedWatchedFiles.set(file2.path, 1);
            expectedCompletions.push("file2");
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            assert.equal(projectService.configuredProjects.get(configFile.path), project);
            verifyProjectAndCompletions();

            function verifyProjectAndCompletions() {
                const completions = project.getLanguageService().getCompletionsAtPosition(index.path, completionPosition, { includeExternalModuleExports: false, includeInsertTextCompletions: false })!;
                checkArray("Completion Entries", completions.entries.map(e => e.name), expectedCompletions);

                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);

                checkWatchedFilesDetailed(host, expectedWatchedFiles);
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, /*recursive*/ false);
                checkProjectActualFiles(project, fileNames);
            }
        }

        it("uses watchFile when file is added to subfolder, completion list has new file", () => {
            verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.WatchFile);
        });

        it("uses non recursive watchDirectory when file is added to subfolder, completion list has new file", () => {
            verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.NonRecursiveWatchDirectory);
        });

        it("uses dynamic polling when file is added to subfolder, completion list has new file", () => {
            verifyCompletionListWithNewFileInSubFolder(Tsc_WatchDirectory.DynamicPolling);
        });
    });

    describe("unittests:: tsserver:: watchEnvironment:: tsserverProjectSystem Watched recursive directories with windows style file system", () => {
        function verifyWatchedDirectories(rootedPath: string, useProjectAtRoot: boolean) {
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
            const host = createServerHost(files, { useWindowsStylePaths: true });
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            const project = projectService.configuredProjects.get(configFile.path)!;
            assert.isDefined(project);
            const winsowsStyleLibFilePath = "c:/" + libFile.path.substring(1);
            checkProjectActualFiles(project, files.map(f => f === libFile ? winsowsStyleLibFilePath : f.path));
            checkWatchedFiles(host, mapDefined(files, f => f === libFile ? winsowsStyleLibFilePath : f === file1 ? undefined : f.path));
            checkWatchedDirectories(host, [], /*recursive*/ false);
            checkWatchedDirectories(host, [
                root + "project",
                root + "project/node_modules/@types"
            ].concat(useProjectAtRoot ? [] : [root + nodeModulesAtTypes]), /*recursive*/ true);
        }

        function verifyRootedDirectoryWatch(rootedPath: string) {
            it("When project is in rootFolder of style c:/", () => {
                verifyWatchedDirectories(rootedPath, /*useProjectAtRoot*/ true);
            });

            it("When files at some folder other than root", () => {
                verifyWatchedDirectories(rootedPath, /*useProjectAtRoot*/ false);
            });
        }

        describe("for rootFolder of style c:/", () => {
            verifyRootedDirectoryWatch("c:/");
        });

        describe("for rootFolder of style c:/users/username", () => {
            verifyRootedDirectoryWatch("c:/users/username/");
        });
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

        const fileNames = [index, file1, configFile, libFile].map(file => file.path);
        // All closed files(files other than index), project folder, project/src folder and project/node_modules/@types folder
        const expectedWatchedFiles = arrayToMap(fileNames.slice(1), identity, () => 1);
        const expectedWatchedDirectories = arrayToMap([projectFolder, projectSrcFolder, `${projectFolder}/${nodeModules}`, `${projectFolder}/${nodeModulesAtTypes}`], identity, () => 1);

        const environmentVariables = createMap<string>();
        environmentVariables.set("TSC_WATCHDIRECTORY", Tsc_WatchDirectory.NonRecursiveWatchDirectory);
        const host = createServerHost([index, file1, configFile, libFile, nodeModulesExistingUnusedFile], { environmentVariables });
        const projectService = createProjectService(host);
        projectService.openClientFile(index.path);

        const project = Debug.assertDefined(projectService.configuredProjects.get(configFile.path));
        verifyProject();

        const nodeModulesIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/node_modules/.cache/someFile.d.ts`,
            content: ""
        };
        host.ensureFileOrFolder(nodeModulesIgnoredFileFromIgnoreDirectory);
        host.checkTimeoutQueueLength(0);
        verifyProject();

        const nodeModulesIgnoredFile: File = {
            path: `${projectFolder}/node_modules/.cacheFile.ts`,
            content: ""
        };
        host.ensureFileOrFolder(nodeModulesIgnoredFile);
        host.checkTimeoutQueueLength(0);
        verifyProject();

        const gitIgnoredFileFromIgnoreDirectory: File = {
            path: `${projectFolder}/.git/someFile.d.ts`,
            content: ""
        };
        host.ensureFileOrFolder(gitIgnoredFileFromIgnoreDirectory);
        host.checkTimeoutQueueLength(0);
        verifyProject();

        const gitIgnoredFile: File = {
            path: `${projectFolder}/.gitCache.d.ts`,
            content: ""
        };
        host.ensureFileOrFolder(gitIgnoredFile);
        host.checkTimeoutQueueLength(0);
        verifyProject();

        function verifyProject() {
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
            checkWatchedFilesDetailed(host, expectedWatchedFiles);
            checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, /*recursive*/ false);
            checkProjectActualFiles(project, fileNames);
        }
    });

}

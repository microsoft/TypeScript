namespace ts.projectSystem {
    describe("unittests:: tsserver:: Open-file", () => {
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
}

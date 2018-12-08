namespace ts.projectSystem {
    describe("tsserver:: Inferred projects", () => {
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
}

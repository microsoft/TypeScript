namespace ts.projectSystem {
    export function verifyDynamic(service: server.ProjectService, path: string) {
        const info = Debug.checkDefined(service.filenameToScriptInfo.get(path), `Expected ${path} in :: ${JSON.stringify(arrayFrom(service.filenameToScriptInfo.entries(), ([key, f]) => ({ key, fileName: f.fileName, path: f.path })))}`);
        assert.isTrue(info.isDynamic);
    }

    function verifyPathRecognizedAsDynamic(path: string) {
        const file: File = {
            path,
            content: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />
/// <reference path="../../../../../../typings/@epic/Shell.d.ts" />
var x = 10;`
        };
        const host = createServerHost([libFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(file.path, file.content);
        verifyDynamic(projectService, projectService.toPath(file.path));

        projectService.checkNumberOfProjects({ inferredProjects: 1 });
        const project = projectService.inferredProjects[0];
        checkProjectRootFiles(project, [file.path]);
        checkProjectActualFiles(project, [file.path, libFile.path]);
    }

    describe("unittests:: tsserver:: dynamicFiles:: Untitled files", () => {
        const untitledFile = "untitled:^Untitled-1";
        it("Can convert positions to locations", () => {
            const aTs: File = { path: "/proj/a.ts", content: "" };
            const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
            const session = createSession(createServerHost([aTs, tsconfig]), { useInferredProjectPerProjectRoot: true });

            openFilesForSession([aTs], session);

            executeSessionRequestNoResponse<protocol.OpenRequest>(session, protocol.CommandTypes.Open, {
                file: untitledFile,
                fileContent: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />\nlet foo = 1;\nfooo/**/`,
                scriptKindName: "TS",
                projectRootPath: "/proj",
            });
            verifyDynamic(session.getProjectService(), `/proj/untitled:^untitled-1`);
            const response = executeSessionRequest<protocol.CodeFixRequest, protocol.CodeFixResponse>(session, protocol.CommandTypes.GetCodeFixes, {
                file: untitledFile,
                startLine: 3,
                startOffset: 1,
                endLine: 3,
                endOffset: 5,
                errorCodes: [Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
            });
            assert.deepEqual<readonly protocol.CodeFixAction[] | undefined>(response, [
                {
                    description: "Change spelling to 'foo'",
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
                    fixId: undefined,
                    fixAllDescription: undefined
                },
            ]);
        });

        it("opening untitled files", () => {
            const config: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([config, libFile], { useCaseSensitiveFileNames: true, currentDirectory: tscWatch.projectRoot });
            const service = createProjectService(host);
            service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, tscWatch.projectRoot);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
            verifyDynamic(service, `${tscWatch.projectRoot}/${untitledFile}`);

            const untitled: File = {
                path: `${tscWatch.projectRoot}/Untitled-1.ts`,
                content: "const x = 10;"
            };
            host.writeFile(untitled.path, untitled.content);
            host.checkTimeoutQueueLength(0);
            service.openClientFile(untitled.path, untitled.content, /*scriptKind*/ undefined, tscWatch.projectRoot);
            checkNumberOfProjects(service, { configuredProjects: 1, inferredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);

            service.closeClientFile(untitledFile);
            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);

            service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, tscWatch.projectRoot);
            verifyDynamic(service, `${tscWatch.projectRoot}/${untitledFile}`);
            checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
        });

        it("opening and closing untitled files when projectRootPath is different from currentDirectory", () => {
            const config: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const file: File = {
                path: `${tscWatch.projectRoot}/file.ts`,
                content: "const y = 10"
            };
            const host = createServerHost([config, file, libFile], { useCaseSensitiveFileNames: true });
            const service = createProjectService(host, /*parameters*/ undefined, { useInferredProjectPerProjectRoot: true });
            service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, tscWatch.projectRoot);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
            verifyDynamic(service, `${tscWatch.projectRoot}/${untitledFile}`);

            // Close untitled file
            service.closeClientFile(untitledFile);

            // Open file from configured project which should collect inferredProject
            service.openClientFile(file.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
        });
    });

    describe("unittests:: tsserver:: dynamicFiles:: ", () => {
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
            verifyDynamic(projectService, `/${file.path}`);

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
            verifyPathRecognizedAsDynamic("^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js");
        });

        describe("dynamic file with projectRootPath", () => {
            const file: File = {
                path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
                content: "var x = 10;"
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const configProjectFile: File = {
                path: `${tscWatch.projectRoot}/a.ts`,
                content: "let y = 10;"
            };
            it("with useInferredProjectPerProjectRoot", () => {
                const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
                const session = createSession(host, { useInferredProjectPerProjectRoot: true });
                openFilesForSession([{ file: file.path, projectRootPath: tscWatch.projectRoot }], session);

                const projectService = session.getProjectService();
                checkNumberOfProjects(projectService, { inferredProjects: 1 });
                checkProjectActualFiles(projectService.inferredProjects[0], [file.path, libFile.path]);
                verifyDynamic(projectService, `${tscWatch.projectRoot}/${file.path}`);

                session.executeCommandSeq<protocol.OutliningSpansRequest>({
                    command: protocol.CommandTypes.GetOutliningSpans,
                    arguments: {
                        file: file.path
                    }
                });

                // Without project root
                const file2Path = file.path.replace("#1", "#2");
                projectService.openClientFile(file2Path, file.content);
                checkNumberOfProjects(projectService, { inferredProjects: 2 });
                checkProjectActualFiles(projectService.inferredProjects[0], [file.path, libFile.path]);
                checkProjectActualFiles(projectService.inferredProjects[1], [file2Path, libFile.path]);
            });

            it("fails when useInferredProjectPerProjectRoot is false", () => {
                const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
                const projectService = createProjectService(host);
                try {
                    projectService.openClientFile(file.path, file.content, /*scriptKind*/ undefined, tscWatch.projectRoot);
                }
                catch (e) {
                    assert.strictEqual(
                        e.message.replace(/\r?\n/, "\n"),
                        `Debug Failure. False expression.\nVerbose Debug Information: {"fileName":"^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js","currentDirectory":"/user/username/projects/myproject","hostCurrentDirectory":"/","openKeys":[]}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`
                    );
                }
                const file2Path = file.path.replace("#1", "#2");
                projectService.openClientFile(file2Path, file.content);
                projectService.checkNumberOfProjects({ inferredProjects: 1 });
                checkProjectActualFiles(projectService.inferredProjects[0], [file2Path, libFile.path]);
            });
        });

        describe("verify accepts known schemas as dynamic file", () => {
            it("walkThroughSnippet", () => {
                verifyPathRecognizedAsDynamic("walkThroughSnippet:/usr/share/code/resources/app/out/vs/workbench/contrib/welcome/walkThrough/browser/editor/^vs_code_editor_walkthrough.md#1.ts");
            });

            it("untitled", () => {
                verifyPathRecognizedAsDynamic("untitled:/Users/matb/projects/san/^newFile.ts");
            });
        });
    });
}

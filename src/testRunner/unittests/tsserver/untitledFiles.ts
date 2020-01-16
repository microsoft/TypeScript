namespace ts.projectSystem {
    describe("unittests:: tsserver:: Untitled files", () => {
        const untitledFile = "untitled:^Untitled-1";
        it("Can convert positions to locations", () => {
            const aTs: File = { path: "/proj/a.ts", content: "" };
            const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
            const session = createSession(createServerHost([aTs, tsconfig]));

            openFilesForSession([aTs], session);

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
            assert.deepEqual<readonly protocol.CodeFixAction[] | undefined>(response, [
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

        it("opening untitled files", () => {
            const config: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([config, libFile], { useCaseSensitiveFileNames: true, currentDirectory: tscWatch.projectRoot });
            const service = createProjectService(host, { logger: createLoggerWritingToConsole() });
            service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, tscWatch.projectRoot);
            checkNumberOfProjects(service, { configuredProjects: 1, inferredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects.get("tsconfig.json")!, ["tsconfig.json"]);
            checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);

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
        });
    });
}

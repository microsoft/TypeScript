namespace ts.projectSystem {
    export function verifyDynamic(service: server.ProjectService, path: string) {
        const info = Debug.assertDefined(service.filenameToScriptInfo.get(path), `Expected ${path} in :: ${JSON.stringify(arrayFrom(service.filenameToScriptInfo.entries(), ([key, f]) => ({ key, fileName: f.fileName, path: f.path })))}`);
        assert.isTrue(info.isDynamic);
    }

    describe("unittests:: tsserver:: Untitled files", () => {
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
    });
}

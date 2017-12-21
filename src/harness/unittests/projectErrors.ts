/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />
/// <reference path="../fakes.ts" />

namespace ts.projectSystem {
    describe("Project errors", () => {
        function checkProjectErrors(projectFiles: server.ProjectFilesWithTSDiagnostics, expectedErrors: ReadonlyArray<string>): void {
            assert.isTrue(projectFiles !== undefined, "missing project files");
            checkProjectErrorsWorker(projectFiles.projectErrors, expectedErrors);
        }

        function checkProjectErrorsWorker(errors: ReadonlyArray<Diagnostic>, expectedErrors: ReadonlyArray<string>): void {
            assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
            if (expectedErrors.length) {
                for (let i = 0; i < errors.length; i++) {
                    const actualMessage = flattenDiagnosticMessageText(errors[i].messageText, "\n");
                    const expectedMessage = expectedErrors[i];
                    assert.isTrue(actualMessage.indexOf(expectedMessage) === 0, `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
                }
            }
        }

        function checkDiagnosticsWithLinePos(errors: server.protocol.DiagnosticWithLinePosition[], expectedErrors: string[]) {
            assert.equal(errors ? errors.length : 0, expectedErrors.length, `expected ${expectedErrors.length} error in the list`);
            if (expectedErrors.length) {
                zipWith(errors, expectedErrors, ({ message: actualMessage }, expectedMessage) => {
                    assert.isTrue(startsWith(actualMessage, actualMessage), `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
                });
            }
        }

        it("external project - diagnostics for missing files", () => {
            const host = new fakes.FakeServerHost({ safeList: true, lib: true }, /*files*/ {
                "/a/b/app.ts": ``,
            });

            const projectFileName = "/a/b/test.csproj";

            const session = createSession(host);
            const projectService = session.getProjectService();
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: toExternalFiles(["/a/b/app.ts", "/a/b/applib.ts"])
            });

            // only file1 exists - expect error
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags1 = sendCompilerOptionsDiagnosticsRequest(session, { projectFileName }, /*seq*/ 2);
            checkDiagnosticsWithLinePos(diags1, ["File '/a/b/applib.ts' not found."]);

            host.vfs.unlinkSync("/a/b/app.ts");
            host.vfs.writeFileSync("/a/b/applib.ts", ``);

            // only file2 exists - expect error
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags2 = sendCompilerOptionsDiagnosticsRequest(session, { projectFileName }, /*seq*/ 2);
            checkDiagnosticsWithLinePos(diags2, ["File '/a/b/app.ts' not found."]);

            host.vfs.writeFileSync("/a/b/app.ts", ``);

            // both files exist - expect no errors
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            const diags3 = sendCompilerOptionsDiagnosticsRequest(session, { projectFileName }, /*seq*/ 2);
            checkDiagnosticsWithLinePos(diags3, []);
        });

        it("configured projects - diagnostics for missing files", () => {
            const host = new fakes.FakeServerHost({ safeList: true, lib: true }, /*files*/ {
                "/a/b/app.ts": ``,
                "/a/b/tsconfig.json": `{ "files": ["app.ts", "applib.ts"] }`,
            });

            const session = createSession(host);
            const projectService = session.getProjectService();

            openFilesForSession(["/a/b/app.ts"], session);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            const diags1 = sendCompilerOptionsDiagnosticsRequest(session, { projectFileName: project.getProjectName() }, /*seq*/ 2);
            checkDiagnosticsWithLinePos(diags1, ["File '/a/b/applib.ts' not found."]);

            host.vfs.writeFileSync("/a/b/applib.ts", ``);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const diags2 = sendCompilerOptionsDiagnosticsRequest(session, { projectFileName: project.getProjectName() }, /*seq*/ 2);
            checkDiagnosticsWithLinePos(diags2, []);
        });

        it("configured projects - diagnostics for corrupted config 1", () => {
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                "/a/b/app.ts": ``,
                "/a/b/lib.ts": ``,
                "/a/b/tsconfig.json": ` "files": ["app.ts", "lib.ts"] }`,
            });

            const projectService = createProjectService(host);

            projectService.openClientFile("/a/b/app.ts");

            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const configuredProject1 = find(projectService.synchronizeProjectList([]), f => f.info.projectName === "/a/b/tsconfig.json");
            assert.isTrue(configuredProject1 !== undefined, "should find configured project");
            checkProjectErrors(configuredProject1, []);

            const projectErrors1 = configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors1, ["'{' expected."]);
            assert.isNotNull(projectErrors1[0].file);
            assert.equal(projectErrors1[0].file.fileName, "/a/b/tsconfig.json");

            // fix config and trigger watcher
            host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "files": ["app.ts", "lib.ts"] }`);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const configuredProject2 = find(projectService.synchronizeProjectList([]), f => f.info.projectName === "/a/b/tsconfig.json");
            assert.isTrue(configuredProject2 !== undefined, "should find configured project");
            checkProjectErrors(configuredProject2, []);

            const projectErrors2 = configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors2, []);
        });

        it("configured projects - diagnostics for corrupted config 2", () => {
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                "/a/b/app.ts": ``,
                "/a/b/lib.ts": ``,
                "/a/b/tsconfig.json": `{ "files": ["app.ts", "lib.ts"] }`,
            });

            const projectService = createProjectService(host);

            projectService.openClientFile("/a/b/app.ts");

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            const configuredProject1 = find(projectService.synchronizeProjectList([]), f => f.info.projectName === "/a/b/tsconfig.json");
            assert.isTrue(configuredProject1 !== undefined, "should find configured project");
            checkProjectErrors(configuredProject1, []);

            const projectErrors1 = configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors1, []);

            // break config and trigger watcher
            host.vfs.writeFileSync("/a/b/tsconfig.json", ` "files": ["app.ts", "lib.ts"] }`);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const configuredProject2 = find(projectService.synchronizeProjectList([]), f => f.info.projectName === "/a/b/tsconfig.json");
            assert.isTrue(configuredProject2 !== undefined, "should find configured project");
            checkProjectErrors(configuredProject2, []);

            const projectErrors2 = configuredProjectAt(projectService, 0).getAllProjectErrors();
            checkProjectErrorsWorker(projectErrors2, ["'{' expected."]);
            assert.isNotNull(projectErrors2[0].file);
            assert.equal(projectErrors2[0].file.fileName, "/a/b/tsconfig.json");
        });
    });
}

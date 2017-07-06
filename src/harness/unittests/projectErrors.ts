/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    describe("Project errors", () => {
        function checkProjectErrors(projectFiles: server.ProjectFilesWithTSDiagnostics, expectedErrors: string[]) {
            assert.isTrue(projectFiles !== undefined, "missing project files");
            checkProjectErrorsWorker(projectFiles.projectErrors, expectedErrors);
        }

        function checkProjectErrorsWorker(errors: Diagnostic[], expectedErrors: string[]) {
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
                for (let i = 0; i < errors.length; i++) {
                    const actualMessage = errors[i].message;
                    const expectedMessage = expectedErrors[i];
                    assert.isTrue(actualMessage.indexOf(errors[i].message) === 0, `error message does not match, expected ${actualMessage} to start with ${expectedMessage}`);
                }
            }
        }

        it("external project - diagnostics for missing files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/applib.ts",
                content: ""
            };
            // only file1 exists - expect error
            const host = createServerHost([file1, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const projectFileName = "/a/b/test.csproj";
            const compilerOptionsRequest = <server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName }
            };

            {
                projectService.openExternalProject({
                    projectFileName,
                    options: {},
                    rootFiles: toExternalFiles([file1.path, file2.path])
                });

                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response;
                checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);
            }
            // only file2 exists - expect error
            host.reloadFS([file2, libFile]);
            {
                host.triggerFileWatcherCallback(file1.path, FileWatcherEventKind.Deleted);
                host.triggerFileWatcherCallback(file2.path, FileWatcherEventKind.Created);
                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response;
                checkDiagnosticsWithLinePos(diags, ["File '/a/b/app.ts' not found."]);
            }

            // both files exist - expect no errors
            host.reloadFS([file1, file2, libFile]);
            {
                host.triggerFileWatcherCallback(file1.path, FileWatcherEventKind.Created);
                checkNumberOfProjects(projectService, { externalProjects: 1 });
                const diags = session.executeCommand(compilerOptionsRequest).response;
                checkDiagnosticsWithLinePos(diags, []);
            }
        });

        it("configured projects - diagnostics for missing files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/applib.ts",
                content: ""
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const host = createServerHost([file1, config, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = projectService.configuredProjects[0];
            const compilerOptionsRequest = <server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName: project.getProjectName() }
            };
            let diags = session.executeCommand(compilerOptionsRequest).response;
            checkDiagnosticsWithLinePos(diags, ["File '/a/b/applib.ts' not found."]);

            host.reloadFS([file1, file2, config, libFile]);
            host.triggerFileWatcherCallback(file2.path, FileWatcherEventKind.Created);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            diags = session.executeCommand(compilerOptionsRequest).response;
            checkDiagnosticsWithLinePos(diags, []);
        });

        it("configured projects - diagnostics for corrupted config 1", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const correctConfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const corruptedConfig = {
                path: correctConfig.path,
                content: correctConfig.content.substr(1)
            };
            const host = createServerHost([file1, file2, corruptedConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = forEach(projectService.synchronizeProjectList([]), f => f.info.projectName === corruptedConfig.path && f);
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = projectService.configuredProjects[0].getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, [
                    "'{' expected."
                ]);
                assert.isNotNull(projectErrors[0].file);
                assert.equal(projectErrors[0].file.fileName, corruptedConfig.path);
            }
            // fix config and trigger watcher
            host.reloadFS([file1, file2, correctConfig]);
            host.triggerFileWatcherCallback(correctConfig.path, FileWatcherEventKind.Changed);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = forEach(projectService.synchronizeProjectList([]), f => f.info.projectName === corruptedConfig.path && f);
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = projectService.configuredProjects[0].getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, []);
            }
        });

        it("configured projects - diagnostics for corrupted config 2", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const correctConfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const corruptedConfig = {
                path: correctConfig.path,
                content: correctConfig.content.substr(1)
            };
            const host = createServerHost([file1, file2, correctConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = forEach(projectService.synchronizeProjectList([]), f => f.info.projectName === corruptedConfig.path && f);
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = projectService.configuredProjects[0].getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, []);
            }
            // break config and trigger watcher
            host.reloadFS([file1, file2, corruptedConfig]);
            host.triggerFileWatcherCallback(corruptedConfig.path, FileWatcherEventKind.Changed);
            {
                projectService.checkNumberOfProjects({ configuredProjects: 1 });
                const configuredProject = forEach(projectService.synchronizeProjectList([]), f => f.info.projectName === corruptedConfig.path && f);
                assert.isTrue(configuredProject !== undefined, "should find configured project");
                checkProjectErrors(configuredProject, []);
                const projectErrors = projectService.configuredProjects[0].getAllProjectErrors();
                checkProjectErrorsWorker(projectErrors, [
                    "'{' expected."
                ]);
                assert.isNotNull(projectErrors[0].file);
                assert.equal(projectErrors[0].file.fileName, corruptedConfig.path);
            }
        });
    });
}

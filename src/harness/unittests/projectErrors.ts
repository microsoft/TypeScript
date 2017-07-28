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

        it("external project - diagnostics for missing files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            // only file1 exists - expect error
            const host = createServerHost([file1]);
            const projectService = createProjectService(host);
            const projectFileName = "/a/b/test.csproj";

            {
                projectService.openExternalProject({
                    projectFileName,
                    options: {},
                    rootFiles: toExternalFiles([file1.path, file2.path])
                });

                projectService.checkNumberOfProjects({ externalProjects: 1 });
                const knownProjects = projectService.synchronizeProjectList([]);
                checkProjectErrors(knownProjects[0], ["File '/a/b/lib.ts' not found."]);
            }
            // only file2 exists - expect error
            host.reloadFS([file2]);
            {
                projectService.openExternalProject({
                    projectFileName,
                    options: {},
                    rootFiles: toExternalFiles([file1.path, file2.path])
                });
                projectService.checkNumberOfProjects({ externalProjects: 1 });
                const knownProjects = projectService.synchronizeProjectList([]);
                checkProjectErrors(knownProjects[0], ["File '/a/b/app.ts' not found."]);
            }

            // both files exist - expect no errors
            host.reloadFS([file1, file2]);
            {
                projectService.openExternalProject({
                    projectFileName,
                    options: {},
                    rootFiles: toExternalFiles([file1.path, file2.path])
                });

                projectService.checkNumberOfProjects({ externalProjects: 1 });
                const knownProjects = projectService.synchronizeProjectList([]);
                checkProjectErrors(knownProjects[0], []);
            }
        });

        it("configured projects - diagnostics for missing files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const file2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ files: [file1, file2].map(f => getBaseFileName(f.path)) })
            };
            const host = createServerHost([file1, config]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectErrors(projectService.synchronizeProjectList([])[0], ["File '/a/b/lib.ts' not found."]);

            host.reloadFS([file1, file2, config]);

            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectErrors(projectService.synchronizeProjectList([])[0], []);
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

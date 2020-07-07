namespace ts.projectSystem {
    describe("unittests:: tsserver:: events:: ProjectLanguageServiceStateEvent", () => {
        it("language service disabled events are triggered", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const configWithExclude = {
                path: config.path,
                content: JSON.stringify({ exclude: ["largefile.js"] })
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const { session, events } = createSessionWithEventTracking<server.ProjectLanguageServiceStateEvent>(host, server.ProjectLanguageServiceStateEvent);
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.equal(events.length, 1, "should receive event");
            assert.equal(events[0].data.project, project, "project name");
            assert.equal(events[0].data.project.getProjectName(), config.path, "config path");
            assert.isFalse(events[0].data.languageServiceEnabled, "Language service state");

            host.writeFile(configWithExclude.path, configWithExclude.content);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isTrue(project.languageServiceEnabled, "Language service enabled");
            assert.equal(events.length, 2, "should receive event");
            assert.equal(events[1].data.project, project, "project");
            assert.equal(events[1].data.project.getProjectName(), config.path, "config path");
            assert.isTrue(events[1].data.languageServiceEnabled, "Language service state");
        });
    });
}

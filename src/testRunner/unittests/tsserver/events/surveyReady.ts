namespace ts.projectSystem {
    describe("unittests:: tsserver:: events:: SurveyReady", () => {
        function createSessionWithEventHandler(host: TestServerHost) {
            const { session, events: surveyEvents } = createSessionWithEventTracking<server.SurveyReady>(host, server.SurveyReady);

            return { session, verifySurveyReadyEvent };

            function verifySurveyReadyEvent(numberOfEvents: number) {
                assert.equal(surveyEvents.length, numberOfEvents);
                const expectedEvents = numberOfEvents === 0 ? [] : [{
                    eventName: server.SurveyReady,
                    data: { surveyId: "checkJs" }
                }];
                assert.deepEqual(surveyEvents, expectedEvents);
            }
        }

        it("doesn't log an event when checkJs isn't set", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            const service = session.getProjectService();
            openFilesForSession([file], session);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, [file.path, tsconfig.path]);

            verifySurveyReadyEvent(0);
        });

        it("logs an event when checkJs is set", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { checkJs: true } }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });

        it("logs an event when checkJs is set, only the first time", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const rando: File = {
                path: `/rando/calrissian.ts`,
                content: "export function f() { }"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { checkJs: true } }),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);

            closeFilesForSession([file], session);
            openFilesForSession([rando], session);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });

        it("logs an event when checkJs is set after closing and reopening", () => {
            const projectRoot = "/user/username/projects/project";
            const file: File = {
                path: `${projectRoot}/src/file.ts`,
                content: "export var y = 10;"
            };
            const rando: File = {
                path: `/rando/calrissian.ts`,
                content: "export function f() { }"
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({}),
            };
            const host = createServerHost([file, tsconfig]);
            const { session, verifySurveyReadyEvent } = createSessionWithEventHandler(host);
            openFilesForSession([file], session);

            verifySurveyReadyEvent(0);

            closeFilesForSession([file], session);
            openFilesForSession([rando], session);
            host.writeFile(tsconfig.path, JSON.stringify({ compilerOptions: { checkJs: true } }));
            openFilesForSession([file], session);

            verifySurveyReadyEvent(1);
        });
    });
}

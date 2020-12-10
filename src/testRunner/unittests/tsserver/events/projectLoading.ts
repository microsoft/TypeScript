namespace ts.projectSystem {
    describe("unittests:: tsserver:: events:: ProjectLoadingStart and ProjectLoadingFinish events", () => {
        const aTs: File = {
            path: `${tscWatch.projects}/a/a.ts`,
            content: "export class A { }"
        };
        const configA: File = {
            path: `${tscWatch.projects}/a/tsconfig.json`,
            content: "{}"
        };
        const bTsPath = `${tscWatch.projects}/b/b.ts`;
        const configBPath = `${tscWatch.projects}/b/tsconfig.json`;
        const files = [libFile, aTs, configA];

        function verifyProjectLoadingStartAndFinish(createSession: (host: TestServerHost) => {
            session: TestSession;
            getNumberOfEvents: () => number;
            clearEvents: () => void;
            verifyProjectLoadEvents: (expected: [server.ProjectLoadingStartEvent, server.ProjectLoadingFinishEvent]) => void;
        }) {
            function createSessionToVerifyEvent(files: readonly File[]) {
                const host = createServerHost(files);
                const originalReadFile = host.readFile;
                const { session, getNumberOfEvents, clearEvents, verifyProjectLoadEvents } = createSession(host);
                host.readFile = file => {
                    if (file === configA.path || file === configBPath) {
                        assert.equal(getNumberOfEvents(), 1, "Event for loading is sent before reading config file");
                    }
                    return originalReadFile.call(host, file);
                };
                const service = session.getProjectService();
                return { host, session, verifyEvent, verifyEventWithOpenTs, service, getNumberOfEvents };

                function verifyEvent(project: server.Project, reason: string) {
                    verifyProjectLoadEvents([
                        { eventName: server.ProjectLoadingStartEvent, data: { project, reason } },
                        { eventName: server.ProjectLoadingFinishEvent, data: { project } }
                    ]);
                    clearEvents();
                }

                function verifyEventWithOpenTs(file: File, configPath: string, configuredProjects: number) {
                    openFilesForSession([file], session);
                    checkNumberOfProjects(service, { configuredProjects });
                    const project = service.configuredProjects.get(configPath)!;
                    assert.isDefined(project);
                    verifyEvent(project, `Creating possible configured project for ${file.path} to open`);
                }
            }

            it("when project is created by open file", () => {
                const bTs: File = {
                    path: bTsPath,
                    content: "export class B {}"
                };
                const configB: File = {
                    path: configBPath,
                    content: "{}"
                };
                const { verifyEventWithOpenTs } = createSessionToVerifyEvent(files.concat(bTs, configB));
                verifyEventWithOpenTs(aTs, configA.path, 1);
                verifyEventWithOpenTs(bTs, configB.path, 2);
            });

            it("when change is detected in the config file", () => {
                const { host, verifyEvent, verifyEventWithOpenTs, service } = createSessionToVerifyEvent(files);
                verifyEventWithOpenTs(aTs, configA.path, 1);

                host.writeFile(configA.path, configA.content);
                host.checkTimeoutQueueLengthAndRun(2);
                const project = service.configuredProjects.get(configA.path)!;
                verifyEvent(project, `Change in config file detected`);
            });

            it("when change is detected in an extended config file", () => {
                const bTs: File = {
                    path: bTsPath,
                    content: "export class B {}"
                };
                const configB: File = {
                    path: configBPath,
                    content: JSON.stringify({
                        extends: "../a/tsconfig.json",
                    })
                };
                const { host, verifyEvent, verifyEventWithOpenTs, service } = createSessionToVerifyEvent(files.concat(bTs, configB));
                verifyEventWithOpenTs(bTs, configB.path, 1);

                host.writeFile(configA.path, configA.content);
                host.checkTimeoutQueueLengthAndRun(2);
                const project = service.configuredProjects.get(configB.path)!;
                verifyEvent(project, `Change in extended config file ${configA.path} detected`);
            });

            describe("when opening original location project", () => {
                it("with project references", () => {
                    verify();
                });

                it("when disableSourceOfProjectReferenceRedirect is true", () => {
                    verify(/*disableSourceOfProjectReferenceRedirect*/ true);
                });

                function verify(disableSourceOfProjectReferenceRedirect?: true) {
                    const aDTs: File = {
                        path: `${tscWatch.projects}/a/a.d.ts`,
                        content: `export declare class A {
}
//# sourceMappingURL=a.d.ts.map
`
                    };
                    const aDTsMap: File = {
                        path: `${tscWatch.projects}/a/a.d.ts.map`,
                        content: `{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["./a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;CAAI"}`
                    };
                    const bTs: File = {
                        path: bTsPath,
                        content: `import {A} from "../a/a"; new A();`
                    };
                    const configB: File = {
                        path: configBPath,
                        content: JSON.stringify({
                            ...(disableSourceOfProjectReferenceRedirect && {
                                compilerOptions: {
                                    disableSourceOfProjectReferenceRedirect
                                }
                            }),
                            references: [{ path: "../a" }]
                        })
                    };

                    const { service, session, verifyEventWithOpenTs, verifyEvent } = createSessionToVerifyEvent(files.concat(aDTs, aDTsMap, bTs, configB));
                    verifyEventWithOpenTs(bTs, configB.path, 1);

                    session.executeCommandSeq<protocol.ReferencesRequest>({
                        command: protocol.CommandTypes.References,
                        arguments: {
                            file: bTs.path,
                            ...protocolLocationFromSubstring(bTs.content, "A()")
                        }
                    });

                    checkNumberOfProjects(service, { configuredProjects: 2 });
                    const project = service.configuredProjects.get(configA.path)!;
                    assert.isDefined(project);
                    verifyEvent(
                        project,
                        disableSourceOfProjectReferenceRedirect ?
                            `Creating project for original file: ${aTs.path} for location: ${aDTs.path}` :
                            `Creating project for original file: ${aTs.path}`
                    );
                }
            });

            describe("with external projects and config files ", () => {
                const projectFileName = `${tscWatch.projects}/a/project.csproj`;

                function createSession(lazyConfiguredProjectsFromExternalProject: boolean) {
                    const { session, service, verifyEvent: verifyEventWorker, getNumberOfEvents } = createSessionToVerifyEvent(files);
                    service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject } });
                    service.openExternalProject(<protocol.ExternalProject>{
                        projectFileName,
                        rootFiles: toExternalFiles([aTs.path, configA.path]),
                        options: {}
                    });
                    checkNumberOfProjects(service, { configuredProjects: 1 });
                    return { session, service, verifyEvent, getNumberOfEvents };

                    function verifyEvent() {
                        const projectA = service.configuredProjects.get(configA.path)!;
                        assert.isDefined(projectA);
                        verifyEventWorker(projectA, `Creating configured project in external project: ${projectFileName}`);
                    }
                }

                it("when lazyConfiguredProjectsFromExternalProject is false", () => {
                    const { verifyEvent } = createSession(/*lazyConfiguredProjectsFromExternalProject*/ false);
                    verifyEvent();
                });

                it("when lazyConfiguredProjectsFromExternalProject is true and file is opened", () => {
                    const { verifyEvent, getNumberOfEvents, session } = createSession(/*lazyConfiguredProjectsFromExternalProject*/ true);
                    assert.equal(getNumberOfEvents(), 0);

                    openFilesForSession([aTs], session);
                    verifyEvent();
                });

                it("when lazyConfiguredProjectsFromExternalProject is disabled", () => {
                    const { verifyEvent, getNumberOfEvents, service } = createSession(/*lazyConfiguredProjectsFromExternalProject*/ true);
                    assert.equal(getNumberOfEvents(), 0);

                    service.setHostConfiguration({ preferences: { lazyConfiguredProjectsFromExternalProject: false } });
                    verifyEvent();
                });
            });
        }

        describe("when using event handler", () => {
            verifyProjectLoadingStartAndFinish(host => {
                const { session, events } = createSessionWithEventTracking<server.ProjectLoadingStartEvent | server.ProjectLoadingFinishEvent>(host, server.ProjectLoadingStartEvent, server.ProjectLoadingFinishEvent);
                return {
                    session,
                    getNumberOfEvents: () => events.length,
                    clearEvents: () => events.length = 0,
                    verifyProjectLoadEvents: expected => assert.deepEqual(events, expected)
                };
            });
        });

        describe("when using default event handler", () => {
            verifyProjectLoadingStartAndFinish(host => {
                const { session, getEvents, clearEvents } = createSessionWithDefaultEventHandler<protocol.ProjectLoadingStartEvent | protocol.ProjectLoadingFinishEvent>(host, [server.ProjectLoadingStartEvent, server.ProjectLoadingFinishEvent]);
                return {
                    session,
                    getNumberOfEvents: () => getEvents().length,
                    clearEvents,
                    verifyProjectLoadEvents
                };

                function verifyProjectLoadEvents(expected: [server.ProjectLoadingStartEvent, server.ProjectLoadingFinishEvent]) {
                    const actual = getEvents().map(e => ({ eventName: e.event, data: e.body }));
                    const mappedExpected = expected.map(e => {
                        const { project, ...rest } = e.data;
                        return { eventName: e.eventName, data: { projectName: project.getProjectName(), ...rest } };
                    });
                    assert.deepEqual(actual, mappedExpected);
                }
            });
        });
    });
}

import { createLoggerWithInMemoryLogs } from "../../../../harness/tsserverLogger";
import * as ts from "../../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    createSessionWithCustomEventHandler,
    openExternalProjectForSession,
    openFilesForSession,
    protocolLocationFromSubstring,
    TestSession,
    toExternalFiles,
} from "../../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    TestServerHost,
} from "../../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: events:: ProjectLoadingStart and ProjectLoadingFinish events", () => {
    const aTs: File = {
        path: `/user/username/projects/a/a.ts`,
        content: "export class A { }"
    };
    const configA: File = {
        path: `/user/username/projects/a/tsconfig.json`,
        content: "{}"
    };
    const bTsPath = `/user/username/projects/b/b.ts`;
    const configBPath = `/user/username/projects/b/tsconfig.json`;
    const files = [libFile, aTs, configA];

    function verifyProjectLoadingStartAndFinish(sessionType: string, createSession: (host: TestServerHost) => TestSession) {
        describe(sessionType, () => {
            it("when project is created by open file", () => {
                const bTs: File = {
                    path: bTsPath,
                    content: "export class B {}"
                };
                const configB: File = {
                    path: configBPath,
                    content: "{}"
                };
                const host = createServerHost(files.concat(bTs, configB));
                const session = createSession(host);
                openFilesForSession([aTs], session);
                openFilesForSession([bTs], session);
                baselineTsserverLogs("events/projectLoading", `project is created by open file ${sessionType}`, session);
            });

            it("when change is detected in the config file", () => {
                const host = createServerHost(files);
                const session = createSession(host);
                openFilesForSession([aTs], session);

                host.writeFile(configA.path, configA.content);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectLoading", `change is detected in the config file ${sessionType}`, session);
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
                const host = createServerHost(files.concat(bTs, configB));
                const session = createSession(host);
                openFilesForSession([bTs], session);

                host.writeFile(configA.path, configA.content);
                host.runQueuedTimeoutCallbacks();
                baselineTsserverLogs("events/projectLoading", `change is detected in an extended config file ${sessionType}`, session);
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
                        path: `/user/username/projects/a/a.d.ts`,
                        content: `export declare class A {
}
//# sourceMappingURL=a.d.ts.map
`
                    };
                    const aDTsMap: File = {
                        path: `/user/username/projects/a/a.d.ts.map`,
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

                    const host = createServerHost(files.concat(aDTs, aDTsMap, bTs, configB));
                    const session = createSession(host);
                    openFilesForSession([bTs], session);

                    session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                        command: ts.server.protocol.CommandTypes.References,
                        arguments: {
                            file: bTs.path,
                            ...protocolLocationFromSubstring(bTs.content, "A()")
                        }
                    });
                    baselineTsserverLogs("events/projectLoading", `opening original location project${disableSourceOfProjectReferenceRedirect ? " disableSourceOfProjectReferenceRedirect" : ""} ${sessionType}`, session);
                }
            });

            describe("with external projects and config files ", () => {
                const projectFileName = `/user/username/projects/a/project.csproj`;

                function createSessionAndOpenProject(lazyConfiguredProjectsFromExternalProject: boolean) {
                    const host = createServerHost(files);
                    const session = createSession(host);
                    session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                        command: ts.server.protocol.CommandTypes.Configure,
                        arguments: {
                            preferences: { lazyConfiguredProjectsFromExternalProject }
                        }
                    });
                    openExternalProjectForSession({
                        projectFileName,
                        rootFiles: toExternalFiles([aTs.path, configA.path]),
                        options: {}
                    }, session);
                    return session;
                }

                it("when lazyConfiguredProjectsFromExternalProject is false", () => {
                    const session = createSessionAndOpenProject(/*lazyConfiguredProjectsFromExternalProject*/ false);
                    baselineTsserverLogs("events/projectLoading", `lazyConfiguredProjectsFromExternalProject is false ${sessionType}`, session);
                });

                it("when lazyConfiguredProjectsFromExternalProject is true and file is opened", () => {
                    const session = createSessionAndOpenProject(/*lazyConfiguredProjectsFromExternalProject*/ true);
                    openFilesForSession([aTs], session);
                    baselineTsserverLogs("events/projectLoading", `lazyConfiguredProjectsFromExternalProject is true and file is opened ${sessionType}`, session);
                });

                it("when lazyConfiguredProjectsFromExternalProject is disabled", () => {
                    const session = createSessionAndOpenProject(/*lazyConfiguredProjectsFromExternalProject*/ true);
                    session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                        command: ts.server.protocol.CommandTypes.Configure,
                        arguments: {
                            preferences: { lazyConfiguredProjectsFromExternalProject: false }
                        }
                    });
                    baselineTsserverLogs("events/projectLoading", `lazyConfiguredProjectsFromExternalProject is disabled ${sessionType}`, session);
                });
            });
        });
    }

    verifyProjectLoadingStartAndFinish("when using event handler", host => createSessionWithCustomEventHandler(host));
    verifyProjectLoadingStartAndFinish("when using default event handler", host => createSession(
        host,
        { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) }
    ));
});

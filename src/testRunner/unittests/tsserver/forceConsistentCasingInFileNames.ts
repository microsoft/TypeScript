namespace ts.projectSystem {
    describe("unittests:: tsserver:: forceConsistentCasingInFileNames", () => {
        it("works when extends is specified with a case insensitive file system", () => {
            const rootPath = "/Users/username/dev/project";
            const file1: File = {
                path: `${rootPath}/index.ts`,
                content: 'import {x} from "file2";',
            };
            const file2: File = {
                path: `${rootPath}/file2.js`,
                content: "",
            };
            const file2Dts: File = {
                path: `${rootPath}/types/file2/index.d.ts`,
                content: "export declare const x: string;",
            };
            const tsconfigAll: File = {
                path: `${rootPath}/tsconfig.all.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        baseUrl: ".",
                        paths: { file2: ["./file2.js"] },
                        typeRoots: ["./types"],
                        forceConsistentCasingInFileNames: true,
                    },
                }),
            };
            const tsconfig: File = {
                path: `${rootPath}/tsconfig.json`,
                content: JSON.stringify({ extends: "./tsconfig.all.json" }),
            };

            const host = createServerHost([file1, file2, file2Dts, libFile, tsconfig, tsconfigAll], { useCaseSensitiveFileNames: false });
            const session = createSession(host);

            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            const diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
        });

        it("works when renaming file with different casing", () => {
            const loggerFile: File = {
                path: `${projectRoot}/Logger.ts`,
                content: `export class logger { }`
            };
            const anotherFile: File = {
                path: `${projectRoot}/another.ts`,
                content: `import { logger } from "./Logger"; new logger();`
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { forceConsistentCasingInFileNames: true }
                })
            };

            const host = createServerHost([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
            const session = createSession(host, { canUseEvents: true, logger: projectSystem.createLoggerWritingToConsole() });
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: loggerFile.path,
                        fileContent: loggerFile.content,
                        projectRootPath: projectRoot
                    }]
                }
            });
            const service = session.getProjectService();
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, [loggerFile.path, anotherFile.path, libFile.path, tsconfig.path]);
            verifyGetErrRequest({
                host,
                session,
                expected: [
                    { file: loggerFile.path, syntax: [], semantic: [], suggestion: [] }
                ]
            });

            const newLoggerPath = loggerFile.path.toLowerCase();
            host.renameFile(loggerFile.path, newLoggerPath);
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    closedFiles: [
                        loggerFile.path
                    ]
                }
            });
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: newLoggerPath,
                        fileContent: loggerFile.content,
                        projectRootPath: projectRoot
                    }]
                }
            });

            // Apply edits for rename
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: anotherFile.path,
                        fileContent: anotherFile.content,
                        projectRootPath: projectRoot
                    }]
                }
            });
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: anotherFile.path,
                        textChanges: [{
                            newText: "./logger",
                            ...projectSystem.protocolTextSpanFromSubstring(
                                anotherFile.content,
                                "./Logger"
                            )
                        }]
                    }]
                }
            });

            // Check errors in both files
            verifyGetErrRequest({
                host,
                session,
                expected: [
                    { file: newLoggerPath, syntax: [], semantic: [], suggestion: [] },
                    { file: anotherFile.path, syntax: [], semantic: [], suggestion: [] }
                ]
            });
        });
    });
}

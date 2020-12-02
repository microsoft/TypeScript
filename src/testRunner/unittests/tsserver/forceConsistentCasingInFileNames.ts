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
                path: `${tscWatch.projectRoot}/Logger.ts`,
                content: `export class logger { }`
            };
            const anotherFile: File = {
                path: `${tscWatch.projectRoot}/another.ts`,
                content: `import { logger } from "./Logger"; new logger();`
            };
            const tsconfig: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { forceConsistentCasingInFileNames: true }
                })
            };

            const host = createServerHost([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
            const session = createSession(host, { canUseEvents: true });
            openFilesForSession([{ file: loggerFile, projectRootPath: tscWatch.projectRoot }], session);
            const service = session.getProjectService();
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, [loggerFile.path, anotherFile.path, libFile.path, tsconfig.path]);
            verifyGetErrRequestNoErrors({ session, host, files: [loggerFile] });

            const newLoggerPath = loggerFile.path.toLowerCase();
            host.renameFile(loggerFile.path, newLoggerPath);
            closeFilesForSession([loggerFile], session);
            openFilesForSession([{ file: newLoggerPath, content: loggerFile.content, projectRootPath: tscWatch.projectRoot }], session);

            // Apply edits for rename
            openFilesForSession([{ file: anotherFile, projectRootPath: tscWatch.projectRoot }], session);
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: anotherFile.path,
                        textChanges: [{
                            newText: "./logger",
                            ...protocolTextSpanFromSubstring(
                                anotherFile.content,
                                "./Logger"
                            )
                        }]
                    }]
                }
            });

            // Check errors in both files
            verifyGetErrRequestNoErrors({ session, host, files: [newLoggerPath, anotherFile] });
        });

        it("when changing module name with different casing", () => {
            const loggerFile: File = {
                path: `${tscWatch.projectRoot}/Logger.ts`,
                content: `export class logger { }`
            };
            const anotherFile: File = {
                path: `${tscWatch.projectRoot}/another.ts`,
                content: `import { logger } from "./Logger"; new logger();`
            };
            const tsconfig: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { forceConsistentCasingInFileNames: true }
                })
            };

            const host = createServerHost([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
            const session = createSession(host, { canUseEvents: true });
            openFilesForSession([{ file: anotherFile, projectRootPath: tscWatch.projectRoot }], session);
            const service = session.getProjectService();
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, [loggerFile.path, anotherFile.path, libFile.path, tsconfig.path]);
            verifyGetErrRequestNoErrors({ session, host, files: [anotherFile] });

            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: anotherFile.path,
                        textChanges: [{
                            newText: "./logger",
                            ...protocolTextSpanFromSubstring(
                                anotherFile.content,
                                "./Logger"
                            )
                        }]
                    }]
                }
            });

            const location = protocolTextSpanFromSubstring(anotherFile.content, `"./Logger"`);
            // Check errors in both files
            verifyGetErrRequest({
                host,
                session,
                expected: [{
                    file: anotherFile.path,
                    syntax: [],
                    semantic: [createDiagnostic(
                        location.start,
                        location.end,
                        Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing,
                        [loggerFile.path.toLowerCase(), loggerFile.path]
                    )],
                    suggestion: []
                }]
            });
        });
    });
}

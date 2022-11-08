import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: forceConsistentCasingInFileNames", () => {
    it("works when extends is specified with a case insensitive file system", () => {
        const rootPath = "/Users/username/dev/project";
        const file1: ts.projectSystem.File = {
            path: `${rootPath}/index.ts`,
            content: 'import {x} from "file2";',
        };
        const file2: ts.projectSystem.File = {
            path: `${rootPath}/file2.js`,
            content: "",
        };
        const file2Dts: ts.projectSystem.File = {
            path: `${rootPath}/types/file2/index.d.ts`,
            content: "export declare const x: string;",
        };
        const tsconfigAll: ts.projectSystem.File = {
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
        const tsconfig: ts.projectSystem.File = {
            path: `${rootPath}/tsconfig.json`,
            content: JSON.stringify({ extends: "./tsconfig.all.json" }),
        };

        const host = ts.projectSystem.createServerHost([file1, file2, file2Dts, ts.projectSystem.libFile, tsconfig, tsconfigAll], { useCaseSensitiveFileNames: false });
        const session = ts.projectSystem.createSession(host);

        ts.projectSystem.openFilesForSession([file1], session);
        const projectService = session.getProjectService();

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });

        const diagnostics = ts.projectSystem.configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
        assert.deepEqual(diagnostics, []);
    });

    it("works when renaming file with different casing", () => {
        const loggerFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/Logger.ts`,
            content: `export class logger { }`
        };
        const anotherFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { forceConsistentCasingInFileNames: true }
            })
        };

        const host = ts.projectSystem.createServerHost([loggerFile, anotherFile, tsconfig, ts.projectSystem.libFile, tsconfig]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([{ file: loggerFile, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [loggerFile] });

        const newLoggerPath = loggerFile.path.toLowerCase();
        host.renameFile(loggerFile.path, newLoggerPath);
        ts.projectSystem.closeFilesForSession([loggerFile], session);
        ts.projectSystem.openFilesForSession([{ file: newLoggerPath, content: loggerFile.content, projectRootPath: ts.tscWatch.projectRoot }], session);

        // Apply edits for rename
        ts.projectSystem.openFilesForSession([{ file: anotherFile, projectRootPath: ts.tscWatch.projectRoot }], session);
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: anotherFile.path,
                    textChanges: [{
                        newText: "./logger",
                        ...ts.projectSystem.protocolTextSpanFromSubstring(
                            anotherFile.content,
                            "./Logger"
                        )
                    }]
                }]
            }
        });

        // Check errors in both files
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [newLoggerPath, anotherFile] });
        ts.projectSystem.baselineTsserverLogs("forceConsistentCasingInFileNames", "works when renaming file with different casing", session);
    });

    it("when changing module name with different casing", () => {
        const loggerFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/Logger.ts`,
            content: `export class logger { }`
        };
        const anotherFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { forceConsistentCasingInFileNames: true }
            })
        };

        const host = ts.projectSystem.createServerHost([loggerFile, anotherFile, tsconfig, ts.projectSystem.libFile, tsconfig]);
        const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession([{ file: anotherFile, projectRootPath: ts.tscWatch.projectRoot }], session);
        ts.projectSystem.verifyGetErrRequest({ session, host, files: [anotherFile] });

        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: anotherFile.path,
                    textChanges: [{
                        newText: "./logger",
                        ...ts.projectSystem.protocolTextSpanFromSubstring(
                            anotherFile.content,
                            "./Logger"
                        )
                    }]
                }]
            }
        });

        // Check errors in both files
        ts.projectSystem.verifyGetErrRequest({ host, session, files: [anotherFile] });
        ts.projectSystem.baselineTsserverLogs("forceConsistentCasingInFileNames", "when changing module name with different casing", session);
    });
});

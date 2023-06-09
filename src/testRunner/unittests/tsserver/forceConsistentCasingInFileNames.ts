import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createSession,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

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
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: {
                projectFileName: tsconfig.path
            }
        });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "works when extends is specified with a case insensitive file system", session);
    });

    it("works when renaming file with different casing", () => {
        const loggerFile: File = {
            path: `/user/username/projects/myproject/Logger.ts`,
            content: `export class logger { }`
        };
        const anotherFile: File = {
            path: `/user/username/projects/myproject/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { forceConsistentCasingInFileNames: true }
            })
        };

        const host = createServerHost([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([{ file: loggerFile, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [loggerFile] });

        const newLoggerPath = loggerFile.path.toLowerCase();
        host.renameFile(loggerFile.path, newLoggerPath);
        closeFilesForSession([loggerFile], session);
        openFilesForSession([{ file: newLoggerPath, content: loggerFile.content, projectRootPath: "/user/username/projects/myproject" }], session);

        // Apply edits for rename
        openFilesForSession([{ file: anotherFile, projectRootPath: "/user/username/projects/myproject" }], session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
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
        verifyGetErrRequest({ session, files: [newLoggerPath, anotherFile] });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "works when renaming file with different casing", session);
    });

    it("when changing module name with different casing", () => {
        const loggerFile: File = {
            path: `/user/username/projects/myproject/Logger.ts`,
            content: `export class logger { }`
        };
        const anotherFile: File = {
            path: `/user/username/projects/myproject/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { forceConsistentCasingInFileNames: true }
            })
        };

        const host = createServerHost([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([{ file: anotherFile, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [anotherFile] });

        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
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
        verifyGetErrRequest({ session, files: [anotherFile] });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "when changing module name with different casing", session);
    });
});

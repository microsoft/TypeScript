import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openExternalProjectForSession,
    openFilesForSession,
    toExternalFiles,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: with skipLibCheck", () => {
    it("should be turned on for js-only inferred projects", () => {
        const file1 = {
            path: "/a/b/file1.js",
            content: `
                /// <reference path="file2.d.ts" />
                var x = 1;`
        };
        const file2 = {
            path: "/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
        };
        const host = createServerHost([file1, file2]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1, file2], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path }
        });

        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: file1.path }
        });

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path }
        });

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path }
        });
        baselineTsserverLogs("skipLibCheck", "jsonly inferred project", session);
    });

    it("should be turned on for js-only external projects", () => {
        const jsFile = {
            path: "/a/b/file1.js",
            content: "let x =1;"
        };
        const dTsFile = {
            path: "/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
        };
        const host = createServerHost([jsFile, dTsFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        openExternalProjectForSession({
            projectFileName: "project1",
            rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
            options: {}
        }, session);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile.path }
        });
        baselineTsserverLogs("skipLibCheck", "jsonly external project", session);
    });

    it("should be turned on for js-only external projects with skipLibCheck=false", () => {
        const jsFile = {
            path: "/a/b/file1.js",
            content: "let x =1;"
        };
        const dTsFile = {
            path: "/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
        };
        const host = createServerHost([jsFile, dTsFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        openExternalProjectForSession({
            projectFileName: "project1",
            rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
            options: { skipLibCheck: false }
        }, session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile.path }
        });
        baselineTsserverLogs("skipLibCheck", "jsonly external project with skipLibCheck as false", session);
    });

    it("should not report bind errors for declaration files with skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/a/jsconfig.json",
            content: "{}"
        };
        const jsFile = {
            path: "/a/jsFile.js",
            content: "let x = 1;"
        };
        const dTsFile1 = {
            path: "/a/dTsFile1.d.ts",
            content: `
                declare var x: number;`
        };
        const dTsFile2 = {
            path: "/a/dTsFile2.d.ts",
            content: `
                declare var x: string;`
        };
        const host = createServerHost([jsconfigFile, jsFile, dTsFile1, dTsFile2]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile1.path }
        });

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile2.path }
        });
        baselineTsserverLogs("skipLibCheck", "should not report bind errors for declaration files with skipLibCheck=true", session);
    });

    it("should report semantic errors for loose JS files with '// @ts-check' and skipLibCheck=true", () => {
        const jsFile = {
            path: "/a/jsFile.js",
            content: `
                // @ts-check
                let x = 1;
                x === "string";`
        };

        const host = createServerHost([jsFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path }
        });

        baselineTsserverLogs("skipLibCheck", "reports semantic error with tscheck", session);
    });

    it("should report semantic errors for configured js project with '// @ts-check' and skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/a/jsconfig.json",
            content: "{}"
        };

        const jsFile = {
            path: "/a/jsFile.js",
            content: `
                // @ts-check
                let x = 1;
                x === "string";`
        };

        const host = createServerHost([jsconfigFile, jsFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path }
        }).response as ts.server.protocol.Diagnostic[];
        baselineTsserverLogs("skipLibCheck", "reports semantic error in configured project with tscheck", session);
    });

    it("should report semantic errors for configured js project with checkJs=true and skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/a/jsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    checkJs: true,
                    skipLibCheck: true
                },
            })
        };
        const jsFile = {
            path: "/a/jsFile.js",
            content: `let x = 1;
                x === "string";`
        };

        const host = createServerHost([jsconfigFile, jsFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path }
        });
        baselineTsserverLogs("skipLibCheck", "reports semantic error in configured js project with tscheck", session);
    });
});

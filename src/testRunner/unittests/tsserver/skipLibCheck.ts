import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    TestSession,
    toExternalFiles,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: with skipLibCheck::", () => {
    it("should be turned on for js-only inferred projects", () => {
        const file1 = {
            path: "/home/src/projects/project/a/b/file1.js",
            content: `
                /// <reference path="file2.d.ts" />
                var x = 1;`,
        };
        const file2 = {
            path: "/home/src/projects/project/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`,
        };
        const host = TestServerHost.createServerHost([file1, file2]);
        const session = new TestSession(host);
        openFilesForSession([file1, file2], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path },
        });

        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: file1.path },
        });

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path },
        });

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file2.path },
        });
        baselineTsserverLogs("skipLibCheck", "jsonly inferred project", session);
    });

    it("should be turned on for js-only external projects", () => {
        const jsFile = {
            path: "/home/src/projects/project/a/b/file1.js",
            content: "let x =1;",
        };
        const dTsFile = {
            path: "/home/src/projects/project/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`,
        };
        const host = TestServerHost.createServerHost([jsFile, dTsFile]);
        const session = new TestSession(host);

        openExternalProjectForSession({
            projectFileName: "project1",
            rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
            options: {},
        }, session);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile.path },
        });
        baselineTsserverLogs("skipLibCheck", "jsonly external project", session);
    });

    it("should be turned on for js-only external projects with skipLibCheck=false", () => {
        const jsFile = {
            path: "/home/src/projects/project/a/b/file1.js",
            content: "let x =1;",
        };
        const dTsFile = {
            path: "/home/src/projects/project/a/b/file2.d.ts",
            content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`,
        };
        const host = TestServerHost.createServerHost([jsFile, dTsFile]);
        const session = new TestSession(host);

        openExternalProjectForSession({
            projectFileName: "project1",
            rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
            options: { skipLibCheck: false },
        }, session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile.path },
        });
        baselineTsserverLogs("skipLibCheck", "jsonly external project with skipLibCheck as false", session);
    });

    it("should not report bind errors for declaration files with skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/home/src/projects/project/a/jsconfig.json",
            content: "{}",
        };
        const jsFile = {
            path: "/home/src/projects/project/a/jsFile.js",
            content: "let x = 1;",
        };
        const dTsFile1 = {
            path: "/home/src/projects/project/a/dTsFile1.d.ts",
            content: `
                declare var x: number;`,
        };
        const dTsFile2 = {
            path: "/home/src/projects/project/a/dTsFile2.d.ts",
            content: `
                declare var x: string;`,
        };
        const host = TestServerHost.createServerHost([jsconfigFile, jsFile, dTsFile1, dTsFile2]);
        const session = new TestSession(host);
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile1.path },
        });

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: dTsFile2.path },
        });
        baselineTsserverLogs("skipLibCheck", "should not report bind errors for declaration files with skipLibCheck=true", session);
    });

    it("should report semantic errors for loose JS files with '// @ts-check' and skipLibCheck=true", () => {
        const jsFile = {
            path: "/home/src/projects/project/a/jsFile.js",
            content: `
                // @ts-check
                let x = 1;
                x === "string";`,
        };

        const host = TestServerHost.createServerHost([jsFile]);
        const session = new TestSession(host);
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path },
        });

        baselineTsserverLogs("skipLibCheck", "reports semantic error with tscheck", session);
    });

    it("should report semantic errors for configured js project with '// @ts-check' and skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/home/src/projects/project/a/jsconfig.json",
            content: "{}",
        };

        const jsFile = {
            path: "/home/src/projects/project/a/jsFile.js",
            content: `
                // @ts-check
                let x = 1;
                x === "string";`,
        };

        const host = TestServerHost.createServerHost([jsconfigFile, jsFile]);
        const session = new TestSession(host);
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path },
        });
        baselineTsserverLogs("skipLibCheck", "reports semantic error in configured project with tscheck", session);
    });

    it("should report semantic errors for configured js project with checkJs=true and skipLibCheck=true", () => {
        const jsconfigFile = {
            path: "/home/src/projects/project/a/jsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    checkJs: true,
                    skipLibCheck: true,
                },
            }),
        };
        const jsFile = {
            path: "/home/src/projects/project/a/jsFile.js",
            content: `let x = 1;
                x === "string";`,
        };

        const host = TestServerHost.createServerHost([jsconfigFile, jsFile]);
        const session = new TestSession(host);
        openFilesForSession([jsFile], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: jsFile.path },
        });
        baselineTsserverLogs("skipLibCheck", "reports semantic error in configured js project with tscheck", session);
    });
});

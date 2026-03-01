import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: applyChangesToOpenFiles::", () => {
    function fileContentWithComment(file: File) {
        return `// some copy right notice
${file.content}`;
    }

    const commonFile1: File = {
        path: "/user/username/projects/project/commonFile1.ts",
        content: "let x = 1",
    };
    const commonFile2: File = {
        path: "/user/username/projects/project/commonFile2.ts",
        content: "let y = 1",
    };

    function setup() {
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: "{}",
        };
        const file3: File = {
            path: "/user/username/projects/project/file3.ts",
            content: "let xyz = 1;",
        };
        const app: File = {
            path: "/user/username/projects/project/app.ts",
            content: "let z = 1;",
        };

        const host = TestServerHost.createServerHost([app, file3, commonFile1, commonFile2, configFile]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: app.path },
        });
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: file3.path,
                fileContent: fileContentWithComment(file3),
            },
        });
        return { session, file3, app };
    }

    it("with applyChangedToOpenFiles request", () => {
        const { session, file3, app } = setup();
        // Apply changes
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                openFiles: [
                    {
                        fileName: commonFile1.path,
                        content: fileContentWithComment(commonFile1),
                    },
                    {
                        fileName: commonFile2.path,
                        content: fileContentWithComment(commonFile2),
                    },
                ],
                changedFiles: [
                    {
                        fileName: app.path,
                        changes: [
                            {
                                span: { start: 0, length: 0 },
                                newText: "let zzz = 10;",
                            },
                            {
                                span: { start: 0, length: 0 },
                                newText: "let zz = 10;",
                            },
                        ],
                    },
                ],
                closedFiles: [
                    file3.path,
                ],
            },
        });
        // Open file1 again
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                openFiles: [{
                    fileName: commonFile1.path,
                    content: commonFile1.content,
                }],
            },
        });
        baselineTsserverLogs("applyChangesToOpenFiles", "with applyChangedToOpenFiles request", session);
    });

    it("with updateOpen request", () => {
        const { session, file3, app } = setup();
        // Apply changes
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: [
                    {
                        file: commonFile1.path,
                        fileContent: fileContentWithComment(commonFile1),
                    },
                    {
                        file: commonFile2.path,
                        fileContent: fileContentWithComment(commonFile2),
                    },
                ],
                changedFiles: [
                    {
                        fileName: app.path,
                        textChanges: [
                            {
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                                newText: "let zzz = 10;",
                            },
                            {
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                                newText: "let zz = 10;",
                            },
                        ],
                    },
                ],
                closedFiles: [
                    file3.path,
                ],
            },
        });
        // Open file1 again
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: [{
                    file: commonFile1.path,
                    fileContent: commonFile1.content,
                }],
            },
        });
        baselineTsserverLogs("applyChangesToOpenFiles", "with updateOpen request", session);
    });
});

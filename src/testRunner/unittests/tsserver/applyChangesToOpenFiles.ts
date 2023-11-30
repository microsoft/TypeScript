import * as ts from "../../_namespaces/ts";
import {
    commonFile1,
    commonFile2,
} from "../helpers/tscWatch";
import {
    baselineTsserverLogs,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: applyChangesToOpenFiles", () => {
    function fileContentWithComment(file: File) {
        return `// some copy right notice
${file.content}`;
    }

    function setup() {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: "{}",
        };
        const file3: File = {
            path: "/a/b/file3.ts",
            content: "let xyz = 1;",
        };
        const app: File = {
            path: "/a/b/app.ts",
            content: "let z = 1;",
        };
        const host = createServerHost([app, file3, commonFile1, commonFile2, libFile, configFile]);
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

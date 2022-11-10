import * as ts from "../../_namespaces/ts";
import { createServerHost, File, libFile } from "../virtualFileSystemWithWatch";
import { commonFile1, commonFile2 } from "../tscWatch/helpers";
import { TestSession, createSession } from "./helpers";

describe("unittests:: tsserver:: applyChangesToOpenFiles", () => {
    const configFile: File = {
        path: "/a/b/tsconfig.json",
        content: "{}"
    };
    const file3: File = {
        path: "/a/b/file3.ts",
        content: "let xyz = 1;"
    };
    const app: File = {
        path: "/a/b/app.ts",
        content: "let z = 1;"
    };

    function fileContentWithComment(file: File) {
        return `// some copy right notice
${file.content}`;
    }

    function verifyText(service: ts.server.ProjectService, file: string, expected: string) {
        const info = service.getScriptInfo(file)!;
        const snap = info.getSnapshot();
        // Verified applied in reverse order
        assert.equal(snap.getText(0, snap.getLength()), expected, `Text of changed file: ${file}`);
    }

    function verifyProjectVersion(project: ts.server.Project, expected: number) {
        assert.equal(Number(project.getProjectVersion()), expected);
    }

    interface Verify {
        applyChangesToOpen: (session: TestSession) => void;
        openFile1Again: (session: TestSession) => void;
    }
    function verify({ applyChangesToOpen, openFile1Again }: Verify) {
        const host = createServerHost([app, file3, commonFile1, commonFile2, libFile, configFile]);
        const session = createSession(host);
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: app.path }
        });
        const service = session.getProjectService();
        const project = service.configuredProjects.get(configFile.path)!;
        assert.isDefined(project);
        verifyProjectVersion(project, 1);
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: file3.path,
                fileContent: fileContentWithComment(file3)
            }
        });
        verifyProjectVersion(project, 2);

        // Verify Texts
        verifyText(service, commonFile1.path, commonFile1.content);
        verifyText(service, commonFile2.path, commonFile2.content);
        verifyText(service, app.path, app.content);
        verifyText(service, file3.path, fileContentWithComment(file3));

        // Apply changes
        applyChangesToOpen(session);

        // Verify again
        verifyProjectVersion(project, 3);
        // Open file contents
        verifyText(service, commonFile1.path, fileContentWithComment(commonFile1));
        verifyText(service, commonFile2.path, fileContentWithComment(commonFile2));
        verifyText(service, app.path, "let zzz = 10;let zz = 10;let z = 1;");
        verifyText(service, file3.path, file3.content);

        // Open file1 again
        openFile1Again(session);
        assert.isTrue(service.getScriptInfo(commonFile1.path)!.isScriptOpen());

        // Verify that file1 contents are changed
        verifyProjectVersion(project, 4);
        verifyText(service, commonFile1.path, commonFile1.content);
        verifyText(service, commonFile2.path, fileContentWithComment(commonFile2));
        verifyText(service, app.path, "let zzz = 10;let zz = 10;let z = 1;");
        verifyText(service, file3.path, file3.content);
    }

    it("with applyChangedToOpenFiles request", () => {
        verify({
            applyChangesToOpen: session => session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
                command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [
                        {
                            fileName: commonFile1.path,
                            content: fileContentWithComment(commonFile1)
                        },
                        {
                            fileName: commonFile2.path,
                            content: fileContentWithComment(commonFile2)
                        }
                    ],
                    changedFiles: [
                        {
                            fileName: app.path,
                            changes: [
                                {
                                    span: { start: 0, length: 0 },
                                    newText: "let zzz = 10;"
                                },
                                {
                                    span: { start: 0, length: 0 },
                                    newText: "let zz = 10;"
                                }
                            ]
                        }
                    ],
                    closedFiles: [
                        file3.path
                    ]
                }
            }),
            openFile1Again: session => session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
                command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [{
                        fileName: commonFile1.path,
                        content: commonFile1.content
                    }]
                }
            }),
        });
    });

    it("with updateOpen request", () => {
        verify({
            applyChangesToOpen: session => session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [
                        {
                            file: commonFile1.path,
                            fileContent: fileContentWithComment(commonFile1)
                        },
                        {
                            file: commonFile2.path,
                            fileContent: fileContentWithComment(commonFile2)
                        }
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
                                }
                            ]
                        }
                    ],
                    closedFiles: [
                        file3.path
                    ]
                }
            }),
            openFile1Again: session => session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: commonFile1.path,
                        fileContent: commonFile1.content
                    }]
                }
            }),
        });
    });
});

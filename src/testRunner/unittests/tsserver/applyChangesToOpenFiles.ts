import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: applyChangesToOpenFiles", () => {
    const configFile: ts.projectSystem.File = {
        path: "/a/b/tsconfig.json",
        content: "{}"
    };
    const file3: ts.projectSystem.File = {
        path: "/a/b/file3.ts",
        content: "let xyz = 1;"
    };
    const app: ts.projectSystem.File = {
        path: "/a/b/app.ts",
        content: "let z = 1;"
    };

    function fileContentWithComment(file: ts.projectSystem.File) {
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
        applyChangesToOpen: (session: ts.projectSystem.TestSession) => void;
        openFile1Again: (session: ts.projectSystem.TestSession) => void;
    }
    function verify({ applyChangesToOpen, openFile1Again }: Verify) {
        const host = ts.projectSystem.createServerHost([app, file3, ts.projectSystem.commonFile1, ts.projectSystem.commonFile2, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host);
        session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Open,
            arguments: { file: app.path }
        });
        const service = session.getProjectService();
        const project = service.configuredProjects.get(configFile.path)!;
        assert.isDefined(project);
        verifyProjectVersion(project, 1);
        session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Open,
            arguments: {
                file: file3.path,
                fileContent: fileContentWithComment(file3)
            }
        });
        verifyProjectVersion(project, 2);

        // Verify Texts
        verifyText(service, ts.projectSystem.commonFile1.path, ts.projectSystem.commonFile1.content);
        verifyText(service, ts.projectSystem.commonFile2.path, ts.projectSystem.commonFile2.content);
        verifyText(service, app.path, app.content);
        verifyText(service, file3.path, fileContentWithComment(file3));

        // Apply changes
        applyChangesToOpen(session);

        // Verify again
        verifyProjectVersion(project, 3);
        // Open file contents
        verifyText(service, ts.projectSystem.commonFile1.path, fileContentWithComment(ts.projectSystem.commonFile1));
        verifyText(service, ts.projectSystem.commonFile2.path, fileContentWithComment(ts.projectSystem.commonFile2));
        verifyText(service, app.path, "let zzz = 10;let zz = 10;let z = 1;");
        verifyText(service, file3.path, file3.content);

        // Open file1 again
        openFile1Again(session);
        assert.isTrue(service.getScriptInfo(ts.projectSystem.commonFile1.path)!.isScriptOpen());

        // Verify that file1 contents are changed
        verifyProjectVersion(project, 4);
        verifyText(service, ts.projectSystem.commonFile1.path, ts.projectSystem.commonFile1.content);
        verifyText(service, ts.projectSystem.commonFile2.path, fileContentWithComment(ts.projectSystem.commonFile2));
        verifyText(service, app.path, "let zzz = 10;let zz = 10;let z = 1;");
        verifyText(service, file3.path, file3.content);
    }

    it("with applyChangedToOpenFiles request", () => {
        verify({
            applyChangesToOpen: session => session.executeCommandSeq<ts.projectSystem.protocol.ApplyChangedToOpenFilesRequest>({
                command: ts.projectSystem.protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [
                        {
                            fileName: ts.projectSystem.commonFile1.path,
                            content: fileContentWithComment(ts.projectSystem.commonFile1)
                        },
                        {
                            fileName: ts.projectSystem.commonFile2.path,
                            content: fileContentWithComment(ts.projectSystem.commonFile2)
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
            openFile1Again: session => session.executeCommandSeq<ts.projectSystem.protocol.ApplyChangedToOpenFilesRequest>({
                command: ts.projectSystem.protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [{
                        fileName: ts.projectSystem.commonFile1.path,
                        content: ts.projectSystem.commonFile1.content
                    }]
                }
            }),
        });
    });

    it("with updateOpen request", () => {
        verify({
            applyChangesToOpen: session => session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
                command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [
                        {
                            file: ts.projectSystem.commonFile1.path,
                            fileContent: fileContentWithComment(ts.projectSystem.commonFile1)
                        },
                        {
                            file: ts.projectSystem.commonFile2.path,
                            fileContent: fileContentWithComment(ts.projectSystem.commonFile2)
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
            openFile1Again: session => session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
                command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: ts.projectSystem.commonFile1.path,
                        fileContent: ts.projectSystem.commonFile1.content
                    }]
                }
            }),
        });
    });
});

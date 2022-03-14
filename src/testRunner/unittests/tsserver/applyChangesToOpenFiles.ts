namespace ts.projectSystem {
    // TODO: Make a separate file at some point
    describe("unittests:: tsserver:: updateFileSystem", () => {
        const config: protocol.FileSystemRequestArgs = {
            file: "/a/b/tsconfig.json",
            fileContent: "{}"
        };
        const file3: protocol.FileSystemRequestArgs = {
            file: "/a/b/file3.ts",
            fileContent: "export let xyz = 1;"
        };
        const app: protocol.FileSystemRequestArgs = {
            file: "/a/b/app.ts",
            fileContent: "import { xyz } from './file3'; let x = xyz"
        };
        const file1: protocol.FileSystemRequestArgs = {
            file: "/a/b/commonFile1.ts",
            fileContent: "let x = 1"
        };
        const file2: protocol.FileSystemRequestArgs = {
            file: "/a/b/commonFile2.ts",
            fileContent: "let y = 1"
        };
        const lib: protocol.FileSystemRequestArgs = {
        file: "/a/lib/lib.d.ts",
        fileContent: `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }`
    };

        function fileContentWithComment(file: protocol.FileSystemRequestArgs | File) {
            return `// some copy right notice
${'content' in file ? file.content :  file.fileContent}`;
        }
        it("with updateOpen request", () => {
            // 1. Create a server host with no files, then updateFS and make sure everything works as before
            // Things still to test
            // 2. Send another updateFS request and assert that the vfs content changes
            // 3. Send another updateFS request and assert that the internal reported content changes (such as projectversion)
            // 4. Send a close message (or whatever will write a file?) and make sure that the vfs state is updated
            // after file watchers are implemented:
            // 5. send updateFS request with a create/update/delete of a watched file, assert that file watchers fired
            // 6. probably some other watcher tests, not sure what
            const host = createServerHost([]); // old path goes into virtualFileSystemWithWatch.ts, so I guess it's getting the old host, not the replaced one
            const session = createSession(host);
            session.executeCommandSeq<protocol.UpdateFileSystemRequest>({
                command: protocol.CommandTypes.UpdateFileSystem,
                arguments:{
                    fileSystem: 'memfs',
                    created: [app, file3, file1, file2, lib, config],
                    deleted: [], // string[];
                    updated: [], //FileSystemRequestArgs[];
                }
            });
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: app.file }
            });
            const service = session.getProjectService();
            const project = service.configuredProjects.get(config.file)!;
            const vfs = (session as any).host.vfs
            assert.isDefined(vfs);
            assert.isDefined(project);
            verifyProjectVersion(project, 1);
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: {
                    file: file3.file,
                    fileContent: fileContentWithComment(file3)
                }
            });
            verifyProjectVersion(project, 2);

            // Verify Texts
            verifyText(service, file1.file, file1.fileContent!);
            verifyText(service, commonFile2.path, commonFile2.content);
            verifyText(service, app.file, app.fileContent!);
            verifyText(service, file3.file, fileContentWithComment(file3));

            session.executeCommandSeq<protocol.UpdateFileSystemRequest>({
                command: protocol.CommandTypes.UpdateFileSystem,
                arguments:{
                    fileSystem: 'memfs',
                    created: [],
                    deleted: [], // string[];
                    updated: [], //FileSystemRequestArgs[];
                }
            });
            // no change when not deleting file
            verifyProjectVersion(project, 2);

            // Verify Texts
            verifyText(service, file1.file, file1.fileContent!);
            verifyText(service, commonFile2.path, commonFile2.content);
            verifyText(service, app.file, app.fileContent!);
            verifyText(service, file3.file, fileContentWithComment(file3));

            session.executeCommandSeq<protocol.UpdateFileSystemRequest>({
                command: protocol.CommandTypes.UpdateFileSystem,
                arguments:{
                    fileSystem: 'memfs',
                    created: [],
                    deleted: [file1.file], // string[];
                    updated: [], //FileSystemRequestArgs[];
                }
            });
            verifyProjectVersion(project, 3);

            // Verify Texts
            verifyText(service, file1.file, file1.fileContent!);
            verifyText(service, commonFile2.path, commonFile2.content);
            verifyText(service, app.file, app.fileContent!);
            verifyText(service, file3.file, fileContentWithComment(file3));

        });

        function verifyText(service: server.ProjectService, file: string, expected: string) {
            const info = service.getScriptInfo(file)!;
            const snap = info.getSnapshot();
            // Verified applied in reverse order
            assert.equal(snap.getText(0, snap.getLength()), expected, `Text of changed file: ${file}`);
        }

        function verifyProjectVersion(project: server.Project, expected: number) {
            assert.equal(Number(project.getProjectVersion()), expected);
        }
    })
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

        function verifyText(service: server.ProjectService, file: string, expected: string) {
            const info = service.getScriptInfo(file)!;
            const snap = info.getSnapshot();
            // Verified applied in reverse order
            assert.equal(snap.getText(0, snap.getLength()), expected, `Text of changed file: ${file}`);
        }

        function verifyProjectVersion(project: server.Project, expected: number) {
            assert.equal(Number(project.getProjectVersion()), expected);
        }

        interface Verify {
            applyChangesToOpen: (session: TestSession) => void;
            openFile1Again: (session: TestSession) => void;
        }
        function verify({ applyChangesToOpen, openFile1Again }: Verify) {
            const host = createServerHost([app, file3, commonFile1, commonFile2, libFile, configFile]);
            const session = createSession(host);
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: app.path }
            });
            const service = session.getProjectService();
            const project = service.configuredProjects.get(configFile.path)!;
            assert.isDefined(project);
            verifyProjectVersion(project, 1);
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
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
                applyChangesToOpen: session => session.executeCommandSeq<protocol.ApplyChangedToOpenFilesRequest>({
                    command: protocol.CommandTypes.ApplyChangedToOpenFiles,
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
                openFile1Again: session => session.executeCommandSeq<protocol.ApplyChangedToOpenFilesRequest>({
                    command: protocol.CommandTypes.ApplyChangedToOpenFiles,
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
                applyChangesToOpen: session => session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
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
                openFile1Again: session => session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
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
}

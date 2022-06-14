namespace ts.projectSystem {
    describe("unittests:: tsserver:: updateFileSystem", () => {
        const config: protocol.FileSystemRequestArgs = {
            file: "/fshost/b/tsconfig.json",
            fileContent: "{}"
        };
        const file3: protocol.FileSystemRequestArgs = {
            file: "/fshost/b/file3.ts",
            fileContent: "export let xyz = 1;"
        };
        const app: protocol.FileSystemRequestArgs = {
            file: "/fshost/b/app.ts",
            fileContent: "import { xyz } from './file3'; let x = xyz"
        };
        const file1: protocol.FileSystemRequestArgs = {
            file: "/fshost/b/commonFile1.ts",
            fileContent: "let x = 1"
        };
        const file2: protocol.FileSystemRequestArgs = {
            file: "/fshost/b/commonFile2.ts",
            fileContent: "let y = 1"
        };
        const lib: protocol.FileSystemRequestArgs = {
        file: "/fshost/lib/lib.d.ts",
            fileContent: libFile.content
        };

        function fileContentWithComment(file: protocol.FileSystemRequestArgs) {
            return `// some copy right notice
${file.fileContent}`;
        }
        function baselineFileSystem(scenario: string, subScenario: string, requests: [string, (() => void) | Partial<protocol.Request>][], host: TestServerHost, fshost: VirtualFS.VirtualServerHost, session: TestSession) {
            const history: string[] = [];

            let prev = VirtualFS.snap(fshost);
            let prev2 = VirtualFS.snap(host);
            for (const [name, request] of requests) {
                if (typeof request === "function") {
                    request();
                }
                else {
                    session.executeCommandSeq(request);
                }
                history.push("");
                history.push("#### " + name);
                VirtualFS.diff(fshost, history, prev);
                prev = VirtualFS.snap(fshost);
                VirtualFS.diff(host, history, prev2);
                prev2 = VirtualFS.snap(host);
                host.serializeTimeout(history)
            }
            history.push("### fshost watches")
            fshost.serializeWatches(history)
            history.push("### host watches")
            host.serializeWatches(history)
            Harness.Baseline.runBaseline(`tsserver/${scenario}/${subScenario.split(" ").join("-")}.txt`, history.join("\r\n"));
            baselineTsserverLogs(scenario, subScenario, session);
        }

        it("with updateFileSystem request", () => {
            const host = VirtualFS.createServerHost({ executingFilePath: "/host/tsc.js" });
            const fshost = VirtualFS.createVirtualServerHost({ executingFilePath: "/fshost/tsc.js" });
            const session = createSession(host, { fshost, logger: createLoggerWithInMemoryLogs(), canUseEvents: true });
            const requests: [string, (() => void) | Partial<protocol.Request>][] = [
                ["Initial updateFileSystem", {
                    command: protocol.CommandTypes.UpdateFileSystem,
                    arguments:{
                        fileSystem: "memfs",
                        files: [app, file1, file2, file3, config, lib],
                        deleted: [],
                    }
                }],
                ["Opening app.ts", {
                    command: protocol.CommandTypes.Open,
                    arguments: { file: app.file }
                }],
                ["Opening file3.ts", {
                    command: protocol.CommandTypes.Open,
                    arguments: {
                        file: file3.file,
                        fileContent: fileContentWithComment(file3)
                    }
                }],
                ["non-delete", {
                    command: protocol.CommandTypes.UpdateFileSystem,
                    arguments:{
                        fileSystem: "memfs",
                        files: [],
                        deleted: [],
                    }
                }],
                ["change app.ts content", {
                    command: protocol.CommandTypes.UpdateFileSystem,
                    arguments: {
                        fileSystem: "memfs",
                        files: [{
                            file: "/fshost/b/app.ts",
                            fileContent: "import { xyz } from './file3'; let y = xyz"
                        }],
                        deleted: [],
                    },
                }],
                ["ensure /host/app.ts exists", () => host.ensureFileOrFolder({
                    path: "/host/b/app.ts",
                    content: 'console.log("hello")'
                })],
                ["modify /host/app.ts", () => host.modifyFile(
                    "/host/b/app.ts",
                    "console.log('goodbye')"
                )],
                ["ensure /fshost/file4.ts exists", () => fshost.ensureFileOrFolder({
                    path:"/fshost/b/file4.ts",
                    content: "console.log('file4 exists')",
                })],
                ["modify /fshost/file4", () => fshost.modifyFile(
                    "/fshost/b/file4.ts",
                    "console.log('file4 modified')"
                )],
                ["delete", {
                    command: protocol.CommandTypes.UpdateFileSystem,
                    arguments:{
                        fileSystem: "memfs",
                        files: [],
                        deleted: [file1.file],
                    }
                }],
                ["close", {
                    command: protocol.CommandTypes.Close,
                    arguments: { file: app.file }
                }],
            ];
            VirtualFS.createWatcher(fshost.fsWatches, "/host/b/app.ts" as Path, {
                cb: (_, relativeFileName) => {
                    assert.fail("The watcher for /host/b/app.ts should not be called at all. Called with " + relativeFileName);
                },
                directoryName: "/host/b",
                inode: undefined,
            });

            const scenario = "updateFileSystem";
            const subScenario = "open and close files";
            baselineFileSystem(scenario, subScenario, requests, host, fshost, session);
        });
    });
}

import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: with metadataInResponse::", () => {
    const metadata = "Extra Info";
    const aTs: File = { path: "/home/src/projects/project/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
    const tsconfig: File = {
        path: "/home/src/projects/project/tsconfig.json",
        content: jsonToReadableText({
            compilerOptions: { plugins: [{ name: "myplugin" }] },
        }),
    };
    function createHostWithPlugin(files: readonly File[]) {
        const host = TestServerHost.createServerHost(files);
        host.require = (_initialPath, moduleName) => {
            assert.equal(moduleName, "myplugin");
            return {
                module: () => ({
                    create(info: ts.server.PluginCreateInfo) {
                        const proxy = Harness.LanguageService.makeDefaultProxy(info);
                        proxy.getCompletionsAtPosition = (filename, position, options) => {
                            const result = info.languageService.getCompletionsAtPosition(filename, position, options);
                            if (result) {
                                result.metadata = metadata;
                            }
                            return result;
                        };
                        return proxy;
                    },
                }),
                error: undefined,
            };
        };
        return host;
    }

    describe("With completion requests", () => {
        const completionRequestArgs: ts.server.protocol.CompletionsRequestArgs = {
            file: aTs.path,
            line: 1,
            offset: aTs.content.indexOf("this.") + 1 + "this.".length,
        };

        it("can pass through metadata when the command returns array", () => {
            const host = createHostWithPlugin([aTs, tsconfig]);
            const session = new TestSession(host);
            openFilesForSession([aTs], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.Completions,
                arguments: completionRequestArgs,
            });
            baselineTsserverLogs("metadataInResponse", "can pass through metadata when the command returns array", session);
        });

        it("can pass through metadata when the command returns object", () => {
            const host = createHostWithPlugin([aTs, tsconfig]);
            const session = new TestSession(host);
            openFilesForSession([aTs], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: completionRequestArgs,
            });
            baselineTsserverLogs("metadataInResponse", "can pass through metadata when the command returns object", session);
        });

        it("returns undefined correctly", () => {
            const aTs: File = { path: "/home/src/projects/project/a.ts", content: `class c { prop = "hello"; foo() { const x = 0; } }` };
            const host = createHostWithPlugin([aTs, tsconfig]);
            const session = new TestSession(host);
            openFilesForSession([aTs], session);
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.Completions,
                arguments: { file: aTs.path, line: 1, offset: aTs.content.indexOf("x") + 1 },
            });
            baselineTsserverLogs("metadataInResponse", "returns undefined correctly", session);
        });
    });
});

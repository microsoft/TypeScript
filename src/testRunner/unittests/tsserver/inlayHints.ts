import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    commonFile1,
    commonFile2,
} from "../tscWatch/helpers";
import {
    createSession,
    TestSession,
} from "./helpers";

describe("unittests:: tsserver:: inlayHints", () => {
    const configFile: File = {
        path: "/a/b/tsconfig.json",
        content: "{}"
    };
    const app: File = {
        path: "/a/b/app.ts",
        content: "declare function foo(param: any): void;\nfoo(12);"
    };

    it("with updateOpen request does not corrupt documents", () => {
        const host = createServerHost([app, commonFile1, commonFile2, libFile, configFile]);
        const session = createSession(host);
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: app.path }
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includeInlayParameterNameHints: "all"
                } as ts.UserPreferences
            }
        });
        verifyInlayHintResponse(session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 39 }, end: { line: 1, offset: 39 }, newText: "//" }] }]
            }
        });
        verifyInlayHintResponse(session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 41 }, end: { line: 1, offset: 41 }, newText: "c" }] }]
            }
        });
        verifyInlayHintResponse(session);

        function verifyInlayHintResponse(session: TestSession) {
            verifyParamInlayHint(session.executeCommandSeq<ts.server.protocol.InlayHintsRequest>({
                command: ts.server.protocol.CommandTypes.ProvideInlayHints,
                arguments: {
                    file: app.path,
                    start: 0,
                    length: app.content.length,
                }
            }).response as ts.server.protocol.InlayHintItem[] | undefined);
        }

        function verifyParamInlayHint(response: ts.server.protocol.InlayHintItem[] | undefined) {
            ts.Debug.assert(response);
            ts.Debug.assert(response[0]);
            ts.Debug.assertEqual(response[0].text, "param:");
            ts.Debug.assertEqual(response[0].position.line, 2);
            ts.Debug.assertEqual(response[0].position.offset, 5);
        }
    });
});

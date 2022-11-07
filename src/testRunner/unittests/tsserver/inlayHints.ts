import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: inlayHints", () => {
    const configFile: ts.projectSystem.File = {
        path: "/a/b/tsconfig.json",
        content: "{}"
    };
    const app: ts.projectSystem.File = {
        path: "/a/b/app.ts",
        content: "declare function foo(param: any): void;\nfoo(12);"
    };

    it("with updateOpen request does not corrupt documents", () => {
        const host = ts.projectSystem.createServerHost([app, ts.projectSystem.commonFile1, ts.projectSystem.commonFile2, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host);
        session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Open,
            arguments: { file: app.path }
        });
        session.executeCommandSeq<ts.projectSystem.protocol.ConfigureRequest>({
            command: ts.projectSystem.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includeInlayParameterNameHints: "all"
                } as ts.UserPreferences
            }
        });
        verifyInlayHintResponse(session);
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 39 }, end: { line: 1, offset: 39 }, newText: "//" }] }]
            }
        });
        verifyInlayHintResponse(session);
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 41 }, end: { line: 1, offset: 41 }, newText: "c" }] }]
            }
        });
        verifyInlayHintResponse(session);

        function verifyInlayHintResponse(session: ts.projectSystem.TestSession) {
            verifyParamInlayHint(session.executeCommandSeq<ts.projectSystem.protocol.InlayHintsRequest>({
                command: ts.projectSystem.protocol.CommandTypes.ProvideInlayHints,
                arguments: {
                    file: app.path,
                    start: 0,
                    length: app.content.length,
                }
            }).response as ts.projectSystem.protocol.InlayHintItem[] | undefined);
        }

        function verifyParamInlayHint(response: ts.projectSystem.protocol.InlayHintItem[] | undefined) {
            ts.Debug.assert(response);
            ts.Debug.assert(response[0]);
            ts.Debug.assertEqual(response[0].text, "param:");
            ts.Debug.assertEqual(response[0].position.line, 2);
            ts.Debug.assertEqual(response[0].position.offset, 5);
        }
    });
});

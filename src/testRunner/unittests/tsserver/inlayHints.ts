namespace ts.projectSystem {
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
            session.executeCommandSeq<protocol.OpenRequest>({
                command: protocol.CommandTypes.Open,
                arguments: { file: app.path }
            });
            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: protocol.CommandTypes.Configure,
                arguments: {
                    preferences: {
                        includeInlayParameterNameHints: "all"
                    } as UserPreferences
                }
            });
            verifyInlayHintResponse(session);
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 39 }, end: { line: 1, offset: 39 }, newText: "//" }] }]
                }
            });
            verifyInlayHintResponse(session);
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{ fileName: app.path, textChanges: [{ start: { line: 1, offset: 41 }, end: { line: 1, offset: 41 }, newText: "c" }] }]
                }
            });
            verifyInlayHintResponse(session);

            function verifyInlayHintResponse(session: TestSession) {
                verifyParamInlayHint(session.executeCommandSeq<protocol.InlayHintsRequest>({
                    command: protocol.CommandTypes.ProvideInlayHints,
                    arguments: {
                        file: app.path,
                        start: 0,
                        length: app.content.length,
                    }
                }).response as protocol.InlayHintItem[] | undefined);
            }

            function verifyParamInlayHint(response: protocol.InlayHintItem[] | undefined) {
                Debug.assert(response);
                Debug.assert(response[0]);
                Debug.assertEqual(response[0].text, "param:");
                Debug.assertEqual(response[0].position.line, 2);
                Debug.assertEqual(response[0].position.offset, 5);
            }
        });
    });
}

namespace ts.projectSystem {
    describe("unittests:: tsserver:: Untitled files", () => {
        it("Can convert positions to locations", () => {
            const aTs: File = { path: "/proj/a.ts", content: "" };
            const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
            const session = createSession(createServerHost([aTs, tsconfig]));

            openFilesForSession([aTs], session);

            const untitledFile = "untitled:^Untitled-1";
            executeSessionRequestNoResponse<protocol.OpenRequest>(session, protocol.CommandTypes.Open, {
                file: untitledFile,
                fileContent: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />\nlet foo = 1;\nfooo/**/`,
                scriptKindName: "TS",
                projectRootPath: "/proj",
            });

            const response = executeSessionRequest<protocol.CodeFixRequest, protocol.CodeFixResponse>(session, protocol.CommandTypes.GetCodeFixes, {
                file: untitledFile,
                startLine: 3,
                startOffset: 1,
                endLine: 3,
                endOffset: 5,
                errorCodes: [Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
            });
            assert.deepEqual<ReadonlyArray<protocol.CodeFixAction> | undefined>(response, [
                {
                    description: "Change spelling to 'foo'",
                    fixAllDescription: "Fix all detected spelling errors",
                    fixId: "fixSpelling",
                    fixName: "spelling",
                    changes: [{
                        fileName: untitledFile,
                        textChanges: [{
                            start: { line: 3, offset: 1 },
                            end: { line: 3, offset: 5 },
                            newText: "foo",
                        }],
                    }],
                    commands: undefined,
                },
            ]);
        });
    });
}

namespace ts.projectSystem {
    import lsp = server.lsp;

    describe("unittests:: tsserver:: lsp:: signatureHelp ", () => {
        it("basic signature help should work", () => {
            const path = "/a/file.ts";
            const file: File = {
                path,
                content: `function foo(s: string): 5 {
    return 5;
}
foo()`,
            };

            const host = createServerHost([file]);
            const session = createLspSession(host, {
                logger: createLoggerWithInMemoryLogs(),
            });
            openFilesForLspSession([file], session);
            session.executeLspRequest<lsp.SignatureHelpRequest>(
                makeLspMessage(lsp.Methods.SignatureHelp, {
                    position: {
                        line: 3,
                        character: 4,
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    },
                    context: {
                        triggerKind: lsp.SignatureHelpTriggerKind.Invoked,
                        isRetrigger: false,
                    },
                })
            );

            // baseline to ensure signature help request and response stay correct
            baselineTsserverLogs("lsp signature help", "basic functionality", session);
        });
    });
}

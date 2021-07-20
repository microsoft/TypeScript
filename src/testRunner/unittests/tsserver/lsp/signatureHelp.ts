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

        it("parameter documentation should work", () => {
            const path = "/a/file.ts";
            const file: File = {
                path,
                content: `/**
* this is documentation
* @param s any string
*/
function foo(s: string): 5 {
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
                        line: 7,
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

            // baseline to ensure signature help documentation (general and parameter) stays correct
            baselineTsserverLogs("lsp signature help", "parameter documentation", session);
        });

        it("retrigger and active signature", () => {
            const path = "/a/file.ts";
            const file: File = {
                path,
                content: `declare function foo(a: number, b: 'abc'): void;
    declare function foo(a: number, c: 'xyz'): void;

    foo()`,
            };

            const host = createServerHost([file]);
            const session = createLspSession(host, {
                logger: createLoggerWithInMemoryLogs(),
            });
            openFilesForLspSession([file], session);

            // invoke signature help
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

            // type 1
            const didChangeArgs: lsp.DidChangeTextDocumentParams = {
                textDocument: {
                    uri: createUriFromPath(path),
                    version: 1,
                },
                contentChanges: [{
                    range: {
                        start: {
                            line: 3,
                            character: 4,
                        },
                        end: {
                            line: 3,
                            character: 4,
                        },
                    },
                    text: "1",
                }]
            };
            session.executeLspNotification(
                makeLspMessage(lsp.Methods.DidChange, didChangeArgs) as lsp.NotificationMessage
            );

            // retrigger signature help on change
            session.executeLspRequest<lsp.SignatureHelpRequest>(
                makeLspMessage(lsp.Methods.SignatureHelp, {
                    position: {
                        line: 3,
                        character: 5,
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    },
                    context: {
                        triggerKind: lsp.SignatureHelpTriggerKind.ContentChange,
                        isRetrigger: true,
                    },
                })
            );

            // baseline to ensure signature help request and response stay correct
            baselineTsserverLogs("lsp signature help", "retrigger and active signature", session);
        });
    });


}

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
            // based on https://github.com/microsoft/vscode/issues/94834
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
            const initialSignatureHelp = session.executeLspRequest<lsp.SignatureHelpRequest>(
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
            ) as lsp.SignatureHelp;

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
            const secondSignatureHelp = session.executeLspRequest<lsp.SignatureHelpRequest>(
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
                        activeSignatureHelp: initialSignatureHelp,
                    },
                })
            ) as lsp.SignatureHelp;

            // navigate to second signature
            secondSignatureHelp.activeSignature = 1;

            // type comma
            const didChangeArgsForComma: lsp.DidChangeTextDocumentParams = {
                textDocument: {
                    uri: createUriFromPath(path),
                    version: 2,
                },
                contentChanges: [{
                    range: {
                        start: {
                            line: 3,
                            character: 5,
                        },
                        end: {
                            line: 3,
                            character: 5,
                        },
                    },
                    text: ",",
                }]
            };
            session.executeLspNotification(
                makeLspMessage(lsp.Methods.DidChange, didChangeArgsForComma) as lsp.NotificationMessage
            );

            // retrigger signature help on comma trigger
            const result = session.executeLspRequest<lsp.SignatureHelpRequest>(
                makeLspMessage(lsp.Methods.SignatureHelp, {
                    position: {
                        line: 3,
                        character: 6,
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    },
                    context: {
                        triggerKind: lsp.SignatureHelpTriggerKind.TriggerCharacter,
                        isRetrigger: true,
                        activeSignatureHelp: secondSignatureHelp,
                    },
                })
            ) as lsp.SignatureHelp;


            // verify that the response focuses on the second parameter of the second overload
            assert.equal(result.activeSignature, 1);
            assert.equal(result.activeParameter, 1);

            // baseline to ensure signature help request and response stay correct
            baselineTsserverLogs("lsp signature help", "retrigger and active signature", session);
        });
    });


}

namespace ts.projectSystem {
    import lsp = server.lsp;

    describe("unittests:: tsserver:: lsp:: hover ", () => {
        it("basic hover should work", () => {
            const path = "/a/file.js";
            const file: File = {
                path,
                content: "const foo = 5;",
            };

            const host = createServerHost([file]);
            const session = createLspSession(host, {
                logger: createLoggerWithInMemoryLogs(),
            });
            openFilesForLspSession([file], session);
            session.executeLspRequest<lsp.HoverRequest>(
                makeLspMessage(lsp.Methods.Hover, {
                    position: {
                        line: 0,
                        character: 7
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    }
                }));

            // baseline to ensure hover request and response stay correct
            baselineTsserverLogs("lsp hover", "basic functionality", session);
        });

        it("jsdoc successfully produces markdown contents", () => {
            const path = "/a/file.js";
            const file: File = {
                path,
                content: `/**
* this is how documentation works
* @param s the number 3
* @returns the number 5
*/
function foo(s) {
    return 5;
}`,
            };

            const host = createServerHost([file]);
            const session = createLspSession(host, {
                logger: createLoggerWithInMemoryLogs(),
            });
            openFilesForLspSession([file], session);
            session.executeLspRequest<lsp.HoverRequest>(
                makeLspMessage(lsp.Methods.Hover, {
                    position: {
                        line: 5,
                        character: 10,
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    },
                })
            );

            // baseline to ensure markdown contents stay correct
            baselineTsserverLogs("lsp hover", "markdown contents", session);
        });
    });
}

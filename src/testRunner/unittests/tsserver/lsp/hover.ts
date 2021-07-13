namespace ts.projectSystem {
    import lsp = server.lsp;

    describe("unittests:: tsserver:: lsp:: hover ", () => {
        it("basic hover should work", () => {
            const path = "/a/file.js";
            const file: File = {
                path: path,
                content: "const foo = 5;",
            };

            const host = createServerHost([file]);
            const session = createLspSession(host);
            openFilesForLspSession([file], session);
            const hover = session.executeLspRequest<lsp.HoverRequest>(
                makeLspMessage(lsp.Methods.Hover, {
                    position: {
                        line: 0,
                        character: 7
                    },
                    textDocument: {
                        uri: createUriFromPath(path),
                    }
                }));
            assert.isDefined(hover);
        });
    });
}

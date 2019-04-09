namespace ts.projectSystem {
    function setup(fileName: string, content: string) {
        const file: File = { path: fileName, content };
        const host = createServerHost([file, libFile]);
        const session = createSession(host);
        openFilesForSession([file], session);
        return function getSelectionRange(locations: protocol.SelectionRangeRequestArgs["locations"]) {
            return executeSessionRequest<protocol.SelectionRangeRequest, protocol.SelectionRangeResponse>(
                session,
                CommandNames.SelectionRange,
                { file: fileName, locations });
        };
    }

    describe("unittests:: tsserver:: selectionRange", () => {
        it("works for simple JavaScript", () => {
            const getSelectionRange = setup("/file.js", `
class Foo {
    bar(a, b) {
        if (a === b) {
            return true;
        }
        return false;
    }
}`);

            const locations = getSelectionRange([{
                line: 4,
                offset: 13
            }]);

            assert.deepEqual(locations, [
                {
                    textSpan: { // a
                        start: { line: 4, offset: 13 },
                        end: { line: 4, offset: 14 },
                    },
                    parent: {
                        textSpan: { // a === b
                            start: { line: 4, offset: 13 },
                            end: { line: 4, offset: 20 },
                        },
                        parent: {
                            textSpan: { // IfStatement
                                start: { line: 4, offset: 9 },
                                end: { line: 6, offset: 10 },
                            },
                            parent: {
                                textSpan: { // SyntaxList + whitespace (body of method)
                                    start: { line: 3, offset: 16 },
                                    end: { line: 8, offset: 5 },
                                },
                                parent: {
                                    textSpan: { // MethodDeclaration
                                        start: { line: 3, offset: 5 },
                                        end: { line: 8, offset: 6 },
                                    },
                                    parent: {
                                        textSpan: { // SyntaxList + whitespace (body of class)
                                            start: { line: 2, offset: 12 },
                                            end: { line: 9, offset: 1 },
                                        },
                                        parent: {
                                            textSpan: { // ClassDeclaration
                                                start: { line: 2, offset: 1 },
                                                end: { line: 9, offset: 2 },
                                            },
                                            parent: {
                                                textSpan: { // SourceFile (all text)
                                                    start: { line: 1, offset: 1 },
                                                    end: { line: 9, offset: 2 },
                                                }
                                            }
                                        }
                                    }
                                },
                            },
                        },
                    },
                },
            ]);
        });
    });
}

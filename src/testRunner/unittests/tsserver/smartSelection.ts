import { File, createServerHost, libFile, createSession, openFilesForSession, protocol, executeSessionRequest, CommandNames } from "../../ts.projectSystem";
function setup(fileName: string, content: string) {
    const file: File = { path: fileName, content };
    const host = createServerHost([file, libFile]);
    const session = createSession(host);
    openFilesForSession([file], session);
    return function getSmartSelectionRange(locations: protocol.SelectionRangeRequestArgs["locations"]) {
        return executeSessionRequest<protocol.SelectionRangeRequest, protocol.SelectionRangeResponse>(session, CommandNames.SelectionRange, { file: fileName, locations });
    };
}
// More tests in fourslash/smartSelection_*
describe("unittests:: tsserver:: smartSelection", () => {
    it("works for simple JavaScript", () => {
        const getSmartSelectionRange = setup("/file.js", `
class Foo {
    bar(a, b) {
        if (a === b) {
            return true;
        }
        return false;
    }
}`);
        const locations = getSmartSelectionRange([
            { line: 4, offset: 13 },
        ]);
        assert.deepEqual(locations, [{
                textSpan: {
                    start: { line: 4, offset: 13 },
                    end: { line: 4, offset: 14 }
                },
                parent: {
                    textSpan: {
                        start: { line: 4, offset: 13 },
                        end: { line: 4, offset: 20 }
                    },
                    parent: {
                        textSpan: {
                            start: { line: 4, offset: 9 },
                            end: { line: 6, offset: 10 }
                        },
                        parent: {
                            textSpan: {
                                start: { line: 3, offset: 16 },
                                end: { line: 8, offset: 5 }
                            },
                            parent: {
                                textSpan: {
                                    start: { line: 3, offset: 5 },
                                    end: { line: 8, offset: 6 }
                                },
                                parent: {
                                    textSpan: {
                                        start: { line: 2, offset: 12 },
                                        end: { line: 9, offset: 1 }
                                    },
                                    parent: {
                                        textSpan: {
                                            start: { line: 2, offset: 1 },
                                            end: { line: 9, offset: 2 }
                                        },
                                        parent: {
                                            textSpan: {
                                                start: { line: 1, offset: 1 },
                                                end: { line: 9, offset: 2 },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }]);
    });
});

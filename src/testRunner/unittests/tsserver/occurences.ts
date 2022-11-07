import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: occurrence highlight on string", () => {
    it("should be marked if only on string values", () => {
        const file1: ts.projectSystem.File = {
            path: "/a/b/file1.ts",
            content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
        };

        const host = ts.projectSystem.createServerHost([file1]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();

        projectService.openClientFile(file1.path);
        {
            const highlightRequest = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.FileLocationRequestArgs>(
                ts.projectSystem.CommandNames.Occurrences,
                { file: file1.path, line: 1, offset: 11 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.projectSystem.protocol.OccurrencesResponseItem[];
            const firstOccurence = highlightResponse[0];
            assert.isTrue(firstOccurence.isInString, "Highlights should be marked with isInString");
        }

        {
            const highlightRequest = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.FileLocationRequestArgs>(
                ts.projectSystem.CommandNames.Occurrences,
                { file: file1.path, line: 3, offset: 13 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.projectSystem.protocol.OccurrencesResponseItem[];
            assert.isTrue(highlightResponse.length === 2);
            const firstOccurence = highlightResponse[0];
            assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on property name");
        }

        {
            const highlightRequest = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.FileLocationRequestArgs>(
                ts.projectSystem.CommandNames.Occurrences,
                { file: file1.path, line: 4, offset: 14 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.projectSystem.protocol.OccurrencesResponseItem[];
            assert.isTrue(highlightResponse.length === 2);
            const firstOccurence = highlightResponse[0];
            assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on indexer");
        }
    });
});

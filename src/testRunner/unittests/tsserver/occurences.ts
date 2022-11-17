import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
} from "../virtualFileSystemWithWatch";
import {
    createSession,
    makeSessionRequest,
} from "./helpers";

describe("unittests:: tsserver:: occurrence highlight on string", () => {
    it("should be marked if only on string values", () => {
        const file1: File = {
            path: "/a/b/file1.ts",
            content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
        };

        const host = createServerHost([file1]);
        const session = createSession(host);
        const projectService = session.getProjectService();

        projectService.openClientFile(file1.path);
        {
            const highlightRequest = makeSessionRequest<ts.server.protocol.FileLocationRequestArgs>(
                ts.server.CommandNames.Occurrences,
                { file: file1.path, line: 1, offset: 11 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.server.protocol.OccurrencesResponseItem[];
            const firstOccurence = highlightResponse[0];
            assert.isTrue(firstOccurence.isInString, "Highlights should be marked with isInString");
        }

        {
            const highlightRequest = makeSessionRequest<ts.server.protocol.FileLocationRequestArgs>(
                ts.server.CommandNames.Occurrences,
                { file: file1.path, line: 3, offset: 13 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.server.protocol.OccurrencesResponseItem[];
            assert.isTrue(highlightResponse.length === 2);
            const firstOccurence = highlightResponse[0];
            assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on property name");
        }

        {
            const highlightRequest = makeSessionRequest<ts.server.protocol.FileLocationRequestArgs>(
                ts.server.CommandNames.Occurrences,
                { file: file1.path, line: 4, offset: 14 }
            );
            const highlightResponse = session.executeCommand(highlightRequest).response as ts.server.protocol.OccurrencesResponseItem[];
            assert.isTrue(highlightResponse.length === 2);
            const firstOccurence = highlightResponse[0];
            assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on indexer");
        }
    });
});

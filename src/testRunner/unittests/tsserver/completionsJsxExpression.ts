import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
} from "./helpers";

describe("unittests:: tsserver:: completionsJsxExpression", () => {
    it("should not error", () => {
        const host = createServerHost([]);
        const session = createSession(host, {
            canUseEvents: true,
            noGetErrOnBackgroundUpdate: true,
            logger: createLoggerWithInMemoryLogs(host),
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    jsxAttributeCompletionStyle: "auto",
                    includeCompletionsWithSnippetText: true,
                }
            }
        });
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [],
                closedFiles: [],
                openFiles: [
                    {
                        file: "^/untitled/ts-nul-authority/Untitled-1",
                        fileContent: `interface IntrinsicElements { div: { foo?: number } }\n<div foo={undefine}></div>`,
                        scriptKindName: "TSX"
                    }
                ]
            }
        });
        const completion = session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: "^/untitled/ts-nul-authority/Untitled-1",
                line: 2,
                offset: 19,
                includeInsertTextCompletions: true,
            }
        }).response as ts.server.protocol.CompletionInfo | undefined;
        baselineTsserverLogs("completionsJsxExpression", "should not complete as jsx attribute", session);
        ts.Debug.assertIsDefined(completion);
        for (const entry of completion.entries) {
            ts.Debug.assert(!entry.isSnippet);
            if (entry.insertText) {
                ts.Debug.assert(!entry.insertText.includes("="));
            }
        }
    });
});
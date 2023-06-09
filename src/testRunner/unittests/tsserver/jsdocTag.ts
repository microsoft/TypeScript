import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: jsdocTag:: jsdoc @link ", () => {
    const config: File = {
        path: "/a/tsconfig.json",
        content: `{
"compilerOptions": {
"checkJs": true,
"noEmit": true
}
"files": ["someFile1.js"]
}
`
    };
    function assertQuickInfoJSDoc(subScenario: string, file: File, options: {
        displayPartsForJSDoc: boolean,
        command: ts.server.protocol.CommandTypes,
    }) {
        it(subScenario, () => {
            const { command, displayPartsForJSDoc } = options;
            const host = createServerHost([file, config]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { displayPartsForJSDoc } }
            });
            openFilesForSession([file], session);
            const indexOfX = file.content.indexOf("x");
            session.executeCommandSeq<ts.server.protocol.QuickInfoRequest>({
                command: command as ts.server.protocol.CommandTypes.Quickinfo,
                arguments: {
                    file: file.path,
                    position: indexOfX,
                } as ts.server.protocol.FileLocationRequestArgs
            });
            baselineTsserverLogs("jsdocTag", subScenario, session);
        });
    }

    const linkInTag: File = {
        path: "/a/someFile1.js",
        content: `class C { }
/** @wat {@link C} */
var x = 1`
    };
    const linkInComment: File = {
        path: "/a/someFile1.js",
        content: `class C { }
     /** {@link C} */
var x = 1
;`
    };

    assertQuickInfoJSDoc("for quickinfo, should provide display parts plus a span for a working link in a tag", linkInTag, {
        command: ts.server.protocol.CommandTypes.Quickinfo,
        displayPartsForJSDoc: true,
    });

    assertQuickInfoJSDoc("for quickinfo, should provide a string for a working link in a tag", linkInTag, {
        command: ts.server.protocol.CommandTypes.Quickinfo,
        displayPartsForJSDoc: false,
    });

    assertQuickInfoJSDoc("for quickinfo, should provide display parts for a working link in a comment", linkInComment, {
        command: ts.server.protocol.CommandTypes.Quickinfo,
        displayPartsForJSDoc: true,
    });

    assertQuickInfoJSDoc("for quickinfo, should provide a string for a working link in a comment", linkInComment, {
        command: ts.server.protocol.CommandTypes.Quickinfo,
        displayPartsForJSDoc: false,
    });

    assertQuickInfoJSDoc("for quickinfo-full, should provide display parts plus a span for a working link in a tag", linkInTag, {
        command: ts.server.protocol.CommandTypes.QuickinfoFull,
        displayPartsForJSDoc: true,
    });

    assertQuickInfoJSDoc("for quickinfo-full, should provide a string for a working link in a tag", linkInTag, {
        command: ts.server.protocol.CommandTypes.QuickinfoFull,
        displayPartsForJSDoc: false,
    });

    assertQuickInfoJSDoc("for quickinfo-full, should provide display parts plus a span for a working link in a comment", linkInComment, {
        command: ts.server.protocol.CommandTypes.QuickinfoFull,
        displayPartsForJSDoc: true,
    });

    assertQuickInfoJSDoc("for quickinfo-full, should provide a string for a working link in a comment", linkInComment, {
        command: ts.server.protocol.CommandTypes.QuickinfoFull,
        displayPartsForJSDoc: false,
    });

    function assertSignatureHelpJSDoc(subScenario: string, options: {
        displayPartsForJSDoc: boolean,
        command: ts.server.protocol.CommandTypes,
    }) {
        it(subScenario, () => {
            const linkInParamTag: File = {
                path: "/a/someFile1.js",
                content: `class C { }
/** @param y - {@link C} */
function x(y) { }
x(1)`
            };

            const { command, displayPartsForJSDoc } = options;
            const host = createServerHost([linkInParamTag, config]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { displayPartsForJSDoc } }
            });
            openFilesForSession([linkInParamTag], session);
            const indexOfX = linkInParamTag.content.lastIndexOf("1");
            session.executeCommandSeq<ts.server.protocol.SignatureHelpRequest>({
                command: command as ts.server.protocol.CommandTypes.SignatureHelp,
                arguments: {
                    triggerReason: {
                        kind: "invoked"
                    },
                    file: linkInParamTag.path,
                    position: indexOfX,
                } as ts.server.protocol.SignatureHelpRequestArgs
            });
            baselineTsserverLogs("jsdocTag", subScenario, session);
        });
    }
    assertSignatureHelpJSDoc("for signature help, should provide a string for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.SignatureHelp,
        displayPartsForJSDoc: false,
    });

    assertSignatureHelpJSDoc("for signature help, should provide display parts for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.SignatureHelp,
        displayPartsForJSDoc: true,
    });

    assertSignatureHelpJSDoc("for signature help-full, should provide a string for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.SignatureHelpFull,
        displayPartsForJSDoc: false,
    });
    assertSignatureHelpJSDoc("for signature help-full, should provide display parts for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.SignatureHelpFull,
        displayPartsForJSDoc: true,
    });

    function assertCompletionsJSDoc(subScenario: string, options: {
        displayPartsForJSDoc: boolean,
        command: ts.server.protocol.CommandTypes,
    }) {
        it(subScenario, () => {
            const linkInParamJSDoc: File = {
                path: "/a/someFile1.js",
                content: `class C { }
/** @param x - see {@link C} */
function foo (x) { }
foo`
            };
            const { command, displayPartsForJSDoc } = options;
            const host = createServerHost([linkInParamJSDoc, config]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { displayPartsForJSDoc } }
            });
            openFilesForSession([linkInParamJSDoc], session);
            const indexOfFoo = linkInParamJSDoc.content.lastIndexOf("fo");
            session.executeCommandSeq<ts.server.protocol.CompletionDetailsRequest>({
                command: command as ts.server.protocol.CommandTypes.CompletionDetails,
                arguments: {
                    entryNames: ["foo"],
                    file: linkInParamJSDoc.path,
                    position: indexOfFoo,
                } as ts.server.protocol.CompletionDetailsRequestArgs
            });
            baselineTsserverLogs("jsdocTag", subScenario, session);
        });
    }
    assertCompletionsJSDoc("for completions, should provide display parts for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.CompletionDetails,
        displayPartsForJSDoc: true,
    });

    assertCompletionsJSDoc("for completions, should provide a string for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.CompletionDetails,
        displayPartsForJSDoc: false,
    });

    assertCompletionsJSDoc("for completions-full, should provide display parts for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.CompletionDetailsFull,
        displayPartsForJSDoc: true,
    });

    assertCompletionsJSDoc("for completions-full, should provide a string for a working link in a comment", {
        command: ts.server.protocol.CommandTypes.CompletionDetailsFull,
        displayPartsForJSDoc: false,
    });
});

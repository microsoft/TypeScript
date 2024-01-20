import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: codeFix::", () => {
    function setup() {
        const host = createServerHost({
            "/home/src/projects/project/src/file.ts": dedent`
                import * as os from "os";
                import * as https from "https";
                import * as vscode from "vscode";
            `,
            "/home/src/projects/project/tsconfig.json": "{ }",
            "/home/src/projects/project/node_modules/vscode/index.js": "export const x = 10;",
            [libFile.path]: libFile.content,
        });
        const session = new TestSession({ host, typesRegistry: ["vscode"] });
        openFilesForSession(["/home/src/projects/project/src/file.ts"], session);
        const actions = session.executeCommandSeq<ts.server.protocol.GetCombinedCodeFixRequest>({
            command: ts.server.protocol.CommandTypes.GetCombinedCodeFix,
            arguments: {
                scope: { type: "file", args: { file: "/home/src/projects/project/src/file.ts" } },
                fixId: "installTypesPackage",
            },
        }).response as ts.server.protocol.CombinedCodeActions;
        return { host, session, actions };
    }
    it("install package", () => {
        const { host, session, actions } = setup();
        actions.commands?.forEach(command =>
            session.executeCommandSeq<ts.server.protocol.ApplyCodeActionCommandRequest>({
                command: ts.server.protocol.CommandTypes.ApplyCodeActionCommand,
                arguments: {
                    command,
                },
            })
        );
        host.runPendingInstalls();
        baselineTsserverLogs("codeFix", "install package", session);
    });

    it("install package when serialized", () => {
        const { host, session, actions } = setup();
        actions.commands?.forEach(command => {
            session.executeCommandSeq<ts.server.protocol.ApplyCodeActionCommandRequest>({
                command: ts.server.protocol.CommandTypes.ApplyCodeActionCommand,
                arguments: {
                    command,
                },
            });
            host.runPendingInstalls();
        });
        baselineTsserverLogs("codeFix", "install package when serialized", session);
    });
});

import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: codeFix::", () => {
    function setup() {
        const host = TestServerHost.createServerHost({
            "/home/src/projects/project/src/file.ts": dedent`
                import * as os from "os";
                import * as https from "https";
                import * as vscode from "vscode";
            `,
            "/home/src/projects/project/tsconfig.json": "{ }",
            "/home/src/projects/project/node_modules/vscode/index.js": "export const x = 10;",
        }, { typingsInstallerTypesRegistry: ["vscode"] });
        const session = new TestSession(host);
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

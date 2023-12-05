import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: getFileReferences", () => {
    const importA = `import "./a";`;
    const importCurlyFromA = `import {} from "./a";`;
    const importAFromA = `import { a } from "/project/a";`;
    const typeofImportA = `type T = typeof import("./a").a;`;

    const aTs: File = {
        path: "/project/a.ts",
        content: "export const a = {};",
    };
    const bTs: File = {
        path: "/project/b.ts",
        content: importA,
    };
    const cTs: File = {
        path: "/project/c.ts",
        content: importCurlyFromA,
    };
    const dTs: File = {
        path: "/project/d.ts",
        content: [importAFromA, typeofImportA].join("\n"),
    };
    const tsconfig: File = {
        path: "/project/tsconfig.json",
        content: "{}",
    };

    function makeSampleSession() {
        const host = createServerHost([aTs, bTs, cTs, dTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs, bTs, cTs, dTs], session);
        return session;
    }

    it("should get file references", () => {
        const session = makeSampleSession();

        session.executeCommandSeq<ts.server.protocol.FileReferencesRequest>({
            command: ts.server.protocol.CommandTypes.FileReferences,
            arguments: { file: aTs.path },
        });
        baselineTsserverLogs("getFileReferences", "should get file references", session);
    });

    it("should skip lineText from file references", () => {
        const session = makeSampleSession();
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: { disableLineTextInReferences: true },
            },
        });
        session.executeCommandSeq<ts.server.protocol.FileReferencesRequest>({
            command: ts.server.protocol.CommandTypes.FileReferences,
            arguments: { file: aTs.path },
        });
        baselineTsserverLogs("getFileReferences", "should skip lineText from file references", session);
    });
});

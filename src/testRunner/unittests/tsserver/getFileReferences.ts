import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: getFileReferences", () => {
    const importA = `import "./a";`;
    const importCurlyFromA = `import {} from "./a";`;
    const importAFromA = `import { a } from "/project/a";`;
    const typeofImportA = `type T = typeof import("./a").a;`;

    const aTs: ts.projectSystem.File = {
        path: "/project/a.ts",
        content: "export const a = {};",
    };
    const bTs: ts.projectSystem.File = {
        path: "/project/b.ts",
        content: importA,
    };
    const cTs: ts.projectSystem.File = {
        path: "/project/c.ts",
        content: importCurlyFromA
    };
    const dTs: ts.projectSystem.File = {
        path: "/project/d.ts",
        content: [importAFromA, typeofImportA].join("\n")
    };
    const tsconfig: ts.projectSystem.File = {
        path: "/project/tsconfig.json",
        content: "{}",
    };

    function makeSampleSession() {
        const host = ts.projectSystem.createServerHost([aTs, bTs, cTs, dTs, tsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs, bTs, cTs, dTs], session);
        return session;
    }

    it("should get file references", () => {
        const session = makeSampleSession();

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.FileReferencesRequest, ts.projectSystem.protocol.FileReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.FileReferences,
            { file: aTs.path },
        );

        const expectResponse: ts.projectSystem.protocol.FileReferencesResponseBody = {
            refs: [
                ts.projectSystem.makeReferenceItem({ file: bTs, text: "./a", lineText: importA, contextText: importA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: cTs, text: "./a", lineText: importCurlyFromA, contextText: importCurlyFromA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: dTs, text: "/project/a", lineText: importAFromA, contextText: importAFromA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: dTs, text: "./a", lineText: typeofImportA, contextText: typeofImportA, isWriteAccess: false }),
            ],
            symbolName: `"${aTs.path}"`,
        };

        assert.deepEqual(response, expectResponse);
    });

    it("should skip lineText from file references", () => {
        const session = makeSampleSession();
        session.getProjectService().setHostConfiguration({ preferences: { disableLineTextInReferences: true } });

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.FileReferencesRequest, ts.projectSystem.protocol.FileReferencesResponse>(
            session,
            ts.projectSystem.protocol.CommandTypes.FileReferences,
            { file: aTs.path },
        );

        const expectResponse: ts.projectSystem.protocol.FileReferencesResponseBody = {
            refs: [
                ts.projectSystem.makeReferenceItem({ file: bTs, text: "./a", lineText: undefined, contextText: importA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: cTs, text: "./a", lineText: undefined, contextText: importCurlyFromA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: dTs, text: "/project/a", lineText: undefined, contextText: importAFromA, isWriteAccess: false }),
                ts.projectSystem.makeReferenceItem({ file: dTs, text: "./a", lineText: undefined, contextText: typeofImportA, isWriteAccess: false }),
            ],
            symbolName: `"${aTs.path}"`,
        };

        assert.deepEqual(response, expectResponse);
    });
});

namespace ts.projectSystem {
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
            content: importCurlyFromA
        };
        const dTs: File = {
            path: "/project/d.ts",
            content: [importAFromA, typeofImportA].join("\n")
        };
        const tsconfig: File = {
            path: "/project/tsconfig.json",
            content: "{}",
        };

        function makeSampleSession() {
            const host = createServerHost([aTs, bTs, cTs, dTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs, bTs, cTs, dTs], session);
            return session;
        }

        it("should get file references", () => {
            const session = makeSampleSession();

            const response = executeSessionRequest<protocol.FileReferencesRequest, protocol.FileReferencesResponse>(
                session,
                protocol.CommandTypes.FileReferences,
                { file: aTs.path },
            );

            const expectResponse: protocol.FileReferencesResponseBody = {
                refs: [
                    makeReferenceItem({ file: bTs, text: "./a", lineText: importA, contextText: importA, isWriteAccess: false }),
                    makeReferenceItem({ file: cTs, text: "./a", lineText: importCurlyFromA, contextText: importCurlyFromA, isWriteAccess: false }),
                    makeReferenceItem({ file: dTs, text: "/project/a", lineText: importAFromA, contextText: importAFromA, isWriteAccess: false }),
                    makeReferenceItem({ file: dTs, text: "./a", lineText: typeofImportA, contextText: typeofImportA, isWriteAccess: false }),
                ],
                symbolName: `"${aTs.path}"`,
            };

            assert.deepEqual(response, expectResponse);
        });

        it("should skip lineText from file references", () => {
            const session = makeSampleSession();
            session.getProjectService().setHostConfiguration({ preferences: { disableLineTextInReferences: true } });

            const response = executeSessionRequest<protocol.FileReferencesRequest, protocol.FileReferencesResponse>(
                session,
                protocol.CommandTypes.FileReferences,
                { file: aTs.path },
            );

            const expectResponse: protocol.FileReferencesResponseBody = {
                refs: [
                    makeReferenceItem({ file: bTs, text: "./a", lineText: undefined, contextText: importA, isWriteAccess: false }),
                    makeReferenceItem({ file: cTs, text: "./a", lineText: undefined, contextText: importCurlyFromA, isWriteAccess: false }),
                    makeReferenceItem({ file: dTs, text: "/project/a", lineText: undefined, contextText: importAFromA, isWriteAccess: false }),
                    makeReferenceItem({ file: dTs, text: "./a", lineText: undefined, contextText: typeofImportA, isWriteAccess: false }),
                ],
                symbolName: `"${aTs.path}"`,
            };

            assert.deepEqual(response, expectResponse);
        });
    });
}

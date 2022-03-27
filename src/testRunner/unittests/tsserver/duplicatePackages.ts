namespace ts.projectSystem {
    describe("unittests:: tsserver:: duplicate packages", () => {
        // Tests that 'moduleSpecifiers.ts' will import from the redirecting file, and not from the file it redirects to, if that can provide a global module specifier.
        it("works with import fixes", () => {
            const packageContent = "export const foo: number;";
            const packageJsonContent = JSON.stringify({ name: "foo", version: "1.2.3" });
            const aFooIndex: File = { path: "/a/node_modules/foo/index.d.ts", content: packageContent };
            const aFooPackage: File = { path: "/a/node_modules/foo/package.json", content: packageJsonContent };
            const bFooIndex: File = { path: "/b/node_modules/foo/index.d.ts", content: packageContent };
            const bFooPackage: File = { path: "/b/node_modules/foo/package.json", content: packageJsonContent };

            const userContent = 'import("foo");\nfoo';
            const aUser: File = { path: "/a/user.ts", content: userContent };
            const bUser: File = { path: "/b/user.ts", content: userContent };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const host = createServerHost([aFooIndex, aFooPackage, bFooIndex, bFooPackage, aUser, bUser, tsconfig]);
            const session = createSession(host);

            openFilesForSession([aUser, bUser], session);

            for (const user of [aUser, bUser]) {
                const response = executeSessionRequest<protocol.CodeFixRequest, protocol.CodeFixResponse>(session, protocol.CommandTypes.GetCodeFixes, {
                    file: user.path,
                    startLine: 2,
                    startOffset: 1,
                    endLine: 2,
                    endOffset: 4,
                    errorCodes: [Diagnostics.Cannot_find_name_0.code],
                });
                assert.deepEqual<readonly protocol.CodeFixAction[] | undefined>(response, [
                    {
                        description: `Add import from "foo"`,
                        fixName: "import",
                        changes: [{
                            fileName: user.path,
                            textChanges: [{
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                                newText: 'import { foo } from "foo";\n\n',
                            }],
                        }],
                        commands: undefined,
                        fixId: undefined,
                        fixAllDescription: undefined
                    },
                ]);
            }
        });
    });
}

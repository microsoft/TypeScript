import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: duplicate packages", () => {
    // Tests that 'moduleSpecifiers.ts' will import from the redirecting file, and not from the file it redirects to, if that can provide a global module specifier.
    it("works with import fixes", () => {
        const packageContent = "export const foo: number;";
        const packageJsonContent = JSON.stringify({ name: "foo", version: "1.2.3" });
        const aFooIndex: ts.projectSystem.File = { path: "/a/node_modules/foo/index.d.ts", content: packageContent };
        const aFooPackage: ts.projectSystem.File = { path: "/a/node_modules/foo/package.json", content: packageJsonContent };
        const bFooIndex: ts.projectSystem.File = { path: "/b/node_modules/foo/index.d.ts", content: packageContent };
        const bFooPackage: ts.projectSystem.File = { path: "/b/node_modules/foo/package.json", content: packageJsonContent };

        const userContent = 'import("foo");\nfoo';
        const aUser: ts.projectSystem.File = { path: "/a/user.ts", content: userContent };
        const bUser: ts.projectSystem.File = { path: "/b/user.ts", content: userContent };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        const host = ts.projectSystem.createServerHost([aFooIndex, aFooPackage, bFooIndex, bFooPackage, aUser, bUser, tsconfig]);
        const session = ts.projectSystem.createSession(host);

        ts.projectSystem.openFilesForSession([aUser, bUser], session);

        for (const user of [aUser, bUser]) {
            const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.CodeFixRequest, ts.projectSystem.protocol.CodeFixResponse>(session, ts.projectSystem.protocol.CommandTypes.GetCodeFixes, {
                file: user.path,
                startLine: 2,
                startOffset: 1,
                endLine: 2,
                endOffset: 4,
                errorCodes: [ts.Diagnostics.Cannot_find_name_0.code],
            });
            assert.deepEqual<readonly ts.projectSystem.protocol.CodeFixAction[] | undefined>(response, [
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

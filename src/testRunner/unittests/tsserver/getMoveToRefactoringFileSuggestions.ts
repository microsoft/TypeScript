import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: getMoveToRefactoringFileSuggestions::", () => {
    it("works for suggesting a list of files, excluding node_modules within a project", () => {
        const file1: File = {
            path: "/home/src/projects/project/a/file1.ts",
            content: `interface ka {
                name: string;
            }
            `,
        };
        const file2: File = { path: "/home/src/projects/project/b/file2.ts", content: "" };
        const file3: File = { path: "/home/src/projects/project/d/e/file3.ts", content: "" };
        const file4: File = {
            path: "/home/src/projects/project/a/file4.ts",
            content: `import { value } from "../node_modules/@types/node/someFile.d.ts";
import { value1 } from "../node_modules/.cache/someFile.d.ts";`,
        };
        const nodeModulesFile1: File = {
            path: "/home/src/projects/project/node_modules/@types/node/someFile.d.ts",
            content: `export const value = 0;`,
        };
        const nodeModulesFile2: File = {
            path: "/home/src/projects/project/node_modules/.cache/someFile.d.ts",
            content: `export const value1 = 0;`,
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };
        const host = TestServerHost.createServerHost([file1, file2, file3, file3, file4, nodeModulesFile1, nodeModulesFile2, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 11 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, excluding node_modules within a project", session);
    });
    it("suggests only .ts file for a .ts filepath", () => {
        const file1: File = {
            path: "/home/src/projects/project/file1.ts",
            content: `interface ka {
                name: string;
            }
            `,
        };
        const file2: File = { path: "/home/src/projects/project/file2.tsx", content: "" };
        const file3: File = { path: "/home/src/projects/project/file3.mts", content: "" };
        const file4: File = { path: "/home/src/projects/project/file4.cts", content: "" };
        const file5: File = { path: "/home/src/projects/project/file5.js", content: "" };
        const file6: File = { path: "/home/src/projects/project/file6.d.ts", content: "" };
        const file7: File = { path: "/home/src/projects/project/file7.ts", content: "" };
        const tsconfig: File = { path: "/home/src/projects/project/tsconfig.json", content: jsonToReadableText({ files: ["./file1.ts", "./file2.tsx", "./file3.mts", "./file4.cts", "./file5.js", "./file6.d.ts", "./file7.ts"] }) };

        const host = TestServerHost.createServerHost([file1, file2, file3, file4, file5, file6, file7, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 11 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "suggests only .ts file for a .ts filepath", session);
    });
    it("suggests only .js file for a .js filepath", () => {
        const file1: File = {
            path: "/home/src/projects/project/file1.js",
            content: `class C {}`,
        };
        const file2: File = { path: "/home/src/projects/project/file2.js", content: "" };
        const file3: File = { path: "/home/src/projects/project/file3.mts", content: "" };
        const file4: File = { path: "/home/src/projects/project/file4.ts", content: "" };
        const file5: File = { path: "/home/src/projects/project/file5.js", content: "" };
        const tsconfig: File = { path: "/home/src/projects/project/tsconfig.json", content: jsonToReadableText({ files: ["./file1.js", "./file2.js", "./file3.mts", "./file4.ts", "./file5.js"] }) };

        const host = TestServerHost.createServerHost([file1, file2, file3, file4, file5, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 7 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "suggests only .js file for a .js filepath", session);
    });
    it("skips lib.d.ts files", () => {
        const file1: File = {
            path: "/home/src/projects/project/file1.d.ts",
            content: `class C {}`,
        };
        const file2: File = { path: "/home/src/projects/project/a/lib.d.ts", content: "" };
        const file3: File = { path: "/home/src/projects/project/a/file3.d.ts", content: "" };
        const file4: File = { path: "/home/src/projects/project/a/lib.es6.d.ts", content: "" };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                files: [
                    "./file1.d.ts",
                    "./a/lib.d.ts",
                    "./a/file3.d.ts",
                    "/home/src/projects/project/a/lib.es6.d.ts",
                ],
            }),
        };

        const host = TestServerHost.createServerHost([file1, file2, file3, file4, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 7 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "skips lib.d.ts files", session);
    });

    it("should show ts files when moving non-tsx content from tsx file", () => {
        const file1: File = {
            path: "/home/src/projects/project/bar.tsx",
            content: `export function bar() { }`,
        };
        const file2: File = {
            path: "/home/src/projects/project/foo.ts",
            content: "export function foo() { }",
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                jsx: "preserve",
                files: ["./foo.ts", "./bar.tsx"],
            }),
        };

        const host = TestServerHost.createServerHost([file1, file2, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 7 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "should show ts files when moving non-tsx content from tsx file", session);
    });

    it("should show js files when moving non-jsx content from jsx file", () => {
        const file1: File = {
            path: "/home/src/projects/project/bar.jsx",
            content: `export function bar() { }`,
        };
        const file2: File = {
            path: "/home/src/projects/project/foo.js",
            content: "export function foo() { }",
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                allowJS: true,
                jsx: "preserve",
                files: ["./foo.js", "./bar.jsx"],
            }),
        };

        const host = TestServerHost.createServerHost([file1, file2, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 7 },
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "should show js files when moving non-jsx content from jsx file", session);
    });
});

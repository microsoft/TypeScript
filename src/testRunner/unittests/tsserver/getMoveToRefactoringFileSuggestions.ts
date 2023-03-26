import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
    openFilesForSession,
} from "./helpers";

describe("unittests:: tsserver:: getMoveToRefactoringFileSuggestions", () => {
//     it("works for suggesting a list of files, excluding node_modules within a project and a new filename", () => {
//         const file1: File = {
//             path: "/project/a/file1.ts",
//             content: `interface ka {
//                 name: string;
//             }
//             `
//         };
//         const file2: File = { path: "/project/b/file2.ts", content: "" };
//         const file3: File = { path: "/project/c/file3.ts", content: "" };
//         const file4: File = { path: "/project/d/e/file4.ts", content: "" };
//         const file5: File = {
//             path: "/project/a/file5.ts",
//             content: `import { value } from "../node_modules/@types/node/someFile.d.ts";
// import { value1 } from "../node_modules/.cache/someFile.d.ts";`
//         };
//         const nodeModulesFile1: File = {
//             path: "project/node_modules/@types/node/someFile.d.ts",
//             content: `export const value = 0;`
//         };
//         const nodeModulesFile2: File = {
//             path: "project/node_modules/.cache/someFile.d.ts",
//             content: `export const value1 = 0;`
//         };
//         const tsconfig: File = {
//             path: "/project/tsconfig.json",
//             content: "{}",
//         };
//         const files = [file1, file2, file3, file4, file5, nodeModulesFile1, nodeModulesFile2, tsconfig];
//         const host = createServerHost(files);
//         const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
//         openFilesForSession([file1], session);
//         session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
//             command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
//             arguments: { file: file1.path, line: 1, offset: 11 }
//         });
//         baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, excluding node_modules within a project and a new filename", session);
//     });
//     it("works for suggesting a list of files, for a file belonging to multiple projects", () => {
//         const file1: File = {
//             path: "/blah/file1.ts",
//             content: `export const value1 = 0;`
//         };
//         const file2: File = { path: "/blah/file2.ts", content: "" };
//         const configFile1: File = {
//             path: "/blah/tsconfig.json",
//             content: `{ "files": ["./file1.ts", "./file2.ts"] }`,
//         };
//         const file3: File = { path: "/blah-tests/file3.ts", content: `import { value1 } from "../blah/file1.ts";` };
//         const file4: File = { path: "/blah-tests/file4.ts", content: "" };
//         const configFile2: File = {
//             path: "/blah-tests/tsconfig.json",
//             content: `{ "files": ["./file3.ts", "./file4.ts"] }`,
//         };
//         const files = [file1, file2, file3, file4, configFile1, configFile2];
//         const host = createServerHost(files);
//         const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
//         openFilesForSession([file1], session);
//         session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
//             command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
//             arguments: { file: file1.path, line: 1, offset: 14 }
//         });
//         baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for a file belonging to multiple projects", session);
//     });
//     it("works for suggesting a list of files, for an inferred project .ts file", () => {
//         const file1: File = { path: "/file1.ts", content: 'import {} from "./file.ts";' };
//         const file2: File = {
//             path: "/file2.ts",
//             content: `interface ka {
//                 name: string;
//             }
//             `
//         };
//         const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./file1.ts", "./file.ts"] }) };

//         const host = createServerHost([file1, file2, tsconfig]);
//         const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
//         openFilesForSession([file2], session);

//         session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
//             command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
//             arguments: { file: file2.path, line: 1, offset: 14 }
//         });
//         baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for an inferred project .ts file", session);
//     });
//     it("works for suggesting a list of files, for an inferred project .js file", () => {
//         const file1: File = { path: "/file1.js", content: 'import {} from "./file.js";' };
//         const file2: File = {
//             path: "/file2.js",
//             content: `const y = p + b;`
//         };
//         const tsconfig: File = { path: "/jsconfig.json", content: JSON.stringify({ files: ["./file1.js", "./file.js"] }) };

//         const host = createServerHost([file1, file2, tsconfig]);
//         const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
//         openFilesForSession([file2], session);

//         session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
//             command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
//             arguments: { file: file2.path, line: 1, offset: 1, endLine: 1, endOffset: 16 }
//         });
//         baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for an inferred project .ts file", session);
//     });
    it("works with different .ts extensions", () => {
        const file1: File = {
            path: "/file1.ts",
            content: `interface ka {
                name: string;
            }
            `
        };
        const file2: File = { path: "/file2.tsx", content: "" };
        const file3: File = { path: "/file3.mts", content: "" };
        const file4: File = { path: "/file4.cts", content: "" };
        const file5: File = { path: "/file5.js", content: "" };
        const file6: File = { path: "/file6.d.ts", content: "" };
        const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./file1.ts", "./file2.tsx", "./file3.mts", "./file4.cts", "./file5.js", "./file6.d.ts"] }) };

        const host = createServerHost([file1, file2, file3, file4, file5, file6, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 11 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works with different extensions", session);
    });
    it("works with different extensions", () => {
        const file1: File = {
            path: "/file1.js",
            content: `const y = p + b;`
        };
        const file2: File = { path: "/file2.js", content: "" };
        const file3: File = { path: "/file3.mts", content: "" };
        const file4: File = { path: "/file4.ts", content: "" };
        const file5: File = { path: "/file5.js", content: "" };
        const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./file1.js", "./file2.js", "./file3.mts", "./file4.ts", "./file5.js"] }) };

        const host = createServerHost([file1, file2, file3, file4, file5, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 1, endLine: 1, endOffset:16 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works with different extensions", session);
    });
// Check
//     it("handles moving statement to an existing file", () => {
//         const aTs: File = { path: "/Foo/a.ts", content: "const x = 0;" };
//         const bTs: File = {
//             path: "/Foo/b.ts", content: `import ./bar;
// const a = 1;`};
//         const tsconfig: File = { path: "/Foo/tsconfig.json", content: `{ "files": ["./a.ts", "./b.ts"] }` };
//         const host = createServerHost([aTs, bTs, tsconfig]);
//         const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
//         openFilesForSession([aTs], session);

//         session.executeCommandSeq<ts.server.protocol.GetEditsForMoveToFileRefactorRequest>({
//             command: ts.server.protocol.CommandTypes.GetEditsForMoveToFileRefactor,
//             arguments: {
//                 file: aTs.path,
//                 startLine: 1,
//                 startOffset: 1,
//                 endLine: 2,
//                 endOffset: aTs.content.length,
//                 refactor: "Move to another file",
//                 action: "Move to another file",
//                 filepath: "/Foo/b.ts",
//             }
//         });
//         baselineTsserverLogs("refactors", "handles canonicalization of tsconfig path", session);
//     });
});
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
    it("works for suggesting a list of files, excluding node_modules within a project", () => {
        const file1: File = {
            path: "/project/a/file1.ts",
            content: `interface ka {
                name: string;
            }
            `
        };
        const file2: File = { path: "/project/b/file2.ts", content: "" };
        const file3: File = { path: "/project/d/e/file3.ts", content: "" };
        const file4: File = {
            path: "/project/a/file4.ts",
            content: `import { value } from "../node_modules/@types/node/someFile.d.ts";
import { value1 } from "../node_modules/.cache/someFile.d.ts";`
        };
        const nodeModulesFile1: File = {
            path: "project/node_modules/@types/node/someFile.d.ts",
            content: `export const value = 0;`
        };
        const nodeModulesFile2: File = {
            path: "project/node_modules/.cache/someFile.d.ts",
            content: `export const value1 = 0;`
        };
        const tsconfig: File = {
            path: "/project/tsconfig.json",
            content: "{}",
        };
        const host = createServerHost([file1, file2, file3, file3, file4, nodeModulesFile1, nodeModulesFile2, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 11 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, excluding node_modules within a project", session);
    });
    it("works for suggesting a list of files, for a file belonging to multiple projects", () => {
        const file1: File = {
            path: "/blah/file1.ts",
            content: `class CC { }`
        };
        const file2: File = { path: "/blah/file2.ts", content: "" };
        const configFile1: File = {
            path: "/blah/tsconfig.json",
            content: `{ "files": ["./file1.ts", "./file2.ts"] }`,
        };
        const file3: File = { path: "/blah-tests/file3.ts", content: `import { value1 } from "../blah/file1.ts";` };
        const file4: File = { path: "/blah-tests/file4.ts", content: "" };
        const configFile2: File = {
            path: "/blah-tests/tsconfig.json",
            content: `{ "files": ["./file3.ts", "./file4.ts"] }`,
        };
        const host = createServerHost([file1, file2, file3, file4, configFile1, configFile2]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file1.path, line: 1, offset: 7 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for a file belonging to multiple projects", session);
    });
    it("works for suggesting a list of files, for an inferred project for a .ts file", () => {
        const file1: File = { path: "/file1.ts", content: 'import {} from "./file.ts";' };
        const file2: File = {
            path: "/file2.ts",
            content: `interface ka {
                name: string;
            }
            `
        };
        const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./file1.ts", "./file.ts"] }) };

        const host = createServerHost([file1, file2, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file2], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file2.path, line: 1, offset: 11 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for an inferred project for a .ts file", session);
    });
    it("works for suggesting a list of files, for an inferred project for a .js file", () => {
        const file1: File = { path: "/file1.js", content: 'import {} from "./file.js";' };
        const file2: File = {
            path: "/file2.js",
            content: `class C {}`
        };
        const tsconfig: File = { path: "/jsconfig.json", content: JSON.stringify({ files: ["./file1.js", "./file.js"] }) };

        const host = createServerHost([file1, file2, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file2], session);

        session.executeCommandSeq<ts.server.protocol.GetMoveToRefactoringFileSuggestionsRequest>({
            command: ts.server.protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
            arguments: { file: file2.path, line: 1, offset: 7 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works for suggesting a list of files, for an inferred project for a .js file", session);
    });
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
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works with different .ts extensions", session);
    });
    it("works with different extensions", () => {
        const file1: File = {
            path: "/file1.js",
            content: `class C {}`
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
            arguments: { file: file1.path, line: 1, offset: 7 }
        });
        baselineTsserverLogs("getMoveToRefactoringFileSuggestions", "works with different extensions", session);
    });
});
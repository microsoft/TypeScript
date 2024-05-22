import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: regionDiagnostics", () => {
    it("diagnostics for select nodes in a single file", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: `function foo(x: number, y: string): number {
    return x + y;
}



foo(10, 50);`,
        };
        const host = createServerHost([file1]);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file1.path },
        });

        verifyGetErrRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [{ startLine: 6, startOffset: 1, endLine: 7, endOffset: 13 }],
            }],
            skip: [
                { regionSemantic: false },
            ],
        });

        baselineTsserverLogs("regionDiagnostics", "diagnostics for select nodes in a single file", session);
    });

    it("diagnostics for select nodes and whole file for multiple files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: `
function add(x: number, y: string): number {
    return x + y;
}

add(10, 50);
`,
        };
        const file2 = {
            path: "/a/b/app2.ts",
            content: `
function booleanNoop(b: boolean): void {
    b;
    return;
}

booleanNoop("not a boolean");
`,
        };
        const file3 = {
            path: "/a/b/app3.ts",
            content: `
function stringId(x: string): string {
    return x;
}

stringId("ok");

stringId(1000);
`,
        };

        const file4 = {
            path: "/a/b/app4.ts",
            content: `
function numberId(x: number): number {
    return x;
}

numberId(1000);
`,
        };

        const files = [file1, file2, file3, file4];
        const host = createServerHost(files);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: files.map(f => ({ file: f.path, fileContent: f.content })),
            },
        });

        verifyGetErrRequest({
            session,
            files: [
                {
                    file: file1.path,
                    ranges: [{ startLine: 6, startOffset: 1, endLine: 6, endOffset: 13 }], // `add(10, 50);`
                },
                file2.path,
                {
                    file: file3.path,
                    ranges: [{ startLine: 6, startOffset: 1, endLine: 6, endOffset: 16 }], // `stringId("ok");`
                },
                file4.path,
            ],
            skip: [
                { regionSemantic: false },
                undefined,
                { regionSemantic: false },
                undefined,
            ],
        });

        baselineTsserverLogs("regionDiagnostics", "diagnostics for select nodes and whole file for multiple files", session);
    });

    describe("diagnostics for select nodes when files have suggestion diagnostics", () => {
        const config = {
            path: "/tsconfig.json",
            content: `
{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
    }
}
`,
        };
        const indexFile = {
            path: "/index.ts",
            content: `
import add = require("./other.js");

add(3, "a");

add(1, 2);
`,
        };
        const otherFile = {
            path: "/other.ts",
            content: `
function add(a: number, b: number) {
    return a + b
}

export = add;
`,
        };

        it("region has suggestion diagnostics", () => {
            const files = [config, indexFile, otherFile];
            const host = createServerHost(files);
            const session = new TestSession(host);

            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{ file: indexFile.path, fileContent: indexFile.content }],
                },
            });

            verifyGetErrRequest({
                session,
                files: [
                    {
                        file: indexFile.path,
                        // `import add = require("./other.js"); add(3, "a");`
                        ranges: [{ startLine: 2, startOffset: 1, endLine: 4, endOffset: 13 }],
                    },
                ],
                skip: [
                    { regionSemantic: false },
                ],
            });

            baselineTsserverLogs("regionDiagnostics", "region has suggestion", session);
        });

        it("region does not have suggestion diagnostics", () => {
            const files = [config, indexFile, otherFile];
            const host = createServerHost(files);
            const session = new TestSession(host);

            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{ file: indexFile.path, fileContent: indexFile.content }],
                },
            });

            verifyGetErrRequest({
                session,
                files: [
                    {
                        file: indexFile.path,
                        // `add(3, "a"); add(1, 2);`
                        ranges: [{ startLine: 4, startOffset: 1, endLine: 6, endOffset: 11 }],
                    },
                ],
                skip: [
                    { regionSemantic: false },
                ],
            });

            baselineTsserverLogs("regionDiagnostics", "region does not have suggestion", session);
        });
    });
});

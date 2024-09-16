import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    protocolTextSpanToFileRange,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: regionDiagnostics::", () => {
    it("diagnostics for select nodes in a single file", () => {
        const file1 = {
            path: "/home/src/projects/project/a/b/app.ts",
            content: dedent`
                function foo(x: number, y: string): number {
                    return x + y;
                }



                foo(10, 50);`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession({ host, regionDiagLineCountThreshold: 0 });

        openFilesForSession([file1], session);

        verifyGetErrRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [protocolTextSpanToFileRange(protocolTextSpanFromSubstring(file1.content, "foo(10, 50);"))],
            }],
            skip: [
                { regionSemantic: false },
            ],
        });

        baselineTsserverLogs("regionDiagnostics", "diagnostics for select nodes in a single file", session);
    });

    it("diagnostics for select nodes and whole file for multiple files", () => {
        const file1 = {
            path: "/home/src/projects/project/a/b/app.ts",
            content: dedent`
                function add(x: number, y: string): number {
                    return x + y;
                }

                add(10, 50);`,
        };
        const file2 = {
            path: "/home/src/projects/project/a/b/app2.ts",
            content: dedent`
                function booleanNoop(b: boolean): void {
                    b;
                    return;
                }

                booleanNoop("not a boolean");`,
        };
        const file3 = {
            path: "/home/src/projects/project/a/b/app3.ts",
            content: dedent`
                function stringId(x: string): string {
                    return x;
                }

                stringId("ok");

                stringId(1000);`,
        };

        const file4 = {
            path: "/home/src/projects/project/a/b/app4.ts",
            content: dedent`
                function numberId(x: number): number {
                    return x;
                }

                numberId(1000);`,
        };

        const files = [file1, file2, file3, file4];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession({ host, regionDiagLineCountThreshold: 0 });

        openFilesForSession(files, session);

        verifyGetErrRequest({
            session,
            files: [
                {
                    file: file1.path,
                    ranges: [protocolTextSpanToFileRange(protocolTextSpanFromSubstring(file1.content, "add(10, 50);"))],
                },
                file2.path,
                {
                    file: file3.path,
                    ranges: [protocolTextSpanToFileRange(protocolTextSpanFromSubstring(file3.content, 'stringId("ok");'))],
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
            path: "/home/src/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    allowSyntheticDefaultImports: true,
                },
            }),
        };
        const indexFile = {
            path: "/home/src/projects/project/index.ts",
            content: dedent`
                import add = require("./other.js");

                add(3, "a");

                add(1, 2);`,
        };
        const otherFile = {
            path: "/home/src/projects/project/other.ts",
            content: dedent`
                function add(a: number, b: number) {
                    return a + b
                }

                export = add;`,
        };

        it("region has suggestion diagnostics", () => {
            const host = TestServerHost.createServerHost([config, indexFile, otherFile]);
            const session = new TestSession({ host, regionDiagLineCountThreshold: 0 });

            openFilesForSession([indexFile], session);

            verifyGetErrRequest({
                session,
                files: [
                    {
                        file: indexFile.path,
                        ranges: [
                            protocolTextSpanToFileRange(
                                protocolTextSpanFromSubstring(
                                    indexFile.content,
                                    'import add = require("./other.js");\n\nadd(3, "a");',
                                ),
                            ),
                        ],
                    },
                ],
                skip: [
                    { regionSemantic: false },
                ],
            });

            baselineTsserverLogs("regionDiagnostics", "region has suggestion", session);
        });

        it("region does not have suggestion diagnostics", () => {
            const host = TestServerHost.createServerHost([config, indexFile, otherFile]);
            const session = new TestSession({ host, regionDiagLineCountThreshold: 0 });

            openFilesForSession([indexFile], session);

            verifyGetErrRequest({
                session,
                files: [
                    {
                        file: indexFile.path,
                        ranges: [
                            protocolTextSpanToFileRange(
                                protocolTextSpanFromSubstring(
                                    indexFile.content,
                                    'add(3, "a");\n\nadd(1, 2);',
                                ),
                            ),
                        ],
                    },
                ],
                skip: [
                    { regionSemantic: false },
                ],
            });

            baselineTsserverLogs("regionDiagnostics", "region does not have suggestion", session);
        });
    });

    it("region diagnostics is skipped for small file", () => {
        const file1 = {
            path: "/home/src/projects/project/a/b/app.ts",
            content: dedent`
                function foo(x: number, y: string): number {
                    return x + y;
                }



                foo(10, 50);`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);

        verifyGetErrRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [protocolTextSpanToFileRange(protocolTextSpanFromSubstring(file1.content, "foo(10, 50);"))],
            }],
            skip: [
                { regionSemantic: false },
            ],
        });

        baselineTsserverLogs("regionDiagnostics", "region diagnostics is skipped for small file", session);
    });

    it("region diagnostics is skipped for @ts-nocheck file", () => {
        const file1 = {
            path: "/home/src/projects/project/a/b/app.ts",
            content: dedent`
                // @ts-nocheck
                function foo(x: number, y: string): number {
                    return x + y;
                }



                foo(10, 50);`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession({ host, regionDiagLineCountThreshold: 0 });

        openFilesForSession([file1], session);

        verifyGetErrRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [protocolTextSpanToFileRange(protocolTextSpanFromSubstring(file1.content, "foo(10, 50);"))],
            }],
            skip: [
                { regionSemantic: false },
            ],
        });

        baselineTsserverLogs("regionDiagnostics", "region diagnostics is skipped for @ts-nocheck file", session);
    });
});

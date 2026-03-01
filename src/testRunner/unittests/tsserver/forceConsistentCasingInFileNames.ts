import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { getSysForMultipleErrorsForceConsistentCasingInFileNames } from "../helpers/forceConsistentCasingInFileNames.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    protocolTextSpanFromSubstring,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: forceConsistentCasingInFileNames::", () => {
    it("works when extends is specified with a case insensitive file system", () => {
        const rootPath = "/Users/username/dev/project";
        const file1: File = {
            path: `${rootPath}/index.ts`,
            content: 'import {x} from "file2";',
        };
        const file2: File = {
            path: `${rootPath}/file2.js`,
            content: "",
        };
        const file2Dts: File = {
            path: `${rootPath}/types/file2/index.d.ts`,
            content: "export declare const x: string;",
        };
        const tsconfigAll: File = {
            path: `${rootPath}/tsconfig.all.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    baseUrl: ".",
                    paths: { file2: ["./file2.js"] },
                    typeRoots: ["./types"],
                    forceConsistentCasingInFileNames: true,
                },
            }),
        };
        const tsconfig: File = {
            path: `${rootPath}/tsconfig.json`,
            content: jsonToReadableText({ extends: "./tsconfig.all.json" }),
        };

        const host = TestServerHost.createServerHost([file1, file2, file2Dts, tsconfig, tsconfigAll], { useCaseSensitiveFileNames: false });
        const session = new TestSession(host);

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: {
                projectFileName: tsconfig.path,
            },
        });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "works when extends is specified with a case insensitive file system", session);
    });

    it("works when renaming file with different casing", () => {
        const loggerFile: File = {
            path: `/user/username/projects/myproject/Logger.ts`,
            content: `export class logger { }`,
        };
        const anotherFile: File = {
            path: `/user/username/projects/myproject/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`,
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: { forceConsistentCasingInFileNames: true },
            }),
        };

        const host = TestServerHost.createServerHost([loggerFile, anotherFile, tsconfig, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([{ file: loggerFile, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [loggerFile] });

        const newLoggerPath = loggerFile.path.toLowerCase();
        host.renameFile(loggerFile.path, newLoggerPath);
        closeFilesForSession([loggerFile], session);
        openFilesForSession([{ file: newLoggerPath, content: loggerFile.content, projectRootPath: "/user/username/projects/myproject" }], session);

        // Apply edits for rename
        openFilesForSession([{ file: anotherFile, projectRootPath: "/user/username/projects/myproject" }], session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: anotherFile.path,
                    textChanges: [{
                        newText: "./logger",
                        ...protocolTextSpanFromSubstring(
                            anotherFile.content,
                            "./Logger",
                        ),
                    }],
                }],
            },
        });

        // Check errors in both files
        verifyGetErrRequest({ session, files: [newLoggerPath, anotherFile] });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "works when renaming file with different casing", session);
    });

    it("when changing module name with different casing", () => {
        const loggerFile: File = {
            path: `/user/username/projects/myproject/Logger.ts`,
            content: `export class logger { }`,
        };
        const anotherFile: File = {
            path: `/user/username/projects/myproject/another.ts`,
            content: `import { logger } from "./Logger"; new logger();`,
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: { forceConsistentCasingInFileNames: true },
            }),
        };

        const host = TestServerHost.createServerHost([loggerFile, anotherFile, tsconfig, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([{ file: anotherFile, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [anotherFile] });

        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: anotherFile.path,
                    textChanges: [{
                        newText: "./logger",
                        ...protocolTextSpanFromSubstring(
                            anotherFile.content,
                            "./Logger",
                        ),
                    }],
                }],
            },
        });

        // Check errors in both files
        verifyGetErrRequest({ session, files: [anotherFile] });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "when changing module name with different casing", session);
    });

    describe("with symlinks", () => {
        function verifySymlink(
            subScenario: string,
            linkPath: string,
            getFiles: () => { moduleA: File; symlinkA: SymLink; moduleB: File; tsconfig: File; },
        ) {
            it(subScenario, () => {
                const { moduleA, symlinkA, moduleB, tsconfig } = getFiles();
                const host = TestServerHost.createServerHost([moduleA, symlinkA, moduleB, tsconfig]);
                const session = new TestSession(host);
                openFilesForSession([moduleB], session);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                host.prependFile(moduleA.path, `// some comment\n`);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                    existingTimeouts: true,
                });
                baselineTsserverLogs("forceConsistentCasingInFileNames", subScenario, session);
            });

            it(`${subScenario} with target open`, () => {
                const { moduleA, symlinkA, moduleB, tsconfig } = getFiles();
                const host = TestServerHost.createServerHost([moduleA, symlinkA, moduleB, tsconfig]);
                const session = new TestSession(host);
                openFilesForSession([moduleB, moduleA], session);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: moduleA.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `// some comment\n`,
                    },
                });
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                baselineTsserverLogs("forceConsistentCasingInFileNames", `${subScenario} with target open`, session);
            });

            it(`${subScenario} with link open`, () => {
                const { moduleA, symlinkA, moduleB, tsconfig } = getFiles();
                const host = TestServerHost.createServerHost([moduleA, symlinkA, moduleB, tsconfig]);
                const session = new TestSession(host);
                openFilesForSession([moduleB, linkPath], session);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                host.prependFile(moduleA.path, `// some comment\n`);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                    existingTimeouts: true,
                });
                baselineTsserverLogs("forceConsistentCasingInFileNames", `${subScenario} with link open`, session);
            });

            it(`${subScenario} with target and link open`, () => {
                const { moduleA, symlinkA, moduleB, tsconfig } = getFiles();
                const host = TestServerHost.createServerHost([moduleA, symlinkA, moduleB, tsconfig]);
                const session = new TestSession(host);
                openFilesForSession([moduleB, moduleA, linkPath], session);
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: moduleA.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `// some comment\n`,
                    },
                });
                verifyGetErrRequest({
                    session,
                    files: [moduleB],
                });
                baselineTsserverLogs("forceConsistentCasingInFileNames", `${subScenario} with target and link open`, session);
            });
        }
        function verifyFileSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
            verifySymlink(subScenario, `/user/username/projects/myproject/link.ts`, () => {
                const moduleA: File = {
                    path: diskPath,
                    content: dedent`
                        export const a = 1;
                        export const b = 2;
                    `,
                };
                const symlinkA: SymLink = {
                    path: `/user/username/projects/myproject/link.ts`,
                    symLink: targetPath,
                };
                const moduleB: File = {
                    path: `/user/username/projects/myproject/b.ts`,
                    content: dedent`
                        import { a } from "${importedPath}";
                        import { b } from "./link";
    
                        a;b;
                    `,
                };
                const tsconfig: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true } }),
                };
                return { moduleA, symlinkA, moduleB, tsconfig };
            });
        }

        verifyFileSymlink("when both file symlink target and import match disk", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/XY.ts`, `./XY`);
        verifyFileSymlink("when file symlink target matches disk but import does not", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./XY`);
        verifyFileSymlink("when import matches disk but file symlink target does not", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/XY.ts`, `./Xy`);
        verifyFileSymlink("when import and file symlink target agree but do not match disk", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./Xy`);
        verifyFileSymlink("when import, file symlink target, and disk are all different", `/user/username/projects/myproject/XY.ts`, `/user/username/projects/myproject/Xy.ts`, `./xY`);

        function verifyDirSymlink(subScenario: string, diskPath: string, targetPath: string, importedPath: string) {
            verifySymlink(subScenario, `/user/username/projects/myproject/link/a.ts`, () => {
                const moduleA: File = {
                    path: `${diskPath}/a.ts`,
                    content: dedent`
                        export const a = 1;
                        export const b = 2;
                    `,
                };
                const symlinkA: SymLink = {
                    path: `/user/username/projects/myproject/link`,
                    symLink: targetPath,
                };
                const moduleB: File = {
                    path: `/user/username/projects/myproject/b.ts`,
                    content: dedent`
                        import { a } from "${importedPath}/a";
                        import { b } from "./link/a";
    
                        a;b;
                    `,
                };
                const tsconfig: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    // Use outFile because otherwise the real and linked files will have the same output path
                    content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true, outFile: "out.js", module: "system" } }),
                };
                return { moduleA, symlinkA, moduleB, tsconfig };
            });
        }

        verifyDirSymlink("when both directory symlink target and import match disk", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/XY`, `./XY`);
        verifyDirSymlink("when directory symlink target matches disk but import does not", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./XY`);
        verifyDirSymlink("when import matches disk but directory symlink target does not", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/XY`, `./Xy`);
        verifyDirSymlink("when import and directory symlink target agree but do not match disk", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./Xy`);
        verifyDirSymlink("when import, directory symlink target, and disk are all different", `/user/username/projects/myproject/XY`, `/user/username/projects/myproject/Xy`, `./xY`);
    });

    it("when file is included from multiple places with different casing", () => {
        const host = getSysForMultipleErrorsForceConsistentCasingInFileNames(/*forTsserver*/ true);
        const session = new TestSession(host);
        const file = "/home/src/projects/project/src/struct.d.ts";
        let fileText = host.readFile(file)!;
        openFilesForSession([{ file, projectRootPath: "/home/src/projects/project" }], session);
        verifyGetErrRequest({ session, files: [file] });

        // Update file without import but dont get errors:
        updateFile(fileText + "\nexport const y = 10;");
        goToDef();

        // Update file without import and get errors:
        updateFile(fileText + "\nexport const yy = 10;");
        verifyGetErrRequest({ session, files: [file] });

        // Remove one import, dont get errors
        updateFile(dedent`
            import * as xs1 from "fp-ts/lib/Struct";
            import * as xs2 from "fp-ts/lib/struct";
            import * as xs3 from "./Struct";
        `);
        goToDef();

        // Remove import, get errors
        updateFile(dedent`
            import * as xs1 from "fp-ts/lib/Struct";
            import * as xs3 from "./struct";
        `);
        verifyGetErrRequest({ session, files: [file] });
        baselineTsserverLogs("forceConsistentCasingInFileNames", "when file is included from multiple places with different casing", session);

        function updateFile(newText: string) {
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: file,
                        textChanges: [{
                            newText,
                            ...protocolTextSpanFromSubstring(
                                fileText,
                                fileText,
                            ),
                        }],
                    }],
                },
            });
            fileText = newText;
        }

        function goToDef() {
            session.executeCommandSeq<ts.server.protocol.DefinitionRequest>({
                command: ts.server.protocol.CommandTypes.Definition,
                arguments: protocolFileLocationFromSubstring({ path: file, content: fileText }, `"fp-ts/lib/Struct"`),
            });
        }
    });
});

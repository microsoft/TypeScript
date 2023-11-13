import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    verifyDynamic,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

function verifyPathRecognizedAsDynamic(subscenario: string, path: string) {
    it(subscenario, () => {
        const file: File = {
            path,
            content: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />
/// <reference path="../../../../../../typings/@epic/Shell.d.ts" />
var x = 10;`,
        };
        const host = createServerHost([libFile]);
        const session = new TestSession(host);
        openFilesForSession([{ file, content: file.content }], session);
        verifyDynamic(session, session.getProjectService().toPath(file.path));

        baselineTsserverLogs("dynamicFiles", subscenario, session);
    });
}

describe("unittests:: tsserver:: dynamicFiles:: Untitled files", () => {
    const untitledFile = "untitled:^Untitled-1";
    it("Can convert positions to locations", () => {
        const aTs: File = { path: "/proj/a.ts", content: "" };
        const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
        const host = createServerHost([aTs, tsconfig]);
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });

        openFilesForSession([aTs], session);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: untitledFile,
                fileContent: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />\nlet foo = 1;\nfooo/**/`,
                scriptKindName: "TS",
                projectRootPath: "/proj",
            },
        });
        verifyDynamic(session, `/proj/untitled:^untitled-1`);
        session.executeCommandSeq<ts.server.protocol.CodeFixRequest>({
            command: ts.server.protocol.CommandTypes.GetCodeFixes,
            arguments: {
                file: untitledFile,
                startLine: 3,
                startOffset: 1,
                endLine: 3,
                endOffset: 5,
                errorCodes: [ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
            },
        });
        baselineTsserverLogs("dynamicFiles", "untitled can convert positions to locations", session);
    });

    it("opening untitled files", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const host = createServerHost([config, libFile], { useCaseSensitiveFileNames: true, currentDirectory: "/user/username/projects/myproject" });
        const session = new TestSession(host);
        openFilesForSession([{
            file: untitledFile,
            content: "const x = 10;",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        verifyDynamic(session, `/user/username/projects/myproject/${untitledFile}`);

        const untitled: File = {
            path: `/user/username/projects/myproject/Untitled-1.ts`,
            content: "const x = 10;",
        };
        host.writeFile(untitled.path, untitled.content);
        openFilesForSession([{
            file: untitled.path,
            content: untitled.content,
            projectRootPath: "/user/username/projects/myproject",
        }], session);

        closeFilesForSession([untitledFile], session);

        openFilesForSession([{
            file: untitledFile,
            content: "const x = 10;",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        verifyDynamic(session, `/user/username/projects/myproject/${untitledFile}`);
        baselineTsserverLogs("dynamicFiles", "opening untitled files", session);
    });

    it("opening and closing untitled files when projectRootPath is different from currentDirectory", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const y = 10",
        };
        const host = createServerHost([config, file, libFile], { useCaseSensitiveFileNames: true });
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
        openFilesForSession([{
            file: untitledFile,
            content: "const x = 10;",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        verifyDynamic(session, `/user/username/projects/myproject/${untitledFile}`);

        // Close untitled file
        closeFilesForSession([untitledFile], session);

        // Open file from configured project which should collect inferredProject
        openFilesForSession([file], session);
        baselineTsserverLogs("dynamicFiles", "opening and closing untitled files when projectRootPath is different from currentDirectory", session);
    });

    it("when changing scriptKind of the untitled files", () => {
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
        openFilesForSession([{
            file: untitledFile,
            content: "const x = 10;",
            scriptKindName: "TS",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        const program = session.getProjectService().inferredProjects[0].getCurrentProgram()!;
        const sourceFile = program.getSourceFile(untitledFile)!;

        // Close untitled file
        closeFilesForSession([untitledFile], session);

        // Open untitled file with different mode
        openFilesForSession([{
            file: untitledFile,
            content: "const x = 10;",
            scriptKindName: "TSX",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        const newProgram = session.getProjectService().inferredProjects[0].getCurrentProgram()!;
        const newSourceFile = newProgram.getSourceFile(untitledFile)!;
        assert.notStrictEqual(newProgram, program);
        assert.notStrictEqual(newSourceFile, sourceFile);
        baselineTsserverLogs("dynamicFiles", "when changing scriptKind of the untitled files", session);
    });
});

describe("unittests:: tsserver:: dynamicFiles:: ", () => {
    it("dynamic file without external project", () => {
        const file: File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;",
        };
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        setCompilerOptionsForInferredProjectsRequestForSession({
            module: ts.server.protocol.ModuleKind.CommonJS,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true,
        }, session);
        openFilesForSession([{ file: file.path, content: "var x = 10;" }], session);

        verifyDynamic(session, `/${file.path}`);

        session.executeCommandSeq<ts.server.protocol.QuickInfoRequest>({
            command: ts.server.protocol.CommandTypes.Quickinfo,
            arguments: protocolFileLocationFromSubstring(file, "x"),
        });
        baselineTsserverLogs("dynamicFiles", "dynamic file without external project", session);
    });

    verifyPathRecognizedAsDynamic("dynamic file with reference paths without external project", "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js");

    describe("dynamic file with projectRootPath", () => {
        const file: File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;",
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const configProjectFile: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: "let y = 10;",
        };
        it("with useInferredProjectPerProjectRoot", () => {
            const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
            openFilesForSession([{ file: file.path, projectRootPath: "/user/username/projects/myproject" }], session);

            verifyDynamic(session, `/user/username/projects/myproject/${file.path}`);

            session.executeCommandSeq<ts.server.protocol.OutliningSpansRequest>({
                command: ts.server.protocol.CommandTypes.GetOutliningSpans,
                arguments: {
                    file: file.path,
                },
            });

            // Without project root
            const file2Path = file.path.replace("#1", "#2");
            openFilesForSession([{ file: file2Path, content: file.content }], session);
            baselineTsserverLogs("dynamicFiles", "dynamic file with projectRootPath with useInferredProjectPerProjectRoot", session);
        });

        it("fails when useInferredProjectPerProjectRoot is false", () => {
            const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const session = new TestSession(host);
            try {
                openFilesForSession([{
                    file,
                    content: file.content,
                    projectRootPath: "/user/username/projects/myproject",
                }], session);
            }
            catch (e) {
                assert.strictEqual(
                    e.message.replace(/\r?\n/, "\n"),
                    `Debug Failure. False expression.\nVerbose Debug Information: {"fileName":"^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js","currentDirectory":"/user/username/projects/myproject","hostCurrentDirectory":"/","openKeys":[]}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`,
                );
            }
            const file2Path = file.path.replace("#1", "#2");
            openFilesForSession([{ file: file2Path, content: file.content }], session);
            baselineTsserverLogs("dynamicFiles", "dynamic file with projectRootPath fails when useInferredProjectPerProjectRoot is false", session);
        });
    });

    describe("verify accepts known schemas as dynamic file", () => {
        verifyPathRecognizedAsDynamic("walkThroughSnippet", "walkThroughSnippet:/usr/share/code/resources/app/out/vs/workbench/contrib/welcome/walkThrough/browser/editor/^vs_code_editor_walkthrough.md#1.ts");
        verifyPathRecognizedAsDynamic("untitled", "untitled:/Users/matb/projects/san/^newFile.ts");
    });
});

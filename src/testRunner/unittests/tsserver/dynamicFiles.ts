import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createProjectService,
    createSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    setCompilerOptionsForInferredProjectsRequestForSession,
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
var x = 10;`
        };
        const host = createServerHost([libFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(file.path, file.content);
        verifyDynamic(projectService, projectService.toPath(file.path));

        baselineTsserverLogs("dynamicFiles", subscenario, projectService);
    });
}

describe("unittests:: tsserver:: dynamicFiles:: Untitled files", () => {
    const untitledFile = "untitled:^Untitled-1";
    it("Can convert positions to locations", () => {
        const aTs: File = { path: "/proj/a.ts", content: "" };
        const tsconfig: File = { path: "/proj/tsconfig.json", content: "{}" };
        const host = createServerHost([aTs, tsconfig]);
        const session = createSession(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });

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
        verifyDynamic(session.getProjectService(), `/proj/untitled:^untitled-1`);
        session.executeCommandSeq<ts.server.protocol.CodeFixRequest>({
            command: ts.server.protocol.CommandTypes.GetCodeFixes,
            arguments: {
                file: untitledFile,
                startLine: 3,
                startOffset: 1,
                endLine: 3,
                endOffset: 5,
                errorCodes: [ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
            }
        });
        baselineTsserverLogs("dynamicFiles", "untitled can convert positions to locations", session);
    });

    it("opening untitled files", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const host = createServerHost([config, libFile], { useCaseSensitiveFileNames: true, currentDirectory: "/user/username/projects/myproject" });
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);

        const untitled: File = {
            path: `/user/username/projects/myproject/Untitled-1.ts`,
            content: "const x = 10;"
        };
        host.writeFile(untitled.path, untitled.content);
        service.testhost.logTimeoutQueueLength();
        service.openClientFile(untitled.path, untitled.content, /*scriptKind*/ undefined, "/user/username/projects/myproject");

        service.closeClientFile(untitledFile);

        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);
        baselineTsserverLogs("dynamicFiles", "opening untitled files", service);
    });

    it("opening and closing untitled files when projectRootPath is different from currentDirectory", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const y = 10"
        };
        const host = createServerHost([config, file, libFile], { useCaseSensitiveFileNames: true });
        const service = createProjectService(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open file from configured project which should collect inferredProject
        service.openClientFile(file.path);
        baselineTsserverLogs("dynamicFiles", "opening and closing untitled files when projectRootPath is different from currentDirectory", service);
    });

    it("when changing scriptKind of the untitled files", () => {
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const service = createProjectService(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TS, "/user/username/projects/myproject");
        const program = service.inferredProjects[0].getCurrentProgram()!;
        const sourceFile = program.getSourceFile(untitledFile)!;

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open untitled file with different mode
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TSX, "/user/username/projects/myproject");
        const newProgram = service.inferredProjects[0].getCurrentProgram()!;
        const newSourceFile = newProgram.getSourceFile(untitledFile)!;
        assert.notStrictEqual(newProgram, program);
        assert.notStrictEqual(newSourceFile, sourceFile);
        baselineTsserverLogs("dynamicFiles", "when changing scriptKind of the untitled files", service);
    });
});

describe("unittests:: tsserver:: dynamicFiles:: ", () => {
    it("dynamic file without external project", () => {
        const file: File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;"
        };
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        setCompilerOptionsForInferredProjectsRequestForSession({
            module: ts.ModuleKind.CommonJS,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true
        }, session);
        openFilesForSession([{ file: file.path, content: "var x = 10;" }], session);

        verifyDynamic(session.getProjectService(), `/${file.path}`);

        session.executeCommandSeq<ts.server.protocol.QuickInfoRequest>({
            command: ts.server.protocol.CommandTypes.Quickinfo,
            arguments: protocolFileLocationFromSubstring(file, "x")
        });
        baselineTsserverLogs("dynamicFiles", "dynamic file without external project", session);
    });

    verifyPathRecognizedAsDynamic("dynamic file with reference paths without external project", "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js");

    describe("dynamic file with projectRootPath", () => {
        const file: File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;"
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const configProjectFile: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: "let y = 10;"
        };
        it("with useInferredProjectPerProjectRoot", () => {
            const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const session = createSession(host, { useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([{ file: file.path, projectRootPath: "/user/username/projects/myproject" }], session);

            const projectService = session.getProjectService();
            verifyDynamic(projectService, `/user/username/projects/myproject/${file.path}`);

            session.executeCommandSeq<ts.server.protocol.OutliningSpansRequest>({
                command: ts.server.protocol.CommandTypes.GetOutliningSpans,
                arguments: {
                    file: file.path
                }
            });

            // Without project root
            const file2Path = file.path.replace("#1", "#2");
            openFilesForSession([{ file: file2Path, content: file.content }], session);
            baselineTsserverLogs("dynamicFiles", "dynamic file with projectRootPath with useInferredProjectPerProjectRoot", session);
        });

        it("fails when useInferredProjectPerProjectRoot is false", () => {
            const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            try {
                projectService.openClientFile(file.path, file.content, /*scriptKind*/ undefined, "/user/username/projects/myproject");
            }
            catch (e) {
                assert.strictEqual(
                    e.message.replace(/\r?\n/, "\n"),
                    `Debug Failure. False expression.\nVerbose Debug Information: {"fileName":"^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js","currentDirectory":"/user/username/projects/myproject","hostCurrentDirectory":"/","openKeys":[]}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`
                );
            }
            const file2Path = file.path.replace("#1", "#2");
            projectService.openClientFile(file2Path, file.content);
            baselineTsserverLogs("dynamicFiles", "dynamic file with projectRootPath fails when useInferredProjectPerProjectRoot is false", projectService);
        });
    });

    describe("verify accepts known schemas as dynamic file", () => {
        verifyPathRecognizedAsDynamic("walkThroughSnippet", "walkThroughSnippet:/usr/share/code/resources/app/out/vs/workbench/contrib/welcome/walkThrough/browser/editor/^vs_code_editor_walkthrough.md#1.ts");
        verifyPathRecognizedAsDynamic("untitled", "untitled:/Users/matb/projects/san/^newFile.ts");
    });
});

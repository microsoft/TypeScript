import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    checkNumberOfProjects,
    checkProjectActualFiles,
    checkProjectRootFiles,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    openFilesForSession,
    verifyDynamic,
} from "./helpers";

function verifyPathRecognizedAsDynamic(path: string) {
    const file: File = {
        path,
        content: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />
/// <reference path="../../../../../../typings/@epic/Shell.d.ts" />
var x = 10;`
    };
    const host = createServerHost([libFile]);
    const projectService = createProjectService(host);
    projectService.openClientFile(file.path, file.content);
    verifyDynamic(projectService, projectService.toPath(file.path));

    projectService.checkNumberOfProjects({ inferredProjects: 1 });
    const project = projectService.inferredProjects[0];
    checkProjectRootFiles(project, [file.path]);
    checkProjectActualFiles(project, [file.path, libFile.path]);
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
        const service = createProjectService(host);
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        checkNumberOfProjects(service, { inferredProjects: 1 });
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);

        const untitled: File = {
            path: `/user/username/projects/myproject/Untitled-1.ts`,
            content: "const x = 10;"
        };
        host.writeFile(untitled.path, untitled.content);
        host.checkTimeoutQueueLength(0);
        service.openClientFile(untitled.path, untitled.content, /*scriptKind*/ undefined, "/user/username/projects/myproject");
        checkNumberOfProjects(service, { configuredProjects: 1, inferredProjects: 1 });
        checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);

        service.closeClientFile(untitledFile);
        checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);

        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);
        checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, libFile.path, config.path]);
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
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
        const service = createProjectService(host, { useInferredProjectPerProjectRoot: true });
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, "/user/username/projects/myproject");
        checkNumberOfProjects(service, { inferredProjects: 1 });
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
        verifyDynamic(service, `/user/username/projects/myproject/${untitledFile}`);

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open file from configured project which should collect inferredProject
        service.openClientFile(file.path);
        checkNumberOfProjects(service, { configuredProjects: 1 });
    });

    it("when changing scriptKind of the untitled files", () => {
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const service = createProjectService(host, { useInferredProjectPerProjectRoot: true });
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TS, "/user/username/projects/myproject");
        checkNumberOfProjects(service, { inferredProjects: 1 });
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
        const program = service.inferredProjects[0].getCurrentProgram()!;
        const sourceFile = program.getSourceFile(untitledFile)!;

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open untitled file with different mode
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TSX, "/user/username/projects/myproject");
        checkNumberOfProjects(service, { inferredProjects: 1 });
        checkProjectActualFiles(service.inferredProjects[0], [untitledFile, libFile.path]);
        const newProgram = service.inferredProjects[0].getCurrentProgram()!;
        const newSourceFile = newProgram.getSourceFile(untitledFile)!;
        assert.notStrictEqual(newProgram, program);
        assert.notStrictEqual(newSourceFile, sourceFile);
    });
});

describe("unittests:: tsserver:: dynamicFiles:: ", () => {
    it("dynamic file without external project", () => {
        const file: File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;"
        };
        const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
        const projectService = createProjectService(host);
        projectService.setCompilerOptionsForInferredProjects({
            module: ts.ModuleKind.CommonJS,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true
        });
        projectService.openClientFile(file.path, "var x = 10;");

        projectService.checkNumberOfProjects({ inferredProjects: 1 });
        const project = projectService.inferredProjects[0];
        checkProjectRootFiles(project, [file.path]);
        checkProjectActualFiles(project, [file.path, libFile.path]);
        verifyDynamic(projectService, `/${file.path}`);

        assert.strictEqual(projectService.ensureDefaultProjectForFile(ts.server.toNormalizedPath(file.path)), project);
        const indexOfX = file.content.indexOf("x");
        assert.deepEqual(project.getLanguageService(/*ensureSynchronized*/ true).getQuickInfoAtPosition(file.path, indexOfX), {
            kind: ts.ScriptElementKind.variableElement,
            kindModifiers: "",
            textSpan: { start: indexOfX, length: 1 },
            displayParts: [
                { text: "var", kind: "keyword" },
                { text: " ", kind: "space" },
                { text: "x", kind: "localName" },
                { text: ":", kind: "punctuation" },
                { text: " ", kind: "space" },
                { text: "number", kind: "keyword" }
            ],
            documentation: [],
            tags: undefined,
        });
    });

    it("dynamic file with reference paths without external project", () => {
        verifyPathRecognizedAsDynamic("^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js");
    });

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
            const session = createSession(host, { useInferredProjectPerProjectRoot: true });
            openFilesForSession([{ file: file.path, projectRootPath: "/user/username/projects/myproject" }], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file.path, libFile.path]);
            verifyDynamic(projectService, `/user/username/projects/myproject/${file.path}`);

            session.executeCommandSeq<ts.server.protocol.OutliningSpansRequest>({
                command: ts.server.protocol.CommandTypes.GetOutliningSpans,
                arguments: {
                    file: file.path
                }
            });

            // Without project root
            const file2Path = file.path.replace("#1", "#2");
            projectService.openClientFile(file2Path, file.content);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file.path, libFile.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file2Path, libFile.path]);
        });

        it("fails when useInferredProjectPerProjectRoot is false", () => {
            const host = createServerHost([libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
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
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2Path, libFile.path]);
        });
    });

    describe("verify accepts known schemas as dynamic file", () => {
        it("walkThroughSnippet", () => {
            verifyPathRecognizedAsDynamic("walkThroughSnippet:/usr/share/code/resources/app/out/vs/workbench/contrib/welcome/walkThrough/browser/editor/^vs_code_editor_walkthrough.md#1.ts");
        });

        it("untitled", () => {
            verifyPathRecognizedAsDynamic("untitled:/Users/matb/projects/san/^newFile.ts");
        });
    });
});

import * as ts from "../../_namespaces/ts";
import { verifyDynamic } from "./helpers";

function verifyPathRecognizedAsDynamic(path: string) {
    const file: ts.projectSystem.File = {
        path,
        content: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />
/// <reference path="../../../../../../typings/@epic/Shell.d.ts" />
var x = 10;`
    };
    const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile]);
    const projectService = ts.projectSystem.createProjectService(host);
    projectService.openClientFile(file.path, file.content);
    verifyDynamic(projectService, projectService.toPath(file.path));

    projectService.checkNumberOfProjects({ inferredProjects: 1 });
    const project = projectService.inferredProjects[0];
    ts.projectSystem.checkProjectRootFiles(project, [file.path]);
    ts.projectSystem.checkProjectActualFiles(project, [file.path, ts.projectSystem.libFile.path]);
}

describe("unittests:: tsserver:: dynamicFiles:: Untitled files", () => {
    const untitledFile = "untitled:^Untitled-1";
    it("Can convert positions to locations", () => {
        const aTs: ts.projectSystem.File = { path: "/proj/a.ts", content: "" };
        const tsconfig: ts.projectSystem.File = { path: "/proj/tsconfig.json", content: "{}" };
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, tsconfig]), { useInferredProjectPerProjectRoot: true });

        ts.projectSystem.openFilesForSession([aTs], session);

        ts.projectSystem.executeSessionRequestNoResponse<ts.projectSystem.protocol.OpenRequest>(session, ts.projectSystem.protocol.CommandTypes.Open, {
            file: untitledFile,
            fileContent: `/// <reference path="../../../../../../typings/@epic/Core.d.ts" />\nlet foo = 1;\nfooo/**/`,
            scriptKindName: "TS",
            projectRootPath: "/proj",
        });
        verifyDynamic(session.getProjectService(), `/proj/untitled:^untitled-1`);
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.CodeFixRequest, ts.projectSystem.protocol.CodeFixResponse>(session, ts.projectSystem.protocol.CommandTypes.GetCodeFixes, {
            file: untitledFile,
            startLine: 3,
            startOffset: 1,
            endLine: 3,
            endOffset: 5,
            errorCodes: [ts.Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
        });
        assert.deepEqual<readonly ts.projectSystem.protocol.CodeFixAction[] | undefined>(response, [
            {
                description: "Change spelling to 'foo'",
                fixName: "spelling",
                changes: [{
                    fileName: untitledFile,
                    textChanges: [{
                        start: { line: 3, offset: 1 },
                        end: { line: 3, offset: 5 },
                        newText: "foo",
                    }],
                }],
                commands: undefined,
                fixId: undefined,
                fixAllDescription: undefined
            },
        ]);
    });

    it("opening untitled files", () => {
        const config: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([config, ts.projectSystem.libFile], { useCaseSensitiveFileNames: true, currentDirectory: ts.tscWatch.projectRoot });
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);
        verifyDynamic(service, `${ts.tscWatch.projectRoot}/${untitledFile}`);

        const untitled: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/Untitled-1.ts`,
            content: "const x = 10;"
        };
        host.writeFile(untitled.path, untitled.content);
        host.checkTimeoutQueueLength(0);
        service.openClientFile(untitled.path, untitled.content, /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1, inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, ts.projectSystem.libFile.path, config.path]);
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);

        service.closeClientFile(untitledFile);
        ts.projectSystem.checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, ts.projectSystem.libFile.path, config.path]);
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);

        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
        verifyDynamic(service, `${ts.tscWatch.projectRoot}/${untitledFile}`);
        ts.projectSystem.checkProjectActualFiles(service.configuredProjects.get(config.path)!, [untitled.path, ts.projectSystem.libFile.path, config.path]);
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);
    });

    it("opening and closing untitled files when projectRootPath is different from currentDirectory", () => {
        const config: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const file: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/file.ts`,
            content: "const y = 10"
        };
        const host = ts.projectSystem.createServerHost([config, file, ts.projectSystem.libFile], { useCaseSensitiveFileNames: true });
        const service = ts.projectSystem.createProjectService(host, { useInferredProjectPerProjectRoot: true });
        service.openClientFile(untitledFile, "const x = 10;", /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);
        verifyDynamic(service, `${ts.tscWatch.projectRoot}/${untitledFile}`);

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open file from configured project which should collect inferredProject
        service.openClientFile(file.path);
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
    });

    it("when changing scriptKind of the untitled files", () => {
        const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile], { useCaseSensitiveFileNames: true });
        const service = ts.projectSystem.createProjectService(host, { useInferredProjectPerProjectRoot: true });
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TS, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);
        const program = service.inferredProjects[0].getCurrentProgram()!;
        const sourceFile = program.getSourceFile(untitledFile)!;

        // Close untitled file
        service.closeClientFile(untitledFile);

        // Open untitled file with different mode
        service.openClientFile(untitledFile, "const x = 10;", ts.ScriptKind.TSX, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [untitledFile, ts.projectSystem.libFile.path]);
        const newProgram = service.inferredProjects[0].getCurrentProgram()!;
        const newSourceFile = newProgram.getSourceFile(untitledFile)!;
        assert.notStrictEqual(newProgram, program);
        assert.notStrictEqual(newSourceFile, sourceFile);
    });
});

describe("unittests:: tsserver:: dynamicFiles:: ", () => {
    it("dynamic file without external project", () => {
        const file: ts.projectSystem.File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;"
        };
        const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile], { useCaseSensitiveFileNames: true });
        const projectService = ts.projectSystem.createProjectService(host);
        projectService.setCompilerOptionsForInferredProjects({
            module: ts.ModuleKind.CommonJS,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true
        });
        projectService.openClientFile(file.path, "var x = 10;");

        projectService.checkNumberOfProjects({ inferredProjects: 1 });
        const project = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectRootFiles(project, [file.path]);
        ts.projectSystem.checkProjectActualFiles(project, [file.path, ts.projectSystem.libFile.path]);
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
        const file: ts.projectSystem.File = {
            path: "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
            content: "var x = 10;"
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const configProjectFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: "let y = 10;"
        };
        it("with useInferredProjectPerProjectRoot", () => {
            const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const session = ts.projectSystem.createSession(host, { useInferredProjectPerProjectRoot: true });
            ts.projectSystem.openFilesForSession([{ file: file.path, projectRootPath: ts.tscWatch.projectRoot }], session);

            const projectService = session.getProjectService();
            ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
            ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [file.path, ts.projectSystem.libFile.path]);
            verifyDynamic(projectService, `${ts.tscWatch.projectRoot}/${file.path}`);

            session.executeCommandSeq<ts.projectSystem.protocol.OutliningSpansRequest>({
                command: ts.projectSystem.protocol.CommandTypes.GetOutliningSpans,
                arguments: {
                    file: file.path
                }
            });

            // Without project root
            const file2Path = file.path.replace("#1", "#2");
            projectService.openClientFile(file2Path, file.content);
            ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 2 });
            ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [file.path, ts.projectSystem.libFile.path]);
            ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[1], [file2Path, ts.projectSystem.libFile.path]);
        });

        it("fails when useInferredProjectPerProjectRoot is false", () => {
            const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, configFile, configProjectFile], { useCaseSensitiveFileNames: true });
            const projectService = ts.projectSystem.createProjectService(host);
            try {
                projectService.openClientFile(file.path, file.content, /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
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
            ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [file2Path, ts.projectSystem.libFile.path]);
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

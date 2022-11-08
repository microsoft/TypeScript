import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: Semantic operations on partialSemanticServer", () => {
    function setup() {
        const file1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }`
        };
        const file2: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/b.ts`,
            content: `export { cc } from "./c";
import { something } from "something";
                export const y = 10;`
        };
        const file3: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/c.ts`,
            content: `export const cc = 10;`
        };
        const something: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts`,
            content: "export const something = 10;"
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, file2, file3, something, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, {
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        return { host, session, file1, file2, file3, something, configFile };
    }

    it("open files are added to inferred project even if config file is present and semantic operations succeed", () => {
        const { session, file1, file2 } = setup();
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        const project = service.inferredProjects[0];
        verifyCompletions();

        ts.projectSystem.openFilesForSession([file2], session);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path]);
        verifyCompletions();

        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "files are added to inferred project", session);

        function verifyCompletions() {
            session.executeCommandSeq<ts.projectSystem.protocol.CompletionsRequest>({
                command: ts.projectSystem.protocol.CommandTypes.Completions,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(file1, "prop", { index: 1 })
            });
        }
    });

    it("throws on unsupported commands", () => {
        const { session, file1 } = setup();
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        const request: ts.projectSystem.protocol.SemanticDiagnosticsSyncRequest = {
            type: "request",
            seq: 1,
            command: ts.projectSystem.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path }
        };
        try {
            session.executeCommand(request);
        }
        catch (e) {
            session.logger.info(e.message);
        }

        const project = service.inferredProjects[0];
        try {
            project.getLanguageService().getSemanticDiagnostics(file1.path);
        }
        catch (e) {
            session.logger.info(e.message);
        }
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "throws unsupported commands", session);
    });

    it("allows syntactic diagnostic commands", () => {
        const file1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `if (a < (b + c) { }`
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: `{}`
        };
        const expectedErrorMessage = "')' expected.";

        const host = ts.projectSystem.createServerHost([file1, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, {
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host)
        });

        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        const request: ts.projectSystem.protocol.SyntacticDiagnosticsSyncRequest = {
            type: "request",
            seq: 1,
            command: ts.projectSystem.protocol.CommandTypes.SyntacticDiagnosticsSync,
            arguments: { file: file1.path }
        };
        const response = session.executeCommandSeq(request).response as ts.projectSystem.protocol.SyntacticDiagnosticsSyncResponse["body"];
        assert.isDefined(response);
        assert.equal(response!.length, 1);
        assert.equal((response![0] as ts.projectSystem.protocol.Diagnostic).text, expectedErrorMessage);

        const project = service.inferredProjects[0];
        const diagnostics = project.getLanguageService().getSyntacticDiagnostics(file1.path);
        assert.isTrue(diagnostics.length === 1);
        assert.equal(diagnostics[0].messageText, expectedErrorMessage);

        ts.projectSystem.verifyGetErrRequest({ session, host, files: [file1], skip: [{ semantic: true, suggestion: true }] });
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "syntactic diagnostics are returned with no error", session);
    });

    it("should not include auto type reference directives", () => {
        const { host, session, file1 } = setup();
        const atTypes: ts.projectSystem.File = {
            path: `/node_modules/@types/somemodule/index.d.ts`,
            content: "export const something = 10;"
        };
        host.ensureFileOrFolder(atTypes);
        ts.projectSystem.openFilesForSession([file1], session);
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "should not include auto type reference directives", session);
    });

    it("should not include referenced files from unopened files", () => {
        const file1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `///<reference path="b.ts"/>
///<reference path="${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooA() { }`
        };
        const file2: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/b.ts`,
            content: `///<reference path="./c.ts"/>
///<reference path="${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooB() { }`
        };
        const file3: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/c.ts`,
            content: `function fooC() { }`
        };
        const something: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts`,
            content: "function something() {}"
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, file2, file3, something, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, {
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        ts.projectSystem.openFilesForSession([file1], session);
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "should not include referenced files from unopened files", session);
    });

    it("should not crash when external module name resolution is reused", () => {
        const { session, file1, file2, file3 } = setup();
        ts.projectSystem.openFilesForSession([file1], session);

        // Close the file that contains non relative external module name and open some file that doesnt have non relative external module import
        ts.projectSystem.closeFilesForSession([file1], session);
        ts.projectSystem.openFilesForSession([file3], session);

        // Open file with non relative external module name
        ts.projectSystem.openFilesForSession([file2], session);
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "should not crash when external module name resolution is reused", session);
    });

    it("should not create autoImportProvider or handle package jsons", () => {
        const angularFormsDts: ts.projectSystem.File = {
            path: "/node_modules/@angular/forms/forms.d.ts",
            content: "export declare class PatternValidator {}",
        };
        const angularFormsPackageJson: ts.projectSystem.File = {
            path: "/node_modules/@angular/forms/package.json",
            content: `{ "name": "@angular/forms", "typings": "./forms.d.ts" }`,
        };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: `{ "compilerOptions": { "module": "commonjs" } }`,
        };
        const packageJson: ts.projectSystem.File = {
            path: "/package.json",
            content: `{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }`
        };
        const indexTs: ts.projectSystem.File = {
            path: "/index.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs, ts.projectSystem.libFile]);
        const session = ts.projectSystem.createSession(host, { serverMode: ts.LanguageServiceMode.PartialSemantic, useSingleInferredProject: true });
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([indexTs], session);
        const project = service.inferredProjects[0];
        assert.isFalse(project.autoImportProviderHost);
        assert.isUndefined(project.getPackageJsonAutoImportProvider());
        assert.deepEqual(project.getPackageJsonsForAutoImport(), ts.emptyArray);
    });

    it("should support go-to-definition on module specifiers", () => {
        const { session, file1 } = setup();
        ts.projectSystem.openFilesForSession([file1], session);
        session.executeCommandSeq<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest>({
            command: ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan,
            arguments: ts.projectSystem.protocolFileLocationFromSubstring(file1, `"./b"`)
        });
        ts.projectSystem.baselineTsserverLogs("partialSemanticServer", "should support go-to-definition on module specifiers", session);
    });
});

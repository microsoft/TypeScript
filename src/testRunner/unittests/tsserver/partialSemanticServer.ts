import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: Semantic operations on partialSemanticServer", () => {
    function setup() {
        const file1: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }`,
        };
        const file2: File = {
            path: `/user/username/projects/myproject/b.ts`,
            content: `export { cc } from "./c";
import { something } from "something";
                export const y = 10;`,
        };
        const file3: File = {
            path: `/user/username/projects/myproject/c.ts`,
            content: `export const cc = 10;`,
        };
        const something: File = {
            path: `/user/username/projects/myproject/node_modules/something/index.d.ts`,
            content: "export const something = 10;",
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const host = createServerHost([file1, file2, file3, something, libFile, configFile]);
        const session = new TestSession({
            host,
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
        });
        return { host, session, file1, file2, file3, something, configFile };
    }

    it("open files are added to inferred project even if config file is present and semantic operations succeed", () => {
        const { session, file1, file2 } = setup();
        openFilesForSession([file1], session);
        verifyCompletions();

        openFilesForSession([file2], session);
        verifyCompletions();

        baselineTsserverLogs("partialSemanticServer", "files are added to inferred project", session);

        function verifyCompletions() {
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.Completions,
                arguments: protocolFileLocationFromSubstring(file1, "prop", { index: 1 }),
            });
        }
    });

    it("throws on unsupported commands", () => {
        const { session, file1 } = setup();
        const service = session.getProjectService();
        openFilesForSession([file1], session);
        try {
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: { file: file1.path },
            });
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
        baselineTsserverLogs("partialSemanticServer", "throws unsupported commands", session);
    });

    it("allows syntactic diagnostic commands", () => {
        const file1: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `if (a < (b + c) { }`,
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: `{}`,
        };
        const expectedErrorMessage = "')' expected.";

        const host = createServerHost([file1, libFile, configFile]);
        const session = new TestSession({
            host,
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
        });

        const service = session.getProjectService();
        openFilesForSession([file1], session);
        const request: ts.server.protocol.SyntacticDiagnosticsSyncRequest = {
            type: "request",
            seq: 1,
            command: ts.server.protocol.CommandTypes.SyntacticDiagnosticsSync,
            arguments: { file: file1.path },
        };
        const response = session.executeCommandSeq(request).response as ts.server.protocol.SyntacticDiagnosticsSyncResponse["body"];
        assert.isDefined(response);
        assert.equal(response!.length, 1);
        assert.equal((response![0] as ts.server.protocol.Diagnostic).text, expectedErrorMessage);

        const project = service.inferredProjects[0];
        const diagnostics = project.getLanguageService().getSyntacticDiagnostics(file1.path);
        assert.isTrue(diagnostics.length === 1);
        assert.equal(diagnostics[0].messageText, expectedErrorMessage);

        verifyGetErrRequest({ session, files: [file1], skip: [{ semantic: true, suggestion: true }] });
        baselineTsserverLogs("partialSemanticServer", "syntactic diagnostics are returned with no error", session);
    });

    it("should not include auto type reference directives", () => {
        const { host, session, file1 } = setup();
        const atTypes: File = {
            path: `/node_modules/@types/somemodule/index.d.ts`,
            content: "export const something = 10;",
        };
        host.ensureFileOrFolder(atTypes);
        openFilesForSession([file1], session);
        baselineTsserverLogs("partialSemanticServer", "should not include auto type reference directives", session);
    });

    it("should not include referenced files from unopened files", () => {
        const file1: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `///<reference path="b.ts"/>
///<reference path="/user/username/projects/myproject/node_modules/something/index.d.ts"/>
function fooA() { }`,
        };
        const file2: File = {
            path: `/user/username/projects/myproject/b.ts`,
            content: `///<reference path="./c.ts"/>
///<reference path="/user/username/projects/myproject/node_modules/something/index.d.ts"/>
function fooB() { }`,
        };
        const file3: File = {
            path: `/user/username/projects/myproject/c.ts`,
            content: `function fooC() { }`,
        };
        const something: File = {
            path: `/user/username/projects/myproject/node_modules/something/index.d.ts`,
            content: "function something() {}",
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const host = createServerHost([file1, file2, file3, something, libFile, configFile]);
        const session = new TestSession({
            host,
            serverMode: ts.LanguageServiceMode.PartialSemantic,
            useSingleInferredProject: true,
        });
        openFilesForSession([file1], session);
        baselineTsserverLogs("partialSemanticServer", "should not include referenced files from unopened files", session);
    });

    it("should not crash when external module name resolution is reused", () => {
        const { session, file1, file2, file3 } = setup();
        openFilesForSession([file1], session);

        // Close the file that contains non relative external module name and open some file that doesnt have non relative external module import
        closeFilesForSession([file1], session);
        openFilesForSession([file3], session);

        // Open file with non relative external module name
        openFilesForSession([file2], session);
        baselineTsserverLogs("partialSemanticServer", "should not crash when external module name resolution is reused", session);
    });

    it("should not create autoImportProvider or handle package jsons", () => {
        const angularFormsDts: File = {
            path: "/node_modules/@angular/forms/forms.d.ts",
            content: "export declare class PatternValidator {}",
        };
        const angularFormsPackageJson: File = {
            path: "/node_modules/@angular/forms/package.json",
            content: `{ "name": "@angular/forms", "typings": "./forms.d.ts" }`,
        };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: `{ "compilerOptions": { "module": "commonjs" } }`,
        };
        const packageJson: File = {
            path: "/package.json",
            content: `{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }`,
        };
        const indexTs: File = {
            path: "/index.ts",
            content: "",
        };
        const host = createServerHost([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs, libFile]);
        const session = new TestSession({ host, serverMode: ts.LanguageServiceMode.PartialSemantic, useSingleInferredProject: true });
        const service = session.getProjectService();
        openFilesForSession([indexTs], session);
        const project = service.inferredProjects[0];
        assert.isFalse(project.autoImportProviderHost);
        assert.isUndefined(project.getPackageJsonAutoImportProvider());
        assert.deepEqual(project.getPackageJsonsForAutoImport(), ts.emptyArray);
        baselineTsserverLogs("partialSemanticServer", "should not create autoImportProvider or handle package jsons", session);
    });

    it("should support go-to-definition on module specifiers", () => {
        const { session, file1 } = setup();
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.DefinitionAndBoundSpanRequest>({
            command: ts.server.protocol.CommandTypes.DefinitionAndBoundSpan,
            arguments: protocolFileLocationFromSubstring(file1, `"./b"`),
        });
        baselineTsserverLogs("partialSemanticServer", "should support go-to-definition on module specifiers", session);
    });
});

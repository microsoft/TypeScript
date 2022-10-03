namespace ts.projectSystem {
    describe("unittests:: tsserver:: Semantic operations on partialSemanticServer", () => {
        function setup() {
            const file1: File = {
                path: `${tscWatch.projectRoot}/a.ts`,
                content: `import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }`
            };
            const file2: File = {
                path: `${tscWatch.projectRoot}/b.ts`,
                content: `export { cc } from "./c";
import { something } from "something";
                export const y = 10;`
            };
            const file3: File = {
                path: `${tscWatch.projectRoot}/c.ts`,
                content: `export const cc = 10;`
            };
            const something: File = {
                path: `${tscWatch.projectRoot}/node_modules/something/index.d.ts`,
                content: "export const something = 10;"
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([file1, file2, file3, something, libFile, configFile]);
            const session = createSession(host, {
                serverMode: LanguageServiceMode.PartialSemantic,
                useSingleInferredProject: true,
                logger: createLoggerWithInMemoryLogs(host),
            });
            return { host, session, file1, file2, file3, something, configFile };
        }

        it("open files are added to inferred project even if config file is present and semantic operations succeed", () => {
            const { session, file1, file2 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            const project = service.inferredProjects[0];
            verifyCompletions();

            openFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path]);
            verifyCompletions();

            baselineTsserverLogs("partialSemanticServer", "files are added to inferred project", session);

            function verifyCompletions() {
                session.executeCommandSeq<protocol.CompletionsRequest>({
                    command: protocol.CommandTypes.Completions,
                    arguments: protocolFileLocationFromSubstring(file1, "prop", { index: 1 })
                });
            }
        });

        it("throws on unsupported commands", () => {
            const { session, file1 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            const request: protocol.SemanticDiagnosticsSyncRequest = {
                type: "request",
                seq: 1,
                command: protocol.CommandTypes.SemanticDiagnosticsSync,
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
            baselineTsserverLogs("partialSemanticServer", "throws unsupported commands", session);
        });

        it("allows syntactic diagnostic commands", () => {
            const file1: File = {
                path: `${tscWatch.projectRoot}/a.ts`,
                content: `if (a < (b + c) { }`
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: `{}`
            };
            const expectedErrorMessage = "')' expected.";

            const host = createServerHost([file1, libFile, configFile]);
            const session = createSession(host, {
                serverMode: LanguageServiceMode.PartialSemantic,
                useSingleInferredProject: true,
                logger: createLoggerWithInMemoryLogs(host)
            });

            const service = session.getProjectService();
            openFilesForSession([file1], session);
            const request: protocol.SyntacticDiagnosticsSyncRequest = {
                type: "request",
                seq: 1,
                command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                arguments: { file: file1.path }
            };
            const response = session.executeCommandSeq(request).response as protocol.SyntacticDiagnosticsSyncResponse["body"];
            assert.isDefined(response);
            assert.equal(response!.length, 1);
            assert.equal((response![0] as protocol.Diagnostic).text, expectedErrorMessage);

            const project = service.inferredProjects[0];
            const diagnostics = project.getLanguageService().getSyntacticDiagnostics(file1.path);
            assert.isTrue(diagnostics.length === 1);
            assert.equal(diagnostics[0].messageText, expectedErrorMessage);

            verifyGetErrRequest({ session, host, files: [file1], skip: [{ semantic: true, suggestion: true }] });
            baselineTsserverLogs("partialSemanticServer", "syntactic diagnostics are returned with no error", session);
        });

        it("should not include auto type reference directives", () => {
            const { host, session, file1 } = setup();
            const atTypes: File = {
                path: `/node_modules/@types/somemodule/index.d.ts`,
                content: "export const something = 10;"
            };
            host.ensureFileOrFolder(atTypes);
            openFilesForSession([file1], session);
            baselineTsserverLogs("partialSemanticServer", "should not include auto type reference directives", session);
        });

        it("should not include referenced files from unopened files", () => {
            const file1: File = {
                path: `${tscWatch.projectRoot}/a.ts`,
                content: `///<reference path="b.ts"/>
///<reference path="${tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooA() { }`
            };
            const file2: File = {
                path: `${tscWatch.projectRoot}/b.ts`,
                content: `///<reference path="./c.ts"/>
///<reference path="${tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooB() { }`
            };
            const file3: File = {
                path: `${tscWatch.projectRoot}/c.ts`,
                content: `function fooC() { }`
            };
            const something: File = {
                path: `${tscWatch.projectRoot}/node_modules/something/index.d.ts`,
                content: "function something() {}"
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([file1, file2, file3, something, libFile, configFile]);
            const session = createSession(host, {
                serverMode: LanguageServiceMode.PartialSemantic,
                useSingleInferredProject: true,
                logger: createLoggerWithInMemoryLogs(host),
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
                content: `{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }`
            };
            const indexTs: File = {
                path: "/index.ts",
                content: ""
            };
            const host = createServerHost([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs, libFile]);
            const session = createSession(host, { serverMode: LanguageServiceMode.PartialSemantic, useSingleInferredProject: true });
            const service = session.getProjectService();
            openFilesForSession([indexTs], session);
            const project = service.inferredProjects[0];
            assert.isFalse(project.autoImportProviderHost);
            assert.isUndefined(project.getPackageJsonAutoImportProvider());
            assert.deepEqual(project.getPackageJsonsForAutoImport(), emptyArray);
        });

        it("should support go-to-definition on module specifiers", () => {
            const { session, file1 } = setup();
            openFilesForSession([file1], session);
            session.executeCommandSeq<protocol.DefinitionAndBoundSpanRequest>({
                command: protocol.CommandTypes.DefinitionAndBoundSpan,
                arguments: protocolFileLocationFromSubstring(file1, `"./b"`)
            });
            baselineTsserverLogs("partialSemanticServer", "should support go-to-definition on module specifiers", session);
        });
    });
}

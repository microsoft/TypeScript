namespace ts.projectSystem {
    describe("unittests:: tsserver:: Semantic operations on PartialSemantic server", () => {
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
            const session = createSession(host, { serverMode: LanguageServiceMode.PartialSemantic, useSingleInferredProject: true });
            return { host, session, file1, file2, file3, something, configFile };
        }

        it("open files are added to inferred project even if config file is present and semantic operations succeed", () => {
            const { host, session, file1, file2 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]); // no imports are resolved
            verifyCompletions();

            openFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path]);
            verifyCompletions();

            function verifyCompletions() {
                assert.isTrue(project.languageServiceEnabled);
                checkWatchedFiles(host, emptyArray);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                const response = session.executeCommandSeq<protocol.CompletionsRequest>({
                    command: protocol.CommandTypes.Completions,
                    arguments: protocolFileLocationFromSubstring(file1, "prop", { index: 1 })
                }).response as protocol.CompletionEntry[];
                assert.deepEqual(response, [
                    completionEntry("foo", ScriptElementKind.memberFunctionElement),
                    completionEntry("prop", ScriptElementKind.memberVariableElement),
                ]);
            }

            function completionEntry(name: string, kind: ScriptElementKind): protocol.CompletionEntry {
                return {
                    name,
                    kind,
                    kindModifiers: "",
                    sortText: Completions.SortText.LocationPriority,
                    hasAction: undefined,
                    insertText: undefined,
                    isPackageJsonImport: undefined,
                    isRecommended: undefined,
                    replacementSpan: undefined,
                    source: undefined
                };
            }
        });

        it("throws on unsupported commands", () => {
            const { session, file1 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            let hasException = false;
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
                assert.equal(e.message, `Request: semanticDiagnosticsSync not allowed in LanguageServiceMode.PartialSemantic`);
                hasException = true;
            }
            assert.isTrue(hasException);

            hasException = false;
            const project = service.inferredProjects[0];
            try {
                project.getLanguageService().getSemanticDiagnostics(file1.path);
            }
            catch (e) {
                assert.equal(e.message, `LanguageService Operation: getSemanticDiagnostics not allowed in LanguageServiceMode.PartialSemantic`);
                hasException = true;
            }
            assert.isTrue(hasException);
        });

        it("should not include auto type reference directives", () => {
            const { host, session, file1 } = setup();
            const atTypes: File = {
                path: `/node_modules/@types/somemodule/index.d.ts`,
                content: "export const something = 10;"
            };
            host.ensureFileOrFolder(atTypes);
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]); // Should not contain atTypes
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
            const session = createSession(host, { serverMode: LanguageServiceMode.PartialSemantic, useSingleInferredProject: true });
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]); // no resolve
        });

        it("should not crash when external module name resolution is reused", () => {
            const { session, file1, file2, file3 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]);

            // Close the file that contains non relative external module name and open some file that doesnt have non relative external module import
            closeFilesForSession([file1], session);
            openFilesForSession([file3], session);
            checkProjectActualFiles(project, [libFile.path, file3.path]);

            // Open file with non relative external module name
            openFilesForSession([file2], session);
            checkProjectActualFiles(project, [libFile.path, file2.path, file3.path]);
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
    });
}

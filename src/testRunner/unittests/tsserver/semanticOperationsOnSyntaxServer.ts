namespace ts.projectSystem {
    describe("unittests:: tsserver:: Semantic operations on Syntax server", () => {
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
            const session = createSession(host, { syntaxOnly: true, useSingleInferredProject: true });
            return { host, session, file1, file2, file3, something, configFile };
        }

        function verifySessionException<T extends server.protocol.Request>(session: TestSession, request: Partial<T>) {
            let hasException = false;
            try {
                session.executeCommandSeq(request);
            }
            catch (e) {
                assert.equal(e.message, `Request: ${request.command} not allowed in LanguageServiceMode.Syntactic`);
                hasException = true;
            }
            assert.isTrue(hasException);
        }

        it("open files are added to inferred project even if config file is present and semantic operations fail", () => {
            const { host, session, file1, file2, file3, something } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, emptyArray);
            verifyCompletions();
            verifyGoToDefToB();

            openFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, emptyArray);
            verifyCompletions();
            verifyGoToDefToB();
            verifyGoToDefToC();

            openFilesForSession([file3], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, emptyArray);

            openFilesForSession([something], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, emptyArray);

            // Close open files and verify resolutions
            closeFilesForSession([file3], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, emptyArray);

            closeFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            checkProjectActualFiles(project, emptyArray);

            function verifyCompletions() {
                assert.isFalse(project.languageServiceEnabled);
                checkWatchedFiles(host, emptyArray);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                verifySessionException<protocol.CompletionsRequest>(session, {
                    command: protocol.CommandTypes.Completions,
                    arguments: protocolFileLocationFromSubstring(file1, "prop", { index: 1 })
                });
            }

            function verifyGoToDefToB() {
                verifySessionException<protocol.DefinitionAndBoundSpanRequest>(session, {
                    command: protocol.CommandTypes.DefinitionAndBoundSpan,
                    arguments: protocolFileLocationFromSubstring(file1, "y")
                });
            }

            function verifyGoToDefToC() {
                verifySessionException<protocol.DefinitionAndBoundSpanRequest>(session, {
                    command: protocol.CommandTypes.DefinitionAndBoundSpan,
                    arguments: protocolFileLocationFromSubstring(file1, "cc")
                });
            }
        });

        it("throws on unsupported commands", () => {
            const { session, file1 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            verifySessionException<protocol.SemanticDiagnosticsSyncRequest>(session, {
                type: "request",
                seq: 1,
                command: protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: { file: file1.path }
            });

            let hasException = false;
            const project = service.inferredProjects[0];
            try {
                project.getLanguageService().getSemanticDiagnostics(file1.path);
            }
            catch (e) {
                assert.equal(e.message, `LanguageService Operation: getSemanticDiagnostics not allowed in LanguageServiceMode.Syntactic`);
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
            checkProjectActualFiles(project, emptyArray); // Should not contain atTypes
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
            const session = createSession(host, { syntaxOnly: true, useSingleInferredProject: true });
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, emptyArray);

            openFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            assert.isFalse(project.dirty);
            project.updateGraph();
            checkProjectActualFiles(project, emptyArray);

            closeFilesForSession([file2], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            assert.isTrue(project.dirty);
            checkProjectActualFiles(project, emptyArray);
        });
    });
}

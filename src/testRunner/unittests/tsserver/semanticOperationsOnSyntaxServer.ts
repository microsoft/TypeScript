namespace ts.projectSystem {
    describe("unittests:: tsserver:: Semantic operations on Syntax server", () => {
        function setup() {
            const file1: File = {
                path: `${tscWatch.projectRoot}/a.ts`,
                content: `import { y } from "./b";
class c { prop = "hello"; foo() { return this.prop; } }`
            };
            const file2: File = {
                path: `${tscWatch.projectRoot}/b.ts`,
                content: "export const y = 10;"
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const host = createServerHost([file1, file2, libFile, configFile]);
            const session = createSession(host, { syntaxOnly: true, useSingleInferredProject: true });
            return { host, session, file1, file2, configFile };
        }

        it("open files are added to inferred project even if config file is present and semantic operations succeed", () => {
            const { host, session, file1, file2 } = setup();
            const service = session.getProjectService();
            openFilesForSession([file1], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]); // Import is not resolved
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
                assert.equal(e.message, `Request: semanticDiagnosticsSync not allowed on syntaxServer`);
                hasException = true;
            }
            assert.isTrue(hasException);

            hasException = false;
            const project = service.inferredProjects[0];
            try {
                project.getLanguageService().getSemanticDiagnostics(file1.path);
            }
            catch (e) {
                assert.equal(e.message, `LanguageService Operation: getSemanticDiagnostics not allowed on syntaxServer`);
                hasException = true;
            }
            assert.isTrue(hasException);
        });
    });
}

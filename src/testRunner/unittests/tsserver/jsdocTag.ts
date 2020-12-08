namespace ts.projectSystem {
    describe("unittests:: tsserver:: jsdoc @link ", () => {
        it("should provide a target span for a working link", () => {
            // TODO: (1) based on a dynamic file test
            // (2) didn't work outside a tag
            const file: File = {
                path: "someFile1.js",
                content: `class C { }
/** @wat {@link C} */
var x = 1`
            };
            const host = createServerHost([libFile], { useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
            projectService.setCompilerOptionsForInferredProjects({
                module: ModuleKind.CommonJS,
                allowJs: true,
                allowSyntheticDefaultImports: true,
                allowNonTsExtensions: true
            });
            projectService.openClientFile(file.path, `class C { }
/** @wat {@link C} */
var x = 1`);

            const project = projectService.inferredProjects[0];
            const indexOfX = file.content.indexOf("x");
            assert.deepEqual(project.getLanguageService(/*ensureSynchronized*/ true).getQuickInfoAtPosition(file.path, indexOfX), {
                kind: ScriptElementKind.variableElement,
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
                tags: [{
                    links: [{
                        fileName: "someFile1.js",
                        target: {
                            fileName: "someFile1.js",
                            textSpan: {
                                length: 11,
                                start: 0,
                            }
                        },
                        textSpan: {
                            length: 9,
                            start: 21,
                        },
                    }],
                    name: "wat",
                    text: "{@link C}",
                }]
            });


        });
    });
}

namespace ts {
    const _chai: typeof import("chai") = require("chai");
    const expect: typeof _chai.expect = _chai.expect;
    describe("unittests:: services:: languageService", () => {
        const files: {[index: string]: string} = {
            "foo.ts": `import Vue from "./vue";
import Component from "./vue-class-component";
import { vueTemplateHtml } from "./variables";

@Component({
    template: vueTemplateHtml,
})
class Carousel<T> extends Vue {
}`,
            "variables.ts": `export const vueTemplateHtml = \`<div></div>\`;`,
            "vue.d.ts": `export namespace Vue { export type Config = { template: string }; }`,
            "vue-class-component.d.ts": `import Vue from "./vue";
export function Component(x: Config): any;`
        };

        function createLanguageService() {
            return ts.createLanguageService({
                getCompilationSettings() {
                    return {};
                },
                getScriptFileNames() {
                    return ["foo.ts", "variables.ts", "vue.d.ts", "vue-class-component.d.ts"];
                },
                getScriptVersion(_fileName) {
                    return "";
                },
                getScriptSnapshot(fileName) {
                    if (fileName === ".ts") {
                        return ScriptSnapshot.fromString("");
                    }
                    return ScriptSnapshot.fromString(files[fileName] || "");
                },
                getCurrentDirectory: () => ".",
                getDefaultLibFileName(options) {
                    return getDefaultLibFilePath(options);
                },
            });
        }
        // Regression test for GH #18245 - bug in single line comment writer caused a debug assertion when attempting
        //  to write an alias to a module's default export was referrenced across files and had no default export
        it("should be able to create a language service which can respond to deinition requests without throwing", () => {
            const languageService = createLanguageService();
            const definitions = languageService.getDefinitionAtPosition("foo.ts", 160); // 160 is the latter `vueTemplateHtml` position
            expect(definitions).to.exist; // eslint-disable-line @typescript-eslint/no-unused-expressions
        });

        it("getEmitOutput on language service has way to force dts emit", () => {
            const languageService = createLanguageService();
            assert.deepEqual(
                languageService.getEmitOutput(
                    "foo.ts",
                    /*emitOnlyDtsFiles*/ true
                ),
                {
                    emitSkipped: true,
                    diagnostics: emptyArray,
                    outputFiles: emptyArray,
                    exportedModulesFromDeclarationEmit: undefined
                }
            );

            assert.deepEqual(
                languageService.getEmitOutput(
                    "foo.ts",
                    /*emitOnlyDtsFiles*/ true,
                    /*forceDtsEmit*/ true
                ),
                {
                    emitSkipped: false,
                    diagnostics: emptyArray,
                    outputFiles: [{
                        name: "foo.d.ts",
                        text: "export {};\r\n",
                        writeByteOrderMark: false
                    }],
                    exportedModulesFromDeclarationEmit: undefined
                }
            );
        });

        describe("detects program upto date correctly", () => {
            function verifyProgramUptoDate(useProjectVersion: boolean) {
                let projectVersion = "1";
                const files = createMap<{ version: string, text: string; }>();
                files.set("/project/root.ts", { version: "1", text: `import { foo } from "./other"` });
                files.set("/project/other.ts", { version: "1", text: `export function foo() { }` });
                files.set("/lib/lib.d.ts", { version: "1", text: projectSystem.libFile.content });
                const host: LanguageServiceHost = {
                    useCaseSensitiveFileNames: returnTrue,
                    getCompilationSettings: getDefaultCompilerOptions,
                    fileExists: path => files.has(path),
                    getProjectVersion: !useProjectVersion ? undefined : () => projectVersion,
                    getScriptFileNames: () => ["/project/root.ts"],
                    getScriptVersion: path => files.get(path)?.version || "",
                    getScriptSnapshot: path => {
                        const text = files.get(path)?.text;
                        return text ? ScriptSnapshot.fromString(text) : undefined;
                    },
                    getCurrentDirectory: () => "/project",
                    getDefaultLibFileName: () => "/lib/lib.d.ts"
                };
                const ls = ts.createLanguageService(host);
                const program1 = ls.getProgram()!;
                const program2 = ls.getProgram()!;
                assert.strictEqual(program1, program2);
                verifyProgramFiles(program1);

                // Change other
                projectVersion = "2";
                files.set("/project/other.ts", { version: "2", text: `export function foo() { } export function bar() { }` });
                const program3 = ls.getProgram()!;
                assert.notStrictEqual(program2, program3);
                verifyProgramFiles(program3);

                // change root
                projectVersion = "3";
                files.set("/project/root.ts", { version: "2", text: `import { foo, bar } from "./other"` });
                const program4 = ls.getProgram()!;
                assert.notStrictEqual(program3, program4);
                verifyProgramFiles(program4);

                function verifyProgramFiles(program: Program) {
                    assert.deepEqual(
                        program.getSourceFiles().map(f => f.fileName),
                        ["/lib/lib.d.ts", "/project/other.ts", "/project/root.ts"]
                    );
                }
            }
            it("when host implements getProjectVersion", () => {
                verifyProgramUptoDate(/*useProjectVersion*/ true);
            });
            it("when host does not implement getProjectVersion", () => {
                verifyProgramUptoDate(/*useProjectVersion*/ false);
            });
        });
    });
}

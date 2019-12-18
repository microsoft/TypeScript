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
            expect(definitions).to.exist; // eslint-disable-line no-unused-expressions
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
                    outputFiles: [{
                        name: "foo.d.ts",
                        text: "export {};\r\n",
                        writeByteOrderMark: false
                    }],
                    exportedModulesFromDeclarationEmit: undefined
                }
            );
        });
    });
}

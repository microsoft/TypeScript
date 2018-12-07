namespace ts {
    describe("languageService", () => {
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
        // Regression test for GH #18245 - bug in single line comment writer caused a debug assertion when attempting
        //  to write an alias to a module's default export was referrenced across files and had no default export
        it("should be able to create a language service which can respond to deinition requests without throwing", () => {
            const languageService = createLanguageService({
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
            const definitions = languageService.getDefinitionAtPosition("foo.ts", 160); // 160 is the latter `vueTemplateHtml` position
            expect(definitions).to.exist; // tslint:disable-line no-unused-expression
        });
    });
}
import {
    expect,
} from "chai";

import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: services:: languageService", () => {
    const files: { [index: string]: string; } = {
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
export function Component(x: Config): any;`,
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
                    return ts.ScriptSnapshot.fromString("");
                }
                return ts.ScriptSnapshot.fromString(files[fileName] || "");
            },
            getCurrentDirectory: () => ".",
            getDefaultLibFileName(options) {
                return ts.getDefaultLibFilePath(options);
            },
            fileExists: name => !!files[name],
            readFile: name => files[name],
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
                /*emitOnlyDtsFiles*/ true,
            ),
            {
                emitSkipped: true,
                diagnostics: ts.emptyArray,
                outputFiles: ts.emptyArray,
            },
        );

        assert.deepEqual(
            languageService.getEmitOutput(
                "foo.ts",
                /*emitOnlyDtsFiles*/ true,
                /*forceDtsEmit*/ true,
            ),
            {
                emitSkipped: false,
                diagnostics: ts.emptyArray,
                outputFiles: [{
                    name: "foo.d.ts",
                    text: "export {};\n",
                    writeByteOrderMark: false,
                }],
            },
        );
    });

    describe("detects program upto date correctly", () => {
        function verifyProgramUptoDate(useProjectVersion: boolean) {
            let projectVersion = "1";
            const files = new Map<string, { version: string; text: string; }>();
            files.set("/project/root.ts", { version: "1", text: `import { foo } from "./other"` });
            files.set("/project/other.ts", { version: "1", text: `export function foo() { }` });
            files.set("/lib/lib.d.ts", { version: "1", text: libFile.content });
            const host: ts.LanguageServiceHost = {
                useCaseSensitiveFileNames: ts.returnTrue,
                getCompilationSettings: ts.getDefaultCompilerOptions,
                fileExists: path => files.has(path),
                readFile: path => files.get(path)?.text,
                getProjectVersion: !useProjectVersion ? undefined : () => projectVersion,
                getScriptFileNames: () => ["/project/root.ts"],
                getScriptVersion: path => files.get(path)?.version || "",
                getScriptSnapshot: path => {
                    const text = files.get(path)?.text;
                    return text ? ts.ScriptSnapshot.fromString(text) : undefined;
                },
                getCurrentDirectory: () => "/project",
                getDefaultLibFileName: () => "/lib/lib.d.ts",
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

            function verifyProgramFiles(program: ts.Program) {
                assert.deepEqual(
                    program.getSourceFiles().map(f => f.fileName),
                    ["/lib/lib.d.ts", "/project/other.ts", "/project/root.ts"],
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

    describe("detects program upto date when new file is added to the referenced project", () => {
        function setup(useSourceOfProjectReferenceRedirect: (() => boolean) | undefined) {
            const config1: File = {
                path: `/user/username/projects/myproject/projects/project1/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    exclude: ["temp"],
                }),
            };
            const class1: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.ts`,
                content: `class class1 {}`,
            };
            const class1Dts: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.d.ts`,
                content: `declare class class1 {}`,
            };
            const config2: File = {
                path: `/user/username/projects/myproject/projects/project2/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    references: [
                        { path: "../project1" },
                    ],
                }),
            };
            const class2: File = {
                path: `/user/username/projects/myproject/projects/project2/class2.ts`,
                content: `class class2 {}`,
            };
            const system = createServerHost([config1, class1, class1Dts, config2, class2, libFile]);
            const result = ts.getParsedCommandLineOfConfigFile(`/user/username/projects/myproject/projects/project2/tsconfig.json`, /*optionsToExtend*/ undefined, {
                useCaseSensitiveFileNames: true,
                fileExists: path => system.fileExists(path),
                readFile: path => system.readFile(path),
                getCurrentDirectory: () => system.getCurrentDirectory(),
                readDirectory: (path, extensions, excludes, includes, depth) => system.readDirectory(path, extensions, excludes, includes, depth),
                onUnRecoverableConfigFileDiagnostic: ts.noop,
            })!;
            const host: ts.LanguageServiceHost = {
                useCaseSensitiveFileNames: ts.returnTrue,
                useSourceOfProjectReferenceRedirect,
                getCompilationSettings: () => result.options,
                fileExists: path => system.fileExists(path),
                readFile: path => system.readFile(path),
                getScriptFileNames: () => result.fileNames,
                getScriptVersion: path => {
                    const text = system.readFile(path);
                    return text !== undefined ? system.createHash(path) : "";
                },
                getScriptSnapshot: path => {
                    const text = system.readFile(path);
                    return text ? ts.ScriptSnapshot.fromString(text) : undefined;
                },
                readDirectory: (path, extensions, excludes, includes, depth) => system.readDirectory(path, extensions, excludes, includes, depth),
                getCurrentDirectory: () => system.getCurrentDirectory(),
                getDefaultLibFileName: () => libFile.path,
                getProjectReferences: () => result.projectReferences,
            };
            const ls = ts.createLanguageService(host);
            return { system, ls, class1, class1Dts, class2 };
        }
        it("detects program upto date when new file is added to the referenced project", () => {
            const { ls, system, class1, class2 } = setup(ts.returnTrue);
            assert.deepEqual(
                ls.getProgram()!.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1.path, class2.path],
            );
            // Add new file to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            system.writeFile(class3, `class class3 {}`);
            const program = ls.getProgram()!;
            assert.deepEqual(
                program.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1.path, class3, class2.path],
            );
            // Add excluded file to referenced project
            system.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            assert.strictEqual(ls.getProgram(), program);
            // Add output from new class to referenced project
            system.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`);
            assert.strictEqual(ls.getProgram(), program);
        });

        it("detects program upto date when new file is added to the referenced project without useSourceOfProjectReferenceRedirect", () => {
            const { ls, system, class1Dts, class2 } = setup(/*useSourceOfProjectReferenceRedirect*/ undefined);
            const program1 = ls.getProgram()!;
            assert.deepEqual(
                program1.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1Dts.path, class2.path],
            );
            // Add new file to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            system.writeFile(class3, `class class3 {}`);
            assert.notStrictEqual(ls.getProgram(), program1);
            assert.deepEqual(
                ls.getProgram()!.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1Dts.path, class2.path],
            );
            // Add class3 output
            const class3Dts = `/user/username/projects/myproject/projects/project1/class3.d.ts`;
            system.writeFile(class3Dts, `declare class class3 {}`);
            const program2 = ls.getProgram()!;
            assert.deepEqual(
                program2.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1Dts.path, class3Dts, class2.path],
            );
            // Add excluded file to referenced project
            system.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            assert.strictEqual(ls.getProgram(), program2);
            // Delete output from new class to referenced project
            system.deleteFile(class3Dts);
            assert.deepEqual(
                ls.getProgram()!.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1Dts.path, class2.path],
            );
            // Write output again
            system.writeFile(class3Dts, `declare class class3 {}`);
            assert.deepEqual(
                ls.getProgram()!.getSourceFiles().map(f => f.fileName),
                [libFile.path, class1Dts.path, class3Dts, class2.path],
            );
        });
    });
});

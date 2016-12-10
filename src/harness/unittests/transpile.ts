/// <reference path="..\harness.ts" />

namespace ts {
    describe("Transpile", () => {

        interface TranspileTestSettings {
            options?: TranspileOptions;
        }

        function transpilesCorrectly(name: string, input: string, testSettings: TranspileTestSettings) {
            describe(name, () => {
                let justName: string;
                let transpileOptions: TranspileOptions;
                let canUseOldTranspile: boolean;
                let toBeCompiled: Harness.Compiler.TestFile[];
                let transpileResult: TranspileOutput;
                let oldTranspileResult: string;
                let oldTranspileDiagnostics: Diagnostic[];

                before(() => {
                    transpileOptions = testSettings.options || {};
                    if (!transpileOptions.compilerOptions) {
                        transpileOptions.compilerOptions = {};
                    }

                    if (transpileOptions.compilerOptions.newLine === undefined) {
                        // use \r\n as default new line
                        transpileOptions.compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
                    }

                    transpileOptions.compilerOptions.sourceMap = true;

                    if (!transpileOptions.fileName) {
                        transpileOptions.fileName = transpileOptions.compilerOptions.jsx ? "file.tsx" : "file.ts";
                    }

                    transpileOptions.reportDiagnostics = true;

                    justName = "transpile/" + name.replace(/[^a-z0-9\-. ]/ig, "") + (transpileOptions.compilerOptions.jsx ? ".tsx" : ".ts");
                    toBeCompiled = [{
                        unitName: transpileOptions.fileName,
                        content: input
                    }];

                    canUseOldTranspile = !transpileOptions.renamedDependencies;
                    transpileResult = transpileModule(input, transpileOptions);

                    if (canUseOldTranspile) {
                        oldTranspileDiagnostics = [];
                        oldTranspileResult = transpile(input, transpileOptions.compilerOptions, transpileOptions.fileName, oldTranspileDiagnostics, transpileOptions.moduleName);
                    }
                });

                after(() => {
                    justName = undefined;
                    transpileOptions = undefined;
                    canUseOldTranspile = undefined;
                    toBeCompiled = undefined;
                    transpileResult = undefined;
                    oldTranspileResult = undefined;
                    oldTranspileDiagnostics = undefined;
                });

                it("Correct errors for " + justName, () => {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".errors.txt"), () => {
                        if (transpileResult.diagnostics.length === 0) {
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }

                        return Harness.Compiler.getErrorBaseline(toBeCompiled, transpileResult.diagnostics);
                    });
                });

                if (canUseOldTranspile) {
                    it("Correct errors (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".oldTranspile.errors.txt"), () => {
                            if (oldTranspileDiagnostics.length === 0) {
                                /* tslint:disable:no-null-keyword */
                                return null;
                                /* tslint:enable:no-null-keyword */
                            }

                            return Harness.Compiler.getErrorBaseline(toBeCompiled, oldTranspileDiagnostics);
                        });
                    });
                }

                it("Correct output for " + justName, () => {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".js"), () => {
                        if (transpileResult.outputText) {
                            return transpileResult.outputText;
                        }
                        else {
                            // This can happen if compiler recieve invalid compiler-options
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }
                    });
                });


                if (canUseOldTranspile) {
                    it("Correct output (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".oldTranspile.js"), () => {
                            return oldTranspileResult;
                        });
                    });
                }
            });
        }

        transpilesCorrectly("Generates no diagnostics with valid inputs", `var x = 0;`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS } }
        });

        transpilesCorrectly("Generates no diagnostics for missing file references", `/// <reference path="file2.ts" />
var x = 0;`, {
                options: { compilerOptions: { module: ModuleKind.CommonJS } }
            });

        transpilesCorrectly("Generates no diagnostics for missing module imports", `import {a} from "module2";`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS } }
        });

        transpilesCorrectly("Generates expected syntactic diagnostics", `a b`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS } }
        });

        transpilesCorrectly("Does not generate semantic diagnostics", `var x: string = 0;`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS } }
        });

        transpilesCorrectly("Generates module output", `var x = 0;`, {
            options: { compilerOptions: { module: ModuleKind.AMD } }
        });

        transpilesCorrectly("Uses correct newLine character", `var x = 0;`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS, newLine: NewLineKind.LineFeed } }
        });

        transpilesCorrectly("Sets module name", "var x = 1;", {
            options: { compilerOptions: { module: ModuleKind.System, newLine: NewLineKind.LineFeed }, moduleName: "NamedModule" }
        });

        transpilesCorrectly("No extra errors for file without extension", `"use strict";\r\nvar x = 0;`, {
            options: { compilerOptions: { module: ModuleKind.CommonJS }, fileName: "file" }
        });

        transpilesCorrectly("Rename dependencies - System",
            `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`, {
                options: { compilerOptions: { module: ModuleKind.System, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } }
            });

        transpilesCorrectly("Rename dependencies - AMD",
            `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`, {
                options: { compilerOptions: { module: ModuleKind.AMD, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } }
            });

        transpilesCorrectly("Rename dependencies - UMD",
            `import {foo} from "SomeName";\n` +
            `declare function use(a: any);\n` +
            `use(foo);`, {
                options: { compilerOptions: { module: ModuleKind.UMD, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } }
            });

        transpilesCorrectly("Transpile with emit decorators and emit metadata",
            `import {db} from './db';\n` +
            `function someDecorator(target) {\n` +
            `    return target;\n` +
            `} \n` +
            `@someDecorator\n` +
            `class MyClass {\n` +
            `    db: db;\n` +
            `    constructor(db: db) {\n` +
            `        this.db = db;\n` +
            `        this.db.doSomething(); \n` +
            `    }\n` +
            `}\n` +
            `export {MyClass}; \n`, {
                options: {
                    compilerOptions: {
                        module: ModuleKind.CommonJS,
                        newLine: NewLineKind.LineFeed,
                        noEmitHelpers: true,
                        emitDecoratorMetadata: true,
                        experimentalDecorators: true,
                        target: ScriptTarget.ES5,
                    }
                }
            });

        transpilesCorrectly("Supports backslashes in file name", "var x", {
            options: { fileName: "a\\b.ts" }
        });

        transpilesCorrectly("transpile file as 'tsx' if 'jsx' is specified", `var x = <div/>`, {
            options: { compilerOptions: { jsx: JsxEmit.React, newLine: NewLineKind.LineFeed } }
        });

        transpilesCorrectly("transpile .js files", "const a = 10;", {
            options: { compilerOptions: { newLine: NewLineKind.LineFeed, module: ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports urls in file name", "var x", {
            options: { fileName: "http://somewhere/directory//directory2/file.ts" }
        });

        transpilesCorrectly("Accepts string as enum values for compile-options", "export const x = 0", {
            options: {
                compilerOptions: {
                    module: <ModuleKind><any>"es6",
                    // Capitalization and spaces ignored
                    target: <ScriptTarget><any>" Es6 "
                }
            }
        });

        transpilesCorrectly("Report an error when compiler-options module-kind is out-of-range", "", {
            options: { compilerOptions: { module: <ModuleKind><any>123 } }
        });

        transpilesCorrectly("Report an error when compiler-options target-script is out-of-range", "", {
            options: { compilerOptions: { module: <ModuleKind><any>123 } }
        });

        transpilesCorrectly("Support options with lib values", "const a = 10;", {
            options: { compilerOptions: { lib: ["es6", "dom"], module: ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Support options with types values", "const a = 10;", {
            options: { compilerOptions: { types: ["jquery", "typescript"], module: ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'allowJs'", "x;", {
            options: { compilerOptions: { allowJs: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'allowSyntheticDefaultImports'", "x;", {
            options: { compilerOptions: { allowSyntheticDefaultImports: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'allowUnreachableCode'", "x;", {
            options: { compilerOptions: { allowUnreachableCode: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'allowUnusedLabels'", "x;", {
            options: { compilerOptions: { allowUnusedLabels: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'baseUrl'", "x;", {
            options: { compilerOptions: { baseUrl: "./folder/baseUrl" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'charset'", "x;", {
            options: { compilerOptions: { charset: "en-us" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'declaration'", "x;", {
            options: { compilerOptions: { declaration: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'declarationDir'", "x;", {
            options: { compilerOptions: { declarationDir: "out/declarations" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'emitBOM'", "x;", {
            options: { compilerOptions: { emitBOM: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'emitDecoratorMetadata'", "x;", {
            options: { compilerOptions: { emitDecoratorMetadata: true, experimentalDecorators: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'experimentalDecorators'", "x;", {
            options: { compilerOptions: { experimentalDecorators: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'forceConsistentCasingInFileNames'", "x;", {
            options: { compilerOptions: { forceConsistentCasingInFileNames: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'isolatedModules'", "x;", {
            options: { compilerOptions: { isolatedModules: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'jsx'", "x;", {
            options: { compilerOptions: { jsx: 1 }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'lib'", "x;", {
            options: { compilerOptions: { lib: ["es2015", "dom"] }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'locale'", "x;", {
            options: { compilerOptions: { locale: "en-us" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'module'", "x;", {
            options: { compilerOptions: { module: ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'moduleResolution'", "x;", {
            options: { compilerOptions: { moduleResolution: ModuleResolutionKind.NodeJs }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'newLine'", "x;", {
            options: { compilerOptions: { newLine: NewLineKind.CarriageReturnLineFeed }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noEmit'", "x;", {
            options: { compilerOptions: { noEmit: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noEmitHelpers'", "x;", {
            options: { compilerOptions: { noEmitHelpers: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noEmitOnError'", "x;", {
            options: { compilerOptions: { noEmitOnError: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noErrorTruncation'", "x;", {
            options: { compilerOptions: { noErrorTruncation: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noFallthroughCasesInSwitch'", "x;", {
            options: { compilerOptions: { noFallthroughCasesInSwitch: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noImplicitAny'", "x;", {
            options: { compilerOptions: { noImplicitAny: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noImplicitReturns'", "x;", {
            options: { compilerOptions: { noImplicitReturns: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noImplicitThis'", "x;", {
            options: { compilerOptions: { noImplicitThis: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noImplicitUseStrict'", "x;", {
            options: { compilerOptions: { noImplicitUseStrict: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noLib'", "x;", {
            options: { compilerOptions: { noLib: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'noResolve'", "x;", {
            options: { compilerOptions: { noResolve: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'out'", "x;", {
            options: { compilerOptions: { out: "./out" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'outDir'", "x;", {
            options: { compilerOptions: { outDir: "./outDir" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'outFile'", "x;", {
            options: { compilerOptions: { outFile: "./outFile" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'paths'", "x;", {
            options: { compilerOptions: { paths: { "*": ["./generated*"] } }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'preserveConstEnums'", "x;", {
            options: { compilerOptions: { preserveConstEnums: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'reactNamespace'", "x;", {
            options: { compilerOptions: { reactNamespace: "react" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'removeComments'", "x;", {
            options: { compilerOptions: { removeComments: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'rootDir'", "x;", {
            options: { compilerOptions: { rootDir: "./rootDir" }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'rootDirs'", "x;", {
            options: { compilerOptions: { rootDirs: ["./a", "./b"] }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'skipLibCheck'", "x;", {
            options: { compilerOptions: { skipLibCheck: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'skipDefaultLibCheck'", "x;", {
            options: { compilerOptions: { skipDefaultLibCheck: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'strictNullChecks'", "x;", {
            options: { compilerOptions: { strictNullChecks: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'stripInternal'", "x;", {
            options: { compilerOptions: { stripInternal: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'suppressExcessPropertyErrors'", "x;", {
            options: { compilerOptions: { suppressExcessPropertyErrors: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'suppressImplicitAnyIndexErrors'", "x;", {
            options: { compilerOptions: { suppressImplicitAnyIndexErrors: true }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'target'", "x;", {
            options: { compilerOptions: { target: 2 }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'types'", "x;", {
            options: { compilerOptions: { types: ["jquery", "jasmine"] }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Supports setting 'typeRoots'", "x;", {
            options: { compilerOptions: { typeRoots: ["./folder"] }, fileName: "input.js", reportDiagnostics: true }
        });

        transpilesCorrectly("Correctly serialize metadata when transpile with CommonJS option",
            `import * as ng from "angular2/core";` +
            `declare function foo(...args: any[]);` +
            `@foo` +
            `export class MyClass1 {` +
            `    constructor(private _elementRef: ng.ElementRef){}` +
            `}`, {
            options: {
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    module: ModuleKind.CommonJS,
                    moduleResolution: ModuleResolutionKind.NodeJs,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    isolatedModules: true,
                }
            }
        });

        transpilesCorrectly("Correctly serialize metadata when transpile with System option",
            `import * as ng from "angular2/core";` +
            `declare function foo(...args: any[]);` +
            `@foo` +
            `export class MyClass1 {` +
            `    constructor(private _elementRef: ng.ElementRef){}` +
            `}`, {
            options: {
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    module: ModuleKind.System,
                    moduleResolution: ModuleResolutionKind.NodeJs,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    isolatedModules: true,
                }
            }
        });
    });
}

/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
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
                    Harness.Baseline.runBaseline("Correct errors", justName.replace(/\.tsx?$/, ".errors.txt"), () => {
                        if (transpileResult.diagnostics.length === 0) {
                            return null;
                        }

                        return Harness.Compiler.getErrorBaseline(toBeCompiled, transpileResult.diagnostics);
                    });
                });

                if (canUseOldTranspile) {
                    it("Correct errors (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline("Correct errors", justName.replace(/\.tsx?$/, ".oldTranspile.errors.txt"), () => {
                            if (oldTranspileDiagnostics.length === 0) {
                                return null;
                            }

                            return Harness.Compiler.getErrorBaseline(toBeCompiled, oldTranspileDiagnostics);
                        });
                    });
                }

                it("Correct output for " + justName, () => {
                    Harness.Baseline.runBaseline("Correct output", justName.replace(/\.tsx?$/, ".js"), () => {
                        return transpileResult.outputText;
                    });
                });


                if (canUseOldTranspile) {
                    it("Correct output (old transpile) for " + justName, () => {
                        Harness.Baseline.runBaseline("Correct output", justName.replace(/\.tsx?$/, ".oldTranspile.js"), () => {
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
    });
}

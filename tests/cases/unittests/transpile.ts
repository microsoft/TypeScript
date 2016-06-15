/// <reference path="..\..\..\src\harness\harness.ts" />

interface ObjectConstructor {
    assign<T, U>(target: T, source: U): T & U;
}

namespace ts {
    describe("Transpile", () => {

        interface TranspileTestSettings {
            options?: TranspileOptions;
            expectedOutput?: string;
            expectedDiagnosticCodes?: number[];
            expectedDiagnosticTexts?: string[];
        }

        function checkDiagnostics(diagnostics: Diagnostic[], expectedDiagnosticCodes: number[] = [], expectedDiagnosticTexts?: string[]) {
            const n = expectedDiagnosticCodes.length;
            if (expectedDiagnosticTexts) {
                assert.equal(n, expectedDiagnosticTexts.length);
            }
            for (let i = 0; i < n; i++) {
                assert.equal(expectedDiagnosticCodes[i], diagnostics[i] && diagnostics[i].code, `Could not find expected diagnostic.`);
                if (expectedDiagnosticTexts) {
                    assert.equal(expectedDiagnosticTexts[i], diagnostics[i] && diagnostics[i].messageText);
                }
            };
            if (diagnostics.length !== n && diagnostics.length) {
                console.log(JSON.stringify(diagnostics, undefined, 2));
            }
            assert.equal(diagnostics.length, n, "Resuting diagnostics count does not match expected");
        }

        function test(input: string, testSettings: TranspileTestSettings): void {

            const transpileOptions: TranspileOptions = testSettings.options || {};
            if (!transpileOptions.compilerOptions) {
                transpileOptions.compilerOptions = {};
            }
            if (transpileOptions.compilerOptions.newLine === undefined) {
                // use \r\n as default new line
                transpileOptions.compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
            }

            const canUseOldTranspile = !transpileOptions.renamedDependencies;

            transpileOptions.reportDiagnostics = true;
            const transpileModuleResult = transpileModule(input, transpileOptions);

            checkDiagnostics(transpileModuleResult.diagnostics, testSettings.expectedDiagnosticCodes, testSettings.expectedDiagnosticTexts);

            if (testSettings.expectedOutput !== undefined) {
                assert.equal(transpileModuleResult.outputText, testSettings.expectedOutput);
            }

            if (canUseOldTranspile) {
                const diagnostics: Diagnostic[] = [];
                const transpileResult = transpile(input, transpileOptions.compilerOptions, transpileOptions.fileName, diagnostics, transpileOptions.moduleName);
                checkDiagnostics(diagnostics, testSettings.expectedDiagnosticCodes, testSettings.expectedDiagnosticTexts);
                if (testSettings.expectedOutput) {
                    assert.equal(transpileResult, testSettings.expectedOutput);
                }
            }

            // check source maps
            if (!transpileOptions.compilerOptions) {
                transpileOptions.compilerOptions = {};
            }

            if (!transpileOptions.fileName) {
                transpileOptions.fileName = transpileOptions.compilerOptions.jsx ? "file.tsx" : "file.ts";
            }

            transpileOptions.compilerOptions.sourceMap = true;
            const transpileModuleResultWithSourceMap = transpileModule(input, transpileOptions);
            assert.isTrue(transpileModuleResultWithSourceMap.sourceMapText !== undefined);

            const expectedSourceMapFileName = removeFileExtension(getBaseFileName(normalizeSlashes(transpileOptions.fileName))) + ".js.map";
            const expectedSourceMappingUrlLine = `//# sourceMappingURL=${expectedSourceMapFileName}`;

            if (testSettings.expectedOutput !== undefined) {
                assert.equal(transpileModuleResultWithSourceMap.outputText, testSettings.expectedOutput + expectedSourceMappingUrlLine);
            }
            else {
                // expected output is not set, just verify that output text has sourceMappingURL as a last line
                const output = transpileModuleResultWithSourceMap.outputText;
                assert.isTrue(output.length >= expectedSourceMappingUrlLine.length);
                if (output.length === expectedSourceMappingUrlLine.length) {
                    assert.equal(output, expectedSourceMappingUrlLine);
                }
                else {
                    const suffix = getNewLineCharacter(transpileOptions.compilerOptions) + expectedSourceMappingUrlLine;
                    assert.isTrue(output.indexOf(suffix, output.length - suffix.length) !== -1);
                }
            }

        }

        function testCompilerOption(options: CompilerOptions, input?: string, output?: string): void {
            input = input || "x = 0;";
            output = output || `"use strict";\r\nx = 0;\r\n`;
            test(input, {
                expectedOutput: output,
                options: {
                    compilerOptions: Object.assign({ module: ModuleKind.CommonJS, newLine: NewLineKind.CarriageReturnLineFeed }, options),
                    fileName: "input.js",
                    reportDiagnostics: true
                }
            });
        }

        it("Generates no diagnostics with valid inputs", () => {
            // No errors
            test(`var x = 0;`, { options: { compilerOptions: { module: ModuleKind.CommonJS } } });
        });

        it("Generates no diagnostics for missing file references", () => {
            test(`/// <reference path="file2.ts" />
var x = 0;`,
                { options: { compilerOptions: { module: ModuleKind.CommonJS } } });
        });

        it("Generates no diagnostics for missing module imports", () => {
            test(`import {a} from "module2";`,
                { options: { compilerOptions: { module: ModuleKind.CommonJS } } });
        });

        it("Generates expected syntactic diagnostics", () => {
            test(`a b`,
                { options: { compilerOptions: { module: ModuleKind.CommonJS } }, expectedDiagnosticCodes: [1005] }); /// 1005: ';' Expected
        });

        it("Does not generate semantic diagnostics", () => {
            test(`var x: string = 0;`,
                { options: { compilerOptions: { module: ModuleKind.CommonJS } } });
        });

        it("Generates module output", () => {
            test(`var x = 0;`,
                {
                    options: { compilerOptions: { module: ModuleKind.AMD } },
                    expectedOutput: `define(["require", "exports"], function (require, exports) {\r\n    "use strict";\r\n    var x = 0;\r\n});\r\n`
                });
        });

        it("Uses correct newLine character", () => {
            test(`var x = 0;`,
                {
                    options: { compilerOptions: { module: ModuleKind.CommonJS, newLine: NewLineKind.LineFeed } },
                    expectedOutput: `"use strict";\nvar x = 0;\n`
                });
        });

        it("Sets module name", () => {
            const output =
                `System.register("NamedModule", [], function(exports_1, context_1) {\n` +
                `    "use strict";\n` +
                `    var __moduleName = context_1 && context_1.id;\n` +
                `    var x;\n` +
                `    return {\n` +
                `        setters:[],\n` +
                `        execute: function() {\n` +
                `            var x = 1;\n` +
                `        }\n` +
                `    }\n` +
                `});\n`;
            test("var x = 1;",
                {
                    options: { compilerOptions: { module: ModuleKind.System, newLine: NewLineKind.LineFeed }, moduleName: "NamedModule" },
                    expectedOutput: output
                });
        });

        it("No extra errors for file without extension", () => {
            test(`"use strict";\r\nvar x = 0;`, { options: { compilerOptions: { module: ModuleKind.CommonJS }, fileName: "file" } });
        });

        it("Rename dependencies - System", () => {
            const input =
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`;
            const output =
                `System.register(["SomeOtherName"], function(exports_1, context_1) {\n` +
                `    "use strict";\n` +
                `    var __moduleName = context_1 && context_1.id;\n` +
                `    var SomeName_1;\n` +
                `    return {\n` +
                `        setters:[\n` +
                `            function (SomeName_1_1) {\n` +
                `                SomeName_1 = SomeName_1_1;\n` +
                `            }],\n` +
                `        execute: function() {\n` +
                `            use(SomeName_1.foo);\n` +
                `        }\n` +
                `    }\n` +
                `});\n`;

            test(input,
                {
                    options: { compilerOptions: { module: ModuleKind.System, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } },
                    expectedOutput: output
                });
        });

        it("Rename dependencies - AMD", () => {
            const input =
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`;
            const output =
                `define(["require", "exports", "SomeOtherName"], function (require, exports, SomeName_1) {\n` +
                `    "use strict";\n` +
                `    use(SomeName_1.foo);\n` +
                `});\n`;

            test(input,
                {
                    options: { compilerOptions: { module: ModuleKind.AMD, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } },
                    expectedOutput: output
                });
        });

        it("Rename dependencies - UMD", () => {
            const input =
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`;
            const output =
                `(function (factory) {\n` +
                `    if (typeof module === 'object' && typeof module.exports === 'object') {\n` +
                `        var v = factory(require, exports); if (v !== undefined) module.exports = v;\n` +
                `    }\n` +
                `    else if (typeof define === 'function' && define.amd) {\n` +
                `        define(["require", "exports", "SomeOtherName"], factory);\n` +
                `    }\n` +
                `})(function (require, exports) {\n` +
                `    "use strict";\n` +
                `    var SomeName_1 = require("SomeOtherName");\n` +
                `    use(SomeName_1.foo);\n` +
                `});\n`;

            test(input,
                {
                    options: { compilerOptions: { module: ModuleKind.UMD, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } },
                    expectedOutput: output
                });
        });

        it("Transpile with emit decorators and emit metadata", () => {
            const input =
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
                `export {MyClass}; \n`;
            const output =
                `"use strict";\n` +
                `var db_1 = require(\'./db\');\n` +
                `function someDecorator(target) {\n` +
                `    return target;\n` +
                `}\n` +
                `var MyClass = (function () {\n` +
                `    function MyClass(db) {\n` +
                `        this.db = db;\n` +
                `        this.db.doSomething();\n` +
                `    }\n` +
                `    MyClass = __decorate([\n` +
                `        someDecorator, \n` +
                `        __metadata(\'design:paramtypes\', [(typeof (_a = typeof db_1.db !== \'undefined\' && db_1.db) === \'function\' && _a) || Object])\n` +
                `    ], MyClass);\n` +
                `    return MyClass;\n` +
                `    var _a;\n` +
                `}());\n` +
                `exports.MyClass = MyClass;\n`;

            test(input,
                {
                    options: {
                        compilerOptions: {
                            module: ModuleKind.CommonJS,
                            newLine: NewLineKind.LineFeed,
                            noEmitHelpers: true,
                            emitDecoratorMetadata: true,
                            experimentalDecorators: true,
                            target: ScriptTarget.ES5,
                        }
                    },
                    expectedOutput: output
                });
        });

        it("Supports backslashes in file name", () => {
            test("var x", { expectedOutput: `"use strict";\r\nvar x;\r\n`, options: { fileName: "a\\b.ts" }});
        });

        it("transpile file as 'tsx' if 'jsx' is specified", () => {
            const input = `var x = <div/>`;
            const output = `"use strict";\nvar x = React.createElement("div", null);\n`;
            test(input, {
                expectedOutput: output,
                options: { compilerOptions: { jsx: JsxEmit.React, newLine: NewLineKind.LineFeed } }
            });
        });

        it("transpile .js files", () => {
            const input = "const a = 10;";
            const output = `"use strict";\nvar a = 10;\n`;
            test(input, {
                expectedOutput: output,
                options: { compilerOptions: { newLine: NewLineKind.LineFeed, module: ModuleKind.CommonJS }, fileName: "input.js", reportDiagnostics: true }
            });
        });

        it("Supports urls in file name", () => {
            test("var x", { expectedOutput: `"use strict";\r\nvar x;\r\n`, options: { fileName: "http://somewhere/directory//directory2/file.ts" } });
        });

        describe("Works with all compiler options", () => {

            it("Supports setting 'allowJs'", () => {
                testCompilerOption({ allowJs: true });
            });

            it("Supports setting 'allowSyntheticDefaultImports'", () => {
                testCompilerOption({ allowSyntheticDefaultImports: true });
            });

            it("Supports setting 'allowUnreachableCode'", () => {
                testCompilerOption({ allowUnreachableCode: true });
            });

            it("Supports setting 'allowUnusedLabels'", () => {
                testCompilerOption({ allowUnusedLabels: true });
            });

            it("Supports setting 'baseUrl'", () => {
                testCompilerOption({ baseUrl: "./folder/baseUrl" });
            });

            it("Supports setting 'charset'", () => {
                testCompilerOption({ charset: "en-us" });
            });

            it("Supports setting 'declaration'", () => {
                testCompilerOption({ declaration: true });
            });

            it("Supports setting 'declarationDir'", () => {
                testCompilerOption({ declarationDir: "out/declarations" });
            });

            it("Supports setting 'emitBOM'", () => {
                testCompilerOption({ emitBOM: true });
            });

            it("Supports setting 'emitDecoratorMetadata'", () => {
                testCompilerOption({ emitDecoratorMetadata: true, experimentalDecorators: true });
            });

            it("Supports setting 'experimentalDecorators'", () => {
                testCompilerOption({ experimentalDecorators: true });
            });

            it("Supports setting 'forceConsistentCasingInFileNames'", () => {
                testCompilerOption({ forceConsistentCasingInFileNames: true });
            });

            it("Supports setting 'isolatedModules'", () => {
                testCompilerOption({ isolatedModules: true });
            });

            it("Supports setting 'jsx'", () => {
                testCompilerOption({ jsx: 1 });
            });

            it("Supports setting 'lib'", () => {
                testCompilerOption({ lib: ["es2015", "dom"] });
            });

            it("Supports setting 'locale'", () => {
                testCompilerOption({ locale: "en-us" });
            });

            it("Supports setting 'module'", () => {
                testCompilerOption({ module: 1 });
            });

            it("Supports setting 'moduleResolution'", () => {
                testCompilerOption({ moduleResolution: 2 });
            });

            it("Supports setting 'newLine'", () => {
                testCompilerOption({ newLine: 0 });
            });

            it("Supports setting 'noEmit'", () => {
                testCompilerOption({ noEmit: true });
            });

            it("Supports setting 'noEmitHelpers'", () => {
                testCompilerOption({ noEmitHelpers: true });
            });

            it("Supports setting 'noEmitOnError'", () => {
                testCompilerOption({ noEmitOnError: true });
            });

            it("Supports setting 'noErrorTruncation'", () => {
                testCompilerOption({ noErrorTruncation: true });
            });

            it("Supports setting 'noFallthroughCasesInSwitch'", () => {
                testCompilerOption({ noFallthroughCasesInSwitch: true });
            });

            it("Supports setting 'noImplicitAny'", () => {
                testCompilerOption({ noImplicitAny: true });
            });

            it("Supports setting 'noImplicitReturns'", () => {
                testCompilerOption({ noImplicitReturns: true });
            });

            it("Supports setting 'noImplicitThis'", () => {
                testCompilerOption({ noImplicitThis: true });
            });

            it("Supports setting 'noImplicitUseStrict'", () => {
                testCompilerOption({ noImplicitUseStrict: true }, "x;", "x;\r\n");
            });

            it("Supports setting 'noLib'", () => {
                testCompilerOption({ noLib: true });
            });

            it("Supports setting 'noResolve'", () => {
                testCompilerOption({ noResolve: true });
            });

            it("Supports setting 'out'", () => {
                testCompilerOption({ out: "./out" });
            });

            it("Supports setting 'outDir'", () => {
                testCompilerOption({ outDir: "./outDir" });
            });

            it("Supports setting 'outFile'", () => {
                testCompilerOption({ outFile: "./outFile" });
            });

            it("Supports setting 'paths'", () => {
                testCompilerOption({ paths: { "*": ["./generated*"] } });
            });

            it("Supports setting 'preserveConstEnums'", () => {
                testCompilerOption({ preserveConstEnums: true });
            });

            it("Supports setting 'reactNamespace'", () => {
                testCompilerOption({ reactNamespace: "react" });
            });

            it("Supports setting 'removeComments'", () => {
                testCompilerOption({ removeComments: true });
            });

            it("Supports setting 'rootDir'", () => {
                testCompilerOption({ rootDir: "./rootDir" });
            });

            it("Supports setting 'rootDirs'", () => {
                testCompilerOption({ rootDirs: ["./a", "./b"] });
            });

            it("Supports setting 'skipLibCheck'", () => {
                testCompilerOption({ skipLibCheck: true });
            });

            it("Supports setting 'skipDefaultLibCheck'", () => {
                testCompilerOption({ skipDefaultLibCheck: true });
            });

            it("Supports setting 'strictNullChecks'", () => {
                testCompilerOption({ strictNullChecks: true });
            });

            it("Supports setting 'stripInternal'", () => {
                testCompilerOption({ stripInternal: true });
            });

            it("Supports setting 'suppressExcessPropertyErrors'", () => {
                testCompilerOption({ suppressExcessPropertyErrors: true });
            });

            it("Supports setting 'suppressImplicitAnyIndexErrors'", () => {
                testCompilerOption({ suppressImplicitAnyIndexErrors: true });
            });

            it("Supports setting 'target'", () => {
                testCompilerOption({ target: 2 });
            });

            it("Supports setting 'types'", () => {
                testCompilerOption({ types: ["jquery", "jasmine"] });
            });

            it("Supports setting 'typeRoots'", () => {
                testCompilerOption({ typeRoots: ["./folder"] });
            });
        });

        describe("String values for enums", () => {
            it("Accepts strings instead of enum values", () => {
                test(`export const x = 0`, {
                    options: {
                        compilerOptions: {
                            module: <ModuleKind><any>"es6",
                            // Capitalization and spaces ignored
                            target: <ScriptTarget><any>" Es6 "
                        }
                    },
                    expectedOutput: "export const x = 0;\r\n"
                });
            });

            it("Fails on bad value", () => {
                for (const value in [123, {}, ""]) {
                    test(``, {
                        options: { compilerOptions: { module: <ModuleKind><any>value } },
                        expectedDiagnosticCodes: [6046],
                        expectedDiagnosticTexts: ["Argument for '--module' option must be:  'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015'"]
                    });
                }
            });
        });
    });
}

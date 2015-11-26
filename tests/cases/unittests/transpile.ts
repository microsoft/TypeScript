/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe("Transpile", () => {
        
        interface TranspileTestSettings {
            options?: TranspileOptions;
            expectedOutput?: string;
            expectedDiagnosticCodes?: number[];
        }
        
        function checkDiagnostics(diagnostics: Diagnostic[], expectedDiagnosticCodes?: number[]) {
            if(!expectedDiagnosticCodes) {
                return;
            }
            
            for (let i = 0; i < expectedDiagnosticCodes.length; i++) {
                assert.equal(expectedDiagnosticCodes[i], diagnostics[i] && diagnostics[i].code, `Could not find expeced diagnostic.`);
            }
            assert.equal(diagnostics.length, expectedDiagnosticCodes.length, "Resuting diagnostics count does not match expected");            
        }
        
        function test(input: string, testSettings: TranspileTestSettings): void {
            
            let transpileOptions: TranspileOptions = testSettings.options || {};
            if (!transpileOptions.compilerOptions) {
                transpileOptions.compilerOptions = {};
            }
            if(transpileOptions.compilerOptions.newLine === undefined) {
                // use \r\n as default new line
                transpileOptions.compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
            }
            
            let canUseOldTranspile = !transpileOptions.renamedDependencies;  
            
            transpileOptions.reportDiagnostics = true;
            let transpileModuleResult = transpileModule(input, transpileOptions);
            
            checkDiagnostics(transpileModuleResult.diagnostics, testSettings.expectedDiagnosticCodes);
            
            if (testSettings.expectedOutput !== undefined) {
                assert.equal(transpileModuleResult.outputText, testSettings.expectedOutput);
            }
            
            if (canUseOldTranspile) {
                let diagnostics: Diagnostic[] = [];
                let transpileResult = transpile(input, transpileOptions.compilerOptions, transpileOptions.fileName, diagnostics, transpileOptions.moduleName);                
                checkDiagnostics(diagnostics, testSettings.expectedDiagnosticCodes);
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
            let transpileModuleResultWithSourceMap = transpileModule(input, transpileOptions);
            assert.isTrue(transpileModuleResultWithSourceMap.sourceMapText !== undefined);
            
            let expectedSourceMapFileName = removeFileExtension(getBaseFileName(normalizeSlashes(transpileOptions.fileName))) + ".js.map";
            let expectedSourceMappingUrlLine = `//# sourceMappingURL=${expectedSourceMapFileName}`;
                        
            if (testSettings.expectedOutput !== undefined) {
                assert.equal(transpileModuleResultWithSourceMap.outputText, testSettings.expectedOutput + expectedSourceMappingUrlLine);
            }
            else {
                // expected output is not set, just verify that output text has sourceMappingURL as a last line
                let output = transpileModuleResultWithSourceMap.outputText;
                assert.isTrue(output.length >= expectedSourceMappingUrlLine.length);
                if (output.length === expectedSourceMappingUrlLine.length) {
                    assert.equal(output, expectedSourceMappingUrlLine);
                }
                else {
                    let suffix = getNewLineCharacter(transpileOptions.compilerOptions) + expectedSourceMappingUrlLine
                    assert.isTrue(output.indexOf(suffix, output.length - suffix.length) !== -1);
                }
            }       

        }
        
        it("Generates correct compilerOptions diagnostics", () => {
            // Expecting 5047: "Option 'isolatedModules' can only be used when either option'--module' is provided or option 'target' is 'ES6' or higher."
            test(`var x = 0;`, { expectedDiagnosticCodes: [5047] });
        });

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
            let output =
                `System.register("NamedModule", [], function(exports_1) {\n    "use strict";\n    var x;\n` +
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
                })
        });

        it("No extra errors for file without extension", () => {
            test(`"use strict";\r\nvar x = 0;`, { options: { compilerOptions: { module: ModuleKind.CommonJS }, fileName: "file" } });
        });

        it("Rename dependencies - System", () => {
            let input = 
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`
            let output =
                `System.register(["SomeOtherName"], function(exports_1) {\n` +
                `    "use strict";\n` +
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
                `});\n`

            test(input, 
                { 
                    options: { compilerOptions: { module: ModuleKind.System, newLine: NewLineKind.LineFeed }, renamedDependencies: { "SomeName": "SomeOtherName" } }, 
                    expectedOutput: output
                });
        });

        it("Rename dependencies - AMD", () => {
            let input = 
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`
            let output =
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
            let input = 
                `import {foo} from "SomeName";\n` +
                `declare function use(a: any);\n` +
                `use(foo);`
            let output =
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
            let input = 
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
                `export {MyClass}; \n`
            let output =
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
                `})();\n` + 
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
            let input = `var x = <div/>`;
            let output = `"use strict";\nvar x = React.createElement("div", null);\n`;
            test(input, {
                expectedOutput: output,
                options: { compilerOptions: { jsx: JsxEmit.React, newLine: NewLineKind.LineFeed } }
            })
        });
    });
}

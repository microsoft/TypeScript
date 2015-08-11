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
            let diagnostics: Diagnostic[] = [];
            
            let transpileOptions: TranspileOptions = testSettings.options || {}; 
            let transpileResult = transpile(input, transpileOptions.compilerOptions, transpileOptions.fileName, diagnostics, transpileOptions.moduleName);
            
            transpileOptions.reportDiagnostics = true;
            let transpileModuleResult = transpileModule(input, transpileOptions);
            
            checkDiagnostics(diagnostics, testSettings.expectedDiagnosticCodes);
            checkDiagnostics(transpileModuleResult.diagnostics, testSettings.expectedDiagnosticCodes);
            
            if (testSettings.expectedOutput !== undefined) {
                assert.equal(transpileResult, testSettings.expectedOutput);
                assert.equal(transpileModuleResult.outputText, testSettings.expectedOutput);
            }
            
            // check source maps
            if (!transpileOptions.compilerOptions) {
                transpileOptions.compilerOptions = {};
            }
            
            if (!transpileOptions.fileName) {
                transpileOptions.fileName = "file.ts";
            }
            
            transpileOptions.compilerOptions.sourceMap = true;            
            let transpileModuleResultWithSourceMap = transpileModule(input, transpileOptions);
            assert.isTrue(transpileModuleResultWithSourceMap.sourceMapText !== undefined);
            
            let expectedSourceMapFileName = removeFileExtension(transpileOptions.fileName) + ".js.map";
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
                    expectedOutput: `define(["require", "exports"], function (require, exports) {\r\n    var x = 0;\r\n});\r\n`
                });
        });

        it("Uses correct newLine character", () => {
            test(`var x = 0;`, 
                { 
                    options: { compilerOptions: { module: ModuleKind.CommonJS, newLine: NewLineKind.LineFeed } }, 
                    expectedOutput: `var x = 0;\n`
                });
        });

        it("Sets module name", () => {
            let output =
                `System.register("NamedModule", [], function(exports_1) {\n    var x;\n` +
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
            test(`var x = 0;`, { options: { compilerOptions: { module: ModuleKind.CommonJS }, fileName: "file" } });
        });
    });
}

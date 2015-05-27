/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe("Transpile", () => {

        function runTest(input: string, compilerOptions: ts.CompilerOptions = {}, expectedOutput?: string, expectedDiagnosticCodes: number[] = []): void {
            let diagnostics: Diagnostic[] = [];
            let result = transpile(input, compilerOptions, "file.ts", diagnostics);

            assert.equal(diagnostics.length, expectedDiagnosticCodes.length);
            for (let diagnostic of diagnostics) {
                assert.isTrue(expectedDiagnosticCodes.indexOf(diagnostic.code) >= 0, `Found an unexpected diagnostic: ${ diagnostic.code }`);
            }

            if (expectedOutput !== undefined) {
                assert.equal(result, expectedOutput);
            }
        }

        it("Generates correct compilerOptions diagnostics", () => {
            // Expecting 5047: "Option 'isolatedModules' can only be used when either option'--module' is provided or option 'target' is 'ES6' or higher."
            runTest(`var x = 0;`, {}, /*expectedOutput*/ undefined, [5047]);
        });

        it("Generates no diagnostics with valid inputs", () => {
            // No errors
            runTest(`var x = 0;`, { module: ModuleKind.CommonJS }, /*expectedOutput*/ undefined, []);
        });

        it("Generates no diagnostics for missing file references", () => {
            runTest(`/// <reference path="file2.ts" />
var x = 0;`,
                { module: ModuleKind.CommonJS }, /*expectedOutput*/ undefined, []);
        });

        it("Generates no diagnostics for missing module imports", () => {
            runTest(`import {a} from "module2";`,
                { module: ModuleKind.CommonJS }, /*expectedOutput*/ undefined, []);
        });

        it("Generates expected syntactic diagnostics", () => {
            runTest(`a b`,
                { module: ModuleKind.CommonJS }, /*expectedOutput*/ undefined, [1005]); /// 1005: ';' Expected
        });

        it("Does not generate semantic diagnostics", () => {
            runTest(`var x: string = 0;`,
                { module: ModuleKind.CommonJS }, /*expectedOutput*/ undefined, []);
        });

        it("Generates module output", () => {
            runTest(`var x = 0;`, { module: ModuleKind.AMD }, `define(["require", "exports"], function (require, exports) {\r\n    var x = 0;\r\n});\r\n`);
        });

        it("Uses correct newLine character", () => {
            runTest(`var x = 0;`, { module: ModuleKind.CommonJS, newLine: NewLineKind.LineFeed }, `var x = 0;\n`);
        });
    });
}

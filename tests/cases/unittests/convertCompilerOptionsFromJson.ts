/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('convertCompilerOptionsFromJson', () => {
        function assertCompilerOptions(json: any, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            const actualErrors: Diagnostic[] = [];
            const actualCompilerOptions = convertOptionsFromJson<CompilerOptions>(optionDeclarations, json["compilerOptions"], "/apath/", "tsconfig.json", actualErrors);
            
            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify(expectedResult.compilerOptions);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);
            
            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedResult.errors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedResult.errors)}. Actual error: ${JSON.stringify(actualErrors)}.`);
            for (let i = 0; i < actualErrors.length; ++i) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i]; 
                assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
            }
        }
        
        const correctFormatOptions = {
            "compilerOptions": {
                "module": "commonjs",
                "target": "es5",
                "noImplicitAny": false,
                "sourceMap": false,
                "lib": ["es5", "es6.array", "es6.symbol"]
            }
        }
        
        const incorrectLibOption = {
            "compilerOptions": {
                "module": "commonjs",
                "target": "es5",
                "noImplicitAny": false,
                "sourceMap": false,
                "lib": ["es5", "es6.array", "es8"]
            }
        }
        
        it("Convert correctly format JSON to compiler-options ", () => {
            assertCompilerOptions(correctFormatOptions, {
                compilerOptions: <CompilerOptions>{
                    module: ModuleKind.CommonJS,
                    target: ScriptTarget.ES5,
                    noImplicitAny: false,
                    sourceMap: false,
                    lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.d.ts"]
                },
                errors: <Diagnostic[]>[]
            });
        });
        
        it("Convert incorrectly option of libs to compiler-options ", () => {
            debugger;
            assertCompilerOptions(incorrectLibOption, {
                compilerOptions: <CompilerOptions>{
                    module: ModuleKind.CommonJS,
                    target: ScriptTarget.ES5,
                    noImplicitAny: false,
                    sourceMap: false,
                    lib: ["lib.es5.d.ts", "lib.es6.array.d.ts"]
                },
                errors: [{
                    file: undefined,
                    start: 0,
                    length: 0,
                    messageText: "",
                    code: Diagnostics.Arguments_for_library_option_must_be_Colon_0.code,
                    category: Diagnostics.Arguments_for_library_option_must_be_Colon_0.category
                }]
            });
        });
    });
}

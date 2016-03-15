/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('convertCompilerOptionsFromJson', () => {
        function assertCompilerOptions(json: any, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            const actualErrors: Diagnostic[] = [];
            const actualCompilerOptions: CompilerOptions = convertCompilerOptionsFromJson(optionDeclarations, json["compilerOptions"], "/apath/", configFileName, actualErrors);
            
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
        
        // tsconfig.json tests
        it("Convert correctly format tsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", "es6.array", "es6.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.d.ts"]
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });

        it("Convert correctly format tsconfig.json with allowJs is false to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "allowJs": false,
                        "lib": ["es5", "es6.array", "es6.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.d.ts"]
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });
        
        it("Convert incorrectly option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", "es6.array", "es8"]
                    }
                }, "tsconfig.json",
                {
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
                }
            );
        });

        it("Convert incorrectly format tsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "modu": "commonjs",
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {},
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "",
                        code: Diagnostics.Unknown_compiler_option_0.code,
                        category: Diagnostics.Unknown_compiler_option_0.category
                    }]
                }
            );
        });

        it("Convert default tsconfig.json to compiler-options ", () => {
            assertCompilerOptions({}, "tsconfig.json",
                {
                    compilerOptions: {} as CompilerOptions,
                    errors: <Diagnostic[]>[]
                }
            );
        });

        // jsconfig.json
        it("Convert correctly format jsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", "es6.array", "es6.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: true,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.d.ts"]
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });

        it("Convert correctly format jsconfig.json with allowJs is false to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "allowJs": false,
                        "lib": ["es5", "es6.array", "es6.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: false,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.d.ts"]
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });

        it("Convert incorrectly option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", "es6.array", "es8"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: true,
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
                }
            );
        }); 

        it("Convert incorrectly format jsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "modu": "commonjs",
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: 
                    {
                        allowJs: true
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "",
                        code: Diagnostics.Unknown_compiler_option_0.code,
                        category: Diagnostics.Unknown_compiler_option_0.category
                    }]
                }
            );
        });

        it("Convert default jsconfig.json to compiler-options ", () => {
            assertCompilerOptions({}, "jsconfig.json",
                {
                    compilerOptions: 
                    {
                        allowJs: true
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });
    });
}

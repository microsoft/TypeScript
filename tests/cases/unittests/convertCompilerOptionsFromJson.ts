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
                assert.equal(actualError.code, expectedError.code);
                assert.equal(actualError.category, expectedError.category);
                assert.equal(actualError.messageText, expectedError.messageText);
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
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
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
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });

        it("Convert incorrectly option of jsx to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "jsx": ""
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--jsx' option must be:  'preserve', 'react'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrectly option of module to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--module' option must be:  'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrectly option of newLine to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "newLine": "",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--newLine' option must be:  'crlf', 'lf'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrectly option of target to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "target": "",
                        "noImplicitAny": false,
                        "sourceMap": false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--target' option must be:  'es3', 'es5', 'es6', 'es2015'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrectly option of module-resolution to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "moduleResolution": "",
                        "noImplicitAny": false,
                        "sourceMap": false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--moduleResolution' option must be:  'node', 'classic'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
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
                        messageText: "Unknown compiler option 'modu'.",
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
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: true,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
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
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: false,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: <Diagnostic[]>[]
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
                        messageText: "Unknown compiler option 'modu'.",
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

/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\commandLineParser.ts" />

namespace ts {
    describe("convertCompilerOptionsFromJson", () => {
        function assertCompilerOptions(json: any, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            const { options: actualCompilerOptions, errors: actualErrors} = convertCompilerOptionsFromJson(json["compilerOptions"], "/apath/", configFileName);

            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify(expectedResult.compilerOptions);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);

            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedResult.errors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedResult.errors)}. Actual error: ${JSON.stringify(actualErrors)}.`);
            for (let i = 0; i < actualErrors.length; i++) {
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
                        "lib": ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
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
                        "lib": ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });

        it("Convert incorrect option of jsx to compiler-options ", () => {
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

        it("Convert incorrect option of module to compiler-options ", () => {
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

        it("Convert incorrect option of newLine to compiler-options ", () => {
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

        it("Convert incorrect option of target to compiler-options ", () => {
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

        it("Convert incorrect option of module-resolution to compiler-options ", () => {
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

        it("Convert incorrect option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", "es2015.core", "incorrectLib"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts"]
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'dom', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["es5", ""]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts"]
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'dom', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": [""]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: []
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'dom', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert trailing-whitespace string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": ["   "]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: []
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'dom', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory'",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    "compilerOptions": {
                        "module": "commonjs",
                        "target": "es5",
                        "noImplicitAny": false,
                        "sourceMap": false,
                        "lib": []
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: []
                    },
                    errors: []
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
                        "lib": ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: true,
                        maxNodeModuleJsDepth: 2,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
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
                        "lib": ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: <CompilerOptions>{
                        allowJs: false,
                        maxNodeModuleJsDepth: 2,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
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
                        allowJs: true,
                        maxNodeModuleJsDepth: 2
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
                        allowJs: true,
                        maxNodeModuleJsDepth: 2
                    },
                    errors: <Diagnostic[]>[]
                }
            );
        });
    });
}

namespace ts {
    describe("unittests:: config:: convertCompilerOptionsFromJson", () => {
        const formatDiagnosticHost: FormatDiagnosticsHost = {
            getCurrentDirectory: () => "/apath/",
            getCanonicalFileName: createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ true),
            getNewLine: () => "\n"
        };

        interface ExpectedResultWithParsingSuccess {
            compilerOptions: CompilerOptions;
            errors: readonly Diagnostic[];
        }

        interface ExpectedResultWithParsingFailure {
            compilerOptions: CompilerOptions;
            hasParseErrors: true;
        }

        type ExpectedResult = ExpectedResultWithParsingSuccess | ExpectedResultWithParsingFailure;

        function isExpectedResultWithParsingFailure(expectedResult: ExpectedResult): expectedResult is ExpectedResultWithParsingFailure {
            return !!(expectedResult as ExpectedResultWithParsingFailure).hasParseErrors;
        }

        function assertCompilerOptions(json: any, configFileName: string, expectedResult: ExpectedResultWithParsingSuccess) {
            assertCompilerOptionsWithJson(json, configFileName, expectedResult);
            assertCompilerOptionsWithJsonNode(json, configFileName, expectedResult);
        }

        function assertCompilerOptionsWithJson(json: any, configFileName: string, expectedResult: ExpectedResultWithParsingSuccess) {
            const { options: actualCompilerOptions, errors: actualErrors } = convertCompilerOptionsFromJson(json.compilerOptions, "/apath/", configFileName);

            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify({ ...expectedResult.compilerOptions, configFilePath: configFileName });
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);

            verifyErrors(actualErrors, expectedResult.errors, /*ignoreLocation*/ true);
        }

        function assertCompilerOptionsWithJsonNode(json: any, configFileName: string, expectedResult: ExpectedResultWithParsingSuccess) {
            assertCompilerOptionsWithJsonText(JSON.stringify(json), configFileName, expectedResult);
        }

        function assertCompilerOptionsWithJsonText(fileText: string, configFileName: string, expectedResult: ExpectedResult) {
            const result = parseJsonText(configFileName, fileText);
            assert(!!result.endOfFileToken);
            assert.equal(!!result.parseDiagnostics.length, isExpectedResultWithParsingFailure(expectedResult));
            const host: ParseConfigHost = new fakes.ParseConfigHost(new vfs.FileSystem(/*ignoreCase*/ false, { cwd: "/apath/" }));
            const { options: actualCompilerOptions, errors: actualParseErrors } = parseJsonSourceFileConfigFileContent(result, host, "/apath/", /*existingOptions*/ undefined, configFileName);
            expectedResult.compilerOptions.configFilePath = configFileName;

            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify(expectedResult.compilerOptions);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);
            assert.equal(actualCompilerOptions.configFile, result);

            if (!isExpectedResultWithParsingFailure(expectedResult)) {
                verifyErrors(actualParseErrors.filter(error => error.code !== Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code), expectedResult.errors);
            }
        }

        function verifyErrors(actualErrors: Diagnostic[], expectedErrors: readonly Diagnostic[], ignoreLocation?: boolean) {
            assert.isTrue(expectedErrors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedErrors.map(getDiagnosticString), undefined, " ")}. Actual error: ${JSON.stringify(actualErrors.map(getDiagnosticString), undefined, " ")}.`);
            for (let i = 0; i < actualErrors.length; i++) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i];

                assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
                if (!ignoreLocation) {
                    assert(actualError.file);
                    assert(actualError.start);
                    assert(actualError.length);
                }
            }

            function getDiagnosticString(diagnostic: Diagnostic) {
                if (ignoreLocation) {
                    const { file, ...rest } = diagnostic;
                    diagnostic = { file: undefined, ...rest };
                }
                return formatDiagnostic(diagnostic, formatDiagnosticHost);
            }
        }

        // tsconfig.json tests
        it("Convert correctly format tsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
                    },
                    errors: []
                }
            );
        });

        it("Convert correctly format tsconfig.json with allowJs is false to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                        lib: ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
                    },
                    errors: []
                }
            );
        });

        it("Convert incorrect option of jsx to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        jsx: ""
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--jsx' option must be: 'preserve', 'react-native', 'react'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrect option of module to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'esnext'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrect option of newLine to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        newLine: "",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--newLine' option must be: 'crlf', 'lf'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrect option of target to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        target: "",
                        noImplicitAny: false,
                        sourceMap: false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'esnext'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrect option of module-resolution to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        moduleResolution: "",
                        noImplicitAny: false,
                        sourceMap: false,
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        noImplicitAny: false,
                        sourceMap: false,
                    },
                    errors: [{
                        file: undefined,
                        start: 0,
                        length: 0,
                        messageText: "Argument for '--moduleResolution' option must be: 'node', 'classic'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert incorrect option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["es5", "es2015.core", "incorrectLib"]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.intl', 'esnext.bigint', 'esnext.bigint', 'esnext.string', 'esnext.promise'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["es5", ""]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: [""]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert trailing-whitespace string option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["   "]
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise'.",
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category
                    }]
                }
            );
        });

        it("Convert empty option of libs to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: []
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
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
                    compilerOptions: {
                        modu: "commonjs",
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
                    compilerOptions: {},
                    errors: []
                }
            );
        });

        it("Convert negative numbers in tsconfig.json ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        allowJs: true,
                        maxNodeModuleJsDepth: -1
                    }
                }, "tsconfig.json",
                {
                    compilerOptions: {
                        allowJs: true,
                        maxNodeModuleJsDepth: -1
                    },
                    errors: []
                }
            );
        });

        // jsconfig.json
        it("Convert correctly format jsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: {
                        allowJs: true,
                        maxNodeModuleJsDepth: 2,
                        allowSyntheticDefaultImports: true,
                        skipLibCheck: true,
                        noEmit: true,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
                    },
                    errors: []
                }
            );
        });

        it("Convert correctly format jsconfig.json with allowJs is false to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        module: "commonjs",
                        target: "es5",
                        noImplicitAny: false,
                        sourceMap: false,
                        allowJs: false,
                        lib: ["es5", "es2015.core", "es2015.symbol"]
                    }
                }, "jsconfig.json",
                {
                    compilerOptions: {
                        allowJs: false,
                        maxNodeModuleJsDepth: 2,
                        allowSyntheticDefaultImports: true,
                        skipLibCheck: true,
                        noEmit: true,
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        noImplicitAny: false,
                        sourceMap: false,
                        lib: ["lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.symbol.d.ts"]
                    },
                    errors: []
                }
            );
        });

        it("Convert incorrectly format jsconfig.json to compiler-options ", () => {
            assertCompilerOptions(
                {
                    compilerOptions: {
                        modu: "commonjs",
                    }
                }, "jsconfig.json",
                {
                    compilerOptions:
                    {
                        allowJs: true,
                        maxNodeModuleJsDepth: 2,
                        allowSyntheticDefaultImports: true,
                        skipLibCheck: true,
                        noEmit: true
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
                        maxNodeModuleJsDepth: 2,
                        allowSyntheticDefaultImports: true,
                        skipLibCheck: true,
                        noEmit: true
                    },
                    errors: []
                }
            );
        });

        it("Convert tsconfig options when there are multiple invalid strings", () => {
            assertCompilerOptionsWithJsonText(`{
  "compilerOptions": {
    "target": "<%- options.useTsWithBabel ? 'esnext' : 'es5' %>",
    "module": "esnext",
    <%_ if (options.classComponent) { _%>
    "experimentalDecorators": true,
    <%_ } _%>
    "sourceMap": true,
    "types": [
      "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
      <%_ if (hasMocha) { _%>
      "mocha",
      "chai"
      <%_ } else if (hasJest) { _%>
      "jest"
      <%_ } _%>
    ]
  }
}
`,
            "tsconfig.json",
            {
                compilerOptions: {
                    target: undefined,
                    module: ModuleKind.ESNext,
                    experimentalDecorators: true,
                },
                hasParseErrors: true
            });
        });
    });
}

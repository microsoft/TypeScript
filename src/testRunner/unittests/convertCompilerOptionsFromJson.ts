namespace ts {
    describe("convertCompilerOptionsFromJson", () => {
        const formatDiagnosticHost: FormatDiagnosticsHost = {
            getCurrentDirectory: () => "/apath/",
            getCanonicalFileName: createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ true),
            getNewLine: () => "\n"
        };
        function assertCompilerOptions(json: any, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            assertCompilerOptionsWithJson(json, configFileName, expectedResult);
            assertCompilerOptionsWithJsonNode(json, configFileName, expectedResult);
        }

        function assertCompilerOptionsWithJson(json: any, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            const { options: actualCompilerOptions, errors: actualErrors} = convertCompilerOptionsFromJson(json.compilerOptions, "/apath/", configFileName);

            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify({ ...expectedResult.compilerOptions, configFilePath: configFileName });
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

        function assertCompilerOptionsWithJsonNode(json: any, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: Diagnostic[] }) {
            assertCompilerOptionsWithJsonText(JSON.stringify(json), configFileName, expectedResult);
        }

        function assertCompilerOptionsWithJsonText(fileText: string, configFileName: string, expectedResult: { compilerOptions: CompilerOptions, errors: (Diagnostic | string)[] }) {
            const result = parseJsonText(configFileName, fileText);
            assert(!!result.endOfFileToken);
            const host: ParseConfigHost = new fakes.ParseConfigHost(new vfs.FileSystem(/*ignoreCase*/ false, { cwd: "/apath/" }));
            const { options: actualCompilerOptions, errors: actualParseErrors } = parseJsonSourceFileConfigFileContent(result, host, "/apath/", /*existingOptions*/ undefined, configFileName);
            expectedResult.compilerOptions.configFilePath = configFileName;

            const parsedCompilerOptions = JSON.stringify(actualCompilerOptions);
            const expectedCompilerOptions = JSON.stringify(expectedResult.compilerOptions);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);
            assert.equal(actualCompilerOptions.configFile, result);

            const actualErrors = (result.parseDiagnostics as Diagnostic[]).concat(actualParseErrors.filter(error => error.code !== Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code));
            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedErrors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedErrors.map(e => isString(e) ? e : getDiagnosticString(e)), undefined, " ")}. Actual error: ${JSON.stringify(actualErrors.map(getDiagnosticString), undefined, " ")}.`);
            for (let i = 0; i < actualErrors.length; i++) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i];
                if (isString(expectedError)) {
                    assert.equal(getDiagnosticString(actualError), expectedError);
                }
                else {
                    assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                    assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
                    assert(actualError.file);
                    assert(actualError.start);
                    assert(actualError.length);
                }
            }
        }

        function getDiagnosticString(diagnostic: Diagnostic) {
            return formatDiagnostic(diagnostic, formatDiagnosticHost);
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
                        messageText: "Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'esnext'.",
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl'.",
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl'.",
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl'.",
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
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl'.",
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
`, "tsconfig.json",
                {
                    compilerOptions: {
                        target: undefined,
                        module: ModuleKind.ESNext,
                        types: []
                    },
                    errors: [
                        "tsconfig.json(5,5): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(5,6): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(5,9): error TS1005: ':' expected.\n",
                        "tsconfig.json(5,20): error TS1005: ',' expected.\n",
                        "tsconfig.json(5,41): error TS1109: Expression expected.\n",
                        "tsconfig.json(6,29): error TS1005: ';' expected.\n",
                        "tsconfig.json(7,5): error TS1109: Expression expected.\n",
                        "tsconfig.json(7,6): error TS1109: Expression expected.\n",
                        "tsconfig.json(7,11): error TS1005: ',' expected.\n",
                        "tsconfig.json(7,12): error TS1005: ':' expected.\n",
                        "tsconfig.json(7,13): error TS1109: Expression expected.\n",
                        "tsconfig.json(8,16): error TS1005: ',' expected.\n",
                        "tsconfig.json(8,22): error TS1005: ':' expected.\n",
                        "tsconfig.json(10,21): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,23): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,36): error TS1005: ',' expected.\n",
                        "tsconfig.json(10,50): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,51): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,52): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,53): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,54): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,56): error TS1109: Expression expected.\n",
                        "tsconfig.json(10,58): error TS1005: ',' expected.\n",
                        "tsconfig.json(10,59): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(11,7): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(11,8): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(11,11): error TS1005: ':' expected.\n",
                        "tsconfig.json(11,29): error TS1109: Expression expected.\n",
                        "tsconfig.json(14,8): error TS1109: Expression expected.\n",
                        "tsconfig.json(14,13): error TS1005: ',' expected.\n",
                        "tsconfig.json(14,18): error TS1005: ':' expected.\n",
                        "tsconfig.json(14,35): error TS1109: Expression expected.\n",
                        "tsconfig.json(16,8): error TS1109: Expression expected.\n",
                        "tsconfig.json(16,13): error TS1005: ',' expected.\n",
                        "tsconfig.json(16,14): error TS1005: ':' expected.\n",
                        "tsconfig.json(16,15): error TS1109: Expression expected.\n",
                        "tsconfig.json(17,5): error TS1109: Expression expected.\n",
                        "tsconfig.json(3,15): error TS6046: Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'esnext'.\n",
                        "tsconfig.json(5,7): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(5,7): error TS5023: Unknown compiler option '_'.\n",
                        "tsconfig.json(5,8): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n",
                        "tsconfig.json(5,9): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(7,11): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(7,11): error TS5023: Unknown compiler option '_'.\n",
                        "tsconfig.json(7,12): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n",
                        "tsconfig.json(8,18): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(8,18): error TS5023: Unknown compiler option 'true'.\n",
                        "tsconfig.json(8,22): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n",
                        "tsconfig.json(10,7): error TS5024: Compiler option 'types' requires a value of type string.\n",
                        "tsconfig.json(10,23): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(11,9): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(11,9): error TS5023: Unknown compiler option '_'.\n",
                        "tsconfig.json(11,10): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n",
                        "tsconfig.json(11,11): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(14,13): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(14,13): error TS5023: Unknown compiler option 'else'.\n",
                        "tsconfig.json(14,17): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n",
                        "tsconfig.json(14,18): error TS1136: Property assignment expected.\n",
                        "tsconfig.json(16,13): error TS1327: String literal with double quotes expected.\n",
                        "tsconfig.json(16,13): error TS5023: Unknown compiler option '_'.\n",
                        "tsconfig.json(16,14): error TS1328: Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.\n"
                    ]
                }
            );
        });
    });
}

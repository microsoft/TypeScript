/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\commandLineParser.ts" />

namespace ts {
    describe("parseCommandLine", () => {

        function assertParseResult(commandLine: string[], expectedParsedCommandLine: ParsedCommandLine) {
            const parsed = parseCommandLine(commandLine);
            const parsedCompilerOptions = JSON.stringify(parsed.options);
            const expectedCompilerOptions = JSON.stringify(expectedParsedCommandLine.options);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);

            const parsedErrors = parsed.errors;
            const expectedErrors = expectedParsedCommandLine.errors;
            assert.isTrue(parsedErrors.length === expectedErrors.length, `Expected error: ${JSON.stringify(expectedErrors)}. Actual error: ${JSON.stringify(parsedErrors)}.`);
            for (let i = 0; i < parsedErrors.length; i++) {
                const parsedError = parsedErrors[i];
                const expectedError = expectedErrors[i];
                assert.equal(parsedError.code, expectedError.code);
                assert.equal(parsedError.category, expectedError.category);
                assert.equal(parsedError.messageText, expectedError.messageText);
            }

            const parsedFileNames = parsed.fileNames;
            const expectedFileNames = expectedParsedCommandLine.fileNames;
            assert.isTrue(parsedFileNames.length === expectedFileNames.length, `Expected fileNames: [${JSON.stringify(expectedFileNames)}]. Actual fileNames: [${JSON.stringify(parsedFileNames)}].`);
            for (let i = 0; i < parsedFileNames.length; i++) {
                const parsedFileName = parsedFileNames[i];
                const expectedFileName = expectedFileNames[i];
                assert.equal(parsedFileName, expectedFileName);
            }
        }

        it("Parse single option of library flag ", () => {
            // --lib es6 0.ts
            assertParseResult(["--lib", "es6", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es2015.d.ts"]
                    }
                });
        });

        it("Parse multiple options of library flags ", () => {
            // --lib es5,es2015.symbol.wellknown 0.ts
            assertParseResult(["--lib", "es5,es2015.symbol.wellknown", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es2015.symbol.wellknown.d.ts"]
                    }
                });
        });

        it("Parse invalid option of library flags ", () => {
            // --lib es5,invalidOption 0.ts
            assertParseResult(["--lib", "es5,invalidOption", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.asynciterable'.",
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });
        it("Parse empty options of --jsx ", () => {
            // 0.ts --jsx
            assertParseResult(["0.ts", "--jsx"],
                {
                    errors: [{
                        messageText: "Compiler option 'jsx' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--jsx' option must be: 'preserve', 'react-native', 'react'.",
                            category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --module ", () => {
            // 0.ts --
            assertParseResult(["0.ts", "--module"],
                {
                    errors: [{
                        messageText: "Compiler option 'module' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'esnext'.",
                            category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --newLine ", () => {
            // 0.ts --newLine
            assertParseResult(["0.ts", "--newLine"],
                {
                    errors: [{
                        messageText: "Compiler option 'newLine' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--newLine' option must be: 'crlf', 'lf'.",
                            category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --target ", () => {
            // 0.ts --target
            assertParseResult(["0.ts", "--target"],
                {
                    errors: [{
                        messageText: "Compiler option 'target' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'esnext'.",
                            category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --moduleResolution ", () => {
            // 0.ts --moduleResolution
            assertParseResult(["0.ts", "--moduleResolution"],
                {
                    errors: [{
                        messageText: "Compiler option 'moduleResolution' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--moduleResolution' option must be: 'node', 'classic'.",
                            category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --lib ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--lib"],
                {
                    errors: [{
                        messageText: "Compiler option 'lib' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts"],
                    options: {
                        lib: []
                    }
                });
        });

        it("Parse empty string of --lib ", () => {
            // 0.ts --lib
            // This test is an error because the empty string is falsey
            assertParseResult(["0.ts", "--lib", ""],
                {
                    errors: [{
                        messageText: "Compiler option 'lib' expects an argument.",
                        category: Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts"],
                    options: {
                        lib: []
                    }
                });
        });

        it("Parse immediately following command line argument of --lib ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--lib", "--sourcemap"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: [],
                        sourceMap: true
                    }
                });
        });

        it("Parse --lib option with extra comma ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5,", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.asynciterable'.",
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["es7", "0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse --lib option with trailing white-space ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5, ", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'esnext', 'dom', 'dom.iterable', 'webworker', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.promise', 'es2018.regexp', 'esnext.array', 'esnext.asynciterable'.",
                        category: Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: Diagnostics.Argument_for_0_option_must_be_Colon_1.code,
                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["es7", "0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse multiple compiler flags with input files at the end", () => {
            // --lib es5,es2015.symbol.wellknown --target es5 0.ts
            assertParseResult(["--lib", "es5,es2015.symbol.wellknown", "--target", "es5", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es2015.symbol.wellknown.d.ts"],
                        target: ScriptTarget.ES5,
                    }
                });
        });

        it("Parse multiple compiler flags with input files in the middle", () => {
            // --module commonjs --target es5 0.ts --lib es5,es2015.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,es2015.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts", "lib.es2015.symbol.wellknown.d.ts"],
                    }
                });
        });

        it("Parse multiple library compiler flags ", () => {
            // --module commonjs --target es5 --lib es5 0.ts --library es2015.array,es2015.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es2015.core, es2015.symbol.wellknown "],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ModuleKind.CommonJS,
                        target: ScriptTarget.ES5,
                        lib: ["lib.es2015.core.d.ts", "lib.es2015.symbol.wellknown.d.ts"],
                    }
                });
        });

        it("Parse explicit boolean flag value", () => {
            assertParseResult(["--strictNullChecks", "false", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        strictNullChecks: false,
                    }
                });
        });

        it("Parse non boolean argument after boolean flag", () => {
            assertParseResult(["--noImplicitAny", "t", "0.ts"],
                {
                    errors: [],
                    fileNames: ["t", "0.ts"],
                    options: {
                        noImplicitAny: true,
                    }
                });
        });

        it("Parse implicit boolean flag value", () => {
            assertParseResult(["--strictNullChecks"],
                {
                    errors: [],
                    fileNames: [],
                    options: {
                        strictNullChecks: true,
                    }
                });
        });
    });
}

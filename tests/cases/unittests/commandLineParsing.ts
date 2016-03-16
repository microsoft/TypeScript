/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('parseCommandLine', () => {

        function assertParseResult(commandLine: string[], expectedParsedCommandLine: ts.ParsedCommandLine) {
            const parsed = ts.parseCommandLine(commandLine);
            const parsedCompilerOptions = JSON.stringify(parsed.options);
            const expectedCompilerOptions = JSON.stringify(expectedParsedCommandLine.options);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);

            const parsedErrors = parsed.errors;
            const expectedErrors = expectedParsedCommandLine.errors;
            assert.isTrue(parsedErrors.length === expectedErrors.length, `Expected error: ${JSON.stringify(expectedErrors)}. Actual error: ${JSON.stringify(parsedErrors)}.`);
            for (let i = 0; i < parsedErrors.length; ++i) {
                const parsedError = parsedErrors[i];
                const expectedError = expectedErrors[i]; 
                assert.equal(parsedError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(parsedError.code)}.`);
                assert.equal(parsedError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(parsedError.category)}.`);
            }

            const parsedFileNames = parsed.fileNames;
            const expectedFileNames = expectedParsedCommandLine.fileNames;
            assert.isTrue(parsedFileNames.length === expectedFileNames.length, `Expected fileNames: [${JSON.stringify(expectedFileNames)}]. Actual fileNames: [${JSON.stringify(parsedFileNames)}].`);
            for (let i = 0; i < parsedFileNames.length; ++i) {
                const parsedFileName = parsedFileNames[i];
                const expectedFileName = expectedFileNames[i]; 
                assert.equal(parsedFileName, expectedFileName, `Expected filename: ${JSON.stringify(expectedFileName)}. Actual fileName: ${JSON.stringify(parsedFileName)}.`);
            }
        }

        it("Parse single option of library flag ", () => {
            // --lib es6 0.ts
            assertParseResult(["--lib", "es6", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es6.d.ts"]
                    }
                });
        });

        it("Parse multiple options of library flags ", () => {
            // --lib es5,es6.symbol.wellknown 0.ts
            assertParseResult(["--lib", "es5,es6.symbol.wellknown", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"]
                    }
                });
        });

        it("Parse unavailable options of library flags ", () => {
            // --lib es5,es7 0.ts
            assertParseResult(["--lib", "es5,es8", "0.ts"],
                {
                    errors: [{
                        messageText: "",
                        category: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.category,
                        code: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.code,

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

        it("Parse incorrect form of library flags ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5,", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "",
                        category: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.category,
                        code: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.code,

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

        it("Parse incorrect form of library flags with trailing white-space ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5, ", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "",
                        category: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.category,
                        code: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.code,

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
            // --lib es5,es6.symbol.wellknown --target es5 0.ts
            assertParseResult(["--lib", "es5,es6.symbol.wellknown", "--target", "es5", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                        target: ts.ScriptTarget.ES5,
                    }
                });
        });

        it("Parse multiple compiler flags with input files in the middle", () => {
            // --module commonjs --target es5 0.ts --lib es5,es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                    }
                });
        });

        it("Parse incorrect form of multiple compiler flags with input files in the middle", () => {
            // --module commonjs --target es5 0.ts --lib es5, es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,", "es6.symbol.wellknown"],
                {
                    errors: [{
                        messageText: "",
                        category: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.category,
                        code: ts.Diagnostics.Arguments_for_library_option_must_be_Colon_0.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts", "es6.symbol.wellknown"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts"],
                    }
                });
        });

        it("Parse multiple library compiler flags ", () => {
            // --module commonjs --target es5 --lib es5 0.ts --library es6.array,es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es6.array,es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es6.array.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                    }
                });
        });
    });
}

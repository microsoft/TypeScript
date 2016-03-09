/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('parseCommandLine', () => {

        function assertParseResult(commandLine: string[], expectedParsedCommandLine: ts.ParsedCommandLine) {
            const parsed = ts.parseCommandLine(commandLine);
            assert.equal(JSON.stringify(parsed.options), JSON.stringify(expectedParsedCommandLine.options));

            const parsedErrors = parsed.errors;
            const expectedErrors = expectedParsedCommandLine.errors;
            assert.isTrue(parsedErrors.length === expectedErrors.length, `Expected error: ${expectedErrors}. Actual error: ${parsedErrors}.`);
            for (let i = 0; i < parsedErrors.length; ++i) {
                const parsedError = parsedErrors[i];
                const expectedError = expectedErrors[i]; 
                assert.equal(parsedError.code, expectedError.code, `Expected error-code: ${expectedError.code}. Actual error-code: ${parsedError.code}.`);
                assert.equal(parsedError.category, expectedError.category, `Expected error-category: ${expectedError.category}. Actual error-category: ${parsedError.category}.`);
            }

            const parsedFileNames = parsed.fileNames;
            const expectedFileNames = expectedParsedCommandLine.fileNames;
            assert.isTrue(parsedFileNames.length === expectedFileNames.length, `Expected fileNames: [${expectedFileNames}]. Actual fileNames: [${parsedFileNames}].`);
            for (let i = 0; i < parsedFileNames.length; ++i) {
                const parsedFileName = parsedFileNames[i];
                const expectedFileName = expectedFileNames[i]; 
                assert.equal(parsedFileName, expectedFileName, `Expected filename: ${expectedFileName}. Actual fileName: ${parsedFileName}.`);
            }
        }

        it("Parse single option of lib flag ", () => {
            // --library es6 0.ts
            assertParseResult(["--lib", "es6", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es6.d.ts"]
                    }
                });
        });

        it("Parse multiple options of lib flag ", () => {
            // --library es5,es6.symbol.wellknown 0.ts
            assertParseResult(["--lib", "es5,es6.symbol.wellknown", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"]
                    }
                });
        });

        it("Parse unavailable options of lib flag ", () => {
            // --library es5,es7 0.ts
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

        it("Parse incorrect form of lib flag ", () => {
            // --library es5, es7 0.ts
            assertParseResult(["--lib", "es5,", "es7", "0.ts"],
                {
                    errors: [],
                    fileNames: ["es7", "0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse multiple compiler flags with input files at the end", () => {
            // --library es5,es6.symbol.wellknown --target es5 0.ts
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
            // --module commonjs --target es5 0.ts --library es5,es6.symbol.wellknown
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
            // --module commonjs --target es5 0.ts --library es5, es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,", "es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts", "es6.symbol.wellknown"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts"],
                    }
                });
        });

        it("Parse multiple lib compiler flags ", () => {
            // --module commonjs --target es5 --library es5 0.ts --library es6.array,es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es6.array,es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                    }
                });
        });

        it("Parse lib compiler flags and noLib compiler flag", () => {
            // --lib es5,es6.array --nolib
            assertParseResult(["--lib", "es5,es6.array", "--nolib", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.array.d.ts"],
                        noLib: true,
                    }
                });
        });
    });
}

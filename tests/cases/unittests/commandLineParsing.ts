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
                assert.equal(parsedError.code, expectedError.code);
                assert.equal(parsedError.category, expectedError.category);
                assert.equal(parsedError.messageText, expectedError.messageText);
            }

            const parsedFileNames = parsed.fileNames;
            const expectedFileNames = expectedParsedCommandLine.fileNames;
            assert.isTrue(parsedFileNames.length === expectedFileNames.length, `Expected fileNames: [${JSON.stringify(expectedFileNames)}]. Actual fileNames: [${JSON.stringify(parsedFileNames)}].`);
            for (let i = 0; i < parsedFileNames.length; ++i) {
                const parsedFileName = parsedFileNames[i];
                const expectedFileName = expectedFileNames[i]; 
                assert.equal(parsedFileName, expectedFileName);
            }
        }

        it("Parse empty options of --jsx ", () => {
            // 0.ts --jsx
            assertParseResult(["0.ts", "--jsx"],
                {
                    errors: [{
                        messageText: "Compiler option 'jsx' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--jsx' option must be:  'preserve', 'react'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

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
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--module' option must be:  'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015'", 
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

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
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--newLine' option must be:  'crlf', 'lf'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

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
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--target' option must be:  'es3', 'es5', 'es6', 'es2015'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

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
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--moduleResolution' option must be:  'node', 'classic'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse multiple compiler flags with input files at the end", () => {
            // --module commonjs --target es5 0.ts
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                    }
                });
        });

        it("Parse multiple compiler flags with input files in the middle", () => {
            // --module commonjs --target es5 0.ts --noImplicitAny
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--noImplicitAny"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        noImplicitAny: true,
                    }
                });
        });
    });
}

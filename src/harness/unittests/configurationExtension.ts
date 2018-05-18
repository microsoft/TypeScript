/// <reference path="../harness.ts" />
/// <reference path="../vfs.ts" />
/// <reference path="../compiler.ts" />

namespace ts {
    function createFileSystem(ignoreCase: boolean, cwd: string, root: string) {
        return new vfs.FileSystem(ignoreCase, {
            cwd,
            files: {
                [root]: {
                    "dev/tsconfig.json": JSON.stringify({
                        extends: "./configs/base",
                        files: [
                            "main.ts",
                            "supplemental.ts"
                        ]
                    }),
                    "dev/tsconfig.nostrictnull.json": JSON.stringify({
                        extends: "./tsconfig",
                        compilerOptions: {
                            strictNullChecks: false
                        }
                    }),
                    "dev/configs/base.json": JSON.stringify({
                        compilerOptions: {
                            allowJs: true,
                            noImplicitAny: true,
                            strictNullChecks: true
                        }
                    }),
                    "dev/configs/tests.json": JSON.stringify({
                        compilerOptions: {
                            preserveConstEnums: true,
                            removeComments: false,
                            sourceMap: true
                        },
                        exclude: [
                            "../tests/baselines",
                            "../tests/scenarios"
                        ],
                        include: [
                            "../tests/**/*.ts"
                        ]
                    }),
                    "dev/circular.json": JSON.stringify({
                        extends: "./circular2",
                        compilerOptions: {
                            module: "amd"
                        }
                    }),
                    "dev/circular2.json": JSON.stringify({
                        extends: "./circular",
                        compilerOptions: {
                            module: "commonjs"
                        }
                    }),
                    "dev/missing.json": JSON.stringify({
                        extends: "./missing2",
                        compilerOptions: {
                            types: []
                        }
                    }),
                    "dev/failure.json": JSON.stringify({
                        extends: "./failure2.json",
                        compilerOptions: {
                            typeRoots: []
                        }
                    }),
                    "dev/failure2.json": JSON.stringify({
                        excludes: ["*.js"]
                    }),
                    "dev/configs/first.json": JSON.stringify({
                        extends: "./base",
                        compilerOptions: {
                            module: "commonjs"
                        },
                        files: ["../main.ts"]
                    }),
                    "dev/configs/second.json": JSON.stringify({
                        extends: "./base",
                        compilerOptions: {
                            module: "amd"
                        },
                        include: ["../supplemental.*"]
                    }),
                    "dev/configs/third.json": JSON.stringify({
                        extends: "./second",
                        compilerOptions: {
                            // tslint:disable-next-line:no-null-keyword
                            module: null
                        },
                        include: ["../supplemental.*"]
                    }),
                    "dev/configs/fourth.json": JSON.stringify({
                        extends: "./third",
                        compilerOptions: {
                            module: "system"
                        },
                        // tslint:disable-next-line:no-null-keyword
                        include: null,
                        files: ["../main.ts"]
                    }),
                    "dev/extends.json": JSON.stringify({ extends: 42 }),
                    "dev/extends2.json": JSON.stringify({ extends: "configs/base" }),
                    "dev/main.ts": "",
                    "dev/supplemental.ts": "",
                    "dev/tests/unit/spec.ts": "",
                    "dev/tests/utils.ts": "",
                    "dev/tests/scenarios/first.json": "",
                    "dev/tests/baselines/first/output.ts": ""
                }
            }
        });
    }

    const caseInsensitiveBasePath = "c:/dev/";
    const caseInsensitiveHost = new fakes.ParseConfigHost(createFileSystem(/*ignoreCase*/ true, caseInsensitiveBasePath, "c:/"));

    const caseSensitiveBasePath = "/dev/";
    const caseSensitiveHost = new fakes.ParseConfigHost(createFileSystem(/*ignoreCase*/ false, caseSensitiveBasePath, "/"));

    function verifyDiagnostics(actual: Diagnostic[], expected: {code: number, category: DiagnosticCategory, messageText: string}[]) {
        assert.isTrue(expected.length === actual.length, `Expected error: ${JSON.stringify(expected)}. Actual error: ${JSON.stringify(actual)}.`);
        for (let i = 0; i < actual.length; i++) {
            const actualError = actual[i];
            const expectedError = expected[i];
            assert.equal(actualError.code, expectedError.code, "Error code mismatch");
            assert.equal(actualError.category, expectedError.category, "Category mismatch");
            assert.equal(flattenDiagnosticMessageText(actualError.messageText, "\n"), expectedError.messageText);
        }
    }

    describe("configurationExtension", () => {
        forEach<[string, string, fakes.ParseConfigHost], void>([
            ["under a case insensitive host", caseInsensitiveBasePath, caseInsensitiveHost],
            ["under a case sensitive host", caseSensitiveBasePath, caseSensitiveHost]
        ], ([testName, basePath, host]) => {
            function getParseCommandLine(entry: string) {
                const {config, error} = readConfigFile(entry, name => host.readFile(name));
                assert(config && !error, flattenDiagnosticMessageText(error && error.messageText, "\n"));
                return parseJsonConfigFileContent(config, host, basePath, {}, entry);
            }

            function getParseCommandLineJsonSourceFile(entry: string) {
                const jsonSourceFile = readJsonConfigFile(entry, name => host.readFile(name));
                assert(jsonSourceFile.endOfFileToken && !jsonSourceFile.parseDiagnostics.length, flattenDiagnosticMessageText(jsonSourceFile.parseDiagnostics[0] && jsonSourceFile.parseDiagnostics[0].messageText, "\n"));
                return {
                    jsonSourceFile,
                    parsed: parseJsonSourceFileConfigFileContent(jsonSourceFile, host, basePath, {}, entry)
                };
            }

            function testSuccess(name: string, entry: string, expected: CompilerOptions, expectedFiles: string[]) {
                expected.configFilePath = entry;
                it(name, () => {
                    const parsed = getParseCommandLine(entry);
                    assert(!parsed.errors.length, flattenDiagnosticMessageText(parsed.errors[0] && parsed.errors[0].messageText, "\n"));
                    assert.deepEqual(parsed.options, expected);
                    assert.deepEqual(parsed.fileNames, expectedFiles);
                });

                it(name + " with jsonSourceFile", () => {
                    const { parsed, jsonSourceFile } = getParseCommandLineJsonSourceFile(entry);
                    assert(!parsed.errors.length, flattenDiagnosticMessageText(parsed.errors[0] && parsed.errors[0].messageText, "\n"));
                    assert.deepEqual(parsed.options, expected);
                    assert.equal(parsed.options.configFile, jsonSourceFile);
                    assert.deepEqual(parsed.fileNames, expectedFiles);
                });
            }

            function testFailure(name: string, entry: string, expectedDiagnostics: { code: number, category: DiagnosticCategory, messageText: string }[]) {
                it(name, () => {
                    const parsed = getParseCommandLine(entry);
                    verifyDiagnostics(parsed.errors, expectedDiagnostics);
                });

                it(name + " with jsonSourceFile", () => {
                    const { parsed } = getParseCommandLineJsonSourceFile(entry);
                    verifyDiagnostics(parsed.errors, expectedDiagnostics);
                });
            }

            describe(testName, () => {
                testSuccess("can resolve an extension with a base extension", "tsconfig.json", {
                    allowJs: true,
                    noImplicitAny: true,
                    strictNullChecks: true,
                }, [
                    combinePaths(basePath, "main.ts"),
                    combinePaths(basePath, "supplemental.ts"),
                ]);

                testSuccess("can resolve an extension with a base extension that overrides options", "tsconfig.nostrictnull.json", {
                    allowJs: true,
                    noImplicitAny: true,
                    strictNullChecks: false,
                }, [
                    combinePaths(basePath, "main.ts"),
                    combinePaths(basePath, "supplemental.ts"),
                ]);

                testFailure("can report errors on circular imports", "circular.json", [
                    {
                        code: 18000,
                        category: DiagnosticCategory.Error,
                        messageText: `Circularity detected while resolving configuration: ${[combinePaths(basePath, "circular.json"), combinePaths(basePath, "circular2.json"), combinePaths(basePath, "circular.json")].join(" -> ")}`
                    }
                ]);

                testFailure("can report missing configurations", "missing.json", [{
                    code: 6096,
                    category: DiagnosticCategory.Message,
                    messageText: `File './missing2' does not exist.`
                }]);

                testFailure("can report errors in extended configs", "failure.json", [{
                    code: 6114,
                    category: DiagnosticCategory.Error,
                    messageText: `Unknown option 'excludes'. Did you mean 'exclude'?`
                }]);

                testFailure("can error when 'extends' is not a string", "extends.json", [{
                    code: 5024,
                    category: DiagnosticCategory.Error,
                    messageText: `Compiler option 'extends' requires a value of type string.`
                }]);

                testFailure("can error when 'extends' is neither relative nor rooted.", "extends2.json", [{
                    code: 18001,
                    category: DiagnosticCategory.Error,
                    messageText: `A path in an 'extends' option must be relative or rooted, but 'configs/base' is not.`
                }]);

                testSuccess("can overwrite compiler options using extended 'null'", "configs/third.json", {
                    allowJs: true,
                    noImplicitAny: true,
                    strictNullChecks: true,
                    module: undefined // Technically, this is distinct from the key never being set; but within the compiler we don't make the distinction
                }, [
                    combinePaths(basePath, "supplemental.ts")
                ]);

                testSuccess("can overwrite top-level options using extended 'null'", "configs/fourth.json", {
                    allowJs: true,
                    noImplicitAny: true,
                    strictNullChecks: true,
                    module: ModuleKind.System
                }, [
                    combinePaths(basePath, "main.ts")
                ]);
            });
        });
    });
}

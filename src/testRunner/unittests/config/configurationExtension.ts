import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

function createFileSystem(ignoreCase: boolean, cwd: string, root: string) {
    return new vfs.FileSystem(ignoreCase, {
        cwd,
        files: {
            [root]: {
                "dev/node_modules/@foo/tsconfig/package.json": JSON.stringify({
                    name: "@foo/tsconfig",
                    version: "1.0.0",
                    exports: {
                        ".": "./src/tsconfig.json"
                    }
                }),
                "dev/node_modules/@foo/tsconfig/src/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        strict: true,
                    }
                }),
                "dev/tsconfig.extendsFoo.json": JSON.stringify({
                    extends: "@foo/tsconfig",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/node_modules/config-box/package.json": JSON.stringify({
                    name: "config-box",
                    version: "1.0.0",
                    tsconfig: "./strict.json"
                }),
                "dev/node_modules/config-box/strict.json": JSON.stringify({
                    compilerOptions: {
                        strict: true,
                    }
                }),
                "dev/node_modules/config-box/unstrict.json": JSON.stringify({
                    compilerOptions: {
                        strict: false,
                    }
                }),
                "dev/tsconfig.extendsBox.json": JSON.stringify({
                    extends: "config-box",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsStrict.json": JSON.stringify({
                    extends: "config-box/strict",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsUnStrict.json": JSON.stringify({
                    extends: "config-box/unstrict",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsStrictExtension.json": JSON.stringify({
                    extends: "config-box/strict.json",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/node_modules/config-box-implied/package.json": JSON.stringify({
                    name: "config-box-implied",
                    version: "1.0.0",
                }),
                "dev/node_modules/config-box-implied/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        strict: true,
                    }
                }),
                "dev/node_modules/config-box-implied/unstrict/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        strict: false,
                    }
                }),
                "dev/tsconfig.extendsBoxImplied.json": JSON.stringify({
                    extends: "config-box-implied",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsBoxImpliedUnstrict.json": JSON.stringify({
                    extends: "config-box-implied/unstrict",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsBoxImpliedUnstrictExtension.json": JSON.stringify({
                    extends: "config-box-implied/unstrict/tsconfig",
                    files: [
                        "main.ts",
                    ]
                }),
                "dev/tsconfig.extendsBoxImpliedPath.json": JSON.stringify({
                    extends: "config-box-implied/tsconfig.json",
                    files: [
                        "main.ts",
                    ]
                }),
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
                        module: null // eslint-disable-line no-null/no-null
                    },
                    include: ["../supplemental.*"]
                }),
                "dev/configs/fourth.json": JSON.stringify({
                    extends: "./third",
                    compilerOptions: {
                        module: "system"
                    },
                    include: null, // eslint-disable-line no-null/no-null
                    files: ["../main.ts"]
                }),
                "dev/configs/fifth.json": JSON.stringify({
                    extends: "./fourth",
                    include: ["../tests/utils.ts"],
                    files: []
                }),
                "dev/extends.json": JSON.stringify({ extends: 42 }),
                "dev/extends2.json": JSON.stringify({ extends: "configs/base" }),
                "dev/extends3.json": JSON.stringify({ extends: "" }),
                "dev/extends4.json": JSON.stringify({ extends: [""] }),
                "dev/main.ts": "",
                "dev/supplemental.ts": "",
                "dev/tests/unit/spec.ts": "",
                "dev/tests/utils.ts": "",
                "dev/tests/scenarios/first.json": "",
                "dev/tests/baselines/first/output.ts": "",
                    "dev/configs/extendsArrayFirst.json": JSON.stringify({
                        compilerOptions: {
                            allowJs: true,
                            noImplicitAny: true,
                            strictNullChecks: true
                        }
                    }),
                    "dev/configs/extendsArraySecond.json": JSON.stringify({
                        compilerOptions: {
                            module: "amd"
                        },
                        include: ["../supplemental.*"]
                    }),
                    "dev/configs/extendsArrayThird.json": JSON.stringify({
                        compilerOptions: {
                            module: null, // eslint-disable-line no-null/no-null
                            noImplicitAny: false
                        },
                        extends: "./extendsArrayFirst",
                        include: ["../supplemental.*"]
                    }),
                    "dev/configs/extendsArrayFourth.json": JSON.stringify({
                        compilerOptions: {
                            module: "system",
                            strictNullChecks: false
                        },
                        include: null, // eslint-disable-line no-null/no-null
                        files: ["../main.ts"]
                    }),
                    "dev/configs/extendsArrayFifth.json": JSON.stringify({
                        extends: ["./extendsArrayFirst", "./extendsArraySecond", "./extendsArrayThird", "./extendsArrayFourth"],
                        files: [],
                    }),
                    "dev/extendsArrayFails.json": JSON.stringify({
                        extends: ["./missingFile"],
                        compilerOptions: {
                            types: []
                        }
                    }),
                    "dev/extendsArrayFails2.json": JSON.stringify({ extends: [42] }),
            }
        }
    });
}

const caseInsensitiveBasePath = "c:/dev/";
const caseInsensitiveHost = new fakes.ParseConfigHost(createFileSystem(/*ignoreCase*/ true, caseInsensitiveBasePath, "c:/"));

const caseSensitiveBasePath = "/dev/";
const caseSensitiveHost = new fakes.ParseConfigHost(createFileSystem(/*ignoreCase*/ false, caseSensitiveBasePath, "/"));

function verifyDiagnostics(actual: ts.Diagnostic[], expected: { code: number; messageText: string; }[]) {
    assert.isTrue(expected.length === actual.length, `Expected error: ${JSON.stringify(expected)}. Actual error: ${JSON.stringify(actual)}.`);
    for (let i = 0; i < actual.length; i++) {
        const actualError = actual[i];
        const expectedError = expected[i];
        assert.equal(actualError.code, expectedError.code, "Error code mismatch");
        assert.equal(actualError.category, ts.DiagnosticCategory.Error, "Category mismatch"); // Should always be error
        assert.equal(ts.flattenDiagnosticMessageText(actualError.messageText, "\n"), expectedError.messageText);
    }
}

describe("unittests:: config:: configurationExtension", () => {
    ts.forEach<[string, string, fakes.ParseConfigHost], void>([
        ["under a case insensitive host", caseInsensitiveBasePath, caseInsensitiveHost],
        ["under a case sensitive host", caseSensitiveBasePath, caseSensitiveHost]
    ], ([testName, basePath, host]) => {
        function getParseCommandLine(entry: string) {
            const {config, error} = ts.readConfigFile(entry, name => host.readFile(name));
            assert(config && !error, ts.flattenDiagnosticMessageText(error && error.messageText, "\n"));
            return ts.parseJsonConfigFileContent(config, host, basePath, {}, entry);
        }

        function getParseCommandLineJsonSourceFile(entry: string) {
            const jsonSourceFile = ts.readJsonConfigFile(entry, name => host.readFile(name));
            assert(jsonSourceFile.endOfFileToken && !jsonSourceFile.parseDiagnostics.length, ts.flattenDiagnosticMessageText(jsonSourceFile.parseDiagnostics[0] && jsonSourceFile.parseDiagnostics[0].messageText, "\n"));
            return {
                jsonSourceFile,
                parsed: ts.parseJsonSourceFileConfigFileContent(jsonSourceFile, host, basePath, {}, entry)
            };
        }

        function testSuccess(name: string, entry: string, expected: ts.CompilerOptions, expectedFiles: string[]) {
            expected.configFilePath = entry;
            it(name, () => {
                const parsed = getParseCommandLine(entry);
                assert(!parsed.errors.length, ts.flattenDiagnosticMessageText(parsed.errors[0] && parsed.errors[0].messageText, "\n"));
                assert.deepEqual(parsed.options, expected);
                assert.deepEqual(parsed.fileNames, expectedFiles);
            });

            it(name + " with jsonSourceFile", () => {
                const { parsed, jsonSourceFile } = getParseCommandLineJsonSourceFile(entry);
                assert(!parsed.errors.length, ts.flattenDiagnosticMessageText(parsed.errors[0] && parsed.errors[0].messageText, "\n"));
                assert.deepEqual(parsed.options, expected);
                assert.equal(parsed.options.configFile, jsonSourceFile);
                assert.deepEqual(parsed.fileNames, expectedFiles);
            });
        }

        function testFailure(name: string, entry: string, expectedDiagnostics: { code: number; messageText: string; }[]) {
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
                ts.combinePaths(basePath, "main.ts"),
                ts.combinePaths(basePath, "supplemental.ts"),
            ]);

            testSuccess("can resolve an extension with a base extension that overrides options", "tsconfig.nostrictnull.json", {
                allowJs: true,
                noImplicitAny: true,
                strictNullChecks: false,
            }, [
                ts.combinePaths(basePath, "main.ts"),
                ts.combinePaths(basePath, "supplemental.ts"),
            ]);

            testFailure("can report errors on circular imports", "circular.json", [
                {
                    code: 18000,
                    messageText: `Circularity detected while resolving configuration: ${[ts.combinePaths(basePath, "circular.json"), ts.combinePaths(basePath, "circular2.json"), ts.combinePaths(basePath, "circular.json")].join(" -> ")}`
                }
            ]);

            testFailure("can report missing configurations", "missing.json", [{
                code: 6053,
                messageText: `File './missing2' not found.`
            }]);

            testFailure("can report errors in extended configs", "failure.json", [{
                code: 6114,
                messageText: `Unknown option 'excludes'. Did you mean 'exclude'?`
            }]);

            testFailure("can error when 'extends' is not a string or Array", "extends.json", [{
                code: 5024,
                messageText: `Compiler option 'extends' requires a value of type string or Array.`
            }]);

            testFailure("can error when 'extends' is given an empty string", "extends3.json", [{
                code: 18051,
                messageText: `Compiler option 'extends' cannot be given an empty string.`
            }]);

            testFailure("can error when 'extends' is given an empty string in an array", "extends4.json", [{
                code: 18051,
                messageText: `Compiler option 'extends' cannot be given an empty string.`
            }]);

            testSuccess("can overwrite compiler options using extended 'null'", "configs/third.json", {
                allowJs: true,
                noImplicitAny: true,
                strictNullChecks: true,
                module: undefined // Technically, this is distinct from the key never being set; but within the compiler we don't make the distinction
            }, [
                ts.combinePaths(basePath, "supplemental.ts")
            ]);

            testSuccess("can overwrite top-level options using extended 'null'", "configs/fourth.json", {
                allowJs: true,
                noImplicitAny: true,
                strictNullChecks: true,
                module: ts.ModuleKind.System
            }, [
                ts.combinePaths(basePath, "main.ts")
            ]);

            testSuccess("can overwrite top-level files using extended []", "configs/fifth.json", {
                allowJs: true,
                noImplicitAny: true,
                strictNullChecks: true,
                module: ts.ModuleKind.System
            }, [
                ts.combinePaths(basePath, "tests/utils.ts")
            ]);

            describe("finding extended configs from node_modules", () => {
                testSuccess("can lookup via tsconfig field", "tsconfig.extendsBox.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via package-relative path", "tsconfig.extendsStrict.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via non-redirected-to package-relative path", "tsconfig.extendsUnStrict.json", { strict: false }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via package-relative path with extension", "tsconfig.extendsStrictExtension.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via an implicit tsconfig", "tsconfig.extendsBoxImplied.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via an implicit tsconfig in a package-relative directory", "tsconfig.extendsBoxImpliedUnstrict.json", { strict: false }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via an implicit tsconfig in a package-relative directory with name", "tsconfig.extendsBoxImpliedUnstrictExtension.json", { strict: false }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via an implicit tsconfig in a package-relative directory with extension", "tsconfig.extendsBoxImpliedPath.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
                testSuccess("can lookup via an package.json exports", "tsconfig.extendsFoo.json", { strict: true }, [ts.combinePaths(basePath, "main.ts")]);
            });

            it("adds extendedSourceFiles only once", () => {
                const sourceFile = ts.readJsonConfigFile("configs/fourth.json", (path) => host.readFile(path));
                const dir = ts.combinePaths(basePath, "configs");
                const expected = [
                    ts.combinePaths(dir, "third.json"),
                    ts.combinePaths(dir, "second.json"),
                    ts.combinePaths(dir, "base.json"),
                ];
                ts.parseJsonSourceFileConfigFileContent(sourceFile, host, dir, {}, "fourth.json");
                assert.deepEqual(sourceFile.extendedSourceFiles, expected);
                ts.parseJsonSourceFileConfigFileContent(sourceFile, host, dir, {}, "fourth.json");
                assert.deepEqual(sourceFile.extendedSourceFiles, expected);
            });
        });

        describe(testName, () => {
            it("adds extendedSourceFiles from an array only once", () => {
                const sourceFile = ts.readJsonConfigFile("configs/extendsArrayFifth.json", (path) => host.readFile(path));
                const dir = ts.combinePaths(basePath, "configs");
                const expected = [
                    ts.combinePaths(dir, "extendsArrayFirst.json"),
                    ts.combinePaths(dir, "extendsArraySecond.json"),
                    ts.combinePaths(dir, "extendsArrayThird.json"),
                    ts.combinePaths(dir, "extendsArrayFourth.json"),
                ];
                ts.parseJsonSourceFileConfigFileContent(sourceFile, host, dir, {}, "extendsArrayFifth.json");
                assert.deepEqual(sourceFile.extendedSourceFiles, expected);
                ts.parseJsonSourceFileConfigFileContent(sourceFile, host, dir, {}, "extendsArrayFifth.json");
                assert.deepEqual(sourceFile.extendedSourceFiles, expected);
            });

            testSuccess("can overwrite top-level compilerOptions", "configs/extendsArrayFifth.json", {
                allowJs: true,
                noImplicitAny: false,
                strictNullChecks: false,
                module: ts.ModuleKind.System
            }, []);

            testFailure("can report missing configurations", "extendsArrayFails.json", [{
                code: 6053,
                messageText: `File './missingFile' not found.`
            }]);

            testFailure("can error when 'extends' is not a string or Array2", "extendsArrayFails2.json", [{
                code: 5024,
                messageText: `Compiler option 'extends' requires a value of type string.`
            }]);
        });
    });
});


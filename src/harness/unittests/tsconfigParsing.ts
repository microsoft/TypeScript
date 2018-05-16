/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\commandLineParser.ts" />
/// <reference path="../compiler.ts" />
/// <reference path="../vfs.ts" />

namespace ts {
    describe("parseConfigFileTextToJson", () => {
        function assertParseResult(jsonText: string, expectedConfigObject: { config?: any; error?: Diagnostic[] }) {
            const parsed = parseConfigFileTextToJson("/apath/tsconfig.json", jsonText);
            assert.equal(JSON.stringify(parsed), JSON.stringify(expectedConfigObject));
        }

        function assertParseErrorWithExcludesKeyword(jsonText: string) {
            {
                const parsed = parseConfigFileTextToJson("/apath/tsconfig.json", jsonText);
                const parsedCommand = parseJsonConfigFileContent(parsed.config, sys, "tests/cases/unittests");
                assert.isTrue(parsedCommand.errors && parsedCommand.errors.length === 1 &&
                    parsedCommand.errors[0].code === Diagnostics.Unknown_option_excludes_Did_you_mean_exclude.code);
            }
            {
                const parsed = parseJsonText("/apath/tsconfig.json", jsonText);
                const parsedCommand = parseJsonSourceFileConfigFileContent(parsed, sys, "tests/cases/unittests");
                assert.isTrue(parsedCommand.errors && parsedCommand.errors.length === 1 &&
                    parsedCommand.errors[0].code === Diagnostics.Unknown_option_excludes_Did_you_mean_exclude.code);
            }
        }

        function getParsedCommandJson(jsonText: string, configFileName: string, basePath: string, allFileList: string[]) {
            const parsed = parseConfigFileTextToJson(configFileName, jsonText);
            const files = allFileList.reduce((files, value) => (files[value] = "", files), {} as vfs.FileSet);
            const host: ParseConfigHost = new fakes.ParseConfigHost(new vfs.FileSystem(/*ignoreCase*/ false, { cwd: basePath, files: { "/": {}, ...files } }));
            return parseJsonConfigFileContent(parsed.config, host, basePath, /*existingOptions*/ undefined, configFileName);
        }

        function getParsedCommandJsonNode(jsonText: string, configFileName: string, basePath: string, allFileList: string[]) {
            const parsed = parseJsonText(configFileName, jsonText);
            const files = allFileList.reduce((files, value) => (files[value] = "", files), {} as vfs.FileSet);
            const host: ParseConfigHost = new fakes.ParseConfigHost(new vfs.FileSystem(/*ignoreCase*/ false, { cwd: basePath, files: { "/": {}, ...files } }));
            return parseJsonSourceFileConfigFileContent(parsed, host, basePath, /*existingOptions*/ undefined, configFileName);
        }

        function assertParseFileList(jsonText: string, configFileName: string, basePath: string, allFileList: string[], expectedFileList: string[]) {
            {
                const parsed = getParsedCommandJson(jsonText, configFileName, basePath, allFileList);
                assert.isTrue(arrayIsEqualTo(parsed.fileNames.sort(), expectedFileList.sort()));
            }
            {
                const parsed = getParsedCommandJsonNode(jsonText, configFileName, basePath, allFileList);
                assert.isTrue(arrayIsEqualTo(parsed.fileNames.sort(), expectedFileList.sort()));
            }
        }

        function assertParseFileDiagnostics(jsonText: string, configFileName: string, basePath: string, allFileList: string[], expectedDiagnosticCode: number, noLocation?: boolean) {
            {
                const parsed = getParsedCommandJson(jsonText, configFileName, basePath, allFileList);
                assert.isTrue(parsed.errors.length >= 0);
                assert.isTrue(parsed.errors.filter(e => e.code === expectedDiagnosticCode).length > 0, `Expected error code ${expectedDiagnosticCode} to be in ${JSON.stringify(parsed.errors)}`);
            }
            {
                const parsed = getParsedCommandJsonNode(jsonText, configFileName, basePath, allFileList);
                assert.isTrue(parsed.errors.length >= 0);
                assert.isTrue(parsed.errors.filter(e => e.code === expectedDiagnosticCode).length > 0, `Expected error code ${expectedDiagnosticCode} to be in ${JSON.stringify(parsed.errors)}`);
                if (!noLocation) {
                    assert.isTrue(parsed.errors.filter(e => e.code === expectedDiagnosticCode && e.file && e.start && e.length).length > 0, `Expected error code ${expectedDiagnosticCode} to be in ${JSON.stringify(parsed.errors)} with location information`);
                }
            }
        }

        it("returns empty config for file with only whitespaces", () => {
            assertParseResult("", { config : {} });
            assertParseResult(" ", { config : {} });
        });

        it("returns empty config for file with comments only", () => {
            assertParseResult("// Comment", { config: {} });
            assertParseResult("/* Comment*/", { config: {} });
        });

        it("returns empty config when config is empty object", () => {
            assertParseResult("{}", { config: {} });
        });

        it("returns config object without comments", () => {
            assertParseResult(
                `{ // Excluded files
                    "exclude": [
                        // Exclude d.ts
                        "file.d.ts"
                    ]
                }`, { config: { exclude: ["file.d.ts"] } });

            assertParseResult(
                `{
                    /* Excluded
                         Files
                    */
                    "exclude": [
                        /* multiline comments can be in the middle of a line */"file.d.ts"
                    ]
                }`, { config: { exclude: ["file.d.ts"] } });
        });

        it("keeps string content untouched", () => {
            assertParseResult(
                `{
                    "exclude": [
                        "xx//file.d.ts"
                    ]
                }`, { config: { exclude: ["xx//file.d.ts"] } });
            assertParseResult(
                `{
                    "exclude": [
                        "xx/*file.d.ts*/"
                    ]
                }`, { config: { exclude: ["xx/*file.d.ts*/"] } });
        });

        it("handles escaped characters in strings correctly", () => {
            assertParseResult(
                `{
                    "exclude": [
                        "xx\\"//files"
                    ]
                }`, { config: { exclude: ["xx\"//files"] } });

            assertParseResult(
                `{
                    "exclude": [
                        "xx\\\\" // end of line comment
                    ]
                }`, { config: { exclude: ["xx\\"] } });
         });

        it("returns object with error when json is invalid", () => {
            const parsed = parseConfigFileTextToJson("/apath/tsconfig.json", "invalid");
            assert.deepEqual(parsed.config, { invalid: undefined });
            const expected = createCompilerDiagnostic(Diagnostics._0_expected, "{");
            assert.equal(parsed.error.messageText, expected.messageText);
            assert.equal(parsed.error.category, expected.category);
            assert.equal(parsed.error.code, expected.code);
            assert.equal(parsed.error.start, 0);
            assert.equal(parsed.error.length, "invalid".length);
        });

        it("returns object when users correctly specify library", () => {
            assertParseResult(
                `{
                    "compilerOptions": {
                        "lib": ["es5"]
                    }
                }`, {
                    config: { compilerOptions: { lib: ["es5"] } }
                });

            assertParseResult(
                `{
                    "compilerOptions": {
                        "lib": ["es5", "es6"]
                    }
                }`, {
                    config: { compilerOptions: { lib: ["es5", "es6"] } }
                });
        });

        it("returns error when tsconfig have excludes", () => {
            assertParseErrorWithExcludesKeyword(
                `{
                    "compilerOptions": {
                        "lib": ["es5"]
                    },
                    "excludes": [
                        "foge.ts"
                    ]
                }`);
        });

        it("ignore dotted files and folders", () => {
            assertParseFileList(
                `{}`,
                "tsconfig.json",
                "/apath",
                ["/apath/test.ts", "/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"],
                ["/apath/test.ts"]
            );
        });

        it("allow dotted files and folders when explicitly requested", () => {
            assertParseFileList(
                `{
                    "files": ["/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"]
                }`,
                "tsconfig.json",
                "/apath",
                ["/apath/test.ts", "/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"],
                ["/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"]
            );
        });

        it("exclude outDir unless overridden", () => {
            const tsconfigWithoutExclude =
            `{
                "compilerOptions": {
                    "outDir": "bin"
                }
            }`;
            const tsconfigWithExclude =
            `{
                "compilerOptions": {
                    "outDir": "bin"
                },
                "exclude": [ "obj" ]
            }`;
            const rootDir = "/";
            const allFiles = ["/bin/a.ts", "/b.ts"];
            const expectedFiles = ["/b.ts"];
            assertParseFileList(tsconfigWithoutExclude, "tsconfig.json", rootDir, allFiles, expectedFiles);
            assertParseFileList(tsconfigWithExclude, "tsconfig.json", rootDir, allFiles, allFiles);
        });

        it("exclude declarationDir unless overridden", () => {
            const tsconfigWithoutExclude =
            `{
                "compilerOptions": {
                    "declarationDir": "declarations"
                }
            }`;
            const tsconfigWithExclude =
            `{
                "compilerOptions": {
                    "declarationDir": "declarations"
                },
                "exclude": [ "types" ]
            }`;

            const rootDir = "/";
            const allFiles = ["/declarations/a.d.ts", "/a.ts"];
            const expectedFiles = ["/a.ts"];

            assertParseFileList(tsconfigWithoutExclude, "tsconfig.json", rootDir, allFiles, expectedFiles);
            assertParseFileList(tsconfigWithExclude, "tsconfig.json", rootDir, allFiles, allFiles);
        });

        it("implicitly exclude common package folders", () => {
            assertParseFileList(
                `{}`,
                "tsconfig.json",
                "/",
                ["/node_modules/a.ts", "/bower_components/b.ts", "/jspm_packages/c.ts", "/d.ts", "/folder/e.ts"],
                ["/d.ts", "/folder/e.ts"]
            );
        });

        it("parse and re-emit tsconfig.json file with diagnostics", () => {
            const content = `{
                "compilerOptions": {
                    "allowJs": true
                    // Some comments
                    "outDir": "bin"
                }
                "files": ["file1.ts"]
            }`;
            const result = parseJsonText("config.json", content);
            const diagnostics = result.parseDiagnostics;
            const configJsonObject = convertToObject(result, diagnostics);
            const expectedResult = {
                compilerOptions: {
                    allowJs: true,
                    outDir: "bin"
                },
                files: ["file1.ts"]
            };
            assert.isTrue(diagnostics.length === 2);
            assert.equal(JSON.stringify(configJsonObject), JSON.stringify(expectedResult));
        });

        it("generates errors for empty files list", () => {
            const content = `{
                "files": []
            }`;
            assertParseFileDiagnostics(content,
                "/apath/tsconfig.json",
                "tests/cases/unittests",
                ["/apath/a.ts"],
                Diagnostics.The_files_list_in_config_file_0_is_empty.code);
        });

        it("generates errors for directory with no .ts files", () => {
            const content = `{
            }`;
            assertParseFileDiagnostics(content,
                "/apath/tsconfig.json",
                "tests/cases/unittests",
                ["/apath/a.js"],
                Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code,
                /*noLocation*/ true);
        });

        it("generates errors for empty directory", () => {
            const content = `{
                "compilerOptions": {
                    "allowJs": true
                }
            }`;
            assertParseFileDiagnostics(content,
                "/apath/tsconfig.json",
                "tests/cases/unittests",
                [],
                Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code,
                /*noLocation*/ true);
        });

        it("generates errors for empty include", () => {
            const content = `{
                "include": []
            }`;
            assertParseFileDiagnostics(content,
                "/apath/tsconfig.json",
                "tests/cases/unittests",
                ["/apath/a.ts"],
                Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code,
                /*noLocation*/ true);
        });

        it("generates errors for includes with outDir", () => {
            const content = `{
                "compilerOptions": {
                    "outDir": "./"
                },
                "include": ["**/*"]
            }`;
            assertParseFileDiagnostics(content,
                "/apath/tsconfig.json",
                "tests/cases/unittests",
                ["/apath/a.ts"],
                Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code,
                /*noLocation*/ true);
        });
    });
}

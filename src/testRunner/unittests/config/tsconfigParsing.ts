import * as fakes from "../../_namespaces/fakes";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineParseConfig,
} from "./helpers";

describe("unittests:: config:: tsconfigParsing:: parseConfigFileTextToJson", () => {
    function formatErrors(errors: readonly ts.Diagnostic[]) {
        return ts.formatDiagnosticsWithColorAndContext(errors, {
            getCurrentDirectory: () => "/",
            getCanonicalFileName: ts.identity,
            getNewLine: () => "\n",
        });
    }
    function baselineParseResult(name: string, jsonTexts: () => string[]) {
        it(name, () => {
            const baseline: string[] = [];
            for (const jsonText of jsonTexts()) {
                baseline.push("Input::", jsonText);
                const parsed = ts.parseConfigFileTextToJson("/apath/tsconfig.json", jsonText);
                baseline.push("Config::", jsonToReadableText(parsed.config));
                baseline.push("Errors::");
                baseline.push(formatErrors(parsed.error ? [parsed.error] : ts.emptyArray));
                baseline.push("");
            }
            Harness.Baseline.runBaseline(`config/tsconfigParsing/${name} jsonParse.js`, baseline.join("\n"));
        });
    }

    interface VerifyConfig {
        jsonText: string;
        configFileName: string;
        basePath: string;
        allFileList: string[];
    }

    function baselinedParsed(subScenario: string, scenario: () => VerifyConfig[], skipJson?: true) {
        baselineParseConfig({
            scenario: "tsconfigParsing",
            subScenario,
            input: () =>
                scenario().map(({ jsonText, configFileName, basePath, allFileList }) => ({
                    createHost: () => {
                        const files = allFileList.reduce((files, value) => (files[value] = "", files), {} as vfs.FileSet);
                        files[ts.combinePaths(basePath, configFileName)] = jsonText;
                        return new fakes.ParseConfigHost(
                            new vfs.FileSystem(
                                /*ignoreCase*/ false,
                                {
                                    cwd: basePath,
                                    files: { "/": {}, ...files },
                                },
                            ),
                        );
                    },
                    jsonText,
                    configFileName,
                    basePath,
                    baselineParsed: (baseline, parsed) => {
                        baseline.push("FileNames::");
                        baseline.push(parsed.fileNames.join());
                    },
                })),
            skipJson,
        });
    }

    baselineParseResult("returns empty config for file with only whitespaces", () => [
        "",
        " ",
    ]);

    baselineParseResult("returns empty config for file with comments only", () => [
        "// Comment",
        "/* Comment*/",
    ]);

    baselineParseResult("returns empty config when config is empty object", () => [
        "{}",
    ]);

    baselineParseResult("returns config object without comments", () => [
        `{ // Excluded files
            "exclude": [
                // Exclude d.ts
                "file.d.ts"
            ]
        }`,
        `{
            /* Excluded
                    Files
            */
            "exclude": [
                /* multiline comments can be in the middle of a line */"file.d.ts"
            ]
        }`,
    ]);

    baselineParseResult("keeps string content untouched", () => [
        `{
            "exclude": [
                "xx//file.d.ts"
            ]
        }`,
        `{
            "exclude": [
                "xx/*file.d.ts*/"
            ]
        }`,
    ]);

    baselineParseResult("handles escaped characters in strings correctly", () => [
        `{
            "exclude": [
                "xx\\"//files"
            ]
        }`,
        `{
            "exclude": [
                "xx\\\\" // end of line comment
            ]
        }`,
    ]);

    baselineParseResult("returns object with error when json is invalid", () => [
        "invalid",
    ]);

    baselineParseResult("returns object when users correctly specify library", () => [
        `{
            "compilerOptions": {
                "lib": ["es5"]
            }
        }`,
        `{
            "compilerOptions": {
                "lib": ["es5", "es6"]
            }
        }`,
    ]);

    baselinedParsed("returns error when tsconfig have excludes", () => [{
        jsonText: `{
                    "compilerOptions": {
                        "lib": ["es5"]
                    },
                    "excludes": [
                        "foge.ts"
                    ]
                }`,
        configFileName: "tsconfig.json",
        basePath: "/apath",
        allFileList: ["/apath/test.ts", "/apath/foge.ts"],
    }]);

    baselinedParsed("ignore dotted files and folders", () => [{
        jsonText: `{}`,
        configFileName: "tsconfig.json",
        basePath: "/apath",
        allFileList: ["/apath/test.ts", "/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"],
    }]);

    baselinedParsed("allow dotted files and folders when explicitly requested", () => [{
        jsonText: `{
                    "files": ["/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"]
                }`,
        configFileName: "tsconfig.json",
        basePath: "/apath",
        allFileList: ["/apath/test.ts", "/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"],
    }]);

    baselinedParsed("exclude outDir unless overridden", () => {
        const tsconfigWithoutExclude = `{
                "compilerOptions": {
                    "outDir": "bin"
                }
            }`;
        const tsconfigWithExclude = `{
                "compilerOptions": {
                    "outDir": "bin"
                },
                "exclude": [ "obj" ]
            }`;
        const basePath = "/";
        const allFileList = ["/bin/a.ts", "/b.ts"];
        return [
            { jsonText: tsconfigWithoutExclude, configFileName: "tsconfig.json", basePath, allFileList },
            { jsonText: tsconfigWithExclude, configFileName: "tsconfig.json", basePath, allFileList },
        ];
    });

    baselinedParsed("exclude declarationDir unless overridden", () => {
        const tsconfigWithoutExclude = `{
                "compilerOptions": {
                    "declarationDir": "declarations"
                }
            }`;
        const tsconfigWithExclude = `{
                "compilerOptions": {
                    "declarationDir": "declarations"
                },
                "exclude": [ "types" ]
            }`;

        const basePath = "/";
        const allFileList = ["/declarations/a.d.ts", "/a.ts"];
        return [
            { jsonText: tsconfigWithoutExclude, configFileName: "tsconfig.json", basePath, allFileList },
            { jsonText: tsconfigWithExclude, configFileName: "tsconfig.json", basePath, allFileList },
        ];
    });

    baselinedParsed("implicitly exclude common package folders", () => [{
        jsonText: `{}`,
        configFileName: "tsconfig.json",
        basePath: "/",
        allFileList: ["/node_modules/a.ts", "/bower_components/b.ts", "/jspm_packages/c.ts", "/d.ts", "/folder/e.ts"],
    }]);

    it("parse and re-emit tsconfig.json file with diagnostics", () => {
        const baseline: string[] = [];
        const content = `{
                "compilerOptions": {
                    "allowJs": true
                    // Some comments
                    "outDir": "bin"
                }
                "files": ["file1.ts"]
            }`;
        baseline.push("Initial::", content);
        const result = ts.parseJsonText("config.json", content);
        const configJsonObject = ts.convertToObject(result, result.parseDiagnostics);
        baseline.push("Result::", jsonToReadableText(configJsonObject));
        baseline.push("Errors::", formatErrors(result.parseDiagnostics));
        Harness.Baseline.runBaseline(`config/tsconfigParsing/parse and re-emit tsconfig.json file with diagnostics.js`, baseline.join("\n"));
    });

    baselinedParsed("generates errors for empty files list", () => [{
        jsonText: `{
                "files": []
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors for empty files list when no references are provided", () => [{
        jsonText: `{
                "files": [],
                "references": []
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("does not generate errors for empty files list when one or more references are provided", () => [{
        jsonText: `{
                "files": [],
                "references": [{ "path": "/apath" }]
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors for directory with no .ts files", () => [{
        jsonText: `{
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.js"],
    }]);

    baselinedParsed("generates errors for empty directory", () => [{
        jsonText: `{
                "compilerOptions": {
                    "allowJs": true
                }
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: [],
    }]);

    baselinedParsed("generates errors for empty include", () => [{
        jsonText: `{
                "include": []
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors for includes with outDir", () => [{
        jsonText: `{
                "compilerOptions": {
                    "outDir": "./"
                },
                "include": ["**/*"]
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors for when invalid comment type present in tsconfig", () => [{
        jsonText: `{
              "compilerOptions": {
                ## this comment does cause issues
                "types" : [
                ]
              }
            }`,
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }], /*skipJson*/ true);

    baselinedParsed("generates errors when files is not string", () => [{
        jsonText: jsonToReadableText({
            files: [{
                compilerOptions: {
                    experimentalDecorators: true,
                    allowJs: true,
                },
            }],
        }),
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors when include is not string", () => [{
        jsonText: jsonToReadableText({
            include: [
                ["./**/*.ts"],
            ],
        }),
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    baselinedParsed("generates errors when commandline option is in tsconfig", () => [{
        jsonText: jsonToReadableText({
            compilerOptions: {
                help: true,
            },
        }),
        configFileName: "/apath/tsconfig.json",
        basePath: "tests/cases/unittests",
        allFileList: ["/apath/a.ts"],
    }]);

    function baselineWildcards(subScenario: string, scenario: () => { configFileName: string; jsonText: string; basePath: string; }[]) {
        baselineParseConfig({
            scenario: "tsconfigParsing",
            subScenario,
            input: () =>
                scenario().map(({ jsonText, configFileName, basePath }) => ({
                    createHost: () =>
                        new fakes.ParseConfigHost(
                            new vfs.FileSystem(/*ignoreCase*/ false, {
                                cwd: basePath,
                                files: { [configFileName]: jsonText },
                            }),
                        ),
                    jsonText,
                    configFileName,
                    basePath,
                    baselineParsed: (baseline, parsed) => {
                        baseline.push("Wildcards::");
                        ts.getOwnKeys(parsed.wildcardDirectories!).forEach(dir => baseline.push(`${dir}: WatchDirectoryFlags.${(ts as any).WatchDirectoryFlags[parsed.wildcardDirectories![dir]]}`));
                    },
                })),
            skipErrors: true,
        });
    }

    baselineWildcards("parses wildcard directories even when parent directories have dots", () => [{
        configFileName: "/foo.bar/tsconfig.json",
        jsonText: jsonToReadableText({
            include: ["src"],
        }),
        basePath: "/foo.bar",
    }]);

    baselineWildcards("correctly parses wild card directories from implicit glob when two keys differ only in directory seperator", () => [{
        configFileName: "/foo.bar/tsconfig.json",
        jsonText: jsonToReadableText({
            include: ["./", "./**/*.json"],
        }),
        basePath: "/foo",
    }]);
});

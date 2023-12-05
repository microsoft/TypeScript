import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";

describe("unittests:: config:: commandLineParsing:: parseCommandLine", () => {
    function assertParseResult(subScenario: string, commandLine: string[], workerDiagnostic?: () => ts.ParseCommandLineWorkerDiagnostics) {
        it(subScenario, () => {
            const baseline: string[] = [];
            baseline.push(commandLine.join(" "));
            const parsed = ts.parseCommandLineWorker(workerDiagnostic?.() || ts.compilerOptionsDidYouMeanDiagnostics, commandLine);
            baseline.push("CompilerOptions::");
            baseline.push(jsonToReadableText(parsed.options));
            baseline.push("WatchOptions::");
            baseline.push(jsonToReadableText(parsed.watchOptions));
            baseline.push("FileNames::");
            baseline.push(parsed.fileNames.join());
            baseline.push("Errors::");
            baseline.push(ts.formatDiagnostics(parsed.errors, {
                getCurrentDirectory: () => "/",
                getCanonicalFileName: ts.identity,
                getNewLine: () => "\n",
            }));
            Harness.Baseline.runBaseline(`config/commandLineParsing/parseCommandLine/${subScenario}.js`, baseline.join("\n"));
        });
    }

    // --lib es6 0.ts
    assertParseResult("Parse single option of library flag", ["--lib", "es6", "0.ts"]);
    assertParseResult("Handles may only be used with --build flags", ["--clean", "--dry", "--force", "--verbose"]);
    // --declarations --allowTS
    assertParseResult("Handles did you mean for misspelt flags", ["--declarations", "--allowTS"]);
    // --lib es5,es2015.symbol.wellknown 0.ts
    assertParseResult("Parse multiple options of library flags", ["--lib", "es5,es2015.symbol.wellknown", "0.ts"]);
    // --lib es5,invalidOption 0.ts
    assertParseResult("Parse invalid option of library flags", ["--lib", "es5,invalidOption", "0.ts"]);
    // 0.ts --jsx
    assertParseResult("Parse empty options of --jsx", ["0.ts", "--jsx"]);
    // 0.ts --
    assertParseResult("Parse empty options of --module", ["0.ts", "--module"]);
    // 0.ts --newLine
    assertParseResult("Parse empty options of --newLine", ["0.ts", "--newLine"]);
    // 0.ts --target
    assertParseResult("Parse empty options of --target", ["0.ts", "--target"]);
    // 0.ts --moduleResolution
    assertParseResult("Parse empty options of --moduleResolution", ["0.ts", "--moduleResolution"]);
    // 0.ts --lib
    assertParseResult("Parse empty options of --lib", ["0.ts", "--lib"]);
    // 0.ts --lib
    // This test is an error because the empty string is falsey
    assertParseResult("Parse empty string of --lib", ["0.ts", "--lib", ""]);
    // 0.ts --lib
    assertParseResult("Parse immediately following command line argument of --lib", ["0.ts", "--lib", "--sourcemap"]);
    // --lib es5, es7 0.ts
    assertParseResult("Parse --lib option with extra comma", ["--lib", "es5,", "es7", "0.ts"]);
    // --lib es5, es7 0.ts
    assertParseResult("Parse --lib option with trailing white-space", ["--lib", "es5, ", "es7", "0.ts"]);
    // --lib es5,es2015.symbol.wellknown --target es5 0.ts
    assertParseResult("Parse multiple compiler flags with input files at the end", ["--lib", "es5,es2015.symbol.wellknown", "--target", "es5", "0.ts"]);
    // --module commonjs --target es5 0.ts --lib es5,es2015.symbol.wellknown
    assertParseResult("Parse multiple compiler flags with input files in the middle", ["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,es2015.symbol.wellknown"]);
    // --module commonjs --target es5 --lib es5 0.ts --library es2015.array,es2015.symbol.wellknown
    assertParseResult("Parse multiple library compiler flags ", ["--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es2015.core, es2015.symbol.wellknown "]);
    assertParseResult("Parse explicit boolean flag value", ["--strictNullChecks", "false", "0.ts"]);
    assertParseResult("Parse non boolean argument after boolean flag", ["--noImplicitAny", "t", "0.ts"]);
    assertParseResult("Parse implicit boolean flag value", ["--strictNullChecks"]);
    assertParseResult("parse --incremental", ["--incremental", "0.ts"]);
    assertParseResult("parse --tsBuildInfoFile", ["--tsBuildInfoFile", "build.tsbuildinfo", "0.ts"]);

    describe("parses command line null for tsconfig only option", () => {
        interface VerifyNull {
            subScenario: string;
            optionName: string;
            nonNullValue?: string;
            workerDiagnostic?: () => ts.ParseCommandLineWorkerDiagnostics;
        }
        function verifyNull({ subScenario, optionName, nonNullValue, workerDiagnostic }: VerifyNull) {
            describe(subScenario, () => {
                assertParseResult(
                    `${subScenario} allows setting it to null`,
                    [`--${optionName}`, "null", "0.ts"],
                    workerDiagnostic,
                );
                if (nonNullValue) {
                    assertParseResult(
                        `${subScenario} errors if non null value is passed`,
                        [`--${optionName}`, nonNullValue, "0.ts"],
                        workerDiagnostic,
                    );
                }

                assertParseResult(
                    `${subScenario} errors if its followed by another option`,
                    ["0.ts", "--strictNullChecks", `--${optionName}`],
                    workerDiagnostic,
                );

                assertParseResult(
                    `${subScenario} errors if its last option`,
                    ["0.ts", `--${optionName}`],
                    workerDiagnostic,
                );
            });
        }

        interface VerifyNullNonIncludedOption {
            subScenario: string;
            type: () => "string" | "number" | Map<string, number | string>;
            nonNullValue?: string;
        }
        function verifyNullNonIncludedOption({ subScenario, type, nonNullValue }: VerifyNullNonIncludedOption) {
            verifyNull({
                subScenario,
                optionName: "optionName",
                nonNullValue,
                workerDiagnostic: () => {
                    const optionDeclarations: ts.CommandLineOption[] = [
                        ...ts.compilerOptionsDidYouMeanDiagnostics.optionDeclarations,
                        {
                            name: "optionName",
                            type: type(),
                            isTSConfigOnly: true,
                            category: ts.Diagnostics.Backwards_Compatibility,
                            description: ts.Diagnostics.Enable_project_compilation,
                            defaultValueDescription: undefined,
                        },
                    ];
                    return {
                        ...ts.compilerOptionsDidYouMeanDiagnostics,
                        optionDeclarations,
                        getOptionsNameMap: () => ts.createOptionNameMap(optionDeclarations),
                    };
                },
            });
        }

        describe("option of type boolean", () => {
            assertParseResult(
                "allows setting option type boolean to false",
                ["--composite", "false", "0.ts"],
            );

            verifyNull({
                subScenario: "option of type boolean",
                optionName: "composite",
                nonNullValue: "true",
            });
        });

        verifyNull({
            subScenario: "option of type object",
            optionName: "paths",
        });

        verifyNull({
            subScenario: "option of type list",
            optionName: "rootDirs",
            nonNullValue: "abc,xyz",
        });
        verifyNullNonIncludedOption({
            subScenario: "option of type string",
            type: () => "string",
            nonNullValue: "hello",
        });

        verifyNullNonIncludedOption({
            subScenario: "option of type number",
            type: () => "number",
            nonNullValue: "10",
        });

        verifyNullNonIncludedOption({
            subScenario: "option of type custom map",
            type: () =>
                new Map(Object.entries({
                    node: ts.ModuleResolutionKind.Node10,
                    classic: ts.ModuleResolutionKind.Classic,
                })),
            nonNullValue: "node",
        });
    });

    assertParseResult("allows tsconfig only option to be set to null", ["--composite", "null", "-tsBuildInfoFile", "null", "0.ts"]);

    describe("Watch options", () => {
        assertParseResult("parse --watchFile", ["--watchFile", "UseFsEvents", "0.ts"]);
        assertParseResult("parse --watchDirectory", ["--watchDirectory", "FixedPollingInterval", "0.ts"]);
        assertParseResult("parse --fallbackPolling", ["--fallbackPolling", "PriorityInterval", "0.ts"]);
        assertParseResult("parse --synchronousWatchDirectory", ["--synchronousWatchDirectory", "0.ts"]);
        assertParseResult("errors on missing argument to --fallbackPolling", ["0.ts", "--fallbackPolling"]);
        assertParseResult("parse --excludeDirectories", ["--excludeDirectories", "**/temp", "0.ts"]);
        assertParseResult("errors on invalid excludeDirectories", ["--excludeDirectories", "**/../*", "0.ts"]);
        assertParseResult("parse --excludeFiles", ["--excludeFiles", "**/temp/*.ts", "0.ts"]);
        assertParseResult("errors on invalid excludeFiles", ["--excludeFiles", "**/../*", "0.ts"]);
    });
});

describe("unittests:: config:: commandLineParsing:: parseBuildOptions", () => {
    function assertParseResult(subScenario: string, commandLine: string[]) {
        it(subScenario, () => {
            const baseline: string[] = [];
            baseline.push(commandLine.join(" "));
            const parsed = ts.parseBuildCommand(commandLine);
            baseline.push("buildOptions::");
            baseline.push(jsonToReadableText(parsed.buildOptions));
            baseline.push("WatchOptions::");
            baseline.push(jsonToReadableText(parsed.watchOptions));
            baseline.push("Projects::");
            baseline.push(parsed.projects.join());
            baseline.push("Errors::");
            baseline.push(ts.formatDiagnostics(parsed.errors, {
                getCurrentDirectory: () => "/",
                getCanonicalFileName: ts.identity,
                getNewLine: () => "\n",
            }));
            Harness.Baseline.runBaseline(`config/commandLineParsing/parseBuildOptions/${subScenario}.js`, baseline.join("\n"));
        });
    }
    assertParseResult("parse build without any options ", []);
    assertParseResult("Parse multiple options", ["--verbose", "--force", "tests"]);
    assertParseResult("Parse option with invalid option", ["--verbose", "--invalidOption"]);
    assertParseResult("Parse multiple flags with input projects at the end", ["--force", "--verbose", "src", "tests"]);
    assertParseResult("Parse multiple flags with input projects in the middle", ["--force", "src", "tests", "--verbose"]);
    assertParseResult("Parse multiple flags with input projects in the beginning", ["src", "tests", "--force", "--verbose"]);
    assertParseResult("parse build with --incremental", ["--incremental", "tests"]);
    assertParseResult("parse build with --locale en-us", ["--locale", "en-us", "src"]);
    assertParseResult("parse build with --tsBuildInfoFile", ["--tsBuildInfoFile", "build.tsbuildinfo", "tests"]);
    assertParseResult("reports other common may not be used with --build flags", ["--strict"]);

    describe("Combining options that make no sense together", () => {
        function verifyInvalidCombination(flag1: keyof ts.BuildOptions, flag2: keyof ts.BuildOptions) {
            assertParseResult(`--${flag1} and --${flag2} together is invalid`, [`--${flag1}`, `--${flag2}`]);
        }
        verifyInvalidCombination("clean", "force");
        verifyInvalidCombination("clean", "verbose");
        verifyInvalidCombination("clean", "watch");
        verifyInvalidCombination("watch", "dry");
    });

    describe("Watch options", () => {
        assertParseResult("parse --watchFile", ["--watchFile", "UseFsEvents", "--verbose"]);
        assertParseResult("parse --watchDirectory", ["--watchDirectory", "FixedPollingInterval", "--verbose"]);
        assertParseResult("parse --fallbackPolling", ["--fallbackPolling", "PriorityInterval", "--verbose"]);
        assertParseResult("parse --synchronousWatchDirectory", ["--synchronousWatchDirectory", "--verbose"]);
        assertParseResult("errors on missing argument", ["--verbose", "--fallbackPolling"]);
        assertParseResult("errors on invalid excludeDirectories", ["--excludeDirectories", "**/../*"]);
        assertParseResult("parse --excludeFiles", ["--excludeFiles", "**/temp/*.ts"]);
        assertParseResult("errors on invalid excludeFiles", ["--excludeFiles", "**/../*"]);
    });
});

describe("unittests:: config:: commandLineParsing:: optionDeclarations", () => {
    it("should have affectsBuildInfo true for every option with affectsSemanticDiagnostics", () => {
        for (const option of ts.optionDeclarations) {
            if (option.affectsSemanticDiagnostics) {
                // semantic diagnostics affect the build info, so ensure they're included
                assert(option.affectsBuildInfo ?? false, option.name);
            }
        }
    });
});

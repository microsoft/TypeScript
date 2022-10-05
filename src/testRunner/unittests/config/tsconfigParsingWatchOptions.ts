namespace ts {
    describe("unittests:: config:: tsconfigParsingWatchOptions:: parseConfigFileTextToJson", () => {
        function createParseConfigHost(additionalFiles?: vfs.FileSet) {
            return new fakes.ParseConfigHost(
                new vfs.FileSystem(
                    /*ignoreCase*/ false,
                    {
                        cwd: "/",
                        files: { "/": {}, "/a.ts": "", ...additionalFiles }
                    }
                )
            );
        }
        function getParsedCommandJson(json: object, additionalFiles?: vfs.FileSet, existingWatchOptions?: WatchOptions) {
            return parseJsonConfigFileContent(
                json,
                createParseConfigHost(additionalFiles),
                "/",
                /*existingOptions*/ undefined,
                "tsconfig.json",
                /*resolutionStack*/ undefined,
                /*extraFileExtensions*/ undefined,
                /*extendedConfigCache*/ undefined,
                existingWatchOptions,
            );
        }

        function getParsedCommandJsonNode(json: object, additionalFiles?: vfs.FileSet, existingWatchOptions?: WatchOptions) {
            const parsed = parseJsonText("tsconfig.json", JSON.stringify(json));
            return parseJsonSourceFileConfigFileContent(
                parsed,
                createParseConfigHost(additionalFiles),
                "/",
                /*existingOptions*/ undefined,
                "tsconfig.json",
                /*resolutionStack*/ undefined,
                /*extraFileExtensions*/ undefined,
                /*extendedConfigCache*/ undefined,
                existingWatchOptions,
            );
        }

        interface VerifyWatchOptions {
            json: object;
            additionalFiles?: vfs.FileSet;
            existingWatchOptions?: WatchOptions | undefined;
        }

        function verifyWatchOptions(subScenario: string, scenario: () => VerifyWatchOptions[]) {
            describe(subScenario, () => {
                it("with json api", () => {
                    const baseline: string[] = [];
                    for (const { json, additionalFiles, existingWatchOptions } of scenario()) {
                        addToBaseLine(baseline, json, getParsedCommandJson(json, additionalFiles, existingWatchOptions));
                    }
                    runBaseline(`${subScenario} with json api`, baseline);
                });

                it("with json source file api", () => {
                    const baseline: string[] = [];
                    for (const { json, additionalFiles, existingWatchOptions, } of scenario()) {
                        addToBaseLine(baseline, json, getParsedCommandJsonNode(json, additionalFiles, existingWatchOptions));
                    }
                    runBaseline(`${subScenario} with jsonSourceFile api`, baseline);
                });
            });
            function addToBaseLine(baseline: string[], json: object, parsed: ParsedCommandLine) {
                baseline.push(`Input:: ${JSON.stringify(json, /*replacer*/ undefined, " ")}`);
                baseline.push(`Result: WatchOptions::`);
                baseline.push(JSON.stringify(parsed.watchOptions, /*replacer*/ undefined, " "));
                baseline.push(`Result: Errors::`);
                baseline.push(formatDiagnosticsWithColorAndContext(parsed.errors, {
                    getCurrentDirectory: () => "/",
                    getCanonicalFileName: identity,
                    getNewLine: () => "\n"
                }));
            }
            function runBaseline(subScenario: string, baseline: readonly string[]) {
                Harness.Baseline.runBaseline(`config/tsconfigParsingWatchOptions/${subScenario}.js`, baseline.join("\n"));
            }
        }

        verifyWatchOptions("no watchOptions specified option", () => [{
            json: {},
        }]);

        verifyWatchOptions("empty watchOptions specified option", () => [{
            json: { watchOptions: {} },
        }]);

        verifyWatchOptions("when extending config file without watchOptions", () => [
            {
                json: {
                    extends: "./base.json",
                    watchOptions: { watchFile: "UseFsEvents" }
                },
                additionalFiles: { "/base.json": "{}" }
            },
            {
                json: { extends: "./base.json", },
                additionalFiles: { "/base.json": "{}" }
            }
        ]);

        verifyWatchOptions("when extending config file with watchOptions", () => [
            {
                json: {
                    extends: "./base.json",
                    watchOptions: {
                        watchFile: "UseFsEvents",
                    }
                },
                additionalFiles: {
                    "/base.json": JSON.stringify({
                        watchOptions: {
                            watchFile: "UseFsEventsOnParentDirectory",
                            watchDirectory: "FixedPollingInterval"
                        }
                    })
                }
            },
            {
                json: {
                    extends: "./base.json",
                },
                additionalFiles: {
                    "/base.json": JSON.stringify({
                        watchOptions: {
                            watchFile: "UseFsEventsOnParentDirectory",
                            watchDirectory: "FixedPollingInterval"
                        }
                    })
                }
            }
        ]);

        verifyWatchOptions("different options", () => [
            {
                json: { watchOptions: { watchFile: "UseFsEvents" } },
            },
            {
                json: { watchOptions: { watchDirectory: "UseFsEvents" } },
            },
            {
                json: { watchOptions: { fallbackPolling: "DynamicPriority" } },
            },
            {
                json: { watchOptions: { synchronousWatchDirectory: true } },
            },
            {
                json: { watchOptions: { excludeDirectories: ["**/temp"] } },
            },
            {
                json: { watchOptions: { excludeFiles: ["**/temp/*.ts"] } },
            },
            {
                json: { watchOptions: { excludeDirectories: ["**/../*"] } },
            },
            {
                json: { watchOptions: { excludeFiles: ["**/../*"] } },
            },
        ]);

        verifyWatchOptions("watch options extending passed in watch options", () => [
            {
                json: { watchOptions: { watchFile: "UseFsEvents" } },
            },
            {
                json: {},
            },
        ]);
    });
}

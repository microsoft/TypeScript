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
            expectedOptions: WatchOptions | undefined;
            additionalFiles?: vfs.FileSet;
            existingWatchOptions?: WatchOptions | undefined;
        }

        function verifyWatchOptions(scenario: () => VerifyWatchOptions[]) {
            it("with json api", () => {
                for (const { json, expectedOptions, additionalFiles, existingWatchOptions } of scenario()) {
                    const parsed = getParsedCommandJson(json, additionalFiles, existingWatchOptions);
                    assert.deepEqual(parsed.watchOptions, expectedOptions);
                }
            });

            it("with json source file api", () => {
                for (const { json, expectedOptions, additionalFiles, existingWatchOptions } of scenario()) {
                    const parsed = getParsedCommandJsonNode(json, additionalFiles, existingWatchOptions);
                    assert.deepEqual(parsed.watchOptions, expectedOptions);
                }
            });
        }

        describe("no watchOptions specified option", () => {
            verifyWatchOptions(() => [{
                json: {},
                expectedOptions: undefined
            }]);
        });

        describe("empty watchOptions specified option", () => {
            verifyWatchOptions(() => [{
                json: { watchOptions: {} },
                expectedOptions: undefined
            }]);
        });

        describe("extending config file", () => {
            describe("when extending config file without watchOptions", () => {
                verifyWatchOptions(() => [
                    {
                        json: {
                            extends: "./base.json",
                            watchOptions: { watchFile: "UseFsEvents" }
                        },
                        expectedOptions: { watchFile: WatchFileKind.UseFsEvents },
                        additionalFiles: { "/base.json": "{}" }
                    },
                    {
                        json: { extends: "./base.json", },
                        expectedOptions: undefined,
                        additionalFiles: { "/base.json": "{}" }
                    }
                ]);
            });

            describe("when extending config file with watchOptions", () => {
                verifyWatchOptions(() => [
                    {
                        json: {
                            extends: "./base.json",
                            watchOptions: {
                                watchFile: "UseFsEvents",
                            }
                        },
                        expectedOptions: {
                            watchFile: WatchFileKind.UseFsEvents,
                            watchDirectory: WatchDirectoryKind.FixedPollingInterval
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
                        expectedOptions: {
                            watchFile: WatchFileKind.UseFsEventsOnParentDirectory,
                            watchDirectory: WatchDirectoryKind.FixedPollingInterval
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
            });
        });

        describe("different options", () => {
            verifyWatchOptions(() => [
                {
                    json: { watchOptions: { watchFile: "UseFsEvents" } },
                    expectedOptions: { watchFile: WatchFileKind.UseFsEvents }
                },
                {
                    json: { watchOptions: { watchDirectory: "UseFsEvents" } },
                    expectedOptions: { watchDirectory: WatchDirectoryKind.UseFsEvents }
                },
                {
                    json: { watchOptions: { fallbackPolling: "DynamicPriority" } },
                    expectedOptions: { fallbackPolling: PollingWatchKind.DynamicPriority }
                },
                {
                    json: { watchOptions: { synchronousWatchDirectory: true } },
                    expectedOptions: { synchronousWatchDirectory: true }
                }
            ]);
        });

        describe("watch options extending passed in watch options", () => {
            verifyWatchOptions(() => [
                {
                    json: { watchOptions: { watchFile: "UseFsEvents" } },
                    expectedOptions: { watchFile: WatchFileKind.UseFsEvents, watchDirectory: WatchDirectoryKind.FixedPollingInterval },
                    existingWatchOptions: { watchDirectory: WatchDirectoryKind.FixedPollingInterval }
                },
                {
                    json: {},
                    expectedOptions: { watchDirectory: WatchDirectoryKind.FixedPollingInterval },
                    existingWatchOptions: { watchDirectory: WatchDirectoryKind.FixedPollingInterval }
                },
            ]);
        });
    });
}

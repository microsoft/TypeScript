import * as ts from "../../_namespaces/ts.js";
import * as vfs from "../../_namespaces/vfs.js";
import * as fakes from "../../_namespaces/fakes.js";

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
    function getParsedCommandJson(json: object, additionalFiles?: vfs.FileSet, existingWatchOptions?: ts.WatchOptions) {
        return ts.parseJsonConfigFileContent(
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

    function getParsedCommandJsonNode(json: object, additionalFiles?: vfs.FileSet, existingWatchOptions?: ts.WatchOptions) {
        const parsed = ts.parseJsonText("tsconfig.json", JSON.stringify(json));
        return ts.parseJsonSourceFileConfigFileContent(
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
        expectedOptions: ts.WatchOptions | undefined;
        additionalFiles?: vfs.FileSet;
        existingWatchOptions?: ts.WatchOptions | undefined;
        expectedErrors?: (sourceFile?: ts.SourceFile) => ts.Diagnostic[];
    }

    function verifyWatchOptions(scenario: () => VerifyWatchOptions[]) {
        it("with json api", () => {
            for (const { json, expectedOptions, additionalFiles, existingWatchOptions, expectedErrors } of scenario()) {
                const parsed = getParsedCommandJson(json, additionalFiles, existingWatchOptions);
                assert.deepEqual(parsed.watchOptions, expectedOptions, `With ${JSON.stringify(json)}`);
                if (ts.length(parsed.errors)) {
                    assert.deepEqual(parsed.errors, expectedErrors?.());
                }
                else {
                    assert.equal(0, ts.length(expectedErrors?.()), `Expected no errors`);
                }
            }
        });

        it("with json source file api", () => {
            for (const { json, expectedOptions, additionalFiles, existingWatchOptions, expectedErrors } of scenario()) {
                const parsed = getParsedCommandJsonNode(json, additionalFiles, existingWatchOptions);
                assert.deepEqual(parsed.watchOptions, expectedOptions);
                if (ts.length(parsed.errors)) {
                    assert.deepEqual(parsed.errors, expectedErrors?.(parsed.options.configFile));
                }
                else {
                    assert.equal(0, ts.length(expectedErrors?.(parsed.options.configFile)), `Expected no errors`);
                }
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
                    expectedOptions: { watchFile: ts.WatchFileKind.UseFsEvents },
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
                        watchFile: ts.WatchFileKind.UseFsEvents,
                        watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval
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
                        watchFile: ts.WatchFileKind.UseFsEventsOnParentDirectory,
                        watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval
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
                expectedOptions: { watchFile: ts.WatchFileKind.UseFsEvents }
            },
            {
                json: { watchOptions: { watchDirectory: "UseFsEvents" } },
                expectedOptions: { watchDirectory: ts.WatchDirectoryKind.UseFsEvents }
            },
            {
                json: { watchOptions: { fallbackPolling: "DynamicPriority" } },
                expectedOptions: { fallbackPolling: ts.PollingWatchKind.DynamicPriority }
            },
            {
                json: { watchOptions: { synchronousWatchDirectory: true } },
                expectedOptions: { synchronousWatchDirectory: true }
            },
            {
                json: { watchOptions: { excludeDirectories: ["**/temp"] } },
                expectedOptions: { excludeDirectories: ["/**/temp"] }
            },
            {
                json: { watchOptions: { excludeFiles: ["**/temp/*.ts"] } },
                expectedOptions: { excludeFiles: ["/**/temp/*.ts"] }
            },
            {
                json: { watchOptions: { excludeDirectories: ["**/../*"] } },
                expectedOptions: { excludeDirectories: [] },
                expectedErrors: sourceFile => [
                    {
                        messageText: `File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.`,
                        category: ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.category,
                        code: ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.code,
                        file: sourceFile,
                        start: sourceFile && sourceFile.text.indexOf(`"**/../*"`),
                        length: sourceFile && `"**/../*"`.length,
                        reportsDeprecated: undefined,
                        reportsUnnecessary: undefined
                    }
                ]
            },
            {
                json: { watchOptions: { excludeFiles: ["**/../*"] } },
                expectedOptions: { excludeFiles: [] },
                expectedErrors: sourceFile => [
                    {
                        messageText: `File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.`,
                        category: ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.category,
                        code: ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0.code,
                        file: sourceFile,
                        start: sourceFile && sourceFile.text.indexOf(`"**/../*"`),
                        length: sourceFile && `"**/../*"`.length,
                        reportsDeprecated: undefined,
                        reportsUnnecessary: undefined
                    }
                ]
            },
        ]);
    });

    describe("watch options extending passed in watch options", () => {
        verifyWatchOptions(() => [
            {
                json: { watchOptions: { watchFile: "UseFsEvents" } },
                expectedOptions: { watchFile: ts.WatchFileKind.UseFsEvents, watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval },
                existingWatchOptions: { watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval }
            },
            {
                json: {},
                expectedOptions: { watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval },
                existingWatchOptions: { watchDirectory: ts.WatchDirectoryKind.FixedPollingInterval }
            },
        ]);
    });
});

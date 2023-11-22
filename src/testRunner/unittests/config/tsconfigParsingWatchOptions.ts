import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineParseConfig,
} from "./helpers";

describe("unittests:: config:: tsconfigParsingWatchOptions:: parseConfigFileTextToJson", () => {
    interface VerifyWatchOptions {
        json: object;
        additionalFiles?: vfs.FileSet;
        existingWatchOptions?: ts.WatchOptions | undefined;
    }

    function verifyWatchOptions(subScenario: string, scenario: () => VerifyWatchOptions[]) {
        baselineParseConfig({
            scenario: "tsconfigParsingWatchOptions",
            subScenario,
            input: () =>
                scenario().map(({ json, additionalFiles, existingWatchOptions }) => {
                    const jsonText = jsonToReadableText(json);
                    return {
                        createHost: () =>
                            new fakes.ParseConfigHost(
                                new vfs.FileSystem(
                                    /*ignoreCase*/ false,
                                    {
                                        cwd: "/",
                                        files: {
                                            "/a.ts": "",
                                            ...additionalFiles,
                                            "/tsconfig.json": jsonText,
                                        },
                                    },
                                ),
                            ),
                        jsonText,
                        configFileName: "tsconfig.json",
                        existingWatchOptions,
                        baselineParsed: (baseline, parsed) => {
                            baseline.push(`Result: WatchOptions::`);
                            baseline.push(jsonToReadableText(parsed.watchOptions));
                        },
                    };
                }),
        });
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
                watchOptions: { watchFile: "UseFsEvents" },
            },
            additionalFiles: { "/base.json": "{}" },
        },
        {
            json: { extends: "./base.json" },
            additionalFiles: { "/base.json": "{}" },
        },
    ]);

    verifyWatchOptions("when extending config file with watchOptions", () => [
        {
            json: {
                extends: "./base.json",
                watchOptions: {
                    watchFile: "UseFsEvents",
                },
            },
            additionalFiles: {
                "/base.json": jsonToReadableText({
                    watchOptions: {
                        watchFile: "UseFsEventsOnParentDirectory",
                        watchDirectory: "FixedPollingInterval",
                    },
                }),
            },
        },
        {
            json: {
                extends: "./base.json",
            },
            additionalFiles: {
                "/base.json": jsonToReadableText({
                    watchOptions: {
                        watchFile: "UseFsEventsOnParentDirectory",
                        watchDirectory: "FixedPollingInterval",
                    },
                }),
            },
        },
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

import assert from "node:assert/strict";
import test, { describe } from "node:test";
import {
    type ExplicitConfigurationValues,
    getExplicitConfigurationValue,
} from "../src/configurationPrecedence";

describe("getExplicitConfigurationValue", () => {
    const cases: [name: string, inspection: ExplicitConfigurationValues<string> | undefined, expected: string | undefined][] = [
        ["no inspection", undefined, undefined],
        ["nothing set", {}, undefined],
        ["user only", { globalValue: "user" }, "user"],
        ["workspace beats user", { globalValue: "user", workspaceValue: "workspace" }, "workspace"],
        ["folder beats workspace", { workspaceValue: "workspace", workspaceFolderValue: "folder" }, "folder"],
        ["user language beats user", { globalValue: "user", globalLanguageValue: "user-lang" }, "user-lang"],
        ["user language beats workspace", { workspaceValue: "workspace", globalLanguageValue: "user-lang" }, "user-lang"],
        ["user language beats folder", { workspaceFolderValue: "folder", globalLanguageValue: "user-lang" }, "user-lang"],
        ["workspace language beats user language", { globalLanguageValue: "user-lang", workspaceLanguageValue: "workspace-lang" }, "workspace-lang"],
        ["folder language beats workspace language", { workspaceLanguageValue: "workspace-lang", workspaceFolderLanguageValue: "folder-lang" }, "folder-lang"],
        [
            "folder language beats everything",
            {
                globalValue: "user",
                workspaceValue: "workspace",
                workspaceFolderValue: "folder",
                globalLanguageValue: "user-lang",
                workspaceLanguageValue: "workspace-lang",
                workspaceFolderLanguageValue: "folder-lang",
            },
            "folder-lang",
        ],
    ];

    for (const [name, inspection, expected] of cases) {
        test(name, () => {
            assert.equal(getExplicitConfigurationValue(inspection), expected);
        });
    }

    test("keeps falsy values", () => {
        assert.equal(getExplicitConfigurationValue<boolean>({ globalValue: true, globalLanguageValue: false }), false);
        assert.equal(getExplicitConfigurationValue<number>({ globalValue: 2, workspaceValue: 0 }), 0);
    });

    test("ignores defaults", () => {
        // Shaped like a real `inspect()` result, which also carries defaults.
        const inspection: ExplicitConfigurationValues<string> & { defaultValue?: string; defaultLanguageValue?: string; } = {
            defaultValue: "default",
            defaultLanguageValue: "default-lang",
        };
        assert.equal(getExplicitConfigurationValue(inspection), undefined);
    });
});

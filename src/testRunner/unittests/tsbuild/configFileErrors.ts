import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
    verifyTsc({
        scenario: "configFileErrors",
        subScenario: "when tsconfig extends the missing file",
        fs: () =>
            loadProjectFromFiles({
                "/src/tsconfig.first.json": jsonToReadableText({
                    extends: "./foobar.json",
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/src/tsconfig.second.json": jsonToReadableText({
                    extends: "./foobar.json",
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./tsconfig.first.json" },
                        { path: "./tsconfig.second.json" },
                    ],
                }),
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
    });
});

describe("unittests:: tsbuild:: configFileErrors:: reports syntax errors in config file", () => {
    verifyTsc({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        fs: () =>
            loadProjectFromFiles({
                "/src/a.ts": "export function foo() { }",
                "/src/b.ts": "export function bar() { }",
                "/src/tsconfig.json": dedent`
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`,
            }),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        edits: [
            {
                edit: fs =>
                    replaceText(
                        fs,
                        "/src/tsconfig.json",
                        ",",
                        `,
        "declaration": true,`,
                    ),
                caption: "reports syntax errors after change to config file",
                discrepancyExplanation: () => [
                    "During incremental build, tsbuildinfo is not emitted, so declaration option is not present",
                    "Clean build has declaration option in tsbuildinfo",
                ],
            },
            {
                edit: fs => appendText(fs, "/src/a.ts", "export function fooBar() { }"),
                caption: "reports syntax errors after change to ts file",
            },
            noChangeRun,
            {
                edit: fs =>
                    fs.writeFileSync(
                        "/src/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { composite: true, declaration: true },
                            files: ["a.ts", "b.ts"],
                        }),
                    ),
                caption: "builds after fixing config file errors",
            },
        ],
    });
});

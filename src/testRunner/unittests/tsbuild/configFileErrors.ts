import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
    ts.verifyTsc({
        scenario: "configFileErrors",
        subScenario: "when tsconfig extends the missing file",
        fs: () => ts.loadProjectFromDisk("tests/projects/missingExtendedConfig"),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
    });
});

describe("unittests:: tsbuild:: configFileErrors:: reports syntax errors in config file", () => {
    ts.verifyTscWithEdits({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        fs: () => ts.loadProjectFromFiles({
            "/src/a.ts": "export function foo() { }",
            "/src/b.ts": "export function bar() { }",
            "/src/tsconfig.json": Utils.dedent`
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`
        }),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        edits: [
            {
                modifyFs: fs => ts.replaceText(fs, "/src/tsconfig.json", ",", `,
        "declaration": true,`),
                subScenario: "reports syntax errors after change to config file",
                discrepancyExplanation: () => [
                    "During incremental build, tsbuildinfo is not emitted, so declaration option is not present",
                    "Clean build has declaration option in tsbuildinfo",
                ],
            },
            {
                modifyFs: fs => ts.appendText(fs, "/src/a.ts", "export function fooBar() { }"),
                subScenario: "reports syntax errors after change to ts file",
            },
            ts.noChangeRun,
            {
                modifyFs: fs => fs.writeFileSync(
                    "/src/tsconfig.json",
                    JSON.stringify({
                        compilerOptions: { composite: true, declaration: true },
                        files: ["a.ts", "b.ts"]
                    })
                ),
                subScenario: "builds after fixing config file errors"
            },
        ]
    });
});

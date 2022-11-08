import { appendText, loadProjectFromDisk, loadProjectFromFiles, noChangeRun, replaceText, verifyTsc, verifyTscWithEdits } from "../tsc/helpers";
import { dedent } from "../../_namespaces/Utils";

describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
    verifyTsc({
        scenario: "configFileErrors",
        subScenario: "when tsconfig extends the missing file",
        fs: () => loadProjectFromDisk("tests/projects/missingExtendedConfig"),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
    });
});

describe("unittests:: tsbuild:: configFileErrors:: reports syntax errors in config file", () => {
    verifyTscWithEdits({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        fs: () => loadProjectFromFiles({
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
}`
        }),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        edits: [
            {
                modifyFs: fs => replaceText(fs, "/src/tsconfig.json", ",", `,
        "declaration": true,`),
                subScenario: "reports syntax errors after change to config file",
                discrepancyExplanation: () => [
                    "During incremental build, tsbuildinfo is not emitted, so declaration option is not present",
                    "Clean build has declaration option in tsbuildinfo",
                ],
            },
            {
                modifyFs: fs => appendText(fs, "/src/a.ts", "export function fooBar() { }"),
                subScenario: "reports syntax errors after change to ts file",
            },
            noChangeRun,
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

import { dedent } from "../../_namespaces/Utils";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromDisk,
    loadProjectFromFiles, replaceText
} from "../helpers/vfs";

describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
    verifyTsc({
        scenario: "configFileErrors",
        subScenario: "when tsconfig extends the missing file",
        fs: () => loadProjectFromDisk("tests/projects/missingExtendedConfig"),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
    });
});

describe("unittests:: tsbuild:: configFileErrors:: reports syntax errors in config file", () => {
    verifyTsc({
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
                edit: fs => replaceText(fs, "/src/tsconfig.json", ",", `,
        "declaration": true,`),
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
                edit: fs => fs.writeFileSync(
                    "/src/tsconfig.json",
                    JSON.stringify({
                        compilerOptions: { composite: true, declaration: true },
                        files: ["a.ts", "b.ts"]
                    })
                ),
                caption: "builds after fixing config file errors"
            },
        ]
    });
});

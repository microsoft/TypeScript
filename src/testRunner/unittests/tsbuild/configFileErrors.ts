import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
    verifyTsc({
        scenario: "configFileErrors",
        subScenario: "when tsconfig extends the missing file",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.first.json": jsonToReadableText({
                    extends: "./foobar.json",
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/home/src/workspaces/project/tsconfig.second.json": jsonToReadableText({
                    extends: "./foobar.json",
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./tsconfig.first.json" },
                        { path: "./tsconfig.second.json" },
                    ],
                }),
            }),
        commandLineArgs: ["--b"],
    });
});

describe("unittests:: tsbuild:: configFileErrors:: reports syntax errors in config file", () => {
    function verify(outFile?: object) {
        verifyTsc({
            scenario: "configFileErrors",
            subScenario: `${outFile ? "outFile" : "multiFile"}/reports syntax errors in config file`,
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/home/src/workspaces/project/a.ts": "export function foo() { }",
                    "/home/src/workspaces/project/b.ts": "export function bar() { }",
                    "/home/src/workspaces/project/tsconfig.json": dedent`
{
    "compilerOptions": {
        "composite": true,${outFile ? jsonToReadableText(outFile).replace(/[{}]/g, "") : ""}
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`,
                }),
            commandLineArgs: ["--b"],
            edits: [
                {
                    edit: sys =>
                        sys.replaceFileText(
                            "/home/src/workspaces/project/tsconfig.json",
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
                    edit: sys => sys.appendFile("/home/src/workspaces/project/a.ts", "export function fooBar() { }"),
                    caption: "reports syntax errors after change to ts file",
                },
                noChangeRun,
                {
                    edit: sys =>
                        sys.writeFile(
                            "/home/src/workspaces/project/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: { composite: true, declaration: true, ...outFile },
                                files: ["a.ts", "b.ts"],
                            }),
                        ),
                    caption: "builds after fixing config file errors",
                },
            ],
        });
    }
    verify();
    verify({ outFile: "../outFile.js", module: "amd" });
});

import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsbuildWatch:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
    function build(sys: ts.tscWatch.WatchedSystem) {
        sys.checkTimeoutQueueLengthAndRun(1); // build the project
        sys.checkTimeoutQueueLength(0);
    }
    ts.tscWatch.verifyTscWatch({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        sys: () => ts.tscWatch.createWatchedSystem(
            [
                { path: `${ts.tscWatch.projectRoot}/a.ts`, content: "export function foo() { }" },
                { path: `${ts.tscWatch.projectRoot}/b.ts`, content: "export function bar() { }" },
                {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: Utils.dedent`
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`
                },
                ts.tscWatch.libFile
            ],
            { currentDirectory: ts.tscWatch.projectRoot }
        ),
        commandLineArgs: ["--b", "-w"],
        changes: [
            {
                caption: "reports syntax errors after change to config file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/tsconfig.json`, ",", `,
        "declaration": true,`),
                timeouts: build,
            },
            {
                caption: "reports syntax errors after change to ts file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/a.ts`, "foo", "fooBar"),
                timeouts: build,
            },
            {
                caption: "reports error when there is no change to tsconfig file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/tsconfig.json`, "", ""),
                timeouts: build,
            },
            {
                caption: "builds after fixing config file errors",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({
                    compilerOptions: { composite: true, declaration: true },
                    files: ["a.ts", "b.ts"]
                })),
                timeouts: build,
            }
        ]
    });
});
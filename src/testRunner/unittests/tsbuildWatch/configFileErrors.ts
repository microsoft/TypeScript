import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
    function verify(outFile?: object) {
        verifyTscWatch({
            scenario: "configFileErrors",
            subScenario: `${outFile ? "outFile" : "multiFile"}/reports syntax errors in config file`,
            sys: () =>
                TestServerHost.createWatchedSystem(
                    [
                        { path: `/user/username/projects/myproject/a.ts`, content: "export function foo() { }" },
                        { path: `/user/username/projects/myproject/b.ts`, content: "export function bar() { }" },
                        {
                            path: `/user/username/projects/myproject/tsconfig.json`,
                            content: dedent`
{
    "compilerOptions": {
        "composite": true,${outFile ? jsonToReadableText(outFile).replace(/[{}]/g, "") : ""}
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`,
                        },
                    ],
                    { currentDirectory: "/user/username/projects/myproject" },
                ),
            commandLineArgs: ["--b", "-w"],
            edits: [
                {
                    caption: "reports syntax errors after change to config file",
                    edit: sys =>
                        sys.replaceFileText(
                            `/user/username/projects/myproject/tsconfig.json`,
                            ",",
                            `,
        "declaration": true,`,
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build the project
                },
                {
                    caption: "reports syntax errors after change to ts file",
                    edit: sys => sys.replaceFileText(`/user/username/projects/myproject/a.ts`, "foo", "fooBar"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build the project
                },
                {
                    caption: "reports error when there is no change to tsconfig file",
                    edit: sys => sys.replaceFileText(`/user/username/projects/myproject/tsconfig.json`, "", ""),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build the project
                },
                {
                    caption: "builds after fixing config file errors",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/myproject/tsconfig.json`,
                            jsonToReadableText({
                                compilerOptions: { composite: true, declaration: true, ...outFile },
                                files: ["a.ts", "b.ts"],
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build the project
                },
            ],
        });
    }
    verify();
    verify({ outFile: "../outFile.js", module: "amd" });
});

import { createWatchedSystem, libFile, TestServerHost } from "../virtualFileSystemWithWatch";
import { verifyTscWatch } from "../tscWatch/helpers";
import { dedent } from "../../_namespaces/Utils";

describe("unittests:: tsbuildWatch:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
    function build(sys: TestServerHost) {
        sys.checkTimeoutQueueLengthAndRun(1); // build the project
        sys.checkTimeoutQueueLength(0);
    }
    verifyTscWatch({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        sys: () => createWatchedSystem(
            [
                { path: `/user/username/projects/myproject/a.ts`, content: "export function foo() { }" },
                { path: `/user/username/projects/myproject/b.ts`, content: "export function bar() { }" },
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: dedent`
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
                libFile
            ],
            { currentDirectory: "/user/username/projects/myproject" }
        ),
        commandLineArgs: ["--b", "-w"],
        changes: [
            {
                caption: "reports syntax errors after change to config file",
                change: sys => sys.replaceFileText(`/user/username/projects/myproject/tsconfig.json`, ",", `,
        "declaration": true,`),
                timeouts: build,
            },
            {
                caption: "reports syntax errors after change to ts file",
                change: sys => sys.replaceFileText(`/user/username/projects/myproject/a.ts`, "foo", "fooBar"),
                timeouts: build,
            },
            {
                caption: "reports error when there is no change to tsconfig file",
                change: sys => sys.replaceFileText(`/user/username/projects/myproject/tsconfig.json`, "", ""),
                timeouts: build,
            },
            {
                caption: "builds after fixing config file errors",
                change: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, JSON.stringify({
                    compilerOptions: { composite: true, declaration: true },
                    files: ["a.ts", "b.ts"]
                })),
                timeouts: build,
            }
        ]
    });
});
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsbuildWatch:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
    verifyTscWatch({
        scenario: "configFileErrors",
        subScenario: "reports syntax errors in config file",
        sys: () =>
            createWatchedSystem(
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
}`,
                    },
                    libFile,
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
                            compilerOptions: { composite: true, declaration: true },
                            files: ["a.ts", "b.ts"],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build the project
            },
        ],
    });
});

import { libContent } from "../tsc/helpers";
import { verifyTscWatch } from "../tscWatch/helpers";
import {
    createWatchedSystem,
    getTsBuildProjectFile,
    libFile,
} from "../virtualFileSystemWithWatch";

describe("unittests:: tsbuildWatch:: watchMode:: with reexport when referenced project reexports definitions from another file", () => {
    verifyTscWatch({
        scenario: "reexport",
        subScenario: "Reports errors correctly",
        commandLineArgs: ["-b", "-w", "-verbose", "src"],
        sys: () => createWatchedSystem(
            [
                ...[
                    "src/tsconfig.json",
                    "src/main/tsconfig.json", "src/main/index.ts",
                    "src/pure/tsconfig.json", "src/pure/index.ts", "src/pure/session.ts"
                ]
                    .map(f => getTsBuildProjectFile("reexport", f)),
                { path: libFile.path, content: libContent }
            ],
            { currentDirectory: `/user/username/projects/reexport` }
        ),
        edits: [
            {
                caption: "Introduce error",
                edit: sys => sys.replaceFileText(`/user/username/projects/reexport/src/pure/session.ts`, "// ", ""),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // build src/pure
                    sys.runQueuedTimeoutCallbacks(); // build src/main and src
                },
            },
            {
                caption: "Fix error",
                edit: sys => sys.replaceFileText(`/user/username/projects/reexport/src/pure/session.ts`, "bar: ", "// bar: "),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // build src/pure
                    sys.runQueuedTimeoutCallbacks(); // build src/main and src
                },
            }
        ]
    });
});
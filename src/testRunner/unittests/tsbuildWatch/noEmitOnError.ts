import {
    createWatchedSystem,
    getTsBuildProjectFile,
    libFile,
} from "../virtualFileSystemWithWatch";
import { libContent } from "../tsc/helpers";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../tscWatch/helpers";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmitOnError", () => {
    function change(caption: string, content: string): TscWatchCompileChange {
        return {
            caption,
            change: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, content),
            // build project
            timeouts: sys => {
                sys.checkTimeoutQueueLengthAndRun(1);
                sys.checkTimeoutQueueLength(0);
            },
        };
    }

    const noChange: TscWatchCompileChange = {
        caption: "No change",
        change: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFile(`/user/username/projects/noEmitOnError/src/main.ts`)!),
        // build project
        timeouts: sys => {
            sys.checkTimeoutQueueLengthAndRun(1);
            sys.checkTimeoutQueueLength(0);
        },
    };
    verifyTscWatch({
        scenario: "noEmitOnError",
        subScenario: "does not emit any files on error",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => createWatchedSystem(
            [
                ...["tsconfig.json", "shared/types/db.ts", "src/main.ts", "src/other.ts"]
                    .map(f => getTsBuildProjectFile("noEmitOnError", f)),
                { path: libFile.path, content: libContent }
            ],
            { currentDirectory: `/user/username/projects/noEmitOnError` }
        ),
        changes: [
            noChange,
            change("Fix Syntax error", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`),
            change("Semantic Error", `import { A } from "../shared/types/db";
const a: string = 10;`),
            noChange,
            change("Fix Semantic Error", `import { A } from "../shared/types/db";
const a: string = "hello";`),
            noChange,
        ],
        baselineIncremental: true
    });
});
import {
    getSysForNoEmitOnError,
} from "../helpers/noEmitOnError";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmitOnError", () => {
    function change(caption: string, content: string): TscWatchCompileChange {
        return {
            caption,
            edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, content),
            // build project
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        };
    }

    const noChange: TscWatchCompileChange = {
        caption: "No change",
        edit: sys => sys.writeFile(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFile(`/user/username/projects/noEmitOnError/src/main.ts`)!),
        // build project
        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
    };
    verifyTscWatch({
        scenario: "noEmitOnError",
        subScenario: "does not emit any files on error",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: getSysForNoEmitOnError,
        edits: [
            noChange,
            change(
                "Fix Syntax error",
                `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`,
            ),
            change(
                "Semantic Error",
                `import { A } from "../shared/types/db";
const a: string = 10;`,
            ),
            noChange,
            change(
                "Fix Semantic Error",
                `import { A } from "../shared/types/db";
const a: string = "hello";`,
            ),
            noChange,
        ],
        baselineIncremental: true,
    });
});

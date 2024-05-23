import { forEachNoEmitOnErrorScenario } from "../helpers/noEmitOnError.js";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import { createWatchedSystem } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc-watch:: noEmitOnError::", () => {
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
    forEachNoEmitOnErrorScenario(
        (fsContents, currentDirectory) => createWatchedSystem(fsContents, { currentDirectory }),
        (scenarioName, sys) => {
            verifyTscWatch({
                scenario: "noEmitOnError",
                subScenario: scenarioName("noEmitOnError"),
                commandLineArgs: ["--w"],
                sys,
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
            });
        },
    );
});

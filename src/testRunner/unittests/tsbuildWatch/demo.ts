import { dedent } from "../../_namespaces/Utils.js";
import {
    getFsContentsForDemoProjectReferencesCoreConfig,
    getSysForDemoProjectReferences,
} from "../helpers/demoProjectReferences.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: with demo:: project", () => {
    verifyTscWatch({
        scenario: "demo",
        subScenario: "updates with circular reference",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => {
            const sys = getSysForDemoProjectReferences();
            sys.writeFile(
                "core/tsconfig.json",
                getFsContentsForDemoProjectReferencesCoreConfig({
                    references: [{
                        path: "../zoo",
                    }],
                }),
            );
            return sys;
        },
        edits: [
            {
                caption: "Fix error",
                edit: sys => sys.writeFile("core/tsconfig.json", getFsContentsForDemoProjectReferencesCoreConfig()),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // build core
                    sys.runQueuedTimeoutCallbacks(); // build animals, zoo and solution
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "demo",
        subScenario: "updates with bad reference",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => {
            const sys = getSysForDemoProjectReferences();
            sys.prependFile(
                "core/utilities.ts",
                dedent`
                    import * as A from '../animals';
                `,
            );
            return sys;
        },
        edits: [
            {
                caption: "Prepend a line",
                edit: sys => sys.prependFile("core/utilities.ts", "\n"),
                // build core
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

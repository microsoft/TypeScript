import { dedent } from "../../_namespaces/Utils.js";
import {
    forEachLibResolutionScenario,
    getCommandLineArgsForLibResolution,
    getSysForLibResolutionUnknown,
} from "../helpers/libraryResolution.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tscWatch:: libraryResolution::", () => {
    function commandLineArgs(withoutConfig: true | undefined) {
        return ["-w", ...getCommandLineArgsForLibResolution(withoutConfig), "--extendedDiagnostics"];
    }
    function verify(withoutConfig?: true) {
        forEachLibResolutionScenario(
            /*forTsserver*/ false,
            withoutConfig,
            (subScenario, sys, edits) =>
                verifyTscWatch({
                    scenario: "libraryResolution",
                    subScenario,
                    sys,
                    commandLineArgs: commandLineArgs(withoutConfig),
                    edits: edits(),
                }),
        );
    }
    verify();
    verify(/*withoutConfig*/ true);

    verifyTscWatch({
        scenario: "libraryResolution",
        subScenario: "unknwon lib",
        sys: getSysForLibResolutionUnknown,
        commandLineArgs: commandLineArgs(/*withoutConfig*/ undefined),
        edits: [
            {
                caption: "edit index",
                edit: sys => sys.appendFile("/home/src/workspace/projects/project1/index.ts", "export const xyz = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "delete core",
                edit: sys => sys.deleteFile("/home/src/workspace/projects/project1/core.d.ts"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "remove unknown lib",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/workspace/projects/project1/file2.ts",
                        dedent`
                            /// <reference lib="webworker2"/>
                            /// <reference lib="scripthost"/>
                        `,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "correct webworker lib",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/workspace/projects/project1/file2.ts",
                        dedent`
                            /// <reference lib="webworker"/>
                            /// <reference lib="scripthost"/>
                        `,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

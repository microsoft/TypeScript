import { emptyArray } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    forEachLibResolutionScenario,
    getCommandLineArgsForLibResolution,
    getSysForLibResolutionUnknown,
} from "../helpers/libraryResolution.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: libraryResolution:: library file resolution", () => {
    function verify(withoutConfig?: true) {
        forEachLibResolutionScenario(/*forTsserver*/ false, withoutConfig, (subScenario, sys) =>
            verifyTsc({
                scenario: "libraryResolution",
                subScenario,
                sys,
                commandLineArgs: getCommandLineArgsForLibResolution(withoutConfig),
                baselinePrograms: true,
            }));
    }
    verify();
    verify(/*withoutConfig*/ true);

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "unknown lib",
        sys: getSysForLibResolutionUnknown,
        commandLineArgs: getCommandLineArgsForLibResolution(/*withoutConfig*/ undefined),
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "when noLib toggles",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/a.d.ts": `declare const a = "hello";`,
                "/home/src/workspaces/project/b.ts": `const b = 10;`,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        declaration: true,
                        incremental: true,
                        lib: ["es6"],
                    },
                }),
            }),
        commandLineArgs: emptyArray,
        edits: [
            {
                ...noChangeRun,
                commandLineArgs: ["--noLib"],
            },
        ],
        baselinePrograms: true,
    });
});

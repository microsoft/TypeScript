import { emptyArray } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
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

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "when one of the file skips default lib inclusion",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/a.d.ts": dedent`
                    /// <reference no-default-lib="true"/>
                    /// <reference lib="es6"/>
                    declare const a = "hello";
                `,
                "/home/src/workspaces/project/b.d.ts": `export const b = 10;`,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        lib: ["es6", "dom"],
                    },
                }),
            }),
        commandLineArgs: ["-i", "--explainFiles"],
        baselinePrograms: true,
    });
});

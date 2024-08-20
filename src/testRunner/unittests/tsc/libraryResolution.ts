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
import { loadProjectFromFiles } from "../helpers/vfs.js";

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
            loadProjectFromFiles({
                "/src/a.d.ts": `declare const a = "hello";`,
                "/src/b.ts": `const b = 10;`,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        declaration: true,
                        incremental: true,
                        lib: ["es6"],
                    },
                }),
            }),
        commandLineArgs: ["-p", "/src/tsconfig.json"],
        edits: [
            {
                ...noChangeRun,
                commandLineArgs: ["-p", "/src/tsconfig.json", "--noLib"],
            },
        ],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "when one of the file skips default lib inclusion",
        sys: () =>
            loadProjectFromFiles({
                "/src/a.d.ts": dedent`
                    /// <reference no-default-lib="true"/>
                    /// <reference lib="es6"/>
                    declare const a = "hello";
                `,
                "/src/b.d.ts": `export const b = 10;`,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        lib: ["es6", "dom"],
                    },
                }),
            }),
        commandLineArgs: ["-p", "/src/tsconfig.json", "-i", "--explainFiles"],
        baselinePrograms: true,
    });
});

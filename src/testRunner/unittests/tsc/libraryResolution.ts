import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { libContent } from "../helpers/contents.js";
import {
    getCommandLineArgsForLibResolution,
    getFsForLibResolution,
    getFsForLibResolutionUnknown,
} from "../helpers/libraryResolution.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: libraryResolution:: library file resolution", () => {
    function verify(libRedirection?: true, withoutConfig?: true) {
        verifyTsc({
            scenario: "libraryResolution",
            subScenario: `${withoutConfig ? "without" : "with"} config${libRedirection ? " with redirection" : ""}`,
            fs: () => getFsForLibResolution(libRedirection),
            commandLineArgs: getCommandLineArgsForLibResolution(withoutConfig),
            baselinePrograms: true,
        });
    }
    verify();
    verify(/*libRedirection*/ true);
    verify(/*libRedirection*/ undefined, /*withoutConfig*/ true);
    verify(/*libRedirection*/ true, /*withoutConfig*/ true);

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "unknown lib",
        fs: () => getFsForLibResolutionUnknown(),
        commandLineArgs: getCommandLineArgsForLibResolution(/*withoutConfig*/ undefined),
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "when noLib toggles",
        fs: () =>
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
                "/lib/lib.es2015.d.ts": libContent,
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
        fs: () =>
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
                "/lib/lib.es2015.d.ts": libContent,
            }),
        commandLineArgs: ["-p", "/src/tsconfig.json", "-i", "--explainFiles"],
        baselinePrograms: true,
    });
});

import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc:: listFilesOnly::", () => {
    ts.verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "combined with watch",
        fs: () => ts.loadProjectFromFiles({
            "/src/test.ts": Utils.dedent`
                        export const x = 1;`,
        }),
        commandLineArgs: ["/src/test.ts", "--watch", "--listFilesOnly"]
    });

    ts.verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "loose file",
        fs: () => ts.loadProjectFromFiles({
            "/src/test.ts": Utils.dedent`
                        export const x = 1;`,
        }),
        commandLineArgs: ["/src/test.ts", "--listFilesOnly"]
    });

    ts.verifyTscWithEdits({
        scenario: "listFilesOnly",
        subScenario: "combined with incremental",
        fs: () => ts.loadProjectFromFiles({
            "/src/test.ts": `export const x = 1;`,
            "/src/tsconfig.json": "{}"
        }),
        commandLineArgs: ["-p", "/src", "--incremental", "--listFilesOnly"],
        edits: [
            {
                ...ts.noChangeRun,
                commandLineArgs: ["-p", "/src", "--incremental"],
            },
            ts.noChangeRun,
            {
                ...ts.noChangeRun,
                commandLineArgs: ["-p", "/src", "--incremental"],
            }
        ]
    });
});

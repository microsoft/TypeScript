import { dedent } from "../../_namespaces/Utils.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: listFilesOnly::", () => {
    verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "loose file",
        sys: () =>
            loadProjectFromFiles({
                "/src/test.ts": dedent`
                        export const x = 1;`,
            }),
        commandLineArgs: ["/src/test.ts", "--listFilesOnly"],
    });

    verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "combined with incremental",
        sys: () =>
            loadProjectFromFiles({
                "/src/test.ts": `export const x = 1;`,
                "/src/tsconfig.json": "{}",
            }),
        commandLineArgs: ["-p", "/src", "--incremental", "--listFilesOnly"],
        edits: [
            {
                ...noChangeRun,
                commandLineArgs: ["-p", "/src", "--incremental"],
            },
            noChangeRun,
            {
                ...noChangeRun,
                commandLineArgs: ["-p", "/src", "--incremental"],
            },
        ],
    });
});

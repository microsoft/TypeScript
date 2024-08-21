import { dedent } from "../../_namespaces/Utils.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: listFilesOnly::", () => {
    verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "loose file",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/test.ts": dedent`
                        export const x = 1;`,
            }, { currentDirectory: "/" }),
        commandLineArgs: ["/src/test.ts", "--listFilesOnly"],
    });

    verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "combined with incremental",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/test.ts": `export const x = 1;`,
                "/src/tsconfig.json": "{}",
            }, { currentDirectory: "/" }),
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

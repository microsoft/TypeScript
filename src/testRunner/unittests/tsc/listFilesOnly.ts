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
                "/home/src/workspaces/project/test.ts": "export const x = 1;",
            }, { currentDirectory: "/home/src/workspaces/project" }),
        commandLineArgs: ["test.ts", "--listFilesOnly"],
    });

    verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "combined with incremental",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/test.ts": "export const x = 1;",
                "/home/src/workspaces/project/tsconfig.json": "{}",
            }, { currentDirectory: "/home/src/workspaces/project" }),
        commandLineArgs: ["--incremental", "--listFilesOnly"],
        edits: [
            {
                ...noChangeRun,
                commandLineArgs: ["--incremental"],
            },
            noChangeRun,
            {
                ...noChangeRun,
                commandLineArgs: ["--incremental"],
            },
        ],
    });
});

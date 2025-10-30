import { noop } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild - clean::", () => {
    verifyTsc({
        scenario: "clean",
        subScenario: `file name and output name clashing`,
        commandLineArgs: ["--b", "-clean"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/index.js": "",
                "/home/src/workspaces/solution/bar.ts": "",
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    compilerOptions: { allowJs: true },
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
    });

    verifyTsc({
        scenario: "clean",
        subScenario: "tsx with dts emit",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/project/src/main.tsx": "export const x = 10;",
                "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { declaration: true },
                    include: ["src/**/*.tsx", "src/**/*.ts"],
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "project", "-v", "--explainFiles"],
        edits: [
            noChangeRun,
            {
                caption: "clean build",
                edit: noop,
                commandLineArgs: ["-b", "project", "--clean"],
            },
        ],
    });
});

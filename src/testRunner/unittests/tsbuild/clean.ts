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
        commandLineArgs: ["--b", "/src/tsconfig.json", "-clean"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/index.js": "",
                "/src/bar.ts": "",
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { allowJs: true },
                }),
            }, { currentDirectory: "/" }),
    });

    verifyTsc({
        scenario: "clean",
        subScenario: "tsx with dts emit",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.tsx": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { declaration: true },
                    include: ["src/**/*.tsx", "src/**/*.ts"],
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "src/project", "-v", "--explainFiles"],
        edits: [
            noChangeRun,
            {
                caption: "clean build",
                edit: noop,
                commandLineArgs: ["-b", "/src/project", "--clean"],
            },
        ],
    });
});

import {
    noop,
} from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild - clean::", () => {
    verifyTsc({
        scenario: "clean",
        subScenario: `file name and output name clashing`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-clean"],
        fs: () =>
            loadProjectFromFiles({
                "/src/index.js": "",
                "/src/bar.ts": "",
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { allowJs: true },
                }),
            }),
    });

    verifyTsc({
        scenario: "clean",
        subScenario: "tsx with dts emit",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/src/main.tsx": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { declaration: true },
                    include: ["src/**/*.tsx", "src/**/*.ts"],
                }),
            }),
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

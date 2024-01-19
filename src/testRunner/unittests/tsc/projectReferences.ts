import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsc:: projectReferences::", () => {
    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project contains invalid project reference",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "amd",
                        outFile: "theApp.js",
                    },
                    references: [
                        { path: "../Util/Dates" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project references composite project with noEmit",
        fs: () =>
            loadProjectFromFiles({
                "/src/utils/index.ts": "export const x = 10;",
                "/src/utils/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        noEmit: true,
                    },
                }),
                "/src/project/index.ts": `import { x } from "../utils";`,
                "/src/project/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "../utils" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project"],
    });
});

import * as ts from "../../_namespaces/ts";

describe("unittests:: tsc:: projectReferences::", () => {
    ts.verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project contains invalid project reference",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "amd",
                    outFile: "theApp.js"
                },
                references: [
                    { path: "../Util/Dates" }
                ]
            }),
        }),
        commandLineArgs: ["--p", "src/project"],
    });

    ts.verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project references composite project with noEmit",
        fs: () => ts.loadProjectFromFiles({
            "/src/utils/index.ts": "export const x = 10;",
            "/src/utils/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    composite: true,
                    noEmit: true,
                }
            }),
            "/src/project/index.ts": `import { x } from "../utils";`,
            "/src/project/tsconfig.json": JSON.stringify({
                references: [
                    { path: "../utils" }
                ]
            }),
        }),
        commandLineArgs: ["--p", "src/project"]
    });
});

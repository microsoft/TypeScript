import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuild - clean", () => {
    ts.verifyTsc({
        scenario: "clean",
        subScenario: `file name and output name clashing`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-clean"],
        fs: () => ts.loadProjectFromFiles({
            "/src/index.js": "",
            "/src/bar.ts": "",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: { allowJs: true },
            }),
        }),
    });
});
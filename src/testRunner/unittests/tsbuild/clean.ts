import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild - clean", () => {
    verifyTsc({
        scenario: "clean",
        subScenario: `file name and output name clashing`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-clean"],
        fs: () =>
            loadProjectFromFiles({
                "/src/index.js": "",
                "/src/bar.ts": "",
                "/src/tsconfig.json": JSON.stringify({
                    compilerOptions: { allowJs: true },
                }),
            }),
    });
});

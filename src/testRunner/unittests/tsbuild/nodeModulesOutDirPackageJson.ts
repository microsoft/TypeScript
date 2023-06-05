import {
    verifyTsc,
} from "../helpers/tsc";
import { loadProjectFromFiles } from "../helpers/vfs";

describe("unittests:: tsbuild:: nodeModulesOutDirPackageJson", () => {
    verifyTsc({
        scenario: "nodeModulesOutDirPackageJson",
        subScenario: "recognizes package.json in outDir of referenced project",
        commandLineArgs: ["-b", "/src/tsconfig.json", "-v"],
        fs: () => loadProjectFromFiles({
            "/shared/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    target: "es5",
                    composite: true,
                    outDir: "dist"
                }
            }),
            "/shared/red.ts": "export const red = 'fish';",
            "/shared/dist/package.json": JSON.stringify({ type: "module" }),

            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    target: "es5",
                    module: "nodenext",
                    noEmit: true,
                },
                references: [{ path: "../shared" }]
            }),
            "/src/index.ts": "import { red } from '../shared/red';",
        }),
    });
});

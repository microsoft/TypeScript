import * as vfs from "../../_namespaces/vfs";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: when project reference is referenced transitively", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/transitiveReferences");
    });
    after(() => {
        projFs = undefined!; // Release the contents
    });

    function modifyFsBTsToNonRelativeImport(fs: vfs.FileSystem, moduleResolution: "node" | "classic") {
        fs.writeFileSync(
            "/src/b.ts",
            `import {A} from 'a';
export const b = new A();`,
        );
        fs.writeFileSync(
            "/src/tsconfig.b.json",
            JSON.stringify({
                compilerOptions: {
                    composite: true,
                    moduleResolution,
                },
                files: ["b.ts"],
                references: [{ path: "tsconfig.a.json" }],
            }),
        );
    }

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly when the referenced project uses different module resolution",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "classic"),
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "reports error about module not found with node resolution with external module name",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "node"),
    });
});

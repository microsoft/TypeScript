import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild:: when project reference is referenced transitively", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/transitiveReferences");
    });
    after(() => {
        projFs = undefined!; // Release the contents
    });

    function modifyFsBTsToNonRelativeImport(fs: vfs.FileSystem, moduleResolution: "node" | "classic") {
        fs.writeFileSync("/src/b.ts", `import {A} from 'a';
export const b = new A();`);
        fs.writeFileSync("/src/tsconfig.b.json", JSON.stringify({
            compilerOptions: {
                composite: true,
                moduleResolution
            },
            files: ["b.ts"],
            references: [{ path: "tsconfig.a.json" }]
        }));
    }

    ts.verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
    });

    ts.verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly when the referenced project uses different module resolution",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "classic"),
    });

    ts.verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "reports error about module not found with node resolution with external module name",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "node"),
    });
});

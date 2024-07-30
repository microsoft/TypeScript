import * as vfs from "../../_namespaces/vfs.js";
import { jsonToReadableText } from "../helpers.js";
import { getFsContentsForTransitiveReferences } from "../helpers/transitiveReferences.js";
import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";
import { libFile } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: when project reference is referenced transitively", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromFiles(
            getFsContentsForTransitiveReferences(),
            {
                cwd: "/user/username/projects/transitiveReferences",
                executingFilePath: libFile.path,
            },
        );
    });
    after(() => {
        projFs = undefined!; // Release the contents
    });

    function modifyFsBTsToNonRelativeImport(fs: vfs.FileSystem, moduleResolution: "node" | "classic") {
        fs.writeFileSync(
            "b.ts",
            `import {A} from 'a';
export const b = new A();`,
        );
        fs.writeFileSync(
            "tsconfig.b.json",
            jsonToReadableText({
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
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly when the referenced project uses different module resolution",
        fs: () => projFs,
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "classic"),
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "reports error about module not found with node resolution with external module name",
        fs: () => projFs,
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
        modifyFs: fs => modifyFsBTsToNonRelativeImport(fs, "node"),
    });
});

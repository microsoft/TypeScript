import * as vfs from "../../_namespaces/vfs";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
    replaceText
} from "../helpers/vfs";

describe("unittests:: tsbuild:: with rootDir of project reference in parentDirectory", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/projectReferenceWithRootDirInParent");
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "builds correctly",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "/src/src/other"],
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file because no rootDir in the base",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifyFs: fs => replaceText(fs, "/src/tsconfig.base.json", `"rootDir": "./src/",`, ""),
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports error for same tsbuildinfo file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main", "--verbose"],
        modifyFs: fs => {
            fs.writeFileSync("/src/src/main/tsconfig.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
                references: [{ path: "../other" }]
            }));
            fs.writeFileSync("/src/src/other/tsconfig.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
            }));
        },
    });

    verifyTsc({
        scenario: "projectReferenceWithRootDirInParent",
        subScenario: "reports no error when tsbuildinfo differ",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/src/main/tsconfig.main.json", "--verbose"],
        modifyFs: fs => {
            fs.renameSync("/src/src/main/tsconfig.json", "/src/src/main/tsconfig.main.json");
            fs.renameSync("/src/src/other/tsconfig.json", "/src/src/other/tsconfig.other.json");
            fs.writeFileSync("/src/src/main/tsconfig.main.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
                references: [{ path: "../other/tsconfig.other.json" }]
            }));
            fs.writeFileSync("/src/src/other/tsconfig.other.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
            }));
        },
    });
});

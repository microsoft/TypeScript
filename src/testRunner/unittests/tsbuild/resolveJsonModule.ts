import * as vfs from "../../_namespaces/vfs";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: with resolveJsonModule option on project resolveJsonModuleAndComposite", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include only",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withInclude.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include and file name matches ts file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json", "--v", "--explainFiles"],
        modifyFs: fs => {
            fs.rimrafSync("/src/src/hello.json");
            fs.writeFileSync("/src/src/index.json", JSON.stringify({ hello: "world" }));
            fs.writeFileSync(
                "/src/src/index.ts",
                `import hello from "./index.json"

export default hello.hello`,
            );
        },
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "files containing json file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withFiles.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include and files",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeAndFiles.json", "--v", "--explainFiles"],
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "sourcemap",
        fs: () => projFs,
        commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose", "--explainFiles"],
        modifyFs: fs => replaceText(fs, "src/tsconfig_withFiles.json", `"composite": true,`, `"composite": true, "sourceMap": true,`),
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "without outDir",
        fs: () => projFs,
        commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose"],
        modifyFs: fs => replaceText(fs, "src/tsconfig_withFiles.json", `"outDir": "dist",`, ""),
        edits: noChangeOnlyRuns,
    });
});

describe("unittests:: tsbuild:: with resolveJsonModule option on project importJsonFromProjectReference", () => {
    verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "importing json module from project reference",
        fs: () => loadProjectFromDisk("tests/projects/importJsonFromProjectReference"),
        commandLineArgs: ["--b", "src/tsconfig.json", "--verbose", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});

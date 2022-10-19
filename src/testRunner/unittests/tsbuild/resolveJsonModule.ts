import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild:: with resolveJsonModule option on project resolveJsonModuleAndComposite", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    ts.verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include only",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withInclude.json", "--v", "--explainFiles"],
    });

    ts.verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json", "--v", "--explainFiles"],
    });

    ts.verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include of json along with other include and file name matches ts file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json", "--v", "--explainFiles"],
        modifyFs: fs => {
            fs.rimrafSync("/src/src/hello.json");
            fs.writeFileSync("/src/src/index.json", JSON.stringify({ hello: "world" }));
            fs.writeFileSync("/src/src/index.ts", `import hello from "./index.json"

export default hello.hello`);
        },
    });

    ts.verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "files containing json file",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withFiles.json", "--v", "--explainFiles"],
    });

    ts.verifyTsc({
        scenario: "resolveJsonModule",
        subScenario: "include and files",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig_withIncludeAndFiles.json", "--v", "--explainFiles"],
    });

    ts.verifyTscWithEdits({
        scenario: "resolveJsonModule",
        subScenario: "sourcemap",
        fs: () => projFs,
        commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose", "--explainFiles"],
        modifyFs: fs => ts.replaceText(fs, "src/tsconfig_withFiles.json", `"composite": true,`, `"composite": true, "sourceMap": true,`),
        edits: ts.noChangeOnlyRuns
    });

    ts.verifyTscWithEdits({
        scenario: "resolveJsonModule",
        subScenario: "without outDir",
        fs: () => projFs,
        commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose"],
        modifyFs: fs => ts.replaceText(fs, "src/tsconfig_withFiles.json", `"outDir": "dist",`, ""),
        edits: ts.noChangeOnlyRuns
    });
});

describe("unittests:: tsbuild:: with resolveJsonModule option on project importJsonFromProjectReference", () => {
    ts.verifyTscWithEdits({
        scenario: "resolveJsonModule",
        subScenario: "importing json module from project reference",
        fs: () => ts.loadProjectFromDisk("tests/projects/importJsonFromProjectReference"),
        commandLineArgs: ["--b", "src/tsconfig.json", "--verbose", "--explainFiles"],
        edits: ts.noChangeOnlyRuns
    });
});

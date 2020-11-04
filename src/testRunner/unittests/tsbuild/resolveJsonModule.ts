namespace ts {
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
            commandLineArgs: ["--b", "/src/tsconfig_withInclude.json"],
        });

        verifyTsc({
            scenario: "resolveJsonModule",
            subScenario: "include of json along with other include",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json"],
        });

        verifyTsc({
            scenario: "resolveJsonModule",
            subScenario: "include of json along with other include and file name matches ts file",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig_withIncludeOfJson.json"],
            modifyFs: fs => {
                fs.rimrafSync("/src/src/hello.json");
                fs.writeFileSync("/src/src/index.json", JSON.stringify({ hello: "world" }));
                fs.writeFileSync("/src/src/index.ts", `import hello from "./index.json"

export default hello.hello`);
            },
        });

        verifyTsc({
            scenario: "resolveJsonModule",
            subScenario: "files containing json file",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig_withFiles.json"],
        });

        verifyTsc({
            scenario: "resolveJsonModule",
            subScenario: "include and files",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig_withIncludeAndFiles.json"],
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "resolveJsonModule",
            subScenario: "sourcemap",
            fs: () => projFs,
            commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose"],
            modifyFs: fs => replaceText(fs, "src/tsconfig_withFiles.json", `"composite": true,`, `"composite": true, "sourceMap": true,`),
            incrementalScenarios: noChangeOnlyRuns
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "resolveJsonModule",
            subScenario: "without outDir",
            fs: () => projFs,
            commandLineArgs: ["--b", "src/tsconfig_withFiles.json", "--verbose"],
            modifyFs: fs => replaceText(fs, "src/tsconfig_withFiles.json", `"outDir": "dist",`, ""),
            incrementalScenarios: noChangeOnlyRuns
        });
    });

    describe("unittests:: tsbuild:: with resolveJsonModule option on project importJsonFromProjectReference", () => {
        verifyTscSerializedIncrementalEdits({
            scenario: "resolveJsonModule",
            subScenario: "importing json module from project reference",
            fs: () => loadProjectFromDisk("tests/projects/importJsonFromProjectReference"),
            commandLineArgs: ["--b", "src/tsconfig.json", "--verbose"],
            incrementalScenarios: noChangeOnlyRuns
        });
    });
}

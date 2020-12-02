namespace ts {
    describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
        verifyTscSerializedIncrementalEdits({
            subScenario: "interface is merged and contains late bound member",
            fs: () => loadProjectFromDisk("tests/projects/lateBoundSymbol"),
            scenario: "lateBoundSymbol",
            commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
            incrementalScenarios: [{
                buildKind: BuildKind.IncrementalDtsUnchanged,
                modifyFs: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
            }]
        });
    });
}

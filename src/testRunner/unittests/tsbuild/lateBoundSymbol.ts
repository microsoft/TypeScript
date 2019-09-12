namespace ts {
    describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/lateBoundSymbol", time);
        });
        after(() => {
            projFs = undefined!; // Release the contents
        });

        verifyTscIncrementalEdits({
            subScenario: "interface is merged and contains late bound member",
            fs: () => projFs,
            tick,
            scenario: "lateBoundSymbol",
            commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
            incrementalScenarios: [{
                buildKind: BuildKind.IncrementalDtsUnchanged,
                modifyFs: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
            }]
        });
    });
}

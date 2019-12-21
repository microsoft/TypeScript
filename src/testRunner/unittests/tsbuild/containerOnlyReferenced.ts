namespace ts {
    describe("unittests:: tsbuild:: when containerOnly project is referenced", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/containerOnlyReferenced");
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        verifyTscIncrementalEdits({
            scenario: "containerOnlyReferenced",
            subScenario: "verify that subsequent builds after initial build doesnt build anything",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src", "--verbose"],
            incrementalScenarios: [noChangeRun]
        });
    });
}

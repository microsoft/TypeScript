namespace ts {
    describe("unittests:: tsbuild:: when containerOnly project is referenced", () => {
        verifyTscIncrementalEdits({
            scenario: "containerOnlyReferenced",
            subScenario: "verify that subsequent builds after initial build doesnt build anything",
            fs: () => loadProjectFromDisk("tests/projects/containerOnlyReferenced"),
            commandLineArgs: ["--b", "/src", "--verbose"],
            incrementalScenarios: [noChangeRun]
        });
    });
}

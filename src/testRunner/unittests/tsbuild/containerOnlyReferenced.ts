namespace ts {
    describe("unittests:: tsbuild:: when containerOnly project is referenced", () => {
        verifyTscWithEdits({
            scenario: "containerOnlyReferenced",
            subScenario: "verify that subsequent builds after initial build doesnt build anything",
            fs: () => loadProjectFromDisk("tests/projects/containerOnlyReferenced"),
            commandLineArgs: ["--b", "/src", "--verbose"],
            edits: noChangeOnlyRuns
        });
    });
}

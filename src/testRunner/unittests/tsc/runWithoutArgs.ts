namespace ts {
    describe("unittests:: tsc:: runWithoutArgs::", () => {
        verifyTsc({
            scenario: "runWithoutArgs",
            subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
            fs: () => loadProjectFromFiles({}),
            commandLineArgs: []
        });
    });
}

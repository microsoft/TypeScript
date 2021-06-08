namespace ts {
    describe("unittests:: tsc:: runWithoutArgs::", () => {
        verifyTsc({
            scenario: "runWithoutArgs",
            subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
            fs: () => loadProjectFromFiles({}),
            commandLineArgs: [],
            environmentVariables: { TS_TEST_TERMINAL_WIDTH: "120" }
        });

        verifyTsc({
            scenario: "runWithoutArgs",
            subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
            fs: () => loadProjectFromFiles({}),
            commandLineArgs: [],
        });
    });
}

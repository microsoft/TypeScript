namespace ts {
    describe("unittests:: tsbuild:: configFileErrors:: when tsconfig extends the missing file", () => {
        verifyTsc({
            scenario: "configFileErrors",
            subScenario: "when tsconfig extends the missing file",
            fs: () => loadProjectFromDisk("tests/projects/missingExtendedConfig"),
            commandLineArgs: ["--b", "/src/tsconfig.json"],
        });
    });
}

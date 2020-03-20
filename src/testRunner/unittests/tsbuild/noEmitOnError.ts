namespace ts {
    describe("unittests:: tsbuild - with noEmitOnError", () => {
        verifyTsc({
            scenario: "noEmitOnError",
            subScenario: "has empty files diagnostic when files is empty and no references are provided",
            fs: () => loadProjectFromDisk("tests/projects/noEmitOnError"),
            commandLineArgs: ["--b", "/src/tsconfig.json"],
        });
    });
}

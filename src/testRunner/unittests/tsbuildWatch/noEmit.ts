namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: with noEmit", () => {
        verifyTscWatch({
            scenario: "noEmit",
            subScenario: "does not go in loop when watching when no files are emitted",
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () => createWatchedSystem(
                [
                    { path: libFile.path, content: libContent },
                    { path: `${projectRoot}/a.js`, content: "" },
                    { path: `${projectRoot}/b.ts`, content: "" },
                    { path: `${projectRoot}/tsconfig.json`, content: JSON.stringify({ compilerOptions: { allowJs: true, noEmit: true } }) },
                ],
                { currentDirectory: projectRoot }
            ),
            changes: [
                {
                    caption: "No change",
                    change: sys => sys.writeFile(`${projectRoot}/a.js`, sys.readFile(`${projectRoot}/a.js`)!),
                    // build project
                    timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                },
                {
                    caption: "change",
                    change: sys => sys.writeFile(`${projectRoot}/a.js`, "const x = 10;"),
                    // build project
                    timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                },
            ],
            baselineIncremental: true
        });
    });
}
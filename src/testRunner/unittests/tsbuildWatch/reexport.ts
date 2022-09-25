namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: with reexport when referenced project reexports definitions from another file", () => {
        verifyTscWatch({
            scenario: "reexport",
            subScenario: "Reports errors correctly",
            commandLineArgs: ["-b", "-w", "-verbose", "src"],
            sys: () => createWatchedSystem(
                [
                    ...[
                        "src/tsconfig.json",
                        "src/main/tsconfig.json", "src/main/index.ts",
                        "src/pure/tsconfig.json", "src/pure/index.ts", "src/pure/session.ts"
                    ]
                        .map(f => TestFSWithWatch.getTsBuildProjectFile("reexport", f)),
                    { path: libFile.path, content: libContent }
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/reexport` }
            ),
            changes: [
                {
                    caption: "Introduce error",
                    change: sys => replaceFileText(sys, `${TestFSWithWatch.tsbuildProjectsLocation}/reexport/src/pure/session.ts`, "// ", ""),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build src/pure
                        sys.checkTimeoutQueueLengthAndRun(1); // build src/main and src
                        sys.checkTimeoutQueueLength(0);
                    },
                },
                {
                    caption: "Fix error",
                    change: sys => replaceFileText(sys, `${TestFSWithWatch.tsbuildProjectsLocation}/reexport/src/pure/session.ts`, "bar: ", "// bar: "),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build src/pure
                        sys.checkTimeoutQueueLengthAndRun(1); // build src/main and src
                        sys.checkTimeoutQueueLength(0);
                    },
                }
            ]
        });
    });
}
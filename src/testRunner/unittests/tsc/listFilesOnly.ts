namespace ts {
    describe("unittests:: tsc:: listFilesOnly::", () => {
        verifyTsc({
            scenario: "listFilesOnly",
            subScenario: "before watch",
            fs: () => loadProjectFromFiles({
                "/src/test.ts": utils.dedent`
                        export const x = 1;`,
            }),
            commandLineArgs: ["/src/test.ts", "--listFilesOnly", "--watch"]
        });

        verifyTsc({
            scenario: "listFilesOnly",
            subScenario: "after watch",
            fs: () => loadProjectFromFiles({
                "/src/test.ts": utils.dedent`
                        export const x = 1;`,
            }),
            commandLineArgs: ["/src/test.ts", "--watch", "--listFilesOnly"]
        });

        verifyTsc({
            scenario: "listFilesOnly",
            subScenario: "loose file",
            fs: () => loadProjectFromFiles({
                "/src/test.ts": utils.dedent`
                        export const x = 1;`,
            }),
            commandLineArgs: ["/src/test.ts", "--listFilesOnly"]
        });
    });
}

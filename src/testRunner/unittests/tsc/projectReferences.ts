namespace ts {
    describe("unittests:: tsc:: projectReferences::", () => {
        verifyTsc({
            scenario: "projectReferences",
            subScenario: "when project contains invalid project reference",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        outFile: "theApp.js"
                    },
                    references: [
                        { path: "../Util/Dates" }
                    ]
                }),
            }),
            commandLineArgs: ["--p", "src/project"],
        });
    });
}

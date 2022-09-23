/// <reference path="../../dynamicRunner.ts"/>
ts.verifyTsc({
    scenario: "clean",
    subScenario: `file name and output name clashing`,
    dynamicTestName,
    commandLineArgs: ["--b", "/src/tsconfig.json", "-clean"],
    fs: () => ts.loadProjectFromFiles({
        "/src/index.js": "",
        "/src/bar.ts": "",
        "/src/tsconfig.json": JSON.stringify({
            compilerOptions: { allowJs: true },
        }),
    }),
});
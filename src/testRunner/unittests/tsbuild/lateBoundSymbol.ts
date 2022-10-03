namespace ts {
    describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
        verifyTscWithEdits({
            subScenario: "interface is merged and contains late bound member",
            fs: () => loadProjectFromDisk("tests/projects/lateBoundSymbol"),
            scenario: "lateBoundSymbol",
            commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
            edits: [
                {
                    subScenario: "incremental-declaration-doesnt-change",
                    modifyFs: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
                },
                {
                    subScenario: "incremental-declaration-doesnt-change",
                    modifyFs: fs => appendText(fs, "/src/src/main.ts", "const x = 10;"),
                },
            ]
        });
    });
}

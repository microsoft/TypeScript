import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
    ts.verifyTscWithEdits({
        subScenario: "interface is merged and contains late bound member",
        fs: () => ts.loadProjectFromDisk("tests/projects/lateBoundSymbol"),
        scenario: "lateBoundSymbol",
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        edits: [
            {
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => ts.replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
            },
            {
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => ts.appendText(fs, "/src/src/main.ts", "const x = 10;"),
            },
        ]
    });
});

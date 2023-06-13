import {
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromDisk,
    replaceText
} from "../helpers/vfs";

describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
    verifyTsc({
        subScenario: "interface is merged and contains late bound member",
        fs: () => loadProjectFromDisk("tests/projects/lateBoundSymbol"),
        scenario: "lateBoundSymbol",
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        edits: [
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
            },
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs => appendText(fs, "/src/src/main.ts", "const x = 10;"),
            },
        ]
    });
});

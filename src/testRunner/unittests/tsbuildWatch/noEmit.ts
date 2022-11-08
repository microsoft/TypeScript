import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmit", () => {
    ts.tscWatch.verifyTscWatch({
        scenario: "noEmit",
        subScenario: "does not go in loop when watching when no files are emitted",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => ts.tscWatch.createWatchedSystem(
            [
                { path: ts.tscWatch.libFile.path, content: ts.libContent },
                { path: `${ts.tscWatch.projectRoot}/a.js`, content: "" },
                { path: `${ts.tscWatch.projectRoot}/b.ts`, content: "" },
                { path: `${ts.tscWatch.projectRoot}/tsconfig.json`, content: JSON.stringify({ compilerOptions: { allowJs: true, noEmit: true } }) },
            ],
            { currentDirectory: ts.tscWatch.projectRoot }
        ),
        changes: [
            {
                caption: "No change",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/a.js`, sys.readFile(`${ts.tscWatch.projectRoot}/a.js`)!),
                // build project
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            },
            {
                caption: "change",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/a.js`, "const x = 10;"),
                // build project
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            },
        ],
        baselineIncremental: true
    });
});
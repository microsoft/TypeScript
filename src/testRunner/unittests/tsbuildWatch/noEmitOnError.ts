import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuildWatch:: watchMode:: with noEmitOnError", () => {
    function change(caption: string, content: string): ts.tscWatch.TscWatchCompileChange {
        return {
            caption,
            change: sys => sys.writeFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, content),
            // build project
            timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
        };
    }

    const noChange: ts.tscWatch.TscWatchCompileChange = {
        caption: "No change",
        change: sys => sys.writeFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, sys.readFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`)!),
        // build project
        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
    };
    ts.tscWatch.verifyTscWatch({
        scenario: "noEmitOnError",
        subScenario: "does not emit any files on error",
        commandLineArgs: ["-b", "-w", "-verbose"],
        sys: () => ts.tscWatch.createWatchedSystem(
            [
                ...["tsconfig.json", "shared/types/db.ts", "src/main.ts", "src/other.ts"]
                    .map(f => ts.TestFSWithWatch.getTsBuildProjectFile("noEmitOnError", f)),
                { path: ts.tscWatch.libFile.path, content: ts.libContent }
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError` }
        ),
        changes: [
            noChange,
            change("Fix Syntax error", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`),
            change("Semantic Error", `import { A } from "../shared/types/db";
const a: string = 10;`),
            noChange,
            change("Fix Semantic Error", `import { A } from "../shared/types/db";
const a: string = "hello";`),
            noChange,
        ],
        baselineIncremental: true
    });
});
namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchMode:: with noEmitOnError", () => {
        function change(caption: string, content: string): TscWatchCompileChange {
            return {
                caption,
                change: sys => sys.writeFile(`${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, content),
                // build project
                timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            };
        }

        const noChange: TscWatchCompileChange = {
            caption: "No change",
            change: sys => sys.writeFile(`${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, sys.readFile(`${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`)!),
            // build project
            timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
        };
        verifyTscWatch({
            scenario: "noEmitOnError",
            subScenario: "does not emit any files on error",
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () => createWatchedSystem(
                [
                    ...["tsconfig.json", "shared/types/db.ts", "src/main.ts", "src/other.ts"]
                        .map(f => TestFSWithWatch.getTsBuildProjectFile("noEmitOnError", f)),
                    { path: libFile.path, content: libContent }
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError` }
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
}
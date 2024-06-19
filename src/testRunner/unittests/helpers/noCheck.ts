import { jsonToReadableText } from "../helpers.js";
import {
    noChangeRun,
    TestTscEdit,
    verifyTsc,
} from "./tsc.js";
import { loadProjectFromFiles } from "./vfs.js";

export function forEachTscScenarioWithNoCheck(buildType: "-b" | "-p") {
    const commandLineArgs = buildType === "-b" ?
        ["-b", "/src/tsconfig.json", "-v"] :
        ["-p", "/src/tsconfig.json"];

    function forEachNoCheckScenarioWorker(
        subScenario: string,
        aText: string,
    ) {
        const checkNoChangeRun: TestTscEdit = {
            ...noChangeRun,
            caption: "No Change run with checking",
            commandLineArgs,
        };
        const noCheckFixError: TestTscEdit = {
            caption: "Fix `a` error with noCheck",
            edit: fs => fs.writeFileSync("/src/a.ts", `export const a = "hello";`),
        };
        const noCheckError: TestTscEdit = {
            caption: "Introduce error with noCheck",
            edit: fs => fs.writeFileSync("/src/a.ts", aText),
        };
        const noChangeRunWithCheckPendingDiscrepancy: TestTscEdit = {
            ...noChangeRun,
            discrepancyExplanation: () => [
                "Clean build will have check pending since it didnt type check",
                "Incremental build has typechecked before this so wont have checkPending",
            ],
        };

        [undefined, true].forEach(incremental => {
            [{}, { module: "amd", outFile: "../outFile.js" }].forEach(options => {
                verifyTsc({
                    scenario: "noCheck",
                    subScenario: `${options.outFile ? "outFile" : "multiFile"}/${subScenario}${incremental ? " with incremental" : ""}`,
                    fs: () =>
                        loadProjectFromFiles({
                            "/src/a.ts": aText,
                            "/src/b.ts": `export const b = 10;`,
                            "/src/tsconfig.json": jsonToReadableText({
                                compilerOptions: {
                                    declaration: true,
                                    incremental,
                                    ...options,
                                },
                            }),
                        }),
                    commandLineArgs: [...commandLineArgs, "--noCheck"],
                    edits: [
                        noChangeRun, // Should be no op
                        noCheckFixError, // Fix error with noCheck
                        noChangeRun, // Should be no op
                        checkNoChangeRun, // Check errors - should not report any errors - update buildInfo
                        checkNoChangeRun, // Should be no op
                        incremental || buildType === "-b" ?
                            noChangeRunWithCheckPendingDiscrepancy : // Should be no op
                            noChangeRun, // Should be no op
                        noCheckError,
                        noChangeRun, // Should be no op
                        checkNoChangeRun, // Should check errors and update buildInfo
                        noCheckFixError, // Fix error with noCheck
                        checkNoChangeRun, // Should check errors and update buildInfo
                        {
                            caption: "Add file with error",
                            edit: fs => fs.writeFileSync("/src/c.ts", `export const c: number = "hello";`),
                            commandLineArgs,
                        },
                        noCheckError,
                        noCheckFixError,
                        checkNoChangeRun,
                        incremental || buildType === "-b" ?
                            noChangeRunWithCheckPendingDiscrepancy : // Should be no op
                            noChangeRun, // Should be no op
                        checkNoChangeRun, // Should be no op
                    ],
                    baselinePrograms: true,
                });
            });
        });
    }
    forEachNoCheckScenarioWorker("syntax errors", `export const a = "hello`);
    forEachNoCheckScenarioWorker("semantic errors", `export const a: number = "hello";`);
    forEachNoCheckScenarioWorker("dts errors", `export const a = class { private p = 10; };`);
}

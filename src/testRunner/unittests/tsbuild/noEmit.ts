import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuild:: noEmit", () => {
    function verifyNoEmitWorker(subScenario: string, aTsContent: string, commandLineArgs: readonly string[]) {
        ts.verifyTscWithEdits({
            scenario: "noEmit",
            subScenario,
            fs: () => ts.loadProjectFromFiles({
                "/src/a.ts": aTsContent,
                "/src/tsconfig.json": JSON.stringify({
                    compilerOptions: { noEmit: true }
                })
            }),
            commandLineArgs,
            edits: [
                ts.noChangeRun,
                {
                    subScenario: "Fix error",
                    modifyFs: fs => fs.writeFileSync("/src/a.ts", `const a = "hello"`),
                },
                ts.noChangeRun,
            ],
            baselinePrograms: true,
        });
    }

    function verifyNoEmit(subScenario: string, aTsContent: string) {
        verifyNoEmitWorker(subScenario, aTsContent, ["--b", "/src/tsconfig.json", "-v"]);
        verifyNoEmitWorker(`${subScenario} with incremental`, aTsContent, ["--b", "/src/tsconfig.json", "-v", "--incremental"]);
    }

    verifyNoEmit("syntax errors", `const a = "hello`);
    verifyNoEmit("semantic errors", `const a: number = "hello"`);
});
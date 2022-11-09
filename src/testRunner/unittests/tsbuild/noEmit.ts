namespace ts {
    describe("unittests:: tsbuild:: noEmit", () => {
        function verifyNoEmitWorker(subScenario: string, aTsContent: string, commandLineArgs: readonly string[]) {
            verifyTscWithEdits({
                scenario: "noEmit",
                subScenario,
                fs: () => loadProjectFromFiles({
                    "/src/a.ts": aTsContent,
                    "/src/tsconfig.json": JSON.stringify({
                        compilerOptions: { noEmit: true }
                    })
                }),
                commandLineArgs,
                edits: [
                    noChangeRun,
                    {
                        subScenario: "Fix error",
                        modifyFs: fs => fs.writeFileSync("/src/a.ts", `const a = "hello"`),
                    },
                    noChangeRun,
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
}
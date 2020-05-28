namespace ts {
    describe("unittests:: tsbuild - with noEmitOnError", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/noEmitOnError");
        });
        after(() => {
            projFs = undefined!;
        });

        function verifyNoEmitOnError(subScenario: string, incrementalScenario: TscIncremental, modifyFs?: TscIncremental["modifyFs"]) {
            verifyTscIncrementalEdits({
                scenario: "noEmitOnError",
                subScenario,
                fs: () => projFs,
                modifyFs,
                commandLineArgs: ["--b", "/src/tsconfig.json"],
                incrementalScenarios: [
                    incrementalScenario,
                    noChangeRun,
                ],
                baselinePrograms: true,
                baselineIncremental: true
            });
        }

        verifyNoEmitOnError("syntax errors", {
            buildKind: BuildKind.IncrementalDtsUnchanged,
            modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8")
        });

        verifyNoEmitOnError("semantic errors", {
            buildKind: BuildKind.IncrementalDtsUnchanged,
            modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8")
        }, fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"));
    });
}

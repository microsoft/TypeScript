namespace ts {
    describe("unittests:: tsbuild - with noEmitOnError", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/noEmitOnError");
        });
        after(() => {
            projFs = undefined!;
        });

        function verifyNoEmitOnError(subScenario: string, fixModifyFs: TestTscEdit["modifyFs"], modifyFs?: TestTscEdit["modifyFs"]) {
            verifyTscWithEdits({
                scenario: "noEmitOnError",
                subScenario,
                fs: () => projFs,
                modifyFs,
                commandLineArgs: ["--b", "/src/tsconfig.json"],
                edits: [
                    noChangeRun,
                    {
                        subScenario: "Fix error",
                        modifyFs: fixModifyFs,
                    },
                    noChangeRun,
                ],
                baselinePrograms: true,
                baselineIncremental: true
            });
        }

        verifyNoEmitOnError(
            "syntax errors",
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8")
        );

        verifyNoEmitOnError(
            "semantic errors",
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8")
        );
    });
}

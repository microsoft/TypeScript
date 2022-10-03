namespace ts {
    describe("unittests:: tsbuild - with noEmitOnError", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/noEmitOnError");
        });
        after(() => {
            projFs = undefined!;
        });

        verifyTscWithEdits({
            scenario: "noEmitOnError",
            subScenario: "syntax errors",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig.json"],
            edits: [
                noChangeRun,
                {
                    subScenario: "Fix error",
                    modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8"),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });

        verifyTscWithEdits({
            scenario: "noEmitOnError",
            subScenario: "syntax errors with incremental",
            fs: () => projFs,
            commandLineArgs: ["--b", "/src/tsconfig.json", "--incremental"],
            edits: [
                noChangeRun,
                {
                    subScenario: "Fix error",
                    modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8"),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });

        verifyTscWithEdits({
            scenario: "noEmitOnError",
            subScenario: "semantic errors",
            fs: () => projFs,
            modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
            commandLineArgs: ["--b", "/src/tsconfig.json"],
            edits: [
                noChangeRun,
                {
                    subScenario: "Fix error",
                    modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });

        verifyTscWithEdits({
            scenario: "noEmitOnError",
            subScenario: "semantic errors with incremental",
            fs: () => projFs,
            modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
            commandLineArgs: ["--b", "/src/tsconfig.json", "--incremental"],
            edits: [
                noChangeWithExportsDiscrepancyRun,
                {
                    subScenario: "Fix error",
                    modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });
    });
}

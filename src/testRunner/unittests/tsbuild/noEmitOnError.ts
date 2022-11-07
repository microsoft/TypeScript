import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild - with noEmitOnError", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/noEmitOnError");
    });
    after(() => {
        projFs = undefined!;
    });

    ts.verifyTscWithEdits({
        scenario: "noEmitOnError",
        subScenario: "syntax errors",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        edits: [
            ts.noChangeRun,
            {
                subScenario: "Fix error",
                modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8"),
            },
            ts.noChangeRun,
        ],
        baselinePrograms: true,
    });

    ts.verifyTscWithEdits({
        scenario: "noEmitOnError",
        subScenario: "syntax errors with incremental",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--incremental"],
        edits: [
            ts.noChangeRun,
            {
                subScenario: "Fix error",
                modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8"),
            },
            ts.noChangeRun,
        ],
        baselinePrograms: true,
    });

    ts.verifyTscWithEdits({
        scenario: "noEmitOnError",
        subScenario: "semantic errors",
        fs: () => projFs,
        modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        edits: [
            ts.noChangeRun,
            {
                subScenario: "Fix error",
                modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
            },
            ts.noChangeRun,
        ],
        baselinePrograms: true,
    });

    ts.verifyTscWithEdits({
        scenario: "noEmitOnError",
        subScenario: "semantic errors with incremental",
        fs: () => projFs,
        modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
        commandLineArgs: ["--b", "/src/tsconfig.json", "--incremental"],
        edits: [
            ts.noChangeWithExportsDiscrepancyRun,
            {
                subScenario: "Fix error",
                modifyFs: fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
            },
            ts.noChangeRun,
        ],
        baselinePrograms: true,
    });
});

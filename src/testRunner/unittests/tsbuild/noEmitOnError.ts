import * as vfs from "../../_namespaces/vfs";
import {
    getFsForNoEmitOnError,
} from "../helpers/noEmitOnError";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";

describe("unittests:: tsbuild - with noEmitOnError", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = getFsForNoEmitOnError();
    });
    after(() => {
        projFs = undefined!;
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "syntax errors",
        fs: () => projFs,
        commandLineArgs: ["--b"],
        edits: [
            noChangeRun,
            {
                caption: "Fix error",
                edit: fs =>
                    fs.writeFileSync(
                        "src/main.ts",
                        `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`,
                        "utf-8",
                    ),
            },
            noChangeRun,
        ],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "syntax errors with incremental",
        fs: () => projFs,
        commandLineArgs: ["--b", "--incremental"],
        edits: [
            noChangeRun,
            {
                caption: "Fix error",
                edit: fs =>
                    fs.writeFileSync(
                        "src/main.ts",
                        `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`,
                        "utf-8",
                    ),
            },
            noChangeRun,
        ],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "semantic errors",
        fs: () => projFs,
        modifyFs: fs =>
            fs.writeFileSync(
                "src/main.ts",
                `import { A } from "../shared/types/db";
const a: string = 10;`,
                "utf-8",
            ),
        commandLineArgs: ["--b"],
        edits: [
            noChangeRun,
            {
                caption: "Fix error",
                edit: fs =>
                    fs.writeFileSync(
                        "src/main.ts",
                        `import { A } from "../shared/types/db";
const a: string = "hello";`,
                        "utf-8",
                    ),
            },
            noChangeRun,
        ],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "semantic errors with incremental",
        fs: () => projFs,
        modifyFs: fs =>
            fs.writeFileSync(
                "src/main.ts",
                `import { A } from "../shared/types/db";
const a: string = 10;`,
                "utf-8",
            ),
        commandLineArgs: ["--b", "--incremental"],
        edits: [
            noChangeRun,
            {
                caption: "Fix error",
                edit: fs =>
                    fs.writeFileSync(
                        "src/main.ts",
                        `import { A } from "../shared/types/db";
const a: string = "hello";`,
                        "utf-8",
                    ),
            },
            noChangeRun,
        ],
        baselinePrograms: true,
    });
});

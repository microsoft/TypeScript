import { jsonToReadableText } from "../helpers.js";
import {
    forEachNoEmitChanges,
    forEachNoEmitDtsChanges,
    forEachNoEmitTsc,
} from "../helpers/noEmit.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: noEmit::", () => {
    forEachNoEmitChanges(["--p"]);

    verifyTsc({
        scenario: "noEmit",
        subScenario: "when project has strict true",
        commandLineArgs: ["-noEmit", "-p", `src/project`],
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        strict: true,
                    },
                }),
                "/src/project/class1.ts": `export class class1 {}`,
            }),
        edits: noChangeOnlyRuns,
        baselinePrograms: true,
    });

    forEachNoEmitTsc(["-p"]);

    forEachNoEmitDtsChanges(["-p"]);
});

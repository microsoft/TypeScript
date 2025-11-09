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
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: noEmit::", () => {
    forEachNoEmitChanges(["--p"]);

    verifyTsc({
        scenario: "noEmit",
        subScenario: "when project has strict true",
        commandLineArgs: ["-noEmit"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        strict: true,
                    },
                }),
                "/home/src/workspaces/project/class1.ts": `export class class1 {}`,
            }),
        edits: noChangeOnlyRuns,
        baselinePrograms: true,
    });

    forEachNoEmitTsc(["-p"]);

    forEachNoEmitDtsChanges(["-p"]);
});

import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc:: listFilesOnly::", () => {
    ts.verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "combined with watch",
        fs: () => ts.loadProjectFromFiles({
            "/src/test.ts": Utils.dedent`
                        export const x = 1;`,
        }),
        commandLineArgs: ["/src/test.ts", "--watch", "--listFilesOnly"]
    });

    ts.verifyTsc({
        scenario: "listFilesOnly",
        subScenario: "loose file",
        fs: () => ts.loadProjectFromFiles({
            "/src/test.ts": Utils.dedent`
                        export const x = 1;`,
        }),
        commandLineArgs: ["/src/test.ts", "--listFilesOnly"]
    });
});

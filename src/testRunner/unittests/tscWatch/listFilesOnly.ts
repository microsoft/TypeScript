import { verifyTscWatch } from "../helpers/tscWatch.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tscWatch:: listFilesOnly::", () => {
    verifyTscWatch({
        scenario: "listFilesOnly",
        subScenario: "combined with watch",
        sys: () => {
            const sys = loadProjectFromFiles({
                "/src/test.ts": `export const x = 1;`,
            });
            sys.exit = exitCode => sys.exitCode = exitCode;
            return sys;
        },
        commandLineArgs: ["/src/test.ts", "--watch", "--listFilesOnly"],
    });
});

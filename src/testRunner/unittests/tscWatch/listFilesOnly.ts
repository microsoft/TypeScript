import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: listFilesOnly::", () => {
    verifyTscWatch({
        scenario: "listFilesOnly",
        subScenario: "combined with watch",
        sys: () => {
            const sys = TestServerHost.createWatchedSystem({
                "/src/test.ts": `export const x = 1;`,
            }, { currentDirectory: "/" });
            sys.exit = exitCode => sys.exitCode = exitCode;
            return sys;
        },
        commandLineArgs: ["/src/test.ts", "--watch", "--listFilesOnly"],
    });
});

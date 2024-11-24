import { emptyArray } from "../../_namespaces/ts.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

// https://github.com/microsoft/TypeScript/issues/33849
describe("unittests:: tsbuild:: exitCodeOnBogusFile:: test exit code", () => {
    verifyTsc({
        scenario: "exitCodeOnBogusFile",
        subScenario: `test exit code`,
        sys: () => TestServerHost.createWatchedSystem(emptyArray),
        commandLineArgs: ["-b", "bogus.json"],
    });
});

import { verifyTsc } from "../helpers/tsc";
import { loadProjectFromFiles } from "../helpers/vfs";

// https://github.com/microsoft/TypeScript/issues/33849
describe("unittests:: tsbuild:: exitCodeOnBogusFile:: test exit code", () => {
    verifyTsc({
        scenario: "exitCodeOnBogusFile",
        subScenario: `test exit code`,
        fs: () => loadProjectFromFiles({}),
        commandLineArgs: ["-b", "bogus.json"],
    });
});

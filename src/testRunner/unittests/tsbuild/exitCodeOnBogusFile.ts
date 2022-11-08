import * as ts from "../../_namespaces/ts";

// https://github.com/microsoft/TypeScript/issues/33849
describe("unittests:: tsbuild:: exitCodeOnBogusFile:: test exit code", () => {
    ts.verifyTsc({
        scenario: "exitCodeOnBogusFile",
        subScenario: `test exit code`,
        fs: () => ts.loadProjectFromFiles({}),
        commandLineArgs: ["-b", "bogus.json"]
    });
});

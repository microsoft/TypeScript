import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";

describe("unittests:: tsbuild:: on demo project", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = ts.loadProjectFromDisk("tests/projects/demo");
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    ts.verifyTsc({
        scenario: "demo",
        subScenario: "in master branch with everything setup correctly and reports no error",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"]
    });

    ts.verifyTsc({
        scenario: "demo",
        subScenario: "in circular branch reports the error about it by stopping build",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        modifyFs: fs => ts.replaceText(
            fs,
            "/src/core/tsconfig.json",
            "}",
            `},
  "references": [
    {
      "path": "../zoo"
    }
  ]`
        )
    });
    ts.verifyTsc({
        scenario: "demo",
        subScenario: "in bad-ref branch reports the error about files not in rootDir at the import location",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        modifyFs: fs => ts.prependText(
            fs,
            "/src/core/utilities.ts",
            `import * as A from '../animals';
`
        )
    });
});

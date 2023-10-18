import * as vfs from "../../_namespaces/vfs";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromDisk,
    prependText,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: on demo project", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromDisk("tests/projects/demo");
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    verifyTsc({
        scenario: "demo",
        subScenario: "in master branch with everything setup correctly and reports no error",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
    });

    verifyTsc({
        scenario: "demo",
        subScenario: "in circular branch reports the error about it by stopping build",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        modifyFs: fs =>
            replaceText(
                fs,
                "/src/core/tsconfig.json",
                "}",
                `},
  "references": [
    {
      "path": "../zoo"
    }
  ]`,
            ),
    });
    verifyTsc({
        scenario: "demo",
        subScenario: "in bad-ref branch reports the error about files not in rootDir at the import location",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src/tsconfig.json", "--verbose"],
        modifyFs: fs =>
            prependText(
                fs,
                "/src/core/utilities.ts",
                `import * as A from '../animals';
`,
            ),
    });
});

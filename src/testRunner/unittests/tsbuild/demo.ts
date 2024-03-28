import * as vfs from "../../_namespaces/vfs";
import {
    getFsContentsForDemoProjectReferencesCoreConfig,
    getFsForDemoProjectReferences,
} from "../helpers/demoProjectReferences";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    prependText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: on demo project", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = getFsForDemoProjectReferences();
    });

    after(() => {
        projFs = undefined!; // Release the contents
    });

    verifyTsc({
        scenario: "demo",
        subScenario: "in master branch with everything setup correctly and reports no error",
        fs: () => projFs,
        commandLineArgs: ["--b", "--verbose"],
    });

    verifyTsc({
        scenario: "demo",
        subScenario: "in circular branch reports the error about it by stopping build",
        fs: () => projFs,
        commandLineArgs: ["--b", "--verbose"],
        modifyFs: fs =>
            fs.writeFileSync(
                "core/tsconfig.json",
                getFsContentsForDemoProjectReferencesCoreConfig({
                    references: [{
                        path: "../zoo",
                    }],
                }),
            ),
    });
    verifyTsc({
        scenario: "demo",
        subScenario: "in bad-ref branch reports the error about files not in rootDir at the import location",
        fs: () => projFs,
        commandLineArgs: ["--b", "--verbose"],
        modifyFs: fs =>
            prependText(
                fs,
                "core/utilities.ts",
                `import * as A from '../animals';
`,
            ),
    });
});

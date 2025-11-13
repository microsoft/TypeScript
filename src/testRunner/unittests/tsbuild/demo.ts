import {
    getFsContentsForDemoProjectReferencesCoreConfig,
    getSysForDemoProjectReferences,
} from "../helpers/demoProjectReferences.js";
import { verifyTsc } from "../helpers/tsc.js";

describe("unittests:: tsbuild:: on demo:: project", () => {
    verifyTsc({
        scenario: "demo",
        subScenario: "in master branch with everything setup correctly and reports no error",
        sys: getSysForDemoProjectReferences,
        commandLineArgs: ["--b", "--verbose"],
    });

    verifyTsc({
        scenario: "demo",
        subScenario: "in circular branch reports the error about it by stopping build",
        sys: getSysForDemoProjectReferences,
        commandLineArgs: ["--b", "--verbose"],
        modifySystem: sys =>
            sys.writeFile(
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
        sys: getSysForDemoProjectReferences,
        commandLineArgs: ["--b", "--verbose"],
        modifySystem: sys =>
            sys.prependFile(
                "core/utilities.ts",
                `import * as A from '../animals';
`,
            ),
    });
});

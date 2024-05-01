import { dedent } from "../../_namespaces/Utils";
import { getFsContentsForMultipleErrorsForceConsistentCasingInFileNames } from "../helpers/forceConsistentCasingInFileNames";
import { verifyTsc } from "../helpers/tsc";
import { loadProjectFromFiles } from "../helpers/vfs";

describe("unittests:: tsc:: forceConsistentCasingInFileNames::", () => {
    verifyTsc({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "with relative and non relative file resolutions",
        commandLineArgs: ["/src/project/src/struct.d.ts", "--forceConsistentCasingInFileNames", "--explainFiles"],
        fs: () =>
            loadProjectFromFiles({
                "/src/project/src/struct.d.ts": dedent`
                    import * as xs1 from "fp-ts/lib/Struct";
                    import * as xs2 from "fp-ts/lib/struct";
                    import * as xs3 from "./Struct";
                    import * as xs4 from "./struct";
                `,
                "/src/project/node_modules/fp-ts/lib/struct.d.ts": `export function foo(): void`,
            }),
    });

    verifyTsc({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "when file is included from multiple places with different casing",
        commandLineArgs: ["-p", "/home/src/projects/project/tsconfig.json", "--explainFiles"],
        fs: () => loadProjectFromFiles(getFsContentsForMultipleErrorsForceConsistentCasingInFileNames()),
    });
});

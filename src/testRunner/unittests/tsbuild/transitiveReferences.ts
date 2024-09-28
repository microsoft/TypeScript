import { jsonToReadableText } from "../helpers.js";
import { getSysForTransitiveReferences } from "../helpers/transitiveReferences.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: transitiveReferences:: when project reference is referenced transitively", () => {
    function modifyFsBTsToNonRelativeImport(sys: TestServerHost, moduleResolution: "node" | "classic") {
        sys.writeFile(
            "b.ts",
            `import {A} from 'a';
export const b = new A();`,
        );
        sys.writeFile(
            "tsconfig.b.json",
            jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    moduleResolution,
                },
                files: ["b.ts"],
                references: [{ path: "tsconfig.a.json" }],
            }),
        );
    }

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly",
        sys: getSysForTransitiveReferences,
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "builds correctly when the referenced project uses different module resolution",
        sys: getSysForTransitiveReferences,
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
        modifySystem: sys => modifyFsBTsToNonRelativeImport(sys, "classic"),
    });

    verifyTsc({
        scenario: "transitiveReferences",
        subScenario: "reports error about module not found with node resolution with external module name",
        sys: getSysForTransitiveReferences,
        commandLineArgs: ["--b", "tsconfig.c.json", "--listFiles"],
        modifySystem: sys => modifyFsBTsToNonRelativeImport(sys, "node"),
    });
});

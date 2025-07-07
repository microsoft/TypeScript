import { dedent } from "../../_namespaces/Utils.js";
import { getSysForMultipleErrorsForceConsistentCasingInFileNames } from "../helpers/forceConsistentCasingInFileNames.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: forceConsistentCasingInFileNames::", () => {
    verifyTsc({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "with relative and non relative file resolutions",
        commandLineArgs: ["/user/username/projects/myproject/src/struct.d.ts", "--forceConsistentCasingInFileNames", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/projects/myproject/src/struct.d.ts": dedent`
                    import * as xs1 from "fp-ts/lib/Struct";
                    import * as xs2 from "fp-ts/lib/struct";
                    import * as xs3 from "./Struct";
                    import * as xs4 from "./struct";
                `,
                "/user/username/projects/myproject/node_modules/fp-ts/lib/struct.d.ts": `export function foo(): void`,
            }, { currentDirectory: "/user/username/projects/myproject" }),
    });

    verifyTsc({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "when file is included from multiple places with different casing",
        commandLineArgs: ["--explainFiles"],
        sys: getSysForMultipleErrorsForceConsistentCasingInFileNames,
    });

    verifyTsc({
        scenario: "forceConsistentCasingInFileNames",
        subScenario: "with type ref from file",
        commandLineArgs: ["-p", "/user/username/projects/myproject", "--explainFiles", "--traceResolution"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/projects/myproject/src/fileOne.d.ts": `declare class c { }`,
                "/user/username/projects/myproject/src/file2.d.ts": dedent`
                    /// <reference types="./fileOne.d.ts"/>
                    declare const y: c;
                `,
                "/user/username/projects/myproject/tsconfig.json": "{ }",
            }, { currentDirectory: "/user/username/projects/myproject" }),
    });
});

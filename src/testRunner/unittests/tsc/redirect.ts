import { emptyArray } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: redirect::", () => {
    verifyTsc({
        scenario: "redirect",
        subScenario: "when redirecting ts file",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "out",
                    },
                    include: [
                        "copy1/node_modules/target/*",
                        "copy2/node_modules/target/*",
                    ],
                }),
                "/home/src/workspaces/project/copy1/node_modules/target/index.ts": "export const a = 1;",
                "/home/src/workspaces/project/copy1/node_modules/target/import.ts": `import {} from "./";`,
                "/home/src/workspaces/project/copy1/node_modules/target/package.json": jsonToReadableText({
                    name: "target",
                    version: "1.0.0",
                    main: "index.js",
                }),
                "/home/src/workspaces/project/copy2/node_modules/target/index.ts": "export const a = 1;",
                "/home/src/workspaces/project/copy2/node_modules/target/import.ts": `import {} from "./";`,
                "/home/src/workspaces/project/copy2/node_modules/target/package.json": jsonToReadableText({
                    name: "target",
                    version: "1.0.0",
                    main: "index.js",
                }),
            }),
        commandLineArgs: emptyArray,
    });
});

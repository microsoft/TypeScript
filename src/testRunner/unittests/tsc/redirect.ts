import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsc:: redirect::", () => {
    verifyTsc({
        scenario: "redirect",
        subScenario: "when redirecting ts file",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "out",
                    },
                    include: [
                        "copy1/node_modules/target/*",
                        "copy2/node_modules/target/*",
                    ],
                }),
                "/src/project/copy1/node_modules/target/index.ts": "export const a = 1;",
                "/src/project/copy1/node_modules/target/import.ts": `import {} from "./";`,
                "/src/project/copy1/node_modules/target/package.json": jsonToReadableText({
                    name: "target",
                    version: "1.0.0",
                    main: "index.js",
                }),
                "/src/project/copy2/node_modules/target/index.ts": "export const a = 1;",
                "/src/project/copy2/node_modules/target/import.ts": `import {} from "./";`,
                "/src/project/copy2/node_modules/target/package.json": jsonToReadableText({
                    name: "target",
                    version: "1.0.0",
                    main: "index.js",
                }),
            }),
        commandLineArgs: ["-p", "src/project"],
    });
});

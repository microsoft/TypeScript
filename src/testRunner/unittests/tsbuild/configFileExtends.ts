import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: configFileExtends:: when tsconfig extends another config", () => {
    function getConfigExtendsWithIncludeSys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                references: [
                    { path: "./shared/tsconfig.json" },
                    { path: "./webpack/tsconfig.json" },
                ],
                files: [],
            }),
            "/home/src/workspaces/solution/shared/tsconfig-base.json": jsonToReadableText({
                include: ["./typings-base/"],
            }),
            "/home/src/workspaces/solution/shared/typings-base/globals.d.ts": `type Unrestricted = any;`,
            "/home/src/workspaces/solution/shared/tsconfig.json": jsonToReadableText({
                extends: "./tsconfig-base.json",
                compilerOptions: {
                    composite: true,
                    outDir: "../target-tsc-build/",
                    rootDir: "..",
                },
                files: ["./index.ts"],
            }),
            "/home/src/workspaces/solution/shared/index.ts": `export const a: Unrestricted = 1;`,
            "/home/src/workspaces/solution/webpack/tsconfig.json": jsonToReadableText({
                extends: "../shared/tsconfig-base.json",
                compilerOptions: {
                    composite: true,
                    outDir: "../target-tsc-build/",
                    rootDir: "..",
                },
                files: ["./index.ts"],
                references: [{ path: "../shared/tsconfig.json" }],
            }),
            "/home/src/workspaces/solution/webpack/index.ts": `export const b: Unrestricted = 1;`,
        }, { currentDirectory: "/home/src/workspaces/solution" });
    }
    verifyTsc({
        scenario: "configFileExtends",
        subScenario: "when building solution with projects extends config with include",
        sys: getConfigExtendsWithIncludeSys,
        commandLineArgs: ["--b", "--v", "--listFiles"],
    });
    verifyTsc({
        scenario: "configFileExtends",
        subScenario: "when building project uses reference and both extend config with include",
        sys: getConfigExtendsWithIncludeSys,
        commandLineArgs: ["--b", "webpack/tsconfig.json", "--v", "--listFiles"],
    });
});

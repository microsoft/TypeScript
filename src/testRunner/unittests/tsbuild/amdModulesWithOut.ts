import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: outFile:: amdModulesWithOut:: on amd modules with --out", () => {
    function outFileSys(prepend?: boolean) {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/soltion/app/file3.ts": dedent`
                export const z = 30;
                import { x } from "file1";
            `,
            "/home/src/workspaces/soltion/app/file4.ts": `const myVar = 30;`,
            "/home/src/workspaces/soltion/app/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    module: "amd",
                    composite: true,
                    strict: false,
                    sourceMap: true,
                    declarationMap: true,
                    outFile: "module.js",
                },
                exclude: ["module.d.ts"],
                references: [
                    { path: "../lib", prepend },
                ],
            }),
            "/home/src/workspaces/soltion/lib/file0.ts": `const myGlob = 20;`,
            "/home/src/workspaces/soltion/lib/file1.ts": `export const x = 10;`,
            "/home/src/workspaces/soltion/lib/file2.ts": `export const y = 20;`,
            "/home/src/workspaces/soltion/lib/global.ts": `const globalConst = 10;`,
            "/home/src/workspaces/soltion/lib/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    module: "amd",
                    composite: true,
                    sourceMap: true,
                    declarationMap: true,
                    strict: false,
                    outFile: "module.js",
                },
                exclude: ["module.d.ts"],
            }),
        }, { currentDirectory: "/home/src/workspaces/soltion" });
    }

    verifyTsc({
        scenario: "amdModulesWithOut",
        subScenario: "modules and globals mixed in amd",
        sys: outFileSys,
        commandLineArgs: ["--b", "app", "--verbose"],
        baselineSourceMap: true,
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: sys => sys.appendFile("/home/src/workspaces/soltion/lib/file1.ts", "console.log(x);"),
        }],
    });

    verifyTsc({
        scenario: "amdModulesWithOut",
        subScenario: "prepend reports deprecation error",
        sys: () => outFileSys(/*prepend*/ true),
        commandLineArgs: ["--b", "app", "--verbose"],
        baselineSourceMap: true,
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: sys => sys.appendFile("/home/src/workspaces/soltion/lib/file1.ts", "console.log(x);"),
        }],
    });

    describe("when the module resolution finds original source file", () => {
        verifyTsc({
            scenario: "amdModulesWithOut",
            subScenario: "when the module resolution finds original source file",
            sys: outFileSys,
            commandLineArgs: ["-b", "app", "--verbose"],
            modifySystem: sys => {
                // Make lib to output to parent dir
                sys.replaceFileText("/home/src/workspaces/soltion/lib/tsconfig.json", `"outFile": "module.js"`, `"outFile": "../module.js", "rootDir": "../"`);
                // Change reference to file1 module to resolve to lib/file1
                sys.replaceFileText("/home/src/workspaces/soltion/app/file3.ts", "file1", "lib/file1");
            },
            baselineSourceMap: true,
        });
    });
});

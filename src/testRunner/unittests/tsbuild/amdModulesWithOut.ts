import {
    dedent,
} from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: outFile:: on amd modules with --out", () => {
    function outFileFs(prepend?: boolean) {
        return loadProjectFromFiles({
            "/src/app/file3.ts": dedent`
                export const z = 30;
                import { x } from "file1";
            `,
            "/src/app/file4.ts": `const myVar = 30;`,
            "/src/app/tsconfig.json": jsonToReadableText({
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
            "/src/lib/file0.ts": `const myGlob = 20;`,
            "/src/lib/file1.ts": `export const x = 10;`,
            "/src/lib/file2.ts": `export const y = 20;`,
            "/src/lib/global.ts": `const globalConst = 10;`,
            "/src/lib/tsconfig.json": jsonToReadableText({
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
        });
    }

    verifyTsc({
        scenario: "amdModulesWithOut",
        subScenario: "modules and globals mixed in amd",
        fs: outFileFs,
        commandLineArgs: ["--b", "/src/app", "--verbose"],
        baselineSourceMap: true,
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: fs => appendText(fs, "/src/lib/file1.ts", "console.log(x);"),
        }],
    });

    verifyTsc({
        scenario: "amdModulesWithOut",
        subScenario: "prepend reports deprecation error",
        fs: () => outFileFs(/*prepend*/ true),
        commandLineArgs: ["--b", "/src/app", "--verbose"],
        baselineSourceMap: true,
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: fs => appendText(fs, "/src/lib/file1.ts", "console.log(x);"),
        }],
    });

    describe("when the module resolution finds original source file", () => {
        function modifyFs(fs: vfs.FileSystem) {
            // Make lib to output to parent dir
            replaceText(fs, "/src/lib/tsconfig.json", `"outFile": "module.js"`, `"outFile": "../module.js", "rootDir": "../"`);
            // Change reference to file1 module to resolve to lib/file1
            replaceText(fs, "/src/app/file3.ts", "file1", "lib/file1");
        }

        verifyTsc({
            scenario: "amdModulesWithOut",
            subScenario: "when the module resolution finds original source file",
            fs: outFileFs,
            commandLineArgs: ["-b", "/src/app", "--verbose"],
            modifyFs,
            baselineSourceMap: true,
        });
    });
});

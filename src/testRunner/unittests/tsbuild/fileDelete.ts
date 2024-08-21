import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: fileDelete::", () => {
    function sys(childOptions: ts.CompilerOptions, mainOptions?: ts.CompilerOptions) {
        return TestServerHost.createWatchedSystem({
            "/src/child/child.ts": dedent`
                import { child2 } from "../child/child2";
                export function child() {
                    child2();
                }
            `,
            "/src/child/child2.ts": dedent`
                export function child2() {
                }
            `,
            "/src/child/tsconfig.json": jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson(childOptions),
            }),
            ...(mainOptions ? {
                "/src/main/main.ts": dedent`
                    import { child } from "${childOptions.outFile ? "child" : "../child/child"}";
                    export function main() {
                        child();
                    }
                `,
                "/src/main/tsconfig.json": jsonToReadableText({
                    compilerOptions: compilerOptionsToConfigJson(mainOptions),
                    references: [{ path: "../child" }],
                }),
            } : {}),
        }, { currentDirectory: "/" });
    }

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `multiFile/detects deleted file`,
        commandLineArgs: ["--b", "/src/main/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        sys: () => sys({ composite: true }, { composite: true }),
        edits: [{
            caption: "delete child2 file",
            edit: sys => {
                sys.rimrafSync("/src/child/child2.ts");
                sys.rimrafSync("/src/child/child2.js");
                sys.rimrafSync("/src/child/child2.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `outFile/detects deleted file`,
        commandLineArgs: ["--b", "/src/main/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        sys: () => sys({ composite: true, outFile: "../childResult.js", module: ts.ModuleKind.AMD }, { composite: true, outFile: "../mainResult.js", module: ts.ModuleKind.AMD }),
        edits: [{
            caption: "delete child2 file",
            edit: sys => sys.rimrafSync("/src/child/child2.ts"),
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `multiFile/deleted file without composite`,
        commandLineArgs: ["--b", "/src/child/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        sys: () => sys({}),
        edits: [{
            caption: "delete child2 file",
            edit: sys => {
                sys.rimrafSync("/src/child/child2.ts");
                sys.rimrafSync("/src/child/child2.js");
            },
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `outFile/deleted file without composite`,
        commandLineArgs: ["--b", "/src/child/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        sys: () => sys({ outFile: "../childResult.js", module: ts.ModuleKind.AMD }),
        edits: [{
            caption: "delete child2 file",
            edit: sys => sys.rimrafSync("/src/child/child2.ts"),
        }],
    });
});

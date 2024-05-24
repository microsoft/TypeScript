import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild:: fileDelete::", () => {
    function fs(childOptions: ts.CompilerOptions, mainOptions?: ts.CompilerOptions) {
        return loadProjectFromFiles({
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
        });
    }

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `multiFile/detects deleted file`,
        commandLineArgs: ["--b", "/src/main/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        fs: () => fs({ composite: true }, { composite: true }),
        edits: [{
            caption: "delete child2 file",
            edit: fs => {
                fs.rimrafSync("/src/child/child2.ts");
                fs.rimrafSync("/src/child/child2.js");
                fs.rimrafSync("/src/child/child2.d.ts");
            },
            discrepancyExplanation: () => [
                "Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files",
                "Incremental will store the past latestChangedDtsFile and emitSignatures",
            ],
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `outFile/detects deleted file`,
        commandLineArgs: ["--b", "/src/main/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        fs: () => fs({ composite: true, outFile: "../childResult.js", module: ts.ModuleKind.AMD }, { composite: true, outFile: "../mainResult.js", module: ts.ModuleKind.AMD }),
        edits: [{
            caption: "delete child2 file",
            edit: fs => fs.rimrafSync("/src/child/child2.ts"),
            discrepancyExplanation: () => [
                "Clean build will not have latestChangedDtsFile as there was no emit and outSignature as undefined for files",
                "Incremental will store the past latestChangedDtsFile and outSignature",
            ],
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `multiFile/deleted file without composite`,
        commandLineArgs: ["--b", "/src/child/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        fs: () => fs({}),
        edits: [{
            caption: "delete child2 file",
            edit: fs => {
                fs.rimrafSync("/src/child/child2.ts");
                fs.rimrafSync("/src/child/child2.js");
            },
        }],
    });

    verifyTsc({
        scenario: "fileDelete",
        subScenario: `outFile/deleted file without composite`,
        commandLineArgs: ["--b", "/src/child/tsconfig.json", "-v", "--traceResolution", "--explainFiles"],
        fs: () => fs({ outFile: "../childResult.js", module: ts.ModuleKind.AMD }),
        edits: [{
            caption: "delete child2 file",
            edit: fs => fs.rimrafSync("/src/child/child2.ts"),
        }],
    });
});

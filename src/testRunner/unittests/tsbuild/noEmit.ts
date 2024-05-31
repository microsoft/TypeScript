import { jsonToReadableText } from "../helpers.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild:: noEmit", () => {
    function verifyNoEmitWorker(subScenario: string, aTsContent: string, commandLineArgs: readonly string[], options?: object) {
        verifyTsc({
            scenario: "noEmit",
            subScenario,
            fs: () =>
                loadProjectFromFiles({
                    "/src/a.ts": aTsContent,
                    "/src/tsconfig.json": jsonToReadableText({
                        compilerOptions: { ...options, noEmit: true },
                    }),
                }),
            commandLineArgs,
            edits: [
                noChangeRun,
                {
                    caption: "Fix error",
                    edit: fs => fs.writeFileSync("/src/a.ts", `const a = "hello"`),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });
    }

    function verifyNoEmit(subScenario: string, aTsContent: string) {
        verifyNoEmitWorker(subScenario, aTsContent, ["--b", "/src/tsconfig.json", "-v"]);
        verifyNoEmitWorker(`${subScenario} with incremental`, aTsContent, ["--b", "/src/tsconfig.json", "-v", "--incremental"]);
        verifyNoEmitWorker(`${subScenario} with outFile`, aTsContent, ["--b", "/src/tsconfig.json", "-v"], { outFile: "../outFile.js" });
        verifyNoEmitWorker(`${subScenario} with outFile with incremental`, aTsContent, ["--b", "/src/tsconfig.json", "-v", "--incremental"], { outFile: "../outFile.js" });
    }

    verifyNoEmit("syntax errors", `const a = "hello`);
    verifyNoEmit("semantic errors", `const a: number = "hello"`);
});

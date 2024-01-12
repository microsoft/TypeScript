import {
    jsonToReadableText,
} from "../helpers";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: noEmit", () => {
    function verifyNoEmitWorker(subScenario: string, aTsContent: string, commandLineArgs: readonly string[]) {
        verifyTsc({
            scenario: "noEmit",
            subScenario,
            fs: () =>
                loadProjectFromFiles({
                    "/src/a.ts": aTsContent,
                    "/src/tsconfig.json": jsonToReadableText({
                        compilerOptions: { noEmit: true },
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
    }

    verifyNoEmit("syntax errors", `const a = "hello`);
    verifyNoEmit("semantic errors", `const a: number = "hello"`);
});

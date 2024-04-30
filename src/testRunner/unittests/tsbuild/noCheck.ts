import {
    CommandLineOption,
    optionDeclarations,
} from "../../_namespaces/ts";
import { jsonToReadableText } from "../helpers";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc";
import { loadProjectFromFiles } from "../helpers/vfs";

function verifyNoCheckFlag(variant: string) {
    function verifyNoCheckWorker(subScenario: string, declAText: string, commandLineArgs: readonly string[]) {
        verifyTsc({
            scenario: variant,
            subScenario,
            fs: () =>
                loadProjectFromFiles({
                    "/src/a.ts": getATsContent(declAText),
                    "/src/tsconfig.json": jsonToReadableText({
                        compilerOptions: { noCheck: true, emitDeclarationOnly: true, declaration: true },
                    }),
                }),
            commandLineArgs,
            edits: [
                noChangeRun,
                {
                    caption: "Fix `a` error",
                    edit: fs => fs.writeFileSync("/src/a.ts", getATsContent(`const a = "hello"`)),
                },
                noChangeRun,
                {
                    caption: "Disable noCheck",
                    edit: fs =>
                        fs.writeFileSync(
                            "/src/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: { emitDeclarationOnly: true, declaration: true },
                            }),
                        ),
                },
                noChangeRun,
            ],
            baselinePrograms: true,
        });

        function getATsContent(declAText: string) {
            return `const err: number = "error";
${declAText}`;
        }
    }

    function verifyNoCheck(subScenario: string, aTsContent: string) {
        verifyNoCheckWorker(subScenario, aTsContent, ["--b", "/src/tsconfig.json", "-v"]);
        verifyNoCheckWorker(`${subScenario} with incremental`, aTsContent, ["--b", "/src/tsconfig.json", "-v", "--incremental"]);
    }

    verifyNoCheck("syntax errors", `const a = "hello`);
    verifyNoCheck("semantic errors", `const a: number = "hello"`);
}

describe("unittests:: tsbuild:: noCheck", () => {
    // Enable the `noCheck` option on the CLI for testing purposes, to ensure it works with incremental/build
    let validate: CommandLineOption["extraValidation"];
    before(() => {
        for (const opt of optionDeclarations) {
            if (opt.name === "noCheck") {
                validate = opt.extraValidation;
                opt.extraValidation = () => undefined;
            }
        }
    });
    after(() => {
        for (const opt of optionDeclarations) {
            if (opt.name === "noCheck") {
                opt.extraValidation = validate;
            }
        }
    });

    verifyNoCheckFlag("noCheck");
});

describe("unittests:: tsbuild:: noCheck:: errors", () => {
    verifyNoCheckFlag("noCheck-errors");
});

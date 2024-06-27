import { forEachNoEmitOnErrorScenario } from "../helpers/noEmitOnError.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild - with noEmitOnError::", () => {
    forEachNoEmitOnErrorScenario(
        (fsContents, cwd, executingFilePath) => loadProjectFromFiles(fsContents, { cwd, executingFilePath }),
        (scenarioName, fs) => {
            describe(scenarioName("verify noEmitOnError"), () => {
                verifyTsc({
                    scenario: "noEmitOnError",
                    subScenario: scenarioName("syntax errors"),
                    fs,
                    commandLineArgs: ["--b", "--verbose"],
                    edits: [
                        noChangeRun,
                        {
                            caption: "Fix error",
                            edit: fs =>
                                fs.writeFileSync(
                                    "src/main.ts",
                                    `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`,
                                    "utf-8",
                                ),
                        },
                        noChangeRun,
                    ],
                    baselinePrograms: true,
                });

                verifyTsc({
                    scenario: "noEmitOnError",
                    subScenario: scenarioName("semantic errors"),
                    fs,
                    modifyFs: fs =>
                        fs.writeFileSync(
                            "src/main.ts",
                            `import { A } from "../shared/types/db";
const a: string = 10;`,
                            "utf-8",
                        ),
                    commandLineArgs: ["--b", "--verbose"],
                    edits: [
                        noChangeRun,
                        {
                            caption: "Fix error",
                            edit: fs =>
                                fs.writeFileSync(
                                    "src/main.ts",
                                    `import { A } from "../shared/types/db";
const a: string = "hello";`,
                                    "utf-8",
                                ),
                        },
                        noChangeRun,
                    ],
                    baselinePrograms: true,
                });
            });
        },
    );
});

import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    appendText,
    loadProjectFromFiles,
} from "../helpers/vfs.js";

describe("unittests:: tsbuild:: roots::", () => {
    verifyTsc({
        scenario: "roots",
        subScenario: `when two root files are consecutive`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
        fs: () =>
            loadProjectFromFiles({
                "/src/file1.ts": `export const x = "hello";`,
                "/src/file2.ts": `export const y = "world";`,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: fs => {
                fs.rimrafSync("/src/file1.ts");
                fs.rimrafSync("/src/file1.js");
                fs.rimrafSync("/src/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when multiple root files are consecutive`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
        fs: () =>
            loadProjectFromFiles({
                "/src/file1.ts": `export const x = "hello";`,
                "/src/file2.ts": `export const y = "world";`,
                "/src/file3.ts": `export const y = "world";`,
                "/src/file4.ts": `export const y = "world";`,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: fs => {
                fs.rimrafSync("/src/file1.ts");
                fs.rimrafSync("/src/file1.js");
                fs.rimrafSync("/src/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when files are not consecutive`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
        fs: () =>
            loadProjectFromFiles({
                "/src/file1.ts": `export const x = "hello";`,
                "/src/random.d.ts": `export const random = "world";`,
                "/src/file2.ts": dedent`
                import { random } from "./random";
                export const y = "world";
            `,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["file*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: fs => {
                fs.rimrafSync("/src/file1.ts");
                fs.rimrafSync("/src/file1.js");
                fs.rimrafSync("/src/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when consecutive and non consecutive are mixed`,
        commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
        fs: () =>
            loadProjectFromFiles({
                "/src/file1.ts": `export const x = "hello";`,
                "/src/file2.ts": `export const y = "world";`,
                "/src/random.d.ts": `export const random = "hello";`,
                "/src/nonconsecutive.ts": dedent`
                import { random } from "./random";
                export const nonConsecutive = "hello";
            `,
                "/src/random1.d.ts": `export const random = "hello";`,
                "/src/asArray1.ts": dedent`
                import { random } from "./random1";
                export const x = "hello";
            `,
                "/src/asArray2.ts": `export const x = "hello";`,
                "/src/asArray3.ts": `export const x = "hello";`,
                "/src/random2.d.ts": `export const random = "hello";`,
                "/src/anotherNonConsecutive.ts": dedent`
                import { random } from "./random2";
                export const nonConsecutive = "hello";
            `,
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["file*.ts", "nonconsecutive*.ts", "asArray*.ts", "anotherNonConsecutive.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: fs => {
                fs.rimrafSync("/src/file1.ts");
                fs.rimrafSync("/src/file1.js");
                fs.rimrafSync("/src/file1.d.ts");
            },
        }],
    });

    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject((subScenario, getFsContents) => {
            verifyTsc({
                scenario: "roots",
                subScenario,
                commandLineArgs: ["--b", "projects/server", "-v", "--traceResolution", "--explainFiles"],
                fs: () => loadProjectFromFiles(getFsContents(), { cwd: "/home/src/workspaces" }),
                edits: [
                    noChangeRun,
                    {
                        caption: "edit logging file",
                        edit: fs => appendText(fs, "/home/src/workspaces/projects/shared/src/logging.ts", "export const x = 10;"),
                    },
                    noChangeRun,
                    {
                        caption: "delete random file",
                        edit: fs => fs.unlinkSync("/home/src/workspaces/projects/shared/src/random.ts"),
                    },
                    noChangeRun,
                ],
            });
        });
    });
});

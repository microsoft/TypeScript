import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: roots::", () => {
    verifyTsc({
        scenario: "roots",
        subScenario: `when two root files are consecutive`,
        commandLineArgs: ["--b", "-v"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/file2.ts": `export const y = "world";`,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: sys => {
                sys.rimrafSync("/home/src/workspaces/project/file1.ts");
                sys.rimrafSync("/home/src/workspaces/project/file1.js");
                sys.rimrafSync("/home/src/workspaces/project/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when multiple root files are consecutive`,
        commandLineArgs: ["--b", "-v"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/file2.ts": `export const y = "world";`,
                "/home/src/workspaces/project/file3.ts": `export const y = "world";`,
                "/home/src/workspaces/project/file4.ts": `export const y = "world";`,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: sys => {
                sys.rimrafSync("/home/src/workspaces/project/file1.ts");
                sys.rimrafSync("/home/src/workspaces/project/file1.js");
                sys.rimrafSync("/home/src/workspaces/project/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when files are not consecutive`,
        commandLineArgs: ["--b", "-v"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/random.d.ts": `export const random = "world";`,
                "/home/src/workspaces/project/file2.ts": dedent`
                    import { random } from "./random";
                    export const y = "world";
                `,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["file*.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: sys => {
                sys.rimrafSync("/home/src/workspaces/project/file1.ts");
                sys.rimrafSync("/home/src/workspaces/project/file1.js");
                sys.rimrafSync("/home/src/workspaces/project/file1.d.ts");
            },
        }],
    });

    verifyTsc({
        scenario: "roots",
        subScenario: `when consecutive and non consecutive are mixed`,
        commandLineArgs: ["--b", "-v"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/file2.ts": `export const y = "world";`,
                "/home/src/workspaces/project/random.d.ts": `export const random = "hello";`,
                "/home/src/workspaces/project/nonconsecutive.ts": dedent`
                import { random } from "./random";
                export const nonConsecutive = "hello";
            `,
                "/home/src/workspaces/project/random1.d.ts": `export const random = "hello";`,
                "/home/src/workspaces/project/asArray1.ts": dedent`
                import { random } from "./random1";
                export const x = "hello";
            `,
                "/home/src/workspaces/project/asArray2.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/asArray3.ts": `export const x = "hello";`,
                "/home/src/workspaces/project/random2.d.ts": `export const random = "hello";`,
                "/home/src/workspaces/project/anotherNonConsecutive.ts": dedent`
                import { random } from "./random2";
                export const nonConsecutive = "hello";
            `,
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["file*.ts", "nonconsecutive*.ts", "asArray*.ts", "anotherNonConsecutive.ts"],
                }),
            }),
        edits: [{
            caption: "delete file1",
            edit: sys => {
                sys.rimrafSync("/home/src/workspaces/project/file1.ts");
                sys.rimrafSync("/home/src/workspaces/project/file1.js");
                sys.rimrafSync("/home/src/workspaces/project/file1.d.ts");
            },
        }],
    });

    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject(
            /*forTsserver*/ false,
            (subScenario, sys, edits) => {
                verifyTsc({
                    scenario: "roots",
                    subScenario,
                    commandLineArgs: ["--b", "projects/server", "-v", "--traceResolution", "--explainFiles"],
                    sys,
                    edits: edits(),
                });
            },
        );
    });
});

import { emptyArray } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachNoEmitOnErrorScenarioTsc } from "../helpers/noEmitOnError.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: noEmitOnError::", () => {
    forEachNoEmitOnErrorScenarioTsc([]);

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: `multiFile/when declarationMap changes`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmitOnError: true,
                        declaration: true,
                        composite: true,
                    },
                }),
                "/home/src/workspaces/project/a.ts": "const x = 10;",
                "/home/src/workspaces/project/b.ts": "const y = 10;",
            }),
        commandLineArgs: emptyArray,
        edits: [
            {
                caption: "error and enable declarationMap",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--declarationMap"],
                discrepancyExplanation: () => [
                    `Clean build does not emit any file so will have emitSignatures with all files since they are not emitted`,
                    `Incremental build has emitSignatures from before, so it will have a.ts with signature since file.version isnt same`,
                    `Incremental build will also have emitSignatureDtsMapDiffers for both files since the emitSignatures were without declarationMap but currentOptions have declrationMap`,
                ],
            },
            {
                caption: "fix error declarationMap",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--declarationMap"],
            },
        ],
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: `outFile/when declarationMap changes`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmitOnError: true,
                        declaration: true,
                        composite: true,
                        outFile: "../outFile.js",
                    },
                }),
                "/home/src/workspaces/project/a.ts": "const x = 10;",
                "/home/src/workspaces/project/b.ts": "const y = 10;",
            }),
        commandLineArgs: emptyArray,
        edits: [
            {
                caption: "error and enable declarationMap",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--declarationMap"],
                discrepancyExplanation: () => [
                    `Clean build does not emit any file so will not have outSignature`,
                    `Incremental build has outSignature from before`,
                ],
            },
            {
                caption: "fix error declarationMap",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--declarationMap"],
            },
        ],
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "multiFile/file deleted before fixing error with noEmitOnError",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "outDir",
                        noEmitOnError: true,
                    },
                }),
                "/home/src/workspaces/project/file1.ts": `export const x: 30 = "hello";`,
                "/home/src/workspaces/project/file2.ts": `export class D { }`,
            }),
        commandLineArgs: ["-i"],
        edits: [{
            caption: "delete file without error",
            edit: sys => sys.deleteFile("/home/src/workspaces/project/file2.ts"),
        }],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "outFile/file deleted before fixing error with noEmitOnError",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outFile: "../outFile.js",
                        module: "amd",
                        noEmitOnError: true,
                    },
                }),
                "/home/src/workspaces/project/file1.ts": `export const x: 30 = "hello";`,
                "/home/src/workspaces/project/file2.ts": `export class D { }`,
            }),
        commandLineArgs: ["-i"],
        edits: [{
            caption: "delete file without error",
            edit: sys => sys.deleteFile("/home/src/workspaces/project/file2.ts"),
        }],
        baselinePrograms: true,
    });
});

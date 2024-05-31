import { jsonToReadableText } from "../helpers.js";
import { forEachNoEmitOnErrorScenario } from "../helpers/noEmitOnError.js";
import {
    noChangeRun,
    TestTscEdit,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs.js";

describe("unittests:: tsc:: noEmitOnError::", () => {
    forEachNoEmitOnErrorScenario(
        (fsContents, cwd, executingFilePath) => loadProjectFromFiles(fsContents, { cwd, executingFilePath }),
        (scnearioName, fs) => {
            describe(scnearioName("verify noEmitOnError"), () => {
                function verifyNoEmitOnError(subScenario: string, fixModifyFs: TestTscEdit["edit"], modifyFs?: TestTscEdit["edit"]) {
                    verifyTsc({
                        scenario: "noEmitOnError",
                        subScenario: scnearioName(subScenario),
                        fs,
                        commandLineArgs: [],
                        modifyFs,
                        edits: [
                            noChangeRun,
                            {
                                caption: "incremental-declaration-doesnt-change",
                                edit: fixModifyFs,
                            },
                            noChangeRun,
                        ],
                        baselinePrograms: true,
                    });
                }
                verifyNoEmitOnError(
                    "syntax errors",
                    fs =>
                        fs.writeFileSync(
                            "src/main.ts",
                            `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`,
                            "utf-8",
                        ),
                );

                verifyNoEmitOnError(
                    "semantic errors",
                    fs =>
                        fs.writeFileSync(
                            "src/main.ts",
                            `import { A } from "../shared/types/db";
const a: string = "hello";`,
                            "utf-8",
                        ),
                    fs =>
                        fs.writeFileSync(
                            "src/main.ts",
                            `import { A } from "../shared/types/db";
const a: string = 10;`,
                            "utf-8",
                        ),
                );
            });
        },
    );

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: `when declarationMap changes`,
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmitOnError: true,
                        declaration: true,
                        composite: true,
                    },
                }),
                "/src/project/a.ts": "const x = 10;",
                "/src/project/b.ts": "const y = 10;",
            }),
        commandLineArgs: ["--p", "/src/project"],
        edits: [
            {
                caption: "error and enable declarationMap",
                edit: fs => replaceText(fs, "/src/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
                discrepancyExplanation: () => [
                    `Clean build does not emit any file so will have emitSignatures with all files since they are not emitted`,
                    `Incremental build has emitSignatures from before, so it will have a.ts with signature since file.version isnt same`,
                    `Incremental build will also have emitSignatureDtsMapDiffers for both files since the emitSignatures were without declarationMap but currentOptions have declrationMap`,
                ],
            },
            {
                caption: "fix error declarationMap",
                edit: fs => replaceText(fs, "/src/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
        ],
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: `when declarationMap changes with outFile`,
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmitOnError: true,
                        declaration: true,
                        composite: true,
                        outFile: "../outFile.js",
                    },
                }),
                "/src/project/a.ts": "const x = 10;",
                "/src/project/b.ts": "const y = 10;",
            }),
        commandLineArgs: ["--p", "/src/project"],
        edits: [
            {
                caption: "error and enable declarationMap",
                edit: fs => replaceText(fs, "/src/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
            {
                caption: "fix error declarationMap",
                edit: fs => replaceText(fs, "/src/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
        ],
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "file deleted before fixing error with noEmitOnError",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "outDir",
                        noEmitOnError: true,
                    },
                }),
                "/src/project/file1.ts": `export const x: 30 = "hello";`,
                "/src/project/file2.ts": `export class D { }`,
            }),
        commandLineArgs: ["--p", "/src/project", "-i"],
        edits: [{
            caption: "delete file without error",
            edit: fs => fs.unlinkSync("/src/project/file2.ts"),
        }],
        baselinePrograms: true,
    });

    verifyTsc({
        scenario: "noEmitOnError",
        subScenario: "file deleted before fixing error with noEmitOnError with outFile",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outFile: "../outFile.js",
                        module: "amd",
                        noEmitOnError: true,
                    },
                }),
                "/src/project/file1.ts": `export const x: 30 = "hello";`,
                "/src/project/file2.ts": `export class D { }`,
            }),
        commandLineArgs: ["--p", "/src/project", "-i"],
        edits: [{
            caption: "delete file without error",
            edit: fs => fs.unlinkSync("/src/project/file2.ts"),
        }],
        baselinePrograms: true,
    });
});

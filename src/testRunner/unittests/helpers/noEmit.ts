import {
    CompilerOptions,
    hasProperty,
    ModuleKind,
    noop,
} from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    compilerOptionsToConfigJson,
    FsContents,
    libContent,
} from "./contents.js";
import {
    noChangeRun,
    TestTscEdit,
    verifyTsc,
} from "./tsc.js";
import { verifyTscWatch } from "./tscWatch.js";
import {
    loadProjectFromFiles,
    replaceText,
} from "./vfs.js";
import {
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch.js";

function forEachNoEmitChangesWorker(commandType: string[], compilerOptions: CompilerOptions) {
    const discrepancyExplanation = () => [
        "Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files",
        "Incremental will store the past latestChangedDtsFile and emitSignatures",
    ];
    const noChangeRunWithNoEmit: TestTscEdit = {
        ...noChangeRun,
        caption: "No Change run with noEmit",
        commandLineArgs: [...commandType, "src/project", "--noEmit"],
        discrepancyExplanation: compilerOptions.composite ?
            discrepancyExplanation :
            undefined,
    };
    const noChangeRunWithEmit: TestTscEdit = {
        ...noChangeRun,
        caption: "No Change run with emit",
        commandLineArgs: [...commandType, "src/project"],
    };
    let optionsString = "";
    for (const key in compilerOptions) {
        if (hasProperty(compilerOptions, key) && key !== "outFile" && key !== "module") {
            optionsString += ` ${key}`;
        }
    }
    function scenarioName(text: string) {
        return `${compilerOptions.outFile ? "outFile" : "multiFile"}/${text}${optionsString}`;
    }

    verifyTsc({
        scenario: "noEmit",
        subScenario: scenarioName("changes"),
        commandLineArgs: [...commandType, "src/project"],
        fs,
        edits: [
            noChangeRunWithNoEmit,
            noChangeRunWithNoEmit,
            {
                caption: "Introduce error but still noEmit",
                commandLineArgs: [...commandType, "src/project", "--noEmit"],
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
                discrepancyExplanation: compilerOptions.composite ?
                    discrepancyExplanation :
                    undefined,
            },
            {
                caption: "Fix error and emit",
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
            },
            noChangeRunWithEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithEmit,
            {
                caption: "Introduce error and emit",
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
            },
            noChangeRunWithEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithEmit,
            {
                caption: "Fix error and no emit",
                commandLineArgs: [...commandType, "src/project", "--noEmit"],
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
                discrepancyExplanation: compilerOptions.composite ?
                    discrepancyExplanation :
                    undefined,
            },
            noChangeRunWithEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithNoEmit,
            noChangeRunWithEmit,
        ],
    });

    verifyTsc({
        scenario: "noEmit",
        subScenario: scenarioName("changes with initial noEmit"),
        commandLineArgs: [...commandType, "src/project", "--noEmit"],
        fs,
        edits: [
            noChangeRunWithEmit,
            {
                caption: "Introduce error with emit",
                commandLineArgs: [...commandType, "src/project"],
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
            },
            {
                caption: "Fix error and no emit",
                edit: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
                discrepancyExplanation: compilerOptions.composite ?
                    discrepancyExplanation :
                    undefined,
            },
            noChangeRunWithEmit,
        ],
    });

    function fs() {
        return loadProjectFromFiles({
            "/src/project/src/class.ts": dedent`
                export class classC {
                    prop = 1;
                }`,
            "/src/project/src/indirectClass.ts": dedent`
                import { classC } from './class';
                export class indirectClass {
                    classC = new classC();
                }`,
            "/src/project/src/directUse.ts": dedent`
                import { indirectClass } from './indirectClass';
                new indirectClass().classC.prop;`,
            "/src/project/src/indirectUse.ts": dedent`
                import { indirectClass } from './indirectClass';
                new indirectClass().classC.prop;`,
            "/src/project/src/noChangeFile.ts": dedent`
                export function writeLog(s: string) {
                }`,
            "/src/project/src/noChangeFileWithEmitSpecificError.ts": dedent`
                function someFunc(arguments: boolean, ...rest: any[]) {
                }`,
            "/src/project/tsconfig.json": jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson(compilerOptions),
            }),
        });
    }
}

export function forEachNoEmitChanges(commandType: string[]) {
    describe("when noEmit changes between compilation", () => {
        forEachNoEmitChangesWorker(commandType, { incremental: true });
        forEachNoEmitChangesWorker(commandType, { incremental: true, declaration: true });
        forEachNoEmitChangesWorker(commandType, { composite: true });
        forEachNoEmitChangesWorker(commandType, { incremental: true, outFile: "../outFile.js", module: ModuleKind.AMD });
        forEachNoEmitChangesWorker(commandType, { incremental: true, declaration: true, outFile: "../outFile.js", module: ModuleKind.AMD });
        forEachNoEmitChangesWorker(commandType, { composite: true, outFile: "../outFile.js", module: ModuleKind.AMD });
    });
}

function editsForDtsChanges(
    commandType: string[],
    aContent: string,
    incremental: boolean | undefined,
    multiFile: boolean,
): TestTscEdit[] {
    return [
        noChangeRun,
        {
            caption: "With declaration enabled noEmit - Should report errors",
            edit: noop,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit", "--declaration"],
        },
        {
            caption: "With declaration and declarationMap noEmit - Should report errors",
            edit: noop,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit", "--declaration", "--declarationMap"],
        },
        incremental ? {
            ...noChangeRun,
            discrepancyExplanation: () => [
                "Clean build will not have declaration and declarationMap",
                "Incremental build will have previous buildInfo so will have dts and declaration and declarationMap",
            ],
        } : noChangeRun,
        {
            caption: "Dts Emit with error",
            edit: noop,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--declaration"],
        },
        {
            caption: "Fix the error",
            edit: fs => fs.writeFileSync("/home/src/projects/project/a.ts", aContent.replace("private", "public")),
        },
        {
            caption: "With declaration enabled noEmit",
            edit: noop,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit", "--declaration"],
        },
        {
            caption: "With declaration and declarationMap noEmit",
            edit: noop,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit", "--declaration", "--declarationMap"],
            // Multi file still needs to report error so will emit build info (for pending dtsMap)
            discrepancyExplanation: incremental && !multiFile ? () => [
                "Clean build will have declaration and declarationMap",
                "Incremental build will have previous buildInfo so will have declaration and declarationMap",
            ] : undefined,
        },
    ];
}

export function forEachNoEmitDtsChanges(commandType: string[]) {
    describe("dts errors with declaration enable changes", () => {
        if (commandType[0] !== "-b") return; // Only test non multiple file errors with -b
        [false, true].forEach(asModules =>
            [undefined, true].forEach(incremental =>
                [{}, { outFile: "../outFile.js", module: asModules ? "amd" : undefined }].forEach(options => {
                    if (!incremental && asModules) return; // Not the interesting case
                    const aContent = asModules ? `export const a = class { private p = 10; };` : `const a = class { private p = 10; };`;
                    verifyTsc({
                        scenario: "noEmit",
                        subScenario: `${options.outFile ? "outFile" : "multiFile"}/dts errors with declaration enable changes${incremental ? " with incremental" : ""}${asModules ? " as modules" : ""}`,
                        commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit"],
                        fs: () =>
                            loadProjectFromFiles({
                                "/home/src/projects/project/a.ts": aContent,
                                "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                                    compilerOptions: { ...options, incremental },
                                }),
                            }),
                        modifyFs: asModules ?
                            fs => fs.writeFileSync("/home/src/projects/project/b.ts", `export const b = 10;`) :
                            undefined,
                        edits: editsForDtsChanges(commandType, aContent, incremental, /*multiFile*/ false),
                        baselinePrograms: true,
                    });
                })
            )
        );
    });

    describe("dts errors with declaration enable changes with errors in multiple files", () => {
        [{}, { outFile: "../outFile.js", module: "amd" }].forEach(options => {
            const aContent = `export const a = class { private p = 10; };`;
            verifyTsc({
                scenario: "noEmit",
                subScenario: `${options.outFile ? "outFile" : "multiFile"}/dts errors with declaration enable changes with multiple files`,
                commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit"],
                fs: () =>
                    loadProjectFromFiles({
                        "/home/src/projects/project/a.ts": aContent,
                        "/home/src/projects/project/b.ts": `export const b = 10;`,
                        "/home/src/projects/project/c.ts": aContent.replace("a", "c"),
                        "/home/src/projects/project/d.ts": aContent.replace("a", "d"),
                        "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                            compilerOptions: { ...options, incremental: true },
                        }),
                    }),
                edits: [
                    ...editsForDtsChanges(commandType, aContent, /*incremental*/ true, /*multiFile*/ true),
                    {
                        caption: "Fix the another ",
                        edit: fs => fs.writeFileSync("/home/src/projects/project/c.ts", aContent.replace("a", "c").replace("private", "public")),
                        commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit", "--declaration", "--declarationMap"],
                    },
                ],
                baselinePrograms: true,
            });
        });
    });
}

function forEachNoEmitAndErrorsWorker(
    subScenario: string,
    aTsContent: string,
    additionalOptions: CompilerOptions | undefined,
    action: (
        subScenario: string,
        fsContents: FsContents,
        aTsContent: string,
        fixedATsContent: string,
        compilerOptions: CompilerOptions,
    ) => void,
) {
    [false, true].forEach(asModules =>
        [undefined, true].forEach(incremental =>
            [{}, { outFile: "../outFile.js", module: asModules ? ModuleKind.AMD : undefined }].forEach(options => {
                if (!incremental && asModules) return; // Not the interesting case
                const aContent = asModules ? `export ${aTsContent}` : aTsContent;
                const compilerOptions = {
                    ...options,
                    incremental,
                    ...additionalOptions,
                };
                const fsContents: FsContents = {
                    "/home/src/projects/project/a.ts": aContent,
                    "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                        compilerOptions: compilerOptionsToConfigJson(compilerOptions),
                    }),
                };
                if (asModules) fsContents["/home/src/projects/project/b.ts"] = `export const b = 10;`;
                action(
                    `${options.outFile ? "outFile" : "multiFile"}/${subScenario}${incremental ? " with incremental" : ""}${asModules ? " as modules" : ""}`,
                    fsContents,
                    aContent,
                    `${asModules ? "export " : ""}const a = "hello";`,
                    compilerOptions,
                );
            })
        )
    );
}

function forEachNoEmitAndErrors(
    action: (
        subScenario: string,
        fsContents: FsContents,
        aTsContent: string,
        fixedATsContent: string,
        compilerOptions: CompilerOptions,
    ) => void,
) {
    forEachNoEmitAndErrorsWorker(
        "syntax errors",
        `const a = "hello`,
        /*additionalOptions*/ undefined,
        action,
    );
    forEachNoEmitAndErrorsWorker(
        "semantic errors",
        `const a: number = "hello"`,
        /*additionalOptions*/ undefined,
        action,
    );
    [{}, { declaration: true }].forEach(options => {
        forEachNoEmitAndErrorsWorker(
            `dts errors${!options.declaration ? " without dts enabled" : ""}`,
            `const a = class { private p = 10; };`,
            options,
            action,
        );
    });
}

export function forEachNoEmitTsc(commandType: string[]) {
    forEachNoEmitAndErrors((subScenario, fsContents, aTsContent, fixedATsContent, compilerOptions) =>
        verifyTsc({
            scenario: "noEmit",
            subScenario,
            commandLineArgs: [...commandType, "/home/src/projects/project", "--noEmit"],
            fs: () => loadProjectFromFiles(fsContents),
            edits: [
                noChangeRun,
                {
                    caption: "Fix error",
                    edit: fs => fs.writeFileSync("/home/src/projects/project/a.ts", fixedATsContent),
                },
                noChangeRun,
                {
                    caption: "Emit after fixing error",
                    edit: noop,
                    commandLineArgs: [...commandType, "/home/src/projects/project"],
                },
                noChangeRun,
                {
                    caption: "Introduce error",
                    edit: fs => fs.writeFileSync("/home/src/projects/project/a.ts", aTsContent),
                    discrepancyExplanation: compilerOptions.incremental && subScenario.indexOf("multiFile/syntax") !== -1 ? () => [
                        "DtsSignature of ts files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version",
                    ] : undefined,
                },
                {
                    caption: "Emit when error",
                    edit: noop,
                    commandLineArgs: [...commandType, "/home/src/projects/project"],
                },
                compilerOptions.incremental && subScenario.indexOf("multiFile/syntax") !== -1 ? {
                    ...noChangeRun,
                    discrepancyExplanation: () => [
                        "DtsSignature of files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version",
                    ],
                } : noChangeRun,
            ],
            baselinePrograms: true,
        })
    );
}

export function forEachNoEmitTscWatch(commandType: string[]) {
    forEachNoEmitAndErrors((subScenario, fsContents, aTsContent, fixedATsContent, compilerOptions) =>
        verifyTscWatch({
            scenario: "noEmit",
            subScenario,
            commandLineArgs: [...commandType, "/home/src/projects/project", "-w"],
            sys: () => {
                fsContents["/home/src/projects/project/tsconfig.json"] = jsonToReadableText({
                    compilerOptions: compilerOptionsToConfigJson({
                        ...compilerOptions,
                        noEmit: true,
                    }),
                });
                fsContents[libFile.path] = libContent;
                return createWatchedSystem(fsContents);
            },
            edits: [
                {
                    caption: "Fix error",
                    edit: sys => sys.writeFile("/home/src/projects/project/a.ts", fixedATsContent),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Emit after fixing error",
                    edit: sys =>
                        sys.writeFile(
                            "/home/src/projects/project/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: compilerOptionsToConfigJson(compilerOptions),
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "no Emit run after fixing error",
                    edit: sys =>
                        sys.writeFile(
                            "/home/src/projects/project/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: compilerOptionsToConfigJson({
                                    ...compilerOptions,
                                    noEmit: true,
                                }),
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Introduce error",
                    edit: sys => sys.writeFile("/home/src/projects/project/a.ts", aTsContent),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Emit when error",
                    edit: sys =>
                        sys.writeFile(
                            "/home/src/projects/project/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: compilerOptionsToConfigJson(compilerOptions),
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "no Emit run when error",
                    edit: sys =>
                        sys.writeFile(
                            "/home/src/projects/project/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: compilerOptionsToConfigJson({
                                    ...compilerOptions,
                                    noEmit: true,
                                }),
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        })
    );
}

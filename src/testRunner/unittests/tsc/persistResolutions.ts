namespace ts {
    describe("unittests:: tsc:: persistResolutions::", () => {
        function getFs(outFile?: string) {
            return loadProjectFromFiles({
                "/src/project/src/main.ts": Utils.dedent`
                    import { something } from "./filePresent";
                    import { something as something1 } from "./filePresent";
                    import { something2 } from "./fileNotFound";`,
                "/src/project/src/anotherFileReusingResolution.ts": Utils.dedent`
                    import { something } from "./filePresent";
                    import { something2 } from "./fileNotFound";`,
                "/src/project/src/filePresent.ts": `export function something() { return 10; }`,
                "/src/project/src/fileWithRef.ts": `/// <reference path="./types.ts"/>`,
                "/src/project/src/types.ts": `interface SomeType {}`,
                "/src/project/src/globalMain.ts": Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalMain() { }
                    `,
                "/src/project/src/globalAnotherFileWithSameReferenes.ts": Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalAnotherFileWithSameReferenes() { }
                    `,
                "/src/project/src/globalFilePresent.ts": `function globalSomething() { return 10; }`,
                "/src/project/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        composite: true,
                        persistResolutions: true,
                        traceResolution: true,
                        outFile
                    },
                    include: ["src/**/*.ts"]
                }),
            });
        }
        verifyTscSerializedIncrementalEdits({
            scenario: "persistResolutions",
            subScenario: `saves resolution and uses it for new program`,
            fs: getFs,
            commandLineArgs: ["--p", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                {
                    subScenario: "Modify globalMain file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/globalMain.ts`, `globalSomething();`),
                },
                {
                    subScenario: "Add new globalFile and update globalMain file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => {
                        fs.writeFileSync(`/src/project/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        prependText(fs, `/src/project/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        appendText(fs, `/src/project/src/globalMain.ts`, `globalFoo();`);
                    },
                },
                {
                    subScenario: "Write file that could not be resolved by referenced path",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => fs.writeFileSync(`/src/project/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                },
                {
                    subScenario: "Clean resolutions",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                {
                    subScenario: "Clean resolutions again",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                noChangeRun,
                {
                    subScenario: "Modify global main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/globalMain.ts`, `globalSomething();`),
                },
                {
                    subScenario: "Modify main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
                },
                {
                    subScenario: "Add new module and update main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => {
                        fs.writeFileSync(`/src/project/src/newFile.ts`, "export function foo() { return 20; }");
                        prependText(fs, `/src/project/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                },
                {
                    subScenario: "Write file that could not be resolved",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => fs.writeFileSync(`/src/project/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    // when doing clean build, fileNotFound.ts would be resolved so tsbuildinfo will contain the fileNotFound
                    cleanBuildDiscrepancies: () => new Map([
                        [`/src/project/tsconfig.tsbuildinfo`, CleanBuildDescrepancy.CleanFileTextDifferent]
                    ]),
                },
                {
                    subScenario: "Clean resolutions",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                {
                    subScenario: "Clean resolutions again",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                noChangeRun,
                {
                    subScenario: "Modify main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
                },
            ],
            baselinePrograms: true,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "persistResolutions",
            subScenario: `saves resolution and uses it for new program with outFile`,
            fs: () => getFs("outFile.js"),
            commandLineArgs: ["--p", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                {
                    subScenario: "Modify globalMain file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/globalMain.ts`, `globalSomething();`),
                },
                {
                    subScenario: "Add new globalFile and update globalMain file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => {
                        fs.writeFileSync(`/src/project/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        prependText(fs, `/src/project/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        appendText(fs, `/src/project/src/globalMain.ts`, `globalFoo();`);
                    },
                },
                {
                    subScenario: "Write file that could not be resolved by referenced path",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => fs.writeFileSync(`/src/project/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                },
                {
                    subScenario: "Clean resolutions",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                {
                    subScenario: "Clean resolutions again",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                noChangeRun,
                {
                    subScenario: "Modify global main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/globalMain.ts`, `globalSomething();`),
                },
                {
                    subScenario: "Modify main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
                },
                {
                    subScenario: "Add new module and update main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => {
                        fs.writeFileSync(`/src/project/src/newFile.ts`, "export function foo() { return 20; }");
                        prependText(fs, `/src/project/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                },
                {
                    subScenario: "Write file that could not be resolved",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => fs.writeFileSync(`/src/project/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    // when doing clean build, fileNotFound.ts would be resolved so the output order in outFile.js would change
                    cleanBuildDiscrepancies: () => new Map([
                        ["/src/project/outfile.tsbuildinfo", CleanBuildDescrepancy.CleanFileTextDifferent],
                        ["/src/project/outfile.js", CleanBuildDescrepancy.CleanFileTextDifferent],
                        ["/src/project/outfile.d.ts", CleanBuildDescrepancy.CleanFileTextDifferent],
                        ["/src/project/outfile.tsbuildinfo.baseline.txt", CleanBuildDescrepancy.CleanFileTextDifferent]
                    ]),
                },
                {
                    subScenario: "Clean resolutions",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                {
                    subScenario: "Clean resolutions again",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: noop,
                    commandLineArgs: ["--p", "src/project", "--cleanPersistedProgram"]
                },
                noChangeRun,
                {
                    subScenario: "Modify main file",
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
                },
            ],
            baselinePrograms: true,
        });
    });
}
namespace ts.PersistentResolutionsTests {
    export function getFs(outFile?: string) {
        return loadProjectFromFiles({
            "/src/project/src/main.ts": Utils.dedent`
                    import { something } from "./filePresent";
                    import { something as something1 } from "./filePresent";
                    import { something2 } from "./fileNotFound";
                    import { externalThing1 } from "externalThing";
                    import { externalThing2 } from "externalThingNotPresent";`,
            "/src/project/src/anotherFileReusingResolution.ts": Utils.dedent`
                    import { something } from "./filePresent";
                    import { something2 } from "./fileNotFound";
                    import { externalThing1 } from "externalThing";
                    import { externalThing2 } from "externalThingNotPresent";`,
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
            "/src/project/src/externalThing.d.ts": `export function externalThing1(): number;`,
            "/src/project/node_modules/@types/someType/index.d.ts": `export function someType(): number;`,
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
    export const modifyGlobalMain: TscIncremental = {
        subScenario: "Modify globalMain file",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => appendText(fs, `/src/project/src/globalMain.ts`, `globalSomething();`),
    };
    export const addNewGlobalFile: TscIncremental = {
        subScenario: "Add new globalFile and update globalMain file",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => {
            fs.writeFileSync(`/src/project/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
            prependText(fs, `/src/project/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
            appendText(fs, `/src/project/src/globalMain.ts`, `globalFoo();`);
        },
    };
    export const writeFileNotResolvedByReferencedPath: TscIncremental = {
        subScenario: "Write file that could not be resolved by referenced path",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => fs.writeFileSync(`/src/project/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
    };
    export function cleanResolutions(buildType: "--b" | "--p"): TscIncremental {
        return {
            subScenario: "Clean resolutions",
            buildKind: BuildKind.IncrementalDtsChange,
            modifyFs: noop,
            commandLineArgs: [buildType, "src/project", "--cleanPersistedProgram"]
        };
    }
    export function cleanResolutionsAgain(buildType: "--b" | "--p"): TscIncremental {
        return { ...cleanResolutions(buildType), subScenario: "Clean resolutions again", };
    }
    export const modifyMain: TscIncremental = {
        subScenario: "Modify main file",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
    };
    export const addNewFile: TscIncremental = {
        subScenario: "Add new module and update main file",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => {
            fs.writeFileSync(`/src/project/src/newFile.ts`, "export function foo() { return 20; }");
            prependText(fs, `/src/project/src/main.ts`, `import { foo } from "./newFile";`);
        },
    };
    export const writeFileNotResolved: TscIncremental = {
        subScenario: "Write file that could not be resolved",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => fs.writeFileSync(`/src/project/src/fileNotFound.ts`, "export function something2() { return 20; }"),
    };
    export const deleteFileNotResolved: TscIncremental = {
        subScenario: "Delete file that could not be resolved",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => fs.unlinkSync(`/src/project/src/fileNotFound.ts`),
    };
    export const writeExternalModuleNotResolved: TscIncremental = {
        subScenario: "Create external module file that could not be resolved",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => fs.writeFileSync(`/src/project/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
    };
    export const writeExternalModuleTakingPreference: TscIncremental = {
        subScenario: "Write .ts file that takes preference over resolved .d.ts file",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: fs => fs.writeFileSync(`/src/project/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
    };
    export function cleanBuildModifyFs(modifyFs: (fs: vfs.FileSystem) => void): (fs: vfs.FileSystem) => void {
        return fs => {
            // Ignore error when doing incremental correctness check
            try {
                modifyFs(fs);
            }
            catch { } // eslint-disable-line no-empty
        };
    }
    export const deleteTsBuildInfo: TscIncremental = {
        subScenario: "Delete tsbuildinfo file and do clean build",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: cleanBuildModifyFs(fs => fs.unlinkSync("/src/project/tsconfig.tsbuildinfo")),
    };
    export const deleteOutTsBuildInfo: TscIncremental = {
        subScenario: "Delete tsbuildinfo file and do clean build",
        buildKind: BuildKind.IncrementalDtsChange,
        modifyFs: cleanBuildModifyFs(fs => fs.unlinkSync("/src/project/outfile.tsbuildinfo")),
    };
    export function installNewType(subScenario: string): TscIncremental {
        return {
            subScenario,
            buildKind: BuildKind.IncrementalDtsChange,
            modifyFs: fs => {
                fs.mkdirpSync(`/src/project/node_modules/@types/someType2`);
                fs.writeFileSync(`/src/project/node_modules/@types/someType2/index.d.ts`, "export function someType2(): number;");
            }
        };
    }
    export function deleteExistingType(subScenario: string): TscIncremental {
        return {
            subScenario,
            buildKind: BuildKind.IncrementalDtsChange,
            modifyFs: fs => fs.rimrafSync(`/src/project/node_modules/@types/someType`),
        };
    }

    describe("unittests:: tsbuild:: persistResolutions::", () => {
        const cleanResolutionsWithBuild = cleanResolutions("--b");
        const cleanResolutionsAgainWithBuild = cleanResolutionsAgain("--b");
        const installNewTypeWithBuild = installNewType("Install another type and program is not created because its not listed file in tsconfig");
        const deleteExistingTypeWithBuild = deleteExistingType("Delete existing type and program is not created because its not listed file in tsconfig");

        verifyTscSerializedIncrementalEdits({
            scenario: "persistResolutions",
            subScenario: `saves resolution and uses it for new program`,
            fs: getFs,
            commandLineArgs: ["--b", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                cleanResolutionsWithBuild,
                cleanResolutionsAgainWithBuild,
                noChangeRun,
                modifyGlobalMain,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                cleanResolutionsWithBuild,
                cleanResolutionsAgainWithBuild,
                noChangeRun,
                modifyMain,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                {
                    ...writeExternalModuleTakingPreference,
                    cleanBuildDiscrepancies: () => new Map([
                        // In the clean build since .d.ts is not picked up, it can be overwritten with d.ts output from .ts file
                        ["/src/project/src/externalthing.d.ts", CleanBuildDescrepancy.CleanFileTextDifferent],
                        // This will be present in in clean build since resolutions will not pick up d.ts and write output files
                        ["/src/project/src/externalthing.js", CleanBuildDescrepancy.CleanFilePresent],
                    ])
                },
                deleteTsBuildInfo,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ],
            baselinePrograms: true,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "persistResolutions",
            subScenario: `saves resolution and uses it for new program with outFile`,
            fs: () => getFs("outFile.js"),
            commandLineArgs: ["--b", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                cleanResolutionsWithBuild,
                cleanResolutionsAgainWithBuild,
                noChangeRun,
                modifyGlobalMain,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                cleanResolutionsWithBuild,
                cleanResolutionsAgainWithBuild,
                noChangeRun,
                modifyMain,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                {
                    ...writeExternalModuleTakingPreference,
                    cleanBuildDiscrepancies: () => new Map([
                        // In the clean build since .d.ts is not picked up, the output of externalThing.ts would be before the main file because of import
                        ["/src/project/outfile.js", CleanBuildDescrepancy.CleanFileTextDifferent],
                        ["/src/project/outfile.d.ts", CleanBuildDescrepancy.CleanFileTextDifferent],
                    ])
                },
                deleteOutTsBuildInfo,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ],
            baselinePrograms: true,
        });
    });
}
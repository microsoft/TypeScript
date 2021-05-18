namespace ts.tscWatch.PersistentResolutionsTests {
    export function getFiles(outFile?: string) {
        const main: File = {
            path: `${projectRoot}/src/main.ts`,
            content: Utils.dedent`
                    import { something } from "./filePresent";
                    import { something as something1 } from "./filePresent";
                    import { something2 } from "./fileNotFound";
                    import { externalThing1 } from "externalThing";
                    import { externalThing2 } from "externalThingNotPresent";`,
        };
        const anotherFileReusingResolution: File = {
            path: `${projectRoot}/src/anotherFileReusingResolution.ts`,
            content: Utils.dedent`
                    import { something } from "./filePresent";
                    import { something2 } from "./fileNotFound";
                    import { externalThing1 } from "externalThing";
                    import { externalThing2 } from "externalThingNotPresent";`,
        };
        const filePresent: File = {
            path: `${projectRoot}/src/filePresent.ts`,
            content: `export function something() { return 10; }`,
        };
        const fileWithRef: File = {
            path: `${projectRoot}/src/fileWithRef.ts`,
            content: `/// <reference path="./types.ts"/>`,
        };
        const types: File = {
            path: `${projectRoot}/src/types.ts`,
            content: `interface SomeType {}`,
        };
        const globalMain: File = {
            path: `${projectRoot}/src/globalMain.ts`,
            content: Utils.dedent`
                    /// <reference path="./globalFilePresent.ts"/>
                    /// <reference path="./globalFileNotFound.ts"/>
                    function globalMain() { }
                `,
        };
        const globalAnotherFileWithSameReferenes: File = {
            path: `${projectRoot}/src/globalAnotherFileWithSameReferenes.ts`,
            content: Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalAnotherFileWithSameReferenes() { }
                    `,
        };
        const globalFilePresent: File = {
            path: `${projectRoot}/src/globalFilePresent.ts`,
            content: `function globalSomething() { return 10; }`,
        };
        const externalThing: File = {
            path: `${projectRoot}/src/externalThing.d.ts`,
            content: `export function externalThing1(): number;`,
        };
        const someType: File = {
            path: `${projectRoot}/node_modules/@types/someType/index.d.ts`,
            content: `export function someType(): number;`,
        };
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    module: "amd",
                    composite: true,
                    persistResolutions: true,
                    traceResolution: true,
                    outFile
                },
                include: ["src/**/*.ts"]
            }),
        };
        return { main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config };
    }

    export function getSys(outFile?: string) {
        const { main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config } = getFiles(outFile);
        return createWatchedSystem(
            [main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config, libFile],
            { currentDirectory: projectRoot });
    }

    export function getSysWithSavedResolutions(buildType: "--b" | "--p", outFile?: string) {
        const sys = getSys(outFile);
        const exit = sys.exit;
        sys.exit = noop;
        fakes.withTemporaryPatchingForBuildinfoReadWrite(sys, sys => executeCommandLine(sys, noop, [buildType, "."]));
        sys.exit = exit;
        sys.clearOutput();
        return sys;
    }

    export function getSysWithClearedResolutions(buildType: "--b" | "--p", outFile?: string) {
        const sys = getSys(outFile);
        const exit = sys.exit;
        sys.exit = noop;
        fakes.withTemporaryPatchingForBuildinfoReadWrite(sys, sys => {
            executeCommandLine(sys, noop, [buildType, "."]);
            executeCommandLine(sys, noop, [buildType, ".", "--cleanPersistedProgram"]);
        });
        sys.exit = exit;
        sys.clearOutput();
        return sys;
    }

    export const modifyGlobalMain: TscWatchCompileChange = {
        caption: "Modify globalMain file",
        change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
        timeouts: runQueuedTimeoutCallbacks,
    };
    export const addNewGlobalFile: TscWatchCompileChange = {
        caption: "Add new globalFile and update globalMain file",
        change: sys => {
            sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
            sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
            sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
        },
        timeouts: runQueuedTimeoutCallbacks,
    };
    export const writeFileNotResolvedByReferencedPath: TscWatchCompileChange = {
        caption: "Write file that could not be resolved by referenced path",
        change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
        timeouts: runQueuedTimeoutCallbacks,
    };
    export const modifyMain: TscWatchCompileChange = {
        caption: "Modify main file",
        change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
        timeouts: runQueuedTimeoutCallbacks,
    };
    export const addNewFile: TscWatchCompileChange = {
        caption: "Add new module and update main file",
        change: sys => {
            sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
            sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
        },
        timeouts: runQueuedTimeoutCallbacks,
    };
    export const writeFileNotResolved: TscWatchCompileChange = {
        caption: "Write file that could not be resolved",
        change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
        timeouts: sys => {
            sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }
    };
    export const deleteFileNotResolved: TscWatchCompileChange = {
        caption: "Delete file that could not be resolved",
        change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
        timeouts: sys => {
            sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }
    };
    export const writeExternalModuleNotResolved: TscWatchCompileChange = {
        caption: "Create external module file that could not be resolved",
        change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
        timeouts: sys => {
            sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }
    };
    export const writeExternalModuleTakingPreference: TscWatchCompileChange = {
        caption: "Write .ts file that takes preference over resolved .d.ts file",
        change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
        timeouts: sys => {
            sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }
    };
    export const deleteExternalModuleTakingPreference: TscWatchCompileChange = {
        caption: "Delete .ts file that takes preference over resolved .d.ts file",
        change: sys => sys.deleteFile(`${projectRoot}/src/externalThing.ts`),
        timeouts: sys => {
            sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }
    };
    export function installNewType(caption: string): TscWatchCompileChange {
        return {
            caption,
            change: sys => sys.ensureFileOrFolder({ path: `${projectRoot}/node_modules/@types/someType2/index.d.ts`, content: "export function someType2(): number;" }),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                sys.runQueuedTimeoutCallbacks(); // Actual update
            }
        };
    }
    export function deleteExistingType(caption: string): TscWatchCompileChange {
        return {
            caption,
            change: sys => sys.deleteFolder(`${projectRoot}/node_modules/@types/someType`, /*recursive*/ true),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                sys.runQueuedTimeoutCallbacks(); // Actual update
            }
        };
    }

    describe("unittests:: tsbuildWatch:: watchMode:: persistResolutions", () => {
        const installNewTypeWithBuild = installNewType("Install another type and program is not created because its not listed file in tsconfig");
        const deleteExistingTypeWithBuild = deleteExistingType("Delete existing type and program is not created because its not listed file in tsconfig");

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program",
            sys: getSys,
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file",
            sys: () => getSysWithSavedResolutions("--b"),
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned",
            sys: () => getSysWithClearedResolutions("--b"),
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program with outFile",
            sys: () => getSys("outFile.js"),
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file with outFile",
            sys: () => getSysWithSavedResolutions("--b", "outFile.js"),
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned with outFile",
            sys: () => getSysWithClearedResolutions("--b", "outFile.js"),
            commandLineArgs: ["--b", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithBuild,
                deleteExistingTypeWithBuild,
            ]
        });
    });
}
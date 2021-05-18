namespace ts.tscWatch.PersistentResolutionsTests {
    describe("unittests:: tsc-watch:: persistResolutions", () => {
        const installNewTypeWithProject = installNewType("Install another type picked up by program");
        const deleteExistingTypeWithProject = deleteExistingType("Delete existing type picked up by program");

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program",
            sys: getSys,
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                deleteFileNotResolved,
                writeExternalModuleNotResolved,
                writeExternalModuleTakingPreference,
                deleteExternalModuleTakingPreference,
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file",
            sys: () => getSysWithSavedResolutions("--p"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned",
            sys: () => getSysWithClearedResolutions("--p"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program with outFile",
            sys: () => getSys("outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file with outFile",
            sys: () => getSysWithSavedResolutions("--p", "outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned with outFile",
            sys: () => getSysWithClearedResolutions("--p", "outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ]
        });
    });
}
namespace ts.PersistentResolutionsTests {
    describe("unittests:: tsc:: persistResolutions::", () => {
        const cleanResolutionsWithProject = cleanResolutions("--p");
        const cleanResolutionsAgainWithProject = cleanResolutionsAgain("--p");
        const installNewTypeWithProject = installNewType("Install another type and it is not picked by program");
        const deleteExistingTypeWithProject = deleteExistingType("Delete existing type and this will trigger new program so above new type becomes part of program");

        verifyTscSerializedIncrementalEdits({
            scenario: "persistResolutions",
            subScenario: `saves resolution and uses it for new program`,
            fs: getFs,
            commandLineArgs: ["--p", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                cleanResolutionsWithProject,
                cleanResolutionsAgainWithProject,
                noChangeRun,
                modifyGlobalMain,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                cleanResolutionsWithProject,
                cleanResolutionsAgainWithProject,
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
                    ])
                },
                deleteTsBuildInfo,
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
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
                modifyGlobalMain,
                addNewGlobalFile,
                writeFileNotResolvedByReferencedPath,
                cleanResolutionsWithProject,
                cleanResolutionsAgainWithProject,
                noChangeRun,
                modifyGlobalMain,
                modifyMain,
                addNewFile,
                writeFileNotResolved,
                cleanResolutionsWithProject,
                cleanResolutionsAgainWithProject,
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
                installNewTypeWithProject,
                deleteExistingTypeWithProject,
            ],
            baselinePrograms: true,
        });
    });
}
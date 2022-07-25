namespace ts.tscWatch.cacheResolutions {
    describe("unittests:: tsbuildWatch:: watchMode:: cacheResolutions::", () => {
        describe("multi file project", () => {
            verifyTscWatchMultiFile("caching resolutions in multi file scenario", getWatchSystemWithNode16);
            verifyTscWatchMultiFile("caching resolutions in multi file scenario when already built", getWatchSystemWithNode16WithBuild);
            function verifyTscWatchMultiFile(subScenario: string, sys: () => WatchedSystem) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys,
                    commandLineArgs: ["-b", "-w", "--explainFiles"],
                    changes: [
                        {
                            caption: "modify randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify randomFileForTypeRef by adding typeRef",
                            change: sys => sys.prependFile("/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2" resolution-mode="import"/>\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write file not resolved by import and random edit",
                            change: sys => {
                                sys.writeFile("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1));
                                sys.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write file not resolved by typeRef and random edit",
                            change: sys => {
                                sys.writeFile("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3));
                                sys.appendFile("/src/project/randomFileForImport.ts", `export const z = 10;`);
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "Random edit",
                            change: sys => sys.appendFile("/src/project/randomFileForImport.ts", `export const k = 10;`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ]
                });
            }
        });

        describe("with bundle emit", () => {
            verifyTscWatchBundleEmit("caching resolutions with bundle emit", getWatchSystemWithOut);
            verifyTscWatchBundleEmit("caching resolutions with bundle emit when already built", getWatchSystemWithOutWithBuild);
            function verifyTscWatchBundleEmit(subScenario: string, sys: () => WatchedSystem) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys,
                    commandLineArgs: ["-b", "-w", "--explainFiles"],
                    changes: [
                        {
                            caption: "modify randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify randomFileForTypeRef by adding typeRef",
                            change: sys => sys.prependFile("/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2"/>\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write file not resolved by import and random edit",
                            change: sys => {
                                sys.writeFile("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1));
                                sys.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write file not resolved by typeRef and random edit",
                            change: sys => {
                                sys.ensureFileOrFolder({
                                    path: "/src/project/node_modules/pkg3/index.d.ts",
                                    content: getPkgTypeRefContent("Require", 3)
                                });
                                sys.appendFile("/src/project/randomFileForImport.ts", `export const z = 10;`);
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "Random edit",
                            change: sys => sys.appendFile("/src/project/randomFileForImport.ts", `export const k = 10;`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ]
                });
            }
        });

        describe("multi project", () => {
            verifyTscWatchMultiProject("caching resolutions in multi project scenario", getWatchSystemWithMultipleProjects);
            verifyTscWatchMultiProject("caching resolutions in multi project scenario when already built", getWatchSystemWithMultipleProjectsWithBuild);
            function verifyTscWatchMultiProject(subScenario: string, sys: () => WatchedSystem) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys,
                    commandLineArgs: ["-b", "-w", "--explainFiles", "-v"],
                    changes: [
                        {
                            caption: "modify aRandomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/aRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks();
                                sys.runQueuedTimeoutCallbacks();
                            },
                        },
                        {
                            caption: "modify bRandomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/bRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks();
                                sys.runQueuedTimeoutCallbacks();
                            },
                        },
                        {
                            caption: "modify cRandomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/cRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks();
                                sys.runQueuedTimeoutCallbacks();
                            },
                        },
                    ]
                });
            }
        });

        describe("resolution reuse from multiple places", () => {
            verifyTscWatchMultiPlaces("caching resolutions when resolution reused from multiple places", getWatchSystemWithSameResolutionFromMultiplePlaces);
            verifyTscWatchMultiPlaces("caching resolutions when resolution reused from multiple places when already built", getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild);
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario: "caching resolutions when resolution reused from multiple places first pass",
                sys: () => {
                    const sys = getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild();
                    sys.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`);
                    return sys;
                },
                commandLineArgs: ["-b", "-w", "--explainFiles"],
                changes: emptyArray
            });

            function verifyTscWatchMultiPlaces(subScenario: string, sys: () => WatchedSystem) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys,
                    commandLineArgs: ["-b", "-w", "--explainFiles"],
                    changes: [
                        {
                            caption: "modify randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify b/randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/b/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify c/ca/caa/randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import",
                            change: sys => sys.prependFile("/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ]
                });
            }
        });
    });
}
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
    });
}
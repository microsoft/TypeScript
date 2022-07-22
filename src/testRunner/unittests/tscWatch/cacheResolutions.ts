namespace ts.tscWatch.cacheResolutions {
    describe("unittests:: tsc-watch:: cacheResolutions::", () => {
        describe("multi file project", () => {
            verifyTscWatchMultiFile("caching resolutions in multi file scenario", getWatchSystemWithNode16);
            verifyTscWatchMultiFile("caching resolutions in multi file scenario when already built", getWatchSystemWithNode16WithBuild);
            function verifyTscWatchMultiFile(subScenario: string, sys: () => WatchedSystem) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys,
                    commandLineArgs: ["-w", "--explainFiles", "--extendedDiagnostics"],
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
                            caption: "write file not resolved by import",
                            change: sys => sys.writeFile("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1)),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks(); // failed lookup
                                sys.runQueuedTimeoutCallbacks(); // actual update
                            }
                        },
                        {
                            caption: "write file not resolved by typeRef",
                            change: sys => sys.writeFile("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3)),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks(); // failed lookup
                                sys.runQueuedTimeoutCallbacks(); // actual update
                            }
                        },
                        {
                            caption: "delete file with imports",
                            change: sys => sys.deleteFile("/src/project/fileWithImports.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete file with typeRefs",
                            change: sys => sys.deleteFile("/src/project/fileWithTypeRefs.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete resolved import file",
                            change: sys => sys.deleteFile("/src/project/node_modules/pkg0/import.d.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete resolved typeRef file",
                            change: sys => sys.deleteFile("/src/project/node_modules/pkg2/import.d.ts"),
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
                    commandLineArgs: ["-w", "--explainFiles", "--extendedDiagnostics"],
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
                            caption: "write file not resolved by import",
                            change: sys => sys.writeFile("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1)),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks(); // failed lookup
                                sys.runQueuedTimeoutCallbacks(); // actual update
                            }
                        },
                        {
                            caption: "write file not resolved by typeRef",
                            change: sys => sys.ensureFileOrFolder({
                                path: "/src/project/node_modules/pkg3/index.d.ts",
                                content: getPkgTypeRefContent("Require", 3)
                            }),
                            timeouts: sys => {
                                sys.runQueuedTimeoutCallbacks(); // failed lookup
                                sys.runQueuedTimeoutCallbacks(); // actual update
                            }
                        },
                        {
                            caption: "delete file with imports",
                            change: sys => sys.deleteFile("/src/project/fileWithImports.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete file with typeRefs",
                            change: sys => sys.deleteFile("/src/project/fileWithTypeRefs.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete resolved import file",
                            change: sys => sys.deleteFile("/src/project/pkg0.d.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "delete resolved typeRef file",
                            change: sys => sys.deleteFile("/src/project/node_modules/pkg2/index.d.ts"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ]
                });
            }
        });

        describe("multi project", () => {
            verifyTscWatchMultiProject("caching resolutions in multi project scenario", "/src/project/tsconfig.b.json", "bRandomFileForImport");
            verifyTscWatchMultiProject("caching resolutions in multi project scenario on project with mixed redirect options", "/src/project", "cRandomFileForImport");
            function verifyTscWatchMultiProject(subScenario: string, project: string, file: string) {
                verifyTscWatch({
                    scenario: "cacheResolutions",
                    subScenario,
                    sys: getWatchSystemWithMultipleProjectsWithBuild,
                    commandLineArgs: ["-p", project, "-w", "--explainFiles"],
                    changes: [
                        {
                            caption: `modify ${file} by adding import`,
                            change: sys => sys.prependFile(`/src/project/${file}.ts`, `export type { ImportInterface0 } from "pkg0";\n`),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ]
                });
            }
        });
    });
}
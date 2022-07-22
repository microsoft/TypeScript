import {
    TestServerHost,
} from "../virtualFileSystemWithWatch";
import {
    getPkgImportContent,
    getPkgTypeRefContent,
    getWatchSystemWithMultipleProjects,
    getWatchSystemWithMultipleProjectsWithBuild,
    getWatchSystemWithNode16,
    getWatchSystemWithNode16WithBuild,
    getWatchSystemWithOut,
    getWatchSystemWithOutWithBuild,
    getWatchSystemWithSameResolutionFromMultiplePlaces,
    getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild,
} from "../tsbuild/cacheResolutionsHelper";
import {
    verifyTscWatch,
} from "../tscWatch/helpers";

describe("unittests:: tsbuildWatch:: watchMode:: cacheResolutions::", () => {
    describe("multi file project", () => {
        verifyTscWatchMultiFile("multi file", getWatchSystemWithNode16);
        verifyTscWatchMultiFile("multi file already built", getWatchSystemWithNode16WithBuild);
        function verifyTscWatchMultiFile(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "--explainFiles"],
                baselineModulesAndTypeRefs: true,
                edits: [
                    {
                        caption: "modify randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify randomFileForTypeRef by adding typeRef",
                        edit: sys => sys.prependFile("/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2" resolution-mode="import"/>\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "write file not resolved by import and random edit",
                        edit: sys => {
                            sys.writeFile("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1));
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "write file not resolved by typeRef and random edit",
                        edit: sys => {
                            sys.writeFile("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3));
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const z = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Random edit",
                        edit: sys => sys.appendFile("/src/project/randomFileForImport.ts", `export const k = 10;`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ]
            });
        }
    });

    describe("with bundle emit", () => {
        verifyTscWatchBundleEmit("bundle emit", getWatchSystemWithOut);
        verifyTscWatchBundleEmit("bundle emit already built", getWatchSystemWithOutWithBuild);
        function verifyTscWatchBundleEmit(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "--explainFiles"],
                baselineModulesAndTypeRefs: true,
                edits: [
                    {
                        caption: "modify randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify randomFileForTypeRef by adding typeRef",
                        edit: sys => sys.prependFile("/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2"/>\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "write file not resolved by import and random edit",
                        edit: sys => {
                            sys.writeFile("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1));
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "write file not resolved by typeRef and random edit",
                        edit: sys => {
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
                        edit: sys => sys.appendFile("/src/project/randomFileForImport.ts", `export const k = 10;`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ]
            });
        }
    });

    describe("multi project", () => {
        verifyTscWatchMultiProject("multi project", getWatchSystemWithMultipleProjects);
        verifyTscWatchMultiProject("multi project already built", getWatchSystemWithMultipleProjectsWithBuild);
        function verifyTscWatchMultiProject(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "--explainFiles", "-v"],
                baselineModulesAndTypeRefs: true,
                edits: [
                    {
                        caption: "modify aRandomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/aRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                    {
                        caption: "modify bRandomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/bRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                    {
                        caption: "modify cRandomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/cRandomFileForImport.ts", `export type { ImportInterface0 } from "pkg0";\n`),
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
        verifyTscWatchMultiPlaces("multiple places", getWatchSystemWithSameResolutionFromMultiplePlaces);
        verifyTscWatchMultiPlaces("multiple places already built", getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild);
        function verifyTscWatchMultiPlaces(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "--explainFiles"],
                baselineModulesAndTypeRefs: true,
                edits: [
                    {
                        caption: "modify randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify b/randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/b/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify c/ca/caa/randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ]
            });
        }
    });
});
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
    getWatchSystemWithPackageJsonEdits,
    getWatchSystemWithPackageJsonEditsWithBuild,
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
                    {
                        caption: "modify package.json and that should re-resolve and random edit",
                        edit: sys => {
                            sys.replaceFileText("/src/project/node_modules/pkg1/package.json", "./require.js", "./require1.js");
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const y1 = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "write file not resolved by import and random edit",
                        edit: sys => {
                            sys.writeFile("/src/project/node_modules/pkg1/require1.d.ts", getPkgImportContent("Require", 1));
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const z1 = 10;`);
                        },
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
        verifyTscWatch({
            scenario: "cacheResolutions",
            subScenario: "multiple places first pass",
            sys: () => {
                const sys = getWatchSystemWithSameResolutionFromMultiplePlacesWithBuild();
                sys.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`);
                return sys;
            },
            commandLineArgs: ["-b", "-w", "--explainFiles"],
            baselineModulesAndTypeRefs: true,
        });
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
                    {
                        caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify b/randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/b/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify c/ca/caa/randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding import",
                        edit: sys => sys.prependFile("/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import",
                        edit: sys => sys.prependFile("/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "add file for unresolved import and random edit",
                        edit: sys => {
                            sys.ensureFileOrFolder({ path: "/src/project/node_modules/pkg1/index.d.ts", content: getPkgImportContent("Import", 1) });
                            sys.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ]
            });
        }
    });

    describe("packageJson edited", () => {
        verifyTscWatchPackageJsonEdits("packageJson edited", getWatchSystemWithPackageJsonEdits);
        verifyTscWatchPackageJsonEdits("packageJson edited already built", getWatchSystemWithPackageJsonEditsWithBuild);
        function verifyTscWatchPackageJsonEdits(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                commandLineArgs: ["--b", "src", "-w", "--explainFiles", "--extendedDiagnostics"],
                baselineModulesAndTypeRefs: true,
                sys,
                edits: [
                    {
                        caption: "random edit",
                        edit: sys => sys.appendFile("/src/projects/project/src/randomFile.ts", `export const y = 10;`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Modify package json file to add type module",
                        edit: sys => sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Modify package.json file to remove type module and random edit",
                        edit: sys => {
                            sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0" }));
                            sys.appendFile("/src/projects/project/src/randomFile.ts", `export const z = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Delete package.json",
                        edit: sys => sys.deleteFile(`/src/projects/project/package.json`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Add package json file with type module",
                        edit: sys => sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Delete package.json and random edit and random edit",
                        edit: sys => {
                            sys.deleteFile(`/src/projects/project/package.json`);
                            sys.appendFile("/src/projects/project/src/randomFile.ts", `export const k = 10;`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ],
            });
        }
    });
});
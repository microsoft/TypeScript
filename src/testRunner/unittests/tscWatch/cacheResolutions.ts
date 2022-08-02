import {
    getPkgImportContent,
    getPkgTypeRefContent,
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
    TestServerHost,
} from "../virtualFileSystemWithWatch";
import {
    verifyTscWatch,
} from "./helpers";

describe("unittests:: tsc-watch:: cacheResolutions::", () => {
    describe("multi file project", () => {
        verifyTscWatchMultiFile("multi file", getWatchSystemWithNode16);
        verifyTscWatchMultiFile("multi file already built", getWatchSystemWithNode16WithBuild);
        function verifyTscWatchMultiFile(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-w", "--explainFiles", "--extendedDiagnostics"],
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
                        caption: "write file not resolved by import",
                        edit: sys => sys.writeFile("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1)),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // failed lookup
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        }
                    },
                    {
                        caption: "write file not resolved by typeRef",
                        edit: sys => sys.writeFile("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3)),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // failed lookup
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        }
                    },
                    {
                        caption: "modify package.json and that should re-resolve",
                        edit: sys => sys.replaceFileText("/src/project/node_modules/pkg1/package.json", "./require.js", "./require1.js"),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // failed lookup
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        }
                    },
                    {
                        caption: "write file not resolved by import",
                        edit: sys => sys.writeFile("/src/project/node_modules/pkg1/require1.d.ts", getPkgImportContent("Require", 1)),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // failed lookup
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        }
                    },
                    {
                        caption: "delete file with imports",
                        edit: sys => sys.deleteFile("/src/project/fileWithImports.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete file with typeRefs",
                        edit: sys => sys.deleteFile("/src/project/fileWithTypeRefs.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete resolved import file",
                        edit: sys => sys.deleteFile("/src/project/node_modules/pkg0/import.d.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete resolved typeRef file",
                        edit: sys => sys.deleteFile("/src/project/node_modules/pkg2/import.d.ts"),
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
                commandLineArgs: ["-w", "--explainFiles", "--extendedDiagnostics"],
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
                        caption: "write file not resolved by import",
                        edit: sys => sys.writeFile("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1)),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // failed lookup
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        }
                    },
                    {
                        caption: "write file not resolved by typeRef",
                        edit: sys => sys.ensureFileOrFolder({
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
                        edit: sys => sys.deleteFile("/src/project/fileWithImports.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete file with typeRefs",
                        edit: sys => sys.deleteFile("/src/project/fileWithTypeRefs.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete resolved import file",
                        edit: sys => sys.deleteFile("/src/project/pkg0.d.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "delete resolved typeRef file",
                        edit: sys => sys.deleteFile("/src/project/node_modules/pkg2/index.d.ts"),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ]
            });
        }
    });

    describe("multi project", () => {
        verifyTscWatchMultiProject("multi project", "/src/project/tsconfig.b.json", "bRandomFileForImport");
        verifyTscWatchMultiProject("multi project mixed redirect options", "/src/project", "cRandomFileForImport");
        function verifyTscWatchMultiProject(subScenario: string, project: string, file: string) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys: getWatchSystemWithMultipleProjectsWithBuild,
                commandLineArgs: ["-p", project, "-w", "--explainFiles"],
                baselineModulesAndTypeRefs: true,
                edits: [
                    {
                        caption: `modify ${file} by adding import`,
                        edit: sys => sys.prependFile(`/src/project/${file}.ts`, `export type { ImportInterface0 } from "pkg0";\n`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
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
            commandLineArgs: ["-w", "--explainFiles"],
            baselineModulesAndTypeRefs: true,
        });
        function verifyTscWatchMultiPlaces(subScenario: string, sys: () => TestServerHost) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario,
                sys,
                commandLineArgs: ["-w", "--explainFiles"],
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
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
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
                commandLineArgs: ["--p", "src", "-w", "--explainFiles", "--extendedDiagnostics"],
                baselineModulesAndTypeRefs: true,
                sys,
                edits: [
                    {
                        caption: "random edit",
                        edit: sys => sys.appendFile("/src/projects/project/src/randomFile.ts", `export const y = 10;`),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                    {
                        caption: "Modify package json file to add type module",
                        edit: sys => sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                    {
                        caption: "Modify package.json file to remove type module",
                        edit: sys => sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        edit: sys => sys.deleteFile(`/src/projects/project/package.json`),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                    {
                        caption: "Add package json file with type module",
                        edit: sys => sys.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        edit: sys => sys.deleteFile(`/src/projects/project/package.json`),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // Failed lookups
                            sys.runQueuedTimeoutCallbacks(); // actual update
                        },
                    },
                ],
            });
        }
    });
});
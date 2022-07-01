import {
    TestServerHost,
} from "../virtualFileSystemWithWatch";
import {
    getPkgImportContent,
    getPkgTypeRefContent,
    getWatchSystemWithNode16,
    getWatchSystemWithNode16WithBuild,
    getWatchSystemWithOut,
    getWatchSystemWithOutWithBuild,
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
});
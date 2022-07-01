import {
    getPkgImportContent,
    getPkgTypeRefContent,
    getWatchSystemWithNode16,
    getWatchSystemWithNode16WithBuild,
    getWatchSystemWithOut,
    getWatchSystemWithOutWithBuild,
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
});
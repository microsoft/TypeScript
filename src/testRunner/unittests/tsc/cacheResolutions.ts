import * as Utils from "../../_namespaces/Utils";
import {
    createWatchedSystem,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    getFsWithNode16,
    getFsWithOut,
    getPkgImportContent,
    getPkgTypeRefContent,
} from "../tsbuild/cacheResolutionsHelper";
import {
    loadProjectFromFiles,
    noChangeRun,
    prependText,
    verifyTsc,
} from "./helpers";
import {
    solutionBuildWithBaseline,
    verifyTscWatch,
} from "../tscWatch/helpers";

describe("unittests:: tsc:: cacheResolutions::", () => {
    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "multi file",
        fs: getFsWithNode16,
        commandLineArgs: ["-p", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            noChangeRun,
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`),
            },
            {
                caption: "modify randomFileForTypeRef by adding typeRef",
                edit: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2" resolution-mode="import"/>\n`),
            },
            {
                caption: "write file not resolved by import",
                edit: fs => fs.writeFileSync("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1)),
            },
            {
                caption: "write file not resolved by typeRef",
                edit: fs => fs.writeFileSync("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3)),
            },
            {
                caption: "delete file with imports",
                edit: fs => fs.unlinkSync("/src/project/fileWithImports.ts"),
            },
            {
                caption: "delete file with typeRefs",
                edit: fs => fs.unlinkSync("/src/project/fileWithTypeRefs.ts"),
            },
            {
                caption: "delete resolved import file",
                edit: fs => fs.unlinkSync("/src/project/node_modules/pkg0/import.d.ts"),
            },
            {
                caption: "delete resolved typeRef file",
                edit: fs => fs.unlinkSync("/src/project/node_modules/pkg2/import.d.ts"),
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "bundle emit",
        fs: getFsWithOut,
        commandLineArgs: ["-p", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            noChangeRun,
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify randomFileForTypeRef by adding typeRef",
                edit: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2"/>\n`),
            },
            {
                caption: "write file not resolved by import",
                edit: fs => fs.writeFileSync("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1)),
            },
            {
                caption: "write file not resolved by typeRef",
                edit: fs => {
                    fs.mkdirpSync("/src/project/node_modules/pkg3");
                    fs.writeFileSync("/src/project/node_modules/pkg3/index.d.ts", getPkgTypeRefContent("Require", 3));
                },
            },
            {
                caption: "delete file with imports",
                edit: fs => fs.unlinkSync("/src/project/fileWithImports.ts"),
            },
            {
                caption: "delete file with typeRefs",
                edit: fs => fs.unlinkSync("/src/project/fileWithTypeRefs.ts"),
            },
            {
                caption: "delete resolved import file",
                edit: fs => fs.unlinkSync("/src/project/pkg0.d.ts"),
            },
            {
                caption: "delete resolved typeRef file",
                edit: fs => fs.unlinkSync("/src/project/node_modules/pkg2/index.d.ts"),
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "pathsBasePath",
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    paths: {
                        "*": ["./lib/*"]
                    },
                    composite: true,
                    cacheResolutions: true,
                    traceResolution: true,
                },
                files: ["main.ts", "randomFileForImport.ts"],
            }),
            "/src/project/main.ts": Utils.dedent`
                import type { ImportInterface0 } from "pkg0";
            `,
            "/src/project/randomFileForImport.ts": "export const x = 10;",
            "/src/project/lib/pkg0/index.d.ts": getPkgImportContent("Import", 0),
        }),
        commandLineArgs: ["-p", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
        ]
    });

    describe("symlinks", () => {
        function verifySymLinks(preserveSymlinks: boolean, built: boolean) {
            verifyTscWatch({
                scenario: "cacheResolutions",
                subScenario: `resolutions with symlinks${preserveSymlinks ? " with preserveSymlinks" : ""}${built ? "" : " when not built"}`,
                sys: () => {
                    const sys = createWatchedSystem({
                        "/src/project/tsconfig.json": JSON.stringify({
                            compilerOptions: {
                                composite: true,
                                cacheResolutions: true,
                                traceResolution: true,
                                preserveSymlinks,
                            },
                            files: ["main.ts", "randomFileForImport.ts"],
                        }),
                        "/src/project/main.ts": Utils.dedent`
                            import type { ImportInterface0 } from "pkg0";
                        `,
                        "/src/project/randomFileForImport.ts": "export const x = 10;",
                        "/src/project/lib/pkg0/index.d.ts": getPkgImportContent("Import", 0),
                        "/src/project/node_modules/pkg0/index.d.ts": { symLink: "/src/project/lib/pkg0/index.d.ts" },
                    });
                    sys.ensureFileOrFolder(libFile);
                    if (built) {
                        solutionBuildWithBaseline(sys, ["/src/project"]);
                        sys.clearOutput();
                        sys.prependFile("/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`);
                    }
                    return sys;
                },
                commandLineArgs: ["-p", "/src/project", "--explainFiles"],
                baselineModulesAndTypeRefs: true,
            });
        }
        verifySymLinks(/*preserveSymlinks*/ true, /*built*/ true);
        verifySymLinks(/*preserveSymlinks*/ false, /*built*/ true);
        verifySymLinks(/*preserveSymlinks*/ true, /*built*/ false);
        verifySymLinks(/*preserveSymlinks*/ false, /*built*/ false);
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "diagnostics from cache",
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    moduleResolution: "nodenext",
                    outDir: "./dist",
                    declaration: true,
                    declarationDir: "./types",
                    cacheResolutions: true,
                    traceResolution: true,
                },
            }),
            "/src/project/package.json": JSON.stringify({
                name: "@this/package",
                type: "module",
                exports: {
                    ".": {
                        default: "./dist/index.js",
                        types: "./types/index.d.ts"
                    }
                }
            }),
            "/src/project/index.ts": Utils.dedent`
                import * as me from "@this/package";
                me.thing()
                export function thing(): void {}
            `,
            "/src/project/index2.ts": Utils.dedent`
                export function thing(): void {}
            `,
            "/src/project/randomFileForImport.ts": "export const x = 10;",
        }),
        commandLineArgs: ["-p", "/src/project", "--incremental", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [{
            caption: "modify randomFileForImport by adding import",
            edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import * as me from "@this/package";\n`),
        }],
    });
});
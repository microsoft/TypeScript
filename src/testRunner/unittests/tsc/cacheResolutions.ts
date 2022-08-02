import * as Utils from "../../_namespaces/Utils";
import {
    createWatchedSystem,
    libFile,
} from "../virtualFileSystemWithWatch";
import {
    getFsWithNode16,
    getFsWithOut,
    getFsWithPackageJsonEdits,
    getFsWithSameResolutionFromMultiplePlaces,
    getPkgImportContent,
    getPkgTypeRefContent,
} from "../tsbuild/cacheResolutionsHelper";
import {
    appendText,
    loadProjectFromFiles,
    noChangeRun,
    prependText,
    replaceText,
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
                caption: "modify package.json and that should re-resolve",
                edit: fs => replaceText(fs, "/src/project/node_modules/pkg1/package.json", "./require.js", "./require1.js"),
            },
            {
                caption: "write file not resolved by import",
                edit: fs => fs.writeFileSync("/src/project/node_modules/pkg1/require1.d.ts", getPkgImportContent("Require", 1)),
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

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "multiple places",
        fs: getFsWithSameResolutionFromMultiplePlaces,
        commandLineArgs: ["-p", "/src/project", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        edits: [
            {
                caption: "modify randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify b/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/b/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify c/ca/caa/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify b/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/b/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify c/ca/caa/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding import",
                edit: fs => prependText(fs, "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
            },
            {
                caption: "modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import",
                edit: fs => prependText(fs, "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts", `import type { ImportInterface1 } from "pkg1";\n`),
            },
            {
                caption: "add file for unresolved import",
                edit: fs => {
                    fs.mkdirpSync("/src/project/node_modules/pkg1");
                    fs.writeFileSync("/src/project/node_modules/pkg1/index.d.ts", getPkgImportContent("Import", 1));
                },
            },
        ]
    });

    verifyTsc({
        scenario: "cacheResolutions",
        subScenario: "packageJson edited",
        commandLineArgs: ["--p", "/src/projects/project/src", "--explainFiles"],
        baselineModulesAndTypeRefs: true,
        fs: getFsWithPackageJsonEdits,
        edits: [
            {
                caption: "random edit",
                edit: fs => appendText(fs, "/src/projects/project/src/randomFile.ts", `export const y = 10;`),
            },
            {
                caption: "Modify package json file to add type module",
                edit: fs => fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
            },
            {
                caption: "Modify package.json file to remove type module",
                edit: fs => fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
            },
            {
                caption: "Delete package.json",
                edit: fs => fs.unlinkSync(`/src/projects/project/package.json`),
                discrepancyExplanation: () => [
                    `Buildinfo is not re-written so it has package.json map from before in incremental and no package.json map in clean build`
                ]
            },
            {
                caption: "Add package json file with type module",
                edit: fs => fs.writeFileSync(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" })),
            },
            {
                caption: "Delete package.json and random edit",
                edit: fs => fs.unlinkSync(`/src/projects/project/package.json`)
            },
        ],
    });
});
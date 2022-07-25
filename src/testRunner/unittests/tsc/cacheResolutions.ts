namespace ts.tscWatch.cacheResolutions {
    describe("unittests:: tsc:: cacheResolutions::", () => {
        verifyTscWithEdits({
            scenario: "cacheResolutions",
            subScenario: "caching resolutions in multi file scenario",
            fs: getFsWithNode16,
            commandLineArgs: ["-p", "/src/project", "--explainFiles"],
            edits: [
                noChangeRun,
                {
                    subScenario: "modify randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`),
                },
                {
                    subScenario: "modify randomFileForTypeRef by adding typeRef",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2" resolution-mode="import"/>\n`),
                },
                {
                    subScenario: "write file not resolved by import",
                    modifyFs: fs => fs.writeFileSync("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1)),
                },
                {
                    subScenario: "write file not resolved by typeRef",
                    modifyFs: fs => fs.writeFileSync("/src/project/node_modules/pkg3/require.d.ts", getPkgTypeRefContent("Require", 3)),
                },
                {
                    subScenario: "delete file with imports",
                    modifyFs: fs => fs.unlinkSync("/src/project/fileWithImports.ts"),
                },
                {
                    subScenario: "delete file with typeRefs",
                    modifyFs: fs => fs.unlinkSync("/src/project/fileWithTypeRefs.ts"),
                },
                {
                    subScenario: "delete resolved import file",
                    modifyFs: fs => fs.unlinkSync("/src/project/node_modules/pkg0/import.d.ts"),
                },
                {
                    subScenario: "delete resolved typeRef file",
                    modifyFs: fs => fs.unlinkSync("/src/project/node_modules/pkg2/import.d.ts"),
                },
            ]
        });

        verifyTscWithEdits({
            scenario: "cacheResolutions",
            subScenario: "caching resolutions with bundle emit",
            fs: getFsWithOut,
            commandLineArgs: ["-p", "/src/project", "--explainFiles"],
            edits: [
                noChangeRun,
                {
                    subScenario: "modify randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                },
                {
                    subScenario: "modify randomFileForTypeRef by adding typeRef",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForTypeRef.ts", `/// <reference types="pkg2"/>\n`),
                },
                {
                    subScenario: "write file not resolved by import",
                    modifyFs: fs => fs.writeFileSync("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1)),
                },
                {
                    subScenario: "write file not resolved by typeRef",
                    modifyFs: fs => {
                        fs.mkdirpSync("/src/project/node_modules/pkg3");
                        fs.writeFileSync("/src/project/node_modules/pkg3/index.d.ts", getPkgTypeRefContent("Require", 3));
                    },
                },
                {
                    subScenario: "delete file with imports",
                    modifyFs: fs => fs.unlinkSync("/src/project/fileWithImports.ts"),
                },
                {
                    subScenario: "delete file with typeRefs",
                    modifyFs: fs => fs.unlinkSync("/src/project/fileWithTypeRefs.ts"),
                },
                {
                    subScenario: "delete resolved import file",
                    modifyFs: fs => fs.unlinkSync("/src/project/pkg0.d.ts"),
                },
                {
                    subScenario: "delete resolved typeRef file",
                    modifyFs: fs => fs.unlinkSync("/src/project/node_modules/pkg2/index.d.ts"),
                },
            ]
        });

        verifyTscWithEdits({
            scenario: "cacheResolutions",
            subScenario: "caching resolutions with pathsBasePath",
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
            edits: [
                {
                    subScenario: "modify randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                },
            ]
        });

        verifyTscWithEdits({
            scenario: "cacheResolutions",
            subScenario: "diagnostics from cache",
            fs: () => loadProjectFromFiles({
                "/src/project/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        moduleResolution: "nodenext",
                        outDir: "./dist",
                        declaration:true,
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
            edits: [
                {
                    subScenario: "modify randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import * as me from "@this/package";\n`),
                }
            ]
        });

        verifyTscWithEdits({
            scenario: "cacheResolutions",
            subScenario: "caching resolutions when resolution reused from multiple places",
            fs: getFsWithSameResolutionFromMultiplePlaces,
            commandLineArgs: ["-p", "/src/project", "--explainFiles"],
            edits: [
                {
                    subScenario: "modify randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                },
                {
                    subScenario: "modify b/randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/b/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                },
                {
                    subScenario: "modify c/ca/caa/randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/c/ca/caa/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                },
                {
                    subScenario: "modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                    discrepancyExplanation: () => [
                        `Incremental is currently not reusing resolution so tsbuildinfo has two same resolutions instead of one TODO: (shkamat)`
                    ]
                },
                {
                    subScenario: "modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import",
                    modifyFs: fs => prependText(fs, "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`),
                    discrepancyExplanation: () => [
                        `Incremental is currently not reusing resolution so tsbuildinfo has two same resolutions instead of one TODO: (shkamat)`
                    ]
                },
            ]
        });
    });
}
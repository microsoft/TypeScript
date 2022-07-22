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
    });
}
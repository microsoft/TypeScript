namespace ts.tscWatch {
    describe("unittests:: tsbuild:: moduleResolution:: handles the modules and options from referenced project correctly", () => {
        function sys(optionsToExtend?: CompilerOptions) {
            return createWatchedSystem([
                {
                    path: `${projectRoot}/packages/pkg1/index.ts`,
                    content: Utils.dedent`
                    import type { TheNum } from 'pkg2'
                    export const theNum: TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { outDir: "build", ...optionsToExtend },
                        references: [{ path: "../pkg2" }]
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/const.ts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from 'const';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            baseUrl: ".",
                            ...optionsToExtend
                        }
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/package.json`,
                    content: JSON.stringify({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                    })
                },
                {
                    path: `${projectRoot}/node_modules/pkg2`,
                    symLink: `${projectRoot}/packages/pkg2`,
                },
                libFile
            ], { currentDirectory: projectRoot });
        }

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `resolves specifier in output declaration file from referenced project correctly`,
            sys,
            commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
            changes: emptyArray
        });

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `resolves specifier in output declaration file from referenced project correctly with preserveSymlinks`,
            sys: () => sys({ preserveSymlinks: true }),
            commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
            changes: emptyArray
        });

        verifyTsc({
            scenario: "moduleResolution",
            subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
            fs: () => loadProjectFromFiles({
                "/src/packages/pkg1_index.ts": `export const theNum: TheNum = "type1";`,
                "/src/packages/pkg1.tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot1"] },
                    files: ["./pkg1_index.ts"]
                }),
                "/src/packages/typeroot1/sometype/index.d.ts": Utils.dedent`declare type TheNum = "type1";`,
                "/src/packages/pkg2_index.ts": `export const theNum: TheNum2 = "type2";`,
                "/src/packages/pkg2.tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot2"] },
                    files: ["./pkg2_index.ts"]
                }),
                "/src/packages/typeroot2/sometype/index.d.ts": Utils.dedent`declare type TheNum2 = "type2";`,
            }),
            commandLineArgs: ["-b", "/src/packages/pkg1.tsconfig.json", "/src/packages/pkg2.tsconfig.json", "--verbose", "--traceResolution"],
        });
    });
}

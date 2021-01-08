namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and error reporting", () => {
        const dependecyLocation = `${tscWatch.projectRoot}/dependency`;
        const usageLocation = `${tscWatch.projectRoot}/usage`;


        interface VerifyUsageAndDependency {
            allFiles: readonly [File, File, File, File]; // dependencyTs, dependencyConfig, usageTs, usageConfig
            usageDiagnostics(): GetErrDiagnostics;
            dependencyDiagnostics(): GetErrDiagnostics;

        }
        function verifyUsageAndDependency({ allFiles, usageDiagnostics, dependencyDiagnostics }: VerifyUsageAndDependency) {
            const [dependencyTs, dependencyConfig, usageTs, usageConfig] = allFiles;
            function usageProjectDiagnostics(): GetErrForProjectDiagnostics {
                return {
                    project: usageTs.path,
                    errors: [
                        usageDiagnostics(),
                        emptyDiagnostics(dependencyTs)
                    ]
                };
            }

            function dependencyProjectDiagnostics(): GetErrForProjectDiagnostics {
                return {
                    project: dependencyTs.path,
                    errors: [
                        dependencyDiagnostics()
                    ]
                };
            }

            function usageConfigDiag(): server.ConfigFileDiagEvent["data"] {
                return {
                    triggerFile: usageTs.path,
                    configFileName: usageConfig.path,
                    diagnostics: emptyArray
                };
            }

            function dependencyConfigDiag(): server.ConfigFileDiagEvent["data"] {
                return {
                    triggerFile: dependencyTs.path,
                    configFileName: dependencyConfig.path,
                    diagnostics: emptyArray
                };
            }

            describe("when dependency project is not open", () => {
                verifyGetErrScenario({
                    allFiles: () => allFiles,
                    openFiles: () => [usageTs],
                    expectedGetErr: () => [
                        usageDiagnostics()
                    ],
                    expectedGetErrForProject: () => [
                        usageProjectDiagnostics(),
                        {
                            project: dependencyTs.path,
                            errors: [
                                emptyDiagnostics(dependencyTs),
                                usageDiagnostics()
                            ]
                        }
                    ],
                    expectedSyncDiagnostics: () => [
                        // Without project
                        usageDiagnostics(),
                        emptyDiagnostics(dependencyTs),
                        // With project
                        syncDiagnostics(usageDiagnostics(), usageConfig.path),
                        syncDiagnostics(emptyDiagnostics(dependencyTs), usageConfig.path),
                    ],
                    expectedConfigFileDiagEvents: () => [
                        usageConfigDiag()
                    ],
                });
            });

            describe("when the depedency file is open", () => {
                verifyGetErrScenario({
                    allFiles: () => allFiles,
                    openFiles: () => [usageTs, dependencyTs],
                    expectedGetErr: () => [
                        usageDiagnostics(),
                        dependencyDiagnostics(),
                    ],
                    expectedGetErrForProject: () => [
                        usageProjectDiagnostics(),
                        dependencyProjectDiagnostics()
                    ],
                    expectedSyncDiagnostics: () => [
                        // Without project
                        usageDiagnostics(),
                        dependencyDiagnostics(),
                        // With project
                        syncDiagnostics(usageDiagnostics(), usageConfig.path),
                        syncDiagnostics(emptyDiagnostics(dependencyTs), usageConfig.path),
                        syncDiagnostics(dependencyDiagnostics(), dependencyConfig.path),
                    ],
                    expectedConfigFileDiagEvents: () => [
                        usageConfigDiag(),
                        dependencyConfigDiag()
                    ],
                });
            });
        }

        describe("with module scenario", () => {
            const dependencyTs: File = {
                path: `${dependecyLocation}/fns.ts`,
                content: `export function fn1() { }
export function fn2() { }
// Introduce error for fnErr import in main
// export function fnErr() { }
// Error in dependency ts file
export let x: string = 10;`
            };
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, declarationDir: "../decls" } })
            };
            const usageTs: File = {
                path: `${usageLocation}/usage.ts`,
                content: `import {
    fn1,
    fn2,
    fnErr
} from '../decls/fns'
fn1();
fn2();
fnErr();
`
            };
            const usageConfig: File = {
                path: `${usageLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true },
                    references: [{ path: "../dependency" }]
                })
            };
            function usageDiagnostics(): GetErrDiagnostics {
                return {
                    file: usageTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 4, offset: 5 },
                            { line: 4, offset: 10 },
                            Diagnostics.Module_0_has_no_exported_member_1,
                            [`"../decls/fns"`, "fnErr"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            function dependencyDiagnostics(): GetErrDiagnostics {
                return {
                    file: dependencyTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 6, offset: 12 },
                            { line: 6, offset: 13 },
                            Diagnostics.Type_0_is_not_assignable_to_type_1,
                            ["number", "string"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            verifyUsageAndDependency({
                allFiles: [dependencyTs, dependencyConfig, usageTs, usageConfig],
                usageDiagnostics,
                dependencyDiagnostics
            });
        });

        describe("with non module --out", () => {
            const dependencyTs: File = {
                path: `${dependecyLocation}/fns.ts`,
                content: `function fn1() { }
function fn2() { }
// Introduce error for fnErr import in main
// function fnErr() { }
// Error in dependency ts file
let x: string = 10;`
            };
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, outFile: "../dependency.js" } })
            };
            const usageTs: File = {
                path: `${usageLocation}/usage.ts`,
                content: `fn1();
fn2();
fnErr();
`
            };
            const usageConfig: File = {
                path: `${usageLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, outFile: "../usage.js" },
                    references: [{ path: "../dependency" }]
                })
            };
            function usageDiagnostics(): GetErrDiagnostics {
                return {
                    file: usageTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 3, offset: 1 },
                            { line: 3, offset: 6 },
                            Diagnostics.Cannot_find_name_0,
                            ["fnErr"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            function dependencyDiagnostics(): GetErrDiagnostics {
                return {
                    file: dependencyTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 6, offset: 5 },
                            { line: 6, offset: 6 },
                            Diagnostics.Type_0_is_not_assignable_to_type_1,
                            ["number", "string"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            verifyUsageAndDependency({
                allFiles: [dependencyTs, dependencyConfig, usageTs, usageConfig],
                usageDiagnostics,
                dependencyDiagnostics
            });
        });
    });
}

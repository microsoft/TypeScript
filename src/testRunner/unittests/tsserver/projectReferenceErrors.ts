import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: with project references and error reporting", () => {
    const dependecyLocation = `${ts.tscWatch.projectRoot}/dependency`;
    const usageLocation = `${ts.tscWatch.projectRoot}/usage`;

    function verifyUsageAndDependency(scenario: string, dependencyTs: ts.projectSystem.File, dependencyConfig: ts.projectSystem.File, usageTs: ts.projectSystem.File, usageConfig: ts.projectSystem.File) {
        function usageProjectDiagnostics(): ts.projectSystem.GetErrForProjectDiagnostics {
            return { project: usageTs, files: [usageTs, dependencyTs] };
        }

        function dependencyProjectDiagnostics(): ts.projectSystem.GetErrForProjectDiagnostics {
            return { project: dependencyTs, files: [dependencyTs] };
        }

        describe("when dependency project is not open", () => {
            ts.projectSystem.verifyGetErrScenario({
                scenario: "projectReferenceErrors",
                subScenario: `${scenario} when dependency project is not open`,
                allFiles: () => [dependencyTs, dependencyConfig, usageTs, usageConfig],
                openFiles: () => [usageTs],
                getErrRequest: () => [usageTs],
                getErrForProjectRequest: () => [
                    usageProjectDiagnostics(),
                    {
                        project: dependencyTs,
                        files: [dependencyTs, usageTs]
                    }
                ],
                syncDiagnostics: () => [
                    // Without project
                    { file: usageTs },
                    { file: dependencyTs },
                    // With project
                    { file: usageTs, project: usageConfig },
                    { file: dependencyTs, project: usageConfig },
                ],
            });
        });

        describe("when the depedency file is open", () => {
            ts.projectSystem.verifyGetErrScenario({
                scenario: "projectReferenceErrors",
                subScenario: `${scenario} when the depedency file is open`,
                allFiles: () => [dependencyTs, dependencyConfig, usageTs, usageConfig],
                openFiles: () => [usageTs, dependencyTs],
                getErrRequest: () => [usageTs, dependencyTs],
                getErrForProjectRequest: () => [
                    usageProjectDiagnostics(),
                    dependencyProjectDiagnostics()
                ],
                syncDiagnostics: () => [
                    // Without project
                    { file: usageTs },
                    { file: dependencyTs },
                    // With project
                    { file: usageTs, project: usageConfig },
                    { file: dependencyTs, project: usageConfig },
                    { file: dependencyTs, project: dependencyConfig },
                ],
            });
        });
    }

    describe("with module scenario", () => {
        const dependencyTs: ts.projectSystem.File = {
            path: `${dependecyLocation}/fns.ts`,
            content: `export function fn1() { }
export function fn2() { }
// Introduce error for fnErr import in main
// export function fnErr() { }
// Error in dependency ts file
export let x: string = 10;`
        };
        const dependencyConfig: ts.projectSystem.File = {
            path: `${dependecyLocation}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { composite: true, declarationDir: "../decls" } })
        };
        const usageTs: ts.projectSystem.File = {
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
        const usageConfig: ts.projectSystem.File = {
            path: `${usageLocation}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { composite: true },
                references: [{ path: "../dependency" }]
            })
        };
        verifyUsageAndDependency("with module scenario", dependencyTs, dependencyConfig, usageTs, usageConfig);
    });

    describe("with non module --out", () => {
        const dependencyTs: ts.projectSystem.File = {
            path: `${dependecyLocation}/fns.ts`,
            content: `function fn1() { }
function fn2() { }
// Introduce error for fnErr import in main
// function fnErr() { }
// Error in dependency ts file
let x: string = 10;`
        };
        const dependencyConfig: ts.projectSystem.File = {
            path: `${dependecyLocation}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { composite: true, outFile: "../dependency.js" } })
        };
        const usageTs: ts.projectSystem.File = {
            path: `${usageLocation}/usage.ts`,
            content: `fn1();
fn2();
fnErr();
`
        };
        const usageConfig: ts.projectSystem.File = {
            path: `${usageLocation}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { composite: true, outFile: "../usage.js" },
                references: [{ path: "../dependency" }]
            })
        };
        verifyUsageAndDependency("with non module", dependencyTs, dependencyConfig, usageTs, usageConfig);
    });
});

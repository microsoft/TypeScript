import {
    jsonToReadableText,
} from "../helpers";
import {
    GetErrForProjectDiagnostics,
    verifyGetErrScenario,
} from "../helpers/tsserver";
import {
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: with project references and error reporting", () => {
    const dependecyLocation = `/user/username/projects/myproject/dependency`;
    const usageLocation = `/user/username/projects/myproject/usage`;

    function verifyUsageAndDependency(scenario: string, dependencyTs: File, dependencyConfig: File, usageTs: File, usageConfig: File) {
        function usageProjectDiagnostics(): GetErrForProjectDiagnostics {
            return { project: usageTs, files: [usageTs, dependencyTs] };
        }

        function dependencyProjectDiagnostics(): GetErrForProjectDiagnostics {
            return { project: dependencyTs, files: [dependencyTs] };
        }

        describe("when dependency project is not open", () => {
            verifyGetErrScenario({
                scenario: "projectReferenceErrors",
                subScenario: `${scenario} when dependency project is not open`,
                allFiles: () => [dependencyTs, dependencyConfig, usageTs, usageConfig],
                openFiles: () => [usageTs],
                getErrRequest: () => [usageTs],
                getErrForProjectRequest: () => [
                    usageProjectDiagnostics(),
                    {
                        project: dependencyTs,
                        files: [dependencyTs, usageTs],
                    },
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
            verifyGetErrScenario({
                scenario: "projectReferenceErrors",
                subScenario: `${scenario} when the depedency file is open`,
                allFiles: () => [dependencyTs, dependencyConfig, usageTs, usageConfig],
                openFiles: () => [usageTs, dependencyTs],
                getErrRequest: () => [usageTs, dependencyTs],
                getErrForProjectRequest: () => [
                    usageProjectDiagnostics(),
                    dependencyProjectDiagnostics(),
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
        const dependencyTs: File = {
            path: `${dependecyLocation}/fns.ts`,
            content: `export function fn1() { }
export function fn2() { }
// Introduce error for fnErr import in main
// export function fnErr() { }
// Error in dependency ts file
export let x: string = 10;`,
        };
        const dependencyConfig: File = {
            path: `${dependecyLocation}/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { composite: true, declarationDir: "../decls" } }),
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
`,
        };
        const usageConfig: File = {
            path: `${usageLocation}/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: { composite: true },
                references: [{ path: "../dependency" }],
            }),
        };
        verifyUsageAndDependency("with module scenario", dependencyTs, dependencyConfig, usageTs, usageConfig);
    });

    describe("with non module --out", () => {
        const dependencyTs: File = {
            path: `${dependecyLocation}/fns.ts`,
            content: `function fn1() { }
function fn2() { }
// Introduce error for fnErr import in main
// function fnErr() { }
// Error in dependency ts file
let x: string = 10;`,
        };
        const dependencyConfig: File = {
            path: `${dependecyLocation}/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { composite: true, outFile: "../dependency.js" } }),
        };
        const usageTs: File = {
            path: `${usageLocation}/usage.ts`,
            content: `fn1();
fn2();
fnErr();
`,
        };
        const usageConfig: File = {
            path: `${usageLocation}/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: { composite: true, outFile: "../usage.js" },
                references: [{ path: "../dependency" }],
            }),
        };
        verifyUsageAndDependency("with non module", dependencyTs, dependencyConfig, usageTs, usageConfig);
    });
});

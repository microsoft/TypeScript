namespace ts {
    describe("unittests:: tsc:: commandLineOverridesConfig::", () => {
        verifyTsc({
            scenario: "commandLineOverridesConfig",
            subScenario: "files passed on commandline override default tsconfig",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/src/file.ts": "export const y: string = undefined;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "strict": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }, /*libContent*/ undefined, "/src/project/"),
            commandLineArgs: ["src/main.ts"],
            environmentVariables: {},
        });

        verifyTsc({
            scenario: "commandLineOverridesConfig",
            subScenario: "compiler options passed on commandline override default tsconfig",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/src/file.ts": "export const y: string = undefined;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "strict": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }, /*libContent*/ undefined, "/src/project/"),
            commandLineArgs: ["--strict", "false"],
            environmentVariables: {},
        });

        verifyTsc({
            scenario: "commandLineOverridesConfig",
            subScenario: "files passed on commandline override passed tsconfig",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/src/file.ts": "export const y: string = undefined;",
                "/src/project/tsconfig.new.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "strict": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }, /*libContent*/ undefined, "/src/project/"),
            commandLineArgs: ["-p", "tsconfig.new.json", "src/main.ts"],
            environmentVariables: {},
        });

        verifyTsc({
            scenario: "commandLineOverridesConfig",
            subScenario: "compiler options passed on commandline override passed tsconfig",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/src/file.ts": "export const y: string = undefined;",
                "/src/project/tsconfig.new.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "strict": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }, /*libContent*/ undefined, "/src/project/"),
            commandLineArgs: ["-p", "tsconfig.new.json", "--strict", "false"],
            environmentVariables: {},
        });

        verifyTsc({
            scenario: "commandLineOverridesConfig",
            subScenario: "-p null disables config",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/src/file.ts": "export const y: string = undefined;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "strict": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }, /*libContent*/ undefined, "/src/project/"),
            commandLineArgs: ["-p", "null", "src/file.ts"],
            environmentVariables: {},
        });
    });
}

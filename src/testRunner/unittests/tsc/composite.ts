namespace ts {
    describe("unittests:: tsc:: composite::", () => {
        verifyTsc({
            scenario: "composite",
            subScenario: "when setting composite false on command line",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }),
            commandLineArgs: ["--composite", "false", "--p", "src/project"],
        });

        verifyTsc({
            scenario: "composite",
            subScenario: "when setting composite undefined on command line",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }),
            commandLineArgs: ["--composite", "undefined", "--p", "src/project"],
        });

        verifyTsc({
            scenario: "composite",
            subScenario: "when setting composite false on command line but has tsbuild info in config",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }),
            commandLineArgs: ["--composite", "false", "--p", "src/project"],
        });

        verifyTsc({
            scenario: "composite",
            subScenario: "when setting composite false and tsbuildinfo empty string on command line but has tsbuild info in config",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }),
            commandLineArgs: ["--composite", "false", "--p", "src/project", "--tsBuildInfoFile", "undefined"],
        });
    });
}

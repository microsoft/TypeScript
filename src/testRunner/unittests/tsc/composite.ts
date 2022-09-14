namespace ts {
describe("unittests:: tsc:: composite::", () => {
    ts.verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "composite": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
        }),
        commandLineArgs: ["--composite", "false", "--p", "src/project"],
    });

    ts.verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite null on command line",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "composite": true,
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
        }),
        commandLineArgs: ["--composite", "null", "--p", "src/project"],
    });

    ts.verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line but has tsbuild info in config",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "composite": true,
                            "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
        }),
        commandLineArgs: ["--composite", "false", "--p", "src/project"],
    });

    ts.verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false and tsbuildinfo as null on command line but has tsbuild info in config",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                            "composite": true,
                            "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
        }),
        commandLineArgs: ["--composite", "false", "--p", "src/project", "--tsBuildInfoFile", "null"],
    });
});
}

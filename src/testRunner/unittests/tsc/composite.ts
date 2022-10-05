import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

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

    ts.verifyTscWithEdits({
        scenario: "composite",
        subScenario: "converting to modules",
        fs: () => ts.loadProjectFromFiles({
            "/src/project/src/main.ts": "const x = 10;",
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "none",
                    composite: true,
                },
            }),
        }),
        commandLineArgs: ["-p", "/src/project"],
        edits: [
            {
                subScenario: "convert to modules",
                modifyFs: fs => ts.replaceText(fs, "/src/project/tsconfig.json", "none", "es2015"),
            }
        ]
    });
});

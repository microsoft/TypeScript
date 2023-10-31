import * as Utils from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsc:: composite::", () => {
    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line",
        fs: () =>
            loadProjectFromFiles({
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

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite null on command line",
        fs: () =>
            loadProjectFromFiles({
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

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line but has tsbuild info in config",
        fs: () =>
            loadProjectFromFiles({
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

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false and tsbuildinfo as null on command line but has tsbuild info in config",
        fs: () =>
            loadProjectFromFiles({
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

    verifyTsc({
        scenario: "composite",
        subScenario: "converting to modules",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/src/main.ts": "const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                }),
            }),
        commandLineArgs: ["-p", "/src/project"],
        edits: [
            {
                caption: "convert to modules",
                edit: fs => replaceText(fs, "/src/project/tsconfig.json", "none", "es2015"),
            },
        ],
    });
});

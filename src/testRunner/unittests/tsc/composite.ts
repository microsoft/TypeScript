import * as Utils from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import {
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs.js";

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

    verifyTsc({
        scenario: "composite",
        subScenario: "synthetic jsx import of ESM module from CJS module no crash no jsx element",
        fs: () =>
            loadProjectFromFiles({
                "/src/main.ts": "export default 42;",
                "/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        module: "Node16",
                        jsx: "react-jsx",
                        jsxImportSource: "solid-js",
                    },
                }),
                "/node_modules/solid-js/package.json": jsonToReadableText({
                    name: "solid-js",
                    type: "module",
                }),
                "/node_modules/solid-js/jsx-runtime.d.ts": Utils.dedent`
                    export namespace JSX {
                        type IntrinsicElements = { div: {}; };
                    }
                `,
            }),
        commandLineArgs: [],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "synthetic jsx import of ESM module from CJS module error on jsx element",
        fs: () =>
            loadProjectFromFiles({
                "/src/main.tsx": "export default <div/>;",
                "/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        module: "Node16",
                        jsx: "react-jsx",
                        jsxImportSource: "solid-js",
                    },
                }),
                "/node_modules/solid-js/package.json": jsonToReadableText({
                    name: "solid-js",
                    type: "module",
                }),
                "/node_modules/solid-js/jsx-runtime.d.ts": Utils.dedent`
                    export namespace JSX {
                        type IntrinsicElements = { div: {}; };
                    }
                `,
            }),
        commandLineArgs: [],
    });
});

import { emptyArray } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: composite::", () => {
    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "commonjs",
                        composite: true,
                    },
                    include: [
                        "src/**/*.ts",
                    ],
                }),
            }),
        commandLineArgs: ["--composite", "false"],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite null on command line",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "commonjs",
                        composite: true,
                    },
                    include: [
                        "src/**/*.ts",
                    ],
                }),
            }),
        commandLineArgs: ["--composite", "null"],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false on command line but has tsbuild info in config",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "commonjs",
                        composite: true,
                        tsBuildInfoFile: "tsconfig.json.tsbuildinfo",
                    },
                    include: [
                        "src/**/*.ts",
                    ],
                }),
            }),
        commandLineArgs: ["--composite", "false"],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "when setting composite false and tsbuildinfo as null on command line but has tsbuild info in config",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "commonjs",
                        composite: true,
                        tsBuildInfoFile: "tsconfig.json.tsbuildinfo",
                    },
                    include: [
                        "src/**/*.ts",
                    ],
                }),
            }),
        commandLineArgs: ["--composite", "false", "--tsBuildInfoFile", "null"],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "converting to modules",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                }),
            }),
        commandLineArgs: [],
        edits: [
            {
                caption: "convert to modules",
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", "none", "es2015"),
            },
        ],
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "synthetic jsx import of ESM module from CJS module no crash no jsx element",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/projects/project/src/main.ts": "export default 42;",
                "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        module: "Node16",
                        jsx: "react-jsx",
                        jsxImportSource: "solid-js",
                    },
                }),
                "/home/src/projects/project/node_modules/solid-js/package.json": jsonToReadableText({
                    name: "solid-js",
                    type: "module",
                }),
                "/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts": dedent`
                    export namespace JSX {
                        type IntrinsicElements = { div: {}; };
                    }
                `,
            }, { currentDirectory: "/home/src/projects/project" }),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "composite",
        subScenario: "synthetic jsx import of ESM module from CJS module error on jsx element",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/projects/project/src/main.tsx": "export default <div/>;",
                "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        module: "Node16",
                        jsx: "react-jsx",
                        jsxImportSource: "solid-js",
                    },
                }),
                "/home/src/projects/project/node_modules/solid-js/package.json": jsonToReadableText({
                    name: "solid-js",
                    type: "module",
                }),
                "/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts": dedent`
                    export namespace JSX {
                        type IntrinsicElements = { div: {}; };
                    }
                `,
            }, { currentDirectory: "/home/src/projects/project" }),
        commandLineArgs: emptyArray,
    });
});

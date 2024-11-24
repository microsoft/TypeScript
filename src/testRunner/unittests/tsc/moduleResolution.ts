import {
    emptyArray,
    ModuleKind,
    ScriptTarget,
} from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyAlternateResultScenario } from "../helpers/alternateResult.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: moduleResolution::", () => {
    verifyAlternateResultScenario(
        /*forTsserver*/ false,
        (subScenario, sys, edits) =>
            verifyTsc({
                scenario: "moduleResolution",
                subScenario,
                sys,
                commandLineArgs: emptyArray,
                baselinePrograms: true,
                edits: edits(),
            }),
    );

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "pnpm style layout",
        sys: () =>
            TestServerHost.createWatchedSystem({
                // button@0.0.1
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts": dedent`
                    export interface Button {
                        a: number;
                        b: number;
                    }
                    export function createButton(): Button {
                        return {
                            a: 0,
                            b: 1,
                        };
                    }
                `,
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json": jsonToReadableText({
                    name: "@component-type-checker/button",
                    version: "0.0.1",
                    main: "./src/index.ts",
                }),

                // button@0.0.2
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts": dedent`
                    export interface Button {
                        a: number;
                        c: number;
                    }
                    export function createButton(): Button {
                        return {
                            a: 0,
                            c: 2,
                        };
                    }
                `,
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json": jsonToReadableText({
                    name: "@component-type-checker/button",
                    version: "0.0.2",
                    main: "./src/index.ts",
                }),

                // @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button",
                },
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts": dedent`
                    export { createButton, Button } from "@component-type-checker/button";
                `,
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json": jsonToReadableText({
                    name: "@component-type-checker/components",
                    version: "0.0.1",
                    main: "./src/index.ts",
                    peerDependencies: {
                        "@component-type-checker/button": "*",
                    },
                    devDependencies: {
                        "@component-type-checker/button": "0.0.2",
                    },
                }),

                // @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button",
                },
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts": dedent`
                    export { createButton, Button } from "@component-type-checker/button";
                `,
                "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json": jsonToReadableText({
                    name: "@component-type-checker/components",
                    version: "0.0.1",
                    main: "./src/index.ts",
                    peerDependencies: {
                        "@component-type-checker/button": "*",
                    },
                    devDependencies: {
                        "@component-type-checker/button": "0.0.2",
                    },
                }),

                // sdk => @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1
                "/home/src/projects/component-type-checker/packages/sdk/src/index.ts": dedent`
                    export { Button, createButton } from "@component-type-checker/components";
                    export const VERSION = "0.0.2";
                `,
                "/home/src/projects/component-type-checker/packages/sdk/package.json": jsonToReadableText({
                    name: "@component-type-checker/sdk1",
                    version: "0.0.2",
                    main: "./src/index.ts",
                    dependencies: {
                        "@component-type-checker/components": "0.0.1",
                        "@component-type-checker/button": "0.0.1",
                    },
                }),
                "/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/button": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button",
                },
                "/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components",
                },

                // app => @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2
                "/home/src/projects/component-type-checker/packages/app/src/app.tsx": dedent`
                    import { VERSION } from "@component-type-checker/sdk";
                    import { Button } from "@component-type-checker/components";
                    import { createButton } from "@component-type-checker/button";
                    const button: Button = createButton();
                `,
                "/home/src/projects/component-type-checker/packages/app/package.json": jsonToReadableText({
                    name: "app",
                    version: "1.0.0",
                    dependencies: {
                        "@component-type-checker/button": "0.0.2",
                        "@component-type-checker/components": "0.0.1",
                        "@component-type-checker/sdk": "0.0.2",
                    },
                }),
                "/home/src/projects/component-type-checker/packages/app/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "esnext",
                        lib: ["ES5"],
                        moduleResolution: "node",
                        baseUrl: ".",
                        outDir: "dist",
                    },
                    include: ["src"],
                }),
                "/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button",
                },
                "/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components": {
                    symLink: "/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components",
                },
                "/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk": {
                    symLink: "/home/src/projects/component-type-checker/packages/sdk",
                },
            }, { currentDirectory: "/home/src/projects/component-type-checker/packages/app" }),
        commandLineArgs: ["--traceResolution", "--explainFiles"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "package json scope",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: compilerOptionsToConfigJson({
                        target: ScriptTarget.ES2016,
                        composite: true,
                        module: ModuleKind.Node16,
                        traceResolution: true,
                    }),
                    files: [
                        "main.ts",
                        "fileA.ts",
                        "fileB.mts",
                    ],
                }),
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/src/fileA.ts": dedent`
                    import { foo } from "./fileB.mjs";
                    foo();
                `,
                "/home/src/workspaces/project/src/fileB.mts": "export function foo() {}",
                "/home/src/workspaces/project/package.json": jsonToReadableText({ name: "app", version: "1.0.0" }),
            }),
        commandLineArgs: ["-p", "src", "--explainFiles", "--extendedDiagnostics"],
        edits: [
            {
                caption: "Delete package.json",
                edit: sys => sys.deleteFile("/home/src/workspaces/project/package.json"),
            },
        ],
    });
});

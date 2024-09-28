import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { symbolLibContent } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import {
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: javascriptProjectEmit::", () => {
    verifyTsc({
        scenario: "javascriptProjectEmit",
        subScenario: `loads js-based projects and emits them correctly`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/common/nominal.js": dedent`
                    /**
                     * @template T, Name
                     * @typedef {T & {[Symbol.species]: Name}} Nominal
                     */
                    module.exports = {};
                    `,
                "/home/src/workspaces/solution/common/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    include: ["nominal.js"],
                }),
                "/home/src/workspaces/solution/sub-project/index.js": dedent`
                    import { Nominal } from '../common/nominal';

                    /**
                     * @typedef {Nominal<string, 'MyNominal'>} MyNominal
                     */
                    `,
                "/home/src/workspaces/solution/sub-project/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../common" },
                    ],
                    include: ["./index.js"],
                }),
                "/home/src/workspaces/solution/sub-project-2/index.js": dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: /** @type {MyNominal} */('value'),
                    };

                    /**
                     * @return {keyof typeof variable}
                     */
                    export function getVar() {
                        return 'key';
                    }
                    `,
                "/home/src/workspaces/solution/sub-project-2/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../sub-project" },
                    ],
                    include: ["./index.js"],
                }),
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./sub-project" },
                        { path: "./sub-project-2" },
                    ],
                    include: [],
                }),
                "/home/src/workspaces/solution/tsconfig.base.json": jsonToReadableText({
                    compilerOptions: {
                        skipLibCheck: true,
                        rootDir: "./",
                        outDir: "../lib",
                        allowJs: true,
                        checkJs: true,
                        declaration: true,
                    },
                }),
                [libFile.path]: `${libFile.content}${symbolLibContent}`,
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["-b"],
    });

    verifyTsc({
        scenario: "javascriptProjectEmit",
        subScenario: `loads js-based projects with non-moved json files and emits them correctly`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/common/obj.json": jsonToReadableText({
                    val: 42,
                }),
                "/home/src/workspaces/solution/common/index.ts": dedent`
                    import x = require("./obj.json");
                    export = x;
                `,
                "/home/src/workspaces/solution/common/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        outDir: null, // eslint-disable-line no-restricted-syntax
                        composite: true,
                    },
                    include: ["index.ts", "obj.json"],
                }),
                "/home/src/workspaces/solution/sub-project/index.js": dedent`
                    import mod from '../common';

                    export const m = mod;
                    `,
                "/home/src/workspaces/solution/sub-project/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../common" },
                    ],
                    include: ["./index.js"],
                }),
                "/home/src/workspaces/solution/sub-project-2/index.js": dedent`
                    import { m } from '../sub-project/index';

                    const variable = {
                        key: m,
                    };

                    export function getVar() {
                        return variable;
                    }
                    `,
                "/home/src/workspaces/solution/sub-project-2/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../sub-project" },
                    ],
                    include: ["./index.js"],
                }),
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./sub-project" },
                        { path: "./sub-project-2" },
                    ],
                    include: [],
                }),
                "/home/src/workspaces/solution/tsconfig.base.json": jsonToReadableText({
                    compilerOptions: {
                        skipLibCheck: true,
                        rootDir: "./",
                        outDir: "../out",
                        allowJs: true,
                        checkJs: true,
                        resolveJsonModule: true,
                        esModuleInterop: true,
                        declaration: true,
                    },
                }),
                [libFile.path]: `${libFile.content}${symbolLibContent}`,
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["-b"],
    });
});

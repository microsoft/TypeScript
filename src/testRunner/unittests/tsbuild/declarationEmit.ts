import {
    dedent,
} from "../../_namespaces/Utils";
import {
    FileSet,
} from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    libContent,
} from "../helpers/contents";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: declarationEmit", () => {
    function getFiles(): FileSet {
        return {
            "/src/solution/tsconfig.base.json": jsonToReadableText({
                compilerOptions: {
                    rootDir: "./",
                    outDir: "lib",
                },
            }),
            "/src/solution/tsconfig.json": jsonToReadableText({
                compilerOptions: { composite: true },
                references: [{ path: "./src" }],
                include: [],
            }),
            "/src/solution/src/tsconfig.json": jsonToReadableText({
                compilerOptions: { composite: true },
                references: [{ path: "./subProject" }, { path: "./subProject2" }],
                include: [],
            }),
            "/src/solution/src/subProject/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../common" }],
                include: ["./index.ts"],
            }),
            "/src/solution/src/subProject/index.ts": dedent`
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;`,
            "/src/solution/src/subProject2/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../subProject" }],
                include: ["./index.ts"],
            }),
            "/src/solution/src/subProject2/index.ts": dedent`
import { MyNominal } from '../subProject/index';
const variable = {
    key: 'value' as MyNominal,
};
export function getVar(): keyof typeof variable {
    return 'key';
}`,
            "/src/solution/src/common/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                include: ["./nominal.ts"],
            }),
            "/src/solution/src/common/nominal.ts": dedent`
/// <reference path="./types.d.ts" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;`,
            "/src/solution/src/common/types.d.ts": dedent`
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};`,
        };
    }
    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash",
        fs: () => loadProjectFromFiles(getFiles()),
        commandLineArgs: ["--b", "/src/solution/tsconfig.json", "--verbose"],
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash but uses no references",
        fs: () =>
            loadProjectFromFiles({
                ...getFiles(),
                "/src/solution/tsconfig.json": jsonToReadableText({
                    extends: "./tsconfig.base.json",
                    compilerOptions: { composite: true },
                    include: ["./src/**/*.ts"],
                }),
            }),
        commandLineArgs: ["--b", "/src/solution/tsconfig.json", "--verbose"],
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file used inferred type from referenced project",
        fs: () =>
            loadProjectFromFiles({
                "/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        baseUrl: ".",
                        paths: { "@fluentui/*": ["packages/*/src"] },
                    },
                }),
                "/src/packages/pkg1/src/index.ts": dedent`
export interface IThing {
  a: string;
}
export interface IThings {
  thing1: IThing;
}`,
                "/src/packages/pkg1/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig",
                    compilerOptions: { outDir: "lib" },
                    include: ["src"],
                }),
                "/src/packages/pkg2/src/index.ts": dedent`
import { IThings } from '@fluentui/pkg1';
export function fn4() {
  const a: IThings = { thing1: { a: 'b' } };
  return a.thing1;
}`,
                "/src/packages/pkg2/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig",
                    compilerOptions: { outDir: "lib" },
                    include: ["src"],
                    references: [{ path: "../pkg1" }],
                }),
            }),
        commandLineArgs: ["--b", "/src/packages/pkg2/tsconfig.json", "--verbose"],
    });
});

verifyTsc({
    scenario: "declarationEmit",
    subScenario: "reports dts generation errors with incremental",
    commandLineArgs: ["-b", `/src/project`, "--explainFiles", "--listEmittedFiles", "--v"],
    fs: () =>
        loadProjectFromFiles({
            "/src/project/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    module: "NodeNext",
                    moduleResolution: "NodeNext",
                    incremental: true,
                    declaration: true,
                    skipLibCheck: true,
                    skipDefaultLibCheck: true,
                },
            }),
            "/src/project/index.ts": dedent`
                    import ky from 'ky';
                    export const api = ky.extend({});
                `,
            "/src/project/package.json": jsonToReadableText({
                type: "module",
            }),
            "/src/project/node_modules/ky/distribution/index.d.ts": dedent`
                   type KyInstance = {
                        extend(options: Record<string,unknown>): KyInstance;
                    }
                    declare const ky: KyInstance;
                    export default ky;
                `,
            "/src/project/node_modules/ky/package.json": jsonToReadableText({
                name: "ky",
                type: "module",
                main: "./distribution/index.js",
            }),
            "/lib/lib.esnext.full.d.ts": libContent,
        }),
    edits: noChangeOnlyRuns,
});

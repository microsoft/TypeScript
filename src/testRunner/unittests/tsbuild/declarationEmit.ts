import * as vfs from "../../_namespaces/vfs";
import * as Utils from "../../_namespaces/Utils";
import { loadProjectFromFiles, verifyTsc } from "../tsc/helpers";

describe("unittests:: tsbuild:: declarationEmit", () => {
    function getFiles(): vfs.FileSet {
        return {
            "/src/solution/tsconfig.base.json": JSON.stringify({
                compilerOptions: {
                    rootDir: "./",
                    outDir: "lib"
                }
            }),
            "/src/solution/tsconfig.json": JSON.stringify({
                compilerOptions: { composite: true },
                references: [{ path: "./src" }],
                include: []
            }),
            "/src/solution/src/tsconfig.json": JSON.stringify({
                compilerOptions: { composite: true },
                references: [{ path: "./subProject" }, { path: "./subProject2" }],
                include: []
            }),
            "/src/solution/src/subProject/tsconfig.json": JSON.stringify({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../common" }],
                include: ["./index.ts"]
            }),
            "/src/solution/src/subProject/index.ts": Utils.dedent`
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;`,
            "/src/solution/src/subProject2/tsconfig.json": JSON.stringify({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../subProject" }],
                include: ["./index.ts"]
            }),
            "/src/solution/src/subProject2/index.ts": Utils.dedent`
import { MyNominal } from '../subProject/index';
const variable = {
    key: 'value' as MyNominal,
};
export function getVar(): keyof typeof variable {
    return 'key';
}`,
            "/src/solution/src/common/tsconfig.json": JSON.stringify({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                include: ["./nominal.ts"]
            }),
            "/src/solution/src/common/nominal.ts": Utils.dedent`
/// <reference path="./types.d.ts" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;`,
            "/src/solution/src/common/types.d.ts": Utils.dedent`
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};`,
        };
    }
    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash",
        fs: () => loadProjectFromFiles(getFiles()),
        commandLineArgs: ["--b", "/src/solution/tsconfig.json", "--verbose"]
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash but uses no references",
        fs: () => loadProjectFromFiles({
            ...getFiles(),
            "/src/solution/tsconfig.json": JSON.stringify({
                extends: "./tsconfig.base.json",
                compilerOptions: { composite: true },
                include: ["./src/**/*.ts"]
            }),
        }),
        commandLineArgs: ["--b", "/src/solution/tsconfig.json", "--verbose"]
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file used inferred type from referenced project",
        fs: () => loadProjectFromFiles({
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    composite: true,
                    baseUrl: ".",
                    paths: { "@fluentui/*": ["packages/*/src"] }
                }
            }),
            "/src/packages/pkg1/src/index.ts": Utils.dedent`
export interface IThing {
  a: string;
}
export interface IThings {
  thing1: IThing;
}`,
            "/src/packages/pkg1/tsconfig.json": JSON.stringify({
                extends: "../../tsconfig",
                compilerOptions: { outDir: "lib" },
                include: ["src"]
            }),
            "/src/packages/pkg2/src/index.ts": Utils.dedent`
import { IThings } from '@fluentui/pkg1';
export function fn4() {
  const a: IThings = { thing1: { a: 'b' } };
  return a.thing1;
}`,
            "/src/packages/pkg2/tsconfig.json": JSON.stringify({
                extends: "../../tsconfig",
                compilerOptions: { outDir: "lib" },
                include: ["src"],
                references: [{ path: "../pkg1" }]
            }),
        }),
        commandLineArgs: ["--b", "/src/packages/pkg2/tsconfig.json", "--verbose"]
    });
});

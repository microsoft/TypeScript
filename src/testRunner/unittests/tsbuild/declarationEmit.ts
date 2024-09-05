import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachDeclarationEmitWithErrorsScenario } from "../helpers/declarationEmit.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    FileOrFolderOrSymLinkMap,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: declarationEmit::", () => {
    function sys(additionalFiles?: FileOrFolderOrSymLinkMap) {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/solution/tsconfig.base.json": jsonToReadableText({
                compilerOptions: {
                    rootDir: "./",
                    outDir: "lib",
                },
            }),
            "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                compilerOptions: { composite: true },
                references: [{ path: "./src" }],
                include: [],
            }),
            "/home/src/workspaces/solution/src/tsconfig.json": jsonToReadableText({
                compilerOptions: { composite: true },
                references: [{ path: "./subProject" }, { path: "./subProject2" }],
                include: [],
            }),
            "/home/src/workspaces/solution/src/subProject/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../common" }],
                include: ["./index.ts"],
            }),
            "/home/src/workspaces/solution/src/subProject/index.ts": dedent`
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;`,
            "/home/src/workspaces/solution/src/subProject2/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                references: [{ path: "../subProject" }],
                include: ["./index.ts"],
            }),
            "/home/src/workspaces/solution/src/subProject2/index.ts": dedent`
import { MyNominal } from '../subProject/index';
const variable = {
    key: 'value' as MyNominal,
};
export function getVar(): keyof typeof variable {
    return 'key';
}`,
            "/home/src/workspaces/solution/src/common/tsconfig.json": jsonToReadableText({
                extends: "../../tsconfig.base.json",
                compilerOptions: { composite: true },
                include: ["./nominal.ts"],
            }),
            "/home/src/workspaces/solution/src/common/nominal.ts": dedent`
/// <reference path="./types.d.ts" preserve="true" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;`,
            "/home/src/workspaces/solution/src/common/types.d.ts": dedent`
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};`,
            ...additionalFiles,
        }, { currentDirectory: "/home/src/workspaces/solution" });
    }
    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash",
        sys,
        commandLineArgs: ["--b", "--verbose"],
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file is referenced through triple slash but uses no references",
        sys: () =>
            sys({
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    extends: "./tsconfig.base.json",
                    compilerOptions: { composite: true },
                    include: ["./src/**/*.ts"],
                }),
            }),
        commandLineArgs: ["--b", "--verbose"],
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when declaration file used inferred type from referenced project",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        baseUrl: ".",
                        paths: { "@fluentui/*": ["packages/*/src"] },
                    },
                }),
                "/home/src/workspaces/project/packages/pkg1/src/index.ts": dedent`
export interface IThing {
  a: string;
}
export interface IThings {
  thing1: IThing;
}`,
                "/home/src/workspaces/project/packages/pkg1/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig",
                    compilerOptions: { outDir: "lib" },
                    include: ["src"],
                }),
                "/home/src/workspaces/project/packages/pkg2/src/index.ts": dedent`
import { IThings } from '@fluentui/pkg1';
export function fn4() {
  const a: IThings = { thing1: { a: 'b' } };
  return a.thing1;
}`,
                "/home/src/workspaces/project/packages/pkg2/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig",
                    compilerOptions: { outDir: "lib" },
                    include: ["src"],
                    references: [{ path: "../pkg1" }],
                }),
            }),
        commandLineArgs: ["--b", "packages/pkg2/tsconfig.json", "--verbose"],
    });

    forEachDeclarationEmitWithErrorsScenario(
        (scenario, sys) => {
            verifyTsc({
                scenario: "declarationEmit",
                subScenario: scenario("reports dts generation errors"),
                commandLineArgs: ["-b", "--explainFiles", "--listEmittedFiles", "--v"],
                sys,
                edits: noChangeOnlyRuns,
            });
        },
        /*withComposite*/ false,
    );
});

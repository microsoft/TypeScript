import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { symbolLibContent } from "../helpers/contents.js";
import { verifyTsc } from "../helpers/tsc.js";
import {
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

// https://github.com/microsoft/TypeScript/issues/31696
describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers to referenced projects resolve correctly", () => {
    verifyTsc({
        scenario: "moduleSpecifiers",
        subScenario: `synthesized module specifiers resolve correctly`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/packages/solution/common/nominal.ts": dedent`
                    export declare type Nominal<T, Name extends string> = T & {
                        [Symbol.species]: Name;
                    };
                    `,
                "/home/src/workspaces/packages/solution/common/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    include: ["nominal.ts"],
                }),
                "/home/src/workspaces/packages/solution/sub-project/index.ts": dedent`
                    import { Nominal } from '../common/nominal';

                    export type MyNominal = Nominal<string, 'MyNominal'>;
                    `,
                "/home/src/workspaces/packages/solution/sub-project/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../common" },
                    ],
                    include: ["./index.ts"],
                }),
                "/home/src/workspaces/packages/solution/sub-project-2/index.ts": dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: 'value' as MyNominal,
                    };

                    export function getVar(): keyof typeof variable {
                        return 'key';
                    }
                    `,
                "/home/src/workspaces/packages/solution/sub-project-2/tsconfig.json": jsonToReadableText({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../sub-project" },
                    ],
                    include: ["./index.ts"],
                }),
                "/home/src/workspaces/packages/solution/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./sub-project" },
                        { path: "./sub-project-2" },
                    ],
                    include: [],
                }),
                "/home/src/workspaces/packages/tsconfig.base.json": jsonToReadableText({
                    compilerOptions: {
                        skipLibCheck: true,
                        rootDir: "./",
                        outDir: "lib",
                    },
                }),
                "/home/src/workspaces/packages/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./solution" },
                    ],
                    include: [],
                }),
                [libFile.path]: `${libFile.content}${symbolLibContent}`,
            }, { currentDirectory: "/home/src/workspaces/packages" }),
        commandLineArgs: ["-b", "--verbose"],
    });
});

// https://github.com/microsoft/TypeScript/issues/44434 but with `module: node16`, some `exports` maps blocking direct access, and no `baseUrl`
describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers across referenced projects resolve correctly", () => {
    verifyTsc({
        scenario: "moduleSpecifiers",
        subScenario: `synthesized module specifiers across projects resolve correctly`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/packages/src-types/index.ts": dedent`
                    export * from './dogconfig.js';`,
                "/home/src/workspaces/packages/src-types/dogconfig.ts": dedent`
                    export interface DogConfig {
                        name: string;
                    }`,
                "/home/src/workspaces/packages/src-dogs/index.ts": dedent`
                    export * from 'src-types';
                    export * from './lassie/lassiedog.js';
                    `,
                "/home/src/workspaces/packages/src-dogs/dogconfig.ts": dedent`
                    import { DogConfig } from 'src-types';

                    export const DOG_CONFIG: DogConfig = {
                        name: 'Default dog',
                    };
                    `,
                "/home/src/workspaces/packages/src-dogs/dog.ts": dedent`
                    import { DogConfig } from 'src-types';
                    import { DOG_CONFIG } from './dogconfig.js';
                    
                    export abstract class Dog {
                    
                        public static getCapabilities(): DogConfig {
                            return DOG_CONFIG;
                        }
                    }
                    `,
                "/home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts": dedent`
                    import { Dog } from '../dog.js';
                    import { LASSIE_CONFIG } from './lassieconfig.js';
                    
                    export class LassieDog extends Dog {
                        protected static getDogConfig = () => LASSIE_CONFIG;
                    }
                    `,
                "/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts": dedent`
                    import { DogConfig } from 'src-types';

                    export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };
                    `,
                "/home/src/workspaces/packages/tsconfig-base.json": jsonToReadableText({
                    compilerOptions: {
                        declaration: true,
                        module: "node16",
                    },
                }),
                "/home/src/workspaces/packages/src-types/package.json": jsonToReadableText({
                    type: "module",
                    exports: "./index.js",
                }),
                "/home/src/workspaces/packages/src-dogs/package.json": jsonToReadableText({
                    type: "module",
                    exports: "./index.js",
                }),
                "/home/src/workspaces/packages/src-types/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig-base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    include: [
                        "**/*",
                    ],
                }),
                "/home/src/workspaces/packages/src-dogs/tsconfig.json": jsonToReadableText({
                    extends: "../tsconfig-base.json",
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../src-types" },
                    ],
                    include: [
                        "**/*",
                    ],
                }),
                "/home/src/workspaces/packages/src-types/node_modules": { symLink: "/home/src/workspaces/packages" },
                "/home/src/workspaces/packages/src-dogs/node_modules": { symLink: "/home/src/workspaces/packages" },
            }, { currentDirectory: "/home/src/workspaces/packages" }),
        commandLineArgs: ["-b", "src-types", "src-dogs", "--verbose"],
    });
});

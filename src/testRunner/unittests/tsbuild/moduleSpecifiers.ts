import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

// https://github.com/microsoft/TypeScript/issues/31696
describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers to referenced projects resolve correctly", () => {
    ts.verifyTsc({
        scenario: "moduleSpecifiers",
        subScenario: `synthesized module specifiers resolve correctly`,
        fs: () => ts.loadProjectFromFiles({
            "/src/solution/common/nominal.ts": Utils.dedent`
                    export declare type Nominal<T, Name extends string> = T & {
                        [Symbol.species]: Name;
                    };
                    `,
            "/src/solution/common/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": ["nominal.ts"]
                    }`,
            "/src/solution/sub-project/index.ts": Utils.dedent`
                    import { Nominal } from '../common/nominal';

                    export type MyNominal = Nominal<string, 'MyNominal'>;
                    `,
            "/src/solution/sub-project/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.ts"]
                    }`,
            "/src/solution/sub-project-2/index.ts": Utils.dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: 'value' as MyNominal,
                    };

                    export function getVar(): keyof typeof variable {
                        return 'key';
                    }
                    `,
            "/src/solution/sub-project-2/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.ts"]
                    }`,
            "/src/solution/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./sub-project" },
                            { "path": "./sub-project-2" }
                        ],
                        "include": []
                    }`,
            "/src/tsconfig.base.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "lib",
                        }
                    }`,
            "/src/tsconfig.json": Utils.dedent`{
                    "compilerOptions": {
                        "composite": true
                    },
                    "references": [
                        { "path": "./solution" }
                    ],
                    "include": []
                }`
        }, ts.symbolLibContent),
        commandLineArgs: ["-b", "/src", "--verbose"]
    });
});

// https://github.com/microsoft/TypeScript/issues/44434 but with `module: node16`, some `exports` maps blocking direct access, and no `baseUrl`
describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers across referenced projects resolve correctly", () => {
    ts.verifyTsc({
        scenario: "moduleSpecifiers",
        subScenario: `synthesized module specifiers across projects resolve correctly`,
        fs: () => ts.loadProjectFromFiles({
            "/src/src-types/index.ts": Utils.dedent`
                    export * from './dogconfig.js';`,
            "/src/src-types/dogconfig.ts": Utils.dedent`
                    export interface DogConfig {
                        name: string;
                    }`,
            "/src/src-dogs/index.ts": Utils.dedent`
                    export * from 'src-types';
                    export * from './lassie/lassiedog.js';
                    `,
            "/src/src-dogs/dogconfig.ts": Utils.dedent`
                    import { DogConfig } from 'src-types';

                    export const DOG_CONFIG: DogConfig = {
                        name: 'Default dog',
                    };
                    `,
            "/src/src-dogs/dog.ts": Utils.dedent`
                    import { DogConfig } from 'src-types';
                    import { DOG_CONFIG } from './dogconfig.js';
                    
                    export abstract class Dog {
                    
                        public static getCapabilities(): DogConfig {
                            return DOG_CONFIG;
                        }
                    }
                    `,
            "/src/src-dogs/lassie/lassiedog.ts": Utils.dedent`
                    import { Dog } from '../dog.js';
                    import { LASSIE_CONFIG } from './lassieconfig.js';
                    
                    export class LassieDog extends Dog {
                        protected static getDogConfig = () => LASSIE_CONFIG;
                    }
                    `,
            "/src/src-dogs/lassie/lassieconfig.ts": Utils.dedent`
                    import { DogConfig } from 'src-types';

                    export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };
                    `,
            "/src/tsconfig-base.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "declaration": true,
                            "module": "node16"
                        }
                    }`,
            "/src/src-types/package.json": Utils.dedent`
                    {
                        "type": "module",
                        "exports": "./index.js"
                    }`,
            "/src/src-dogs/package.json": Utils.dedent`
                    {
                        "type": "module",
                        "exports": "./index.js"
                    }`,
            "/src/src-types/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig-base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": [
                            "**/*"
                        ]
                    }`,
            "/src/src-dogs/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../tsconfig-base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../src-types" }
                        ],
                        "include": [
                            "**/*"
                        ]
                    }`,
        }, ""),
        modifyFs: fs => {
            fs.writeFileSync("/lib/lib.es2022.full.d.ts", ts.tscWatch.libFile.content);
            fs.symlinkSync("/src", "/src/src-types/node_modules");
            fs.symlinkSync("/src", "/src/src-dogs/node_modules");
        },
        commandLineArgs: ["-b", "src/src-types", "src/src-dogs", "--verbose"]
    });
});

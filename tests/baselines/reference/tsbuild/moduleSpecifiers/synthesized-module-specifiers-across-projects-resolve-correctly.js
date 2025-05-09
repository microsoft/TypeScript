currentDirectory:: /home/src/workspaces/packages useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/packages/src-types/index.ts]
export * from './dogconfig.js';

//// [/home/src/workspaces/packages/src-types/dogconfig.ts]
export interface DogConfig {
    name: string;
}

//// [/home/src/workspaces/packages/src-dogs/index.ts]
export * from 'src-types';
export * from './lassie/lassiedog.js';


//// [/home/src/workspaces/packages/src-dogs/dogconfig.ts]
import { DogConfig } from 'src-types';

export const DOG_CONFIG: DogConfig = {
    name: 'Default dog',
};


//// [/home/src/workspaces/packages/src-dogs/dog.ts]
import { DogConfig } from 'src-types';
import { DOG_CONFIG } from './dogconfig.js';

export abstract class Dog {

    public static getCapabilities(): DogConfig {
        return DOG_CONFIG;
    }
}


//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts]
import { Dog } from '../dog.js';
import { LASSIE_CONFIG } from './lassieconfig.js';

export class LassieDog extends Dog {
    protected static getDogConfig = () => LASSIE_CONFIG;
}


//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts]
import { DogConfig } from 'src-types';

export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };


//// [/home/src/workspaces/packages/tsconfig-base.json]
{
  "compilerOptions": {
    "declaration": true,
    "module": "node16"
  }
}

//// [/home/src/workspaces/packages/src-types/package.json]
{
  "type": "module",
  "exports": "./index.js"
}

//// [/home/src/workspaces/packages/src-dogs/package.json]
{
  "type": "module",
  "exports": "./index.js"
}

//// [/home/src/workspaces/packages/src-types/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "**/*"
  ]
}

//// [/home/src/workspaces/packages/src-dogs/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../src-types"
    }
  ],
  "include": [
    "**/*"
  ]
}

//// [/home/src/workspaces/packages/src-types/node_modules] symlink(/home/src/workspaces/packages)

//// [/home/src/workspaces/packages/src-dogs/node_modules] symlink(/home/src/workspaces/packages)

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -b src-types src-dogs --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src-types/tsconfig.json
    * src-dogs/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src-types/tsconfig.json' is out of date because output file 'src-types/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/packages/src-types/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src-dogs/tsconfig.json' is out of date because output file 'src-dogs/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/packages/src-dogs/tsconfig.json'...



//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*

//// [/home/src/workspaces/packages/src-types/dogconfig.js]
export {};


//// [/home/src/workspaces/packages/src-types/dogconfig.d.ts]
export interface DogConfig {
    name: string;
}


//// [/home/src/workspaces/packages/src-types/index.js]
export * from './dogconfig.js';


//// [/home/src/workspaces/packages/src-types/index.d.ts]
export * from './dogconfig.js';


//// [/home/src/workspaces/packages/src-types/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2022.full.d.ts","./dogconfig.ts","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-5575793279-export interface DogConfig {\n    name: string;\n}","signature":"-3612551765-export interface DogConfig {\n    name: string;\n}\n","impliedFormat":99},{"version":"-6189272282-export * from './dogconfig.js';","signature":"-6677489680-export * from './dogconfig.js';\n","impliedFormat":99}],"root":[2,3],"options":{"composite":true,"declaration":true,"module":100},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/packages/src-types/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2022.full.d.ts",
    "./dogconfig.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./dogconfig.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2022.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./dogconfig.ts": {
      "original": {
        "version": "-5575793279-export interface DogConfig {\n    name: string;\n}",
        "signature": "-3612551765-export interface DogConfig {\n    name: string;\n}\n",
        "impliedFormat": 99
      },
      "version": "-5575793279-export interface DogConfig {\n    name: string;\n}",
      "signature": "-3612551765-export interface DogConfig {\n    name: string;\n}\n",
      "impliedFormat": "esnext"
    },
    "./index.ts": {
      "original": {
        "version": "-6189272282-export * from './dogconfig.js';",
        "signature": "-6677489680-export * from './dogconfig.js';\n",
        "impliedFormat": 99
      },
      "version": "-6189272282-export * from './dogconfig.js';",
      "signature": "-6677489680-export * from './dogconfig.js';\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "./dogconfig.ts"
    ],
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 100
  },
  "referencedMap": {
    "./index.ts": [
      "./dogconfig.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1096
}

//// [/home/src/workspaces/packages/src-dogs/dogconfig.js]
export const DOG_CONFIG = {
    name: 'Default dog',
};


//// [/home/src/workspaces/packages/src-dogs/dogconfig.d.ts]
import { DogConfig } from 'src-types';
export declare const DOG_CONFIG: DogConfig;


//// [/home/src/workspaces/packages/src-dogs/dog.js]
import { DOG_CONFIG } from './dogconfig.js';
export class Dog {
    static getCapabilities() {
        return DOG_CONFIG;
    }
}


//// [/home/src/workspaces/packages/src-dogs/dog.d.ts]
import { DogConfig } from 'src-types';
export declare abstract class Dog {
    static getCapabilities(): DogConfig;
}


//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.js]
export const LASSIE_CONFIG = { name: 'Lassie' };


//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.d.ts]
import { DogConfig } from 'src-types';
export declare const LASSIE_CONFIG: DogConfig;


//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.js]
import { Dog } from '../dog.js';
import { LASSIE_CONFIG } from './lassieconfig.js';
export class LassieDog extends Dog {
    static getDogConfig = () => LASSIE_CONFIG;
}


//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.d.ts]
import { Dog } from '../dog.js';
export declare class LassieDog extends Dog {
    protected static getDogConfig: () => import("src-types").DogConfig;
}


//// [/home/src/workspaces/packages/src-dogs/index.js]
export * from 'src-types';
export * from './lassie/lassiedog.js';


//// [/home/src/workspaces/packages/src-dogs/index.d.ts]
export * from 'src-types';
export * from './lassie/lassiedog.js';


//// [/home/src/workspaces/packages/src-dogs/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2022.full.d.ts","../src-types/dogconfig.d.ts","../src-types/index.d.ts","./dogconfig.ts","./dog.ts","./lassie/lassieconfig.ts","./lassie/lassiedog.ts","./index.ts"],"fileIdsList":[[3,4],[3],[3,7],[5,6],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-3612551765-export interface DogConfig {\n    name: string;\n}\n","impliedFormat":99},{"version":"-6677489680-export * from './dogconfig.js';\n","impliedFormat":99},{"version":"1966273863-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};\n","signature":"15679103984-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n","impliedFormat":99},{"version":"6091345804-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}\n","signature":"26984075437-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n","impliedFormat":99},{"version":"4440579024-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };\n","signature":"17379560247-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n","impliedFormat":99},{"version":"-32303727812-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}\n","signature":"-10239718190-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"src-types\").DogConfig;\n}\n","impliedFormat":99},{"version":"-15974991320-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n","impliedFormat":99}],"root":[[4,8]],"options":{"composite":true,"declaration":true,"module":100},"referencedMap":[[5,1],[4,2],[8,3],[6,2],[7,4],[3,5]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/packages/src-dogs/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2022.full.d.ts",
    "../src-types/dogconfig.d.ts",
    "../src-types/index.d.ts",
    "./dogconfig.ts",
    "./dog.ts",
    "./lassie/lassieconfig.ts",
    "./lassie/lassiedog.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../src-types/index.d.ts",
      "./dogconfig.ts"
    ],
    [
      "../src-types/index.d.ts"
    ],
    [
      "../src-types/index.d.ts",
      "./lassie/lassiedog.ts"
    ],
    [
      "./dog.ts",
      "./lassie/lassieconfig.ts"
    ],
    [
      "../src-types/dogconfig.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2022.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src-types/dogconfig.d.ts": {
      "original": {
        "version": "-3612551765-export interface DogConfig {\n    name: string;\n}\n",
        "impliedFormat": 99
      },
      "version": "-3612551765-export interface DogConfig {\n    name: string;\n}\n",
      "signature": "-3612551765-export interface DogConfig {\n    name: string;\n}\n",
      "impliedFormat": "esnext"
    },
    "../src-types/index.d.ts": {
      "original": {
        "version": "-6677489680-export * from './dogconfig.js';\n",
        "impliedFormat": 99
      },
      "version": "-6677489680-export * from './dogconfig.js';\n",
      "signature": "-6677489680-export * from './dogconfig.js';\n",
      "impliedFormat": "esnext"
    },
    "./dogconfig.ts": {
      "original": {
        "version": "1966273863-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};\n",
        "signature": "15679103984-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n",
        "impliedFormat": 99
      },
      "version": "1966273863-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};\n",
      "signature": "15679103984-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n",
      "impliedFormat": "esnext"
    },
    "./dog.ts": {
      "original": {
        "version": "6091345804-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}\n",
        "signature": "26984075437-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n",
        "impliedFormat": 99
      },
      "version": "6091345804-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}\n",
      "signature": "26984075437-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n",
      "impliedFormat": "esnext"
    },
    "./lassie/lassieconfig.ts": {
      "original": {
        "version": "4440579024-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };\n",
        "signature": "17379560247-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n",
        "impliedFormat": 99
      },
      "version": "4440579024-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };\n",
      "signature": "17379560247-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n",
      "impliedFormat": "esnext"
    },
    "./lassie/lassiedog.ts": {
      "original": {
        "version": "-32303727812-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}\n",
        "signature": "-10239718190-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"src-types\").DogConfig;\n}\n",
        "impliedFormat": 99
      },
      "version": "-32303727812-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}\n",
      "signature": "-10239718190-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"src-types\").DogConfig;\n}\n",
      "impliedFormat": "esnext"
    },
    "./index.ts": {
      "original": {
        "version": "-15974991320-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n",
        "impliedFormat": 99
      },
      "version": "-15974991320-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n",
      "signature": "-15974991320-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      [
        4,
        8
      ],
      [
        "./dogconfig.ts",
        "./dog.ts",
        "./lassie/lassieconfig.ts",
        "./lassie/lassiedog.ts",
        "./index.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 100
  },
  "referencedMap": {
    "./dog.ts": [
      "../src-types/index.d.ts",
      "./dogconfig.ts"
    ],
    "./dogconfig.ts": [
      "../src-types/index.d.ts"
    ],
    "./index.ts": [
      "../src-types/index.d.ts",
      "./lassie/lassiedog.ts"
    ],
    "./lassie/lassieconfig.ts": [
      "../src-types/index.d.ts"
    ],
    "./lassie/lassiedog.ts": [
      "./dog.ts",
      "./lassie/lassieconfig.ts"
    ],
    "../src-types/index.d.ts": [
      "../src-types/dogconfig.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 2601
}


exitCode:: ExitStatus.Success

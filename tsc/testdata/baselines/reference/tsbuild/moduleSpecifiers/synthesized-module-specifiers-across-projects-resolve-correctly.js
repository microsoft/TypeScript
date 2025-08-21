currentDirectory::/home/src/workspaces/packages
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/packages/src-dogs/dog.ts] *new* 
import { DogConfig } from 'src-types';
import { DOG_CONFIG } from './dogconfig.js';

export abstract class Dog {

    public static getCapabilities(): DogConfig {
        return DOG_CONFIG;
    }
}
//// [/home/src/workspaces/packages/src-dogs/dogconfig.ts] *new* 
import { DogConfig } from 'src-types';

export const DOG_CONFIG: DogConfig = {
    name: 'Default dog',
};
//// [/home/src/workspaces/packages/src-dogs/index.ts] *new* 
export * from 'src-types';
export * from './lassie/lassiedog.js';
//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts] *new* 
import { DogConfig } from 'src-types';

export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };
//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts] *new* 
import { Dog } from '../dog.js';
import { LASSIE_CONFIG } from './lassieconfig.js';

export class LassieDog extends Dog {
    protected static getDogConfig = () => LASSIE_CONFIG;
}
//// [/home/src/workspaces/packages/src-dogs/node_modules] -> /home/src/workspaces/packages *new*
//// [/home/src/workspaces/packages/src-dogs/package.json] *new* 
{
    "type": "module",
    "exports": "./index.js"
}
//// [/home/src/workspaces/packages/src-dogs/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "../src-types" },
    ],
    "include": [
        "**/*",
    ],
}
//// [/home/src/workspaces/packages/src-types/dogconfig.ts] *new* 
export interface DogConfig {
    name: string;
}
//// [/home/src/workspaces/packages/src-types/index.ts] *new* 
export * from './dogconfig.js';
//// [/home/src/workspaces/packages/src-types/node_modules] -> /home/src/workspaces/packages *new*
//// [/home/src/workspaces/packages/src-types/package.json] *new* 
{
    "type": "module",
    "exports": "./index.js"
}
//// [/home/src/workspaces/packages/src-types/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "composite": true,
    },
    "include": [
        "**/*",
    ],
}
//// [/home/src/workspaces/packages/tsconfig-base.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "module": "node16",
    },
}

tsgo -b src-types src-dogs --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src-types/tsconfig.json
    * src-dogs/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src-types/tsconfig.json' is out of date because output file 'src-types/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src-types/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src-dogs/tsconfig.json' is out of date because output file 'src-dogs/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src-dogs/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/packages/src-dogs/dog.d.ts] *new* 
import { DogConfig } from 'src-types';
export declare abstract class Dog {
    static getCapabilities(): DogConfig;
}

//// [/home/src/workspaces/packages/src-dogs/dog.js] *new* 
import { DOG_CONFIG } from './dogconfig.js';
export class Dog {
    static getCapabilities() {
        return DOG_CONFIG;
    }
}

//// [/home/src/workspaces/packages/src-dogs/dogconfig.d.ts] *new* 
import { DogConfig } from 'src-types';
export declare const DOG_CONFIG: DogConfig;

//// [/home/src/workspaces/packages/src-dogs/dogconfig.js] *new* 
export const DOG_CONFIG = {
    name: 'Default dog',
};

//// [/home/src/workspaces/packages/src-dogs/index.d.ts] *new* 
export * from 'src-types';
export * from './lassie/lassiedog.js';

//// [/home/src/workspaces/packages/src-dogs/index.js] *new* 
export * from 'src-types';
export * from './lassie/lassiedog.js';

//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.d.ts] *new* 
import { DogConfig } from 'src-types';
export declare const LASSIE_CONFIG: DogConfig;

//// [/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.js] *new* 
export const LASSIE_CONFIG = { name: 'Lassie' };

//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.d.ts] *new* 
import { Dog } from '../dog.js';
export declare class LassieDog extends Dog {
    protected static getDogConfig: () => import("../index.js").DogConfig;
}

//// [/home/src/workspaces/packages/src-dogs/lassie/lassiedog.js] *new* 
import { Dog } from '../dog.js';
import { LASSIE_CONFIG } from './lassieconfig.js';
export class LassieDog extends Dog {
    static getDogConfig = () => LASSIE_CONFIG;
}

//// [/home/src/workspaces/packages/src-dogs/node_modules] *deleted*
//// [/home/src/workspaces/packages/src-dogs/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[4,8]],"fileNames":["lib.es2022.full.d.ts","../src-types/dogconfig.d.ts","../src-types/index.d.ts","./dogconfig.ts","./dog.ts","./lassie/lassieconfig.ts","./lassie/lassiedog.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n","impliedNodeFormat":99},{"version":"3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n","impliedNodeFormat":99},{"version":"a8c9e5169f1e05ea3fd4da563dc779b7-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};","signature":"55c35bfb192d26f7ab56e9447864b637-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n","impliedNodeFormat":99},{"version":"4ef4eb6072aff36903b09b7e1fa75eea-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}","signature":"1130c09f22ac69e13b25f0c42f3a9379-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n","impliedNodeFormat":99},{"version":"37fa5afea0e398a9cc485818c902b71c-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };","signature":"2ef44fffbc07bb77765462af9f6df2a2-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n","impliedNodeFormat":99},{"version":"16f2a31a47590452f19f34bb56d0345f-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}","signature":"4e9a2f5bdce32a44b15cca0af7254c50-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"../index.js\").DogConfig;\n}\n","impliedNodeFormat":99},{"version":"099983d5c3c8b20233df02ca964ad12f-export * from 'src-types';\nexport * from './lassie/lassiedog.js';","signature":"0fb03f7b5b8061b0e2cd78a4131e3df7-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n","impliedNodeFormat":99}],"fileIdsList":[[3,4],[3],[3,7],[5,6],[2]],"options":{"composite":true,"declaration":true,"module":100},"referencedMap":[[5,1],[4,2],[8,3],[6,2],[7,4],[3,5]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/packages/src-dogs/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./dogconfig.ts",
        "./dog.ts",
        "./lassie/lassieconfig.ts",
        "./lassie/lassiedog.ts",
        "./index.ts"
      ],
      "original": [
        4,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "../src-types/dogconfig.d.ts",
    "../src-types/index.d.ts",
    "./dogconfig.ts",
    "./dog.ts",
    "./lassie/lassieconfig.ts",
    "./lassie/lassiedog.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src-types/dogconfig.d.ts",
      "version": "a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n",
      "signature": "a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../src-types/index.d.ts",
      "version": "3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n",
      "signature": "3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./dogconfig.ts",
      "version": "a8c9e5169f1e05ea3fd4da563dc779b7-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};",
      "signature": "55c35bfb192d26f7ab56e9447864b637-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "a8c9e5169f1e05ea3fd4da563dc779b7-import { DogConfig } from 'src-types';\n\nexport const DOG_CONFIG: DogConfig = {\n    name: 'Default dog',\n};",
        "signature": "55c35bfb192d26f7ab56e9447864b637-import { DogConfig } from 'src-types';\nexport declare const DOG_CONFIG: DogConfig;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./dog.ts",
      "version": "4ef4eb6072aff36903b09b7e1fa75eea-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}",
      "signature": "1130c09f22ac69e13b25f0c42f3a9379-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "4ef4eb6072aff36903b09b7e1fa75eea-import { DogConfig } from 'src-types';\nimport { DOG_CONFIG } from './dogconfig.js';\n\nexport abstract class Dog {\n\n    public static getCapabilities(): DogConfig {\n        return DOG_CONFIG;\n    }\n}",
        "signature": "1130c09f22ac69e13b25f0c42f3a9379-import { DogConfig } from 'src-types';\nexport declare abstract class Dog {\n    static getCapabilities(): DogConfig;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./lassie/lassieconfig.ts",
      "version": "37fa5afea0e398a9cc485818c902b71c-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };",
      "signature": "2ef44fffbc07bb77765462af9f6df2a2-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "37fa5afea0e398a9cc485818c902b71c-import { DogConfig } from 'src-types';\n\nexport const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };",
        "signature": "2ef44fffbc07bb77765462af9f6df2a2-import { DogConfig } from 'src-types';\nexport declare const LASSIE_CONFIG: DogConfig;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./lassie/lassiedog.ts",
      "version": "16f2a31a47590452f19f34bb56d0345f-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}",
      "signature": "4e9a2f5bdce32a44b15cca0af7254c50-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"../index.js\").DogConfig;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "16f2a31a47590452f19f34bb56d0345f-import { Dog } from '../dog.js';\nimport { LASSIE_CONFIG } from './lassieconfig.js';\n\nexport class LassieDog extends Dog {\n    protected static getDogConfig = () => LASSIE_CONFIG;\n}",
        "signature": "4e9a2f5bdce32a44b15cca0af7254c50-import { Dog } from '../dog.js';\nexport declare class LassieDog extends Dog {\n    protected static getDogConfig: () => import(\"../index.js\").DogConfig;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./index.ts",
      "version": "099983d5c3c8b20233df02ca964ad12f-export * from 'src-types';\nexport * from './lassie/lassiedog.js';",
      "signature": "0fb03f7b5b8061b0e2cd78a4131e3df7-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "099983d5c3c8b20233df02ca964ad12f-export * from 'src-types';\nexport * from './lassie/lassiedog.js';",
        "signature": "0fb03f7b5b8061b0e2cd78a4131e3df7-export * from 'src-types';\nexport * from './lassie/lassiedog.js';\n",
        "impliedNodeFormat": 99
      }
    }
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
  "size": 3218
}
//// [/home/src/workspaces/packages/src-types/dogconfig.d.ts] *new* 
export interface DogConfig {
    name: string;
}

//// [/home/src/workspaces/packages/src-types/dogconfig.js] *new* 
export {};

//// [/home/src/workspaces/packages/src-types/index.d.ts] *new* 
export * from './dogconfig.js';

//// [/home/src/workspaces/packages/src-types/index.js] *new* 
export * from './dogconfig.js';

//// [/home/src/workspaces/packages/src-types/node_modules] *deleted*
//// [/home/src/workspaces/packages/src-types/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2022.full.d.ts","./dogconfig.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d8b224befa78d5f27814a6eb4da56079-export interface DogConfig {\n    name: string;\n}","signature":"a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n","impliedNodeFormat":99},{"version":"ac3890d1bb11659994f68e147333e98e-export * from './dogconfig.js';","signature":"3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"declaration":true,"module":100},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/packages/src-types/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./dogconfig.ts",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "./dogconfig.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./dogconfig.ts",
      "version": "d8b224befa78d5f27814a6eb4da56079-export interface DogConfig {\n    name: string;\n}",
      "signature": "a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "d8b224befa78d5f27814a6eb4da56079-export interface DogConfig {\n    name: string;\n}",
        "signature": "a71e22ebb89c8c5bea7cef8d090ace25-export interface DogConfig {\n    name: string;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./index.ts",
      "version": "ac3890d1bb11659994f68e147333e98e-export * from './dogconfig.js';",
      "signature": "3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "ac3890d1bb11659994f68e147333e98e-export * from './dogconfig.js';",
        "signature": "3c21c50da3a1aea8b6fafa5aa595f160-export * from './dogconfig.js';\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./dogconfig.ts"
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
  "size": 1440
}

src-types/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/packages/src-types/dogconfig.ts
*refresh*    /home/src/workspaces/packages/src-types/index.ts
Signatures::
(stored at emit) /home/src/workspaces/packages/src-types/dogconfig.ts
(stored at emit) /home/src/workspaces/packages/src-types/index.ts

src-dogs/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/packages/src-types/dogconfig.d.ts
*refresh*    /home/src/workspaces/packages/src-types/index.d.ts
*refresh*    /home/src/workspaces/packages/src-dogs/dogconfig.ts
*refresh*    /home/src/workspaces/packages/src-dogs/dog.ts
*refresh*    /home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts
*refresh*    /home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts
*refresh*    /home/src/workspaces/packages/src-dogs/index.ts
Signatures::
(stored at emit) /home/src/workspaces/packages/src-dogs/dogconfig.ts
(stored at emit) /home/src/workspaces/packages/src-dogs/dog.ts
(stored at emit) /home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts
(stored at emit) /home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts
(stored at emit) /home/src/workspaces/packages/src-dogs/index.ts

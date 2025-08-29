currentDirectory::/user/username/projects/demo
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/demo/animals/animal.ts] *new* 
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}
//// [/user/username/projects/demo/animals/dog.ts] *new* 
import Animal from '.';
import { makeRandomName } from '../core/utilities';

export interface Dog extends Animal {
    woof(): void;
    name: string;
}

export function createDog(): Dog {
    return ({
        size: "medium",
        woof: function(this: Dog) {
            console.log(`${ this.name } says "Woof"!`);
        },
        name: makeRandomName()
    });
}
//// [/user/username/projects/demo/animals/index.ts] *new* 
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };
//// [/user/username/projects/demo/animals/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/animals",
        "rootDir": "."
    },
    "references": [
        { "path": "../core" }
    ]
}
//// [/user/username/projects/demo/core/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/core",
        "rootDir": "."
    },
}
//// [/user/username/projects/demo/core/utilities.ts] *new* 
import * as A from '../animals'
export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}
//// [/user/username/projects/demo/tsconfig-base.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "composite": true,
    },
}
//// [/user/username/projects/demo/tsconfig.json] *new* 
{
    "files": [],
    "references": [
        {
            "path": "./core"
        },
        {
            "path": "./animals",
        },
        {
            "path": "./zoo",
        },
    ],
}
//// [/user/username/projects/demo/zoo/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/zoo",
        "rootDir": "."
    },
    "references": [
        {
            "path": "../animals"
        }
    ]
}
//// [/user/username/projects/demo/zoo/zoo.ts] *new* 
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'core/tsconfig.json'...

[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/animal.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/dog.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96mcore/utilities.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m1[0m import * as A from '../animals'
[7m [0m [91m            ~[0m

[96mcore/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/index.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
  The file is in the program because:
    Imported via '../animals' from file '/user/username/projects/demo/core/utilities.ts'
    Imported via '.' from file '/user/username/projects/demo/animals/dog.ts'

[7m1[0m import * as A from '../animals'
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96manimals/dog.ts[0m:[93m1[0m:[93m20[0m - File is included via import here.
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m

[[90mHH:MM:SS AM[0m] Project 'animals/tsconfig.json' is out of date because output file 'lib/animals/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'animals/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'zoo/tsconfig.json' is out of date because output file 'lib/zoo/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'zoo/tsconfig.json'...


Found 4 errors in 2 files.

Errors  Files
     2  animals/index.ts[90m:1[0m
     2  core/utilities.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/user/username/projects/demo/animals/animal.d.ts] *new* 
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}

//// [/user/username/projects/demo/animals/animal.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/demo/animals/dog.d.ts] *new* 
import Animal from '.';
export interface Dog extends Animal {
    woof(): void;
    name: string;
}
export declare function createDog(): Dog;

//// [/user/username/projects/demo/animals/dog.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = createDog;
const utilities_1 = require("../core/utilities");
function createDog() {
    return ({
        size: "medium",
        woof: function () {
            console.log(`${this.name} says "Woof"!`);
        },
        name: (0, utilities_1.makeRandomName)()
    });
}

//// [/user/username/projects/demo/animals/index.d.ts] *new* 
import Animal from './animal';
export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };

//// [/user/username/projects/demo/animals/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
const dog_1 = require("./dog");
Object.defineProperty(exports, "createDog", { enumerable: true, get: function () { return dog_1.createDog; } });

//// [/user/username/projects/demo/lib/animals/animal.d.ts] *new* 
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}

//// [/user/username/projects/demo/lib/animals/animal.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/demo/lib/animals/dog.d.ts] *new* 
import Animal from '.';
export interface Dog extends Animal {
    woof(): void;
    name: string;
}
export declare function createDog(): Dog;

//// [/user/username/projects/demo/lib/animals/dog.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = createDog;
const utilities_1 = require("../core/utilities");
function createDog() {
    return ({
        size: "medium",
        woof: function () {
            console.log(`${this.name} says "Woof"!`);
        },
        name: (0, utilities_1.makeRandomName)()
    });
}

//// [/user/username/projects/demo/lib/animals/index.d.ts] *new* 
import Animal from './animal';
export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };

//// [/user/username/projects/demo/lib/animals/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
const dog_1 = require("./dog");
Object.defineProperty(exports, "createDog", { enumerable: true, get: function () { return dog_1.createDog; } });

//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3],5],"fileNames":["lib.d.ts","../../animals/animal.ts","../../animals/index.ts","../core/utilities.d.ts","../../animals/dog.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}","signature":"1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","impliedNodeFormat":1},{"version":"d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };","signature":"a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","impliedNodeFormat":1},"096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",{"version":"39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}","signature":"4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n","impliedNodeFormat":1}],"fileIdsList":[[3,4],[2,5]],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../animals","strict":true,"target":1},"referencedMap":[[5,1],[3,2]],"latestChangedDtsFile":"./dog.d.ts"}
//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../animals/animal.ts",
        "../../animals/index.ts"
      ],
      "original": [
        2,
        3
      ]
    },
    {
      "files": [
        "../../animals/dog.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../animals/animal.ts",
    "../../animals/index.ts",
    "../core/utilities.d.ts",
    "../../animals/dog.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "../../animals/animal.ts",
      "version": "47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}",
      "signature": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}",
        "signature": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../animals/index.ts",
      "version": "d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };",
      "signature": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };",
        "signature": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../core/utilities.d.ts",
      "version": "096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
      "signature": "096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../animals/dog.ts",
      "version": "39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}",
      "signature": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}",
        "signature": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../animals/index.ts",
      "../core/utilities.d.ts"
    ],
    [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 1,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./",
    "rootDir": "../../animals",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "../../animals/dog.ts": [
      "../../animals/index.ts",
      "../core/utilities.d.ts"
    ],
    "../../animals/index.ts": [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ]
  },
  "latestChangedDtsFile": "./dog.d.ts",
  "size": 2794
}
//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[5],"fileNames":["lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}","signature":"1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","impliedNodeFormat":1},{"version":"39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}","signature":"4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n","impliedNodeFormat":1},{"version":"d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };","signature":"a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","impliedNodeFormat":1},{"version":"c71a99e072793c29cda49dd3fea04661-import * as A from '../animals'\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}","signature":"096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n","impliedNodeFormat":1}],"fileIdsList":[[4,5],[2,3],[4]],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"referencedMap":[[3,1],[4,2],[5,3]],"semanticDiagnosticsPerFile":[[5,[{"pos":12,"end":13,"code":6133,"category":1,"message":"'A' is declared but its value is never read.","reportsUnnecessary":true}]]],"latestChangedDtsFile":"./utilities.d.ts"}
//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../../core/utilities.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../animals/animal.ts",
    "../../animals/dog.ts",
    "../../animals/index.ts",
    "../../core/utilities.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "../../animals/animal.ts",
      "version": "47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}",
      "signature": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "47f086fff365b1e8b96a6df2c4313c1a-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}",
        "signature": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../animals/dog.ts",
      "version": "39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}",
      "signature": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "39dbb9b755eef022e56879989968e5cf-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}",
        "signature": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../animals/index.ts",
      "version": "d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };",
      "signature": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d6a6b65b86b0330b1a1bd96b1738d5a4-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };",
        "signature": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../core/utilities.ts",
      "version": "c71a99e072793c29cda49dd3fea04661-import * as A from '../animals'\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}",
      "signature": "096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c71a99e072793c29cda49dd3fea04661-import * as A from '../animals'\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}",
        "signature": "096c311e7aecdb577f7b613fbf1716e5-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    [
      "../../animals/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 1,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./",
    "rootDir": "../../core",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "../../animals/dog.ts": [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    "../../animals/index.ts": [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    "../../core/utilities.ts": [
      "../../animals/index.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../core/utilities.ts",
      [
        {
          "pos": 12,
          "end": 13,
          "code": 6133,
          "category": 1,
          "message": "'A' is declared but its value is never read.",
          "reportsUnnecessary": true
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./utilities.d.ts",
  "size": 3302
}
//// [/user/username/projects/demo/lib/core/utilities.d.ts] *new* 
export declare function makeRandomName(): string;
export declare function lastElementOf<T>(arr: T[]): T | undefined;

//// [/user/username/projects/demo/lib/core/utilities.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRandomName = makeRandomName;
exports.lastElementOf = lastElementOf;
function makeRandomName() {
    return "Bob!?! ";
}
function lastElementOf(arr) {
    if (arr.length === 0)
        return undefined;
    return arr[arr.length - 1];
}

//// [/user/username/projects/demo/lib/zoo/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","../animals/animal.d.ts","../animals/dog.d.ts","../animals/index.d.ts","../../zoo/zoo.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n","a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",{"version":"90c7a8cea6924c55890fba84da3398f3-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}","signature":"f9be246631fc3123a90a7f2cf5f5a1a2-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n","impliedNodeFormat":1}],"fileIdsList":[[4],[2,3]],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../zoo","strict":true,"target":1},"referencedMap":[[3,1],[4,2],[5,1]],"latestChangedDtsFile":"./zoo.d.ts"}
//// [/user/username/projects/demo/lib/zoo/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../zoo/zoo.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../animals/animal.d.ts",
    "../animals/dog.d.ts",
    "../animals/index.d.ts",
    "../../zoo/zoo.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "../animals/animal.d.ts",
      "version": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "signature": "1d76529d4652ddf9ebdfa65e748240fb-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../animals/dog.d.ts",
      "version": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
      "signature": "4dc4bc559452869bfd0d92b5ed5d604f-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../animals/index.d.ts",
      "version": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "signature": "a3e41a5ccafc3d07a201f0603e28edcf-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../zoo/zoo.ts",
      "version": "90c7a8cea6924c55890fba84da3398f3-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}",
      "signature": "f9be246631fc3123a90a7f2cf5f5a1a2-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90c7a8cea6924c55890fba84da3398f3-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}",
        "signature": "f9be246631fc3123a90a7f2cf5f5a1a2-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../animals/index.d.ts"
    ],
    [
      "../animals/animal.d.ts",
      "../animals/dog.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 1,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./",
    "rootDir": "../../zoo",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "../animals/dog.d.ts": [
      "../animals/index.d.ts"
    ],
    "../animals/index.d.ts": [
      "../animals/animal.d.ts",
      "../animals/dog.d.ts"
    ],
    "../../zoo/zoo.ts": [
      "../animals/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./zoo.d.ts",
  "size": 2104
}
//// [/user/username/projects/demo/lib/zoo/zoo.d.ts] *new* 
import { Dog } from '../animals/index';
export declare function createZoo(): Array<Dog>;

//// [/user/username/projects/demo/lib/zoo/zoo.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZoo = createZoo;
const index_1 = require("../animals/index");
function createZoo() {
    return [
        (0, index_1.createDog)()
    ];
}


core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/demo/animals/animal.ts
*refresh*    /user/username/projects/demo/animals/dog.ts
*refresh*    /user/username/projects/demo/animals/index.ts
*refresh*    /user/username/projects/demo/core/utilities.ts
Signatures::
(stored at emit) /user/username/projects/demo/animals/animal.ts
(stored at emit) /user/username/projects/demo/animals/dog.ts
(stored at emit) /user/username/projects/demo/animals/index.ts
(stored at emit) /user/username/projects/demo/core/utilities.ts

animals/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/demo/animals/animal.ts
*refresh*    /user/username/projects/demo/animals/index.ts
*refresh*    /user/username/projects/demo/lib/core/utilities.d.ts
*refresh*    /user/username/projects/demo/animals/dog.ts
Signatures::
(stored at emit) /user/username/projects/demo/animals/animal.ts
(stored at emit) /user/username/projects/demo/animals/index.ts
(stored at emit) /user/username/projects/demo/animals/dog.ts

zoo/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/demo/lib/animals/animal.d.ts
*refresh*    /user/username/projects/demo/lib/animals/dog.d.ts
*refresh*    /user/username/projects/demo/lib/animals/index.d.ts
*refresh*    /user/username/projects/demo/zoo/zoo.ts
Signatures::
(stored at emit) /user/username/projects/demo/zoo/zoo.ts

currentDirectory:: /user/username/projects/demo useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/demo/animals/animal.ts]
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/user/username/projects/demo/animals/dog.ts]
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


//// [/user/username/projects/demo/animals/index.ts]
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/user/username/projects/demo/animals/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/animals",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
}

//// [/user/username/projects/demo/core/utilities.ts]
export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}


//// [/user/username/projects/demo/tsconfig-base.json]
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
    "composite": true
  }
}

//// [/user/username/projects/demo/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./core"
    },
    {
      "path": "./animals"
    },
    {
      "path": "./zoo"
    }
  ]
}

//// [/user/username/projects/demo/zoo/tsconfig.json]
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

//// [/user/username/projects/demo/zoo/zoo.ts]
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}




Output::
/a/lib/tsc --b --verbose
[[90m12:00:24 AM[0m] Projects in this build: 
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[[90m12:00:25 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/tsconfig.tsbuildinfo' does not exist

[[90m12:00:26 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...

[[90m12:00:34 AM[0m] Project 'animals/tsconfig.json' is out of date because output file 'lib/animals/tsconfig.tsbuildinfo' does not exist

[[90m12:00:35 AM[0m] Building project '/user/username/projects/demo/animals/tsconfig.json'...

[[90m12:00:46 AM[0m] Project 'zoo/tsconfig.json' is out of date because output file 'lib/zoo/tsconfig.tsbuildinfo' does not exist

[[90m12:00:47 AM[0m] Building project '/user/username/projects/demo/zoo/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/user/username/projects/demo/lib/animals/animal.d.ts]
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/user/username/projects/demo/lib/animals/animal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/demo/lib/animals/dog.d.ts]
import Animal from '.';
export interface Dog extends Animal {
    woof(): void;
    name: string;
}
export declare function createDog(): Dog;


//// [/user/username/projects/demo/lib/animals/dog.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
var utilities_1 = require("../core/utilities");
function createDog() {
    return ({
        size: "medium",
        woof: function () {
            console.log("".concat(this.name, " says \"Woof\"!"));
        },
        name: (0, utilities_1.makeRandomName)()
    });
}
exports.createDog = createDog;


//// [/user/username/projects/demo/lib/animals/index.d.ts]
import Animal from './animal';
export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/user/username/projects/demo/lib/animals/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
var dog_1 = require("./dog");
Object.defineProperty(exports, "createDog", { enumerable: true, get: function () { return dog_1.createDog; } });


//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/index.ts","../core/utilities.d.ts","../../animals/dog.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",{"version":"-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","signature":"1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"},"-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",{"version":"-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n","signature":"6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"}],"root":[2,3,5],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../animals","strict":true,"target":1},"fileIdsList":[[3,4],[2,5],[3]],"referencedMap":[[5,1],[3,2]],"exportedModulesMap":[[5,3],[3,2]],"semanticDiagnosticsPerFile":[1,2,5,3,4],"latestChangedDtsFile":"./dog.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/index.ts",
      "../core/utilities.d.ts",
      "../../animals/dog.ts"
    ],
    "fileNamesList": [
      [
        "../../animals/index.ts",
        "../core/utilities.d.ts"
      ],
      [
        "../../animals/animal.ts",
        "../../animals/dog.ts"
      ],
      [
        "../../animals/index.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../animals/animal.ts": {
        "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "signature": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n"
      },
      "../../animals/index.ts": {
        "original": {
          "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
          "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"
        },
        "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"
      },
      "../core/utilities.d.ts": {
        "version": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"
      },
      "../../animals/dog.ts": {
        "original": {
          "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
          "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"
        },
        "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"
      }
    },
    "root": [
      [
        2,
        "../../animals/animal.ts"
      ],
      [
        3,
        "../../animals/index.ts"
      ],
      [
        5,
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
    "exportedModulesMap": {
      "../../animals/dog.ts": [
        "../../animals/index.ts"
      ],
      "../../animals/index.ts": [
        "../../animals/animal.ts",
        "../../animals/dog.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      "../core/utilities.d.ts"
    ],
    "latestChangedDtsFile": "./dog.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2260
}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../core/utilities.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6723567162-export function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n","signature":"-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"}],"root":[2],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./utilities.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../core/utilities.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../core/utilities.ts": {
        "original": {
          "version": "-6723567162-export function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
          "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"
        },
        "version": "-6723567162-export function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"
      }
    },
    "root": [
      [
        2,
        "../../core/utilities.ts"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../core/utilities.ts"
    ],
    "latestChangedDtsFile": "./utilities.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1348
}

//// [/user/username/projects/demo/lib/core/utilities.d.ts]
export declare function makeRandomName(): string;
export declare function lastElementOf<T>(arr: T[]): T | undefined;


//// [/user/username/projects/demo/lib/core/utilities.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastElementOf = exports.makeRandomName = void 0;
function makeRandomName() {
    return "Bob!?! ";
}
exports.makeRandomName = makeRandomName;
function lastElementOf(arr) {
    if (arr.length === 0)
        return undefined;
    return arr[arr.length - 1];
}
exports.lastElementOf = lastElementOf;


//// [/user/username/projects/demo/lib/zoo/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../animals/animal.d.ts","../animals/dog.d.ts","../animals/index.d.ts","../../zoo/zoo.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n","1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",{"version":"13034796418-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}\n","signature":"10305066551-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n"}],"root":[5],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../zoo","strict":true,"target":1},"fileIdsList":[[4],[2,3]],"referencedMap":[[3,1],[4,2],[5,1]],"exportedModulesMap":[[3,1],[4,2],[5,1]],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./zoo.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/zoo/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../animals/animal.d.ts",
      "../animals/dog.d.ts",
      "../animals/index.d.ts",
      "../../zoo/zoo.ts"
    ],
    "fileNamesList": [
      [
        "../animals/index.d.ts"
      ],
      [
        "../animals/animal.d.ts",
        "../animals/dog.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../animals/animal.d.ts": {
        "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "signature": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n"
      },
      "../animals/dog.d.ts": {
        "version": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"
      },
      "../animals/index.d.ts": {
        "version": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"
      },
      "../../zoo/zoo.ts": {
        "original": {
          "version": "13034796418-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}\n",
          "signature": "10305066551-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n"
        },
        "version": "13034796418-import { Dog, createDog } from '../animals/index';\n\nexport function createZoo(): Array<Dog> {\n    return [\n        createDog()\n    ];\n}\n",
        "signature": "10305066551-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n"
      }
    },
    "root": [
      [
        5,
        "../../zoo/zoo.ts"
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../animals/animal.d.ts",
      "../animals/dog.d.ts",
      "../animals/index.d.ts",
      "../../zoo/zoo.ts"
    ],
    "latestChangedDtsFile": "./zoo.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1804
}

//// [/user/username/projects/demo/lib/zoo/zoo.d.ts]
import { Dog } from '../animals/index';
export declare function createZoo(): Array<Dog>;


//// [/user/username/projects/demo/lib/zoo/zoo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZoo = void 0;
var index_1 = require("../animals/index");
function createZoo() {
    return [
        (0, index_1.createDog)()
    ];
}
exports.createZoo = createZoo;


